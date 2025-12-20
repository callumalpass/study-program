/**
 * MATH404 Topics
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
    title: "Problem Formulation",
    quizIds: ['math404-quiz-1a', 'math404-quiz-1b', 'math404-quiz-1c'],
    exerciseIds: ['math404-t1-ex01', 'math404-t1-ex02', 'math404-t1-ex03', 'math404-t1-ex04', 'math404-t1-ex05', 'math404-t1-ex06', 'math404-t1-ex07', 'math404-t1-ex08', 'math404-t1-ex09', 'math404-t1-ex10', 'math404-t1-ex11', 'math404-t1-ex12', 'math404-t1-ex13', 'math404-t1-ex14', 'math404-t1-ex15', 'math404-t1-ex16'],
  },
  {
    number: 2,
    title: "Linear Programming",
    quizIds: ['math404-quiz-2a', 'math404-quiz-2b', 'math404-quiz-2c'],
    exerciseIds: ['math404-t2-ex01', 'math404-t2-ex02', 'math404-t2-ex03', 'math404-t2-ex04', 'math404-t2-ex05', 'math404-t2-ex06', 'math404-t2-ex07', 'math404-t2-ex08', 'math404-t2-ex09', 'math404-t2-ex10', 'math404-t2-ex11', 'math404-t2-ex12', 'math404-t2-ex13', 'math404-t2-ex14', 'math404-t2-ex15', 'math404-t2-ex16'],
  },
  {
    number: 3,
    title: "Duality Theory",
    quizIds: ['math404-quiz-3a', 'math404-quiz-3b', 'math404-quiz-3c'],
    exerciseIds: ['math404-t3-ex01', 'math404-t3-ex02', 'math404-t3-ex03', 'math404-t3-ex04', 'math404-t3-ex05', 'math404-t3-ex06', 'math404-t3-ex07', 'math404-t3-ex08', 'math404-t3-ex09', 'math404-t3-ex10', 'math404-t3-ex11', 'math404-t3-ex12', 'math404-t3-ex13', 'math404-t3-ex14', 'math404-t3-ex15', 'math404-t3-ex16'],
  },
  {
    number: 4,
    title: "Convex Sets and Functions",
    quizIds: ['math404-quiz-4a', 'math404-quiz-4b', 'math404-quiz-4c'],
    exerciseIds: ['math404-t4-ex01', 'math404-t4-ex02', 'math404-t4-ex03', 'math404-t4-ex04', 'math404-t4-ex05', 'math404-t4-ex06', 'math404-t4-ex07', 'math404-t4-ex08', 'math404-t4-ex09', 'math404-t4-ex10', 'math404-t4-ex11', 'math404-t4-ex12', 'math404-t4-ex13', 'math404-t4-ex14', 'math404-t4-ex15', 'math404-t4-ex16'],
  },
  {
    number: 5,
    title: "Convex Optimization",
    quizIds: ['math404-quiz-5a', 'math404-quiz-5b', 'math404-quiz-5c'],
    exerciseIds: ['math404-t5-ex01', 'math404-t5-ex02', 'math404-t5-ex03', 'math404-t5-ex04', 'math404-t5-ex05', 'math404-t5-ex06', 'math404-t5-ex07', 'math404-t5-ex08', 'math404-t5-ex09', 'math404-t5-ex10', 'math404-t5-ex11', 'math404-t5-ex12', 'math404-t5-ex13', 'math404-t5-ex14', 'math404-t5-ex15', 'math404-t5-ex16'],
  },
  {
    number: 6,
    title: "Gradient Methods",
    quizIds: ['math404-quiz-6a', 'math404-quiz-6b', 'math404-quiz-6c'],
    exerciseIds: ['math404-t6-ex01', 'math404-t6-ex02', 'math404-t6-ex03', 'math404-t6-ex04', 'math404-t6-ex05', 'math404-t6-ex06', 'math404-t6-ex07', 'math404-t6-ex08', 'math404-t6-ex09', 'math404-t6-ex10', 'math404-t6-ex11', 'math404-t6-ex12', 'math404-t6-ex13', 'math404-t6-ex14', 'math404-t6-ex15', 'math404-t6-ex16'],
  },
  {
    number: 7,
    title: "Constrained Optimization",
    quizIds: ['math404-quiz-7a', 'math404-quiz-7b', 'math404-quiz-7c'],
    exerciseIds: ['math404-t7-ex01', 'math404-t7-ex02', 'math404-t7-ex03', 'math404-t7-ex04', 'math404-t7-ex05', 'math404-t7-ex06', 'math404-t7-ex07', 'math404-t7-ex08', 'math404-t7-ex09', 'math404-t7-ex10', 'math404-t7-ex11', 'math404-t7-ex12', 'math404-t7-ex13', 'math404-t7-ex14', 'math404-t7-ex15', 'math404-t7-ex16'],
  },
];

export const math404Topics: Topic[] = buildTopicsFromGlob('math404', content, topicConfigs);
