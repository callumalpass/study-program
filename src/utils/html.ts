/**
 * Shared HTML utility functions.
 */

/**
 * Escape HTML special characters to prevent XSS attacks.
 * Escapes &, <, >, ", and ' to make the string safe for use
 * in both HTML content and HTML attributes.
 *
 * Handles null/undefined inputs gracefully by returning an empty string.
 *
 * Uses pure string replacement for consistency across all JavaScript
 * environments (browser, Node.js, etc.) without DOM dependency.
 */
export function escapeHtml(text: string | null | undefined): string {
  if (text == null) {
    return '';
  }
  // Order matters: escape & first to avoid double-escaping
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
