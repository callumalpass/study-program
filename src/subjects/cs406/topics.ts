/**
 * CS406 Topics
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
    title: 'AI Fundamentals',
  },
  {
    number: 1,
    title: 'Introduction to AI',
  },
  {
    number: 1,
    title: 'Uninformed Search',
  },
  {
    number: 1,
    title: 'Game Theory',
  },
  {
    number: 1,
    title: 'CSP Introduction',
  },
  {
    number: 1,
    title: 'Planning Introduction',
  },
  {
    number: 1,
    title: 'Logic Introduction',
  },
  {
    number: 1,
    title: 'Probability Basics',
  },
  {
    number: 2,
    title: 'Intelligent Agents',
  },
  {
    number: 2,
    title: 'Search Algorithms',
  },
  {
    number: 2,
    title: 'Informed Search and A*',
  },
  {
    number: 2,
    title: 'Minimax Algorithm',
  },
  {
    number: 2,
    title: 'Backtracking Search',
  },
  {
    number: 2,
    title: 'STRIPS Planning',
  },
  {
    number: 2,
    title: 'Propositional Logic',
  },
  {
    number: 2,
    title: 'Bayesian Networks',
  },
  {
    number: 3,
    title: 'Task Environments',
  },
  {
    number: 3,
    title: 'Heuristic Design',
  },
  {
    number: 3,
    title: 'Adversarial Search',
  },
  {
    number: 3,
    title: 'Alpha-Beta Pruning',
  },
  {
    number: 3,
    title: 'Constraint Propagation',
  },
  {
    number: 3,
    title: 'Planning Search',
  },
  {
    number: 3,
    title: 'First-Order Logic',
  },
  {
    number: 3,
    title: 'Exact Inference',
  },
  {
    number: 4,
    title: 'Agent Architectures',
  },
  {
    number: 4,
    title: 'Local Search',
  },
  {
    number: 4,
    title: 'Evaluation Functions',
  },
  {
    number: 4,
    title: 'Constraint Satisfaction Problems',
  },
  {
    number: 4,
    title: 'Variable Ordering',
  },
  {
    number: 4,
    title: 'Planning Heuristics',
  },
  {
    number: 4,
    title: 'Logical Inference',
  },
  {
    number: 4,
    title: 'Approximate Inference',
  },
  {
    number: 5,
    title: 'Problem Solving',
  },
  {
    number: 5,
    title: 'Beam Search',
  },
  {
    number: 5,
    title: 'Monte Carlo Tree Search',
  },
  {
    number: 5,
    title: 'Value Ordering',
  },
  {
    number: 5,
    title: 'Planning',
  },
  {
    number: 5,
    title: 'Hierarchical Planning',
  },
  {
    number: 5,
    title: 'Resolution',
  },
  {
    number: 5,
    title: 'Hidden Markov Models',
  },
  {
    number: 6,
    title: 'AI Ethics',
  },
  {
    number: 6,
    title: 'Search Complexity',
  },
  {
    number: 6,
    title: 'Game Playing History',
  },
  {
    number: 6,
    title: 'Local Search for CSP',
  },
  {
    number: 6,
    title: 'Planning Graphs',
  },
  {
    number: 6,
    title: 'Knowledge Representation',
  },
  {
    number: 6,
    title: 'Semantic Networks',
  },
  {
    number: 6,
    title: 'Kalman Filters',
  },
  {
    number: 7,
    title: 'AI Applications',
    quizIds: ['cs406-quiz-1-1', 'cs406-quiz-1-2', 'cs406-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Search Applications',
    quizIds: ['cs406-quiz-2-1', 'cs406-quiz-2-2', 'cs406-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Imperfect Information Games',
    quizIds: ['cs406-quiz-3-1', 'cs406-quiz-3-2', 'cs406-quiz-3-3'],
  },
  {
    number: 7,
    title: 'CSP Applications',
    quizIds: ['cs406-quiz-4-1', 'cs406-quiz-4-2', 'cs406-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Planning Applications',
    quizIds: ['cs406-quiz-5-1', 'cs406-quiz-5-2', 'cs406-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Ontologies',
    quizIds: ['cs406-quiz-6-1', 'cs406-quiz-6-2', 'cs406-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Probabilistic Reasoning',
  },
  {
    number: 7,
    title: 'Probabilistic Applications',
    quizIds: ['cs406-quiz-7-1', 'cs406-quiz-7-2', 'cs406-quiz-7-3'],
  },
];

export const cs406Topics: Topic[] = buildTopicsFromGlob('cs406', content, topicConfigs);
