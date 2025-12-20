/**
 * CS403 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'NP-Completeness Review',
  },
  {
    number: 1,
    title: 'NP-Completeness Review',
  },
  {
    number: 1,
    title: 'Introduction to Approximation',
  },
  {
    number: 1,
    title: 'Introduction to Randomized Algorithms',
  },
  {
    number: 1,
    title: 'Introduction to Online Algorithms',
  },
  {
    number: 1,
    title: 'Advanced DP Techniques',
  },
  {
    number: 1,
    title: 'Flow Networks',
  },
  {
    number: 1,
    title: 'Geometric Primitives',
  },
  {
    number: 2,
    title: 'Reduction Techniques',
  },
  {
    number: 2,
    title: 'Approximation Algorithms',
  },
  {
    number: 2,
    title: 'Vertex Cover Approximation',
  },
  {
    number: 2,
    title: 'Randomized Quicksort',
  },
  {
    number: 2,
    title: 'Competitive Analysis',
  },
  {
    number: 2,
    title: 'Matrix Chain Multiplication',
  },
  {
    number: 2,
    title: 'Ford-Fulkerson Algorithm',
  },
  {
    number: 2,
    title: 'Convex Hull Algorithms',
  },
  {
    number: 3,
    title: 'NP-Hard Problems',
  },
  {
    number: 3,
    title: 'Set Cover Approximation',
  },
  {
    number: 3,
    title: 'Randomized Algorithms',
  },
  {
    number: 3,
    title: 'Randomized Min-Cut',
  },
  {
    number: 3,
    title: 'Paging Algorithms',
  },
  {
    number: 3,
    title: 'Optimal Binary Search Trees',
  },
  {
    number: 3,
    title: 'Edmonds-Karp Algorithm',
  },
  {
    number: 3,
    title: 'Line Segment Intersection',
  },
  {
    number: 4,
    title: 'SAT Problem',
  },
  {
    number: 4,
    title: 'TSP Approximation',
  },
  {
    number: 4,
    title: 'Monte Carlo Algorithms',
  },
  {
    number: 4,
    title: 'Online Algorithms',
  },
  {
    number: 4,
    title: 'K-Server Problem',
  },
  {
    number: 4,
    title: 'Edit Distance',
  },
  {
    number: 4,
    title: 'Max-Flow Min-Cut Theorem',
  },
  {
    number: 4,
    title: 'Closest Pair of Points',
  },
  {
    number: 5,
    title: 'Traveling Salesman Problem',
  },
  {
    number: 5,
    title: 'Knapsack Approximation',
  },
  {
    number: 5,
    title: 'Las Vegas Algorithms',
  },
  {
    number: 5,
    title: 'Ski Rental Problem',
  },
  {
    number: 5,
    title: 'Advanced Dynamic Programming',
  },
  {
    number: 5,
    title: 'Longest Common Subsequence',
  },
  {
    number: 5,
    title: 'Bipartite Matching',
  },
  {
    number: 5,
    title: 'Voronoi Diagrams',
  },
  {
    number: 6,
    title: 'Graph Coloring',
  },
  {
    number: 6,
    title: 'PTAS and FPTAS',
  },
  {
    number: 6,
    title: 'Probabilistic Analysis',
  },
  {
    number: 6,
    title: 'Online Matching',
  },
  {
    number: 6,
    title: 'DP on Trees',
  },
  {
    number: 6,
    title: 'Network Flow Algorithms',
  },
  {
    number: 6,
    title: 'Minimum Cost Flow',
  },
  {
    number: 6,
    title: 'Range Searching',
  },
  {
    number: 7,
    title: 'Complexity Classes',
    quizIds: ['cs403-quiz-1-1', 'cs403-quiz-1-2', 'cs403-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Approximation Ratios',
    quizIds: ['cs403-quiz-2-1', 'cs403-quiz-2-2', 'cs403-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Randomized Hashing',
    quizIds: ['cs403-quiz-3-1', 'cs403-quiz-3-2', 'cs403-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Streaming Algorithms',
    quizIds: ['cs403-quiz-4-1', 'cs403-quiz-4-2', 'cs403-quiz-4-3'],
  },
  {
    number: 7,
    title: 'State Space Reduction',
    quizIds: ['cs403-quiz-5-1', 'cs403-quiz-5-2', 'cs403-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Network Flow Applications',
    quizIds: ['cs403-quiz-6-1', 'cs403-quiz-6-2', 'cs403-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Computational Geometry',
  },
  {
    number: 7,
    title: 'Sweep Line Algorithms',
    quizIds: ['cs403-quiz-7-1', 'cs403-quiz-7-2', 'cs403-quiz-7-3'],
  },
];

export const cs403Topics: Topic[] = buildTopicsFromGlob('cs403', content, topicConfigs);
