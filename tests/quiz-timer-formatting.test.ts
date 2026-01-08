/**
 * Quiz Timer Formatting Tests
 *
 * Tests for the formatTimeRemaining function used in the Quiz component
 * to display countdown timers in MM:SS format.
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

describe('Quiz Timer Formatting - formatTimeRemaining', () => {
  describe('basic formatting', () => {
    it('formats 0 seconds as 0:00', () => {
      expect(formatTimeRemaining(0)).toBe('0:00');
    });

    it('formats 1 second as 0:01', () => {
      expect(formatTimeRemaining(1)).toBe('0:01');
    });

    it('formats 9 seconds as 0:09', () => {
      expect(formatTimeRemaining(9)).toBe('0:09');
    });

    it('formats 10 seconds as 0:10', () => {
      expect(formatTimeRemaining(10)).toBe('0:10');
    });

    it('formats 59 seconds as 0:59', () => {
      expect(formatTimeRemaining(59)).toBe('0:59');
    });

    it('formats 60 seconds as 1:00', () => {
      expect(formatTimeRemaining(60)).toBe('1:00');
    });

    it('formats 61 seconds as 1:01', () => {
      expect(formatTimeRemaining(61)).toBe('1:01');
    });

    it('formats 90 seconds as 1:30', () => {
      expect(formatTimeRemaining(90)).toBe('1:30');
    });
  });

  describe('minute boundaries', () => {
    it('formats 119 seconds as 1:59', () => {
      expect(formatTimeRemaining(119)).toBe('1:59');
    });

    it('formats 120 seconds as 2:00', () => {
      expect(formatTimeRemaining(120)).toBe('2:00');
    });

    it('formats 300 seconds (5 minutes) as 5:00', () => {
      expect(formatTimeRemaining(300)).toBe('5:00');
    });

    it('formats 600 seconds (10 minutes) as 10:00', () => {
      expect(formatTimeRemaining(600)).toBe('10:00');
    });
  });

  describe('typical quiz durations', () => {
    it('formats 15 minutes (900 seconds) correctly', () => {
      expect(formatTimeRemaining(900)).toBe('15:00');
    });

    it('formats 30 minutes (1800 seconds) correctly', () => {
      expect(formatTimeRemaining(1800)).toBe('30:00');
    });

    it('formats 45 minutes (2700 seconds) correctly', () => {
      expect(formatTimeRemaining(2700)).toBe('45:00');
    });

    it('formats 60 minutes (3600 seconds) correctly', () => {
      expect(formatTimeRemaining(3600)).toBe('60:00');
    });

    it('formats 90 minutes (5400 seconds) correctly', () => {
      expect(formatTimeRemaining(5400)).toBe('90:00');
    });

    it('formats 120 minutes (7200 seconds) correctly', () => {
      expect(formatTimeRemaining(7200)).toBe('120:00');
    });
  });

  describe('warning thresholds (visual feedback points)', () => {
    it('formats 301 seconds (just over 5 min warning threshold)', () => {
      expect(formatTimeRemaining(301)).toBe('5:01');
    });

    it('formats 300 seconds (at 5 min warning threshold)', () => {
      expect(formatTimeRemaining(300)).toBe('5:00');
    });

    it('formats 299 seconds (just under 5 min warning threshold)', () => {
      expect(formatTimeRemaining(299)).toBe('4:59');
    });

    it('formats 61 seconds (just over 1 min critical threshold)', () => {
      expect(formatTimeRemaining(61)).toBe('1:01');
    });

    it('formats 60 seconds (at 1 min critical threshold)', () => {
      expect(formatTimeRemaining(60)).toBe('1:00');
    });

    it('formats 59 seconds (just under 1 min critical threshold)', () => {
      expect(formatTimeRemaining(59)).toBe('0:59');
    });
  });

  describe('edge cases', () => {
    it('handles very large values (24 hours in seconds)', () => {
      expect(formatTimeRemaining(86400)).toBe('1440:00');
    });

    it('handles minutes with leading zeros in seconds', () => {
      expect(formatTimeRemaining(65)).toBe('1:05');
    });

    it('handles exactly one second before minute rollover', () => {
      expect(formatTimeRemaining(179)).toBe('2:59');
      expect(formatTimeRemaining(180)).toBe('3:00');
    });
  });

  describe('second padding consistency', () => {
    it('always pads seconds to 2 digits for 0-9', () => {
      for (let i = 0; i < 10; i++) {
        const result = formatTimeRemaining(i);
        expect(result).toBe(`0:0${i}`);
      }
    });

    it('does not over-pad seconds 10-59', () => {
      for (let i = 10; i < 60; i++) {
        const result = formatTimeRemaining(i);
        expect(result).toBe(`0:${i}`);
      }
    });

    it('correctly pads seconds across different minute values', () => {
      expect(formatTimeRemaining(62)).toBe('1:02');
      expect(formatTimeRemaining(122)).toBe('2:02');
      expect(formatTimeRemaining(182)).toBe('3:02');
      expect(formatTimeRemaining(302)).toBe('5:02');
      expect(formatTimeRemaining(602)).toBe('10:02');
    });
  });

  describe('countdown sequence simulation', () => {
    it('counts down correctly from 5 minutes', () => {
      const expected = [
        [300, '5:00'],
        [299, '4:59'],
        [298, '4:58'],
        [61, '1:01'],
        [60, '1:00'],
        [59, '0:59'],
        [10, '0:10'],
        [5, '0:05'],
        [1, '0:01'],
        [0, '0:00'],
      ];

      for (const [seconds, formatted] of expected) {
        expect(formatTimeRemaining(seconds as number)).toBe(formatted);
      }
    });

    it('produces monotonically decreasing display values', () => {
      let prev = formatTimeRemaining(300);
      for (let i = 299; i >= 0; i--) {
        const current = formatTimeRemaining(i);
        // Parse back to compare numerically
        const [prevMin, prevSec] = prev.split(':').map(Number);
        const [currMin, currSec] = current.split(':').map(Number);
        const prevTotal = prevMin * 60 + prevSec;
        const currTotal = currMin * 60 + currSec;
        expect(currTotal).toBeLessThan(prevTotal);
        prev = current;
      }
    });
  });
});

describe('Quiz Timer - Display Format Validation', () => {
  describe('format structure', () => {
    it('always contains exactly one colon', () => {
      for (let i = 0; i <= 3600; i += 100) {
        const result = formatTimeRemaining(i);
        expect(result.split(':').length).toBe(2);
      }
    });

    it('minutes portion is never padded with leading zeros', () => {
      expect(formatTimeRemaining(60)).toBe('1:00');
      expect(formatTimeRemaining(0)).toBe('0:00');
      expect(formatTimeRemaining(540)).toBe('9:00');
      expect(formatTimeRemaining(600)).toBe('10:00');
    });

    it('seconds portion is always exactly 2 characters', () => {
      for (let i = 0; i <= 120; i++) {
        const result = formatTimeRemaining(i);
        const [, secs] = result.split(':');
        expect(secs.length).toBe(2);
      }
    });
  });
});
