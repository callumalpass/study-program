import type { Topic, Subtopic } from '../../core/types';

// Topic 1: Algorithm Analysis and Big-O
import topic1Content from './content/topic-1.md?raw';
import topic1Sub1 from './content/topic-1/01-time-complexity.md?raw';
import topic1Sub2 from './content/topic-1/02-space-complexity.md?raw';
import topic1Sub3 from './content/topic-1/03-asymptotic-notations.md?raw';
import topic1Sub4 from './content/topic-1/04-analyzing-code.md?raw';
import topic1Sub5 from './content/topic-1/05-best-worst-average.md?raw';
import topic1Sub6 from './content/topic-1/06-amortized-analysis.md?raw';
import topic1Sub7 from './content/topic-1/07-lower-bounds-optimality.md?raw';

// Topic 2: Sorting Algorithms
import topic2Content from './content/topic-2.md?raw';
import topic2Sub1 from './content/topic-2/01-comparison-sorts.md?raw';
import topic2Sub2 from './content/topic-2/02-linear-time-sorts.md?raw';
import topic2Sub3 from './content/topic-2/03-quicksort-analysis.md?raw';
import topic2Sub4 from './content/topic-2/04-sorting-applications.md?raw';
import topic2Sub5 from './content/topic-2/05-sorting-stability.md?raw';
import topic2Sub6 from './content/topic-2/06-external-sorting.md?raw';
import topic2Sub7 from './content/topic-2/07-hybrid-sorting.md?raw';

// Topic 3: Searching Algorithms
import topic3Content from './content/topic-3.md?raw';
import topic3Sub1 from './content/topic-3/01-binary-search.md?raw';
import topic3Sub2 from './content/topic-3/02-hash-based-search.md?raw';
import topic3Sub3 from './content/topic-3/03-search-trees.md?raw';
import topic3Sub4 from './content/topic-3/04-string-search.md?raw';
import topic3Sub5 from './content/topic-3/05-interpolation-exponential.md?raw';
import topic3Sub6 from './content/topic-3/06-bloom-filters.md?raw';
import topic3Sub7 from './content/topic-3/07-order-statistics.md?raw';

// Topic 4: Divide and Conquer
import topic4Content from './content/topic-4.md?raw';
import topic4Sub1 from './content/topic-4/01-divide-conquer-paradigm.md?raw';
import topic4Sub2 from './content/topic-4/02-recurrence-relations.md?raw';
import topic4Sub3 from './content/topic-4/03-master-theorem.md?raw';
import topic4Sub4 from './content/topic-4/04-classic-divide-conquer.md?raw';
import topic4Sub5 from './content/topic-4/05-matrix-multiplication.md?raw';
import topic4Sub6 from './content/topic-4/06-closest-pair.md?raw';
import topic4Sub7 from './content/topic-4/07-fft-polynomials.md?raw';

// Topic 5: Dynamic Programming
import topic5Content from './content/topic-5.md?raw';
import topic5Sub1 from './content/topic-5/01-dp-fundamentals.md?raw';
import topic5Sub2 from './content/topic-5/02-classic-dp-problems.md?raw';
import topic5Sub3 from './content/topic-5/03-dp-optimization.md?raw';
import topic5Sub4 from './content/topic-5/04-dp-on-trees.md?raw';
import topic5Sub5 from './content/topic-5/05-sequence-dp.md?raw';
import topic5Sub6 from './content/topic-5/06-knapsack-variants.md?raw';
import topic5Sub7 from './content/topic-5/07-dp-state-reduction.md?raw';

// Topic 6: Greedy Algorithms
import topic6Content from './content/topic-6.md?raw';
import topic6Sub1 from './content/topic-6/01-greedy-algorithms.md?raw';
import topic6Sub2 from './content/topic-6/02-greedy-proofs.md?raw';
import topic6Sub3 from './content/topic-6/03-greedy-scheduling.md?raw';
import topic6Sub4 from './content/topic-6/04-huffman-coding.md?raw';
import topic6Sub5 from './content/topic-6/05-mst-greedy.md?raw';
import topic6Sub6 from './content/topic-6/06-dijkstra-greedy.md?raw';
import topic6Sub7 from './content/topic-6/07-greedy-vs-dp.md?raw';

// Topic 7: Graph Algorithms
import topic7Content from './content/topic-7.md?raw';
import topic7Sub1 from './content/topic-7/01-graph-traversal-algorithms.md?raw';
import topic7Sub2 from './content/topic-7/02-mst-algorithms.md?raw';
import topic7Sub3 from './content/topic-7/03-shortest-paths.md?raw';
import topic7Sub4 from './content/topic-7/04-topological-sort.md?raw';
import topic7Sub5 from './content/topic-7/05-strongly-connected.md?raw';
import topic7Sub6 from './content/topic-7/06-network-flow.md?raw';
import topic7Sub7 from './content/topic-7/07-advanced-shortest-paths.md?raw';

// Topic 8: Algorithm Correctness and Completeness
import topic8Content from './content/topic-8.md?raw';
import topic8Sub1 from './content/topic-8/01-correctness-proofs.md?raw';
import topic8Sub2 from './content/topic-8/02-loop-invariants.md?raw';
import topic8Sub3 from './content/topic-8/03-algorithm-design-patterns.md?raw';
import topic8Sub4 from './content/topic-8/04-termination-proofs.md?raw';
import topic8Sub5 from './content/topic-8/05-complexity-theory.md?raw';
import topic8Sub6 from './content/topic-8/06-computational-hardness.md?raw';
import topic8Sub7 from './content/topic-8/07-approximation-algorithms.md?raw';

// Topic 1 Subtopics
const topic1Subtopics: Subtopic[] = [
  { id: 'cs201-t1-time', slug: 'time-complexity', title: 'Time Complexity Fundamentals', content: topic1Sub1, order: 1 },
  { id: 'cs201-t1-space', slug: 'space-complexity', title: 'Space Complexity', content: topic1Sub2, order: 2 },
  { id: 'cs201-t1-asymptotic', slug: 'asymptotic-notations', title: 'Asymptotic Notations', content: topic1Sub3, order: 3 },
  { id: 'cs201-t1-analyzing', slug: 'analyzing-code', title: 'Analyzing Code', content: topic1Sub4, order: 4 },
  { id: 'cs201-t1-cases', slug: 'best-worst-average', title: 'Best, Worst, and Average Cases', content: topic1Sub5, order: 5 },
  { id: 'cs201-t1-amortized', slug: 'amortized-analysis', title: 'Amortized Analysis', content: topic1Sub6, order: 6 },
  { id: 'cs201-t1-lower', slug: 'lower-bounds-optimality', title: 'Lower Bounds and Optimality', content: topic1Sub7, order: 7 },
];

// Topic 2 Subtopics
const topic2Subtopics: Subtopic[] = [
  { id: 'cs201-t2-comparison', slug: 'comparison-sorts', title: 'Comparison-Based Sorting', content: topic2Sub1, order: 1 },
  { id: 'cs201-t2-linear', slug: 'linear-time-sorts', title: 'Linear-Time Sorting', content: topic2Sub2, order: 2 },
  { id: 'cs201-t2-quicksort', slug: 'quicksort-analysis', title: 'QuickSort Analysis', content: topic2Sub3, order: 3 },
  { id: 'cs201-t2-applications', slug: 'sorting-applications', title: 'Sorting Applications', content: topic2Sub4, order: 4 },
  { id: 'cs201-t2-stability', slug: 'sorting-stability', title: 'Sorting Stability', content: topic2Sub5, order: 5 },
  { id: 'cs201-t2-external', slug: 'external-sorting', title: 'External Sorting', content: topic2Sub6, order: 6 },
  { id: 'cs201-t2-hybrid', slug: 'hybrid-sorting', title: 'Hybrid Sorting Algorithms', content: topic2Sub7, order: 7 },
];

// Topic 3 Subtopics
const topic3Subtopics: Subtopic[] = [
  { id: 'cs201-t3-binary', slug: 'binary-search', title: 'Binary Search', content: topic3Sub1, order: 1 },
  { id: 'cs201-t3-hash', slug: 'hash-based-search', title: 'Hash-Based Search', content: topic3Sub2, order: 2 },
  { id: 'cs201-t3-trees', slug: 'search-trees', title: 'Search Trees', content: topic3Sub3, order: 3 },
  { id: 'cs201-t3-string', slug: 'string-search', title: 'String Search Algorithms', content: topic3Sub4, order: 4 },
  { id: 'cs201-t3-interpolation', slug: 'interpolation-exponential', title: 'Interpolation and Exponential Search', content: topic3Sub5, order: 5 },
  { id: 'cs201-t3-bloom', slug: 'bloom-filters', title: 'Bloom Filters and Probabilistic Structures', content: topic3Sub6, order: 6 },
  { id: 'cs201-t3-order', slug: 'order-statistics', title: 'Order Statistics and Selection', content: topic3Sub7, order: 7 },
];

// Topic 4 Subtopics
const topic4Subtopics: Subtopic[] = [
  { id: 'cs201-t4-paradigm', slug: 'divide-conquer-paradigm', title: 'Divide and Conquer Paradigm', content: topic4Sub1, order: 1 },
  { id: 'cs201-t4-recurrence', slug: 'recurrence-relations', title: 'Recurrence Relations', content: topic4Sub2, order: 2 },
  { id: 'cs201-t4-master', slug: 'master-theorem', title: 'Master Theorem', content: topic4Sub3, order: 3 },
  { id: 'cs201-t4-classic', slug: 'classic-divide-conquer', title: 'Classic Divide and Conquer', content: topic4Sub4, order: 4 },
  { id: 'cs201-t4-matrix', slug: 'matrix-multiplication', title: 'Matrix Multiplication', content: topic4Sub5, order: 5 },
  { id: 'cs201-t4-closest', slug: 'closest-pair', title: 'Closest Pair Problem', content: topic4Sub6, order: 6 },
  { id: 'cs201-t4-fft', slug: 'fft-polynomials', title: 'FFT and Polynomial Multiplication', content: topic4Sub7, order: 7 },
];

// Topic 5 Subtopics
const topic5Subtopics: Subtopic[] = [
  { id: 'cs201-t5-fundamentals', slug: 'dp-fundamentals', title: 'DP Fundamentals', content: topic5Sub1, order: 1 },
  { id: 'cs201-t5-classic', slug: 'classic-dp-problems', title: 'Classic DP Problems', content: topic5Sub2, order: 2 },
  { id: 'cs201-t5-optimization', slug: 'dp-optimization', title: 'DP Optimization Techniques', content: topic5Sub3, order: 3 },
  { id: 'cs201-t5-trees', slug: 'dp-on-trees', title: 'DP on Trees', content: topic5Sub4, order: 4 },
  { id: 'cs201-t5-sequence', slug: 'sequence-dp', title: 'Sequence DP', content: topic5Sub5, order: 5 },
  { id: 'cs201-t5-knapsack', slug: 'knapsack-variants', title: 'Knapsack Variants', content: topic5Sub6, order: 6 },
  { id: 'cs201-t5-state', slug: 'dp-state-reduction', title: 'State Space Reduction', content: topic5Sub7, order: 7 },
];

// Topic 6 Subtopics
const topic6Subtopics: Subtopic[] = [
  { id: 'cs201-t6-intro', slug: 'greedy-algorithms', title: 'Greedy Algorithm Design', content: topic6Sub1, order: 1 },
  { id: 'cs201-t6-proofs', slug: 'greedy-proofs', title: 'Proving Greedy Correctness', content: topic6Sub2, order: 2 },
  { id: 'cs201-t6-scheduling', slug: 'greedy-scheduling', title: 'Greedy Scheduling', content: topic6Sub3, order: 3 },
  { id: 'cs201-t6-huffman', slug: 'huffman-coding', title: 'Huffman Coding', content: topic6Sub4, order: 4 },
  { id: 'cs201-t6-mst', slug: 'mst-greedy', title: 'Minimum Spanning Trees', content: topic6Sub5, order: 5 },
  { id: 'cs201-t6-dijkstra', slug: 'dijkstra-greedy', title: "Dijkstra's Algorithm", content: topic6Sub6, order: 6 },
  { id: 'cs201-t6-vs-dp', slug: 'greedy-vs-dp', title: 'Greedy vs Dynamic Programming', content: topic6Sub7, order: 7 },
];

// Topic 7 Subtopics
const topic7Subtopics: Subtopic[] = [
  { id: 'cs201-t7-traversal', slug: 'graph-traversal', title: 'Graph Traversal Algorithms', content: topic7Sub1, order: 1 },
  { id: 'cs201-t7-mst', slug: 'mst-algorithms', title: 'MST Algorithms', content: topic7Sub2, order: 2 },
  { id: 'cs201-t7-shortest', slug: 'shortest-paths', title: 'Shortest Path Algorithms', content: topic7Sub3, order: 3 },
  { id: 'cs201-t7-topo', slug: 'topological-sort', title: 'Topological Sort and DAGs', content: topic7Sub4, order: 4 },
  { id: 'cs201-t7-scc', slug: 'strongly-connected', title: 'Strongly Connected Components', content: topic7Sub5, order: 5 },
  { id: 'cs201-t7-flow', slug: 'network-flow', title: 'Network Flow', content: topic7Sub6, order: 6 },
  { id: 'cs201-t7-advanced', slug: 'advanced-shortest-paths', title: 'Advanced Shortest Paths', content: topic7Sub7, order: 7 },
];

// Topic 8 Subtopics
const topic8Subtopics: Subtopic[] = [
  { id: 'cs201-t8-correctness', slug: 'correctness-proofs', title: 'Correctness Proofs', content: topic8Sub1, order: 1 },
  { id: 'cs201-t8-invariants', slug: 'loop-invariants', title: 'Loop Invariants', content: topic8Sub2, order: 2 },
  { id: 'cs201-t8-patterns', slug: 'algorithm-design-patterns', title: 'Algorithm Design Patterns', content: topic8Sub3, order: 3 },
  { id: 'cs201-t8-termination', slug: 'termination-proofs', title: 'Termination Proofs', content: topic8Sub4, order: 4 },
  { id: 'cs201-t8-complexity', slug: 'complexity-theory', title: 'Complexity Theory', content: topic8Sub5, order: 5 },
  { id: 'cs201-t8-hardness', slug: 'computational-hardness', title: 'Computational Hardness', content: topic8Sub6, order: 6 },
  { id: 'cs201-t8-approx', slug: 'approximation-algorithms', title: 'Approximation Algorithms', content: topic8Sub7, order: 7 },
];

export const cs201Topics: Topic[] = [
  {
    id: 'cs201-1',
    title: 'Algorithm Analysis and Big-O',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs201-quiz-1-1', 'cs201-quiz-1-2', 'cs201-quiz-1-3'],
    exerciseIds: ['cs201-ex-1-1', 'cs201-ex-1-2', 'cs201-ex-1-3', 'cs201-ex-1-4', 'cs201-ex-1-5', 'cs201-ex-1-6', 'cs201-ex-1-7', 'cs201-ex-1-8', 'cs201-ex-1-9', 'cs201-ex-1-10', 'cs201-ex-1-11', 'cs201-ex-1-12', 'cs201-ex-1-13', 'cs201-ex-1-14', 'cs201-ex-1-15', 'cs201-ex-1-16']
  },
  {
    id: 'cs201-2',
    title: 'Sorting Algorithms',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs201-quiz-2-1', 'cs201-quiz-2-2', 'cs201-quiz-2-3'],
    exerciseIds: ['cs201-ex-2-1', 'cs201-ex-2-2', 'cs201-ex-2-3', 'cs201-ex-2-4', 'cs201-ex-2-5', 'cs201-ex-2-6', 'cs201-ex-2-7', 'cs201-ex-2-8', 'cs201-ex-2-9', 'cs201-ex-2-10', 'cs201-ex-2-11', 'cs201-ex-2-12', 'cs201-ex-2-13', 'cs201-ex-2-14', 'cs201-ex-2-15', 'cs201-ex-2-16']
  },
  {
    id: 'cs201-3',
    title: 'Searching Algorithms',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs201-quiz-3-1', 'cs201-quiz-3-2', 'cs201-quiz-3-3'],
    exerciseIds: ['cs201-ex-3-1', 'cs201-ex-3-2', 'cs201-ex-3-3', 'cs201-ex-3-4', 'cs201-ex-3-5', 'cs201-ex-3-6', 'cs201-ex-3-7', 'cs201-ex-3-8', 'cs201-ex-3-9', 'cs201-ex-3-10', 'cs201-ex-3-11', 'cs201-ex-3-12', 'cs201-ex-3-13', 'cs201-ex-3-14', 'cs201-ex-3-15', 'cs201-ex-3-16']
  },
  {
    id: 'cs201-4',
    title: 'Divide and Conquer',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs201-quiz-4-1', 'cs201-quiz-4-2', 'cs201-quiz-4-3'],
    exerciseIds: ['cs201-ex-4-1', 'cs201-ex-4-2', 'cs201-ex-4-3', 'cs201-ex-4-4', 'cs201-ex-4-5', 'cs201-ex-4-6', 'cs201-ex-4-7', 'cs201-ex-4-8', 'cs201-ex-4-9', 'cs201-ex-4-10', 'cs201-ex-4-11', 'cs201-ex-4-12', 'cs201-ex-4-13', 'cs201-ex-4-14', 'cs201-ex-4-15', 'cs201-ex-4-16']
  },
  {
    id: 'cs201-5',
    title: 'Dynamic Programming',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs201-quiz-5-1', 'cs201-quiz-5-2', 'cs201-quiz-5-3'],
    exerciseIds: ['cs201-ex-5-1', 'cs201-ex-5-2', 'cs201-ex-5-3', 'cs201-ex-5-4', 'cs201-ex-5-5', 'cs201-ex-5-6', 'cs201-ex-5-7', 'cs201-ex-5-8', 'cs201-ex-5-9', 'cs201-ex-5-10', 'cs201-ex-5-11', 'cs201-ex-5-12', 'cs201-ex-5-13', 'cs201-ex-5-14', 'cs201-ex-5-15', 'cs201-ex-5-16']
  },
  {
    id: 'cs201-6',
    title: 'Greedy Algorithms',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs201-quiz-6-1', 'cs201-quiz-6-2', 'cs201-quiz-6-3'],
    exerciseIds: ['cs201-ex-6-1', 'cs201-ex-6-2', 'cs201-ex-6-3', 'cs201-ex-6-4', 'cs201-ex-6-5', 'cs201-ex-6-6', 'cs201-ex-6-7', 'cs201-ex-6-8', 'cs201-ex-6-9', 'cs201-ex-6-10', 'cs201-ex-6-11', 'cs201-ex-6-12', 'cs201-ex-6-13', 'cs201-ex-6-14', 'cs201-ex-6-15', 'cs201-ex-6-16']
  },
  {
    id: 'cs201-7',
    title: 'Graph Algorithms',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs201-quiz-7-1', 'cs201-quiz-7-2', 'cs201-quiz-7-3'],
    exerciseIds: ['cs201-ex-7-1', 'cs201-ex-7-2', 'cs201-ex-7-3', 'cs201-ex-7-4', 'cs201-ex-7-5', 'cs201-ex-7-6', 'cs201-ex-7-7', 'cs201-ex-7-8', 'cs201-ex-7-9', 'cs201-ex-7-10', 'cs201-ex-7-11', 'cs201-ex-7-12', 'cs201-ex-7-13', 'cs201-ex-7-14', 'cs201-ex-7-15', 'cs201-ex-7-16']
  },
  {
    id: 'cs201-8',
    title: 'Algorithm Correctness and Completeness',
    content: topic8Content,
    subtopics: topic8Subtopics,
    quizIds: ['cs201-quiz-8-1', 'cs201-quiz-8-2', 'cs201-quiz-8-3'],
    exerciseIds: ['cs201-ex-8-1', 'cs201-ex-8-2', 'cs201-ex-8-3', 'cs201-ex-8-4', 'cs201-ex-8-5', 'cs201-ex-8-6', 'cs201-ex-8-7', 'cs201-ex-8-8', 'cs201-ex-8-9', 'cs201-ex-8-10', 'cs201-ex-8-11', 'cs201-ex-8-12', 'cs201-ex-8-13', 'cs201-ex-8-14', 'cs201-ex-8-15', 'cs201-ex-8-16']
  }
];
