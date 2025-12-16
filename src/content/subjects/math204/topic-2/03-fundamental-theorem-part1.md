# Fundamental Theorem of Calculus, Part 1

The Fundamental Theorem of Calculus (FTC) is one of the most important results in mathematics. It establishes the profound connection between differentiation and integration—two operations that initially seem unrelated. Part 1 of the FTC tells us that integration and differentiation are inverse operations, and it gives us a powerful tool for working with accumulation functions.

## The Accumulation Function

Consider a continuous function $f$ on an interval $[a, b]$. For any $x$ in this interval, we can define the **accumulation function** $A(x)$ as:

$$A(x) = \int_a^x f(t) \, dt$$

This function represents the accumulated "signed area" under the curve $f$ from the fixed starting point $a$ to the variable endpoint $x$.

**Key observations:**
- $A(a) = \int_a^a f(t) \, dt = 0$ (the accumulation starts at zero)
- As $x$ increases, $A(x)$ accumulates the values of $f$
- If $f(t) > 0$, then $A(x)$ is increasing
- If $f(t) < 0$, then $A(x)$ is decreasing

**Example:** Let $f(t) = t$ and $a = 0$. Then:
$$A(x) = \int_0^x t \, dt$$

This integral represents the area of a triangle with base $x$ and height $x$, which is $\frac{1}{2}x^2$. So $A(x) = \frac{1}{2}x^2$.

Notice that $A'(x) = x = f(x)$. This is not a coincidence—it's the essence of FTC Part 1.

## Statement of FTC Part 1

**Fundamental Theorem of Calculus, Part 1:**

If $f$ is continuous on $[a, b]$, then the function $A$ defined by:
$$A(x) = \int_a^x f(t) \, dt$$

is continuous on $[a, b]$, differentiable on $(a, b)$, and:
$$A'(x) = f(x)$$

**In words:** The derivative of the accumulation function is the original function. Or more poetically: **the derivative of an integral is the integrand**.

## Why This Is Remarkable

The FTC Part 1 tells us something profound:
1. **Integration produces antiderivatives:** If you integrate a function $f$ from a constant to $x$, you get a function whose derivative is $f$.
2. **Differentiation and integration are inverse operations:** Taking the derivative "undoes" the integral.

Before the FTC, we had two separate branches of calculus:
- **Differential calculus:** studying rates of change (derivatives)
- **Integral calculus:** studying areas and accumulation (integrals)

The FTC unified these branches by revealing that they are fundamentally connected.

## Proof Sketch

The proof uses the definition of the derivative. We want to show that $A'(x) = f(x)$ where $A(x) = \int_a^x f(t) \, dt$.

$$A'(x) = \lim_{h \to 0} \frac{A(x + h) - A(x)}{h}$$

$$= \lim_{h \to 0} \frac{\int_a^{x+h} f(t) \, dt - \int_a^x f(t) \, dt}{h}$$

By the additivity property of integrals:
$$\int_a^{x+h} f(t) \, dt = \int_a^x f(t) \, dt + \int_x^{x+h} f(t) \, dt$$

So:
$$A'(x) = \lim_{h \to 0} \frac{\int_x^{x+h} f(t) \, dt}{h}$$

For small $h$, the integral $\int_x^{x+h} f(t) \, dt$ represents the area of a thin strip of width $h$. If $f$ is continuous, this area is approximately $f(x) \cdot h$ (a rectangle with base $h$ and height $f(x)$).

Therefore:
$$A'(x) = \lim_{h \to 0} \frac{f(x) \cdot h}{h} = \lim_{h \to 0} f(x) = f(x)$$

The rigorous proof uses the Mean Value Theorem for Integrals to make this precise.

## Examples

**Example 1:** Find $\frac{d}{dx} \int_0^x t^2 \, dt$.

By FTC Part 1, the derivative is simply the integrand with $x$ substituted for $t$:
$$\frac{d}{dx} \int_0^x t^2 \, dt = x^2$$

We can verify this by computing the integral explicitly:
$$\int_0^x t^2 \, dt = \left[ \frac{t^3}{3} \right]_0^x = \frac{x^3}{3} - 0 = \frac{x^3}{3}$$

And indeed, $\frac{d}{dx}\left(\frac{x^3}{3}\right) = x^2$.

**Example 2:** Find $\frac{d}{dx} \int_2^x \sin(t) \, dt$.

By FTC Part 1:
$$\frac{d}{dx} \int_2^x \sin(t) \, dt = \sin(x)$$

The lower limit being 2 instead of 0 doesn't matter—the derivative is still the integrand.

**Example 3:** Find $\frac{d}{dx} \int_0^x e^{t^2} \, dt$.

Even though we cannot evaluate $\int_0^x e^{t^2} \, dt$ in terms of elementary functions (the antiderivative is non-elementary), FTC Part 1 still applies:
$$\frac{d}{dx} \int_0^x e^{t^2} \, dt = e^{x^2}$$

This demonstrates the power of FTC Part 1: we can differentiate accumulation functions even when we can't compute the integral explicitly.

## Variable Limits: The Chain Rule

What if the upper limit is not simply $x$, but a function of $x$?

**Example 4:** Find $\frac{d}{dx} \int_0^{x^2} \sin(t) \, dt$.

Let $u = x^2$. Then:
$$\int_0^{x^2} \sin(t) \, dt = \int_0^u \sin(t) \, dt = A(u)$$

where $A(u) = \int_0^u \sin(t) \, dt$.

By FTC Part 1, $A'(u) = \sin(u)$.

By the chain rule:
$$\frac{d}{dx} A(u) = A'(u) \cdot \frac{du}{dx} = \sin(u) \cdot 2x = \sin(x^2) \cdot 2x$$

**General formula:** If $g(x)$ is the upper limit:
$$\frac{d}{dx} \int_a^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x)$$

**Example 5:** Find $\frac{d}{dx} \int_0^{\cos(x)} t^3 \, dt$.

Using the formula:
$$\frac{d}{dx} \int_0^{\cos(x)} t^3 \, dt = (\cos(x))^3 \cdot \frac{d}{dx}[\cos(x)] = \cos^3(x) \cdot (-\sin(x)) = -\sin(x)\cos^3(x)$$

## Variable Lower Limit

What if the lower limit is a function of $x$ instead?

**Example 6:** Find $\frac{d}{dx} \int_{x^2}^1 \sin(t) \, dt$.

Use the property that $\int_b^a f(t) \, dt = -\int_a^b f(t) \, dt$:
$$\int_{x^2}^1 \sin(t) \, dt = -\int_1^{x^2} \sin(t) \, dt$$

Now apply the formula:
$$\frac{d}{dx} \left[ -\int_1^{x^2} \sin(t) \, dt \right] = -\sin(x^2) \cdot 2x = -2x\sin(x^2)$$

**General formula:** If $h(x)$ is the lower limit:
$$\frac{d}{dx} \int_{h(x)}^b f(t) \, dt = -f(h(x)) \cdot h'(x)$$

## Both Limits Variable

**Example 7:** Find $\frac{d}{dx} \int_{\sin(x)}^{x^2} e^t \, dt$.

Split the integral at a convenient constant (say, 0):
$$\int_{\sin(x)}^{x^2} e^t \, dt = \int_{\sin(x)}^0 e^t \, dt + \int_0^{x^2} e^t \, dt = -\int_0^{\sin(x)} e^t \, dt + \int_0^{x^2} e^t \, dt$$

Differentiate each piece:
$$\frac{d}{dx} \left[ -\int_0^{\sin(x)} e^t \, dt + \int_0^{x^2} e^t \, dt \right]$$
$$= -e^{\sin(x)} \cdot \cos(x) + e^{x^2} \cdot 2x$$

**General formula:**
$$\frac{d}{dx} \int_{h(x)}^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x) - f(h(x)) \cdot h'(x)$$

## Applications of FTC Part 1

### Defining New Functions

The error function, used extensively in probability and statistics, is defined as:
$$\text{erf}(x) = \frac{2}{\sqrt{\pi}} \int_0^x e^{-t^2} \, dt$$

We cannot evaluate this integral in closed form, but using FTC Part 1, we can immediately write:
$$\text{erf}'(x) = \frac{2}{\sqrt{\pi}} e^{-x^2}$$

### Solving Differential Equations

If we know that $F'(x) = f(x)$ and $F(a) = 0$, then by FTC Part 1:
$$F(x) = \int_a^x f(t) \, dt$$

This provides a general solution to the differential equation $F'(x) = f(x)$ with initial condition $F(a) = 0$.

## Summary

- The **accumulation function** $A(x) = \int_a^x f(t) \, dt$ accumulates the area under $f$ from $a$ to $x$
- **FTC Part 1** states that $A'(x) = f(x)$: the derivative of an integral is the integrand
- This shows that **differentiation and integration are inverse operations**
- With variable limits:
  - Upper limit: $\frac{d}{dx} \int_a^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x)$
  - Lower limit: $\frac{d}{dx} \int_{h(x)}^b f(t) \, dt = -f(h(x)) \cdot h'(x)$
  - Both: $\frac{d}{dx} \int_{h(x)}^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x) - f(h(x)) \cdot h'(x)$
- FTC Part 1 allows us to work with functions defined by integrals that cannot be evaluated explicitly
