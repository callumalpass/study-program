/**
 * Quiz Letter Reference Fixes Tests
 *
 * Tests that validate the fixes made to quiz questions that had fragile
 * "Both X and Y" letter references that would break if options were reordered.
 */

import { describe, expect, it } from 'vitest';

// Import quiz data for the specific subjects we fixed
import * as math102Topic5 from '../src/subjects/math102/content/topic-5/quizzes.json';
import * as math201Topic4 from '../src/subjects/math201/content/topic-4/quizzes.json';
import * as math203Topic5 from '../src/subjects/math203/content/topic-5/quizzes.json';
import * as math204Topic4 from '../src/subjects/math204/content/topic-4/quizzes.json';
import * as math204Topic5 from '../src/subjects/math204/content/topic-5/quizzes.json';
import * as math204Topic6 from '../src/subjects/math204/content/topic-6/quizzes.json';
import * as math204Topic7 from '../src/subjects/math204/content/topic-7/quizzes.json';
import * as math304Topic3 from '../src/subjects/math304/content/topic-3/quizzes.json';
import * as math404Topic2 from '../src/subjects/math404/content/topic-2/quizzes.json';
import * as cs202Topic1 from '../src/subjects/cs202/content/topic-1/quizzes.json';
import * as cs202Topic2 from '../src/subjects/cs202/content/topic-2/quizzes.json';

interface QuizQuestion {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  title: string;
  questions: QuizQuestion[];
}

// Helper to find a question by ID across quizzes
function findQuestion(quizzes: Quiz[], questionId: string): QuizQuestion | undefined {
  for (const quiz of quizzes) {
    const q = quiz.questions.find(q => q.id === questionId);
    if (q) return q;
  }
  return undefined;
}

// Helper to check if option contains fragile letter reference
function hasFragileLetterReference(option: string): boolean {
  // Match patterns like "Both A and B", "Both B and C", etc.
  return /both\s+[a-d]\s+and\s+[a-d]/i.test(option);
}

describe('Math102 Topic 5 Fixes', () => {
  const quizzes = math102Topic5.default as Quiz[];

  describe('math102-q5b-4 (Fermat\'s Little Theorem)', () => {
    const question = findQuestion(quizzes, 'math102-q5b-4');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should contain both equivalent forms', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx];
      expect(correctOption).toContain('a^(p-1)');
      expect(correctOption).toContain('a^p');
    });
  });
});

describe('Math201 Topic 4 Fixes', () => {
  const quizzes = math201Topic4.default as Quiz[];

  describe('math201-q4a-1 (Linear Independence Test)', () => {
    const question = findQuestion(quizzes, 'math201-q4a-1');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should mention rank or determinant', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('rank');
    });
  });
});

describe('Math203 Topic 5 Fixes', () => {
  const quizzes = math203Topic5.default as Quiz[];

  describe('math203-q5a-3 (Optimization Constraints)', () => {
    const question = findQuestion(quizzes, 'math203-q5a-3');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should describe constraint use', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('reduce');
      expect(correctOption).toContain('domain');
    });
  });
});

describe('Math204 Topic 4 Fixes', () => {
  const quizzes = math204Topic4.default as Quiz[];

  describe('math204-q4c-3 (Work Calculation)', () => {
    const question = findQuestion(quizzes, 'math204-q4c-3');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });
  });
});

describe('Math204 Topic 5 Fixes', () => {
  const quizzes = math204Topic5.default as Quiz[];

  describe('math204-q5c-4 (Improper Integral Discontinuity)', () => {
    const question = findQuestion(quizzes, 'math204-q5c-4');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should describe limit approach', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx];
      expect(correctOption).toContain('lim');
    });
  });
});

describe('Math204 Topic 6 Fixes', () => {
  const quizzes = math204Topic6.default as Quiz[];

  describe('math204-q6a-1 (Sequence Definition)', () => {
    const question = findQuestion(quizzes, 'math204-q6a-1');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should describe sequence comprehensively', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('ordered');
      expect(correctOption).toContain('natural');
    });
  });
});

describe('Math204 Topic 7 Fixes', () => {
  const quizzes = math204Topic7.default as Quiz[];

  describe('math204-q7c-1 (Taylor Remainder)', () => {
    const question = findQuestion(quizzes, 'math204-q7c-1');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should contain complete Lagrange formula', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx];
      expect(correctOption).toContain('R_n(x)');
      expect(correctOption).toContain('f(x) - P_n(x)');
    });
  });
});

describe('Math304 Topic 3 Fixes', () => {
  const quizzes = math304Topic3.default as Quiz[];

  describe('math304-q35 (Disjoint Cycles)', () => {
    const question = findQuestion(quizzes, 'math304-q35');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should be the definition (no common elements)', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('no common');
    });
  });
});

describe('Math404 Topic 2 Fixes', () => {
  const quizzes = math404Topic2.default as Quiz[];

  describe('math404-quiz-2b/q1 (LP Graphical Method)', () => {
    // Find the quiz first
    const quiz = quizzes.find(q => q.id === 'math404-quiz-2b');
    const question = quiz?.questions.find(q => q.id === 'q1');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should describe vertex/edge optimum', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('vertex');
      expect(correctOption).toContain('edge');
    });
  });
});

describe('CS202 Topic 1 Fixes', () => {
  const quizzes = cs202Topic1.default as Quiz[];

  describe('cs202-t1-q2-2 (MIPS Immediate Values)', () => {
    const question = findQuestion(quizzes, 'cs202-t1-q2-2');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should describe both signed and unsigned', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('unsigned');
      expect(correctOption).toContain('signed');
    });
  });
});

describe('CS202 Topic 2 Fixes', () => {
  const quizzes = cs202Topic2.default as Quiz[];

  describe('cs202-t2-q2-2 (MIPS Comparison)', () => {
    const question = findQuestion(quizzes, 'cs202-t2-q2-2');

    it('should exist', () => {
      expect(question).toBeDefined();
    });

    it('should not have fragile letter references in options', () => {
      expect(question!.options).toBeDefined();
      question!.options!.forEach((option, idx) => {
        expect(hasFragileLetterReference(option),
          `Option ${idx} "${option}" has fragile letter reference`
        ).toBe(false);
      });
    });

    it('correct answer should describe instruction approach', () => {
      const correctIdx = question!.correctAnswer as number;
      const correctOption = question!.options![correctIdx].toLowerCase();
      expect(correctOption).toContain('slt');
    });
  });
});

describe('Overall Letter Reference Fix Summary', () => {
  // Collect all quizzes
  const allFixedQuizzes = [
    ...(math102Topic5.default as Quiz[]),
    ...(math201Topic4.default as Quiz[]),
    ...(math203Topic5.default as Quiz[]),
    ...(math204Topic4.default as Quiz[]),
    ...(math204Topic5.default as Quiz[]),
    ...(math204Topic6.default as Quiz[]),
    ...(math204Topic7.default as Quiz[]),
    ...(math304Topic3.default as Quiz[]),
    ...(math404Topic2.default as Quiz[]),
    ...(cs202Topic1.default as Quiz[]),
    ...(cs202Topic2.default as Quiz[]),
  ];

  it('no fixed quiz should have "Both X and Y" patterns in options', () => {
    const issues: string[] = [];

    allFixedQuizzes.forEach(quiz => {
      quiz.questions
        .filter(q => q.type === 'multiple_choice' && q.options)
        .forEach(question => {
          question.options!.forEach((option, idx) => {
            if (hasFragileLetterReference(option)) {
              issues.push(`${quiz.id}/${question.id}: Option ${idx} = "${option}"`);
            }
          });
        });
    });

    expect(issues, `Found ${issues.length} fragile letter references:\n${issues.join('\n')}`).toHaveLength(0);
  });
});
