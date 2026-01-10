/**
 * escapeHtml Pure String Implementation Tests
 *
 * These tests verify the pure string-based implementation of escapeHtml
 * that was refactored from a DOM-based approach to ensure consistency
 * across all JavaScript environments (browser, Node.js, etc.).
 */

import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('escapeHtml - Pure String Implementation', () => {
  describe('core escaping behavior', () => {
    it('escapes ampersand first to avoid double-escaping', () => {
      // The order of replacement is critical: & must be escaped first
      // otherwise & in &lt; would become &amp;lt;
      expect(escapeHtml('&')).toBe('&amp;');
      expect(escapeHtml('&&')).toBe('&amp;&amp;');
      expect(escapeHtml('&&&')).toBe('&amp;&amp;&amp;');
    });

    it('escapes less-than sign', () => {
      expect(escapeHtml('<')).toBe('&lt;');
      expect(escapeHtml('<<')).toBe('&lt;&lt;');
      expect(escapeHtml('<<<')).toBe('&lt;&lt;&lt;');
    });

    it('escapes greater-than sign', () => {
      expect(escapeHtml('>')).toBe('&gt;');
      expect(escapeHtml('>>')).toBe('&gt;&gt;');
      expect(escapeHtml('>>>')).toBe('&gt;&gt;&gt;');
    });

    it('escapes double quotes', () => {
      expect(escapeHtml('"')).toBe('&quot;');
      expect(escapeHtml('""')).toBe('&quot;&quot;');
      expect(escapeHtml('"""')).toBe('&quot;&quot;&quot;');
    });

    it('escapes single quotes', () => {
      expect(escapeHtml("'")).toBe('&#39;');
      expect(escapeHtml("''")).toBe('&#39;&#39;');
      expect(escapeHtml("'''")).toBe('&#39;&#39;&#39;');
    });

    it('escapes all special characters in combination', () => {
      expect(escapeHtml('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#39;');
    });
  });

  describe('order-sensitivity verification', () => {
    it('correctly handles ampersand followed by lt', () => {
      // If & is not escaped first, this would produce incorrect output
      expect(escapeHtml('&lt')).toBe('&amp;lt');
    });

    it('correctly handles ampersand followed by gt', () => {
      expect(escapeHtml('&gt')).toBe('&amp;gt');
    });

    it('correctly handles ampersand followed by amp', () => {
      expect(escapeHtml('&amp')).toBe('&amp;amp');
    });

    it('correctly handles already escaped-looking entities', () => {
      expect(escapeHtml('&lt;')).toBe('&amp;lt;');
      expect(escapeHtml('&gt;')).toBe('&amp;gt;');
      expect(escapeHtml('&amp;')).toBe('&amp;amp;');
      expect(escapeHtml('&quot;')).toBe('&amp;quot;');
      expect(escapeHtml('&#39;')).toBe('&amp;#39;');
    });
  });

  describe('mixed content', () => {
    it('handles text with scattered special characters', () => {
      const input = 'Hello <World> & "Universe" \'Test\'';
      const expected = 'Hello &lt;World&gt; &amp; &quot;Universe&quot; &#39;Test&#39;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('handles HTML tag simulation', () => {
      const input = '<div class="test" id=\'main\'>&nbsp;</div>';
      const expected = '&lt;div class=&quot;test&quot; id=&#39;main&#39;&gt;&amp;nbsp;&lt;/div&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('handles script tag injection attempt', () => {
      const input = '<script>alert("XSS")</script>';
      const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('handles event handler injection attempt', () => {
      const input = '<img onerror="alert(1)" src="x">';
      const expected = '&lt;img onerror=&quot;alert(1)&quot; src=&quot;x&quot;&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });
  });

  describe('null and undefined handling', () => {
    it('returns empty string for null', () => {
      expect(escapeHtml(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(escapeHtml(undefined)).toBe('');
    });

    it('returns empty string for empty string input', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('preserves safe characters', () => {
    it('preserves alphanumeric characters', () => {
      const input = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      expect(escapeHtml(input)).toBe(input);
    });

    it('preserves spaces and common punctuation', () => {
      const input = ' .,;:!?()[]{}+-*/=_|\\@#$%^~`';
      expect(escapeHtml(input)).toBe(input);
    });

    it('preserves newlines and tabs', () => {
      expect(escapeHtml('line1\nline2')).toBe('line1\nline2');
      expect(escapeHtml('col1\tcol2')).toBe('col1\tcol2');
      expect(escapeHtml('line1\r\nline2')).toBe('line1\r\nline2');
    });

    it('preserves unicode characters', () => {
      const input = 'Café résumé naïve 你好 مرحبا 🎉';
      expect(escapeHtml(input)).toBe(input);
    });
  });

  describe('real-world use cases', () => {
    it('handles user-generated content safely', () => {
      const userInput = 'I think x < y && y > z, don\'t you "agree"?';
      const escaped = escapeHtml(userInput);
      // Verify dangerous characters are escaped (not present as raw characters)
      // Note: & will appear in escaped output as &lt; &gt; &amp; etc.
      expect(escaped).toBe('I think x &lt; y &amp;&amp; y &gt; z, don&#39;t you &quot;agree&quot;?');
      // The escaped output should not contain raw dangerous characters that could break HTML
      // (checking for unescaped versions - these would be followed by non-entity characters)
      expect(escaped.match(/<(?!--)/g)).toBeNull(); // No < except in comments
      expect(escaped.match(/>(?!)/g)).toBeNull();
    });

    it('handles JSON-like content', () => {
      const json = '{"name": "O\'Brien", "symbol": "<>"}';
      const expected = '{&quot;name&quot;: &quot;O&#39;Brien&quot;, &quot;symbol&quot;: &quot;&lt;&gt;&quot;}';
      expect(escapeHtml(json)).toBe(expected);
    });

    it('handles code snippets', () => {
      const code = 'if (a < b && c > d) { return "result"; }';
      const expected = 'if (a &lt; b &amp;&amp; c &gt; d) { return &quot;result&quot;; }';
      expect(escapeHtml(code)).toBe(expected);
    });

    it('handles URL query strings', () => {
      const url = 'https://example.com?a=1&b=2&c=3';
      const expected = 'https://example.com?a=1&amp;b=2&amp;c=3';
      expect(escapeHtml(url)).toBe(expected);
    });

    it('handles mathematical expressions', () => {
      const math = 'x² + y² = z² (where x > 0 & y > 0)';
      const expected = 'x² + y² = z² (where x &gt; 0 &amp; y &gt; 0)';
      expect(escapeHtml(math)).toBe(expected);
    });
  });

  describe('edge cases', () => {
    it('handles very long strings', () => {
      const long = '<script>'.repeat(1000);
      const escaped = escapeHtml(long);
      expect(escaped).not.toContain('<');
      expect(escaped.split('&lt;').length).toBe(1001);
    });

    it('handles string with only special characters', () => {
      expect(escapeHtml('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#39;');
    });

    it('handles alternating special and regular characters', () => {
      expect(escapeHtml('a<b>c&d"e\'f')).toBe('a&lt;b&gt;c&amp;d&quot;e&#39;f');
    });

    it('handles consecutive identical special characters', () => {
      expect(escapeHtml('<<<<<<')).toBe('&lt;&lt;&lt;&lt;&lt;&lt;');
      expect(escapeHtml('>>>>>>')).toBe('&gt;&gt;&gt;&gt;&gt;&gt;');
      expect(escapeHtml('&&&&&&')).toBe('&amp;&amp;&amp;&amp;&amp;&amp;');
      expect(escapeHtml('""""""')).toBe('&quot;&quot;&quot;&quot;&quot;&quot;');
      expect(escapeHtml("''''''")).toBe('&#39;&#39;&#39;&#39;&#39;&#39;');
    });
  });
});
