import type { TestCase } from '@/core/types';

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  error?: string;
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<any>;
  loadPackage: (packages: string | string[]) => Promise<void>;
  globals: any;
}

let pyodideInstance: PyodideInterface | null = null;
let pyodideLoading: Promise<PyodideInterface> | null = null;

declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

/**
 * Initialize Pyodide lazily. Only loads when first needed.
 */
export async function initPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (pyodideLoading) {
    return pyodideLoading;
  }

  pyodideLoading = (async () => {
    try {
      // Load Pyodide from CDN
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Pyodide'));
        });
      }

      pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      return pyodideInstance;
    } catch (error) {
      pyodideLoading = null;
      throw error;
    }
  })();

  return pyodideLoading;
}

/**
 * Run Python code and return the output as a string.
 * Captures stdout and stderr.
 */
export async function runPython(code: string, timeout = 10000): Promise<string> {
  const pyodide = await initPyodide();

  // Set up output capture
  const captureCode = `
import sys
from io import StringIO

_stdout = StringIO()
_stderr = StringIO()
sys.stdout = _stdout
sys.stderr = _stderr

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
finally:
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

_output = _stdout.getvalue()
_errors = _stderr.getvalue()

if _errors:
    _output = _output + '\\nErrors:\\n' + _errors

_output
`;

  return Promise.race([
    (async () => {
      try {
        const result = await pyodide.runPythonAsync(captureCode);
        return String(result || '');
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error(String(error));
      }
    })(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Execution timeout')), timeout)
    ),
  ]);
}

/**
 * Run test cases against user code.
 * Each test case provides input and expected output.
 */
export async function runTests(
  code: string,
  tests: TestCase[],
  timeout = 5000
): Promise<TestResult[]> {
  const results: TestResult[] = [];

  for (const testCase of tests) {
    try {
      // Prepare code with input injection
      const testCode = prepareTestCode(code, testCase.input);

      const actualOutput = await runPython(testCode, timeout);
      const normalizedActual = normalizeOutput(actualOutput);
      const normalizedExpected = normalizeOutput(testCase.expectedOutput);

      results.push({
        testCase,
        passed: normalizedActual === normalizedExpected,
        actualOutput,
      });
    } catch (error) {
      results.push({
        testCase,
        passed: false,
        actualOutput: '',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return results;
}

/**
 * Prepare code for testing by injecting input.
 * Handles input() function calls by pre-defining input values.
 */
function prepareTestCode(code: string, input: string): string {
  if (!input) {
    return code;
  }

  // Split input into lines for multiple input() calls
  const inputLines = input.split('\n').filter(line => line.trim());

  const inputSetup = `
import sys
from io import StringIO

_input_data = ${JSON.stringify(inputLines)}
_input_index = 0

def _mock_input(prompt=''):
    global _input_index
    if _input_index < len(_input_data):
        value = _input_data[_input_index]
        _input_index += 1
        print(prompt + value)  # Echo the input like real input()
        return value
    return ''

# Replace input with our mock
input = _mock_input
`;

  return inputSetup + '\n' + code;
}

/**
 * Normalize output for comparison.
 * Removes trailing whitespace and normalizes line endings.
 */
function normalizeOutput(output: string): string {
  return output
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '');
}

/**
 * Clear the Pyodide instance (useful for testing or reset).
 */
export function clearPyodide(): void {
  pyodideInstance = null;
  pyodideLoading = null;
}
