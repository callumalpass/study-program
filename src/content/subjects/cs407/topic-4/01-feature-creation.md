---
title: "Feature Creation"
description: "Creating new features from existing data"
---

# Feature Creation

Feature creation generates new variables from existing ones to improve model performance.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=100),
    'value1': np.random.randn(100),
    'value2': np.random.randn(100)
})

# Temporal features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

# Mathematical features
df['ratio'] = df['value1'] / (df['value2'] + 1e-10)
df['product'] = df['value1'] * df['value2']
df['diff'] = df['value1'] - df['value2']

# Polynomial features
df['value1_squared'] = df['value1'] ** 2
df['value1_cubed'] = df['value1'] ** 3

print("Created Features:")
print(df.head())
```

Techniques: temporal extraction, mathematical combinations, polynomial, domain-specific.