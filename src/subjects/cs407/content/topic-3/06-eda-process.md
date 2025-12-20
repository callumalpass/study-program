---
title: "EDA Process"
description: "Systematic approach to exploratory data analysis"
---

# EDA Process

EDA is iterative data investigation to discover patterns, anomalies, and insights.

```python
import pandas as pd
import numpy as np

def perform_eda(df):
    print("1. Data Overview")
    print(f"   Shape: {df.shape}")
    print(f"   Columns: {list(df.columns)}")
    
    print("\n2. Data Types")
    print(df.dtypes)
    
    print("\n3. Missing Values")
    print(df.isnull().sum())
    
    print("\n4. Summary Statistics")
    print(df.describe())
    
    print("\n5. Unique Values")
    for col in df.columns:
        print(f"   {col}: {df[col].nunique()} unique")
    
    print("\n6. Correlations")
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 1:
        print(df[numeric_cols].corr())

# Example
df = pd.DataFrame({
    'A': np.random.randn(100),
    'B': np.random.choice(['X', 'Y', 'Z'], 100),
    'C': np.random.uniform(0, 100, 100)
})

perform_eda(df)
```

Steps: overview, types, missing, statistics, distributions, correlations, outliers.