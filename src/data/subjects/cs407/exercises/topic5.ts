import { CodingExercise } from '../../../../core/types';

export const cs407Topic5Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-5-1',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Feature Engineering',
    description: 'Write a function that creates a new feature by combining two existing features (e.g., creating BMI from height and weight).',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def create_bmi_feature(df):
    # Assume df has 'weight_kg' and 'height_m' columns
    # Return df with new 'bmi' column
    pass`,
    solution: `import pandas as pd

def create_bmi_feature(df):
    df['bmi'] = df['weight_kg'] / (df['height_m'] ** 2)
    return df`,
    testCases: [
      {
        input: 'pd.DataFrame({"weight_kg": [70, 80], "height_m": [1.75, 1.80]})',
        expectedOutput: 'DataFrame with bmi column',
        isHidden: false,
        description: 'Basic BMI calculation'
      }
    ],
    hints: [
      'BMI = weight_kg / (height_m^2)',
      'Create a new column in the DataFrame',
      'Return the modified DataFrame'
    ]
  },
  {
    id: 'cs407-ex-5-2',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Train-Test Split',
    description: 'Write a function that splits data into training and testing sets with a given ratio.',
    difficulty: 2,
    language: 'python',
    starterCode: `from sklearn.model_selection import train_test_split

def split_data(X, y, test_size=0.2, random_state=42):
    # Return X_train, X_test, y_train, y_test
    pass`,
    solution: `from sklearn.model_selection import train_test_split

def split_data(X, y, test_size=0.2, random_state=42):
    return train_test_split(X, y, test_size=test_size, random_state=random_state)`,
    testCases: [
      {
        input: 'X=[[1], [2], [3], [4]], y=[0, 1, 0, 1], test_size=0.5',
        expectedOutput: 'X_train, X_test, y_train, y_test with 50-50 split',
        isHidden: false,
        description: 'Simple split'
      }
    ],
    hints: [
      'Use sklearn.model_selection.train_test_split()',
      'Pass X, y, test_size, and random_state parameters',
      'Return the four split arrays'
    ]
  }
];
