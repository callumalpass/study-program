---
title: "Descriptive Statistics"
description: "Understanding and calculating descriptive statistics for data exploration"
---

# Descriptive Statistics

Descriptive statistics summarize and describe data characteristics using measures of central tendency, dispersion, and shape.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'values': np.random.normal(100, 15, 1000)
})

print("Central Tendency:")
print(f"Mean: {df['values'].mean():.2f}")
print(f"Median: {df['values'].median():.2f}")
print(f"Mode: {df['values'].mode()[0]:.2f}")

print("\nDispersion:")
print(f"Std: {df['values'].std():.2f}")
print(f"Variance: {df['values'].var():.2f}")
print(f"IQR: {df['values'].quantile(0.75) - df['values'].quantile(0.25):.2f}")

print("\nShape:")
print(f"Skewness: {df['values'].skew():.2f}")
print(f"Kurtosis: {df['values'].kurtosis():.2f}")
```

Key statistics: mean, median, mode, std, variance, range, quartiles, skewness, kurtosis.