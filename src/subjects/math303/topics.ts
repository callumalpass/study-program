import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-real-numbers-intro.md?raw';
import topic1_2 from './content/topic-1/02-completeness-axiom.md?raw';
import topic1_3 from './content/topic-1/03-supremum-infimum.md?raw';
import topic1_4 from './content/topic-1/04-archimedean-property.md?raw';
import topic1_5 from './content/topic-1/05-nested-intervals.md?raw';
import topic1_6 from './content/topic-1/06-countability.md?raw';
import topic1_7 from './content/topic-1/07-open-closed-sets.md?raw';

import topic2_1 from './content/topic-2/01-sequences-definition.md?raw';
import topic2_2 from './content/topic-2/02-convergence-definition.md?raw';
import topic2_3 from './content/topic-2/03-limit-theorems.md?raw';
import topic2_4 from './content/topic-2/04-monotone-sequences.md?raw';
import topic2_5 from './content/topic-2/05-subsequences.md?raw';
import topic2_6 from './content/topic-2/06-cauchy-sequences.md?raw';
import topic2_7 from './content/topic-2/07-limsup-liminf.md?raw';

import topic3_1 from './content/topic-3/01-series-definition.md?raw';
import topic3_2 from './content/topic-3/02-convergence-tests.md?raw';
import topic3_3 from './content/topic-3/03-absolute-convergence.md?raw';
import topic3_4 from './content/topic-3/04-conditional-convergence.md?raw';
import topic3_5 from './content/topic-3/05-rearrangements.md?raw';
import topic3_6 from './content/topic-3/06-double-series.md?raw';
import topic3_7 from './content/topic-3/07-power-series.md?raw';

import topic4_1 from './content/topic-4/01-continuity-definition.md?raw';
import topic4_2 from './content/topic-4/02-epsilon-delta.md?raw';
import topic4_3 from './content/topic-4/03-properties-continuous.md?raw';
import topic4_4 from './content/topic-4/04-uniform-continuity.md?raw';
import topic4_5 from './content/topic-4/05-intermediate-value.md?raw';
import topic4_6 from './content/topic-4/06-extreme-value.md?raw';
import topic4_7 from './content/topic-4/07-discontinuities.md?raw';

import topic5_1 from './content/topic-5/01-derivative-definition.md?raw';
import topic5_2 from './content/topic-5/02-differentiation-rules.md?raw';
import topic5_3 from './content/topic-5/03-mean-value-theorem.md?raw';
import topic5_4 from './content/topic-5/04-lhopitals-rule.md?raw';
import topic5_5 from './content/topic-5/05-taylor-theorem.md?raw';
import topic5_6 from './content/topic-5/06-higher-derivatives.md?raw';
import topic5_7 from './content/topic-5/07-convexity.md?raw';

import topic6_1 from './content/topic-6/01-riemann-integral-def.md?raw';
import topic6_2 from './content/topic-6/02-integrability-criteria.md?raw';
import topic6_3 from './content/topic-6/03-properties-integral.md?raw';
import topic6_4 from './content/topic-6/04-fundamental-theorem.md?raw';
import topic6_5 from './content/topic-6/05-improper-integrals.md?raw';
import topic6_6 from './content/topic-6/06-riemann-stieltjes.md?raw';
import topic6_7 from './content/topic-6/07-lebesgue-preview.md?raw';

import topic7_1 from './content/topic-7/01-pointwise-convergence.md?raw';
import topic7_2 from './content/topic-7/02-uniform-convergence.md?raw';
import topic7_3 from './content/topic-7/03-weierstrass-mtest.md?raw';
import topic7_4 from './content/topic-7/04-continuity-limit.md?raw';
import topic7_5 from './content/topic-7/05-differentiation-integration.md?raw';
import topic7_6 from './content/topic-7/06-power-series-functions.md?raw';
import topic7_7 from './content/topic-7/07-stone-weierstrass.md?raw';

export const math303Topics: Topic[] = [
  {
    id: 'math303-topic-1',
    title: 'The Real Number System',
    content: 'Rigorous construction and properties of the real numbers including completeness, supremum/infimum, and set theory foundations.',
    subtopics: [
      { id: 'math303-topic-1-1', slug: 'real-numbers-intro', order: 1, title: 'Introduction to Real Numbers', content: topic1_1 },
      { id: 'math303-topic-1-2', slug: 'completeness-axiom', order: 2, title: 'The Completeness Axiom', content: topic1_2 },
      { id: 'math303-topic-1-3', slug: 'supremum-infimum', order: 3, title: 'Supremum and Infimum', content: topic1_3 },
      { id: 'math303-topic-1-4', slug: 'archimedean-property', order: 4, title: 'Archimedean Property', content: topic1_4 },
      { id: 'math303-topic-1-5', slug: 'nested-intervals', order: 5, title: 'Nested Intervals Theorem', content: topic1_5 },
      { id: 'math303-topic-1-6', slug: 'countability', order: 6, title: 'Countability and Cardinality', content: topic1_6 },
      { id: 'math303-topic-1-7', slug: 'open-closed-sets', order: 7, title: 'Open and Closed Sets', content: topic1_7 }
    ],
    quizIds: ['math303-quiz-1-1', 'math303-quiz-1-2', 'math303-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math303-topic-2',
    title: 'Sequences and Limits',
    content: 'Rigorous treatment of sequences, convergence, and the fundamental limit theorems using epsilon-delta definitions.',
    subtopics: [
      { id: 'math303-topic-2-1', slug: 'sequences-definition', order: 1, title: 'Sequences in R', content: topic2_1 },
      { id: 'math303-topic-2-2', slug: 'convergence-definition', order: 2, title: 'Convergence Definition', content: topic2_2 },
      { id: 'math303-topic-2-3', slug: 'limit-theorems', order: 3, title: 'Limit Theorems', content: topic2_3 },
      { id: 'math303-topic-2-4', slug: 'monotone-sequences', order: 4, title: 'Monotone Sequences', content: topic2_4 },
      { id: 'math303-topic-2-5', slug: 'subsequences', order: 5, title: 'Subsequences', content: topic2_5 },
      { id: 'math303-topic-2-6', slug: 'cauchy-sequences', order: 6, title: 'Cauchy Sequences', content: topic2_6 },
      { id: 'math303-topic-2-7', slug: 'limsup-liminf', order: 7, title: 'Limsup and Liminf', content: topic2_7 }
    ],
    quizIds: ['math303-quiz-2-1', 'math303-quiz-2-2', 'math303-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math303-topic-3',
    title: 'Series',
    content: 'Infinite series, convergence tests, absolute and conditional convergence, and rearrangement theorems.',
    subtopics: [
      { id: 'math303-topic-3-1', slug: 'series-definition', order: 1, title: 'Infinite Series', content: topic3_1 },
      { id: 'math303-topic-3-2', slug: 'convergence-tests', order: 2, title: 'Convergence Tests', content: topic3_2 },
      { id: 'math303-topic-3-3', slug: 'absolute-convergence', order: 3, title: 'Absolute Convergence', content: topic3_3 },
      { id: 'math303-topic-3-4', slug: 'conditional-convergence', order: 4, title: 'Conditional Convergence', content: topic3_4 },
      { id: 'math303-topic-3-5', slug: 'rearrangements', order: 5, title: 'Rearrangements', content: topic3_5 },
      { id: 'math303-topic-3-6', slug: 'double-series', order: 6, title: 'Double Series', content: topic3_6 },
      { id: 'math303-topic-3-7', slug: 'power-series', order: 7, title: 'Power Series', content: topic3_7 }
    ],
    quizIds: ['math303-quiz-3-1', 'math303-quiz-3-2', 'math303-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math303-topic-4',
    title: 'Continuity',
    content: 'Rigorous treatment of continuity, uniform continuity, and fundamental theorems about continuous functions.',
    subtopics: [
      { id: 'math303-topic-4-1', slug: 'continuity-definition', order: 1, title: 'Definition of Continuity', content: topic4_1 },
      { id: 'math303-topic-4-2', slug: 'epsilon-delta', order: 2, title: 'Epsilon-Delta Proofs', content: topic4_2 },
      { id: 'math303-topic-4-3', slug: 'properties-continuous', order: 3, title: 'Properties of Continuous Functions', content: topic4_3 },
      { id: 'math303-topic-4-4', slug: 'uniform-continuity', order: 4, title: 'Uniform Continuity', content: topic4_4 },
      { id: 'math303-topic-4-5', slug: 'intermediate-value', order: 5, title: 'Intermediate Value Theorem', content: topic4_5 },
      { id: 'math303-topic-4-6', slug: 'extreme-value', order: 6, title: 'Extreme Value Theorem', content: topic4_6 },
      { id: 'math303-topic-4-7', slug: 'discontinuities', order: 7, title: 'Types of Discontinuities', content: topic4_7 }
    ],
    quizIds: ['math303-quiz-4-1', 'math303-quiz-4-2', 'math303-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math303-topic-5',
    title: 'Differentiation',
    content: 'Rigorous treatment of derivatives, the Mean Value Theorem, Taylor\'s theorem, and applications.',
    subtopics: [
      { id: 'math303-topic-5-1', slug: 'derivative-definition', order: 1, title: 'Definition of Derivative', content: topic5_1 },
      { id: 'math303-topic-5-2', slug: 'differentiation-rules', order: 2, title: 'Differentiation Rules', content: topic5_2 },
      { id: 'math303-topic-5-3', slug: 'mean-value-theorem', order: 3, title: 'Mean Value Theorem', content: topic5_3 },
      { id: 'math303-topic-5-4', slug: 'lhopitals-rule', order: 4, title: 'L\'Hopital\'s Rule', content: topic5_4 },
      { id: 'math303-topic-5-5', slug: 'taylor-theorem', order: 5, title: 'Taylor\'s Theorem', content: topic5_5 },
      { id: 'math303-topic-5-6', slug: 'higher-derivatives', order: 6, title: 'Higher Derivatives', content: topic5_6 },
      { id: 'math303-topic-5-7', slug: 'convexity', order: 7, title: 'Convexity', content: topic5_7 }
    ],
    quizIds: ['math303-quiz-5-1', 'math303-quiz-5-2', 'math303-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math303-topic-6',
    title: 'Riemann Integration',
    content: 'Construction of the Riemann integral, integrability criteria, and the Fundamental Theorem of Calculus.',
    subtopics: [
      { id: 'math303-topic-6-1', slug: 'riemann-integral-def', order: 1, title: 'Riemann Integral Definition', content: topic6_1 },
      { id: 'math303-topic-6-2', slug: 'integrability-criteria', order: 2, title: 'Integrability Criteria', content: topic6_2 },
      { id: 'math303-topic-6-3', slug: 'properties-integral', order: 3, title: 'Properties of the Integral', content: topic6_3 },
      { id: 'math303-topic-6-4', slug: 'fundamental-theorem', order: 4, title: 'Fundamental Theorem of Calculus', content: topic6_4 },
      { id: 'math303-topic-6-5', slug: 'improper-integrals', order: 5, title: 'Improper Integrals', content: topic6_5 },
      { id: 'math303-topic-6-6', slug: 'riemann-stieltjes', order: 6, title: 'Riemann-Stieltjes Integral', content: topic6_6 },
      { id: 'math303-topic-6-7', slug: 'lebesgue-preview', order: 7, title: 'Preview of Lebesgue Integration', content: topic6_7 }
    ],
    quizIds: ['math303-quiz-6-1', 'math303-quiz-6-2', 'math303-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math303-topic-7',
    title: 'Sequences and Series of Functions',
    content: 'Pointwise and uniform convergence, interchange of limits, and the Stone-Weierstrass theorem.',
    subtopics: [
      { id: 'math303-topic-7-1', slug: 'pointwise-convergence', order: 1, title: 'Pointwise Convergence', content: topic7_1 },
      { id: 'math303-topic-7-2', slug: 'uniform-convergence', order: 2, title: 'Uniform Convergence', content: topic7_2 },
      { id: 'math303-topic-7-3', slug: 'weierstrass-mtest', order: 3, title: 'Weierstrass M-Test', content: topic7_3 },
      { id: 'math303-topic-7-4', slug: 'continuity-limit', order: 4, title: 'Continuity of Limit Functions', content: topic7_4 },
      { id: 'math303-topic-7-5', slug: 'differentiation-integration', order: 5, title: 'Differentiation and Integration', content: topic7_5 },
      { id: 'math303-topic-7-6', slug: 'power-series-functions', order: 6, title: 'Power Series as Functions', content: topic7_6 },
      { id: 'math303-topic-7-7', slug: 'stone-weierstrass', order: 7, title: 'Stone-Weierstrass Theorem', content: topic7_7 }
    ],
    quizIds: ['math303-quiz-7-1', 'math303-quiz-7-2', 'math303-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math303-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
