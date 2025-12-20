/**
 * CS102 Topics
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
    title: 'Number Systems and Conversion',
    quizIds: ['cs102-quiz-1', 'cs102-quiz-1-b', 'cs102-quiz-1-c'],
    exerciseIds: ['cs102-ex-1', 'cs102-t1-ex02', 'cs102-t1-ex03', 'cs102-t1-ex04', 'cs102-t1-ex05', 'cs102-t1-ex06', 'cs102-t1-ex07', 'cs102-t1-ex08', 'cs102-t1-ex09', 'cs102-t1-ex10', 'cs102-t1-drill-1', 'cs102-t1-drill-2', 'cs102-t1-ex13', 'cs102-t1-ex14', 'cs102-t1-ex15', 'cs102-t1-ex16'],
  },
  {
    number: 2,
    title: 'Binary Arithmetic',
    quizIds: ['cs102-quiz-2', 'cs102-quiz-2-b', 'cs102-quiz-2-c'],
    exerciseIds: ['cs102-ex-2', 'cs102-t2-ex02', 'cs102-t2-ex03', 'cs102-t2-ex04', 'cs102-t2-ex05', 'cs102-t2-ex06', 'cs102-t2-ex07', 'cs102-t2-ex08', 'cs102-t2-ex09', 'cs102-t2-ex10', 'cs102-t2-drill-1', 'cs102-t2-drill-2', 'cs102-t2-ex13', 'cs102-t2-ex14', 'cs102-t2-ex15', 'cs102-t2-ex16'],
  },
  {
    number: 3,
    title: 'Data Representation',
    quizIds: ['cs102-quiz-3', 'cs102-quiz-3-b', 'cs102-quiz-3-c'],
    exerciseIds: ['cs102-ex-3', 'cs102-t3-ex02', 'cs102-t3-ex03', 'cs102-t3-ex04', 'cs102-t3-ex05', 'cs102-t3-ex06', 'cs102-t3-ex07', 'cs102-t3-ex08', 'cs102-t3-ex09', 'cs102-t3-ex10', 'cs102-t3-drill-1', 'cs102-t3-drill-2', 'cs102-t3-ex13', 'cs102-t3-ex14', 'cs102-t3-ex15', 'cs102-t3-ex16'],
  },
  {
    number: 4,
    title: 'Boolean Algebra and Logic Gates',
    quizIds: ['cs102-quiz-4', 'cs102-quiz-4-b', 'cs102-quiz-4-c'],
    exerciseIds: ['cs102-ex-4', 'cs102-t4-ex02', 'cs102-t4-ex03', 'cs102-t4-ex04', 'cs102-t4-ex05', 'cs102-t4-ex06', 'cs102-t4-ex07', 'cs102-t4-ex08', 'cs102-t4-ex09', 'cs102-t4-ex10', 'cs102-t4-ex11', 'cs102-t4-drill-1', 'cs102-t4-drill-2', 'cs102-t4-ex14', 'cs102-t4-ex15', 'cs102-t4-ex16'],
  },
  {
    number: 5,
    title: 'Basic Computer Architecture',
    quizIds: ['cs102-quiz-5', 'cs102-quiz-5-b', 'cs102-quiz-5-c'],
    exerciseIds: ['cs102-ex-5', 'cs102-t5-ex02', 'cs102-t5-ex03', 'cs102-t5-ex04', 'cs102-t5-ex05', 'cs102-t5-ex06', 'cs102-t5-ex07', 'cs102-t5-ex08', 'cs102-t5-ex09', 'cs102-t5-ex10', 'cs102-t5-drill-1', 'cs102-t5-drill-2', 'cs102-t5-ex13', 'cs102-t5-ex14', 'cs102-t5-ex15', 'cs102-t5-ex16'],
  },
  {
    number: 6,
    title: 'Assembly Language Basics',
    quizIds: ['cs102-quiz-6', 'cs102-quiz-6-b', 'cs102-quiz-6-c'],
    exerciseIds: ['cs102-t6-ex01', 'cs102-t6-ex02', 'cs102-t6-ex03', 'cs102-t6-ex04', 'cs102-t6-ex05', 'cs102-t6-ex06', 'cs102-t6-ex07', 'cs102-t6-ex08', 'cs102-t6-ex09', 'cs102-t6-ex10', 'cs102-t6-ex11', 'cs102-t6-ex12', 'cs102-t6-ex13', 'cs102-t6-ex14', 'cs102-t6-ex15', 'cs102-t6-ex16'],
  },
  {
    number: 7,
    title: 'Memory Hierarchy and I/O',
    quizIds: ['cs102-quiz-7', 'cs102-quiz-7-b', 'cs102-quiz-7-c'],
    exerciseIds: ['cs102-t7-ex01', 'cs102-t7-ex02', 'cs102-t7-ex03', 'cs102-t7-ex04', 'cs102-t7-ex05', 'cs102-t7-ex06', 'cs102-t7-ex07', 'cs102-t7-ex08', 'cs102-t7-ex09', 'cs102-t7-ex10', 'cs102-t7-ex11', 'cs102-t7-ex12', 'cs102-t7-ex13', 'cs102-t7-ex14', 'cs102-t7-ex15', 'cs102-t7-ex16'],
  },
];

export const cs102Topics: Topic[] = buildTopicsFromGlob('cs102', content, topicConfigs);
