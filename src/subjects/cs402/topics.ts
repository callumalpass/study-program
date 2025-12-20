import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-ml-introduction.md?raw';
import topic1_2 from './content/topic-1/02-ml-workflow.md?raw';
import topic1_3 from './content/topic-1/03-supervised-learning.md?raw';
import topic1_4 from './content/topic-1/04-unsupervised-learning.md?raw';
import topic1_5 from './content/topic-1/05-reinforcement-learning.md?raw';
import topic1_6 from './content/topic-1/06-bias-variance.md?raw';
import topic1_7 from './content/topic-1/07-ml-applications.md?raw';

import topic2_1 from './content/topic-2/01-linear-regression.md?raw';
import topic2_2 from './content/topic-2/02-gradient-descent.md?raw';
import topic2_3 from './content/topic-2/03-regularization.md?raw';
import topic2_4 from './content/topic-2/04-logistic-regression.md?raw';
import topic2_5 from './content/topic-2/05-multiclass-classification.md?raw';
import topic2_6 from './content/topic-2/06-feature-scaling.md?raw';
import topic2_7 from './content/topic-2/07-polynomial-features.md?raw';

import topic3_1 from './content/topic-3/01-decision-trees.md?raw';
import topic3_2 from './content/topic-3/02-random-forests.md?raw';
import topic3_3 from './content/topic-3/03-gradient-boosting.md?raw';
import topic3_4 from './content/topic-3/04-svm.md?raw';
import topic3_5 from './content/topic-3/05-knn.md?raw';
import topic3_6 from './content/topic-3/06-naive-bayes.md?raw';
import topic3_7 from './content/topic-3/07-ensemble-methods.md?raw';

import topic4_1 from './content/topic-4/01-perceptron.md?raw';
import topic4_2 from './content/topic-4/02-multilayer-perceptron.md?raw';
import topic4_3 from './content/topic-4/03-backpropagation.md?raw';
import topic4_4 from './content/topic-4/04-activation-functions.md?raw';
import topic4_5 from './content/topic-4/05-optimization.md?raw';
import topic4_6 from './content/topic-4/06-regularization-nn.md?raw';
import topic4_7 from './content/topic-4/07-practical-training.md?raw';

import topic5_1 from './content/topic-5/01-deep-learning-intro.md?raw';
import topic5_2 from './content/topic-5/02-cnns.md?raw';
import topic5_3 from './content/topic-5/03-rnns.md?raw';
import topic5_4 from './content/topic-5/04-lstm-gru.md?raw';
import topic5_5 from './content/topic-5/05-transformers.md?raw';
import topic5_6 from './content/topic-5/06-transfer-learning.md?raw';
import topic5_7 from './content/topic-5/07-generative-models.md?raw';

import topic6_1 from './content/topic-6/01-kmeans.md?raw';
import topic6_2 from './content/topic-6/02-hierarchical-clustering.md?raw';
import topic6_3 from './content/topic-6/03-dbscan.md?raw';
import topic6_4 from './content/topic-6/04-pca.md?raw';
import topic6_5 from './content/topic-6/05-dimensionality-reduction.md?raw';
import topic6_6 from './content/topic-6/06-anomaly-detection.md?raw';
import topic6_7 from './content/topic-6/07-association-rules.md?raw';

import topic7_1 from './content/topic-7/01-train-test-split.md?raw';
import topic7_2 from './content/topic-7/02-cross-validation.md?raw';
import topic7_3 from './content/topic-7/03-classification-metrics.md?raw';
import topic7_4 from './content/topic-7/04-regression-metrics.md?raw';
import topic7_5 from './content/topic-7/05-roc-auc.md?raw';
import topic7_6 from './content/topic-7/06-hyperparameter-tuning.md?raw';
import topic7_7 from './content/topic-7/07-model-selection.md?raw';

export const cs402Topics: Topic[] = [
  {
    id: 'cs402-topic-1',
    title: 'Machine Learning Overview',
    content: 'Introduction to machine learning, workflow, supervised vs unsupervised learning, and foundational concepts.',
    subtopics: [
      { id: 'cs402-topic-1-1', slug: 'ml-overview', order: 1, title: 'Machine Learning Overview', content: topic1_1 },
      { id: 'cs402-topic-1-2', slug: 'ml-workflow', order: 2, title: 'ML Workflow', content: topic1_2 },
      { id: 'cs402-topic-1-3', slug: 'supervised-unsupervised', order: 3, title: 'Supervised vs Unsupervised Learning', content: topic1_3 },
      { id: 'cs402-topic-1-4', slug: 'feature-engineering', order: 4, title: 'Feature Engineering', content: topic1_4 },
      { id: 'cs402-topic-1-5', slug: 'data-preprocessing', order: 5, title: 'Data Preprocessing', content: topic1_5 },
      { id: 'cs402-topic-1-6', slug: 'bias-variance', order: 6, title: 'Bias-Variance Tradeoff', content: topic1_6 },
      { id: 'cs402-topic-1-7', slug: 'ml-frameworks', order: 7, title: 'ML Frameworks and Tools', content: topic1_7 }
    ],
    quizIds: ['cs402-quiz-1-1', 'cs402-quiz-1-2', 'cs402-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs402-topic-2',
    title: 'Linear and Logistic Regression',
    content: 'Linear regression, gradient descent, regularization, and logistic regression for classification.',
    subtopics: [
      { id: 'cs402-topic-2-1', slug: 'linear-regression', order: 1, title: 'Linear Regression', content: topic2_1 },
      { id: 'cs402-topic-2-2', slug: 'gradient-descent', order: 2, title: 'Gradient Descent', content: topic2_2 },
      { id: 'cs402-topic-2-3', slug: 'regularization', order: 3, title: 'Regularization Techniques', content: topic2_3 },
      { id: 'cs402-topic-2-4', slug: 'logistic-regression', order: 4, title: 'Logistic Regression', content: topic2_4 },
      { id: 'cs402-topic-2-5', slug: 'multiclass-classification', order: 5, title: 'Multiclass Classification', content: topic2_5 },
      { id: 'cs402-topic-2-6', slug: 'cost-functions', order: 6, title: 'Cost Functions', content: topic2_6 },
      { id: 'cs402-topic-2-7', slug: 'optimization-techniques', order: 7, title: 'Optimization Techniques', content: topic2_7 }
    ],
    quizIds: ['cs402-quiz-2-1', 'cs402-quiz-2-2', 'cs402-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs402-topic-3',
    title: 'Classification Algorithms',
    content: 'Decision trees, random forests, SVM, KNN, Naive Bayes, and ensemble methods.',
    subtopics: [
      { id: 'cs402-topic-3-1', slug: 'decision-trees', order: 1, title: 'Decision Trees', content: topic3_1 },
      { id: 'cs402-topic-3-2', slug: 'random-forests', order: 2, title: 'Random Forests', content: topic3_2 },
      { id: 'cs402-topic-3-3', slug: 'svm', order: 3, title: 'Support Vector Machines', content: topic3_3 },
      { id: 'cs402-topic-3-4', slug: 'knn', order: 4, title: 'K-Nearest Neighbors', content: topic3_4 },
      { id: 'cs402-topic-3-5', slug: 'naive-bayes', order: 5, title: 'Naive Bayes', content: topic3_5 },
      { id: 'cs402-topic-3-6', slug: 'ensemble-methods', order: 6, title: 'Ensemble Methods', content: topic3_6 },
      { id: 'cs402-topic-3-7', slug: 'boosting-algorithms', order: 7, title: 'Boosting Algorithms', content: topic3_7 }
    ],
    quizIds: ['cs402-quiz-3-1', 'cs402-quiz-3-2', 'cs402-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs402-topic-4',
    title: 'Neural Networks',
    content: 'Perceptrons, activation functions, backpropagation, feedforward networks, and training techniques.',
    subtopics: [
      { id: 'cs402-topic-4-1', slug: 'perceptron', order: 1, title: 'The Perceptron', content: topic4_1 },
      { id: 'cs402-topic-4-2', slug: 'activation-functions', order: 2, title: 'Activation Functions', content: topic4_2 },
      { id: 'cs402-topic-4-3', slug: 'backpropagation', order: 3, title: 'Backpropagation', content: topic4_3 },
      { id: 'cs402-topic-4-4', slug: 'feedforward-networks', order: 4, title: 'Feedforward Networks', content: topic4_4 },
      { id: 'cs402-topic-4-5', slug: 'network-architecture', order: 5, title: 'Network Architecture Design', content: topic4_5 },
      { id: 'cs402-topic-4-6', slug: 'weight-initialization', order: 6, title: 'Weight Initialization', content: topic4_6 },
      { id: 'cs402-topic-4-7', slug: 'neural-network-training', order: 7, title: 'Neural Network Training', content: topic4_7 }
    ],
    quizIds: ['cs402-quiz-4-1', 'cs402-quiz-4-2', 'cs402-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs402-topic-5',
    title: 'Deep Learning',
    content: 'Convolutional networks, recurrent networks, LSTM, GRU, transfer learning, and transformers.',
    subtopics: [
      { id: 'cs402-topic-5-1', slug: 'deep-learning-intro', order: 1, title: 'Introduction to Deep Learning', content: topic5_1 },
      { id: 'cs402-topic-5-2', slug: 'convolutional-networks', order: 2, title: 'Convolutional Neural Networks', content: topic5_2 },
      { id: 'cs402-topic-5-3', slug: 'recurrent-networks', order: 3, title: 'Recurrent Neural Networks', content: topic5_3 },
      { id: 'cs402-topic-5-4', slug: 'lstm-gru', order: 4, title: 'LSTM and GRU', content: topic5_4 },
      { id: 'cs402-topic-5-5', slug: 'transfer-learning', order: 5, title: 'Transfer Learning', content: topic5_5 },
      { id: 'cs402-topic-5-6', slug: 'attention-transformers', order: 6, title: 'Attention and Transformers', content: topic5_6 },
      { id: 'cs402-topic-5-7', slug: 'generative-models', order: 7, title: 'Generative Models', content: topic5_7 }
    ],
    quizIds: ['cs402-quiz-5-1', 'cs402-quiz-5-2', 'cs402-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs402-topic-6',
    title: 'Clustering and Unsupervised Learning',
    content: 'K-means, hierarchical clustering, DBSCAN, PCA, dimensionality reduction, and anomaly detection.',
    subtopics: [
      { id: 'cs402-topic-6-1', slug: 'kmeans-clustering', order: 1, title: 'K-Means Clustering', content: topic6_1 },
      { id: 'cs402-topic-6-2', slug: 'hierarchical-clustering', order: 2, title: 'Hierarchical Clustering', content: topic6_2 },
      { id: 'cs402-topic-6-3', slug: 'dbscan', order: 3, title: 'DBSCAN', content: topic6_3 },
      { id: 'cs402-topic-6-4', slug: 'dimensionality-reduction', order: 4, title: 'Dimensionality Reduction', content: topic6_4 },
      { id: 'cs402-topic-6-5', slug: 'pca', order: 5, title: 'Principal Component Analysis', content: topic6_5 },
      { id: 'cs402-topic-6-6', slug: 'anomaly-detection', order: 6, title: 'Anomaly Detection', content: topic6_6 },
      { id: 'cs402-topic-6-7', slug: 'association-rules', order: 7, title: 'Association Rules', content: topic6_7 }
    ],
    quizIds: ['cs402-quiz-6-1', 'cs402-quiz-6-2', 'cs402-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs402-topic-7',
    title: 'Model Evaluation and Selection',
    content: 'Train-test split, cross-validation, performance metrics, confusion matrix, ROC curves, and hyperparameter tuning.',
    subtopics: [
      { id: 'cs402-topic-7-1', slug: 'train-test-split', order: 1, title: 'Train-Test Split', content: topic7_1 },
      { id: 'cs402-topic-7-2', slug: 'cross-validation', order: 2, title: 'Cross-Validation', content: topic7_2 },
      { id: 'cs402-topic-7-3', slug: 'performance-metrics', order: 3, title: 'Performance Metrics', content: topic7_3 },
      { id: 'cs402-topic-7-4', slug: 'confusion-matrix', order: 4, title: 'Confusion Matrix', content: topic7_4 },
      { id: 'cs402-topic-7-5', slug: 'roc-auc', order: 5, title: 'ROC and AUC', content: topic7_5 },
      { id: 'cs402-topic-7-6', slug: 'hyperparameter-tuning', order: 6, title: 'Hyperparameter Tuning', content: topic7_6 },
      { id: 'cs402-topic-7-7', slug: 'model-selection', order: 7, title: 'Model Selection', content: topic7_7 }
    ],
    quizIds: ['cs402-quiz-7-1', 'cs402-quiz-7-2', 'cs402-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs402-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
