# Calculating Residues

Computing residues efficiently is essential for applying the residue theorem. Different types of singularities require different techniques. This section presents systematic methods for finding residues at simple poles, higher-order poles, and essential singularities.

## At Simple Poles

**Formula**: If $z_0$ is a simple pole:
$$\text{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0) f(z)$$

### Rational Functions

If $f(z) = \frac{p(z)}{q(z)}$ with $p(z_0) \neq 0$ and $q$ has simple zero at $z_0$:
$$\text{Res}(f, z_0) = \frac{p(z_0)}{q'(z_0)}$$

**Example**: $f(z) = \frac{1}{z^2 - 1}$ at $z = 1$:
$$\text{Res}(f, 1) = \frac{1}{2z}\bigg|_{z=1} = \frac{1}{2}$$

## At Poles of Order $m$

**Formula**:
$$\text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^m f(z)]$$

**Example**: $f(z) = \frac{\sin z}{z^3}$ at $z = 0$ (pole of order 2):

Using $\sin z = z - \frac{z^3}{6} + \cdots$:
$$\frac{\sin z}{z^3} = \frac{1}{z^2} - \frac{1}{6} + \cdots$$
$$\text{Res}(f, 0) = 0$$

## At Essential Singularities

Must compute Laurent series to find coefficient $a_{-1}$.

**Example**: $f(z) = e^{1/z}$ at $z = 0$:
$$e^{1/z} = 1 + \frac{1}{z} + \frac{1}{2!z^2} + \cdots$$
$$\text{Res}(e^{1/z}, 0) = 1$$

## Special Techniques

### Substitution

Change variables to simplify.

### Partial Fractions

Decompose rational functions.

### Series Expansion

Use known Taylor/Laurent series.

## Summary

- **Simple pole**: $\text{Res} = \lim_{z \to z_0} (z-z_0)f(z)$
- **Rational**: $\text{Res} = p(z_0)/q'(z_0)$
- **Order $m$**: Use derivative formula  
- **Essential**: Compute Laurent series
- Choose method based on singularity type and function form
