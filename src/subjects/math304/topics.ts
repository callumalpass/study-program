/**
 * MATH304 Topics
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
    title: "Groups and Subgroups",
    quizIds: ['math304-quiz-1-1', 'math304-quiz-1-2', 'math304-quiz-1-3'],
    exerciseIds: ['math304-t1-ex01', 'math304-t1-ex02', 'math304-t1-ex03', 'math304-t1-ex04', 'math304-t1-ex05', 'math304-t1-ex06', 'math304-t1-ex07', 'math304-t1-ex08', 'math304-t1-ex09', 'math304-t1-ex10', 'math304-t1-ex11', 'math304-t1-ex12', 'math304-t1-ex13', 'math304-t1-ex14', 'math304-t1-ex15', 'math304-t1-ex16'],
  },
  {
    number: 2,
    title: "Cyclic Groups and Generators",
    quizIds: ['math304-quiz-2-1', 'math304-quiz-2-2', 'math304-quiz-2-3'],
    exerciseIds: ['math304-t2-ex01', 'math304-t2-ex02', 'math304-t2-ex03', 'math304-t2-ex04', 'math304-t2-ex05', 'math304-t2-ex06', 'math304-t2-ex07', 'math304-t2-ex08', 'math304-t2-ex09', 'math304-t2-ex10', 'math304-t2-ex11', 'math304-t2-ex12', 'math304-t2-ex13', 'math304-t2-ex14', 'math304-t2-ex15', 'math304-t2-ex16'],
  },
  {
    number: 3,
    title: "Permutation Groups",
    quizIds: ['math304-quiz-3-1', 'math304-quiz-3-2', 'math304-quiz-3-3'],
    exerciseIds: ['math304-t3-ex01', 'math304-t3-ex02', 'math304-t3-ex03', 'math304-t3-ex04', 'math304-t3-ex05', 'math304-t3-ex06', 'math304-t3-ex07', 'math304-t3-ex08', 'math304-t3-ex09', 'math304-t3-ex10', 'math304-t3-ex11', 'math304-t3-ex12', 'math304-t3-ex13', 'math304-t3-ex14', 'math304-t3-ex15', 'math304-t3-ex16'],
  },
  {
    number: 4,
    title: "Cosets and Lagrange's Theorem",
    quizIds: ['math304-quiz-4-1', 'math304-quiz-4-2', 'math304-quiz-4-3'],
    exerciseIds: ['math304-t4-ex01', 'math304-t4-ex02', 'math304-t4-ex03', 'math304-t4-ex04', 'math304-t4-ex05', 'math304-t4-ex06', 'math304-t4-ex07', 'math304-t4-ex08', 'math304-t4-ex09', 'math304-t4-ex10', 'math304-t4-ex11', 'math304-t4-ex12', 'math304-t4-ex13', 'math304-t4-ex14', 'math304-t4-ex15', 'math304-t4-ex16'],
  },
  {
    number: 5,
    title: "Group Homomorphisms and Isomorphisms",
    quizIds: ['math304-quiz-5-1', 'math304-quiz-5-2', 'math304-quiz-5-3'],
    exerciseIds: ['math304-t5-ex01', 'math304-t5-ex02', 'math304-t5-ex03', 'math304-t5-ex04', 'math304-t5-ex05', 'math304-t5-ex06', 'math304-t5-ex07', 'math304-t5-ex08', 'math304-t5-ex09', 'math304-t5-ex10', 'math304-t5-ex11', 'math304-t5-ex12', 'math304-t5-ex13', 'math304-t5-ex14', 'math304-t5-ex15', 'math304-t5-ex16'],
  },
  {
    number: 6,
    title: "Rings and Fields",
    quizIds: ['math304-quiz-6-1', 'math304-quiz-6-2', 'math304-quiz-6-3'],
    exerciseIds: ['math304-t6-ex01', 'math304-t6-ex02', 'math304-t6-ex03', 'math304-t6-ex04', 'math304-t6-ex05', 'math304-t6-ex06', 'math304-t6-ex07', 'math304-t6-ex08', 'math304-t6-ex09', 'math304-t6-ex10', 'math304-t6-ex11', 'math304-t6-ex12', 'math304-t6-ex13', 'math304-t6-ex14', 'math304-t6-ex15', 'math304-t6-ex16'],
  },
  {
    number: 7,
    title: "Applications to Cryptography",
    quizIds: ['math304-quiz-7-1', 'math304-quiz-7-2', 'math304-quiz-7-3'],
    exerciseIds: ['math304-t7-ex01', 'math304-t7-ex02', 'math304-t7-ex03', 'math304-t7-ex04', 'math304-t7-ex05', 'math304-t7-ex06', 'math304-t7-ex07', 'math304-t7-ex08', 'math304-t7-ex09', 'math304-t7-ex10', 'math304-t7-ex11', 'math304-t7-ex12', 'math304-t7-ex13', 'math304-t7-ex14', 'math304-t7-ex15', 'math304-t7-ex16'],
  },
];

export const math304Topics: Topic[] = buildTopicsFromGlob('math304', content, topicConfigs);
