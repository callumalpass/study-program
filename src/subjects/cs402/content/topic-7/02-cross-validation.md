# Cross-Validation

Cross-validation provides more robust performance estimates than single train-test splits by averaging over multiple splits. This reduces variance in performance estimates and makes better use of limited data.

## K-Fold Cross-Validation

K-fold CV splits data into k equal folds, training on k-1 folds and testing on the remaining fold, repeating k times.

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
print(f"Accuracy: {scores.mean():.3f} (+/- {scores.std():.3f})")
```

**Advantages**: Uses all data for both training and testing. Reduces variance through averaging.

**Disadvantages**: Computationally expensive (k times slower). May violate independence for time series or grouped data.

**Typical k values**: 5 or 10. Higher k reduces bias but increases variance and computation.

### Mathematical Intuition: Why Cross-Validation Reduces Variance

The variance reduction in k-fold CV comes from averaging multiple correlated estimates. Consider a single train-test split producing performance estimate $\hat{P}_1$ with variance $\sigma^2$. If we have k independent estimates, the variance of their average would be:

$$\text{Var}(\bar{P}) = \frac{\sigma^2}{k}$$

However, in k-fold CV, the folds are not fully independent—they share $(k-2)/(k-1)$ of their training data. If the correlation between fold estimates is $\rho$, the actual variance is:

$$\text{Var}(\bar{P}_{CV}) = \frac{\sigma^2}{k} + \frac{k-1}{k}\rho\sigma^2$$

Even with correlation, this is substantially lower than $\sigma^2$ for reasonable k values. For k=5 with $\rho=0.5$, we get:

$$\text{Var}(\bar{P}_{CV}) = 0.2\sigma^2 + 0.4\sigma^2 = 0.6\sigma^2$$

This 40% variance reduction makes CV estimates much more stable and reliable than single splits. The key insight: while individual fold estimates are noisy, averaging smooths out fold-specific quirks in the data split.

### Choosing the Right k Value: Empirical Guidelines

The choice of k involves a fundamental tradeoff between bias and variance:

**Bias perspective**: Higher k means larger training sets (n(k-1)/k samples), which better approximate training on all n samples. This reduces optimistic bias.

**Variance perspective**: Higher k creates more similar training sets (higher correlation $\rho$), reducing the variance reduction benefit of averaging.

**Empirical recommendations**:

- **k=5**: Default choice. Empirical studies (Kohavi 1995) show 5-fold CV achieves good bias-variance balance with reasonable computation cost. Works well for datasets with 100-10,000 samples.

- **k=10**: When you can afford 2x more computation. Slightly lower bias than k=5, marginal variance improvement. Preferred for datasets >10,000 samples or when precise estimates are critical.

- **k=3**: When computational budget is tight or with very large datasets (>100,000 samples). Higher bias but still better than single split.

- **k=n (LOOCV)**: Only for n<100. Beyond this, high variance and computation cost outweigh bias reduction.

**Rule of thumb**: Start with k=5. Increase to k=10 if computational cost is acceptable and you need lower variance. Decrease to k=3 only when forced by computational constraints.

## Stratified K-Fold

Maintains class proportions in each fold, crucial for imbalanced data.

```python
from sklearn.model_selection import StratifiedKFold
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=skf)
```

## Leave-One-Out Cross-Validation (LOOCV)

Extreme case where k = n (sample size). Each iteration trains on n-1 examples, tests on 1.

**Advantages**: Maximum data for training. Deterministic (no randomness).

**Disadvantages**: Computationally prohibitive for large datasets. High variance (test sets overlap heavily).

**When to use**: Very small datasets (<100 samples) where every example matters.

## Time Series Cross-Validation

For temporal data, use time-aware splits that respect chronological order.

```python
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    X_train, X_test = X[train_idx], X[test_idx]
    # Train is always before test
```

Walk-forward validation expands training set each fold while moving test window forward.

## Grouped K-Fold

For grouped data (observations from same entity), keep groups together.

```python
from sklearn.model_selection import GroupKFold
gkf = GroupKFold(n_splits=5)
scores = cross_val_score(model, X, y, groups=groups, cv=gkf)
```

## Nested Cross-Validation

For hyperparameter tuning with honest performance estimates, use nested CV:

**Outer loop**: Estimates generalization performance  
**Inner loop**: Tunes hyperparameters

```python
from sklearn.model_selection import GridSearchCV, cross_val_score

inner_cv = StratifiedKFold(n_splits=3)
outer_cv = StratifiedKFold(n_splits=5)

clf = GridSearchCV(model, param_grid, cv=inner_cv)
scores = cross_val_score(clf, X, y, cv=outer_cv)
```

This prevents hyperparameter overfitting—tuning on test data.

## Bootstrap vs Cross-Validation

Both bootstrap and cross-validation estimate model performance through resampling, but they differ fundamentally in their approach and properties.

### Bootstrap (.632 and .632+)

Bootstrap creates multiple training sets by sampling with replacement from the original data. Each bootstrap sample has the same size as the original dataset, but samples are drawn with replacement, meaning some observations appear multiple times while others (~36.8%) are excluded.

```python
from sklearn.utils import resample
import numpy as np

def bootstrap_score(model, X, y, n_iterations=100):
    scores = []
    n = len(X)
    for i in range(n_iterations):
        # Sample with replacement
        indices = resample(range(n), n_samples=n, random_state=i)
        oob_indices = list(set(range(n)) - set(indices))

        X_train, y_train = X[indices], y[indices]
        X_test, y_test = X[oob_indices], y[oob_indices]

        model.fit(X_train, y_train)
        scores.append(model.score(X_test, y_test))

    return np.mean(scores), np.std(scores)
```

The .632 estimator combines training error and out-of-bag (OOB) error:

$$\text{Err}_{.632} = 0.368 \times \text{Err}_{train} + 0.632 \times \text{Err}_{OOB}$$

**Key differences**:

| Aspect | Cross-Validation | Bootstrap |
|--------|-----------------|-----------|
| Sampling | Without replacement (partition) | With replacement (overlapping) |
| Test sets | Disjoint, cover all data | OOB samples (~37% each iteration) |
| Training set size | Fixed (k-1)/k of data | Same as original but with duplicates |
| Bias | Low (especially high k) | Can be pessimistic (smaller effective training set) |
| Variance | Moderate | Generally higher |
| Computation | k iterations | Typically 50-200 iterations |

**When to use bootstrap**: Small datasets (<100 samples) where CV would waste too much data, or when you need confidence intervals for the performance estimate itself.

**When to use CV**: Most situations. CV is the gold standard for performance estimation in machine learning because it uses data more efficiently and produces less biased estimates.

## Common Mistakes and How to Avoid Them

### Mistake 1: Data Leakage Across Folds

**Problem**: Applying preprocessing (scaling, imputation, feature selection) before splitting into folds.

```python
# WRONG: Leakage from test folds into training
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Uses statistics from ALL data
scores = cross_val_score(model, X_scaled, y, cv=5)
```

**Solution**: Use pipelines to ensure preprocessing happens within each fold.

```python
# CORRECT: Preprocessing isolated per fold
from sklearn.pipeline import Pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', model)
])
scores = cross_val_score(pipe, X, y, cv=5)  # Scaler fits on training folds only
```

### Mistake 2: Not Using Stratification for Classification

**Problem**: Random splits can create imbalanced folds, especially with small datasets or rare classes.

```python
# WRONG: May get folds with very different class distributions
scores = cross_val_score(model, X, y, cv=5)
# Fold 1: 80% class 0, Fold 2: 55% class 0, etc.
```

**Solution**: Always use stratified CV for classification.

```python
# CORRECT: Maintains class proportions
from sklearn.model_selection import StratifiedKFold
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv)
```

### Mistake 3: Shuffling Time Series Data

**Problem**: Breaking temporal dependencies by randomly shuffling time-ordered data.

```python
# WRONG: Future data leaks into training set
from sklearn.model_selection import KFold
kf = KFold(n_splits=5, shuffle=True)  # Destroys temporal order!
scores = cross_val_score(model, X_timeseries, y_timeseries, cv=kf)
```

**Solution**: Use TimeSeriesSplit to respect chronological order.

```python
# CORRECT: Training always precedes testing
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5)
scores = cross_val_score(model, X_timeseries, y_timeseries, cv=tscv)
```

### Mistake 4: Hyperparameter Tuning Without Nested CV

**Problem**: Using the same CV folds for both hyperparameter tuning and performance estimation leads to optimistic bias.

```python
# WRONG: Test set used for hyperparameter selection
grid = GridSearchCV(model, param_grid, cv=5)
grid.fit(X, y)
print(f"Score: {grid.best_score_}")  # Optimistically biased!
```

**Solution**: Use nested CV with separate inner/outer loops.

```python
# CORRECT: Unbiased performance estimate
inner_cv = KFold(n_splits=3)
outer_cv = KFold(n_splits=5)
grid = GridSearchCV(model, param_grid, cv=inner_cv)
scores = cross_val_score(grid, X, y, cv=outer_cv)
print(f"True generalization: {scores.mean():.3f}")
```

### Mistake 5: Ignoring Grouped Structure

**Problem**: Treating observations from the same entity (patient, user, location) as independent.

```python
# WRONG: Same patient appears in train and test
scores = cross_val_score(model, X_medical, y_medical, cv=5)
# Patient 123's data might be in both training and test folds
```

**Solution**: Use GroupKFold to keep groups together.

```python
# CORRECT: Each patient entirely in train OR test
from sklearn.model_selection import GroupKFold
gkf = GroupKFold(n_splits=5)
scores = cross_val_score(model, X_medical, y_medical, groups=patient_ids, cv=gkf)
```

## Practical Considerations

**Computational cost**: k-fold with grid search multiplies costs. Use fewer folds or coarser grids for expensive models.

**Shuffle**: For i.i.d. data, shuffle before splitting. For time series, don't shuffle.

**Randomness**: Set random_state for reproducibility.

**Variance vs. bias**: Higher k reduces bias but increases variance and computation.

### Visualizing Cross-Validation Results

Visualization helps understand the stability and distribution of CV scores across folds.

```python
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import cross_validate

# Get detailed CV results
cv_results = cross_validate(
    model, X, y, cv=5,
    scoring=['accuracy', 'precision', 'recall', 'f1'],
    return_train_score=True
)

# Plot train vs test scores per fold
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
metrics = ['accuracy', 'precision', 'recall', 'f1']

for idx, metric in enumerate(metrics):
    ax = axes[idx // 2, idx % 2]
    folds = np.arange(1, 6)

    train_scores = cv_results[f'train_{metric}']
    test_scores = cv_results[f'test_{metric}']

    ax.plot(folds, train_scores, 'o-', label='Train', linewidth=2)
    ax.plot(folds, test_scores, 's-', label='Test', linewidth=2)
    ax.fill_between(folds, train_scores, test_scores, alpha=0.2)

    ax.set_xlabel('Fold')
    ax.set_ylabel(metric.capitalize())
    ax.set_title(f'{metric.capitalize()}: {test_scores.mean():.3f} ± {test_scores.std():.3f}')
    ax.legend()
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('cv_results.png', dpi=300, bbox_inches='tight')
```

This visualization reveals overfitting (large train-test gap) and fold variance (test score stability).

```python
# Box plot comparing multiple models
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

models = {
    'Logistic Regression': LogisticRegression(),
    'Random Forest': RandomForestClassifier(),
    'SVM': SVC()
}

results = []
names = []

for name, model in models.items():
    cv_scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
    results.append(cv_scores)
    names.append(name)

plt.figure(figsize=(10, 6))
plt.boxplot(results, labels=names)
plt.ylabel('Accuracy')
plt.title('Model Comparison via 5-Fold Cross-Validation')
plt.grid(True, alpha=0.3)
plt.savefig('model_comparison.png', dpi=300, bbox_inches='tight')
```

Box plots show not just mean performance but also variance and outliers, helping choose robust models.

## When to Use Each Method

**5-Fold CV**: Default for most problems. Good bias-variance tradeoff.

**10-Fold CV**: When computational cost is acceptable and lower variance is desired.

**Stratified**: Always for classification, especially imbalanced data.

**Time Series Split**: For temporal data where order matters.

**Grouped**: When observations cluster by entity (patients, users, etc.).

**LOOCV**: Only for tiny datasets where traditional CV is too data-wasteful.

## Conclusion

Cross-validation provides robust performance estimation by averaging over multiple train-test splits. Choosing appropriate CV strategy—k-fold, stratified, time series, or grouped—depends on data characteristics. While computationally expensive, CV's reduced variance and efficient data use make it essential for reliable model evaluation, especially with limited data.
