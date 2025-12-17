---
title: "Operations Preserving Convexity"
description: "Composition, pointwise maximum, and other operations that preserve convexity"
---

# Operations Preserving Convexity

## Nonnegative Weighted Sum

If $f_1, \ldots, f_m$ convex and $w_i \geq 0$:
$$f = \sum_{i=1}^m w_i f_i \text{ is convex}$$

## Composition Rules

- $f$ convex, $g$ affine: $f \circ g$ convex
- $f$ convex increasing, $g$ convex: $f \circ g$ convex
- $f$ convex decreasing, $g$ concave: $f \circ g$ convex

## Pointwise Maximum

$f(x) = \max_i f_i(x)$ convex if each $f_i$ convex

## Pointwise Supremum

$g(x) = \sup_{y \in \mathcal{A}} f(x, y)$ convex in $x$ if $f(x, y)$ convex in $x$ for each $y$

## Examples

```python
import numpy as np
import cvxpy as cp

x = cp.Variable()

# Nonnegative weighted sum
f = 3*cp.square(x) + 2*cp.abs(x)  # Convex

# Pointwise max
f = cp.maximum(x, 2*x - 1, -x + 2)  # Convex

# Composition
f = cp.exp(cp.square(x))  # Convex (exp increasing, x^2 convex)
```
