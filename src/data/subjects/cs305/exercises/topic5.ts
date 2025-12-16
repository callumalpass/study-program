import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // 1. Basic Media Query Function
  {
    id: 'cs305-t5-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Create Media Query Matcher',
    description: 'Write a function `matchesMedia(query)` that returns true if the given media query matches the current viewport. Use `window.matchMedia()` API.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `function matchesMedia(query) {
  // Your code here
}`,
    solution: `function matchesMedia(query) {
  return window.matchMedia(query).matches;
}`,
    testCases: [
      { input: '"(min-width: 768px)"', expectedOutput: 'true or false based on viewport', isHidden: false, description: 'Check tablet breakpoint' },
      { input: '"(prefers-color-scheme: dark)"', expectedOutput: 'true or false based on user preference', isHidden: false, description: 'Check color scheme preference' }
    ],
    hints: [
      'Use window.matchMedia() to create a MediaQueryList object',
      'Access the matches property to get the boolean result'
    ]
  },

  // 2. Viewport Width Calculator
  {
    id: 'cs305-t5-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Calculate Viewport Width',
    description: 'Create a function `getViewportWidth()` that returns the current viewport width in pixels.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `function getViewportWidth() {
  // Your code here
}`,
    solution: `function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth;
}`,
    testCases: [
      { input: '', expectedOutput: 'number (viewport width in pixels)', isHidden: false, description: 'Get current viewport width' }
    ],
    hints: [
      'Use window.innerWidth for modern browsers',
      'Fallback to document.documentElement.clientWidth for older browsers'
    ]
  },

  // 3. Breakpoint Detector
  {
    id: 'cs305-t5-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Detect Current Breakpoint',
    description: 'Write a function `getCurrentBreakpoint()` that returns the current breakpoint name ("mobile", "tablet", or "desktop") based on viewport width. Mobile: <768px, Tablet: 768-1024px, Desktop: >1024px.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function getCurrentBreakpoint() {
  // Your code here
}`,
    solution: `function getCurrentBreakpoint() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}`,
    testCases: [
      { input: 'viewport width: 500', expectedOutput: '"mobile"', isHidden: false, description: 'Mobile device' },
      { input: 'viewport width: 800', expectedOutput: '"tablet"', isHidden: false, description: 'Tablet device' },
      { input: 'viewport width: 1200', expectedOutput: '"desktop"', isHidden: false, description: 'Desktop device' }
    ],
    hints: [
      'Get the viewport width first',
      'Use conditional statements to determine the breakpoint range'
    ]
  },

  // 4. Fluid Font Size Calculator
  {
    id: 'cs305-t5-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Calculate Fluid Font Size',
    description: 'Create a function `fluidFontSize(minSize, maxSize, minWidth, maxWidth)` that calculates a responsive font size using linear interpolation based on viewport width. Return a string like "clamp(minSize, calculation, maxSize)".',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function fluidFontSize(minSize, maxSize, minWidth, maxWidth) {
  // Your code here
}`,
    solution: `function fluidFontSize(minSize, maxSize, minWidth, maxWidth) {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const intercept = minSize - slope * minWidth;
  return \`clamp(\${minSize}px, \${intercept}px + \${slope * 100}vw, \${maxSize}px)\`;
}`,
    testCases: [
      { input: '16, 24, 320, 1024', expectedOutput: '"clamp(16px, 9.09px + 2.27vw, 24px)"', isHidden: false, description: 'Fluid typography between mobile and desktop' },
      { input: '14, 18, 375, 768', expectedOutput: '"clamp(14px, 2.04px + 3.05vw, 18px)"', isHidden: false, description: 'Smaller range calculation' }
    ],
    hints: [
      'Calculate the slope: (maxSize - minSize) / (maxWidth - minWidth)',
      'Calculate the y-intercept: minSize - slope * minWidth',
      'Use template literals to format the clamp() CSS function'
    ]
  },

  // 5. Aspect Ratio Calculator
  {
    id: 'cs305-t5-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Calculate Aspect Ratio',
    description: 'Write a function `calculateAspectRatio(width, height)` that returns the aspect ratio as a string (e.g., "16:9"). Simplify to common ratios when possible.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function calculateAspectRatio(width, height) {
  // Your code here
}`,
    solution: `function calculateAspectRatio(width, height) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  const divisor = gcd(width, height);
  return \`\${width / divisor}:\${height / divisor}\`;
}`,
    testCases: [
      { input: '1920, 1080', expectedOutput: '"16:9"', isHidden: false, description: 'Standard widescreen' },
      { input: '1024, 768', expectedOutput: '"4:3"', isHidden: false, description: 'Classic display' },
      { input: '800, 600', expectedOutput: '"4:3"', isHidden: false, description: 'Another 4:3 ratio' }
    ],
    hints: [
      'Use the greatest common divisor (GCD) to simplify the ratio',
      'Implement GCD using Euclidean algorithm',
      'Divide both width and height by the GCD'
    ]
  },

  // 6. Accessible Color Contrast Checker
  {
    id: 'cs305-t5-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Check WCAG Color Contrast',
    description: 'Create a function `hasGoodContrast(color1, color2, level)` that checks if two hex colors meet WCAG contrast requirements. Level can be "AA" (4.5:1) or "AAA" (7:1). Return true/false.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function hasGoodContrast(color1, color2, level = 'AA') {
  // Your code here
}`,
    solution: `function hasGoodContrast(color1, color2, level = 'AA') {
  function hexToRgb(hex) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

  return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
}`,
    testCases: [
      { input: '"#000000", "#FFFFFF", "AA"', expectedOutput: 'true', isHidden: false, description: 'Black and white - AA' },
      { input: '"#777777", "#FFFFFF", "AAA"', expectedOutput: 'false', isHidden: false, description: 'Gray and white - AAA fails' }
    ],
    hints: [
      'Convert hex colors to RGB first',
      'Calculate relative luminance for each color',
      'Contrast ratio = (lighter + 0.05) / (darker + 0.05)',
      'AA requires 4.5:1, AAA requires 7:1'
    ]
  },

  // 7. Responsive Image Source Selector
  {
    id: 'cs305-t5-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Select Responsive Image Source',
    description: 'Write a function `selectImageSource(sources, viewportWidth)` that takes an array of image sources with breakpoints and returns the appropriate source. Sources: [{url: "small.jpg", maxWidth: 768}, {url: "large.jpg", maxWidth: Infinity}].',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function selectImageSource(sources, viewportWidth) {
  // Your code here
}`,
    solution: `function selectImageSource(sources, viewportWidth) {
  const sorted = sources.sort((a, b) => a.maxWidth - b.maxWidth);
  for (const source of sorted) {
    if (viewportWidth <= source.maxWidth) {
      return source.url;
    }
  }
  return sorted[sorted.length - 1].url;
}`,
    testCases: [
      { input: '[{url: "small.jpg", maxWidth: 768}, {url: "large.jpg", maxWidth: Infinity}], 500', expectedOutput: '"small.jpg"', isHidden: false, description: 'Mobile viewport' },
      { input: '[{url: "small.jpg", maxWidth: 768}, {url: "large.jpg", maxWidth: Infinity}], 1024', expectedOutput: '"large.jpg"', isHidden: false, description: 'Desktop viewport' }
    ],
    hints: [
      'Sort sources by maxWidth in ascending order',
      'Find the first source where viewport is less than or equal to maxWidth',
      'Return the largest source as fallback'
    ]
  },

  // 8. Viewport Units Converter
  {
    id: 'cs305-t5-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Convert Viewport Units to Pixels',
    description: 'Create a function `vwToPx(vw)` that converts viewport width units to pixels based on current viewport width.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function vwToPx(vw) {
  // Your code here
}`,
    solution: `function vwToPx(vw) {
  const viewportWidth = window.innerWidth;
  return (vw * viewportWidth) / 100;
}`,
    testCases: [
      { input: '50 (with viewport width 1000px)', expectedOutput: '500', isHidden: false, description: '50vw on 1000px viewport' },
      { input: '100 (with viewport width 800px)', expectedOutput: '800', isHidden: false, description: '100vw on 800px viewport' }
    ],
    hints: [
      'Get current viewport width using window.innerWidth',
      '1vw = viewport width / 100',
      'Multiply vw value by (viewport width / 100)'
    ]
  },

  // 9. Media Query Listener
  {
    id: 'cs305-t5-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Add Media Query Listener',
    description: 'Write a function `onBreakpointChange(query, callback)` that listens for media query changes and calls the callback with the match status. Return a cleanup function.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function onBreakpointChange(query, callback) {
  // Your code here
}`,
    solution: `function onBreakpointChange(query, callback) {
  const mediaQuery = window.matchMedia(query);
  const handler = (e) => callback(e.matches);

  mediaQuery.addEventListener('change', handler);
  callback(mediaQuery.matches); // Call immediately with current state

  return () => mediaQuery.removeEventListener('change', handler);
}`,
    testCases: [
      { input: '"(min-width: 768px)", (matches) => console.log(matches)', expectedOutput: 'cleanup function', isHidden: false, description: 'Listen for tablet breakpoint changes' }
    ],
    hints: [
      'Create a MediaQueryList object using window.matchMedia()',
      'Add an event listener for "change" events',
      'Call the callback immediately with current match status',
      'Return a cleanup function that removes the listener'
    ]
  },

  // 10. Accessible Focus Visible Helper
  {
    id: 'cs305-t5-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Detect Keyboard Navigation',
    description: 'Create a function `isKeyboardNavigation()` that returns true if the user is currently navigating with keyboard (not mouse). Track the last interaction type.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function isKeyboardNavigation() {
  // Your code here
}`,
    solution: `function isKeyboardNavigation() {
  let usingKeyboard = false;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      usingKeyboard = true;
    }
  });

  document.addEventListener('mousedown', () => {
    usingKeyboard = false;
  });

  return () => usingKeyboard;
}`,
    testCases: [
      { input: 'User presses Tab key', expectedOutput: 'true', isHidden: false, description: 'Keyboard navigation detected' },
      { input: 'User clicks mouse', expectedOutput: 'false', isHidden: false, description: 'Mouse navigation detected' }
    ],
    hints: [
      'Listen for keydown events (specifically Tab key)',
      'Listen for mousedown events',
      'Maintain state tracking the current input method',
      'Return a function that returns the current state'
    ]
  },

  // 11. Grid Column Calculator
  {
    id: 'cs305-t5-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Calculate Responsive Grid Columns',
    description: 'Write a function `getGridColumns(viewportWidth)` that returns the appropriate number of grid columns based on viewport width. Mobile: 1, Tablet: 2, Desktop: 4.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function getGridColumns(viewportWidth) {
  // Your code here
}`,
    solution: `function getGridColumns(viewportWidth) {
  if (viewportWidth < 768) return 1;
  if (viewportWidth < 1024) return 2;
  return 4;
}`,
    testCases: [
      { input: '500', expectedOutput: '1', isHidden: false, description: 'Mobile: 1 column' },
      { input: '800', expectedOutput: '2', isHidden: false, description: 'Tablet: 2 columns' },
      { input: '1200', expectedOutput: '4', isHidden: false, description: 'Desktop: 4 columns' }
    ],
    hints: [
      'Use the same breakpoints as earlier exercises',
      'Return different column counts for each breakpoint range'
    ]
  },

  // 12. Touch Device Detector
  {
    id: 'cs305-t5-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Detect Touch Support',
    description: 'Create a function `isTouchDevice()` that returns true if the device supports touch events.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function isTouchDevice() {
  // Your code here
}`,
    solution: `function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}`,
    testCases: [
      { input: 'Touch-enabled device', expectedOutput: 'true', isHidden: false, description: 'Mobile or tablet' },
      { input: 'Desktop without touch', expectedOutput: 'false', isHidden: false, description: 'Traditional desktop' }
    ],
    hints: [
      'Check for "ontouchstart" in window object',
      'Check navigator.maxTouchPoints property',
      'Also check navigator.msMaxTouchPoints for IE compatibility'
    ]
  },

  // 13. Accessible Label Validator
  {
    id: 'cs305-t5-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Validate Form Label Association',
    description: 'Write a function `hasValidLabel(inputElement)` that checks if a form input has a properly associated label (either wrapped or using for/id).',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function hasValidLabel(inputElement) {
  // Your code here
}`,
    solution: `function hasValidLabel(inputElement) {
  // Check if input is wrapped in a label
  if (inputElement.closest('label')) {
    return true;
  }

  // Check if input has an id and a label with matching for attribute
  const inputId = inputElement.id;
  if (inputId) {
    const label = document.querySelector(\`label[for="\${inputId}"]\`);
    if (label) {
      return true;
    }
  }

  // Check for aria-label or aria-labelledby
  if (inputElement.hasAttribute('aria-label') ||
      inputElement.hasAttribute('aria-labelledby')) {
    return true;
  }

  return false;
}`,
    testCases: [
      { input: '<input id="name"> with <label for="name">', expectedOutput: 'true', isHidden: false, description: 'Label with for attribute' },
      { input: '<label><input></label>', expectedOutput: 'true', isHidden: false, description: 'Wrapped input' },
      { input: '<input>', expectedOutput: 'false', isHidden: false, description: 'No label' }
    ],
    hints: [
      'Check if input is inside a label element using closest()',
      'Check if input has an ID and there\'s a label with matching for attribute',
      'Also check for ARIA attributes like aria-label',
      'Return true if any method is found'
    ]
  },

  // 14. Responsive Container Query Simulator
  {
    id: 'cs305-t5-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Simulate Container Queries',
    description: 'Create a function `applyContainerClass(element, breakpoints)` that adds CSS classes based on element width (simulating container queries). Breakpoints: {small: 300, medium: 600, large: 900}.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function applyContainerClass(element, breakpoints) {
  // Your code here
}`,
    solution: `function applyContainerClass(element, breakpoints) {
  const width = element.offsetWidth;

  // Remove existing container classes
  element.classList.remove('container-small', 'container-medium', 'container-large');

  if (width >= breakpoints.large) {
    element.classList.add('container-large');
  } else if (width >= breakpoints.medium) {
    element.classList.add('container-medium');
  } else if (width >= breakpoints.small) {
    element.classList.add('container-small');
  }

  return element.className;
}`,
    testCases: [
      { input: 'element with width 400px, {small: 300, medium: 600, large: 900}', expectedOutput: '"container-small"', isHidden: false, description: 'Small container' },
      { input: 'element with width 700px, {small: 300, medium: 600, large: 900}', expectedOutput: '"container-medium"', isHidden: false, description: 'Medium container' }
    ],
    hints: [
      'Get element width using offsetWidth property',
      'Remove any existing container classes first',
      'Compare width against breakpoints from largest to smallest',
      'Add the appropriate class based on width'
    ]
  },

  // 15. Reduced Motion Detector
  {
    id: 'cs305-t5-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Check Reduced Motion Preference',
    description: 'Write a function `prefersReducedMotion()` that returns true if the user has enabled reduced motion in their OS settings.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function prefersReducedMotion() {
  // Your code here
}`,
    solution: `function prefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}`,
    testCases: [
      { input: 'User has reduced motion enabled', expectedOutput: 'true', isHidden: false, description: 'Accessibility preference set' },
      { input: 'User has no preference', expectedOutput: 'false', isHidden: false, description: 'Default settings' }
    ],
    hints: [
      'Use window.matchMedia() with the prefers-reduced-motion media feature',
      'Check the matches property of the MediaQueryList object',
      'The query string should be "(prefers-reduced-motion: reduce)"'
    ]
  },

  // 16. Responsive Typography Scale Generator
  {
    id: 'cs305-t5-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-5',
    title: 'Generate Type Scale',
    description: 'Create a function `generateTypeScale(baseSize, ratio, levels)` that generates a responsive typography scale. Return an array of font sizes calculated using the given ratio (e.g., 1.25 for major third).',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function generateTypeScale(baseSize, ratio, levels) {
  // Your code here
}`,
    solution: `function generateTypeScale(baseSize, ratio, levels) {
  const scale = [];
  for (let i = 0; i < levels; i++) {
    const size = baseSize * Math.pow(ratio, i);
    scale.push(Math.round(size * 100) / 100); // Round to 2 decimals
  }
  return scale;
}`,
    testCases: [
      { input: '16, 1.25, 5', expectedOutput: '[16, 20, 25, 31.25, 39.06]', isHidden: false, description: 'Major third scale with 5 levels' },
      { input: '14, 1.5, 3', expectedOutput: '[14, 21, 31.5]', isHidden: false, description: 'Perfect fifth scale with 3 levels' }
    ],
    hints: [
      'Use Math.pow() to calculate each level: baseSize * ratio^level',
      'Create a loop for the number of levels',
      'Round the results to 2 decimal places for cleaner values',
      'Return an array of calculated sizes'
    ]
  }
];
