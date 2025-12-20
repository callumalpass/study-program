---
id: math401-topic-4-5
title: "Maximum Modulus Principle"
order: 5
---

# Fundamental Theorem of Algebra

The Fundamental Theorem of Algebra states that every non-constant polynomial with complex coefficients has at least one complex root. This remarkable result, despite its name involving "algebra," has no purely algebraic proof—all known proofs use analysis, topology, or algebra combined with analysis. Complex analysis provides one of the most elegant proofs via Liouville's theorem.

## Statement

**Theorem (Fundamental Theorem of Algebra)**: Every non-constant polynomial

$$p(z) = a_n z^n + a_{n-1}z^{n-1} + \cdots + a_1 z + a_0$$

with complex coefficients $a_0, \ldots, a_n \in \mathbb{C}$, $a_n \neq 0$, and $n \geq 1$, has at least one root in $\mathbb{C}$.

That is, there exists $z_0 \in \mathbb{C}$ such that $p(z_0) = 0$.

## Complete Factorization

**Corollary**: A polynomial of degree $n$ has exactly $n$ roots (counting multiplicities) and can be factored as:

$$p(z) = a_n(z - z_1)(z - z_2) \cdots (z - z_n)$$

where $z_1, \ldots, z_n \in \mathbb{C}$ are the roots (not necessarily distinct).

**Proof of corollary**: By the theorem, $p$ has a root $z_1$. By polynomial division:
$$p(z) = (z - z_1)q(z)$$

where $q$ is a polynomial of degree $n - 1$. Apply the theorem to $q$ to find $z_2$, and continue inductively.

## Proof Using Liouville's Theorem

This is the standard complex analysis proof.

**Proof**: Suppose $p(z)$ is a non-constant polynomial of degree $n \geq 1$ with no roots.

Define $f(z) = \frac{1}{p(z)}$. Since $p(z) \neq 0$ for all $z$, the function $f$ is well-defined on all of $\mathbb{C}$.

**Step 1**: $f$ is entire.

Since $p$ is a polynomial, it's analytic everywhere. Since $p \neq 0$, the quotient $f = 1/p$ is analytic everywhere. Thus $f$ is entire.

**Step 2**: $f$ is bounded.

As $|z| \to \infty$:
$$|p(z)| = |a_n z^n + \cdots + a_0| \geq |a_n||z|^n - |a_{n-1}||z|^{n-1} - \cdots - |a_0|$$

For $|z|$ sufficiently large:
$$|p(z)| \geq \frac{|a_n|}{2}|z|^n \to \infty$$

Therefore:
$$|f(z)| = \frac{1}{|p(z)|} \to 0 \text{ as } |z| \to \infty$$

In particular, there exists $R > 0$ such that $|f(z)| < 1$ for $|z| > R$.

On the compact set $\{z : |z| \leq R\}$, the continuous function $|f|$ attains its maximum $M$.

Thus:
$$|f(z)| \leq \max(1, M) \text{ for all } z \in \mathbb{C}$$

So $f$ is bounded.

**Step 3**: By Liouville's theorem, $f$ is constant.

But if $f = c$ (constant), then $p(z) = 1/c$ is also constant, contradicting the assumption that $\deg(p) \geq 1$.

**Conclusion**: The assumption that $p$ has no roots leads to a contradiction. Therefore $p$ must have at least one root.

## Historical Context

Despite the name "Fundamental Theorem of **Algebra**," this theorem was historically difficult to prove and resisted purely algebraic approaches for centuries.

**Key milestones**:
- **d'Alembert** (1746): First attempted proof (incomplete)
- **Gauss** (1799): First rigorous proof (topological/analytic)
- **Gauss** gave three more proofs over his lifetime (1816, 1816, 1849)
- **Liouville's approach** (19th century): Via complex analysis

Modern proofs use:
1. **Complex analysis** (Liouville's theorem, as shown above)
2. **Topology** (algebraic topology, degree theory)
3. **Algebra + analysis** (field theory + topological arguments)

No purely algebraic proof is known, highlighting the deep connection between algebra and analysis.

## Why Is It "Fundamental"?

The theorem is called "fundamental" because:

1. **Algebraic closure**: $\mathbb{C}$ is algebraically closed (every polynomial has roots)
2. **Field extension**: $\mathbb{C}$ is the algebraic closure of $\mathbb{R}$
3. **Universality**: Any field extension of $\mathbb{R}$ containing all polynomial roots must contain $\mathbb{C}$
4. **Simplification**: With this theorem, polynomial factorization becomes straightforward

## Examples

### Example 1: Quadratic

$$p(z) = z^2 + 1$$

Roots: $z^2 = -1 \implies z = \pm i$

Factorization: $p(z) = (z - i)(z + i)$

### Example 2: Cubic

$$p(z) = z^3 - 1$$

Roots: $z^3 = 1 \implies z = 1, e^{2\pi i/3}, e^{4\pi i/3}$

Factorization: $p(z) = (z - 1)(z - e^{2\pi i/3})(z - e^{4\pi i/3})$

### Example 3: Real Coefficients

$$p(z) = z^2 + z + 1$$

Roots: $z = \frac{-1 \pm \sqrt{1 - 4}}{2} = \frac{-1 \pm i\sqrt{3}}{2}$

Note: Complex conjugate pairs, as expected for real coefficients.

### Example 4: Higher Degree

$$p(z) = z^5 + z + 1$$

This has 5 complex roots (not easily found in closed form), but the theorem guarantees they exist.

## Consequences and Applications

### Algebraic Closure

**Definition**: A field $F$ is **algebraically closed** if every non-constant polynomial with coefficients in $F$ has a root in $F$.

The Fundamental Theorem of Algebra states: $\mathbb{C}$ is algebraically closed.

**Corollary**: $\mathbb{C}$ is the algebraic closure of $\mathbb{R}$.

### Real Polynomials

**Theorem**: Every polynomial with real coefficients factors over $\mathbb{R}$ into linear and quadratic factors.

**Proof**: Complex roots of real polynomials come in conjugate pairs. If $z = a + bi$ is a root of $p$ (with real coefficients), then so is $\bar{z} = a - bi$.

The product:
$$(z - (a + bi))(z - (a - bi)) = z^2 - 2az + (a^2 + b^2)$$

is a real quadratic. Thus $p$ factors into real linear factors (from real roots) and real quadratic factors (from complex conjugate pairs).

### Solving Polynomial Equations

The theorem guarantees solutions exist, enabling:
- Numerical root-finding algorithms (Newton's method, etc.)
- Symbolic factorization
- Perturbation theory for roots

### Rational Functions

**Corollary**: Every rational function $\frac{p(z)}{q(z)}$ can be written as:
$$\frac{p(z)}{q(z)} = h(z) + \sum_{j=1}^m \frac{A_j}{(z - z_j)^{k_j}}$$

where $h$ is a polynomial and the sum is partial fractions.

This is crucial for integration and Laplace transforms.

## Related Results

### Fundamental Theorem of Symmetric Functions

Every symmetric polynomial in $z_1, \ldots, z_n$ can be expressed in terms of elementary symmetric polynomials, which equal the coefficients of the polynomial having $z_1, \ldots, z_n$ as roots (up to sign).

### Vieta's Formulas

For $p(z) = a_n z^n + \cdots + a_0$ with roots $z_1, \ldots, z_n$:
$$\sum_{i=1}^n z_i = -\frac{a_{n-1}}{a_n}$$
$$\sum_{i < j} z_i z_j = \frac{a_{n-2}}{a_n}$$
$$\vdots$$
$$\prod_{i=1}^n z_i = (-1)^n \frac{a_0}{a_n}$$

### Abel-Ruffini Theorem

While roots exist (by FTA), there is no general formula for roots of polynomials of degree $\geq 5$ using radicals.

This shows existence (FTA) doesn't imply explicit solvability.

## Other Proofs (Brief Mention)

### Topological Proof

Uses winding numbers: As $|z| = R$ traverses a circle, $p(z)$ winds around the origin $n$ times (where $n = \deg(p)$). For $R$ small, $p$ doesn't wind. By continuity, $p$ must cross zero.

### Algebraic Proof (with Analysis)

Uses Galois theory combined with topological properties of $\mathbb{R}$.

### Minimum Modulus

$|p(z)|$ attains its minimum on $\mathbb{C}$. If $p$ has no roots, this minimum is positive. But expanding $p$ around the minimum point shows $|p|$ can be made smaller nearby—contradiction.

## Why No Purely Algebraic Proof?

The field $\mathbb{C}$ is constructed from $\mathbb{R}$, which is defined analytically (via Dedekind cuts or Cauchy sequences). The completeness of $\mathbb{R}$ is topological, not algebraic.

The FTA relies on this completeness (implicitly in Liouville's theorem, explicitly in topological proofs).

## Summary

- **Fundamental Theorem of Algebra**: Every non-constant polynomial has a complex root
- **Proof via Liouville**: Assume no roots $\implies$ $1/p$ is bounded entire $\implies$ constant $\implies$ contradiction
- **Corollary**: Polynomials factor completely over $\mathbb{C}$
- **Algebraic closure**: $\mathbb{C}$ is algebraically closed
- **Real polynomials**: Factor into linear and quadratic factors over $\mathbb{R}$
- **Historical**: No purely algebraic proof known
- **Applications**: Factorization, partial fractions, polynomial solving
- **Connections**: Vieta's formulas, Abel-Ruffini theorem, symmetric functions
- Demonstrates deep interplay between algebra and analysis
- One of the most important theorems in mathematics
