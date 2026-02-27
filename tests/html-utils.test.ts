/**
 * HTML Utilities Tests
 *
 * Comprehensive tests for the shared HTML utility functions.
 * These tests cover:
 * - XSS prevention through proper escaping
 * - Various special character handling
 * - Edge cases and boundary conditions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { decodeQuoteEntities, escapeHtml } from '../src/utils/html';

describe('escapeHtml', () => {
  describe('null and undefined handling', () => {
    it('returns empty string for null', () => {
      expect(escapeHtml(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(escapeHtml(undefined)).toBe('');
    });
  });

  describe('empty and whitespace strings', () => {
    it('returns empty string for empty input', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('preserves single space', () => {
      expect(escapeHtml(' ')).toBe(' ');
    });

    it('preserves multiple spaces', () => {
      expect(escapeHtml('   ')).toBe('   ');
    });

    it('preserves tabs', () => {
      expect(escapeHtml('\t')).toBe('\t');
    });

    it('preserves newlines', () => {
      expect(escapeHtml('\n')).toBe('\n');
    });

    it('preserves mixed whitespace', () => {
      expect(escapeHtml(' \t\n ')).toBe(' \t\n ');
    });
  });

  describe('basic HTML special character escaping', () => {
    it('escapes less-than sign', () => {
      expect(escapeHtml('<')).toBe('&lt;');
    });

    it('escapes greater-than sign', () => {
      expect(escapeHtml('>')).toBe('&gt;');
    });

    it('escapes ampersand', () => {
      expect(escapeHtml('&')).toBe('&amp;');
    });

    it('escapes double quotes', () => {
      expect(escapeHtml('"')).toBe('&quot;');
    });

    it('escapes single quotes', () => {
      expect(escapeHtml("'")).toBe('&#39;');
    });
  });

  describe('HTML tag escaping', () => {
    it('escapes simple HTML tags', () => {
      expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
    });

    it('escapes self-closing tags', () => {
      expect(escapeHtml('<br/>')).toBe('&lt;br/&gt;');
    });

    it('escapes script tags', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
    });

    it('escapes tags with attributes', () => {
      expect(escapeHtml('<a href="test">')).toBe(
        '&lt;a href=&quot;test&quot;&gt;'
      );
    });

    it('escapes tags with single-quoted attributes', () => {
      expect(escapeHtml("<a href='test'>")).toBe(
        '&lt;a href=&#39;test&#39;&gt;'
      );
    });

    it('escapes nested tags', () => {
      expect(escapeHtml('<div><span>text</span></div>')).toBe(
        '&lt;div&gt;&lt;span&gt;text&lt;/span&gt;&lt;/div&gt;'
      );
    });
  });

  describe('XSS attack prevention', () => {
    it('escapes onclick handlers', () => {
      const malicious = '<img src="x" onerror="alert(1)">';
      const escaped = escapeHtml(malicious);
      expect(escaped).not.toContain('<');
      expect(escaped).not.toContain('>');
      expect(escaped).toBe(
        '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;'
      );
    });

    it('escapes javascript: URLs', () => {
      const malicious = '<a href="javascript:alert(1)">click</a>';
      const escaped = escapeHtml(malicious);
      expect(escaped).not.toContain('<a');
      expect(escaped).toBe(
        '&lt;a href=&quot;javascript:alert(1)&quot;&gt;click&lt;/a&gt;'
      );
    });

    it('escapes data: URLs', () => {
      const malicious = '<a href="data:text/html,<script>alert(1)</script>">x</a>';
      const escaped = escapeHtml(malicious);
      expect(escaped).not.toContain('<a');
    });

    it('escapes event handlers in various formats', () => {
      const handlers = [
        'onmouseover="alert(1)"',
        'onfocus="alert(1)"',
        'onload="alert(1)"',
      ];
      for (const handler of handlers) {
        const escaped = escapeHtml(`<div ${handler}>`);
        expect(escaped).not.toContain('<');
        expect(escaped).toContain('&quot;');
      }
    });

    it('escapes SVG-based XSS', () => {
      const malicious = '<svg onload="alert(1)">';
      const escaped = escapeHtml(malicious);
      expect(escaped).toBe('&lt;svg onload=&quot;alert(1)&quot;&gt;');
    });

    it('escapes iframe injection', () => {
      const malicious = '<iframe src="evil.com"></iframe>';
      const escaped = escapeHtml(malicious);
      expect(escaped).not.toContain('<iframe');
    });
  });

  describe('plain text with special characters', () => {
    it('handles text with embedded HTML characters', () => {
      expect(escapeHtml('1 < 2 && 2 > 1')).toBe('1 &lt; 2 &amp;&amp; 2 &gt; 1');
    });

    it('handles mathematical expressions', () => {
      expect(escapeHtml('x < y > z')).toBe('x &lt; y &gt; z');
    });

    it('handles code snippets', () => {
      expect(escapeHtml('if (x < 10 && y > 5)')).toBe(
        'if (x &lt; 10 &amp;&amp; y &gt; 5)'
      );
    });

    it('handles JSON-like text', () => {
      expect(escapeHtml('{"key": "value"}')).toBe(
        '{&quot;key&quot;: &quot;value&quot;}'
      );
    });

    it('handles quoted strings', () => {
      expect(escapeHtml('He said "Hello"')).toBe('He said &quot;Hello&quot;');
    });

    it('handles single-quoted strings', () => {
      expect(escapeHtml("It's a test")).toBe('It&#39;s a test');
    });

    it('handles mixed quotes', () => {
      expect(escapeHtml(`He said "It's fine"`)).toBe(
        'He said &quot;It&#39;s fine&quot;'
      );
    });
  });

  describe('already escaped content', () => {
    it('double-escapes existing HTML entities', () => {
      // This is correct behavior - if input contains &amp;, it should become &amp;amp;
      expect(escapeHtml('&amp;')).toBe('&amp;amp;');
    });

    it('double-escapes existing &lt;', () => {
      expect(escapeHtml('&lt;')).toBe('&amp;lt;');
    });

    it('double-escapes existing &gt;', () => {
      expect(escapeHtml('&gt;')).toBe('&amp;gt;');
    });

    it('double-escapes existing &quot;', () => {
      expect(escapeHtml('&quot;')).toBe('&amp;quot;');
    });
  });

  describe('Unicode and international characters', () => {
    it('preserves Unicode characters', () => {
      expect(escapeHtml('Hello, 世界!')).toBe('Hello, 世界!');
    });

    it('preserves accented characters', () => {
      expect(escapeHtml('café résumé naïve')).toBe('café résumé naïve');
    });

    it('preserves Greek letters', () => {
      expect(escapeHtml('α β γ δ λ')).toBe('α β γ δ λ');
    });

    it('preserves mathematical symbols', () => {
      expect(escapeHtml('O(n²) + Ω(log n)')).toBe('O(n²) + Ω(log n)');
    });

    it('preserves emojis', () => {
      expect(escapeHtml('Hello 👋 World 🌍')).toBe('Hello 👋 World 🌍');
    });

    it('preserves RTL characters', () => {
      expect(escapeHtml('שלום')).toBe('שלום');
    });

    it('handles mixed Unicode and special chars', () => {
      expect(escapeHtml('日本語 < English')).toBe('日本語 &lt; English');
    });
  });

  describe('long strings and edge cases', () => {
    it('handles very long strings', () => {
      const longString = 'a'.repeat(10000);
      expect(escapeHtml(longString)).toBe(longString);
    });

    it('handles long strings with special characters', () => {
      const longString = '<>'.repeat(1000);
      const escaped = escapeHtml(longString);
      expect(escaped).toBe('&lt;&gt;'.repeat(1000));
    });

    it('handles strings with only special characters', () => {
      expect(escapeHtml('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#39;');
    });

    it('handles newlines within content', () => {
      expect(escapeHtml('line1\nline2\nline3')).toBe('line1\nline2\nline3');
    });

    it('handles carriage returns', () => {
      expect(escapeHtml('line1\r\nline2')).toBe('line1\r\nline2');
    });
  });

  describe('attribute context safety', () => {
    it('escapes content safe for use in double-quoted attributes', () => {
      const input = 'test" onclick="alert(1)"';
      const escaped = escapeHtml(input);
      expect(escaped).toBe('test&quot; onclick=&quot;alert(1)&quot;');
      // The escaped string is safe to use in: <div title="ESCAPED_HERE">
    });

    it('escapes content safe for use in single-quoted attributes', () => {
      const input = "test' onclick='alert(1)'";
      const escaped = escapeHtml(input);
      expect(escaped).toBe('test&#39; onclick=&#39;alert(1)&#39;');
      // The escaped string is safe to use in: <div title='ESCAPED_HERE'>
    });
  });

  describe('numeric entities', () => {
    it('does not decode numeric entities', () => {
      // Numeric entities should be escaped, not decoded
      expect(escapeHtml('&#60;')).toBe('&amp;#60;');
    });

    it('does not decode hex entities', () => {
      expect(escapeHtml('&#x3C;')).toBe('&amp;#x3C;');
    });
  });

  describe('control characters', () => {
    it('handles null character in string', () => {
      expect(escapeHtml('test\0test')).toBe('test\0test');
    });

    it('handles bell character', () => {
      expect(escapeHtml('test\x07test')).toBe('test\x07test');
    });

    it('handles backspace character', () => {
      expect(escapeHtml('test\btest')).toBe('test\btest');
    });
  });
});

describe('decodeQuoteEntities', () => {
  it('returns empty string for null and undefined', () => {
    expect(decodeQuoteEntities(null)).toBe('');
    expect(decodeQuoteEntities(undefined)).toBe('');
  });

  it('decodes named quote entities', () => {
    expect(decodeQuoteEntities('&quot;hello&apos;')).toBe("\"hello'");
  });

  it('decodes numeric quote entities', () => {
    expect(decodeQuoteEntities('&#34;hello&#39;')).toBe("\"hello'");
  });

  it('decodes hex quote entities case-insensitively', () => {
    expect(decodeQuoteEntities('&#x22;hello&#X27;')).toBe("\"hello'");
  });

  it('does not decode non-quote entities', () => {
    expect(decodeQuoteEntities('&lt;script&gt;')).toBe('&lt;script&gt;');
  });

  it('does not decode double-escaped quote entities', () => {
    expect(decodeQuoteEntities('&amp;quot;')).toBe('&amp;quot;');
  });
});
