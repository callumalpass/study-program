/**
 * Backwards-compatible assessment exports.
 *
 * The v2 source of truth is the bundled content pack. This module keeps the old
 * aggregate names for pages and tests while removing per-subject TypeScript
 * imports.
 */

export {
  bundledQuizzes as allQuizzes,
  bundledExercises as allExercises,
  bundledExams as allExams,
  bundledProjects as allProjects,
} from '@/content-core/bundled-pack';
