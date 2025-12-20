/**
 * CS302 Subject Data
 *
 * This file imports assessment data from JSON files and re-exports
 * with proper TypeScript types. Topics are still loaded from topics.ts
 * which handles the markdown content imports.
 */

import type { Quiz, Exam, Project, Exercise } from '../../core/types';

import quizzesData from './quizzes.json';
import examsData from './exams.json';
import projectsData from './projects.json';
import exercisesData from './exercises.json';

export const cs302Quizzes = quizzesData as Quiz[];
export const cs302Exams = examsData as Exam[];
export const cs302Projects = projectsData as Project[];
export const cs302Exercises = exercisesData as Exercise[];

// Topics still use TypeScript for Vite's ?raw markdown imports
export { cs302Topics } from './topics';
