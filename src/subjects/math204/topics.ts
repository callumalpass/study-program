import { Topic, Subtopic } from '../../core/types';
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Topic 1 Subtopics: Antiderivatives and Indefinite Integrals
import t1AntiderivativeConcept from './content/topic-1/01-antiderivative-concept.md?raw';
import t1BasicRules from './content/topic-1/02-basic-integration-rules.md?raw';
import t1InitialValue from './content/topic-1/03-initial-value-problems.md?raw';
import t1Substitution from './content/topic-1/04-substitution-method.md?raw';
import t1Trigonometric from './content/topic-1/05-integration-trigonometric.md?raw';
import t1DiffEqIntro from './content/topic-1/06-differential-equations-intro.md?raw';
import t1Applications from './content/topic-1/07-antiderivative-applications.md?raw';

// Topic 2 Subtopics: Definite Integrals and Fundamental Theorem
import t2RiemannSums from './content/topic-2/01-riemann-sums.md?raw';
import t2Properties from './content/topic-2/02-properties-definite-integrals.md?raw';
import t2FTC1 from './content/topic-2/03-fundamental-theorem-part1.md?raw';
import t2FTC2 from './content/topic-2/04-fundamental-theorem-part2.md?raw';
import t2MVT from './content/topic-2/05-mean-value-theorem-integrals.md?raw';
import t2AreaBetween from './content/topic-2/06-area-between-curves.md?raw';
import t2NumericalIntegration from './content/topic-2/07-numerical-integration.md?raw';

// Topic 3 Subtopics: Integration Techniques
import t3ByParts from './content/topic-3/01-integration-by-parts.md?raw';
import t3TrigIntegrals from './content/topic-3/02-trigonometric-integrals.md?raw';
import t3TrigSubstitution from './content/topic-3/03-trigonometric-substitution.md?raw';
import t3PartialFractions from './content/topic-3/04-partial-fractions.md?raw';
import t3RationalFunctions from './content/topic-3/05-rational-functions.md?raw';
import t3Strategy from './content/topic-3/06-integration-strategy.md?raw';
import t3TablesComputers from './content/topic-3/07-tables-computers.md?raw';

// Topic 4 Subtopics: Applications of Integration
import t4VolumesDiskWasher from './content/topic-4/01-volumes-disk-washer.md?raw';
import t4VolumesShells from './content/topic-4/02-volumes-cylindrical-shells.md?raw';
import t4ArcLength from './content/topic-4/03-arc-length.md?raw';
import t4SurfaceArea from './content/topic-4/04-surface-area-revolution.md?raw';
import t4Work from './content/topic-4/05-work-applications.md?raw';
import t4HydrostaticForce from './content/topic-4/06-hydrostatic-force.md?raw';
import t4CenterMass from './content/topic-4/07-center-of-mass.md?raw';

// Topic 5 Subtopics: Improper Integrals
import t5InfiniteLimits from './content/topic-5/01-infinite-limits-type1.md?raw';
import t5Discontinuous from './content/topic-5/02-discontinuous-type2.md?raw';
import t5ComparisonTests from './content/topic-5/03-comparison-tests.md?raw';
import t5ConvergenceCriteria from './content/topic-5/04-convergence-criteria.md?raw';
import t5GammaFunction from './content/topic-5/05-gamma-function.md?raw';
import t5ProbabilityApps from './content/topic-5/06-probability-applications.md?raw';
import t5LaplaceIntro from './content/topic-5/07-laplace-transform-intro.md?raw';

// Topic 6 Subtopics: Sequences and Series
import t6SequencesDefinition from './content/topic-6/01-sequences-definition.md?raw';
import t6SequenceProperties from './content/topic-6/02-sequence-properties.md?raw';
import t6InfiniteSeries from './content/topic-6/03-infinite-series.md?raw';
import t6DivergenceIntegral from './content/topic-6/04-divergence-integral-tests.md?raw';
import t6ComparisonTestsSeries from './content/topic-6/05-comparison-tests-series.md?raw';
import t6AlternatingSeries from './content/topic-6/06-alternating-series.md?raw';
import t6RatioRoot from './content/topic-6/07-ratio-root-tests.md?raw';

// Topic 7 Subtopics: Taylor and Maclaurin Series
import t7PowerSeries from './content/topic-7/01-power-series.md?raw';
import t7OperationsPowerSeries from './content/topic-7/02-operations-power-series.md?raw';
import t7TaylorSeriesDefinition from './content/topic-7/03-taylor-series-definition.md?raw';
import t7CommonSeries from './content/topic-7/04-common-series.md?raw';
import t7TaylorRemainder from './content/topic-7/05-taylor-remainder.md?raw';
import t7ApplicationsTaylor from './content/topic-7/06-applications-taylor.md?raw';
import t7BinomialSeries from './content/topic-7/07-binomial-series.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math204-t1-concept', slug: 'antiderivative-concept', title: 'Antiderivative Concept', content: t1AntiderivativeConcept, order: 1 },
  { id: 'math204-t1-basic-rules', slug: 'basic-integration-rules', title: 'Basic Integration Rules', content: t1BasicRules, order: 2 },
  { id: 'math204-t1-initial-value', slug: 'initial-value-problems', title: 'Initial Value Problems', content: t1InitialValue, order: 3 },
  { id: 'math204-t1-substitution', slug: 'substitution-method', title: 'Substitution Method', content: t1Substitution, order: 4 },
  { id: 'math204-t1-trig', slug: 'integration-trigonometric', title: 'Trigonometric Integration', content: t1Trigonometric, order: 5 },
  { id: 'math204-t1-diffeq', slug: 'differential-equations-intro', title: 'Introduction to Differential Equations', content: t1DiffEqIntro, order: 6 },
  { id: 'math204-t1-applications', slug: 'antiderivative-applications', title: 'Antiderivative Applications', content: t1Applications, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math204-t2-riemann', slug: 'riemann-sums', title: 'Riemann Sums', content: t2RiemannSums, order: 1 },
  { id: 'math204-t2-properties', slug: 'properties-definite-integrals', title: 'Properties of Definite Integrals', content: t2Properties, order: 2 },
  { id: 'math204-t2-ftc1', slug: 'fundamental-theorem-part1', title: 'Fundamental Theorem of Calculus (Part 1)', content: t2FTC1, order: 3 },
  { id: 'math204-t2-ftc2', slug: 'fundamental-theorem-part2', title: 'Fundamental Theorem of Calculus (Part 2)', content: t2FTC2, order: 4 },
  { id: 'math204-t2-mvt', slug: 'mean-value-theorem-integrals', title: 'Mean Value Theorem for Integrals', content: t2MVT, order: 5 },
  { id: 'math204-t2-area', slug: 'area-between-curves', title: 'Area Between Curves', content: t2AreaBetween, order: 6 },
  { id: 'math204-t2-numerical', slug: 'numerical-integration', title: 'Numerical Integration', content: t2NumericalIntegration, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math204-t3-by-parts', slug: 'integration-by-parts', title: 'Integration by Parts', content: t3ByParts, order: 1 },
  { id: 'math204-t3-trig-integrals', slug: 'trigonometric-integrals', title: 'Trigonometric Integrals', content: t3TrigIntegrals, order: 2 },
  { id: 'math204-t3-trig-sub', slug: 'trigonometric-substitution', title: 'Trigonometric Substitution', content: t3TrigSubstitution, order: 3 },
  { id: 'math204-t3-partial', slug: 'partial-fractions', title: 'Partial Fractions', content: t3PartialFractions, order: 4 },
  { id: 'math204-t3-rational', slug: 'rational-functions', title: 'Rational Functions', content: t3RationalFunctions, order: 5 },
  { id: 'math204-t3-strategy', slug: 'integration-strategy', title: 'Integration Strategy', content: t3Strategy, order: 6 },
  { id: 'math204-t3-tables', slug: 'tables-computers', title: 'Tables and Computers', content: t3TablesComputers, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math204-t4-disk-washer', slug: 'volumes-disk-washer', title: 'Volumes: Disk and Washer Methods', content: t4VolumesDiskWasher, order: 1 },
  { id: 'math204-t4-shells', slug: 'volumes-cylindrical-shells', title: 'Volumes: Cylindrical Shells', content: t4VolumesShells, order: 2 },
  { id: 'math204-t4-arc', slug: 'arc-length', title: 'Arc Length', content: t4ArcLength, order: 3 },
  { id: 'math204-t4-surface', slug: 'surface-area-revolution', title: 'Surface Area of Revolution', content: t4SurfaceArea, order: 4 },
  { id: 'math204-t4-work', slug: 'work-applications', title: 'Work Applications', content: t4Work, order: 5 },
  { id: 'math204-t4-hydrostatic', slug: 'hydrostatic-force', title: 'Hydrostatic Force', content: t4HydrostaticForce, order: 6 },
  { id: 'math204-t4-center-mass', slug: 'center-of-mass', title: 'Center of Mass', content: t4CenterMass, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math204-t5-infinite-limits', slug: 'infinite-limits-type1', title: 'Infinite Limits (Type 1)', content: t5InfiniteLimits, order: 1 },
  { id: 'math204-t5-discontinuous', slug: 'discontinuous-type2', title: 'Discontinuous Integrands (Type 2)', content: t5Discontinuous, order: 2 },
  { id: 'math204-t5-comparison', slug: 'comparison-tests', title: 'Comparison Tests', content: t5ComparisonTests, order: 3 },
  { id: 'math204-t5-convergence', slug: 'convergence-criteria', title: 'Convergence Criteria', content: t5ConvergenceCriteria, order: 4 },
  { id: 'math204-t5-gamma', slug: 'gamma-function', title: 'Gamma Function', content: t5GammaFunction, order: 5 },
  { id: 'math204-t5-probability', slug: 'probability-applications', title: 'Probability Applications', content: t5ProbabilityApps, order: 6 },
  { id: 'math204-t5-laplace', slug: 'laplace-transform-intro', title: 'Introduction to Laplace Transform', content: t5LaplaceIntro, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math204-t6-sequences-def', slug: 'sequences-definition', title: 'Sequences Definition', content: t6SequencesDefinition, order: 1 },
  { id: 'math204-t6-seq-properties', slug: 'sequence-properties', title: 'Sequence Properties', content: t6SequenceProperties, order: 2 },
  { id: 'math204-t6-infinite-series', slug: 'infinite-series', title: 'Infinite Series', content: t6InfiniteSeries, order: 3 },
  { id: 'math204-t6-divergence-integral', slug: 'divergence-integral-tests', title: 'Divergence and Integral Tests', content: t6DivergenceIntegral, order: 4 },
  { id: 'math204-t6-comparison', slug: 'comparison-tests-series', title: 'Comparison Tests for Series', content: t6ComparisonTestsSeries, order: 5 },
  { id: 'math204-t6-alternating', slug: 'alternating-series', title: 'Alternating Series', content: t6AlternatingSeries, order: 6 },
  { id: 'math204-t6-ratio-root', slug: 'ratio-root-tests', title: 'Ratio and Root Tests', content: t6RatioRoot, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math204-t7-power-series', slug: 'power-series', title: 'Power Series', content: t7PowerSeries, order: 1 },
  { id: 'math204-t7-operations', slug: 'operations-power-series', title: 'Operations on Power Series', content: t7OperationsPowerSeries, order: 2 },
  { id: 'math204-t7-taylor-def', slug: 'taylor-series-definition', title: 'Taylor Series Definition', content: t7TaylorSeriesDefinition, order: 3 },
  { id: 'math204-t7-common', slug: 'common-series', title: 'Common Series', content: t7CommonSeries, order: 4 },
  { id: 'math204-t7-remainder', slug: 'taylor-remainder', title: 'Taylor Remainder', content: t7TaylorRemainder, order: 5 },
  { id: 'math204-t7-applications', slug: 'applications-taylor', title: 'Applications of Taylor Series', content: t7ApplicationsTaylor, order: 6 },
  { id: 'math204-t7-binomial', slug: 'binomial-series', title: 'Binomial Series', content: t7BinomialSeries, order: 7 },
];

export const math204Topics: Topic[] = [
  {
    id: 'math204-1',
    title: 'Antiderivatives and Indefinite Integrals',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math204-quiz-1a', 'math204-quiz-1b', 'math204-quiz-1c'],
    exerciseIds: [
      'math204-t1-ex01', 'math204-t1-ex02', 'math204-t1-ex03', 'math204-t1-ex04',
      'math204-t1-ex05', 'math204-t1-ex06', 'math204-t1-ex07', 'math204-t1-ex08',
      'math204-t1-ex09', 'math204-t1-ex10', 'math204-t1-ex11', 'math204-t1-ex12',
      'math204-t1-ex13', 'math204-t1-ex14', 'math204-t1-ex15', 'math204-t1-ex16'
    ]
  },
  {
    id: 'math204-2',
    title: 'Definite Integrals and Fundamental Theorem',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math204-quiz-2a', 'math204-quiz-2b', 'math204-quiz-2c'],
    exerciseIds: [
      'math204-t2-ex01', 'math204-t2-ex02', 'math204-t2-ex03', 'math204-t2-ex04',
      'math204-t2-ex05', 'math204-t2-ex06', 'math204-t2-ex07', 'math204-t2-ex08',
      'math204-t2-ex09', 'math204-t2-ex10', 'math204-t2-ex11', 'math204-t2-ex12',
      'math204-t2-ex13', 'math204-t2-ex14', 'math204-t2-ex15', 'math204-t2-ex16'
    ]
  },
  {
    id: 'math204-3',
    title: 'Integration Techniques',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math204-quiz-3a', 'math204-quiz-3b', 'math204-quiz-3c'],
    exerciseIds: [
      'math204-t3-ex01', 'math204-t3-ex02', 'math204-t3-ex03', 'math204-t3-ex04',
      'math204-t3-ex05', 'math204-t3-ex06', 'math204-t3-ex07', 'math204-t3-ex08',
      'math204-t3-ex09', 'math204-t3-ex10', 'math204-t3-ex11', 'math204-t3-ex12',
      'math204-t3-ex13', 'math204-t3-ex14', 'math204-t3-ex15', 'math204-t3-ex16'
    ]
  },
  {
    id: 'math204-4',
    title: 'Applications of Integration',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math204-quiz-4a', 'math204-quiz-4b', 'math204-quiz-4c'],
    exerciseIds: [
      'math204-t4-ex01', 'math204-t4-ex02', 'math204-t4-ex03', 'math204-t4-ex04',
      'math204-t4-ex05', 'math204-t4-ex06', 'math204-t4-ex07', 'math204-t4-ex08',
      'math204-t4-ex09', 'math204-t4-ex10', 'math204-t4-ex11', 'math204-t4-ex12',
      'math204-t4-ex13', 'math204-t4-ex14', 'math204-t4-ex15', 'math204-t4-ex16'
    ]
  },
  {
    id: 'math204-5',
    title: 'Improper Integrals',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math204-quiz-5a', 'math204-quiz-5b', 'math204-quiz-5c'],
    exerciseIds: [
      'math204-t5-ex01', 'math204-t5-ex02', 'math204-t5-ex03', 'math204-t5-ex04',
      'math204-t5-ex05', 'math204-t5-ex06', 'math204-t5-ex07', 'math204-t5-ex08',
      'math204-t5-ex09', 'math204-t5-ex10', 'math204-t5-ex11', 'math204-t5-ex12',
      'math204-t5-ex13', 'math204-t5-ex14', 'math204-t5-ex15', 'math204-t5-ex16'
    ]
  },
  {
    id: 'math204-6',
    title: 'Sequences and Series',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math204-quiz-6a', 'math204-quiz-6b', 'math204-quiz-6c'],
    exerciseIds: [
      'math204-t6-ex01', 'math204-t6-ex02', 'math204-t6-ex03', 'math204-t6-ex04',
      'math204-t6-ex05', 'math204-t6-ex06', 'math204-t6-ex07', 'math204-t6-ex08',
      'math204-t6-ex09', 'math204-t6-ex10', 'math204-t6-ex11', 'math204-t6-ex12',
      'math204-t6-ex13', 'math204-t6-ex14', 'math204-t6-ex15', 'math204-t6-ex16'
    ]
  },
  {
    id: 'math204-7',
    title: 'Taylor and Maclaurin Series',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math204-quiz-7a', 'math204-quiz-7b', 'math204-quiz-7c'],
    exerciseIds: [
      'math204-t7-ex01', 'math204-t7-ex02', 'math204-t7-ex03', 'math204-t7-ex04',
      'math204-t7-ex05', 'math204-t7-ex06', 'math204-t7-ex07', 'math204-t7-ex08',
      'math204-t7-ex09', 'math204-t7-ex10', 'math204-t7-ex11', 'math204-t7-ex12',
      'math204-t7-ex13', 'math204-t7-ex14', 'math204-t7-ex15', 'math204-t7-ex16'
    ]
  }
];
