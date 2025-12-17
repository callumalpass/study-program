import { CodingExercise } from '../../../../core/types';

export const cs407Topic3Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-3-1',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Statistical Summary',
    description: 'Write a function that computes descriptive statistics (mean, median, std, min, max) for a numeric Series.',
    difficulty: 1,
    language: 'python',
    starterCode: `import pandas as pd

def compute_statistics(series):
    # Return dict with 'mean', 'median', 'std', 'min', 'max'
    pass`,
    solution: `import pandas as pd

def compute_statistics(series):
    return {
        'mean': series.mean(),
        'median': series.median(),
        'std': series.std(),
        'min': series.min(),
        'max': series.max()
    }`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5])',
        expectedOutput: "{'mean': 3.0, 'median': 3.0, 'std': 1.58, 'min': 1, 'max': 5}",
        isHidden: false,
        description: 'Simple numeric series'
      }
    ],
    hints: [
      'Use built-in pandas Series methods: .mean(), .median(), .std(), .min(), .max()',
      'Return results as a dictionary'
    ]
  },
  {
    id: 'cs407-ex-3-2',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Correlation Matrix',
    description: 'Write a function that computes the correlation matrix for all numeric columns in a DataFrame.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def compute_correlation_matrix(df):
    # Return correlation matrix for numeric columns
    pass`,
    solution: `import pandas as pd

def compute_correlation_matrix(df):
    return df.select_dtypes(include=['number']).corr()`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2, 3], "b": [2, 4, 6], "c": ["x", "y", "z"]})',
        expectedOutput: 'DataFrame with correlation between a and b',
        isHidden: false,
        description: 'Mixed DataFrame'
      }
    ],
    hints: [
      'Use .select_dtypes(include=["number"]) to get numeric columns',
      'Use .corr() method to compute correlation matrix'
    ]
  }
];
