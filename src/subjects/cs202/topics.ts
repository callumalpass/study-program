/**
 * CS202 Topics
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
    title: 'Instruction Set Architecture',
    quizIds: ['cs202-topic1-quiz1', 'cs202-topic1-quiz2', 'cs202-topic1-quiz3'],
    exerciseIds: ['cs202-t1-ex1', 'cs202-t1-ex2', 'cs202-t1-ex3', 'cs202-t1-ex4', 'cs202-t1-ex5', 'cs202-t1-ex6', 'cs202-t1-ex7', 'cs202-t1-ex8', 'cs202-t1-ex9', 'cs202-t1-ex10', 'cs202-t1-ex11', 'cs202-t1-ex12', 'cs202-t1-ex13', 'cs202-t1-ex14', 'cs202-t1-ex15', 'cs202-t1-ex16'],
  },
  {
    number: 2,
    title: 'Assembly Language Programming',
    quizIds: ['cs202-topic2-quiz1', 'cs202-topic2-quiz2', 'cs202-topic2-quiz3'],
    exerciseIds: ['cs202-t2-ex1', 'cs202-t2-ex2', 'cs202-t2-ex3', 'cs202-t2-ex4', 'cs202-t2-ex5', 'cs202-t2-ex6', 'cs202-t2-ex7', 'cs202-t2-ex8', 'cs202-t2-ex9', 'cs202-t2-ex10', 'cs202-t2-ex11', 'cs202-t2-ex12', 'cs202-t2-ex13', 'cs202-t2-ex14', 'cs202-t2-ex15', 'cs202-t2-ex16'],
  },
  {
    number: 3,
    title: 'CPU Datapath and Control',
    quizIds: ['cs202-topic3-quiz1', 'cs202-topic3-quiz2', 'cs202-topic3-quiz3'],
    exerciseIds: ['cs202-t3-ex1', 'cs202-t3-ex2', 'cs202-t3-ex3', 'cs202-t3-ex4', 'cs202-t3-ex5', 'cs202-t3-ex6', 'cs202-t3-ex7', 'cs202-t3-ex8', 'cs202-t3-ex9', 'cs202-t3-ex10', 'cs202-t3-ex11', 'cs202-t3-ex12', 'cs202-t3-ex13', 'cs202-t3-ex14', 'cs202-t3-ex15', 'cs202-t3-ex16'],
  },
  {
    number: 4,
    title: 'Pipelining',
    quizIds: ['cs202-topic4-quiz1', 'cs202-topic4-quiz2', 'cs202-topic4-quiz3'],
    exerciseIds: ['cs202-t4-ex1', 'cs202-t4-ex2', 'cs202-t4-ex3', 'cs202-t4-ex4', 'cs202-t4-ex5', 'cs202-t4-ex6', 'cs202-t4-ex7', 'cs202-t4-ex8', 'cs202-t4-ex9', 'cs202-t4-ex10', 'cs202-t4-ex11', 'cs202-t4-ex12', 'cs202-t4-ex13', 'cs202-t4-ex14', 'cs202-t4-ex15', 'cs202-t4-ex16'],
  },
  {
    number: 5,
    title: 'Cache Memory',
    quizIds: ['cs202-topic5-quiz1', 'cs202-topic5-quiz2', 'cs202-topic5-quiz3'],
    exerciseIds: ['cs202-t5-ex1', 'cs202-t5-ex2', 'cs202-t5-ex3', 'cs202-t5-ex4', 'cs202-t5-ex5', 'cs202-t5-ex6', 'cs202-t5-ex7', 'cs202-t5-ex8', 'cs202-t5-ex9', 'cs202-t5-ex10', 'cs202-t5-ex11', 'cs202-t5-ex12', 'cs202-t5-ex13', 'cs202-t5-ex14', 'cs202-t5-ex15', 'cs202-t5-ex16'],
  },
  {
    number: 6,
    title: 'Memory Hierarchy',
    quizIds: ['cs202-topic6-quiz1', 'cs202-topic6-quiz2', 'cs202-topic6-quiz3'],
    exerciseIds: ['cs202-t6-ex1', 'cs202-t6-ex2', 'cs202-t6-ex3', 'cs202-t6-ex4', 'cs202-t6-ex5', 'cs202-t6-ex6', 'cs202-t6-ex7', 'cs202-t6-ex8', 'cs202-t6-ex9', 'cs202-t6-ex10', 'cs202-t6-ex11', 'cs202-t6-ex12', 'cs202-t6-ex13', 'cs202-t6-ex14', 'cs202-t6-ex15', 'cs202-t6-ex16'],
  },
  {
    number: 7,
    title: 'Instruction-Level Parallelism',
    quizIds: ['cs202-topic7-quiz1', 'cs202-topic7-quiz2', 'cs202-topic7-quiz3'],
    exerciseIds: ['cs202-t7-ex1', 'cs202-t7-ex2', 'cs202-t7-ex3', 'cs202-t7-ex4', 'cs202-t7-ex5', 'cs202-t7-ex6', 'cs202-t7-ex7', 'cs202-t7-ex8', 'cs202-t7-ex9', 'cs202-t7-ex10', 'cs202-t7-ex11', 'cs202-t7-ex12', 'cs202-t7-ex13', 'cs202-t7-ex14', 'cs202-t7-ex15', 'cs202-t7-ex16'],
  },
];

export const cs202Topics: Topic[] = buildTopicsFromGlob('cs202', content, topicConfigs);
