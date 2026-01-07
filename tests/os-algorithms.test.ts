/**
 * Operating Systems Algorithms Tests
 *
 * These tests verify the correctness of OS scheduling and memory management
 * algorithms to ensure the educational content examples are accurate.
 */

import { describe, expect, it } from 'vitest';

// ============================================================================
// Page Replacement Algorithm Implementations
// ============================================================================

interface PageReplacementResult {
  frames: (number | null)[];
  faults: number;
  trace: { ref: number; frames: (number | null)[]; fault: boolean; victim?: number }[];
}

/**
 * FIFO (First-In, First-Out) Page Replacement Algorithm
 * Replaces the oldest page in memory.
 */
function fifoPageReplacement(references: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = Array(numFrames).fill(null);
  const queue: number[] = []; // Tracks insertion order for FIFO
  const trace: PageReplacementResult['trace'] = [];
  let faults = 0;

  for (const ref of references) {
    const framesCopy = [...frames];

    if (frames.includes(ref)) {
      // Page hit - no fault
      trace.push({ ref, frames: framesCopy, fault: false });
    } else {
      // Page fault
      faults++;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        // Empty frame available
        frames[emptyIndex] = ref;
        queue.push(ref);
        trace.push({ ref, frames: [...frames], fault: true });
      } else {
        // Replace oldest page (FIFO)
        const victim = queue.shift()!;
        const victimIndex = frames.indexOf(victim);
        frames[victimIndex] = ref;
        queue.push(ref);
        trace.push({ ref, frames: [...frames], fault: true, victim });
      }
    }
  }

  return { frames, faults, trace };
}

/**
 * LRU (Least Recently Used) Page Replacement Algorithm
 * Replaces the page that hasn't been used for the longest time.
 */
function lruPageReplacement(references: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = Array(numFrames).fill(null);
  const lastUsed: Map<number, number> = new Map(); // page -> last access time
  const trace: PageReplacementResult['trace'] = [];
  let faults = 0;
  let time = 0;

  for (const ref of references) {
    time++;
    const framesCopy = [...frames];

    if (frames.includes(ref)) {
      // Page hit - update last used time
      lastUsed.set(ref, time);
      trace.push({ ref, frames: framesCopy, fault: false });
    } else {
      // Page fault
      faults++;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        // Empty frame available
        frames[emptyIndex] = ref;
        lastUsed.set(ref, time);
        trace.push({ ref, frames: [...frames], fault: true });
      } else {
        // Find LRU page (page with oldest last access time)
        let lruPage: number | null = null;
        let oldestTime = Infinity;

        for (const page of frames) {
          if (page !== null) {
            const pageLastUsed = lastUsed.get(page) || 0;
            if (pageLastUsed < oldestTime) {
              oldestTime = pageLastUsed;
              lruPage = page;
            }
          }
        }

        // Replace LRU page
        const victimIndex = frames.indexOf(lruPage!);
        const victim = frames[victimIndex]!;
        frames[victimIndex] = ref;
        lastUsed.delete(victim);
        lastUsed.set(ref, time);
        trace.push({ ref, frames: [...frames], fault: true, victim });
      }
    }
  }

  return { frames, faults, trace };
}

/**
 * Optimal (OPT) Page Replacement Algorithm
 * Replaces the page that won't be used for the longest time in the future.
 * This is theoretical and used as a benchmark.
 */
function optimalPageReplacement(references: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = Array(numFrames).fill(null);
  const trace: PageReplacementResult['trace'] = [];
  let faults = 0;

  for (let i = 0; i < references.length; i++) {
    const ref = references[i];
    const framesCopy = [...frames];

    if (frames.includes(ref)) {
      // Page hit
      trace.push({ ref, frames: framesCopy, fault: false });
    } else {
      // Page fault
      faults++;

      const emptyIndex = frames.indexOf(null);
      if (emptyIndex !== -1) {
        // Empty frame available
        frames[emptyIndex] = ref;
        trace.push({ ref, frames: [...frames], fault: true });
      } else {
        // Find page with farthest future use (or never used again)
        let victimIndex = 0;
        let farthestUse = -1;

        for (let j = 0; j < frames.length; j++) {
          const page = frames[j]!;
          const nextUse = references.slice(i + 1).indexOf(page);

          if (nextUse === -1) {
            // Page never used again - best victim
            victimIndex = j;
            break;
          }

          if (nextUse > farthestUse) {
            farthestUse = nextUse;
            victimIndex = j;
          }
        }

        const victim = frames[victimIndex]!;
        frames[victimIndex] = ref;
        trace.push({ ref, frames: [...frames], fault: true, victim });
      }
    }
  }

  return { frames, faults, trace };
}

// ============================================================================
// CPU Scheduling Algorithm Implementations
// ============================================================================

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
}

interface SchedulingResult {
  timeline: { process: string; start: number; end: number }[];
  waitingTimes: Record<string, number>;
  turnaroundTimes: Record<string, number>;
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}

/**
 * FCFS (First-Come, First-Served) Scheduling
 */
function fcfsScheduling(processes: Process[]): SchedulingResult {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const timeline: SchedulingResult['timeline'] = [];
  const completionTimes: Record<string, number> = {};
  let currentTime = 0;

  for (const process of sorted) {
    const start = Math.max(currentTime, process.arrivalTime);
    const end = start + process.burstTime;
    timeline.push({ process: process.id, start, end });
    completionTimes[process.id] = end;
    currentTime = end;
  }

  return calculateMetrics(processes, completionTimes, timeline);
}

/**
 * SJF (Shortest Job First) Non-Preemptive Scheduling
 */
function sjfScheduling(processes: Process[]): SchedulingResult {
  const remaining = [...processes];
  const timeline: SchedulingResult['timeline'] = [];
  const completionTimes: Record<string, number> = {};
  let currentTime = 0;

  while (remaining.length > 0) {
    // Get processes that have arrived
    const available = remaining.filter(p => p.arrivalTime <= currentTime);

    if (available.length === 0) {
      // Jump to next arrival
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }

    // Select shortest job
    available.sort((a, b) => a.burstTime - b.burstTime);
    const process = available[0];

    const start = currentTime;
    const end = start + process.burstTime;
    timeline.push({ process: process.id, start, end });
    completionTimes[process.id] = end;
    currentTime = end;

    // Remove from remaining
    const idx = remaining.findIndex(p => p.id === process.id);
    remaining.splice(idx, 1);
  }

  return calculateMetrics(processes, completionTimes, timeline);
}

/**
 * Round Robin Scheduling
 */
function roundRobinScheduling(processes: Process[], quantum: number): SchedulingResult {
  const remaining = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline: SchedulingResult['timeline'] = [];
  const completionTimes: Record<string, number> = {};
  let currentTime = 0;
  let queue: typeof remaining = [];

  // Add processes that arrive at time 0
  queue = remaining.filter(p => p.arrivalTime <= currentTime);
  let waiting = remaining.filter(p => p.arrivalTime > currentTime);

  while (queue.length > 0 || waiting.length > 0) {
    if (queue.length === 0) {
      // Jump to next arrival
      currentTime = Math.min(...waiting.map(p => p.arrivalTime));
      const newArrivals = waiting.filter(p => p.arrivalTime <= currentTime);
      queue.push(...newArrivals);
      waiting = waiting.filter(p => p.arrivalTime > currentTime);
      continue;
    }

    const process = queue.shift()!;
    const runTime = Math.min(process.remainingTime, quantum);
    const start = currentTime;
    const end = start + runTime;

    timeline.push({ process: process.id, start, end });
    currentTime = end;
    process.remainingTime -= runTime;

    // Add any newly arrived processes to queue
    const newArrivals = waiting.filter(p => p.arrivalTime <= currentTime);
    queue.push(...newArrivals);
    waiting = waiting.filter(p => p.arrivalTime > currentTime);

    if (process.remainingTime > 0) {
      queue.push(process);
    } else {
      completionTimes[process.id] = end;
    }
  }

  return calculateMetrics(processes, completionTimes, timeline);
}

function calculateMetrics(
  processes: Process[],
  completionTimes: Record<string, number>,
  timeline: SchedulingResult['timeline']
): SchedulingResult {
  const waitingTimes: Record<string, number> = {};
  const turnaroundTimes: Record<string, number> = {};

  for (const process of processes) {
    const turnaround = completionTimes[process.id] - process.arrivalTime;
    const waiting = turnaround - process.burstTime;
    turnaroundTimes[process.id] = turnaround;
    waitingTimes[process.id] = waiting;
  }

  const avgWaiting = Object.values(waitingTimes).reduce((a, b) => a + b, 0) / processes.length;
  const avgTurnaround = Object.values(turnaroundTimes).reduce((a, b) => a + b, 0) / processes.length;

  return {
    timeline,
    waitingTimes,
    turnaroundTimes,
    averageWaitingTime: avgWaiting,
    averageTurnaroundTime: avgTurnaround,
  };
}

// ============================================================================
// Page Replacement Tests
// ============================================================================

describe('Page Replacement Algorithms', () => {
  describe('FIFO Page Replacement', () => {
    it('handles basic reference string correctly', () => {
      // Example from topic-7.md (topic-6.md shows same)
      const references = [7, 0, 1, 2, 0, 3, 0, 4];
      const result = fifoPageReplacement(references, 3);

      expect(result.faults).toBe(7);
    });

    it('handles page hits correctly', () => {
      const references = [1, 2, 1, 2, 1, 2];
      const result = fifoPageReplacement(references, 2);

      // First 2 are faults, rest are hits
      expect(result.faults).toBe(2);
    });

    it('handles all unique pages with enough frames', () => {
      const references = [1, 2, 3, 4];
      const result = fifoPageReplacement(references, 4);

      // Each page causes exactly one fault
      expect(result.faults).toBe(4);
    });

    it('handles repeated references after full frames', () => {
      const references = [1, 2, 3, 1, 2, 3];
      const result = fifoPageReplacement(references, 3);

      // First 3 are faults, last 3 are hits
      expect(result.faults).toBe(3);
    });

    it('demonstrates Belady anomaly possibility', () => {
      // Classic sequence that shows Belady's anomaly
      const references = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];

      const result3 = fifoPageReplacement(references, 3);
      const result4 = fifoPageReplacement(references, 4);

      // With 3 frames: 9 faults
      // With 4 frames: 10 faults (more faults with more frames!)
      expect(result3.faults).toBe(9);
      expect(result4.faults).toBe(10);
    });
  });

  describe('LRU Page Replacement', () => {
    it('correctly identifies LRU page for replacement', () => {
      // Reference string from topic-7.md
      const references = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
      const result = lruPageReplacement(references, 3);

      // Verified trace:
      // 1: [1,-,-] Fault
      // 2: [1,2,-] Fault
      // 3: [1,2,3] Fault
      // 4: [4,2,3] Fault (1 is LRU)
      // 1: [4,1,3] Fault (2 is LRU)
      // 2: [4,1,2] Fault (3 is LRU)
      // 5: [5,1,2] Fault (4 is LRU)
      // 1: [5,1,2] Hit
      // 2: [5,1,2] Hit
      // 3: [3,1,2] Fault (5 is LRU - used at step 7, 1 at step 8, 2 at step 9)
      // 4: [3,4,2] Fault (1 is LRU)
      // 5: [3,4,5] Fault (2 is LRU)

      expect(result.faults).toBe(10);
    });

    it('updates LRU on page hits', () => {
      const references = [1, 2, 1, 3];
      const result = lruPageReplacement(references, 2);

      // 1: [1,-] Fault
      // 2: [1,2] Fault
      // 1: [1,2] Hit (1 becomes most recently used)
      // 3: [1,3] Fault (2 is LRU, not 1)

      expect(result.faults).toBe(3);
      expect(result.trace[3].victim).toBe(2);
    });

    it('handles all hits after frames are full', () => {
      const references = [1, 2, 3, 1, 2, 3, 1, 2, 3];
      const result = lruPageReplacement(references, 3);

      expect(result.faults).toBe(3); // Only initial faults
    });

    it('never exhibits Belady anomaly', () => {
      // LRU is a stack algorithm, so more frames should never increase faults
      const references = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];

      const result3 = lruPageReplacement(references, 3);
      const result4 = lruPageReplacement(references, 4);

      expect(result4.faults).toBeLessThanOrEqual(result3.faults);
    });
  });

  describe('Optimal Page Replacement', () => {
    it('achieves minimum possible faults', () => {
      const references = [7, 0, 1, 2, 0, 3, 0, 4];
      const result = optimalPageReplacement(references, 3);

      // OPT should have fewer or equal faults than FIFO/LRU
      const fifoResult = fifoPageReplacement(references, 3);
      const lruResult = lruPageReplacement(references, 3);

      expect(result.faults).toBeLessThanOrEqual(fifoResult.faults);
      expect(result.faults).toBeLessThanOrEqual(lruResult.faults);
    });

    it('prefers replacing pages not used in future', () => {
      const references = [1, 2, 3, 4];
      const result = optimalPageReplacement(references, 3);

      // When replacing for 4, should choose 1 (never used again)
      expect(result.trace[3].victim).toBe(1);
    });

    it('handles all pages being used in future', () => {
      const references = [1, 2, 3, 1, 2, 3, 4];
      const result = optimalPageReplacement(references, 3);

      // At step 7 (ref 4), all of 1,2,3 will be used
      // Should replace whichever is used farthest in future
      expect(result.faults).toBe(4);
    });
  });

  describe('Algorithm Comparison', () => {
    it('OPT always achieves minimum faults', () => {
      const testCases = [
        [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
        [7, 0, 1, 2, 0, 3, 0, 4],
        [1, 2, 3, 2, 1, 5, 2, 1, 6, 2, 5, 6, 3, 1, 3],
      ];

      for (const refs of testCases) {
        const opt = optimalPageReplacement(refs, 3);
        const fifo = fifoPageReplacement(refs, 3);
        const lru = lruPageReplacement(refs, 3);

        expect(opt.faults).toBeLessThanOrEqual(fifo.faults);
        expect(opt.faults).toBeLessThanOrEqual(lru.faults);
      }
    });
  });
});

// ============================================================================
// CPU Scheduling Tests
// ============================================================================

describe('CPU Scheduling Algorithms', () => {
  describe('FCFS Scheduling', () => {
    it('processes jobs in arrival order', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 24 },
        { id: 'P2', arrivalTime: 0, burstTime: 3 },
        { id: 'P3', arrivalTime: 0, burstTime: 3 },
      ];

      const result = fcfsScheduling(processes);

      expect(result.timeline[0].process).toBe('P1');
      expect(result.timeline[1].process).toBe('P2');
      expect(result.timeline[2].process).toBe('P3');
    });

    it('calculates correct waiting times', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 24 },
        { id: 'P2', arrivalTime: 0, burstTime: 3 },
        { id: 'P3', arrivalTime: 0, burstTime: 3 },
      ];

      const result = fcfsScheduling(processes);

      // P1 waits 0, P2 waits 24, P3 waits 27
      expect(result.waitingTimes['P1']).toBe(0);
      expect(result.waitingTimes['P2']).toBe(24);
      expect(result.waitingTimes['P3']).toBe(27);
      expect(result.averageWaitingTime).toBe(17);
    });

    it('handles different arrival times', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 2, burstTime: 3 },
        { id: 'P2', arrivalTime: 0, burstTime: 2 },
      ];

      const result = fcfsScheduling(processes);

      // P2 arrives first
      expect(result.timeline[0].process).toBe('P2');
    });
  });

  describe('SJF Scheduling', () => {
    it('selects shortest job among available processes', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 6 },
        { id: 'P2', arrivalTime: 0, burstTime: 8 },
        { id: 'P3', arrivalTime: 0, burstTime: 7 },
        { id: 'P4', arrivalTime: 0, burstTime: 3 },
      ];

      const result = sjfScheduling(processes);

      // Order should be: P4(3), P1(6), P3(7), P2(8)
      expect(result.timeline.map(t => t.process)).toEqual(['P4', 'P1', 'P3', 'P2']);
    });

    it('achieves lower average waiting time than FCFS', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 6 },
        { id: 'P2', arrivalTime: 0, burstTime: 8 },
        { id: 'P3', arrivalTime: 0, burstTime: 7 },
        { id: 'P4', arrivalTime: 0, burstTime: 3 },
      ];

      const sjfResult = sjfScheduling(processes);
      const fcfsResult = fcfsScheduling(processes);

      expect(sjfResult.averageWaitingTime).toBeLessThan(fcfsResult.averageWaitingTime);
    });

    it('handles processes arriving at different times', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 7 },
        { id: 'P2', arrivalTime: 2, burstTime: 4 },
        { id: 'P3', arrivalTime: 4, burstTime: 1 },
        { id: 'P4', arrivalTime: 5, burstTime: 4 },
      ];

      const result = sjfScheduling(processes);

      // P1 runs first (only one at time 0)
      expect(result.timeline[0].process).toBe('P1');
      // At time 7, P2, P3, P4 are available. P3 is shortest.
      expect(result.timeline[1].process).toBe('P3');
    });
  });

  describe('Round Robin Scheduling', () => {
    it('preempts processes at quantum boundary', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 24 },
        { id: 'P2', arrivalTime: 0, burstTime: 3 },
        { id: 'P3', arrivalTime: 0, burstTime: 3 },
      ];

      const result = roundRobinScheduling(processes, 4);

      // P1 runs for 4, then P2 for 3 (completes), P3 for 3 (completes), P1 for 4, ...
      expect(result.timeline[0]).toEqual({ process: 'P1', start: 0, end: 4 });
      expect(result.timeline[1]).toEqual({ process: 'P2', start: 4, end: 7 });
      expect(result.timeline[2]).toEqual({ process: 'P3', start: 7, end: 10 });
    });

    it('handles quantum larger than burst time', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 2 },
        { id: 'P2', arrivalTime: 0, burstTime: 3 },
      ];

      const result = roundRobinScheduling(processes, 10);

      // Should behave like FCFS when quantum > burst times
      expect(result.timeline[0]).toEqual({ process: 'P1', start: 0, end: 2 });
      expect(result.timeline[1]).toEqual({ process: 'P2', start: 2, end: 5 });
    });

    it('provides fair CPU time to all processes', () => {
      const processes: Process[] = [
        { id: 'P1', arrivalTime: 0, burstTime: 10 },
        { id: 'P2', arrivalTime: 0, burstTime: 10 },
      ];

      const result = roundRobinScheduling(processes, 2);

      // Each process should get alternating time slices
      const p1Slots = result.timeline.filter(t => t.process === 'P1').length;
      const p2Slots = result.timeline.filter(t => t.process === 'P2').length;

      expect(p1Slots).toBe(p2Slots);
    });
  });
});
