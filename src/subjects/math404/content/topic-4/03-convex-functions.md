---
title: "Convex Functions"
description: "Definition, examples, and characterizations of convex functions"
---

# Convex Functions

## Definition

$f: \mathbb{R}^n \to \mathbb{R}$ is convex if $\forall x, y, \forall \theta \in [0,1]$:
$$f(\theta x + (1-\theta) y) \leq \theta f(x) + (1-\theta) f(y)$$

## First-Order Condition

$f$ differentiable is convex ⟺ $\forall x, y$:
$$f(y) \geq f(x) + \nabla f(x)^T (y - x)$$

## Second-Order Condition

$f$ twice differentiable is convex ⟺ $\nabla^2 f(x) \succeq 0$ $\forall x$

## Examples

- $x^2$, $e^x$, $-\log x$ (on $\mathbb{R}_{++}$)
- $\|x\|$ for any norm
- $\max\{x_1, \ldots, x_n\}$
- $\log(\sum_i e^{x_i})$

## Python Example

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 100)

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Convex: x^2
axes[0,0].plot(x, x**2)
axes[0,0].set_title('Convex: $f(x) = x^2$')

# Convex: e^x
axes[0,1].plot(x, np.exp(x))
axes[0,1].set_title('Convex: $f(x) = e^x$')

# Concave: log(x)
x_pos = np.linspace(0.1, 2, 100)
axes[1,0].plot(x_pos, np.log(x_pos))
axes[1,0].set_title('Concave: $f(x) = \\log(x)$')

# Neither: sin(x)
axes[1,1].plot(x, np.sin(x))
axes[1,1].set_title('Neither: $f(x) = \\sin(x)$')

for ax in axes.flat:
    ax.grid(True)

plt.tight_layout()
plt.show()
```
