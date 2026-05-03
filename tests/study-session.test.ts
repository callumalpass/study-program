import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Subject } from '../src/core/types';
import { progressStorage } from '../src/core/storage';
import {
  advanceStudySession,
  buildStudySessionQueue,
  createStudySessionHistoryEntry,
  getCurrentStudySessionItem,
  startStudySession,
} from '../src/core/study-session';

const subject: Subject = {
  id: 'cs101',
  code: 'CS101',
  title: 'Introduction to Computer Science',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'Foundations.',
  learningObjectives: [],
  estimatedHours: 120,
  examIds: ['cs101-final'],
  projectIds: ['cs101-project'],
  topics: [
    {
      id: 'topic-1',
      title: 'Foundations',
      content: '',
      quizIds: ['cs101-quiz-1'],
      exerciseIds: ['cs101-t1-ex01'],
      subtopics: [
        { id: 'cs101-t1-intro', slug: 'intro', title: 'Introduction', content: '', order: 1 },
        { id: 'cs101-t1-logic', slug: 'logic', title: 'Logic', content: '', order: 2 },
      ],
    },
  ],
};

describe('study session queue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    progressStorage.resetProgress();
    localStorage.removeItem('study_program_active_session');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the next incomplete reading section', () => {
    const queue = buildStudySessionQueue([subject], progressStorage.getProgress());

    expect(queue[0].itemType).toBe('read');
    expect(queue[0].title).toBe('Read: Introduction');
    expect(queue[0].href).toBe('#/subject/cs101/topic/topic-1/subtopic/intro');
  });

  it('adds practice after topic reading has started', () => {
    progressStorage.recordSubtopicCompletion('cs101', 'cs101-t1-intro');

    const queue = buildStudySessionQueue([subject], progressStorage.getProgress());

    expect(queue.map(item => item.itemType)).toEqual(['read', 'quiz']);
    expect(queue[0].title).toBe('Read: Logic');
    expect(queue[1].title).toBe('Quiz: CS101 Quiz 1');
  });

  it('puts due reviews before learning work', () => {
    progressStorage.addToReviewQueue({
      itemType: 'quiz',
      itemId: 'cs101-quiz-1',
      subjectId: 'cs101',
    });
    progressStorage.save();

    const queue = buildStudySessionQueue([subject], progressStorage.getProgress());

    expect(queue[0].itemType).toBe('review');
    expect(queue[0].title).toBe('Review: CS101 Quiz 1');
    expect(queue[1].itemType).toBe('read');
  });

  it('advances when the current reading item is explicitly completed', () => {
    const session = startStudySession([subject], progressStorage.getProgress());
    expect(session).not.toBeNull();
    expect(getCurrentStudySessionItem(session!)?.targetId).toBe('cs101-t1-intro');

    progressStorage.recordSubtopicCompletion('cs101', 'cs101-t1-intro');
    const advanced = advanceStudySession(session!, progressStorage.getProgress());

    expect(advanced.completedItemIds).toContain('read:cs101:cs101-t1-intro');
    expect(advanced.currentIndex).toBe(1);
  });

  it('records completed study session history once per session', () => {
    const session = startStudySession([subject], progressStorage.getProgress());
    expect(session).not.toBeNull();

    vi.setSystemTime(new Date('2026-01-01T00:25:00.000Z'));
    progressStorage.recordSubtopicCompletion('cs101', 'cs101-t1-intro');

    const advanced = advanceStudySession(session!, progressStorage.getProgress());
    const entry = createStudySessionHistoryEntry(advanced, progressStorage.getProgress());

    progressStorage.recordStudySessionCompletion(entry);
    progressStorage.recordStudySessionCompletion(entry);

    const history = progressStorage.getStudySessionHistory();
    expect(history).toHaveLength(1);
    expect(history[0].sessionId).toBe(session!.id);
    expect(history[0].durationSeconds).toBe(25 * 60);
    expect(history[0].summary.sectionsCompleted).toBe(1);
  });
});
