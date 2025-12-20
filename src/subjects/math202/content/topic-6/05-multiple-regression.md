---
id: math202-t6-multiple
title: "Multiple Regression"
order: 5
---

# Multiple Regression

## Introduction

In simple linear regression, we model the relationship between a response variable and a single predictor. In practice, however, the response is often influenced by multiple factors. **Multiple regression** extends simple linear regression to include two or more predictor variables, allowing us to model more complex relationships and control for confounding variables.

## The Multiple Regression Model

### Model Specification

The multiple linear regression model with $p$ predictors is:

$$Y_i = \beta_0 + \beta_1 X_{i1} + \beta_2 X_{i2} + \cdots + \beta_p X_{ip} + \epsilon_i$$

where:
- $Y_i$ is the response variable for observation $i$
- $X_{ij}$ is the value of predictor $j$ for observation $i$
- $\beta_0$ is the intercept
- $\beta_j$ is the coefficient for predictor $j$ (for $j = 1, \ldots, p$)
- $\epsilon_i$ is the error term

### Interpretation of Coefficients

The coefficient $\beta_j$ represents the **expected change in $Y$ for a one-unit increase in $X_j$, holding all other predictors constant**. This "holding constant" or "controlling for" other variables is crucial:

- It isolates the effect of $X_j$ from the effects of other predictors
- It addresses confounding by accounting for multiple factors simultaneously

For example, in a model predicting salary from years of experience and education level:
- $\beta_1$ = expected salary increase per year of experience, **for people with the same education level**
- $\beta_2$ = expected salary increase per year of education, **for people with the same experience**

## Matrix Formulation

Multiple regression is most efficiently expressed using matrices.

### Matrix Notation

$$\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$$

where:

$$\mathbf{Y} = \begin{bmatrix} Y_1 \\ Y_2 \\ \vdots \\ Y_n \end{bmatrix}, \quad \mathbf{X} = \begin{bmatrix} 1 & X_{11} & X_{12} & \cdots & X_{1p} \\ 1 & X_{21} & X_{22} & \cdots & X_{2p} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 1 & X_{n1} & X_{n2} & \cdots & X_{np} \end{bmatrix}$$

$$\boldsymbol{\beta} = \begin{bmatrix} \beta_0 \\ \beta_1 \\ \vdots \\ \beta_p \end{bmatrix}, \quad \boldsymbol{\epsilon} = \begin{bmatrix} \epsilon_1 \\ \epsilon_2 \\ \vdots \\ \epsilon_n \end{bmatrix}$$

The matrix $\mathbf{X}$ is called the **design matrix** (or model matrix), with dimensions $n \times (p+1)$.

### Least Squares Estimation

The least squares estimates minimize:

$$\text{RSS} = \sum_{i=1}^{n}(Y_i - \hat{Y}_i)^2 = (\mathbf{Y} - \mathbf{X}\hat{\boldsymbol{\beta}})^T(\mathbf{Y} - \mathbf{X}\hat{\boldsymbol{\beta}})$$

The solution is given by the **normal equations**:

$$\mathbf{X}^T\mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}^T\mathbf{Y}$$

If $\mathbf{X}^T\mathbf{X}$ is invertible (which requires that the predictors are not perfectly collinear), the least squares estimate is:

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}$$

### Fitted Values and Residuals

The fitted values are:

$$\hat{\mathbf{Y}} = \mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y} = \mathbf{H}\mathbf{Y}$$

where $\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ is the **hat matrix** (it "puts the hat on $\mathbf{Y}$").

The residuals are:

$$\mathbf{e} = \mathbf{Y} - \hat{\mathbf{Y}} = (\mathbf{I} - \mathbf{H})\mathbf{Y}$$

## Assumptions

The multiple regression model makes the same assumptions as simple linear regression:

1. **Linearity**: The relationship between $Y$ and each $X_j$ is linear (given the other predictors)
2. **Independence**: Observations are independent
3. **Homoscedasticity**: Constant error variance: $\text{Var}(\epsilon_i) = \sigma^2$
4. **Normality**: Errors are normally distributed: $\epsilon_i \sim N(0, \sigma^2)$
5. **No perfect multicollinearity**: No predictor is a perfect linear combination of others

## Inference in Multiple Regression

### Estimating Error Variance

The estimate of $\sigma^2$ is:

$$\hat{\sigma}^2 = s^2 = \text{MSE} = \frac{\text{RSS}}{n-p-1}$$

where $n-p-1$ is the degrees of freedom (we lose $p+1$ degrees of freedom for estimating the coefficients).

### Standard Errors

The covariance matrix of $\hat{\boldsymbol{\beta}}$ is:

$$\text{Cov}(\hat{\boldsymbol{\beta}}) = \sigma^2(\mathbf{X}^T\mathbf{X})^{-1}$$

Estimated using:

$$\widehat{\text{Cov}}(\hat{\boldsymbol{\beta}}) = s^2(\mathbf{X}^T\mathbf{X})^{-1}$$

The standard error of $\hat{\beta}_j$ is the square root of the $j$-th diagonal element of this matrix.

### t-Tests for Individual Coefficients

To test whether predictor $j$ is significant **after controlling for all other predictors**:

$$H_0: \beta_j = 0 \quad \text{vs.} \quad H_A: \beta_j \neq 0$$

Test statistic:

$$t = \frac{\hat{\beta}_j}{\text{SE}(\hat{\beta}_j)}$$

Under $H_0$, $t \sim t_{n-p-1}$.

### Confidence Intervals

A $100(1-\alpha)\%$ confidence interval for $\beta_j$ is:

$$\hat{\beta}_j \pm t_{\alpha/2, n-p-1} \cdot \text{SE}(\hat{\beta}_j)$$

### F-Test for Overall Significance

To test whether **any** of the predictors are useful:

$$H_0: \beta_1 = \beta_2 = \cdots = \beta_p = 0 \quad \text{vs.} \quad H_A: \text{at least one } \beta_j \neq 0$$

The F-statistic is:

$$F = \frac{\text{SSR}/p}{\text{RSS}/(n-p-1)} = \frac{\text{MSR}}{\text{MSE}}$$

Under $H_0$, $F \sim F_{p, n-p-1}$.

If the F-test is significant, at least one predictor is useful. The individual t-tests then identify which predictors are significant.

## Multiple R² and Adjusted R²

### Multiple R²

The coefficient of determination in multiple regression is:

$$R^2 = \frac{\text{SSR}}{\text{SST}} = 1 - \frac{\text{RSS}}{\text{SST}}$$

It represents the proportion of variance in $Y$ explained by **all predictors together**.

**Important**: Adding predictors always increases $R^2$ (or keeps it the same), even if they're irrelevant. This makes $R^2$ unsuitable for comparing models with different numbers of predictors.

### Adjusted R²

The **adjusted R²** penalizes for the number of predictors:

$$R^2_{\text{adj}} = 1 - \frac{\text{RSS}/(n-p-1)}{\text{SST}/(n-1)} = 1 - \frac{(n-1)}{(n-p-1)}(1 - R^2)$$

Properties:
- Can decrease when irrelevant predictors are added
- Better for comparing models with different numbers of predictors
- Can be negative (if the model is very poor)

## Worked Example

Suppose we want to predict exam scores ($Y$) from both study time ($X_1$, hours) and sleep ($X_2$, hours) for $n = 6$ students:

| Student | Study ($X_1$) | Sleep ($X_2$) | Score ($Y$) |
|---------|---------------|---------------|-------------|
| 1       | 2             | 5             | 65          |
| 2       | 3             | 6             | 72          |
| 3       | 5             | 7             | 78          |
| 4       | 4             | 8             | 80          |
| 5       | 7             | 6             | 85          |
| 6       | 6             | 7             | 88          |

### Step 1: Set Up the Matrix Equation

$$\mathbf{Y} = \begin{bmatrix} 65 \\ 72 \\ 78 \\ 80 \\ 85 \\ 88 \end{bmatrix}, \quad \mathbf{X} = \begin{bmatrix} 1 & 2 & 5 \\ 1 & 3 & 6 \\ 1 & 5 & 7 \\ 1 & 4 & 8 \\ 1 & 7 & 6 \\ 1 & 6 & 7 \end{bmatrix}$$

### Step 2: Calculate $\mathbf{X}^T\mathbf{X}$ and $\mathbf{X}^T\mathbf{Y}$

$$\mathbf{X}^T\mathbf{X} = \begin{bmatrix} 6 & 27 & 39 \\ 27 & 135 & 182 \\ 39 & 182 & 263 \end{bmatrix}$$

$$\mathbf{X}^T\mathbf{Y} = \begin{bmatrix} 468 \\ 2216 \\ 3197 \end{bmatrix}$$

### Step 3: Compute $(\mathbf{X}^T\mathbf{X})^{-1}$

Using matrix inversion (typically done by computer):

$$(\mathbf{X}^T\mathbf{X})^{-1} = \begin{bmatrix} 4.833 & -0.667 & -0.500 \\ -0.667 & 0.183 & -0.067 \\ -0.500 & -0.067 & 0.150 \end{bmatrix}$$

### Step 4: Calculate $\hat{\boldsymbol{\beta}}$

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y} = \begin{bmatrix} 35.67 \\ 3.83 \\ 4.17 \end{bmatrix}$$

### Step 5: Write the Fitted Regression Equation

$$\hat{Y} = 35.67 + 3.83 X_1 + 4.17 X_2$$

**Interpretation**:
- For each additional hour of study (holding sleep constant), expected score increases by 3.83 points
- For each additional hour of sleep (holding study time constant), expected score increases by 4.17 points
- The intercept (35.67) represents the expected score for 0 hours of study and 0 hours of sleep (not meaningful in context)

### Step 6: Calculate Fitted Values and RSS

For Student 1: $\hat{Y}_1 = 35.67 + 3.83(2) + 4.17(5) = 64.90$, so $e_1 = 65 - 64.90 = 0.10$

Computing for all students and summing squared residuals:

$$\text{RSS} = 8.67$$

### Step 7: Estimate Error Variance

$$s^2 = \frac{\text{RSS}}{n-p-1} = \frac{8.67}{6-2-1} = \frac{8.67}{3} = 2.89$$

$$s = 1.70$$

### Step 8: Calculate Standard Errors

$$\text{SE}(\hat{\beta}_1) = s\sqrt{(\mathbf{X}^T\mathbf{X})^{-1}_{22}} = 1.70\sqrt{0.183} = 0.73$$

$$\text{SE}(\hat{\beta}_2) = s\sqrt{(\mathbf{X}^T\mathbf{X})^{-1}_{33}} = 1.70\sqrt{0.150} = 0.66$$

### Step 9: Test Individual Coefficients

For study time ($\beta_1$):
$$t = \frac{3.83}{0.73} = 5.25$$

With $df = 3$ and $\alpha = 0.05$, the critical value is $t_{0.025, 3} = 3.182$.

Since $|5.25| > 3.182$, study time is significant (p < 0.05).

For sleep ($\beta_2$):
$$t = \frac{4.17}{0.66} = 6.32$$

Sleep is also highly significant (p < 0.05).

### Step 10: Calculate R²

First, calculate SST:
$$\bar{Y} = 78, \quad \text{SST} = \sum(Y_i - 78)^2 = 386$$

$$R^2 = 1 - \frac{\text{RSS}}{\text{SST}} = 1 - \frac{8.67}{386} = 0.978$$

About 97.8% of the variance in exam scores is explained by study time and sleep together.

### Step 11: Calculate Adjusted R²

$$R^2_{\text{adj}} = 1 - \frac{8.67/3}{386/5} = 1 - \frac{2.89}{77.2} = 0.963$$

The adjusted R² is slightly lower, accounting for the two predictors used.

### Step 12: Overall F-Test

$$\text{SSR} = \text{SST} - \text{RSS} = 386 - 8.67 = 377.33$$

$$F = \frac{\text{SSR}/2}{\text{RSS}/3} = \frac{188.67}{2.89} = 65.3$$

With $F_{2,3}$ distribution and $\alpha = 0.05$, the critical value is approximately 9.55.

Since $65.3 > 9.55$, we reject $H_0$. The overall model is highly significant.

## Multicollinearity

### What is Multicollinearity?

**Multicollinearity** occurs when predictor variables are highly correlated with each other. This creates problems:

1. **Large standard errors**: Coefficients become unstable
2. **Unreliable estimates**: Small data changes cause large coefficient changes
3. **Difficult interpretation**: Hard to separate individual effects
4. **Nonsensical signs**: Coefficients may have unexpected signs

### Detecting Multicollinearity

**Variance Inflation Factor (VIF)**: Measures how much the variance of $\hat{\beta}_j$ is inflated due to correlation with other predictors:

$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

where $R_j^2$ is the R² from regressing $X_j$ on all other predictors.

**Rules of thumb**:
- $\text{VIF}_j > 5$ or $10$: Problematic multicollinearity
- $\text{VIF}_j = 1$: No correlation with other predictors

### Remedies for Multicollinearity

1. **Remove correlated predictors**: Drop one of the correlated variables
2. **Combine predictors**: Create composite variables (e.g., principal components)
3. **Ridge regression**: Use regularization methods
4. **Collect more data**: Increase sample size to stabilize estimates

## Categorical Predictors

Multiple regression can include categorical variables using **dummy variables** (indicator variables).

For a categorical variable with $k$ categories, create $k-1$ dummy variables. The omitted category is the **reference category**.

**Example**: Gender (Male/Female)
- Create one dummy: $D = 1$ if Female, $D = 0$ if Male
- Model: $Y = \beta_0 + \beta_1 X + \beta_2 D + \epsilon$
- $\beta_2$ represents the difference in mean $Y$ between females and males, holding $X$ constant

## Summary

Multiple regression extends simple linear regression to model relationships with multiple predictors:

- Coefficients represent effects **holding other variables constant**
- Matrix formulation provides an elegant and efficient framework
- Inference (t-tests, F-tests, confidence intervals) generalizes naturally
- Adjusted R² is preferred over R² for model comparison
- Multicollinearity can cause problems and should be diagnosed
- Categorical variables can be included using dummy variables

Multiple regression is one of the most widely used statistical methods, providing powerful tools for understanding complex relationships and making predictions while controlling for confounding factors.
