---
id: math204-t3-trig-sub
title: "Trigonometric Substitution"
order: 3
---

# Trigonometric Substitution

Trigonometric substitution is a powerful technique for evaluating integrals containing certain radical expressions. The method leverages Pythagorean identities to transform algebraic expressions involving square roots into trigonometric expressions that can be integrated using standard techniques. While it may seem counterintuitive to make an integral more complicated by introducing trigonometric functions, the technique elegantly eliminates radicals that would otherwise be intractable.

## The Core Idea

Trigonometric substitution works because the Pythagorean identities relate squares of trigonometric functions in ways that mirror common radical forms:

- $\sin^2\theta + \cos^2\theta = 1$
- $1 + \tan^2\theta = \sec^2\theta$
- $\sec^2\theta - 1 = \tan^2\theta$

By choosing appropriate substitutions, we can transform expressions like $\sqrt{a^2 - x^2}$ into forms involving $\cos\theta$ or $\sin\theta$, which are easier to integrate.

The following visualization shows the three key functions that arise from completing the square in integrals:

```plot
{
  "xAxis": { "domain": [-4, 4], "label": "x" },
  "yAxis": { "domain": [-0.5, 5], "label": "y" },
  "data": [
    { "fn": "sqrt(9 - x^2)", "color": "#8b5cf6", "title": "√(9−x²)" },
    { "fn": "sqrt(4 + x^2)", "color": "#22c55e", "title": "√(4+x²)" }
  ]
}
```

## The Three Standard Forms

### Form 1: $\sqrt{a^2 - x^2}$

**Substitution:** $x = a\sin\theta$, where $-\frac{\pi}{2} \leq \theta \leq \frac{\pi}{2}$

**Why it works:**
$$\sqrt{a^2 - x^2} = \sqrt{a^2 - a^2\sin^2\theta} = \sqrt{a^2(1 - \sin^2\theta)} = \sqrt{a^2\cos^2\theta} = a|\cos\theta| = a\cos\theta$$

(The absolute value disappears because $\cos\theta \geq 0$ on $[-\frac{\pi}{2}, \frac{\pi}{2}]$)

**Don't forget:** $dx = a\cos\theta \, d\theta$

**Example:** Evaluate $\int \frac{1}{\sqrt{9 - x^2}} \, dx$

**Solution:**

Here $a = 3$, so substitute $x = 3\sin\theta$, $dx = 3\cos\theta \, d\theta$:

$$\int \frac{1}{\sqrt{9 - x^2}} \, dx = \int \frac{1}{\sqrt{9 - 9\sin^2\theta}} \cdot 3\cos\theta \, d\theta$$

$$= \int \frac{3\cos\theta}{3\cos\theta} \, d\theta = \int 1 \, d\theta = \theta + C$$

Convert back to $x$: Since $x = 3\sin\theta$, we have $\sin\theta = \frac{x}{3}$, so $\theta = \arcsin\left(\frac{x}{3}\right)$

$$\int \frac{1}{\sqrt{9 - x^2}} \, dx = \arcsin\left(\frac{x}{3}\right) + C$$

### Form 2: $\sqrt{a^2 + x^2}$

**Substitution:** $x = a\tan\theta$, where $-\frac{\pi}{2} < \theta < \frac{\pi}{2}$

**Why it works:**
$$\sqrt{a^2 + x^2} = \sqrt{a^2 + a^2\tan^2\theta} = \sqrt{a^2(1 + \tan^2\theta)} = \sqrt{a^2\sec^2\theta} = a|\sec\theta| = a\sec\theta$$

(Since $\sec\theta > 0$ on $(-\frac{\pi}{2}, \frac{\pi}{2})$)

**Don't forget:** $dx = a\sec^2\theta \, d\theta$

**Example:** Evaluate $\int \frac{1}{x^2\sqrt{x^2 + 4}} \, dx$

**Solution:**

Here $a = 2$, so substitute $x = 2\tan\theta$, $dx = 2\sec^2\theta \, d\theta$:

$$\sqrt{x^2 + 4} = \sqrt{4\tan^2\theta + 4} = 2\sec\theta$$

$$\int \frac{1}{x^2\sqrt{x^2 + 4}} \, dx = \int \frac{1}{4\tan^2\theta \cdot 2\sec\theta} \cdot 2\sec^2\theta \, d\theta$$

$$= \int \frac{2\sec^2\theta}{8\tan^2\theta\sec\theta} \, d\theta = \frac{1}{4}\int \frac{\sec\theta}{\tan^2\theta} \, d\theta$$

$$= \frac{1}{4}\int \frac{1}{\cos\theta} \cdot \frac{\cos^2\theta}{\sin^2\theta} \, d\theta = \frac{1}{4}\int \frac{\cos\theta}{\sin^2\theta} \, d\theta$$

Substitute $u = \sin\theta$, $du = \cos\theta \, d\theta$:
$$= \frac{1}{4}\int \frac{1}{u^2} \, du = \frac{1}{4} \cdot \left(-\frac{1}{u}\right) + C = -\frac{1}{4\sin\theta} + C$$

Convert back: From $x = 2\tan\theta$, we can draw a right triangle with opposite side $x$, adjacent side 2, and hypotenuse $\sqrt{x^2 + 4}$.

Thus $\sin\theta = \frac{x}{\sqrt{x^2 + 4}}$

$$\int \frac{1}{x^2\sqrt{x^2 + 4}} \, dx = -\frac{1}{4} \cdot \frac{\sqrt{x^2 + 4}}{x} + C = -\frac{\sqrt{x^2 + 4}}{4x} + C$$

### Form 3: $\sqrt{x^2 - a^2}$

**Substitution:** $x = a\sec\theta$, where $0 \leq \theta < \frac{\pi}{2}$ or $\pi \leq \theta < \frac{3\pi}{2}$

**Why it works:**
$$\sqrt{x^2 - a^2} = \sqrt{a^2\sec^2\theta - a^2} = \sqrt{a^2(\sec^2\theta - 1)} = \sqrt{a^2\tan^2\theta} = a|\tan\theta| = a\tan\theta$$

(With appropriate choice of $\theta$ range)

**Don't forget:** $dx = a\sec\theta\tan\theta \, d\theta$

**Example:** Evaluate $\int \sqrt{x^2 - 25} \, dx$ for $x > 5$

**Solution:**

Here $a = 5$, so substitute $x = 5\sec\theta$, $dx = 5\sec\theta\tan\theta \, d\theta$:

$$\sqrt{x^2 - 25} = \sqrt{25\sec^2\theta - 25} = 5\tan\theta$$

$$\int \sqrt{x^2 - 25} \, dx = \int 5\tan\theta \cdot 5\sec\theta\tan\theta \, d\theta$$

$$= 25\int \tan^2\theta\sec\theta \, d\theta = 25\int (\sec^2\theta - 1)\sec\theta \, d\theta$$

$$= 25\int (\sec^3\theta - \sec\theta) \, d\theta$$

Using known formulas:
$$\int \sec^3\theta \, d\theta = \frac{1}{2}(\sec\theta\tan\theta + \ln|\sec\theta + \tan\theta|)$$
$$\int \sec\theta \, d\theta = \ln|\sec\theta + \tan\theta|$$

$$= 25\left[\frac{1}{2}(\sec\theta\tan\theta + \ln|\sec\theta + \tan\theta|) - \ln|\sec\theta + \tan\theta|\right] + C$$

$$= 25\left[\frac{1}{2}\sec\theta\tan\theta - \frac{1}{2}\ln|\sec\theta + \tan\theta|\right] + C$$

$$= \frac{25}{2}(\sec\theta\tan\theta - \ln|\sec\theta + \tan\theta|) + C$$

Convert back: From $x = 5\sec\theta$, we have $\sec\theta = \frac{x}{5}$ and $\tan\theta = \frac{\sqrt{x^2-25}}{5}$

$$= \frac{25}{2}\left(\frac{x}{5} \cdot \frac{\sqrt{x^2-25}}{5} - \ln\left|\frac{x}{5} + \frac{\sqrt{x^2-25}}{5}\right|\right) + C$$

$$= \frac{x\sqrt{x^2-25}}{2} - \frac{25}{2}\ln\left|\frac{x + \sqrt{x^2-25}}{5}\right| + C$$

## Reference Triangles

Converting back from $\theta$ to $x$ is easiest using **reference triangles**. For each substitution, draw a right triangle that represents the relationship:

**For $x = a\sin\theta$:**
- Opposite side: $x$
- Hypotenuse: $a$
- Adjacent side: $\sqrt{a^2 - x^2}$ (by Pythagorean theorem)

**For $x = a\tan\theta$:**
- Opposite side: $x$
- Adjacent side: $a$
- Hypotenuse: $\sqrt{x^2 + a^2}$

**For $x = a\sec\theta$:**
- Hypotenuse: $x$
- Adjacent side: $a$
- Opposite side: $\sqrt{x^2 - a^2}$

From these triangles, you can read off any trigonometric function of $\theta$ in terms of $x$.

## Completing the Square

Sometimes the radical doesn't immediately match one of the three forms. **Completing the square** transforms it:

**Example:** Evaluate $\int \frac{1}{\sqrt{x^2 + 4x + 13}} \, dx$

**Solution:**

Complete the square:
$$x^2 + 4x + 13 = (x + 2)^2 + 9$$

$$\int \frac{1}{\sqrt{x^2 + 4x + 13}} \, dx = \int \frac{1}{\sqrt{(x + 2)^2 + 9}} \, dx$$

Substitute $u = x + 2$, $du = dx$:
$$= \int \frac{1}{\sqrt{u^2 + 9}} \, du$$

Now use trig substitution: $u = 3\tan\theta$, $du = 3\sec^2\theta \, d\theta$:
$$= \int \frac{1}{3\sec\theta} \cdot 3\sec^2\theta \, d\theta = \int \sec\theta \, d\theta$$

$$= \ln|\sec\theta + \tan\theta| + C$$

Convert back: $\tan\theta = \frac{u}{3}$, $\sec\theta = \frac{\sqrt{u^2 + 9}}{3}$:
$$= \ln\left|\frac{\sqrt{u^2 + 9}}{3} + \frac{u}{3}\right| + C = \ln\left|\frac{\sqrt{u^2 + 9} + u}{3}\right| + C$$

$$= \ln\left|\sqrt{u^2 + 9} + u\right| - \ln 3 + C$$

Absorb $-\ln 3$ into the constant and substitute back $u = x + 2$:
$$= \ln\left|\sqrt{(x+2)^2 + 9} + (x + 2)\right| + C$$

$$= \ln\left|\sqrt{x^2 + 4x + 13} + x + 2\right| + C$$

## Common Mistakes

**Mistake 1: Forgetting $dx = \ldots d\theta$**

Always substitute for $dx$, not just for $x$.

**Mistake 2: Sign errors with absolute values**

When taking square roots, be careful about which quadrants make the result positive.

**Mistake 3: Not converting back to $x$**

Your final answer must be in terms of the original variable unless working with definite integrals.

**Mistake 4: Using the wrong substitution**

Match the radical form carefully: $a^2 - x^2$ uses sine, $a^2 + x^2$ uses tangent, $x^2 - a^2$ uses secant.

## Summary

- Trigonometric substitution eliminates radicals using Pythagorean identities
- $\sqrt{a^2 - x^2}$: use $x = a\sin\theta$
- $\sqrt{a^2 + x^2}$: use $x = a\tan\theta$
- $\sqrt{x^2 - a^2}$: use $x = a\sec\theta$
- Draw reference triangles to convert back to $x$
- Complete the square when necessary to match standard forms
- Always substitute both $x$ and $dx$
