---
title: "Feature Extraction"
description: "Extracting features through transformation and decomposition"
---

# Feature Extraction

Feature extraction transforms high-dimensional data into lower dimensions while preserving information.

```python
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import numpy as np
import pandas as pd

X = np.random.randn(100, 20)

# PCA
pca = PCA(n_components=5)
X_pca = pca.fit_transform(X)
print(f"PCA explained variance: {pca.explained_variance_ratio_.sum():.3f}")
print(f"PCA shape: {X.shape} -> {X_pca.shape}")

# t-SNE (for visualization)
tsne = TSNE(n_components=2, random_state=42)
X_tsne = tsne.fit_transform(X)
print(f"t-SNE shape: {X.shape} -> {X_tsne.shape}")
```

Methods: PCA, t-SNE, autoencoders, NMF, factor analysis.