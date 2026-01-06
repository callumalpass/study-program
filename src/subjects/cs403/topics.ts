/**
 * CS403 Topics
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
    title: 'NP-Completeness Review',
    quizIds: ['cs403-quiz-1-1', 'cs403-quiz-1-2', 'cs403-quiz-1-3'],
  },
  {
    number: 2,
    title: 'Approximation Algorithms',
    quizIds: ['cs403-quiz-2-1', 'cs403-quiz-2-2', 'cs403-quiz-2-3'],
  },
  {
    number: 3,
    title: 'Randomized Algorithms',
    quizIds: ['cs403-quiz-3-1', 'cs403-quiz-3-2', 'cs403-quiz-3-3'],
  },
  {
    number: 4,
    title: 'Online Algorithms',
    quizIds: ['cs403-quiz-4-1', 'cs403-quiz-4-2', 'cs403-quiz-4-3'],
  },
  {
    number: 5,
    title: 'Advanced Dynamic Programming',
    quizIds: ['cs403-quiz-5-1', 'cs403-quiz-5-2', 'cs403-quiz-5-3'],
  },
  {
    number: 6,
    title: 'Network Flow Algorithms',
    quizIds: ['cs403-quiz-6-1', 'cs403-quiz-6-2', 'cs403-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Computational Geometry',
    quizIds: ['cs403-quiz-7-1', 'cs403-quiz-7-2', 'cs403-quiz-7-3'],
  },
];

export const cs403Topics: Topic[] = buildTopicsFromGlob('cs403', content, topicConfigs);
