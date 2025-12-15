import { h } from 'preact';
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
  // Keep unused props for now (exams/projects) to avoid churn in call sites.
  void exams;
  void projects;

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
          quizzes={quizzes}
          exercises={exercises}
        />
      </div>
    </div>
  );
}
