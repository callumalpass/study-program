import * as monaco from 'monaco-editor';
import { runPython } from './code-runner';

export interface EditorConfig {
  language?: string;
  theme?: string;
  readOnly?: boolean;
  initialValue?: string;
  height?: string;
  fontSize?: number;
  showRunButton?: boolean;
  onRun?: (code: string, output: string) => void;
}

export interface CodeEditor {
  editor: monaco.editor.IStandaloneCodeEditor;
  setValue: (value: string) => void;
  getValue: () => string;
  dispose: () => void;
  updateOptions: (options: monaco.editor.IStandaloneEditorConstructionOptions) => void;
}

export function createCodeEditor(
  container: HTMLElement,
  config: EditorConfig = {}
): CodeEditor {
  container.innerHTML = '';
  container.className = 'code-editor-container';

  // Editor wrapper
  const editorWrapper = document.createElement('div');
  editorWrapper.className = 'editor-wrapper';
  container.appendChild(editorWrapper);

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'editor-toolbar';

  if (config.showRunButton !== false) {
    const runButton = document.createElement('button');
    runButton.className = 'btn btn-primary btn-run';
    runButton.innerHTML = '▶ Run';
    runButton.onclick = async () => {
      await runCode();
    };
    toolbar.appendChild(runButton);

    const clearButton = document.createElement('button');
    clearButton.className = 'btn btn-secondary btn-clear';
    clearButton.textContent = 'Clear Output';
    clearButton.onclick = () => {
      outputContent.textContent = '';
      outputPanel.classList.remove('show', 'error');
    };
    toolbar.appendChild(clearButton);
  }

  editorWrapper.appendChild(toolbar);

  // Editor element
  const editorElement = document.createElement('div');
  editorElement.className = 'editor-element';
  editorElement.style.height = config.height || '400px';
  editorWrapper.appendChild(editorElement);

  // Output panel
  const outputPanel = document.createElement('div');
  outputPanel.className = 'output-panel';

  const outputHeader = document.createElement('div');
  outputHeader.className = 'output-header';
  outputHeader.textContent = 'Output';
  outputPanel.appendChild(outputHeader);

  const outputContent = document.createElement('pre');
  outputContent.className = 'output-content';
  outputPanel.appendChild(outputContent);

  container.appendChild(outputPanel);

  // Create Monaco editor
  const editor = monaco.editor.create(editorElement, {
    value: config.initialValue || '',
    language: config.language || 'python',
    theme: config.theme || 'vs-dark',
    readOnly: config.readOnly || false,
    fontSize: config.fontSize || 14,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    lineNumbers: 'on',
    renderWhitespace: 'selection',
    tabSize: 4,
    insertSpaces: true,
    wordWrap: 'on',
  });

  // Run code function
  async function runCode() {
    const code = editor.getValue();
    outputContent.textContent = 'Running...';
    outputPanel.classList.add('show');
    outputPanel.classList.remove('error');

    try {
      const result = await runPython(code);
      outputContent.textContent = result || '(No output)';

      if (config.onRun) {
        config.onRun(code, result);
      }
    } catch (error) {
      outputPanel.classList.add('error');
      outputContent.textContent = `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  // Keyboard shortcuts
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    runCode();
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
      editor.dispose();
    },
    updateOptions: (options: monaco.editor.IStandaloneEditorConstructionOptions) => {
      editor.updateOptions(options);
    },
  };
}
