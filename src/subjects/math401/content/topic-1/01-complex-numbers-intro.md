---
id: math401-topic-1-1
title: "Introduction to Complex Numbers"
order: 1
---

# Introduction to Complex Numbers

Complex numbers extend the real number system to include solutions to equations that have no real solutions, such as $x^2 + 1 = 0$. This extension is not merely a mathematical curiosity—complex numbers are fundamental to modern mathematics, physics, and engineering.

## Historical Motivation

For centuries, mathematicians struggled with equations like $x^2 = -1$. The ancient Greeks knew about irrational numbers like $\sqrt{2}$, but the idea of taking the square root of a negative number seemed nonsensical. After all, both positive and negative numbers square to positive values.

The breakthrough came in the 16th century when Italian mathematicians, working on cubic equations, found that even when seeking real solutions, intermediate steps required manipulating square roots of negative numbers. Rafael Bombelli (1526-1572) developed systematic rules for these "imaginary" quantities, showing they could lead to correct real answers.

## The Imaginary Unit

We define the imaginary unit $i$ by the property:

$$i^2 = -1$$

This single definition opens an entirely new mathematical universe. From it, we can construct all complex numbers.

### Powers of i

The powers of $i$ cycle with period 4:

$$\begin{align}
i^0 &= 1 \\
i^1 &= i \\
i^2 &= -1 \\
i^3 &= i^2 \cdot i = -i \\
i^4 &= (i^2)^2 = (-1)^2 = 1 \\
i^5 &= i^4 \cdot i = i
\end{align}$$

For any integer $n$, we have $i^n = i^{n \bmod 4}$.

**Example**: $i^{47} = i^{47 \bmod 4} = i^3 = -i$

## Definition of Complex Numbers

A **complex number** is an expression of the form:

$$z = a + bi$$

where $a$ and $b$ are real numbers, and $i$ is the imaginary unit.

- $a$ is called the **real part** of $z$, denoted $\text{Re}(z)$ or $\Re(z)$
- $b$ is called the **imaginary part** of $z$, denoted $\text{Im}(z)$ or $\Im(z)$

**Important**: The imaginary part is the real number $b$, not $bi$.

### Special Cases

1. **Real numbers**: When $b = 0$, we have $z = a + 0i = a$ (purely real)
2. **Imaginary numbers**: When $a = 0$ and $b \neq 0$, we have $z = bi$ (purely imaginary)
3. **Zero**: The unique complex number where both $a = 0$ and $b = 0$

### Set Notation

The set of all complex numbers is denoted $\mathbb{C}$:

$$\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}$$

This shows that $\mathbb{R} \subset \mathbb{C}$—the real numbers are a subset of the complex numbers.

## Equality of Complex Numbers

Two complex numbers are equal if and only if their real parts are equal AND their imaginary parts are equal:

$$a + bi = c + di \iff a = c \text{ and } b = d$$

This seemingly simple definition has profound consequences. It means complex number equations are equivalent to systems of two real equations.

**Example**: If $(x + 2) + (y - 1)i = 5 + 3i$, then:
- $x + 2 = 5 \implies x = 3$
- $y - 1 = 3 \implies y = 4$

## Arithmetic Operations

Complex numbers support all standard arithmetic operations, with natural extensions of real number arithmetic.

### Addition and Subtraction

Complex numbers add component-wise:

$$(a + bi) + (c + di) = (a + c) + (b + d)i$$

$$(a + bi) - (c + di) = (a - c) + (b - d)i$$

**Geometric interpretation**: Addition corresponds to vector addition in the plane (we'll explore this in the next section).

**Example**:
$$(3 + 2i) + (1 - 4i) = 4 - 2i$$
$$(5 + 7i) - (2 + 3i) = 3 + 4i$$

### Properties of Addition

Addition on $\mathbb{C}$ forms an abelian group:

1. **Closure**: If $z, w \in \mathbb{C}$, then $z + w \in \mathbb{C}$
2. **Associativity**: $(z_1 + z_2) + z_3 = z_1 + (z_2 + z_3)$
3. **Identity**: $z + 0 = z$ for all $z \in \mathbb{C}$
4. **Inverses**: For every $z = a + bi$, there exists $-z = -a - bi$ such that $z + (-z) = 0$
5. **Commutativity**: $z + w = w + z$

### Multiplication

To multiply complex numbers, we use the distributive property and the fact that $i^2 = -1$:

$$(a + bi)(c + di) = ac + adi + bci + bdi^2$$
$$= ac + adi + bci - bd$$
$$= (ac - bd) + (ad + bc)i$$

**Key formula**:
$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$

**Example**:
$$(3 + 2i)(1 + 4i) = 3 \cdot 1 - 2 \cdot 4 + (3 \cdot 4 + 2 \cdot 1)i$$
$$= 3 - 8 + (12 + 2)i = -5 + 14i$$

### Properties of Multiplication

Multiplication on $\mathbb{C}$ also has rich structure:

1. **Closure**: If $z, w \in \mathbb{C}$, then $zw \in \mathbb{C}$
2. **Associativity**: $(z_1z_2)z_3 = z_1(z_2z_3)$
3. **Identity**: $z \cdot 1 = z$ for all $z \in \mathbb{C}$
4. **Commutativity**: $zw = wz$
5. **Distributivity**: $z(w_1 + w_2) = zw_1 + zw_2$

Together with addition, these properties make $\mathbb{C}$ a **field**.

## Complex Conjugate

The **complex conjugate** of $z = a + bi$ is defined as:

$$\bar{z} = a - bi$$

Geometrically, $\bar{z}$ is the reflection of $z$ across the real axis.

### Properties of Conjugation

1. $\overline{\bar{z}} = z$ (conjugation is self-inverse)
2. $\overline{z + w} = \bar{z} + \bar{w}$ (conjugation distributes over addition)
3. $\overline{z \cdot w} = \bar{z} \cdot \bar{w}$ (conjugation distributes over multiplication)
4. $\overline{z/w} = \bar{z}/\bar{w}$ (for $w \neq 0$)
5. $z + \bar{z} = 2\text{Re}(z)$
6. $z - \bar{z} = 2i\text{Im}(z)$
7. $z\bar{z} = a^2 + b^2$ (always a non-negative real number)

### Extracting Real and Imaginary Parts

From properties 5 and 6:

$$\text{Re}(z) = \frac{z + \bar{z}}{2}, \quad \text{Im}(z) = \frac{z - \bar{z}}{2i}$$

### When is a Complex Number Real?

A complex number $z$ is real if and only if $z = \bar{z}$.

**Proof**:
- If $z = a + bi$ is real, then $b = 0$, so $\bar{z} = a - 0i = a = z$.
- Conversely, if $z = \bar{z}$, then $a + bi = a - bi$, so $2bi = 0$, thus $b = 0$.

## Division

To divide complex numbers, we multiply numerator and denominator by the conjugate of the denominator:

$$\frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{(c + di)(c - di)} = \frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}$$

The denominator $c^2 + d^2$ is always positive when $c + di \neq 0$, ensuring division is well-defined.

**Formula**:
$$\frac{a + bi}{c + di} = \frac{ac + bd}{c^2 + d^2} + \frac{bc - ad}{c^2 + d^2}i$$

**Example**:
$$\frac{3 + 2i}{1 + 4i} = \frac{(3 + 2i)(1 - 4i)}{(1 + 4i)(1 - 4i)} = \frac{3 - 12i + 2i - 8i^2}{1 - 16i^2}$$
$$= \frac{3 - 10i + 8}{1 + 16} = \frac{11 - 10i}{17} = \frac{11}{17} - \frac{10}{17}i$$

### Multiplicative Inverses

Every nonzero complex number $z = a + bi$ has a multiplicative inverse:

$$z^{-1} = \frac{1}{z} = \frac{\bar{z}}{z\bar{z}} = \frac{a - bi}{a^2 + b^2} = \frac{a}{a^2 + b^2} - \frac{b}{a^2 + b^2}i$$

This shows that $\mathbb{C} \setminus \{0\}$ forms a group under multiplication.

## Field Properties

The complex numbers $(\mathbb{C}, +, \cdot)$ form a **field**, meaning:

1. $(\mathbb{C}, +)$ is an abelian group
2. $(\mathbb{C} \setminus \{0\}, \cdot)$ is an abelian group
3. Multiplication distributes over addition

Moreover, $\mathbb{C}$ is **algebraically closed**: every non-constant polynomial with complex coefficients has a complex root. This is the Fundamental Theorem of Algebra, which we'll explore later.

In contrast, $\mathbb{R}$ is not algebraically closed: $x^2 + 1$ has no real roots.

## Square Roots of Complex Numbers

Every nonzero complex number has exactly two square roots. To find $\sqrt{a + bi}$, we seek $x + yi$ such that:

$$(x + yi)^2 = a + bi$$

Expanding: $x^2 - y^2 + 2xyi = a + bi$

Equating real and imaginary parts:
$$x^2 - y^2 = a$$
$$2xy = b$$

Also, $(x + yi)\overline{(x + yi)} = x^2 + y^2 = |a + bi| = \sqrt{a^2 + b^2}$

From these equations:
$$x = \pm\sqrt{\frac{\sqrt{a^2 + b^2} + a}{2}}$$
$$y = \pm\sqrt{\frac{\sqrt{a^2 + b^2} - a}{2}}$$

with the signs chosen so that $xy$ has the same sign as $b$.

**Example**: Find $\sqrt{3 + 4i}$.

$$\sqrt{a^2 + b^2} = \sqrt{9 + 16} = 5$$

$$x = \pm\sqrt{\frac{5 + 3}{2}} = \pm\sqrt{4} = \pm 2$$

$$y = \pm\sqrt{\frac{5 - 3}{2}} = \pm\sqrt{1} = \pm 1$$

Since $b = 4 > 0$, we need $xy > 0$, so $x$ and $y$ have the same sign.

The two square roots are $\sqrt{3 + 4i} = \pm(2 + i)$.

**Verification**: $(2 + i)^2 = 4 + 4i + i^2 = 4 + 4i - 1 = 3 + 4i$ ✓

## Applications

Complex numbers are not merely theoretical constructs—they have profound practical applications:

1. **Electrical Engineering**: AC circuit analysis uses complex impedance
2. **Quantum Mechanics**: Wave functions are complex-valued
3. **Signal Processing**: Fourier transforms map real signals to complex frequency domain
4. **Control Theory**: Stability analysis via poles in the complex plane
5. **Fluid Dynamics**: Complex potential theory for 2D flows
6. **Number Theory**: Many theorems about integers are proven using complex analysis

## Why Complex Numbers Work

The "unreasonable effectiveness" of complex numbers stems from several factors:

1. **Algebraic closure**: Every polynomial equation has solutions in $\mathbb{C}$
2. **Rich geometry**: The complex plane naturally encodes 2D geometry
3. **Analytic structure**: Differentiable complex functions have remarkable properties
4. **Symmetry**: Complex numbers encode rotations and scaling elegantly

In subsequent sections, we'll explore these aspects in depth, seeing how the simple definition $i^2 = -1$ leads to one of mathematics' most beautiful and powerful theories.

## Summary

- Complex numbers have the form $z = a + bi$ where $a, b \in \mathbb{R}$ and $i^2 = -1$
- $\mathbb{C}$ forms a field under addition and multiplication
- The complex conjugate $\bar{z} = a - bi$ reflects $z$ across the real axis
- Division uses conjugation: $\frac{z}{w} = \frac{z\bar{w}}{|w|^2}$
- Every nonzero complex number has exactly two square roots
- Complex numbers extend the real numbers while preserving field structure
