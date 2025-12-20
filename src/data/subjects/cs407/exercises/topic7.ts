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
    title: 'Email Masking',
    description: 'Write a function that masks email addresses for privacy by showing only the domain.',
    difficulty: 1,
    language: 'python',
    starterCode: `import pandas as pd

def mask_emails(df, email_column):
    # Replace emails with masked version: user@domain.com -> ****@domain.com
    # Return modified DataFrame
    pass`,
    solution: `import pandas as pd

def mask_emails(df, email_column):
    df[email_column] = df[email_column].apply(
        lambda email: '****@' + email.split('@')[1] if '@' in email else email
    )
    return df`,
    testCases: [
      {
        input: 'pd.DataFrame({"email": ["alice@example.com", "bob@test.org"]}), "email"',
        expectedOutput: 'DataFrame with masked emails',
        isHidden: false,
        description: 'Mask email addresses'
      },
      {
        input: 'pd.DataFrame({"email": ["user1@company.com"]}), "email"',
        expectedOutput: 'DataFrame with ****@company.com',
        isHidden: false,
        description: 'Single email masking'
      }
    ],
    hints: [
      'Split email by "@" to get domain',
      'Replace username part with "****"',
      'Use .apply() with lambda function',
      'Handle cases without @ symbol'
    ]
  },
  {
    id: 'cs407-ex-7-3',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'K-Anonymity Check',
    description: 'Write a function that checks if a dataset satisfies k-anonymity for given quasi-identifiers.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd

def check_k_anonymity(df, quasi_identifiers, k):
    # Check if every combination of quasi_identifiers appears at least k times
    # Return True if k-anonymity is satisfied, False otherwise
    pass`,
    solution: `import pandas as pd

def check_k_anonymity(df, quasi_identifiers, k):
    group_sizes = df.groupby(quasi_identifiers).size()
    min_group_size = group_sizes.min()
    return min_group_size >= k`,
    testCases: [
      {
        input: 'df with zip codes and ages, k=2',
        expectedOutput: 'True or False based on group sizes',
        isHidden: false,
        description: 'Check 2-anonymity'
      },
      {
        input: 'df with gender and city, k=3',
        expectedOutput: 'Boolean result',
        isHidden: false,
        description: 'Check 3-anonymity'
      }
    ],
    hints: [
      'Group by quasi_identifiers columns',
      'Use .size() to count group sizes',
      'Find minimum group size',
      'Return True if min size >= k'
    ]
  },
  {
    id: 'cs407-ex-7-4',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Bias Detection in Groups',
    description: 'Write a function that detects demographic parity bias by comparing outcome rates across groups.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def detect_demographic_parity_bias(df, sensitive_attr, outcome_col, threshold=0.1):
    # Calculate outcome rate for each group
    # Check if difference exceeds threshold
    # Return dict with rates and bias_detected flag
    pass`,
    solution: `import pandas as pd

def detect_demographic_parity_bias(df, sensitive_attr, outcome_col, threshold=0.1):
    group_rates = df.groupby(sensitive_attr)[outcome_col].mean()
    max_rate = group_rates.max()
    min_rate = group_rates.min()
    difference = max_rate - min_rate

    return {
        'group_rates': group_rates.to_dict(),
        'difference': round(difference, 3),
        'bias_detected': difference > threshold
    }`,
    testCases: [
      {
        input: 'df with gender and approved columns',
        expectedOutput: 'Dict with rates and bias detection',
        isHidden: false,
        description: 'Gender bias detection'
      },
      {
        input: 'df with race and hired columns',
        expectedOutput: 'Bias analysis results',
        isHidden: false,
        description: 'Hiring bias detection'
      }
    ],
    hints: [
      'Group by sensitive attribute',
      'Calculate mean of outcome for each group',
      'Find difference between max and min rates',
      'Compare difference to threshold'
    ]
  },
  {
    id: 'cs407-ex-7-5',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Equal Opportunity Metric',
    description: 'Write a function that calculates the equal opportunity difference for a binary classifier.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd

def calculate_equal_opportunity(df, sensitive_attr, y_true_col, y_pred_col, favorable_label=1):
    # Calculate True Positive Rate for each group
    # Return difference between TPRs (equal opportunity metric)
    pass`,
    solution: `import pandas as pd

def calculate_equal_opportunity(df, sensitive_attr, y_true_col, y_pred_col, favorable_label=1):
    def tpr(group):
        positives = group[group[y_true_col] == favorable_label]
        if len(positives) == 0:
            return 0
        return (positives[y_pred_col] == favorable_label).sum() / len(positives)

    tpr_by_group = df.groupby(sensitive_attr).apply(tpr)
    difference = tpr_by_group.max() - tpr_by_group.min()

    return {
        'tpr_by_group': tpr_by_group.to_dict(),
        'equal_opportunity_difference': round(difference, 3)
    }`,
    testCases: [
      {
        input: 'df with predictions and true labels by group',
        expectedOutput: 'TPR difference between groups',
        isHidden: false,
        description: 'Equal opportunity calculation'
      }
    ],
    hints: [
      'Filter for true positive cases (y_true == favorable_label)',
      'Calculate TPR = correct predictions / total positives',
      'Compute TPR for each group',
      'Return difference between max and min TPR'
    ]
  },
  {
    id: 'cs407-ex-7-6',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Data Suppression',
    description: 'Write a function that suppresses rare values in a column to protect privacy.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def suppress_rare_values(df, column, min_count):
    # Replace values that appear less than min_count times with "SUPPRESSED"
    # Return modified DataFrame
    pass`,
    solution: `import pandas as pd

def suppress_rare_values(df, column, min_count):
    value_counts = df[column].value_counts()
    rare_values = value_counts[value_counts < min_count].index
    df[column] = df[column].apply(
        lambda x: 'SUPPRESSED' if x in rare_values else x
    )
    return df`,
    testCases: [
      {
        input: 'df with occupation column, min_count=2',
        expectedOutput: 'DataFrame with rare occupations suppressed',
        isHidden: false,
        description: 'Suppress rare occupations'
      },
      {
        input: 'df with city column, min_count=3',
        expectedOutput: 'Rare cities replaced with SUPPRESSED',
        isHidden: false,
        description: 'Suppress rare cities'
      }
    ],
    hints: [
      'Use value_counts() to count occurrences',
      'Filter for values with count < min_count',
      'Replace rare values with "SUPPRESSED"',
      'Use .apply() with conditional logic'
    ]
  },
  {
    id: 'cs407-ex-7-7',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Age Binning for Privacy',
    description: 'Write a function that bins ages into ranges to reduce identifiability.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def bin_ages(df, age_column, bin_size=10):
    # Convert ages to bins (e.g., 20-29, 30-39)
    # Return modified DataFrame
    pass`,
    solution: `import pandas as pd

def bin_ages(df, age_column, bin_size=10):
    def age_to_bin(age):
        lower = (age // bin_size) * bin_size
        upper = lower + bin_size - 1
        return f'{lower}-{upper}'

    df[age_column] = df[age_column].apply(age_to_bin)
    return df`,
    testCases: [
      {
        input: 'df with ages [25, 32, 45], bin_size=10',
        expectedOutput: 'DataFrame with age ranges ["20-29", "30-39", "40-49"]',
        isHidden: false,
        description: 'Bin ages by decade'
      },
      {
        input: 'df with ages [18, 22, 35], bin_size=5',
        expectedOutput: 'Age ranges with 5-year bins',
        isHidden: false,
        description: '5-year age bins'
      }
    ],
    hints: [
      'Calculate lower bound: (age // bin_size) * bin_size',
      'Calculate upper bound: lower + bin_size - 1',
      'Format as string: "lower-upper"',
      'Use .apply() to transform all ages'
    ]
  },
  {
    id: 'cs407-ex-7-8',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Consent Tracking',
    description: 'Write a function that filters data based on user consent for specific purposes.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def filter_by_consent(df, purpose):
    # df has columns: user_id, consent_purposes (list), data
    # Filter to only include users who consented to 'purpose'
    # Return filtered DataFrame
    pass`,
    solution: `import pandas as pd

def filter_by_consent(df, purpose):
    return df[df['consent_purposes'].apply(lambda x: purpose in x)]`,
    testCases: [
      {
        input: 'df with consent_purposes, filter for "marketing"',
        expectedOutput: 'DataFrame with only users who consented to marketing',
        isHidden: false,
        description: 'Filter by marketing consent'
      },
      {
        input: 'df with consent_purposes, filter for "analytics"',
        expectedOutput: 'Users who consented to analytics',
        isHidden: false,
        description: 'Filter by analytics consent'
      }
    ],
    hints: [
      'consent_purposes is a list for each user',
      'Check if purpose is in the list',
      'Use .apply() with lambda to check membership',
      'Filter DataFrame based on result'
    ]
  },
  {
    id: 'cs407-ex-7-9',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Differential Privacy Noise',
    description: 'Write a function that adds Laplacian noise to numeric data for differential privacy.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd
import numpy as np

def add_laplacian_noise(df, columns, epsilon):
    # Add Laplacian noise with scale = sensitivity / epsilon
    # Assume sensitivity = 1 for each column
    # Return DataFrame with noisy data
    pass`,
    solution: `import pandas as pd
import numpy as np

def add_laplacian_noise(df, columns, epsilon):
    df_noisy = df.copy()
    scale = 1.0 / epsilon

    for col in columns:
        noise = np.random.laplace(0, scale, size=len(df))
        df_noisy[col] = df[col] + noise

    return df_noisy`,
    testCases: [
      {
        input: 'df with salary and age columns, epsilon=0.1',
        expectedOutput: 'DataFrame with Laplacian noise added',
        isHidden: false,
        description: 'Add noise for privacy'
      },
      {
        input: 'df with score column, epsilon=1.0',
        expectedOutput: 'Noisy scores with differential privacy',
        isHidden: false,
        description: 'Differential privacy on scores'
      }
    ],
    hints: [
      'Scale = sensitivity / epsilon',
      'Use np.random.laplace(0, scale, size)',
      'Add noise to each specified column',
      'Return a copy of the DataFrame with noise'
    ]
  },
  {
    id: 'cs407-ex-7-10',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Fairness Through Unawareness',
    description: 'Write a function that removes sensitive attributes from a dataset.',
    difficulty: 1,
    language: 'python',
    starterCode: `import pandas as pd

def remove_sensitive_attributes(df, sensitive_columns):
    # Remove specified sensitive columns
    # Return DataFrame without sensitive attributes
    pass`,
    solution: `import pandas as pd

def remove_sensitive_attributes(df, sensitive_columns):
    return df.drop(columns=sensitive_columns)`,
    testCases: [
      {
        input: 'df with gender, race, age columns, remove ["gender", "race"]',
        expectedOutput: 'DataFrame without gender and race',
        isHidden: false,
        description: 'Remove sensitive attributes'
      },
      {
        input: 'df with religion and ethnicity, remove both',
        expectedOutput: 'DataFrame with attributes removed',
        isHidden: false,
        description: 'Remove multiple sensitive columns'
      }
    ],
    hints: [
      'Use df.drop(columns=sensitive_columns)',
      'This implements fairness through unawareness',
      'Note: This does not guarantee fairness',
      'Correlated attributes may still encode bias'
    ]
  },
  {
    id: 'cs407-ex-7-11',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Disparate Impact Ratio',
    description: 'Write a function that calculates the disparate impact ratio to detect bias.',
    difficulty: 3,
    language: 'python',
    starterCode: `import pandas as pd

def calculate_disparate_impact(df, sensitive_attr, outcome_col, privileged_value):
    # Calculate selection rate for privileged and unprivileged groups
    # Disparate Impact = unprivileged_rate / privileged_rate
    # Return ratio (should be >= 0.8 for fairness)
    pass`,
    solution: `import pandas as pd

def calculate_disparate_impact(df, sensitive_attr, outcome_col, privileged_value):
    privileged = df[df[sensitive_attr] == privileged_value]
    unprivileged = df[df[sensitive_attr] != privileged_value]

    privileged_rate = privileged[outcome_col].mean()
    unprivileged_rate = unprivileged[outcome_col].mean()

    if privileged_rate == 0:
        return float('inf')

    di_ratio = unprivileged_rate / privileged_rate

    return {
        'privileged_rate': round(privileged_rate, 3),
        'unprivileged_rate': round(unprivileged_rate, 3),
        'disparate_impact_ratio': round(di_ratio, 3),
        'fair': di_ratio >= 0.8
    }`,
    testCases: [
      {
        input: 'df with gender and hired columns',
        expectedOutput: 'Disparate impact analysis',
        isHidden: false,
        description: 'Hiring fairness check'
      },
      {
        input: 'df with race and approved columns',
        expectedOutput: 'Approval fairness analysis',
        isHidden: false,
        description: 'Loan approval fairness'
      }
    ],
    hints: [
      'Split data into privileged and unprivileged groups',
      'Calculate mean outcome for each group',
      'Divide unprivileged_rate by privileged_rate',
      '80% rule: ratio should be >= 0.8 for fairness'
    ]
  },
  {
    id: 'cs407-ex-7-12',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Data Retention Policy',
    description: 'Write a function that removes data older than a specified retention period.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
from datetime import datetime, timedelta

def apply_retention_policy(df, date_column, retention_days):
    # Remove rows where date is older than retention_days from today
    # Return filtered DataFrame
    pass`,
    solution: `import pandas as pd
from datetime import datetime, timedelta

def apply_retention_policy(df, date_column, retention_days):
    cutoff_date = datetime.now() - timedelta(days=retention_days)
    df[date_column] = pd.to_datetime(df[date_column])
    return df[df[date_column] >= cutoff_date]`,
    testCases: [
      {
        input: 'df with created_at column, retention_days=365',
        expectedOutput: 'DataFrame with only data from last year',
        isHidden: false,
        description: 'One year retention'
      },
      {
        input: 'df with timestamp, retention_days=90',
        expectedOutput: 'Data from last 90 days',
        isHidden: false,
        description: '90-day retention'
      }
    ],
    hints: [
      'Calculate cutoff date: now - retention_days',
      'Convert date column to datetime',
      'Filter for dates >= cutoff_date',
      'Use pd.to_datetime() for conversion'
    ]
  },
  {
    id: 'cs407-ex-7-13',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Pseudonymization',
    description: 'Write a function that pseudonymizes user IDs using a hash function.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd
import hashlib

def pseudonymize_ids(df, id_column, salt=''):
    # Hash each ID with optional salt
    # Return DataFrame with pseudonymized IDs
    pass`,
    solution: `import pandas as pd
import hashlib

def pseudonymize_ids(df, id_column, salt=''):
    def hash_id(user_id):
        data = str(user_id) + salt
        return hashlib.sha256(data.encode()).hexdigest()[:16]

    df[id_column] = df[id_column].apply(hash_id)
    return df`,
    testCases: [
      {
        input: 'df with user_id column',
        expectedOutput: 'DataFrame with hashed IDs',
        isHidden: false,
        description: 'Pseudonymize user IDs'
      },
      {
        input: 'df with customer_id, salt="secret123"',
        expectedOutput: 'Salted hash pseudonyms',
        isHidden: false,
        description: 'Pseudonymize with salt'
      }
    ],
    hints: [
      'Convert ID to string and concatenate with salt',
      'Use hashlib.sha256() to hash',
      'Encode string before hashing',
      'Use hexdigest()[:16] for shorter hash'
    ]
  },
  {
    id: 'cs407-ex-7-14',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Calibration Fairness',
    description: 'Write a function that checks if a model is calibrated across different groups.',
    difficulty: 4,
    language: 'python',
    starterCode: `import pandas as pd
import numpy as np

def check_calibration_fairness(df, sensitive_attr, y_true_col, y_prob_col, n_bins=10):
    # For each group, check if predicted probabilities match actual outcomes
    # Return calibration error for each group
    pass`,
    solution: `import pandas as pd
import numpy as np

def check_calibration_fairness(df, sensitive_attr, y_true_col, y_prob_col, n_bins=10):
    results = {}

    for group in df[sensitive_attr].unique():
        group_df = df[df[sensitive_attr] == group]

        # Create bins
        bins = np.linspace(0, 1, n_bins + 1)
        group_df['bin'] = pd.cut(group_df[y_prob_col], bins=bins, include_lowest=True)

        # Calculate calibration error
        calibration = group_df.groupby('bin').agg({
            y_prob_col: 'mean',
            y_true_col: 'mean'
        })

        calibration_error = np.abs(
            calibration[y_prob_col] - calibration[y_true_col]
        ).mean()

        results[group] = round(calibration_error, 4)

    return results`,
    testCases: [
      {
        input: 'df with predictions, true labels, and demographic group',
        expectedOutput: 'Calibration error for each group',
        isHidden: false,
        description: 'Check model calibration fairness'
      }
    ],
    hints: [
      'Split data by sensitive attribute groups',
      'Bin predicted probabilities (0 to 1)',
      'For each bin, compare avg prediction to avg outcome',
      'Calibration error = mean absolute difference'
    ]
  },
  {
    id: 'cs407-ex-7-15',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Right to be Forgotten',
    description: 'Write a function that removes all data associated with specific user IDs.',
    difficulty: 2,
    language: 'python',
    starterCode: `import pandas as pd

def remove_user_data(df, user_id_column, users_to_remove):
    # Remove all rows associated with users_to_remove
    # Return DataFrame without the specified users
    pass`,
    solution: `import pandas as pd

def remove_user_data(df, user_id_column, users_to_remove):
    return df[~df[user_id_column].isin(users_to_remove)]`,
    testCases: [
      {
        input: 'df with user_id, remove [123, 456]',
        expectedOutput: 'DataFrame without users 123 and 456',
        isHidden: false,
        description: 'Remove specific users'
      },
      {
        input: 'df with customer_id, remove single user',
        expectedOutput: 'DataFrame with user removed',
        isHidden: false,
        description: 'GDPR data deletion'
      }
    ],
    hints: [
      'Use .isin() to check if ID is in removal list',
      'Use ~ to negate (get rows NOT in list)',
      'Return filtered DataFrame',
      'This implements right to erasure (GDPR)'
    ]
  },
  {
    id: 'cs407-ex-7-16',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Fairness Report',
    description: 'Write a function that generates a comprehensive fairness report for a model across multiple metrics.',
    difficulty: 4,
    language: 'python',
    starterCode: `import pandas as pd

def generate_fairness_report(df, sensitive_attr, y_true_col, y_pred_col):
    # Calculate multiple fairness metrics:
    # - Demographic parity difference
    # - Equal opportunity difference
    # - Disparate impact ratio
    # Return comprehensive report dictionary
    pass`,
    solution: `import pandas as pd

def generate_fairness_report(df, sensitive_attr, y_true_col, y_pred_col):
    # Demographic Parity
    selection_rates = df.groupby(sensitive_attr)[y_pred_col].mean()
    dp_diff = selection_rates.max() - selection_rates.min()

    # Equal Opportunity (TPR difference)
    def tpr(group):
        positives = group[group[y_true_col] == 1]
        if len(positives) == 0:
            return 0
        return (positives[y_pred_col] == 1).sum() / len(positives)

    tpr_by_group = df.groupby(sensitive_attr).apply(tpr)
    eo_diff = tpr_by_group.max() - tpr_by_group.min()

    # Disparate Impact
    max_rate = selection_rates.max()
    min_rate = selection_rates.min()
    di_ratio = min_rate / max_rate if max_rate > 0 else 0

    return {
        'selection_rates': selection_rates.to_dict(),
        'demographic_parity_difference': round(dp_diff, 3),
        'equal_opportunity_difference': round(eo_diff, 3),
        'disparate_impact_ratio': round(di_ratio, 3),
        'passes_80_percent_rule': di_ratio >= 0.8,
        'summary': 'Fair' if (dp_diff < 0.1 and eo_diff < 0.1 and di_ratio >= 0.8) else 'Potentially Biased'
    }`,
    testCases: [
      {
        input: 'df with sensitive attribute, predictions, and true labels',
        expectedOutput: 'Comprehensive fairness report',
        isHidden: false,
        description: 'Full fairness assessment'
      }
    ],
    hints: [
      'Calculate selection rate for each group',
      'Calculate TPR for equal opportunity',
      'Compute disparate impact ratio',
      'Check 80% rule and threshold violations',
      'Combine all metrics into report dictionary'
    ]
  }
];
