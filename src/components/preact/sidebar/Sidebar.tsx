import { h } from 'preact';
import type { Subject, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Icons } from '@/components/icons';
import { Mascots } from '@/components/mascots';
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

// Determine which mascot to show based on current route
function getMascotForPath(path: string): string {
  // Reading content (subtopic pages)
  if (path.match(/\/subject\/[^/]+\/topic\/[^/]+\/.+/)) {
    return Mascots.Reading;
  }
  // Quiz or exercise (thinking/answering)
  if (path.includes('/quiz/') || path.includes('/exercise/')) {
    return Mascots.Pondering;
  }
  // Progress page (zen/reflection)
  if (path.includes('/progress')) {
    return Mascots.Zen;
  }
  // Default
  return Mascots.Pensive;
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

  const currentMascot = getMascotForPath(currentPath);

  return (
    <div class="sidebar-content">
      {/* Header with logo */}
      <div class="sidebar-header">
        <a href="#/" class="sidebar-logo" title="study program">
          <span class="logo-icon" dangerouslySetInnerHTML={{ __html: currentMascot }} />
          <span class="logo-text">stup</span>
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
