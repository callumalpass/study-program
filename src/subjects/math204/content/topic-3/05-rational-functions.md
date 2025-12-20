# Integrating Rational Functions

Rational functions—quotients of polynomials—appear everywhere in calculus, from rates of change to probability distributions. While some rational integrals can be solved with simple substitution, many require sophisticated algebraic manipulation before integration techniques can be applied. This section explores the complete toolkit for handling rational functions: determining whether they're proper or improper, performing polynomial long division, and using techniques like completing the square to expose standard integral forms.

## Proper vs. Improper Rational Functions

A rational function has the form:
$$\frac{P(x)}{Q(x)}$$
where $P(x)$ and $Q(x)$ are polynomials.

**Definitions:**
- **Proper:** degree of $P(x)$ < degree of $Q(x)$
- **Improper:** degree of $P(x)$ ≥ degree of $Q(x)$

**Examples:**

Proper: $\frac{2x + 1}{x^2 + 4}$ (degree 1 < degree 2)

Improper: $\frac{x^3 - 2x}{x^2 + 1}$ (degree 3 > degree 2)

Improper: $\frac{x^2 + 3x + 1}{x^2 - 4}$ (degree 2 = degree 2)

**Why it matters:** Many integration techniques (particularly partial fractions) require proper rational functions. Improper functions must be simplified using long division first.

## Polynomial Long Division

When you have an improper rational function, polynomial long division converts it to:
$$\frac{P(x)}{Q(x)} = q(x) + \frac{r(x)}{Q(x)}$$

where:
- $q(x)$ is the quotient (a polynomial)
- $\frac{r(x)}{Q(x)}$ is the remainder term (always proper)

The quotient $q(x)$ is easy to integrate (it's just a polynomial), and the remainder can be handled with other techniques.

### Example 1: Basic Long Division

Simplify $\frac{x^3 + 2x^2 - x + 1}{x^2 + 1}$

**Solution:**

Perform long division:

```
           x + 2
      _______________
x² + 1 | x³ + 2x² - x + 1
         x³      + x
         _______________
              2x² - 2x + 1
              2x²      + 2
              _______________
                   -2x - 1
```

Therefore:
$$\frac{x^3 + 2x^2 - x + 1}{x^2 + 1} = x + 2 + \frac{-2x - 1}{x^2 + 1}$$

Now integrate:
$$\int \frac{x^3 + 2x^2 - x + 1}{x^2 + 1} \, dx = \int \left(x + 2 + \frac{-2x - 1}{x^2 + 1}\right) \, dx$$

$$= \frac{x^2}{2} + 2x + \int \frac{-2x - 1}{x^2 + 1} \, dx$$

For the remaining integral, split it:
$$\int \frac{-2x - 1}{x^2 + 1} \, dx = \int \frac{-2x}{x^2 + 1} \, dx + \int \frac{-1}{x^2 + 1} \, dx$$

First part (substitute $u = x^2 + 1$):
$$\int \frac{-2x}{x^2 + 1} \, dx = -\ln(x^2 + 1)$$

Second part:
$$\int \frac{-1}{x^2 + 1} \, dx = -\arctan x$$

**Final answer:**
$$\int \frac{x^3 + 2x^2 - x + 1}{x^2 + 1} \, dx = \frac{x^2}{2} + 2x - \ln(x^2 + 1) - \arctan x + C$$

### Example 2: Equal Degrees

Evaluate $\int \frac{x^2 + 4}{x^2 - 4} \, dx$

**Solution:**

The degrees are equal (both 2), so this is improper. Perform long division:

```
           1
      _______________
x² - 4 | x² + 4
         x² - 4
         _______________
              8
```

Therefore:
$$\frac{x^2 + 4}{x^2 - 4} = 1 + \frac{8}{x^2 - 4}$$

Now integrate:
$$\int \frac{x^2 + 4}{x^2 - 4} \, dx = \int 1 \, dx + \int \frac{8}{x^2 - 4} \, dx$$

$$= x + 8\int \frac{1}{x^2 - 4} \, dx$$

Factor the denominator and use partial fractions:
$$\frac{1}{x^2 - 4} = \frac{1}{(x - 2)(x + 2)} = \frac{A}{x - 2} + \frac{B}{x + 2}$$

Solving: $1 = A(x + 2) + B(x - 2)$

$x = 2$: $1 = 4A \Rightarrow A = \frac{1}{4}$

$x = -2$: $1 = -4B \Rightarrow B = -\frac{1}{4}$

$$\int \frac{1}{x^2 - 4} \, dx = \frac{1}{4}\ln|x - 2| - \frac{1}{4}\ln|x + 2| + C = \frac{1}{4}\ln\left|\frac{x - 2}{x + 2}\right| + C$$

**Final answer:**
$$\int \frac{x^2 + 4}{x^2 - 4} \, dx = x + 2\ln\left|\frac{x - 2}{x + 2}\right| + C$$

## Completing the Square

When the denominator is a quadratic that doesn't factor over the reals, **completing the square** transforms it into a form amenable to standard integral formulas or trigonometric substitution.

### The Process

For $ax^2 + bx + c$:

1. Factor out the leading coefficient: $a\left(x^2 + \frac{b}{a}x + \frac{c}{a}\right)$
2. Complete the square: $a\left[\left(x + \frac{b}{2a}\right)^2 + \left(\frac{c}{a} - \frac{b^2}{4a^2}\right)\right]$
3. Simplify to the form $a[(x + h)^2 + k^2]$ or $a[(x + h)^2 - k^2]$

### Example 3: Arctangent Form

Evaluate $\int \frac{1}{x^2 + 6x + 13} \, dx$

**Solution:**

Complete the square in the denominator:
$$x^2 + 6x + 13 = (x + 3)^2 + 4$$

The integral becomes:
$$\int \frac{1}{(x + 3)^2 + 4} \, dx$$

Substitute $u = x + 3$, $du = dx$:
$$\int \frac{1}{u^2 + 4} \, du = \int \frac{1}{u^2 + 2^2} \, du$$

Use the standard formula $\int \frac{1}{u^2 + a^2} \, du = \frac{1}{a}\arctan\left(\frac{u}{a}\right) + C$:

$$= \frac{1}{2}\arctan\left(\frac{u}{2}\right) + C = \frac{1}{2}\arctan\left(\frac{x + 3}{2}\right) + C$$

### Example 4: Logarithm Form

Evaluate $\int \frac{3x + 5}{x^2 + 4x + 5} \, dx$

**Solution:**

Complete the square in the denominator:
$$x^2 + 4x + 5 = (x + 2)^2 + 1$$

For the numerator, we want to express $3x + 5$ in a form that works well with this denominator. Notice that the derivative of $(x + 2)^2 + 1$ is $2(x + 2) = 2x + 4$.

Rewrite the numerator:
$$3x + 5 = \frac{3}{2}(2x + 4) - 1$$

So:
$$\int \frac{3x + 5}{x^2 + 4x + 5} \, dx = \int \frac{\frac{3}{2}(2x + 4) - 1}{(x + 2)^2 + 1} \, dx$$

Split:
$$= \frac{3}{2}\int \frac{2x + 4}{(x + 2)^2 + 1} \, dx - \int \frac{1}{(x + 2)^2 + 1} \, dx$$

**First integral:** Let $u = (x + 2)^2 + 1$, $du = 2(x + 2) \, dx = (2x + 4) \, dx$:
$$\frac{3}{2}\int \frac{1}{u} \, du = \frac{3}{2}\ln|u| = \frac{3}{2}\ln(x^2 + 4x + 5)$$

**Second integral:**
$$\int \frac{1}{(x + 2)^2 + 1} \, dx = \arctan(x + 2)$$

**Final answer:**
$$\int \frac{3x + 5}{x^2 + 4x + 5} \, dx = \frac{3}{2}\ln(x^2 + 4x + 5) - \arctan(x + 2) + C$$

## General Strategy for Rational Functions

1. **Check if proper or improper**
   - If improper, use polynomial long division

2. **Factor the denominator completely**
   - Look for common factors
   - Factor quadratics if possible
   - Identify irreducible quadratics

3. **For proper fractions with factored denominators:**
   - Use partial fraction decomposition

4. **For irreducible quadratics:**
   - Complete the square
   - Look for logarithm forms (numerator is derivative of denominator)
   - Look for arctangent forms (constant numerator)
   - Split linear numerators into derivative part + constant part

5. **Integrate each piece**

## Example 5: Complete Workflow

Evaluate $\int \frac{x^3 + x^2 - x + 2}{x^2 + 2x + 2} \, dx$

**Solution:**

**Step 1:** Check if proper. Degree of numerator (3) > degree of denominator (2), so it's improper. Use long division:

```
           x - 1
      _______________
x² + 2x + 2 | x³ + x² - x + 2
              x³ + 2x² + 2x
              _______________
                  -x² - 3x + 2
                  -x² - 2x - 2
                  _______________
                       -x + 4
```

So:
$$\frac{x^3 + x^2 - x + 2}{x^2 + 2x + 2} = x - 1 + \frac{-x + 4}{x^2 + 2x + 2}$$

**Step 2:** Complete the square in the denominator:
$$x^2 + 2x + 2 = (x + 1)^2 + 1$$

**Step 3:** Handle $\int \frac{-x + 4}{(x + 1)^2 + 1} \, dx$

The derivative of $(x + 1)^2 + 1$ is $2(x + 1)$. Rewrite $-x + 4$:
$$-x + 4 = -\frac{1}{2} \cdot 2(x + 1) + 4.5$$

$$\int \frac{-x + 4}{(x + 1)^2 + 1} \, dx = -\frac{1}{2}\ln((x+1)^2 + 1) + \frac{9}{2}\arctan(x + 1)$$

**Step 4:** Combine all parts:
$$\int \frac{x^3 + x^2 - x + 2}{x^2 + 2x + 2} \, dx = \frac{x^2}{2} - x - \frac{1}{2}\ln(x^2 + 2x + 2) + \frac{9}{2}\arctan(x + 1) + C$$

## Common Mistakes

**Mistake 1: Not checking proper vs. improper first**

Always verify degrees before attempting partial fractions.

**Mistake 2: Errors in polynomial long division**

Double-check by multiplying quotient by divisor and adding remainder.

**Mistake 3: Forgetting to complete the square**

Irreducible quadratics often need this step to reveal standard forms.

**Mistake 4: Not splitting numerators strategically**

When the numerator is linear over an irreducible quadratic, split it into a derivative term and a constant.

## Summary

- Rational functions are proper if numerator degree < denominator degree
- Use polynomial long division for improper fractions
- Completing the square transforms quadratics to standard forms
- Strategy: long division → factoring → partial fractions → complete the square → integrate
- Split linear numerators over quadratics into derivative part + constant part
- Recognize standard forms: $\ln$, $\arctan$, and partial fractions
