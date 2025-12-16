import { Topic, Subtopic } from '../../../core/types';
import topic1Content from '../../../content/subjects/math204/topic-1.md?raw';
import topic2Content from '../../../content/subjects/math204/topic-2.md?raw';
import topic3Content from '../../../content/subjects/math204/topic-3.md?raw';
import topic4Content from '../../../content/subjects/math204/topic-4.md?raw';
import topic5Content from '../../../content/subjects/math204/topic-5.md?raw';
import topic6Content from '../../../content/subjects/math204/topic-6.md?raw';
import topic7Content from '../../../content/subjects/math204/topic-7.md?raw';

// Topic 1 Subtopics: Antiderivatives and Indefinite Integrals
import t1Introduction from '../../../content/subjects/math204/topic-1/01-introduction.md?raw';
import t1BasicRules from '../../../content/subjects/math204/topic-1/02-basic-rules.md?raw';
import t1Substitution from '../../../content/subjects/math204/topic-1/03-substitution.md?raw';
import t1PowerRule from '../../../content/subjects/math204/topic-1/04-power-rule.md?raw';
import t1TrigIntegrals from '../../../content/subjects/math204/topic-1/05-trig-integrals.md?raw';
import t1ExpLog from '../../../content/subjects/math204/topic-1/06-exponential-logarithmic.md?raw';
import t1InitialValue from '../../../content/subjects/math204/topic-1/07-initial-value-problems.md?raw';

// Topic 2 Subtopics: Definite Integrals and Fundamental Theorem
import t2RiemannSums from '../../../content/subjects/math204/topic-2/01-riemann-sums.md?raw';
import t2DefiniteIntegral from '../../../content/subjects/math204/topic-2/02-definite-integral.md?raw';
import t2FTC1 from '../../../content/subjects/math204/topic-2/03-ftc-part1.md?raw';
import t2FTC2 from '../../../content/subjects/math204/topic-2/04-ftc-part2.md?raw';
import t2Properties from '../../../content/subjects/math204/topic-2/05-properties.md?raw';
import t2Substitution from '../../../content/subjects/math204/topic-2/06-substitution-definite.md?raw';
import t2AverageValue from '../../../content/subjects/math204/topic-2/07-average-value.md?raw';

// Topic 3 Subtopics: Integration Techniques
import t3ByParts from '../../../content/subjects/math204/topic-3/01-integration-by-parts.md?raw';
import t3TrigSubstitution from '../../../content/subjects/math204/topic-3/02-trig-substitution.md?raw';
import t3PartialFractions from '../../../content/subjects/math204/topic-3/03-partial-fractions.md?raw';
import t3TrigIntegrals from '../../../content/subjects/math204/topic-3/04-trig-integrals.md?raw';
import t3NumericalMethods from '../../../content/subjects/math204/topic-3/05-numerical-methods.md?raw';
import t3ImproperSetup from '../../../content/subjects/math204/topic-3/06-improper-integrals-intro.md?raw';
import t3Strategy from '../../../content/subjects/math204/topic-3/07-integration-strategy.md?raw';

// Topic 4 Subtopics: Applications of Integration
import t4AreaBetween from '../../../content/subjects/math204/topic-4/01-area-between-curves.md?raw';
import t4VolumeDisks from '../../../content/subjects/math204/topic-4/02-volume-disks.md?raw';
import t4VolumeWashers from '../../../content/subjects/math204/topic-4/03-volume-washers.md?raw';
import t4VolumeShells from '../../../content/subjects/math204/topic-4/04-volume-shells.md?raw';
import t4ArcLength from '../../../content/subjects/math204/topic-4/05-arc-length.md?raw';
import t4SurfaceArea from '../../../content/subjects/math204/topic-4/06-surface-area.md?raw';
import t4Work from '../../../content/subjects/math204/topic-4/07-work-physics.md?raw';

// Topic 5 Subtopics: Improper Integrals
import t5InfiniteLimits from '../../../content/subjects/math204/topic-5/01-infinite-limits.md?raw';
import t5InfiniteDiscontinuities from '../../../content/subjects/math204/topic-5/02-infinite-discontinuities.md?raw';
import t5ComparisonTest from '../../../content/subjects/math204/topic-5/03-comparison-test.md?raw';
import t5LimitComparison from '../../../content/subjects/math204/topic-5/04-limit-comparison.md?raw';
import t5PTest from '../../../content/subjects/math204/topic-5/05-p-test.md?raw';
import t5Convergence from '../../../content/subjects/math204/topic-5/06-convergence-tests.md?raw';
import t5Applications from '../../../content/subjects/math204/topic-5/07-applications.md?raw';

// Topic 6 Subtopics: Sequences and Series
import t6Sequences from '../../../content/subjects/math204/topic-6/01-sequences.md?raw';
import t6SeriesIntro from '../../../content/subjects/math204/topic-6/02-series-introduction.md?raw';
import t6GeometricSeries from '../../../content/subjects/math204/topic-6/03-geometric-series.md?raw';
import t6IntegralTest from '../../../content/subjects/math204/topic-6/04-integral-test.md?raw';
import t6ComparisonTests from '../../../content/subjects/math204/topic-6/05-comparison-tests.md?raw';
import t6AlternatingTest from '../../../content/subjects/math204/topic-6/06-alternating-series.md?raw';
import t6RatioRoot from '../../../content/subjects/math204/topic-6/07-ratio-root-tests.md?raw';

// Topic 7 Subtopics: Taylor and Maclaurin Series
import t7PowerSeries from '../../../content/subjects/math204/topic-7/01-power-series.md?raw';
import t7RadiusConvergence from '../../../content/subjects/math204/topic-7/02-radius-convergence.md?raw';
import t7TaylorSeries from '../../../content/subjects/math204/topic-7/03-taylor-series.md?raw';
import t7MaclaurinSeries from '../../../content/subjects/math204/topic-7/04-maclaurin-series.md?raw';
import t7TaylorPolynomials from '../../../content/subjects/math204/topic-7/05-taylor-polynomials.md?raw';
import t7ErrorEstimation from '../../../content/subjects/math204/topic-7/06-error-estimation.md?raw';
import t7Applications from '../../../content/subjects/math204/topic-7/07-applications.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math204-t1-intro', slug: 'introduction', title: 'Introduction to Antiderivatives', content: t1Introduction, order: 1 },
  { id: 'math204-t1-basic', slug: 'basic-rules', title: 'Basic Integration Rules', content: t1BasicRules, order: 2 },
  { id: 'math204-t1-substitution', slug: 'substitution', title: 'U-Substitution', content: t1Substitution, order: 3 },
  { id: 'math204-t1-power', slug: 'power-rule', title: 'Power Rule for Integration', content: t1PowerRule, order: 4 },
  { id: 'math204-t1-trig', slug: 'trig-integrals', title: 'Trigonometric Integrals', content: t1TrigIntegrals, order: 5 },
  { id: 'math204-t1-exp', slug: 'exponential-logarithmic', title: 'Exponential and Logarithmic Integration', content: t1ExpLog, order: 6 },
  { id: 'math204-t1-initial', slug: 'initial-value-problems', title: 'Initial Value Problems', content: t1InitialValue, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math204-t2-riemann', slug: 'riemann-sums', title: 'Riemann Sums', content: t2RiemannSums, order: 1 },
  { id: 'math204-t2-definite', slug: 'definite-integral', title: 'The Definite Integral', content: t2DefiniteIntegral, order: 2 },
  { id: 'math204-t2-ftc1', slug: 'ftc-part1', title: 'Fundamental Theorem Part 1', content: t2FTC1, order: 3 },
  { id: 'math204-t2-ftc2', slug: 'ftc-part2', title: 'Fundamental Theorem Part 2', content: t2FTC2, order: 4 },
  { id: 'math204-t2-properties', slug: 'properties', title: 'Properties of Definite Integrals', content: t2Properties, order: 5 },
  { id: 'math204-t2-substitution', slug: 'substitution-definite', title: 'Substitution with Definite Integrals', content: t2Substitution, order: 6 },
  { id: 'math204-t2-average', slug: 'average-value', title: 'Average Value of a Function', content: t2AverageValue, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math204-t3-byparts', slug: 'integration-by-parts', title: 'Integration by Parts', content: t3ByParts, order: 1 },
  { id: 'math204-t3-trigsub', slug: 'trig-substitution', title: 'Trigonometric Substitution', content: t3TrigSubstitution, order: 2 },
  { id: 'math204-t3-partial', slug: 'partial-fractions', title: 'Partial Fractions', content: t3PartialFractions, order: 3 },
  { id: 'math204-t3-trig', slug: 'trig-integrals', title: 'Trigonometric Integrals', content: t3TrigIntegrals, order: 4 },
  { id: 'math204-t3-numerical', slug: 'numerical-methods', title: 'Numerical Integration', content: t3NumericalMethods, order: 5 },
  { id: 'math204-t3-improper', slug: 'improper-integrals-intro', title: 'Introduction to Improper Integrals', content: t3ImproperSetup, order: 6 },
  { id: 'math204-t3-strategy', slug: 'integration-strategy', title: 'Integration Strategy', content: t3Strategy, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math204-t4-area', slug: 'area-between-curves', title: 'Area Between Curves', content: t4AreaBetween, order: 1 },
  { id: 'math204-t4-disks', slug: 'volume-disks', title: 'Volume by Disks', content: t4VolumeDisks, order: 2 },
  { id: 'math204-t4-washers', slug: 'volume-washers', title: 'Volume by Washers', content: t4VolumeWashers, order: 3 },
  { id: 'math204-t4-shells', slug: 'volume-shells', title: 'Volume by Cylindrical Shells', content: t4VolumeShells, order: 4 },
  { id: 'math204-t4-arclength', slug: 'arc-length', title: 'Arc Length', content: t4ArcLength, order: 5 },
  { id: 'math204-t4-surface', slug: 'surface-area', title: 'Surface Area of Revolution', content: t4SurfaceArea, order: 6 },
  { id: 'math204-t4-work', slug: 'work-physics', title: 'Work and Physics Applications', content: t4Work, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math204-t5-infinite', slug: 'infinite-limits', title: 'Improper Integrals with Infinite Limits', content: t5InfiniteLimits, order: 1 },
  { id: 'math204-t5-discontinuities', slug: 'infinite-discontinuities', title: 'Infinite Discontinuities', content: t5InfiniteDiscontinuities, order: 2 },
  { id: 'math204-t5-comparison', slug: 'comparison-test', title: 'Direct Comparison Test', content: t5ComparisonTest, order: 3 },
  { id: 'math204-t5-limitcomp', slug: 'limit-comparison', title: 'Limit Comparison Test', content: t5LimitComparison, order: 4 },
  { id: 'math204-t5-ptest', slug: 'p-test', title: 'The p-Test', content: t5PTest, order: 5 },
  { id: 'math204-t5-convergence', slug: 'convergence-tests', title: 'Convergence Tests Summary', content: t5Convergence, order: 6 },
  { id: 'math204-t5-applications', slug: 'applications', title: 'Applications of Improper Integrals', content: t5Applications, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math204-t6-sequences', slug: 'sequences', title: 'Sequences', content: t6Sequences, order: 1 },
  { id: 'math204-t6-series', slug: 'series-introduction', title: 'Introduction to Series', content: t6SeriesIntro, order: 2 },
  { id: 'math204-t6-geometric', slug: 'geometric-series', title: 'Geometric Series', content: t6GeometricSeries, order: 3 },
  { id: 'math204-t6-integral', slug: 'integral-test', title: 'The Integral Test', content: t6IntegralTest, order: 4 },
  { id: 'math204-t6-comparison', slug: 'comparison-tests', title: 'Comparison Tests for Series', content: t6ComparisonTests, order: 5 },
  { id: 'math204-t6-alternating', slug: 'alternating-series', title: 'Alternating Series Test', content: t6AlternatingTest, order: 6 },
  { id: 'math204-t6-ratioroot', slug: 'ratio-root-tests', title: 'Ratio and Root Tests', content: t6RatioRoot, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math204-t7-power', slug: 'power-series', title: 'Power Series', content: t7PowerSeries, order: 1 },
  { id: 'math204-t7-radius', slug: 'radius-convergence', title: 'Radius and Interval of Convergence', content: t7RadiusConvergence, order: 2 },
  { id: 'math204-t7-taylor', slug: 'taylor-series', title: 'Taylor Series', content: t7TaylorSeries, order: 3 },
  { id: 'math204-t7-maclaurin', slug: 'maclaurin-series', title: 'Maclaurin Series', content: t7MaclaurinSeries, order: 4 },
  { id: 'math204-t7-polynomials', slug: 'taylor-polynomials', title: 'Taylor Polynomials', content: t7TaylorPolynomials, order: 5 },
  { id: 'math204-t7-error', slug: 'error-estimation', title: 'Error Estimation', content: t7ErrorEstimation, order: 6 },
  { id: 'math204-t7-applications', slug: 'applications', title: 'Applications of Taylor Series', content: t7Applications, order: 7 },
];

export const math204Topics: Topic[] = [
  {
    id: 'math204-1',
    title: 'Antiderivatives and Indefinite Integrals',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math204-quiz-1a', 'math204-quiz-1b', 'math204-quiz-1c'],
    exerciseIds: [
      'math204-t1-drill-1',
      'math204-t1-drill-2',
      'math204-t1-drill-3',
      'math204-t1-drill-4',
      'math204-t1-ex01',
      'math204-t1-ex02',
      'math204-t1-ex03',
      'math204-t1-ex04',
      'math204-t1-ex05',
      'math204-t1-ex06',
      'math204-t1-ex07',
      'math204-t1-ex08',
      'math204-t1-ex09',
      'math204-t1-ex10',
      'math204-t1-ex11',
      'math204-t1-ex12'
    ]
  },
  {
    id: 'math204-2',
    title: 'Definite Integrals and Fundamental Theorem',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math204-quiz-2a', 'math204-quiz-2b', 'math204-quiz-2c'],
    exerciseIds: [
      'math204-t2-drill-1',
      'math204-t2-drill-2',
      'math204-t2-drill-3',
      'math204-t2-drill-4',
      'math204-t2-ex01',
      'math204-t2-ex02',
      'math204-t2-ex03',
      'math204-t2-ex04',
      'math204-t2-ex05',
      'math204-t2-ex06',
      'math204-t2-ex07',
      'math204-t2-ex08',
      'math204-t2-ex09',
      'math204-t2-ex10',
      'math204-t2-ex11',
      'math204-t2-ex12'
    ]
  },
  {
    id: 'math204-3',
    title: 'Integration Techniques',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math204-quiz-3a', 'math204-quiz-3b', 'math204-quiz-3c'],
    exerciseIds: [
      'math204-t3-drill-1',
      'math204-t3-drill-2',
      'math204-t3-drill-3',
      'math204-t3-drill-4',
      'math204-t3-ex01',
      'math204-t3-ex02',
      'math204-t3-ex03',
      'math204-t3-ex04',
      'math204-t3-ex05',
      'math204-t3-ex06',
      'math204-t3-ex07',
      'math204-t3-ex08',
      'math204-t3-ex09',
      'math204-t3-ex10',
      'math204-t3-ex11',
      'math204-t3-ex12'
    ]
  },
  {
    id: 'math204-4',
    title: 'Applications of Integration',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math204-quiz-4a', 'math204-quiz-4b', 'math204-quiz-4c'],
    exerciseIds: [
      'math204-t4-drill-1',
      'math204-t4-drill-2',
      'math204-t4-drill-3',
      'math204-t4-drill-4',
      'math204-t4-ex01',
      'math204-t4-ex02',
      'math204-t4-ex03',
      'math204-t4-ex04',
      'math204-t4-ex05',
      'math204-t4-ex06',
      'math204-t4-ex07',
      'math204-t4-ex08',
      'math204-t4-ex09',
      'math204-t4-ex10',
      'math204-t4-ex11',
      'math204-t4-ex12'
    ]
  },
  {
    id: 'math204-5',
    title: 'Improper Integrals',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math204-quiz-5a', 'math204-quiz-5b', 'math204-quiz-5c'],
    exerciseIds: [
      'math204-t5-drill-1',
      'math204-t5-drill-2',
      'math204-t5-drill-3',
      'math204-t5-drill-4',
      'math204-t5-ex01',
      'math204-t5-ex02',
      'math204-t5-ex03',
      'math204-t5-ex04',
      'math204-t5-ex05',
      'math204-t5-ex06',
      'math204-t5-ex07',
      'math204-t5-ex08',
      'math204-t5-ex09',
      'math204-t5-ex10',
      'math204-t5-ex11',
      'math204-t5-ex12'
    ]
  },
  {
    id: 'math204-6',
    title: 'Sequences and Series',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math204-quiz-6a', 'math204-quiz-6b', 'math204-quiz-6c'],
    exerciseIds: [
      'math204-t6-drill-1',
      'math204-t6-drill-2',
      'math204-t6-drill-3',
      'math204-t6-drill-4',
      'math204-t6-ex01',
      'math204-t6-ex02',
      'math204-t6-ex03',
      'math204-t6-ex04',
      'math204-t6-ex05',
      'math204-t6-ex06',
      'math204-t6-ex07',
      'math204-t6-ex08',
      'math204-t6-ex09',
      'math204-t6-ex10',
      'math204-t6-ex11',
      'math204-t6-ex12'
    ]
  },
  {
    id: 'math204-7',
    title: 'Taylor and Maclaurin Series',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math204-quiz-7a', 'math204-quiz-7b', 'math204-quiz-7c'],
    exerciseIds: [
      'math204-t7-drill-1',
      'math204-t7-drill-2',
      'math204-t7-drill-3',
      'math204-t7-drill-4',
      'math204-t7-ex01',
      'math204-t7-ex02',
      'math204-t7-ex03',
      'math204-t7-ex04',
      'math204-t7-ex05',
      'math204-t7-ex06',
      'math204-t7-ex07',
      'math204-t7-ex08',
      'math204-t7-ex09',
      'math204-t7-ex10',
      'math204-t7-ex11',
      'math204-t7-ex12'
    ]
  }
];
