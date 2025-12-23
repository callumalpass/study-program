/**
 * CS307 Topics
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
    title: 'Security Principles',
    quizIds: ['cs307-quiz-1-1', 'cs307-quiz-1-2', 'cs307-quiz-1-3'],
    exerciseIds: [
      'cs307-t1-ex01', 'cs307-t1-ex02', 'cs307-t1-ex03', 'cs307-t1-ex04',
      'cs307-t1-ex05', 'cs307-t1-ex06', 'cs307-t1-ex07', 'cs307-t1-ex08',
      'cs307-t1-ex09', 'cs307-t1-ex10', 'cs307-t1-ex11', 'cs307-t1-ex12',
      'cs307-t1-ex13', 'cs307-t1-ex14', 'cs307-t1-ex15', 'cs307-t1-ex16',
    ],
  },
  {
    number: 2,
    title: 'Cryptography Fundamentals',
    quizIds: ['cs307-quiz-2-1', 'cs307-quiz-2-2', 'cs307-quiz-2-3'],
    exerciseIds: [
      'cs307-t2-ex01', 'cs307-t2-ex02', 'cs307-t2-ex03', 'cs307-t2-ex04',
      'cs307-t2-ex05', 'cs307-t2-ex06', 'cs307-t2-ex07', 'cs307-t2-ex08',
      'cs307-t2-ex09', 'cs307-t2-ex10', 'cs307-t2-ex11', 'cs307-t2-ex12',
      'cs307-t2-ex13', 'cs307-t2-ex14', 'cs307-t2-ex15', 'cs307-t2-ex16',
    ],
  },
  {
    number: 3,
    title: 'Authentication and Access Control',
    quizIds: ['cs307-quiz-3-1', 'cs307-quiz-3-2', 'cs307-quiz-3-3'],
    exerciseIds: [
      'cs307-t3-ex01', 'cs307-t3-ex02', 'cs307-t3-ex03', 'cs307-t3-ex04',
      'cs307-t3-ex05', 'cs307-t3-ex06', 'cs307-t3-ex07', 'cs307-t3-ex08',
      'cs307-t3-ex09', 'cs307-t3-ex10', 'cs307-t3-ex11', 'cs307-t3-ex12',
      'cs307-t3-ex13', 'cs307-t3-ex14', 'cs307-t3-ex15', 'cs307-t3-ex16',
    ],
  },
  {
    number: 4,
    title: 'Common Vulnerabilities',
    quizIds: ['cs307-quiz-4-1', 'cs307-quiz-4-2', 'cs307-quiz-4-3'],
    exerciseIds: [
      'cs307-t4-ex01', 'cs307-t4-ex02', 'cs307-t4-ex03', 'cs307-t4-ex04',
      'cs307-t4-ex05', 'cs307-t4-ex06', 'cs307-t4-ex07', 'cs307-t4-ex08',
      'cs307-t4-ex09', 'cs307-t4-ex10', 'cs307-t4-ex11', 'cs307-t4-ex12',
      'cs307-t4-ex13', 'cs307-t4-ex14', 'cs307-t4-ex15', 'cs307-t4-ex16',
    ],
  },
  {
    number: 5,
    title: 'Secure Coding Practices',
    quizIds: ['cs307-quiz-5-1', 'cs307-quiz-5-2', 'cs307-quiz-5-3'],
    exerciseIds: [
      'cs307-t5-ex01', 'cs307-t5-ex02', 'cs307-t5-ex03', 'cs307-t5-ex04',
      'cs307-t5-ex05', 'cs307-t5-ex06', 'cs307-t5-ex07', 'cs307-t5-ex08',
      'cs307-t5-ex09', 'cs307-t5-ex10', 'cs307-t5-ex11', 'cs307-t5-ex12',
      'cs307-t5-ex13', 'cs307-t5-ex14', 'cs307-t5-ex15', 'cs307-t5-ex16',
    ],
  },
  {
    number: 6,
    title: 'Network Security',
    quizIds: ['cs307-quiz-6-1', 'cs307-quiz-6-2', 'cs307-quiz-6-3'],
    exerciseIds: [
      'cs307-t6-ex01', 'cs307-t6-ex02', 'cs307-t6-ex03', 'cs307-t6-ex04',
      'cs307-t6-ex05', 'cs307-t6-ex06', 'cs307-t6-ex07', 'cs307-t6-ex08',
      'cs307-t6-ex09', 'cs307-t6-ex10', 'cs307-t6-ex11', 'cs307-t6-ex12',
      'cs307-t6-ex13', 'cs307-t6-ex14', 'cs307-t6-ex15', 'cs307-t6-ex16',
    ],
  },
  {
    number: 7,
    title: 'Security Testing',
    quizIds: ['cs307-quiz-7-1', 'cs307-quiz-7-2', 'cs307-quiz-7-3'],
    exerciseIds: [
      'cs307-t7-ex01', 'cs307-t7-ex02', 'cs307-t7-ex03', 'cs307-t7-ex04',
      'cs307-t7-ex05', 'cs307-t7-ex06', 'cs307-t7-ex07', 'cs307-t7-ex08',
      'cs307-t7-ex09', 'cs307-t7-ex10', 'cs307-t7-ex11', 'cs307-t7-ex12',
      'cs307-t7-ex13', 'cs307-t7-ex14', 'cs307-t7-ex15', 'cs307-t7-ex16',
    ],
  },
];

export const cs307Topics: Topic[] = buildTopicsFromGlob('cs307', content, topicConfigs);
