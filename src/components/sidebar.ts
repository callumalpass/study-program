import type { Subject, SubjectProgress, SubjectStatus } from '@/core/types';

interface SidebarState {
  collapsed: boolean;
  currentSubject: string | null;
}

const state: SidebarState = {
  collapsed: false,
  currentSubject: null,
};

function getStatusColor(status: SubjectStatus): string {
  switch (status) {
    case 'completed':
      return '#10b981';
    case 'in_progress':
      return '#f59e0b';
    case 'not_started':
      return '#6b7280';
    default:
      return '#6b7280';
  }
}

function getStatusIcon(status: SubjectStatus): string {
  switch (status) {
    case 'completed':
      return '✓';
    case 'in_progress':
      return '◐';
    case 'not_started':
      return '○';
    default:
      return '○';
  }
}

function calculateSubjectProgress(
  subject: Subject,
  progress?: SubjectProgress
): number {
  if (!progress || progress.status === 'not_started') {
    return 0;
  }
  if (progress.status === 'completed') {
    return 100;
  }

  const totalQuizzes = subject.topics.reduce(
    (sum, topic) => sum + topic.quizIds.length,
    0
  );
  const totalExercises = subject.topics.reduce(
    (sum, topic) => sum + topic.exerciseIds.length,
    0
  );
  const totalItems = totalQuizzes + totalExercises;

  if (totalItems === 0) {
    return 0;
  }

  const completedQuizzes = Object.keys(progress.quizAttempts || {}).length;
  const completedExercises = Object.keys(progress.exerciseCompletions || {}).filter(
    (id) => {
      const completions = progress.exerciseCompletions[id];
      return completions && completions.some((c) => c.passed);
    }
  ).length;

  return Math.round(((completedQuizzes + completedExercises) / totalItems) * 100);
}

function createNavLink(
  route: string,
  currentRoute: string,
  icon: string,
  label: string
): HTMLElement {
  const link = document.createElement('a');
  link.href = `#${route}`;
  link.className = `sidebar-nav-link ${currentRoute === route ? 'active' : ''}`;
  link.innerHTML = `
    <span class="nav-icon">${icon}</span>
    <span class="nav-label">${label}</span>
  `;
  return link;
}

function createSubjectItem(
  subject: Subject,
  progress?: SubjectProgress,
  currentRoute?: string
): HTMLElement {
  const item = document.createElement('div');
  item.className = 'subject-item';

  const status = progress?.status || 'not_started';
  const progressPercent = calculateSubjectProgress(subject, progress);
  const isActive = currentRoute?.includes(`/subject/${subject.id}`);

  item.innerHTML = `
    <a href="#/subject/${subject.id}" class="subject-link ${isActive ? 'active' : ''}">
      <div class="subject-header">
        <span class="subject-icon" style="color: ${getStatusColor(status)}">
          ${getStatusIcon(status)}
        </span>
        <div class="subject-info">
          <div class="subject-title">${subject.code}</div>
          <div class="subject-subtitle">${subject.title}</div>
        </div>
      </div>
      <div class="subject-progress-bar">
        <div class="subject-progress-fill" style="width: ${progressPercent}%; background-color: ${getStatusColor(status)}"></div>
      </div>
    </a>
  `;

  return item;
}

function createCurrentSubjectSection(
  subject: Subject,
  progress?: SubjectProgress
): HTMLElement {
  const section = document.createElement('div');
  section.className = 'current-subject-section';

  const progressPercent = calculateSubjectProgress(subject, progress);
  const status = progress?.status || 'not_started';

  section.innerHTML = `
    <div class="current-subject-header">Current Subject</div>
    <div class="current-subject-card">
      <div class="subject-code">${subject.code}</div>
      <div class="subject-name">${subject.title}</div>
      <div class="subject-meta">
        Year ${subject.year} · Semester ${subject.semester}
      </div>
      <div class="progress-container">
        <div class="progress-label">
          <span>Progress</span>
          <span>${progressPercent}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${progressPercent}%; background-color: ${getStatusColor(status)}"></div>
        </div>
      </div>
    </div>
  `;

  return section;
}

export function renderSidebar(
  container: HTMLElement,
  currentRoute: string,
  subjects?: Subject[],
  userProgress?: Record<string, SubjectProgress>,
  currentSubject?: Subject
): void {
  container.innerHTML = '';
  container.className = `sidebar ${state.collapsed ? 'collapsed' : ''}`;

  // Header with logo/title
  const header = document.createElement('div');
  header.className = 'sidebar-header';
  header.innerHTML = `
    <div class="sidebar-logo">
      <span class="logo-icon">🎓</span>
      <span class="logo-text">CS Degree</span>
    </div>
    <button class="sidebar-toggle" aria-label="Toggle sidebar">
      ${state.collapsed ? '→' : '←'}
    </button>
  `;

  const toggleButton = header.querySelector('.sidebar-toggle') as HTMLButtonElement;
  toggleButton.addEventListener('click', () => {
    state.collapsed = !state.collapsed;
    container.classList.toggle('collapsed');
    toggleButton.textContent = state.collapsed ? '→' : '←';
  });

  container.appendChild(header);

  // Navigation links
  const nav = document.createElement('nav');
  nav.className = 'sidebar-nav';

  const navLinks = [
    { route: '/dashboard', icon: '📊', label: 'Dashboard' },
    { route: '/curriculum', icon: '📚', label: 'Curriculum' },
    { route: '/progress', icon: '📈', label: 'Progress' },
    { route: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  navLinks.forEach(({ route, icon, label }) => {
    nav.appendChild(createNavLink(route, currentRoute, icon, label));
  });

  container.appendChild(nav);

  // Current subject section
  if (currentSubject) {
    const currentProgress = userProgress?.[currentSubject.id];
    container.appendChild(
      createCurrentSubjectSection(currentSubject, currentProgress)
    );
  }

  // Available subjects list
  if (subjects && subjects.length > 0) {
    const subjectsSection = document.createElement('div');
    subjectsSection.className = 'subjects-section';

    const subjectsHeader = document.createElement('div');
    subjectsHeader.className = 'subjects-header';
    subjectsHeader.textContent = 'All Subjects';
    subjectsSection.appendChild(subjectsHeader);

    const subjectsList = document.createElement('div');
    subjectsList.className = 'subjects-list';

    // Group by year and semester
    const grouped = subjects.reduce((acc, subject) => {
      const key = `Year ${subject.year} - Semester ${subject.semester}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(subject);
      return acc;
    }, {} as Record<string, Subject[]>);

    Object.entries(grouped).forEach(([groupName, groupSubjects]) => {
      const groupHeader = document.createElement('div');
      groupHeader.className = 'subject-group-header';
      groupHeader.textContent = groupName;
      subjectsList.appendChild(groupHeader);

      groupSubjects.forEach((subject) => {
        const progress = userProgress?.[subject.id];
        subjectsList.appendChild(
          createSubjectItem(subject, progress, currentRoute)
        );
      });
    });

    subjectsSection.appendChild(subjectsList);
    container.appendChild(subjectsSection);
  }
}
