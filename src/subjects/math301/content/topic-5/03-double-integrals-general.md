---
id: math301-topic-5-3
title: "Double Integrals over General Regions"
order: 3
---

# Double Integrals over General Regions

## Introduction

While rectangular regions provide a natural starting point for double integrals, most applications in physics, engineering, and geometry involve integration over non-rectangular regions. These general regions require more careful treatment when setting up iterated integrals, as the limits of integration for one variable typically depend on the other variable.

## General Regions and Their Classification

A **general bounded region** $D$ in the plane is a region that can be enclosed in some rectangle but may have curved or irregular boundaries. We classify these regions into two main types based on how they can be described.

### Type I Regions (Vertically Simple)

A region $D$ is **Type I** (or vertically simple) if it lies between the graphs of two continuous functions of $x$.

**Definition:** $D$ is Type I if it can be expressed as:

$$D = \{(x, y) \mid a \leq x \leq b, \, g_1(x) \leq y \leq g_2(x)\}$$

where $g_1$ and $g_2$ are continuous functions on $[a, b]$ with $g_1(x) \leq g_2(x)$.

Geometrically, for each fixed $x$ in $[a, b]$, the vertical line at $x$ enters the region at $y = g_1(x)$ and exits at $y = g_2(x)$.

**Examples of Type I regions:**
- The region between $y = x^2$ and $y = 2x$ for $0 \leq x \leq 2$
- The upper half-disk: $0 \leq x \leq r$, $0 \leq y \leq \sqrt{r^2 - x^2}$
- A triangle with vertices at $(0, 0)$, $(1, 0)$, and $(1, 2)$

### Type II Regions (Horizontally Simple)

A region $D$ is **Type II** (or horizontally simple) if it lies between the graphs of two continuous functions of $y$.

**Definition:** $D$ is Type II if it can be expressed as:

$$D = \{(x, y) \mid c \leq y \leq d, \, h_1(y) \leq x \leq h_2(y)\}$$

where $h_1$ and $h_2$ are continuous functions on $[c, d]$ with $h_1(y) \leq h_2(y)$.

Geometrically, for each fixed $y$ in $[c, d]$, the horizontal line at $y$ enters the region at $x = h_1(y)$ and exits at $x = h_2(y)$.

**Examples of Type II regions:**
- The region between $x = y^2$ and $x = 4$ for $0 \leq y \leq 2$
- The right half-disk: $0 \leq y \leq r$, $0 \leq x \leq \sqrt{r^2 - y^2}$

### Regions That Are Both Types

Many regions can be described as either Type I or Type II. For example, the rectangle $[a, b] \times [c, d]$ is both:
- Type I: $a \leq x \leq b$, $c \leq y \leq d$
- Type II: $c \leq y \leq d$, $a \leq x \leq b$

A disk of radius $r$ centered at the origin can be described as either type by considering upper/lower or left/right halves.

## Double Integrals over Type I Regions

For a Type I region $D = \{(x, y) \mid a \leq x \leq b, \, g_1(x) \leq y \leq g_2(x)\}$:

$$\iint_D f(x, y) \, dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x, y) \, dy \, dx$$

The key difference from rectangular regions is that the limits for the inner integral are functions of $x$ rather than constants.

### Example 1: Region Between Two Curves

Evaluate $\iint_D xy \, dA$ where $D$ is the region bounded by $y = x^2$ and $y = 2x$.

**Solution:**

First, find the intersection points: $x^2 = 2x$ gives $x = 0$ or $x = 2$.

For $0 \leq x \leq 2$, we have $x^2 \leq y \leq 2x$ (since $2x \geq x^2$ in this interval).

Thus $D$ is Type I: $D = \{(x, y) \mid 0 \leq x \leq 2, \, x^2 \leq y \leq 2x\}$.

$$\iint_D xy \, dA = \int_0^2 \int_{x^2}^{2x} xy \, dy \, dx$$

Inner integral:
$$\int_{x^2}^{2x} xy \, dy = x \cdot \left[\frac{y^2}{2}\right]_{x^2}^{2x} = \frac{x}{2}[(2x)^2 - (x^2)^2] = \frac{x}{2}(4x^2 - x^4)$$

Outer integral:
$$\int_0^2 \frac{x}{2}(4x^2 - x^4) \, dx = \frac{1}{2}\int_0^2 (4x^3 - x^5) \, dx$$

$$= \frac{1}{2}\left[x^4 - \frac{x^6}{6}\right]_0^2 = \frac{1}{2}\left(16 - \frac{64}{6}\right) = \frac{1}{2} \cdot \frac{32}{3} = \frac{16}{3}$$

### Example 2: Triangular Region

Find the volume under $f(x, y) = 4 - x - 2y$ over the triangular region with vertices $(0, 0)$, $(2, 0)$, and $(2, 1)$.

**Solution:**

The triangle has boundaries:
- Bottom: $y = 0$
- Right: $x = 2$
- Hypotenuse: the line through $(0, 0)$ and $(2, 1)$ is $y = x/2$

As a Type I region: $D = \{(x, y) \mid 0 \leq x \leq 2, \, 0 \leq y \leq x/2\}$.

$$\iint_D (4 - x - 2y) \, dA = \int_0^2 \int_0^{x/2} (4 - x - 2y) \, dy \, dx$$

Inner integral:
$$\int_0^{x/2} (4 - x - 2y) \, dy = [4y - xy - y^2]_0^{x/2} = 2x - \frac{x^2}{2} - \frac{x^2}{4} = 2x - \frac{3x^2}{4}$$

Outer integral:
$$\int_0^2 \left(2x - \frac{3x^2}{4}\right) dx = \left[x^2 - \frac{x^3}{4}\right]_0^2 = 4 - 2 = 2$$

## Double Integrals over Type II Regions

For a Type II region $D = \{(x, y) \mid c \leq y \leq d, \, h_1(y) \leq x \leq h_2(y)\}$:

$$\iint_D f(x, y) \, dA = \int_c^d \int_{h_1(y)}^{h_2(y)} f(x, y) \, dx \, dy$$

Now the limits for the inner integral are functions of $y$.

### Example 3: Region with Parabolic Boundary

Evaluate $\iint_D x \, dA$ where $D$ is bounded by $x = y^2$ and $x = 4$.

**Solution:**

The curves intersect where $y^2 = 4$, so $y = \pm 2$.

As a Type II region: $D = \{(x, y) \mid -2 \leq y \leq 2, \, y^2 \leq x \leq 4\}$.

$$\iint_D x \, dA = \int_{-2}^2 \int_{y^2}^4 x \, dx \, dy$$

Inner integral:
$$\int_{y^2}^4 x \, dx = \left[\frac{x^2}{2}\right]_{y^2}^4 = 8 - \frac{y^4}{2}$$

Outer integral:
$$\int_{-2}^2 \left(8 - \frac{y^4}{2}\right) dy = \left[8y - \frac{y^5}{10}\right]_{-2}^2$$

$$= \left(16 - \frac{32}{10}\right) - \left(-16 + \frac{32}{10}\right) = 32 - \frac{64}{10} = \frac{256}{10} = \frac{128}{5}$$

## Choosing Between Type I and Type II

Some regions are naturally described one way but not the other. The choice can significantly affect computational difficulty.

### Example 4: A Region Requiring Type II

Consider the region $D$ bounded by $x = \sqrt{y}$, $x = 0$, and $y = 4$.

**As Type II:** $D = \{(x, y) \mid 0 \leq y \leq 4, \, 0 \leq x \leq \sqrt{y}\}$ (simple!)

**As Type I:** We would need to split the region because $x$ ranges from $0$ to $2$, and for each $x$, we have $x^2 \leq y \leq 4$. This requires inverting the function $x = \sqrt{y}$ to get $y = x^2$.

### Example 5: Changing the Order of Integration

Reverse the order of integration in $\int_0^1 \int_x^{\sqrt{x}} f(x, y) \, dy \, dx$.

**Solution:**

The current order describes a Type I region: $0 \leq x \leq 1$, $x \leq y \leq \sqrt{x}$.

Wait—this is problematic! For $0 < x < 1$, we have $\sqrt{x} > x$, but we need to be careful at the endpoints.

Actually, this integral as written has an issue. Let's consider a corrected version: $\int_0^1 \int_{x^2}^{x} f(x, y) \, dy \, dx$.

This describes: $0 \leq x \leq 1$, $x^2 \leq y \leq x$.

The region is bounded by $y = x^2$ and $y = x$ between their intersections at $x = 0$ and $x = 1$.

To reverse the order, we need Type II. For $0 \leq y \leq 1$:
- Lower boundary: $y = x^2$, so $x = \sqrt{y}$
- Upper boundary: $y = x$, so $x = y$

Thus: $\int_0^1 \int_y^{\sqrt{y}} f(x, y) \, dx \, dy$.

## More Complex Regions

Some regions require subdividing into multiple Type I or Type II pieces.

### Example 6: Non-Simple Region

Consider the region bounded by $y = x^2 - 1$ and $y = 1 - x^2$.

The curves intersect where $x^2 - 1 = 1 - x^2$, giving $2x^2 = 2$, so $x = \pm 1$.

For $-1 \leq x \leq 1$: $x^2 - 1 \leq y \leq 1 - x^2$.

This is a Type I region: $D = \{(x, y) \mid -1 \leq x \leq 1, \, x^2 - 1 \leq y \leq 1 - x^2\}$.

As Type II, we would need to split at $y = 0$ and use different functions for each piece.

## Properties of Integrals over General Regions

The properties established for rectangular regions extend to general regions:

1. **Linearity**: $\iint_D [cf(x,y) + dg(x,y)] \, dA = c\iint_D f \, dA + d\iint_D g \, dA$

2. **Additivity**: If $D = D_1 \cup D_2$ with non-overlapping interiors:
   $$\iint_D f \, dA = \iint_{D_1} f \, dA + \iint_{D_2} f \, dA$$

3. **Area**: $\text{Area}(D) = \iint_D 1 \, dA$

## Conclusion

Double integrals over general regions extend our ability to compute volumes and other quantities over non-rectangular domains. The classification into Type I and Type II regions provides a systematic approach to setting up iterated integrals, with the flexibility to choose the most convenient description for each problem. In the next section, we explore polar coordinates, which provide an even more natural approach for regions with circular or radial symmetry.
