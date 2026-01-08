// Quiz page rendering with ContentNavigator wrapper
import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import type { Subject, Quiz, QuizAttempt, Exercise, Exam, Project } from '@/core/types';
import { QUIZ_PASSING_SCORE } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderNotFound, formatDate } from './assessment-utils';
import { render } from 'preact';
import { Quiz as QuizComponent, ContentNavigator } from '@/components/preact';

interface QuizPageContentProps {
  subject: Subject;
  quiz: Quiz;
}

function QuizPageContent({ subject, quiz }: QuizPageContentProps) {
  const subjectId = subject.id;
  const quizId = quiz.id;

  const [attempts, setAttempts] = useState(() =>
    progressStorage.getQuizAttempts(subjectId, quizId)
  );
  const [quizMode, setQuizMode] = useState<'start' | 'active' | 'completed'>('start');

  const bestAttempt = attempts.length > 0
    ? attempts.reduce((best, current) => current.score > best.score ? current : best)
    : null;

  const handleStartQuiz = useCallback(() => {
    setQuizMode('active');
  }, []);

  const handleQuizComplete = useCallback((attempt: QuizAttempt) => {
    progressStorage.addQuizAttempt(subjectId, quizId, attempt);
    const updatedAttempts = progressStorage.getQuizAttempts(subjectId, quizId);
    setAttempts(updatedAttempts);
    setQuizMode('completed');
  }, [subjectId, quizId]);

  const handleRetry = useCallback(() => {
    setQuizMode('start');
  }, []);

  const handleBackToSubject = useCallback(() => {
    navigateToSubject(subjectId);
  }, [subjectId]);

  return (
    <div class="quiz-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href={`#/subject/${subjectId}`}>{subject.title}</a>
        <span class="separator">/</span>
        <span class="current">{quiz.title}</span>
      </nav>

      <header class="quiz-header">
        <div class="quiz-title-section">
          <h1>{quiz.title}</h1>
          {bestAttempt && (
            <div class="best-score">
              <span class="label">Best Score:</span>
              <span class={`score ${bestAttempt.score >= QUIZ_PASSING_SCORE ? 'passed' : 'failed'}`}>
                {bestAttempt.score}%
              </span>
            </div>
          )}
        </div>
        <div class="quiz-info">
          <span class="info-item">
            <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.Help }} />
            {quiz.questions.length} questions
          </span>
          {attempts.length > 0 && (
            <span class="info-item">
              <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.Refresh }} />
              {attempts.length} attempt{attempts.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </header>

      {attempts.length > 0 && (
        <section class="previous-attempts">
          <h2>Previous Attempts</h2>
          <div class="attempts-list">
            {attempts.slice(-5).reverse().map((attempt, index) => (
              <div
                key={attempt.timestamp}
                class={`attempt-card ${attempt.score >= QUIZ_PASSING_SCORE ? 'passed' : 'failed'}`}
              >
                <div class="attempt-info">
                  <span class="attempt-number">Attempt {attempts.length - index}</span>
                  <span class="attempt-date">{formatDate(attempt.timestamp)}</span>
                </div>
                <div class="attempt-score">{attempt.score}%</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section class="quiz-content">
        <div id="quiz-container">
          {quizMode === 'start' && (
            <div class="quiz-start">
              <h2>Ready to {attempts.length > 0 ? 'try again' : 'start'}?</h2>
              <p>This quiz contains {quiz.questions.length} questions. Take your time and good luck!</p>
              <button class="btn btn-primary btn-large" onClick={handleStartQuiz}>
                {attempts.length > 0 ? 'Start New Attempt' : 'Start Quiz'}
              </button>
            </div>
          )}
          {quizMode === 'active' && (
            <QuizComponent quiz={quiz} onComplete={handleQuizComplete} />
          )}
          {quizMode === 'completed' && (
            <div class="quiz-start">
              <h2>Quiz Completed!</h2>
              <p>Your score has been recorded. You can review your attempts above or try again.</p>
              <button class="btn btn-primary btn-large" onClick={handleRetry}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </section>

      <div class="quiz-actions">
        {attempts.length > 0 && quizMode !== 'active' && (
          <button class="btn btn-secondary" onClick={handleRetry}>
            <span dangerouslySetInnerHTML={{ __html: Icons.Refresh }} /> Retry Quiz
          </button>
        )}
        <button class="btn btn-secondary" onClick={handleBackToSubject}>
          <span dangerouslySetInnerHTML={{ __html: Icons.ChevronLeft }} /> Back to Subject
        </button>
      </div>
    </div>
  );
}

/**
 * Render quiz page
 */
export function renderQuizPage(
  container: HTMLElement,
  subjects: Subject[],
  quizzes: Quiz[],
  subjectId: string,
  quizId: string,
  exercises: Exercise[] = [],
  exams: Exam[] = [],
  projects: Project[] = []
): void {
  const subject = subjects.find(s => s.id === subjectId);
  const quiz = quizzes.find(q => q.id === quizId);

  if (!subject || !quiz) {
    renderNotFound(container, 'Quiz', subjectId);
    return;
  }

  // Get progress for the sidebar
  const userProgress = progressStorage.getProgress();
  const subjectProgress = userProgress.subjects[subjectId];

  container.innerHTML = '';
  render(
    <ContentNavigator
      key={quizId}
      subject={subject}
      currentTopicId={quiz.topicId}
      progress={subjectProgress}
      progressStatus={subjectProgress?.status || 'not_started'}
      quizzes={quizzes}
      exercises={exercises}
      exams={exams}
      projects={projects}
      currentPracticeId={quizId}
      onSubtopicView={() => {}}
    >
      <QuizPageContent subject={subject} quiz={quiz} />
    </ContentNavigator>,
    container
  );
}
