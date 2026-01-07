import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    const input = '<div>"Hello" & \'World\'</div>';
    const output = escapeHtml(input);
    expect(output).toBe('&lt;div&gt;"Hello" &amp; \'World\'&lt;/div&gt;');
  });

  it('escapes angle brackets', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert("xss")&lt;/script&gt;'
    );
  });

  it('escapes ampersand', () => {
    expect(escapeHtml('foo & bar')).toBe('foo &amp; bar');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('returns unchanged string when no special characters', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });

  it('handles multiple occurrences of special characters', () => {
    expect(escapeHtml('<a><b><c>')).toBe('&lt;a&gt;&lt;b&gt;&lt;c&gt;');
    expect(escapeHtml('a & b & c & d')).toBe('a &amp; b &amp; c &amp; d');
  });

  it('handles newlines and whitespace', () => {
    const input = '<p>\n  Hello\n</p>';
    const output = escapeHtml(input);
    expect(output).toBe('&lt;p&gt;\n  Hello\n&lt;/p&gt;');
  });

  it('handles unicode characters', () => {
    expect(escapeHtml('Hello ñ © € 你好')).toBe('Hello ñ © € 你好');
  });

  it('handles nested angle brackets', () => {
    expect(escapeHtml('<<>>')).toBe('&lt;&lt;&gt;&gt;');
  });

  it('prevents XSS via event handlers', () => {
    const xss = '<img src=x onerror="alert(1)">';
    const escaped = escapeHtml(xss);
    expect(escaped).not.toContain('<img');
    expect(escaped).toBe('&lt;img src=x onerror="alert(1)"&gt;');
  });

  it('handles string with only special characters', () => {
    expect(escapeHtml('<<<>>>&&&')).toBe('&lt;&lt;&lt;&gt;&gt;&gt;&amp;&amp;&amp;');
  });
});
