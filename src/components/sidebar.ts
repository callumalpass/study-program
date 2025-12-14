import type {
  Exercise,
  Project,
  Quiz,
  Subject,
  SubjectProgress,
  SubjectStatus,
  Exam,
} from '@/core/types';
import {
  navigate,
  navigateToExam,
  navigateToExercise,
  navigateToQuiz,
  navigateToProject,
  navigateToSubject,
  navigateToTopic,
} from '@/core/router';
import { Icons } from './icons';

interface SidebarState {
  currentSubject: string | null;
}

const state: SidebarState = {
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
      return Icons.StatusCompleted;
    case 'in_progress':
      return Icons.StatusInProgress;
    case 'not_started':
      return Icons.StatusNotStarted;
    default:
      return Icons.StatusNotStarted;
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
      const completion = progress.exerciseCompletions[id];
      return completion?.passed;
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
  currentRoute?: string,
  quizzes: Quiz[] = [],
  exercises: Exercise[] = [],
  exams: Exam[] = [],
  projects: Project[] = []
): HTMLElement {
  const item = document.createElement('div');
  item.className = 'subject-item';

  const status = progress?.status || 'not_started';
  const progressPercent = calculateSubjectProgress(subject, progress);
  const isActive = currentRoute?.includes(`/subject/${subject.id}`);
  const firstTopic = subject.topics[0];
  const firstQuizId = subject.topics.find((t) => t.quizIds.length > 0)?.quizIds[0];
  const firstExerciseId = subject.topics.find((t) => t.exerciseIds.length > 0)?.exerciseIds[0];
  const firstTopicWithExercises = subject.topics.find((t) => t.exerciseIds.length > 0);
  const topicTitleMap = subject.topics.reduce<Record<string, string>>((acc, topic) => {
    acc[topic.id] = topic.title;
    return acc;
  }, {});
  const subjectQuizzes = quizzes.filter((q) => q.subjectId === subject.id);
  const subjectExercises = exercises.filter((e) => e.subjectId === subject.id);
  const subjectExams = exams.filter((e) => e.subjectId === subject.id);
  const subjectProjects = projects.filter((p) => p.subjectId === subject.id);

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

  if (firstTopic || firstQuizId || firstExerciseId || subjectQuizzes.length || subjectExercises.length || subjectExams.length || subjectProjects.length) {
    const hoverMenu = document.createElement('div');
    hoverMenu.className = 'subject-hover-menu';
    hoverMenu.innerHTML = `
      <button class="menu-action" data-action="subject">
        <span class="menu-icon">${Icons.Curriculum}</span>
        <span class="menu-text">
          <span class="menu-title">Open subject</span>
          <span class="menu-subtitle">Overview · ${progressPercent}% complete</span>
        </span>
        <span class="menu-chevron">${Icons.ChevronRight}</span>
      </button>
      ${firstTopic ? `
        <button class="menu-action" data-topic="${firstTopic.id}">
          <span class="menu-icon">${Icons.AcademicCap}</span>
          <span class="menu-text">
            <span class="menu-title">Start ${firstTopic.title}</span>
            <span class="menu-subtitle">Topic 1 of ${subject.topics.length}</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
      ${firstQuizId ? `
        <button class="menu-action" data-quiz="${firstQuizId}">
          <span class="menu-icon">${Icons.StatQuiz}</span>
          <span class="menu-text">
            <span class="menu-title">First quiz</span>
            <span class="menu-subtitle">Warm up with practice</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
      ${firstExerciseId ? `
        <button class="menu-action" data-exercise="${firstExerciseId}">
          <span class="menu-icon">${Icons.StatCode}</span>
          <span class="menu-text">
            <span class="menu-title">First exercise</span>
            <span class="menu-subtitle">Hands-on practice</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
      ${subjectQuizzes.length ? `
        <button class="menu-action" data-section="topics-section">
          <span class="menu-icon">${Icons.StatQuiz}</span>
          <span class="menu-text">
            <span class="menu-title">Quizzes</span>
            <span class="menu-subtitle">${subjectQuizzes.length} available</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
      ${subjectExercises.length && firstTopicWithExercises ? `
        <button class="menu-action" data-practice-topic="${firstTopicWithExercises.id}">
          <span class="menu-icon">${Icons.StatCode}</span>
          <span class="menu-text">
            <span class="menu-title">Exercises</span>
            <span class="menu-subtitle">${subjectExercises.length} available</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
      ${subjectExams.length ? `
        <button class="menu-action" data-section="exams-section">
          <span class="menu-icon">${Icons.Beaker}</span>
          <span class="menu-text">
            <span class="menu-title">Exams</span>
            <span class="menu-subtitle">${subjectExams.length} scheduled</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
      ${subjectProjects.length ? `
        <button class="menu-action" data-section="projects-section">
          <span class="menu-icon">${Icons.StatProject}</span>
          <span class="menu-text">
            <span class="menu-title">Projects</span>
            <span class="menu-subtitle">${subjectProjects.length} to build</span>
          </span>
          <span class="menu-chevron">${Icons.ArrowRight}</span>
        </button>
      ` : ''}
    `;

    let hideTimeout: number | null = null;

    const positionMenu = () => {
      const rect = item.getBoundingClientRect();
      hoverMenu.style.position = 'fixed';
      hoverMenu.style.left = `${rect.right + 8}px`;
      hoverMenu.style.top = `${rect.top + rect.height / 2}px`;
    };

    const openMenu = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      positionMenu();
      item.classList.add('menu-open');
    };

    const scheduleClose = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      hideTimeout = window.setTimeout(() => {
        item.classList.remove('menu-open');
      }, 120);
    };

    hoverMenu.querySelectorAll('.menu-action').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const target = event.currentTarget as HTMLElement;

        const topicId = target.dataset.topic;
        const quizId = target.dataset.quiz;
        const exerciseId = target.dataset.exercise;
        const examId = target.dataset.exam;
        const projectId = target.dataset.project;
        const sectionId = target.dataset.section;
        const practiceTopicId = target.dataset.practiceTopic;

        if (topicId) {
          navigateToTopic(subject.id, topicId);
          return;
        }
        if (practiceTopicId) {
          // Navigate to topic page and scroll to practice section
          navigateToTopic(subject.id, practiceTopicId);
          setTimeout(() => {
            const section = document.getElementById('practice-section');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
          return;
        }
        if (quizId) {
          navigateToQuiz(subject.id, quizId);
          return;
        }
        if (exerciseId) {
          navigateToExercise(subject.id, exerciseId);
          return;
        }
        if (examId) {
          navigateToExam(subject.id, examId);
          return;
        }
        if (projectId) {
          navigateToProject(subject.id, projectId);
          return;
        }
        if (sectionId) {
          // Navigate to subject page and scroll to section after render
          navigateToSubject(subject.id);
          setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
          return;
        }

        navigateToSubject(subject.id);
      });
    });

    item.addEventListener('mouseenter', openMenu);
    item.addEventListener('mouseleave', scheduleClose);
    item.addEventListener('focusin', openMenu);
    item.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!item.contains(document.activeElement)) {
          scheduleClose();
        }
      }, 0);
    });

    hoverMenu.addEventListener('mouseenter', openMenu);
    hoverMenu.addEventListener('mouseleave', scheduleClose);

    item.appendChild(hoverMenu);
  }

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
  currentSubject?: Subject,
  quizzes: Quiz[] = [],
  exercises: Exercise[] = [],
  exams: Exam[] = [],
  projects: Project[] = []
): void {
  container.innerHTML = '';
  container.className = 'sidebar';

  // Header with logo/title
  const header = document.createElement('div');
  header.className = 'sidebar-header';
  header.innerHTML = `
    <div class="sidebar-logo">
      <span class="logo-icon">${Icons.Logo}</span>
      <span class="logo-text">CS Degree</span>
    </div>
  `;

  container.appendChild(header);

  // Navigation links
  const nav = document.createElement('nav');
  nav.className = 'sidebar-nav';

  const navLinks = [
    { route: '/dashboard', icon: Icons.Dashboard, label: 'Dashboard' },
    { route: '/curriculum', icon: Icons.Curriculum, label: 'Curriculum' },
    { route: '/progress', icon: Icons.Progress, label: 'Progress' },
    { route: '/export', icon: Icons.Export, label: 'Export PDF' },
    { route: '/settings', icon: Icons.Settings, label: 'Settings' },
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
          createSubjectItem(subject, progress, currentRoute, quizzes, exercises, exams, projects)
        );
      });
    });

    subjectsSection.appendChild(subjectsList);
    container.appendChild(subjectsSection);
  }
}
