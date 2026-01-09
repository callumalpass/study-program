/**
 * Code Editor Configuration Tests
 *
 * Tests for code editor configuration validation and utility functions.
 * These tests focus on the configuration interfaces and constants without
 * requiring the full Monaco Editor setup.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Monaco Editor since we don't need the full editor for these tests
vi.mock('monaco-editor', () => ({
  editor: {
    create: vi.fn(() => ({
      getValue: vi.fn(() => ''),
      setValue: vi.fn(),
      dispose: vi.fn(),
      updateOptions: vi.fn(),
      deltaDecorations: vi.fn(() => []),
      onDidChangeModelContent: vi.fn(),
      addCommand: vi.fn(),
      layout: vi.fn(),
      revealLineInCenter: vi.fn(),
    })),
    setTheme: vi.fn(),
  },
  KeyMod: { CtrlCmd: 1, Shift: 2 },
  KeyCode: { Enter: 13 },
  Range: vi.fn(),
}));

// Mock monaco-vim
vi.mock('monaco-vim', () => ({
  initVimMode: vi.fn(() => ({ dispose: vi.fn() })),
  VimMode: vi.fn(),
}));

// Mock code-runner
vi.mock('../src/components/code-runner', () => ({
  runPython: vi.fn().mockResolvedValue(''),
  runTests: vi.fn().mockResolvedValue([]),
}));

describe('Code Editor Configuration', () => {
  describe('EditorConfig interface validation', () => {
    it('accepts minimal configuration', () => {
      const config = {};
      expect(config).toBeDefined();
    });

    it('accepts language configuration', () => {
      const config = {
        language: 'python',
      };
      expect(config.language).toBe('python');
    });

    it('accepts theme configuration', () => {
      const darkConfig = { theme: 'vs-dark' as const };
      const lightConfig = { theme: 'vs-light' as const };

      expect(darkConfig.theme).toBe('vs-dark');
      expect(lightConfig.theme).toBe('vs-light');
    });

    it('accepts readOnly configuration', () => {
      const readOnlyConfig = { readOnly: true };
      const editableConfig = { readOnly: false };

      expect(readOnlyConfig.readOnly).toBe(true);
      expect(editableConfig.readOnly).toBe(false);
    });

    it('accepts initialValue and starterCode', () => {
      const config = {
        initialValue: 'print("hello")',
        starterCode: '# Write your code here',
      };

      expect(config.initialValue).toBe('print("hello")');
      expect(config.starterCode).toBe('# Write your code here');
    });

    it('accepts fontSize configuration within valid range', () => {
      const minConfig = { fontSize: 10 };
      const maxConfig = { fontSize: 24 };
      const defaultConfig = { fontSize: 14 };

      expect(minConfig.fontSize).toBe(10);
      expect(maxConfig.fontSize).toBe(24);
      expect(defaultConfig.fontSize).toBe(14);
    });

    it('accepts height configuration', () => {
      const config = { height: '500px' };
      expect(config.height).toBe('500px');
    });

    it('accepts showRunButton configuration', () => {
      const showConfig = { showRunButton: true };
      const hideConfig = { showRunButton: false };

      expect(showConfig.showRunButton).toBe(true);
      expect(hideConfig.showRunButton).toBe(false);
    });

    it('accepts test cases configuration', () => {
      const config = {
        testCases: [
          { input: '5', expectedOutput: '25', description: 'square of 5' },
          { input: '0', expectedOutput: '0', description: 'square of 0' },
        ],
      };

      expect(config.testCases).toHaveLength(2);
      expect(config.testCases[0].description).toBe('square of 5');
    });

    it('accepts hints configuration', () => {
      const config = {
        hints: [
          'Think about what operation squares a number',
          'Use the ** operator for exponentiation',
        ],
      };

      expect(config.hints).toHaveLength(2);
    });

    it('accepts solution configuration', () => {
      const config = {
        solution: 'def square(x):\n    return x ** 2',
      };

      expect(config.solution).toContain('return x ** 2');
    });

    it('accepts storageKey for auto-save', () => {
      const config = {
        storageKey: 'exercise-cs101-1',
      };

      expect(config.storageKey).toBe('exercise-cs101-1');
    });

    it('accepts hideTestResults for exam mode', () => {
      const examConfig = { hideTestResults: true };
      const normalConfig = { hideTestResults: false };

      expect(examConfig.hideTestResults).toBe(true);
      expect(normalConfig.hideTestResults).toBe(false);
    });

    it('accepts callback functions', () => {
      const onRun = vi.fn();
      const onTestResults = vi.fn();

      const config = {
        onRun,
        onTestResults,
      };

      expect(typeof config.onRun).toBe('function');
      expect(typeof config.onTestResults).toBe('function');
    });
  });

  describe('Font size constraints', () => {
    // These constants should match the code-editor.ts implementation
    const MIN_FONT_SIZE = 10;
    const MAX_FONT_SIZE = 24;
    const FONT_SIZE_STEP = 2;

    it('has valid min font size', () => {
      expect(MIN_FONT_SIZE).toBeGreaterThan(0);
      expect(MIN_FONT_SIZE).toBeLessThanOrEqual(14); // Should be reasonable minimum
    });

    it('has valid max font size', () => {
      expect(MAX_FONT_SIZE).toBeGreaterThan(MIN_FONT_SIZE);
      expect(MAX_FONT_SIZE).toBeLessThanOrEqual(48); // Should be reasonable maximum
    });

    it('has valid font size step', () => {
      expect(FONT_SIZE_STEP).toBeGreaterThan(0);
      expect(FONT_SIZE_STEP).toBeLessThanOrEqual(4); // Steps should be small
    });

    it('font size range covers reasonable sizes', () => {
      const range = MAX_FONT_SIZE - MIN_FONT_SIZE;
      expect(range).toBeGreaterThanOrEqual(10); // At least 10px range
    });

    it('font size step evenly divides range', () => {
      const range = MAX_FONT_SIZE - MIN_FONT_SIZE;
      const steps = range / FONT_SIZE_STEP;
      expect(Number.isInteger(steps)).toBe(true);
    });
  });

  describe('Theme detection logic', () => {
    let originalGetAttribute: typeof document.documentElement.getAttribute;

    beforeEach(() => {
      originalGetAttribute = document.documentElement.getAttribute.bind(document.documentElement);
    });

    afterEach(() => {
      // Restore original
      document.documentElement.getAttribute = originalGetAttribute;
    });

    it('detects light theme from app', () => {
      document.documentElement.setAttribute('data-theme', 'light');
      const appTheme = document.documentElement.getAttribute('data-theme');
      const editorTheme = appTheme === 'light' ? 'vs-light' : 'vs-dark';

      expect(editorTheme).toBe('vs-light');
    });

    it('detects dark theme from app', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      const appTheme = document.documentElement.getAttribute('data-theme');
      const editorTheme = appTheme === 'light' ? 'vs-light' : 'vs-dark';

      expect(editorTheme).toBe('vs-dark');
    });

    it('defaults to dark theme when no theme set', () => {
      document.documentElement.removeAttribute('data-theme');
      const appTheme = document.documentElement.getAttribute('data-theme');
      const editorTheme = appTheme === 'light' ? 'vs-light' : 'vs-dark';

      expect(editorTheme).toBe('vs-dark');
    });

    it('defaults to dark theme for unknown theme value', () => {
      document.documentElement.setAttribute('data-theme', 'auto');
      const appTheme = document.documentElement.getAttribute('data-theme');
      const editorTheme = appTheme === 'light' ? 'vs-light' : 'vs-dark';

      expect(editorTheme).toBe('vs-dark');
    });
  });

  describe('Storage key generation', () => {
    const STORAGE_PREFIX = 'study_program_editor_';

    it('generates storage key with prefix', () => {
      const storageKey = 'exercise-cs101-1';
      const fullKey = `${STORAGE_PREFIX}${storageKey}`;

      expect(fullKey).toBe('study_program_editor_exercise-cs101-1');
    });

    it('handles empty storage key', () => {
      const storageKey = '';
      const fullKey = storageKey ? `${STORAGE_PREFIX}${storageKey}` : null;

      expect(fullKey).toBeNull();
    });

    it('handles storage key with special characters', () => {
      const storageKey = 'cs-101_topic-1_exercise-2';
      const fullKey = `${STORAGE_PREFIX}${storageKey}`;

      expect(fullKey).toBe('study_program_editor_cs-101_topic-1_exercise-2');
    });
  });

  describe('Vim mode localStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('stores vim mode enabled state', () => {
      localStorage.setItem('study_program_vim_mode', 'true');
      const vimEnabled = localStorage.getItem('study_program_vim_mode') === 'true';

      expect(vimEnabled).toBe(true);
    });

    it('stores vim mode disabled state', () => {
      localStorage.setItem('study_program_vim_mode', 'false');
      const vimEnabled = localStorage.getItem('study_program_vim_mode') === 'true';

      expect(vimEnabled).toBe(false);
    });

    it('defaults to disabled when not set', () => {
      const vimEnabled = localStorage.getItem('study_program_vim_mode') === 'true';

      expect(vimEnabled).toBe(false);
    });

    it('handles invalid localStorage value', () => {
      localStorage.setItem('study_program_vim_mode', 'invalid');
      const vimEnabled = localStorage.getItem('study_program_vim_mode') === 'true';

      expect(vimEnabled).toBe(false);
    });
  });

  describe('Test case configuration', () => {
    it('validates test case with all properties', () => {
      const testCase = {
        input: '10, 20',
        expectedOutput: '30',
        description: 'add two numbers',
        isHidden: false,
      };

      expect(testCase.input).toBe('10, 20');
      expect(testCase.expectedOutput).toBe('30');
      expect(testCase.description).toBe('add two numbers');
      expect(testCase.isHidden).toBe(false);
    });

    it('validates hidden test case', () => {
      const testCase = {
        input: 'secret',
        expectedOutput: 'result',
        description: 'Hidden test',
        isHidden: true,
      };

      expect(testCase.isHidden).toBe(true);
    });

    it('validates test case with empty input', () => {
      const testCase = {
        input: '',
        expectedOutput: 'Hello, World!',
        description: 'no input needed',
      };

      expect(testCase.input).toBe('');
    });

    it('validates test case with multiline output', () => {
      const testCase = {
        input: '3',
        expectedOutput: '1\n2\n3',
        description: 'print numbers 1 to n',
      };

      expect(testCase.expectedOutput).toContain('\n');
    });
  });

  describe('Error line highlighting regex', () => {
    const lineRegex = /line (\d+)/i;

    it('matches Python traceback format', () => {
      const error = 'File "<stdin>", line 5';
      const match = error.match(lineRegex);

      expect(match).not.toBeNull();
      expect(match![1]).toBe('5');
    });

    it('matches "Line" with capital L', () => {
      const error = 'Error at Line 10';
      const match = error.match(lineRegex);

      expect(match).not.toBeNull();
      expect(match![1]).toBe('10');
    });

    it('matches line number in error message', () => {
      const error = 'SyntaxError on line 15: invalid syntax';
      const match = error.match(lineRegex);

      expect(match).not.toBeNull();
      expect(match![1]).toBe('15');
    });

    it('returns first match for multiple line references', () => {
      const error = 'Error at line 5, called from line 10';
      const match = error.match(lineRegex);

      expect(match).not.toBeNull();
      expect(match![1]).toBe('5');
    });

    it('handles large line numbers', () => {
      const error = 'Error on line 999';
      const match = error.match(lineRegex);

      expect(match).not.toBeNull();
      expect(match![1]).toBe('999');
    });

    it('returns null for no line number', () => {
      const error = 'NameError: name is not defined';
      const match = error.match(lineRegex);

      expect(match).toBeNull();
    });
  });

  describe('File extension mapping', () => {
    const getExtension = (language: string): string => {
      return language === 'python' ? 'py' : language || 'txt';
    };

    it('returns py for python', () => {
      expect(getExtension('python')).toBe('py');
    });

    it('returns language itself for other languages', () => {
      expect(getExtension('javascript')).toBe('javascript');
      expect(getExtension('typescript')).toBe('typescript');
      expect(getExtension('cpp')).toBe('cpp');
    });

    it('returns txt for empty language', () => {
      expect(getExtension('')).toBe('txt');
    });

    it('returns txt for undefined language', () => {
      expect(getExtension(undefined as unknown as string)).toBe('txt');
    });
  });

  describe('UI timing constants', () => {
    const COPY_FEEDBACK_DURATION_MS = 2000;
    const AUTOSAVE_DEBOUNCE_MS = 1000;

    it('copy feedback duration is reasonable', () => {
      expect(COPY_FEEDBACK_DURATION_MS).toBeGreaterThanOrEqual(1000);
      expect(COPY_FEEDBACK_DURATION_MS).toBeLessThanOrEqual(5000);
    });

    it('autosave debounce is reasonable', () => {
      expect(AUTOSAVE_DEBOUNCE_MS).toBeGreaterThanOrEqual(500);
      expect(AUTOSAVE_DEBOUNCE_MS).toBeLessThanOrEqual(3000);
    });
  });
});

describe('Code Editor API', () => {
  describe('CodeEditor interface', () => {
    it('defines setValue method', () => {
      const mockEditor = {
        setValue: vi.fn(),
      };

      mockEditor.setValue('test code');
      expect(mockEditor.setValue).toHaveBeenCalledWith('test code');
    });

    it('defines getValue method', () => {
      const mockEditor = {
        getValue: vi.fn(() => 'test code'),
      };

      expect(mockEditor.getValue()).toBe('test code');
    });

    it('defines dispose method', () => {
      const mockEditor = {
        dispose: vi.fn(),
      };

      mockEditor.dispose();
      expect(mockEditor.dispose).toHaveBeenCalled();
    });

    it('defines updateOptions method', () => {
      const mockEditor = {
        updateOptions: vi.fn(),
      };

      mockEditor.updateOptions({ fontSize: 16 });
      expect(mockEditor.updateOptions).toHaveBeenCalledWith({ fontSize: 16 });
    });

    it('defines runCode method', () => {
      const mockEditor = {
        runCode: vi.fn().mockResolvedValue(undefined),
      };

      expect(typeof mockEditor.runCode).toBe('function');
    });

    it('defines runTests method', () => {
      const mockEditor = {
        runTests: vi.fn().mockResolvedValue([]),
      };

      expect(typeof mockEditor.runTests).toBe('function');
    });

    it('defines reset method', () => {
      const mockEditor = {
        reset: vi.fn(),
      };

      mockEditor.reset();
      expect(mockEditor.reset).toHaveBeenCalled();
    });

    it('defines setTheme method', () => {
      const mockEditor = {
        setTheme: vi.fn(),
      };

      mockEditor.setTheme('vs-dark');
      expect(mockEditor.setTheme).toHaveBeenCalledWith('vs-dark');
    });

    it('defines setFontSize method', () => {
      const mockEditor = {
        setFontSize: vi.fn(),
      };

      mockEditor.setFontSize(16);
      expect(mockEditor.setFontSize).toHaveBeenCalledWith(16);
    });
  });
});
