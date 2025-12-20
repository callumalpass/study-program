# Vectors in $\mathbb{R}^n$

Vectors are the fundamental objects of linear algebra. While we're most familiar with vectors in two and three dimensions from physics and geometry, linear algebra extends the concept to $n$ dimensions. This generalization provides a powerful framework for representing data, solving systems of equations, and modeling relationships in high-dimensional spaces.

## What is a Vector in $\mathbb{R}^n$?

A **vector in $\mathbb{R}^n$** is an ordered list of $n$ real numbers. We write vectors as column matrices:

$$\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix}$$

The entries $v_1, v_2, \ldots, v_n$ are called the **components** or **coordinates** of the vector. The set of all such vectors is denoted $\mathbb{R}^n$ (read as "R-n" or "n-space").

**Examples:**

In $\mathbb{R}^2$: $\begin{bmatrix} 3 \\ -2 \end{bmatrix}$

In $\mathbb{R}^3$: $\begin{bmatrix} 1 \\ 0 \\ 5 \end{bmatrix}$

In $\mathbb{R}^4$: $\begin{bmatrix} 2 \\ -1 \\ 3 \\ 7 \end{bmatrix}$

Note: For convenience, we sometimes write vectors horizontally as $(v_1, v_2, \ldots, v_n)$, but they are formally column vectors.

## Geometric Interpretation

### Vectors in $\mathbb{R}^2$

In the plane, a vector $\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \end{bmatrix}$ represents a directed line segment from the origin $(0, 0)$ to the point $(v_1, v_2)$.

- The **direction** is from the origin to the point
- The **magnitude** (or length) is the distance: $\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2}$

For example, $\mathbf{v} = \begin{bmatrix} 3 \\ 4 \end{bmatrix}$ points from $(0, 0)$ to $(3, 4)$ with length $\|\mathbf{v}\| = \sqrt{9 + 16} = 5$.

**Key insight:** While we draw vectors starting at the origin, a vector represents a *displacement*, not a specific location. The vector $\begin{bmatrix} 3 \\ 4 \end{bmatrix}$ represents "move 3 units right, 4 units up" from wherever you start.

### Vectors in $\mathbb{R}^3$

In three dimensions, $\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix}$ is an arrow from the origin to the point $(v_1, v_2, v_3)$ in space. The magnitude is:

$$\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2}$$

### Beyond Three Dimensions

For $n > 3$, we lose the ability to visualize vectors directly, but the algebraic operations remain the same. A vector in $\mathbb{R}^{100}$ is just a list of 100 numbers, and we can still compute its length:

$$\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$$

In data science, vectors in $\mathbb{R}^n$ represent data points with $n$ features. In quantum mechanics, state vectors live in infinite-dimensional spaces.

## Vector Operations

### Vector Addition

To add vectors $\mathbf{u}$ and $\mathbf{v}$ in $\mathbb{R}^n$, add corresponding components:

$$\mathbf{u} + \mathbf{v} = \begin{bmatrix} u_1 \\ u_2 \\ \vdots \\ u_n \end{bmatrix} + \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} = \begin{bmatrix} u_1 + v_1 \\ u_2 + v_2 \\ \vdots \\ u_n + v_n \end{bmatrix}$$

**Example in $\mathbb{R}^3$:**

$$\begin{bmatrix} 1 \\ -2 \\ 3 \end{bmatrix} + \begin{bmatrix} 4 \\ 5 \\ -1 \end{bmatrix} = \begin{bmatrix} 5 \\ 3 \\ 2 \end{bmatrix}$$

**Geometric interpretation:** The parallelogram rule. Place the tail of $\mathbf{v}$ at the head of $\mathbf{u}$. The sum $\mathbf{u} + \mathbf{v}$ is the vector from the tail of $\mathbf{u}$ to the head of $\mathbf{v}$. Equivalently, $\mathbf{u} + \mathbf{v}$ is the diagonal of the parallelogram formed by $\mathbf{u}$ and $\mathbf{v}$.

**Properties:**
- **Commutative:** $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$
- **Associative:** $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$
- **Zero vector:** $\mathbf{0} = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$ satisfies $\mathbf{v} + \mathbf{0} = \mathbf{v}$
- **Additive inverse:** For each $\mathbf{v}$, there exists $-\mathbf{v}$ such that $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$

### Scalar Multiplication

To multiply a vector $\mathbf{v}$ by a scalar (real number) $c$, multiply each component:

$$c\mathbf{v} = c\begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} = \begin{bmatrix} cv_1 \\ cv_2 \\ \vdots \\ cv_n \end{bmatrix}$$

**Example:**

$$3\begin{bmatrix} 1 \\ -2 \\ 4 \end{bmatrix} = \begin{bmatrix} 3 \\ -6 \\ 12 \end{bmatrix}$$

**Geometric interpretation:** Scalar multiplication scales the vector by $|c|$ and reverses direction if $c < 0$.

- If $c > 1$: stretches the vector
- If $0 < c < 1$: shrinks the vector
- If $c = 0$: produces the zero vector
- If $c < 0$: reflects and scales

For example, $2\mathbf{v}$ points in the same direction as $\mathbf{v}$ but is twice as long. The vector $-\mathbf{v}$ points in the opposite direction with the same length.

**Properties:**
- **Distributive over vector addition:** $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$
- **Distributive over scalar addition:** $(c + d)\mathbf{v} = c\mathbf{v} + d\mathbf{v}$
- **Associative:** $c(d\mathbf{v}) = (cd)\mathbf{v}$
- **Identity:** $1\mathbf{v} = \mathbf{v}$

### Linear Combinations

A **linear combination** of vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p$ is any expression of the form:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_p\mathbf{v}_p$$

where $c_1, c_2, \ldots, c_p$ are scalars (called **coefficients** or **weights**).

**Example:** Express $\mathbf{b} = \begin{bmatrix} 7 \\ 2 \end{bmatrix}$ as a linear combination of $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$ and $\mathbf{v}_2 = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$.

We need to find $c_1$ and $c_2$ such that:

$$c_1\begin{bmatrix} 1 \\ 2 \end{bmatrix} + c_2\begin{bmatrix} 3 \\ 1 \end{bmatrix} = \begin{bmatrix} 7 \\ 2 \end{bmatrix}$$

This gives us a system of equations:
$$\begin{align}
c_1 + 3c_2 &= 7 \\
2c_1 + c_2 &= 2
\end{align}$$

Solving: From the second equation, $c_1 = 1 - \frac{c_2}{2}$. Substituting into the first:
$$1 - \frac{c_2}{2} + 3c_2 = 7$$
$$1 + \frac{5c_2}{2} = 7$$
$$c_2 = \frac{12}{5}$$

Then $c_1 = 1 - \frac{6}{5} = -\frac{1}{5}$.

Therefore: $\mathbf{b} = -\frac{1}{5}\mathbf{v}_1 + \frac{12}{5}\mathbf{v}_2$.

**Geometric interpretation in $\mathbb{R}^2$:** A linear combination $c_1\mathbf{v}_1 + c_2\mathbf{v}_2$ is obtained by:
1. Scaling $\mathbf{v}_1$ by $c_1$
2. Scaling $\mathbf{v}_2$ by $c_2$
3. Adding the results using the parallelogram rule

## Vector Equality

Two vectors are **equal** if and only if all corresponding components are equal:

$$\begin{bmatrix} u_1 \\ u_2 \\ \vdots \\ u_n \end{bmatrix} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} \iff u_i = v_i \text{ for all } i = 1, 2, \ldots, n$$

Importantly, vectors must have the same dimension to be equal. A vector in $\mathbb{R}^2$ cannot equal a vector in $\mathbb{R}^3$.

## Standard Unit Vectors

In $\mathbb{R}^n$, the **standard unit vectors** are:

$$\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad \ldots, \quad \mathbf{e}_n = \begin{bmatrix} 0 \\ 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}$$

Each has a single 1 in one position and 0s elsewhere. They're called "unit" vectors because each has length 1.

**Key property:** Every vector in $\mathbb{R}^n$ can be written as a linear combination of the standard unit vectors:

$$\begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{bmatrix} = v_1\mathbf{e}_1 + v_2\mathbf{e}_2 + \cdots + v_n\mathbf{e}_n$$

In $\mathbb{R}^2$ and $\mathbb{R}^3$, these are often denoted $\mathbf{i}, \mathbf{j}, \mathbf{k}$:

$$\mathbf{i} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad \mathbf{j} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

$$\mathbf{i} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \quad \mathbf{j} = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}, \quad \mathbf{k} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

## Vector Subtraction

Vector subtraction is defined using the additive inverse:

$$\mathbf{u} - \mathbf{v} = \mathbf{u} + (-\mathbf{v})$$

Component-wise:

$$\mathbf{u} - \mathbf{v} = \begin{bmatrix} u_1 - v_1 \\ u_2 - v_2 \\ \vdots \\ u_n - v_n \end{bmatrix}$$

**Geometric interpretation:** $\mathbf{u} - \mathbf{v}$ is the vector from the tip of $\mathbf{v}$ to the tip of $\mathbf{u}$ (when both start at the origin).

## Applications

### Physics: Position, Velocity, and Force

Vectors represent physical quantities with magnitude and direction:
- **Position:** $\mathbf{r}(t) = \begin{bmatrix} x(t) \\ y(t) \\ z(t) \end{bmatrix}$ locates an object in space
- **Velocity:** $\mathbf{v}(t) = \frac{d\mathbf{r}}{dt}$ is the rate of change of position
- **Force:** $\mathbf{F} = m\mathbf{a}$ relates mass and acceleration

### Computer Graphics: Transformations

3D graphics uses vectors in $\mathbb{R}^3$ (or $\mathbb{R}^4$ with homogeneous coordinates) to represent:
- Vertex positions
- Normal vectors for lighting
- Direction vectors for rays in ray tracing

### Data Science: Feature Vectors

A data point with $n$ features is represented as a vector in $\mathbb{R}^n$. For example, a house might be represented by:

$$\mathbf{x} = \begin{bmatrix} 2000 \\ 3 \\ 2 \\ 15 \end{bmatrix} \quad \text{(square feet, bedrooms, bathrooms, years old)}$$

Machine learning algorithms operate on these feature vectors to make predictions.

## Summary

- Vectors in $\mathbb{R}^n$ are ordered lists of $n$ real numbers
- Geometrically, vectors represent directed line segments (displacements)
- Vector addition follows the parallelogram rule
- Scalar multiplication scales and potentially reverses direction
- Linear combinations $c_1\mathbf{v}_1 + \cdots + c_p\mathbf{v}_p$ generate new vectors
- Standard unit vectors $\mathbf{e}_1, \ldots, \mathbf{e}_n$ form a natural coordinate system
- Vectors model physical quantities, geometric objects, and data points across mathematics, science, and engineering
