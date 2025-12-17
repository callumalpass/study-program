import { CodingExercise } from '../../../../core/types';

export const cs407Topic6Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-6-1',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Model Evaluation Metrics',
    description: 'Write a function that computes accuracy, precision, and recall given true and predicted labels.',
    difficulty: 2,
    language: 'python',
    starterCode: `from sklearn.metrics import accuracy_score, precision_score, recall_score

def compute_metrics(y_true, y_pred):
    # Return dict with 'accuracy', 'precision', 'recall'
    pass`,
    solution: `from sklearn.metrics import accuracy_score, precision_score, recall_score

def compute_metrics(y_true, y_pred):
    return {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred, zero_division=0),
        'recall': recall_score(y_true, y_pred, zero_division=0)
    }`,
    testCases: [
      {
        input: 'y_true=[1, 0, 1, 1, 0], y_pred=[1, 0, 1, 0, 0]',
        expectedOutput: "{'accuracy': 0.8, 'precision': 1.0, 'recall': 0.67}",
        isHidden: false,
        description: 'Binary classification metrics'
      }
    ],
    hints: [
      'Use sklearn.metrics functions',
      'accuracy_score(y_true, y_pred)',
      'precision_score and recall_score need zero_division parameter',
      'Return as dictionary'
    ]
  },
  {
    id: 'cs407-ex-6-2',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Cross-Validation',
    description: 'Write a function that performs k-fold cross-validation and returns mean accuracy.',
    difficulty: 3,
    language: 'python',
    starterCode: `from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

def cross_validate(X, y, k=5):
    # Return mean cross-validation accuracy
    pass`,
    solution: `from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

def cross_validate(X, y, k=5):
    model = LogisticRegression(max_iter=1000)
    scores = cross_val_score(model, X, y, cv=k)
    return scores.mean()`,
    testCases: [
      {
        input: 'X=[[1], [2], [3], [4], [5]], y=[0, 0, 1, 1, 1], k=3',
        expectedOutput: 'float (mean accuracy)',
        isHidden: false,
        description: 'Simple cross-validation'
      }
    ],
    hints: [
      'Create a model instance (e.g., LogisticRegression)',
      'Use cross_val_score(model, X, y, cv=k)',
      'Return the mean of the scores array'
    ]
  }
];
