# Physical Applications of Conformal Mapping

Conformal mappings transform physical problems from complicated domains to simpler ones while preserving the governing equations. This technique is invaluable in electrostatics, fluid dynamics, heat transfer, and other areas governed by Laplace's equation. The angle-preserving property ensures physical relationships remain intact under transformation.

## Why Conformal Maps Preserve Physics

Many physical phenomena are described by **harmonic functions** (solutions to Laplace's equation $\Delta u = 0$).

**Key Fact**: If $u$ is harmonic and $f$ is conformal, then $u \circ f^{-1}$ is harmonic in the new domain.

**Reason**: Laplace's equation is invariant under conformal transformations in two dimensions.

This allows solving problems in simple domains (disk, half-plane) and transforming back.

## Electrostatics

### Electric Potential

The electric potential $\phi$ satisfies Laplace's equation:
$$\Delta\phi = 0$$

in charge-free regions.

**Boundary conditions**: Conductors held at constant potential.

### Method

1. Identify geometry (e.g., region between conductors)
2. Map conformally to simpler domain (half-plane, strip)
3. Solve Laplace equation with transformed boundary conditions
4. Transform solution back
5. Compute electric field: $\mathbf{E} = -\nabla\phi$

### Example: Parallel Plate Capacitor

**Domain**: Strip between plates at $y = 0$ and $y = h$.

**Potential**: $\phi(x, 0) = 0$, $\phi(x, h) = V_0$.

**Solution**: By inspection, $\phi(x, y) = V_0 y/h$ (linear).

**Electric field**: $\mathbf{E} = (0, -V_0/h)$ (uniform, downward).

### Example: Cylindrical Capacitor

**Geometry**: Coaxial cylinders of radii $a$ and $b$ ($a < b$).

In 2D cross-section, annular region $a < |z| < b$.

**Potential**: $\phi(a) = V_0$, $\phi(b) = 0$.

**Solution**: Harmonic in annulus, radially symmetric:
$$\phi(r) = V_0 \frac{\log(b/r)}{\log(b/a)}$$

**Capacitance** (per unit length): $C = \frac{2\pi\epsilon_0}{\log(b/a)}$.

### Complex Potential

Combine potential $\phi$ and stream function $\psi$ into **complex potential**:
$$\Omega(z) = \phi + i\psi$$

where $\psi$ satisfies $\nabla\phi \cdot \nabla\psi = 0$ (orthogonal field lines).

$\Omega$ is analytic, and $\Omega' = \mathbf{E}_x - i\mathbf{E}_y$.

## Fluid Dynamics

### Incompressible Inviscid Flow

Velocity potential $\phi$ and stream function $\psi$ satisfy:
$$\Delta\phi = 0, \quad \Delta\psi = 0$$

**Complex potential**: $\Omega(z) = \phi + i\psi$.

Velocity: $\mathbf{v} = \nabla\phi = (\phi_x, \phi_y)$, and $\Omega'(z) = v_x - iv_y$.

### Flow Around Obstacles

Conformal mapping transforms flow around complex obstacles to flow in simpler regions.

**Example**: Flow around cylinder.

**Setup**: Uniform flow at infinity, impermeable cylinder.

**Method**: Use Joukowski transformation or direct solution in disk.

### Joukowski Airfoil

The Joukowski map:
$$w = z + \frac{1}{z}$$

transforms circles (slightly offset from origin) to airfoil shapes.

**Application**: Model lift on airfoil by computing circulation around transformed contour.

**Lift force** (Kutta-Joukowski theorem): $L = \rho V\Gamma$, where $\Gamma$ is circulation.

### Example: Flow in Channel with Obstacle

**Domain**: Channel with protruding obstacle.

**Method**:
1. Map channel to strip via Schwarz-Christoffel
2. Solve for flow in strip (often explicit)
3. Transform back to find flow around obstacle

## Heat Transfer

### Steady-State Temperature

Temperature $T$ satisfies:
$$\Delta T = 0$$

in steady state with no heat sources.

**Boundary conditions**: Specified temperatures or heat fluxes.

### Example: Heat Flow in Wedge

**Geometry**: Wedge-shaped region $0 < \arg(z) < \alpha$.

**Boundary conditions**: $T = T_1$ on lower edge, $T = T_2$ on upper edge.

**Method**: Map to strip via $w = z^{\pi/\alpha}$, solve in strip, transform back.

**Solution**:
$$T(r, \theta) = T_1 + (T_2 - T_1)\frac{\theta}{\alpha}$$

(Temperature linearly depends on angle.)

### Example: Cooling Fin

**Geometry**: Fin extending from heated base.

**Method**: Map fin geometry to simpler domain, solve heat equation, find temperature distribution and heat flux.

## Gravitational Potential

In two dimensions, gravitational potential satisfies Laplace's equation (away from masses).

**Application**: Potential flow of fluid under gravity, tidal forces.

## Electromagnetic Waveguides

Cross-sections of waveguides often have complex shapes. Conformal mapping aids in:
- Finding mode structure
- Computing cutoff frequencies
- Analyzing field distributions

## Example: Mapping Upper Half-Plane to Disk

**Problem**: Find electric potential in unit disk with specified boundary values.

**Method**: Map disk to upper half-plane via:
$$w = i\frac{1 + z}{1 - z}$$

Inverse:
$$z = \frac{w - i}{w + i}$$

Solve Laplace equation in half-plane (easier), then transform solution.

**Poisson Kernel**: Explicit formula for harmonic extension from boundary data.

## Example: Potential Between Eccentric Cylinders

**Geometry**: Two cylinders, one inside the other, not concentric.

**Method**: Bipolar coordinates or Möbius transformation maps this to concentric cylinders (annulus).

**Solution**: After transformation, potential is logarithmic; transform back for original geometry.

## Advantages of Conformal Mapping

1. **Simplification**: Complex domains become simple (disk, half-plane, strip)
2. **Explicit solutions**: Often available in simple domains
3. **Preservation of equations**: Laplace equation unchanged
4. **Geometric insight**: Reveals symmetries and structure

## Limitations

1. **Two dimensions only**: Conformal maps in 3D are too rigid (only Möbius)
2. **Numerical challenges**: Finding map for arbitrary domain may require numerics
3. **Boundary complexity**: Highly irregular boundaries difficult to handle

## Computational Tools

Modern software handles conformal mapping:
- **MATLAB**: Schwarz-Christoffel Toolbox
- **Python**: `conformal` libraries
- **Mathematica**: Built-in functions for common maps

## Summary

- **Electrostatics**: Solve for potential between conductors
- **Fluid dynamics**: Flow around obstacles, airfoil theory
- **Heat transfer**: Temperature distribution in complex geometries
- **Method**: Map to simple domain, solve, transform back
- **Complex potential**: $\Omega = \phi + i\psi$ combines potential and stream function
- **Key property**: Laplace equation preserved by conformal maps
- Applications span physics and engineering
- Powerful technique for two-dimensional problems
