---
title: "Nonhomogeneous Higher-Order Equations"
---

# Nonhomogeneous Higher-Order Equations

## General Form

A nonhomogeneous nth-order linear equation with constant coefficients has the form:

$$a_ny^{(n)} + a_{n-1}y^{(n-1)} + \cdots + a_1y' + a_0y = f(x)$$

where $f(x) \neq 0$ is the **forcing function** or **nonhomogeneous term**.

## Solution Structure

**Theorem**: The general solution is:
$$y = y_h + y_p$$

where:
- $y_h$ is the **complementary solution** (general solution to the homogeneous equation)
- $y_p$ is any **particular solution** to the nonhomogeneous equation

This is the same structure as for second-order equations.

## Method of Undetermined Coefficients

The method of undetermined coefficients extends naturally to higher-order equations when $f(x)$ has special forms.

### Trial Solutions

| Form of $f(x)$ | Trial $y_p$ |
|----------------|-------------|
| $P_n(x)$ (polynomial) | $x^s(A_nx^n + \cdots + A_0)$ |
| $e^{\alpha x}$ | $x^sAe^{\alpha x}$ |
| $\cos\beta x$ or $\sin\beta x$ | $x^s(A\cos\beta x + B\sin\beta x)$ |
| $e^{\alpha x}\cos\beta x$ | $x^se^{\alpha x}(A\cos\beta x + B\sin\beta x)$ |

where $s$ is the smallest nonnegative integer ensuring no term in $y_p$ is a solution to the homogeneous equation.

**Example 1**: Solve $y''' - 3y'' + 3y' - y = 2x + 3$.

**Step 1**: Find $y_h$

Characteristic equation: $r^3 - 3r^2 + 3r - 1 = (r - 1)^3 = 0$

$$y_h = (c_1 + c_2x + c_3x^2)e^x$$

**Step 2**: Find $y_p$

For $f(x) = 2x + 3$, try $y_p = Ax + B$.

But wait—check if this matches $y_h$. Since $y_h$ contains only $e^x$ terms, not polynomials, no modification needed.

Compute derivatives:
$$y_p' = A, \quad y_p'' = 0, \quad y_p''' = 0$$

Substitute:
$$0 - 0 + 3A - (Ax + B) = 2x + 3$$
$$-Ax + (3A - B) = 2x + 3$$

Equate coefficients:
$$-A = 2 \Rightarrow A = -2$$
$$3A - B = 3 \Rightarrow -6 - B = 3 \Rightarrow B = -9$$

$$y_p = -2x - 9$$

**General solution**:
$$y = (c_1 + c_2x + c_3x^2)e^x - 2x - 9$$

**Example 2**: Solve $y^{(4)} - y = e^x + x$.

**Step 1**: Find $y_h$

$r^4 - 1 = (r - 1)(r + 1)(r^2 + 1) = 0$

Roots: $r = 1, -1, \pm i$

$$y_h = c_1e^x + c_2e^{-x} + c_3\cos x + c_4\sin x$$

**Step 2**: Find $y_p$

For $f(x) = e^x + x$, use superposition: $y_p = y_{p1} + y_{p2}$

**For $e^x$**: Since $e^x$ is in $y_h$, try $y_{p1} = Axe^x$

Derivatives:
$$y_{p1}' = Ae^x + Axe^x = A(1 + x)e^x$$
$$y_{p1}'' = A(2 + x)e^x$$
$$y_{p1}''' = A(3 + x)e^x$$
$$y_{p1}^{(4)} = A(4 + x)e^x$$

Substitute into $y^{(4)} - y = e^x$:
$$A(4 + x)e^x - Axe^x = e^x$$
$$4Ae^x = e^x$$
$$A = \frac{1}{4}$$

**For $x$**: Try $y_{p2} = Bx + C$

$$y_{p2}^{(4)} - (Bx + C) = x$$
$$-(Bx + C) = x$$
$$B = -1, \quad C = 0$$

**Total particular solution**:
$$y_p = \frac{1}{4}xe^x - x$$

**General solution**:
$$y = c_1e^x + c_2e^{-x} + c_3\cos x + c_4\sin x + \frac{1}{4}xe^x - x$$

### Modification Rule

If any term in the trial solution appears in $y_h$, multiply by $x^s$ where $s$ is the smallest positive integer making all terms linearly independent from $y_h$.

**Example 3**: Solve $y''' - y' = x$.

Characteristic equation: $r^3 - r = r(r - 1)(r + 1) = 0$

$$y_h = c_1 + c_2e^x + c_3e^{-x}$$

For $f(x) = x$, normally try $y_p = Ax + B$.

But the constant term $B$ appears in $y_h$ (as $c_1$). Multiply by $x$:
$$y_p = Ax^2 + Bx$$

Compute derivatives:
$$y_p' = 2Ax + B$$
$$y_p'' = 2A$$
$$y_p''' = 0$$

Substitute:
$$0 - (2Ax + B) = x$$
$$-2Ax - B = x$$

$$A = -\frac{1}{2}, \quad B = 0$$

$$y_p = -\frac{x^2}{2}$$

**General solution**:
$$y = c_1 + c_2e^x + c_3e^{-x} - \frac{x^2}{2}$$

## Variation of Parameters

For higher-order equations $L[y] = f(x)$ where $L$ is a linear differential operator, variation of parameters still works but becomes more complex.

For an nth-order equation with fundamental solutions $y_1, y_2, \ldots, y_n$, assume:
$$y_p = u_1y_1 + u_2y_2 + \cdots + u_ny_n$$

The functions $u_1', u_2', \ldots, u_n'$ satisfy the system:

$$\begin{cases}
u_1'y_1 + u_2'y_2 + \cdots + u_n'y_n = 0 \\
u_1'y_1' + u_2'y_2' + \cdots + u_n'y_n' = 0 \\
\vdots \\
u_1'y_1^{(n-2)} + u_2'y_2^{(n-2)} + \cdots + u_n'y_n^{(n-2)} = 0 \\
u_1'y_1^{(n-1)} + u_2'y_2^{(n-1)} + \cdots + u_n'y_n^{(n-1)} = f(x)
\end{cases}$$

Solve using Cramer's rule with Wronskian determinants.

**Example 4**: Solve $y''' - y' = \sec x$ (simplified).

This requires computing a $3 \times 3$ Wronskian and solving for $u_1'$, $u_2'$, $u_3'$. The process is algebraically intensive but systematic.

## Superposition

If $f(x) = f_1(x) + f_2(x) + \cdots + f_k(x)$, then:
$$y_p = y_{p1} + y_{p2} + \cdots + y_{pk}$$

where $y_{pi}$ is a particular solution for $f_i(x)$.

**Example 5**: Solve $y''' + y' = x + \cos x$.

**For $f_1(x) = x$**: $y_{p1} = \frac{x^2}{2}$ (as computed earlier)

**For $f_2(x) = \cos x$**: Try $y_{p2} = A\cos x + B\sin x$

After substitution and solving:
$$y_{p2} = \frac{1}{2}x\sin x$$

(The $x$ factor arises because $\cos x$ and $\sin x$ are in $y_h$.)

**Total**:
$$y_p = \frac{x^2}{2} + \frac{1}{2}x\sin x$$

## Initial Value Problems

**Example 6**: Solve $y''' - y'' = 2$ with $y(0) = 1$, $y'(0) = 0$, $y''(0) = 0$.

Characteristic equation: $r^3 - r^2 = r^2(r - 1) = 0$

Roots: $r = 0$ (multiplicity 2), $r = 1$

$$y_h = c_1 + c_2x + c_3e^x$$

For $f(x) = 2$, try $y_p = A$. But constant is in $y_h$. Try $Ax$—still in $y_h$. Try $Ax^2$:

$$y_p = Ax^2$$
$$y_p' = 2Ax, \quad y_p'' = 2A, \quad y_p''' = 0$$

$$0 - 2A = 2 \Rightarrow A = -1$$

$$y_p = -x^2$$

General solution:
$$y = c_1 + c_2x + c_3e^x - x^2$$

Apply initial conditions:
$$y(0) = c_1 + c_3 = 1$$
$$y'(0) = c_2 + c_3 = 0$$
$$y''(0) = c_3 - 2 = 0 \Rightarrow c_3 = 2$$

From second equation: $c_2 = -2$

From first equation: $c_1 = -1$

Particular solution:
$$y = -1 - 2x + 2e^x - x^2$$

## Conclusion

Nonhomogeneous higher-order equations follow the same principles as second-order equations: find the complementary solution, then add a particular solution. Undetermined coefficients works for special forms of $f(x)$, while variation of parameters handles general cases. The increased order adds computational complexity but doesn't fundamentally change the approach. Understanding the modification rule and superposition principle is key to efficiently solving these equations.
