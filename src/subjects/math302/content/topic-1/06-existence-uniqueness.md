---
title: "Existence and Uniqueness of Solutions"
---

# Existence and Uniqueness of Solutions

## The Fundamental Questions

When confronted with a differential equation, particularly an initial-value problem, two fundamental questions arise:

1. **Existence**: Does a solution exist?
2. **Uniqueness**: If a solution exists, is it unique?

These are not merely theoretical concerns. In practical applications, we need to know that the mathematical model has a solution and that the solution is determined uniquely by the initial conditions. Without uniqueness, the same initial state could lead to multiple different outcomes, rendering the model unpredictable.

## Initial Value Problems

Consider the first-order initial-value problem (IVP):
$$\frac{dy}{dx} = f(x, y), \quad y(x_0) = y_0$$

The question is: under what conditions on $f(x,y)$ does this IVP have a solution, and when is that solution unique?

### Existence Without Uniqueness

**Example 1**: Consider $\frac{dy}{dx} = 3y^{2/3}$ with $y(0) = 0$.

This equation is separable. Separating variables:
$$y^{-2/3}dy = 3dx$$
$$3y^{1/3} = 3x + C$$
$$y = (x + C)^3$$

Applying $y(0) = 0$: $0 = C^3$, so $C = 0$ and $y = x^3$.

However, $y = 0$ (the constant function) is also a solution:
$$\frac{dy}{dx} = 0 \quad \text{and} \quad 3(0)^{2/3} = 0$$

In fact, there are infinitely many solutions. For any $a \geq 0$:
$$y = \begin{cases}
0 & \text{if } x \leq a \\
(x - a)^3 & \text{if } x > a
\end{cases}$$

This demonstrates that solutions may exist but not be unique.

## The Picard-Lindelöf Theorem

The fundamental existence and uniqueness theorem for first-order ODEs is the **Picard-Lindelöf theorem** (also called the **Cauchy-Lipschitz theorem**).

### Statement of the Theorem

**Theorem (Picard-Lindelöf)**: Consider the initial-value problem
$$\frac{dy}{dx} = f(x,y), \quad y(x_0) = y_0$$

Suppose:
1. $f(x,y)$ is continuous in a rectangle $R: |x - x_0| \leq a, |y - y_0| \leq b$
2. $f(x,y)$ satisfies a **Lipschitz condition** in $y$ in $R$: there exists a constant $L$ such that
$$|f(x,y_1) - f(x,y_2)| \leq L|y_1 - y_2|$$
for all $(x,y_1)$ and $(x,y_2)$ in $R$.

Then there exists a unique solution $y = \phi(x)$ to the IVP on some interval $|x - x_0| \leq h$ where $h = \min\{a, b/M\}$ and $M = \max_{(x,y)\in R}|f(x,y)|$.

### Interpretation

- **Continuity** of $f$ is necessary for existence
- The **Lipschitz condition** is sufficient for uniqueness
- The solution exists in a (possibly small) neighborhood of $x_0$

### The Lipschitz Condition

The Lipschitz condition requires that $f$ doesn't change too rapidly with respect to $y$. Geometrically, it bounds the slope of $f$ as a function of $y$.

**Sufficient condition**: If $\frac{\partial f}{\partial y}$ exists and is bounded in $R$, then $f$ satisfies a Lipschitz condition. By the mean value theorem:
$$|f(x,y_1) - f(x,y_2)| = \left|\frac{\partial f}{\partial y}(x,\xi)\right| |y_1 - y_2| \leq L|y_1 - y_2|$$

where $L = \max_{(x,y)\in R}\left|\frac{\partial f}{\partial y}\right|$.

## Examples and Applications

### Example 2: Verifying Existence and Uniqueness

Determine if $\frac{dy}{dx} = x^2 + y^2$ with $y(0) = 1$ has a unique solution near $x = 0$.

**Solution**:
Here $f(x,y) = x^2 + y^2$.

**Continuity**: $f$ is continuous everywhere.

**Lipschitz condition**: Compute $\frac{\partial f}{\partial y} = 2y$.

In any bounded rectangle $R$ around $(0,1)$, $\frac{\partial f}{\partial y}$ is bounded. For instance, if $|x| \leq 1$ and $|y - 1| \leq 1$ (so $0 \leq y \leq 2$), then:
$$\left|\frac{\partial f}{\partial y}\right| = |2y| \leq 4$$

Therefore, $f$ satisfies a Lipschitz condition with $L = 4$.

**Conclusion**: By the Picard-Lindelöf theorem, a unique solution exists in some interval around $x = 0$.

### Example 3: Non-Uniqueness Due to Lipschitz Failure

Consider $\frac{dy}{dx} = \sqrt{|y|}$ with $y(0) = 0$.

**Solution**:
Here $f(x,y) = \sqrt{|y|}$.

**Continuity**: $f$ is continuous everywhere.

**Lipschitz condition**: Compute $\frac{\partial f}{\partial y} = \frac{1}{2\sqrt{|y|}}$ for $y \neq 0$.

As $y \to 0$, $\frac{\partial f}{\partial y} \to \infty$. Therefore, $\frac{\partial f}{\partial y}$ is unbounded near $y = 0$, and the Lipschitz condition fails.

**Consequence**: Uniqueness is not guaranteed. Indeed, both $y = 0$ and
$$y = \begin{cases}
0 & x \leq 0 \\
\frac{x^2}{4} & x > 0
\end{cases}$$

are solutions passing through $(0,0)$.

### Example 4: Linear Equations Always Have Unique Solutions

Consider the linear IVP:
$$\frac{dy}{dx} + P(x)y = Q(x), \quad y(x_0) = y_0$$

Rewrite as $\frac{dy}{dx} = -P(x)y + Q(x) = f(x,y)$.

Then:
$$\frac{\partial f}{\partial y} = -P(x)$$

If $P(x)$ is continuous on an interval containing $x_0$, then $\frac{\partial f}{\partial y}$ is bounded on any compact subset. Therefore, the Lipschitz condition is satisfied, and the IVP has a unique solution.

This confirms our experience: linear equations with continuous coefficients always have unique solutions to initial-value problems.

## Global vs Local Solutions

The Picard-Lindelöf theorem guarantees existence only on a **local** interval $|x - x_0| \leq h$. The solution may:
- Extend to a larger interval (global solution)
- Reach the boundary of the region $R$
- Become unbounded (blow up) in finite time

### Example 5: Finite-Time Blowup

Consider $\frac{dy}{dx} = y^2$ with $y(0) = 1$.

Separating variables:
$$\frac{dy}{y^2} = dx$$
$$-\frac{1}{y} = x + C$$

With $y(0) = 1$: $C = -1$, so:
$$y = \frac{1}{1-x}$$

This solution exists only for $x < 1$. As $x \to 1^-$, $y \to \infty$. The solution "blows up" at $x = 1$.

The Picard-Lindelöf theorem guarantees a unique solution on some interval around $x = 0$, but not necessarily on all of $\mathbb{R}$.

## Picard Iteration

The Picard-Lindelöf theorem is constructive: its proof provides a method for approximating solutions called **Picard iteration** (or the **method of successive approximations**).

### The Iteration Scheme

The IVP $\frac{dy}{dx} = f(x,y)$, $y(x_0) = y_0$ is equivalent to the integral equation:
$$y(x) = y_0 + \int_{x_0}^x f(t, y(t))\,dt$$

Picard iteration generates a sequence of approximations:
$$y_0(x) = y_0$$
$$y_{n+1}(x) = y_0 + \int_{x_0}^x f(t, y_n(t))\,dt$$

Under the conditions of the theorem, this sequence converges uniformly to the unique solution.

### Example 6: Picard Iteration

Approximate the solution to $\frac{dy}{dx} = y$ with $y(0) = 1$ using Picard iteration.

**Solution**:
The iteration is:
$$y_{n+1}(x) = 1 + \int_0^x y_n(t)\,dt$$

Start with $y_0(x) = 1$:
$$y_1(x) = 1 + \int_0^x 1\,dt = 1 + x$$

$$y_2(x) = 1 + \int_0^x (1 + t)\,dt = 1 + x + \frac{x^2}{2}$$

$$y_3(x) = 1 + \int_0^x \left(1 + t + \frac{t^2}{2}\right)dt = 1 + x + \frac{x^2}{2} + \frac{x^3}{6}$$

We recognize the pattern:
$$y_n(x) = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots + \frac{x^n}{n!}$$

As $n \to \infty$, this converges to:
$$y(x) = \sum_{n=0}^\infty \frac{x^n}{n!} = e^x$$

which is indeed the exact solution to $y' = y$, $y(0) = 1$.

## Extension to Higher-Order Equations

The Picard-Lindelöf theorem extends to higher-order equations and systems of first-order equations.

For the second-order IVP:
$$\frac{d^2y}{dx^2} = f\left(x, y, \frac{dy}{dx}\right), \quad y(x_0) = y_0, \quad y'(x_0) = y_1$$

convert to a first-order system by letting $y_1 = y$ and $y_2 = dy/dx$:
$$\frac{dy_1}{dx} = y_2, \quad \frac{dy_2}{dx} = f(x, y_1, y_2)$$

with initial conditions $y_1(x_0) = y_0$, $y_2(x_0) = y_1$.

If $f$ is continuous and satisfies a Lipschitz condition in $y_1$ and $y_2$, then a unique solution exists.

## Practical Implications

### When Can We Trust Our Solution?

The existence and uniqueness theorem provides confidence that:
1. The differential equation has a solution (it's not an inconsistent system)
2. Numerical methods will converge to a unique solution
3. Small changes in initial conditions lead to small changes in solutions (continuity)

### When Should We Be Cautious?

Failure of the Lipschitz condition (often at singular points) warns us:
- Solutions may not be unique
- Numerical methods may give unpredictable results
- Small perturbations might lead to qualitatively different behaviors

### Example 7: Practical Concern

For the pendulum equation $\frac{d^2\theta}{dt^2} = -\sin\theta$, written as a first-order system:
$$\frac{d\theta}{dt} = \omega, \quad \frac{d\omega}{dt} = -\sin\theta$$

The right-hand side is continuous and has bounded partial derivatives everywhere. Therefore, for any initial condition $(\theta_0, \omega_0)$, a unique solution exists. This justifies treating the pendulum as a deterministic system: the same initial state always leads to the same motion.

## Connection to Stability Theory

The Lipschitz constant $L$ appears in stability analysis. For the linear equation $\frac{dy}{dx} = -\lambda y$, we have $f(x,y) = -\lambda y$, so $\frac{\partial f}{\partial y} = -\lambda$.

If $\lambda > 0$, solutions decay exponentially (stable). The Lipschitz constant $L = \lambda$ measures the rate of contraction, directly relating existence/uniqueness theory to stability.

## Conclusion

The Picard-Lindelöf theorem is the cornerstone of the theory of ordinary differential equations. It provides rigorous conditions under which initial-value problems have unique solutions, giving us confidence in both analytical and numerical approaches. While the theorem's conditions may seem abstract, they have profound practical implications: continuity ensures existence, while the Lipschitz condition guarantees uniqueness. Understanding when these conditions hold—and when they fail—is essential for correctly interpreting and solving differential equations in science and engineering.
