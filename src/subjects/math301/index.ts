/**
 * MATH301 Subject Data
 *
 * This file imports assessment data from JSON files and re-exports
 * with proper TypeScript types. Topics are still loaded from topics.ts
 * which handles the markdown content imports.
 */

import type { Quiz, Exam, Project, Exercise } from '../../core/types';

import quizzesData from './quizzes.json';
import examsData from './exams.json';
import exercisesData from './exercises.json';

export const math301Quizzes = quizzesData as Quiz[];
export const math301Exams = examsData as Exam[];
export const math301Exercises = exercisesData as Exercise[];

// Topics still use TypeScript for Vite's ?raw markdown imports
export { math301Topics } from './topics';
