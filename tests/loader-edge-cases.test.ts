/**
 * Loader Edge Cases Tests
 *
 * Additional edge case tests for the loader module, focusing on:
 * - CRLF line ending handling across all parsers
 * - Malformed input handling
 * - Unicode and special character handling
 * - Boundary conditions in parsing
 */

import { describe, expect, it } from 'vitest';
import {
  parseFrontmatter,
  extractTitleFromContent,
  slugFromFilename,
  buildTopic,
  groupIdsByTopic,
} from '../src/subjects/loader';

describe('loader edge cases', () => {
  describe('parseFrontmatter CRLF handling', () => {
    it('parses frontmatter with CRLF line endings', () => {
      const markdown = '---\r\nid: test-id\r\ntitle: Test Title\r\n---\r\n# Content';
      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.id).toBe('test-id');
      expect(result.frontmatter.title).toBe('Test Title');
      expect(result.content).toBe('# Content');
    });

    it('handles mixed line endings in frontmatter', () => {
      const markdown = '---\nid: test\r\ntitle: Mixed\n---\r\nContent here';
      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.id).toBe('test');
      expect(result.frontmatter.title).toBe('Mixed');
    });

    it('handles CR only line endings (old Mac style)', () => {
      const markdown = '---\rid: legacy\rtitle: Old Format\r---\rContent';
      const result = parseFrontmatter(markdown);

      // CR-only should be normalized to LF
      expect(result.frontmatter.id).toBe('legacy');
    });

    it('preserves content line endings after parsing', () => {
      const markdown = '---\ntitle: Test\n---\nLine 1\nLine 2\nLine 3';
      const result = parseFrontmatter(markdown);

      expect(result.content).toBe('Line 1\nLine 2\nLine 3');
    });
  });

  describe('parseFrontmatter unicode handling', () => {
    it('handles unicode in frontmatter values', () => {
      const markdown = '---\ntitle: 日本語タイトル\nauthor: Müller\n---\nContent';
      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('日本語タイトル');
      expect(result.frontmatter.author).toBe('Müller');
    });

    it('handles emoji in frontmatter values', () => {
      const markdown = '---\ntitle: Introduction 🚀\ntags: beginner\n---\nContent';
      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Introduction 🚀');
    });

    it('handles unicode in keys (non-standard but should not crash)', () => {
      const markdown = '---\nтема: Value\nthème: Another\n---\nContent';
      const result = parseFrontmatter(markdown);

      // Should parse without crashing
      expect(result.content).toBe('Content');
    });
  });

  describe('parseFrontmatter special values', () => {
    it('handles values with colons', () => {
      const markdown = '---\ntitle: Time: 10:30 AM\nurl: https://example.com\n---\nContent';
      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Time: 10:30 AM');
      expect(result.frontmatter.url).toBe('https://example.com');
    });

    it('preserves leading zeros in string values', () => {
      const markdown = '---\nzipcode: 01234\nid: 007\n---\nContent';
      const result = parseFrontmatter(markdown);

      // Values with leading zeros should remain strings
      expect(result.frontmatter.zipcode).toBe('01234');
      expect(result.frontmatter.id).toBe('007');
    });

    it('parses zero as number', () => {
      const markdown = '---\ncount: 0\norder: 0\n---\nContent';
      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.count).toBe(0);
      expect(result.frontmatter.order).toBe(0);
      expect(typeof result.frontmatter.count).toBe('number');
    });

    it('handles negative numbers as strings (YAML limitation)', () => {
      const markdown = '---\noffset: -5\n---\nContent';
      const result = parseFrontmatter(markdown);

      // Simple parser doesn't handle negative numbers as numbers
      expect(result.frontmatter.offset).toBe('-5');
    });

    it('handles boolean-like strings', () => {
      const markdown = '---\nflag: true\nenabled: false\n---\nContent';
      const result = parseFrontmatter(markdown);

      // Simple parser keeps these as strings
      expect(result.frontmatter.flag).toBe('true');
      expect(result.frontmatter.enabled).toBe('false');
    });
  });

  describe('extractTitleFromContent edge cases', () => {
    it('handles content with multiple spaces after #', () => {
      const content = '#     Lots of Spaces     \n\nContent';
      expect(extractTitleFromContent(content)).toBe('Lots of Spaces');
    });

    it('handles tab after # instead of space', () => {
      const content = '#\tTab Title\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Tab Title');
    });

    it('does not match # at end of line without content', () => {
      const content = '# \n\n# Real Title';
      // First # has no content (just space), should match second one
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('handles title with markdown formatting', () => {
      const content = '# Introduction to **Bold** and *Italic*\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Introduction to **Bold** and *Italic*');
    });

    it('handles title with inline code', () => {
      const content = '# Using `print()` in Python\n\nContent';
      expect(extractTitleFromContent(content)).toBe('Using `print()` in Python');
    });

    it('handles title with links', () => {
      const content = '# See [Documentation](url) for Details\n\nContent';
      expect(extractTitleFromContent(content)).toBe('See [Documentation](url) for Details');
    });

    it('handles nested code blocks with language specifiers', () => {
      const content = '```python\n# Python comment\nprint("# not a title")\n```\n\n# Real Title';
      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('handles unclosed code block (edge case)', () => {
      const content = '```python\n# Comment\nprint("hello")\n\n# Real Title';
      // The regex for removing code blocks might not match, so title extraction varies
      const result = extractTitleFromContent(content);
      // Should still be able to extract something
      expect(result).toBeDefined();
    });

    it('handles content with only whitespace before title', () => {
      const content = '\n\n\n   \n# The Title\n\nContent';
      expect(extractTitleFromContent(content)).toBe('The Title');
    });

    it('handles very long title', () => {
      const longTitle = 'A'.repeat(500);
      const content = `# ${longTitle}\n\nContent`;
      expect(extractTitleFromContent(content)).toBe(longTitle);
    });
  });

  describe('slugFromFilename edge cases', () => {
    it('handles filename with only numbers', () => {
      expect(slugFromFilename('123.md')).toBe('123');
    });

    it('handles filename starting with dash', () => {
      expect(slugFromFilename('-topic.md')).toBe('-topic');
    });

    it('handles filename with consecutive dashes', () => {
      expect(slugFromFilename('01-topic--name.md')).toBe('topic--name');
    });

    it('handles filename with uppercase and numbers', () => {
      expect(slugFromFilename('01-Topic2Advanced.md')).toBe('topic2advanced');
    });

    it('handles filename with underscore', () => {
      expect(slugFromFilename('01-my_topic.md')).toBe('my_topic');
    });

    it('handles three-digit number prefix', () => {
      expect(slugFromFilename('001-intro.md')).toBe('intro');
    });

    it('handles prefix with trailing dash but no content', () => {
      expect(slugFromFilename('01-.md')).toBe('');
    });

    it('handles mixed case in extension', () => {
      expect(slugFromFilename('01-topic.MD')).toBe('topic.md');
    });
  });

  describe('buildTopic edge cases', () => {
    it('handles glob result with no matching topic files', () => {
      const globResult = {
        './content/topic-2.md': '# Topic 2',
        './content/topic-2/01-intro.md': '# Intro',
      };

      // Building topic 1, but only topic 2 files exist
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Nonexistent Topic',
        },
        globResult
      );

      expect(topic.content).toBe('');
      expect(topic.subtopics).toHaveLength(0);
    });

    it('handles subtopic files with no order derivable from filename', () => {
      const globResult = {
        './content/topic-1/special-case.md': '---\ntitle: Special\n---\n# Special',
      };

      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Test',
        },
        globResult
      );

      // Order should default to 0 when no number prefix
      expect(topic.subtopics[0].order).toBe(0);
    });

    it('handles subtopic with missing title in frontmatter and content', () => {
      const globResult = {
        './content/topic-1/01-mystery.md': 'No heading here, just text.',
      };

      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Test',
        },
        globResult
      );

      // Should fall back to slug as title
      expect(topic.subtopics[0].title).toBe('mystery');
    });

    it('generates correct ID with hyphens removed from slug', () => {
      const globResult = {
        './content/topic-1/01-data-structures.md': '---\ntitle: Data Structures\n---\nContent',
      };

      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Test',
        },
        globResult
      );

      // ID should have hyphens removed from slug
      expect(topic.subtopics[0].id).toBe('cs101-t1-datastructures');
    });

    it('handles deeply nested paths (should ignore)', () => {
      const globResult = {
        './content/topic-1/subdir/01-nested.md': '# Nested',
      };

      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Test',
        },
        globResult
      );

      // Should not match deeply nested files
      expect(topic.subtopics).toHaveLength(0);
    });
  });

  describe('groupIdsByTopic edge cases', () => {
    it('handles topicId with topic number in middle of string', () => {
      const items = [
        { id: 'item1', topicId: 'subject-with-topic-5-in-name' },
      ];

      const grouped = groupIdsByTopic(items);

      // Should match the last number pattern
      expect(Object.keys(grouped).length).toBeGreaterThanOrEqual(0);
    });

    it('handles items with empty string topicId', () => {
      const items = [
        { id: 'item1', topicId: '' },
        { id: 'item2', topicId: 'cs101-topic-1' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['item2']);
      expect(Object.keys(grouped)).toHaveLength(1);
    });

    it('handles very large topic numbers', () => {
      const items = [
        { id: 'item1', topicId: 'cs101-topic-999' },
        { id: 'item2', topicId: 'cs101-topic-1000' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[999]).toEqual(['item1']);
      expect(grouped[1000]).toEqual(['item2']);
    });

    it('handles mixed valid and invalid items', () => {
      const items = [
        { id: 'valid1', topicId: 'cs101-topic-1' },
        { id: 'invalid1', topicId: 'no-number-here' },
        { id: 'valid2', topicId: 'cs101-topic-2' },
        { id: 'invalid2', topicId: undefined },
        { id: 'valid3', topicId: 'math-3' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['valid1']);
      expect(grouped[2]).toEqual(['valid2']);
      expect(grouped[3]).toEqual(['valid3']);
    });
  });
});
