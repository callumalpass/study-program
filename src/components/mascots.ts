/**
 * stup Brick Mascots
 *
 * Six expressions of the brick mascot, using CSS variables for theming.
 * Colors: --brick-body, --brick-stroke, --brick-glasses, --brick-pupils, --brick-mouth
 */

const BRICK_BASE = {
  viewBox: '0 0 64 64',
  width: 64,
  height: 64,
};

// Shared brick body
const brickBody = `
  <rect x="18" y="28" width="28" height="20" rx="4" class="brick-fill" />
  <line x1="20" y1="28" x2="44" y2="28" class="brick-stroke" />
`;

// Standard glasses (no side arms)
const glasses = `
  <g class="brick-glasses">
    <circle cx="26" cy="37" r="4" />
    <circle cx="38" cy="37" r="4" />
    <path d="M30 37h4" />
  </g>
`;

// Glasses glint effect
const glassesGlint = `
  <circle cx="24" cy="35" r="1" class="brick-glint" />
  <circle cx="36" cy="35" r="1" class="brick-glint" />
`;

// Standard blinking eyes
const eyesBlink = `
  <g class="brick-blink">
    <circle cx="26" cy="37" r="1.2" class="brick-pupils" />
    <circle cx="38" cy="37" r="1.2" class="brick-pupils" />
  </g>
`;

// Eyes looking up-right (for Pondering)
const eyesUpRight = `
  <g class="brick-blink">
    <circle cx="27" cy="36" r="1.2" class="brick-pupils" />
    <circle cx="39" cy="36" r="1.2" class="brick-pupils" />
  </g>
`;

// Eyes for scanning/reading
const eyesScan = `
  <g class="brick-eyes-scan">
    <circle cx="25" cy="38" r="1.2" class="brick-pupils" />
    <circle cx="37" cy="38" r="1.2" class="brick-pupils" />
  </g>
`;

// Happy closed eyes (arcs)
const eyesHappy = `
  <path d="M24 37q2 -2 4 0" class="brick-stroke" stroke-width="1.8" fill="none" />
  <path d="M36 37q2 -2 4 0" class="brick-stroke" stroke-width="1.8" fill="none" />
`;

// Mouth variations
const mouthNeutral = `<path d="M29 44h6" class="brick-stroke" stroke-width="1.5" />`;
const mouthSmile = `<path d="M28 44q4 2.5 8 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;
const mouthThink = `<circle cx="32" cy="45" r="2" class="brick-stroke" fill="none" stroke-width="1.5" />`;
const mouthFrown = `<path d="M29 44q3 -1 6 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;
const mouthBigSmile = `<path d="M27 44q5 4 10 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;

/**
 * Brick Mascot Variants
 */
export const Mascots = {
  /**
   * Pensive - Default idle state
   * Calm, observant, ready to learn. Just blinks.
   */
  Pensive: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-pensive">
      ${brickBody}
      ${glasses}
      ${eyesBlink}
      ${mouthNeutral}
    </g>
  </svg>`,

  /**
   * Kinetic - Falling/loading animation
   * Falls, squashes, recovers. For loading states.
   */
  Kinetic: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-kinetic">
      ${brickBody}
      <g class="brick-face">
        ${glasses}
        ${eyesBlink}
        ${mouthNeutral}
      </g>
    </g>
  </svg>`,

  /**
   * Zen - Floating contentment
   * Floats peacefully. For success or completion states.
   */
  Zen: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-zen">
      ${brickBody}
      ${glasses}
      ${glassesGlint}
      ${eyesBlink}
      ${mouthSmile}
    </g>
  </svg>`,

  /**
   * Pondering - Thinking/processing
   * Wobbles while thinking. Eyes drift upward.
   */
  Pondering: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-pondering">
      ${brickBody}
      ${glasses}
      ${eyesUpRight}
      ${mouthThink}
    </g>
  </svg>`,

  /**
   * Reading - Active study mode
   * Eyes scan left-right. Slight concentration expression.
   */
  Reading: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-reading">
      ${brickBody}
      ${glasses}
      ${eyesScan}
      ${mouthFrown}
    </g>
  </svg>`,

  /**
   * Delighted - Achievement/celebration
   * Floats with happy squinted eyes and big smile.
   */
  Delighted: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-delighted">
      ${brickBody}
      ${glasses}
      ${glassesGlint}
      ${eyesHappy}
      ${mouthBigSmile}
    </g>
  </svg>`,
};

/**
 * Helper to get a mascot with custom size
 */
export function getMascot(name: keyof typeof Mascots, size: number = 64): string {
  const svg = Mascots[name];
  return svg
    .replace(`width="${BRICK_BASE.width}"`, `width="${size}"`)
    .replace(`height="${BRICK_BASE.height}"`, `height="${size}"`);
}

export default Mascots;
