import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import * as monaco from 'monaco-editor';
import { initVimMode, VimMode } from 'monaco-vim';
import { runPython, runTests, type TestResult } from '@/components/code-runner';
import type { TestCase } from '@/core/types';
import { Icons } from '@/components/icons';
import { escapeHtml } from '@/utils/html';

export interface CodeEditorProps {
  language?: string;
  theme?: 'vs-dark' | 'vs-light';
  readOnly?: boolean;
  initialValue?: string;
  starterCode?: string;
  height?: string;
  fontSize?: number;
  showRunButton?: boolean;
  testCases?: TestCase[];
  hints?: string[];
  solution?: string;
  storageKey?: string;
  hideTestResults?: boolean;
  onRun?: (code: string, output: string) => void;
  onTestResults?: (results: TestResult[], allPassed: boolean) => void;
  onChange?: (code: string) => void;
}

export interface CodeEditorRef {
  getValue: () => string;
  setValue: (value: string) => void;
  runCode: () => Promise<void>;
  runTests: () => Promise<TestResult[]>;
  reset: () => void;
}

const STORAGE_PREFIX = 'cs_degree_editor_';

function getEditorThemeFromApp(): 'vs-dark' | 'vs-light' {
  const appTheme = document.documentElement.getAttribute('data-theme');
  return appTheme === 'light' ? 'vs-light' : 'vs-dark';
}

export function CodeEditor({
  language = 'python',
  theme: initialTheme,
  readOnly = false,
  initialValue = '',
  starterCode = '',
  height = '400px',
  fontSize: initialFontSize = 14,
  showRunButton = true,
  testCases = [],
  hints = [],
  solution,
  storageKey,
  hideTestResults = false,
  onRun,
  onTestResults,
  onChange,
}: CodeEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const vimStatusRef = useRef<HTMLDivElement>(null);
  const vimModeRef = useRef<VimMode | null>(null);
  const errorDecorationsRef = useRef<string[]>([]);

  const [currentTheme, setCurrentTheme] = useState(initialTheme || getEditorThemeFromApp());
  const [currentFontSize, setCurrentFontSize] = useState(initialFontSize);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [vimEnabled, setVimEnabled] = useState(() =>
    localStorage.getItem('cs_degree_vim_mode') === 'true'
  );
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // Output state
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // Test results state
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);

  // Load saved code
  const fullStorageKey = storageKey ? `${STORAGE_PREFIX}${storageKey}` : null;
  const savedCode = fullStorageKey ? localStorage.getItem(fullStorageKey) : null;
  const startingCode = savedCode || initialValue || starterCode || '';

  // Initialize Monaco editor
  useEffect(() => {
    if (!editorContainerRef.current) return;

    const editor = monaco.editor.create(editorContainerRef.current, {
      value: startingCode,
      language,
      theme: currentTheme,
      readOnly,
      fontSize: currentFontSize,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      folding: true,
      glyphMargin: true,
      lineDecorationsWidth: 10,
    });

    editorRef.current = editor;

    // Auto-save to localStorage
    if (fullStorageKey) {
      let saveTimeout: ReturnType<typeof setTimeout>;
      editor.onDidChangeModelContent(() => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          localStorage.setItem(fullStorageKey, editor.getValue());
        }, 1000);
        onChange?.(editor.getValue());
      });
    } else if (onChange) {
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });
    }

    // Keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRunCode();
    });

    if (testCases.length > 0) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
        handleRunTests();
      });
    }

    // Initialize vim mode if enabled
    if (vimEnabled && vimStatusRef.current) {
      vimModeRef.current = initVimMode(editor, vimStatusRef.current);
    }

    return () => {
      if (vimModeRef.current) {
        vimModeRef.current.dispose();
        vimModeRef.current = null;
      }
      editor.dispose();
      editorRef.current = null;
    };
  }, []);

  // Update theme
  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setTheme(currentTheme);
    }
  }, [currentTheme]);

  // Update font size
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize: currentFontSize });
    }
  }, [currentFontSize]);

  // Handle vim mode toggle
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !vimStatusRef.current) return;

    if (vimEnabled && !vimModeRef.current) {
      vimModeRef.current = initVimMode(editor, vimStatusRef.current);
      localStorage.setItem('cs_degree_vim_mode', 'true');
    } else if (!vimEnabled && vimModeRef.current) {
      vimModeRef.current.dispose();
      vimModeRef.current = null;
      localStorage.setItem('cs_degree_vim_mode', 'false');
    }
  }, [vimEnabled]);

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        editorRef.current?.layout();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  // Highlight error line from Python traceback
  const highlightErrorLine = useCallback((errorMessage: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const lineMatch = errorMessage.match(/line (\d+)/i);
    if (lineMatch) {
      const lineNumber = parseInt(lineMatch[1], 10);
      errorDecorationsRef.current = editor.deltaDecorations(errorDecorationsRef.current, [
        {
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            className: 'error-line-highlight',
            glyphMarginClassName: 'error-glyph',
            glyphMarginHoverMessage: { value: errorMessage },
          },
        },
      ]);
      editor.revealLineInCenter(lineNumber);
    }
  }, []);

  // Clear error decorations
  const clearErrorDecorations = useCallback(() => {
    if (editorRef.current) {
      errorDecorationsRef.current = editorRef.current.deltaDecorations(errorDecorationsRef.current, []);
    }
  }, []);

  // Run code
  const handleRunCode = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor) return;

    const code = editor.getValue();
    setOutput('Running...');
    setShowOutput(true);
    setIsError(false);
    setShowTestResults(false);
    clearErrorDecorations();

    const startTime = performance.now();

    try {
      const result = await runPython(code);
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));
      setOutput(result || '(No output)');
      onRun?.(code, result);
    } catch (error) {
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));
      setIsError(true);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`Error: ${errorMessage}`);
      highlightErrorLine(errorMessage);
    }
  }, [onRun, highlightErrorLine, clearErrorDecorations]);

  // Run tests
  const handleRunTests = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor || testCases.length === 0 || !solution) return;

    const code = editor.getValue();
    setOutput('Running tests...');
    setShowOutput(true);
    setIsError(false);
    setShowTestResults(true);
    clearErrorDecorations();

    const startTime = performance.now();

    try {
      const results = await runTests(code, testCases, solution);
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));

      const passed = results.filter(r => r.passed).length;
      const total = results.length;
      const allPassed = passed === total;

      setTestResults(results);
      setOutput(`Tests: ${passed}/${total} passed`);
      if (!allPassed) {
        setIsError(true);
      }

      onTestResults?.(results, allPassed);
      return results;
    } catch (error) {
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));
      setIsError(true);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`Error: ${errorMessage}`);
      highlightErrorLine(errorMessage);
      return [];
    }
  }, [testCases, solution, onTestResults, highlightErrorLine, clearErrorDecorations]);

  // Reset to starter code
  const handleReset = useCallback(() => {
    if (!confirm('Reset code to starter template? Your changes will be lost.')) return;

    const editor = editorRef.current;
    if (!editor) return;

    editor.setValue(starterCode || initialValue || '');
    if (fullStorageKey) {
      localStorage.removeItem(fullStorageKey);
    }
    setOutput('');
    setShowOutput(false);
    setIsError(false);
    setShowTestResults(false);
    setTestResults([]);
    setExecutionTime(null);
    clearErrorDecorations();
  }, [starterCode, initialValue, fullStorageKey, clearErrorDecorations]);

  // Clear output
  const handleClearOutput = useCallback(() => {
    setOutput('');
    setShowOutput(false);
    setIsError(false);
    setShowTestResults(false);
    setTestResults([]);
    setExecutionTime(null);
  }, []);

  // Copy code
  const handleCopy = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor) return;

    try {
      await navigator.clipboard.writeText(editor.getValue());
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // Download code
  const handleDownload = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const code = editor.getValue();
    const ext = language === 'python' ? 'py' : language || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [language]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => prev === 'vs-dark' ? 'vs-light' : 'vs-dark');
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
    setTimeout(() => editorRef.current?.layout(), 0);
  }, []);

  // Toggle vim mode
  const toggleVim = useCallback(() => {
    setVimEnabled(prev => !prev);
  }, []);

  // Reveal hint
  const revealHint = useCallback(() => {
    if (hintsRevealed < hints.length) {
      setHintsRevealed(prev => prev + 1);
    }
  }, [hintsRevealed, hints.length]);

  // Toggle solution
  const toggleSolution = useCallback(() => {
    if (!showSolution) {
      if (!confirm('Are you sure you want to see the solution? Try solving it yourself first!')) {
        return;
      }
    }
    setShowSolution(prev => !prev);
  }, [showSolution]);

  const containerClass = `code-editor-container ${currentTheme === 'vs-light' ? 'light-theme' : ''} ${isFullscreen ? 'fullscreen' : ''}`;

  return (
    <div class={containerClass}>
      <div class="editor-wrapper">
        {/* Toolbar */}
        <div class="editor-toolbar">
          <div class="toolbar-left">
            {showRunButton && (
              <>
                <button class="btn btn-primary btn-run" onClick={handleRunCode} title="Run code (Ctrl+Enter)">
                  <span class="btn-icon">▶</span> Run
                </button>
                {testCases.length > 0 && (
                  <button class="btn btn-secondary btn-run-tests" onClick={handleRunTests} title="Run all test cases (Ctrl+Shift+Enter)">
                    <span class="btn-icon">✓</span> Run Tests
                  </button>
                )}
                <button class="btn btn-ghost btn-clear" onClick={handleClearOutput}>
                  Clear Output
                </button>
              </>
            )}
          </div>
          <div class="toolbar-right">
            <button class="btn btn-ghost btn-reset" onClick={handleReset} title="Reset to starter code">
              <span class="btn-icon" dangerouslySetInnerHTML={{ __html: Icons.Refresh }} /> Reset
            </button>
            <button class="btn btn-ghost btn-copy" onClick={handleCopy} title="Copy code to clipboard">
              <span class="btn-icon" dangerouslySetInnerHTML={{ __html: Icons.Export }} /> Copy
            </button>
            <button class="btn btn-ghost btn-download" onClick={handleDownload} title="Download code as file">
              <span class="btn-icon" dangerouslySetInnerHTML={{ __html: Icons.Download }} /> Download
            </button>
            <span class="toolbar-separator" />
            <div class="font-controls">
              <button
                class="btn btn-ghost btn-font"
                onClick={() => currentFontSize > 10 && setCurrentFontSize(prev => prev - 2)}
                title="Decrease font size"
              >
                A-
              </button>
              <span class="font-size-display">{currentFontSize}px</span>
              <button
                class="btn btn-ghost btn-font"
                onClick={() => currentFontSize < 24 && setCurrentFontSize(prev => prev + 2)}
                title="Increase font size"
              >
                A+
              </button>
            </div>
            <button class="btn btn-ghost btn-theme" onClick={toggleTheme} title="Toggle light/dark theme">
              <span dangerouslySetInnerHTML={{ __html: currentTheme === 'vs-dark' ? Icons.Sun : Icons.Moon }} />
            </button>
            <button class="btn btn-ghost btn-fullscreen" onClick={toggleFullscreen} title="Toggle fullscreen">
              <span dangerouslySetInnerHTML={{ __html: Icons.Monitor }} />
            </button>
            <button
              class={`btn btn-ghost btn-vim ${vimEnabled ? 'active' : ''}`}
              onClick={toggleVim}
              title="Toggle vim mode"
            >
              VIM
            </button>
          </div>
        </div>

        {/* Editor */}
        <div ref={editorContainerRef} class="editor-element" style={{ height }} />

        {/* Vim status bar */}
        <div ref={vimStatusRef} class="vim-status-bar" style={{ display: vimEnabled ? 'block' : 'none' }} />
      </div>

      {/* Output panel */}
      <div class={`output-panel ${showOutput ? 'show' : ''} ${isError ? 'error' : ''}`}>
        <div class="output-header">
          <span>Output</span>
          {executionTime !== null && <span class="execution-time">{executionTime}ms</span>}
        </div>
        <pre class="output-content">{output}</pre>
      </div>

      {/* Test results panel */}
      {showTestResults && (
        <div class="test-results-panel show">
          <div class="test-results-header">
            <span>Test Results</span>
          </div>
          <div class="test-results-content">
            {hideTestResults ? (
              <div class="test-result exam-mode">
                <div class="test-result-header">
                  <span class="test-name">{testResults.length} test{testResults.length !== 1 ? 's' : ''} executed</span>
                  <span class="test-status">Results shown after submission</span>
                </div>
              </div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} class={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                  <div class="test-result-header">
                    <span
                      class={`test-badge ${result.passed ? 'passed' : 'failed'}`}
                      dangerouslySetInnerHTML={{ __html: result.passed ? Icons.Check : Icons.Cross }}
                    />
                    <span class="test-name">Test {index + 1}: {result.testCase.description || 'Test case'}</span>
                    <span class={`test-status ${result.passed ? 'passed' : 'failed'}`}>
                      {result.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                  {(!result.testCase.isHidden || !result.passed) && (
                    <div class="test-details">
                      {!result.testCase.isHidden && (
                        <>
                          <div class="test-input">
                            <strong>Input:</strong> <code>{escapeHtml(result.testCase.input || '(none)')}</code>
                          </div>
                          <div class="test-expected">
                            <strong>Expected:</strong> <code>{escapeHtml(result.expectedOutput)}</code>
                          </div>
                        </>
                      )}
                      {!result.passed && (
                        <div class="test-actual">
                          <strong>Got:</strong> <code>{escapeHtml(result.actualOutput || result.error || '(no output)')}</code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Hints panel */}
      {hints.length > 0 && (
        <div class="hints-panel">
          <div class="hints-header">
            <span class="hints-title">
              <span class="panel-icon" dangerouslySetInnerHTML={{ __html: Icons.LightBulb }} />
              {' '}Hints ({hints.length} available)
            </span>
            <button
              class="btn btn-ghost btn-show-hint"
              onClick={revealHint}
              disabled={hintsRevealed >= hints.length}
            >
              {hintsRevealed >= hints.length ? 'All hints shown' : `Show Hint (${hintsRevealed}/${hints.length})`}
            </button>
          </div>
          {hintsRevealed > 0 && (
            <div class="hints-content">
              {hints.slice(0, hintsRevealed).map((hint, i) => (
                <div key={i} class="hint-item">
                  <span class="hint-number">Hint {i + 1}:</span> {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Solution panel */}
      {solution && (
        <div class="solution-panel">
          <div class="solution-header">
            <span class="solution-title">
              <span class="panel-icon" dangerouslySetInnerHTML={{ __html: Icons.Lock }} />
              {' '}Solution
            </span>
            <button class="btn btn-ghost btn-show-solution" onClick={toggleSolution}>
              {showSolution ? 'Hide Solution' : 'Reveal Solution'}
            </button>
          </div>
          {showSolution && (
            <div class="solution-content">
              <pre class="solution-code">{solution}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for quiz coding questions (no hints/solution panels)
export function CompactCodeEditor({
  language = 'python',
  initialValue = '',
  height = '300px',
  testCases = [],
  solution,
  hideTestResults = false,
  onChange,
  onTestResults,
}: {
  language?: string;
  initialValue?: string;
  height?: string;
  testCases?: TestCase[];
  solution?: string;
  hideTestResults?: boolean;
  onChange?: (code: string) => void;
  onTestResults?: (results: TestResult[], allPassed: boolean) => void;
}) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const [currentTheme] = useState(getEditorThemeFromApp());
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);

  useEffect(() => {
    if (!editorContainerRef.current) return;

    const editor = monaco.editor.create(editorContainerRef.current, {
      value: initialValue,
      language,
      theme: currentTheme,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: 'on',
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
    });

    editorRef.current = editor;

    if (onChange) {
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });
    }

    return () => {
      editor.dispose();
      editorRef.current = null;
    };
  }, []);

  const handleRunCode = async () => {
    const editor = editorRef.current;
    if (!editor) return;

    const code = editor.getValue();
    setOutput('Running...');
    setShowOutput(true);
    setIsError(false);

    try {
      const result = await runPython(code);
      setOutput(result || '(No output)');
    } catch (error) {
      setIsError(true);
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleRunTests = async () => {
    const editor = editorRef.current;
    if (!editor || testCases.length === 0 || !solution) return;

    const code = editor.getValue();
    setOutput('Running tests...');
    setShowOutput(true);
    setIsError(false);
    setShowTestResults(true);

    try {
      const results = await runTests(code, testCases, solution);
      const passed = results.filter(r => r.passed).length;
      const allPassed = passed === results.length;

      setTestResults(results);
      setOutput(`Tests: ${passed}/${results.length} passed`);
      if (!allPassed) setIsError(true);

      onTestResults?.(results, allPassed);
    } catch (error) {
      setIsError(true);
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div class={`code-editor-container compact ${currentTheme === 'vs-light' ? 'light-theme' : ''}`}>
      <div class="editor-toolbar compact">
        <button class="btn btn-primary btn-sm" onClick={handleRunCode}>
          <span class="btn-icon">▶</span> Run
        </button>
        {testCases.length > 0 && (
          <button class="btn btn-secondary btn-sm" onClick={handleRunTests}>
            <span class="btn-icon">✓</span> Test
          </button>
        )}
      </div>
      <div ref={editorContainerRef} class="editor-element" style={{ height }} />

      {showOutput && (
        <div class={`output-panel show compact ${isError ? 'error' : ''}`}>
          <pre class="output-content">{output}</pre>
        </div>
      )}

      {showTestResults && testResults.length > 0 && (
        <div class="test-results-panel show compact">
          {hideTestResults ? (
            <div class="test-result-summary">Tests executed - results shown after submission</div>
          ) : (
            <div class="test-results-compact">
              {testResults.map((result, i) => (
                <span
                  key={i}
                  class={`test-indicator ${result.passed ? 'passed' : 'failed'}`}
                  title={`Test ${i + 1}: ${result.passed ? 'Passed' : 'Failed'}`}
                  dangerouslySetInnerHTML={{ __html: result.passed ? Icons.Check : Icons.Cross }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
