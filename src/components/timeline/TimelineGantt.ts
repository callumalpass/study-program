import type { Subject, UserProgress, StudyPace } from '@/core/types';
import { navigateToSubject } from '@/core/router';
import {
  calculateSchedule,
  getTimelineBounds,
  formatMonthYear,
  daysBetween,
  type ScheduledSubject,
} from './timeline-utils';

// Get theme-aware colors from CSS variables
function getThemeColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    bgSurface: style.getPropertyValue('--color-bg-surface').trim() || '#161b22',
    bgElevated: style.getPropertyValue('--color-bg-elevated').trim() || '#21262d',
    bgDeep: style.getPropertyValue('--color-bg-deep').trim() || '#0d1117',
    textPrimary: style.getPropertyValue('--color-text-primary').trim() || '#f0f3f6',
    textSecondary: style.getPropertyValue('--color-text-secondary').trim() || '#8b949e',
    textMuted: style.getPropertyValue('--color-text-muted').trim() || '#6e7681',
    borderDefault: style.getPropertyValue('--color-border-default').trim() || '#30363d',
    success: style.getPropertyValue('--color-success').trim() || '#56d364',
    accentPrimary: style.getPropertyValue('--color-accent-primary').trim() || '#58a6ff',
    warning: style.getPropertyValue('--color-warning').trim() || '#e3b341',
    error: style.getPropertyValue('--color-error').trim() || '#f85149',
  };
}

export class TimelineGantt {
  private container: HTMLElement;
  private subjects: Subject[];
  private userProgress: UserProgress;
  private startDate: Date;
  private pace: StudyPace;
  private schedule: Map<string, ScheduledSubject>;
  private colors: ReturnType<typeof getThemeColors> | null = null;
  private svg: SVGSVGElement | null = null;
  private tooltip: HTMLElement | null = null;

  // Configuration
  private readonly ROW_HEIGHT = 36;
  private readonly HEADER_HEIGHT = 50;
  private readonly LABEL_WIDTH = 140;
  private readonly DAY_WIDTH = 3;
  private readonly PADDING = 20;
  private readonly BAR_HEIGHT = 24;
  private readonly BAR_RADIUS = 4;

  constructor(
    subjects: Subject[],
    userProgress: UserProgress,
    startDate: Date,
    pace: StudyPace
  ) {
    this.subjects = subjects;
    this.userProgress = userProgress;
    this.startDate = startDate;
    this.pace = pace;
    this.schedule = calculateSchedule(subjects, userProgress, startDate, pace);

    this.container = document.createElement('div');
    this.container.className = 'timeline-gantt-container';
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.colors = getThemeColors();

    const bounds = getTimelineBounds(this.schedule);
    const totalDays = daysBetween(bounds.start, bounds.end) + 30; // Add buffer
    const subjectCount = this.subjects.length;

    const svgWidth = this.LABEL_WIDTH + totalDays * this.DAY_WIDTH + this.PADDING * 2;
    const svgHeight = this.HEADER_HEIGHT + subjectCount * this.ROW_HEIGHT + this.PADDING;

    // Create SVG
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', `${svgWidth}`);
    this.svg.setAttribute('height', `${svgHeight}`);
    this.svg.style.minWidth = '100%';

    // Draw components
    this.drawBackground(svgWidth, svgHeight);
    this.drawTimeAxis(bounds, totalDays);
    this.drawSubjectRows(bounds);
    this.drawTodayMarker(bounds, svgHeight);

    this.container.appendChild(this.svg);

    // Create tooltip element
    this.createTooltip();

    return this.container;
  }

  private drawBackground(width: number, height: number): void {
    if (!this.svg || !this.colors) return;

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', `${width}`);
    bg.setAttribute('height', `${height}`);
    bg.setAttribute('fill', this.colors.bgSurface);
    this.svg.appendChild(bg);

    // Header background
    const header = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    header.setAttribute('x', '0');
    header.setAttribute('y', '0');
    header.setAttribute('width', `${width}`);
    header.setAttribute('height', `${this.HEADER_HEIGHT}`);
    header.setAttribute('fill', this.colors.bgElevated);
    this.svg.appendChild(header);

    // Label column background
    const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    labelBg.setAttribute('x', '0');
    labelBg.setAttribute('y', `${this.HEADER_HEIGHT}`);
    labelBg.setAttribute('width', `${this.LABEL_WIDTH}`);
    labelBg.setAttribute('height', `${this.subjects.length * this.ROW_HEIGHT}`);
    labelBg.setAttribute('fill', this.colors.bgElevated);
    this.svg.appendChild(labelBg);
  }

  private drawTimeAxis(bounds: { start: Date; end: Date }, totalDays: number): void {
    if (!this.svg || !this.colors) return;

    const startX = this.LABEL_WIDTH;
    let currentDate = new Date(bounds.start);
    currentDate.setDate(1); // Start from first of month

    while (currentDate <= bounds.end) {
      const daysFromStart = daysBetween(bounds.start, currentDate);
      const x = startX + Math.max(0, daysFromStart) * this.DAY_WIDTH;

      // Month label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', `${x + 5}`);
      label.setAttribute('y', `${this.HEADER_HEIGHT / 2 + 5}`);
      label.setAttribute('fill', this.colors.textSecondary);
      label.setAttribute('font-size', '11');
      label.setAttribute('font-family', 'system-ui, sans-serif');
      label.textContent = formatMonthYear(currentDate);
      this.svg.appendChild(label);

      // Vertical grid line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${x}`);
      line.setAttribute('y1', `${this.HEADER_HEIGHT}`);
      line.setAttribute('x2', `${x}`);
      line.setAttribute('y2', `${this.HEADER_HEIGHT + this.subjects.length * this.ROW_HEIGHT}`);
      line.setAttribute('stroke', this.colors.borderDefault);
      line.setAttribute('stroke-width', '1');
      line.setAttribute('opacity', '0.5');
      this.svg.appendChild(line);

      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  private drawSubjectRows(bounds: { start: Date; end: Date }): void {
    if (!this.svg || !this.colors) return;

    // Capture for use in forEach (TypeScript narrowing)
    const svg = this.svg;
    const colors = this.colors;

    // Sort subjects by their scheduled start date
    const sortedSchedule = Array.from(this.schedule.values())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    sortedSchedule.forEach((scheduled, index) => {
      const y = this.HEADER_HEIGHT + index * this.ROW_HEIGHT;

      // Alternating row background
      if (index % 2 === 1) {
        const rowBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rowBg.setAttribute('x', '0');
        rowBg.setAttribute('y', `${y}`);
        rowBg.setAttribute('width', '100%');
        rowBg.setAttribute('height', `${this.ROW_HEIGHT}`);
        rowBg.setAttribute('fill', colors.bgDeep);
        rowBg.setAttribute('opacity', '0.3');
        svg.appendChild(rowBg);
      }

      // Subject label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '10');
      label.setAttribute('y', `${y + this.ROW_HEIGHT / 2 + 4}`);
      label.setAttribute('fill', colors.textPrimary);
      label.setAttribute('font-size', '12');
      label.setAttribute('font-family', 'system-ui, sans-serif');
      label.textContent = scheduled.subject.code;
      label.style.cursor = 'pointer';
      label.addEventListener('click', () => navigateToSubject(scheduled.subject.id));
      svg.appendChild(label);

      // Draw the bar
      this.drawSubjectBar(scheduled, bounds, y);
    });
  }

  private drawSubjectBar(
    scheduled: ScheduledSubject,
    bounds: { start: Date; end: Date },
    y: number
  ): void {
    if (!this.svg || !this.colors) return;

    const startX = this.LABEL_WIDTH;
    const daysFromStart = daysBetween(bounds.start, scheduled.startDate);
    const duration = daysBetween(scheduled.startDate, scheduled.endDate);

    const barX = startX + daysFromStart * this.DAY_WIDTH;
    const barWidth = Math.max(duration * this.DAY_WIDTH, 10);
    const barY = y + (this.ROW_HEIGHT - this.BAR_HEIGHT) / 2;

    // Get bar color based on status
    const barColor = this.getStatusColor(scheduled.status);

    // Create bar group
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.style.cursor = 'pointer';

    // Main bar
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', `${barX}`);
    bar.setAttribute('y', `${barY}`);
    bar.setAttribute('width', `${barWidth}`);
    bar.setAttribute('height', `${this.BAR_HEIGHT}`);
    bar.setAttribute('rx', `${this.BAR_RADIUS}`);
    bar.setAttribute('fill', barColor);
    bar.setAttribute('opacity', scheduled.status === 'blocked' ? '0.4' : '0.8');
    group.appendChild(bar);

    // Progress overlay for in-progress subjects
    if (scheduled.status === 'in-progress' && scheduled.completionPercentage > 0) {
      const progressWidth = barWidth * (scheduled.completionPercentage / 100);
      const progress = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      progress.setAttribute('x', `${barX}`);
      progress.setAttribute('y', `${barY}`);
      progress.setAttribute('width', `${progressWidth}`);
      progress.setAttribute('height', `${this.BAR_HEIGHT}`);
      progress.setAttribute('rx', `${this.BAR_RADIUS}`);
      progress.setAttribute('fill', this.colors.success);
      progress.setAttribute('opacity', '0.9');
      group.appendChild(progress);
    }

    // Status indicator for completed
    if (scheduled.status === 'completed') {
      const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      checkmark.setAttribute('x', `${barX + barWidth + 5}`);
      checkmark.setAttribute('y', `${barY + this.BAR_HEIGHT / 2 + 4}`);
      checkmark.setAttribute('fill', this.colors.success);
      checkmark.setAttribute('font-size', '14');
      checkmark.textContent = '\u2713';
      group.appendChild(checkmark);
    }

    // Striped pattern for scheduled (future) items
    if (scheduled.status === 'scheduled') {
      const patternId = `stripe-${scheduled.subject.id}`;
      this.addStripePattern(patternId);
      bar.setAttribute('fill', `url(#${patternId})`);
      bar.setAttribute('opacity', '1');
    }

    // Event handlers
    group.addEventListener('click', () => navigateToSubject(scheduled.subject.id));
    group.addEventListener('mouseenter', (e) => this.showTooltip(e, scheduled));
    group.addEventListener('mouseleave', () => this.hideTooltip());

    this.svg.appendChild(group);
  }

  private addStripePattern(id: string): void {
    if (!this.svg || !this.colors) return;

    // Check if pattern already exists
    if (this.svg.querySelector(`#${id}`)) return;

    let defs = this.svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.svg.insertBefore(defs, this.svg.firstChild);
    }

    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', id);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', '8');
    pattern.setAttribute('height', '8');
    pattern.setAttribute('patternTransform', 'rotate(45)');

    const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect1.setAttribute('width', '4');
    rect1.setAttribute('height', '8');
    rect1.setAttribute('fill', this.colors.textMuted);
    rect1.setAttribute('opacity', '0.3');

    const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect2.setAttribute('x', '4');
    rect2.setAttribute('width', '4');
    rect2.setAttribute('height', '8');
    rect2.setAttribute('fill', this.colors.bgSurface);

    pattern.appendChild(rect1);
    pattern.appendChild(rect2);
    defs.appendChild(pattern);
  }

  private getStatusColor(status: ScheduledSubject['status']): string {
    if (!this.colors) return '#666';

    switch (status) {
      case 'completed':
        return this.colors.success;
      case 'in-progress':
        return this.colors.accentPrimary;
      case 'scheduled':
        return this.colors.textMuted;
      case 'blocked':
        return this.colors.borderDefault;
      default:
        return this.colors.textMuted;
    }
  }

  private drawTodayMarker(bounds: { start: Date; end: Date }, height: number): void {
    if (!this.svg || !this.colors) return;

    const today = new Date();
    if (today < bounds.start || today > bounds.end) return;

    const daysFromStart = daysBetween(bounds.start, today);
    const x = this.LABEL_WIDTH + daysFromStart * this.DAY_WIDTH;

    // Vertical line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${x}`);
    line.setAttribute('y1', `${this.HEADER_HEIGHT}`);
    line.setAttribute('x2', `${x}`);
    line.setAttribute('y2', `${height - this.PADDING}`);
    line.setAttribute('stroke', this.colors.error);
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '4,2');
    this.svg.appendChild(line);

    // "Today" label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', `${x}`);
    label.setAttribute('y', `${this.HEADER_HEIGHT - 5}`);
    label.setAttribute('fill', this.colors.error);
    label.setAttribute('font-size', '10');
    label.setAttribute('font-family', 'system-ui, sans-serif');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = 'Today';
    this.svg.appendChild(label);
  }

  private createTooltip(): void {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'timeline-tooltip';
    this.tooltip.style.display = 'none';
    this.container.appendChild(this.tooltip);
  }

  private showTooltip(event: MouseEvent, scheduled: ScheduledSubject): void {
    if (!this.tooltip) return;

    const startStr = scheduled.startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const endStr = scheduled.endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const statusLabels: Record<ScheduledSubject['status'], string> = {
      completed: 'Completed',
      'in-progress': 'In Progress',
      scheduled: 'Scheduled',
      blocked: 'Blocked (prerequisites needed)',
    };

    this.tooltip.innerHTML = `
      <div class="tooltip-title">${scheduled.subject.code}: ${scheduled.subject.title}</div>
      <div class="tooltip-dates">${startStr} - ${endStr}</div>
      <div class="tooltip-status status-${scheduled.status}">${statusLabels[scheduled.status]}</div>
      ${scheduled.status === 'in-progress' ? `<div class="tooltip-progress">${scheduled.completionPercentage}% complete</div>` : ''}
    `;

    this.tooltip.style.display = 'block';

    // Position tooltip
    const rect = this.container.getBoundingClientRect();
    const x = event.clientX - rect.left + 10;
    const y = event.clientY - rect.top + 10;

    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
  }

  private hideTooltip(): void {
    if (this.tooltip) {
      this.tooltip.style.display = 'none';
    }
  }
}
