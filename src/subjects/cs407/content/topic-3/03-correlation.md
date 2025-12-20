---
title: "Correlation Analysis"
description: "Measuring and interpreting relationships between variables"
---

# Correlation Analysis

Correlation quantifies linear relationships between variables.

```python
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'A': np.random.randn(100),
    'B': np.random.randn(100)
})
df['C'] = df['A'] * 0.8 + np.random.randn(100) * 0.2

print("Correlation Matrix:")
print(df.corr())

print("\nPearson Correlation:")
print(f"A vs C: {df['A'].corr(df['C']):.3f}")

print("\nSpearman Correlation (rank-based):")
print(f"A vs C: {df['A'].corr(df['C'], method='spearman'):.3f}")
```

Methods: Pearson (linear), Spearman (monotonic), Kendall (concordance).