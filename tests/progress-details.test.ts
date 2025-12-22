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
