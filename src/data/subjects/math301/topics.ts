import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/math301/topic-1/01-vectors-introduction.md?raw';
import topic1_2 from '../../../content/subjects/math301/topic-1/02-vector-operations.md?raw';
import topic1_3 from '../../../content/subjects/math301/topic-1/03-dot-product.md?raw';
import topic1_4 from '../../../content/subjects/math301/topic-1/04-cross-product.md?raw';
import topic1_5 from '../../../content/subjects/math301/topic-1/05-lines-planes.md?raw';
import topic1_6 from '../../../content/subjects/math301/topic-1/06-vector-valued-functions.md?raw';
import topic1_7 from '../../../content/subjects/math301/topic-1/07-arc-length-curvature.md?raw';

import topic2_1 from '../../../content/subjects/math301/topic-2/01-functions-several-variables.md?raw';
import topic2_2 from '../../../content/subjects/math301/topic-2/02-limits-continuity.md?raw';
import topic2_3 from '../../../content/subjects/math301/topic-2/03-partial-derivatives-intro.md?raw';
import topic2_4 from '../../../content/subjects/math301/topic-2/04-higher-order-partials.md?raw';
import topic2_5 from '../../../content/subjects/math301/topic-2/05-chain-rule.md?raw';
import topic2_6 from '../../../content/subjects/math301/topic-2/06-implicit-differentiation.md?raw';
import topic2_7 from '../../../content/subjects/math301/topic-2/07-differentiability.md?raw';

import topic3_1 from '../../../content/subjects/math301/topic-3/01-gradient-vector.md?raw';
import topic3_2 from '../../../content/subjects/math301/topic-3/02-directional-derivatives.md?raw';
import topic3_3 from '../../../content/subjects/math301/topic-3/03-tangent-planes.md?raw';
import topic3_4 from '../../../content/subjects/math301/topic-3/04-linear-approximation.md?raw';
import topic3_5 from '../../../content/subjects/math301/topic-3/05-level-curves-surfaces.md?raw';
import topic3_6 from '../../../content/subjects/math301/topic-3/06-normal-vectors.md?raw';
import topic3_7 from '../../../content/subjects/math301/topic-3/07-applications-gradient.md?raw';

import topic4_1 from '../../../content/subjects/math301/topic-4/01-local-extrema.md?raw';
import topic4_2 from '../../../content/subjects/math301/topic-4/02-second-derivative-test.md?raw';
import topic4_3 from '../../../content/subjects/math301/topic-4/03-absolute-extrema.md?raw';
import topic4_4 from '../../../content/subjects/math301/topic-4/04-lagrange-multipliers.md?raw';
import topic4_5 from '../../../content/subjects/math301/topic-4/05-constrained-optimization.md?raw';
import topic4_6 from '../../../content/subjects/math301/topic-4/06-multiple-constraints.md?raw';
import topic4_7 from '../../../content/subjects/math301/topic-4/07-optimization-applications.md?raw';

import topic5_1 from '../../../content/subjects/math301/topic-5/01-double-integrals-rectangles.md?raw';
import topic5_2 from '../../../content/subjects/math301/topic-5/02-iterated-integrals.md?raw';
import topic5_3 from '../../../content/subjects/math301/topic-5/03-double-integrals-general.md?raw';
import topic5_4 from '../../../content/subjects/math301/topic-5/04-polar-coordinates.md?raw';
import topic5_5 from '../../../content/subjects/math301/topic-5/05-triple-integrals.md?raw';
import topic5_6 from '../../../content/subjects/math301/topic-5/06-cylindrical-spherical.md?raw';
import topic5_7 from '../../../content/subjects/math301/topic-5/07-change-of-variables.md?raw';

import topic6_1 from '../../../content/subjects/math301/topic-6/01-line-integrals-scalar.md?raw';
import topic6_2 from '../../../content/subjects/math301/topic-6/02-line-integrals-vector.md?raw';
import topic6_3 from '../../../content/subjects/math301/topic-6/03-fundamental-theorem-line.md?raw';
import topic6_4 from '../../../content/subjects/math301/topic-6/04-conservative-fields.md?raw';
import topic6_5 from '../../../content/subjects/math301/topic-6/05-parametric-surfaces.md?raw';
import topic6_6 from '../../../content/subjects/math301/topic-6/06-surface-integrals.md?raw';
import topic6_7 from '../../../content/subjects/math301/topic-6/07-flux-integrals.md?raw';

import topic7_1 from '../../../content/subjects/math301/topic-7/01-curl-divergence.md?raw';
import topic7_2 from '../../../content/subjects/math301/topic-7/02-greens-theorem.md?raw';
import topic7_3 from '../../../content/subjects/math301/topic-7/03-stokes-theorem.md?raw';
import topic7_4 from '../../../content/subjects/math301/topic-7/04-divergence-theorem.md?raw';
import topic7_5 from '../../../content/subjects/math301/topic-7/05-applications-physics.md?raw';
import topic7_6 from '../../../content/subjects/math301/topic-7/06-differential-forms.md?raw';
import topic7_7 from '../../../content/subjects/math301/topic-7/07-generalizations.md?raw';

export const math301Topics: Topic[] = [
  {
    id: 'math301-topic-1',
    title: 'Vectors and Vector-Valued Functions',
    content: 'Fundamentals of vectors in 2D and 3D space, vector operations, and functions that produce vectors as outputs.',
    subtopics: [
      { id: 'math301-topic-1-1', slug: 'vectors-introduction', order: 1, title: 'Introduction to Vectors', content: topic1_1 },
      { id: 'math301-topic-1-2', slug: 'vector-operations', order: 2, title: 'Vector Operations', content: topic1_2 },
      { id: 'math301-topic-1-3', slug: 'dot-product', order: 3, title: 'The Dot Product', content: topic1_3 },
      { id: 'math301-topic-1-4', slug: 'cross-product', order: 4, title: 'The Cross Product', content: topic1_4 },
      { id: 'math301-topic-1-5', slug: 'lines-planes', order: 5, title: 'Lines and Planes', content: topic1_5 },
      { id: 'math301-topic-1-6', slug: 'vector-valued-functions', order: 6, title: 'Vector-Valued Functions', content: topic1_6 },
      { id: 'math301-topic-1-7', slug: 'arc-length-curvature', order: 7, title: 'Arc Length and Curvature', content: topic1_7 }
    ],
    quizIds: ['math301-quiz-1-1', 'math301-quiz-1-2', 'math301-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math301-topic-2',
    title: 'Partial Derivatives',
    content: 'Differentiation of functions of multiple variables, including partial derivatives, the chain rule, and differentiability.',
    subtopics: [
      { id: 'math301-topic-2-1', slug: 'functions-several-variables', order: 1, title: 'Functions of Several Variables', content: topic2_1 },
      { id: 'math301-topic-2-2', slug: 'limits-continuity', order: 2, title: 'Limits and Continuity', content: topic2_2 },
      { id: 'math301-topic-2-3', slug: 'partial-derivatives-intro', order: 3, title: 'Partial Derivatives', content: topic2_3 },
      { id: 'math301-topic-2-4', slug: 'higher-order-partials', order: 4, title: 'Higher-Order Partial Derivatives', content: topic2_4 },
      { id: 'math301-topic-2-5', slug: 'chain-rule', order: 5, title: 'The Chain Rule', content: topic2_5 },
      { id: 'math301-topic-2-6', slug: 'implicit-differentiation', order: 6, title: 'Implicit Differentiation', content: topic2_6 },
      { id: 'math301-topic-2-7', slug: 'differentiability', order: 7, title: 'Differentiability', content: topic2_7 }
    ],
    quizIds: ['math301-quiz-2-1', 'math301-quiz-2-2', 'math301-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math301-topic-3',
    title: 'Gradient, Directional Derivatives, and Tangent Planes',
    content: 'The gradient vector and its applications including directional derivatives, tangent planes, and linear approximations.',
    subtopics: [
      { id: 'math301-topic-3-1', slug: 'gradient-vector', order: 1, title: 'The Gradient Vector', content: topic3_1 },
      { id: 'math301-topic-3-2', slug: 'directional-derivatives', order: 2, title: 'Directional Derivatives', content: topic3_2 },
      { id: 'math301-topic-3-3', slug: 'tangent-planes', order: 3, title: 'Tangent Planes', content: topic3_3 },
      { id: 'math301-topic-3-4', slug: 'linear-approximation', order: 4, title: 'Linear Approximation', content: topic3_4 },
      { id: 'math301-topic-3-5', slug: 'level-curves-surfaces', order: 5, title: 'Level Curves and Surfaces', content: topic3_5 },
      { id: 'math301-topic-3-6', slug: 'normal-vectors', order: 6, title: 'Normal Vectors', content: topic3_6 },
      { id: 'math301-topic-3-7', slug: 'applications-gradient', order: 7, title: 'Applications of the Gradient', content: topic3_7 }
    ],
    quizIds: ['math301-quiz-3-1', 'math301-quiz-3-2', 'math301-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math301-topic-4',
    title: 'Optimization and Lagrange Multipliers',
    content: 'Finding extrema of multivariable functions using critical points, the second derivative test, and Lagrange multipliers for constrained optimization.',
    subtopics: [
      { id: 'math301-topic-4-1', slug: 'local-extrema', order: 1, title: 'Local Extrema', content: topic4_1 },
      { id: 'math301-topic-4-2', slug: 'second-derivative-test', order: 2, title: 'Second Derivative Test', content: topic4_2 },
      { id: 'math301-topic-4-3', slug: 'absolute-extrema', order: 3, title: 'Absolute Extrema', content: topic4_3 },
      { id: 'math301-topic-4-4', slug: 'lagrange-multipliers', order: 4, title: 'Lagrange Multipliers', content: topic4_4 },
      { id: 'math301-topic-4-5', slug: 'constrained-optimization', order: 5, title: 'Constrained Optimization', content: topic4_5 },
      { id: 'math301-topic-4-6', slug: 'multiple-constraints', order: 6, title: 'Multiple Constraints', content: topic4_6 },
      { id: 'math301-topic-4-7', slug: 'optimization-applications', order: 7, title: 'Optimization Applications', content: topic4_7 }
    ],
    quizIds: ['math301-quiz-4-1', 'math301-quiz-4-2', 'math301-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math301-topic-5',
    title: 'Multiple Integrals',
    content: 'Double and triple integrals over various regions, including coordinate transformations to polar, cylindrical, and spherical coordinates.',
    subtopics: [
      { id: 'math301-topic-5-1', slug: 'double-integrals-rectangles', order: 1, title: 'Double Integrals over Rectangles', content: topic5_1 },
      { id: 'math301-topic-5-2', slug: 'iterated-integrals', order: 2, title: 'Iterated Integrals', content: topic5_2 },
      { id: 'math301-topic-5-3', slug: 'double-integrals-general', order: 3, title: 'Double Integrals over General Regions', content: topic5_3 },
      { id: 'math301-topic-5-4', slug: 'polar-coordinates', order: 4, title: 'Double Integrals in Polar Coordinates', content: topic5_4 },
      { id: 'math301-topic-5-5', slug: 'triple-integrals', order: 5, title: 'Triple Integrals', content: topic5_5 },
      { id: 'math301-topic-5-6', slug: 'cylindrical-spherical', order: 6, title: 'Cylindrical and Spherical Coordinates', content: topic5_6 },
      { id: 'math301-topic-5-7', slug: 'change-of-variables', order: 7, title: 'Change of Variables', content: topic5_7 }
    ],
    quizIds: ['math301-quiz-5-1', 'math301-quiz-5-2', 'math301-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math301-topic-6',
    title: 'Line Integrals and Surface Integrals',
    content: 'Integration along curves and over surfaces, including scalar and vector line integrals, conservative fields, and flux integrals.',
    subtopics: [
      { id: 'math301-topic-6-1', slug: 'line-integrals-scalar', order: 1, title: 'Line Integrals of Scalar Functions', content: topic6_1 },
      { id: 'math301-topic-6-2', slug: 'line-integrals-vector', order: 2, title: 'Line Integrals of Vector Fields', content: topic6_2 },
      { id: 'math301-topic-6-3', slug: 'fundamental-theorem-line', order: 3, title: 'Fundamental Theorem for Line Integrals', content: topic6_3 },
      { id: 'math301-topic-6-4', slug: 'conservative-fields', order: 4, title: 'Conservative Vector Fields', content: topic6_4 },
      { id: 'math301-topic-6-5', slug: 'parametric-surfaces', order: 5, title: 'Parametric Surfaces', content: topic6_5 },
      { id: 'math301-topic-6-6', slug: 'surface-integrals', order: 6, title: 'Surface Integrals', content: topic6_6 },
      { id: 'math301-topic-6-7', slug: 'flux-integrals', order: 7, title: 'Flux Integrals', content: topic6_7 }
    ],
    quizIds: ['math301-quiz-6-1', 'math301-quiz-6-2', 'math301-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math301-topic-7',
    title: 'Vector Calculus Theorems',
    content: 'The fundamental theorems of vector calculus: Green\'s Theorem, Stokes\' Theorem, and the Divergence Theorem.',
    subtopics: [
      { id: 'math301-topic-7-1', slug: 'curl-divergence', order: 1, title: 'Curl and Divergence', content: topic7_1 },
      { id: 'math301-topic-7-2', slug: 'greens-theorem', order: 2, title: 'Green\'s Theorem', content: topic7_2 },
      { id: 'math301-topic-7-3', slug: 'stokes-theorem', order: 3, title: 'Stokes\' Theorem', content: topic7_3 },
      { id: 'math301-topic-7-4', slug: 'divergence-theorem', order: 4, title: 'The Divergence Theorem', content: topic7_4 },
      { id: 'math301-topic-7-5', slug: 'applications-physics', order: 5, title: 'Applications in Physics', content: topic7_5 },
      { id: 'math301-topic-7-6', slug: 'differential-forms', order: 6, title: 'Introduction to Differential Forms', content: topic7_6 },
      { id: 'math301-topic-7-7', slug: 'generalizations', order: 7, title: 'Generalizations and Connections', content: topic7_7 }
    ],
    quizIds: ['math301-quiz-7-1', 'math301-quiz-7-2', 'math301-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math301-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
