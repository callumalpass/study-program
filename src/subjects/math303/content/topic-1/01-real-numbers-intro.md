---
title: "Introduction to Real Numbers"
slug: "real-numbers-intro"
description: "Construction and fundamental properties of the real number system"
---

# Introduction to Real Numbers

## Historical Context

The development of the real number system represents one of the most significant achievements in mathematical rigor. While ancient mathematicians worked with numbers intuitively, the formal construction of $\mathbb{R}$ emerged from the need to resolve paradoxes and provide solid foundations for calculus.

## The Field Axioms

The real numbers form a **field**, satisfying algebraic axioms that govern arithmetic operations.

### Addition Axioms

For all $x, y, z \in \mathbb{R}$:

**A1 (Closure):** $x + y \in \mathbb{R}$

**A2 (Associativity):** $(x + y) + z = x + (y + z)$

**A3 (Commutativity):** $x + y = y + x$

**A4 (Identity):** There exists $0 \in \mathbb{R}$ such that $x + 0 = x$

**A5 (Inverse):** For each $x$, there exists $-x$ such that $x + (-x) = 0$

### Multiplication Axioms

For all $x, y, z \in \mathbb{R}$:

**M1 (Closure):** $x \cdot y \in \mathbb{R}$

**M2 (Associativity):** $(x \cdot y) \cdot z = x \cdot (y \cdot z)$

**M3 (Commutativity):** $x \cdot y = y \cdot x$

**M4 (Identity):** There exists $1 \in \mathbb{R}$, $1 \neq 0$, such that $x \cdot 1 = x$

**M5 (Inverse):** For each $x \neq 0$, there exists $x^{-1}$ such that $x \cdot x^{-1} = 1$

### Distributive Law

**D:** $x \cdot (y + z) = x \cdot y + x \cdot z$

## The Order Axioms

The real numbers possess a **total order** $\leq$ satisfying:

**O1 (Trichotomy):** For any $x, y \in \mathbb{R}$, exactly one holds: $x < y$, $x = y$, or $x > y$

**O2 (Transitivity):** If $x \leq y$ and $y \leq z$, then $x \leq z$

**O3 (Addition Compatibility):** If $x \leq y$, then $x + z \leq y + z$

**O4 (Multiplication Compatibility):** If $x \leq y$ and $z \geq 0$, then $xz \leq yz$

## Consequences of Field and Order Axioms

### Theorem 1.1: Cancellation Laws

**Addition:** If $x + z = y + z$, then $x = y$

**Multiplication:** If $xz = yz$ and $z \neq 0$, then $x = y$

**Proof (Addition):** Suppose $x + z = y + z$. Then:
$$
\begin{align}
(x + z) + (-z) &= (y + z) + (-z) \\
x + (z + (-z)) &= y + (z + (-z)) \quad \text{(by A2)} \\
x + 0 &= y + 0 \quad \text{(by A5)} \\
x &= y \quad \text{(by A4)}
\end{align}
$$

### Theorem 1.2: Properties of Zero

1. $0 \cdot x = 0$ for all $x \in \mathbb{R}$
2. If $xy = 0$, then $x = 0$ or $y = 0$
3. $(-1) \cdot x = -x$

**Proof of (1):** We have:
$$
0 \cdot x = (0 + 0) \cdot x = 0 \cdot x + 0 \cdot x
$$
By cancellation, $0 = 0 \cdot x$.

**Proof of (2):** Suppose $xy = 0$ and $x \neq 0$. Then $x$ has an inverse $x^{-1}$, so:
$$
y = 1 \cdot y = (x^{-1}x)y = x^{-1}(xy) = x^{-1} \cdot 0 = 0
$$

### Theorem 1.3: Sign Rules

For all $x, y \in \mathbb{R}$:

1. $(-x)(-y) = xy$
2. $-(xy) = (-x)y = x(-y)$
3. If $x > 0$ and $y > 0$, then $xy > 0$

**Proof of (1):** Since $(-x)(-y) + (-x)y = (-x)((-y) + y) = (-x) \cdot 0 = 0$, we have $(-x)(-y) = -((-x)y) = xy$.

## Natural Numbers and Induction

Within $\mathbb{R}$, we can identify the **natural numbers** $\mathbb{N} = \{1, 2, 3, \ldots\}$ as the smallest subset satisfying:

1. $1 \in \mathbb{N}$
2. If $n \in \mathbb{N}$, then $n + 1 \in \mathbb{N}$

### Principle of Mathematical Induction

Let $P(n)$ be a statement about natural numbers. If:

1. $P(1)$ is true
2. For all $k \in \mathbb{N}$, $P(k) \implies P(k+1)$

Then $P(n)$ is true for all $n \in \mathbb{N}$.

### Well-Ordering Principle

Every nonempty subset of $\mathbb{N}$ has a smallest element.

**Theorem 1.4:** The Principle of Induction and Well-Ordering Principle are equivalent.

## Absolute Value

**Definition:** The **absolute value** of $x \in \mathbb{R}$ is:
$$
|x| = \begin{cases}
x & \text{if } x \geq 0 \\
-x & \text{if } x < 0
\end{cases}
$$

### Properties of Absolute Value

**Theorem 1.5:** For all $x, y \in \mathbb{R}$:

1. $|x| \geq 0$, with equality if and only if $x = 0$
2. $|-x| = |x|$
3. $|xy| = |x||y|$
4. **Triangle Inequality:** $|x + y| \leq |x| + |y|$
5. **Reverse Triangle Inequality:** $||x| - |y|| \leq |x - y|$

**Proof of Triangle Inequality:** We have $-|x| \leq x \leq |x|$ and $-|y| \leq y \leq |y|$. Adding:
$$
-(|x| + |y|) \leq x + y \leq |x| + |y|
$$
This is equivalent to $|x + y| \leq |x| + |y|$.

**Proof of Reverse Triangle Inequality:** From the triangle inequality:
$$
|x| = |(x - y) + y| \leq |x - y| + |y|
$$
Thus $|x| - |y| \leq |x - y|$. Similarly, $|y| - |x| \leq |x - y|$. Since $||x| - |y||$ equals one of these, the result follows.

## The Extended Real Numbers

We extend $\mathbb{R}$ by adding two elements $\infty$ and $-\infty$, defining $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, \infty\}$ with the conventions:

- For all $x \in \mathbb{R}$: $-\infty < x < \infty$
- $x + \infty = \infty$ for $x \in \mathbb{R} \cup \{\infty\}$
- $x + (-\infty) = -\infty$ for $x \in \mathbb{R} \cup \{-\infty\}$
- $x \cdot \infty = \infty$ if $x > 0$
- $x \cdot \infty = -\infty$ if $x < 0$

The expressions $\infty - \infty$, $0 \cdot \infty$, and $\frac{\infty}{\infty}$ remain undefined.

## Rational and Irrational Numbers

**Definition:** A real number is **rational** if it can be expressed as $\frac{p}{q}$ where $p, q \in \mathbb{Z}$ and $q \neq 0$. Otherwise, it is **irrational**.

**Theorem 1.6:** $\sqrt{2}$ is irrational.

**Proof:** Suppose $\sqrt{2} = \frac{p}{q}$ where $p, q \in \mathbb{N}$ have no common factors. Then $2q^2 = p^2$, so $p^2$ is even, implying $p$ is even. Write $p = 2k$. Then $2q^2 = 4k^2$, so $q^2 = 2k^2$, implying $q$ is even. This contradicts the assumption that $p$ and $q$ have no common factors.

## Density of Rationals

**Theorem 1.7:** Between any two distinct real numbers, there exists a rational number.

This property will be proved using the Archimedean property in a subsequent section.

## Conclusion

The field and order axioms provide the algebraic foundation for the real numbers, but they do not uniquely characterize $\mathbb{R}$. The rationals $\mathbb{Q}$ also satisfy these axioms. The distinguishing feature of $\mathbb{R}$ is the **completeness axiom**, which we explore in the next section.
