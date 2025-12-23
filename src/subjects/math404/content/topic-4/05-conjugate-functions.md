---
title: "Conjugate Functions"
description: "The Legendre-Fenchel transform and duality correspondence"
---

# Conjugate Functions

The **convex conjugate** (also known as the Fenchel conjugate or Legendre-Fenchel transform) is to convex optimization what the Fourier transform is to signal processing. It maps a function to a dual domain, encoding its convex hull in a new function. Understanding conjugate functions provides deep insight into duality theory and reveals beautiful mathematical structure underlying optimization.

## Definition

Let $f: \mathbb{R}^n \to \mathbb{R} \cup \{+\infty\}$. The conjugate function $f^*: \mathbb{R}^n \to \mathbb{R} \cup \{+\infty\}$ is defined as:

$$ f^*(y) = \sup_{x \in \textbf{dom} f} \left( y^T x - f(x) \right) $$

The conjugate transforms a function of $x$ into a function of the "slope" or "price" variable $y$.

### Geometric Interpretation

For a fixed slope $y$, $f^*(y)$ represents the maximum vertical distance between the linear function $y^T x$ and the function $f(x)$.

Alternatively, imagine looking for a supporting hyperplane with normal $(y, -1)$ that touches the graph of $f$ from below. The hyperplane has the form $z = y^T x - b$ for some intercept $b$. If this hyperplane supports $f$, then $f(x) \geq y^T x - b$ for all $x$, meaning $b \geq y^T x - f(x)$ for all $x$. The minimum such $b$ is exactly $f^*(y)$.

### Extended Reals

Note that $f^*$ can take the value $+\infty$ (if the supremum is unbounded) or $-\infty$ (if $f$ takes value $+\infty$ everywhere). We typically work with proper functions where $f(x) < +\infty$ for some $x$ and $f(x) > -\infty$ for all $x$.

## Properties

### 1. Convexity of the Conjugate

**Theorem:** $f^*$ is **always convex**, regardless of whether $f$ is convex.

*Proof:* $f^*(y)$ is the pointwise supremum of a family of affine functions of $y$:
$$f^*(y) = \sup_x g_x(y) \quad \text{where } g_x(y) = x^T y - f(x)$$
Each $g_x$ is affine (hence convex) in $y$. The pointwise supremum of convex functions is convex.

This is remarkable: even if $f$ is wild and non-convex, $f^*$ is always convex!

### 2. Fenchel's Inequality (Young's Inequality)

From the definition, for any $x$ and $y$:
$$ f(x) + f^*(y) \geq x^T y $$

This follows directly from $f^*(y) = \sup_z (y^T z - f(z)) \geq y^T x - f(x)$.

Fenchel's inequality is the source of the **Weak Duality** inequality in optimization! It provides a lower bound on primal values from dual values.

### 3. Fenchel's Equality

Equality holds in Fenchel's inequality if and only if:
$$ y \in \partial f(x) $$
where $\partial f(x)$ denotes the subdifferential of $f$ at $x$. For differentiable $f$, this means $y = \nabla f(x)$.

This characterizes when primal and dual solutions match — the condition for **Strong Duality**.

### 4. The Bi-conjugate

**Theorem:** If $f$ is convex and closed (lower semicontinuous), then $f^{**} = f$.

The bi-conjugate $f^{**}$ is defined as $(f^*)^*$. This means the conjugate is an invertible transformation on the space of closed convex proper functions.

If $f$ is not convex, $f^{**}$ is the **convex envelope** (or closed convex hull) of $f$ — the largest closed convex function that is less than or equal to $f$.

### 5. Domain of the Conjugate

The effective domain of $f^*$ is related to the slopes of supporting hyperplanes to $f$. If $f$ is coercive (grows unboundedly in all directions), then $\textbf{dom}(f^*) = \mathbb{R}^n$.

## Examples

### 1. Quadratic Function

Let $f(x) = \frac{1}{2} x^T Q x$ with $Q \succ 0$ (positive definite).

To find $f^*(y)$, maximize $y^T x - \frac{1}{2} x^T Q x$.

Take gradient w.r.t $x$ and set to zero: $y - Qx = 0 \implies x^* = Q^{-1} y$.

Substitute back:
$$f^*(y) = y^T (Q^{-1}y) - \frac{1}{2} (Q^{-1}y)^T Q (Q^{-1}y) = y^T Q^{-1} y - \frac{1}{2} y^T Q^{-1} y = \frac{1}{2} y^T Q^{-1} y$$

**Result:** The conjugate of a quadratic form is a quadratic form with the inverse matrix:
$$f(x) = \frac{1}{2} x^T Q x \quad \Longleftrightarrow \quad f^*(y) = \frac{1}{2} y^T Q^{-1} y$$

This is the optimization analog of the fact that Fourier transforms convert differentiation to multiplication.

### 2. Negative Entropy

Let $f(x) = x \log x$ for $x > 0$ (with $f(0) = 0$).

Maximize $yx - x \log x$ over $x > 0$.

Derivative: $y - (\log x + 1) = 0 \implies \log x = y - 1 \implies x^* = e^{y-1}$.

Substitute:
$$f^*(y) = y e^{y-1} - e^{y-1}(y-1) = e^{y-1}(y - y + 1) = e^{y-1}$$

**Result:** The conjugate of negative entropy is (a scaled) exponential:
$$f(x) = x \log x \quad \Longleftrightarrow \quad f^*(y) = e^{y-1}$$

This duality appears in maximum entropy problems and information theory.

### 3. Norm

Let $f(x) = \|x\|$ for any norm.

$f^*(y) = \sup_x (y^T x - \|x\|)$.

Case 1: If $\|y\|_* \leq 1$ (where $\|\cdot\|_*$ is the dual norm), then by definition of dual norm:
$$y^T x \leq \|y\|_* \|x\| \leq \|x\|$$
So $y^T x - \|x\| \leq 0$ for all $x$. The supremum is achieved at $x=0$, giving $f^*(y) = 0$.

Case 2: If $\|y\|_* > 1$, we can choose $x$ in the direction that maximizes $y^T x / \|x\|$. Scaling $x$ arbitrarily large makes $y^T x - \|x\| \to \infty$.

**Result:** $f^*(y)$ is the indicator function of the dual norm ball:
$$ f^*(y) = I_{\{z: \|z\|_* \leq 1\}}(y) = \begin{cases} 0 & \text{if } \|y\|_* \leq 1 \\ +\infty & \text{otherwise} \end{cases} $$

This duality between norms and indicator functions is fundamental in compressed sensing and sparse optimization.

### 4. Indicator Function

Let $f = I_C$ be the indicator function of a convex set $C$:
$$I_C(x) = \begin{cases} 0 & x \in C \\ +\infty & x \notin C \end{cases}$$

Then $f^*(y) = \sup_{x \in C} y^T x$, which is the **support function** of $C$.

The support function describes the "extent" of $C$ in direction $y$.

## Application to Duality

Lagrange duality can be derived entirely using conjugate functions.

### General Framework

Consider: $\min_x f(x) \text{ subject to } Ax = b$.

Rewrite using indicator function: $\min_x f(x) + I_{\{b\}}(Ax)$.

The dual problem involves:
$$\max_\nu \{-f^*(-A^T \nu) + b^T \nu\}$$

The conjugate function machinery systematically produces the dual for any convex problem.

### Why This Matters

This approach allows derivation of duals for non-linear problems where simplex tableaux don't apply:
- **Entropy maximization:** The dual involves exponentials
- **Logistic regression:** The dual involves log-sums
- **Quadratic programs:** The dual involves inverse quadratic forms

### Fenchel Duality

A general framework: Given convex $f$ and $g$, consider:
$$\min_x f(x) + g(Ax)$$

The Fenchel dual is:
$$\max_y -f^*(-A^T y) - g^*(y)$$

Under constraint qualifications, strong duality holds.

## Common Mistakes

1. **Forgetting the supremum can be infinite:** The conjugate may equal $+\infty$ for some arguments.

2. **Confusing conjugate with inverse:** $f^*$ is not the inverse function $f^{-1}$; it's a different transformation.

3. **Applying bi-conjugate incorrectly:** $f^{**} = f$ only for closed convex functions. Otherwise, $f^{**}$ is the convex envelope.

4. **Sign errors in duality:** Be careful about whether you're minimizing or maximizing, and the signs in Fenchel's inequality.

## Key Takeaways

- The conjugate $f^*(y) = \sup_x (y^T x - f(x))$ is always convex.
- Fenchel's inequality $f(x) + f^*(y) \geq x^T y$ is the basis of weak duality.
- For closed convex functions, $f^{**} = f$ (bi-conjugate theorem).
- Conjugates of quadratics involve matrix inverses; conjugates of norms are indicator functions.
- Conjugate functions provide a systematic way to derive Lagrangian duals.
