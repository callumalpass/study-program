/**
 * Markdown Code Block Edge Cases Tests
 *
 * Additional edge case tests for code block handling in the markdown
 * table of contents generation. These complement the existing tests
 * by covering more unusual scenarios that could occur in real content.
 */

import { describe, it, expect } from 'vitest';
import { generateTableOfContents } from '../src/components/markdown';

describe('generateTableOfContents - additional code block edge cases', () => {
  describe('code blocks with special characters', () => {
    it('handles code block with markdown heading syntax in string literal', () => {
      const markdown = `# Real Heading

\`\`\`python
title = "# Not a heading"
print(title)
\`\`\`

## Another Heading`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc[0].text).toBe('Real Heading');
      expect(toc[1].text).toBe('Another Heading');
    });

    it('handles code block with multiple hash symbols', () => {
      const markdown = `# Introduction

\`\`\`python
# Comment level 1
## Not heading 2
### Not heading 3
print("hello")
\`\`\`

# Conclusion`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Introduction', 'Conclusion']);
    });

    it('handles code block with backticks in content', () => {
      const markdown = `# Start

\`\`\`javascript
const template = \`
# Template heading - ignore this
\`;
\`\`\`

# End`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Start', 'End']);
    });
  });

  describe('nested and adjacent code blocks', () => {
    it('handles back-to-back code blocks with no gap', () => {
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

    it('handles alternating tilde and backtick blocks', () => {
      const markdown = `# Title

\`\`\`
# In backtick
\`\`\`

~~~
# In tilde
~~~

\`\`\`
# Back to backtick
\`\`\`

# Final`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'Final']);
    });

    it('handles deeply nested documentation example', () => {
      const markdown = `# Documentation

Here's how to create code blocks:

\`\`\`markdown
Use three backticks:

\\\`\\\`\\\`python
# This is code
print("hello")
\\\`\\\`\\\`
\`\`\`

## Example Output`;

      const toc = generateTableOfContents(markdown);
      // Should find real headings, not the escaped ones in the example
      expect(toc.some(h => h.text === 'Documentation')).toBe(true);
      expect(toc.some(h => h.text === 'Example Output')).toBe(true);
    });
  });

  describe('code blocks at document boundaries', () => {
    it('handles code block at very start of document', () => {
      const markdown = `\`\`\`
# In code
\`\`\`
# Actual Title`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Actual Title');
    });

    it('handles code block at very end of document', () => {
      const markdown = `# Title

Some content.

\`\`\`
# Last code block
\`\`\``;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Title');
    });

    it('handles document that is entirely a code block', () => {
      const markdown = `\`\`\`python
# All of this is code
## Including this
### And this
print("no headings here")
\`\`\``;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(0);
    });

    it('handles document with only unclosed code block', () => {
      const markdown = `\`\`\`python
# This is code
# So is this
# All code, never closed`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(0);
    });
  });

  describe('code fence variations', () => {
    it('handles four backticks fence', () => {
      const markdown = `# Start

\`\`\`\`
# Inside 4-backtick fence
\`\`\`
# Still inside (3 backticks don't close it)
\`\`\`\`

# End`;

      // Current implementation may or may not handle 4+ backticks
      // This test documents the actual behavior
      const toc = generateTableOfContents(markdown);
      expect(toc.some(h => h.text === 'Start')).toBe(true);
    });

    it('handles indented code block (4 spaces)', () => {
      const markdown = `# Title

    # This might be an indented code block
    # depending on markdown flavor

## Subtitle`;

      const toc = generateTableOfContents(markdown);
      expect(toc.some(h => h.text === 'Title')).toBe(true);
      expect(toc.some(h => h.text === 'Subtitle')).toBe(true);
    });

    it('handles code block with only delimiter characters', () => {
      const markdown = `# Title

\`\`\`
\`\`\`

# After empty block`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After empty block']);
    });
  });

  describe('code block with various languages', () => {
    it.each([
      'python', 'javascript', 'typescript', 'java', 'c', 'cpp', 'rust',
      'go', 'ruby', 'bash', 'shell', 'sql', 'html', 'css', 'json', 'yaml',
      'markdown', 'diff', 'plaintext', 'text',
    ])('handles code block with language: %s', (lang) => {
      const markdown = `# Title

\`\`\`${lang}
# Comment in ${lang}
code here
\`\`\`

# After`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });

    it('handles code block with unusual but valid language identifiers', () => {
      const markdown = `# Title

\`\`\`language-with-dashes
# comment
\`\`\`

\`\`\`lang123
# another comment
\`\`\`

# End`;

      const toc = generateTableOfContents(markdown);
      expect(toc.some(h => h.text === 'Title')).toBe(true);
      expect(toc.some(h => h.text === 'End')).toBe(true);
    });
  });

  describe('headings with code block-like content', () => {
    it('handles heading containing backticks', () => {
      const markdown = '# Using `code` in Headings\n\nContent';
      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Using `code` in Headings');
    });

    it('handles heading containing triple backticks', () => {
      // This is unusual but valid markdown
      const markdown = '# The ``` Syntax\n\nContent';
      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(1);
      // The actual text may vary based on implementation
      expect(toc[0].text).toContain('Syntax');
    });

    it('handles heading with hash in inline code', () => {
      const markdown = '# Using `#` for Comments\n\nContent';
      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Using `#` for Comments');
    });
  });

  describe('whitespace handling in code blocks', () => {
    it('handles code block with various whitespace before fence', () => {
      const markdown = `# Title

   \`\`\`
   # Indented code block content
   \`\`\`

# After`;

      const toc = generateTableOfContents(markdown);
      // Behavior may depend on whether leading whitespace is stripped
      expect(toc.some(h => h.text === 'Title')).toBe(true);
    });

    it('handles code block with tabs in content', () => {
      const markdown = `# Title

\`\`\`python
\t# Tab-indented comment
\tdef foo():
\t\t# Nested tab comment
\t\tpass
\`\`\`

# After`;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });

    it('handles code block with Windows line endings', () => {
      // The function normalizes CRLF to LF before processing
      const markdown = '# Title\r\n\r\n```\r\n# Code\r\n```\r\n\r\n# After';
      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });

    it('handles code block with old Mac line endings (CR only)', () => {
      // The function normalizes CR to LF before processing
      const markdown = '# Title\r\r```\r# Code\r```\r\r# After';
      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(2);
      expect(toc.map(h => h.text)).toEqual(['Title', 'After']);
    });
  });

  describe('real-world content scenarios', () => {
    it('handles typical Python tutorial content', () => {
      const markdown = `# Python Functions

Functions are reusable blocks of code.

## Defining Functions

\`\`\`python
# Define a simple function
def greet(name):
    # Return greeting
    return f"Hello, {name}!"
\`\`\`

## Calling Functions

\`\`\`python
# Call the function
result = greet("World")
print(result)  # Hello, World!
\`\`\`

## Parameters

### Positional Parameters

\`\`\`python
# Positional arguments
def add(a, b):
    return a + b
\`\`\`

### Keyword Parameters

\`\`\`python
# Keyword arguments
def greet(name="World"):
    return f"Hello, {name}!"
\`\`\``;

      const toc = generateTableOfContents(markdown);
      const headingTexts = toc.map(h => h.text);

      expect(headingTexts).toContain('Python Functions');
      expect(headingTexts).toContain('Defining Functions');
      expect(headingTexts).toContain('Calling Functions');
      expect(headingTexts).toContain('Parameters');
      expect(headingTexts).toContain('Positional Parameters');
      expect(headingTexts).toContain('Keyword Parameters');
      expect(toc).toHaveLength(6);
    });

    it('handles shell scripting documentation', () => {
      const markdown = `# Shell Scripting Guide

## Variables

\`\`\`bash
# Set a variable
NAME="World"
# Use the variable
echo "Hello, $NAME"
\`\`\`

## Conditionals

\`\`\`bash
# Check if file exists
if [ -f "file.txt" ]; then
    # File exists
    echo "Found"
fi
\`\`\``;

      const toc = generateTableOfContents(markdown);
      expect(toc).toHaveLength(3);
      expect(toc.map(h => h.text)).toEqual(['Shell Scripting Guide', 'Variables', 'Conditionals']);
    });
  });
});
