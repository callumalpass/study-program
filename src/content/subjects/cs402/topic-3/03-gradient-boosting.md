# Gradient Boosting

## Introduction

Gradient Boosting is one of the most powerful machine learning algorithms, consistently winning competitions and achieving state-of-the-art results on structured data. Unlike Random Forests which build independent trees in parallel, Gradient Boosting constructs trees sequentially, with each new tree correcting errors made by previous trees. This sequential refinement often produces superior accuracy compared to other ensemble methods.

The key insight is training trees to fit the residual errors of the ensemble. Each iteration focuses on examples the current ensemble handles poorly, gradually reducing error. This is formalized through gradient descent in function space—hence "gradient" boosting. Modern implementations like XGBoost, LightGBM, and CatBoost have optimized this algorithm for speed and performance, making it the go-to method for tabular data in industry and competitions.

Understanding Gradient Boosting requires grasping both the sequential ensemble concept and the mathematical framework of functional gradient descent. While more complex than Random Forests, the performance gains often justify the added complexity. Mastering Gradient Boosting is essential for any serious machine learning practitioner.

## Boosting Fundamentals

### Core Concept

**Sequential learning:** Train models one at a time, each correcting predecessors' mistakes.

**Weak learners:** Use simple models (shallow trees) that perform slightly better than random.

**Additive model:** Final prediction is weighted sum of weak learners.

$$F(x) = \sum_{m=1}^{M}\alpha_m h_m(x)$$

where:
- $$h_m$$: Weak learner (decision tree)
- $$\alpha_m$$: Weight
- $$M$$: Number of iterations

### Boosting vs Bagging

| Aspect | Bagging (Random Forest) | Boosting |
|--------|-------------------------|----------|
| Training | Parallel | Sequential |
| Model weight | Equal | Weighted |
| Data sampling | Bootstrap | Weighted or residuals |
| Focus | Reduce variance | Reduce bias |
| Overfitting risk | Low | Higher (needs regularization) |
| Speed | Fast (parallel) | Slower (sequential) |

## AdaBoost (Adaptive Boosting)

### Algorithm

**For classification** (binary $$y \in \{-1, +1\}$$):

```
Initialize weights: w_i = 1/n for i = 1 to n

For m = 1 to M:
    1. Train weak learner h_m on weighted data
    2. Compute weighted error:
       err_m = Σ w_i · I(h_m(x_i) ≠ y_i) / Σ w_i

    3. Compute learner weight:
       α_m = 0.5 · log((1 - err_m) / err_m)

    4. Update sample weights:
       w_i = w_i · exp(-α_m · y_i · h_m(x_i))

    5. Normalize weights: w_i = w_i / Σ w_i

Final model: F(x) = sign(Σ α_m · h_m(x))
```

**Intuition:**
- Misclassified examples get higher weights
- Next weak learner focuses on hard examples
- Better weak learners get higher $$\alpha_m$$

### Example

**Iteration 1:**
- All samples weighted equally
- Train tree, some misclassified
- Increase weight on misclassified samples

**Iteration 2:**
- Weighted data emphasizes hard examples
- Train tree focusing on previous mistakes
- Again adjust weights

**Final:**
- Combine all weak learners with weights $$\alpha_m$$

## Gradient Boosting Framework

### Functional Gradient Descent

**View prediction as optimization in function space:**

$$F^* = \arg\min_F \mathbb{E}_{x,y}[L(y, F(x))]$$

where $$L$$ is a differentiable loss function.

**Approximation with finite data:**

$$F^* = \arg\min_F \sum_{i=1}^{n}L(y_i, F(x_i))$$

**Gradient descent approach:**

$$F_{m}(x) = F_{m-1}(x) - \rho_m g_m(x)$$

where $$g_m$$ is the gradient (pseudo-residuals).

### Algorithm

**Gradient Boosting for Regression:**

```
Initialize: F_0(x) = arg min_γ Σ L(y_i, γ)  # Often mean(y)

For m = 1 to M:
    1. Compute pseudo-residuals:
       r_im = -∂L(y_i, F(x_i))/∂F(x_i)|_{F=F_{m-1}}

    2. Fit weak learner h_m to residuals {(x_i, r_im)}

    3. Compute multiplier via line search:
       ρ_m = arg min_ρ Σ L(y_i, F_{m-1}(x_i) + ρ·h_m(x_i))

    4. Update:
       F_m(x) = F_{m-1}(x) + ρ_m · h_m(x)

Final model: F_M(x)
```

**For squared loss:** $$L(y, F) = \frac{1}{2}(y - F)^2$$

$$r_im = y_i - F_{m-1}(x_i)$$ (simple residuals!)

### Squared Loss Example

**Data:** $$(x_i, y_i)$$

**Step 0:** $$F_0(x) = \bar{y}$$ (mean)

**Step 1:**
- Residuals: $$r_{i1} = y_i - \bar{y}$$
- Fit tree $$h_1$$ to $$(x_i, r_{i1})$$
- Update: $$F_1(x) = \bar{y} + \alpha h_1(x)$$

**Step 2:**
- Residuals: $$r_{i2} = y_i - F_1(x_i)$$
- Fit tree $$h_2$$ to $$(x_i, r_{i2})$$
- Update: $$F_2(x) = F_1(x) + \alpha h_2(x)$$

**Continue** until $$M$$ trees or convergence.

## Loss Functions

### Regression

**Squared Loss (L2):**

$$L(y, F) = \frac{1}{2}(y - F)^2$$

Gradient: $$r = y - F$$ (residuals)

Sensitive to outliers.

**Absolute Loss (L1):**

$$L(y, F) = |y - F|$$

Gradient: $$r = \text{sign}(y - F)$$

Robust to outliers.

**Huber Loss:**

$$L(y, F) = \begin{cases}
\frac{1}{2}(y - F)^2 & |y - F| \leq \delta \\
\delta|y - F| - \frac{1}{2}\delta^2 & |y - F| > \delta
\end{cases}$$

Combines squared and absolute loss. Robust hybrid.

### Classification

**Binomial Deviance (Log Loss):**

$$L(y, F) = \log(1 + e^{-2yF}), \quad y \in \{-1, +1\}$$

Gradient: $$r = 2y/(1 + e^{2yF})$$

Equivalent to logistic regression loss.

**Exponential Loss:**

$$L(y, F) = e^{-yF}$$

Used in AdaBoost.

## Regularization in Gradient Boosting

### Learning Rate (Shrinkage)

**Modify update step:**

$$F_m(x) = F_{m-1}(x) + \nu \cdot h_m(x)$$

where $$\nu \in (0, 1]$$ is the learning rate.

**Effect:**
- Smaller $$\nu$$: Slower learning, needs more trees, better generalization
- Larger $$\nu$$: Faster learning, fewer trees, risk overfitting

**Typical values:** 0.01 - 0.3

**Trade-off:** Small learning rate requires more trees (slower training) but often achieves better test performance.

### Tree Constraints

**Max depth:** Shallow trees (typically 3-8)
- Prevents individual trees from overfitting
- Keeps weak learners "weak"

**Min samples per leaf:** Requires minimum observations in leaves

**Max features:** Randomly sample features (adds randomness like Random Forest)

### Subsampling (Stochastic Gradient Boosting)

**Random subset of training data** for each tree:

$$\text{subsample} \in (0, 1]$$

**Effect:**
- Reduces variance
- Speeds up training
- Adds randomness
- Often improves generalization

**Typical:** 0.5 - 0.8

### Early Stopping

**Monitor validation error** during training:

```python
gb = GradientBoostingClassifier(
    n_estimators=1000,
    validation_fraction=0.1,
    n_iter_no_change=10,  # Stop if no improvement for 10 rounds
    tol=0.0001
)
```

**Prevents overfitting** by stopping when validation error plateaus or increases.

## XGBoost

### Key Innovations

**Regularized objective:**

$$\text{Obj} = \sum_{i=1}^{n}L(y_i, \hat{y}_i) + \sum_{k=1}^{K}\Omega(f_k)$$

where $$\Omega(f_k) = \gamma T + \frac{1}{2}\lambda||\omega||^2$$

- $$T$$: Number of leaves
- $$\omega$$: Leaf weights
- $$\gamma, \lambda$$: Regularization parameters

**Second-order optimization:**

Uses second derivatives (Hessian) for better approximation:

$$\text{Obj}^{(t)} \approx \sum_{i=1}^{n}[g_i f_t(x_i) + \frac{1}{2}h_i f_t^2(x_i)] + \Omega(f_t)$$

where:
- $$g_i = \frac{\partial L}{\partial \hat{y}_i}$$ (first derivative)
- $$h_i = \frac{\partial^2 L}{\partial \hat{y}_i^2}$$ (second derivative)

**System optimizations:**
- Column block for parallel learning
- Cache-aware access
- Sparsity-aware algorithm (handles missing values)
- Weighted quantile sketch (approximate splits)

### Implementation

```python
import xgboost as xgb

# Prepare data
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Parameters
params = {
    'objective': 'binary:logistic',
    'max_depth': 6,
    'learning_rate': 0.1,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'reg_alpha': 0.0,  # L1 regularization
    'reg_lambda': 1.0,  # L2 regularization
    'eval_metric': 'logloss'
}

# Train with early stopping
evals = [(dtrain, 'train'), (dtest, 'test')]
model = xgb.train(
    params,
    dtrain,
    num_boost_round=1000,
    evals=evals,
    early_stopping_rounds=50,
    verbose_eval=10
)

# Predict
y_pred = model.predict(dtest)
```

**Scikit-learn API:**

```python
from xgboost import XGBClassifier

xgb_clf = XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_alpha=0.0,
    reg_lambda=1.0,
    random_state=42
)

xgb_clf.fit(X_train, y_train)
y_pred = xgb_clf.predict(X_test)
```

## LightGBM

### Key Innovations

**Gradient-based One-Side Sampling (GOSS):**

Keep samples with large gradients (large errors), randomly sample small gradient samples.

**Reduces data** while maintaining accuracy.

**Exclusive Feature Bundling (EFB):**

Bundle mutually exclusive features (sparse features) to reduce dimensionality.

**Leaf-wise growth:**

Split leaf with maximum loss reduction (vs. level-wise in XGBoost).

**Faster training** but higher risk of overfitting (mitigated by max_depth).

### Implementation

```python
import lightgbm as lgb

# Prepare data
dtrain = lgb.Dataset(X_train, label=y_train)
dtest = lgb.Dataset(X_test, label=y_test, reference=dtrain)

# Parameters
params = {
    'objective': 'binary',
    'metric': 'binary_logloss',
    'num_leaves': 31,
    'learning_rate': 0.05,
    'feature_fraction': 0.9,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'verbose': -1
}

# Train
model = lgb.train(
    params,
    dtrain,
    num_boost_round=1000,
    valid_sets=[dtrain, dtest],
    callbacks=[lgb.early_stopping(50), lgb.log_evaluation(10)]
)

# Predict
y_pred = model.predict(X_test)
```

**Scikit-learn API:**

```python
from lightgbm import LGBMClassifier

lgb_clf = LGBMClassifier(
    n_estimators=100,
    num_leaves=31,
    learning_rate=0.05,
    random_state=42
)

lgb_clf.fit(X_train, y_train)
y_pred = lgb_clf.predict(X_test)
```

## CatBoost

### Key Innovation

**Categorical feature handling:**

Ordered Target Statistics for categorical encoding:

For categorical feature $$c$$, replace with target statistic:

$$\hat{y}_c = \frac{\sum_{i: c_i = c, i < k}y_i + a \cdot P}{\sum_{i: c_i = c, i < k}1 + a}$$

- Only uses prior examples (prevents target leakage)
- $$a$$: Smoothing parameter
- $$P$$: Prior (global average)

**Ordered boosting:**

Reduces prediction shift (gradient bias from using same data for gradients and training).

### Implementation

```python
from catboost import CatBoostClassifier

# Specify categorical features
cat_features = [0, 3, 5]  # Indices of categorical columns

cat_clf = CatBoostClassifier(
    iterations=1000,
    learning_rate=0.05,
    depth=6,
    cat_features=cat_features,
    eval_metric='Logloss',
    random_seed=42,
    verbose=50
)

cat_clf.fit(
    X_train, y_train,
    eval_set=(X_test, y_test),
    early_stopping_rounds=50
)

y_pred = cat_clf.predict(X_test)
```

## Hyperparameter Tuning

### Key Hyperparameters

**n_estimators (num_boost_round):**
- Number of trees
- More trees: Better fit, risk overfitting
- Use early stopping to determine optimal number

**learning_rate (eta):**
- Step size shrinkage
- Smaller: Better generalization, needs more trees
- Typical: 0.01 - 0.3

**max_depth:**
- Tree depth
- Deeper: More complex, risk overfitting
- Typical: 3 - 10

**subsample:**
- Fraction of samples for each tree
- Typical: 0.5 - 1.0

**colsample_bytree:**
- Fraction of features for each tree
- Adds randomness
- Typical: 0.5 - 1.0

**min_child_weight (min_samples_leaf):**
- Minimum sum of instance weight in leaf
- Regularization
- Typical: 1 - 10

**gamma (min_split_loss):**
- Minimum loss reduction to split
- Regularization
- Typical: 0 - 5

**reg_alpha (L1), reg_lambda (L2):**
- Regularization on leaf weights
- Typical: 0 - 1

### Tuning Strategy

**Step 1: Fix learning_rate, tune tree params**

```python
param_grid = {
    'max_depth': [3, 5, 7],
    'min_child_weight': [1, 3, 5]
}
```

**Step 2: Tune sampling params**

```python
param_grid = {
    'subsample': [0.6, 0.8, 1.0],
    'colsample_bytree': [0.6, 0.8, 1.0]
}
```

**Step 3: Tune regularization**

```python
param_grid = {
    'reg_alpha': [0, 0.1, 1],
    'reg_lambda': [0, 1, 10]
}
```

**Step 4: Lower learning_rate, increase n_estimators**

```python
# Final model with small learning rate
model = XGBClassifier(
    learning_rate=0.01,
    n_estimators=5000,
    # ... optimized params from above
)
```

## Feature Importance

**Gain-based importance:**

Total gain (loss reduction) from splits on each feature.

```python
import matplotlib.pyplot as plt

# XGBoost
xgb.plot_importance(model, importance_type='gain')
plt.show()

# Or access directly
importances = model.get_score(importance_type='gain')
```

**Split-based importance:**

Number of times feature used for splits.

```python
importances = model.get_score(importance_type='weight')
```

**Permutation importance:**

Most reliable, model-agnostic:

```python
from sklearn.inspection import permutation_importance

perm_imp = permutation_importance(model, X_val, y_val, n_repeats=10)
```

## Handling Missing Values

**XGBoost/LightGBM:** Learn optimal default direction for missing values.

**During training:**
- For each split, try sending missing values left or right
- Choose direction that minimizes loss

**During prediction:**
- Missing values follow learned default direction

**No need for imputation!**

## Practical Tips

### Start with Defaults

```python
# Good starting point
xgb_clf = XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=6,
    random_state=42
)
```

### Use Early Stopping

```python
xgb_clf.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    early_stopping_rounds=50,
    verbose=10
)
```

### Monitor Training

Plot training and validation metrics:

```python
results = model.evals_result()

plt.plot(results['train']['logloss'], label='train')
plt.plot(results['test']['logloss'], label='test')
plt.legend()
plt.show()
```

### Balance Learning Rate and Trees

**Fast prototyping:** Higher learning_rate (0.1), fewer trees (100)

**Final model:** Lower learning_rate (0.01), more trees (1000+) with early stopping

### Handle Imbalanced Data

**scale_pos_weight parameter:**

```python
# For imbalanced binary classification
scale_pos_weight = sum(y_train == 0) / sum(y_train == 1)

xgb_clf = XGBClassifier(scale_pos_weight=scale_pos_weight)
```

### Use GPU Acceleration

```python
# XGBoost
xgb_clf = XGBClassifier(tree_method='gpu_hist', gpu_id=0)

# LightGBM
lgb_clf = LGBMClassifier(device='gpu')

# CatBoost
cat_clf = CatBoostClassifier(task_type='GPU')
```

## Comparison: XGBoost vs LightGBM vs CatBoost

| Feature | XGBoost | LightGBM | CatBoost |
|---------|---------|----------|----------|
| Speed | Fast | Fastest | Medium |
| Memory | Medium | Low | Medium |
| Categorical handling | Manual encoding | Manual encoding | Automatic |
| Missing values | Automatic | Automatic | Automatic |
| Accuracy | Excellent | Excellent | Excellent |
| Regularization | Strong | Good | Strong |
| Default params | Good | Good | Excellent |

**General recommendations:**
- **XGBoost:** Safe default, well-documented, widely used
- **LightGBM:** Large datasets, speed priority
- **CatBoost:** Many categorical features, less tuning needed

## Common Pitfalls

### Overfitting

**Symptoms:** Large gap between train and validation error

**Solutions:**
- Decrease max_depth
- Increase min_child_weight
- Add regularization (reg_alpha, reg_lambda)
- Decrease learning_rate, use early stopping
- Increase subsample/colsample

### Underfitting

**Symptoms:** High train and validation error

**Solutions:**
- Increase max_depth
- Decrease regularization
- Increase n_estimators
- Decrease min_child_weight

### Too Slow Training

**Solutions:**
- Use LightGBM instead of XGBoost
- Reduce n_estimators (use early stopping)
- Subsample data
- Use GPU acceleration
- Reduce max_depth

## Conclusion

Gradient Boosting, especially modern implementations like XGBoost, LightGBM, and CatBoost, represents the state-of-the-art for structured/tabular data. By sequentially building trees that correct predecessors' errors, gradient boosting achieves remarkable accuracy often superior to other methods.

**Key takeaways:**

- **Sequential ensemble:** Trees built one at a time, each correcting errors
- **Gradient descent in function space:** Optimizes loss by fitting residuals/gradients
- **Regularization crucial:** Learning rate, tree constraints, subsampling prevent overfitting
- **Modern implementations:** XGBoost, LightGBM, CatBoost offer speed and features
- **Hyperparameter tuning:** More sensitive than Random Forest, but worth the effort
- **Handle missing values:** Automatically learn optimal treatment
- **Feature importance:** Built-in importance metrics guide feature engineering

While more complex than Random Forests, gradient boosting's superior performance often justifies the added complexity. For Kaggle competitions and production systems handling tabular data, gradient boosting (particularly XGBoost and LightGBM) is often the first choice.

Mastering gradient boosting—understanding the sequential refinement concept, managing regularization, tuning hyperparameters effectively—is essential for achieving top-tier performance on structured data problems. Combined with solid feature engineering, gradient boosting forms a powerful toolkit for real-world machine learning.