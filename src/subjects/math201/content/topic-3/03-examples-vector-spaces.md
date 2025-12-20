---
id: math201-t3-examples
title: "Examples of Vector Spaces"
order: 3
---

# Examples of Vector Spaces

The power of the vector space abstraction becomes clear when we see how many different mathematical structures satisfy the ten axioms. From polynomials to matrices to continuous functions, vector spaces appear throughout mathematics. Understanding these examples builds intuition for the general theory and reveals deep connections between seemingly unrelated topics.

## $\mathbb{R}^n$: The Prototypical Example

The space **$\mathbb{R}^n$** consists of all $n$-tuples of real numbers:

$$\mathbb{R}^n = \left\{\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} : x_i \in \mathbb{R}\right\}$$

**Operations:**
- Addition: $\mathbf{u} + \mathbf{v} = \begin{bmatrix} u_1 + v_1 \\ \vdots \\ u_n + v_n \end{bmatrix}$
- Scalar multiplication: $c\mathbf{v} = \begin{bmatrix} cv_1 \\ \vdots \\ cv_n \end{bmatrix}$

**Zero vector:** $\mathbf{0} = \begin{bmatrix} 0 \\ \vdots \\ 0 \end{bmatrix}$

This is the fundamental example. Every finite-dimensional vector space is essentially $\mathbb{R}^n$ in disguise (they are isomorphic).

**Special cases:**
- $\mathbb{R}^1 = \mathbb{R}$: the real number line
- $\mathbb{R}^2$: the plane
- $\mathbb{R}^3$: three-dimensional space

## Polynomial Spaces

### $\mathcal{P}_n$: Polynomials of Degree at Most $n$

The space **$\mathcal{P}_n$** consists of all polynomials of degree at most $n$:

$$\mathcal{P}_n = \{a_0 + a_1x + a_2x^2 + \cdots + a_nx^n : a_i \in \mathbb{R}\}$$

**Operations:**
- Addition: $(p + q)(x) = p(x) + q(x)$
- Scalar multiplication: $(cp)(x) = c \cdot p(x)$

**Example in $\mathcal{P}_2$:**

Let $p(x) = 3 + 2x - x^2$ and $q(x) = 1 - 4x + 5x^2$.

$$(p + q)(x) = (3 + 1) + (2 - 4)x + (-1 + 5)x^2 = 4 - 2x + 4x^2$$

$$(3p)(x) = 9 + 6x - 3x^2$$

**Zero vector:** The zero polynomial $0(x) = 0$

**Why is this a vector space?** All ten axioms hold because polynomial addition and scalar multiplication satisfy the usual arithmetic rules. For example:
- Closure: Adding two polynomials of degree $\leq n$ gives a polynomial of degree $\leq n$
- Commutativity: $p(x) + q(x) = q(x) + p(x)$ for all $x$
- Additive inverse: $-p(x)$ negates all coefficients

**Dimension:** $\mathcal{P}_n$ has dimension $n + 1$. A basis is $\{1, x, x^2, \ldots, x^n\}$.

### $\mathcal{P}$: All Polynomials

The space **$\mathcal{P}$** consists of all polynomials (of any degree):

$$\mathcal{P} = \{a_0 + a_1x + \cdots + a_nx^n : n \geq 0, a_i \in \mathbb{R}\}$$

This is an **infinite-dimensional** vector space. No finite set of polynomials can span all of $\mathcal{P}$.

## Matrix Spaces

### $M_{m \times n}$: $m \times n$ Matrices

The space **$M_{m \times n}$** consists of all $m \times n$ matrices with real entries.

**Operations:**
- Addition: Add corresponding entries
- Scalar multiplication: Multiply each entry by the scalar

**Example in $M_{2 \times 2}$:**

$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix}$$

$$3\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix}$$

**Zero vector:** The $m \times n$ zero matrix (all entries 0)

**Dimension:** $M_{m \times n}$ has dimension $mn$. A natural basis consists of matrices with a single 1 and all other entries 0.

For $M_{2 \times 2}$, a basis is:

$$\left\{\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\right\}$$

### Special Matrix Spaces

**Symmetric matrices:** $M_{\text{sym}}^{n \times n} = \{A : A^T = A\}$

Example in $M_{\text{sym}}^{2 \times 2}$:

$$\begin{bmatrix} a & b \\ b & c \end{bmatrix}$$

This is a subspace of $M_{2 \times 2}$ with dimension 3.

**Upper triangular matrices:** $M_{\text{upper}}^{n \times n} = \{A : a_{ij} = 0 \text{ for } i > j\}$

Example in $M_{\text{upper}}^{3 \times 3}$:

$$\begin{bmatrix} a & b & c \\ 0 & d & e \\ 0 & 0 & f \end{bmatrix}$$

This is a subspace with dimension $\frac{n(n+1)}{2}$. For $n = 3$, dimension is 6.

**Diagonal matrices:** Matrices with non-zero entries only on the main diagonal. This is a subspace of dimension $n$.

## Function Spaces

### $\mathcal{F}(\mathbb{R})$: All Functions from $\mathbb{R}$ to $\mathbb{R}$

The space **$\mathcal{F}(\mathbb{R})$** consists of all functions $f : \mathbb{R} \to \mathbb{R}$.

**Operations:**
- Addition: $(f + g)(x) = f(x) + g(x)$
- Scalar multiplication: $(cf)(x) = c \cdot f(x)$

**Example:** Let $f(x) = x^2$ and $g(x) = \sin x$.

$$(f + g)(x) = x^2 + \sin x$$

$$(3f)(x) = 3x^2$$

**Zero vector:** The zero function $\mathbf{0}(x) = 0$ for all $x$

**Why is this a vector space?** Addition and scalar multiplication of functions satisfy all ten axioms:
- Closure: Sum of functions is a function; scalar multiple of a function is a function
- Commutativity: $f(x) + g(x) = g(x) + f(x)$ for all $x$
- Associativity, distributivity, etc., all follow from properties of real numbers

This is an infinite-dimensional space.

### $C[a, b]$: Continuous Functions on $[a, b]$

The space **$C[a, b]$** consists of all continuous functions on the interval $[a, b]$.

**Operations:** Same as $\mathcal{F}(\mathbb{R})$

**Why is this a subspace of $\mathcal{F}(\mathbb{R})$?**
- The zero function is continuous
- Sum of continuous functions is continuous
- Scalar multiple of continuous function is continuous

**Example:** $C[0, 1]$ includes $f(x) = x^2$, $g(x) = e^x$, $h(x) = \sin(\pi x)$, but not the function:

$$f(x) = \begin{cases} 0 & \text{if } x < 1/2 \\ 1 & \text{if } x \geq 1/2 \end{cases}$$

which has a jump discontinuity at $x = 1/2$.

**Dimension:** Infinite. The functions $\{1, x, x^2, x^3, \ldots\}$ are linearly independent in $C[0, 1]$.

### $C^{\infty}(\mathbb{R})$: Infinitely Differentiable Functions

Functions that have derivatives of all orders form a vector space.

**Examples:**
- Polynomials: $p(x) = x^3 - 2x + 1$
- Exponential: $e^x$
- Trigonometric: $\sin x$, $\cos x$
- Not included: $|x|$ (not differentiable at 0), $\sqrt{x}$ (not differentiable at 0)

This is a subspace of $C(\mathbb{R})$.

## Sequence Spaces

### $\mathbb{R}^{\infty}$: Infinite Sequences

The space **$\mathbb{R}^{\infty}$** consists of all infinite sequences of real numbers:

$$\mathbb{R}^{\infty} = \{(x_1, x_2, x_3, \ldots) : x_i \in \mathbb{R}\}$$

**Operations:**
- Addition: $(x_1, x_2, \ldots) + (y_1, y_2, \ldots) = (x_1 + y_1, x_2 + y_2, \ldots)$
- Scalar multiplication: $c(x_1, x_2, \ldots) = (cx_1, cx_2, \ldots)$

**Example:**
$$(1, 2, 3, 4, \ldots) + (1, 0, 1, 0, \ldots) = (2, 2, 4, 4, \ldots)$$

**Zero vector:** $(0, 0, 0, \ldots)$

### $\ell^2$: Square-Summable Sequences

A more refined space is **$\ell^2$** (pronounced "ell-two"), consisting of sequences whose sum of squares converges:

$$\ell^2 = \left\{(x_1, x_2, \ldots) : \sum_{i=1}^{\infty} x_i^2 < \infty\right\}$$

**Examples:**
- $(1, 1/2, 1/3, 1/4, \ldots)$ is in $\ell^2$ because $\sum \frac{1}{n^2} = \frac{\pi^2}{6}$
- $(1, 1, 1, 1, \ldots)$ is not in $\ell^2$ because $\sum 1 = \infty$

This space is crucial in quantum mechanics and signal processing.

## The Zero Vector Space

The trivial space **$\{\mathbf{0}\}$** containing only the zero vector is a vector space.

**Operations:**
- $\mathbf{0} + \mathbf{0} = \mathbf{0}$
- $c\mathbf{0} = \mathbf{0}$

All ten axioms hold trivially. This is the unique vector space of dimension 0.

## Non-Examples

Understanding what is NOT a vector space is equally important.

### Example 1: First Quadrant in $\mathbb{R}^2$

Let $V = \{(x, y) : x \geq 0, y \geq 0\}$ with standard operations.

**Fails Axiom 6:** The vector $(1, 1)$ has no additive inverse in $V$, since $(-1, -1) \notin V$.

### Example 2: Integers

Let $V = \mathbb{Z}$ (integers) with standard operations.

**Fails Axiom 2:** The set is not closed under scalar multiplication. For example, $\frac{1}{2} \cdot 2 = 1 \in \mathbb{Z}$, but $\frac{1}{2} \cdot 1 = \frac{1}{2} \notin \mathbb{Z}$.

### Example 3: Solutions to $Ax = b$ (when $b \neq 0$)

Let $V$ be the set of solutions to $Ax = b$ where $A$ is an $m \times n$ matrix and $b \neq \mathbf{0}$.

**Fails Axiom 5:** The zero vector is not a solution because $A\mathbf{0} = \mathbf{0} \neq b$.

(Note: Solutions to the *homogeneous* equation $Ax = \mathbf{0}$ do form a vector space—the null space.)

### Example 4: Polynomials of Exactly Degree $n$

Let $V = \{a_0 + a_1x + \cdots + a_nx^n : a_n \neq 0\}$ (polynomials of degree exactly $n$).

**Fails Axiom 1:** Adding $p(x) = x^2$ and $q(x) = -x^2$ gives $0$, which has degree less than 2.

**Fails Axiom 5:** The zero polynomial is not in $V$.

## Applications

### Physics: State Spaces in Quantum Mechanics

Quantum states are vectors in infinite-dimensional complex vector spaces (Hilbert spaces). Observables are linear operators, and measurements correspond to eigenvalue problems.

### Computer Science: Vector Embeddings

In natural language processing, words are represented as vectors in $\mathbb{R}^n$ (typically $n = 100$ to $300$). The vector space structure allows semantic operations: "king" - "man" + "woman" ≈ "queen".

### Engineering: Signal Processing

Signals are viewed as vectors in function spaces. Operations like filtering, compression, and noise reduction are linear transformations on these spaces.

### Statistics: Feature Spaces

Data points with $n$ features live in $\mathbb{R}^n$. Regression, classification, and clustering algorithms use the vector space structure to find patterns.

## Summary

Vector spaces include:
- **$\mathbb{R}^n$**: Finite-dimensional coordinate spaces
- **$\mathcal{P}_n$ and $\mathcal{P}$**: Polynomial spaces (finite and infinite-dimensional)
- **$M_{m \times n}$**: Matrix spaces and subspaces (symmetric, triangular, etc.)
- **$\mathcal{F}(\mathbb{R})$, $C[a, b]$, $C^{\infty}$**: Function spaces
- **$\mathbb{R}^{\infty}$, $\ell^2$**: Sequence spaces
- **$\{\mathbf{0}\}$**: The trivial space

Not every set with operations is a vector space:
- Must contain zero vector and additive inverses
- Must be closed under addition and scalar multiplication
- All ten axioms must hold

The diversity of vector spaces shows the power of abstraction. The same theorems and techniques apply whether we're working with polynomials, matrices, or functions.
