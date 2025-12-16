/**
 * Simple toast notification component
 */

const TOAST_CONTAINER_ID = 'toast-container';
const TOAST_DURATION_MS = 3000;

type ToastType = 'success' | 'error' | 'info';

/**
 * Get or create the toast container element
 */
function getToastContainer(): HTMLElement {
  let container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = TOAST_CONTAINER_ID;
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Show a toast notification
 * @param message - The message to display
 * @param type - The type of toast: 'success', 'error', or 'info'
 */
export function showToast(message: string, type: ToastType = 'info'): void {
  const container = getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Trigger reflow to enable CSS transition
  toast.offsetHeight;

  // Show the toast
  toast.classList.add('toast-visible');

  // Auto-dismiss after duration
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');

    // Remove from DOM after animation
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, TOAST_DURATION_MS);
}
