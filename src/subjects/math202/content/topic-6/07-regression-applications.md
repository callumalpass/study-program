---
id: math202-t6-applications
title: "Regression Applications"
order: 7
---

# Regression Applications

## Introduction

Regression analysis is one of the most widely used statistical techniques across diverse fields including economics, medicine, engineering, social sciences, and business. This section explores practical applications of regression, focusing on prediction, model building strategies, and real-world examples that demonstrate the power and versatility of regression methods.

## Prediction vs. Explanation

Regression models can serve two distinct purposes, each requiring different approaches:

### Prediction

**Goal**: Accurately forecast future or unobserved values of the response variable.

**Characteristics**:
- Focus on predictive accuracy, not interpretability
- Can include many predictors, even if relationships aren't understood
- Evaluated by prediction error on new data
- Common in machine learning applications

**Example**: Predicting tomorrow's stock price using historical prices, trading volume, and market indicators.

### Explanation (Inference)

**Goal**: Understand relationships and identify causal effects.

**Characteristics**:
- Focus on interpretability and statistical significance
- Prefer simpler models with meaningful predictors
- Evaluated by significance tests, effect sizes, and theoretical coherence
- Common in scientific research

**Example**: Understanding how education and experience affect wages to inform policy decisions.

**Key Insight**: The same dataset may yield different "best" models depending on the goal.

## Building a Prediction Model

### Step-by-Step Process

#### 1. Data Splitting

Divide data into:
- **Training set** (typically 60-80%): For model fitting and selection
- **Validation set** (10-20%): For model comparison and tuning
- **Test set** (10-20%): For final evaluation (never used until the end)

#### 2. Exploratory Data Analysis

- Examine distributions of variables
- Create scatter plots and correlation matrices
- Identify potential outliers
- Check for missing values
- Consider transformations

#### 3. Feature Engineering

Create new predictors from existing ones:
- **Polynomial terms**: $X^2$, $X^3$ for nonlinear relationships
- **Interactions**: $X_1 \times X_2$ when effects depend on each other
- **Transformations**: $\log(X)$, $\sqrt{X}$, $1/X$ to improve linearity
- **Dummy variables**: For categorical predictors
- **Derived features**: Domain-specific combinations

#### 4. Model Fitting and Selection

- Fit multiple candidate models
- Use cross-validation on the training set
- Compare models using AIC, BIC, or CV error
- Select the best performing model

#### 5. Model Validation

- Assess performance on the validation set
- If poor, return to step 3 or 4
- Check assumptions using diagnostics

#### 6. Final Evaluation

- Evaluate the final model on the test set (only once!)
- Report prediction metrics:
  - **RMSE** (Root Mean Squared Error): $\sqrt{\frac{1}{n}\sum(Y_i - \hat{Y}_i)^2}$
  - **MAE** (Mean Absolute Error): $\frac{1}{n}\sum|Y_i - \hat{Y}_i|$
  - **MAPE** (Mean Absolute Percentage Error): $\frac{100}{n}\sum\frac{|Y_i - \hat{Y}_i|}{|Y_i|}$

### Prediction Intervals

For individual predictions, provide prediction intervals to quantify uncertainty:

$$\hat{Y}_{\text{new}} \pm t_{\alpha/2, n-p-1} \cdot s\sqrt{1 + \mathbf{x}_{\text{new}}^T(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{x}_{\text{new}}}$$

where $\mathbf{x}_{\text{new}}$ is the vector of predictor values for the new observation.

## Building an Explanatory Model

### Step-by-Step Process

#### 1. Specify the Research Question

Clearly define:
- The response variable of interest
- The key predictor(s) whose effect you want to estimate
- Potential confounding variables to control for

#### 2. Theoretical Framework

- Review relevant literature
- Develop hypotheses based on theory
- Identify predictors that should be included based on subject knowledge
- Consider potential confounders and mediators

#### 3. Model Specification

- Include predictors based on theory, not just statistical significance
- Consider functional form (linear, quadratic, etc.)
- Include interactions if theoretically justified
- Control for known confounders

#### 4. Model Estimation

- Fit the model using least squares
- Check assumptions using diagnostics
- If assumptions are violated, consider transformations or robust methods

#### 5. Inference

- Conduct hypothesis tests for coefficients of interest
- Calculate confidence intervals
- Assess practical significance (effect sizes), not just statistical significance

#### 6. Sensitivity Analysis

- Check robustness to outliers
- Try alternative model specifications
- Report results from multiple reasonable models if they differ

#### 7. Interpretation

- Interpret coefficients in context with proper units
- Discuss limitations and potential biases
- Avoid causal language unless design supports it (e.g., randomized experiment)

## Application 1: Real Estate Pricing

### Context

A real estate company wants to predict house prices to help with pricing and investment decisions.

### Data

Dataset of 200 recently sold houses with:
- **Response**: Sale price ($1000s)
- **Predictors**:
  - $X_1$: Living area (square feet)
  - $X_2$: Lot size (acres)
  - $X_3$: Number of bedrooms
  - $X_4$: Number of bathrooms
  - $X_5$: Age of house (years)
  - $X_6$: Garage spaces
  - $X_7$: Location quality (1-10 scale)

### Analysis

#### Exploratory Analysis

Initial scatter plots reveal:
- Strong positive relationship between price and living area
- Weak relationship between price and lot size
- Nonlinear relationship between price and age (price decreases rapidly for first 20 years, then stabilizes)
- Price increases with location quality

#### Feature Engineering

Create new variables:
- $X_1^2$: Square of living area (to capture diminishing returns)
- $X_5^*$: $\max(0, 20 - X_5)$ to capture accelerated depreciation in first 20 years
- $X_1 \times X_7$: Interaction between area and location (larger homes in better locations command premium)

#### Model Building

After trying several models and using 10-fold cross-validation:

**Final Model**:
$$\hat{Y} = 45.2 + 0.082X_1 - 0.000015X_1^2 + 8.5X_2 + 12.3X_4 - 1.2X_5^* + 5.8X_6 + 18.5X_7 + 0.003X_1 \times X_7$$

**Results**:
- Training RMSE: $28.5 (1000s)
- Test RMSE: $31.2 (1000s)
- $R^2$ on test set: 0.85

**Interpretation**:
- Each additional square foot of living area increases price by about $82, but the effect decreases for very large homes (negative $X_1^2$ term)
- Each additional bathroom adds about $12,300 to the price
- In the first 20 years, each year of age decreases price by about $1,200
- The interaction term shows that area is more valuable in better locations

#### Prediction Example

For a house with:
- 2,500 sq ft, 0.3 acres, 3 bedrooms, 2.5 baths, 10 years old, 2-car garage, location quality 7

$$\hat{Y} = 45.2 + 0.082(2500) - 0.000015(2500)^2 + 8.5(0.3) + 12.3(2.5) - 1.2(10) + 5.8(2) + 18.5(7) + 0.003(2500)(7)$$

$$= 45.2 + 205 - 93.75 + 2.55 + 30.75 - 12 + 11.6 + 129.5 + 52.5 = 371.35$$

**Predicted price**: $371,350

With a 95% prediction interval (assuming $s = 31.2$):
$$371.35 \pm 1.96(31.2) = 371.35 \pm 61.15 = (310.2, 432.5)$$

**Interpretation**: We are 95% confident this house will sell for between $310,200 and $432,500.

## Application 2: Medical Research - Blood Pressure

### Context

Researchers want to understand factors affecting systolic blood pressure to identify intervention targets.

### Data

Study of 500 adults with:
- **Response**: Systolic blood pressure (mmHg)
- **Predictors**:
  - $X_1$: Age (years)
  - $X_2$: BMI (kg/m²)
  - $X_3$: Sodium intake (mg/day)
  - $X_4$: Exercise (hours/week)
  - $X_5$: Smoking status (0 = non-smoker, 1 = smoker)
  - $X_6$: Family history of hypertension (0 = no, 1 = yes)

### Analysis

#### Research Questions

1. How does exercise affect blood pressure after controlling for other factors?
2. Does the effect of BMI differ between smokers and non-smokers?

#### Model Specification

Based on medical literature:
$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \beta_3 X_3 + \beta_4 X_4 + \beta_5 X_5 + \beta_6 X_6 + \beta_7 (X_2 \times X_5) + \epsilon$$

The interaction $X_2 \times X_5$ tests whether the effect of BMI differs for smokers.

#### Results

**Fitted Model**:
$$\hat{Y} = 85.3 + 0.42X_1 + 1.85X_2 + 0.008X_3 - 1.32X_4 + 8.5X_5 + 5.2X_6 + 0.65(X_2 \times X_5)$$

**Statistical Significance** (at $\alpha = 0.05$):
- All coefficients except $X_3$ (sodium) are statistically significant
- The interaction term is significant (p = 0.023)

**Interpretation**:

1. **Exercise effect** ($\beta_4 = -1.32$, 95% CI: $[-2.05, -0.59]$):
   - Each additional hour of exercise per week is associated with a 1.32 mmHg decrease in systolic blood pressure, holding other factors constant
   - This is both statistically significant and clinically meaningful

2. **BMI effect**:
   - For non-smokers ($X_5 = 0$): Each unit increase in BMI increases blood pressure by 1.85 mmHg
   - For smokers ($X_5 = 1$): Each unit increase in BMI increases blood pressure by $1.85 + 0.65 = 2.50$ mmHg
   - The positive interaction suggests smoking amplifies the negative effects of high BMI

3. **Sodium**: Not statistically significant after controlling for other factors (p = 0.18)

#### Clinical Implications

- Exercise interventions could have meaningful impact on blood pressure
- Weight management is particularly important for smokers
- Smoking cessation programs should emphasize cardiovascular risks beyond direct smoking effects

## Application 3: Business Analytics - Customer Lifetime Value

### Context

An e-commerce company wants to predict customer lifetime value (CLV) to optimize marketing spend.

### Data

First-year data from 1,000 customers:
- **Response**: Total purchases in first year ($)
- **Predictors**:
  - $X_1$: Number of visits to website
  - $X_2$: Email engagement score (0-100)
  - $X_3$: Value of first purchase
  - $X_4$: Days since first purchase
  - $X_5$: Customer acquisition source (dummy variables for organic, paid ad, referral, social media)
  - $X_6$: Average cart abandonment rate (%)

### Analysis

#### Transformations

The response is highly right-skewed. Taking $\log(Y + 1)$ yields a more normal distribution.

#### Model with Categorical Predictor

Create dummy variables for acquisition source (using "organic" as reference):
- $D_1 = 1$ if paid ad, 0 otherwise
- $D_2 = 1$ if referral, 0 otherwise
- $D_3 = 1$ if social media, 0 otherwise

#### Results

**Fitted Model** (predicting $\log(Y + 1)$):
$$\widehat{\log(Y + 1)} = 2.1 + 0.015X_1 + 0.018X_2 + 0.0082X_3 - 0.001X_4 + 0.35D_1 + 0.62D_2 + 0.18D_3 - 0.008X_6$$

**Interpretation**:

1. **Email engagement**: Each 1-point increase in engagement score is associated with a 1.8% increase in CLV (approximately)

2. **Acquisition source** (compared to organic):
   - Paid ad customers: 42% higher CLV on average ($e^{0.35} \approx 1.42$)
   - Referral customers: 86% higher CLV on average ($e^{0.62} \approx 1.86$)
   - Social media customers: 20% higher CLV on average ($e^{0.18} \approx 1.20$)

3. **Cart abandonment**: Each 1% increase in abandonment rate decreases CLV by about 0.8%

#### Business Implications

- **Referral programs deserve investment**: Referred customers have the highest CLV
- **Email marketing is valuable**: Even small improvements in engagement have measurable impact
- **Paid ads are effective**: Though less than referrals, they outperform organic acquisition
- **Reduce cart abandonment**: This has direct impact on revenue

## Common Pitfalls in Applications

### 1. Extrapolation

**Problem**: Making predictions outside the range of observed data.

**Example**: Using a model built on houses between 1,000-3,000 sq ft to predict the price of a 5,000 sq ft mansion.

**Solution**: Only make predictions within the range of the data used to fit the model.

### 2. Confusing Correlation with Causation

**Problem**: Interpreting regression coefficients as causal effects when they may reflect confounding.

**Example**: Finding that ice cream sales predict crime rates and concluding ice cream causes crime (both are confounded by temperature).

**Solution**: Use causal language only with experimental or quasi-experimental designs. Otherwise, use "associated with" or "predicts" rather than "causes."

### 3. Ignoring Assumptions

**Problem**: Failing to check whether regression assumptions hold.

**Example**: Using standard errors when residuals show severe heteroscedasticity.

**Solution**: Always conduct diagnostic checks and use appropriate remedies (transformations, robust methods) when assumptions are violated.

### 4. Overfitting

**Problem**: Building overly complex models that fit noise in the training data.

**Example**: Including 20 predictors with only 50 observations.

**Solution**: Use cross-validation, keep $n > 10p$ as a rough guide, and validate on independent data.

### 5. Cherry-Picking Results

**Problem**: Reporting only models or predictors that show desired results.

**Example**: Trying 50 predictors and reporting only the 3 that are significant.

**Solution**: Pre-specify hypotheses when possible, report the model selection process, and adjust for multiple testing.

## Best Practices Checklist

### Data Preparation
- [ ] Check for missing values and outliers
- [ ] Examine distributions and consider transformations
- [ ] Split data into training/validation/test sets (for prediction)
- [ ] Standardize or scale predictors if needed

### Model Building
- [ ] Start simple and add complexity gradually
- [ ] Use theory and domain knowledge to guide predictor selection
- [ ] Create meaningful interactions and transformations
- [ ] Compare multiple candidate models

### Model Validation
- [ ] Check all regression assumptions using diagnostic plots
- [ ] Examine residuals, leverage, and influence
- [ ] Conduct sensitivity analyses
- [ ] Validate on independent data when possible

### Interpretation and Reporting
- [ ] Interpret coefficients in context with proper units
- [ ] Report both statistical and practical significance
- [ ] Provide confidence/prediction intervals
- [ ] Discuss limitations and assumptions
- [ ] Avoid causal language without appropriate design
- [ ] Make results reproducible (share code and data if possible)

## Summary

Regression analysis is a powerful and versatile tool for prediction and understanding relationships:

- **Prediction models** focus on accuracy and can be complex
- **Explanatory models** focus on interpretability and theoretical coherence
- **Practical applications** span diverse fields with different goals and constraints
- **Success requires** careful attention to assumptions, validation, and proper interpretation
- **Pitfalls are common** but can be avoided with thoughtful analysis

By combining statistical rigor with domain knowledge and careful reasoning, regression analysis can provide valuable insights and accurate predictions that inform decision-making in research, business, medicine, and beyond.
