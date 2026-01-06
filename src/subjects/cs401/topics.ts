/**
 * CS401 Topics
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
    title: 'Distributed Systems Fundamentals',
    quizIds: ['cs401-quiz-1-1', 'cs401-quiz-1-2', 'cs401-quiz-1-3'],
  },
  {
    number: 2,
    title: 'Time and Coordination',
    quizIds: ['cs401-quiz-2-1', 'cs401-quiz-2-2', 'cs401-quiz-2-3'],
  },
  {
    number: 3,
    title: 'Consensus Algorithms',
    quizIds: ['cs401-quiz-3-1', 'cs401-quiz-3-2', 'cs401-quiz-3-3'],
  },
  {
    number: 4,
    title: 'Replication and Consistency',
    quizIds: ['cs401-quiz-4-1', 'cs401-quiz-4-2', 'cs401-quiz-4-3'],
  },
  {
    number: 5,
    title: 'Fault Tolerance',
    quizIds: ['cs401-quiz-5-1', 'cs401-quiz-5-2', 'cs401-quiz-5-3'],
  },
  {
    number: 6,
    title: 'MapReduce and Big Data',
    quizIds: ['cs401-quiz-6-1', 'cs401-quiz-6-2', 'cs401-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Microservices Architecture',
    quizIds: ['cs401-quiz-7-1', 'cs401-quiz-7-2', 'cs401-quiz-7-3'],
  },
];

export const cs401Topics: Topic[] = buildTopicsFromGlob('cs401', content, topicConfigs);
