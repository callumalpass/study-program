/**
 * Tests for exam content fixes
 *
 * These tests validate specific exam questions that were corrected
 * to ensure the fixes remain in place and are correct.
 */

import { describe, expect, it } from 'vitest';

// Import exam data
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });

interface ExamQuestion {
  id: string;
  type: string;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Exam {
  id: string;
  subjectId: string;
  title: string;
  questions: ExamQuestion[];
}

// Get all exams from all subjects
const allExams: Exam[] = Object.values(examModules).flatMap((module: unknown) => {
  const mod = module as { default?: Exam[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

// Helper to find a specific question
function findQuestion(examId: string, questionId: string): ExamQuestion | undefined {
  const exam = allExams.find(e => e.id === examId);
  return exam?.questions.find(q => q.id === questionId);
}

describe('CS406 Minimax Game Tree Fix', () => {
  it('cs406-midterm-q16 should have correct minimax answer of 3', () => {
    const question = findQuestion('cs406-midterm', 'cs406-midterm-q16');

    expect(question).toBeDefined();
    expect(question?.type).toBe('code_output');

    // The correct minimax evaluation:
    // Tree:     MAX
    //          /   \
    //        MIN   MIN
    //       /  \   /  \
    //      3   5  2   9
    //
    // Left MIN: min(3, 5) = 3
    // Right MIN: min(2, 9) = 2
    // Root MAX: max(3, 2) = 3
    expect(question?.correctAnswer).toBe('3');
  });

  it('cs406-midterm-q16 explanation should not contain confusing text', () => {
    const question = findQuestion('cs406-midterm', 'cs406-midterm-q16');

    expect(question).toBeDefined();
    // The explanation should not contain the old confusing text
    expect(question?.explanation).not.toContain('Wait, that\'s wrong');
    expect(question?.explanation).not.toContain('let me reconsider');
    // The explanation should correctly describe the minimax process
    expect(question?.explanation).toContain('min(3,5)=3');
    expect(question?.explanation).toContain('min(2,9)=2');
    expect(question?.explanation).toContain('max(3,2)=3');
  });

  it('minimax calculation should be mathematically verified', () => {
    // Verify the minimax algorithm calculation independently
    const leafValues = [3, 5, 2, 9];

    // MIN nodes pick minimum of their children
    const leftMinValue = Math.min(leafValues[0], leafValues[1]); // min(3, 5) = 3
    const rightMinValue = Math.min(leafValues[2], leafValues[3]); // min(2, 9) = 2

    // MAX node picks maximum of MIN children
    const maxValue = Math.max(leftMinValue, rightMinValue); // max(3, 2) = 3

    expect(leftMinValue).toBe(3);
    expect(rightMinValue).toBe(2);
    expect(maxValue).toBe(3);

    // Verify the question has this correct answer
    const question = findQuestion('cs406-midterm', 'cs406-midterm-q16');
    expect(question?.correctAnswer).toBe(String(maxValue));
  });
});

describe('CS104 Counter.most_common Explanation Fix', () => {
  it('cs104-final-q20 should have correct Counter.most_common answer', () => {
    const question = findQuestion('cs104-exam-final', 'final-q20');

    expect(question).toBeDefined();
    expect(question?.type).toBe('code_output');

    // The code: Counter("aabbbcc").most_common(2)
    // Counter gives: {'a': 2, 'b': 3, 'c': 2}
    // most_common(2) returns [('b', 3), ('a', 2)]
    // (b has highest count, a is returned for second because it was encountered first)
    expect(question?.correctAnswer).toBe("[('b', 3), ('a', 2)]");
  });

  it('cs104-final-q20 explanation should not make incorrect claims about insertion order', () => {
    const question = findQuestion('cs104-exam-final', 'final-q20');

    expect(question).toBeDefined();
    // The explanation should NOT claim "insertion order is preserved" as that's technically
    // misleading - it's the order elements are first encountered in the input
    expect(question?.explanation).not.toContain('insertion order is preserved');
  });

  it('cs104-final-q20 explanation should correctly describe the behavior', () => {
    const question = findQuestion('cs104-exam-final', 'final-q20');

    expect(question).toBeDefined();
    // Should mention counts correctly
    expect(question?.explanation).toContain('a:2');
    expect(question?.explanation).toContain('b:3');
    expect(question?.explanation).toContain('c:2');
    // Should describe what most_common does
    expect(question?.explanation).toContain('most_common(2)');
  });

  it('Counter.most_common behavior should be verified', () => {
    // Verify the expected Counter behavior for "aabbbcc"
    // Character counts: a=2, b=3, c=2
    // most_common(2) returns the 2 most common: b (3) then a (2, first encountered)

    const s = 'aabbbcc';
    const counts: Record<string, number> = {};
    for (const c of s) {
      counts[c] = (counts[c] || 0) + 1;
    }

    expect(counts['a']).toBe(2);
    expect(counts['b']).toBe(3);
    expect(counts['c']).toBe(2);

    // Verify b has highest count
    const sortedByCount = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    expect(sortedByCount[0]).toEqual(['b', 3]);

    // The question answer should match Python's Counter output format
    const question = findQuestion('cs104-exam-final', 'final-q20');
    expect(question?.correctAnswer).toBe("[('b', 3), ('a', 2)]");
  });
});

describe('Fixed Questions Should Not Contain Self-Doubt', () => {
  it('cs406-midterm-q16 should not contain self-doubt phrases', () => {
    const question = findQuestion('cs406-midterm', 'cs406-midterm-q16');

    expect(question).toBeDefined();
    const explanation = question?.explanation?.toLowerCase() || '';

    const problematicPhrases = [
      'wait, that\'s wrong',
      'let me reconsider',
      'actually reviewing',
      'but let me',
    ];

    problematicPhrases.forEach(phrase => {
      expect(
        explanation.includes(phrase),
        `cs406-midterm-q16 should not contain: "${phrase}"`
      ).toBe(false);
    });
  });
});
