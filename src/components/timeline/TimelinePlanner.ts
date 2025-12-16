import type { StudyPace, StudyPlanSettings } from '@/core/types';
import { PACE_LABELS, PACE_DESCRIPTIONS } from './timeline-utils';
import { Icons } from '@/components/icons';

export interface TimelinePlannerOptions {
  onSave: (settings: StudyPlanSettings) => void;
  existingSettings?: StudyPlanSettings;
}

/**
 * Creates the study plan setup form component
 */
export function createTimelinePlanner(options: TimelinePlannerOptions): HTMLElement {
  const { onSave, existingSettings } = options;
  const isEditing = !!existingSettings;

  const container = document.createElement('div');
  container.className = 'timeline-planner';

  // Default to today if no existing settings
  const defaultDate = existingSettings?.startDate
    ? existingSettings.startDate.split('T')[0]
    : new Date().toISOString().split('T')[0];
  const defaultPace = existingSettings?.pace || 'standard';

  container.innerHTML = `
    <div class="planner-card">
      <div class="planner-header">
        <div class="planner-icon">${Icons.Calendar}</div>
        <div>
          <h2>${isEditing ? 'Edit Study Plan' : 'Create Your Study Plan'}</h2>
          <p class="text-muted">${isEditing ? 'Adjust your study timeline settings' : 'Set your start date and pace to generate a personalized timeline'}</p>
        </div>
      </div>

      <form class="planner-form" id="study-plan-form">
        <div class="form-group">
          <label for="start-date">When do you want to start?</label>
          <input
            type="date"
            id="start-date"
            name="startDate"
            value="${defaultDate}"
            required
          />
        </div>

        <div class="form-group">
          <label>Choose your pace</label>
          <div class="pace-options">
            ${(['standard', 'accelerated', 'intensive'] as StudyPace[]).map(pace => `
              <label class="pace-option ${pace === defaultPace ? 'selected' : ''}">
                <input
                  type="radio"
                  name="pace"
                  value="${pace}"
                  ${pace === defaultPace ? 'checked' : ''}
                />
                <div class="pace-content">
                  <span class="pace-label">${PACE_LABELS[pace]}</span>
                  <span class="pace-description">${PACE_DESCRIPTIONS[pace]}</span>
                </div>
              </label>
            `).join('')}
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            ${isEditing ? 'Update Timeline' : 'Create Timeline'}
          </button>
        </div>
      </form>
    </div>
  `;

  // Handle pace option selection styling
  const paceOptions = container.querySelectorAll('.pace-option');
  paceOptions.forEach(option => {
    option.addEventListener('click', () => {
      paceOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  // Handle form submission
  const form = container.querySelector('#study-plan-form') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const startDate = formData.get('startDate') as string;
    const pace = formData.get('pace') as StudyPace;

    const settings: StudyPlanSettings = {
      startDate: new Date(startDate).toISOString(),
      pace,
    };

    onSave(settings);
  });

  return container;
}
