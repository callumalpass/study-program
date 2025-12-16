# Vector Operations

## Introduction

Vector operations form the algebraic foundation for working with vectors in multivariable calculus and applications. The three fundamental operations—addition, subtraction, and scalar multiplication—enable us to combine vectors, find displacements, and scale magnitudes while preserving or reversing direction. These operations satisfy specific algebraic properties that make the set of vectors a vector space, providing a rich mathematical structure for analysis.

## Vector Addition

### Geometric Interpretation

Vector addition combines two vectors to produce a resultant vector. Geometrically, this can be visualized using the **parallelogram law** or the **triangle method** (head-to-tail method).

**Triangle Method**: To add $\mathbf{u}$ and $\mathbf{v}$, place the tail of $\mathbf{v}$ at the head of $\mathbf{u}$. The sum $\mathbf{u} + \mathbf{v}$ is the vector from the tail of $\mathbf{u}$ to the head of $\mathbf{v}$.

**Parallelogram Law**: Place both vectors with their tails at the same point. The sum is the diagonal of the parallelogram formed by these vectors.

### Component-wise Addition

For vectors $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$ and $\mathbf{v} = \langle v_1, v_2, v_3 \rangle$:

$$\mathbf{u} + \mathbf{v} = \langle u_1 + v_1, u_2 + v_2, u_3 + v_3 \rangle$$

Each component of the sum equals the sum of the corresponding components.

### Example

Let $\mathbf{u} = \langle 2, 3, -1 \rangle$ and $\mathbf{v} = \langle -1, 4, 2 \rangle$. Then:

$$\mathbf{u} + \mathbf{v} = \langle 2 + (-1), 3 + 4, -1 + 2 \rangle = \langle 1, 7, 1 \rangle$$

### Properties of Vector Addition

Vector addition satisfies several important algebraic properties:

1. **Commutativity**: $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$

2. **Associativity**: $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$

3. **Identity Element**: $\mathbf{u} + \mathbf{0} = \mathbf{u}$, where $\mathbf{0}$ is the zero vector

4. **Additive Inverse**: For each $\mathbf{u}$, there exists $-\mathbf{u}$ such that $\mathbf{u} + (-\mathbf{u}) = \mathbf{0}$

These properties establish that vectors under addition form an abelian group.

## Vector Subtraction

### Definition

Vector subtraction is defined as the addition of the additive inverse:

$$\mathbf{u} - \mathbf{v} = \mathbf{u} + (-\mathbf{v})$$

where $-\mathbf{v}$ is the vector with the same magnitude as $\mathbf{v}$ but opposite direction.

### Component-wise Subtraction

For vectors $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$ and $\mathbf{v} = \langle v_1, v_2, v_3 \rangle$:

$$\mathbf{u} - \mathbf{v} = \langle u_1 - v_1, u_2 - v_2, u_3 - v_3 \rangle$$

### Geometric Interpretation

The difference $\mathbf{u} - \mathbf{v}$ represents the vector from the head of $\mathbf{v}$ to the head of $\mathbf{u}$ when both vectors are placed with their tails at the origin. Alternatively, place both vectors tail-to-tail; the difference is the vector from the head of $\mathbf{v}$ to the head of $\mathbf{u}$.

This operation is particularly useful for finding the displacement vector between two points:

$$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$$

where $\mathbf{a}$ and $\mathbf{b}$ are position vectors of points $A$ and $B$.

### Example

Let $\mathbf{u} = \langle 5, 2, 3 \rangle$ and $\mathbf{v} = \langle 2, -1, 4 \rangle$. Then:

$$\mathbf{u} - \mathbf{v} = \langle 5 - 2, 2 - (-1), 3 - 4 \rangle = \langle 3, 3, -1 \rangle$$

### Properties

While subtraction is not commutative ($\mathbf{u} - \mathbf{v} \neq \mathbf{v} - \mathbf{u}$ in general), it satisfies:

$$\mathbf{v} - \mathbf{u} = -(\mathbf{u} - \mathbf{v})$$

## Scalar Multiplication

### Definition

**Scalar multiplication** combines a scalar (real number) $c$ with a vector $\mathbf{v}$ to produce a new vector:

$$c\mathbf{v} = \langle cv_1, cv_2, cv_3 \rangle$$

Each component is multiplied by the scalar.

### Geometric Effects

Scalar multiplication scales the magnitude of a vector:

$$|c\mathbf{v}| = |c| \cdot |\mathbf{v}|$$

The direction is preserved if $c > 0$ and reversed if $c < 0$. If $c = 0$, the result is the zero vector.

### Example

Let $\mathbf{v} = \langle 2, -3, 1 \rangle$ and $c = -3$. Then:

$$c\mathbf{v} = -3\langle 2, -3, 1 \rangle = \langle -6, 9, -3 \rangle$$

The magnitude is:

$$|c\mathbf{v}| = \sqrt{36 + 81 + 9} = \sqrt{126} = 3\sqrt{14}$$

And indeed, $|-3| \cdot |\mathbf{v}| = 3 \cdot \sqrt{4 + 9 + 1} = 3\sqrt{14}$ ✓

### Properties of Scalar Multiplication

Scalar multiplication interacts with vector addition through the distributive laws:

1. **Scalar Distributivity**: $c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$

2. **Vector Distributivity**: $(c + d)\mathbf{v} = c\mathbf{v} + d\mathbf{v}$

3. **Associativity**: $(cd)\mathbf{v} = c(d\mathbf{v})$

4. **Identity**: $1 \cdot \mathbf{v} = \mathbf{v}$

These properties, combined with those of vector addition, establish that vectors form a **vector space** over the real numbers.

## Linear Combinations

### Definition

A **linear combination** of vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n$ is an expression of the form:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_n\mathbf{v}_n$$

where $c_1, c_2, \ldots, c_n$ are scalars.

### Example

Express $\mathbf{w} = \langle 7, 1 \rangle$ as a linear combination of $\mathbf{u} = \langle 2, 1 \rangle$ and $\mathbf{v} = \langle 1, -1 \rangle$.

We seek scalars $c_1$ and $c_2$ such that:

$$c_1\mathbf{u} + c_2\mathbf{v} = \mathbf{w}$$

$$c_1\langle 2, 1 \rangle + c_2\langle 1, -1 \rangle = \langle 7, 1 \rangle$$

This gives the system:

$$2c_1 + c_2 = 7$$
$$c_1 - c_2 = 1$$

Adding these equations: $3c_1 = 8$, so $c_1 = 8/3$.

Substituting: $c_2 = 7 - 2(8/3) = 7 - 16/3 = 5/3$.

Therefore:

$$\mathbf{w} = \frac{8}{3}\mathbf{u} + \frac{5}{3}\mathbf{v}$$

### Span

The **span** of a set of vectors is the set of all possible linear combinations of those vectors. For example, the span of $\mathbf{i}$ and $\mathbf{j}$ is all of $\mathbb{R}^2$.

## Unit Vectors Revisited

Using scalar multiplication, we can express any vector in terms of its magnitude and direction:

$$\mathbf{v} = |\mathbf{v}| \cdot \mathbf{u}$$

where $\mathbf{u} = \mathbf{v}/|\mathbf{v}|$ is the unit vector in the direction of $\mathbf{v}$.

This decomposition separates magnitude (a scalar) from direction (a unit vector).

## Parallel Vectors

### Definition

Two non-zero vectors $\mathbf{u}$ and $\mathbf{v}$ are **parallel** if one is a scalar multiple of the other:

$$\mathbf{u} = c\mathbf{v} \text{ for some scalar } c$$

If $c > 0$, the vectors point in the same direction. If $c < 0$, they point in opposite directions.

### Example

The vectors $\mathbf{u} = \langle 6, -9, 3 \rangle$ and $\mathbf{v} = \langle -2, 3, -1 \rangle$ are parallel because:

$$\mathbf{u} = -3\mathbf{v}$$

## Applications in Physics

### Displacement and Velocity

If an object moves from position $\mathbf{r}_1$ at time $t_1$ to position $\mathbf{r}_2$ at time $t_2$, the displacement is:

$$\Delta \mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1$$

The average velocity is:

$$\mathbf{v}_{\text{avg}} = \frac{\Delta \mathbf{r}}{\Delta t} = \frac{\mathbf{r}_2 - \mathbf{r}_1}{t_2 - t_1}$$

### Force Resultants

When multiple forces act on an object, the net force is the vector sum:

$$\mathbf{F}_{\text{net}} = \mathbf{F}_1 + \mathbf{F}_2 + \cdots + \mathbf{F}_n$$

This principle extends to any vector quantity: electric fields, magnetic fields, etc.

## Midpoint Formula

The midpoint $M$ between points $A$ and $B$ with position vectors $\mathbf{a}$ and $\mathbf{b}$ has position vector:

$$\mathbf{m} = \frac{\mathbf{a} + \mathbf{b}}{2}$$

This follows from the fact that $\mathbf{m}$ is equidistant from both points.

### Example

Find the midpoint between $A(1, 2, 3)$ and $B(5, 6, 1)$:

$$\mathbf{m} = \frac{\langle 1, 2, 3 \rangle + \langle 5, 6, 1 \rangle}{2} = \frac{\langle 6, 8, 4 \rangle}{2} = \langle 3, 4, 2 \rangle$$

So $M(3, 4, 2)$.

## Section Formula

More generally, a point $P$ that divides the line segment from $A$ to $B$ in the ratio $m:n$ has position vector:

$$\mathbf{p} = \frac{n\mathbf{a} + m\mathbf{b}}{m + n}$$

When $m = n = 1$, this reduces to the midpoint formula.

## Vector Equations of Lines

Vector operations enable us to write parametric equations for lines. The line through point $P_0$ with position vector $\mathbf{r}_0$ in the direction of vector $\mathbf{v}$ is:

$$\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$$

where $t$ is a parameter. As $t$ varies over all real numbers, $\mathbf{r}(t)$ traces out the entire line.

### Example

Find the vector equation of the line through $(2, -1, 3)$ in the direction of $\mathbf{v} = \langle 1, 4, -2 \rangle$:

$$\mathbf{r}(t) = \langle 2, -1, 3 \rangle + t\langle 1, 4, -2 \rangle = \langle 2 + t, -1 + 4t, 3 - 2t \rangle$$

## Summary

Vector addition, subtraction, and scalar multiplication are the fundamental operations that endow the set of vectors with the structure of a vector space. These operations satisfy algebraic properties including commutativity, associativity, and distributivity. Geometrically, addition combines vectors using the parallelogram law, subtraction finds displacement, and scalar multiplication scales magnitude while preserving or reversing direction. These operations form the basis for more advanced topics in vector calculus, including dot products, cross products, and vector-valued functions.
