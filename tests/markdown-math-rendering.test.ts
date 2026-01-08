/**
 * Markdown Math Rendering Tests
 *
 * Tests for LaTeX math rendering in markdown content,
 * covering inline math ($...$), display math ($$...$$),
 * and edge cases in math parsing.
 */

import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '../src/components/markdown';

describe('Markdown Math Rendering', () => {
  describe('inline math ($...$)', () => {
    it('renders simple inline math', () => {
      const result = renderMarkdown('The equation $x + y = z$ is simple.');
      expect(result).toContain('math-inline');
      expect(result).toContain('katex');
    });

    it('renders multiple inline math expressions', () => {
      const result = renderMarkdown('We have $a = 1$ and $b = 2$.');
      const matches = result.match(/math-inline/g);
      expect(matches).toHaveLength(2);
    });

    it('handles subscripts and superscripts', () => {
      const result = renderMarkdown('Use $x^2$ for squares and $x_i$ for indices.');
      expect(result).toContain('math-inline');
    });

    it('handles Greek letters', () => {
      const result = renderMarkdown('The angle $\\theta$ and ratio $\\pi$.');
      expect(result).toContain('math-inline');
    });

    it('handles fractions', () => {
      const result = renderMarkdown('The result is $\\frac{1}{2}$.');
      expect(result).toContain('math-inline');
    });

    it('handles square roots', () => {
      const result = renderMarkdown('Calculate $\\sqrt{2}$ precisely.');
      expect(result).toContain('math-inline');
    });

    it('does not match dollar signs with spaces', () => {
      const result = renderMarkdown('The price is $ 5.00 but $x=1$ is math.');
      // Should only have one math-inline (for x=1)
      const mathMatches = result.match(/math-inline/g);
      expect(mathMatches).toHaveLength(1);
    });

    it('does not match empty dollar signs', () => {
      const result = renderMarkdown('Empty $$ should not match inline.');
      // Should not have math-inline
      expect(result).not.toContain('math-inline');
    });

    it('handles math at start of line', () => {
      const result = renderMarkdown('$x = 5$ is the answer.');
      expect(result).toContain('math-inline');
    });

    it('handles math at end of line', () => {
      const result = renderMarkdown('The answer is $x = 5$');
      expect(result).toContain('math-inline');
    });
  });

  describe('display math ($$...$$)', () => {
    it('renders display math block', () => {
      const result = renderMarkdown('Here is the equation:\n\n$$\nx^2 + y^2 = z^2\n$$');
      expect(result).toContain('math-display');
      expect(result).toContain('katex');
    });

    it('renders inline display math', () => {
      const result = renderMarkdown('The formula $$E = mc^2$$ is famous.');
      expect(result).toContain('math-display');
    });

    it('handles complex equations', () => {
      const result = renderMarkdown('$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$');
      expect(result).toContain('math-display');
    });

    it('handles matrices', () => {
      const result = renderMarkdown('$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$');
      expect(result).toContain('math-display');
    });

    it('handles summation notation', () => {
      const result = renderMarkdown('$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$');
      expect(result).toContain('math-display');
    });

    it('handles limits', () => {
      const result = renderMarkdown('$$\\lim_{x \\to \\infty} \\frac{1}{x} = 0$$');
      expect(result).toContain('math-display');
    });

    it('does not confuse display math with inline math', () => {
      const result = renderMarkdown('$$x = 1$$');
      expect(result).toContain('math-display');
      expect(result).not.toContain('math-inline');
    });
  });

  describe('mixed content', () => {
    it('handles text with both inline and display math', () => {
      const md = `The inline equation $E = mc^2$ is famous.

$$
F = ma
$$

And $p = mv$ is momentum.`;
      const result = renderMarkdown(md);
      expect(result).toContain('math-inline');
      expect(result).toContain('math-display');
    });

    it('handles math in lists', () => {
      const md = `- First: $a = 1$
- Second: $b = 2$
- Third: $c = 3$`;
      const result = renderMarkdown(md);
      const mathMatches = result.match(/math-inline/g);
      expect(mathMatches).toHaveLength(3);
    });

    it('handles math in blockquotes', () => {
      const result = renderMarkdown('> The equation $x^2 = 4$ has two solutions.');
      expect(result).toContain('math-inline');
      expect(result).toContain('blockquote');
    });

    it('handles math in headings', () => {
      const result = renderMarkdown('## Section on $\\theta$ angles');
      expect(result).toContain('math-inline');
      expect(result).toContain('h2');
    });

    it('handles math next to code', () => {
      const result = renderMarkdown('Use `math.sqrt(x)` for $\\sqrt{x}$.');
      expect(result).toContain('math-inline');
      expect(result).toContain('inline-code');
    });
  });

  describe('error handling', () => {
    it('handles invalid LaTeX gracefully', () => {
      // KaTeX should not throw but show error message
      const result = renderMarkdown('Invalid: $\\invalid{command}$');
      expect(result).toBeDefined();
      // KaTeX renders error spans for invalid commands
    });

    it('handles unclosed math delimiters', () => {
      const result = renderMarkdown('Unclosed $x = 1 is problematic.');
      // Should render as text, not math
      expect(result).not.toContain('math-inline');
    });

    it('handles empty display math', () => {
      const result = renderMarkdown('Empty: $$$$');
      // Should handle gracefully
      expect(result).toBeDefined();
    });
  });

  describe('special characters in math', () => {
    it('handles angle brackets', () => {
      const result = renderMarkdown('Vector $\\langle a, b \\rangle$ notation.');
      expect(result).toContain('math-inline');
    });

    it('handles set notation', () => {
      const result = renderMarkdown('Set $\\{1, 2, 3\\}$ is finite.');
      expect(result).toContain('math-inline');
    });

    it('handles absolute value', () => {
      const result = renderMarkdown('The magnitude $|x|$ is always positive.');
      expect(result).toContain('math-inline');
    });

    it('handles bold math', () => {
      const result = renderMarkdown('Vector $\\mathbf{v}$ in bold.');
      expect(result).toContain('math-inline');
    });

    it('handles text in math', () => {
      const result = renderMarkdown('$x \\text{ if } x > 0$');
      expect(result).toContain('math-inline');
    });
  });

  describe('escaping', () => {
    it('handles escaped dollar signs', () => {
      // In markdown, \$ should produce a literal $
      const result = renderMarkdown('Price is \\$50, but $x=1$ is math.');
      const mathMatches = result.match(/math-inline/g);
      // Should only have one math expression
      expect(mathMatches).toHaveLength(1);
    });

    it('handles backslashes in regular text', () => {
      const result = renderMarkdown('Path: C:\\Users\\Name and $x=1$');
      expect(result).toContain('math-inline');
    });
  });
});

describe('Math rendering with frontmatter', () => {
  it('strips frontmatter before rendering math', () => {
    const md = `---
title: Math Test
---

The equation $x = 1$ is simple.`;
    const result = renderMarkdown(md);
    expect(result).toContain('math-inline');
    expect(result).not.toContain('title:');
  });

  it('handles frontmatter with math-like content', () => {
    const md = `---
title: "$10 Sale"
---

Real math: $x = 10$`;
    const result = renderMarkdown(md);
    expect(result).toContain('math-inline');
    // Frontmatter should be stripped
    expect(result).not.toContain('Sale');
  });
});
