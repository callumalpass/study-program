import * as monaco from 'monaco-editor';
import { initVimMode, VimMode } from 'monaco-vim';
import { runPython, runTests, type TestResult } from './code-runner';
import type { TestCase } from '@/core/types';
import { Icons } from './icons';
import { escapeHtml } from '@/utils/html';

export interface EditorConfig {
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
  storageKey?: string; // For auto-save to localStorage
  hideTestResults?: boolean; // For exam mode - hide pass/fail until submission
  onRun?: (code: string, output: string) => void;
  onTestResults?: (results: TestResult[], allPassed: boolean) => void;
}

export interface CodeEditor {
  editor: monaco.editor.IStandaloneCodeEditor;
  setValue: (value: string) => void;
  getValue: () => string;
  dispose: () => void;
  updateOptions: (options: monaco.editor.IStandaloneEditorConstructionOptions) => void;
  runCode: () => Promise<void>;
  runTests: () => Promise<TestResult[]>;
  reset: () => void;
  setTheme: (theme: 'vs-dark' | 'vs-light') => void;
  setFontSize: (size: number) => void;
}

// Local storage key prefix
const STORAGE_PREFIX = 'cs_degree_editor_';

// Get the editor theme from the app's current theme
function getEditorThemeFromApp(): 'vs-dark' | 'vs-light' {
  const appTheme = document.documentElement.getAttribute('data-theme');
  return appTheme === 'light' ? 'vs-light' : 'vs-dark';
}

export function createCodeEditor(
  container: HTMLElement,
  config: EditorConfig = {}
): CodeEditor {
  container.innerHTML = '';
  container.className = 'code-editor-container';

  // Default to app theme if no explicit theme provided
  let currentTheme = config.theme || getEditorThemeFromApp();
  let currentFontSize = config.fontSize || 14;
  let isFullscreen = false;
  let hintsRevealed = 0;
  let vimModeEnabled = localStorage.getItem('cs_degree_vim_mode') === 'true';
  let vimModeInstance: VimMode | null = null;

  // Apply light theme class if needed
  if (currentTheme === 'vs-light') {
    container.classList.add('light-theme');
  }

  // Load saved code from localStorage if available
  const storageKey = config.storageKey ? `${STORAGE_PREFIX}${config.storageKey}` : null;
  const savedCode = storageKey ? localStorage.getItem(storageKey) : null;
  const initialCode = savedCode || config.initialValue || '';

  // Main wrapper
  const editorWrapper = document.createElement('div');
  editorWrapper.className = 'editor-wrapper';
  container.appendChild(editorWrapper);

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'editor-toolbar';

  // Left toolbar section (run/clear buttons)
  const toolbarLeft = document.createElement('div');
  toolbarLeft.className = 'toolbar-left';

  // Right toolbar section (controls)
  const toolbarRight = document.createElement('div');
  toolbarRight.className = 'toolbar-right';

  // Run button
  if (config.showRunButton !== false) {
    const runButton = document.createElement('button');
    runButton.className = 'btn btn-primary btn-run';
    runButton.innerHTML = '<span class="btn-icon">▶</span> Run';
    runButton.title = 'Run code (Ctrl+Enter)';
    runButton.onclick = async () => {
      await runCode();
    };
    toolbarLeft.appendChild(runButton);

    // Run tests button (if test cases provided)
    if (config.testCases && config.testCases.length > 0) {
      const runTestsButton = document.createElement('button');
      runTestsButton.className = 'btn btn-secondary btn-run-tests';
      runTestsButton.innerHTML = '<span class="btn-icon">✓</span> Run Tests';
      runTestsButton.title = 'Run all test cases (Ctrl+Shift+Enter)';
      runTestsButton.onclick = async () => {
        await executeTests();
      };
      toolbarLeft.appendChild(runTestsButton);
    }

    const clearButton = document.createElement('button');
    clearButton.className = 'btn btn-ghost btn-clear';
    clearButton.textContent = 'Clear Output';
    clearButton.onclick = () => {
      outputContent.textContent = '';
      outputPanel.classList.remove('show', 'error');
      testResultsPanel.classList.remove('show');
      executionTimeEl.textContent = '';
    };
    toolbarLeft.appendChild(clearButton);
  }

  // Reset button
  const resetButton = document.createElement('button');
  resetButton.className = 'btn btn-ghost btn-reset';
  resetButton.innerHTML = `<span class="btn-icon">${Icons.Refresh}</span> Reset`;
  resetButton.title = 'Reset to starter code';
  resetButton.onclick = () => {
    if (confirm('Reset code to starter template? Your changes will be lost.')) {
      reset();
    }
  };
  toolbarRight.appendChild(resetButton);

  // Copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'btn btn-ghost btn-copy';
  copyButton.innerHTML = `<span class="btn-icon">${Icons.Export}</span> Copy`;
  copyButton.title = 'Copy code to clipboard';
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(editor.getValue());
      copyButton.innerHTML = `<span class="btn-icon">${Icons.Check}</span> Copied!`;
      setTimeout(() => {
        copyButton.innerHTML = `<span class="btn-icon">${Icons.Export}</span> Copy`;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  toolbarRight.appendChild(copyButton);

  // Download button
  const downloadButton = document.createElement('button');
  downloadButton.className = 'btn btn-ghost btn-download';
  downloadButton.innerHTML = `<span class="btn-icon">${Icons.Download}</span> Download`;
  downloadButton.title = 'Download code as file';
  downloadButton.onclick = () => {
    const code = editor.getValue();
    const ext = config.language === 'python' ? 'py' : config.language || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  toolbarRight.appendChild(downloadButton);

  // Separator
  const separator1 = document.createElement('span');
  separator1.className = 'toolbar-separator';
  toolbarRight.appendChild(separator1);

  // Font size controls
  const fontControls = document.createElement('div');
  fontControls.className = 'font-controls';

  const fontDecreaseBtn = document.createElement('button');
  fontDecreaseBtn.className = 'btn btn-ghost btn-font';
  fontDecreaseBtn.innerHTML = 'A-';
  fontDecreaseBtn.title = 'Decrease font size';
  fontDecreaseBtn.onclick = () => {
    if (currentFontSize > 10) {
      setFontSize(currentFontSize - 2);
    }
  };

  const fontSizeDisplay = document.createElement('span');
  fontSizeDisplay.className = 'font-size-display';
  fontSizeDisplay.textContent = `${currentFontSize}px`;

  const fontIncreaseBtn = document.createElement('button');
  fontIncreaseBtn.className = 'btn btn-ghost btn-font';
  fontIncreaseBtn.innerHTML = 'A+';
  fontIncreaseBtn.title = 'Increase font size';
  fontIncreaseBtn.onclick = () => {
    if (currentFontSize < 24) {
      setFontSize(currentFontSize + 2);
    }
  };

  fontControls.appendChild(fontDecreaseBtn);
  fontControls.appendChild(fontSizeDisplay);
  fontControls.appendChild(fontIncreaseBtn);
  toolbarRight.appendChild(fontControls);

  // Theme toggle
  const themeToggle = document.createElement('button');
  themeToggle.className = 'btn btn-ghost btn-theme';
  themeToggle.innerHTML = currentTheme === 'vs-dark' ? Icons.Sun : Icons.Moon;
  themeToggle.title = 'Toggle light/dark theme';
  themeToggle.onclick = () => {
    const newTheme = currentTheme === 'vs-dark' ? 'vs-light' : 'vs-dark';
    setTheme(newTheme);
  };
  toolbarRight.appendChild(themeToggle);

  // Fullscreen toggle
  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'btn btn-ghost btn-fullscreen';
  fullscreenButton.innerHTML = Icons.Monitor;
  fullscreenButton.title = 'Toggle fullscreen';
  fullscreenButton.onclick = () => {
    isFullscreen = !isFullscreen;
    container.classList.toggle('fullscreen', isFullscreen);
    fullscreenButton.innerHTML = Icons.Monitor;
    editor.layout();
  };
  toolbarRight.appendChild(fullscreenButton);

  // Vim mode toggle
  const vimToggle = document.createElement('button');
  vimToggle.className = `btn btn-ghost btn-vim ${vimModeEnabled ? 'active' : ''}`;
  vimToggle.innerHTML = 'VIM';
  vimToggle.title = 'Toggle vim mode';
  toolbarRight.appendChild(vimToggle);

  toolbar.appendChild(toolbarLeft);
  toolbar.appendChild(toolbarRight);
  editorWrapper.appendChild(toolbar);

  // Editor element
  const editorElement = document.createElement('div');
  editorElement.className = 'editor-element';
  editorElement.style.height = config.height || '400px';
  editorWrapper.appendChild(editorElement);

  // Vim status bar
  const vimStatusBar = document.createElement('div');
  vimStatusBar.className = 'vim-status-bar';
  vimStatusBar.style.display = vimModeEnabled ? 'block' : 'none';
  editorWrapper.appendChild(vimStatusBar);

  // Output panel
  const outputPanel = document.createElement('div');
  outputPanel.className = 'output-panel';

  const outputHeader = document.createElement('div');
  outputHeader.className = 'output-header';

  const outputTitle = document.createElement('span');
  outputTitle.textContent = 'Output';
  outputHeader.appendChild(outputTitle);

  const executionTimeEl = document.createElement('span');
  executionTimeEl.className = 'execution-time';
  outputHeader.appendChild(executionTimeEl);

  outputPanel.appendChild(outputHeader);

  const outputContent = document.createElement('pre');
  outputContent.className = 'output-content';
  outputPanel.appendChild(outputContent);

  container.appendChild(outputPanel);

  // Test results panel
  const testResultsPanel = document.createElement('div');
  testResultsPanel.className = 'test-results-panel';

  const testResultsHeader = document.createElement('div');
  testResultsHeader.className = 'test-results-header';
  testResultsHeader.innerHTML = '<span>Test Results</span>';
  testResultsPanel.appendChild(testResultsHeader);

  const testResultsContent = document.createElement('div');
  testResultsContent.className = 'test-results-content';
  testResultsPanel.appendChild(testResultsContent);

  container.appendChild(testResultsPanel);

  // Hints panel (if hints provided)
  if (config.hints && config.hints.length > 0) {
    const hintsPanel = document.createElement('div');
    hintsPanel.className = 'hints-panel';

    const hintsHeader = document.createElement('div');
    hintsHeader.className = 'hints-header';

    const hintsTitle = document.createElement('span');
    hintsTitle.className = 'hints-title';
    hintsTitle.innerHTML = `<span class="panel-icon">${Icons.LightBulb}</span> Hints (${config.hints.length} available)`;
    hintsHeader.appendChild(hintsTitle);

    const showHintButton = document.createElement('button');
    showHintButton.className = 'btn btn-ghost btn-show-hint';
    showHintButton.textContent = 'Show Hint';
    showHintButton.onclick = () => {
      if (hintsRevealed < config.hints!.length) {
        hintsRevealed++;
        renderHints();
      }
    };
    hintsHeader.appendChild(showHintButton);

    hintsPanel.appendChild(hintsHeader);

    const hintsContent = document.createElement('div');
    hintsContent.className = 'hints-content';
    hintsPanel.appendChild(hintsContent);

    container.appendChild(hintsPanel);

    function renderHints() {
      hintsContent.innerHTML = '';
      for (let i = 0; i < hintsRevealed; i++) {
        const hintEl = document.createElement('div');
        hintEl.className = 'hint-item';
        hintEl.innerHTML = `<span class="hint-number">Hint ${i + 1}:</span> ${config.hints![i]}`;
        hintsContent.appendChild(hintEl);
      }
      if (hintsRevealed >= config.hints!.length) {
        showHintButton.disabled = true;
        showHintButton.textContent = 'All hints shown';
      } else {
        showHintButton.textContent = `Show Hint (${hintsRevealed}/${config.hints!.length})`;
      }
    }
  }

  // Solution panel (if solution provided)
  if (config.solution) {
    const solutionPanel = document.createElement('div');
    solutionPanel.className = 'solution-panel';

    const solutionHeader = document.createElement('div');
    solutionHeader.className = 'solution-header';

    const solutionTitle = document.createElement('span');
    solutionTitle.className = 'solution-title';
    solutionTitle.innerHTML = `<span class="panel-icon">${Icons.Lock}</span> Solution`;
    solutionHeader.appendChild(solutionTitle);

    const showSolutionButton = document.createElement('button');
    showSolutionButton.className = 'btn btn-ghost btn-show-solution';
    showSolutionButton.textContent = 'Reveal Solution';

    const solutionContent = document.createElement('div');
    solutionContent.className = 'solution-content hidden';

    const solutionPre = document.createElement('pre');
    solutionPre.className = 'solution-code';
    solutionPre.textContent = config.solution;
    solutionContent.appendChild(solutionPre);

    showSolutionButton.onclick = () => {
      if (solutionContent.classList.contains('hidden')) {
        if (confirm('Are you sure you want to see the solution? Try solving it yourself first!')) {
          solutionContent.classList.remove('hidden');
          showSolutionButton.textContent = 'Hide Solution';
        }
      } else {
        solutionContent.classList.add('hidden');
        showSolutionButton.textContent = 'Reveal Solution';
      }
    };
    solutionHeader.appendChild(showSolutionButton);

    solutionPanel.appendChild(solutionHeader);
    solutionPanel.appendChild(solutionContent);
    container.appendChild(solutionPanel);
  }

  // Create Monaco editor
  const editor = monaco.editor.create(editorElement, {
    value: initialCode,
    language: config.language || 'python',
    theme: currentTheme,
    readOnly: config.readOnly || false,
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
    glyphMargin: true, // For error markers
    lineDecorationsWidth: 10,
  });

  // Auto-save to localStorage
  if (storageKey) {
    let saveTimeout: ReturnType<typeof setTimeout>;
    editor.onDidChangeModelContent(() => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem(storageKey, editor.getValue());
      }, 1000); // Debounce save
    });
  }

  // Error decorations collection
  let errorDecorations: string[] = [];

  // Vim mode functions
  function enableVimMode() {
    if (!vimModeInstance) {
      vimModeInstance = initVimMode(editor, vimStatusBar);
    }
    vimModeEnabled = true;
    localStorage.setItem('cs_degree_vim_mode', 'true');
    vimToggle.classList.add('active');
    vimStatusBar.style.display = 'block';
  }

  function disableVimMode() {
    if (vimModeInstance) {
      vimModeInstance.dispose();
      vimModeInstance = null;
    }
    vimModeEnabled = false;
    localStorage.setItem('cs_degree_vim_mode', 'false');
    vimToggle.classList.remove('active');
    vimStatusBar.style.display = 'none';
  }

  // Initialize vim mode if enabled
  if (vimModeEnabled) {
    enableVimMode();
  }

  // Vim toggle click handler
  vimToggle.onclick = () => {
    if (vimModeEnabled) {
      disableVimMode();
    } else {
      enableVimMode();
    }
  };

  // Run code function
  async function runCode() {
    const code = editor.getValue();
    outputContent.textContent = 'Running...';
    outputPanel.classList.add('show');
    outputPanel.classList.remove('error');
    testResultsPanel.classList.remove('show');

    // Clear previous error decorations
    errorDecorations = editor.deltaDecorations(errorDecorations, []);

    const startTime = performance.now();

    try {
      const result = await runPython(code);
      const endTime = performance.now();
      const executionMs = Math.round(endTime - startTime);

      outputContent.textContent = result || '(No output)';
      executionTimeEl.textContent = `${executionMs}ms`;

      if (config.onRun) {
        config.onRun(code, result);
      }
    } catch (error) {
      const endTime = performance.now();
      const executionMs = Math.round(endTime - startTime);
      executionTimeEl.textContent = `${executionMs}ms`;

      outputPanel.classList.add('error');
      const errorMessage = error instanceof Error ? error.message : String(error);
      outputContent.textContent = `Error: ${errorMessage}`;

      // Highlight error line
      highlightErrorLine(errorMessage);
    }
  }

  // Execute tests function
  async function executeTests(): Promise<TestResult[]> {
    if (!config.testCases || config.testCases.length === 0) {
      return [];
    }

    if (!config.solution) {
      console.error('No solution provided for test validation');
      return [];
    }

    const code = editor.getValue();
    outputContent.textContent = 'Running tests...';
    outputPanel.classList.add('show');
    outputPanel.classList.remove('error');
    testResultsPanel.classList.add('show');

    // Clear previous error decorations
    errorDecorations = editor.deltaDecorations(errorDecorations, []);

    const startTime = performance.now();

    try {
      const results = await runTests(code, config.testCases, config.solution);
      const endTime = performance.now();
      const executionMs = Math.round(endTime - startTime);

      const passed = results.filter(r => r.passed).length;
      const total = results.length;
      const allPassed = passed === total;

      outputContent.textContent = `Tests: ${passed}/${total} passed`;
      executionTimeEl.textContent = `${executionMs}ms`;

      if (!allPassed) {
        outputPanel.classList.add('error');
      }

      // Render test results (hide in exam mode)
      renderTestResults(results, config.hideTestResults);

      if (config.onTestResults) {
        config.onTestResults(results, allPassed);
      }

      return results;
    } catch (error) {
      const endTime = performance.now();
      const executionMs = Math.round(endTime - startTime);
      executionTimeEl.textContent = `${executionMs}ms`;

      outputPanel.classList.add('error');
      const errorMessage = error instanceof Error ? error.message : String(error);
      outputContent.textContent = `Error: ${errorMessage}`;
      highlightErrorLine(errorMessage);

      return [];
    }
  }

  // Render test results
  function renderTestResults(results: TestResult[], hideResults = false) {
    testResultsContent.innerHTML = '';

    // In exam mode (hideResults), don't show pass/fail - just show that tests ran
    if (hideResults) {
      const summaryEl = document.createElement('div');
      summaryEl.className = 'test-result exam-mode';
      summaryEl.innerHTML = `
        <div class="test-result-header">
          <span class="test-name">${results.length} test${results.length !== 1 ? 's' : ''} executed</span>
          <span class="test-status">Results shown after submission</span>
        </div>
      `;
      testResultsContent.appendChild(summaryEl);
      return;
    }

    results.forEach((result, index) => {
      const testCase = result.testCase;
      const isHidden = testCase.isHidden;

      const testEl = document.createElement('div');
      testEl.className = `test-result ${result.passed ? 'passed' : 'failed'}`;

      const badgeIcon = result.passed ? Icons.Check : Icons.Cross;
      const status = result.passed ? 'Passed' : 'Failed';

      let content = `
        <div class="test-result-header">
          <span class="test-badge ${result.passed ? 'passed' : 'failed'}">${badgeIcon}</span>
          <span class="test-name">Test ${index + 1}: ${testCase.description || 'Test case'}</span>
          <span class="test-status ${result.passed ? 'passed' : 'failed'}">${status}</span>
        </div>
      `;

      if (!isHidden || !result.passed) {
        content += `
          <div class="test-details">
            ${!isHidden ? `<div class="test-input"><strong>Input:</strong> <code>${escapeHtml(testCase.input || '(none)')}</code></div>` : ''}
            ${!isHidden ? `<div class="test-expected"><strong>Expected:</strong> <code>${escapeHtml(result.expectedOutput)}</code></div>` : ''}
            ${!result.passed ? `<div class="test-actual"><strong>Got:</strong> <code>${escapeHtml(result.actualOutput || result.error || '(no output)')}</code></div>` : ''}
          </div>
        `;
      }

      testEl.innerHTML = content;
      testResultsContent.appendChild(testEl);
    });
  }

  // Highlight error line from Python traceback
  function highlightErrorLine(errorMessage: string) {
    // Match Python traceback line numbers: "line X" or "Line X"
    const lineMatch = errorMessage.match(/line (\d+)/i);
    if (lineMatch) {
      const lineNumber = parseInt(lineMatch[1], 10);

      errorDecorations = editor.deltaDecorations(errorDecorations, [
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

      // Scroll to error line
      editor.revealLineInCenter(lineNumber);
    }
  }

  // Reset to starter code
  function reset() {
    editor.setValue(config.starterCode || config.initialValue || '');
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
    outputContent.textContent = '';
    outputPanel.classList.remove('show', 'error');
    testResultsPanel.classList.remove('show');
    executionTimeEl.textContent = '';
    errorDecorations = editor.deltaDecorations(errorDecorations, []);
  }

  // Set theme
  function setTheme(theme: 'vs-dark' | 'vs-light') {
    currentTheme = theme;
    monaco.editor.setTheme(theme);
    themeToggle.innerHTML = theme === 'vs-dark' ? Icons.Sun : Icons.Moon;
    container.classList.toggle('light-theme', theme === 'vs-light');
  }

  // Set font size
  function setFontSize(size: number) {
    currentFontSize = size;
    editor.updateOptions({ fontSize: size });
    fontSizeDisplay.textContent = `${size}px`;
  }

  // Keyboard shortcuts
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    runCode();
  });

  if (config.testCases && config.testCases.length > 0) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      executeTests();
    });
  }

  // Escape key exits fullscreen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullscreen) {
      isFullscreen = false;
      container.classList.remove('fullscreen');
      editor.layout();
    }
  });

  // Return editor API
  return {
    editor,
    setValue: (value: string) => {
      editor.setValue(value);
    },
    getValue: () => {
      return editor.getValue();
    },
    dispose: () => {
      if (vimModeInstance) {
        vimModeInstance.dispose();
        vimModeInstance = null;
      }
      editor.dispose();
    },
    updateOptions: (options: monaco.editor.IStandaloneEditorConstructionOptions) => {
      editor.updateOptions(options);
    },
    runCode,
    runTests: executeTests,
    reset,
    setTheme,
    setFontSize,
  };
}
