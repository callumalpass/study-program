---
id: math201-t1-intro
title: "Introduction to Linear Systems"
order: 1
---

# Introduction to Linear Systems

## Definition of Linear Systems

A **linear equation** in the variables $x_1, x_2, \ldots, x_n$ is an equation that can be written in the form:

$$a_1x_1 + a_2x_2 + \cdots + a_nx_n = b$$

where $a_1, a_2, \ldots, a_n$ and $b$ are real constants, and $x_1, x_2, \ldots, x_n$ are the unknowns. The key characteristic of a linear equation is that each variable appears only to the first power and variables are not multiplied together.

A **system of linear equations** (or **linear system**) is a collection of one or more linear equations involving the same variables. For example, a system of three equations in three unknowns:

$$\begin{cases}
2x_1 + 3x_2 - x_3 = 5 \\
x_1 - x_2 + 2x_3 = -1 \\
3x_1 + x_2 + x_3 = 4
\end{cases}$$

### Linear vs. Nonlinear Equations

**Linear equations** include:
- $3x + 2y = 7$
- $x_1 - 4x_2 + x_3 = 0$
- $\frac{1}{2}x - \frac{3}{4}y + z = \sqrt{2}$

**Nonlinear equations** include:
- $x^2 + y = 3$ (contains $x^2$)
- $xy = 5$ (variables multiplied together)
- $\sin(x) + y = 1$ (contains transcendental function)
- $\sqrt{x} + y = 2$ (contains radical of variable)

## Solutions to Linear Systems

A **solution** to a linear system is an ordered set of numbers $(s_1, s_2, \ldots, s_n)$ that satisfies all equations in the system simultaneously when substituted for $(x_1, x_2, \ldots, x_n)$.

The **solution set** is the collection of all possible solutions. A system is called **consistent** if it has at least one solution, and **inconsistent** if it has no solutions.

### Example 1: Verifying a Solution

Consider the system:
$$\begin{cases}
x_1 + 2x_2 = 4 \\
3x_1 - x_2 = 1
\end{cases}$$

**Question:** Is $(2, 1)$ a solution?

**Solution:**
Substitute $x_1 = 2$ and $x_2 = 1$ into both equations:

First equation: $2 + 2(1) = 2 + 2 = 4$ ✓

Second equation: $3(2) - 1 = 6 - 1 = 5 \neq 1$ ✗

Since $(2, 1)$ does not satisfy the second equation, it is **not** a solution.

**Question:** Is $(1, \frac{3}{2})$ a solution?

**Solution:**
Substitute $x_1 = 1$ and $x_2 = \frac{3}{2}$:

First equation: $1 + 2(\frac{3}{2}) = 1 + 3 = 4$ ✓

Second equation: $3(1) - \frac{3}{2} = 3 - \frac{3}{2} = \frac{3}{2} \neq 1$ ✗

This is also **not** a solution. We'll learn systematic methods to find the actual solution later.

## Geometric Interpretation

The geometric interpretation of linear systems provides valuable intuition about solutions.

### Two Variables (2D)

In two-dimensional space, each linear equation $ax + by = c$ represents a **line**. The solution to a system of two equations is the **intersection point(s)** of the two lines.

**Three possibilities:**

1. **One solution:** The lines intersect at exactly one point
   ```
   Example: x + y = 3 and x - y = 1

        y
        ^
      3 |\
        | \  x + y = 3
      2 |  \
        |   * (2,1) ← unique solution
      1 |  /
        | /   x - y = 1
        |/_____________> x
        0   1   2   3
   ```

2. **No solution:** The lines are parallel and distinct
   ```
   Example: x + y = 1 and x + y = 3

        y
        ^
      3 |----------  x + y = 3
        |
      2 |
        |
      1 |----------  x + y = 1
        |
        |_____________> x
        0   1   2   3

   No intersection → inconsistent system
   ```

3. **Infinitely many solutions:** The lines coincide
   ```
   Example: 2x + 4y = 6 and x + 2y = 3

        y
        ^
      2 |
        |\
      1 | \_______ Both equations represent
        |  \       the same line
        |   \
        |____\_____> x
        0   1   2   3

   Every point on the line is a solution
   ```

### Three Variables (3D)

In three-dimensional space, each linear equation $ax + by + cz = d$ represents a **plane**. The solution to a system of three equations is the **intersection** of three planes.

**Possibilities include:**

1. **Unique solution:** Three planes intersect at a single point
2. **No solution:** Planes have no common intersection (e.g., parallel planes, or two planes intersect along a line that is parallel to the third plane)
3. **Infinitely many solutions:**
   - Three planes intersect along a common line
   - Three planes are identical (coincide)

### Example 2: Geometric Analysis

Consider:
$$\begin{cases}
x + y = 2 \\
x - y = 0
\end{cases}$$

**Geometric interpretation:**
- First equation: Line with slope $-1$, $y$-intercept $2$
- Second equation: Line through origin with slope $1$

These lines have different slopes, so they must intersect at exactly one point.

**Finding the intersection algebraically:**
From the second equation: $x = y$

Substitute into the first: $y + y = 2 \Rightarrow 2y = 2 \Rightarrow y = 1$

Therefore: $x = 1$, $y = 1$

The unique solution is $(1, 1)$.

## Fundamental Questions

When analyzing any linear system, we seek to answer two fundamental questions:

1. **Existence:** Does the system have a solution? (Is it consistent?)
2. **Uniqueness:** If a solution exists, is it unique, or are there infinitely many?

These questions will guide our study of linear algebra. The methods we develop (Gaussian elimination, matrix operations, etc.) are all tools to answer these questions systematically.

## Key Terminology

**Definition 1.1 (Linear Equation):** An equation in variables $x_1, \ldots, x_n$ that can be written as $a_1x_1 + \cdots + a_nx_n = b$ where $a_i, b$ are constants.

**Definition 1.2 (Solution):** An $n$-tuple $(s_1, \ldots, s_n)$ that satisfies all equations when substituted for $(x_1, \ldots, x_n)$.

**Definition 1.3 (Consistent System):** A system with at least one solution.

**Definition 1.4 (Inconsistent System):** A system with no solutions.

**Definition 1.5 (Equivalent Systems):** Two systems with identical solution sets.

## Practice Problems

**Problem 1:** Determine whether each equation is linear:
a) $3x - 4y + z = 7$
b) $x^2 + y = 5$
c) $\frac{x}{2} - \frac{y}{3} = 1$
d) $xy + z = 2$

**Problem 2:** Verify whether $(1, 2, -1)$ is a solution to:
$$\begin{cases}
x + y + z = 2 \\
2x - y + 3z = -3 \\
x + 2y - z = 6
\end{cases}$$

**Problem 3:** Describe geometrically the solution set of:
$$\begin{cases}
x + y = 5 \\
2x + 2y = 10
\end{cases}$$

**Problem 4:** Without solving, determine how many solutions the following system has:
$$\begin{cases}
x + y = 3 \\
x + y = 5
\end{cases}$$

**Problem 5:** Find all values of $k$ for which the system is consistent:
$$\begin{cases}
x + 2y = 3 \\
2x + 4y = k
\end{cases}$$

## Summary

Linear systems form the foundation of linear algebra. Understanding their definition, recognizing linearity, and visualizing their geometric interpretations are essential skills. In the following sections, we'll develop systematic algebraic methods to solve these systems and characterize their solution sets completely. The key insight is that every linear system falls into one of three categories: unique solution, no solution, or infinitely many solutions.
