import { h } from 'preact';
import { useCallback, useMemo, useEffect } from 'preact/hooks';
import type { Topic, Subtopic, SubjectProgress, Quiz, Exercise } from '@/core/types';
import { Icons } from '@/components/icons';
import { navigateToSubtopic, navigateToQuiz, navigateToExercise } from '@/core/router';
import { renderMarkdown, renderMermaidDiagrams } from '@/components/markdown';

interface SubtopicNavigatorProps {
  subjectId: string;
  topic: Topic;
  currentSubtopicSlug?: string;
  progress?: SubjectProgress;
  quizzes: Quiz[];
  exercises: Exercise[];
  onSubtopicView: (subtopicId: string) => void;
}

const INITIAL_EXERCISE_COUNT = 5;

export function SubtopicNavigator({
  subjectId,
  topic,
  currentSubtopicSlug,
  progress,
  quizzes,
  exercises,
  onSubtopicView,
}: SubtopicNavigatorProps) {
  const subtopics = topic.subtopics || [];
  const topicQuizzes = quizzes.filter(q => q.topicId === topic.id);
  const topicExercises = exercises.filter(e => e.topicId === topic.id);

  // Find current subtopic
  const currentSubtopic = useMemo(() =>
    subtopics.find(st => st.slug === currentSubtopicSlug) || subtopics[0],
    [subtopics, currentSubtopicSlug]
  );

  // Get current index for pagination
  const currentIndex = useMemo(() =>
    currentSubtopic ? subtopics.findIndex(st => st.id === currentSubtopic.id) : 0,
    [subtopics, currentSubtopic]
  );

  const prevSubtopic = currentIndex > 0 ? subtopics[currentIndex - 1] : null;
  const nextSubtopic = currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : null;

  // Track view when subtopic changes
  useEffect(() => {
    if (currentSubtopic) {
      onSubtopicView(currentSubtopic.id);
    }
  }, [currentSubtopic?.id]);

  // Render Mermaid diagrams after content updates
  useEffect(() => {
    renderMermaidDiagrams();
  }, [currentSubtopic?.id]);

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

  const handleSubtopicClick = useCallback((e: Event, slug: string) => {
    e.preventDefault();
    navigateToSubtopic(subjectId, topic.id, slug);
  }, [subjectId, topic.id]);

  const handleQuizClick = useCallback((e: Event, quizId: string) => {
    e.preventDefault();
    navigateToQuiz(subjectId, quizId);
  }, [subjectId]);

  const handleExerciseClick = useCallback((e: Event, exerciseId: string) => {
    e.preventDefault();
    navigateToExercise(subjectId, exerciseId);
  }, [subjectId]);

  // Calculate progress stats
  const viewedCount = subtopics.filter(st => isSubtopicViewed(st.id)).length;

  return (
    <div class="subtopic-navigator">
      {/* Left sidebar with vertical tabs */}
      <nav class="subtopic-sidebar" aria-label="Subtopic navigation">
        <div class="subtopic-section">
          <div class="subtopic-section-header">
            <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.Curriculum }} />
            <span>Sections</span>
            <span class="section-count">{viewedCount}/{subtopics.length}</span>
          </div>
          <div class="subtopic-tabs">
            {subtopics.map((subtopic) => {
              const isActive = currentSubtopic?.id === subtopic.id;
              const isViewed = isSubtopicViewed(subtopic.id);

              return (
                <button
                  key={subtopic.id}
                  class={`subtopic-tab ${isActive ? 'active' : ''} ${isViewed ? 'viewed' : ''}`}
                  onClick={(e) => handleSubtopicClick(e, subtopic.slug)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span class="tab-indicator">
                    {isViewed ? (
                      <span class="tab-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                    ) : (
                      <span class="tab-number">{subtopic.order}</span>
                    )}
                  </span>
                  <span class="tab-title">{subtopic.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Practice section */}
        {(topicQuizzes.length > 0 || topicExercises.length > 0) && (
          <div class="subtopic-section practice-section">
            <div class="subtopic-section-header">
              <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.Progress }} />
              <span>Practice</span>
            </div>

            {topicQuizzes.length > 0 && (
              <div class="practice-group">
                <div class="practice-group-label">Quizzes</div>
                {topicQuizzes.map((quiz, index) => {
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
              </div>
            )}

            {topicExercises.length > 0 && (
              <div class="practice-group">
                <div class="practice-group-label">Exercises</div>
                {topicExercises.slice(0, INITIAL_EXERCISE_COUNT).map((exercise, index) => {
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
                {topicExercises.length > INITIAL_EXERCISE_COUNT && (
                  <div class="practice-more">
                    +{topicExercises.length - INITIAL_EXERCISE_COUNT} more exercises
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Main content area */}
      <main class="subtopic-content">
        {currentSubtopic && (
          <div
            class="content-body markdown-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(currentSubtopic.content) }}
          />
        )}

        {/* Prev/Next navigation */}
        <nav class="subtopic-pagination">
          <div class="pagination-left">
            {prevSubtopic && (
              <a
                href={`#/subject/${subjectId}/topic/${topic.id}/subtopic/${prevSubtopic.slug}`}
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
            <span class="pagination-counter">
              {currentIndex + 1} / {subtopics.length}
            </span>
          </div>
          <div class="pagination-right">
            {nextSubtopic && (
              <a
                href={`#/subject/${subjectId}/topic/${topic.id}/subtopic/${nextSubtopic.slug}`}
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
      </main>
    </div>
  );
}
