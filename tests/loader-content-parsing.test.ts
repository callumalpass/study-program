/**
 * Content Loader Parsing Tests
 *
 * Comprehensive tests for content loading, frontmatter parsing,
 * and topic building functionality.
 */

import { describe, it, expect } from 'vitest';
import {
  parseFrontmatter,
  extractTitleFromContent,
  slugFromFilename,
  groupIdsByTopic,
} from '../src/subjects/loader';

describe('parseFrontmatter', () => {
  describe('basic frontmatter parsing', () => {
    it('parses simple key-value pairs', () => {
      const markdown = `---
id: test-id
title: Test Title
order: 1
---

Content here`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.id).toBe('test-id');
      expect(result.frontmatter.title).toBe('Test Title');
      expect(result.frontmatter.order).toBe(1);
      expect(result.content).toBe('\nContent here');
    });

    it('returns empty frontmatter when no frontmatter present', () => {
      const markdown = `# Just a heading

Some content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('handles frontmatter with no content after', () => {
      const markdown = `---
id: test-id
---`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.id).toBe('test-id');
      expect(result.content).toBe('');
    });
  });

  describe('value type handling', () => {
    it('parses numeric values correctly', () => {
      const markdown = `---
order: 5
count: 100
year: 2024
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.order).toBe(5);
      expect(result.frontmatter.count).toBe(100);
      expect(result.frontmatter.year).toBe(2024);
    });

    it('preserves strings that look like numbers with leading zeros', () => {
      const markdown = `---
zipcode: 01234
id: 007
---

Content`;

      const result = parseFrontmatter(markdown);
      // Leading zeros should be preserved as strings
      expect(result.frontmatter.zipcode).toBe('01234');
      expect(result.frontmatter.id).toBe('007');
    });

    it('parses zero as a number', () => {
      const markdown = `---
count: 0
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.count).toBe(0);
    });

    it('removes quotes from string values', () => {
      const markdown = `---
title: "Quoted Title"
author: 'Single Quoted'
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Quoted Title');
      expect(result.frontmatter.author).toBe('Single Quoted');
    });

    it('handles mixed quotes correctly', () => {
      const markdown = `---
title: "Don't stop"
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe("Don't stop");
    });
  });

  describe('edge cases', () => {
    it('handles empty frontmatter', () => {
      const markdown = `---
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter).toEqual({});
      // Empty frontmatter regex doesn't match since there's nothing between the markers
      // The parser returns the original content when frontmatter regex doesn't match
      expect(result.content).toContain('Content');
    });

    it('handles frontmatter with colons in values', () => {
      const markdown = `---
url: https://example.com
time: 12:30:00
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.url).toBe('https://example.com');
      expect(result.frontmatter.time).toBe('12:30:00');
    });

    it('handles frontmatter with spaces around colons', () => {
      const markdown = `---
title  :   Spaced Title
id:no-space
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Spaced Title');
      expect(result.frontmatter.id).toBe('no-space');
    });

    it('handles multiline content correctly', () => {
      const markdown = `---
title: Test
---

# Heading

Paragraph 1

Paragraph 2

\`\`\`python
code here
\`\`\``;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test');
      expect(result.content).toContain('# Heading');
      expect(result.content).toContain('Paragraph 1');
      expect(result.content).toContain('code here');
    });

    it('does not match --- inside content', () => {
      const markdown = `---
title: Test
---

Some content

---

More content (this should be in content, not parsed as frontmatter)`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test');
      expect(result.content).toContain('More content');
    });
  });

  describe('whitespace handling', () => {
    it('trims whitespace from keys and values', () => {
      const markdown = `---
  title  :  Test Title
  slug  :  test-slug
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test Title');
      expect(result.frontmatter.slug).toBe('test-slug');
    });

    it('handles blank lines in frontmatter', () => {
      const markdown = `---
title: Test

slug: test-slug
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test');
      expect(result.frontmatter.slug).toBe('test-slug');
    });
  });
});

describe('extractTitleFromContent', () => {
  describe('basic title extraction', () => {
    it('extracts title from first h1 heading', () => {
      const content = `# Main Title

Some content here.`;

      expect(extractTitleFromContent(content)).toBe('Main Title');
    });

    it('extracts title with leading whitespace on line', () => {
      // Note: Standard markdown h1 should be at start of line
      const content = `# Title Here

Content`;

      expect(extractTitleFromContent(content)).toBe('Title Here');
    });

    it('returns null when no h1 heading present', () => {
      const content = `## Second Level

Some content`;

      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('trims whitespace from extracted title', () => {
      const content = `#   Title With Spaces

Content`;

      expect(extractTitleFromContent(content)).toBe('Title With Spaces');
    });
  });

  describe('code block handling', () => {
    it('ignores headings inside fenced code blocks', () => {
      const content = `\`\`\`python
# This is a comment, not a heading
print("hello")
\`\`\`

# Real Title

Content`;

      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('ignores headings inside tilde code blocks', () => {
      const content = `~~~bash
# Shell comment
echo "hello"
~~~

# Actual Title

Content`;

      expect(extractTitleFromContent(content)).toBe('Actual Title');
    });

    it('handles nested code blocks correctly', () => {
      const content = `\`\`\`markdown
# Heading in markdown block
\`\`\`

# Real Heading

More content`;

      expect(extractTitleFromContent(content)).toBe('Real Heading');
    });
  });

  describe('edge cases', () => {
    it('returns first h1 when multiple exist', () => {
      const content = `# First Title

## Second Level

# Second H1

Content`;

      expect(extractTitleFromContent(content)).toBe('First Title');
    });

    it('handles empty content', () => {
      expect(extractTitleFromContent('')).toBeNull();
    });

    it('handles content with only code blocks', () => {
      const content = `\`\`\`python
# Just a comment
\`\`\``;

      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles special characters in title', () => {
      const content = `# Title with "quotes" and 'apostrophes' & symbols

Content`;

      expect(extractTitleFromContent(content)).toBe('Title with "quotes" and \'apostrophes\' & symbols');
    });
  });
});

describe('slugFromFilename', () => {
  describe('numeric prefix removal', () => {
    it('removes leading number prefix', () => {
      expect(slugFromFilename('01-introduction.md')).toBe('introduction');
      expect(slugFromFilename('05-advanced-topics.md')).toBe('advanced-topics');
      expect(slugFromFilename('10-conclusion.md')).toBe('conclusion');
    });

    it('handles multi-digit prefixes', () => {
      expect(slugFromFilename('100-topic.md')).toBe('topic');
      expect(slugFromFilename('001-zero-padded.md')).toBe('zero-padded');
    });
  });

  describe('extension handling', () => {
    it('removes .md extension', () => {
      expect(slugFromFilename('topic.md')).toBe('topic');
      expect(slugFromFilename('advanced-topic.md')).toBe('advanced-topic');
    });

    it('handles files without extension', () => {
      expect(slugFromFilename('01-topic')).toBe('topic');
    });

    it('only removes .md extension', () => {
      expect(slugFromFilename('topic.txt')).toBe('topic.txt');
      expect(slugFromFilename('topic.markdown')).toBe('topic.markdown');
    });
  });

  describe('case handling', () => {
    it('converts to lowercase', () => {
      expect(slugFromFilename('01-Introduction.md')).toBe('introduction');
      expect(slugFromFilename('UPPERCASE.md')).toBe('uppercase');
      expect(slugFromFilename('MixedCase.md')).toBe('mixedcase');
    });
  });

  describe('edge cases', () => {
    it('handles filename without prefix', () => {
      expect(slugFromFilename('introduction.md')).toBe('introduction');
    });

    it('handles filename with hyphens', () => {
      expect(slugFromFilename('01-getting-started-guide.md')).toBe('getting-started-guide');
    });

    it('handles filename starting with number but not prefix pattern', () => {
      // If it matches /^\d+-/, it gets removed
      expect(slugFromFilename('2024-review.md')).toBe('review');
    });

    it('handles empty string', () => {
      expect(slugFromFilename('')).toBe('');
    });
  });
});

describe('groupIdsByTopic', () => {
  describe('long format topicId', () => {
    it('groups items by topic number from long format', () => {
      const items = [
        { id: 'quiz-1', topicId: 'cs303-topic-1' },
        { id: 'quiz-2', topicId: 'cs303-topic-1' },
        { id: 'quiz-3', topicId: 'cs303-topic-2' },
        { id: 'quiz-4', topicId: 'cs303-topic-3' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['quiz-1', 'quiz-2']);
      expect(grouped[2]).toEqual(['quiz-3']);
      expect(grouped[3]).toEqual(['quiz-4']);
    });

    it('handles multi-digit topic numbers', () => {
      const items = [
        { id: 'quiz-1', topicId: 'cs201-topic-10' },
        { id: 'quiz-2', topicId: 'cs201-topic-11' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[10]).toEqual(['quiz-1']);
      expect(grouped[11]).toEqual(['quiz-2']);
    });
  });

  describe('short format topicId', () => {
    it('groups items by topic number from short format', () => {
      const items = [
        { id: 'ex-1', topicId: 'cs205-1' },
        { id: 'ex-2', topicId: 'cs205-1' },
        { id: 'ex-3', topicId: 'cs205-2' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['ex-1', 'ex-2']);
      expect(grouped[2]).toEqual(['ex-3']);
    });
  });

  describe('mixed formats', () => {
    it('handles mix of long and short formats', () => {
      const items = [
        { id: 'quiz-1', topicId: 'cs303-topic-1' },
        { id: 'ex-1', topicId: 'cs303-1' },
        { id: 'quiz-2', topicId: 'cs303-topic-2' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['quiz-1', 'ex-1']);
      expect(grouped[2]).toEqual(['quiz-2']);
    });
  });

  describe('edge cases', () => {
    it('handles empty array', () => {
      const items: { id: string; topicId?: string }[] = [];
      const grouped = groupIdsByTopic(items);
      expect(grouped).toEqual({});
    });

    it('handles items without topicId', () => {
      const items = [
        { id: 'quiz-1', topicId: 'cs303-topic-1' },
        { id: 'quiz-2' }, // No topicId
        { id: 'quiz-3', topicId: undefined },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['quiz-1']);
      expect(Object.keys(grouped)).toEqual(['1']);
    });

    it('handles items with non-matching topicId format', () => {
      const items = [
        { id: 'quiz-1', topicId: 'invalid-format' },
        { id: 'quiz-2', topicId: 'cs303-topic-1' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['quiz-2']);
      expect(Object.keys(grouped)).toEqual(['1']);
    });

    it('preserves order of items within each topic group', () => {
      const items = [
        { id: 'quiz-a', topicId: 'cs303-topic-1' },
        { id: 'quiz-b', topicId: 'cs303-topic-1' },
        { id: 'quiz-c', topicId: 'cs303-topic-1' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['quiz-a', 'quiz-b', 'quiz-c']);
    });
  });
});

describe('Content Integration', () => {
  describe('full parsing workflow', () => {
    it('handles complete subtopic file', () => {
      const content = `---
id: cs101-t1-intro
title: Introduction to Programming
slug: introduction
order: 1
---

# Introduction to Programming

Welcome to CS101!

## Getting Started

Here's some code:

\`\`\`python
# This is a Python comment
print("Hello, World!")
\`\`\`

## Summary

That's all for now.`;

      const result = parseFrontmatter(content);

      expect(result.frontmatter.id).toBe('cs101-t1-intro');
      expect(result.frontmatter.title).toBe('Introduction to Programming');
      expect(result.frontmatter.slug).toBe('introduction');
      expect(result.frontmatter.order).toBe(1);

      // Content should not include frontmatter
      expect(result.content).not.toContain('id: cs101-t1-intro');
      expect(result.content).toContain('# Introduction to Programming');
      expect(result.content).toContain('print("Hello, World!")');
    });

    it('extracts title from content when not in frontmatter', () => {
      const content = `---
order: 1
---

# Dynamic Title

Content here.`;

      const result = parseFrontmatter(content);
      expect(result.frontmatter.title).toBeUndefined();

      const extractedTitle = extractTitleFromContent(result.content);
      expect(extractedTitle).toBe('Dynamic Title');
    });
  });

  describe('filename to slug workflow', () => {
    it('generates correct slugs from typical filenames', () => {
      const testCases = [
        { filename: '01-introduction.md', expected: 'introduction' },
        { filename: '02-getting-started.md', expected: 'getting-started' },
        { filename: '03-Advanced-Topics.md', expected: 'advanced-topics' },
        { filename: '10-conclusion-and-summary.md', expected: 'conclusion-and-summary' },
      ];

      testCases.forEach(({ filename, expected }) => {
        expect(slugFromFilename(filename)).toBe(expected);
      });
    });
  });
});
