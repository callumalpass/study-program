import { h, Fragment } from 'preact';
import { useState, useCallback, useRef } from 'preact/hooks';
import type { Subject, Exam, QuizQuestion, ExamAttempt } from '@/core/types';
import { QUIZ_PASSING_SCORE } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToSubject } from '@/core/router';
import { Icons } from '@/components/icons';
import { Quiz } from './Quiz';
import { PracticeMode } from './PracticeMode';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface ExamPageProps {
  subject: Subject;
  exam: Exam;
}

type ExamMode = 'start' | 'exam' | 'practice';

export function ExamPage({ subject, exam }: ExamPageProps) {
  const [mode, setMode] = useState<ExamMode>('start');
  const [attempts, setAttempts] = useState(() =>
    progressStorage.getExamAttempts(subject.id, exam.id)
  );

  const bestAttempt = attempts.length > 0
    ? attempts.reduce((best, current) => current.score > best.score ? current : best)
    : null;

  const hasApiKey = !!progressStorage.getSettings().geminiApiKey;

  const handleStartExam = useCallback(() => {
    setMode('exam');
  }, []);

  const handleStartPractice = useCallback(() => {
    setMode('practice');
  }, []);

  const handleExamComplete = useCallback((attempt: ExamAttempt) => {
    progressStorage.addExamAttempt(subject.id, exam.id, attempt);
    setAttempts(progressStorage.getExamAttempts(subject.id, exam.id));
  }, [subject.id, exam.id]);

  const handleExitPractice = useCallback(() => {
    setMode('start');
  }, []);

  const handleReset = useCallback(() => {
    setMode('start');
  }, []);

  const handleBackToSubject = useCallback(() => {
    navigateToSubject(subject.id);
  }, [subject.id]);

  return (
    <div class="quiz-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href={`#/subject/${subject.id}`}>{subject.title}</a>
        <span class="separator">/</span>
        <span class="current">{exam.title}</span>
      </nav>

      <header class="quiz-header">
        <div class="quiz-title-section">
          <h1>{exam.title}</h1>
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
            <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.Progress }} />
            {exam.questions.length} questions
          </span>
          {exam.durationMinutes && (
            <span class="info-item">
              <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.StatusInProgress }} />
              ~{exam.durationMinutes} min
            </span>
          )}
          {attempts.length > 0 && (
            <span class="info-item">
              <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.Refresh }} />
              {attempts.length} attempt{attempts.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </header>

      {/* Previous Attempts */}
      {attempts.length > 0 && (
        <section class="previous-attempts">
          <h2>Previous Attempts</h2>
          <div class="attempts-list">
            {attempts.slice(-5).reverse().map((attempt, index) => (
              <div key={attempt.attemptId} class={`attempt-card ${attempt.score >= QUIZ_PASSING_SCORE ? 'passed' : 'failed'}`}>
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

      {/* Main Content */}
      <section class="quiz-content">
        <div id="quiz-container">
          {mode === 'start' && (
            <ExamStartScreen
              exam={exam}
              attemptsCount={attempts.length}
              hasApiKey={hasApiKey}
              onStartExam={handleStartExam}
              onStartPractice={handleStartPractice}
            />
          )}
          {mode === 'exam' && (
            <Quiz
              quiz={exam}
              onComplete={handleExamComplete}
              durationMinutes={exam.durationMinutes}
              isExam={true}
            />
          )}
          {mode === 'practice' && (
            <PracticeMode
              subject={subject}
              exam={exam}
              onExit={handleExitPractice}
            />
          )}
        </div>
      </section>

      {/* Actions */}
      <div class="quiz-actions">
        {mode !== 'start' && (
          <button class="btn btn-secondary" onClick={handleReset}>
            <span dangerouslySetInnerHTML={{ __html: Icons.Refresh }} /> {mode === 'practice' ? 'Exit Practice' : 'Retry Exam'}
          </button>
        )}
        <button class="btn btn-secondary" onClick={handleBackToSubject}>
          <span dangerouslySetInnerHTML={{ __html: Icons.ChevronLeft }} /> Back to Subject
        </button>
      </div>
    </div>
  );
}

interface ExamStartScreenProps {
  exam: Exam;
  attemptsCount: number;
  hasApiKey: boolean;
  onStartExam: () => void;
  onStartPractice: () => void;
}

function ExamStartScreen({
  exam,
  attemptsCount,
  hasApiKey,
  onStartExam,
  onStartPractice,
}: ExamStartScreenProps) {
  return (
    <div class="quiz-start">
      <h2>{attemptsCount > 0 ? 'Ready for another attempt?' : 'Ready to start the exam?'}</h2>
      <p>{exam.instructions?.[0] || 'This is a timed assessment. Answer carefully before submitting.'}</p>
      <div class="exam-start-buttons">
        <button class="btn btn-primary btn-large" onClick={onStartExam}>
          {attemptsCount > 0 ? 'Start New Attempt' : 'Start Exam'}
        </button>
        <button
          class="btn btn-secondary btn-large"
          onClick={onStartPractice}
          disabled={!hasApiKey}
          title={!hasApiKey ? 'Configure Gemini API key in Settings to use Practice Mode' : undefined}
        >
          <span dangerouslySetInnerHTML={{ __html: Icons.Beaker }} /> Practice Mode
        </button>
      </div>
      {!hasApiKey && (
        <p class="form-hint">
          Practice Mode requires a Gemini API key. <a href="#/settings">Configure in Settings</a>
        </p>
      )}
    </div>
  );
}
