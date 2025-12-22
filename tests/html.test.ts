import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    const input = '<div>"Hello" & \'World\'</div>';
    const output = escapeHtml(input);
    expect(output).toBe('&lt;div&gt;"Hello" &amp; \'World\'&lt;/div&gt;');
  });
});
