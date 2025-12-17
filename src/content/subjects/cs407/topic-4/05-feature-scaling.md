---
title: "Feature Scaling"
description: "Scaling features for optimal model performance"
---

# Feature Scaling

Feature scaling ensures features contribute proportionally to distance-based algorithms.

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, MaxAbsScaler
import numpy as np

X = np.random.exponential(scale=50, size=(100, 3))

scalers = {
    'Standard': StandardScaler(),
    'MinMax': MinMaxScaler(),
    'Robust': RobustScaler(),
    'MaxAbs': MaxAbsScaler()
}

for name, scaler in scalers.items():
    X_scaled = scaler.fit_transform(X)
    print(f"{name}:")
    print(f"  Mean: {X_scaled.mean(axis=0)}")
    print(f"  Std: {X_scaled.std(axis=0)}")
    print(f"  Min: {X_scaled.min(axis=0)}")
    print(f"  Max: {X_scaled.max(axis=0)}")
    print()
```

Choose based on data distribution and algorithm requirements.