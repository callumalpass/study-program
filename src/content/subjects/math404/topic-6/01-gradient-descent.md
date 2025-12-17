---
title: "Gradient-Based Optimization"
description: "Iterative first-order and second-order methods"
---

# Gradient Methods

## Algorithm

$$x^{k+1} = x^k - \alpha_k \nabla f(x^k)$$

## Convergence

- Convex: $O(1/k)$
- Strongly convex: $O(\rho^k)$, $\rho < 1$

## Python

```python
import numpy as np

def gradient_descent(grad_f, x0, alpha=0.01, max_iter=1000):
    x = x0
    for k in range(max_iter):
        x = x - alpha * grad_f(x)
    return x
```
