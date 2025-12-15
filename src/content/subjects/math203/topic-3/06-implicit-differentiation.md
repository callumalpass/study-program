# Implicit Differentiation

Not every relationship between $x$ and $y$ can be written as $y = f(x)$. When the relationship is given implicitly (both variables mixed together in an equation), we need a technique called implicit differentiation.

## Explicit vs. Implicit Functions

**Explicit:** $y$ is isolated on one side
- $y = x^2 + 3x$
- $y = \sqrt{1 - x^2}$

**Implicit:** $x$ and $y$ are mixed together
- $x^2 + y^2 = 25$ (circle)
- $x^3 + y^3 = 6xy$ (folium of Descartes)
- $xy + y^2 = 1$

Some implicit equations can be solved for $y$, but often it's difficult or impossible.

## The Technique

To find $\frac{dy}{dx}$ from an implicit equation:

1. **Differentiate both sides** with respect to $x$
2. **Treat $y$ as a function of $x$**: use chain rule when differentiating terms involving $y$
3. **Solve for $\frac{dy}{dx}$**

**Key insight:** When differentiating $y^n$ with respect to $x$, use chain rule:
$$\frac{d}{dx}[y^n] = ny^{n-1} \cdot \frac{dy}{dx}$$

## Example 1: Circle

Find $\frac{dy}{dx}$ for $x^2 + y^2 = 25$.

**Step 1:** Differentiate both sides with respect to $x$:
$$\frac{d}{dx}[x^2] + \frac{d}{dx}[y^2] = \frac{d}{dx}[25]$$

$$2x + 2y\frac{dy}{dx} = 0$$

**Step 2:** Solve for $\frac{dy}{dx}$:
$$2y\frac{dy}{dx} = -2x$$
$$\frac{dy}{dx} = -\frac{x}{y}$$

**Interpretation:** The slope at any point $(x, y)$ on the circle is $-\frac{x}{y}$.

At $(3, 4)$: slope $= -\frac{3}{4}$
At $(3, -4)$: slope $= -\frac{3}{-4} = \frac{3}{4}$

## Example 2: Product of Variables

Find $\frac{dy}{dx}$ for $xy = 6$.

Differentiate using product rule on $xy$:
$$\frac{d}{dx}[xy] = \frac{d}{dx}[6]$$
$$1 \cdot y + x \cdot \frac{dy}{dx} = 0$$
$$\frac{dy}{dx} = -\frac{y}{x}$$

## Example 3: Mixed Terms

Find $\frac{dy}{dx}$ for $x^2 + xy + y^2 = 7$.

Differentiate term by term:
- $\frac{d}{dx}[x^2] = 2x$
- $\frac{d}{dx}[xy] = y + x\frac{dy}{dx}$ (product rule)
- $\frac{d}{dx}[y^2] = 2y\frac{dy}{dx}$ (chain rule)
- $\frac{d}{dx}[7] = 0$

Equation becomes:
$$2x + y + x\frac{dy}{dx} + 2y\frac{dy}{dx} = 0$$

Collect $\frac{dy}{dx}$ terms:
$$(x + 2y)\frac{dy}{dx} = -2x - y$$

$$\frac{dy}{dx} = \frac{-2x - y}{x + 2y}$$

## Example 4: Powers of y

Find $\frac{dy}{dx}$ for $y^3 + y = x$.

Differentiate:
$$3y^2\frac{dy}{dx} + \frac{dy}{dx} = 1$$

Factor out $\frac{dy}{dx}$:
$$\frac{dy}{dx}(3y^2 + 1) = 1$$

$$\frac{dy}{dx} = \frac{1}{3y^2 + 1}$$

## Example 5: Trigonometric Functions

Find $\frac{dy}{dx}$ for $\sin(xy) = y$.

Differentiate (chain rule on left side, with product rule inside):
$$\cos(xy) \cdot \frac{d}{dx}[xy] = \frac{dy}{dx}$$

$$\cos(xy) \cdot \left(y + x\frac{dy}{dx}\right) = \frac{dy}{dx}$$

$$y\cos(xy) + x\cos(xy)\frac{dy}{dx} = \frac{dy}{dx}$$

$$y\cos(xy) = \frac{dy}{dx} - x\cos(xy)\frac{dy}{dx}$$

$$y\cos(xy) = \frac{dy}{dx}(1 - x\cos(xy))$$

$$\frac{dy}{dx} = \frac{y\cos(xy)}{1 - x\cos(xy)}$$

## Finding Tangent Lines

**Example:** Find the tangent line to $x^2 + y^2 = 25$ at $(3, 4)$.

We found $\frac{dy}{dx} = -\frac{x}{y}$.

At $(3, 4)$: slope $= -\frac{3}{4}$

Tangent line: $y - 4 = -\frac{3}{4}(x - 3)$

Or: $y = -\frac{3}{4}x + \frac{25}{4}$

## Second Derivatives

You can find $\frac{d^2y}{dx^2}$ by differentiating $\frac{dy}{dx}$ again, using implicit differentiation if needed.

**Example:** For $x^2 + y^2 = 25$, find $\frac{d^2y}{dx^2}$.

We have $\frac{dy}{dx} = -\frac{x}{y}$.

Differentiate using quotient rule:
$$\frac{d^2y}{dx^2} = -\frac{1 \cdot y - x \cdot \frac{dy}{dx}}{y^2} = -\frac{y - x(-\frac{x}{y})}{y^2} = -\frac{y + \frac{x^2}{y}}{y^2}$$

$$= -\frac{\frac{y^2 + x^2}{y}}{y^2} = -\frac{y^2 + x^2}{y^3} = -\frac{25}{y^3}$$

(using $x^2 + y^2 = 25$)

## Common Mistakes

1. **Forgetting $\frac{dy}{dx}$ when differentiating $y$ terms:**
   Wrong: $\frac{d}{dx}[y^2] = 2y$
   Correct: $\frac{d}{dx}[y^2] = 2y\frac{dy}{dx}$

2. **Not using product rule when needed:**
   For $xy$, you need product rule: $y + x\frac{dy}{dx}$

3. **Algebra errors when solving for $\frac{dy}{dx}$**

## Summary

- Use implicit differentiation when $y$ isn't isolated
- Differentiate both sides with respect to $x$
- Apply chain rule to terms involving $y$: $\frac{d}{dx}[f(y)] = f'(y) \cdot \frac{dy}{dx}$
- Solve algebraically for $\frac{dy}{dx}$
- The result may involve both $x$ and $y$
- Useful for curves that can't be expressed as $y = f(x)$
