---
title: "Coordinate Descent"
description: "Optimizing one variable at a time"
---

# Coordinate Descent

Sometimes the simplest idea works best. Instead of moving along the gradient (which requires computing derivatives with respect to all variables), **Coordinate Descent** minimizes the objective with respect to **one variable at a time** while keeping others fixed.

## The Algorithm

To minimize $f(x)$ where $x \in \mathbb{R}^n$:

1.  Start at $x^{(0)}$.
2.  Select a coordinate $i \in \{1, \dots, n\}$.
3.  Minimize $f$ with respect to $x_i$:
    $$ x_i^{new} = \arg \min_z f(x_1, \dots, x_{i-1}, z, x_{i+1}, \dots, x_n) $$
4.  Update $x_i \leftarrow x_i^{new}$.
5.  Repeat (picking $i$ cyclically $1 \to n$, or randomly).

## When is it useful?

Coordinate Descent (CD) is extremely powerful when:
1.  **The subproblem is cheap:** Solving the 1D minimization is analytic or very fast.
2.  **The gradient is expensive:** Computing the full gradient $\nabla f$ takes too long.
3.  **Separable Constraints:** Constraints are simple bounds $l_i \leq x_i \leq u_i$.
4.  **Sparsity:** In Lasso regression ($L_1$ regularization), CD naturally produces sparse solutions efficiently.

## Convergence

Does it converge?
- **Yes,** if $f$ is strictly convex and differentiable.
- **Yes,** if $f$ is formed of a smooth part plus a separable non-smooth part (e.g., $f(x) = g(x) + \sum h_i(x_i)$). This covers Lasso.
- **No,** generally for non-smooth functions.
  *Example:* $f(x, y) = |x + y|$. The minimum is along the line $x = -y$.
  Start at $(1, 1)$. Value = 2.
  Minimize w.r.t $x$: Best $x=-1$. New point $(-1, 1)$. Value = 0.
  Minimize w.r.t $y$: Best $y=1$. New point $(-1, 1)$. Stuck.
  But global min is 0. Wait, $(-1, 1)$ gives 0.
  Bad Example.
  Better Example: "Corner" case. Min of non-smooth function might not be along axes.

## Coordinate Descent vs Gradient Descent

**Gradient Descent:**
- Update: $x \leftarrow x - \alpha \nabla f(x)$
- Needs full gradient.
- Moves in best direction.

**Coordinate Descent:**
- Update: Minimize along axis $e_i$.
- No gradient needed (implicit).
- Moves in orthogonal directions ("Manhattan" style path).

## Block Coordinate Descent

Instead of updating 1 variable, update a **block** of variables.
Useful when variables are grouped (e.g., Matrix Factorization, solving for user vectors $U$ then item vectors $V$).
This is also known as **Alternating Minimization**.

## Application: Lasso Regression

Minimize $\frac{1}{2} \|Ax - b\|^2 + \lambda \|x\|_1$.
The gradient is not defined at $x_i=0$. Subgradient descent is slow ($O(1/\sqrt{k})$).
Coordinate Descent uses **Soft Thresholding** for the update:
$$ x_i \leftarrow S( \rho_i, \lambda ) / z_i $$
This is extremely fast and exact. The fastest Lasso solvers (glmnet) use Coordinate Descent.

## Detailed Lasso Update Derivation

For Lasso, the objective is:
$$ f(x) = \frac{1}{2}\|Ax - b\|^2 + \lambda \|x\|_1 $$

To minimize with respect to $x_i$ while fixing other variables, let $r_i = b - \sum_{j \neq i} A_{:,j} x_j$ be the partial residual.

The subproblem becomes:
$$ \min_{z} \frac{1}{2}(r_i - A_{:,i} z)^T(r_i - A_{:,i} z) + \lambda |z| $$

Expanding and simplifying:
$$ \min_{z} \frac{1}{2}z^2 \|A_{:,i}\|^2 - z \cdot A_{:,i}^T r_i + \lambda |z| + \text{const} $$

The solution is the **soft-thresholding operator**:
$$ x_i = \frac{S(A_{:,i}^T r_i, \lambda)}{\|A_{:,i}\|^2} $$

where the soft-thresholding function is:
$$ S(a, \lambda) = \begin{cases}
a - \lambda & \text{if } a > \lambda \\
0 & \text{if } |a| \leq \lambda \\
a + \lambda & \text{if } a < -\lambda
\end{cases} $$

This closed-form solution makes each coordinate update extremely cheap: $O(m)$ where $m$ is the number of data points.

## Convergence Rate Analysis

**Theorem:** For separable convex functions $f(x) = g(x) + \sum_{i=1}^n h_i(x_i)$ where $g$ is smooth, cyclic coordinate descent converges at rate $O(1/k)$:
$$ f(x^{(k)}) - f^* \leq \frac{C}{k} $$

For **strongly convex** functions, the rate improves to linear:
$$ f(x^{(k)}) - f^* \leq (1 - \mu/L)^k (f(x^{(0)}) - f^*) $$

However, the constant depends on how "separable" the problem is. If the Hessian has large off-diagonal entries (strong coupling between variables), coordinate descent can be very slow.

## Randomized Coordinate Descent

Instead of cycling through coordinates $1, 2, \ldots, n$, pick a random coordinate $i$ uniformly at each step.

**Advantages:**
1. **Faster convergence in expectation:** For some problems, randomization avoids worst-case orderings
2. **Parallelizable:** Can update multiple coordinates in parallel if they don't interact
3. **Better for sparse problems:** Focuses on active variables

**Convergence:** Expected decrease per iteration:
$$ \mathbb{E}[f(x^{(k+1)})] \leq f(x^{(k)}) - \frac{1}{2nL} \|\nabla f(x^{(k)})\|^2 $$

This gives $O(n/k)$ convergence (factor of $n$ slower per iteration, but can compensate with cheap updates).

## Block Coordinate Descent

Update a **block** (subset) of variables at once.

**Partition:** $x = (x_1, x_2, \ldots, x_B)$ where each $x_b$ is a block.

**Update:** At step $k$, choose block $b$ and solve:
$$ x_b^{(k+1)} = \arg \min_{z} f(x_1^{(k+1)}, \ldots, x_{b-1}^{(k+1)}, z, x_{b+1}^{(k)}, \ldots, x_B^{(k)}) $$

### Example: Matrix Factorization

Minimize $\|A - UV^T\|_F^2$ where $A \in \mathbb{R}^{m \times n}$, $U \in \mathbb{R}^{m \times r}$, $V \in \mathbb{R}^{n \times r}$.

This is non-convex in $(U, V)$ jointly, but convex in $U$ given $V$ and vice versa.

**Block Coordinate Descent (Alternating Least Squares):**
1. Fix $V$, solve for $U$: $U \leftarrow \arg \min_U \|A - UV^T\|_F^2$ (least squares)
2. Fix $U$, solve for $V$: $V \leftarrow \arg \min_V \|A - UV^T\|_F^2$ (least squares)
3. Repeat until convergence

Each subproblem has a closed-form solution, making this very efficient.

## Coordinate Descent vs Gradient Descent: When to Choose

**Choose Coordinate Descent when:**
- The 1D subproblem has a closed-form solution (Lasso, logistic regression with L1)
- The problem is separable or block-separable
- Computing the full gradient is expensive
- The Hessian is (nearly) diagonal
- You need sparsity (L1 regularization)

**Choose Gradient Descent when:**
- Variables are strongly coupled (dense Hessian)
- The subproblem requires numerical optimization
- You can compute the full gradient cheaply
- You need guaranteed descent at each step

**Comparison Table:**

| Property | Coordinate Descent | Gradient Descent |
| :--- | :--- | :--- |
| Per-iteration cost | $O(n)$ or less | $O(n)$ |
| Convergence direction | Axis-aligned | Gradient direction |
| Handles non-smooth | Yes (if separable) | No |
| Parallelization | Limited | Excellent |
| Memory | $O(n)$ | $O(n)$ |
| Best for | Sparse problems, L1 | Dense problems, smooth |

## Accelerated Coordinate Descent

Just like gradient descent has accelerated variants (Nesterov), coordinate descent can be accelerated.

**Accelerated Randomized Coordinate Descent (ARCD):**
Uses extrapolation steps similar to Nesterov momentum. Achieves $O(1/k^2)$ rate for smooth separable convex functions.

This is especially powerful for sparse problems in machine learning.

## Practical Implementation: Lasso Example

**Coordinate Descent for Lasso (simplified Python):**
```python
def lasso_coordinate_descent(A, b, lambda_reg, max_iter=1000, tol=1e-6):
    m, n = A.shape
    x = np.zeros(n)

    for iteration in range(max_iter):
        x_old = x.copy()

        for i in range(n):
            # Compute partial residual
            r = b - A @ x + A[:, i] * x[i]

            # Soft-thresholding update
            rho = A[:, i].T @ r
            z = np.linalg.norm(A[:, i])**2

            if rho > lambda_reg:
                x[i] = (rho - lambda_reg) / z
            elif rho < -lambda_reg:
                x[i] = (rho + lambda_reg) / z
            else:
                x[i] = 0

        # Check convergence
        if np.linalg.norm(x - x_old) < tol:
            break

    return x
```

**Optimizations:**
- Cache $A^T A$ and $A^T b$ if $n < m$
- Use active set strategies (only update non-zero coefficients)
- Warm starts (initialize with previous solution for path algorithms)

## Common Mistakes with Coordinate Descent

### 1. Using CD on Strongly Coupled Problems
If $f(x, y) = (x + y)^2$, the Hessian is $\begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}$ (rank deficient).
Coordinate descent will zig-zag slowly because $x$ and $y$ are perfectly correlated.

**Fix:** Use gradient descent or block updates that include both variables.

### 2. Forgetting to Update Residuals
When updating $x_i$, you must update the residual $r$ accordingly. A common bug is to forget this, leading to incorrect updates.

### 3. Wrong Order for Cyclic CD
For some problems, the order matters. If variables have very different scales, update them from largest to smallest effect.

Better: Use randomized or Gauss-Southwell rule (choose coordinate with largest gradient).

### 4. Not Checking for Non-Separability
Coordinate descent requires the problem to be (at least partially) separable. For $f(x) = \|Ax - b\|$ (not squared), the subproblem is still an optimization problem, not a closed form.

## Extensions and Variants

### 1. Proximal Coordinate Descent
For $f(x) = g(x) + h(x)$ where $g$ is smooth and $h$ is separable but non-smooth:
$$ x_i^{(k+1)} = \text{prox}_{\alpha h_i}(x_i^{(k)} - \alpha \nabla_i g(x^{(k)})) $$

### 2. Coordinate Gradient Descent
For non-separable problems, take a gradient step in one coordinate:
$$ x_i^{(k+1)} = x_i^{(k)} - \alpha \nabla_i f(x^{(k)}) $$

Cheaper than full GD ($O(1)$ vs $O(n)$) but may converge slower.

### 3. Greedy Coordinate Descent (Gauss-Southwell)
Instead of cycling or random selection, choose:
$$ i_k = \arg \max_{i} |\nabla_i f(x^{(k)})| $$
(coordinate with steepest descent). This can converge faster but requires computing all partial derivatives.

## Coordinate Descent in Machine Learning

**Success stories:**
- **Lasso/Elastic Net:** glmnet package (used in R and Python)
- **SVM:** LIBLINEAR uses coordinate descent for linear SVMs
- **Logistic Regression:** With L1 penalty, CD is faster than gradient methods
- **Matrix Completion:** Alternating Least Squares (ALS) for recommender systems

**Why it works well:**
- Many ML problems have separable regularization ($\|x\|_1$, $\|x\|_2^2$)
- Data is often sparse (text, biology), making coordinate updates cheap
- Solutions are often sparse (L1 encourages zero coefficients)

## Key Takeaways

1. **Coordinate descent optimizes one variable at a time**, keeping others fixed—simple but effective for the right problems.

2. **Best for separable problems** where the 1D subproblem has a closed-form solution (Lasso, elastic net).

3. **Convergence rate is $O(1/k)$ for convex problems**, same as gradient descent, but iteration cost can be much lower.

4. **Soft-thresholding is the key** for L1-regularized problems, yielding sparse solutions efficiently.

5. **Block coordinate descent** extends the idea to groups of variables, enabling alternating minimization (ALS for matrix factorization).

6. **Randomized CD** can be faster in expectation and is parallelizable for certain problem structures.

7. **Fails on strongly coupled problems** where variables interact heavily (dense Hessian with large off-diagonals).

8. **Widely used in practice** for sparse optimization in machine learning (Lasso, SVM, logistic regression) due to simplicity and efficiency.

9. **Can handle non-smooth objectives** if separable (unlike standard gradient descent), making it powerful for L1-regularized problems.