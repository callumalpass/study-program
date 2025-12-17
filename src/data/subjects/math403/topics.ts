import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/math403/topic-1/01-topology-definition.md?raw';
import topic1_2 from '../../../content/subjects/math403/topic-1/02-examples.md?raw';
import topic1_3 from '../../../content/subjects/math403/topic-1/03-open-closed.md?raw';
import topic1_4 from '../../../content/subjects/math403/topic-1/04-interior-closure.md?raw';
import topic1_5 from '../../../content/subjects/math403/topic-1/05-boundary.md?raw';
import topic1_6 from '../../../content/subjects/math403/topic-1/06-limit-points.md?raw';
import topic1_7 from '../../../content/subjects/math403/topic-1/07-subspace-topology.md?raw';

import topic2_1 from '../../../content/subjects/math403/topic-2/01-basis-definition.md?raw';
import topic2_2 from '../../../content/subjects/math403/topic-2/02-basis-theorem.md?raw';
import topic2_3 from '../../../content/subjects/math403/topic-2/03-subbasis.md?raw';
import topic2_4 from '../../../content/subjects/math403/topic-2/04-product-topology.md?raw';
import topic2_5 from '../../../content/subjects/math403/topic-2/05-box-topology.md?raw';
import topic2_6 from '../../../content/subjects/math403/topic-2/06-order-topology.md?raw';
import topic2_7 from '../../../content/subjects/math403/topic-2/07-generating-topologies.md?raw';

import topic3_1 from '../../../content/subjects/math403/topic-3/01-continuous-maps.md?raw';
import topic3_2 from '../../../content/subjects/math403/topic-3/02-homeomorphisms.md?raw';
import topic3_3 from '../../../content/subjects/math403/topic-3/03-topological-properties.md?raw';
import topic3_4 from '../../../content/subjects/math403/topic-3/04-embedding.md?raw';
import topic3_5 from '../../../content/subjects/math403/topic-3/05-quotient-maps.md?raw';
import topic3_6 from '../../../content/subjects/math403/topic-3/06-open-closed-maps.md?raw';
import topic3_7 from '../../../content/subjects/math403/topic-3/07-continuous-examples.md?raw';

import topic4_1 from '../../../content/subjects/math403/topic-4/01-connected-spaces.md?raw';
import topic4_2 from '../../../content/subjects/math403/topic-4/02-connected-subsets.md?raw';
import topic4_3 from '../../../content/subjects/math403/topic-4/03-path-connectedness.md?raw';
import topic4_4 from '../../../content/subjects/math403/topic-4/04-components.md?raw';
import topic4_5 from '../../../content/subjects/math403/topic-4/05-local-connectedness.md?raw';
import topic4_6 from '../../../content/subjects/math403/topic-4/06-totally-disconnected.md?raw';
import topic4_7 from '../../../content/subjects/math403/topic-4/07-connectedness-applications.md?raw';

import topic5_1 from '../../../content/subjects/math403/topic-5/01-compactness-intro.md?raw';
import topic5_2 from '../../../content/subjects/math403/topic-5/02-open-covers.md?raw';
import topic5_3 from '../../../content/subjects/math403/topic-5/03-heine-borel.md?raw';
import topic5_4 from '../../../content/subjects/math403/topic-5/04-sequential-compact.md?raw';
import topic5_5 from '../../../content/subjects/math403/topic-5/05-tychonoff-theorem.md?raw';
import topic5_6 from '../../../content/subjects/math403/topic-5/06-local-compactness.md?raw';
import topic5_7 from '../../../content/subjects/math403/topic-5/07-one-point-compactification.md?raw';

import topic6_1 from '../../../content/subjects/math403/topic-6/01-metric-spaces-intro.md?raw';
import topic6_2 from '../../../content/subjects/math403/topic-6/02-metric-topology.md?raw';
import topic6_3 from '../../../content/subjects/math403/topic-6/03-convergence-sequences.md?raw';
import topic6_4 from '../../../content/subjects/math403/topic-6/04-completeness.md?raw';
import topic6_5 from '../../../content/subjects/math403/topic-6/05-contraction-mapping.md?raw';
import topic6_6 from '../../../content/subjects/math403/topic-6/06-baire-category.md?raw';
import topic6_7 from '../../../content/subjects/math403/topic-6/07-metrization.md?raw';

import topic7_1 from '../../../content/subjects/math403/topic-7/01-topology-applications.md?raw';
import topic7_2 from '../../../content/subjects/math403/topic-7/02-fixed-points.md?raw';
import topic7_3 from '../../../content/subjects/math403/topic-7/03-differential-topology.md?raw';
import topic7_4 from '../../../content/subjects/math403/topic-7/04-knot-theory.md?raw';
import topic7_5 from '../../../content/subjects/math403/topic-7/05-algebraic-topology-intro.md?raw';
import topic7_6 from '../../../content/subjects/math403/topic-7/06-fundamental-group.md?raw';
import topic7_7 from '../../../content/subjects/math403/topic-7/07-covering-spaces.md?raw';

export const math403Topics: Topic[] = [
  {
    id: 'math403-topic-1',
    title: 'Topological Spaces',
    content: 'Introduction to topology, open and closed sets, neighborhoods, interior, closure, and limit points.',
    subtopics: [
      { id: 'math403-topic-1-1', slug: 'topology-intro', order: 1, title: 'Introduction to Topology', content: topic1_1 },
      { id: 'math403-topic-1-2', slug: 'open-sets', order: 2, title: 'Open Sets', content: topic1_2 },
      { id: 'math403-topic-1-3', slug: 'closed-sets', order: 3, title: 'Closed Sets', content: topic1_3 },
      { id: 'math403-topic-1-4', slug: 'neighborhoods', order: 4, title: 'Neighborhoods', content: topic1_4 },
      { id: 'math403-topic-1-5', slug: 'interior-closure', order: 5, title: 'Interior and Closure', content: topic1_5 },
      { id: 'math403-topic-1-6', slug: 'limit-points', order: 6, title: 'Limit Points', content: topic1_6 },
      { id: 'math403-topic-1-7', slug: 'boundary-points', order: 7, title: 'Boundary Points', content: topic1_7 }
    ],
    quizIds: ['math403-quiz-1-1', 'math403-quiz-1-2', 'math403-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math403-topic-2',
    title: 'Bases and Subbases',
    content: 'Bases for topologies, generated topologies, subbases, second countable spaces, and subspace topology.',
    subtopics: [
      { id: 'math403-topic-2-1', slug: 'basis-definition', order: 1, title: 'Basis for a Topology', content: topic2_1 },
      { id: 'math403-topic-2-2', slug: 'generated-topology', order: 2, title: 'Topology Generated by a Basis', content: topic2_2 },
      { id: 'math403-topic-2-3', slug: 'subbases', order: 3, title: 'Subbases', content: topic2_3 },
      { id: 'math403-topic-2-4', slug: 'second-countable', order: 4, title: 'Second Countable Spaces', content: topic2_4 },
      { id: 'math403-topic-2-5', slug: 'dense-subsets', order: 5, title: 'Dense Subsets', content: topic2_5 },
      { id: 'math403-topic-2-6', slug: 'separable-spaces', order: 6, title: 'Separable Spaces', content: topic2_6 },
      { id: 'math403-topic-2-7', slug: 'subspace-topology', order: 7, title: 'Subspace Topology', content: topic2_7 }
    ],
    quizIds: ['math403-quiz-2-1', 'math403-quiz-2-2', 'math403-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math403-topic-3',
    title: 'Continuity and Homeomorphisms',
    content: 'Continuous functions, open and closed maps, homeomorphisms, topological properties, and product topology.',
    subtopics: [
      { id: 'math403-topic-3-1', slug: 'continuous-functions', order: 1, title: 'Continuous Functions', content: topic3_1 },
      { id: 'math403-topic-3-2', slug: 'open-maps', order: 2, title: 'Open Maps', content: topic3_2 },
      { id: 'math403-topic-3-3', slug: 'closed-maps', order: 3, title: 'Closed Maps', content: topic3_3 },
      { id: 'math403-topic-3-4', slug: 'homeomorphisms', order: 4, title: 'Homeomorphisms', content: topic3_4 },
      { id: 'math403-topic-3-5', slug: 'topological-properties', order: 5, title: 'Topological Properties', content: topic3_5 },
      { id: 'math403-topic-3-6', slug: 'product-topology', order: 6, title: 'Product Topology', content: topic3_6 },
      { id: 'math403-topic-3-7', slug: 'quotient-topology', order: 7, title: 'Quotient Topology', content: topic3_7 }
    ],
    quizIds: ['math403-quiz-3-1', 'math403-quiz-3-2', 'math403-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math403-topic-4',
    title: 'Connectedness',
    content: 'Connected spaces, components, path connectedness, locally connected spaces, and applications.',
    subtopics: [
      { id: 'math403-topic-4-1', slug: 'connectedness-intro', order: 1, title: 'Introduction to Connectedness', content: topic4_1 },
      { id: 'math403-topic-4-2', slug: 'connected-sets', order: 2, title: 'Connected Sets', content: topic4_2 },
      { id: 'math403-topic-4-3', slug: 'components', order: 3, title: 'Connected Components', content: topic4_3 },
      { id: 'math403-topic-4-4', slug: 'path-connectedness', order: 4, title: 'Path Connectedness', content: topic4_4 },
      { id: 'math403-topic-4-5', slug: 'locally-connected', order: 5, title: 'Locally Connected Spaces', content: topic4_5 },
      { id: 'math403-topic-4-6', slug: 'intermediate-value', order: 6, title: 'Intermediate Value Theorem', content: topic4_6 },
      { id: 'math403-topic-4-7', slug: 'totally-disconnected', order: 7, title: 'Totally Disconnected Spaces', content: topic4_7 }
    ],
    quizIds: ['math403-quiz-4-1', 'math403-quiz-4-2', 'math403-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math403-topic-5',
    title: 'Compactness',
    content: 'Compact spaces, open covers, Heine-Borel theorem, sequential compactness, and Tychonoff theorem.',
    subtopics: [
      { id: 'math403-topic-5-1', slug: 'compactness-intro', order: 1, title: 'Introduction to Compactness', content: topic5_1 },
      { id: 'math403-topic-5-2', slug: 'open-covers', order: 2, title: 'Open Covers and Subcovers', content: topic5_2 },
      { id: 'math403-topic-5-3', slug: 'heine-borel', order: 3, title: 'Heine-Borel Theorem', content: topic5_3 },
      { id: 'math403-topic-5-4', slug: 'sequential-compact', order: 4, title: 'Sequential Compactness', content: topic5_4 },
      { id: 'math403-topic-5-5', slug: 'tychonoff-theorem', order: 5, title: 'Tychonoff Theorem', content: topic5_5 },
      { id: 'math403-topic-5-6', slug: 'local-compactness', order: 6, title: 'Local Compactness', content: topic5_6 },
      { id: 'math403-topic-5-7', slug: 'one-point-compactification', order: 7, title: 'One-Point Compactification', content: topic5_7 }
    ],
    quizIds: ['math403-quiz-5-1', 'math403-quiz-5-2', 'math403-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math403-topic-6',
    title: 'Metric Spaces',
    content: 'Metric spaces, metric topology, convergence, completeness, contraction mapping, and metrization.',
    subtopics: [
      { id: 'math403-topic-6-1', slug: 'metric-spaces-intro', order: 1, title: 'Introduction to Metric Spaces', content: topic6_1 },
      { id: 'math403-topic-6-2', slug: 'metric-topology', order: 2, title: 'Metric Topology', content: topic6_2 },
      { id: 'math403-topic-6-3', slug: 'convergence-sequences', order: 3, title: 'Convergence of Sequences', content: topic6_3 },
      { id: 'math403-topic-6-4', slug: 'completeness', order: 4, title: 'Completeness', content: topic6_4 },
      { id: 'math403-topic-6-5', slug: 'contraction-mapping', order: 5, title: 'Contraction Mapping Theorem', content: topic6_5 },
      { id: 'math403-topic-6-6', slug: 'baire-category', order: 6, title: 'Baire Category Theorem', content: topic6_6 },
      { id: 'math403-topic-6-7', slug: 'metrization', order: 7, title: 'Metrization Theorems', content: topic6_7 }
    ],
    quizIds: ['math403-quiz-6-1', 'math403-quiz-6-2', 'math403-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math403-topic-7',
    title: 'Applications and Advanced Topics',
    content: 'Applications of topology, fixed point theorems, differential topology, and introduction to algebraic topology.',
    subtopics: [
      { id: 'math403-topic-7-1', slug: 'topology-applications', order: 1, title: 'Applications of Topology', content: topic7_1 },
      { id: 'math403-topic-7-2', slug: 'fixed-points', order: 2, title: 'Fixed Point Theorems', content: topic7_2 },
      { id: 'math403-topic-7-3', slug: 'differential-topology', order: 3, title: 'Introduction to Differential Topology', content: topic7_3 },
      { id: 'math403-topic-7-4', slug: 'knot-theory', order: 4, title: 'Knot Theory Basics', content: topic7_4 },
      { id: 'math403-topic-7-5', slug: 'algebraic-topology-intro', order: 5, title: 'Introduction to Algebraic Topology', content: topic7_5 },
      { id: 'math403-topic-7-6', slug: 'fundamental-group', order: 6, title: 'The Fundamental Group', content: topic7_6 },
      { id: 'math403-topic-7-7', slug: 'covering-spaces', order: 7, title: 'Covering Spaces', content: topic7_7 }
    ],
    quizIds: ['math403-quiz-7-1', 'math403-quiz-7-2', 'math403-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math403-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
