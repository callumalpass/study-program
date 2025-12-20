import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs402-t3-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Calculate Gini Impurity',
    difficulty: 2,
    description: `Implement Gini impurity for decision tree splitting.

Requirements:
- Calculate class probabilities
- Gini = 1 - Σ(p_i²)
- Return impurity score (0 = pure, 0.5 = mixed for binary)
- Handle multiple classes`,
    starterCode: `import numpy as np

def gini_impurity(y):
    """
    Calculate Gini impurity of a node.

    Args:
        y: Labels in the node

    Returns:
        Gini impurity score
    """
    # TODO: Implement Gini impurity
    pass`,
    solution: `import numpy as np

def gini_impurity(y):
    """
    Calculate Gini impurity of a node.

    Args:
        y: Labels in the node

    Returns:
        Gini impurity score
    """
    if len(y) == 0:
        return 0

    # Calculate class probabilities
    classes, counts = np.unique(y, return_counts=True)
    probabilities = counts / len(y)

    # Gini = 1 - sum(p_i^2)
    gini = 1 - np.sum(probabilities ** 2)

    return gini`,
    testCases: [],
    hints: [
      'Gini = 1 - sum of squared probabilities',
      'Pure node (all same class) has Gini = 0',
      'Maximum impurity for binary: Gini = 0.5',
      'Use np.unique() to count class occurrences',
      'Probabilities = counts / total samples'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex02',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Calculate Entropy',
    difficulty: 2,
    description: `Implement entropy for information gain calculation.

Requirements:
- Calculate class probabilities
- Entropy = -Σ(p_i * log2(p_i))
- Handle p = 0 case
- Return entropy score`,
    starterCode: `import numpy as np

def entropy(y):
    """
    Calculate entropy of a node.

    Args:
        y: Labels in the node

    Returns:
        Entropy score
    """
    # TODO: Implement entropy
    pass`,
    solution: `import numpy as np

def entropy(y):
    """
    Calculate entropy of a node.

    Args:
        y: Labels in the node

    Returns:
        Entropy score
    """
    if len(y) == 0:
        return 0

    # Calculate class probabilities
    classes, counts = np.unique(y, return_counts=True)
    probabilities = counts / len(y)

    # Entropy = -sum(p_i * log2(p_i))
    # Filter out zero probabilities to avoid log(0)
    probabilities = probabilities[probabilities > 0]
    ent = -np.sum(probabilities * np.log2(probabilities))

    return ent`,
    testCases: [],
    hints: [
      'Entropy = -sum(p * log2(p))',
      'Pure node has entropy = 0',
      'Filter out zero probabilities before log',
      'Use np.log2() for base-2 logarithm',
      'Maximum entropy for binary: 1 bit'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex03',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Calculate Information Gain',
    difficulty: 2,
    description: `Calculate information gain for a split decision.

Requirements:
- Calculate parent entropy
- Calculate weighted child entropies
- Information Gain = parent_entropy - weighted_child_entropy
- Return gain value`,
    starterCode: `import numpy as np

def information_gain(y_parent, y_left, y_right):
    """
    Calculate information gain from a split.

    Args:
        y_parent: Labels before split
        y_left: Labels in left child
        y_right: Labels in right child

    Returns:
        Information gain
    """
    # TODO: Implement information gain
    pass`,
    solution: `import numpy as np

def entropy(y):
    """Calculate entropy."""
    if len(y) == 0:
        return 0
    classes, counts = np.unique(y, return_counts=True)
    probabilities = counts / len(y)
    probabilities = probabilities[probabilities > 0]
    return -np.sum(probabilities * np.log2(probabilities))

def information_gain(y_parent, y_left, y_right):
    """
    Calculate information gain from a split.

    Args:
        y_parent: Labels before split
        y_left: Labels in left child
        y_right: Labels in right child

    Returns:
        Information gain
    """
    n = len(y_parent)
    n_left = len(y_left)
    n_right = len(y_right)

    # Parent entropy
    parent_entropy = entropy(y_parent)

    # Weighted child entropy
    if n_left == 0 or n_right == 0:
        return 0

    child_entropy = (n_left / n) * entropy(y_left) + (n_right / n) * entropy(y_right)

    # Information gain
    gain = parent_entropy - child_entropy

    return gain`,
    testCases: [],
    hints: [
      'Information Gain = H(parent) - weighted_H(children)',
      'Weight by proportion of samples in each child',
      'Higher gain = better split',
      'If all samples go to one child, gain = 0',
      'Choose split with maximum information gain'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex04',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Find Best Split',
    difficulty: 3,
    description: `Find the best feature and threshold to split a node.

Requirements:
- Try all features and thresholds
- Calculate information gain for each split
- Return best feature index and threshold
- Handle continuous features`,
    starterCode: `import numpy as np

def find_best_split(X, y):
    """
    Find best feature and threshold for splitting.

    Args:
        X: Feature matrix (n_samples, n_features)
        y: Labels

    Returns:
        best_feature: Index of best feature
        best_threshold: Best threshold value
        best_gain: Information gain achieved
    """
    # TODO: Implement best split finding
    pass`,
    solution: `import numpy as np

def entropy(y):
    """Calculate entropy."""
    if len(y) == 0:
        return 0
    classes, counts = np.unique(y, return_counts=True)
    probabilities = counts / len(y)
    probabilities = probabilities[probabilities > 0]
    return -np.sum(probabilities * np.log2(probabilities))

def information_gain(y_parent, y_left, y_right):
    """Calculate information gain."""
    n = len(y_parent)
    n_left = len(y_left)
    n_right = len(y_right)

    if n_left == 0 or n_right == 0:
        return 0

    parent_entropy = entropy(y_parent)
    child_entropy = (n_left / n) * entropy(y_left) + (n_right / n) * entropy(y_right)
    return parent_entropy - child_entropy

def find_best_split(X, y):
    """
    Find best feature and threshold for splitting.

    Args:
        X: Feature matrix (n_samples, n_features)
        y: Labels

    Returns:
        best_feature: Index of best feature
        best_threshold: Best threshold value
        best_gain: Information gain achieved
    """
    X = np.array(X)
    y = np.array(y)
    n_samples, n_features = X.shape

    best_gain = -1
    best_feature = None
    best_threshold = None

    # Try each feature
    for feature_idx in range(n_features):
        feature_values = X[:, feature_idx]

        # Try each unique value as threshold
        thresholds = np.unique(feature_values)

        for threshold in thresholds:
            # Split data
            left_mask = feature_values <= threshold
            right_mask = ~left_mask

            if np.sum(left_mask) == 0 or np.sum(right_mask) == 0:
                continue

            y_left = y[left_mask]
            y_right = y[right_mask]

            # Calculate gain
            gain = information_gain(y, y_left, y_right)

            if gain > best_gain:
                best_gain = gain
                best_feature = feature_idx
                best_threshold = threshold

    return best_feature, best_threshold, best_gain`,
    testCases: [],
    hints: [
      'Try every feature and every unique value as threshold',
      'Split data: left (<=threshold), right (>threshold)',
      'Calculate information gain for each split',
      'Keep track of best split seen so far',
      'Skip splits that put all samples in one child'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex05',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Decision Tree Node',
    difficulty: 3,
    description: `Create a node class for decision tree structure.

Requirements:
- Store feature, threshold for internal nodes
- Store value for leaf nodes
- Track left and right children
- Implement is_leaf method`,
    starterCode: `class TreeNode:
    def __init__(self):
        """Initialize tree node."""
        # TODO: Define node attributes
        pass

    def is_leaf(self):
        """Check if node is a leaf."""
        # TODO: Implement is_leaf
        pass`,
    solution: `class TreeNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
        """
        Initialize tree node.

        For internal nodes: feature, threshold, left, right are set
        For leaf nodes: value is set
        """
        self.feature = feature      # Feature index to split on
        self.threshold = threshold  # Threshold value for split
        self.left = left           # Left child node
        self.right = right         # Right child node
        self.value = value         # Class label for leaf node

    def is_leaf(self):
        """Check if node is a leaf."""
        return self.value is not None`,
    testCases: [],
    hints: [
      'Internal nodes have feature and threshold',
      'Leaf nodes have value (class label)',
      'Left and right store child nodes',
      'Node is leaf if it has no children',
      'value is None for internal nodes'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex06',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Basic Decision Tree',
    difficulty: 4,
    description: `Implement a basic decision tree classifier from scratch.

Requirements:
- Recursive tree building
- Stop at max depth or pure nodes
- Use Gini impurity for splitting
- Implement fit and predict methods`,
    starterCode: `import numpy as np

class DecisionTreeClassifier:
    def __init__(self, max_depth=5, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None

    def fit(self, X, y):
        """Build decision tree."""
        # TODO: Implement tree building
        pass

    def predict(self, X):
        """Predict class labels."""
        # TODO: Implement prediction
        pass`,
    solution: `import numpy as np

class TreeNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
        self.feature = feature
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value

    def is_leaf(self):
        return self.value is not None

class DecisionTreeClassifier:
    def __init__(self, max_depth=5, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None

    def gini_impurity(self, y):
        """Calculate Gini impurity."""
        if len(y) == 0:
            return 0
        classes, counts = np.unique(y, return_counts=True)
        probabilities = counts / len(y)
        return 1 - np.sum(probabilities ** 2)

    def split(self, X, y, feature, threshold):
        """Split data based on feature and threshold."""
        left_mask = X[:, feature] <= threshold
        right_mask = ~left_mask
        return X[left_mask], X[right_mask], y[left_mask], y[right_mask]

    def find_best_split(self, X, y):
        """Find best split."""
        best_gini = float('inf')
        best_feature = None
        best_threshold = None

        for feature_idx in range(X.shape[1]):
            thresholds = np.unique(X[:, feature_idx])
            for threshold in thresholds:
                left_mask = X[:, feature_idx] <= threshold
                right_mask = ~left_mask

                if np.sum(left_mask) == 0 or np.sum(right_mask) == 0:
                    continue

                y_left, y_right = y[left_mask], y[right_mask]
                n = len(y)
                gini = (len(y_left) / n) * self.gini_impurity(y_left) + \\
                       (len(y_right) / n) * self.gini_impurity(y_right)

                if gini < best_gini:
                    best_gini = gini
                    best_feature = feature_idx
                    best_threshold = threshold

        return best_feature, best_threshold

    def build_tree(self, X, y, depth=0):
        """Recursively build tree."""
        n_samples = len(y)
        n_classes = len(np.unique(y))

        # Stopping criteria
        if depth >= self.max_depth or n_classes == 1 or n_samples < self.min_samples_split:
            leaf_value = np.argmax(np.bincount(y))
            return TreeNode(value=leaf_value)

        # Find best split
        feature, threshold = self.find_best_split(X, y)

        if feature is None:
            leaf_value = np.argmax(np.bincount(y))
            return TreeNode(value=leaf_value)

        # Split and recurse
        X_left, X_right, y_left, y_right = self.split(X, y, feature, threshold)
        left_child = self.build_tree(X_left, y_left, depth + 1)
        right_child = self.build_tree(X_right, y_right, depth + 1)

        return TreeNode(feature=feature, threshold=threshold, left=left_child, right=right_child)

    def fit(self, X, y):
        """Build decision tree."""
        X = np.array(X)
        y = np.array(y)
        self.root = self.build_tree(X, y)
        return self

    def predict_sample(self, x, node):
        """Predict single sample."""
        if node.is_leaf():
            return node.value

        if x[node.feature] <= node.threshold:
            return self.predict_sample(x, node.left)
        else:
            return self.predict_sample(x, node.right)

    def predict(self, X):
        """Predict class labels."""
        X = np.array(X)
        return np.array([self.predict_sample(x, self.root) for x in X])`,
    testCases: [],
    hints: [
      'Build tree recursively from root to leaves',
      'Stop when max_depth reached or node is pure',
      'Choose split with minimum Gini impurity',
      'Leaf nodes store most common class',
      'Traverse tree for prediction: left if <=threshold, right otherwise'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex07',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Calculate Feature Importance for Decision Tree',
    difficulty: 3,
    description: `Calculate feature importance based on impurity reduction.

Requirements:
- Track total impurity reduction per feature
- Weight by number of samples
- Normalize importances to sum to 1
- Return array of importances`,
    starterCode: `import numpy as np

def calculate_feature_importance(tree, n_features):
    """
    Calculate feature importance for decision tree.

    Args:
        tree: Trained decision tree with root node
        n_features: Number of features

    Returns:
        importances: Array of feature importances
    """
    # TODO: Implement feature importance calculation
    pass`,
    solution: `import numpy as np

def calculate_feature_importance(tree, n_features):
    """
    Calculate feature importance for decision tree.

    Args:
        tree: Trained decision tree with root node
        n_features: Number of features

    Returns:
        importances: Array of feature importances
    """
    importances = np.zeros(n_features)

    def traverse(node, n_samples):
        """Recursively calculate importance."""
        if node.is_leaf():
            return

        # Importance = (samples at node / total) * impurity reduction
        # For simplicity, we'll count how often each feature is used
        importances[node.feature] += n_samples

        # Recurse to children (approximate sample counts)
        if node.left:
            traverse(node.left, n_samples / 2)
        if node.right:
            traverse(node.right, n_samples / 2)

    # Start traversal
    traverse(tree.root, 1.0)

    # Normalize to sum to 1
    if np.sum(importances) > 0:
        importances = importances / np.sum(importances)

    return importances`,
    testCases: [],
    hints: [
      'Traverse tree and sum importance per feature',
      'Importance increases when feature is used for splitting',
      'Weight by number of samples at node',
      'Normalize so importances sum to 1',
      'Features used higher in tree are more important'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex08',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Bootstrap Sampling',
    difficulty: 2,
    description: `Implement bootstrap sampling for ensemble methods.

Requirements:
- Sample n samples with replacement
- Return sampled data and out-of-bag indices
- Maintain approximately 63% unique samples
- Support both X and y`,
    starterCode: `import numpy as np

def bootstrap_sample(X, y, random_state=None):
    """
    Create bootstrap sample.

    Args:
        X: Feature matrix
        y: Labels
        random_state: Random seed

    Returns:
        X_sample, y_sample, oob_indices
    """
    # TODO: Implement bootstrap sampling
    pass`,
    solution: `import numpy as np

def bootstrap_sample(X, y, random_state=None):
    """
    Create bootstrap sample.

    Args:
        X: Feature matrix
        y: Labels
        random_state: Random seed

    Returns:
        X_sample, y_sample, oob_indices
    """
    if random_state is not None:
        np.random.seed(random_state)

    n_samples = len(X)

    # Sample with replacement
    sample_indices = np.random.choice(n_samples, n_samples, replace=True)

    X_sample = X[sample_indices]
    y_sample = y[sample_indices]

    # Out-of-bag samples (not selected)
    all_indices = set(range(n_samples))
    sampled_indices = set(sample_indices)
    oob_indices = np.array(list(all_indices - sampled_indices))

    return X_sample, y_sample, oob_indices`,
    testCases: [],
    hints: [
      'Bootstrap: sample n times with replacement',
      'Use np.random.choice() with replace=True',
      'OOB samples are those not selected',
      'About 37% of samples are OOB on average',
      'OOB samples can be used for validation'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex09',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Random Forest Classifier',
    difficulty: 4,
    description: `Implement Random Forest using multiple decision trees.

Requirements:
- Train multiple trees on bootstrap samples
- Use random feature subset for each split
- Aggregate predictions by majority voting
- Track out-of-bag error`,
    starterCode: `import numpy as np

class RandomForestClassifier:
    def __init__(self, n_estimators=10, max_depth=5, max_features='sqrt'):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.max_features = max_features
        self.trees = []

    def fit(self, X, y):
        """Train random forest."""
        # TODO: Implement random forest training
        pass

    def predict(self, X):
        """Predict using majority voting."""
        # TODO: Implement prediction
        pass`,
    solution: `import numpy as np

class SimpleDecisionTree:
    """Simplified decision tree for random forest."""
    def __init__(self, max_depth=5, max_features=None):
        self.max_depth = max_depth
        self.max_features = max_features
        self.tree = None

    def fit(self, X, y):
        self.n_features = X.shape[1]
        if self.max_features is None:
            self.max_features = self.n_features
        self.tree = self._build_tree(X, y, 0)
        return self

    def _build_tree(self, X, y, depth):
        if depth >= self.max_depth or len(np.unique(y)) == 1 or len(y) < 2:
            return {'value': np.argmax(np.bincount(y))}

        # Random feature subset
        feature_indices = np.random.choice(self.n_features,
                                          min(self.max_features, self.n_features),
                                          replace=False)

        best_gain = -1
        best_feature = None
        best_threshold = None

        for feature_idx in feature_indices:
            thresholds = np.unique(X[:, feature_idx])
            for threshold in thresholds:
                left_mask = X[:, feature_idx] <= threshold
                if np.sum(left_mask) == 0 or np.sum(~left_mask) == 0:
                    continue

                y_left, y_right = y[left_mask], y[~left_mask]
                n = len(y)
                gini = (len(y_left) / n) * (1 - np.sum((np.bincount(y_left) / len(y_left)) ** 2)) + \\
                       (len(y_right) / n) * (1 - np.sum((np.bincount(y_right) / len(y_right)) ** 2))

                gain = 1 - gini
                if gain > best_gain:
                    best_gain = gain
                    best_feature = feature_idx
                    best_threshold = threshold

        if best_feature is None:
            return {'value': np.argmax(np.bincount(y))}

        left_mask = X[:, best_feature] <= best_threshold
        return {
            'feature': best_feature,
            'threshold': best_threshold,
            'left': self._build_tree(X[left_mask], y[left_mask], depth + 1),
            'right': self._build_tree(X[~left_mask], y[~left_mask], depth + 1)
        }

    def predict(self, X):
        return np.array([self._predict_sample(x, self.tree) for x in X])

    def _predict_sample(self, x, node):
        if 'value' in node:
            return node['value']
        if x[node['feature']] <= node['threshold']:
            return self._predict_sample(x, node['left'])
        return self._predict_sample(x, node['right'])

class RandomForestClassifier:
    def __init__(self, n_estimators=10, max_depth=5, max_features='sqrt'):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.max_features = max_features
        self.trees = []

    def fit(self, X, y):
        """Train random forest."""
        X = np.array(X)
        y = np.array(y)

        n_features = X.shape[1]
        if self.max_features == 'sqrt':
            max_features = int(np.sqrt(n_features))
        elif self.max_features == 'log2':
            max_features = int(np.log2(n_features))
        else:
            max_features = n_features

        self.trees = []
        for _ in range(self.n_estimators):
            # Bootstrap sample
            n_samples = len(X)
            indices = np.random.choice(n_samples, n_samples, replace=True)
            X_sample = X[indices]
            y_sample = y[indices]

            # Train tree
            tree = SimpleDecisionTree(max_depth=self.max_depth, max_features=max_features)
            tree.fit(X_sample, y_sample)
            self.trees.append(tree)

        return self

    def predict(self, X):
        """Predict using majority voting."""
        X = np.array(X)

        # Get predictions from all trees
        tree_preds = np.array([tree.predict(X) for tree in self.trees])

        # Majority voting
        predictions = []
        for i in range(len(X)):
            predictions.append(np.argmax(np.bincount(tree_preds[:, i].astype(int))))

        return np.array(predictions)`,
    testCases: [],
    hints: [
      'Train each tree on bootstrap sample',
      'Use random subset of features for each split',
      'Common max_features: sqrt(n_features) for classification',
      'Aggregate predictions by majority voting',
      'More trees generally improve performance'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement K-Nearest Neighbors',
    difficulty: 3,
    description: `Implement KNN classifier from scratch.

Requirements:
- Calculate distances to all training samples
- Find k nearest neighbors
- Use majority voting for classification
- Support different distance metrics`,
    starterCode: `import numpy as np

class KNNClassifier:
    def __init__(self, n_neighbors=5, metric='euclidean'):
        self.n_neighbors = n_neighbors
        self.metric = metric
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """Store training data."""
        # TODO: Implement fit
        pass

    def predict(self, X):
        """Predict using KNN."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class KNNClassifier:
    def __init__(self, n_neighbors=5, metric='euclidean'):
        self.n_neighbors = n_neighbors
        self.metric = metric
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """Store training data."""
        self.X_train = np.array(X)
        self.y_train = np.array(y)
        return self

    def distance(self, x1, x2):
        """Calculate distance between two points."""
        if self.metric == 'euclidean':
            return np.sqrt(np.sum((x1 - x2) ** 2))
        elif self.metric == 'manhattan':
            return np.sum(np.abs(x1 - x2))
        else:
            raise ValueError(f"Unknown metric: {self.metric}")

    def predict_sample(self, x):
        """Predict single sample."""
        # Calculate distances to all training samples
        distances = [self.distance(x, x_train) for x_train in self.X_train]

        # Get k nearest neighbors
        k_indices = np.argsort(distances)[:self.n_neighbors]
        k_nearest_labels = self.y_train[k_indices]

        # Majority voting
        most_common = np.argmax(np.bincount(k_nearest_labels))
        return most_common

    def predict(self, X):
        """Predict using KNN."""
        X = np.array(X)
        return np.array([self.predict_sample(x) for x in X])`,
    testCases: [],
    hints: [
      'KNN is instance-based: store training data',
      'For each test sample, find k nearest training samples',
      'Use Euclidean distance: sqrt(sum((x1-x2)^2))',
      'np.argsort() returns indices that sort array',
      'Majority voting: most common class among k neighbors'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Naive Bayes Classifier',
    difficulty: 3,
    description: `Implement Gaussian Naive Bayes from scratch.

Requirements:
- Calculate prior probabilities P(y)
- Calculate mean and variance for each feature per class
- Use Gaussian likelihood P(x|y)
- Predict using Bayes theorem`,
    starterCode: `import numpy as np

class GaussianNaiveBayes:
    def __init__(self):
        self.classes = None
        self.priors = {}
        self.means = {}
        self.variances = {}

    def fit(self, X, y):
        """Train Naive Bayes."""
        # TODO: Implement fit
        pass

    def predict(self, X):
        """Predict using Bayes theorem."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class GaussianNaiveBayes:
    def __init__(self):
        self.classes = None
        self.priors = {}
        self.means = {}
        self.variances = {}

    def fit(self, X, y):
        """Train Naive Bayes."""
        X = np.array(X)
        y = np.array(y)
        self.classes = np.unique(y)

        # Calculate statistics for each class
        for cls in self.classes:
            X_cls = X[y == cls]

            # Prior probability
            self.priors[cls] = len(X_cls) / len(X)

            # Mean and variance for each feature
            self.means[cls] = np.mean(X_cls, axis=0)
            self.variances[cls] = np.var(X_cls, axis=0) + 1e-9  # Add small value for stability

        return self

    def gaussian_likelihood(self, x, mean, variance):
        """Calculate Gaussian probability density."""
        exponent = -((x - mean) ** 2) / (2 * variance)
        return (1 / np.sqrt(2 * np.pi * variance)) * np.exp(exponent)

    def predict_sample(self, x):
        """Predict single sample using Bayes theorem."""
        posteriors = {}

        for cls in self.classes:
            # Start with prior
            posterior = np.log(self.priors[cls])

            # Multiply likelihoods (add log likelihoods)
            for i in range(len(x)):
                likelihood = self.gaussian_likelihood(x[i], self.means[cls][i], self.variances[cls][i])
                posterior += np.log(likelihood + 1e-9)  # Add small value to avoid log(0)

            posteriors[cls] = posterior

        # Return class with highest posterior
        return max(posteriors, key=posteriors.get)

    def predict(self, X):
        """Predict using Bayes theorem."""
        X = np.array(X)
        return np.array([self.predict_sample(x) for x in X])`,
    testCases: [],
    hints: [
      'Naive Bayes assumes features are independent',
      'Prior: P(y) = count(y) / total samples',
      'Gaussian likelihood: (1/√(2πσ²)) * exp(-(x-μ)²/(2σ²))',
      'Use log probabilities to avoid underflow',
      'Predict class with highest posterior probability'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Calculate SVM Margin',
    difficulty: 3,
    description: `Calculate the margin of a linear SVM.

Requirements:
- Given weights and bias
- Calculate distance from hyperplane
- Margin = 2 / ||w||
- Identify support vectors`,
    starterCode: `import numpy as np

def calculate_margin(w, b, X, y):
    """
    Calculate SVM margin and identify support vectors.

    Args:
        w: Weight vector
        b: Bias term
        X: Feature matrix
        y: Labels (-1 or +1)

    Returns:
        margin: Margin width
        support_vectors: Indices of support vectors
    """
    # TODO: Implement margin calculation
    pass`,
    solution: `import numpy as np

def calculate_margin(w, b, X, y):
    """
    Calculate SVM margin and identify support vectors.

    Args:
        w: Weight vector
        b: Bias term
        X: Feature matrix
        y: Labels (-1 or +1)

    Returns:
        margin: Margin width
        support_vectors: Indices of support vectors
    """
    w = np.array(w)
    X = np.array(X)
    y = np.array(y)

    # Margin = 2 / ||w||
    margin = 2 / np.linalg.norm(w)

    # Distance from hyperplane: y * (w·x + b)
    distances = y * (X @ w + b)

    # Support vectors are on the margin: distance = 1
    support_vectors = np.where(np.abs(distances - 1) < 1e-6)[0]

    return margin, support_vectors`,
    testCases: [],
    hints: [
      'Decision boundary: w·x + b = 0',
      'Margin boundaries: w·x + b = ±1',
      'Margin width: 2 / ||w||',
      'Support vectors lie on margin boundaries',
      'Distance from hyperplane: |w·x + b| / ||w||'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Linear SVM with SGD',
    difficulty: 4,
    description: `Implement linear SVM using stochastic gradient descent.

Requirements:
- Hinge loss: max(0, 1 - y*(w·x + b))
- Add L2 regularization
- Update weights using SGD
- Support binary classification`,
    starterCode: `import numpy as np

class LinearSVM:
    def __init__(self, learning_rate=0.01, lambda_param=0.01, n_epochs=1000):
        self.learning_rate = learning_rate
        self.lambda_param = lambda_param
        self.n_epochs = n_epochs
        self.w = None
        self.b = None

    def fit(self, X, y):
        """Train SVM using SGD."""
        # TODO: Implement SVM training
        pass

    def predict(self, X):
        """Predict class labels."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class LinearSVM:
    def __init__(self, learning_rate=0.01, lambda_param=0.01, n_epochs=1000):
        self.learning_rate = learning_rate
        self.lambda_param = lambda_param
        self.n_epochs = n_epochs
        self.w = None
        self.b = None

    def fit(self, X, y):
        """Train SVM using SGD."""
        X = np.array(X)
        y = np.array(y)

        # Convert labels to -1, +1
        y = np.where(y <= 0, -1, 1)

        n_samples, n_features = X.shape

        # Initialize parameters
        self.w = np.zeros(n_features)
        self.b = 0

        # SGD
        for epoch in range(self.n_epochs):
            for i in range(n_samples):
                xi = X[i]
                yi = y[i]

                # Hinge loss condition
                if yi * (np.dot(self.w, xi) + self.b) >= 1:
                    # Correct classification
                    self.w -= self.learning_rate * (2 * self.lambda_param * self.w)
                else:
                    # Misclassification or within margin
                    self.w -= self.learning_rate * (2 * self.lambda_param * self.w - yi * xi)
                    self.b -= self.learning_rate * (-yi)

        return self

    def predict(self, X):
        """Predict class labels."""
        X = np.array(X)
        linear_output = X @ self.w + self.b
        return np.sign(linear_output).astype(int)`,
    testCases: [],
    hints: [
      'Hinge loss: max(0, 1 - y*(w·x + b))',
      'If y*(w·x + b) >= 1: only update regularization term',
      'If y*(w·x + b) < 1: update both hinge loss and regularization',
      'Gradient for regularization: 2*lambda*w',
      'Gradient for hinge loss: -y*x'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement RBF Kernel',
    difficulty: 3,
    description: `Implement Radial Basis Function (Gaussian) kernel for SVM.

Requirements:
- Calculate RBF kernel: K(x, y) = exp(-γ||x-y||²)
- Support kernel matrix computation
- Handle gamma parameter
- Efficient pairwise distance calculation`,
    starterCode: `import numpy as np

def rbf_kernel(X, Y=None, gamma=1.0):
    """
    Calculate RBF kernel matrix.

    Args:
        X: First set of samples (n_samples_1, n_features)
        Y: Second set of samples (n_samples_2, n_features)
           If None, use Y = X
        gamma: Kernel coefficient

    Returns:
        Kernel matrix (n_samples_1, n_samples_2)
    """
    # TODO: Implement RBF kernel
    pass`,
    solution: `import numpy as np

def rbf_kernel(X, Y=None, gamma=1.0):
    """
    Calculate RBF kernel matrix.

    Args:
        X: First set of samples (n_samples_1, n_features)
        Y: Second set of samples (n_samples_2, n_features)
           If None, use Y = X
        gamma: Kernel coefficient

    Returns:
        Kernel matrix (n_samples_1, n_samples_2)
    """
    X = np.array(X)
    if Y is None:
        Y = X
    else:
        Y = np.array(Y)

    # Calculate pairwise squared Euclidean distances
    # ||x - y||^2 = ||x||^2 + ||y||^2 - 2*x·y
    X_norm = np.sum(X ** 2, axis=1).reshape(-1, 1)
    Y_norm = np.sum(Y ** 2, axis=1).reshape(1, -1)
    distances_squared = X_norm + Y_norm - 2 * X @ Y.T

    # RBF kernel: exp(-gamma * ||x - y||^2)
    K = np.exp(-gamma * distances_squared)

    return K`,
    testCases: [],
    hints: [
      'RBF kernel: exp(-gamma * ||x-y||²)',
      'Efficient computation: ||x-y||² = ||x||² + ||y||² - 2x·y',
      'gamma controls kernel width',
      'High gamma: narrow kernel, low gamma: wide kernel',
      'Kernel matrix is symmetric if X = Y'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement Weighted KNN',
    difficulty: 3,
    description: `Implement weighted KNN where closer neighbors have higher influence.

Requirements:
- Weight by inverse distance
- Handle zero distances
- Use weighted voting for classification
- Support different distance metrics`,
    starterCode: `import numpy as np

class WeightedKNN:
    def __init__(self, n_neighbors=5, weights='distance'):
        self.n_neighbors = n_neighbors
        self.weights = weights  # 'uniform' or 'distance'
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """Store training data."""
        # TODO: Implement fit
        pass

    def predict(self, X):
        """Predict using weighted KNN."""
        # TODO: Implement weighted prediction
        pass`,
    solution: `import numpy as np

class WeightedKNN:
    def __init__(self, n_neighbors=5, weights='distance'):
        self.n_neighbors = n_neighbors
        self.weights = weights  # 'uniform' or 'distance'
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """Store training data."""
        self.X_train = np.array(X)
        self.y_train = np.array(y)
        return self

    def predict_sample(self, x):
        """Predict single sample with weighted voting."""
        # Calculate distances
        distances = np.sqrt(np.sum((self.X_train - x) ** 2, axis=1))

        # Get k nearest neighbors
        k_indices = np.argsort(distances)[:self.n_neighbors]
        k_distances = distances[k_indices]
        k_labels = self.y_train[k_indices]

        if self.weights == 'uniform':
            # Standard majority voting
            return np.argmax(np.bincount(k_labels))
        elif self.weights == 'distance':
            # Weighted voting
            # Weight = 1 / distance (handle zero distance)
            weights = np.where(k_distances == 0, 1e10, 1 / k_distances)

            # Weighted voting for each class
            classes = np.unique(self.y_train)
            weighted_votes = np.zeros(len(classes))

            for i, cls in enumerate(classes):
                weighted_votes[i] = np.sum(weights[k_labels == cls])

            return classes[np.argmax(weighted_votes)]

    def predict(self, X):
        """Predict using weighted KNN."""
        X = np.array(X)
        return np.array([self.predict_sample(x) for x in X])`,
    testCases: [],
    hints: [
      'Weight by inverse distance: w = 1/d',
      'Handle zero distance: set very large weight',
      'Weighted vote: sum weights for each class',
      'Closer neighbors have more influence',
      'Uniform weights = standard KNN'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t3-ex16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Implement AdaBoost',
    difficulty: 4,
    description: `Implement AdaBoost ensemble method with decision stumps.

Requirements:
- Use decision stumps (depth-1 trees) as weak learners
- Update sample weights based on errors
- Calculate classifier weights (alpha)
- Combine classifiers for final prediction`,
    starterCode: `import numpy as np

class AdaBoost:
    def __init__(self, n_estimators=50):
        self.n_estimators = n_estimators
        self.alphas = []
        self.classifiers = []

    def fit(self, X, y):
        """Train AdaBoost."""
        # TODO: Implement AdaBoost training
        pass

    def predict(self, X):
        """Predict using weighted combination."""
        # TODO: Implement prediction
        pass`,
    solution: `import numpy as np

class DecisionStump:
    """Simple decision stump (depth-1 tree)."""
    def __init__(self):
        self.feature_idx = None
        self.threshold = None
        self.polarity = 1

    def fit(self, X, y, sample_weights):
        n_samples, n_features = X.shape
        best_error = float('inf')

        for feature_idx in range(n_features):
            thresholds = np.unique(X[:, feature_idx])
            for threshold in thresholds:
                for polarity in [1, -1]:
                    predictions = np.ones(n_samples)
                    predictions[X[:, feature_idx] < threshold] = -1
                    if polarity == -1:
                        predictions = -predictions

                    error = np.sum(sample_weights[predictions != y])

                    if error < best_error:
                        best_error = error
                        self.feature_idx = feature_idx
                        self.threshold = threshold
                        self.polarity = polarity

        return self

    def predict(self, X):
        predictions = np.ones(len(X))
        predictions[X[:, self.feature_idx] < self.threshold] = -1
        if self.polarity == -1:
            predictions = -predictions
        return predictions

class AdaBoost:
    def __init__(self, n_estimators=50):
        self.n_estimators = n_estimators
        self.alphas = []
        self.classifiers = []

    def fit(self, X, y):
        """Train AdaBoost."""
        X = np.array(X)
        y = np.array(y)

        # Convert labels to -1, +1
        y = np.where(y == 0, -1, 1)

        n_samples = len(X)

        # Initialize weights uniformly
        sample_weights = np.ones(n_samples) / n_samples

        for _ in range(self.n_estimators):
            # Train weak classifier
            stump = DecisionStump()
            stump.fit(X, y, sample_weights)

            # Get predictions
            predictions = stump.predict(X)

            # Calculate weighted error
            error = np.sum(sample_weights[predictions != y])

            # Avoid division by zero
            error = np.clip(error, 1e-10, 1 - 1e-10)

            # Calculate classifier weight
            alpha = 0.5 * np.log((1 - error) / error)

            # Update sample weights
            sample_weights *= np.exp(-alpha * y * predictions)
            sample_weights /= np.sum(sample_weights)

            # Store classifier and weight
            self.classifiers.append(stump)
            self.alphas.append(alpha)

        return self

    def predict(self, X):
        """Predict using weighted combination."""
        X = np.array(X)

        # Weighted sum of classifier predictions
        clf_preds = np.array([alpha * clf.predict(X) for alpha, clf in zip(self.alphas, self.classifiers)])
        final_pred = np.sum(clf_preds, axis=0)

        return np.sign(final_pred).astype(int)`,
    testCases: [],
    hints: [
      'Initialize sample weights uniformly: 1/n',
      'Train weak classifier on weighted samples',
      'Calculate error: sum of weights where prediction wrong',
      'Alpha = 0.5 * log((1-error)/error)',
      'Update weights: w *= exp(-alpha * y * prediction)'
    ],
    language: 'python'
  }
];
