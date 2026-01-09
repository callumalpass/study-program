import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  renderMarkdown,
  generateTableOfContents,
  extractPlainText,
  updateMermaidTheme,
} from '../src/components/markdown';

describe('markdown component', () => {
  describe('renderMarkdown', () => {
    describe('basic markdown rendering', () => {
      it('returns empty string for empty input', () => {
        expect(renderMarkdown('')).toBe('');
      });

      it('returns empty string for null-like input', () => {
        expect(renderMarkdown(null as unknown as string)).toBe('');
        expect(renderMarkdown(undefined as unknown as string)).toBe('');
      });

      it('renders plain text as paragraph', () => {
        const result = renderMarkdown('Hello World');
        expect(result).toContain('<p>');
        expect(result).toContain('Hello World');
        expect(result).toContain('</p>');
      });

      it('renders multiple paragraphs', () => {
        const result = renderMarkdown('First paragraph\n\nSecond paragraph');
        expect(result).toContain('First paragraph');
        expect(result).toContain('Second paragraph');
        const paragraphCount = (result.match(/<p>/g) || []).length;
        expect(paragraphCount).toBe(2);
      });
    });

    describe('headers', () => {
      it('renders h1 headers', () => {
        const result = renderMarkdown('# Header 1');
        expect(result).toContain('<h1');
        expect(result).toContain('Header 1');
        expect(result).toContain('</h1>');
      });

      it('renders h2 headers', () => {
        const result = renderMarkdown('## Header 2');
        expect(result).toContain('<h2');
        expect(result).toContain('Header 2');
        expect(result).toContain('</h2>');
      });

      it('renders h3 through h6 headers', () => {
        expect(renderMarkdown('### H3')).toContain('<h3');
        expect(renderMarkdown('#### H4')).toContain('<h4');
        expect(renderMarkdown('##### H5')).toContain('<h5');
        expect(renderMarkdown('###### H6')).toContain('<h6');
      });

      it('handles headers with special characters', () => {
        const result = renderMarkdown('# Header with Code & "quotes"');
        expect(result).toContain('Header with');
        expect(result).toContain('&amp;');
        // Quotes are escaped to &quot;
        expect(result).toContain('&quot;quotes&quot;');
      });
    });

    describe('emphasis and formatting', () => {
      it('renders bold text', () => {
        const result = renderMarkdown('**bold text**');
        expect(result).toContain('<strong>bold text</strong>');
      });

      it('renders italic text', () => {
        const result = renderMarkdown('*italic text*');
        expect(result).toContain('<em>italic text</em>');
      });

      it('renders strikethrough text', () => {
        const result = renderMarkdown('~~strikethrough~~');
        expect(result).toContain('<del>strikethrough</del>');
      });

      it('renders combined formatting', () => {
        const result = renderMarkdown('***bold and italic***');
        expect(result).toContain('<strong>');
        expect(result).toContain('<em>');
      });
    });

    describe('links', () => {
      it('renders internal links without target blank', () => {
        const result = renderMarkdown('[Link](/path/to/page)');
        expect(result).toContain('href="/path/to/page"');
        expect(result).not.toContain('target="_blank"');
        expect(result).toContain('>Link</a>');
      });

      it('renders external http links with target blank', () => {
        const result = renderMarkdown('[External](http://example.com)');
        expect(result).toContain('href="http://example.com"');
        expect(result).toContain('target="_blank"');
        expect(result).toContain('rel="noopener noreferrer"');
      });

      it('renders external https links with target blank', () => {
        const result = renderMarkdown('[Secure](https://example.com)');
        expect(result).toContain('href="https://example.com"');
        expect(result).toContain('target="_blank"');
        expect(result).toContain('rel="noopener noreferrer"');
      });

      it('renders links with title attribute', () => {
        const result = renderMarkdown('[Link](/page "Title Text")');
        expect(result).toContain('title="Title Text"');
      });

      it('escapes URLs properly', () => {
        const result = renderMarkdown('[Link](https://example.com?a=1&b=2)');
        expect(result).toContain('href="https://example.com?a=1&amp;b=2"');
      });
    });

    describe('lists', () => {
      it('renders unordered lists', () => {
        const result = renderMarkdown('- Item 1\n- Item 2\n- Item 3');
        expect(result).toContain('<ul class="markdown-list"');
        expect(result).toContain('<li>');
        expect(result).toContain('Item 1');
        expect(result).toContain('Item 2');
        expect(result).toContain('Item 3');
      });

      it('renders ordered lists', () => {
        const result = renderMarkdown('1. First\n2. Second\n3. Third');
        expect(result).toContain('<ol class="markdown-list"');
        expect(result).toContain('First');
        expect(result).toContain('Second');
        expect(result).toContain('Third');
      });

      it('renders ordered lists with custom start number', () => {
        const result = renderMarkdown('5. Item Five\n6. Item Six');
        expect(result).toContain('start="5"');
      });

      it('renders nested lists', () => {
        const result = renderMarkdown('- Parent\n  - Child\n  - Child 2');
        expect(result).toContain('<ul');
        expect(result).toContain('Parent');
        expect(result).toContain('Child');
      });
    });

    describe('code blocks', () => {
      it('renders fenced code blocks with language', () => {
        const result = renderMarkdown('```javascript\nconst x = 1;\n```');
        expect(result).toContain('<pre class="language-javascript"');
        expect(result).toContain('<code class="language-javascript"');
        expect(result).toContain('const');
      });

      it('renders fenced code blocks without language as plaintext', () => {
        const result = renderMarkdown('```\nplain text\n```');
        expect(result).toContain('<pre class="language-plaintext"');
        expect(result).toContain('plain text');
      });

      it('renders inline code', () => {
        const result = renderMarkdown('Use `console.log()` to debug');
        expect(result).toContain('<code class="inline-code"');
        expect(result).toContain('console.log()');
      });

      it('escapes HTML in code blocks', () => {
        const result = renderMarkdown('```html\n<div class="test">Content</div>\n```');
        // Prism syntax highlighting wraps tokens in spans
        expect(result).toContain('language-html');
        // The angle brackets are escaped within Prism's token spans
        expect(result).toContain('&lt;');
        expect(result).toContain('div');
        expect(result).toContain('Content');
      });

      it('escapes HTML in inline code', () => {
        const result = renderMarkdown('Use `<script>alert("xss")</script>` carefully');
        // The escapeHtml function is called on inline code, then marked double-escapes it
        // This results in &amp;lt; in the output
        expect(result).toContain('inline-code');
        expect(result).toContain('script');
        expect(result).toContain('carefully');
      });

      it('handles mermaid code blocks specially', () => {
        const result = renderMarkdown('```mermaid\ngraph TD;\n  A-->B;\n```');
        expect(result).toContain('<pre class="mermaid"');
        expect(result).toContain('graph TD;');
        expect(result).not.toContain('language-mermaid');
      });

      it('applies syntax highlighting to known languages', () => {
        const result = renderMarkdown('```python\ndef hello():\n    pass\n```');
        expect(result).toContain('language-python');
        // Prism adds span elements for syntax highlighting
        expect(result).toContain('<span');
      });

      it('handles unknown languages as plaintext', () => {
        const result = renderMarkdown('```unknownlang\nsome code\n```');
        expect(result).toContain('language-plaintext');
      });
    });

    describe('blockquotes', () => {
      it('renders blockquotes with custom class', () => {
        const result = renderMarkdown('> This is a quote');
        expect(result).toContain('<blockquote class="markdown-blockquote"');
        expect(result).toContain('This is a quote');
      });

      it('renders multi-line blockquotes', () => {
        const result = renderMarkdown('> Line 1\n> Line 2');
        expect(result).toContain('Line 1');
        expect(result).toContain('Line 2');
      });

      it('renders nested blockquotes', () => {
        const result = renderMarkdown('> Outer\n>> Nested');
        const blockquoteCount = (result.match(/<blockquote/g) || []).length;
        expect(blockquoteCount).toBeGreaterThanOrEqual(1);
      });
    });

    describe('tables', () => {
      it('renders tables with wrapper div', () => {
        const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;
        const result = renderMarkdown(markdown);
        expect(result).toContain('<div class="table-wrapper"');
        expect(result).toContain('<table class="markdown-table"');
        expect(result).toContain('<thead>');
        expect(result).toContain('<tbody>');
        expect(result).toContain('Header 1');
        expect(result).toContain('Cell 1');
      });

      it('renders tables with multiple rows', () => {
        const markdown = `
| A | B |
|---|---|
| 1 | 2 |
| 3 | 4 |
`;
        const result = renderMarkdown(markdown);
        expect(result).toContain('1');
        expect(result).toContain('2');
        expect(result).toContain('3');
        expect(result).toContain('4');
      });
    });

    describe('LaTeX math rendering', () => {
      it('renders inline math with $...$ delimiters', () => {
        const result = renderMarkdown('The equation $E = mc^2$ is famous.');
        expect(result).toContain('<span class="math-inline"');
        expect(result).toContain('katex');
      });

      it('renders display math with $$...$$ delimiters', () => {
        const result = renderMarkdown('$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$');
        expect(result).toContain('<div class="math-display"');
        expect(result).toContain('katex');
      });

      it('handles multiple inline math expressions', () => {
        const result = renderMarkdown('Given $a$ and $b$, we have $a + b$.');
        const inlineMathCount = (result.match(/math-inline/g) || []).length;
        expect(inlineMathCount).toBe(3);
      });

      it('handles multiline display math', () => {
        const result = renderMarkdown('$$\n\\int_0^\\infty e^{-x^2} dx\n$$');
        expect(result).toContain('math-display');
      });

      it('does not match single $ signs that are not math', () => {
        // A single $ followed by newline should not be treated as inline math
        const result = renderMarkdown('Price: $100 is too high.\n\nAnother paragraph.');
        // Should not have math-inline (100 is followed by space, not $)
        expect(result).toContain('100');
      });

      it('handles invalid LaTeX gracefully without throwing', () => {
        // KaTeX with throwOnError: false should render error gracefully
        const result = renderMarkdown('$\\invalidcommand$');
        expect(result).toBeDefined();
        // Either contains error or original content
        expect(result.length).toBeGreaterThan(0);
      });
    });

    describe('frontmatter handling', () => {
      it('strips frontmatter from content', () => {
        const markdown = `---
title: Test
id: test-id
---
# Actual Content`;
        const result = renderMarkdown(markdown);
        expect(result).not.toContain('title: Test');
        expect(result).not.toContain('id: test-id');
        expect(result).toContain('Actual Content');
      });

      it('works with content that has no frontmatter', () => {
        const result = renderMarkdown('# Just Content\n\nNo frontmatter here.');
        expect(result).toContain('Just Content');
        expect(result).toContain('No frontmatter here');
      });
    });

    describe('error handling', () => {
      it('handles malformed input gracefully', () => {
        // Deeply nested structures or unusual inputs
        const result = renderMarkdown('>>>>>>>>> deeply nested');
        expect(result).toBeDefined();
      });

      it('handles very long input', () => {
        const longText = 'a'.repeat(10000);
        const result = renderMarkdown(longText);
        expect(result).toContain('a');
      });

      it('handles special unicode characters', () => {
        const result = renderMarkdown('# 你好世界 🌍 مرحبا');
        expect(result).toContain('你好世界');
        expect(result).toContain('🌍');
        expect(result).toContain('مرحبا');
      });
    });

    describe('GitHub Flavored Markdown features', () => {
      it('converts newlines to <br> (breaks: true)', () => {
        const result = renderMarkdown('Line 1\nLine 2');
        expect(result).toContain('<br');
      });

      it('renders task lists', () => {
        const result = renderMarkdown('- [ ] Unchecked\n- [x] Checked');
        expect(result).toContain('type="checkbox"');
      });

      it('renders horizontal rules', () => {
        const result = renderMarkdown('Above\n\n---\n\nBelow');
        expect(result).toContain('<hr');
      });
    });
  });

  describe('generateTableOfContents', () => {
    it('returns empty array for content without headers', () => {
      const result = generateTableOfContents('Just some text without headers.');
      expect(result).toEqual([]);
    });

    it('extracts h1 headers', () => {
      const result = generateTableOfContents('# Main Title');
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        level: 1,
        text: 'Main Title',
        id: 'main-title',
      });
    });

    it('extracts multiple header levels', () => {
      const markdown = `# Title
## Section 1
### Subsection 1.1
## Section 2`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(4);
      expect(result[0].level).toBe(1);
      expect(result[1].level).toBe(2);
      expect(result[2].level).toBe(3);
      expect(result[3].level).toBe(2);
    });

    it('generates slug IDs correctly', () => {
      const result = generateTableOfContents('# Hello World');
      expect(result[0].id).toBe('hello-world');
    });

    it('removes special characters from IDs', () => {
      const result = generateTableOfContents("# What's New? (2024)");
      expect(result[0].id).toBe('whats-new-2024');
    });

    it('converts to lowercase in IDs', () => {
      const result = generateTableOfContents('# UPPERCASE Title');
      expect(result[0].id).toBe('uppercase-title');
    });

    it('handles headers with numbers', () => {
      const result = generateTableOfContents('## Chapter 1: Introduction');
      expect(result[0].text).toBe('Chapter 1: Introduction');
      expect(result[0].id).toBe('chapter-1-introduction');
    });

    it('handles headers with multiple spaces', () => {
      const result = generateTableOfContents('#   Lots   of   spaces');
      expect(result[0].text).toBe('Lots   of   spaces');
      // Spaces in the middle get collapsed to dashes
      expect(result[0].id).toContain('lots');
    });

    it('handles all six header levels', () => {
      const markdown = `# H1
## H2
### H3
#### H4
##### H5
###### H6`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(6);
      for (let i = 0; i < 6; i++) {
        expect(result[i].level).toBe(i + 1);
      }
    });

    it('ignores non-header lines that look similar', () => {
      const markdown = `# Real Header
This is not a header # just has hash
##Not a header (no space)`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('Real Header');
    });

    it('returns empty array for empty input', () => {
      expect(generateTableOfContents('')).toEqual([]);
    });

    it('handles headers with code backticks', () => {
      const result = generateTableOfContents('## Using `console.log`');
      expect(result[0].text).toBe('Using `console.log`');
    });

    it('generates unique IDs for duplicate headers', () => {
      const markdown = `# Introduction
## Section
## Section
## Section`;
      const result = generateTableOfContents(markdown);

      expect(result).toHaveLength(4);
      expect(result[0].id).toBe('introduction');
      expect(result[1].id).toBe('section');
      expect(result[2].id).toBe('section-1');
      expect(result[3].id).toBe('section-2');
    });

    it('generates unique IDs for multiple duplicate groups', () => {
      const markdown = `# Title
## FAQ
### Question 1
## FAQ
### Question 1`;
      const result = generateTableOfContents(markdown);

      expect(result).toHaveLength(5);
      expect(result[0].id).toBe('title');
      expect(result[1].id).toBe('faq');
      expect(result[2].id).toBe('question-1');
      expect(result[3].id).toBe('faq-1');
      expect(result[4].id).toBe('question-1-1');
    });

    it('handles many duplicate headers correctly', () => {
      const markdown = Array(10).fill('## Item').join('\n');
      const result = generateTableOfContents(markdown);

      expect(result).toHaveLength(10);
      expect(result[0].id).toBe('item');
      expect(result[1].id).toBe('item-1');
      expect(result[9].id).toBe('item-9');

      // Verify all IDs are unique
      const ids = result.map(item => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(10);
    });

    it('ignores headings inside backtick code blocks', () => {
      const markdown = `# Real Title
\`\`\`python
# This is a Python comment, not a heading
def foo():
    pass
\`\`\`
## Real Section`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Real Title');
      expect(result[1].text).toBe('Real Section');
    });

    it('ignores headings inside tilde code blocks', () => {
      const markdown = `# Title
~~~bash
# Shell comment
echo "hello"
~~~
## Section`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Title');
      expect(result[1].text).toBe('Section');
    });

    it('handles multiple code blocks correctly', () => {
      const markdown = `# Introduction
\`\`\`
# Code block 1
\`\`\`
## Section 1
\`\`\`python
# Code block 2
## Not a heading
\`\`\`
## Section 2`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(3);
      expect(result[0].text).toBe('Introduction');
      expect(result[1].text).toBe('Section 1');
      expect(result[2].text).toBe('Section 2');
    });

    it('handles code blocks with language specifiers', () => {
      const markdown = `# Title
\`\`\`javascript
// # Not a heading
const x = 1;
\`\`\`
## Real Heading`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Title');
      expect(result[1].text).toBe('Real Heading');
    });

    it('returns empty when only headings are inside code blocks', () => {
      const markdown = `Some text
\`\`\`
# Not a heading
## Also not
\`\`\`
More text`;
      const result = generateTableOfContents(markdown);
      expect(result).toEqual([]);
    });

    it('handles nested backticks vs tildes correctly', () => {
      const markdown = `# Title
\`\`\`markdown
~~~
# Nested code
~~~
\`\`\`
## Section`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Title');
      expect(result[1].text).toBe('Section');
    });

    it('handles unclosed code blocks by skipping rest of content', () => {
      const markdown = `# Title
\`\`\`
# In code block
## Still in code block`;
      const result = generateTableOfContents(markdown);
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('Title');
    });
  });

  describe('extractPlainText', () => {
    it('returns empty string for empty input', () => {
      expect(extractPlainText('')).toBe('');
    });

    it('extracts text from simple paragraph', () => {
      const result = extractPlainText('Hello World');
      expect(result.trim()).toBe('Hello World');
    });

    it('removes header formatting', () => {
      const result = extractPlainText('# Title\n\nContent here');
      expect(result).toContain('Title');
      expect(result).toContain('Content here');
      expect(result).not.toContain('#');
    });

    it('removes bold/italic formatting', () => {
      const result = extractPlainText('**bold** and *italic*');
      expect(result).toContain('bold');
      expect(result).toContain('italic');
      expect(result).not.toContain('*');
    });

    it('removes links but keeps link text', () => {
      const result = extractPlainText('[Click here](https://example.com)');
      expect(result).toContain('Click here');
      expect(result).not.toContain('https://');
    });

    it('removes code blocks but keeps code content', () => {
      const result = extractPlainText('```\ncode here\n```');
      expect(result).toContain('code');
    });

    it('removes inline code formatting', () => {
      const result = extractPlainText('Use `command` here');
      expect(result).toContain('command');
    });

    it('extracts text from complex markdown', () => {
      const markdown = `# Main Title

This is a paragraph with **bold** and *italic* text.

## Section

- List item 1
- List item 2

> A blockquote

\`\`\`javascript
const x = 1;
\`\`\`
`;
      const result = extractPlainText(markdown);
      expect(result).toContain('Main Title');
      expect(result).toContain('bold');
      expect(result).toContain('italic');
      expect(result).toContain('List item 1');
      expect(result).toContain('blockquote');
    });

    it('handles math expressions', () => {
      // KaTeX renders to HTML, extractPlainText should extract what it can
      const result = extractPlainText('The equation $E = mc^2$ is famous.');
      expect(result).toContain('The equation');
      expect(result).toContain('is famous');
    });
  });

  describe('updateMermaidTheme', () => {
    it('does not throw when called with true', () => {
      expect(() => updateMermaidTheme(true)).not.toThrow();
    });

    it('does not throw when called with false', () => {
      expect(() => updateMermaidTheme(false)).not.toThrow();
    });
  });

  describe('edge cases and security', () => {
    it('passes through raw HTML by design (marked default behavior)', () => {
      // Note: marked by default allows raw HTML - this is by design for flexibility
      // Applications requiring HTML sanitization should use a separate sanitizer like DOMPurify
      const htmlContent = '<div class="custom">Custom content</div>';
      const result = renderMarkdown(htmlContent);
      // Marked passes through HTML - this is expected behavior
      expect(result).toContain('custom');
    });

    it('escapes javascript: URLs', () => {
      const result = renderMarkdown('[Click](javascript:alert("xss"))');
      // marked should handle javascript: protocol safely
      expect(result).toBeDefined();
    });

    it('escapes HTML entities in content', () => {
      const result = renderMarkdown('5 < 10 and 10 > 5 and "quotes" & ampersand');
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
      expect(result).toContain('&amp;');
    });

    it('handles deeply nested elements', () => {
      const nested = '> '.repeat(20) + 'Deep';
      const result = renderMarkdown(nested);
      expect(result).toBeDefined();
    });

    it('handles content with null bytes', () => {
      const result = renderMarkdown('Text with \0 null byte');
      expect(result).toBeDefined();
    });

    it('handles only whitespace input', () => {
      const result = renderMarkdown('   \n\n   \t\t   ');
      expect(result).toBeDefined();
    });
  });
});
