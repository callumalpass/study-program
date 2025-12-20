/**
 * CS204 Topics
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
    title: 'Software Development Lifecycle',
    quizIds: ['cs204-topic-1-quiz-1', 'cs204-topic-1-quiz-2', 'cs204-topic-1-quiz-3'],
    exerciseIds: ['cs204-t1-ex1', 'cs204-t1-ex2', 'cs204-t1-ex3', 'cs204-t1-ex4', 'cs204-t1-ex5', 'cs204-t1-ex6', 'cs204-t1-ex7', 'cs204-t1-ex8', 'cs204-t1-ex9', 'cs204-t1-ex10', 'cs204-t1-ex11', 'cs204-t1-ex12', 'cs204-t1-ex13', 'cs204-t1-ex14', 'cs204-t1-ex15', 'cs204-t1-ex16'],
  },
  {
    number: 2,
    title: 'Requirements Engineering',
    quizIds: ['cs204-topic-2-quiz-1', 'cs204-topic-2-quiz-2', 'cs204-topic-2-quiz-3'],
    exerciseIds: ['cs204-t2-ex1', 'cs204-t2-ex2', 'cs204-t2-ex3', 'cs204-t2-ex4', 'cs204-t2-ex5', 'cs204-t2-ex6', 'cs204-t2-ex7', 'cs204-t2-ex8', 'cs204-t2-ex9', 'cs204-t2-ex10', 'cs204-t2-ex11', 'cs204-t2-ex12', 'cs204-t2-ex13', 'cs204-t2-ex14', 'cs204-t2-ex15', 'cs204-t2-ex16'],
  },
  {
    number: 3,
    title: 'Software Design and UML',
    quizIds: ['cs204-topic-3-quiz-1', 'cs204-topic-3-quiz-2', 'cs204-topic-3-quiz-3'],
    exerciseIds: ['cs204-t3-ex1', 'cs204-t3-ex2', 'cs204-t3-ex3', 'cs204-t3-ex4', 'cs204-t3-ex5', 'cs204-t3-ex6', 'cs204-t3-ex7', 'cs204-t3-ex8', 'cs204-t3-ex9', 'cs204-t3-ex10', 'cs204-t3-ex11', 'cs204-t3-ex12', 'cs204-t3-ex13', 'cs204-t3-ex14', 'cs204-t3-ex15', 'cs204-t3-ex16'],
  },
  {
    number: 4,
    title: 'Design Patterns',
    quizIds: ['cs204-topic-4-quiz-1', 'cs204-topic-4-quiz-2', 'cs204-topic-4-quiz-3'],
    exerciseIds: ['cs204-t4-ex1', 'cs204-t4-ex2', 'cs204-t4-ex3', 'cs204-t4-ex4', 'cs204-t4-ex5', 'cs204-t4-ex6', 'cs204-t4-ex7', 'cs204-t4-ex8', 'cs204-t4-ex9', 'cs204-t4-ex10', 'cs204-t4-ex11', 'cs204-t4-ex12', 'cs204-t4-ex13', 'cs204-t4-ex14', 'cs204-t4-ex15', 'cs204-t4-ex16'],
  },
  {
    number: 5,
    title: 'Testing Strategies',
    quizIds: ['cs204-topic-5-quiz-1', 'cs204-topic-5-quiz-2', 'cs204-topic-5-quiz-3'],
    exerciseIds: ['cs204-t5-ex1', 'cs204-t5-ex2', 'cs204-t5-ex3', 'cs204-t5-ex4', 'cs204-t5-ex5', 'cs204-t5-ex6', 'cs204-t5-ex7', 'cs204-t5-ex8', 'cs204-t5-ex9', 'cs204-t5-ex10', 'cs204-t5-ex11', 'cs204-t5-ex12', 'cs204-t5-ex13', 'cs204-t5-ex14', 'cs204-t5-ex15', 'cs204-t5-ex16'],
  },
  {
    number: 6,
    title: 'Version Control and CI/CD',
    quizIds: ['cs204-topic-6-quiz-1', 'cs204-topic-6-quiz-2', 'cs204-topic-6-quiz-3'],
    exerciseIds: ['cs204-t6-ex1', 'cs204-t6-ex2', 'cs204-t6-ex3', 'cs204-t6-ex4', 'cs204-t6-ex5', 'cs204-t6-ex6', 'cs204-t6-ex7', 'cs204-t6-ex8', 'cs204-t6-ex9', 'cs204-t6-ex10', 'cs204-t6-ex11', 'cs204-t6-ex12', 'cs204-t6-ex13', 'cs204-t6-ex14', 'cs204-t6-ex15', 'cs204-t6-ex16'],
  },
  {
    number: 7,
    title: 'Agile Development',
    quizIds: ['cs204-topic-7-quiz-1', 'cs204-topic-7-quiz-2', 'cs204-topic-7-quiz-3'],
    exerciseIds: ['cs204-t7-ex1', 'cs204-t7-ex2', 'cs204-t7-ex3', 'cs204-t7-ex4', 'cs204-t7-ex5', 'cs204-t7-ex6', 'cs204-t7-ex7', 'cs204-t7-ex8', 'cs204-t7-ex9', 'cs204-t7-ex10', 'cs204-t7-ex11', 'cs204-t7-ex12', 'cs204-t7-ex13', 'cs204-t7-ex14', 'cs204-t7-ex15', 'cs204-t7-ex16'],
  },
];

export const cs204Topics: Topic[] = buildTopicsFromGlob('cs204', content, topicConfigs);
