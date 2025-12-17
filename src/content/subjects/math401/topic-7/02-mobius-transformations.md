# Möbius Transformations

Möbius transformations (linear fractional transformations) are functions of the form $f(z) = \frac{az+b}{cz+d}$ with $ad - bc \neq 0$. These transformations are the most important conformal maps, forming a group under composition and mapping circles to circles (including lines as circles through infinity).

## Definition

A **Möbius transformation** is:
$$f(z) = \frac{az + b}{cz + d}$$

where $a, b, c, d \in \mathbb{C}$ and $ad - bc \neq 0$ (to ensure non-degeneracy).

**Extended to $\widehat{\mathbb{C}}$**:
- $f(\infty) = a/c$ if $c \neq 0$, $f(\infty) = \infty$ if $c = 0$
- $f(-d/c) = \infty$ if $c \neq 0$

## Basic Examples

- **Translation**: $f(z) = z + b$
- **Scaling**: $f(z) = az$
- **Inversion**: $f(z) = 1/z$
- **General**: Composition of above

## Properties

1. **Bijection**: Maps $\widehat{\mathbb{C}} \to \widehat{\mathbb{C}}$ bijectively
2. **Group**: Compositions of Möbius transforms are Möbius
3. **Three-point determination**: Uniquely determined by images of three points
4. **Circle preservation**: Maps circles to circles (lines are circles through $\infty$)
5. **Conformal**: Everywhere except possibly at $\infty$ and $-d/c$

## Cross-Ratio

The **cross-ratio** of four points:
$$(z_1, z_2; z_3, z_4) = \frac{(z_1-z_3)(z_2-z_4)}{(z_1-z_4)(z_2-z_3)}$$

is preserved by Möbius transformations.

## Finding Möbius Transformations

To find $f$ mapping $z_1, z_2, z_3$ to $w_1, w_2, w_3$:

$$(w, w_1; w_2, w_3) = (z, z_1; z_2, z_3)$$

Solve for $w = f(z)$.

## Summary

- $f(z) = \frac{az+b}{cz+d}$, $ad - bc \neq 0$
- Maps circles to circles
- Uniquely determined by three point pairs
- Forms a group under composition
- Fundamental tool for conformal mapping
