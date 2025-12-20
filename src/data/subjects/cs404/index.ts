/**
 * CS404 Subject Data
 *
 * This file imports assessment data from JSON files and re-exports
 * with proper TypeScript types. Topics are still loaded from topics.ts
 * which handles the markdown content imports.
 */

import type { Quiz, Exam, Project, Exercise } from '../../../core/types';

import quizzesData from './quizzes.json';
import examsData from './exams.json';
import projectsData from './projects.json';

export const cs404Quizzes = quizzesData as Quiz[];
export const cs404Exams = examsData as Exam[];
export const cs404Projects = projectsData as Project[];

// Topics still use TypeScript for Vite's ?raw markdown imports
export { cs404Topics } from './topics';
