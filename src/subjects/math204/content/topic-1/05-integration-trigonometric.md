---
id: math204-t1-trig
title: "Trigonometric Integration"
order: 5
---

# Integration of Trigonometric Functions

Trigonometric functions appear throughout physics, engineering, and applied mathematics—modeling oscillations, waves, and periodic phenomena. While we know basic integrals like $\int \sin(x) \, dx = -\cos(x) + C$, integrating products and powers of trigonometric functions requires sophisticated techniques. This section develops strategies for handling these integrals systematically.

## Review: Basic Trigonometric Integrals

Before tackling complex cases, recall the fundamental formulas:

$$\int \sin(x) \, dx = -\cos(x) + C$$

$$\int \cos(x) \, dx = \sin(x) + C$$

$$\int \sec^2(x) \, dx = \tan(x) + C$$

$$\int \csc^2(x) \, dx = -\cot(x) + C$$

$$\int \sec(x)\tan(x) \, dx = \sec(x) + C$$

$$\int \csc(x)\cot(x) \, dx = -\csc(x) + C$$

$$\int \tan(x) \, dx = \ln|\sec(x)| + C = -\ln|\cos(x)| + C$$

$$\int \cot(x) \, dx = \ln|\sin(x)| + C$$

$$\int \sec(x) \, dx = \ln|\sec(x) + \tan(x)| + C$$

$$\int \csc(x) \, dx = -\ln|\csc(x) + \cot(x)| + C = \ln|\csc(x) - \cot(x)| + C$$

## Strategy 1: Powers of Sine and Cosine

### Case 1: Odd Power of Sine or Cosine

When integrating $\int \sin^m(x) \cos^n(x) \, dx$ with $m$ or $n$ odd, use substitution.

**Strategy:** Save one factor of the odd power to form $du$, convert the rest using $\sin^2(x) + \cos^2(x) = 1$.

**Example 1:** $\int \sin^3(x) \, dx$

**Solution:**

Write $\sin^3(x) = \sin^2(x) \cdot \sin(x) = (1 - \cos^2(x))\sin(x)$

Let $u = \cos(x)$, then $du = -\sin(x) \, dx$

$$\int \sin^3(x) \, dx = \int (1 - \cos^2(x))\sin(x) \, dx = -\int (1 - u^2) \, du$$

$$= -\left(u - \frac{u^3}{3}\right) + C = -\cos(x) + \frac{\cos^3(x)}{3} + C$$

**Example 2:** $\int \sin^2(x)\cos^3(x) \, dx$

**Solution:**

Cosine has odd power, so save one $\cos(x)$ for $du$:

$$\sin^2(x)\cos^3(x) = \sin^2(x)\cos^2(x) \cdot \cos(x) = \sin^2(x)(1 - \sin^2(x))\cos(x)$$

Let $u = \sin(x)$, $du = \cos(x) \, dx$

$$\int \sin^2(x)\cos^3(x) \, dx = \int u^2(1 - u^2) \, du = \int (u^2 - u^4) \, du$$

$$= \frac{u^3}{3} - \frac{u^5}{5} + C = \frac{\sin^3(x)}{3} - \frac{\sin^5(x)}{5} + C$$

### Case 2: Even Powers of Both

When both powers are even, use **power-reducing formulas**:

$$\sin^2(x) = \frac{1 - \cos(2x)}{2}$$

$$\cos^2(x) = \frac{1 + \cos(2x)}{2}$$

**Example 3:** $\int \sin^2(x) \, dx$

**Solution:**

$$\int \sin^2(x) \, dx = \int \frac{1 - \cos(2x)}{2} \, dx = \frac{1}{2}\int (1 - \cos(2x)) \, dx$$

$$= \frac{1}{2}\left(x - \frac{\sin(2x)}{2}\right) + C = \frac{x}{2} - \frac{\sin(2x)}{4} + C$$

**Example 4:** $\int \sin^2(x)\cos^2(x) \, dx$

**Solution:**

Use the identity $\sin(2x) = 2\sin(x)\cos(x)$, so $\sin(x)\cos(x) = \frac{\sin(2x)}{2}$

$$\sin^2(x)\cos^2(x) = \left[\sin(x)\cos(x)\right]^2 = \left[\frac{\sin(2x)}{2}\right]^2 = \frac{\sin^2(2x)}{4}$$

Now use the power-reducing formula on $\sin^2(2x)$:

$$\int \sin^2(x)\cos^2(x) \, dx = \frac{1}{4}\int \sin^2(2x) \, dx = \frac{1}{4}\int \frac{1 - \cos(4x)}{2} \, dx$$

$$= \frac{1}{8}\int (1 - \cos(4x)) \, dx = \frac{1}{8}\left(x - \frac{\sin(4x)}{4}\right) + C$$

$$= \frac{x}{8} - \frac{\sin(4x)}{32} + C$$

## Strategy 2: Powers of Tangent and Secant

### Case 1: Even Power of Secant

Use $\sec^2(x) = 1 + \tan^2(x)$ and let $u = \tan(x)$, $du = \sec^2(x) \, dx$.

**Example 5:** $\int \tan^2(x)\sec^4(x) \, dx$

**Solution:**

Write $\sec^4(x) = \sec^2(x) \cdot \sec^2(x) = (1 + \tan^2(x))\sec^2(x)$

$$\int \tan^2(x)\sec^4(x) \, dx = \int \tan^2(x)(1 + \tan^2(x))\sec^2(x) \, dx$$

Let $u = \tan(x)$, $du = \sec^2(x) \, dx$

$$= \int u^2(1 + u^2) \, du = \int (u^2 + u^4) \, du = \frac{u^3}{3} + \frac{u^5}{5} + C$$

$$= \frac{\tan^3(x)}{3} + \frac{\tan^5(x)}{5} + C$$

### Case 2: Odd Power of Tangent

Use $\tan^2(x) = \sec^2(x) - 1$ and let $u = \sec(x)$, $du = \sec(x)\tan(x) \, dx$.

**Example 6:** $\int \tan^3(x)\sec(x) \, dx$

**Solution:**

Write $\tan^3(x) = \tan^2(x) \cdot \tan(x) = (\sec^2(x) - 1)\tan(x)$

$$\int \tan^3(x)\sec(x) \, dx = \int (\sec^2(x) - 1)\sec(x)\tan(x) \, dx$$

Let $u = \sec(x)$, $du = \sec(x)\tan(x) \, dx$

$$= \int (u^2 - 1) \, du = \frac{u^3}{3} - u + C = \frac{\sec^3(x)}{3} - \sec(x) + C$$

### Case 3: Odd Power of Secant and Even Power of Tangent

Save $\sec(x)\tan(x)$ for $du$, convert remaining tangents using $\tan^2(x) = \sec^2(x) - 1$.

### Case 4: Even Power of Tangent Only

Use $\tan^2(x) = \sec^2(x) - 1$ repeatedly to reduce the power.

**Example 7:** $\int \tan^2(x) \, dx$

**Solution:**

$$\int \tan^2(x) \, dx = \int (\sec^2(x) - 1) \, dx = \tan(x) - x + C$$

## Strategy 3: Products Using Identities

For products like $\sin(mx)\cos(nx)$, use **product-to-sum formulas**:

$$\sin(A)\cos(B) = \frac{1}{2}[\sin(A+B) + \sin(A-B)]$$

$$\sin(A)\sin(B) = \frac{1}{2}[\cos(A-B) - \cos(A+B)]$$

$$\cos(A)\cos(B) = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$$

**Example 8:** $\int \sin(3x)\cos(5x) \, dx$

**Solution:**

$$\sin(3x)\cos(5x) = \frac{1}{2}[\sin(8x) + \sin(-2x)] = \frac{1}{2}[\sin(8x) - \sin(2x)]$$

$$\int \sin(3x)\cos(5x) \, dx = \frac{1}{2}\int [\sin(8x) - \sin(2x)] \, dx$$

$$= \frac{1}{2}\left[-\frac{\cos(8x)}{8} + \frac{\cos(2x)}{2}\right] + C$$

$$= -\frac{\cos(8x)}{16} + \frac{\cos(2x)}{4} + C$$

## Strategy 4: Completing the Square (Tangent Inverse)

Integrals of the form $\int \frac{1}{a^2 + x^2} \, dx$ yield inverse tangent:

$$\int \frac{1}{a^2 + x^2} \, dx = \frac{1}{a}\arctan\left(\frac{x}{a}\right) + C$$

**Example 9:** $\int \frac{1}{4 + x^2} \, dx$

**Solution:**

Here $a^2 = 4$, so $a = 2$:

$$\int \frac{1}{4 + x^2} \, dx = \frac{1}{2}\arctan\left(\frac{x}{2}\right) + C$$

## Special Techniques

### Multiplying by Conjugate

**Example 10:** Find $\int \sec(x) \, dx$

**Solution:**

Multiply by $\frac{\sec(x) + \tan(x)}{\sec(x) + \tan(x)}$:

$$\int \sec(x) \, dx = \int \sec(x) \cdot \frac{\sec(x) + \tan(x)}{\sec(x) + \tan(x)} \, dx = \int \frac{\sec^2(x) + \sec(x)\tan(x)}{\sec(x) + \tan(x)} \, dx$$

Let $u = \sec(x) + \tan(x)$, then $du = (\sec(x)\tan(x) + \sec^2(x)) \, dx$

$$= \int \frac{1}{u} \, du = \ln|u| + C = \ln|\sec(x) + \tan(x)| + C$$

## Summary Table: Strategies by Form

| Form | Strategy |
|------|----------|
| $\sin^m(x)\cos^n(x)$, $m$ or $n$ odd | Save one factor for $du$, use $\sin^2 + \cos^2 = 1$ |
| $\sin^m(x)\cos^n(x)$, $m$ and $n$ even | Power-reducing formulas |
| $\tan^m(x)\sec^n(x)$, $n$ even | Use $\sec^2 = 1 + \tan^2$, let $u = \tan(x)$ |
| $\tan^m(x)\sec^n(x)$, $m$ odd | Use $\tan^2 = \sec^2 - 1$, let $u = \sec(x)$ |
| $\tan^m(x)$ only, $m$ even | Use $\tan^2 = \sec^2 - 1$ repeatedly |
| $\sin(mx)\cos(nx)$ | Product-to-sum formulas |
| $\frac{1}{a^2 + x^2}$ | Arctan formula |

## Common Pitfalls

**Pitfall 1: Forgetting absolute value**

$$\int \tan(x) \, dx = \ln(\sec(x)) + C \quad \text{WRONG}$$

$$\int \tan(x) \, dx = \ln|\sec(x)| + C \quad \text{RIGHT}$$

**Pitfall 2: Incorrect power reduction**

$$\sin^2(x) = \frac{1 - \cos(x)}{2} \quad \text{WRONG (missing the 2 in } \cos(2x)\text{)}$$

$$\sin^2(x) = \frac{1 - \cos(2x)}{2} \quad \text{RIGHT}$$

**Pitfall 3: Wrong substitution**

For $\int \sin^4(x)\cos^2(x) \, dx$, both powers are even—don't use $u$-substitution, use power-reducing formulas.

## Summary

- **Odd powers**: Use substitution after converting with Pythagorean identities
- **Even powers**: Use power-reducing formulas
- **Tangent/secant**: Choose substitution based on which has special parity
- **Products**: Use product-to-sum identities
- **Inverse trig**: Recognize standard forms
- **Always verify** by differentiating your result

Trigonometric integration requires pattern recognition and strategic use of identities. With practice, you'll develop intuition for which technique applies to each form. These methods appear throughout physics (harmonic motion), electrical engineering (AC circuits), and signal processing (Fourier analysis), making them essential tools for applied mathematics.
