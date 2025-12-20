---
id: math401-topic-5-3
title: "Taylor Series Expansion"
order: 3
---

# Laurent Series and Annular Regions

Laurent series extend power series to functions with singularities by allowing negative powers. While Taylor series require analyticity at the center, Laurent series work in annular regions (rings) around singularities. This generalization is crucial for studying functions near poles and essential singularities, and it forms the foundation for residue theory, one of the most powerful tools in complex analysis.

## Definition

A **Laurent series** centered at $z_0$ is a series of the form:

$$\sum_{n=-\infty}^{\infty} a_n(z - z_0)^n = \cdots + \frac{a_{-2}}{(z-z_0)^2} + \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

The series splits into two parts:
- **Principal part** (negative powers): $\sum_{n=1}^{\infty} \frac{a_{-n}}{(z-z_0)^n}$
- **Analytic part** (non-negative powers): $\sum_{n=0}^{\infty} a_n(z-z_0)^n$

The principal part captures the singular behavior of the function, while the analytic part is a regular Taylor series.

**Important observation**: A Laurent series is really two separate series:
1. $\sum_{n=0}^{\infty} a_n(z - z_0)^n$ - converges in a disk $|z - z_0| < R$
2. $\sum_{n=1}^{\infty} \frac{a_{-n}}{(z-z_0)^n}$ - converges outside a disk $|z - z_0| > r$

The Laurent series converges in the annulus where both parts converge: $r < |z - z_0| < R$.

## Laurent's Theorem

**Theorem (Laurent's Theorem)**: If $f$ is analytic in the annulus $r < |z - z_0| < R$, then $f$ has a unique Laurent series representation:

$$f(z) = \sum_{n=-\infty}^{\infty} a_n(z-z_0)^n$$

valid throughout the annulus, with coefficients given by:

$$a_n = \frac{1}{2\pi i} \oint_{|z-z_0|=\rho} \frac{f(z)}{(z-z_0)^{n+1}} dz$$

where $r < \rho < R$ (any radius within the annulus).

**Proof Sketch**: For a point $z$ in the annulus, choose two circles $\gamma_1$ and $\gamma_2$ with radii $r_1$ and $r_2$ such that $r < r_1 < |z - z_0| < r_2 < R$. By Cauchy's integral formula:

$$f(z) = \frac{1}{2\pi i} \oint_{\gamma_2} \frac{f(w)}{w-z} dw - \frac{1}{2\pi i} \oint_{\gamma_1} \frac{f(w)}{w-z} dw$$

The first integral gives the analytic part (expanded as for Taylor series), and the second integral gives the principal part (expanded differently because $|z - z_0| > |w - z_0|$ on $\gamma_1$).

**Uniqueness**: The coefficients are uniquely determined by the integral formula, so the Laurent series representation is unique for a given annulus.

## Computing Laurent Series

There are several practical methods for finding Laurent series:

**Method 1: Use known Taylor series** and algebraic manipulation.

This is the most common approach. Start with known series and use substitution, partial fractions, multiplication, and division.

**Method 2: Partial fractions** for rational functions.

Decompose rational functions into simpler fractions, then expand each term appropriately.

**Method 3: Direct integration** using Cauchy's formula.

This is theoretically important but rarely practical.

**Method 4: Geometric series expansion**.

Use $\frac{1}{1-u} = \sum_{n=0}^{\infty} u^n$ when $|u| < 1$ or $\frac{1}{1-u} = -\frac{1}{u} \cdot \frac{1}{1-1/u} = -\sum_{n=0}^{\infty} \frac{1}{u^{n+1}}$ when $|u| > 1$.

## Detailed Examples

### Example 1: $\frac{1}{z(z-1)}$ for $0 < |z| < 1$

Using partial fractions:
$$\frac{1}{z(z-1)} = \frac{A}{z} + \frac{B}{z-1}$$

Solving: $1 = A(z-1) + Bz$. Setting $z = 0$: $A = -1$. Setting $z = 1$: $B = 1$.

$$\frac{1}{z(z-1)} = -\frac{1}{z} + \frac{1}{z-1}$$

For the annulus $0 < |z| < 1$, we need to expand $\frac{1}{z-1}$ appropriately:
$$\frac{1}{z-1} = -\frac{1}{1-z} = -\sum_{n=0}^{\infty} z^n \quad (|z| < 1)$$

Therefore:
$$\frac{1}{z(z-1)} = -\frac{1}{z} - \sum_{n=0}^{\infty} z^n = -\frac{1}{z} - 1 - z - z^2 - \cdots$$

The principal part is $-\frac{1}{z}$ (only one term), and the analytic part is $-1 - z - z^2 - \cdots$.

### Example 2: $e^{1/z}$ for $z \neq 0$

Substitute $w = 1/z$ into the Taylor series for $e^w$:
$$e^{1/z} = \sum_{n=0}^{\infty} \frac{(1/z)^n}{n!} = \sum_{n=0}^{\infty} \frac{1}{n! z^n} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \frac{1}{3!z^3} + \cdots$$

This series has infinitely many negative powers, indicating an essential singularity at $z = 0$.

The analytic part is just $a_0 = 1$, and the principal part is $\sum_{n=1}^{\infty} \frac{1}{n! z^n}$.

### Example 3: $\frac{z}{(z-1)(z-2)}$ for $1 < |z| < 2$

Using partial fractions:
$$\frac{z}{(z-1)(z-2)} = \frac{A}{z-1} + \frac{B}{z-2}$$

Solving: $z = A(z-2) + B(z-1)$. Setting $z = 1$: $A = -1$. Setting $z = 2$: $B = 2$.

$$\frac{z}{(z-1)(z-2)} = -\frac{1}{z-1} + \frac{2}{z-2}$$

For $1 < |z| < 2$, we need to expand each term appropriately:

For $\frac{1}{z-1}$: Since $|z| > 1$, we have $|1/z| < 1$, so:
$$\frac{1}{z-1} = \frac{1}{z} \cdot \frac{1}{1-1/z} = \frac{1}{z} \sum_{n=0}^{\infty} \left(\frac{1}{z}\right)^n = \sum_{n=0}^{\infty} \frac{1}{z^{n+1}} = \frac{1}{z} + \frac{1}{z^2} + \frac{1}{z^3} + \cdots$$

For $\frac{1}{z-2}$: Since $|z| < 2$, we have $|z/2| < 1$, so:
$$\frac{1}{z-2} = -\frac{1}{2-z} = -\frac{1}{2} \cdot \frac{1}{1-z/2} = -\frac{1}{2} \sum_{n=0}^{\infty} \left(\frac{z}{2}\right)^n = -\sum_{n=0}^{\infty} \frac{z^n}{2^{n+1}}$$

Therefore:
$$\frac{z}{(z-1)(z-2)} = -\left(\frac{1}{z} + \frac{1}{z^2} + \cdots\right) + 2\left(-\frac{1}{2} - \frac{z}{4} - \frac{z^2}{8} - \cdots\right)$$

$$= -\frac{1}{z} - \frac{1}{z^2} - \frac{1}{z^3} - \cdots - 1 - \frac{z}{2} - \frac{z^2}{4} - \cdots$$

### Example 4: $\sin(z)/z^3$ for $0 < |z| < \infty$

Start with the Taylor series for $\sin z$:
$$\sin z = z - \frac{z^3}{3!} + \frac{z^5}{5!} - \frac{z^7}{7!} + \cdots$$

Dividing by $z^3$:
$$\frac{\sin z}{z^3} = \frac{1}{z^2} - \frac{1}{3!} + \frac{z^2}{5!} - \frac{z^4}{7!} + \cdots$$

The principal part is $\frac{1}{z^2}$ (pole of order 2), and the analytic part is $-\frac{1}{6} + \frac{z^2}{120} - \cdots$.

### Example 5: $\frac{1}{z^2(z-1)}$ for $0 < |z| < 1$

Using partial fractions:
$$\frac{1}{z^2(z-1)} = \frac{A}{z} + \frac{B}{z^2} + \frac{C}{z-1}$$

Multiplying by $z^2(z-1)$: $1 = Az(z-1) + B(z-1) + Cz^2$

Setting $z = 0$: $B = -1$. Setting $z = 1$: $C = 1$. Comparing $z^2$ coefficients: $A + C = 0$, so $A = -1$.

$$\frac{1}{z^2(z-1)} = -\frac{1}{z} - \frac{1}{z^2} + \frac{1}{z-1}$$

For $0 < |z| < 1$:
$$\frac{1}{z-1} = -\frac{1}{1-z} = -\sum_{n=0}^{\infty} z^n$$

Therefore:
$$\frac{1}{z^2(z-1)} = -\frac{1}{z^2} - \frac{1}{z} - 1 - z - z^2 - \cdots$$

## Different Annular Regions

The same function can have different Laurent series in different annular regions.

**Example**: $\frac{1}{(z-1)(z-2)}$ has three different Laurent series:

1. **For $0 < |z| < 1$**: Both singularities are outside, expand both terms as Taylor series.
2. **For $1 < |z| < 2$**: One singularity inside, one outside (Example 3 above).
3. **For $|z| > 2$**: Both singularities are inside, expand both terms as Laurent series in negative powers.

Each region has a unique series representation.

## Connection to Singularity Classification

The Laurent series directly reveals the type of singularity:

- **Removable singularity**: All $a_n = 0$ for $n < 0$ (no principal part)
- **Pole of order $m$**: $a_{-m} \neq 0$ but $a_n = 0$ for $n < -m$ (finitely many negative terms)
- **Essential singularity**: Infinitely many non-zero $a_n$ for $n < 0$

This provides a systematic way to classify singularities without computing limits.

## Residue

The coefficient $a_{-1}$ in the Laurent series has special importance and is called the **residue**:
$$\text{Res}(f, z_0) = a_{-1}$$

This coefficient is crucial for the residue theorem, which evaluates contour integrals.

## Common Mistakes Students Make

1. **Wrong expansion for the annulus**: Always check whether $|z - z_0|$ is greater or less than the modulus of constants when using geometric series.

2. **Forgetting uniqueness per annulus**: Different annular regions yield different Laurent series for the same function.

3. **Confusing Taylor and Laurent**: Taylor series are special cases with no negative powers ($r = 0$).

4. **Incorrect partial fractions**: Always verify the partial fraction decomposition before expanding.

5. **Not simplifying before expanding**: Factor and simplify expressions first to make expansion easier.

## Applications

Laurent series are essential for:

- **Classifying singularities**: The principal part reveals the type of singularity
- **Computing residues**: The $a_{-1}$ coefficient is the residue
- **Evaluating contour integrals**: Via the residue theorem
- **Understanding function behavior**: Near singularities
- **Analytic continuation**: Extending functions beyond their initial domain

## Summary

- Laurent series: $\sum_{n=-\infty}^{\infty} a_n(z-z_0)^n$
- Valid in annular regions $r < |z-z_0| < R$
- Unique representation for given annulus
- Principal part (negative powers) + analytic part (non-negative)
- Coefficients from Cauchy-type integrals: $a_n = \frac{1}{2\pi i} \oint \frac{f(z)}{(z-z_0)^{n+1}} dz$
- Essential for classifying singularities and residue calculus
- Different annuli give different series for the same function
- The coefficient $a_{-1}$ is the residue at $z_0$
