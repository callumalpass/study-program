/**
 * CS105 Topics
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
    title: 'C Basics and Syntax',
    quizIds: ['cs105-quiz-1', 'cs105-quiz-1b', 'cs105-quiz-1c'],
    exerciseIds: ['cs105-exercise-1', 'cs105-t1-ex02', 'cs105-t1-ex03', 'cs105-t1-ex04', 'cs105-t1-ex05', 'cs105-t1-ex06', 'cs105-t1-ex07', 'cs105-t1-ex08', 'cs105-t1-ex09', 'cs105-t1-ex10', 'cs105-t1-ex11', 'cs105-t1-ex12', 'cs105-t1-ex13', 'cs105-t1-ex14', 'cs105-t1-ex15', 'cs105-t1-ex16'],
  },
  {
    number: 2,
    title: 'Pointers',
    quizIds: ['cs105-quiz-2', 'cs105-quiz-2b', 'cs105-quiz-2c'],
    exerciseIds: ['cs105-exercise-2', 'cs105-t2-ex02', 'cs105-t2-ex03', 'cs105-t2-ex04', 'cs105-t2-ex05', 'cs105-t2-ex06', 'cs105-t2-ex07', 'cs105-t2-ex08', 'cs105-t2-ex09', 'cs105-t2-ex10', 'cs105-t2-ex11', 'cs105-t2-ex12', 'cs105-t2-ex13', 'cs105-t2-ex14', 'cs105-t2-ex15', 'cs105-t2-ex16'],
  },
  {
    number: 3,
    title: 'Memory Management',
    quizIds: ['cs105-quiz-3', 'cs105-quiz-3b', 'cs105-quiz-3c'],
    exerciseIds: ['cs105-exercise-3', 'cs105-t3-ex02', 'cs105-t3-ex03', 'cs105-t3-ex04', 'cs105-t3-ex05', 'cs105-t3-ex06', 'cs105-t3-ex07', 'cs105-t3-ex08', 'cs105-t3-ex09', 'cs105-t3-ex10', 'cs105-t3-ex11', 'cs105-t3-ex12', 'cs105-t3-ex13', 'cs105-t3-ex14', 'cs105-t3-ex15', 'cs105-t3-ex16'],
  },
  {
    number: 4,
    title: 'Structures',
    quizIds: ['cs105-quiz-4', 'cs105-quiz-4b', 'cs105-quiz-4c'],
    exerciseIds: ['cs105-exercise-4', 'cs105-t4-ex02', 'cs105-t4-ex03', 'cs105-t4-ex04', 'cs105-t4-ex05', 'cs105-t4-ex06', 'cs105-t4-ex07', 'cs105-t4-ex08', 'cs105-t4-ex09', 'cs105-t4-ex10', 'cs105-t4-ex11', 'cs105-t4-ex12', 'cs105-t4-ex13', 'cs105-t4-ex14', 'cs105-t4-ex15', 'cs105-t4-ex16'],
  },
  {
    number: 5,
    title: 'File I/O',
    quizIds: ['cs105-quiz-5', 'cs105-quiz-5b', 'cs105-quiz-5c'],
    exerciseIds: ['cs105-exercise-5', 'cs105-t5-ex02', 'cs105-t5-ex03', 'cs105-t5-ex04', 'cs105-t5-ex05', 'cs105-t5-ex06', 'cs105-t5-ex07', 'cs105-t5-ex08', 'cs105-t5-ex09', 'cs105-t5-ex10', 'cs105-t5-ex11', 'cs105-t5-ex12', 'cs105-t5-ex13', 'cs105-t5-ex14', 'cs105-t5-ex15', 'cs105-t5-ex16'],
  },
  {
    number: 6,
    title: 'Preprocessor and Build System',
    quizIds: ['cs105-quiz-6', 'cs105-quiz-6b', 'cs105-quiz-6c'],
    exerciseIds: ['cs105-t6-ex01', 'cs105-t6-ex02', 'cs105-t6-ex03', 'cs105-t6-ex04', 'cs105-t6-ex05', 'cs105-t6-ex06', 'cs105-t6-ex07', 'cs105-t6-ex08', 'cs105-t6-ex09', 'cs105-t6-ex10', 'cs105-t6-ex11', 'cs105-t6-ex12', 'cs105-t6-ex13', 'cs105-t6-ex14', 'cs105-t6-ex15', 'cs105-t6-ex16'],
  },
  {
    number: 7,
    title: 'Advanced C Topics',
    quizIds: ['cs105-quiz-7', 'cs105-quiz-7b', 'cs105-quiz-7c'],
    exerciseIds: ['cs105-t7-ex01', 'cs105-t7-ex02', 'cs105-t7-ex03', 'cs105-t7-ex04', 'cs105-t7-ex05', 'cs105-t7-ex06', 'cs105-t7-ex07', 'cs105-t7-ex08', 'cs105-t7-ex09', 'cs105-t7-ex10', 'cs105-t7-ex11', 'cs105-t7-ex12', 'cs105-t7-ex13', 'cs105-t7-ex14', 'cs105-t7-ex15', 'cs105-t7-ex16'],
  },
];

export const cs105Topics: Topic[] = buildTopicsFromGlob('cs105', content, topicConfigs);
