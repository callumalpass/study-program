/**
 * Markdown Function Plot Tests
 *
 * Tests for the function-plot code block rendering in markdown.
 * Function plots use base64 encoding to safely pass JSON configuration
 * through HTML attributes, which requires careful testing of edge cases.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderMarkdown, renderFunctionPlots } from '../src/components/markdown';

describe('markdown function plots', () => {
  describe('renderMarkdown with plot blocks', () => {
    it('renders plot code blocks as div elements', () => {
      const markdown = '```plot\n{"data": [{"fn": "x^2"}]}\n```';
      const result = renderMarkdown(markdown);

      expect(result).toContain('<div class="function-plot"');
      expect(result).toContain('data-plot-b64=');
    });

    it('base64 encodes plot configuration', () => {
      const config = '{"data": [{"fn": "x^2"}]}';
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      // Extract the base64 value
      const match = result.match(/data-plot-b64="([^"]+)"/);
      expect(match).not.toBeNull();

      // Decode and verify it matches original
      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe(config);
      }
    });

    it('handles UTF-8 characters in plot configuration', () => {
      const config = '{"title": "函数图 y = x²", "data": [{"fn": "x^2"}]}';
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      expect(match).not.toBeNull();

      if (match) {
        // Decode base64 to bytes, then decode UTF-8
        const binary = atob(match[1]);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        expect(decoded).toBe(config);
      }
    });

    it('handles special characters in plot configuration', () => {
      const config = '{"xAxis": {"label": "x < 0 && x > -10"}, "data": [{"fn": "x"}]}';
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      // Should not have unescaped HTML entities in output
      expect(result).toContain('data-plot-b64=');

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const binary = atob(match[1]);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        expect(decoded).toBe(config);
      }
    });

    it('handles multiline plot configuration', () => {
      const config = `{
  "data": [
    {"fn": "sin(x)", "color": "red"},
    {"fn": "cos(x)", "color": "blue"}
  ],
  "xAxis": {"domain": [-6.28, 6.28]},
  "yAxis": {"domain": [-2, 2]}
}`;
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      expect(result).toContain('data-plot-b64=');

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const binary = atob(match[1]);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        expect(decoded).toBe(config);
      }
    });

    it('handles empty plot configuration', () => {
      const markdown = '```plot\n{}\n```';
      const result = renderMarkdown(markdown);

      expect(result).toContain('data-plot-b64=');

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe('{}');
      }
    });

    it('handles plot configuration with quotes', () => {
      const config = '{"title": "Plot \\"Title\\"", "data": [{"fn": "x"}]}';
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe(config);
      }
    });

    it('does not apply syntax highlighting to plot blocks', () => {
      const markdown = '```plot\n{"data": [{"fn": "x"}]}\n```';
      const result = renderMarkdown(markdown);

      // Should not have prism highlighting classes
      expect(result).not.toContain('language-plot');
      expect(result).not.toContain('<code');
    });

    it('renders multiple plot blocks independently', () => {
      const markdown = `
\`\`\`plot
{"data": [{"fn": "x"}]}
\`\`\`

Some text between plots.

\`\`\`plot
{"data": [{"fn": "x^2"}]}
\`\`\`
`;
      const result = renderMarkdown(markdown);

      const matches = result.match(/data-plot-b64="[^"]+"/g);
      expect(matches).toHaveLength(2);
    });
  });

  describe('renderFunctionPlots DOM integration', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('marks elements as rendered to prevent double rendering', () => {
      const config = JSON.stringify({ data: [{ fn: 'x' }] });
      const bytes = new TextEncoder().encode(config);
      const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
      const encoded = btoa(binary);

      container.innerHTML = `<div class="function-plot" data-plot-b64="${encoded}"></div>`;

      // First render
      renderFunctionPlots();

      const element = container.querySelector('.function-plot');
      expect(element?.hasAttribute('data-rendered')).toBe(true);
    });

    it('does not re-render already rendered plots', () => {
      const config = JSON.stringify({ data: [{ fn: 'x' }] });
      const bytes = new TextEncoder().encode(config);
      const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
      const encoded = btoa(binary);

      container.innerHTML = `<div class="function-plot" data-plot-b64="${encoded}" data-rendered="true"></div>`;

      // Mock to track if function-plot tries to render
      const element = container.querySelector('.function-plot');
      const originalInnerHTML = element?.innerHTML;

      renderFunctionPlots();

      // Content should not have changed for already-rendered element
      expect(element?.innerHTML).toBe(originalInnerHTML);
    });

    it('handles elements without data-plot-b64 attribute', () => {
      container.innerHTML = `<div class="function-plot"></div>`;

      // Should not throw
      expect(() => renderFunctionPlots()).not.toThrow();
    });

    it('handles invalid base64 gracefully', () => {
      container.innerHTML = `<div class="function-plot" data-plot-b64="not-valid-base64!!!"></div>`;

      // Should not throw, should show error message
      expect(() => renderFunctionPlots()).not.toThrow();

      const element = container.querySelector('.function-plot');
      expect(element?.innerHTML).toContain('Error rendering plot');
    });

    it('handles invalid JSON in plot config gracefully', () => {
      // Valid base64 but invalid JSON
      const invalidJson = 'not json at all';
      const encoded = btoa(invalidJson);

      container.innerHTML = `<div class="function-plot" data-plot-b64="${encoded}"></div>`;

      expect(() => renderFunctionPlots()).not.toThrow();

      const element = container.querySelector('.function-plot');
      expect(element?.innerHTML).toContain('Error rendering plot');
    });
  });

  describe('base64 encoding edge cases', () => {
    it('handles empty string', () => {
      const markdown = '```plot\n\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe('');
      }
    });

    it('handles single character', () => {
      const markdown = '```plot\n{\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe('{');
      }
    });

    it('handles very long configuration', () => {
      const longData = Array(100).fill('{"fn": "x"}').join(',');
      const config = `{"data": [${longData}]}`;
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      expect(match).not.toBeNull();

      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe(config);
      }
    });

    it('handles mathematical expressions with special characters', () => {
      const config = '{"data": [{"fn": "log(x)/ln(10)"}]}';
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const decoded = atob(match[1]);
        expect(decoded).toBe(config);
      }
    });

    it('handles expressions with unicode math symbols', () => {
      const config = '{"title": "π ≈ 3.14159", "data": [{"fn": "x"}]}';
      const markdown = '```plot\n' + config + '\n```';
      const result = renderMarkdown(markdown);

      const match = result.match(/data-plot-b64="([^"]+)"/);
      if (match) {
        const binary = atob(match[1]);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        expect(decoded).toBe(config);
      }
    });
  });

  describe('plot blocks vs regular code blocks', () => {
    it('renders plot blocks differently from javascript blocks', () => {
      const plotMarkdown = '```plot\n{"data": [{"fn": "x"}]}\n```';
      const jsMarkdown = '```javascript\nconst x = 1;\n```';

      const plotResult = renderMarkdown(plotMarkdown);
      const jsResult = renderMarkdown(jsMarkdown);

      expect(plotResult).toContain('function-plot');
      expect(plotResult).not.toContain('language-javascript');

      expect(jsResult).toContain('language-javascript');
      expect(jsResult).not.toContain('function-plot');
    });

    it('renders plot blocks differently from mermaid blocks', () => {
      const plotMarkdown = '```plot\n{"data": [{"fn": "x"}]}\n```';
      const mermaidMarkdown = '```mermaid\ngraph TD;\n  A-->B;\n```';

      const plotResult = renderMarkdown(plotMarkdown);
      const mermaidResult = renderMarkdown(mermaidMarkdown);

      expect(plotResult).toContain('function-plot');
      expect(plotResult).not.toContain('class="mermaid"');

      expect(mermaidResult).toContain('class="mermaid"');
      expect(mermaidResult).not.toContain('function-plot');
    });
  });
});
