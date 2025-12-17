import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/math302/topic-1/01-ode-introduction.md?raw';
import topic1_2 from '../../../content/subjects/math302/topic-1/02-separable-equations.md?raw';
import topic1_3 from '../../../content/subjects/math302/topic-1/03-linear-first-order.md?raw';
import topic1_4 from '../../../content/subjects/math302/topic-1/04-exact-equations.md?raw';
import topic1_5 from '../../../content/subjects/math302/topic-1/05-substitution-methods.md?raw';
import topic1_6 from '../../../content/subjects/math302/topic-1/06-existence-uniqueness.md?raw';
import topic1_7 from '../../../content/subjects/math302/topic-1/07-autonomous-equations.md?raw';

import topic2_1 from '../../../content/subjects/math302/topic-2/01-second-order-intro.md?raw';
import topic2_2 from '../../../content/subjects/math302/topic-2/02-homogeneous-constant.md?raw';
import topic2_3 from '../../../content/subjects/math302/topic-2/03-characteristic-equation.md?raw';
import topic2_4 from '../../../content/subjects/math302/topic-2/04-reduction-of-order.md?raw';
import topic2_5 from '../../../content/subjects/math302/topic-2/05-undetermined-coefficients.md?raw';
import topic2_6 from '../../../content/subjects/math302/topic-2/06-variation-of-parameters.md?raw';
import topic2_7 from '../../../content/subjects/math302/topic-2/07-mechanical-vibrations.md?raw';

import topic3_1 from '../../../content/subjects/math302/topic-3/01-higher-order-intro.md?raw';
import topic3_2 from '../../../content/subjects/math302/topic-3/02-homogeneous-higher.md?raw';
import topic3_3 from '../../../content/subjects/math302/topic-3/03-nonhomogeneous-higher.md?raw';
import topic3_4 from '../../../content/subjects/math302/topic-3/04-operator-methods.md?raw';
import topic3_5 from '../../../content/subjects/math302/topic-3/05-cauchy-euler.md?raw';
import topic3_6 from '../../../content/subjects/math302/topic-3/06-initial-boundary-value.md?raw';
import topic3_7 from '../../../content/subjects/math302/topic-3/07-theory-linear-odes.md?raw';

import topic4_1 from '../../../content/subjects/math302/topic-4/01-systems-introduction.md?raw';
import topic4_2 from '../../../content/subjects/math302/topic-4/02-matrix-methods.md?raw';
import topic4_3 from '../../../content/subjects/math302/topic-4/03-eigenvalue-method.md?raw';
import topic4_4 from '../../../content/subjects/math302/topic-4/04-complex-eigenvalues.md?raw';
import topic4_5 from '../../../content/subjects/math302/topic-4/05-repeated-eigenvalues.md?raw';
import topic4_6 from '../../../content/subjects/math302/topic-4/06-phase-portraits.md?raw';
import topic4_7 from '../../../content/subjects/math302/topic-4/07-nonhomogeneous-systems.md?raw';

import topic5_1 from '../../../content/subjects/math302/topic-5/01-laplace-definition.md?raw';
import topic5_2 from '../../../content/subjects/math302/topic-5/02-laplace-properties.md?raw';
import topic5_3 from '../../../content/subjects/math302/topic-5/03-inverse-laplace.md?raw';
import topic5_4 from '../../../content/subjects/math302/topic-5/04-solving-ivps.md?raw';
import topic5_5 from '../../../content/subjects/math302/topic-5/05-step-functions.md?raw';
import topic5_6 from '../../../content/subjects/math302/topic-5/06-convolution.md?raw';
import topic5_7 from '../../../content/subjects/math302/topic-5/07-delta-functions.md?raw';

import topic6_1 from '../../../content/subjects/math302/topic-6/01-series-solutions-intro.md?raw';
import topic6_2 from '../../../content/subjects/math302/topic-6/02-power-series-review.md?raw';
import topic6_3 from '../../../content/subjects/math302/topic-6/03-ordinary-points.md?raw';
import topic6_4 from '../../../content/subjects/math302/topic-6/04-regular-singular.md?raw';
import topic6_5 from '../../../content/subjects/math302/topic-6/05-frobenius-method.md?raw';
import topic6_6 from '../../../content/subjects/math302/topic-6/06-bessel-functions.md?raw';
import topic6_7 from '../../../content/subjects/math302/topic-6/07-legendre-equations.md?raw';

import topic7_1 from '../../../content/subjects/math302/topic-7/01-population-models.md?raw';
import topic7_2 from '../../../content/subjects/math302/topic-7/02-electrical-circuits.md?raw';
import topic7_3 from '../../../content/subjects/math302/topic-7/03-mechanical-systems.md?raw';
import topic7_4 from '../../../content/subjects/math302/topic-7/04-mixing-problems.md?raw';
import topic7_5 from '../../../content/subjects/math302/topic-7/05-numerical-methods.md?raw';
import topic7_6 from '../../../content/subjects/math302/topic-7/06-stability-analysis.md?raw';
import topic7_7 from '../../../content/subjects/math302/topic-7/07-bifurcations.md?raw';

export const math302Topics: Topic[] = [
  {
    id: 'math302-topic-1',
    title: 'First-Order Differential Equations',
    content: 'Introduction to ordinary differential equations and solution techniques for first-order equations including separable, linear, and exact equations.',
    subtopics: [
      { id: 'math302-topic-1-1', slug: 'ode-introduction', order: 1, title: 'Introduction to ODEs', content: topic1_1 },
      { id: 'math302-topic-1-2', slug: 'separable-equations', order: 2, title: 'Separable Equations', content: topic1_2 },
      { id: 'math302-topic-1-3', slug: 'linear-first-order', order: 3, title: 'Linear First-Order Equations', content: topic1_3 },
      { id: 'math302-topic-1-4', slug: 'exact-equations', order: 4, title: 'Exact Equations', content: topic1_4 },
      { id: 'math302-topic-1-5', slug: 'substitution-methods', order: 5, title: 'Substitution Methods', content: topic1_5 },
      { id: 'math302-topic-1-6', slug: 'existence-uniqueness', order: 6, title: 'Existence and Uniqueness', content: topic1_6 },
      { id: 'math302-topic-1-7', slug: 'autonomous-equations', order: 7, title: 'Autonomous Equations', content: topic1_7 }
    ],
    quizIds: ['math302-quiz-1-1', 'math302-quiz-1-2', 'math302-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math302-topic-2',
    title: 'Second-Order Linear Equations',
    content: 'Analysis and solution of second-order linear differential equations with constant coefficients, including homogeneous and nonhomogeneous cases.',
    subtopics: [
      { id: 'math302-topic-2-1', slug: 'second-order-intro', order: 1, title: 'Introduction to Second-Order', content: topic2_1 },
      { id: 'math302-topic-2-2', slug: 'homogeneous-constant', order: 2, title: 'Homogeneous with Constant Coefficients', content: topic2_2 },
      { id: 'math302-topic-2-3', slug: 'characteristic-equation', order: 3, title: 'The Characteristic Equation', content: topic2_3 },
      { id: 'math302-topic-2-4', slug: 'reduction-of-order', order: 4, title: 'Reduction of Order', content: topic2_4 },
      { id: 'math302-topic-2-5', slug: 'undetermined-coefficients', order: 5, title: 'Undetermined Coefficients', content: topic2_5 },
      { id: 'math302-topic-2-6', slug: 'variation-of-parameters', order: 6, title: 'Variation of Parameters', content: topic2_6 },
      { id: 'math302-topic-2-7', slug: 'mechanical-vibrations', order: 7, title: 'Mechanical Vibrations', content: topic2_7 }
    ],
    quizIds: ['math302-quiz-2-1', 'math302-quiz-2-2', 'math302-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math302-topic-3',
    title: 'Higher-Order Linear Equations',
    content: 'Extension to higher-order linear differential equations, operator methods, and Cauchy-Euler equations.',
    subtopics: [
      { id: 'math302-topic-3-1', slug: 'higher-order-intro', order: 1, title: 'Higher-Order Introduction', content: topic3_1 },
      { id: 'math302-topic-3-2', slug: 'homogeneous-higher', order: 2, title: 'Homogeneous Higher-Order', content: topic3_2 },
      { id: 'math302-topic-3-3', slug: 'nonhomogeneous-higher', order: 3, title: 'Nonhomogeneous Higher-Order', content: topic3_3 },
      { id: 'math302-topic-3-4', slug: 'operator-methods', order: 4, title: 'Operator Methods', content: topic3_4 },
      { id: 'math302-topic-3-5', slug: 'cauchy-euler', order: 5, title: 'Cauchy-Euler Equations', content: topic3_5 },
      { id: 'math302-topic-3-6', slug: 'initial-boundary-value', order: 6, title: 'Initial and Boundary Value Problems', content: topic3_6 },
      { id: 'math302-topic-3-7', slug: 'theory-linear-odes', order: 7, title: 'Theory of Linear ODEs', content: topic3_7 }
    ],
    quizIds: ['math302-quiz-3-1', 'math302-quiz-3-2', 'math302-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math302-topic-4',
    title: 'Systems of Differential Equations',
    content: 'Matrix methods for solving systems of linear differential equations using eigenvalues and eigenvectors.',
    subtopics: [
      { id: 'math302-topic-4-1', slug: 'systems-introduction', order: 1, title: 'Introduction to Systems', content: topic4_1 },
      { id: 'math302-topic-4-2', slug: 'matrix-methods', order: 2, title: 'Matrix Methods', content: topic4_2 },
      { id: 'math302-topic-4-3', slug: 'eigenvalue-method', order: 3, title: 'The Eigenvalue Method', content: topic4_3 },
      { id: 'math302-topic-4-4', slug: 'complex-eigenvalues', order: 4, title: 'Complex Eigenvalues', content: topic4_4 },
      { id: 'math302-topic-4-5', slug: 'repeated-eigenvalues', order: 5, title: 'Repeated Eigenvalues', content: topic4_5 },
      { id: 'math302-topic-4-6', slug: 'phase-portraits', order: 6, title: 'Phase Portraits', content: topic4_6 },
      { id: 'math302-topic-4-7', slug: 'nonhomogeneous-systems', order: 7, title: 'Nonhomogeneous Systems', content: topic4_7 }
    ],
    quizIds: ['math302-quiz-4-1', 'math302-quiz-4-2', 'math302-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math302-topic-5',
    title: 'Laplace Transforms',
    content: 'The Laplace transform method for solving initial value problems, including discontinuous and impulsive forcing functions.',
    subtopics: [
      { id: 'math302-topic-5-1', slug: 'laplace-definition', order: 1, title: 'Definition of Laplace Transform', content: topic5_1 },
      { id: 'math302-topic-5-2', slug: 'laplace-properties', order: 2, title: 'Properties of Laplace Transform', content: topic5_2 },
      { id: 'math302-topic-5-3', slug: 'inverse-laplace', order: 3, title: 'Inverse Laplace Transform', content: topic5_3 },
      { id: 'math302-topic-5-4', slug: 'solving-ivps', order: 4, title: 'Solving IVPs with Laplace', content: topic5_4 },
      { id: 'math302-topic-5-5', slug: 'step-functions', order: 5, title: 'Step Functions', content: topic5_5 },
      { id: 'math302-topic-5-6', slug: 'convolution', order: 6, title: 'Convolution', content: topic5_6 },
      { id: 'math302-topic-5-7', slug: 'delta-functions', order: 7, title: 'Delta Functions', content: topic5_7 }
    ],
    quizIds: ['math302-quiz-5-1', 'math302-quiz-5-2', 'math302-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math302-topic-6',
    title: 'Series Solutions',
    content: 'Power series methods for solving differential equations near ordinary and singular points.',
    subtopics: [
      { id: 'math302-topic-6-1', slug: 'series-solutions-intro', order: 1, title: 'Introduction to Series Solutions', content: topic6_1 },
      { id: 'math302-topic-6-2', slug: 'power-series-review', order: 2, title: 'Power Series Review', content: topic6_2 },
      { id: 'math302-topic-6-3', slug: 'ordinary-points', order: 3, title: 'Solutions near Ordinary Points', content: topic6_3 },
      { id: 'math302-topic-6-4', slug: 'regular-singular', order: 4, title: 'Regular Singular Points', content: topic6_4 },
      { id: 'math302-topic-6-5', slug: 'frobenius-method', order: 5, title: 'Frobenius Method', content: topic6_5 },
      { id: 'math302-topic-6-6', slug: 'bessel-functions', order: 6, title: 'Bessel Functions', content: topic6_6 },
      { id: 'math302-topic-6-7', slug: 'legendre-equations', order: 7, title: 'Legendre Equations', content: topic6_7 }
    ],
    quizIds: ['math302-quiz-6-1', 'math302-quiz-6-2', 'math302-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math302-topic-7',
    title: 'Applications and Modeling',
    content: 'Real-world applications of differential equations including population dynamics, circuits, mechanical systems, and numerical methods.',
    subtopics: [
      { id: 'math302-topic-7-1', slug: 'population-models', order: 1, title: 'Population Models', content: topic7_1 },
      { id: 'math302-topic-7-2', slug: 'electrical-circuits', order: 2, title: 'Electrical Circuits', content: topic7_2 },
      { id: 'math302-topic-7-3', slug: 'mechanical-systems', order: 3, title: 'Mechanical Systems', content: topic7_3 },
      { id: 'math302-topic-7-4', slug: 'mixing-problems', order: 4, title: 'Mixing Problems', content: topic7_4 },
      { id: 'math302-topic-7-5', slug: 'numerical-methods', order: 5, title: 'Numerical Methods', content: topic7_5 },
      { id: 'math302-topic-7-6', slug: 'stability-analysis', order: 6, title: 'Stability Analysis', content: topic7_6 },
      { id: 'math302-topic-7-7', slug: 'bifurcations', order: 7, title: 'Bifurcations', content: topic7_7 }
    ],
    quizIds: ['math302-quiz-7-1', 'math302-quiz-7-2', 'math302-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math302-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
