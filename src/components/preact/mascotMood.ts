import type { Exercise } from '@/core/types';
import type { MascotMood } from './InteractiveMascot';

// Determine which mascot to show based on current route.
export function getMascotForPath(path: string, exercises: Exercise[]): MascotMood {
  // Reading content (subtopic pages)
  if (path.match(/\/subject\/[^/]+\/topic\/[^/]+\/.+/)) {
    return 'Reading';
  }

  // Exercise handling
  if (path.includes('/exercise/')) {
    const match = path.match(/\/exercise\/([^/?]+)/);
    if (match && match[1]) {
      const exerciseId = match[1];
      const exercise = exercises.find((exerciseItem) => exerciseItem.id === exerciseId);

      // If hard exercise (difficulty 4 or 5), show Confused mascot
      if (exercise && exercise.difficulty && exercise.difficulty >= 4) {
        return 'Confused';
      }
    }
    return 'Pondering';
  }

  // Quiz (thinking/answering)
  if (path.includes('/quiz/')) {
    return 'Pondering';
  }

  // Exams (high stakes/surprise)
  if (path.includes('/exam/')) {
    return 'Shocked';
  }

  // Settings (maintenance/idle)
  if (path.includes('/settings')) {
    return 'Sleeping';
  }

  // Progress page (zen/reflection)
  if (path.includes('/progress')) {
    return 'Zen';
  }

  // Default
  return 'Pensive';
}
