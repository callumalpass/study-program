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

## Choosing Metrics

**MAE**: Robust, interpretable, equal error weighting

**RMSE**: Penalize large errors, standard for many applications

**R²**: Explain model fit, compare models

**MAPE**: Percentage errors, scale-independent

**Business context**: Choose metrics aligned with business costs. If prediction errors cost linearly (MAE), quadratically (MSE), or proportionally (MAPE), use corresponding metric.

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
