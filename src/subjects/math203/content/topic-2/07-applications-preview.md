---
id: math203-t2-applications-preview
title: "Applications of the Derivative: A Preview"
order: 7
---

# Applications of the Derivative: A Preview

Now that we understand what derivatives are and how to compute them using the limit definition, let's preview the powerful applications that await. This subtopic connects the theoretical foundation to the practical tools we'll develop throughout the course.

## The Derivative as a Tool

The derivative $f'(x)$ answers the fundamental question: *How fast is $f(x)$ changing at each point?* This simple idea unlocks an extraordinary range of applications across mathematics, science, and engineering.

### What Derivatives Tell Us

| What We Know | What We Can Determine |
|--------------|----------------------|
| $f'(x) > 0$ | Function is increasing |
| $f'(x) < 0$ | Function is decreasing |
| $f'(x) = 0$ | Possible maximum or minimum |
| $f''(x) > 0$ | Concave up (curves upward) |
| $f''(x) < 0$ | Concave down (curves downward) |

### Example: Population Growth

A bacteria population grows according to $P(t) = 1000e^{0.5t}$ where $t$ is in hours.

The derivative tells us the instantaneous growth rate:
$$P'(t) = 1000 \cdot 0.5 e^{0.5t} = 500e^{0.5t}$$

At $t = 0$: $P'(0) = 500$ bacteria per hour
At $t = 2$: $P'(2) = 500e^1 \approx 1359$ bacteria per hour

The derivative reveals that the growth rate itself increases over time—the population grows faster and faster.

## Finding Maximum and Minimum Values

One of the most important applications is optimization: finding where a function reaches its largest or smallest values.

### The Key Insight

At a maximum or minimum point where the function is smooth, the tangent line must be horizontal. This means:

$$f'(c) = 0 \text{ at maximum/minimum points}$$

Points where $f'(x) = 0$ are called **critical points**.

### Example: Maximizing Revenue

A company finds that if they price their product at $p$ dollars, they'll sell $q = 1000 - 20p$ units. Revenue is:
$$R(p) = p \cdot q = p(1000 - 20p) = 1000p - 20p^2$$

To maximize revenue:
$$R'(p) = 1000 - 40p = 0$$
$$p = 25$$

At $p = 25$, revenue is $R(25) = 1000(25) - 20(625) = 12500$ dollars.

We can verify this is indeed a maximum by checking that $R'(p)$ changes from positive to negative at $p = 25$, or by noting $R''(p) = -40 < 0$ (concave down means local maximum).

## Analyzing Motion

For an object moving along a line with position $s(t)$, derivatives reveal everything about its motion:

- **Velocity:** $v(t) = s'(t)$ (rate of change of position)
- **Speed:** $|v(t)|$ (magnitude of velocity)
- **Acceleration:** $a(t) = v'(t) = s''(t)$ (rate of change of velocity)

### Example: Projectile Motion

A ball thrown upward has position $s(t) = 64t - 16t^2$ feet after $t$ seconds.

**Velocity:** $v(t) = s'(t) = 64 - 32t$

**When is the ball stationary?** When $v(t) = 0$:
$$64 - 32t = 0 \implies t = 2 \text{ seconds}$$

**Maximum height:** $s(2) = 64(2) - 16(4) = 64$ feet

**Acceleration:** $a(t) = v'(t) = -32$ ft/s² (constant, due to gravity)

The negative acceleration indicates the ball is constantly slowing while rising, then speeding up while falling.

## Related Rates: Connected Changes

When two quantities are related by an equation, their rates of change are also related. This leads to **related rates** problems.

### Preview Example: Expanding Circle

A circular oil spill expands so its radius grows at 2 meters per minute. How fast is the area increasing when the radius is 10 meters?

**Relationship:** $A = \pi r^2$

**Differentiate with respect to time:**
$$\frac{dA}{dt} = 2\pi r \frac{dr}{dt}$$

**Substitute values:** $r = 10$, $\frac{dr}{dt} = 2$
$$\frac{dA}{dt} = 2\pi(10)(2) = 40\pi \approx 125.7 \text{ m}^2/\text{min}$$

This technique—differentiating a relationship to find how rates connect—is the foundation of related rates.

## Curve Sketching

Derivatives provide the information needed to accurately sketch function graphs without plotting many points.

### Information from Derivatives

From $f'(x)$:
- Where is the function increasing? (Where $f' > 0$)
- Where is it decreasing? (Where $f' < 0$)
- Where are the peaks and valleys? (Where $f' = 0$ or undefined)

From $f''(x)$:
- Where does the graph curve upward? (Where $f'' > 0$)
- Where does it curve downward? (Where $f'' < 0$)
- Where are the inflection points? (Where $f''$ changes sign)

### Example: Sketching $f(x) = x^3 - 3x$

**First derivative:** $f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$

Critical points: $x = -1$ and $x = 1$

| Interval | Sign of $f'$ | Behavior |
|----------|--------------|----------|
| $x < -1$ | positive | increasing |
| $-1 < x < 1$ | negative | decreasing |
| $x > 1$ | positive | increasing |

Local maximum at $x = -1$: $f(-1) = 2$
Local minimum at $x = 1$: $f(1) = -2$

**Second derivative:** $f''(x) = 6x$

Concave down for $x < 0$, concave up for $x > 0$. Inflection point at $(0, 0)$.

## Linear Approximation

The tangent line provides the best linear approximation to a function near a point:

$$f(x) \approx f(a) + f'(a)(x - a) \text{ for } x \text{ near } a$$

### Example: Approximating $\sqrt{4.1}$

Let $f(x) = \sqrt{x}$, $a = 4$, so $f(a) = 2$ and $f'(a) = \frac{1}{2\sqrt{4}} = 0.25$.

$$\sqrt{4.1} \approx 2 + 0.25(4.1 - 4) = 2 + 0.025 = 2.025$$

Actual value: $\sqrt{4.1} \approx 2.0248...$  The linear approximation is remarkably accurate!

## What's Coming Next

The topics ahead develop these applications systematically:

| Topic | Focus |
|-------|-------|
| Differentiation Rules | Efficient techniques to find $f'(x)$ |
| Applications of Derivatives | Finding extrema, analyzing shapes |
| Optimization | Real-world max/min problems |
| Related Rates | Connected quantities changing together |
| Curve Sketching | Complete graph analysis |

Each application rests on the foundation we've built: understanding the derivative as a limit, interpreting it as a rate of change, and computing it from first principles.

## Summary

- Derivatives reveal increasing/decreasing behavior, concavity, and extrema
- Critical points ($f' = 0$) identify potential maxima and minima
- Motion analysis uses $s'(t) = v(t)$ and $v'(t) = a(t)$
- Related rates connect derivatives of related quantities
- Linear approximation uses tangent lines for estimation
- Curve sketching combines all derivative information
- These applications motivate the differentiation rules we'll learn next
