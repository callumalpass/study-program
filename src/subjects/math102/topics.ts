/**
 * MATH102 Topics
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
    title: 'Combinatorics',
    quizIds: ['math102-q1', 'math102-q1b', 'math102-q1c'],
    exerciseIds: ['math102-e1', 'math102-t1-ex02', 'math102-t1-ex03', 'math102-t1-ex04', 'math102-t1-ex05', 'math102-t1-ex06', 'math102-t1-ex07', 'math102-t1-ex08', 'math102-t1-ex09', 'math102-t1-ex10', 'math102-t1-ex11', 'math102-t1-ex12', 'math102-t1-ex13', 'math102-t1-ex14', 'math102-t1-ex15', 'math102-t1-ex16'],
  },
  {
    number: 2,
    title: 'Recurrence Relations',
    quizIds: ['math102-q2', 'math102-q2b', 'math102-q2c'],
    exerciseIds: ['math102-e2', 'math102-t2-ex02', 'math102-t2-ex03', 'math102-t2-ex04', 'math102-t2-ex05', 'math102-t2-ex06', 'math102-t2-ex07', 'math102-t2-ex08', 'math102-t2-ex09', 'math102-t2-ex10', 'math102-t2-ex11', 'math102-t2-ex12', 'math102-t2-ex13', 'math102-t2-ex14', 'math102-t2-ex15', 'math102-t2-ex16'],
  },
  {
    number: 3,
    title: 'Graph Theory Basics',
    quizIds: ['math102-q3', 'math102-q3b', 'math102-q3c'],
    exerciseIds: ['math102-e3', 'math102-t3-ex02', 'math102-t3-ex03', 'math102-t3-ex04', 'math102-t3-ex05', 'math102-t3-ex06', 'math102-t3-ex07', 'math102-t3-ex08', 'math102-t3-ex09', 'math102-t3-ex10', 'math102-t3-ex11', 'math102-t3-ex12', 'math102-t3-ex13', 'math102-t3-ex14', 'math102-t3-ex15', 'math102-t3-ex16'],
  },
  {
    number: 4,
    title: 'Graph Algorithms',
    quizIds: ['math102-q4', 'math102-q4b', 'math102-q4c'],
    exerciseIds: ['math102-e4', 'math102-t4-ex02', 'math102-t4-ex03', 'math102-t4-ex04', 'math102-t4-ex05', 'math102-t4-ex06', 'math102-t4-ex07', 'math102-t4-ex08', 'math102-t4-ex09', 'math102-t4-ex10', 'math102-t4-ex11', 'math102-t4-ex12', 'math102-t4-ex13', 'math102-t4-ex14', 'math102-t4-ex15', 'math102-t4-ex16'],
  },
  {
    number: 5,
    title: 'Number Theory',
    quizIds: ['math102-q5', 'math102-q5b', 'math102-q5c'],
    exerciseIds: ['math102-e5', 'math102-t5-ex02', 'math102-t5-ex03', 'math102-t5-ex04', 'math102-t5-ex05', 'math102-t5-ex06', 'math102-t5-ex07', 'math102-t5-ex08', 'math102-t5-ex09', 'math102-t5-ex10', 'math102-t5-ex11', 'math102-t5-ex12', 'math102-t5-ex13', 'math102-t5-ex14', 'math102-t5-ex15', 'math102-t5-ex16'],
  },
  {
    number: 6,
    title: 'Advanced Counting Techniques',
    quizIds: ['math102-q6', 'math102-q6b', 'math102-q6c'],
    exerciseIds: ['math102-t6-ex01', 'math102-t6-ex02', 'math102-t6-ex03', 'math102-t6-ex04', 'math102-t6-ex05', 'math102-t6-ex06', 'math102-t6-ex07', 'math102-t6-ex08', 'math102-t6-ex09', 'math102-t6-ex10', 'math102-t6-ex11', 'math102-t6-ex12', 'math102-t6-ex13', 'math102-t6-ex14', 'math102-t6-ex15', 'math102-t6-ex16'],
  },
  {
    number: 7,
    title: 'Probability Foundations',
    quizIds: ['math102-q7', 'math102-q7b', 'math102-q7c'],
    exerciseIds: ['math102-t7-ex01', 'math102-t7-ex02', 'math102-t7-ex03', 'math102-t7-ex04', 'math102-t7-ex05', 'math102-t7-ex06', 'math102-t7-ex07', 'math102-t7-ex08', 'math102-t7-ex09', 'math102-t7-ex10', 'math102-t7-ex11', 'math102-t7-ex12', 'math102-t7-ex13', 'math102-t7-ex14', 'math102-t7-ex15', 'math102-t7-ex16'],
  },
];

export const math102Topics: Topic[] = buildTopicsFromGlob('math102', content, topicConfigs);
