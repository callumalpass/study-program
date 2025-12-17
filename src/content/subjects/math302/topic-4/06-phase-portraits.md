---
title: "Phase Portraits and Classification of Equilibria"
---

# Phase Portraits and Classification of Equilibria

## Phase Space and Phase Portraits

For a 2D system $\mathbf{x}' = \mathbf{f}(\mathbf{x})$ where $\mathbf{x} = (x_1, x_2)$, the **phase space** (or **phase plane**) is the $x_1x_2$-plane.

A **phase portrait** is a geometric representation showing:
- **Trajectories**: Solution curves in the phase plane
- **Equilibrium points**: Where $\mathbf{f}(\mathbf{x}^*) = \mathbf{0}$
- **Direction field**: Arrows indicating $\mathbf{f}(\mathbf{x})$ at various points

Phase portraits reveal qualitative behavior without explicitly solving equations.

## Equilibrium Points

An **equilibrium point** (or **critical point**, **fixed point**, **stationary point**) $\mathbf{x}^*$ satisfies:
$$\mathbf{f}(\mathbf{x}^*) = \mathbf{0}$$

For linear systems $\mathbf{x}' = A\mathbf{x}$, the origin $\mathbf{0}$ is always an equilibrium.

For nonlinear systems, equilibria are found by solving $\mathbf{f}(\mathbf{x}) = \mathbf{0}$.

## Classification of Equilibria for Linear Systems

For $\mathbf{x}' = A\mathbf{x}$ (2×2 system), the behavior near the origin depends on the eigenvalues $\lambda_1, \lambda_2$ of $A$.

### Case 1: Real, Distinct Eigenvalues

**Both negative** ($\lambda_1, \lambda_2 < 0$):
- **Stable node** (or **sink**)
- All trajectories approach origin as $t \to \infty$
- Asymptotically stable

**Both positive** ($\lambda_1, \lambda_2 > 0$):
- **Unstable node** (or **source**)
- All trajectories diverge from origin
- Unstable

**Opposite signs** ($\lambda_1 < 0 < \lambda_2$):
- **Saddle point**
- Trajectories approach along stable eigendirection ($\lambda_1$)
- Trajectories diverge along unstable eigendirection ($\lambda_2$)
- Unstable (hyperbolic)

#### Example 1: Stable Node

$$A = \begin{pmatrix} -2 & 0 \\ 0 & -3 \end{pmatrix}$$

Eigenvalues: $\lambda_1 = -2$, $\lambda_2 = -3$ (both negative)

Eigenvectors: $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$

General solution:
$$\mathbf{x}(t) = c_1e^{-2t}\begin{pmatrix} 1 \\ 0 \end{pmatrix} + c_2e^{-3t}\begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

**Behavior**: Trajectories decay exponentially toward origin, faster along $x_2$ axis (since $|-3| > |-2|$).

**Classification**: **Stable node**

#### Example 2: Saddle Point

$$A = \begin{pmatrix} 1 & 0 \\ 0 & -2 \end{pmatrix}$$

Eigenvalues: $\lambda_1 = 1$, $\lambda_2 = -2$

**Behavior**:
- Along $x_1$ axis ($\mathbf{v}_1$): Exponential growth
- Along $x_2$ axis ($\mathbf{v}_2$): Exponential decay

**Classification**: **Saddle point** (unstable)

### Case 2: Complex Conjugate Eigenvalues

For $\lambda = \alpha \pm i\beta$ with $\beta \neq 0$:

**$\alpha < 0$**:
- **Spiral sink** (or **stable spiral**, **stable focus**)
- Trajectories spiral inward
- Asymptotically stable

**$\alpha = 0$**:
- **Center** (or **elliptic point**)
- Closed elliptical orbits
- Neutrally stable (not asymptotically stable)

**$\alpha > 0$**:
- **Spiral source** (or **unstable spiral**, **unstable focus**)
- Trajectories spiral outward
- Unstable

#### Example 3: Spiral Sink

$$A = \begin{pmatrix} -1 & -2 \\ 2 & -1 \end{pmatrix}$$

Characteristic equation: $\lambda^2 + 2\lambda + 5 = 0$

$$\lambda = \frac{-2 \pm \sqrt{4-20}}{2} = -1 \pm 2i$$

So $\alpha = -1 < 0$, $\beta = 2$.

**Classification**: **Spiral sink** (asymptotically stable)

#### Example 4: Center

$$A = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

Eigenvalues: $\lambda = \pm i$ (purely imaginary: $\alpha = 0$, $\beta = 1$)

**Classification**: **Center** (periodic orbits, neutrally stable)

### Case 3: Repeated Eigenvalues

**Complete eigenvectors** (diagonalizable):
- **Proper node** (stable if $\lambda < 0$, unstable if $\lambda > 0$)
- All trajectories approach/leave along eigendirections

**Deficient eigenvectors** (non-diagonalizable):
- **Improper node** (degenerate node)
- Trajectories tangent to single eigendirection
- Stable if $\lambda < 0$, unstable if $\lambda > 0$

#### Example 5: Improper Node

$$A = \begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}$$

Eigenvalue: $\lambda = 2$ (multiplicity 2)

Only one eigenvector: $\mathbf{v} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$

**Classification**: **Unstable improper node**

## Summary of Classification (2D Linear Systems)

| Eigenvalues | Type | Stability |
|-------------|------|-----------|
| $\lambda_1, \lambda_2 < 0$ (real, distinct) | Stable node | Asymptotically stable |
| $\lambda_1, \lambda_2 > 0$ (real, distinct) | Unstable node | Unstable |
| $\lambda_1 < 0 < \lambda_2$ (real, opposite) | Saddle point | Unstable |
| $\lambda = \alpha \pm i\beta$, $\alpha < 0$ | Spiral sink | Asymptotically stable |
| $\lambda = \pm i\beta$ (purely imaginary) | Center | Neutrally stable |
| $\lambda = \alpha \pm i\beta$, $\alpha > 0$ | Spiral source | Unstable |
| $\lambda$ repeated, complete eigenvectors | Proper node | Stable ($\lambda < 0$) or unstable ($\lambda > 0$) |
| $\lambda$ repeated, deficient eigenvectors | Improper node | Stable ($\lambda < 0$) or unstable ($\lambda > 0$) |

## Trace-Determinant Plane

For a 2×2 matrix $A$, the **trace** and **determinant** classify the equilibrium:

$$\tau = \text{tr}(A) = a_{11} + a_{22} = \lambda_1 + \lambda_2$$
$$\Delta = \det(A) = a_{11}a_{22} - a_{12}a_{21} = \lambda_1\lambda_2$$

**Discriminant**: $D = \tau^2 - 4\Delta$

### Classification Regions

**Parabola** $\tau^2 = 4\Delta$:
- $D = 0$: Repeated eigenvalues

**Above parabola** ($\tau^2 > 4\Delta$):
- $D > 0$: Real, distinct eigenvalues
- $\Delta > 0$, $\tau < 0$: Stable node
- $\Delta > 0$, $\tau > 0$: Unstable node
- $\Delta < 0$: Saddle point

**Below parabola** ($\tau^2 < 4\Delta$):
- $D < 0$: Complex eigenvalues
- $\tau < 0$: Spiral sink
- $\tau = 0$: Center
- $\tau > 0$: Spiral source

### Example 6: Using Trace-Determinant

$$A = \begin{pmatrix} -3 & 2 \\ -1 & -1 \end{pmatrix}$$

$$\tau = -3 + (-1) = -4$$
$$\Delta = (-3)(-1) - (2)(-1) = 3 + 2 = 5$$
$$D = 16 - 20 = -4 < 0$$

Complex eigenvalues. Since $\tau < 0$:

**Classification**: **Spiral sink** (stable)

## Nonlinear Systems: Linearization

For nonlinear $\mathbf{x}' = \mathbf{f}(\mathbf{x})$, behavior near equilibrium $\mathbf{x}^*$ is approximated by linearizing:

$$\mathbf{x}' \approx J(\mathbf{x}^*) (\mathbf{x} - \mathbf{x}^*)$$

where $J$ is the **Jacobian matrix**:
$$J = \begin{pmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} \\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2}
\end{pmatrix}$$

evaluated at $\mathbf{x}^*$.

The eigenvalues of $J(\mathbf{x}^*)$ determine local behavior (if not on boundary cases).

### Example 7: Predator-Prey Equilibrium

$$\begin{cases}
x' = x(2 - y) \\
y' = y(x - 1)
\end{cases}$$

**Equilibria**: Set $x' = 0$ and $y' = 0$:
- $(0, 0)$
- $(1, 2)$

**Linearize at $(1, 2)$**:

Jacobian:
$$J = \begin{pmatrix}
2 - y & -x \\
y & x - 1
\end{pmatrix}$$

At $(1, 2)$:
$$J(1, 2) = \begin{pmatrix}
0 & -1 \\
2 & 0
\end{pmatrix}$$

Eigenvalues: $\det(J - \lambda I) = \lambda^2 + 2 = 0 \Rightarrow \lambda = \pm i\sqrt{2}$

**Classification**: **Center** (for linear approximation)

The nonlinear system may differ slightly (e.g., spiraling instead of exact circles).

## Hartman-Grobman Theorem

**Theorem**: If the equilibrium $\mathbf{x}^*$ is **hyperbolic** (all eigenvalues of Jacobian have non-zero real parts), then the nonlinear system near $\mathbf{x}^*$ is topologically equivalent to its linearization.

**Hyperbolic types**: Nodes, saddles, spirals (NOT centers or marginal cases)

**Non-hyperbolic**: Centers, degenerate nodes (linearization may not capture full behavior)

## Nullclines

**Nullclines** are curves where one component of $\mathbf{x}'$ is zero:

- **$x_1$-nullcline**: Where $f_1(x_1, x_2) = 0$
- **$x_2$-nullcline**: Where $f_2(x_1, x_2) = 0$

**Equilibria** occur at intersections of nullclines.

**Flow direction**:
- On $x_1$-nullcline: Motion is vertical ($x_1' = 0$)
- On $x_2$-nullcline: Motion is horizontal ($x_2' = 0$)

Nullclines help sketch phase portraits without solving.

## Limit Cycles

**Limit cycles** are isolated closed orbits in nonlinear systems (cannot occur in linear systems).

- **Stable limit cycle**: Nearby trajectories spiral toward it
- **Unstable limit cycle**: Nearby trajectories spiral away
- **Semi-stable**: Stable on one side, unstable on other

Example: Van der Pol oscillator

## Conclusion

Phase portraits provide a geometric understanding of system dynamics. For linear systems, eigenvalues completely determine the type and stability of equilibria. The trace-determinant plane offers a quick classification tool. For nonlinear systems, linearization near equilibria (via the Jacobian) reveals local behavior, though global dynamics may be more complex. Understanding phase portraits is essential for qualitative analysis of differential equations in applications ranging from ecology to engineering.
