# The Complex Plane

The complex plane provides a geometric interpretation of complex numbers that reveals deep connections between algebra and geometry. This visualization transforms abstract algebraic operations into intuitive geometric transformations.

## The Argand Diagram

In 1806, Jean-Robert Argand introduced the idea of representing complex numbers as points in a plane. This representation, now called the **Argand diagram** or **complex plane**, assigns to each complex number $z = a + bi$ the point $(a, b)$ in $\mathbb{R}^2$.

- The **real axis** (horizontal) represents the real part
- The **imaginary axis** (vertical) represents the imaginary part

This establishes a bijection between $\mathbb{C}$ and $\mathbb{R}^2$:

$$z = a + bi \leftrightarrow (a, b)$$

### Plotting Complex Numbers

**Example**: Plot $z_1 = 3 + 2i$, $z_2 = -1 + 4i$, $z_3 = 2 - 3i$, $z_4 = -2 - i$

```
      Im
       |
    4  |  • z₂
    3  |
    2  |     • z₁
    1  |
  ――――+―――――――――――― Re
   -2 -1  1  2  3
   -1 |  • z₄
   -2 |
   -3 |     • z₃
       |
```

Key observations:
- Real numbers lie on the real axis
- Purely imaginary numbers lie on the imaginary axis
- The origin represents $0 + 0i = 0$

## Modulus (Absolute Value)

The **modulus** or **absolute value** of $z = a + bi$ is the distance from the origin to the point $(a, b)$:

$$|z| = \sqrt{a^2 + b^2}$$

This generalizes the absolute value for real numbers.

### Properties of Modulus

1. **Non-negativity**: $|z| \geq 0$, with equality iff $z = 0$
2. **Multiplicativity**: $|zw| = |z||w|$
3. **Conjugate symmetry**: $|\bar{z}| = |z|$
4. **Product with conjugate**: $z\bar{z} = |z|^2$
5. **Triangle inequality**: $|z + w| \leq |z| + |w|$
6. **Reverse triangle inequality**: $||z| - |w|| \leq |z - w|$

### Proof of Multiplicativity

Let $z = a + bi$ and $w = c + di$. Then:

$$zw = (ac - bd) + (ad + bc)i$$

$$|zw|^2 = (ac - bd)^2 + (ad + bc)^2$$
$$= a^2c^2 - 2abcd + b^2d^2 + a^2d^2 + 2abcd + b^2c^2$$
$$= a^2c^2 + a^2d^2 + b^2c^2 + b^2d^2$$
$$= a^2(c^2 + d^2) + b^2(c^2 + d^2)$$
$$= (a^2 + b^2)(c^2 + d^2) = |z|^2|w|^2$$

Taking square roots: $|zw| = |z||w|$.

### The Triangle Inequality

For any $z, w \in \mathbb{C}$:

$$|z + w| \leq |z| + |w|$$

with equality if and only if $z$ and $w$ point in the same direction (i.e., $w = tz$ for some $t \geq 0$).

**Geometric meaning**: The length of one side of a triangle is at most the sum of the lengths of the other two sides.

**Proof**:
$$|z + w|^2 = (z + w)\overline{(z + w)} = (z + w)(\bar{z} + \bar{w})$$
$$= z\bar{z} + z\bar{w} + w\bar{z} + w\bar{w}$$
$$= |z|^2 + |w|^2 + z\bar{w} + \overline{z\bar{w}}$$
$$= |z|^2 + |w|^2 + 2\text{Re}(z\bar{w})$$

Since $\text{Re}(z\bar{w}) \leq |z\bar{w}| = |z||\bar{w}| = |z||w|$:

$$|z + w|^2 \leq |z|^2 + |w|^2 + 2|z||w| = (|z| + |w|)^2$$

Taking square roots yields the result.

## Argument (Angle)

The **argument** of a nonzero complex number $z = a + bi$ is the angle $\theta$ (in radians) that the line from the origin to $(a, b)$ makes with the positive real axis, measured counterclockwise.

$$\arg(z) = \theta = \arctan\left(\frac{b}{a}\right) \text{ (with appropriate quadrant adjustment)}$$

### Principal Argument

Since angles are defined modulo $2\pi$, the argument is not unique. We define the **principal argument** $\text{Arg}(z)$ to be the unique value in the range $(-\pi, \pi]$:

$$\text{Arg}(z) \in (-\pi, \pi]$$

Then the general argument is:
$$\arg(z) = \text{Arg}(z) + 2\pi k, \quad k \in \mathbb{Z}$$

### Computing the Argument

Care must be taken to determine the correct quadrant:

| Quadrant | Signs of $(a, b)$ | Formula |
|----------|-------------------|---------|
| I        | $(+, +)$          | $\theta = \arctan(b/a)$ |
| II       | $(-, +)$          | $\theta = \pi - \arctan(|b/a|)$ |
| III      | $(-, -)$          | $\theta = -\pi + \arctan(|b/a|)$ |
| IV       | $(+, -)$          | $\theta = -\arctan(|b/a|)$ |

**Examples**:

1. $z = 1 + i$: $\text{Arg}(z) = \arctan(1) = \frac{\pi}{4}$

2. $z = -1 + i$: $\text{Arg}(z) = \pi - \arctan(1) = \frac{3\pi}{4}$

3. $z = -1 - i$: $\text{Arg}(z) = -\pi + \arctan(1) = -\frac{3\pi}{4}$

4. $z = 1 - i$: $\text{Arg}(z) = -\arctan(1) = -\frac{\pi}{4}$

### Special Values

- $\text{Arg}(1) = 0$
- $\text{Arg}(i) = \frac{\pi}{2}$
- $\text{Arg}(-1) = \pi$
- $\text{Arg}(-i) = -\frac{\pi}{2}$
- $\text{Arg}(0)$ is undefined

### Properties of Argument

1. **Addition under multiplication**: $\arg(zw) = \arg(z) + \arg(w) \pmod{2\pi}$
2. **Subtraction under division**: $\arg(z/w) = \arg(z) - \arg(w) \pmod{2\pi}$
3. **Negation under conjugation**: $\arg(\bar{z}) = -\arg(z) \pmod{2\pi}$
4. **Opposite under negation**: $\arg(-z) = \arg(z) + \pi \pmod{2\pi}$

**Warning**: The principal argument $\text{Arg}$ does NOT satisfy $\text{Arg}(zw) = \text{Arg}(z) + \text{Arg}(w)$ in general due to wraparound at $\pm\pi$.

**Example**: Let $z = w = -1 + i$.
- $\text{Arg}(z) = \text{Arg}(w) = \frac{3\pi}{4}$
- $zw = (-1 + i)^2 = 1 - 2i + i^2 = -2i$
- $\text{Arg}(zw) = -\frac{\pi}{2}$

But $\text{Arg}(z) + \text{Arg}(w) = \frac{3\pi}{2} \not\equiv -\frac{\pi}{2} \pmod{2\pi}$ as principal values.

However, $\arg(zw) \equiv \arg(z) + \arg(w) \pmod{2\pi}$ always holds.

## Geometric Interpretation of Operations

The complex plane transforms algebraic operations into geometric transformations.

### Addition as Vector Addition

Adding $w$ to $z$ corresponds to vector addition: translate $z$ by the vector $w$.

If $z_1 = a + bi$ and $z_2 = c + di$, then $z_1 + z_2$ is the fourth vertex of the parallelogram with vertices at $0$, $z_1$, $z_2$, and $z_1 + z_2$.

**Visualization**:
```
    z₁ + z₂ •
           /|
          / |
    z₂ • /  | z₁
        /   |
       /    |
    0 •-----•
```

### Multiplication by Real Numbers

Multiplication by a positive real number $r > 0$ scales by factor $r$:
$$|rz| = r|z|, \quad \arg(rz) = \arg(z)$$

Multiplication by $-1$ reflects through the origin:
$$|-z| = |z|, \quad \arg(-z) = \arg(z) + \pi$$

### Multiplication by $i$

Multiplication by $i$ rotates by $90°$ counterclockwise:

$$i(a + bi) = ia + bi^2 = -b + ai$$

The point $(a, b)$ becomes $(-b, a)$, which is indeed a $90°$ rotation.

$$|iz| = |i||z| = |z|, \quad \arg(iz) = \arg(i) + \arg(z) = \frac{\pi}{2} + \arg(z)$$

**Powers of $i$**:
- $i^1$: rotate $90°$
- $i^2 = -1$: rotate $180°$
- $i^3 = -i$: rotate $270°$
- $i^4 = 1$: rotate $360°$ (back to start)

### Complex Conjugation

Conjugation $z \mapsto \bar{z}$ reflects across the real axis:

$$\bar{z} = a - bi \leftrightarrow (a, -b)$$

$$|\bar{z}| = |z|, \quad \arg(\bar{z}) = -\arg(z)$$

### General Multiplication

Multiplication by $w$ combines rotation and scaling:

$$|zw| = |z||w|, \quad \arg(zw) = \arg(z) + \arg(w)$$

- Scale $z$ by factor $|w|$
- Rotate $z$ by angle $\arg(w)$

**Example**: Multiply $z = 2 + 2i$ by $w = 1 + i\sqrt{3}$.

First, find moduli and arguments:
- $|z| = \sqrt{4 + 4} = 2\sqrt{2}$
- $\arg(z) = \frac{\pi}{4}$
- $|w| = \sqrt{1 + 3} = 2$
- $\arg(w) = \arctan(\sqrt{3}) = \frac{\pi}{3}$

Then:
- $|zw| = 2\sqrt{2} \cdot 2 = 4\sqrt{2}$
- $\arg(zw) = \frac{\pi}{4} + \frac{\pi}{3} = \frac{7\pi}{12}$

We can verify algebraically:
$$zw = (2 + 2i)(1 + i\sqrt{3}) = 2 + 2i\sqrt{3} + 2i + 2i^2\sqrt{3}$$
$$= 2 - 2\sqrt{3} + (2\sqrt{3} + 2)i$$

$$|zw| = \sqrt{(2 - 2\sqrt{3})^2 + (2\sqrt{3} + 2)^2}$$
$$= \sqrt{4 - 8\sqrt{3} + 12 + 12 + 8\sqrt{3} + 4} = \sqrt{32} = 4\sqrt{2}$$ ✓

## Distance Between Complex Numbers

The distance between $z$ and $w$ is:

$$d(z, w) = |z - w|$$

This makes $\mathbb{C}$ a metric space, where $d$ satisfies:

1. **Non-negativity**: $d(z, w) \geq 0$, with equality iff $z = w$
2. **Symmetry**: $d(z, w) = d(w, z)$
3. **Triangle inequality**: $d(z, u) \leq d(z, w) + d(w, u)$

### Circles in the Complex Plane

The set of points at distance $r$ from $z_0$ forms a circle:

$$\{z \in \mathbb{C} : |z - z_0| = r\}$$

The interior (open disk) is:
$$D(z_0, r) = \{z \in \mathbb{C} : |z - z_0| < r\}$$

The closure (closed disk) is:
$$\overline{D}(z_0, r) = \{z \in \mathbb{C} : |z - z_0| \leq r\}$$

**Example**: Describe $|z - (2 + i)| = 3$.

This is the circle centered at $2 + i$ with radius $3$.

**Example**: Describe $|z - 1| = |z + 1|$.

This is the set of points equidistant from $1$ and $-1$, which is the perpendicular bisector—the imaginary axis.

$$|z - 1|^2 = |z + 1|^2$$
$$(a - 1)^2 + b^2 = (a + 1)^2 + b^2$$
$$a^2 - 2a + 1 = a^2 + 2a + 1$$
$$-2a = 2a \implies a = 0$$

So the locus is $\{bi : b \in \mathbb{R}\}$, the imaginary axis.

### Lines in the Complex Plane

The line through $z_1$ and $z_2$ can be parameterized as:

$$z(t) = (1 - t)z_1 + tz_2, \quad t \in \mathbb{R}$$

The line segment from $z_1$ to $z_2$ corresponds to $t \in [0, 1]$.

Alternatively, a line can be written as:
$$\{z : \text{Re}(\bar{w}z) = c\}$$

for some $w \in \mathbb{C} \setminus \{0\}$ and $c \in \mathbb{R}$.

## Regions in the Complex Plane

### Half-Planes

The condition $\text{Re}(z) > a$ describes the right half-plane to the right of the vertical line at $a$.

The condition $\text{Im}(z) > b$ describes the upper half-plane above the horizontal line at $b$.

More generally, $\text{Re}(\bar{w}(z - z_0)) > 0$ describes a half-plane with boundary through $z_0$ perpendicular to $w$.

### Sectors

The region $\alpha < \arg(z) < \beta$ describes a sector (wedge) with vertex at the origin.

**Example**: $0 < \arg(z) < \frac{\pi}{4}$ is the sector in the first quadrant below the line $y = x$.

### Annuli

The region $r_1 < |z - z_0| < r_2$ describes an annulus (ring) centered at $z_0$ with inner radius $r_1$ and outer radius $r_2$.

## Stereographic Projection

An elegant connection exists between $\mathbb{C}$ and the unit sphere $S^2$ via **stereographic projection**.

Place a sphere of radius $1/2$ tangent to the complex plane at the origin, with center at $(0, 0, 1/2)$. For each point $z$ in the plane, draw a line from the north pole $N = (0, 0, 1)$ through $(a, b, 0)$ (representing $z = a + bi$). This line intersects the sphere at exactly one point.

This establishes a bijection between $\mathbb{C}$ and $S^2 \setminus \{N\}$. By defining $N$ to correspond to a "point at infinity" $\infty$, we obtain the **extended complex plane** or **Riemann sphere** $\widehat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$.

We'll explore this in depth in a later section.

## Summary

- The complex plane identifies $\mathbb{C}$ with $\mathbb{R}^2$ via $a + bi \leftrightarrow (a, b)$
- The modulus $|z| = \sqrt{a^2 + b^2}$ measures distance from the origin
- The argument $\arg(z)$ measures angle from the positive real axis
- Addition corresponds to vector addition
- Multiplication combines scaling by $|w|$ and rotation by $\arg(w)$
- The distance $|z - w|$ makes $\mathbb{C}$ a metric space
- Circles, lines, and regions have elegant complex number descriptions
- The complex plane provides powerful geometric intuition for algebraic operations
