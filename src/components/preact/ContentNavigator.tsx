import { h, Fragment } from 'preact';
import { useState, useCallback, useMemo, useEffect } from 'preact/hooks';
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
import { renderMarkdown } from '@/components/markdown';

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
}: ContentNavigatorProps) {
  const [showAllExercises, setShowAllExercises] = useState(false);
  const [showAllQuizzes, setShowAllQuizzes] = useState(false);

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

  const currentSubtopic = useMemo(() => {
    if (!currentTopic?.subtopics?.length || !currentSubtopicSlug) return null;
    return currentTopic.subtopics.find(st => st.slug === currentSubtopicSlug) || currentTopic.subtopics[0];
  }, [currentTopic, currentSubtopicSlug]);

  const topicIndex = currentTopic ? subject.topics.findIndex(t => t.id === currentTopicId) : -1;

  // Track subtopic view
  useEffect(() => {
    if (currentSubtopic) {
      onSubtopicView(currentSubtopic.id);
    }
  }, [currentSubtopic?.id]);

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
    const topic = subject.topics.find(t => t.id === topicId);
    if (topic?.subtopics?.length) {
      navigateToSubtopic(subject.id, topicId, topic.subtopics[0].slug);
    } else {
      navigateToTopic(subject.id, topicId);
    }
  }, [subject]);

  const handleSubtopicClick = useCallback((e: Event, topicId: string, slug: string) => {
    e.preventDefault();
    navigateToSubtopic(subject.id, topicId, slug);
  }, [subject.id]);

  const handleQuizClick = useCallback((e: Event, quizId: string) => {
    e.preventDefault();
    navigateToQuiz(subject.id, quizId);
  }, [subject.id]);

  const handleExerciseClick = useCallback((e: Event, exerciseId: string) => {
    e.preventDefault();
    navigateToExercise(subject.id, exerciseId);
  }, [subject.id]);

  const handleExamClick = useCallback((e: Event, examId: string) => {
    e.preventDefault();
    navigateToExam(subject.id, examId);
  }, [subject.id]);

  const handleProjectClick = useCallback((e: Event, projectId: string) => {
    e.preventDefault();
    navigateToProject(subject.id, projectId);
  }, [subject.id]);

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
          {subject.topics.length > 0 && (
            <button
              class="btn btn-primary"
              onClick={(e) => handleTopicClick(e, subject.topics[0].id)}
            >
              Start with {subject.topics[0].title}
              <span dangerouslySetInnerHTML={{ __html: Icons.ArrowRight }} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div class="content-navigator">
      {/* Left sidebar */}
      <nav class="content-sidebar" aria-label="Subject navigation">
        {/* Topics section */}
        <div class="sidebar-section">
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
                    <span class="topic-indicator">
                      {isCompleted ? (
                        <span class="indicator-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                      ) : (
                        <span class="indicator-number">{index + 1}</span>
                      )}
                    </span>
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

          {/* Quizzes */}
          {subjectQuizzes.length > 0 && (
            <div class="practice-group">
              <div class="practice-group-header">
                <span>Quizzes</span>
                <span class="practice-count">
                  {subjectQuizzes.filter(q => isQuizAttempted(q.id)).length}/{subjectQuizzes.length}
                </span>
              </div>
              {subjectQuizzes.slice(0, showAllQuizzes ? undefined : INITIAL_QUIZ_COUNT).map((quiz, index) => {
                const attempted = isQuizAttempted(quiz.id);
                return (
                  <button
                    key={quiz.id}
                    class={`practice-item ${attempted ? 'completed' : ''}`}
                    onClick={(e) => handleQuizClick(e, quiz.id)}
                  >
                    <span class="practice-title">Quiz {index + 1}</span>
                    {attempted && (
                      <span class="practice-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                    )}
                  </button>
                );
              })}
              {subjectQuizzes.length > INITIAL_QUIZ_COUNT && (
                <button class="practice-toggle" onClick={() => setShowAllQuizzes(!showAllQuizzes)}>
                  {showAllQuizzes ? 'Show less' : `+${subjectQuizzes.length - INITIAL_QUIZ_COUNT} more`}
                </button>
              )}
            </div>
          )}

          {/* Exercises */}
          {subjectExercises.length > 0 && (
            <div class="practice-group">
              <div class="practice-group-header">
                <span>Exercises</span>
                <span class="practice-count">
                  {subjectExercises.filter(e => isExerciseComplete(e.id)).length}/{subjectExercises.length}
                </span>
              </div>
              {subjectExercises.slice(0, showAllExercises ? undefined : INITIAL_EXERCISE_COUNT).map((exercise, index) => {
                const completed = isExerciseComplete(exercise.id);
                return (
                  <button
                    key={exercise.id}
                    class={`practice-item ${completed ? 'completed' : ''}`}
                    onClick={(e) => handleExerciseClick(e, exercise.id)}
                  >
                    <span class="practice-title">Exercise {index + 1}</span>
                    {completed && (
                      <span class="practice-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                    )}
                  </button>
                );
              })}
              {subjectExercises.length > INITIAL_EXERCISE_COUNT && (
                <button class="practice-toggle" onClick={() => setShowAllExercises(!showAllExercises)}>
                  {showAllExercises ? 'Show less' : `+${subjectExercises.length - INITIAL_EXERCISE_COUNT} more`}
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
                return (
                  <button
                    key={exam.id}
                    class={`practice-item exam-item ${attempted ? 'completed' : ''}`}
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
      </nav>

      {/* Main content area with header */}
      <main class="content-area">
        {/* Breadcrumb */}
        <nav class="breadcrumb">
          <a href="#/curriculum">Curriculum</a>
          <span class="separator" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
          {currentTopic ? (
            <>
              <a href={`#/subject/${subject.id}`}>{subject.code}</a>
              <span class="separator" dangerouslySetInnerHTML={{ __html: Icons.ChevronRight }} />
              <span class="current">{currentTopic.title}</span>
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
              <span class="topic-counter">Topic {topicIndex + 1} of {subject.topics.length}</span>
            ) : (
              <div class={`subject-status-badge status-${progressStatus.replace('_', '-')}`}>
                {formatStatus(progressStatus)}
              </div>
            )}
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}
