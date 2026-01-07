import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { CurriculumGraph } from '../src/components/curriculum-graph';
import type { Subject, UserProgress, SubjectProgress } from '../src/core/types';

// Mock the router to prevent navigation side effects
vi.mock('../src/core/router', () => ({
  navigateToSubject: vi.fn(),
}));

// Helper to create a subject with minimal required fields
const makeSubject = (overrides: Partial<Subject>): Subject => ({
  id: 'test-subject',
  code: 'TEST101',
  title: 'Test Subject',
  category: 'cs',
  year: 1,
  semester: 1,
  prerequisites: [],
  description: 'A test subject',
  learningObjectives: [],
  topics: [],
  estimatedHours: 10,
  ...overrides,
});

const makeProgress = (overrides?: Partial<SubjectProgress>): SubjectProgress => ({
  status: 'not_started',
  quizAttempts: {},
  examAttempts: {},
  exerciseCompletions: {},
  projectSubmissions: {},
  ...overrides,
});

const makeUserProgress = (subjects: Record<string, SubjectProgress> = {}): UserProgress => ({
  version: 4,
  startedAt: new Date().toISOString(),
  subjects,
  settings: {
    theme: 'auto',
    codeEditorFontSize: 14,
    showCompletedItems: true,
  },
});

// Mock CSS custom properties for theme colors
const mockGetComputedStyle = () => {
  const originalGetComputedStyle = window.getComputedStyle;
  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
    const result = originalGetComputedStyle(element);
    return {
      ...result,
      getPropertyValue: (prop: string) => {
        const colors: Record<string, string> = {
          '--color-bg-surface': '#161b22',
          '--color-bg-elevated': '#21262d',
          '--color-text-primary': '#f0f3f6',
          '--color-text-muted': '#6e7681',
          '--color-border-default': '#30363d',
          '--color-success': '#56d364',
          '--color-accent-primary': '#58a6ff',
        };
        return colors[prop] || '';
      },
    } as CSSStyleDeclaration;
  });
};

describe('CurriculumGraph', () => {
  beforeEach(() => {
    mockGetComputedStyle();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('construction', () => {
    it('creates a graph container element', () => {
      const graph = new CurriculumGraph([], makeUserProgress());
      const element = graph.render();

      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.className).toBe('curriculum-graph-container');
    });

    it('handles empty subjects array without error', () => {
      const graph = new CurriculumGraph([], makeUserProgress());
      expect(() => graph.render()).not.toThrow();
    });

    it('handles single subject without prerequisites', () => {
      const subjects = [makeSubject({ id: 'cs101', code: 'CS101', title: 'Intro to CS' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const svg = element.querySelector('svg');
      expect(svg).not.toBeNull();
    });
  });

  describe('render()', () => {
    it('returns an SVG inside the container for non-empty subjects', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const svg = element.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.tagName.toLowerCase()).toBe('svg');
    });

    it('creates SVG with valid dimensions for empty subjects (no -Infinity)', () => {
      const graph = new CurriculumGraph([], makeUserProgress());
      const element = graph.render();

      const svg = element.querySelector('svg');
      expect(svg).not.toBeNull();

      // Should have valid positive dimensions, not -Infinity
      const width = parseFloat(svg?.getAttribute('width') || '0');
      const height = parseFloat(svg?.getAttribute('height') || '0');

      expect(Number.isFinite(width)).toBe(true);
      expect(Number.isFinite(height)).toBe(true);
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    });

    it('creates arrow marker definitions', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const defs = element.querySelector('svg defs');
      expect(defs).not.toBeNull();

      const arrowhead = defs?.querySelector('#arrowhead');
      expect(arrowhead).not.toBeNull();
    });

    it('renders node rectangles for each subject', () => {
      const subjects = [
        makeSubject({ id: 'cs101', code: 'CS101' }),
        makeSubject({ id: 'cs102', code: 'CS102' }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const rects = element.querySelectorAll('svg rect');
      expect(rects.length).toBe(2);
    });

    it('renders edges for prerequisites', () => {
      const subjects = [
        makeSubject({ id: 'cs101', prerequisites: [] }),
        makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const paths = element.querySelectorAll('svg path');
      // Should have at least one edge from cs101 to cs102
      expect(paths.length).toBeGreaterThanOrEqual(1);
    });

    it('can be called multiple times (re-render)', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());

      // First render
      const element1 = graph.render();
      expect(element1.querySelectorAll('svg rect').length).toBe(1);

      // Second render should not double the nodes
      const element2 = graph.render();
      expect(element2.querySelectorAll('svg rect').length).toBe(1);
    });
  });

  describe('node status colors', () => {
    it('applies different colors for completed subjects', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const userProgress = makeUserProgress({
        cs101: makeProgress({ status: 'completed' }),
      });
      const graph = new CurriculumGraph(subjects, userProgress);
      const element = graph.render();

      const rect = element.querySelector('svg rect');
      expect(rect).not.toBeNull();
      // Check stroke color is the success color
      expect(rect?.getAttribute('stroke')).toBe('#56d364');
    });

    it('applies different colors for in-progress subjects', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const userProgress = makeUserProgress({
        cs101: makeProgress({ status: 'in_progress' }),
      });
      const graph = new CurriculumGraph(subjects, userProgress);
      const element = graph.render();

      const rect = element.querySelector('svg rect');
      expect(rect).not.toBeNull();
      // Check stroke color is the accent color
      expect(rect?.getAttribute('stroke')).toBe('#58a6ff');
    });

    it('applies muted colors for not-started subjects', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const userProgress = makeUserProgress({});
      const graph = new CurriculumGraph(subjects, userProgress);
      const element = graph.render();

      const rect = element.querySelector('svg rect');
      expect(rect).not.toBeNull();
      // Check stroke color is the muted color
      expect(rect?.getAttribute('stroke')).toBe('#6e7681');
    });
  });

  describe('layout calculation', () => {
    it('places subjects with no prerequisites at level 0', () => {
      const subjects = [
        makeSubject({ id: 'a', prerequisites: [] }),
        makeSubject({ id: 'b', prerequisites: [] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      // Both subjects should be at the same x position (same level)
      const rects = element.querySelectorAll('svg rect');
      const xPositions = Array.from(rects).map(r => parseFloat(r.getAttribute('x') || '0'));

      expect(xPositions[0]).toBe(xPositions[1]);
    });

    it('places subjects with prerequisites at higher levels', () => {
      const subjects = [
        makeSubject({ id: 'cs101', prerequisites: [] }),
        makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      // cs102 should be to the right of cs101
      const groups = element.querySelectorAll('svg g');
      const rects = Array.from(groups).map(g => g.querySelector('rect'));
      const xPositions = rects.filter(r => r).map(r => parseFloat(r!.getAttribute('x') || '0'));

      // cs102 (index 1) should have higher x than cs101 (index 0)
      expect(xPositions[1]).toBeGreaterThan(xPositions[0]);
    });

    it('handles deep prerequisite chains', () => {
      const subjects = [
        makeSubject({ id: 'level1', prerequisites: [] }),
        makeSubject({ id: 'level2', prerequisites: ['level1'] }),
        makeSubject({ id: 'level3', prerequisites: ['level2'] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());

      expect(() => graph.render()).not.toThrow();
    });

    it('handles circular dependencies gracefully', () => {
      // This tests the circular dependency guard in calculateLayout
      const subjects = [
        makeSubject({ id: 'a', prerequisites: ['b'] }),
        makeSubject({ id: 'b', prerequisites: ['a'] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());

      // Should not hang or throw
      expect(() => graph.render()).not.toThrow();
    });

    it('handles prerequisites that reference non-existent subjects', () => {
      const subjects = [
        makeSubject({ id: 'cs102', prerequisites: ['non-existent-subject'] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());

      expect(() => graph.render()).not.toThrow();
    });
  });

  describe('edge rendering', () => {
    it('renders edges with correct marker for completed prerequisites', () => {
      const subjects = [
        makeSubject({ id: 'cs101', prerequisites: [] }),
        makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
      ];
      const userProgress = makeUserProgress({
        cs101: makeProgress({ status: 'completed' }),
      });
      const graph = new CurriculumGraph(subjects, userProgress);
      const element = graph.render();

      const path = element.querySelector('svg path');
      expect(path).not.toBeNull();
      // Completed prerequisite should have the met arrowhead
      expect(path?.getAttribute('marker-end')).toBe('url(#arrowhead-met)');
    });

    it('renders edges with default marker for incomplete prerequisites', () => {
      const subjects = [
        makeSubject({ id: 'cs101', prerequisites: [] }),
        makeSubject({ id: 'cs102', prerequisites: ['cs101'] }),
      ];
      const userProgress = makeUserProgress({
        cs101: makeProgress({ status: 'in_progress' }),
      });
      const graph = new CurriculumGraph(subjects, userProgress);
      const element = graph.render();

      const path = element.querySelector('svg path');
      expect(path).not.toBeNull();
      // Incomplete prerequisite should have the default arrowhead
      expect(path?.getAttribute('marker-end')).toBe('url(#arrowhead)');
    });

    it('skips edges for prerequisites not in the subjects list', () => {
      const subjects = [
        makeSubject({ id: 'cs102', prerequisites: ['missing'] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      // Should render without edges since 'missing' is not in subjects
      const paths = element.querySelectorAll('svg path');
      expect(paths.length).toBe(0);
    });
  });

  describe('text rendering', () => {
    it('renders subject title text', () => {
      const subjects = [makeSubject({ id: 'cs101', title: 'Introduction to CS' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const texts = element.querySelectorAll('svg text');
      const textContents = Array.from(texts).map(t => t.textContent);

      expect(textContents.some(t => t?.includes('Introduction'))).toBe(true);
    });

    it('renders subject code text', () => {
      const subjects = [makeSubject({ id: 'cs101', code: 'CS101' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const texts = element.querySelectorAll('svg text');
      const textContents = Array.from(texts).map(t => t.textContent);

      expect(textContents).toContain('CS101');
    });

    it('truncates long titles', () => {
      const longTitle = 'This is a very long subject title that should be truncated';
      const subjects = [makeSubject({ id: 'cs101', title: longTitle })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const texts = element.querySelectorAll('svg text');
      const titleText = Array.from(texts).find(t =>
        t.textContent?.includes('...')
      );

      // Long title should be truncated with ellipsis
      expect(titleText).toBeDefined();
    });
  });

  describe('click handling', () => {
    it('adds click listeners to node groups', () => {
      const subjects = [makeSubject({ id: 'cs101' })];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      const nodeGroup = element.querySelector('svg g');
      expect(nodeGroup).not.toBeNull();
      expect(nodeGroup?.style.cursor).toBe('pointer');
    });
  });

  describe('sorting within levels', () => {
    it('sorts subjects by year then semester within the same level', () => {
      const subjects = [
        makeSubject({ id: 'c', year: 2, semester: 1, prerequisites: [] }),
        makeSubject({ id: 'a', year: 1, semester: 1, prerequisites: [] }),
        makeSubject({ id: 'b', year: 1, semester: 2, prerequisites: [] }),
      ];
      const graph = new CurriculumGraph(subjects, makeUserProgress());
      const element = graph.render();

      // All at level 0, should be sorted by year then semester
      // Order should be: a (Y1S1), b (Y1S2), c (Y2S1)
      const texts = element.querySelectorAll('svg g text');
      const codes = Array.from(texts)
        .filter((_, i) => i % 2 === 1) // Every other text is the code
        .map(t => t.textContent);

      // Since makeSubject uses code 'TEST101' by default, we need to set codes
      const subjectsWithCodes = [
        makeSubject({ id: 'c', code: 'C', year: 2, semester: 1, prerequisites: [] }),
        makeSubject({ id: 'a', code: 'A', year: 1, semester: 1, prerequisites: [] }),
        makeSubject({ id: 'b', code: 'B', year: 1, semester: 2, prerequisites: [] }),
      ];
      const graph2 = new CurriculumGraph(subjectsWithCodes, makeUserProgress());
      const element2 = graph2.render();

      // Get y positions to verify sorting
      const rects = element2.querySelectorAll('svg rect');
      const yPositions = Array.from(rects).map(r => ({
        y: parseFloat(r.getAttribute('y') || '0'),
      }));

      // First (lowest y) should be a (Y1S1), last should be c (Y2S1)
      expect(yPositions[0].y).toBeLessThan(yPositions[2].y);
    });
  });
});
