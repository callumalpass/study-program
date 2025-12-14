/**
 * Shared HTML utility functions.
 */

/**
 * Escape HTML special characters to prevent XSS attacks.
 * Uses the browser's built-in text escaping via textContent.
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
