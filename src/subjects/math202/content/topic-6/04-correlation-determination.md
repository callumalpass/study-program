---
id: math202-t6-correlation
title: "Correlation and Determination"
order: 4
---

# Correlation and Coefficient of Determination

## Introduction

While regression analysis focuses on predicting one variable from another, measures of association quantify the strength and direction of the relationship. The correlation coefficient and the coefficient of determination (R-squared) are fundamental tools for understanding how well our regression model fits the data and how strongly two variables are related.

## The Correlation Coefficient

### Definition

The **sample correlation coefficient** (also called Pearson's correlation coefficient), denoted $r$ or $r_{XY}$, measures the strength and direction of the linear relationship between two variables:

$$r = \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum_{i=1}^{n}(X_i - \bar{X})^2}\sqrt{\sum_{i=1}^{n}(Y_i - \bar{Y})^2}} = \frac{S_{XY}}{\sqrt{S_{XX}S_{YY}}}$$

where:
- $S_{XY} = \sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})$ is the sum of cross-products
- $S_{XX} = \sum_{i=1}^{n}(X_i - \bar{X})^2$ is the sum of squares for $X$
- $S_{YY} = \sum_{i=1}^{n}(Y_i - \bar{Y})^2$ is the sum of squares for $Y$

### Properties of the Correlation Coefficient

1. **Range**: $-1 \leq r \leq 1$

2. **Interpretation of sign**:
   - $r > 0$: Positive linear relationship (as $X$ increases, $Y$ tends to increase)
   - $r < 0$: Negative linear relationship (as $X$ increases, $Y$ tends to decrease)
   - $r = 0$: No linear relationship

3. **Interpretation of magnitude**:
   - $|r| = 1$: Perfect linear relationship (all points lie exactly on a line)
   - $|r| = 0$: No linear relationship
   - General guidelines (rough):
     - $|r| < 0.3$: Weak relationship
     - $0.3 \leq |r| < 0.7$: Moderate relationship
     - $|r| \geq 0.7$: Strong relationship

4. **Unitless**: $r$ doesn't depend on the units of measurement

5. **Symmetric**: $r_{XY} = r_{YX}$

6. **Measures only linear relationships**: $r$ may be close to 0 even when a strong nonlinear relationship exists

### Relationship Between Correlation and Regression

The correlation coefficient is closely related to the regression slope:

$$\hat{\beta}_1 = r \cdot \frac{s_Y}{s_X}$$

where $s_X = \sqrt{S_{XX}/(n-1)}$ and $s_Y = \sqrt{S_{YY}/(n-1)}$ are the sample standard deviations.

Also:
$$r = \hat{\beta}_1 \cdot \frac{s_X}{s_Y}$$

This shows that:
- If we standardize both $X$ and $Y$ (convert to z-scores), the regression slope equals $r$
- The sign of $r$ always matches the sign of $\hat{\beta}_1$

## Testing the Significance of Correlation

To test whether there is a significant linear relationship in the population, we test:

$$H_0: \rho = 0 \quad \text{vs.} \quad H_A: \rho \neq 0$$

where $\rho$ (Greek letter rho) is the population correlation coefficient.

### The t-Test for Correlation

The test statistic is:

$$t = \frac{r\sqrt{n-2}}{\sqrt{1-r^2}}$$

Under $H_0$, this follows a $t$-distribution with $n-2$ degrees of freedom.

**Important**: Testing $H_0: \rho = 0$ is equivalent to testing $H_0: \beta_1 = 0$ in simple linear regression. Both tests give the same p-value and conclusion.

## The Coefficient of Determination (R²)

### Definition

The **coefficient of determination**, denoted $R^2$, is the square of the correlation coefficient:

$$R^2 = r^2$$

For simple linear regression, $R^2$ has a direct interpretation in terms of variance explained.

### Variance Decomposition

The total variability in $Y$ can be decomposed as:

$$\underbrace{\sum_{i=1}^{n}(Y_i - \bar{Y})^2}_{\text{SST}} = \underbrace{\sum_{i=1}^{n}(\hat{Y}_i - \bar{Y})^2}_{\text{SSR}} + \underbrace{\sum_{i=1}^{n}(Y_i - \hat{Y}_i)^2}_{\text{RSS}}$$

In words:
$$\text{Total Variation} = \text{Explained Variation} + \text{Unexplained Variation}$$

where:
- **SST** (Total Sum of Squares): Total variation in $Y$
- **SSR** (Regression Sum of Squares): Variation explained by the regression
- **RSS** (Residual Sum of Squares): Unexplained variation (error)

### Interpretation of R²

The coefficient of determination is defined as:

$$R^2 = \frac{\text{SSR}}{\text{SST}} = 1 - \frac{\text{RSS}}{\text{SST}}$$

**Interpretation**: $R^2$ represents the **proportion of variance in $Y$ explained by $X$**.

- $R^2 = 0.75$ means 75% of the variability in $Y$ is explained by the regression on $X$
- The remaining 25% is due to other factors not captured by the model

### Properties of R²

1. **Range**: $0 \leq R^2 \leq 1$

2. **Perfect fit**: $R^2 = 1$ when all points lie exactly on the regression line (RSS = 0)

3. **No relationship**: $R^2 = 0$ when the regression line is horizontal ($\hat{\beta}_1 = 0$)

4. **Always non-negative**: Even if $r$ is negative, $R^2 = r^2 \geq 0$

5. **Increases with predictors**: In multiple regression, adding predictors always increases $R^2$ (never decreases it), even if they're irrelevant

### What is a "Good" R²?

There's no universal threshold. The interpretation depends on context:

- **Physical sciences**: $R^2 > 0.9$ might be expected
- **Social sciences**: $R^2 = 0.3$ to $0.5$ might be considered good
- **Behavioral studies**: Even $R^2 = 0.1$ to $0.2$ can be meaningful

**Important**: A high $R^2$ doesn't necessarily mean:
- The model is correct or the best choice
- Predictions will be accurate
- Causation exists

A low $R^2$ doesn't mean the model is useless:
- The relationship might still be statistically significant
- The model might still provide valuable insights
- Predictions might be the best available

## Worked Example

Using our study time and exam score example with $n = 5$ observations:

### Given Information

From previous calculations:
- $S_{XX} = 26$
- $S_{XY} = 105$
- We need $S_{YY}$

### Step 1: Calculate $S_{YY}$

$$S_{YY} = \sum_{i=1}^{n}(Y_i - \bar{Y})^2$$

With $\bar{Y} = 78$ and scores 65, 70, 80, 85, 90:

$$S_{YY} = (65-78)^2 + (70-78)^2 + (80-78)^2 + (85-78)^2 + (90-78)^2$$
$$= 169 + 64 + 4 + 49 + 144 = 430$$

### Step 2: Calculate the Correlation Coefficient

$$r = \frac{S_{XY}}{\sqrt{S_{XX}S_{YY}}} = \frac{105}{\sqrt{26 \times 430}} = \frac{105}{\sqrt{11180}} = \frac{105}{105.7} = 0.993$$

This indicates a very strong positive linear relationship between study time and exam score.

### Step 3: Test Significance of Correlation

$$t = \frac{r\sqrt{n-2}}{\sqrt{1-r^2}} = \frac{0.993\sqrt{3}}{\sqrt{1-0.993^2}} = \frac{1.720}{\sqrt{0.014}} = \frac{1.720}{0.118} = 14.58$$

With 3 degrees of freedom and $\alpha = 0.05$, the critical value is 3.182. Since $14.58 > 3.182$, we reject $H_0$ and conclude there is a significant linear relationship (same conclusion as testing $\beta_1 = 0$).

### Step 4: Calculate R²

$$R^2 = r^2 = (0.993)^2 = 0.986$$

**Interpretation**: Approximately 98.6% of the variation in exam scores is explained by study time. This is an extremely high $R^2$, suggesting study time is an excellent predictor of exam performance in this dataset.

### Step 5: Verify Using Sum of Squares

From earlier, RSS = 5.18. We can calculate:

$$\text{SSR} = \text{SST} - \text{RSS} = 430 - 5.18 = 424.82$$

$$R^2 = \frac{\text{SSR}}{\text{SST}} = \frac{424.82}{430} = 0.988$$

(The small difference from 0.986 is due to rounding.)

## Correlation Does Not Imply Causation

A crucial warning: **correlation does not imply causation**. Even a perfect correlation doesn't mean that changes in $X$ cause changes in $Y$.

### Possible Explanations for Correlation

1. **$X$ causes $Y$**: The relationship we often hope for
2. **$Y$ causes $X$**: The reverse causation
3. **Third variable**: A confounding variable $Z$ causes both $X$ and $Y$
4. **Coincidence**: The correlation is spurious (especially with small samples)

### Example: Ice Cream and Drowning

Ice cream sales and drowning deaths are strongly positively correlated. Does ice cream cause drowning?

No! The confounding variable is temperature/season:
- Hot weather increases ice cream sales
- Hot weather increases swimming, which increases drowning risk

## Limitations of Correlation and R²

### 1. Sensitive to Outliers

A single outlier can dramatically change $r$ and $R^2$, especially with small samples.

### 2. Only Measures Linear Relationships

$r$ can be near zero even when a strong nonlinear relationship exists. For example:
- Quadratic relationship: $Y = X^2$ centered at $X = 0$ has $r \approx 0$
- Circular relationship: Points on a circle have $r = 0$

### 3. Range Restriction

If the range of $X$ or $Y$ is restricted (e.g., only observing high values), the correlation will be attenuated (closer to 0) compared to the full range.

### 4. Ecological Fallacy

Correlation at the group level doesn't necessarily hold at the individual level.

### 5. R² Alone is Insufficient

Always examine:
- Residual plots to check assumptions
- Statistical significance
- Practical significance and context
- Alternative models

## Adjusted R² (Preview)

In multiple regression, the **adjusted R²** accounts for the number of predictors:

$$R^2_{\text{adj}} = 1 - \frac{\text{RSS}/(n-p-1)}{\text{SST}/(n-1)}$$

where $p$ is the number of predictors. Unlike $R^2$, adjusted $R^2$ can decrease when irrelevant predictors are added, making it better for model comparison.

## Summary

The correlation coefficient $r$ and coefficient of determination $R^2$ are essential tools for quantifying relationships in regression:

- **$r$** measures the strength and direction of linear association
- **$R^2$** measures the proportion of variance explained
- Both have clear interpretations but important limitations
- Always interpret in context and check model assumptions
- Remember: correlation does not imply causation

Together with hypothesis tests and confidence intervals, these measures provide a comprehensive assessment of regression model fit and the strength of relationships between variables.
