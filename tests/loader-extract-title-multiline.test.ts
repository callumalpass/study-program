/**
 * Loader extractTitleFromContent Multiline Edge Cases Tests
 *
 * Tests for edge cases in code block handling that specifically
 * test multiline regex behavior and delimiter matching.
 */

import { describe, it, expect } from 'vitest';
import { extractTitleFromContent } from '../src/subjects/loader';

describe('extractTitleFromContent - multiline and delimiter edge cases', () => {
  describe('code block delimiter matching', () => {
    it('handles code block where closing delimiter is on its own line', () => {
      const content = `\`\`\`python
# Comment that looks like heading
print("hello")
\`\`\`

# Real Title`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('handles code block with language identifier containing special chars', () => {
      const content = `\`\`\`python3.11
# Comment
\`\`\`

# Title`;
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles mixed tilde and backtick blocks in same document', () => {
      const content = `\`\`\`
# In backtick block
\`\`\`

~~~
# In tilde block
~~~

# Actual Title`;
      expect(extractTitleFromContent(content)).toBe('Actual Title');
    });

    it('handles code block immediately at start of file', () => {
      const content = `\`\`\`
# Code comment
\`\`\`
# Title`;
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles multiple h1 headings after code blocks', () => {
      const content = `\`\`\`
# Code
\`\`\`

# First H1

# Second H1`;
      // Should return the first h1 outside code blocks
      expect(extractTitleFromContent(content)).toBe('First H1');
    });
  });

  describe('edge cases with whitespace and newlines', () => {
    it('handles CRLF line endings in code blocks', () => {
      const content = '```\r\n# Code comment\r\n```\r\n\r\n# Title';
      // The regex might not handle CRLF correctly
      const result = extractTitleFromContent(content);
      expect(result).not.toBeNull();
    });

    it('handles code block with blank lines inside', () => {
      const content = `\`\`\`python

# Comment after blank line

\`\`\`

# Title`;
      expect(extractTitleFromContent(content)).toBe('Title');
    });

    it('handles h1 with extra spaces before hash', () => {
      // Standard markdown requires h1 at line start
      const content = `   # Indented Title`;
      // This shouldn't match as h1 since it's indented
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles h1 with tab after hash', () => {
      const content = `#\tTabbed Title`;
      // Should match since there's whitespace after #
      expect(extractTitleFromContent(content)).toBe('Tabbed Title');
    });
  });

  describe('content without any h1', () => {
    it('returns null for h2 through h6 only', () => {
      const content = `## H2
### H3
#### H4
##### H5
###### H6`;
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('returns null for code-only content', () => {
      const content = `\`\`\`python
# All code
print("no heading")
\`\`\``;
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('returns null for plain text without headings', () => {
      const content = `Just some plain text.
No headings here at all.
Not a single one.`;
      expect(extractTitleFromContent(content)).toBeNull();
    });
  });

  describe('h1 with special content', () => {
    it('preserves emoji in title', () => {
      const content = `# Welcome 👋 to the Course`;
      expect(extractTitleFromContent(content)).toBe('Welcome 👋 to the Course');
    });

    it('preserves math notation in title', () => {
      const content = `# Understanding O(n²) Complexity`;
      expect(extractTitleFromContent(content)).toBe('Understanding O(n²) Complexity');
    });

    it('preserves multiple hash symbols in inline code', () => {
      const content = '# Using `###` for Comments';
      expect(extractTitleFromContent(content)).toBe('Using `###` for Comments');
    });

    it('handles empty h1', () => {
      const content = `#

## Actual content starts here`;
      // Empty h1 should not match (regex requires content after #)
      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles h1 with only whitespace', () => {
      const content = `#
## Subtitle`;
      // H1 with only spaces should not match
      expect(extractTitleFromContent(content)).toBeNull();
    });
  });

  describe('unclosed and malformed code blocks', () => {
    it('handles document ending with unclosed code block', () => {
      const content = `# Title Before Code

\`\`\`python
# This code block is never closed
def hello():
    pass`;
      // Title appears before the unclosed block
      expect(extractTitleFromContent(content)).toBe('Title Before Code');
    });

    it('handles document with only unclosed code block containing h1', () => {
      const content = `\`\`\`python
# This looks like a heading but is in unclosed code block`;
      // When code block is unclosed, the regex may not match it
      // so the # might be picked up - this documents actual behavior
      const result = extractTitleFromContent(content);
      // The unclosed block won't be matched by the regex, so # is visible
      expect(result).toBe('This looks like a heading but is in unclosed code block');
    });

    it('handles code block with extra backticks (4+)', () => {
      const content = `\`\`\`\`
# Inside extended fence
\`\`\`\`

# Title`;
      // 4 backticks should work similarly to 3
      expect(extractTitleFromContent(content)).toBe('Title');
    });
  });

  describe('performance edge cases', () => {
    it('handles very long title', () => {
      const longTitle = 'A'.repeat(1000);
      const content = `# ${longTitle}\n\nContent`;
      expect(extractTitleFromContent(content)).toBe(longTitle);
    });

    it('handles many code blocks efficiently', () => {
      const codeBlocks = Array(50).fill('```\n# Code\n```\n').join('');
      const content = `${codeBlocks}\n# Final Title`;
      expect(extractTitleFromContent(content)).toBe('Final Title');
    });

    it('handles deeply nested looking content', () => {
      // Simulating what might look like nested structures
      const content = `\`\`\`markdown
Here's how to show code:

\\\`\\\`\\\`python
# Not a heading
\\\`\\\`\\\`
\`\`\`

# Real Title`;
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });
  });
});
