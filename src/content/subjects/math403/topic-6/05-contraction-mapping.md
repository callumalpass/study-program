# The Contraction Mapping Theorem

The Contraction Mapping Theorem (also called the Banach Fixed Point Theorem) is one of the most important results in analysis, with applications throughout mathematics.

## Contraction Mappings

**Definition:** Let (X, d) be a metric space. A function $f: X \to X$ is a **contraction** if there exists $0 \leq k < 1$ such that:
$$d(f(x), f(y)) \leq k \cdot d(x, y)$$ for all $x, y \in X$.

The constant k is called the **contraction constant** or **Lipschitz constant**.

**Note:** Every contraction is continuous (in fact, uniformly continuous).

## The Banach Fixed Point Theorem

**Theorem (Banach, 1922):** Let (X, d) be a complete metric space and $f: X \to X$ a contraction with constant k. Then:
1. f has a unique fixed point $x^* \in X$ (i.e., $f(x^*) = x^*$)
2. For any starting point $x_0 \in X$, the iterates $x_n = f(x_{n-1})$ converge to $x^*$
3. The rate of convergence satisfies:
$$d(x_n, x^*) \leq \frac{k^n}{1-k} d(x_0, x_1)$$

## Proof of the Theorem

**Existence:** Let $x_0 \in X$ be arbitrary. Define $x_{n+1} = f(x_n)$.

*Claim:* $(x_n)$ is Cauchy.

For $n > m$:
$$d(x_m, x_n) \leq d(x_m, x_{m+1}) + \cdots + d(x_{n-1}, x_n)$$
$$\leq (k^m + k^{m+1} + \cdots + k^{n-1}) d(x_0, x_1)$$
$$\leq \frac{k^m}{1-k} d(x_0, x_1) \to 0$$

By completeness, $x_n \to x^*$ for some $x^* \in X$.

**Fixed Point:** By continuity of f:
$$f(x^*) = f(\lim x_n) = \lim f(x_n) = \lim x_{n+1} = x^*$$

**Uniqueness:** If $f(x^*) = x^*$ and $f(y^*) = y^*$, then:
$$d(x^*, y^*) = d(f(x^*), f(y^*)) \leq k \cdot d(x^*, y^*)$$

Since $k < 1$, this implies $d(x^*, y^*) = 0$, so $x^* = y^*$.

## Rate of Convergence

Taking limits as $n \to \infty$ in:
$$d(x_m, x_n) \leq \frac{k^m}{1-k} d(x_0, x_1)$$

gives the **a priori error estimate:**
$$d(x_n, x^*) \leq \frac{k^n}{1-k} d(x_0, x_1)$$

The **a posteriori estimate** is:
$$d(x_n, x^*) \leq \frac{k}{1-k} d(x_{n-1}, x_n)$$

## Applications

### Application 1: Solving Equations
To solve $g(x) = 0$, write it as $x = f(x)$ where $f(x) = x - \alpha g(x)$ for suitable $\alpha$.

### Application 2: Ordinary Differential Equations
The Picard-Lindelöf theorem uses contraction mapping to prove existence and uniqueness of solutions to:
$$y' = f(t, y), \quad y(t_0) = y_0$$

### Application 3: Integral Equations
Solve $u(x) = g(x) + \lambda \int_a^b K(x, t) u(t) dt$ by iteration.

### Application 4: Newton's Method
Newton's method for finding roots can be analyzed using the contraction mapping principle.

## Generalizations

**Theorem (Boyd-Wong):** If $f: X \to X$ satisfies $d(f(x), f(y)) \leq \phi(d(x, y))$ where $\phi: [0, \infty) \to [0, \infty)$ is continuous, $\phi(0) = 0$, and $\phi(t) < t$ for $t > 0$, then f has a unique fixed point (assuming X is complete and f maps bounded sets to bounded sets).

**Theorem:** If $f^n$ is a contraction for some n, then f has a unique fixed point.
