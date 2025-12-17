import { CodingExercise } from '../../../../core/types';

export const cs407Topic2Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-2-1',
    subjectId: 'cs407',
    topicId: 'cs407-t2',
    title: 'Missing Data Imputation',
    description: 'Write a function that imputes missing values in a pandas Series using the mean for numeric data or mode for categorical data.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def impute_missing(series):
    # Return series with missing values filled
    pass`,
    solution: `import pandas as pd

def impute_missing(series):
    if pd.api.types.is_numeric_dtype(series):
        return series.fillna(series.mean())
    else:
        return series.fillna(series.mode()[0] if not series.mode().empty else series.iloc[0])`,
    testCases: [
      {
        input: 'pd.Series([1, 2, None, 4])',
        expectedOutput: 'pd.Series([1.0, 2.0, 2.33, 4.0])',
        isHidden: false,
        description: 'Numeric series with missing value'
      },
      {
        input: 'pd.Series(["a", "b", None, "a"])',
        expectedOutput: 'pd.Series(["a", "b", "a", "a"])',
        isHidden: false,
        description: 'Categorical series with missing value'
      }
    ],
    hints: [
      'Check if series is numeric using pd.api.types.is_numeric_dtype()',
      'Use .fillna() with .mean() for numeric data',
      'Use .fillna() with .mode()[0] for categorical data'
    ]
  },
  {
    id: 'cs407-ex-2-2',
    subjectId: 'cs407',
    topicId: 'cs407-t2',
    title: 'Outlier Detection',
    description: 'Write a function that detects outliers using the IQR method. Return a boolean mask where True indicates an outlier.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def detect_outliers_iqr(series):
    # Return boolean Series where True = outlier
    pass`,
    solution: `import pandas as pd

def detect_outliers_iqr(series):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return (series < lower_bound) | (series > upper_bound)`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5, 100])',
        expectedOutput: 'pd.Series([False, False, False, False, False, True])',
        isHidden: false,
        description: 'Series with one outlier'
      }
    ],
    hints: [
      'Calculate Q1 (25th percentile) and Q3 (75th percentile)',
      'IQR = Q3 - Q1',
      'Lower bound = Q1 - 1.5 * IQR, Upper bound = Q3 + 1.5 * IQR',
      'Return boolean mask for values outside bounds'
    ]
  }
];
