import { Topic, Subtopic } from '../../../core/types';
import topic1Content from '../../../content/subjects/math203/topic-1.md?raw';
import topic2Content from '../../../content/subjects/math203/topic-2.md?raw';
import topic3Content from '../../../content/subjects/math203/topic-3.md?raw';
import topic4Content from '../../../content/subjects/math203/topic-4.md?raw';
import topic5Content from '../../../content/subjects/math203/topic-5.md?raw';
import topic6Content from '../../../content/subjects/math203/topic-6.md?raw';
import topic7Content from '../../../content/subjects/math203/topic-7.md?raw';

// Topic 1 Subtopics: Limits and Continuity
import t1Introduction from '../../../content/subjects/math203/topic-1/01-introduction.md?raw';
import t1EvaluatingLimits from '../../../content/subjects/math203/topic-1/02-evaluating-limits.md?raw';
import t1OneSidedLimits from '../../../content/subjects/math203/topic-1/03-one-sided-limits.md?raw';
import t1Continuity from '../../../content/subjects/math203/topic-1/04-continuity.md?raw';
import t1SqueezeTheorem from '../../../content/subjects/math203/topic-1/05-squeeze-theorem.md?raw';
import t1LimitsAtInfinity from '../../../content/subjects/math203/topic-1/06-limits-at-infinity.md?raw';
import t1LHopitals from '../../../content/subjects/math203/topic-1/07-lhopitals-rule.md?raw';

// Topic 2 Subtopics: Definition of the Derivative
import t2RatesOfChange from '../../../content/subjects/math203/topic-2/01-rates-of-change.md?raw';
import t2LimitDefinition from '../../../content/subjects/math203/topic-2/02-limit-definition.md?raw';
import t2Differentiability from '../../../content/subjects/math203/topic-2/03-differentiability.md?raw';
import t2DerivativeNotation from '../../../content/subjects/math203/topic-2/04-derivative-notation.md?raw';
import t2TangentLines from '../../../content/subjects/math203/topic-2/05-tangent-lines.md?raw';
import t2HigherDerivatives from '../../../content/subjects/math203/topic-2/06-higher-derivatives.md?raw';

// Topic 3 Subtopics: Differentiation Rules
import t3BasicRules from '../../../content/subjects/math203/topic-3/01-basic-rules.md?raw';
import t3ProductQuotient from '../../../content/subjects/math203/topic-3/02-product-quotient-rules.md?raw';
import t3ChainRule from '../../../content/subjects/math203/topic-3/03-chain-rule.md?raw';
import t3TrigDerivatives from '../../../content/subjects/math203/topic-3/04-trig-derivatives.md?raw';
import t3ExpLogDerivatives from '../../../content/subjects/math203/topic-3/05-exponential-log-derivatives.md?raw';
import t3ImplicitDiff from '../../../content/subjects/math203/topic-3/06-implicit-differentiation.md?raw';

// Topic 4 Subtopics: Applications of Derivatives
import t4CriticalPoints from '../../../content/subjects/math203/topic-4/01-critical-points.md?raw';
import t4SecondDerivativeTest from '../../../content/subjects/math203/topic-4/02-second-derivative-test.md?raw';
import t4ConcavityInflection from '../../../content/subjects/math203/topic-4/03-concavity-inflection.md?raw';
import t4MeanValueTheorem from '../../../content/subjects/math203/topic-4/04-mean-value-theorem.md?raw';
import t4IncreasingDecreasing from '../../../content/subjects/math203/topic-4/05-increasing-decreasing.md?raw';
import t4ExtremeValueTheorem from '../../../content/subjects/math203/topic-4/06-extreme-value-theorem.md?raw';

// Topic 5 Subtopics: Optimization Problems
import t5OptIntroduction from '../../../content/subjects/math203/topic-5/01-optimization-introduction.md?raw';
import t5GeometricOpt from '../../../content/subjects/math203/topic-5/02-geometric-optimization.md?raw';
import t5DistanceOpt from '../../../content/subjects/math203/topic-5/03-distance-optimization.md?raw';
import t5AppliedOpt from '../../../content/subjects/math203/topic-5/04-applied-optimization.md?raw';
import t5OptStrategies from '../../../content/subjects/math203/topic-5/05-optimization-strategies.md?raw';

// Topic 6 Subtopics: Related Rates
import t6RRIntroduction from '../../../content/subjects/math203/topic-6/01-related-rates-introduction.md?raw';
import t6SettingUp from '../../../content/subjects/math203/topic-6/02-setting-up-problems.md?raw';
import t6GeometricRR from '../../../content/subjects/math203/topic-6/03-geometric-related-rates.md?raw';
import t6MotionProblems from '../../../content/subjects/math203/topic-6/04-motion-problems.md?raw';
import t6AngularRates from '../../../content/subjects/math203/topic-6/05-angular-rates.md?raw';
import t6RRStrategies from '../../../content/subjects/math203/topic-6/06-problem-solving-strategies.md?raw';

// Topic 7 Subtopics: Curve Sketching
import t7CurveOverview from '../../../content/subjects/math203/topic-7/01-curve-sketching-overview.md?raw';
import t7Asymptotes from '../../../content/subjects/math203/topic-7/02-asymptotes.md?raw';
import t7FirstDerivative from '../../../content/subjects/math203/topic-7/03-first-derivative-analysis.md?raw';
import t7SecondDerivative from '../../../content/subjects/math203/topic-7/04-second-derivative-analysis.md?raw';
import t7CompleteSketching from '../../../content/subjects/math203/topic-7/05-complete-curve-sketching.md?raw';
import t7SpecialFunctions from '../../../content/subjects/math203/topic-7/06-special-functions.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math203-t1-intro', slug: 'introduction', title: 'Introduction to Limits', content: t1Introduction, order: 1 },
  { id: 'math203-t1-evaluating', slug: 'evaluating-limits', title: 'Evaluating Limits', content: t1EvaluatingLimits, order: 2 },
  { id: 'math203-t1-onesided', slug: 'one-sided-limits', title: 'One-Sided Limits', content: t1OneSidedLimits, order: 3 },
  { id: 'math203-t1-continuity', slug: 'continuity', title: 'Continuity', content: t1Continuity, order: 4 },
  { id: 'math203-t1-squeeze', slug: 'squeeze-theorem', title: 'The Squeeze Theorem', content: t1SqueezeTheorem, order: 5 },
  { id: 'math203-t1-infinity', slug: 'limits-at-infinity', title: 'Limits at Infinity', content: t1LimitsAtInfinity, order: 6 },
  { id: 'math203-t1-lhopital', slug: 'lhopitals-rule', title: "L'Hôpital's Rule", content: t1LHopitals, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math203-t2-rates', slug: 'rates-of-change', title: 'Rates of Change', content: t2RatesOfChange, order: 1 },
  { id: 'math203-t2-limit-def', slug: 'limit-definition', title: 'The Limit Definition', content: t2LimitDefinition, order: 2 },
  { id: 'math203-t2-differentiability', slug: 'differentiability', title: 'Differentiability', content: t2Differentiability, order: 3 },
  { id: 'math203-t2-notation', slug: 'derivative-notation', title: 'Derivative Notation', content: t2DerivativeNotation, order: 4 },
  { id: 'math203-t2-tangent', slug: 'tangent-lines', title: 'Tangent Lines', content: t2TangentLines, order: 5 },
  { id: 'math203-t2-higher', slug: 'higher-derivatives', title: 'Higher Derivatives', content: t2HigherDerivatives, order: 6 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math203-t3-basic', slug: 'basic-rules', title: 'Basic Differentiation Rules', content: t3BasicRules, order: 1 },
  { id: 'math203-t3-product-quotient', slug: 'product-quotient-rules', title: 'Product and Quotient Rules', content: t3ProductQuotient, order: 2 },
  { id: 'math203-t3-chain', slug: 'chain-rule', title: 'The Chain Rule', content: t3ChainRule, order: 3 },
  { id: 'math203-t3-trig', slug: 'trig-derivatives', title: 'Trigonometric Derivatives', content: t3TrigDerivatives, order: 4 },
  { id: 'math203-t3-exp-log', slug: 'exponential-log-derivatives', title: 'Exponential and Logarithmic Derivatives', content: t3ExpLogDerivatives, order: 5 },
  { id: 'math203-t3-implicit', slug: 'implicit-differentiation', title: 'Implicit Differentiation', content: t3ImplicitDiff, order: 6 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math203-t4-critical', slug: 'critical-points', title: 'Critical Points', content: t4CriticalPoints, order: 1 },
  { id: 'math203-t4-second-test', slug: 'second-derivative-test', title: 'The Second Derivative Test', content: t4SecondDerivativeTest, order: 2 },
  { id: 'math203-t4-concavity', slug: 'concavity-inflection', title: 'Concavity and Inflection Points', content: t4ConcavityInflection, order: 3 },
  { id: 'math203-t4-mvt', slug: 'mean-value-theorem', title: 'The Mean Value Theorem', content: t4MeanValueTheorem, order: 4 },
  { id: 'math203-t4-increasing', slug: 'increasing-decreasing', title: 'Increasing and Decreasing Functions', content: t4IncreasingDecreasing, order: 5 },
  { id: 'math203-t4-evt', slug: 'extreme-value-theorem', title: 'The Extreme Value Theorem', content: t4ExtremeValueTheorem, order: 6 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math203-t5-intro', slug: 'optimization-introduction', title: 'Introduction to Optimization', content: t5OptIntroduction, order: 1 },
  { id: 'math203-t5-geometric', slug: 'geometric-optimization', title: 'Geometric Optimization Problems', content: t5GeometricOpt, order: 2 },
  { id: 'math203-t5-distance', slug: 'distance-optimization', title: 'Distance Optimization', content: t5DistanceOpt, order: 3 },
  { id: 'math203-t5-applied', slug: 'applied-optimization', title: 'Applied Optimization', content: t5AppliedOpt, order: 4 },
  { id: 'math203-t5-strategies', slug: 'optimization-strategies', title: 'Optimization Strategies', content: t5OptStrategies, order: 5 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math203-t6-intro', slug: 'related-rates-introduction', title: 'Introduction to Related Rates', content: t6RRIntroduction, order: 1 },
  { id: 'math203-t6-setup', slug: 'setting-up-problems', title: 'Setting Up Related Rates Problems', content: t6SettingUp, order: 2 },
  { id: 'math203-t6-geometric', slug: 'geometric-related-rates', title: 'Geometric Related Rates', content: t6GeometricRR, order: 3 },
  { id: 'math203-t6-motion', slug: 'motion-problems', title: 'Motion and Distance Problems', content: t6MotionProblems, order: 4 },
  { id: 'math203-t6-angular', slug: 'angular-rates', title: 'Angular Related Rates', content: t6AngularRates, order: 5 },
  { id: 'math203-t6-strategies', slug: 'problem-solving-strategies', title: 'Problem-Solving Strategies', content: t6RRStrategies, order: 6 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math203-t7-overview', slug: 'curve-sketching-overview', title: 'Curve Sketching Overview', content: t7CurveOverview, order: 1 },
  { id: 'math203-t7-asymptotes', slug: 'asymptotes', title: 'Asymptotes', content: t7Asymptotes, order: 2 },
  { id: 'math203-t7-first', slug: 'first-derivative-analysis', title: 'First Derivative Analysis', content: t7FirstDerivative, order: 3 },
  { id: 'math203-t7-second', slug: 'second-derivative-analysis', title: 'Second Derivative Analysis', content: t7SecondDerivative, order: 4 },
  { id: 'math203-t7-complete', slug: 'complete-curve-sketching', title: 'Complete Curve Sketching', content: t7CompleteSketching, order: 5 },
  { id: 'math203-t7-special', slug: 'special-functions', title: 'Sketching Special Functions', content: t7SpecialFunctions, order: 6 },
];

export const math203Topics: Topic[] = [
  {
    id: 'math203-topic-1',
    title: 'Limits and Continuity',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math203-quiz-1a', 'math203-quiz-1b', 'math203-quiz-1c'],
    exerciseIds: [
      'math203-t1-drill-1',
      'math203-t1-drill-2',
      'math203-t1-drill-3',
      'math203-t1-drill-4',
      'math203-t1-ex01',
      'math203-t1-ex02',
      'math203-t1-ex03',
      'math203-t1-ex04',
      'math203-t1-ex05',
      'math203-t1-ex06',
      'math203-t1-ex07',
      'math203-t1-ex08',
      'math203-t1-ex09',
      'math203-t1-ex10',
      'math203-t1-ex11',
      'math203-t1-ex12',
      'math203-t1-ex13',
      'math203-t1-ex14',
      'math203-t1-ex15',
      'math203-t1-ex16'
    ]
  },
  {
    id: 'math203-topic-2',
    title: 'Definition of the Derivative',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math203-quiz-2a', 'math203-quiz-2b', 'math203-quiz-2c'],
    exerciseIds: [
      'math203-t2-drill-1',
      'math203-t2-drill-2',
      'math203-t2-drill-3',
      'math203-t2-drill-4',
      'math203-t2-ex01',
      'math203-t2-ex02',
      'math203-t2-ex03',
      'math203-t2-ex04',
      'math203-t2-ex05',
      'math203-t2-ex06',
      'math203-t2-ex07',
      'math203-t2-ex08',
      'math203-t2-ex09',
      'math203-t2-ex10',
      'math203-t2-ex11',
      'math203-t2-ex12',
      'math203-t2-ex13',
      'math203-t2-ex14',
      'math203-t2-ex15',
      'math203-t2-ex16'
    ]
  },
  {
    id: 'math203-topic-3',
    title: 'Differentiation Rules',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math203-quiz-3a', 'math203-quiz-3b', 'math203-quiz-3c'],
    exerciseIds: [
      'math203-t3-drill-1',
      'math203-t3-drill-2',
      'math203-t3-drill-3',
      'math203-t3-drill-4',
      'math203-t3-ex01',
      'math203-t3-ex02',
      'math203-t3-ex03',
      'math203-t3-ex04',
      'math203-t3-ex05',
      'math203-t3-ex06',
      'math203-t3-ex07',
      'math203-t3-ex08',
      'math203-t3-ex09',
      'math203-t3-ex10',
      'math203-t3-ex11',
      'math203-t3-ex12',
      'math203-t3-ex13',
      'math203-t3-ex14',
      'math203-t3-ex15',
      'math203-t3-ex16'
    ]
  },
  {
    id: 'math203-topic-4',
    title: 'Applications of Derivatives',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math203-quiz-4a', 'math203-quiz-4b', 'math203-quiz-4c'],
    exerciseIds: [
      'math203-t4-drill-1',
      'math203-t4-drill-2',
      'math203-t4-drill-3',
      'math203-t4-drill-4',
      'math203-t4-ex01',
      'math203-t4-ex02',
      'math203-t4-ex03',
      'math203-t4-ex04',
      'math203-t4-ex05',
      'math203-t4-ex06',
      'math203-t4-ex07',
      'math203-t4-ex08',
      'math203-t4-ex09',
      'math203-t4-ex10',
      'math203-t4-ex11',
      'math203-t4-ex12',
      'math203-t4-ex13',
      'math203-t4-ex14',
      'math203-t4-ex15',
      'math203-t4-ex16'
    ]
  },
  {
    id: 'math203-topic-5',
    title: 'Optimization Problems',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math203-quiz-5a', 'math203-quiz-5b', 'math203-quiz-5c'],
    exerciseIds: [
      'math203-t5-drill-1',
      'math203-t5-drill-2',
      'math203-t5-drill-3',
      'math203-t5-drill-4',
      'math203-t5-ex01',
      'math203-t5-ex02',
      'math203-t5-ex03',
      'math203-t5-ex04',
      'math203-t5-ex05',
      'math203-t5-ex06',
      'math203-t5-ex07',
      'math203-t5-ex08',
      'math203-t5-ex09',
      'math203-t5-ex10',
      'math203-t5-ex11',
      'math203-t5-ex12',
      'math203-t5-ex13',
      'math203-t5-ex14',
      'math203-t5-ex15',
      'math203-t5-ex16'
    ]
  },
  {
    id: 'math203-topic-6',
    title: 'Related Rates',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math203-quiz-6a', 'math203-quiz-6b', 'math203-quiz-6c'],
    exerciseIds: [
      'math203-t6-drill-1',
      'math203-t6-drill-2',
      'math203-t6-drill-3',
      'math203-t6-drill-4',
      'math203-t6-ex01',
      'math203-t6-ex02',
      'math203-t6-ex03',
      'math203-t6-ex04',
      'math203-t6-ex05',
      'math203-t6-ex06',
      'math203-t6-ex07',
      'math203-t6-ex08',
      'math203-t6-ex09',
      'math203-t6-ex10',
      'math203-t6-ex11',
      'math203-t6-ex12',
      'math203-t6-ex13',
      'math203-t6-ex14',
      'math203-t6-ex15',
      'math203-t6-ex16'
    ]
  },
  {
    id: 'math203-topic-7',
    title: 'Curve Sketching',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math203-quiz-7a', 'math203-quiz-7b', 'math203-quiz-7c'],
    exerciseIds: [
      'math203-t7-drill-1',
      'math203-t7-drill-2',
      'math203-t7-drill-3',
      'math203-t7-drill-4',
      'math203-t7-ex01',
      'math203-t7-ex02',
      'math203-t7-ex03',
      'math203-t7-ex04',
      'math203-t7-ex05',
      'math203-t7-ex06',
      'math203-t7-ex07',
      'math203-t7-ex08',
      'math203-t7-ex09',
      'math203-t7-ex10',
      'math203-t7-ex11',
      'math203-t7-ex12',
      'math203-t7-ex13',
      'math203-t7-ex14',
      'math203-t7-ex15',
      'math203-t7-ex16'
    ]
  }
];
