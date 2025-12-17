---
title: "Exact Differential Equations"
---

# Exact Differential Equations

## Differential Form

A first-order differential equation can be written in **differential form**:

$$M(x, y)dx + N(x, y)dy = 0$$

where $M$ and $N$ are functions of both $x$ and $y$. This form arises naturally when we consider the total differential of a function.

**Example**: The equation $2xy\,dx + x^2\,dy = 0$ is in differential form with $M(x,y) = 2xy$ and $N(x,y) = x^2$.

## Exact Equations: Definition

A differential equation $M(x,y)dx + N(x,y)dy = 0$ is **exact** if there exists a function $F(x,y)$ such that:

$$dF = \frac{\partial F}{\partial x}dx + \frac{\partial F}{\partial y}dy = M\,dx + N\,dy$$

In other words, the equation is exact if:
$$\frac{\partial F}{\partial x} = M(x,y) \quad \text{and} \quad \frac{\partial F}{\partial y} = N(x,y)$$

When an equation is exact, the solution is given implicitly by:
$$F(x,y) = C$$

where $C$ is an arbitrary constant.

## The Exactness Test

**Theorem**: Let $M(x,y)$ and $N(x,y)$ be continuous and have continuous first partial derivatives in a rectangular region $R$. Then $M\,dx + N\,dy = 0$ is exact in $R$ if and only if:

$$\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$$

**Proof (necessity)**: If the equation is exact, then $M = \frac{\partial F}{\partial x}$ and $N = \frac{\partial F}{\partial y}$ for some $F$.

Taking partial derivatives:
$$\frac{\partial M}{\partial y} = \frac{\partial}{\partial y}\left(\frac{\partial F}{\partial x}\right) = \frac{\partial^2 F}{\partial y\partial x}$$
$$\frac{\partial N}{\partial x} = \frac{\partial}{\partial x}\left(\frac{\partial F}{\partial y}\right) = \frac{\partial^2 F}{\partial x\partial y}$$

By equality of mixed partial derivatives (Schwarz's theorem), these are equal:
$$\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$$

This test allows us to quickly determine if an equation is exact without finding $F$.

## Solving Exact Equations

When an equation passes the exactness test, we solve it by finding the function $F(x,y)$ such that:
1. $\frac{\partial F}{\partial x} = M(x,y)$
2. $\frac{\partial F}{\partial y} = N(x,y)$

**Method 1: Integration with respect to x**

From condition 1, integrate $M$ with respect to $x$:
$$F(x,y) = \int M(x,y)\,dx + g(y)$$

where $g(y)$ is an arbitrary function of $y$ (playing the role of the "constant" of integration).

Differentiate with respect to $y$:
$$\frac{\partial F}{\partial y} = \frac{\partial}{\partial y}\left[\int M(x,y)\,dx\right] + g'(y) = N(x,y)$$

Solve for $g'(y)$:
$$g'(y) = N(x,y) - \frac{\partial}{\partial y}\left[\int M(x,y)\,dx\right]$$

Integrate to find $g(y)$, then substitute back to get $F(x,y)$.

**Method 2: Integration with respect to y**

Alternatively, start from condition 2:
$$F(x,y) = \int N(x,y)\,dy + h(x)$$

Then differentiate with respect to $x$ and use condition 1 to find $h(x)$.

## Examples

### Example 1: Basic Exact Equation

Determine if $(2xy + 3)dx + (x^2 - 1)dy = 0$ is exact, and solve if it is.

**Solution**:
Identify: $M(x,y) = 2xy + 3$ and $N(x,y) = x^2 - 1$.

Check exactness:
$$\frac{\partial M}{\partial y} = 2x, \quad \frac{\partial N}{\partial x} = 2x$$

Since $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$, the equation is exact.

Find $F$: Integrate $M$ with respect to $x$:
$$F(x,y) = \int (2xy + 3)dx = x^2y + 3x + g(y)$$

Differentiate with respect to $y$:
$$\frac{\partial F}{\partial y} = x^2 + g'(y)$$

This must equal $N(x,y) = x^2 - 1$:
$$x^2 + g'(y) = x^2 - 1$$
$$g'(y) = -1$$
$$g(y) = -y$$

Therefore:
$$F(x,y) = x^2y + 3x - y$$

The solution is:
$$x^2y + 3x - y = C$$

### Example 2: Trigonometric Functions

Solve $(e^x\sin y - 2y)dx + (e^x\cos y - 2x)dy = 0$.

**Solution**:
Let $M = e^x\sin y - 2y$ and $N = e^x\cos y - 2x$.

Check exactness:
$$\frac{\partial M}{\partial y} = e^x\cos y - 2$$
$$\frac{\partial N}{\partial x} = e^x\cos y - 2$$

The equation is exact.

Integrate $M$ with respect to $x$:
$$F = \int (e^x\sin y - 2y)dx = e^x\sin y - 2xy + g(y)$$

Differentiate with respect to $y$:
$$\frac{\partial F}{\partial y} = e^x\cos y - 2x + g'(y) = e^x\cos y - 2x$$

Therefore $g'(y) = 0$, so $g(y) = 0$.

The solution is:
$$e^x\sin y - 2xy = C$$

### Example 3: Initial Value Problem

Solve $(2x - y)dx + (3y^2 - x)dy = 0$ with $y(1) = 2$.

**Solution**:
$M = 2x - y$, $N = 3y^2 - x$

Exactness test:
$$\frac{\partial M}{\partial y} = -1, \quad \frac{\partial N}{\partial x} = -1$$

The equation is exact.

Integrate $N$ with respect to $y$:
$$F = \int (3y^2 - x)dy = y^3 - xy + h(x)$$

Differentiate with respect to $x$:
$$\frac{\partial F}{\partial x} = -y + h'(x) = 2x - y$$
$$h'(x) = 2x$$
$$h(x) = x^2$$

Therefore $F(x,y) = y^3 - xy + x^2$.

General solution:
$$y^3 - xy + x^2 = C$$

Apply initial condition $y(1) = 2$:
$$2^3 - 1(2) + 1^2 = 8 - 2 + 1 = 7 = C$$

Particular solution:
$$y^3 - xy + x^2 = 7$$

### Example 4: Non-Exact Equation

Show that $(y^2 + 1)dx + 2xy\,dy = 0$ is not exact.

**Solution**:
$M = y^2 + 1$, $N = 2xy$

$$\frac{\partial M}{\partial y} = 2y, \quad \frac{\partial N}{\partial x} = 2y$$

Wait—these are equal! Let's recalculate:
$$\frac{\partial M}{\partial y} = 2y, \quad \frac{\partial N}{\partial x} = 2y$$

Actually, this equation **is** exact. Let's solve it.

Integrate $M$ with respect to $x$:
$$F = \int (y^2 + 1)dx = xy^2 + x + g(y)$$

$$\frac{\partial F}{\partial y} = 2xy + g'(y) = 2xy$$
$$g'(y) = 0, \quad g(y) = 0$$

Solution: $xy^2 + x = C$ or $x(y^2 + 1) = C$.

## Integrating Factors for Non-Exact Equations

If an equation $M\,dx + N\,dy = 0$ is not exact, we may be able to find an **integrating factor** $\mu(x,y)$ such that:

$$\mu M\,dx + \mu N\,dy = 0$$

is exact.

### Integrating Factors Depending on x Only

If
$$\frac{1}{N}\left(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}\right) = f(x)$$

is a function of $x$ only, then $\mu(x) = e^{\int f(x)dx}$ is an integrating factor.

### Integrating Factors Depending on y Only

If
$$\frac{1}{M}\left(\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}\right) = g(y)$$

is a function of $y$ only, then $\mu(y) = e^{\int g(y)dy}$ is an integrating factor.

### Example 5: Finding an Integrating Factor

Solve $(2y^2 + 3x)dx + 2xy\,dy = 0$.

**Solution**:
$M = 2y^2 + 3x$, $N = 2xy$

$$\frac{\partial M}{\partial y} = 4y, \quad \frac{\partial N}{\partial x} = 2y$$

Not exact since $4y \neq 2y$.

Try an integrating factor depending on $x$:
$$\frac{1}{N}\left(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}\right) = \frac{1}{2xy}(4y - 2y) = \frac{2y}{2xy} = \frac{1}{x}$$

This is a function of $x$ only! Therefore:
$$\mu(x) = e^{\int \frac{1}{x}dx} = e^{\ln x} = x$$

Multiply the equation by $\mu = x$:
$$(2xy^2 + 3x^2)dx + 2x^2y\,dy = 0$$

Check exactness:
$$\frac{\partial}{\partial y}(2xy^2 + 3x^2) = 4xy$$
$$\frac{\partial}{\partial x}(2x^2y) = 4xy$$

Now exact! Integrate:
$$F = \int (2xy^2 + 3x^2)dx = x^2y^2 + x^3 + g(y)$$
$$\frac{\partial F}{\partial y} = 2x^2y + g'(y) = 2x^2y$$
$$g'(y) = 0$$

Solution:
$$x^2y^2 + x^3 = C$$

## Special Cases

### Exact by Inspection

Some equations can be recognized as exact immediately:

$$x\,dx + y\,dy = 0 \implies d\left(\frac{x^2 + y^2}{2}\right) = 0 \implies x^2 + y^2 = C$$

$$\frac{x\,dx}{\sqrt{1-x^2}} + \frac{y\,dy}{\sqrt{1-y^2}} = 0$$

This is $d(\arcsin x) + d(\arcsin y) = 0$, giving $\arcsin x + \arcsin y = C$.

### Homogeneous Differential Forms

If $M$ and $N$ are both homogeneous functions of the same degree, the equation $M\,dx + N\,dy = 0$ has an integrating factor of the form:
$$\mu = \frac{1}{xM + yN}$$

(provided $xM + yN \neq 0$).

## Applications

Exact equations arise naturally in conservative force fields, thermodynamics, and potential theory.

**Example**: A force field $\mathbf{F} = M\mathbf{i} + N\mathbf{j}$ is conservative if there exists a potential function $\phi$ such that $\mathbf{F} = -\nabla\phi$. This is equivalent to $M\,dx + N\,dy$ being exact.

## Conclusion

Exact differential equations provide an elegant connection between differential equations and multivariable calculus. The exactness condition $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ is a simple test derived from the equality of mixed partial derivatives. When an equation is exact, the solution reduces to finding a potential function through integration. For non-exact equations, integrating factors can sometimes transform the equation into exact form, expanding the applicability of this powerful method.
