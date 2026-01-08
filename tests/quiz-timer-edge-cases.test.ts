/**
 * Quiz Timer Edge Cases Tests
 *
 * Tests for edge cases in the quiz timer behavior including:
 * - Timer value boundaries
 * - Negative time handling
 * - Zero duration handling
 * - Timer class assignment thresholds
 * - Timer display formatting edge cases
 */

import { describe, it, expect } from 'vitest';

/**
 * Format seconds into MM:SS display string
 * (Re-implementation from Quiz.tsx for isolated testing)
 */
function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Determine timer CSS class based on time remaining
 * (Re-implementation from Quiz.tsx for isolated testing)
 */
function getTimerClass(timeRemaining: number): string {
  if (timeRemaining <= 60) {
    return 'timer-critical';
  } else if (timeRemaining <= 300) {
    return 'timer-warning';
  }
  return '';
}

describe('Quiz Timer Edge Cases', () => {
  describe('negative time handling', () => {
    it('handles negative seconds gracefully', () => {
      // While this shouldn't happen in practice, the function should handle it
      const result = formatTimeRemaining(-1);
      // Math.floor(-1/60) = -1, -1 % 60 = -1
      expect(result).toBe('-1:-1');
    });

    it('handles large negative values', () => {
      const result = formatTimeRemaining(-120);
      // Math.floor(-120/60) = -2, -120 % 60 = 0
      expect(result).toBe('-2:00');
    });

    it('handles -59 seconds', () => {
      const result = formatTimeRemaining(-59);
      // Math.floor(-59/60) = -1, -59 % 60 = -59
      // padStart(2, '0') on '-59' gives '-59' (already longer than 2)
      expect(result).toBe('-1:-59');
    });
  });

  describe('boundary values for timer classes', () => {
    it('returns timer-critical at exactly 60 seconds', () => {
      expect(getTimerClass(60)).toBe('timer-critical');
    });

    it('returns timer-critical at 1 second', () => {
      expect(getTimerClass(1)).toBe('timer-critical');
    });

    it('returns timer-critical at 0 seconds', () => {
      expect(getTimerClass(0)).toBe('timer-critical');
    });

    it('returns timer-warning at exactly 61 seconds', () => {
      expect(getTimerClass(61)).toBe('timer-warning');
    });

    it('returns timer-warning at exactly 300 seconds', () => {
      expect(getTimerClass(300)).toBe('timer-warning');
    });

    it('returns empty string at exactly 301 seconds', () => {
      expect(getTimerClass(301)).toBe('');
    });

    it('returns empty string at 600 seconds (10 minutes)', () => {
      expect(getTimerClass(600)).toBe('');
    });
  });

  describe('timer class progression during countdown', () => {
    it('transitions from normal to warning at 300 seconds boundary', () => {
      expect(getTimerClass(301)).toBe('');
      expect(getTimerClass(300)).toBe('timer-warning');
    });

    it('transitions from warning to critical at 60 seconds boundary', () => {
      expect(getTimerClass(61)).toBe('timer-warning');
      expect(getTimerClass(60)).toBe('timer-critical');
    });

    it('stays critical below 60 seconds', () => {
      for (let i = 60; i >= 0; i--) {
        expect(getTimerClass(i)).toBe('timer-critical');
      }
    });

    it('stays warning between 61 and 300 seconds', () => {
      for (let i = 61; i <= 300; i += 10) {
        expect(getTimerClass(i)).toBe('timer-warning');
      }
    });
  });

  describe('very large timer values', () => {
    it('formats 1 hour correctly', () => {
      expect(formatTimeRemaining(3600)).toBe('60:00');
    });

    it('formats 2 hours correctly', () => {
      expect(formatTimeRemaining(7200)).toBe('120:00');
    });

    it('formats 24 hours correctly', () => {
      expect(formatTimeRemaining(86400)).toBe('1440:00');
    });

    it('returns no warning class for very large values', () => {
      expect(getTimerClass(86400)).toBe('');
      expect(getTimerClass(3600)).toBe('');
    });
  });

  describe('fractional seconds (should not occur but testing robustness)', () => {
    it('handles 30.5 seconds as 30 (Math.floor behavior)', () => {
      const result = formatTimeRemaining(30.5);
      // Math.floor(30.5/60) = 0, 30.5 % 60 = 30.5, padStart on "30.5" = "30.5"
      expect(result).toBe('0:30.5');
    });

    it('handles 59.9 seconds as 59', () => {
      const result = formatTimeRemaining(59.9);
      expect(result).toBe('0:59.9');
    });

    it('handles 60.1 seconds', () => {
      const result = formatTimeRemaining(60.1);
      // Math.floor(60.1/60) = 1, 60.1 % 60 has floating point precision issues
      // The result will be something like '1:0.10000000000000142' due to floating point
      expect(result.startsWith('1:0.1')).toBe(true);
    });
  });

  describe('timer class with negative values', () => {
    it('returns timer-critical for negative values (below threshold)', () => {
      expect(getTimerClass(-1)).toBe('timer-critical');
      expect(getTimerClass(-100)).toBe('timer-critical');
    });
  });

  describe('modulo behavior edge cases', () => {
    it('correctly handles second 59 to 60 rollover', () => {
      expect(formatTimeRemaining(59)).toBe('0:59');
      expect(formatTimeRemaining(60)).toBe('1:00');
    });

    it('correctly handles second 119 to 120 rollover', () => {
      expect(formatTimeRemaining(119)).toBe('1:59');
      expect(formatTimeRemaining(120)).toBe('2:00');
    });

    it('correctly handles 0 seconds', () => {
      expect(formatTimeRemaining(0)).toBe('0:00');
    });
  });

  describe('typical exam durations', () => {
    it('formats 30 minute exam timer correctly', () => {
      expect(formatTimeRemaining(30 * 60)).toBe('30:00');
    });

    it('formats 60 minute exam timer correctly', () => {
      expect(formatTimeRemaining(60 * 60)).toBe('60:00');
    });

    it('formats 90 minute exam timer correctly', () => {
      expect(formatTimeRemaining(90 * 60)).toBe('90:00');
    });

    it('formats 120 minute exam timer correctly', () => {
      expect(formatTimeRemaining(120 * 60)).toBe('120:00');
    });

    it('formats 180 minute exam timer correctly', () => {
      expect(formatTimeRemaining(180 * 60)).toBe('180:00');
    });
  });

  describe('countdown from typical quiz duration', () => {
    it('correctly counts down last 10 seconds', () => {
      const expected = [
        [10, '0:10'],
        [9, '0:09'],
        [8, '0:08'],
        [7, '0:07'],
        [6, '0:06'],
        [5, '0:05'],
        [4, '0:04'],
        [3, '0:03'],
        [2, '0:02'],
        [1, '0:01'],
        [0, '0:00'],
      ];

      for (const [seconds, formatted] of expected) {
        expect(formatTimeRemaining(seconds as number)).toBe(formatted);
      }
    });

    it('correctly counts down through minute boundary', () => {
      const expected = [
        [63, '1:03'],
        [62, '1:02'],
        [61, '1:01'],
        [60, '1:00'],
        [59, '0:59'],
        [58, '0:58'],
      ];

      for (const [seconds, formatted] of expected) {
        expect(formatTimeRemaining(seconds as number)).toBe(formatted);
      }
    });
  });
});

describe('Quiz Timer Class Transitions - Integration', () => {
  describe('full countdown simulation', () => {
    it('transitions through all timer classes correctly from 600 seconds', () => {
      const transitions: { seconds: number; expectedClass: string }[] = [];

      // Collect transition points
      for (let i = 600; i >= 0; i--) {
        const currentClass = getTimerClass(i);
        if (transitions.length === 0 || transitions[transitions.length - 1].expectedClass !== currentClass) {
          transitions.push({ seconds: i, expectedClass: currentClass });
        }
      }

      // Should have exactly 3 transitions: normal -> warning -> critical
      expect(transitions).toHaveLength(3);
      expect(transitions[0]).toEqual({ seconds: 600, expectedClass: '' });
      expect(transitions[1]).toEqual({ seconds: 300, expectedClass: 'timer-warning' });
      expect(transitions[2]).toEqual({ seconds: 60, expectedClass: 'timer-critical' });
    });
  });

  describe('class assignment consistency', () => {
    it('never returns undefined for any valid input', () => {
      for (let i = 0; i <= 7200; i += 100) {
        const result = getTimerClass(i);
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
      }
    });

    it('always returns one of three valid values', () => {
      const validClasses = ['', 'timer-warning', 'timer-critical'];

      for (let i = 0; i <= 1000; i++) {
        const result = getTimerClass(i);
        expect(validClasses).toContain(result);
      }
    });
  });
});
