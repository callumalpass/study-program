# Integration by Parts

Integration by parts is one of the most powerful and versatile techniques in calculus. It transforms the integral of a product of two functions into a potentially simpler form. While the formula itself is straightforward, mastering integration by parts requires developing intuition for when to use it and how to choose the components effectively.

## The Formula

Integration by parts comes directly from the product rule for differentiation. Recall that:

$$(uv)' = u'v + uv'$$

Rearranging:
$$uv' = (uv)' - u'v$$

Integrating both sides:
$$\int u \, dv = uv - \int v \, du$$

This is the **integration by parts formula**. It states that the integral of $u \, dv$ equals the product $uv$ minus the integral of $v \, du$.

**In differential form:**
$$\int u(x)v'(x) \, dx = u(x)v(x) - \int u'(x)v(x) \, dx$$

## When to Use Integration by Parts

Integration by parts is ideal when you have:
- A product of two different types of functions
- An integrand where one factor becomes simpler when differentiated
- Logarithmic or inverse trigonometric functions (which are awkward to integrate directly)

**Classic examples:**
- $\int x e^x \, dx$ (polynomial times exponential)
- $\int x \sin x \, dx$ (polynomial times trigonometric)
- $\int \ln x \, dx$ (logarithmic function alone)
- $\int x^2 \cos x \, dx$ (polynomial times trigonometric)
- $\int e^x \sin x \, dx$ (exponential times trigonometric)

## The LIATE Rule

Choosing which part of the integrand should be $u$ and which should be $dv$ is crucial. The **LIATE rule** provides a priority ordering:

1. **L**ogarithmic functions: $\ln x$, $\log_b x$
2. **I**nverse trigonometric functions: $\arcsin x$, $\arctan x$, $\arccos x$
3. **A**lgebraic functions: $x$, $x^2$, $x^3$, $\sqrt{x}$, polynomials
4. **T**rigonometric functions: $\sin x$, $\cos x$, $\tan x$, $\sec x$
5. **E**xponential functions: $e^x$, $2^x$, $a^x$

**How to use LIATE:**
- Identify the types of functions in your integrand
- Choose $u$ from the category that appears earliest in LIATE
- Let $dv$ be everything else (including $dx$)

**Why this order?**
- Logarithmic and inverse trig functions become simpler when differentiated
- Polynomials decrease in degree when differentiated (eventually reaching zero)
- Trig and exponential functions don't simplify much when differentiated, but are easy to integrate

## Example 1: Polynomial Times Exponential

Evaluate $\int x e^x \, dx$

**Solution:**

Following LIATE:
- $x$ is algebraic (A)
- $e^x$ is exponential (E)
- Choose $u = x$ (earlier in LIATE)

Set up:
- $u = x$ → $du = dx$
- $dv = e^x \, dx$ → $v = e^x$

Apply the formula:
$$\int x e^x \, dx = x e^x - \int e^x \, dx = x e^x - e^x + C$$

Factor:
$$\int x e^x \, dx = e^x(x - 1) + C$$

**Verification:** Differentiate $e^x(x - 1) + C$:
$$\frac{d}{dx}[e^x(x - 1)] = e^x(x - 1) + e^x(1) = e^x \cdot x \,\checkmark$$

## Example 2: Polynomial Times Trigonometric

Evaluate $\int x \cos x \, dx$

**Solution:**

Following LIATE:
- $u = x$ (algebraic)
- $dv = \cos x \, dx$ (trigonometric)

Then:
- $du = dx$
- $v = \sin x$

Apply:
$$\int x \cos x \, dx = x \sin x - \int \sin x \, dx = x \sin x + \cos x + C$$

## Example 3: Logarithmic Function

Evaluate $\int \ln x \, dx$

**Solution:**

This appears to be a single function, but we can write it as a product with 1:
$$\int \ln x \, dx = \int (\ln x)(1) \, dx$$

Following LIATE:
- $u = \ln x$ (logarithmic)
- $dv = 1 \, dx$ (constant, essentially algebraic)

Then:
- $du = \frac{1}{x} \, dx$
- $v = x$

Apply:
$$\int \ln x \, dx = x \ln x - \int x \cdot \frac{1}{x} \, dx = x \ln x - \int 1 \, dx = x \ln x - x + C$$

Factor:
$$\int \ln x \, dx = x(\ln x - 1) + C$$

## Repeated Application

Sometimes integration by parts must be applied multiple times. Each application should make the integral simpler.

**Example:** Evaluate $\int x^2 e^x \, dx$

**Solution:**

**First application:**
- $u = x^2$, $du = 2x \, dx$
- $dv = e^x \, dx$, $v = e^x$

$$\int x^2 e^x \, dx = x^2 e^x - \int e^x (2x) \, dx = x^2 e^x - 2\int x e^x \, dx$$

**Second application** on $\int x e^x \, dx$:
- $u = x$, $du = dx$
- $dv = e^x \, dx$, $v = e^x$

$$\int x e^x \, dx = x e^x - \int e^x \, dx = x e^x - e^x$$

**Combine:**
$$\int x^2 e^x \, dx = x^2 e^x - 2(x e^x - e^x) + C = x^2 e^x - 2x e^x + 2e^x + C$$

Factor:
$$\int x^2 e^x \, dx = e^x(x^2 - 2x + 2) + C$$

## The Tabular Method

For integrals requiring multiple applications of integration by parts (especially polynomials times exponentials or trig functions), the **tabular method** dramatically speeds up computation.

**Process:**
1. Identify $u$ (what to differentiate) and $dv$ (what to integrate)
2. Create a table with two columns
3. In the left column, differentiate $u$ repeatedly until you reach 0
4. In the right column, integrate $dv$ repeatedly the same number of times
5. Draw diagonal arrows from left to right, alternating signs (+, -, +, -, ...)
6. Multiply along each arrow and sum

**Example:** Evaluate $\int x^3 e^x \, dx$ using the tabular method

| Sign | Differentiate | Integrate |
|------|--------------|-----------|
| + | $x^3$ | $e^x$ |
| - | $3x^2$ | $e^x$ |
| + | $6x$ | $e^x$ |
| - | $6$ | $e^x$ |
| + | $0$ | $e^x$ |

Reading the table:
$$\int x^3 e^x \, dx = (+)(x^3)(e^x) + (-)(3x^2)(e^x) + (+)(6x)(e^x) + (-)(6)(e^x) + C$$

$$= e^x(x^3 - 3x^2 + 6x - 6) + C$$

**Why it works:** This systematically applies integration by parts multiple times, tracking all the pieces efficiently.

## Circular Integration by Parts

Sometimes integration by parts leads back to the original integral. This isn't failure—it's an algebraic opportunity!

**Example:** Evaluate $\int e^x \sin x \, dx$

**Solution:**

Let $I = \int e^x \sin x \, dx$

**First application:**
- $u = \sin x$, $du = \cos x \, dx$
- $dv = e^x \, dx$, $v = e^x$

$$I = e^x \sin x - \int e^x \cos x \, dx$$

**Second application** on $\int e^x \cos x \, dx$:
- $u = \cos x$, $du = -\sin x \, dx$
- $dv = e^x \, dx$, $v = e^x$

$$\int e^x \cos x \, dx = e^x \cos x - \int e^x(-\sin x) \, dx = e^x \cos x + \int e^x \sin x \, dx$$

**Substitute back:**
$$I = e^x \sin x - (e^x \cos x + I)$$
$$I = e^x \sin x - e^x \cos x - I$$
$$2I = e^x(\sin x - \cos x)$$
$$I = \frac{e^x(\sin x - \cos x)}{2} + C$$

**Key insight:** When the integral reappears, treat it as an unknown and solve algebraically.

## Common Mistakes

**Mistake 1: Choosing the wrong $u$**

If your integral becomes more complicated, you likely chose the wrong function for $u$. Try swapping $u$ and $dv$.

**Mistake 2: Sign errors**

The formula has a minus sign: $\int u \, dv = uv - \int v \, du$. Don't forget it!

**Mistake 3: Forgetting the constant**

The constant $C$ only appears in the final answer, not in intermediate steps.

**Mistake 4: Incorrect differentiation or integration**

Double-check that $du$ is truly the derivative of $u$ and $v$ is truly an antiderivative of $dv$.

## Summary

- Integration by parts transforms $\int u \, dv = uv - \int v \, du$
- Use LIATE to choose $u$: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential
- Some integrals require repeated application
- The tabular method streamlines repeated integration by parts
- Circular patterns lead to algebraic solutions
- Always verify your answer by differentiation
