import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import type { Subject, SubjectProgress, SubjectStatus } from '@/core/types';
import { navigateToSubject } from '@/core/router';

interface SubjectItemProps {
  subject: Subject;
  progress?: SubjectProgress;
  isActive: boolean;
}

function getStatusColor(status: SubjectStatus): string {
  switch (status) {
    case 'completed':
      return 'var(--color-status-success)';
    case 'in_progress':
      return 'var(--color-status-warning)';
    case 'not_started':
    default:
      return 'var(--color-text-muted)';
  }
}

function calculateSubjectProgress(
  subject: Subject,
  progress: SubjectProgress | undefined
): number {
  if (!progress || progress.status === 'not_started') {
    return 0;
  }
  if (progress.status === 'completed') {
    return 100;
  }

  const totalQuizzes = subject.topics.reduce((count, topic) => count + topic.quizIds.length, 0);
  const totalExercises = subject.topics.reduce((count, topic) => count + topic.exerciseIds.length, 0);
  const totalItems = totalQuizzes + totalExercises;

  if (totalItems === 0) {
    return 0;
  }

  const completedQuizzes = subject.topics.reduce((count, topic) => (
    count + topic.quizIds.filter((quizId) => progress.quizAttempts?.[quizId]?.length > 0).length
  ), 0);

  const completedExercises = subject.topics.reduce((count, topic) => (
    count + topic.exerciseIds.filter((exerciseId) => progress.exerciseCompletions?.[exerciseId]?.passed).length
  ), 0);

  return Math.round(((completedQuizzes + completedExercises) / totalItems) * 100);
}

export function SubjectItem({
  subject,
  progress,
  isActive,
}: SubjectItemProps) {
  const status = progress?.status || 'not_started';

  const progressPercent = calculateSubjectProgress(subject, progress);
  const statusColor = getStatusColor(status);

  const handleHeaderClick = useCallback((e: Event) => {
    e.preventDefault();
    navigateToSubject(subject.id);
  }, [subject.id]);

  return (
    <div class={`subject-item-new ${isActive ? 'active' : ''}`}>
      <div
        class="subject-header-new"
        onClick={handleHeaderClick}
        tabIndex={0}
        role="button"
      >
        <div class="subject-info-new">
          <div class="subject-code-new">{subject.code}</div>
          <div class="subject-title-new">{subject.title}</div>
        </div>
        {/* Progress bar at bottom of header */}
        <div
          class="subject-progress-bar"
          style={{ '--progress': `${progressPercent}%`, '--progress-color': statusColor }}
        />
      </div>
    </div>
  );
}
