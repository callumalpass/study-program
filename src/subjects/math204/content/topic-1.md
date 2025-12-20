## Introduction

Integration is one of the two fundamental operations in calculus, alongside differentiation. While differentiation answers "how fast is this changing?", integration answers "how much has accumulated?" or "what function has this rate of change?" This topic introduces antiderivatives and indefinite integrals, establishing the foundation for all of integral calculus.

**Why This Matters:**
Integration appears everywhere in mathematics, science, and engineering. It's essential for computing areas, volumes, accumulated quantities, work, probability, and countless other applications. Understanding antiderivatives—functions whose derivatives give you back the original function—is the first step toward mastering integration and unlocking these powerful applications.

**Learning Objectives:**
- Understand the concept of antiderivatives and the constant of integration
- Apply basic integration rules for polynomials, exponentials, logarithms, and trigonometric functions
- Solve initial value problems to find particular solutions
- Master the substitution method for more complex integrals
- Integrate powers and products of trigonometric functions
- Solve separable differential equations including growth and decay problems
- Apply antiderivatives to motion problems and accumulated change

---

## Core Concepts

### What is an Antiderivative?

An **antiderivative** of a function $f(x)$ is a function $F(x)$ whose derivative equals $f(x)$:

$$F'(x) = f(x)$$

Since the derivative of any constant is zero, if $F(x)$ is an antiderivative of $f(x)$, so is $F(x) + C$ for any constant $C$. The **general antiderivative** includes all possibilities:

$$F(x) + C$$

This is also called the **indefinite integral** and is written:

$$\int f(x) \, dx = F(x) + C$$

### The Fundamental Integration Rules

The basic integration formulas reverse the standard derivative rules:

| Function | Antiderivative |
|----------|----------------|
| $x^n$ (n ≠ -1) | $\frac{x^{n+1}}{n+1} + C$ |
| $\frac{1}{x}$ | $\ln\|x\| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\frac{a^x}{\ln a} + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |
| $\sec x \tan x$ | $\sec x + C$ |

**Linearity:** Integration respects addition and scalar multiplication:

$$\int [af(x) + bg(x)] \, dx = a\int f(x) \, dx + b\int g(x) \, dx$$

### Initial Value Problems

An **initial value problem** (IVP) consists of a differential equation plus an initial condition:

$$\frac{dy}{dx} = f(x), \quad y(x_0) = y_0$$

**Solving strategy:**
1. Integrate to find the general solution $y = F(x) + C$
2. Apply the initial condition to solve for $C$
3. Write the particular solution

For higher-order differential equations, we integrate multiple times and need multiple initial conditions.

### The Substitution Method

**Substitution** (or **$u$-substitution**) is the reverse of the chain rule. It transforms complicated integrals by recognizing patterns:

**Strategy:**
1. Identify an inner function: let $u = g(x)$
2. Find $du = g'(x) \, dx$
3. Substitute to transform the integral into one involving $u$
4. Integrate with respect to $u$
5. Back-substitute to express the answer in terms of $x$

**Example:**
$$\int 2x \cos(x^2) \, dx$$

Let $u = x^2$, so $du = 2x \, dx$:

$$\int \cos(u) \, du = \sin(u) + C = \sin(x^2) + C$$

**For definite integrals:** Either change the limits to $u$-values, or back-substitute before evaluating.

### Trigonometric Integration

Integrating powers and products of trigonometric functions requires strategic use of identities:

**Powers of sine and cosine:**
- If an odd power: save one factor for $du$, convert the rest using $\sin^2 x + \cos^2 x = 1$
- If both even: use power-reducing formulas
  - $\sin^2 x = \frac{1 - \cos 2x}{2}$
  - $\cos^2 x = \frac{1 + \cos 2x}{2}$

**Powers of tangent and secant:**
- Even power of secant: use $\sec^2 x = 1 + \tan^2 x$, let $u = \tan x$
- Odd power of tangent: use $\tan^2 x = \sec^2 x - 1$, let $u = \sec x$

**Products of different frequencies:** Use product-to-sum formulas.

### Separable Differential Equations

A differential equation is **separable** if it can be written as:

$$\frac{dy}{dx} = g(x)h(y)$$

**Solution method:**
1. Separate variables: $\frac{1}{h(y)} \, dy = g(x) \, dx$
2. Integrate both sides
3. Solve for $y$ (may require exponentiation)
4. Apply initial conditions if given

**Important special case:** Exponential growth and decay

$$\frac{dP}{dt} = kP \implies P(t) = P_0 e^{kt}$$

Applications include population growth ($k > 0$), radioactive decay ($k < 0$), and Newton's Law of Cooling.

### Applications to Motion

Position, velocity, and acceleration are related by derivatives and antiderivatives:

- **Velocity from acceleration:** $v(t) = \int a(t) \, dt$
- **Position from velocity:** $s(t) = \int v(t) \, dt$

**Free fall near Earth's surface:**
- Acceleration: $a(t) = -g$ (where $g \approx 9.8$ m/s²)
- Velocity: $v(t) = -gt + v_0$
- Position: $s(t) = -\frac{1}{2}gt^2 + v_0 t + s_0$

**Displacement vs. distance:**
- **Displacement:** $\int_{t_1}^{t_2} v(t) \, dt$ (can be negative)
- **Distance:** $\int_{t_1}^{t_2} |v(t)| \, dt$ (always positive)

---

## Common Patterns and Techniques

### Pattern Recognition for Substitution

Look for these forms:

| Pattern | Substitution | Result |
|---------|--------------|--------|
| $f(g(x)) \cdot g'(x)$ | $u = g(x)$ | $\int f(u) \, du$ |
| $\frac{f'(x)}{f(x)}$ | $u = f(x)$ | $\ln\|f(x)\| + C$ |
| $f'(x)[f(x)]^n$ | $u = f(x)$ | $\frac{[f(x)]^{n+1}}{n+1} + C$ |
| $f'(x)e^{f(x)}$ | $u = f(x)$ | $e^{f(x)} + C$ |

### Trigonometric Integration Strategies

**Key identities:**
- $\sin^2 x + \cos^2 x = 1$
- $1 + \tan^2 x = \sec^2 x$
- $1 + \cot^2 x = \csc^2 x$
- $\sin 2x = 2\sin x \cos x$
- Power-reducing formulas for $\sin^2 x$ and $\cos^2 x$

**Decision tree:**
1. Is one power odd? → Use substitution
2. Are both powers even? → Use power reduction
3. Is it a product like $\sin(mx)\cos(nx)$? → Product-to-sum formulas
4. Does it involve tangent/secant? → Check which has special parity

### Growth and Decay Problems

**Exponential model:** When rate is proportional to amount, use $\frac{dA}{dt} = kA$.

Solution: $A(t) = A_0 e^{kt}$

**Half-life:** The time for half the substance to decay:
$$A(t_{1/2}) = \frac{A_0}{2} \implies t_{1/2} = \frac{\ln 2}{|k|}$$

**Doubling time:** The time to double:
$$A(t_d) = 2A_0 \implies t_d = \frac{\ln 2}{k}$$

**Newton's Law of Cooling:**
$$\frac{dT}{dt} = -k(T - T_{\text{ambient}})$$

Solution: $T(t) = T_{\text{ambient}} + (T_0 - T_{\text{ambient}})e^{-kt}$

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting the Constant of Integration

**Wrong:** $\int 2x \, dx = x^2$

**Right:** $\int 2x \, dx = x^2 + C$

The constant is not optional—it represents an entire family of antiderivatives.

### Mistake 2: Misapplying the Power Rule

**Wrong:** $\int x^4 \, dx = \frac{x^4}{4} + C$ (forgot to increase the power)

**Right:** $\int x^4 \, dx = \frac{x^5}{5} + C$

**Wrong:** $\int \frac{1}{x} \, dx = \frac{x^0}{0} + C$ (division by zero!)

**Right:** $\int \frac{1}{x} \, dx = \ln|x| + C$ (special case)

### Mistake 3: Incomplete Substitution

**Wrong:** Let $u = x^2$, then $\int 2x\sqrt{x^2+1} \, dx = \int 2x\sqrt{u+1} \, dx$

Still has $x$ and $dx$!

**Right:** $du = 2x \, dx$, so $\int \sqrt{u+1} \, du$

### Mistake 4: Confusing Displacement and Distance

For $v(t) = t - 2$ on $[0, 3]$:
- **Displacement:** May be negative (net change)
- **Distance:** Always positive (must split integral where $v = 0$)

### Mistake 5: Sign Errors in Trigonometric Integrals

**Wrong:** $\int \sin x \, dx = \cos x + C$

**Right:** $\int \sin x \, dx = -\cos x + C$

Always verify by differentiating your answer!

---

## Best Practices

### Integration Strategy

1. **Simplify first:** Algebraic manipulation often makes integrals easier
2. **Try direct integration:** Check if it matches a basic formula
3. **Look for substitution:** Identify composite functions and their derivatives
4. **Use identities:** Especially for trigonometric integrals
5. **Verify:** Always differentiate your answer to check

### Problem-Solving Workflow

**For indefinite integrals:**
1. Identify the form
2. Choose the appropriate technique
3. Integrate carefully
4. Add $+C$
5. Verify by differentiating

**For initial value problems:**
1. Integrate to find the general solution
2. Apply initial condition(s) immediately
3. Solve for constant(s)
4. Write the particular solution
5. Verify both the differential equation and initial condition

**For applied problems:**
1. Identify what's given (position, velocity, acceleration?)
2. Determine what you need
3. Set up the integral(s)
4. Apply initial conditions
5. Interpret the result in context

### Verification Checklist

- [ ] Does differentiating your answer give the integrand?
- [ ] Did you include $+C$ for indefinite integrals?
- [ ] For IVPs, does the solution satisfy the initial condition?
- [ ] Are units consistent (especially in applied problems)?
- [ ] Did you check where velocity changes sign (for distance problems)?

---

## Summary

- **Antiderivatives** reverse differentiation: $F'(x) = f(x)$
- The **general antiderivative** is $F(x) + C$ where $C$ is an arbitrary constant
- **Indefinite integrals** are written $\int f(x) \, dx = F(x) + C$
- **Basic integration rules** handle polynomials, exponentials, logarithms, and trigonometric functions
- **Initial value problems** use conditions to find particular solutions from general ones
- **Substitution** reverses the chain rule and is essential for composite functions
- **Trigonometric integration** requires strategic use of identities and substitution
- **Separable differential equations** model growth, decay, and cooling
- **Motion problems** use antiderivatives to find velocity from acceleration and position from velocity
- **Net Change Theorem:** $\int_a^b F'(x) \, dx = F(b) - F(a)$

---

## Further Exploration

**Advanced integration techniques:**
- Integration by parts (reversing the product rule)
- Trigonometric substitution (for expressions like $\sqrt{a^2 - x^2}$)
- Partial fraction decomposition (for rational functions)
- Numerical integration (when no closed form exists)

**Deeper theory:**
- The Fundamental Theorem of Calculus (connecting definite and indefinite integrals)
- Riemann sums and the formal definition of the definite integral
- Improper integrals (infinite limits or discontinuous integrands)

**Applications:**
- Area between curves
- Volumes of revolution
- Arc length and surface area
- Work, energy, and power
- Probability and statistics (continuous distributions)
- Center of mass and moments

Antiderivatives and indefinite integrals form the foundation of integral calculus. Master these techniques, and you'll be prepared for definite integrals, advanced integration methods, and the rich applications that make calculus indispensable across mathematics, science, and engineering.
