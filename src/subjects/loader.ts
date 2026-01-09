/**
 * Shared Subject Loader
 *
 * Provides utilities for loading subject content using Vite's glob imports
 * and frontmatter-based metadata. Eliminates boilerplate in individual subject files.
 */

import type { Topic, Subtopic, Quiz, Exam, Exercise, Project } from '../core/types';

// =============================================================================
// Frontmatter Parsing
// =============================================================================

interface Frontmatter {
  id?: string;
  title?: string;
  order?: number;
  slug?: string;
  [key: string]: unknown;
}

interface ParsedMarkdown {
  frontmatter: Frontmatter;
  content: string;
}

/**
 * Parse frontmatter from markdown content.
 * Frontmatter is YAML between --- markers at the start of the file.
 */
export function parseFrontmatter(markdown: string): ParsedMarkdown {
  // Normalize line endings (CRLF to LF) for consistent parsing
  const normalizedMarkdown = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
  const match = normalizedMarkdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const [, yamlContent, content] = match;
  const frontmatter: Frontmatter = {};

  // Simple YAML parsing for key: value pairs
  for (const line of yamlContent.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: string | number = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse numbers (only if no leading zeros, except for "0" itself)
      // Leading zeros indicate the value should remain a string (e.g., zip codes, IDs)
      if (/^(0|[1-9]\d*)$/.test(value)) {
        frontmatter[key] = parseInt(value, 10);
      } else {
        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, content };
}

/**
 * Extract title from first # heading in markdown content.
 * Ignores headings that appear inside fenced code blocks (``` or ~~~).
 */
export function extractTitleFromContent(content: string): string | null {
  // Remove fenced code blocks before searching for headings
  // This prevents matching # comments inside code blocks
  const contentWithoutCodeBlocks = content.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
  // Match h1: # followed by horizontal whitespace (space/tab, not newline) and content
  // Using [ \t]+ instead of \s+ to prevent matching # on one line with content on another
  const match = contentWithoutCodeBlocks.match(/^#[ \t]+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Generate slug from filename
 * e.g., "01-introduction.md" -> "introduction"
 */
export function slugFromFilename(filename: string): string {
  return filename
    .replace(/^\d+-/, '')  // Remove leading number prefix
    .replace(/\.md$/, '')   // Remove .md extension
    .toLowerCase();
}

// =============================================================================
// Topic Building from Glob Imports
// =============================================================================

type GlobImportResult = Record<string, string>;

interface TopicConfig {
  subjectId: string;
  topicNumber: number;
  title: string;
  quizIds?: string[];
  exerciseIds?: string[];
  readings?: Topic['readings'];
}

/**
 * Build a Topic with Subtopics from glob-imported markdown files.
 *
 * @param subjectId - The subject ID (e.g., 'cs101')
 * @param topicNumber - The topic number (1-7)
 * @param title - The topic title
 * @param globResult - Result of import.meta.glob for this topic's content
 * @param options - Additional topic configuration
 */
export function buildTopic(
  config: TopicConfig,
  globResult: GlobImportResult,
): Topic {
  const { subjectId, topicNumber, title, quizIds = [], exerciseIds = [], readings } = config;
  const topicId = `${subjectId}-topic-${topicNumber}`;
  const topicPrefix = `./content/topic-${topicNumber}`;

  // Find topic-level content (topic-N.md)
  const topicContentKey = `./content/topic-${topicNumber}.md`;
  const topicContent = globResult[topicContentKey] || '';

  // Find and process subtopics
  const subtopics: Subtopic[] = [];

  for (const [path, content] of Object.entries(globResult)) {
    // Match subtopic files: ./content/topic-N/NN-name.md
    const subtopicMatch = path.match(new RegExp(`^${topicPrefix}/([^/]+)\\.md$`));
    if (!subtopicMatch) continue;

    const filename = subtopicMatch[1];
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);

    // Derive order from filename (01-xxx -> 1)
    const orderMatch = filename.match(/^(\d+)-/);
    const order = frontmatter.order ?? (orderMatch ? parseInt(orderMatch[1], 10) : 0);

    // Get slug from frontmatter or filename
    const slug = frontmatter.slug ?? slugFromFilename(filename);

    // Get title from frontmatter or first heading
    const subtopicTitle = frontmatter.title ?? extractTitleFromContent(markdownContent) ?? slug;

    // Get ID from frontmatter or generate
    const id = frontmatter.id ?? `${subjectId}-t${topicNumber}-${slug.replace(/-/g, '')}`;

    subtopics.push({
      id,
      slug,
      title: subtopicTitle,
      content, // Keep full content including frontmatter for now
      order,
    });
  }

  // Sort subtopics by order
  subtopics.sort((a, b) => a.order - b.order);

  return {
    id: topicId,
    title,
    content: topicContent,
    subtopics,
    quizIds,
    exerciseIds,
    readings,
  };
}

/**
 * Build all topics for a subject from a single glob import.
 *
 * @param subjectId - The subject ID
 * @param globResult - Result of import.meta.glob('./content/**\/*.md', ...)
 * @param topicConfigs - Configuration for each topic (titles, quiz/exercise IDs)
 */
export function buildTopicsFromGlob(
  subjectId: string,
  globResult: GlobImportResult,
  topicConfigs: Array<{
    number: number;
    title: string;
    quizIds?: string[];
    exerciseIds?: string[];
    readings?: Topic['readings'];
  }>,
): Topic[] {
  return topicConfigs.map(config =>
    buildTopic(
      {
        subjectId,
        topicNumber: config.number,
        title: config.title,
        quizIds: config.quizIds,
        exerciseIds: config.exerciseIds,
        readings: config.readings,
      },
      globResult,
    )
  );
}

// =============================================================================
// JSON Data Loaders (for type safety)
// =============================================================================

/**
 * Type-safe wrapper for quiz data
 */
export function asQuizzes(data: unknown): Quiz[] {
  return data as Quiz[];
}

/**
 * Type-safe wrapper for exam data
 */
export function asExams(data: unknown): Exam[] {
  return data as Exam[];
}

/**
 * Type-safe wrapper for exercise data
 */
export function asExercises(data: unknown): Exercise[] {
  return data as Exercise[];
}

/**
 * Type-safe wrapper for project data
 */
export function asProjects(data: unknown): Project[] {
  return data as Project[];
}

/**
 * Load and combine exercises from glob-imported topic files.
 * Flattens all topic-level exercise arrays into a single array.
 */
export function loadExercisesFromGlob(
  globResult: Record<string, Exercise[]>
): Exercise[] {
  return Object.values(globResult).flat();
}

/**
 * Load and combine quizzes from glob-imported topic files.
 * Flattens all topic-level quiz arrays into a single array.
 */
export function loadQuizzesFromGlob(
  globResult: Record<string, Quiz[]>
): Quiz[] {
  return Object.values(globResult).flat();
}

/**
 * Group item IDs by numeric topic suffix in topicId.
 * Supports both formats:
 *   - Long format: "cs303-topic-4" (preferred)
 *   - Short format: "cs205-1" (legacy)
 */
export function groupIdsByTopic<T extends { id: string; topicId?: string }>(
  items: T[]
): Record<number, string[]> {
  const grouped: Record<number, string[]> = {};

  items.forEach(item => {
    if (!item.topicId) return;
    // Try long format first: "cs303-topic-4"
    let match = item.topicId.match(/-topic-(\d+)$/);
    // Fall back to short format: "cs205-1"
    if (!match) {
      match = item.topicId.match(/-(\d+)$/);
    }
    if (!match) return;
    const topicNumber = Number(match[1]);
    if (!grouped[topicNumber]) {
      grouped[topicNumber] = [];
    }
    grouped[topicNumber].push(item.id);
  });

  return grouped;
}
