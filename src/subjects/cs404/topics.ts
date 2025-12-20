/**
 * CS404 Topics
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
    title: 'Project Planning',
    quizIds: ['cs404-quiz-1-1', 'cs404-quiz-1-2', 'cs404-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-1-${i + 1}`),
  },
  {
    number: 2,
    title: 'Architecture & Design',
    quizIds: ['cs404-quiz-2-1', 'cs404-quiz-2-2', 'cs404-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-2-${i + 1}`),
  },
  {
    number: 3,
    title: 'Implementation Phase 1',
    quizIds: ['cs404-quiz-3-1', 'cs404-quiz-3-2', 'cs404-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-3-${i + 1}`),
  },
  {
    number: 4,
    title: 'Implementation Phase 2',
    quizIds: ['cs404-quiz-4-1', 'cs404-quiz-4-2', 'cs404-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-4-${i + 1}`),
  },
  {
    number: 5,
    title: 'Testing & QA',
    quizIds: ['cs404-quiz-5-1', 'cs404-quiz-5-2', 'cs404-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-5-${i + 1}`),
  },
  {
    number: 6,
    title: 'Deployment & Operations',
    quizIds: ['cs404-quiz-6-1', 'cs404-quiz-6-2', 'cs404-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-6-${i + 1}`),
  },
  {
    number: 7,
    title: 'Documentation & Delivery',
    quizIds: ['cs404-quiz-7-1', 'cs404-quiz-7-2', 'cs404-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-ex-7-${i + 1}`),
  },
];

export const cs404Topics: Topic[] = buildTopicsFromGlob('cs404', content, topicConfigs);