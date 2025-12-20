---
id: math401-topic-5-5
title: "Uniqueness Theorem"
order: 5
---

# Residues at Singularities

The residue of a function at a singularity is the coefficient $a_{-1}$ in its Laurent series—the coefficient of the $(z - z_0)^{-1}$ term. This single complex number contains remarkable information about the function's behavior near the singularity and is the key to evaluating contour integrals via the residue theorem. Computing residues efficiently is one of the most important practical skills in complex analysis.

## Definition

For $f$ with isolated singularity at $z_0$, the **residue** of $f$ at $z_0$ is:

$$\text{Res}(f, z_0) = a_{-1}$$

where $f(z) = \sum_{n=-\infty}^{\infty} a_n(z - z_0)^n$ is the Laurent expansion around $z_0$.

The residue captures the "coefficient" of the singular part that contributes to contour integrals.

**Integral formula**:
$$\text{Res}(f, z_0) = \frac{1}{2\pi i} \oint_{|z-z_0|=\epsilon} f(z) \, dz$$

for sufficiently small $\epsilon > 0$ (small enough that the circle contains no other singularities).

**Proof**: When we integrate the Laurent series term-by-term:
$$\oint_{|z-z_0|=\epsilon} f(z) \, dz = \sum_{n=-\infty}^{\infty} a_n \oint_{|z-z_0|=\epsilon} (z-z_0)^n \, dz$$

For $n \neq -1$: $\oint (z-z_0)^n \, dz = 0$ (integral of derivative of $(z-z_0)^{n+1}/(n+1)$ around closed curve).

For $n = -1$: $\oint \frac{1}{z-z_0} \, dz = 2\pi i$ (winding number).

Therefore: $\oint f(z) \, dz = 2\pi i \cdot a_{-1} = 2\pi i \cdot \text{Res}(f, z_0)$.

## Computing Residues

While we can always compute residues by finding the Laurent series, there are much more efficient methods for specific types of singularities.

### At Simple Poles

If $z_0$ is a simple pole of $f$, then:
$$\text{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0) f(z)$$

**Proof**: Near a simple pole, the Laurent series is:
$$f(z) = \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

Multiplying by $(z - z_0)$:
$$(z-z_0) f(z) = a_{-1} + a_0(z-z_0) + a_1(z-z_0)^2 + \cdots$$

Taking the limit as $z \to z_0$ gives $a_{-1}$.

**Example 1**: For $f(z) = \frac{1}{z-1}$ at $z = 1$:
$$\text{Res}(f, 1) = \lim_{z \to 1} (z-1) \cdot \frac{1}{z-1} = 1$$

**Example 2**: For $f(z) = \frac{z}{z^2 + 1}$ at $z = i$:

First verify it's a simple pole: denominator has simple zero at $z = i$.

$$\text{Res}(f, i) = \lim_{z \to i} (z-i) \cdot \frac{z}{(z-i)(z+i)} = \lim_{z \to i} \frac{z}{z+i} = \frac{i}{2i} = \frac{1}{2}$$

**Example 3**: For $f(z) = \frac{e^z}{z-\pi}$ at $z = \pi$:
$$\text{Res}(f, \pi) = \lim_{z \to \pi} (z-\pi) \cdot \frac{e^z}{z-\pi} = e^{\pi}$$

### At Poles of Order $m$

If $z_0$ is a pole of order $m$, then:
$$\text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$$

**Proof**: The Laurent series near a pole of order $m$ is:
$$f(z) = \frac{a_{-m}}{(z-z_0)^m} + \cdots + \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

Multiplying by $(z-z_0)^m$:
$$(z-z_0)^m f(z) = a_{-m} + a_{-m+1}(z-z_0) + \cdots + a_{-1}(z-z_0)^{m-1} + a_0(z-z_0)^m + \cdots$$

This is analytic at $z_0$. Taking the $(m-1)$-th derivative:
$$\frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)] = (m-1)! \cdot a_{-1} + m! \cdot a_0 \cdot (z-z_0) + \cdots$$

Taking the limit as $z \to z_0$ and dividing by $(m-1)!$ gives $a_{-1}$.

**Example 1**: For $f(z) = \frac{1}{z^2}$ at $z = 0$ (pole of order 2):
$$\text{Res}(f, 0) = \lim_{z \to 0} \frac{d}{dz}[z^2 \cdot \frac{1}{z^2}] = \lim_{z \to 0} \frac{d}{dz}[1] = 0$$

The residue is zero because there's no $1/z$ term.

**Example 2**: For $f(z) = \frac{z}{(z-1)^2}$ at $z = 1$ (pole of order 2):
$$\text{Res}(f, 1) = \lim_{z \to 1} \frac{d}{dz}[(z-1)^2 \cdot \frac{z}{(z-1)^2}] = \lim_{z \to 1} \frac{d}{dz}[z] = 1$$

**Example 3**: For $f(z) = \frac{\cos z}{z^3}$ at $z = 0$ (pole of order 3):
$$\text{Res}(f, 0) = \frac{1}{2!} \lim_{z \to 0} \frac{d^2}{dz^2}[z^3 \cdot \frac{\cos z}{z^3}] = \frac{1}{2} \lim_{z \to 0} \frac{d^2}{dz^2}[\cos z]$$

$$= \frac{1}{2} \lim_{z \to 0} (-\cos z) = -\frac{1}{2}$$

### For Rational Functions

If $f(z) = \frac{p(z)}{q(z)}$ where $p$ and $q$ are analytic at $z_0$, $p(z_0) \neq 0$, and $q$ has a simple zero at $z_0$, then:
$$\text{Res}(f, z_0) = \frac{p(z_0)}{q'(z_0)}$$

**Proof**: Since $q$ has a simple zero at $z_0$, we can write $q(z) = (z - z_0) h(z)$ where $h(z_0) = q'(z_0) \neq 0$. Then:
$$f(z) = \frac{p(z)}{(z-z_0) h(z)}$$

This has a simple pole at $z_0$, so:
$$\text{Res}(f, z_0) = \lim_{z \to z_0} (z-z_0) \cdot \frac{p(z)}{(z-z_0) h(z)} = \frac{p(z_0)}{h(z_0)} = \frac{p(z_0)}{q'(z_0)}$$

**Example 1**: For $f(z) = \frac{1}{z^2 + 1}$ at $z = i$:

Here $p(z) = 1$ and $q(z) = z^2 + 1$, so $q'(z) = 2z$.
$$\text{Res}(f, i) = \frac{1}{2i} = -\frac{i}{2}$$

**Example 2**: For $f(z) = \frac{z^2}{z^3 - 1}$ at $z = 1$:

We have $p(1) = 1$ and $q'(z) = 3z^2$, so $q'(1) = 3$.
$$\text{Res}(f, 1) = \frac{1}{3}$$

**Example 3**: For $f(z) = \frac{e^z}{\sin z}$ at $z = 0$:

Here $p(z) = e^z$ with $p(0) = 1$, and $q(z) = \sin z$ with $q'(z) = \cos z$, so $q'(0) = 1$.
$$\text{Res}(f, 0) = \frac{1}{1} = 1$$

### At Essential Singularities

For essential singularities, there is no general shortcut—we must compute the Laurent series and extract the $a_{-1}$ coefficient.

**Example 1**: For $f(z) = e^{1/z}$ at $z = 0$:
$$e^{1/z} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \frac{1}{3!z^3} + \cdots$$

The coefficient of $1/z$ is $a_{-1} = 1$, so:
$$\text{Res}(e^{1/z}, 0) = 1$$

**Example 2**: For $f(z) = \frac{e^{1/z}}{z^2}$ at $z = 0$:
$$\frac{e^{1/z}}{z^2} = \frac{1}{z^2}\left(1 + \frac{1}{z} + \frac{1}{2!z^2} + \cdots\right) = \frac{1}{z^2} + \frac{1}{z^3} + \frac{1}{2!z^4} + \cdots$$

No $1/z$ term, so:
$$\text{Res}(f, 0) = 0$$

**Example 3**: For $f(z) = z \sin(1/z)$ at $z = 0$:
$$z \sin(1/z) = z \left(\frac{1}{z} - \frac{1}{3!z^3} + \frac{1}{5!z^5} - \cdots\right) = 1 - \frac{1}{3!z^2} + \frac{1}{5!z^4} - \cdots$$

No $1/z$ term, so:
$$\text{Res}(z \sin(1/z), 0) = 0$$

**Example 4**: For $f(z) = \frac{\sin(1/z)}{z}$ at $z = 0$:
$$\frac{\sin(1/z)}{z} = \frac{1}{z}\left(\frac{1}{z} - \frac{1}{3!z^3} + \frac{1}{5!z^5} - \cdots\right) = \frac{1}{z^2} - \frac{1}{3!z^4} + \frac{1}{5!z^6} - \cdots$$

No $1/z$ term, so:
$$\text{Res}(f, 0) = 0$$

### Using Series Manipulations

Often we can compute residues by manipulating known series.

**Example 1**: For $f(z) = \frac{1}{z^2(1-z)}$ at $z = 0$:

Expand $\frac{1}{1-z} = 1 + z + z^2 + \cdots$ for $|z| < 1$:
$$\frac{1}{z^2(1-z)} = \frac{1}{z^2}(1 + z + z^2 + \cdots) = \frac{1}{z^2} + \frac{1}{z} + 1 + z + \cdots$$

The coefficient of $1/z$ is $a_{-1} = 1$, so:
$$\text{Res}(f, 0) = 1$$

**Example 2**: For $f(z) = \frac{e^z - 1}{z^2}$ at $z = 0$:
$$\frac{e^z - 1}{z^2} = \frac{1}{z^2}\left(z + \frac{z^2}{2!} + \frac{z^3}{3!} + \cdots\right) = \frac{1}{z} + \frac{1}{2!} + \frac{z}{3!} + \cdots$$

The coefficient of $1/z$ is $a_{-1} = 1$, so:
$$\text{Res}(f, 0) = 1$$

## Residue at Infinity

The residue at infinity is defined as:
$$\text{Res}(f, \infty) = -\text{Res}\left(\frac{1}{z^2} f(1/z), 0\right)$$

Alternatively:
$$\text{Res}(f, \infty) = -\frac{1}{2\pi i} \oint_{|z|=R} f(z) \, dz$$

where $R$ is large enough to enclose all finite singularities (with the contour oriented clockwise).

**Example**: For $f(z) = \frac{1}{z}$:
$$\text{Res}(f, \infty) = -\text{Res}\left(\frac{1}{(1/w)^2} \cdot \frac{1}{1/w}, 0\right) = -\text{Res}(w, 0) = 0$$

Since $w$ is analytic at 0.

## Connection to Residue Theorem

The fundamental application of residues is the **Residue Theorem**:

If $f$ is analytic inside and on a simple closed contour $\gamma$ except for isolated singularities $z_1, \ldots, z_n$ inside $\gamma$, then:
$$\oint_\gamma f(z) \, dz = 2\pi i \sum_{k=1}^{n} \text{Res}(f, z_k)$$

This reduces contour integration to algebraic computation of residues.

## Common Mistakes Students Make

1. **Using the wrong formula**: Simple pole formula only works for simple poles, not higher-order poles.

2. **Forgetting the factorial**: For poles of order $m > 1$, remember to divide by $(m-1)!$.

3. **Incorrect differentiation**: When using the derivative formula, be careful with the product rule and chain rule.

4. **Not checking pole order**: Always verify the order of the pole before applying a formula.

5. **Sign errors in rational function formula**: Remember it's $p(z_0)/q'(z_0)$, not $p'(z_0)/q(z_0)$.

6. **Missing the Laurent series**: For essential singularities, you must expand the series to find $a_{-1}$.

## Computational Strategy

To compute $\text{Res}(f, z_0)$ efficiently:

1. **Classify the singularity** (removable, pole, essential)
2. **If removable**: residue is 0
3. **If simple pole**: use $\lim_{z \to z_0} (z-z_0) f(z)$
4. **If pole of order $m$**: use derivative formula or series expansion
5. **If rational with simple pole**: use $p(z_0)/q'(z_0)$
6. **If essential**: expand Laurent series

## Applications

Residues are used for:

- **Evaluating real integrals**: Convert to contour integrals and apply residue theorem
- **Computing infinite series**: Via residue techniques
- **Inverse Laplace transforms**: Bromwich integral uses residues
- **Solving differential equations**: Residue methods for special functions
- **Signal processing**: Analyzing poles and zeros in transfer functions

## Summary

- Residue: coefficient $a_{-1}$ in Laurent series
- $\text{Res}(f, z_0) = \frac{1}{2\pi i} \oint f(z) \, dz$ (small circle around $z_0$)
- **Simple pole**: $\text{Res} = \lim_{z \to z_0} (z-z_0)f(z)$
- **Pole of order $m$**: $\text{Res} = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$
- **Rational (simple pole)**: $\text{Res} = p(z_0)/q'(z_0)$
- **Essential singularity**: Compute Laurent series
- Foundation for residue theorem and integral evaluation
- Key computational tool in complex analysis
