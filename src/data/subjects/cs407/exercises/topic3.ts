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
  },
  {
    id: 'cs407-ex-3-3',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Distribution Analysis',
    description: 'Write a function that computes skewness and kurtosis for a numeric Series to analyze its distribution shape.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from scipy import stats

def analyze_distribution(series):
    # Return dict with 'skewness' and 'kurtosis'
    pass`,
    solution: `import pandas as pd
from scipy import stats

def analyze_distribution(series):
    return {
        'skewness': series.skew(),
        'kurtosis': series.kurtosis()
    }`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])',
        expectedOutput: '{"skewness": ~0.0, "kurtosis": ~-1.2}',
        isHidden: false,
        description: 'Uniform distribution'
      },
      {
        input: 'pd.Series([1, 2, 2, 3, 3, 3, 4, 4, 5])',
        expectedOutput: 'dict with skewness and kurtosis values',
        isHidden: false,
        description: 'Slightly skewed distribution'
      }
    ],
    hints: [
      'Use .skew() method for skewness',
      'Use .kurtosis() method for kurtosis',
      'Skewness measures asymmetry',
      'Kurtosis measures tail heaviness'
    ]
  },
  {
    id: 'cs407-ex-3-4',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Percentile Calculator',
    description: 'Write a function that computes specific percentiles (25th, 50th, 75th, 90th, 95th) for a numeric Series.',
    difficulty: 1,
    language: 'python',
    starterCode: `import pandas as pd

def compute_percentiles(series):
    # Return dict with percentile values
    pass`,
    solution: `import pandas as pd

def compute_percentiles(series):
    return {
        'p25': series.quantile(0.25),
        'p50': series.quantile(0.50),
        'p75': series.quantile(0.75),
        'p90': series.quantile(0.90),
        'p95': series.quantile(0.95)
    }`,
    testCases: [
      {
        input: 'pd.Series(range(1, 101))',
        expectedOutput: '{"p25": 25.75, "p50": 50.5, "p75": 75.25, "p90": 90.1, "p95": 95.05}',
        isHidden: false,
        description: 'Series from 1 to 100'
      }
    ],
    hints: [
      'Use .quantile() method',
      'Pass percentile as decimal (0.25 for 25th percentile)',
      'Build dictionary with results'
    ]
  },
  {
    id: 'cs407-ex-3-5',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Value Frequency Counter',
    description: 'Write a function that counts value frequencies and returns the top N most common values with their counts.',
    difficulty: 1,
    language: 'python',
    starterCode: `import pandas as pd

def get_top_values(series, n=5):
    # Return dict with top N values and their counts
    pass`,
    solution: `import pandas as pd

def get_top_values(series, n=5):
    value_counts = series.value_counts().head(n)
    return value_counts.to_dict()`,
    testCases: [
      {
        input: 'pd.Series(["a", "b", "a", "c", "a", "b", "d"]), 2',
        expectedOutput: '{"a": 3, "b": 2}',
        isHidden: false,
        description: 'Get top 2 most frequent values'
      }
    ],
    hints: [
      'Use .value_counts() to count occurrences',
      'Use .head(n) to get top N',
      'Use .to_dict() to convert to dictionary'
    ]
  },
  {
    id: 'cs407-ex-3-6',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Two-Sample T-Test',
    description: 'Write a function that performs a two-sample t-test and returns the t-statistic and p-value.',
    difficulty: 3,
    language: 'python',
    starterCode: `from scipy import stats

def perform_ttest(sample1, sample2):
    # Return dict with 't_statistic' and 'p_value'
    pass`,
    solution: `from scipy import stats

def perform_ttest(sample1, sample2):
    t_stat, p_value = stats.ttest_ind(sample1, sample2)
    return {
        't_statistic': t_stat,
        'p_value': p_value
    }`,
    testCases: [
      {
        input: '[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]',
        expectedOutput: 'dict with t_statistic and p_value',
        isHidden: false,
        description: 'Two samples with slight difference'
      }
    ],
    hints: [
      'Use scipy.stats.ttest_ind() for independent two-sample t-test',
      'Function returns (t_statistic, p_value)',
      'Return both values in a dictionary'
    ]
  },
  {
    id: 'cs407-ex-3-7',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Chi-Square Test',
    description: 'Write a function that performs a chi-square test of independence on a contingency table.',
    difficulty: 3,
    language: 'python',
    starterCode: `from scipy import stats
import numpy as np

def chi_square_test(contingency_table):
    # Return dict with 'chi2', 'p_value', 'dof', 'expected'
    pass`,
    solution: `from scipy import stats
import numpy as np

def chi_square_test(contingency_table):
    chi2, p_value, dof, expected = stats.chi2_contingency(contingency_table)
    return {
        'chi2': chi2,
        'p_value': p_value,
        'dof': dof,
        'expected': expected
    }`,
    testCases: [
      {
        input: '[[10, 20, 30], [6, 9, 17]]',
        expectedOutput: 'dict with chi2, p_value, dof, and expected frequencies',
        isHidden: false,
        description: 'Contingency table test'
      }
    ],
    hints: [
      'Use scipy.stats.chi2_contingency()',
      'Returns (chi2, p_value, degrees_of_freedom, expected_frequencies)',
      'Package results in a dictionary'
    ]
  },
  {
    id: 'cs407-ex-3-8',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Normality Test',
    description: 'Write a function that performs the Shapiro-Wilk test for normality and returns whether data is likely normal.',
    difficulty: 2,
    language: 'python',
    starterCode: `from scipy import stats

def test_normality(data, alpha=0.05):
    # Return dict with 'statistic', 'p_value', 'is_normal'
    pass`,
    solution: `from scipy import stats

def test_normality(data, alpha=0.05):
    statistic, p_value = stats.shapiro(data)
    return {
        'statistic': statistic,
        'p_value': p_value,
        'is_normal': p_value > alpha
    }`,
    testCases: [
      {
        input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0.05',
        expectedOutput: 'dict with statistic, p_value, and is_normal boolean',
        isHidden: false,
        description: 'Test normality of uniform data'
      }
    ],
    hints: [
      'Use scipy.stats.shapiro() for Shapiro-Wilk test',
      'Returns (statistic, p_value)',
      'If p_value > alpha, fail to reject null (data is normal)',
      'Add is_normal boolean to result'
    ]
  },
  {
    id: 'cs407-ex-3-9',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Confidence Interval',
    description: 'Write a function that computes a confidence interval for the mean of a sample.',
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
        input: '[10, 12, 14, 16, 18], 0.95',
        expectedOutput: 'tuple with lower and upper bounds',
        isHidden: false,
        description: '95% confidence interval'
      }
    ],
    hints: [
      'Calculate sample mean and standard error',
      'Use stats.t.ppf() to get t-critical value',
      'Margin of error = standard_error * t_critical',
      'CI = (mean - margin, mean + margin)'
    ]
  },
  {
    id: 'cs407-ex-3-10',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Covariance Matrix',
    description: 'Write a function that computes the covariance matrix for numeric columns in a DataFrame.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def compute_covariance_matrix(df):
    # Return covariance matrix for numeric columns
    pass`,
    solution: `import pandas as pd

def compute_covariance_matrix(df):
    return df.select_dtypes(include=['number']).cov()`,
    testCases: [
      {
        input: 'pd.DataFrame({"a": [1, 2, 3, 4], "b": [2, 4, 6, 8], "c": ["x", "y", "z", "w"]})',
        expectedOutput: 'Covariance matrix DataFrame',
        isHidden: false,
        description: 'Compute covariance for numeric columns'
      }
    ],
    hints: [
      'Select numeric columns with .select_dtypes()',
      'Use .cov() method to compute covariance matrix',
      'Covariance measures linear relationship strength'
    ]
  },
  {
    id: 'cs407-ex-3-11',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'ANOVA Test',
    description: 'Write a function that performs one-way ANOVA to test if means of multiple groups are equal.',
    difficulty: 3,
    language: 'python',
    starterCode: `from scipy import stats

def perform_anova(*groups):
    # Return dict with 'f_statistic' and 'p_value'
    pass`,
    solution: `from scipy import stats

def perform_anova(*groups):
    f_stat, p_value = stats.f_oneway(*groups)
    return {
        'f_statistic': f_stat,
        'p_value': p_value
    }`,
    testCases: [
      {
        input: '[1, 2, 3], [4, 5, 6], [7, 8, 9]',
        expectedOutput: 'dict with f_statistic and p_value',
        isHidden: false,
        description: 'ANOVA for three groups'
      }
    ],
    hints: [
      'Use scipy.stats.f_oneway() for one-way ANOVA',
      'Pass groups as separate arguments using *groups',
      'Returns (f_statistic, p_value)',
      'Tests null hypothesis that all group means are equal'
    ]
  },
  {
    id: 'cs407-ex-3-12',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Grouped Statistics',
    description: 'Write a function that computes mean, median, and std for each group in a DataFrame.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def compute_grouped_stats(df, group_col, value_col):
    # Return DataFrame with mean, median, std for each group
    pass`,
    solution: `import pandas as pd

def compute_grouped_stats(df, group_col, value_col):
    return df.groupby(group_col)[value_col].agg(['mean', 'median', 'std'])`,
    testCases: [
      {
        input: 'pd.DataFrame({"group": ["A", "A", "B", "B"], "value": [10, 20, 30, 40]}), "group", "value"',
        expectedOutput: 'DataFrame with mean, median, std for groups A and B',
        isHidden: false,
        description: 'Grouped statistics'
      }
    ],
    hints: [
      'Use .groupby(group_col) to group data',
      'Select value_col after grouping',
      'Use .agg() with list of functions',
      'Returns DataFrame with group as index'
    ]
  },
  {
    id: 'cs407-ex-3-13',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Outlier Impact Analysis',
    description: 'Write a function that compares mean/median before and after removing outliers to assess outlier impact.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd

def analyze_outlier_impact(series):
    # Return dict with 'original_mean', 'original_median', 'clean_mean', 'clean_median'
    pass`,
    solution: `import pandas as pd

def analyze_outlier_impact(series):
    original_mean = series.mean()
    original_median = series.median()

    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    clean_series = series[(series >= lower_bound) & (series <= upper_bound)]
    clean_mean = clean_series.mean()
    clean_median = clean_series.median()

    return {
        'original_mean': original_mean,
        'original_median': original_median,
        'clean_mean': clean_mean,
        'clean_median': clean_median
    }`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5, 100])',
        expectedOutput: 'dict showing mean changes significantly, median stays stable',
        isHidden: false,
        description: 'Series with one extreme outlier'
      }
    ],
    hints: [
      'Calculate original mean and median',
      'Use IQR method to identify outliers',
      'Filter series to remove outliers',
      'Calculate clean mean and median',
      'Compare to see outlier impact'
    ]
  },
  {
    id: 'cs407-ex-3-14',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Pearson Correlation',
    description: 'Write a function that computes Pearson correlation coefficient and p-value between two Series.',
    difficulty: 2,
    language: 'python',
    starterCode: `from scipy import stats

def compute_pearson_correlation(x, y):
    # Return dict with 'correlation' and 'p_value'
    pass`,
    solution: `from scipy import stats

def compute_pearson_correlation(x, y):
    correlation, p_value = stats.pearsonr(x, y)
    return {
        'correlation': correlation,
        'p_value': p_value
    }`,
    testCases: [
      {
        input: '[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]',
        expectedOutput: '{"correlation": 1.0, "p_value": very small}',
        isHidden: false,
        description: 'Perfect positive correlation'
      },
      {
        input: '[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]',
        expectedOutput: '{"correlation": -1.0, "p_value": very small}',
        isHidden: false,
        description: 'Perfect negative correlation'
      }
    ],
    hints: [
      'Use scipy.stats.pearsonr() for Pearson correlation',
      'Returns (correlation_coefficient, p_value)',
      'Correlation ranges from -1 to 1',
      'p_value tests if correlation is significantly different from 0'
    ]
  },
  {
    id: 'cs407-ex-3-15',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Distribution Comparison',
    description: 'Write a function that compares two distributions using the Kolmogorov-Smirnov test.',
    difficulty: 3,
    language: 'python',
    starterCode: `from scipy import stats

def compare_distributions(sample1, sample2):
    # Return dict with 'statistic', 'p_value', 'are_different'
    pass`,
    solution: `from scipy import stats

def compare_distributions(sample1, sample2, alpha=0.05):
    statistic, p_value = stats.ks_2samp(sample1, sample2)
    return {
        'statistic': statistic,
        'p_value': p_value,
        'are_different': p_value < alpha
    }`,
    testCases: [
      {
        input: '[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]',
        expectedOutput: 'dict with are_different: False',
        isHidden: false,
        description: 'Same distribution'
      },
      {
        input: '[1, 2, 3, 4, 5], [10, 20, 30, 40, 50]',
        expectedOutput: 'dict with are_different: True',
        isHidden: false,
        description: 'Different distributions'
      }
    ],
    hints: [
      'Use scipy.stats.ks_2samp() for two-sample KS test',
      'Returns (statistic, p_value)',
      'If p_value < alpha, distributions are significantly different',
      'Add are_different boolean to result'
    ]
  },
  {
    id: 'cs407-ex-3-16',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Variance Analysis',
    description: 'Write a function that computes variance, coefficient of variation, and variance ratio between two Series.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
import numpy as np

def analyze_variance(series1, series2):
    # Return dict with variance info for both series and their ratio
    pass`,
    solution: `import pandas as pd
import numpy as np

def analyze_variance(series1, series2):
    var1 = series1.var()
    var2 = series2.var()
    cv1 = (series1.std() / series1.mean()) * 100 if series1.mean() != 0 else None
    cv2 = (series2.std() / series2.mean()) * 100 if series2.mean() != 0 else None
    variance_ratio = var1 / var2 if var2 != 0 else None

    return {
        'variance1': var1,
        'variance2': var2,
        'cv1': cv1,
        'cv2': cv2,
        'variance_ratio': variance_ratio
    }`,
    testCases: [
      {
        input: 'pd.Series([1, 2, 3, 4, 5]), pd.Series([10, 20, 30, 40, 50])',
        expectedOutput: 'dict with variance metrics for both series',
        isHidden: false,
        description: 'Compare variance of two series'
      }
    ],
    hints: [
      'Use .var() for variance',
      'Coefficient of variation = (std / mean) * 100',
      'Variance ratio = var1 / var2',
      'Handle division by zero cases',
      'CV shows relative variability'
    ]
  }
];
