/**
 * CS103 Topics
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
    title: 'Classes and Objects',
    quizIds: ['cs103-quiz-1', 'cs103-quiz-1b', 'cs103-quiz-1c'],
    exerciseIds: ['cs103-ex-1', 'cs103-t1-ex02', 'cs103-t1-ex03', 'cs103-t1-ex04', 'cs103-t1-ex05', 'cs103-t1-ex06', 'cs103-t1-ex07', 'cs103-t1-ex08', 'cs103-t1-ex09', 'cs103-t1-ex10', 'cs103-t1-ex11', 'cs103-t1-ex12', 'cs103-t1-ex13', 'cs103-t1-ex14', 'cs103-t1-drill-1', 'cs103-t1-drill-2'],
  },
  {
    number: 2,
    title: 'Encapsulation',
    quizIds: ['cs103-quiz-2', 'cs103-quiz-2b', 'cs103-quiz-2c'],
    exerciseIds: ['cs103-ex-2', 'cs103-t2-ex02', 'cs103-t2-ex03', 'cs103-t2-ex04', 'cs103-t2-ex05', 'cs103-t2-ex06', 'cs103-t2-ex07', 'cs103-t2-ex08', 'cs103-t2-ex09', 'cs103-t2-ex10', 'cs103-t2-ex11', 'cs103-t2-ex12', 'cs103-t2-ex13', 'cs103-t2-ex14', 'cs103-t2-drill-1', 'cs103-t2-drill-2'],
  },
  {
    number: 3,
    title: 'Inheritance',
    quizIds: ['cs103-quiz-3', 'cs103-quiz-3b', 'cs103-quiz-3c'],
    exerciseIds: ['cs103-ex-3', 'cs103-t3-ex02', 'cs103-t3-ex03', 'cs103-t3-ex04', 'cs103-t3-ex05', 'cs103-t3-ex06', 'cs103-t3-ex07', 'cs103-t3-ex08', 'cs103-t3-ex09', 'cs103-t3-ex10', 'cs103-t3-ex11', 'cs103-t3-ex12', 'cs103-t3-ex13', 'cs103-t3-ex14', 'cs103-t3-drill-1', 'cs103-t3-drill-2'],
  },
  {
    number: 4,
    title: 'Polymorphism',
    quizIds: ['cs103-quiz-4', 'cs103-quiz-4b', 'cs103-quiz-4c'],
    exerciseIds: ['cs103-ex-4', 'cs103-t4-ex02', 'cs103-t4-ex03', 'cs103-t4-ex04', 'cs103-t4-ex05', 'cs103-t4-ex06', 'cs103-t4-ex07', 'cs103-t4-ex08', 'cs103-t4-ex09', 'cs103-t4-ex10', 'cs103-t4-ex11', 'cs103-t4-ex12', 'cs103-t4-ex13', 'cs103-t4-ex14', 'cs103-t4-drill-1', 'cs103-t4-drill-2'],
  },
  {
    number: 5,
    title: 'Design Patterns Intro',
    quizIds: ['cs103-quiz-5', 'cs103-quiz-5b', 'cs103-quiz-5c'],
    exerciseIds: ['cs103-ex-5', 'cs103-t5-ex02', 'cs103-t5-ex03', 'cs103-t5-ex04', 'cs103-t5-ex05', 'cs103-t5-ex06', 'cs103-t5-ex07', 'cs103-t5-ex08', 'cs103-t5-ex09', 'cs103-t5-ex10', 'cs103-t5-ex11', 'cs103-t5-ex12', 'cs103-t5-ex13', 'cs103-t5-ex14', 'cs103-t5-drill-1', 'cs103-t5-drill-2'],
  },
  {
    number: 6,
    title: 'Abstraction and Interfaces',
    quizIds: ['cs103-quiz-6a', 'cs103-quiz-6b', 'cs103-quiz-6c'],
    exerciseIds: ['cs103-ex-6', 'cs103-t6-ex02', 'cs103-t6-ex03', 'cs103-t6-ex04', 'cs103-t6-ex05', 'cs103-t6-ex06', 'cs103-t6-ex07', 'cs103-t6-ex08', 'cs103-t6-ex09', 'cs103-t6-ex10', 'cs103-t6-ex11', 'cs103-t6-ex12', 'cs103-t6-ex13', 'cs103-t6-ex14', 'cs103-t6-drill-1', 'cs103-t6-drill-2'],
  },
  {
    number: 7,
    title: 'Design Principles and Testing',
    quizIds: ['cs103-quiz-7a', 'cs103-quiz-7b', 'cs103-quiz-7c'],
    exerciseIds: ['cs103-ex-7', 'cs103-t7-ex02', 'cs103-t7-ex03', 'cs103-t7-ex04', 'cs103-t7-ex05', 'cs103-t7-ex06', 'cs103-t7-ex07', 'cs103-t7-ex08', 'cs103-t7-ex09', 'cs103-t7-ex10', 'cs103-t7-ex11', 'cs103-t7-ex12', 'cs103-t7-ex13', 'cs103-t7-ex14', 'cs103-t7-drill-1', 'cs103-t7-drill-2'],
  },
];

export const cs103Topics: Topic[] = buildTopicsFromGlob('cs103', content, topicConfigs);
