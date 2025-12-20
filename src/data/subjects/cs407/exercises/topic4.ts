import { CodingExercise } from '../../../../core/types';

export const cs407Topic4Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-4-1',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'One-Hot Encoding',
    description: 'Write a function that performs one-hot encoding on a categorical column using pandas get_dummies.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def one_hot_encode(series):
    # Return one-hot encoded DataFrame
    pass`,
    solution: `import pandas as pd

def one_hot_encode(series):
    return pd.get_dummies(series, prefix=series.name)`,
    testCases: [
      {
        input: 'pd.Series(["red", "blue", "red", "green"], name="color")',
        expectedOutput: 'DataFrame with columns: color_blue, color_green, color_red',
        isHidden: false,
        description: 'One-hot encode color column'
      }
    ],
    hints: [
      'Use pd.get_dummies() for one-hot encoding',
      'Pass prefix parameter to name columns',
      'Each unique value becomes a binary column'
    ]
  },
  {
    id: 'cs407-ex-4-2',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Label Encoding',
    description: 'Write a function that performs label encoding on a categorical Series, mapping each unique value to an integer.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

def label_encode(series):
    # Return encoded series and mapping dict
    pass`,
    solution: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

def label_encode(series):
    le = LabelEncoder()
    encoded = le.fit_transform(series)
    mapping = dict(zip(le.classes_, le.transform(le.classes_)))
    return pd.Series(encoded, index=series.index), mapping`,
    testCases: [
      {
        input: 'pd.Series(["low", "medium", "high", "low"])',
        expectedOutput: 'Encoded series and mapping dict',
        isHidden: false,
        description: 'Label encode categorical data'
      }
    ],
    hints: [
      'Use sklearn.preprocessing.LabelEncoder',
      'Call fit_transform() on the series',
      'Create mapping from le.classes_ and le.transform()',
      'Return both encoded series and mapping'
    ]
  },
  {
    id: 'cs407-ex-4-3',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Min-Max Scaling',
    description: 'Write a function that applies min-max normalization to scale values to [0, 1] range.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def min_max_scale(series):
    # Return scaled series
    pass`,
    solution: `import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def min_max_scale(series):
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(series.values.reshape(-1, 1))
    return pd.Series(scaled.flatten(), index=series.index)`,
    testCases: [
      {
        input: 'pd.Series([10, 20, 30, 40, 50])',
        expectedOutput: 'pd.Series([0.0, 0.25, 0.5, 0.75, 1.0])',
        isHidden: false,
        description: 'Scale to [0, 1] range'
      }
    ],
    hints: [
      'Use sklearn.preprocessing.MinMaxScaler',
      'Reshape series to column vector with .reshape(-1, 1)',
      'Call fit_transform() on reshaped data',
      'Flatten result and return as Series'
    ]
  },
  {
    id: 'cs407-ex-4-4',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Standardization (Z-Score)',
    description: 'Write a function that standardizes a Series to have mean=0 and std=1.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from sklearn.preprocessing import StandardScaler

def standardize(series):
    # Return standardized series
    pass`,
    solution: `import pandas as pd
from sklearn.preprocessing import StandardScaler

def standardize(series):
    scaler = StandardScaler()
    scaled = scaler.fit_transform(series.values.reshape(-1, 1))
    return pd.Series(scaled.flatten(), index=series.index)`,
    testCases: [
      {
        input: 'pd.Series([10, 20, 30, 40, 50])',
        expectedOutput: 'Series with mean ~0 and std ~1',
        isHidden: false,
        description: 'Standardize numeric data'
      }
    ],
    hints: [
      'Use sklearn.preprocessing.StandardScaler',
      'Reshape series to column vector',
      'Call fit_transform() to standardize',
      'Result has mean 0 and std 1'
    ]
  },
  {
    id: 'cs407-ex-4-5',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Polynomial Features',
    description: 'Write a function that creates polynomial features up to specified degree.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd
from sklearn.preprocessing import PolynomialFeatures

def create_polynomial_features(df, degree=2):
    # Return DataFrame with polynomial features
    pass`,
    solution: `import pandas as pd
from sklearn.preprocessing import PolynomialFeatures

def create_polynomial_features(df, degree=2):
    poly = PolynomialFeatures(degree=degree, include_bias=False)
    poly_features = poly.fit_transform(df)
    feature_names = poly.get_feature_names_out(df.columns)
    return pd.DataFrame(poly_features, columns=feature_names, index=df.index)`,
    testCases: [
      {
        input: 'pd.DataFrame({"x": [1, 2, 3]}), 2',
        expectedOutput: 'DataFrame with x and x^2 columns',
        isHidden: false,
        description: 'Create degree 2 polynomial features'
      }
    ],
    hints: [
      'Use sklearn.preprocessing.PolynomialFeatures',
      'Set include_bias=False to exclude constant term',
      'Use fit_transform() to create features',
      'Get feature names with get_feature_names_out()',
      'Return as DataFrame with proper column names'
    ]
  },
  {
    id: 'cs407-ex-4-6',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Binning Continuous Values',
    description: 'Write a function that bins continuous values into discrete categories using quantile-based binning.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def bin_values(series, n_bins=4):
    # Return binned series with labels
    pass`,
    solution: `import pandas as pd

def bin_values(series, n_bins=4):
    labels = [f"Q{i+1}" for i in range(n_bins)]
    return pd.qcut(series, q=n_bins, labels=labels, duplicates='drop')`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 4',
        expectedOutput: 'Series with quartile labels Q1, Q2, Q3, Q4',
        isHidden: false,
        description: 'Bin into 4 quartiles'
      }
    ],
    hints: [
      'Use pd.qcut() for quantile-based binning',
      'Create labels for each bin',
      'Set duplicates="drop" to handle duplicate bin edges',
      'Returns categorical series with bin labels'
    ]
  },
  {
    id: 'cs407-ex-4-7',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Log Transformation',
    description: 'Write a function that applies log transformation to reduce skewness in data.',
    difficulty: 1,
    language: 'python',
    starterCode: `import pandas as pd
import numpy as np

def log_transform(series):
    # Return log-transformed series (handle zeros)
    pass`,
    solution: `import pandas as pd
import numpy as np

def log_transform(series):
    return np.log1p(series)`,
    testCases: [
      {
        input: 'pd.Series([0, 1, 10, 100, 1000])',
        expectedOutput: 'Log-transformed series',
        isHidden: false,
        description: 'Apply log transformation'
      }
    ],
    hints: [
      'Use np.log1p() which computes log(1 + x)',
      'log1p handles zero values safely',
      'Useful for reducing right skewness',
      'Returns transformed series'
    ]
  },
  {
    id: 'cs407-ex-4-8',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Feature Interaction',
    description: 'Write a function that creates interaction features by multiplying pairs of numeric columns.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from itertools import combinations

def create_interaction_features(df):
    # Return DataFrame with original and interaction features
    pass`,
    solution: `import pandas as pd
from itertools import combinations

def create_interaction_features(df):
    result = df.copy()
    numeric_cols = df.select_dtypes(include=['number']).columns

    for col1, col2 in combinations(numeric_cols, 2):
        interaction_name = f"{col1}_{col2}"
        result[interaction_name] = df[col1] * df[col2]

    return result`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})',
        expectedOutput: 'DataFrame with a, b, and a_b (interaction) columns',
        isHidden: false,
        description: 'Create interaction features'
      }
    ],
    hints: [
      'Use itertools.combinations() to get column pairs',
      'Multiply values from each pair',
      'Name interaction column as col1_col2',
      'Add interactions to copy of original DataFrame'
    ]
  },
  {
    id: 'cs407-ex-4-9',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Ordinal Encoding',
    description: 'Write a function that performs ordinal encoding with custom ordering for categorical values.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def ordinal_encode(series, ordering):
    # ordering is a list like ['low', 'medium', 'high']
    # Return encoded series with 0, 1, 2, ...
    pass`,
    solution: `import pandas as pd

def ordinal_encode(series, ordering):
    mapping = {val: idx for idx, val in enumerate(ordering)}
    return series.map(mapping)`,
    testCases: [
      {
        input: 'pd.Series(["low", "high", "medium", "low"]), ["low", "medium", "high"]',
        expectedOutput: 'pd.Series([0, 2, 1, 0])',
        isHidden: false,
        description: 'Ordinal encoding with custom order'
      }
    ],
    hints: [
      'Create mapping dict from ordering list',
      'Use enumerate() to assign indices',
      'Use series.map() to apply mapping',
      'Preserves ordinal relationship in data'
    ]
  },
  {
    id: 'cs407-ex-4-10',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Target Encoding',
    description: 'Write a function that performs target encoding (mean encoding) for a categorical feature.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd

def target_encode(categorical_series, target_series):
    # Return series with categories replaced by mean target value
    pass`,
    solution: `import pandas as pd

def target_encode(categorical_series, target_series):
    target_means = target_series.groupby(categorical_series).mean()
    return categorical_series.map(target_means)`,
    testCases: [
      {
        input: 'pd.Series(["A", "B", "A", "B"]), pd.Series([10, 20, 30, 40])',
        expectedOutput: 'pd.Series([20.0, 30.0, 20.0, 30.0])',
        isHidden: false,
        description: 'Target encode based on mean target values'
      }
    ],
    hints: [
      'Group target by categorical values',
      'Calculate mean target for each category',
      'Map categories to their mean target values',
      'Useful for high-cardinality categorical features'
    ]
  },
  {
    id: 'cs407-ex-4-11',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Robust Scaling',
    description: 'Write a function that performs robust scaling using median and IQR (resistant to outliers).',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from sklearn.preprocessing import RobustScaler

def robust_scale(series):
    # Return robust-scaled series
    pass`,
    solution: `import pandas as pd
from sklearn.preprocessing import RobustScaler

def robust_scale(series):
    scaler = RobustScaler()
    scaled = scaler.fit_transform(series.values.reshape(-1, 1))
    return pd.Series(scaled.flatten(), index=series.index)`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 100])',
        expectedOutput: 'Scaled series resistant to outlier (100)',
        isHidden: false,
        description: 'Robust scaling with outlier'
      }
    ],
    hints: [
      'Use sklearn.preprocessing.RobustScaler',
      'Uses median and IQR instead of mean and std',
      'Resistant to outliers',
      'Good for data with extreme values'
    ]
  },
  {
    id: 'cs407-ex-4-12',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Frequency Encoding',
    description: 'Write a function that encodes categorical values by their frequency in the dataset.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def frequency_encode(series):
    # Return series with values replaced by their frequencies
    pass`,
    solution: `import pandas as pd

def frequency_encode(series):
    frequency_map = series.value_counts(normalize=True).to_dict()
    return series.map(frequency_map)`,
    testCases: [
      {
        input: 'pd.Series(["a", "b", "a", "a", "b"])',
        expectedOutput: 'pd.Series([0.6, 0.4, 0.6, 0.6, 0.4])',
        isHidden: false,
        description: 'Encode by relative frequency'
      }
    ],
    hints: [
      'Use value_counts(normalize=True) to get frequencies',
      'Convert to dictionary',
      'Map original values to their frequencies',
      'Useful for categorical features with many categories'
    ]
  },
  {
    id: 'cs407-ex-4-13',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Date Feature Extraction',
    description: 'Write a function that extracts useful features from datetime column (year, month, day, dayofweek, quarter).',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def extract_date_features(datetime_series):
    # Return DataFrame with extracted date features
    pass`,
    solution: `import pandas as pd

def extract_date_features(datetime_series):
    df = pd.DataFrame()
    df['year'] = datetime_series.dt.year
    df['month'] = datetime_series.dt.month
    df['day'] = datetime_series.dt.day
    df['dayofweek'] = datetime_series.dt.dayofweek
    df['quarter'] = datetime_series.dt.quarter
    return df`,
    testCases: [
      {
        input: 'pd.Series(pd.to_datetime(["2023-01-15", "2023-06-20", "2023-12-25"]))',
        expectedOutput: 'DataFrame with year, month, day, dayofweek, quarter columns',
        isHidden: false,
        description: 'Extract date features'
      }
    ],
    hints: [
      'Use .dt accessor for datetime operations',
      'Extract year, month, day with .dt.year, .dt.month, .dt.day',
      'Get day of week with .dt.dayofweek (0=Monday)',
      'Get quarter with .dt.quarter',
      'Return all features in DataFrame'
    ]
  },
  {
    id: 'cs407-ex-4-14',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Box-Cox Transformation',
    description: 'Write a function that applies Box-Cox transformation to normalize data distribution.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd
from scipy import stats

def box_cox_transform(series):
    # Return transformed series and lambda parameter
    pass`,
    solution: `import pandas as pd
from scipy import stats

def box_cox_transform(series):
    # Box-Cox requires positive values
    if (series <= 0).any():
        series = series - series.min() + 1

    transformed, lambda_param = stats.boxcox(series)
    return pd.Series(transformed, index=series.index), lambda_param`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5, 10, 20])',
        expectedOutput: 'Transformed series and lambda parameter',
        isHidden: false,
        description: 'Box-Cox transformation'
      }
    ],
    hints: [
      'Use scipy.stats.boxcox()',
      'Box-Cox requires all positive values',
      'Shift data if needed: series - series.min() + 1',
      'Returns (transformed_data, lambda)',
      'Automatically finds optimal lambda'
    ]
  },
  {
    id: 'cs407-ex-4-15',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Feature Hashing',
    description: 'Write a function that applies feature hashing to reduce dimensionality of categorical features.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd
from sklearn.feature_extraction import FeatureHasher

def hash_features(series, n_features=10):
    # Return hashed feature matrix
    pass`,
    solution: `import pandas as pd
from sklearn.feature_extraction import FeatureHasher

def hash_features(series, n_features=10):
    hasher = FeatureHasher(n_features=n_features, input_type='string')
    # Convert to list of dicts format
    data = [{str(val): 1} for val in series]
    hashed = hasher.transform(data).toarray()
    return pd.DataFrame(hashed, index=series.index)`,
    testCases: [
      {
        input: 'pd.Series(["cat", "dog", "bird", "cat"]), 5',
        expectedOutput: 'DataFrame with 5 hashed feature columns',
        isHidden: false,
        description: 'Hash categorical features'
      }
    ],
    hints: [
      'Use sklearn.feature_extraction.FeatureHasher',
      'Convert series to list of dicts format',
      'Call transform() to get sparse matrix',
      'Convert to array with .toarray()',
      'Useful for high-cardinality features'
    ]
  },
  {
    id: 'cs407-ex-4-16',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Ratio Features',
    description: 'Write a function that creates ratio features by dividing numeric columns pairwise.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from itertools import combinations

def create_ratio_features(df):
    # Return DataFrame with original and ratio features
    pass`,
    solution: `import pandas as pd
from itertools import combinations

def create_ratio_features(df):
    result = df.copy()
    numeric_cols = df.select_dtypes(include=['number']).columns

    for col1, col2 in combinations(numeric_cols, 2):
        ratio_name = f"{col1}_div_{col2}"
        # Avoid division by zero
        result[ratio_name] = df[col1] / df[col2].replace(0, 1e-10)

    return result`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [10, 20, 30], "b": [2, 4, 5]})',
        expectedOutput: 'DataFrame with a, b, and a_div_b (ratio) columns',
        isHidden: false,
        description: 'Create ratio features'
      }
    ],
    hints: [
      'Use itertools.combinations() for column pairs',
      'Divide col1 by col2 for each pair',
      'Handle division by zero with replace()',
      'Name ratio column as col1_div_col2',
      'Add ratios to copy of original DataFrame'
    ]
  }
];
