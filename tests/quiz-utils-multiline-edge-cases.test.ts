/**
 * Quiz Utils Multiline Edge Cases Tests
 *
 * Additional tests for normalizeCodeOutput and checkAnswer focusing on
 * multiline output handling and edge cases with line-based comparisons.
 */

import { describe, it, expect } from 'vitest';
import { normalizeCodeOutput, checkAnswer, getCorrectOptionIndex } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

// Helper to create code_output questions
const createCodeOutputQuestion = (
  correctAnswer: string | number | boolean
): QuizQuestion => ({
  id: 'test-q',
  type: 'code_output',
  prompt: 'What is the output?',
  correctAnswer,
  explanation: 'Test explanation',
});

describe('normalizeCodeOutput - multiline handling', () => {
  describe('line ending normalization', () => {
    it('handles Unix-style line endings (LF)', () => {
      const input = 'line1\nline2\nline3';
      expect(normalizeCodeOutput(input)).toBe('line1\nline2\nline3');
    });

    it('handles Windows-style line endings (CRLF)', () => {
      const input = 'line1\r\nline2\r\nline3';
      // After trim() and lowercase(), CRLF is preserved but doesn't affect matching
      const normalized = normalizeCodeOutput(input);
      expect(normalized.includes('line1')).toBe(true);
      expect(normalized.includes('line2')).toBe(true);
    });

    it('handles old Mac-style line endings (CR)', () => {
      const input = 'line1\rline2\rline3';
      const normalized = normalizeCodeOutput(input);
      expect(normalized.includes('line1')).toBe(true);
    });

    it('handles mixed line endings', () => {
      const input = 'line1\nline2\r\nline3\rline4';
      const normalized = normalizeCodeOutput(input);
      expect(normalized.includes('line1')).toBe(true);
      expect(normalized.includes('line4')).toBe(true);
    });
  });

  describe('multiline whitespace handling', () => {
    it('trims leading whitespace from entire string', () => {
      const input = '   \n  line1\n  line2';
      const result = normalizeCodeOutput(input);
      expect(result.startsWith('line1')).toBe(true);
    });

    it('trims trailing whitespace from entire string', () => {
      const input = 'line1\nline2\n   ';
      const result = normalizeCodeOutput(input);
      expect(result.endsWith('line2')).toBe(true);
    });

    it('normalizes consecutive spaces on lines', () => {
      const input = 'line1\n  indented\nline3';
      const result = normalizeCodeOutput(input);
      // Multiple spaces are normalized to single space
      expect(result).toContain(' indented');
      expect(result).not.toContain('  indented'); // Double space collapsed
    });
  });

  describe('multiline data structures', () => {
    it('normalizes multiline list output', () => {
      const expected = '[1,\n 2,\n 3]';
      const actual = '[1, \n 2, \n 3]';
      expect(normalizeCodeOutput(expected)).toBe(normalizeCodeOutput(actual));
    });

    it('normalizes multiline dict output', () => {
      const expected = "{'a': 1,\n 'b': 2}";
      const actual = "{'a':1,\n 'b':2}";
      expect(normalizeCodeOutput(expected)).toBe(normalizeCodeOutput(actual));
    });
  });

  describe('edge cases', () => {
    it('handles string with only newlines', () => {
      const input = '\n\n\n';
      expect(normalizeCodeOutput(input)).toBe('');
    });

    it('handles empty lines between content', () => {
      const input = 'line1\n\nline3';
      const result = normalizeCodeOutput(input);
      expect(result).toContain('line1');
      expect(result).toContain('line3');
    });

    it('handles very long single line', () => {
      const longLine = 'x'.repeat(10000);
      expect(normalizeCodeOutput(longLine)).toBe(longLine);
    });

    it('handles many lines', () => {
      const manyLines = Array(1000).fill('line').join('\n');
      const result = normalizeCodeOutput(manyLines);
      expect(result.split('\n').length).toBe(1000);
    });
  });
});

describe('checkAnswer - multiline code_output edge cases', () => {
  describe('multiline string comparison', () => {
    it('matches identical multiline strings', () => {
      const question = createCodeOutputQuestion('Line 1\nLine 2');
      expect(checkAnswer(question, 'Line 1\nLine 2')).toBe(true);
    });

    it('matches multiline strings case-insensitively', () => {
      const question = createCodeOutputQuestion('Hello\nWorld');
      expect(checkAnswer(question, 'hello\nworld')).toBe(true);
    });

    it('matches multiline with trailing whitespace trimmed', () => {
      const question = createCodeOutputQuestion('line1\nline2');
      expect(checkAnswer(question, 'line1\nline2  ')).toBe(true);
    });

    it('matches multiline with leading whitespace trimmed', () => {
      const question = createCodeOutputQuestion('line1\nline2');
      expect(checkAnswer(question, '  line1\nline2')).toBe(true);
    });
  });

  describe('multiline list output', () => {
    it('matches list printed across multiple lines', () => {
      const question = createCodeOutputQuestion('[1, 2,\n 3, 4]');
      expect(checkAnswer(question, '[1,2,\n3,4]')).toBe(true);
    });
  });

  describe('print statement output matching', () => {
    it('matches multiple print() outputs', () => {
      const question = createCodeOutputQuestion('Hello\nWorld');
      expect(checkAnswer(question, 'HELLO\nWORLD')).toBe(true);
    });

    it('matches empty line between outputs', () => {
      const question = createCodeOutputQuestion('a\n\nb');
      expect(checkAnswer(question, 'A\n\nB')).toBe(true);
    });
  });

  describe('rejection cases', () => {
    it('rejects different line count', () => {
      const question = createCodeOutputQuestion('line1\nline2');
      expect(checkAnswer(question, 'line1')).toBe(false);
    });

    it('rejects different content', () => {
      const question = createCodeOutputQuestion('hello\nworld');
      expect(checkAnswer(question, 'hello\nearth')).toBe(false);
    });

    it('rejects extra newlines at end after trimming', () => {
      // trim() will remove trailing newlines, so this should match
      const question = createCodeOutputQuestion('hello');
      // But content with embedded newlines is different
      expect(checkAnswer(question, 'hello\n')).toBe(true); // trimmed
      expect(checkAnswer(question, 'hello\nworld')).toBe(false); // different
    });
  });
});

describe('getCorrectOptionIndex - additional edge cases', () => {
  const createMCQuestion = (
    correctAnswer: string | number | boolean,
    options: string[]
  ): QuizQuestion => ({
    id: 'test-mc',
    type: 'multiple_choice',
    prompt: 'Test?',
    options,
    correctAnswer,
    explanation: 'Test',
  });

  describe('numeric correctAnswer validation', () => {
    it('returns index for 0', () => {
      const q = createMCQuestion(0, ['A', 'B', 'C']);
      expect(getCorrectOptionIndex(q)).toBe(0);
    });

    it('returns -1 for float index', () => {
      const q = createMCQuestion(1.5 as unknown as number, ['A', 'B', 'C']);
      // Floats are not valid array indices - should return -1
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for NaN', () => {
      const q = createMCQuestion(NaN as unknown as number, ['A', 'B', 'C']);
      // NaN >= 0 is false, so it returns -1
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for Infinity', () => {
      const q = createMCQuestion(Infinity as unknown as number, ['A', 'B', 'C']);
      // Infinity >= 0 is true, but Infinity < 3 is false, so it returns -1
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for negative Infinity', () => {
      const q = createMCQuestion(-Infinity as unknown as number, ['A', 'B', 'C']);
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });
  });

  describe('string correctAnswer matching', () => {
    it('finds exact match at start of options', () => {
      const q = createMCQuestion('First Option', ['First Option', 'Second', 'Third']);
      expect(getCorrectOptionIndex(q)).toBe(0);
    });

    it('finds exact match at end of options', () => {
      const q = createMCQuestion('Third', ['First', 'Second', 'Third']);
      expect(getCorrectOptionIndex(q)).toBe(2);
    });

    it('returns -1 for partial match', () => {
      const q = createMCQuestion('First', ['First Option', 'Second', 'Third']);
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for case mismatch', () => {
      const q = createMCQuestion('first', ['First', 'Second', 'Third']);
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('handles empty string as correct answer', () => {
      const q = createMCQuestion('', ['', 'B', 'C']);
      expect(getCorrectOptionIndex(q)).toBe(0);
    });

    it('handles whitespace-only string as correct answer', () => {
      const q = createMCQuestion('   ', ['   ', 'B', 'C']);
      expect(getCorrectOptionIndex(q)).toBe(0);
    });
  });

  describe('boolean correctAnswer handling', () => {
    it('returns -1 for boolean true (not a valid MC answer)', () => {
      const q = createMCQuestion(true, ['True', 'False']);
      // indexOf(true) on string array returns -1
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });

    it('returns -1 for boolean false', () => {
      const q = createMCQuestion(false, ['True', 'False']);
      expect(getCorrectOptionIndex(q)).toBe(-1);
    });
  });

  describe('options array edge cases', () => {
    it('handles single option', () => {
      const q = createMCQuestion(0, ['Only Option']);
      expect(getCorrectOptionIndex(q)).toBe(0);
    });

    it('handles many options', () => {
      const options = Array(100).fill(0).map((_, i) => `Option ${i}`);
      const q = createMCQuestion(99, options);
      expect(getCorrectOptionIndex(q)).toBe(99);
    });

    it('handles options with special characters', () => {
      const options = ['O(n²)', 'Ω(log n)', 'θ(1)'];
      const q = createMCQuestion('Ω(log n)', options);
      expect(getCorrectOptionIndex(q)).toBe(1);
    });

    it('handles duplicate options (returns first match)', () => {
      const q = createMCQuestion('Same', ['Same', 'Same', 'Different']);
      expect(getCorrectOptionIndex(q)).toBe(0);
    });
  });
});
