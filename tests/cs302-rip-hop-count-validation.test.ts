/**
 * Tests for CS302 RIP hop count question fix
 *
 * This validates that the RIP question correctly tests knowledge about
 * RIP hop count limits: routes with 1-15 hops are reachable, 16 means unreachable.
 */
import { describe, it, expect } from 'vitest';
import cs302Quizzes from '../src/subjects/cs302/content/topic-4/quizzes.json';

describe('CS302 RIP Hop Count Question Validation', () => {
  // Find the quiz and question
  const quiz4b = cs302Quizzes.find(q => q.id === 'cs302-quiz-4b');
  const ripQuestion = quiz4b?.questions.find(q => q.id === 'q4b-3');

  it('should have the RIP hop count question', () => {
    expect(quiz4b).toBeDefined();
    expect(ripQuestion).toBeDefined();
  });

  it('should ask about maximum REACHABLE hop count', () => {
    expect(ripQuestion?.prompt).toContain('reachable');
    // The question should NOT be asking about "before unreachable" which is ambiguous
    expect(ripQuestion?.prompt).not.toMatch(/before.*unreachable/i);
  });

  it('should have correct answer as 15 (not 16)', () => {
    // 15 is the maximum reachable hop count in RIP
    // 16 means unreachable/infinity
    const correctIndex = ripQuestion?.correctAnswer;
    expect(correctIndex).toBe(2); // Index 2 is "15"

    const correctOption = ripQuestion?.options[correctIndex as number];
    expect(correctOption).toBe('15');
  });

  it('should have options that include both 15 and 16', () => {
    expect(ripQuestion?.options).toContain('15');
    expect(ripQuestion?.options).toContain('16');
  });

  it('should have explanation mentioning both 15 (reachable) and 16 (unreachable)', () => {
    const explanation = ripQuestion?.explanation || '';
    expect(explanation).toMatch(/15/);
    expect(explanation).toMatch(/16/);
    expect(explanation.toLowerCase()).toMatch(/unreachable|infinity/);
  });

  it('should be a multiple choice question', () => {
    expect(ripQuestion?.type).toBe('multiple_choice');
  });

  describe('RIP protocol accuracy', () => {
    it('should correctly represent RIP hop count semantics', () => {
      // Validate that the question and answer align with RFC 2453 (RIP v2)
      // - Hop count 1-15: valid, reachable routes
      // - Hop count 16: infinity, unreachable

      const explanation = ripQuestion?.explanation || '';
      const correctAnswer = ripQuestion?.options[ripQuestion?.correctAnswer as number];

      // The correct answer should be 15 (maximum reachable)
      expect(correctAnswer).toBe('15');

      // The explanation should clarify the semantics
      expect(explanation.toLowerCase()).toContain('maximum');
      expect(explanation.toLowerCase()).toContain('reachable');
    });

    it('should not confuse students about RIP limits', () => {
      // Common misconception: "16 is the max hop count"
      // Reality: 16 is the UNREACHABLE marker, 15 is the max REACHABLE

      const prompt = ripQuestion?.prompt || '';
      const correctAnswer = ripQuestion?.options[ripQuestion?.correctAnswer as number];

      // If asking about reachable routes, answer must be 15
      if (prompt.toLowerCase().includes('reachable')) {
        expect(correctAnswer).toBe('15');
      }

      // If asking about unreachable indicator, answer would be 16
      // (but our question asks about reachable, so this shouldn't apply)
      expect(prompt.toLowerCase()).not.toContain('unreachable');
    });
  });
});

describe('CS302 Topic 4 Quiz Structure', () => {
  it('should have three quizzes for topic 4', () => {
    expect(cs302Quizzes).toHaveLength(3);
  });

  it('should have proper quiz IDs', () => {
    const quizIds = cs302Quizzes.map(q => q.id);
    expect(quizIds).toContain('cs302-quiz-4a');
    expect(quizIds).toContain('cs302-quiz-4b');
    expect(quizIds).toContain('cs302-quiz-4c');
  });

  it('should have 5 questions per quiz', () => {
    for (const quiz of cs302Quizzes) {
      expect(quiz.questions).toHaveLength(5);
    }
  });

  it('should have correct subjectId and topicId', () => {
    for (const quiz of cs302Quizzes) {
      expect(quiz.subjectId).toBe('cs302');
      expect(quiz.topicId).toBe('cs302-topic-4');
    }
  });

  describe('All multiple choice questions validation', () => {
    const allMCQuestions = cs302Quizzes.flatMap(quiz =>
      quiz.questions.filter(q => q.type === 'multiple_choice')
    );

    it('should have valid correctAnswer indices', () => {
      for (const q of allMCQuestions) {
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(q.options.length);
      }
    });

    it('should have 4 options each', () => {
      for (const q of allMCQuestions) {
        expect(q.options).toHaveLength(4);
      }
    });

    it('should have explanations', () => {
      for (const q of allMCQuestions) {
        expect(q.explanation).toBeDefined();
        expect(q.explanation.length).toBeGreaterThan(10);
      }
    });
  });
});
