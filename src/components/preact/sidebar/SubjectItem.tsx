import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import type { Subject, SubjectProgress, SubjectStatus, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Icons } from '@/components/icons';
import { navigateToSubject } from '@/core/router';
import { TopicList } from './TopicList';

interface SubjectItemProps {
  subject: Subject;
  progress?: SubjectProgress;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
  currentPath: string;
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
  progress: SubjectProgress | undefined,
  subjectQuizzes: Quiz[],
  subjectExercises: Exercise[]
): number {
  if (!progress || progress.status === 'not_started') {
    return 0;
  }
  if (progress.status === 'completed') {
    return 100;
  }

  const totalQuizzes = subjectQuizzes.length;
  const totalExercises = subjectExercises.length;
  const totalItems = totalQuizzes + totalExercises;

  if (totalItems === 0) {
    return 0;
  }

  // Count completed quizzes that belong to this subject
  const completedQuizzes = subjectQuizzes.filter(
    (q) => progress.quizAttempts?.[q.id]?.length > 0
  ).length;

  // Count completed exercises that belong to this subject
  const completedExercises = subjectExercises.filter(
    (e) => progress.exerciseCompletions?.[e.id]?.passed
  ).length;

  return Math.round(((completedQuizzes + completedExercises) / totalItems) * 100);
}

export function SubjectItem({
  subject,
  progress,
  isActive,
  isExpanded,
  onToggle,
  quizzes,
  exercises,
  exams,
  projects,
  currentPath,
}: SubjectItemProps) {
  const status = progress?.status || 'not_started';

  // Filter quizzes and exercises for this subject
  const subjectQuizzes = quizzes.filter((q) => q.subjectId === subject.id);
  const subjectExercises = exercises.filter((e) => e.subjectId === subject.id);

  const progressPercent = calculateSubjectProgress(subject, progress, subjectQuizzes, subjectExercises);
  const statusColor = getStatusColor(status);

  const handleHeaderClick = useCallback((e: Event) => {
    e.preventDefault();
    if (isActive) {
      onToggle();
    } else {
      navigateToSubject(subject.id);
    }
  }, [subject.id, isActive, onToggle]);

  const handleExpandClick = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  }, [onToggle]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  }, [onToggle]);

  return (
    <div class={`subject-item-new ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
      <div
        class="subject-header-new"
        onClick={handleHeaderClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <div class="subject-info-new">
          <div class="subject-code-new">{subject.code}</div>
          <div class="subject-title-new">{subject.title}</div>
        </div>
        <button
          class={`expand-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={handleExpandClick}
          aria-label={isExpanded ? 'Collapse subject' : 'Expand subject'}
          tabIndex={-1}
        >
          <span dangerouslySetInnerHTML={{ __html: Icons.ChevronDown }} />
        </button>
        {/* Progress bar at bottom of header */}
        <div
          class="subject-progress-bar"
          style={{ '--progress': `${progressPercent}%`, '--progress-color': statusColor } as any}
        />
      </div>

      <div class={`topic-list ${isExpanded ? 'expanded' : ''}`}>
        {isExpanded && (
          <TopicList
            subject={subject}
            progress={progress}
            quizzes={quizzes}
            exercises={exercises}
            exams={exams}
            projects={projects}
            currentPath={currentPath}
          />
        )}
      </div>
    </div>
  );
}
