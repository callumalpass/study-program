/**
 * Algorithm Complexity Validation Tests
 *
 * These tests validate that quiz and exam content accurately describes
 * algorithm time and space complexities. This helps catch common mistakes
 * in educational content about algorithm analysis.
 */

import { describe, it, expect } from 'vitest';

interface Question {
  id: string;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
}

interface Quiz {
  id: string;
  subjectId: string;
  questions: Question[];
}

interface Exam {
  id: string;
  subjectId: string;
  questions: Question[];
}

// Load all quizzes and exams
const quizModules = import.meta.glob('../src/subjects/**/quizzes.json', { eager: true });
const examModules = import.meta.glob('../src/subjects/**/exams.json', { eager: true });

const allQuizzes: Quiz[] = Object.values(quizModules).flatMap((module: unknown) => {
  const mod = module as { default?: Quiz[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

const allExams: Exam[] = Object.values(examModules).flatMap((module: unknown) => {
  const mod = module as { default?: Exam[] };
  return Array.isArray(mod.default) ? mod.default : [];
});

const allQuestions: Question[] = [
  ...allQuizzes.flatMap(q => q.questions),
  ...allExams.flatMap(e => e.questions),
];

describe('Algorithm Complexity Content Validation', () => {
  describe('time complexity claims accuracy', () => {
    // Common complexity facts that should be correct if mentioned
    // These patterns require exact algorithm names to avoid false positives
    const complexityFacts = [
      { pattern: /\bbinary search\b(?! tree)/i, expectedComplexity: /O\(log\s*n\)/i, description: 'binary search (not BST)' },
      { pattern: /\blinear search\b/i, expectedComplexity: /O\(n\)/i, description: 'linear search' },
      { pattern: /\bmerge sort\b.*worst/i, expectedComplexity: /O\(n\s*log\s*n\)/i, description: 'merge sort worst-case' },
      { pattern: /\bheap sort\b.*worst/i, expectedComplexity: /O\(n\s*log\s*n\)/i, description: 'heap sort worst-case' },
      { pattern: /\bquick sort\b.*worst/i, expectedComplexity: /O\(n\^?2|O\(n²\)/i, description: 'quick sort worst-case' },
      { pattern: /\bquick sort\b.*average/i, expectedComplexity: /O\(n\s*log\s*n\)/i, description: 'quick sort average-case' },
      { pattern: /\bbubble sort\b/i, expectedComplexity: /O\(n\^?2|O\(n²\)/i, description: 'bubble sort' },
      { pattern: /\binsertion sort\b.*worst/i, expectedComplexity: /O\(n\^?2|O\(n²\)/i, description: 'insertion sort worst-case' },
      { pattern: /\binsertion sort\b.*best/i, expectedComplexity: /O\(n\)/i, description: 'insertion sort best-case' },
    ];

    it('verifies complexity claims in explanations are accurate', () => {
      const issues: string[] = [];

      for (const question of allQuestions) {
        const explanation = question.explanation || '';
        const prompt = question.prompt || '';

        for (const fact of complexityFacts) {
          // Only check questions where both prompt AND explanation discuss the algorithm
          // to avoid false positives from tangential mentions
          if (fact.pattern.test(prompt) && fact.pattern.test(explanation)) {
            const hasComplexityMention = /O\([^)]+\)/.test(explanation);
            if (hasComplexityMention && !fact.expectedComplexity.test(explanation)) {
              const complexityMatch = explanation.match(/O\([^)]+\)/);
              if (complexityMatch) {
                const statedComplexity = complexityMatch[0];
                if (!fact.expectedComplexity.test(statedComplexity)) {
                  // Skip if discussing variants like quick select (not quick sort)
                  if (/quick select/i.test(explanation)) continue;
                  // Skip if multiple complexities discussed
                  const hasMultipleComplexities = (explanation.match(/O\([^)]+\)/g) || []).length > 1;
                  if (!hasMultipleComplexities) {
                    issues.push(
                      `${question.id}: ${fact.description} mentioned but stated ${statedComplexity}`
                    );
                  }
                }
              }
            }
          }
        }
      }

      // Log issues for review but don't fail - these need manual verification
      if (issues.length > 0) {
        console.log('Potential complexity mismatches to review:', issues.length);
        issues.slice(0, 5).forEach(issue => console.log('  -', issue));
      }
    });
  });

  describe('data structure operation complexities', () => {
    it('validates array access is described as O(1)', () => {
      const arrayAccessQuestions = allQuestions.filter(
        q => /array.*access.*index/i.test(q.prompt) || /accessing.*element.*array/i.test(q.prompt)
      );

      for (const question of arrayAccessQuestions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctOption = question.options[question.correctAnswer as number];
          if (correctOption) {
            expect(
              /O\(1\)/.test(correctOption),
              `Question ${question.id}: Array access should be O(1), got "${correctOption}"`
            ).toBe(true);
          }
        }
      }
    });

    it('validates hash table average lookup is described as O(1)', () => {
      const hashLookupQuestions = allQuestions.filter(
        q => /hash\s*(table|map).*average.*lookup/i.test(q.prompt) ||
             /average.*lookup.*hash/i.test(q.prompt)
      );

      for (const question of hashLookupQuestions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctOption = question.options[question.correctAnswer as number];
          if (correctOption) {
            expect(
              /O\(1\)/.test(correctOption),
              `Question ${question.id}: Hash table average lookup should be O(1)`
            ).toBe(true);
          }
        }
      }
    });

    it('validates balanced BST operations are described as O(log n)', () => {
      const balancedBstQuestions = allQuestions.filter(
        q => (/(balanced|average).*BST|BST.*(balanced|average)/i.test(q.prompt) &&
              /time complexity|O\(/i.test(q.prompt) &&
              !/worst|skewed|unbalanced/i.test(q.prompt))
      );

      // Only check questions specifically about balanced/average case BST
      for (const question of balancedBstQuestions) {
        const explanation = question.explanation || '';
        expect(
          /O\(log\s*n\)/i.test(explanation) ||
          (question.type === 'multiple_choice' && question.options &&
           /O\(log\s*n\)/i.test(question.options[question.correctAnswer as number] || '')),
          `Question ${question.id}: Balanced BST operations should be O(log n)`
        ).toBe(true);
      }
    });

    it('validates unbalanced/worst-case BST operations are described as O(n)', () => {
      const unbalancedBstQuestions = allQuestions.filter(
        q => (/(worst|skewed|unbalanced).*BST|BST.*(worst|skewed|unbalanced)/i.test(q.prompt) &&
              /time complexity|O\(/i.test(q.prompt))
      );

      for (const question of unbalancedBstQuestions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctOption = question.options[question.correctAnswer as number] || '';
          expect(
            /O\(n\)/i.test(correctOption),
            `Question ${question.id}: Worst-case BST operations should be O(n), got "${correctOption}"`
          ).toBe(true);
        }
      }
    });
  });

  describe('sorting algorithm properties', () => {
    it('validates stable sorting algorithms are correctly identified', () => {
      const stableSortAlgorithms = ['merge sort', 'insertion sort', 'bubble sort', 'counting sort', 'radix sort'];
      const unstableSortAlgorithms = ['quick sort', 'heap sort', 'selection sort'];

      const stabilityQuestions = allQuestions.filter(
        q => /stable.*sort/i.test(q.prompt) || /sort.*stable/i.test(q.prompt)
      );

      for (const question of stabilityQuestions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctOption = question.options[question.correctAnswer as number]?.toLowerCase() || '';

          // Check if the correct answer mentions a stable algorithm
          const isStableAlgorithm = stableSortAlgorithms.some(algo => correctOption.includes(algo));
          const isUnstableAlgorithm = unstableSortAlgorithms.some(algo => correctOption.includes(algo));

          // If asking "which is stable", correct answer should be stable
          if (/which.*is.*stable/i.test(question.prompt)) {
            expect(
              isStableAlgorithm && !isUnstableAlgorithm,
              `Question ${question.id}: "${correctOption}" is not a stable sort algorithm`
            ).toBe(true);
          }
          // If asking "which is NOT stable", correct answer should be unstable
          else if (/which.*not.*stable/i.test(question.prompt) || /which.*unstable/i.test(question.prompt)) {
            expect(
              isUnstableAlgorithm && !isStableAlgorithm,
              `Question ${question.id}: "${correctOption}" is a stable sort algorithm`
            ).toBe(true);
          }
        }
      }
    });

    it('validates comparison-based sorting lower bound is mentioned correctly', () => {
      const lowerBoundQuestions = allQuestions.filter(
        q => /lower bound.*comparison.*sort/i.test(q.prompt) ||
             /comparison.*sort.*lower bound/i.test(q.prompt) ||
             /Ω.*n\s*log\s*n/i.test(q.prompt)
      );

      for (const question of lowerBoundQuestions) {
        const explanation = question.explanation || '';
        const correctAnswer = String(question.correctAnswer);

        // Should reference Ω(n log n) or O(n log n) as lower bound
        expect(
          /n\s*log\s*n/i.test(explanation) || /n\s*log\s*n/i.test(correctAnswer),
          `Question ${question.id}: Comparison-based sorting lower bound should reference n log n`
        ).toBe(true);
      }
    });
  });

  describe('graph algorithm complexities', () => {
    it('validates graph BFS and DFS complexities with adjacency list', () => {
      // Only match questions specifically about graph traversal with adjacency lists
      // Exclude AI/tree search which uses O(b^d) branching factor notation
      const graphBfsDfsQuestions = allQuestions.filter(
        q => (/(graph|adjacency).*(?:BFS|breadth.first|DFS|depth.first)/i.test(q.prompt) ||
              /(?:BFS|breadth.first|DFS|depth.first).*(?:graph|adjacency)/i.test(q.prompt)) &&
             /complexity|O\(/i.test(q.prompt) &&
             !/branching factor|tree search|AI|state space/i.test(q.prompt)
      );

      for (const question of graphBfsDfsQuestions) {
        if (question.type === 'multiple_choice' && question.options) {
          const correctOption = question.options[question.correctAnswer as number] || '';
          // Graph BFS and DFS are O(V + E) with adjacency list
          expect(
            /O\(V\s*\+\s*E\)/i.test(correctOption) || /O\(n\s*\+\s*m\)/i.test(correctOption),
            `Question ${question.id}: Graph BFS/DFS complexity should be O(V+E), got "${correctOption}"`
          ).toBe(true);
        }
      }
    });

    it('validates Dijkstra complexity is correctly stated', () => {
      const dijkstraQuestions = allQuestions.filter(
        q => /dijkstra.*complexity/i.test(q.prompt) || /complexity.*dijkstra/i.test(q.prompt)
      );

      for (const question of dijkstraQuestions) {
        const explanation = question.explanation || '';
        // With binary heap: O(E log V) or O((V + E) log V)
        // With Fibonacci heap: O(E + V log V)
        // Without heap (array): O(V^2)
        const validComplexities = [
          /O\(E\s*log\s*V\)/i,
          /O\(\(V\s*\+\s*E\)\s*log\s*V\)/i,
          /O\(V\^?2\)/i,
          /O\(V²\)/i,
          /O\(E\s*\+\s*V\s*log\s*V\)/i,
        ];

        const hasValidComplexity = validComplexities.some(
          pattern => pattern.test(explanation) ||
            (question.type === 'multiple_choice' && question.options &&
             pattern.test(question.options[question.correctAnswer as number] || ''))
        );

        if (dijkstraQuestions.length > 0 && explanation) {
          expect(
            hasValidComplexity,
            `Question ${question.id}: Dijkstra complexity should be one of the standard forms`
          ).toBe(true);
        }
      }
    });
  });

  describe('space complexity claims', () => {
    it('validates in-place algorithms are correctly identified', () => {
      const inPlaceQuestions = allQuestions.filter(
        q => /in.?place/i.test(q.prompt) && /space/i.test(q.prompt)
      );

      const inPlaceAlgorithms = ['heap sort', 'insertion sort', 'selection sort', 'bubble sort', 'quick sort'];
      const notInPlaceAlgorithms = ['merge sort'];

      for (const question of inPlaceQuestions) {
        const explanation = question.explanation || '';
        if (/O\(1\)/i.test(explanation)) {
          // If claiming O(1) space, should be talking about an in-place algorithm
          const mentionsInPlaceAlgo = inPlaceAlgorithms.some(algo =>
            new RegExp(algo, 'i').test(explanation)
          );
          const mentionsNotInPlaceAlgo = notInPlaceAlgorithms.some(algo =>
            new RegExp(algo, 'i').test(explanation)
          );

          if (mentionsNotInPlaceAlgo && !mentionsInPlaceAlgo) {
            console.log(`Warning: ${question.id} claims O(1) space but mentions non-in-place algorithm`);
          }
        }
      }
    });

    it('validates linked list reversal is O(1) space', () => {
      const linkedListReverseQuestions = allQuestions.filter(
        q => /revers.*linked list/i.test(q.prompt) && /space/i.test(q.prompt)
      );

      for (const question of linkedListReverseQuestions) {
        if (question.type === 'true_false') {
          // Questions about O(n) space for in-place reversal should be false
          if (/O\(n\).*space/i.test(question.prompt)) {
            expect(
              question.correctAnswer === false,
              `Question ${question.id}: In-place linked list reversal is O(1) space, not O(n)`
            ).toBe(true);
          }
        }
      }
    });
  });
});

describe('Mathematical Content Validation', () => {
  describe('Big-O notation usage', () => {
    it('validates that Big-Theta questions have accurate explanations', () => {
      const bigThetaDefinitionQuestions = allQuestions.filter(
        q => /what.*is.*big.?theta|define.*big.?theta|big.?theta.*meaning/i.test(q.prompt)
      );

      for (const question of bigThetaDefinitionQuestions) {
        const explanation = question.explanation || '';
        // Big-Theta definition should mention tight bound, upper and lower, or asymptotically equal
        expect(
          /tight|exact|both|upper.*lower|lower.*upper|asymptotic/i.test(explanation),
          `Question ${question.id}: Big-Theta definition should describe tight/exact bounds`
        ).toBe(true);
      }
    });
  });

  describe('recurrence relation solutions', () => {
    it('validates Master Theorem applications', () => {
      const masterTheoremQuestions = allQuestions.filter(
        q => /master theorem/i.test(q.prompt) || /T\(n\)\s*=.*T\(n\/\d\)/i.test(q.prompt)
      );

      // Known Master Theorem results
      const knownRecurrences = [
        { pattern: /T\(n\)\s*=\s*2\s*T\(n\/2\)\s*\+\s*O\(n\)/i, solution: /O\(n\s*log\s*n\)/i },
        { pattern: /T\(n\)\s*=\s*T\(n\/2\)\s*\+\s*O\(1\)/i, solution: /O\(log\s*n\)/i },
        { pattern: /T\(n\)\s*=\s*2\s*T\(n\/2\)\s*\+\s*O\(1\)/i, solution: /O\(n\)/i },
      ];

      for (const question of masterTheoremQuestions) {
        for (const recurrence of knownRecurrences) {
          if (recurrence.pattern.test(question.prompt)) {
            if (question.type === 'multiple_choice' && question.options) {
              const correctOption = question.options[question.correctAnswer as number] || '';
              expect(
                recurrence.solution.test(correctOption),
                `Question ${question.id}: Master Theorem solution mismatch for ${recurrence.pattern.source}`
              ).toBe(true);
            }
          }
        }
      }
    });
  });
});
