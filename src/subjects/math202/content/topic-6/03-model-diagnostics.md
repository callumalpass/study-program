---
id: math202-t6-diagnostics
title: "Model Diagnostics"
order: 3
---

# Model Diagnostics

## Introduction

Model diagnostics are essential tools for checking whether the assumptions of linear regression are satisfied and for identifying potential problems with the fitted model. Without proper diagnostics, our inferences may be invalid, and our predictions unreliable. This section covers residual analysis, assumption checking, and the identification of outliers and influential observations.

## The Role of Residuals

Residuals are the key to diagnosing regression models. Recall that the residual for observation $i$ is:

$$e_i = Y_i - \hat{Y}_i = Y_i - (\hat{\beta}_0 + \hat{\beta}_1 X_i)$$

Residuals are estimates of the error terms $\epsilon_i$ and should exhibit the same properties: independence, constant variance, and normality with mean zero.

## Checking the Linearity Assumption

### Residual Plot Against Fitted Values

The most important diagnostic plot is the **residual plot**: a scatter plot of residuals $e_i$ versus fitted values $\hat{Y}_i$.

**What to look for:**
- **Good pattern**: Random scatter around zero with no systematic pattern
- **Bad patterns**:
  - **Curved pattern**: Suggests nonlinearity; the relationship may be quadratic or require transformation
  - **Funnel shape**: Suggests non-constant variance (heteroscedasticity)
  - **Clusters or gaps**: May indicate missing predictor variables or distinct subgroups

### Residual Plot Against the Predictor

For simple linear regression, we can also plot residuals versus the predictor variable $X$. This plot should show random scatter around zero. Patterns suggest the linear model is inadequate.

## Checking the Constant Variance Assumption

### Visual Assessment

The residual plot against fitted values is also used to check for **homoscedasticity** (constant variance).

**Signs of heteroscedasticity:**
- Funnel or cone shape (variance increases or decreases with fitted values)
- Systematic changes in the spread of residuals

### Scale-Location Plot

An alternative is the **scale-location plot** (or spread-location plot), which plots $\sqrt{|e_i|}$ versus $\hat{Y}_i$. This makes it easier to detect changes in variance. Look for:
- A roughly horizontal line suggests constant variance
- An upward or downward trend suggests non-constant variance

### Formal Tests for Heteroscedasticity

**Breusch-Pagan Test**: Tests whether the variance of residuals depends on the fitted values. The null hypothesis is constant variance.

**White Test**: A more general test that doesn't assume a specific form of heteroscedasticity.

### Consequences and Remedies

If heteroscedasticity is present:
- Standard errors and confidence intervals are incorrect
- Hypothesis tests are unreliable

**Remedies:**
- Transform the response variable (e.g., log, square root)
- Use weighted least squares
- Use robust standard errors (Huber-White standard errors)

## Checking the Normality Assumption

### Q-Q Plot (Quantile-Quantile Plot)

The **normal Q-Q plot** compares the quantiles of the residuals to the quantiles of a standard normal distribution.

**Interpretation:**
- If residuals are normally distributed, points should fall approximately on a straight line
- Deviations from the line indicate departures from normality:
  - **S-shaped pattern**: Heavy or light tails
  - **Curved pattern**: Skewness
  - **Few points far from line**: Potential outliers

### Histogram of Residuals

A histogram of residuals provides a visual check of the distribution shape. It should be approximately bell-shaped and centered at zero.

### Shapiro-Wilk Test

The **Shapiro-Wilk test** is a formal test for normality:
- $H_0$: The residuals are normally distributed
- $H_A$: The residuals are not normally distributed

Reject $H_0$ if the p-value is small (typically < 0.05).

**Note**: With large sample sizes, minor deviations from normality may lead to rejection, but the impact on inference is often negligible due to the Central Limit Theorem.

### Consequences and Remedies

Non-normality primarily affects:
- Confidence intervals and prediction intervals
- The validity of hypothesis tests (especially with small samples)

**Remedies:**
- Transform the response variable
- Use robust regression methods
- Bootstrap methods for inference

## Checking the Independence Assumption

### Residual Plot Over Time

If data are collected over time, plot residuals in time order (observation number). Look for:
- **Random pattern**: Suggests independence
- **Systematic pattern or cycles**: Suggests autocorrelation (residuals are correlated over time)

### Durbin-Watson Test

The **Durbin-Watson test** detects first-order autocorrelation:

$$d = \frac{\sum_{i=2}^{n}(e_i - e_{i-1})^2}{\sum_{i=1}^{n}e_i^2}$$

Values of $d$ range from 0 to 4:
- $d \approx 2$: No autocorrelation
- $d < 2$: Positive autocorrelation
- $d > 2$: Negative autocorrelation

Critical values depend on $n$ and the number of predictors.

### Consequences and Remedies

Lack of independence (autocorrelation) leads to:
- Underestimated standard errors
- Inflated t-statistics
- Invalid confidence intervals

**Remedies:**
- Include time-related predictors
- Use time series models (ARIMA, etc.)
- Use generalized least squares (GLS)

## Identifying Outliers

### What is an Outlier?

An **outlier** is an observation that doesn't fit well with the rest of the data. In regression, there are different types:

1. **Outlier in $Y$**: Unusual response value given $X$
2. **Outlier in $X$**: Unusual predictor value (leverage point)
3. **Influential observation**: Strongly affects the regression line

### Standardized Residuals

**Standardized residuals** account for the fact that residuals have different variances:

$$r_i = \frac{e_i}{s\sqrt{1 - h_{ii}}}$$

where $h_{ii}$ is the **leverage** (hat value) for observation $i$:

$$h_{ii} = \frac{1}{n} + \frac{(X_i - \bar{X})^2}{S_{XX}}$$

Standardized residuals have approximately constant variance. As a rule of thumb:
- $|r_i| > 2$: Potential outlier
- $|r_i| > 3$: Definite outlier

### Studentized Residuals

**Studentized (or deleted) residuals** are even more refined:

$$t_i = \frac{e_i}{s_{(i)}\sqrt{1 - h_{ii}}}$$

where $s_{(i)}$ is the residual standard error computed with observation $i$ removed. Under the null hypothesis that observation $i$ is not an outlier, $t_i$ follows a $t$-distribution with $n-3$ degrees of freedom.

## Leverage and Influence

### Leverage

**Leverage** $h_{ii}$ measures how far $X_i$ is from $\bar{X}$. High leverage points have the potential to influence the regression line.

Properties:
- $0 \leq h_{ii} \leq 1$
- $\sum_{i=1}^{n} h_{ii} = 2$ (for simple linear regression)
- Average leverage: $\bar{h} = 2/n$

**Rule of thumb**: A leverage value greater than $2\bar{h} = 4/n$ or $3\bar{h} = 6/n$ is considered high.

### Influence: Cook's Distance

**Cook's distance** $D_i$ measures the influence of observation $i$ on all fitted values:

$$D_i = \frac{r_i^2}{2} \cdot \frac{h_{ii}}{1 - h_{ii}}$$

It combines information about the residual and leverage. Large values indicate influential observations.

**Rule of thumb**: $D_i > 1$ suggests observation $i$ is influential. Some use $D_i > 4/n$ as a cutoff.

### DFBETAS

**DFBETAS** measures the change in each regression coefficient when observation $i$ is removed:

$$\text{DFBETAS}_{i,j} = \frac{\hat{\beta}_j - \hat{\beta}_{j(i)}}{\text{SE}_{(i)}(\hat{\beta}_j)}$$

where $\hat{\beta}_{j(i)}$ is the coefficient estimate without observation $i$.

**Rule of thumb**: $|\text{DFBETAS}| > 2/\sqrt{n}$ suggests influence on that coefficient.

## Worked Example

Consider a dataset with 10 observations. After fitting a regression model, we obtain:

| Obs | $X_i$ | $Y_i$ | $\hat{Y}_i$ | $e_i$ | $h_{ii}$ | $r_i$ | $D_i$ |
|-----|-------|-------|-------------|-------|----------|-------|-------|
| 1   | 1     | 2.1   | 2.5         | -0.4  | 0.28     | -0.50 | 0.02  |
| 2   | 2     | 3.8   | 3.9         | -0.1  | 0.21     | -0.12 | 0.00  |
| 3   | 3     | 5.2   | 5.3         | -0.1  | 0.16     | -0.11 | 0.00  |
| 4   | 4     | 6.9   | 6.7         | 0.2   | 0.13     | 0.22  | 0.00  |
| 5   | 5     | 8.0   | 8.1         | -0.1  | 0.11     | -0.11 | 0.00  |
| 6   | 6     | 9.5   | 9.5         | 0.0   | 0.11     | 0.00  | 0.00  |
| 7   | 7     | 11.1  | 10.9        | 0.2   | 0.13     | 0.22  | 0.00  |
| 8   | 8     | 12.2  | 12.3        | -0.1  | 0.16     | -0.11 | 0.00  |
| 9   | 9     | 13.9  | 13.7        | 0.2   | 0.21     | 0.23  | 0.00  |
| 10  | 15    | 18.5  | 21.9        | -3.4  | 0.50     | -5.40 | 4.10  |

### Analysis

1. **Residuals**: Most residuals are small except for observation 10 ($e_{10} = -3.4$)

2. **Leverage**: Observation 10 has very high leverage ($h_{10} = 0.50$), much greater than $4/n = 0.4$ or even $2/n = 0.2$. This is because $X_{10} = 15$ is far from the other $X$ values.

3. **Standardized residuals**: Observation 10 has $|r_{10}| = 5.40 > 3$, indicating it's a definite outlier.

4. **Cook's distance**: Observation 10 has $D_{10} = 4.10 > 1$, indicating it's highly influential.

**Conclusion**: Observation 10 is both an outlier and highly influential due to its extreme $X$ value and unusual $Y$ value. We should:
- Investigate whether this observation is a data entry error
- Check if there's a substantive reason for this observation being different
- Consider fitting the model with and without this observation to assess its impact
- If removed, report results both with and without the observation

## What to Do with Problematic Observations

### Investigation Steps

1. **Check for data entry errors**: Verify the values are correct
2. **Look for substantive reasons**: Is there a logical explanation?
3. **Assess the impact**: Refit the model without the observation
4. **Consider transformation**: Sometimes transforming variables reduces the impact

### Guidelines

- **Never automatically delete outliers** without understanding why they occur
- If an outlier is due to measurement error, it may be appropriate to remove it
- If it represents a legitimate but unusual case, consider:
  - Keeping it and reporting robust analyses
  - Reporting results with and without the outlier
  - Using robust regression methods

## Summary Checklist for Model Diagnostics

1. **Residual vs. Fitted Values Plot**: Check linearity and constant variance
2. **Q-Q Plot**: Check normality of residuals
3. **Residuals vs. Observation Order**: Check independence (if relevant)
4. **Identify outliers**: Check standardized or studentized residuals
5. **Check leverage**: Identify high leverage points
6. **Check influence**: Examine Cook's distance and DFBETAS
7. **Investigate problematic observations**: Understand causes and assess impact

By systematically applying these diagnostics, we can validate our regression model and ensure our conclusions are reliable.
