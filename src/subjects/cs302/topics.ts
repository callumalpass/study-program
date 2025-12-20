/**
 * CS302 Topics
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
    title: 'Network Architecture and OSI Model',
    quizIds: ['cs302-quiz-1a', 'cs302-quiz-1b', 'cs302-quiz-1c'],
    exerciseIds: ['cs302-t1-ex01', 'cs302-t1-ex02', 'cs302-t1-ex03', 'cs302-t1-ex04', 'cs302-t1-ex05', 'cs302-t1-ex06', 'cs302-t1-ex07', 'cs302-t1-ex08', 'cs302-t1-ex09', 'cs302-t1-ex10', 'cs302-t1-ex11', 'cs302-t1-ex12', 'cs302-t1-ex13', 'cs302-t1-ex14', 'cs302-t1-ex15', 'cs302-t1-ex16'],
  },
  {
    number: 2,
    title: 'Physical and Data Link Layers',
    quizIds: ['cs302-quiz-2a', 'cs302-quiz-2b', 'cs302-quiz-2c'],
    exerciseIds: ['cs302-t2-ex01', 'cs302-t2-ex02', 'cs302-t2-ex03', 'cs302-t2-ex04', 'cs302-t2-ex05', 'cs302-t2-ex06', 'cs302-t2-ex07', 'cs302-t2-ex08', 'cs302-t2-ex09', 'cs302-t2-ex10', 'cs302-t2-ex11', 'cs302-t2-ex12', 'cs302-t2-ex13', 'cs302-t2-ex14', 'cs302-t2-ex15', 'cs302-t2-ex16'],
  },
  {
    number: 3,
    title: 'Network Layer and IP',
    quizIds: ['cs302-quiz-3a', 'cs302-quiz-3b', 'cs302-quiz-3c'],
    exerciseIds: ['cs302-t3-ex01', 'cs302-t3-ex02', 'cs302-t3-ex03', 'cs302-t3-ex04', 'cs302-t3-ex05', 'cs302-t3-ex06', 'cs302-t3-ex07', 'cs302-t3-ex08', 'cs302-t3-ex09', 'cs302-t3-ex10', 'cs302-t3-ex11', 'cs302-t3-ex12', 'cs302-t3-ex13', 'cs302-t3-ex14', 'cs302-t3-ex15', 'cs302-t3-ex16'],
  },
  {
    number: 4,
    title: 'Routing Algorithms',
    quizIds: ['cs302-quiz-4a', 'cs302-quiz-4b', 'cs302-quiz-4c'],
    exerciseIds: ['cs302-t4-ex01', 'cs302-t4-ex02', 'cs302-t4-ex03', 'cs302-t4-ex04', 'cs302-t4-ex05', 'cs302-t4-ex06', 'cs302-t4-ex07', 'cs302-t4-ex08', 'cs302-t4-ex09', 'cs302-t4-ex10', 'cs302-t4-ex11', 'cs302-t4-ex12', 'cs302-t4-ex13', 'cs302-t4-ex14', 'cs302-t4-ex15', 'cs302-t4-ex16'],
  },
  {
    number: 5,
    title: 'Transport Layer: TCP and UDP',
    quizIds: ['cs302-quiz-5a', 'cs302-quiz-5b', 'cs302-quiz-5c'],
    exerciseIds: ['cs302-t5-ex01', 'cs302-t5-ex02', 'cs302-t5-ex03', 'cs302-t5-ex04', 'cs302-t5-ex05', 'cs302-t5-ex06', 'cs302-t5-ex07', 'cs302-t5-ex08', 'cs302-t5-ex09', 'cs302-t5-ex10', 'cs302-t5-ex11', 'cs302-t5-ex12', 'cs302-t5-ex13', 'cs302-t5-ex14', 'cs302-t5-ex15', 'cs302-t5-ex16'],
  },
  {
    number: 6,
    title: 'Socket Programming',
    quizIds: ['cs302-quiz-6a', 'cs302-quiz-6b', 'cs302-quiz-6c'],
    exerciseIds: ['cs302-t6-ex01', 'cs302-t6-ex02', 'cs302-t6-ex03', 'cs302-t6-ex04', 'cs302-t6-ex05', 'cs302-t6-ex06', 'cs302-t6-ex07', 'cs302-t6-ex08', 'cs302-t6-ex09', 'cs302-t6-ex10', 'cs302-t6-ex11', 'cs302-t6-ex12', 'cs302-t6-ex13', 'cs302-t6-ex14', 'cs302-t6-ex15', 'cs302-t6-ex16'],
  },
  {
    number: 7,
    title: 'Application Layer and Security',
    quizIds: ['cs302-quiz-7a', 'cs302-quiz-7b', 'cs302-quiz-7c'],
    exerciseIds: ['cs302-t7-ex01', 'cs302-t7-ex02', 'cs302-t7-ex03', 'cs302-t7-ex04', 'cs302-t7-ex05', 'cs302-t7-ex06', 'cs302-t7-ex07', 'cs302-t7-ex08', 'cs302-t7-ex09', 'cs302-t7-ex10', 'cs302-t7-ex11', 'cs302-t7-ex12', 'cs302-t7-ex13', 'cs302-t7-ex14', 'cs302-t7-ex15', 'cs302-t7-ex16'],
  },
];

export const cs302Topics: Topic[] = buildTopicsFromGlob('cs302', content, topicConfigs);
