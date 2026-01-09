import { describe, it, expect } from 'vitest';
import {
  parseFrontmatter,
  extractTitleFromContent,
  slugFromFilename,
  buildTopic,
  buildTopicsFromGlob,
  asQuizzes,
  asExams,
  asExercises,
  asProjects,
  loadExercisesFromGlob,
  loadQuizzesFromGlob,
  groupIdsByTopic,
} from '../src/subjects/loader';
import type { Quiz, Exam, Exercise, Project } from '../src/core/types';

describe('loader utilities', () => {
  describe('parseFrontmatter', () => {
    it('parses valid frontmatter with key-value pairs', () => {
      const markdown = `---
id: test-id
title: Test Title
order: 5
---
# Content here

Some markdown content.`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.id).toBe('test-id');
      expect(result.frontmatter.title).toBe('Test Title');
      expect(result.frontmatter.order).toBe(5);
      expect(result.content).toBe('# Content here\n\nSome markdown content.');
    });

    it('returns empty frontmatter for content without frontmatter', () => {
      const markdown = '# Just Content\n\nNo frontmatter here.';

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('handles frontmatter with quoted string values', () => {
      const markdown = `---
title: "Double quoted"
author: 'Single quoted'
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Double quoted');
      expect(result.frontmatter.author).toBe('Single quoted');
    });

    it('parses numeric values as numbers', () => {
      const markdown = `---
order: 42
weight: 100
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.order).toBe(42);
      expect(result.frontmatter.weight).toBe(100);
      expect(typeof result.frontmatter.order).toBe('number');
      expect(typeof result.frontmatter.weight).toBe('number');
    });

    it('keeps non-numeric strings as strings', () => {
      const markdown = `---
version: 1.0.0
slug: my-topic
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.version).toBe('1.0.0');
      expect(result.frontmatter.slug).toBe('my-topic');
      expect(typeof result.frontmatter.version).toBe('string');
    });

    it('handles empty frontmatter block (requires at least one newline between markers)', () => {
      // The regex requires ---\n...\n--- format, so ---\n--- doesn't match
      const markdown = `---
---
Content here`;

      const result = parseFrontmatter(markdown);

      // When pattern doesn't match, returns original content
      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('handles frontmatter with just a newline between markers', () => {
      const markdown = `---

---
Content here`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe('Content here');
    });

    it('handles frontmatter with only whitespace in content', () => {
      const markdown = `---
title: Empty Content
---
`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Empty Content');
      expect(result.content).toBe('');
    });

    it('handles keys with spaces after colon', () => {
      const markdown = `---
title:   Spaced Value
slug:test-slug
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('Spaced Value');
      expect(result.frontmatter.slug).toBe('test-slug');
    });

    it('returns original content if frontmatter markers are incomplete', () => {
      const markdown = `---
title: Incomplete
No closing marker`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe(markdown);
    });

    it('handles frontmatter with empty string values', () => {
      const markdown = `---
title: ""
empty:
---
Content`;

      const result = parseFrontmatter(markdown);

      expect(result.frontmatter.title).toBe('');
    });

    it('handles multi-line content after frontmatter correctly', () => {
      const markdown = `---
id: test
---
Line 1
Line 2
Line 3`;

      const result = parseFrontmatter(markdown);

      expect(result.content).toBe('Line 1\nLine 2\nLine 3');
    });
  });

  describe('extractTitleFromContent', () => {
    it('extracts title from first h1 heading', () => {
      const content = '# My Title\n\nSome content here.';

      expect(extractTitleFromContent(content)).toBe('My Title');
    });

    it('returns null when no h1 heading exists', () => {
      const content = '## Second Level\n\nNo h1 here.';

      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('extracts first h1 when multiple exist', () => {
      const content = '# First Title\n\n# Second Title';

      expect(extractTitleFromContent(content)).toBe('First Title');
    });

    it('handles h1 not at start of content', () => {
      const content = 'Some intro text.\n\n# The Title\n\nMore content.';

      expect(extractTitleFromContent(content)).toBe('The Title');
    });

    it('trims whitespace from title', () => {
      const content = '#   Spaced Title   \n\nContent';

      expect(extractTitleFromContent(content)).toBe('Spaced Title');
    });

    it('returns null for empty content', () => {
      expect(extractTitleFromContent('')).toBeNull();
    });

    it('returns null for content with only h2-h6 headings', () => {
      const content = '## H2\n### H3\n#### H4\n##### H5\n###### H6';

      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles title with special characters', () => {
      const content = '# Introduction to C++ & STL\n\nContent';

      expect(extractTitleFromContent(content)).toBe('Introduction to C++ & STL');
    });

    it('does not match hash in code blocks', () => {
      const content = '```\n# This is a comment\n```\n\n# Actual Title';

      // The function properly skips code blocks and finds the real title
      expect(extractTitleFromContent(content)).toBe('Actual Title');
    });

    it('handles tilde-fenced code blocks', () => {
      const content = '~~~\n# Also a comment\n~~~\n\n# Real Title';

      expect(extractTitleFromContent(content)).toBe('Real Title');
    });

    it('handles multiple code blocks before title', () => {
      const content = '```python\n# Python comment\ndef foo():\n    pass\n```\n\nSome text\n\n```bash\n# Bash comment\necho "hello"\n```\n\n# The Actual Title';

      expect(extractTitleFromContent(content)).toBe('The Actual Title');
    });

    it('returns null when only title is inside code block', () => {
      const content = '```\n# Only Title Inside Code\n```\n\nNo real title here.';

      expect(extractTitleFromContent(content)).toBeNull();
    });

    it('handles code blocks with language specifier', () => {
      const content = '```python\n# Python comment\nprint("hello")\n```\n\n# Proper Title';

      expect(extractTitleFromContent(content)).toBe('Proper Title');
    });
  });

  describe('slugFromFilename', () => {
    it('removes leading number prefix and extension', () => {
      expect(slugFromFilename('01-introduction.md')).toBe('introduction');
    });

    it('handles two-digit prefixes', () => {
      expect(slugFromFilename('42-advanced-topic.md')).toBe('advanced-topic');
    });

    it('handles files without number prefix', () => {
      expect(slugFromFilename('overview.md')).toBe('overview');
    });

    it('converts to lowercase', () => {
      expect(slugFromFilename('01-MyTopic.md')).toBe('mytopic');
    });

    it('handles multiple dashes in filename', () => {
      expect(slugFromFilename('03-data-structures-and-algorithms.md')).toBe('data-structures-and-algorithms');
    });

    it('handles files with only number prefix', () => {
      expect(slugFromFilename('01-.md')).toBe('');
    });

    it('handles empty filename after prefix removal', () => {
      expect(slugFromFilename('.md')).toBe('');
    });

    it('handles filename without .md extension', () => {
      expect(slugFromFilename('01-topic')).toBe('topic');
    });

    it('only removes leading number prefix, not numbers elsewhere', () => {
      expect(slugFromFilename('01-topic-2-review.md')).toBe('topic-2-review');
    });
  });

  describe('buildTopic', () => {
    const mockGlobResult = {
      './content/topic-1.md': '# Topic 1 Overview\n\nMain topic content.',
      './content/topic-1/01-intro.md': `---
id: cs101-t1-intro
title: Introduction
order: 1
---
# Introduction

Content here.`,
      './content/topic-1/02-basics.md': `---
title: Basic Concepts
---
# Basic Concepts

More content.`,
      './content/topic-1/03-advanced.md': `# Advanced Topics

No frontmatter here.`,
    };

    it('creates a topic with correct ID and title', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      expect(topic.id).toBe('cs101-topic-1');
      expect(topic.title).toBe('Getting Started');
    });

    it('extracts topic-level content', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      expect(topic.content).toBe('# Topic 1 Overview\n\nMain topic content.');
    });

    it('creates subtopics from glob result', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      expect(topic.subtopics).toHaveLength(3);
    });

    it('sorts subtopics by order', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      // Verify they're sorted by order (1, 2, 3)
      const orders = topic.subtopics.map(s => s.order);
      expect(orders).toEqual([1, 2, 3]);
    });

    it('uses frontmatter ID when available', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      const introSubtopic = topic.subtopics.find(s => s.slug === 'intro');
      expect(introSubtopic?.id).toBe('cs101-t1-intro');
    });

    it('generates ID when frontmatter ID is missing', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      const basicsSubtopic = topic.subtopics.find(s => s.slug === 'basics');
      expect(basicsSubtopic?.id).toBe('cs101-t1-basics');
    });

    it('uses frontmatter title when available', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      const introSubtopic = topic.subtopics.find(s => s.slug === 'intro');
      expect(introSubtopic?.title).toBe('Introduction');
    });

    it('extracts title from content when frontmatter title is missing', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      const advancedSubtopic = topic.subtopics.find(s => s.slug === 'advanced');
      expect(advancedSubtopic?.title).toBe('Advanced Topics');
    });

    it('includes quiz IDs when provided', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
          quizIds: ['quiz-1', 'quiz-2'],
        },
        mockGlobResult
      );

      expect(topic.quizIds).toEqual(['quiz-1', 'quiz-2']);
    });

    it('includes exercise IDs when provided', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
          exerciseIds: ['ex-1', 'ex-2'],
        },
        mockGlobResult
      );

      expect(topic.exerciseIds).toEqual(['ex-1', 'ex-2']);
    });

    it('includes readings when provided', () => {
      const readings = [
        { title: 'Read 1', url: 'https://example.com/1' },
        { title: 'Read 2', url: 'https://example.com/2' },
      ];

      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
          readings,
        },
        mockGlobResult
      );

      expect(topic.readings).toEqual(readings);
    });

    it('defaults to empty arrays for quizIds and exerciseIds', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        mockGlobResult
      );

      expect(topic.quizIds).toEqual([]);
      expect(topic.exerciseIds).toEqual([]);
    });

    it('handles empty glob result', () => {
      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Getting Started',
        },
        {}
      );

      expect(topic.subtopics).toHaveLength(0);
      expect(topic.content).toBe('');
    });

    it('derives order from filename when frontmatter order is missing', () => {
      const globResult = {
        './content/topic-1/05-special.md': '# Special Topic\n\nNo order frontmatter.',
      };

      const topic = buildTopic(
        {
          subjectId: 'cs101',
          topicNumber: 1,
          title: 'Test',
        },
        globResult
      );

      expect(topic.subtopics[0].order).toBe(5);
    });
  });

  describe('buildTopicsFromGlob', () => {
    const mockGlobResult = {
      './content/topic-1.md': '# Topic 1 Content',
      './content/topic-1/01-intro.md': '---\ntitle: Intro\n---\n# Intro',
      './content/topic-2.md': '# Topic 2 Content',
      './content/topic-2/01-start.md': '---\ntitle: Start\n---\n# Start',
    };

    it('builds multiple topics from glob result', () => {
      const topics = buildTopicsFromGlob('cs101', mockGlobResult, [
        { number: 1, title: 'First Topic' },
        { number: 2, title: 'Second Topic' },
      ]);

      expect(topics).toHaveLength(2);
      expect(topics[0].title).toBe('First Topic');
      expect(topics[1].title).toBe('Second Topic');
    });

    it('preserves topic order from config', () => {
      const topics = buildTopicsFromGlob('cs101', mockGlobResult, [
        { number: 2, title: 'Second Topic' },
        { number: 1, title: 'First Topic' },
      ]);

      expect(topics[0].id).toBe('cs101-topic-2');
      expect(topics[1].id).toBe('cs101-topic-1');
    });

    it('passes through quiz and exercise IDs', () => {
      const topics = buildTopicsFromGlob('cs101', mockGlobResult, [
        { number: 1, title: 'Topic 1', quizIds: ['q1'], exerciseIds: ['e1'] },
        { number: 2, title: 'Topic 2', quizIds: ['q2'] },
      ]);

      expect(topics[0].quizIds).toEqual(['q1']);
      expect(topics[0].exerciseIds).toEqual(['e1']);
      expect(topics[1].quizIds).toEqual(['q2']);
      expect(topics[1].exerciseIds).toEqual([]);
    });

    it('handles empty topic config array', () => {
      const topics = buildTopicsFromGlob('cs101', mockGlobResult, []);

      expect(topics).toHaveLength(0);
    });
  });

  describe('type-safe wrappers', () => {
    it('asQuizzes returns data as Quiz[]', () => {
      const data: unknown = [{ id: 'q1', title: 'Quiz 1' }];
      const quizzes: Quiz[] = asQuizzes(data);

      expect(quizzes).toEqual(data);
    });

    it('asExams returns data as Exam[]', () => {
      const data: unknown = [{ id: 'e1', title: 'Exam 1' }];
      const exams: Exam[] = asExams(data);

      expect(exams).toEqual(data);
    });

    it('asExercises returns data as Exercise[]', () => {
      const data: unknown = [{ id: 'ex1', title: 'Exercise 1' }];
      const exercises: Exercise[] = asExercises(data);

      expect(exercises).toEqual(data);
    });

    it('asProjects returns data as Project[]', () => {
      const data: unknown = [{ id: 'p1', title: 'Project 1' }];
      const projects: Project[] = asProjects(data);

      expect(projects).toEqual(data);
    });
  });

  describe('loadExercisesFromGlob', () => {
    it('flattens exercises from multiple topics', () => {
      const globResult: Record<string, Exercise[]> = {
        'topic1': [
          { id: 'ex1', title: 'Ex 1', difficulty: 'easy' } as Exercise,
          { id: 'ex2', title: 'Ex 2', difficulty: 'medium' } as Exercise,
        ],
        'topic2': [
          { id: 'ex3', title: 'Ex 3', difficulty: 'hard' } as Exercise,
        ],
      };

      const exercises = loadExercisesFromGlob(globResult);

      expect(exercises).toHaveLength(3);
      expect(exercises.map(e => e.id)).toEqual(['ex1', 'ex2', 'ex3']);
    });

    it('handles empty glob result', () => {
      const exercises = loadExercisesFromGlob({});

      expect(exercises).toHaveLength(0);
    });

    it('handles topics with empty exercise arrays', () => {
      const globResult: Record<string, Exercise[]> = {
        'topic1': [],
        'topic2': [{ id: 'ex1', title: 'Ex 1', difficulty: 'easy' } as Exercise],
        'topic3': [],
      };

      const exercises = loadExercisesFromGlob(globResult);

      expect(exercises).toHaveLength(1);
    });
  });

  describe('loadQuizzesFromGlob', () => {
    it('flattens quizzes from multiple topics', () => {
      const globResult: Record<string, Quiz[]> = {
        'topic1': [
          { id: 'q1', title: 'Quiz 1', questions: [] } as Quiz,
        ],
        'topic2': [
          { id: 'q2', title: 'Quiz 2', questions: [] } as Quiz,
          { id: 'q3', title: 'Quiz 3', questions: [] } as Quiz,
        ],
      };

      const quizzes = loadQuizzesFromGlob(globResult);

      expect(quizzes).toHaveLength(3);
      expect(quizzes.map(q => q.id)).toEqual(['q1', 'q2', 'q3']);
    });

    it('handles empty glob result', () => {
      const quizzes = loadQuizzesFromGlob({});

      expect(quizzes).toHaveLength(0);
    });
  });

  describe('groupIdsByTopic', () => {
    it('groups item IDs by topic number', () => {
      const items = [
        { id: 'item1', topicId: 'cs101-topic-1' },
        { id: 'item2', topicId: 'cs101-topic-1' },
        { id: 'item3', topicId: 'cs101-topic-2' },
        { id: 'item4', topicId: 'cs101-topic-3' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['item1', 'item2']);
      expect(grouped[2]).toEqual(['item3']);
      expect(grouped[3]).toEqual(['item4']);
    });

    it('ignores items without topicId', () => {
      const items = [
        { id: 'item1', topicId: 'cs101-topic-1' },
        { id: 'item2' }, // No topicId
        { id: 'item3', topicId: undefined },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['item1']);
      expect(Object.keys(grouped)).toHaveLength(1);
    });

    it('ignores items with non-matching topicId format', () => {
      const items = [
        { id: 'item1', topicId: 'cs101-topic-1' },
        { id: 'item2', topicId: 'invalid-format' },
        { id: 'item3', topicId: 'topic-without-number' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['item1']);
      expect(Object.keys(grouped)).toHaveLength(1);
    });

    it('handles empty array', () => {
      const grouped = groupIdsByTopic([]);

      expect(grouped).toEqual({});
    });

    it('handles two-digit topic numbers', () => {
      const items = [
        { id: 'item1', topicId: 'cs101-topic-10' },
        { id: 'item2', topicId: 'cs101-topic-12' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[10]).toEqual(['item1']);
      expect(grouped[12]).toEqual(['item2']);
    });

    it('handles different subject prefixes', () => {
      const items = [
        { id: 'item1', topicId: 'cs101-topic-1' },
        { id: 'item2', topicId: 'math201-topic-1' },
        { id: 'item3', topicId: 'cs101-topic-2' },
      ];

      const grouped = groupIdsByTopic(items);

      // All items with topic-1 are grouped together regardless of subject
      expect(grouped[1]).toEqual(['item1', 'item2']);
      expect(grouped[2]).toEqual(['item3']);
    });

    it('handles short format topicId (legacy format)', () => {
      const items = [
        { id: 'item1', topicId: 'cs205-1' },
        { id: 'item2', topicId: 'cs205-2' },
        { id: 'item3', topicId: 'math102-1' },
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['item1', 'item3']);
      expect(grouped[2]).toEqual(['item2']);
    });

    it('handles mixed long and short format topicIds', () => {
      const items = [
        { id: 'item1', topicId: 'cs404-topic-1' },  // long format
        { id: 'item2', topicId: 'cs205-1' },         // short format
        { id: 'item3', topicId: 'cs404-topic-2' },  // long format
        { id: 'item4', topicId: 'math102-2' },       // short format
      ];

      const grouped = groupIdsByTopic(items);

      expect(grouped[1]).toEqual(['item1', 'item2']);
      expect(grouped[2]).toEqual(['item3', 'item4']);
    });
  });
});
