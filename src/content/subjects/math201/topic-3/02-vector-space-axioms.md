# Vector Space Axioms

The concept of a vector space abstracts the essential properties of $\mathbb{R}^n$ to create a general framework that applies to many different mathematical objects. By identifying the fundamental rules that vectors obey, we can recognize "vector-like" structures in unexpected places: polynomials, matrices, functions, and even sequences. This abstraction is one of the most powerful ideas in mathematics.

## Definition of a Vector Space

A **vector space** is a set $V$ equipped with two operations—addition and scalar multiplication—that satisfy ten axioms. The elements of $V$ are called **vectors**, and the scalars come from a field (typically the real numbers $\mathbb{R}$).

**The Two Operations:**

1. **Vector addition:** For any $\mathbf{u}, \mathbf{v} \in V$, there is a sum $\mathbf{u} + \mathbf{v} \in V$
2. **Scalar multiplication:** For any $\mathbf{v} \in V$ and scalar $c \in \mathbb{R}$, there is a product $c\mathbf{v} \in V$

These operations must satisfy the following ten axioms.

## The Ten Axioms

### Axioms 1-2: Closure Properties

**Axiom 1 (Closure under addition):** If $\mathbf{u}$ and $\mathbf{v}$ are in $V$, then $\mathbf{u} + \mathbf{v}$ is in $V$.

**Axiom 2 (Closure under scalar multiplication):** If $\mathbf{v}$ is in $V$ and $c$ is a scalar, then $c\mathbf{v}$ is in $V$.

**What this means:** The operations don't take you outside the set. If you add two vectors or scale a vector, you get another vector in the same space.

**Example:** In $\mathbb{R}^2$, adding two vectors or scaling a vector always gives another vector in $\mathbb{R}^2$.

**Non-example:** Consider the set of vectors in $\mathbb{R}^2$ with positive components: $V = \{(x, y) : x > 0, y > 0\}$. This fails closure under scalar multiplication because $(-1)(1, 1) = (-1, -1) \notin V$.

### Axioms 3-6: Addition Axioms

**Axiom 3 (Commutativity of addition):** For all $\mathbf{u}, \mathbf{v} \in V$:
$$\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$$

The order of addition doesn't matter.

**Axiom 4 (Associativity of addition):** For all $\mathbf{u}, \mathbf{v}, \mathbf{w} \in V$:
$$(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$$

We can add vectors in any grouping.

**Axiom 5 (Existence of zero vector):** There exists a vector $\mathbf{0} \in V$ such that for all $\mathbf{v} \in V$:
$$\mathbf{v} + \mathbf{0} = \mathbf{v}$$

There's an additive identity element.

**Axiom 6 (Existence of additive inverses):** For each $\mathbf{v} \in V$, there exists a vector $-\mathbf{v} \in V$ such that:
$$\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$$

Every vector has a negative.

**Example in $\mathbb{R}^n$:** The zero vector is $\mathbf{0} = (0, 0, \ldots, 0)$, and the additive inverse of $(v_1, \ldots, v_n)$ is $(-v_1, \ldots, -v_n)$.

### Axioms 7-10: Scalar Multiplication Axioms

**Axiom 7 (Distributivity of scalar multiplication over vector addition):** For all scalars $c$ and vectors $\mathbf{u}, \mathbf{v} \in V$:
$$c(\mathbf{u} + \mathbf{v}) = c\mathbf{u} + c\mathbf{v}$$

Scaling a sum equals the sum of the scaled parts.

**Axiom 8 (Distributivity of scalar multiplication over scalar addition):** For all scalars $c, d$ and vector $\mathbf{v} \in V$:
$$(c + d)\mathbf{v} = c\mathbf{v} + d\mathbf{v}$$

Adding scalars then multiplying equals multiplying then adding.

**Axiom 9 (Associativity of scalar multiplication):** For all scalars $c, d$ and vector $\mathbf{v} \in V$:
$$c(d\mathbf{v}) = (cd)\mathbf{v}$$

Scaling twice is the same as scaling by the product.

**Axiom 10 (Scalar multiplication identity):** For all $\mathbf{v} \in V$:
$$1\mathbf{v} = \mathbf{v}$$

Multiplying by 1 doesn't change the vector.

## Why These Axioms?

These ten axioms capture exactly the properties needed to:
- Solve linear equations
- Perform linear combinations
- Define concepts like linear independence, basis, and dimension
- Develop the theory of linear transformations

Any set satisfying these axioms behaves algebraically like $\mathbb{R}^n$, even if the elements aren't "vectors" in the geometric sense.

## Verifying the Axioms: Complete Example

Let's verify that $\mathbb{R}^2$ with standard operations is a vector space.

**Set:** $V = \mathbb{R}^2 = \left\{\begin{bmatrix} x \\ y \end{bmatrix} : x, y \in \mathbb{R}\right\}$

**Addition:** $\begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \begin{bmatrix} x_2 \\ y_2 \end{bmatrix} = \begin{bmatrix} x_1 + x_2 \\ y_1 + y_2 \end{bmatrix}$

**Scalar multiplication:** $c\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} cx \\ cy \end{bmatrix}$

**Verification:**

**Axiom 1:** If $\mathbf{u}, \mathbf{v} \in \mathbb{R}^2$, then $\mathbf{u} + \mathbf{v}$ has real number components (since sums of real numbers are real), so $\mathbf{u} + \mathbf{v} \in \mathbb{R}^2$. ✓

**Axiom 2:** If $\mathbf{v} \in \mathbb{R}^2$ and $c \in \mathbb{R}$, then $c\mathbf{v}$ has real components (since products of reals are real), so $c\mathbf{v} \in \mathbb{R}^2$. ✓

**Axiom 3:**
$$\begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \begin{bmatrix} x_2 \\ y_2 \end{bmatrix} = \begin{bmatrix} x_1 + x_2 \\ y_1 + y_2 \end{bmatrix} = \begin{bmatrix} x_2 + x_1 \\ y_2 + y_1 \end{bmatrix} = \begin{bmatrix} x_2 \\ y_2 \end{bmatrix} + \begin{bmatrix} x_1 \\ y_1 \end{bmatrix}$$

This uses commutativity of real number addition. ✓

**Axiom 4:**
$$\left[\begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \begin{bmatrix} x_2 \\ y_2 \end{bmatrix}\right] + \begin{bmatrix} x_3 \\ y_3 \end{bmatrix} = \begin{bmatrix} x_1 + x_2 \\ y_1 + y_2 \end{bmatrix} + \begin{bmatrix} x_3 \\ y_3 \end{bmatrix} = \begin{bmatrix} (x_1 + x_2) + x_3 \\ (y_1 + y_2) + y_3 \end{bmatrix}$$

$$= \begin{bmatrix} x_1 + (x_2 + x_3) \\ y_1 + (y_2 + y_3) \end{bmatrix} = \begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \begin{bmatrix} x_2 + x_3 \\ y_2 + y_3 \end{bmatrix} = \begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \left[\begin{bmatrix} x_2 \\ y_2 \end{bmatrix} + \begin{bmatrix} x_3 \\ y_3 \end{bmatrix}\right]$$

This uses associativity of real number addition. ✓

**Axiom 5:** The zero vector is $\mathbf{0} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$. For any $\mathbf{v} = \begin{bmatrix} x \\ y \end{bmatrix}$:

$$\mathbf{v} + \mathbf{0} = \begin{bmatrix} x \\ y \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \end{bmatrix} = \begin{bmatrix} x + 0 \\ y + 0 \end{bmatrix} = \begin{bmatrix} x \\ y \end{bmatrix} = \mathbf{v}$$

✓

**Axiom 6:** For $\mathbf{v} = \begin{bmatrix} x \\ y \end{bmatrix}$, the additive inverse is $-\mathbf{v} = \begin{bmatrix} -x \\ -y \end{bmatrix}$:

$$\mathbf{v} + (-\mathbf{v}) = \begin{bmatrix} x \\ y \end{bmatrix} + \begin{bmatrix} -x \\ -y \end{bmatrix} = \begin{bmatrix} x + (-x) \\ y + (-y) \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} = \mathbf{0}$$

✓

**Axiom 7:**
$$c\left(\begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \begin{bmatrix} x_2 \\ y_2 \end{bmatrix}\right) = c\begin{bmatrix} x_1 + x_2 \\ y_1 + y_2 \end{bmatrix} = \begin{bmatrix} c(x_1 + x_2) \\ c(y_1 + y_2) \end{bmatrix}$$

$$= \begin{bmatrix} cx_1 + cx_2 \\ cy_1 + cy_2 \end{bmatrix} = \begin{bmatrix} cx_1 \\ cy_1 \end{bmatrix} + \begin{bmatrix} cx_2 \\ cy_2 \end{bmatrix} = c\begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + c\begin{bmatrix} x_2 \\ y_2 \end{bmatrix}$$

✓

**Axiom 8:**
$$(c + d)\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} (c+d)x \\ (c+d)y \end{bmatrix} = \begin{bmatrix} cx + dx \\ cy + dy \end{bmatrix} = \begin{bmatrix} cx \\ cy \end{bmatrix} + \begin{bmatrix} dx \\ dy \end{bmatrix} = c\begin{bmatrix} x \\ y \end{bmatrix} + d\begin{bmatrix} x \\ y \end{bmatrix}$$

✓

**Axiom 9:**
$$c\left(d\begin{bmatrix} x \\ y \end{bmatrix}\right) = c\begin{bmatrix} dx \\ dy \end{bmatrix} = \begin{bmatrix} c(dx) \\ c(dy) \end{bmatrix} = \begin{bmatrix} (cd)x \\ (cd)y \end{bmatrix} = (cd)\begin{bmatrix} x \\ y \end{bmatrix}$$

✓

**Axiom 10:**
$$1\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 1 \cdot x \\ 1 \cdot y \end{bmatrix} = \begin{bmatrix} x \\ y \end{bmatrix}$$

✓

All ten axioms hold, so $\mathbb{R}^2$ is a vector space.

## Properties Derived from the Axioms

From these ten axioms, we can prove additional properties that all vector spaces share:

**Theorem 1:** The zero vector is unique.

**Proof:** Suppose $\mathbf{0}$ and $\mathbf{0}'$ are both zero vectors. Then:
$$\mathbf{0}' = \mathbf{0}' + \mathbf{0} = \mathbf{0} + \mathbf{0}' = \mathbf{0}$$

The first equality uses Axiom 5 with $\mathbf{0}$ as the zero vector, the second uses Axiom 3 (commutativity), and the third uses Axiom 5 with $\mathbf{0}'$ as the zero vector. ∎

**Theorem 2:** Additive inverses are unique.

**Proof:** Suppose $\mathbf{w}$ and $\mathbf{w}'$ are both additive inverses of $\mathbf{v}$. Then:
$$\mathbf{w} = \mathbf{w} + \mathbf{0} = \mathbf{w} + (\mathbf{v} + \mathbf{w}') = (\mathbf{w} + \mathbf{v}) + \mathbf{w}' = \mathbf{0} + \mathbf{w}' = \mathbf{w}'$$

This uses Axioms 5, 6, 4, 6, and 5 again. ∎

**Theorem 3:** For any vector $\mathbf{v}$: $0\mathbf{v} = \mathbf{0}$ (the scalar zero times any vector equals the zero vector).

**Proof:**
$$0\mathbf{v} = (0 + 0)\mathbf{v} = 0\mathbf{v} + 0\mathbf{v}$$

Adding $-(0\mathbf{v})$ to both sides:
$$\mathbf{0} = 0\mathbf{v}$$

∎

**Theorem 4:** For any scalar $c$: $c\mathbf{0} = \mathbf{0}$.

**Proof:**
$$c\mathbf{0} = c(\mathbf{0} + \mathbf{0}) = c\mathbf{0} + c\mathbf{0}$$

Adding $-(c\mathbf{0})$ to both sides gives $\mathbf{0} = c\mathbf{0}$. ∎

**Theorem 5:** For any vector $\mathbf{v}$: $(-1)\mathbf{v} = -\mathbf{v}$.

**Proof:**
$$\mathbf{v} + (-1)\mathbf{v} = 1\mathbf{v} + (-1)\mathbf{v} = (1 + (-1))\mathbf{v} = 0\mathbf{v} = \mathbf{0}$$

So $(-1)\mathbf{v}$ behaves as the additive inverse of $\mathbf{v}$, which is unique. ∎

## Common Mistakes When Verifying Axioms

**Mistake 1: Assuming properties instead of verifying them**

You cannot assume properties like commutativity or associativity hold—you must verify them using the definitions of the operations.

**Mistake 2: Forgetting to check closure**

Many sets fail to be vector spaces simply because they're not closed under addition or scalar multiplication. Always check Axioms 1 and 2 first.

**Mistake 3: Not identifying the zero vector correctly**

The zero vector depends on the space. In the space of $2 \times 2$ matrices, it's the zero matrix, not the number 0.

**Mistake 4: Checking only some axioms**

All ten axioms must hold. Even if nine hold, failing one disqualifies the set from being a vector space.

## Strategy for Verification

When asked whether a set with given operations forms a vector space:

1. **Check closure** (Axioms 1-2) first—these often fail
2. **Identify the zero vector** and verify Axiom 5
3. **Find additive inverses** and verify Axiom 6
4. **Verify the remaining axioms** systematically, using properties of the underlying number system

For sets of vectors, matrices, or functions with standard operations, most axioms follow from arithmetic properties of real numbers.

## Summary

- A vector space consists of a set $V$ with addition and scalar multiplication satisfying 10 axioms
- **Closure axioms** (1-2) ensure operations stay within the set
- **Addition axioms** (3-6) establish additive structure with identity and inverses
- **Scalar multiplication axioms** (7-10) govern how scalars interact with vectors
- These axioms imply additional properties: uniqueness of zero and inverses, behavior of zero scalars
- To verify a vector space, check all ten axioms systematically
- The axioms abstract the essential algebraic properties of $\mathbb{R}^n$, allowing the theory to apply to diverse mathematical objects
