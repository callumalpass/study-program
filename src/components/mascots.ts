/**
 * stu.p Brick Mascots
 *
 * Six expressions of the brick mascot, using CSS variables for theming.
 * Colors: --brick-body, --brick-stroke, --brick-glasses, --brick-pupils, --brick-mouth
 */

export const BRICK_BASE = {
  viewBox: '0 0 64 64',
  width: 64,
  height: 64,
};

// Shared brick body
export const brickBody = `
  <rect x="18" y="28" width="28" height="20" rx="4" class="brick-fill" />
  <line x1="20" y1="28" x2="44" y2="28" class="brick-stroke" />
`;

// Standard glasses (no side arms)
export const glasses = `
  <g class="brick-glasses">
    <circle cx="26" cy="37" r="4" />
    <circle cx="38" cy="37" r="4" />
    <path d="M30 37h4" />
  </g>
`;

// Glasses glint effect
export const glassesGlint = `
  <circle cx="24" cy="35" r="1" class="brick-glint" />
  <circle cx="36" cy="35" r="1" class="brick-glint" />
`;

// Standard blinking eyes
export const eyesBlink = `
  <g class="brick-blink">
    <circle cx="26" cy="37" r="1.2" class="brick-pupils" />
    <circle cx="38" cy="37" r="1.2" class="brick-pupils" />
  </g>
`;

// Eyes looking up-right (for Pondering)
export const eyesUpRight = `
  <g class="brick-blink">
    <circle cx="27" cy="36" r="1.2" class="brick-pupils" />
    <circle cx="39" cy="36" r="1.2" class="brick-pupils" />
  </g>
`;

// Eyes for scanning/reading
export const eyesScan = `
  <g class="brick-eyes-scan">
    <circle cx="25" cy="38" r="1.2" class="brick-pupils" />
    <circle cx="37" cy="38" r="1.2" class="brick-pupils" />
  </g>
`;

// Happy closed eyes (arcs)
export const eyesHappy = `
  <path d="M24 37q2 -2 4 0" class="brick-stroke" stroke-width="1.8" fill="none" />
  <path d="M36 37q2 -2 4 0" class="brick-stroke" stroke-width="1.8" fill="none" />
`;

// Mouth variations
export const mouthNeutral = `<path d="M29 44h6" class="brick-stroke" stroke-width="1.5" />`;
export const mouthSmile = `<path d="M28 44q4 2.5 8 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;
export const mouthThink = `<circle cx="32" cy="45" r="2" class="brick-stroke" fill="none" stroke-width="1.5" />`;
export const mouthFrown = `<path d="M29 44q3 -1 6 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;
export const mouthBigSmile = `<path d="M27 44q5 4 10 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;
export const mouthSleep = `<path d="M29 44q3 1.2 6 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;

// Wavy mouth for confusion
export const mouthWavy = `<path d="M28 44c1-1 2 1 3 0s2-1 3 0s2 1 3 0" class="brick-stroke" stroke-width="1.5" fill="none" />`;

// Open mouth for shock
export const mouthOpen = `<circle cx="32" cy="45" r="3" class="brick-stroke" stroke-width="1.5" fill="none" />`;

// Yawn mouth (wide oval)
export const mouthYawn = `<ellipse cx="32" cy="45" rx="4" ry="3" class="brick-stroke" stroke-width="1.5" fill="none" />`;

// Squinty eyes for yawning
export const eyesSquint = `
  <path d="M24 37q2 1 4 0" class="brick-stroke" stroke-width="1.5" fill="none" />
  <path d="M36 37q2 1 4 0" class="brick-stroke" stroke-width="1.5" fill="none" />
`;

// Closed eyes for sleeping
export const eyesClosed = `
  <path d="M24 37q2 2 4 0" class="brick-stroke" stroke-width="1.5" fill="none" />
  <path d="M36 37q2 2 4 0" class="brick-stroke" stroke-width="1.5" fill="none" />
`;

// Spiral eyes for dizzy
export const eyesSpiral = `
  <g class="brick-eyes-spiral">
    <path d="M26 37 m-2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0" class="brick-stroke" stroke-width="1.2" fill="none" stroke-dasharray="8 2" />
    <path d="M38 37 m-2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0" class="brick-stroke" stroke-width="1.2" fill="none" stroke-dasharray="8 2" />
  </g>
`;

// Sweat drops for stress
export const sweatDrops = `
  <path d="M50 30q-2 4 0 6q2-2 0-6" class="brick-stroke" fill="#a29bfe" stroke-width="1.5" />
  <path d="M14 32q2 4 0 6q-2-2 0-6" class="brick-stroke" fill="#a29bfe" stroke-width="1.5" />
`;

// Sunglasses for confidence
export const sunglasses = `
  <g class="brick-sunglasses">
    <circle cx="26" cy="37" r="4.5" fill="#2d3436" class="brick-stroke" />
    <circle cx="38" cy="37" r="4.5" fill="#2d3436" class="brick-stroke" />
    <path d="M30 37h4" class="brick-stroke" stroke-width="2" />
    <path d="M23 35q2 -2 2 0" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.6" />
  </g>
`;

// Furrowed brows for determination
export const browsFurrowed = `
  <path d="M22 32l6 2" class="brick-stroke" stroke-width="1.5" />
  <path d="M42 32l-6 2" class="brick-stroke" stroke-width="1.5" />
`;

// Grit teeth for determination
export const mouthGrit = `<rect x="28" y="44" width="8" height="3" rx="1" class="brick-stroke" stroke-width="1.5" fill="none" />`;

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
   * Confident - Mastery/Expertise
   * Wearing sunglasses, cool demeanor.
   */
  Confident: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-confident">
      ${brickBody}
      ${sunglasses}
      ${mouthSmile}
    </g>
  </svg>`,

  /**
   * Stressed - High pressure/Deadline
   * Sweat drops, wide eyes.
   */
  Stressed: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-stressed">
      ${brickBody}
      ${glasses}
      ${eyesBlink}
      ${mouthWavy}
      ${sweatDrops}
    </g>
  </svg>`,

  /**
   * Determined - Focus/Challenge
   * Furrowed brows, gritty expression.
   */
  Determined: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-determined">
      ${brickBody}
      ${glasses}
      ${eyesBlink}
      ${browsFurrowed}
      ${mouthGrit}
    </g>
  </svg>`,

  /**
   * Confused - Something isn't right
   * Crooked glasses and wavy mouth.
   */
  Confused: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-confused">
      ${brickBody}
      <g transform="rotate(-5, 32, 37)">
        ${glasses}
      </g>
      ${eyesBlink}
      ${mouthWavy}
    </g>
  </svg>`,

  /**
   * Shocked - Surprise or error
   * Glasses raised high, mouth open.
   */
  Shocked: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-shocked">
      ${brickBody}
      <g transform="translate(0, -3)">
        ${glasses}
      </g>
      ${eyesBlink}
      ${mouthOpen}
    </g>
  </svg>`,

  /**
   * Sleeping - Idle/Offline
   * Eyes closed, peaceful.
   */
  Sleeping: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-sleeping">
      ${brickBody}
      ${glasses}
      ${eyesClosed}
      ${mouthSleep}
      <path d="M46 22l4-4h-4l4-4" class="brick-stroke brick-snooze" stroke-width="1.5" opacity="0.5" />
      <path d="M40 26l3-3h-3l3-3" class="brick-stroke brick-snooze brick-snooze-delay" stroke-width="1.2" opacity="0.5" />
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

  /**
   * Dizzy - Disoriented/Shaken
   * Spiral eyes, wavy mouth.
   */
  Dizzy: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="${BRICK_BASE.viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-dizzy">
      ${brickBody}
      ${glasses}
      ${eyesSpiral}
      ${mouthWavy}
    </g>
  </svg>`,

  /**
   * Favicon - Zoomed in for small displays
   */
  Favicon: `<svg xmlns="http://www.w3.org/2000/svg" width="${BRICK_BASE.width}" height="${BRICK_BASE.height}" viewBox="16 26 32 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g class="brick-pensive">
      ${brickBody}
      ${glasses}
      ${eyesBlink}
      ${mouthNeutral}
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
