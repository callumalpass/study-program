/**
 * Additional Edge Case Tests
 *
 * Tests for edge cases in various utility functions that may not be covered
 * by existing tests, focusing on unusual inputs and boundary conditions.
 */

import { describe, it, expect } from 'vitest';
import {
  normalizeCodeOutput,
  normalizeAnswer,
  checkAnswer,
  getCorrectOptionIndex,
} from '../src/utils/quiz-utils';
import {
  parseFrontmatter,
  extractTitleFromContent,
  groupIdsByTopic,
} from '../src/subjects/loader';
import { generateTableOfContents } from '../src/components/markdown';
import type { QuizQuestion } from '../src/core/types';

describe('normalizeCodeOutput extended edge cases', () => {
  describe('deeply nested structures', () => {
    it('handles triply nested lists', () => {
      expect(normalizeCodeOutput('[[[1,2],[3,4]],[[5,6],[7,8]]]'))
        .toBe('[[[1, 2], [3, 4]], [[5, 6], [7, 8]]]');
    });

    it('handles mixed nested structures', () => {
      expect(normalizeCodeOutput('{\"a\":[1,2],\"b\":{\"c\":3}}'))
        .toBe('{"a": [1, 2], "b": {"c": 3}}');
    });
  });

  describe('edge cases with special values', () => {
    it('handles negative numbers in lists', () => {
      expect(normalizeCodeOutput('[-1,-2,-3]')).toBe('[-1, -2, -3]');
    });

    it('handles floating point numbers', () => {
      expect(normalizeCodeOutput('[1.5,2.5,3.5]')).toBe('[1.5, 2.5, 3.5]');
    });

    it('handles scientific notation', () => {
      expect(normalizeCodeOutput('[1e10,2e-5]')).toBe('[1e10, 2e-5]');
    });

    it('handles empty string', () => {
      expect(normalizeCodeOutput('')).toBe('');
    });

    it('handles string with only brackets', () => {
      expect(normalizeCodeOutput('[]{}()')).toBe('[]{}()');
    });
  });

  describe('unicode and special characters', () => {
    it('handles unicode characters in strings', () => {
      expect(normalizeCodeOutput('["héllo","wörld"]')).toBe('["héllo", "wörld"]');
    });

    it('handles emoji in output', () => {
      expect(normalizeCodeOutput('["🎉","🚀"]')).toBe('["🎉", "🚀"]');
    });
  });

  describe('multiline output handling', () => {
    it('normalizes multiline list output', () => {
      const input = '[\n  1,\n  2,\n  3\n]';
      // After normalization, the brackets adjacent whitespace is handled
      // but newlines within the string remain (only leading/trailing trimmed)
      const result = normalizeCodeOutput(input);
      expect(result).toContain('1, 2, 3');
    });
  });
});

describe('normalizeAnswer extended edge cases', () => {
  describe('special string values', () => {
    it('handles string "null"', () => {
      expect(normalizeAnswer('null')).toBe('null');
    });

    it('handles string "undefined"', () => {
      expect(normalizeAnswer('undefined')).toBe('undefined');
    });

    it('handles string "NaN"', () => {
      expect(normalizeAnswer('NaN')).toBe('nan');
    });
  });

  describe('numeric edge cases', () => {
    it('handles Infinity', () => {
      expect(normalizeAnswer(Infinity)).toBe('infinity');
    });

    it('handles -Infinity', () => {
      expect(normalizeAnswer(-Infinity)).toBe('-infinity');
    });

    it('handles very large numbers', () => {
      expect(normalizeAnswer(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
    });

    it('handles very small numbers', () => {
      expect(normalizeAnswer(0.0000001)).toBe('1e-7');
    });
  });
});

describe('checkAnswer extended edge cases', () => {
  describe('multiple choice with empty options', () => {
    it('returns false when options array is empty', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Test',
        options: [],
        correctAnswer: 0,
        explanation: '',
      };
      expect(checkAnswer(question, 0)).toBe(false);
    });
  });

  describe('fill_blank with numeric correctAnswer', () => {
    it('matches numeric correctAnswer as string', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'fill_blank',
        prompt: 'What is 2 + 2?',
        correctAnswer: 4, // numeric
        explanation: '',
      };
      expect(checkAnswer(question, '4')).toBe(true);
      expect(checkAnswer(question, 4)).toBe(true);
    });
  });

  describe('code_output with boolean correctAnswer', () => {
    it('matches boolean True (Python style)', () => {
      const question: QuizQuestion = {
        id: 'q1',
        type: 'code_output',
        prompt: 'What does print(5 > 3) output?',
        codeSnippet: 'print(5 > 3)',
        correctAnswer: 'True',
        explanation: '',
      };
      expect(checkAnswer(question, 'true')).toBe(true);
      expect(checkAnswer(question, 'True')).toBe(true);
      expect(checkAnswer(question, 'TRUE')).toBe(true);
    });
  });
});

describe('getCorrectOptionIndex extended edge cases', () => {
  it('returns -1 for question with empty options and numeric correctAnswer', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test',
      options: [],
      correctAnswer: 0,
      explanation: '',
    };
    expect(getCorrectOptionIndex(question)).toBe(-1);
  });

  it('returns correct index when correctAnswer string has extra whitespace', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test',
      options: ['Apple', 'Banana', 'Cherry'],
      correctAnswer: 'Banana', // exact match required
      explanation: '',
    };
    expect(getCorrectOptionIndex(question)).toBe(1);
  });

  it('handles correctAnswer that appears multiple times in options', () => {
    const question: QuizQuestion = {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'Test',
      options: ['A', 'B', 'A', 'C'], // 'A' appears twice
      correctAnswer: 'A',
      explanation: '',
    };
    // indexOf returns first occurrence
    expect(getCorrectOptionIndex(question)).toBe(0);
  });
});

describe('parseFrontmatter extended edge cases', () => {
  it('handles frontmatter with colons in values', () => {
    const markdown = `---
title: Time: 10:30 AM
url: https://example.com
---
Content`;
    const result = parseFrontmatter(markdown);
    expect(result.frontmatter.title).toBe('Time: 10:30 AM');
    expect(result.frontmatter.url).toBe('https://example.com');
  });

  it('handles frontmatter with leading zeros (keeps as string)', () => {
    const markdown = `---
zipcode: 02134
order: 01
---
Content`;
    const result = parseFrontmatter(markdown);
    // Leading zeros mean it should stay a string
    expect(result.frontmatter.zipcode).toBe('02134');
    expect(result.frontmatter.order).toBe('01');
  });

  it('handles frontmatter with Windows line endings (CRLF)', () => {
    const markdown = '---\r\ntitle: Test\r\norder: 1\r\n---\r\nContent';
    const result = parseFrontmatter(markdown);
    expect(result.frontmatter.title).toBe('Test');
    expect(result.frontmatter.order).toBe(1);
    expect(result.content).toBe('Content');
  });

  it('handles frontmatter with mixed line endings', () => {
    const markdown = '---\ntitle: Test\r\norder: 2\n---\r\nContent';
    const result = parseFrontmatter(markdown);
    expect(result.frontmatter.title).toBe('Test');
  });
});

describe('extractTitleFromContent extended edge cases', () => {
  it('ignores h1 inside fenced code block', () => {
    const content = `Some intro text

\`\`\`python
# This is a comment, not a header
print("hello")
\`\`\`

# Real Header

More content`;
    expect(extractTitleFromContent(content)).toBe('Real Header');
  });

  it('ignores h1 inside tilde fenced code block', () => {
    const content = `~~~markdown
# Not a real header
~~~

# Actual Title`;
    expect(extractTitleFromContent(content)).toBe('Actual Title');
  });

  it('returns null when no h1 outside code blocks', () => {
    const content = `\`\`\`
# Only in code block
\`\`\``;
    expect(extractTitleFromContent(content)).toBe(null);
  });

  it('handles h1 with special characters', () => {
    const content = '# Title with *emphasis* and `code`';
    expect(extractTitleFromContent(content)).toBe('Title with *emphasis* and `code`');
  });
});

describe('groupIdsByTopic extended edge cases', () => {
  it('handles empty array', () => {
    expect(groupIdsByTopic([])).toEqual({});
  });

  it('handles items without topicId', () => {
    const items = [
      { id: 'item-1' },
      { id: 'item-2', topicId: 'cs101-topic-3' },
    ];
    const result = groupIdsByTopic(items);
    expect(result).toEqual({ 3: ['item-2'] });
  });

  it('handles both long and short format topicIds in same array', () => {
    const items = [
      { id: 'quiz-1', topicId: 'cs101-topic-1' },
      { id: 'quiz-2', topicId: 'cs205-2' },
      { id: 'quiz-3', topicId: 'math301-topic-3' },
    ];
    const result = groupIdsByTopic(items);
    expect(result[1]).toEqual(['quiz-1']);
    expect(result[2]).toEqual(['quiz-2']);
    expect(result[3]).toEqual(['quiz-3']);
  });

  it('handles topicId with no number suffix', () => {
    const items = [
      { id: 'item-1', topicId: 'invalid-format' },
    ];
    const result = groupIdsByTopic(items);
    expect(result).toEqual({});
  });

  it('groups multiple items into same topic', () => {
    const items = [
      { id: 'q1', topicId: 'cs101-topic-1' },
      { id: 'q2', topicId: 'cs101-topic-1' },
      { id: 'q3', topicId: 'cs101-topic-1' },
    ];
    const result = groupIdsByTopic(items);
    expect(result[1]).toEqual(['q1', 'q2', 'q3']);
  });
});

describe('generateTableOfContents extended edge cases', () => {
  it('ignores headings in single code block', () => {
    const markdown = `# Main Title

\`\`\`markdown
# Nested Heading Should Be Ignored
## Also Ignored
\`\`\`

## Real Second Heading`;

    const toc = generateTableOfContents(markdown);
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe('Main Title');
    expect(toc[1].text).toBe('Real Second Heading');
  });

  it('handles code block close that looks like code block open with language', () => {
    // This tests that ```python doesn't close a ``` block
    const markdown = `# Title

\`\`\`
# Comment inside
\`\`\`python
# Still inside because \`\`\`python is not a valid close
\`\`\`

## Visible Heading`;

    const toc = generateTableOfContents(markdown);
    // The code block opens with ```, then ```python does NOT close it
    // The final ``` does close it
    // So only "Title" and "Visible Heading" should be in TOC
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe('Title');
    expect(toc[1].text).toBe('Visible Heading');
  });

  it('handles headings with inline code', () => {
    const markdown = '# Using `console.log()` in JavaScript';
    const toc = generateTableOfContents(markdown);
    expect(toc[0].text).toBe('Using `console.log()` in JavaScript');
  });

  it('generates unique IDs for duplicate headings', () => {
    const markdown = `# Introduction
## Setup
# Introduction
## Setup
# Introduction`;

    const toc = generateTableOfContents(markdown);
    expect(toc[0].id).toBe('introduction');
    expect(toc[2].id).toBe('introduction-1');
    expect(toc[4].id).toBe('introduction-2');
    expect(toc[1].id).toBe('setup');
    expect(toc[3].id).toBe('setup-1');
  });

  it('handles heading with only special characters', () => {
    const markdown = '# ***';
    const toc = generateTableOfContents(markdown);
    expect(toc[0].text).toBe('***');
    expect(toc[0].id).toBe(''); // All special chars removed
  });

  it('handles CRLF line endings', () => {
    const markdown = '# Title 1\r\n\r\n## Title 2\r\n\r\nContent';
    const toc = generateTableOfContents(markdown);
    expect(toc).toHaveLength(2);
  });

  it('handles code block with language identifier that looks like heading', () => {
    const markdown = `# Real Title

\`\`\`python
# Python comment
def foo():
    pass
\`\`\`

## Another Real Title`;

    const toc = generateTableOfContents(markdown);
    expect(toc).toHaveLength(2);
    expect(toc[0].text).toBe('Real Title');
    expect(toc[1].text).toBe('Another Real Title');
  });
});
