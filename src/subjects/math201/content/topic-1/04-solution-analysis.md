---
id: math201-t1-solution-analysis
title: "Solution Analysis"
order: 4
---

# Solution Analysis

## Introduction

Understanding the nature of solutions to linear systems is fundamental to linear algebra. Every linear system falls into exactly one of three categories: unique solution, infinitely many solutions, or no solution. This section develops a systematic framework for analyzing solution sets and characterizing them completely.

## The Three Possibilities

**Theorem 4.1 (Fundamental Theorem of Linear Systems):** A linear system has either:
1. Exactly one solution (unique solution)
2. Infinitely many solutions
3. No solution

**Proof idea:** If a system has at least two distinct solutions, then it has infinitely many solutions. This follows from the linearity of the equations—if $\mathbf{u}$ and $\mathbf{v}$ are solutions, then any linear combination of the form $t\mathbf{u} + (1-t)\mathbf{v}$ for $t \in \mathbb{R}$ is also a solution when the system is homogeneous, or lies on the line between them for non-homogeneous systems.

**Important:** A linear system can never have exactly 2, 3, or any other finite number of solutions greater than one.

### Solution Classification Decision Tree

The following diagram shows how to systematically classify the solution set of any linear system:

```mermaid
flowchart TD
    Start([Linear System A·x = b]) --> Reduce[Perform Gaussian Elimination<br/>to get RREF]
    Reduce --> CheckConsist{Does RREF have row<br/>of form [0 0 ... 0 | b]<br/>where b ≠ 0?}

    CheckConsist -->|Yes| Inconsist[INCONSISTENT<br/>No Solution]
    CheckConsist -->|No| Consist[CONSISTENT<br/>At least one solution]

    Consist --> CountFree{Count free variables<br/>Non-pivot columns in<br/>coefficient matrix}

    CountFree -->|Zero free variables<br/>All n columns are pivots| Unique[UNIQUE SOLUTION<br/>Exactly one solution<br/>x₁ = c₁, x₂ = c₂, ..., xₙ = cₙ]

    CountFree -->|k > 0 free variables<br/>Some columns non-pivot| Infinite[INFINITELY MANY<br/>SOLUTIONS<br/>k-parameter family]

    Infinite --> Param[Write in parametric form:<br/>x = p + t₁v₁ + t₂v₂ + ... + tₖvₖ]

    style Start fill:#e1f5e1
    style Inconsist fill:#ffe1e1
    style Unique fill:#e1f5ff
    style Infinite fill:#fff4e1
    style Param fill:#fff4e1
```

**Key Decision Points:**

1. **Consistency Check:** Look at rightmost column of RREF
   - If it's a pivot column → Inconsistent (equation $0 = b$ where $b \neq 0$)
   - If it's NOT a pivot column → Consistent

2. **Uniqueness Check (only for consistent systems):** Count free variables
   - Number of free variables $= n -$ (number of pivots)
   - If $0$ free variables → Unique solution
   - If $k > 0$ free variables → Infinitely many solutions (k-dimensional solution space)

## Consistency Analysis

### Consistency Criterion

**Definition 4.1:** A system is **consistent** if it has at least one solution, and **inconsistent** if it has no solutions.

**Theorem 4.2 (Consistency Test):** A linear system is consistent if and only if the rightmost column of the augmented matrix is NOT a pivot column.

Equivalently, the system is inconsistent if and only if the RREF of the augmented matrix contains a row of the form:
$$[0 \quad 0 \quad \cdots \quad 0 \mid b]$$
where $b \neq 0$, representing the equation $0 = b$.

### Example 1: Testing Consistency

Determine if the system is consistent:
$$\begin{cases}
x_1 + 2x_2 - x_3 = 4 \\
2x_1 + 3x_2 + x_3 = 1 \\
x_1 + x_2 + 2x_3 = -3
\end{cases}$$

**Solution:**

Form augmented matrix and reduce to REF:
$$\left[\begin{array}{ccc|c}
1 & 2 & -1 & 4 \\
2 & 3 & 1 & 1 \\
1 & 1 & 2 & -3
\end{array}\right]$$

After row operations:
$$\left[\begin{array}{ccc|c}
1 & 2 & -1 & 4 \\
0 & -1 & 3 & -7 \\
0 & 0 & 0 & 0
\end{array}\right]$$

**Analysis:** The last row is all zeros, so the rightmost column is not a pivot column.

**Conclusion:** The system is **consistent**.

### Example 2: Inconsistent System

Determine if the system is consistent:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 1 \\
x_1 + x_2 + 2x_3 = 2 \\
2x_1 + 3x_2 + 3x_3 = 4
\end{cases}$$

**Solution:**

Augmented matrix:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 1 \\
1 & 1 & 2 & 2 \\
2 & 3 & 3 & 4
\end{array}\right]$$

After Gaussian elimination:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 1 \\
0 & -1 & 1 & 1 \\
0 & 0 & 0 & 1
\end{array}\right]$$

**Analysis:** The last row represents $0x_1 + 0x_2 + 0x_3 = 1$, or $0 = 1$, which is impossible.

**Conclusion:** The system is **inconsistent** (no solution).

## Uniqueness Analysis

For consistent systems, we determine whether the solution is unique or if there are infinitely many solutions.

**Theorem 4.3 (Uniqueness Criterion):** If a linear system is consistent, then:
- The solution is **unique** if and only if there are no free variables
- There are **infinitely many solutions** if and only if there is at least one free variable

**Equivalently:** For an $m \times n$ system (m equations, n unknowns):
- Unique solution: The coefficient matrix has $n$ pivot columns
- Infinite solutions: The coefficient matrix has fewer than $n$ pivot columns

### Example 3: Unique Solution

Analyze the solution set:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 5 \\
2x_1 + 3x_2 + 3x_3 = 8 \\
x_1 - x_2 + 2x_3 = 1
\end{cases}$$

**Solution:**

RREF of augmented matrix:
$$\left[\begin{array}{ccc|c}
1 & 0 & 0 & 1 \\
0 & 1 & 0 & 2 \\
0 & 0 & 1 & 0
\end{array}\right]$$

**Analysis:**
- Consistent: rightmost column is not a pivot
- All three columns of coefficient matrix are pivot columns
- No free variables

**Conclusion:** **Unique solution:** $(x_1, x_2, x_3) = (1, 2, 0)$

### Example 4: Infinitely Many Solutions

Analyze the solution set:
$$\begin{cases}
x_1 + 2x_2 - x_3 + 3x_4 = 4 \\
2x_1 + 4x_2 + x_3 - x_4 = 3 \\
x_1 + 2x_2 - 2x_3 + 4x_4 = 5
\end{cases}$$

**Solution:**

RREF:
$$\left[\begin{array}{cccc|c}
1 & 2 & 0 & 1 & 3 \\
0 & 0 & 1 & -2 & -1 \\
0 & 0 & 0 & 0 & 0
\end{array}\right]$$

**Analysis:**
- Consistent: rightmost column is not a pivot
- Pivot columns: 1 and 3 (basic variables: $x_1$, $x_3$)
- Non-pivot columns: 2 and 4 (free variables: $x_2$, $x_4$)

**General solution:**

Let $x_2 = s$ and $x_4 = t$ (parameters):

From RREF:
$$\begin{cases}
x_1 + 2s + t = 3 \\
x_3 - 2t = -1
\end{cases}$$

Therefore:
$$\begin{cases}
x_1 = 3 - 2s - t \\
x_2 = s \\
x_3 = -1 + 2t \\
x_4 = t
\end{cases}$$

**Parametric vector form:**
$$\begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 3 \\ 0 \\ -1 \\ 0 \end{pmatrix} + s\begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t\begin{pmatrix} -1 \\ 0 \\ 2 \\ 1 \end{pmatrix}, \quad s, t \in \mathbb{R}$$

**Geometric interpretation:** The solution set is a 2-dimensional plane in $\mathbb{R}^4$. We can express this as:

$$\text{Solution set} = \left\{\mathbf{p} + s\mathbf{v}_1 + t\mathbf{v}_2 : s, t \in \mathbb{R}\right\}$$

where $\mathbf{p} = \begin{pmatrix} 3 \\ 0 \\ -1 \\ 0 \end{pmatrix}$ is a **particular solution** and $\mathbf{v}_1, \mathbf{v}_2$ span the null space of the coefficient matrix.

## Parametric Descriptions of Solution Sets

When a system has infinitely many solutions, we express the general solution using **parameters** (also called **free variables**).

### Writing Solutions in Parametric Form

**Standard process:**

1. Identify free variables from RREF (correspond to non-pivot columns)
2. Express basic variables in terms of free variables
3. Let free variables equal arbitrary parameters
4. Write solution as a vector equation

### Example 5: Converting to Parametric Form

The RREF is:
$$\left[\begin{array}{cccc|c}
1 & 3 & 0 & -2 & 5 \\
0 & 0 & 1 & 4 & -1 \\
0 & 0 & 0 & 0 & 0
\end{array}\right]$$

**Solution:**

**Step 1:** Identify variables
- Basic: $x_1$, $x_3$ (columns 1 and 3 are pivot columns)
- Free: $x_2$, $x_4$ (columns 2 and 4 are non-pivot columns)

**Step 2:** Express basics in terms of free variables

From RREF:
$$\begin{cases}
x_1 + 3x_2 - 2x_4 = 5 \\
x_3 + 4x_4 = -1
\end{cases}$$

Therefore:
$$\begin{cases}
x_1 = 5 - 3x_2 + 2x_4 \\
x_3 = -1 - 4x_4
\end{cases}$$

**Step 3:** Parameterize free variables

Let $x_2 = s$ and $x_4 = t$

**Step 4:** Write vector form
$$\mathbf{x} = \begin{pmatrix} 5 \\ 0 \\ -1 \\ 0 \end{pmatrix} + s\begin{pmatrix} -3 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t\begin{pmatrix} 2 \\ 0 \\ -4 \\ 1 \end{pmatrix}$$

The first vector is a **particular solution**, and the other vectors span the **solution space** of the associated homogeneous system.

## Relationship Between System Size and Solutions

For a system with $m$ equations and $n$ unknowns:

**Case 1: $m < n$ (fewer equations than unknowns)**
- If consistent, there are infinitely many solutions
- At most $m$ pivot columns, so at least $n - m \geq 1$ free variables

**Case 2: $m = n$ (square system)**
- Can have unique solution, infinite solutions, or no solution
- If coefficient matrix has full rank (all pivots), unique solution

**Case 3: $m > n$ (more equations than unknowns)**
- Often inconsistent (overdetermined)
- Can have unique solution or no solution
- Cannot have infinitely many solutions if all $n$ columns are pivot columns

**Theorem 4.4:** If a system has more equations than unknowns and is consistent, then either it has a unique solution or infinitely many solutions, depending on whether there are free variables.

## Practice Problems

**Problem 1:** Without solving, determine how many solutions each system has:

a) $\begin{cases} x + y = 1 \\ x + y = 2 \end{cases}$

b) $\begin{cases} x + y = 1 \\ 2x + 2y = 2 \end{cases}$

c) $\begin{cases} x + y = 3 \\ x - y = 1 \end{cases}$

**Problem 2:** The RREF of a system is:
$$\left[\begin{array}{ccccc|c}
1 & 0 & 2 & 0 & -1 & 4 \\
0 & 1 & -3 & 0 & 2 & 5 \\
0 & 0 & 0 & 1 & 6 & -2 \\
0 & 0 & 0 & 0 & 0 & 0
\end{array}\right]$$

Write the general solution in parametric vector form.

**Problem 3:** Determine all values of $k$ for which the system is consistent:
$$\begin{cases}
x_1 + 2x_2 = 3 \\
2x_1 + 4x_2 = k
\end{cases}$$

**Problem 4:** A system has 5 equations and 8 unknowns. The RREF has 4 pivots. How many solutions does the system have?

**Problem 5:** Prove that if a consistent system has more unknowns than equations, it must have infinitely many solutions.

## Summary

Solution analysis is the systematic study of when systems are consistent and whether solutions are unique. The key tools are the RREF and the identification of pivot columns. A consistent system has a unique solution if and only if every variable is basic (corresponds to a pivot column). When free variables exist, the solution set is infinite and can be described parametrically. Understanding these principles allows us to completely characterize the solution structure of any linear system before even computing specific values.
