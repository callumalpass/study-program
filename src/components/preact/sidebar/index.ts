export { Sidebar } from './Sidebar';
export { Nav } from './Nav';
export { SubjectList } from './SubjectList';
export { SubjectItem } from './SubjectItem';
export { TopicList } from './TopicList';
export { ProgressRing } from './ProgressRing';

import { h, render } from 'preact';
import type { Subject, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Sidebar } from './Sidebar';

/**
 * Render the Sidebar component into a DOM container.
 * This function replaces the old renderSidebar function.
 */
export function renderSidebar(
  container: HTMLElement,
  currentPath: string,
  subjects: Subject[],
  userProgress: Record<string, SubjectProgress>,
  quizzes: Quiz[],
  exercises: Exercise[],
  exams: Exam[],
  projects: Project[]
): void {
  render(
    h(Sidebar, {
      currentPath,
      subjects,
      userProgress,
      quizzes,
      exercises,
      exams,
      projects,
    }),
    container
  );
}
