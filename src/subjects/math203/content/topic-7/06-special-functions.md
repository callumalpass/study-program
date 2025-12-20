# Sketching Special Functions

Beyond polynomials and rational functions, curve sketching applies to exponential, logarithmic, trigonometric, and other special functions. Each type has characteristic features.

## Exponential Functions

### Basic Exponential: $f(x) = e^x$

- Domain: all real numbers
- Range: $(0, \infty)$
- y-intercept: $(0, 1)$
- No x-intercept (always positive)
- Horizontal asymptote: $y = 0$ (as $x \to -\infty$)
- Always increasing ($f'(x) = e^x > 0$)
- Always concave up ($f''(x) = e^x > 0$)

### Modified Exponential: $f(x) = e^{-x^2}$ (Gaussian)

**Domain:** All real numbers

**Symmetry:** $f(-x) = e^{-(-x)^2} = e^{-x^2} = f(x)$ → even

**First derivative:**
$f'(x) = e^{-x^2}(-2x) = -2xe^{-x^2}$

Critical point: $x = 0$
- $x < 0$: $f' > 0$ (increasing)
- $x > 0$: $f' < 0$ (decreasing)
- Local max at $(0, 1)$

**Second derivative:**
$f''(x) = -2e^{-x^2} + (-2x)(-2x)e^{-x^2} = e^{-x^2}(-2 + 4x^2) = 2e^{-x^2}(2x^2 - 1)$

$f'' = 0$ when $x = \pm\frac{1}{\sqrt{2}}$

Inflection points at $x = \pm\frac{1}{\sqrt{2}} \approx \pm 0.707$

**End behavior:** $f(x) \to 0$ as $x \to \pm\infty$ (horizontal asymptote $y = 0$)

**Shape:** Bell curve centered at origin

## Logarithmic Functions

### Basic Logarithm: $f(x) = \ln x$

- Domain: $(0, \infty)$
- Range: all real numbers
- x-intercept: $(1, 0)$
- No y-intercept ($x = 0$ not in domain)
- Vertical asymptote: $x = 0$
- Always increasing ($f'(x) = \frac{1}{x} > 0$ for $x > 0$)
- Always concave down ($f''(x) = -\frac{1}{x^2} < 0$)

### Modified Logarithm: $f(x) = x\ln x$

**Domain:** $(0, \infty)$

**Intercepts:**
$f(1) = 0$ → x-intercept at $(1, 0)$
$\lim_{x \to 0^+} x\ln x = 0$ (using L'Hôpital's) → approaches origin

**First derivative:**
$f'(x) = \ln x + x \cdot \frac{1}{x} = \ln x + 1$

$f'(x) = 0$ when $\ln x = -1$ → $x = e^{-1} = \frac{1}{e}$

- $0 < x < \frac{1}{e}$: $f' < 0$ (decreasing)
- $x > \frac{1}{e}$: $f' > 0$ (increasing)
- Local min at $(\frac{1}{e}, -\frac{1}{e})$

**Second derivative:**
$f''(x) = \frac{1}{x} > 0$ for $x > 0$

Always concave up on its domain.

## Trigonometric Functions

### Sine and Cosine

$f(x) = \sin x$:
- Domain: all real numbers
- Range: $[-1, 1]$
- Period: $2\pi$
- Zeros: $x = n\pi$ for integer $n$
- Max at $x = \frac{\pi}{2} + 2\pi n$
- Min at $x = \frac{3\pi}{2} + 2\pi n$
- Inflection points at zeros

### Damped Oscillation: $f(x) = e^{-x}\sin x$

**Domain:** All real numbers

**First derivative:**
$f'(x) = e^{-x}\cos x - e^{-x}\sin x = e^{-x}(\cos x - \sin x)$

$f'(x) = 0$ when $\cos x = \sin x$ → $\tan x = 1$ → $x = \frac{\pi}{4} + n\pi$

**Behavior:** Oscillates with decreasing amplitude
- Bounded by $\pm e^{-x}$
- As $x \to \infty$: $f(x) \to 0$
- As $x \to -\infty$: oscillations grow unboundedly

**Zeros:** When $\sin x = 0$, i.e., $x = n\pi$

## Inverse Trigonometric Functions

### Arctangent: $f(x) = \arctan x$

- Domain: all real numbers
- Range: $(-\frac{\pi}{2}, \frac{\pi}{2})$
- Horizontal asymptotes: $y = \pm\frac{\pi}{2}$
- Passes through origin
- Always increasing ($f'(x) = \frac{1}{1+x^2} > 0$)
- Inflection at origin (where $f''(x) = \frac{-2x}{(1+x^2)^2}$ changes sign)

### Arcsine: $f(x) = \arcsin x$

- Domain: $[-1, 1]$
- Range: $[-\frac{\pi}{2}, \frac{\pi}{2}]$
- Endpoints: $(-1, -\frac{\pi}{2})$ and $(1, \frac{\pi}{2})$
- Always increasing
- Vertical tangents at endpoints ($f'(x) = \frac{1}{\sqrt{1-x^2}} \to \infty$)

## Combinations and Transformations

### Logistic Function: $f(x) = \frac{1}{1 + e^{-x}}$

**Domain:** All real numbers

**Range:** $(0, 1)$

**Horizontal asymptotes:** $y = 0$ (left), $y = 1$ (right)

**First derivative:**
$f'(x) = \frac{e^{-x}}{(1+e^{-x})^2} > 0$ always → always increasing

**Symmetry:** $f(-x) = 1 - f(x)$ → symmetric about $(\frac{1}{2}, \frac{1}{2})$

**Inflection:** At $x = 0$, $f(0) = \frac{1}{2}$

**Shape:** S-curve (sigmoid) rising from 0 to 1

### Hyperbolic Functions

$\sinh x = \frac{e^x - e^{-x}}{2}$: odd, always increasing, unbounded

$\cosh x = \frac{e^x + e^{-x}}{2}$: even, minimum at $(0, 1)$, U-shaped

$\tanh x = \frac{\sinh x}{\cosh x}$: odd, horizontal asymptotes at $y = \pm 1$

## Sketching Strategy for Special Functions

1. **Know the basic shapes** — exponential, log, trig, inverse trig
2. **Identify transformations** — shifts, stretches, reflections
3. **Check domain and asymptotes first**
4. **Use derivatives to refine** — extrema, inflection points
5. **Verify end behavior** — limits at boundaries and infinity

## Common Mistakes

1. **Forgetting domain restrictions** for $\ln$, $\sqrt{}$, inverse trig
2. **Missing asymptotes** for exponentials approaching 0
3. **Ignoring periodicity** when applicable
4. **Not checking both $x \to +\infty$ and $x \to -\infty$**

## Summary

- Exponential functions: domain all reals, range $(0, \infty)$, horizontal asymptote
- Logarithmic functions: domain $(0, \infty)$, vertical asymptote at 0
- Trigonometric functions: periodic, bounded (for sin, cos, tan bounded between asymptotes)
- Special combinations may have features from multiple function types
- Derivatives still identify extrema and concavity
- Characteristic shapes help verify your sketch
