---
title: "Reduction of Order"
---

# Reduction of Order

## The Problem

Given a second-order linear homogeneous differential equation:
$$y'' + P(x)y' + Q(x)y = 0$$

If we know **one solution** $y_1(x)$, how can we find a **second linearly independent solution** $y_2(x)$?

This question is answered by the **reduction of order** method, which reduces a second-order equation to a first-order equation that can be solved for the second solution.

## The Method

Assume a solution of the form:
$$y_2(x) = v(x)y_1(x)$$

where $v(x)$ is an unknown function to be determined. The goal is to find a differential equation for $v$ that is simpler than the original equation.

### Derivation

Compute derivatives of $y_2 = vy_1$:
$$y_2' = v'y_1 + vy_1'$$
$$y_2'' = v''y_1 + 2v'y_1' + vy_1''$$

Substitute into the differential equation $y_2'' + Py_2' + Qy_2 = 0$:
$$(v''y_1 + 2v'y_1' + vy_1'') + P(v'y_1 + vy_1') + Q(vy_1) = 0$$

Rearrange by grouping terms:
$$v''y_1 + v'(2y_1' + Py_1) + v(y_1'' + Py_1' + Qy_1) = 0$$

Since $y_1$ is a solution, $y_1'' + Py_1' + Qy_1 = 0$. Therefore:
$$v''y_1 + v'(2y_1' + Py_1) = 0$$

This is a **first-order linear equation** in $w = v'$:
$$y_1w' + (2y_1' + Py_1)w = 0$$

Rearranging:
$$w' = -\frac{2y_1' + Py_1}{y_1}w$$

This is separable:
$$\frac{dw}{w} = -\frac{2y_1' + Py_1}{y_1}dx = -\left(\frac{2y_1'}{y_1} + P\right)dx$$

Integrating:
$$\ln|w| = -2\ln|y_1| - \int P\,dx$$
$$w = \frac{Ce^{-\int P\,dx}}{y_1^2}$$

Since $w = v'$, integrate again:
$$v = C\int \frac{e^{-\int P\,dx}}{y_1^2}dx$$

We can take $C = 1$ (we only need one particular solution for $v$).

### Formula for Second Solution

$$y_2 = y_1\int \frac{e^{-\int P(x)dx}}{y_1^2}dx$$

This is the **reduction of order formula**.

## Examples

### Example 1: Repeated Root

Given $y'' - 6y' + 9y = 0$ with known solution $y_1 = e^{3x}$, find $y_2$.

**Solution**:
The equation in standard form is $y'' - 6y' + 9y = 0$, so $P(x) = -6$.

Apply the formula:
$$y_2 = e^{3x}\int \frac{e^{-\int (-6)dx}}{(e^{3x})^2}dx$$
$$= e^{3x}\int \frac{e^{6x}}{e^{6x}}dx$$
$$= e^{3x}\int 1\,dx$$
$$= e^{3x} \cdot x = xe^{3x}$$

This confirms the repeated root formula: when the characteristic equation has a repeated root $r$, the second solution is $xe^{rx}$.

### Example 2: Variable Coefficients

Given $x^2y'' - xy' + y = 0$ for $x > 0$ with known solution $y_1 = x$, find $y_2$.

**Solution**:
First, write in standard form by dividing by $x^2$:
$$y'' - \frac{1}{x}y' + \frac{1}{x^2}y = 0$$

So $P(x) = -\frac{1}{x}$.

Apply the reduction of order formula:
$$y_2 = x\int \frac{e^{-\int (-1/x)dx}}{x^2}dx$$
$$= x\int \frac{e^{\ln x}}{x^2}dx$$
$$= x\int \frac{x}{x^2}dx$$
$$= x\int \frac{1}{x}dx$$
$$= x\ln x$$

Verification: Check that $y_2 = x\ln x$ satisfies the equation.
$$y_2 = x\ln x$$
$$y_2' = \ln x + 1$$
$$y_2'' = \frac{1}{x}$$

Substitute:
$$x^2 \cdot \frac{1}{x} - x(\ln x + 1) + x\ln x = x - x\ln x - x + x\ln x = 0$$ ✓

### Example 3: Bessel's Equation

The Bessel equation of order zero is:
$$xy'' + y' + xy = 0$$

One solution is the Bessel function $y_1 = J_0(x)$. Find the form of $y_2$.

**Solution**:
Standard form: $y'' + \frac{1}{x}y' + y = 0$, so $P(x) = \frac{1}{x}$.

$$y_2 = J_0(x)\int \frac{e^{-\int (1/x)dx}}{J_0^2(x)}dx$$
$$= J_0(x)\int \frac{e^{-\ln x}}{J_0^2(x)}dx$$
$$= J_0(x)\int \frac{1}{xJ_0^2(x)}dx$$

This integral cannot be expressed in elementary functions, but it defines the second linearly independent solution, called the Bessel function of the second kind $Y_0(x)$.

### Example 4: Euler Equation

Given $x^2y'' - 3xy' + 4y = 0$ for $x > 0$ with known solution $y_1 = x^2$, find $y_2$.

**Solution**:
Standard form: $y'' - \frac{3}{x}y' + \frac{4}{x^2}y = 0$, so $P(x) = -\frac{3}{x}$.

$$y_2 = x^2\int \frac{e^{-\int (-3/x)dx}}{(x^2)^2}dx$$
$$= x^2\int \frac{e^{3\ln x}}{x^4}dx$$
$$= x^2\int \frac{x^3}{x^4}dx$$
$$= x^2\int \frac{1}{x}dx$$
$$= x^2\ln x$$

General solution:
$$y = c_1x^2 + c_2x^2\ln x$$

## Connection to Abel's Theorem

Recall **Abel's theorem**: If $y_1$ and $y_2$ are solutions to $y'' + Py' + Qy = 0$, then:
$$W(y_1, y_2) = Ce^{-\int P\,dx}$$

For the reduction of order solution $y_2 = y_1v$:
$$W(y_1, y_1v) = y_1(y_1v)' - y_1'(y_1v) = y_1(y_1'v + y_1v') - y_1'y_1v = y_1^2v'$$

From our derivation, $v' = \frac{e^{-\int P\,dx}}{y_1^2}$, so:
$$W = y_1^2 \cdot \frac{e^{-\int P\,dx}}{y_1^2} = e^{-\int P\,dx}$$

This matches Abel's theorem with $C = 1$.

## When to Use Reduction of Order

Reduction of order is useful when:

1. **One solution is known** but the second is not obvious
2. **Equations have variable coefficients** (not constant coefficient equations)
3. **Special functions** are involved (Bessel, Legendre, etc.)

For constant coefficient equations, the characteristic equation method is more efficient.

## Alternative Derivation Using Wronskian

If $y_1$ is known and we seek $y_2 = vy_1$, we can use the Wronskian directly.

$$W(y_1, y_2) = y_1(vy_1)' - y_1'(vy_1) = y_1^2v'$$

By Abel's theorem, $W = Ce^{-\int P\,dx}$. Therefore:
$$y_1^2v' = Ce^{-\int P\,dx}$$
$$v' = \frac{Ce^{-\int P\,dx}}{y_1^2}$$
$$v = C\int \frac{e^{-\int P\,dx}}{y_1^2}dx$$

Taking $C = 1$ gives the same formula.

## Repeated Roots Explained

For constant coefficient equations $y'' + py' + qy = 0$ with repeated root $r$:

One solution is $y_1 = e^{rx}$. Since $P(x) = p$:
$$y_2 = e^{rx}\int \frac{e^{-px}}{e^{2rx}}dx = e^{rx}\int e^{-px-2rx}dx$$

For a repeated root, $r = -p/2$, so $p = -2r$:
$$y_2 = e^{rx}\int e^{2rx-2rx}dx = e^{rx}\int 1\,dx = xe^{rx}$$

This explains why the second solution for repeated roots is always $xe^{rx}$.

## Generalization to nth Order

The reduction of order method extends to higher-order equations. If $n-1$ linearly independent solutions are known to an nth-order linear equation, reduction of order can find the nth solution.

## Limitations

Reduction of order requires:
- Knowledge of one solution
- Ability to integrate $\frac{e^{-\int P\,dx}}{y_1^2}$

The integral may not have a closed form, limiting the method's practical utility in some cases.

## Applications

### Quantum Mechanics

The radial Schrödinger equation for the hydrogen atom involves special equations where one solution is known from physical arguments. Reduction of order helps find the complete solution set.

### Sturm-Liouville Problems

In eigenvalue problems, sometimes one eigenfunction is obvious (e.g., the ground state). Reduction of order can generate higher eigenfunctions.

## Practical Tips

1. Always verify $y_1$ is actually a solution before applying reduction of order
2. Simplify $\frac{e^{-\int P\,dx}}{y_1^2}$ before integrating
3. Check linear independence by computing the Wronskian
4. Constants of integration can usually be omitted (we need just one $y_2$)

## Summary

Reduction of order is a powerful technique for finding a second solution when one solution is already known. The formula:
$$y_2 = y_1\int \frac{e^{-\int P(x)dx}}{y_1^2}dx$$

transforms the second-order problem into two first-order integrations. While not always yielding closed-form solutions, it provides a systematic approach and theoretical insight into the structure of solutions. For constant coefficient equations, it elegantly explains the repeated root case, while for variable coefficient equations, it's often the only practical method available.

## Conclusion

Reduction of order bridges the gap between knowing one solution and finding the complete general solution. It reveals the deep structure of linear differential equations: once one solution is known, the remaining solution space can be systematically explored. This method is indispensable for equations with variable coefficients and provides theoretical justification for patterns observed in constant coefficient equations.
