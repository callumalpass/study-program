import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs402-t7-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Cross-Validation from Scratch',
    difficulty: 2,
    description: `Build k-fold cross-validation without sklearn.

Requirements:
- Split data into k folds
- Train and evaluate on each fold
- Return scores for all folds
- Calculate mean and standard deviation`,
    starterCode: `import numpy as np

def cross_validate(model, X, y, k=5):
    # Split into k folds
    # Train on k-1, test on 1
    # Return scores
    pass`,
    solution: `import numpy as np

def cross_validate(model, X, y, k=5):
    n = len(X)
    fold_size = n // k
    indices = np.arange(n)
    np.random.shuffle(indices)
    
    scores = []
    for i in range(k):
        # Split
        test_idx = indices[i*fold_size:(i+1)*fold_size]
        train_idx = np.concatenate([indices[:i*fold_size], indices[(i+1)*fold_size:]])
        
        X_train, X_test = X[train_idx], X[test_idx]
        y_train, y_test = y[train_idx], y[test_idx]
        
        # Train and evaluate
        model.fit(X_train, y_train)
        score = model.score(X_test, y_test)
        scores.append(score)

    return np.array(scores)`,
    testCases: [],
    hints: [
      'Divide the dataset into k equal-sized folds',
      'Use shuffled indices to ensure random distribution',
      'For each fold, use it as test set and remaining folds as training set',
      'Store the score for each fold in a list',
      'Return scores as a numpy array for easy statistics calculation'
    ],
    language: 'python'
  },
  // 15 more exercises
];
