## Introduction

Random variables bridge the gap between abstract probability theory and practical quantitative analysis. They transform outcomes from sample spaces into numerical values we can compute with, analyze, and use for prediction. This topic develops the complete theory of random variables, from basic discrete and continuous types through advanced concepts like moment generating functions and correlation.

**Why This Matters:**
Random variables are the language of uncertainty across all quantitative fields. They model everything from coin flips and die rolls to customer arrival times, stock prices, measurement errors, and quantum phenomena. Understanding their properties—expected values, variances, distributions—enables you to make predictions, quantify risk, design experiments, and reason about stochastic systems. The concepts here form the foundation for statistical inference, machine learning, stochastic processes, and decision theory.

**Learning Objectives:**
- Understand discrete and continuous random variables and their probability distributions
- Compute and interpret expected values and variances
- Apply linearity of expectation and understand variance properties
- Use moment generating functions to analyze distributions
- Work with joint distributions and understand independence
- Compute and interpret covariance and correlation
- Apply random variable theory to solve real-world problems

---

## Core Concepts

### Discrete Random Variables

A **random variable** is a function mapping outcomes to real numbers. A discrete random variable takes on countably many values.

**Probability Mass Function (PMF):**
$$p_X(x) = P(X = x)$$

Must satisfy:
- Non-negativity: $p_X(x) \geq 0$
- Normalization: $\sum_x p_X(x) = 1$

**Cumulative Distribution Function (CDF):**
$$F_X(x) = P(X \leq x) = \sum_{t \leq x} p_X(t)$$

**Common discrete distributions:**
- **Bernoulli**: $p_X(1) = p$, $p_X(0) = 1-p$
- **Binomial**: $p_X(k) = \binom{n}{k} p^k (1-p)^{n-k}$
- **Geometric**: $p_X(k) = (1-p)^{k-1} p$
- **Poisson**: $p_X(k) = \frac{\lambda^k e^{-\lambda}}{k!}$

### Continuous Random Variables

A continuous random variable has probability given by integration over a **probability density function (PDF)** $f_X(x)$.

**Key properties:**
- $P(X = c) = 0$ for any specific value $c$
- $P(a \leq X \leq b) = \int_a^b f_X(x) \, dx$
- Non-negativity: $f_X(x) \geq 0$
- Normalization: $\int_{-\infty}^{\infty} f_X(x) \, dx = 1$

**CDF and PDF relationship:**
$$F_X(x) = \int_{-\infty}^x f_X(t) \, dt, \quad f_X(x) = \frac{d}{dx} F_X(x)$$

**Common continuous distributions:**
- **Uniform**: $f_X(x) = \frac{1}{b-a}$ on $[a,b]$
- **Exponential**: $f_X(x) = \lambda e^{-\lambda x}$ for $x \geq 0$
- **Normal**: $f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$

### Expected Value

The **expected value** is the probability-weighted average:

**Discrete:**
$$E[X] = \sum_x x \cdot p_X(x)$$

**Continuous:**
$$E[X] = \int_{-\infty}^{\infty} x \cdot f_X(x) \, dx$$

**Law of the Unconscious Statistician (LOTUS):**
$$E[g(X)] = \sum_x g(x) p_X(x) \quad \text{or} \quad \int g(x) f_X(x) \, dx$$

**Linearity of Expectation:**
$$E[aX + bY + c] = aE[X] + bE[Y] + c$$

This holds **regardless of dependence** between $X$ and $Y$.

### Variance and Standard Deviation

The **variance** measures spread around the mean:

$$\text{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2$$

**Standard deviation:**
$$\sigma_X = \sqrt{\text{Var}(X)}$$

**Properties:**
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$
- For independent $X, Y$: $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$
- $\text{Var}(X) \geq 0$ with equality if and only if $X$ is constant

**Chebyshev's Inequality:**
$$P(|X - \mu| \geq k\sigma) \leq \frac{1}{k^2}$$

### Moments and Moment Generating Functions

**$n$-th moment:**
$$E[X^n]$$

**$n$-th central moment:**
$$E[(X - \mu)^n]$$

**Moment Generating Function (MGF):**
$$M_X(t) = E[e^{tX}]$$

**Key properties:**
- $M_X^{(n)}(0) = E[X^n]$ (generates moments via derivatives)
- MGF uniquely determines the distribution
- For independent $X, Y$: $M_{X+Y}(t) = M_X(t) M_Y(t)$
- Linear transformation: $M_{aX+b}(t) = e^{bt} M_X(at)$

**Standardized moments:**
- **Skewness** (3rd): $\frac{E[(X-\mu)^3]}{\sigma^3}$ measures asymmetry
- **Kurtosis** (4th): $\frac{E[(X-\mu)^4]}{\sigma^4}$ measures tail heaviness

### Joint Distributions

**Joint PMF/PDF:**
$$p_{X,Y}(x,y) = P(X=x, Y=y) \quad \text{or} \quad f_{X,Y}(x,y)$$

**Marginal distributions:**
$$p_X(x) = \sum_y p_{X,Y}(x,y) \quad \text{or} \quad f_X(x) = \int f_{X,Y}(x,y) \, dy$$

**Independence:**
$$f_{X,Y}(x,y) = f_X(x) \cdot f_Y(y)$$

**Conditional distributions:**
$$f_{X|Y}(x|y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}$$

**Convolution (sum of independent RVs):**
$$f_{X+Y}(z) = \int f_X(x) f_Y(z-x) \, dx$$

### Covariance and Correlation

**Covariance:**
$$\text{Cov}(X,Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]$$

**Properties:**
- $\text{Cov}(X,X) = \text{Var}(X)$
- $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X,Y)$
- Independence implies $\text{Cov}(X,Y) = 0$ (but not conversely)

**Correlation coefficient:**
$$\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$$

**Properties:**
- Dimensionless and bounded: $-1 \leq \rho \leq 1$
- $|\rho| = 1$ if and only if $Y = aX + b$ (perfect linear relationship)
- $\rho = 0$ means uncorrelated (no linear relationship)

---

## Common Patterns and Techniques

### Computing Expected Values

1. **Use LOTUS** to find $E[g(X)]$ without deriving the distribution of $g(X)$
2. **Apply linearity** whenever possible to simplify calculations
3. **Use indicator variables** for counting problems: $E[I_A] = P(A)$
4. **Exploit symmetry** in distributions (e.g., uniform, normal)

### Computing Variances

1. **Use computational formula:** $\text{Var}(X) = E[X^2] - (E[X])^2$
2. **For sums of independent RVs:** Add variances
3. **Remember scaling:** $\text{Var}(aX + b) = a^2 \text{Var}(X)$
4. **Account for covariance** when variables are dependent

### Working with MGFs

1. **Identify the distribution** from the MGF form
2. **Use product property** for sums of independent variables
3. **Compute moments** by taking derivatives at $t = 0$
4. **Transform variables** using $M_{aX+b}(t) = e^{bt} M_X(at)$

### Analyzing Joint Distributions

1. **Check support region** to determine possible dependence
2. **Test for factorization** to establish independence
3. **Integrate/sum carefully** to find marginals
4. **Use conditional distributions** when one variable is known

---

## Common Mistakes and Debugging

### Mistake 1: Confusing PMF/PDF with Probability
For continuous random variables, $f_X(x)$ is NOT a probability. The PDF can exceed 1! Probabilities come from integration: $P(a \leq X \leq b) = \int_a^b f_X(x) \, dx$.

### Mistake 2: Assuming Zero Covariance Implies Independence
$\text{Cov}(X,Y) = 0$ only means they're uncorrelated. They can still be dependent (e.g., $Y = X^2$ where $X$ is symmetric about 0).

### Mistake 3: Adding Variances Without Independence
$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ requires independence (or at least zero covariance). For general $X, Y$, must include $2\text{Cov}(X,Y)$.

### Mistake 4: Forgetting Absolute Value in Transformations
When using change of variables for PDFs, include the Jacobian: $f_Y(y) = f_X(h(y)) |h'(y)|$.

### Mistake 5: Applying Linearity to Nonlinear Functions
$E[X^2] \neq (E[X])^2$ in general. Linearity only applies to linear combinations: $E[aX + bY] = aE[X] + bE[Y]$.

---

## Best Practices

1. **Always verify normalization** when working with PMFs or PDFs
2. **Draw pictures** for continuous distributions to understand support regions
3. **Check independence** before using product formulas for MGFs or variances
4. **Use computational formulas** for variance to avoid numerical errors
5. **Leverage known distributions** rather than computing from scratch
6. **Remember units** when interpreting variance (squared) vs. standard deviation

---

## Common Distribution Reference

| Distribution | $E[X]$ | $\text{Var}(X)$ | MGF $M_X(t)$ |
|--------------|--------|-----------------|--------------|
| Bernoulli$(p)$ | $p$ | $p(1-p)$ | $1 + p(e^t - 1)$ |
| Binomial$(n,p)$ | $np$ | $np(1-p)$ | $[1 + p(e^t - 1)]^n$ |
| Geometric$(p)$ | $\frac{1}{p}$ | $\frac{1-p}{p^2}$ | $\frac{pe^t}{1-(1-p)e^t}$ |
| Poisson$(\lambda)$ | $\lambda$ | $\lambda$ | $e^{\lambda(e^t-1)}$ |
| Uniform$[a,b]$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ | $\frac{e^{tb}-e^{ta}}{t(b-a)}$ |
| Exponential$(\lambda)$ | $\frac{1}{\lambda}$ | $\frac{1}{\lambda^2}$ | $\frac{\lambda}{\lambda-t}$ |
| Normal$(\mu,\sigma^2)$ | $\mu$ | $\sigma^2$ | $e^{\mu t + \frac{\sigma^2 t^2}{2}}$ |

---

## Key Theorems

**Linearity of Expectation:**
$$E\left[\sum_{i=1}^n a_i X_i + b\right] = \sum_{i=1}^n a_i E[X_i] + b$$

**Variance of a Sum:**
$$\text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i) + 2\sum_{i<j} \text{Cov}(X_i, X_j)$$

**Cauchy-Schwarz Inequality:**
$$|E[XY]| \leq \sqrt{E[X^2] E[Y^2]}$$

Implies: $|\rho_{X,Y}| \leq 1$

**Law of Total Expectation:**
$$E[X] = E[E[X|Y]]$$

**Law of Total Variance:**
$$\text{Var}(X) = E[\text{Var}(X|Y)] + \text{Var}(E[X|Y])$$

---

## Summary

- **Random variables** map outcomes to numbers; can be discrete (countable values) or continuous
- **PMFs/PDFs** completely characterize distributions
- **Expected value** $E[X]$ gives the center; **variance** $\text{Var}(X)$ measures spread
- **Linearity of expectation** holds always; variance additivity requires independence
- **MGFs** encode all moments and uniquely determine distributions
- **Joint distributions** describe multiple random variables; independence simplifies analysis
- **Covariance/correlation** measure linear association between variables
- These concepts form the foundation for all statistical inference and stochastic modeling

---

## Further Exploration

- **Probability Inequalities:** Markov, Chebyshev, Chernoff bounds for tail probabilities
- **Law of Large Numbers:** Sample averages converge to expected value
- **Central Limit Theorem:** Sums of independent RVs converge to normal distribution
- **Common Distributions:** Gamma, Beta, Chi-squared, t-distribution, F-distribution
- **Transformations:** Change of variables technique, order statistics
- **Multivariate Distributions:** Covariance matrices, multivariate normal distribution
