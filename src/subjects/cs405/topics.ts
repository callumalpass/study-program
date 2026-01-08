/**
 * CS405 Topics
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
    title: 'Cloud Fundamentals',
    quizIds: ['cs405-quiz-1', 'cs405-quiz-1b', 'cs405-quiz-1c'],
    exerciseIds: [
      'cs405-ex-1-1', 'cs405-ex-1-2', 'cs405-ex-1-3', 'cs405-ex-1-4',
      'cs405-ex-1-5', 'cs405-ex-1-6', 'cs405-t1-ex07', 'cs405-t1-ex08',
      'cs405-t1-ex09', 'cs405-t1-ex10', 'cs405-t1-ex11', 'cs405-t1-ex12',
      'cs405-t1-ex13', 'cs405-t1-ex14', 'cs405-t1-ex15', 'cs405-t1-ex16',
    ],
  },
  {
    number: 2,
    title: 'Virtualization',
    quizIds: ['cs405-quiz-2', 'cs405-quiz-2b', 'cs405-quiz-2c'],
    exerciseIds: [
      'cs405-ex-2-1', 'cs405-ex-2-2', 'cs405-t2-ex03', 'cs405-t2-ex04',
      'cs405-t2-ex05', 'cs405-t2-ex06', 'cs405-t2-ex07', 'cs405-t2-ex08',
      'cs405-t2-ex09', 'cs405-t2-ex10', 'cs405-t2-ex11', 'cs405-t2-ex12',
      'cs405-t2-ex13', 'cs405-t2-ex14', 'cs405-t2-ex15', 'cs405-t2-ex16',
    ],
  },
  {
    number: 3,
    title: 'Containers and Docker',
    quizIds: ['cs405-quiz-3', 'cs405-quiz-3b', 'cs405-quiz-3c'],
    exerciseIds: [
      'cs405-ex-3-1', 'cs405-ex-3-2', 'cs405-t3-ex03', 'cs405-t3-ex04',
      'cs405-t3-ex05', 'cs405-t3-ex06', 'cs405-t3-ex07', 'cs405-t3-ex08',
      'cs405-t3-ex09', 'cs405-t3-ex10', 'cs405-t3-ex11', 'cs405-t3-ex12',
      'cs405-t3-ex13', 'cs405-t3-ex14', 'cs405-t3-ex15', 'cs405-t3-ex16',
    ],
  },
  {
    number: 4,
    title: 'Kubernetes',
    quizIds: ['cs405-quiz-4', 'cs405-quiz-4b', 'cs405-quiz-4c'],
    exerciseIds: [
      'cs405-t4-ex01', 'cs405-t4-ex02', 'cs405-t4-ex03', 'cs405-t4-ex04',
      'cs405-t4-ex05', 'cs405-t4-ex06', 'cs405-t4-ex07', 'cs405-t4-ex08',
      'cs405-t4-ex09', 'cs405-t4-ex10', 'cs405-t4-ex11', 'cs405-t4-ex12',
      'cs405-t4-ex13', 'cs405-t4-ex14', 'cs405-t4-ex15', 'cs405-t4-ex16',
    ],
  },
  {
    number: 5,
    title: 'Serverless Computing',
    quizIds: ['cs405-quiz-5', 'cs405-quiz-5b', 'cs405-quiz-5c'],
    exerciseIds: [
      'cs405-ex-5-1', 'cs405-t5-ex02', 'cs405-t5-ex03', 'cs405-t5-ex04',
      'cs405-t5-ex05', 'cs405-t5-ex06', 'cs405-t5-ex07', 'cs405-t5-ex08',
      'cs405-t5-ex09', 'cs405-t5-ex10', 'cs405-t5-ex11', 'cs405-t5-ex12',
      'cs405-t5-ex13', 'cs405-t5-ex14', 'cs405-t5-ex15', 'cs405-t5-ex16',
    ],
  },
  {
    number: 6,
    title: 'Cloud Storage and Databases',
    quizIds: ['cs405-quiz-6', 'cs405-quiz-6b', 'cs405-quiz-6c'],
    exerciseIds: [
      'cs405-ex-6-1', 'cs405-t6-ex02', 'cs405-t6-ex03', 'cs405-t6-ex04',
      'cs405-t6-ex05', 'cs405-t6-ex06', 'cs405-t6-ex07', 'cs405-t6-ex08',
      'cs405-t6-ex09', 'cs405-t6-ex10', 'cs405-t6-ex11', 'cs405-t6-ex12',
      'cs405-t6-ex13', 'cs405-t6-ex14', 'cs405-t6-ex15', 'cs405-t6-ex16',
    ],
  },
  {
    number: 7,
    title: 'Cloud-Native Architecture',
    quizIds: ['cs405-quiz-7', 'cs405-quiz-7b', 'cs405-quiz-7c'],
    exerciseIds: [
      'cs405-ex-7-1', 'cs405-t7-ex02', 'cs405-t7-ex03', 'cs405-t7-ex04',
      'cs405-t7-ex05', 'cs405-t7-ex06', 'cs405-t7-ex07', 'cs405-t7-ex08',
      'cs405-t7-ex09', 'cs405-t7-ex10', 'cs405-t7-ex11', 'cs405-t7-ex12',
      'cs405-t7-ex13', 'cs405-t7-ex14', 'cs405-t7-ex15', 'cs405-t7-ex16',
    ],
  },
];

export const cs405Topics: Topic[] = buildTopicsFromGlob('cs405', content, topicConfigs);
