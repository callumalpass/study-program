---
title: "Conjugate Functions"
description: "The Fenchel conjugate and its properties"
---

# Conjugate Functions

## Definition

Conjugate of $f$: 
$$f^*(y) = \sup_x (y^T x - f(x))$$

## Properties

- $f^*$ always convex (even if $f$ not convex)
- $f^{**} = f$ if $f$ convex and closed
- Young's inequality: $y^T x \leq f(x) + f^*(y)$

## Examples

- $f(x) = \frac{1}{2}x^T Q x$ → $f^*(y) = \frac{1}{2}y^T Q^{-1} y$
- $f(x) = \|x\|$ → $f^*(y) = I_{\|y\|_* \leq 1}$ (indicator of dual norm ball)
- $f(x) = e^x$ → $f^*(y) = y\log y - y$ (on $y > 0$)

## Python Example

```python
import numpy as np
import matplotlib.pyplot as plt

# f(x) = x^2/2
x = np.linspace(-3, 3, 100)
f = x**2 / 2

# f*(y) = y^2/2
y = np.linspace(-3, 3, 100)
f_conj = y**2 / 2

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(x, f)
axes[0].set_title('$f(x) = x^2/2$')
axes[1].plot(y, f_conj)
axes[1].set_title('$f^*(y) = y^2/2$')
plt.show()
```
