---
id: math401-topic-7-7
title: "Applications to Physics and Engineering"
order: 7
---

# Boundary Value Problems

Boundary value problems (BVPs) seek functions satisfying a differential equation in a domain with specified conditions on the boundary. Conformal mapping is a powerful tool for solving BVPs involving harmonic functions, transforming complex domains into simpler ones where solutions are known or easily computed.

## The Dirichlet Problem

The **Dirichlet problem** asks: Given a domain $\Omega$ and continuous function $g: \partial\Omega \to \mathbb{R}$, find harmonic $u: \Omega \to \mathbb{R}$ such that:

$$\begin{cases}
\Delta u = 0 & \text{in } \Omega \\
u = g & \text{on } \partial\Omega
\end{cases}$$

**Existence and Uniqueness**: For reasonable domains (e.g., bounded with smooth boundary), the Dirichlet problem has a unique solution.

**Uniqueness proof**: If $u_1, u_2$ are solutions, then $w = u_1 - u_2$ is harmonic with $w = 0$ on boundary. By maximum principle, $w = 0$ everywhere.

## Poisson Kernel for Disk

For the unit disk $\mathbb{D} = \{z : |z| < 1\}$ with boundary data $g(\theta)$ on $|z| = 1$, the solution is:

$$u(re^{i\phi}) = \frac{1}{2\pi}\int_0^{2\pi} \frac{1 - r^2}{1 - 2r\cos(\theta - \phi) + r^2} g(\theta) d\theta$$

The kernel:
$$P_r(\theta - \phi) = \frac{1 - r^2}{1 - 2r\cos(\theta - \phi) + r^2}$$

is the **Poisson kernel** for the disk.

**Derivation**: Use harmonic extension formula from complex analysis. If $g$ extends to analytic $f$ on boundary, then:
$$u(z) = \text{Re}(f(z))$$

For general $g$, use Poisson integral formula.

## Poisson Kernel for Half-Plane

For upper half-plane $\mathbb{H} = \{z : \text{Im}(z) > 0\}$ with boundary data $g(x)$ on real axis:

$$u(x + iy) = \frac{y}{\pi}\int_{-\infty}^{\infty} \frac{g(t)}{(x-t)^2 + y^2} dt$$

The kernel:
$$P_y(x - t) = \frac{y}{\pi[(x-t)^2 + y^2]}$$

is the **Poisson kernel** for the half-plane.

## Using Conformal Mapping

**Strategy**: To solve Dirichlet problem in domain $\Omega$:

1. Find conformal map $f: \Omega \to \mathbb{D}$ (or to $\mathbb{H}$)
2. Transform boundary data: $\tilde{g} = g \circ f^{-1}$ on $\partial\mathbb{D}$
3. Solve Dirichlet problem in $\mathbb{D}$ using Poisson kernel
4. Transform back: $u = \tilde{u} \circ f$

**Why it works**: Composition of harmonic function with conformal map is harmonic.

## Example: Dirichlet Problem in Upper Half-Disk

**Domain**: $\Omega = \{z : |z| < 1, \text{Im}(z) > 0\}$ (upper half of unit disk).

**Boundary**: Semicircle $|z| = 1, \text{Im}(z) \geq 0$ and diameter $[-1, 1]$ on real axis.

**Boundary data**: $g(z) = 1$ on semicircle, $g(x) = 0$ on diameter.

**Method**:

1. Map $\Omega$ to upper half-plane via $w = \frac{1+z}{1-z}$ (maps semicircle to positive imaginary axis, diameter to positive real axis)
2. Transform boundary data to $\mathbb{H}$
3. Solve in $\mathbb{H}$ using Poisson kernel
4. Transform back via $z = \frac{w-1}{w+1}$

**Solution**: After computation,
$$u(z) = \frac{2}{\pi}\arg\left(\frac{1+z}{1-z}\right)$$

## The Neumann Problem

The **Neumann problem** specifies normal derivative on boundary:

$$\begin{cases}
\Delta u = 0 & \text{in } \Omega \\
\frac{\partial u}{\partial n} = h & \text{on } \partial\Omega
\end{cases}$$

**Compatibility condition**: $\int_{\partial\Omega} h ds = 0$ (necessary for existence).

**Uniqueness**: Solution unique up to additive constant.

## Green's Functions

The **Green's function** $G(z, w)$ for domain $\Omega$ solves:

$$\Delta_z G(z, w) = \delta(z - w) \quad \text{with} \quad G(z, w) = 0 \text{ for } z \in \partial\Omega$$

**Solution to Dirichlet problem**:
$$u(w) = -\int_{\partial\Omega} g(z) \frac{\partial G}{\partial n_z}(z, w) ds_z$$

**Green's function for disk**: 
$$G(z, w) = \log\left|\frac{z - w}{1 - \overline{w}z}\right| = \log|z - w| - \log|1 - \overline{w}z|$$

for unit disk.

**Construction via conformal mapping**: If $f: \Omega \to \mathbb{D}$, then:
$$G_\Omega(z, w) = G_\mathbb{D}(f(z), f(w))$$

## Example: Rectangle

**Domain**: Rectangle $[0, a] \times [0, b]$.

**Boundary conditions**: $u = 0$ on three sides, $u = g(x)$ on top side $y = b$.

**Method**: Separate variables or use Schwarz-Christoffel to map to half-plane.

**Series solution** (separation of variables):
$$u(x, y) = \sum_{n=1}^{\infty} A_n \sin\left(\frac{n\pi x}{a}\right)\sinh\left(\frac{n\pi y}{a}\right)$$

where coefficients $A_n$ determined by Fourier series of $g$.

## Mixed Boundary Conditions

**Problem**: Different conditions on different boundary segments.

**Example**: $u = g_1$ on $\Gamma_1$, $\frac{\partial u}{\partial n} = h_2$ on $\Gamma_2$.

**Solution**: Often requires more advanced techniques (integral equations, numerical methods).

## Harmonic Measure

For domain $\Omega$ and boundary set $E \subset \partial\Omega$, the **harmonic measure** $\omega(z, E, \Omega)$ is the solution to Dirichlet problem with boundary data:

$$g = \begin{cases} 1 & \text{on } E \\ 0 & \text{on } \partial\Omega \setminus E \end{cases}$$

**Interpretation**: Probability that Brownian motion starting at $z$ exits $\Omega$ through $E$.

**Conformal invariance**: Harmonic measure is preserved by conformal maps.

## Numerical Methods

For domains without explicit conformal maps, numerical methods solve BVPs:

1. **Finite Differences**: Discretize Laplace equation on grid
2. **Finite Elements**: Variational formulation, triangular mesh
3. **Boundary Element Method**: Reduce to boundary integral equation
4. **Conformal Mapping Numerics**: Approximate conformal map, then use Poisson kernel

## Applications

### Electrostatics

Boundary conditions: potential specified on conductors.

**Example**: Potential between two cylinders.

### Steady-State Heat Flow

Boundary conditions: temperature or heat flux specified.

**Example**: Temperature in irregularly shaped plate.

### Fluid Flow

Boundary conditions: no-penetration condition on obstacles.

**Example**: Flow around airfoil.

## Summary

- **Dirichlet problem**: $\Delta u = 0$ with $u = g$ on boundary
- **Neumann problem**: $\Delta u = 0$ with $\frac{\partial u}{\partial n} = h$ on boundary
- **Poisson kernel**: Explicit solution for disk and half-plane
- **Conformal mapping strategy**: Transform domain, solve, transform back
- **Green's function**: Fundamental solution for Dirichlet problem
- **Harmonic measure**: Probability interpretation, conformally invariant
- **Numerical methods**: Required for complex domains
- Powerful technique connecting complex analysis, PDEs, and physics
