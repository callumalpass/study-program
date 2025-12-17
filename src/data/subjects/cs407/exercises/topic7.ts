import { CodingExercise } from '../../../../core/types';

export const cs407Topic7Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-7-1',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Data Anonymization',
    description: 'Write a function that anonymizes personally identifiable information (PII) by replacing names with unique IDs.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def anonymize_names(df, name_column):
    # Replace names with anonymous IDs like 'USER_001', 'USER_002', etc.
    pass`,
    solution: `import pandas as pd

def anonymize_names(df, name_column):
    unique_names = df[name_column].unique()
    name_to_id = {name: f'USER_{str(i+1).zfill(3)}' for i, name in enumerate(unique_names)}
    df[name_column] = df[name_column].map(name_to_id)
    return df`,
    testCases: [
      {
        input: 'pd.DataFrame({"name": ["Alice", "Bob", "Alice"]}), "name"',
        expectedOutput: 'pd.DataFrame({"name": ["USER_001", "USER_002", "USER_001"]})',
        isHidden: false,
        description: 'Anonymize names'
      }
    ],
    hints: [
      'Get unique values from the column',
      'Create a mapping dictionary from names to IDs',
      'Use .map() to replace names with IDs',
      'Use str.zfill() to pad numbers with zeros'
    ]
  },
  {
    id: 'cs407-ex-7-2',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Bias Detection',
    description: 'Write a function that checks for class imbalance in a target variable, which can indicate potential bias.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def check_class_balance(y):
    # Return dict with class counts and imbalance ratio
    pass`,
    solution: `import pandas as pd

def check_class_balance(y):
    counts = pd.Series(y).value_counts()
    max_count = counts.max()
    min_count = counts.min()
    imbalance_ratio = max_count / min_count if min_count > 0 else float('inf')

    return {
        'class_counts': counts.to_dict(),
        'imbalance_ratio': round(imbalance_ratio, 2)
    }`,
    testCases: [
      {
        input: '[0, 0, 0, 1]',
        expectedOutput: "{'class_counts': {0: 3, 1: 1}, 'imbalance_ratio': 3.0}",
        isHidden: false,
        description: 'Imbalanced classes'
      },
      {
        input: '[0, 1, 0, 1]',
        expectedOutput: "{'class_counts': {0: 2, 1: 2}, 'imbalance_ratio': 1.0}",
        isHidden: false,
        description: 'Balanced classes'
      }
    ],
    hints: [
      'Use pd.Series(y).value_counts() to count classes',
      'Find max and min counts',
      'Imbalance ratio = max_count / min_count',
      'Return class counts and ratio as dictionary'
    ]
  }
];
