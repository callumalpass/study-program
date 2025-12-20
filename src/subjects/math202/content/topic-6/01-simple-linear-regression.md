---
id: math202-t6-simple
title: "Simple Linear Regression"
order: 1
---

# Simple Linear Regression

## Introduction

Simple linear regression is a fundamental statistical method used to model the relationship between two quantitative variables: a response variable (dependent variable) $Y$ and a predictor variable (independent variable) $X$. The goal is to find a linear function that best describes how $Y$ changes as $X$ changes.

## The Simple Linear Regression Model

The simple linear regression model assumes that the relationship between $X$ and $Y$ can be expressed as:

$$Y_i = \beta_0 + \beta_1 X_i + \epsilon_i$$

where:
- $Y_i$ is the observed value of the response variable for the $i$-th observation
- $X_i$ is the value of the predictor variable for the $i$-th observation
- $\beta_0$ is the **intercept** (the expected value of $Y$ when $X = 0$)
- $\beta_1$ is the **slope** (the expected change in $Y$ for a one-unit increase in $X$)
- $\epsilon_i$ is the **error term** (random deviation from the line)

### Assumptions

The standard linear regression model makes several key assumptions about the error terms:

1. **Linearity**: The relationship between $X$ and $Y$ is linear
2. **Independence**: The errors $\epsilon_i$ are independent of each other
3. **Homoscedasticity**: The errors have constant variance: $\text{Var}(\epsilon_i) = \sigma^2$
4. **Normality**: The errors are normally distributed: $\epsilon_i \sim N(0, \sigma^2)$

## Least Squares Estimation

The method of **least squares** is the most common approach for estimating the parameters $\beta_0$ and $\beta_1$. The idea is to minimize the sum of squared vertical distances between the observed values and the fitted line.

### The Least Squares Criterion

We seek estimates $\hat{\beta}_0$ and $\hat{\beta}_1$ that minimize the **residual sum of squares** (RSS):

$$\text{RSS} = \sum_{i=1}^{n} (Y_i - \hat{Y}_i)^2 = \sum_{i=1}^{n} (Y_i - \hat{\beta}_0 - \hat{\beta}_1 X_i)^2$$

### Deriving the Least Squares Estimates

Taking partial derivatives with respect to $\beta_0$ and $\beta_1$ and setting them equal to zero gives the **normal equations**:

$$\sum_{i=1}^{n} Y_i = n\hat{\beta}_0 + \hat{\beta}_1 \sum_{i=1}^{n} X_i$$

$$\sum_{i=1}^{n} X_i Y_i = \hat{\beta}_0 \sum_{i=1}^{n} X_i + \hat{\beta}_1 \sum_{i=1}^{n} X_i^2$$

Solving these equations yields:

$$\hat{\beta}_1 = \frac{\sum_{i=1}^{n} (X_i - \bar{X})(Y_i - \bar{Y})}{\sum_{i=1}^{n} (X_i - \bar{X})^2} = \frac{S_{XY}}{S_{XX}}$$

$$\hat{\beta}_0 = \bar{Y} - \hat{\beta}_1 \bar{X}$$

where:
- $\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$ is the sample mean of $X$
- $\bar{Y} = \frac{1}{n}\sum_{i=1}^{n} Y_i$ is the sample mean of $Y$
- $S_{XX} = \sum_{i=1}^{n} (X_i - \bar{X})^2$ is the sum of squares for $X$
- $S_{XY} = \sum_{i=1}^{n} (X_i - \bar{X})(Y_i - \bar{Y})$ is the sum of cross-products

## Interpretation of the Regression Coefficients

### The Slope ($\beta_1$)

The slope $\beta_1$ represents the **average change** in the response variable $Y$ for a one-unit increase in the predictor variable $X$, holding all else constant.

- If $\beta_1 > 0$: Positive relationship (as $X$ increases, $Y$ tends to increase)
- If $\beta_1 < 0$: Negative relationship (as $X$ increases, $Y$ tends to decrease)
- If $\beta_1 = 0$: No linear relationship between $X$ and $Y$

### The Intercept ($\beta_0$)

The intercept $\beta_0$ represents the **expected value** of $Y$ when $X = 0$. However, this interpretation is only meaningful if $X = 0$ is within the range of observed data. In many cases, the intercept serves primarily to anchor the line and may not have a practical interpretation.

## Fitted Values and Residuals

### Fitted Values

For each observation, the **fitted value** (or predicted value) is:

$$\hat{Y}_i = \hat{\beta}_0 + \hat{\beta}_1 X_i$$

This is the value predicted by the regression line for the given $X_i$.

### Residuals

The **residual** for observation $i$ is the difference between the observed and fitted values:

$$e_i = Y_i - \hat{Y}_i$$

Residuals represent the portion of $Y$ that the model cannot explain. They are estimates of the error terms $\epsilon_i$.

## Worked Example

Suppose we want to model the relationship between study time (hours) and exam score (points) for 5 students:

| Student | Study Time ($X$) | Exam Score ($Y$) |
|---------|------------------|------------------|
| 1       | 2                | 65               |
| 2       | 3                | 70               |
| 3       | 5                | 80               |
| 4       | 7                | 85               |
| 5       | 8                | 90               |

### Step 1: Calculate Summary Statistics

$$\bar{X} = \frac{2 + 3 + 5 + 7 + 8}{5} = 5$$

$$\bar{Y} = \frac{65 + 70 + 80 + 85 + 90}{5} = 78$$

### Step 2: Calculate $S_{XX}$ and $S_{XY}$

$$S_{XX} = (2-5)^2 + (3-5)^2 + (5-5)^2 + (7-5)^2 + (8-5)^2 = 9 + 4 + 0 + 4 + 9 = 26$$

$$S_{XY} = (2-5)(65-78) + (3-5)(70-78) + (5-5)(80-78) + (7-5)(85-78) + (8-5)(90-78)$$

$$= (-3)(-13) + (-2)(-8) + (0)(2) + (2)(7) + (3)(12) = 39 + 16 + 0 + 14 + 36 = 105$$

### Step 3: Calculate the Slope and Intercept

$$\hat{\beta}_1 = \frac{S_{XY}}{S_{XX}} = \frac{105}{26} \approx 4.04$$

$$\hat{\beta}_0 = \bar{Y} - \hat{\beta}_1 \bar{X} = 78 - 4.04(5) = 78 - 20.2 = 57.8$$

### Step 4: Write the Fitted Regression Equation

$$\hat{Y} = 57.8 + 4.04X$$

**Interpretation**: For each additional hour of study time, the expected exam score increases by approximately 4.04 points. A student who studies 0 hours would be expected to score about 57.8 points (though this extrapolation may not be realistic).

### Step 5: Calculate Fitted Values and Residuals

For Student 1 ($X_1 = 2$):
$$\hat{Y}_1 = 57.8 + 4.04(2) = 65.88$$
$$e_1 = 65 - 65.88 = -0.88$$

Similarly for all students:

| Student | $X$ | $Y$ | $\hat{Y}$ | $e$ |
|---------|-----|-----|-----------|-----|
| 1       | 2   | 65  | 65.88     | -0.88 |
| 2       | 3   | 70  | 69.92     | 0.08 |
| 3       | 5   | 80  | 78.00     | 2.00 |
| 4       | 7   | 85  | 86.08     | -1.08 |
| 5       | 8   | 90  | 90.12     | -0.12 |

Note that the residuals sum to approximately zero, which is a property of least squares estimation.

## Properties of Least Squares Estimators

Under the standard assumptions, the least squares estimators have several important properties:

1. **Unbiasedness**: $E[\hat{\beta}_0] = \beta_0$ and $E[\hat{\beta}_1] = \beta_1$
2. **Best Linear Unbiased Estimators (BLUE)**: Among all linear unbiased estimators, they have the smallest variance (Gauss-Markov Theorem)
3. **Consistency**: As $n \to \infty$, the estimators converge to the true parameter values
4. **The regression line passes through the point $(\bar{X}, \bar{Y})$**
5. **The sum of residuals is zero**: $\sum_{i=1}^{n} e_i = 0$

## Summary

Simple linear regression provides a powerful framework for understanding and quantifying linear relationships between two variables. The least squares method gives us optimal estimates of the slope and intercept, allowing us to make predictions and draw inferences about the relationship. However, it's crucial to verify that the model assumptions hold and to interpret the results in context.
