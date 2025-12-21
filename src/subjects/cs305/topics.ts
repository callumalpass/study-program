/**
 * CS305 Topics
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
    title: 'HTML Fundamentals',
    quizIds: quizIdsByTopic[1] ?? [],
    exerciseIds: exerciseIdsByTopic[1] ?? [],
  },
  {
    number: 2,
    title: 'CSS Fundamentals',
    quizIds: quizIdsByTopic[2] ?? [],
    exerciseIds: exerciseIdsByTopic[2] ?? [],
  },
  {
    number: 3,
    title: 'JavaScript Fundamentals',
    quizIds: quizIdsByTopic[3] ?? [],
    exerciseIds: exerciseIdsByTopic[3] ?? [],
  },
  {
    number: 4,
    title: 'DOM Manipulation',
    quizIds: quizIdsByTopic[4] ?? [],
    exerciseIds: exerciseIdsByTopic[4] ?? [],
  },
  {
    number: 5,
    title: 'Responsive Design',
    quizIds: quizIdsByTopic[5] ?? [],
    exerciseIds: exerciseIdsByTopic[5] ?? [],
  },
  {
    number: 6,
    title: 'Asynchronous JavaScript',
    quizIds: quizIdsByTopic[6] ?? [],
    exerciseIds: exerciseIdsByTopic[6] ?? [],
  },
  {
    number: 7,
    title: 'Modern Web Development',
    quizIds: quizIdsByTopic[7] ?? [],
    exerciseIds: exerciseIdsByTopic[7] ?? [],
  },
];

export const cs305Topics: Topic[] = buildTopicsFromGlob('cs305', content, topicConfigs);
