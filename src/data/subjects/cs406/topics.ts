import type { Topic } from '../../../core/types';

// Import all topic markdown files
import topic1_1 from '../../../content/subjects/cs406/topic-1/01-ai-introduction.md?raw';
import topic1_2 from '../../../content/subjects/cs406/topic-1/02-intelligent-agents.md?raw';
import topic1_3 from '../../../content/subjects/cs406/topic-1/03-environments.md?raw';
import topic1_4 from '../../../content/subjects/cs406/topic-1/04-agent-architectures.md?raw';
import topic1_5 from '../../../content/subjects/cs406/topic-1/05-problem-solving.md?raw';
import topic1_6 from '../../../content/subjects/cs406/topic-1/06-ai-ethics.md?raw';
import topic1_7 from '../../../content/subjects/cs406/topic-1/07-ai-applications.md?raw';

import topic2_1 from '../../../content/subjects/cs406/topic-2/01-uninformed-search.md?raw';
import topic2_2 from '../../../content/subjects/cs406/topic-2/02-informed-search.md?raw';
import topic2_3 from '../../../content/subjects/cs406/topic-2/03-heuristic-design.md?raw';
import topic2_4 from '../../../content/subjects/cs406/topic-2/04-local-search.md?raw';
import topic2_5 from '../../../content/subjects/cs406/topic-2/05-beam-search.md?raw';
import topic2_6 from '../../../content/subjects/cs406/topic-2/06-search-complexity.md?raw';
import topic2_7 from '../../../content/subjects/cs406/topic-2/07-search-applications.md?raw';

import topic3_1 from '../../../content/subjects/cs406/topic-3/01-game-theory-intro.md?raw';
import topic3_2 from '../../../content/subjects/cs406/topic-3/02-minimax.md?raw';
import topic3_3 from '../../../content/subjects/cs406/topic-3/03-alpha-beta.md?raw';
import topic3_4 from '../../../content/subjects/cs406/topic-3/04-evaluation-functions.md?raw';
import topic3_5 from '../../../content/subjects/cs406/topic-3/05-mcts.md?raw';
import topic3_6 from '../../../content/subjects/cs406/topic-3/06-game-playing-history.md?raw';
import topic3_7 from '../../../content/subjects/cs406/topic-3/07-imperfect-information.md?raw';

import topic4_1 from '../../../content/subjects/cs406/topic-4/01-csp-introduction.md?raw';
import topic4_2 from '../../../content/subjects/cs406/topic-4/02-backtracking-search.md?raw';
import topic4_3 from '../../../content/subjects/cs406/topic-4/03-constraint-propagation.md?raw';
import topic4_4 from '../../../content/subjects/cs406/topic-4/04-variable-ordering.md?raw';
import topic4_5 from '../../../content/subjects/cs406/topic-4/05-value-ordering.md?raw';
import topic4_6 from '../../../content/subjects/cs406/topic-4/06-local-search-csp.md?raw';
import topic4_7 from '../../../content/subjects/cs406/topic-4/07-csp-applications.md?raw';

import topic5_1 from '../../../content/subjects/cs406/topic-5/01-planning-introduction.md?raw';
import topic5_2 from '../../../content/subjects/cs406/topic-5/02-strips-planning.md?raw';
import topic5_3 from '../../../content/subjects/cs406/topic-5/03-forward-backward-search.md?raw';
import topic5_4 from '../../../content/subjects/cs406/topic-5/04-heuristics-planning.md?raw';
import topic5_5 from '../../../content/subjects/cs406/topic-5/05-hierarchical-planning.md?raw';
import topic5_6 from '../../../content/subjects/cs406/topic-5/06-planning-graphs.md?raw';
import topic5_7 from '../../../content/subjects/cs406/topic-5/07-planning-applications.md?raw';

import topic6_1 from '../../../content/subjects/cs406/topic-6/01-logic-introduction.md?raw';
import topic6_2 from '../../../content/subjects/cs406/topic-6/02-propositional-logic.md?raw';
import topic6_3 from '../../../content/subjects/cs406/topic-6/03-first-order-logic.md?raw';
import topic6_4 from '../../../content/subjects/cs406/topic-6/04-inference.md?raw';
import topic6_5 from '../../../content/subjects/cs406/topic-6/05-resolution.md?raw';
import topic6_6 from '../../../content/subjects/cs406/topic-6/06-semantic-networks.md?raw';
import topic6_7 from '../../../content/subjects/cs406/topic-6/07-ontologies.md?raw';

import topic7_1 from '../../../content/subjects/cs406/topic-7/01-probability-basics.md?raw';
import topic7_2 from '../../../content/subjects/cs406/topic-7/02-bayesian-networks.md?raw';
import topic7_3 from '../../../content/subjects/cs406/topic-7/03-exact-inference.md?raw';
import topic7_4 from '../../../content/subjects/cs406/topic-7/04-approximate-inference.md?raw';
import topic7_5 from '../../../content/subjects/cs406/topic-7/05-hidden-markov-models.md?raw';
import topic7_6 from '../../../content/subjects/cs406/topic-7/06-kalman-filters.md?raw';
import topic7_7 from '../../../content/subjects/cs406/topic-7/07-probabilistic-applications.md?raw';

export const cs406Topics: Topic[] = [
  {
    id: 'cs406-topic-1',
    title: 'AI Fundamentals',
    content: 'Introduction to AI, intelligent agents, task environments, agent architectures, problem solving, ethics, and applications.',
    subtopics: [
      { id: 'cs406-topic-1-1', slug: 'ai-introduction', order: 1, title: 'Introduction to AI', content: topic1_1 },
      { id: 'cs406-topic-1-2', slug: 'intelligent-agents', order: 2, title: 'Intelligent Agents', content: topic1_2 },
      { id: 'cs406-topic-1-3', slug: 'environments', order: 3, title: 'Task Environments', content: topic1_3 },
      { id: 'cs406-topic-1-4', slug: 'agent-architectures', order: 4, title: 'Agent Architectures', content: topic1_4 },
      { id: 'cs406-topic-1-5', slug: 'problem-solving', order: 5, title: 'Problem Solving', content: topic1_5 },
      { id: 'cs406-topic-1-6', slug: 'ai-ethics', order: 6, title: 'AI Ethics', content: topic1_6 },
      { id: 'cs406-topic-1-7', slug: 'ai-applications', order: 7, title: 'AI Applications', content: topic1_7 }
    ],
    quizIds: ['cs406-quiz-1-1', 'cs406-quiz-1-2', 'cs406-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs406-topic-2',
    title: 'Search Algorithms',
    content: 'Uninformed and informed search strategies, heuristics, local search, and complexity analysis.',
    subtopics: [
      { id: 'cs406-topic-2-1', slug: 'uninformed-search', order: 1, title: 'Uninformed Search', content: topic2_1 },
      { id: 'cs406-topic-2-2', slug: 'informed-search', order: 2, title: 'Informed Search and A*', content: topic2_2 },
      { id: 'cs406-topic-2-3', slug: 'heuristic-design', order: 3, title: 'Heuristic Design', content: topic2_3 },
      { id: 'cs406-topic-2-4', slug: 'local-search', order: 4, title: 'Local Search', content: topic2_4 },
      { id: 'cs406-topic-2-5', slug: 'beam-search', order: 5, title: 'Beam Search', content: topic2_5 },
      { id: 'cs406-topic-2-6', slug: 'search-complexity', order: 6, title: 'Search Complexity', content: topic2_6 },
      { id: 'cs406-topic-2-7', slug: 'search-applications', order: 7, title: 'Search Applications', content: topic2_7 }
    ],
    quizIds: ['cs406-quiz-2-1', 'cs406-quiz-2-2', 'cs406-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs406-topic-3',
    title: 'Adversarial Search',
    content: 'Game theory, minimax, alpha-beta pruning, evaluation functions, MCTS, and game playing.',
    subtopics: [
      { id: 'cs406-topic-3-1', slug: 'game-theory-intro', order: 1, title: 'Game Theory', content: topic3_1 },
      { id: 'cs406-topic-3-2', slug: 'minimax', order: 2, title: 'Minimax Algorithm', content: topic3_2 },
      { id: 'cs406-topic-3-3', slug: 'alpha-beta', order: 3, title: 'Alpha-Beta Pruning', content: topic3_3 },
      { id: 'cs406-topic-3-4', slug: 'evaluation-functions', order: 4, title: 'Evaluation Functions', content: topic3_4 },
      { id: 'cs406-topic-3-5', slug: 'mcts', order: 5, title: 'Monte Carlo Tree Search', content: topic3_5 },
      { id: 'cs406-topic-3-6', slug: 'game-playing-history', order: 6, title: 'Game Playing History', content: topic3_6 },
      { id: 'cs406-topic-3-7', slug: 'imperfect-information', order: 7, title: 'Imperfect Information Games', content: topic3_7 }
    ],
    quizIds: ['cs406-quiz-3-1', 'cs406-quiz-3-2', 'cs406-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs406-topic-4',
    title: 'Constraint Satisfaction Problems',
    content: 'CSP formulation, backtracking, constraint propagation, arc consistency, and applications.',
    subtopics: [
      { id: 'cs406-topic-4-1', slug: 'csp-introduction', order: 1, title: 'CSP Introduction', content: topic4_1 },
      { id: 'cs406-topic-4-2', slug: 'backtracking-search', order: 2, title: 'Backtracking Search', content: topic4_2 },
      { id: 'cs406-topic-4-3', slug: 'constraint-propagation', order: 3, title: 'Constraint Propagation', content: topic4_3 },
      { id: 'cs406-topic-4-4', slug: 'variable-ordering', order: 4, title: 'Variable Ordering', content: topic4_4 },
      { id: 'cs406-topic-4-5', slug: 'value-ordering', order: 5, title: 'Value Ordering', content: topic4_5 },
      { id: 'cs406-topic-4-6', slug: 'local-search-csp', order: 6, title: 'Local Search for CSP', content: topic4_6 },
      { id: 'cs406-topic-4-7', slug: 'csp-applications', order: 7, title: 'CSP Applications', content: topic4_7 }
    ],
    quizIds: ['cs406-quiz-4-1', 'cs406-quiz-4-2', 'cs406-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs406-topic-5',
    title: 'Planning',
    content: 'Classical planning, STRIPS, planning graphs, hierarchical planning, and heuristics.',
    subtopics: [
      { id: 'cs406-topic-5-1', slug: 'planning-introduction', order: 1, title: 'Planning Introduction', content: topic5_1 },
      { id: 'cs406-topic-5-2', slug: 'strips-planning', order: 2, title: 'STRIPS Planning', content: topic5_2 },
      { id: 'cs406-topic-5-3', slug: 'forward-backward-search', order: 3, title: 'Planning Search', content: topic5_3 },
      { id: 'cs406-topic-5-4', slug: 'heuristics-planning', order: 4, title: 'Planning Heuristics', content: topic5_4 },
      { id: 'cs406-topic-5-5', slug: 'hierarchical-planning', order: 5, title: 'Hierarchical Planning', content: topic5_5 },
      { id: 'cs406-topic-5-6', slug: 'planning-graphs', order: 6, title: 'Planning Graphs', content: topic5_6 },
      { id: 'cs406-topic-5-7', slug: 'planning-applications', order: 7, title: 'Planning Applications', content: topic5_7 }
    ],
    quizIds: ['cs406-quiz-5-1', 'cs406-quiz-5-2', 'cs406-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs406-topic-6',
    title: 'Knowledge Representation',
    content: 'Logic, propositional and first-order logic, inference, resolution, semantic networks, ontologies.',
    subtopics: [
      { id: 'cs406-topic-6-1', slug: 'logic-introduction', order: 1, title: 'Logic Introduction', content: topic6_1 },
      { id: 'cs406-topic-6-2', slug: 'propositional-logic', order: 2, title: 'Propositional Logic', content: topic6_2 },
      { id: 'cs406-topic-6-3', slug: 'first-order-logic', order: 3, title: 'First-Order Logic', content: topic6_3 },
      { id: 'cs406-topic-6-4', slug: 'inference', order: 4, title: 'Logical Inference', content: topic6_4 },
      { id: 'cs406-topic-6-5', slug: 'resolution', order: 5, title: 'Resolution', content: topic6_5 },
      { id: 'cs406-topic-6-6', slug: 'semantic-networks', order: 6, title: 'Semantic Networks', content: topic6_6 },
      { id: 'cs406-topic-6-7', slug: 'ontologies', order: 7, title: 'Ontologies', content: topic6_7 }
    ],
    quizIds: ['cs406-quiz-6-1', 'cs406-quiz-6-2', 'cs406-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs406-topic-7',
    title: 'Probabilistic Reasoning',
    content: 'Probability theory, Bayesian networks, inference, HMMs, Kalman filters, and applications.',
    subtopics: [
      { id: 'cs406-topic-7-1', slug: 'probability-basics', order: 1, title: 'Probability Basics', content: topic7_1 },
      { id: 'cs406-topic-7-2', slug: 'bayesian-networks', order: 2, title: 'Bayesian Networks', content: topic7_2 },
      { id: 'cs406-topic-7-3', slug: 'exact-inference', order: 3, title: 'Exact Inference', content: topic7_3 },
      { id: 'cs406-topic-7-4', slug: 'approximate-inference', order: 4, title: 'Approximate Inference', content: topic7_4 },
      { id: 'cs406-topic-7-5', slug: 'hidden-markov-models', order: 5, title: 'Hidden Markov Models', content: topic7_5 },
      { id: 'cs406-topic-7-6', slug: 'kalman-filters', order: 6, title: 'Kalman Filters', content: topic7_6 },
      { id: 'cs406-topic-7-7', slug: 'probabilistic-applications', order: 7, title: 'Probabilistic Applications', content: topic7_7 }
    ],
    quizIds: ['cs406-quiz-7-1', 'cs406-quiz-7-2', 'cs406-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs406-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
