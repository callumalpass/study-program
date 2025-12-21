---
title: "Conjugate Functions"
description: "The Legendre-Fenchel transform and duality correspondence"
---

# Conjugate Functions

The **convex conjugate** (also known as the Fenchel conjugate or Legendre-Fenchel transform) is to convex optimization what the Fourier transform is to signal processing. It maps a function to a dual domain, encoding its convex hull in a new function.

## Definition

Let $f: \mathbb{R}^n \to \mathbb{R}$. The conjugate function $f^*: \mathbb{R}^n \to \mathbb{R}$ is defined as:

$$ f^*(y) = \sup_{x \in \textbf{dom} f} \left( y^T x - f(x) \right) $$

**Geometric Interpretation:**
For a fixed slope $y$, $f^*(y)$ represents the maximum vertical distance between the linear function $y^T x$ and the function $f(x)$.
Alternatively, imagine looking for a supporting hyperplane with normal $(y, -1)$ that touches the graph of $f$. $f^*(y)$ relates to the intercept of that hyperplane.

## Properties

1.  **Convexity:** $f^*$ is **always convex**, regardless of whether $f$ is convex.
    *Proof:* $f^*(y)$ is the pointwise supremum of a family of affine functions of $y$ (specifically $g_x(y) = x^T y - f(x)$). The pointwise max of convex functions is convex.
2.  **Fenchel's Inequality:** From the definition, for any $x, y$:
    $$ f(x) + f^*(y) \geq x^T y $$
    (This is the source of the Weak Duality inequality!)
3.  **Bi-conjugate:** If $f$ is convex and closed (epigraph is closed), then $f^{**} = f$.
    This means the conjugate is an invertible transformation on the space of closed convex functions.
    If $f$ is not convex, $f^{**}$ is the **convex envelope** of $f$ (the largest convex function $\leq f$).

## Examples

### 1. Quadratic Function
Let $f(x) = \frac{1}{2} x^T Q x$ with $Q \succ 0$.
Maximize $y^T x - \frac{1}{2} x^T Q x$.
Take gradient w.r.t $x$: $y - Qx = 0 \implies x = Q^{-1} y$.
Substitute back:
$f^*(y) = y^T (Q^{-1}y) - \frac{1}{2} (Q^{-1}y)^T Q (Q^{-1}y)$
$= y^T Q^{-1} y - \frac{1}{2} y^T Q^{-1} y = \frac{1}{2} y^T Q^{-1} y$.

**Result:** The conjugate of a quadratic form is a quadratic form with the inverse matrix.


### 2. Negative Entropy
$f(x) = x \log x$ for $x > 0$.
Maximize $yx - x \log x$.
Derivative: $y - (\log x + 1) = 0 \implies \log x = y - 1 \implies x = e^{y-1}$.
Substitute:
$f^*(y) = y e^{y-1} - e^{y-1}(y-1) = e^{y-1} (y - y + 1) = e^{y-1}$.

**Result:** Conjugate of $x \log x$ is $e^{y-1}$.


### 3. Norm
$f(x) = \|x\|$.
$f^*(y) = \sup_x (y^T x - \|x\|)$.
- If $\|y\|_* \leq 1$ (dual norm $\leq 1$), then $y^T x \leq \|y\|_* \|x\| \leq \|x\|$, so $y^T x - \|x\| \leq 0$. The sup is achieved at $x=0$, value 0.
- If $\|y\|_* > 1$, we can choose $x$ in direction of $y$ with large magnitude to make expression $\to \infty$.

**Result:** $f^*(y)$ is the indicator function of the dual norm ball.
$$ f^*(y) = \begin{cases} 0 & \text{if } \|y\|_* \leq 1 \\ \infty & \text{otherwise} \end{cases} $$

## Application to Duality

Lagrange duality can be derived entirely using conjugate functions.

Primal: $\min f(x) \text{ s.t. } Ax = b$.
Rewrite as $\min f(x) + I_{\{b\}}(Ax)$.
Dual involves $f^*(-A^T \nu) + b^T \nu$.

This machinery allows derivation of duals for non-linear problems (Entropy maximization, Logistic regression, etc.) where simplex tableaux don't apply.