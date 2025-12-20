---
title: "Theory of Linear Differential Equations"
---

# Theory of Linear Differential Equations

## Vector Space of Solutions

The set of all solutions to a homogeneous linear differential equation forms a **vector space**.

For the nth-order equation:
$$L[y] = y^{(n)} + P_{n-1}(x)y^{(n-1)} + \cdots + P_0(x)y = 0$$

The solution set $S = \{y : L[y] = 0\}$ is a vector space because:

1. **Closure under addition**: If $y_1, y_2 \in S$, then $y_1 + y_2 \in S$

   **Proof**: $L[y_1 + y_2] = L[y_1] + L[y_2] = 0 + 0 = 0$

2. **Closure under scalar multiplication**: If $y \in S$ and $c$ is a scalar, then $cy \in S$

   **Proof**: $L[cy] = cL[y] = c \cdot 0 = 0$

3. **Contains zero vector**: $y = 0$ is always a solution

4. **Satisfies vector space axioms**: Commutativity, associativity, distributivity, etc.

## Dimension of Solution Space

**Theorem**: The solution space of an nth-order homogeneous linear ODE has **dimension n**.

This means:
- Any $n$ linearly independent solutions form a **basis**
- Every solution can be written as a linear combination of these basis solutions
- There cannot be more than $n$ linearly independent solutions

**Fundamental set**: A set of $n$ linearly independent solutions $\{y_1, y_2, \ldots, y_n\}$ is called a **fundamental set** or **fundamental system** of solutions.

**General solution**:
$$y = c_1y_1 + c_2y_2 + \cdots + c_ny_n$$

where $c_1, c_2, \ldots, c_n$ are arbitrary constants.

## Linear Independence

Functions $y_1, y_2, \ldots, y_n$ are **linearly independent** on an interval $I$ if:
$$c_1y_1(x) + c_2y_2(x) + \cdots + c_ny_n(x) = 0 \quad \forall x \in I$$

implies $c_1 = c_2 = \cdots = c_n = 0$.

Otherwise, they are **linearly dependent**.

**Geometric interpretation**: No function in the set can be expressed as a linear combination of the others.

### Testing Linear Independence

**Method 1: Wronskian**

The **Wronskian** is:
$$W(y_1, \ldots, y_n)(x) = \begin{vmatrix}
y_1 & y_2 & \cdots & y_n \\
y_1' & y_2' & \cdots & y_n' \\
\vdots & \vdots & \ddots & \vdots \\
y_1^{(n-1)} & y_2^{(n-1)} & \cdots & y_n^{(n-1)}
\end{vmatrix}$$

**Theorem**: If $y_1, \ldots, y_n$ are solutions to $L[y] = 0$ on $I$, then they are linearly independent if and only if $W \neq 0$ on $I$.

**Corollary**: Either $W(x) = 0$ for all $x \in I$, or $W(x) \neq 0$ for all $x \in I$.

**Method 2: Direct Verification**

Check if there exist non-zero constants making a linear combination zero.

## Abel's Theorem

**Theorem (Abel)**: If $y_1, \ldots, y_n$ are solutions to:
$$y^{(n)} + P_{n-1}(x)y^{(n-1)} + \cdots + P_0(x)y = 0$$

then their Wronskian satisfies:
$$W(x) = Ce^{-\int P_{n-1}(x)dx}$$

where $C$ is a constant.

**Implications**:
1. The Wronskian is either always zero or never zero
2. $W$ can be computed without knowing the solutions explicitly
3. $W$ satisfies the first-order ODE: $W' + P_{n-1}(x)W = 0$

**Example**: For $y'' + p(x)y' + q(x)y = 0$:
$$W(x) = Ce^{-\int p(x)dx}$$

## Superposition Principle

**Theorem (Superposition)**: If $y_1, y_2, \ldots, y_k$ are solutions to the homogeneous equation $L[y] = 0$, then any linear combination:
$$y = c_1y_1 + c_2y_2 + \cdots + c_ky_k$$

is also a solution.

**Non-uniqueness of fundamental sets**: There are infinitely many fundamental sets. If $\{y_1, \ldots, y_n\}$ is a fundamental set, so is any set of $n$ linear combinations with non-zero Wronskian.

## Nonhomogeneous Equations

For $L[y] = F(x)$ with $F \neq 0$:

**Theorem**: The general solution is:
$$y = y_h + y_p$$

where:
- $y_h$ is the general solution to the homogeneous equation $L[y] = 0$
- $y_p$ is any particular solution to $L[y] = F(x)$

**Proof**: If $y$ is any solution, then:
$$L[y - y_p] = L[y] - L[y_p] = F(x) - F(x) = 0$$

So $y - y_p$ is a solution to the homogeneous equation, i.e., $y - y_p = y_h$.

### Solution Space for Nonhomogeneous Equations

The set of solutions to $L[y] = F(x)$ is **not a vector space** (doesn't contain zero, not closed under addition).

However, it forms an **affine space**: a translation of the homogeneous solution space.

## Existence and Uniqueness

**Theorem (Existence and Uniqueness)**: Consider the IVP:
$$y^{(n)} + P_{n-1}(x)y^{(n-1)} + \cdots + P_0(x)y = F(x)$$
$$y(x_0) = y_0, \quad y'(x_0) = y_1, \quad \ldots, \quad y^{(n-1)}(x_0) = y_{n-1}$$

If $P_0, P_1, \ldots, P_{n-1}, F$ are continuous on an interval $I$ containing $x_0$, then:
1. A unique solution exists on $I$
2. The solution depends continuously on initial conditions

**Consequence**: The mapping from initial conditions to solutions is a bijection.

## Operator Theory Perspective

Define the **differential operator**:
$$L = D^n + P_{n-1}(x)D^{n-1} + \cdots + P_0(x)$$

where $D = \frac{d}{dx}$.

The equation $L[y] = 0$ can be viewed as finding the **kernel** (null space) of the operator $L$:
$$\ker(L) = \{y : L[y] = 0\}$$

**Properties**:
- $\ker(L)$ is a vector space
- $\dim(\ker(L)) = n$ for an nth-order operator
- $L$ is a **linear operator**: $L[ay_1 + by_2] = aL[y_1] + bL[y_2]$

## Reduction of Order

**Theorem (Reduction of Order)**: If $k$ linearly independent solutions $y_1, \ldots, y_k$ (with $k < n$) are known to an nth-order equation, the equation can be reduced to order $n - k$.

**For $k = 1$**: Substituting $y = y_1v$ reduces an nth-order equation to an $(n-1)$-order equation for $w = v'$.

**For $k = n - 1$**: The Wronskian equation can be used to find the nth solution.

## Adjoint Operator

The **adjoint operator** $L^*$ of $L = \sum_{k=0}^n a_k(x)D^k$ is:
$$L^* = \sum_{k=0}^n (-1)^k D^k[a_k(x) \cdot]$$

**Lagrange identity**:
$$vL[u] - uL^*[v] = \frac{d}{dx}P[u, v]$$

where $P[u, v]$ is a bilinear form called the **Lagrange bracket**.

**Self-adjoint operator**: $L = L^*$ (important in Sturm-Liouville theory)

## Fundamental Matrices (for Systems)

For a first-order system $\mathbf{y}' = A(x)\mathbf{y}$, a **fundamental matrix** $\Phi(x)$ is a matrix whose columns are linearly independent solutions.

**General solution**: $\mathbf{y} = \Phi(x)\mathbf{c}$ where $\mathbf{c}$ is a constant vector.

**Wronskian**: $W(x) = \det(\Phi(x))$

This generalizes to higher-order equations via conversion to first-order systems.

## Variation of Parameters (General Form)

For $L[y] = F(x)$ with fundamental set $\{y_1, \ldots, y_n\}$:

$$y_p = \sum_{i=1}^n u_i(x)y_i(x)$$

where $u_i$ satisfies:
$$u_i' = \frac{W_i(x)}{W(x)}F(x)$$

and $W_i$ is the Wronskian with the $i$-th column replaced by $[0, 0, \ldots, 0, 1]^T$.

## Linear Independence Over Different Intervals

Functions may be linearly independent on one interval but not another.

**Example**: $y_1 = x^2$ and $y_2 = |x|x$ are linearly independent on $\mathbb{R}$ but linearly dependent on $(0, \infty)$.

Always specify the interval when discussing linear independence.

## Connection to Linear Algebra

| ODE Concept | Linear Algebra Analog |
|-------------|----------------------|
| Solution space | Vector space |
| Fundamental set | Basis |
| Linear independence | Linear independence of vectors |
| Wronskian | Determinant |
| Dimension $n$ | Dimension of vector space |
| General solution | Linear combination of basis vectors |

This analogy deepens understanding and allows application of linear algebra techniques.

## Conclusion

The theory of linear differential equations reveals a rich mathematical structure. The solution space forms a finite-dimensional vector space, with fundamental sets serving as bases. The Wronskian provides a computable criterion for linear independence, while Abel's theorem connects the Wronskian to the equation's coefficients. The superposition principle and existence/uniqueness theorems provide both theoretical understanding and practical solution methods. Viewing differential equations through the lens of linear algebra and operator theory unifies concepts and provides powerful analytical tools.
