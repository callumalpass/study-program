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

## Practical Considerations

**Computational cost**: k-fold with grid search multiplies costs. Use fewer folds or coarser grids for expensive models.

**Shuffle**: For i.i.d. data, shuffle before splitting. For time series, don't shuffle.

**Randomness**: Set random_state for reproducibility.

**Variance vs. bias**: Higher k reduces bias but increases variance and computation.

## When to Use Each Method

**5-Fold CV**: Default for most problems. Good bias-variance tradeoff.

**10-Fold CV**: When computational cost is acceptable and lower variance is desired.

**Stratified**: Always for classification, especially imbalanced data.

**Time Series Split**: For temporal data where order matters.

**Grouped**: When observations cluster by entity (patients, users, etc.).

**LOOCV**: Only for tiny datasets where traditional CV is too data-wasteful.

## Conclusion

Cross-validation provides robust performance estimation by averaging over multiple train-test splits. Choosing appropriate CV strategy—k-fold, stratified, time series, or grouped—depends on data characteristics. While computationally expensive, CV's reduced variance and efficient data use make it essential for reliable model evaluation, especially with limited data.
