import { CodingExercise } from '../../../../core/types';

export const cs407Topic1Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-1-1',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Data Quality Checker',
    description: 'Write a function that analyzes a pandas DataFrame and returns a dictionary with data quality metrics: total rows, missing values per column, and completeness percentage.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def analyze_data_quality(df):
    # Return dict with 'total_rows', 'missing_per_column' (dict), 'completeness_pct' (overall)
    pass`,
    solution: `import pandas as pd

def analyze_data_quality(df):
    total_rows = len(df)
    missing_per_column = df.isnull().sum().to_dict()
    total_cells = df.size
    missing_cells = df.isnull().sum().sum()
    completeness_pct = ((total_cells - missing_cells) / total_cells * 100) if total_cells > 0 else 100.0

    return {
        'total_rows': total_rows,
        'missing_per_column': missing_per_column,
        'completeness_pct': round(completeness_pct, 2)
    }`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2, None], "b": [4, None, 6]})',
        expectedOutput: "{'total_rows': 3, 'missing_per_column': {'a': 1, 'b': 1}, 'completeness_pct': 66.67}",
        isHidden: false,
        description: 'DataFrame with some missing values'
      },
      {
        input: 'pd.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})',
        expectedOutput: "{'total_rows': 3, 'missing_per_column': {'x': 0, 'y': 0}, 'completeness_pct': 100.0}",
        isHidden: false,
        description: 'Complete DataFrame'
      }
    ],
    hints: [
      'Use df.isnull() to detect missing values',
      'Use .sum() on boolean DataFrame to count True values',
      'Calculate completeness as (total_cells - missing_cells) / total_cells * 100'
    ]
  },
  {
    id: 'cs407-ex-1-2',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'API Data Fetcher',
    description: 'Write a function that makes a GET request to a JSON API endpoint and returns the parsed data. Handle errors gracefully.',
    difficulty: 2,
    language: 'python',
    starterCode: `import requests

def fetch_api_data(url):
    # Return parsed JSON data or None if error
    pass`,
    solution: `import requests

def fetch_api_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException:
        return None`,
    testCases: [
      {
        input: '"https://api.example.com/data"',
        expectedOutput: 'dict or None',
        isHidden: false,
        description: 'Fetch from valid endpoint'
      }
    ],
    hints: [
      'Use requests.get() to make HTTP requests',
      'Use response.json() to parse JSON',
      'Wrap in try-except to handle errors',
      'Use response.raise_for_status() to check for HTTP errors'
    ]
  }
];
