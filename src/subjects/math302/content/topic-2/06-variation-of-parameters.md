---
title: "Variation of Parameters"
---

# Variation of Parameters

## Introduction

**Variation of parameters** is a general method for finding particular solutions to nonhomogeneous linear differential equations:

$$y'' + P(x)y' + Q(x)y = F(x)$$

Unlike undetermined coefficients, this method works for **any** continuous function $F(x)$ and allows **variable coefficients** $P(x)$ and $Q(x)$.

The method was developed by Lagrange and is sometimes called **Lagrange's method** or the **method of variation of constants**.

## The Idea

Given the complementary solution:
$$y_c = c_1y_1(x) + c_2y_2(x)$$

where $y_1$ and $y_2$ are linearly independent solutions to the homogeneous equation, we seek a particular solution of the form:
$$y_p = u_1(x)y_1(x) + u_2(x)y_2(x)$$

The constants $c_1$ and $c_2$ are "varied" to become functions $u_1(x)$ and $u_2(x)$.

## Derivation of the Method

### Setting Up

Let $y_p = u_1y_1 + u_2y_2$. We need to find $u_1$ and $u_2$.

Compute the first derivative:
$$y_p' = u_1'y_1 + u_1y_1' + u_2'y_2 + u_2y_2'$$

To simplify, impose the **first condition**:
$$u_1'y_1 + u_2'y_2 = 0$$

This gives:
$$y_p' = u_1y_1' + u_2y_2'$$

Compute the second derivative:
$$y_p'' = u_1'y_1' + u_1y_1'' + u_2'y_2' + u_2y_2''$$

### Substitution

Substitute $y_p$, $y_p'$, and $y_p''$ into the differential equation:
$$y_p'' + Py_p' + Qy_p = F$$
$$(u_1'y_1' + u_1y_1'' + u_2'y_2' + u_2y_2'') + P(u_1y_1' + u_2y_2') + Q(u_1y_1 + u_2y_2) = F$$

Rearrange:
$$u_1(y_1'' + Py_1' + Qy_1) + u_2(y_2'' + Py_2' + Qy_2) + u_1'y_1' + u_2'y_2' = F$$

Since $y_1$ and $y_2$ solve the homogeneous equation:
$$y_1'' + Py_1' + Qy_1 = 0, \quad y_2'' + Py_2' + Qy_2 = 0$$

This simplifies to the **second condition**:
$$u_1'y_1' + u_2'y_2' = F$$

### Solving for $u_1'$ and $u_2'$

We have two equations:
$$\begin{cases}
u_1'y_1 + u_2'y_2 = 0 \\
u_1'y_1' + u_2'y_2' = F
\end{cases}$$

This is a linear system for $u_1'$ and $u_2'$. Using Cramer's rule:

The coefficient matrix determinant is the **Wronskian**:
$$W = y_1y_2' - y_1'y_2$$

$$u_1' = \frac{\begin{vmatrix} 0 & y_2 \\ F & y_2' \end{vmatrix}}{W} = \frac{-y_2F}{W}$$

$$u_2' = \frac{\begin{vmatrix} y_1 & 0 \\ y_1' & F \end{vmatrix}}{W} = \frac{y_1F}{W}$$

### Integration

Integrate to find $u_1$ and $u_2$:
$$u_1 = -\int \frac{y_2(x)F(x)}{W(x)}dx$$
$$u_2 = \int \frac{y_1(x)F(x)}{W(x)}dx$$

Constants of integration can be omitted (we need only one particular solution).

## Variation of Parameters Formula

$$y_p = -y_1\int \frac{y_2F}{W}dx + y_2\int \frac{y_1F}{W}dx$$

where $W = W(y_1, y_2) = y_1y_2' - y_1'y_2$.

## Examples

### Example 1: Logarithmic Forcing

Solve $y'' + y = \sec x$ on $(-\pi/2, \pi/2)$.

**Solution**:
Homogeneous solution:
$$y_c = c_1\cos x + c_2\sin x$$

So $y_1 = \cos x$, $y_2 = \sin x$, $F(x) = \sec x$.

Wronskian:
$$W = \cos x \cdot \cos x - (-\sin x) \cdot \sin x = \cos^2 x + \sin^2 x = 1$$

Compute $u_1'$ and $u_2'$:
$$u_1' = -\frac{\sin x \cdot \sec x}{1} = -\frac{\sin x}{\cos x} = -\tan x$$
$$u_2' = \frac{\cos x \cdot \sec x}{1} = 1$$

Integrate:
$$u_1 = -\int \tan x\,dx = \ln|\cos x|$$
$$u_2 = \int 1\,dx = x$$

Particular solution:
$$y_p = \ln|\cos x| \cdot \cos x + x \cdot \sin x = \cos x\ln|\cos x| + x\sin x$$

**General solution**:
$$y = c_1\cos x + c_2\sin x + \cos x\ln|\cos x| + x\sin x$$

### Example 2: Comparison with Undetermined Coefficients

Solve $y'' - 3y' + 2y = e^{3x}$.

**Solution**:
Characteristic equation: $r^2 - 3r + 2 = (r-1)(r-2) = 0$

$$y_c = c_1e^x + c_2e^{2x}$$

So $y_1 = e^x$, $y_2 = e^{2x}$, $F(x) = e^{3x}$.

Wronskian:
$$W = e^x \cdot 2e^{2x} - e^x \cdot e^{2x} = 2e^{3x} - e^{3x} = e^{3x}$$

$$u_1' = -\frac{e^{2x} \cdot e^{3x}}{e^{3x}} = -e^{2x}$$
$$u_2' = \frac{e^x \cdot e^{3x}}{e^{3x}} = e^x$$

Integrate:
$$u_1 = -\frac{e^{2x}}{2}$$
$$u_2 = e^x$$

$$y_p = -\frac{e^{2x}}{2} \cdot e^x + e^x \cdot e^{2x} = -\frac{e^{3x}}{2} + e^{3x} = \frac{e^{3x}}{2}$$

**General solution**:
$$y = c_1e^x + c_2e^{2x} + \frac{e^{3x}}{2}$$

(This matches what we'd get from undetermined coefficients.)

### Example 3: Variable Coefficients

Solve $x^2y'' - xy' + y = x$ for $x > 0$, given that $y_c = c_1x + c_2x\ln x$.

**Solution**:
First, write in standard form: $y'' - \frac{1}{x}y' + \frac{1}{x^2}y = \frac{1}{x}$

So $y_1 = x$, $y_2 = x\ln x$, $F(x) = \frac{1}{x}$.

Wronskian:
$$W = x \cdot (\ln x + 1) - 1 \cdot x\ln x = x\ln x + x - x\ln x = x$$

$$u_1' = -\frac{x\ln x \cdot \frac{1}{x}}{x} = -\frac{\ln x}{x}$$
$$u_2' = \frac{x \cdot \frac{1}{x}}{x} = \frac{1}{x}$$

Integrate:
$$u_1 = -\int \frac{\ln x}{x}dx = -\frac{(\ln x)^2}{2}$$
$$u_2 = \int \frac{1}{x}dx = \ln x$$

$$y_p = -\frac{(\ln x)^2}{2} \cdot x + \ln x \cdot x\ln x = -\frac{x(\ln x)^2}{2} + x(\ln x)^2 = \frac{x(\ln x)^2}{2}$$

**General solution**:
$$y = c_1x + c_2x\ln x + \frac{x(\ln x)^2}{2}$$

### Example 4: Inverse Tangent

Solve $y'' + 4y = \tan 2x$ on $(-\pi/4, \pi/4)$.

**Solution**:
$$y_c = c_1\cos 2x + c_2\sin 2x$$

$y_1 = \cos 2x$, $y_2 = \sin 2x$, $F(x) = \tan 2x$

$$W = \cos 2x \cdot 2\cos 2x - (-2\sin 2x) \cdot \sin 2x = 2(\cos^2 2x + \sin^2 2x) = 2$$

$$u_1' = -\frac{\sin 2x \cdot \tan 2x}{2} = -\frac{\sin^2 2x}{2\cos 2x}$$
$$u_2' = \frac{\cos 2x \cdot \tan 2x}{2} = \frac{\sin 2x}{2}$$

Integrate:
$$u_1 = -\frac{1}{2}\int \frac{\sin^2 2x}{\cos 2x}dx = -\frac{1}{2}\int \frac{1-\cos^2 2x}{\cos 2x}dx$$
$$= -\frac{1}{2}\int (\sec 2x - \cos 2x)dx = -\frac{1}{4}[\ln|\sec 2x + \tan 2x| - \sin 2x]$$

$$u_2 = \frac{1}{2}\int \sin 2x\,dx = -\frac{\cos 2x}{4}$$

$$y_p = (\text{expression involving logarithms})$$

(The exact form is complex; the method still works systematically.)

## Advantages and Disadvantages

### Advantages
1. Works for **any** $F(x)$ (no restriction on form)
2. Handles **variable coefficients** $P(x)$, $Q(x)$
3. **General method** (applies universally)

### Disadvantages
1. Requires **integration** (may be difficult or impossible in closed form)
2. More **computational work** than undetermined coefficients when both apply
3. Requires knowing the **complementary solution** first

## When to Use Each Method

| Condition | Method |
|-----------|--------|
| Constant coefficients, $F(x)$ is polynomial/exponential/trig | Undetermined Coefficients (faster) |
| Variable coefficients | Variation of Parameters (only option) |
| $F(x)$ is $\ln x$, $\tan x$, $\sec x$, etc. | Variation of Parameters (only option) |

## Higher-Order Equations

Variation of parameters extends to nth-order equations. For $y''' + \cdots = F(x)$ with fundamental solutions $y_1, y_2, y_3$:

$$y_p = u_1y_1 + u_2y_2 + u_3y_3$$

where $u_1', u_2', u_3'$ are found by solving a $3 \times 3$ system involving Wronskians.

## Connection to Green's Functions

The variation of parameters formula can be written as:
$$y_p(x) = \int_{x_0}^x G(x,t)F(t)dt$$

where $G(x,t)$ is the **Green's function**:
$$G(x,t) = \frac{y_1(t)y_2(x) - y_1(x)y_2(t)}{W(t)}$$

This integral representation is fundamental in advanced ODE theory and functional analysis.

## Practical Tips

1. **Compute Wronskian carefully** (sign errors are common)
2. **Simplify before integrating** $\frac{y_iF}{W}$
3. **Use trigonometric identities** to simplify integrands
4. **Don't add constants** of integration for $u_1$ and $u_2$ (not needed)
5. **Check your answer** by substituting back into the equation

## Conclusion

Variation of parameters is the most powerful general method for solving nonhomogeneous linear differential equations. While computationally more intensive than undetermined coefficients, it handles cases that no other elementary method can solve. The technique's generality—working for any continuous forcing function and variable coefficients—makes it indispensable in both theoretical and applied contexts. Understanding when to use variation of parameters versus simpler methods is a key skill in differential equations.
