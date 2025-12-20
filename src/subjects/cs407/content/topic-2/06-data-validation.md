---
title: "Data Validation"
description: "Techniques for validating data quality and integrity"
---

# Data Validation

## Introduction

Data validation ensures data meets quality standards and business rules before analysis. It involves checking data types, ranges, formats, relationships, and consistency.

```python
import pandas as pd
import numpy as np
import re

class DataValidator:
    def __init__(self, df):
        self.df = df
        self.validation_errors = []
    
    def validate_data_types(self, type_specs):
        for column, expected_type in type_specs.items():
            if column in self.df.columns:
                if self.df[column].dtype != expected_type:
                    self.validation_errors.append(f"{column}: expected {expected_type}, got {self.df[column].dtype}")
    
    def validate_ranges(self, range_specs):
        for column, (min_val, max_val) in range_specs.items():
            if column in self.df.columns:
                invalid = (self.df[column] < min_val) | (self.df[column] > max_val)
                if invalid.any():
                    self.validation_errors.append(f"{column}: {invalid.sum()} values outside [{min_val}, {max_val}]")
    
    def validate_regex(self, regex_specs):
        for column, pattern in regex_specs.items():
            if column in self.df.columns:
                invalid = ~self.df[column].astype(str).str.match(pattern, na=False)
                if invalid.any():
                    self.validation_errors.append(f"{column}: {invalid.sum()} values don't match pattern {pattern}")
    
    def get_report(self):
        if not self.validation_errors:
            return "All validation checks passed!"
        return "\n".join(self.validation_errors)

# Example
sample_df = pd.DataFrame({
    'age': [25, 30, 150, -5, 42],
    'email': ['a@b.com', 'invalid', 'c@d.com', 'e@f.com', 'bad'],
    'score': [85, 92, 78, 105, 88]
})

validator = DataValidator(sample_df)
validator.validate_ranges({'age': (0, 120), 'score': (0, 100)})
validator.validate_regex({'email': r'^[\w\.-]+@[\w\.-]+\.\w+$'})

print("VALIDATION RESULTS")
print("="*60)
print(validator.get_report())
```

## Summary

Validation ensures data quality through:
- Type checking
- Range validation
- Format validation (regex)
- Business rule validation
- Referential integrity
- Completeness checks

Implement validation early in pipelines to catch errors before analysis.
