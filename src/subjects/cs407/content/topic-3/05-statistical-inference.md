---
title: "Statistical Inference"
description: "Drawing conclusions from data using statistical methods"
---

# Statistical Inference

Statistical inference makes predictions and decisions about populations from samples.

```python
import numpy as np
from scipy import stats

sample = np.random.normal(100, 15, 100)

# Confidence interval
confidence = 0.95
mean = sample.mean()
sem = stats.sem(sample)
ci = stats.t.interval(confidence, len(sample)-1, mean, sem)

print(f"95% CI: [{ci[0]:.2f}, {ci[1]:.2f}]")
print(f"Sample mean: {mean:.2f}")

# Bootstrap confidence interval
bootstrap_means = [np.random.choice(sample, size=len(sample), replace=True).mean() for _ in range(1000)]
bootstrap_ci = np.percentile(bootstrap_means, [2.5, 97.5])
print(f"Bootstrap CI: [{bootstrap_ci[0]:.2f}, {bootstrap_ci[1]:.2f}]")
```

Methods: confidence intervals, hypothesis testing, bootstrap, Bayesian inference.