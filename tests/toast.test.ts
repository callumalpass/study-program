import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showToast } from '../src/components/toast';

describe('toast notifications', () => {
  beforeEach(() => {
    // Clean up any existing toast containers
    const existingContainer = document.getElementById('toast-container');
    if (existingContainer) {
      existingContainer.remove();
    }
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    // Clean up after each test
    const container = document.getElementById('toast-container');
    if (container) {
      container.remove();
    }
  });

  describe('showToast', () => {
    it('creates toast container if it does not exist', () => {
      expect(document.getElementById('toast-container')).toBeNull();

      showToast('Test message');

      const container = document.getElementById('toast-container');
      expect(container).not.toBeNull();
      expect(container?.className).toBe('toast-container');
    });

    it('reuses existing toast container', () => {
      showToast('First message');
      const firstContainer = document.getElementById('toast-container');

      showToast('Second message');
      const secondContainer = document.getElementById('toast-container');

      expect(firstContainer).toBe(secondContainer);
    });

    it('appends container to document body', () => {
      showToast('Test message');

      const container = document.getElementById('toast-container');
      expect(container?.parentElement).toBe(document.body);
    });

    it('creates toast element with correct message', () => {
      showToast('Hello World');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.textContent).toBe('Hello World');
    });

    it('applies default info type class', () => {
      showToast('Info message');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.classList.contains('toast-info')).toBe(true);
    });

    it('applies success type class', () => {
      showToast('Success!', 'success');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast-success');
      expect(toast).not.toBeNull();
    });

    it('applies error type class', () => {
      showToast('Error occurred', 'error');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast-error');
      expect(toast).not.toBeNull();
    });

    it('applies info type class explicitly', () => {
      showToast('Info message', 'info');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast-info');
      expect(toast).not.toBeNull();
    });

    it('adds toast-visible class for visibility', () => {
      showToast('Visible toast');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.classList.contains('toast-visible')).toBe(true);
    });

    it('removes toast-visible and adds toast-hiding after duration', () => {
      showToast('Temporary toast');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');

      // Initially visible
      expect(toast?.classList.contains('toast-visible')).toBe(true);
      expect(toast?.classList.contains('toast-hiding')).toBe(false);

      // After 3000ms (TOAST_DURATION_MS)
      vi.advanceTimersByTime(3000);

      expect(toast?.classList.contains('toast-visible')).toBe(false);
      expect(toast?.classList.contains('toast-hiding')).toBe(true);
    });

    it('removes toast from DOM after animation completes', () => {
      showToast('Removable toast');

      const container = document.getElementById('toast-container');
      let toast = container?.querySelector('.toast');
      expect(toast).not.toBeNull();

      // After duration + animation time (3000 + 300)
      vi.advanceTimersByTime(3300);

      toast = container?.querySelector('.toast');
      expect(toast).toBeNull();
    });

    it('can display multiple toasts simultaneously', () => {
      showToast('First toast');
      showToast('Second toast');
      showToast('Third toast');

      const container = document.getElementById('toast-container');
      const toasts = container?.querySelectorAll('.toast');
      expect(toasts?.length).toBe(3);
    });

    it('removes toasts independently based on their timing', () => {
      showToast('First toast');
      vi.advanceTimersByTime(1000);

      showToast('Second toast');
      vi.advanceTimersByTime(1000);

      showToast('Third toast');

      const container = document.getElementById('toast-container');

      // All three should be visible
      expect(container?.querySelectorAll('.toast').length).toBe(3);

      // First toast should be removed after another 1300ms (1000 + 300 animation)
      vi.advanceTimersByTime(1300);
      expect(container?.querySelectorAll('.toast').length).toBe(2);

      // Second toast should be removed after another 1000ms
      vi.advanceTimersByTime(1000);
      expect(container?.querySelectorAll('.toast').length).toBe(1);
    });

    it('handles empty message', () => {
      showToast('');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.textContent).toBe('');
    });

    it('handles message with special characters', () => {
      const specialMessage = '<script>alert("xss")</script>';
      showToast(specialMessage);

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');

      // textContent should not execute scripts
      expect(toast?.textContent).toBe(specialMessage);
      // Should not contain actual script tag as child
      expect(toast?.querySelector('script')).toBeNull();
    });

    it('handles message with unicode characters', () => {
      const unicodeMessage = 'Success! 🎉 完了';
      showToast(unicodeMessage);

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.textContent).toBe(unicodeMessage);
    });

    it('handles very long message', () => {
      const longMessage = 'A'.repeat(1000);
      showToast(longMessage);

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.textContent).toBe(longMessage);
    });

    it('handles message with newlines', () => {
      const multilineMessage = 'Line 1\nLine 2\nLine 3';
      showToast(multilineMessage);

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.textContent).toBe(multilineMessage);
    });
  });

  describe('container element', () => {
    it('has correct id attribute', () => {
      showToast('Test');

      const container = document.getElementById('toast-container');
      expect(container?.id).toBe('toast-container');
    });

    it('has toast-container class', () => {
      showToast('Test');

      const container = document.getElementById('toast-container');
      expect(container?.classList.contains('toast-container')).toBe(true);
    });
  });

  describe('toast element structure', () => {
    it('has base toast class', () => {
      showToast('Test', 'success');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.classList.contains('toast')).toBe(true);
    });

    it('has both base and type class', () => {
      showToast('Error!', 'error');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');
      expect(toast?.classList.contains('toast')).toBe(true);
      expect(toast?.classList.contains('toast-error')).toBe(true);
    });
  });

  describe('timing behavior', () => {
    it('toast remains visible for full duration', () => {
      showToast('Persistent toast');

      const container = document.getElementById('toast-container');
      const toast = container?.querySelector('.toast');

      // Just before duration ends
      vi.advanceTimersByTime(2999);
      expect(toast?.classList.contains('toast-visible')).toBe(true);

      // At duration
      vi.advanceTimersByTime(1);
      expect(toast?.classList.contains('toast-visible')).toBe(false);
    });

    it('toast element remains in DOM during hiding animation', () => {
      showToast('Animating toast');

      const container = document.getElementById('toast-container');

      // After duration but before animation completes
      vi.advanceTimersByTime(3100);
      const toast = container?.querySelector('.toast');
      expect(toast).not.toBeNull();
      expect(toast?.classList.contains('toast-hiding')).toBe(true);
    });
  });
});
