import * as monaco from 'monaco-editor';
import { initVimMode, VimMode } from 'monaco-vim';
import { Icons } from './icons';
import { evaluateWrittenExercise, type EvaluationResult } from '@/utils/gemini-eval';
import { progressStorage } from '@/core/storage';

export interface ProofEditorConfig {
  initialValue?: string;
  height?: string;
  fontSize?: number;
  storageKey?: string;
  hints?: string[];
  solution?: string;
  problem?: string; // Problem description for AI evaluation
  onSave?: (content: string, timeSpentSeconds: number) => void;
  onEvaluate?: (result: EvaluationResult) => void;
}

export interface ProofEditor {
  editor: monaco.editor.IStandaloneCodeEditor;
  setValue: (value: string) => void;
  getValue: () => string;
  dispose: () => void;
  save: () => void;
  setTheme: (theme: 'vs-dark' | 'vs-light') => void;
  setFontSize: (size: number) => void;
}

const STORAGE_PREFIX = 'cs_degree_proof_';

export function createProofEditor(
  container: HTMLElement,
  config: ProofEditorConfig = {}
): ProofEditor {
  container.innerHTML = '';
  container.className = 'proof-editor-container';

  let currentTheme: 'vs-dark' | 'vs-light' = 'vs-dark';
  let currentFontSize = config.fontSize || 14;
  let isFullscreen = false;
  let hintsRevealed = 0;
  let vimModeEnabled = localStorage.getItem('cs_degree_vim_mode') === 'true';
  let vimModeInstance: VimMode | null = null;
  let isSaved = true;
  const startTime = Date.now();

  // Load saved content from localStorage
  const storageKey = config.storageKey ? `${STORAGE_PREFIX}${config.storageKey}` : null;
  const savedContent = storageKey ? localStorage.getItem(storageKey) : null;
  const initialContent = savedContent || config.initialValue || '';

  // Main wrapper
  const editorWrapper = document.createElement('div');
  editorWrapper.className = 'editor-wrapper';
  container.appendChild(editorWrapper);

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'editor-toolbar';

  // Left toolbar section
  const toolbarLeft = document.createElement('div');
  toolbarLeft.className = 'toolbar-left';

  // Right toolbar section
  const toolbarRight = document.createElement('div');
  toolbarRight.className = 'toolbar-right';

  // Save button
  const saveButton = document.createElement('button');
  saveButton.className = 'btn btn-primary btn-save';
  saveButton.innerHTML = `<span class="btn-icon">${Icons.Check}</span> Save Proof`;
  saveButton.title = 'Save your proof (Ctrl+S)';
  saveButton.onclick = () => save();
  toolbarLeft.appendChild(saveButton);

  // AI Evaluate button (only show if API key is configured and problem is provided)
  const geminiApiKey = progressStorage.getSettings().geminiApiKey;
  const canEvaluate = geminiApiKey && config.problem && config.solution;

  let evaluateButton: HTMLButtonElement | null = null;
  if (canEvaluate) {
    evaluateButton = document.createElement('button');
    evaluateButton.className = 'btn btn-secondary btn-evaluate';
    evaluateButton.innerHTML = `<span class="btn-icon">${Icons.Beaker}</span> AI Evaluate`;
    evaluateButton.title = 'Get AI feedback on your proof';
    toolbarLeft.appendChild(evaluateButton);
  }

  // Save status indicator
  const saveStatus = document.createElement('span');
  saveStatus.className = 'save-status saved';
  saveStatus.innerHTML = `${Icons.Check} Saved`;
  toolbarLeft.appendChild(saveStatus);

  // Clear button
  const clearButton = document.createElement('button');
  clearButton.className = 'btn btn-ghost btn-clear';
  clearButton.textContent = 'Clear';
  clearButton.onclick = () => {
    if (confirm('Clear your proof? This cannot be undone.')) {
      editor.setValue('');
      if (storageKey) {
        localStorage.removeItem(storageKey);
      }
      markUnsaved();
    }
  };
  toolbarLeft.appendChild(clearButton);

  // Copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'btn btn-ghost btn-copy';
  copyButton.innerHTML = `<span class="btn-icon">${Icons.Export}</span> Copy`;
  copyButton.title = 'Copy to clipboard';
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
  editorElement.style.height = config.height || '300px';
  editorWrapper.appendChild(editorElement);

  // Vim status bar
  const vimStatusBar = document.createElement('div');
  vimStatusBar.className = 'vim-status-bar';
  vimStatusBar.style.display = vimModeEnabled ? 'block' : 'none';
  editorWrapper.appendChild(vimStatusBar);

  // Hints panel
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

  // Solution panel
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

  // AI Evaluation results panel
  let evaluationPanel: HTMLElement | null = null;
  let evaluationContent: HTMLElement | null = null;

  if (canEvaluate) {
    evaluationPanel = document.createElement('div');
    evaluationPanel.className = 'evaluation-panel hidden';

    const evalHeader = document.createElement('div');
    evalHeader.className = 'evaluation-header';

    const evalTitle = document.createElement('span');
    evalTitle.className = 'evaluation-title';
    evalTitle.innerHTML = `<span class="panel-icon">${Icons.Beaker}</span> AI Evaluation`;
    evalHeader.appendChild(evalTitle);

    evaluationPanel.appendChild(evalHeader);

    evaluationContent = document.createElement('div');
    evaluationContent.className = 'evaluation-content';
    evaluationPanel.appendChild(evaluationContent);

    container.appendChild(evaluationPanel);
  }

  // Create Monaco editor with markdown for LaTeX/proof support
  const editor = monaco.editor.create(editorElement, {
    value: initialContent,
    language: 'markdown',
    theme: currentTheme,
    fontSize: currentFontSize,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    lineNumbers: 'on',
    renderWhitespace: 'selection',
    tabSize: 2,
    insertSpaces: true,
    wordWrap: 'on',
    folding: true,
    lineDecorationsWidth: 10,
  });

  // Track unsaved changes
  function markUnsaved() {
    isSaved = false;
    saveStatus.className = 'save-status unsaved';
    saveStatus.innerHTML = 'Unsaved changes';
  }

  function markSaved() {
    isSaved = true;
    saveStatus.className = 'save-status saved';
    saveStatus.innerHTML = `${Icons.Check} Saved`;
  }

  // Auto-save to localStorage (draft) on change
  let saveTimeout: ReturnType<typeof setTimeout>;
  editor.onDidChangeModelContent(() => {
    markUnsaved();
    if (storageKey) {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem(storageKey, editor.getValue());
      }, 1000);
    }
  });

  // If we loaded saved content, mark as already saved
  if (savedContent) {
    markSaved();
  } else if (initialContent) {
    markUnsaved();
  }

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

  // Save function
  function save() {
    const content = editor.getValue();
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    // Save to localStorage
    if (storageKey) {
      localStorage.setItem(storageKey, content);
    }

    // Call onSave callback to save to progress
    if (config.onSave) {
      config.onSave(content, timeSpent);
    }

    markSaved();

    // Flash the save button
    saveButton.innerHTML = `<span class="btn-icon">${Icons.Check}</span> Saved!`;
    setTimeout(() => {
      saveButton.innerHTML = `<span class="btn-icon">${Icons.Check}</span> Save Proof`;
    }, 1500);
  }

  // AI Evaluation function
  async function runAiEvaluation() {
    if (!evaluateButton || !evaluationPanel || !evaluationContent) return;
    if (!geminiApiKey || !config.problem || !config.solution) return;

    const content = editor.getValue().trim();
    if (!content) {
      alert('Please write your proof before requesting AI evaluation.');
      return;
    }

    // Update UI to show loading state
    evaluateButton.disabled = true;
    evaluateButton.innerHTML = `<span class="btn-icon">${Icons.Beaker}</span> Evaluating...`;
    evaluationPanel.classList.remove('hidden');
    evaluationContent.innerHTML = '<div class="evaluation-loading">Analyzing your proof...</div>';

    try {
      const result = await evaluateWrittenExercise(
        geminiApiKey,
        config.problem,
        config.solution,
        content
      );

      // Display results
      const passedClass = result.passed ? 'passed' : 'not-passed';
      const passedIcon = result.passed ? Icons.Check : Icons.Cross;
      const passedText = result.passed ? 'Passed' : 'Needs Work';

      evaluationContent.innerHTML = `
        <div class="evaluation-result ${passedClass}">
          <div class="result-header">
            <span class="result-badge ${passedClass}">${passedIcon} ${passedText}</span>
            <span class="result-score">Score: ${result.score}/100</span>
          </div>
          <div class="result-feedback">
            <p>${result.feedback}</p>
          </div>
          ${result.strengths.length > 0 ? `
            <div class="result-section strengths">
              <h4>Strengths</h4>
              <ul>
                ${result.strengths.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${result.improvements.length > 0 ? `
            <div class="result-section improvements">
              <h4>Suggestions for Improvement</h4>
              <ul>
                ${result.improvements.map(i => `<li>${i}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;

      // Call onEvaluate callback if provided
      if (config.onEvaluate) {
        config.onEvaluate(result);
      }
    } catch (error) {
      console.error('AI evaluation error:', error);
      evaluationContent.innerHTML = `
        <div class="evaluation-error">
          <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Failed to evaluate'}</p>
          <p>Please check your API key in Settings and try again.</p>
        </div>
      `;
    } finally {
      evaluateButton.disabled = false;
      evaluateButton.innerHTML = `<span class="btn-icon">${Icons.Beaker}</span> AI Evaluate`;
    }
  }

  // Attach evaluate button handler
  if (evaluateButton) {
    evaluateButton.onclick = runAiEvaluation;
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
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    save();
  });

  // Escape key exits fullscreen
  const escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullscreen) {
      isFullscreen = false;
      container.classList.remove('fullscreen');
      editor.layout();
    }
  };
  document.addEventListener('keydown', escapeHandler);

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
      document.removeEventListener('keydown', escapeHandler);
      if (vimModeInstance) {
        vimModeInstance.dispose();
        vimModeInstance = null;
      }
      editor.dispose();
    },
    save,
    setTheme,
    setFontSize,
  };
}
