import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-complexity-classes.md?raw';
import topic1_2 from './content/topic-1/02-polynomial-reductions.md?raw';
import topic1_3 from './content/topic-1/03-sat.md?raw';
import topic1_4 from './content/topic-1/04-classic-problems.md?raw';
import topic1_5 from './content/topic-1/05-tsp.md?raw';
import topic1_6 from './content/topic-1/06-subset-sum.md?raw';
import topic1_7 from './content/topic-1/07-coping-with-np.md?raw';

import topic2_1 from './content/topic-2/01-approximation-intro.md?raw';
import topic2_2 from './content/topic-2/02-vertex-cover.md?raw';
import topic2_3 from './content/topic-2/03-set-cover.md?raw';
import topic2_4 from './content/topic-2/04-tsp-approximation.md?raw';
import topic2_5 from './content/topic-2/05-knapsack-fptas.md?raw';
import topic2_6 from './content/topic-2/06-scheduling.md?raw';
import topic2_7 from './content/topic-2/07-facility-location.md?raw';

import topic3_1 from './content/topic-3/01-randomization-intro.md?raw';
import topic3_2 from './content/topic-3/02-randomized-quicksort.md?raw';
import topic3_3 from './content/topic-3/03-kargers-mincut.md?raw';
import topic3_4 from './content/topic-3/04-hashing.md?raw';
import topic3_5 from './content/topic-3/05-randomized-selection.md?raw';
import topic3_6 from './content/topic-3/06-primality-testing.md?raw';
import topic3_7 from './content/topic-3/07-streaming-algorithms.md?raw';

import topic4_1 from './content/topic-4/01-online-intro.md?raw';
import topic4_2 from './content/topic-4/02-paging.md?raw';
import topic4_3 from './content/topic-4/03-k-server.md?raw';
import topic4_4 from './content/topic-4/04-ski-rental.md?raw';
import topic4_5 from './content/topic-4/05-load-balancing.md?raw';
import topic4_6 from './content/topic-4/06-bin-packing.md?raw';
import topic4_7 from './content/topic-4/07-secretary-problem.md?raw';

import topic5_1 from './content/topic-6/01-matrix-chain.md?raw';
import topic5_2 from './content/topic-6/02-optimal-bst.md?raw';
import topic5_3 from './content/topic-6/03-edit-distance.md?raw';
import topic5_4 from './content/topic-6/04-longest-common-subsequence.md?raw';
import topic5_5 from './content/topic-6/05-traveling-salesman-dp.md?raw';
import topic5_6 from './content/topic-6/06-knapsack-variants.md?raw';
import topic5_7 from './content/topic-6/07-dp-optimization.md?raw';

import topic6_1 from './content/topic-5/01-max-flow-intro.md?raw';
import topic6_2 from './content/topic-5/02-push-relabel.md?raw';
import topic6_3 from './content/topic-5/03-bipartite-matching.md?raw';
import topic6_4 from './content/topic-5/04-min-cost-flow.md?raw';
import topic6_5 from './content/topic-5/05-circulation.md?raw';
import topic6_6 from './content/topic-5/06-multi-commodity-flow.md?raw';
import topic6_7 from './content/topic-5/07-flow-applications.md?raw';

import topic7_1 from './content/topic-7/01-convex-hull.md?raw';
import topic7_2 from './content/topic-7/02-line-segment-intersection.md?raw';
import topic7_3 from './content/topic-7/03-closest-pair.md?raw';
import topic7_4 from './content/topic-7/04-voronoi-diagrams.md?raw';
import topic7_5 from './content/topic-7/05-polygon-triangulation.md?raw';
import topic7_6 from './content/topic-7/06-range-searching.md?raw';
import topic7_7 from './content/topic-7/07-geometric-algorithms.md?raw';

export const cs403Topics: Topic[] = [
  {
    id: 'cs403-topic-1',
    title: 'NP-Completeness Review',
    content: 'Review of NP-completeness, reduction techniques, NP-hard problems, and complexity classes.',
    subtopics: [
      { id: 'cs403-topic-1-1', slug: 'np-completeness-review', order: 1, title: 'NP-Completeness Review', content: topic1_1 },
      { id: 'cs403-topic-1-2', slug: 'reduction-techniques', order: 2, title: 'Reduction Techniques', content: topic1_2 },
      { id: 'cs403-topic-1-3', slug: 'np-hard-problems', order: 3, title: 'NP-Hard Problems', content: topic1_3 },
      { id: 'cs403-topic-1-4', slug: 'sat-problem', order: 4, title: 'SAT Problem', content: topic1_4 },
      { id: 'cs403-topic-1-5', slug: 'traveling-salesman', order: 5, title: 'Traveling Salesman Problem', content: topic1_5 },
      { id: 'cs403-topic-1-6', slug: 'graph-coloring', order: 6, title: 'Graph Coloring', content: topic1_6 },
      { id: 'cs403-topic-1-7', slug: 'complexity-classes', order: 7, title: 'Complexity Classes', content: topic1_7 }
    ],
    quizIds: ['cs403-quiz-1-1', 'cs403-quiz-1-2', 'cs403-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs403-topic-2',
    title: 'Approximation Algorithms',
    content: 'Approximation algorithms for NP-hard problems, vertex cover, set cover, TSP, and PTAS.',
    subtopics: [
      { id: 'cs403-topic-2-1', slug: 'approximation-intro', order: 1, title: 'Introduction to Approximation', content: topic2_1 },
      { id: 'cs403-topic-2-2', slug: 'vertex-cover', order: 2, title: 'Vertex Cover Approximation', content: topic2_2 },
      { id: 'cs403-topic-2-3', slug: 'set-cover', order: 3, title: 'Set Cover Approximation', content: topic2_3 },
      { id: 'cs403-topic-2-4', slug: 'tsp-approximation', order: 4, title: 'TSP Approximation', content: topic2_4 },
      { id: 'cs403-topic-2-5', slug: 'knapsack-approximation', order: 5, title: 'Knapsack Approximation', content: topic2_5 },
      { id: 'cs403-topic-2-6', slug: 'ptas-fptas', order: 6, title: 'PTAS and FPTAS', content: topic2_6 },
      { id: 'cs403-topic-2-7', slug: 'approximation-ratios', order: 7, title: 'Approximation Ratios', content: topic2_7 }
    ],
    quizIds: ['cs403-quiz-2-1', 'cs403-quiz-2-2', 'cs403-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs403-topic-3',
    title: 'Randomized Algorithms',
    content: 'Randomized algorithms, quicksort, min-cut, Monte Carlo, Las Vegas, and probabilistic analysis.',
    subtopics: [
      { id: 'cs403-topic-3-1', slug: 'randomized-intro', order: 1, title: 'Introduction to Randomized Algorithms', content: topic3_1 },
      { id: 'cs403-topic-3-2', slug: 'quicksort-randomized', order: 2, title: 'Randomized Quicksort', content: topic3_2 },
      { id: 'cs403-topic-3-3', slug: 'randomized-min-cut', order: 3, title: 'Randomized Min-Cut', content: topic3_3 },
      { id: 'cs403-topic-3-4', slug: 'monte-carlo', order: 4, title: 'Monte Carlo Algorithms', content: topic3_4 },
      { id: 'cs403-topic-3-5', slug: 'las-vegas', order: 5, title: 'Las Vegas Algorithms', content: topic3_5 },
      { id: 'cs403-topic-3-6', slug: 'probabilistic-analysis', order: 6, title: 'Probabilistic Analysis', content: topic3_6 },
      { id: 'cs403-topic-3-7', slug: 'hashing-algorithms', order: 7, title: 'Randomized Hashing', content: topic3_7 }
    ],
    quizIds: ['cs403-quiz-3-1', 'cs403-quiz-3-2', 'cs403-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs403-topic-4',
    title: 'Online Algorithms',
    content: 'Online algorithms, competitive analysis, paging, k-server problem, and streaming algorithms.',
    subtopics: [
      { id: 'cs403-topic-4-1', slug: 'online-algorithms-intro', order: 1, title: 'Introduction to Online Algorithms', content: topic4_1 },
      { id: 'cs403-topic-4-2', slug: 'competitive-analysis', order: 2, title: 'Competitive Analysis', content: topic4_2 },
      { id: 'cs403-topic-4-3', slug: 'paging-algorithms', order: 3, title: 'Paging Algorithms', content: topic4_3 },
      { id: 'cs403-topic-4-4', slug: 'k-server-problem', order: 4, title: 'K-Server Problem', content: topic4_4 },
      { id: 'cs403-topic-4-5', slug: 'ski-rental', order: 5, title: 'Ski Rental Problem', content: topic4_5 },
      { id: 'cs403-topic-4-6', slug: 'online-matching', order: 6, title: 'Online Matching', content: topic4_6 },
      { id: 'cs403-topic-4-7', slug: 'streaming-algorithms', order: 7, title: 'Streaming Algorithms', content: topic4_7 }
    ],
    quizIds: ['cs403-quiz-4-1', 'cs403-quiz-4-2', 'cs403-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs403-topic-5',
    title: 'Advanced Dynamic Programming',
    content: 'Advanced DP techniques, matrix chain multiplication, optimal BST, edit distance, and DP on trees.',
    subtopics: [
      { id: 'cs403-topic-5-1', slug: 'advanced-dp-techniques', order: 1, title: 'Advanced DP Techniques', content: topic5_1 },
      { id: 'cs403-topic-5-2', slug: 'matrix-chain', order: 2, title: 'Matrix Chain Multiplication', content: topic5_2 },
      { id: 'cs403-topic-5-3', slug: 'optimal-bst', order: 3, title: 'Optimal Binary Search Trees', content: topic5_3 },
      { id: 'cs403-topic-5-4', slug: 'edit-distance', order: 4, title: 'Edit Distance', content: topic5_4 },
      { id: 'cs403-topic-5-5', slug: 'longest-common-subsequence', order: 5, title: 'Longest Common Subsequence', content: topic5_5 },
      { id: 'cs403-topic-5-6', slug: 'dp-on-trees', order: 6, title: 'DP on Trees', content: topic5_6 },
      { id: 'cs403-topic-5-7', slug: 'state-space-reduction', order: 7, title: 'State Space Reduction', content: topic5_7 }
    ],
    quizIds: ['cs403-quiz-5-1', 'cs403-quiz-5-2', 'cs403-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs403-topic-6',
    title: 'Network Flow Algorithms',
    content: 'Flow networks, Ford-Fulkerson, Edmonds-Karp, max-flow min-cut, and bipartite matching.',
    subtopics: [
      { id: 'cs403-topic-6-1', slug: 'flow-networks', order: 1, title: 'Flow Networks', content: topic6_1 },
      { id: 'cs403-topic-6-2', slug: 'ford-fulkerson', order: 2, title: 'Ford-Fulkerson Algorithm', content: topic6_2 },
      { id: 'cs403-topic-6-3', slug: 'edmonds-karp', order: 3, title: 'Edmonds-Karp Algorithm', content: topic6_3 },
      { id: 'cs403-topic-6-4', slug: 'max-flow-min-cut', order: 4, title: 'Max-Flow Min-Cut Theorem', content: topic6_4 },
      { id: 'cs403-topic-6-5', slug: 'bipartite-matching', order: 5, title: 'Bipartite Matching', content: topic6_5 },
      { id: 'cs403-topic-6-6', slug: 'min-cost-flow', order: 6, title: 'Minimum Cost Flow', content: topic6_6 },
      { id: 'cs403-topic-6-7', slug: 'network-flow-applications', order: 7, title: 'Network Flow Applications', content: topic6_7 }
    ],
    quizIds: ['cs403-quiz-6-1', 'cs403-quiz-6-2', 'cs403-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs403-topic-7',
    title: 'Computational Geometry',
    content: 'Geometric primitives, convex hull, line intersection, closest pair, and Voronoi diagrams.',
    subtopics: [
      { id: 'cs403-topic-7-1', slug: 'geometric-primitives', order: 1, title: 'Geometric Primitives', content: topic7_1 },
      { id: 'cs403-topic-7-2', slug: 'convex-hull', order: 2, title: 'Convex Hull Algorithms', content: topic7_2 },
      { id: 'cs403-topic-7-3', slug: 'line-intersection', order: 3, title: 'Line Segment Intersection', content: topic7_3 },
      { id: 'cs403-topic-7-4', slug: 'closest-pair', order: 4, title: 'Closest Pair of Points', content: topic7_4 },
      { id: 'cs403-topic-7-5', slug: 'voronoi-diagrams', order: 5, title: 'Voronoi Diagrams', content: topic7_5 },
      { id: 'cs403-topic-7-6', slug: 'range-searching', order: 6, title: 'Range Searching', content: topic7_6 },
      { id: 'cs403-topic-7-7', slug: 'sweep-line-algorithms', order: 7, title: 'Sweep Line Algorithms', content: topic7_7 }
    ],
    quizIds: ['cs403-quiz-7-1', 'cs403-quiz-7-2', 'cs403-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs403-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
