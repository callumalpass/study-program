import { h } from 'preact';
import type { Subject, SubjectProgress } from '@/core/types';
import { Nav } from './Nav';
import { SubjectList } from './SubjectList';
import { InteractiveMascot } from '../InteractiveMascot';
import { getMascotForPath } from '../mascotMood';

interface SidebarProps {
  currentPath: string;
  subjects: Subject[];
  userProgress: Record<string, SubjectProgress>;
}

export function Sidebar({
  currentPath,
  subjects,
  userProgress,
}: SidebarProps) {
  const currentMascot = getMascotForPath(currentPath);

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
        />
      </div>
    </div>
  );
}
