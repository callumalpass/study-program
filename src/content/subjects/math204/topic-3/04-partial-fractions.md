# Partial Fraction Decomposition

Partial fraction decomposition is an algebraic technique that breaks down a complex rational function into a sum of simpler fractions. Each simpler fraction can be integrated using basic techniques, making this method essential for integrating rational functions. The process reverses the addition of fractions: instead of combining fractions over a common denominator, we decompose a single fraction into components.

## The Basic Idea

Consider adding two simple fractions:
$$\frac{2}{x - 1} + \frac{3}{x + 2} = \frac{2(x + 2) + 3(x - 1)}{(x - 1)(x + 2)} = \frac{5x + 1}{(x - 1)(x + 2)}$$

Partial fraction decomposition runs this process backward: given $\frac{5x + 1}{(x - 1)(x + 2)}$, we want to find that it equals $\frac{2}{x - 1} + \frac{3}{x + 2}$.

Why? Because integrating the decomposed form is trivial:
$$\int \frac{5x + 1}{(x - 1)(x + 2)} \, dx = \int \frac{2}{x - 1} \, dx + \int \frac{3}{x + 2} \, dx = 2\ln|x - 1| + 3\ln|x + 2| + C$$

## Prerequisites: Proper vs. Improper Fractions

A rational function $\frac{P(x)}{Q(x)}$ is **proper** if the degree of $P(x)$ is less than the degree of $Q(x)$.

**Proper:** $\frac{2x + 1}{x^2 - 4}$ (degree 1 < degree 2)

**Improper:** $\frac{x^3 + 2x}{x^2 - 1}$ (degree 3 > degree 2)

**Crucial rule:** Partial fraction decomposition only works on proper fractions.

If your fraction is improper, use **polynomial long division** first to write it as:
$$\frac{P(x)}{Q(x)} = (\text{quotient}) + \frac{\text{remainder}}{Q(x)}$$

The remainder over $Q(x)$ is always proper and can be decomposed.

## The Decomposition Process

### Step 1: Ensure the Fraction is Proper

If improper, perform long division first.

### Step 2: Factor the Denominator Completely

Factor $Q(x)$ into a product of linear and irreducible quadratic factors:
- **Linear factors:** $(x - a)$, $(x + b)$
- **Irreducible quadratic factors:** $ax^2 + bx + c$ where $b^2 - 4ac < 0$ (no real roots)

### Step 3: Set Up the Decomposition

The form depends on the types of factors:

**Case 1: Distinct Linear Factors**

For each factor $(x - a)$, include a term $\frac{A}{x - a}$

**Example:**
$$\frac{3x + 1}{(x - 2)(x + 1)(x - 5)} = \frac{A}{x - 2} + \frac{B}{x + 1} + \frac{C}{x - 5}$$

**Case 2: Repeated Linear Factors**

For a factor $(x - a)^n$, include terms:
$$\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2} + \frac{A_3}{(x - a)^3} + \cdots + \frac{A_n}{(x - a)^n}$$

**Example:**
$$\frac{2x - 1}{(x + 3)^2(x - 1)} = \frac{A}{x + 3} + \frac{B}{(x + 3)^2} + \frac{C}{x - 1}$$

**Case 3: Irreducible Quadratic Factors**

For each irreducible quadratic factor $ax^2 + bx + c$, include:
$$\frac{Ax + B}{ax^2 + bx + c}$$

(Note: the numerator is linear, not constant)

**Example:**
$$\frac{x^2 + 1}{(x - 2)(x^2 + 4)} = \frac{A}{x - 2} + \frac{Bx + C}{x^2 + 4}$$

**Case 4: Repeated Quadratic Factors**

For $(ax^2 + bx + c)^n$, include:
$$\frac{A_1x + B_1}{ax^2 + bx + c} + \frac{A_2x + B_2}{(ax^2 + bx + c)^2} + \cdots + \frac{A_nx + B_n}{(ax^2 + bx + c)^n}$$

### Step 4: Solve for the Coefficients

Multiply both sides by the common denominator $Q(x)$ to clear fractions, then use one of two methods:

**Method 1: Substitution (Heaviside Cover-Up)**

Choose strategic values of $x$ to make terms vanish. This works best for distinct linear factors.

**Method 2: Equating Coefficients**

Expand both sides and match coefficients of like powers of $x$.

## Example 1: Distinct Linear Factors

Evaluate $\int \frac{2x + 1}{x^2 - x - 2} \, dx$

**Solution:**

Factor the denominator:
$$x^2 - x - 2 = (x - 2)(x + 1)$$

Set up decomposition:
$$\frac{2x + 1}{(x - 2)(x + 1)} = \frac{A}{x - 2} + \frac{B}{x + 1}$$

Multiply by $(x - 2)(x + 1)$:
$$2x + 1 = A(x + 1) + B(x - 2)$$

**Method 1 (Substitution):**

Let $x = 2$: $2(2) + 1 = A(3) + B(0) \Rightarrow 5 = 3A \Rightarrow A = \frac{5}{3}$

Let $x = -1$: $2(-1) + 1 = A(0) + B(-3) \Rightarrow -1 = -3B \Rightarrow B = \frac{1}{3}$

Therefore:
$$\frac{2x + 1}{x^2 - x - 2} = \frac{5/3}{x - 2} + \frac{1/3}{x + 1}$$

Integrate:
$$\int \frac{2x + 1}{x^2 - x - 2} \, dx = \frac{5}{3}\ln|x - 2| + \frac{1}{3}\ln|x + 1| + C$$

## Example 2: Repeated Linear Factors

Evaluate $\int \frac{2x + 3}{x^2(x - 1)} \, dx$

**Solution:**

Set up decomposition (note the repeated factor $x^2$):
$$\frac{2x + 3}{x^2(x - 1)} = \frac{A}{x} + \frac{B}{x^2} + \frac{C}{x - 1}$$

Multiply by $x^2(x - 1)$:
$$2x + 3 = Ax(x - 1) + B(x - 1) + Cx^2$$

**Substitution:**

Let $x = 0$: $3 = B(-1) \Rightarrow B = -3$

Let $x = 1$: $5 = C(1) \Rightarrow C = 5$

**Equating coefficients** (expand and match $x^2$ terms):
$$0 = A + C \Rightarrow A = -5$$

Therefore:
$$\frac{2x + 3}{x^2(x - 1)} = \frac{-5}{x} + \frac{-3}{x^2} + \frac{5}{x - 1}$$

Integrate:
$$\int \frac{2x + 3}{x^2(x - 1)} \, dx = -5\ln|x| + \frac{3}{x} + 5\ln|x - 1| + C$$

$$= 5\ln\left|\frac{x - 1}{x}\right| + \frac{3}{x} + C$$

## Example 3: Irreducible Quadratic Factor

Evaluate $\int \frac{x^2 - 2x - 1}{(x - 1)(x^2 + 1)} \, dx$

**Solution:**

Set up decomposition:
$$\frac{x^2 - 2x - 1}{(x - 1)(x^2 + 1)} = \frac{A}{x - 1} + \frac{Bx + C}{x^2 + 1}$$

Multiply by $(x - 1)(x^2 + 1)$:
$$x^2 - 2x - 1 = A(x^2 + 1) + (Bx + C)(x - 1)$$

Let $x = 1$: $1 - 2 - 1 = A(2) \Rightarrow A = -1$

Expand the right side:
$$x^2 - 2x - 1 = Ax^2 + A + Bx^2 - Bx + Cx - C$$
$$= (A + B)x^2 + (-B + C)x + (A - C)$$

Equate coefficients:
- $x^2$: $1 = A + B \Rightarrow B = 2$
- $x^1$: $-2 = -B + C \Rightarrow C = 0$
- $x^0$: $-1 = A - C$ (check: $-1 = -1 - 0$ ✓)

Therefore:
$$\frac{x^2 - 2x - 1}{(x - 1)(x^2 + 1)} = \frac{-1}{x - 1} + \frac{2x}{x^2 + 1}$$

Integrate:
$$\int \frac{x^2 - 2x - 1}{(x - 1)(x^2 + 1)} \, dx = -\ln|x - 1| + \int \frac{2x}{x^2 + 1} \, dx$$

For the second integral, let $u = x^2 + 1$, $du = 2x \, dx$:
$$\int \frac{2x}{x^2 + 1} \, dx = \ln|x^2 + 1| = \ln(x^2 + 1)$$

Final answer:
$$= -\ln|x - 1| + \ln(x^2 + 1) + C = \ln\left|\frac{x^2 + 1}{x - 1}\right| + C$$

## Integrating the Pieces

After decomposition, you'll integrate terms of these types:

**Type 1: $\int \frac{A}{x - a} \, dx = A\ln|x - a| + C$**

**Type 2: $\int \frac{A}{(x - a)^n} \, dx = \frac{A}{(1-n)(x-a)^{n-1}} + C$ for $n \geq 2$**

**Type 3: $\int \frac{Ax + B}{x^2 + bx + c} \, dx$**

Split into two parts:
- Complete the square in the denominator
- Separate into a logarithm part and an arctangent part

## Common Mistakes

**Mistake 1: Skipping long division for improper fractions**

Always check if the fraction is proper first.

**Mistake 2: Wrong form for repeated or quadratic factors**

Repeated factors need multiple terms; quadratic factors need linear numerators.

**Mistake 3: Arithmetic errors when solving for coefficients**

Double-check your algebra carefully.

**Mistake 4: Forgetting absolute values in logarithms**

$\int \frac{1}{x} \, dx = \ln|x| + C$, not $\ln x + C$.

## Summary

- Partial fractions decompose rational functions into simpler pieces
- Only works on proper fractions (use long division if improper)
- Factor the denominator completely first
- Distinct linear factors: $\frac{A}{x - a}$
- Repeated linear factors: $\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2} + \cdots$
- Irreducible quadratics: $\frac{Ax + B}{ax^2 + bx + c}$
- Solve for coefficients using substitution or equating coefficients
- Integrate each piece using standard formulas
