# Derivatives of Trigonometric Functions

Trigonometric functions appear throughout calculus, physics, and engineering. Their derivatives have elegant patterns that are worth memorizing.

## Basic Trigonometric Derivatives

$$\frac{d}{dx}[\sin x] = \cos x$$

$$\frac{d}{dx}[\cos x] = -\sin x$$

Note the negative sign for cosine!

## Proof from the Limit Definition

For $\frac{d}{dx}[\sin x]$:

$$\frac{d}{dx}[\sin x] = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h}$$

Using the angle addition formula $\sin(x+h) = \sin x \cos h + \cos x \sin h$:

$$= \lim_{h \to 0} \frac{\sin x \cos h + \cos x \sin h - \sin x}{h}$$

$$= \lim_{h \to 0} \frac{\sin x(\cos h - 1) + \cos x \sin h}{h}$$

$$= \sin x \cdot \lim_{h \to 0} \frac{\cos h - 1}{h} + \cos x \cdot \lim_{h \to 0} \frac{\sin h}{h}$$

$$= \sin x \cdot 0 + \cos x \cdot 1 = \cos x$$

## Other Trigonometric Derivatives

From sine and cosine, we can derive the others using quotient rule:

$$\frac{d}{dx}[\tan x] = \sec^2 x$$

**Derivation:** $\tan x = \frac{\sin x}{\cos x}$

$$\frac{d}{dx}\left[\frac{\sin x}{\cos x}\right] = \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^2 x} = \frac{\cos^2 x + \sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x} = \sec^2 x$$

$$\frac{d}{dx}[\cot x] = -\csc^2 x$$

$$\frac{d}{dx}[\sec x] = \sec x \tan x$$

**Derivation:** $\sec x = \frac{1}{\cos x} = (\cos x)^{-1}$

Using chain rule:
$$= -(\cos x)^{-2} \cdot (-\sin x) = \frac{\sin x}{\cos^2 x} = \frac{1}{\cos x} \cdot \frac{\sin x}{\cos x} = \sec x \tan x$$

$$\frac{d}{dx}[\csc x] = -\csc x \cot x$$

## Summary Table

| Function | Derivative |
|----------|------------|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x \tan x$ |
| $\csc x$ | $-\csc x \cot x$ |

**Memory aids:**
- The "co" functions (cos, cot, csc) have negative derivatives
- Derivatives of sec and csc involve themselves

## With the Chain Rule

For $\sin(u)$ where $u$ is a function of $x$:

$$\frac{d}{dx}[\sin(g(x))] = \cos(g(x)) \cdot g'(x)$$

**Example:** $\frac{d}{dx}[\sin(3x)] = \cos(3x) \cdot 3 = 3\cos(3x)$

**Example:** $\frac{d}{dx}[\cos(x^2)] = -\sin(x^2) \cdot 2x = -2x\sin(x^2)$

**Example:** $\frac{d}{dx}[\tan(5x)] = \sec^2(5x) \cdot 5 = 5\sec^2(5x)$

## Powers of Trig Functions

Use chain rule for powers:

$$\frac{d}{dx}[\sin^n x] = n\sin^{n-1} x \cdot \cos x$$

**Example:** $\frac{d}{dx}[\sin^3 x] = 3\sin^2 x \cdot \cos x$

**Example:** $\frac{d}{dx}[\cos^4(2x)] = 4\cos^3(2x) \cdot (-\sin(2x)) \cdot 2 = -8\cos^3(2x)\sin(2x)$

## Combined Examples

**Example 1:** $\frac{d}{dx}[x\sin x]$

Product rule:
$$= 1 \cdot \sin x + x \cdot \cos x = \sin x + x\cos x$$

**Example 2:** $\frac{d}{dx}\left[\frac{\sin x}{x}\right]$

Quotient rule:
$$= \frac{\cos x \cdot x - \sin x \cdot 1}{x^2} = \frac{x\cos x - \sin x}{x^2}$$

**Example 3:** $\frac{d}{dx}[e^x \sin x]$

Product rule:
$$= e^x \sin x + e^x \cos x = e^x(\sin x + \cos x)$$

**Example 4:** $\frac{d}{dx}[\sin(\cos x)]$

Chain rule (outer: sin, inner: cos):
$$= \cos(\cos x) \cdot (-\sin x) = -\sin x \cos(\cos x)$$

## Higher Derivatives of Sine and Cosine

The derivatives of sine and cosine cycle with period 4:

| $n$ | $\frac{d^n}{dx^n}[\sin x]$ | $\frac{d^n}{dx^n}[\cos x]$ |
|-----|---------------------------|---------------------------|
| 0 | $\sin x$ | $\cos x$ |
| 1 | $\cos x$ | $-\sin x$ |
| 2 | $-\sin x$ | $-\cos x$ |
| 3 | $-\cos x$ | $\sin x$ |
| 4 | $\sin x$ | $\cos x$ |

**Pattern:** $\frac{d^n}{dx^n}[\sin x] = \sin\left(x + \frac{n\pi}{2}\right)$

## Trigonometric Identities for Simplification

Sometimes identities help before or after differentiating:

- $\sin^2 x + \cos^2 x = 1$
- $1 + \tan^2 x = \sec^2 x$
- $1 + \cot^2 x = \csc^2 x$
- $\sin(2x) = 2\sin x \cos x$
- $\cos(2x) = \cos^2 x - \sin^2 x$

**Example:** Simplify $\frac{d}{dx}[\sin x \cos x]$

Method 1: Product rule gives $\cos^2 x - \sin^2 x = \cos(2x)$

Method 2: Rewrite first as $\frac{1}{2}\sin(2x)$, then differentiate: $\frac{1}{2} \cdot 2\cos(2x) = \cos(2x)$ ✓

## Summary

- Know the six basic trig derivatives
- "Co" functions have negative signs
- Apply chain rule for compositions: $\frac{d}{dx}[\sin(g(x))] = \cos(g(x)) \cdot g'(x)$
- Powers of trig functions use chain rule too
- Derivatives of sin/cos cycle with period 4
- Trig identities can simplify calculations
