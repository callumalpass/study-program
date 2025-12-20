---
id: math301-topic-1-5
title: "Lines and Planes"
order: 5
---

# Lines and Planes in Space

## Introduction

Lines and planes are fundamental geometric objects in three-dimensional space. Using vectors, we can describe these objects through elegant parametric and algebraic equations. Vector methods provide powerful tools for analyzing intersections, angles, distances, and other geometric relationships. Understanding lines and planes is essential for applications in computer graphics, physics, engineering, and optimization.

## Lines in Space

### Vector Equation of a Line

A line in $\mathbb{R}^3$ can be specified by a point on the line and a direction vector. If the line passes through point $P_0$ with position vector $\mathbf{r}_0 = \langle x_0, y_0, z_0 \rangle$ and is parallel to vector $\mathbf{v} = \langle a, b, c \rangle$, then the **vector equation** is:

$$\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$$

As the parameter $t$ ranges over all real numbers, $\mathbf{r}(t)$ traces out the entire line.

### Parametric Equations

Expanding the vector equation into components gives the **parametric equations**:

$$x = x_0 + at$$
$$y = y_0 + bt$$
$$z = z_0 + ct$$

Each coordinate is expressed as a function of the parameter $t$.

### Example

Find parametric equations for the line through $P_0(2, -1, 3)$ parallel to $\mathbf{v} = \langle 1, 4, -2 \rangle$.

$$x = 2 + t$$
$$y = -1 + 4t$$
$$z = 3 - 2t$$

When $t = 0$, we get the point $(2, -1, 3)$. When $t = 1$, we get $(3, 3, 1)$, and so on.

### Symmetric Equations

If $a, b, c \neq 0$, we can solve each parametric equation for $t$ and equate:

$$\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}$$

These are called the **symmetric equations** of the line. They eliminate the parameter but require all direction components to be non-zero.

### Example

For the line through $(2, -1, 3)$ with direction $\langle 1, 4, -2 \rangle$:

$$\frac{x - 2}{1} = \frac{y + 1}{4} = \frac{z - 3}{-2}$$

### Line Through Two Points

To find the line through points $P(x_1, y_1, z_1)$ and $Q(x_2, y_2, z_2)$, use $P$ as the point and $\overrightarrow{PQ}$ as the direction vector:

$$\mathbf{r}(t) = \mathbf{p} + t(\mathbf{q} - \mathbf{p}) = (1-t)\mathbf{p} + t\mathbf{q}$$

### Example

Find the line through $P(1, 0, 2)$ and $Q(3, -2, 1)$.

Direction vector: $\overrightarrow{PQ} = \langle 2, -2, -1 \rangle$

Parametric equations:
$$x = 1 + 2t, \quad y = -2t, \quad z = 2 - t$$

## Parallel and Skew Lines

### Parallel Lines

Two lines with direction vectors $\mathbf{v}_1$ and $\mathbf{v}_2$ are **parallel** if $\mathbf{v}_1 = c\mathbf{v}_2$ for some scalar $c$.

### Intersecting Lines

Lines intersect if there exist parameter values where they coincide. To find the intersection, set their parametric equations equal and solve for the parameters.

### Example

Determine if the lines $\mathbf{r}_1(t) = \langle 1, 2, 3 \rangle + t\langle 1, -1, 2 \rangle$ and $\mathbf{r}_2(s) = \langle 2, 1, 5 \rangle + s\langle 2, -2, 4 \rangle$ intersect.

Setting equal:
$$\langle 1 + t, 2 - t, 3 + 2t \rangle = \langle 2 + 2s, 1 - 2s, 5 + 4s \rangle$$

This gives:
$$1 + t = 2 + 2s \implies t = 1 + 2s$$
$$2 - t = 1 - 2s \implies t = 1 + 2s$$
$$3 + 2t = 5 + 4s \implies 2t = 2 + 4s \implies t = 1 + 2s$$

All three equations give the same relationship, so the lines intersect. Setting $s = 0$ gives $t = 1$, and the intersection point is:

$$\mathbf{r}_1(1) = \langle 2, 1, 5 \rangle$$

Note that $\mathbf{v}_2 = 2\mathbf{v}_1$, so the lines are actually the same line (coincident).

### Skew Lines

Lines that are not parallel and do not intersect are called **skew lines**. This situation can only occur in three or more dimensions.

## Planes in Space

### Equation Using Normal Vector

A plane is determined by a point $P_0(x_0, y_0, z_0)$ on the plane and a **normal vector** $\mathbf{n} = \langle a, b, c \rangle$ perpendicular to the plane.

For any point $P(x, y, z)$ on the plane, the vector $\overrightarrow{P_0P} = \langle x - x_0, y - y_0, z - z_0 \rangle$ lies in the plane, hence is perpendicular to $\mathbf{n}$:

$$\mathbf{n} \cdot \overrightarrow{P_0P} = 0$$

$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$

This is the **point-normal form** of the plane equation.

### Standard Form

Expanding the point-normal form:

$$ax + by + cz = ax_0 + by_0 + cz_0 = d$$

where $d = ax_0 + by_0 + cz_0$. This is the **standard form**:

$$ax + by + cz = d$$

The coefficients $\langle a, b, c \rangle$ give a normal vector to the plane.

### Example

Find the equation of the plane through $P_0(2, 1, -1)$ with normal vector $\mathbf{n} = \langle 3, -2, 4 \rangle$.

$$3(x - 2) - 2(y - 1) + 4(z + 1) = 0$$

$$3x - 6 - 2y + 2 + 4z + 4 = 0$$

$$3x - 2y + 4z = 0$$

### Plane Through Three Points

Given three non-collinear points $P$, $Q$, and $R$, find two vectors in the plane:

$$\mathbf{u} = \overrightarrow{PQ}, \quad \mathbf{v} = \overrightarrow{PR}$$

The normal vector is:

$$\mathbf{n} = \mathbf{u} \times \mathbf{v}$$

Then use the point-normal form with any of the three points.

### Example

Find the plane through $P(1, 0, 0)$, $Q(0, 1, 0)$, and $R(0, 0, 1)$.

$$\overrightarrow{PQ} = \langle -1, 1, 0 \rangle, \quad \overrightarrow{PR} = \langle -1, 0, 1 \rangle$$

$$\mathbf{n} = \overrightarrow{PQ} \times \overrightarrow{PR} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -1 & 1 & 0 \\ -1 & 0 & 1 \end{vmatrix} = \langle 1, 1, 1 \rangle$$

Using point $P(1, 0, 0)$:

$$1(x - 1) + 1(y - 0) + 1(z - 0) = 0$$

$$x + y + z = 1$$

## Parallel and Perpendicular Planes

### Parallel Planes

Two planes with normal vectors $\mathbf{n}_1$ and $\mathbf{n}_2$ are **parallel** if $\mathbf{n}_1 = c\mathbf{n}_2$ for some scalar $c$.

For planes $a_1x + b_1y + c_1z = d_1$ and $a_2x + b_2y + c_2z = d_2$, they are parallel if:

$$\langle a_1, b_1, c_1 \rangle = k\langle a_2, b_2, c_2 \rangle$$

### Perpendicular Planes

Two planes are **perpendicular** if their normal vectors are perpendicular:

$$\mathbf{n}_1 \cdot \mathbf{n}_2 = 0$$

### Example

Determine the relationship between planes $2x - y + 3z = 5$ and $x + 2y + z = 1$.

Normal vectors: $\mathbf{n}_1 = \langle 2, -1, 3 \rangle$, $\mathbf{n}_2 = \langle 1, 2, 1 \rangle$

$$\mathbf{n}_1 \cdot \mathbf{n}_2 = 2 - 2 + 3 = 3 \neq 0$$

The planes are neither parallel nor perpendicular.

## Angle Between Planes

The angle $\theta$ between two planes equals the angle between their normal vectors:

$$\cos \theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1| |\mathbf{n}_2|}$$

The absolute value ensures $0 \le \theta \le \pi/2$.

### Example

Find the angle between planes $x + y + z = 1$ and $x - 2y + 3z = 5$.

$$\mathbf{n}_1 = \langle 1, 1, 1 \rangle, \quad \mathbf{n}_2 = \langle 1, -2, 3 \rangle$$

$$\mathbf{n}_1 \cdot \mathbf{n}_2 = 1 - 2 + 3 = 2$$

$$|\mathbf{n}_1| = \sqrt{3}, \quad |\mathbf{n}_2| = \sqrt{14}$$

$$\cos \theta = \frac{|2|}{\sqrt{3} \cdot \sqrt{14}} = \frac{2}{\sqrt{42}}$$

$$\theta = \arccos\left(\frac{2}{\sqrt{42}}\right) \approx 72.0°$$

## Line-Plane Intersection

To find where line $\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$ intersects plane $ax + by + cz = d$, substitute the parametric equations into the plane equation and solve for $t$.

### Example

Find where line $\mathbf{r}(t) = \langle 1, 0, 1 \rangle + t\langle 2, 1, -1 \rangle$ intersects plane $x + y + z = 5$.

Parametric equations: $x = 1 + 2t$, $y = t$, $z = 1 - t$

Substituting:
$$(1 + 2t) + t + (1 - t) = 5$$
$$2 + 2t = 5$$
$$t = \frac{3}{2}$$

Intersection point:
$$\mathbf{r}(3/2) = \langle 1 + 3, 3/2, 1 - 3/2 \rangle = \langle 4, 3/2, -1/2 \rangle$$

### Parallel Line and Plane

If $\mathbf{v} \cdot \mathbf{n} = 0$, the line is parallel to the plane. The line either lies entirely in the plane or never intersects it.

## Distance from Point to Plane

The distance from point $P_1(x_1, y_1, z_1)$ to plane $ax + by + cz = d$ is:

$$D = \frac{|ax_1 + by_1 + cz_1 - d|}{\sqrt{a^2 + b^2 + c^2}} = \frac{|ax_1 + by_1 + cz_1 - d|}{|\mathbf{n}|}$$

### Derivation

The distance is the absolute value of the scalar projection of $\overrightarrow{P_0P_1}$ onto the normal vector, where $P_0$ is any point on the plane.

### Example

Find the distance from $P(1, 2, 3)$ to plane $2x - y + 2z = 1$.

$$D = \frac{|2(1) - 2 + 2(3) - 1|}{\sqrt{4 + 1 + 4}} = \frac{|2 - 2 + 6 - 1|}{3} = \frac{5}{3}$$

## Distance from Point to Line

To find the distance from point $Q$ to line $\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$:

1. Form vector $\mathbf{w} = \overrightarrow{P_0Q}$, where $P_0$ is the point on the line
2. Compute the cross product $\mathbf{w} \times \mathbf{v}$
3. The distance is:

$$D = \frac{|\mathbf{w} \times \mathbf{v}|}{|\mathbf{v}|}$$

This formula arises because $|\mathbf{w} \times \mathbf{v}| = |\mathbf{w}| |\mathbf{v}| \sin \theta$, and the perpendicular distance is $|\mathbf{w}| \sin \theta$.

### Example

Find the distance from $Q(1, 1, 1)$ to line $\mathbf{r}(t) = \langle 2, 0, 0 \rangle + t\langle 1, 1, 0 \rangle$.

$$\mathbf{w} = \langle 1 - 2, 1 - 0, 1 - 0 \rangle = \langle -1, 1, 1 \rangle$$

$$\mathbf{v} = \langle 1, 1, 0 \rangle$$

$$\mathbf{w} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -1 & 1 & 1 \\ 1 & 1 & 0 \end{vmatrix} = \langle -1, 1, -2 \rangle$$

$$D = \frac{\sqrt{1 + 1 + 4}}{\sqrt{1 + 1}} = \frac{\sqrt{6}}{\sqrt{2}} = \sqrt{3}$$

## Applications

### Computer Graphics

- Ray-plane intersection for rendering
- Clipping algorithms
- Shadow calculations

### Physics

- Reflection of light off surfaces
- Collision detection
- Constraint surfaces in mechanics

### Engineering

- Structural analysis
- Robot path planning
- CAD/CAM systems

## Summary

Lines in three-dimensional space are described by vector equations $\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$, parametric equations, or symmetric equations. Planes are characterized by a normal vector and a point, leading to the equation $ax + by + cz = d$. The normal vector encodes the plane's orientation, while the cross product generates normals from vectors in the plane. These representations enable efficient computation of intersections, angles, and distances, forming the geometric foundation for applications in graphics, physics, and engineering.
