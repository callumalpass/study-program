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

// Helper to generate exercise IDs for a topic
const exerciseIds = (topic: number) =>
  Array.from({ length: 16 }, (_, i) => `cs403-t${topic}-ex${String(i + 1).padStart(2, '0')}`);

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'NP-Completeness Review',
    quizIds: ['cs403-quiz-1-1', 'cs403-quiz-1-2', 'cs403-quiz-1-3'],
    exerciseIds: exerciseIds(1),
  },
  {
    number: 2,
    title: 'Approximation Algorithms',
    quizIds: ['cs403-quiz-2-1', 'cs403-quiz-2-2', 'cs403-quiz-2-3'],
    exerciseIds: exerciseIds(2),
  },
  {
    number: 3,
    title: 'Randomized Algorithms',
    quizIds: ['cs403-quiz-3-1', 'cs403-quiz-3-2', 'cs403-quiz-3-3'],
    exerciseIds: exerciseIds(3),
  },
  {
    number: 4,
    title: 'Online Algorithms',
    quizIds: ['cs403-quiz-4-1', 'cs403-quiz-4-2', 'cs403-quiz-4-3'],
    exerciseIds: exerciseIds(4),
  },
  {
    number: 5,
    title: 'Advanced Dynamic Programming',
    quizIds: ['cs403-quiz-5-1', 'cs403-quiz-5-2', 'cs403-quiz-5-3'],
    exerciseIds: exerciseIds(5),
  },
  {
    number: 6,
    title: 'Network Flow Algorithms',
    quizIds: ['cs403-quiz-6-1', 'cs403-quiz-6-2', 'cs403-quiz-6-3'],
    exerciseIds: exerciseIds(6),
  },
  {
    number: 7,
    title: 'Computational Geometry',
    quizIds: ['cs403-quiz-7-1', 'cs403-quiz-7-2', 'cs403-quiz-7-3'],
    exerciseIds: exerciseIds(7),
  },
];

export const cs403Topics: Topic[] = buildTopicsFromGlob('cs403', content, topicConfigs);
