---
id: math202-t6-selection
title: "Model Selection"
order: 6
---

# Model Selection

## Introduction

In multiple regression, we often face the question: which predictors should be included in the model? Including too many predictors can lead to overfitting, where the model fits the noise in the data rather than the true underlying relationship. Including too few predictors can lead to underfitting, where the model misses important relationships. **Model selection** provides systematic approaches to choosing the best set of predictors.

## The Model Selection Problem

### Why Not Include All Available Predictors?

Including all available predictors may seem appealing, but it has several drawbacks:

1. **Overfitting**: The model may fit sample-specific noise, reducing predictive performance on new data
2. **Reduced interpretability**: More complex models are harder to understand and explain
3. **Multicollinearity**: More predictors increase the chance of multicollinearity
4. **Lower precision**: More parameters mean larger standard errors
5. **Computational cost**: More complex models require more computation
6. **Occam's Razor**: Simpler models are preferable when they perform similarly

### Competing Goals

Model selection balances two competing goals:

- **Goodness of fit**: How well does the model fit the observed data?
- **Parsimony**: How simple is the model?

## All Possible Subsets

### Exhaustive Search

With $p$ predictors, there are $2^p$ possible models (each predictor is either in or out). For small $p$ (say, $p < 20$), we can fit all possible models and compare them.

**Example**: With $p = 3$ predictors ($X_1, X_2, X_3$), there are $2^3 = 8$ models:
1. No predictors (intercept only)
2. $X_1$
3. $X_2$
4. $X_3$
5. $X_1, X_2$
6. $X_1, X_3$
7. $X_2, X_3$
8. $X_1, X_2, X_3$

### Comparison Criteria

We need criteria to compare models. Common approaches include:

1. **Information criteria** (AIC, BIC)
2. **Cross-validation**
3. **Adjusted R²**

The "best" model minimizes the criterion (for AIC, BIC) or maximizes it (for adjusted R²).

## Information Criteria

Information criteria balance goodness of fit against model complexity by penalizing the number of parameters.

### Akaike Information Criterion (AIC)

$$\text{AIC} = n \log\left(\frac{\text{RSS}}{n}\right) + 2(p+1)$$

or equivalently:

$$\text{AIC} = -2\log(\mathcal{L}) + 2(p+1)$$

where $\mathcal{L}$ is the maximized likelihood.

**Interpretation**:
- First term: Measures lack of fit (larger RSS → larger AIC)
- Second term: Penalty for model complexity ($p+1$ parameters)
- **Lower AIC is better**

### Bayesian Information Criterion (BIC)

$$\text{BIC} = n \log\left(\frac{\text{RSS}}{n}\right) + \log(n)(p+1)$$

or:

$$\text{BIC} = -2\log(\mathcal{L}) + \log(n)(p+1)$$

**Interpretation**:
- Similar to AIC but with a different penalty term
- **Lower BIC is better**
- For $n > 7$, BIC penalizes complexity more heavily than AIC ($\log(n) > 2$)
- BIC tends to select simpler models than AIC

### AIC vs. BIC

**AIC (Akaike Information Criterion)**:
- Optimized for prediction
- Asymptotically selects the best model for prediction
- More liberal (tends to include more predictors)

**BIC (Bayesian Information Criterion)**:
- Optimized for identifying the "true" model
- Consistent: if the true model is among the candidates, BIC selects it as $n \to \infty$
- More conservative (tends to select simpler models)

**Which to use?**
- If prediction is the goal: AIC
- If interpretation and finding the true model: BIC
- In practice: Consider both and look for agreement

## Adjusted R²

Recall from the previous section:

$$R^2_{\text{adj}} = 1 - \frac{\text{RSS}/(n-p-1)}{\text{SST}/(n-1)}$$

**Interpretation**:
- Adjusts R² for the number of predictors
- Can decrease when irrelevant predictors are added
- **Higher adjusted R² is better**

Adjusted R² is equivalent to selecting the model with smallest $s^2 = \text{RSS}/(n-p-1)$.

## Stepwise Selection Methods

When $p$ is large, fitting all $2^p$ models is computationally infeasible. **Stepwise methods** provide efficient heuristic approaches.

### Forward Selection

**Algorithm**:
1. Start with the null model (intercept only)
2. Add the predictor that most improves the model (lowest p-value or lowest AIC/BIC)
3. Repeat step 2 until no remaining predictors improve the model significantly (or some stopping criterion is met)

**Advantages**:
- Computationally efficient
- Simple to understand

**Disadvantages**:
- Greedy algorithm: may not find the global optimum
- Once a predictor is added, it stays in (no removal)

### Backward Elimination

**Algorithm**:
1. Start with the full model (all predictors)
2. Remove the predictor that least affects the model (highest p-value or smallest increase in AIC/BIC)
3. Repeat step 2 until all remaining predictors are significant (or some stopping criterion is met)

**Advantages**:
- Can detect predictors that are jointly important but individually weak
- Computationally efficient

**Disadvantages**:
- Requires $n > p$ (cannot start with full model if more predictors than observations)
- May not find global optimum

### Stepwise Regression (Bidirectional)

**Algorithm**:
1. Start with some model (often the null model)
2. At each step:
   - Consider adding the best predictor not in the model
   - Consider removing the worst predictor in the model
   - Take the action (add or remove) that most improves the criterion
3. Repeat until no action improves the model

**Advantages**:
- More flexible than pure forward or backward
- Can correct earlier mistakes

**Disadvantages**:
- More computationally intensive
- Can cycle (add and remove the same variable)
- Still may not find global optimum

### Cautions About Stepwise Methods

1. **No guarantee of finding the best model**: These are heuristic methods
2. **Inflated Type I error**: Multiple testing without correction
3. **Biased parameter estimates**: Selection process biases estimates
4. **Overstated significance**: p-values don't account for model search
5. **Unstable**: Small data changes can lead to very different models

**Best practice**: Use stepwise methods for initial exploration, then:
- Validate on independent data
- Consider substantive knowledge
- Report the model selection process
- Use caution when making inferences

## Cross-Validation

**Cross-validation** assesses model performance on unseen data, providing a direct estimate of prediction error.

### k-Fold Cross-Validation

**Algorithm**:
1. Divide the data into $k$ roughly equal parts (folds)
2. For each fold $i = 1, \ldots, k$:
   - Fit the model on all data except fold $i$
   - Predict responses for fold $i$
   - Calculate prediction error for fold $i$
3. Average the prediction errors across all folds

The **cross-validation score** is:

$$\text{CV} = \frac{1}{n}\sum_{i=1}^{k} \sum_{j \in \text{fold } i} (Y_j - \hat{Y}_{j}^{(-i)})^2$$

where $\hat{Y}_{j}^{(-i)}$ is the prediction for observation $j$ from the model fitted without fold $i$.

Common choices: $k = 5$ or $k = 10$

### Leave-One-Out Cross-Validation (LOOCV)

A special case where $k = n$ (each fold is a single observation).

$$\text{CV} = \frac{1}{n}\sum_{i=1}^{n} (Y_i - \hat{Y}_{i}^{(-i)})^2$$

For linear regression, there's a computational shortcut:

$$\text{CV} = \frac{1}{n}\sum_{i=1}^{n} \left(\frac{e_i}{1 - h_{ii}}\right)^2$$

where $e_i$ is the ordinary residual and $h_{ii}$ is the leverage.

### Advantages of Cross-Validation

- Direct estimate of prediction performance
- Makes efficient use of data
- Model-agnostic (works for any modeling approach)

### Selecting Models Using Cross-Validation

1. For each candidate model, calculate the CV score
2. Select the model with the lowest CV score
3. Refit the selected model on the full dataset

## Worked Example

Suppose we have data on house prices ($Y$, in $1000) with 4 potential predictors:
- $X_1$: Square footage (100s)
- $X_2$: Number of bedrooms
- $X_3$: Age (years)
- $X_4$: Distance to city center (miles)

We have $n = 50$ observations. Here are results from fitting several models:

| Model | Predictors | $p$ | RSS | $R^2$ | $R^2_{\text{adj}}$ | AIC | BIC |
|-------|-----------|-----|-----|-------|-------------------|-----|-----|
| M1    | $X_1$ | 1 | 2400 | 0.520 | 0.510 | 356 | 360 |
| M2    | $X_1, X_2$ | 2 | 2200 | 0.560 | 0.541 | 352 | 358 |
| M3    | $X_1, X_3$ | 2 | 2100 | 0.580 | 0.562 | 348 | 354 |
| M4    | $X_1, X_4$ | 2 | 2350 | 0.530 | 0.510 | 355 | 361 |
| M5    | $X_1, X_2, X_3$ | 3 | 2000 | 0.600 | 0.574 | 345 | 353 |
| M6    | $X_1, X_2, X_4$ | 3 | 2180 | 0.564 | 0.536 | 353 | 361 |
| M7    | $X_1, X_3, X_4$ | 3 | 2050 | 0.590 | 0.563 | 347 | 355 |
| M8    | $X_1, X_2, X_3, X_4$ | 4 | 1990 | 0.602 | 0.567 | 347 | 357 |

### Analysis by Different Criteria

**By AIC**:
- Model M5 has the lowest AIC (345)
- M5 includes square footage, bedrooms, and age

**By BIC**:
- Model M5 also has the lowest BIC (353)
- BIC agrees with AIC in this case

**By Adjusted R²**:
- Model M5 has the highest adjusted R² (0.574)
- Again, all three criteria agree

**Observation**:
- Adding distance ($X_4$) to M5 gives M8, which:
  - Slightly increases $R^2$ (0.600 → 0.602)
  - Decreases adjusted $R^2$ (0.574 → 0.567)
  - Increases AIC (345 → 347)
  - Increases BIC (353 → 357)
- This suggests $X_4$ is not useful after accounting for $X_1, X_2, X_3$

**Conclusion**: Model M5 ($Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \beta_3 X_3$) appears to be the best model.

### Forward Selection Trace

Starting from the null model:

1. **Step 1**: Try adding each predictor individually
   - Best: $X_1$ (lowest AIC = 356)
   - Current model: M1

2. **Step 2**: Try adding each remaining predictor to M1
   - Best: Add $X_3$ to get M3 (AIC = 348)
   - Current model: M3

3. **Step 3**: Try adding each remaining predictor to M3
   - Best: Add $X_2$ to get M5 (AIC = 345)
   - Current model: M5

4. **Step 4**: Try adding remaining predictor to M5
   - Adding $X_4$ gives M8 (AIC = 347), which is worse
   - **Stop**: No improvement

Final model: M5 (same as all subsets approach)

## Regularization Methods (Preview)

Modern alternatives to subset selection use **regularization** (also called **shrinkage**) methods:

### Ridge Regression

Adds a penalty to the coefficient magnitudes:

$$\text{Minimize: } \text{RSS} + \lambda \sum_{j=1}^{p} \beta_j^2$$

where $\lambda \geq 0$ is a tuning parameter.

- Shrinks coefficients toward zero
- Does not set coefficients exactly to zero
- Good when many predictors are moderately useful

### Lasso (Least Absolute Shrinkage and Selection Operator)

$$\text{Minimize: } \text{RSS} + \lambda \sum_{j=1}^{p} |\beta_j|$$

- Shrinks coefficients toward zero
- Can set some coefficients exactly to zero (performs variable selection)
- Good for sparse models (few important predictors)

### Elastic Net

Combines ridge and lasso penalties:

$$\text{Minimize: } \text{RSS} + \lambda_1 \sum_{j=1}^{p} |\beta_j| + \lambda_2 \sum_{j=1}^{p} \beta_j^2$$

These methods are particularly useful when $p$ is large or when predictors are highly correlated.

## Practical Guidelines for Model Selection

1. **Start with theory**: Use subject-matter knowledge to guide predictor choice
2. **Check for multicollinearity**: Remove or combine highly correlated predictors
3. **Consider all criteria**: Look at AIC, BIC, adjusted R², and cross-validation
4. **Prefer simpler models**: When models perform similarly, choose the simpler one
5. **Validate externally**: Test the final model on independent data if possible
6. **Check assumptions**: Ensure the selected model satisfies regression assumptions
7. **Be transparent**: Report the selection process and acknowledge uncertainty
8. **Don't overinterpret**: Selected models are uncertain; avoid strong causal claims

## Common Pitfalls

1. **Data snooping**: Using the data multiple times inflates Type I error
2. **p-value interpretation**: p-values from stepwise methods are not valid
3. **Ignoring uncertainty**: The "best" model may not be much better than others
4. **Automated mindset**: Don't blindly trust automated procedures
5. **Confusing prediction and explanation**: Different goals may require different models

## Summary

Model selection is a critical but challenging aspect of regression analysis:

- **Goal**: Balance goodness of fit with parsimony
- **Criteria**: AIC, BIC, adjusted R², cross-validation each have strengths
- **Methods**: All subsets (small $p$), stepwise procedures (large $p$), or regularization
- **Key principle**: Use multiple criteria and substantive knowledge
- **Validation**: Always assess performance on new data when possible

Remember that model selection introduces uncertainty. The "best" model is an estimate, not a truth. Multiple models may fit similarly well, and different reasonable approaches may select different models. Transparency about the selection process and appropriate caution in interpretation are essential.
