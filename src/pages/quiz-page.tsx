// Quiz page rendering with ContentNavigator wrapper
import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import type { Subject, Quiz, QuizAttempt, Exercise, Exam, Project, QuizQuestion } from '@/core/types';
import { QUIZ_PASSING_SCORE } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderNotFound, formatDate } from './assessment-utils';
import { render } from 'preact';
import { Quiz as QuizComponent, ContentNavigator } from '@/components/preact';
import { checkAnswer } from '@/utils/quiz-utils';
import { renderMarkdown } from '@/components/markdown';

interface QuizPageContentProps {
  subject: Subject;
  quiz: Quiz;
}

function getTopicReadingHref(subject: Subject, quiz: Quiz): string {
  const topic = subject.topics.find(t => t.id === quiz.topicId);
  const firstSubtopic = topic?.subtopics?.[0];

  if (topic && firstSubtopic) {
    return `#/subject/${subject.id}/topic/${topic.id}/subtopic/${firstSubtopic.slug}`;
  }

  return topic
    ? `#/subject/${subject.id}/topic/${topic.id}`
    : `#/subject/${subject.id}`;
}

function MissedQuestionReview({
  questions,
  attempt,
}: {
  questions: QuizQuestion[];
  attempt: QuizAttempt;
}) {
  const missed = questions.filter(question => !checkAnswer(question, attempt.answers[question.id]));

  if (missed.length === 0) {
    return (
      <div class="missed-question-list empty">
        <p>No missed questions on this attempt.</p>
      </div>
    );
  }

  return (
    <div class="missed-question-list">
      {missed.map((question, index) => (
        <article class="missed-question-card" key={question.id}>
          <span class="missed-question-number">Missed question {index + 1}</span>
          <div
            class="missed-question-prompt markdown-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(question.prompt) }}
          />
          <div class="missed-question-explanation">
            <h3>Explanation</h3>
            <div
              class="markdown-content"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(question.explanation) }}
            />
          </div>
        </article>
      ))}
    </div>
  );
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
  const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
  const latestMissedCount = latestAttempt
    ? quiz.questions.filter(question => !checkAnswer(question, latestAttempt.answers[question.id])).length
    : 0;
  const topicReadingHref = getTopicReadingHref(subject, quiz);

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
    <div class="quiz-page" data-quiz-mode={quizMode}>
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
            latestAttempt && (
              <div class="quiz-recovery-block">
                <div class="quiz-recovery-header">
                  <span class="quiz-recovery-icon" dangerouslySetInnerHTML={{ __html: latestAttempt.score >= QUIZ_PASSING_SCORE ? Icons.Check : Icons.Review }} />
                  <div>
                    <span class="quiz-recovery-kicker">Review Before Retrying</span>
                    <h2>
                      {latestMissedCount > 0
                        ? `You missed ${latestMissedCount} question${latestMissedCount === 1 ? '' : 's'} from this topic.`
                        : 'You answered every question correctly.'}
                    </h2>
                    <p>
                      {latestAttempt.score >= QUIZ_PASSING_SCORE
                        ? 'Your score has been recorded. Review the explanations or continue practicing.'
                        : 'Your score is below passing, so this quiz remains in your review loop.'}
                    </p>
                  </div>
                </div>

                <MissedQuestionReview questions={quiz.questions} attempt={latestAttempt} />

                <div class="quiz-recovery-actions">
                  <a class="btn btn-secondary" href={topicReadingHref}>
                    <span dangerouslySetInnerHTML={{ __html: Icons.BookOpen }} /> Review Topic
                  </a>
                  <button class="btn btn-primary" onClick={handleRetry}>
                    <span dangerouslySetInnerHTML={{ __html: Icons.Refresh }} /> Retry Quiz
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <div class="quiz-actions">
        {attempts.length > 0 && quizMode === 'start' && (
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
