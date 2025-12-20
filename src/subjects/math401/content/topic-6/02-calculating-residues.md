---
id: math401-topic-6-2
title: "Classification of Singularities"
order: 2
---

# Calculating Residues

Computing residues efficiently is essential for applying the residue theorem. Different types of singularities require different techniques. This section presents systematic methods for finding residues at simple poles, higher-order poles, and essential singularities.

Understanding how to calculate residues is the key practical skill in applying residue theory. While the residue theorem tells us that $\oint_\gamma f(z) \, dz = 2\pi i \sum \text{Res}(f, z_k)$, we need efficient methods to find these residues without always computing the full Laurent series.

## At Simple Poles

A simple pole is an isolated singularity $z_0$ where $f(z)$ can be written as:
$$f(z) = \frac{g(z)}{z - z_0}$$
where $g$ is analytic at $z_0$ and $g(z_0) \neq 0$.

**Formula**: If $z_0$ is a simple pole:
$$\text{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0) f(z)$$

**Why this works**: Multiplying by $(z - z_0)$ removes the pole, leaving an analytic function. The limit as $z \to z_0$ then gives the coefficient of $\frac{1}{z-z_0}$ in the Laurent series, which is precisely the residue.

**Example 1**: Find $\text{Res}\left(\frac{1}{z-3}, 3\right)$.

$$\text{Res}(f, 3) = \lim_{z \to 3} (z-3) \cdot \frac{1}{z-3} = \lim_{z \to 3} 1 = 1$$

**Example 2**: Find $\text{Res}\left(\frac{z^2}{z+2}, -2\right)$.

$$\text{Res}(f, -2) = \lim_{z \to -2} (z+2) \cdot \frac{z^2}{z+2} = \lim_{z \to -2} z^2 = 4$$

### Rational Functions

If $f(z) = \frac{p(z)}{q(z)}$ with $p(z_0) \neq 0$ and $q$ has a simple zero at $z_0$ (meaning $q(z_0) = 0$ but $q'(z_0) \neq 0$), then:
$$\text{Res}(f, z_0) = \frac{p(z_0)}{q'(z_0)}$$

**Derivation**: Since $q$ has a simple zero at $z_0$, we can write $q(z) = (z - z_0)h(z)$ where $h(z_0) = q'(z_0) \neq 0$. Then:

$$\text{Res}(f, z_0) = \lim_{z \to z_0} (z-z_0) \cdot \frac{p(z)}{q(z)} = \lim_{z \to z_0} (z-z_0) \cdot \frac{p(z)}{(z-z_0)h(z)} = \lim_{z \to z_0} \frac{p(z)}{h(z)} = \frac{p(z_0)}{h(z_0)} = \frac{p(z_0)}{q'(z_0)}$$

**Example 3**: $f(z) = \frac{1}{z^2 - 1}$ at $z = 1$.

Here $p(z) = 1$ and $q(z) = z^2 - 1$, so $q'(z) = 2z$.
$$\text{Res}(f, 1) = \frac{p(1)}{q'(1)} = \frac{1}{2(1)} = \frac{1}{2}$$

**Example 4**: $f(z) = \frac{e^z}{z^2 + 4}$ at $z = 2i$.

Here $p(z) = e^z$ and $q(z) = z^2 + 4$, so $q'(z) = 2z$.
$$\text{Res}(f, 2i) = \frac{e^{2i}}{2(2i)} = \frac{e^{2i}}{4i} = \frac{e^{2i}(\cos 2 + i\sin 2)}{4i}$$

This can be simplified to:
$$\text{Res}(f, 2i) = \frac{-ie^{2i}}{4} = \frac{-i(\cos 2 + i\sin 2)}{4} = \frac{\sin 2 - i\cos 2}{4}$$

## At Poles of Order $m$

A pole of order $m$ at $z_0$ means $f(z)$ can be written as:
$$f(z) = \frac{g(z)}{(z-z_0)^m}$$
where $g$ is analytic at $z_0$ and $g(z_0) \neq 0$.

**Formula**:
$$\text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$$

**Why this works**: The Laurent series around $z_0$ is:
$$f(z) = \frac{a_{-m}}{(z-z_0)^m} + \cdots + \frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \cdots$$

Multiplying by $(z-z_0)^m$:
$$(z-z_0)^m f(z) = a_{-m} + a_{-m+1}(z-z_0) + \cdots + a_{-1}(z-z_0)^{m-1} + a_0(z-z_0)^m + \cdots$$

Taking the $(m-1)$-th derivative:
$$\frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)] = (m-1)! \cdot a_{-1} + (\text{terms with } (z-z_0))$$

Taking the limit as $z \to z_0$ kills the higher-order terms, leaving $(m-1)! \cdot a_{-1}$, so:
$$a_{-1} = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$$

**Example 5**: $f(z) = \frac{\sin z}{z^3}$ at $z = 0$.

First, check the order of the pole. Since $\sin z = z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots$:
$$f(z) = \frac{\sin z}{z^3} = \frac{1}{z^2} - \frac{1}{6} + \frac{z^2}{120} - \cdots$$

This is a pole of order 2 (not 3!). Using the formula with $m = 2$:
$$\text{Res}(f, 0) = \frac{1}{1!} \lim_{z \to 0} \frac{d}{dz}[z^2 \cdot \frac{\sin z}{z^3}] = \lim_{z \to 0} \frac{d}{dz}\left[\frac{\sin z}{z}\right]$$

$$= \lim_{z \to 0} \frac{z\cos z - \sin z}{z^2}$$

Using L'Hôpital's rule (or Taylor series):
$$= \lim_{z \to 0} \frac{-z\sin z + \cos z - \cos z}{2z} = \lim_{z \to 0} \frac{-z\sin z}{2z} = 0$$

Alternatively, from the Laurent series above, we see directly that the coefficient of $\frac{1}{z}$ is 0, so $\text{Res}(f, 0) = 0$.

**Example 6**: $f(z) = \frac{1}{(z-1)^3}$ at $z = 1$ (pole of order 3).

$$\text{Res}(f, 1) = \frac{1}{2!} \lim_{z \to 1} \frac{d^2}{dz^2}[(z-1)^3 \cdot \frac{1}{(z-1)^3}] = \frac{1}{2} \lim_{z \to 1} \frac{d^2}{dz^2}[1] = 0$$

This makes sense: $f(z) = \frac{1}{(z-1)^3}$ has no $\frac{1}{z-1}$ term in its Laurent expansion, so the residue is zero.

**Example 7**: $f(z) = \frac{z}{(z+1)^2}$ at $z = -1$ (pole of order 2).

$$\text{Res}(f, -1) = \frac{1}{1!} \lim_{z \to -1} \frac{d}{dz}[(z+1)^2 \cdot \frac{z}{(z+1)^2}] = \lim_{z \to -1} \frac{d}{dz}[z] = 1$$

## At Essential Singularities

At an essential singularity, the Laurent series has infinitely many negative powers, and there's no shortcut: we must compute the Laurent series to find the coefficient $a_{-1}$.

**Example 8**: $f(z) = e^{1/z}$ at $z = 0$.

Using the Taylor series for $e^w$:
$$e^{1/z} = \sum_{n=0}^{\infty} \frac{(1/z)^n}{n!} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \frac{1}{3!z^3} + \cdots$$

The coefficient of $\frac{1}{z}$ is 1, so:
$$\text{Res}(e^{1/z}, 0) = 1$$

**Example 9**: $f(z) = \sin(1/z)$ at $z = 0$.

$$\sin(1/z) = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1)!} \cdot \frac{1}{z^{2n+1}} = \frac{1}{z} - \frac{1}{3!z^3} + \frac{1}{5!z^5} - \cdots$$

The coefficient of $\frac{1}{z}$ is 1, so:
$$\text{Res}(\sin(1/z), 0) = 1$$

**Example 10**: $f(z) = z e^{1/z^2}$ at $z = 0$.

$$e^{1/z^2} = 1 + \frac{1}{z^2} + \frac{1}{2!z^4} + \cdots$$

$$z e^{1/z^2} = z + \frac{1}{z} + \frac{1}{2!z^3} + \cdots$$

The coefficient of $\frac{1}{z}$ is 1, so:
$$\text{Res}(z e^{1/z^2}, 0) = 1$$

## Special Techniques

### Substitution

Sometimes a change of variables simplifies the residue calculation.

**Example 11**: Find $\text{Res}\left(\frac{1}{1-e^z}, 0\right)$.

Let $w = e^z - 1$, so $e^z = 1 + w$ and near $z = 0$, $w \approx z$. Then:
$$\frac{1}{1-e^z} = \frac{-1}{w} = \frac{-1}{e^z - 1}$$

Near $z = 0$: $e^z - 1 = z + \frac{z^2}{2} + \cdots = z(1 + \frac{z}{2} + \cdots)$

$$\frac{1}{1-e^z} = \frac{-1}{z(1 + z/2 + \cdots)} = \frac{-1}{z} \cdot \frac{1}{1 + z/2 + \cdots} = \frac{-1}{z}(1 - \frac{z}{2} + \cdots)$$

$$= \frac{-1}{z} + \frac{1}{2} + \cdots$$

So $\text{Res}\left(\frac{1}{1-e^z}, 0\right) = -1$.

### Partial Fractions

For rational functions with multiple simple poles, partial fraction decomposition can be effective.

**Example 12**: $f(z) = \frac{1}{z(z-1)(z-2)}$

Decompose:
$$\frac{1}{z(z-1)(z-2)} = \frac{A}{z} + \frac{B}{z-1} + \frac{C}{z-2}$$

Multiplying through by $z(z-1)(z-2)$:
$$1 = A(z-1)(z-2) + Bz(z-2) + Cz(z-1)$$

Setting $z = 0$: $1 = A(-1)(-2) = 2A$, so $A = 1/2$.

Setting $z = 1$: $1 = B(1)(-1) = -B$, so $B = -1$.

Setting $z = 2$: $1 = C(2)(1) = 2C$, so $C = 1/2$.

Therefore:
$$f(z) = \frac{1/2}{z} - \frac{1}{z-1} + \frac{1/2}{z-2}$$

The residues are immediately visible: $\text{Res}(f, 0) = 1/2$, $\text{Res}(f, 1) = -1$, $\text{Res}(f, 2) = 1/2$.

### Series Expansion

Use known Taylor or Laurent series to identify the $a_{-1}$ coefficient.

**Example 13**: $f(z) = \frac{1-\cos z}{z^3}$ at $z = 0$.

Using $\cos z = 1 - \frac{z^2}{2} + \frac{z^4}{24} - \cdots$:
$$1 - \cos z = \frac{z^2}{2} - \frac{z^4}{24} + \cdots$$

$$\frac{1-\cos z}{z^3} = \frac{1}{2z} - \frac{z}{24} + \cdots$$

The coefficient of $\frac{1}{z}$ is $1/2$, so:
$$\text{Res}(f, 0) = \frac{1}{2}$$

## Common Mistakes

1. **Misidentifying the order of a pole**: Always check by expanding the function. For instance, $\frac{\sin z}{z^3}$ is a pole of order 2, not 3.

2. **Forgetting the factorial in the higher-order pole formula**: The formula has $\frac{1}{(m-1)!}$, not just the derivative.

3. **Arithmetic errors in partial fractions**: Double-check by verifying the decomposition.

4. **Using the simple pole formula for higher-order poles**: This gives the wrong answer. Use the correct formula for each type.

5. **Not recognizing essential singularities**: If there are infinitely many negative powers in the Laurent series, it's essential, not a pole.

## Summary Table

| Type | Condition | Formula |
|------|-----------|---------|
| Simple pole | $f(z) = \frac{g(z)}{z-z_0}$, $g(z_0) \neq 0$ | $\lim_{z \to z_0} (z-z_0)f(z)$ |
| Rational (simple) | $f = p/q$, $p(z_0) \neq 0$, $q(z_0) = 0$, $q'(z_0) \neq 0$ | $\frac{p(z_0)}{q'(z_0)}$ |
| Pole of order $m$ | $f(z) = \frac{g(z)}{(z-z_0)^m}$, $g(z_0) \neq 0$ | $\frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$ |
| Essential | Infinitely many negative powers | Compute Laurent series, find $a_{-1}$ |

## Practical Strategy

When faced with computing a residue:

1. **Identify the type of singularity**: removable, pole (and its order), or essential.
2. **Choose the appropriate method**: simple pole formula, higher-order formula, or Laurent series.
3. **Simplify first if possible**: algebraic manipulation can reduce complexity.
4. **Check your answer**: the residue should be finite (unlike the function at the pole).

Mastering these techniques allows you to efficiently apply the residue theorem to evaluate contour integrals, which in turn enables you to compute challenging real integrals, sum series, and solve a variety of problems across mathematics and physics.
