---
id: math301-topic-2-2
title: "Limits and Continuity"
order: 2
---

# Limits and Continuity in Multiple Variables

## Introduction

Limits and continuity for functions of several variables extend the familiar concepts from single-variable calculus to higher dimensions. However, multivariable limits introduce new complexity: in one dimension, we can approach a point from only two directions (left and right), but in two dimensions, we can approach a point along infinitely many paths. This richer structure requires careful analysis and new techniques for evaluating limits and establishing continuity. Understanding these concepts is essential for defining derivatives of multivariable functions and ensuring the validity of various theorems in multivariable calculus.

## Limit of a Function of Two Variables

### Intuitive Definition

We say that the **limit** of $f(x, y)$ as $(x, y)$ approaches $(a, b)$ is $L$, written:

$$\lim_{(x,y) \to (a,b)} f(x, y) = L$$

if $f(x, y)$ can be made arbitrarily close to $L$ by taking $(x, y)$ sufficiently close to $(a, b)$ (but not equal to $(a, b)$).

### Formal Definition (Epsilon-Delta)

For every $\varepsilon > 0$, there exists $\delta > 0$ such that:

$$\text{if } 0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta, \text{ then } |f(x,y) - L| < \varepsilon$$

The distance from $(x, y)$ to $(a, b)$ is measured using the Euclidean metric.

### Key Difference from Single Variable

In single-variable calculus, we only need to check left and right limits. In multivariable calculus, we must verify that the limit is the same **along all possible paths** to $(a, b)$.

## Path Dependence

### Non-Existence of Limits

If $f(x, y)$ approaches different values along different paths to $(a, b)$, then the limit does not exist.

### Example: Path-Dependent Limit

Consider:

$$f(x, y) = \frac{xy}{x^2 + y^2}$$

Evaluate $\lim_{(x,y) \to (0,0)} f(x, y)$.

**Path 1: Along the $x$-axis** ($y = 0$):

$$f(x, 0) = \frac{x \cdot 0}{x^2 + 0} = 0$$

$$\lim_{x \to 0} f(x, 0) = 0$$

**Path 2: Along the $y$-axis** ($x = 0$):

$$f(0, y) = \frac{0 \cdot y}{0 + y^2} = 0$$

$$\lim_{y \to 0} f(0, y) = 0$$

**Path 3: Along the line $y = x$**:

$$f(x, x) = \frac{x \cdot x}{x^2 + x^2} = \frac{x^2}{2x^2} = \frac{1}{2}$$

$$\lim_{x \to 0} f(x, x) = \frac{1}{2}$$

Since different paths yield different limits (0 vs. 1/2), the limit **does not exist**.

### Testing Paths

Common paths to test:

1. Axes: $x = 0$ and $y = 0$
2. Lines: $y = mx$
3. Parabolas: $y = x^2$ or $x = y^2$
4. Circles: $x = r\cos\theta$, $y = r\sin\theta$ (polar coordinates)

If two paths give different limits, we can conclude the limit doesn't exist. However, agreement along several paths doesn't guarantee the limit exists—we must prove it for **all** paths.

## Evaluating Limits

### Direct Substitution

If $f(x, y)$ is a polynomial or rational function where the denominator is non-zero at $(a, b)$, we can evaluate by direct substitution:

$$\lim_{(x,y) \to (a,b)} f(x, y) = f(a, b)$$

### Example

$$\lim_{(x,y) \to (1,2)} (x^2 + 3xy - y^2) = 1 + 6 - 4 = 3$$

### Squeeze Theorem

If $g(x, y) \le f(x, y) \le h(x, y)$ near $(a, b)$ and:

$$\lim_{(x,y) \to (a,b)} g(x, y) = \lim_{(x,y) \to (a,b)} h(x, y) = L$$

then:

$$\lim_{(x,y) \to (a,b)} f(x, y) = L$$

### Example: Using Squeeze Theorem

Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2 + y^2}$.

We have:

$$\left|\frac{x^2y}{x^2 + y^2}\right| \le \frac{x^2|y|}{x^2 + y^2}$$

Since $x^2 \le x^2 + y^2$:

$$\frac{x^2}{x^2 + y^2} \le 1$$

Therefore:

$$\left|\frac{x^2y}{x^2 + y^2}\right| \le |y|$$

As $(x, y) \to (0, 0)$, we have $|y| \to 0$. By the squeeze theorem:

$$\lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2 + y^2} = 0$$

### Polar Coordinates

Converting to polar coordinates can simplify limit evaluation. Set:

$$x = r\cos\theta, \quad y = r\sin\theta$$

Then $(x, y) \to (0, 0)$ corresponds to $r \to 0^+$.

### Example: Using Polar Coordinates

Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^3 + y^3}{x^2 + y^2}$.

Converting to polar:

$$\frac{x^3 + y^3}{x^2 + y^2} = \frac{r^3\cos^3\theta + r^3\sin^3\theta}{r^2} = r(\cos^3\theta + \sin^3\theta)$$

Since $|\cos^3\theta + \sin^3\theta|$ is bounded (say by 2):

$$|r(\cos^3\theta + \sin^3\theta)| \le 2r \to 0 \text{ as } r \to 0^+$$

Therefore:

$$\lim_{(x,y) \to (0,0)} \frac{x^3 + y^3}{x^2 + y^2} = 0$$

## Proving Limits Don't Exist

### Strategy

To show a limit doesn't exist, find two different paths that give different limits.

### Example

Show that $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$ does not exist.

**Path 1**: Along $y = 0$:

$$\frac{x^2}{x^2} = 1 \to 1$$

**Path 2**: Along $x = 0$:

$$\frac{-y^2}{y^2} = -1 \to -1$$

Since $1 \neq -1$, the limit does not exist.

## Continuity

### Definition

A function $f(x, y)$ is **continuous** at $(a, b)$ if:

1. $f(a, b)$ is defined
2. $\lim_{(x,y) \to (a,b)} f(x, y)$ exists
3. $\lim_{(x,y) \to (a,b)} f(x, y) = f(a, b)$

If $f$ is continuous at every point in its domain, we say $f$ is **continuous**.

### Example: Continuous Function

The function $f(x, y) = x^2 + y^2$ is continuous everywhere because it's a polynomial.

### Example: Discontinuous Function

Consider:

$$f(x, y) = \begin{cases} \frac{xy}{x^2 + y^2} & \text{if } (x, y) \neq (0, 0) \\ 0 & \text{if } (x, y) = (0, 0) \end{cases}$$

We've seen that the limit as $(x, y) \to (0, 0)$ does not exist, so $f$ is **not continuous** at $(0, 0)$.

### Properties of Continuous Functions

If $f$ and $g$ are continuous at $(a, b)$, then:

1. $f + g$ is continuous at $(a, b)$
2. $f - g$ is continuous at $(a, b)$
3. $fg$ is continuous at $(a, b)$
4. $f/g$ is continuous at $(a, b)$ provided $g(a, b) \neq 0$
5. $c \cdot f$ is continuous at $(a, b)$ for any constant $c$

### Composition

If $g$ is continuous at $(a, b)$ and $f$ is continuous at $g(a, b)$, then the composition $f \circ g$ is continuous at $(a, b)$.

### Example

$f(x, y) = e^{x^2 + y^2}$ is continuous everywhere because:
- $g(x, y) = x^2 + y^2$ is continuous (polynomial)
- $h(t) = e^t$ is continuous
- $f = h \circ g$ is continuous by composition

## Functions of Three or More Variables

### Limits

For $w = f(x, y, z)$:

$$\lim_{(x,y,z) \to (a,b,c)} f(x, y, z) = L$$

if $f(x, y, z)$ approaches $L$ as $(x, y, z)$ approaches $(a, b, c)$ along any path.

Distance is measured by:

$$d = \sqrt{(x-a)^2 + (y-b)^2 + (z-c)^2}$$

### Continuity

$f(x, y, z)$ is continuous at $(a, b, c)$ if:

$$\lim_{(x,y,z) \to (a,b,c)} f(x, y, z) = f(a, b, c)$$

## Special Limits

### Important Limit

$$\lim_{(x,y) \to (0,0)} \frac{\sin(\sqrt{x^2 + y^2})}{\sqrt{x^2 + y^2}} = 1$$

This extends the single-variable limit $\lim_{t \to 0} \frac{\sin t}{t} = 1$.

### Example

Evaluate $\lim_{(x,y) \to (0,0)} \frac{1 - \cos(x^2 + y^2)}{x^2 + y^2}$.

Let $u = x^2 + y^2$. As $(x, y) \to (0, 0)$, we have $u \to 0^+$.

Using the identity $1 - \cos u = 2\sin^2(u/2)$:

$$\frac{1 - \cos u}{u} = \frac{2\sin^2(u/2)}{u} = 2 \cdot \frac{\sin^2(u/2)}{u} = 2 \cdot \frac{\sin^2(u/2)}{(u/2)} \cdot \frac{1}{2} = \frac{\sin(u/2)}{u/2} \cdot \sin(u/2)$$

As $u \to 0^+$:

$$\frac{\sin(u/2)}{u/2} \to 1 \text{ and } \sin(u/2) \to 0$$

Wait, let me recalculate:

$$\frac{2\sin^2(u/2)}{u} = 2 \left(\frac{\sin(u/2)}{u/2}\right)^2 \cdot \frac{(u/2)^2}{u} = 2 \left(\frac{\sin(u/2)}{u/2}\right)^2 \cdot \frac{u/4}{u} = \frac{1}{2}\left(\frac{\sin(u/2)}{u/2}\right)^2 \to \frac{1}{2}$$

Therefore:

$$\lim_{(x,y) \to (0,0)} \frac{1 - \cos(x^2 + y^2)}{x^2 + y^2} = \frac{1}{2}$$

## Two-Path Test for Non-Existence

### Theorem

If $\lim_{(x,y) \to (a,b)} f(x, y)$ along two different paths gives different values, then the limit does not exist.

**Note**: The converse is false. Agreement along many paths does not prove the limit exists.

### Example: All Linear Paths Agree, But Limit Doesn't Exist

Consider:

$$f(x, y) = \frac{x^2y}{x^4 + y^2}$$

Along any line $y = mx$ (for $m \neq 0$):

$$f(x, mx) = \frac{x^2 \cdot mx}{x^4 + m^2x^2} = \frac{mx^3}{x^4 + m^2x^2} = \frac{mx}{x^2 + m^2}$$

As $x \to 0$: $\frac{mx}{x^2 + m^2} \to 0$

Along the parabola $y = x^2$:

$$f(x, x^2) = \frac{x^2 \cdot x^2}{x^4 + x^4} = \frac{x^4}{2x^4} = \frac{1}{2}$$

Since the parabolic path gives $1/2$ while linear paths give $0$, the limit does not exist.

## Applications

### Continuity in Physics

Physical quantities like temperature, pressure, and electric potential are typically modeled as continuous functions of position.

### Continuity in Optimization

Many optimization theorems (e.g., the Extreme Value Theorem) require continuity. If $f$ is continuous on a closed, bounded domain, it attains its maximum and minimum values.

### Numerical Methods

Continuity ensures that small changes in input produce small changes in output, which is essential for numerical approximations and computer calculations.

## Summary

Limits of multivariable functions require that $f(x, y)$ approach the same value $L$ as $(x, y)$ approaches $(a, b)$ along **all possible paths**. To show a limit doesn't exist, find two paths giving different limits. To prove a limit exists, use techniques like the squeeze theorem, polar coordinates, or epsilon-delta arguments. A function is continuous at a point if the limit exists and equals the function value. Continuous functions satisfy familiar algebraic properties and composition rules. Understanding limits and continuity in multiple dimensions is essential for defining partial derivatives and establishing the validity of multivariable calculus theorems.
