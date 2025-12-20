/**
 * MATH204 Topics
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
    title: 'Antiderivatives and Indefinite Integrals',
    quizIds: ['math204-quiz-1a', 'math204-quiz-1b', 'math204-quiz-1c'],
    exerciseIds: ['math204-t1-ex01', 'math204-t1-ex02', 'math204-t1-ex03', 'math204-t1-ex04', 'math204-t1-ex05', 'math204-t1-ex06', 'math204-t1-ex07', 'math204-t1-ex08', 'math204-t1-ex09', 'math204-t1-ex10', 'math204-t1-ex11', 'math204-t1-ex12', 'math204-t1-ex13', 'math204-t1-ex14', 'math204-t1-ex15', 'math204-t1-ex16'],
  },
  {
    number: 2,
    title: 'Definite Integrals and Fundamental Theorem',
    quizIds: ['math204-quiz-2a', 'math204-quiz-2b', 'math204-quiz-2c'],
    exerciseIds: ['math204-t2-ex01', 'math204-t2-ex02', 'math204-t2-ex03', 'math204-t2-ex04', 'math204-t2-ex05', 'math204-t2-ex06', 'math204-t2-ex07', 'math204-t2-ex08', 'math204-t2-ex09', 'math204-t2-ex10', 'math204-t2-ex11', 'math204-t2-ex12', 'math204-t2-ex13', 'math204-t2-ex14', 'math204-t2-ex15', 'math204-t2-ex16'],
  },
  {
    number: 3,
    title: 'Integration Techniques',
    quizIds: ['math204-quiz-3a', 'math204-quiz-3b', 'math204-quiz-3c'],
    exerciseIds: ['math204-t3-ex01', 'math204-t3-ex02', 'math204-t3-ex03', 'math204-t3-ex04', 'math204-t3-ex05', 'math204-t3-ex06', 'math204-t3-ex07', 'math204-t3-ex08', 'math204-t3-ex09', 'math204-t3-ex10', 'math204-t3-ex11', 'math204-t3-ex12', 'math204-t3-ex13', 'math204-t3-ex14', 'math204-t3-ex15', 'math204-t3-ex16'],
  },
  {
    number: 4,
    title: 'Applications of Integration',
    quizIds: ['math204-quiz-4a', 'math204-quiz-4b', 'math204-quiz-4c'],
    exerciseIds: ['math204-t4-ex01', 'math204-t4-ex02', 'math204-t4-ex03', 'math204-t4-ex04', 'math204-t4-ex05', 'math204-t4-ex06', 'math204-t4-ex07', 'math204-t4-ex08', 'math204-t4-ex09', 'math204-t4-ex10', 'math204-t4-ex11', 'math204-t4-ex12', 'math204-t4-ex13', 'math204-t4-ex14', 'math204-t4-ex15', 'math204-t4-ex16'],
  },
  {
    number: 5,
    title: 'Improper Integrals',
    quizIds: ['math204-quiz-5a', 'math204-quiz-5b', 'math204-quiz-5c'],
    exerciseIds: ['math204-t5-ex01', 'math204-t5-ex02', 'math204-t5-ex03', 'math204-t5-ex04', 'math204-t5-ex05', 'math204-t5-ex06', 'math204-t5-ex07', 'math204-t5-ex08', 'math204-t5-ex09', 'math204-t5-ex10', 'math204-t5-ex11', 'math204-t5-ex12', 'math204-t5-ex13', 'math204-t5-ex14', 'math204-t5-ex15', 'math204-t5-ex16'],
  },
  {
    number: 6,
    title: 'Sequences and Series',
    quizIds: ['math204-quiz-6a', 'math204-quiz-6b', 'math204-quiz-6c'],
    exerciseIds: ['math204-t6-ex01', 'math204-t6-ex02', 'math204-t6-ex03', 'math204-t6-ex04', 'math204-t6-ex05', 'math204-t6-ex06', 'math204-t6-ex07', 'math204-t6-ex08', 'math204-t6-ex09', 'math204-t6-ex10', 'math204-t6-ex11', 'math204-t6-ex12', 'math204-t6-ex13', 'math204-t6-ex14', 'math204-t6-ex15', 'math204-t6-ex16'],
  },
  {
    number: 7,
    title: 'Taylor and Maclaurin Series',
    quizIds: ['math204-quiz-7a', 'math204-quiz-7b', 'math204-quiz-7c'],
    exerciseIds: ['math204-t7-ex01', 'math204-t7-ex02', 'math204-t7-ex03', 'math204-t7-ex04', 'math204-t7-ex05', 'math204-t7-ex06', 'math204-t7-ex07', 'math204-t7-ex08', 'math204-t7-ex09', 'math204-t7-ex10', 'math204-t7-ex11', 'math204-t7-ex12', 'math204-t7-ex13', 'math204-t7-ex14', 'math204-t7-ex15', 'math204-t7-ex16'],
  },
];

export const math204Topics: Topic[] = buildTopicsFromGlob('math204', content, topicConfigs);
