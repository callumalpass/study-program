---
title: "Hypothesis Testing"
description: "Statistical hypothesis testing for data analysis"
---

# Hypothesis Testing

Hypothesis testing evaluates claims about populations using sample data.

```python
from scipy import stats
import numpy as np

group1 = np.random.normal(100, 15, 50)
group2 = np.random.normal(105, 15, 50)

# T-test
t_stat, p_value = stats.ttest_ind(group1, group2)
print(f"T-test: t={t_stat:.3f}, p={p_value:.4f}")

# Chi-square test
observed = np.array([[10, 20], [15, 25]])
chi2, p, dof, expected = stats.chi2_contingency(observed)
print(f"\nChi-square: χ²={chi2:.3f}, p={p:.4f}")

# ANOVA
group3 = np.random.normal(110, 15, 50)
f_stat, p_value = stats.f_oneway(group1, group2, group3)
print(f"\nANOVA: F={f_stat:.3f}, p={p_value:.4f}")
```

Common tests: t-test, chi-square, ANOVA, Kolmogorov-Smirnov.