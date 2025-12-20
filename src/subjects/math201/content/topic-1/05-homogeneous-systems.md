# Homogeneous Systems

## Definition and Basic Properties

A system of linear equations is **homogeneous** if all the constant terms are zero. In other words, a homogeneous system has the form:

$$\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = 0 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = 0 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = 0
\end{cases}$$

Or in matrix form: $A\mathbf{x} = \mathbf{0}$

where $A$ is the $m \times n$ coefficient matrix, $\mathbf{x}$ is the vector of unknowns, and $\mathbf{0}$ is the zero vector.

**Definition 5.1 (Homogeneous System):** A linear system is homogeneous if it can be written as $A\mathbf{x} = \mathbf{0}$.

### Example 1: Homogeneous vs. Non-homogeneous

**Homogeneous:**
$$\begin{cases}
2x_1 + 3x_2 - x_3 = 0 \\
x_1 - x_2 + 2x_3 = 0 \\
3x_1 + x_2 + x_3 = 0
\end{cases}$$

**Non-homogeneous (also called inhomogeneous):**
$$\begin{cases}
2x_1 + 3x_2 - x_3 = 5 \\
x_1 - x_2 + 2x_3 = -1 \\
3x_1 + x_2 + x_3 = 4
\end{cases}$$

The second system differs from the first only in the constant terms.

## The Trivial Solution

**Theorem 5.1 (Existence of Trivial Solution):** Every homogeneous system is consistent and has at least one solution, namely the **trivial solution** where all variables equal zero.

**Proof:** Substituting $x_1 = x_2 = \cdots = x_n = 0$ into any homogeneous equation gives:
$$a_1(0) + a_2(0) + \cdots + a_n(0) = 0$$
which is always true. □

**Definition 5.2 (Trivial Solution):** The solution $\mathbf{x} = \mathbf{0}$ (all variables equal to zero) is called the **trivial solution**.

**Definition 5.3 (Nontrivial Solution):** Any solution with at least one nonzero component is called a **nontrivial solution**.

### Key Question

Since homogeneous systems are always consistent, the fundamental question becomes:

**Does the system have nontrivial solutions?**

## Nontrivial Solutions Criterion

**Theorem 5.2 (Nontrivial Solutions Existence):** A homogeneous system $A\mathbf{x} = \mathbf{0}$ has nontrivial solutions if and only if the system has at least one free variable.

**Equivalently:**
- If $A$ has fewer pivot columns than variables, nontrivial solutions exist
- If $A$ is $m \times n$ with $m < n$, nontrivial solutions exist
- If every column of $A$ is a pivot column, only the trivial solution exists

**Theorem 5.3 (Free Variables Guarantee):** If a homogeneous system has more unknowns than equations, it must have infinitely many nontrivial solutions.

**Proof:** With $n$ unknowns and $m$ equations where $n > m$, there can be at most $m$ pivot positions. Therefore, there are at least $n - m \geq 1$ free variables, guaranteeing infinitely many solutions beyond the trivial one. □

### Example 2: Trivial Solution Only

Solve:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 0 \\
2x_1 + 3x_2 + 3x_3 = 0 \\
x_1 - x_2 + 4x_3 = 0
\end{cases}$$

**Solution:**

Augmented matrix (note the zero column):
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 0 \\
2 & 3 & 3 & 0 \\
1 & -1 & 4 & 0
\end{array}\right]$$

After Gauss-Jordan elimination:
$$\left[\begin{array}{ccc|c}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0
\end{array}\right]$$

**Analysis:**
- All three columns are pivot columns
- No free variables
- Only solution: $x_1 = x_2 = x_3 = 0$

**Conclusion:** The system has only the **trivial solution**.

### Example 3: Nontrivial Solutions

Solve:
$$\begin{cases}
x_1 + 2x_2 - x_3 + x_4 = 0 \\
2x_1 + 4x_2 + x_3 - x_4 = 0 \\
x_1 + 2x_2 - 2x_3 + 2x_4 = 0
\end{cases}$$

**Solution:**

After row reduction to RREF:
$$\left[\begin{array}{cccc|c}
1 & 2 & 0 & 0 & 0 \\
0 & 0 & 1 & -1 & 0 \\
0 & 0 & 0 & 0 & 0
\end{array}\right]$$

**Analysis:**
- Pivot columns: 1 and 3
- Free variables: $x_2$ and $x_4$
- Nontrivial solutions exist!

**General solution:**

Let $x_2 = s$ and $x_4 = t$:

From RREF:
$$\begin{cases}
x_1 + 2s = 0 \\
x_3 - t = 0
\end{cases}$$

Therefore:
$$\begin{cases}
x_1 = -2s \\
x_2 = s \\
x_3 = t \\
x_4 = t
\end{cases}$$

**Parametric vector form:**
$$\mathbf{x} = s\begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t\begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix}$$

where $s, t \in \mathbb{R}$.

**Verification:** Check $s = 1, t = 0$: $(-2, 1, 0, 0)$
- First equation: $-2 + 2(1) - 0 + 0 = 0$ ✓
- Second equation: $2(-2) + 4(1) + 0 - 0 = 0$ ✓
- Third equation: $-2 + 2(1) - 0 + 0 = 0$ ✓

## Solution Space Structure

The solution set of a homogeneous system $A\mathbf{x} = \mathbf{0}$ has special algebraic structure.

**Theorem 5.4 (Closure Properties):** If $\mathbf{u}$ and $\mathbf{v}$ are solutions to $A\mathbf{x} = \mathbf{0}$, then:

1. **Closure under addition:** $\mathbf{u} + \mathbf{v}$ is also a solution
2. **Closure under scalar multiplication:** $c\mathbf{u}$ is a solution for any scalar $c$

**Proof:**
1. $A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v} = \mathbf{0} + \mathbf{0} = \mathbf{0}$
2. $A(c\mathbf{u}) = c(A\mathbf{u}) = c\mathbf{0} = \mathbf{0}$ □

This means the solution set forms a **subspace** of $\mathbb{R}^n$ (a concept we'll explore more deeply later).

### Example 4: Combining Solutions

From Example 3, we found that both
$$\mathbf{u} = \begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} \quad \text{and} \quad \mathbf{v} = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix}$$
are solutions.

**Verify that $\mathbf{u} + \mathbf{v}$ is a solution:**
$$\mathbf{u} + \mathbf{v} = \begin{pmatrix} -2 \\ 1 \\ 1 \\ 1 \end{pmatrix}$$

Check in original system:
- $-2 + 2(1) - 1 + 1 = 0$ ✓
- $2(-2) + 4(1) + 1 - 1 = 0$ ✓
- $-2 + 2(1) - 2(1) + 2(1) = 0$ ✓

**Verify that $3\mathbf{u}$ is a solution:**
$$3\mathbf{u} = \begin{pmatrix} -6 \\ 3 \\ 0 \\ 0 \end{pmatrix}$$

Check:
- $-6 + 2(3) - 0 + 0 = 0$ ✓
- $2(-6) + 4(3) + 0 - 0 = 0$ ✓
- $-6 + 2(3) - 0 + 0 = 0$ ✓

## Introduction to Null Space

**Definition 5.4 (Null Space):** The set of all solutions to the homogeneous system $A\mathbf{x} = \mathbf{0}$ is called the **null space** of $A$, denoted $\text{Nul}(A)$.

**Formally:**
$$\text{Nul}(A) = \{\mathbf{x} \in \mathbb{R}^n : A\mathbf{x} = \mathbf{0}\}$$

The null space is a fundamental concept in linear algebra and will be studied extensively in later chapters.

### Properties of the Null Space

1. $\text{Nul}(A)$ always contains the zero vector
2. $\text{Nul}(A)$ is closed under addition and scalar multiplication (is a subspace)
3. The dimension of $\text{Nul}(A)$ equals the number of free variables
4. If $A$ is $m \times n$, then $\text{Nul}(A) \subseteq \mathbb{R}^n$

### Example 5: Describing the Null Space

For the matrix:
$$A = \begin{pmatrix}
1 & 2 & -1 & 3 \\
2 & 4 & 1 & -1 \\
1 & 2 & -2 & 4
\end{pmatrix}$$

We found (in Example 3):
$$\text{Nul}(A) = \left\{s\begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t\begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix} : s, t \in \mathbb{R}\right\}$$

**Geometric interpretation:** $\text{Nul}(A)$ is a 2-dimensional plane through the origin in $\mathbb{R}^4$.

The vectors $\begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 0 \\ 1 \\ 1 \end{pmatrix}$ **span** the null space.

## Relationship to Non-homogeneous Systems

Consider a non-homogeneous system $A\mathbf{x} = \mathbf{b}$ where $\mathbf{b} \neq \mathbf{0}$.

**Theorem 5.5:** If $\mathbf{p}$ is a particular solution to $A\mathbf{x} = \mathbf{b}$, then the complete solution set is:
$$\{\mathbf{p} + \mathbf{h} : \mathbf{h} \in \text{Nul}(A)\}$$

In other words: **General solution = Particular solution + Null space**

**Proof:** If $A\mathbf{p} = \mathbf{b}$ and $A\mathbf{h} = \mathbf{0}$, then:
$$A(\mathbf{p} + \mathbf{h}) = A\mathbf{p} + A\mathbf{h} = \mathbf{b} + \mathbf{0} = \mathbf{b}$$

Conversely, if $A\mathbf{x} = \mathbf{b}$ and $A\mathbf{p} = \mathbf{b}$, then:
$$A(\mathbf{x} - \mathbf{p}) = A\mathbf{x} - A\mathbf{p} = \mathbf{b} - \mathbf{b} = \mathbf{0}$$

So $\mathbf{x} - \mathbf{p} \in \text{Nul}(A)$. □

### Example 6: Using Null Space to Solve Non-homogeneous Systems

Suppose $\mathbf{p} = \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix}$ is a solution to $A\mathbf{x} = \mathbf{b}$, and
$$\text{Nul}(A) = \left\{t\begin{pmatrix} 2 \\ -1 \\ 1 \end{pmatrix} : t \in \mathbb{R}\right\}$$

Then the general solution to $A\mathbf{x} = \mathbf{b}$ is:
$$\mathbf{x} = \begin{pmatrix} 1 \\ 2 \\ -1 \end{pmatrix} + t\begin{pmatrix} 2 \\ -1 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 + 2t \\ 2 - t \\ -1 + t \end{pmatrix}$$

## Practice Problems

**Problem 1:** Determine which systems have only the trivial solution:

a) 3 equations, 3 unknowns, 3 pivot positions

b) 2 equations, 4 unknowns

c) 4 equations, 3 unknowns, 3 pivot positions

**Problem 2:** Solve the homogeneous system:
$$\begin{cases}
x_1 + 3x_2 - x_3 = 0 \\
2x_1 + 6x_2 + 4x_3 = 0 \\
x_1 + 3x_2 + 5x_3 = 0
\end{cases}$$

**Problem 3:** Find the null space of:
$$A = \begin{pmatrix}
1 & -2 & 3 \\
2 & -4 & 6
\end{pmatrix}$$

**Problem 4:** If $\mathbf{u}$ and $\mathbf{v}$ are solutions to $A\mathbf{x} = \mathbf{0}$, prove that $3\mathbf{u} - 2\mathbf{v}$ is also a solution.

**Problem 5:** The solution to $A\mathbf{x} = \mathbf{b}$ is $\mathbf{x} = \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix} + t\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$.

What is $\text{Nul}(A)$? What is a particular solution to $A\mathbf{x} = \mathbf{b}$?

## Summary

Homogeneous systems have special properties: they are always consistent (trivial solution always exists) and their solution sets form subspaces called null spaces. The key question for homogeneous systems is whether nontrivial solutions exist, which occurs if and only if there are free variables. The structure of homogeneous solutions (closure under addition and scalar multiplication) makes them foundational to understanding vector spaces, and the relationship between homogeneous and non-homogeneous systems provides a powerful framework for characterizing all solutions to linear systems.
