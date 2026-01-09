/**
 * Comprehensive Edge Case Tests for escapeHtml
 *
 * These tests verify that the escapeHtml function handles various
 * edge cases correctly, ensuring proper HTML entity encoding for
 * security (XSS prevention) and proper display.
 */

import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('escapeHtml comprehensive edge cases', () => {
  describe('basic character escaping', () => {
    it('escapes all five dangerous characters', () => {
      // The five characters that need escaping for XSS prevention
      expect(escapeHtml('<')).toBe('&lt;');
      expect(escapeHtml('>')).toBe('&gt;');
      expect(escapeHtml('&')).toBe('&amp;');
      expect(escapeHtml('"')).toBe('&quot;');
      expect(escapeHtml("'")).toBe('&#39;');
    });

    it('escapes multiple occurrences of each character', () => {
      expect(escapeHtml('<<<')).toBe('&lt;&lt;&lt;');
      expect(escapeHtml('>>>')).toBe('&gt;&gt;&gt;');
      expect(escapeHtml('&&&')).toBe('&amp;&amp;&amp;');
      expect(escapeHtml('"""')).toBe('&quot;&quot;&quot;');
      expect(escapeHtml("'''")).toBe('&#39;&#39;&#39;');
    });

    it('escapes all characters in a single string', () => {
      const input = '<>&"\'';
      const expected = '&lt;&gt;&amp;&quot;&#39;';
      expect(escapeHtml(input)).toBe(expected);
    });
  });

  describe('XSS attack prevention', () => {
    it('neutralizes script injection', () => {
      const attacks = [
        '<script>alert("xss")</script>',
        '<script src="evil.js"></script>',
        '<script>document.cookie</script>',
        "<script>eval('malicious')</script>",
      ];

      for (const attack of attacks) {
        const escaped = escapeHtml(attack);
        expect(escaped).not.toContain('<script');
        expect(escaped).not.toContain('</script>');
        expect(escaped).toContain('&lt;script');
      }
    });

    it('neutralizes event handler injection', () => {
      const attacks = [
        '<img src=x onerror="alert(1)">',
        '<body onload="malicious()">',
        '<div onmouseover="steal()">',
        '<input onfocus="keylog()">',
      ];

      for (const attack of attacks) {
        const escaped = escapeHtml(attack);
        expect(escaped).not.toContain('<img');
        expect(escaped).not.toContain('<body');
        expect(escaped).not.toContain('<div');
        expect(escaped).not.toContain('<input');
        expect(escaped).toContain('&lt;');
      }
    });

    it('neutralizes href/src javascript: protocol', () => {
      const attacks = [
        '<a href="javascript:alert(1)">click</a>',
        '<iframe src="javascript:malicious">',
      ];

      for (const attack of attacks) {
        const escaped = escapeHtml(attack);
        expect(escaped).not.toContain('<a href');
        expect(escaped).not.toContain('<iframe');
        expect(escaped).toContain('&lt;');
      }
    });

    it('neutralizes SVG-based XSS', () => {
      const attacks = [
        '<svg onload="alert(1)">',
        '<svg><script>evil()</script></svg>',
      ];

      for (const attack of attacks) {
        const escaped = escapeHtml(attack);
        expect(escaped).not.toContain('<svg');
        expect(escaped).toContain('&lt;svg');
      }
    });

    it('handles attribute breaking attempts', () => {
      // Attempts to break out of attribute context
      const doubleQuoteAttack = 'foo" onclick="alert(1)" data-x="';
      const singleQuoteAttack = "bar' onclick='alert(1)' data-y='";

      const escapedDouble = escapeHtml(doubleQuoteAttack);
      const escapedSingle = escapeHtml(singleQuoteAttack);

      // Quotes should be escaped, preventing attribute breakout
      expect(escapedDouble).not.toContain('" onclick');
      expect(escapedDouble).toContain('&quot;');

      expect(escapedSingle).not.toContain("' onclick");
      expect(escapedSingle).toContain('&#39;');
    });
  });

  describe('unicode and international characters', () => {
    it('preserves unicode letters', () => {
      expect(escapeHtml('日本語')).toBe('日本語');
      expect(escapeHtml('中文')).toBe('中文');
      expect(escapeHtml('한국어')).toBe('한국어');
      expect(escapeHtml('العربية')).toBe('العربية');
      expect(escapeHtml('עברית')).toBe('עברית');
      expect(escapeHtml('Ελληνικά')).toBe('Ελληνικά');
      expect(escapeHtml('русский')).toBe('русский');
    });

    it('preserves emojis', () => {
      expect(escapeHtml('😀🎉🚀')).toBe('😀🎉🚀');
      expect(escapeHtml('Hello 👋 World 🌍')).toBe('Hello 👋 World 🌍');
      expect(escapeHtml('🔥<script>🔥')).toBe('🔥&lt;script&gt;🔥');
    });

    it('preserves mathematical symbols', () => {
      expect(escapeHtml('α β γ δ')).toBe('α β γ δ');
      expect(escapeHtml('∑ ∫ √ ∞')).toBe('∑ ∫ √ ∞');
      expect(escapeHtml('π ≈ 3.14159')).toBe('π ≈ 3.14159');
    });

    it('preserves currency symbols', () => {
      expect(escapeHtml('€ £ ¥ ₹')).toBe('€ £ ¥ ₹');
    });

    it('handles mixed unicode with dangerous characters', () => {
      expect(escapeHtml('<日本語>')).toBe('&lt;日本語&gt;');
      expect(escapeHtml('Привет & Мир')).toBe('Привет &amp; Мир');
      expect(escapeHtml('你好"世界"')).toBe('你好&quot;世界&quot;');
    });

    it('handles zero-width characters', () => {
      // Zero-width non-joiner and joiner
      expect(escapeHtml('a\u200Bb\u200Cc')).toBe('a\u200Bb\u200Cc');
    });

    it('handles right-to-left override characters', () => {
      // These are preserved but can be visually confusing
      expect(escapeHtml('\u202E<script>')).toBe('\u202E&lt;script&gt;');
    });
  });

  describe('whitespace handling', () => {
    it('preserves regular spaces', () => {
      expect(escapeHtml('hello world')).toBe('hello world');
      expect(escapeHtml('  leading')).toBe('  leading');
      expect(escapeHtml('trailing  ')).toBe('trailing  ');
    });

    it('preserves newlines', () => {
      expect(escapeHtml('line1\nline2')).toBe('line1\nline2');
      expect(escapeHtml('a\r\nb')).toBe('a\r\nb');
    });

    it('preserves tabs', () => {
      expect(escapeHtml('\ttabbed')).toBe('\ttabbed');
      expect(escapeHtml('col1\tcol2')).toBe('col1\tcol2');
    });

    it('preserves multiple whitespace types together', () => {
      expect(escapeHtml('  \t\n\r  ')).toBe('  \t\n\r  ');
    });

    it('handles non-breaking space', () => {
      // Browser's textContent/innerHTML converts &nbsp; - this is expected
      const result = escapeHtml('\u00A0');
      // The result should either be the original nbsp or &nbsp; entity
      expect(result === '\u00A0' || result === '&nbsp;').toBe(true);
    });
  });

  describe('edge cases with special values', () => {
    it('handles empty string', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('handles null', () => {
      expect(escapeHtml(null)).toBe('');
    });

    it('handles undefined', () => {
      expect(escapeHtml(undefined)).toBe('');
    });

    it('handles string with only whitespace', () => {
      expect(escapeHtml('   ')).toBe('   ');
      expect(escapeHtml('\n\n\n')).toBe('\n\n\n');
    });

    it('handles very long strings', () => {
      const longString = 'a'.repeat(10000);
      expect(escapeHtml(longString)).toBe(longString);

      const longDangerous = '<'.repeat(1000);
      expect(escapeHtml(longDangerous)).toBe('&lt;'.repeat(1000));
    });

    it('handles string with null bytes', () => {
      const withNull = 'before\0after';
      const result = escapeHtml(withNull);
      expect(result).toContain('before');
      expect(result).toContain('after');
    });
  });

  describe('already-escaped content', () => {
    it('double-escapes already-escaped entities', () => {
      // This is correct behavior - if content already has entities,
      // they should be escaped again so they display as literal text
      expect(escapeHtml('&lt;')).toBe('&amp;lt;');
      expect(escapeHtml('&gt;')).toBe('&amp;gt;');
      expect(escapeHtml('&amp;')).toBe('&amp;amp;');
      expect(escapeHtml('&quot;')).toBe('&amp;quot;');
    });

    it('handles numeric entities', () => {
      expect(escapeHtml('&#60;')).toBe('&amp;#60;');
      expect(escapeHtml('&#x3C;')).toBe('&amp;#x3C;');
    });
  });

  describe('HTML structure patterns', () => {
    it('escapes nested tags', () => {
      const nested = '<div><span><a href="#">text</a></span></div>';
      const escaped = escapeHtml(nested);
      expect(escaped).not.toContain('<div');
      expect(escaped).not.toContain('<span');
      expect(escaped).not.toContain('<a ');
      expect(escaped).toContain('&lt;div&gt;');
    });

    it('escapes self-closing tags', () => {
      expect(escapeHtml('<br/>')).toBe('&lt;br/&gt;');
      expect(escapeHtml('<img src="x" />')).toBe('&lt;img src=&quot;x&quot; /&gt;');
    });

    it('escapes HTML comments', () => {
      expect(escapeHtml('<!-- comment -->')).toBe('&lt;!-- comment --&gt;');
    });

    it('escapes DOCTYPE', () => {
      expect(escapeHtml('<!DOCTYPE html>')).toBe('&lt;!DOCTYPE html&gt;');
    });

    it('escapes CDATA sections', () => {
      expect(escapeHtml('<![CDATA[data]]>')).toBe('&lt;![CDATA[data]]&gt;');
    });
  });

  describe('common data patterns', () => {
    it('handles JSON strings', () => {
      const json = '{"name": "O\'Reilly", "value": "<test>"}';
      const escaped = escapeHtml(json);
      expect(escaped).toContain('&quot;name&quot;');
      expect(escaped).toContain('&#39;');
      expect(escaped).toContain('&lt;test&gt;');
    });

    it('handles code snippets', () => {
      const code = 'if (a < b && c > d) { console.log("test"); }';
      const escaped = escapeHtml(code);
      expect(escaped).toContain('&lt;');
      expect(escaped).toContain('&amp;&amp;');
      expect(escaped).toContain('&gt;');
      expect(escaped).toContain('&quot;test&quot;');
    });

    it('handles SQL queries', () => {
      const sql = "SELECT * FROM users WHERE name = 'O''Brien' AND age > 18";
      const escaped = escapeHtml(sql);
      expect(escaped).toContain('&#39;O&#39;&#39;Brien&#39;');
      expect(escaped).toContain('&gt;');
    });

    it('handles file paths', () => {
      const path = 'C:\\Users\\<username>\\Documents';
      const escaped = escapeHtml(path);
      expect(escaped).toContain('&lt;username&gt;');
    });

    it('handles URLs with query parameters', () => {
      const url = 'https://example.com?foo=1&bar=2&name="test"';
      const escaped = escapeHtml(url);
      expect(escaped).toContain('&amp;bar');
      expect(escaped).toContain('&quot;test&quot;');
    });

    it('handles error messages', () => {
      const error = 'Error: Expected <number> but got "string"';
      const escaped = escapeHtml(error);
      expect(escaped).toBe('Error: Expected &lt;number&gt; but got &quot;string&quot;');
    });
  });

  describe('boundary conditions', () => {
    it('handles single character strings', () => {
      expect(escapeHtml('a')).toBe('a');
      expect(escapeHtml('<')).toBe('&lt;');
      expect(escapeHtml('\n')).toBe('\n');
    });

    it('handles alternating safe and unsafe characters', () => {
      expect(escapeHtml('a<b>c&d"e\'f')).toBe('a&lt;b&gt;c&amp;d&quot;e&#39;f');
    });

    it('handles consecutive unsafe characters', () => {
      expect(escapeHtml('<><>')).toBe('&lt;&gt;&lt;&gt;');
      expect(escapeHtml('&&&&')).toBe('&amp;&amp;&amp;&amp;');
      expect(escapeHtml('""""')).toBe('&quot;&quot;&quot;&quot;');
    });

    it('handles unsafe characters at string boundaries', () => {
      expect(escapeHtml('<text')).toBe('&lt;text');
      expect(escapeHtml('text>')).toBe('text&gt;');
      expect(escapeHtml('&text')).toBe('&amp;text');
      expect(escapeHtml('text&')).toBe('text&amp;');
    });
  });

  describe('performance considerations', () => {
    it('handles string without any special characters efficiently', () => {
      const safeString = 'This is a completely safe string without any special characters at all';
      expect(escapeHtml(safeString)).toBe(safeString);
    });

    it('handles strings with special characters at different positions', () => {
      // Early in string
      expect(escapeHtml('<early in string')).toContain('&lt;');

      // Middle of string
      expect(escapeHtml('some text < in middle')).toContain('&lt;');

      // Late in string
      expect(escapeHtml('almost at the end<')).toContain('&lt;');
    });
  });
});
