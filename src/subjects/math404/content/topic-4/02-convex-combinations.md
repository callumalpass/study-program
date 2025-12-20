---
title: "Convex Combinations and Hulls"
description: "Convex combinations, convex hulls, and Carathéodory's theorem"
---

# Convex Combinations and Hulls

## Convex Combination

Points $x_1, \ldots, x_k$ with weights $\theta_1, \ldots, \theta_k \geq 0$, $\sum \theta_i = 1$:
$$x = \sum_{i=1}^k \theta_i x_i$$

## Convex Hull

$\text{conv}(S) = \{$all convex combinations of points in $S\}$

**Properties**:
- Smallest convex set containing $S$
- $\text{conv}(S) = \cap \{C : C \supseteq S, C \text{ convex}\}$

## Carathéodory's Theorem

Any point in $\text{conv}(S) \subset \mathbb{R}^n$ can be expressed as convex combination of at most $n+1$ points from $S$.

## Python Example

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial import ConvexHull

# Random points
np.random.seed(42)
points = np.random.randn(10, 2)

# Compute convex hull
hull = ConvexHull(points)

plt.figure(figsize=(8, 6))
plt.plot(points[:, 0], points[:, 1], 'o')
for simplex in hull.simplices:
    plt.plot(points[simplex, 0], points[simplex, 1], 'k-')
plt.fill(points[hull.vertices, 0], points[hull.vertices, 1], alpha=0.3)
plt.title('Convex Hull')
plt.show()
```
