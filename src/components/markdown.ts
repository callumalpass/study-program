import { marked } from 'marked';
import Prism from 'prismjs';
import katex from 'katex';
import mermaid from 'mermaid';
import functionPlot from 'function-plot';
import 'katex/dist/katex.min.css';
import { escapeHtml } from '@/utils/html';
import { parseFrontmatter } from '@/subjects/loader';

// Initialize mermaid with default config
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
});

/**
 * Update Mermaid theme configuration.
 * Call this when the application theme changes.
 */
export function updateMermaidTheme(isDark: boolean): void {
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
  });
}

// Import core Prism languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

// Custom renderer for code blocks with syntax highlighting
const renderer = new marked.Renderer();

renderer.code = function(code: string, language: string | undefined): string {
  // Handle Mermaid diagrams - output as <pre class="mermaid"> for client-side rendering
  if (language === 'mermaid') {
    return `<pre class="mermaid">${escapeHtml(code)}</pre>`;
  }

  // Handle function plots - output as <div class="function-plot"> for client-side rendering
  // Use base64 encoding to avoid HTML attribute escaping issues with JSON
  if (language === 'plot') {
    const encoded = btoa(unescape(encodeURIComponent(code)));
    return `<div class="function-plot" data-plot-b64="${encoded}"></div>`;
  }

  const validLanguage = language && Prism.languages[language] ? language : 'plaintext';

  let highlighted: string;
  try {
    if (validLanguage !== 'plaintext') {
      highlighted = Prism.highlight(code, Prism.languages[validLanguage], validLanguage);
    } else {
      highlighted = escapeHtml(code);
    }
  } catch (error) {
    console.error('Syntax highlighting error:', error);
    highlighted = escapeHtml(code);
  }

  return `<pre class="language-${validLanguage}"><code class="language-${validLanguage}">${highlighted}</code></pre>`;
};

// Custom renderer for inline code
renderer.codespan = function(code: string): string {
  return `<code class="inline-code">${escapeHtml(code)}</code>`;
};

// Custom renderer for links (open external links in new tab)
renderer.link = function(href: string, title: string | null | undefined, text: string): string {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
  const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';

  return `<a href="${escapeHtml(href)}"${titleAttr}${targetAttr}>${text}</a>`;
};

// Custom renderer for tables
renderer.table = function(header: string, body: string): string {
  return `<div class="table-wrapper"><table class="markdown-table"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
};

// Custom renderer for blockquotes
renderer.blockquote = function(quote: string): string {
  return `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
};

// Custom renderer for lists
renderer.list = function(body: string, ordered: boolean, start: number): string {
  const type = ordered ? 'ol' : 'ul';
  const startAttr = ordered && start !== 1 ? ` start="${start}"` : '';
  return `<${type} class="markdown-list"${startAttr}>${body}</${type}>`;
};

// Set custom renderer
marked.use({ renderer });

/**
 * Render markdown content to HTML with syntax highlighting.
 *
 * @param content - Markdown content to render
 * @returns HTML string
 */
export function renderMarkdown(content: string): string {
  if (!content) {
    return '';
  }

  try {
    // Strip frontmatter if present
    const { content: markdownContent } = parseFrontmatter(content);

    let html = marked.parse(markdownContent) as string;

    // Post-process for any additional features
    html = processLatex(html);

    return html;
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return `<pre>${escapeHtml(content)}</pre>`;
  }
}

/**
 * Render any Mermaid diagrams in the document.
 * Call this after content has been injected into the DOM.
 */
export async function renderMermaidDiagrams(): Promise<void> {
  try {
    await mermaid.run();
  } catch (error) {
    console.error('Mermaid rendering error:', error);
  }
}

/**
 * Render any function plots in the document.
 * Call this after content has been injected into the DOM.
 */
export function renderFunctionPlots(): void {
  const plotElements = document.querySelectorAll('.function-plot[data-plot-b64]');

  plotElements.forEach((element) => {
    const encodedData = element.getAttribute('data-plot-b64');
    if (!encodedData || element.hasAttribute('data-rendered')) {
      return;
    }

    try {
      // Decode base64 to get the original JSON
      const plotData = decodeURIComponent(escape(atob(encodedData)));
      const config = JSON.parse(plotData);

      // Get theme colors from CSS variables
      const styles = getComputedStyle(document.documentElement);
      const textColor = styles.getPropertyValue('--text-primary').trim() || '#e4e4e7';
      const gridColor = styles.getPropertyValue('--border-subtle').trim() || '#27272a';

      // Apply defaults and theme-aware styling
      const plotConfig = {
        target: element,
        width: Math.min(600, element.clientWidth || 600),
        height: 400,
        grid: true,
        ...config,
        xAxis: {
          label: config.xAxis?.label || 'x',
          ...config.xAxis,
        },
        yAxis: {
          label: config.yAxis?.label || 'y',
          ...config.yAxis,
        },
      };

      functionPlot(plotConfig);

      // Apply theme colors to SVG elements after rendering
      const svg = element.querySelector('svg');
      if (svg) {
        svg.style.backgroundColor = 'transparent';
        svg.querySelectorAll('text').forEach((text) => {
          text.style.fill = textColor;
        });
        svg.querySelectorAll('.x.axis line, .y.axis line, .grid line').forEach((line) => {
          (line as SVGLineElement).style.stroke = gridColor;
        });
      }

      element.setAttribute('data-rendered', 'true');
    } catch (error) {
      console.error('Function plot rendering error:', error);
      element.innerHTML = `<div class="plot-error">Error rendering plot: ${error instanceof Error ? error.message : 'Unknown error'}</div>`;
    }
  });
}

/**
 * Unescape HTML entities that marked may have escaped in math content.
 */
function unescapeHtmlEntities(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/**
 * Process LaTeX math expressions.
 * Uses delimiters: $...$ for inline math, $$...$$ for display math.
 * Note: This is a placeholder. Full LaTeX support requires KaTeX or MathJax.
 */
function processLatex(html: string): string {
  // Display math ($$...$$)
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
    try {
      // Unescape HTML entities that marked may have escaped
      const unescapedMath = unescapeHtmlEntities(math.trim());
      return `<div class="math-display">${katex.renderToString(unescapedMath, {
        displayMode: true,
        throwOnError: false,
      })}</div>`;
    } catch (error) {
      console.error('KaTeX display render error:', error);
      return match;
    }
  });

  // Inline math ($...$)
  html = html.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    try {
      // Unescape HTML entities that marked may have escaped
      const unescapedMath = unescapeHtmlEntities(math.trim());
      return `<span class="math-inline">${katex.renderToString(unescapedMath, {
        displayMode: false,
        throwOnError: false,
      })}</span>`;
    } catch (error) {
      console.error('KaTeX inline render error:', error);
      return match;
    }
  });

  return html;
}

/**
 * Render markdown to a DOM element.
 * @internal Not currently used - available for future features
 *
 * @param container - Container element to render into
 * @param content - Markdown content
 */
export function renderMarkdownToElement(
  container: HTMLElement,
  content: string
): void {
  container.innerHTML = '';
  container.className = 'markdown-content';

  const html = renderMarkdown(content);
  container.innerHTML = html;

  // Apply syntax highlighting to any code blocks that weren't processed
  container.querySelectorAll('pre code').forEach((block) => {
    if (!block.classList.contains('language-plaintext')) {
      Prism.highlightElement(block as HTMLElement);
    }
  });
}

/**
 * Extract plain text from markdown (strips formatting).
 * Useful for previews and search.
 * @internal Not currently used - available for future features
 */
export function extractPlainText(markdown: string): string {
  const html = renderMarkdown(markdown);
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

/**
 * Generate a table of contents from markdown headers.
 * @internal Not currently used - available for future features
 */
export function generateTableOfContents(markdown: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const toc: Array<{ level: number; text: string; id: string }> = [];
  const lines = markdown.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      toc.push({ level, text, id });
    }
  });

  return toc;
}
