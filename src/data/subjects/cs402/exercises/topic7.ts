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
  {
    id: 'cs402-ex-7-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Calculate Precision, Recall, and F1',
    difficulty: 1,
    description: `Compute classification metrics from confusion matrix.

Requirements:
- Calculate precision: TP / (TP + FP)
- Calculate recall: TP / (TP + FN)
- Calculate F1 score: 2 * (precision * recall) / (precision + recall)
- Handle edge cases (division by zero)`,
    starterCode: `import numpy as np

def calculate_metrics(y_true, y_pred):
    """
    Calculate precision, recall, and F1 score.

    Args:
        y_true: true labels (0 or 1)
        y_pred: predicted labels (0 or 1)

    Returns:
        precision, recall, f1
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def calculate_metrics(y_true, y_pred):
    """
    Calculate precision, recall, and F1 score.

    Args:
        y_true: true labels (0 or 1)
        y_pred: predicted labels (0 or 1)

    Returns:
        precision, recall, f1
    """
    # Convert to numpy arrays
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    # Calculate confusion matrix components
    tp = np.sum((y_true == 1) & (y_pred == 1))
    fp = np.sum((y_true == 0) & (y_pred == 1))
    fn = np.sum((y_true == 1) & (y_pred == 0))
    tn = np.sum((y_true == 0) & (y_pred == 0))

    # Calculate precision
    if tp + fp == 0:
        precision = 0.0
    else:
        precision = tp / (tp + fp)

    # Calculate recall
    if tp + fn == 0:
        recall = 0.0
    else:
        recall = tp / (tp + fn)

    # Calculate F1 score
    if precision + recall == 0:
        f1 = 0.0
    else:
        f1 = 2 * (precision * recall) / (precision + recall)

    return precision, recall, f1

# Example
y_true = [1, 1, 0, 1, 0, 1, 0, 0]
y_pred = [1, 0, 0, 1, 0, 1, 1, 0]

p, r, f1 = calculate_metrics(y_true, y_pred)
print(f"Precision: {p:.3f}, Recall: {r:.3f}, F1: {f1:.3f}")`,
    testCases: [],
    hints: [
      'TP: correctly predicted positive examples',
      'FP: incorrectly predicted as positive (false alarms)',
      'FN: incorrectly predicted as negative (misses)',
      'Precision: of predicted positives, how many are correct?',
      'Recall: of actual positives, how many did we catch?',
      'F1 is harmonic mean of precision and recall'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Build Confusion Matrix',
    difficulty: 1,
    description: `Create confusion matrix for multi-class classification.

Requirements:
- Support arbitrary number of classes
- Rows represent true labels, columns represent predictions
- Include counts for each (true, predicted) pair
- Visualize as heatmap`,
    starterCode: `import numpy as np

def confusion_matrix(y_true, y_pred, n_classes=None):
    """
    Compute confusion matrix.

    Args:
        y_true: true labels
        y_pred: predicted labels
        n_classes: number of classes (inferred if None)

    Returns:
        confusion matrix (n_classes x n_classes)
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def confusion_matrix(y_true, y_pred, n_classes=None):
    """
    Compute confusion matrix.

    Args:
        y_true: true labels
        y_pred: predicted labels
        n_classes: number of classes (inferred if None)

    Returns:
        confusion matrix (n_classes x n_classes)
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    if n_classes is None:
        n_classes = max(np.max(y_true), np.max(y_pred)) + 1

    # Initialize confusion matrix
    cm = np.zeros((n_classes, n_classes), dtype=int)

    # Fill confusion matrix
    for true_label, pred_label in zip(y_true, y_pred):
        cm[true_label, pred_label] += 1

    return cm

def plot_confusion_matrix(cm, class_names=None):
    """Plot confusion matrix as heatmap."""
    plt.figure(figsize=(8, 6))

    if class_names is None:
        class_names = [str(i) for i in range(len(cm))]

    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names, yticklabels=class_names)

    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.title('Confusion Matrix')
    plt.show()

# Example
y_true = [0, 1, 2, 0, 1, 2, 1, 2, 0, 1]
y_pred = [0, 2, 2, 0, 1, 1, 1, 2, 0, 0]

cm = confusion_matrix(y_true, y_pred)
print(cm)
plot_confusion_matrix(cm, ['Class 0', 'Class 1', 'Class 2'])`,
    testCases: [],
    hints: [
      'Confusion matrix: cm[i][j] = count of true class i predicted as j',
      'Diagonal elements are correct predictions',
      'Off-diagonal elements are misclassifications',
      'Each row sums to total examples of that true class',
      'Use np.zeros to initialize matrix',
      'Iterate through (true, pred) pairs and increment counts'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-4',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement ROC Curve',
    difficulty: 3,
    description: `Generate ROC curve and compute AUC.

Requirements:
- Use predicted probabilities, not hard labels
- Vary threshold from 0 to 1
- Calculate TPR and FPR at each threshold
- Compute Area Under Curve (AUC) using trapezoidal rule`,
    starterCode: `import numpy as np

def roc_curve(y_true, y_scores):
    """
    Compute ROC curve.

    Args:
        y_true: true binary labels
        y_scores: predicted probabilities

    Returns:
        fpr, tpr, thresholds
    """
    # TODO: Implement
    pass

def auc(fpr, tpr):
    """Compute area under ROC curve."""
    # TODO: Implement
    pass`,
    solution: `import numpy as np
import matplotlib.pyplot as plt

def roc_curve(y_true, y_scores):
    """
    Compute ROC curve.

    Args:
        y_true: true binary labels (0 or 1)
        y_scores: predicted probabilities

    Returns:
        fpr, tpr, thresholds
    """
    y_true = np.array(y_true)
    y_scores = np.array(y_scores)

    # Get unique thresholds (sorted descending)
    thresholds = np.sort(np.unique(y_scores))[::-1]
    thresholds = np.concatenate([[np.inf], thresholds, [-np.inf]])

    # Calculate TPR and FPR for each threshold
    tpr_list = []
    fpr_list = []

    n_pos = np.sum(y_true == 1)
    n_neg = np.sum(y_true == 0)

    for threshold in thresholds:
        # Predict 1 if score >= threshold
        y_pred = (y_scores >= threshold).astype(int)

        # Calculate TPR and FPR
        tp = np.sum((y_true == 1) & (y_pred == 1))
        fp = np.sum((y_true == 0) & (y_pred == 1))

        tpr = tp / n_pos if n_pos > 0 else 0
        fpr = fp / n_neg if n_neg > 0 else 0

        tpr_list.append(tpr)
        fpr_list.append(fpr)

    return np.array(fpr_list), np.array(tpr_list), thresholds

def auc(fpr, tpr):
    """
    Compute area under ROC curve using trapezoidal rule.

    Args:
        fpr: false positive rates
        tpr: true positive rates

    Returns:
        area under curve
    """
    # Sort by fpr
    sorted_indices = np.argsort(fpr)
    fpr = fpr[sorted_indices]
    tpr = tpr[sorted_indices]

    # Trapezoidal integration
    area = 0
    for i in range(1, len(fpr)):
        area += (fpr[i] - fpr[i-1]) * (tpr[i] + tpr[i-1]) / 2

    return area

def plot_roc_curve(fpr, tpr, auc_score):
    """Plot ROC curve."""
    plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, linewidth=2, label=f'ROC curve (AUC = {auc_score:.3f})')
    plt.plot([0, 1], [0, 1], 'k--', label='Random classifier')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve')
    plt.legend()
    plt.grid(True)
    plt.show()

# Example
y_true = [0, 0, 1, 1, 0, 1, 0, 1]
y_scores = [0.1, 0.4, 0.35, 0.8, 0.2, 0.7, 0.3, 0.9]

fpr, tpr, thresholds = roc_curve(y_true, y_scores)
auc_score = auc(fpr, tpr)

print(f"AUC: {auc_score:.3f}")
plot_roc_curve(fpr, tpr, auc_score)`,
    testCases: [],
    hints: [
      'ROC curve: plot TPR vs FPR at different thresholds',
      'TPR = TP / (TP + FN) = recall = sensitivity',
      'FPR = FP / (FP + TN) = 1 - specificity',
      'Start with high threshold (predict all negative), end with low (predict all positive)',
      'Perfect classifier: AUC = 1.0, Random: AUC = 0.5',
      'Use trapezoidal rule for integration: sum of trapezoid areas'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-5',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Precision-Recall Curve',
    difficulty: 2,
    description: `Generate precision-recall curve for imbalanced datasets.

Requirements:
- Calculate precision and recall at each threshold
- Plot precision vs recall
- Compute average precision (AP)
- Better than ROC for imbalanced classes`,
    starterCode: `import numpy as np

def precision_recall_curve(y_true, y_scores):
    """
    Compute precision-recall curve.

    Args:
        y_true: true binary labels
        y_scores: predicted probabilities

    Returns:
        precision, recall, thresholds
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
import matplotlib.pyplot as plt

def precision_recall_curve(y_true, y_scores):
    """
    Compute precision-recall curve.

    Args:
        y_true: true binary labels (0 or 1)
        y_scores: predicted probabilities

    Returns:
        precision, recall, thresholds
    """
    y_true = np.array(y_true)
    y_scores = np.array(y_scores)

    # Get unique thresholds
    thresholds = np.sort(np.unique(y_scores))[::-1]
    thresholds = np.concatenate([[np.inf], thresholds])

    precision_list = []
    recall_list = []

    for threshold in thresholds:
        y_pred = (y_scores >= threshold).astype(int)

        tp = np.sum((y_true == 1) & (y_pred == 1))
        fp = np.sum((y_true == 0) & (y_pred == 1))
        fn = np.sum((y_true == 1) & (y_pred == 0))

        # Precision
        if tp + fp == 0:
            precision = 1.0  # No predictions, convention
        else:
            precision = tp / (tp + fp)

        # Recall
        if tp + fn == 0:
            recall = 0.0
        else:
            recall = tp / (tp + fn)

        precision_list.append(precision)
        recall_list.append(recall)

    return np.array(precision_list), np.array(recall_list), thresholds

def average_precision(precision, recall):
    """
    Compute average precision (area under PR curve).

    Args:
        precision: precision values
        recall: recall values

    Returns:
        average precision
    """
    # Sort by recall
    sorted_indices = np.argsort(recall)
    recall = recall[sorted_indices]
    precision = precision[sorted_indices]

    # Compute AP using trapezoidal rule
    ap = 0
    for i in range(1, len(recall)):
        ap += (recall[i] - recall[i-1]) * precision[i]

    return ap

def plot_pr_curve(precision, recall, ap):
    """Plot precision-recall curve."""
    plt.figure(figsize=(8, 6))
    plt.plot(recall, precision, linewidth=2, label=f'PR curve (AP = {ap:.3f})')
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curve')
    plt.legend()
    plt.grid(True)
    plt.xlim([0, 1])
    plt.ylim([0, 1])
    plt.show()

# Example
y_true = [0, 0, 1, 1, 0, 1, 0, 1]
y_scores = [0.1, 0.4, 0.35, 0.8, 0.2, 0.7, 0.3, 0.9]

precision, recall, thresholds = precision_recall_curve(y_true, y_scores)
ap = average_precision(precision, recall)

print(f"Average Precision: {ap:.3f}")
plot_pr_curve(precision, recall, ap)`,
    testCases: [],
    hints: [
      'PR curve plots precision vs recall at different thresholds',
      'More informative than ROC for imbalanced datasets',
      'High precision + high recall = good classifier',
      'Average precision: area under PR curve',
      'Perfect classifier: AP = 1.0',
      'Start with high threshold (high precision, low recall)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-6',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Stratified K-Fold',
    difficulty: 2,
    description: `Build stratified k-fold cross-validation from scratch.

Requirements:
- Maintain class distribution in each fold
- Split data into k stratified folds
- Ensure each class is represented proportionally
- Return train/test indices for each fold`,
    starterCode: `import numpy as np

class StratifiedKFold:
    def __init__(self, n_splits=5):
        self.n_splits = n_splits

    def split(self, X, y):
        """
        Generate train/test indices.

        Args:
            X: features
            y: labels

        Yields:
            train_idx, test_idx for each fold
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class StratifiedKFold:
    def __init__(self, n_splits=5, shuffle=True, random_state=None):
        self.n_splits = n_splits
        self.shuffle = shuffle
        self.random_state = random_state

    def split(self, X, y):
        """
        Generate stratified train/test indices.

        Args:
            X: features (n_samples, n_features)
            y: labels (n_samples,)

        Yields:
            train_idx, test_idx for each fold
        """
        y = np.array(y)
        n_samples = len(y)

        # Get unique classes and their counts
        classes, class_counts = np.unique(y, return_counts=True)

        # Shuffle indices within each class
        if self.shuffle:
            rng = np.random.RandomState(self.random_state)
            class_indices = {}
            for cls in classes:
                indices = np.where(y == cls)[0]
                rng.shuffle(indices)
                class_indices[cls] = indices
        else:
            class_indices = {cls: np.where(y == cls)[0] for cls in classes}

        # Create folds
        for fold_idx in range(self.n_splits):
            test_indices = []
            train_indices = []

            for cls in classes:
                indices = class_indices[cls]
                n_class_samples = len(indices)
                fold_size = n_class_samples // self.n_splits

                # Test indices for this fold
                start_idx = fold_idx * fold_size
                end_idx = start_idx + fold_size if fold_idx < self.n_splits - 1 else n_class_samples
                test_indices.extend(indices[start_idx:end_idx])

                # Train indices (all others)
                train_indices.extend(np.concatenate([
                    indices[:start_idx],
                    indices[end_idx:]
                ]))

            yield np.array(train_indices), np.array(test_indices)

# Example usage
X = np.random.randn(100, 5)
y = np.array([0] * 30 + [1] * 70)  # Imbalanced

skf = StratifiedKFold(n_splits=5)

for fold, (train_idx, test_idx) in enumerate(skf.split(X, y)):
    train_labels = y[train_idx]
    test_labels = y[test_idx]

    print(f"Fold {fold + 1}:")
    print(f"  Train: {len(train_idx)} samples, Class dist: {np.bincount(train_labels)}")
    print(f"  Test: {len(test_idx)} samples, Class dist: {np.bincount(test_labels)}")`,
    testCases: [],
    hints: [
      'Stratified splitting maintains class proportions in each fold',
      'Split each class independently into k parts',
      'For each fold, combine parts from all classes',
      'Essential for imbalanced datasets',
      'Shuffle indices within each class before splitting',
      'Handle uneven divisions by putting remainder in last fold'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-7',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Grid Search',
    difficulty: 3,
    description: `Build grid search for hyperparameter tuning.

Requirements:
- Try all combinations of hyperparameter values
- Use cross-validation to evaluate each combination
- Track best parameters and best score
- Support any sklearn-compatible model`,
    starterCode: `import numpy as np

class GridSearchCV:
    def __init__(self, model, param_grid, cv=5):
        self.model = model
        self.param_grid = param_grid
        self.cv = cv

    def fit(self, X, y):
        # TODO: Implement
        pass`,
    solution: `import numpy as np
from itertools import product
from sklearn.model_selection import cross_val_score
import copy

class GridSearchCV:
    def __init__(self, model, param_grid, cv=5, scoring='accuracy'):
        self.model = model
        self.param_grid = param_grid
        self.cv = cv
        self.scoring = scoring
        self.best_params_ = None
        self.best_score_ = None
        self.best_model_ = None
        self.cv_results_ = []

    def fit(self, X, y):
        """
        Perform grid search with cross-validation.

        Args:
            X: features
            y: labels
        """
        # Generate all combinations of parameters
        param_names = list(self.param_grid.keys())
        param_values = list(self.param_grid.values())
        param_combinations = list(product(*param_values))

        best_score = -np.inf

        for param_combo in param_combinations:
            # Create parameter dictionary
            params = dict(zip(param_names, param_combo))

            # Create model with these parameters
            model = copy.deepcopy(self.model)
            model.set_params(**params)

            # Evaluate with cross-validation
            scores = cross_val_score(model, X, y, cv=self.cv, scoring=self.scoring)
            mean_score = np.mean(scores)
            std_score = np.std(scores)

            # Store results
            self.cv_results_.append({
                'params': params,
                'mean_score': mean_score,
                'std_score': std_score,
                'scores': scores
            })

            # Update best
            if mean_score > best_score:
                best_score = mean_score
                self.best_params_ = params
                self.best_score_ = mean_score

        # Train best model on full dataset
        self.best_model_ = copy.deepcopy(self.model)
        self.best_model_.set_params(**self.best_params_)
        self.best_model_.fit(X, y)

        return self

    def predict(self, X):
        """Predict using best model."""
        return self.best_model_.predict(X)

# Example usage
from sklearn.svm import SVC

# Define parameter grid
param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto']
}

# Create grid search
model = SVC()
grid_search = GridSearchCV(model, param_grid, cv=5)

# Generate sample data
X = np.random.randn(100, 5)
y = np.random.randint(0, 2, 100)

# Fit
grid_search.fit(X, y)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.3f}")`,
    testCases: [],
    hints: [
      'Use itertools.product to generate all parameter combinations',
      'For each combination, train model with cross-validation',
      'Track mean and std of cross-validation scores',
      'Keep parameters with best mean score',
      'Train final model on full dataset with best parameters',
      'Use copy.deepcopy to avoid modifying original model'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-8',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Random Search',
    difficulty: 3,
    description: `Build random search for hyperparameter tuning.

Requirements:
- Sample hyperparameters randomly from distributions
- More efficient than grid search for high-dimensional spaces
- Support continuous and discrete distributions
- Track best parameters found`,
    starterCode: `import numpy as np

class RandomizedSearchCV:
    def __init__(self, model, param_distributions, n_iter=10, cv=5):
        self.model = model
        self.param_distributions = param_distributions
        self.n_iter = n_iter
        self.cv = cv

    def fit(self, X, y):
        # TODO: Implement
        pass`,
    solution: `import numpy as np
from sklearn.model_selection import cross_val_score
import copy

class RandomizedSearchCV:
    def __init__(self, model, param_distributions, n_iter=10, cv=5,
                 scoring='accuracy', random_state=None):
        self.model = model
        self.param_distributions = param_distributions
        self.n_iter = n_iter
        self.cv = cv
        self.scoring = scoring
        self.random_state = random_state
        self.best_params_ = None
        self.best_score_ = None
        self.best_model_ = None
        self.cv_results_ = []

    def sample_params(self, rng):
        """Sample one set of parameters."""
        params = {}
        for param_name, distribution in self.param_distributions.items():
            if isinstance(distribution, list):
                # Discrete choice
                params[param_name] = rng.choice(distribution)
            elif hasattr(distribution, 'rvs'):
                # scipy distribution
                params[param_name] = distribution.rvs(random_state=rng)
            elif callable(distribution):
                # Custom callable
                params[param_name] = distribution(rng)
        return params

    def fit(self, X, y):
        """
        Perform random search with cross-validation.

        Args:
            X: features
            y: labels
        """
        rng = np.random.RandomState(self.random_state)
        best_score = -np.inf

        for i in range(self.n_iter):
            # Sample parameters
            params = self.sample_params(rng)

            # Create model with these parameters
            model = copy.deepcopy(self.model)
            try:
                model.set_params(**params)
            except ValueError:
                # Invalid parameter combination, skip
                continue

            # Evaluate with cross-validation
            scores = cross_val_score(model, X, y, cv=self.cv, scoring=self.scoring)
            mean_score = np.mean(scores)
            std_score = np.std(scores)

            # Store results
            self.cv_results_.append({
                'params': params,
                'mean_score': mean_score,
                'std_score': std_score,
                'scores': scores
            })

            # Update best
            if mean_score > best_score:
                best_score = mean_score
                self.best_params_ = params
                self.best_score_ = mean_score

            print(f"Iteration {i+1}/{self.n_iter}: score={mean_score:.3f}, params={params}")

        # Train best model on full dataset
        self.best_model_ = copy.deepcopy(self.model)
        self.best_model_.set_params(**self.best_params_)
        self.best_model_.fit(X, y)

        return self

    def predict(self, X):
        """Predict using best model."""
        return self.best_model_.predict(X)

# Example usage
from sklearn.ensemble import RandomForestClassifier
from scipy.stats import uniform, randint

# Define parameter distributions
param_distributions = {
    'n_estimators': randint(10, 200),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10),
    'max_features': uniform(0.1, 0.9)
}

# Create random search
model = RandomForestClassifier()
random_search = RandomizedSearchCV(model, param_distributions,
                                   n_iter=20, cv=5, random_state=42)

# Generate sample data
X = np.random.randn(200, 10)
y = np.random.randint(0, 2, 200)

# Fit
random_search.fit(X, y)

print(f"\\nBest parameters: {random_search.best_params_}")
print(f"Best score: {random_search.best_score_:.3f}")`,
    testCases: [],
    hints: [
      'Sample parameters randomly from distributions',
      'Use scipy.stats distributions for continuous parameters',
      'Use lists for discrete categorical parameters',
      'More efficient than grid search for large parameter spaces',
      'Can explore wider range of parameter values',
      'Set random_state for reproducibility'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-9',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Calculate Bootstrap Confidence Intervals',
    difficulty: 2,
    description: `Use bootstrap resampling to estimate confidence intervals.

Requirements:
- Resample data with replacement
- Calculate metric on each bootstrap sample
- Compute confidence interval from bootstrap distribution
- Support percentile and BCa methods`,
    starterCode: `import numpy as np

def bootstrap_confidence_interval(X, y, model, metric_fn,
                                   n_bootstrap=1000, confidence=0.95):
    """
    Compute bootstrap confidence interval.

    Args:
        X: features
        y: labels
        model: fitted model
        metric_fn: function to compute metric
        n_bootstrap: number of bootstrap samples
        confidence: confidence level

    Returns:
        (lower_bound, upper_bound)
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def bootstrap_confidence_interval(X, y, model, metric_fn,
                                   n_bootstrap=1000, confidence=0.95,
                                   random_state=None):
    """
    Compute bootstrap confidence interval.

    Args:
        X: features
        y: labels
        model: fitted model (already trained)
        metric_fn: function(y_true, y_pred) -> score
        n_bootstrap: number of bootstrap samples
        confidence: confidence level (e.g., 0.95 for 95%)

    Returns:
        (lower_bound, upper_bound, bootstrap_scores)
    """
    rng = np.random.RandomState(random_state)
    n_samples = len(X)

    bootstrap_scores = []

    for _ in range(n_bootstrap):
        # Resample with replacement
        indices = rng.choice(n_samples, size=n_samples, replace=True)
        X_boot = X[indices]
        y_boot = y[indices]

        # Make predictions
        y_pred = model.predict(X_boot)

        # Calculate metric
        score = metric_fn(y_boot, y_pred)
        bootstrap_scores.append(score)

    bootstrap_scores = np.array(bootstrap_scores)

    # Compute percentile confidence interval
    alpha = 1 - confidence
    lower_percentile = (alpha / 2) * 100
    upper_percentile = (1 - alpha / 2) * 100

    lower_bound = np.percentile(bootstrap_scores, lower_percentile)
    upper_bound = np.percentile(bootstrap_scores, upper_percentile)

    return lower_bound, upper_bound, bootstrap_scores

# Example usage
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Generate sample data
X = np.random.randn(100, 5)
y = np.random.randint(0, 2, 100)

# Train model
model = LogisticRegression()
model.fit(X, y)

# Compute bootstrap CI for accuracy
lower, upper, scores = bootstrap_confidence_interval(
    X, y, model, accuracy_score,
    n_bootstrap=1000, confidence=0.95, random_state=42
)

print(f"Mean accuracy: {np.mean(scores):.3f}")
print(f"95% CI: [{lower:.3f}, {upper:.3f}]")
print(f"Standard error: {np.std(scores):.3f}")`,
    testCases: [],
    hints: [
      'Bootstrap: resample data with replacement',
      'Create n_bootstrap resamples of same size as original',
      'Calculate metric on each resample',
      'Confidence interval: percentiles of bootstrap distribution',
      'For 95% CI: use 2.5th and 97.5th percentiles',
      'Bootstrap provides estimate of sampling variability'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Learning Curves',
    difficulty: 2,
    description: `Plot learning curves to diagnose bias vs variance.

Requirements:
- Train on increasing amounts of data
- Track training and validation scores
- Plot scores vs training set size
- Diagnose overfitting/underfitting`,
    starterCode: `import numpy as np

def learning_curve(model, X, y, train_sizes, cv=5):
    """
    Compute learning curve.

    Args:
        model: sklearn model
        X: features
        y: labels
        train_sizes: array of training set sizes
        cv: number of CV folds

    Returns:
        train_scores, val_scores for each size
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
from sklearn.model_selection import ShuffleSplit
import matplotlib.pyplot as plt
import copy

def learning_curve(model, X, y, train_sizes, cv=5, random_state=None):
    """
    Compute learning curve.

    Args:
        model: sklearn model
        X: features (n_samples, n_features)
        y: labels
        train_sizes: array of training set sizes (or fractions)
        cv: number of CV folds

    Returns:
        train_sizes_abs, train_scores, val_scores
    """
    n_samples = len(X)

    # Convert fractions to absolute numbers
    if np.max(train_sizes) <= 1.0:
        train_sizes_abs = (train_sizes * n_samples).astype(int)
    else:
        train_sizes_abs = train_sizes.astype(int)

    train_scores_list = []
    val_scores_list = []

    for train_size in train_sizes_abs:
        train_scores = []
        val_scores = []

        # Create CV splitter
        cv_splitter = ShuffleSplit(n_splits=cv, train_size=train_size,
                                    random_state=random_state)

        for train_idx, val_idx in cv_splitter.split(X):
            X_train, X_val = X[train_idx], X[val_idx]
            y_train, y_val = y[train_idx], y[val_idx]

            # Train model
            model_copy = copy.deepcopy(model)
            model_copy.fit(X_train, y_train)

            # Evaluate
            train_score = model_copy.score(X_train, y_train)
            val_score = model_copy.score(X_val, y_val)

            train_scores.append(train_score)
            val_scores.append(val_score)

        train_scores_list.append(train_scores)
        val_scores_list.append(val_scores)

    return train_sizes_abs, np.array(train_scores_list), np.array(val_scores_list)

def plot_learning_curve(train_sizes, train_scores, val_scores):
    """Plot learning curves."""
    train_mean = np.mean(train_scores, axis=1)
    train_std = np.std(train_scores, axis=1)
    val_mean = np.mean(val_scores, axis=1)
    val_std = np.std(val_scores, axis=1)

    plt.figure(figsize=(10, 6))

    # Plot training scores
    plt.plot(train_sizes, train_mean, 'o-', label='Training score')
    plt.fill_between(train_sizes,
                     train_mean - train_std,
                     train_mean + train_std,
                     alpha=0.1)

    # Plot validation scores
    plt.plot(train_sizes, val_mean, 'o-', label='Validation score')
    plt.fill_between(train_sizes,
                     val_mean - val_std,
                     val_mean + val_std,
                     alpha=0.1)

    plt.xlabel('Training Set Size')
    plt.ylabel('Score')
    plt.title('Learning Curves')
    plt.legend(loc='best')
    plt.grid(True)
    plt.show()

# Example usage
from sklearn.tree import DecisionTreeClassifier

# Generate sample data
X = np.random.randn(500, 10)
y = np.random.randint(0, 2, 500)

# Compute learning curve
model = DecisionTreeClassifier(max_depth=5)
train_sizes = np.linspace(0.1, 1.0, 10)
sizes, train_scores, val_scores = learning_curve(model, X, y, train_sizes, cv=5)

# Plot
plot_learning_curve(sizes, train_scores, val_scores)

# Interpret:
# - High training score, low val score: overfitting
# - Both scores low: underfitting
# - Both scores high and close: good fit`,
    testCases: [],
    hints: [
      'Train on increasingly large subsets of data',
      'For each subset size, use cross-validation',
      'Plot both training and validation scores',
      'High training score + low validation score = overfitting',
      'Both scores low = underfitting (high bias)',
      'Scores converging at high value = good fit'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement McNemar Test',
    difficulty: 3,
    description: `Use McNemar test to compare two classifiers statistically.

Requirements:
- Build contingency table of agreements/disagreements
- Apply McNemar chi-squared test
- Determine if difference is statistically significant
- Return p-value and test statistic`,
    starterCode: `import numpy as np

def mcnemar_test(y_true, y_pred1, y_pred2):
    """
    Perform McNemar test.

    Args:
        y_true: true labels
        y_pred1: predictions from model 1
        y_pred2: predictions from model 2

    Returns:
        statistic, p_value
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
from scipy.stats import chi2

def mcnemar_test(y_true, y_pred1, y_pred2):
    """
    Perform McNemar test to compare two classifiers.

    Args:
        y_true: true labels
        y_pred1: predictions from model 1
        y_pred2: predictions from model 2

    Returns:
        statistic, p_value
    """
    y_true = np.array(y_true)
    y_pred1 = np.array(y_pred1)
    y_pred2 = np.array(y_pred2)

    # Build contingency table
    # Rows: model 1 correct/incorrect
    # Cols: model 2 correct/incorrect

    # Both correct
    n_11 = np.sum((y_pred1 == y_true) & (y_pred2 == y_true))

    # Model 1 correct, model 2 incorrect
    n_10 = np.sum((y_pred1 == y_true) & (y_pred2 != y_true))

    # Model 1 incorrect, model 2 correct
    n_01 = np.sum((y_pred1 != y_true) & (y_pred2 == y_true))

    # Both incorrect
    n_00 = np.sum((y_pred1 != y_true) & (y_pred2 != y_true))

    print(f"Contingency table:")
    print(f"  Both correct: {n_11}")
    print(f"  Only M1 correct: {n_10}")
    print(f"  Only M2 correct: {n_01}")
    print(f"  Both incorrect: {n_00}")

    # McNemar test statistic
    # Only disagreements matter (n_01 and n_10)
    if n_10 + n_01 == 0:
        return 0.0, 1.0  # No disagreements, models identical

    # Chi-squared test with continuity correction
    statistic = (abs(n_10 - n_01) - 1)**2 / (n_10 + n_01)

    # p-value from chi-squared distribution with 1 df
    p_value = 1 - chi2.cdf(statistic, df=1)

    return statistic, p_value

# Example usage
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

# Generate data
X = np.random.randn(200, 10)
y = np.random.randint(0, 2, 200)

# Train two models
model1 = DecisionTreeClassifier(max_depth=5, random_state=42)
model2 = RandomForestClassifier(n_estimators=10, random_state=42)

model1.fit(X, y)
model2.fit(X, y)

# Predictions
y_pred1 = model1.predict(X)
y_pred2 = model2.predict(X)

# McNemar test
stat, p_value = mcnemar_test(y, y_pred1, y_pred2)

print(f"\\nMcNemar statistic: {stat:.3f}")
print(f"p-value: {p_value:.4f}")

if p_value < 0.05:
    print("Significant difference between models (p < 0.05)")
else:
    print("No significant difference between models (p >= 0.05)")`,
    testCases: [],
    hints: [
      'McNemar test compares paired predictions from two classifiers',
      'Build 2x2 contingency table of correct/incorrect predictions',
      'Test statistic: (|n_01 - n_10| - 1)^2 / (n_01 + n_10)',
      'Only disagreements matter (where one model correct, other incorrect)',
      'Use chi-squared distribution with 1 degree of freedom',
      'Null hypothesis: both models have same error rate'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Calculate Calibration Curve',
    difficulty: 3,
    description: `Assess probability calibration of classifier.

Requirements:
- Bin predictions by probability
- Calculate empirical probability in each bin
- Plot predicted vs actual probabilities
- Compute calibration error (ECE)`,
    starterCode: `import numpy as np

def calibration_curve(y_true, y_proba, n_bins=10):
    """
    Compute calibration curve.

    Args:
        y_true: true binary labels
        y_proba: predicted probabilities
        n_bins: number of bins

    Returns:
        bin_edges, empirical_probs, predicted_probs
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
import matplotlib.pyplot as plt

def calibration_curve(y_true, y_proba, n_bins=10):
    """
    Compute calibration curve.

    Args:
        y_true: true binary labels (0 or 1)
        y_proba: predicted probabilities
        n_bins: number of bins

    Returns:
        bin_boundaries, empirical_probs, predicted_probs, counts
    """
    y_true = np.array(y_true)
    y_proba = np.array(y_proba)

    # Create bins
    bin_boundaries = np.linspace(0, 1, n_bins + 1)
    bin_indices = np.digitize(y_proba, bin_boundaries[:-1]) - 1
    bin_indices = np.clip(bin_indices, 0, n_bins - 1)

    # Calculate empirical and predicted probabilities per bin
    empirical_probs = []
    predicted_probs = []
    counts = []

    for i in range(n_bins):
        mask = bin_indices == i
        count = np.sum(mask)

        if count > 0:
            # Empirical probability (fraction of positive examples)
            empirical_prob = np.mean(y_true[mask])
            # Mean predicted probability
            predicted_prob = np.mean(y_proba[mask])
        else:
            empirical_prob = 0
            predicted_prob = 0

        empirical_probs.append(empirical_prob)
        predicted_probs.append(predicted_prob)
        counts.append(count)

    return bin_boundaries, np.array(empirical_probs), np.array(predicted_probs), np.array(counts)

def expected_calibration_error(empirical_probs, predicted_probs, counts):
    """Compute Expected Calibration Error (ECE)."""
    total_count = np.sum(counts)
    ece = np.sum(counts * np.abs(empirical_probs - predicted_probs)) / total_count
    return ece

def plot_calibration_curve(bin_boundaries, empirical_probs, predicted_probs):
    """Plot calibration curve."""
    plt.figure(figsize=(8, 8))

    # Plot calibration curve
    bin_centers = (bin_boundaries[:-1] + bin_boundaries[1:]) / 2
    plt.plot(predicted_probs, empirical_probs, 'o-', linewidth=2, label='Calibration curve')

    # Plot perfect calibration
    plt.plot([0, 1], [0, 1], 'k--', label='Perfect calibration')

    plt.xlabel('Predicted Probability')
    plt.ylabel('Empirical Probability')
    plt.title('Calibration Curve')
    plt.legend()
    plt.grid(True)
    plt.xlim([0, 1])
    plt.ylim([0, 1])
    plt.show()

# Example usage
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression

# Generate data
X = np.random.randn(1000, 10)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

# Train poorly calibrated model (Naive Bayes)
model_uncalibrated = GaussianNB()
model_uncalibrated.fit(X, y)
y_proba_uncalibrated = model_uncalibrated.predict_proba(X)[:, 1]

# Train well-calibrated model (Logistic Regression)
model_calibrated = LogisticRegression()
model_calibrated.fit(X, y)
y_proba_calibrated = model_calibrated.predict_proba(X)[:, 1]

# Compute calibration curves
bins, emp1, pred1, counts1 = calibration_curve(y, y_proba_uncalibrated, n_bins=10)
ece1 = expected_calibration_error(emp1, pred1, counts1)

bins, emp2, pred2, counts2 = calibration_curve(y, y_proba_calibrated, n_bins=10)
ece2 = expected_calibration_error(emp2, pred2, counts2)

print(f"Naive Bayes ECE: {ece1:.3f}")
print(f"Logistic Regression ECE: {ece2:.3f}")

plot_calibration_curve(bins, emp1, pred1)
plot_calibration_curve(bins, emp2, pred2)`,
    testCases: [],
    hints: [
      'Calibration: predicted probabilities match empirical frequencies',
      'Bin predictions by probability (e.g., 0-0.1, 0.1-0.2, ...)',
      'In each bin, compute fraction of positive examples',
      'Plot predicted vs empirical probabilities',
      'Perfect calibration: points lie on diagonal',
      'ECE: average absolute difference weighted by bin size'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Bayesian Optimization',
    difficulty: 5,
    description: `Build Bayesian optimization for hyperparameter tuning.

Requirements:
- Use Gaussian Process as surrogate model
- Implement acquisition function (Expected Improvement)
- Iteratively select promising hyperparameters
- Balance exploration vs exploitation`,
    starterCode: `import numpy as np

class BayesianOptimization:
    def __init__(self, f, bounds, n_iter=25):
        self.f = f  # Objective function
        self.bounds = bounds
        self.n_iter = n_iter

    def optimize(self):
        # TODO: Implement
        pass`,
    solution: `import numpy as np
from scipy.stats import norm
from scipy.optimize import minimize
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel

class BayesianOptimization:
    def __init__(self, f, bounds, n_iter=25, n_init=5, random_state=None):
        """
        Bayesian optimization.

        Args:
            f: objective function to maximize
            bounds: list of (min, max) for each parameter
            n_iter: number of iterations
            n_init: number of random initialization points
        """
        self.f = f
        self.bounds = np.array(bounds)
        self.n_iter = n_iter
        self.n_init = n_init
        self.random_state = random_state

        self.X_observed = []
        self.y_observed = []

    def expected_improvement(self, X, gp, y_max, xi=0.01):
        """
        Expected Improvement acquisition function.

        Args:
            X: points to evaluate
            gp: fitted Gaussian Process
            y_max: current best observed value
            xi: exploration parameter

        Returns:
            expected improvement values
        """
        mu, sigma = gp.predict(X, return_std=True)
        sigma = sigma.reshape(-1, 1)

        # Calculate EI
        with np.errstate(divide='warn'):
            Z = (mu - y_max - xi) / sigma
            ei = (mu - y_max - xi) * norm.cdf(Z) + sigma * norm.pdf(Z)
            ei[sigma == 0.0] = 0.0

        return ei

    def propose_location(self, gp, y_max):
        """Find point that maximizes acquisition function."""
        min_val = float('inf')
        min_x = None

        # Try multiple random starting points
        rng = np.random.RandomState(self.random_state)
        for _ in range(10):
            x0 = rng.uniform(self.bounds[:, 0], self.bounds[:, 1])

            # Minimize negative EI
            res = minimize(
                lambda x: -self.expected_improvement(x.reshape(1, -1), gp, y_max),
                x0=x0,
                bounds=self.bounds,
                method='L-BFGS-B'
            )

            if res.fun < min_val:
                min_val = res.fun
                min_x = res.x

        return min_x

    def optimize(self):
        """Run Bayesian optimization."""
        rng = np.random.RandomState(self.random_state)

        # Random initialization
        for _ in range(self.n_init):
            x = rng.uniform(self.bounds[:, 0], self.bounds[:, 1])
            y = self.f(x)
            self.X_observed.append(x)
            self.y_observed.append(y)

        X = np.array(self.X_observed)
        y = np.array(self.y_observed).reshape(-1, 1)

        # Bayesian optimization loop
        for i in range(self.n_iter - self.n_init):
            # Fit Gaussian Process
            kernel = ConstantKernel(1.0) * RBF(length_scale=1.0)
            gp = GaussianProcessRegressor(kernel=kernel, n_restarts_optimizer=10)
            gp.fit(X, y)

            # Find next point to evaluate
            y_max = np.max(y)
            x_next = self.propose_location(gp, y_max)

            # Evaluate objective
            y_next = self.f(x_next)

            # Update observations
            self.X_observed.append(x_next)
            self.y_observed.append(y_next)

            X = np.array(self.X_observed)
            y = np.array(self.y_observed).reshape(-1, 1)

            print(f"Iteration {i+1}/{self.n_iter - self.n_init}: "
                  f"x={x_next}, f(x)={y_next:.4f}, best={np.max(y):.4f}")

        # Return best found
        best_idx = np.argmax(y)
        return self.X_observed[best_idx], self.y_observed[best_idx]

# Example usage: optimize hyperparameters of a model
from sklearn.svm import SVC
from sklearn.model_selection import cross_val_score

# Generate data
X_train = np.random.randn(200, 5)
y_train = np.random.randint(0, 2, 200)

def objective(params):
    """Objective function: cross-validation score."""
    C, gamma = params
    model = SVC(C=10**C, gamma=10**gamma)
    score = cross_val_score(model, X_train, y_train, cv=3).mean()
    return score

# Optimize
bounds = [(-3, 3), (-3, 3)]  # log10(C), log10(gamma)
optimizer = BayesianOptimization(objective, bounds, n_iter=20, random_state=42)
best_params, best_score = optimizer.optimize()

print(f"\\nBest parameters: C={10**best_params[0]:.3f}, gamma={10**best_params[1]:.3f}")
print(f"Best score: {best_score:.3f}")`,
    testCases: [],
    hints: [
      'Bayesian optimization uses Gaussian Process as surrogate',
      'Acquisition function balances exploration vs exploitation',
      'Expected Improvement: how much better than current best?',
      'Fit GP to observations, maximize acquisition to get next point',
      'More sample-efficient than random/grid search',
      'Good for expensive objective functions (e.g., training deep nets)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Early Stopping',
    difficulty: 2,
    description: `Add early stopping to prevent overfitting during training.

Requirements:
- Monitor validation loss during training
- Stop if no improvement for patience epochs
- Restore best weights
- Support different monitoring criteria`,
    starterCode: `import numpy as np

class EarlyStopping:
    def __init__(self, patience=5, min_delta=0):
        self.patience = patience
        self.min_delta = min_delta

    def __call__(self, val_loss):
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class EarlyStopping:
    def __init__(self, patience=5, min_delta=0, mode='min'):
        """
        Early stopping callback.

        Args:
            patience: number of epochs with no improvement to wait
            min_delta: minimum change to qualify as improvement
            mode: 'min' for loss, 'max' for accuracy
        """
        self.patience = patience
        self.min_delta = min_delta
        self.mode = mode
        self.counter = 0
        self.best_score = None
        self.early_stop = False
        self.best_weights = None

    def is_improvement(self, score):
        """Check if score is an improvement."""
        if self.best_score is None:
            return True

        if self.mode == 'min':
            return score < self.best_score - self.min_delta
        else:  # mode == 'max'
            return score > self.best_score + self.min_delta

    def __call__(self, score, model_weights=None):
        """
        Check if training should stop.

        Args:
            score: validation score (loss or metric)
            model_weights: current model weights to save

        Returns:
            should_stop: whether to stop training
        """
        if self.is_improvement(score):
            self.best_score = score
            self.counter = 0
            if model_weights is not None:
                self.best_weights = model_weights.copy()
        else:
            self.counter += 1
            if self.counter >= self.patience:
                self.early_stop = True

        return self.early_stop

# Example usage with PyTorch-style training loop
import torch
import torch.nn as nn
import torch.optim as optim

# Simple neural network
class SimpleNN(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Generate data
X_train = torch.randn(500, 10)
y_train = torch.randint(0, 2, (500,))
X_val = torch.randn(100, 10)
y_val = torch.randint(0, 2, (100,))

# Setup
model = SimpleNN(10, 20, 2)
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# Early stopping
early_stopping = EarlyStopping(patience=5, min_delta=0.001, mode='min')

# Training loop
for epoch in range(100):
    # Training
    model.train()
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()

    # Validation
    model.eval()
    with torch.no_grad():
        val_outputs = model(X_val)
        val_loss = criterion(val_outputs, y_val).item()

    print(f"Epoch {epoch+1}: train_loss={loss.item():.4f}, val_loss={val_loss:.4f}")

    # Check early stopping
    # In PyTorch, you'd save model.state_dict()
    if early_stopping(val_loss):
        print(f"Early stopping triggered at epoch {epoch+1}")
        # Restore best weights here
        break

print(f"Best validation loss: {early_stopping.best_score:.4f}")`,
    testCases: [],
    hints: [
      'Monitor validation metric during training',
      'Keep track of best score seen so far',
      'Increment counter when no improvement',
      'Stop when counter reaches patience',
      'Save best weights to restore later',
      'Use min_delta to avoid stopping on tiny improvements'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Calculate Matthews Correlation Coefficient',
    difficulty: 2,
    description: `Compute MCC for binary classification.

Requirements:
- Calculate from confusion matrix
- MCC = (TP*TN - FP*FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))
- Returns value between -1 and 1
- Better than accuracy for imbalanced datasets`,
    starterCode: `import numpy as np

def matthews_corrcoef(y_true, y_pred):
    """
    Calculate Matthews Correlation Coefficient.

    Args:
        y_true: true labels
        y_pred: predicted labels

    Returns:
        MCC score
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def matthews_corrcoef(y_true, y_pred):
    """
    Calculate Matthews Correlation Coefficient.

    Args:
        y_true: true binary labels (0 or 1)
        y_pred: predicted labels (0 or 1)

    Returns:
        MCC score (-1 to 1)
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    # Calculate confusion matrix elements
    tp = np.sum((y_true == 1) & (y_pred == 1))
    tn = np.sum((y_true == 0) & (y_pred == 0))
    fp = np.sum((y_true == 0) & (y_pred == 1))
    fn = np.sum((y_true == 1) & (y_pred == 0))

    # Calculate MCC
    numerator = tp * tn - fp * fn
    denominator = np.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn))

    if denominator == 0:
        return 0.0

    mcc = numerator / denominator

    return mcc

# Example usage
y_true = [1, 1, 0, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0]

mcc = matthews_corrcoef(y_true, y_pred)
print(f"MCC: {mcc:.3f}")

# Compare with imbalanced dataset
y_true_imb = [1] * 95 + [0] * 5
y_pred_imb = [1] * 100  # Predict all positive

from sklearn.metrics import accuracy_score
acc = accuracy_score(y_true_imb, y_pred_imb)
mcc_imb = matthews_corrcoef(y_true_imb, y_pred_imb)

print(f"\\nImbalanced dataset:")
print(f"Accuracy: {acc:.3f}")  # 0.95 (misleading!)
print(f"MCC: {mcc_imb:.3f}")   # Low (correctly shows poor performance)`,
    testCases: [],
    hints: [
      'MCC takes into account all four confusion matrix values',
      'Returns value between -1 (total disagreement) and 1 (perfect)',
      'MCC = 0 means random prediction',
      'More robust than accuracy for imbalanced classes',
      'Handle division by zero when denominator is 0',
      'Formula: (TP*TN - FP*FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-7-16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Implement Nested Cross-Validation',
    difficulty: 4,
    description: `Build nested CV for unbiased model selection and evaluation.

Requirements:
- Outer loop: estimate generalization performance
- Inner loop: hyperparameter tuning
- Avoid data leakage from parameter selection
- Return unbiased performance estimate`,
    starterCode: `import numpy as np

def nested_cross_validation(model, param_grid, X, y,
                            outer_cv=5, inner_cv=3):
    """
    Perform nested cross-validation.

    Args:
        model: sklearn model
        param_grid: hyperparameter grid
        X: features
        y: labels
        outer_cv: outer CV folds
        inner_cv: inner CV folds

    Returns:
        outer_scores, best_params_per_fold
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
from sklearn.model_selection import KFold, GridSearchCV
import copy

def nested_cross_validation(model, param_grid, X, y,
                            outer_cv=5, inner_cv=3, scoring='accuracy'):
    """
    Perform nested cross-validation.

    Args:
        model: sklearn model
        param_grid: hyperparameter grid
        X: features (n_samples, n_features)
        y: labels
        outer_cv: outer CV folds
        inner_cv: inner CV folds
        scoring: scoring metric

    Returns:
        outer_scores, best_params_per_fold
    """
    outer_kfold = KFold(n_splits=outer_cv, shuffle=True, random_state=42)
    outer_scores = []
    best_params_per_fold = []

    for fold_idx, (train_idx, test_idx) in enumerate(outer_kfold.split(X)):
        print(f"\\nOuter fold {fold_idx + 1}/{outer_cv}")

        # Split data
        X_train, X_test = X[train_idx], X[test_idx]
        y_train, y_test = y[train_idx], y[test_idx]

        # Inner loop: hyperparameter tuning
        inner_cv = GridSearchCV(
            estimator=model,
            param_grid=param_grid,
            cv=inner_cv,
            scoring=scoring,
            n_jobs=-1
        )

        inner_cv.fit(X_train, y_train)

        # Best parameters from inner CV
        best_params = inner_cv.best_params_
        best_params_per_fold.append(best_params)

        print(f"  Best params: {best_params}")
        print(f"  Inner CV score: {inner_cv.best_score_:.3f}")

        # Evaluate on outer test set
        test_score = inner_cv.score(X_test, y_test)
        outer_scores.append(test_score)

        print(f"  Outer test score: {test_score:.3f}")

    outer_scores = np.array(outer_scores)

    print(f"\\n{'='*50}")
    print(f"Nested CV Results:")
    print(f"Mean score: {np.mean(outer_scores):.3f} (+/- {np.std(outer_scores):.3f})")
    print(f"Scores: {outer_scores}")

    return outer_scores, best_params_per_fold

# Example usage
from sklearn.svm import SVC
from sklearn.datasets import make_classification

# Generate data
X, y = make_classification(n_samples=200, n_features=10,
                           n_informative=5, random_state=42)

# Define model and parameter grid
model = SVC()
param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto']
}

# Run nested CV
scores, best_params = nested_cross_validation(
    model, param_grid, X, y,
    outer_cv=5, inner_cv=3
)

print(f"\\nBest parameters per fold:")
for i, params in enumerate(best_params):
    print(f"  Fold {i+1}: {params}")`,
    testCases: [],
    hints: [
      'Nested CV has two loops: outer (evaluation) and inner (tuning)',
      'Outer loop: estimate true generalization performance',
      'Inner loop: select best hyperparameters on training data',
      'Never use test data for hyperparameter selection',
      'Each outer fold may select different best parameters',
      'More computationally expensive but gives unbiased estimate'
    ],
    language: 'python'
  }
];
