/**
 * CS303 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic, Quiz, Exercise } from '../../core/types';
import {
  buildTopicsFromGlob,
  loadExercisesFromGlob,
  loadQuizzesFromGlob,
  groupIdsByTopic,
} from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const quizModules = import.meta.glob('./content/*/quizzes.json', {
  eager: true,
  import: 'default',
}) as Record<string, Quiz[]>;

const exerciseModules = import.meta.glob('./content/*/exercises.json', {
  eager: true,
  import: 'default',
}) as Record<string, Exercise[]>;

const quizIdsByTopic = groupIdsByTopic(loadQuizzesFromGlob(quizModules));
const exerciseIdsByTopic = groupIdsByTopic(loadExercisesFromGlob(exerciseModules));

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'Programming Paradigms',
    quizIds: quizIdsByTopic[1] ?? [],
    exerciseIds: exerciseIdsByTopic[1] ?? [],
  },
  {
    number: 2,
    title: 'Type Systems',
    quizIds: quizIdsByTopic[2] ?? [],
    exerciseIds: exerciseIdsByTopic[2] ?? [],
  },
  {
    number: 3,
    title: 'Functional Programming',
    quizIds: quizIdsByTopic[3] ?? [],
    exerciseIds: exerciseIdsByTopic[3] ?? [],
  },
  {
    number: 4,
    title: 'Formal Semantics',
    quizIds: quizIdsByTopic[4] ?? [],
    exerciseIds: exerciseIdsByTopic[4] ?? [],
  },
  {
    number: 5,
    title: 'Interpreters',
    quizIds: quizIdsByTopic[5] ?? [],
    exerciseIds: exerciseIdsByTopic[5] ?? [],
  },
  {
    number: 6,
    title: 'Memory Management',
    quizIds: quizIdsByTopic[6] ?? [],
    exerciseIds: exerciseIdsByTopic[6] ?? [],
  },
  {
    number: 7,
    title: 'Advanced Language Features',
    quizIds: quizIdsByTopic[7] ?? [],
    exerciseIds: exerciseIdsByTopic[7] ?? [],
  },
];

export const cs303Topics: Topic[] = buildTopicsFromGlob('cs303', content, topicConfigs);
