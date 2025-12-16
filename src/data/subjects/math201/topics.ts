import { Topic, Subtopic } from '../../../core/types';
import topic1Content from '../../../content/subjects/math201/topic-1.md?raw';
import topic2Content from '../../../content/subjects/math201/topic-2.md?raw';
import topic3Content from '../../../content/subjects/math201/topic-3.md?raw';
import topic4Content from '../../../content/subjects/math201/topic-4.md?raw';
import topic5Content from '../../../content/subjects/math201/topic-5.md?raw';
import topic6Content from '../../../content/subjects/math201/topic-6.md?raw';
import topic7Content from '../../../content/subjects/math201/topic-7.md?raw';

// Topic 1 Subtopics: Systems of Linear Equations
import t1Introduction from '../../../content/subjects/math201/topic-1/01-introduction.md?raw';
import t1GaussianElimination from '../../../content/subjects/math201/topic-1/02-gaussian-elimination.md?raw';
import t1RowEchelon from '../../../content/subjects/math201/topic-1/03-row-echelon-form.md?raw';
import t1MatrixEquations from '../../../content/subjects/math201/topic-1/04-matrix-equations.md?raw';
import t1SolutionSets from '../../../content/subjects/math201/topic-1/05-solution-sets.md?raw';
import t1Applications from '../../../content/subjects/math201/topic-1/06-applications.md?raw';
import t1HomogeneousSystems from '../../../content/subjects/math201/topic-1/07-homogeneous-systems.md?raw';

// Topic 2 Subtopics: Matrix Operations
import t2MatrixArithmetic from '../../../content/subjects/math201/topic-2/01-matrix-arithmetic.md?raw';
import t2MatrixMultiplication from '../../../content/subjects/math201/topic-2/02-matrix-multiplication.md?raw';
import t2Transpose from '../../../content/subjects/math201/topic-2/03-transpose.md?raw';
import t2Inverses from '../../../content/subjects/math201/topic-2/04-inverses.md?raw';
import t2ElementaryMatrices from '../../../content/subjects/math201/topic-2/05-elementary-matrices.md?raw';
import t2SpecialMatrices from '../../../content/subjects/math201/topic-2/06-special-matrices.md?raw';
import t2MatrixFactorizations from '../../../content/subjects/math201/topic-2/07-matrix-factorizations.md?raw';

// Topic 3 Subtopics: Vector Spaces
import t3VectorSpaceDefinition from '../../../content/subjects/math201/topic-3/01-vector-space-definition.md?raw';
import t3Subspaces from '../../../content/subjects/math201/topic-3/02-subspaces.md?raw';
import t3NullColumnSpaces from '../../../content/subjects/math201/topic-3/03-null-column-spaces.md?raw';
import t3LinearCombinations from '../../../content/subjects/math201/topic-3/04-linear-combinations.md?raw';
import t3SpanningSet from '../../../content/subjects/math201/topic-3/05-spanning-set.md?raw';
import t3LinearIndependence from '../../../content/subjects/math201/topic-3/06-linear-independence.md?raw';
import t3BasisDimension from '../../../content/subjects/math201/topic-3/07-basis-dimension.md?raw';

// Topic 4 Subtopics: Linear Independence and Basis
import t4Independence from '../../../content/subjects/math201/topic-4/01-independence.md?raw';
import t4BasisConcepts from '../../../content/subjects/math201/topic-4/02-basis-concepts.md?raw';
import t4Dimension from '../../../content/subjects/math201/topic-4/03-dimension.md?raw';
import t4CoordinateSystems from '../../../content/subjects/math201/topic-4/04-coordinate-systems.md?raw';
import t4RankNullity from '../../../content/subjects/math201/topic-4/05-rank-nullity.md?raw';
import t4ChangeOfBasis from '../../../content/subjects/math201/topic-4/06-change-of-basis.md?raw';
import t4RowColumnSpace from '../../../content/subjects/math201/topic-4/07-row-column-space.md?raw';

// Topic 5 Subtopics: Determinants
import t5DeterminantDefinition from '../../../content/subjects/math201/topic-5/01-determinant-definition.md?raw';
import t5CofactorExpansion from '../../../content/subjects/math201/topic-5/02-cofactor-expansion.md?raw';
import t5DeterminantProperties from '../../../content/subjects/math201/topic-5/03-determinant-properties.md?raw';
import t5CramersRule from '../../../content/subjects/math201/topic-5/04-cramers-rule.md?raw';
import t5AreaVolume from '../../../content/subjects/math201/topic-5/05-area-volume.md?raw';
import t5InversesDeterminants from '../../../content/subjects/math201/topic-5/06-inverses-determinants.md?raw';
import t5DeterminantApplications from '../../../content/subjects/math201/topic-5/07-determinant-applications.md?raw';

// Topic 6 Subtopics: Eigenvalues and Eigenvectors
import t6EigenvalueDefinition from '../../../content/subjects/math201/topic-6/01-eigenvalue-definition.md?raw';
import t6CharacteristicEquation from '../../../content/subjects/math201/topic-6/02-characteristic-equation.md?raw';
import t6Diagonalization from '../../../content/subjects/math201/topic-6/03-diagonalization.md?raw';
import t6EigenspaceBasis from '../../../content/subjects/math201/topic-6/04-eigenspace-basis.md?raw';
import t6ComplexEigenvalues from '../../../content/subjects/math201/topic-6/05-complex-eigenvalues.md?raw';
import t6Applications from '../../../content/subjects/math201/topic-6/06-applications.md?raw';
import t6IterativeMethods from '../../../content/subjects/math201/topic-6/07-iterative-methods.md?raw';

// Topic 7 Subtopics: Linear Transformations
import t7TransformationDefinition from '../../../content/subjects/math201/topic-7/01-transformation-definition.md?raw';
import t7MatrixTransformations from '../../../content/subjects/math201/topic-7/02-matrix-transformations.md?raw';
import t7KernelRange from '../../../content/subjects/math201/topic-7/03-kernel-range.md?raw';
import t7OneToOneOnto from '../../../content/subjects/math201/topic-7/04-one-to-one-onto.md?raw';
import t7CompositionInverse from '../../../content/subjects/math201/topic-7/05-composition-inverse.md?raw';
import t7SimilarityTransformations from '../../../content/subjects/math201/topic-7/06-similarity-transformations.md?raw';
import t7GeometricTransformations from '../../../content/subjects/math201/topic-7/07-geometric-transformations.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math201-t1-intro', slug: 'introduction', title: 'Introduction to Linear Systems', content: t1Introduction, order: 1 },
  { id: 'math201-t1-gaussian', slug: 'gaussian-elimination', title: 'Gaussian Elimination', content: t1GaussianElimination, order: 2 },
  { id: 'math201-t1-row-echelon', slug: 'row-echelon-form', title: 'Row Echelon Form', content: t1RowEchelon, order: 3 },
  { id: 'math201-t1-matrix-equations', slug: 'matrix-equations', title: 'Matrix Equations', content: t1MatrixEquations, order: 4 },
  { id: 'math201-t1-solution-sets', slug: 'solution-sets', title: 'Solution Sets', content: t1SolutionSets, order: 5 },
  { id: 'math201-t1-applications', slug: 'applications', title: 'Applications of Linear Systems', content: t1Applications, order: 6 },
  { id: 'math201-t1-homogeneous', slug: 'homogeneous-systems', title: 'Homogeneous Systems', content: t1HomogeneousSystems, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math201-t2-arithmetic', slug: 'matrix-arithmetic', title: 'Matrix Arithmetic', content: t2MatrixArithmetic, order: 1 },
  { id: 'math201-t2-multiplication', slug: 'matrix-multiplication', title: 'Matrix Multiplication', content: t2MatrixMultiplication, order: 2 },
  { id: 'math201-t2-transpose', slug: 'transpose', title: 'Matrix Transpose', content: t2Transpose, order: 3 },
  { id: 'math201-t2-inverses', slug: 'inverses', title: 'Matrix Inverses', content: t2Inverses, order: 4 },
  { id: 'math201-t2-elementary', slug: 'elementary-matrices', title: 'Elementary Matrices', content: t2ElementaryMatrices, order: 5 },
  { id: 'math201-t2-special', slug: 'special-matrices', title: 'Special Matrices', content: t2SpecialMatrices, order: 6 },
  { id: 'math201-t2-factorizations', slug: 'matrix-factorizations', title: 'Matrix Factorizations', content: t2MatrixFactorizations, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math201-t3-definition', slug: 'vector-space-definition', title: 'Vector Space Definition', content: t3VectorSpaceDefinition, order: 1 },
  { id: 'math201-t3-subspaces', slug: 'subspaces', title: 'Subspaces', content: t3Subspaces, order: 2 },
  { id: 'math201-t3-null-column', slug: 'null-column-spaces', title: 'Null and Column Spaces', content: t3NullColumnSpaces, order: 3 },
  { id: 'math201-t3-combinations', slug: 'linear-combinations', title: 'Linear Combinations', content: t3LinearCombinations, order: 4 },
  { id: 'math201-t3-spanning', slug: 'spanning-set', title: 'Spanning Sets', content: t3SpanningSet, order: 5 },
  { id: 'math201-t3-independence', slug: 'linear-independence', title: 'Linear Independence', content: t3LinearIndependence, order: 6 },
  { id: 'math201-t3-basis', slug: 'basis-dimension', title: 'Basis and Dimension', content: t3BasisDimension, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math201-t4-independence', slug: 'independence', title: 'Linear Independence', content: t4Independence, order: 1 },
  { id: 'math201-t4-basis', slug: 'basis-concepts', title: 'Basis Concepts', content: t4BasisConcepts, order: 2 },
  { id: 'math201-t4-dimension', slug: 'dimension', title: 'Dimension Theory', content: t4Dimension, order: 3 },
  { id: 'math201-t4-coordinates', slug: 'coordinate-systems', title: 'Coordinate Systems', content: t4CoordinateSystems, order: 4 },
  { id: 'math201-t4-rank-nullity', slug: 'rank-nullity', title: 'Rank-Nullity Theorem', content: t4RankNullity, order: 5 },
  { id: 'math201-t4-change-basis', slug: 'change-of-basis', title: 'Change of Basis', content: t4ChangeOfBasis, order: 6 },
  { id: 'math201-t4-row-column', slug: 'row-column-space', title: 'Row and Column Space', content: t4RowColumnSpace, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math201-t5-definition', slug: 'determinant-definition', title: 'Determinant Definition', content: t5DeterminantDefinition, order: 1 },
  { id: 'math201-t5-cofactor', slug: 'cofactor-expansion', title: 'Cofactor Expansion', content: t5CofactorExpansion, order: 2 },
  { id: 'math201-t5-properties', slug: 'determinant-properties', title: 'Properties of Determinants', content: t5DeterminantProperties, order: 3 },
  { id: 'math201-t5-cramers', slug: 'cramers-rule', title: "Cramer's Rule", content: t5CramersRule, order: 4 },
  { id: 'math201-t5-area-volume', slug: 'area-volume', title: 'Area and Volume', content: t5AreaVolume, order: 5 },
  { id: 'math201-t5-inverses', slug: 'inverses-determinants', title: 'Inverses and Determinants', content: t5InversesDeterminants, order: 6 },
  { id: 'math201-t5-applications', slug: 'determinant-applications', title: 'Determinant Applications', content: t5DeterminantApplications, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math201-t6-definition', slug: 'eigenvalue-definition', title: 'Eigenvalue Definition', content: t6EigenvalueDefinition, order: 1 },
  { id: 'math201-t6-characteristic', slug: 'characteristic-equation', title: 'Characteristic Equation', content: t6CharacteristicEquation, order: 2 },
  { id: 'math201-t6-diagonalization', slug: 'diagonalization', title: 'Diagonalization', content: t6Diagonalization, order: 3 },
  { id: 'math201-t6-eigenspace', slug: 'eigenspace-basis', title: 'Eigenspace and Basis', content: t6EigenspaceBasis, order: 4 },
  { id: 'math201-t6-complex', slug: 'complex-eigenvalues', title: 'Complex Eigenvalues', content: t6ComplexEigenvalues, order: 5 },
  { id: 'math201-t6-applications', slug: 'applications', title: 'Eigenvalue Applications', content: t6Applications, order: 6 },
  { id: 'math201-t6-iterative', slug: 'iterative-methods', title: 'Iterative Methods', content: t6IterativeMethods, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math201-t7-definition', slug: 'transformation-definition', title: 'Linear Transformation Definition', content: t7TransformationDefinition, order: 1 },
  { id: 'math201-t7-matrix', slug: 'matrix-transformations', title: 'Matrix Transformations', content: t7MatrixTransformations, order: 2 },
  { id: 'math201-t7-kernel-range', slug: 'kernel-range', title: 'Kernel and Range', content: t7KernelRange, order: 3 },
  { id: 'math201-t7-one-to-one', slug: 'one-to-one-onto', title: 'One-to-One and Onto', content: t7OneToOneOnto, order: 4 },
  { id: 'math201-t7-composition', slug: 'composition-inverse', title: 'Composition and Inverse', content: t7CompositionInverse, order: 5 },
  { id: 'math201-t7-similarity', slug: 'similarity-transformations', title: 'Similarity Transformations', content: t7SimilarityTransformations, order: 6 },
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
      'math201-t1-ex01',
      'math201-t1-ex02',
      'math201-t1-ex03',
      'math201-t1-ex04',
      'math201-t1-ex05',
      'math201-t1-ex06',
      'math201-t1-ex07',
      'math201-t1-ex08',
      'math201-t1-ex09',
      'math201-t1-ex10',
      'math201-t1-ex11',
      'math201-t1-ex12',
      'math201-t1-ex13',
      'math201-t1-ex14',
      'math201-t1-ex15',
      'math201-t1-ex16'
    ]
  },
  {
    id: 'math201-2',
    title: 'Matrix Operations',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math201-quiz-2a', 'math201-quiz-2b', 'math201-quiz-2c'],
    exerciseIds: [
      'math201-t2-ex01',
      'math201-t2-ex02',
      'math201-t2-ex03',
      'math201-t2-ex04',
      'math201-t2-ex05',
      'math201-t2-ex06',
      'math201-t2-ex07',
      'math201-t2-ex08',
      'math201-t2-ex09',
      'math201-t2-ex10',
      'math201-t2-ex11',
      'math201-t2-ex12',
      'math201-t2-ex13',
      'math201-t2-ex14',
      'math201-t2-ex15',
      'math201-t2-ex16'
    ]
  },
  {
    id: 'math201-3',
    title: 'Vector Spaces',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math201-quiz-3a', 'math201-quiz-3b', 'math201-quiz-3c'],
    exerciseIds: [
      'math201-t3-ex01',
      'math201-t3-ex02',
      'math201-t3-ex03',
      'math201-t3-ex04',
      'math201-t3-ex05',
      'math201-t3-ex06',
      'math201-t3-ex07',
      'math201-t3-ex08',
      'math201-t3-ex09',
      'math201-t3-ex10',
      'math201-t3-ex11',
      'math201-t3-ex12',
      'math201-t3-ex13',
      'math201-t3-ex14',
      'math201-t3-ex15',
      'math201-t3-ex16'
    ]
  },
  {
    id: 'math201-4',
    title: 'Linear Independence and Basis',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math201-quiz-4a', 'math201-quiz-4b', 'math201-quiz-4c'],
    exerciseIds: [
      'math201-t4-ex01',
      'math201-t4-ex02',
      'math201-t4-ex03',
      'math201-t4-ex04',
      'math201-t4-ex05',
      'math201-t4-ex06',
      'math201-t4-ex07',
      'math201-t4-ex08',
      'math201-t4-ex09',
      'math201-t4-ex10',
      'math201-t4-ex11',
      'math201-t4-ex12',
      'math201-t4-ex13',
      'math201-t4-ex14',
      'math201-t4-ex15',
      'math201-t4-ex16'
    ]
  },
  {
    id: 'math201-5',
    title: 'Determinants',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math201-quiz-5a', 'math201-quiz-5b', 'math201-quiz-5c'],
    exerciseIds: [
      'math201-t5-ex01',
      'math201-t5-ex02',
      'math201-t5-ex03',
      'math201-t5-ex04',
      'math201-t5-ex05',
      'math201-t5-ex06',
      'math201-t5-ex07',
      'math201-t5-ex08',
      'math201-t5-ex09',
      'math201-t5-ex10',
      'math201-t5-ex11',
      'math201-t5-ex12',
      'math201-t5-ex13',
      'math201-t5-ex14',
      'math201-t5-ex15',
      'math201-t5-ex16'
    ]
  },
  {
    id: 'math201-6',
    title: 'Eigenvalues and Eigenvectors',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math201-quiz-6a', 'math201-quiz-6b', 'math201-quiz-6c'],
    exerciseIds: [
      'math201-t6-ex01',
      'math201-t6-ex02',
      'math201-t6-ex03',
      'math201-t6-ex04',
      'math201-t6-ex05',
      'math201-t6-ex06',
      'math201-t6-ex07',
      'math201-t6-ex08',
      'math201-t6-ex09',
      'math201-t6-ex10',
      'math201-t6-ex11',
      'math201-t6-ex12',
      'math201-t6-ex13',
      'math201-t6-ex14',
      'math201-t6-ex15',
      'math201-t6-ex16'
    ]
  },
  {
    id: 'math201-7',
    title: 'Linear Transformations',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math201-quiz-7a', 'math201-quiz-7b', 'math201-quiz-7c'],
    exerciseIds: [
      'math201-t7-ex01',
      'math201-t7-ex02',
      'math201-t7-ex03',
      'math201-t7-ex04',
      'math201-t7-ex05',
      'math201-t7-ex06',
      'math201-t7-ex07',
      'math201-t7-ex08',
      'math201-t7-ex09',
      'math201-t7-ex10',
      'math201-t7-ex11',
      'math201-t7-ex12',
      'math201-t7-ex13',
      'math201-t7-ex14',
      'math201-t7-ex15',
      'math201-t7-ex16'
    ]
  }
];
