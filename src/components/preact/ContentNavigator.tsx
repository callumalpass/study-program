import { h, Fragment, ComponentChildren } from 'preact';
import { useState, useCallback, useMemo, useEffect, useRef } from 'preact/hooks';
import type { Subject, Topic, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Icons } from '@/components/icons';
import {
  navigateToTopic,
  navigateToSubtopic,
  navigateToQuiz,
  navigateToExercise,
  navigateToExam,
  navigateToProject,
} from '@/core/router';
import { renderMarkdown, renderMermaidDiagrams } from '@/components/markdown';
import { ReadingList } from './ReadingList';
import { progressStorage } from '@/core/storage';

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
  const [mobilePanel, setMobilePanel] = useState<'topics' | 'practice'>('topics');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const graphContainerRef = useRef<HTMLDivElement>(null);

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

  // Render Mermaid diagrams after content updates
  useEffect(() => {
    renderMermaidDiagrams();
  }, [currentSubtopic?.id, currentTopic?.id]);

  // Progress helpers
  const isTopicCompleted = useCallback((topic: Topic): boolean => {
    if (!progress) return false;
    const quizzesComplete = topic.quizIds.every(qid => {
      const attempts = progress.quizAttempts?.[qid];
      return attempts && attempts.length > 0;
    });
    const exercisesComplete = topic.exerciseIds.every(eid => {
      const completion = progress.exerciseCompletions?.[eid];
      return completion?.passed;
    });
    return quizzesComplete && exercisesComplete;
  }, [progress]);

  const getTopicProgress = useCallback((topic: Topic): { completed: number; total: number } => {
    if (!progress) return { completed: 0, total: topic.quizIds.length + topic.exerciseIds.length };

    const quizzesCompleted = topic.quizIds.filter(qid => {
      const attempts = progress.quizAttempts?.[qid];
      return attempts && attempts.length > 0;
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

  const isSubtopicViewed = useCallback((subtopicId: string): boolean => {
    return progress?.subtopicViews?.[subtopicId] !== undefined;
  }, [progress]);

  const isQuizAttempted = useCallback((quizId: string): boolean => {
    const attempts = progress?.quizAttempts?.[quizId];
    return Boolean(attempts && attempts.length > 0);
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

  // Navigation handlers
  const handleTopicClick = useCallback((e: Event, topicId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const topic = subject.topics.find(t => t.id === topicId);
    if (topic?.subtopics?.length) {
      navigateToSubtopic(subject.id, topicId, topic.subtopics[0].slug);
    } else {
      navigateToTopic(subject.id, topicId);
    }
  }, [subject]);

  const handleSubtopicClick = useCallback((e: Event, topicId: string, slug: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigateToSubtopic(subject.id, topicId, slug);
  }, [subject.id]);

  const handleQuizClick = useCallback((e: Event, quizId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigateToQuiz(subject.id, quizId);
  }, [subject.id]);

  const handleExerciseClick = useCallback((e: Event, exerciseId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigateToExercise(subject.id, exerciseId);
  }, [subject.id]);

  const handleExamClick = useCallback((e: Event, examId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigateToExam(subject.id, examId);
  }, [subject.id]);

  const handleProjectClick = useCallback((e: Event, projectId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigateToProject(subject.id, projectId);
  }, [subject.id]);

  const handleContinueReadingClick = useCallback((e: Event) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (lastViewedSubtopicInfo) {
      navigateToSubtopic(subject.id, lastViewedSubtopicInfo.topic.id, lastViewedSubtopicInfo.subtopic.slug);
    }
  }, [subject.id, lastViewedSubtopicInfo]);

  // Render content based on current state
  const renderContent = () => {
    if (currentSubtopic) {
      // Render subtopic content with pagination
      const subtopics = currentTopic!.subtopics!;
      const currentIndex = subtopics.findIndex(st => st.id === currentSubtopic.id);
      const prevSubtopic = currentIndex > 0 ? subtopics[currentIndex - 1] : null;
      const nextSubtopic = currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : null;

      return (
        <div class="content-main">
          <div
            class="content-body markdown-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentSubtopic.content) }}
          />
          {/* Show readings for the current topic */}
          {currentTopic?.readings && currentTopic.readings.length > 0 && (
            <ReadingList readings={currentTopic.readings} topicTitle={currentTopic.title} />
          )}
          <nav class="content-pagination">
            <div class="pagination-left">
              {prevSubtopic && (
                <a
                  href={`#/subject/${subject.id}/topic/${currentTopic!.id}/subtopic/${prevSubtopic.slug}`}
                  class="pagination-link prev"
                >
                  <span class="pagination-icon" dangerouslySetInnerHTML={{ __html: Icons.ChevronLeft }} />
                  <span class="pagination-text">
                    <span class="pagination-label">Previous</span>
                    <span class="pagination-title">{prevSubtopic.title}</span>
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
                  href={`#/subject/${subject.id}/topic/${currentTopic!.id}/subtopic/${nextSubtopic.slug}`}
                  class="pagination-link next"
                >
                  <span class="pagination-text">
                    <span class="pagination-label">Next</span>
                    <span class="pagination-title">{nextSubtopic.title}</span>
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
            <ReadingList readings={currentTopic.readings} topicTitle={currentTopic.title} />
          )}
        </div>
      );
    }

    // Subject overview
    return (
      <div class="content-main content-overview">
        <div class="overview-section">
          <h2>About This Subject</h2>
          <p class="overview-description">{subject.description}</p>
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
              <li key={i}>{objective}</li>
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
                Continue Reading: {lastViewedSubtopicInfo.subtopic.title}
                <span dangerouslySetInnerHTML={{ __html: Icons.ArrowRight }} />
              </button>
            )}
            {subject.topics.length > 0 && (
              <button
                class={`btn ${lastViewedSubtopicInfo ? 'btn-secondary' : 'btn-primary'}`}
                onClick={(e) => handleTopicClick(e, subject.topics[0].id)}
              >
                Start with {subject.topics[0].title}
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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
        >
          <span class="toggle-label">{currentTopic ? currentTopic.title : 'Menu'}</span>
          <span class="toggle-icon" dangerouslySetInnerHTML={{ __html: isMobileMenuOpen ? Icons.ChevronUp : Icons.ChevronDown }} />
        </button>

        <div class={`sidebar-content-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* Mobile panel tabs (shown via CSS on small screens) */}
          <div class="content-sidebar-tabs" role="tablist" aria-label="Subject panels">
            <button
              type="button"
              class={`content-sidebar-tab ${mobilePanel === 'topics' ? 'active' : ''}`}
              aria-selected={mobilePanel === 'topics'}
              onClick={() => setMobilePanel('topics')}
            >
              <span class="tab-icon" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
              <span class="tab-label">Topics</span>
            </button>
            <button
              type="button"
              class={`content-sidebar-tab ${mobilePanel === 'practice' ? 'active' : ''}`}
              aria-selected={mobilePanel === 'practice'}
              onClick={() => setMobilePanel('practice')}
            >
              <span class="tab-icon" dangerouslySetInnerHTML={{ __html: Icons.Progress }} />
              <span class="tab-label">Practice</span>
            </button>
          </div>

          {/* Topics section */}
          <div class="sidebar-section topics-section">
            <div class="sidebar-section-header">
              <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
              <span>Topics</span>
            </div>
            <div class="topic-list">
              {subject.topics.map((topic, index) => {
                const isActive = currentTopicId === topic.id;
                const isCompleted = isTopicCompleted(topic);
                const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
                const topicProgress = getTopicProgress(topic);

                return (
                  <div key={topic.id} class={`topic-group ${isActive ? 'active' : ''}`}>
                    <button
                      class={`topic-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={(e) => handleTopicClick(e, topic.id)}
                    >
                      <span class="topic-title">{topic.title}</span>
                      {topicProgress.total > 0 && !isCompleted && (
                        <span class="topic-progress">{topicProgress.completed}/{topicProgress.total}</span>
                      )}
                    </button>

                    {/* Subtopics (shown when topic is active) */}
                    {isActive && hasSubtopics && (
                      <div class="subtopic-list">
                        {topic.subtopics!.map((subtopic) => {
                          const isSubtopicActive = currentSubtopicSlug === subtopic.slug;
                          const isViewed = isSubtopicViewed(subtopic.id);

                          return (
                            <button
                              key={subtopic.id}
                              class={`subtopic-item ${isSubtopicActive ? 'active' : ''} ${isViewed ? 'viewed' : ''}`}
                              onClick={(e) => handleSubtopicClick(e, topic.id, subtopic.slug)}
                            >
                              <span class="subtopic-indicator">
                                {isViewed ? (
                                  <span class="indicator-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                                ) : (
                                  <span class="indicator-dot" />
                                )}
                              </span>
                              <span class="subtopic-title">{subtopic.title}</span>
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
          <div class="sidebar-section practice-section">
            <div class="sidebar-section-header">
              <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.Progress }} />
              <span>Practice</span>
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
                    {practiceQuizzes.filter(q => isQuizAttempted(q.id)).length}/{practiceQuizzes.length}
                  </span>
                </div>
                {practiceQuizzes.slice(0, showAllQuizzes ? undefined : INITIAL_QUIZ_COUNT).map((quiz, index) => {
                  const attempted = isQuizAttempted(quiz.id);
                  const isActive = currentPracticeId === quiz.id;
                  return (
                    <button
                      key={quiz.id}
                      class={`practice-item ${attempted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleQuizClick(e, quiz.id)}
                    >
                      <span class="practice-title">Quiz {index + 1}</span>
                      {attempted && (
                        <span class="practice-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
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
                      <span class="practice-title">Exercise {index + 1}</span>
                      {completed && (
                        <span class="practice-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
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
                      <span class="practice-title">{exam.title}</span>
                      {attempted && (
                        <span class="practice-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
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
                      <span class="practice-title">{project.title}</span>
                      {submitted && (
                        <span class="practice-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
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
                      <a href={`#/subject/${subject.id}/topic/${currentTopic.id}`}>{currentTopic.title}</a>
                      <span class="separator" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
                      <span class="current">{currentSubtopic.title}</span>
                    </>
                  ) : (
                    <span class="current">{currentTopic.title}</span>
                  )}
                </>
              ) : (
                <span class="current">{subject.title}</span>
              )}
            </nav>

            {/* Header */}
            <header class="content-header">
              <div class="content-title-row">
                <div>
                  <span class="subject-code">{subject.code}</span>
                  <h1>{currentTopic ? currentTopic.title : subject.title}</h1>
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
                  {prerequisiteSubjects.map(prereq => {
                    const prereqProgress = progress;
                    const isCompleted = false; // We know it's not completed since prerequisites aren't met
                    return (
                      <li key={prereq.id} class={isCompleted ? 'completed' : ''}>
                        <a href={`#/subject/${prereq.id}`} class="prereq-link">
                          {prereq.title} ({prereq.code})
                        </a>
                      </li>
                    );
                  })}
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
