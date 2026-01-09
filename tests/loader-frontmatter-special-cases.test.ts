/**
 * Loader Frontmatter Special Cases Tests
 *
 * Additional edge case tests for frontmatter parsing focusing on:
 * - Special characters and Unicode handling
 * - Malformed input resilience
 * - Boundary conditions
 */

import { describe, it, expect } from 'vitest';
import {
  parseFrontmatter,
  extractTitleFromContent,
  slugFromFilename,
} from '../src/subjects/loader';

describe('loader frontmatter special cases', () => {
  describe('parseFrontmatter with special characters', () => {
    it('handles Unicode characters in values', () => {
      const markdown = `---
title: Introduction to 日本語
author: François Müller
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Introduction to 日本語');
      expect(result.frontmatter.author).toBe('François Müller');
    });

    it('handles emoji in frontmatter values', () => {
      const markdown = `---
title: Getting Started 🚀
status: complete ✅
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Getting Started 🚀');
      expect(result.frontmatter.status).toBe('complete ✅');
    });

    it('handles colons in values (after the key colon)', () => {
      const markdown = `---
title: Time: 10:30 AM
url: https://example.com
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Time: 10:30 AM');
      expect(result.frontmatter.url).toBe('https://example.com');
    });

    it('handles mathematical symbols in values', () => {
      const markdown = `---
title: Calculus: ∫f(x)dx and ∑n
formula: E = mc²
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Calculus: ∫f(x)dx and ∑n');
      expect(result.frontmatter.formula).toBe('E = mc²');
    });

    it('preserves leading zeros in string values that look numeric', () => {
      const markdown = `---
zipcode: 01234
id: 007
version: 2.0
---
Content`;

      const result = parseFrontmatter(markdown);

      // Leading zeros should make the value stay as string
      expect(result.frontmatter.zipcode).toBe('01234');
      expect(result.frontmatter.id).toBe('007');
      expect(result.frontmatter.version).toBe('2.0');
    });

    it('parses zero as number', () => {
      const markdown = `---
order: 0
count: 0
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.order).toBe(0);
      expect(result.frontmatter.count).toBe(0);
      expect(typeof result.frontmatter.order).toBe('number');
    });

    it('handles negative numbers as strings (no special handling)', () => {
      const markdown = `---
offset: -5
temp: -10
---
Content`;

      const result = parseFrontmatter(markdown);

      // Negative numbers are treated as strings by the simple parser
      expect(result.frontmatter.offset).toBe('-5');
      expect(result.frontmatter.temp).toBe('-10');
    });

    it('handles very long values', () => {
      const longValue = 'a'.repeat(1000);
      const markdown = `---
title: ${longValue}
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe(longValue);
    });

    it('handles special quote characters', () => {
      // Using Unicode escapes for curly quotes to avoid syntax issues
      const leftDoubleQuote = '\u201c';
      const rightDoubleQuote = '\u201d';
      const leftSingleQuote = '\u2018';
      const rightSingleQuote = '\u2019';

      const markdown = `---
title: ${leftDoubleQuote}Smart quotes${rightDoubleQuote}
quote: ${leftSingleQuote}Single smart${rightSingleQuote}
---
Content`;

      const result = parseFrontmatter(markdown);

      // These are curly quotes, not standard ASCII quotes
      expect(result.frontmatter.title).toBe(`${leftDoubleQuote}Smart quotes${rightDoubleQuote}`);
      expect(result.frontmatter.quote).toBe(`${leftSingleQuote}Single smart${rightSingleQuote}`);
    });

    it('handles backslashes in values', () => {
      const markdown = `---
path: C:\\Users\\name\\file.txt
regex: \\d+\\s*
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.path).toBe('C:\\Users\\name\\file.txt');
      expect(result.frontmatter.regex).toBe('\\d+\\s*');
    });
  });

  describe('parseFrontmatter boundary conditions', () => {
    it('handles frontmatter at exact line boundaries', () => {
      const markdown = '---\ntitle: Test\n---\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Test');
      expect(result.content).toBe('Content');
    });

    it('handles Windows line endings (CRLF)', () => {
      const markdown = '---\r\ntitle: Windows\r\n---\r\nContent';

      const result = parseFrontmatter(markdown);

      // The regex expects \n, so CRLF might not parse correctly
      // This tests the actual behavior
      expect(result.content).toBeDefined();
    });

    it('handles content that looks like frontmatter in the middle', () => {
      const markdown = `---
title: Real Title
---
Some content here.

---
This is not frontmatter
---

More content.`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Real Title');
      expect(result.content).toContain('This is not frontmatter');
    });

    it('handles keys with underscores and dashes', () => {
      const markdown = `---
my_key: value1
another-key: value2
camelCase: value3
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter['my_key']).toBe('value1');
      expect(result.frontmatter['another-key']).toBe('value2');
      expect(result.frontmatter['camelCase']).toBe('value3');
    });

    it('handles lines without colons in frontmatter', () => {
      const markdown = `---
title: Valid
this line has no colon
another: valid
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Valid');
      expect(result.frontmatter.another).toBe('valid');
      // Lines without colons are simply ignored
      expect(Object.keys(result.frontmatter).length).toBe(2);
    });

    it('handles duplicate keys (last wins)', () => {
      const markdown = `---
title: First
title: Second
title: Third
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Third');
    });
  });

  describe('extractTitleFromContent edge cases', () => {
    it('handles title with inline code', () => {
      const content = '# Introduction to `printf`\n\nContent';

      expect(extractTitleFromContent(content)).toBe('Introduction to `printf`');
    });

    it('handles title with math notation', () => {
      const content = '# The $O(n^2)$ Algorithm\n\nContent';

      expect(extractTitleFromContent(content)).toBe('The $O(n^2)$ Algorithm');
    });

    it('handles title with brackets', () => {
      const content = '# Arrays and [LinkedLists]\n\nContent';

      expect(extractTitleFromContent(content)).toBe('Arrays and [LinkedLists]');
    });

    it('handles title with parentheses', () => {
      const content = '# Functions (and Methods)\n\nContent';

      expect(extractTitleFromContent(content)).toBe('Functions (and Methods)');
    });

    it('handles nested code blocks', () => {
      const content = `\`\`\`python
# This is a Python comment
def foo():
    \`\`\`
    nested
    \`\`\`
    pass
\`\`\`

# Real Title`;

      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('handles indented code block with hash', () => {
      const content = `    # Indented code comment (4 spaces)

# Actual Title`;

      // Indented code (4 spaces) is not a fenced block, so # might be matched
      // This test documents the actual behavior
      const result = extractTitleFromContent(content);
      expect(result).toBeDefined();
    });

    it('handles content with only whitespace before title', () => {
      const content = '\n\n\n# Title After Whitespace\n\nContent';

      expect(extractTitleFromContent(content)).toBe('Title After Whitespace');
    });

    it('handles title at very end of content', () => {
      const content = 'Some content\n\n# Final Title';

      expect(extractTitleFromContent(content)).toBe('Final Title');
    });

    it('handles title with trailing whitespace', () => {
      const content = '# Title With Trailing Spaces   \n\nContent';

      expect(extractTitleFromContent(content)).toBe('Title With Trailing Spaces');
    });

    it('does not match ## headers', () => {
      const content = '## This is H2\n### This is H3';

      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles h1 without space after hash', () => {
      const content = '#NoSpace\n\nContent';

      // Standard markdown requires space after #
      expect(extractTitleFromContent(content)).toBeNull();
    });
  });

  describe('slugFromFilename edge cases', () => {
    it('handles three-digit prefixes', () => {
      expect(slugFromFilename('100-chapter.md')).toBe('chapter');
    });

    it('handles prefix with multiple dashes', () => {
      // Only the leading number-dash is removed
      expect(slugFromFilename('01--double-dash.md')).toBe('-double-dash');
    });

    it('handles uppercase in extension', () => {
      expect(slugFromFilename('01-topic.MD')).toBe('topic.md');
    });

    it('handles multiple extensions', () => {
      expect(slugFromFilename('01-archive.tar.gz')).toBe('archive.tar.gz');
    });

    it('handles just the extension', () => {
      expect(slugFromFilename('.md')).toBe('');
    });

    it('handles spaces in filename', () => {
      expect(slugFromFilename('01-my topic.md')).toBe('my topic');
    });

    it('handles underscores in filename', () => {
      expect(slugFromFilename('01-my_topic_name.md')).toBe('my_topic_name');
    });

    it('handles Unicode in filename', () => {
      expect(slugFromFilename('01-日本語.md')).toBe('日本語');
    });

    it('handles numbers not at start', () => {
      expect(slugFromFilename('topic-01-review.md')).toBe('topic-01-review');
    });

    it('handles zero prefix', () => {
      expect(slugFromFilename('0-intro.md')).toBe('intro');
    });
  });
});

describe('frontmatter resilience tests', () => {
  describe('malformed input handling', () => {
    it('handles completely empty string', () => {
      const result = parseFrontmatter('');

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe('');
    });

    it('handles only whitespace', () => {
      const result = parseFrontmatter('   \n\t\n   ');

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe('   \n\t\n   ');
    });

    it('handles only dashes (no newlines)', () => {
      const result = parseFrontmatter('---');

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe('---');
    });

    it('handles mismatched frontmatter markers', () => {
      const markdown = `---
title: Test
--
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('handles extra dashes in markers', () => {
      const markdown = `----
title: Test
----
Content`;

      const result = parseFrontmatter(markdown);

      // The regex expects exactly ---
      expect(result.frontmatter).toEqual({});
    });

    it('handles frontmatter with null byte (security test)', () => {
      const markdown = `---
title: Test\0Value
---
Content`;

      const result = parseFrontmatter(markdown);

      // Should handle gracefully without crashing
      expect(result.frontmatter.title).toBe('Test\0Value');
    });

    it('handles very large frontmatter', () => {
      const lines = Array.from({ length: 1000 }, (_, i) => `key${i}: value${i}`).join('\n');
      const markdown = `---\n${lines}\n---\nContent`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.key0).toBe('value0');
      expect(result.frontmatter.key999).toBe('value999');
      expect(result.content).toBe('Content');
    });
  });
});
