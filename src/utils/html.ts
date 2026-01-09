/**
 * Shared HTML utility functions.
 */

/**
 * Escape HTML special characters to prevent XSS attacks.
 * Escapes <, >, &, ", and ' to make the string safe for use
 * in both HTML content and HTML attributes.
 *
 * Handles null/undefined inputs gracefully by returning an empty string.
 */
export function escapeHtml(text: string | null | undefined): string {
  if (text == null) {
    return '';
  }
  const div = document.createElement('div');
  div.textContent = text;
  // innerHTML escapes <, >, and &
  // We also need to escape quotes for attribute contexts
  return div.innerHTML
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
