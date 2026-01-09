/**
 * normalizeCodeOutput Edge Cases Tests
 *
 * Additional edge case tests for the normalizeCodeOutput function that
 * verify behavior with tabs, mixed whitespace, and multiline structures.
 */

import { describe, expect, it } from 'vitest';
import { normalizeCodeOutput, checkAnswer } from '../src/utils/quiz-utils';
import type { QuizQuestion } from '../src/core/types';

describe('normalizeCodeOutput - tab handling', () => {
  it('normalizes tabs around commas', () => {
    expect(normalizeCodeOutput('[1,\t2,\t3]')).toBe('[1, 2, 3]');
  });

  it('normalizes tabs around colons', () => {
    expect(normalizeCodeOutput('{"a":\t1}')).toBe('{"a": 1}');
  });

  it('normalizes tabs after opening brackets', () => {
    expect(normalizeCodeOutput('[\t1, 2, 3]')).toBe('[1, 2, 3]');
    expect(normalizeCodeOutput('(\t1, 2)')).toBe('(1, 2)');
    expect(normalizeCodeOutput('{\t"a": 1}')).toBe('{"a": 1}');
  });

  it('normalizes tabs before closing brackets', () => {
    expect(normalizeCodeOutput('[1, 2, 3\t]')).toBe('[1, 2, 3]');
    expect(normalizeCodeOutput('(1, 2\t)')).toBe('(1, 2)');
    expect(normalizeCodeOutput('{"a": 1\t}')).toBe('{"a": 1}');
  });

  it('handles multiple consecutive tabs', () => {
    expect(normalizeCodeOutput('[1,\t\t2,\t\t\t3]')).toBe('[1, 2, 3]');
  });
});

describe('normalizeCodeOutput - mixed whitespace', () => {
  it('normalizes mixed spaces and tabs around commas', () => {
    expect(normalizeCodeOutput('[1,\t 2, \t3]')).toBe('[1, 2, 3]');
  });

  it('normalizes mixed spaces and tabs around colons', () => {
    expect(normalizeCodeOutput('{"a" \t: \t 1}')).toBe('{"a": 1}');
  });

  it('handles space-tab-space combinations', () => {
    expect(normalizeCodeOutput('[ \t 1 \t , \t 2 \t ]')).toBe('[1, 2]');
  });
});

describe('normalizeCodeOutput - newline preservation', () => {
  it('preserves newlines in plain text', () => {
    expect(normalizeCodeOutput('hello\nworld')).toBe('hello\nworld');
  });

  it('preserves newlines between values', () => {
    expect(normalizeCodeOutput('line 1\nline 2\nline 3')).toBe('line 1\nline 2\nline 3');
  });

  it('trims leading/trailing newlines', () => {
    expect(normalizeCodeOutput('\nhello\n')).toBe('hello');
    expect(normalizeCodeOutput('\n\nhello\n\n')).toBe('hello');
  });

  it('normalizes newlines directly after opening bracket', () => {
    // Newline is whitespace, so [\n1 becomes [1
    expect(normalizeCodeOutput('[\n1, 2]')).toBe('[1, 2]');
  });

  it('normalizes newlines directly before closing bracket', () => {
    // Newline is whitespace, so 1\n] becomes 1]
    expect(normalizeCodeOutput('[1, 2\n]')).toBe('[1, 2]');
  });
});

describe('normalizeCodeOutput - edge case structures', () => {
  it('handles deeply nested empty structures', () => {
    expect(normalizeCodeOutput('[[[]]]')).toBe('[[[]]]');
    expect(normalizeCodeOutput('[ [ [ ] ] ]')).toBe('[[[]]]');
  });

  it('handles adjacent brackets', () => {
    expect(normalizeCodeOutput('[],[]')).toBe('[], []');
    expect(normalizeCodeOutput('{},{}')).toBe('{}, {}');
  });

  it('handles bracket-colon-bracket combinations', () => {
    expect(normalizeCodeOutput('{[]:[],[]:[]}'))
      .toBe('{[]: [], []: []}');
  });

  it('handles single-element tuple with trailing comma', () => {
    // Python single-element tuples: (1,)
    expect(normalizeCodeOutput('(1,)')).toBe('(1,)');
    expect(normalizeCodeOutput('( 1 , )')).toBe('(1,)');
  });

  it('handles list with trailing comma', () => {
    expect(normalizeCodeOutput('[1, 2, 3,]')).toBe('[1, 2, 3,]');
  });
});

describe('normalizeCodeOutput - special values', () => {
  it('normalizes Python None to lowercase', () => {
    expect(normalizeCodeOutput('None')).toBe('none');
    expect(normalizeCodeOutput('NONE')).toBe('none');
    expect(normalizeCodeOutput('[None, None]')).toBe('[none, none]');
  });

  it('normalizes Python True/False to lowercase', () => {
    expect(normalizeCodeOutput('True')).toBe('true');
    expect(normalizeCodeOutput('False')).toBe('false');
    expect(normalizeCodeOutput('[True, False]')).toBe('[true, false]');
  });

  it('handles NaN and Infinity strings', () => {
    expect(normalizeCodeOutput('nan')).toBe('nan');
    expect(normalizeCodeOutput('NaN')).toBe('nan');
    expect(normalizeCodeOutput('inf')).toBe('inf');
    expect(normalizeCodeOutput('Infinity')).toBe('infinity');
  });
});

describe('normalizeCodeOutput - numeric edge cases', () => {
  it('preserves decimal precision', () => {
    expect(normalizeCodeOutput('3.14159265359')).toBe('3.14159265359');
  });

  it('preserves leading zeros after decimal', () => {
    expect(normalizeCodeOutput('0.001')).toBe('0.001');
  });

  it('handles negative numbers in structures', () => {
    expect(normalizeCodeOutput('[-1,-2,-3]')).toBe('[-1, -2, -3]');
  });

  it('handles scientific notation in structures', () => {
    expect(normalizeCodeOutput('[1e10,2e-5]')).toBe('[1e10, 2e-5]');
  });
});

describe('checkAnswer with normalizeCodeOutput - integration', () => {
  const makeCodeOutputQuestion = (correctAnswer: string): QuizQuestion => ({
    id: 'test-q',
    type: 'code_output',
    prompt: 'What does this code print?',
    codeSnippet: 'print(x)',
    correctAnswer,
    explanation: 'Test explanation',
  });

  it('matches list regardless of spacing style', () => {
    const question = makeCodeOutputQuestion('[1, 2, 3]');
    expect(checkAnswer(question, '[1,2,3]')).toBe(true);
    expect(checkAnswer(question, '[ 1, 2, 3 ]')).toBe(true);
    expect(checkAnswer(question, '[1,  2,   3]')).toBe(true);
    expect(checkAnswer(question, '[\t1,\t2,\t3]')).toBe(true);
  });

  it('matches dict regardless of spacing style', () => {
    const question = makeCodeOutputQuestion('{"a": 1, "b": 2}');
    expect(checkAnswer(question, '{"a":1,"b":2}')).toBe(true);
    expect(checkAnswer(question, '{ "a" : 1 , "b" : 2 }')).toBe(true);
    expect(checkAnswer(question, '{"a":\t1,\t"b":\t2}')).toBe(true);
  });

  it('rejects structurally different answers', () => {
    const question = makeCodeOutputQuestion('[1, 2, 3]');
    expect(checkAnswer(question, '[1, 2]')).toBe(false);
    expect(checkAnswer(question, '[1, 2, 3, 4]')).toBe(false);
    expect(checkAnswer(question, '(1, 2, 3)')).toBe(false);
    expect(checkAnswer(question, '{1, 2, 3}')).toBe(false);
  });

  it('handles None/null case-insensitively', () => {
    const question = makeCodeOutputQuestion('None');
    expect(checkAnswer(question, 'none')).toBe(true);
    expect(checkAnswer(question, 'NONE')).toBe(true);
    expect(checkAnswer(question, 'None')).toBe(true);
  });

  it('handles True/False case-insensitively', () => {
    const questionTrue = makeCodeOutputQuestion('True');
    expect(checkAnswer(questionTrue, 'true')).toBe(true);
    expect(checkAnswer(questionTrue, 'TRUE')).toBe(true);

    const questionFalse = makeCodeOutputQuestion('False');
    expect(checkAnswer(questionFalse, 'false')).toBe(true);
    expect(checkAnswer(questionFalse, 'FALSE')).toBe(true);
  });

  it('handles empty structures', () => {
    const listQuestion = makeCodeOutputQuestion('[]');
    expect(checkAnswer(listQuestion, '[]')).toBe(true);
    expect(checkAnswer(listQuestion, '[ ]')).toBe(true);

    const dictQuestion = makeCodeOutputQuestion('{}');
    expect(checkAnswer(dictQuestion, '{}')).toBe(true);
    expect(checkAnswer(dictQuestion, '{ }')).toBe(true);

    const tupleQuestion = makeCodeOutputQuestion('()');
    expect(checkAnswer(tupleQuestion, '()')).toBe(true);
    expect(checkAnswer(tupleQuestion, '( )')).toBe(true);
  });

  it('handles numeric string vs number comparison', () => {
    const question = makeCodeOutputQuestion('42');
    expect(checkAnswer(question, '42')).toBe(true);
    expect(checkAnswer(question, 42)).toBe(true);
    expect(checkAnswer(question, '  42  ')).toBe(true);
  });
});
