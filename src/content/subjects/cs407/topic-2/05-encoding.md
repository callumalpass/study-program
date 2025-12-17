---
title: "Categorical Encoding"
description: "Methods for encoding categorical variables for machine learning"
---

# Categorical Encoding

## Introduction

Machine learning algorithms require numerical input. Encoding transforms categorical variables into numerical representations while preserving information and relationships.

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, OrdinalEncoder

class CategoricalEncoder:
    @staticmethod
    def label_encoding(data):
        encoder = LabelEncoder()
        return encoder.fit_transform(data), encoder
    
    @staticmethod
    def one_hot_encoding(data):
        encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
        return encoder.fit_transform(data.values.reshape(-1, 1)), encoder
    
    @staticmethod
    def target_encoding(data, target):
        target_means = data.groupby(data).apply(lambda x: target[x.index].mean())
        return data.map(target_means)

# Example
categories = pd.Series(['Red', 'Blue', 'Green', 'Red', 'Blue', 'Green', 'Red'])
target = pd.Series([1, 0, 1, 1, 0, 1, 0])

encoder = CategoricalEncoder()

label_encoded, _ = encoder.label_encoding(categories)
print("ENCODING EXAMPLES")
print("="*60)
print(f"Label Encoding: {label_encoded}")

one_hot, _ = encoder.one_hot_encoding(categories)
print(f"One-Hot Shape: {one_hot.shape}")
print(f"One-Hot Sample:\n{one_hot[:3]}")

target_encoded = encoder.target_encoding(categories, target)
print(f"Target Encoding: {target_encoded.values}")
```

## Summary

- **Label Encoding**: Assigns integers to categories
- **One-Hot Encoding**: Creates binary columns for each category
- **Ordinal Encoding**: For ordered categories
- **Target Encoding**: Uses target variable statistics
- **Frequency Encoding**: Based on category frequency

Choose based on cardinality, ordinality, and model type.
