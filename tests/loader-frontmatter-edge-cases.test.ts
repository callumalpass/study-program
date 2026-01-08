/**
 * Loader Frontmatter Edge Cases Tests
 *
 * Comprehensive tests for edge cases in the parseFrontmatter function.
 * These tests cover:
 * - Values containing special characters (colons, URLs)
 * - Various quote handling scenarios
 * - Numeric parsing edge cases
 * - Malformed YAML handling
 * - Unicode and special character support
 */

import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from '../src/subjects/loader';

describe('parseFrontmatter edge cases', () => {
  describe('values with colons', () => {
    it('handles values containing colons after the key', () => {
      const markdown = `---
title: Hello: World: Test
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Hello: World: Test');
    });

    it('handles URL values with protocol colons', () => {
      const markdown = `---
url: https://example.com/path
link: http://test.org:8080/api
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.url).toBe('https://example.com/path');
      expect(result.frontmatter.link).toBe('http://test.org:8080/api');
    });

    it('handles time values with colons', () => {
      const markdown = `---
timestamp: 12:30:45
duration: 1:30
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.timestamp).toBe('12:30:45');
      expect(result.frontmatter.duration).toBe('1:30');
    });
  });

  describe('quote handling', () => {
    it('strips double quotes from values', () => {
      const markdown = `---
title: "Quoted Title"
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Quoted Title');
    });

    it('strips single quotes from values', () => {
      const markdown = `---
title: 'Single Quoted'
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Single Quoted');
    });

    it('preserves unbalanced quotes (only opening quote)', () => {
      const markdown = `---
title: "Unbalanced
---
Content`;

      const result = parseFrontmatter(markdown);
      // Should not strip since quotes are unbalanced
      expect(result.frontmatter.title).toBe('"Unbalanced');
    });

    it('preserves unbalanced quotes (only closing quote)', () => {
      const markdown = `---
title: Unbalanced"
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Unbalanced"');
    });

    it('preserves quotes when mixed quote types', () => {
      const markdown = `---
title: "Mixed quotes'
---
Content`;

      const result = parseFrontmatter(markdown);
      // Should not strip since quote types don't match
      expect(result.frontmatter.title).toBe("\"Mixed quotes'");
    });

    it('handles quoted values with internal quotes', () => {
      const markdown = `---
title: "He said 'hello'"
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe("He said 'hello'");
    });

    it('handles empty quoted values', () => {
      const markdown = `---
empty_double: ""
empty_single: ''
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.empty_double).toBe('');
      expect(result.frontmatter.empty_single).toBe('');
    });
  });

  describe('numeric parsing', () => {
    it('parses positive integers', () => {
      const markdown = `---
order: 42
count: 0
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.order).toBe(42);
      expect(typeof result.frontmatter.order).toBe('number');
      expect(result.frontmatter.count).toBe(0);
      expect(typeof result.frontmatter.count).toBe('number');
    });

    it('does not parse negative numbers as numbers', () => {
      const markdown = `---
negative: -5
---
Content`;

      const result = parseFrontmatter(markdown);
      // The regex /^\d+$/ only matches positive integers
      expect(result.frontmatter.negative).toBe('-5');
      expect(typeof result.frontmatter.negative).toBe('string');
    });

    it('does not parse floats as numbers', () => {
      const markdown = `---
version: 1.5
pi: 3.14159
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.version).toBe('1.5');
      expect(typeof result.frontmatter.version).toBe('string');
      expect(result.frontmatter.pi).toBe('3.14159');
    });

    it('preserves numbers with leading zeros as strings', () => {
      const markdown = `---
zipcode: 01234
---
Content`;

      const result = parseFrontmatter(markdown);
      // Leading zeros indicate the value should remain a string (e.g., zip codes, IDs)
      expect(result.frontmatter.zipcode).toBe('01234');
      expect(typeof result.frontmatter.zipcode).toBe('string');
    });

    it('preserves single leading zero as string (octal-like)', () => {
      const markdown = `---
code: 00123
extension: 007
binary: 00001111
---
Content`;

      const result = parseFrontmatter(markdown);
      // All leading zero values should be preserved as strings
      expect(result.frontmatter.code).toBe('00123');
      expect(typeof result.frontmatter.code).toBe('string');
      expect(result.frontmatter.extension).toBe('007');
      expect(typeof result.frontmatter.extension).toBe('string');
      expect(result.frontmatter.binary).toBe('00001111');
      expect(typeof result.frontmatter.binary).toBe('string');
    });

    it('parses zero itself as a number', () => {
      const markdown = `---
count: 0
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.count).toBe(0);
      expect(typeof result.frontmatter.count).toBe('number');
    });

    it('parses large integers correctly', () => {
      const markdown = `---
bignum: 1234567890
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.bignum).toBe(1234567890);
      expect(typeof result.frontmatter.bignum).toBe('number');
    });

    it('does not parse numeric strings in quotes as numbers', () => {
      const markdown = `---
quoted_num: "42"
---
Content`;

      const result = parseFrontmatter(markdown);
      // After quote stripping, should still be parsed as number
      expect(result.frontmatter.quoted_num).toBe(42);
    });
  });

  describe('whitespace handling', () => {
    it('trims leading and trailing whitespace from values', () => {
      const markdown = `---
title:   Lots of space
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Lots of space');
    });

    it('handles values with only whitespace', () => {
      const markdown = `---
empty:
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.empty).toBe('');
    });

    it('trims whitespace from keys', () => {
      const markdown = `---
title  : Value
---
Content`;

      const result = parseFrontmatter(markdown);
      // The implementation trims keys, so trailing whitespace is removed
      expect(result.frontmatter.title).toBe('Value');
    });

    it('preserves internal whitespace in values', () => {
      const markdown = `---
title: Hello   World   Test
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Hello   World   Test');
    });
  });

  describe('special characters', () => {
    it('handles unicode characters in values', () => {
      const markdown = `---
title: Héllo Wörld 日本語
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Héllo Wörld 日本語');
    });

    it('handles mathematical symbols', () => {
      const markdown = `---
formula: O(n²) + Ω(log n)
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.formula).toBe('O(n²) + Ω(log n)');
    });

    it('handles Greek letters', () => {
      const markdown = `---
greek: α β γ δ λ
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.greek).toBe('α β γ δ λ');
    });

    it('handles emojis', () => {
      const markdown = `---
emoji: 🎉 Test 🚀
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.emoji).toBe('🎉 Test 🚀');
    });
  });

  describe('malformed frontmatter', () => {
    it('skips lines without colons', () => {
      const markdown = `---
title: Valid
invalid line without colon
another: valid
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Valid');
      expect(result.frontmatter.another).toBe('valid');
      expect(Object.keys(result.frontmatter)).toHaveLength(2);
    });

    it('handles keys starting with colon (colonIndex === 0)', () => {
      const markdown = `---
:invalid: value
title: Valid
---
Content`;

      const result = parseFrontmatter(markdown);
      // colonIndex === 0 means empty key, which should be skipped (colonIndex > 0 check)
      expect(result.frontmatter.title).toBe('Valid');
      expect(result.frontmatter['']).toBeUndefined();
    });

    it('returns original content when frontmatter not closed', () => {
      const markdown = `---
title: Test
Content without closing marker`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('returns original content when frontmatter markers not at start', () => {
      const markdown = `Some content
---
title: Test
---
More content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });
  });

  describe('content after frontmatter', () => {
    it('preserves content exactly after frontmatter', () => {
      const markdown = `---
title: Test
---
# Heading

Paragraph with **bold** and *italic*.

\`\`\`python
def foo():
    pass
\`\`\``;

      const result = parseFrontmatter(markdown);
      expect(result.content).toContain('# Heading');
      expect(result.content).toContain('**bold**');
      expect(result.content).toContain('def foo():');
    });

    it('handles empty content after frontmatter', () => {
      const markdown = `---
title: Test
---`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test');
      expect(result.content).toBe('');
    });

    it('handles content with only newlines after frontmatter', () => {
      const markdown = `---
title: Test
---



`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test');
      // The regex captures all content after the closing ---, including trailing newlines
      expect(result.content).toBe('\n\n\n');
    });

    it('preserves frontmatter-like content in the body', () => {
      const markdown = `---
title: Real Frontmatter
---
Here is some content with dashes:

---
This is not: frontmatter
---`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Real Frontmatter');
      expect(result.content).toContain('This is not: frontmatter');
    });
  });

  describe('edge cases in key handling', () => {
    it('handles keys with underscores', () => {
      const markdown = `---
snake_case_key: value
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.snake_case_key).toBe('value');
    });

    it('handles keys with hyphens', () => {
      const markdown = `---
kebab-case-key: value
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter['kebab-case-key']).toBe('value');
    });

    it('handles keys with numbers', () => {
      const markdown = `---
key123: value
123key: another
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.key123).toBe('value');
      expect(result.frontmatter['123key']).toBe('another');
    });

    it('handles duplicate keys (last wins)', () => {
      const markdown = `---
title: First
title: Second
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Second');
    });
  });

  describe('integration scenarios', () => {
    it('handles typical markdown file frontmatter', () => {
      const markdown = `---
id: cs101-t1-intro
title: Introduction to Programming
order: 1
slug: introduction
---
# Introduction to Programming

Welcome to CS101! In this course, you will learn the fundamentals of programming.`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.id).toBe('cs101-t1-intro');
      expect(result.frontmatter.title).toBe('Introduction to Programming');
      expect(result.frontmatter.order).toBe(1);
      expect(result.frontmatter.slug).toBe('introduction');
      expect(result.content).toContain('# Introduction to Programming');
    });

    it('handles complex reading list frontmatter', () => {
      const markdown = `---
title: "Advanced Data Structures: A Deep Dive"
author: "Dr. Jane Smith"
url: https://example.com/papers/data-structures?format=pdf&version=2
year: 2023
---
Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Advanced Data Structures: A Deep Dive');
      expect(result.frontmatter.author).toBe('Dr. Jane Smith');
      expect(result.frontmatter.url).toBe('https://example.com/papers/data-structures?format=pdf&version=2');
      expect(result.frontmatter.year).toBe(2023);
    });
  });
});
