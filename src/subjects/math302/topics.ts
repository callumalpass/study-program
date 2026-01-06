/**
 * MATH302 Topics
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
    title: 'First-Order Differential Equations',
    quizIds: ['math302-quiz-1-1', 'math302-quiz-1-2', 'math302-quiz-1-3'],
  },
  {
    number: 2,
    title: 'Second-Order Linear Equations',
    quizIds: ['math302-quiz-2-1', 'math302-quiz-2-2', 'math302-quiz-2-3'],
  },
  {
    number: 3,
    title: 'Higher-Order Linear Equations',
    quizIds: ['math302-quiz-3-1', 'math302-quiz-3-2', 'math302-quiz-3-3'],
  },
  {
    number: 4,
    title: 'Systems of Differential Equations',
    quizIds: ['math302-quiz-4-1', 'math302-quiz-4-2', 'math302-quiz-4-3'],
  },
  {
    number: 5,
    title: 'Laplace Transforms',
    quizIds: ['math302-quiz-5-1', 'math302-quiz-5-2', 'math302-quiz-5-3'],
  },
  {
    number: 6,
    title: 'Series Solutions',
    quizIds: ['math302-quiz-6-1', 'math302-quiz-6-2', 'math302-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Applications and Modeling',
    quizIds: ['math302-quiz-7-1', 'math302-quiz-7-2', 'math302-quiz-7-3'],
  },
];

export const math302Topics: Topic[] = buildTopicsFromGlob('math302', content, topicConfigs);
