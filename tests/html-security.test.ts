/**
 * HTML Security Tests
 *
 * Comprehensive XSS prevention tests for the escapeHtml utility.
 * Tests various attack vectors to ensure proper sanitization.
 */

import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('escapeHtml - XSS Prevention', () => {
  describe('script injection attacks', () => {
    it('prevents basic script tag injection', () => {
      const xss = '<script>alert("xss")</script>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<script');
      // Quotes are now also escaped for attribute safety
      expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('prevents script tag with attributes', () => {
      const xss = '<script src="evil.js"></script>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<script');
    });

    it('prevents script tag with type attribute', () => {
      const xss = '<script type="text/javascript">alert(1)</script>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<script');
    });

    it('prevents uppercase script tag', () => {
      const xss = '<SCRIPT>alert("xss")</SCRIPT>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<SCRIPT');
    });

    it('prevents mixed case script tag', () => {
      const xss = '<ScRiPt>alert("xss")</ScRiPt>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<ScRiPt');
    });
  });

  describe('event handler attacks', () => {
    it('prevents onerror event handler', () => {
      const xss = '<img src=x onerror="alert(1)">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<img');
      // The text 'onerror' is preserved but harmless since it's not in a tag
      // Quotes are now also escaped for attribute safety
      expect(escaped).toBe('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
    });

    it('prevents onclick event handler', () => {
      const xss = '<div onclick="alert(1)">Click me</div>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<div');
    });

    it('prevents onload event handler', () => {
      const xss = '<body onload="alert(1)">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<body');
    });

    it('prevents onmouseover event handler', () => {
      const xss = '<a onmouseover="alert(1)">hover me</a>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<a ');
    });

    it('prevents onfocus event handler', () => {
      const xss = '<input onfocus="alert(1)" autofocus>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<input');
    });
  });

  describe('javascript protocol attacks', () => {
    it('prevents javascript: protocol in href', () => {
      const xss = '<a href="javascript:alert(1)">click</a>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<a');
    });

    it('prevents javascript: protocol in src', () => {
      const xss = '<iframe src="javascript:alert(1)"></iframe>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<iframe');
    });

    it('prevents data: protocol', () => {
      const xss = '<a href="data:text/html,<script>alert(1)</script>">click</a>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<a');
    });
  });

  describe('SVG-based attacks', () => {
    it('prevents SVG with onload', () => {
      const xss = '<svg onload="alert(1)">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<svg');
    });

    it('prevents SVG with embedded script', () => {
      const xss = '<svg><script>alert(1)</script></svg>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<svg');
      expect(escaped).not.toContain('<script');
    });
  });

  describe('style-based attacks', () => {
    it('prevents style tag with expression', () => {
      const xss = '<style>body{background:url("javascript:alert(1)")}</style>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<style');
    });

    it('prevents inline style with expression', () => {
      const xss = '<div style="background:url(javascript:alert(1))">test</div>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<div');
    });
  });

  describe('object/embed attacks', () => {
    it('prevents object tag', () => {
      const xss = '<object data="data:text/html,<script>alert(1)</script>">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<object');
    });

    it('prevents embed tag', () => {
      const xss = '<embed src="data:text/html,<script>alert(1)</script>">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<embed');
    });
  });

  describe('encoding bypass attempts', () => {
    it('handles HTML entities in input', () => {
      const input = '&lt;script&gt;alert(1)&lt;/script&gt;';
      const escaped = escapeHtml(input);
      // The ampersands should be escaped
      expect(escaped).toBe('&amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;');
    });

    it('handles null bytes', () => {
      const xss = '<scr\x00ipt>alert(1)</scr\x00ipt>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<scr');
    });

    it('handles backspace characters', () => {
      const xss = '<script\b>alert(1)</script\b>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<script');
    });
  });

  describe('template literal attacks', () => {
    it('handles backticks in input', () => {
      const xss = '`${alert(1)}`';
      const escaped = escapeHtml(xss);
      // Backticks should pass through as they're not HTML special chars
      expect(escaped).toBe('`${alert(1)}`');
    });
  });

  describe('comment-based attacks', () => {
    it('prevents HTML comment injection', () => {
      const xss = '<!--<script>alert(1)</script>-->';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<!--');
    });

    it('prevents conditional comment injection', () => {
      const xss = '<!--[if IE]><script>alert(1)</script><![endif]-->';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<!--');
    });
  });

  describe('meta tag attacks', () => {
    it('prevents meta refresh', () => {
      const xss = '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<meta');
    });
  });

  describe('form-based attacks', () => {
    it('prevents form action injection', () => {
      const xss = '<form action="javascript:alert(1)"><input type="submit"></form>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<form');
    });

    it('prevents button formaction injection', () => {
      const xss = '<button formaction="javascript:alert(1)">Submit</button>';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<button');
    });
  });

  describe('base tag attacks', () => {
    it('prevents base tag hijacking', () => {
      const xss = '<base href="https://evil.com/">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<base');
    });
  });

  describe('real-world payloads', () => {
    it('prevents polyglot XSS payload', () => {
      const xss = "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcLiCk=alert() )//";
      const escaped = escapeHtml(xss);
      // This is just text, should pass through mostly unchanged
      // Quotes are now escaped for attribute safety
      expect(escaped).toBe("jaVasCript:/*-/*`/*\\`/*&#39;/*&quot;/**/(/* */oNcLiCk=alert() )//");
    });

    it('prevents IMG tag with expression', () => {
      const xss = '<IMG SRC="javascript:alert(\'XSS\');">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<IMG');
    });

    it('prevents body background injection', () => {
      const xss = '<BODY BACKGROUND="javascript:alert(\'XSS\')">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<BODY');
    });

    it('prevents table background injection', () => {
      const xss = '<TABLE BACKGROUND="javascript:alert(\'XSS\')">';
      const escaped = escapeHtml(xss);
      expect(escaped).not.toContain('<TABLE');
    });
  });

  describe('edge cases', () => {
    it('handles very long strings', () => {
      const long = '<script>'.repeat(10000);
      const escaped = escapeHtml(long);
      expect(escaped).not.toContain('<script');
    });

    it('handles strings with only angle brackets', () => {
      expect(escapeHtml('<><><>')).toBe('&lt;&gt;&lt;&gt;&lt;&gt;');
    });

    it('handles strings with alternating special chars', () => {
      expect(escapeHtml('<&><&>')).toBe('&lt;&amp;&gt;&lt;&amp;&gt;');
    });

    it('handles tab characters', () => {
      const input = '<\tscript\t>alert(1)</\tscript\t>';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain('<\t');
    });

    it('handles carriage return characters', () => {
      const input = '<\rscript\r>alert(1)</\rscript\r>';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain('<\r');
    });

    it('handles form feed characters', () => {
      const input = '<\fscript\f>alert(1)</\fscript\f>';
      const escaped = escapeHtml(input);
      // Form feed should not affect the escaping
      expect(escaped).toContain('&lt;');
    });

    it('handles multiple consecutive ampersands', () => {
      expect(escapeHtml('&&&&')).toBe('&amp;&amp;&amp;&amp;');
    });

    it('handles already escaped content being re-escaped', () => {
      const alreadyEscaped = '&lt;script&gt;';
      const doubleEscaped = escapeHtml(alreadyEscaped);
      expect(doubleEscaped).toBe('&amp;lt;script&amp;gt;');
    });
  });
});

describe('escapeHtml - HTML Attribute Context', () => {
  describe('attribute value injection prevention', () => {
    it('escapes double quotes to prevent attribute breakout', () => {
      // If user types: " onclick="alert(1)
      // Without escaping, this could create: value="" onclick="alert(1)"
      const input = '" onclick="alert(1)';
      const escaped = escapeHtml(input);
      expect(escaped).toBe('&quot; onclick=&quot;alert(1)');
      // When placed in value="...", this is safe
    });

    it('escapes single quotes for single-quoted attributes', () => {
      const input = "' onclick='alert(1)";
      const escaped = escapeHtml(input);
      expect(escaped).toBe("&#39; onclick=&#39;alert(1)");
    });

    it('escapes both quote types together', () => {
      const input = '"\' onclick=alert(1) data-x="';
      const escaped = escapeHtml(input);
      expect(escaped).toBe('&quot;&#39; onclick=alert(1) data-x=&quot;');
    });

    it('prevents attribute value with embedded tags', () => {
      const input = '"><script>alert(1)</script><input value="';
      const escaped = escapeHtml(input);
      expect(escaped).not.toContain('<script');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('handles form input values with special characters', () => {
      // Simulates user typing in a search box
      const searchInput = 'C++ & STL "basics"';
      const escaped = escapeHtml(searchInput);
      expect(escaped).toBe('C++ &amp; STL &quot;basics&quot;');
    });

    it('preserves normal search text', () => {
      const searchInput = 'algorithms data structures';
      const escaped = escapeHtml(searchInput);
      expect(escaped).toBe('algorithms data structures');
    });
  });
});

describe('escapeHtml - Safe Content Preservation', () => {
  describe('preserves safe text content', () => {
    it('preserves regular text', () => {
      expect(escapeHtml('Hello, World!')).toBe('Hello, World!');
    });

    it('preserves numbers', () => {
      expect(escapeHtml('12345')).toBe('12345');
    });

    it('preserves spaces', () => {
      expect(escapeHtml('a b c')).toBe('a b c');
    });

    it('preserves multiple spaces', () => {
      expect(escapeHtml('a  b   c')).toBe('a  b   c');
    });

    it('preserves newlines', () => {
      expect(escapeHtml('a\nb\nc')).toBe('a\nb\nc');
    });

    it('preserves unicode characters', () => {
      expect(escapeHtml('你好世界')).toBe('你好世界');
    });

    it('preserves emoji', () => {
      expect(escapeHtml('Hello 👋 World 🌍')).toBe('Hello 👋 World 🌍');
    });

    it('preserves mathematical symbols', () => {
      expect(escapeHtml('x² + y² = z²')).toBe('x² + y² = z²');
    });

    it('preserves currency symbols', () => {
      expect(escapeHtml('$100 €50 £30 ¥200')).toBe('$100 €50 £30 ¥200');
    });

    it('preserves parentheses and brackets', () => {
      expect(escapeHtml('(a)[b]{c}')).toBe('(a)[b]{c}');
    });

    it('escapes quotes in punctuation', () => {
      // Single quotes are now escaped for attribute safety
      expect(escapeHtml('Hello! How are you? I\'m fine.')).toBe("Hello! How are you? I&#39;m fine.");
    });

    it('preserves at sign and hash', () => {
      expect(escapeHtml('@user #hashtag')).toBe('@user #hashtag');
    });

    it('preserves percent sign', () => {
      expect(escapeHtml('100%')).toBe('100%');
    });

    it('preserves asterisks and carets', () => {
      expect(escapeHtml('a*b^c')).toBe('a*b^c');
    });

    it('preserves tilde and backtick', () => {
      expect(escapeHtml('~hello `world`')).toBe('~hello `world`');
    });

    it('preserves backslash', () => {
      expect(escapeHtml('path\\to\\file')).toBe('path\\to\\file');
    });

    it('preserves forward slash', () => {
      expect(escapeHtml('a/b/c')).toBe('a/b/c');
    });

    it('preserves pipe and equal sign', () => {
      expect(escapeHtml('a|b=c')).toBe('a|b=c');
    });

    it('preserves plus and minus', () => {
      expect(escapeHtml('1+2-3')).toBe('1+2-3');
    });
  });

  describe('code snippets', () => {
    it('escapes quotes in Python code', () => {
      const code = 'def hello():\n    print("Hello")\n    return 42';
      // Double quotes are now escaped for attribute safety
      expect(escapeHtml(code)).toBe('def hello():\n    print(&quot;Hello&quot;)\n    return 42');
    });

    it('escapes HTML in code but preserves structure', () => {
      const code = 'html = "<p>Hello</p>"';
      const escaped = escapeHtml(code);
      expect(escaped).toBe('html = &quot;&lt;p&gt;Hello&lt;/p&gt;&quot;');
    });

    it('handles JavaScript with template literals', () => {
      const code = 'const msg = `Hello ${name}`';
      expect(escapeHtml(code)).toBe('const msg = `Hello ${name}`');
    });
  });
});
