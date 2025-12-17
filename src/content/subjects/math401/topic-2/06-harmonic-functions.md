# Harmonic Functions

Harmonic functions are solutions to Laplace's equation, one of the most important partial differential equations in mathematics and physics. In complex analysis, harmonic functions are intimately connected to analytic functions: the real and imaginary parts of any analytic function are harmonic. This connection provides powerful tools for solving boundary value problems and understanding physical phenomena.

## Laplace's Equation

**Laplace's equation** in two dimensions is:

$$\nabla^2 u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$$

where $\nabla^2$ (or $\Delta$) is the **Laplacian operator**.

A function $u: D \subseteq \mathbb{R}^2 \to \mathbb{R}$ is **harmonic** on $D$ if it has continuous second partial derivatives and satisfies Laplace's equation throughout $D$.

## Physical Interpretation

Harmonic functions arise in numerous physical contexts:

1. **Electrostatics**: Electric potential in a charge-free region
2. **Fluid dynamics**: Velocity potential for irrotational, incompressible flow
3. **Heat conduction**: Steady-state temperature distribution
4. **Gravitational potential**: In vacuum regions
5. **Membrane vibration**: Equilibrium position

Laplace's equation describes equilibrium states where there are no sources or sinks.

## Connection to Analytic Functions

### Harmonic Components Theorem

**Theorem**: If $f(z) = u(x, y) + iv(x, y)$ is analytic on a domain $D$, then both $u$ and $v$ are harmonic on $D$.

**Proof**: Since $f$ is analytic, the Cauchy-Riemann equations hold:
$$u_x = v_y, \quad u_y = -v_x$$

Assuming continuous second partial derivatives (which follows from analyticity):
$$u_{xx} = v_{yx} = v_{xy}, \quad u_{yy} = -v_{xy}$$

Therefore:
$$\nabla^2 u = u_{xx} + u_{yy} = v_{xy} - v_{xy} = 0$$

Similarly, $\nabla^2 v = 0$.

### Examples

1. **$f(z) = z^2$**:
   - $u(x, y) = x^2 - y^2$
   - $u_{xx} = 2, u_{yy} = -2$
   - $\nabla^2 u = 2 - 2 = 0$ ✓

2. **$f(z) = e^z$**:
   - $u(x, y) = e^x \cos y$
   - $u_{xx} = e^x \cos y, u_{yy} = -e^x \cos y$
   - $\nabla^2 u = 0$ ✓

3. **$f(z) = \log z$** (principal branch):
   - $u(x, y) = \frac{1}{2}\log(x^2 + y^2) = \log|z|$
   - $u_x = \frac{x}{x^2 + y^2}, u_y = \frac{y}{x^2 + y^2}$
   - $u_{xx} = \frac{(x^2+y^2) - x(2x)}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2}$
   - $u_{yy} = \frac{x^2 - y^2}{(x^2+y^2)^2}$
   - $\nabla^2 u = 0$ ✓

## Harmonic Conjugates

### Definition

If $u$ is harmonic on a domain $D$, a function $v$ is called a **harmonic conjugate** of $u$ if:
1. $v$ is harmonic on $D$
2. $u + iv$ is analytic on $D$

Equivalently, $v$ is a harmonic conjugate of $u$ if the Cauchy-Riemann equations hold:
$$u_x = v_y, \quad u_y = -v_x$$

### Finding Harmonic Conjugates

**Method**: Given harmonic $u$, integrate the Cauchy-Riemann equations.

**Example**: Find a harmonic conjugate of $u(x, y) = x^2 - y^2$.

From $u_x = v_y$:
$$v_y = \frac{\partial u}{\partial x} = 2x$$

Integrate with respect to $y$:
$$v(x, y) = \int 2x \, dy = 2xy + g(x)$$

From $u_y = -v_x$:
$$-v_x = u_y = -2y \implies v_x = 2y$$

Differentiate the expression for $v$:
$$v_x = 2y + g'(x)$$

Comparing: $g'(x) = 0$, so $g(x) = C$ (constant).

Therefore: $v(x, y) = 2xy + C$.

Check: $f(z) = (x^2 - y^2) + i(2xy + C) = z^2 + iC$ is analytic ✓

### Uniqueness

**Theorem**: If $D$ is connected and $v_1, v_2$ are both harmonic conjugates of $u$ on $D$, then $v_1 - v_2$ is constant.

**Proof**: Let $f_1 = u + iv_1$ and $f_2 = u + iv_2$. Both are analytic, so $f_1 - f_2 = i(v_1 - v_2)$ is analytic. Since its real part is zero, it must be a purely imaginary constant.

### Existence

**Theorem**: If $u$ is harmonic on a simply connected domain $D$, then there exists a harmonic conjugate $v$ on $D$.

The simply connected condition is essential: on non-simply connected domains (like an annulus), a harmonic conjugate may not exist globally.

**Counterexample**: Let $u(x, y) = \frac{1}{2}\log(x^2 + y^2)$ on the punctured plane $\mathbb{C} \setminus \{0\}$.

This is harmonic, but its harmonic conjugate is multi-valued: $v = \arg(z)$, which is not single-valued on $\mathbb{C} \setminus \{0\}$.

## Properties of Harmonic Functions

### Mean Value Property

**Theorem**: If $u$ is harmonic on a domain containing the closed disk $\overline{D}(z_0, r)$, then:

$$u(z_0) = \frac{1}{2\pi} \int_0^{2\pi} u(z_0 + re^{i\theta}) d\theta$$

The value at the center is the average of values on the circle.

**Proof**: Let $f = u + iv$ be analytic. By Cauchy's integral formula (which we'll prove later):
$$f(z_0) = \frac{1}{2\pi i} \oint_{|z-z_0|=r} \frac{f(z)}{z - z_0} dz$$

Taking real parts and parameterizing the circle yields the result.

### Maximum Principle

**Theorem (Maximum Principle for Harmonic Functions)**: If $u$ is harmonic and non-constant on a connected open set $D$, then $u$ has no local maximum or minimum in $D$.

**Corollary**: On a bounded domain with boundary $\partial D$, if $u$ is harmonic on $D$ and continuous on $\overline{D}$, then:
$$\min_{\partial D} u \leq u(z) \leq \max_{\partial D} u \quad \text{for all } z \in D$$

The extreme values occur only on the boundary.

**Physical interpretation**: In steady-state heat distribution, the hottest and coldest points are on the boundary, not in the interior.

### Uniqueness of Solutions

**Corollary**: The Dirichlet problem (finding $u$ harmonic on $D$ with given boundary values) has at most one solution.

**Proof**: If $u_1$ and $u_2$ are both solutions, then $w = u_1 - u_2$ is harmonic with $w = 0$ on $\partial D$. By the maximum principle, $w \leq 0$ and $w \geq 0$ throughout $D$, so $w = 0$ and $u_1 = u_2$.

### Smoothness

**Theorem**: Harmonic functions are infinitely differentiable ($C^\infty$).

This follows from the connection to analytic functions: if $u$ is harmonic on a simply connected domain, $u$ is the real part of an analytic function, which is $C^\infty$.

## Poisson's Equation

The non-homogeneous version of Laplace's equation is **Poisson's equation**:

$$\nabla^2 u = f$$

for some given function $f$.

In electrostatics, $f$ represents charge density. Solutions to Poisson's equation can be expressed using Green's functions.

When $f = 0$, we recover Laplace's equation (harmonic functions).

## Harmonic Functions in Polar Coordinates

In polar coordinates $(r, \theta)$, Laplace's equation becomes:

$$\nabla^2 u = \frac{\partial^2 u}{\partial r^2} + \frac{1}{r}\frac{\partial u}{\partial r} + \frac{1}{r^2}\frac{\partial^2 u}{\partial \theta^2} = 0$$

### Separation of Variables

Seek solutions of the form $u(r, \theta) = R(r)\Theta(\theta)$:

$$\Theta(\theta)R''(r) + \frac{1}{r}\Theta(\theta)R'(r) + \frac{1}{r^2}R(r)\Theta''(\theta) = 0$$

Multiply by $r^2/(R\Theta)$:
$$\frac{r^2 R''(r) + rR'(r)}{R(r)} = -\frac{\Theta''(\theta)}{\Theta(\theta)} = \lambda$$

This yields:
- Angular equation: $\Theta''(\theta) + \lambda\Theta(\theta) = 0$
- Radial equation: $r^2 R''(r) + rR'(r) - \lambda R(r) = 0$

For periodicity in $\theta$, we need $\lambda = n^2$ for integer $n$, giving:
$$\Theta_n(\theta) = A_n \cos(n\theta) + B_n \sin(n\theta)$$

$$R_n(r) = C_n r^n + D_n r^{-n}$$

General harmonic function:
$$u(r, \theta) = A_0 + B_0 \ln r + \sum_{n=1}^{\infty} (C_n r^n + D_n r^{-n})(A_n \cos(n\theta) + B_n \sin(n\theta))$$

### Example: Harmonic in an Annulus

For $1 < r < 2$ with boundary conditions $u(1, \theta) = \cos\theta$ and $u(2, \theta) = 0$:

The solution is a specific linear combination of the above terms satisfying the boundary conditions.

## Dirichlet Problem

The **Dirichlet problem** is: given a domain $D$ and continuous function $g: \partial D \to \mathbb{R}$, find $u$ harmonic on $D$ with $u|_{\partial D} = g$.

### Poisson Formula for the Disk

For the unit disk, the solution is:

$$u(re^{i\theta}) = \frac{1}{2\pi} \int_0^{2\pi} g(\phi) \frac{1 - r^2}{1 - 2r\cos(\theta - \phi) + r^2} d\phi$$

This is the **Poisson integral formula**.

### Existence and Uniqueness

For "nice" domains (e.g., bounded with smooth boundary), the Dirichlet problem has a unique solution. This is proven using potential theory and the maximum principle.

## Applications

### Fluid Dynamics

For 2D incompressible, irrotational flow, the velocity potential $\phi$ and stream function $\psi$ satisfy:
- $\nabla^2 \phi = 0$ (irrotational)
- $\nabla^2 \psi = 0$ (incompressible)
- $\phi + i\psi$ is analytic (complex potential)

### Electrostatics

The electric potential $V$ in a charge-free region satisfies $\nabla^2 V = 0$. Finding $V$ given boundary conditions is a Dirichlet problem.

### Conformal Mapping

Harmonic functions transform under conformal mappings. If $w = f(z)$ is analytic and $u$ is harmonic in the $w$-plane, then $u \circ f$ is harmonic in the $z$-plane.

This allows us to solve Dirichlet problems on complicated domains by mapping to simpler domains (like disks).

**Example**: Solve Laplace's equation on a half-plane by mapping it to a disk using $w = \frac{z - i}{z + i}$ (Cayley transform).

## Subharmonic and Superharmonic Functions

A function $u$ is **subharmonic** if $\nabla^2 u \geq 0$.

A function $u$ is **superharmonic** if $\nabla^2 u \leq 0$.

**Example**: $u(x, y) = |z|^2 = x^2 + y^2$ has $\nabla^2 u = 2 + 2 = 4 > 0$, so it's subharmonic.

**Theorem**: If $f$ is analytic, then $|f|$ is subharmonic.

This generalizes the maximum modulus principle.

## Green's Functions

For a domain $D$, the **Green's function** $G(z, w)$ satisfies:
- $\nabla^2_z G(z, w) = \delta(z - w)$ (Dirac delta)
- $G(z, w) = 0$ for $z \in \partial D$

The solution to the Dirichlet problem can be expressed using $G$:
$$u(z) = -\int_{\partial D} g(w) \frac{\partial G}{\partial n}(z, w) dw$$

Green's functions are fundamental in solving boundary value problems.

## Summary

- **Harmonic functions**: satisfy $\nabla^2 u = u_{xx} + u_{yy} = 0$
- Real and imaginary parts of analytic functions are harmonic
- **Harmonic conjugate**: $v$ such that $u + iv$ is analytic (satisfies Cauchy-Riemann)
- Found by integrating Cauchy-Riemann equations; unique up to a constant
- **Mean value property**: value at center equals average on any circle
- **Maximum principle**: extreme values occur on the boundary, not interior
- **Dirichlet problem**: find harmonic $u$ with given boundary values
- **Poisson formula**: explicit solution for Dirichlet problem on disk
- Applications: electrostatics, fluid dynamics, heat conduction, conformal mapping
- Harmonic functions provide a bridge between complex analysis and mathematical physics
- The theory of harmonic functions is intimately tied to the geometric properties of analytic functions
