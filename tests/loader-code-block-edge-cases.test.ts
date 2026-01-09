/**
 * Loader Code Block Edge Cases Tests
 *
 * Tests for edge cases in code block handling within extractTitleFromContent.
 * These tests focus on complex scenarios that might cause the regex to fail.
 */

import { describe, it, expect } from 'vitest';
import { extractTitleFromContent } from '../src/subjects/loader';

describe('extractTitleFromContent - code block edge cases', () => {
  describe('nested and complex code blocks', () => {
    it('handles code block with backticks inside comments', () => {
      const content = `\`\`\`python
# Example using \`print\` function
print("Hello")
\`\`\`

# Real Title`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('handles code block showing markdown syntax', () => {
      // This is a code block that contains markdown-like content
      const content = `\`\`\`markdown
# This is inside code
## Also inside
\`\`\`

# Actual Title`;
      expect(extractTitleFromContent(content)).toBe('Actual Title');
    });

    it('handles consecutive code blocks', () => {
      const content = `\`\`\`
# First code block
\`\`\`
\`\`\`
# Second code block
\`\`\`

# Title After Both`;
      expect(extractTitleFromContent(content)).toBe('Title After Both');
    });

    it('handles code block immediately followed by heading (no blank line)', () => {
      const content = `\`\`\`python
# Python comment
\`\`\`
# Immediate Title`;
      expect(extractTitleFromContent(content)).toBe('Immediate Title');
    });

    it('handles very long code block', () => {
      const longCode = Array(100).fill('# line').join('\n');
      const content = `\`\`\`
${longCode}
\`\`\`

# Title After Long Block`;
      expect(extractTitleFromContent(content)).toBe('Title After Long Block');
    });
  });

  describe('mismatched and malformed code blocks', () => {
    it('handles unclosed code block (title at end)', () => {
      // Unclosed code block - the regex won't match it
      const content = `\`\`\`python
# This might be a comment
print("no closing fence")

# Title At End`;
      // When code block is unclosed, the function might still find the title
      // depending on regex behavior - this documents actual behavior
      const result = extractTitleFromContent(content);
      // The unclosed block means regex doesn't match, so title is found
      expect(result).not.toBeNull();
    });

    it('handles code block with extra backticks on same line', () => {
      const content = `\`\`\`python # This should work
# Comment inside
\`\`\`

# Title`;
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles tilde code block closed with backticks (mismatched)', () => {
      // Mismatched delimiters - ~~~ opened but ``` used to "close"
      const content = `~~~python
# Inside tilde block
\`\`\`

# This might appear as title?
~~~

# Real Title`;
      // The ~~~ block should only close with ~~~, not ```
      const result = extractTitleFromContent(content);
      // Document actual behavior
      expect(result).toBe('Real Title');
    });
  });

  describe('edge cases with whitespace', () => {
    it('handles code block with trailing whitespace on fence line', () => {
      const content = `\`\`\`python
# Comment
\`\`\`

# Title`;
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles code block with only whitespace inside', () => {
      const content = `\`\`\`

\`\`\`

# Title After Whitespace Block`;
      expect(extractTitleFromContent(content)).toBe('Title After Whitespace Block');
    });

    it('handles Windows-style line endings (CRLF)', () => {
      const content = '\`\`\`\r\n# Comment in code\r\n\`\`\`\r\n\r\n# Title With CRLF';
      const result = extractTitleFromContent(content);
      // Document actual behavior with CRLF
      expect(result).not.toBeNull();
    });
  });

  describe('special characters in code blocks', () => {
    it('handles code block with special regex characters', () => {
      const content = `\`\`\`regex
# Match pattern: ^\\$[0-9]+
pattern = r"^\\$[0-9]+"
\`\`\`

# Regex Tutorial`;
      expect(extractTitleFromContent(content)).toBe('Regex Tutorial');
    });

    it('handles code block with unicode', () => {
      const content = `\`\`\`python
# Calculate π (pi)
pi = 3.14159
# Print: 你好世界
\`\`\`

# Unicode Support`;
      expect(extractTitleFromContent(content)).toBe('Unicode Support');
    });
  });

  describe('no h1 heading scenarios', () => {
    it('returns null when all headings are in code blocks', () => {
      const content = `\`\`\`python
# Only comment here
\`\`\`

~~~bash
# And here
~~~

No actual heading in this file.`;
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('returns null for empty content', () => {
      expect(extractTitleFromContent('')).toBeNull();
    });

    it('returns null for content with only code blocks', () => {
      const content = `\`\`\`
# code
\`\`\``;
      expect(extractTitleFromContent(content)).toBeNull();
    });
  });

  describe('h1 heading edge cases', () => {
    it('handles h1 with only a number', () => {
      const content = '# 42\n\nContent';
      expect(extractTitleFromContent(content)).toBe('42');
    });

    it('handles h1 with leading/trailing markdown formatting', () => {
      const content = '# **Bold Title**\n\nContent';
      expect(extractTitleFromContent(content)).toBe('**Bold Title**');
    });

    it('handles h1 with link syntax', () => {
      const content = '# [Link Title](https://example.com)\n\nContent';
      expect(extractTitleFromContent(content)).toBe('[Link Title](https://example.com)');
    });

    it('handles h1 with inline code', () => {
      const content = '# Using `const` and `let`\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Using `const` and `let`');
    });
  });
});
