---
id: math401-topic-5-4
title: "Analytic Continuation"
order: 4
---

# Classification of Singularities

Singularities are points where a function fails to be analytic. Understanding the nature of these points is crucial for complex analysis. Laurent series provide the tool for classifying singularities into three fundamental types: removable, poles, and essential. This classification completely characterizes the behavior of functions near singular points and is essential for residue theory and contour integration.

## Types of Isolated Singularities

Let $f$ have an isolated singularity at $z_0$ (meaning $f$ is analytic in some punctured disk $0 < |z - z_0| < r$ for some $r > 0$, but not at $z_0$ itself).

An isolated singularity means there exists a neighborhood of $z_0$ containing no other singularities. This is in contrast to non-isolated singularities like branch points or accumulation points of singularities.

### Removable Singularity

**Definition**: $z_0$ is a **removable singularity** if $\lim_{z \to z_0} f(z)$ exists and is finite.

In this case, we can define $f(z_0) = \lim_{z \to z_0} f(z)$ to make $f$ analytic at $z_0$.

**Laurent series characterization**: All negative power terms vanish: $a_n = 0$ for all $n < 0$.

The Laurent series is actually a Taylor series:
$$f(z) = a_0 + a_1(z-z_0) + a_2(z-z_0)^2 + \cdots$$

**Riemann's Removable Singularity Theorem**: $z_0$ is a removable singularity if and only if $f$ is bounded in some punctured neighborhood of $z_0$.

**Proof Sketch**: If $f$ is bounded near $z_0$, say $|f(z)| \leq M$ for $0 < |z - z_0| < r$, then for the Laurent coefficients:
$$|a_n| = \left|\frac{1}{2\pi i} \oint_{|z-z_0|=\rho} \frac{f(z)}{(z-z_0)^{n+1}} dz\right| \leq \frac{1}{2\pi} \cdot 2\pi\rho \cdot \frac{M}{\rho^{n+1}} = \frac{M}{\rho^n}$$

For $n < 0$, letting $\rho \to 0$ gives $a_n = 0$.

**Examples**:

1. $f(z) = \frac{\sin z}{z}$ at $z = 0$:
   $$\frac{\sin z}{z} = \frac{1}{z}\left(z - \frac{z^3}{3!} + \frac{z^5}{5!} - \cdots\right) = 1 - \frac{z^2}{3!} + \frac{z^4}{5!} - \cdots$$

   No negative powers, so removable. Define $f(0) = 1$ to make $f$ entire.

2. $f(z) = \frac{e^z - 1}{z}$ at $z = 0$:
   $$\frac{e^z - 1}{z} = \frac{1}{z}\left(z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots\right) = 1 + \frac{z}{2!} + \frac{z^2}{3!} + \cdots$$

   Removable with $f(0) = 1$.

3. $f(z) = \frac{1 - \cos z}{z^2}$ at $z = 0$:
   $$\frac{1 - \cos z}{z^2} = \frac{1}{z^2}\left(1 - 1 + \frac{z^2}{2!} - \frac{z^4}{4!} + \cdots\right) = \frac{1}{2!} - \frac{z^2}{4!} + \cdots$$

   Removable with $f(0) = \frac{1}{2}$.

### Pole

**Definition**: $z_0$ is a **pole of order $m$** (where $m$ is a positive integer) if the Laurent series has the form:
$$f(z) = \frac{a_{-m}}{(z-z_0)^m} + \cdots + \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

with $a_{-m} \neq 0$ and $a_n = 0$ for all $n < -m$.

**Alternative characterization**: $z_0$ is a pole of order $m$ if and only if:
$$(z-z_0)^m f(z) = a_{-m} + a_{-m+1}(z-z_0) + \cdots$$
has a removable singularity at $z_0$ with $\lim_{z \to z_0} (z-z_0)^m f(z) = a_{-m} \neq 0$.

**Limit characterization**: $z_0$ is a pole if and only if $\lim_{z \to z_0} |f(z)| = \infty$.

**Simple pole**: A pole of order $m = 1$ is called a **simple pole**.

**Examples**:

1. $f(z) = \frac{1}{z}$ has a simple pole at $z = 0$ with Laurent series $\frac{1}{z}$ (just one term).

2. $f(z) = \frac{1}{z^2}$ has a pole of order 2 at $z = 0$.

3. $f(z) = \frac{z^2 + 1}{(z-1)^3}$ has a pole of order 3 at $z = 1$.

   To verify: $(z-1)^3 f(z) = z^2 + 1 \to 2$ as $z \to 1$, which is non-zero.

4. $f(z) = \frac{1}{z(z-1)}$ has simple poles at $z = 0$ and $z = 1$.

   Near $z = 0$: $f(z) = -\frac{1}{z} - 1 - z - \cdots$ (simple pole)

   Near $z = 1$: $f(z) = \frac{1}{z-1} + 1 + (z-1) + \cdots$ (simple pole)

5. $f(z) = \frac{\sin z}{z^3}$ has a pole of order 2 at $z = 0$:
   $$\frac{\sin z}{z^3} = \frac{1}{z^2} - \frac{1}{3!} + \frac{z^2}{5!} - \cdots$$

**Determining the order**: For a rational function $f(z) = \frac{p(z)}{q(z)}$ where $p(z_0) \neq 0$, the order of the pole at $z_0$ equals the multiplicity of the zero of $q$ at $z_0$.

### Essential Singularity

**Definition**: $z_0$ is an **essential singularity** if it is neither removable nor a pole.

**Laurent series characterization**: Infinitely many non-zero coefficients $a_n$ for $n < 0$.

**Limit behavior**: Neither $\lim_{z \to z_0} f(z)$ nor $\lim_{z \to z_0} |f(z)|$ exists (in the extended complex plane).

**Casorati-Weierstrass Theorem**: If $f$ has an essential singularity at $z_0$, then in every punctured neighborhood of $z_0$, the image $f(D^*(z_0, r))$ is dense in $\mathbb{C}$.

This means $f$ comes arbitrarily close to every complex value near an essential singularity.

**Picard's Great Theorem**: If $f$ has an essential singularity at $z_0$, then in every punctured neighborhood of $z_0$, $f$ takes on all complex values, with at most one exception, infinitely often.

This is a strengthening of Casorati-Weierstrass: not only does $f$ come close to every value, it actually equals every value (except possibly one) infinitely many times.

**Examples**:

1. $f(z) = e^{1/z}$ at $z = 0$:
   $$e^{1/z} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \frac{1}{3!z^3} + \cdots$$

   Infinitely many negative powers indicate an essential singularity.

   **Verification of Picard**: As $z \to 0$ along different paths, $e^{1/z}$ approaches all complex values except 0. For instance:
   - Along positive real axis: $e^{1/x} \to \infty$
   - Along negative real axis: $e^{1/x} \to 0$
   - Along imaginary axis: $e^{1/(it)} = e^{-i/t}$ spirals around the unit circle

2. $f(z) = \sin(1/z)$ at $z = 0$:
   $$\sin(1/z) = \frac{1}{z} - \frac{1}{3!z^3} + \frac{1}{5!z^5} - \cdots$$

   Essential singularity with infinitely many odd negative powers.

3. $f(z) = \cos(1/z) + e^{1/z}$ at $z = 0$:

   Both terms have essential singularities, so the sum does too.

4. $f(z) = e^{1/z^2}$ at $z = 0$:
   $$e^{1/z^2} = 1 + \frac{1}{z^2} + \frac{1}{2!z^4} + \frac{1}{3!z^6} + \cdots$$

   Essential singularity with infinitely many even negative powers.

## Determining Singularity Type

There are several practical methods for classifying a singularity:

**Method 1: Compute the Laurent series** and examine the principal part:
- No negative powers → removable
- Finitely many negative powers → pole (order = highest negative power)
- Infinitely many negative powers → essential

**Method 2: Evaluate the limit**:
- If $\lim_{z \to z_0} f(z)$ exists and is finite → removable
- If $\lim_{z \to z_0} |f(z)| = \infty$ → pole
- If neither limit exists → essential

**Method 3: For rational functions**, analyze zeros and poles directly:
- Denominator zero, numerator non-zero → pole
- Both zero → cancel common factors, then analyze

**Method 4: Check $(z - z_0)^m f(z)$** for increasing $m$:
- Find smallest $m$ such that $\lim_{z \to z_0} (z-z_0)^m f(z)$ exists and is non-zero
- If $m = 0$: removable
- If $m > 0$: pole of order $m$
- If no such $m$ exists: essential

**Method 5: For compositions**, use known singularities:
- If $g(z) \to \infty$ as $z \to z_0$ and $f(\infty)$ is essential, then $f(g(z))$ has essential singularity at $z_0$

## Singularities at Infinity

We can classify the behavior of $f$ at infinity by examining $g(w) = f(1/w)$ at $w = 0$.

**Definition**: The point at infinity $z = \infty$ is:
- A removable singularity if $\lim_{z \to \infty} f(z)$ exists and is finite
- A pole of order $m$ if $\lim_{z \to \infty} z^m f(z)$ exists and is non-zero
- An essential singularity otherwise

**Examples**:

1. $f(z) = z^2$ has a pole of order 2 at $\infty$ since $g(w) = 1/w^2$ has a pole of order 2 at $w = 0$.

2. $f(z) = e^z$ has an essential singularity at $\infty$ since $g(w) = e^{1/w}$ has an essential singularity at $w = 0$.

3. $f(z) = \frac{1}{z}$ has a removable singularity at $\infty$ with value 0.

## Meromorphic Functions

**Definition**: A function that is analytic except for poles is called **meromorphic**.

Equivalently, $f$ is meromorphic if it can be written as $f = g/h$ where $g$ and $h$ are entire functions.

**Examples**:
- All rational functions are meromorphic
- $\tan z = \sin z / \cos z$ is meromorphic (poles where $\cos z = 0$)
- $\csc z = 1/\sin z$ is meromorphic

## Common Mistakes Students Make

1. **Confusing removable singularities with poles**: If $\lim_{z \to z_0} f(z)$ exists and is finite, it's removable, not a pole.

2. **Incorrectly determining pole order**: The order is the highest power in the denominator after cancellation, not before.

3. **Forgetting to expand**: To classify via Laurent series, you must actually compute several terms, not just look at the original form.

4. **Misapplying limit tests**: Remember that $\lim_{z \to z_0} |f(z)| = \infty$ implies pole, but the converse isn't quite right for essential singularities.

5. **Assuming composition preserves type**: If $f$ has a pole and $g$ has a pole, $f \circ g$ might have an essential singularity.

## Summary

- **Removable singularity**: $\lim_{z \to z_0} f(z)$ exists and is finite; no negative powers in Laurent series
- **Pole of order $m$**: $(z-z_0)^m f(z)$ has removable singularity with non-zero limit; exactly $m$ negative powers in Laurent series
- **Essential singularity**: Neither removable nor pole; infinitely many negative powers in Laurent series
- Classification methods: Laurent series, limits, or structural analysis
- Casorati-Weierstrass and Picard theorems describe behavior near essential singularities
- Crucial for residue calculus and understanding function behavior
- Meromorphic functions have only poles (no essential singularities)
