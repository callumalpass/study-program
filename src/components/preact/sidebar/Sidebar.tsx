import { h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import type { Subject, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Icons } from '@/components/icons';
import { Nav } from './Nav';
import { SubjectList } from './SubjectList';

interface SidebarProps {
  currentPath: string;
  subjects: Subject[];
  userProgress: Record<string, SubjectProgress>;
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
}

export function Sidebar({
  currentPath,
  subjects,
  userProgress,
  quizzes,
  exercises,
  exams,
  projects,
}: SidebarProps) {
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  // Auto-expand subject based on current route
  useEffect(() => {
    const subjectMatch = currentPath.match(/\/subject\/([^/]+)/);
    if (subjectMatch) {
      const subjectId = subjectMatch[1];
      setExpandedSubjectId(subjectId);
    }
  }, [currentPath]);

  const handleExpandSubject = useCallback((subjectId: string | null) => {
    setExpandedSubjectId(subjectId);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard navigation when sidebar has focus
      const sidebar = document.querySelector('.sidebar');
      if (!sidebar?.contains(document.activeElement)) {
        return;
      }

      if (e.key === 'Escape' && expandedSubjectId) {
        e.preventDefault();
        setExpandedSubjectId(null);
        // Focus back to the subject header
        const subjectEl = document.querySelector(
          `.subject-item-new.expanded .subject-header-new`
        ) as HTMLElement;
        subjectEl?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedSubjectId]);

  return (
    <div class="sidebar-content">
      {/* Header with logo */}
      <div class="sidebar-header">
        <a href="#/" class="sidebar-logo">
          <span class="logo-icon" dangerouslySetInnerHTML={{ __html: Icons.Logo }} />
          <span class="logo-text">CS Degree</span>
        </a>
      </div>

      {/* Navigation links */}
      <Nav currentPath={currentPath} />

      {/* Subjects section */}
      <div class="subjects-section">
        <div class="subjects-header">Subjects</div>
        <SubjectList
          subjects={subjects}
          userProgress={userProgress}
          currentPath={currentPath}
          expandedSubjectId={expandedSubjectId}
          onExpandSubject={handleExpandSubject}
          quizzes={quizzes}
          exercises={exercises}
          exams={exams}
          projects={projects}
        />
      </div>
    </div>
  );
}
