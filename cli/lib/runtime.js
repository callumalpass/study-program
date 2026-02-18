import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { summarizePassFail } from './scoring.js';

function mkTempDir(prefix = 'stup-') {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function rmDirSafe(dirPath) {
  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
  } catch {
    // ignore cleanup failures
  }
}

function normalizeOutput(output) {
  return String(output ?? '')
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '');
}

function executeCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    input: options.input,
    encoding: 'utf8',
    timeout: options.timeoutMs ?? 10_000,
    maxBuffer: options.maxBuffer ?? 1024 * 1024,
    env: {
      ...process.env,
      ...(options.env || {}),
    },
  });

  return {
    status: result.status,
    timedOut: result.signal === 'SIGTERM' && (options.timeoutMs ?? 10_000) > 0,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error,
  };
}

function assertCommandAvailable(command, args = ['--version']) {
  const result = executeCommand(command, args, { timeoutMs: 3000 });
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      throw new Error(`required runtime command not found: ${command}`);
    }
    throw new Error(`cannot execute ${command}: ${result.error.message}`);
  }
  if (result.status !== 0 && !result.stdout && !result.stderr) {
    throw new Error(`failed to execute runtime command: ${command}`);
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isPythonTestCall(line) {
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) return false;
  if (!trimmed) return false;
  if (/^print\s*\(/.test(trimmed)) return true;
  if (/^result\s*=/.test(trimmed)) return true;
  if (/^assert\s/.test(trimmed)) return true;
  return false;
}

function preparePythonFunctionTestCode(code, funcName, input) {
  const lines = code.split('\n');
  const functionLines = [];
  const otherLines = [];
  let inFunction = false;
  let functionIndent = 0;
  const escapedFuncName = escapeRegex(funcName);

  for (const line of lines) {
    if (line.match(new RegExp(`^def\\s+${escapedFuncName}\\s*\\(`))) {
      inFunction = true;
      functionIndent = line.search(/\S/);
      functionLines.push(line);
      continue;
    }

    if (inFunction) {
      const trimmed = line.trim();
      if (trimmed.length > 0) {
        const currentIndent = line.search(/\S/);
        if (currentIndent <= functionIndent && !line.match(/^\s*#/)) {
          inFunction = false;
          if (!isPythonTestCall(line)) {
            otherLines.push(line);
          }
        } else {
          functionLines.push(line);
        }
      } else {
        functionLines.push(line);
      }
    } else {
      if (!isPythonTestCall(line) && !line.match(new RegExp(`print\\s*\\(\\s*${escapedFuncName}\\s*\\(`))) {
        otherLines.push(line);
      }
    }
  }

  return [...functionLines, ...otherLines, `print(${funcName}(${input}))`].join('\n');
}

function preparePythonStdinTestCode(code, input) {
  const inputLines = String(input)
    .split('\n')
    .filter((line) => line.trim().length > 0);

  const inputSetup = `
import sys

_input_data = ${JSON.stringify(inputLines)}
_input_index = 0

def _mock_input(prompt=''):
    global _input_index
    if _input_index < len(_input_data):
        value = _input_data[_input_index]
        _input_index += 1
        return value
    return ''

input = _mock_input
`;

  return `${inputSetup}\n${code}`;
}

function preparePythonSnippetTestCode(code, snippet) {
  return `${code}\n\n# === TEST SNIPPET ===\n${snippet}\n`;
}

function buildPythonTestCode(code, testCase) {
  const funcMatch = code.match(/^def\s+(\w+)\s*\(/m);
  const funcName = funcMatch ? funcMatch[1] : null;

  if (funcName && testCase.input) {
    return preparePythonFunctionTestCode(code, funcName, testCase.input);
  }

  if (testCase.input) {
    const usesStdin = /\binput\s*\(/.test(code);
    return usesStdin
      ? preparePythonStdinTestCode(code, testCase.input)
      : preparePythonSnippetTestCode(code, testCase.input);
  }

  return code;
}

function runPythonCode(code, { timeoutMs = 8000, stdin = '' } = {}) {
  const tempDir = mkTempDir('stup-py-');
  const scriptPath = path.join(tempDir, 'main.py');
  fs.writeFileSync(scriptPath, code, 'utf8');

  const result = executeCommand('python3', [scriptPath], {
    cwd: tempDir,
    input: stdin,
    timeoutMs,
  });

  rmDirSafe(tempDir);

  if (result.error) {
    throw new Error(result.error.message);
  }

  if (result.timedOut) {
    throw new Error('Execution timeout');
  }

  if (result.status !== 0) {
    const stderr = result.stderr.trim() || 'Python execution failed';
    throw new Error(stderr);
  }

  return normalizeOutput(result.stdout);
}

function buildJavaScriptTestCode(code, testCase) {
  const funcMatch = code.match(/^function\s+(\w+)\s*\(/m)
    || code.match(/^(?:const|let|var)\s+(\w+)\s*=\s*\(?.*=>/m);
  const funcName = funcMatch ? funcMatch[1] : null;

  if (funcName && testCase.input) {
    return `${code}\nconsole.log(${funcName}(${testCase.input}));\n`;
  }

  if (testCase.input) {
    return `${code}\n${testCase.input}\n`;
  }

  return code;
}

function runJavaScriptCode(code, { timeoutMs = 8000, stdin = '' } = {}) {
  const tempDir = mkTempDir('stup-js-');
  const scriptPath = path.join(tempDir, 'main.mjs');
  fs.writeFileSync(scriptPath, code, 'utf8');

  const result = executeCommand('node', [scriptPath], {
    cwd: tempDir,
    input: stdin,
    timeoutMs,
  });

  rmDirSafe(tempDir);

  if (result.error) {
    throw new Error(result.error.message);
  }

  if (result.timedOut) {
    throw new Error('Execution timeout');
  }

  if (result.status !== 0) {
    const stderr = result.stderr.trim() || 'JavaScript execution failed';
    throw new Error(stderr);
  }

  return normalizeOutput(result.stdout);
}

function getPrintfSpecifier(cType) {
  const normalizedType = cType.trim().replace(/\s+/g, ' ');
  if (normalizedType.includes('double') || normalizedType.includes('float')) return '%f';
  if (normalizedType.includes('char')) return '%c';
  return '%d';
}

function prepareCFunctionTestCode(code, funcName, input, language) {
  if (/\bint\s+main\s*\(/.test(code)) {
    return code;
  }

  const escapedName = escapeRegex(funcName);
  const funcMatch = code.match(new RegExp(`((?:(?:unsigned|signed|static|const)\\s+)*(?:int|void|float|double|char|long|short)(?:\\s+(?:long|int))?)\\s+${escapedName}\\s*\\(`));
  const returnType = funcMatch ? funcMatch[1] : 'int';

  const call = `${funcName}(${input})`;
  const isVoid = returnType.includes('void');
  const line = isVoid ? `${call};` : `printf("${getPrintfSpecifier(returnType)}", ${call});`;

  const mainCode = `
int main() {
  ${line}
  return 0;
}
`;

  const needsInclude = !/#include\s*<stdio\.h>/.test(code) && !/#include\s*<cstdio>/.test(code);
  const includeStdio = needsInclude ? '#include <stdio.h>\n' : '';

  if (language === 'cpp') {
    const includeIostream = !/#include\s*<iostream>/.test(code) ? '#include <iostream>\n' : '';
    return `${includeStdio}${includeIostream}${code}\n${mainCode}`;
  }

  return `${includeStdio}${code}\n${mainCode}`;
}

function buildCTestCode(code, testCase, language) {
  const hasMain = /\bint\s+main\s*\(/.test(code);
  const funcMatch = code.match(/^\s*(?:(?:unsigned|signed|static|const)\s+)*(?:int|void|float|double|char|long|short)(?:\s+(?:long|int))?\s+(\w+)\s*\(/m);
  const funcName = funcMatch ? funcMatch[1] : null;

  if (hasMain) return code;
  if (funcName && funcName !== 'main' && testCase.input) {
    return prepareCFunctionTestCode(code, funcName, testCase.input, language);
  }
  return code;
}

function runCompiledCode(code, language, { timeoutMs = 8000, stdin = '' } = {}) {
  const tempDir = mkTempDir(`stup-${language}-`);
  const sourceFile = path.join(tempDir, language === 'cpp' ? 'main.cpp' : 'main.c');
  const outputFile = path.join(tempDir, 'a.out');
  fs.writeFileSync(sourceFile, code, 'utf8');

  const compilerCandidates = language === 'cpp'
    ? ['g++', 'clang++', 'c++']
    : ['gcc', 'clang', 'cc'];

  let compileResult = null;
  let compiler = null;

  for (const candidate of compilerCandidates) {
    const standardFlag = language === 'cpp' ? '-std=c++17' : '-std=c11';
    const attempt = executeCommand(candidate, [sourceFile, '-O0', standardFlag, '-o', outputFile], {
      cwd: tempDir,
      timeoutMs,
    });
    if (!attempt.error && attempt.status === 0) {
      compileResult = attempt;
      compiler = candidate;
      break;
    }
    if (!compileResult) {
      compileResult = attempt;
    }
  }

  if (!compiler || !compileResult || compileResult.status !== 0) {
    const err = compileResult?.stderr?.trim() || 'No C compiler available (tried gcc/clang/cc)';
    rmDirSafe(tempDir);
    throw new Error(err);
  }

  const runResult = executeCommand(outputFile, [], {
    cwd: tempDir,
    input: stdin,
    timeoutMs,
  });

  rmDirSafe(tempDir);

  if (runResult.error) {
    throw new Error(runResult.error.message);
  }

  if (runResult.timedOut) {
    throw new Error('Execution timeout');
  }

  if (runResult.status !== 0) {
    const stderr = runResult.stderr.trim() || 'Program exited with non-zero status';
    throw new Error(stderr);
  }

  return normalizeOutput(runResult.stdout);
}

function resolveRunner(language) {
  switch (language) {
    case 'python':
      assertCommandAvailable('python3');
      return {
        buildTestCode: buildPythonTestCode,
        runCode: runPythonCode,
      };
    case 'javascript':
    case 'typescript':
      assertCommandAvailable('node');
      return {
        buildTestCode: buildJavaScriptTestCode,
        runCode: runJavaScriptCode,
      };
    case 'c':
    case 'cpp':
      try {
        assertCommandAvailable(language === 'cpp' ? 'g++' : 'gcc');
      } catch {
        try {
          assertCommandAvailable(language === 'cpp' ? 'clang++' : 'clang');
        } catch {
          assertCommandAvailable(language === 'cpp' ? 'c++' : 'cc');
        }
      }
      return {
        buildTestCode: (code, testCase) => buildCTestCode(code, testCase, language),
        runCode: (code, options) => runCompiledCode(code, language, options),
      };
    default:
      throw new Error(`Unsupported runtime language: ${language}`);
  }
}

export function runTestSuite({ language, studentCode, solutionCode, tests, timeoutSeconds = 8 }) {
  const runner = resolveRunner(language);
  const timeoutMs = Math.max(1, Number(timeoutSeconds || 8)) * 1000;
  const results = [];

  for (const testCase of tests) {
    try {
      const studentProgram = runner.buildTestCode(studentCode, testCase);
      const solutionProgram = runner.buildTestCode(solutionCode, testCase);

      const expectedOutput = runner.runCode(solutionProgram, {
        timeoutMs,
        stdin: testCase.input || '',
      });

      const actualOutput = runner.runCode(studentProgram, {
        timeoutMs,
        stdin: testCase.input || '',
      });

      results.push({
        testCase,
        passed: normalizeOutput(actualOutput) === normalizeOutput(expectedOutput),
        expectedOutput: normalizeOutput(expectedOutput),
        actualOutput: normalizeOutput(actualOutput),
      });
    } catch (error) {
      results.push({
        testCase,
        passed: false,
        expectedOutput: '',
        actualOutput: '',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    tests: results,
    summary: summarizePassFail(results),
  };
}
