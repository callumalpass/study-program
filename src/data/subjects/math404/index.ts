/**
 * MATH404 Subject Data
 *
 * This file imports assessment data from JSON files and re-exports
 * with proper TypeScript types. Topics are still loaded from topics.ts
 * which handles the markdown content imports.
 */

import type { Quiz, Exam, Exercise, Topic } from '../../../core/types';

import quizzesData from './quizzes.json';
import examsData from './exams.json';
import exercisesData from './exercises.json';
import { topics } from './topics';

export const math404Quizzes = quizzesData as Quiz[];
export const math404Exams = examsData as Exam[];
export const math404Exercises = exercisesData as Exercise[];
export const math404Topics: Topic[] = topics;
