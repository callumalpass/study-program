---
id: math401-topic-7-4
title: "Exponential and Logarithmic Mappings"
order: 4
---

# Schwarz-Christoffel Transformation

The Schwarz-Christoffel transformation provides an explicit formula for conformal mappings from the upper half-plane to polygonal regions. This powerful technique has applications in electrostatics, fluid dynamics, and other areas requiring solutions to Laplace's equation in polygonal domains.

## Motivation

Many physical problems involve domains bounded by straight line segments. The Schwarz-Christoffel formula constructs conformal maps to such regions systematically.

**Goal**: Map upper half-plane $\mathbb{H} = \{z : \text{Im}(z) > 0\}$ conformally onto interior of polygon.

## The Formula

**Theorem (Schwarz-Christoffel)**: A conformal map from $\mathbb{H}$ onto a polygon with vertices $w_1, \ldots, w_n$ and interior angles $\alpha_1\pi, \ldots, \alpha_n\pi$ is given by:

$$f(z) = A + C\int_{z_0}^z \prod_{k=1}^{n} (\zeta - x_k)^{\alpha_k - 1} d\zeta$$

where:
- $x_1 < x_2 < \cdots < x_n$ are real points (preimages of vertices)
- $\alpha_k$ are interior angles at vertices (in units of $\pi$)
- $A, C$ are complex constants
- $\sum_{k=1}^n \alpha_k = n - 2$ (polygon angle sum)

## Derivation Sketch

At vertex $w_k$ with interior angle $\alpha_k\pi$, the boundary turns by exterior angle $(1-\alpha_k)\pi$.

If $f$ maps $x_k$ to $w_k$, then near $x_k$:
$$\arg(f'(z)) \text{ jumps by } (1-\alpha_k)\pi$$

This suggests:
$$f'(z) = C\prod_{k=1}^n (z - x_k)^{\alpha_k - 1}$$

Integrating gives the Schwarz-Christoffel formula.

## Simple Examples

### Upper Half-Plane to Strip

Map $\mathbb{H}$ to infinite strip $0 < \text{Im}(w) < 1$.

This is a "polygon" with two vertices at infinity, both with angle $\pi$ ($\alpha = 1$).

Taking $x_1 = -1$, $x_2 = 1$:
$$f'(z) = \frac{C}{(z-1)(z+1)} = \frac{C}{z^2 - 1}$$

$$f(z) = C\int \frac{dz}{z^2-1} = \frac{C}{2}\log\left(\frac{z-1}{z+1}\right) + A$$

With appropriate $A, C$, this maps $\mathbb{H}$ to horizontal strip.

### Upper Half-Plane to Rectangle

Map $\mathbb{H}$ to rectangle with vertices at $0, a, a+ib, ib$.

Four vertices with angles $\pi/2$ each: $\alpha_1 = \alpha_2 = \alpha_3 = \alpha_4 = 1/2$.

$$f'(z) = \frac{C}{\sqrt{(z-x_1)(z-x_2)(z-x_3)(z-x_4)}}$$

This integral involves elliptic functions. The side lengths and positions $x_k$ are related through elliptic integrals.

### Upper Half-Plane to Triangle

Map $\mathbb{H}$ to triangle with angles $\alpha\pi, \beta\pi, \gamma\pi$ where $\alpha + \beta + \gamma = 1$.

Take preimages at $x_1 = -1, x_2 = 0, x_3 = 1$:

$$f(z) = C\int (z+1)^{\alpha-1} z^{\beta-1}(z-1)^{\gamma-1} dz + A$$

**Special case** (equilateral triangle): $\alpha = \beta = \gamma = 1/3$.

## Infinite Vertices

Vertices at infinity are handled by letting $x_k \to \infty$ appropriately.

For vertex at infinity with angle $\alpha\pi$, the factor $(z - x_k)^{\alpha-1}$ is omitted from the product.

**Example**: Semi-infinite strip has one finite vertex and two at infinity.

## Parameter Determination

The Schwarz-Christoffel formula involves several parameters:
- Positions $x_1, \ldots, x_n$ on real axis
- Constants $A, C$

**Degrees of freedom**: 
- Real positions: $n$ points, but can fix 3 by Möbius invariance
- Complex constants: $A$ (translation), $C$ (rotation + scaling)

**Constraints**:
- Polygon vertices positions: $2n$ real constraints
- Angle constraints: automatically satisfied

Determining parameters often requires solving transcendental equations numerically.

## Practical Computation

1. **Choose preimages**: Fix three points (e.g., $x_1 = -1, x_2 = 0, x_3 = 1$)
2. **Compute integral**: Evaluate Schwarz-Christoffel integral (numerically if needed)
3. **Adjust parameters**: Tune remaining $x_k$ and constants to match polygon
4. **Verify mapping**: Check that vertices map correctly

Software packages exist for computing Schwarz-Christoffel maps numerically.

## Applications

### Electrostatics

Find electric potential in region with polygonal boundary.

**Method**:
1. Map polygon to upper half-plane via inverse Schwarz-Christoffel
2. Solve Laplace equation in half-plane (simpler)
3. Transform solution back to polygon

### Fluid Flow

Model flow around obstacles with straight edges.

**Example**: Flow around flat plate, flow in channels with corners.

### Heat Conduction

Steady-state temperature in polygonal regions.

## Limitations

1. **Complexity**: For many vertices, explicit formulas are unavailable; numerical methods required
2. **Elliptic integrals**: Rectangle and other cases involve special functions
3. **Parameter determination**: Can be computationally challenging

## Generalizations

- **Schwarz-Christoffel for disk**: Similar formula for mapping unit disk to polygon
- **Curved boundaries**: Generalizations exist for piecewise smooth boundaries

## Example: Upper Half-Plane to First Quadrant

Map $\mathbb{H}$ to first quadrant $\{w : \text{Re}(w) > 0, \text{Im}(w) > 0\}$.

First quadrant is infinite polygon with one vertex at origin (angle $\pi/2$) and two at infinity (angles $\pi$).

Taking preimage of origin at $z = 0$:
$$f'(z) = \frac{C}{z^{1/2}}$$

$$f(z) = 2C\sqrt{z} + A$$

Choosing $C = 1, A = 0$: $f(z) = z^2$ maps first quadrant to upper half-plane, so $f^{-1}(w) = \sqrt{w}$ maps $\mathbb{H}$ to first quadrant.

## Summary

- **Schwarz-Christoffel formula**: Explicit conformal map from half-plane to polygon
- **Formula**: $f(z) = A + C\int \prod (z - x_k)^{\alpha_k - 1} dz$
- **Parameters**: Preimage positions $x_k$, angles $\alpha_k\pi$, constants $A, C$
- **Applications**: Electrostatics, fluid flow, heat conduction in polygonal domains
- **Challenges**: Parameter determination, special function evaluation
- Powerful tool for solving Laplace equation in complex geometries
