# The Substitution Method

Basic integration rules handle simple functions, but what about $\int 2x\cos(x^2) \, dx$ or $\int \frac{x}{\sqrt{x^2+1}} \, dx$? These don't fit standard formulas. The substitution method—also called $u$-substitution—is integration's version of the chain rule. It transforms complicated integrals into simpler ones by recognizing hidden patterns.

## The Chain Rule in Reverse

Recall the chain rule for derivatives:
$$\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$$

Reversing this gives us the substitution formula:
$$\int f'(g(x)) \cdot g'(x) \, dx = f(g(x)) + C$$

In practice, we make a substitution $u = g(x)$, find $du = g'(x) \, dx$, and transform the integral into one involving $u$.

## The Substitution Method: Step by Step

**Strategy:**
1. **Identify the inner function:** Choose $u = g(x)$ (usually the "inside" of a composition)
2. **Compute $du$:** Find $du = g'(x) \, dx$
3. **Substitute:** Replace all $x$-terms with $u$-terms
4. **Integrate:** Solve the simpler integral in terms of $u$
5. **Back-substitute:** Replace $u$ with $g(x)$ to get the answer in terms of $x$

## Example 1: Basic Substitution

**Problem:** $\int 2x \cos(x^2) \, dx$

**Solution:**

Step 1: Let $u = x^2$ (the inner function)

Step 2: Then $du = 2x \, dx$

Step 3: Substitute:
$$\int 2x \cos(x^2) \, dx = \int \cos(u) \, du$$

Step 4: Integrate:
$$\int \cos(u) \, du = \sin(u) + C$$

Step 5: Back-substitute:
$$\sin(u) + C = \sin(x^2) + C$$

**Verification:** $\frac{d}{dx}[\sin(x^2)] = \cos(x^2) \cdot 2x$ ✓

## Example 2: Adjusting Constants

**Problem:** $\int x^2 e^{x^3} \, dx$

**Solution:**

Let $u = x^3$, then $du = 3x^2 \, dx$

Notice we have $x^2 \, dx$ but need $3x^2 \, dx$. We can adjust:
$$x^2 \, dx = \frac{1}{3}(3x^2 \, dx) = \frac{1}{3} du$$

Substitute:
$$\int x^2 e^{x^3} \, dx = \int e^u \cdot \frac{1}{3} du = \frac{1}{3}\int e^u \, du$$

Integrate:
$$= \frac{1}{3}e^u + C$$

Back-substitute:
$$= \frac{1}{3}e^{x^3} + C$$

**Key Insight:** Constants can be adjusted, but you can only substitute for $dx$ if the necessary factor appears (possibly up to a constant multiple).

## Example 3: Algebraic Manipulation

**Problem:** $\int \frac{x}{\sqrt{x^2 + 1}} \, dx$

**Solution:**

Let $u = x^2 + 1$, then $du = 2x \, dx$, so $x \, dx = \frac{1}{2} du$

Substitute:
$$\int \frac{x}{\sqrt{x^2 + 1}} \, dx = \int \frac{1}{\sqrt{u}} \cdot \frac{1}{2} du = \frac{1}{2}\int u^{-1/2} \, du$$

Integrate:
$$= \frac{1}{2} \cdot \frac{u^{1/2}}{1/2} + C = \frac{1}{2} \cdot 2u^{1/2} + C = u^{1/2} + C = \sqrt{u} + C$$

Back-substitute:
$$= \sqrt{x^2 + 1} + C$$

## Example 4: Trigonometric Substitution

**Problem:** $\int \sin^3(x) \cos(x) \, dx$

**Solution:**

Let $u = \sin(x)$, then $du = \cos(x) \, dx$

Substitute:
$$\int \sin^3(x) \cos(x) \, dx = \int u^3 \, du$$

Integrate:
$$= \frac{u^4}{4} + C$$

Back-substitute:
$$= \frac{\sin^4(x)}{4} + C$$

**Pattern:** When you have $\sin^n(x) \cos(x)$ or $\cos^n(x) \sin(x)$, substitute $u = \sin(x)$ or $u = \cos(x)$.

## Example 5: Logarithmic Forms

**Problem:** $\int \frac{2x + 1}{x^2 + x + 5} \, dx$

**Solution:**

Notice the numerator is almost the derivative of the denominator:
$$\frac{d}{dx}(x^2 + x + 5) = 2x + 1$$

Let $u = x^2 + x + 5$, then $du = (2x + 1) \, dx$

Substitute:
$$\int \frac{2x + 1}{x^2 + x + 5} \, dx = \int \frac{1}{u} \, du$$

Integrate:
$$= \ln|u| + C$$

Back-substitute:
$$= \ln|x^2 + x + 5| + C$$

Since $x^2 + x + 5 = (x + \frac{1}{2})^2 + \frac{19}{4} > 0$ always, the absolute value is unnecessary:
$$= \ln(x^2 + x + 5) + C$$

**Pattern:** When you see $\frac{f'(x)}{f(x)}$, the integral is $\ln|f(x)| + C$.

## Definite Integrals and Substitution

For definite integrals, you have two options:

**Option 1: Change the limits** (stay in terms of $u$)

$$\int_a^b f(g(x)) g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du$$

**Option 2: Back-substitute** (evaluate in terms of $x$)

Find the antiderivative in terms of $u$, substitute back to $x$, then evaluate at the original limits.

### Example 6: Definite Integral with Changed Limits

**Problem:** $\int_0^2 x(x^2 + 1)^5 \, dx$

**Solution (Option 1):**

Let $u = x^2 + 1$, then $du = 2x \, dx$, so $x \, dx = \frac{1}{2} du$

Change limits:
- When $x = 0$: $u = 0^2 + 1 = 1$
- When $x = 2$: $u = 2^2 + 1 = 5$

Substitute:
$$\int_0^2 x(x^2 + 1)^5 \, dx = \int_1^5 u^5 \cdot \frac{1}{2} \, du = \frac{1}{2}\int_1^5 u^5 \, du$$

Integrate:
$$= \frac{1}{2} \left[\frac{u^6}{6}\right]_1^5 = \frac{1}{12}[u^6]_1^5 = \frac{1}{12}(5^6 - 1^6) = \frac{1}{12}(15625 - 1) = \frac{15624}{12} = 1302$$

## Recognizing When to Use Substitution

**Look for these patterns:**

1. **Composite functions:** Something inside something else, like $\sin(x^2)$, $e^{3x}$, $(x^2 + 1)^{10}$

2. **The derivative is present:** You see $f(g(x))$ and $g'(x)$ appears (possibly with a constant factor)

3. **Logarithmic form:** $\frac{f'(x)}{f(x)}$ integrates to $\ln|f(x)|$

4. **Chain rule pattern:** Could this have come from differentiating using the chain rule?

**Examples of good substitution candidates:**

| Integral | Substitution |
|----------|--------------|
| $\int 2x e^{x^2} \, dx$ | $u = x^2$ |
| $\int \cos(3x) \, dx$ | $u = 3x$ |
| $\int \frac{\ln(x)}{x} \, dx$ | $u = \ln(x)$ |
| $\int x\sqrt{x^2 + 1} \, dx$ | $u = x^2 + 1$ |
| $\int \tan(x) \, dx = \int \frac{\sin(x)}{\cos(x)} \, dx$ | $u = \cos(x)$ |

## When Substitution Doesn't Work

Not every integral yields to substitution. Consider:

$$\int x \cos(x) \, dx$$

No obvious substitution works because $x$ and $\cos(x)$ aren't composed—they're multiplied. This requires **integration by parts** (a future topic).

$$\int e^{x^2} \, dx$$

Even though this looks like a substitution problem, it has no elementary antiderivative. It requires special functions.

**Rule of thumb:** Substitution works when the integrand is (or can be manipulated into) the form $f(g(x)) \cdot g'(x)$.

## Common Mistakes

**Mistake 1: Forgetting $dx$**

Wrong: Let $u = x^2$, $du = 2x$

Right: Let $u = x^2$, $du = 2x \, dx$

The $dx$ is crucial—it tells you what to substitute for.

**Mistake 2: Incomplete substitution**

$$\int 2x\sqrt{x^2 + 1} \, dx$$

Wrong: Let $u = x^2 + 1$, so $\int 2x\sqrt{u} \, dx$ (still has $x$ and $dx$!)

Right: $du = 2x \, dx$, so $\int \sqrt{u} \, du$

**Mistake 3: Not adjusting constants**

$$\int x e^{x^2} \, dx$$

Wrong: Let $u = x^2$, $du = 2x \, dx$, so $\int e^u \, du$ (the $2$ is missing!)

Right: $x \, dx = \frac{1}{2} du$, so $\int e^u \cdot \frac{1}{2} \, du = \frac{1}{2}e^u + C$

**Mistake 4: Wrong limits on definite integrals**

When changing variables, you must change the limits too, or back-substitute before evaluating.

## Strategy Guide

**To choose $u$:**
1. Look for an "inner function" (something inside parentheses, exponent, etc.)
2. Check if its derivative appears elsewhere in the integrand
3. The substitution should simplify the integral, not complicate it

**After substituting:**
1. The integral should have only $u$ and $du$ (no $x$ or $dx$)
2. It should be simpler than the original
3. If not, try a different substitution

**Practice pattern recognition:**
- $\int f'(x) [f(x)]^n \, dx \implies u = f(x)$
- $\int f'(x) e^{f(x)} \, dx \implies u = f(x)$
- $\int \frac{f'(x)}{f(x)} \, dx \implies u = f(x)$, answer is $\ln|f(x)| + C$

## Summary

- **Substitution** reverses the chain rule: it undoes composition
- **Choose $u$** as the inner function whose derivative appears in the integrand
- **Compute $du$** and solve for the differential that appears
- **Substitute completely**: eliminate all traces of $x$ and $dx$
- **Integrate** the simpler $u$-integral
- **Back-substitute** to express the answer in terms of $x$
- For **definite integrals**, either change the limits or back-substitute before evaluating
- **Verify** by differentiating your answer

Substitution is your most powerful integration technique. It handles a vast array of integrals that don't match basic formulas. Combined with algebraic manipulation and pattern recognition, it extends your integration capabilities far beyond elementary rules. Master substitution, and you'll be able to tackle the majority of integrals you encounter in calculus.
