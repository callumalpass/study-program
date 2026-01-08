/**
 * Progress Subject Details Tests
 *
 * Tests for getSubjectProgressDetails which returns comprehensive
 * progress information for a subject including:
 * - Status and completion percentage
 * - Quiz/exercise/exam/project completion counts
 * - Start and completion timestamps
 */

import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import type {
  Subject,
  SubjectProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';
import { getSubjectProgressDetails } from '../src/core/progress';
import { progressStorage } from '../src/core/storage';

const now = '2024-01-15T10:00:00.000Z';
const startedAt = '2024-01-01T09:00:00.000Z';
const completedAt = '2024-01-10T15:00:00.000Z';

// Helper functions
const makeQuizAttempt = (score: number): QuizAttempt => ({
  attemptId: `attempt-${score}-${Math.random()}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 300,
});

const makeExamAttempt = (score: number): ExamAttempt => ({
  attemptId: `exam-${score}-${Math.random()}`,
  timestamp: now,
  answers: {},
  score,
  timeSpentSeconds: 3600,
});

const makeExerciseCompletion = (passed: boolean): ExerciseCompletion => ({
  completionId: `completion-${passed}-${Math.random()}`,
  timestamp: now,
  code: 'print("solution")',
  passed,
  timeSpentSeconds: 600,
});

const makeProjectSubmission = (score?: number): ProjectSubmission => ({
  submissionId: `sub-${score ?? 'none'}-${Math.random()}`,
  timestamp: now,
  description: 'Project implementation',
  selfAssessment: { quality: 'good' },
  notes: 'Completed all requirements',
  aiEvaluation: score === undefined
    ? undefined
    : {
        score,
        feedback: 'Well done',
        rubricScores: {},
        strengths: ['Good structure'],
        improvements: ['Add more tests'],
      },
});

const makeSubject = (overrides: Partial<Subject>): Subject => ({
  id: 'test-subject',
  code: 'TEST101',
  title: 'Test Subject',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'A comprehensive test subject',
  learningObjectives: ['Learn testing'],
  topics: [
    {
      id: 'topic-1',
      title: 'Topic 1',
      content: 'Content 1',
      quizIds: ['quiz-1a', 'quiz-1b'],
      exerciseIds: ['ex-1a', 'ex-1b', 'ex-1c'],
    },
    {
      id: 'topic-2',
      title: 'Topic 2',
      content: 'Content 2',
      quizIds: ['quiz-2a'],
      exerciseIds: ['ex-2a'],
    },
  ],
  estimatedHours: 40,
  ...overrides,
});

describe('getSubjectProgressDetails', () => {
  beforeEach(() => {
    // Reset storage before each test
    localStorage.clear();
    vi.spyOn(progressStorage, 'getSubjectProgress');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('when no progress exists', () => {
    it('returns not_started status with zero completion', () => {
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(undefined);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.status).toBe('not_started');
      expect(details.completionPercentage).toBe(0);
    });

    it('returns correct total counts for quizzes and exercises', () => {
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(undefined);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      // 3 quizzes total (quiz-1a, quiz-1b, quiz-2a)
      expect(details.totalQuizzes).toBe(3);
      expect(details.quizzesCompleted).toBe(0);

      // 4 exercises total (ex-1a, ex-1b, ex-1c, ex-2a)
      expect(details.totalExercises).toBe(4);
      expect(details.exercisesCompleted).toBe(0);
    });

    it('handles subject with exams', () => {
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(undefined);
      const subject = makeSubject({
        examIds: ['midterm', 'final'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.totalExams).toBe(2);
      expect(details.examsCompleted).toBe(0);
    });

    it('handles subject with projects', () => {
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(undefined);
      const subject = makeSubject({
        projectIds: ['project-1', 'project-2', 'project-3'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.totalProjects).toBe(3);
      expect(details.projectsCompleted).toBe(0);
    });

    it('returns undefined timestamps when not started', () => {
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(undefined);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.startedAt).toBeUndefined();
      expect(details.completedAt).toBeUndefined();
    });
  });

  describe('when progress exists', () => {
    it('returns correct status and timestamps', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        startedAt,
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.status).toBe('in_progress');
      expect(details.startedAt).toBe(startedAt);
      expect(details.completedAt).toBeUndefined();
    });

    it('includes completedAt when subject is completed', () => {
      const progress: SubjectProgress = {
        status: 'completed',
        startedAt,
        completedAt,
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.status).toBe('completed');
      expect(details.completedAt).toBe(completedAt);
    });
  });

  describe('quiz completion counting', () => {
    it('counts quiz as completed only if best score meets passing threshold', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1a': [makeQuizAttempt(QUIZ_PASSING_SCORE)],
          'quiz-1b': [makeQuizAttempt(QUIZ_PASSING_SCORE - 1)],
          'quiz-2a': [makeQuizAttempt(100)],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      // quiz-1a (70 - passing), quiz-1b (69 - failing), quiz-2a (100 - passing)
      expect(details.quizzesCompleted).toBe(2);
      expect(details.totalQuizzes).toBe(3);
    });

    it('uses best score when multiple attempts exist', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1a': [
            makeQuizAttempt(30),
            makeQuizAttempt(80),  // Best - passing
            makeQuizAttempt(50),
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.quizzesCompleted).toBe(1);
    });

    it('handles empty attempts array', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1a': [],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.quizzesCompleted).toBe(0);
    });
  });

  describe('exercise completion counting', () => {
    it('counts only passed exercises', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {
          'ex-1a': makeExerciseCompletion(true),
          'ex-1b': makeExerciseCompletion(false),
          'ex-1c': makeExerciseCompletion(true),
          'ex-2a': makeExerciseCompletion(true),
        },
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.exercisesCompleted).toBe(3);
      expect(details.totalExercises).toBe(4);
    });
  });

  describe('exam completion counting', () => {
    it('counts exams meeting passing threshold', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'midterm': [makeExamAttempt(75)],
          'final': [makeExamAttempt(65)],
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        examIds: ['midterm', 'final'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.examsCompleted).toBe(1);
      expect(details.totalExams).toBe(2);
    });

    it('handles missing examAttempts property', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      } as SubjectProgress;
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        examIds: ['midterm'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.examsCompleted).toBe(0);
      expect(details.totalExams).toBe(1);
    });
  });

  describe('project completion counting', () => {
    it('counts project with passing AI evaluation', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [makeProjectSubmission(80)],
        },
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        projectIds: ['project-1'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(1);
    });

    it('does not count project with failing AI evaluation', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [makeProjectSubmission(50)],
        },
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        projectIds: ['project-1'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(0);
    });

    it('counts project without AI evaluation as complete', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [makeProjectSubmission(undefined)],
        },
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        projectIds: ['project-1'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(1);
    });

    it('uses best submission when multiple exist', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [
            makeProjectSubmission(40),
            makeProjectSubmission(85),  // Best - passing
            makeProjectSubmission(60),
          ],
        },
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        projectIds: ['project-1'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(1);
    });

    it('handles empty submissions array', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [],
        },
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        projectIds: ['project-1'],
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.projectsCompleted).toBe(0);
    });
  });

  describe('completion percentage calculation', () => {
    it('calculates correct percentage for partial completion', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1a': [makeQuizAttempt(100)],
          'quiz-1b': [makeQuizAttempt(100)],
          // quiz-2a not attempted
        },
        examAttempts: {},
        exerciseCompletions: {
          'ex-1a': makeExerciseCompletion(true),
          'ex-1b': makeExerciseCompletion(true),
          // ex-1c, ex-2a not completed
        },
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      // 4 out of 7 items completed (2 quizzes + 2 exercises out of 3 quizzes + 4 exercises)
      // = 4/7 = 57.14% -> rounds to 57%
      expect(details.completionPercentage).toBe(57);
    });

    it('returns 100% when all items are completed', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1a': [makeQuizAttempt(100)],
          'quiz-1b': [makeQuizAttempt(100)],
          'quiz-2a': [makeQuizAttempt(100)],
        },
        examAttempts: {},
        exerciseCompletions: {
          'ex-1a': makeExerciseCompletion(true),
          'ex-1b': makeExerciseCompletion(true),
          'ex-1c': makeExerciseCompletion(true),
          'ex-2a': makeExerciseCompletion(true),
        },
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({});

      const details = getSubjectProgressDetails(subject);

      expect(details.completionPercentage).toBe(100);
    });
  });

  describe('subject with no assessable items', () => {
    it('handles subject with no quizzes, exercises, exams, or projects', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      vi.mocked(progressStorage.getSubjectProgress).mockReturnValue(progress);
      const subject = makeSubject({
        topics: [{
          id: 'topic-1',
          title: 'Content Only',
          content: 'Just reading material',
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: undefined,
        projectIds: undefined,
      });

      const details = getSubjectProgressDetails(subject);

      expect(details.totalQuizzes).toBe(0);
      expect(details.totalExercises).toBe(0);
      expect(details.totalExams).toBe(0);
      expect(details.totalProjects).toBe(0);
      expect(details.completionPercentage).toBe(0);
    });
  });
});
