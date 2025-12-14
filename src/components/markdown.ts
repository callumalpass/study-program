import { marked } from 'marked';
import Prism from 'prismjs';

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
    let html = marked.parse(content) as string;

    // Post-process for any additional features
    html = processLatex(html);

    return html;
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return `<pre>${escapeHtml(content)}</pre>`;
  }
}

/**
 * Process LaTeX math expressions.
 * Uses delimiters: $...$ for inline math, $$...$$ for display math.
 * Note: This is a placeholder. Full LaTeX support requires KaTeX or MathJax.
 */
function processLatex(html: string): string {
  // Display math ($$...$$)
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
    return `<div class="math-display" data-math="${escapeHtml(math.trim())}">$$${escapeHtml(math.trim())}$$</div>`;
  });

  // Inline math ($...$)
  html = html.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    return `<span class="math-inline" data-math="${escapeHtml(math.trim())}">$${escapeHtml(math.trim())}$</span>`;
  });

  return html;
}

/**
 * Escape HTML special characters.
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Render markdown to a DOM element.
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

  // TODO: Initialize KaTeX for math rendering if available
  initializeLatexRendering(container);
}

/**
 * Initialize LaTeX rendering if KaTeX is available.
 * This is a placeholder for future KaTeX integration.
 */
function initializeLatexRendering(container: HTMLElement): void {
  // Check if KaTeX is available
  if (typeof (window as any).katex !== 'undefined') {
    const katex = (window as any).katex;

    // Render display math
    container.querySelectorAll('.math-display').forEach((element) => {
      const math = element.getAttribute('data-math');
      if (math) {
        try {
          katex.render(math, element, {
            displayMode: true,
            throwOnError: false,
          });
        } catch (error) {
          console.error('KaTeX rendering error:', error);
        }
      }
    });

    // Render inline math
    container.querySelectorAll('.math-inline').forEach((element) => {
      const math = element.getAttribute('data-math');
      if (math) {
        try {
          katex.render(math, element, {
            displayMode: false,
            throwOnError: false,
          });
        } catch (error) {
          console.error('KaTeX rendering error:', error);
        }
      }
    });
  }
}

/**
 * Extract plain text from markdown (strips formatting).
 * Useful for previews and search.
 */
export function extractPlainText(markdown: string): string {
  const html = renderMarkdown(markdown);
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

/**
 * Generate a table of contents from markdown headers.
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
