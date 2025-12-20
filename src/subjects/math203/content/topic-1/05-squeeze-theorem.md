---
id: math203-t1-squeeze
title: "The Squeeze Theorem"
order: 5
---

# The Squeeze Theorem

Some limits are difficult to evaluate directly because the function oscillates or has complicated behavior. The Squeeze Theorem (also called the Sandwich Theorem or Pinching Theorem) provides a powerful technique for these cases by "trapping" a function between two simpler functions.

## Statement of the Squeeze Theorem

If $g(x) \leq f(x) \leq h(x)$ for all $x$ near $a$ (except possibly at $a$ itself), and:

$$\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L$$

Then:

$$\lim_{x \to a} f(x) = L$$

**Intuition:** If $f$ is squeezed between $g$ and $h$, and both $g$ and $h$ approach the same value $L$, then $f$ has nowhere else to go except to $L$ as well.

## The Key Inequality for Trig Functions

The most important application uses the bounds on sine and cosine:

$$-1 \leq \sin(\theta) \leq 1$$
$$-1 \leq \cos(\theta) \leq 1$$

for any value of $\theta$.

## Classic Example: $\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right)$

Direct substitution gives $0 \cdot \sin(\text{undefined})$, which is problematic. And $\sin(1/x)$ oscillates wildly as $x \to 0$.

**Setup the squeeze:**

Since $-1 \leq \sin(1/x) \leq 1$, multiply all parts by $x^2$ (which is non-negative):

$$-x^2 \leq x^2 \sin(1/x) \leq x^2$$

**Evaluate the bounds:**

$$\lim_{x \to 0} (-x^2) = 0$$
$$\lim_{x \to 0} x^2 = 0$$

**Apply Squeeze Theorem:**

Since both bounds approach 0:

$$\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right) = 0$$

The oscillation is "tamed" by the $x^2$ factor, which shrinks to zero.

## Example: $\lim_{x \to \infty} \frac{\sin x}{x}$

The sine function oscillates between $-1$ and $1$ forever, so $\frac{\sin x}{x}$ doesn't settle. But we can squeeze it.

**Setup:**

$$-1 \leq \sin x \leq 1$$

For $x > 0$, divide by $x$:

$$-\frac{1}{x} \leq \frac{\sin x}{x} \leq \frac{1}{x}$$

**Evaluate bounds:**

$$\lim_{x \to \infty} \left(-\frac{1}{x}\right) = 0$$
$$\lim_{x \to \infty} \frac{1}{x} = 0$$

**Conclusion:**

$$\lim_{x \to \infty} \frac{\sin x}{x} = 0$$

## Example: $\lim_{x \to 0} x \cos\left(\frac{1}{x^2}\right)$

**Setup:**

$$-1 \leq \cos(1/x^2) \leq 1$$

Multiply by $|x|$. For $x$ near 0, we can write:

$$-|x| \leq x \cos(1/x^2) \leq |x|$$

(This works because when $x > 0$, $x \cos(1/x^2)$ is between $-x$ and $x$, and similarly for $x < 0$.)

**Evaluate bounds:**

$$\lim_{x \to 0} (-|x|) = 0$$
$$\lim_{x \to 0} |x| = 0$$

**Conclusion:**

$$\lim_{x \to 0} x \cos\left(\frac{1}{x^2}\right) = 0$$

## Proving the Fundamental Trig Limit

The Squeeze Theorem is used to prove that $\lim_{\theta \to 0} \frac{\sin \theta}{\theta} = 1$.

**Geometric argument (for $0 < \theta < \frac{\pi}{2}$):**

Consider a unit circle. For a small angle $\theta$:
- Area of inner triangle: $\frac{1}{2} \sin \theta$
- Area of circular sector: $\frac{1}{2} \theta$
- Area of outer triangle: $\frac{1}{2} \tan \theta$

These areas satisfy:
$$\frac{1}{2} \sin \theta \leq \frac{1}{2} \theta \leq \frac{1}{2} \tan \theta$$

Multiply by $\frac{2}{\sin \theta}$ (positive for small positive $\theta$):
$$1 \leq \frac{\theta}{\sin \theta} \leq \frac{1}{\cos \theta}$$

Take reciprocals (reversing inequalities):
$$\cos \theta \leq \frac{\sin \theta}{\theta} \leq 1$$

As $\theta \to 0^+$, $\cos \theta \to 1$ and $1 \to 1$.

By Squeeze Theorem: $\lim_{\theta \to 0^+} \frac{\sin \theta}{\theta} = 1$

A similar argument works for $\theta \to 0^-$, giving $\lim_{\theta \to 0} \frac{\sin \theta}{\theta} = 1$.

## When to Use the Squeeze Theorem

Consider the Squeeze Theorem when:

1. **Oscillating functions:** $\sin$, $\cos$ multiplied by something approaching 0
2. **Bounded functions:** Any function known to stay between fixed bounds
3. **Products of bounded and vanishing terms:** Like $x \cdot (\text{bounded})$ as $x \to 0$
4. **Direct methods fail:** Can't factor, rationalize, or use L'Hôpital

## Common Squeeze Bounds

- $-1 \leq \sin(\text{anything}) \leq 1$
- $-1 \leq \cos(\text{anything}) \leq 1$
- $0 \leq \sin^2(\text{anything}) \leq 1$
- $0 \leq |\sin(\text{anything})| \leq 1$
- For integers: $x - 1 < \lfloor x \rfloor \leq x$

## Summary

- The Squeeze Theorem traps a function between two bounds approaching the same limit
- Most useful for oscillating or bounded functions multiplied by vanishing terms
- Key inequality: $-1 \leq \sin(\theta), \cos(\theta) \leq 1$
- Used to prove fundamental limits like $\lim_{\theta \to 0} \frac{\sin \theta}{\theta} = 1$
- Look for opportunities when standard techniques don't apply
