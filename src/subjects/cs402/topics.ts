/**
 * CS402 Topics
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
    title: 'Machine Learning Overview',
  },
  {
    number: 1,
    title: 'Machine Learning Overview',
  },
  {
    number: 1,
    title: 'Linear Regression',
  },
  {
    number: 1,
    title: 'Decision Trees',
  },
  {
    number: 1,
    title: 'The Perceptron',
  },
  {
    number: 1,
    title: 'Introduction to Deep Learning',
  },
  {
    number: 1,
    title: 'K-Means Clustering',
  },
  {
    number: 1,
    title: 'Train-Test Split',
  },
  {
    number: 2,
    title: 'ML Workflow',
  },
  {
    number: 2,
    title: 'Linear and Logistic Regression',
  },
  {
    number: 2,
    title: 'Gradient Descent',
  },
  {
    number: 2,
    title: 'Random Forests',
  },
  {
    number: 2,
    title: 'Activation Functions',
  },
  {
    number: 2,
    title: 'Convolutional Neural Networks',
  },
  {
    number: 2,
    title: 'Hierarchical Clustering',
  },
  {
    number: 2,
    title: 'Cross-Validation',
  },
  {
    number: 3,
    title: 'Supervised vs Unsupervised Learning',
  },
  {
    number: 3,
    title: 'Regularization Techniques',
  },
  {
    number: 3,
    title: 'Classification Algorithms',
  },
  {
    number: 3,
    title: 'Support Vector Machines',
  },
  {
    number: 3,
    title: 'Backpropagation',
  },
  {
    number: 3,
    title: 'Recurrent Neural Networks',
  },
  {
    number: 3,
    title: 'DBSCAN',
  },
  {
    number: 3,
    title: 'Performance Metrics',
  },
  {
    number: 4,
    title: 'Feature Engineering',
  },
  {
    number: 4,
    title: 'Logistic Regression',
  },
  {
    number: 4,
    title: 'K-Nearest Neighbors',
  },
  {
    number: 4,
    title: 'Neural Networks',
  },
  {
    number: 4,
    title: 'Feedforward Networks',
  },
  {
    number: 4,
    title: 'LSTM and GRU',
  },
  {
    number: 4,
    title: 'Dimensionality Reduction',
  },
  {
    number: 4,
    title: 'Confusion Matrix',
  },
  {
    number: 5,
    title: 'Data Preprocessing',
  },
  {
    number: 5,
    title: 'Multiclass Classification',
  },
  {
    number: 5,
    title: 'Naive Bayes',
  },
  {
    number: 5,
    title: 'Network Architecture Design',
  },
  {
    number: 5,
    title: 'Deep Learning',
  },
  {
    number: 5,
    title: 'Transfer Learning',
  },
  {
    number: 5,
    title: 'Principal Component Analysis',
  },
  {
    number: 5,
    title: 'ROC and AUC',
  },
  {
    number: 6,
    title: 'Bias-Variance Tradeoff',
  },
  {
    number: 6,
    title: 'Cost Functions',
  },
  {
    number: 6,
    title: 'Ensemble Methods',
  },
  {
    number: 6,
    title: 'Weight Initialization',
  },
  {
    number: 6,
    title: 'Attention and Transformers',
  },
  {
    number: 6,
    title: 'Clustering and Unsupervised Learning',
  },
  {
    number: 6,
    title: 'Anomaly Detection',
  },
  {
    number: 6,
    title: 'Hyperparameter Tuning',
  },
  {
    number: 7,
    title: 'ML Frameworks and Tools',
    quizIds: ['cs402-quiz-1-1', 'cs402-quiz-1-2', 'cs402-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Optimization Techniques',
    quizIds: ['cs402-quiz-2-1', 'cs402-quiz-2-2', 'cs402-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Boosting Algorithms',
    quizIds: ['cs402-quiz-3-1', 'cs402-quiz-3-2', 'cs402-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Neural Network Training',
    quizIds: ['cs402-quiz-4-1', 'cs402-quiz-4-2', 'cs402-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Generative Models',
    quizIds: ['cs402-quiz-5-1', 'cs402-quiz-5-2', 'cs402-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Association Rules',
    quizIds: ['cs402-quiz-6-1', 'cs402-quiz-6-2', 'cs402-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Model Evaluation and Selection',
  },
  {
    number: 7,
    title: 'Model Selection',
    quizIds: ['cs402-quiz-7-1', 'cs402-quiz-7-2', 'cs402-quiz-7-3'],
  },
];

export const cs402Topics: Topic[] = buildTopicsFromGlob('cs402', content, topicConfigs);
