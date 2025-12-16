import { Topic, Subtopic } from '../../../core/types';
import topic1Content from '../../../content/subjects/math201/topic-1.md?raw';
import topic2Content from '../../../content/subjects/math201/topic-2.md?raw';
import topic3Content from '../../../content/subjects/math201/topic-3.md?raw';
import topic4Content from '../../../content/subjects/math201/topic-4.md?raw';
import topic5Content from '../../../content/subjects/math201/topic-5.md?raw';
import topic6Content from '../../../content/subjects/math201/topic-6.md?raw';
import topic7Content from '../../../content/subjects/math201/topic-7.md?raw';

// Topic 1 Subtopics: Systems of Linear Equations
import t1Introduction from '../../../content/subjects/math201/topic-1/01-introduction-to-linear-systems.md?raw';
import t1GaussianElimination from '../../../content/subjects/math201/topic-1/02-gaussian-elimination.md?raw';
import t1GaussJordan from '../../../content/subjects/math201/topic-1/03-gauss-jordan-elimination.md?raw';
import t1SolutionAnalysis from '../../../content/subjects/math201/topic-1/04-solution-analysis.md?raw';
import t1HomogeneousSystems from '../../../content/subjects/math201/topic-1/05-homogeneous-systems.md?raw';
import t1MatrixRepresentation from '../../../content/subjects/math201/topic-1/06-matrix-representation.md?raw';
import t1Applications from '../../../content/subjects/math201/topic-1/07-applications-linear-systems.md?raw';

// Topic 2 Subtopics: Matrix Operations
import t2Fundamentals from '../../../content/subjects/math201/topic-2/01-matrix-fundamentals.md?raw';
import t2AdditionScalar from '../../../content/subjects/math201/topic-2/02-matrix-addition-scalar.md?raw';
import t2Multiplication from '../../../content/subjects/math201/topic-2/03-matrix-multiplication.md?raw';
import t2Transpose from '../../../content/subjects/math201/topic-2/04-matrix-transpose.md?raw';
import t2Inverse from '../../../content/subjects/math201/topic-2/05-matrix-inverse.md?raw';
import t2ElementaryMatrices from '../../../content/subjects/math201/topic-2/06-elementary-matrices.md?raw';
import t2MatrixApplications from '../../../content/subjects/math201/topic-2/07-matrix-applications.md?raw';

// Topic 3 Subtopics: Vector Spaces
import t3VectorsRn from '../../../content/subjects/math201/topic-3/01-vectors-in-rn.md?raw';
import t3VectorSpaceAxioms from '../../../content/subjects/math201/topic-3/02-vector-space-axioms.md?raw';
import t3ExamplesVectorSpaces from '../../../content/subjects/math201/topic-3/03-examples-vector-spaces.md?raw';
import t3Subspaces from '../../../content/subjects/math201/topic-3/04-subspaces.md?raw';
import t3SpanSpanningSets from '../../../content/subjects/math201/topic-3/05-span-spanning-sets.md?raw';
import t3NullColumnSpace from '../../../content/subjects/math201/topic-3/06-null-space-column-space.md?raw';
import t3CoordinateSystems from '../../../content/subjects/math201/topic-3/07-coordinate-systems.md?raw';

// Topic 4 Subtopics: Linear Independence and Basis
import t4LinearIndependence from '../../../content/subjects/math201/topic-4/01-linear-independence.md?raw';
import t4LinearDependence from '../../../content/subjects/math201/topic-4/02-linear-dependence.md?raw';
import t4BasisDefinition from '../../../content/subjects/math201/topic-4/03-basis-definition.md?raw';
import t4Dimension from '../../../content/subjects/math201/topic-4/04-dimension.md?raw';
import t4Rank from '../../../content/subjects/math201/topic-4/05-rank.md?raw';
import t4BasisNullColumn from '../../../content/subjects/math201/topic-4/06-basis-null-column.md?raw';
import t4ApplicationsBasis from '../../../content/subjects/math201/topic-4/07-applications-basis.md?raw';

// Topic 5 Subtopics: Determinants
import t5Determinant2x2_3x3 from '../../../content/subjects/math201/topic-5/01-determinant-2x2-3x3.md?raw';
import t5CofactorExpansion from '../../../content/subjects/math201/topic-5/02-cofactor-expansion.md?raw';
import t5PropertiesDeterminants from '../../../content/subjects/math201/topic-5/03-properties-determinants.md?raw';
import t5DeterminantComputation from '../../../content/subjects/math201/topic-5/04-determinant-computation.md?raw';
import t5CramersRule from '../../../content/subjects/math201/topic-5/05-cramers-rule.md?raw';
import t5InverseAdjugate from '../../../content/subjects/math201/topic-5/06-inverse-adjugate.md?raw';
import t5GeometricApplications from '../../../content/subjects/math201/topic-5/07-geometric-applications.md?raw';

// Topic 6 Subtopics: Eigenvalues and Eigenvectors
import t6EigenvalueDefinition from '../../../content/subjects/math201/topic-6/01-eigenvalue-definition.md?raw';
import t6CharacteristicEquation from '../../../content/subjects/math201/topic-6/02-characteristic-equation.md?raw';
import t6FindingEigenvectors from '../../../content/subjects/math201/topic-6/03-finding-eigenvectors.md?raw';
import t6Diagonalization from '../../../content/subjects/math201/topic-6/04-diagonalization.md?raw';
import t6PowersMatrices from '../../../content/subjects/math201/topic-6/05-powers-matrices.md?raw';
import t6ComplexEigenvalues from '../../../content/subjects/math201/topic-6/06-complex-eigenvalues.md?raw';
import t6ApplicationsEigenvalues from '../../../content/subjects/math201/topic-6/07-applications-eigenvalues.md?raw';

// Topic 7 Subtopics: Linear Transformations
import t7TransformationDefinition from '../../../content/subjects/math201/topic-7/01-transformation-definition.md?raw';
import t7MatrixRepresentation from '../../../content/subjects/math201/topic-7/02-matrix-representation.md?raw';
import t7KernelRange from '../../../content/subjects/math201/topic-7/03-kernel-range.md?raw';
import t7OneToOneOnto from '../../../content/subjects/math201/topic-7/04-one-to-one-onto.md?raw';
import t7CompositionInverse from '../../../content/subjects/math201/topic-7/05-composition-inverse.md?raw';
import t7ChangeOfBasis from '../../../content/subjects/math201/topic-7/06-change-of-basis.md?raw';
import t7GeometricTransformations from '../../../content/subjects/math201/topic-7/07-geometric-transformations.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math201-t1-intro', slug: 'introduction-to-linear-systems', title: 'Introduction to Linear Systems', content: t1Introduction, order: 1 },
  { id: 'math201-t1-gaussian', slug: 'gaussian-elimination', title: 'Gaussian Elimination', content: t1GaussianElimination, order: 2 },
  { id: 'math201-t1-gauss-jordan', slug: 'gauss-jordan-elimination', title: 'Gauss-Jordan Elimination', content: t1GaussJordan, order: 3 },
  { id: 'math201-t1-solution-analysis', slug: 'solution-analysis', title: 'Solution Analysis', content: t1SolutionAnalysis, order: 4 },
  { id: 'math201-t1-homogeneous', slug: 'homogeneous-systems', title: 'Homogeneous Systems', content: t1HomogeneousSystems, order: 5 },
  { id: 'math201-t1-matrix-rep', slug: 'matrix-representation', title: 'Matrix Representation', content: t1MatrixRepresentation, order: 6 },
  { id: 'math201-t1-applications', slug: 'applications-linear-systems', title: 'Applications of Linear Systems', content: t1Applications, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math201-t2-fundamentals', slug: 'matrix-fundamentals', title: 'Matrix Fundamentals', content: t2Fundamentals, order: 1 },
  { id: 'math201-t2-addition-scalar', slug: 'matrix-addition-scalar', title: 'Matrix Addition and Scalar Multiplication', content: t2AdditionScalar, order: 2 },
  { id: 'math201-t2-multiplication', slug: 'matrix-multiplication', title: 'Matrix Multiplication', content: t2Multiplication, order: 3 },
  { id: 'math201-t2-transpose', slug: 'matrix-transpose', title: 'Matrix Transpose', content: t2Transpose, order: 4 },
  { id: 'math201-t2-inverse', slug: 'matrix-inverse', title: 'Matrix Inverse', content: t2Inverse, order: 5 },
  { id: 'math201-t2-elementary', slug: 'elementary-matrices', title: 'Elementary Matrices', content: t2ElementaryMatrices, order: 6 },
  { id: 'math201-t2-applications', slug: 'matrix-applications', title: 'Matrix Applications', content: t2MatrixApplications, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math201-t3-vectors-rn', slug: 'vectors-in-rn', title: 'Vectors in R^n', content: t3VectorsRn, order: 1 },
  { id: 'math201-t3-axioms', slug: 'vector-space-axioms', title: 'Vector Space Axioms', content: t3VectorSpaceAxioms, order: 2 },
  { id: 'math201-t3-examples', slug: 'examples-vector-spaces', title: 'Examples of Vector Spaces', content: t3ExamplesVectorSpaces, order: 3 },
  { id: 'math201-t3-subspaces', slug: 'subspaces', title: 'Subspaces', content: t3Subspaces, order: 4 },
  { id: 'math201-t3-span', slug: 'span-spanning-sets', title: 'Span and Spanning Sets', content: t3SpanSpanningSets, order: 5 },
  { id: 'math201-t3-null-column', slug: 'null-space-column-space', title: 'Null Space and Column Space', content: t3NullColumnSpace, order: 6 },
  { id: 'math201-t3-coordinates', slug: 'coordinate-systems', title: 'Coordinate Systems', content: t3CoordinateSystems, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math201-t4-independence', slug: 'linear-independence', title: 'Linear Independence', content: t4LinearIndependence, order: 1 },
  { id: 'math201-t4-dependence', slug: 'linear-dependence', title: 'Linear Dependence', content: t4LinearDependence, order: 2 },
  { id: 'math201-t4-basis-def', slug: 'basis-definition', title: 'Basis Definition', content: t4BasisDefinition, order: 3 },
  { id: 'math201-t4-dimension', slug: 'dimension', title: 'Dimension', content: t4Dimension, order: 4 },
  { id: 'math201-t4-rank', slug: 'rank', title: 'Rank', content: t4Rank, order: 5 },
  { id: 'math201-t4-basis-null-column', slug: 'basis-null-column', title: 'Basis for Null and Column Space', content: t4BasisNullColumn, order: 6 },
  { id: 'math201-t4-applications', slug: 'applications-basis', title: 'Applications of Basis', content: t4ApplicationsBasis, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math201-t5-2x2-3x3', slug: 'determinant-2x2-3x3', title: 'Determinants of 2x2 and 3x3 Matrices', content: t5Determinant2x2_3x3, order: 1 },
  { id: 'math201-t5-cofactor', slug: 'cofactor-expansion', title: 'Cofactor Expansion', content: t5CofactorExpansion, order: 2 },
  { id: 'math201-t5-properties', slug: 'properties-determinants', title: 'Properties of Determinants', content: t5PropertiesDeterminants, order: 3 },
  { id: 'math201-t5-computation', slug: 'determinant-computation', title: 'Determinant Computation', content: t5DeterminantComputation, order: 4 },
  { id: 'math201-t5-cramers', slug: 'cramers-rule', title: "Cramer's Rule", content: t5CramersRule, order: 5 },
  { id: 'math201-t5-inverse-adjugate', slug: 'inverse-adjugate', title: 'Inverse via Adjugate', content: t5InverseAdjugate, order: 6 },
  { id: 'math201-t5-geometric', slug: 'geometric-applications', title: 'Geometric Applications', content: t5GeometricApplications, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math201-t6-definition', slug: 'eigenvalue-definition', title: 'Eigenvalue Definition', content: t6EigenvalueDefinition, order: 1 },
  { id: 'math201-t6-characteristic', slug: 'characteristic-equation', title: 'Characteristic Equation', content: t6CharacteristicEquation, order: 2 },
  { id: 'math201-t6-finding', slug: 'finding-eigenvectors', title: 'Finding Eigenvectors', content: t6FindingEigenvectors, order: 3 },
  { id: 'math201-t6-diagonalization', slug: 'diagonalization', title: 'Diagonalization', content: t6Diagonalization, order: 4 },
  { id: 'math201-t6-powers', slug: 'powers-matrices', title: 'Powers of Matrices', content: t6PowersMatrices, order: 5 },
  { id: 'math201-t6-complex', slug: 'complex-eigenvalues', title: 'Complex Eigenvalues', content: t6ComplexEigenvalues, order: 6 },
  { id: 'math201-t6-applications', slug: 'applications-eigenvalues', title: 'Applications of Eigenvalues', content: t6ApplicationsEigenvalues, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math201-t7-definition', slug: 'transformation-definition', title: 'Transformation Definition', content: t7TransformationDefinition, order: 1 },
  { id: 'math201-t7-matrix-rep', slug: 'matrix-representation', title: 'Matrix Representation', content: t7MatrixRepresentation, order: 2 },
  { id: 'math201-t7-kernel-range', slug: 'kernel-range', title: 'Kernel and Range', content: t7KernelRange, order: 3 },
  { id: 'math201-t7-one-to-one', slug: 'one-to-one-onto', title: 'One-to-One and Onto', content: t7OneToOneOnto, order: 4 },
  { id: 'math201-t7-composition', slug: 'composition-inverse', title: 'Composition and Inverse', content: t7CompositionInverse, order: 5 },
  { id: 'math201-t7-change-basis', slug: 'change-of-basis', title: 'Change of Basis', content: t7ChangeOfBasis, order: 6 },
  { id: 'math201-t7-geometric', slug: 'geometric-transformations', title: 'Geometric Transformations', content: t7GeometricTransformations, order: 7 },
];

export const math201Topics: Topic[] = [
  {
    id: 'math201-1',
    title: 'Systems of Linear Equations',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math201-quiz-1a', 'math201-quiz-1b', 'math201-quiz-1c'],
    exerciseIds: [
      'math201-t1-ex01', 'math201-t1-ex02', 'math201-t1-ex03', 'math201-t1-ex04',
      'math201-t1-ex05', 'math201-t1-ex06', 'math201-t1-ex07', 'math201-t1-ex08',
      'math201-t1-ex09', 'math201-t1-ex10', 'math201-t1-ex11', 'math201-t1-ex12',
      'math201-t1-ex13', 'math201-t1-ex14', 'math201-t1-ex15', 'math201-t1-ex16'
    ]
  },
  {
    id: 'math201-2',
    title: 'Matrix Operations',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math201-quiz-2a', 'math201-quiz-2b', 'math201-quiz-2c'],
    exerciseIds: [
      'math201-t2-ex01', 'math201-t2-ex02', 'math201-t2-ex03', 'math201-t2-ex04',
      'math201-t2-ex05', 'math201-t2-ex06', 'math201-t2-ex07', 'math201-t2-ex08',
      'math201-t2-ex09', 'math201-t2-ex10', 'math201-t2-ex11', 'math201-t2-ex12',
      'math201-t2-ex13', 'math201-t2-ex14', 'math201-t2-ex15', 'math201-t2-ex16'
    ]
  },
  {
    id: 'math201-3',
    title: 'Vector Spaces',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math201-quiz-3a', 'math201-quiz-3b', 'math201-quiz-3c'],
    exerciseIds: [
      'math201-t3-ex01', 'math201-t3-ex02', 'math201-t3-ex03', 'math201-t3-ex04',
      'math201-t3-ex05', 'math201-t3-ex06', 'math201-t3-ex07', 'math201-t3-ex08',
      'math201-t3-ex09', 'math201-t3-ex10', 'math201-t3-ex11', 'math201-t3-ex12',
      'math201-t3-ex13', 'math201-t3-ex14', 'math201-t3-ex15', 'math201-t3-ex16'
    ]
  },
  {
    id: 'math201-4',
    title: 'Linear Independence and Basis',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math201-quiz-4a', 'math201-quiz-4b', 'math201-quiz-4c'],
    exerciseIds: [
      'math201-t4-ex01', 'math201-t4-ex02', 'math201-t4-ex03', 'math201-t4-ex04',
      'math201-t4-ex05', 'math201-t4-ex06', 'math201-t4-ex07', 'math201-t4-ex08',
      'math201-t4-ex09', 'math201-t4-ex10', 'math201-t4-ex11', 'math201-t4-ex12',
      'math201-t4-ex13', 'math201-t4-ex14', 'math201-t4-ex15', 'math201-t4-ex16'
    ]
  },
  {
    id: 'math201-5',
    title: 'Determinants',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math201-quiz-5a', 'math201-quiz-5b', 'math201-quiz-5c'],
    exerciseIds: [
      'math201-t5-ex01', 'math201-t5-ex02', 'math201-t5-ex03', 'math201-t5-ex04',
      'math201-t5-ex05', 'math201-t5-ex06', 'math201-t5-ex07', 'math201-t5-ex08',
      'math201-t5-ex09', 'math201-t5-ex10', 'math201-t5-ex11', 'math201-t5-ex12',
      'math201-t5-ex13', 'math201-t5-ex14', 'math201-t5-ex15', 'math201-t5-ex16'
    ]
  },
  {
    id: 'math201-6',
    title: 'Eigenvalues and Eigenvectors',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math201-quiz-6a', 'math201-quiz-6b', 'math201-quiz-6c'],
    exerciseIds: [
      'math201-t6-ex01', 'math201-t6-ex02', 'math201-t6-ex03', 'math201-t6-ex04',
      'math201-t6-ex05', 'math201-t6-ex06', 'math201-t6-ex07', 'math201-t6-ex08',
      'math201-t6-ex09', 'math201-t6-ex10', 'math201-t6-ex11', 'math201-t6-ex12',
      'math201-t6-ex13', 'math201-t6-ex14', 'math201-t6-ex15', 'math201-t6-ex16'
    ]
  },
  {
    id: 'math201-7',
    title: 'Linear Transformations',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math201-quiz-7a', 'math201-quiz-7b', 'math201-quiz-7c'],
    exerciseIds: [
      'math201-t7-ex01', 'math201-t7-ex02', 'math201-t7-ex03', 'math201-t7-ex04',
      'math201-t7-ex05', 'math201-t7-ex06', 'math201-t7-ex07', 'math201-t7-ex08',
      'math201-t7-ex09', 'math201-t7-ex10', 'math201-t7-ex11', 'math201-t7-ex12',
      'math201-t7-ex13', 'math201-t7-ex14', 'math201-t7-ex15', 'math201-t7-ex16'
    ]
  }
];
