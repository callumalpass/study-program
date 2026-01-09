/**
 * Tests for CRLF (Windows line ending) handling in parseFrontmatter
 *
 * These tests verify that markdown files with Windows-style line endings
 * (CRLF: \r\n) are correctly parsed alongside Unix-style endings (LF: \n).
 */

import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from '../src/subjects/loader';

describe('parseFrontmatter CRLF handling', () => {
  describe('CRLF line endings (Windows)', () => {
    it('should correctly parse frontmatter with CRLF line endings', () => {
      const markdown = '---\r\ntitle: Windows\r\n---\r\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Windows');
      expect(result.content).toBe('Content');
    });

    it('should parse multiple frontmatter fields with CRLF', () => {
      const markdown = '---\r\ntitle: Test Title\r\norder: 42\r\nslug: test-slug\r\n---\r\nMarkdown content';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Test Title');
      expect(result.frontmatter.order).toBe(42);
      expect(result.frontmatter.slug).toBe('test-slug');
      expect(result.content).toBe('Markdown content');
    });

    it('should handle CRLF with quoted values', () => {
      const markdown = '---\r\ntitle: "Quoted: Value"\r\n---\r\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Quoted: Value');
    });

    it('should handle CRLF with numeric values', () => {
      const markdown = '---\r\norder: 123\r\ncount: 0\r\n---\r\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.order).toBe(123);
      expect(typeof result.frontmatter.order).toBe('number');
      expect(result.frontmatter.count).toBe(0);
      expect(typeof result.frontmatter.count).toBe('number');
    });

    it('should preserve CRLF in content body after frontmatter', () => {
      const markdown = '---\r\ntitle: Test\r\n---\r\nLine 1\r\nLine 2\r\nLine 3';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Test');
      // Content after frontmatter is normalized to LF
      expect(result.content).toBe('Line 1\nLine 2\nLine 3');
    });
  });

  describe('LF line endings (Unix/Mac)', () => {
    it('should correctly parse frontmatter with LF line endings', () => {
      const markdown = '---\ntitle: Unix\n---\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Unix');
      expect(result.content).toBe('Content');
    });

    it('should parse multiple frontmatter fields with LF', () => {
      const markdown = '---\ntitle: Linux Title\norder: 99\nslug: linux-slug\n---\nUnix content';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Linux Title');
      expect(result.frontmatter.order).toBe(99);
      expect(result.frontmatter.slug).toBe('linux-slug');
      expect(result.content).toBe('Unix content');
    });
  });

  describe('CR only line endings (old Mac)', () => {
    it('should handle standalone CR line endings', () => {
      const markdown = '---\rtitle: OldMac\r---\rContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('OldMac');
      expect(result.content).toBe('Content');
    });
  });

  describe('mixed line endings', () => {
    it('should handle mixed CRLF and LF line endings', () => {
      const markdown = '---\r\ntitle: Mixed\norder: 5\r\n---\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Mixed');
      expect(result.frontmatter.order).toBe(5);
      expect(result.content).toBe('Content');
    });

    it('should handle CRLF in frontmatter with LF in content', () => {
      const markdown = '---\r\ntitle: FrontCRLF\r\n---\nContent with\nLF endings';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('FrontCRLF');
      expect(result.content).toBe('Content with\nLF endings');
    });

    it('should handle LF in frontmatter with CRLF in content', () => {
      const markdown = '---\ntitle: FrontLF\n---\r\nContent with\r\nCRLF endings';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('FrontLF');
      // Content is normalized to LF
      expect(result.content).toBe('Content with\nCRLF endings');
    });
  });

  describe('edge cases', () => {
    it('should return original content when no frontmatter present (CRLF)', () => {
      const markdown = '# No frontmatter\r\n\r\nJust content';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('should handle empty content after frontmatter (CRLF)', () => {
      const markdown = '---\r\ntitle: Empty\r\n---\r\n';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Empty');
      expect(result.content).toBe('');
    });

    it('should handle CRLF with special characters in values', () => {
      const markdown = '---\r\nurl: https://example.com/path\r\nformula: O(n^2)\r\n---\r\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.url).toBe('https://example.com/path');
      expect(result.frontmatter.formula).toBe('O(n^2)');
    });

    it('should handle CRLF with leading zero values (preserved as strings)', () => {
      const markdown = '---\r\nzipcode: 01234\r\ncode: 007\r\n---\r\nContent';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.zipcode).toBe('01234');
      expect(typeof result.frontmatter.zipcode).toBe('string');
      expect(result.frontmatter.code).toBe('007');
      expect(typeof result.frontmatter.code).toBe('string');
    });
  });

  describe('realistic scenarios', () => {
    it('should parse typical markdown file created on Windows', () => {
      const markdown = `---\r
id: cs101-t1-intro\r
title: Introduction to Programming\r
order: 1\r
slug: introduction\r
---\r
# Introduction to Programming\r
\r
Welcome to CS101! In this course, you will learn the fundamentals of programming.\r
\r
## Topics Covered\r
\r
- Variables and data types\r
- Control flow\r
- Functions`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.id).toBe('cs101-t1-intro');
      expect(result.frontmatter.title).toBe('Introduction to Programming');
      expect(result.frontmatter.order).toBe(1);
      expect(result.frontmatter.slug).toBe('introduction');
      expect(result.content).toContain('# Introduction to Programming');
      expect(result.content).toContain('Variables and data types');
    });
  });
});
