---
id: math401-topic-2-2
title: "Limits and Continuity"
order: 2
---

# Limits and Continuity in the Complex Plane

The concepts of limits and continuity extend from real analysis to complex analysis, but with important differences. Since complex numbers approach a point from infinitely many directions in the plane, complex limits are more restrictive and powerful than their real counterparts.

## Limits of Complex Functions

### Definition

Let $f$ be a function defined in some deleted neighborhood of $z_0$ (i.e., $f$ is defined near $z_0$ but not necessarily at $z_0$ itself). We say that:

$$\lim_{z \to z_0} f(z) = L$$

if for every $\epsilon > 0$, there exists $\delta > 0$ such that:

$$0 < |z - z_0| < \delta \implies |f(z) - L| < \epsilon$$

**In words**: $f(z)$ can be made arbitrarily close to $L$ by taking $z$ sufficiently close to (but not equal to) $z_0$.

This is the **epsilon-delta definition**, directly analogous to real analysis but with the crucial difference that $z$ can approach $z_0$ from any direction in the complex plane.

### Uniqueness of Limits

**Theorem**: If $\lim_{z \to z_0} f(z)$ exists, it is unique.

**Proof**: Suppose $\lim_{z \to z_0} f(z) = L_1$ and $\lim_{z \to z_0} f(z) = L_2$. Given $\epsilon > 0$, choose $\delta_1, \delta_2$ such that:
- $0 < |z - z_0| < \delta_1 \implies |f(z) - L_1| < \epsilon/2$
- $0 < |z - z_0| < \delta_2 \implies |f(z) - L_2| < \epsilon/2$

Let $\delta = \min(\delta_1, \delta_2)$. For $0 < |z - z_0| < \delta$:

$$|L_1 - L_2| = |L_1 - f(z) + f(z) - L_2| \leq |f(z) - L_1| + |f(z) - L_2| < \epsilon$$

Since this holds for all $\epsilon > 0$, we have $L_1 = L_2$.

### Component-wise Characterization

**Theorem**: Let $f(z) = u(x, y) + iv(x, y)$ where $z = x + iy$, and let $z_0 = x_0 + iy_0$, $L = L_1 + iL_2$. Then:

$$\lim_{z \to z_0} f(z) = L \iff \lim_{(x,y) \to (x_0, y_0)} u(x, y) = L_1 \text{ and } \lim_{(x,y) \to (x_0, y_0)} v(x, y) = L_2$$

This reduces complex limits to pairs of real two-variable limits.

**Example**: Find $\lim_{z \to 2i} (z^2 + 3z)$.

$$f(z) = (x + iy)^2 + 3(x + iy) = (x^2 - y^2 + 3x) + i(2xy + 3y)$$

$$u(x, y) = x^2 - y^2 + 3x, \quad v(x, y) = 2xy + 3y$$

$$\lim_{(x, y) \to (0, 2)} u(x, y) = 0 - 4 + 0 = -4$$

$$\lim_{(x, y) \to (0, 2)} v(x, y) = 0 + 6 = 6$$

Therefore: $\lim_{z \to 2i} (z^2 + 3z) = -4 + 6i$.

## Limit Laws

Complex limits satisfy the same algebraic properties as real limits:

**Theorem (Limit Laws)**: If $\lim_{z \to z_0} f(z) = L$ and $\lim_{z \to z_0} g(z) = M$, then:

1. **Sum**: $\lim_{z \to z_0} [f(z) + g(z)] = L + M$

2. **Difference**: $\lim_{z \to z_0} [f(z) - g(z)] = L - M$

3. **Product**: $\lim_{z \to z_0} [f(z) \cdot g(z)] = L \cdot M$

4. **Quotient**: $\lim_{z \to z_0} \frac{f(z)}{g(z)} = \frac{L}{M}$ (if $M \neq 0$)

5. **Constant multiple**: $\lim_{z \to z_0} cf(z) = cL$ for $c \in \mathbb{C}$

**Proof**: These follow from the corresponding results in real analysis applied component-wise.

### Example Using Limit Laws

$$\lim_{z \to 1+i} \frac{z^2 - 1}{z - 1} = \lim_{z \to 1+i} \frac{(z-1)(z+1)}{z-1} = \lim_{z \to 1+i} (z + 1) = (1 + i) + 1 = 2 + i$$

## Limits Involving Infinity

### Limits at Infinity

We say $\lim_{z \to \infty} f(z) = L$ if for every $\epsilon > 0$, there exists $R > 0$ such that:

$$|z| > R \implies |f(z) - L| < \epsilon$$

**Example**: $\lim_{z \to \infty} \frac{1}{z} = 0$

**Proof**: Given $\epsilon > 0$, choose $R = 1/\epsilon$. If $|z| > R$:
$$\left|\frac{1}{z}\right| = \frac{1}{|z|} < \frac{1}{R} = \epsilon$$

### Infinite Limits

We say $\lim_{z \to z_0} f(z) = \infty$ if for every $M > 0$, there exists $\delta > 0$ such that:

$$0 < |z - z_0| < \delta \implies |f(z)| > M$$

**Example**: $\lim_{z \to 0} \frac{1}{z^2} = \infty$

**Proof**: Given $M > 0$, choose $\delta = 1/\sqrt{M}$. If $0 < |z| < \delta$:
$$\left|\frac{1}{z^2}\right| = \frac{1}{|z|^2} > \frac{1}{\delta^2} = M$$

## When Limits Fail to Exist

In complex analysis, limits must be the same along **all paths** of approach. If different paths yield different values, the limit does not exist.

### Example 1: Path-Dependent Limit

Consider $f(z) = \frac{\text{Re}(z^2)}{|z|^2}$ for $z \neq 0$.

$$f(x + iy) = \frac{x^2 - y^2}{x^2 + y^2}$$

**Approach along the real axis** ($y = 0$, $x \to 0$):
$$f(x) = \frac{x^2}{x^2} = 1 \to 1$$

**Approach along the imaginary axis** ($x = 0$, $y \to 0$):
$$f(iy) = \frac{-y^2}{y^2} = -1 \to -1$$

Since $1 \neq -1$, the limit $\lim_{z \to 0} f(z)$ does not exist.

### Example 2: Another Path-Dependent Limit

$$f(z) = \frac{z}{\bar{z}}$$

Along any ray $z = re^{i\theta}$ ($r \to 0$, $\theta$ fixed):
$$f(re^{i\theta}) = \frac{re^{i\theta}}{re^{-i\theta}} = e^{2i\theta}$$

Different rays yield different limit values, so $\lim_{z \to 0} \frac{z}{\bar{z}}$ does not exist.

## Sequential Criterion for Limits

**Theorem**: $\lim_{z \to z_0} f(z) = L$ if and only if for every sequence $(z_n)$ in the domain of $f$ with $z_n \neq z_0$ and $z_n \to z_0$, we have $f(z_n) \to L$.

This provides a useful tool: to show a limit does not exist, find two sequences approaching $z_0$ along which $f$ has different limits.

**Example**: For $f(z) = \frac{z}{\bar{z}}$, take:
- $z_n = 1/n \to 0$: $f(z_n) = 1 \to 1$
- $w_n = i/n \to 0$: $f(w_n) = e^{i\pi} = -1 \to -1$

Since the limits differ, $\lim_{z \to 0} f(z)$ does not exist.

## Continuity

### Definition

A function $f$ is **continuous at $z_0$** if:
1. $f(z_0)$ is defined
2. $\lim_{z \to z_0} f(z)$ exists
3. $\lim_{z \to z_0} f(z) = f(z_0)$

Equivalently, for every $\epsilon > 0$, there exists $\delta > 0$ such that:

$$|z - z_0| < \delta \implies |f(z) - f(z_0)| < \epsilon$$

We say $f$ is **continuous on a set $S$** if it is continuous at every point of $S$.

### Component-wise Continuity

**Theorem**: $f(z) = u(x, y) + iv(x, y)$ is continuous at $z_0 = x_0 + iy_0$ if and only if $u$ and $v$ are continuous at $(x_0, y_0)$ as functions of two real variables.

This allows us to leverage results from real multivariable calculus.

### Examples

1. **Polynomials** are continuous everywhere on $\mathbb{C}$.

2. **Rational functions** $f(z) = P(z)/Q(z)$ are continuous everywhere except at zeros of $Q$.

3. **The exponential function** $e^z$ is continuous on $\mathbb{C}$.

   Since $e^z = e^x \cos y + ie^x \sin y$, both $u(x,y) = e^x \cos y$ and $v(x,y) = e^x \sin y$ are continuous.

4. **$f(z) = \bar{z}$** is continuous on $\mathbb{C}$.

   $f(x + iy) = x - iy$, so $u(x,y) = x$ and $v(x,y) = -y$ are continuous.

5. **$f(z) = |z|$** is continuous on $\mathbb{C}$.

   $|f(z) - f(z_0)| = ||z| - |z_0|| \leq |z - z_0|$ by the reverse triangle inequality.

### Discontinuous Example

Define:
$$f(z) = \begin{cases}
\frac{z^2}{|z|} & z \neq 0 \\
0 & z = 0
\end{cases}$$

At $z = 0$, along the ray $z = re^{i\theta}$:
$$f(re^{i\theta}) = \frac{r^2 e^{2i\theta}}{r} = re^{2i\theta} \to 0$$

So $\lim_{z \to 0} f(z) = 0 = f(0)$, and $f$ is continuous at 0.

Actually, this function is continuous! Let's try another.

$$g(z) = \begin{cases}
\frac{z}{\bar{z}} & z \neq 0 \\
0 & z = 0
\end{cases}$$

We showed $\lim_{z \to 0} \frac{z}{\bar{z}}$ does not exist, so $g$ is discontinuous at 0.

## Properties of Continuous Functions

**Theorem**: If $f$ and $g$ are continuous at $z_0$, then:
1. $f + g$ is continuous at $z_0$
2. $f - g$ is continuous at $z_0$
3. $fg$ is continuous at $z_0$
4. $f/g$ is continuous at $z_0$ (if $g(z_0) \neq 0$)

**Theorem (Composition)**: If $g$ is continuous at $z_0$ and $f$ is continuous at $g(z_0)$, then $f \circ g$ is continuous at $z_0$.

**Theorem (Extreme Value Theorem)**: If $K$ is compact and $f : K \to \mathbb{C}$ is continuous, then $|f|$ attains its maximum and minimum on $K$.

More precisely, there exist $z_m, z_M \in K$ such that:
$$|f(z_m)| \leq |f(z)| \leq |f(z_M)| \text{ for all } z \in K$$

## Uniform Continuity

A function $f$ is **uniformly continuous on $S$** if for every $\epsilon > 0$, there exists $\delta > 0$ such that for all $z, w \in S$:

$$|z - w| < \delta \implies |f(z) - f(w)| < \epsilon$$

The key difference: $\delta$ depends only on $\epsilon$, not on the specific points $z, w$.

**Theorem**: If $K$ is compact and $f : K \to \mathbb{C}$ is continuous, then $f$ is uniformly continuous on $K$.

**Example**: $f(z) = z^2$ is not uniformly continuous on $\mathbb{C}$.

For $z = n$ and $w = n + 1/n$:
$$|z - w| = 1/n \to 0$$

But:
$$|f(z) - f(w)| = |n^2 - (n + 1/n)^2| = |n^2 - n^2 - 2 - 1/n^2| = |2 + 1/n^2| \to 2$$

So no single $\delta$ works for all $\epsilon < 2$.

However, $f(z) = z^2$ is uniformly continuous on any bounded set (e.g., $|z| \leq R$).

## Limits of Sequences of Functions

A sequence of functions $(f_n)$ **converges pointwise** to $f$ on $S$ if for every $z \in S$:
$$\lim_{n \to \infty} f_n(z) = f(z)$$

**Uniform convergence**: $(f_n)$ converges **uniformly** to $f$ on $S$ if for every $\epsilon > 0$, there exists $N$ such that for all $n > N$ and all $z \in S$:
$$|f_n(z) - f(z)| < \epsilon$$

**Theorem**: If each $f_n$ is continuous on $S$ and $(f_n)$ converges uniformly to $f$ on $S$, then $f$ is continuous on $S$.

This is crucial for infinite series of functions (power series, Fourier series, etc.).

## Continuity and Open/Closed Sets

**Theorem**: $f$ is continuous on $\mathbb{C}$ if and only if the preimage of every open set is open.

Equivalently, $f$ is continuous if and only if the preimage of every closed set is closed.

This topological characterization is often more convenient than the $\epsilon$-$\delta$ definition for proving general theorems.

## Lipschitz Continuity

A function $f$ is **Lipschitz continuous** on $S$ if there exists $M > 0$ such that for all $z, w \in S$:

$$|f(z) - f(w)| \leq M|z - w|$$

Lipschitz continuity implies uniform continuity (take $\delta = \epsilon/M$).

**Example**: $f(z) = 3z + 2$ is Lipschitz with $M = 3$:
$$|f(z) - f(w)| = |3(z - w)| = 3|z - w|$$

**Example**: $f(z) = z^2$ is Lipschitz on $|z| \leq R$ with $M = 2R$:
$$|z^2 - w^2| = |z + w||z - w| \leq 2R|z - w|$$

## Applications and Importance

Continuity is essential for:
1. **Integration**: Continuous functions are integrable along paths
2. **Uniform convergence**: Preserves continuity
3. **Fixed point theorems**: Require continuous maps
4. **Topological arguments**: Many proofs use continuity to transfer properties

In complex analysis specifically:
- Continuous functions on compact sets are uniformly continuous
- Maximum modulus is attained on compact sets
- Continuous images of connected sets are connected

## Summary

- **Limit**: $\lim_{z \to z_0} f(z) = L$ means $f(z)$ approaches $L$ from all directions as $z \to z_0$
- **Epsilon-delta**: $0 < |z - z_0| < \delta \implies |f(z) - L| < \epsilon$
- **Component-wise**: Complex limits reduce to pairs of real limits
- **Limit laws**: Sum, product, quotient rules apply
- **Path-dependence**: If different paths give different limits, the limit doesn't exist
- **Sequential criterion**: Useful for proving limits exist or don't exist
- **Continuity**: $f$ continuous at $z_0$ if $\lim_{z \to z_0} f(z) = f(z_0)$
- **Properties**: Continuous functions closed under arithmetic and composition
- **Extreme value theorem**: Continuous functions on compact sets attain max/min
- **Uniform continuity**: Continuous functions on compact sets are uniformly continuous
- Understanding limits and continuity is foundational for complex differentiation
