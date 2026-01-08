import { beforeEach, describe, expect, it } from 'vitest';
import type { Subject, SubjectProgress } from '../src/core/types';
import { getSubjectProgressDetails } from '../src/core/progress';
import { progressStorage } from '../src/core/storage';

const now = '2024-01-01T00:00:00.000Z';

const subject: Subject = {
  id: 'cs101',
  code: 'CS101',
  title: 'Intro',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'desc',
  learningObjectives: [],
  topics: [
    {
      id: 't1',
      title: 'Topic 1',
      content: '',
      quizIds: ['q1', 'q2'],
      exerciseIds: ['e1'],
    },
  ],
  estimatedHours: 10,
  examIds: ['exam1'],
  projectIds: ['proj1'],
};

const progress: SubjectProgress = {
  status: 'in_progress',
  startedAt: now,
  quizAttempts: {
    q1: [
      {
        attemptId: 'a1',
        timestamp: now,
        answers: {},
        score: 80,
        timeSpentSeconds: 10,
      },
    ],
    q2: [
      {
        attemptId: 'a2',
        timestamp: now,
        answers: {},
        score: 60,
        timeSpentSeconds: 10,
      },
    ],
  },
  examAttempts: {
    exam1: [
      {
        attemptId: 'e1',
        timestamp: now,
        answers: {},
        score: 75,
        timeSpentSeconds: 30,
      },
    ],
  },
  exerciseCompletions: {
    e1: {
      completionId: 'c1',
      timestamp: now,
      code: 'print("hi")',
      passed: true,
      timeSpentSeconds: 20,
    },
  },
  projectSubmissions: {
    proj1: [
      {
        submissionId: 'p1',
        timestamp: now,
        description: 'submission',
        selfAssessment: {},
        notes: '',
        aiEvaluation: {
          score: 85,
          feedback: 'ok',
          rubricScores: {},
          strengths: [],
          improvements: [],
        },
      },
    ],
  },
};

describe('getSubjectProgressDetails', () => {
  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('reports zeroed stats when no progress exists', () => {
    const details = getSubjectProgressDetails(subject);
    expect(details.status).toBe('not_started');
    expect(details.quizzesCompleted).toBe(0);
    expect(details.totalQuizzes).toBe(2);
    expect(details.exercisesCompleted).toBe(0);
    expect(details.totalExercises).toBe(1);
    expect(details.examsCompleted).toBe(0);
    expect(details.totalExams).toBe(1);
    expect(details.projectsCompleted).toBe(0);
    expect(details.totalProjects).toBe(1);
  });

  it('counts completed items based on thresholds', () => {
    progressStorage.updateSubjectProgress(subject.id, progress);
    const details = getSubjectProgressDetails(subject);
    expect(details.status).toBe('in_progress');
    expect(details.quizzesCompleted).toBe(1);
    expect(details.exercisesCompleted).toBe(1);
    expect(details.examsCompleted).toBe(1);
    expect(details.projectsCompleted).toBe(1);
    expect(details.completionPercentage).toBe(80);
  });
});

describe('Project submission edge cases', () => {
  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('counts project as complete when submission has no AI evaluation', () => {
    const progressWithoutAI: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {
        proj1: [
          {
            submissionId: 'p1',
            timestamp: now,
            description: 'my project submission',
            selfAssessment: {},
            notes: 'completed without AI eval',
          },
        ],
      },
    };
    progressStorage.updateSubjectProgress(subject.id, progressWithoutAI);
    const details = getSubjectProgressDetails(subject);
    expect(details.projectsCompleted).toBe(1);
  });

  it('does not count project with failing AI evaluation score', () => {
    const progressWithFailingAI: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {
        proj1: [
          {
            submissionId: 'p1',
            timestamp: now,
            description: 'my project',
            selfAssessment: {},
            notes: '',
            aiEvaluation: {
              score: 50, // Below passing threshold of 70
              feedback: 'needs work',
              rubricScores: {},
              strengths: [],
              improvements: ['more tests needed'],
            },
          },
        ],
      },
    };
    progressStorage.updateSubjectProgress(subject.id, progressWithFailingAI);
    const details = getSubjectProgressDetails(subject);
    expect(details.projectsCompleted).toBe(0);
  });

  it('uses best AI score from multiple submissions', () => {
    const progressMultipleSubmissions: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {
        proj1: [
          {
            submissionId: 'p1',
            timestamp: now,
            description: 'first attempt',
            selfAssessment: {},
            notes: '',
            aiEvaluation: {
              score: 50,
              feedback: 'needs improvement',
              rubricScores: {},
              strengths: [],
              improvements: [],
            },
          },
          {
            submissionId: 'p2',
            timestamp: now,
            description: 'second attempt',
            selfAssessment: {},
            notes: '',
            aiEvaluation: {
              score: 85, // Passing score
              feedback: 'good job',
              rubricScores: {},
              strengths: ['clean code'],
              improvements: [],
            },
          },
        ],
      },
    };
    progressStorage.updateSubjectProgress(subject.id, progressMultipleSubmissions);
    const details = getSubjectProgressDetails(subject);
    expect(details.projectsCompleted).toBe(1);
  });

  it('handles empty project submissions array', () => {
    const progressEmptySubmissions: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {
        proj1: [],
      },
    };
    progressStorage.updateSubjectProgress(subject.id, progressEmptySubmissions);
    const details = getSubjectProgressDetails(subject);
    expect(details.projectsCompleted).toBe(0);
  });
});

describe('Quiz and exam attempt edge cases', () => {
  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('uses best score from multiple quiz attempts', () => {
    const progressMultipleAttempts: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [
          { attemptId: 'a1', timestamp: now, answers: {}, score: 40, timeSpentSeconds: 10 },
          { attemptId: 'a2', timestamp: now, answers: {}, score: 75, timeSpentSeconds: 15 },
          { attemptId: 'a3', timestamp: now, answers: {}, score: 60, timeSpentSeconds: 12 },
        ],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressMultipleAttempts);
    const details = getSubjectProgressDetails(subject);
    // Best score is 75 which is >= 70 passing threshold
    expect(details.quizzesCompleted).toBe(1);
  });

  it('handles exactly passing score (70)', () => {
    const progressExactPass: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [{ attemptId: 'a1', timestamp: now, answers: {}, score: 70, timeSpentSeconds: 10 }],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressExactPass);
    const details = getSubjectProgressDetails(subject);
    expect(details.quizzesCompleted).toBe(1);
  });

  it('handles score just below passing (69)', () => {
    const progressJustBelow: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [{ attemptId: 'a1', timestamp: now, answers: {}, score: 69, timeSpentSeconds: 10 }],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressJustBelow);
    const details = getSubjectProgressDetails(subject);
    expect(details.quizzesCompleted).toBe(0);
  });

  it('handles empty quiz attempts array', () => {
    const progressEmptyAttempts: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressEmptyAttempts);
    const details = getSubjectProgressDetails(subject);
    expect(details.quizzesCompleted).toBe(0);
  });

  it('uses best score from multiple exam attempts', () => {
    const progressMultipleExams: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {
        exam1: [
          { attemptId: 'e1', timestamp: now, answers: {}, score: 55, timeSpentSeconds: 60 },
          { attemptId: 'e2', timestamp: now, answers: {}, score: 80, timeSpentSeconds: 55 },
        ],
      },
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressMultipleExams);
    const details = getSubjectProgressDetails(subject);
    expect(details.examsCompleted).toBe(1);
  });
});

describe('Exercise completion edge cases', () => {
  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('does not count exercise when passed is false', () => {
    const progressFailedExercise: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {
        e1: {
          completionId: 'c1',
          timestamp: now,
          code: 'print("incorrect")',
          passed: false,
          timeSpentSeconds: 20,
        },
      },
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressFailedExercise);
    const details = getSubjectProgressDetails(subject);
    expect(details.exercisesCompleted).toBe(0);
  });

  it('counts exercise when passed is true', () => {
    const progressPassedExercise: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {},
      examAttempts: {},
      exerciseCompletions: {
        e1: {
          completionId: 'c1',
          timestamp: now,
          code: 'print("correct")',
          passed: true,
          timeSpentSeconds: 20,
        },
      },
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(subject.id, progressPassedExercise);
    const details = getSubjectProgressDetails(subject);
    expect(details.exercisesCompleted).toBe(1);
  });
});

describe('Subject without optional fields', () => {
  const minimalSubject: Subject = {
    id: 'minimal',
    code: 'MIN100',
    title: 'Minimal Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'A minimal subject',
    learningObjectives: [],
    topics: [
      {
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1'],
        exerciseIds: [],
      },
    ],
    estimatedHours: 5,
    // No examIds or projectIds
  };

  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('handles subject without exams or projects', () => {
    const details = getSubjectProgressDetails(minimalSubject);
    expect(details.totalExams).toBe(0);
    expect(details.examsCompleted).toBe(0);
    expect(details.totalProjects).toBe(0);
    expect(details.projectsCompleted).toBe(0);
  });

  it('calculates 100% completion when only quiz is passed', () => {
    const progressWithQuiz: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [{ attemptId: 'a1', timestamp: now, answers: {}, score: 100, timeSpentSeconds: 5 }],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(minimalSubject.id, progressWithQuiz);
    const details = getSubjectProgressDetails(minimalSubject);
    expect(details.completionPercentage).toBe(100);
    expect(details.quizzesCompleted).toBe(1);
    expect(details.totalQuizzes).toBe(1);
  });
});

describe('Completion percentage calculations', () => {
  const multiItemSubject: Subject = {
    id: 'multi',
    code: 'MULTI100',
    title: 'Multi Item Subject',
    category: 'cs',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Subject with many items',
    learningObjectives: [],
    topics: [
      {
        id: 't1',
        title: 'Topic 1',
        content: '',
        quizIds: ['q1', 'q2', 'q3', 'q4'],
        exerciseIds: ['e1', 'e2'],
      },
    ],
    estimatedHours: 20,
    examIds: ['exam1', 'exam2'],
    projectIds: ['proj1', 'proj2'],
  };

  beforeEach(() => {
    progressStorage.resetProgress();
  });

  it('calculates 50% when half of items are completed', () => {
    // Total items: 4 quizzes + 2 exercises + 2 exams + 2 projects = 10
    // Complete 5 items = 50%
    const progressHalfDone: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [{ attemptId: 'a1', timestamp: now, answers: {}, score: 80, timeSpentSeconds: 10 }],
        q2: [{ attemptId: 'a2', timestamp: now, answers: {}, score: 90, timeSpentSeconds: 10 }],
      },
      examAttempts: {
        exam1: [{ attemptId: 'e1', timestamp: now, answers: {}, score: 75, timeSpentSeconds: 60 }],
      },
      exerciseCompletions: {
        e1: { completionId: 'c1', timestamp: now, code: '', passed: true, timeSpentSeconds: 20 },
      },
      projectSubmissions: {
        proj1: [{ submissionId: 'p1', timestamp: now, description: '', selfAssessment: {}, notes: '' }],
      },
    };
    progressStorage.updateSubjectProgress(multiItemSubject.id, progressHalfDone);
    const details = getSubjectProgressDetails(multiItemSubject);
    expect(details.completionPercentage).toBe(50);
  });

  it('rounds completion percentage correctly', () => {
    // 3 out of 10 items = 30%
    const progressThreeItems: SubjectProgress = {
      status: 'in_progress',
      startedAt: now,
      quizAttempts: {
        q1: [{ attemptId: 'a1', timestamp: now, answers: {}, score: 100, timeSpentSeconds: 10 }],
        q2: [{ attemptId: 'a2', timestamp: now, answers: {}, score: 100, timeSpentSeconds: 10 }],
        q3: [{ attemptId: 'a3', timestamp: now, answers: {}, score: 100, timeSpentSeconds: 10 }],
      },
      examAttempts: {},
      exerciseCompletions: {},
      projectSubmissions: {},
    };
    progressStorage.updateSubjectProgress(multiItemSubject.id, progressThreeItems);
    const details = getSubjectProgressDetails(multiItemSubject);
    expect(details.completionPercentage).toBe(30);
  });
});
