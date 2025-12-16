import type { Subject, UserProgress, StudyPace, SubjectScheduleOverride } from '@/core/types';
import { navigateToSubject } from '@/core/router';
import {
  calculateSchedule,
  getTimelineBounds,
  formatMonthYear,
  daysBetween,
  xPositionToDate,
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

export interface TimelineGanttOptions {
  onSubjectMoved?: (subjectId: string, newStartDate: Date) => void;
  subjectOverrides?: Record<string, SubjectScheduleOverride>;
}

interface DragState {
  subjectId: string;
  startX: number;
  originalDate: Date;
  barElement: SVGGElement;
  ghostBar: SVGRectElement | null;
  constraintLine: SVGLineElement | null;
}

export class TimelineGantt {
  private container: HTMLElement;
  private subjects: Subject[];
  private userProgress: UserProgress;
  private startDate: Date;
  private pace: StudyPace;
  private schedule: Map<string, ScheduledSubject>;
  private bounds: { start: Date; end: Date } = { start: new Date(), end: new Date() };
  private colors: ReturnType<typeof getThemeColors> | null = null;
  private svg: SVGSVGElement | null = null;
  private tooltip: HTMLElement | null = null;
  private options: TimelineGanttOptions;

  // Drag state
  private dragState: DragState | null = null;
  private isDragging = false;

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
    pace: StudyPace,
    options: TimelineGanttOptions = {}
  ) {
    this.subjects = subjects;
    this.userProgress = userProgress;
    this.startDate = startDate;
    this.pace = pace;
    this.options = options;
    this.schedule = calculateSchedule(
      subjects,
      userProgress,
      startDate,
      pace,
      options.subjectOverrides
    );

    this.container = document.createElement('div');
    this.container.className = 'timeline-gantt-container';

    // Bind event handlers
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.colors = getThemeColors();

    this.bounds = getTimelineBounds(this.schedule);
    const totalDays = daysBetween(this.bounds.start, this.bounds.end) + 30; // Add buffer
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
    this.drawTimeAxis(totalDays);
    this.drawSubjectRows();
    this.drawTodayMarker(svgHeight);

    this.container.appendChild(this.svg);

    // Create tooltip element
    this.createTooltip();

    // Add global mouse event listeners for dragging
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);

    return this.container;
  }

  public destroy(): void {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
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

  private drawTimeAxis(totalDays: number): void {
    if (!this.svg || !this.colors) return;

    const startX = this.LABEL_WIDTH;
    let currentDate = new Date(this.bounds.start);
    currentDate.setDate(1); // Start from first of month

    while (currentDate <= this.bounds.end) {
      const daysFromStart = daysBetween(this.bounds.start, currentDate);
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

  private drawSubjectRows(): void {
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
      this.drawSubjectBar(scheduled, y, index);
    });
  }

  private drawSubjectBar(
    scheduled: ScheduledSubject,
    y: number,
    rowIndex: number
  ): void {
    if (!this.svg || !this.colors) return;

    const startX = this.LABEL_WIDTH;
    const daysFromStart = daysBetween(this.bounds.start, scheduled.startDate);
    const duration = daysBetween(scheduled.startDate, scheduled.endDate);

    const barX = startX + daysFromStart * this.DAY_WIDTH;
    const barWidth = Math.max(duration * this.DAY_WIDTH, 10);
    const barY = y + (this.ROW_HEIGHT - this.BAR_HEIGHT) / 2;

    // Get bar color based on status
    const barColor = this.getStatusColor(scheduled.status);

    // Check if subject is behind schedule (actual progress < expected progress)
    const today = new Date();
    let isOverdue = false;
    if (scheduled.status !== 'completed' && today >= scheduled.startDate) {
      const totalDuration = scheduled.endDate.getTime() - scheduled.startDate.getTime();
      const elapsed = Math.min(today.getTime() - scheduled.startDate.getTime(), totalDuration);
      const expectedProgress = (elapsed / totalDuration) * 100;
      isOverdue = scheduled.completionPercentage < expectedProgress;
    }

    // Create bar group
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.style.cursor = this.options.onSubjectMoved ? 'grab' : 'pointer';
    group.setAttribute('data-subject-id', scheduled.subject.id);
    group.setAttribute('data-row-index', `${rowIndex}`);

    // Main bar
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', `${barX}`);
    bar.setAttribute('y', `${barY}`);
    bar.setAttribute('width', `${barWidth}`);
    bar.setAttribute('height', `${this.BAR_HEIGHT}`);
    bar.setAttribute('rx', `${this.BAR_RADIUS}`);
    bar.setAttribute('fill', barColor);
    bar.setAttribute('opacity', scheduled.status === 'blocked' ? '0.4' : '0.8');
    bar.classList.add('timeline-bar-main');

    // Add red border for overdue subjects
    if (isOverdue) {
      bar.setAttribute('stroke', this.colors.error);
      bar.setAttribute('stroke-width', '2');
    }

    group.appendChild(bar);

    // Override indicator (small dot)
    if (scheduled.hasOverride) {
      const indicator = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      indicator.setAttribute('cx', `${barX + 8}`);
      indicator.setAttribute('cy', `${barY + 8}`);
      indicator.setAttribute('r', '4');
      indicator.setAttribute('fill', this.colors.warning);
      group.appendChild(indicator);
    }

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
    group.addEventListener('mousedown', (e) => this.handleMouseDown(e, scheduled, group, barY));
    group.addEventListener('mouseenter', (e) => {
      if (!this.isDragging) this.showTooltip(e, scheduled);
    });
    group.addEventListener('mouseleave', () => {
      if (!this.isDragging) this.hideTooltip();
    });

    this.svg.appendChild(group);
  }

  private handleMouseDown(
    e: MouseEvent,
    scheduled: ScheduledSubject,
    group: SVGGElement,
    barY: number
  ): void {
    // Only enable dragging if callback is provided
    if (!this.options.onSubjectMoved) {
      navigateToSubject(scheduled.subject.id);
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this.isDragging = true;
    this.hideTooltip();

    // Create ghost bar for dragging
    const ghostBar = this.createGhostBar(scheduled, barY);

    // Create constraint line (earliest valid date)
    const constraintLine = this.createConstraintLine(scheduled, barY);

    this.dragState = {
      subjectId: scheduled.subject.id,
      startX: e.clientX,
      originalDate: new Date(scheduled.startDate),
      barElement: group,
      ghostBar,
      constraintLine,
    };

    group.style.cursor = 'grabbing';
    group.style.opacity = '0.5';
  }

  private createGhostBar(scheduled: ScheduledSubject, barY: number): SVGRectElement | null {
    if (!this.svg || !this.colors) return null;

    const daysFromStart = daysBetween(this.bounds.start, scheduled.startDate);
    const duration = daysBetween(scheduled.startDate, scheduled.endDate);
    const barX = this.LABEL_WIDTH + daysFromStart * this.DAY_WIDTH;
    const barWidth = Math.max(duration * this.DAY_WIDTH, 10);

    const ghostBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    ghostBar.setAttribute('x', `${barX}`);
    ghostBar.setAttribute('y', `${barY}`);
    ghostBar.setAttribute('width', `${barWidth}`);
    ghostBar.setAttribute('height', `${this.BAR_HEIGHT}`);
    ghostBar.setAttribute('rx', `${this.BAR_RADIUS}`);
    ghostBar.setAttribute('fill', this.colors.accentPrimary);
    ghostBar.setAttribute('opacity', '0.6');
    ghostBar.setAttribute('stroke', this.colors.accentPrimary);
    ghostBar.setAttribute('stroke-width', '2');
    ghostBar.style.pointerEvents = 'none';

    this.svg.appendChild(ghostBar);
    return ghostBar;
  }

  private createConstraintLine(scheduled: ScheduledSubject, barY: number): SVGLineElement | null {
    if (!this.svg || !this.colors) return null;

    const earliestDays = daysBetween(this.bounds.start, scheduled.earliestValidStart);
    const x = this.LABEL_WIDTH + earliestDays * this.DAY_WIDTH;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${x}`);
    line.setAttribute('y1', `${barY - 4}`);
    line.setAttribute('x2', `${x}`);
    line.setAttribute('y2', `${barY + this.BAR_HEIGHT + 4}`);
    line.setAttribute('stroke', this.colors.warning);
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '4,2');
    line.style.pointerEvents = 'none';

    this.svg.appendChild(line);
    return line;
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging || !this.dragState || !this.dragState.ghostBar) return;

    const deltaX = e.clientX - this.dragState.startX;
    const deltaDays = Math.round(deltaX / this.DAY_WIDTH);

    // Calculate new date
    const newDate = new Date(this.dragState.originalDate);
    newDate.setDate(newDate.getDate() + deltaDays);

    // Get scheduled subject for constraint checking
    const scheduled = this.schedule.get(this.dragState.subjectId);
    if (!scheduled) return;

    // Calculate new bar position
    const daysFromStart = daysBetween(this.bounds.start, newDate);
    const duration = daysBetween(scheduled.startDate, scheduled.endDate);
    const newBarX = this.LABEL_WIDTH + daysFromStart * this.DAY_WIDTH;

    // Update ghost bar position
    this.dragState.ghostBar.setAttribute('x', `${newBarX}`);

    // Update ghost bar color based on constraint
    if (newDate < scheduled.earliestValidStart && this.colors) {
      this.dragState.ghostBar.setAttribute('stroke', this.colors.error);
      this.dragState.ghostBar.setAttribute('fill', this.colors.error);
    } else if (this.colors) {
      this.dragState.ghostBar.setAttribute('stroke', this.colors.accentPrimary);
      this.dragState.ghostBar.setAttribute('fill', this.colors.accentPrimary);
    }
  }

  private handleMouseUp(e: MouseEvent): void {
    if (!this.isDragging || !this.dragState) return;

    const deltaX = e.clientX - this.dragState.startX;
    const deltaDays = Math.round(deltaX / this.DAY_WIDTH);

    // Calculate new date
    let newDate = new Date(this.dragState.originalDate);
    newDate.setDate(newDate.getDate() + deltaDays);

    // Get scheduled subject for constraint checking
    const scheduled = this.schedule.get(this.dragState.subjectId);

    // Snap to earliest valid date if before constraint
    if (scheduled && newDate < scheduled.earliestValidStart) {
      newDate = new Date(scheduled.earliestValidStart);
    }

    // Clean up ghost elements
    if (this.dragState.ghostBar) {
      this.dragState.ghostBar.remove();
    }
    if (this.dragState.constraintLine) {
      this.dragState.constraintLine.remove();
    }

    // Restore bar appearance
    this.dragState.barElement.style.cursor = 'grab';
    this.dragState.barElement.style.opacity = '1';

    // Only fire callback if date actually changed (more than a few pixels)
    if (Math.abs(deltaDays) > 0 && this.options.onSubjectMoved) {
      this.options.onSubjectMoved(this.dragState.subjectId, newDate);
    }

    this.isDragging = false;
    this.dragState = null;
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

  private drawTodayMarker(height: number): void {
    if (!this.svg || !this.colors) return;

    const today = new Date();
    if (today < this.bounds.start || today > this.bounds.end) return;

    const daysFromStart = daysBetween(this.bounds.start, today);
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

    // Check if behind schedule (actual progress < expected progress)
    const today = new Date();
    let isOverdue = false;
    if (scheduled.status !== 'completed' && today >= scheduled.startDate) {
      const totalDuration = scheduled.endDate.getTime() - scheduled.startDate.getTime();
      const elapsed = Math.min(today.getTime() - scheduled.startDate.getTime(), totalDuration);
      const expectedProgress = (elapsed / totalDuration) * 100;
      isOverdue = scheduled.completionPercentage < expectedProgress;
    }

    const dragHint = this.options.onSubjectMoved ? '<div class="tooltip-hint">Drag to reschedule</div>' : '';
    const overrideNote = scheduled.hasOverride ? '<div class="tooltip-override">Custom schedule</div>' : '';
    const overdueNote = isOverdue ? '<div class="tooltip-overdue">⚠ Overdue</div>' : '';

    this.tooltip.innerHTML = `
      <div class="tooltip-title">${scheduled.subject.code}: ${scheduled.subject.title}</div>
      <div class="tooltip-dates">${startStr} - ${endStr}</div>
      <div class="tooltip-status status-${scheduled.status}">${statusLabels[scheduled.status]}</div>
      ${scheduled.status === 'in-progress' ? `<div class="tooltip-progress">${scheduled.completionPercentage}% complete</div>` : ''}
      ${overdueNote}
      ${overrideNote}
      ${dragHint}
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
