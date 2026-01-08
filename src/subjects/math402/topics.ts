/**
 * MATH402 Topics
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

// Helper to generate exercise IDs - two formats exist in JSON files:
// Format A (topics 1,2,4,5): math402-ex-N-M (e.g., math402-ex-1-1)
// Format B (topics 3,6,7): math402-tN-exMM (e.g., math402-t3-ex01)
const exerciseIdsFormatA = (topic: number) =>
  Array.from({ length: 16 }, (_, i) => `math402-ex-${topic}-${i + 1}`);
const exerciseIdsFormatB = (topic: number) =>
  Array.from({ length: 16 }, (_, i) => `math402-t${topic}-ex${String(i + 1).padStart(2, '0')}`);

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: "Error Analysis",
    quizIds: ['math402-quiz-1a', 'math402-quiz-1b', 'math402-quiz-1c'],
    exerciseIds: exerciseIdsFormatA(1),
  },
  {
    number: 2,
    title: "Root-Finding Methods",
    quizIds: ['math402-quiz-2a', 'math402-quiz-2b', 'math402-quiz-2c'],
    exerciseIds: exerciseIdsFormatA(2),
  },
  {
    number: 3,
    title: "Interpolation and Approximation",
    quizIds: ['math402-quiz-3a', 'math402-quiz-3b', 'math402-quiz-3c'],
    exerciseIds: exerciseIdsFormatB(3),
  },
  {
    number: 4,
    title: "Numerical Differentiation and Integration",
    quizIds: ['math402-quiz-4a', 'math402-quiz-4b', 'math402-quiz-4c'],
    exerciseIds: exerciseIdsFormatA(4),
  },
  {
    number: 5,
    title: "Direct Methods for Linear Systems",
    quizIds: ['math402-quiz-5a', 'math402-quiz-5b', 'math402-quiz-5c'],
    exerciseIds: exerciseIdsFormatA(5),
  },
  {
    number: 6,
    title: "Iterative Methods for Linear Systems",
    quizIds: ['math402-quiz-6a', 'math402-quiz-6b', 'math402-quiz-6c'],
    exerciseIds: exerciseIdsFormatB(6),
  },
  {
    number: 7,
    title: "Numerical Solutions of ODEs",
    quizIds: ['math402-quiz-7a', 'math402-quiz-7b', 'math402-quiz-7c'],
    exerciseIds: exerciseIdsFormatB(7),
  },
];

export const math402Topics: Topic[] = buildTopicsFromGlob('math402', content, topicConfigs);
