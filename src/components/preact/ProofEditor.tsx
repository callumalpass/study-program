import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import * as monaco from 'monaco-editor';
import { initVimMode, VimMode } from 'monaco-vim';
import { Icons } from '@/components/icons';
import { progressStorage } from '@/core/storage';
import { evaluateWrittenExercise, type EvaluationResult } from '@/utils/gemini-eval';

export interface ProofEditorProps {
  initialValue?: string;
  height?: string;
  fontSize?: number;
  storageKey?: string;
  hints?: string[];
  solution?: string;
  problem?: string;
  onSave?: (content: string, timeSpentSeconds: number) => void;
  onEvaluate?: (result: EvaluationResult) => void;
}

const STORAGE_PREFIX = 'cs_degree_proof_';

function getEditorThemeFromApp(): 'vs-dark' | 'vs-light' {
  const appTheme = document.documentElement.getAttribute('data-theme');
  return appTheme === 'light' ? 'vs-light' : 'vs-dark';
}

export function ProofEditor({
  initialValue = '',
  height = '300px',
  fontSize: initialFontSize = 14,
  storageKey,
  hints = [],
  solution,
  problem,
  onSave,
  onEvaluate,
}: ProofEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const vimStatusRef = useRef<HTMLDivElement>(null);
  const vimModeRef = useRef<VimMode | null>(null);
  const startTimeRef = useRef(Date.now());

  const [currentTheme, setCurrentTheme] = useState(getEditorThemeFromApp());
  const [currentFontSize, setCurrentFontSize] = useState(initialFontSize);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [vimEnabled, setVimEnabled] = useState(() =>
    localStorage.getItem('cs_degree_vim_mode') === 'true'
  );
  const [isSaved, setIsSaved] = useState(true);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // AI Evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  // Check if AI evaluation is available
  const geminiApiKey = progressStorage.getSettings().geminiApiKey;
  const canEvaluate = !!(geminiApiKey && problem && solution);

  // Load saved content
  const fullStorageKey = storageKey ? `${STORAGE_PREFIX}${storageKey}` : null;
  const savedContent = fullStorageKey ? localStorage.getItem(fullStorageKey) : null;
  const startingContent = savedContent || initialValue || '';

  // Initialize Monaco editor
  useEffect(() => {
    if (!editorContainerRef.current) return;

    const editor = monaco.editor.create(editorContainerRef.current, {
      value: startingContent,
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

    editorRef.current = editor;

    // Auto-save to localStorage
    let saveTimeout: ReturnType<typeof setTimeout>;
    editor.onDidChangeModelContent(() => {
      setIsSaved(false);
      if (fullStorageKey) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          localStorage.setItem(fullStorageKey, editor.getValue());
        }, 1000);
      }
    });

    // Keyboard shortcut for save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });

    // Initialize vim mode if enabled
    if (vimEnabled && vimStatusRef.current) {
      vimModeRef.current = initVimMode(editor, vimStatusRef.current);
    }

    // Mark as saved if we loaded saved content
    if (savedContent) {
      setIsSaved(true);
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

  // Save handler
  const handleSave = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const content = editor.getValue();
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    // Save to localStorage
    if (fullStorageKey) {
      localStorage.setItem(fullStorageKey, content);
    }

    // Call onSave callback
    onSave?.(content, timeSpent);
    setIsSaved(true);
  }, [fullStorageKey, onSave]);

  // Clear handler
  const handleClear = useCallback(() => {
    if (!confirm('Clear your proof? This cannot be undone.')) return;

    const editor = editorRef.current;
    if (!editor) return;

    editor.setValue('');
    if (fullStorageKey) {
      localStorage.removeItem(fullStorageKey);
    }
    setIsSaved(false);
  }, [fullStorageKey]);

  // Copy handler
  const handleCopy = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor) return;

    try {
      await navigator.clipboard.writeText(editor.getValue());
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  // AI Evaluation handler
  const handleEvaluate = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor || !geminiApiKey || !problem || !solution) return;

    const content = editor.getValue().trim();
    if (!content) {
      alert('Please write your proof before requesting AI evaluation.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationError(null);

    try {
      const result = await evaluateWrittenExercise(geminiApiKey, problem, solution, content);
      setEvaluationResult(result);
      onEvaluate?.(result);
    } catch (error) {
      console.error('AI evaluation error:', error);
      setEvaluationError(error instanceof Error ? error.message : 'Failed to evaluate');
    } finally {
      setIsEvaluating(false);
    }
  }, [geminiApiKey, problem, solution, onEvaluate]);

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

  const containerClass = `proof-editor-container ${currentTheme === 'vs-light' ? 'light-theme' : ''} ${isFullscreen ? 'fullscreen' : ''}`;

  return (
    <div class={containerClass}>
      <div class="editor-wrapper">
        {/* Toolbar */}
        <div class="editor-toolbar">
          <div class="toolbar-left">
            <button class="btn btn-primary btn-save" onClick={handleSave} title="Save your proof (Ctrl+S)">
              <span class="btn-icon" dangerouslySetInnerHTML={{ __html: Icons.Check }} /> Save Proof
            </button>
            {canEvaluate && (
              <button
                class="btn btn-secondary btn-evaluate"
                onClick={handleEvaluate}
                disabled={isEvaluating}
                title="Get AI feedback on your proof"
              >
                <span class="btn-icon" dangerouslySetInnerHTML={{ __html: Icons.Beaker }} />
                {isEvaluating ? ' Evaluating...' : ' AI Evaluate'}
              </button>
            )}
            <span class={`save-status ${isSaved ? 'saved' : 'unsaved'}`}>
              {isSaved ? (
                <><span dangerouslySetInnerHTML={{ __html: Icons.Check }} /> Saved</>
              ) : (
                'Unsaved changes'
              )}
            </span>
            <button class="btn btn-ghost btn-clear" onClick={handleClear}>
              Clear
            </button>
          </div>
          <div class="toolbar-right">
            <button class="btn btn-ghost btn-copy" onClick={handleCopy} title="Copy to clipboard">
              <span class="btn-icon" dangerouslySetInnerHTML={{ __html: Icons.Export }} /> Copy
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

      {/* AI Evaluation panel */}
      {(evaluationResult || evaluationError || isEvaluating) && (
        <div class="evaluation-panel">
          <div class="evaluation-header">
            <span class="evaluation-title">
              <span class="panel-icon" dangerouslySetInnerHTML={{ __html: Icons.Beaker }} />
              {' '}AI Evaluation
            </span>
          </div>
          <div class="evaluation-content">
            {isEvaluating && (
              <div class="evaluation-loading">Analyzing your proof...</div>
            )}
            {evaluationError && (
              <div class="evaluation-error">
                <p><strong>Error:</strong> {evaluationError}</p>
                <p>Please check your API key in Settings and try again.</p>
              </div>
            )}
            {evaluationResult && !isEvaluating && (
              <div class={`evaluation-result ${evaluationResult.passed ? 'passed' : 'not-passed'}`}>
                <div class="result-header">
                  <span class={`result-badge ${evaluationResult.passed ? 'passed' : 'not-passed'}`}>
                    <span dangerouslySetInnerHTML={{ __html: evaluationResult.passed ? Icons.Check : Icons.Cross }} />
                    {' '}{evaluationResult.passed ? 'Passed' : 'Needs Work'}
                  </span>
                  <span class="result-score">Score: {evaluationResult.score}/100</span>
                </div>
                <div class="result-feedback">
                  <p>{evaluationResult.feedback}</p>
                </div>
                {evaluationResult.strengths.length > 0 && (
                  <div class="result-section strengths">
                    <h4>Strengths</h4>
                    <ul>
                      {evaluationResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {evaluationResult.improvements.length > 0 && (
                  <div class="result-section improvements">
                    <h4>Suggestions for Improvement</h4>
                    <ul>
                      {evaluationResult.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
