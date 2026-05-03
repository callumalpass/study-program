import { h, Fragment, ComponentChildren } from 'preact';
import { useState, useCallback, useMemo, useEffect, useRef } from 'preact/hooks';
import type { Subject, Topic, SubjectProgress, Quiz, Exercise, Exam, Project, SubtopicCompletion } from '@/core/types';
import { QUIZ_PASSING_SCORE } from '@/core/types';
import { Icons } from '@/components/icons';
import {
  navigateToTopic,
  navigateToSubtopic,
  navigateToQuiz,
  navigateToExercise,
  navigateToExam,
  navigateToProject,
} from '@/core/router';
import { renderMarkdown, renderMermaidDiagrams, renderFunctionPlots } from '@/components/markdown';
import { ReadingList } from './ReadingList';
import { progressStorage } from '@/core/storage';
import { decodeQuoteEntities } from '@/utils/html';

interface ContentNavigatorProps {
  subject: Subject;
  currentTopicId?: string;
  currentSubtopicSlug?: string;
  progress?: SubjectProgress;
  progressStatus: string;
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
  onSubtopicView: (subtopicId: string) => void;
  /** Optional children to render in the content area instead of default content */
  children?: ComponentChildren;
  /** Optional ID to highlight in the practice sidebar (e.g., current exerciseId or quizId) */
  currentPracticeId?: string;
  /** Optional dependency graph element to render in the overview */
  dependencyGraph?: HTMLElement | null;
  /** Prerequisite subjects that must be completed first */
  prerequisiteSubjects?: Subject[];
  /** Whether all prerequisites have been met */
  prerequisitesMet?: boolean;
}

const INITIAL_EXERCISE_COUNT = 5;
const INITIAL_QUIZ_COUNT = 5;
const MOBILE_NAV_REOPEN_KEY = 'stod.subjectNav.reopen';
const MOBILE_NAV_PANEL_KEY = 'stod.subjectNav.panel';

function formatStatus(status: string): string {
  return status.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function ContentNavigator({
  subject,
  currentTopicId,
  currentSubtopicSlug,
  progress,
  progressStatus,
  quizzes,
  exercises,
  exams,
  projects,
  onSubtopicView,
  children,
  currentPracticeId,
  dependencyGraph,
  prerequisiteSubjects = [],
  prerequisitesMet = true,
}: ContentNavigatorProps) {
  const [showAllExercises, setShowAllExercises] = useState(false);
  const [showAllQuizzes, setShowAllQuizzes] = useState(false);
  const [subtopicCompletions, setSubtopicCompletions] = useState<Record<string, SubtopicCompletion>>(
    () => progress?.subtopicCompletions || {}
  );
  const [mobilePanel, setMobilePanel] = useState<'topics' | 'practice'>(() => {
    if (typeof window === 'undefined') return 'topics';
    return window.sessionStorage.getItem(MOBILE_NAV_PANEL_KEY) === 'practice' ? 'practice' : 'topics';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(MOBILE_NAV_REOPEN_KEY) === 'true';
  });
  const graphContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSubtopicCompletions(progress?.subtopicCompletions || {});
  }, [progress?.subtopicCompletions]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(MOBILE_NAV_REOPEN_KEY);
    }
  }, []);

  const preserveMobileMenuAfterNavigation = useCallback(() => {
    if (!isMobileMenuOpen || typeof window === 'undefined') return;
    window.sessionStorage.setItem(MOBILE_NAV_REOPEN_KEY, 'true');
    window.sessionStorage.setItem(MOBILE_NAV_PANEL_KEY, mobilePanel);
  }, [isMobileMenuOpen, mobilePanel]);

  const handleMobilePanelChange = useCallback((panel: 'topics' | 'practice') => {
    setMobilePanel(panel);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(MOBILE_NAV_PANEL_KEY, panel);
    }
  }, []);

  // Filter content for this subject
  const subjectQuizzes = useMemo(() => quizzes.filter(q => q.subjectId === subject.id), [quizzes, subject.id]);
  const subjectExercises = useMemo(() => exercises.filter(e => e.subjectId === subject.id), [exercises, subject.id]);
  const subjectExams = useMemo(() => exams.filter(e => e.subjectId === subject.id), [exams, subject.id]);
  const subjectProjects = useMemo(() => projects.filter(p => p.subjectId === subject.id), [projects, subject.id]);

  // Find current topic and subtopic
  const currentTopic = useMemo(() =>
    currentTopicId ? subject.topics.find(t => t.id === currentTopicId) : null,
    [subject.topics, currentTopicId]
  );

  // When a topic is selected, scope Practice items to that topic (otherwise show all for the subject).
  const practiceQuizzes = useMemo(() => {
    if (!currentTopicId || !currentTopic) return subjectQuizzes;

    const quizById = new Map(subjectQuizzes.map(q => [q.id, q] as const));
    const orderedFromTopic = currentTopic.quizIds
      .map(id => quizById.get(id))
      .filter((q): q is Quiz => Boolean(q));

    const topicIdSet = new Set(currentTopic.quizIds);
    const extras = subjectQuizzes.filter(q => q.topicId === currentTopicId && !topicIdSet.has(q.id));
    return [...orderedFromTopic, ...extras];
  }, [currentTopicId, currentTopic, subjectQuizzes]);

  const practiceExercises = useMemo(() => {
    if (!currentTopicId || !currentTopic) return subjectExercises;

    const exerciseById = new Map(subjectExercises.map(e => [e.id, e] as const));
    const orderedFromTopic = currentTopic.exerciseIds
      .map(id => exerciseById.get(id))
      .filter((e): e is Exercise => Boolean(e));

    const topicIdSet = new Set(currentTopic.exerciseIds);
    const extras = subjectExercises.filter(e => e.topicId === currentTopicId && !topicIdSet.has(e.id));
    return [...orderedFromTopic, ...extras];
  }, [currentTopicId, currentTopic, subjectExercises]);

  const currentSubtopic = useMemo(() => {
    if (!currentTopic?.subtopics?.length || !currentSubtopicSlug) return null;
    return currentTopic.subtopics.find(st => st.slug === currentSubtopicSlug) || currentTopic.subtopics[0];
  }, [currentTopic, currentSubtopicSlug]);

  // Find the last viewed subtopic for "Continue Reading" in subject overview
  const lastViewedSubtopicInfo = useMemo(() => {
    const lastViewed = progressStorage.getLastViewedSubtopicForSubject(subject.id);
    if (!lastViewed) return null;

    // Find the topic and subtopic from the subject structure
    for (const topic of subject.topics) {
      if (!topic.subtopics) continue;
      const subtopic = topic.subtopics.find(st => st.id === lastViewed.subtopicId);
      if (subtopic) {
        return {
          topic,
          subtopic,
          lastViewedAt: lastViewed.lastViewedAt,
        };
      }
    }
    return null;
  }, [subject.id, subject.topics, progress?.subtopicViews]);

  const topicIndex = currentTopic ? subject.topics.findIndex(t => t.id === currentTopicId) : -1;
  const subtopicIndex = useMemo(() => {
    if (!currentSubtopic || !currentTopic?.subtopics?.length) return -1;
    return currentTopic.subtopics.findIndex(st => st.id === currentSubtopic.id);
  }, [currentSubtopic, currentTopic]);
  const subtopicCount = currentTopic?.subtopics?.length ?? 0;

  const hasPracticeItems = practiceQuizzes.length > 0
    || practiceExercises.length > 0
    || subjectExams.length > 0
    || subjectProjects.length > 0;

  // Reset "show more" state when switching topics to avoid confusing carry-over.
  useEffect(() => {
    setShowAllExercises(false);
    setShowAllQuizzes(false);
  }, [currentTopicId]);

  // Track subtopic view
  useEffect(() => {
    if (currentSubtopic) {
      onSubtopicView(currentSubtopic.id);
    }
  }, [currentSubtopic?.id, onSubtopicView]);

  // Mount dependency graph HTML element
  useEffect(() => {
    if (graphContainerRef.current && dependencyGraph) {
      graphContainerRef.current.innerHTML = '';
      graphContainerRef.current.appendChild(dependencyGraph);
    }
  }, [dependencyGraph]);

  // Render Mermaid diagrams and function plots after content updates
  useEffect(() => {
    renderMermaidDiagrams();
    renderFunctionPlots();
  }, [currentSubtopic?.id, currentTopic?.id]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    window.sessionStorage.removeItem(MOBILE_NAV_REOPEN_KEY);
    document.body.classList.add('subject-nav-open');
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('subject-nav-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  // Progress helpers
  const isTopicCompleted = useCallback((topic: Topic): boolean => {
    if (!progress) return false;
    const readingComplete = !topic.subtopics?.length
      || topic.subtopics.every(subtopic => subtopicCompletions[subtopic.id]);
    const quizzesComplete = topic.quizIds.every(qid => {
      const attempts = progress.quizAttempts?.[qid];
      // Check if any attempt has a passing score
      return attempts && attempts.some(a => a.score >= QUIZ_PASSING_SCORE);
    });
    const exercisesComplete = topic.exerciseIds.every(eid => {
      const completion = progress.exerciseCompletions?.[eid];
      return completion?.passed;
    });
    return readingComplete && quizzesComplete && exercisesComplete;
  }, [progress, subtopicCompletions]);

  const getTopicPracticeProgress = useCallback((topic: Topic): { completed: number; total: number } => {
    if (!progress) return { completed: 0, total: topic.quizIds.length + topic.exerciseIds.length };

    const quizzesCompleted = topic.quizIds.filter(qid => {
      const attempts = progress.quizAttempts?.[qid];
      // Check if any attempt has a passing score
      return attempts && attempts.some(a => a.score >= QUIZ_PASSING_SCORE);
    }).length;

    const exercisesCompleted = topic.exerciseIds.filter(eid => {
      const completion = progress.exerciseCompletions?.[eid];
      return completion?.passed;
    }).length;

    return {
      completed: quizzesCompleted + exercisesCompleted,
      total: topic.quizIds.length + topic.exerciseIds.length
    };
  }, [progress]);

  const getTopicReadingProgress = useCallback((topic: Topic): { completed: number; total: number } => {
    const subtopics = topic.subtopics || [];
    return {
      completed: subtopics.filter(subtopic => subtopicCompletions[subtopic.id]).length,
      total: subtopics.length,
    };
  }, [subtopicCompletions]);

  const isSubtopicViewed = useCallback((subtopicId: string): boolean => {
    return progress?.subtopicViews?.[subtopicId] !== undefined;
  }, [progress]);

  const isSubtopicCompleted = useCallback((subtopicId: string): boolean => {
    return subtopicCompletions[subtopicId] !== undefined;
  }, [subtopicCompletions]);

  const isQuizAttempted = useCallback((quizId: string): boolean => {
    const attempts = progress?.quizAttempts?.[quizId];
    return Boolean(attempts && attempts.length > 0);
  }, [progress]);

  const isQuizPassed = useCallback((quizId: string): boolean => {
    const attempts = progress?.quizAttempts?.[quizId];
    return Boolean(attempts && attempts.some(a => a.score >= QUIZ_PASSING_SCORE));
  }, [progress]);

  const isExerciseComplete = useCallback((exerciseId: string): boolean => {
    const completion = progress?.exerciseCompletions?.[exerciseId];
    return Boolean(completion?.passed);
  }, [progress]);

  const isExamAttempted = useCallback((examId: string): boolean => {
    const attempts = progress?.examAttempts?.[examId];
    return Boolean(attempts && attempts.length > 0);
  }, [progress]);

  const hasProjectSubmission = useCallback((projectId: string): boolean => {
    const submissions = progress?.projectSubmissions?.[projectId];
    return Boolean(submissions && submissions.length > 0);
  }, [progress]);

  const allSubtopics = subject.topics.flatMap(topic => topic.subtopics ?? []);
  const completedTopicCount = subject.topics.filter(topic => isTopicCompleted(topic)).length;
  const completedSubtopicCount = allSubtopics.filter(subtopic => isSubtopicCompleted(subtopic.id)).length;
  const scopedPracticeCount = practiceQuizzes.length + practiceExercises.length + subjectExams.length + subjectProjects.length;
  const completedPracticeCount = practiceQuizzes.filter(quiz => isQuizPassed(quiz.id)).length
    + practiceExercises.filter(exercise => isExerciseComplete(exercise.id)).length
    + subjectExams.filter(exam => isExamAttempted(exam.id)).length
    + subjectProjects.filter(project => hasProjectSubmission(project.id)).length;
  const sectionProgressValue = allSubtopics.length > 0
    ? `${completedSubtopicCount}/${allSubtopics.length}`
    : '0';
  const practiceProgressValue = scopedPracticeCount > 0
    ? `${completedPracticeCount}/${scopedPracticeCount}`
    : '0';
  const mobileContextTitle = decodeQuoteEntities(
    currentSubtopic?.title || currentTopic?.title || subject.title
  );
  const mobileContextMeta = currentSubtopic && subtopicIndex >= 0
    ? `Section ${subtopicIndex + 1}/${subtopicCount}`
    : currentTopic && topicIndex >= 0
      ? `Topic ${topicIndex + 1}/${subject.topics.length}`
      : `${completedTopicCount}/${subject.topics.length} topics done`;
  const practiceContextLabel = currentTopic
    ? decodeQuoteEntities(currentTopic.title)
    : 'Whole subject';

  // Navigation handlers
  const handleTopicClick = useCallback((e: Event, topicId: string) => {
    e.preventDefault();
    preserveMobileMenuAfterNavigation();
    const topic = subject.topics.find(t => t.id === topicId);
    if (topic?.subtopics?.length) {
      navigateToSubtopic(subject.id, topicId, topic.subtopics[0].slug);
    } else {
      navigateToTopic(subject.id, topicId);
    }
  }, [preserveMobileMenuAfterNavigation, subject]);

  const handleSubtopicClick = useCallback((e: Event, topicId: string, slug: string) => {
    e.preventDefault();
    closeMobileMenu();
    navigateToSubtopic(subject.id, topicId, slug);
  }, [closeMobileMenu, subject.id]);

  const handleQuizClick = useCallback((e: Event, quizId: string) => {
    e.preventDefault();
    closeMobileMenu();
    navigateToQuiz(subject.id, quizId);
  }, [closeMobileMenu, subject.id]);

  const handleExerciseClick = useCallback((e: Event, exerciseId: string) => {
    e.preventDefault();
    closeMobileMenu();
    navigateToExercise(subject.id, exerciseId);
  }, [closeMobileMenu, subject.id]);

  const handleExamClick = useCallback((e: Event, examId: string) => {
    e.preventDefault();
    closeMobileMenu();
    navigateToExam(subject.id, examId);
  }, [closeMobileMenu, subject.id]);

  const handleProjectClick = useCallback((e: Event, projectId: string) => {
    e.preventDefault();
    closeMobileMenu();
    navigateToProject(subject.id, projectId);
  }, [closeMobileMenu, subject.id]);

  const handleContinueReadingClick = useCallback((e: Event) => {
    e.preventDefault();
    closeMobileMenu();
    if (lastViewedSubtopicInfo) {
      navigateToSubtopic(subject.id, lastViewedSubtopicInfo.topic.id, lastViewedSubtopicInfo.subtopic.slug);
    }
  }, [closeMobileMenu, subject.id, lastViewedSubtopicInfo]);

  const handleCompleteSection = useCallback(() => {
    if (!currentSubtopic) return;

    progressStorage.recordSubtopicCompletion(subject.id, currentSubtopic.id);
    const completion = progressStorage.getSubtopicCompletion(subject.id, currentSubtopic.id);
    if (completion) {
      setSubtopicCompletions(prev => ({
        ...prev,
        [currentSubtopic.id]: completion,
      }));
    }
  }, [currentSubtopic, subject.id]);

  const getNextPracticeForTopic = useCallback((topic: Topic): { label: string; title: string; href: string } | null => {
    const nextQuizId = topic.quizIds.find(quizId => !isQuizPassed(quizId));
    if (nextQuizId) {
      const quiz = subjectQuizzes.find(q => q.id === nextQuizId);
      return {
        label: 'Take Topic Quiz',
        title: quiz ? decodeQuoteEntities(quiz.title) : 'Topic quiz',
        href: `#/subject/${subject.id}/quiz/${nextQuizId}`,
      };
    }

    const nextExerciseId = topic.exerciseIds.find(exerciseId => !isExerciseComplete(exerciseId));
    if (nextExerciseId) {
      const exercise = subjectExercises.find(e => e.id === nextExerciseId);
      return {
        label: 'Start Exercise',
        title: exercise ? decodeQuoteEntities(exercise.title) : 'Topic exercise',
        href: `#/subject/${subject.id}/exercise/${nextExerciseId}`,
      };
    }

    return null;
  }, [isExerciseComplete, isQuizPassed, subject.id, subjectExercises, subjectQuizzes]);

  // Render content based on current state
  const renderContent = () => {
    // Render subtopic content with pagination (requires both currentSubtopic and currentTopic with subtopics)
    if (currentSubtopic && currentTopic?.subtopics) {
      const subtopics = currentTopic.subtopics;
      const currentIndex = subtopics.findIndex(st => st.id === currentSubtopic.id);
      const prevSubtopic = currentIndex > 0 ? subtopics[currentIndex - 1] : null;
      const nextSubtopic = currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : null;
      const currentSectionCompleted = isSubtopicCompleted(currentSubtopic.id);
      const topicReadingProgress = getTopicReadingProgress(currentTopic);
      const topicReadingComplete = topicReadingProgress.total > 0
        && topicReadingProgress.completed === topicReadingProgress.total;
      const nextPractice = getNextPracticeForTopic(currentTopic);

      return (
        <div class="content-main">
          <div
            class="content-body markdown-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentSubtopic.content) }}
          />
          {/* Show readings for the current topic */}
          {currentTopic.readings && currentTopic.readings.length > 0 && (
            <ReadingList readings={currentTopic.readings} topicTitle={decodeQuoteEntities(currentTopic.title)} />
          )}
          <section class={`section-completion-panel ${currentSectionCompleted ? 'completed' : ''}`}>
            <div class="section-completion-copy">
              <span class="section-completion-kicker">
                {topicReadingProgress.completed}/{topicReadingProgress.total} sections complete
              </span>
              <h2>{currentSectionCompleted ? 'Section completed' : 'Complete this section'}</h2>
              <p>
                {currentSectionCompleted
                  ? 'This section is counted toward topic reading progress.'
                  : 'Mark this section complete when you are ready to move on.'}
              </p>
            </div>
            <div class="section-completion-actions">
              <button
                type="button"
                class="btn btn-primary"
                disabled={currentSectionCompleted}
                onClick={handleCompleteSection}
              >
                <span dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                {currentSectionCompleted ? 'Completed' : 'Complete Section'}
              </button>
              {currentSectionCompleted && nextSubtopic && (
                <a
                  class="btn btn-secondary"
                  href={`#/subject/${subject.id}/topic/${currentTopic.id}/subtopic/${nextSubtopic.slug}`}
                >
                  Next Section
                  <span dangerouslySetInnerHTML={{ __html: Icons.ArrowRight }} />
                </a>
              )}
            </div>
          </section>
          {currentSectionCompleted && !nextSubtopic && topicReadingComplete && (
            <section class="topic-transition-panel">
              <div>
                <span class="section-completion-kicker">Topic reading complete</span>
                <h2>Topic reading complete</h2>
                <p>
                  {nextPractice
                    ? `Next: ${nextPractice.title}.`
                    : 'Next: review your completed topic or choose another practice item.'}
                </p>
              </div>
              {nextPractice ? (
                <a class="btn btn-primary" href={nextPractice.href}>
                  {nextPractice.label}
                  <span dangerouslySetInnerHTML={{ __html: Icons.ArrowRight }} />
                </a>
              ) : (
                <button class="btn btn-secondary" onClick={(e) => handleTopicClick(e, currentTopic.id)}>
                  Review Topic
                </button>
              )}
            </section>
          )}
          <nav class="content-pagination">
            <div class="pagination-left">
              {prevSubtopic && (
                <a
                  href={`#/subject/${subject.id}/topic/${currentTopic.id}/subtopic/${prevSubtopic.slug}`}
                  class="pagination-link prev"
                >
                  <span class="pagination-icon" dangerouslySetInnerHTML={{ __html: Icons.ChevronLeft }} />
                  <span class="pagination-text">
                    <span class="pagination-label">Previous</span>
                    <span class="pagination-title">{decodeQuoteEntities(prevSubtopic.title)}</span>
                  </span>
                </a>
              )}
            </div>
            <div class="pagination-center">
              <span class="pagination-counter">{currentIndex + 1} / {subtopics.length}</span>
            </div>
            <div class="pagination-right">
              {nextSubtopic && (
                <a
                  href={`#/subject/${subject.id}/topic/${currentTopic.id}/subtopic/${nextSubtopic.slug}`}
                  class="pagination-link next"
                >
                  <span class="pagination-text">
                    <span class="pagination-label">Next</span>
                    <span class="pagination-title">{decodeQuoteEntities(nextSubtopic.title)}</span>
                  </span>
                  <span class="pagination-icon" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
                </a>
              )}
            </div>
          </nav>
        </div>
      );
    }

    if (currentTopic) {
      // Legacy topic view (no subtopics)
      return (
        <div class="content-main">
          <div
            class="content-body markdown-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentTopic.content) }}
          />
          {/* Show readings for the current topic */}
          {currentTopic.readings && currentTopic.readings.length > 0 && (
            <ReadingList readings={currentTopic.readings} topicTitle={decodeQuoteEntities(currentTopic.title)} />
          )}
        </div>
      );
    }

    // Subject overview
    return (
      <div class="content-main content-overview">
        <div class="overview-section">
          <h2>About This Subject</h2>
          <p class="overview-description">{decodeQuoteEntities(subject.description)}</p>
          <div class="overview-meta">
            <span class="meta-item">
              <span class="meta-icon" dangerouslySetInnerHTML={{ __html: Icons.Clock }} />
              {subject.estimatedHours} hours
            </span>
            <span class="meta-item">
              <span class="meta-icon" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
              {subject.topics.length} topics
            </span>
            {subjectExams.length > 0 && (
              <span class="meta-item">
                <span class="meta-icon" dangerouslySetInnerHTML={{ __html: Icons.StatQuiz }} />
                {subjectExams.length} exams
              </span>
            )}
            {subjectProjects.length > 0 && (
              <span class="meta-item">
                <span class="meta-icon" dangerouslySetInnerHTML={{ __html: Icons.StatProject }} />
                {subjectProjects.length} projects
              </span>
            )}
          </div>
        </div>

        <div class="overview-section">
          <h2>Learning Objectives</h2>
          <ul class="objectives-list">
            {subject.learningObjectives.map((objective, i) => (
              <li key={i}>{decodeQuoteEntities(objective)}</li>
            ))}
          </ul>
        </div>

        <div class="overview-section">
          <h2>Get Started</h2>
          <p>Select a topic from the sidebar to begin learning, or jump straight into practice.</p>
          <div class="overview-actions">
            {lastViewedSubtopicInfo && (
              <button
                class="btn btn-primary"
                onClick={handleContinueReadingClick}
              >
                Continue Reading: {decodeQuoteEntities(lastViewedSubtopicInfo.subtopic.title)}
                <span dangerouslySetInnerHTML={{ __html: Icons.ArrowRight }} />
              </button>
            )}
            {subject.topics.length > 0 && (
              <button
                class={`btn ${lastViewedSubtopicInfo ? 'btn-secondary' : 'btn-primary'}`}
                onClick={(e) => handleTopicClick(e, subject.topics[0].id)}
              >
                Start with {decodeQuoteEntities(subject.topics[0].title)}
                <span dangerouslySetInnerHTML={{ __html: Icons.ArrowRight }} />
              </button>
            )}
          </div>
        </div>

        {dependencyGraph && (
          <div class="overview-section subject-dependencies">
            <h3>Subject Dependencies</h3>
            <div ref={graphContainerRef} class="dependency-graph-container" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div class="content-navigator" data-mobile-panel={mobilePanel}>
      {/* Left sidebar */}
      <nav class="content-sidebar" aria-label="Subject navigation">
        {/* Mobile menu toggle */}
        <button
          type="button"
          class="mobile-menu-toggle"
          onClick={() => isMobileMenuOpen ? closeMobileMenu() : setIsMobileMenuOpen(true)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="subject-mobile-nav-panel"
        >
          <span class="toggle-leading-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
          <span class="toggle-copy">
            <span class="toggle-kicker">{subject.code} navigation</span>
            <span class="toggle-label">{mobileContextTitle}</span>
            <span class="toggle-meta">{mobileContextMeta}</span>
          </span>
          <span class="toggle-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: isMobileMenuOpen ? Icons.ChevronUp : Icons.ChevronDown }} />
        </button>

        {isMobileMenuOpen && (
          <button
            type="button"
            class="mobile-nav-scrim"
            aria-label="Close subject navigation"
            onClick={closeMobileMenu}
          />
        )}

        <div id="subject-mobile-nav-panel" class={`sidebar-content-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
          <div class="mobile-panel-header">
            <span class="mobile-panel-grabber" aria-hidden="true" />
            <div class="mobile-panel-title-group">
              <span class="mobile-panel-kicker">{subject.code}</span>
              <span class="mobile-panel-title">{decodeQuoteEntities(subject.title)}</span>
              <span class="mobile-panel-context">{practiceContextLabel}</span>
            </div>
            <button
              type="button"
              class="mobile-panel-close"
              aria-label="Close subject navigation"
              onClick={closeMobileMenu}
            >
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Cross }} />
            </button>
            <div class="mobile-panel-stats" aria-label="Subject progress">
              <span class="mobile-panel-stat">
                <span class="stat-value">{completedTopicCount}/{subject.topics.length}</span>
                <span class="stat-label">topics</span>
              </span>
              <span class="mobile-panel-stat">
                <span class="stat-value">{sectionProgressValue}</span>
                <span class="stat-label">sections</span>
              </span>
              <span class="mobile-panel-stat">
                <span class="stat-value">{practiceProgressValue}</span>
                <span class="stat-label">practice</span>
              </span>
            </div>
          </div>

          {/* Mobile panel tabs (shown via CSS on small screens) */}
          <div class="content-sidebar-tabs" role="tablist" aria-label="Subject panels">
            <button
              type="button"
              role="tab"
              class={`content-sidebar-tab ${mobilePanel === 'topics' ? 'active' : ''}`}
              aria-selected={mobilePanel === 'topics'}
              aria-controls="subject-topics-panel"
              onClick={() => handleMobilePanelChange('topics')}
            >
              <span class="tab-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
              <span class="tab-label">Topics</span>
              <span class="tab-count">{completedTopicCount}/{subject.topics.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              class={`content-sidebar-tab ${mobilePanel === 'practice' ? 'active' : ''}`}
              aria-selected={mobilePanel === 'practice'}
              aria-controls="subject-practice-panel"
              onClick={() => handleMobilePanelChange('practice')}
            >
              <span class="tab-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Progress }} />
              <span class="tab-label">Practice</span>
              <span class="tab-count">{practiceProgressValue}</span>
            </button>
          </div>

          {/* Topics section */}
          <div id="subject-topics-panel" class="sidebar-section topics-section" role="tabpanel">
            <div class="sidebar-section-header">
              <span class="section-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
              <span>Topics</span>
              <span class="section-count">{completedTopicCount}/{subject.topics.length}</span>
            </div>
            <div class="topic-list">
              {subject.topics.map((topic, index) => {
                const isActive = currentTopicId === topic.id;
                const isCompleted = isTopicCompleted(topic);
                const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
                const readingProgress = getTopicReadingProgress(topic);
                const practiceProgress = getTopicPracticeProgress(topic);

                return (
                  <div key={topic.id} class={`topic-group ${isActive ? 'active' : ''}`}>
                    <button
                      class={`topic-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={(e) => handleTopicClick(e, topic.id)}
                    >
                      <span class="topic-indicator" aria-hidden="true">
                        {isCompleted ? (
                          <span class="indicator-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span class="topic-copy">
                        <span class="topic-title">{decodeQuoteEntities(topic.title)}</span>
                        {hasSubtopics && (
                          <span class="topic-meta">{readingProgress.completed}/{readingProgress.total} sections</span>
                        )}
                      </span>
                      {practiceProgress.total > 0 && (
                        <span class="topic-progress">{practiceProgress.completed}/{practiceProgress.total} practice</span>
                      )}
                    </button>

                    {/* Subtopics (shown when topic is active) */}
                    {isActive && hasSubtopics && topic.subtopics && (
                      <div class="subtopic-list">
                        {topic.subtopics.map((subtopic) => {
                          const isSubtopicActive = currentSubtopicSlug === subtopic.slug;
                          const isViewed = isSubtopicViewed(subtopic.id);
                          const isCompleted = isSubtopicCompleted(subtopic.id);

                          return (
                            <button
                              key={subtopic.id}
                              class={`subtopic-item ${isSubtopicActive ? 'active' : ''} ${isViewed ? 'viewed' : ''} ${isCompleted ? 'completed' : ''}`}
                              onClick={(e) => handleSubtopicClick(e, topic.id, subtopic.slug)}
                            >
                              <span class="subtopic-indicator">
                                {isCompleted ? (
                                  <span class="indicator-check" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                                ) : isViewed ? (
                                  <span class="indicator-viewed" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.StatusInProgress }} />
                                ) : (
                                  <span class="indicator-dot" aria-hidden="true" />
                                )}
                              </span>
                              <span class="subtopic-title">{decodeQuoteEntities(subtopic.title)}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practice section */}
          <div id="subject-practice-panel" class="sidebar-section practice-section" role="tabpanel">
            <div class="sidebar-section-header">
              <span class="section-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Progress }} />
              <span>Practice</span>
              {scopedPracticeCount > 0 && (
                <span class="section-count">{completedPracticeCount}/{scopedPracticeCount}</span>
              )}
            </div>

            {!hasPracticeItems && (
              <div class="practice-empty">No practice items for this topic yet.</div>
            )}

            {/* Quizzes */}
            {practiceQuizzes.length > 0 && (
              <div class="practice-group">
                <div class="practice-group-header">
                  <span>Quizzes</span>
                  <span class="practice-count">
                    {practiceQuizzes.filter(q => isQuizPassed(q.id)).length}/{practiceQuizzes.length}
                  </span>
                </div>
                {practiceQuizzes.slice(0, showAllQuizzes ? undefined : INITIAL_QUIZ_COUNT).map((quiz, index) => {
                  const passed = isQuizPassed(quiz.id);
                  const attempted = isQuizAttempted(quiz.id);
                  const isActive = currentPracticeId === quiz.id;
                  return (
                    <button
                      key={quiz.id}
                      class={`practice-item ${passed ? 'completed' : attempted ? 'attempted' : ''} ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleQuizClick(e, quiz.id)}
                    >
                      <span class="practice-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Quiz }} />
                      <span class="practice-copy">
                        <span class="practice-title">Quiz {index + 1}</span>
                        <span class="practice-meta">{decodeQuoteEntities(quiz.title)}</span>
                      </span>
                      {passed && (
                        <span class="practice-check" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                      )}
                    </button>
                  );
                })}
                {practiceQuizzes.length > INITIAL_QUIZ_COUNT && (
                  <button class="practice-toggle" onClick={() => setShowAllQuizzes(!showAllQuizzes)}>
                    {showAllQuizzes ? 'Show less' : `+${practiceQuizzes.length - INITIAL_QUIZ_COUNT} more`}
                  </button>
                )}
              </div>
            )}

            {/* Exercises */}
            {practiceExercises.length > 0 && (
              <div class="practice-group">
                <div class="practice-group-header">
                  <span>Exercises</span>
                  <span class="practice-count">
                    {practiceExercises.filter(e => isExerciseComplete(e.id)).length}/{practiceExercises.length}
                  </span>
                </div>
                {practiceExercises.slice(0, showAllExercises ? undefined : INITIAL_EXERCISE_COUNT).map((exercise, index) => {
                  const completed = isExerciseComplete(exercise.id);
                  const isActive = currentPracticeId === exercise.id;
                  return (
                    <button
                      key={exercise.id}
                      class={`practice-item ${completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleExerciseClick(e, exercise.id)}
                    >
                      <span class="practice-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Code }} />
                      <span class="practice-copy">
                        <span class="practice-title">Exercise {index + 1}</span>
                        <span class="practice-meta">{decodeQuoteEntities(exercise.title)}</span>
                      </span>
                      {completed && (
                        <span class="practice-check" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                      )}
                    </button>
                  );
                })}
                {practiceExercises.length > INITIAL_EXERCISE_COUNT && (
                  <button class="practice-toggle" onClick={() => setShowAllExercises(!showAllExercises)}>
                    {showAllExercises ? 'Show less' : `+${practiceExercises.length - INITIAL_EXERCISE_COUNT} more`}
                  </button>
                )}
              </div>
            )}

            {/* Exams */}
            {subjectExams.length > 0 && (
              <div class="practice-group">
                <div class="practice-group-header">
                  <span>Exams</span>
                </div>
                {subjectExams.map((exam) => {
                  const attempted = isExamAttempted(exam.id);
                  const isActive = currentPracticeId === exam.id;
                  return (
                    <button
                      key={exam.id}
                      class={`practice-item exam-item ${attempted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleExamClick(e, exam.id)}
                    >
                      <span class="practice-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.StatQuiz }} />
                      <span class="practice-copy">
                        <span class="practice-title">{decodeQuoteEntities(exam.title)}</span>
                        <span class="practice-meta">Exam</span>
                      </span>
                      {attempted && (
                        <span class="practice-check" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Projects */}
            {subjectProjects.length > 0 && (
              <div class="practice-group">
                <div class="practice-group-header">
                  <span>Projects</span>
                </div>
                {subjectProjects.map((project) => {
                  const submitted = hasProjectSubmission(project.id);
                  return (
                    <button
                      key={project.id}
                      class={`practice-item project-item ${submitted ? 'completed' : ''}`}
                      onClick={(e) => handleProjectClick(e, project.id)}
                    >
                      <span class="practice-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.StatProject }} />
                      <span class="practice-copy">
                        <span class="practice-title">{decodeQuoteEntities(project.title)}</span>
                        <span class="practice-meta">Project</span>
                      </span>
                      {submitted && (
                        <span class="practice-check" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content area with header */}
      <main class="content-area">
        {children ? (
          // Custom content (e.g., exercise, quiz, exam pages)
          children
        ) : (
          <>
            {/* Breadcrumb */}
            <nav class="breadcrumb">
              <a href="#/curriculum">Curriculum</a>
              <span class="separator" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
              {currentTopic ? (
                <>
                  <a href={`#/subject/${subject.id}`}>{subject.code}</a>
                  <span class="separator" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
                  {currentSubtopic ? (
                    <>
                      <a href={`#/subject/${subject.id}/topic/${currentTopic.id}`}>{decodeQuoteEntities(currentTopic.title)}</a>
                      <span class="separator" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
                      <span class="current">{decodeQuoteEntities(currentSubtopic.title)}</span>
                    </>
                  ) : (
                    <span class="current">{decodeQuoteEntities(currentTopic.title)}</span>
                  )}
                </>
              ) : (
                <span class="current">{decodeQuoteEntities(subject.title)}</span>
              )}
            </nav>

            {/* Header */}
            <header class="content-header">
              <div class="content-title-row">
                <div>
                  <span class="subject-code">{subject.code}</span>
                  <h1>{decodeQuoteEntities(currentTopic ? currentTopic.title : subject.title)}</h1>
                </div>
                {currentTopic ? (
                  currentSubtopic && subtopicIndex >= 0 ? (
                    <span class="topic-counter">Section {subtopicIndex + 1} of {subtopicCount}</span>
                  ) : (
                    <span class="topic-counter">Topic {topicIndex + 1} of {subject.topics.length}</span>
                  )
                ) : (
                  <div class={`subject-status-badge status-${progressStatus.replace('_', '-')}`}>
                    {formatStatus(progressStatus)}
                  </div>
                )}
              </div>
            </header>

            {!prerequisitesMet && prerequisiteSubjects.length > 0 && (
              <section class="prerequisites-warning">
                <h3>Prerequisites Required</h3>
                <p>Complete these subjects first:</p>
                <ul class="prerequisite-list">
                  {prerequisiteSubjects.map(prereq => (
                    <li key={prereq.id}>
                      <a href={`#/subject/${prereq.id}`} class="prereq-link">
                        {decodeQuoteEntities(prereq.title)} ({prereq.code})
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {renderContent()}
          </>
        )}
      </main>
    </div>
  );
}
