---
title: "Sublevel Sets and Epigraphs"
description: "Sublevel sets, epigraphs, and their relationship to convexity"
---

# Sublevel Sets and Epigraphs

## Sublevel Set

$$\mathcal{S}_\alpha = \{x : f(x) \leq \alpha\}$$

**Theorem**: If $f$ convex, all sublevel sets convex

(Converse false!)

## Epigraph

$$\text{epi}(f) = \{(x, t) : f(x) \leq t\}$$

**Theorem**: $f$ convex ⟺ $\text{epi}(f)$ convex

## Hypograph

$$\text{hypo}(f) = \{(x, t) : f(x) \geq t\}$$

$f$ concave ⟺ $\text{hypo}(f)$ convex

## Python Visualization

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

x1 = np.linspace(-2, 2, 50)
x2 = np.linspace(-2, 2, 50)
X1, X2 = np.meshgrid(x1, x2)
Z = X1**2 + X2**2

fig = plt.figure(figsize=(12, 5))

# Epigraph
ax = fig.add_subplot(121, projection='3d')
ax.plot_surface(X1, X2, Z, alpha=0.7)
ax.set_title('Epigraph of $f(x) = x_1^2 + x_2^2$')

# Sublevel sets
ax2 = fig.add_subplot(122)
levels = [0.5, 1, 2, 4]
ax2.contour(X1, X2, Z, levels=levels)
ax2.set_title('Sublevel Sets')
plt.show()
```
