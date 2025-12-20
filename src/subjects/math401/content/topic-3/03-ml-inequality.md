# The ML Inequality and Estimation Lemma

The ML inequality is a fundamental tool for estimating the magnitude of contour integrals without computing them explicitly. This estimation technique is essential for proving theoretical results, establishing bounds in applications, and demonstrating that certain integrals vanish in limiting cases. The ML inequality combines the maximum value of a function on a curve with the length of the curve to bound the integral.

## Statement of the ML Inequality

**Theorem (ML Inequality)**: Let $f$ be continuous on a piecewise smooth curve $\gamma$ of length $L$. If $|f(z)| \leq M$ for all $z$ on $\gamma$, then:

$$\left|\int_\gamma f(z) \, dz\right| \leq ML$$

The name "ML" comes from: **M**aximum times **L**ength.

## Proof of the ML Inequality

Let $\gamma: [a, b] \to \mathbb{C}$ parametrize the curve.

$$\left|\int_\gamma f(z) \, dz\right| = \left|\int_a^b f(\gamma(t)) \gamma'(t) \, dt\right|$$

By the triangle inequality for integrals:

$$\leq \int_a^b |f(\gamma(t)) \gamma'(t)| \, dt = \int_a^b |f(\gamma(t))| \cdot |\gamma'(t)| \, dt$$

Since $|f(\gamma(t))| \leq M$ for all $t$:

$$\leq M \int_a^b |\gamma'(t)| \, dt = M \cdot L$$

where $L = \int_a^b |\gamma'(t)| \, dt$ is the arc length.

## Computing Arc Length

For common curves:

1. **Straight line from $z_0$ to $z_1$**:
   $$L = |z_1 - z_0|$$

2. **Circle of radius $r$**:
   $$L = 2\pi r$$

3. **Circular arc** of radius $r$ subtending angle $\theta$ (in radians):
   $$L = r\theta$$

4. **Ellipse** with semi-axes $a, b$:
   $$L = 4aE(e)$$
   where $E$ is the complete elliptic integral and $e$ is eccentricity (no simple closed form).

5. **Rectangle with sides $a, b$**:
   $$L = 2(a + b)$$

## Basic Examples

### Example 1: Polynomial on a Circle

**Estimate** $\left|\int_\gamma (z^2 + 3z + 1) \, dz\right|$ where $\gamma$ is the circle $|z| = 2$.

On $|z| = 2$:
$$|z^2 + 3z + 1| \leq |z|^2 + 3|z| + 1 = 4 + 6 + 1 = 11$$

So $M = 11$.

The length is $L = 2\pi \cdot 2 = 4\pi$.

By ML inequality:
$$\left|\int_\gamma (z^2 + 3z + 1) \, dz\right| \leq 11 \cdot 4\pi = 44\pi$$

(In fact, the integral equals $0$ since the integrand is entire and the curve is closed—by Cauchy's theorem.)

### Example 2: Exponential Function

**Estimate** $\left|\int_\gamma e^z \, dz\right|$ where $\gamma$ is the straight line from $0$ to $1 + i$.

On this line, $\gamma(t) = t(1 + i)$ for $t \in [0, 1]$, so $z = t + it$.

$$|e^z| = e^{\text{Re}(z)} = e^t \leq e^1 = e \quad \text{for } t \in [0, 1]$$

So $M = e$.

The length is $L = |1 + i - 0| = \sqrt{2}$.

By ML inequality:
$$\left|\int_\gamma e^z \, dz\right| \leq e\sqrt{2}$$

(In fact, $\int_\gamma e^z \, dz = e^{1+i} - e^0 = e^{1+i} - 1$, so $|\int_\gamma e^z \, dz| = |e^{1+i} - 1| \approx 1.47$, which is indeed $\leq e\sqrt{2} \approx 3.84$.)

### Example 3: Rational Function

**Estimate** $\left|\int_\gamma \frac{z + 1}{z^2 + 4} \, dz\right|$ where $\gamma$ is the circle $|z| = 3$.

On $|z| = 3$:
- Numerator: $|z + 1| \leq |z| + 1 = 4$
- Denominator: $|z^2 + 4| \geq ||z|^2 - 4| = |9 - 4| = 5$ (reverse triangle inequality)

So:
$$\left|\frac{z + 1}{z^2 + 4}\right| \leq \frac{4}{5}$$

Thus $M = 4/5$ and $L = 6\pi$:

$$\left|\int_\gamma \frac{z + 1}{z^2 + 4} \, dz\right| \leq \frac{4}{5} \cdot 6\pi = \frac{24\pi}{5}$$

## Refined Estimates

### Tighter Bounds on Denominators

For $|z| = R$ and polynomial $P(z) = a_n z^n + \cdots + a_0$ with $a_n \neq 0$:

As $R \to \infty$:
$$|P(z)| \sim |a_n| R^n$$

More precisely, for sufficiently large $R$:
$$|P(z)| \geq \frac{|a_n| R^n}{2}$$

**Example**: For $P(z) = z^3 - 2z + 1$ on $|z| = 10$:
$$|P(z)| \geq \frac{1000}{2} - 20 - 1 \approx 479$$

This is much better than the crude estimate $||z|^3 - |2z| - 1| = |1000 - 20 - 1|$.

### Maximum on a Curve

Sometimes we can find the exact maximum of $|f(z)|$ on $\gamma$ rather than using triangle inequality estimates.

**Example**: For $f(z) = \frac{1}{z}$ on $|z| = r$:
$$|f(z)| = \frac{1}{|z|} = \frac{1}{r}$$

So $M = 1/r$ exactly, giving:
$$\left|\int_{|z|=r} \frac{1}{z} \, dz\right| \leq \frac{1}{r} \cdot 2\pi r = 2\pi$$

(The actual value is $2\pi$, so this bound is sharp!)

## Applications to Limits

The ML inequality is particularly powerful for showing that integrals vanish as a parameter varies.

### Integrals Over Large Circles

**Theorem**: If $f(z) = O(1/z^{1+\epsilon})$ as $|z| \to \infty$ for some $\epsilon > 0$, then:

$$\lim_{R \to \infty} \int_{|z|=R} f(z) \, dz = 0$$

**Proof**: We have $|f(z)| \leq \frac{K}{|z|^{1+\epsilon}}$ for $|z|$ large enough.

On $|z| = R$:
$$\left|\int_{|z|=R} f(z) \, dz\right| \leq \frac{K}{R^{1+\epsilon}} \cdot 2\pi R = \frac{2\pi K}{R^\epsilon} \to 0$$

### Example: Jordan's Lemma (Preview)

For $f(z) = \frac{e^{iz}}{z^2 + 1}$ on the upper semicircle $\gamma_R$ of radius $R > 1$:

On the upper half ($\text{Im}(z) \geq 0$):
$$|e^{iz}| = e^{-\text{Im}(z)} \leq 1$$

And:
$$\left|\frac{1}{z^2 + 1}\right| \leq \frac{1}{R^2 - 1}$$

So:
$$\left|\int_{\gamma_R} \frac{e^{iz}}{z^2 + 1} \, dz\right| \leq \frac{1}{R^2 - 1} \cdot \pi R = \frac{\pi R}{R^2 - 1} \to 0 \text{ as } R \to \infty$$

This type of estimate is crucial for evaluating real integrals using contour integration.

## Estimation with Multiple Parameters

### Example: Dependence on Position

**Estimate** $\left|\int_\gamma \frac{1}{z - z_0} \, dz\right|$ where $\gamma$ is the circle $|z| = R$ and $|z_0| = r < R$.

On $|z| = R$:
$$|z - z_0| \geq ||z| - |z_0|| = R - r$$

So:
$$\left|\frac{1}{z - z_0}\right| \leq \frac{1}{R - r}$$

Thus:
$$\left|\int_\gamma \frac{1}{z - z_0} \, dz\right| \leq \frac{2\pi R}{R - r}$$

(The actual value is $2\pi i$ if $|z_0| < R$, and $0$ if $|z_0| > R$.)

## When ML Inequality is Sharp

The bound is **sharp** (achieved with equality) when:
1. $|f(z)| = M$ (constant) on $\gamma$
2. $\arg(f(z)\gamma'(t))$ is constant (integral accumulates in one direction)

**Example**: $\int_{|z|=1} 1 \, dz$ where $\gamma(t) = e^{it}$, $t \in [0, 2\pi]$:
- $|f| = 1 = M$
- $\gamma'(t) = ie^{it}$
- $f \gamma'(t) = ie^{it}$ has constant argument $\arg(i) = \pi/2$

Wait, this integral is $2\pi i$, so $|\int| = 2\pi = ML$. Actually the integral is:

$$\int_0^{2\pi} 1 \cdot ie^{it} \, dt = i\int_0^{2\pi} e^{it} \, dt = i[e^{it}/i]_0^{2\pi} = [e^{it}]_0^{2\pi} = 1 - 1 = 0$$

Let me reconsider. For $\int_{|z|=1} \frac{1}{z} \, dz = 2\pi i$:
- $M = 1$
- $L = 2\pi$
- $|\int| = 2\pi = ML$ ✓ (sharp!)

## Advanced Applications

### Showing Functions are Constant

**Theorem (Liouville's Theorem - sketch)**: If $f$ is entire and bounded, then $f$ is constant.

**Proof idea**: Use Cauchy's formula (next topic) and ML inequality to show $f'(z) = 0$ everywhere.

### Estimating Derivatives

**Cauchy's estimate** (preview): If $f$ is analytic in $|z - z_0| \leq R$ with $|f(z)| \leq M$, then:

$$|f^{(n)}(z_0)| \leq \frac{n! M}{R^n}$$

This uses ML inequality on the integral formula for derivatives.

## Practical Tips for Using ML Inequality

1. **Identify the curve**: Compute its length $L$
2. **Find maximum of $|f|$**: Use triangle inequality, algebraic estimates, or calculus
3. **Apply the inequality**: $|\int| \leq ML$
4. **Check if bound is useful**: Sometimes crude estimates suffice; other times, need refinement

### Common Pitfalls

- **Wrong arc length**: Remember $L = 2\pi r$ for full circle, not $\pi r$
- **Loose estimates**: Overuse of triangle inequality can give weak bounds
- **Forgetting absolute value**: Must bound $|f|$, not $f$

## Comparison with Real Integration

In real analysis, we have:
$$\left|\int_a^b f(x) \, dx\right| \leq \int_a^b |f(x)| \, dx \leq M(b - a)$$

The complex ML inequality is analogous, with $(b - a)$ replaced by arc length $L$.

However, complex integrals have richer geometry due to the 2D nature of $\mathbb{C}$.

## Summary

- **ML Inequality**: $|\int_\gamma f(z) \, dz| \leq ML$ where $|f| \leq M$ and $L = $ arc length
- **Arc length**: $L = \int_a^b |\gamma'(t)| \, dt$
- Common lengths: circle ($2\pi r$), line ($|z_1 - z_0|$), arc ($r\theta$)
- **Applications**:
  - Estimating integrals without computing them
  - Showing integrals vanish in limits (e.g., as $R \to \infty$)
  - Proving theoretical results (Liouville's theorem, Cauchy estimates)
- **Technique**: Find $M = \sup_{\gamma} |f(z)|$ using triangle inequality or exact analysis
- The bound is sharp when $|f|$ is constant and the integrand accumulates coherently
- Essential tool for contour integration, especially in residue calculus
- Combines geometric (arc length) and analytic (function bounds) information
