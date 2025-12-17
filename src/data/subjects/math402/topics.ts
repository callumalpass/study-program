import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/math402/topic-1/01-floating-point.md?raw';
import topic1_2 from '../../../content/subjects/math402/topic-1/02-rounding-errors.md?raw';
import topic1_3 from '../../../content/subjects/math402/topic-1/03-truncation-errors.md?raw';
import topic1_4 from '../../../content/subjects/math402/topic-1/04-error-propagation.md?raw';
import topic1_5 from '../../../content/subjects/math402/topic-1/05-stability.md?raw';
import topic1_6 from '../../../content/subjects/math402/topic-1/06-conditioning.md?raw';
import topic1_7 from '../../../content/subjects/math402/topic-1/07-error-bounds.md?raw';

import topic2_1 from '../../../content/subjects/math402/topic-2/01-bisection.md?raw';
import topic2_2 from '../../../content/subjects/math402/topic-2/02-newton-method.md?raw';
import topic2_3 from '../../../content/subjects/math402/topic-2/03-secant-method.md?raw';
import topic2_4 from '../../../content/subjects/math402/topic-2/04-fixed-point.md?raw';
import topic2_5 from '../../../content/subjects/math402/topic-2/05-convergence-rates.md?raw';
import topic2_6 from '../../../content/subjects/math402/topic-2/06-multiple-roots.md?raw';
import topic2_7 from '../../../content/subjects/math402/topic-2/07-polynomial-roots.md?raw';

import topic3_1 from '../../../content/subjects/math402/topic-3/01-lagrange.md?raw';
import topic3_2 from '../../../content/subjects/math402/topic-3/02-newton-interpolation.md?raw';
import topic3_3 from '../../../content/subjects/math402/topic-3/03-hermite.md?raw';
import topic3_4 from '../../../content/subjects/math402/topic-3/04-splines.md?raw';
import topic3_5 from '../../../content/subjects/math402/topic-3/05-chebyshev.md?raw';
import topic3_6 from '../../../content/subjects/math402/topic-3/06-least-squares.md?raw';
import topic3_7 from '../../../content/subjects/math402/topic-3/07-trigonometric.md?raw';

import topic4_1 from '../../../content/subjects/math402/topic-4/01-finite-differences.md?raw';
import topic4_2 from '../../../content/subjects/math402/topic-4/02-richardson.md?raw';
import topic4_3 from '../../../content/subjects/math402/topic-4/03-newton-cotes.md?raw';
import topic4_4 from '../../../content/subjects/math402/topic-4/04-gaussian-quadrature.md?raw';
import topic4_5 from '../../../content/subjects/math402/topic-4/05-adaptive-integration.md?raw';
import topic4_6 from '../../../content/subjects/math402/topic-4/06-improper-integrals.md?raw';
import topic4_7 from '../../../content/subjects/math402/topic-4/07-multidimensional.md?raw';

import topic5_1 from '../../../content/subjects/math402/topic-5/01-gaussian-elimination.md?raw';
import topic5_2 from '../../../content/subjects/math402/topic-5/02-lu-decomposition.md?raw';
import topic5_3 from '../../../content/subjects/math402/topic-5/03-pivoting.md?raw';
import topic5_4 from '../../../content/subjects/math402/topic-5/04-cholesky.md?raw';
import topic5_5 from '../../../content/subjects/math402/topic-5/05-qr-factorization.md?raw';
import topic5_6 from '../../../content/subjects/math402/topic-5/06-svd.md?raw';
import topic5_7 from '../../../content/subjects/math402/topic-5/07-condition-numbers.md?raw';

import topic6_1 from '../../../content/subjects/math402/topic-6/01-jacobi.md?raw';
import topic6_2 from '../../../content/subjects/math402/topic-6/02-gauss-seidel.md?raw';
import topic6_3 from '../../../content/subjects/math402/topic-6/03-sor.md?raw';
import topic6_4 from '../../../content/subjects/math402/topic-6/04-conjugate-gradient.md?raw';
import topic6_5 from '../../../content/subjects/math402/topic-6/05-gmres.md?raw';
import topic6_6 from '../../../content/subjects/math402/topic-6/06-preconditioning.md?raw';
import topic6_7 from '../../../content/subjects/math402/topic-6/07-convergence-analysis.md?raw';

import topic7_1 from '../../../content/subjects/math402/topic-7/01-euler-method.md?raw';
import topic7_2 from '../../../content/subjects/math402/topic-7/02-runge-kutta.md?raw';
import topic7_3 from '../../../content/subjects/math402/topic-7/03-multistep-methods.md?raw';
import topic7_4 from '../../../content/subjects/math402/topic-7/04-stiffness.md?raw';
import topic7_5 from '../../../content/subjects/math402/topic-7/05-boundary-value.md?raw';
import topic7_6 from '../../../content/subjects/math402/topic-7/06-shooting-method.md?raw';
import topic7_7 from '../../../content/subjects/math402/topic-7/07-finite-differences-ode.md?raw';

export const math402Topics: Topic[] = [
  {
    id: 'math402-topic-1',
    title: 'Error Analysis',
    content: 'Sources of numerical errors, floating-point arithmetic, error propagation, stability, and conditioning.',
    subtopics: [
      { id: 'math402-topic-1-1', slug: 'numerical-errors', order: 1, title: 'Sources of Numerical Errors', content: topic1_1 },
      { id: 'math402-topic-1-2', slug: 'floating-point', order: 2, title: 'Floating-Point Arithmetic', content: topic1_2 },
      { id: 'math402-topic-1-3', slug: 'error-propagation', order: 3, title: 'Error Propagation', content: topic1_3 },
      { id: 'math402-topic-1-4', slug: 'stability-conditioning', order: 4, title: 'Stability and Conditioning', content: topic1_4 },
      { id: 'math402-topic-1-5', slug: 'backward-analysis', order: 5, title: 'Backward Error Analysis', content: topic1_5 },
      { id: 'math402-topic-1-6', slug: 'significant-digits', order: 6, title: 'Significant Digits', content: topic1_6 },
      { id: 'math402-topic-1-7', slug: 'interval-arithmetic', order: 7, title: 'Interval Arithmetic', content: topic1_7 }
    ],
    quizIds: ['math402-quiz-1-1', 'math402-quiz-1-2', 'math402-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math402-topic-2',
    title: 'Root-Finding Methods',
    content: 'Numerical methods for finding roots of equations including bisection, Newton, and secant methods.',
    subtopics: [
      { id: 'math402-topic-2-1', slug: 'bisection-method', order: 1, title: 'Bisection Method', content: topic2_1 },
      { id: 'math402-topic-2-2', slug: 'fixed-point-iteration', order: 2, title: 'Fixed-Point Iteration', content: topic2_2 },
      { id: 'math402-topic-2-3', slug: 'newton-method', order: 3, title: 'Newton\'s Method', content: topic2_3 },
      { id: 'math402-topic-2-4', slug: 'secant-method', order: 4, title: 'Secant Method', content: topic2_4 },
      { id: 'math402-topic-2-5', slug: 'convergence-orders', order: 5, title: 'Order of Convergence', content: topic2_5 },
      { id: 'math402-topic-2-6', slug: 'systems-nonlinear', order: 6, title: 'Systems of Nonlinear Equations', content: topic2_6 },
      { id: 'math402-topic-2-7', slug: 'polynomial-roots', order: 7, title: 'Polynomial Root Finding', content: topic2_7 }
    ],
    quizIds: ['math402-quiz-2-1', 'math402-quiz-2-2', 'math402-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math402-topic-3',
    title: 'Interpolation and Approximation',
    content: 'Polynomial interpolation, splines, least squares approximation, and error analysis.',
    subtopics: [
      { id: 'math402-topic-3-1', slug: 'polynomial-interpolation', order: 1, title: 'Polynomial Interpolation Theory', content: topic3_1 },
      { id: 'math402-topic-3-2', slug: 'lagrange-interpolation', order: 2, title: 'Lagrange Interpolation', content: topic3_2 },
      { id: 'math402-topic-3-3', slug: 'newton-divided', order: 3, title: 'Newton Divided Differences', content: topic3_3 },
      { id: 'math402-topic-3-4', slug: 'interpolation-error', order: 4, title: 'Interpolation Error Analysis', content: topic3_4 },
      { id: 'math402-topic-3-5', slug: 'chebyshev-nodes', order: 5, title: 'Chebyshev Nodes', content: topic3_5 },
      { id: 'math402-topic-3-6', slug: 'spline-interpolation', order: 6, title: 'Spline Interpolation', content: topic3_6 },
      { id: 'math402-topic-3-7', slug: 'least-squares', order: 7, title: 'Least Squares Approximation', content: topic3_7 }
    ],
    quizIds: ['math402-quiz-3-1', 'math402-quiz-3-2', 'math402-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math402-topic-4',
    title: 'Numerical Differentiation and Integration',
    content: 'Finite differences, Richardson extrapolation, Newton-Cotes formulas, and Gaussian quadrature.',
    subtopics: [
      { id: 'math402-topic-4-1', slug: 'numerical-differentiation', order: 1, title: 'Numerical Differentiation', content: topic4_1 },
      { id: 'math402-topic-4-2', slug: 'finite-differences', order: 2, title: 'Finite Difference Formulas', content: topic4_2 },
      { id: 'math402-topic-4-3', slug: 'richardson-extrapolation', order: 3, title: 'Richardson Extrapolation', content: topic4_3 },
      { id: 'math402-topic-4-4', slug: 'newton-cotes', order: 4, title: 'Newton-Cotes Integration', content: topic4_4 },
      { id: 'math402-topic-4-5', slug: 'gaussian-quadrature', order: 5, title: 'Gaussian Quadrature', content: topic4_5 },
      { id: 'math402-topic-4-6', slug: 'adaptive-integration', order: 6, title: 'Adaptive Integration', content: topic4_6 },
      { id: 'math402-topic-4-7', slug: 'multiple-integrals', order: 7, title: 'Multiple Integrals', content: topic4_7 }
    ],
    quizIds: ['math402-quiz-4-1', 'math402-quiz-4-2', 'math402-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math402-topic-5',
    title: 'Direct Methods for Linear Systems',
    content: 'Gaussian elimination, LU decomposition, pivoting, Cholesky, QR, and conditioning.',
    subtopics: [
      { id: 'math402-topic-5-1', slug: 'gaussian-elimination', order: 1, title: 'Gaussian Elimination', content: topic5_1 },
      { id: 'math402-topic-5-2', slug: 'lu-decomposition', order: 2, title: 'LU Decomposition', content: topic5_2 },
      { id: 'math402-topic-5-3', slug: 'pivoting-strategies', order: 3, title: 'Pivoting Strategies', content: topic5_3 },
      { id: 'math402-topic-5-4', slug: 'cholesky-decomposition', order: 4, title: 'Cholesky Decomposition', content: topic5_4 },
      { id: 'math402-topic-5-5', slug: 'qr-decomposition', order: 5, title: 'QR Decomposition', content: topic5_5 },
      { id: 'math402-topic-5-6', slug: 'matrix-norms', order: 6, title: 'Matrix Norms', content: topic5_6 },
      { id: 'math402-topic-5-7', slug: 'condition-number', order: 7, title: 'Condition Number', content: topic5_7 }
    ],
    quizIds: ['math402-quiz-5-1', 'math402-quiz-5-2', 'math402-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math402-topic-6',
    title: 'Iterative Methods for Linear Systems',
    content: 'Jacobi, Gauss-Seidel, SOR, conjugate gradient, GMRES, and preconditioning techniques.',
    subtopics: [
      { id: 'math402-topic-6-1', slug: 'jacobi-method', order: 1, title: 'Jacobi Method', content: topic6_1 },
      { id: 'math402-topic-6-2', slug: 'gauss-seidel', order: 2, title: 'Gauss-Seidel Method', content: topic6_2 },
      { id: 'math402-topic-6-3', slug: 'sor-method', order: 3, title: 'Successive Over-Relaxation (SOR)', content: topic6_3 },
      { id: 'math402-topic-6-4', slug: 'convergence-criteria', order: 4, title: 'Convergence Criteria', content: topic6_4 },
      { id: 'math402-topic-6-5', slug: 'conjugate-gradient', order: 5, title: 'Conjugate Gradient Method', content: topic6_5 },
      { id: 'math402-topic-6-6', slug: 'gmres-method', order: 6, title: 'GMRES Method', content: topic6_6 },
      { id: 'math402-topic-6-7', slug: 'preconditioning', order: 7, title: 'Preconditioning Techniques', content: topic6_7 }
    ],
    quizIds: ['math402-quiz-6-1', 'math402-quiz-6-2', 'math402-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math402-topic-7',
    title: 'Numerical Solutions of ODEs',
    content: 'Euler method, Runge-Kutta methods, multistep methods, stability, and boundary value problems.',
    subtopics: [
      { id: 'math402-topic-7-1', slug: 'euler-method', order: 1, title: 'Euler Method', content: topic7_1 },
      { id: 'math402-topic-7-2', slug: 'runge-kutta', order: 2, title: 'Runge-Kutta Methods', content: topic7_2 },
      { id: 'math402-topic-7-3', slug: 'multistep-methods', order: 3, title: 'Multistep Methods', content: topic7_3 },
      { id: 'math402-topic-7-4', slug: 'stability-analysis', order: 4, title: 'Stability Analysis', content: topic7_4 },
      { id: 'math402-topic-7-5', slug: 'adaptive-stepsize', order: 5, title: 'Adaptive Step Size Control', content: topic7_5 },
      { id: 'math402-topic-7-6', slug: 'stiff-equations', order: 6, title: 'Stiff Differential Equations', content: topic7_6 },
      { id: 'math402-topic-7-7', slug: 'boundary-value', order: 7, title: 'Boundary Value Problems', content: topic7_7 }
    ],
    quizIds: ['math402-quiz-7-1', 'math402-quiz-7-2', 'math402-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math402-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
