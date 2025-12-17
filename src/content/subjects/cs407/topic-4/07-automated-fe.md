---
title: "Automated Feature Engineering"
description: "Automated approaches to feature engineering"
---

# Automated Feature Engineering

Automated FE tools generate and select features algorithmically.

```python
# Conceptual examples (libraries like featuretools)
import pandas as pd
import numpy as np

# Manual automation example
def auto_generate_features(df, numeric_cols):
    new_features = {}
    
    # Pairwise interactions
    for i, col1 in enumerate(numeric_cols):
        for col2 in numeric_cols[i+1:]:
            new_features[f'{col1}_times_{col2}'] = df[col1] * df[col2]
            new_features[f'{col1}_div_{col2}'] = df[col1] / (df[col2] + 1e-10)
    
    return pd.DataFrame(new_features)

df = pd.DataFrame({
    'A': np.random.randn(100),
    'B': np.random.randn(100),
    'C': np.random.randn(100)
})

new_features = auto_generate_features(df, ['A', 'B', 'C'])
print(f"Generated {len(new_features.columns)} features")
print(new_features.head())
```

Tools: featuretools, tsfresh, auto-sklearn, feature engineering frameworks.