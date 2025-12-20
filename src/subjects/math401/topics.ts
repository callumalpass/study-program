import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-complex-numbers-intro.md?raw';
import topic1_2 from './content/topic-1/02-complex-plane.md?raw';
import topic1_3 from './content/topic-1/03-polar-form.md?raw';
import topic1_4 from './content/topic-1/04-euler-formula.md?raw';
import topic1_5 from './content/topic-1/05-de-moivre.md?raw';
import topic1_6 from './content/topic-1/06-complex-topology.md?raw';
import topic1_7 from './content/topic-1/07-extended-plane.md?raw';

import topic2_1 from './content/topic-2/01-complex-functions.md?raw';
import topic2_2 from './content/topic-2/02-limits-continuity.md?raw';
import topic2_3 from './content/topic-2/03-complex-derivative.md?raw';
import topic2_4 from './content/topic-2/04-cauchy-riemann.md?raw';
import topic2_5 from './content/topic-2/05-analytic-functions.md?raw';
import topic2_6 from './content/topic-2/06-harmonic-functions.md?raw';
import topic2_7 from './content/topic-2/07-elementary-functions.md?raw';

import topic3_1 from './content/topic-3/01-contour-integrals.md?raw';
import topic3_2 from './content/topic-3/02-path-independence.md?raw';
import topic3_3 from './content/topic-3/03-ml-inequality.md?raw';
import topic3_4 from './content/topic-3/04-antiderivatives.md?raw';
import topic3_5 from './content/topic-3/05-cauchy-goursat.md?raw';
import topic3_6 from './content/topic-3/06-deformation.md?raw';
import topic3_7 from './content/topic-3/07-integral-examples.md?raw';

import topic4_1 from './content/topic-4/01-cauchy-integral-formula.md?raw';
import topic4_2 from './content/topic-4/02-derivatives-formula.md?raw';
import topic4_3 from './content/topic-4/03-morera-theorem.md?raw';
import topic4_4 from './content/topic-4/04-liouville-theorem.md?raw';
import topic4_5 from './content/topic-4/05-fundamental-theorem-algebra.md?raw';
import topic4_6 from './content/topic-4/06-maximum-modulus.md?raw';
import topic4_7 from './content/topic-4/07-applications.md?raw';

import topic5_1 from './content/topic-5/01-convergence.md?raw';
import topic5_2 from './content/topic-5/02-taylor-series.md?raw';
import topic5_3 from './content/topic-5/03-laurent-series.md?raw';
import topic5_4 from './content/topic-5/04-singularities.md?raw';
import topic5_5 from './content/topic-5/05-residues-singularities.md?raw';
import topic5_6 from './content/topic-5/06-zeros-poles.md?raw';
import topic5_7 from './content/topic-5/07-analytic-continuation.md?raw';

import topic6_1 from './content/topic-6/01-residue-theorem.md?raw';
import topic6_2 from './content/topic-6/02-calculating-residues.md?raw';
import topic6_3 from './content/topic-6/03-real-integrals.md?raw';
import topic6_4 from './content/topic-6/04-improper-integrals.md?raw';
import topic6_5 from './content/topic-6/05-trigonometric-integrals.md?raw';
import topic6_6 from './content/topic-6/06-jordans-lemma.md?raw';
import topic6_7 from './content/topic-6/07-applications-residues.md?raw';

import topic7_1 from './content/topic-7/01-conformal-mappings.md?raw';
import topic7_2 from './content/topic-7/02-mobius-transformations.md?raw';
import topic7_3 from './content/topic-7/03-elementary-mappings.md?raw';
import topic7_4 from './content/topic-7/04-schwarz-christoffel.md?raw';
import topic7_5 from './content/topic-7/05-riemann-mapping.md?raw';
import topic7_6 from './content/topic-7/06-applications-physics.md?raw';
import topic7_7 from './content/topic-7/07-boundary-problems.md?raw';

export const math401Topics: Topic[] = [
  {
    id: 'math401-topic-1',
    title: 'Complex Numbers and the Complex Plane',
    content: 'Introduction to complex numbers, arithmetic operations, polar and exponential forms, and topology of the complex plane.',
    subtopics: [
      { id: 'math401-topic-1-1', slug: 'complex-numbers-intro', order: 1, title: 'Introduction to Complex Numbers', content: topic1_1 },
      { id: 'math401-topic-1-2', slug: 'arithmetic-operations', order: 2, title: 'Arithmetic Operations', content: topic1_2 },
      { id: 'math401-topic-1-3', slug: 'polar-form', order: 3, title: 'Polar Form and Modulus-Argument', content: topic1_3 },
      { id: 'math401-topic-1-4', slug: 'exponential-form', order: 4, title: 'Exponential Form and Euler\'s Formula', content: topic1_4 },
      { id: 'math401-topic-1-5', slug: 'roots-unity', order: 5, title: 'Roots of Unity', content: topic1_5 },
      { id: 'math401-topic-1-6', slug: 'complex-topology', order: 6, title: 'Topology of the Complex Plane', content: topic1_6 },
      { id: 'math401-topic-1-7', slug: 'stereographic-projection', order: 7, title: 'Riemann Sphere and Stereographic Projection', content: topic1_7 }
    ],
    quizIds: ['math401-quiz-1-1', 'math401-quiz-1-2', 'math401-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math401-topic-2',
    title: 'Analytic Functions',
    content: 'Complex functions, limits, continuity, complex differentiation, Cauchy-Riemann equations, and harmonic functions.',
    subtopics: [
      { id: 'math401-topic-2-1', slug: 'complex-functions', order: 1, title: 'Complex Functions', content: topic2_1 },
      { id: 'math401-topic-2-2', slug: 'limits-continuity', order: 2, title: 'Limits and Continuity', content: topic2_2 },
      { id: 'math401-topic-2-3', slug: 'complex-derivative', order: 3, title: 'Complex Derivative', content: topic2_3 },
      { id: 'math401-topic-2-4', slug: 'cauchy-riemann', order: 4, title: 'Cauchy-Riemann Equations', content: topic2_4 },
      { id: 'math401-topic-2-5', slug: 'harmonic-functions', order: 5, title: 'Harmonic Functions', content: topic2_5 },
      { id: 'math401-topic-2-6', slug: 'elementary-functions', order: 6, title: 'Elementary Functions', content: topic2_6 },
      { id: 'math401-topic-2-7', slug: 'branches-logs', order: 7, title: 'Branches and Logarithms', content: topic2_7 }
    ],
    quizIds: ['math401-quiz-2-1', 'math401-quiz-2-2', 'math401-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math401-topic-3',
    title: 'Complex Integration',
    content: 'Contour integrals, the fundamental theorem, Cauchy-Goursat theorem, and properties of analytic functions.',
    subtopics: [
      { id: 'math401-topic-3-1', slug: 'complex-paths', order: 1, title: 'Complex Paths and Curves', content: topic3_1 },
      { id: 'math401-topic-3-2', slug: 'contour-integrals', order: 2, title: 'Contour Integrals', content: topic3_2 },
      { id: 'math401-topic-3-3', slug: 'fundamental-theorem', order: 3, title: 'Fundamental Theorem of Contour Integration', content: topic3_3 },
      { id: 'math401-topic-3-4', slug: 'cauchy-goursat', order: 4, title: 'Cauchy-Goursat Theorem', content: topic3_4 },
      { id: 'math401-topic-3-5', slug: 'independence-path', order: 5, title: 'Independence of Path', content: topic3_5 },
      { id: 'math401-topic-3-6', slug: 'antiderivatives', order: 6, title: 'Antiderivatives', content: topic3_6 },
      { id: 'math401-topic-3-7', slug: 'deformation-contours', order: 7, title: 'Deformation of Contours', content: topic3_7 }
    ],
    quizIds: ['math401-quiz-3-1', 'math401-quiz-3-2', 'math401-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math401-topic-4',
    title: 'Cauchy\'s Theorem and Applications',
    content: 'Cauchy\'s integral formula, derivatives, Liouville\'s theorem, and the fundamental theorem of algebra.',
    subtopics: [
      { id: 'math401-topic-4-1', slug: 'cauchy-integral-formula', order: 1, title: 'Cauchy\'s Integral Formula', content: topic4_1 },
      { id: 'math401-topic-4-2', slug: 'derivatives-formula', order: 2, title: 'Derivatives via Integral Formula', content: topic4_2 },
      { id: 'math401-topic-4-3', slug: 'liouville-theorem', order: 3, title: 'Liouville\'s Theorem', content: topic4_3 },
      { id: 'math401-topic-4-4', slug: 'fundamental-algebra', order: 4, title: 'Fundamental Theorem of Algebra', content: topic4_4 },
      { id: 'math401-topic-4-5', slug: 'maximum-principle', order: 5, title: 'Maximum Modulus Principle', content: topic4_5 },
      { id: 'math401-topic-4-6', slug: 'mean-value-property', order: 6, title: 'Mean Value Property', content: topic4_6 },
      { id: 'math401-topic-4-7', slug: 'morera-theorem', order: 7, title: 'Morera\'s Theorem', content: topic4_7 }
    ],
    quizIds: ['math401-quiz-4-1', 'math401-quiz-4-2', 'math401-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math401-topic-5',
    title: 'Power Series and Taylor Series',
    content: 'Power series representations, convergence, Taylor series, analytic continuation, and zeros of analytic functions.',
    subtopics: [
      { id: 'math401-topic-5-1', slug: 'power-series-basics', order: 1, title: 'Power Series Basics', content: topic5_1 },
      { id: 'math401-topic-5-2', slug: 'convergence-radius', order: 2, title: 'Radius of Convergence', content: topic5_2 },
      { id: 'math401-topic-5-3', slug: 'taylor-series', order: 3, title: 'Taylor Series Expansion', content: topic5_3 },
      { id: 'math401-topic-5-4', slug: 'analytic-continuation', order: 4, title: 'Analytic Continuation', content: topic5_4 },
      { id: 'math401-topic-5-5', slug: 'uniqueness-theorem', order: 5, title: 'Uniqueness Theorem', content: topic5_5 },
      { id: 'math401-topic-5-6', slug: 'zeros-analytic', order: 6, title: 'Zeros of Analytic Functions', content: topic5_6 },
      { id: 'math401-topic-5-7', slug: 'identity-theorem', order: 7, title: 'Identity Theorem', content: topic5_7 }
    ],
    quizIds: ['math401-quiz-5-1', 'math401-quiz-5-2', 'math401-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math401-topic-6',
    title: 'Laurent Series and Residue Theory',
    content: 'Laurent series, singularities, residues, residue theorem, and applications to real integration.',
    subtopics: [
      { id: 'math401-topic-6-1', slug: 'laurent-series-intro', order: 1, title: 'Laurent Series Introduction', content: topic6_1 },
      { id: 'math401-topic-6-2', slug: 'singularities', order: 2, title: 'Classification of Singularities', content: topic6_2 },
      { id: 'math401-topic-6-3', slug: 'residue-definition', order: 3, title: 'Residue Definition', content: topic6_3 },
      { id: 'math401-topic-6-4', slug: 'residue-theorem', order: 4, title: 'Residue Theorem', content: topic6_4 },
      { id: 'math401-topic-6-5', slug: 'computing-residues', order: 5, title: 'Computing Residues', content: topic6_5 },
      { id: 'math401-topic-6-6', slug: 'real-integrals', order: 6, title: 'Evaluation of Real Integrals', content: topic6_6 },
      { id: 'math401-topic-6-7', slug: 'argument-principle', order: 7, title: 'Argument Principle and Rouche\'s Theorem', content: topic6_7 }
    ],
    quizIds: ['math401-quiz-6-1', 'math401-quiz-6-2', 'math401-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math401-topic-7',
    title: 'Conformal Mappings',
    content: 'Conformal transformations, linear and Mobius transformations, Riemann mapping theorem, and applications.',
    subtopics: [
      { id: 'math401-topic-7-1', slug: 'conformal-intro', order: 1, title: 'Introduction to Conformal Mappings', content: topic7_1 },
      { id: 'math401-topic-7-2', slug: 'linear-transformations', order: 2, title: 'Linear Transformations', content: topic7_2 },
      { id: 'math401-topic-7-3', slug: 'mobius-transformations', order: 3, title: 'Mobius Transformations', content: topic7_3 },
      { id: 'math401-topic-7-4', slug: 'exponential-mapping', order: 4, title: 'Exponential and Logarithmic Mappings', content: topic7_4 },
      { id: 'math401-topic-7-5', slug: 'riemann-mapping', order: 5, title: 'Riemann Mapping Theorem', content: topic7_5 },
      { id: 'math401-topic-7-6', slug: 'schwarz-christoffel', order: 6, title: 'Schwarz-Christoffel Transformation', content: topic7_6 },
      { id: 'math401-topic-7-7', slug: 'applications-physics', order: 7, title: 'Applications to Physics and Engineering', content: topic7_7 }
    ],
    quizIds: ['math401-quiz-7-1', 'math401-quiz-7-2', 'math401-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math401-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
