// Subject detail page
import type { Subject, Topic, Project, UserProgress, Exam } from '@/core/types';
import { progressStorage } from '@/core/storage';
import {
  arePrerequisitesMet,
  startSubject,
  getSubjectProgressDetails,
  isQuizCompleted,
  isExerciseCompleted,
  getQuizBestScore,
} from '@/core/progress';
import {
  navigateToQuiz,
  navigateToExam,
  navigateToExercise,
  navigateToProject,
  navigateToCurriculum,
} from '@/core/router';
import { renderMarkdown } from '@/components/markdown';
import { Icons } from '../components/icons';

/**
 * Render the subject detail page
 */
export function renderSubjectPage(
  container: HTMLElement,
  subjects: Subject[],
  subjectId: string,
  topicId?: string,
  projects?: Project[],
  exams?: Exam[]
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const subjectProjects = projects ? projects.filter(p => p.subjectId === subjectId) : [];
  const subjectExams = exams ? exams.filter(exam => exam.subjectId === subjectId) : [];

  if (!subject) {
    container.innerHTML = `
      <div class="error-page">
        <h1>Subject Not Found</h1>
        <p>The subject you're looking for doesn't exist.</p>
        <button class="btn btn-primary" id="back-to-curriculum">Back to Curriculum</button>
      </div>
    `;

    const backBtn = container.querySelector('#back-to-curriculum');
    if (backBtn) {
      backBtn.addEventListener('click', () => navigateToCurriculum());
    }
    return;
  }

  const userProgress = progressStorage.getProgress();
  const prerequisitesMet = arePrerequisitesMet(subject, userProgress);
  const progressDetails = getSubjectProgressDetails(subject);

  // Auto-start subject if viewing it and prerequisites are met
  if (prerequisitesMet && progressDetails.status === 'not_started') {
    startSubject(subjectId);
  }

  if (topicId) {
    renderTopicView(container, subject, topicId, subjects, userProgress);
  } else {
    renderSubjectOverview(container, subject, subjects, userProgress, prerequisitesMet, progressDetails, subjectProjects, subjectExams);
  }
}

/**
 * Render the subject overview (main view)
 */
function renderSubjectOverview(
  container: HTMLElement,
  subject: Subject,
  allSubjects: Subject[],
  userProgress: UserProgress,
  prerequisitesMet: boolean,
  progressDetails: ReturnType<typeof getSubjectProgressDetails>,
  subjectProjects: Project[],
  subjectExams: Exam[]
): void {
  const prerequisiteSubjects = subject.prerequisites.map(prereqId =>
    allSubjects.find(s => s.id === prereqId)
  ).filter(Boolean) as Subject[];

  container.innerHTML = `
    <div class="subject-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">${Icons.ChevronRight}</span>
        <span class="current">${subject.title}</span>
      </nav>

      <header class="subject-header">
        <div class="subject-title-row">
          <div>
            <span class="subject-code">${subject.code}</span>
            <h1>${subject.title}</h1>
          </div>
          <div class="subject-status-badge status-${progressDetails.status.replace('_', '-')}">
            ${formatStatus(progressDetails.status)}
          </div>
        </div>

        <p class="subject-description">${subject.description}</p>

        <div class="subject-meta">
          <span class="meta-item">Year ${subject.year}, Semester ${subject.semester}</span>
          <span class="meta-item">${subject.estimatedHours} hours</span>
          <span class="meta-item">${subject.topics.length} topics</span>
          ${subjectProjects.length > 0 ? `<span class="meta-item">${subjectProjects.length} projects</span>` : ''}
        </div>
      </header>

      ${!prerequisitesMet ? `
        <section class="prerequisites-warning">
          <h3>Prerequisites Required</h3>
          <p>Complete these subjects first:</p>
          <ul class="prerequisite-list">
            ${prerequisiteSubjects.map(prereq => {
              const prereqProgress = userProgress.subjects[prereq.id];
              const isCompleted = prereqProgress?.status === 'completed';
              return `
                <li class="${isCompleted ? 'completed' : ''}">
                  <span class="checkbox">${isCompleted ? Icons.Check : Icons.StatusNotStarted}</span>
                  ${prereq.title} (${prereq.code})
                </li>
              `;
            }).join('')}
          </ul>
        </section>
      ` : ''}

      <section class="section">
        <h2>Learning Objectives</h2>
        <ul class="objectives-list">
          ${subject.learningObjectives.map(objective => `<li>${objective}</li>`).join('')}
        </ul>
      </section>

      <section class="section" id="topics-section">
        <h2>Topics</h2>
        <div class="topics-list">
          ${subject.topics.map((topic, index) => renderTopicItem(topic, index + 1, subject.id, userProgress)).join('')}
        </div>
      </section>

      ${subjectExams.length > 0 ? `
        <section class="section" id="exams-section">
          <h2>Exams</h2>
          <div class="exams-list">
            ${subjectExams.map(exam => renderExamItem(exam, subject.id, userProgress)).join('')}
          </div>
        </section>
      ` : ''}

      ${subjectProjects.length > 0 ? `
        <section class="section" id="projects-section">
          <h2>Projects</h2>
          <div class="projects-list">
            ${subjectProjects.map(project => renderProjectItem(project, subject.id, userProgress)).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;

  attachSubjectEventListeners(container, subject.id);
}

/**
 * Render a topic item in the list
 */
function renderTopicItem(topic: Topic, number: number, subjectId: string, userProgress: UserProgress): string {
  const progress = userProgress.subjects[subjectId];
  const quizzesCompleted = topic.quizIds.filter(quizId => isQuizCompleted(quizId, progress)).length;
  const exercisesCompleted = topic.exerciseIds.filter(exerciseId => isExerciseCompleted(exerciseId, progress)).length;

  const totalAssessments = topic.quizIds.length + topic.exerciseIds.length;
  const completedAssessments = quizzesCompleted + exercisesCompleted;
  const isCompleted = totalAssessments > 0 && completedAssessments === totalAssessments;

  return `
    <div class="topic-item ${isCompleted ? 'completed' : ''}">
      <div class="topic-number">${number}</div>
      <div class="topic-info">
        <h3>${topic.title}</h3>
        <div class="topic-meta">
          ${topic.quizIds.length > 0 ? `<span>${quizzesCompleted}/${topic.quizIds.length} quizzes</span>` : ''}
          ${topic.exerciseIds.length > 0 ? `<span>${exercisesCompleted}/${topic.exerciseIds.length} exercises</span>` : ''}
          ${isCompleted ? `<span class="completed-tag">${Icons.Check} Complete</span>` : ''}
        </div>
      </div>
      <button class="btn btn-secondary btn-sm view-topic-btn" data-topic-id="${topic.id}">
        View
      </button>
    </div>
  `;
}

/**
 * Render an exam item in the list
 */
function renderExamItem(exam: Exam, subjectId: string, userProgress: UserProgress): string {
  const progress = userProgress.subjects[subjectId];
  const attempts = progress?.examAttempts?.[exam.id] || [];
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map((a: any) => a.score)) : null;
  const passed = bestScore !== null && bestScore >= 70;

  return `
    <div class="exam-item ${passed ? 'passed' : ''}">
      <div class="exam-info">
        <h3>${exam.title}</h3>
        <p>${exam.instructions?.[0] || 'Cumulative assessment covering core CS101 concepts.'}</p>
        <div class="exam-meta">
          <span>${exam.questions.length} questions</span>
          ${exam.durationMinutes ? `<span>${exam.durationMinutes} min</span>` : ''}
          ${bestScore !== null ? `<span class="assessment-score ${passed ? 'passed' : ''}">${bestScore}%</span>` : ''}
        </div>
      </div>
      <button class="btn btn-primary btn-sm view-exam-btn" data-exam-id="${exam.id}">
        ${attempts.length > 0 ? 'Retry' : 'Start'}
      </button>
    </div>
  `;
}

/**
 * Render a project item in the list
 */
function renderProjectItem(project: Project, subjectId: string, userProgress: UserProgress): string {
  const progress = userProgress.subjects[subjectId];
  const submissions = progress?.projectSubmissions?.[project.id] || [];
  const hasSubmission = submissions.length > 0;

  return `
    <div class="project-item ${hasSubmission ? 'submitted' : ''}">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}</p>
        <div class="project-meta">
          <span>${project.estimatedHours} hours</span>
          <span>${project.requirements.length} requirements</span>
          ${hasSubmission ? `<span class="submitted-tag">${Icons.Check} Submitted</span>` : ''}
        </div>
      </div>
      <button class="btn btn-primary btn-sm view-project-btn" data-project-id="${project.id}">
        ${hasSubmission ? 'View' : 'Start'}
      </button>
    </div>
  `;
}

/**
 * Render the topic detail view
 */
function renderTopicView(
  container: HTMLElement,
  subject: Subject,
  topicId: string,
  allSubjects: Subject[],
  userProgress: UserProgress
): void {
  const topicIndex = subject.topics.findIndex(t => t.id === topicId);
  const topic = topicIndex >= 0 ? subject.topics[topicIndex] : null;
  const hasPractice = topic ? (topic.quizIds.length > 0 || topic.exerciseIds.length > 0) : false;

  if (!topic) {
    renderSubjectOverview(
      container,
      subject,
      allSubjects,
      userProgress,
      arePrerequisitesMet(subject, userProgress),
      getSubjectProgressDetails(subject),
      [], // No projects in fallback case
      []
    );
    return;
  }

  const progress = userProgress.subjects[subject.id];
  const prevTopic = topicIndex > 0 ? subject.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < subject.topics.length - 1 ? subject.topics[topicIndex + 1] : null;

  container.innerHTML = `
    <div class="topic-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">${Icons.ChevronRight}</span>
        <a href="#/subject/${subject.id}">${subject.code}</a>
        <span class="separator">${Icons.ChevronRight}</span>
        <span class="current">${topic.title}</span>
      </nav>

      <header class="page-header">
        <div class="topic-title-section">
          <h1>${topic.title}</h1>
          <span class="topic-counter">Topic ${topicIndex + 1} of ${subject.topics.length}</span>
        </div>
      </header>

      ${hasPractice ? `
        <div class="practice-quick-nav">
          <div class="practice-quick-title">
            <span class="icon">${Icons.Progress}</span>
            Practice quick access
          </div>
          <div class="practice-quick-actions">
            <button class="btn btn-secondary btn-sm" data-scroll-target="#practice-section">
              Jump to practice
            </button>
            ${topic.quizIds[0] ? `
              <button class="btn btn-primary btn-sm" data-first-quiz="${topic.quizIds[0]}">
                Start Quiz 1
              </button>
            ` : ''}
            ${topic.exerciseIds[0] ? `
              <button class="btn btn-primary btn-sm" data-first-exercise="${topic.exerciseIds[0]}">
                Start Exercise 1
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      <section class="content-section">
        ${renderMarkdown(topic.content)}
      </section>

      ${topic.quizIds.length > 0 || topic.exerciseIds.length > 0 ? `
        <section class="section" id="practice-section">
          <h2>Practice</h2>
          <div class="assessment-list">
            ${topic.quizIds.map((quizId, index) => {
              const attempts = progress?.quizAttempts[quizId] || [];
              const bestScore = getQuizBestScore(quizId, progress);
              const passed = isQuizCompleted(quizId, progress);

              return `
                <div class="assessment-item ${passed ? 'passed' : ''}">
                  <div class="assessment-info">
                    <span class="assessment-type">Quiz</span>
                    <span class="assessment-title">Quiz ${index + 1}</span>
                    ${bestScore !== null ? `<span class="assessment-score ${passed ? 'passed' : ''}">${bestScore}%</span>` : ''}
                  </div>
                  <button class="btn btn-primary btn-sm" data-quiz-id="${quizId}">
                    ${attempts.length > 0 ? 'Retry' : 'Start'}
                  </button>
                </div>
              `;
            }).join('')}

            ${topic.exerciseIds.map((exerciseId, index) => {
              const completion = progress?.exerciseCompletions[exerciseId];
              const passed = isExerciseCompleted(exerciseId, progress);

              return `
                <div class="assessment-item ${passed ? 'passed' : ''}">
                  <div class="assessment-info">
                    <span class="assessment-type">Exercise</span>
                    <span class="assessment-title">Exercise ${index + 1}</span>
                    ${passed ? `<span class="assessment-score passed">${Icons.Check}</span>` : ''}
                  </div>
                  <button class="btn btn-primary btn-sm" data-exercise-id="${exerciseId}">
                    ${completion ? 'Continue' : 'Start'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : ''}

      <nav class="topic-navigation">
        <div class="nav-left">
          ${prevTopic ? `
            <a href="#/subject/${subject.id}/topic/${prevTopic.id}" class="btn btn-secondary">
              ${Icons.ChevronLeft} ${prevTopic.title}
            </a>
          ` : `
            <a href="#/subject/${subject.id}" class="btn btn-secondary">
              ${Icons.ChevronLeft} Back to ${subject.code}
            </a>
          `}
        </div>
        <div class="nav-center">
          <span class="nav-counter">${topicIndex + 1} / ${subject.topics.length}</span>
        </div>
        <div class="nav-right">
          ${nextTopic ? `
            <a href="#/subject/${subject.id}/topic/${nextTopic.id}" class="btn btn-primary">
              ${nextTopic.title} ${Icons.ChevronRight}
            </a>
          ` : `
            <a href="#/subject/${subject.id}" class="btn btn-primary">
              Complete ${Icons.Check}
            </a>
          `}
        </div>
      </nav>
    </div>
  `;

  attachTopicEventListeners(container, subject.id);
}

function formatStatus(status: string): string {
  return status.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function attachSubjectEventListeners(container: HTMLElement, subjectId: string): void {
  container.querySelectorAll('.view-topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const topicId = (btn as HTMLElement).dataset.topicId;
      if (topicId) {
        window.location.hash = `#/subject/${subjectId}/topic/${topicId}`;
      }
    });
  });

  container.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = (btn as HTMLElement).dataset.projectId;
      if (projectId) {
        navigateToProject(subjectId, projectId);
      }
    });
  });

  container.querySelectorAll('.view-exam-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const examId = (btn as HTMLElement).dataset.examId;
      if (examId) {
        navigateToExam(subjectId, examId);
      }
    });
  });
}

function attachTopicEventListeners(container: HTMLElement, subjectId: string): void {
  container.querySelectorAll('[data-quiz-id]').forEach(btn => {
    const quizId = (btn as HTMLElement).dataset.quizId;
    if (quizId) {
      btn.addEventListener('click', () => navigateToQuiz(subjectId, quizId));
    }
  });

  container.querySelectorAll('[data-exercise-id]').forEach(btn => {
    const exerciseId = (btn as HTMLElement).dataset.exerciseId;
    if (exerciseId) {
      btn.addEventListener('click', () => navigateToExercise(subjectId, exerciseId));
    }
  });

  const scrollBtn = container.querySelector('[data-scroll-target]');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const targetSelector = (scrollBtn as HTMLElement).dataset.scrollTarget;
      if (!targetSelector) return;
      const targetEl = container.querySelector(targetSelector);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  const firstQuizBtn = container.querySelector('[data-first-quiz]');
  if (firstQuizBtn) {
    firstQuizBtn.addEventListener('click', () => {
      const quizId = (firstQuizBtn as HTMLElement).dataset.firstQuiz;
      if (quizId) {
        navigateToQuiz(subjectId, quizId);
      }
    });
  }

  const firstExerciseBtn = container.querySelector('[data-first-exercise]');
  if (firstExerciseBtn) {
    firstExerciseBtn.addEventListener('click', () => {
      const exerciseId = (firstExerciseBtn as HTMLElement).dataset.firstExercise;
      if (exerciseId) {
        navigateToExercise(subjectId, exerciseId);
      }
    });
  }
}
