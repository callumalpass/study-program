import { h, Fragment } from 'preact';
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import type { Subject, CodingExercise, WrittenExercise, Exercise, ExerciseCompletion } from '@/core/types';
import { progressStorage } from '@/core/storage';
import { navigateToExercise, navigateToTopic } from '@/core/router';
import { Icons } from '@/components/icons';
import { renderMarkdown } from '@/components/markdown';
import { CodeEditor } from './CodeEditor';
import { ProofEditor } from './ProofEditor';
import type { TestResult } from '@/components/code-runner';

// Type guard for CodingExercise
function isCodingExercise(exercise: Exercise): exercise is CodingExercise {
  return 'testCases' in exercise && 'starterCode' in exercise;
}

// Format language for display
function formatLanguage(lang: string): string {
  const langMap: Record<string, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    rust: 'Rust',
    go: 'Go',
  };
  return langMap[lang] || lang;
}

interface ExercisePageProps {
  subject: Subject;
  exercise: Exercise;
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
  currentIndex: number;
  totalExercises: number;
}

export function ExercisePage({
  subject,
  exercise,
  prevExercise,
  nextExercise,
  currentIndex,
  totalExercises,
}: ExercisePageProps) {
  const subjectId = subject.id;
  const exerciseId = exercise.id;

  const [completion, setCompletion] = useState<ExerciseCompletion | null>(
    () => progressStorage.getExerciseCompletion(subjectId, exerciseId) ?? null
  );

  const startTimeRef = useRef(Date.now());

  const handleNavigatePrev = useCallback(() => {
    if (prevExercise) {
      navigateToExercise(subjectId, prevExercise.id);
    } else {
      navigateToTopic(subjectId, exercise.topicId);
    }
  }, [subjectId, prevExercise, exercise.topicId]);

  const handleNavigateNext = useCallback(() => {
    if (nextExercise) {
      navigateToExercise(subjectId, nextExercise.id);
    } else {
      navigateToTopic(subjectId, exercise.topicId);
    }
  }, [subjectId, nextExercise, exercise.topicId]);

  if (isCodingExercise(exercise)) {
    return (
      <CodingExercisePage
        subject={subject}
        exercise={exercise}
        completion={completion}
        setCompletion={setCompletion}
        startTimeRef={startTimeRef}
        prevExercise={prevExercise}
        nextExercise={nextExercise}
        currentIndex={currentIndex}
        totalExercises={totalExercises}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
      />
    );
  } else {
    return (
      <WrittenExercisePage
        subject={subject}
        exercise={exercise}
        completion={completion}
        setCompletion={setCompletion}
        startTimeRef={startTimeRef}
        prevExercise={prevExercise}
        nextExercise={nextExercise}
        currentIndex={currentIndex}
        totalExercises={totalExercises}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
      />
    );
  }
}

interface CodingExercisePageProps {
  subject: Subject;
  exercise: CodingExercise;
  completion: ExerciseCompletion | null;
  setCompletion: (c: ExerciseCompletion | null) => void;
  startTimeRef: { current: number };
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
  currentIndex: number;
  totalExercises: number;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
}

function CodingExercisePage({
  subject,
  exercise,
  completion,
  setCompletion,
  startTimeRef,
  prevExercise,
  nextExercise,
  currentIndex,
  totalExercises,
  onNavigatePrev,
  onNavigateNext,
}: CodingExercisePageProps) {
  const subjectId = subject.id;
  const exerciseId = exercise.id;
  const isPassed = completion?.passed ?? false;

  const handleTestResults = useCallback((results: TestResult[], allPassed: boolean) => {
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    const newCompletion: ExerciseCompletion = {
      completionId: `completion_${Date.now()}`,
      timestamp: new Date().toISOString(),
      code: '', // Will be filled by the code editor's storage
      passed: allPassed,
      passedTestCases: results.filter(r => r.passed).length,
      totalTestCases: results.length,
      timeSpentSeconds: timeSpent,
      type: 'coding',
    };

    progressStorage.addExerciseCompletion(subjectId, exerciseId, newCompletion);
    setCompletion(newCompletion);
  }, [subjectId, exerciseId, startTimeRef, setCompletion]);

  return (
    <div class="exercise-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href={`#/subject/${subjectId}`}>{subject.title}</a>
        <span class="separator">/</span>
        <a href={`#/subject/${subjectId}/topic/${exercise.topicId}`}>Topic</a>
        <span class="separator">/</span>
        <span class="current">{exercise.title}</span>
      </nav>

      <header class="exercise-header">
        <h1>{exercise.title}</h1>
        <div class="exercise-meta-row">
          <span class="exercise-counter">Exercise {currentIndex + 1} of {totalExercises}</span>
          <span class="meta-separator" />
          <span class="info-item">
            <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.StatCode }} />
            {formatLanguage(exercise.language)}
          </span>
          <span class="info-item">
            <span class="icon" dangerouslySetInnerHTML={{ __html: Icons.Beaker }} />
            {exercise.testCases.length} test cases
          </span>
          {isPassed ? (
            <span class="completion-badge passed">
              <span dangerouslySetInnerHTML={{ __html: Icons.Check }} /> Completed
            </span>
          ) : completion ? (
            <span class="completion-badge partial">
              {completion.passedTestCases ?? 0}/{completion.totalTestCases ?? 0} passed
            </span>
          ) : null}
        </div>
      </header>

      <section class="exercise-description">
        <h2>Description</h2>
        <div
          class="description-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(exercise.description) }}
        />
      </section>

      <section class="exercise-workspace">
        <h2>Code Editor</h2>
        <CodeEditor
          language={exercise.language}
          initialValue={exercise.starterCode}
          starterCode={exercise.starterCode}
          testCases={exercise.testCases}
          hints={exercise.hints}
          solution={exercise.solution}
          storageKey={`exercise_${subjectId}_${exerciseId}`}
          height="400px"
          onTestResults={handleTestResults}
        />
      </section>

      <ExerciseNavigation
        prevExercise={prevExercise}
        nextExercise={nextExercise}
        currentIndex={currentIndex}
        totalExercises={totalExercises}
        onNavigatePrev={onNavigatePrev}
        onNavigateNext={onNavigateNext}
      />
    </div>
  );
}

interface WrittenExercisePageProps {
  subject: Subject;
  exercise: WrittenExercise;
  completion: ExerciseCompletion | null;
  setCompletion: (c: ExerciseCompletion | null) => void;
  startTimeRef: { current: number };
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
  currentIndex: number;
  totalExercises: number;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
}

function WrittenExercisePage({
  subject,
  exercise,
  completion,
  setCompletion,
  startTimeRef,
  prevExercise,
  nextExercise,
  currentIndex,
  totalExercises,
  onNavigatePrev,
  onNavigateNext,
}: WrittenExercisePageProps) {
  const subjectId = subject.id;
  const exerciseId = exercise.id;
  const hasSavedProof = completion?.type === 'written' && (completion.code?.trim().length ?? 0) > 0;

  const handleSave = useCallback((content: string, timeSpentSeconds: number) => {
    const newCompletion: ExerciseCompletion = {
      completionId: `completion_${Date.now()}`,
      timestamp: new Date().toISOString(),
      code: content,
      passed: content.trim().length > 0,
      timeSpentSeconds,
      type: 'written',
    };

    progressStorage.addExerciseCompletion(subjectId, exerciseId, newCompletion);
    setCompletion(newCompletion);
  }, [subjectId, exerciseId, setCompletion]);

  return (
    <div class="exercise-page">
      <nav class="breadcrumb">
        <a href="#/curriculum">Curriculum</a>
        <span class="separator">/</span>
        <a href={`#/subject/${subjectId}`}>{subject.title}</a>
        <span class="separator">/</span>
        <a href={`#/subject/${subjectId}/topic/${exercise.topicId}`}>Topic</a>
        <span class="separator">/</span>
        <span class="current">{exercise.title}</span>
      </nav>

      <header class="exercise-header">
        <h1>{exercise.title}</h1>
        <div class="exercise-meta-row">
          <span class="exercise-counter">Exercise {currentIndex + 1} of {totalExercises}</span>
          <span class="meta-separator" />
          <span class="exercise-type-badge">Written</span>
          {hasSavedProof && (
            <span class="completion-badge saved">
              <span dangerouslySetInnerHTML={{ __html: Icons.Check }} /> Proof Saved
            </span>
          )}
        </div>
      </header>

      <section class="exercise-description">
        <h2>Problem</h2>
        <div
          class="description-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(exercise.description) }}
        />
      </section>

      <section class="exercise-workspace">
        <h2>Your Proof</h2>
        <p class="proof-instructions">
          Write your proof below. You can use Markdown formatting and LaTeX notation
          (e.g., <code>$x^2$</code> for inline math). Your work is auto-saved as a draft,
          but click "Save Proof" to save it to your progress.
        </p>
        <ProofEditor
          initialValue={completion?.code || ''}
          storageKey={`proof_${subjectId}_${exerciseId}`}
          hints={exercise.hints}
          solution={exercise.solution}
          problem={exercise.description}
          height="300px"
          onSave={handleSave}
        />
      </section>

      <ExerciseNavigation
        prevExercise={prevExercise}
        nextExercise={nextExercise}
        currentIndex={currentIndex}
        totalExercises={totalExercises}
        onNavigatePrev={onNavigatePrev}
        onNavigateNext={onNavigateNext}
      />
    </div>
  );
}

interface ExerciseNavigationProps {
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
  currentIndex: number;
  totalExercises: number;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
}

function ExerciseNavigation({
  prevExercise,
  nextExercise,
  currentIndex,
  totalExercises,
  onNavigatePrev,
  onNavigateNext,
}: ExerciseNavigationProps) {
  return (
    <nav class="exercise-navigation">
      <div class="nav-left">
        <button class="btn btn-secondary" onClick={onNavigatePrev}>
          <span dangerouslySetInnerHTML={{ __html: Icons.ChevronLeft }} />
          {prevExercise ? ' Previous' : ' Back to Topic'}
        </button>
      </div>
      <div class="nav-center">
        <span class="nav-counter">{currentIndex + 1} / {totalExercises}</span>
      </div>
      <div class="nav-right">
        <button class="btn btn-primary" onClick={onNavigateNext}>
          {nextExercise ? 'Next ' : 'Done '}
          <span dangerouslySetInnerHTML={{ __html: nextExercise ? Icons.ChevronRight : Icons.Check }} />
        </button>
      </div>
    </nav>
  );
}
