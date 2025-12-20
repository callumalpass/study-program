/**
 * CS305 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'HTML Fundamentals',
  },
  {
    number: 1,
    title: 'Introduction to HTML',
  },
  {
    number: 1,
    title: 'Introduction to CSS',
  },
  {
    number: 1,
    title: 'JavaScript Basics',
  },
  {
    number: 1,
    title: 'Introduction to the DOM',
  },
  {
    number: 1,
    title: 'Responsive Principles',
  },
  {
    number: 1,
    title: 'Asynchronous Programming',
  },
  {
    number: 1,
    title: 'Build Tools Overview',
  },
  {
    number: 2,
    title: 'Document Structure',
  },
  {
    number: 2,
    title: 'CSS Styling',
  },
  {
    number: 2,
    title: 'Selectors and Specificity',
  },
  {
    number: 2,
    title: 'Variables and Types',
  },
  {
    number: 2,
    title: 'Selecting Elements',
  },
  {
    number: 2,
    title: 'Media Queries',
  },
  {
    number: 2,
    title: 'Promises',
  },
  {
    number: 2,
    title: 'Package Managers',
  },
  {
    number: 3,
    title: 'Text Elements',
  },
  {
    number: 3,
    title: 'The Box Model',
  },
  {
    number: 3,
    title: 'JavaScript Fundamentals',
  },
  {
    number: 3,
    title: 'Functions',
  },
  {
    number: 3,
    title: 'Modifying the DOM',
  },
  {
    number: 3,
    title: 'Mobile-First Design',
  },
  {
    number: 3,
    title: 'Async/Await',
  },
  {
    number: 3,
    title: 'Module Bundlers',
  },
  {
    number: 4,
    title: 'Links and Images',
  },
  {
    number: 4,
    title: 'Flexbox Layout',
  },
  {
    number: 4,
    title: 'Objects and Arrays',
  },
  {
    number: 4,
    title: 'DOM Manipulation',
  },
  {
    number: 4,
    title: 'Event Handling',
  },
  {
    number: 4,
    title: 'Fluid Typography',
  },
  {
    number: 4,
    title: 'Fetch API',
  },
  {
    number: 4,
    title: 'Frameworks Overview',
  },
  {
    number: 5,
    title: 'Forms and Inputs',
  },
  {
    number: 5,
    title: 'CSS Grid Layout',
  },
  {
    number: 5,
    title: 'Control Flow',
  },
  {
    number: 5,
    title: 'Event Delegation',
  },
  {
    number: 5,
    title: 'Responsive Design',
  },
  {
    number: 5,
    title: 'Responsive Images',
  },
  {
    number: 5,
    title: 'Working with REST APIs',
  },
  {
    number: 5,
    title: 'Component Architecture',
  },
  {
    number: 6,
    title: 'Semantic HTML',
  },
  {
    number: 6,
    title: 'Positioning',
  },
  {
    number: 6,
    title: 'Error Handling',
  },
  {
    number: 6,
    title: 'Form Validation',
  },
  {
    number: 6,
    title: 'CSS Frameworks',
  },
  {
    number: 6,
    title: 'Asynchronous JavaScript',
  },
  {
    number: 6,
    title: 'Error Handling in Async Code',
  },
  {
    number: 6,
    title: 'Testing Web Applications',
  },
  {
    number: 7,
    title: 'HTML Best Practices',
    quizIds: ['cs305-quiz-1-1', 'cs305-quiz-1-2', 'cs305-quiz-1-3'],
  },
  {
    number: 7,
    title: 'CSS Variables',
    quizIds: ['cs305-quiz-2-1', 'cs305-quiz-2-2', 'cs305-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Modules',
    quizIds: ['cs305-quiz-3-1', 'cs305-quiz-3-2', 'cs305-quiz-3-3'],
  },
  {
    number: 7,
    title: 'DOM Performance',
    quizIds: ['cs305-quiz-4-1', 'cs305-quiz-4-2', 'cs305-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Web Accessibility',
    quizIds: ['cs305-quiz-5-1', 'cs305-quiz-5-2', 'cs305-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Web Storage',
    quizIds: ['cs305-quiz-6-1', 'cs305-quiz-6-2', 'cs305-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Modern Web Development',
  },
  {
    number: 7,
    title: 'Deployment',
    quizIds: ['cs305-quiz-7-1', 'cs305-quiz-7-2', 'cs305-quiz-7-3'],
  },
];

export const cs305Topics: Topic[] = buildTopicsFromGlob('cs305', content, topicConfigs);
