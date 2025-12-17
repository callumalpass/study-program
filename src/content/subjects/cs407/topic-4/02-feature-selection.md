---
title: "Feature Selection"
description: "Methods for selecting relevant features"
---

# Feature Selection

Feature selection identifies and retains the most useful features while removing redundant or irrelevant ones.

```python
from sklearn.feature_selection import SelectKBest, f_classif, RFE
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import pandas as pd

X = pd.DataFrame(np.random.randn(100, 10), columns=[f'f{i}' for i in range(10)])
y = np.random.choice([0, 1], 100)

# Univariate selection
selector = SelectKBest(f_classif, k=5)
X_selected = selector.fit_transform(X, y)
selected_features = X.columns[selector.get_support()].tolist()
print(f"Selected by univariate: {selected_features}")

# Recursive Feature Elimination
rfe = RFE(RandomForestClassifier(n_estimators=10, random_state=42), n_features_to_select=5)
rfe.fit(X, y)
rfe_features = X.columns[rfe.support_].tolist()
print(f"Selected by RFE: {rfe_features}")

# Feature importance
rf = RandomForestClassifier(n_estimators=10, random_state=42)
rf.fit(X, y)
importance = pd.DataFrame({'feature': X.columns, 'importance': rf.feature_importances_})
print("\nFeature Importance:")
print(importance.sort_values('importance', ascending=False))
```

Methods: filter (statistical), wrapper (RFE), embedded (L1/L2), importance-based.