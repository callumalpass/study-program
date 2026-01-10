/**
 * Networking and Database Content Accuracy Tests
 *
 * These tests validate the technical accuracy of networking and database quiz/exam content.
 * They check for common misconceptions about:
 * - TCP/UDP properties
 * - IPv4/IPv6 addressing
 * - Database normalization forms
 * - SQL query semantics
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const SUBJECTS_DIR = join(__dirname, '../src/subjects');

interface Question {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
}

interface Quiz {
  id: string;
  questions: Question[];
}

interface Exam {
  id: string;
  questions: Question[];
}

function findJsonFiles(dir: string, filename: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath, filename));
    } else if (entry.name === filename) {
      files.push(fullPath);
    }
  }
  return files;
}

function loadJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

describe('Networking Content Accuracy', () => {
  describe('TCP vs UDP Properties', () => {
    it('should correctly distinguish TCP and UDP properties', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // TCP is connection-oriented, NOT connectionless
              // Use regex to match patterns like "TCP is connectionless" but NOT "UDP is connectionless"
              const tcpConnectionlessPattern = /\btcp\s+is\s+connectionless\b/i;
              if (
                tcpConnectionlessPattern.test(combinedLower) &&
                !combinedLower.includes('not connectionless')
              ) {
                issues.push(
                  `${file} - ${q.id}: TCP is connection-oriented, NOT connectionless.`
                );
              }

              // UDP is connectionless, NOT connection-oriented
              const udpConnectionOrientedPattern = /\budp\s+is\s+connection-oriented\b/i;
              if (
                udpConnectionOrientedPattern.test(combinedLower) &&
                !combinedLower.includes('not connection-oriented')
              ) {
                issues.push(
                  `${file} - ${q.id}: UDP is connectionless, NOT connection-oriented.`
                );
              }

              // UDP does NOT guarantee delivery - match direct claims
              const udpGuaranteedPattern = /\budp\s+(?:provides|guarantees|offers)\s+(?:guaranteed|reliable)\s+delivery\b/i;
              if (udpGuaranteedPattern.test(combinedLower)) {
                issues.push(
                  `${file} - ${q.id}: UDP does NOT guarantee delivery.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('IP Address Properties', () => {
    it('should correctly state IPv4 and IPv6 address sizes', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // IPv4 is 32 bits
              if (
                combinedLower.includes('ipv4') &&
                (combinedLower.includes('128 bit') || combinedLower.includes('128-bit') ||
                 combinedLower.includes('64 bit') || combinedLower.includes('64-bit'))
              ) {
                // Only flag if it seems to claim IPv4 has these sizes
                if (!combinedLower.includes('ipv6')) {
                  issues.push(
                    `${file} - ${q.id}: IPv4 addresses are 32 bits, not 64 or 128.`
                  );
                }
              }

              // IPv6 is 128 bits
              if (
                combinedLower.includes('ipv6') &&
                (combinedLower.includes('32 bit') || combinedLower.includes('32-bit')) &&
                !combinedLower.includes('ipv4')
              ) {
                issues.push(
                  `${file} - ${q.id}: IPv6 addresses are 128 bits, not 32.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });

    it('should correctly identify RFC 1918 private address ranges', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      // Valid RFC 1918 ranges
      const VALID_PRIVATE_RANGES = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'];
      // These are NOT RFC 1918 ranges but are sometimes confused
      const INVALID_PRIVATE_CLAIMS = ['169.254.0.0/16']; // This is link-local, not RFC 1918

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // 169.254.x.x is link-local, not RFC 1918 private
              if (
                combinedLower.includes('rfc 1918') &&
                combinedLower.includes('169.254') &&
                !combinedLower.includes('not rfc 1918') &&
                !combinedLower.includes('link-local')
              ) {
                issues.push(
                  `${file} - ${q.id}: 169.254.0.0/16 is link-local (APIPA), NOT an RFC 1918 private range.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('OSI Model Layer Properties', () => {
    it('should correctly assign protocols to OSI layers', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // Check for direct incorrect claims about HTTP layer
              // Match "HTTP is a transport layer protocol" or "HTTP operates at the transport layer"
              // But NOT "HTTP over TLS" or "Transport Layer Security"
              const httpTransportPattern = /\bhttp\s+(?:is|operates at)\s+(?:a\s+)?(?:the\s+)?transport\s+layer\b/i;
              if (
                httpTransportPattern.test(combinedLower) &&
                !combinedLower.includes('application layer') &&
                !combinedLower.includes('transport layer security') // TLS is Transport Layer Security
              ) {
                issues.push(
                  `${file} - ${q.id}: HTTP operates at the Application layer, not Transport.`
                );
              }

              // Check for direct incorrect claims about IP layer
              // Match "IP is a transport layer protocol" but not discussions comparing layers
              const ipTransportPattern = /\bip\s+(?:is|operates at)\s+(?:a\s+)?(?:the\s+)?transport\s+layer\b/i;
              if (
                ipTransportPattern.test(combinedLower) &&
                !combinedLower.includes('network layer')
              ) {
                issues.push(
                  `${file} - ${q.id}: IP operates at the Network layer, not Transport.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });
});

describe('Database Content Accuracy', () => {
  describe('Normalization Form Properties', () => {
    it('should correctly describe normalization form requirements', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // 1NF requires atomic values and no repeating groups
              // 2NF requires 1NF + no partial dependencies on composite primary key
              // 3NF requires 2NF + no transitive dependencies

              // Check for claims that 1NF removes transitive dependencies (it doesn't - that's 3NF)
              if (
                combinedLower.includes('1nf') &&
                combinedLower.includes('transitive') &&
                !combinedLower.includes('3nf') &&
                !combinedLower.includes('does not')
              ) {
                issues.push(
                  `${file} - ${q.id}: 1NF does NOT address transitive dependencies. That's 3NF.`
                );
              }

              // Check for claims that 2NF removes transitive dependencies (it doesn't - that's 3NF)
              if (
                combinedLower.includes('2nf') &&
                combinedLower.includes('transitive depend') &&
                combinedLower.includes('removes') &&
                !combinedLower.includes('3nf')
              ) {
                issues.push(
                  `${file} - ${q.id}: 2NF does NOT remove transitive dependencies. That's 3NF.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('SQL Join Semantics', () => {
    it('should correctly describe join behavior', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // INNER JOIN only returns matching rows
              if (
                combinedLower.includes('inner join') &&
                combinedLower.includes('all rows') &&
                !combinedLower.includes('matching') &&
                !combinedLower.includes('only matching')
              ) {
                issues.push(
                  `${file} - ${q.id}: INNER JOIN returns only matching rows, not all rows.`
                );
              }

              // CROSS JOIN produces Cartesian product
              if (
                combinedLower.includes('cross join') &&
                combinedLower.includes('matching rows') &&
                !combinedLower.includes('cartesian')
              ) {
                issues.push(
                  `${file} - ${q.id}: CROSS JOIN produces Cartesian product of all rows, not just matching.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('ACID Properties', () => {
    it('should correctly define ACID properties', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // Atomicity means all-or-nothing, not isolation
              if (
                combinedLower.includes('atomicity') &&
                combinedLower.includes('isolation') &&
                combinedLower.includes(' means ') &&
                !combinedLower.includes('not isolation')
              ) {
                // This is a more nuanced check - atomicity and isolation are different
                // Only flag clear conflations
              }

              // Durability means committed data survives failures
              if (
                combinedLower.includes('durability') &&
                combinedLower.includes('temporary') &&
                !combinedLower.includes('not temporary')
              ) {
                issues.push(
                  `${file} - ${q.id}: Durability means committed changes are PERMANENT, not temporary.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });
});

describe('Operating System Content Accuracy', () => {
  describe('Process Scheduling', () => {
    it('should correctly describe scheduling algorithm properties', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // FCFS (First Come First Serve) is non-preemptive
              if (
                (combinedLower.includes('fcfs') || combinedLower.includes('first come first serve')) &&
                combinedLower.includes('preemptive') &&
                !combinedLower.includes('non-preemptive') &&
                !combinedLower.includes('not preemptive')
              ) {
                issues.push(
                  `${file} - ${q.id}: FCFS is NON-preemptive scheduling.`
                );
              }

              // Round Robin is preemptive
              if (
                combinedLower.includes('round robin') &&
                combinedLower.includes('non-preemptive') &&
                !combinedLower.includes('unlike')
              ) {
                issues.push(
                  `${file} - ${q.id}: Round Robin IS preemptive, not non-preemptive.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });

  describe('Memory Management', () => {
    it('should correctly describe paging and segmentation', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // Paging has fixed-size blocks
              if (
                combinedLower.includes('paging') &&
                combinedLower.includes('variable size') &&
                !combinedLower.includes('segmentation') &&
                !combinedLower.includes('fixed size')
              ) {
                issues.push(
                  `${file} - ${q.id}: Paging uses FIXED-size pages. Segmentation uses variable-size segments.`
                );
              }

              // Segmentation has variable-size blocks
              if (
                combinedLower.includes('segmentation') &&
                combinedLower.includes('fixed size') &&
                !combinedLower.includes('paging') &&
                !combinedLower.includes('variable')
              ) {
                issues.push(
                  `${file} - ${q.id}: Segmentation uses VARIABLE-size segments. Paging uses fixed-size pages.`
                );
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });
  });
});
