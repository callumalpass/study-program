# Applications of Taylor Series

Taylor series are not merely theoretical constructs—they are powerful computational and analytical tools used throughout mathematics, science, and engineering. This section explores practical applications including function approximation, numerical computation, limit evaluation, differential equations, and physical modeling.

## Approximating Function Values

The most direct application of Taylor series is approximating function values when exact computation is difficult or impossible.

### Example 1: Computing $\sqrt{e}$

We want to approximate $\sqrt{e} = e^{0.5}$ using the Maclaurin series for $e^x$:

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$$

Substitute $x = 0.5$:
$$e^{0.5} = 1 + 0.5 + \frac{0.25}{2} + \frac{0.125}{6} + \frac{0.0625}{24} + \frac{0.03125}{120} + \cdots$$

$$e^{0.5} = 1 + 0.5 + 0.125 + 0.020833 + 0.002604 + 0.000260 + \cdots$$

Using six terms: $e^{0.5} \approx 1.648697$

(Actual value: $e^{0.5} \approx 1.648721...$, error $< 0.00003$)

### Example 2: Estimating $\sin(0.2)$ radians

$$\sin x = x - \frac{x^3}{6} + \frac{x^5}{120} - \frac{x^7}{5040} + \cdots$$

For $x = 0.2$:
$$\sin(0.2) = 0.2 - \frac{0.008}{6} + \frac{0.00032}{120} - \cdots$$
$$= 0.2 - 0.001333 + 0.0000027 - \cdots$$
$$\approx 0.198669$$

(Actual: $\sin(0.2) \approx 0.198669331...$—accurate to 6 decimal places with just 2 terms!)

### Example 3: Approximating $\ln(2)$

Using $\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$ with $x = 1$:

$$\ln(2) = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \frac{1}{5} - \frac{1}{6} + \cdots$$

This is the alternating harmonic series. It converges slowly:
- 10 terms: $\approx 0.7456$
- 100 terms: $\approx 0.6882$
- 1000 terms: $\approx 0.6936$

(Actual: $\ln(2) \approx 0.693147...$)

**Better approach:** Use $\ln(2) = -\ln(1/2) = -\ln(1 - 1/2)$ with $x = -1/2$:
$$\ln(2) = \frac{1}{2} + \frac{1}{8} + \frac{1}{24} + \frac{1}{64} + \frac{1}{160} + \cdots$$

This converges much faster since terms decrease like $(1/2)^n$.

## Evaluating Limits

Taylor series excel at evaluating indeterminate limits, often more elegantly than L'Hôpital's Rule.

### Example 4: $\lim_{x \to 0} \frac{\sin x - x}{x^3}$

Using the Maclaurin series for $\sin x$:
$$\sin x = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$$

$$\frac{\sin x - x}{x^3} = \frac{\left(x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots\right) - x}{x^3} = \frac{-\frac{x^3}{6} + \frac{x^5}{120} - \cdots}{x^3}$$

$$= -\frac{1}{6} + \frac{x^2}{120} - \cdots$$

As $x \to 0$:
$$\lim_{x \to 0} \frac{\sin x - x}{x^3} = -\frac{1}{6}$$

This would require L'Hôpital's Rule three times, but Taylor series gives the answer immediately.

### Example 5: $\lim_{x \to 0} \frac{e^x - 1 - x - \frac{x^2}{2}}{x^3}$

$$e^x = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \frac{x^4}{24} + \cdots$$

$$\frac{e^x - 1 - x - \frac{x^2}{2}}{x^3} = \frac{\frac{x^3}{6} + \frac{x^4}{24} + \cdots}{x^3} = \frac{1}{6} + \frac{x}{24} + \cdots$$

$$\lim_{x \to 0} \frac{e^x - 1 - x - \frac{x^2}{2}}{x^3} = \frac{1}{6}$$

### Example 6: $\lim_{x \to 0} \frac{x - \sin x}{x - \tan x}$

$$\sin x = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$$

For $\tan x$, we can use $\tan x = \frac{\sin x}{\cos x}$ and divide series:
$$\tan x = x + \frac{x^3}{3} + \frac{2x^5}{15} + \cdots$$

$$x - \sin x = x - \left(x - \frac{x^3}{6} + \cdots\right) = \frac{x^3}{6} - \frac{x^5}{120} + \cdots$$

$$x - \tan x = x - \left(x + \frac{x^3}{3} + \cdots\right) = -\frac{x^3}{3} - \frac{2x^5}{15} - \cdots$$

$$\frac{x - \sin x}{x - \tan x} = \frac{\frac{x^3}{6} - \frac{x^5}{120} + \cdots}{-\frac{x^3}{3} - \frac{2x^5}{15} - \cdots} = \frac{\frac{1}{6} - \frac{x^2}{120} + \cdots}{-\frac{1}{3} - \frac{2x^2}{15} - \cdots}$$

As $x \to 0$:
$$\lim_{x \to 0} \frac{x - \sin x}{x - \tan x} = \frac{1/6}{-1/3} = -\frac{1}{2}$$

## Approximating Integrals

Some integrals cannot be expressed in terms of elementary functions. Taylor series provide a way to approximate them.

### Example 7: Approximating $\int_0^{0.5} e^{-x^2}\, dx$

The antiderivative of $e^{-x^2}$ is the error function, which is not elementary. Use series:

$$e^{-x^2} = 1 - x^2 + \frac{x^4}{2!} - \frac{x^6}{3!} + \frac{x^8}{4!} - \cdots$$

Integrate term by term:
$$\int_0^{0.5} e^{-x^2}\, dx = \left[x - \frac{x^3}{3} + \frac{x^5}{5 \cdot 2!} - \frac{x^7}{7 \cdot 3!} + \frac{x^9}{9 \cdot 4!} - \cdots\right]_0^{0.5}$$

$$= 0.5 - \frac{0.125}{3} + \frac{0.03125}{10} - \frac{0.0078125}{42} + \cdots$$

$$= 0.5 - 0.041667 + 0.003125 - 0.000186 + \cdots$$

$$\approx 0.461272$$

(This converges rapidly; 4 terms give accuracy to 6 decimal places.)

### Example 8: Estimating $\int_0^{0.2} \frac{\sin x}{x}\, dx$

$$\frac{\sin x}{x} = \frac{x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots}{x} = 1 - \frac{x^2}{6} + \frac{x^4}{120} - \frac{x^6}{5040} + \cdots$$

$$\int_0^{0.2} \frac{\sin x}{x}\, dx = \left[x - \frac{x^3}{18} + \frac{x^5}{600} - \frac{x^7}{35280} + \cdots\right]_0^{0.2}$$

$$= 0.2 - \frac{0.008}{18} + \frac{0.00032}{600} - \cdots$$

$$= 0.2 - 0.000444 + 0.00000053 - \cdots$$

$$\approx 0.199556$$

## Solving Differential Equations

Power series solutions are fundamental for differential equations that lack closed-form solutions.

### Example 9: Solving $y'' + y = 0$ with $y(0) = 0$, $y'(0) = 1$

Assume a power series solution: $y = \sum_{n=0}^{\infty} a_n x^n$.

Then:
$$y' = \sum_{n=1}^{\infty} n a_n x^{n-1}, \quad y'' = \sum_{n=2}^{\infty} n(n-1) a_n x^{n-2}$$

Substituting into $y'' + y = 0$:
$$\sum_{n=2}^{\infty} n(n-1) a_n x^{n-2} + \sum_{n=0}^{\infty} a_n x^n = 0$$

Matching coefficients of each power of $x$:
- $x^0$: $2a_2 + a_0 = 0 \Rightarrow a_2 = -\frac{a_0}{2}$
- $x^1$: $6a_3 + a_1 = 0 \Rightarrow a_3 = -\frac{a_1}{6}$
- $x^n$: $(n+2)(n+1)a_{n+2} + a_n = 0 \Rightarrow a_{n+2} = -\frac{a_n}{(n+2)(n+1)}$

From initial conditions: $y(0) = a_0 = 0$, $y'(0) = a_1 = 1$.

This gives: $a_0 = 0$, $a_1 = 1$, $a_2 = 0$, $a_3 = -\frac{1}{6}$, $a_4 = 0$, $a_5 = \frac{1}{120}$, ...

$$y = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots = \sin x$$

We've rediscovered that $\sin x$ solves this differential equation!

## Small-Angle Approximations in Physics

In physics and engineering, small-angle approximations simplify complex problems.

### Example 10: Simple pendulum

The equation of motion for a pendulum is:
$$\frac{d^2\theta}{dt^2} + \frac{g}{L}\sin\theta = 0$$

For small angles, $\sin\theta \approx \theta - \frac{\theta^3}{6}$. If $\theta$ is very small, we can approximate:
$$\sin\theta \approx \theta$$

This linearizes the equation:
$$\frac{d^2\theta}{dt^2} + \frac{g}{L}\theta = 0$$

Solution: $\theta(t) = A\cos\left(\sqrt{\frac{g}{L}}t\right) + B\sin\left(\sqrt{\frac{g}{L}}t\right)$

Period: $T = 2\pi\sqrt{\frac{L}{g}}$

For more accuracy, include the $\theta^3$ term and use perturbation methods.

## Numerical Methods

Calculators and computers use Taylor series (and related methods) to compute functions.

### Example 11: How does a calculator compute $\sin(1)$?

Modern implementations use:
1. **Range reduction:** Use periodicity and symmetry to reduce $x$ to a small value (e.g., $[0, \pi/4]$)
2. **Polynomial approximation:** Use a truncated Taylor series or more efficient approximations (Chebyshev, Padé)
3. **Error control:** Ensure accuracy to machine precision (typically 15-16 digits)

For $\sin(1)$ (already in a good range):
$$\sin(1) \approx 1 - \frac{1}{6} + \frac{1}{120} - \frac{1}{5040} + \frac{1}{362880} - \cdots$$

With 5 terms: $\approx 0.8414709848$

(Actual to 10 places: $0.8414709848$—exact match!)

## Approximating Roots and Solutions

### Example 12: Approximating $\sqrt{1.1}$

Use the binomial series $(1 + x)^{1/2}$ with $x = 0.1$:

$$(1 + x)^{1/2} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \frac{1}{16}x^3 - \cdots$$

$$(1.1)^{1/2} = 1 + \frac{1}{2}(0.1) - \frac{1}{8}(0.01) + \frac{1}{16}(0.001) - \cdots$$

$$= 1 + 0.05 - 0.00125 + 0.0000625 - \cdots$$

$$\approx 1.04881$$

(Actual: $\sqrt{1.1} \approx 1.04880885...$)

## Analyzing Function Behavior

### Example 13: Understanding $\frac{\sin x}{x}$ near $x = 0$

$$\frac{\sin x}{x} = \frac{x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots}{x} = 1 - \frac{x^2}{6} + \frac{x^4}{120} - \cdots$$

This shows:
- $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- The function decreases from 1 for $x > 0$ (since $-\frac{x^2}{6} < 0$)
- The rate of decrease is approximately $\frac{x^2}{6}$ for small $x$

This is used in signal processing, optics, and Fourier analysis.

## Summary of Applications

**Numerical Computation:**
- Approximate transcendental functions ($e^x$, $\sin x$, $\ln x$, etc.)
- Compute integrals that lack closed forms
- Solve equations numerically

**Limit Evaluation:**
- Resolve indeterminate forms elegantly
- Often simpler than repeated L'Hôpital's Rule

**Differential Equations:**
- Find power series solutions
- Approximate solutions near a point

**Physics and Engineering:**
- Small-angle and small-parameter approximations
- Linearization of nonlinear systems
- Perturbation theory

**Analysis:**
- Understand function behavior near points
- Derive asymptotic expansions

## Summary

- Taylor series enable **numerical approximation** of function values and integrals
- They provide elegant solutions to **limit problems**, often simpler than L'Hôpital's Rule
- **Differential equations** can be solved using power series methods
- **Small-angle approximations** in physics come from truncating Taylor series
- Calculators use Taylor series (and variants) to **compute elementary functions**
- Series reveal **function behavior** near points and asymptotic properties
- The key is choosing appropriate centers and truncation points for desired accuracy
