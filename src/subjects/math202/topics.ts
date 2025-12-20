import { Topic, Subtopic } from '../../core/types';
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Topic 1 Subtopics: Probability Fundamentals
import t1SampleSpaces from './content/topic-1/01-sample-spaces-events.md?raw';
import t1CountingPrinciples from './content/topic-1/02-counting-principles.md?raw';
import t1ProbabilityAxioms from './content/topic-1/03-probability-axioms.md?raw';
import t1ConditionalProbability from './content/topic-1/04-conditional-probability.md?raw';
import t1Independence from './content/topic-1/05-independence.md?raw';
import t1BayesTheorem from './content/topic-1/06-bayes-theorem.md?raw';
import t1Applications from './content/topic-1/07-applications-probability.md?raw';

// Topic 2 Subtopics: Random Variables
import t2DiscreteRV from './content/topic-2/01-discrete-random-variables.md?raw';
import t2ContinuousRV from './content/topic-2/02-continuous-random-variables.md?raw';
import t2ExpectedValue from './content/topic-2/03-expected-value.md?raw';
import t2Variance from './content/topic-2/04-variance-standard-deviation.md?raw';
import t2Moments from './content/topic-2/05-moments-mgf.md?raw';
import t2JointDistributions from './content/topic-2/06-joint-distributions.md?raw';
import t2Covariance from './content/topic-2/07-covariance-correlation.md?raw';

// Topic 3 Subtopics: Probability Distributions
import t3Binomial from './content/topic-3/01-bernoulli-binomial.md?raw';
import t3Poisson from './content/topic-3/02-poisson-distribution.md?raw';
import t3Geometric from './content/topic-3/03-geometric-negative-binomial.md?raw';
import t3Uniform from './content/topic-3/04-uniform-distribution.md?raw';
import t3Normal from './content/topic-3/05-normal-distribution.md?raw';
import t3Exponential from './content/topic-3/06-exponential-gamma.md?raw';
import t3CLT from './content/topic-3/07-central-limit-theorem.md?raw';

// Topic 4 Subtopics: Statistical Inference
import t4SamplingDistributions from './content/topic-4/01-sampling-distributions.md?raw';
import t4PointEstimation from './content/topic-4/02-point-estimation.md?raw';
import t4MethodOfMoments from './content/topic-4/03-method-of-moments.md?raw';
import t4MLE from './content/topic-4/04-maximum-likelihood.md?raw';
import t4ConfidenceIntervals from './content/topic-4/05-confidence-intervals.md?raw';
import t4ConfidenceVariance from './content/topic-4/06-confidence-intervals-variance.md?raw';
import t4SampleSize from './content/topic-4/07-sample-size-determination.md?raw';

// Topic 5 Subtopics: Hypothesis Testing
import t5Framework from './content/topic-5/01-hypothesis-testing-framework.md?raw';
import t5TypeErrors from './content/topic-5/02-type-errors-power.md?raw';
import t5ZTests from './content/topic-5/03-z-tests.md?raw';
import t5TTests from './content/topic-5/04-t-tests.md?raw';
import t5PValues from './content/topic-5/05-p-values.md?raw';
import t5ChiSquareTests from './content/topic-5/06-chi-squared-tests.md?raw';
import t5ANOVA from './content/topic-5/07-anova.md?raw';

// Topic 6 Subtopics: Regression Analysis
import t6SimpleLinear from './content/topic-6/01-simple-linear-regression.md?raw';
import t6RegressionInference from './content/topic-6/02-regression-inference.md?raw';
import t6Diagnostics from './content/topic-6/03-model-diagnostics.md?raw';
import t6Correlation from './content/topic-6/04-correlation-determination.md?raw';
import t6MultipleRegression from './content/topic-6/05-multiple-regression.md?raw';
import t6ModelSelection from './content/topic-6/06-model-selection.md?raw';
import t6Applications from './content/topic-6/07-regression-applications.md?raw';

// Topic 7 Subtopics: Bayesian Inference
import t7BayesianFramework from './content/topic-7/01-bayesian-framework.md?raw';
import t7PriorDistributions from './content/topic-7/02-prior-distributions.md?raw';
import t7PosteriorInference from './content/topic-7/03-posterior-inference.md?raw';
import t7BayesianEstimation from './content/topic-7/04-bayesian-estimation.md?raw';
import t7BayesianHypothesis from './content/topic-7/05-bayesian-hypothesis.md?raw';
import t7ComputationalMethods from './content/topic-7/06-computational-methods.md?raw';
import t7BayesianApplications from './content/topic-7/07-bayesian-applications.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math202-t1-sample-spaces', slug: 'sample-spaces-events', title: 'Sample Spaces and Events', content: t1SampleSpaces, order: 1 },
  { id: 'math202-t1-counting', slug: 'counting-principles', title: 'Counting Principles', content: t1CountingPrinciples, order: 2 },
  { id: 'math202-t1-axioms', slug: 'probability-axioms', title: 'Probability Axioms', content: t1ProbabilityAxioms, order: 3 },
  { id: 'math202-t1-conditional', slug: 'conditional-probability', title: 'Conditional Probability', content: t1ConditionalProbability, order: 4 },
  { id: 'math202-t1-independence', slug: 'independence', title: 'Independence', content: t1Independence, order: 5 },
  { id: 'math202-t1-bayes', slug: 'bayes-theorem', title: "Bayes' Theorem", content: t1BayesTheorem, order: 6 },
  { id: 'math202-t1-applications', slug: 'applications-probability', title: 'Applications of Probability', content: t1Applications, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math202-t2-discrete', slug: 'discrete-random-variables', title: 'Discrete Random Variables', content: t2DiscreteRV, order: 1 },
  { id: 'math202-t2-continuous', slug: 'continuous-random-variables', title: 'Continuous Random Variables', content: t2ContinuousRV, order: 2 },
  { id: 'math202-t2-expected-value', slug: 'expected-value', title: 'Expected Value', content: t2ExpectedValue, order: 3 },
  { id: 'math202-t2-variance', slug: 'variance-standard-deviation', title: 'Variance and Standard Deviation', content: t2Variance, order: 4 },
  { id: 'math202-t2-moments', slug: 'moments-mgf', title: 'Moments and MGF', content: t2Moments, order: 5 },
  { id: 'math202-t2-joint', slug: 'joint-distributions', title: 'Joint Distributions', content: t2JointDistributions, order: 6 },
  { id: 'math202-t2-covariance', slug: 'covariance-correlation', title: 'Covariance and Correlation', content: t2Covariance, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math202-t3-binomial', slug: 'bernoulli-binomial', title: 'Bernoulli and Binomial Distributions', content: t3Binomial, order: 1 },
  { id: 'math202-t3-poisson', slug: 'poisson-distribution', title: 'Poisson Distribution', content: t3Poisson, order: 2 },
  { id: 'math202-t3-geometric', slug: 'geometric-negative-binomial', title: 'Geometric and Negative Binomial', content: t3Geometric, order: 3 },
  { id: 'math202-t3-uniform', slug: 'uniform-distribution', title: 'Uniform Distribution', content: t3Uniform, order: 4 },
  { id: 'math202-t3-normal', slug: 'normal-distribution', title: 'Normal Distribution', content: t3Normal, order: 5 },
  { id: 'math202-t3-exponential', slug: 'exponential-gamma', title: 'Exponential and Gamma Distributions', content: t3Exponential, order: 6 },
  { id: 'math202-t3-clt', slug: 'central-limit-theorem', title: 'Central Limit Theorem', content: t3CLT, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math202-t4-sampling', slug: 'sampling-distributions', title: 'Sampling Distributions', content: t4SamplingDistributions, order: 1 },
  { id: 'math202-t4-point', slug: 'point-estimation', title: 'Point Estimation', content: t4PointEstimation, order: 2 },
  { id: 'math202-t4-moments', slug: 'method-of-moments', title: 'Method of Moments', content: t4MethodOfMoments, order: 3 },
  { id: 'math202-t4-mle', slug: 'maximum-likelihood', title: 'Maximum Likelihood Estimation', content: t4MLE, order: 4 },
  { id: 'math202-t4-ci', slug: 'confidence-intervals', title: 'Confidence Intervals', content: t4ConfidenceIntervals, order: 5 },
  { id: 'math202-t4-ci-variance', slug: 'confidence-intervals-variance', title: 'Confidence Intervals for Variance', content: t4ConfidenceVariance, order: 6 },
  { id: 'math202-t4-sample-size', slug: 'sample-size-determination', title: 'Sample Size Determination', content: t4SampleSize, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math202-t5-framework', slug: 'hypothesis-testing-framework', title: 'Hypothesis Testing Framework', content: t5Framework, order: 1 },
  { id: 'math202-t5-errors', slug: 'type-errors-power', title: 'Type Errors and Power', content: t5TypeErrors, order: 2 },
  { id: 'math202-t5-z-tests', slug: 'z-tests', title: 'Z-Tests', content: t5ZTests, order: 3 },
  { id: 'math202-t5-t-tests', slug: 't-tests', title: 't-Tests', content: t5TTests, order: 4 },
  { id: 'math202-t5-p-values', slug: 'p-values', title: 'P-Values', content: t5PValues, order: 5 },
  { id: 'math202-t5-chi-tests', slug: 'chi-squared-tests', title: 'Chi-Squared Tests', content: t5ChiSquareTests, order: 6 },
  { id: 'math202-t5-anova', slug: 'anova', title: 'Analysis of Variance (ANOVA)', content: t5ANOVA, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math202-t6-simple', slug: 'simple-linear-regression', title: 'Simple Linear Regression', content: t6SimpleLinear, order: 1 },
  { id: 'math202-t6-inference', slug: 'regression-inference', title: 'Regression Inference', content: t6RegressionInference, order: 2 },
  { id: 'math202-t6-diagnostics', slug: 'model-diagnostics', title: 'Model Diagnostics', content: t6Diagnostics, order: 3 },
  { id: 'math202-t6-correlation', slug: 'correlation-determination', title: 'Correlation and Determination', content: t6Correlation, order: 4 },
  { id: 'math202-t6-multiple', slug: 'multiple-regression', title: 'Multiple Regression', content: t6MultipleRegression, order: 5 },
  { id: 'math202-t6-selection', slug: 'model-selection', title: 'Model Selection', content: t6ModelSelection, order: 6 },
  { id: 'math202-t6-applications', slug: 'regression-applications', title: 'Regression Applications', content: t6Applications, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math202-t7-framework', slug: 'bayesian-framework', title: 'Bayesian Framework', content: t7BayesianFramework, order: 1 },
  { id: 'math202-t7-priors', slug: 'prior-distributions', title: 'Prior Distributions', content: t7PriorDistributions, order: 2 },
  { id: 'math202-t7-posterior', slug: 'posterior-inference', title: 'Posterior Inference', content: t7PosteriorInference, order: 3 },
  { id: 'math202-t7-estimation', slug: 'bayesian-estimation', title: 'Bayesian Estimation', content: t7BayesianEstimation, order: 4 },
  { id: 'math202-t7-hypothesis', slug: 'bayesian-hypothesis', title: 'Bayesian Hypothesis Testing', content: t7BayesianHypothesis, order: 5 },
  { id: 'math202-t7-computational', slug: 'computational-methods', title: 'Computational Methods', content: t7ComputationalMethods, order: 6 },
  { id: 'math202-t7-applications', slug: 'bayesian-applications', title: 'Bayesian Applications', content: t7BayesianApplications, order: 7 },
];

export const math202Topics: Topic[] = [
  {
    id: 'math202-1',
    title: 'Probability Fundamentals',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math202-quiz-1a', 'math202-quiz-1b', 'math202-quiz-1c'],
    exerciseIds: [
      'math202-t1-ex01', 'math202-t1-ex02', 'math202-t1-ex03', 'math202-t1-ex04',
      'math202-t1-ex05', 'math202-t1-ex06', 'math202-t1-ex07', 'math202-t1-ex08',
      'math202-t1-ex09', 'math202-t1-ex10', 'math202-t1-ex11', 'math202-t1-ex12',
      'math202-t1-ex13', 'math202-t1-ex14', 'math202-t1-ex15', 'math202-t1-ex16'
    ]
  },
  {
    id: 'math202-2',
    title: 'Random Variables',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math202-quiz-2a', 'math202-quiz-2b', 'math202-quiz-2c'],
    exerciseIds: [
      'math202-t2-ex01', 'math202-t2-ex02', 'math202-t2-ex03', 'math202-t2-ex04',
      'math202-t2-ex05', 'math202-t2-ex06', 'math202-t2-ex07', 'math202-t2-ex08',
      'math202-t2-ex09', 'math202-t2-ex10', 'math202-t2-ex11', 'math202-t2-ex12',
      'math202-t2-ex13', 'math202-t2-ex14', 'math202-t2-ex15', 'math202-t2-ex16'
    ]
  },
  {
    id: 'math202-3',
    title: 'Probability Distributions',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math202-quiz-3a', 'math202-quiz-3b', 'math202-quiz-3c'],
    exerciseIds: [
      'math202-t3-ex01', 'math202-t3-ex02', 'math202-t3-ex03', 'math202-t3-ex04',
      'math202-t3-ex05', 'math202-t3-ex06', 'math202-t3-ex07', 'math202-t3-ex08',
      'math202-t3-ex09', 'math202-t3-ex10', 'math202-t3-ex11', 'math202-t3-ex12',
      'math202-t3-ex13', 'math202-t3-ex14', 'math202-t3-ex15', 'math202-t3-ex16'
    ]
  },
  {
    id: 'math202-4',
    title: 'Statistical Inference',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math202-quiz-4a', 'math202-quiz-4b', 'math202-quiz-4c'],
    exerciseIds: [
      'math202-t4-ex01', 'math202-t4-ex02', 'math202-t4-ex03', 'math202-t4-ex04',
      'math202-t4-ex05', 'math202-t4-ex06', 'math202-t4-ex07', 'math202-t4-ex08',
      'math202-t4-ex09', 'math202-t4-ex10', 'math202-t4-ex11', 'math202-t4-ex12',
      'math202-t4-ex13', 'math202-t4-ex14', 'math202-t4-ex15', 'math202-t4-ex16'
    ]
  },
  {
    id: 'math202-5',
    title: 'Hypothesis Testing',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math202-quiz-5a', 'math202-quiz-5b', 'math202-quiz-5c'],
    exerciseIds: [
      'math202-t5-ex01', 'math202-t5-ex02', 'math202-t5-ex03', 'math202-t5-ex04',
      'math202-t5-ex05', 'math202-t5-ex06', 'math202-t5-ex07', 'math202-t5-ex08',
      'math202-t5-ex09', 'math202-t5-ex10', 'math202-t5-ex11', 'math202-t5-ex12',
      'math202-t5-ex13', 'math202-t5-ex14', 'math202-t5-ex15', 'math202-t5-ex16'
    ]
  },
  {
    id: 'math202-6',
    title: 'Regression Analysis',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math202-quiz-6a', 'math202-quiz-6b', 'math202-quiz-6c'],
    exerciseIds: [
      'math202-t6-ex01', 'math202-t6-ex02', 'math202-t6-ex03', 'math202-t6-ex04',
      'math202-t6-ex05', 'math202-t6-ex06', 'math202-t6-ex07', 'math202-t6-ex08',
      'math202-t6-ex09', 'math202-t6-ex10', 'math202-t6-ex11', 'math202-t6-ex12',
      'math202-t6-ex13', 'math202-t6-ex14', 'math202-t6-ex15', 'math202-t6-ex16'
    ]
  },
  {
    id: 'math202-7',
    title: 'Bayesian Inference',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math202-quiz-7a', 'math202-quiz-7b', 'math202-quiz-7c'],
    exerciseIds: [
      'math202-t7-ex01', 'math202-t7-ex02', 'math202-t7-ex03', 'math202-t7-ex04',
      'math202-t7-ex05', 'math202-t7-ex06', 'math202-t7-ex07', 'math202-t7-ex08',
      'math202-t7-ex09', 'math202-t7-ex10', 'math202-t7-ex11', 'math202-t7-ex12',
      'math202-t7-ex13', 'math202-t7-ex14', 'math202-t7-ex15', 'math202-t7-ex16'
    ]
  }
];
