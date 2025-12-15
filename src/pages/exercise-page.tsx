// Exercise page rendering with Preact components
import { h } from 'preact';
import { render } from 'preact';
import type { Subject, Exercise, Quiz, Exam, Project } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { ExercisePage, ContentNavigator } from '@/components/preact';
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
  exerciseId: string,
  quizzes: Quiz[] = [],
  exams: Exam[] = [],
  projects: Project[] = []
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

  // Get progress for the sidebar
  const userProgress = progressStorage.getProgress();
  const subjectProgress = userProgress.subjects[subjectId];

  // Clear container and render Preact component wrapped in ContentNavigator
  // Key prop ensures Preact creates a new component instance on navigation
  container.innerHTML = '';
  render(
    <ContentNavigator
      key={exerciseId}
      subject={subject}
      currentTopicId={exercise.topicId}
      progress={subjectProgress}
      progressStatus={subjectProgress?.status || 'not_started'}
      quizzes={quizzes}
      exercises={exercises}
      exams={exams}
      projects={projects}
      currentPracticeId={exerciseId}
      onSubtopicView={() => {}}
    >
      <ExercisePage
        subject={subject}
        exercise={exercise}
        prevExercise={prev}
        nextExercise={next}
        currentIndex={currentIndex}
        totalExercises={topicExercises.length}
      />
    </ContentNavigator>,
    container
  );
}
