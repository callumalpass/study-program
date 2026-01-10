/**
 * Router Navigation and Progress Helpers Integration Tests
 *
 * Tests for the interaction between router navigation helpers and
 * progress tracking functions, ensuring correct behavior across
 * navigation and progress state changes.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  navigateToHome,
  navigateToCurriculum,
  navigateToSubject,
  navigateToTopic,
  navigateToSubtopic,
  navigateToQuiz,
  navigateToExam,
  navigateToExercise,
  navigateToProject,
  navigateToProgress,
  getCurrentRoute,
} from '../src/core/router';
import {
  calculateSubjectCompletion,
  isQuizCompleted,
  isExerciseCompleted,
  isExamCompleted,
  isProjectCompleted,
  getQuizBestScore,
  getExamBestScore,
  arePrerequisitesMet,
  canStartSubject,
  getAvailableSubjects,
  getCompletedSubjects,
  getInProgressSubjects,
  getNextRecommendedSubject,
} from '../src/core/progress';
import type {
  Subject,
  SubjectProgress,
  UserProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
} from '../src/core/types';

// Mock storage module
vi.mock('../src/core/storage', () => ({
  progressStorage: {
    getProgress: vi.fn(),
    getSubjectProgress: vi.fn(),
    updateSubjectProgress: vi.fn(),
  },
}));

const flushHashChange = () => new Promise(resolve => setTimeout(resolve, 0));

// Helper factories
function createSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    code: 'TEST101',
    title: 'Test Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'A test subject',
    learningObjectives: ['Learn testing'],
    topics: [],
    estimatedHours: 40,
    examIds: [],
    projectIds: [],
    ...overrides,
  };
}

function createQuizAttempt(score: number): QuizAttempt {
  return {
    attemptId: `attempt-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 60,
  };
}

function createExamAttempt(score: number): ExamAttempt {
  return {
    attemptId: `exam-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 1800,
  };
}

function createExerciseCompletion(passed: boolean): ExerciseCompletion {
  return {
    completionId: `comp-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    code: 'console.log("test")',
    passed,
    timeSpentSeconds: 300,
  };
}

function createProjectSubmission(aiScore?: number): ProjectSubmission {
  const submission: ProjectSubmission = {
    submissionId: `sub-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
  };
  if (aiScore !== undefined) {
    submission.aiEvaluation = {
      score: aiScore,
      feedback: 'Test feedback',
      rubricScores: {},
      strengths: [],
      improvements: [],
    };
  }
  return submission;
}

function createSubjectProgress(overrides: Partial<SubjectProgress> = {}): SubjectProgress {
  return {
    status: 'not_started',
    quizAttempts: {},
    examAttempts: {},
    exerciseCompletions: {},
    projectSubmissions: {},
    ...overrides,
  };
}

function createUserProgress(subjects: Record<string, SubjectProgress>): UserProgress {
  return {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects,
    settings: {
      theme: 'auto',
      codeEditorFontSize: 14,
      showCompletedItems: true,
    },
  };
}

describe('Navigation and Progress Integration', () => {
  let navigatedPath: string | null = null;

  beforeEach(() => {
    navigatedPath = null;
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        set hash(value: string) {
          navigatedPath = value;
        },
        get hash() {
          return navigatedPath || '';
        },
      },
      writable: true,
    });
    window.scrollTo = vi.fn();
  });

  describe('Subject navigation with progress state', () => {
    it('navigates to subject that has in_progress status', () => {
      const subject = createSubject({ id: 'cs101' });
      const progress = createSubjectProgress({ status: 'in_progress' });

      navigateToSubject(subject.id);
      expect(navigatedPath).toBe('#/subject/cs101');

      // Progress should show appropriate completion
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('navigates to subject with completed quizzes', () => {
      const subject = createSubject({
        id: 'cs102',
        topics: [{
          id: 't1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1', 'quiz-2'],
          exerciseIds: [],
        }],
      });

      const progress = createSubjectProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)],
          'quiz-2': [createQuizAttempt(75)],
        },
      });

      navigateToSubject(subject.id);
      expect(navigatedPath).toBe('#/subject/cs102');
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles navigation with URL-encoded subject IDs', () => {
      const subject = createSubject({ id: 'cs-101/intro' });
      const progress = createSubjectProgress({ status: 'in_progress' });

      navigateToSubject(subject.id);
      expect(navigatedPath).toBe('#/subject/cs-101%2Fintro');
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('Quiz navigation with completion tracking', () => {
    it('navigates to quiz and verifies completion status', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(70)],
        },
      });

      navigateToQuiz('cs101', 'quiz-1');
      expect(navigatedPath).toBe('#/subject/cs101/quiz/quiz-1');
      expect(isQuizCompleted('quiz-1', progress)).toBe(true);
      expect(getQuizBestScore('quiz-1', progress)).toBe(70);
    });

    it('navigates to incomplete quiz', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(50)],
        },
      });

      navigateToQuiz('cs101', 'quiz-1');
      expect(navigatedPath).toBe('#/subject/cs101/quiz/quiz-1');
      expect(isQuizCompleted('quiz-1', progress)).toBe(false);
      expect(getQuizBestScore('quiz-1', progress)).toBe(50);
    });

    it('navigates to quiz with no attempts', () => {
      const progress = createSubjectProgress({ status: 'in_progress' });

      navigateToQuiz('cs101', 'new-quiz');
      expect(navigatedPath).toBe('#/subject/cs101/quiz/new-quiz');
      expect(isQuizCompleted('new-quiz', progress)).toBe(false);
      expect(getQuizBestScore('new-quiz', progress)).toBeNull();
    });
  });

  describe('Exam navigation with completion tracking', () => {
    it('navigates to exam and verifies completion', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        examAttempts: {
          'midterm': [createExamAttempt(85)],
        },
      });

      navigateToExam('cs201', 'midterm');
      expect(navigatedPath).toBe('#/subject/cs201/exam/midterm');
      expect(isExamCompleted('midterm', progress)).toBe(true);
      expect(getExamBestScore('midterm', progress)).toBe(85);
    });

    it('navigates to failed exam', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        examAttempts: {
          'final': [createExamAttempt(60)],
        },
      });

      navigateToExam('cs201', 'final');
      expect(navigatedPath).toBe('#/subject/cs201/exam/final');
      expect(isExamCompleted('final', progress)).toBe(false);
      expect(getExamBestScore('final', progress)).toBe(60);
    });

    it('handles exam with multiple attempts', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        examAttempts: {
          'retake-exam': [
            createExamAttempt(55),
            createExamAttempt(65),
            createExamAttempt(72),
          ],
        },
      });

      navigateToExam('cs201', 'retake-exam');
      expect(navigatedPath).toBe('#/subject/cs201/exam/retake-exam');
      expect(isExamCompleted('retake-exam', progress)).toBe(true);
      expect(getExamBestScore('retake-exam', progress)).toBe(72);
    });
  });

  describe('Exercise navigation with completion tracking', () => {
    it('navigates to completed exercise', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        exerciseCompletions: {
          'ex-1': createExerciseCompletion(true),
        },
      });

      navigateToExercise('cs101', 'ex-1');
      expect(navigatedPath).toBe('#/subject/cs101/exercise/ex-1');
      expect(isExerciseCompleted('ex-1', progress)).toBe(true);
    });

    it('navigates to failed exercise', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        exerciseCompletions: {
          'ex-2': createExerciseCompletion(false),
        },
      });

      navigateToExercise('cs101', 'ex-2');
      expect(navigatedPath).toBe('#/subject/cs101/exercise/ex-2');
      expect(isExerciseCompleted('ex-2', progress)).toBe(false);
    });

    it('navigates to unattempted exercise', () => {
      const progress = createSubjectProgress({ status: 'in_progress' });

      navigateToExercise('cs101', 'new-ex');
      expect(navigatedPath).toBe('#/subject/cs101/exercise/new-ex');
      expect(isExerciseCompleted('new-ex', progress)).toBe(false);
    });
  });

  describe('Project navigation with completion tracking', () => {
    it('navigates to project with passing AI score', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        projectSubmissions: {
          'project-1': [createProjectSubmission(80)],
        },
      });

      navigateToProject('cs301', 'project-1');
      expect(navigatedPath).toBe('#/subject/cs301/project/project-1');
      expect(isProjectCompleted('project-1', progress)).toBe(true);
    });

    it('navigates to project with failing AI score', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        projectSubmissions: {
          'project-2': [createProjectSubmission(60)],
        },
      });

      navigateToProject('cs301', 'project-2');
      expect(navigatedPath).toBe('#/subject/cs301/project/project-2');
      expect(isProjectCompleted('project-2', progress)).toBe(false);
    });

    it('navigates to project without AI evaluation', () => {
      const progress = createSubjectProgress({
        status: 'in_progress',
        projectSubmissions: {
          'project-3': [createProjectSubmission()],
        },
      });

      navigateToProject('cs301', 'project-3');
      expect(navigatedPath).toBe('#/subject/cs301/project/project-3');
      expect(isProjectCompleted('project-3', progress)).toBe(true);
    });
  });

  describe('Topic and subtopic navigation', () => {
    it('navigates to topic within subject', () => {
      navigateToTopic('cs101', 'intro');
      expect(navigatedPath).toBe('#/subject/cs101/topic/intro');
    });

    it('navigates to subtopic with full path', () => {
      navigateToSubtopic('cs101', 'variables', 'types');
      expect(navigatedPath).toBe('#/subject/cs101/topic/variables/subtopic/types');
    });

    it('handles special characters in topic IDs', () => {
      navigateToTopic('cs101', 'c++basics');
      expect(navigatedPath).toBe('#/subject/cs101/topic/c%2B%2Bbasics');
    });

    it('handles unicode in subtopic slugs', () => {
      navigateToSubtopic('cs101', 'intro', 'données');
      expect(navigatedPath).toBe('#/subject/cs101/topic/intro/subtopic/donn%C3%A9es');
    });
  });

  describe('Static page navigation', () => {
    it('navigates to home', () => {
      navigateToHome();
      expect(navigatedPath).toBe('#/');
    });

    it('navigates to curriculum', () => {
      navigateToCurriculum();
      expect(navigatedPath).toBe('#/curriculum');
    });

    it('navigates to progress page', () => {
      navigateToProgress();
      expect(navigatedPath).toBe('#/progress');
    });
  });
});

describe('Prerequisite-aware Navigation', () => {
  describe('canStartSubject with navigation context', () => {
    it('allows navigation to subject with met prerequisites', () => {
      const subjectA = createSubject({ id: 'cs101', prerequisites: [] });
      const subjectB = createSubject({ id: 'cs201', prerequisites: ['cs101'] });

      const progress = createUserProgress({
        cs101: createSubjectProgress({ status: 'completed' }),
      });

      expect(canStartSubject(subjectA, progress)).toBe(false); // Already completed
      expect(canStartSubject(subjectB, progress)).toBe(true); // Prerequisites met
      expect(arePrerequisitesMet(subjectB, progress)).toBe(true);
    });

    it('blocks subjects with unmet prerequisites', () => {
      const subjectB = createSubject({ id: 'cs201', prerequisites: ['cs101'] });

      const progress = createUserProgress({
        cs101: createSubjectProgress({ status: 'in_progress' }),
      });

      expect(canStartSubject(subjectB, progress)).toBe(false);
      expect(arePrerequisitesMet(subjectB, progress)).toBe(false);
    });

    it('handles chain of prerequisites', () => {
      const subjects = [
        createSubject({ id: 'cs101', prerequisites: [] }),
        createSubject({ id: 'cs201', prerequisites: ['cs101'] }),
        createSubject({ id: 'cs301', prerequisites: ['cs201'] }),
      ];

      const progress = createUserProgress({
        cs101: createSubjectProgress({ status: 'completed' }),
        cs201: createSubjectProgress({ status: 'completed' }),
      });

      expect(canStartSubject(subjects[2], progress)).toBe(true);
      expect(arePrerequisitesMet(subjects[2], progress)).toBe(true);
    });
  });

  describe('Available subjects list', () => {
    it('returns subjects with met prerequisites', () => {
      const subjects = [
        createSubject({ id: 'cs101', prerequisites: [], year: 1 }),
        createSubject({ id: 'cs102', prerequisites: [], year: 1 }),
        createSubject({ id: 'cs201', prerequisites: ['cs101'], year: 2 }),
      ];

      const progress = createUserProgress({});

      const available = getAvailableSubjects(subjects, progress);
      expect(available.length).toBe(2);
      expect(available.map(s => s.id)).toContain('cs101');
      expect(available.map(s => s.id)).toContain('cs102');
    });

    it('includes subjects with completed prerequisites', () => {
      const subjects = [
        createSubject({ id: 'cs101', prerequisites: [] }),
        createSubject({ id: 'cs201', prerequisites: ['cs101'] }),
      ];

      const progress = createUserProgress({
        cs101: createSubjectProgress({ status: 'completed' }),
      });

      const available = getAvailableSubjects(subjects, progress);
      // getAvailableSubjects returns ALL subjects with met prerequisites
      // (including completed ones), so both are available
      expect(available.length).toBe(2);
      expect(available.map(s => s.id)).toContain('cs101');
      expect(available.map(s => s.id)).toContain('cs201');
    });
  });

  describe('Completed and in-progress subjects', () => {
    it('separates completed from in-progress subjects', () => {
      const subjects = [
        createSubject({ id: 'cs101' }),
        createSubject({ id: 'cs102' }),
        createSubject({ id: 'cs201' }),
      ];

      const progress = createUserProgress({
        cs101: createSubjectProgress({ status: 'completed' }),
        cs102: createSubjectProgress({ status: 'in_progress' }),
        cs201: createSubjectProgress({ status: 'not_started' }),
      });

      const completed = getCompletedSubjects(subjects, progress);
      const inProgress = getInProgressSubjects(subjects, progress);

      expect(completed.length).toBe(1);
      expect(completed[0].id).toBe('cs101');

      expect(inProgress.length).toBe(1);
      expect(inProgress[0].id).toBe('cs102');
    });
  });

  describe('Next recommended subject', () => {
    it('recommends in-progress subject first', () => {
      const subjects = [
        createSubject({ id: 'cs101', year: 1, semester: 1 }),
        createSubject({ id: 'cs102', year: 1, semester: 2 }),
      ];

      const progress = createUserProgress({
        cs102: createSubjectProgress({ status: 'in_progress' }),
      });

      const next = getNextRecommendedSubject(subjects, progress);
      expect(next?.id).toBe('cs102');
    });

    it('recommends earliest available when none in-progress', () => {
      const subjects = [
        createSubject({ id: 'cs201', year: 2, semester: 1 }),
        createSubject({ id: 'cs101', year: 1, semester: 1 }),
      ];

      const progress = createUserProgress({});

      const next = getNextRecommendedSubject(subjects, progress);
      expect(next?.id).toBe('cs101');
    });

    it('returns null when all subjects completed', () => {
      const subjects = [
        createSubject({ id: 'cs101' }),
        createSubject({ id: 'cs102' }),
      ];

      const progress = createUserProgress({
        cs101: createSubjectProgress({ status: 'completed' }),
        cs102: createSubjectProgress({ status: 'completed' }),
      });

      const next = getNextRecommendedSubject(subjects, progress);
      expect(next).toBeNull();
    });
  });
});

describe('Progress calculation with mixed content', () => {
  it('calculates completion across all content types', () => {
    const subject = createSubject({
      id: 'comprehensive-subject',
      topics: [
        {
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['q1', 'q2'],
          exerciseIds: ['ex1'],
        },
        {
          id: 'topic-2',
          title: 'Topic 2',
          content: '',
          quizIds: ['q3'],
          exerciseIds: ['ex2'],
        },
      ],
      examIds: ['midterm'],
      projectIds: ['project-1'],
    });

    // 7 total items: 3 quizzes + 2 exercises + 1 exam + 1 project
    // Complete 4 of them = 57% (rounded)
    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        'q1': [createQuizAttempt(80)],  // pass
        'q2': [createQuizAttempt(50)],  // fail
        'q3': [createQuizAttempt(75)],  // pass
      },
      exerciseCompletions: {
        'ex1': createExerciseCompletion(true),   // pass
        'ex2': createExerciseCompletion(false),  // fail
      },
      examAttempts: {
        'midterm': [createExamAttempt(65)],  // fail
      },
      projectSubmissions: {
        'project-1': [createProjectSubmission(70)],  // pass
      },
    });

    const completion = calculateSubjectCompletion(subject, progress);
    // 4/7 ≈ 57.14% → 57%
    expect(completion).toBe(57);
  });

  it('handles subject with only quizzes', () => {
    const subject = createSubject({
      id: 'quiz-only',
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: ['q1', 'q2', 'q3'],
        exerciseIds: [],
      }],
    });

    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        'q1': [createQuizAttempt(100)],
        'q2': [createQuizAttempt(100)],
      },
    });

    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(67); // 2/3 = 66.67% → 67%
  });

  it('handles subject with only exercises', () => {
    const subject = createSubject({
      id: 'exercise-only',
      topics: [{
        id: 't1',
        title: 'Topic',
        content: '',
        quizIds: [],
        exerciseIds: ['ex1', 'ex2'],
      }],
    });

    const progress = createSubjectProgress({
      status: 'in_progress',
      exerciseCompletions: {
        'ex1': createExerciseCompletion(true),
      },
    });

    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(50);
  });

  it('handles subject with empty topics', () => {
    const subject = createSubject({
      id: 'empty-topics',
      topics: [],
      examIds: ['exam-1'],
      projectIds: ['proj-1'],
    });

    const progress = createSubjectProgress({
      status: 'in_progress',
      examAttempts: {
        'exam-1': [createExamAttempt(70)],
      },
    });

    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(50); // 1/2 items
  });
});

describe('Edge cases in navigation and progress', () => {
  let navigatedPath: string | null = null;

  beforeEach(() => {
    navigatedPath = null;
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        set hash(value: string) {
          navigatedPath = value;
        },
        get hash() {
          return navigatedPath || '';
        },
      },
      writable: true,
    });
  });

  it('handles navigation with empty subject ID', () => {
    navigateToSubject('');
    expect(navigatedPath).toBe('#/subject/');
  });

  it('handles progress with undefined arrays', () => {
    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: undefined as unknown as Record<string, QuizAttempt[]>,
    });

    expect(isQuizCompleted('any-quiz', progress)).toBe(false);
    expect(getQuizBestScore('any-quiz', progress)).toBeNull();
  });

  it('handles subject with all content types empty', () => {
    const subject = createSubject({
      topics: [{
        id: 't1',
        title: 'Empty',
        content: '',
        quizIds: [],
        exerciseIds: [],
      }],
      examIds: [],
      projectIds: [],
    });

    const progress = createSubjectProgress({ status: 'in_progress' });
    const completion = calculateSubjectCompletion(subject, progress);
    expect(completion).toBe(0);
  });

  it('handles rapid navigation changes', async () => {
    navigateToSubject('cs101');
    navigateToQuiz('cs101', 'q1');
    navigateToExam('cs101', 'midterm');

    expect(navigatedPath).toBe('#/subject/cs101/exam/midterm');
  });

  it('handles score at exact passing boundary (70)', () => {
    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        'boundary-quiz': [createQuizAttempt(70)],
      },
    });

    expect(isQuizCompleted('boundary-quiz', progress)).toBe(true);
    expect(getQuizBestScore('boundary-quiz', progress)).toBe(70);
  });

  it('handles score one below boundary (69)', () => {
    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        'failing-quiz': [createQuizAttempt(69)],
      },
    });

    expect(isQuizCompleted('failing-quiz', progress)).toBe(false);
    expect(getQuizBestScore('failing-quiz', progress)).toBe(69);
  });

  it('handles perfect score (100)', () => {
    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        'perfect-quiz': [createQuizAttempt(100)],
      },
    });

    expect(isQuizCompleted('perfect-quiz', progress)).toBe(true);
    expect(getQuizBestScore('perfect-quiz', progress)).toBe(100);
  });

  it('handles zero score', () => {
    const progress = createSubjectProgress({
      status: 'in_progress',
      quizAttempts: {
        'zero-quiz': [createQuizAttempt(0)],
      },
    });

    expect(isQuizCompleted('zero-quiz', progress)).toBe(false);
    expect(getQuizBestScore('zero-quiz', progress)).toBe(0);
  });
});
