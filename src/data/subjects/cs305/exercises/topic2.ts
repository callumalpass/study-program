import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs305-t2-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Basic CSS Selector',
    difficulty: 1,
    description: 'Create a function that generates a CSS rule to set the color of all paragraphs to blue.',
    starterCode: `// Generate CSS rule for paragraph color
function createParagraphStyle() {
  // Your code here
}`,
    solution: `function createParagraphStyle() {
  return \`p {
  color: blue;
}\`;
}`,
    testCases: [
      { input: '', expectedOutput: 'p {', isHidden: false, description: 'Should target p elements' },
      { input: '', expectedOutput: 'color: blue;', isHidden: false, description: 'Should set color to blue' }
    ],
    hints: [
      'Use the element selector "p" to target paragraphs',
      'The color property sets text color',
      'CSS syntax: selector { property: value; }'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Class and ID Selectors',
    difficulty: 1,
    description: 'Create CSS rules using class selector (.classname) and ID selector (#idname).',
    starterCode: `// Generate CSS rules for class and ID
function createClassAndIdStyles(className, idName) {
  // Your code here
}`,
    solution: `function createClassAndIdStyles(className, idName) {
  return \`.\${className} {
  background-color: yellow;
}

#\${idName} {
  font-weight: bold;
}\`;
}`,
    testCases: [
      { input: 'createClassAndIdStyles("highlight", "header")', expectedOutput: '.highlight {', isHidden: false, description: 'Should use class selector with dot' },
      { input: 'createClassAndIdStyles("highlight", "header")', expectedOutput: '#header {', isHidden: false, description: 'Should use ID selector with hash' }
    ],
    hints: [
      'Class selectors start with a dot (.)',
      'ID selectors start with a hash (#)',
      'Classes can be used multiple times, IDs should be unique'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Box Model Properties',
    difficulty: 1,
    description: 'Create a CSS rule that sets margin, padding, border, width and height for a div.',
    starterCode: `// Create box model CSS
function createBoxModel(width, height, margin, padding, borderWidth) {
  // Your code here
}`,
    solution: `function createBoxModel(width, height, margin, padding, borderWidth) {
  return \`div {
  width: \${width}px;
  height: \${height}px;
  margin: \${margin}px;
  padding: \${padding}px;
  border: \${borderWidth}px solid black;
}\`;
}`,
    testCases: [
      { input: 'createBoxModel(200, 100, 10, 20, 2)', expectedOutput: 'width: 200px;', isHidden: false, description: 'Should set width' },
      { input: 'createBoxModel(200, 100, 10, 20, 2)', expectedOutput: 'padding: 20px;', isHidden: false, description: 'Should set padding' },
      { input: 'createBoxModel(200, 100, 10, 20, 2)', expectedOutput: 'border: 2px solid black;', isHidden: false, description: 'Should set border' }
    ],
    hints: [
      'The box model consists of: content, padding, border, margin',
      'All measurements need "px" units',
      'Border shorthand: width style color'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Text Styling Properties',
    difficulty: 1,
    description: 'Create CSS rules for text properties including font-family, font-size, text-align, and line-height.',
    starterCode: `// Create text styling CSS
function createTextStyles(fontFamily, fontSize, textAlign, lineHeight) {
  // Your code here
}`,
    solution: `function createTextStyles(fontFamily, fontSize, textAlign, lineHeight) {
  return \`body {
  font-family: \${fontFamily};
  font-size: \${fontSize}px;
  text-align: \${textAlign};
  line-height: \${lineHeight};
}\`;
}`,
    testCases: [
      { input: 'createTextStyles("Arial, sans-serif", 16, "center", 1.5)', expectedOutput: 'font-family: Arial, sans-serif;', isHidden: false, description: 'Should set font-family' },
      { input: 'createTextStyles("Arial, sans-serif", 16, "center", 1.5)', expectedOutput: 'line-height: 1.5;', isHidden: false, description: 'Should set line-height' }
    ],
    hints: [
      'font-family can have fallback fonts separated by commas',
      'font-size needs units (px)',
      'line-height is typically unitless (relative to font-size)'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Pseudo-class Selectors',
    difficulty: 2,
    description: 'Create CSS rules using pseudo-class selectors for hover, focus, and nth-child.',
    starterCode: `// Create pseudo-class CSS rules
function createPseudoClassStyles() {
  // Your code here
}`,
    solution: `function createPseudoClassStyles() {
  return \`a:hover {
  color: red;
  text-decoration: underline;
}

input:focus {
  outline: 2px solid blue;
  background-color: lightyellow;
}

li:nth-child(odd) {
  background-color: #f0f0f0;
}\`;
}`,
    testCases: [
      { input: '', expectedOutput: ':hover', isHidden: false, description: 'Should include hover pseudo-class' },
      { input: '', expectedOutput: ':focus', isHidden: false, description: 'Should include focus pseudo-class' },
      { input: '', expectedOutput: ':nth-child(odd)', isHidden: false, description: 'Should include nth-child pseudo-class' }
    ],
    hints: [
      'Pseudo-classes start with a colon (:)',
      ':hover applies when mouse is over element',
      ':nth-child(odd) selects every odd child element'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Flexbox Container',
    difficulty: 2,
    description: 'Create a flexbox container with justify-content, align-items, and flex-direction properties.',
    starterCode: `// Create flexbox container CSS
function createFlexContainer(direction, justify, align) {
  // Your code here
}`,
    solution: `function createFlexContainer(direction, justify, align) {
  return \`.container {
  display: flex;
  flex-direction: \${direction};
  justify-content: \${justify};
  align-items: \${align};
}\`;
}`,
    testCases: [
      { input: 'createFlexContainer("row", "space-between", "center")', expectedOutput: 'display: flex;', isHidden: false, description: 'Should set display to flex' },
      { input: 'createFlexContainer("row", "space-between", "center")', expectedOutput: 'justify-content: space-between;', isHidden: false, description: 'Should set justify-content' },
      { input: 'createFlexContainer("column", "flex-start", "stretch")', expectedOutput: 'flex-direction: column;', isHidden: false, description: 'Should set flex-direction' }
    ],
    hints: [
      'display: flex enables flexbox layout',
      'justify-content aligns items along main axis',
      'align-items aligns items along cross axis'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Flexbox Items',
    difficulty: 2,
    description: 'Create CSS rules for flex items including flex-grow, flex-shrink, and flex-basis.',
    starterCode: `// Create flex item CSS
function createFlexItem(grow, shrink, basis) {
  // Your code here
}`,
    solution: `function createFlexItem(grow, shrink, basis) {
  return \`.flex-item {
  flex-grow: \${grow};
  flex-shrink: \${shrink};
  flex-basis: \${basis};
}\`;
}`,
    testCases: [
      { input: 'createFlexItem(1, 0, "200px")', expectedOutput: 'flex-grow: 1;', isHidden: false, description: 'Should set flex-grow' },
      { input: 'createFlexItem(1, 0, "200px")', expectedOutput: 'flex-basis: 200px;', isHidden: false, description: 'Should set flex-basis' }
    ],
    hints: [
      'flex-grow determines how much item grows',
      'flex-shrink determines how much item shrinks',
      'flex-basis sets initial size before space distribution'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'CSS Grid Container',
    difficulty: 2,
    description: 'Create a CSS Grid container with grid-template-columns, grid-template-rows, and gap.',
    starterCode: `// Create grid container CSS
function createGridContainer(columns, rows, gap) {
  // Your code here
}`,
    solution: `function createGridContainer(columns, rows, gap) {
  return \`.grid-container {
  display: grid;
  grid-template-columns: \${columns};
  grid-template-rows: \${rows};
  gap: \${gap};
}\`;
}`,
    testCases: [
      { input: 'createGridContainer("repeat(3, 1fr)", "auto", "20px")', expectedOutput: 'display: grid;', isHidden: false, description: 'Should set display to grid' },
      { input: 'createGridContainer("repeat(3, 1fr)", "auto", "20px")', expectedOutput: 'grid-template-columns: repeat(3, 1fr);', isHidden: false, description: 'Should set grid columns' },
      { input: 'createGridContainer("1fr 2fr", "100px 200px", "10px")', expectedOutput: 'gap: 10px;', isHidden: false, description: 'Should set gap' }
    ],
    hints: [
      'display: grid enables grid layout',
      'repeat() function creates repeating track patterns',
      'fr unit represents a fraction of available space'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Grid Item Placement',
    difficulty: 3,
    description: 'Create CSS rules for placing grid items using grid-column and grid-row properties.',
    starterCode: `// Create grid item placement CSS
function createGridItemPlacement(colStart, colEnd, rowStart, rowEnd) {
  // Your code here
}`,
    solution: `function createGridItemPlacement(colStart, colEnd, rowStart, rowEnd) {
  return \`.grid-item {
  grid-column: \${colStart} / \${colEnd};
  grid-row: \${rowStart} / \${rowEnd};
}\`;
}`,
    testCases: [
      { input: 'createGridItemPlacement(1, 3, 1, 2)', expectedOutput: 'grid-column: 1 / 3;', isHidden: false, description: 'Should set grid-column span' },
      { input: 'createGridItemPlacement(2, 4, 1, 3)', expectedOutput: 'grid-row: 1 / 3;', isHidden: false, description: 'Should set grid-row span' }
    ],
    hints: [
      'grid-column: start / end defines column span',
      'grid-row: start / end defines row span',
      'Grid lines start at 1, not 0'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Responsive Grid Layout',
    difficulty: 3,
    description: 'Create a responsive grid that uses auto-fit and minmax for automatic column sizing.',
    starterCode: `// Create responsive grid CSS
function createResponsiveGrid(minWidth, gap) {
  // Your code here
}`,
    solution: `function createResponsiveGrid(minWidth, gap) {
  return \`.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(\${minWidth}px, 1fr));
  gap: \${gap}px;
}\`;
}`,
    testCases: [
      { input: 'createResponsiveGrid(250, 20)', expectedOutput: 'repeat(auto-fit, minmax(250px, 1fr))', isHidden: false, description: 'Should use auto-fit and minmax' },
      { input: 'createResponsiveGrid(300, 15)', expectedOutput: 'minmax(300px, 1fr)', isHidden: false, description: 'Should set minimum width' }
    ],
    hints: [
      'auto-fit automatically creates columns that fit',
      'minmax(min, max) sets minimum and maximum column sizes',
      'Columns will automatically wrap to new rows'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Position Properties',
    difficulty: 3,
    description: 'Create CSS rules demonstrating different position values: static, relative, absolute, fixed, and sticky.',
    starterCode: `// Create positioning CSS
function createPositionStyles(type, top, left) {
  // Your code here
}`,
    solution: `function createPositionStyles(type, top, left) {
  let css = \`.positioned {
  position: \${type};\`;

  if (type !== 'static') {
    css += \`
  top: \${top}px;
  left: \${left}px;\`;
  }

  css += \`
}\`;

  return css;
}`,
    testCases: [
      { input: 'createPositionStyles("relative", 10, 20)', expectedOutput: 'position: relative;', isHidden: false, description: 'Should set position' },
      { input: 'createPositionStyles("absolute", 0, 0)', expectedOutput: 'top: 0px;', isHidden: false, description: 'Should set top property' },
      { input: 'createPositionStyles("fixed", 50, 50)', expectedOutput: 'left: 50px;', isHidden: false, description: 'Should set left property' }
    ],
    hints: [
      'static is the default position value',
      'relative positions relative to normal position',
      'absolute positions relative to nearest positioned ancestor',
      'fixed positions relative to viewport'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'CSS Specificity Challenge',
    difficulty: 3,
    description: 'Create CSS rules with different specificity levels to demonstrate the cascade.',
    starterCode: `// Create CSS with different specificity levels
function createSpecificityDemo() {
  // Your code here
}`,
    solution: `function createSpecificityDemo() {
  return \`/* Lowest specificity */
p {
  color: black;
}

/* Higher specificity */
.text {
  color: blue;
}

/* Even higher specificity */
#unique {
  color: green;
}

/* Highest specificity */
p.text#unique {
  color: red;
}\`;
}`,
    testCases: [
      { input: '', expectedOutput: 'p {', isHidden: false, description: 'Should include element selector' },
      { input: '', expectedOutput: '.text {', isHidden: false, description: 'Should include class selector' },
      { input: '', expectedOutput: '#unique {', isHidden: false, description: 'Should include ID selector' },
      { input: '', expectedOutput: 'p.text#unique {', isHidden: false, description: 'Should include combined selector' }
    ],
    hints: [
      'Specificity hierarchy: inline > ID > class > element',
      'More specific selectors override less specific ones',
      'Combining selectors increases specificity'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'CSS Variables (Custom Properties)',
    difficulty: 4,
    description: 'Create CSS using custom properties (CSS variables) for colors and spacing with fallback values.',
    starterCode: `// Create CSS with custom properties
function createCSSVariables(primaryColor, secondaryColor, spacing) {
  // Your code here
}`,
    solution: `function createCSSVariables(primaryColor, secondaryColor, spacing) {
  return \`:root {
  --primary-color: \${primaryColor};
  --secondary-color: \${secondaryColor};
  --spacing-unit: \${spacing}px;
}

.card {
  background-color: var(--primary-color, #ffffff);
  color: var(--secondary-color, #000000);
  padding: var(--spacing-unit, 16px);
  margin: calc(var(--spacing-unit) * 2);
}\`;
}`,
    testCases: [
      { input: 'createCSSVariables("#3498db", "#2c3e50", 8)', expectedOutput: '--primary-color: #3498db;', isHidden: false, description: 'Should define custom properties' },
      { input: 'createCSSVariables("#3498db", "#2c3e50", 8)', expectedOutput: 'var(--primary-color, #ffffff)', isHidden: false, description: 'Should use var() with fallback' },
      { input: 'createCSSVariables("#3498db", "#2c3e50", 8)', expectedOutput: 'calc(var(--spacing-unit) * 2)', isHidden: false, description: 'Should use calc() with variables' }
    ],
    hints: [
      'Define variables in :root for global scope',
      'Variable names start with --',
      'Use var(--name, fallback) to reference variables',
      'calc() can perform calculations with variables'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Advanced Flexbox Layout',
    difficulty: 4,
    description: 'Create a complex flexbox layout with nested flex containers and various flex properties.',
    starterCode: `// Create advanced flexbox layout
function createAdvancedFlexLayout() {
  // Your code here
}`,
    solution: `function createAdvancedFlexLayout() {
  return \`.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.main-content {
  flex: 1 1 auto;
  display: flex;
  gap: 20px;
}

.sidebar {
  flex: 0 0 250px;
}

.content {
  flex: 1 1 auto;
}

.footer {
  flex: 0 0 auto;
  text-align: center;
  padding: 20px;
}\`;
}`,
    testCases: [
      { input: '', expectedOutput: 'flex: 1 1 auto;', isHidden: false, description: 'Should use flex shorthand' },
      { input: '', expectedOutput: 'flex: 0 0 250px;', isHidden: false, description: 'Should create fixed-width sidebar' },
      { input: '', expectedOutput: 'min-height: 100vh;', isHidden: false, description: 'Should use viewport units' }
    ],
    hints: [
      'flex shorthand: grow shrink basis',
      'Nested flex containers are common in layouts',
      'flex: 1 makes an item grow to fill space',
      'flex: 0 0 auto prevents growing/shrinking'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Complex Grid Areas',
    difficulty: 4,
    description: 'Create a grid layout using named grid areas for a complex page structure.',
    starterCode: `// Create grid with named areas
function createGridAreas() {
  // Your code here
}`,
    solution: `function createGridAreas() {
  return \`.grid-layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  gap: 20px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }\`;
}`,
    testCases: [
      { input: '', expectedOutput: 'grid-template-areas:', isHidden: false, description: 'Should define grid template areas' },
      { input: '', expectedOutput: 'grid-area: header;', isHidden: false, description: 'Should assign grid areas to elements' },
      { input: '', expectedOutput: '"header header header"', isHidden: false, description: 'Should span header across columns' }
    ],
    hints: [
      'grid-template-areas defines named regions',
      'Each string represents a row',
      'Repeating names make elements span multiple cells',
      'Assign areas with grid-area property'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t2-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-2',
    title: 'Complete Responsive Card Component',
    difficulty: 5,
    description: 'Create a complete CSS for a responsive card component using modern CSS features including grid, flexbox, custom properties, and pseudo-elements.',
    starterCode: `// Create complete card component CSS
function createCardComponent() {
  // Your code here
}`,
    solution: `function createCardComponent() {
  return \`:root {
  --card-bg: #ffffff;
  --card-shadow: rgba(0, 0, 0, 0.1);
  --card-border-radius: 8px;
  --card-padding: 20px;
}

.card {
  background-color: var(--card-bg);
  border-radius: var(--card-border-radius);
  box-shadow: 0 4px 6px var(--card-shadow);
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px var(--card-shadow);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.card-description {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.card-footer {
  padding: var(--card-padding);
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .card-body {
    padding: calc(var(--card-padding) * 0.75);
  }
}\`;
}`,
    testCases: [
      { input: '', expectedOutput: ':root {', isHidden: false, description: 'Should define CSS variables' },
      { input: '', expectedOutput: 'display: grid;', isHidden: false, description: 'Should use grid layout' },
      { input: '', expectedOutput: 'display: flex;', isHidden: false, description: 'Should use flexbox for card body' },
      { input: '', expectedOutput: '@media (max-width: 768px)', isHidden: false, description: 'Should include media query' },
      { input: '', expectedOutput: 'transition:', isHidden: false, description: 'Should include transitions' }
    ],
    hints: [
      'Combine multiple CSS features for a complete component',
      'Use CSS variables for maintainable values',
      'Grid for overall structure, flexbox for internal layout',
      'Add hover effects and transitions for interactivity',
      'Include responsive adjustments with media queries'
    ],
    language: 'javascript'
  }
];
