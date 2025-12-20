import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs402-t1-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Load and Explore Dataset',
    difficulty: 1,
    description: `Load a CSV dataset using pandas and perform basic exploratory data analysis.

Requirements:
- Load data from 'data.csv'
- Display first 5 rows
- Show data types and missing values
- Calculate basic statistics
- Display shape of dataset`,
    starterCode: `import pandas as pd
import numpy as np

# Load the dataset
df = None

# Display information
# TODO: Implement exploration`,
    solution: `import pandas as pd
import numpy as np

# Load the dataset
df = pd.read_csv('data.csv')

# Display first 5 rows
print(df.head())

# Show data types and missing values
print("\\nData Info:")
print(df.info())

print("\\nMissing Values:")
print(df.isnull().sum())

# Calculate basic statistics
print("\\nBasic Statistics:")
print(df.describe())

# Display shape
print(f"\\nDataset Shape: {df.shape}")`,
    testCases: [],
    hints: [
      'Use pd.read_csv() to load CSV files',
      'df.head() shows the first few rows',
      'df.info() provides data types and null counts',
      'df.describe() gives statistical summary',
      'df.shape returns (rows, columns)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex02',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Handle Missing Values',
    difficulty: 2,
    description: `Implement different strategies for handling missing values in a dataset.

Requirements:
- Identify columns with missing values
- Remove rows with any missing values
- Fill numeric columns with mean
- Fill categorical columns with mode
- Forward fill time series data`,
    starterCode: `import pandas as pd
import numpy as np

def handle_missing_values(df, strategy='mean'):
    """
    Handle missing values using specified strategy.

    Args:
        df: DataFrame with missing values
        strategy: 'drop', 'mean', 'median', 'mode', 'ffill'

    Returns:
        DataFrame with handled missing values
    """
    # TODO: Implement missing value handling
    pass`,
    solution: `import pandas as pd
import numpy as np

def handle_missing_values(df, strategy='mean'):
    """
    Handle missing values using specified strategy.

    Args:
        df: DataFrame with missing values
        strategy: 'drop', 'mean', 'median', 'mode', 'ffill'

    Returns:
        DataFrame with handled missing values
    """
    df_clean = df.copy()

    if strategy == 'drop':
        df_clean = df_clean.dropna()
    elif strategy == 'mean':
        numeric_cols = df_clean.select_dtypes(include=[np.number]).columns
        df_clean[numeric_cols] = df_clean[numeric_cols].fillna(df_clean[numeric_cols].mean())
    elif strategy == 'median':
        numeric_cols = df_clean.select_dtypes(include=[np.number]).columns
        df_clean[numeric_cols] = df_clean[numeric_cols].fillna(df_clean[numeric_cols].median())
    elif strategy == 'mode':
        for col in df_clean.columns:
            df_clean[col].fillna(df_clean[col].mode()[0], inplace=True)
    elif strategy == 'ffill':
        df_clean = df_clean.fillna(method='ffill')

    return df_clean`,
    testCases: [],
    hints: [
      'Use df.dropna() to remove rows with missing values',
      'df.fillna() can fill with specific values',
      'df.mean(), df.median(), df.mode() calculate statistics',
      'select_dtypes() helps identify numeric columns',
      'Forward fill propagates last valid observation forward'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex03',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Detect and Remove Outliers',
    difficulty: 2,
    description: `Detect outliers using IQR method and optionally remove them.

Requirements:
- Calculate Q1, Q3, and IQR for numeric columns
- Identify outliers using 1.5 * IQR rule
- Return boolean mask of outliers
- Optionally remove outlier rows`,
    starterCode: `import pandas as pd
import numpy as np

def detect_outliers(df, columns=None, remove=False):
    """
    Detect outliers using IQR method.

    Args:
        df: Input DataFrame
        columns: List of columns to check (None = all numeric)
        remove: If True, remove outlier rows

    Returns:
        If remove=False: boolean mask
        If remove=True: cleaned DataFrame
    """
    # TODO: Implement outlier detection
    pass`,
    solution: `import pandas as pd
import numpy as np

def detect_outliers(df, columns=None, remove=False):
    """
    Detect outliers using IQR method.

    Args:
        df: Input DataFrame
        columns: List of columns to check (None = all numeric)
        remove: If True, remove outlier rows

    Returns:
        If remove=False: boolean mask
        If remove=True: cleaned DataFrame
    """
    if columns is None:
        columns = df.select_dtypes(include=[np.number]).columns

    outlier_mask = pd.Series([False] * len(df), index=df.index)

    for col in columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1

        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR

        col_outliers = (df[col] < lower_bound) | (df[col] > upper_bound)
        outlier_mask = outlier_mask | col_outliers

    if remove:
        return df[~outlier_mask]
    else:
        return outlier_mask`,
    testCases: [],
    hints: [
      'Q1 is the 25th percentile, Q3 is the 75th percentile',
      'IQR = Q3 - Q1',
      'Outliers are below Q1 - 1.5*IQR or above Q3 + 1.5*IQR',
      'Use quantile() method to calculate percentiles',
      'Combine boolean masks with | (or) operator'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex04',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement Label Encoding',
    difficulty: 2,
    description: `Convert categorical variables to numeric labels.

Requirements:
- Identify categorical columns
- Map each unique category to an integer
- Return encoded DataFrame and mapping dictionary
- Handle unseen categories in transform`,
    starterCode: `import pandas as pd
import numpy as np

class LabelEncoder:
    def __init__(self):
        self.mapping = {}

    def fit(self, data):
        """Learn the mapping from categories to integers."""
        # TODO: Implement fit
        pass

    def transform(self, data):
        """Transform categories to integers."""
        # TODO: Implement transform
        pass

    def fit_transform(self, data):
        """Fit and transform in one step."""
        self.fit(data)
        return self.transform(data)`,
    solution: `import pandas as pd
import numpy as np

class LabelEncoder:
    def __init__(self):
        self.mapping = {}

    def fit(self, data):
        """Learn the mapping from categories to integers."""
        unique_values = sorted(data.unique())
        self.mapping = {val: idx for idx, val in enumerate(unique_values)}
        return self

    def transform(self, data):
        """Transform categories to integers."""
        return data.map(self.mapping).fillna(-1).astype(int)

    def fit_transform(self, data):
        """Fit and transform in one step."""
        self.fit(data)
        return self.transform(data)`,
    testCases: [],
    hints: [
      'Use data.unique() to get unique categories',
      'Create dictionary mapping categories to integers',
      'Use map() to apply the mapping',
      'Handle missing mappings with fillna()',
      'Sort categories for consistent encoding'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex05',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement One-Hot Encoding',
    difficulty: 2,
    description: `Convert categorical variables to binary columns (one-hot encoding).

Requirements:
- Create binary column for each category
- Handle multiple categorical columns
- Avoid dummy variable trap (drop first column)
- Return DataFrame with encoded columns`,
    starterCode: `import pandas as pd
import numpy as np

def one_hot_encode(df, columns, drop_first=True):
    """
    One-hot encode categorical columns.

    Args:
        df: Input DataFrame
        columns: List of columns to encode
        drop_first: Drop first category to avoid multicollinearity

    Returns:
        DataFrame with one-hot encoded columns
    """
    # TODO: Implement one-hot encoding
    pass`,
    solution: `import pandas as pd
import numpy as np

def one_hot_encode(df, columns, drop_first=True):
    """
    One-hot encode categorical columns.

    Args:
        df: Input DataFrame
        columns: List of columns to encode
        drop_first: Drop first category to avoid multicollinearity

    Returns:
        DataFrame with one-hot encoded columns
    """
    df_encoded = df.copy()

    for col in columns:
        # Create dummy variables
        dummies = pd.get_dummies(df_encoded[col], prefix=col, drop_first=drop_first)

        # Drop original column and add dummy columns
        df_encoded = df_encoded.drop(col, axis=1)
        df_encoded = pd.concat([df_encoded, dummies], axis=1)

    return df_encoded`,
    testCases: [],
    hints: [
      'Use pd.get_dummies() for one-hot encoding',
      'Set prefix parameter to include original column name',
      'drop_first=True removes one category to avoid dummy trap',
      'Use pd.concat() to combine DataFrames',
      'Drop original column after creating dummies'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex06',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement Min-Max Scaling',
    difficulty: 2,
    description: `Scale features to a fixed range [0, 1] using min-max normalization.

Requirements:
- Calculate min and max for each feature
- Scale features: (x - min) / (max - min)
- Handle case where min = max
- Implement fit and transform methods`,
    starterCode: `import numpy as np

class MinMaxScaler:
    def __init__(self):
        self.min_ = None
        self.max_ = None

    def fit(self, X):
        """Learn min and max from training data."""
        # TODO: Implement fit
        pass

    def transform(self, X):
        """Scale features to [0, 1] range."""
        # TODO: Implement transform
        pass

    def fit_transform(self, X):
        """Fit and transform in one step."""
        self.fit(X)
        return self.transform(X)`,
    solution: `import numpy as np

class MinMaxScaler:
    def __init__(self):
        self.min_ = None
        self.max_ = None

    def fit(self, X):
        """Learn min and max from training data."""
        self.min_ = np.min(X, axis=0)
        self.max_ = np.max(X, axis=0)
        return self

    def transform(self, X):
        """Scale features to [0, 1] range."""
        X = np.array(X)
        # Handle case where min = max
        range_ = self.max_ - self.min_
        range_[range_ == 0] = 1

        X_scaled = (X - self.min_) / range_
        return X_scaled

    def fit_transform(self, X):
        """Fit and transform in one step."""
        self.fit(X)
        return self.transform(X)`,
    testCases: [],
    hints: [
      'Use np.min() and np.max() with axis=0 for column-wise',
      'Formula: (x - min) / (max - min)',
      'When min = max, set range to 1 to avoid division by zero',
      'Store min and max during fit for later transform',
      'Ensure X is numpy array for vectorized operations'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex07',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement Standard Scaling',
    difficulty: 2,
    description: `Standardize features by removing mean and scaling to unit variance.

Requirements:
- Calculate mean and standard deviation
- Scale features: (x - mean) / std
- Handle case where std = 0
- Implement fit and transform methods`,
    starterCode: `import numpy as np

class StandardScaler:
    def __init__(self):
        self.mean_ = None
        self.std_ = None

    def fit(self, X):
        """Learn mean and std from training data."""
        # TODO: Implement fit
        pass

    def transform(self, X):
        """Standardize features."""
        # TODO: Implement transform
        pass

    def fit_transform(self, X):
        """Fit and transform in one step."""
        self.fit(X)
        return self.transform(X)`,
    solution: `import numpy as np

class StandardScaler:
    def __init__(self):
        self.mean_ = None
        self.std_ = None

    def fit(self, X):
        """Learn mean and std from training data."""
        self.mean_ = np.mean(X, axis=0)
        self.std_ = np.std(X, axis=0)
        return self

    def transform(self, X):
        """Standardize features."""
        X = np.array(X)
        # Handle case where std = 0
        std = self.std_.copy()
        std[std == 0] = 1

        X_scaled = (X - self.mean_) / std
        return X_scaled

    def fit_transform(self, X):
        """Fit and transform in one step."""
        self.fit(X)
        return self.transform(X)`,
    testCases: [],
    hints: [
      'Use np.mean() and np.std() with axis=0',
      'Formula: (x - mean) / std',
      'When std = 0, set it to 1 to avoid division by zero',
      'Standardized data has mean=0 and std=1',
      'Store statistics during fit for consistent transform'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex08',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement Train-Test Split',
    difficulty: 2,
    description: `Split dataset into training and testing sets.

Requirements:
- Support stratified splitting for classification
- Shuffle data before splitting
- Handle both numpy arrays and pandas DataFrames
- Return X_train, X_test, y_train, y_test`,
    starterCode: `import numpy as np
import pandas as pd

def train_test_split(X, y, test_size=0.2, random_state=None, stratify=None):
    """
    Split data into training and testing sets.

    Args:
        X: Features
        y: Target
        test_size: Proportion for test set
        random_state: Random seed
        stratify: If not None, data is split in a stratified fashion

    Returns:
        X_train, X_test, y_train, y_test
    """
    # TODO: Implement train-test split
    pass`,
    solution: `import numpy as np
import pandas as pd

def train_test_split(X, y, test_size=0.2, random_state=None, stratify=None):
    """
    Split data into training and testing sets.

    Args:
        X: Features
        y: Target
        test_size: Proportion for test set
        random_state: Random seed
        stratify: If not None, data is split in a stratified fashion

    Returns:
        X_train, X_test, y_train, y_test
    """
    if random_state is not None:
        np.random.seed(random_state)

    n_samples = len(X)
    n_test = int(n_samples * test_size)

    if stratify is not None:
        # Stratified split
        unique_classes = np.unique(stratify)
        train_idx = []
        test_idx = []

        for cls in unique_classes:
            cls_idx = np.where(stratify == cls)[0]
            np.random.shuffle(cls_idx)
            n_cls_test = int(len(cls_idx) * test_size)
            test_idx.extend(cls_idx[:n_cls_test])
            train_idx.extend(cls_idx[n_cls_test:])

        train_idx = np.array(train_idx)
        test_idx = np.array(test_idx)
    else:
        # Random split
        indices = np.arange(n_samples)
        np.random.shuffle(indices)
        test_idx = indices[:n_test]
        train_idx = indices[n_test:]

    # Handle pandas DataFrame
    if isinstance(X, pd.DataFrame):
        X_train = X.iloc[train_idx]
        X_test = X.iloc[test_idx]
        y_train = y.iloc[train_idx]
        y_test = y.iloc[test_idx]
    else:
        X_train = X[train_idx]
        X_test = X[test_idx]
        y_train = y[train_idx]
        y_test = y[test_idx]

    return X_train, X_test, y_train, y_test`,
    testCases: [],
    hints: [
      'Use np.random.shuffle() to randomize data',
      'Calculate test size as proportion of total samples',
      'For stratified split, maintain class proportions',
      'Use np.where() to find indices of each class',
      'Handle both numpy arrays and pandas DataFrames'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex09',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Create Polynomial Features',
    difficulty: 3,
    description: `Generate polynomial and interaction features from input features.

Requirements:
- Create features up to specified degree
- Include interaction terms (x1*x2)
- Include bias term (column of ones)
- Handle multiple features efficiently`,
    starterCode: `import numpy as np
from itertools import combinations_with_replacement

class PolynomialFeatures:
    def __init__(self, degree=2, include_bias=True):
        self.degree = degree
        self.include_bias = include_bias

    def fit_transform(self, X):
        """Generate polynomial features."""
        # TODO: Implement polynomial feature generation
        pass`,
    solution: `import numpy as np
from itertools import combinations_with_replacement

class PolynomialFeatures:
    def __init__(self, degree=2, include_bias=True):
        self.degree = degree
        self.include_bias = include_bias

    def fit_transform(self, X):
        """Generate polynomial features."""
        X = np.array(X)
        n_samples, n_features = X.shape

        # Generate all combinations of features up to degree
        combinations = []
        for d in range(0 if self.include_bias else 1, self.degree + 1):
            for combo in combinations_with_replacement(range(n_features), d):
                combinations.append(combo)

        # Create polynomial features
        X_poly = np.zeros((n_samples, len(combinations)))
        for i, combo in enumerate(combinations):
            if len(combo) == 0:
                # Bias term
                X_poly[:, i] = 1
            else:
                # Product of features in combination
                X_poly[:, i] = np.prod(X[:, combo], axis=1)

        return X_poly`,
    testCases: [],
    hints: [
      'Use itertools.combinations_with_replacement for feature combinations',
      'For degree=2 with 2 features: [1, x1, x2, x1^2, x1*x2, x2^2]',
      'np.prod() computes product along axis',
      'Empty combination represents bias term (1)',
      'Number of features grows quickly with degree'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement Feature Selection by Correlation',
    difficulty: 3,
    description: `Select features based on correlation with target variable.

Requirements:
- Calculate correlation between each feature and target
- Select top k features with highest absolute correlation
- Return selected feature indices and correlations
- Handle multicollinearity (highly correlated features)`,
    starterCode: `import numpy as np
import pandas as pd

def select_features_by_correlation(X, y, k=10, threshold=0.9):
    """
    Select features by correlation with target.

    Args:
        X: Feature matrix
        y: Target variable
        k: Number of features to select
        threshold: Remove features with correlation > threshold

    Returns:
        selected_indices: Indices of selected features
        correlations: Correlation values
    """
    # TODO: Implement feature selection
    pass`,
    solution: `import numpy as np
import pandas as pd

def select_features_by_correlation(X, y, k=10, threshold=0.9):
    """
    Select features by correlation with target.

    Args:
        X: Feature matrix
        y: Target variable
        k: Number of features to select
        threshold: Remove features with correlation > threshold

    Returns:
        selected_indices: Indices of selected features
        correlations: Correlation values
    """
    X = np.array(X)
    y = np.array(y)

    # Calculate correlation with target
    correlations = []
    for i in range(X.shape[1]):
        corr = np.corrcoef(X[:, i], y)[0, 1]
        correlations.append(abs(corr))

    correlations = np.array(correlations)

    # Sort by correlation
    sorted_indices = np.argsort(correlations)[::-1]

    # Select features, avoiding multicollinearity
    selected_indices = []
    for idx in sorted_indices:
        if len(selected_indices) >= k:
            break

        # Check correlation with already selected features
        is_collinear = False
        for selected_idx in selected_indices:
            corr = abs(np.corrcoef(X[:, idx], X[:, selected_idx])[0, 1])
            if corr > threshold:
                is_collinear = True
                break

        if not is_collinear:
            selected_indices.append(idx)

    return np.array(selected_indices), correlations[selected_indices]`,
    testCases: [],
    hints: [
      'Use np.corrcoef() to calculate correlation',
      'Take absolute value to consider both positive and negative correlation',
      'np.argsort()[::-1] sorts in descending order',
      'Check correlation between features to avoid multicollinearity',
      'Stop when k features are selected'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Handle Imbalanced Datasets',
    difficulty: 3,
    description: `Implement techniques to handle imbalanced classification datasets.

Requirements:
- Random oversampling of minority class
- Random undersampling of majority class
- SMOTE-like synthetic sample generation
- Return balanced dataset`,
    starterCode: `import numpy as np

def balance_dataset(X, y, method='oversample'):
    """
    Balance imbalanced dataset.

    Args:
        X: Feature matrix
        y: Target labels
        method: 'oversample', 'undersample', or 'smote'

    Returns:
        X_balanced, y_balanced
    """
    # TODO: Implement dataset balancing
    pass`,
    solution: `import numpy as np

def balance_dataset(X, y, method='oversample'):
    """
    Balance imbalanced dataset.

    Args:
        X: Feature matrix
        y: Target labels
        method: 'oversample', 'undersample', or 'smote'

    Returns:
        X_balanced, y_balanced
    """
    X = np.array(X)
    y = np.array(y)

    classes, counts = np.unique(y, return_counts=True)

    if method == 'oversample':
        # Oversample minority classes
        max_count = np.max(counts)
        X_balanced = []
        y_balanced = []

        for cls in classes:
            cls_idx = np.where(y == cls)[0]
            X_cls = X[cls_idx]
            y_cls = y[cls_idx]

            # Resample with replacement
            n_samples = max_count - len(cls_idx)
            if n_samples > 0:
                resample_idx = np.random.choice(len(cls_idx), n_samples, replace=True)
                X_cls = np.vstack([X_cls, X_cls[resample_idx]])
                y_cls = np.hstack([y_cls, y_cls[resample_idx]])

            X_balanced.append(X_cls)
            y_balanced.append(y_cls)

        X_balanced = np.vstack(X_balanced)
        y_balanced = np.hstack(y_balanced)

    elif method == 'undersample':
        # Undersample majority classes
        min_count = np.min(counts)
        X_balanced = []
        y_balanced = []

        for cls in classes:
            cls_idx = np.where(y == cls)[0]
            # Sample without replacement
            sample_idx = np.random.choice(cls_idx, min_count, replace=False)
            X_balanced.append(X[sample_idx])
            y_balanced.append(y[sample_idx])

        X_balanced = np.vstack(X_balanced)
        y_balanced = np.hstack(y_balanced)

    elif method == 'smote':
        # Simple SMOTE: create synthetic samples between neighbors
        max_count = np.max(counts)
        X_balanced = []
        y_balanced = []

        for cls in classes:
            cls_idx = np.where(y == cls)[0]
            X_cls = X[cls_idx]
            y_cls = y[cls_idx]

            n_synthetic = max_count - len(cls_idx)
            if n_synthetic > 0:
                # Generate synthetic samples
                for _ in range(n_synthetic):
                    idx1, idx2 = np.random.choice(len(cls_idx), 2, replace=True)
                    # Linear interpolation
                    alpha = np.random.random()
                    synthetic = X_cls[idx1] + alpha * (X_cls[idx2] - X_cls[idx1])
                    X_cls = np.vstack([X_cls, synthetic])
                    y_cls = np.hstack([y_cls, cls])

            X_balanced.append(X_cls)
            y_balanced.append(y_cls)

        X_balanced = np.vstack(X_balanced)
        y_balanced = np.hstack(y_balanced)

    return X_balanced, y_balanced`,
    testCases: [],
    hints: [
      'Use np.unique() with return_counts=True to find class distribution',
      'Oversample: duplicate minority class samples randomly',
      'Undersample: randomly select subset of majority class',
      'SMOTE: create synthetic samples between existing samples',
      'Linear interpolation: x_new = x1 + alpha * (x2 - x1)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Implement K-Fold Cross-Validation Indices',
    difficulty: 3,
    description: `Generate indices for k-fold cross-validation.

Requirements:
- Split data into k folds
- Return train and validation indices for each fold
- Support stratified k-fold for classification
- Handle edge cases (k > n_samples)`,
    starterCode: `import numpy as np

def k_fold_indices(n_samples, k=5, stratify=None):
    """
    Generate k-fold cross-validation indices.

    Args:
        n_samples: Number of samples
        k: Number of folds
        stratify: Labels for stratified k-fold

    Yields:
        train_idx, val_idx for each fold
    """
    # TODO: Implement k-fold index generation
    pass`,
    solution: `import numpy as np

def k_fold_indices(n_samples, k=5, stratify=None):
    """
    Generate k-fold cross-validation indices.

    Args:
        n_samples: Number of samples
        k: Number of folds
        stratify: Labels for stratified k-fold

    Yields:
        train_idx, val_idx for each fold
    """
    if k > n_samples:
        raise ValueError(f"k={k} cannot be greater than n_samples={n_samples}")

    if stratify is not None:
        # Stratified k-fold
        unique_classes = np.unique(stratify)
        fold_indices = [[] for _ in range(k)]

        for cls in unique_classes:
            cls_idx = np.where(stratify == cls)[0]
            np.random.shuffle(cls_idx)
            # Distribute class samples across folds
            for i, idx in enumerate(cls_idx):
                fold_indices[i % k].append(idx)

        # Convert to arrays
        fold_indices = [np.array(fold) for fold in fold_indices]
    else:
        # Regular k-fold
        indices = np.arange(n_samples)
        np.random.shuffle(indices)
        fold_indices = np.array_split(indices, k)

    # Generate train/val splits
    for i in range(k):
        val_idx = fold_indices[i]
        train_idx = np.concatenate([fold_indices[j] for j in range(k) if j != i])
        yield train_idx, val_idx`,
    testCases: [],
    hints: [
      'Divide samples into k approximately equal folds',
      'For each fold: use fold as validation, rest as training',
      'Stratified: maintain class proportions in each fold',
      'Use np.array_split() to divide into k parts',
      'Yield train and validation indices for each fold'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Feature Binning',
    difficulty: 2,
    description: `Discretize continuous features into bins.

Requirements:
- Support equal-width binning
- Support equal-frequency (quantile) binning
- Return bin edges and transformed data
- Handle edge cases`,
    starterCode: `import numpy as np

def bin_features(X, n_bins=5, strategy='uniform'):
    """
    Bin continuous features.

    Args:
        X: Feature array
        n_bins: Number of bins
        strategy: 'uniform' (equal width) or 'quantile' (equal frequency)

    Returns:
        X_binned, bin_edges
    """
    # TODO: Implement feature binning
    pass`,
    solution: `import numpy as np

def bin_features(X, n_bins=5, strategy='uniform'):
    """
    Bin continuous features.

    Args:
        X: Feature array
        n_bins: Number of bins
        strategy: 'uniform' (equal width) or 'quantile' (equal frequency)

    Returns:
        X_binned, bin_edges
    """
    X = np.array(X)

    if strategy == 'uniform':
        # Equal-width bins
        min_val = np.min(X)
        max_val = np.max(X)
        bin_edges = np.linspace(min_val, max_val, n_bins + 1)
    elif strategy == 'quantile':
        # Equal-frequency bins
        quantiles = np.linspace(0, 100, n_bins + 1)
        bin_edges = np.percentile(X, quantiles)
        # Ensure unique edges
        bin_edges = np.unique(bin_edges)
    else:
        raise ValueError(f"Unknown strategy: {strategy}")

    # Bin the data
    X_binned = np.digitize(X, bin_edges[:-1]) - 1
    # Clip to valid range
    X_binned = np.clip(X_binned, 0, n_bins - 1)

    return X_binned, bin_edges`,
    testCases: [],
    hints: [
      'Uniform: use np.linspace() between min and max',
      'Quantile: use np.percentile() for equal-frequency bins',
      'np.digitize() assigns values to bins',
      'Subtract 1 from digitize result for 0-based indexing',
      'Use np.clip() to ensure bins are in valid range'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Calculate Feature Importance',
    difficulty: 3,
    description: `Calculate feature importance using permutation importance.

Requirements:
- Train a simple model
- For each feature, permute values and measure performance drop
- Larger drop = more important feature
- Return feature importance scores`,
    starterCode: `import numpy as np

def permutation_importance(model, X, y, metric='accuracy', n_repeats=10):
    """
    Calculate permutation feature importance.

    Args:
        model: Trained model with predict method
        X: Feature matrix
        y: True labels
        metric: 'accuracy' or 'mse'
        n_repeats: Number of permutations per feature

    Returns:
        importances: Array of importance scores
    """
    # TODO: Implement permutation importance
    pass`,
    solution: `import numpy as np

def permutation_importance(model, X, y, metric='accuracy', n_repeats=10):
    """
    Calculate permutation feature importance.

    Args:
        model: Trained model with predict method
        X: Feature matrix
        y: True labels
        metric: 'accuracy' or 'mse'
        n_repeats: Number of permutations per feature

    Returns:
        importances: Array of importance scores
    """
    X = np.array(X)
    y = np.array(y)
    n_features = X.shape[1]

    # Calculate baseline score
    y_pred = model.predict(X)
    if metric == 'accuracy':
        baseline_score = np.mean(y_pred == y)
    elif metric == 'mse':
        baseline_score = -np.mean((y_pred - y) ** 2)  # Negative for consistency

    importances = np.zeros(n_features)

    # Permute each feature
    for i in range(n_features):
        scores = []
        for _ in range(n_repeats):
            X_permuted = X.copy()
            # Permute feature i
            X_permuted[:, i] = np.random.permutation(X_permuted[:, i])

            # Calculate score with permuted feature
            y_pred = model.predict(X_permuted)
            if metric == 'accuracy':
                score = np.mean(y_pred == y)
            elif metric == 'mse':
                score = -np.mean((y_pred - y) ** 2)

            scores.append(score)

        # Importance is drop in performance
        importances[i] = baseline_score - np.mean(scores)

    return importances`,
    testCases: [],
    hints: [
      'Calculate baseline performance with original features',
      'Permute each feature independently',
      'Measure performance drop after permutation',
      'Average over multiple permutations for stability',
      'Important features cause large performance drop when permuted'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Time Series Train-Test Split',
    difficulty: 2,
    description: `Split time series data maintaining temporal order.

Requirements:
- Preserve temporal order (no shuffling)
- Split by date or index
- Support multiple time-based splits
- Return train and test indices`,
    starterCode: `import numpy as np
import pandas as pd

def time_series_split(data, n_splits=5, test_size=None):
    """
    Split time series data preserving temporal order.

    Args:
        data: Time series data or indices
        n_splits: Number of splits
        test_size: Size of test set (if None, use expanding window)

    Yields:
        train_idx, test_idx for each split
    """
    # TODO: Implement time series split
    pass`,
    solution: `import numpy as np
import pandas as pd

def time_series_split(data, n_splits=5, test_size=None):
    """
    Split time series data preserving temporal order.

    Args:
        data: Time series data or indices
        n_splits: Number of splits
        test_size: Size of test set (if None, use expanding window)

    Yields:
        train_idx, test_idx for each split
    """
    n_samples = len(data)

    if test_size is None:
        # Expanding window: each split adds more training data
        test_size = n_samples // (n_splits + 1)

    for i in range(n_splits):
        # Test set starts after training set
        test_start = (i + 1) * test_size
        test_end = test_start + test_size

        if test_end > n_samples:
            test_end = n_samples

        train_idx = np.arange(0, test_start)
        test_idx = np.arange(test_start, test_end)

        if len(test_idx) > 0:
            yield train_idx, test_idx`,
    testCases: [],
    hints: [
      'Never shuffle time series data',
      'Training data always comes before test data',
      'Expanding window: training set grows with each split',
      'Test sets should be consecutive time periods',
      'Ensure test set exists for each split'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t1-ex16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Data Augmentation for Tabular Data',
    difficulty: 3,
    description: `Augment tabular dataset by adding noise and synthetic samples.

Requirements:
- Add Gaussian noise to numeric features
- Create synthetic samples via interpolation
- Preserve data distribution
- Return augmented dataset`,
    starterCode: `import numpy as np

def augment_tabular_data(X, y=None, n_augment=None, noise_level=0.1):
    """
    Augment tabular data with noise and synthetic samples.

    Args:
        X: Feature matrix
        y: Labels (optional)
        n_augment: Number of synthetic samples to create
        noise_level: Standard deviation of Gaussian noise

    Returns:
        X_augmented, y_augmented (if y provided)
    """
    # TODO: Implement data augmentation
    pass`,
    solution: `import numpy as np

def augment_tabular_data(X, y=None, n_augment=None, noise_level=0.1):
    """
    Augment tabular data with noise and synthetic samples.

    Args:
        X: Feature matrix
        y: Labels (optional)
        n_augment: Number of synthetic samples to create
        noise_level: Standard deviation of Gaussian noise

    Returns:
        X_augmented, y_augmented (if y provided)
    """
    X = np.array(X)
    n_samples, n_features = X.shape

    if n_augment is None:
        n_augment = n_samples // 2

    X_synthetic = []
    y_synthetic = [] if y is not None else None

    for _ in range(n_augment):
        # Select two random samples
        idx1, idx2 = np.random.choice(n_samples, 2, replace=True)

        # Create synthetic sample via interpolation
        alpha = np.random.random()
        x_new = X[idx1] + alpha * (X[idx2] - X[idx1])

        # Add Gaussian noise
        noise = np.random.normal(0, noise_level * np.std(X, axis=0), n_features)
        x_new = x_new + noise

        X_synthetic.append(x_new)

        if y is not None:
            # Use label from closer sample
            y_new = y[idx1] if alpha < 0.5 else y[idx2]
            y_synthetic.append(y_new)

    X_augmented = np.vstack([X, np.array(X_synthetic)])

    if y is not None:
        y_augmented = np.hstack([y, np.array(y_synthetic)])
        return X_augmented, y_augmented
    else:
        return X_augmented`,
    testCases: [],
    hints: [
      'Interpolate between existing samples: x_new = x1 + alpha*(x2-x1)',
      'Add small Gaussian noise scaled by feature std',
      'For labels, use label of closer sample',
      'noise_level controls augmentation strength',
      'Use np.std() to scale noise by feature variance'
    ],
    language: 'python'
  }
];
