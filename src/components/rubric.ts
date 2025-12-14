import type { RubricCriterion } from '@/core/types';

/**
 * Render a rubric as an interactive table.
 * Optionally highlight user's self-assessment.
 */
export function renderRubric(
  container: HTMLElement,
  rubric: RubricCriterion[],
  assessment?: Record<string, number>
): void {
  container.innerHTML = '';
  container.className = 'rubric-container';

  // Header
  const header = document.createElement('div');
  header.className = 'rubric-header';
  header.innerHTML = '<h3>Grading Rubric</h3>';
  container.appendChild(header);

  // Calculate weighted score if assessment provided
  if (assessment) {
    const totalScore = calculateWeightedScore(rubric, assessment);
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'rubric-score';
    scoreDisplay.innerHTML = `
      <div class="score-label">Your Self-Assessment Score</div>
      <div class="score-value">${totalScore.toFixed(1)}%</div>
    `;
    container.appendChild(scoreDisplay);
  }

  // Rubric table
  const table = document.createElement('table');
  table.className = 'rubric-table';

  // Table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th class="criterion-col">Criterion</th>
    <th class="weight-col">Weight</th>
    <th class="levels-col">Performance Levels</th>
  `;
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement('tbody');

  rubric.forEach((criterion) => {
    const row = document.createElement('tr');
    row.className = 'criterion-row';

    // Criterion name
    const nameCell = document.createElement('td');
    nameCell.className = 'criterion-name';
    nameCell.textContent = criterion.name;
    row.appendChild(nameCell);

    // Weight
    const weightCell = document.createElement('td');
    weightCell.className = 'criterion-weight';
    weightCell.textContent = `${criterion.weight}%`;
    row.appendChild(weightCell);

    // Levels
    const levelsCell = document.createElement('td');
    levelsCell.className = 'criterion-levels';

    const levelsContainer = document.createElement('div');
    levelsContainer.className = 'levels-container';

    // Sort levels by score descending
    const sortedLevels = [...criterion.levels].sort((a, b) => b.score - a.score);

    sortedLevels.forEach((level) => {
      const levelDiv = document.createElement('div');
      levelDiv.className = 'rubric-level';

      // Highlight if this is the user's assessment
      const userScore = assessment?.[criterion.name];
      if (userScore !== undefined && userScore === level.score) {
        levelDiv.classList.add('selected');
      }

      levelDiv.innerHTML = `
        <div class="level-header">
          <span class="level-label">${level.label}</span>
          <span class="level-score">${level.score} pts</span>
        </div>
        <div class="level-description">${level.description}</div>
      `;

      levelsContainer.appendChild(levelDiv);
    });

    levelsCell.appendChild(levelsContainer);
    row.appendChild(levelsCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  // Add legend if assessment is shown
  if (assessment) {
    const legend = document.createElement('div');
    legend.className = 'rubric-legend';
    legend.innerHTML = `
      <div class="legend-item">
        <span class="legend-badge selected"></span>
        <span class="legend-text">Your self-assessment</span>
      </div>
    `;
    container.appendChild(legend);
  }
}

/**
 * Calculate the weighted score based on rubric and assessment.
 */
export function calculateWeightedScore(
  rubric: RubricCriterion[],
  assessment: Record<string, number>
): number {
  let totalScore = 0;
  let totalWeight = 0;

  rubric.forEach((criterion) => {
    const score = assessment[criterion.name];
    if (score !== undefined) {
      // Find max possible score for this criterion
      const maxScore = Math.max(...criterion.levels.map(l => l.score));

      // Calculate weighted contribution
      if (maxScore > 0) {
        const percentage = (score / maxScore) * 100;
        totalScore += (percentage * criterion.weight) / 100;
        totalWeight += criterion.weight;
      }
    }
  });

  return totalWeight > 0 ? totalScore : 0;
}

/**
 * Create an interactive rubric for self-assessment.
 */
export function renderInteractiveRubric(
  container: HTMLElement,
  rubric: RubricCriterion[],
  initialAssessment?: Record<string, number>,
  onChange?: (assessment: Record<string, number>) => void
): void {
  container.innerHTML = '';
  container.className = 'rubric-container interactive';

  const assessment: Record<string, number> = initialAssessment || {};

  function render() {
    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'rubric-header';
    header.innerHTML = '<h3>Self-Assessment Rubric</h3>';
    container.appendChild(header);

    // Score display
    const totalScore = calculateWeightedScore(rubric, assessment);
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'rubric-score';
    scoreDisplay.innerHTML = `
      <div class="score-label">Current Score</div>
      <div class="score-value">${totalScore.toFixed(1)}%</div>
    `;
    container.appendChild(scoreDisplay);

    // Criteria
    const criteriaContainer = document.createElement('div');
    criteriaContainer.className = 'criteria-container';

    rubric.forEach((criterion) => {
      const criterionDiv = document.createElement('div');
      criterionDiv.className = 'criterion-card';

      const criterionHeader = document.createElement('div');
      criterionHeader.className = 'criterion-header';
      criterionHeader.innerHTML = `
        <span class="criterion-title">${criterion.name}</span>
        <span class="criterion-weight">${criterion.weight}% of grade</span>
      `;
      criterionDiv.appendChild(criterionHeader);

      const levelsContainer = document.createElement('div');
      levelsContainer.className = 'levels-interactive';

      // Sort levels by score descending
      const sortedLevels = [...criterion.levels].sort((a, b) => b.score - a.score);

      sortedLevels.forEach((level) => {
        const levelButton = document.createElement('button');
        levelButton.className = 'level-button';

        if (assessment[criterion.name] === level.score) {
          levelButton.classList.add('selected');
        }

        levelButton.innerHTML = `
          <div class="level-button-header">
            <span class="level-label">${level.label}</span>
            <span class="level-score">${level.score} pts</span>
          </div>
          <div class="level-description">${level.description}</div>
        `;

        levelButton.onclick = () => {
          assessment[criterion.name] = level.score;
          render();
          if (onChange) {
            onChange(assessment);
          }
        };

        levelsContainer.appendChild(levelButton);
      });

      criterionDiv.appendChild(levelsContainer);
      criteriaContainer.appendChild(criterionDiv);
    });

    container.appendChild(criteriaContainer);
  }

  render();
}
