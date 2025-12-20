## Introduction

Applications of integration extend calculus beyond abstract mathematics into the physical world. While derivatives describe rates of change, integrals accumulate quantities—and this accumulation principle solves problems ranging from finding volumes of irregular solids to computing forces on dam walls, from determining work done by variable forces to locating balance points of complex objects.

**Why This Matters:**
Integration transforms local information (derivatives, densities, forces at a point) into global quantities (areas, volumes, total work, centers of mass). Engineers use these techniques to design structures, analyze fluid dynamics, and optimize energy usage. Physicists apply them to mechanics, electromagnetism, and thermodynamics. Even economists use integration to model cumulative effects and consumer surplus.

**Learning Objectives:**
- Compute volumes of solids of revolution using disk, washer, and shell methods
- Find arc lengths of curves in rectangular and parametric form
- Calculate surface areas of solids of revolution
- Determine work done by variable forces, including springs and pumping fluids
- Compute hydrostatic force on submerged surfaces
- Locate centers of mass and centroids of regions and curves
- Apply Pappus's Theorem to relate centroids to volumes and surface areas

---

## Core Concepts

### Volumes of Solids of Revolution

When a region in the plane is rotated about a line, it sweeps out a three-dimensional solid. Two fundamental methods compute these volumes:

**Disk/Washer Method:** Slice perpendicular to the axis of revolution, creating circular cross-sections (disks or washers).

For rotation about the x-axis:
$$V = \int_a^b \pi [R(x)]^2 \, dx \quad \text{or} \quad V = \int_a^b \pi\left([R(x)]^2 - [r(x)]^2\right) \, dx$$

where $R(x)$ is the outer radius and $r(x)$ is the inner radius (if there's a hole).

**Shell Method:** Slice parallel to the axis of revolution, creating cylindrical shells.

For rotation about the y-axis:
$$V = \int_a^b 2\pi x f(x) \, dx$$

The shell method often avoids solving for inverse functions and can simplify the setup.

**When to use which:**
- Use disks/washers when slicing perpendicular to the axis is natural
- Use shells when slicing parallel to the axis avoids inverse functions
- Both methods give the same answer—choose based on simplicity

### Arc Length

The length of a smooth curve measures the actual distance traveled along the curve, not just the straight-line distance between endpoints.

**For $y = f(x)$ from $x = a$ to $x = b$:**
$$L = \int_a^b \sqrt{1 + [f'(x)]^2} \, dx$$

**For parametric curves** $x = f(t)$, $y = g(t)$ from $t = a$ to $t = b$:
$$L = \int_a^b \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

The formula comes from the Pythagorean theorem applied to infinitesimal line segments. Arc length integrals are often challenging to evaluate and may require numerical methods.

### Surface Area of Revolution

Rotating a curve about an axis generates a surface. The surface area combines arc length with rotation:

$$S = \int 2\pi r \, ds$$

where $r$ is the distance from the axis and $ds$ is the arc length element.

**For rotation about the x-axis:**
$$S = \int_a^b 2\pi f(x) \sqrt{1 + [f'(x)]^2} \, dx$$

**For rotation about the y-axis:**
$$S = \int_a^b 2\pi x \sqrt{1 + [f'(x)]^2} \, dx$$

The formula represents "unwrapping" thin bands of the surface: circumference $2\pi r$ times slant height $ds$.

### Work

Work quantifies energy transfer when a force acts over a distance. For variable forces:

$$W = \int_a^b F(x) \, dx$$

**Hooke's Law** for springs: $F(x) = kx$, giving:
$$W = \frac{k}{2}(b^2 - a^2)$$

**Pumping liquids:** Different layers must be lifted different distances. For a tank:
- Slice the fluid into thin horizontal layers
- Compute weight of each layer: $F = \delta \cdot \text{volume}$
- Compute distance each layer must be lifted
- Integrate: $W = \int \delta \cdot A(y) \cdot d(y) \, dy$

Work problems require careful setup of coordinates and attention to which variable represents position.

### Hydrostatic Force and Pressure

Pressure in a fluid increases with depth: $P = \delta h$ (where $\delta$ is weight density and $h$ is depth).

For a **vertical surface** submerged in fluid:
$$F = \int_a^b \delta y \cdot w(y) \, dy$$

where $y$ is depth and $w(y)$ is the width of the surface at that depth.

**Key insight:** Pressure varies linearly with depth, so we must integrate. Horizontal surfaces have constant pressure and use $F = PA$.

Applications include dam design, underwater windows, and gates in locks.

### Center of Mass and Centroids

The **centroid** is the geometric center of a region (assuming uniform density). The **center of mass** accounts for variable density.

**For a plane region** between curves:
$$\bar{x} = \frac{M_y}{A} = \frac{\int x \, dA}{\int dA}, \quad \bar{y} = \frac{M_x}{A} = \frac{\int y \, dA}{\int dA}$$

For regions between $y = f(x)$ (top) and $y = g(x)$ (bottom):
$$\bar{x} = \frac{\int_a^b x[f(x) - g(x)] \, dx}{\int_a^b [f(x) - g(x)] \, dx}$$

$$\bar{y} = \frac{\int_a^b \frac{1}{2}[f(x)^2 - g(x)^2] \, dx}{\int_a^b [f(x) - g(x)] \, dx}$$

**Pappus's Theorem** relates volumes and surface areas of revolution to centroids:
- **Volume**: $V = 2\pi \bar{r} A$ (distance from centroid to axis times area)
- **Surface Area**: $S = 2\pi \bar{r} L$ (distance from centroid to axis times arc length)

These theorems provide elegant shortcuts and can be used to find centroids when volumes are known.

---

## Common Patterns and Problem-Solving Strategies

### Choosing the Right Method

1. **Volumes:**
   - Sketch the region and identify the axis
   - Choose disks/washers if perpendicular slices are simpler
   - Choose shells if it avoids inverse functions or multiple integrals

2. **Arc Length and Surface Area:**
   - Check if $1 + [f'(x)]^2$ is a perfect square—many textbook problems are designed this way
   - Be prepared for difficult integrals; numerical methods are often necessary

3. **Work:**
   - Identify whether force is constant or variable
   - For pumping, slice perpendicular to gravity and track distances carefully

4. **Hydrostatic Force:**
   - Always use depth as the variable (positive downward from surface)
   - Width function $w(y)$ describes the horizontal extent at each depth

5. **Centroids:**
   - Look for symmetry—it often eliminates one integral
   - For complex regions, consider splitting into simpler pieces

### General Integration Strategy

1. **Sketch the situation** (region, solid, tank, surface)
2. **Choose coordinates** that simplify the problem
3. **Identify the infinitesimal element** ($dV$, $ds$, $dW$, $dF$, $dA$)
4. **Express everything in terms of one variable**
5. **Set up the integral** with correct limits
6. **Evaluate** using substitution, parts, or numerical methods
7. **Check units and reasonableness** of the answer

---

## Common Mistakes and Debugging

### Mistake 1: Wrong Variable of Integration
For volumes about the y-axis using disks, you must express everything in terms of $y$ and use $dy$. Mixing variables is a common error.

### Mistake 2: Forgetting Factors
- **Volumes:** Don't forget the $\pi$ in disk/washer or $2\pi$ in shells
- **Surface area:** Don't forget the $\sqrt{1 + [f'(x)]^2}$ factor
- **Work on pumping:** Don't forget the density $\delta$

### Mistake 3: Incorrect Radius
For rotation about non-standard axes (like $x = k$ or $y = k$), the radius is the distance from the curve to that line, not to the origin.

### Mistake 4: Limits of Integration
Always verify limits match the variable of integration and the physical setup. For pumping problems, ensure depth corresponds to where the fluid actually is.

### Mistake 5: Sign Errors
In hydrostatic force, depth should be positive downward. In work problems, ensure distance lifted is positive.

---

## Best Practices

1. **Always sketch first**—visualizing the problem prevents setup errors
2. **Use symmetry**—it can cut your work in half (literally)
3. **Check special cases**—does your formula give the right answer for simple shapes (sphere, cylinder, cone)?
4. **Keep track of units**—dimensional analysis catches many errors
5. **Verify formulas**—for volumes, does $V = \text{base area} \times \text{height}$ hold for cylinders?
6. **Test reasonableness**—is the centroid inside the region? Is the force positive?

---

## Connections to Other Topics

- **Calculus I:** These applications build directly on definite integrals and area between curves
- **Physics:** Work, force, pressure, and center of mass are fundamental concepts in mechanics
- **Differential Equations:** Many of these setups lead to differential equations in advanced courses
- **Multivariable Calculus:** These ideas extend to triple integrals for volumes and surface integrals
- **Engineering:** Structural analysis, fluid mechanics, and thermodynamics all use these techniques

---

## Summary

Applications of integration demonstrate calculus's power to solve real-world problems:

- **Volumes** via disks, washers, or shells—choose based on geometry
- **Arc length** measures distance along curves using $\sqrt{1 + [f'(x)]^2}$
- **Surface area** combines rotation with arc length: $2\pi r \, ds$
- **Work** integrates variable forces: springs, pumping, lifting
- **Hydrostatic force** accounts for pressure varying with depth
- **Centroids** locate balance points; Pappus connects them to volumes

Each application follows the same principle: slice the problem into infinitesimal pieces, compute the contribution of each piece, and integrate. Mastering these techniques provides both practical problem-solving skills and deeper insight into how calculus models continuous change and accumulation.

---

## Further Exploration

- **Solids with known cross-sections:** Volumes where cross-sections are squares, triangles, or other shapes
- **Moments of inertia:** Rotational analogs of mass, important in engineering dynamics
- **Fluid flow:** Volumetric flow rates and flux through surfaces
- **Economic applications:** Consumer and producer surplus as integrals
- **Probability:** Expected values and continuous distributions use integration over densities
