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

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'AI Fundamentals',
    quizIds: ['cs406-quiz-1-1', 'cs406-quiz-1-2', 'cs406-quiz-1-3'],
  },
  {
    number: 2,
    title: 'Search Algorithms',
    quizIds: ['cs406-quiz-2-1', 'cs406-quiz-2-2', 'cs406-quiz-2-3'],
  },
  {
    number: 3,
    title: 'Adversarial Search',
    quizIds: ['cs406-quiz-3-1', 'cs406-quiz-3-2', 'cs406-quiz-3-3'],
  },
  {
    number: 4,
    title: 'Constraint Satisfaction Problems',
    quizIds: ['cs406-quiz-4-1', 'cs406-quiz-4-2', 'cs406-quiz-4-3'],
  },
  {
    number: 5,
    title: 'Planning',
    quizIds: ['cs406-quiz-5-1', 'cs406-quiz-5-2', 'cs406-quiz-5-3'],
  },
  {
    number: 6,
    title: 'Knowledge Representation',
    quizIds: ['cs406-quiz-6-1', 'cs406-quiz-6-2', 'cs406-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Probabilistic Reasoning',
    quizIds: ['cs406-quiz-7-1', 'cs406-quiz-7-2', 'cs406-quiz-7-3'],
  },
];

export const cs406Topics: Topic[] = buildTopicsFromGlob('cs406', content, topicConfigs);
