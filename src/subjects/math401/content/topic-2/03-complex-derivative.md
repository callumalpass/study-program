---
id: math401-topic-2-3
title: "Complex Derivative"
order: 3
---

# Complex Differentiation

The complex derivative extends the notion of differentiation from real functions to complex functions. While the definition mirrors that of real calculus, complex differentiability is far more restrictive and powerful. Functions that are complex differentiable possess remarkable properties not shared by their real counterparts.

## Definition of the Complex Derivative

Let $f$ be defined in a neighborhood of $z_0 \in \mathbb{C}$. The **derivative of $f$ at $z_0$** is:

$$f'(z_0) = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}$$

if this limit exists, where $h \in \mathbb{C}$ can approach $0$ from any direction.

Alternative notations: $\frac{df}{dz}\bigg|_{z_0}$, $Df(z_0)$, $f'(z_0)$.

**Key difference from real calculus**: In $\mathbb{R}$, $h$ can approach $0$ from only two directions (left or right). In $\mathbb{C}$, $h$ can approach $0$ from infinitely many directions. This makes complex differentiability much more restrictive.

### When Does the Derivative Exist?

We say $f$ is **differentiable at $z_0$** if $f'(z_0)$ exists.

We say $f$ is **differentiable on a set $S$** if $f'(z)$ exists for every $z \in S$.

### Differentiability Implies Continuity

**Theorem**: If $f$ is differentiable at $z_0$, then $f$ is continuous at $z_0$.

**Proof**: If $f'(z_0)$ exists, then:

$$\lim_{h \to 0} [f(z_0 + h) - f(z_0)] = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h} \cdot h = f'(z_0) \cdot 0 = 0$$

Therefore $\lim_{z \to z_0} f(z) = f(z_0)$, so $f$ is continuous at $z_0$.

**Contrapositive**: If $f$ is discontinuous at $z_0$, then $f$ is not differentiable at $z_0$.

## Computing Derivatives

### Power Rule

For $n \in \mathbb{Z}$ (and more generally $n \in \mathbb{C}$):

$$\frac{d}{dz}(z^n) = nz^{n-1}$$

**Proof for $n \geq 1$ (by direct computation)**:

$$\frac{d}{dz}(z^n) = \lim_{h \to 0} \frac{(z + h)^n - z^n}{h}$$

By the binomial theorem:
$$(z + h)^n = z^n + nz^{n-1}h + \binom{n}{2}z^{n-2}h^2 + \cdots + h^n$$

$$\frac{(z + h)^n - z^n}{h} = nz^{n-1} + \binom{n}{2}z^{n-2}h + \cdots + h^{n-1}$$

As $h \to 0$, all terms except the first vanish:
$$\lim_{h \to 0} \left[nz^{n-1} + O(h)\right] = nz^{n-1}$$

### Constant Multiple Rule

$$\frac{d}{dz}[cf(z)] = c f'(z)$$

for any constant $c \in \mathbb{C}$.

### Sum and Difference Rules

$$\frac{d}{dz}[f(z) + g(z)] = f'(z) + g'(z)$$

$$\frac{d}{dz}[f(z) - g(z)] = f'(z) - g'(z)$$

### Product Rule

$$\frac{d}{dz}[f(z)g(z)] = f'(z)g(z) + f(z)g'(z)$$

**Proof**:
$$\frac{d}{dz}[f(z)g(z)] = \lim_{h \to 0} \frac{f(z+h)g(z+h) - f(z)g(z)}{h}$$

Add and subtract $f(z+h)g(z)$:
$$= \lim_{h \to 0} \frac{f(z+h)g(z+h) - f(z+h)g(z) + f(z+h)g(z) - f(z)g(z)}{h}$$

$$= \lim_{h \to 0} \left[f(z+h)\frac{g(z+h) - g(z)}{h} + g(z)\frac{f(z+h) - f(z)}{h}\right]$$

Since $f$ is differentiable, it's continuous, so $f(z+h) \to f(z)$:
$$= f(z)g'(z) + g(z)f'(z)$$

### Quotient Rule

$$\frac{d}{dz}\left[\frac{f(z)}{g(z)}\right] = \frac{f'(z)g(z) - f(z)g'(z)}{[g(z)]^2}$$

provided $g(z) \neq 0$.

### Chain Rule

$$\frac{d}{dz}[f(g(z))] = f'(g(z)) \cdot g'(z)$$

**Proof sketch**: Similar to real calculus, but requires care with complex limits.

### Examples

1. **$f(z) = z^4 + 3z^2 - 5z + 7$**

   $$f'(z) = 4z^3 + 6z - 5$$

2. **$f(z) = (z^2 + 1)(z^3 - 2)$**

   By the product rule:
   $$f'(z) = 2z(z^3 - 2) + (z^2 + 1)(3z^2) = 2z^4 - 4z + 3z^4 + 3z^2 = 5z^4 + 3z^2 - 4z$$

3. **$f(z) = \frac{z^2}{z + 1}$**

   By the quotient rule:
   $$f'(z) = \frac{2z(z+1) - z^2 \cdot 1}{(z+1)^2} = \frac{2z^2 + 2z - z^2}{(z+1)^2} = \frac{z^2 + 2z}{(z+1)^2}$$

4. **$f(z) = (z^2 + 1)^5$**

   By the chain rule:
   $$f'(z) = 5(z^2 + 1)^4 \cdot 2z = 10z(z^2 + 1)^4$$

## Derivatives of Elementary Functions

### Exponential Function

$$\frac{d}{dz}(e^z) = e^z$$

**Proof**:
$$\frac{d}{dz}(e^z) = \lim_{h \to 0} \frac{e^{z+h} - e^z}{h} = e^z \lim_{h \to 0} \frac{e^h - 1}{h}$$

From the series expansion $e^h = 1 + h + \frac{h^2}{2!} + \cdots$:
$$\frac{e^h - 1}{h} = 1 + \frac{h}{2!} + \frac{h^2}{3!} + \cdots \to 1$$

Therefore: $\frac{d}{dz}(e^z) = e^z \cdot 1 = e^z$.

### Trigonometric Functions

$$\frac{d}{dz}(\sin z) = \cos z$$

$$\frac{d}{dz}(\cos z) = -\sin z$$

**Proof for sine**:
$$\sin z = \frac{e^{iz} - e^{-iz}}{2i}$$

$$\frac{d}{dz}(\sin z) = \frac{1}{2i}(ie^{iz} - (-i)e^{-iz}) = \frac{1}{2i}(ie^{iz} + ie^{-iz})$$

$$= \frac{i}{2i}(e^{iz} + e^{-iz}) = \frac{e^{iz} + e^{-iz}}{2} = \cos z$$

### Hyperbolic Functions

$$\frac{d}{dz}(\sinh z) = \cosh z$$

$$\frac{d}{dz}(\cosh z) = \sinh z$$

where:
$$\sinh z = \frac{e^z - e^{-z}}{2}, \quad \cosh z = \frac{e^z + e^{-z}}{2}$$

### Complex Logarithm (Principal Branch)

For $z \in \mathbb{C} \setminus (-\infty, 0]$ (avoiding the branch cut):

$$\frac{d}{dz}(\text{Log } z) = \frac{1}{z}$$

**Proof**: Let $w = \text{Log } z$, so $e^w = z$. Differentiating implicitly:
$$e^w \frac{dw}{dz} = 1 \implies \frac{dw}{dz} = \frac{1}{e^w} = \frac{1}{z}$$

## Functions That Are Nowhere Differentiable

### The Complex Conjugate

**Claim**: $f(z) = \bar{z}$ is nowhere differentiable.

**Proof**: Suppose $f'(z_0)$ exists for some $z_0$. Then:

$$f'(z_0) = \lim_{h \to 0} \frac{\overline{z_0 + h} - \bar{z_0}}{h} = \lim_{h \to 0} \frac{\bar{h}}{h}$$

**Approach 1**: Let $h = t$ (real, $t \to 0$):
$$\frac{\bar{h}}{h} = \frac{t}{t} = 1$$

**Approach 2**: Let $h = it$ (imaginary, $t \to 0$):
$$\frac{\bar{h}}{h} = \frac{-it}{it} = -1$$

Since the limits along different paths differ, $f'(z_0)$ does not exist.

### The Modulus Function

**Claim**: $f(z) = |z|$ is differentiable only at $z = 0$.

**Proof**: For $z_0 \neq 0$:
$$\frac{|z_0 + h| - |z_0|}{h}$$

Along the ray $h = tz_0$ (real $t > 0$, $t \to 0^+$):
$$\frac{|z_0 + tz_0| - |z_0|}{tz_0} = \frac{(1+t)|z_0| - |z_0|}{tz_0} = \frac{|z_0|}{z_0}$$

Along the ray $h = -tz_0$ (real $t > 0$, $t \to 0^+$):
$$\frac{|z_0 - tz_0| - |z_0|}{-tz_0} = \frac{(1-t)|z_0| - |z_0|}{-tz_0} = \frac{-|z_0|}{z_0}$$

These differ unless $|z_0|/z_0 = -|z_0|/z_0$, which is impossible for $z_0 \neq 0$.

At $z_0 = 0$: $\frac{|h|}{h}$ depends on $\arg(h)$, so the limit doesn't exist.

### The Real Part Function

**Claim**: $f(z) = \text{Re}(z)$ is nowhere differentiable.

**Proof**: $f(x + iy) = x$.

Along $h = t$ (real):
$$\frac{f(z_0 + h) - f(z_0)}{h} = \frac{x_0 + t - x_0}{t} = 1$$

Along $h = it$ (imaginary):
$$\frac{f(z_0 + it) - f(z_0)}{it} = \frac{x_0 - x_0}{it} = 0$$

The limits differ, so $f$ is not differentiable.

## Higher-Order Derivatives

If $f'$ exists in a neighborhood of $z_0$ and is differentiable at $z_0$, we define:

$$f''(z_0) = (f')'(z_0) = \frac{d^2f}{dz^2}\bigg|_{z_0}$$

We can continue defining $f'''$, $f^{(4)}$, etc.

A function is **$n$ times differentiable** if $f^{(n)}$ exists.

**Remarkably**, in complex analysis: if $f'$ exists in an open set, then all higher derivatives exist! This is in stark contrast to real analysis, where differentiability doesn't guarantee higher differentiability.

We'll explore this when we discuss analytic functions.

## Differentiation vs. Partial Differentiation

For $f(z) = u(x, y) + iv(x, y)$, we might ask: how does $f'(z)$ relate to partial derivatives $\frac{\partial u}{\partial x}$, $\frac{\partial u}{\partial y}$, $\frac{\partial v}{\partial x}$, $\frac{\partial v}{\partial y}$?

**Theorem**: If $f'(z_0)$ exists, then all four partial derivatives exist at $(x_0, y_0)$ (where $z_0 = x_0 + iy_0$), and:

$$f'(z_0) = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$$

and the Cauchy-Riemann equations hold:
$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

We'll prove this in the next section on Cauchy-Riemann equations.

**Example**: For $f(z) = z^2$:
$$u(x, y) = x^2 - y^2, \quad v(x, y) = 2xy$$

$$\frac{\partial u}{\partial x} = 2x, \quad \frac{\partial v}{\partial y} = 2x \quad \checkmark$$

$$\frac{\partial u}{\partial y} = -2y, \quad \frac{\partial v}{\partial x} = 2y \quad \text{so } -\frac{\partial v}{\partial x} = -2y \quad \checkmark$$

$$f'(z) = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = 2x + i(2y) = 2(x + iy) = 2z \quad \checkmark$$

## Geometric Interpretation

In real calculus, $f'(x_0)$ represents the slope of the tangent line.

In complex calculus, $f'(z_0)$ represents a **scaling and rotation** of the tangent vector.

If $f'(z_0) = re^{i\theta}$, then near $z_0$:
- $f$ scales distances by factor $r = |f'(z_0)|$
- $f$ rotates angles by $\theta = \arg(f'(z_0))$

This makes complex differentiable functions **conformal**: they preserve angles (locally).

## Summary

- **Complex derivative**: $f'(z_0) = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}$ where $h \in \mathbb{C}$
- The limit must exist from **all directions** (much stronger than real differentiability)
- **Differentiation rules**: power, product, quotient, chain rules all hold
- **Elementary functions**: $\frac{d}{dz}e^z = e^z$, $\frac{d}{dz}\sin z = \cos z$, $\frac{d}{dz}\text{Log } z = \frac{1}{z}$
- **Nowhere differentiable**: $\bar{z}$, $|z|$, $\text{Re}(z)$, $\text{Im}(z)$
- Differentiability implies continuity
- If $f'$ exists, partial derivatives satisfy **Cauchy-Riemann equations**
- Complex differentiation has a geometric interpretation: scaling and rotation
- Complex differentiability is the gateway to the powerful theory of analytic functions
