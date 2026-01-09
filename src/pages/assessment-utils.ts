// Shared utilities for assessment pages
import { navigateToSubject } from '@/core/router';
import { escapeHtml } from '@/utils/html';

/**
 * Render not found page
 */
export function renderNotFound(container: HTMLElement, itemType: string, subjectId: string): void {
  const safeItemType = escapeHtml(itemType);
  container.innerHTML = `
    <div class="error-page">
      <h1>${safeItemType} Not Found</h1>
      <p>The ${safeItemType.toLowerCase()} you're looking for doesn't exist.</p>
      <button class="btn btn-primary" id="back-to-subject">Back to Subject</button>
    </div>
  `;

  const backBtn = container.querySelector('#back-to-subject');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateToSubject(subjectId));
  }
}

/**
 * Format date for display
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

/**
 * Format programming language
 */
export function formatLanguage(lang: string): string {
  const languageMap: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    rust: 'Rust',
    go: 'Go',
    sql: 'SQL',
    bash: 'Bash',
    yaml: 'YAML',
    dockerfile: 'Dockerfile',
  };
  return languageMap[lang] || lang;
}
