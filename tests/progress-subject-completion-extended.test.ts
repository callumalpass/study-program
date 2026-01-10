/**
 * Extended Tests for Subject Progress and Completion
 *
 * Additional tests for calculateSubjectCompletion, arePrerequisitesMet, and related
 * progress calculation functions with various edge cases.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateSubjectCompletion,
  arePrerequisitesMet,
  getAvailableSubjects,
  getInProgressSubjects,
  getCompletedSubjects,
  calculateOverallProgress,
  getNextRecommendedSubject,
  canStartSubject,
  isQuizCompleted,
  getQuizBestScore,
  isExerciseCompleted,
  isExamCompleted,
  getExamBestScore,
  isProjectCompleted,
  getDependentSubjects,
  getPrerequisiteSubjects,
} from '../src/core/progress';
import type { Subject, SubjectProgress, UserProgress, QuizAttempt, ExamAttempt, ProjectSubmission } from '../src/core/types';
import { QUIZ_PASSING_SCORE } from '../src/core/types';

// Helper to create a subject
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
    learningObjectives: [],
    topics: [],
    estimatedHours: 40,
    ...overrides,
  };
}

// Helper to create a quiz attempt
function createQuizAttempt(score: number): QuizAttempt {
  return {
    attemptId: `attempt-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 300,
  };
}

// Helper to create an exam attempt
function createExamAttempt(score: number): ExamAttempt {
  return {
    attemptId: `attempt-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    answers: {},
    score,
    timeSpentSeconds: 3600,
  };
}

// Helper to create a project submission
function createProjectSubmission(aiScore?: number): ProjectSubmission {
  return {
    submissionId: `submission-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    description: 'Test submission',
    selfAssessment: {},
    notes: '',
    ...(aiScore !== undefined ? {
      aiEvaluation: {
        score: aiScore,
        feedback: 'Test feedback',
        rubricScores: {},
        strengths: [],
        improvements: [],
      },
    } : {}),
  };
}

describe('calculateSubjectCompletion - Extended Edge Cases', () => {
  describe('boundary conditions', () => {
    it('handles score exactly at passing threshold', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE)], // Exactly at threshold
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles score one point below passing threshold', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE - 1)], // Just below threshold
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles zero score', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(0)],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(0);
    });

    it('handles perfect score', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(100)],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('multiple attempts selection', () => {
    it('selects best score from multiple attempts', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(50),
            createQuizAttempt(60),
            createQuizAttempt(QUIZ_PASSING_SCORE + 5),
            createQuizAttempt(65),
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });

    it('handles attempts in descending order', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(QUIZ_PASSING_SCORE + 10),
            createQuizAttempt(QUIZ_PASSING_SCORE),
            createQuizAttempt(50),
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });

  describe('mixed item types with various completion states', () => {
    it('calculates partial completion correctly', () => {
      const subject = createSubject({
        examIds: ['exam-1', 'exam-2'],
        projectIds: ['proj-1'],
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1', 'quiz-2'], exerciseIds: ['ex-1', 'ex-2'] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE)], // pass
          'quiz-2': [createQuizAttempt(50)], // fail
        },
        examAttempts: {
          'exam-1': [createExamAttempt(QUIZ_PASSING_SCORE)], // pass
          // exam-2 not attempted
        },
        exerciseCompletions: {
          'ex-1': { completionId: 'c1', timestamp: '', code: '', passed: true, timeSpentSeconds: 0 },
          // ex-2 not attempted
        },
        projectSubmissions: {
          'proj-1': [createProjectSubmission(QUIZ_PASSING_SCORE)], // pass
        },
      };
      // Total: 7 items, 4 passed = 57% (rounds to 57)
      expect(calculateSubjectCompletion(subject, progress)).toBe(57);
    });
  });

  describe('edge cases with missing data', () => {
    it('handles quiz ID referenced but not in attempts', () => {
      const subject = createSubject({
        topics: [
          { id: 't1', title: 'Topic 1', content: '', quizIds: ['quiz-1', 'quiz-2'], exerciseIds: [] },
        ],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(QUIZ_PASSING_SCORE)],
          // quiz-2 not in attempts at all
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      // 1 out of 2 quizzes = 50%
      expect(calculateSubjectCompletion(subject, progress)).toBe(50);
    });

    it('handles empty topics array', () => {
      const subject = createSubject({
        topics: [],
        examIds: ['exam-1'],
      });
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {
          'exam-1': [createExamAttempt(QUIZ_PASSING_SCORE)],
        },
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      // Only 1 exam, and it's passed = 100%
      expect(calculateSubjectCompletion(subject, progress)).toBe(100);
    });
  });
});

describe('arePrerequisitesMet - Extended Cases', () => {
  describe('complex prerequisite chains', () => {
    it('handles multiple prerequisites', () => {
      const subject = createSubject({ prerequisites: ['prereq-1', 'prereq-2', 'prereq-3'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'prereq-1': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
          'prereq-2': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
          'prereq-3': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(true);
    });

    it('fails if any of multiple prerequisites incomplete', () => {
      const subject = createSubject({ prerequisites: ['prereq-1', 'prereq-2', 'prereq-3'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'prereq-1': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
          'prereq-2': { status: 'not_started', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
          'prereq-3': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });
  });

  describe('status edge cases', () => {
    it('considers not_started as not completed', () => {
      const subject = createSubject({ prerequisites: ['prereq'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'prereq': { status: 'not_started', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });

    it('considers in_progress as not completed', () => {
      const subject = createSubject({ prerequisites: ['prereq'] });
      const userProgress: UserProgress = {
        version: 4,
        startedAt: new Date().toISOString(),
        subjects: {
          'prereq': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        },
        settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
      };
      expect(arePrerequisitesMet(subject, userProgress)).toBe(false);
    });
  });
});

describe('getNextRecommendedSubject - Extended Cases', () => {
  it('prioritizes current in-progress subject', () => {
    const subjects = [
      createSubject({ id: 's1', year: 1, semester: 1 }),
      createSubject({ id: 's2', year: 1, semester: 1 }),
      createSubject({ id: 's3', year: 2, semester: 1 }),
    ];
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        's3': { status: 'in_progress', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };
    const next = getNextRecommendedSubject(subjects, userProgress);
    expect(next?.id).toBe('s3');
  });

  it('returns earliest by year then semester', () => {
    const subjects = [
      createSubject({ id: 's1', year: 2, semester: 1 }),
      createSubject({ id: 's2', year: 1, semester: 2 }),
      createSubject({ id: 's3', year: 1, semester: 1 }),
    ];
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {},
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };
    const next = getNextRecommendedSubject(subjects, userProgress);
    expect(next?.id).toBe('s3'); // Year 1, Semester 1 comes first
  });

  it('handles empty subjects array', () => {
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {},
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };
    const next = getNextRecommendedSubject([], userProgress);
    expect(next).toBeNull();
  });
});

describe('item completion checks - Extended Edge Cases', () => {
  describe('isQuizCompleted', () => {
    it('returns false for undefined quiz attempts record', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(isQuizCompleted('nonexistent', progress)).toBe(false);
    });

    it('handles multiple attempts correctly selecting best', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(40),
            createQuizAttempt(60),
            createQuizAttempt(QUIZ_PASSING_SCORE + 1),
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(isQuizCompleted('quiz-1', progress)).toBe(true);
    });
  });

  describe('getQuizBestScore', () => {
    it('returns highest score from multiple attempts', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [
            createQuizAttempt(40),
            createQuizAttempt(90),
            createQuizAttempt(60),
          ],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(getQuizBestScore('quiz-1', progress)).toBe(90);
    });

    it('returns single attempt score', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {
          'quiz-1': [createQuizAttempt(75)],
        },
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
      expect(getQuizBestScore('quiz-1', progress)).toBe(75);
    });
  });

  describe('isProjectCompleted', () => {
    it('handles project with multiple submissions, best AI score', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj-1': [
            createProjectSubmission(50),
            createProjectSubmission(QUIZ_PASSING_SCORE),
            createProjectSubmission(60),
          ],
        },
      };
      expect(isProjectCompleted('proj-1', progress)).toBe(true);
    });

    it('returns false when no submissions', () => {
      const progress: SubjectProgress = {
        status: 'in_progress',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {
          'proj-1': [],
        },
      };
      expect(isProjectCompleted('proj-1', progress)).toBe(false);
    });
  });
});

describe('getDependentSubjects - Extended Cases', () => {
  it('finds direct dependents only', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: ['s1'] }),
      createSubject({ id: 's3', prerequisites: ['s2'] }), // Indirect dependent of s1
    ];
    const dependents = getDependentSubjects('s1', subjects);
    // Only s2 is a direct dependent
    expect(dependents.map(s => s.id)).toEqual(['s2']);
  });

  it('handles subject with multiple dependents', () => {
    const subjects = [
      createSubject({ id: 's1', prerequisites: [] }),
      createSubject({ id: 's2', prerequisites: ['s1'] }),
      createSubject({ id: 's3', prerequisites: ['s1'] }),
      createSubject({ id: 's4', prerequisites: ['s1'] }),
    ];
    const dependents = getDependentSubjects('s1', subjects);
    expect(dependents).toHaveLength(3);
  });
});

describe('getPrerequisiteSubjects - Extended Cases', () => {
  it('returns all prerequisite subjects', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      createSubject({ id: 's2' }),
      createSubject({ id: 's3' }),
      createSubject({ id: 's4', prerequisites: ['s1', 's2', 's3'] }),
    ];
    const prereqs = getPrerequisiteSubjects(subjects[3], subjects);
    expect(prereqs.map(s => s.id).sort()).toEqual(['s1', 's2', 's3']);
  });

  it('handles partial prerequisite availability', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      // s2 doesn't exist
      createSubject({ id: 's3', prerequisites: ['s1', 's2'] }),
    ];
    const prereqs = getPrerequisiteSubjects(subjects[1], subjects);
    // Only s1 found since s2 doesn't exist
    expect(prereqs.map(s => s.id)).toEqual(['s1']);
  });
});

describe('calculateOverallProgress - Extended Cases', () => {
  it('handles subjects with zero estimated hours', () => {
    const subjects = [
      createSubject({ id: 's1', estimatedHours: 0 }),
      createSubject({ id: 's2', estimatedHours: 40 }),
    ];
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        's1': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };
    const progress = calculateOverallProgress(subjects, userProgress);
    expect(progress.totalSubjects).toBe(2);
    expect(progress.completedSubjects).toBe(1);
    expect(progress.totalHours).toBe(40);
  });

  it('returns 100% when all subjects completed', () => {
    const subjects = [
      createSubject({ id: 's1' }),
      createSubject({ id: 's2' }),
    ];
    const userProgress: UserProgress = {
      version: 4,
      startedAt: new Date().toISOString(),
      subjects: {
        's1': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
        's2': { status: 'completed', quizAttempts: {}, examAttempts: {}, exerciseCompletions: {}, projectSubmissions: {} },
      },
      settings: { theme: 'auto', codeEditorFontSize: 14, showCompletedItems: true },
    };
    const progress = calculateOverallProgress(subjects, userProgress);
    expect(progress.percentageComplete).toBe(100);
  });
});
