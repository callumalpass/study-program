---
id: math201-t1-applications
title: "Applications of Linear Systems"
order: 7
---

# Applications of Linear Systems

## Introduction

Linear systems appear throughout science, engineering, economics, and everyday life. This section explores several important applications that demonstrate the power and versatility of the techniques we've developed. These applications not only showcase the practical utility of linear algebra but also provide intuition for why certain theoretical concepts matter.

## Application 1: Network Flow Problems

**Network flow** problems involve finding the flow of materials, information, or resources through a network subject to conservation laws. Examples include traffic flow, electrical circuits, water distribution, and data networks.

### Basic Principles

1. **Conservation at nodes:** Flow in = Flow out
2. **Capacity constraints:** Flow ≤ maximum capacity
3. **Non-negativity:** Flow ≥ 0

### Example 1: Traffic Flow Analysis

Consider a network of one-way streets with intersections labeled A, B, C, D. The flow (vehicles per hour) into and out of each intersection must be balanced.

```
     200           150
  -----> A -----> B ----->
         |         |
     x₁  |         | x₂
         ↓         ↓
  -----> C -----> D ----->
     100           ?
```

Additional flows:
- From A to C: $x_1$ vehicles/hour
- From B to D: $x_2$ vehicles/hour
- From C to D: $x_3$ vehicles/hour
- Exit from D: $x_4$ vehicles/hour

**Conservation equations:**

**At intersection A:**
- In: 200
- Out: 150 + $x_1$
- Conservation: $200 = 150 + x_1$

**At intersection B:**
- In: 150
- Out: $x_2$
- Conservation: $150 = x_2$

**At intersection C:**
- In: 100 + $x_1$
- Out: $x_3$
- Conservation: $100 + x_1 = x_3$

**At intersection D:**
- In: $x_2 + x_3$
- Out: $x_4$
- Conservation: $x_2 + x_3 = x_4$

**System of equations:**
$$\begin{cases}
x_1 = 50 \\
x_2 = 150 \\
-x_1 + x_3 = 100 \\
x_2 + x_3 - x_4 = 0
\end{cases}$$

**Solution:**
From the first equation: $x_1 = 50$

From the second: $x_2 = 150$

From the third: $x_3 = 100 + 50 = 150$

From the fourth: $x_4 = 150 + 150 = 300$

**Traffic flow:** 50 from A to C, 150 from B to D, 150 from C to D, 300 exiting from D.

### Example 2: Network with Free Variables

Consider a more complex network where some flows are undetermined:

```
        x₁          x₂
     -----> A -----> B
     |      ↓        |
   100    x₃        |
     |      ↓        ↓
     ----> C -----> D
            x₄
```

**Conservation equations:**

At A: $100 = x_1 + x_3$

At B: $x_2 = x_2$ (automatically satisfied if we account for outflow)

At C: $x_3 + x_4 = x_5$ (assuming $x_5$ is output)

If we have 3 equations and 4 unknowns, we expect one free variable.

**Augmented matrix approach:**
$$\left[\begin{array}{cccc|c}
1 & 0 & 1 & 0 & 100 \\
0 & 1 & 0 & -1 & 0 \\
0 & 0 & 1 & 1 & 150
\end{array}\right]$$

After row reduction:
$$\left[\begin{array}{cccc|c}
1 & 0 & 0 & -1 & -50 \\
0 & 1 & 0 & -1 & 0 \\
0 & 0 & 1 & 1 & 150
\end{array}\right]$$

**General solution** (with $x_4 = t$):
$$\begin{cases}
x_1 = -50 + t \\
x_2 = t \\
x_3 = 150 - t \\
x_4 = t
\end{cases}$$

**Physical constraints:** Since flows must be non-negative:
- $x_1 = -50 + t \geq 0 \Rightarrow t \geq 50$
- $x_3 = 150 - t \geq 0 \Rightarrow t \leq 150$

**Feasible range:** $50 \leq t \leq 150$

## Application 2: Chemical Equation Balancing

Chemical equations must be balanced so the number of atoms of each element is the same on both sides. This is a system of linear equations where the unknowns are the coefficients.

### Example 3: Balancing a Chemical Equation

Balance the combustion of ethane:
$$x_1 \text{C}_2\text{H}_6 + x_2 \text{O}_2 \rightarrow x_3 \text{CO}_2 + x_4 \text{H}_2\text{O}$$

**Element balance:**

**Carbon (C):** $2x_1 = x_3$

**Hydrogen (H):** $6x_1 = 2x_4$

**Oxygen (O):** $2x_2 = 2x_3 + x_4$

**System:**
$$\begin{cases}
2x_1 - x_3 = 0 \\
6x_1 - 2x_4 = 0 \\
2x_2 - 2x_3 - x_4 = 0
\end{cases}$$

**Augmented matrix:**
$$\left[\begin{array}{cccc|c}
2 & 0 & -1 & 0 & 0 \\
6 & 0 & 0 & -2 & 0 \\
0 & 2 & -2 & -1 & 0
\end{array}\right]$$

This is a homogeneous system. After row reduction:
$$\left[\begin{array}{cccc|c}
1 & 0 & 0 & -\frac{1}{2} & 0 \\
0 & 1 & 0 & -\frac{7}{2} & 0 \\
0 & 0 & 1 & -1 & 0
\end{array}\right]$$

**General solution** (with $x_4 = t$):
$$\begin{cases}
x_1 = \frac{t}{2} \\
x_2 = \frac{7t}{2} \\
x_3 = t \\
x_4 = t
\end{cases}$$

**Physical requirement:** Coefficients must be positive integers. Choose $t = 2$:
$$\begin{cases}
x_1 = 1 \\
x_2 = 7 \\
x_3 = 2 \\
x_4 = 2
\end{cases}$$

**Balanced equation:**
$$\text{C}_2\text{H}_6 + 7\text{O}_2 \rightarrow 2\text{CO}_2 + 2\text{H}_2\text{O}$$

Wait, let me verify: Actually, $6x_1 = 2x_4$ gives $x_4 = 3x_1$. Let me recalculate.

From $2x_1 = x_3$ and $6x_1 = 2x_4$, we get $x_3 = 2x_1$ and $x_4 = 3x_1$.

Substituting into the oxygen equation: $2x_2 = 2(2x_1) + 3x_1 = 7x_1$, so $x_2 = \frac{7x_1}{2}$.

Setting $x_1 = 2$: $x_2 = 7$, $x_3 = 4$, $x_4 = 6$.

**Correct balanced equation:**
$$2\text{C}_2\text{H}_6 + 7\text{O}_2 \rightarrow 4\text{CO}_2 + 6\text{H}_2\text{O}$$

## Application 3: Polynomial Curve Fitting

Given data points, we can find a polynomial that passes through them by solving a linear system.

### Example 4: Parabola Through Three Points

Find the parabola $y = ax^2 + bx + c$ passing through $(1, 3)$, $(2, 1)$, and $(3, 4)$.

**Setting up equations:**

At $(1, 3)$: $a(1)^2 + b(1) + c = 3 \Rightarrow a + b + c = 3$

At $(2, 1)$: $a(2)^2 + b(2) + c = 1 \Rightarrow 4a + 2b + c = 1$

At $(3, 4)$: $a(3)^2 + b(3) + c = 4 \Rightarrow 9a + 3b + c = 4$

**System:**
$$\begin{cases}
a + b + c = 3 \\
4a + 2b + c = 1 \\
9a + 3b + c = 4
\end{cases}$$

**Augmented matrix:**
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 3 \\
4 & 2 & 1 & 1 \\
9 & 3 & 1 & 4
\end{array}\right]$$

**Row reduction:**

$R_2 \rightarrow R_2 - 4R_1$:
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 3 \\
0 & -2 & -3 & -11 \\
9 & 3 & 1 & 4
\end{array}\right]$$

$R_3 \rightarrow R_3 - 9R_1$:
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 3 \\
0 & -2 & -3 & -11 \\
0 & -6 & -8 & -23
\end{array}\right]$$

$R_3 \rightarrow R_3 - 3R_2$:
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 3 \\
0 & -2 & -3 & -11 \\
0 & 0 & 1 & 10
\end{array}\right]$$

**Back substitution:**

From row 3: $c = 10$

From row 2: $-2b - 3(10) = -11 \Rightarrow -2b = 19 \Rightarrow b = -\frac{19}{2}$

From row 1: $a - \frac{19}{2} + 10 = 3 \Rightarrow a = 3 + \frac{19}{2} - 10 = \frac{6 + 19 - 20}{2} = \frac{5}{2}$

**Solution:** $a = \frac{5}{2}$, $b = -\frac{19}{2}$, $c = 10$

**Parabola:** $y = \frac{5}{2}x^2 - \frac{19}{2}x + 10$

**Verification:**
- At $x=1$: $\frac{5}{2}(1) - \frac{19}{2}(1) + 10 = \frac{5-19+20}{2} = \frac{6}{2} = 3$ ✓
- At $x=2$: $\frac{5}{2}(4) - \frac{19}{2}(2) + 10 = \frac{20-38+20}{2} = \frac{2}{2} = 1$ ✓
- At $x=3$: $\frac{5}{2}(9) - \frac{19}{2}(3) + 10 = \frac{45-57+20}{2} = \frac{8}{2} = 4$ ✓

## Application 4: Electrical Circuits (Kirchhoff's Laws)

**Kirchhoff's laws** govern electrical circuits and lead to systems of linear equations.

**Kirchhoff's Current Law (KCL):** The sum of currents entering a node equals the sum leaving.

**Kirchhoff's Voltage Law (KVL):** The sum of voltage drops around any closed loop is zero.

### Example 5: Simple Circuit Analysis

Consider a circuit with three resistors and two voltage sources:

```
    +---R₁(2Ω)---+
    |            |
   V₁(10V)      R₂(3Ω)
    |            |
    +-----+------+
          |
         R₃(1Ω)
          |
         V₂(5V)
          |
         ---
```

Let $I_1, I_2, I_3$ be the currents through $R_1, R_2, R_3$ respectively.

**KCL at the top node:**
$$I_1 = I_2 + I_3$$

**KVL for left loop:**
$$10 - 2I_1 - 1I_3 = 0$$

**KVL for right loop:**
$$-3I_2 - 5 + 1I_3 = 0$$

**System:**
$$\begin{cases}
I_1 - I_2 - I_3 = 0 \\
2I_1 + I_3 = 10 \\
-3I_2 + I_3 = 5
\end{cases}$$

**Matrix form:**
$$\left[\begin{array}{ccc|c}
1 & -1 & -1 & 0 \\
2 & 0 & 1 & 10 \\
0 & -3 & 1 & 5
\end{array}\right]$$

**Solution** (after row reduction):
$$I_1 = 3.5\text{A}, \quad I_2 = 2.5\text{A}, \quad I_3 = 1\text{A}$$

(The detailed reduction is left as an exercise.)

## Application 5: Economic Input-Output Models

The **Leontief input-output model** describes how different sectors of an economy interact.

### Example 6: Simple Economic Model

Consider a simplified economy with three sectors: Agriculture (A), Manufacturing (M), and Services (S).

**Production requirements:**
- Each dollar of A output requires: $0.20 from A, $0.30 from M, $0.10 from S
- Each dollar of M output requires: $0.10 from A, $0.40 from M, $0.20 from S
- Each dollar of S output requires: $0.10 from A, $0.20 from M, $0.30 from S

**External demand:** $d_A = 50$, $d_M = 60$, $d_S = 70$ (in millions)

Let $x_A, x_M, x_S$ be the total production levels.

**Balance equations:**
$$\begin{cases}
x_A = 0.20x_A + 0.10x_M + 0.10x_S + 50 \\
x_M = 0.30x_A + 0.40x_M + 0.20x_S + 60 \\
x_S = 0.10x_A + 0.20x_M + 0.30x_S + 70
\end{cases}$$

**Rearranging:**
$$\begin{cases}
0.80x_A - 0.10x_M - 0.10x_S = 50 \\
-0.30x_A + 0.60x_M - 0.20x_S = 60 \\
-0.10x_A - 0.20x_M + 0.70x_S = 70
\end{cases}$$

**Matrix form:** $(I - A)\mathbf{x} = \mathbf{d}$ where $A$ is the input-output matrix and $I$ is the identity.

Solving this system gives the production levels needed to meet both internal and external demands.

## Application 6: Computer Graphics Transformations

Linear systems arise in computer graphics when solving for unknown points after transformations.

### Example 7: Finding Original Coordinates

After a rotation and scaling transformation, a point ends up at $(5, 3)$. If the transformation matrix is:
$$T = \begin{pmatrix} 2 & -1 \\ 1 & 2 \end{pmatrix}$$

Find the original point $(x, y)$.

**Equation:** $T\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$

**System:**
$$\begin{cases}
2x - y = 5 \\
x + 2y = 3
\end{cases}$$

**Solution:**
From second equation: $x = 3 - 2y$

Substitute: $2(3-2y) - y = 5 \Rightarrow 6 - 4y - y = 5 \Rightarrow y = \frac{1}{5}$

Therefore: $x = 3 - 2(\frac{1}{5}) = \frac{13}{5}$

**Original point:** $(\frac{13}{5}, \frac{1}{5})$

## Practice Problems

**Problem 1:** In a traffic network, 300 cars/hr enter at A, and flows must balance at all intersections. Set up and solve the system to find all unknown flows.

**Problem 2:** Balance the chemical equation:
$$x_1\text{Fe} + x_2\text{O}_2 \rightarrow x_3\text{Fe}_2\text{O}_3$$

**Problem 3:** Find the cubic polynomial $y = ax^3 + bx^2 + cx + d$ passing through $(0,1), (1,0), (2,3), (3,10)$.

**Problem 4:** A circuit has three resistors in a configuration with two voltage sources. Using Kirchhoff's laws, set up the system to find all currents.

**Problem 5:** In a three-sector economy with input-output matrix:
$$A = \begin{pmatrix} 0.3 & 0.2 & 0.1 \\ 0.2 & 0.4 & 0.3 \\ 0.1 & 0.2 & 0.2 \end{pmatrix}$$

and external demand $\mathbf{d} = \begin{pmatrix} 100 \\ 150 \\ 200 \end{pmatrix}$, find total production levels.

## Summary

Linear systems appear in countless applications across diverse fields. Network flow problems use conservation laws, chemical equations require element balance, curve fitting translates geometric constraints into algebra, electrical circuits obey Kirchhoff's laws, economic models balance supply and demand, and computer graphics involves coordinate transformations. The common thread is that these practical problems reduce to solving systems of linear equations—demonstrating the universal importance of the methods developed in this topic. Understanding these applications not only shows the power of linear algebra but also provides concrete contexts that illuminate abstract theoretical concepts.
