---
title: "Separation Theorems"
description: "Separating hyperplanes for convex sets"
---

# Separation Theorems

## Separating Hyperplane Theorem

If $C, D$ disjoint convex sets, there exists $a \neq 0, b$ such that:
$$a^T x \leq b \leq a^T y \quad \forall x \in C, y \in D$$

## Supporting Hyperplane

At boundary point $x_0 \in \partial C$, there exists supporting hyperplane:
$$a^T x \leq a^T x_0 \quad \forall x \in C$$

## Applications

- Optimality conditions
- Duality theory
- Subdifferentials

## Python Example

```python
import numpy as np
import matplotlib.pyplot as plt

# Two disjoint convex sets
C = np.array([[0, 0], [1, 0], [0.5, 1]])  # Triangle
D_center = np.array([3, 2])
D_radius = 0.5

# Separating hyperplane (found analytically)
a = np.array([1, 0.5])
b = 2

plt.figure(figsize=(8, 6))
plt.fill(C[:, 0], C[:, 1], alpha=0.3, label='Set C')
circle = plt.Circle(D_center, D_radius, alpha=0.3, label='Set D')
plt.gca().add_patch(circle)

# Plot separating hyperplane
x_vals = np.linspace(-1, 4, 100)
y_vals = (b - a[0]*x_vals) / a[1]
plt.plot(x_vals, y_vals, 'k--', label='Separating Hyperplane')
plt.xlim(-1, 4)
plt.ylim(-1, 3)
plt.legend()
plt.title('Separating Hyperplane')
plt.show()
```
