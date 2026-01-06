/**
 * CS407 Topics
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
    title: 'Data Collection and APIs',
    quizIds: ['cs407-quiz-1-1', 'cs407-quiz-1-2', 'cs407-quiz-1-3'],
  },
  {
    number: 2,
    title: 'Data Cleaning',
    quizIds: ['cs407-quiz-2-1', 'cs407-quiz-2-2', 'cs407-quiz-2-3'],
  },
  {
    number: 3,
    title: 'Exploratory Data Analysis',
    quizIds: ['cs407-quiz-3-1', 'cs407-quiz-3-2', 'cs407-quiz-3-3'],
  },
  {
    number: 4,
    title: 'Feature Engineering',
    quizIds: ['cs407-quiz-4-1', 'cs407-quiz-4-2', 'cs407-quiz-4-3'],
  },
  {
    number: 5,
    title: 'Data Visualization',
    quizIds: ['cs407-quiz-5-1', 'cs407-quiz-5-2', 'cs407-quiz-5-3'],
  },
  {
    number: 6,
    title: 'Big Data Technologies',
    quizIds: ['cs407-quiz-6-1', 'cs407-quiz-6-2', 'cs407-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Ethics in Data Science',
    quizIds: ['cs407-quiz-7-1', 'cs407-quiz-7-2', 'cs407-quiz-7-3'],
  },
];

export const cs407Topics: Topic[] = buildTopicsFromGlob('cs407', content, topicConfigs);
