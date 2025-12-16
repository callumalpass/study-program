# Covariance and Correlation

When studying multiple random variables, we often want to quantify their relationship: Do they tend to increase together? Move in opposite directions? Or vary independently? Covariance and correlation provide precise mathematical measures of linear association.

## Covariance

The **covariance** between random variables $X$ and $Y$ is:

$$\text{Cov}(X,Y) = E[(X - \mu_X)(Y - \mu_Y)]$$

where $\mu_X = E[X]$ and $\mu_Y = E[Y]$.

**Intuition:** If $X$ and $Y$ tend to be above their means together, $(X - \mu_X)(Y - \mu_Y)$ is often positive. If one is above its mean when the other is below, the product is often negative.

### Computational Formula

Expanding the definition:

$$\text{Cov}(X,Y) = E[XY - X\mu_Y - Y\mu_X + \mu_X\mu_Y]$$

$$= E[XY] - \mu_Y E[X] - \mu_X E[Y] + \mu_X\mu_Y$$

$$= E[XY] - \mu_X\mu_Y - \mu_X\mu_Y + \mu_X\mu_Y$$

$$\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$$

This **computational formula** is often easier to use.

### Example 1: Computing Covariance

Let $(X,Y)$ have joint PMF:

| $X \backslash Y$ | $Y=0$ | $Y=1$ |
|------------------|-------|-------|
| $X=0$ | 0.2 | 0.3 |
| $X=1$ | 0.4 | 0.1 |

**Find marginals:**

$p_X(0) = 0.2 + 0.3 = 0.5$, $p_X(1) = 0.4 + 0.1 = 0.5$

$p_Y(0) = 0.2 + 0.4 = 0.6$, $p_Y(1) = 0.3 + 0.1 = 0.4$

**Compute means:**

$$E[X] = 0 \cdot 0.5 + 1 \cdot 0.5 = 0.5$$

$$E[Y] = 0 \cdot 0.6 + 1 \cdot 0.4 = 0.4$$

**Compute $E[XY]$:**

$$E[XY] = 0 \cdot 0 \cdot 0.2 + 0 \cdot 1 \cdot 0.3 + 1 \cdot 0 \cdot 0.4 + 1 \cdot 1 \cdot 0.1 = 0.1$$

**Covariance:**

$$\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0.1 - 0.5 \cdot 0.4 = 0.1 - 0.2 = -0.1$$

The negative covariance suggests an inverse relationship: when $X$ is high, $Y$ tends to be low.

## Interpretation of Covariance

- **$\text{Cov}(X,Y) > 0$:** Positive association (tend to move together)
- **$\text{Cov}(X,Y) < 0$:** Negative association (tend to move in opposite directions)
- **$\text{Cov}(X,Y) = 0$:** No linear association (uncorrelated)

**Important:** Zero covariance does NOT imply independence (only that there's no linear relationship).

### Example 2: Uncorrelated but Dependent

Let $X \sim \text{Uniform}[-1,1]$ and $Y = X^2$.

Clearly $Y$ depends on $X$, but:

$$E[X] = 0 \quad \text{(by symmetry)}$$

$$E[XY] = E[X \cdot X^2] = E[X^3] = 0 \quad \text{(odd function, symmetric domain)}$$

$$\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0 - 0 \cdot E[Y] = 0$$

They are **uncorrelated** despite being strongly dependent!

## Properties of Covariance

### Property 1: Symmetry
$$\text{Cov}(X,Y) = \text{Cov}(Y,X)$$

### Property 2: Covariance with Self
$$\text{Cov}(X,X) = E[(X - \mu_X)^2] = \text{Var}(X)$$

Variance is the covariance of a variable with itself!

### Property 3: Bilinearity
$$\text{Cov}(aX + b, cY + d) = ac \cdot \text{Cov}(X,Y)$$

Constants added don't affect covariance; scaling multiplies the covariance.

### Property 4: Additivity
$$\text{Cov}(X + Y, Z) = \text{Cov}(X,Z) + \text{Cov}(Y,Z)$$

### Property 5: Independence Implies Zero Covariance

If $X$ and $Y$ are independent:
$$E[XY] = E[X]E[Y]$$

Therefore:
$$\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0$$

**Warning:** The converse is false (see Example 2).

## Variance of a Sum

Covariance appears in the variance of sums:

$$\text{Var}(X + Y) = E[(X + Y - \mu_X - \mu_Y)^2]$$

$$= E[(X - \mu_X)^2 + 2(X - \mu_X)(Y - \mu_Y) + (Y - \mu_Y)^2]$$

$$= \text{Var}(X) + 2\text{Cov}(X,Y) + \text{Var}(Y)$$

More generally, for $X_1, \ldots, X_n$:

$$\text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i) + 2\sum_{i<j} \text{Cov}(X_i, X_j)$$

**Special case:** If $X_1, \ldots, X_n$ are pairwise uncorrelated (all covariances zero):

$$\text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i)$$

This generalizes the result for independent variables.

### Example 3: Portfolio Variance

An investor holds two stocks with returns $X$ and $Y$. The portfolio return is $R = aX + bY$ where $a + b = 1$.

$$\text{Var}(R) = \text{Var}(aX + bY) = a^2 \text{Var}(X) + b^2 \text{Var}(Y) + 2ab \cdot \text{Cov}(X,Y)$$

If $\text{Cov}(X,Y) < 0$ (stocks move in opposite directions), diversification reduces variance!

## Correlation Coefficient

Covariance depends on the units of $X$ and $Y$, making it hard to interpret. The **correlation coefficient** standardizes this:

$$\rho_{X,Y} = \text{Corr}(X,Y) = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$$

where $\sigma_X = \sqrt{\text{Var}(X)}$ and $\sigma_Y = \sqrt{\text{Var}(Y)}$.

### Properties of Correlation

1. **Dimensionless:** $\rho$ has no units

2. **Bounded:** $-1 \leq \rho_{X,Y} \leq 1$

3. **$|\rho| = 1$** if and only if $Y = aX + b$ for some constants $a, b$ (perfect linear relationship)

4. **$\rho = 0$** means $X$ and $Y$ are uncorrelated (no linear relationship)

### Interpretation

- **$\rho = 1$:** Perfect positive linear relationship ($Y = aX + b$ with $a > 0$)
- **$\rho = -1$:** Perfect negative linear relationship ($Y = aX + b$ with $a < 0$)
- **$\rho = 0$:** No linear relationship (but possibly nonlinear relationship)
- **$0 < \rho < 1$:** Positive linear association (stronger as $\rho \to 1$)
- **$-1 < \rho < 0$:** Negative linear association (stronger as $\rho \to -1$)

### Example 4: Computing Correlation

From Example 1: $\text{Cov}(X,Y) = -0.1$

$$\text{Var}(X) = E[X^2] - (E[X])^2 = 0.5 - 0.25 = 0.25$$

$$\text{Var}(Y) = E[Y^2] - (E[Y])^2 = 0.4 - 0.16 = 0.24$$

$$\rho_{X,Y} = \frac{-0.1}{\sqrt{0.25} \cdot \sqrt{0.24}} = \frac{-0.1}{0.5 \cdot 0.49} \approx \frac{-0.1}{0.245} \approx -0.408$$

Moderate negative correlation.

## Cauchy-Schwarz Inequality

The bound $|\rho| \leq 1$ follows from the **Cauchy-Schwarz inequality**:

$$|E[XY]| \leq \sqrt{E[X^2] E[Y^2]}$$

Applied to centered variables $(X - \mu_X)$ and $(Y - \mu_Y)$:

$$|\text{Cov}(X,Y)| \leq \sqrt{\text{Var}(X) \text{Var}(Y)} = \sigma_X \sigma_Y$$

Dividing both sides by $\sigma_X \sigma_Y$ gives $|\rho| \leq 1$.

## Conditional Expectation and Covariance

The **conditional expectation** $E[Y|X]$ is itself a random variable (a function of $X$).

**Law of total expectation:**
$$E[Y] = E[E[Y|X]]$$

**Law of total variance:**
$$\text{Var}(Y) = E[\text{Var}(Y|X)] + \text{Var}(E[Y|X])$$

This decomposes variance into:
- Within-group variance: $E[\text{Var}(Y|X)]$
- Between-group variance: $\text{Var}(E[Y|X])$

### Example 5: Regression to the Mean

Consider predicting $Y$ given $X$ using a linear function $\hat{Y} = a + bX$.

The **best linear predictor** (minimizing mean squared error) has:

$$b = \frac{\text{Cov}(X,Y)}{\text{Var}(X)} = \rho_{X,Y} \frac{\sigma_Y}{\sigma_X}$$

$$a = \mu_Y - b\mu_X$$

This gives:
$$E[Y|X] \approx \mu_Y + \rho_{X,Y} \frac{\sigma_Y}{\sigma_X}(X - \mu_X)$$

If $|\rho| < 1$, the predicted $Y$ is pulled toward the mean—this is **regression to the mean**.

## Sample Covariance and Correlation

Given data $(x_1, y_1), \ldots, (x_n, y_n)$:

**Sample covariance:**
$$s_{XY} = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$$

**Sample correlation:**
$$r_{XY} = \frac{s_{XY}}{s_X s_Y}$$

where $s_X$ and $s_Y$ are sample standard deviations.

These estimate population covariance and correlation from data.

## Covariance Matrix

For random vector $(X_1, \ldots, X_n)$, the **covariance matrix** $\Sigma$ has entries:

$$\Sigma_{ij} = \text{Cov}(X_i, X_j)$$

Diagonal entries are variances: $\Sigma_{ii} = \text{Var}(X_i)$

The covariance matrix is:
- **Symmetric:** $\Sigma_{ij} = \Sigma_{ji}$
- **Positive semi-definite:** $\mathbf{v}^T \Sigma \mathbf{v} \geq 0$ for all vectors $\mathbf{v}$

This generalizes variance to multiple dimensions and is fundamental in multivariate statistics.

## Common Pitfalls

1. **Correlation ≠ Causation:** High correlation doesn't imply one variable causes the other

2. **Zero correlation ≠ Independence:** Variables can be dependent but uncorrelated (Example 2)

3. **Correlation measures only linear association:** Can miss nonlinear relationships

4. **Outliers affect correlation:** A few extreme points can dramatically change $\rho$

### Example 6: Anscombe's Quartet

Four datasets with nearly identical means, variances, and correlations ($\rho \approx 0.816$) but very different relationships:
- Linear relationship
- Quadratic relationship
- Linear with one outlier
- No relationship except one outlier

This demonstrates that correlation alone is insufficient—always visualize data!

## Summary

- **Covariance** $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$ measures linear association
- $\text{Cov}(X,Y) > 0$: positive association; $< 0$: negative association; $= 0$: uncorrelated
- **Variance of sum:** $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X,Y)$
- **Correlation** $\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$ is standardized, with $-1 \leq \rho \leq 1$
- $|\rho| = 1$ implies perfect linear relationship
- Independence implies zero covariance/correlation, but not conversely
- Correlation measures only linear association, not general dependence
