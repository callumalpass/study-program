---
id: math204-t1-basic-rules
title: "Basic Integration Rules"
order: 2
---

# Basic Integration Rules

Just as differentiation has rules (product rule, chain rule, etc.), integration has corresponding rules that let us find antiderivatives systematically. This section develops the fundamental integration formulas that parallel the basic derivative rules, giving you the tools to integrate polynomials, exponentials, logarithmic functions, and trigonometric functions.

## The Power Rule for Integration

The most important integration rule is the reverse of the power rule for derivatives.

**Power Rule:** For any real number $n \neq -1$:

$$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$$

**Why it works:** Differentiate the right side:
$$\frac{d}{dx}\left[\frac{x^{n+1}}{n+1}\right] = \frac{n+1}{n+1} \cdot x^n = x^n \checkmark$$

**Example 1:** $\int x^5 \, dx = \frac{x^6}{6} + C$

**Example 2:** $\int x^{-3} \, dx = \frac{x^{-2}}{-2} + C = -\frac{1}{2x^2} + C$

**Example 3:** $\int \sqrt{x} \, dx = \int x^{1/2} \, dx = \frac{x^{3/2}}{3/2} + C = \frac{2}{3}x^{3/2} + C$

**Special Case:** What about $n = -1$? The formula breaks down (we'd be dividing by zero). We handle this case separately below.

## Constant Multiple Rule

Constants can be pulled outside the integral:

$$\int k \cdot f(x) \, dx = k \int f(x) \, dx$$

**Example:** $\int 5x^3 \, dx = 5 \int x^3 \, dx = 5 \cdot \frac{x^4}{4} + C = \frac{5x^4}{4} + C$

**Note:** The constant of integration is written once at the end, not after each step. Writing $5(C)$ is redundant since $5C$ is still an arbitrary constant.

## Sum and Difference Rules

Integration is linear: you can integrate term by term.

$$\int [f(x) + g(x)] \, dx = \int f(x) \, dx + \int g(x) \, dx$$

$$\int [f(x) - g(x)] \, dx = \int f(x) \, dx - \int g(x) \, dx$$

**Example:** Integrate $\int (3x^4 - 2x^2 + 7x - 5) \, dx$

**Solution:**
$$\int (3x^4 - 2x^2 + 7x - 5) \, dx = 3\int x^4 \, dx - 2\int x^2 \, dx + 7\int x \, dx - 5\int 1 \, dx$$

$$= 3 \cdot \frac{x^5}{5} - 2 \cdot \frac{x^3}{3} + 7 \cdot \frac{x^2}{2} - 5x + C$$

$$= \frac{3x^5}{5} - \frac{2x^3}{3} + \frac{7x^2}{2} - 5x + C$$

## Exponential Functions

The exponential function $e^x$ is its own derivative, so it's also its own antiderivative:

$$\int e^x \, dx = e^x + C$$

For exponentials with other bases:

$$\int a^x \, dx = \frac{a^x}{\ln a} + C \quad (a > 0, a \neq 1)$$

**Why?** Recall that $\frac{d}{dx}(a^x) = a^x \ln a$, so:
$$\frac{d}{dx}\left[\frac{a^x}{\ln a}\right] = \frac{1}{\ln a} \cdot a^x \ln a = a^x \checkmark$$

**Example 1:** $\int e^x \, dx = e^x + C$

**Example 2:** $\int 2^x \, dx = \frac{2^x}{\ln 2} + C$

**Example 3:** $\int (e^x + 3 \cdot 5^x) \, dx = e^x + \frac{3 \cdot 5^x}{\ln 5} + C = e^x + \frac{3 \cdot 5^x}{\ln 5} + C$

## The Natural Logarithm

This is the special case $n = -1$ from the power rule:

$$\int \frac{1}{x} \, dx = \ln|x| + C$$

**Why the absolute value?** The derivative of $\ln x$ is $\frac{1}{x}$ only for $x > 0$. For $x < 0$, we use $\ln|x|$ to extend the domain:

$$\frac{d}{dx}[\ln|x|] = \frac{1}{x} \text{ for all } x \neq 0$$

**Example 1:** $\int \frac{1}{x} \, dx = \ln|x| + C$

**Example 2:** $\int \frac{3}{x} \, dx = 3\ln|x| + C$

**Example 3:** $\int \left(\frac{2}{x} + x^2\right) dx = 2\ln|x| + \frac{x^3}{3} + C$

## Trigonometric Integrals

Each basic trigonometric derivative gives us an integration formula:

$$\int \sin x \, dx = -\cos x + C$$

$$\int \cos x \, dx = \sin x + C$$

$$\int \sec^2 x \, dx = \tan x + C$$

$$\int \csc^2 x \, dx = -\cot x + C$$

$$\int \sec x \tan x \, dx = \sec x + C$$

$$\int \csc x \cot x \, dx = -\csc x + C$$

**Why these formulas?** They come directly from derivatives:
- $\frac{d}{dx}(\sin x) = \cos x \implies \int \cos x \, dx = \sin x + C$
- $\frac{d}{dx}(-\cos x) = \sin x \implies \int \sin x \, dx = -\cos x + C$
- $\frac{d}{dx}(\tan x) = \sec^2 x \implies \int \sec^2 x \, dx = \tan x + C$

**Example 1:** $\int (\sin x + \cos x) \, dx = -\cos x + \sin x + C$

**Example 2:** $\int (4\sec^2 x - 2\sin x) \, dx = 4\tan x - 2(-\cos x) + C = 4\tan x + 2\cos x + C$

**Example 3:** $\int (\sec x \tan x + \csc x \cot x) \, dx = \sec x + (-\csc x) + C = \sec x - \csc x + C$

## Integrals Involving Tangent and Secant

Two important but less obvious formulas:

$$\int \tan x \, dx = -\ln|\cos x| + C = \ln|\sec x| + C$$

$$\int \sec x \, dx = \ln|\sec x + \tan x| + C$$

**Derivation for tan:** Write $\tan x = \frac{\sin x}{\cos x}$. If we let $u = \cos x$, then $du = -\sin x \, dx$, so:
$$\int \tan x \, dx = \int \frac{\sin x}{\cos x} \, dx = -\int \frac{du}{u} = -\ln|u| + C = -\ln|\cos x| + C$$

Using the identity $\sec x = \frac{1}{\cos x}$, this equals $\ln|\sec x| + C$.

**Example 4:** $\int \tan x \, dx = \ln|\sec x| + C$

The integral of $\sec x$ requires a clever trick (multiply by $\frac{\sec x + \tan x}{\sec x + \tan x}$), which we'll see in detail when we study advanced trigonometric integration.

## Combining Rules: Complex Polynomials

**Example:** Integrate $\int \frac{4x^5 - 3x^2 + 2}{x^2} \, dx$

**Solution:** First simplify by dividing each term:
$$\int \frac{4x^5 - 3x^2 + 2}{x^2} \, dx = \int \left(4x^3 - 3 + 2x^{-2}\right) dx$$

Now integrate term by term:
$$= 4 \cdot \frac{x^4}{4} - 3x + 2 \cdot \frac{x^{-1}}{-1} + C$$

$$= x^4 - 3x - \frac{2}{x} + C$$

## Initial Value Problems Revisited

**Example:** Find $f(x)$ if $f'(x) = 6x^2 - 4x + 1$ and $f(2) = 5$.

**Solution:** Integrate to find the general solution:
$$f(x) = \int (6x^2 - 4x + 1) \, dx = 2x^3 - 2x^2 + x + C$$

Use the initial condition $f(2) = 5$:
$$2(2)^3 - 2(2)^2 + 2 + C = 5$$
$$16 - 8 + 2 + C = 5$$
$$10 + C = 5$$
$$C = -5$$

Therefore, $f(x) = 2x^3 - 2x^2 + x - 5$.

## Common Mistakes

**Mistake 1: Forgetting the constant**
$$\int 3x^2 \, dx = x^3 \quad \text{WRONG}$$
$$\int 3x^2 \, dx = x^3 + C \quad \text{RIGHT}$$

**Mistake 2: Wrong power rule application**
$$\int x^4 \, dx = \frac{x^4}{4} + C \quad \text{WRONG (didn't increase power)}$$
$$\int x^4 \, dx = \frac{x^5}{5} + C \quad \text{RIGHT}$$

**Mistake 3: Using power rule for $n = -1$**
$$\int \frac{1}{x} \, dx = \frac{x^0}{0} + C \quad \text{WRONG (division by zero)}$$
$$\int \frac{1}{x} \, dx = \ln|x| + C \quad \text{RIGHT}$$

**Mistake 4: Forgetting absolute value in logarithms**
$$\int \frac{1}{x} \, dx = \ln x + C \quad \text{INCOMPLETE (only valid for } x > 0)$$
$$\int \frac{1}{x} \, dx = \ln|x| + C \quad \text{RIGHT (valid for all } x \neq 0)$$

**Mistake 5: Wrong sign on trigonometric integrals**
$$\int \sin x \, dx = \cos x + C \quad \text{WRONG}$$
$$\int \sin x \, dx = -\cos x + C \quad \text{RIGHT}$$

## Quick Reference Table

| Function $f(x)$ | Antiderivative $\int f(x) \, dx$ |
|-----------------|----------------------------------|
| $x^n$ (n ≠ -1) | $\frac{x^{n+1}}{n+1} + C$ |
| $\frac{1}{x}$ | $\ln \|x\| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\frac{a^x}{\ln a} + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |
| $\csc^2 x$ | $-\cot x + C$ |
| $\sec x \tan x$ | $\sec x + C$ |
| $\csc x \cot x$ | $-\csc x + C$ |
| $\tan x$ | $\ln\|\sec x\| + C$ |
| $\sec x$ | $\ln\|\sec x + \tan x\| + C$ |

## Practice Strategy

1. **Memorize the basic formulas** — they're the building blocks for everything else
2. **Always verify** by differentiating your answer
3. **Simplify before integrating** — algebraic manipulation often makes integrals easier
4. **Check the domain** — especially for logarithmic results
5. **Don't forget $+C$** — it's not optional!

## Summary

- The **power rule** $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$ handles polynomials and rational powers
- The **constant multiple rule** lets you pull out constants
- The **sum/difference rules** let you integrate term by term
- **Exponential integrals**: $\int e^x \, dx = e^x + C$ and $\int a^x \, dx = \frac{a^x}{\ln a} + C$
- **Logarithmic integral**: $\int \frac{1}{x} \, dx = \ln|x| + C$ (special case of power rule)
- **Trigonometric integrals** reverse the standard derivative formulas
- Always include $+C$ and verify by differentiation

These basic rules form the foundation of integration. More complex functions will require additional techniques (substitution, integration by parts, partial fractions), but these fundamental formulas will appear in nearly every integral you encounter. Master them now, and the rest of integral calculus will build naturally on this foundation.
