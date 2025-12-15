// Exam page rendering with Preact components
import { h } from 'preact';
import { render } from 'preact';
import type { Subject, Exam } from '@/core/types';
import { ExamPage } from '@/components/preact';
import { renderNotFound } from './assessment-utils';

/**
 * Render exam page
 */
export function renderExamPage(
  container: HTMLElement,
  subjects: Subject[],
  exams: Exam[],
  subjectId: string,
  examId: string
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const exam = exams.find(e => e.id === examId);

  if (!subject || !exam) {
    renderNotFound(container, 'Exam', subjectId);
    return;
  }

  // Clear container and render Preact component
  // Key prop ensures Preact creates a new component instance on navigation
  container.innerHTML = '';
  render(
    <ExamPage key={examId} subject={subject} exam={exam} />,
    container
  );
}
