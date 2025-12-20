# Regression Inference

## Introduction

After fitting a regression model, we need to assess whether the relationship we've found is statistically significant and to quantify our uncertainty about the parameter estimates. Regression inference provides the tools for hypothesis testing and confidence interval construction for regression coefficients.

## Sampling Distribution of the Estimators

Under the standard regression assumptions (linearity, independence, homoscedasticity, and normality), the least squares estimators follow normal distributions:

$$\hat{\beta}_1 \sim N\left(\beta_1, \frac{\sigma^2}{S_{XX}}\right)$$

$$\hat{\beta}_0 \sim N\left(\beta_0, \sigma^2\left(\frac{1}{n} + \frac{\bar{X}^2}{S_{XX}}\right)\right)$$

where $\sigma^2$ is the variance of the error terms and $S_{XX} = \sum_{i=1}^{n}(X_i - \bar{X})^2$.

## Estimating the Error Variance

Since the true error variance $\sigma^2$ is unknown, we estimate it using the **residual mean square** (or **mean squared error**, MSE):

$$\hat{\sigma}^2 = s^2 = \text{MSE} = \frac{\text{RSS}}{n-2} = \frac{\sum_{i=1}^{n} e_i^2}{n-2}$$

where:
- RSS is the residual sum of squares
- $n-2$ represents the degrees of freedom (we lose 2 degrees of freedom for estimating $\beta_0$ and $\beta_1$)

The square root of MSE is called the **residual standard error**:

$$s = \sqrt{\text{MSE}}$$

This estimates the standard deviation of the errors and provides a measure of the typical size of the residuals.

## Standard Errors of the Estimators

The **standard errors** of the estimators are:

$$\text{SE}(\hat{\beta}_1) = \frac{s}{\sqrt{S_{XX}}} = s\sqrt{\frac{1}{\sum_{i=1}^{n}(X_i - \bar{X})^2}}$$

$$\text{SE}(\hat{\beta}_0) = s\sqrt{\frac{1}{n} + \frac{\bar{X}^2}{S_{XX}}}$$

These standard errors quantify the uncertainty in our parameter estimates. Smaller standard errors indicate more precise estimates.

## Hypothesis Tests for the Slope

The most common hypothesis test in simple linear regression assesses whether there is a linear relationship between $X$ and $Y$.

### Testing for a Linear Relationship

The null hypothesis is typically:

$$H_0: \beta_1 = 0 \quad \text{(no linear relationship)}$$
$$H_A: \beta_1 \neq 0 \quad \text{(there is a linear relationship)}$$

### The t-Test Statistic

Under $H_0$, the test statistic:

$$t = \frac{\hat{\beta}_1 - 0}{\text{SE}(\hat{\beta}_1)} = \frac{\hat{\beta}_1}{s/\sqrt{S_{XX}}}$$

follows a $t$-distribution with $n-2$ degrees of freedom.

### Decision Rule

We reject $H_0$ at significance level $\alpha$ if:

$$|t| > t_{\alpha/2, n-2}$$

where $t_{\alpha/2, n-2}$ is the critical value from the $t$-distribution.

Alternatively, we can use the **p-value** approach: reject $H_0$ if the p-value is less than $\alpha$.

### One-Sided Tests

For directional hypotheses:

- $H_0: \beta_1 \leq 0$ vs. $H_A: \beta_1 > 0$: Reject if $t > t_{\alpha, n-2}$
- $H_0: \beta_1 \geq 0$ vs. $H_A: \beta_1 < 0$: Reject if $t < -t_{\alpha, n-2}$

## Hypothesis Tests for the Intercept

Similarly, we can test hypotheses about the intercept:

$$H_0: \beta_0 = c \quad \text{vs.} \quad H_A: \beta_0 \neq c$$

The test statistic is:

$$t = \frac{\hat{\beta}_0 - c}{\text{SE}(\hat{\beta}_0)}$$

which also follows a $t$-distribution with $n-2$ degrees of freedom under $H_0$.

## Confidence Intervals

### Confidence Interval for the Slope

A $100(1-\alpha)\%$ confidence interval for $\beta_1$ is:

$$\hat{\beta}_1 \pm t_{\alpha/2, n-2} \cdot \text{SE}(\hat{\beta}_1)$$

This interval provides a range of plausible values for the true slope. If the interval does not contain 0, we have evidence of a linear relationship.

### Confidence Interval for the Intercept

A $100(1-\alpha)\%$ confidence interval for $\beta_0$ is:

$$\hat{\beta}_0 \pm t_{\alpha/2, n-2} \cdot \text{SE}(\hat{\beta}_0)$$

### Interpretation

For example, a 95% confidence interval for $\beta_1$ of $(2.1, 5.8)$ means: "We are 95% confident that the true average change in $Y$ per unit increase in $X$ is between 2.1 and 5.8 units."

## Confidence Intervals for the Mean Response

Sometimes we want to estimate the **mean response** $E[Y|X = x_0]$ for a specific value $x_0$ of the predictor.

The point estimate is:

$$\hat{\mu}_{Y|x_0} = \hat{\beta}_0 + \hat{\beta}_1 x_0$$

The standard error is:

$$\text{SE}(\hat{\mu}_{Y|x_0}) = s\sqrt{\frac{1}{n} + \frac{(x_0 - \bar{X})^2}{S_{XX}}}$$

A $100(1-\alpha)\%$ confidence interval for the mean response is:

$$\hat{\mu}_{Y|x_0} \pm t_{\alpha/2, n-2} \cdot \text{SE}(\hat{\mu}_{Y|x_0})$$

Note that the confidence interval is narrowest when $x_0 = \bar{X}$ and widens as $x_0$ moves away from $\bar{X}$.

## Prediction Intervals for Individual Observations

If we want to predict a **single new observation** at $X = x_0$, we use a **prediction interval**, which accounts for both the uncertainty in estimating the mean response and the inherent variability of individual observations.

The prediction is still:

$$\hat{Y}_{\text{new}} = \hat{\beta}_0 + \hat{\beta}_1 x_0$$

But the standard error is larger:

$$\text{SE}(\hat{Y}_{\text{new}}) = s\sqrt{1 + \frac{1}{n} + \frac{(x_0 - \bar{X})^2}{S_{XX}}}$$

A $100(1-\alpha)\%$ prediction interval is:

$$\hat{Y}_{\text{new}} \pm t_{\alpha/2, n-2} \cdot \text{SE}(\hat{Y}_{\text{new}})$$

Prediction intervals are **always wider** than confidence intervals for the mean response because they include the additional variability term.

## Worked Example

Continuing with our study time and exam score example from the previous section:

- $n = 5$, $\bar{X} = 5$, $\bar{Y} = 78$
- $\hat{\beta}_0 = 57.8$, $\hat{\beta}_1 = 4.04$
- $S_{XX} = 26$

### Step 1: Calculate the Residual Sum of Squares

From the residuals calculated earlier:

$$\text{RSS} = (-0.88)^2 + (0.08)^2 + (2.00)^2 + (-1.08)^2 + (-0.12)^2 = 5.18$$

### Step 2: Estimate the Error Variance

$$s^2 = \frac{\text{RSS}}{n-2} = \frac{5.18}{3} = 1.73$$

$$s = \sqrt{1.73} = 1.31$$

### Step 3: Calculate Standard Errors

$$\text{SE}(\hat{\beta}_1) = \frac{s}{\sqrt{S_{XX}}} = \frac{1.31}{\sqrt{26}} = \frac{1.31}{5.10} = 0.257$$

$$\text{SE}(\hat{\beta}_0) = s\sqrt{\frac{1}{n} + \frac{\bar{X}^2}{S_{XX}}} = 1.31\sqrt{\frac{1}{5} + \frac{25}{26}} = 1.31\sqrt{1.162} = 1.41$$

### Step 4: Test for a Linear Relationship

$$H_0: \beta_1 = 0 \quad \text{vs.} \quad H_A: \beta_1 \neq 0$$

$$t = \frac{\hat{\beta}_1}{\text{SE}(\hat{\beta}_1)} = \frac{4.04}{0.257} = 15.72$$

With $n-2 = 3$ degrees of freedom, the critical value at $\alpha = 0.05$ is $t_{0.025, 3} = 3.182$.

Since $|15.72| > 3.182$, we reject $H_0$. There is very strong evidence of a linear relationship between study time and exam score.

The p-value would be extremely small (< 0.001), indicating highly significant results.

### Step 5: Construct a 95% Confidence Interval for the Slope

$$\hat{\beta}_1 \pm t_{0.025, 3} \cdot \text{SE}(\hat{\beta}_1) = 4.04 \pm 3.182(0.257)$$

$$= 4.04 \pm 0.82 = (3.22, 4.86)$$

**Interpretation**: We are 95% confident that each additional hour of study increases the expected exam score by between 3.22 and 4.86 points.

### Step 6: Confidence Interval for Mean Response at $x_0 = 6$ hours

$$\hat{\mu}_{Y|x_0=6} = 57.8 + 4.04(6) = 82.04$$

$$\text{SE}(\hat{\mu}_{Y|x_0=6}) = 1.31\sqrt{\frac{1}{5} + \frac{(6-5)^2}{26}} = 1.31\sqrt{0.238} = 0.64$$

$$82.04 \pm 3.182(0.64) = 82.04 \pm 2.04 = (80.0, 84.1)$$

We are 95% confident that the mean exam score for students who study 6 hours is between 80.0 and 84.1 points.

### Step 7: Prediction Interval for a New Student at $x_0 = 6$ hours

$$\hat{Y}_{\text{new}} = 82.04$$

$$\text{SE}(\hat{Y}_{\text{new}}) = 1.31\sqrt{1 + \frac{1}{5} + \frac{(6-5)^2}{26}} = 1.31\sqrt{1.238} = 1.46$$

$$82.04 \pm 3.182(1.46) = 82.04 \pm 4.65 = (77.4, 86.7)$$

We are 95% confident that a new student who studies 6 hours will score between 77.4 and 86.7 points. Note this interval is much wider than the confidence interval for the mean.

## ANOVA F-Test for Regression

An alternative approach to testing $H_0: \beta_1 = 0$ uses the **F-test** from analysis of variance (ANOVA). This partitions the total variability in $Y$:

$$\text{SST} = \text{SSR} + \text{RSS}$$

where:
- SST (Total Sum of Squares) $= \sum_{i=1}^{n}(Y_i - \bar{Y})^2$
- SSR (Regression Sum of Squares) $= \sum_{i=1}^{n}(\hat{Y}_i - \bar{Y})^2$
- RSS (Residual Sum of Squares) $= \sum_{i=1}^{n}(Y_i - \hat{Y}_i)^2$

The F-statistic is:

$$F = \frac{\text{MSR}}{\text{MSE}} = \frac{\text{SSR}/1}{\text{RSS}/(n-2)}$$

Under $H_0: \beta_1 = 0$, this follows an $F_{1, n-2}$ distribution. For simple linear regression, $F = t^2$, so the tests are equivalent.

## Summary

Regression inference allows us to move beyond point estimates to assess statistical significance and quantify uncertainty. Hypothesis tests help us determine whether relationships are real or could be due to chance, while confidence intervals provide ranges of plausible values for parameters and predictions. Understanding the difference between confidence intervals (for mean responses) and prediction intervals (for individual observations) is crucial for proper interpretation.
