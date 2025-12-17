# Elementary Complex Functions

The elementary functions—exponential, logarithmic, trigonometric, hyperbolic, and power functions—extend from real analysis to complex analysis. While maintaining many familiar properties, these functions exhibit fascinating new behaviors in the complex domain, including periodicity, multi-valuedness, and branch points. Understanding these functions is essential for applications throughout complex analysis.

## The Complex Exponential Function

### Definition

The complex exponential function is defined for all $z = x + iy$ by:

$$e^z = e^x(\cos y + i\sin y) = e^x \cos y + ie^x \sin y$$

### Properties

1. **Entire function**: $e^z$ is analytic on all of $\mathbb{C}$

2. **Derivative**: $\frac{d}{dz}e^z = e^z$

3. **Addition formula**: $e^{z_1 + z_2} = e^{z_1} e^{z_2}$

4. **Never zero**: $e^z \neq 0$ for all $z \in \mathbb{C}$

5. **Modulus**: $|e^z| = e^{\text{Re}(z)} = e^x$

6. **Argument**: $\arg(e^z) = \text{Im}(z) = y$ (mod $2\pi$)

7. **Periodicity**: $e^{z + 2\pi i} = e^z$ (period $2\pi i$)

### Periodicity and Consequences

The periodicity $e^{z + 2\pi i k} = e^z$ for any integer $k$ means $e^z$ is not one-to-one.

For example: $e^0 = e^{2\pi i} = e^{4\pi i} = 1$

This multi-to-one property has profound implications for the inverse function (logarithm).

**Horizontal strips**: The function $e^z$ maps the strip $\{z : \alpha < \text{Im}(z) \leq \alpha + 2\pi\}$ bijectively onto $\mathbb{C} \setminus \{0\}$ for any real $\alpha$.

The standard choice is the **fundamental strip**: $\{z : -\pi < \text{Im}(z) \leq \pi\}$.

### Examples

1. $e^{1+i\pi} = e^1 \cdot e^{i\pi} = e \cdot (-1) = -e$

2. $e^{i\pi/4} = \cos\frac{\pi}{4} + i\sin\frac{\pi}{4} = \frac{1}{\sqrt{2}}(1 + i)$

3. $e^{2+i\pi/2} = e^2 \cdot i$

## Trigonometric Functions

### Definitions

The complex sine and cosine are defined using the exponential function:

$$\sin z = \frac{e^{iz} - e^{-iz}}{2i}, \quad \cos z = \frac{e^{iz} + e^{-iz}}{2}$$

For real $z = x$, these reduce to the familiar real sine and cosine.

### Properties

1. **Entire functions**: Both $\sin z$ and $\cos z$ are analytic on $\mathbb{C}$

2. **Derivatives**:
   $$\frac{d}{dz}\sin z = \cos z, \quad \frac{d}{dz}\cos z = -\sin z$$

3. **Periodicity**: Period $2\pi$
   $$\sin(z + 2\pi) = \sin z, \quad \cos(z + 2\pi) = \cos z$$

4. **Pythagorean identity**: $\sin^2 z + \cos^2 z = 1$

5. **Addition formulas**:
   $$\sin(z_1 + z_2) = \sin z_1 \cos z_2 + \cos z_1 \sin z_2$$
   $$\cos(z_1 + z_2) = \cos z_1 \cos z_2 - \sin z_1 \sin z_2$$

6. **Zeros**:
   - $\sin z = 0 \iff z = n\pi$ for integer $n$
   - $\cos z = 0 \iff z = \frac{\pi}{2} + n\pi$ for integer $n$

### Unboundedness

Unlike real sine and cosine, complex versions are **unbounded**:

$$|\sin(iy)| = \left|\frac{e^{-y} - e^y}{2i}\right| = \frac{e^y - e^{-y}}{2} = \sinh y \to \infty \text{ as } y \to \infty$$

Similarly, $|\cos(iy)| = \cosh y \to \infty$ as $|y| \to \infty$.

### Component Forms

For $z = x + iy$:

$$\sin z = \sin x \cosh y + i\cos x \sinh y$$

$$\cos z = \cos x \cosh y - i\sin x \sinh y$$

where $\sinh y = \frac{e^y - e^{-y}}{2}$ and $\cosh y = \frac{e^y + e^{-y}}{2}$.

### Other Trigonometric Functions

$$\tan z = \frac{\sin z}{\cos z}, \quad \cot z = \frac{\cos z}{\sin z}$$

$$\sec z = \frac{1}{\cos z}, \quad \csc z = \frac{1}{\sin z}$$

These are analytic except where their denominators vanish.

**Example**: $\tan z$ has simple poles at $z = \frac{\pi}{2} + n\pi$.

## Hyperbolic Functions

### Definitions

$$\sinh z = \frac{e^z - e^{-z}}{2}, \quad \cosh z = \frac{e^z + e^{-z}}{2}$$

$$\tanh z = \frac{\sinh z}{\cosh z}, \quad \text{coth } z = \frac{\cosh z}{\sinh z}$$

### Properties

1. **Entire**: $\sinh z$ and $\cosh z$ are entire

2. **Derivatives**:
   $$\frac{d}{dz}\sinh z = \cosh z, \quad \frac{d}{dz}\cosh z = \sinh z$$

3. **Hyperbolic identity**: $\cosh^2 z - \sinh^2 z = 1$

4. **Periodicity**: Pure imaginary period $2\pi i$
   $$\sinh(z + 2\pi i) = \sinh z, \quad \cosh(z + 2\pi i) = \cosh z$$

5. **Zeros**:
   - $\sinh z = 0 \iff z = n\pi i$ for integer $n$
   - $\cosh z = 0 \iff z = \frac{\pi}{2}i + n\pi i$ for integer $n$

### Relationship to Trigonometric Functions

$$\sin(iz) = i\sinh z, \quad \cos(iz) = \cosh z$$

$$\sinh(iz) = i\sin z, \quad \cosh(iz) = \cos z$$

This shows that hyperbolic and trigonometric functions are essentially the same in complex analysis, differing only by a rotation of the argument.

## The Complex Logarithm

### Multi-Valued Nature

The logarithm is the inverse of the exponential: $w = \log z$ means $e^w = z$.

For $z = re^{i\theta}$ with $r > 0$:
$$e^w = re^{i\theta}$$

Writing $w = u + iv$:
$$e^u e^{iv} = re^{i\theta}$$

This gives $e^u = r$ and $e^{iv} = e^{i\theta}$, so:
$$u = \ln r, \quad v = \theta + 2\pi k \text{ for integer } k$$

Therefore:
$$\log z = \ln|z| + i(\arg(z) + 2\pi k) = \ln|z| + i\arg(z)$$

where $\arg(z)$ is multi-valued (defined mod $2\pi$).

### The Principal Logarithm

The **principal value** of the logarithm, denoted $\text{Log } z$, uses the principal argument $\text{Arg } z \in (-\pi, \pi]$:

$$\text{Log } z = \ln|z| + i\text{Arg } z$$

This is defined and analytic on $\mathbb{C} \setminus (-\infty, 0]$ (excluding the non-positive real axis).

### Properties

1. **Derivative**: $\frac{d}{dz}\text{Log } z = \frac{1}{z}$ (on the cut plane)

2. **Inverse of exponential** (principal branches):
   $$\text{Log}(e^z) = z \text{ for } z \in \{w : -\pi < \text{Im}(w) \leq \pi\}$$
   $$e^{\text{Log } z} = z \text{ for } z \in \mathbb{C} \setminus (-\infty, 0]$$

3. **Addition formula** (careful with branches!):
   $$\log(z_1 z_2) = \log z_1 + \log z_2 + 2\pi i k$$
   for some integer $k$ depending on arguments.

4. **Power rule**:
   $$\log(z^n) = n\log z + 2\pi i k$$

### Branch Cuts

To make $\log z$ single-valued, we introduce a **branch cut**—typically the negative real axis.

Different choices of branch cut yield different branches of the logarithm:
- Standard branch: cut along $(-\infty, 0]$, $\arg z \in (-\pi, \pi]$
- Alternative: cut along $[0, \infty)$, $\arg z \in (0, 2\pi]$
- Or along any ray from the origin

### Examples

1. $\text{Log}(1) = \ln 1 + i \cdot 0 = 0$

2. $\text{Log}(-1) = \ln 1 + i\pi = i\pi$

3. $\text{Log}(i) = \ln 1 + i\frac{\pi}{2} = i\frac{\pi}{2}$

4. $\text{Log}(-i) = \ln 1 + i\left(-\frac{\pi}{2}\right) = -i\frac{\pi}{2}$

5. $\text{Log}(-2) = \ln 2 + i\pi$

6. All values of $\log(i)$: $i\frac{\pi}{2} + 2\pi i k$ for integer $k$

## Complex Powers

### Definition

For $z, w \in \mathbb{C}$ with $z \neq 0$, we define:

$$z^w = e^{w \log z}$$

Since $\log z$ is multi-valued, so is $z^w$ in general.

### Principal Value

Using the principal logarithm:
$$z^w = e^{w \text{Log } z}$$

### Cases

1. **Integer powers**: $z^n$ is single-valued for integer $n$

2. **Rational powers**: $z^{p/q}$ has $q$ distinct values (the $q$-th roots)

3. **Irrational/complex powers**: Infinitely many values in general

### Examples

1. **$i^i$**:
   $$i^i = e^{i \log i} = e^{i(i\pi/2 + 2\pi i k)} = e^{-\pi/2 - 2\pi k}$$

   Principal value: $e^{-\pi/2} \approx 0.2079$ (a positive real number!)

2. **$(1+i)^{1+i}$**:
   $$\text{Log}(1+i) = \ln\sqrt{2} + i\frac{\pi}{4}$$
   $$(1+i)^{1+i} = e^{(1+i)(\ln\sqrt{2} + i\pi/4)} = e^{\ln\sqrt{2} + i\pi/4 - \pi/4 + i\ln\sqrt{2}}$$
   $$= e^{\ln\sqrt{2} - \pi/4} e^{i(\pi/4 + \ln\sqrt{2})}$$

3. **$(-1)^{1/2}$**:
   $$(-1)^{1/2} = e^{(1/2)\log(-1)} = e^{(1/2)(i\pi + 2\pi i k)} = e^{i\pi/2 + \pi i k}$$

   For $k = 0$: $e^{i\pi/2} = i$

   For $k = 1$: $e^{i3\pi/2} = -i$

   The two square roots of $-1$ are $\pm i$.

## Inverse Trigonometric Functions

### Definitions

Solving $w = \sin z$ for $z$:
$$\sin z = \frac{e^{iz} - e^{-iz}}{2i} = w$$

Let $u = e^{iz}$:
$$\frac{u - u^{-1}}{2i} = w \implies u^2 - 2iwu - 1 = 0$$

$$u = iw \pm \sqrt{1 - w^2}$$

$$iz = \log(iw \pm \sqrt{1 - w^2})$$

$$z = \arcsin w = -i\log(iw + \sqrt{1 - w^2})$$

This is multi-valued due to the logarithm and the $\pm$ ambiguity.

Similarly:
$$\arccos z = -i\log(z + \sqrt{z^2 - 1})$$

$$\arctan z = \frac{i}{2}\log\frac{i + z}{i - z}$$

These functions have **branch points** where the square roots vanish or where arguments of logarithms become zero or negative.

### Example

$$\arcsin(2) = -i\log(2i + \sqrt{1 - 4}) = -i\log(2i + \sqrt{3}i) = -i\log(i(2 + \sqrt{3}))$$

$$= -i[\ln(2 + \sqrt{3}) + i\pi/2] = \frac{\pi}{2} - i\ln(2 + \sqrt{3})$$

Note that $\arcsin(2)$ has a real part $\pi/2$ and an imaginary part, unlike real-valued $\arcsin$ which is undefined at $2$.

## Summary

- **Exponential $e^z$**: entire, periodic with period $2\pi i$, $|e^z| = e^{\text{Re}(z)}$
- **Trigonometric**: $\sin z, \cos z$ are entire, periodic, unbounded, zeros only on real axis
- **Hyperbolic**: $\sinh z, \cosh z$ related to trig functions by $\sin(iz) = i\sinh z$
- **Logarithm**: multi-valued, $\log z = \ln|z| + i\arg(z)$
- **Principal log**: $\text{Log } z = \ln|z| + i\text{Arg } z$, analytic on $\mathbb{C} \setminus (-\infty, 0]$
- **Branch cuts**: necessary to make multi-valued functions single-valued
- **Complex powers**: $z^w = e^{w\log z}$, multi-valued in general
- **Inverse trig**: defined via logarithms, multi-valued with branch points
- Elementary functions in complex analysis exhibit richer behavior than their real counterparts
- Understanding branches, periodicity, and multi-valuedness is essential for complex analysis applications
