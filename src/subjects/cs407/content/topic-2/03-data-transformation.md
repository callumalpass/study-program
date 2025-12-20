---
title: "Data Transformation"
description: "Techniques for transforming data to meet analysis requirements and improve model performance"
---

# Data Transformation

## Introduction

Data transformation converts data from one format or structure to another, making it suitable for analysis and modeling. Transformations can improve normality, reduce skewness, stabilize variance, and create features that better represent underlying patterns.

Common transformations include mathematical functions (log, square root, power), scaling, binning, encoding categorical variables, and creating derived features. Choosing the right transformation depends on data distribution, analysis goals, and model requirements.

```python
import pandas as pd
import numpy as np
from scipy import stats
from sklearn.preprocessing import PowerTransformer, QuantileTransformer
import matplotlib.pyplot as plt

class DataTransformer:
    """Comprehensive data transformation methods"""

    @staticmethod
    def log_transform(data, offset=1):
        """Logarithmic transformation"""
        return np.log(data + offset)

    @staticmethod
    def sqrt_transform(data):
        """Square root transformation"""
        return np.sqrt(data)

    @staticmethod
    def box_cox_transform(data):
        """Box-Cox transformation (requires positive data)"""
        if (data <= 0).any():
            data = data - data.min() + 1  # Make positive

        transformed, lambda_param = stats.boxcox(data)
        return transformed, lambda_param

    @staticmethod
    def yeo_johnson_transform(data):
        """Yeo-Johnson transformation (handles negative values)"""
        transformer = PowerTransformer(method='yeo-johnson')
        transformed = transformer.fit_transform(data.values.reshape(-1, 1)).flatten()
        return transformed, transformer

    @staticmethod
    def quantile_transform(data, output_distribution='normal'):
        """Quantile transformation to specified distribution"""
        transformer = QuantileTransformer(output_distribution=output_distribution, random_state=42)
        transformed = transformer.fit_transform(data.values.reshape(-1, 1)).flatten()
        return transformed, transformer

    @staticmethod
    def reciprocal_transform(data):
        """Reciprocal transformation"""
        return 1 / (data + 1e-10)  # Add small value to avoid division by zero

# Create skewed data
np.random.seed(42)
skewed_data = pd.Series(np.random.exponential(scale=2, size=1000))

transformer = DataTransformer()

print("DATA TRANSFORMATION EXAMPLES")
print("="*60)
print(f"\nOriginal Data Statistics:")
print(f"  Mean: {skewed_data.mean():.2f}")
print(f"  Std: {skewed_data.std():.2f}")
print(f"  Skewness: {skewed_data.skew():.2f}")
print(f"  Kurtosis: {skewed_data.kurtosis():.2f}")

# Log transform
log_data = transformer.log_transform(skewed_data)
print(f"\nLog Transform:")
print(f"  Skewness: {log_data.skew():.2f}")

# Box-Cox
boxcox_data, lambda_param = transformer.box_cox_transform(skewed_data)
print(f"\nBox-Cox Transform (λ={lambda_param:.2f}):")
print(f"  Skewness: {pd.Series(boxcox_data).skew():.2f}")

# Yeo-Johnson
yj_data, yj_transformer = transformer.yeo_johnson_transform(skewed_data)
print(f"\nYeo-Johnson Transform:")
print(f"  Skewness: {pd.Series(yj_data).skew():.2f}")

# Quantile transform
qt_data, qt_transformer = transformer.quantile_transform(skewed_data)
print(f"\nQuantile Transform:")
print(f"  Skewness: {pd.Series(qt_data).skew():.2f}")
```

## Binning and Discretization

```python
class BinningTransformer:
    """Binning and discretization methods"""

    @staticmethod
    def equal_width_binning(data, n_bins=5):
        """Equal-width binning"""
        return pd.cut(data, bins=n_bins, labels=False)

    @staticmethod
    def equal_frequency_binning(data, n_bins=5):
        """Equal-frequency (quantile) binning"""
        return pd.qcut(data, q=n_bins, labels=False, duplicates='drop')

    @staticmethod
    def custom_binning(data, bins, labels=None):
        """Custom bin edges"""
        return pd.cut(data, bins=bins, labels=labels)

# Example
age_data = pd.Series(np.random.randint(18, 80, 100))

binner = BinningTransformer()

equal_width = binner.equal_width_binning(age_data, n_bins=4)
equal_freq = binner.equal_frequency_binning(age_data, n_bins=4)
custom = binner.custom_binning(age_data, bins=[0, 25, 40, 60, 100], labels=['Young', 'Adult', 'Middle', 'Senior'])

print("\n\nBINNING EXAMPLES")
print("="*60)
print(f"\nEqual Width Distribution:")
print(equal_width.value_counts().sort_index())
print(f"\nEqual Frequency Distribution:")
print(equal_freq.value_counts().sort_index())
print(f"\nCustom Bins Distribution:")
print(custom.value_counts())
```

## Aggregation and Grouping

```python
class AggregationTransformer:
    """Aggregation transformation methods"""

    @staticmethod
    def group_aggregate(df, group_cols, agg_dict):
        """Group by and aggregate"""
        return df.groupby(group_cols).agg(agg_dict).reset_index()

    @staticmethod
    def rolling_aggregate(df, column, window, agg_func):
        """Rolling window aggregation"""
        return df[column].rolling(window=window).agg(agg_func)

    @staticmethod
    def expanding_aggregate(df, column, agg_func):
        """Expanding window aggregation"""
        return df[column].expanding().agg(agg_func)

# Example
transaction_df = pd.DataFrame({
    'customer_id': np.random.choice(['A', 'B', 'C'], 100),
    'date': pd.date_range('2024-01-01', periods=100, freq='D'),
    'amount': np.random.uniform(10, 500, 100)
})

aggregator = AggregationTransformer()

# Group aggregate
customer_summary = aggregator.group_aggregate(
    transaction_df,
    ['customer_id'],
    {'amount': ['sum', 'mean', 'count']}
)

print("\n\nAGGREGATION EXAMPLES")
print("="*60)
print("\nCustomer Summary:")
print(customer_summary)

# Rolling aggregate
transaction_df = transaction_df.sort_values('date')
transaction_df['rolling_mean_7d'] = aggregator.rolling_aggregate(
    transaction_df, 'amount', window=7, agg_func='mean'
)

print("\nRolling 7-Day Mean (first 10 rows):")
print(transaction_df[['date', 'amount', 'rolling_mean_7d']].head(10))
```

## Summary

Data transformation techniques include:

**Mathematical Transforms:**
- Log: Reduce right skewness
- Square Root: Moderate skewness reduction
- Box-Cox/Yeo-Johnson: Optimize normality
- Quantile: Transform to any distribution

**Discretization:**
- Equal-width binning
- Equal-frequency binning
- Custom binning with domain knowledge

**Aggregation:**
- Group-based aggregation
- Rolling windows
- Expanding windows

Choose transformations based on data distribution, model requirements, and interpretability needs.
