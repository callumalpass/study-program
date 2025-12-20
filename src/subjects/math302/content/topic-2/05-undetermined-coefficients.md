---
title: "Method of Undetermined Coefficients"
---

# Method of Undetermined Coefficients

## Introduction

The **method of undetermined coefficients** is a technique for finding particular solutions to nonhomogeneous linear differential equations with constant coefficients:

$$ay'' + by' + cy = f(x)$$

where $f(x)$ has a special form. The method works by guessing the form of the particular solution based on $f(x)$, leaving coefficients to be determined by substitution.

## When to Use This Method

The method applies when $f(x)$ is a:
- **Polynomial**: $f(x) = a_nx^n + \cdots + a_1x + a_0$
- **Exponential**: $f(x) = e^{\alpha x}$
- **Sine or cosine**: $f(x) = A\cos\beta x$ or $B\sin\beta x$
- **Product of the above**: e.g., $f(x) = x^2e^{3x}\sin 2x$
- **Sum of the above**: use superposition

The method does **not** work for functions like $\ln x$, $\tan x$, $\frac{1}{x}$, etc. For those, use **variation of parameters**.

## Basic Strategy

1. Find the **complementary solution** $y_c$ (solution to homogeneous equation)
2. **Guess the form** of particular solution $y_p$ based on $f(x)$
3. **Determine coefficients** by substituting $y_p$ into the equation
4. **General solution**: $y = y_c + y_p$

## Table of Trial Solutions

| Form of $f(x)$ | Trial solution $y_p$ |
|----------------|---------------------|
| $P_n(x)$ (polynomial degree $n$) | $A_nx^n + \cdots + A_1x + A_0$ |
| $e^{\alpha x}$ | $Ae^{\alpha x}$ |
| $\cos\beta x$ or $\sin\beta x$ | $A\cos\beta x + B\sin\beta x$ |
| $e^{\alpha x}\cos\beta x$ or $e^{\alpha x}\sin\beta x$ | $e^{\alpha x}(A\cos\beta x + B\sin\beta x)$ |
| $x^ne^{\alpha x}$ | $e^{\alpha x}(A_nx^n + \cdots + A_0)$ |
| $x^n\cos\beta x$ or $x^n\sin\beta x$ | $(A_nx^n + \cdots + A_0)\cos\beta x + (B_nx^n + \cdots + B_0)\sin\beta x$ |

## Examples: Basic Cases

### Example 1: Polynomial Forcing

Solve $y'' + 3y' + 2y = 6x + 4$.

**Solution**:
**Step 1**: Find $y_c$ (solve $y'' + 3y' + 2y = 0$)

Characteristic equation: $r^2 + 3r + 2 = (r+1)(r+2) = 0$

Roots: $r = -1, -2$

$$y_c = c_1e^{-x} + c_2e^{-2x}$$

**Step 2**: Since $f(x) = 6x + 4$ is a polynomial of degree 1, try:
$$y_p = Ax + B$$

**Step 3**: Compute derivatives:
$$y_p' = A, \quad y_p'' = 0$$

Substitute into equation:
$$0 + 3A + 2(Ax + B) = 6x + 4$$
$$2Ax + (3A + 2B) = 6x + 4$$

Equate coefficients:
$$2A = 6 \Rightarrow A = 3$$
$$3A + 2B = 4 \Rightarrow 9 + 2B = 4 \Rightarrow B = -\frac{5}{2}$$

Therefore: $y_p = 3x - \frac{5}{2}$

**General solution**:
$$y = c_1e^{-x} + c_2e^{-2x} + 3x - \frac{5}{2}$$

### Example 2: Exponential Forcing

Solve $y'' - y' - 2y = 3e^{4x}$.

**Solution**:
**Step 1**: $y'' - y' - 2y = 0$ has characteristic equation $r^2 - r - 2 = (r-2)(r+1) = 0$

$$y_c = c_1e^{2x} + c_2e^{-x}$$

**Step 2**: Since $f(x) = 3e^{4x}$, try:
$$y_p = Ae^{4x}$$

**Step 3**:
$$y_p' = 4Ae^{4x}, \quad y_p'' = 16Ae^{4x}$$

Substitute:
$$16Ae^{4x} - 4Ae^{4x} - 2Ae^{4x} = 3e^{4x}$$
$$10Ae^{4x} = 3e^{4x}$$
$$A = \frac{3}{10}$$

**General solution**:
$$y = c_1e^{2x} + c_2e^{-x} + \frac{3}{10}e^{4x}$$

### Example 3: Trigonometric Forcing

Solve $y'' + 4y = 8\sin 2x$.

**Solution**:
**Step 1**: Characteristic equation $r^2 + 4 = 0$ gives $r = \pm 2i$

$$y_c = c_1\cos 2x + c_2\sin 2x$$

**Step 2**: Since $f(x) = 8\sin 2x$, normally try $y_p = A\cos 2x + B\sin 2x$

**BUT**: This form appears in $y_c$ (resonance case)! We need to multiply by $x$:
$$y_p = x(A\cos 2x + B\sin 2x)$$

**Step 3**: Compute derivatives using product rule:
$$y_p' = (A\cos 2x + B\sin 2x) + x(-2A\sin 2x + 2B\cos 2x)$$
$$y_p'' = (-2A\sin 2x + 2B\cos 2x) + (-2A\sin 2x + 2B\cos 2x) + x(-4A\cos 2x - 4B\sin 2x)$$
$$= -4A\sin 2x + 4B\cos 2x - 4x(A\cos 2x + B\sin 2x)$$

Substitute into $y'' + 4y = 8\sin 2x$:
$$-4A\sin 2x + 4B\cos 2x - 4x(A\cos 2x + B\sin 2x) + 4x(A\cos 2x + B\sin 2x) = 8\sin 2x$$
$$-4A\sin 2x + 4B\cos 2x = 8\sin 2x$$

Equate coefficients:
$$-4A = 8 \Rightarrow A = -2$$
$$4B = 0 \Rightarrow B = 0$$

$$y_p = -2x\cos 2x$$

**General solution**:
$$y = c_1\cos 2x + c_2\sin 2x - 2x\cos 2x$$

## The Modification Rule (Resonance)

**Modification Rule**: If any term in the trial solution $y_p$ is a solution to the homogeneous equation (appears in $y_c$), multiply the entire trial solution by $x$ (or $x^2$ if necessary for repeated roots).

**Why?** If $y_p$ solves the homogeneous equation, then $y_p'' + py_p' + qy_p = 0 \neq f(x)$. Multiplying by $x$ produces new terms that can match $f(x)$.

### Example 4: Resonance with Exponential

Solve $y'' - 3y' + 2y = e^{2x}$.

**Solution**:
Characteristic equation: $r^2 - 3r + 2 = (r-1)(r-2) = 0$

$$y_c = c_1e^x + c_2e^{2x}$$

Since $f(x) = e^{2x}$ and $e^{2x}$ appears in $y_c$, multiply by $x$:
$$y_p = Axe^{2x}$$

Derivatives:
$$y_p' = Ae^{2x} + 2Axe^{2x} = Ae^{2x}(1 + 2x)$$
$$y_p'' = 2Ae^{2x}(1 + 2x) + 2Ae^{2x} = Ae^{2x}(4 + 4x)$$

Substitute:
$$Ae^{2x}(4 + 4x) - 3Ae^{2x}(1 + 2x) + 2Axe^{2x} = e^{2x}$$
$$Ae^{2x}[(4 + 4x) - 3(1 + 2x) + 2x] = e^{2x}$$
$$Ae^{2x}[4 + 4x - 3 - 6x + 2x] = e^{2x}$$
$$Ae^{2x} = e^{2x}$$
$$A = 1$$

$$y_p = xe^{2x}$$

**General solution**:
$$y = c_1e^x + c_2e^{2x} + xe^{2x}$$

## Superposition for Sums

If $f(x) = f_1(x) + f_2(x)$, find particular solutions $y_{p1}$ for $f_1$ and $y_{p2}$ for $f_2$ separately. Then:
$$y_p = y_{p1} + y_{p2}$$

### Example 5: Sum of Functions

Solve $y'' + y = x + \cos x$.

**Solution**:
$$y_c = c_1\cos x + c_2\sin x$$

**For $f_1(x) = x$**: Try $y_{p1} = Ax + B$

$$y_{p1}'' = 0$$
$$0 + Ax + B = x$$
$$A = 1, \quad B = 0$$
$$y_{p1} = x$$

**For $f_2(x) = \cos x$**: Since $\cos x$ is in $y_c$, try $y_{p2} = x(C\cos x + D\sin x)$

After differentiation and substitution (similar to Example 3):
$$y_{p2} = \frac{1}{2}x\sin x$$

**Total particular solution**:
$$y_p = x + \frac{1}{2}x\sin x$$

**General solution**:
$$y = c_1\cos x + c_2\sin x + x + \frac{1}{2}x\sin x$$

## Products of Functions

For products like $f(x) = x^2e^{3x}$, the trial solution combines both forms:
$$y_p = e^{3x}(Ax^2 + Bx + C)$$

### Example 6: Polynomial Times Exponential

Solve $y'' - 4y' + 4y = xe^{2x}$.

**Solution**:
Characteristic equation: $(r-2)^2 = 0$, repeated root $r = 2$

$$y_c = (c_1 + c_2x)e^{2x}$$

For $f(x) = xe^{2x}$, normally try $y_p = e^{2x}(Ax + B)$

But both $e^{2x}$ and $xe^{2x}$ are in $y_c$, so multiply by $x^2$:
$$y_p = x^2e^{2x}(Ax + B) = e^{2x}(Ax^3 + Bx^2)$$

After computation (details omitted for brevity):
$$y_p = \frac{1}{6}x^3e^{2x}$$

## Limitations

Undetermined coefficients **cannot** handle:
- $f(x) = \ln x$, $\tan x$, $\sec x$, $\frac{1}{x}$, etc.
- Variable coefficient equations: $xy'' + y' + y = x$

For these cases, use **variation of parameters**.

## Computational Efficiency

Undetermined coefficients is typically faster than variation of parameters when applicable because:
- Trial solutions are simpler
- Integration is avoided
- Algebra is straightforward

## Summary Table for Modification

| If $f(x)$ contains | And $y_c$ contains | Multiply trial solution by |
|--------------------|-------------------|---------------------------|
| $e^{\alpha x}$ | $e^{\alpha x}$ | $x$ |
| $e^{\alpha x}$ | $xe^{\alpha x}$ | $x^2$ |
| $\cos\beta x$ or $\sin\beta x$ | $\cos\beta x$ or $\sin\beta x$ | $x$ |

## Conclusion

The method of undetermined coefficients provides an efficient, algebraic approach to finding particular solutions for nonhomogeneous constant-coefficient linear equations with special forcing functions. By guessing the form of the solution and determining coefficients through substitution, it avoids the integration required by variation of parameters. Understanding when to apply the modification rule (resonance cases) is crucial for correct application. While limited to specific forms of $f(x)$, these forms cover the majority of applications in physics and engineering, making this method indispensable in applied differential equations.
