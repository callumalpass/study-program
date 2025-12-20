---
title: "Outlier Detection and Treatment"
description: "Methods for identifying and handling outliers in datasets"
---

# Outlier Detection and Treatment

## Introduction

Outliers are data points that significantly differ from other observations. They can arise from measurement errors, data entry mistakes, experimental errors, or represent genuine extreme values. Proper outlier handling is crucial as they can severely impact statistical analyses and machine learning models.

The challenge is distinguishing between outliers that represent errors (should be removed) and outliers that represent rare but valid observations (should be kept). This lesson covers detection methods, treatment strategies, and domain-specific considerations.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.covariance import EllipticEnvelope

class OutlierDetector:
    """Comprehensive outlier detection methods"""

    @staticmethod
    def zscore_method(data, threshold=3):
        """Detect outliers using Z-score"""
        z_scores = np.abs(stats.zscore(data.dropna()))
        outliers = z_scores > threshold
        return outliers

    @staticmethod
    def iqr_method(data, multiplier=1.5):
        """Detect outliers using Interquartile Range"""
        Q1 = data.quantile(0.25)
        Q3 = data.quantile(0.75)
        IQR = Q3 - Q1

        lower_bound = Q1 - multiplier * IQR
        upper_bound = Q3 + multiplier * IQR

        outliers = (data < lower_bound) | (data > upper_bound)

        return outliers, {'lower': lower_bound, 'upper': upper_bound, 'Q1': Q1, 'Q3': Q3, 'IQR': IQR}

    @staticmethod
    def modified_zscore(data, threshold=3.5):
        """Modified Z-score using median absolute deviation"""
        median = np.median(data.dropna())
        mad = np.median(np.abs(data.dropna() - median))

        modified_z_scores = 0.6745 * (data - median) / mad
        outliers = np.abs(modified_z_scores) > threshold

        return outliers

    @staticmethod
    def isolation_forest(df, contamination=0.1):
        """Detect outliers using Isolation Forest"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df_numeric = df[numeric_cols].dropna()

        iso_forest = IsolationForest(contamination=contamination, random_state=42)
        predictions = iso_forest.fit_predict(df_numeric)

        outliers = predictions == -1
        return outliers

    @staticmethod
    def local_outlier_factor(df, n_neighbors=20, contamination=0.1):
        """Detect outliers using Local Outlier Factor"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df_numeric = df[numeric_cols].dropna()

        lof = LocalOutlierFactor(n_neighbors=n_neighbors, contamination=contamination)
        predictions = lof.fit_predict(df_numeric)

        outliers = predictions == -1
        return outliers

# Create sample data with outliers
np.random.seed(42)
n = 1000

normal_data = np.random.normal(100, 15, n-20)
outliers_data = np.concatenate([normal_data, np.array([200, 220, 240, 250, 260, -50, -30, -20, 5, 10, 180, 190, 195, 205, 210, 215, 225, 230, 235, 245])])

sample_df = pd.DataFrame({
    'value': outliers_data,
    'category': np.random.choice(['A', 'B', 'C'], len(outliers_data))
})

detector = OutlierDetector()

print("OUTLIER DETECTION RESULTS")
print("="*60)

# Z-score method
z_outliers = detector.zscore_method(sample_df['value'])
print(f"\nZ-score Method (threshold=3):")
print(f"  Outliers detected: {z_outliers.sum()}")

# IQR method
iqr_outliers, iqr_bounds = detector.iqr_method(sample_df['value'])
print(f"\nIQR Method:")
print(f"  Outliers detected: {iqr_outliers.sum()}")
print(f"  Lower bound: {iqr_bounds['lower']:.2f}")
print(f"  Upper bound: {iqr_bounds['upper']:.2f}")

# Modified Z-score
mod_z_outliers = detector.modified_zscore(sample_df['value'])
print(f"\nModified Z-score Method:")
print(f"  Outliers detected: {mod_z_outliers.sum()}")

# Isolation Forest
iso_outliers = detector.isolation_forest(sample_df)
print(f"\nIsolation Forest:")
print(f"  Outliers detected: {iso_outliers.sum()}")

# Compare methods
print(f"\nComparison:")
print(f"  Data points: {len(sample_df)}")
print(f"  True outliers (inserted): 20")
print(f"  Z-score detected: {z_outliers.sum()}")
print(f"  IQR detected: {iqr_outliers.sum()}")
print(f"  Modified Z-score detected: {mod_z_outliers.sum()}")
print(f"  Isolation Forest detected: {iso_outliers.sum()}")
```

## Outlier Treatment Strategies

```python
class OutlierTreatment:
    """Methods for treating outliers"""

    @staticmethod
    def remove_outliers(df, outlier_mask):
        """Remove outliers from dataset"""
        df_clean = df[~outlier_mask].copy()
        return df_clean

    @staticmethod
    def cap_outliers(data, lower_percentile=5, upper_percentile=95):
        """Cap outliers at percentile values"""
        lower_cap = data.quantile(lower_percentile/100)
        upper_cap = data.quantile(upper_percentile/100)

        data_capped = data.clip(lower=lower_cap, upper=upper_cap)
        return data_capped

    @staticmethod
    def winsorize(data, limits=(0.05, 0.05)):
        """Winsorize data (replace outliers with boundary values)"""
        from scipy.stats.mstats import winsorize as scipy_winsorize
        return scipy_winsorize(data, limits=limits)

    @staticmethod
    def transform_log(data):
        """Log transformation to reduce outlier impact"""
        return np.log1p(data)  # log(1 + x) to handle zeros

    @staticmethod
    def impute_outliers(data, outlier_mask, method='median'):
        """Replace outliers with statistical measures"""
        data_treated = data.copy()

        if method == 'median':
            replacement = data[~outlier_mask].median()
        elif method == 'mean':
            replacement = data[~outlier_mask].mean()
        elif method == 'boundary':
            Q1 = data.quantile(0.25)
            Q3 = data.quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR

            data_treated = data.clip(lower=lower_bound, upper=upper_bound)
            return data_treated

        data_treated[outlier_mask] = replacement
        return data_treated

# Example treatments
treatment = OutlierTreatment()

print("\n\nOUTLIER TREATMENT EXAMPLES")
print("="*60)

# Remove outliers
df_removed = treatment.remove_outliers(sample_df, iqr_outliers)
print(f"\nRemoval:")
print(f"  Original size: {len(sample_df)}")
print(f"  After removal: {len(df_removed)}")
print(f"  Removed: {len(sample_df) - len(df_removed)}")

# Cap outliers
data_capped = treatment.cap_outliers(sample_df['value'], lower_percentile=5, upper_percentile=95)
print(f"\nCapping:")
print(f"  Original range: [{sample_df['value'].min():.2f}, {sample_df['value'].max():.2f}]")
print(f"  Capped range: [{data_capped.min():.2f}, {data_capped.max():.2f}]")

# Impute outliers
data_imputed = treatment.impute_outliers(sample_df['value'], iqr_outliers, method='median')
print(f"\nImputation (median):")
print(f"  Original mean: {sample_df['value'].mean():.2f}")
print(f"  After imputation mean: {data_imputed.mean():.2f}")

# Log transformation
data_positive = sample_df['value'] - sample_df['value'].min() + 1  # Make positive
data_log = treatment.transform_log(data_positive)
print(f"\nLog Transformation:")
print(f"  Original std: {sample_df['value'].std():.2f}")
print(f"  Transformed std: {data_log.std():.2f}")
```

## Multivariate Outlier Detection

```python
class MultivariateOutlierDetector:
    """Detect outliers in multiple dimensions"""

    @staticmethod
    def mahalanobis_distance(df):
        """Calculate Mahalanobis distance for outlier detection"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df_numeric = df[numeric_cols].dropna()

        mean = df_numeric.mean()
        cov = df_numeric.cov()

        try:
            inv_cov = np.linalg.inv(cov)
        except np.linalg.LinAlgError:
            # Use pseudo-inverse if covariance matrix is singular
            inv_cov = np.linalg.pinv(cov)

        diff = df_numeric - mean
        mahal_dist = np.sqrt(np.sum(diff @ inv_cov * diff, axis=1))

        return mahal_dist

    @staticmethod
    def elliptic_envelope(df, contamination=0.1):
        """Detect outliers using Elliptic Envelope"""
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        df_numeric = df[numeric_cols].dropna()

        ee = EllipticEnvelope(contamination=contamination, random_state=42)
        predictions = ee.fit_predict(df_numeric)

        outliers = predictions == -1
        return outliers

# Create multivariate data
mvdata = pd.DataFrame({
    'feature1': np.random.normal(50, 10, n),
    'feature2': np.random.normal(100, 20, n),
    'feature3': np.random.normal(75, 15, n)
})

# Add multivariate outliers
mvdata.loc[0:5, 'feature1'] = [150, 160, 140, 155, 145, 165]
mvdata.loc[0:5, 'feature2'] = [250, 260, 240, 255, 245, 265]

mv_detector = MultivariateOutlierDetector()

# Mahalanobis distance
mahal_dist = mv_detector.mahalanobis_distance(mvdata)
mahal_outliers = mahal_dist > np.percentile(mahal_dist, 95)

print("\n\nMULTIVARIATE OUTLIER DETECTION")
print("="*60)
print(f"\nMahalanobis Distance:")
print(f"  Outliers detected: {mahal_outliers.sum()}")
print(f"  Max distance: {mahal_dist.max():.2f}")

# Elliptic Envelope
ee_outliers = mv_detector.elliptic_envelope(mvdata)
print(f"\nElliptic Envelope:")
print(f"  Outliers detected: {ee_outliers.sum()}")
```

## Domain-Specific Considerations

```python
class DomainSpecificOutlierHandler:
    """Handle outliers with domain knowledge"""

    @staticmethod
    def validate_business_rules(df, rules):
        """Validate data against business rules"""
        violations = {}

        for rule_name, rule_func in rules.items():
            violations[rule_name] = rule_func(df)

        return violations

    @staticmethod
    def flag_suspicious_patterns(df, pattern_checks):
        """Flag suspicious patterns that might indicate errors"""
        flags = {}

        for check_name, check_func in pattern_checks.items():
            flags[check_name] = check_func(df)

        return flags

# Example business rules
def age_rule(df):
    """Age should be between 0 and 120"""
    if 'age' in df.columns:
        return (df['age'] < 0) | (df['age'] > 120)
    return pd.Series([False] * len(df))

def salary_rule(df):
    """Salary should be positive and reasonable"""
    if 'salary' in df.columns:
        return (df['salary'] < 0) | (df['salary'] > 1000000)
    return pd.Series([False] * len(df))

business_rules = {
    'invalid_age': age_rule,
    'invalid_salary': salary_rule
}

sample_business_df = pd.DataFrame({
    'age': [25, 30, -5, 150, 42, 28],
    'salary': [50000, 60000, -10000, 2000000, 75000, 55000]
})

handler = DomainSpecificOutlierHandler()
violations = handler.validate_business_rules(sample_business_df, business_rules)

print("\n\nBUSINESS RULE VIOLATIONS")
print("="*60)
for rule_name, violation_mask in violations.items():
    if violation_mask.any():
        print(f"\n{rule_name}:")
        print(f"  Violations: {violation_mask.sum()}")
        print(f"  Affected rows: {sample_business_df[violation_mask].index.tolist()}")
```

## Summary

Effective outlier handling requires:

**Detection Methods:**
- Statistical: Z-score, IQR, Modified Z-score
- Machine Learning: Isolation Forest, LOF
- Multivariate: Mahalanobis distance, Elliptic Envelope

**Treatment Strategies:**
- Removal: Delete outliers
- Capping/Winsorizing: Limit to boundary values
- Transformation: Log, square root, Box-Cox
- Imputation: Replace with statistical measures

**Best Practices:**
- Investigate outliers before removing
- Consider domain knowledge
- Document all decisions
- Use multiple detection methods
- Evaluate impact on analysis
- Keep outliers for some models (tree-based)

Choose your strategy based on the data, analysis goals, and domain requirements.
