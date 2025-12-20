# Hyperparameter Tuning

Hyperparameters control model behavior but aren't learned from data. Tuning hyperparameters significantly impacts performance, requiring systematic search strategies that balance thoroughness with computational cost.

## Hyperparameters vs. Parameters

**Parameters**: Learned from data (weights, coefficients)  
**Hyperparameters**: Set before training (learning rate, regularization, tree depth)

Examples:
- Neural networks: learning rate, hidden layers, dropout rate
- Random forests: n_estimators, max_depth, min_samples_split
- SVM: C (regularization), kernel, gamma

## Grid Search

Exhaustive search over specified parameter grid.

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7, 10],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='f1',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.3f}")
```

**Advantages**: Guaranteed to find best combination in grid.

**Disadvantages**: Exponential cost. 3×4×3 grid = 36 combinations. Add one parameter with 4 values → 144 combinations.

## Random Search

Sample random combinations from parameter distributions.

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

param_distributions = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10)
}

random_search = RandomizedSearchCV(
    RandomForestClassifier(),
    param_distributions,
    n_iter=100,  # Number of random combinations
    cv=5,
    scoring='f1',
    n_jobs=-1,
    random_state=42
)

random_search.fit(X_train, y_train)
```

**Advantages**: More efficient than grid search for high dimensions. Can explore larger parameter space.

**Disadvantages**: May miss optimal combination. No guarantee of thoroughness.

**Research finding**: Random search often outperforms grid search with same computational budget, especially when some hyperparameters matter more than others.

## Bayesian Optimization

Builds probabilistic model of objective function, intelligently selecting next hyperparameters to try.

```python
from skopt import BayesSearchCV
from skopt.space import Real, Integer

search_spaces = {
    'n_estimators': Integer(50, 500),
    'max_depth': Integer(3, 20),
    'min_samples_split': Integer(2, 20),
    'min_samples_leaf': Integer(1, 10),
    'max_features': Real(0.1, 1.0)
}

bayes_search = BayesSearchCV(
    RandomForestClassifier(),
    search_spaces,
    n_iter=50,
    cv=5,
    n_jobs=-1,
    random_state=42
)

bayes_search.fit(X_train, y_train)
```

**Advantages**: Sample-efficient. Focuses search on promising regions. Good for expensive models.

**Disadvantages**: More complex. Requires more iterations to converge than random search for simple landscapes.

## Successive Halving and Hyperband

Allocate more resources (data, epochs) to promising configurations, eliminating poor ones early.

```python
from sklearn.experimental import enable_halving_search_cv
from sklearn.model_selection import HalvingRandomSearchCV

halving_search = HalvingRandomSearchCV(
    RandomForestClassifier(),
    param_distributions,
    factor=3,
    resource='n_samples',
    max_resources='auto',
    random_state=42
)

halving_search.fit(X_train, y_train)
```

**Advantages**: Extremely efficient for expensive models. Quickly eliminates poor configurations.

## Practical Recommendations

**Start coarse, refine**: Begin with wide search, narrow based on results.

**Use random/Bayesian for large spaces**: Grid search for small, well-understood spaces only.

**Consider computational budget**: Balance thoroughness with available time/compute.

**Validate on held-out test set**: Avoid hyperparameter overfitting by separating tuning (validation) from final evaluation (test).

**Use nested CV for honest estimates**: Outer CV for performance estimation, inner CV for hyperparameter tuning.

**Log everything**: Record all tried configurations for later analysis.

**Parallel processing**: Use n_jobs=-1 to parallelize across CPU cores.

## Common Pitfalls

**Hyperparameter overfitting**: Trying too many configurations on small validation sets → choose overfitted hyperparameters. Use nested CV.

**Ignoring computational cost**: Grid search with 10,000 combinations × 5 folds = 50,000 model fits.

**Wrong metric**: Optimize for metric aligned with business objectives.

**Data leakage**: Ensure preprocessing fits only on training fold, not validation fold.

## Conclusion

Hyperparameter tuning significantly impacts model performance. Grid search provides thorough but expensive exploration. Random search offers better efficiency for high-dimensional spaces. Bayesian optimization and successive halving provide state-of-the-art sample efficiency for expensive models. Choosing the right strategy depends on computational budget, hyperparameter space size, and model training cost. Proper tuning methodology with nested cross-validation ensures honest performance estimates and prevents hyperparameter overfitting.
