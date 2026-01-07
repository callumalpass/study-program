import { describe, it, expect } from 'vitest';
import { Icons } from '../src/components/icons';

describe('Icons', () => {
  describe('icon structure', () => {
    it('exports an object with icon properties', () => {
      expect(typeof Icons).toBe('object');
      expect(Icons).not.toBeNull();
    });

    it('contains expected navigation icons', () => {
      expect(Icons.Dashboard).toBeDefined();
      expect(Icons.Curriculum).toBeDefined();
      expect(Icons.Progress).toBeDefined();
      expect(Icons.Export).toBeDefined();
      expect(Icons.Settings).toBeDefined();
      expect(Icons.CourseBuilder).toBeDefined();
    });

    it('contains expected UI icons', () => {
      expect(Icons.ChevronRight).toBeDefined();
      expect(Icons.ChevronLeft).toBeDefined();
      expect(Icons.ChevronDown).toBeDefined();
      expect(Icons.ChevronUp).toBeDefined();
      expect(Icons.ArrowRight).toBeDefined();
      expect(Icons.ArrowLeft).toBeDefined();
      expect(Icons.Check).toBeDefined();
      expect(Icons.Cross).toBeDefined();
      expect(Icons.Lock).toBeDefined();
      expect(Icons.Alert).toBeDefined();
      expect(Icons.Help).toBeDefined();
      expect(Icons.Refresh).toBeDefined();
    });

    it('contains expected status icons', () => {
      expect(Icons.StatusNotStarted).toBeDefined();
      expect(Icons.StatusInProgress).toBeDefined();
      expect(Icons.StatusCompleted).toBeDefined();
    });

    it('contains expected theme icons', () => {
      expect(Icons.Sun).toBeDefined();
      expect(Icons.Moon).toBeDefined();
      expect(Icons.Monitor).toBeDefined();
    });

    it('contains expected stat icons', () => {
      expect(Icons.StatQuiz).toBeDefined();
      expect(Icons.StatCode).toBeDefined();
      expect(Icons.StatProject).toBeDefined();
      expect(Icons.StatTarget).toBeDefined();
    });
  });

  describe('SVG validity', () => {
    const iconEntries = Object.entries(Icons);

    it.each(iconEntries)('%s is a valid SVG string', (name, svg) => {
      // Should be a string
      expect(typeof svg).toBe('string');

      // Should start with <svg and end with </svg>
      expect(svg.trim().startsWith('<svg')).toBe(true);
      expect(svg.trim().endsWith('</svg>')).toBe(true);

      // Should have xmlns attribute
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it.each(iconEntries)('%s has viewBox attribute', (name, svg) => {
      expect(svg).toContain('viewBox="');
    });

    it.each(iconEntries)('%s has width and height attributes', (name, svg) => {
      expect(svg).toContain('width="');
      expect(svg).toContain('height="');
    });

    it.each(iconEntries)('%s uses currentColor for stroke or fill', (name, svg) => {
      // Icons should use currentColor to inherit text color
      const usesCurrentColor = svg.includes('stroke="currentColor"') ||
                               svg.includes('fill="currentColor"') ||
                               svg.includes('style=');
      expect(usesCurrentColor).toBe(true);
    });
  });

  describe('SVG dimensions', () => {
    it('navigation icons have size 20x20', () => {
      const navIcons = [Icons.Dashboard, Icons.Curriculum, Icons.Progress, Icons.Export, Icons.Settings];
      navIcons.forEach(svg => {
        expect(svg).toContain('width="20"');
        expect(svg).toContain('height="20"');
      });
    });

    it('Logo and AcademicCap icons have size 24x24', () => {
      expect(Icons.Logo).toContain('width="24"');
      expect(Icons.Logo).toContain('height="24"');
      expect(Icons.AcademicCap).toContain('width="24"');
      expect(Icons.AcademicCap).toContain('height="24"');
    });

    it('UI icons have size 16x16', () => {
      const uiIcons = [
        Icons.ChevronRight, Icons.ChevronLeft, Icons.ChevronDown, Icons.ChevronUp,
        Icons.ArrowRight, Icons.ArrowLeft, Icons.Check, Icons.Cross, Icons.Lock,
        Icons.Alert, Icons.Help, Icons.Refresh, Icons.Clock, Icons.Download, Icons.Upload,
        Icons.Sun, Icons.Moon, Icons.Monitor
      ];
      uiIcons.forEach(svg => {
        expect(svg).toContain('width="16"');
        expect(svg).toContain('height="16"');
      });
    });

    it('stat icons have size 24x24', () => {
      const statIcons = [Icons.StatQuiz, Icons.StatCode, Icons.StatProject, Icons.StatTarget];
      statIcons.forEach(svg => {
        expect(svg).toContain('width="24"');
        expect(svg).toContain('height="24"');
      });
    });
  });

  describe('SVG rendering safety', () => {
    const iconEntries = Object.entries(Icons);

    it.each(iconEntries)('%s does not contain script tags', (name, svg) => {
      expect(svg.toLowerCase()).not.toContain('<script');
    });

    it.each(iconEntries)('%s does not contain event handlers', (name, svg) => {
      // Check for common XSS event handlers
      const dangerousPatterns = [
        'onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur',
        'javascript:', 'data:text/html'
      ];
      dangerousPatterns.forEach(pattern => {
        expect(svg.toLowerCase()).not.toContain(pattern);
      });
    });

    it.each(iconEntries)('%s has balanced tags', (name, svg) => {
      // Simple check: count opening and closing svg tags
      const openSvg = (svg.match(/<svg/g) || []).length;
      const closeSvg = (svg.match(/<\/svg>/g) || []).length;
      expect(openSvg).toBe(closeSvg);
    });
  });

  describe('icon accessibility', () => {
    it('icons use stroke styling attributes', () => {
      // Most icons should have stroke-linecap and stroke-linejoin for crisp rendering
      const iconsWithStrokes = [
        Icons.Dashboard, Icons.Curriculum, Icons.Progress, Icons.Check, Icons.Cross
      ];
      iconsWithStrokes.forEach(svg => {
        if (svg.includes('stroke-width')) {
          expect(svg).toContain('stroke-linecap');
          expect(svg).toContain('stroke-linejoin');
        }
      });
    });
  });

  describe('mascot icons', () => {
    it('contains mascot icons', () => {
      expect(Icons.PensiveBrick).toBeDefined();
      expect(Icons.KineticBrick).toBeDefined();
    });

    it('mascot icons have custom viewBox', () => {
      // Mascot icons have non-standard viewBox
      expect(Icons.PensiveBrick).toContain('viewBox="14 24 36 28"');
      expect(Icons.KineticBrick).toContain('viewBox="0 0 64 64"');
    });

    it('mascot icons use CSS custom properties for theming', () => {
      // Mascot icons should use CSS variables for theming
      expect(Icons.PensiveBrick).toContain('var(--color-accent');
      expect(Icons.KineticBrick).toContain('var(--color-accent');
    });

    it('mascot icons have animation classes', () => {
      expect(Icons.PensiveBrick).toContain('brick-blink');
      expect(Icons.KineticBrick).toContain('brick-fall-anim');
      expect(Icons.KineticBrick).toContain('brick-body');
      expect(Icons.KineticBrick).toContain('brick-face');
    });
  });

  describe('icon count', () => {
    it('has the expected number of icons', () => {
      const iconCount = Object.keys(Icons).length;
      // Update this if icons are added/removed
      expect(iconCount).toBeGreaterThanOrEqual(40);
    });
  });

  describe('duplicate detection', () => {
    it('Logo and AcademicCap are identical', () => {
      // These are intentionally the same icon
      expect(Icons.Logo).toBe(Icons.AcademicCap);
    });

    it('Quiz and StatQuiz have the same shape but different sizes', () => {
      // Quiz (20x20) and StatQuiz (24x24) are the same icon at different sizes
      const quizWithoutSize = Icons.Quiz.replace(/width="\d+"/, '').replace(/height="\d+"/, '');
      const statQuizWithoutSize = Icons.StatQuiz.replace(/width="\d+"/, '').replace(/height="\d+"/, '');
      expect(quizWithoutSize).toBe(statQuizWithoutSize);
    });

    it('Code and StatCode have the same shape but different sizes', () => {
      // Code (20x20) and StatCode (24x24) are the same icon at different sizes
      const codeWithoutSize = Icons.Code.replace(/width="\d+"/, '').replace(/height="\d+"/, '');
      const statCodeWithoutSize = Icons.StatCode.replace(/width="\d+"/, '').replace(/height="\d+"/, '');
      expect(codeWithoutSize).toBe(statCodeWithoutSize);
    });
  });
});
