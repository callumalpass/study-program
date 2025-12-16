import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/cs305/topic-1/01-html-introduction.md?raw';
import topic1_2 from '../../../content/subjects/cs305/topic-1/02-document-structure.md?raw';
import topic1_3 from '../../../content/subjects/cs305/topic-1/03-text-elements.md?raw';
import topic1_4 from '../../../content/subjects/cs305/topic-1/04-links-images.md?raw';
import topic1_5 from '../../../content/subjects/cs305/topic-1/05-forms-inputs.md?raw';
import topic1_6 from '../../../content/subjects/cs305/topic-1/06-semantic-html.md?raw';
import topic1_7 from '../../../content/subjects/cs305/topic-1/07-html-best-practices.md?raw';

import topic2_1 from '../../../content/subjects/cs305/topic-2/01-css-introduction.md?raw';
import topic2_2 from '../../../content/subjects/cs305/topic-2/02-selectors-specificity.md?raw';
import topic2_3 from '../../../content/subjects/cs305/topic-2/03-box-model.md?raw';
import topic2_4 from '../../../content/subjects/cs305/topic-2/04-flexbox.md?raw';
import topic2_5 from '../../../content/subjects/cs305/topic-2/05-css-grid.md?raw';
import topic2_6 from '../../../content/subjects/cs305/topic-2/06-positioning.md?raw';
import topic2_7 from '../../../content/subjects/cs305/topic-2/07-css-variables.md?raw';

import topic3_1 from '../../../content/subjects/cs305/topic-3/01-javascript-basics.md?raw';
import topic3_2 from '../../../content/subjects/cs305/topic-3/02-variables-types.md?raw';
import topic3_3 from '../../../content/subjects/cs305/topic-3/03-functions.md?raw';
import topic3_4 from '../../../content/subjects/cs305/topic-3/04-objects-arrays.md?raw';
import topic3_5 from '../../../content/subjects/cs305/topic-3/05-control-flow.md?raw';
import topic3_6 from '../../../content/subjects/cs305/topic-3/06-error-handling.md?raw';
import topic3_7 from '../../../content/subjects/cs305/topic-3/07-modules.md?raw';

import topic4_1 from '../../../content/subjects/cs305/topic-4/01-dom-introduction.md?raw';
import topic4_2 from '../../../content/subjects/cs305/topic-4/02-selecting-elements.md?raw';
import topic4_3 from '../../../content/subjects/cs305/topic-4/03-modifying-dom.md?raw';
import topic4_4 from '../../../content/subjects/cs305/topic-4/04-event-handling.md?raw';
import topic4_5 from '../../../content/subjects/cs305/topic-4/05-event-delegation.md?raw';
import topic4_6 from '../../../content/subjects/cs305/topic-4/06-form-validation.md?raw';
import topic4_7 from '../../../content/subjects/cs305/topic-4/07-dom-performance.md?raw';

import topic5_1 from '../../../content/subjects/cs305/topic-5/01-responsive-principles.md?raw';
import topic5_2 from '../../../content/subjects/cs305/topic-5/02-media-queries.md?raw';
import topic5_3 from '../../../content/subjects/cs305/topic-5/03-mobile-first.md?raw';
import topic5_4 from '../../../content/subjects/cs305/topic-5/04-fluid-typography.md?raw';
import topic5_5 from '../../../content/subjects/cs305/topic-5/05-responsive-images.md?raw';
import topic5_6 from '../../../content/subjects/cs305/topic-5/06-css-frameworks.md?raw';
import topic5_7 from '../../../content/subjects/cs305/topic-5/07-accessibility.md?raw';

import topic6_1 from '../../../content/subjects/cs305/topic-6/01-async-programming.md?raw';
import topic6_2 from '../../../content/subjects/cs305/topic-6/02-promises.md?raw';
import topic6_3 from '../../../content/subjects/cs305/topic-6/03-async-await.md?raw';
import topic6_4 from '../../../content/subjects/cs305/topic-6/04-fetch-api.md?raw';
import topic6_5 from '../../../content/subjects/cs305/topic-6/05-rest-apis.md?raw';
import topic6_6 from '../../../content/subjects/cs305/topic-6/06-error-handling-async.md?raw';
import topic6_7 from '../../../content/subjects/cs305/topic-6/07-web-storage.md?raw';

import topic7_1 from '../../../content/subjects/cs305/topic-7/01-build-tools.md?raw';
import topic7_2 from '../../../content/subjects/cs305/topic-7/02-package-managers.md?raw';
import topic7_3 from '../../../content/subjects/cs305/topic-7/03-bundlers.md?raw';
import topic7_4 from '../../../content/subjects/cs305/topic-7/04-frameworks-overview.md?raw';
import topic7_5 from '../../../content/subjects/cs305/topic-7/05-component-architecture.md?raw';
import topic7_6 from '../../../content/subjects/cs305/topic-7/06-testing.md?raw';
import topic7_7 from '../../../content/subjects/cs305/topic-7/07-deployment.md?raw';

export const cs305Topics: Topic[] = [
  {
    id: 'cs305-topic-1',
    title: 'HTML Fundamentals',
    content: 'Master the foundation of web development with HTML, learning document structure, semantic elements, forms, and best practices for creating accessible, well-structured web pages.',
    subtopics: [
      { id: 'cs305-topic-1-1', slug: 'html-introduction', order: 1, title: 'Introduction to HTML', content: topic1_1 },
      { id: 'cs305-topic-1-2', slug: 'document-structure', order: 2, title: 'Document Structure', content: topic1_2 },
      { id: 'cs305-topic-1-3', slug: 'text-elements', order: 3, title: 'Text Elements', content: topic1_3 },
      { id: 'cs305-topic-1-4', slug: 'links-images', order: 4, title: 'Links and Images', content: topic1_4 },
      { id: 'cs305-topic-1-5', slug: 'forms-inputs', order: 5, title: 'Forms and Inputs', content: topic1_5 },
      { id: 'cs305-topic-1-6', slug: 'semantic-html', order: 6, title: 'Semantic HTML', content: topic1_6 },
      { id: 'cs305-topic-1-7', slug: 'html-best-practices', order: 7, title: 'HTML Best Practices', content: topic1_7 }
    ],
    quizIds: ['cs305-quiz-1-1', 'cs305-quiz-1-2', 'cs305-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs305-topic-2',
    title: 'CSS Styling',
    content: 'Learn to style web pages with CSS, from basic selectors and the box model to modern layout techniques like Flexbox and Grid, creating beautiful and maintainable stylesheets.',
    subtopics: [
      { id: 'cs305-topic-2-1', slug: 'css-introduction', order: 1, title: 'Introduction to CSS', content: topic2_1 },
      { id: 'cs305-topic-2-2', slug: 'selectors-specificity', order: 2, title: 'Selectors and Specificity', content: topic2_2 },
      { id: 'cs305-topic-2-3', slug: 'box-model', order: 3, title: 'The Box Model', content: topic2_3 },
      { id: 'cs305-topic-2-4', slug: 'flexbox', order: 4, title: 'Flexbox Layout', content: topic2_4 },
      { id: 'cs305-topic-2-5', slug: 'css-grid', order: 5, title: 'CSS Grid Layout', content: topic2_5 },
      { id: 'cs305-topic-2-6', slug: 'positioning', order: 6, title: 'Positioning', content: topic2_6 },
      { id: 'cs305-topic-2-7', slug: 'css-variables', order: 7, title: 'CSS Variables', content: topic2_7 }
    ],
    quizIds: ['cs305-quiz-2-1', 'cs305-quiz-2-2', 'cs305-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs305-topic-3',
    title: 'JavaScript Fundamentals',
    content: 'Master the programming language of the web. Learn JavaScript syntax, data types, functions, objects, and modern ES6+ features for building interactive web applications.',
    subtopics: [
      { id: 'cs305-topic-3-1', slug: 'javascript-basics', order: 1, title: 'JavaScript Basics', content: topic3_1 },
      { id: 'cs305-topic-3-2', slug: 'variables-types', order: 2, title: 'Variables and Types', content: topic3_2 },
      { id: 'cs305-topic-3-3', slug: 'functions', order: 3, title: 'Functions', content: topic3_3 },
      { id: 'cs305-topic-3-4', slug: 'objects-arrays', order: 4, title: 'Objects and Arrays', content: topic3_4 },
      { id: 'cs305-topic-3-5', slug: 'control-flow', order: 5, title: 'Control Flow', content: topic3_5 },
      { id: 'cs305-topic-3-6', slug: 'error-handling', order: 6, title: 'Error Handling', content: topic3_6 },
      { id: 'cs305-topic-3-7', slug: 'modules', order: 7, title: 'Modules', content: topic3_7 }
    ],
    quizIds: ['cs305-quiz-3-1', 'cs305-quiz-3-2', 'cs305-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs305-topic-4',
    title: 'DOM Manipulation',
    content: 'Learn to interact with web pages using the Document Object Model. Select elements, handle events, modify content dynamically, and create responsive user interfaces.',
    subtopics: [
      { id: 'cs305-topic-4-1', slug: 'dom-introduction', order: 1, title: 'Introduction to the DOM', content: topic4_1 },
      { id: 'cs305-topic-4-2', slug: 'selecting-elements', order: 2, title: 'Selecting Elements', content: topic4_2 },
      { id: 'cs305-topic-4-3', slug: 'modifying-dom', order: 3, title: 'Modifying the DOM', content: topic4_3 },
      { id: 'cs305-topic-4-4', slug: 'event-handling', order: 4, title: 'Event Handling', content: topic4_4 },
      { id: 'cs305-topic-4-5', slug: 'event-delegation', order: 5, title: 'Event Delegation', content: topic4_5 },
      { id: 'cs305-topic-4-6', slug: 'form-validation', order: 6, title: 'Form Validation', content: topic4_6 },
      { id: 'cs305-topic-4-7', slug: 'dom-performance', order: 7, title: 'DOM Performance', content: topic4_7 }
    ],
    quizIds: ['cs305-quiz-4-1', 'cs305-quiz-4-2', 'cs305-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs305-topic-5',
    title: 'Responsive Design',
    content: 'Create websites that work beautifully on any device. Learn responsive design principles, media queries, mobile-first development, and accessibility best practices.',
    subtopics: [
      { id: 'cs305-topic-5-1', slug: 'responsive-principles', order: 1, title: 'Responsive Principles', content: topic5_1 },
      { id: 'cs305-topic-5-2', slug: 'media-queries', order: 2, title: 'Media Queries', content: topic5_2 },
      { id: 'cs305-topic-5-3', slug: 'mobile-first', order: 3, title: 'Mobile-First Design', content: topic5_3 },
      { id: 'cs305-topic-5-4', slug: 'fluid-typography', order: 4, title: 'Fluid Typography', content: topic5_4 },
      { id: 'cs305-topic-5-5', slug: 'responsive-images', order: 5, title: 'Responsive Images', content: topic5_5 },
      { id: 'cs305-topic-5-6', slug: 'css-frameworks', order: 6, title: 'CSS Frameworks', content: topic5_6 },
      { id: 'cs305-topic-5-7', slug: 'accessibility', order: 7, title: 'Web Accessibility', content: topic5_7 }
    ],
    quizIds: ['cs305-quiz-5-1', 'cs305-quiz-5-2', 'cs305-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs305-topic-6',
    title: 'Asynchronous JavaScript',
    content: 'Master asynchronous programming patterns for web applications. Learn promises, async/await, the Fetch API, and how to work with REST APIs and handle data.',
    subtopics: [
      { id: 'cs305-topic-6-1', slug: 'async-programming', order: 1, title: 'Asynchronous Programming', content: topic6_1 },
      { id: 'cs305-topic-6-2', slug: 'promises', order: 2, title: 'Promises', content: topic6_2 },
      { id: 'cs305-topic-6-3', slug: 'async-await', order: 3, title: 'Async/Await', content: topic6_3 },
      { id: 'cs305-topic-6-4', slug: 'fetch-api', order: 4, title: 'Fetch API', content: topic6_4 },
      { id: 'cs305-topic-6-5', slug: 'rest-apis', order: 5, title: 'Working with REST APIs', content: topic6_5 },
      { id: 'cs305-topic-6-6', slug: 'error-handling-async', order: 6, title: 'Error Handling in Async Code', content: topic6_6 },
      { id: 'cs305-topic-6-7', slug: 'web-storage', order: 7, title: 'Web Storage', content: topic6_7 }
    ],
    quizIds: ['cs305-quiz-6-1', 'cs305-quiz-6-2', 'cs305-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs305-topic-7',
    title: 'Modern Web Development',
    content: 'Explore the modern web development ecosystem. Learn about build tools, package managers, frameworks, component-based architecture, testing, and deployment strategies.',
    subtopics: [
      { id: 'cs305-topic-7-1', slug: 'build-tools', order: 1, title: 'Build Tools Overview', content: topic7_1 },
      { id: 'cs305-topic-7-2', slug: 'package-managers', order: 2, title: 'Package Managers', content: topic7_2 },
      { id: 'cs305-topic-7-3', slug: 'bundlers', order: 3, title: 'Module Bundlers', content: topic7_3 },
      { id: 'cs305-topic-7-4', slug: 'frameworks-overview', order: 4, title: 'Frameworks Overview', content: topic7_4 },
      { id: 'cs305-topic-7-5', slug: 'component-architecture', order: 5, title: 'Component Architecture', content: topic7_5 },
      { id: 'cs305-topic-7-6', slug: 'testing', order: 6, title: 'Testing Web Applications', content: topic7_6 },
      { id: 'cs305-topic-7-7', slug: 'deployment', order: 7, title: 'Deployment', content: topic7_7 }
    ],
    quizIds: ['cs305-quiz-7-1', 'cs305-quiz-7-2', 'cs305-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs305-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
