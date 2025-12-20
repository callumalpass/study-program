/**
 * MATH201 Topics
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
    title: 'Systems of Linear Equations',
    quizIds: ['math201-quiz-1a', 'math201-quiz-1b', 'math201-quiz-1c'],
    exerciseIds: ['math201-t1-ex01', 'math201-t1-ex02', 'math201-t1-ex03', 'math201-t1-ex04', 'math201-t1-ex05', 'math201-t1-ex06', 'math201-t1-ex07', 'math201-t1-ex08', 'math201-t1-ex09', 'math201-t1-ex10', 'math201-t1-ex11', 'math201-t1-ex12', 'math201-t1-ex13', 'math201-t1-ex14', 'math201-t1-ex15', 'math201-t1-ex16'],
  },
  {
    number: 2,
    title: 'Matrix Operations',
    quizIds: ['math201-quiz-2a', 'math201-quiz-2b', 'math201-quiz-2c'],
    exerciseIds: ['math201-t2-ex01', 'math201-t2-ex02', 'math201-t2-ex03', 'math201-t2-ex04', 'math201-t2-ex05', 'math201-t2-ex06', 'math201-t2-ex07', 'math201-t2-ex08', 'math201-t2-ex09', 'math201-t2-ex10', 'math201-t2-ex11', 'math201-t2-ex12', 'math201-t2-ex13', 'math201-t2-ex14', 'math201-t2-ex15', 'math201-t2-ex16'],
  },
  {
    number: 3,
    title: 'Vector Spaces',
    quizIds: ['math201-quiz-3a', 'math201-quiz-3b', 'math201-quiz-3c'],
    exerciseIds: ['math201-t3-ex01', 'math201-t3-ex02', 'math201-t3-ex03', 'math201-t3-ex04', 'math201-t3-ex05', 'math201-t3-ex06', 'math201-t3-ex07', 'math201-t3-ex08', 'math201-t3-ex09', 'math201-t3-ex10', 'math201-t3-ex11', 'math201-t3-ex12', 'math201-t3-ex13', 'math201-t3-ex14', 'math201-t3-ex15', 'math201-t3-ex16'],
  },
  {
    number: 4,
    title: 'Linear Independence and Basis',
    quizIds: ['math201-quiz-4a', 'math201-quiz-4b', 'math201-quiz-4c'],
    exerciseIds: ['math201-t4-ex01', 'math201-t4-ex02', 'math201-t4-ex03', 'math201-t4-ex04', 'math201-t4-ex05', 'math201-t4-ex06', 'math201-t4-ex07', 'math201-t4-ex08', 'math201-t4-ex09', 'math201-t4-ex10', 'math201-t4-ex11', 'math201-t4-ex12', 'math201-t4-ex13', 'math201-t4-ex14', 'math201-t4-ex15', 'math201-t4-ex16'],
  },
  {
    number: 5,
    title: 'Determinants',
    quizIds: ['math201-quiz-5a', 'math201-quiz-5b', 'math201-quiz-5c'],
    exerciseIds: ['math201-t5-ex01', 'math201-t5-ex02', 'math201-t5-ex03', 'math201-t5-ex04', 'math201-t5-ex05', 'math201-t5-ex06', 'math201-t5-ex07', 'math201-t5-ex08', 'math201-t5-ex09', 'math201-t5-ex10', 'math201-t5-ex11', 'math201-t5-ex12', 'math201-t5-ex13', 'math201-t5-ex14', 'math201-t5-ex15', 'math201-t5-ex16'],
  },
  {
    number: 6,
    title: 'Eigenvalues and Eigenvectors',
    quizIds: ['math201-quiz-6a', 'math201-quiz-6b', 'math201-quiz-6c'],
    exerciseIds: ['math201-t6-ex01', 'math201-t6-ex02', 'math201-t6-ex03', 'math201-t6-ex04', 'math201-t6-ex05', 'math201-t6-ex06', 'math201-t6-ex07', 'math201-t6-ex08', 'math201-t6-ex09', 'math201-t6-ex10', 'math201-t6-ex11', 'math201-t6-ex12', 'math201-t6-ex13', 'math201-t6-ex14', 'math201-t6-ex15', 'math201-t6-ex16'],
  },
  {
    number: 7,
    title: 'Linear Transformations',
    quizIds: ['math201-quiz-7a', 'math201-quiz-7b', 'math201-quiz-7c'],
    exerciseIds: ['math201-t7-ex01', 'math201-t7-ex02', 'math201-t7-ex03', 'math201-t7-ex04', 'math201-t7-ex05', 'math201-t7-ex06', 'math201-t7-ex07', 'math201-t7-ex08', 'math201-t7-ex09', 'math201-t7-ex10', 'math201-t7-ex11', 'math201-t7-ex12', 'math201-t7-ex13', 'math201-t7-ex14', 'math201-t7-ex15', 'math201-t7-ex16'],
  },
];

export const math201Topics: Topic[] = buildTopicsFromGlob('math201', content, topicConfigs);
