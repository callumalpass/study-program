/**
 * CS104 Topics
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
    title: 'Arrays and Linked Lists',
    quizIds: ['cs104-quiz-1a', 'cs104-quiz-1b', 'cs104-quiz-1c'],
    exerciseIds: ['cs104-exercise-1', 'cs104-t1-ex02', 'cs104-t1-ex03', 'cs104-t1-ex04', 'cs104-t1-ex05', 'cs104-t1-ex06', 'cs104-t1-ex07', 'cs104-t1-ex08', 'cs104-t1-ex09', 'cs104-t1-ex10', 'cs104-t1-ex11', 'cs104-t1-ex12', 'cs104-t1-ex13', 'cs104-t1-ex14', 'cs104-t1-ex15', 'cs104-t1-ex16'],
  },
  {
    number: 2,
    title: 'Stacks and Queues',
    quizIds: ['cs104-quiz-2a', 'cs104-quiz-2b', 'cs104-quiz-2c'],
    exerciseIds: ['cs104-exercise-2', 'cs104-t2-ex02', 'cs104-t2-ex03', 'cs104-t2-ex04', 'cs104-t2-ex05', 'cs104-t2-ex06', 'cs104-t2-ex07', 'cs104-t2-ex08', 'cs104-t2-ex09', 'cs104-t2-ex10', 'cs104-t2-ex11', 'cs104-t2-ex12', 'cs104-t2-ex13', 'cs104-t2-ex14', 'cs104-t2-ex15', 'cs104-t2-ex16'],
  },
  {
    number: 3,
    title: 'Trees',
    quizIds: ['cs104-quiz-3a', 'cs104-quiz-3b', 'cs104-quiz-3c'],
    exerciseIds: ['cs104-exercise-3', 'cs104-t3-ex02', 'cs104-t3-ex03', 'cs104-t3-ex04', 'cs104-t3-ex05', 'cs104-t3-ex06', 'cs104-t3-ex07', 'cs104-t3-ex08', 'cs104-t3-ex09', 'cs104-t3-ex10', 'cs104-t3-ex11', 'cs104-t3-ex12', 'cs104-t3-ex13', 'cs104-t3-ex14', 'cs104-t3-ex15', 'cs104-t3-ex16'],
  },
  {
    number: 4,
    title: 'Hash Tables',
    quizIds: ['cs104-quiz-4a', 'cs104-quiz-4b', 'cs104-quiz-4c'],
    exerciseIds: ['cs104-exercise-4', 'cs104-t4-ex02', 'cs104-t4-ex03', 'cs104-t4-ex04', 'cs104-t4-ex05', 'cs104-t4-ex06', 'cs104-t4-ex07', 'cs104-t4-ex08', 'cs104-t4-ex09', 'cs104-t4-ex10', 'cs104-t4-ex11', 'cs104-t4-ex12', 'cs104-t4-ex13', 'cs104-t4-ex14', 'cs104-t4-ex15', 'cs104-t4-ex16'],
  },
  {
    number: 5,
    title: 'Graphs',
    quizIds: ['cs104-quiz-5a', 'cs104-quiz-5b', 'cs104-quiz-5c'],
    exerciseIds: ['cs104-exercise-5', 'cs104-t5-ex02', 'cs104-t5-ex03', 'cs104-t5-ex04', 'cs104-t5-ex05', 'cs104-t5-ex06', 'cs104-t5-ex07', 'cs104-t5-ex08', 'cs104-t5-ex09', 'cs104-t5-ex10', 'cs104-t5-ex11', 'cs104-t5-ex12', 'cs104-t5-ex13', 'cs104-t5-ex14', 'cs104-t5-ex15', 'cs104-t5-ex16'],
  },
  {
    number: 6,
    title: 'Sorting Algorithms',
    quizIds: ['cs104-quiz-6a', 'cs104-quiz-6b', 'cs104-quiz-6c'],
    exerciseIds: ['cs104-t6-ex01', 'cs104-t6-ex02', 'cs104-t6-ex03', 'cs104-t6-ex04', 'cs104-t6-ex05', 'cs104-t6-ex06', 'cs104-t6-ex07', 'cs104-t6-ex08', 'cs104-t6-ex09', 'cs104-t6-ex10', 'cs104-t6-ex11', 'cs104-t6-ex12', 'cs104-t6-ex13', 'cs104-t6-ex14', 'cs104-t6-ex15', 'cs104-t6-ex16'],
  },
  {
    number: 7,
    title: 'Heaps and Priority Queues',
    quizIds: ['cs104-quiz-7a', 'cs104-quiz-7b', 'cs104-quiz-7c'],
    exerciseIds: ['cs104-t7-ex01', 'cs104-t7-ex02', 'cs104-t7-ex03', 'cs104-t7-ex04', 'cs104-t7-ex05', 'cs104-t7-ex06', 'cs104-t7-ex07', 'cs104-t7-ex08', 'cs104-t7-ex09', 'cs104-t7-ex10', 'cs104-t7-ex11', 'cs104-t7-ex12', 'cs104-t7-ex13', 'cs104-t7-ex14', 'cs104-t7-ex15', 'cs104-t7-ex16'],
  },
];

export const cs104Topics: Topic[] = buildTopicsFromGlob('cs104', content, topicConfigs);
