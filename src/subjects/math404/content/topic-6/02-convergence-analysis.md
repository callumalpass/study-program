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

The following plot illustrates the different convergence rates on a log scale:

```plot
{
  "xAxis": { "domain": [0, 50], "label": "Iteration k" },
  "yAxis": { "domain": [0.0001, 100], "label": "Error" },
  "data": [
    { "fn": "10/x", "color": "#dc2626", "title": "Sublinear O(1/k)" },
    { "fn": "10*0.9^x", "color": "#16a34a", "title": "Linear O(0.9^k)" },
    { "fn": "10*0.7^x", "color": "#2563eb", "title": "Fast Linear O(0.7^k)" }
  ]
}
```

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

## Proof Sketch: Gradient Descent Convergence (Smooth Convex)

Let's prove the $O(1/k)$ rate for gradient descent on $L$-smooth convex functions.

**Setup:** $f$ is convex and $L$-smooth. We use step size $\alpha = 1/L$.

**Key Inequality:** By $L$-smoothness:
$$ f(y) \leq f(x) + \nabla f(x)^T(y-x) + \frac{L}{2}\|y-x\|^2 $$

Apply this with $y = x^{(k+1)} = x^{(k)} - \frac{1}{L}\nabla f(x^{(k)})$:
$$ f(x^{(k+1)}) \leq f(x^{(k)}) - \frac{1}{L}\|\nabla f(x^{(k)})\|^2 + \frac{L}{2} \cdot \frac{1}{L^2}\|\nabla f(x^{(k)})\|^2 $$
$$ = f(x^{(k)}) - \frac{1}{2L}\|\nabla f(x^{(k)})\|^2 $$

By convexity: $f(x) \geq f(x^*) + \nabla f(x)^T(x - x^*)$, so:
$$ \|\nabla f(x)\|^2 \geq \frac{(f(x) - f(x^*))^2}{\|x - x^*\|^2} $$

Combining these inequalities and telescoping over $k$ iterations yields:
$$ f(x^{(k)}) - f^* \leq \frac{L\|x^{(0)} - x^*\|^2}{2k} $$

This proves the $O(1/k)$ rate.

## Proof Sketch: Strong Convexity Implies Linear Convergence

For an $m$-strongly convex and $L$-smooth function, we can show:
$$ \|x^{(k+1)} - x^*\|^2 \leq \left(1 - \frac{2m}{L+m}\right) \|x^{(k)} - x^*\|^2 $$

Since $\frac{2m}{L+m} = \frac{2}{\kappa+1}$, we get:
$$ \|x^{(k)} - x^*\|^2 \leq \left(\frac{\kappa-1}{\kappa+1}\right)^{2k} \|x^{(0)} - x^*\|^2 $$

The constant $c = \frac{\kappa-1}{\kappa+1}$ approaches 1 as $\kappa \to \infty$, explaining slow convergence for ill-conditioned problems.

## Understanding the Lower Bound

**Question:** Can we do better than $O(1/k)$ for smooth convex functions?

**Answer:** Nesterov (1983) proved that for the class of first-order methods (using only gradient information), the best possible rate is:
$$ f(x^{(k)}) - f^* \geq \frac{3L\|x^{(0)} - x^*\|^2}{32(k+1)^2} $$

This is a **lower bound**: no algorithm can do better than $O(1/k^2)$ in the worst case.

Remarkably, Nesterov also constructed an algorithm (Accelerated Gradient) that achieves this optimal rate.

## Accelerated Methods in Detail

The **Nesterov Accelerated Gradient (NAG)** method uses a clever momentum scheme:

**Algorithm:**
1. Initialize $x^{(0)} = y^{(0)}$, $t_0 = 1$
2. For $k = 0, 1, 2, \ldots$:
   - $x^{(k+1)} = y^{(k)} - \frac{1}{L}\nabla f(y^{(k)})$ (gradient step)
   - $t_{k+1} = \frac{1 + \sqrt{1 + 4t_k^2}}{2}$ (momentum parameter)
   - $y^{(k+1)} = x^{(k+1)} + \frac{t_k - 1}{t_{k+1}}(x^{(k+1)} - x^{(k)})$ (extrapolation)

**Convergence:**
$$ f(x^{(k)}) - f^* \leq \frac{2L\|x^{(0)} - x^*\|^2}{(k+1)^2} $$

This is a factor of $k$ improvement over standard gradient descent!

For strongly convex functions:
$$ f(x^{(k)}) - f^* \leq \left(1 - \frac{1}{\sqrt{\kappa}}\right)^k (f(x^{(0)}) - f^*) $$

Compare to gradient descent: $\left(1 - \frac{1}{\kappa}\right)^k$. The square root makes a massive difference.

## Convergence in Practice vs Theory

The theoretical rates are **worst-case** bounds. In practice:

1. **Early iterations:** Often faster than predicted (especially if initialized well)
2. **Near solution:** Matches theory closely
3. **Non-convex problems:** Theory doesn't apply, but algorithms still work (convergence to stationary points)

### Practical Stopping Criteria

Theory: "Run until $f(x^{(k)}) - f^* < \epsilon$"
Problem: We don't know $f^*$!

**Practical alternatives:**
1. **Gradient norm:** $\|\nabla f(x^{(k)})\| < \epsilon$
2. **Function progress:** $|f(x^{(k)}) - f(x^{(k-1)})| < \epsilon$
3. **Parameter progress:** $\|x^{(k)} - x^{(k-1)}\| < \epsilon$
4. **Relative change:** $\frac{|f(x^{(k)}) - f(x^{(k-1)})|}{|f(x^{(k)})|} < \epsilon$

Often use a combination: Stop when gradient is small AND progress stagnates.

## Common Mistakes in Convergence Analysis

### 1. Confusing Linear and Sublinear
"Linear convergence" means $O(c^k)$ (exponential decay), NOT $O(k)$ (linear decay).
This terminology is confusing but standard.

### 2. Ignoring Constants
A rate of $O((0.99)^k)$ looks similar to $O((0.999)^k)$, but the second is 10x slower!
To reach error $10^{-6}$:
- $(0.99)^k = 10^{-6} \implies k \approx 1380$
- $(0.999)^k = 10^{-6} \implies k \approx 13,815$

### 3. Forgetting Iteration Cost
Newton's method has quadratic convergence but costs $O(n^3)$ per iteration.
Gradient descent has linear convergence but costs $O(n)$ per iteration.
For total complexity, multiply convergence rate by iteration cost!

### 4. Assuming Strong Convexity
Many practical problems (e.g., least squares with more parameters than data) are convex but NOT strongly convex. The linear convergence rate doesn't apply.

## Comparing Algorithms: A Numerical Example

Consider minimizing the quadratic function $f(x) = \frac{1}{2}x^T Q x$ where $Q$ has condition number $\kappa = 100$. Starting from $f(x^{(0)}) - f^* = 1$, we want error $< 10^{-6}$.

**Gradient Descent:**
$$ f(x^{(k)}) - f^* \leq \left(\frac{99}{101}\right)^k \approx 0.98^k $$
Need $0.98^k < 10^{-6}$, so $k \approx 574$ iterations.

**Accelerated Gradient:**
$$ f(x^{(k)}) - f^* \leq \frac{200}{(k+1)^2} $$
Need $\frac{200}{(k+1)^2} < 10^{-6}$, so $k \approx 14{,}000$ iterations.
Wait, that's worse! For strongly convex:
$$ f(x^{(k)}) - f^* \leq \left(\frac{9}{11}\right)^k \approx 0.82^k $$
Need $0.82^k < 10^{-6}$, so $k \approx 70$ iterations.
Much better! Factor of 8 speedup.

**Newton's Method:**
Quadratic convergence: $10^{-1}, 10^{-2}, 10^{-4}, 10^{-8}$ (reaches $10^{-6}$ in ~4 iterations).
But each iteration costs $O(n^3)$ vs $O(n)$ for gradient methods.

## Summary Table

| Method | Assumptions | Convergence Rate | Complexity/Iter | To reach $\epsilon$ |
| :--- | :--- | :--- | :--- | :--- |
| Gradient Descent | Convex, Smooth | $O(1/k)$ | $O(n)$ | $O(1/\epsilon)$ |
| Gradient Descent | Strongly Convex | $O((1 - 1/\kappa)^k)$ | $O(n)$ | $O(\kappa \log(1/\epsilon))$ |
| Accelerated GD | Convex, Smooth | $O(1/k^2)$ | $O(n)$ | $O(1/\sqrt{\epsilon})$ |
| Accelerated GD | Strongly Convex | $O((1 - 1/\sqrt{\kappa})^k)$ | $O(n)$ | $O(\sqrt{\kappa}\log(1/\epsilon))$ |
| Newton's Method | Smooth Hessian | Quadratic | $O(n^3)$ | $O(\log\log(1/\epsilon))$ |
| Coordinate Descent | Separable | $O(1/k)$ | $O(n)$ | $O(1/\epsilon)$ |
| SGD (single sample) | Strongly Convex | $O(1/k)$ | $O(1)$ | $O(1/\epsilon)$ |

## Key Takeaways

1. **Convergence rates classify algorithms** into sublinear, linear, superlinear, and quadratic categories.

2. **Smoothness and convexity are critical** assumptions. Strong convexity enables linear convergence; smoothness provides upper bounds on curvature.

3. **Condition number $\kappa = L/m$** determines the convergence constant for strongly convex functions. Small $\kappa$ means fast convergence.

4. **Acceleration is possible:** Nesterov proved $O(1/k^2)$ is optimal for first-order methods on smooth convex functions.

5. **Trade-offs exist:** Fast convergence (Newton) vs cheap iterations (GD), high accuracy (GD) vs low accuracy (SGD).

6. **Theory guides practice:** Understanding rates helps choose the right algorithm for your problem and set realistic expectations.