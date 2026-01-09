/**
 * Loader Extract Title Edge Cases Tests
 *
 * Comprehensive tests for edge cases in the extractTitleFromContent function.
 * These tests cover various code block scenarios that should be filtered out
 * when extracting the title from markdown content.
 */

import { describe, it, expect } from 'vitest';
import { extractTitleFromContent } from '../src/subjects/loader';

describe('extractTitleFromContent', () => {
  describe('basic functionality', () => {
    it('extracts title from simple h1 heading', () => {
      const content = '# Hello World\n\nSome content';
      expect(extractTitleFromContent(content)).toBe('Hello World');
    });

    it('extracts first h1 when multiple exist', () => {
      const content = '# First Title\n\n# Second Title\n\nContent';
      expect(extractTitleFromContent(content)).toBe('First Title');
    });

    it('returns null when no h1 heading exists', () => {
      const content = '## Second Level\n\nNo h1 here';
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('returns null for empty content', () => {
      expect(extractTitleFromContent('')).toBeNull();
    });

    it('trims whitespace from title', () => {
      const content = '#   Spaced Title   \n\nContent';
      expect(extractTitleFromContent(content)).toBe('Spaced Title');
    });
  });

  describe('ignores headings in backtick code blocks', () => {
    it('ignores heading inside basic code block', () => {
      const content = `\`\`\`
# Comment in code
\`\`\`

# Real Title

Content`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('ignores heading inside code block with language specifier', () => {
      const content = `\`\`\`python
# This is a Python comment
def hello():
    pass
\`\`\`

# Actual Title

More content`;
      expect(extractTitleFromContent(content)).toBe('Actual Title');
    });

    it('ignores heading in bash code block', () => {
      const content = `\`\`\`bash
# Install dependencies
npm install
\`\`\`

# Installation Guide

Follow these steps.`;
      expect(extractTitleFromContent(content)).toBe('Installation Guide');
    });

    it('ignores heading in shell code block', () => {
      const content = `\`\`\`shell
# Run the build
npm run build
\`\`\`

# Build Instructions`;
      expect(extractTitleFromContent(content)).toBe('Build Instructions');
    });
  });

  describe('ignores headings in tilde code blocks', () => {
    it('ignores heading inside tilde code block', () => {
      const content = `~~~
# Comment in code
~~~

# Real Title

Content`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('ignores heading in tilde code block with language', () => {
      const content = `~~~ruby
# Ruby comment
class Foo
end
~~~

# Ruby Guide

Learn Ruby!`;
      expect(extractTitleFromContent(content)).toBe('Ruby Guide');
    });
  });

  describe('multiple code blocks', () => {
    it('handles multiple code blocks before the title', () => {
      const content = `\`\`\`python
# Python code
print("hello")
\`\`\`

\`\`\`bash
# Bash comment
echo "world"
\`\`\`

# Main Title

Content follows.`;
      expect(extractTitleFromContent(content)).toBe('Main Title');
    });

    it('handles code blocks after the title', () => {
      const content = `# Main Title

Some intro text.

\`\`\`python
# This won't be the title
def main():
    pass
\`\`\``;
      expect(extractTitleFromContent(content)).toBe('Main Title');
    });

    it('handles interleaved code blocks and content', () => {
      const content = `\`\`\`
# Not this
\`\`\`

Some text.

\`\`\`
# Not this either
\`\`\`

# The Real Title

\`\`\`
# Not this too
\`\`\``;
      expect(extractTitleFromContent(content)).toBe('The Real Title');
    });
  });

  describe('edge cases with code block delimiters', () => {
    it('handles code block at the very start', () => {
      const content = `\`\`\`
# Comment
\`\`\`
# Title`;
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles content with only code blocks and no h1', () => {
      const content = `\`\`\`python
# Just a comment
print("no title here")
\`\`\`

No h1 heading in this content.`;
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles empty code blocks', () => {
      const content = `\`\`\`
\`\`\`

# Title After Empty Block`;
      expect(extractTitleFromContent(content)).toBe('Title After Empty Block');
    });
  });

  describe('h1 heading edge cases', () => {
    it('requires space after hash for h1', () => {
      const content = '#NoSpace\n\n# With Space';
      expect(extractTitleFromContent(content)).toBe('With Space');
    });

    it('handles h1 with special characters', () => {
      const content = '# Hello, World! (2024)\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Hello, World! (2024)');
    });

    it('handles h1 with markdown formatting', () => {
      const content = '# **Bold** and *italic* title\n\nContent';
      expect(extractTitleFromContent(content)).toBe('**Bold** and *italic* title');
    });

    it('handles h1 with inline code', () => {
      const content = '# Using `const` in JavaScript\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Using `const` in JavaScript');
    });

    it('handles h1 with unicode characters', () => {
      const content = '# Algorithms: O(n²) Complexity\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Algorithms: O(n²) Complexity');
    });

    it('handles h1 with emojis', () => {
      const content = '# Welcome 👋 to the Course\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Welcome 👋 to the Course');
    });
  });

  describe('title not at line start', () => {
    it('ignores h1 that is indented', () => {
      const content = `  # Indented heading
# Real Title`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('ignores h1 preceded by text on same line', () => {
      const content = `text # Not a title
# Real Title`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });
  });

  describe('inline code vs code blocks', () => {
    it('does not confuse inline code with code blocks', () => {
      const content = 'Use `# comment` for bash comments.\n\n# Bash Guide';
      expect(extractTitleFromContent(content)).toBe('Bash Guide');
    });

    it('handles backticks in regular text', () => {
      const content = '```\n# In block\n```\n\n# Title with `code`';
      expect(extractTitleFromContent(content)).toBe('Title with `code`');
    });
  });

  describe('mixed tilde and backtick blocks', () => {
    it('handles mixed code block types', () => {
      const content = `\`\`\`python
# Python comment
\`\`\`

~~~bash
# Bash comment
~~~

# Mixed Block Title`;
      expect(extractTitleFromContent(content)).toBe('Mixed Block Title');
    });
  });

  describe('newline handling', () => {
    it('handles different line ending styles', () => {
      const content = '# Title\r\n\r\nContent with CRLF';
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles title at very end of content', () => {
      const content = 'Some intro.\n\n# Final Title';
      expect(extractTitleFromContent(content)).toBe('Final Title');
    });

    it('handles title followed by no newline', () => {
      const content = '# Title Without Trailing Newline';
      expect(extractTitleFromContent(content)).toBe('Title Without Trailing Newline');
    });
  });

  describe('whitespace and formatting', () => {
    it('handles multiple spaces after hash', () => {
      const content = '#    Multiple Spaces';
      expect(extractTitleFromContent(content)).toBe('Multiple Spaces');
    });

    it('handles tabs after hash', () => {
      const content = '#\tTab After Hash';
      // Tab is not a space, so this won't match the regex which requires \s+
      // The regex /^#\s+(.+)$/m will match tabs since \s includes tabs
      expect(extractTitleFromContent(content)).toBe('Tab After Hash');
    });

    it('preserves internal whitespace in title', () => {
      const content = '# Title  With   Multiple  Spaces';
      expect(extractTitleFromContent(content)).toBe('Title  With   Multiple  Spaces');
    });
  });
});
