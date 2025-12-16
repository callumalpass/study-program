import type { Subject, StudyPlanSettings, SubjectScheduleOverride } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { TimelineGantt } from '@/components/timeline/TimelineGantt';
import { createTimelinePlanner } from '@/components/timeline/TimelinePlanner';
import { getEstimatedCompletionDate, calculateSchedule, PACE_LABELS } from '@/components/timeline/timeline-utils';
import { Icons } from '@/components/icons';

/**
 * Render the study timeline page
 */
export function renderTimelinePage(
  container: HTMLElement,
  subjects: Subject[]
): void {
  const userProgress = progressStorage.getProgress();
  const studyPlan = userProgress.settings.studyPlan;

  if (!studyPlan) {
    // Show planner setup
    renderPlannerSetup(container, subjects);
  } else {
    // Show timeline
    renderTimeline(container, subjects, studyPlan);
  }
}

/**
 * Render the initial planner setup view
 */
function renderPlannerSetup(container: HTMLElement, subjects: Subject[]): void {
  container.innerHTML = `
    <div class="timeline-page">
      <div class="timeline-setup">
        <div class="setup-welcome">
          <h1>Plan Your Learning Journey</h1>
          <p class="text-secondary">
            Create a personalized study timeline to track your progress through the
            ${subjects.length} subjects in this degree program.
          </p>
        </div>
        <div id="planner-container"></div>
      </div>
    </div>
  `;

  const plannerContainer = container.querySelector('#planner-container') as HTMLElement;
  const planner = createTimelinePlanner({
    onSave: (settings) => {
      saveStudyPlan(settings);
      renderTimelinePage(container, subjects);
    },
  });
  plannerContainer.appendChild(planner);
}

/**
 * Render the timeline view with Gantt chart
 */
function renderTimeline(
  container: HTMLElement,
  subjects: Subject[],
  studyPlan: StudyPlanSettings
): void {
  const userProgress = progressStorage.getProgress();
  const startDate = new Date(studyPlan.startDate);
  const schedule = calculateSchedule(
    subjects,
    userProgress,
    startDate,
    studyPlan.pace,
    studyPlan.subjectOverrides
  );
  const estimatedEnd = getEstimatedCompletionDate(schedule);

  // Calculate stats
  const completed = Array.from(schedule.values()).filter(s => s.status === 'completed').length;
  const inProgress = Array.from(schedule.values()).filter(s => s.status === 'in-progress').length;
  const scheduled = Array.from(schedule.values()).filter(s => s.status === 'scheduled').length;

  container.innerHTML = `
    <div class="timeline-page">
      <div class="timeline-header">
        <div class="timeline-title">
          <h1>${Icons.Calendar} Study Timeline</h1>
          <p class="text-secondary">
            Started ${formatDate(startDate)} &middot; ${PACE_LABELS[studyPlan.pace]} &middot;
            Est. completion ${formatDate(estimatedEnd)}
          </p>
        </div>
        <button class="btn btn-secondary btn-sm" id="edit-plan-btn">
          ${Icons.Edit} Edit Plan
        </button>
      </div>

      <div class="timeline-stats">
        <div class="stat-card">
          <span class="stat-value stat-completed">${completed}</span>
          <span class="stat-label">Completed</span>
        </div>
        <div class="stat-card">
          <span class="stat-value stat-in-progress">${inProgress}</span>
          <span class="stat-label">In Progress</span>
        </div>
        <div class="stat-card">
          <span class="stat-value stat-scheduled">${scheduled}</span>
          <span class="stat-label">Scheduled</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${subjects.length}</span>
          <span class="stat-label">Total Subjects</span>
        </div>
      </div>

      <div class="timeline-legend">
        <div class="legend-item">
          <span class="legend-color legend-completed"></span>
          <span>Completed</span>
        </div>
        <div class="legend-item">
          <span class="legend-color legend-in-progress"></span>
          <span>In Progress</span>
        </div>
        <div class="legend-item">
          <span class="legend-color legend-scheduled"></span>
          <span>Scheduled</span>
        </div>
        <div class="legend-item">
          <span class="legend-color legend-blocked"></span>
          <span>Blocked</span>
        </div>
      </div>

      <div id="gantt-container" class="timeline-gantt-wrapper"></div>

      <div id="edit-modal" class="modal" style="display: none;">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Study Plan</h2>
            <button class="modal-close" id="close-modal">&times;</button>
          </div>
          <div id="modal-planner"></div>
        </div>
      </div>
    </div>
  `;

  // Render Gantt chart
  const ganttContainer = container.querySelector('#gantt-container') as HTMLElement;
  const gantt = new TimelineGantt(subjects, userProgress, startDate, studyPlan.pace, {
    subjectOverrides: studyPlan.subjectOverrides,
    onSubjectMoved: (subjectId: string, newStartDate: Date) => {
      saveSubjectOverride(subjectId, newStartDate, studyPlan);
      // Re-render the timeline with the new overrides
      renderTimelinePage(container, subjects);
    },
  });
  ganttContainer.appendChild(gantt.render());

  // Edit plan button
  const editBtn = container.querySelector('#edit-plan-btn');
  const modal = container.querySelector('#edit-modal') as HTMLElement;
  const modalPlanner = container.querySelector('#modal-planner') as HTMLElement;
  const closeModal = container.querySelector('#close-modal');
  const backdrop = container.querySelector('.modal-backdrop');

  editBtn?.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalPlanner.innerHTML = '';
    const planner = createTimelinePlanner({
      existingSettings: studyPlan,
      onSave: (settings) => {
        saveStudyPlan(settings);
        renderTimelinePage(container, subjects);
      },
    });
    modalPlanner.appendChild(planner);
  });

  closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  backdrop?.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

/**
 * Save study plan settings to storage
 */
function saveStudyPlan(settings: StudyPlanSettings): void {
  const currentSettings = progressStorage.getSettings();
  progressStorage.updateSettings({
    ...currentSettings,
    studyPlan: settings,
  });
}

/**
 * Save a subject schedule override (when dragged)
 */
function saveSubjectOverride(
  subjectId: string,
  newStartDate: Date,
  currentPlan: StudyPlanSettings
): void {
  const existingOverrides = currentPlan.subjectOverrides || {};
  const existingOverride = existingOverrides[subjectId] || {};

  const updatedOverrides: Record<string, SubjectScheduleOverride> = {
    ...existingOverrides,
    [subjectId]: {
      ...existingOverride,
      customStartDate: newStartDate.toISOString(),
    },
  };

  const updatedPlan: StudyPlanSettings = {
    ...currentPlan,
    subjectOverrides: updatedOverrides,
  };

  saveStudyPlan(updatedPlan);
}

/**
 * Format a date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
