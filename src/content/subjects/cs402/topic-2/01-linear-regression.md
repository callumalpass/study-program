# Linear Regression

## Introduction

Linear regression is one of the most fundamental and widely used algorithms in machine learning and statistics. Despite its simplicity, it remains remarkably powerful and forms the foundation for understanding more complex methods. Linear regression models the relationship between input features and a continuous target variable using a linear function, making it the cornerstone of predictive modeling.

The elegance of linear regression lies in its interpretability and mathematical tractability. Unlike black-box models, linear regression provides clear insights into how each feature influences predictions. Its coefficients can be directly interpreted, making it invaluable when understanding relationships matters as much as making predictions.

Linear regression serves multiple purposes: prediction (estimating continuous values), inference (understanding relationships between variables), and as a building block for more sophisticated methods. Mastering linear regression provides intuition that transfers to neural networks, generalized linear models, and numerous other ML algorithms.

## The Linear Regression Model

### Simple Linear Regression

The simplest form models the relationship between one input variable $$x$$ and output $$y$$:

$$y = \beta_0 + \beta_1 x + \epsilon$$

where:
- $$y$$: Dependent variable (target)
- $$x$$: Independent variable (feature)
- $$\beta_0$$: Intercept (bias term)
- $$\beta_1$$: Slope (weight)
- $$\epsilon$$: Error term (noise)

**Geometric Interpretation:**

The model defines a line in 2D space. The goal is to find the line that best fits the data points.

**Example:** Predicting house price from size

$$\text{Price} = \beta_0 + \beta_1 \cdot \text{Size}$$

If $$\beta_0 = 50000$$ and $$\beta_1 = 200$$:
- Base price: $50,000
- Each additional sq ft adds $200

### Multiple Linear Regression

Extends to multiple input features:

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... + \beta_n x_n + \epsilon$$

**Vector Notation:**

$$y = \beta^T x + \epsilon$$

where:
- $$\beta = [\beta_0, \beta_1, ..., \beta_n]^T$$ (parameters)
- $$x = [1, x_1, ..., x_n]^T$$ (features with bias term)

**Example:** Predicting house price from multiple features

$$\text{Price} = \beta_0 + \beta_1 \cdot \text{Size} + \beta_2 \cdot \text{Bedrooms} + \beta_3 \cdot \text{Age} + \epsilon$$

### Matrix Formulation

For $$m$$ training examples and $$n$$ features:

$$\mathbf{y} = X\beta + \epsilon$$

where:
- $$\mathbf{y} \in \mathbb{R}^m$$: Target vector
- $$X \in \mathbb{R}^{m \times (n+1)}$$: Design matrix (includes column of 1s for intercept)
- $$\beta \in \mathbb{R}^{n+1}$$: Parameter vector
- $$\epsilon \in \mathbb{R}^m$$: Error vector

**Design Matrix:**

$$X = \begin{bmatrix}
1 & x_1^{(1)} & x_2^{(1)} & \cdots & x_n^{(1)} \\
1 & x_1^{(2)} & x_2^{(2)} & \cdots & x_n^{(2)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & x_1^{(m)} & x_2^{(m)} & \cdots & x_n^{(m)}
\end{bmatrix}$$

Each row is one training example; each column is one feature (plus intercept).

## Ordinary Least Squares (OLS)

### Cost Function

Linear regression finds parameters that minimize the sum of squared residuals:

$$J(\beta) = \frac{1}{2m}\sum_{i=1}^{m}(y^{(i)} - \hat{y}^{(i)})^2 = \frac{1}{2m}\sum_{i=1}^{m}(y^{(i)} - \beta^T x^{(i)})^2$$

**Matrix Form:**

$$J(\beta) = \frac{1}{2m}(y - X\beta)^T(y - X\beta) = \frac{1}{2m}||y - X\beta||^2$$

**Why Squared Error?**

1. **Differentiable:** Enables gradient-based optimization
2. **Penalizes large errors:** Quadratic penalty
3. **Maximum Likelihood:** Equivalent to MLE under Gaussian noise
4. **Computational convenience:** Convex, has closed-form solution

### Assumptions

OLS makes several key assumptions:

**Linearity:**
$$\mathbb{E}[y|x] = \beta^T x$$

The relationship between features and target is linear.

**Independence:**
Observations are independent (one doesn't influence another).

**Homoscedasticity:**
$$\text{Var}(\epsilon|x) = \sigma^2$$

Constant variance of errors across all values of $$x$$.

**Normality:**
$$\epsilon \sim \mathcal{N}(0, \sigma^2)$$

Errors are normally distributed (required for inference, not prediction).

**No multicollinearity:**
Features are not perfectly correlated.

**Violations and Remedies:**

- **Non-linearity:** Add polynomial features, use non-linear models
- **Heteroscedasticity:** Use weighted least squares, robust standard errors
- **Non-normality:** Transform target variable, use robust regression
- **Multicollinearity:** Remove correlated features, use regularization

## The Normal Equations

### Analytical Solution

For the cost function $$J(\beta) = \frac{1}{2m}||y - X\beta||^2$$, we find the minimum by setting gradient to zero:

$$\nabla_\beta J(\beta) = 0$$

**Gradient:**

$$\nabla_\beta J(\beta) = \frac{1}{m}X^T(X\beta - y)$$

**Setting to zero:**

$$X^T(X\beta - y) = 0$$

$$X^T X\beta = X^T y$$

**Normal Equations:**

$$\beta^* = (X^T X)^{-1}X^T y$$

This is the closed-form solution for linear regression.

### Computational Considerations

**Invertibility:**

$$(X^T X)$$ must be invertible (non-singular).

**When is it singular?**
- Fewer examples than features ($$m < n$$)
- Perfectly correlated features (multicollinearity)

**Solutions:**
- Add regularization (Ridge regression)
- Remove redundant features
- Use pseudo-inverse: $$\beta = X^+ y$$

**Computational Complexity:**

Matrix inversion: $$O(n^3)$$ where $$n$$ is number of features

For large $$n$$:
- Normal equations become expensive
- Gradient descent is more efficient
- Use iterative methods or approximations

**Numerical Stability:**

Direct inversion can be numerically unstable. Better approaches:
- **QR decomposition:** $$X = QR$$, then solve $$R\beta = Q^T y$$
- **SVD (Singular Value Decomposition):** More stable, handles near-singular matrices
- **Cholesky decomposition:** Efficient for $$X^T X$$

### Geometric Interpretation

**Projection Perspective:**

$$\hat{y} = X\beta = X(X^T X)^{-1}X^T y = Py$$

where $$P = X(X^T X)^{-1}X^T$$ is the projection matrix.

**Interpretation:** $$\hat{y}$$ is the orthogonal projection of $$y$$ onto the column space of $$X$$.

The residual $$e = y - \hat{y}$$ is orthogonal to the column space of $$X$$:

$$X^T e = X^T(y - X\beta) = 0$$

This is precisely the normal equations!

## Evaluation Metrics

### Residual Sum of Squares (RSS)

$$RSS = \sum_{i=1}^{m}(y^{(i)} - \hat{y}^{(i)})^2 = ||y - X\beta||^2$$

Lower is better. Depends on scale of $$y$$.

### Mean Squared Error (MSE)

$$MSE = \frac{1}{m}\sum_{i=1}^{m}(y^{(i)} - \hat{y}^{(i)})^2$$

Average squared error. Same units as $$y^2$$.

### Root Mean Squared Error (RMSE)

$$RMSE = \sqrt{MSE} = \sqrt{\frac{1}{m}\sum_{i=1}^{m}(y^{(i)} - \hat{y}^{(i)})^2}$$

Same units as $$y$$. More interpretable than MSE.

### Mean Absolute Error (MAE)

$$MAE = \frac{1}{m}\sum_{i=1}^{m}|y^{(i)} - \hat{y}^{(i)}|$$

Less sensitive to outliers than MSE/RMSE.

### R-Squared (Coefficient of Determination)

$$R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{\sum_i(y^{(i)} - \hat{y}^{(i)})^2}{\sum_i(y^{(i)} - \bar{y})^2}$$

where:
- $$SS_{res}$$: Residual sum of squares
- $$SS_{tot}$$: Total sum of squares
- $$\bar{y}$$: Mean of $$y$$

**Interpretation:**
- $$R^2 = 1$$: Perfect fit
- $$R^2 = 0$$: Model no better than predicting mean
- $$R^2 < 0$$: Model worse than predicting mean (possible on test set)

**For simple linear regression:**

$$R^2 = r^2$$

where $$r$$ is Pearson correlation between $$x$$ and $$y$$.

### Adjusted R-Squared

$$R^2_{adj} = 1 - \frac{(1 - R^2)(m - 1)}{m - n - 1}$$

Penalizes adding features that don't improve fit. Always $$\leq R^2$$.

**Use when:**
- Comparing models with different numbers of features
- Preventing overfitting through feature selection

## Statistical Inference

### Estimator Properties

Under standard assumptions, the OLS estimator $$\hat{\beta}$$ has desirable properties:

**Unbiased:**
$$\mathbb{E}[\hat{\beta}] = \beta$$

On average, estimates equal true parameters.

**Consistent:**
$$\hat{\beta} \xrightarrow{p} \beta$$ as $$m \rightarrow \infty$$

Estimates converge to true values with more data.

**Efficient:**
Among all unbiased linear estimators, OLS has minimum variance (Gauss-Markov theorem).

### Variance of Estimates

$$\text{Var}(\hat{\beta}) = \sigma^2(X^T X)^{-1}$$

where $$\sigma^2$$ is the variance of errors.

**Estimate $$\sigma^2$$:**

$$\hat{\sigma}^2 = \frac{1}{m - n - 1}\sum_{i=1}^{m}(y^{(i)} - \hat{y}^{(i)})^2$$

Degrees of freedom: $$m - n - 1$$ (observations minus parameters)

**Standard Errors:**

$$SE(\hat{\beta}_j) = \sqrt{\hat{\sigma}^2[(X^T X)^{-1}]_{jj}}$$

Quantifies uncertainty in parameter estimate.

### Hypothesis Testing

**Null Hypothesis:**
$$H_0: \beta_j = 0$$ (feature $$j$$ has no effect)

**Test Statistic:**

$$t_j = \frac{\hat{\beta}_j}{SE(\hat{\beta}_j)}$$

Under $$H_0$$, $$t_j \sim t_{m-n-1}$$ (t-distribution with $$m-n-1$$ degrees of freedom)

**P-value:**

Probability of observing $$|t_j|$$ or more extreme under $$H_0$$.

Small p-value (typically < 0.05): Reject $$H_0$$, feature is significant.

### Confidence Intervals

95% confidence interval for $$\beta_j$$:

$$\hat{\beta}_j \pm t_{0.975, m-n-1} \cdot SE(\hat{\beta}_j)$$

where $$t_{0.975, m-n-1}$$ is the 97.5th percentile of $$t_{m-n-1}$$ distribution.

**Interpretation:**

If we repeated sampling many times, 95% of intervals would contain the true $$\beta_j$$.

## Feature Engineering for Linear Regression

### Polynomial Features

Model non-linear relationships with polynomial terms:

$$y = \beta_0 + \beta_1 x + \beta_2 x^2 + \beta_3 x^3 + \epsilon$$

Still linear in parameters $$\beta$$!

**Example:**
Original feature: $$x$$
Polynomial features: $$x, x^2, x^3, ..., x^d$$

**Trade-off:**
- Higher degree: More flexible, captures non-linearity
- Risk: Overfitting, especially at boundaries

### Interaction Terms

Capture relationships between features:

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3(x_1 \cdot x_2) + \epsilon$$

**Example:** House price

$$\text{Price} = \beta_0 + \beta_1 \cdot \text{Size} + \beta_2 \cdot \text{Quality} + \beta_3(\text{Size} \times \text{Quality})$$

High-quality large houses may have superlinear value.

### Basis Functions

General framework: Transform features using basis functions:

$$y = \sum_{j=1}^{k}\beta_j \phi_j(x)$$

**Examples:**

**Polynomial basis:** $$\phi_j(x) = x^j$$

**Fourier basis:** $$\phi_j(x) = \sin(jx), \cos(jx)$$

**Radial basis functions (RBF):** $$\phi_j(x) = \exp\left(-\frac{||x - \mu_j||^2}{2\sigma^2}\right)$$

### Categorical Variables

**One-Hot Encoding:**

For categorical variable with $$k$$ categories:

Create $$k-1$$ binary features (drop one to avoid collinearity).

**Example:** Color ∈ {Red, Green, Blue}

$$x_{\text{Green}} = \begin{cases} 1 & \text{if Green} \\ 0 & \text{otherwise} \end{cases}$$

$$x_{\text{Blue}} = \begin{cases} 1 & \text{if Blue} \\ 0 & \text{otherwise} \end{cases}$$

Red is reference category (both 0).

**Dummy Variable Trap:**

Including all $$k$$ dummies causes perfect multicollinearity (sum always 1).

Always drop one category as reference.

## Practical Considerations

### Feature Scaling

**Why scale?**

Linear regression is invariant to feature scaling (results unchanged), but:
- Improves numerical stability
- Essential for gradient descent convergence
- Enables comparison of coefficient magnitudes

**Standardization:**

$$x' = \frac{x - \mu}{\sigma}$$

Results in mean 0, standard deviation 1.

**Min-Max Normalization:**

$$x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$$

Results in range [0, 1].

### Multicollinearity

**Definition:** High correlation among features.

**Problems:**
- Large variance in coefficient estimates
- Unstable coefficients (small data changes cause large coefficient changes)
- Difficult to determine individual feature importance
- $$(X^T X)$$ becomes singular or near-singular

**Detection:**

**Correlation Matrix:**
High pairwise correlations (> 0.8 or 0.9).

**Variance Inflation Factor (VIF):**

$$VIF_j = \frac{1}{1 - R^2_j}$$

where $$R^2_j$$ is from regressing $$x_j$$ on all other features.

$$VIF > 10$$: Severe multicollinearity
$$VIF > 5$$: Moderate multicollinearity

**Solutions:**
- Remove highly correlated features
- Combine correlated features (PCA)
- Regularization (Ridge regression)
- Collect more data

### Outliers and Influential Points

**Outliers:** Points with large residuals

**Leverage:** Points far from mean in feature space (high $$x$$ values)

**Influential Points:** Points that significantly affect fitted line (high leverage + large residual)

**Detection:**

**Residual Plots:**
Plot residuals vs. fitted values. Look for patterns or extreme values.

**Leverage (Hat Matrix):**

$$h_{ii} = [X(X^T X)^{-1}X^T]_{ii}$$

High leverage: $$h_{ii} > \frac{2(n+1)}{m}$$

**Cook's Distance:**

Measures influence of each point:

$$D_i = \frac{(y^{(i)} - \hat{y}^{(i)})^2}{(n+1)s^2} \cdot \frac{h_{ii}}{(1-h_{ii})^2}$$

$$D_i > 1$$: Influential point

**Handling:**
- Investigate outliers (data errors?)
- Consider robust regression (LAD, Huber loss)
- Transform variables
- Remove if justified

## Model Diagnostics

### Residual Analysis

**Residual Plots:**

**Residuals vs. Fitted:**
- Should show random scatter
- Pattern indicates non-linearity, heteroscedasticity

**Q-Q Plot (Quantile-Quantile):**
- Check normality of residuals
- Points should fall on diagonal line

**Scale-Location Plot:**
- Check homoscedasticity
- Spread should be constant

**Residuals vs. Leverage:**
- Identify influential points
- Points outside Cook's distance contours are influential

### Checking Assumptions

**Linearity:** Residual plots, partial regression plots

**Independence:** Durbin-Watson test (autocorrelation), context knowledge

**Homoscedasticity:** Residual plots, Breusch-Pagan test

**Normality:** Q-Q plot, Shapiro-Wilk test, histograms

## Limitations of Linear Regression

**Linear Relationships Only:**

Cannot capture non-linear patterns without feature engineering.

**Sensitive to Outliers:**

Squared loss heavily penalizes large errors.

**Assumes All Features Relevant:**

Includes all features in model, even if irrelevant.

**Extrapolation:**

Poor performance outside training data range.

**Feature Engineering Required:**

Requires manual creation of polynomial, interaction terms.

## Advantages

**Interpretability:**

Coefficients directly show feature importance and direction.

**Fast Training:**

Closed-form solution (for small $$n$$) or fast gradient descent.

**Fast Inference:**

Simple matrix multiplication.

**Well-Understood:**

Extensive statistical theory, diagnostics, tests.

**Baseline:**

Excellent starting point before trying complex models.

## Extensions and Variants

**Ridge Regression:** L2 regularization (next topic)

**Lasso Regression:** L1 regularization (next topic)

**Elastic Net:** Combination of L1 and L2

**Polynomial Regression:** Non-linear via polynomial features

**Locally Weighted Regression:** Non-parametric, weights nearby points

**Generalized Linear Models (GLM):** Non-Gaussian targets (logistic, Poisson)

**Bayesian Linear Regression:** Probabilistic approach, uncertainty quantification

## Conclusion

Linear regression is the foundation of supervised learning for regression tasks. Its simplicity, interpretability, and mathematical elegance make it invaluable for both prediction and inference. The closed-form solution via normal equations provides direct parameter estimation, while the statistical framework enables hypothesis testing and confidence intervals.

Understanding linear regression deeply—its assumptions, diagnostics, limitations, and extensions—is essential for any machine learning practitioner. Many advanced methods build upon linear regression concepts: neural networks use multiple linear transformations, regularization techniques prevent overfitting, and feature engineering enables modeling complex relationships.

While simple, linear regression remains widely used in practice, especially when interpretability matters. When combined with thoughtful feature engineering and regularization, it often performs competitively with more complex models, with the added benefits of speed, stability, and interpretability.

As we progress to gradient descent, regularization, and more complex models, the intuitions developed from linear regression will prove invaluable. Master linear regression, and you've mastered a fundamental building block of machine learning.