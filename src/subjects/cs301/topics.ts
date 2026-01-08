/**
 * CS301 Topics
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
    title: 'Process Management',
    quizIds: ['cs301-q1-1', 'cs301-q1-2', 'cs301-q1-3'],
    exerciseIds: ['cs301-ex-1-1', 'cs301-ex-1-2', 'cs301-ex-1-3', 'cs301-ex-1-4', 'cs301-ex-1-5', 'cs301-ex-1-6', 'cs301-ex-1-7', 'cs301-ex-1-8', 'cs301-ex-1-9', 'cs301-ex-1-10', 'cs301-ex-1-11', 'cs301-ex-1-12', 'cs301-ex-1-13', 'cs301-ex-1-14', 'cs301-ex-1-15', 'cs301-ex-1-16'],
  },
  {
    number: 2,
    title: 'Threads and Concurrency',
    quizIds: ['cs301-q2-1', 'cs301-q2-2', 'cs301-q2-3'],
    exerciseIds: ['cs301-ex-2-1', 'cs301-ex-2-2', 'cs301-ex-2-3', 'cs301-ex-2-4', 'cs301-ex-2-5', 'cs301-ex-2-6', 'cs301-ex-2-7', 'cs301-ex-2-8', 'cs301-ex-2-9', 'cs301-ex-2-10', 'cs301-ex-2-11', 'cs301-ex-2-12', 'cs301-ex-2-13', 'cs301-ex-2-14', 'cs301-ex-2-15', 'cs301-ex-2-16'],
  },
  {
    number: 3,
    title: 'CPU Scheduling',
    quizIds: ['cs301-q3-1', 'cs301-q3-2', 'cs301-q3-3'],
    exerciseIds: ['cs301-ex-3-1', 'cs301-ex-3-2', 'cs301-ex-3-3', 'cs301-ex-3-4', 'cs301-ex-3-5', 'cs301-ex-3-6', 'cs301-ex-3-7', 'cs301-ex-3-8', 'cs301-ex-3-9', 'cs301-ex-3-10', 'cs301-ex-3-11', 'cs301-ex-3-12', 'cs301-ex-3-13', 'cs301-ex-3-14', 'cs301-ex-3-15', 'cs301-ex-3-16'],
  },
  {
    number: 4,
    title: 'Synchronization',
    quizIds: ['cs301-q4-1', 'cs301-q4-2', 'cs301-q4-3'],
    exerciseIds: ['cs301-ex-4-1', 'cs301-ex-4-2', 'cs301-ex-4-3', 'cs301-ex-4-4', 'cs301-ex-4-5', 'cs301-ex-4-6', 'cs301-ex-4-7', 'cs301-ex-4-8', 'cs301-ex-4-9', 'cs301-ex-4-10', 'cs301-ex-4-11', 'cs301-ex-4-12', 'cs301-ex-4-13', 'cs301-ex-4-14', 'cs301-ex-4-15', 'cs301-ex-4-16'],
  },
  {
    number: 5,
    title: 'Deadlock',
    quizIds: ['cs301-q5-1', 'cs301-q5-2', 'cs301-q5-3'],
    exerciseIds: ['cs301-ex-5-1', 'cs301-ex-5-2', 'cs301-ex-5-3', 'cs301-ex-5-4', 'cs301-ex-5-5', 'cs301-ex-5-6', 'cs301-ex-5-7', 'cs301-ex-5-8', 'cs301-ex-5-9', 'cs301-ex-5-10', 'cs301-ex-5-11', 'cs301-ex-5-12', 'cs301-ex-5-13', 'cs301-ex-5-14', 'cs301-ex-5-15', 'cs301-ex-5-16'],
  },
  {
    number: 6,
    title: 'Memory Management',
    quizIds: ['cs301-q6-1', 'cs301-q6-2', 'cs301-q6-3'],
    exerciseIds: ['cs301-ex-6-1', 'cs301-ex-6-2', 'cs301-ex-6-3', 'cs301-ex-6-4', 'cs301-ex-6-5', 'cs301-ex-6-6', 'cs301-ex-6-7', 'cs301-ex-6-8', 'cs301-ex-6-9', 'cs301-ex-6-10', 'cs301-ex-6-11', 'cs301-ex-6-12', 'cs301-ex-6-13', 'cs301-ex-6-14', 'cs301-ex-6-15', 'cs301-ex-6-16'],
  },
  {
    number: 7,
    title: 'Virtual Memory and File Systems',
    quizIds: ['cs301-q7-1', 'cs301-q7-2', 'cs301-q7-3'],
    exerciseIds: ['cs301-ex-7-1', 'cs301-ex-7-2', 'cs301-ex-7-3', 'cs301-ex-7-4', 'cs301-ex-7-5', 'cs301-ex-7-6', 'cs301-ex-7-7', 'cs301-ex-7-8', 'cs301-ex-7-9', 'cs301-ex-7-10', 'cs301-ex-7-11', 'cs301-ex-7-12', 'cs301-ex-7-13', 'cs301-ex-7-14', 'cs301-ex-7-15', 'cs301-ex-7-16'],
  },
];

export const cs301Topics: Topic[] = buildTopicsFromGlob('cs301', content, topicConfigs);
