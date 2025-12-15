// Exercise page rendering with Preact components
import { h } from 'preact';
import { render } from 'preact';
import type { Subject, Exercise } from '@/core/types';
import { Icons } from '@/components/icons';
import { ExercisePage } from '@/components/preact';
import { renderNotFound } from './assessment-utils';

// Helper to find adjacent exercises within the same topic
function findAdjacentExercises(
  exercises: Exercise[],
  currentExerciseId: string,
  subjectId: string
): { prev: Exercise | null; next: Exercise | null; current: Exercise | null; topicExercises: Exercise[] } {
  const currentExercise = exercises.find(e => e.id === currentExerciseId);
  if (!currentExercise) {
    return { prev: null, next: null, current: null, topicExercises: [] };
  }

  // Get all exercises for this topic in order
  const topicExercises = exercises.filter(
    e => e.subjectId === subjectId && e.topicId === currentExercise.topicId
  );

  const currentIndex = topicExercises.findIndex(e => e.id === currentExerciseId);

  return {
    prev: currentIndex > 0 ? topicExercises[currentIndex - 1] : null,
    next: currentIndex < topicExercises.length - 1 ? topicExercises[currentIndex + 1] : null,
    current: currentExercise,
    topicExercises
  };
}

/**
 * Render exercise page
 */
export function renderExercisePage(
  container: HTMLElement,
  subjects: Subject[],
  exercises: Exercise[],
  subjectId: string,
  exerciseId: string
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const exercise = exercises.find(e => e.id === exerciseId);

  if (!subject || !exercise) {
    renderNotFound(container, 'Exercise', subjectId);
    return;
  }

  // Find adjacent exercises for navigation
  const { prev, next, topicExercises } = findAdjacentExercises(exercises, exerciseId, subjectId);
  const currentIndex = topicExercises.findIndex(e => e.id === exerciseId);

  // Clear container and render Preact component
  container.innerHTML = '';
  render(
    <ExercisePage
      subject={subject}
      exercise={exercise}
      prevExercise={prev}
      nextExercise={next}
      currentIndex={currentIndex}
      totalExercises={topicExercises.length}
    />,
    container
  );
}
