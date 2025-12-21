---
title: "Convergence Analysis"
description: "Theoretical bounds on optimization algorithms"
---

# Convergence Analysis

Convergence analysis answers two fundamental questions:
1.  **Will** the algorithm converge to the optimal solution?
2.  **How fast** will it get there?

Understanding these rates allows us to compare algorithms (e.g., Gradient Descent vs. Newton's Method) rigorously.

## Types of Convergence Rates

Let $e_k = \|x^{(k)} - x^*\|$ or $e_k = f(x^{(k)}) - f^*$ be the error at step $k$.

### 1. Sublinear Convergence ($O(1/k)$)
$$ e_k \leq \frac{C}{k^p} $$
Error decreases like $1/k$ or $1/\sqrt{k}$.
- **Slow.** To gain one digit of accuracy (reduce error by 10), you need 10x more iterations.
- Typical of: Gradient Descent on general convex functions, Stochastic Gradient Descent.

### 2. Linear Convergence ($O(c^k)$)
Also called "Geometric Convergence".
$$ e_{k+1} \leq c \cdot e_k \quad \text{for } c \in (0, 1) $$
$$ e_k \leq C \cdot c^k $$
- **Fast.** The error decreases by a constant factor every step. On a log-plot, it's a straight line.
- To gain one digit of accuracy, you need a constant number of iterations.
- Typical of: Gradient Descent on strongly convex functions.

### 3. Superlinear Convergence
$$ \lim_{k \to \infty} \frac{e_{k+1}}{e_k} = 0 $$
Faster than any geometric progression.
- Typical of: Quasi-Newton methods (BFGS).

### 4. Quadratic Convergence
$$ e_{k+1} \leq C \cdot e_k^2 $$
The number of accurate digits **doubles** every iteration.
- **Extremely Fast.** Once close to the solution, it finishes instantly.
- Example: Error sequence $10^{-1}, 10^{-2}, 10^{-4}, 10^{-8}, 10^{-16}$.
- Typical of: Newton's Method.

## Assumptions

To prove these rates, we need assumptions on the function $f$.

1.  **Lipschitz Continuity ($L$-smooth):**
The gradient doesn't change too fast. Upper bound on curvature (Hessian).
$$ \|
abla f(x) - 
abla f(y)\| \leq L \|x - y\| $$
Implies: $\nabla^2 f(x) \preceq L I$.
Allows us to ensure we don't overshoot.

2.  **Strong Convexity ($m$-strongly convex):**
The function curves up at least as much as a quadratic. Lower bound on curvature.
$$ f(y) \geq f(x) + 
abla f(x)^T(y-x) + \frac{m}{2}\|y-x\|^2 $$
Implies: $\nabla^2 f(x) \succeq m I$.
Ensures $x^*$ is a strict minimum and gradients are large far away.

3.  **Condition Number ($\kappa$):**
The ratio of largest to smallest curvature: $\kappa = L/m$.
Measures how "elliptical" the level sets are.
$\\kappa = 1 \implies$ Circular (Perfect).
$\\kappa \to \infty \implies$ Flat valley (Bad).

## Convergence of Gradient Descent

### 1. General Convex ($L$-smooth)
With step size $\alpha = 1/L$:
$$ f(x^{(k)}) - f^* \leq \frac{2L \|x^{(0)} - x^*\|^2}{k+4} $$
Rate: **$O(1/k)$**.

### 2. Strongly Convex ($m$-strongly convex, $L$-smooth)
With optimal step size $\alpha = 2/(m+L)$:
$$ \|x^{(k)} - x^*\| \leq \left( \frac{\kappa - 1}{\kappa + 1} \right)^k \|x^{(0)} - x^*\| $$
Rate: **Linear** with constant $c = \frac{\kappa - 1}{\kappa + 1}$.

**Impact of Condition Number:**
- If $\\kappa = 1$ (Sphere): Rate is 0. Converges in 1 step.
- If $\\kappa = 100$: Rate is $99/101 \approx 0.98$. Error reduces by 2% per step. Need $\approx 115$ steps for 10x reduction.
- If $\\kappa = 1,000,000$: Rate $\approx 0.999998$. Extremely slow.

## Acceleration (Nesterov)

Nesterov asked: "Is $O(1/k)$ the best possible for first-order methods?"
Answer: No. The theoretical lower bound is $O(1/k^2)$.

He constructed an algorithm (**Nesterov Accelerated Gradient**) that achieves this optimal rate:
$$ f(x^{(k)}) - f^* \leq \frac{C}{k^2} $$
And for strongly convex:
$$ c \approx 1 - \frac{1}{\sqrt{\kappa}} $$
This is a huge improvement. $\\sqrt{1,000,000} = 1,000$. Speedup factor of 1,000!

## Convergence of Newton's Method

Newton's method uses Hessian information.
Assumption: Hessian is Lipschitz continuous.
Rate: **Quadratic.**
$$ \|x^{(k+1)} - x^*\| \leq C \|x^{(k)} - x^*\|^2 $$
But this only holds locally (once near $x^*$).
And per-iteration cost is $O(n^3)$ (matrix inversion).

## Summary Table

| Method | Assumptions | Convergence Rate | Complexity |
| :--- | :--- | :--- | :--- |
| Gradient Descent | Convex, Smooth | $O(1/k)$ | $O(n)$ |
| Gradient Descent | Strongly Convex | $O((1 - 1/\kappa)^k)$ | $O(n)$ |
| Accelerated GD | Strongly Convex | $O((1 - 1/\sqrt{\kappa})^k)$ | $O(n)$ |
| Newton's Method | Smooth Hessian | Quadratic | $O(n^3)$ |