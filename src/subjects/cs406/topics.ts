/**
 * CS406 Topics
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
  Array.from({ length: 16 }, (_, i) => `cs406-t${topic}-ex${String(i + 1).padStart(2, '0')}`);

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'AI Fundamentals',
    quizIds: ['cs406-quiz-1a', 'cs406-quiz-1b', 'cs406-quiz-1c'],
    exerciseIds: exerciseIds(1),
  },
  {
    number: 2,
    title: 'Search Algorithms',
    quizIds: ['cs406-quiz-2a', 'cs406-quiz-2b', 'cs406-quiz-2c'],
    exerciseIds: exerciseIds(2),
  },
  {
    number: 3,
    title: 'Adversarial Search',
    quizIds: ['cs406-quiz-3a', 'cs406-quiz-3b', 'cs406-quiz-3c'],
    exerciseIds: exerciseIds(3),
  },
  {
    number: 4,
    title: 'Constraint Satisfaction Problems',
    quizIds: ['cs406-quiz-4a', 'cs406-quiz-4b', 'cs406-quiz-4c'],
    exerciseIds: exerciseIds(4),
  },
  {
    number: 5,
    title: 'Planning',
    quizIds: ['cs406-quiz-5a', 'cs406-quiz-5b', 'cs406-quiz-5c'],
    exerciseIds: exerciseIds(5),
  },
  {
    number: 6,
    title: 'Knowledge Representation',
    quizIds: ['cs406-quiz-6a', 'cs406-quiz-6b', 'cs406-quiz-6c'],
    exerciseIds: exerciseIds(6),
  },
  {
    number: 7,
    title: 'Probabilistic Reasoning',
    quizIds: ['cs406-quiz-7a', 'cs406-quiz-7b', 'cs406-quiz-7c'],
    exerciseIds: exerciseIds(7),
  },
];

export const cs406Topics: Topic[] = buildTopicsFromGlob('cs406', content, topicConfigs);
