/**
 * Algorithm Content Accuracy Tests
 *
 * These tests validate the technical accuracy of algorithm-related quiz and exam content.
 * They check for common misconceptions about:
 * - Time complexity claims
 * - Sorting algorithm stability
 * - Data structure properties
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

/**
 * Find all quiz and exam JSON files
 */
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

describe('Algorithm Content Accuracy', () => {
  describe('Sorting Algorithm Properties', () => {
    // Known stable sorting algorithms
    const STABLE_SORTS = ['merge sort', 'insertion sort', 'counting sort', 'radix sort', 'bubble sort', 'tim sort'];
    // Known unstable sorting algorithms
    const UNSTABLE_SORTS = ['quick sort', 'heap sort', 'selection sort'];

    it('should correctly identify stable sorting algorithms', () => {
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
              const promptLower = q.prompt?.toLowerCase() || '';
              const explanationLower = q.explanation?.toLowerCase() || '';
              const combined = promptLower + ' ' + explanationLower;

              // Check for claims about stability
              if (combined.includes('stable') && combined.includes('sort')) {
                // Verify unstable sorts are NOT claimed to be stable
                // Use more precise patterns to avoid false positives
                for (const unstable of UNSTABLE_SORTS) {
                  // Match patterns like "selection sort is stable" but not "selection sort are not stable"
                  const stablePattern = new RegExp(`${unstable.replace(' ', '\\s+')}\\s+is\\s+stable`, 'i');
                  if (stablePattern.test(combined) && !combined.includes('not stable')) {
                    issues.push(
                      `${file} - ${q.id}: Incorrectly claims ${unstable} is stable. ${unstable} is NOT stable.`
                    );
                  }
                }
              }
            }
          }
        } catch (e) {
          // Skip files that can't be parsed
        }
      }

      expect(issues).toEqual([]);
    });

    it('should correctly state worst-case complexity of common sorting algorithms', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      // Known worst-case complexities
      const WORST_CASE_N_LOG_N = ['merge sort', 'heap sort'];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // Check for incorrect worst-case claims
              // Only flag if the question directly claims an O(n log n) algorithm has O(n^2) worst case
              // Pattern: "merge sort has worst-case O(n^2)" or similar direct claims
              for (const algo of WORST_CASE_N_LOG_N) {
                // Match patterns like "merge sort has O(n^2) worst case" or "worst-case of merge sort is O(n^2)"
                // But NOT patterns comparing it to other algorithms like "while Quick Sort can degrade to O(n^2)"
                const worstPattern = new RegExp(`${algo.replace(' ', '\\s+')}.*(?:has|is).*o\\(n\\^?2\\).*worst`, 'i');
                const worstPattern2 = new RegExp(`worst.*${algo.replace(' ', '\\s+')}.*(?:is|:).*o\\(n\\^?2\\)`, 'i');

                if (
                  (worstPattern.test(combinedLower) || worstPattern2.test(combinedLower)) &&
                  !combinedLower.includes('not o(n^2)') &&
                  !combinedLower.includes('unlike')
                ) {
                  issues.push(
                    `${file} - ${q.id}: ${algo} worst case is O(n log n), not O(n^2).`
                  );
                }
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

  describe('Data Structure Time Complexity Claims', () => {
    it('should correctly state hash table complexities', () => {
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

              // Hash tables have O(1) average case, O(n) worst case
              // Check for incorrect "worst case O(1)" claims
              if (
                (combinedLower.includes('hash table') || combinedLower.includes('hash map')) &&
                combinedLower.includes('worst') &&
                combinedLower.includes('o(1)')
              ) {
                issues.push(
                  `${file} - ${q.id}: Hash table worst case is O(n), not O(1). O(1) is average case.`
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

    it('should correctly state binary search tree complexities', () => {
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

              // Unbalanced BST has O(n) worst case for search
              // Check for claims that BST (not specifically balanced) always has O(log n)
              if (
                combinedLower.includes('binary search tree') &&
                !combinedLower.includes('balanced') &&
                !combinedLower.includes('avl') &&
                !combinedLower.includes('red-black') &&
                combinedLower.includes('worst') &&
                combinedLower.includes('o(log n)')
              ) {
                issues.push(
                  `${file} - ${q.id}: Unbalanced BST worst case is O(n), not O(log n). Only balanced BSTs guarantee O(log n).`
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

  describe('Binary Search Prerequisites', () => {
    it('should correctly state that binary search requires sorted data', () => {
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

              // Binary search should mention sorted data requirement
              if (
                combinedLower.includes('binary search') &&
                combinedLower.includes('unsorted') &&
                (combinedLower.includes('works') || combinedLower.includes('can be used'))
              ) {
                // Check if it's correctly stating binary search doesn't work on unsorted
                if (!combinedLower.includes('not') && !combinedLower.includes('cannot')) {
                  issues.push(
                    `${file} - ${q.id}: Binary search requires sorted data. Claims it works on unsorted data may be incorrect.`
                  );
                }
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

  describe('Graph Algorithm Complexities', () => {
    it('should correctly state BFS and DFS complexities', () => {
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

              // BFS and DFS on adjacency list are O(V+E)
              if (
                (combinedLower.includes('bfs') || combinedLower.includes('dfs') ||
                 combinedLower.includes('breadth-first') || combinedLower.includes('depth-first')) &&
                combinedLower.includes('adjacency list') &&
                combinedLower.includes('o(v^2)')
              ) {
                issues.push(
                  `${file} - ${q.id}: BFS/DFS with adjacency list is O(V+E), not O(V^2). O(V^2) is for adjacency matrix.`
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

    it('should correctly state Dijkstra limitations with negative weights', () => {
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

              // Dijkstra should NOT be claimed to work with negative edge weights
              // Pattern must claim it works WITH negative weights, not that it works for non-negative
              // "works for non-negative" is correct, "works with negative" is incorrect
              if (
                combinedLower.includes('dijkstra') &&
                combinedLower.includes('negative') &&
                combinedLower.includes('works')
              ) {
                // Exclude correct statements: "works for non-negative", "works with non-negative"
                // Only flag incorrect claims like "works with negative weights"
                if (
                  !combinedLower.includes('non-negative') &&
                  !combinedLower.includes('not work') &&
                  !combinedLower.includes('fails') &&
                  !combinedLower.includes('cannot') &&
                  !combinedLower.includes("doesn't")
                ) {
                  issues.push(
                    `${file} - ${q.id}: Dijkstra's algorithm does NOT work with negative edge weights.`
                  );
                }
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

  describe('Divide and Conquer Properties', () => {
    it('should correctly identify divide and conquer algorithms', () => {
      const quizFiles = findJsonFiles(SUBJECTS_DIR, 'quizzes.json');
      const examFiles = findJsonFiles(SUBJECTS_DIR, 'exams.json');
      const allFiles = [...quizFiles, ...examFiles];
      const issues: string[] = [];

      // Algorithms that ARE divide and conquer
      const DC_ALGORITHMS = ['merge sort', 'quick sort', 'binary search'];
      // Algorithms that are NOT divide and conquer
      const NOT_DC_ALGORITHMS = ['insertion sort', 'bubble sort', 'selection sort', 'linear search'];

      for (const file of allFiles) {
        try {
          const data = loadJson<Quiz[] | Exam[]>(file);
          const items = Array.isArray(data) ? data : [data];

          for (const item of items) {
            if (!item.questions) continue;

            for (const q of item.questions) {
              const combinedLower = ((q.prompt || '') + ' ' + (q.explanation || '')).toLowerCase();

              // Check for incorrect claims that non-DC algorithms ARE D&C
              for (const notDc of NOT_DC_ALGORITHMS) {
                if (
                  combinedLower.includes(notDc) &&
                  combinedLower.includes('divide and conquer') &&
                  (combinedLower.includes(' is a ') || combinedLower.includes(' is an ')) &&
                  !combinedLower.includes('not ')
                ) {
                  issues.push(
                    `${file} - ${q.id}: ${notDc} is NOT a divide and conquer algorithm.`
                  );
                }
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
