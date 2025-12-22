import { h } from 'preact';
import type { Subject, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Icons } from '@/components/icons';
import { Nav } from './Nav';
import { SubjectList } from './SubjectList';
import { InteractiveMascot, MascotMood } from '../InteractiveMascot';

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
function getMascotForPath(path: string, exercises: Exercise[]): MascotMood {
  // Reading content (subtopic pages)
  if (path.match(/\/subject\/[^/]+\/topic\/[^/]+\/.+/)) {
    return 'Reading';
  }

  // Exercise handling
  if (path.includes('/exercise/')) {
    const match = path.match(/\/exercise\/([^/?]+)/);
    if (match && match[1]) {
      const exerciseId = match[1];
      const exercise = exercises.find(e => e.id === exerciseId);
      
      // If hard exercise (difficulty 4 or 5), show Confused mascot
      if (exercise && exercise.difficulty && exercise.difficulty >= 4) {
        return 'Confused';
      }
    }
    return 'Pondering';
  }

  // Quiz (thinking/answering)
  if (path.includes('/quiz/')) {
    return 'Pondering';
  }

  // Exams (high stakes/surprise)
  if (path.includes('/exam/')) {
    return 'Shocked';
  }

  // Settings (maintenance/idle)
  if (path.includes('/settings')) {
    return 'Sleeping';
  }

  // Progress page (zen/reflection)
  if (path.includes('/progress')) {
    return 'Zen';
  }
  // Default
  return 'Pensive';
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

  const currentMascot = getMascotForPath(currentPath, exercises);

  return (
    <div class="sidebar-content">
      {/* Header with logo */}
      <div class="sidebar-header">
        <a href="#/" class="sidebar-logo" title="study program">
          <span class="logo-icon">
            <InteractiveMascot mood={currentMascot} size={64} />
          </span>
          <span class="logo-text">stu.p</span>
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
