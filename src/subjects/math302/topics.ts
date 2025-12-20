/**
 * MATH302 Topics
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
    title: 'First-Order Differential Equations',
  },
  {
    number: 1,
    title: 'Introduction to ODEs',
  },
  {
    number: 1,
    title: 'Introduction to Second-Order',
  },
  {
    number: 1,
    title: 'Higher-Order Introduction',
  },
  {
    number: 1,
    title: 'Introduction to Systems',
  },
  {
    number: 1,
    title: 'Definition of Laplace Transform',
  },
  {
    number: 1,
    title: 'Introduction to Series Solutions',
  },
  {
    number: 1,
    title: 'Population Models',
  },
  {
    number: 2,
    title: 'Separable Equations',
  },
  {
    number: 2,
    title: 'Second-Order Linear Equations',
  },
  {
    number: 2,
    title: 'Homogeneous with Constant Coefficients',
  },
  {
    number: 2,
    title: 'Homogeneous Higher-Order',
  },
  {
    number: 2,
    title: 'Matrix Methods',
  },
  {
    number: 2,
    title: 'Properties of Laplace Transform',
  },
  {
    number: 2,
    title: 'Power Series Review',
  },
  {
    number: 2,
    title: 'Electrical Circuits',
  },
  {
    number: 3,
    title: 'Linear First-Order Equations',
  },
  {
    number: 3,
    title: 'The Characteristic Equation',
  },
  {
    number: 3,
    title: 'Higher-Order Linear Equations',
  },
  {
    number: 3,
    title: 'Nonhomogeneous Higher-Order',
  },
  {
    number: 3,
    title: 'The Eigenvalue Method',
  },
  {
    number: 3,
    title: 'Inverse Laplace Transform',
  },
  {
    number: 3,
    title: 'Solutions near Ordinary Points',
  },
  {
    number: 3,
    title: 'Mechanical Systems',
  },
  {
    number: 4,
    title: 'Exact Equations',
  },
  {
    number: 4,
    title: 'Reduction of Order',
  },
  {
    number: 4,
    title: 'Operator Methods',
  },
  {
    number: 4,
    title: 'Systems of Differential Equations',
  },
  {
    number: 4,
    title: 'Complex Eigenvalues',
  },
  {
    number: 4,
    title: 'Solving IVPs with Laplace',
  },
  {
    number: 4,
    title: 'Regular Singular Points',
  },
  {
    number: 4,
    title: 'Mixing Problems',
  },
  {
    number: 5,
    title: 'Substitution Methods',
  },
  {
    number: 5,
    title: 'Undetermined Coefficients',
  },
  {
    number: 5,
    title: 'Cauchy-Euler Equations',
  },
  {
    number: 5,
    title: 'Repeated Eigenvalues',
  },
  {
    number: 5,
    title: 'Laplace Transforms',
  },
  {
    number: 5,
    title: 'Step Functions',
  },
  {
    number: 5,
    title: 'Frobenius Method',
  },
  {
    number: 5,
    title: 'Numerical Methods',
  },
  {
    number: 6,
    title: 'Existence and Uniqueness',
  },
  {
    number: 6,
    title: 'Variation of Parameters',
  },
  {
    number: 6,
    title: 'Initial and Boundary Value Problems',
  },
  {
    number: 6,
    title: 'Phase Portraits',
  },
  {
    number: 6,
    title: 'Convolution',
  },
  {
    number: 6,
    title: 'Series Solutions',
  },
  {
    number: 6,
    title: 'Bessel Functions',
  },
  {
    number: 6,
    title: 'Stability Analysis',
  },
  {
    number: 7,
    title: 'Autonomous Equations',
    quizIds: ['math302-quiz-1-1', 'math302-quiz-1-2', 'math302-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Mechanical Vibrations',
    quizIds: ['math302-quiz-2-1', 'math302-quiz-2-2', 'math302-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Theory of Linear ODEs',
    quizIds: ['math302-quiz-3-1', 'math302-quiz-3-2', 'math302-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Nonhomogeneous Systems',
    quizIds: ['math302-quiz-4-1', 'math302-quiz-4-2', 'math302-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Delta Functions',
    quizIds: ['math302-quiz-5-1', 'math302-quiz-5-2', 'math302-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Legendre Equations',
    quizIds: ['math302-quiz-6-1', 'math302-quiz-6-2', 'math302-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Applications and Modeling',
  },
  {
    number: 7,
    title: 'Bifurcations',
    quizIds: ['math302-quiz-7-1', 'math302-quiz-7-2', 'math302-quiz-7-3'],
  },
];

export const math302Topics: Topic[] = buildTopicsFromGlob('math302', content, topicConfigs);
