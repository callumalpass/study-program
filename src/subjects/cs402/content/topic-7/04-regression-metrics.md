# Regression Metrics

Regression models predict continuous values, requiring metrics that quantify prediction error magnitude. Common metrics include MAE, MSE, RMSE, R², and MAPE, each with different properties and use cases.

## Mean Absolute Error (MAE)

```
MAE = (1/n) Σ|yᵢ - ŷᵢ|
```

Average absolute difference between predictions and actuals.

**Properties**:
- Intuitive: Same units as target
- Robust to outliers (compared to MSE)
- All errors weighted equally

**When to use**: When all errors matter equally and outliers shouldn't dominate.

## Mean Squared Error (MSE)

```
MSE = (1/n) Σ(yᵢ - ŷᵢ)²
```

Average squared difference.

**Properties**:
- Penalizes large errors heavily (quadratic)
- Differentiable (useful for optimization)
- Not in original units (squared)

**When to use**: When large errors are particularly undesirable. Standard loss function for linear regression.

## Root Mean Squared Error (RMSE)

```
RMSE = sqrt(MSE) = sqrt((1/n) Σ(yᵢ - ŷᵢ)²)
```

Square root of MSE, returning to original units.

**Properties**:
- Same units as target (interpretable)
- Penalizes large errors like MSE
- More sensitive to outliers than MAE

**When to use**: Want MSE's outlier sensitivity but interpretable units.

## R² (Coefficient of Determination)

```
R² = 1 - (SS_res / SS_tot)
where SS_res = Σ(yᵢ - ŷᵢ)², SS_tot = Σ(yᵢ - ȳ)²
```

Proportion of variance explained by the model.

**Properties**:
- Range: (-∞, 1]. 1 = perfect, 0 = mean baseline, <0 = worse than mean
- Unit-free (comparable across problems)
- Can be misleading with non-linear relationships

**When to use**: Comparing models on same data or communicating proportion of variance explained.

### When R² Can Be Misleading

R² is widely used but can be deceptive in several scenarios:

**1. Non-linear Relationships**: R² measures linear correlation. A model could have low R² but still capture important non-linear patterns. For example, predicting `y = x²` with linear regression yields low R² even though a clear relationship exists.

**2. Extrapolation Problems**: High R² within the training range doesn't guarantee good predictions outside that range. A polynomial regression might achieve R² = 0.99 on training data but produce nonsensical extrapolations.

**3. Automatically Increases with Features**: Adding any feature (even random noise) to a model will never decrease R² on training data. This leads to overfitting without proper validation. This is why adjusted R² exists.

**4. Different Scales, Different R²**: The same model can have vastly different R² values on datasets with different variance structures. An R² of 0.70 might be excellent in noisy domains (e.g., social sciences) but poor in precise domains (e.g., physics).

**5. Temporal Data Issues**: For time series, high R² can be misleading if the model simply predicts "tomorrow will be like today." This gives high R² but no real predictive value beyond naive persistence.

**Example of Misleading R²**:
```python
# High R² but poor practical performance
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# Create data where y = x² (non-linear)
X = np.linspace(-10, 10, 100).reshape(-1, 1)
y = X.ravel()**2

model = LinearRegression().fit(X, y)
r2 = r2_score(y, model.predict(X))
print(f"R² = {r2:.3f}")  # Might be ~0.0, despite clear relationship

# The model fails because it assumes linearity
```

## Adjusted R²

```
Adjusted R² = 1 - (1 - R²)(n-1)/(n-p-1)
```

Penalizes additional features, preventing overfitting from feature proliferation.

**When to use**: Comparing models with different numbers of features.

## Mean Absolute Percentage Error (MAPE)

```
MAPE = (100/n) Σ|( yᵢ - ŷᵢ) / yᵢ|
```

Average absolute percentage error.

**Properties**:
- Scale-independent (compare across different scales)
- Intuitive interpretation (% error)
- Undefined for yᵢ = 0, biased for yᵢ near 0

**When to use**: Errors should be proportional to magnitude. Forecasting, business metrics.

## Symmetric Mean Absolute Percentage Error (SMAPE)

```
SMAPE = (100/n) Σ(|yᵢ - ŷᵢ| / ((|yᵢ| + |ŷᵢ|)/2))
```

SMAPE addresses MAPE's asymmetry problem by using the average of actual and predicted values in the denominator.

**Properties**:
- Symmetric: Over-predictions and under-predictions treated equally
- Bounded: Range [0%, 200%] (though typically interpreted as [0%, 100%])
- Handles zeros better than MAPE (less problematic when yᵢ approaches 0)
- Still has issues when both yᵢ and ŷᵢ are near zero

**Advantages over MAPE**:
- MAPE penalizes over-predictions more heavily than under-predictions
- SMAPE provides balanced error measurement for forecasting
- More stable when actual values vary widely in magnitude

**When to use**: Time series forecasting, demand planning, when predictions can be both above and below actuals with equal concern.

## Huber Loss

```
L_δ(y, ŷ) = {
  ½(y - ŷ)²           for |y - ŷ| ≤ δ
  δ|y - ŷ| - ½δ²      for |y - ŷ| > δ
}
```

Huber loss combines the best properties of MSE and MAE, being quadratic for small errors and linear for large errors.

**Properties**:
- Robust to outliers (like MAE) while maintaining differentiability
- Quadratic near zero for smooth optimization
- Linear for large errors to reduce outlier influence
- Hyperparameter δ controls the transition point

**Choosing δ**:
- Small δ (e.g., 1.0): More like MAE, very robust to outliers
- Large δ (e.g., 10.0): More like MSE, less outlier resistance
- Typical default: δ = 1.35 (based on statistical considerations)

**When to use**: Data contains outliers that shouldn't dominate the loss, but you still want smooth gradients for optimization. Common in robust regression and reinforcement learning.

```python
import numpy as np

def huber_loss(y_true, y_pred, delta=1.0):
    error = y_true - y_pred
    abs_error = np.abs(error)
    quadratic = np.minimum(abs_error, delta)
    linear = abs_error - quadratic
    return np.mean(0.5 * quadratic**2 + delta * linear)
```

## Metric Comparison Table

| Metric | Units | Range | Outlier Sensitivity | Best Use Case | Limitations |
|--------|-------|-------|---------------------|---------------|-------------|
| **MAE** | Original | [0, ∞) | Low | Equal error weighting, robust evaluation | Doesn't penalize large errors |
| **MSE** | Squared | [0, ∞) | High | Optimization, penalize large errors | Not interpretable units, dominated by outliers |
| **RMSE** | Original | [0, ∞) | High | Interpretable MSE, standard reporting | Sensitive to outliers |
| **R²** | None | (-∞, 1] | Medium | Model comparison, variance explained | Misleading for non-linear, always improves with features |
| **Adj. R²** | None | (-∞, 1] | Medium | Comparing models with different features | Still subject to R² limitations |
| **MAPE** | Percentage | [0, ∞) | Medium | Scale-independent, business metrics | Undefined at zero, asymmetric, biased |
| **SMAPE** | Percentage | [0, 200%] | Medium | Symmetric forecasting errors | Complex interpretation, issues near zero |
| **Huber** | Original | [0, ∞) | Low-Medium | Robust regression with outliers | Requires tuning δ parameter |

## Choosing Metrics

**MAE**: Robust, interpretable, equal error weighting

**RMSE**: Penalize large errors, standard for many applications

**R²**: Explain model fit, compare models

**MAPE/SMAPE**: Percentage errors, scale-independent

**Huber Loss**: Outlier-robust training with smooth gradients

**Business context**: Choose metrics aligned with business costs. If prediction errors cost linearly (MAE), quadratically (MSE), or proportionally (MAPE), use corresponding metric.

**Domain considerations**:
- **Finance**: RMSE (large errors catastrophic), MAPE (relative performance)
- **Demand forecasting**: SMAPE (symmetric treatment), MAE (interpretable)
- **Physics/Engineering**: RMSE (precision important), R² (explained variance)
- **Healthcare**: MAE (robust to measurement errors), Huber (outlier resistance)

## Residual Analysis and Visualization

Beyond numerical metrics, visualizing residuals (errors) reveals model weaknesses and assumption violations.

### Key Residual Plots

**1. Residuals vs Predicted Values**:
- Ideal: Random scatter around zero
- Patterns indicate: Non-linearity, heteroscedasticity (non-constant variance)

**2. Residual Distribution**:
- Ideal: Normal distribution (for inference)
- Deviations indicate: Outliers, skewed errors

**3. Q-Q Plot**:
- Ideal: Points on diagonal line
- Deviations indicate: Non-normal residuals

```python
import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
from scipy import stats

# Generate sample data and predictions
np.random.seed(42)
X = np.linspace(0, 10, 100).reshape(-1, 1)
y_true = 3 * X.ravel() + 2 + np.random.normal(0, 2, 100)

model = LinearRegression().fit(X, y_true)
y_pred = model.predict(X)
residuals = y_true - y_pred

# Create comprehensive residual plots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. Residuals vs Predicted
axes[0, 0].scatter(y_pred, residuals, alpha=0.6)
axes[0, 0].axhline(y=0, color='r', linestyle='--')
axes[0, 0].set_xlabel('Predicted Values')
axes[0, 0].set_ylabel('Residuals')
axes[0, 0].set_title('Residuals vs Predicted Values')

# 2. Residual Distribution
axes[0, 1].hist(residuals, bins=20, edgecolor='black')
axes[0, 1].set_xlabel('Residuals')
axes[0, 1].set_ylabel('Frequency')
axes[0, 1].set_title('Residual Distribution')

# 3. Q-Q Plot
stats.probplot(residuals, dist="norm", plot=axes[1, 0])
axes[1, 0].set_title('Q-Q Plot')

# 4. Residuals vs Order (for time series)
axes[1, 1].scatter(range(len(residuals)), residuals, alpha=0.6)
axes[1, 1].axhline(y=0, color='r', linestyle='--')
axes[1, 1].set_xlabel('Observation Order')
axes[1, 1].set_ylabel('Residuals')
axes[1, 1].set_title('Residuals vs Order')

plt.tight_layout()
plt.show()
```

**Interpreting Patterns**:
- **Funnel shape**: Heteroscedasticity (variance increases with predictions)
- **Curved pattern**: Non-linearity not captured by model
- **Clusters**: Missing categorical variables or subgroups
- **Outliers**: Data quality issues or rare events requiring investigation

## Prediction Intervals vs Point Estimates

Most regression models provide point estimates (single predicted value), but prediction intervals quantify uncertainty.

### Understanding the Difference

**Point Estimate**: Single "best guess" prediction (e.g., ŷ = 42.5)

**Prediction Interval**: Range likely to contain future observation (e.g., [38.2, 46.8] with 95% confidence)

**Confidence Interval** (different!): Range likely to contain the true mean for given X values

### Why Prediction Intervals Matter

1. **Uncertainty Quantification**: Point estimates hide prediction uncertainty
2. **Risk Assessment**: Decision-makers need to know possible range of outcomes
3. **Model Reliability**: Narrow intervals indicate confident predictions; wide intervals suggest high uncertainty
4. **Outlier Detection**: Observations outside intervals warrant investigation

### Computing Prediction Intervals

For linear regression with normal errors:

```python
from sklearn.linear_model import LinearRegression
import numpy as np
from scipy import stats

def prediction_interval(X_train, y_train, X_test, confidence=0.95):
    """Compute prediction intervals for linear regression."""
    model = LinearRegression().fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Calculate residual standard error
    y_train_pred = model.predict(X_train)
    residuals = y_train - y_train_pred
    n = len(y_train)
    p = X_train.shape[1]
    rse = np.sqrt(np.sum(residuals**2) / (n - p - 1))

    # Calculate leverage for each test point
    X_train_mean = X_train.mean(axis=0)
    # Simplified for demonstration
    leverage = 1 + 1/n  # Rough approximation

    # t-distribution critical value
    t_val = stats.t.ppf((1 + confidence) / 2, n - p - 1)

    # Prediction interval
    margin = t_val * rse * np.sqrt(leverage)
    lower = y_pred - margin
    upper = y_pred + margin

    return y_pred, lower, upper

# Example usage
X_train = np.random.randn(100, 1)
y_train = 3 * X_train.ravel() + 2 + np.random.randn(100)
X_test = np.array([[0.5], [1.0], [1.5]])

y_pred, lower, upper = prediction_interval(X_train, y_train, X_test)

for i in range(len(X_test)):
    print(f"X={X_test[i,0]:.1f}: ŷ={y_pred[i]:.2f}, "
          f"95% PI=[{lower[i]:.2f}, {upper[i]:.2f}]")
```

**Key Insights**:
- Prediction intervals are always wider than confidence intervals
- Intervals widen for predictions far from training data mean (extrapolation uncertainty)
- Larger sample sizes reduce interval width (more data = more confidence)
- Non-linear models can use bootstrapping or quantile regression for intervals

## Example

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

y_true = [3.0, -0.5, 2.0, 7.0]
y_pred = [2.5, 0.0, 2.0, 8.0]

mae = mean_absolute_error(y_true, y_pred)
mse = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_true, y_pred)

print(f"MAE: {mae:.3f}")
print(f"MSE: {mse:.3f}")
print(f"RMSE: {rmse:.3f}")
print(f"R²: {r2:.3f}")
```

## Conclusion

Regression evaluation requires understanding metric properties and choosing based on problem requirements. MAE provides robust, interpretable error measurement. MSE/RMSE penalize large errors. R² measures variance explained. MAPE offers scale-independent percentage errors. Selecting metrics aligned with business objectives and error cost structures ensures models optimize for the right outcomes in deployment.
