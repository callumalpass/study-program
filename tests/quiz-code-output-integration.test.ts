/**
 * Quiz Code Output Integration Tests
 *
 * These tests verify integration scenarios for code_output quiz questions,
 * ensuring that various realistic code output patterns are correctly handled
 * during answer validation.
 */

import { describe, it, expect } from 'vitest';
import { checkAnswer, normalizeAnswer, calculateScore } from '../src/utils/quiz-utils';
import type { QuizQuestion, QuizAnswer } from '../src/core/types';

/**
 * Helper to create a code_output question
 */
function createCodeOutputQuestion(
  correctAnswer: string,
  id = 'test-co',
): QuizQuestion {
  return {
    id,
    type: 'code_output',
    prompt: 'What does this code output?',
    codeSnippet: 'print(...)',
    correctAnswer,
    explanation: 'Test explanation',
  };
}

describe('Code Output - Python Print Statements', () => {
  describe('print() with multiple arguments', () => {
    it('handles print() with sep parameter', () => {
      // print(1, 2, 3, sep='-') outputs "1-2-3"
      const q = createCodeOutputQuestion('1-2-3');
      expect(checkAnswer(q, '1-2-3')).toBe(true);
      expect(checkAnswer(q, '1 2 3')).toBe(false);
    });

    it('handles print() with end parameter', () => {
      // Two print statements with end='': print("a", end=''); print("b")
      const q = createCodeOutputQuestion('ab');
      expect(checkAnswer(q, 'ab')).toBe(true);
      expect(checkAnswer(q, 'a\nb')).toBe(false);
    });

    it('handles print() with default space separator', () => {
      // print("hello", "world") outputs "hello world"
      const q = createCodeOutputQuestion('hello world');
      expect(checkAnswer(q, 'hello world')).toBe(true);
      expect(checkAnswer(q, 'helloworld')).toBe(false);
    });
  });

  describe('formatted output', () => {
    it('handles f-string with formatting', () => {
      // print(f"{3.14159:.2f}") outputs "3.14"
      const q = createCodeOutputQuestion('3.14');
      expect(checkAnswer(q, '3.14')).toBe(true);
      expect(checkAnswer(q, '3.14159')).toBe(false);
    });

    it('handles string formatting with %', () => {
      // print("Value: %d" % 42) outputs "Value: 42"
      const q = createCodeOutputQuestion('Value: 42');
      expect(checkAnswer(q, 'Value: 42')).toBe(true);
      expect(checkAnswer(q, 'value: 42')).toBe(true); // case insensitive
    });

    it('handles .format() method', () => {
      // print("{} {}".format("Hello", "World"))
      const q = createCodeOutputQuestion('Hello World');
      expect(checkAnswer(q, 'Hello World')).toBe(true);
      expect(checkAnswer(q, 'HELLO WORLD')).toBe(true);
    });
  });
});

describe('Code Output - Data Structure Representations', () => {
  describe('list outputs', () => {
    it('handles nested lists', () => {
      const q = createCodeOutputQuestion('[[1, 2], [3, 4]]');
      expect(checkAnswer(q, '[[1, 2], [3, 4]]')).toBe(true);
      expect(checkAnswer(q, '[[1,2],[3,4]]')).toBe(true); // whitespace is now normalized
    });

    it('handles list with strings', () => {
      const q = createCodeOutputQuestion("['hello', 'world']");
      expect(checkAnswer(q, "['hello', 'world']")).toBe(true);
      expect(checkAnswer(q, "['HELLO', 'WORLD']")).toBe(true); // case insensitive
    });

    it('handles empty nested list', () => {
      const q = createCodeOutputQuestion('[[]]');
      expect(checkAnswer(q, '[[]]')).toBe(true);
      expect(checkAnswer(q, '[]')).toBe(false);
    });

    it('handles list comprehension result', () => {
      // [x**2 for x in range(4)] outputs [0, 1, 4, 9]
      const q = createCodeOutputQuestion('[0, 1, 4, 9]');
      expect(checkAnswer(q, '[0, 1, 4, 9]')).toBe(true);
    });
  });

  describe('dict outputs', () => {
    it('handles dict with string keys', () => {
      const q = createCodeOutputQuestion("{'name': 'Alice', 'age': 30}");
      expect(checkAnswer(q, "{'name': 'Alice', 'age': 30}")).toBe(true);
      expect(checkAnswer(q, "{'NAME': 'ALICE', 'AGE': 30}")).toBe(true);
    });

    it('handles dict with integer keys', () => {
      const q = createCodeOutputQuestion('{1: 2, 3: 4}');
      expect(checkAnswer(q, '{1: 2, 3: 4}')).toBe(true);
    });

    it('handles nested dict', () => {
      const q = createCodeOutputQuestion("{'outer': {'inner': 1}}");
      expect(checkAnswer(q, "{'outer': {'inner': 1}}")).toBe(true);
    });
  });

  describe('tuple outputs', () => {
    it('handles single-element tuple', () => {
      // (1,) is a single-element tuple
      const q = createCodeOutputQuestion('(1,)');
      expect(checkAnswer(q, '(1,)')).toBe(true);
      expect(checkAnswer(q, '(1)')).toBe(false);
    });

    it('handles tuple with mixed types', () => {
      const q = createCodeOutputQuestion("(1, 'two', 3.0)");
      expect(checkAnswer(q, "(1, 'two', 3.0)")).toBe(true);
    });
  });

  describe('set outputs', () => {
    // Note: Set output order is not guaranteed in Python, but for quiz purposes
    // we test specific expected outputs
    it('handles set literal output', () => {
      const q = createCodeOutputQuestion('{1, 2, 3}');
      expect(checkAnswer(q, '{1, 2, 3}')).toBe(true);
    });

    it('handles empty set as set()', () => {
      // Empty set prints as "set()" not "{}"
      const q = createCodeOutputQuestion('set()');
      expect(checkAnswer(q, 'set()')).toBe(true);
      expect(checkAnswer(q, '{}')).toBe(false); // {} is empty dict
    });
  });
});

describe('Code Output - Error Messages and Exceptions', () => {
  it('handles IndexError message', () => {
    const q = createCodeOutputQuestion('IndexError');
    expect(checkAnswer(q, 'IndexError')).toBe(true);
    expect(checkAnswer(q, 'indexerror')).toBe(true);
  });

  it('handles TypeError message', () => {
    const q = createCodeOutputQuestion('TypeError');
    expect(checkAnswer(q, 'TypeError')).toBe(true);
    expect(checkAnswer(q, 'typeerror')).toBe(true);
  });

  it('handles ValueError message', () => {
    const q = createCodeOutputQuestion('ValueError');
    expect(checkAnswer(q, 'ValueError')).toBe(true);
  });

  it('handles KeyError with key', () => {
    const q = createCodeOutputQuestion("KeyError: 'missing'");
    expect(checkAnswer(q, "KeyError: 'missing'")).toBe(true);
    expect(checkAnswer(q, "keyerror: 'missing'")).toBe(true);
  });
});

describe('Code Output - Type Information', () => {
  it('handles type() output for int', () => {
    const q = createCodeOutputQuestion("<class 'int'>");
    expect(checkAnswer(q, "<class 'int'>")).toBe(true);
    expect(checkAnswer(q, "<CLASS 'INT'>")).toBe(true);
  });

  it('handles type() output for list', () => {
    const q = createCodeOutputQuestion("<class 'list'>");
    expect(checkAnswer(q, "<class 'list'>")).toBe(true);
  });

  it('handles type() output for custom class', () => {
    const q = createCodeOutputQuestion("<class '__main__.MyClass'>");
    expect(checkAnswer(q, "<class '__main__.MyClass'>")).toBe(true);
    expect(checkAnswer(q, "<class '__main__.myclass'>")).toBe(true);
  });

  it('handles isinstance() boolean output', () => {
    const q = createCodeOutputQuestion('True');
    expect(checkAnswer(q, 'True')).toBe(true);
    expect(checkAnswer(q, 'true')).toBe(true);
    expect(checkAnswer(q, 'TRUE')).toBe(true);
  });
});

describe('Code Output - Numeric Edge Cases', () => {
  it('handles very large integers', () => {
    const q = createCodeOutputQuestion('1000000000000');
    expect(checkAnswer(q, '1000000000000')).toBe(true);
    expect(checkAnswer(q, '1e12')).toBe(false); // Different representation
  });

  it('handles negative zero', () => {
    const q = createCodeOutputQuestion('-0.0');
    expect(checkAnswer(q, '-0.0')).toBe(true);
    expect(checkAnswer(q, '0.0')).toBe(false);
  });

  it('handles infinity output', () => {
    const q = createCodeOutputQuestion('inf');
    expect(checkAnswer(q, 'inf')).toBe(true);
    expect(checkAnswer(q, 'INF')).toBe(true);
  });

  it('handles complex numbers', () => {
    const q = createCodeOutputQuestion('(3+4j)');
    expect(checkAnswer(q, '(3+4j)')).toBe(true);
  });

  it('handles scientific notation as-is', () => {
    const q = createCodeOutputQuestion('1.5e-10');
    expect(checkAnswer(q, '1.5e-10')).toBe(true);
    expect(checkAnswer(q, '1.5E-10')).toBe(true); // case insensitive
  });
});

describe('Code Output - String Edge Cases', () => {
  it('handles escaped characters in output', () => {
    const q = createCodeOutputQuestion('line1\\nline2');
    expect(checkAnswer(q, 'line1\\nline2')).toBe(true);
  });

  it('handles repr() with quotes', () => {
    const q = createCodeOutputQuestion("'hello world'");
    expect(checkAnswer(q, "'hello world'")).toBe(true);
    expect(checkAnswer(q, "'HELLO WORLD'")).toBe(true);
  });

  it('handles string with newline preserved', () => {
    const q = createCodeOutputQuestion('hello\nworld');
    expect(checkAnswer(q, 'hello\nworld')).toBe(true);
    expect(checkAnswer(q, 'hello world')).toBe(false);
  });

  it('handles string with tab character', () => {
    const q = createCodeOutputQuestion('col1\tcol2');
    expect(checkAnswer(q, 'col1\tcol2')).toBe(true);
    expect(checkAnswer(q, 'col1 col2')).toBe(false);
  });
});

describe('Code Output - Boolean and None Values', () => {
  it('handles True with trailing content', () => {
    const q = createCodeOutputQuestion('True 42');
    expect(checkAnswer(q, 'True 42')).toBe(true);
    expect(checkAnswer(q, 'true 42')).toBe(true);
  });

  it('handles False with trailing content', () => {
    const q = createCodeOutputQuestion('False None');
    expect(checkAnswer(q, 'False None')).toBe(true);
    expect(checkAnswer(q, 'false none')).toBe(true);
  });

  it('handles None in a sentence context', () => {
    const q = createCodeOutputQuestion('Result: None');
    expect(checkAnswer(q, 'Result: None')).toBe(true);
    expect(checkAnswer(q, 'result: none')).toBe(true);
  });

  it('distinguishes between string "None" and actual None', () => {
    const qNone = createCodeOutputQuestion('None');
    const qStringNone = createCodeOutputQuestion("'None'");

    expect(checkAnswer(qNone, 'None')).toBe(true);
    expect(checkAnswer(qNone, "'None'")).toBe(false);
    expect(checkAnswer(qStringNone, "'None'")).toBe(true);
    expect(checkAnswer(qStringNone, 'None')).toBe(false);
  });
});

describe('Code Output - calculateScore Integration', () => {
  it('scores multiple code_output questions correctly', () => {
    const questions: QuizQuestion[] = [
      createCodeOutputQuestion('42', 'q1'),
      createCodeOutputQuestion('[1, 2, 3]', 'q2'),
      createCodeOutputQuestion('True', 'q3'),
      createCodeOutputQuestion('hello world', 'q4'),
    ];

    const correctAnswers: Record<string, QuizAnswer> = {
      q1: '42',
      q2: '[1, 2, 3]',
      q3: 'true',
      q4: 'HELLO WORLD',
    };

    expect(calculateScore(questions, correctAnswers)).toBe(100);
  });

  it('handles partial correctness in code_output quiz', () => {
    const questions: QuizQuestion[] = [
      createCodeOutputQuestion('42', 'q1'),
      createCodeOutputQuestion('[1, 2, 3]', 'q2'),
      createCodeOutputQuestion('True', 'q3'),
      createCodeOutputQuestion('hello world', 'q4'),
    ];

    const mixedAnswers: Record<string, QuizAnswer> = {
      q1: '42',         // correct
      q2: '[1,2,3]',    // correct (whitespace now normalized)
      q3: 'True',       // correct
      q4: 'goodbye',    // wrong
    };

    expect(calculateScore(questions, mixedAnswers)).toBe(75);
  });

  it('handles missing answers as incorrect', () => {
    const questions: QuizQuestion[] = [
      createCodeOutputQuestion('42', 'q1'),
      createCodeOutputQuestion('True', 'q2'),
    ];

    const partialAnswers: Record<string, QuizAnswer> = {
      q1: '42',
      // q2 missing
    };

    expect(calculateScore(questions, partialAnswers)).toBe(50);
  });
});

describe('Code Output - Whitespace Boundary Cases', () => {
  it('trims leading and trailing whitespace from user answers', () => {
    const q = createCodeOutputQuestion('42');
    expect(checkAnswer(q, '   42   ')).toBe(true);
    expect(checkAnswer(q, '\n42\n')).toBe(true);
    expect(checkAnswer(q, '\t42\t')).toBe(true);
  });

  it('normalizes multiple consecutive spaces in multiword answers', () => {
    const q = createCodeOutputQuestion('hello world');
    expect(checkAnswer(q, 'hello  world')).toBe(true); // extra spaces normalized to single space
    expect(checkAnswer(q, 'hello\tworld')).toBe(false); // tab is different from space
  });

  it('handles answer that is just whitespace', () => {
    const q = createCodeOutputQuestion('42');
    expect(checkAnswer(q, '   ')).toBe(false);
    expect(checkAnswer(q, '\n\t\n')).toBe(false);
  });

  it('handles expected answer with leading/trailing whitespace', () => {
    // If the expected answer has extra whitespace, it should be normalized
    const q = createCodeOutputQuestion('  42  ');
    expect(checkAnswer(q, '42')).toBe(true);
  });
});

describe('normalizeAnswer function - Additional Coverage', () => {
  it('handles number type input', () => {
    expect(normalizeAnswer(42)).toBe('42');
    expect(normalizeAnswer(-5)).toBe('-5');
    expect(normalizeAnswer(3.14)).toBe('3.14');
  });

  it('handles boolean type input', () => {
    expect(normalizeAnswer(true)).toBe('true');
    expect(normalizeAnswer(false)).toBe('false');
  });

  it('handles undefined input', () => {
    expect(normalizeAnswer(undefined)).toBe('');
  });

  it('handles string with only spaces', () => {
    expect(normalizeAnswer('     ')).toBe('');
  });

  it('handles multiline string with trailing newlines', () => {
    expect(normalizeAnswer('hello\nworld\n')).toBe('hello\nworld');
  });

  it('handles string with tabs and spaces combined', () => {
    const result = normalizeAnswer('  \tvalue\t  ');
    expect(result).toBe('value');
  });

  it('converts uppercase to lowercase consistently', () => {
    expect(normalizeAnswer('HELLO')).toBe('hello');
    expect(normalizeAnswer('MixedCase')).toBe('mixedcase');
    expect(normalizeAnswer('TRUE')).toBe('true');
  });

  it('preserves special characters', () => {
    expect(normalizeAnswer('O(n²)')).toBe('o(n²)');
    expect(normalizeAnswer('α + β')).toBe('α + β');
  });
});
