/**
 * Comprehensive Progress Calculation Tests
 *
 * These tests verify the progress calculation logic handles various
 * edge cases and scenarios correctly, including:
 * - Empty/missing data handling
 * - Boundary conditions for passing scores
 * - Complex subject structures
 * - Project submission scoring
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Subject, SubjectProgress, UserProgress, QuizAttempt, ExamAttempt, ProjectSubmission } from '../src/core/types';
import {
  calculateSubjectCompletion,
  arePrerequisitesMet,
  getAvailableSubjects,
  getInProgressSubjects,
  getCompletedSubjects,
  calculateOverallProgress,
  getNextRecommendedSubject,
  getSubjectsByYearAndSemester,
  canStartSubject,
  isQuizCompleted,
  getQuizBestScore,
  isExerciseCompleted,
  isExamCompleted,
  getExamBestScore,
  isProjectCompleted,
  getProjectBestSubmission,
  getDependentSubjects,
  getPrerequisiteSubjects,
} from '../src/core/progress';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Helper to create a minimal subject
function createSubject(overrides: Partial<Subject> = {}): Subject {
  return {
    id: 'test-subject',
    code: 'TEST101',
    title: 'Test Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Test description',
    learningObjectives: ['Learn testing'],
    topics: [
      {
        id: 'topic-1',
        title: 'Topic 1',
        content: 'Content',
        quizIds: ['quiz-1'],
        exerciseIds: ['ex-1'],
      },
    ],
    estimatedHours: 40,
    examIds: ['exam-1'],
    projectIds: ['project-1'],
    ...overrides,
  };
}

// Helper to create a quiz attempt
function createQuizAttempt(score: number, overrides: Partial<QuizAttempt> = {}): QuizAttempt {
  return {
    attemptId: `attempt-${Date.now()}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 300,
    ...overrides,
  };
}

// Helper to create an exam attempt
function createExamAttempt(score: number, overrides: Partial<ExamAttempt> = {}): ExamAttempt {
  return {
    attemptId: `attempt-${Date.now()}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 3600,
    ...overrides,
  };
}

// Helper to create a project submission
function createProjectSubmission(aiScore?: number, overrides: Partial<ProjectSubmission> = {}): ProjectSubmission {
  return {
    submissionId: `sub-${Date.now()}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    aiEvaluation: aiScore !== undefined ? {
      score: aiScore,
      feedback: 'Test feedback',
      rubricScores: {},
      strengths: [],
      improvements: [],
    } : undefined,
    ...overrides,
  };
}

describe('calculateSubjectCompletion', () => {
  describe('edge cases for empty/undefined data', () => {
    it('returns 0 for undefined progress', () => {
      const subject = createSubject();
      expect(calculateSubjectCompletion(subject, undefined)).toBe(0);
    });

    it('returns 0 for not_started status', () => {
      const subject = createSubject();
      const progress: SubjectProgress = {
        status: 'not_started',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('returns 100 for completed status', () => {
      const subject = createSubject();
      const progress: SubjectProgress = {
        status: 'completed',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('returns 0 for subject with no items', () => {
      const subject = createSubject({
        topics: [{
          id: 'empty-topic',
          title: 'Empty',
          content: '',
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('quiz completion at boundary scores', () => {
    it('counts quiz as completed at exactly passing score', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE)],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count quiz as completed at just below passing score', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE - 1)],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('uses best score from multiple attempts', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1'],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(50),
            createQuizAttempt(QUIZ_PASSING_SCORE),
            createQuizAttempt(60),
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('exercise completion', () => {
    it('counts passed exercises', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: [],
          exerciseIds: ['ex-1'],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {
          'ex-1': {
            completionId: 'comp-1',
            timestamp: new Date().toISOString(),
            code: 'solution',
            passed: true,
            timeSpentSeconds: 300,
          },
        },
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count failed exercises', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: [],
          exerciseIds: ['ex-1'],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {
          'ex-1': {
            completionId: 'comp-1',
            timestamp: new Date().toISOString(),
            code: 'wrong solution',
            passed: false,
            timeSpentSeconds: 300,
          },
        },
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });
  });

  describe('project completion', () => {
    it('counts project with passing AI evaluation', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: ['project-1'],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(QUIZ_PASSING_SCORE)],
        },
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('does not count project with failing AI evaluation', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: ['project-1'],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(QUIZ_PASSING_SCORE - 1)],
        },
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('counts project submission without AI evaluation as complete', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: ['project-1'],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [createProjectSubmission(undefined)], // No AI evaluation
        },
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('uses best AI score from multiple submissions', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: [],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: ['project-1'],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'project-1': [
            createProjectSubmission(50),
            createProjectSubmission(80),
            createProjectSubmission(60),
          ],
        },
      };
      // Best submission has score 80, which passes
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('mixed item completion', () => {
    it('calculates correct percentage for partial completion', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1', 'quiz-2'],
          exerciseIds: ['ex-1', 'ex-2'],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)], // Passed
          'quiz-2': [createQuizAttempt(50)], // Failed
        },
        examAttempts: {},
        exerciseCompletions: {
          'ex-1': {
            completionId: 'c1',
            timestamp: new Date().toISOString(),
            code: '',
            passed: true,
            timeSpentSeconds: 0,
          },
          // ex-2 not attempted
        },
        projectSubmissions: {},
      };
      // 2 out of 4 items completed = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles rounding correctly', () => {
      const subject = createSubject({
        topics: [{
          id: 'topic-1',
          title: 'Topic 1',
          content: '',
          quizIds: ['quiz-1', 'quiz-2', 'quiz-3'],
          exerciseIds: [],
        }],
        examIds: [],
        projectIds: [],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(80)], // 1 out of 3 = 33.33%
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      // Should round to 33%
      expect(calculateSubjectCompletion(subject, progress)).toBe(33);
    });
  });
});

describe('prerequisite checking', () => {
  describe('arePrerequisitesMet', () => {
    it('returns true for subject with no prerequisites', () => {
      const subject = createSubject({ prerequisites: [] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns true when all prerequisites are completed', () => {
      const subject = createSubject({ prerequisites: ['cs101', 'math101'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
          'math101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('returns false when any prerequisite is not completed', () => {
      const subject = createSubject({ prerequisites: ['cs101', 'math101'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'cs101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
          'math101': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });

    it('returns false when prerequisite has no progress entry', () => {
      const subject = createSubject({ prerequisites: ['cs101'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {},
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });
  });
});

describe('subject filtering functions', () => {
  const subjects: Subject[] = [
    createSubject({ id: 'cs101', prerequisites: [] }),
    createSubject({ id: 'cs102', prerequisites: ['cs101'] }),
    createSubject({ id: 'cs103', prerequisites: ['cs101', 'cs102'] }),
  ];

  const userProgress: UserProgress = {
    version: 4,
    startedAt: new Date().toISOString(),
    subjects: {
      'cs101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      'cs102': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
    },
    settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
  };

  it('getAvailableSubjects returns subjects with met prerequisites', () => {
    const available = getAvailableSubjects(subjects, userProgress);
    expect(available.map(s => s.id)).toContain('cs101');
    expect(available.map(s => s.id)).toContain('cs102');
    expect(available.map(s => s.id)).not.toContain('cs103'); // Requires cs102 completed
  });

  it('getInProgressSubjects returns only in_progress subjects', () => {
    const inProgress = getInProgressSubjects(subjects, userProgress);
    expect(inProgress.map(s => s.id)).toEqual(['cs102']);
  });

  it('getCompletedSubjects returns only completed subjects', () => {
    const completed = getCompletedSubjects(subjects, userProgress);
    expect(completed.map(s => s.id)).toEqual(['cs101']);
  });
});

describe('overall progress calculation', () => {
  it('calculates correct totals for mixed progress', () => {
    const subjects: Subject[] = [
      createSubject({ id: 'cs101', estimatedHours: 40 }),
      createSubject({ id: 'cs102', estimatedHours: 50 }),
      createSubject({ id: 'cs103', estimatedHours: 60 }),
    ];

    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        'cs101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        'cs102': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    const overall = calculateOverallProgress(subjects, userProgress);
    expect(overall.totalSubjects).toBe(3);
    expect(overall.completedSubjects).toBe(1);
    expect(overall.inProgressSubjects).toBe(1);
    expect(overall.totalHours).toBe(150);
    expect(overall.percentageComplete).toBe(33); // 1/3 = 33%
  });

  it('handles empty subjects array', () => {
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {},
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    const overall = calculateOverallProgress([], userProgress);
    expect(overall.totalSubjects).toBe(0);
    expect(overall.completedSubjects).toBe(0);
    expect(overall.percentageComplete).toBe(0);
  });
});

describe('next recommended subject', () => {
  it('returns in-progress subject first', () => {
    const subjects: Subject[] = [
      createSubject({ id: 'cs101', year: 1, semester: 1, prerequisites: [] }),
      createSubject({ id: 'cs102', year: 1, semester: 2, prerequisites: [] }),
    ];

    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        'cs102': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    const next = getNextRecommendedSubject(subjects, userProgress);
    expect(next?.id).toBe('cs102');
  });

  it('returns earliest available subject when none in progress', () => {
    const subjects: Subject[] = [
      createSubject({ id: 'cs201', year: 2, semester: 1, prerequisites: [] }),
      createSubject({ id: 'cs101', year: 1, semester: 1, prerequisites: [] }),
      createSubject({ id: 'cs102', year: 1, semester: 2, prerequisites: [] }),
    ];

    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {},
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    const next = getNextRecommendedSubject(subjects, userProgress);
    expect(next?.id).toBe('cs101'); // Year 1, Semester 1 comes first
  });

  it('returns null when all subjects completed', () => {
    const subjects: Subject[] = [
      createSubject({ id: 'cs101', prerequisites: [] }),
    ];

    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        'cs101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    const next = getNextRecommendedSubject(subjects, userProgress);
    expect(next).toBeNull();
  });
});

describe('subject grouping by year and semester', () => {
  it('correctly groups subjects', () => {
    const subjects: Subject[] = [
      createSubject({ id: 'cs101', year: 1, semester: 1 }),
      createSubject({ id: 'cs102', year: 1, semester: 1 }),
      createSubject({ id: 'cs103', year: 1, semester: 2 }),
      createSubject({ id: 'cs201', year: 2, semester: 1 }),
    ];

    const grouped = getSubjectsByYearAndSemester(subjects);

    expect(grouped.get(1)?.get(1)?.length).toBe(2);
    expect(grouped.get(1)?.get(2)?.length).toBe(1);
    expect(grouped.get(2)?.get(1)?.length).toBe(1);
  });
});

describe('canStartSubject', () => {
  it('returns false for already completed subjects', () => {
    const subject = createSubject({ prerequisites: [] });
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        'test-subject': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    expect(canStartSubject(subject, userProgress)).toBe(false);
  });

  it('returns true for subject with met prerequisites', () => {
    const subject = createSubject({ id: 'cs102', prerequisites: ['cs101'] });
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        'cs101': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };

    expect(canStartSubject(subject, userProgress)).toBe(true);
  });
});

describe('item completion helper functions', () => {
  const progress: SubjectProgress = {
    status: 'in_progress',
    quizAttempts: {
      'quiz-passed': [createQuizAttempt(80)],
      'quiz-failed': [createQuizAttempt(50)],
      'quiz-multiple': [createQuizAttempt(50), createQuizAttempt(75), createQuizAttempt(60)],
    },
    examAttempts: {
      'exam-passed': [createExamAttempt(85)],
      'exam-failed': [createExamAttempt(40)],
    },
    exerciseCompletions: {
      'ex-passed': { completionId: 'c1', timestamp: '', code: '', passed: true, timeSpentSeconds: 0 },
      'ex-failed': { completionId: 'c2', timestamp: '', code: '', passed: false, timeSpentSeconds: 0 },
    },
    projectSubmissions: {
      'proj-passed': [createProjectSubmission(80)],
      'proj-failed': [createProjectSubmission(50)],
      'proj-no-ai': [createProjectSubmission(undefined)],
    },
  };

  describe('isQuizCompleted', () => {
    it('returns true for passed quiz', () => {
      expect(isQuizCompleted('quiz-passed', progress)).toBe(true);
    });

    it('returns false for failed quiz', () => {
      expect(isQuizCompleted('quiz-failed', progress)).toBe(false);
    });

    it('returns true when best of multiple attempts passes', () => {
      expect(isQuizCompleted('quiz-multiple', progress)).toBe(true);
    });

    it('returns false for non-existent quiz', () => {
      expect(isQuizCompleted('quiz-nonexistent', progress)).toBe(false);
    });

    it('returns false for undefined progress', () => {
      expect(isQuizCompleted('quiz-passed', undefined)).toBe(false);
    });
  });

  describe('getQuizBestScore', () => {
    it('returns best score from attempts', () => {
      expect(getQuizBestScore('quiz-multiple', progress)).toBe(75);
    });

    it('returns null for non-existent quiz', () => {
      expect(getQuizBestScore('quiz-nonexistent', progress)).toBeNull();
    });
  });

  describe('isExerciseCompleted', () => {
    it('returns true for passed exercise', () => {
      expect(isExerciseCompleted('ex-passed', progress)).toBe(true);
    });

    it('returns false for failed exercise', () => {
      expect(isExerciseCompleted('ex-failed', progress)).toBe(false);
    });
  });

  describe('isExamCompleted', () => {
    it('returns true for passed exam', () => {
      expect(isExamCompleted('exam-passed', progress)).toBe(true);
    });

    it('returns false for failed exam', () => {
      expect(isExamCompleted('exam-failed', progress)).toBe(false);
    });
  });

  describe('isProjectCompleted', () => {
    it('returns true for project with passing AI score', () => {
      expect(isProjectCompleted('proj-passed', progress)).toBe(true);
    });

    it('returns false for project with failing AI score', () => {
      expect(isProjectCompleted('proj-failed', progress)).toBe(false);
    });

    it('returns true for project submission without AI evaluation', () => {
      expect(isProjectCompleted('proj-no-ai', progress)).toBe(true);
    });
  });
});

describe('dependency tracking', () => {
  const subjects: Subject[] = [
    createSubject({ id: 'cs101', prerequisites: [] }),
    createSubject({ id: 'cs102', prerequisites: ['cs101'] }),
    createSubject({ id: 'cs103', prerequisites: ['cs101'] }),
    createSubject({ id: 'cs201', prerequisites: ['cs102', 'cs103'] }),
  ];

  describe('getDependentSubjects', () => {
    it('returns direct dependents only', () => {
      const dependents = getDependentSubjects('cs101', subjects);
      expect(dependents.map(s => s.id).sort()).toEqual(['cs102', 'cs103']);
    });

    it('returns empty array for subject with no dependents', () => {
      const dependents = getDependentSubjects('cs201', subjects);
      expect(dependents).toEqual([]);
    });
  });

  describe('getPrerequisiteSubjects', () => {
    it('returns immediate prerequisites', () => {
      const prereqs = getPrerequisiteSubjects(subjects[3], subjects); // cs201
      expect(prereqs.map(s => s.id).sort()).toEqual(['cs102', 'cs103']);
    });

    it('returns empty array for subject with no prerequisites', () => {
      const prereqs = getPrerequisiteSubjects(subjects[0], subjects); // cs101
      expect(prereqs).toEqual([]);
    });
  });
});
