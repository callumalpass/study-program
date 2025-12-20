# Topic 6: Regression Analysis

## Overview

Regression analysis is one of the most fundamental and widely used statistical techniques for modeling relationships between variables. This topic covers both simple and multiple regression, providing the tools to understand how one or more predictor variables relate to a response variable, make predictions, test hypotheses, and build practical models for real-world applications.

## Learning Objectives

By the end of this topic, you should be able to:

1. Understand and apply simple linear regression using the method of least squares
2. Conduct hypothesis tests and construct confidence intervals for regression parameters
3. Diagnose regression models using residual analysis and check assumptions
4. Interpret correlation coefficients and the coefficient of determination (R²)
5. Fit and interpret multiple regression models with several predictors
6. Select appropriate regression models using various criteria and methods
7. Apply regression analysis to solve practical prediction and inference problems

## Subtopics

### 1. Simple Linear Regression
The foundation of regression analysis, covering the basic linear model, least squares estimation, and interpretation of slope and intercept parameters. Learn how to fit a line to data and understand what makes the least squares line optimal.

**Key Concepts**: Linear model, least squares estimation, fitted values, residuals, regression coefficients, interpretation

### 2. Regression Inference
Statistical inference for regression parameters, including hypothesis tests for the slope and intercept, confidence intervals, and prediction intervals. Learn how to assess whether relationships are statistically significant and quantify uncertainty in estimates and predictions.

**Key Concepts**: Sampling distributions, standard errors, t-tests, F-test, confidence intervals, prediction intervals, hypothesis testing

### 3. Model Diagnostics
Essential tools for checking whether regression assumptions are satisfied and identifying potential problems. Learn how to use residual plots, detect outliers and influential observations, and validate model assumptions.

**Key Concepts**: Residual analysis, Q-Q plots, heteroscedasticity, normality, independence, outliers, leverage, Cook's distance, influence diagnostics

### 4. Correlation and Coefficient of Determination
Measures of association that quantify the strength and direction of relationships. Understand how correlation relates to regression and what R² tells us about model fit.

**Key Concepts**: Pearson correlation coefficient, coefficient of determination (R²), variance decomposition, interpretation, limitations

### 5. Multiple Regression
Extension to models with multiple predictor variables, including matrix formulation, interpretation while controlling for other variables, and dealing with multicollinearity. Learn how to model complex relationships with several factors simultaneously.

**Key Concepts**: Multiple predictors, matrix notation, partial effects, multicollinearity, VIF, categorical predictors, dummy variables, adjusted R²

### 6. Model Selection
Systematic approaches to choosing which predictors to include in a regression model. Learn about the bias-variance tradeoff, information criteria, stepwise methods, and cross-validation.

**Key Concepts**: AIC, BIC, adjusted R², forward selection, backward elimination, stepwise regression, cross-validation, overfitting, parsimony

### 7. Regression Applications
Practical applications of regression analysis for prediction and explanation. Learn about model building strategies, real-world examples from diverse fields, and best practices for conducting and reporting regression analyses.

**Key Concepts**: Prediction vs. explanation, feature engineering, model validation, interpretation in context, common pitfalls, best practices

## Prerequisites

To successfully learn this material, you should be familiar with:

- Basic probability concepts (random variables, probability distributions)
- Sampling distributions and the Central Limit Theorem
- Hypothesis testing and confidence intervals
- The normal and t-distributions
- Basic matrix operations (for multiple regression)
- Descriptive statistics (mean, variance, covariance)

## Key Formulas

### Simple Linear Regression Model
$$Y_i = \beta_0 + \beta_1 X_i + \epsilon_i$$

### Least Squares Estimates
$$\hat{\beta}_1 = \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{\sum_{i=1}^{n}(X_i - \bar{X})^2} = \frac{S_{XY}}{S_{XX}}$$

$$\hat{\beta}_0 = \bar{Y} - \hat{\beta}_1\bar{X}$$

### Standard Error of the Slope
$$\text{SE}(\hat{\beta}_1) = \frac{s}{\sqrt{S_{XX}}}$$

where $s = \sqrt{\text{MSE}} = \sqrt{\frac{\text{RSS}}{n-2}}$

### t-Test for the Slope
$$t = \frac{\hat{\beta}_1}{\text{SE}(\hat{\beta}_1)} \sim t_{n-2}$$

### Correlation Coefficient
$$r = \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum_{i=1}^{n}(X_i - \bar{X})^2}\sqrt{\sum_{i=1}^{n}(Y_i - \bar{Y})^2}}$$

### Coefficient of Determination
$$R^2 = \frac{\text{SSR}}{\text{SST}} = 1 - \frac{\text{RSS}}{\text{SST}}$$

### Multiple Regression in Matrix Form
$$\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$$

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}$$

### Adjusted R²
$$R^2_{\text{adj}} = 1 - \frac{\text{RSS}/(n-p-1)}{\text{SST}/(n-1)}$$

### Information Criteria
$$\text{AIC} = n\log\left(\frac{\text{RSS}}{n}\right) + 2(p+1)$$

$$\text{BIC} = n\log\left(\frac{\text{RSS}}{n}\right) + \log(n)(p+1)$$

## Practical Applications

Regression analysis is used extensively in:

- **Economics**: Modeling relationships between economic variables (e.g., income and consumption)
- **Finance**: Predicting stock returns, assessing risk factors
- **Medicine**: Studying effects of treatments, identifying risk factors for diseases
- **Psychology**: Understanding behavioral relationships and predictors
- **Marketing**: Predicting sales, customer lifetime value, and response to advertising
- **Engineering**: Quality control, reliability analysis, process optimization
- **Environmental Science**: Modeling climate variables, pollution effects
- **Sports Analytics**: Predicting performance, player valuation
- **Real Estate**: Property valuation and price prediction

## Common Notation

- $Y$: Response (dependent) variable
- $X$: Predictor (independent) variable
- $\beta_0$: Intercept parameter
- $\beta_1$: Slope parameter (simple) or coefficient (multiple)
- $\epsilon$: Error term
- $\hat{Y}$: Fitted (predicted) value
- $e$: Residual
- $n$: Sample size
- $p$: Number of predictors
- SST: Total sum of squares
- SSR: Regression sum of squares
- RSS: Residual sum of squares
- MSE: Mean squared error
- $R^2$: Coefficient of determination
- $r$: Correlation coefficient

## Study Tips

1. **Master simple regression first**: Ensure you thoroughly understand simple linear regression before moving to multiple regression
2. **Practice interpretation**: Focus on correctly interpreting coefficients in context with proper units
3. **Work through examples**: Regression concepts become clearer through hands-on calculation
4. **Use visualization**: Always plot your data and residuals - visual inspection is crucial
5. **Understand assumptions**: Know what each assumption means and how to check it
6. **Connect concepts**: Understand how correlation, R², hypothesis tests, and ANOVA are related
7. **Think critically**: Don't blindly trust model output - always validate and question results
8. **Distinguish prediction from causation**: Remember that regression alone doesn't prove causation

## Software Tools

While this topic focuses on understanding the mathematics and concepts, regression analysis in practice is typically performed using statistical software:

- **R**: `lm()` function, extensive packages for diagnostics and visualization
- **Python**: `statsmodels`, `scikit-learn` libraries
- **SPSS**: GUI-based regression analysis
- **SAS**: PROC REG, PROC GLM
- **Excel**: Data Analysis ToolPak (for basic analyses)
- **STATA**: Specialized for econometric applications

## Further Reading

To deepen your understanding of regression analysis:

- **Introductory**: "The Statistical Sleuth" by Ramsey and Schafer
- **Applied**: "Applied Linear Statistical Models" by Kutner, Nachtsheim, and Neter
- **Theoretical**: "Introduction to Linear Regression Analysis" by Montgomery, Peck, and Vining
- **Modern Perspective**: "An Introduction to Statistical Learning" by James, Witten, Hastie, and Tibshirani
- **Advanced**: "The Elements of Statistical Learning" by Hastie, Tibshirani, and Friedman

## Connection to Other Topics

Regression analysis connects to and builds upon several other statistical concepts:

- **Topic 1-2**: Relies heavily on probability distributions, especially the normal distribution
- **Topic 3**: Uses hypothesis testing framework for inference about parameters
- **Topic 4**: Extends confidence interval concepts to regression setting
- **Topic 5**: ANOVA is a special case of regression with categorical predictors
- **Future Topics**: Foundation for more advanced methods like logistic regression, generalized linear models, and time series analysis

## Summary

Regression analysis provides a comprehensive framework for modeling relationships between variables, making predictions, and drawing inferences. From the simple two-variable case to complex models with many predictors, regression offers powerful tools for understanding data and informing decisions. Mastering regression requires understanding both the mathematical foundations and the practical considerations of model building, validation, and interpretation. With these skills, you'll be equipped to tackle a wide range of statistical problems in research and practice.
