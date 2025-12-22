import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculateWeightedScore,
  renderRubric,
  renderInteractiveRubric,
} from '../src/components/rubric';
import type { RubricCriterion } from '../src/core/types';

// Helper to create test rubric criteria
function createCriterion(
  name: string,
  weight: number,
  levels: Array<{ score: number; label: string; description: string }>
): RubricCriterion {
  return { name, weight, levels };
}

// Standard test rubric
function createStandardRubric(): RubricCriterion[] {
  return [
    createCriterion('Code Quality', 40, [
      { score: 4, label: 'Excellent', description: 'Clean, well-organized code' },
      { score: 3, label: 'Good', description: 'Generally clean code' },
      { score: 2, label: 'Satisfactory', description: 'Code works but messy' },
      { score: 1, label: 'Poor', description: 'Difficult to read' },
      { score: 0, label: 'Unacceptable', description: 'Does not compile/run' },
    ]),
    createCriterion('Functionality', 60, [
      { score: 4, label: 'Excellent', description: 'All features working perfectly' },
      { score: 3, label: 'Good', description: 'Most features working' },
      { score: 2, label: 'Satisfactory', description: 'Basic features working' },
      { score: 1, label: 'Poor', description: 'Few features working' },
      { score: 0, label: 'Unacceptable', description: 'Nothing works' },
    ]),
  ];
}

describe('calculateWeightedScore', () => {
  describe('happy path', () => {
    it('calculates correct score for perfect assessment', () => {
      const rubric = createStandardRubric();
      const assessment = {
        'Code Quality': 4, // 100% of 40% = 40%
        'Functionality': 4, // 100% of 60% = 60%
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(100);
    });

    it('calculates correct score for partial assessment', () => {
      const rubric = createStandardRubric();
      const assessment = {
        'Code Quality': 2, // 50% of 40% = 20%
        'Functionality': 3, // 75% of 60% = 45%
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(65);
    });

    it('calculates correct score for zero assessment', () => {
      const rubric = createStandardRubric();
      const assessment = {
        'Code Quality': 0, // 0% of 40% = 0%
        'Functionality': 0, // 0% of 60% = 0%
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(0);
    });

    it('calculates correct score with unequal weights', () => {
      const rubric = [
        createCriterion('A', 10, [
          { score: 10, label: 'Full', description: 'Full marks' },
          { score: 0, label: 'None', description: 'No marks' },
        ]),
        createCriterion('B', 90, [
          { score: 10, label: 'Full', description: 'Full marks' },
          { score: 0, label: 'None', description: 'No marks' },
        ]),
      ];
      const assessment = {
        'A': 10, // 100% of 10% = 10%
        'B': 5,  // 50% of 90% = 45%
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(55);
    });
  });

  describe('edge cases', () => {
    it('returns 0 for empty rubric', () => {
      const score = calculateWeightedScore([], { 'Something': 10 });
      expect(score).toBe(0);
    });

    it('returns 0 for empty assessment', () => {
      const rubric = createStandardRubric();
      const score = calculateWeightedScore(rubric, {});
      expect(score).toBe(0);
    });

    it('ignores criteria not in rubric', () => {
      const rubric = createStandardRubric();
      const assessment = {
        'Code Quality': 4,
        'Functionality': 4,
        'NonExistentCriterion': 100, // Should be ignored
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(100);
    });

    it('handles partial assessment (missing criteria)', () => {
      const rubric = createStandardRubric();
      const assessment = {
        'Code Quality': 4, // 100% of 40% = 40%
        // Functionality missing - should be excluded from calculation
      };

      // Only Code Quality is assessed, and it scores 100% of its 40% weight = 40%
      // But total weight is only 40%, so 40/40 * 100 = 100%? No, let's check the logic
      // Actually looking at the function: totalScore accumulates, totalWeight accumulates
      // So 100 * 40 / 100 = 40 for totalScore, totalWeight = 40
      // Return totalScore = 40 (NOT normalized by totalWeight)
      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(40);
    });

    it('handles rubric with single criterion', () => {
      const rubric = [
        createCriterion('Only', 100, [
          { score: 10, label: 'Full', description: 'Full marks' },
          { score: 5, label: 'Half', description: 'Half marks' },
          { score: 0, label: 'None', description: 'No marks' },
        ]),
      ];
      const assessment = { 'Only': 5 }; // 50% of 100% = 50%

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(50);
    });

    it('handles criterion with zero weight', () => {
      const rubric = [
        createCriterion('NoWeight', 0, [
          { score: 10, label: 'Full', description: 'Full marks' },
        ]),
        createCriterion('HasWeight', 100, [
          { score: 10, label: 'Full', description: 'Full marks' },
        ]),
      ];
      const assessment = {
        'NoWeight': 10,
        'HasWeight': 5,
      };

      // NoWeight contributes 0, HasWeight contributes 50% of 100 = 50
      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(50);
    });

    it('handles criterion with max score of 0', () => {
      const rubric = [
        createCriterion('AllZero', 50, [
          { score: 0, label: 'Zero', description: 'Zero score' },
        ]),
        createCriterion('Normal', 50, [
          { score: 10, label: 'Full', description: 'Full marks' },
        ]),
      ];
      const assessment = {
        'AllZero': 0, // maxScore is 0, should be skipped
        'Normal': 10, // 100% of 50% = 50%
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(50);
    });

    it('handles undefined score in assessment (treats as missing)', () => {
      const rubric = createStandardRubric();
      const assessment: Record<string, number> = {
        'Code Quality': 4,
      };
      // Functionality is undefined

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(40);
    });
  });

  describe('precision', () => {
    it('returns precise decimal scores', () => {
      const rubric = [
        createCriterion('Test', 100, [
          { score: 3, label: 'Full', description: 'Full marks' },
        ]),
      ];
      const assessment = { 'Test': 1 }; // 1/3 = 33.333...%

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBeCloseTo(33.333, 2);
    });

    it('handles very small weights', () => {
      const rubric = [
        createCriterion('Tiny', 1, [
          { score: 100, label: 'Full', description: 'Full marks' },
        ]),
        createCriterion('Large', 99, [
          { score: 100, label: 'Full', description: 'Full marks' },
        ]),
      ];
      const assessment = {
        'Tiny': 100,
        'Large': 100,
      };

      const score = calculateWeightedScore(rubric, assessment);
      expect(score).toBe(100);
    });
  });
});

describe('renderRubric', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
  });

  describe('basic rendering', () => {
    it('renders rubric container with correct class', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      expect(container.className).toBe('rubric-container');
    });

    it('renders rubric header', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const header = container.querySelector('.rubric-header h3');
      expect(header).not.toBeNull();
      expect(header?.textContent).toBe('Grading Rubric');
    });

    it('renders all criteria', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const criterionRows = container.querySelectorAll('.criterion-row');
      expect(criterionRows.length).toBe(2);
    });

    it('renders criterion names correctly', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const names = container.querySelectorAll('.criterion-name');
      expect(names[0]?.textContent).toBe('Code Quality');
      expect(names[1]?.textContent).toBe('Functionality');
    });

    it('renders criterion weights', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const weights = container.querySelectorAll('.criterion-weight');
      expect(weights[0]?.textContent).toBe('40%');
      expect(weights[1]?.textContent).toBe('60%');
    });

    it('renders all levels for each criterion', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const criterionRows = container.querySelectorAll('.criterion-row');
      criterionRows.forEach((row) => {
        const levels = row.querySelectorAll('.rubric-level');
        expect(levels.length).toBe(5); // Each criterion has 5 levels
      });
    });

    it('sorts levels by score descending', () => {
      const rubric = [
        createCriterion('Test', 100, [
          { score: 1, label: 'Low', description: 'Low score' },
          { score: 3, label: 'High', description: 'High score' },
          { score: 2, label: 'Medium', description: 'Medium score' },
        ]),
      ];
      renderRubric(container, rubric);

      const levelLabels = container.querySelectorAll('.level-label');
      expect(levelLabels[0]?.textContent).toBe('High');
      expect(levelLabels[1]?.textContent).toBe('Medium');
      expect(levelLabels[2]?.textContent).toBe('Low');
    });
  });

  describe('with assessment', () => {
    it('displays score when assessment is provided', () => {
      const rubric = createStandardRubric();
      const assessment = { 'Code Quality': 4, 'Functionality': 4 };
      renderRubric(container, rubric, assessment);

      const scoreValue = container.querySelector('.score-value');
      expect(scoreValue?.textContent).toBe('100.0%');
    });

    it('does not display score when assessment is not provided', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const scoreDisplay = container.querySelector('.rubric-score');
      expect(scoreDisplay).toBeNull();
    });

    it('highlights selected levels in assessment', () => {
      const rubric = createStandardRubric();
      const assessment = { 'Code Quality': 3, 'Functionality': 2 };
      renderRubric(container, rubric, assessment);

      const selectedLevels = container.querySelectorAll('.rubric-level.selected');
      expect(selectedLevels.length).toBe(2);
    });

    it('shows legend when assessment is provided', () => {
      const rubric = createStandardRubric();
      const assessment = { 'Code Quality': 4 };
      renderRubric(container, rubric, assessment);

      const legend = container.querySelector('.rubric-legend');
      expect(legend).not.toBeNull();
      expect(legend?.textContent).toContain('Your self-assessment');
    });

    it('does not show legend without assessment', () => {
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      const legend = container.querySelector('.rubric-legend');
      expect(legend).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('handles empty rubric', () => {
      renderRubric(container, []);

      expect(container.className).toBe('rubric-container');
      const criterionRows = container.querySelectorAll('.criterion-row');
      expect(criterionRows.length).toBe(0);
    });

    it('handles criterion with no levels', () => {
      const rubric = [createCriterion('Empty', 100, [])];
      renderRubric(container, rubric);

      const criterionRows = container.querySelectorAll('.criterion-row');
      expect(criterionRows.length).toBe(1);
      const levels = container.querySelectorAll('.rubric-level');
      expect(levels.length).toBe(0);
    });

    it('clears container before rendering', () => {
      container.innerHTML = '<div>Old content</div>';
      const rubric = createStandardRubric();
      renderRubric(container, rubric);

      expect(container.querySelector('.rubric-header')).not.toBeNull();
      expect(container.textContent).not.toContain('Old content');
    });
  });
});

describe('renderInteractiveRubric', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
  });

  describe('basic rendering', () => {
    it('renders with interactive class', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      expect(container.className).toBe('rubric-container interactive');
    });

    it('renders self-assessment header', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      const header = container.querySelector('.rubric-header h3');
      expect(header?.textContent).toBe('Self-Assessment Rubric');
    });

    it('renders level buttons', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      const levelButtons = container.querySelectorAll('.level-button');
      expect(levelButtons.length).toBe(10); // 5 levels × 2 criteria
    });

    it('displays initial score of 0%', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      const scoreValue = container.querySelector('.score-value');
      expect(scoreValue?.textContent).toBe('0.0%');
    });
  });

  describe('with initial assessment', () => {
    it('pre-selects levels based on initial assessment', () => {
      const rubric = createStandardRubric();
      const initialAssessment = { 'Code Quality': 4, 'Functionality': 3 };
      renderInteractiveRubric(container, rubric, initialAssessment);

      const selectedButtons = container.querySelectorAll('.level-button.selected');
      expect(selectedButtons.length).toBe(2);
    });

    it('displays correct initial score', () => {
      const rubric = createStandardRubric();
      const initialAssessment = { 'Code Quality': 4, 'Functionality': 2 };
      renderInteractiveRubric(container, rubric, initialAssessment);

      const scoreValue = container.querySelector('.score-value');
      // Code Quality: 100% of 40% = 40%
      // Functionality: 50% of 60% = 30%
      // Total: 70%
      expect(scoreValue?.textContent).toBe('70.0%');
    });
  });

  describe('interactivity', () => {
    it('updates score when level is clicked', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      // Find and click a level button
      const levelButtons = container.querySelectorAll('.level-button');
      const codeQualityExcellent = levelButtons[0] as HTMLButtonElement;
      codeQualityExcellent.click();

      const scoreValue = container.querySelector('.score-value');
      // Code Quality: 100% of 40% = 40%
      expect(scoreValue?.textContent).toBe('40.0%');
    });

    it('calls onChange callback when level is clicked', () => {
      const rubric = createStandardRubric();
      const onChange = vi.fn();
      renderInteractiveRubric(container, rubric, undefined, onChange);

      const levelButtons = container.querySelectorAll('.level-button');
      (levelButtons[0] as HTMLButtonElement).click();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        'Code Quality': 4,
      }));
    });

    it('marks clicked level as selected', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      const levelButtons = container.querySelectorAll('.level-button');
      (levelButtons[0] as HTMLButtonElement).click();

      // Re-query after re-render
      const selectedButtons = container.querySelectorAll('.level-button.selected');
      expect(selectedButtons.length).toBe(1);
    });

    it('updates selection when different level is clicked', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      // Click first level (Excellent)
      let levelButtons = container.querySelectorAll('.level-button');
      (levelButtons[0] as HTMLButtonElement).click();

      // Click second level (Good)
      levelButtons = container.querySelectorAll('.level-button');
      (levelButtons[1] as HTMLButtonElement).click();

      const selectedButtons = container.querySelectorAll('.level-button.selected');
      expect(selectedButtons.length).toBe(1);

      const scoreValue = container.querySelector('.score-value');
      // Code Quality: 75% of 40% = 30%
      expect(scoreValue?.textContent).toBe('30.0%');
    });

    it('maintains assessment state across multiple clicks', () => {
      const rubric = createStandardRubric();
      const onChange = vi.fn();
      renderInteractiveRubric(container, rubric, undefined, onChange);

      // Click Code Quality - Excellent
      let levelButtons = container.querySelectorAll('.level-button');
      (levelButtons[0] as HTMLButtonElement).click();

      // Click Functionality - Good (second criterion, second level after re-render)
      levelButtons = container.querySelectorAll('.level-button');
      // Find Functionality buttons (second criterion)
      const functionalityButtons = container.querySelectorAll('.criterion-card')[1]
        ?.querySelectorAll('.level-button');
      (functionalityButtons?.[1] as HTMLButtonElement).click();

      const selectedButtons = container.querySelectorAll('.level-button.selected');
      expect(selectedButtons.length).toBe(2);

      expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({
        'Code Quality': 4,
        'Functionality': 3,
      }));
    });
  });

  describe('edge cases', () => {
    it('handles empty rubric', () => {
      renderInteractiveRubric(container, []);

      expect(container.className).toBe('rubric-container interactive');
      const scoreValue = container.querySelector('.score-value');
      expect(scoreValue?.textContent).toBe('0.0%');
    });

    it('handles onChange being undefined', () => {
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      const levelButtons = container.querySelectorAll('.level-button');

      // Should not throw
      expect(() => {
        (levelButtons[0] as HTMLButtonElement).click();
      }).not.toThrow();
    });

    it('clears container before rendering', () => {
      container.innerHTML = '<div>Old content</div>';
      const rubric = createStandardRubric();
      renderInteractiveRubric(container, rubric);

      expect(container.textContent).not.toContain('Old content');
    });

    it('handles null initial assessment', () => {
      const rubric = createStandardRubric();
      // @ts-expect-error testing null handling
      renderInteractiveRubric(container, rubric, null);

      const scoreValue = container.querySelector('.score-value');
      expect(scoreValue?.textContent).toBe('0.0%');
    });
  });
});
