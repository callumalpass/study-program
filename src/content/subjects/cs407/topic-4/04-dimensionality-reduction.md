---
title: "Dimensionality Reduction"
description: "Reducing feature space while preserving information"
---

# Dimensionality Reduction

Dimensionality reduction combats curse of dimensionality by reducing feature count.

```python
from sklearn.decomposition import PCA, TruncatedSVD
from sklearn.random_projection import GaussianRandomProjection
import numpy as np

X = np.random.randn(1000, 100)

# PCA
pca = PCA(n_components=0.95)  # Retain 95% variance
X_pca = pca.fit_transform(X)
print(f"PCA: {X.shape[1]} -> {X_pca.shape[1]} features")

# Truncated SVD
svd = TruncatedSVD(n_components=20)
X_svd = svd.fit_transform(X)
print(f"SVD explained variance: {svd.explained_variance_ratio_.sum():.3f}")

# Random Projection
rp = GaussianRandomProjection(n_components=20)
X_rp = rp.fit_transform(X)
print(f"Random Projection: {X.shape[1]} -> {X_rp.shape[1]} features")
```

Methods: PCA, SVD, random projection, autoencoders, feature selection.