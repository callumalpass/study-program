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

// ============================================================================
// Memory Management Algorithm Implementations
// ============================================================================

/**
 * Translate logical address to physical using base and limit registers.
 */
function translateAddress(logicalAddr: number, base: number, limit: number): number {
  if (logicalAddr < 0 || logicalAddr >= limit) {
    return -1; // Address out of bounds
  }
  return base + logicalAddr;
}

/**
 * First Fit memory allocation.
 */
function firstFit(memoryBlocks: [number, number, boolean][], processSize: number): number {
  for (const [start, size, isFree] of memoryBlocks) {
    if (isFree && size >= processSize) {
      return start;
    }
  }
  return -1;
}

/**
 * Best Fit memory allocation (smallest adequate block).
 */
function bestFit(memoryBlocks: [number, number, boolean][], processSize: number): number {
  let bestStart = -1;
  let bestSize = Infinity;

  for (const [start, size, isFree] of memoryBlocks) {
    if (isFree && size >= processSize) {
      if (size < bestSize) {
        bestSize = size;
        bestStart = start;
      }
    }
  }
  return bestStart;
}

/**
 * Worst Fit memory allocation (largest adequate block).
 */
function worstFit(memoryBlocks: [number, number, boolean][], processSize: number): number {
  let worstStart = -1;
  let worstSize = -1;

  for (const [start, size, isFree] of memoryBlocks) {
    if (isFree && size >= processSize) {
      if (size > worstSize) {
        worstSize = size;
        worstStart = start;
      }
    }
  }
  return worstStart;
}

/**
 * Calculate external fragmentation (free but unusable memory).
 */
function externalFragmentation(
  memoryBlocks: [number, number, boolean][],
  minUsefulSize: number
): number {
  let fragmented = 0;
  for (const [, size, isFree] of memoryBlocks) {
    if (isFree && size < minUsefulSize) {
      fragmented += size;
    }
  }
  return fragmented;
}

/**
 * Page table lookup - translate logical address using page table.
 */
function pageTranslate(
  logicalAddr: number,
  pageTable: [number, boolean][],
  pageSize: number
): number {
  const pageNum = Math.floor(logicalAddr / pageSize);
  const pageOffset = logicalAddr % pageSize;

  if (pageNum >= pageTable.length) {
    return -1;
  }

  const [frameNum, valid] = pageTable[pageNum];
  if (!valid) {
    return -1;
  }

  return frameNum * pageSize + pageOffset;
}

/**
 * Calculate internal fragmentation for a process.
 */
function internalFragmentation(processSize: number, pageSize: number): number {
  const pagesNeeded = Math.ceil(processSize / pageSize);
  const allocated = pagesNeeded * pageSize;
  return allocated - processSize;
}

/**
 * Calculate page table size in bytes.
 */
function pageTableSize(virtualAddrBits: number, pageSizeKb: number, pteBytes: number): number {
  const pageSize = pageSizeKb * 1024;
  const offsetBits = Math.log2(pageSize);
  const pageNumberBits = virtualAddrBits - offsetBits;
  const numPages = Math.pow(2, pageNumberBits);
  return numPages * pteBytes;
}

/**
 * Segment translation - translate segment:offset address.
 */
function segmentTranslate(
  segmentNum: number,
  offset: number,
  segmentTable: [number, number][]
): number {
  if (segmentNum >= segmentTable.length) {
    return -1;
  }

  const [base, limit] = segmentTable[segmentNum];
  if (offset >= limit) {
    return -1;
  }

  return base + offset;
}

/**
 * TLB simulation - returns [hits, misses, hitRate].
 */
function tlbSimulation(pageReferences: number[], tlbSize: number): [number, number, number] {
  const tlb: number[] = []; // LRU order
  let hits = 0;
  let misses = 0;

  for (const page of pageReferences) {
    const index = tlb.indexOf(page);
    if (index !== -1) {
      hits++;
      tlb.splice(index, 1);
      tlb.push(page); // Move to end (most recent)
    } else {
      misses++;
      if (tlb.length >= tlbSize) {
        tlb.shift(); // Remove LRU
      }
      tlb.push(page);
    }
  }

  const total = hits + misses;
  const hitRate = total > 0 ? Math.round((hits / total) * 100) / 100 : 0;
  return [hits, misses, hitRate];
}

/**
 * Calculate effective access time with TLB.
 */
function effectiveAccessTime(tlbHitRatio: number, tlbTime: number, memoryTime: number): number {
  // TLB hit: TLB + memory (for data)
  // TLB miss: TLB + memory (page table) + memory (data)
  const eat =
    tlbHitRatio * (tlbTime + memoryTime) + (1 - tlbHitRatio) * (tlbTime + 2 * memoryTime);
  return Math.round(eat * 100) / 100;
}

/**
 * Calculate address bits for two-level page table.
 */
function twoLevelBits(
  addrBits: number,
  pageSizeKb: number,
  pteSizeBytes: number
): [number, number, number] {
  const pageSize = pageSizeKb * 1024;
  const offsetBits = Math.log2(pageSize);

  // PTEs per page
  const ptesPerPage = pageSize / pteSizeBytes;
  const innerBits = Math.log2(ptesPerPage);

  // Remaining bits for outer
  const outerBits = addrBits - offsetBits - innerBits;

  return [outerBits, innerBits, offsetBits];
}

// ============================================================================
// Memory Management Tests
// ============================================================================

describe('Memory Management Algorithms', () => {
  describe('Address Translation', () => {
    it('translates valid logical address', () => {
      // From exercise cs301-ex-6-1
      expect(translateAddress(100, 5000, 1000)).toBe(5100);
    });

    it('rejects address out of bounds', () => {
      expect(translateAddress(1500, 5000, 1000)).toBe(-1);
    });

    it('handles edge case at limit boundary', () => {
      expect(translateAddress(999, 5000, 1000)).toBe(5999);
      expect(translateAddress(1000, 5000, 1000)).toBe(-1);
    });
  });

  describe('Memory Allocation Strategies', () => {
    describe('First Fit', () => {
      it('finds first adequate free block', () => {
        // From exercise cs301-ex-6-2
        const blocks: [number, number, boolean][] = [
          [0, 100, true],
          [100, 200, false],
          [300, 150, true],
        ];
        expect(firstFit(blocks, 120)).toBe(300);
      });

      it('returns -1 when no fit exists', () => {
        const blocks: [number, number, boolean][] = [[0, 50, true]];
        expect(firstFit(blocks, 100)).toBe(-1);
      });

      it('selects first block even if not optimal', () => {
        const blocks: [number, number, boolean][] = [
          [0, 200, true],
          [200, 100, true],
        ];
        expect(firstFit(blocks, 90)).toBe(0); // Takes 200-size block, not 100
      });
    });

    describe('Best Fit', () => {
      it('finds smallest adequate free block', () => {
        // From exercise cs301-ex-6-3
        const blocks: [number, number, boolean][] = [
          [0, 200, true],
          [200, 100, true],
          [300, 150, true],
        ];
        expect(bestFit(blocks, 90)).toBe(200); // 100 is smallest fit
      });

      it('handles exact fit', () => {
        const blocks: [number, number, boolean][] = [
          [0, 100, true],
          [100, 100, true],
        ];
        expect(bestFit(blocks, 100)).toBe(0);
      });
    });

    describe('Worst Fit', () => {
      it('finds largest adequate free block', () => {
        // From exercise cs301-ex-6-4
        const blocks: [number, number, boolean][] = [
          [0, 100, true],
          [100, 200, true],
          [300, 150, true],
        ];
        expect(worstFit(blocks, 50)).toBe(100); // 200 is largest
      });

      it('returns -1 when no fit exists', () => {
        const blocks: [number, number, boolean][] = [[0, 50, true]];
        expect(worstFit(blocks, 100)).toBe(-1);
      });
    });
  });

  describe('Fragmentation', () => {
    it('calculates external fragmentation', () => {
      // From exercise cs301-ex-6-5
      const blocks: [number, number, boolean][] = [
        [0, 50, true],
        [50, 200, false],
        [250, 30, true],
      ];
      expect(externalFragmentation(blocks, 100)).toBe(80); // 50 + 30
    });

    it('returns 0 when all free blocks are large enough', () => {
      const blocks: [number, number, boolean][] = [[0, 200, true]];
      expect(externalFragmentation(blocks, 100)).toBe(0);
    });

    it('calculates internal fragmentation', () => {
      // From exercise cs301-ex-6-7
      expect(internalFragmentation(10000, 4096)).toBe(2288);
    });

    it('returns 0 for exact fit', () => {
      expect(internalFragmentation(8192, 4096)).toBe(0);
    });
  });

  describe('Paging', () => {
    describe('Page Table Lookup', () => {
      it('translates logical address correctly', () => {
        // From exercise cs301-ex-6-6 (corrected)
        // 5000 / 4096 = 1 (page 1), 5000 % 4096 = 904 (offset)
        // page_table[1] = (3, true), so frame 3
        // physical = 3 * 4096 + 904 = 13192
        const pageTable: [number, boolean][] = [
          [2, true],
          [3, true],
        ];
        expect(pageTranslate(5000, pageTable, 4096)).toBe(13192);
      });

      it('returns -1 for invalid page', () => {
        const pageTable: [number, boolean][] = [[5, false]];
        expect(pageTranslate(1000, pageTable, 4096)).toBe(-1);
      });

      it('returns -1 for page number out of range', () => {
        const pageTable: [number, boolean][] = [[5, true]];
        expect(pageTranslate(8192, pageTable, 4096)).toBe(-1); // Page 2 doesn't exist
      });
    });

    describe('Page Table Size', () => {
      it('calculates page table size for 32-bit system', () => {
        // From exercise cs301-ex-6-13
        // 32-bit, 4KB pages (12 offset bits), 4-byte PTE
        // 2^20 pages * 4 bytes = 4MB
        expect(pageTableSize(32, 4, 4)).toBe(4194304);
      });

      it('calculates page table size for 20-bit address space', () => {
        // 20-bit, 4KB pages (12 offset bits), 4-byte PTE
        // 2^8 pages * 4 bytes = 1024
        expect(pageTableSize(20, 4, 4)).toBe(1024);
      });
    });

    describe('Two-Level Page Table Bits', () => {
      it('calculates bits for 32-bit system with 4KB pages', () => {
        // From exercise cs301-ex-6-10
        const [outer, inner, offset] = twoLevelBits(32, 4, 4);
        expect(outer).toBe(10);
        expect(inner).toBe(10);
        expect(offset).toBe(12);
      });

      it('calculates bits for 64-bit system with 4KB pages', () => {
        const [outer, inner, offset] = twoLevelBits(64, 4, 8);
        expect(outer).toBe(43);
        expect(inner).toBe(9);
        expect(offset).toBe(12);
      });
    });
  });

  describe('Segmentation', () => {
    it('translates valid segment address', () => {
      // From exercise cs301-ex-6-11
      const segmentTable: [number, number][] = [
        [1000, 1000],
        [2000, 500],
      ];
      expect(segmentTranslate(0, 500, segmentTable)).toBe(1500);
    });

    it('rejects offset exceeding limit', () => {
      const segmentTable: [number, number][] = [
        [1000, 1000],
        [2000, 500],
      ];
      expect(segmentTranslate(1, 600, segmentTable)).toBe(-1);
    });

    it('rejects invalid segment number', () => {
      const segmentTable: [number, number][] = [[1000, 1000]];
      expect(segmentTranslate(2, 100, segmentTable)).toBe(-1);
    });
  });

  describe('TLB Simulation', () => {
    it('simulates TLB with mixed hits and misses', () => {
      // From exercise cs301-ex-6-8
      const [hits, misses, hitRate] = tlbSimulation([1, 2, 3, 1, 2, 4, 1], 3);
      expect(hits).toBe(3);
      expect(misses).toBe(4);
      expect(hitRate).toBe(0.43);
    });

    it('handles high locality', () => {
      const [hits, misses, hitRate] = tlbSimulation([1, 1, 1, 1], 1);
      expect(hits).toBe(3);
      expect(misses).toBe(1);
      expect(hitRate).toBe(0.75);
    });

    it('handles no hits when TLB is too small', () => {
      const [hits, misses] = tlbSimulation([1, 2, 3, 4, 5], 1);
      expect(hits).toBe(0);
      expect(misses).toBe(5);
    });
  });

  describe('Effective Access Time', () => {
    it('calculates EAT with 90% hit rate', () => {
      // From exercise cs301-ex-6-9
      expect(effectiveAccessTime(0.9, 10, 100)).toBe(120);
    });

    it('calculates EAT with 98% hit rate', () => {
      // EAT = 0.98 × (10 + 100) + 0.02 × (10 + 200) = 107.8 + 4.2 = 112
      expect(effectiveAccessTime(0.98, 10, 100)).toBe(112);
    });

    it('calculates EAT with 100% hit rate', () => {
      expect(effectiveAccessTime(1.0, 10, 100)).toBe(110);
    });

    it('calculates EAT with 0% hit rate', () => {
      expect(effectiveAccessTime(0, 10, 100)).toBe(210);
    });
  });
});
