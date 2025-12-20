---
title: "Data Cleaning Pipelines"
description: "Building automated data cleaning and transformation pipelines"
---

# Data Cleaning Pipelines

## Introduction

Data pipelines automate the cleaning process, ensuring consistency and reproducibility. They chain transformations, handle errors, and maintain data quality through standardized workflows.

```python
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

class DataCleaningPipeline:
    def __init__(self):
        self.steps = []
    
    def add_step(self, name, func):
        self.steps.append((name, func))
    
    def execute(self, df):
        result = df.copy()
        for step_name, step_func in self.steps:
            print(f"Executing: {step_name}")
            result = step_func(result)
        return result

# Define cleaning functions
def remove_duplicates(df):
    return df.drop_duplicates()

def handle_missing(df):
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())
    return df

def remove_outliers(df):
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        df = df[(df[col] >= Q1 - 1.5*IQR) & (df[col] <= Q3 + 1.5*IQR)]
    return df

# Build pipeline
pipeline = DataCleaningPipeline()
pipeline.add_step("Remove Duplicates", remove_duplicates)
pipeline.add_step("Handle Missing Values", handle_missing)
pipeline.add_step("Remove Outliers", remove_outliers)

# Example data
sample_df = pd.DataFrame({
    'A': [1, 2, 2, 4, 100, None, 7],
    'B': [10, 20, 20, 40, 50, 60, 70]
})

print("DATA CLEANING PIPELINE")
print("="*60)
print(f"Original shape: {sample_df.shape}")
cleaned_df = pipeline.execute(sample_df)
print(f"Cleaned shape: {cleaned_df.shape}")
```

## Summary

Effective pipelines include:
- Modular steps
- Error handling
- Logging and monitoring
- Version control
- Reproducibility
- Scalability

Build reusable pipelines for consistent data quality.
