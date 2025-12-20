---
id: math204-t3-trig-integrals
title: "Trigonometric Integrals"
order: 2
---

# Trigonometric Integrals

Integrals involving trigonometric functions appear throughout calculus and its applications, from Fourier analysis to physics problems involving oscillations and waves. While some trigonometric integrals can be solved with basic substitution, many require specialized strategies based on the specific functions involved and their powers. This section develops systematic approaches to evaluating these integrals.

## Powers of Sine and Cosine

The most common trigonometric integrals involve powers of sine and cosine. The strategy depends on whether the powers are odd or even.

### Strategy for Odd Powers

**If the power of sine is odd:**

1. Save one factor of $\sin x$ (to pair with $dx$)
2. Convert the remaining even power of sine to cosines using $\sin^2 x = 1 - \cos^2 x$
3. Substitute $u = \cos x$, so $du = -\sin x \, dx$

**Example:** Evaluate $\int \sin^3 x \, dx$

**Solution:**

Rewrite using $\sin^2 x = 1 - \cos^2 x$:
$$\int \sin^3 x \, dx = \int \sin^2 x \cdot \sin x \, dx = \int (1 - \cos^2 x) \sin x \, dx$$

Substitute $u = \cos x$, $du = -\sin x \, dx$:
$$\int (1 - u^2)(-du) = -\int (1 - u^2) \, du = -u + \frac{u^3}{3} + C$$

Convert back:
$$\int \sin^3 x \, dx = -\cos x + \frac{\cos^3 x}{3} + C$$

**If the power of cosine is odd:**

Follow the same strategy, but save one $\cos x$ and convert the rest to sines using $\cos^2 x = 1 - \sin^2 x$. Then substitute $u = \sin x$.

**Example:** Evaluate $\int \cos^5 x \, dx$

**Solution:**

$$\int \cos^5 x \, dx = \int \cos^4 x \cdot \cos x \, dx = \int (\cos^2 x)^2 \cos x \, dx$$

$$= \int (1 - \sin^2 x)^2 \cos x \, dx$$

Substitute $u = \sin x$, $du = \cos x \, dx$:
$$\int (1 - u^2)^2 \, du = \int (1 - 2u^2 + u^4) \, du$$

$$= u - \frac{2u^3}{3} + \frac{u^5}{5} + C$$

Convert back:
$$\int \cos^5 x \, dx = \sin x - \frac{2\sin^3 x}{3} + \frac{\sin^5 x}{5} + C$$

### Strategy for Even Powers

When both powers are even, use the **half-angle identities**:

$$\sin^2 x = \frac{1 - \cos 2x}{2}$$

$$\cos^2 x = \frac{1 + \cos 2x}{2}$$

**Example:** Evaluate $\int \sin^2 x \, dx$

**Solution:**

Apply the half-angle identity:
$$\int \sin^2 x \, dx = \int \frac{1 - \cos 2x}{2} \, dx$$

$$= \frac{1}{2}\int (1 - \cos 2x) \, dx = \frac{1}{2}\left(x - \frac{\sin 2x}{2}\right) + C$$

$$= \frac{x}{2} - \frac{\sin 2x}{4} + C$$

**Example:** Evaluate $\int \sin^2 x \cos^2 x \, dx$

**Solution:**

Use both half-angle identities:
$$\int \sin^2 x \cos^2 x \, dx = \int \left(\frac{1 - \cos 2x}{2}\right)\left(\frac{1 + \cos 2x}{2}\right) \, dx$$

$$= \frac{1}{4}\int (1 - \cos^2 2x) \, dx$$

Apply the identity again to $\cos^2 2x$:
$$= \frac{1}{4}\int \left(1 - \frac{1 + \cos 4x}{2}\right) \, dx$$

$$= \frac{1}{4}\int \left(\frac{1}{2} - \frac{\cos 4x}{2}\right) \, dx$$

$$= \frac{1}{4}\left(\frac{x}{2} - \frac{\sin 4x}{8}\right) + C = \frac{x}{8} - \frac{\sin 4x}{32} + C$$

## Products of Sine and Cosine

For integrals of the form $\int \sin(mx)\cos(nx) \, dx$, $\int \sin(mx)\sin(nx) \, dx$, or $\int \cos(mx)\cos(nx) \, dx$ where $m \neq n$, use **product-to-sum identities**:

$$\sin A \cos B = \frac{1}{2}[\sin(A - B) + \sin(A + B)]$$

$$\sin A \sin B = \frac{1}{2}[\cos(A - B) - \cos(A + B)]$$

$$\cos A \cos B = \frac{1}{2}[\cos(A - B) + \cos(A + B)]$$

**Example:** Evaluate $\int \sin 5x \cos 3x \, dx$

**Solution:**

Apply the product-to-sum identity:
$$\int \sin 5x \cos 3x \, dx = \int \frac{1}{2}[\sin(5x - 3x) + \sin(5x + 3x)] \, dx$$

$$= \frac{1}{2}\int (\sin 2x + \sin 8x) \, dx$$

$$= \frac{1}{2}\left(-\frac{\cos 2x}{2} - \frac{\cos 8x}{8}\right) + C$$

$$= -\frac{\cos 2x}{4} - \frac{\cos 8x}{16} + C$$

## Powers of Tangent and Secant

Integrals involving tangent and secant also follow specific patterns.

### Powers of Tangent

Use the identity $\tan^2 x = \sec^2 x - 1$:

**Example:** Evaluate $\int \tan^2 x \, dx$

**Solution:**

$$\int \tan^2 x \, dx = \int (\sec^2 x - 1) \, dx = \tan x - x + C$$

**Example:** Evaluate $\int \tan^3 x \, dx$

**Solution:**

$$\int \tan^3 x \, dx = \int \tan x \cdot \tan^2 x \, dx = \int \tan x(\sec^2 x - 1) \, dx$$

$$= \int \tan x \sec^2 x \, dx - \int \tan x \, dx$$

For the first integral, let $u = \tan x$, $du = \sec^2 x \, dx$:
$$\int \tan x \sec^2 x \, dx = \int u \, du = \frac{u^2}{2} = \frac{\tan^2 x}{2}$$

For the second integral:
$$\int \tan x \, dx = \int \frac{\sin x}{\cos x} \, dx = -\ln|\cos x| + C = \ln|\sec x| + C$$

Combine:
$$\int \tan^3 x \, dx = \frac{\tan^2 x}{2} - \ln|\sec x| + C$$

### Powers of Secant

**If the power of secant is even:**

1. Save a factor of $\sec^2 x$ (to pair with $dx$)
2. Convert remaining even power to tangents using $\sec^2 x = 1 + \tan^2 x$
3. Substitute $u = \tan x$, $du = \sec^2 x \, dx$

**Example:** Evaluate $\int \sec^4 x \, dx$

**Solution:**

$$\int \sec^4 x \, dx = \int \sec^2 x \cdot \sec^2 x \, dx = \int (1 + \tan^2 x)\sec^2 x \, dx$$

Substitute $u = \tan x$, $du = \sec^2 x \, dx$:
$$\int (1 + u^2) \, du = u + \frac{u^3}{3} + C = \tan x + \frac{\tan^3 x}{3} + C$$

**If the power of secant is odd:**

Use integration by parts or reduction formulas. The basic case is:
$$\int \sec x \, dx = \ln|\sec x + \tan x| + C$$

### Mixed Tangent and Secant

**If the power of tangent is odd and the power of secant is even:**

1. Save a factor of $\sec x \tan x$ (derivative of $\sec x$)
2. Convert remaining factors to secants
3. Substitute $u = \sec x$

**Example:** Evaluate $\int \tan^3 x \sec^3 x \, dx$

**Solution:**

Save $\sec x \tan x$:
$$\int \tan^3 x \sec^3 x \, dx = \int \tan^2 x \sec^2 x (\sec x \tan x) \, dx$$

$$= \int (\sec^2 x - 1)\sec^2 x (\sec x \tan x) \, dx$$

Substitute $u = \sec x$, $du = \sec x \tan x \, dx$:
$$\int (u^2 - 1)u^2 \, du = \int (u^4 - u^2) \, du$$

$$= \frac{u^5}{5} - \frac{u^3}{3} + C = \frac{\sec^5 x}{5} - \frac{\sec^3 x}{3} + C$$

## Reduction Formulas

For high powers, **reduction formulas** express $\int \sin^n x \, dx$ or $\int \cos^n x \, dx$ in terms of lower powers.

**Sine reduction formula:**
$$\int \sin^n x \, dx = -\frac{1}{n}\sin^{n-1}x \cos x + \frac{n-1}{n}\int \sin^{n-2}x \, dx$$

**Cosine reduction formula:**
$$\int \cos^n x \, dx = \frac{1}{n}\cos^{n-1}x \sin x + \frac{n-1}{n}\int \cos^{n-2}x \, dx$$

**Example:** Use the reduction formula to find $\int \sin^4 x \, dx$

**Solution:**

Apply with $n = 4$:
$$\int \sin^4 x \, dx = -\frac{1}{4}\sin^3 x \cos x + \frac{3}{4}\int \sin^2 x \, dx$$

We know from earlier:
$$\int \sin^2 x \, dx = \frac{x}{2} - \frac{\sin 2x}{4}$$

Therefore:
$$\int \sin^4 x \, dx = -\frac{1}{4}\sin^3 x \cos x + \frac{3}{4}\left(\frac{x}{2} - \frac{\sin 2x}{4}\right) + C$$

$$= -\frac{1}{4}\sin^3 x \cos x + \frac{3x}{8} - \frac{3\sin 2x}{16} + C$$

## Summary

- **Odd powers of sine or cosine:** Save one factor, convert the rest, substitute
- **Even powers:** Use half-angle identities
- **Products with different arguments:** Use product-to-sum formulas
- **Powers of tangent:** Use $\tan^2 x = \sec^2 x - 1$
- **Powers of secant:** Save $\sec^2 x$ for even powers, use reduction for odd powers
- **Mixed tangent/secant:** Save $\sec x \tan x$ when tangent power is odd
- **Reduction formulas:** Systematically reduce high powers to base cases
