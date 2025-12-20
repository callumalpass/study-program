# Double Integrals over Rectangles

## Introduction

The extension of integration from one dimension to two dimensions leads us to the concept of double integrals. Just as a single integral computes the area under a curve, a double integral computes the volume under a surface. The simplest case occurs when we integrate over rectangular regions in the plane.

## Definition of Double Integrals

Let $f(x, y)$ be a function defined on a rectangular region $R = [a, b] \times [c, d]$ in the $xy$-plane. We want to define the double integral of $f$ over $R$, denoted:

$$\iint_R f(x, y) \, dA$$

This integral represents the signed volume between the surface $z = f(x, y)$ and the $xy$-plane over the region $R$.

## Riemann Sums Over Rectangles

The construction of the double integral follows the same philosophy as the single-variable Riemann integral, but now we partition a two-dimensional region.

### Partitioning the Rectangle

To construct the Riemann sum, we partition the rectangle $R = [a, b] \times [c, d]$ as follows:

1. Partition $[a, b]$ into $m$ subintervals: $a = x_0 < x_1 < x_2 < \cdots < x_m = b$
2. Partition $[c, d]$ into $n$ subintervals: $c = y_0 < y_1 < y_2 < \cdots < y_n = d$

This creates a grid of $mn$ subrectangles $R_{ij}$ where:

$$R_{ij} = [x_{i-1}, x_i] \times [y_{j-1}, y_j]$$

for $i = 1, 2, \ldots, m$ and $j = 1, 2, \ldots, n$.

### Area of Subrectangles

Each subrectangle $R_{ij}$ has dimensions:
- Width: $\Delta x_i = x_i - x_{i-1}$
- Height: $\Delta y_j = y_j - y_{j-1}$
- Area: $\Delta A_{ij} = \Delta x_i \cdot \Delta y_j$

For a regular partition where all subintervals have equal length:
$$\Delta x = \frac{b - a}{m}, \quad \Delta y = \frac{d - c}{n}$$

### Sample Points

In each subrectangle $R_{ij}$, we choose a sample point $(x_{ij}^*, y_{ij}^*)$. Common choices include:
- Lower-left corner: $(x_{i-1}, y_{j-1})$
- Upper-right corner: $(x_i, y_j)$
- Center: $\left(\frac{x_{i-1} + x_i}{2}, \frac{y_{j-1} + y_j}{2}\right)$

### The Riemann Sum

The Riemann sum approximating the volume under $f(x, y)$ is:

$$S_{m,n} = \sum_{i=1}^{m} \sum_{j=1}^{n} f(x_{ij}^*, y_{ij}^*) \Delta A_{ij}$$

Each term $f(x_{ij}^*, y_{ij}^*) \Delta A_{ij}$ represents the volume of a rectangular box with base area $\Delta A_{ij}$ and height $f(x_{ij}^*, y_{ij}^*)$.

## The Limit Definition

Let $\|\Delta\|$ denote the norm of the partition, which is the length of the longest diagonal of any subrectangle:

$$\|\Delta\| = \max_{i,j} \sqrt{(\Delta x_i)^2 + (\Delta y_j)^2}$$

The double integral is defined as the limit of these Riemann sums as the norm approaches zero:

$$\iint_R f(x, y) \, dA = \lim_{\|\Delta\| \to 0} \sum_{i=1}^{m} \sum_{j=1}^{n} f(x_{ij}^*, y_{ij}^*) \Delta A_{ij}$$

provided this limit exists and is independent of the choice of sample points. When this limit exists, we say that $f$ is **integrable** over $R$.

## Existence of Double Integrals

Not all functions are integrable, but the following theorem provides sufficient conditions:

**Theorem (Integrability):** If $f(x, y)$ is continuous on the closed rectangle $R$, then $f$ is integrable over $R$.

More generally, if $f$ is bounded on $R$ and continuous except on a finite number of smooth curves, then $f$ is integrable over $R$.

## Geometric Interpretation

When $f(x, y) \geq 0$ on $R$, the double integral $\iint_R f(x, y) \, dA$ represents the volume of the solid bounded by:
- The surface $z = f(x, y)$ above
- The rectangle $R$ in the $xy$-plane below
- The vertical "walls" connecting the boundary of $R$ to the surface

When $f$ takes both positive and negative values, the double integral gives the signed volume: volumes above the $xy$-plane are positive, and volumes below are negative.

## Properties of Double Integrals

Double integrals satisfy several important properties analogous to single integrals:

### Linearity

For constants $c$ and $d$:
$$\iint_R [c f(x, y) + d g(x, y)] \, dA = c \iint_R f(x, y) \, dA + d \iint_R g(x, y) \, dA$$

### Additivity Over Regions

If $R = R_1 \cup R_2$ where $R_1$ and $R_2$ overlap only on their boundaries:
$$\iint_R f(x, y) \, dA = \iint_{R_1} f(x, y) \, dA + \iint_{R_2} f(x, y) \, dA$$

### Comparison Property

If $f(x, y) \leq g(x, y)$ for all $(x, y)$ in $R$, then:
$$\iint_R f(x, y) \, dA \leq \iint_R g(x, y) \, dA$$

### Area of a Region

The area of the region $R$ can be computed as:
$$\text{Area}(R) = \iint_R 1 \, dA$$

For a rectangle $R = [a, b] \times [c, d]$, this gives $(b - a)(d - c)$, as expected.

## Examples

### Example 1: Estimating with a Riemann Sum

Consider $f(x, y) = 16 - x^2 - 2y^2$ over $R = [0, 2] \times [0, 2]$.

Using a regular partition with $m = n = 2$ and choosing lower-left corners as sample points:
- Subrectangles: $[0, 1] \times [0, 1]$, $[0, 1] \times [1, 2]$, $[1, 2] \times [0, 1]$, $[1, 2] \times [1, 2]$
- Each has area $\Delta A = 1$
- Sample points: $(0, 0)$, $(0, 1)$, $(1, 0)$, $(1, 2)$

The Riemann sum is:
$$S = f(0, 0) \cdot 1 + f(0, 1) \cdot 1 + f(1, 0) \cdot 1 + f(1, 2) \cdot 1$$
$$= 16 + 14 + 15 + 7 = 52$$

This approximates the volume under the surface.

### Example 2: Area as a Double Integral

The area of the rectangle $R = [1, 4] \times [2, 6]$ is:
$$\text{Area}(R) = \iint_R 1 \, dA = (4 - 1)(6 - 2) = 3 \times 4 = 12$$

## Conclusion

Double integrals over rectangles extend the concept of integration to two dimensions, allowing us to compute volumes and other quantities. The definition via Riemann sums provides the theoretical foundation, but in practice, we need more efficient computational methods. The next topic, iterated integrals, will provide the key tool for actually evaluating double integrals through Fubini's theorem, which reduces the two-dimensional problem to successive one-dimensional integrations.
