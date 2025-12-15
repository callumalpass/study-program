import { h } from 'preact';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
}

export function ProgressRing({
  percentage,
  size = 24,
  strokeWidth = 3,
  color,
  backgroundColor = 'var(--color-bg-elevated)',
  showText = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  // Determine color based on percentage if not provided
  const ringColor = color || (
    percentage === 0 ? 'var(--color-text-muted)' :
    percentage === 100 ? 'var(--color-status-success)' :
    'var(--color-status-warning)'
  );

  return (
    <svg
      class="progress-ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Background circle */}
      <circle
        class="progress-ring-bg"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        stroke-width={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        class="progress-ring-fill"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={ringColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
      {/* Optional text */}
      {showText && (
        <text
          x={center}
          y={center}
          text-anchor="middle"
          dominant-baseline="central"
          class="progress-ring-text"
          font-size={size * 0.3}
          fill="var(--color-text-primary)"
        >
          {Math.round(percentage)}%
        </text>
      )}
    </svg>
  );
}
