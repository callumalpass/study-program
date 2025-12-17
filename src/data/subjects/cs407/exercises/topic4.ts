import { CodingExercise } from '../../../../core/types';

export const cs407Topic4Exercises: CodingExercise[] = [
  {
    id: 'cs407-ex-4-1',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Hypothesis Test',
    description: 'Write a function that performs a two-sample t-test and returns the p-value.',
    difficulty: 3,
    language: 'python',
    starterCode: `from scipy import stats

def perform_ttest(sample1, sample2):
    # Return p-value from two-sample t-test
    pass`,
    solution: `from scipy import stats

def perform_ttest(sample1, sample2):
    t_stat, p_value = stats.ttest_ind(sample1, sample2)
    return p_value`,
    testCases: [
      {
        input: '[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]',
        expectedOutput: 'float (p-value)',
        isHidden: false,
        description: 'Two samples'
      }
    ],
    hints: [
      'Use scipy.stats.ttest_ind() for independent two-sample t-test',
      'The function returns (t_statistic, p_value)',
      'Return only the p-value'
    ]
  },
  {
    id: 'cs407-ex-4-2',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Confidence Interval',
    description: 'Write a function that computes a 95% confidence interval for the mean of a sample.',
    difficulty: 2,
    language: 'python',
    starterCode: `import numpy as np
from scipy import stats

def compute_confidence_interval(sample, confidence=0.95):
    # Return (lower_bound, upper_bound)
    pass`,
    solution: `import numpy as np
from scipy import stats

def compute_confidence_interval(sample, confidence=0.95):
    mean = np.mean(sample)
    se = stats.sem(sample)
    margin = se * stats.t.ppf((1 + confidence) / 2, len(sample) - 1)
    return (mean - margin, mean + margin)`,
    testCases: [
      {
        input: '[10, 12, 14, 16, 18]',
        expectedOutput: '(11.5, 16.5) approximately',
        isHidden: false,
        description: 'Sample data'
      }
    ],
    hints: [
      'Calculate sample mean and standard error',
      'Use stats.t.ppf() to get t-critical value',
      'Margin of error = standard_error * t_critical',
      'CI = (mean - margin, mean + margin)'
    ]
  }
];
