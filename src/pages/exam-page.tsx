// Exam page rendering with Preact components
import { h } from 'preact';
import { render } from 'preact';
import type { Subject, Exam, Quiz, Exercise, Project } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { ExamPage, ContentNavigator } from '@/components/preact';
import { renderNotFound } from './assessment-utils';

/**
 * Render exam page
 */
export function renderExamPage(
  container: HTMLElement,
  subjects: Subject[],
  exams: Exam[],
  subjectId: string,
  examId: string,
  quizzes: Quiz[] = [],
  exercises: Exercise[] = [],
  projects: Project[] = []
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const exam = exams.find(e => e.id === examId);

  if (!subject || !exam) {
    renderNotFound(container, 'Exam', subjectId);
    return;
  }

  // Get progress for the sidebar
  const userProgress = progressStorage.getProgress();
  const subjectProgress = userProgress.subjects[subjectId];

  // Clear container and render Preact component wrapped in ContentNavigator
  // Key prop ensures Preact creates a new component instance on navigation
  container.innerHTML = '';
  render(
    <ContentNavigator
      key={examId}
      subject={subject}
      currentTopicId={exam.topicId}
      progress={subjectProgress}
      progressStatus={subjectProgress?.status || 'not_started'}
      quizzes={quizzes}
      exercises={exercises}
      exams={exams}
      projects={projects}
      currentPracticeId={examId}
      onSubtopicView={() => {}}
    >
      <ExamPage subject={subject} exam={exam} />
    </ContentNavigator>,
    container
  );
}
