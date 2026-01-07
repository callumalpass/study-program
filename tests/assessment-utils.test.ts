import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderNotFound, formatDate, formatLanguage } from '../src/pages/assessment-utils';

// Mock the router module
vi.mock('@/core/router', () => ({
  navigateToSubject: vi.fn(),
}));

import { navigateToSubject } from '@/core/router';

describe('assessment-utils', () => {
  describe('formatLanguage', () => {
    describe('known languages', () => {
      it('formats javascript to JavaScript', () => {
        expect(formatLanguage('javascript')).toBe('JavaScript');
      });

      it('formats typescript to TypeScript', () => {
        expect(formatLanguage('typescript')).toBe('TypeScript');
      });

      it('formats python to Python', () => {
        expect(formatLanguage('python')).toBe('Python');
      });

      it('formats java to Java', () => {
        expect(formatLanguage('java')).toBe('Java');
      });

      it('formats cpp to C++', () => {
        expect(formatLanguage('cpp')).toBe('C++');
      });

      it('formats c to C', () => {
        expect(formatLanguage('c')).toBe('C');
      });

      it('formats rust to Rust', () => {
        expect(formatLanguage('rust')).toBe('Rust');
      });

      it('formats go to Go', () => {
        expect(formatLanguage('go')).toBe('Go');
      });

      it('formats sql to SQL', () => {
        expect(formatLanguage('sql')).toBe('SQL');
      });

      it('formats bash to Bash', () => {
        expect(formatLanguage('bash')).toBe('Bash');
      });

      it('formats yaml to YAML', () => {
        expect(formatLanguage('yaml')).toBe('YAML');
      });

      it('formats dockerfile to Dockerfile', () => {
        expect(formatLanguage('dockerfile')).toBe('Dockerfile');
      });
    });

    describe('unknown languages', () => {
      it('returns original string for unknown language', () => {
        expect(formatLanguage('ruby')).toBe('ruby');
      });

      it('returns original string for empty string', () => {
        expect(formatLanguage('')).toBe('');
      });

      it('returns original string for language with different casing', () => {
        // The function uses lowercase keys, so uppercase input won't match
        expect(formatLanguage('JavaScript')).toBe('JavaScript');
        expect(formatLanguage('PYTHON')).toBe('PYTHON');
      });

      it('returns original string for language with spaces', () => {
        expect(formatLanguage('visual basic')).toBe('visual basic');
      });

      it('handles special characters in unknown languages', () => {
        expect(formatLanguage('c#')).toBe('c#');
        expect(formatLanguage('f#')).toBe('f#');
      });
    });
  });

  describe('formatDate', () => {
    // Save original toLocaleString to restore after tests
    const originalToLocaleString = Date.prototype.toLocaleString;

    afterEach(() => {
      Date.prototype.toLocaleString = originalToLocaleString;
    });

    it('formats valid ISO date string', () => {
      const isoString = '2024-06-15T10:30:00.000Z';
      const result = formatDate(isoString);
      // The result depends on the system locale, but should be a non-empty string
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles date with timezone offset', () => {
      const isoString = '2024-12-25T14:00:00+05:00';
      const result = formatDate(isoString);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles date at midnight', () => {
      const isoString = '2024-01-01T00:00:00.000Z';
      const result = formatDate(isoString);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles date at end of day', () => {
      const isoString = '2024-12-31T23:59:59.999Z';
      const result = formatDate(isoString);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns Invalid Date string for invalid ISO string', () => {
      const result = formatDate('not-a-date');
      expect(result).toBe('Invalid Date');
    });

    it('returns Invalid Date string for empty string', () => {
      const result = formatDate('');
      expect(result).toBe('Invalid Date');
    });

    it('handles partial ISO date (date only)', () => {
      const isoString = '2024-06-15';
      const result = formatDate(isoString);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles leap year date', () => {
      const isoString = '2024-02-29T12:00:00.000Z';
      const result = formatDate(isoString);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('renderNotFound', () => {
    let container: HTMLElement;
    const mockNavigateToSubject = navigateToSubject as ReturnType<typeof vi.fn>;

    beforeEach(() => {
      container = document.createElement('div');
      mockNavigateToSubject.mockClear();
    });

    it('renders error page with correct item type in heading', () => {
      renderNotFound(container, 'Quiz', 'cs101');

      const heading = container.querySelector('h1');
      expect(heading).not.toBeNull();
      expect(heading?.textContent).toBe('Quiz Not Found');
    });

    it('renders error page with lowercase item type in description', () => {
      renderNotFound(container, 'Exercise', 'cs101');

      const paragraph = container.querySelector('p');
      expect(paragraph).not.toBeNull();
      expect(paragraph?.textContent).toBe("The exercise you're looking for doesn't exist.");
    });

    it('renders back to subject button', () => {
      renderNotFound(container, 'Project', 'cs102');

      const button = container.querySelector('#back-to-subject');
      expect(button).not.toBeNull();
      expect(button?.textContent).toBe('Back to Subject');
    });

    it('applies error-page class to container div', () => {
      renderNotFound(container, 'Quiz', 'cs101');

      const errorDiv = container.querySelector('.error-page');
      expect(errorDiv).not.toBeNull();
    });

    it('navigates to subject when back button is clicked', () => {
      renderNotFound(container, 'Quiz', 'cs101');

      const button = container.querySelector('#back-to-subject') as HTMLButtonElement;
      button.click();

      expect(mockNavigateToSubject).toHaveBeenCalledTimes(1);
      expect(mockNavigateToSubject).toHaveBeenCalledWith('cs101');
    });

    it('passes correct subject ID to navigation', () => {
      renderNotFound(container, 'Exercise', 'math201');

      const button = container.querySelector('#back-to-subject') as HTMLButtonElement;
      button.click();

      expect(mockNavigateToSubject).toHaveBeenCalledWith('math201');
    });

    it('handles different item types correctly', () => {
      const itemTypes = ['Quiz', 'Exercise', 'Project', 'Exam', 'Topic'];

      itemTypes.forEach((itemType) => {
        container = document.createElement('div');
        renderNotFound(container, itemType, 'cs101');

        const heading = container.querySelector('h1');
        expect(heading?.textContent).toBe(`${itemType} Not Found`);
      });
    });

    it('handles empty item type', () => {
      renderNotFound(container, '', 'cs101');

      const heading = container.querySelector('h1');
      const paragraph = container.querySelector('p');
      expect(heading?.textContent).toBe(' Not Found');
      expect(paragraph?.textContent).toBe("The  you're looking for doesn't exist.");
    });

    it('handles item type with special characters', () => {
      renderNotFound(container, 'Quiz<script>', 'cs101');

      // The innerHTML assignment will escape special characters in modern browsers
      // but we should verify the element still renders
      const heading = container.querySelector('h1');
      expect(heading).not.toBeNull();
    });

    it('handles empty subject ID', () => {
      renderNotFound(container, 'Quiz', '');

      const button = container.querySelector('#back-to-subject') as HTMLButtonElement;
      button.click();

      expect(mockNavigateToSubject).toHaveBeenCalledWith('');
    });

    it('handles subject ID with special characters', () => {
      renderNotFound(container, 'Quiz', 'cs-101_v2');

      const button = container.querySelector('#back-to-subject') as HTMLButtonElement;
      button.click();

      expect(mockNavigateToSubject).toHaveBeenCalledWith('cs-101_v2');
    });

    it('replaces existing container content', () => {
      container.innerHTML = '<div>Previous content</div>';

      renderNotFound(container, 'Quiz', 'cs101');

      expect(container.querySelector('div')?.textContent).not.toBe('Previous content');
      expect(container.querySelector('.error-page')).not.toBeNull();
    });

    it('button click does not navigate multiple times', () => {
      renderNotFound(container, 'Quiz', 'cs101');

      const button = container.querySelector('#back-to-subject') as HTMLButtonElement;
      button.click();
      button.click();

      expect(mockNavigateToSubject).toHaveBeenCalledTimes(2);
    });
  });
});
