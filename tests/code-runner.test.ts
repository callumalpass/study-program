import { describe, expect, it } from 'vitest';
import { runCode, runTestsForLanguage } from '../src/components/code-runner';

describe('code runner errors', () => {
  it('rejects unsupported languages in runCode', async () => {
    await expect(runCode('print("hi")', 'sql', '', 1000))
      .rejects
      .toThrow('Unsupported language: sql');
  });

  it('rejects unsupported languages in runTestsForLanguage', async () => {
    await expect(runTestsForLanguage('code', [], 'solution', 'yaml', 1000))
      .rejects
      .toThrow('Unsupported language: yaml');
  });
});
