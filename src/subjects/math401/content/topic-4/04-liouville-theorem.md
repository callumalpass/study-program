---
id: math401-topic-4-4
title: "Fundamental Theorem of Algebra"
order: 4
---

# Liouville's Theorem

Liouville's theorem is one of the most elegant and surprising results in complex analysis. It states that every bounded entire function must be constant—a function that is analytic everywhere and doesn't grow too much must not vary at all! This seemingly simple result has profound consequences, including providing a proof of the Fundamental Theorem of Algebra.

## Statement

**Theorem (Liouville's Theorem)**: If $f: \mathbb{C} \to \mathbb{C}$ is entire (analytic on all of $\mathbb{C}$) and bounded (i.e., $|f(z)| \leq M$ for all $z \in \mathbb{C}$ and some $M > 0$), then $f$ is constant.

## Proof Using Cauchy's Inequality

**Proof**: Let $f$ be entire with $|f(z)| \leq M$ for all $z$.

For any $z_0 \in \mathbb{C}$ and any $R > 0$, Cauchy's inequality gives:
$$|f'(z_0)| \leq \frac{1! \cdot M}{R^1} = \frac{M}{R}$$

Since this holds for all $R > 0$, take $R \to \infty$:
$$|f'(z_0)| \leq \lim_{R \to \infty} \frac{M}{R} = 0$$

Therefore $f'(z_0) = 0$ for all $z_0 \in \mathbb{C}$.

Since $f'(z) = 0$ everywhere, $f$ must be constant.

**Alternative proof using the maximum modulus principle**: Since $|f|$ is bounded and continuous, it has a maximum on $\mathbb{C}$. But an analytic function cannot have an interior maximum unless it's constant.

## Examples

### Example 1: Polynomials Are Not Bounded

**No non-constant polynomial is bounded**.

For $p(z) = a_n z^n + \cdots + a_1 z + a_0$ with $a_n \neq 0$ and $n \geq 1$:
$$|p(z)| \geq |a_n||z|^n - |a_{n-1}||z|^{n-1} - \cdots - |a_0| \to \infty \text{ as } |z| \to \infty$$

So no polynomial (except constants) is bounded, consistent with Liouville.

### Example 2: $e^z$ Is Not Bounded

$$|e^z| = e^{\text{Re}(z)} \to \infty \text{ as } \text{Re}(z) \to \infty$$

So $e^z$ is unbounded, consistent with it being non-constant.

### Example 3: $\sin z$ Is Not Bounded

For purely imaginary $z = iy$:
$$|\sin(iy)| = |i\sinh y| = \sinh y = \frac{e^y - e^{-y}}{2} \to \infty \text{ as } y \to \infty$$

So $\sin z$ is unbounded (unlike real sine!).

### Example 4: Only Bounded Entire Functions Are Constants

The only bounded entire functions are $f(z) = c$ for constants $c \in \mathbb{C}$.

## Consequences

### Growth of Entire Functions

If $f$ is entire and non-constant, then $f$ must be unbounded. Moreover:

**Theorem**: If $f$ is entire and $|f(z)| \leq M(1 + |z|^n)$ for some $n \geq 0$ and $M > 0$, then $f$ is a polynomial of degree at most $n$.

**Proof sketch**: Consider $g(z) = \frac{f(z)}{z^{n+1}}$. As $|z| \to \infty$:
$$|g(z)| \leq \frac{M(1 + |z|^n)}{|z|^{n+1}} \to 0$$

Using Cauchy's formula on large circles and taking limits shows $g$ must be bounded, hence constant by Liouville. This gives $f(z) = cz^{n+1} + (\text{lower degree})$.

### Functions with Polynomial Growth

**Corollary**: If $f$ is entire and $|f(z)| = O(|z|^n)$ as $|z| \to \infty$, then $f$ is a polynomial of degree at most $n$.

This explains why $e^z, \sin z, \cos z$ cannot be polynomials—they grow faster than any polynomial.

## Fundamental Theorem of Algebra

Liouville's theorem provides an elegant proof of the Fundamental Theorem of Algebra.

**Theorem (Fundamental Theorem of Algebra)**: Every non-constant polynomial $p(z)$ with complex coefficients has at least one complex root.

**Proof using Liouville**: Suppose $p(z) = a_n z^n + \cdots + a_0$ with $n \geq 1$ has no roots.

Then $f(z) = \frac{1}{p(z)}$ is defined for all $z \in \mathbb{C}$ and is entire (composition and quotient of analytic functions).

As $|z| \to \infty$:
$$|p(z)| \sim |a_n||z|^n \to \infty$$

So $|f(z)| = \frac{1}{|p(z)|} \to 0$.

In particular, $|f(z)| \leq 1$ for $|z|$ sufficiently large, say $|z| \geq R$.

On the compact set $|z| \leq R$, the continuous function $|f|$ attains its maximum $M$.

Therefore $|f(z)| \leq \max(1, M)$ for all $z \in \mathbb{C}$, so $f$ is bounded.

By Liouville's theorem, $f$ is constant, which implies $p$ is constant—a contradiction!

Therefore $p$ must have at least one root.

**Corollary**: A polynomial of degree $n$ has exactly $n$ roots (counting multiplicities).

## Picard's Theorems

Liouville's theorem can be extended:

**Picard's Little Theorem**: If $f$ is entire and non-constant, then $f$ takes on all complex values except possibly one.

**Example**: $e^z$ is entire and non-constant, so it takes all values except possibly one. Indeed, $e^z \neq 0$ for any $z$, but $e^z$ takes every other complex value.

**Picard's Great Theorem**: Near an essential singularity, $f$ takes on all complex values (with possibly one exception) infinitely often.

These are much deeper results, but Liouville's theorem provides the foundation.

## Applications

### Showing Functions Are Constant

To prove $f$ is constant, it suffices to show:
1. $f$ is entire
2. $f$ is bounded

### Example: Periodic Entire Functions

**Theorem**: If $f$ is entire and doubly periodic (i.e., $f(z + \omega_1) = f(z)$ and $f(z + \omega_2) = f(z)$ for all $z$, with $\omega_1, \omega_2$ linearly independent over $\mathbb{R}$), and $f$ is bounded, then $f$ is constant.

**Proof**: Double periodicity implies $f$ is periodic in two directions, so it's bounded on a fundamental parallelogram. By periodicity, it's bounded everywhere. By Liouville, $f$ is constant.

(Without the boundedness assumption, $f$ could be an elliptic function, which is not constant.)

### Harmonic Functions

**Theorem**: If $u: \mathbb{C} \to \mathbb{R}$ is harmonic and bounded, then $u$ is constant.

**Proof**: On a simply connected domain, $u$ is the real part of some analytic function $f$. If $u$ is bounded, we can construct $f$ to be bounded (using the Poisson integral or Cauchy's formula). By Liouville, $f$ is constant, so $u$ is constant.

## Generalizations

### Liouville for Other Norms

If $f$ is entire and $\int_{\mathbb{C}} |f(z)|^p \, dA < \infty$ for some $p \geq 1$, then $f \equiv 0$.

(Functions in $L^p(\mathbb{C})$ that are entire must be zero.)

### Liouville on Riemann Surfaces

On compact Riemann surfaces (like the Riemann sphere $\widehat{\mathbb{C}}$), every holomorphic function is constant.

On non-compact Riemann surfaces, there can be non-constant holomorphic functions, but they must satisfy growth conditions.

## Comparison with Real Analysis

In real analysis, there are many bounded differentiable functions on $\mathbb{R}$ that are non-constant: $\sin x, \arctan x$, etc.

The rigidity of Liouville's theorem is unique to complex analysis and stems from:
- The 2D nature of $\mathbb{C}$ (versus 1D of $\mathbb{R}$)
- Cauchy's integral formula
- The stronger implications of complex differentiability

## Related Results

### Maximum Modulus Principle

If $f$ is analytic on a domain $D$ and $|f|$ has a maximum at an interior point, then $f$ is constant.

### Minimum Modulus Principle

If $f$ is analytic and non-zero on $D$, and $|f|$ has a minimum at an interior point, then $f$ is constant.

### Schwarz Lemma

If $f$ is analytic on $|z| < 1$ with $|f(z)| \leq 1$ and $f(0) = 0$, then $|f(z)| \leq |z|$ and $|f'(0)| \leq 1$, with equality implying $f(z) = e^{i\theta}z$ for some $\theta$.

## Proof Variations

### Proof via Mean Value Property

For entire bounded $f$:
$$f(z_0) = \frac{1}{\pi R^2} \iint_{|z - z_0| \leq R} f(z) \, dA$$

Taking $R \to \infty$ and using boundedness shows $f$ must be constant.

### Proof via Maximum Modulus

If $f$ is entire and bounded, $|f|$ has no maximum on $\mathbb{C}$ (no compact closure). But a continuous function on a bounded domain attains its maximum. This forces $f$ to be constant.

## Summary

- **Liouville's theorem**: Bounded entire functions are constant
- **Proof**: Use Cauchy's inequality to show $f'(z) = 0$ everywhere
- **Key insight**: Analytic functions on all of $\mathbb{C}$ that don't grow must be constant
- **Fundamental Theorem of Algebra**: Proved via Liouville
- **No real analog**: Bounded differentiable functions on $\mathbb{R}$ need not be constant
- **Growth conditions**: Entire functions with polynomial growth are polynomials
- **Applications**: Periodic functions, harmonic functions, proving constancy
- **Generalizations**: Picard's theorems, results on Riemann surfaces
- One of the most beautiful and powerful results in complex analysis
- Demonstrates the rigid structure of analytic functions
