---
id: math401-topic-2-5
title: "Harmonic Functions"
order: 5
---

# Analytic Functions

Analytic functions (also called holomorphic functions) are the central objects of study in complex analysis. These functions possess extraordinary properties that distinguish them fundamentally from general real-valued functions. A function that is differentiable in a region is infinitely differentiable, equals its Taylor series, and satisfies powerful theorems like the maximum modulus principle and Liouville's theorem.

## Definition of Analyticity

### Analytic at a Point

A function $f$ is **analytic at $z_0$** if $f$ is differentiable in some neighborhood of $z_0$.

More precisely, $f$ is analytic at $z_0$ if there exists $\epsilon > 0$ such that $f'(z)$ exists for all $z$ with $|z - z_0| < \epsilon$.

**Note**: Being differentiable at a single point is weaker than being analytic at that point. Analyticity requires differentiability in a full neighborhood.

### Analytic on a Set

A function $f$ is **analytic on an open set $D$** (or **analytic in $D$**) if $f$ is differentiable at every point of $D$.

When $D = \mathbb{C}$, we say $f$ is **entire**.

### Alternative Terminology

- **Holomorphic** is synonymous with analytic
- **Regular** is sometimes used, especially in older texts
- **Monogenic** is occasionally used

The term "analytic" originates from the fact that these functions can be represented by convergent power series (analytic expressions).

## Examples of Analytic Functions

### Polynomials

Every polynomial $p(z) = a_n z^n + \cdots + a_1 z + a_0$ is entire.

**Proof**: Polynomials are sums of terms $az^k$, which are differentiable everywhere with derivative $kaz^{k-1}$. Sums of differentiable functions are differentiable.

### Rational Functions

A rational function $f(z) = \frac{P(z)}{Q(z)}$ (where $P, Q$ are polynomials) is analytic on $\mathbb{C} \setminus \{$zeros of $Q\}$.

**Example**: $f(z) = \frac{z^2 + 1}{z^2 - 4}$ is analytic on $\mathbb{C} \setminus \{2, -2\}$.

### The Exponential Function

$e^z$ is entire.

**Proof**: We've shown $\frac{d}{dz}e^z = e^z$ exists for all $z \in \mathbb{C}$.

### Trigonometric Functions

$\sin z$ and $\cos z$ are entire.

**Proof**:
$$\frac{d}{dz}\sin z = \cos z, \quad \frac{d}{dz}\cos z = -\sin z$$

exist for all $z \in \mathbb{C}$.

### The Complex Logarithm

The principal branch $\text{Log } z$ is analytic on $\mathbb{C} \setminus (-\infty, 0]$ (the complex plane with the non-positive real axis removed).

**Proof**: $\frac{d}{dz}\text{Log } z = \frac{1}{z}$ exists for all $z$ not on the branch cut.

## Examples of Non-Analytic Functions

### The Complex Conjugate

$f(z) = \bar{z}$ is nowhere analytic.

**Proof**: We've shown $\bar{z}$ is nowhere differentiable, so it cannot be analytic anywhere.

### The Real Part Function

$f(z) = \text{Re}(z)$ is nowhere analytic.

**Proof**: Violates Cauchy-Riemann equations everywhere.

### Piecewise Definitions

$$f(z) = \begin{cases}
z^2 & |z| < 1 \\
\bar{z} & |z| \geq 1
\end{cases}$$

This is analytic on $|z| < 1$ but not on $|z| \geq 1$, hence not analytic on any open set containing points with $|z| = 1$.

## Entire Functions

A function analytic on all of $\mathbb{C}$ is called **entire**.

**Examples of entire functions**:
1. All polynomials
2. $e^z$
3. $\sin z$, $\cos z$
4. $\sinh z$, $\cosh z$
5. Any linear combination or product of entire functions

**Examples of non-entire functions**:
1. $\frac{1}{z}$ (not defined at $z = 0$)
2. $\tan z = \frac{\sin z}{\cos z}$ (poles where $\cos z = 0$)
3. $\text{Log } z$ (branch point at $z = 0$)
4. $\sqrt{z}$ (branch point at $z = 0$)

### Liouville's Theorem

**Theorem (Liouville)**: Every bounded entire function is constant.

**Proof**: (We'll prove this rigorously using Cauchy's integral formula in a later section.)

**Corollary (Fundamental Theorem of Algebra)**: Every non-constant polynomial $p(z)$ has at least one complex root.

**Proof of corollary**: Suppose $p(z) \neq 0$ for all $z$. Then $f(z) = 1/p(z)$ is entire. As $|z| \to \infty$, $|p(z)| \to \infty$, so $|f(z)| \to 0$. Thus $f$ is bounded, and by Liouville's theorem, $f$ is constant. This implies $p$ is constant, a contradiction.

## Properties of Analytic Functions

### Infinite Differentiability

**Remarkable fact**: If $f$ is analytic on $D$, then all derivatives $f', f'', f''', \ldots$ exist and are analytic on $D$.

This is in stark contrast to real analysis, where differentiability does not imply higher differentiability. In complex analysis, differentiability once implies differentiability infinitely many times!

**Example**: $f(z) = e^z$ has $f^{(n)}(z) = e^z$ for all $n$.

### Power Series Representation

**Theorem**: If $f$ is analytic at $z_0$, then $f$ can be represented by a convergent power series in some neighborhood of $z_0$:

$$f(z) = \sum_{n=0}^{\infty} a_n (z - z_0)^n$$

with radius of convergence $R > 0$.

Conversely, every power series with positive radius of convergence represents an analytic function within its disk of convergence.

**Example**:
$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}, \quad |z| < \infty$$

$$\sin z = \sum_{n=0}^{\infty} \frac{(-1)^n z^{2n+1}}{(2n+1)!}, \quad |z| < \infty$$

$$\frac{1}{1 - z} = \sum_{n=0}^{\infty} z^n, \quad |z| < 1$$

### Identity Theorem

**Theorem (Identity Theorem)**: Let $f$ and $g$ be analytic on a connected open set $D$. If $f(z) = g(z)$ for all $z$ in some subset $S \subseteq D$ that has a limit point in $D$, then $f(z) = g(z)$ for all $z \in D$.

**Corollary**: If $f$ is analytic on a connected domain and $f = 0$ on any small disk (or even a sequence converging to a point in the domain), then $f \equiv 0$ everywhere.

This shows that analytic functions are extremely rigid: their values on any small set determine them everywhere!

**Example**: Since $e^{ix} = \cos x + i\sin x$ for all real $x$, and both sides are analytic, we have $e^{iz} = \cos z + i\sin z$ for all complex $z$.

### Maximum Modulus Principle

**Theorem (Maximum Modulus Principle)**: If $f$ is analytic and non-constant on a connected open set $D$, then $|f|$ has no local maximum in $D$.

In other words, the maximum of $|f|$ on any closed bounded region must occur on the boundary.

**Example**: For $f(z) = z^2$ on $|z| \leq 1$, the maximum of $|f|$ is $\max_{|z|=1} |z^2| = 1$, achieved on the boundary $|z| = 1$.

### Open Mapping Theorem

**Theorem**: If $f$ is analytic and non-constant on a domain $D$, then $f$ maps open sets to open sets.

This means $f(D)$ is open whenever $D$ is open.

## Singularities and Poles

A point $z_0$ where $f$ fails to be analytic is called a **singularity** of $f$.

### Types of Singularities

1. **Removable singularity**: $\lim_{z \to z_0} f(z)$ exists. We can extend $f$ to be analytic at $z_0$ by defining $f(z_0)$ to be this limit.

   **Example**: $f(z) = \frac{\sin z}{z}$ at $z = 0$. Since $\lim_{z \to 0} \frac{\sin z}{z} = 1$, defining $f(0) = 1$ makes $f$ entire.

2. **Pole**: $\lim_{z \to z_0} |f(z)| = \infty$. There exists $n \geq 1$ such that $(z - z_0)^n f(z)$ has a removable singularity at $z_0$. The smallest such $n$ is the **order** of the pole.

   **Example**: $f(z) = \frac{1}{z^2}$ has a pole of order $2$ at $z = 0$.

3. **Essential singularity**: Neither removable nor a pole.

   **Example**: $f(z) = e^{1/z}$ at $z = 0$.

### Meromorphic Functions

A function that is analytic except at poles is called **meromorphic**.

**Examples**:
- $\tan z = \frac{\sin z}{\cos z}$ (poles at $z = \frac{\pi}{2} + n\pi$)
- $\frac{1}{z^2 - 1}$ (simple poles at $z = \pm 1$)
- All rational functions

Meromorphic functions on $\mathbb{C}$ are precisely the rational functions (ratios of polynomials).

## Harmonic Functions Connection

If $f(z) = u(x, y) + iv(x, y)$ is analytic, then:
- $u$ and $v$ are harmonic: $\nabla^2 u = \nabla^2 v = 0$
- $v$ is the **harmonic conjugate** of $u$
- Conversely, every harmonic function on a simply connected domain is the real part of some analytic function

We'll explore this connection in depth in the next section.

## Conformal Mapping

If $f$ is analytic at $z_0$ and $f'(z_0) \neq 0$, then $f$ is **conformal at $z_0$**: it preserves angles between curves passing through $z_0$.

This property makes analytic functions powerful tools in geometry, fluid dynamics, and electrostatics.

**Example**: $f(z) = e^z$ is conformal except at no points (since $f'(z) = e^z \neq 0$ everywhere).

**Example**: $f(z) = z^2$ is conformal except at $z = 0$ (where $f'(0) = 0$).

## Analytic Continuation

Given an analytic function $f$ on a domain $D$, we might ask: can we extend $f$ to a larger domain while preserving analyticity?

**Analytic continuation** is the process of extending the domain of an analytic function.

**Example**: The series $\sum_{n=0}^{\infty} z^n = \frac{1}{1-z}$ converges only for $|z| < 1$, but the function $\frac{1}{1-z}$ is analytic on $\mathbb{C} \setminus \{1\}$. The function $\frac{1}{1-z}$ is the analytic continuation of the series.

### Uniqueness

The Identity Theorem implies that analytic continuation, when it exists, is unique.

## Cauchy-Riemann in Terms of Analyticity

$f$ is analytic on $D$ if and only if:
1. $f$ is continuous on $D$
2. The Cauchy-Riemann equations hold throughout $D$
3. The partial derivatives are continuous on $D$

This provides a practical test for analyticity using real analysis tools.

## Applications

Analytic functions appear throughout mathematics and physics:

1. **Conformal mapping**: Solving Laplace's equation via conformal transformations
2. **Fluid dynamics**: Complex potentials for 2D incompressible flows
3. **Electrostatics**: Electrostatic potentials are harmonic, hence real parts of analytic functions
4. **Number theory**: The Riemann zeta function, Dirichlet series
5. **Signal processing**: Fourier transforms and Laplace transforms
6. **Quantum field theory**: Complex analysis in path integrals

## Summary

- **Analytic** (holomorphic) at $z_0$: differentiable in a neighborhood of $z_0$
- **Analytic on $D$**: differentiable at every point of open set $D$
- **Entire**: analytic on all of $\mathbb{C}$
- Examples: polynomials, $e^z$, $\sin z$, $\cos z$ (entire); rational functions (analytic except at poles)
- **Infinite differentiability**: analytic implies $C^\infty$
- **Power series**: analytic functions have convergent Taylor series
- **Identity theorem**: values on a small set determine the function everywhere
- **Maximum modulus principle**: $|f|$ has no interior local maxima
- **Liouville's theorem**: bounded entire functions are constant
- **Singularities**: removable, poles, essential
- **Meromorphic**: analytic except at poles
- Analytic functions are conformal where $f' \neq 0$
- Connection to harmonic functions via Cauchy-Riemann
- Analyticity is the defining characteristic of complex analysis, giving functions remarkable rigidity and power
