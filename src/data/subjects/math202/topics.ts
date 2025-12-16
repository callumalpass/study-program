import { Topic, Subtopic } from '../../../core/types';
import topic1Content from '../../../content/subjects/math202/topic-1.md?raw';
import topic2Content from '../../../content/subjects/math202/topic-2.md?raw';
import topic3Content from '../../../content/subjects/math202/topic-3.md?raw';
import topic4Content from '../../../content/subjects/math202/topic-4.md?raw';
import topic5Content from '../../../content/subjects/math202/topic-5.md?raw';
import topic6Content from '../../../content/subjects/math202/topic-6.md?raw';
import topic7Content from '../../../content/subjects/math202/topic-7.md?raw';

// Topic 1 Subtopics: Probability Fundamentals
import t1SampleSpaces from '../../../content/subjects/math202/topic-1/01-sample-spaces.md?raw';
import t1ProbabilityAxioms from '../../../content/subjects/math202/topic-1/02-probability-axioms.md?raw';
import t1ConditionalProbability from '../../../content/subjects/math202/topic-1/03-conditional-probability.md?raw';
import t1Independence from '../../../content/subjects/math202/topic-1/04-independence.md?raw';
import t1BayesTheorem from '../../../content/subjects/math202/topic-1/05-bayes-theorem.md?raw';
import t1CountingPrinciples from '../../../content/subjects/math202/topic-1/06-counting-principles.md?raw';
import t1Permutations from '../../../content/subjects/math202/topic-1/07-permutations-combinations.md?raw';

// Topic 2 Subtopics: Random Variables
import t2DiscreteRV from '../../../content/subjects/math202/topic-2/01-discrete-random-variables.md?raw';
import t2ContinuousRV from '../../../content/subjects/math202/topic-2/02-continuous-random-variables.md?raw';
import t2ExpectedValue from '../../../content/subjects/math202/topic-2/03-expected-value.md?raw';
import t2Variance from '../../../content/subjects/math202/topic-2/04-variance.md?raw';
import t2Moments from '../../../content/subjects/math202/topic-2/05-moments.md?raw';
import t2MGF from '../../../content/subjects/math202/topic-2/06-moment-generating-functions.md?raw';
import t2Transformations from '../../../content/subjects/math202/topic-2/07-transformations.md?raw';

// Topic 3 Subtopics: Probability Distributions
import t3Binomial from '../../../content/subjects/math202/topic-3/01-binomial-distribution.md?raw';
import t3Poisson from '../../../content/subjects/math202/topic-3/02-poisson-distribution.md?raw';
import t3Geometric from '../../../content/subjects/math202/topic-3/03-geometric-distribution.md?raw';
import t3Normal from '../../../content/subjects/math202/topic-3/04-normal-distribution.md?raw';
import t3Exponential from '../../../content/subjects/math202/topic-3/05-exponential-distribution.md?raw';
import t3Uniform from '../../../content/subjects/math202/topic-3/06-uniform-distribution.md?raw';
import t3ChiSquare from '../../../content/subjects/math202/topic-3/07-chi-square-t-distributions.md?raw';

// Topic 4 Subtopics: Statistical Inference
import t4PopulationSample from '../../../content/subjects/math202/topic-4/01-population-sample.md?raw';
import t4PointEstimation from '../../../content/subjects/math202/topic-4/02-point-estimation.md?raw';
import t4IntervalEstimation from '../../../content/subjects/math202/topic-4/03-interval-estimation.md?raw';
import t4MLE from '../../../content/subjects/math202/topic-4/04-maximum-likelihood.md?raw';
import t4MethodOfMoments from '../../../content/subjects/math202/topic-4/05-method-of-moments.md?raw';
import t4BiasVariance from '../../../content/subjects/math202/topic-4/06-bias-variance.md?raw';
import t4SamplingDistributions from '../../../content/subjects/math202/topic-4/07-sampling-distributions.md?raw';

// Topic 5 Subtopics: Hypothesis Testing
import t5NullAlternative from '../../../content/subjects/math202/topic-5/01-null-alternative-hypotheses.md?raw';
import t5TypeIII from '../../../content/subjects/math202/topic-5/02-type-i-ii-errors.md?raw';
import t5ZTests from '../../../content/subjects/math202/topic-5/03-z-tests.md?raw';
import t5TTests from '../../../content/subjects/math202/topic-5/04-t-tests.md?raw';
import t5ChiSquareTests from '../../../content/subjects/math202/topic-5/05-chi-square-tests.md?raw';
import t5ANOVA from '../../../content/subjects/math202/topic-5/06-anova.md?raw';
import t5PowerAnalysis from '../../../content/subjects/math202/topic-5/07-power-analysis.md?raw';

// Topic 6 Subtopics: Regression Analysis
import t6SimpleLinear from '../../../content/subjects/math202/topic-6/01-simple-linear-regression.md?raw';
import t6LeastSquares from '../../../content/subjects/math202/topic-6/02-least-squares.md?raw';
import t6RegressionInference from '../../../content/subjects/math202/topic-6/03-regression-inference.md?raw';
import t6ResidualAnalysis from '../../../content/subjects/math202/topic-6/04-residual-analysis.md?raw';
import t6MultipleRegression from '../../../content/subjects/math202/topic-6/05-multiple-regression.md?raw';
import t6ModelSelection from '../../../content/subjects/math202/topic-6/06-model-selection.md?raw';
import t6Diagnostics from '../../../content/subjects/math202/topic-6/07-regression-diagnostics.md?raw';

// Topic 7 Subtopics: Bayesian Inference
import t7BayesianPhilosophy from '../../../content/subjects/math202/topic-7/01-bayesian-philosophy.md?raw';
import t7PriorPosterior from '../../../content/subjects/math202/topic-7/02-prior-posterior.md?raw';
import t7ConjugatePriors from '../../../content/subjects/math202/topic-7/03-conjugate-priors.md?raw';
import t7BayesianEstimation from '../../../content/subjects/math202/topic-7/04-bayesian-estimation.md?raw';
import t7CredibleIntervals from '../../../content/subjects/math202/topic-7/05-credible-intervals.md?raw';
import t7BayesFactors from '../../../content/subjects/math202/topic-7/06-bayes-factors.md?raw';
import t7MCMC from '../../../content/subjects/math202/topic-7/07-mcmc-methods.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math202-t1-sample-spaces', slug: 'sample-spaces', title: 'Sample Spaces and Events', content: t1SampleSpaces, order: 1 },
  { id: 'math202-t1-axioms', slug: 'probability-axioms', title: 'Probability Axioms', content: t1ProbabilityAxioms, order: 2 },
  { id: 'math202-t1-conditional', slug: 'conditional-probability', title: 'Conditional Probability', content: t1ConditionalProbability, order: 3 },
  { id: 'math202-t1-independence', slug: 'independence', title: 'Independence', content: t1Independence, order: 4 },
  { id: 'math202-t1-bayes', slug: 'bayes-theorem', title: "Bayes' Theorem", content: t1BayesTheorem, order: 5 },
  { id: 'math202-t1-counting', slug: 'counting-principles', title: 'Counting Principles', content: t1CountingPrinciples, order: 6 },
  { id: 'math202-t1-permutations', slug: 'permutations-combinations', title: 'Permutations and Combinations', content: t1Permutations, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math202-t2-discrete', slug: 'discrete-random-variables', title: 'Discrete Random Variables', content: t2DiscreteRV, order: 1 },
  { id: 'math202-t2-continuous', slug: 'continuous-random-variables', title: 'Continuous Random Variables', content: t2ContinuousRV, order: 2 },
  { id: 'math202-t2-expected-value', slug: 'expected-value', title: 'Expected Value', content: t2ExpectedValue, order: 3 },
  { id: 'math202-t2-variance', slug: 'variance', title: 'Variance and Standard Deviation', content: t2Variance, order: 4 },
  { id: 'math202-t2-moments', slug: 'moments', title: 'Moments', content: t2Moments, order: 5 },
  { id: 'math202-t2-mgf', slug: 'moment-generating-functions', title: 'Moment Generating Functions', content: t2MGF, order: 6 },
  { id: 'math202-t2-transformations', slug: 'transformations', title: 'Transformations of Random Variables', content: t2Transformations, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math202-t3-binomial', slug: 'binomial-distribution', title: 'Binomial Distribution', content: t3Binomial, order: 1 },
  { id: 'math202-t3-poisson', slug: 'poisson-distribution', title: 'Poisson Distribution', content: t3Poisson, order: 2 },
  { id: 'math202-t3-geometric', slug: 'geometric-distribution', title: 'Geometric Distribution', content: t3Geometric, order: 3 },
  { id: 'math202-t3-normal', slug: 'normal-distribution', title: 'Normal Distribution', content: t3Normal, order: 4 },
  { id: 'math202-t3-exponential', slug: 'exponential-distribution', title: 'Exponential Distribution', content: t3Exponential, order: 5 },
  { id: 'math202-t3-uniform', slug: 'uniform-distribution', title: 'Uniform Distribution', content: t3Uniform, order: 6 },
  { id: 'math202-t3-chi-t', slug: 'chi-square-t-distributions', title: 'Chi-Square and t Distributions', content: t3ChiSquare, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math202-t4-pop-sample', slug: 'population-sample', title: 'Population and Sample', content: t4PopulationSample, order: 1 },
  { id: 'math202-t4-point', slug: 'point-estimation', title: 'Point Estimation', content: t4PointEstimation, order: 2 },
  { id: 'math202-t4-interval', slug: 'interval-estimation', title: 'Interval Estimation', content: t4IntervalEstimation, order: 3 },
  { id: 'math202-t4-mle', slug: 'maximum-likelihood', title: 'Maximum Likelihood Estimation', content: t4MLE, order: 4 },
  { id: 'math202-t4-moments', slug: 'method-of-moments', title: 'Method of Moments', content: t4MethodOfMoments, order: 5 },
  { id: 'math202-t4-bias', slug: 'bias-variance', title: 'Bias and Variance', content: t4BiasVariance, order: 6 },
  { id: 'math202-t4-sampling', slug: 'sampling-distributions', title: 'Sampling Distributions', content: t4SamplingDistributions, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math202-t5-null-alt', slug: 'null-alternative-hypotheses', title: 'Null and Alternative Hypotheses', content: t5NullAlternative, order: 1 },
  { id: 'math202-t5-errors', slug: 'type-i-ii-errors', title: 'Type I and Type II Errors', content: t5TypeIII, order: 2 },
  { id: 'math202-t5-z-tests', slug: 'z-tests', title: 'Z-Tests', content: t5ZTests, order: 3 },
  { id: 'math202-t5-t-tests', slug: 't-tests', title: 't-Tests', content: t5TTests, order: 4 },
  { id: 'math202-t5-chi-tests', slug: 'chi-square-tests', title: 'Chi-Square Tests', content: t5ChiSquareTests, order: 5 },
  { id: 'math202-t5-anova', slug: 'anova', title: 'Analysis of Variance (ANOVA)', content: t5ANOVA, order: 6 },
  { id: 'math202-t5-power', slug: 'power-analysis', title: 'Power Analysis', content: t5PowerAnalysis, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math202-t6-simple', slug: 'simple-linear-regression', title: 'Simple Linear Regression', content: t6SimpleLinear, order: 1 },
  { id: 'math202-t6-least-squares', slug: 'least-squares', title: 'Least Squares Method', content: t6LeastSquares, order: 2 },
  { id: 'math202-t6-inference', slug: 'regression-inference', title: 'Regression Inference', content: t6RegressionInference, order: 3 },
  { id: 'math202-t6-residual', slug: 'residual-analysis', title: 'Residual Analysis', content: t6ResidualAnalysis, order: 4 },
  { id: 'math202-t6-multiple', slug: 'multiple-regression', title: 'Multiple Regression', content: t6MultipleRegression, order: 5 },
  { id: 'math202-t6-selection', slug: 'model-selection', title: 'Model Selection', content: t6ModelSelection, order: 6 },
  { id: 'math202-t6-diagnostics', slug: 'regression-diagnostics', title: 'Regression Diagnostics', content: t6Diagnostics, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math202-t7-philosophy', slug: 'bayesian-philosophy', title: 'Bayesian Philosophy', content: t7BayesianPhilosophy, order: 1 },
  { id: 'math202-t7-prior-posterior', slug: 'prior-posterior', title: 'Prior and Posterior Distributions', content: t7PriorPosterior, order: 2 },
  { id: 'math202-t7-conjugate', slug: 'conjugate-priors', title: 'Conjugate Priors', content: t7ConjugatePriors, order: 3 },
  { id: 'math202-t7-estimation', slug: 'bayesian-estimation', title: 'Bayesian Estimation', content: t7BayesianEstimation, order: 4 },
  { id: 'math202-t7-credible', slug: 'credible-intervals', title: 'Credible Intervals', content: t7CredibleIntervals, order: 5 },
  { id: 'math202-t7-bayes-factors', slug: 'bayes-factors', title: 'Bayes Factors', content: t7BayesFactors, order: 6 },
  { id: 'math202-t7-mcmc', slug: 'mcmc-methods', title: 'MCMC Methods', content: t7MCMC, order: 7 },
];

export const math202Topics: Topic[] = [
  {
    id: 'math202-1',
    title: 'Probability Fundamentals',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math202-quiz-1a', 'math202-quiz-1b', 'math202-quiz-1c'],
    exerciseIds: [
      'math202-t1-ex01',
      'math202-t1-ex02',
      'math202-t1-ex03',
      'math202-t1-ex04',
      'math202-t1-ex05',
      'math202-t1-ex06',
      'math202-t1-ex07',
      'math202-t1-ex08',
      'math202-t1-ex09',
      'math202-t1-ex10',
      'math202-t1-ex11',
      'math202-t1-ex12',
      'math202-t1-ex13',
      'math202-t1-ex14',
      'math202-t1-ex15',
      'math202-t1-ex16'
    ]
  },
  {
    id: 'math202-2',
    title: 'Random Variables',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math202-quiz-2a', 'math202-quiz-2b', 'math202-quiz-2c'],
    exerciseIds: [
      'math202-t2-ex01',
      'math202-t2-ex02',
      'math202-t2-ex03',
      'math202-t2-ex04',
      'math202-t2-ex05',
      'math202-t2-ex06',
      'math202-t2-ex07',
      'math202-t2-ex08',
      'math202-t2-ex09',
      'math202-t2-ex10',
      'math202-t2-ex11',
      'math202-t2-ex12',
      'math202-t2-ex13',
      'math202-t2-ex14',
      'math202-t2-ex15',
      'math202-t2-ex16'
    ]
  },
  {
    id: 'math202-3',
    title: 'Probability Distributions',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math202-quiz-3a', 'math202-quiz-3b', 'math202-quiz-3c'],
    exerciseIds: [
      'math202-t3-ex01',
      'math202-t3-ex02',
      'math202-t3-ex03',
      'math202-t3-ex04',
      'math202-t3-ex05',
      'math202-t3-ex06',
      'math202-t3-ex07',
      'math202-t3-ex08',
      'math202-t3-ex09',
      'math202-t3-ex10',
      'math202-t3-ex11',
      'math202-t3-ex12',
      'math202-t3-ex13',
      'math202-t3-ex14',
      'math202-t3-ex15',
      'math202-t3-ex16'
    ]
  },
  {
    id: 'math202-4',
    title: 'Statistical Inference',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math202-quiz-4a', 'math202-quiz-4b', 'math202-quiz-4c'],
    exerciseIds: [
      'math202-t4-ex01',
      'math202-t4-ex02',
      'math202-t4-ex03',
      'math202-t4-ex04',
      'math202-t4-ex05',
      'math202-t4-ex06',
      'math202-t4-ex07',
      'math202-t4-ex08',
      'math202-t4-ex09',
      'math202-t4-ex10',
      'math202-t4-ex11',
      'math202-t4-ex12',
      'math202-t4-ex13',
      'math202-t4-ex14',
      'math202-t4-ex15',
      'math202-t4-ex16'
    ]
  },
  {
    id: 'math202-5',
    title: 'Hypothesis Testing',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math202-quiz-5a', 'math202-quiz-5b', 'math202-quiz-5c'],
    exerciseIds: [
      'math202-t5-ex01',
      'math202-t5-ex02',
      'math202-t5-ex03',
      'math202-t5-ex04',
      'math202-t5-ex05',
      'math202-t5-ex06',
      'math202-t5-ex07',
      'math202-t5-ex08',
      'math202-t5-ex09',
      'math202-t5-ex10',
      'math202-t5-ex11',
      'math202-t5-ex12',
      'math202-t5-ex13',
      'math202-t5-ex14',
      'math202-t5-ex15',
      'math202-t5-ex16'
    ]
  },
  {
    id: 'math202-6',
    title: 'Regression Analysis',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math202-quiz-6a', 'math202-quiz-6b', 'math202-quiz-6c'],
    exerciseIds: [
      'math202-t6-ex01',
      'math202-t6-ex02',
      'math202-t6-ex03',
      'math202-t6-ex04',
      'math202-t6-ex05',
      'math202-t6-ex06',
      'math202-t6-ex07',
      'math202-t6-ex08',
      'math202-t6-ex09',
      'math202-t6-ex10',
      'math202-t6-ex11',
      'math202-t6-ex12',
      'math202-t6-ex13',
      'math202-t6-ex14',
      'math202-t6-ex15',
      'math202-t6-ex16'
    ]
  },
  {
    id: 'math202-7',
    title: 'Bayesian Inference',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math202-quiz-7a', 'math202-quiz-7b', 'math202-quiz-7c'],
    exerciseIds: [
      'math202-t7-ex01',
      'math202-t7-ex02',
      'math202-t7-ex03',
      'math202-t7-ex04',
      'math202-t7-ex05',
      'math202-t7-ex06',
      'math202-t7-ex07',
      'math202-t7-ex08',
      'math202-t7-ex09',
      'math202-t7-ex10',
      'math202-t7-ex11',
      'math202-t7-ex12',
      'math202-t7-ex13',
      'math202-t7-ex14',
      'math202-t7-ex15',
      'math202-t7-ex16'
    ]
  }
];
