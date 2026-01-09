/**
 * HTML Escaping Edge Cases Tests
 *
 * Additional edge case tests for escapeHtml utility function,
 * covering rare but potentially problematic input scenarios.
 */

import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('escapeHtml - Additional Edge Cases', () => {
  describe('whitespace handling', () => {
    it('preserves tab characters', () => {
      expect(escapeHtml('a\tb\tc')).toBe('a\tb\tc');
    });

    it('preserves carriage return characters', () => {
      expect(escapeHtml('a\rb\rc')).toBe('a\rb\rc');
    });

    it('preserves Windows-style line endings', () => {
      expect(escapeHtml('line1\r\nline2')).toBe('line1\r\nline2');
    });

    it('preserves mixed whitespace', () => {
      expect(escapeHtml(' \t\n\r ')).toBe(' \t\n\r ');
    });

    it('handles string with only whitespace', () => {
      expect(escapeHtml('   ')).toBe('   ');
    });

    it('escapes non-breaking space to entity', () => {
      expect(escapeHtml('hello\u00A0world')).toBe('hello&nbsp;world');
    });
  });

  describe('zero-width characters', () => {
    it('preserves zero-width space', () => {
      const input = 'hello\u200Bworld';
      expect(escapeHtml(input)).toBe(input);
    });

    it('preserves zero-width non-joiner', () => {
      const input = 'hello\u200Cworld';
      expect(escapeHtml(input)).toBe(input);
    });

    it('preserves zero-width joiner', () => {
      const input = 'hello\u200Dworld';
      expect(escapeHtml(input)).toBe(input);
    });
  });

  describe('surrogate pairs and emoji', () => {
    it('handles emoji with skin tone modifiers', () => {
      expect(escapeHtml('👋🏻👋🏿')).toBe('👋🏻👋🏿');
    });

    it('handles compound emoji (family)', () => {
      expect(escapeHtml('👨‍👩‍👧‍👦')).toBe('👨‍👩‍👧‍👦');
    });

    it('handles flag emoji', () => {
      expect(escapeHtml('🇺🇸🇬🇧')).toBe('🇺🇸🇬🇧');
    });

    it('handles emoji with special chars', () => {
      expect(escapeHtml('Hello <3 👋')).toBe('Hello &lt;3 👋');
    });
  });

  describe('mathematical and scientific notation', () => {
    it('handles less than/greater than in math context', () => {
      expect(escapeHtml('x < y && y > z')).toBe('x &lt; y &amp;&amp; y &gt; z');
    });

    it('handles generic type notation', () => {
      expect(escapeHtml('List<String>')).toBe('List&lt;String&gt;');
    });

    it('handles nested generics', () => {
      expect(escapeHtml('Map<String, List<Int>>')).toBe('Map&lt;String, List&lt;Int&gt;&gt;');
    });

    it('handles arrow notation', () => {
      expect(escapeHtml('a -> b')).toBe('a -&gt; b');
    });

    it('handles lambda arrow', () => {
      expect(escapeHtml('x => x * 2')).toBe('x =&gt; x * 2');
    });

    it('handles comparison operators', () => {
      expect(escapeHtml('a <= b >= c <> d')).toBe('a &lt;= b &gt;= c &lt;&gt; d');
    });
  });

  describe('code-like content', () => {
    it('handles XML/HTML-like syntax', () => {
      expect(escapeHtml('<tag attr="val"/>')).toBe('&lt;tag attr=&quot;val&quot;/&gt;');
    });

    it('handles JSX-like content', () => {
      expect(escapeHtml('<Component prop="value" />')).toBe('&lt;Component prop=&quot;value&quot; /&gt;');
    });

    it('handles regex with angle brackets', () => {
      expect(escapeHtml('/^<[^>]+>$/')).toBe('/^&lt;[^&gt;]+&gt;$/');
    });

    it('handles shell redirection syntax', () => {
      expect(escapeHtml('cmd > output.txt 2>&1')).toBe('cmd &gt; output.txt 2&gt;&amp;1');
    });

    it('handles HTML entities in code comments', () => {
      expect(escapeHtml('// &lt;tag&gt; is escaped')).toBe('// &amp;lt;tag&amp;gt; is escaped');
    });
  });

  describe('quote combinations', () => {
    it('handles apostrophe in possessive', () => {
      expect(escapeHtml("John's code")).toBe("John&#39;s code");
    });

    it('handles quotes around text', () => {
      expect(escapeHtml('He said "Hello"')).toBe('He said &quot;Hello&quot;');
    });

    it('handles nested quotes', () => {
      expect(escapeHtml('She said "He said \'Hi\'"')).toBe('She said &quot;He said &#39;Hi&#39;&quot;');
    });

    it('handles quote-heavy JSON-like content', () => {
      const input = '{"key": "value"}';
      expect(escapeHtml(input)).toBe('{&quot;key&quot;: &quot;value&quot;}');
    });

    it('handles escaped quotes in strings', () => {
      // A string containing: \"
      expect(escapeHtml('\\"')).toBe('\\&quot;');
    });
  });

  describe('ampersand edge cases', () => {
    it('handles already-escaped looking content', () => {
      // Input that looks like HTML entities but shouldn't be treated specially
      expect(escapeHtml('&amp;')).toBe('&amp;amp;');
      expect(escapeHtml('&lt;')).toBe('&amp;lt;');
      expect(escapeHtml('&gt;')).toBe('&amp;gt;');
    });

    it('handles numeric character references', () => {
      expect(escapeHtml('&#60;')).toBe('&amp;#60;');
      expect(escapeHtml('&#x3C;')).toBe('&amp;#x3C;');
    });

    it('handles ampersand in URLs', () => {
      expect(escapeHtml('?a=1&b=2&c=3')).toBe('?a=1&amp;b=2&amp;c=3');
    });

    it('handles ampersand in company names', () => {
      expect(escapeHtml('Johnson & Johnson')).toBe('Johnson &amp; Johnson');
    });
  });

  describe('boundary conditions', () => {
    it('handles single character inputs', () => {
      expect(escapeHtml('<')).toBe('&lt;');
      expect(escapeHtml('>')).toBe('&gt;');
      expect(escapeHtml('&')).toBe('&amp;');
      expect(escapeHtml('"')).toBe('&quot;');
      expect(escapeHtml("'")).toBe('&#39;');
      expect(escapeHtml('a')).toBe('a');
    });

    it('handles two character combinations', () => {
      expect(escapeHtml('<>')).toBe('&lt;&gt;');
      expect(escapeHtml('&&')).toBe('&amp;&amp;');
      expect(escapeHtml('""')).toBe('&quot;&quot;');
      expect(escapeHtml("''")).toBe('&#39;&#39;');
    });

    it('handles special chars at start and end', () => {
      expect(escapeHtml('<hello')).toBe('&lt;hello');
      expect(escapeHtml('hello>')).toBe('hello&gt;');
      expect(escapeHtml('&hello')).toBe('&amp;hello');
      expect(escapeHtml('hello&')).toBe('hello&amp;');
    });
  });

  describe('real-world scenarios', () => {
    it('handles error messages with angle brackets', () => {
      const error = 'TypeError: Cannot read property of <undefined>';
      expect(escapeHtml(error)).toBe('TypeError: Cannot read property of &lt;undefined&gt;');
    });

    it('handles log output with quotes', () => {
      const log = '[INFO] User "admin" logged in at 10:30';
      expect(escapeHtml(log)).toBe('[INFO] User &quot;admin&quot; logged in at 10:30');
    });

    it('handles SQL-like content', () => {
      const sql = "SELECT * FROM users WHERE name = 'John' AND age > 30";
      expect(escapeHtml(sql)).toBe("SELECT * FROM users WHERE name = &#39;John&#39; AND age &gt; 30");
    });

    it('handles command line arguments', () => {
      const cmd = 'grep "pattern" file.txt | head -n 10 > output.txt';
      expect(escapeHtml(cmd)).toBe('grep &quot;pattern&quot; file.txt | head -n 10 &gt; output.txt');
    });

    it('handles TypeScript generic types', () => {
      const ts = 'function identity<T>(arg: T): T { return arg; }';
      expect(escapeHtml(ts)).toBe('function identity&lt;T&gt;(arg: T): T { return arg; }');
    });
  });
});
