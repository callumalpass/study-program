/**
 * MATH401 Topics
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
    title: "Complex Numbers and the Complex Plane",
    quizIds: ['math401-quiz-1-1', 'math401-quiz-1-2', 'math401-quiz-1-3'],
    exerciseIds: ['math401-t1-ex01', 'math401-t1-ex02', 'math401-t1-ex03', 'math401-t1-ex04', 'math401-t1-ex05', 'math401-t1-ex06', 'math401-t1-ex07', 'math401-t1-ex08', 'math401-t1-ex09', 'math401-t1-ex10', 'math401-t1-ex11', 'math401-t1-ex12', 'math401-t1-ex13', 'math401-t1-ex14', 'math401-t1-ex15', 'math401-t1-ex16'],
  },
  {
    number: 2,
    title: "Analytic Functions",
    quizIds: ['math401-quiz-2-1', 'math401-quiz-2-2', 'math401-quiz-2-3'],
    exerciseIds: ['math401-t2-ex01', 'math401-t2-ex02', 'math401-t2-ex03', 'math401-t2-ex04', 'math401-t2-ex05', 'math401-t2-ex06', 'math401-t2-ex07', 'math401-t2-ex08', 'math401-t2-ex09', 'math401-t2-ex10', 'math401-t2-ex11', 'math401-t2-ex12', 'math401-t2-ex13', 'math401-t2-ex14', 'math401-t2-ex15', 'math401-t2-ex16'],
  },
  {
    number: 3,
    title: "Complex Integration",
    quizIds: ['math401-quiz-3-1', 'math401-quiz-3-2', 'math401-quiz-3-3'],
    exerciseIds: ['math401-t3-ex01', 'math401-t3-ex02', 'math401-t3-ex03', 'math401-t3-ex04', 'math401-t3-ex05', 'math401-t3-ex06', 'math401-t3-ex07', 'math401-t3-ex08', 'math401-t3-ex09', 'math401-t3-ex10', 'math401-t3-ex11', 'math401-t3-ex12', 'math401-t3-ex13', 'math401-t3-ex14', 'math401-t3-ex15', 'math401-t3-ex16'],
  },
  {
    number: 4,
    title: "Cauchy\\",
    quizIds: ['math401-quiz-4-1', 'math401-quiz-4-2', 'math401-quiz-4-3'],
    exerciseIds: ['math401-t4-ex01', 'math401-t4-ex02', 'math401-t4-ex03', 'math401-t4-ex04', 'math401-t4-ex05', 'math401-t4-ex06', 'math401-t4-ex07', 'math401-t4-ex08', 'math401-t4-ex09', 'math401-t4-ex10', 'math401-t4-ex11', 'math401-t4-ex12', 'math401-t4-ex13', 'math401-t4-ex14', 'math401-t4-ex15', 'math401-t4-ex16'],
  },
  {
    number: 5,
    title: "Power Series and Taylor Series",
    quizIds: ['math401-quiz-5-1', 'math401-quiz-5-2', 'math401-quiz-5-3'],
    exerciseIds: ['math401-t5-ex01', 'math401-t5-ex02', 'math401-t5-ex03', 'math401-t5-ex04', 'math401-t5-ex05', 'math401-t5-ex06', 'math401-t5-ex07', 'math401-t5-ex08', 'math401-t5-ex09', 'math401-t5-ex10', 'math401-t5-ex11', 'math401-t5-ex12', 'math401-t5-ex13', 'math401-t5-ex14', 'math401-t5-ex15', 'math401-t5-ex16'],
  },
  {
    number: 6,
    title: "Laurent Series and Residue Theory",
    quizIds: ['math401-quiz-6-1', 'math401-quiz-6-2', 'math401-quiz-6-3'],
    exerciseIds: ['math401-t6-ex01', 'math401-t6-ex02', 'math401-t6-ex03', 'math401-t6-ex04', 'math401-t6-ex05', 'math401-t6-ex06', 'math401-t6-ex07', 'math401-t6-ex08', 'math401-t6-ex09', 'math401-t6-ex10', 'math401-t6-ex11', 'math401-t6-ex12', 'math401-t6-ex13', 'math401-t6-ex14', 'math401-t6-ex15', 'math401-t6-ex16'],
  },
  {
    number: 7,
    title: "Conformal Mappings",
    quizIds: ['math401-quiz-7-1', 'math401-quiz-7-2', 'math401-quiz-7-3'],
    exerciseIds: ['math401-t7-ex01', 'math401-t7-ex02', 'math401-t7-ex03', 'math401-t7-ex04', 'math401-t7-ex05', 'math401-t7-ex06', 'math401-t7-ex07', 'math401-t7-ex08', 'math401-t7-ex09', 'math401-t7-ex10', 'math401-t7-ex11', 'math401-t7-ex12', 'math401-t7-ex13', 'math401-t7-ex14', 'math401-t7-ex15', 'math401-t7-ex16'],
  },
];

export const math401Topics: Topic[] = buildTopicsFromGlob('math401', content, topicConfigs);
