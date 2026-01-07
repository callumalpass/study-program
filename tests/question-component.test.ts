/**
 * Question Component Tests
 *
 * Tests for the Question component, focusing on:
 * - Language-specific syntax highlighting for code snippets
 * - Answer normalization and checking
 * - Multiple choice option index resolution
 * - Various question type rendering
 */

import { describe, it, expect } from 'vitest';
import type { QuizQuestion, QuizAnswer, CodingAnswer, ProgrammingLanguage } from '@/core/types';

// Helper functions mirroring Question.tsx implementation

function normalizeAnswer(value: string | number | boolean | undefined): string {
  if (value === undefined) return '';
  return String(value).trim().toLowerCase();
}

/**
 * Get the correct option index for a multiple choice question.
 * Handles both numeric indices and string values that match an option.
 */
function getCorrectOptionIndex(question: QuizQuestion): number {
  const correctAnswer = question.correctAnswer;

  // If already a number, return it directly
  if (typeof correctAnswer === 'number') {
    return correctAnswer;
  }

  // If a string, find the matching option index
  if (typeof correctAnswer === 'string' && question.options) {
    const index = question.options.indexOf(correctAnswer);
    if (index !== -1) {
      return index;
    }
  }

  // Fallback: return -1 to indicate no valid answer found
  return -1;
}

/**
 * Get the Prism language class for a code snippet.
 * Defaults to Python if no language specified.
 */
function getLanguageClass(language: ProgrammingLanguage | undefined): string {
  return `language-${language || 'python'}`;
}

describe('Question Component - Language Highlighting', () => {
  describe('getLanguageClass', () => {
    it('returns language-python when no language specified', () => {
      expect(getLanguageClass(undefined)).toBe('language-python');
    });

    it('returns correct class for python', () => {
      expect(getLanguageClass('python')).toBe('language-python');
    });

    it('returns correct class for c', () => {
      expect(getLanguageClass('c')).toBe('language-c');
    });

    it('returns correct class for cpp', () => {
      expect(getLanguageClass('cpp')).toBe('language-cpp');
    });

    it('returns correct class for java', () => {
      expect(getLanguageClass('java')).toBe('language-java');
    });

    it('returns correct class for javascript', () => {
      expect(getLanguageClass('javascript')).toBe('language-javascript');
    });

    it('returns correct class for typescript', () => {
      expect(getLanguageClass('typescript')).toBe('language-typescript');
    });

    it('returns correct class for rust', () => {
      expect(getLanguageClass('rust')).toBe('language-rust');
    });

    it('returns correct class for go', () => {
      expect(getLanguageClass('go')).toBe('language-go');
    });

    it('returns correct class for sql', () => {
      expect(getLanguageClass('sql')).toBe('language-sql');
    });

    it('returns correct class for bash', () => {
      expect(getLanguageClass('bash')).toBe('language-bash');
    });
  });

  describe('code_output questions with various languages', () => {
    it('uses python highlighting for Python code output question', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'print("Hello")',
        language: 'python',
        correctAnswer: 'Hello',
        explanation: 'print outputs the string',
      };
      expect(getLanguageClass(question.language)).toBe('language-python');
    });

    it('uses c highlighting for C code output question', () => {
      const question: QuizQuestion = {
        id: 'q2',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'printf("Hello");',
        language: 'c',
        correctAnswer: 'Hello',
        explanation: 'printf outputs the string',
      };
      expect(getLanguageClass(question.language)).toBe('language-c');
    });

    it('uses cpp highlighting for C++ code output question', () => {
      const question: QuizQuestion = {
        id: 'q3',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'cout << "Hello";',
        language: 'cpp',
        correctAnswer: 'Hello',
        explanation: 'cout outputs the string',
      };
      expect(getLanguageClass(question.language)).toBe('language-cpp');
    });

    it('uses java highlighting for Java code output question', () => {
      const question: QuizQuestion = {
        id: 'q4',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'System.out.println("Hello");',
        language: 'java',
        correctAnswer: 'Hello',
        explanation: 'println outputs the string',
      };
      expect(getLanguageClass(question.language)).toBe('language-java');
    });

    it('defaults to python when no language specified', () => {
      const question: QuizQuestion = {
        id: 'q5',
        type: 'code_output',
        prompt: 'What is the output?',
        codeSnippet: 'print("Hello")',
        correctAnswer: 'Hello',
        explanation: 'print outputs the string',
      };
      expect(getLanguageClass(question.language)).toBe('language-python');
    });
  });
});

describe('Question Component - Answer Normalization', () => {
  describe('normalizeAnswer', () => {
    it('converts string to lowercase', () => {
      expect(normalizeAnswer('HELLO')).toBe('hello');
      expect(normalizeAnswer('Hello')).toBe('hello');
      expect(normalizeAnswer('hello')).toBe('hello');
    });

    it('trims whitespace', () => {
      expect(normalizeAnswer('  hello  ')).toBe('hello');
      expect(normalizeAnswer('\thello\n')).toBe('hello');
    });

    it('converts numbers to strings', () => {
      expect(normalizeAnswer(42)).toBe('42');
      expect(normalizeAnswer(0)).toBe('0');
      expect(normalizeAnswer(-5)).toBe('-5');
    });

    it('converts booleans to strings', () => {
      expect(normalizeAnswer(true)).toBe('true');
      expect(normalizeAnswer(false)).toBe('false');
    });

    it('returns empty string for undefined', () => {
      expect(normalizeAnswer(undefined)).toBe('');
    });

    it('handles floating point numbers', () => {
      expect(normalizeAnswer(3.14)).toBe('3.14');
      expect(normalizeAnswer(0.5)).toBe('0.5');
    });
  });

  describe('answer comparison for code_output', () => {
    it('matches case-insensitively', () => {
      expect(normalizeAnswer('HELLO') === normalizeAnswer('hello')).toBe(true);
    });

    it('matches with different whitespace', () => {
      expect(normalizeAnswer('  42  ') === normalizeAnswer('42')).toBe(true);
    });

    it('rejects different values', () => {
      expect(normalizeAnswer('hello') === normalizeAnswer('world')).toBe(false);
    });
  });
});

describe('Question Component - Multiple Choice', () => {
  describe('getCorrectOptionIndex', () => {
    it('returns numeric index directly', () => {
      const question: QuizQuestion = {
        id: 'mc1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(2);
    });

    it('finds string match in options', () => {
      const question: QuizQuestion = {
        id: 'mc2',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['Alpha', 'Beta', 'Gamma', 'Delta'],
        correctAnswer: 'Gamma',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(2);
    });

    it('returns -1 for non-matching string', () => {
      const question: QuizQuestion = {
        id: 'mc3',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['A', 'B', 'C'],
        correctAnswer: 'D',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('returns -1 when options undefined', () => {
      const question: QuizQuestion = {
        id: 'mc4',
        type: 'multiple_choice',
        prompt: 'Test',
        correctAnswer: 'A',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(-1);
    });

    it('handles zero index correctly', () => {
      const question: QuizQuestion = {
        id: 'mc5',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['First', 'Second', 'Third'],
        correctAnswer: 0,
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(0);
    });

    it('handles first option as string match', () => {
      const question: QuizQuestion = {
        id: 'mc6',
        type: 'multiple_choice',
        prompt: 'Test',
        options: ['First', 'Second', 'Third'],
        correctAnswer: 'First',
        explanation: '',
      };
      expect(getCorrectOptionIndex(question)).toBe(0);
    });
  });
});

describe('Question Component - CodingAnswer Type Guard', () => {
  function isCodingAnswer(answer: QuizAnswer | undefined): answer is CodingAnswer {
    return typeof answer === 'object' && answer !== null && 'code' in answer;
  }

  it('returns true for valid CodingAnswer', () => {
    const answer: CodingAnswer = { code: 'print("hello")', passed: true };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns true for CodingAnswer with failed tests', () => {
    const answer: CodingAnswer = { code: 'def foo():', passed: false };
    expect(isCodingAnswer(answer)).toBe(true);
  });

  it('returns false for string answer', () => {
    expect(isCodingAnswer('hello')).toBe(false);
  });

  it('returns false for number answer', () => {
    expect(isCodingAnswer(42)).toBe(false);
  });

  it('returns false for boolean answer', () => {
    expect(isCodingAnswer(true)).toBe(false);
    expect(isCodingAnswer(false)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isCodingAnswer(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isCodingAnswer(null as any)).toBe(false);
  });

  it('returns false for object without code property', () => {
    expect(isCodingAnswer({ passed: true } as any)).toBe(false);
  });
});

describe('Question Component - Question Type Handling', () => {
  describe('fill_blank questions', () => {
    const fillBlankQuestion: QuizQuestion = {
      id: 'fb1',
      type: 'fill_blank',
      prompt: 'The capital of France is ____.',
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital of France.',
    };

    it('accepts exact match', () => {
      expect(normalizeAnswer('Paris') === normalizeAnswer(fillBlankQuestion.correctAnswer)).toBe(true);
    });

    it('accepts case-insensitive match', () => {
      expect(normalizeAnswer('paris') === normalizeAnswer(fillBlankQuestion.correctAnswer)).toBe(true);
      expect(normalizeAnswer('PARIS') === normalizeAnswer(fillBlankQuestion.correctAnswer)).toBe(true);
    });

    it('accepts match with extra whitespace', () => {
      expect(normalizeAnswer('  Paris  ') === normalizeAnswer(fillBlankQuestion.correctAnswer)).toBe(true);
    });

    it('rejects wrong answer', () => {
      expect(normalizeAnswer('London') === normalizeAnswer(fillBlankQuestion.correctAnswer)).toBe(false);
    });
  });

  describe('true_false questions', () => {
    const trueQuestion: QuizQuestion = {
      id: 'tf1',
      type: 'true_false',
      prompt: 'The sky is blue.',
      correctAnswer: true,
      explanation: 'The sky appears blue.',
    };

    const falseQuestion: QuizQuestion = {
      id: 'tf2',
      type: 'true_false',
      prompt: 'The earth is flat.',
      correctAnswer: false,
      explanation: 'The earth is round.',
    };

    it('correctly identifies true answer', () => {
      expect(true === trueQuestion.correctAnswer).toBe(true);
      expect(false === trueQuestion.correctAnswer).toBe(false);
    });

    it('correctly identifies false answer', () => {
      expect(false === falseQuestion.correctAnswer).toBe(true);
      expect(true === falseQuestion.correctAnswer).toBe(false);
    });
  });

  describe('code_output with numeric answer', () => {
    const codeOutputQuestion: QuizQuestion = {
      id: 'co1',
      type: 'code_output',
      prompt: 'What is the output of: print(2 + 2)',
      codeSnippet: 'print(2 + 2)',
      correctAnswer: '4',
      explanation: '2 + 2 equals 4',
      language: 'python',
    };

    it('accepts string answer matching numeric output', () => {
      expect(normalizeAnswer('4') === normalizeAnswer(codeOutputQuestion.correctAnswer)).toBe(true);
    });

    it('accepts answer with whitespace', () => {
      expect(normalizeAnswer(' 4 ') === normalizeAnswer(codeOutputQuestion.correctAnswer)).toBe(true);
    });

    it('rejects wrong answer', () => {
      expect(normalizeAnswer('5') === normalizeAnswer(codeOutputQuestion.correctAnswer)).toBe(false);
    });
  });
});

describe('Question Component - Edge Cases', () => {
  it('handles empty options array', () => {
    const question: QuizQuestion = {
      id: 'edge1',
      type: 'multiple_choice',
      prompt: 'Test',
      options: [],
      correctAnswer: 'A',
      explanation: '',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('handles special characters in options', () => {
    const question: QuizQuestion = {
      id: 'edge2',
      type: 'multiple_choice',
      prompt: 'What is the formula?',
      options: ['E = mc²', 'F = ma', 'V = IR', 'P = IV'],
      correctAnswer: 'E = mc²',
      explanation: '',
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('handles unicode in options', () => {
    const question: QuizQuestion = {
      id: 'edge3',
      type: 'multiple_choice',
      prompt: 'Which symbol represents infinity?',
      options: ['∞', '∑', '∏', '∫'],
      correctAnswer: '∞',
      explanation: '',
    };
    expect(getCorrectOptionIndex(question)).toBe(0);
  });

  it('handles very long options', () => {
    const longOption = 'This is a very long option that might appear in a multiple choice question and needs to be handled correctly ' +
      'even when it contains many words and special characters like: x² + y² = r²';
    const question: QuizQuestion = {
      id: 'edge4',
      type: 'multiple_choice',
      prompt: 'Select the correct statement',
      options: ['Short', longOption, 'Medium length option'],
      correctAnswer: longOption,
      explanation: '',
    };
    expect(getCorrectOptionIndex(question)).toBe(1);
  });

  it('handles negative number in code output', () => {
    const question: QuizQuestion = {
      id: 'edge5',
      type: 'code_output',
      prompt: 'What is -5 + 2?',
      codeSnippet: 'print(-5 + 2)',
      correctAnswer: '-3',
      explanation: '',
      language: 'python',
    };
    expect(normalizeAnswer('-3') === normalizeAnswer(question.correctAnswer)).toBe(true);
    expect(normalizeAnswer('- 3') === normalizeAnswer(question.correctAnswer)).toBe(false); // space matters inside
  });

  it('handles floating point in code output', () => {
    const question: QuizQuestion = {
      id: 'edge6',
      type: 'code_output',
      prompt: 'What is 1/2?',
      codeSnippet: 'print(1/2)',
      correctAnswer: '0.5',
      explanation: '',
      language: 'python',
    };
    expect(normalizeAnswer('0.5') === normalizeAnswer(question.correctAnswer)).toBe(true);
  });
});
