## Introduction

Definite integrals and the Fundamental Theorem of Calculus represent one of the greatest achievements in mathematics. They connect two seemingly unrelated concepts—accumulation and rate of change—into a unified framework. This topic explores how to compute and apply definite integrals, establishing the deep relationship between differentiation and integration.

**Why This Matters:**
Definite integrals are indispensable across science and engineering. They compute physical quantities like displacement from velocity, work from force, total accumulated growth, areas of irregular regions, volumes of solids, arc lengths of curves, and expected values in probability. The Fundamental Theorem of Calculus provides both theoretical insight and computational power, transforming integration from a difficult limiting process into an algebraic procedure using antiderivatives.

**Learning Objectives:**
- Understand Riemann sums and the definition of the definite integral
- Apply properties of definite integrals including linearity and additivity
- Master the Fundamental Theorem of Calculus Parts 1 and 2
- Use FTC to differentiate accumulation functions with variable limits
- Apply the Mean Value Theorem for Integrals and compute average values
- Set up and evaluate integrals for areas between curves
- Use numerical methods including Trapezoidal and Simpson's Rules

---

## Core Concepts

### The Definite Integral

The **definite integral** $\int_a^b f(x) \, dx$ represents the signed area between the curve $y = f(x)$ and the $x$-axis from $x = a$ to $x = b$. It is defined as the limit of Riemann sums:

$$\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x$$

where $\Delta x = \frac{b-a}{n}$ and $x_i^*$ is a sample point in the $i$-th subinterval.

**Key components:**
- **Riemann sums:** Approximate area using rectangles (left, right, midpoint)
- **Limit process:** As rectangles become infinitely narrow, approximation becomes exact
- **Signed area:** Regions above the $x$-axis contribute positively, below contribute negatively

### Properties of Definite Integrals

Definite integrals satisfy important algebraic properties:

**Linearity:**
$$\int_a^b [cf(x) + dg(x)] \, dx = c\int_a^b f(x) \, dx + d\int_a^b g(x) \, dx$$

**Additivity over intervals:**
$$\int_a^b f(x) \, dx + \int_b^c f(x) \, dx = \int_a^c f(x) \, dx$$

**Reversal of limits:**
$$\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$$

**Comparison properties:**
- If $f(x) \leq g(x)$ on $[a,b]$, then $\int_a^b f(x) \, dx \leq \int_a^b g(x) \, dx$
- If $m \leq f(x) \leq M$ on $[a,b]$, then $m(b-a) \leq \int_a^b f(x) \, dx \leq M(b-a)$

**Symmetry:**
- Even functions: $\int_{-a}^a f(x) \, dx = 2\int_0^a f(x) \, dx$
- Odd functions: $\int_{-a}^a f(x) \, dx = 0$

### The Fundamental Theorem of Calculus

The FTC is the cornerstone of integral calculus, revealing that differentiation and integration are inverse operations.

**Part 1 (Differentiation of integrals):**
If $f$ is continuous on $[a,b]$, then:
$$\frac{d}{dx}\int_a^x f(t) \, dt = f(x)$$

The derivative of an accumulation function is the integrand.

**With variable limits:**
$$\frac{d}{dx}\int_a^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x)$$

**Part 2 (Evaluation using antiderivatives):**
If $F$ is any antiderivative of $f$ (i.e., $F'(x) = f(x)$), then:
$$\int_a^b f(x) \, dx = F(b) - F(a)$$

**Net Change Theorem:**
The integral of a rate of change gives the total change:
$$\int_a^b F'(x) \, dx = F(b) - F(a)$$

### Mean Value Theorem for Integrals

For continuous $f$ on $[a,b]$, there exists $c \in [a,b]$ such that:
$$\int_a^b f(x) \, dx = f(c) \cdot (b-a)$$

**Average value:**
$$f_{\text{avg}} = \frac{1}{b-a}\int_a^b f(x) \, dx$$

The MVT guarantees that $f$ attains its average value at some point $c$.

### Area Between Curves

To find the area between curves $f(x)$ and $g(x)$:

**Vertical slicing (with respect to $x$):**
$$A = \int_a^b [f(x) - g(x)] \, dx \quad \text{where } f(x) \geq g(x)$$

**Horizontal slicing (with respect to $y$):**
$$A = \int_c^d [g(y) - h(y)] \, dy \quad \text{where } g(y) \geq h(y)$$

**Strategy:**
1. Sketch the region
2. Find intersection points
3. Choose integration direction (vertical or horizontal)
4. Identify upper/lower (or right/left) functions
5. Set up and evaluate integral

### Numerical Integration

When antiderivatives are unavailable or integrals involve data points, numerical methods approximate $\int_a^b f(x) \, dx$.

**Trapezoidal Rule:**
$$T_n = \frac{\Delta x}{2}[f(x_0) + 2f(x_1) + 2f(x_2) + \cdots + 2f(x_{n-1}) + f(x_n)]$$

Error: $O(1/n^2)$

**Simpson's Rule (requires even $n$):**
$$S_n = \frac{\Delta x}{3}[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \cdots + 4f(x_{n-1}) + f(x_n)]$$

Error: $O(1/n^4)$ — much more accurate!

Pattern: coefficients are 1, 4, 2, 4, 2, ..., 4, 1

---

## Common Patterns and Techniques

### Evaluating Definite Integrals

**Step-by-step process:**
1. Find an antiderivative $F(x)$ of $f(x)$
2. Evaluate $F(b) - F(a)$
3. The $+C$ constant cancels and can be omitted

**Example:**
$$\int_1^3 (x^2 + 2x) \, dx = \left[\frac{x^3}{3} + x^2\right]_1^3 = \left(\frac{27}{3} + 9\right) - \left(\frac{1}{3} + 1\right) = 18 - \frac{4}{3} = \frac{50}{3}$$

### Working with Accumulation Functions

**Standard form:**
$$A(x) = \int_a^x f(t) \, dt \implies A'(x) = f(x)$$

**Variable upper limit:**
$$\frac{d}{dx}\int_0^{x^2} \sin(t) \, dt = \sin(x^2) \cdot 2x$$

**Variable lower limit:**
$$\frac{d}{dx}\int_{x^3}^5 e^t \, dt = -e^{x^3} \cdot 3x^2$$

**Both limits variable:**
$$\frac{d}{dx}\int_{h(x)}^{g(x)} f(t) \, dt = f(g(x)) \cdot g'(x) - f(h(x)) \cdot h'(x)$$

### Setting Up Area Integrals

**When curves intersect:**
1. Solve $f(x) = g(x)$ to find intersection points
2. Determine which function is on top in each region
3. Split integral if functions cross

**Choosing integration direction:**
- Use vertical slicing ($dx$) when region is naturally bounded by functions of $x$
- Use horizontal slicing ($dy$) when vertical slicing requires multiple integrals or when curves are naturally expressed as functions of $y$

### Applying Numerical Methods

**Choosing method:**
- Trapezoidal Rule: simpler, good general-purpose method
- Simpson's Rule: superior accuracy for same computational cost (when $n$ is even)

**Determining $n$ for accuracy:**
Use error bounds to find minimum $n$ needed for desired precision.

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Subtract $F(a)$
$$\int_1^3 x \, dx \neq \frac{9}{2} \quad \text{(wrong!)}$$

Must compute:
$$\left[\frac{x^2}{2}\right]_1^3 = \frac{9}{2} - \frac{1}{2} = 4$$

### Mistake 2: Wrong Sign in Variable Limits
$$\frac{d}{dx}\int_0^{x^2} t \, dt = x^2 \quad \text{(wrong!)}$$

Correct:
$$\frac{d}{dx}\int_0^{x^2} t \, dt = x^2 \cdot 2x = 2x^3$$

Don't forget the chain rule factor!

### Mistake 3: Incorrect Upper/Lower Functions
Always verify which function is larger in the region. Sketch the curves or test a point.

### Mistake 4: Using Simpson's Rule with Odd $n$
Simpson's Rule requires an even number of subintervals. If $n$ is odd, use Trapezoidal Rule or adjust $n$.

### Mistake 5: Signed Area vs. Total Area
$$\int_0^{2\pi} \sin(x) \, dx = 0 \quad \text{(signed area)}$$

But the total area is:
$$\int_0^\pi \sin(x) \, dx + \left|\int_\pi^{2\pi} \sin(x) \, dx\right| = 2 + 2 = 4$$

---

## Best Practices

1. **Sketch regions** before setting up area integrals—visualization prevents errors
2. **Find intersection points** algebraically, not by guessing
3. **Check which function is larger** using test points or derivatives
4. **Use symmetry** to simplify computations when possible
5. **Verify FTC Part 1** by computing the integral explicitly when checking differentiation
6. **Choose appropriate numerical method** based on required accuracy and available function evaluations
7. **Apply error bounds** to determine sufficient $n$ for numerical methods
8. **Remember net change interpretation** for applied problems

---

## Applications

### Physics
- **Displacement from velocity:** $s(t) = \int v(t) \, dt$
- **Work:** $W = \int_a^b F(x) \, dx$
- **Center of mass and moments**
- **Electric and magnetic fields**

### Probability and Statistics
- **Probability:** $P(a \leq X \leq b) = \int_a^b f(x) \, dx$ for density $f$
- **Expected value:** $E[X] = \int x \cdot f(x) \, dx$
- **Variance and higher moments**

### Economics
- **Consumer surplus:** area between demand curve and price
- **Producer surplus:** area between price and supply curve
- **Net present value of continuous cash flows**

### Engineering
- **Fluid pressure and force**
- **Signal processing:** Fourier transforms
- **Control theory:** system response integrals

---

## Summary

- **Riemann sums** approximate integrals using rectangles; the limit as $n \to \infty$ defines the definite integral
- **Properties** like linearity, additivity, and comparison simplify integral evaluation
- **FTC Part 1:** $\frac{d}{dx}\int_a^x f(t) \, dt = f(x)$ (derivative of integral is integrand)
- **FTC Part 2:** $\int_a^b f(x) \, dx = F(b) - F(a)$ (evaluate using antiderivatives)
- **Average value:** $f_{\text{avg}} = \frac{1}{b-a}\int_a^b f(x) \, dx$
- **MVT for Integrals:** guarantees $f(c) = f_{\text{avg}}$ for some $c$
- **Area between curves:** $\int_a^b [\text{top} - \text{bottom}] \, dx$ or $\int_c^d [\text{right} - \text{left}] \, dy$
- **Numerical methods:** Trapezoidal Rule ($O(1/n^2)$ error) and Simpson's Rule ($O(1/n^4)$ error)

---

## Further Exploration

- **Improper integrals:** Extending integration to infinite intervals or unbounded integrands
- **Integration techniques:** Substitution, integration by parts, partial fractions (Topic 3)
- **Applications:** Volumes of revolution, arc length, surface area (Topic 4)
- **Multivariable integration:** Double and triple integrals, line and surface integrals
- **Generalized FTC:** Stokes' Theorem and the Divergence Theorem in vector calculus
