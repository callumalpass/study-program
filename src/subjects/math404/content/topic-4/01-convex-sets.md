---
title: "Convex Sets"
description: "Properties, operations, and examples of convex sets"
---

# Convex Sets

## Definition

Set $C$ is convex if $\forall x, y \in C$, $\forall \theta \in [0,1]$:
$$\theta x + (1-\theta) y \in C$$

## Important Examples

1. **Hyperplane**: $\{x : a^T x = b\}$
2. **Halfspace**: $\{x : a^T x \leq b\}$
3. **Euclidean ball**: $\{x : \|x - x_c\| \leq r\}$
4. **Ellipsoid**: $\{x : (x-x_c)^T P^{-1} (x-x_c) \leq 1\}$, $P \succ 0$
5. **Norm ball**: $\{x : \|x\| \leq r\}$ for any norm
6. **Polyhedron**: $\{x : Ax \leq b\}$
7. **PSD cone**: $\{X : X \succeq 0\}$

## Operations Preserving Convexity

- **Intersection**: $\cap_i C_i$ convex if each $C_i$ convex
- **Affine transformation**: $f(C) = \{Ax + b : x \in C\}$
- **Cartesian product**: $C_1 \times C_2$

## Python Examples

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Polygon

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Euclidean ball
ax = axes[0]
circle = Circle((0, 0), 1, fill=True, alpha=0.3, color='blue')
ax.add_patch(circle)
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.set_title('Euclidean Ball')
ax.grid(True)

# Polyhedron
ax = axes[1]
poly = Polygon([[0,0], [1,0], [1,1], [0,1]], fill=True, alpha=0.3, color='green')
ax.add_patch(poly)
ax.set_xlim(-0.5, 1.5)
ax.set_ylim(-0.5, 1.5)
ax.set_aspect('equal')
ax.set_title('Polyhedron')
ax.grid(True)

# Non-convex (L-shape)
ax = axes[2]
l_shape = Polygon([[0,0], [1,0], [1,0.5], [0.5,0.5], [0.5,1], [0,1]], 
                   fill=True, alpha=0.3, color='red')
ax.add_patch(l_shape)
ax.set_xlim(-0.2, 1.2)
ax.set_ylim(-0.2, 1.2)
ax.set_aspect('equal')
ax.set_title('Non-Convex (L-shape)')
ax.grid(True)

plt.tight_layout()
plt.show()
```
