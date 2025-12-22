/**
 * Render a linear progress bar.
 */
export function renderProgressBar(
  container: HTMLElement,
  percent: number,
  label?: string,
  options: {
    color?: string;
    showPercentage?: boolean;
    height?: string;
    animated?: boolean;
  } = {}
): void {
  container.innerHTML = '';
  container.classList.add('progress-bar-container');

  // Clamp percentage between 0 and 100
  const clampedPercent = Math.max(0, Math.min(100, percent));

  // Label
  if (label || options.showPercentage !== false) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'progress-label';

    if (label) {
      const labelText = document.createElement('span');
      labelText.textContent = label;
      labelDiv.appendChild(labelText);
    }

    if (options.showPercentage !== false) {
      const percentText = document.createElement('span');
      percentText.className = 'progress-percentage';
      percentText.textContent = `${Math.round(clampedPercent)}%`;
      labelDiv.appendChild(percentText);
    }

    container.appendChild(labelDiv);
  }

  // Progress bar track
  const track = document.createElement('div');
  track.className = 'progress-track';
  if (options.height) {
    track.style.height = options.height;
  }

  // Progress bar fill
  const fill = document.createElement('div');
  fill.className = `progress-fill${options.animated ? ' animated' : ''}`;
  fill.style.width = `${clampedPercent}%`;

  if (options.color) {
    fill.style.backgroundColor = options.color;
  }

  track.appendChild(fill);
  container.appendChild(track);
}

/**
 * Render a circular progress indicator.
 */
export function renderCircularProgress(
  container: HTMLElement,
  percent: number,
  options: {
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    showLabel?: boolean;
    label?: string;
  } = {}
): void {
  container.innerHTML = '';
  container.classList.add('circular-progress-container');

  const size = options.size || 120;
  const strokeWidth = options.strokeWidth || 8;
  const color = options.color || '#3b82f6';
  const backgroundColor = options.backgroundColor || '#e5e7eb';

  // Clamp percentage
  const clampedPercent = Math.max(0, Math.min(100, percent));

  // SVG dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedPercent / 100) * circumference;

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('class', 'circular-progress-svg');

  // Background circle
  const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  backgroundCircle.setAttribute('cx', String(size / 2));
  backgroundCircle.setAttribute('cy', String(size / 2));
  backgroundCircle.setAttribute('r', String(radius));
  backgroundCircle.setAttribute('fill', 'none');
  backgroundCircle.setAttribute('stroke', backgroundColor);
  backgroundCircle.setAttribute('stroke-width', String(strokeWidth));
  svg.appendChild(backgroundCircle);

  // Progress circle
  const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  progressCircle.setAttribute('cx', String(size / 2));
  progressCircle.setAttribute('cy', String(size / 2));
  progressCircle.setAttribute('r', String(radius));
  progressCircle.setAttribute('fill', 'none');
  progressCircle.setAttribute('stroke', color);
  progressCircle.setAttribute('stroke-width', String(strokeWidth));
  progressCircle.setAttribute('stroke-linecap', 'round');
  progressCircle.setAttribute('stroke-dasharray', String(circumference));
  progressCircle.setAttribute('stroke-dashoffset', String(offset));
  progressCircle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`);
  progressCircle.classList.add('progress-circle');
  svg.appendChild(progressCircle);

  container.appendChild(svg);

  // Label
  if (options.showLabel !== false) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'circular-progress-label';
    labelDiv.style.width = `${size}px`;
    labelDiv.style.height = `${size}px`;

    const percentText = document.createElement('div');
    percentText.className = 'circular-progress-percent';
    percentText.textContent = `${Math.round(clampedPercent)}%`;
    labelDiv.appendChild(percentText);

    if (options.label) {
      const labelText = document.createElement('div');
      labelText.className = 'circular-progress-text';
      labelText.textContent = options.label;
      labelDiv.appendChild(labelText);
    }

    container.appendChild(labelDiv);
  }
}

/**
 * Render multiple progress indicators in a grid (useful for subject overview).
 */
export function renderProgressGrid(
  container: HTMLElement,
  items: Array<{
    label: string;
    percent: number;
    color?: string;
    onClick?: () => void;
  }>,
  options: {
    columns?: number;
    type?: 'linear' | 'circular';
  } = {}
): void {
  container.innerHTML = '';
  container.className = 'progress-grid';

  const columns = options.columns || 3;
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  items.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `progress-grid-item${item.onClick ? ' clickable' : ''}`;

    if (item.onClick) {
      itemDiv.onclick = item.onClick;
    }

    if (options.type === 'circular') {
      renderCircularProgress(itemDiv, item.percent, {
        color: item.color,
        label: item.label,
        size: 100,
      });
    } else {
      renderProgressBar(itemDiv, item.percent, item.label, {
        color: item.color,
      });
    }

    container.appendChild(itemDiv);
  });
}
