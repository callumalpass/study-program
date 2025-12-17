# Morera's Theorem

Morera's theorem is the converse of Cauchy's theorem: while Cauchy's theorem states that integrals of analytic functions around closed curves vanish, Morera's theorem states that if all closed curve integrals vanish, then the function is analytic. This provides a powerful alternative method for proving analyticity without checking the Cauchy-Riemann equations.

## Statement of Morera's Theorem

**Theorem (Morera's Theorem)**: Let $f$ be continuous on a domain $D$. If

$$\oint_\gamma f(z) \, dz = 0$$

for every closed contour $\gamma$ in $D$, then $f$ is analytic on $D$.

Named after Giacinto Morera (1856-1909), this theorem is sometimes called the **converse of Cauchy's theorem**.

## Proof of Morera's Theorem

**Step 1**: Since all closed contour integrals vanish, the integrals are path-independent in $D$.

**Step 2**: Fix $z_0 \in D$ and define:
$$F(z) = \int_{z_0}^z f(\zeta) \, d\zeta$$

By path independence, this is well-defined (independent of the path from $z_0$ to $z$).

**Step 3**: We show $F$ is analytic with $F'(z) = f(z)$.

For $z \in D$ and small $h$ with $z + h \in D$:
$$F(z + h) - F(z) = \int_z^{z+h} f(\zeta) \, d\zeta$$

Take the straight line from $z$ to $z + h$:
$$F(z + h) - F(z) = \int_0^1 f(z + th) \cdot h \, dt = h \int_0^1 f(z + th) \, dt$$

Therefore:
$$\frac{F(z + h) - F(z)}{h} = \int_0^1 f(z + th) \, dt$$

**Step 4**: As $h \to 0$, by continuity of $f$:
$$\lim_{h \to 0} \int_0^1 f(z + th) \, dt = \int_0^1 f(z) \, dt = f(z)$$

Thus $F'(z) = f(z)$.

**Step 5**: Since $F$ is differentiable (hence analytic), and analytic functions are infinitely differentiable, $F$ is analytic on $D$.

**Step 6**: Therefore $f = F'$ is analytic on $D$ (derivative of analytic function is analytic).

## Comparison with Cauchy's Theorem

| Cauchy's Theorem | Morera's Theorem |
|------------------|------------------|
| $f$ analytic $\implies$ $\oint f = 0$ | $\oint f = 0$ for all $\gamma$ $\implies$ $f$ analytic |
| Direct implication | Converse |
| Requires differentiability | Only requires continuity |
| Fundamental result | Useful test for analyticity |

Together, they characterize analyticity in terms of contour integrals:

**$f$ analytic on $D$ $\iff$ $f$ continuous and $\oint_\gamma f = 0$ for all closed $\gamma$ in $D$**

## Examples

### Example 1: Proving Analyticity

**Show that** $f(z) = \lim_{n \to \infty} \frac{z^n}{n!}$ is analytic for $|z| < 1$.

We recognize this as $e^z$ for $|z| < 1$, but let's use Morera's theorem.

The sequence $f_n(z) = \frac{z^n}{n!}$ consists of analytic functions, so:
$$\oint_\gamma f_n(z) \, dz = 0$$

for any closed $\gamma$ in $|z| < 1$.

By uniform convergence (which can be shown):
$$\oint_\gamma f(z) \, dz = \oint_\gamma \lim_{n \to \infty} f_n(z) \, dz = \lim_{n \to \infty} \oint_\gamma f_n(z) \, dz = 0$$

Since $f$ is continuous (by uniform convergence) and all closed integrals vanish, Morera's theorem implies $f$ is analytic.

### Example 2: Series of Analytic Functions

**Theorem**: If $\{f_n\}$ is a sequence of analytic functions on $D$ that converges uniformly to $f$ on compact subsets of $D$, then $f$ is analytic on $D$.

**Proof using Morera**: For any closed contour $\gamma$ in $D$:
$$\oint_\gamma f = \lim_{n \to \infty} \oint_\gamma f_n = 0$$

(interchanging limit and integral is justified by uniform convergence on the compact set $\gamma$).

Since $f$ is continuous (by uniform convergence) and all integrals vanish, $f$ is analytic by Morera's theorem.

### Example 3: Analyticity of Limits

**Show** $f(z) = \sum_{n=0}^{\infty} \frac{z^n}{n^2 + 1}$ is analytic for $|z| < 1$.

Each term $\frac{z^n}{n^2 + 1}$ is analytic. The series converges uniformly on $|z| \leq r$ for $r < 1$ (by comparison with geometric series).

By the theorem above (which uses Morera), $f$ is analytic.

## Weaker Forms of Morera's Theorem

**Theorem (Morera for Triangles)**: If $f$ is continuous on $D$ and $\int_{\partial T} f = 0$ for every triangle $T$ in $D$, then $f$ is analytic on $D$.

**Theorem (Morera for Rectangles)**: If $f$ is continuous on $D$ and $\int_{\partial R} f = 0$ for every rectangle $R$ in $D$, then $f$ is analytic on $D$.

These weaker forms suffice because:
- Any closed curve can be approximated by polygons
- Polygons can be decomposed into triangles/rectangles
- If integrals over all triangles vanish, integrals over all closed curves vanish

## Applications

### Testing Analyticity

Morera's theorem provides an alternative to checking Cauchy-Riemann equations:

**To show $f$ is analytic**:
1. Verify $f$ is continuous
2. Show $\oint_\gamma f = 0$ for all closed $\gamma$ (or just triangles/rectangles)

### Analyticity of Integrals

**Theorem**: If $f(z, t)$ is continuous in $z$ and $t$, and analytic in $z$ for each $t \in [a, b]$, then:
$$F(z) = \int_a^b f(z, t) \, dt$$

is analytic in $z$.

**Proof**: For any closed contour $\gamma$:
$$\oint_\gamma F(z) \, dz = \oint_\gamma \int_a^b f(z, t) \, dt \, dz = \int_a^b \oint_\gamma f(z, t) \, dz \, dt$$

(interchanging order of integration). Since $f(\cdot, t)$ is analytic for each $t$:
$$= \int_a^b 0 \, dt = 0$$

By Morera's theorem, $F$ is analytic.

### Example: Analyticity of Parameter Integrals

**Show** $F(z) = \int_0^1 e^{zt} \, dt$ is analytic for all $z$.

For each $t \in [0, 1]$, $f(z, t) = e^{zt}$ is entire in $z$.

By the theorem above, $F$ is analytic.

(We can compute: $F(z) = \frac{e^z - 1}{z}$ for $z \neq 0$, and $F(0) = 1$ by continuity.)

## Pompeiu's Theorem

A generalization of Morera:

**Theorem (Pompeiu)**: Let $f$ be continuous on $D$. If there exists $r > 0$ such that
$$\int_{\partial D(z_0, r)} f(z) \, dz = 0$$

for all disks $D(z_0, r)$ in $D$ (with fixed $r$), then $f$ is analytic on $D$.

This shows we don't need all closed curves—just circles of a fixed radius suffice!

## Connection to Harmonic Functions

If $u$ is continuous and satisfies the mean value property:
$$u(z_0) = \frac{1}{2\pi} \int_0^{2\pi} u(z_0 + re^{i\theta}) \, d\theta$$

for all disks in $D$, then $u$ is harmonic.

This is analogous to Morera: a property that holds for all small disks implies a strong regularity property.

## Morera vs. Cauchy-Riemann

| Method | Requirements | Advantages | Disadvantages |
|--------|-------------|------------|---------------|
| Cauchy-Riemann | Partial derivatives exist and satisfy $u_x = v_y$, $u_y = -v_x$ | Direct test | Requires computing partials |
| Morera | Continuous; all closed integrals vanish | Good for limits and series | May be hard to verify integrals vanish |

Morera is particularly useful when:
- Dealing with limits of analytic functions
- Showing integrals are analytic
- Avoiding explicit differentiation

## Historical Note

Giacinto Morera proved this theorem in 1886. It completed the characterization of analytic functions in terms of contour integrals, complementing Cauchy's work.

The theorem shows that the "global" property (vanishing integrals) implies the "local" property (differentiability).

## Summary

- **Morera's theorem**: If $f$ continuous and $\oint_\gamma f = 0$ for all closed $\gamma$, then $f$ is analytic
- **Proof**: Construct antiderivative via path-independent integrals, then differentiate
- **Converse of Cauchy's theorem**: Together they characterize analyticity
- **Weaker forms**: Suffices to check triangles or rectangles
- **Applications**:
  - Proving limits of analytic functions are analytic
  - Showing parameter-dependent integrals are analytic
  - Alternative to Cauchy-Riemann equations
- **Key insight**: Global integral condition implies local differentiability
- Particularly useful for uniform limits and series
- Essential tool in proving analyticity without explicit differentiation
