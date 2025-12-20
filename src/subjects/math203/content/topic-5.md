## Introduction

Optimization—finding the best possible outcome—is one of the most important applications of calculus. This topic develops systematic strategies for solving optimization problems, from simple geometric problems to complex real-world applications.

**Why This Matters:**
Optimization is everywhere: minimizing material cost in manufacturing, maximizing profit in business, finding the most efficient algorithm runtime, optimizing machine learning models, designing structures with maximum strength, or finding the optimal dosage in medicine. The techniques you learn here apply across all quantitative fields.

**Learning Objectives:**
- Translate word problems into mathematical optimization problems
- Identify the objective function and constraint equations
- Use calculus to find optimal values
- Verify that solutions are maxima or minima
- Handle both open and closed domain problems
- Apply optimization to geometric and applied problems

---

## Core Concepts

### The Optimization Framework

Every optimization problem has these components:

1. **Objective Function:** What you want to maximize or minimize (e.g., area, cost, profit)
2. **Constraint(s):** Limitations on the variables (e.g., fixed perimeter, budget limit)
3. **Domain:** Valid range for variables (often implied by physical constraints)

### General Strategy

**Step 1: Understand the Problem**
- Read carefully; identify what's being optimized
- Draw a diagram if geometric
- Define variables with clear meanings

**Step 2: Set Up the Mathematical Model**
- Write the objective function $Q = f(x, y, ...)$
- Write constraint equation(s)
- Use constraints to express objective in terms of one variable

**Step 3: Find Critical Points**
- Take the derivative of the objective function
- Set $\frac{dQ}{dx} = 0$ and solve

**Step 4: Determine the Optimum**
- Closed interval: Compare critical points and endpoints
- Open interval: Use first or second derivative test
- Verify the answer makes sense in context

### Closed Interval Method

For finding absolute extrema of $f$ on $[a, b]$:

1. Find all critical points in $(a, b)$
2. Evaluate $f$ at critical points and at endpoints $a$, $b$
3. The largest value is the absolute maximum
4. The smallest value is the absolute minimum

### Open Interval Optimization

When the domain is open (no endpoints):

- Use the **First Derivative Test** or **Second Derivative Test**
- If there's only one critical point and the function behavior forces an extremum, that critical point gives the absolute extremum

**First Derivative Test for Absolute Extrema:**
If $f'$ changes from positive to negative at $c$ and $c$ is the only critical point on an interval, then $f(c)$ is the absolute maximum.

**Second Derivative Test:**
If $c$ is the only critical point and $f''(c) > 0$, then $f(c)$ is the absolute minimum.
If $c$ is the only critical point and $f''(c) < 0$, then $f(c)$ is the absolute maximum.

---

## Classic Problem Types

### Geometric Optimization

**Example: Maximum Area Rectangle with Fixed Perimeter**

A farmer has 100 meters of fencing. What dimensions maximize the enclosed rectangular area?

**Setup:**
- Variables: $x$ = length, $y$ = width
- Objective: Maximize $A = xy$
- Constraint: $2x + 2y = 100$, so $y = 50 - x$

**Solve:**
$$A(x) = x(50 - x) = 50x - x^2$$
$$A'(x) = 50 - 2x = 0$$
$$x = 25$$

Therefore $y = 50 - 25 = 25$ (a square).
Maximum area: $A = 25 \times 25 = 625$ m²

**Verify:** $A''(x) = -2 < 0$, confirming maximum.

### Distance Optimization

**Example: Closest Point on a Line**

Find the point on the line $y = 2x + 1$ closest to the point $(4, 0)$.

**Setup:**
- Point on line: $(x, 2x + 1)$
- Distance: $D = \sqrt{(x-4)^2 + (2x+1)^2}$
- Minimize $D^2 = (x-4)^2 + (2x+1)^2$ (easier to work with)

**Solve:**
$$D^2 = x^2 - 8x + 16 + 4x^2 + 4x + 1 = 5x^2 - 4x + 17$$
$$\frac{d(D^2)}{dx} = 10x - 4 = 0$$
$$x = \frac{2}{5}$$

Point: $\left(\frac{2}{5}, \frac{9}{5}\right)$

### Container Optimization

**Example: Minimum Material for a Box**

Design an open-top box with volume 32 cm³ using minimum material. The base is square.

**Setup:**
- Variables: $x$ = base side, $h$ = height
- Objective: Minimize surface area $S = x^2 + 4xh$
- Constraint: $x^2 h = 32$, so $h = \frac{32}{x^2}$

**Solve:**
$$S(x) = x^2 + 4x \cdot \frac{32}{x^2} = x^2 + \frac{128}{x}$$
$$S'(x) = 2x - \frac{128}{x^2} = 0$$
$$2x = \frac{128}{x^2}$$
$$x^3 = 64$$
$$x = 4$$

Therefore $h = \frac{32}{16} = 2$.
Dimensions: $4 \times 4 \times 2$ cm.

**Verify:** $S''(x) = 2 + \frac{256}{x^3}$, and $S''(4) = 2 + 4 = 6 > 0$, confirming minimum.

### Economics Applications

**Example: Maximum Profit**

A company's profit function is $P(x) = -2x^2 + 100x - 800$ where $x$ is units produced. Find the production level that maximizes profit.

**Solve:**
$$P'(x) = -4x + 100 = 0$$
$$x = 25$$

Maximum profit: $P(25) = -2(625) + 2500 - 800 = 450$

**Verify:** $P''(x) = -4 < 0$, confirming maximum.

### Cost Minimization

**Example: Optimal Inventory Ordering**

Annual demand is $D$ units. Each order costs $K$ dollars, and holding one unit for a year costs $h$ dollars. Find the optimal order quantity $Q$ (Economic Order Quantity).

Total cost: $C(Q) = \frac{KD}{Q} + \frac{hQ}{2}$
(ordering cost + holding cost)

$$C'(Q) = -\frac{KD}{Q^2} + \frac{h}{2} = 0$$
$$\frac{KD}{Q^2} = \frac{h}{2}$$
$$Q^2 = \frac{2KD}{h}$$
$$Q^* = \sqrt{\frac{2KD}{h}}$$

This is the famous **EOQ formula**.

---

## Special Techniques

### When Constraint Gives Two Equations

Sometimes you have two variables and the constraint gives one equation. Substitute to get a single-variable objective.

### Optimization with Multiple Constraints

If you have multiple constraints, you may need to solve a system. Sometimes Lagrange multipliers (covered in multivariable calculus) are more efficient.

### Implicit Constraints

Physical constraints like $x > 0$, $h > 0$, or $x < L$ define the domain. Make sure your solution satisfies these.

### Checking Reasonableness

Always verify:
- Does the answer satisfy constraints?
- Are dimensions positive/meaningful?
- Does the extremum make physical sense?

---

## Common Mistakes and Debugging

### Mistake 1: Not Expressing in One Variable
The objective function must be in terms of one variable before differentiating. Use constraints to eliminate extra variables.

### Mistake 2: Forgetting Domain Restrictions
If $x$ represents a length, then $x > 0$. Check that your critical point is in the valid domain.

### Mistake 3: Finding the Wrong Extremum
Read the problem: are you maximizing or minimizing? Double-check with the second derivative or boundary analysis.

### Mistake 4: Not Verifying the Answer
A critical point might not be in the domain, or might give a minimum when you want a maximum. Always verify.

### Mistake 5: Algebra Errors in Setup
The most common source of errors is in setting up the equations. Double-check your formulas for perimeter, area, volume, etc.

---

## Best Practices

1. **Draw a picture** for geometric problems
2. **Label all quantities** with variables
3. **Write equations before simplifying** — clarity first
4. **Express everything in one variable** before differentiating
5. **Identify domain explicitly** — what are valid values?
6. **Verify using the second derivative** or endpoint analysis
7. **Check units and reasonableness** of your answer
8. **State your answer in context** — "The optimal dimensions are..."

---

## Summary

- **Optimization = Maximize or Minimize** an objective function
- **Constraints** relate variables and reduce the problem to one variable
- **Critical points** where $f' = 0$ are candidates for extrema
- **Closed interval:** Compare critical points and endpoints
- **Open interval:** Use derivative tests, especially if only one critical point
- **Classic problems:** Geometry (area, volume), distance, cost, profit
- **Always verify** your solution satisfies constraints and is the right type of extremum

---

## Further Exploration

- **Lagrange Multipliers:** Optimization with constraints in multivariable calculus
- **Linear Programming:** Optimization with linear constraints
- **Calculus of Variations:** Optimizing functionals (functions of functions)
- **Numerical Optimization:** Gradient descent, Newton's method for computers
