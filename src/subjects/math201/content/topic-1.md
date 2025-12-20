# Topic 1: Systems of Linear Equations

## Overview

Systems of linear equations form the foundation of linear algebra and appear throughout mathematics, science, and engineering. This topic introduces the fundamental concepts, solution methods, and applications that will underpin all subsequent study in linear algebra.

A **linear equation** is an equation in which each variable appears only to the first power and variables are not multiplied together. A **system of linear equations** is a collection of such equations involving the same variables. The central problem is to determine whether solutions exist and, if so, to find all solutions.

## Learning Objectives

By the end of this topic, you should be able to:

1. Recognize linear equations and distinguish them from nonlinear equations
2. Interpret linear systems geometrically in 2D and 3D
3. Apply Gaussian elimination to solve systems of linear equations
4. Use Gauss-Jordan elimination to find reduced row echelon form
5. Analyze solution sets to determine consistency and uniqueness
6. Solve homogeneous systems and understand the null space
7. Represent linear systems using matrices and matrix-vector equations
8. Apply linear systems to real-world problems in various fields

## Key Concepts

### Fundamental Questions

When analyzing any linear system, we seek to answer two fundamental questions:

1. **Existence**: Does the system have a solution? (Is it consistent?)
2. **Uniqueness**: If a solution exists, is it unique, or are there infinitely many?

### The Three Possibilities

**Fundamental Theorem**: Every linear system has exactly one of three outcomes:
- **Unique solution**: One solution exists
- **Infinitely many solutions**: The system has free variables
- **No solution**: The system is inconsistent

A linear system can never have exactly 2, 3, or any other finite number of solutions greater than one.

### Solution Methods

**Gaussian Elimination**:
- Transform the augmented matrix to row echelon form (REF)
- Use back substitution to find solutions
- Efficient for computational purposes

**Gauss-Jordan Elimination**:
- Transform to reduced row echelon form (RREF)
- Solutions are immediately visible
- Unique RREF for each matrix (unlike REF)

### Matrix Representation

Every linear system can be represented in three equivalent ways:

1. **Equation form**: Traditional system of equations
2. **Matrix equation**: $A\mathbf{x} = \mathbf{b}$
3. **Column perspective**: Find linear combination of columns

The column perspective provides geometric intuition: solving $A\mathbf{x} = \mathbf{b}$ means expressing $\mathbf{b}$ as a linear combination of the columns of $A$.

### Homogeneous Systems

A system is **homogeneous** if all constant terms are zero: $A\mathbf{x} = \mathbf{0}$

Key properties:
- Always consistent (trivial solution $\mathbf{x} = \mathbf{0}$ always exists)
- Nontrivial solutions exist if and only if there are free variables
- Solution set forms a subspace (the null space of $A$)
- If more unknowns than equations, infinitely many solutions exist

### Consistency and Uniqueness Criteria

**Consistency**: A system $A\mathbf{x} = \mathbf{b}$ is consistent if and only if the rightmost column of the augmented matrix is not a pivot column.

**Uniqueness** (for consistent systems): The solution is unique if and only if every variable is a basic variable (no free variables exist).

## Subtopics

1. **[Introduction to Linear Systems](./topic-1/01-introduction-to-linear-systems.md)**
   - Definition of linear equations and systems
   - Geometric interpretation (lines, planes, hyperplanes)
   - Solution sets and consistency
   - Linear vs. nonlinear equations

2. **[Gaussian Elimination](./topic-1/02-gaussian-elimination.md)**
   - Elementary row operations
   - Row echelon form (REF)
   - Forward elimination algorithm
   - Back substitution
   - Pivot positions and pivot columns

3. **[Gauss-Jordan Elimination](./topic-1/03-gauss-jordan-elimination.md)**
   - Reduced row echelon form (RREF)
   - Complete reduction algorithm
   - Uniqueness of RREF
   - Immediate solution visibility
   - Basic vs. free variables

4. **[Solution Analysis](./topic-1/04-solution-analysis.md)**
   - Consistency testing
   - Uniqueness criteria
   - Parametric descriptions of solution sets
   - Relationship between system size and solutions
   - The three cases: unique, infinite, or no solutions

5. **[Homogeneous Systems](./topic-1/05-homogeneous-systems.md)**
   - Definition and basic properties
   - Trivial vs. nontrivial solutions
   - Null space introduction
   - Solution space structure
   - Relationship to non-homogeneous systems

6. **[Matrix Representation](./topic-1/06-matrix-representation.md)**
   - Coefficient matrix and augmented matrix
   - Matrix-vector multiplication
   - Matrix equation $A\mathbf{x} = \mathbf{b}$
   - Column perspective and linear combinations
   - Span and linear independence preview

7. **[Applications of Linear Systems](./topic-1/07-applications-linear-systems.md)**
   - Network flow problems (traffic, circuits, data)
   - Chemical equation balancing
   - Polynomial curve fitting
   - Electrical circuits (Kirchhoff's laws)
   - Economic input-output models
   - Computer graphics transformations

## Important Theorems

**Theorem 1.1 (Three Possibilities)**: A linear system has exactly one solution, infinitely many solutions, or no solutions.

**Theorem 1.2 (Elementary Row Operations)**: Elementary row operations produce equivalent systems with identical solution sets.

**Theorem 1.3 (Existence and Uniqueness via RREF)**:
- A system is consistent ⟺ the rightmost column of the augmented matrix is not a pivot column
- If consistent, the solution is unique ⟺ there are no free variables

**Theorem 1.4 (Homogeneous Solutions Structure)**: If $\mathbf{u}$ and $\mathbf{v}$ are solutions to $A\mathbf{x} = \mathbf{0}$, then $\mathbf{u} + \mathbf{v}$ and $c\mathbf{u}$ (for any scalar $c$) are also solutions.

**Theorem 1.5 (Uniqueness of RREF)**: Each matrix has a unique reduced row echelon form.

**Theorem 1.6 (Matrix Multiplication Linearity)**: For matrix $A$ and vectors $\mathbf{u}, \mathbf{v}$:
- $A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v}$
- $A(c\mathbf{u}) = c(A\mathbf{u})$

## Connections to Other Topics

This topic provides the foundation for:
- **Topic 2 (Matrix Algebra)**: Matrix operations, inverses, and determinants build on the row operations and matrix equations introduced here
- **Topic 3 (Vector Spaces)**: The solution structure of homogeneous systems motivates the abstract definition of vector spaces and subspaces
- **Topic 4 (Orthogonality)**: Least squares solutions extend the concept of solving inconsistent systems
- **Topic 5 (Eigenvalues)**: Finding eigenvalues reduces to solving homogeneous systems of the form $(A - \lambda I)\mathbf{x} = \mathbf{0}$

## Study Tips

1. **Practice row reduction extensively**: The mechanical skill of reducing matrices is essential and only comes through repetition

2. **Visualize in 2D and 3D**: Draw pictures for small systems to build geometric intuition

3. **Check your answers**: Always verify solutions by substituting back into the original equations

4. **Understand the three perspectives**: Be comfortable switching between equation form, matrix equation, and column perspective

5. **Identify the question being asked**: Is it asking about existence, uniqueness, or the actual solution values?

6. **Work through applications**: Real-world problems provide context and motivation for abstract techniques

7. **Recognize patterns**: After solving many systems, you'll start to see structure and predict outcomes before computing

## Prerequisites

- Algebraic manipulation and equation solving
- Basic understanding of functions and variables
- Familiarity with coordinate systems (Cartesian plane)
- Comfort with mathematical notation and summation

## Next Steps

After mastering this topic, you should:
- Proceed to Topic 2 (Matrix Algebra) to develop computational fluency with matrix operations
- Begin thinking about linear transformations and how matrices represent them
- Start recognizing linear systems in applications across your other coursework
- Build toward the unifying concepts of vector spaces and linear transformations

---

Systems of linear equations are the gateway to linear algebra. The methods developed here—row reduction, matrix representation, and solution analysis—appear repeatedly throughout the subject. Mastering this topic thoroughly will pay dividends in all subsequent study of linear algebra and its applications.
