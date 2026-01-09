/**
 * Markdown Table of Contents Generation Tests
 *
 * Tests for generateTableOfContents function including edge cases
 * for code block handling and duplicate headings.
 */

import { describe, it, expect } from 'vitest';
import { generateTableOfContents } from '../src/components/markdown';

describe('generateTableOfContents', () => {
  describe('basic heading extraction', () => {
    it('extracts single h1 heading', () => {
      const markdown = '# Title';
      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      expect(toc[0]).toEqual({
        level: 1,
        text: 'Title',
        id: 'title',
      });
    });

    it('extracts multiple headings of different levels', () => {
      const markdown = `# Main Title
## Section 1
### Subsection 1.1
## Section 2
#### Deep Section`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(5);
      expect(toc.map(h => h.level)).toEqual([1, 2, 3, 2, 4]);
    });

    it('extracts all heading levels from h1 to h6', () => {
      const markdown = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(6);
      expect(toc.map(h => h.level)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('ID generation', () => {
    it('generates lowercase IDs', () => {
      const markdown = '# UPPERCASE Title';
      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('uppercase-title');
    });

    it('replaces spaces with hyphens', () => {
      const markdown = '# Title With Spaces';
      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('title-with-spaces');
    });

    it('removes special characters from IDs', () => {
      const markdown = '# Title! With? Special@ Characters#';
      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('title-with-special-characters');
    });

    it('preserves hyphens in IDs', () => {
      const markdown = '# Already-Has-Hyphens';
      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('already-has-hyphens');
    });

    it('handles headings with numbers', () => {
      const markdown = '# Chapter 1 Introduction';
      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('chapter-1-introduction');
    });
  });

  describe('duplicate heading handling', () => {
    it('generates unique IDs for duplicate headings', () => {
      const markdown = `# Introduction
## Overview
## Overview
## Overview`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(4);
      expect(toc[1].id).toBe('overview');
      expect(toc[2].id).toBe('overview-1');
      expect(toc[3].id).toBe('overview-2');
    });

    it('handles duplicates with different levels', () => {
      const markdown = `# Section
## Section
### Section`;

      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('section');
      expect(toc[1].id).toBe('section-1');
      expect(toc[2].id).toBe('section-2');
    });

    it('tracks duplicates case-insensitively', () => {
      const markdown = `# Title
## TITLE
### title`;

      const toc = generateTableOfContents(markdown);

      expect(toc[0].id).toBe('title');
      expect(toc[1].id).toBe('title-1');
      expect(toc[2].id).toBe('title-2');
    });
  });

  describe('code block handling', () => {
    it('ignores headings inside backtick code blocks', () => {
      const markdown = `# Real Heading
\`\`\`python
# This is a comment, not a heading
def foo():
    pass
\`\`\`
## Another Real Heading`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc[0].text).toBe('Real Heading');
      expect(toc[1].text).toBe('Another Real Heading');
    });

    it('ignores headings inside tilde code blocks', () => {
      const markdown = `# Real Heading
~~~bash
# Shell comment
echo "hello"
~~~
## Another Real Heading`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc[0].text).toBe('Real Heading');
      expect(toc[1].text).toBe('Another Real Heading');
    });

    it('handles nested code blocks correctly', () => {
      const markdown = `# Start
\`\`\`
# In code block 1
\`\`\`
## Middle
\`\`\`
# In code block 2
\`\`\`
## End`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(3);
      expect(toc.map(h => h.text)).toEqual(['Start', 'Middle', 'End']);
    });

    it('handles code blocks with language specifiers', () => {
      const markdown = `# Heading
\`\`\`javascript
// # Not a heading
function foo() {}
\`\`\`
## Real Heading`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc[0].text).toBe('Heading');
      expect(toc[1].text).toBe('Real Heading');
    });

    it('handles mismatched code block delimiters', () => {
      // Backtick block should only end with backticks, not tildes
      const markdown = `# Start
\`\`\`
# Should be ignored
~~~
# Should still be ignored (wrong delimiter)
\`\`\`
## End`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Start', 'End']);
    });

    it('handles unclosed code blocks', () => {
      // If a code block is never closed, all subsequent lines are treated as code
      const markdown = `# Real Heading
\`\`\`
# Not a heading
## Also not a heading`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Real Heading');
    });

    it('handles code fence with language specifier not closing a plain code fence', () => {
      // A line like ```python should NOT close a ``` code block
      // because the closing fence must have only the delimiter (no content after)
      const markdown = `# Documentation

\`\`\`
Show how to use code:
\`\`\`python
# This is inside the outer code block, not a heading
\`\`\`

# After Code Block`;

      const toc = generateTableOfContents(markdown);

      // The ```python line should NOT close the ``` block
      // The plain ``` line closes it
      // So we should have 2 headings
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Documentation', 'After Code Block']);
    });

    it('handles tilde fence with language specifier not closing a plain tilde fence', () => {
      const markdown = `# Documentation

~~~
Example:
~~~bash
# Not a heading
~~~

# After`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Documentation', 'After']);
    });

    it('handles closing fence with trailing whitespace', () => {
      const markdown = `# Title

\`\`\`
code
\`\`\`

# After`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });

    it('handles opening fence with trailing whitespace (no language)', () => {
      const markdown = `# Title

\`\`\`
# Not a heading
\`\`\`

# After`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });

    it('handles code block immediately after heading', () => {
      const markdown = `# Title
\`\`\`
# comment
\`\`\`
# After`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });

    it('handles multiple consecutive code blocks', () => {
      const markdown = `# Start

\`\`\`
# code1
\`\`\`

\`\`\`
# code2
\`\`\`

# End`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Start', 'End']);
    });

    it('handles empty code blocks', () => {
      const markdown = `# Title

\`\`\`
\`\`\`

# After`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });
  });

  describe('edge cases', () => {
    it('handles empty markdown', () => {
      const toc = generateTableOfContents('');
      expect(toc).toHaveLength(0);
    });

    it('handles markdown with no headings', () => {
      const markdown = `This is just text.
No headings here.
Just paragraphs.`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(0);
    });

    it('ignores headings without space after hash', () => {
      const markdown = `#NotAHeading
# Real Heading`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Real Heading');
    });

    it('handles headings with leading whitespace after hash', () => {
      const markdown = '#   Extra Spaces';
      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Extra Spaces');
    });

    it('handles headings with trailing whitespace', () => {
      const markdown = '# Trailing Whitespace   ';
      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Trailing Whitespace');
    });

    it('handles heading with only special characters', () => {
      const markdown = '# !@#$%^&*()';
      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      // After removing special chars and spaces, ID should be empty
      expect(toc[0].id).toBe('');
    });

    it('preserves original heading text', () => {
      const markdown = '# Complex! Title? With (Special) Characters';
      const toc = generateTableOfContents(markdown);

      expect(toc[0].text).toBe('Complex! Title? With (Special) Characters');
      expect(toc[0].id).toBe('complex-title-with-special-characters');
    });
  });

  describe('inline code in headings', () => {
    it('handles headings with inline code', () => {
      const markdown = '# The `print()` Function';
      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('The `print()` Function');
    });
  });

  describe('realistic scenarios', () => {
    it('handles a typical documentation structure', () => {
      const markdown = `# API Documentation

## Getting Started

### Installation
### Configuration

## API Reference

### Methods
#### get()
#### post()
#### put()
#### delete()

### Types

## FAQ

## Changelog`;

      const toc = generateTableOfContents(markdown);

      // Count: 1 h1, 4 h2, 4 h3, 4 h4 = 13 total
      expect(toc).toHaveLength(13);
      expect(toc.filter(h => h.level === 1)).toHaveLength(1);
      expect(toc.filter(h => h.level === 2)).toHaveLength(4); // Getting Started, API Reference, FAQ, Changelog
      expect(toc.filter(h => h.level === 3)).toHaveLength(4); // Installation, Configuration, Methods, Types
      expect(toc.filter(h => h.level === 4)).toHaveLength(4); // get, post, put, delete
    });

    it('handles markdown with mixed content', () => {
      const markdown = `# Introduction

Welcome to the guide.

## Code Examples

Here's some code:

\`\`\`python
# This is a comment
print("Hello")
\`\`\`

## Conclusion

That's all!`;

      const toc = generateTableOfContents(markdown);

      expect(toc).toHaveLength(3);
      expect(toc.map(h => h.text)).toEqual(['Introduction', 'Code Examples', 'Conclusion']);
    });
  });
});
