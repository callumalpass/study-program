## Introduction

Computing derivatives from the limit definition is tedious. Fortunately, mathematicians have developed rules that make differentiation mechanical. This topic covers the essential differentiation rules that let you find derivatives quickly and reliably.

**Why This Matters:**
These rules are the tools you'll use constantly in applied mathematics, physics, engineering, economics, and computer science. Whether computing gradients for optimization, analyzing circuit behavior, or finding marginal functions in economics, you need fluent differentiation skills.

**Learning Objectives:**
- Apply the power rule to polynomial and rational functions
- Use the product and quotient rules correctly
- Master the chain rule for composite functions
- Differentiate exponential and logarithmic functions
- Differentiate trigonometric and inverse trigonometric functions
- Combine multiple rules in complex expressions

---

## Core Concepts

### Basic Rules

**Constant Rule:**
$$\frac{d}{dx}[c] = 0$$

**Power Rule:**
$$\frac{d}{dx}[x^n] = nx^{n-1}$$
Works for all real $n$, not just positive integers.

**Constant Multiple Rule:**
$$\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)$$

**Sum/Difference Rule:**
$$\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)$$

### Product Rule

For the product of two functions:
$$\frac{d}{dx}[f(x) \cdot g(x)] = f'(x) \cdot g(x) + f(x) \cdot g'(x)$$

**Mnemonic:** "First times derivative of second plus second times derivative of first"

**Example:**
$$\frac{d}{dx}[x^2 \sin x] = 2x \sin x + x^2 \cos x$$

### Quotient Rule

For the quotient of two functions:
$$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}$$

**Mnemonic:** "Low d-high minus high d-low, over low squared"

**Example:**
$$\frac{d}{dx}\left[\frac{x^2}{x+1}\right] = \frac{2x(x+1) - x^2(1)}{(x+1)^2} = \frac{x^2 + 2x}{(x+1)^2}$$

### Chain Rule

For composite functions $f(g(x))$:
$$\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$$

**Leibniz notation:** If $y = f(u)$ and $u = g(x)$:
$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

**Example:**
$$\frac{d}{dx}[(3x+1)^5] = 5(3x+1)^4 \cdot 3 = 15(3x+1)^4$$

**Example:**
$$\frac{d}{dx}[\sin(x^2)] = \cos(x^2) \cdot 2x = 2x\cos(x^2)$$

### Exponential Functions

**Natural Exponential:**
$$\frac{d}{dx}[e^x] = e^x$$

**General Exponential:**
$$\frac{d}{dx}[a^x] = a^x \ln a$$

**With Chain Rule:**
$$\frac{d}{dx}[e^{g(x)}] = e^{g(x)} \cdot g'(x)$$

### Logarithmic Functions

**Natural Logarithm:**
$$\frac{d}{dx}[\ln x] = \frac{1}{x}$$

**General Logarithm:**
$$\frac{d}{dx}[\log_a x] = \frac{1}{x \ln a}$$

**With Chain Rule:**
$$\frac{d}{dx}[\ln(g(x))] = \frac{g'(x)}{g(x)}$$

### Trigonometric Functions

| Function | Derivative |
|----------|-----------|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x \tan x$ |
| $\csc x$ | $-\csc x \cot x$ |

**Memory Aid:**
- Functions starting with "co" have negative derivatives
- $\sin$ and $\cos$ cycle: $\sin \to \cos \to -\sin \to -\cos \to \sin$

### Inverse Trigonometric Functions

| Function | Derivative |
|----------|-----------|
| $\arcsin x$ | $\frac{1}{\sqrt{1-x^2}}$ |
| $\arccos x$ | $-\frac{1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\frac{1}{1+x^2}$ |
| $\text{arccot } x$ | $-\frac{1}{1+x^2}$ |
| $\text{arcsec } x$ | $\frac{1}{|x|\sqrt{x^2-1}}$ |
| $\text{arccsc } x$ | $-\frac{1}{|x|\sqrt{x^2-1}}$ |

---

## Advanced Techniques

### Logarithmic Differentiation

For products, quotients, and powers, take $\ln$ of both sides first:

**Example:** Find $\frac{dy}{dx}$ for $y = x^x$

$$\ln y = x \ln x$$
$$\frac{1}{y} \cdot \frac{dy}{dx} = \ln x + x \cdot \frac{1}{x} = \ln x + 1$$
$$\frac{dy}{dx} = y(\ln x + 1) = x^x(\ln x + 1)$$

### Implicit Differentiation

When $y$ is defined implicitly by an equation:

**Example:** Find $\frac{dy}{dx}$ for $x^2 + y^2 = 25$

Differentiate both sides with respect to $x$:
$$2x + 2y\frac{dy}{dx} = 0$$
$$\frac{dy}{dx} = -\frac{x}{y}$$

### Multiple Chain Rules

When functions are deeply nested:

**Example:**
$$\frac{d}{dx}[\sin(\cos(x^2))]$$
$$= \cos(\cos(x^2)) \cdot (-\sin(x^2)) \cdot 2x$$
$$= -2x\sin(x^2)\cos(\cos(x^2))$$

Work from outside to inside, multiplying derivatives at each layer.

---

## Common Patterns

### Power of a Function
$$\frac{d}{dx}[u^n] = nu^{n-1} \cdot u'$$

### Exponential of a Function
$$\frac{d}{dx}[e^u] = e^u \cdot u'$$

### Logarithm of a Function
$$\frac{d}{dx}[\ln u] = \frac{u'}{u}$$

### Trig of a Function
$$\frac{d}{dx}[\sin u] = \cos u \cdot u'$$
$$\frac{d}{dx}[\cos u] = -\sin u \cdot u'$$

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting the Chain Rule
$$\frac{d}{dx}[\sin(3x)] \neq \cos(3x)$$
Correct: $\cos(3x) \cdot 3 = 3\cos(3x)$

### Mistake 2: Product vs. Chain
$(fg)' = f'g + fg'$ (product of two functions)
$(f \circ g)' = f'(g) \cdot g'$ (composition of functions)

Know which structure you have!

### Mistake 3: Quotient Rule Sign Error
The quotient rule has a minus: "low d-high **minus** high d-low"

### Mistake 4: Power Rule Only for $x^n$
$\frac{d}{dx}[2^x] \neq x \cdot 2^{x-1}$
For $a^x$: $\frac{d}{dx}[a^x] = a^x \ln a$

### Mistake 5: Derivative of $\ln x$ vs $\ln(f(x))$
$\frac{d}{dx}[\ln x] = \frac{1}{x}$
$\frac{d}{dx}[\ln(f(x))] = \frac{f'(x)}{f(x)}$ (chain rule!)

---

## Best Practices

1. **Identify the outermost operation first**—this determines which rule to apply
2. **Simplify before differentiating** when possible
3. **Use notation consistently**—don't mix $f'$ and $\frac{df}{dx}$ confusingly
4. **Check dimensions/units** in applied problems
5. **Verify by substituting values**—does your derivative seem reasonable?
6. **Practice recognizing patterns**—speed comes from pattern matching

---

## Summary Table of Derivatives

| Function | Derivative | Notes |
|----------|-----------|-------|
| $c$ | $0$ | constant |
| $x^n$ | $nx^{n-1}$ | power rule |
| $e^x$ | $e^x$ | special! |
| $a^x$ | $a^x \ln a$ | exponential |
| $\ln x$ | $1/x$ | natural log |
| $\log_a x$ | $1/(x \ln a)$ | general log |
| $\sin x$ | $\cos x$ | |
| $\cos x$ | $-\sin x$ | |
| $\tan x$ | $\sec^2 x$ | |
| $\arcsin x$ | $1/\sqrt{1-x^2}$ | |
| $\arctan x$ | $1/(1+x^2)$ | |

---

## Summary

- **Power, sum, and constant rules** handle polynomials
- **Product rule:** $(fg)' = f'g + fg'$
- **Quotient rule:** $(f/g)' = (f'g - fg')/g^2$
- **Chain rule:** $(f \circ g)' = f'(g) \cdot g'$ — the most important rule
- **Exponential/log derivatives** require memorization
- **Trig derivatives** form cyclic patterns
- **Logarithmic differentiation** handles products of powers
- **Implicit differentiation** handles equations defining $y$ implicitly

---

## Further Exploration

- **Derivatives of Hyperbolic Functions:** $\sinh$, $\cosh$, $\tanh$ and inverses
- **Higher-Order Derivatives:** Patterns in $n$th derivatives of $e^x$, $\sin x$
- **Parametric Differentiation:** $\frac{dy}{dx}$ when $x$ and $y$ are functions of $t$
- **Differentiation Under the Integral Sign:** Leibniz integral rule
