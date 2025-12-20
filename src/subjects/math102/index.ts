/**
 * MATH102 Subject Data
 *
 * This file imports assessment data from JSON files and re-exports
 * with proper TypeScript types. Topics are still loaded from topics.ts
 * which handles the markdown content imports.
 */

import type { Quiz, Exam, Project, Exercise } from '../../core/types';
import { loadExercisesFromGlob, loadQuizzesFromGlob } from '../loader';

// Quizzes are now loaded from topic-level files
const quizModules = import.meta.glob('./content/*/quizzes.json', {
  eager: true,
  import: 'default',
}) as Record<string, Quiz[]>;
import examsData from './exams.json';
import projectsData from './projects.json';
// Exercises are now loaded from topic-level files
const exerciseModules = import.meta.glob('./content/*/exercises.json', {
  eager: true,
  import: 'default',
}) as Record<string, Exercise[]>;

export const math102Quizzes = loadQuizzesFromGlob(quizModules);
export const math102Exams = examsData as Exam[];
export const math102Projects = projectsData as Project[];
export const math102Exercises = loadExercisesFromGlob(exerciseModules);

// Topics still use TypeScript for Vite's ?raw markdown imports
export { math102Topics } from './topics';
