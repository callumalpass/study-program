# Complex Eigenvalues of Real Matrices

## When Real Matrices Have Complex Eigenvalues

A real matrix can have complex eigenvalues! This might seem surprising, but it's a consequence of the Fundamental Theorem of Algebra: every polynomial has complex roots.

**Key Facts:**
1. Complex eigenvalues of real matrices always come in **conjugate pairs**
2. If $\lambda = a + bi$ is an eigenvalue, then $\overline{\lambda} = a - bi$ is also an eigenvalue
3. The corresponding eigenvectors are also complex conjugates

**Why conjugate pairs?** The characteristic polynomial $\det(A - \lambda I)$ has real coefficients when $A$ is real. For polynomials with real coefficients, complex roots must appear in conjugate pairs.

---

## Example 1: Rotation Matrix

Consider a 90-degree counterclockwise rotation matrix:

$$A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

**Find eigenvalues:**

$$\det(A - \lambda I) = \det\begin{bmatrix} -\lambda & -1 \\ 1 & -\lambda \end{bmatrix} = \lambda^2 + 1 = 0$$

$$\lambda^2 = -1$$

$$\lambda_1 = i, \quad \lambda_2 = -i$$

The eigenvalues are purely imaginary! This makes geometric sense: rotation doesn't have any invariant directions in the plane—every vector changes direction. Complex eigenvalues indicate rotational behavior.

**Find eigenvector for $\lambda_1 = i$:**

$$(A - iI)\mathbf{v} = \mathbf{0}$$

$$\begin{bmatrix} -i & -1 \\ 1 & -i \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

From the first row: $-ix - y = 0$, so $y = -ix$

Taking $x = 1$:

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ -i \end{bmatrix}$$

**Find eigenvector for $\lambda_2 = -i$:**

Similarly:

$$\mathbf{v}_2 = \begin{bmatrix} 1 \\ i \end{bmatrix} = \overline{\mathbf{v}_1}$$

Notice: $\mathbf{v}_2$ is the complex conjugate of $\mathbf{v}_1$!

**Verification:**

$$A\mathbf{v}_1 = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 1 \\ -i \end{bmatrix} = \begin{bmatrix} i \\ 1 \end{bmatrix} = i\begin{bmatrix} 1 \\ -i \end{bmatrix} = i\mathbf{v}_1$$ ✓

---

## Geometric Interpretation: Rotation and Scaling

When a 2×2 real matrix has complex eigenvalues $\lambda = a \pm bi$, the matrix represents a combination of:
1. **Rotation** by angle $\theta = \arctan(b/a)$
2. **Scaling** by factor $r = |\lambda| = \sqrt{a^2 + b^2}$

This comes from the polar form of complex numbers:

$$\lambda = a + bi = re^{i\theta}$$

where:
- $r = \sqrt{a^2 + b^2}$ is the modulus (magnitude)
- $\theta = \arctan(b/a)$ is the argument (angle)

**Example:** For $\lambda = i$:
- $r = |i| = 1$ (no scaling)
- $\theta = 90°$ (pure rotation)

This perfectly matches the 90-degree rotation matrix!

---

## Example 2: Rotation with Scaling

Consider:

$$A = \begin{bmatrix} 1 & -2 \\ 2 & 1 \end{bmatrix}$$

**Find eigenvalues:**

$$\det(A - \lambda I) = (1-\lambda)^2 + 4 = \lambda^2 - 2\lambda + 5 = 0$$

$$\lambda = \frac{2 \pm \sqrt{4 - 20}}{2} = \frac{2 \pm \sqrt{-16}}{2} = \frac{2 \pm 4i}{2} = 1 \pm 2i$$

**Interpret geometrically:**

For $\lambda = 1 + 2i$:
- Real part $a = 1$
- Imaginary part $b = 2$
- Modulus: $r = \sqrt{1^2 + 2^2} = \sqrt{5}$
- Angle: $\theta = \arctan(2/1) \approx 63.43°$

The matrix represents:
- Rotation by approximately 63.43° counterclockwise
- Scaling by factor $\sqrt{5} \approx 2.236$

Applying $A$ repeatedly expands the plane spirally!

---

## Standard Form for Complex Eigenvalues

When $A$ is a $2 \times 2$ real matrix with complex eigenvalues $\lambda = a \pm bi$, we can write:

$$A = PCP^{-1}$$

where:

$$C = \begin{bmatrix} a & -b \\ b & a \end{bmatrix}$$

This is called the **real canonical form** or **rotation-scaling form**.

In polar coordinates:

$$C = r\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

where $r = \sqrt{a^2 + b^2}$ and $\theta = \arctan(b/a)$.

**Example:** For $A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ with $\lambda = \pm i$:

$$C = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

This is already in standard form! With $r = 1, \theta = 90°$:

$$C = 1 \cdot \begin{bmatrix} \cos 90° & -\sin 90° \\ \sin 90° & \cos 90° \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

---

## Example 3: Complex Eigenvalues in Higher Dimensions

Consider the 3×3 matrix:

$$A = \begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 2 \end{bmatrix}$$

**Find eigenvalues:**

$$\det(A - \lambda I) = \det\begin{bmatrix} -\lambda & -1 & 0 \\ 1 & -\lambda & 0 \\ 0 & 0 & 2-\lambda \end{bmatrix} = (2-\lambda)(\lambda^2 + 1)$$

Eigenvalues: $\lambda_1 = i, \lambda_2 = -i, \lambda_3 = 2$

**Interpretation:** In 3D, this matrix:
- Rotates the xy-plane by 90°
- Stretches the z-axis by factor 2
- Leaves the z-axis as an invariant direction (real eigenvalue)

Complex eigenvalues indicate rotation in a 2D subspace, while real eigenvalues indicate invariant directions.

---

## Powers of Matrices with Complex Eigenvalues

Using $\lambda = re^{i\theta}$:

$$\lambda^n = r^n e^{in\theta}$$

In the rotation-scaling interpretation:
- Each application rotates by angle $\theta$
- After $n$ applications: total rotation of $n\theta$, total scaling of $r^n$

**Example:** For $A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ (90° rotation):

$$A^4 = I$$

Because rotating by 90° four times returns to the original position!

$$\lambda^4 = (e^{i\pi/2})^4 = e^{i \cdot 2\pi} = 1$$

**Example:** For $A = \begin{bmatrix} 1 & -2 \\ 2 & 1 \end{bmatrix}$ with $\lambda = 1 + 2i$:

$$|\lambda|^n = (\sqrt{5})^n$$

The magnitude grows exponentially, creating an outward spiral!

$$\arg(\lambda^n) = n \cdot \arctan(2) \approx 63.43n°$$

After $n$ steps: spiral out by factor $(\sqrt{5})^n$ while rotating $63.43n$ degrees.

---

## Stability Analysis with Complex Eigenvalues

For differential equation systems $\frac{d\mathbf{x}}{dt} = A\mathbf{x}$, eigenvalues determine stability:

**For complex eigenvalues $\lambda = a \pm bi$:**

1. **$a < 0$ (negative real part):** Spiral inward → **Stable** (spiral sink)
2. **$a > 0$ (positive real part):** Spiral outward → **Unstable** (spiral source)
3. **$a = 0$ (purely imaginary):** Circular orbit → **Marginally stable** (center)

The imaginary part $b$ determines oscillation frequency.

**Example:** For $\lambda = -0.5 \pm 3i$:
- Real part $-0.5 < 0$ → stable
- Imaginary part $3$ → oscillates with angular frequency 3
- Solution spirals inward while oscillating

---

## Complex Eigenvectors: Real and Imaginary Parts

For complex eigenvalue $\lambda = a + bi$ with eigenvector $\mathbf{v} = \mathbf{u} + i\mathbf{w}$ (where $\mathbf{u}, \mathbf{w}$ are real):

The real and imaginary parts $\mathbf{u}$ and $\mathbf{w}$ span a 2D invariant subspace where:

$$A[\mathbf{u} \; \mathbf{w}] = [\mathbf{u} \; \mathbf{w}]\begin{bmatrix} a & -b \\ b & a \end{bmatrix}$$

**Example:** For $A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ with $\mathbf{v} = \begin{bmatrix} 1 \\ -i \end{bmatrix}$:

Separate real and imaginary parts:
$$\mathbf{u} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad \mathbf{w} = \begin{bmatrix} 0 \\ -1 \end{bmatrix}$$

Then:
$$A[\mathbf{u} \; \mathbf{w}] = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = [\mathbf{u} \; \mathbf{w}]\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

This gives a real matrix factorization!

---

## Example 4: Damped Oscillator

A spring-mass system with damping satisfies:

$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = 0$$

Converting to a system with $x_1 = x, x_2 = \frac{dx}{dt}$:

$$\frac{d}{dt}\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ -k/m & -c/m \end{bmatrix}\begin{bmatrix} x_1 \\ x_2 \end{bmatrix}$$

For specific values $m = 1, c = 0.2, k = 5$:

$$A = \begin{bmatrix} 0 & 1 \\ -5 & -0.2 \end{bmatrix}$$

**Eigenvalues:**

$$\lambda^2 + 0.2\lambda + 5 = 0$$

$$\lambda = \frac{-0.2 \pm \sqrt{0.04 - 20}}{2} = \frac{-0.2 \pm \sqrt{-19.96}}{2} \approx -0.1 \pm 2.236i$$

**Interpretation:**
- Real part $-0.1 < 0$ → oscillations decay
- Imaginary part $2.236$ → oscillation frequency $\approx 2.236$ rad/s
- The system exhibits **damped oscillations**

Solution:
$$x(t) = e^{-0.1t}(A\cos(2.236t) + B\sin(2.236t))$$

The exponential term causes decay, while the trigonometric terms cause oscillation.

---

## Computing with Complex Eigenvalues

### Using Complex Arithmetic

When computing $A^n$ or $e^{At}$ with complex eigenvalues, use:

$$\lambda^n = r^n(\cos(n\theta) + i\sin(n\theta))$$

by Euler's formula: $e^{i\theta} = \cos\theta + i\sin\theta$

### Working in Real Form

Alternatively, use the real canonical form to avoid complex numbers entirely:

$$A = P\begin{bmatrix} a & -b \\ b & a \end{bmatrix}P^{-1}$$

Then:
$$A^n = P\begin{bmatrix} a & -b \\ b & a \end{bmatrix}^n P^{-1}$$

where the power can be computed using rotation and scaling.

---

## Summary

**Complex Eigenvalues of Real Matrices:**
- Appear in conjugate pairs: $\lambda = a \pm bi$
- Corresponding eigenvectors are also conjugates
- Indicate rotational behavior (no real invariant directions)

**Geometric Interpretation:**
- $r = |\lambda| = \sqrt{a^2 + b^2}$ is scaling factor
- $\theta = \arctan(b/a)$ is rotation angle
- Transformation combines rotation by $\theta$ and scaling by $r$

**Real Canonical Form:**
$$C = \begin{bmatrix} a & -b \\ b & a \end{bmatrix} = r\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

**Stability Analysis:**
- $a < 0$: stable spiral (inward)
- $a > 0$: unstable spiral (outward)
- $a = 0$: center (neutral oscillation)
- $|b|$ determines oscillation frequency

**Key Applications:**
- Oscillating systems (springs, circuits, pendulums)
- Rotation matrices and transformations
- Stability analysis in control theory
- Signal processing and vibrations
