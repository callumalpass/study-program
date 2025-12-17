---
title: "Data Normalization and Scaling"
description: "Techniques for normalizing and scaling data for analysis and machine learning"
---

# Data Normalization and Scaling

## Introduction

Normalization and scaling transform features to a common scale without distorting differences in ranges. This is crucial for algorithms sensitive to feature magnitudes like KNN, neural networks, and gradient descent-based methods.

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler, Normalizer

class ScalingTransformer:
    @staticmethod
    def min_max_scaling(data, feature_range=(0, 1)):
        scaler = MinMaxScaler(feature_range=feature_range)
        return scaler.fit_transform(data.values.reshape(-1, 1)).flatten(), scaler
    
    @staticmethod
    def standard_scaling(data):
        scaler = StandardScaler()
        return scaler.fit_transform(data.values.reshape(-1, 1)).flatten(), scaler
    
    @staticmethod
    def robust_scaling(data):
        scaler = RobustScaler()
        return scaler.fit_transform(data.values.reshape(-1, 1)).flatten(), scaler

np.random.seed(42)
data = pd.Series(np.random.exponential(scale=50, size=1000))

scaler = ScalingTransformer()

print("SCALING EXAMPLES")
print("="*60)
print(f"Original - Mean: {data.mean():.2f}, Std: {data.std():.2f}, Min: {data.min():.2f}, Max: {data.max():.2f}")

minmax_data, _ = scaler.min_max_scaling(data)
print(f"Min-Max - Mean: {minmax_data.mean():.2f}, Std: {minmax_data.std():.2f}, Min: {minmax_data.min():.2f}, Max: {minmax_data.max():.2f}")

std_data, _ = scaler.standard_scaling(data)
print(f"Standard - Mean: {std_data.mean():.2f}, Std: {std_data.std():.2f}")

robust_data, _ = scaler.robust_scaling(data)
print(f"Robust - Median: {np.median(robust_data):.2f}")
```

## Summary

- **Min-Max**: Scales to [0, 1] or custom range
- **Standard**: Zero mean, unit variance
- **Robust**: Uses median and IQR, resistant to outliers
- **Normalizer**: Scales individual samples to unit norm

Choose based on data distribution and algorithm requirements.
