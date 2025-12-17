---
title: "Data Distributions"
description: "Understanding and analyzing data distributions"
---

# Data Distributions

Distributions describe how data values are spread across the range.

```python
import pandas as pd
import numpy as np
from scipy import stats

normal_data = np.random.normal(100, 15, 1000)
uniform_data = np.random.uniform(0, 100, 1000)
exponential_data = np.random.exponential(2, 1000)

print("Distribution Tests:")
print(f"Normal - Shapiro p-value: {stats.shapiro(normal_data)[1]:.4f}")
print(f"Uniform - Shapiro p-value: {stats.shapiro(uniform_data)[1]:.4f}")
print(f"Exponential - Shapiro p-value: {stats.shapiro(exponential_data)[1]:.4f}")

# KS test
ks_stat, ks_p = stats.kstest(normal_data, 'norm', args=(normal_data.mean(), normal_data.std()))
print(f"\nKS test for normality: p-value={ks_p:.4f}")
```

Common distributions: normal, uniform, exponential, binomial, poisson.