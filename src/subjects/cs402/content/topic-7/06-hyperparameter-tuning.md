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

### Why Random Search Works: Mathematical Intuition

Bergstra & Bengio (2012) proved random search's superiority through a simple but powerful insight. Consider a function $f(x, y)$ where $x$ is important and $y$ is irrelevant. Grid search with 9 trials tests only 3 distinct values per dimension. Random search with 9 trials tests 9 distinct values for the important dimension.

More formally, if only $d$ of $D$ hyperparameters significantly affect performance, random search explores $n$ distinct values for each important dimension with $n$ trials, while grid search explores only $n^{1/D}$ values. For $D=9$ and $n=1000$, grid search tests only $\approx 2$ values per dimension, while random search tests 1000 values for important dimensions.

This creates exponential advantage: if the objective function is low-dimensional in its effective hyperparameters (which empirical research confirms), random search finds good regions exponentially faster.

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

### Modern Bayesian Optimization with Optuna

Optuna provides a cleaner, more powerful API for Bayesian optimization with advanced features like pruning and visualization.

```python
import optuna
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

def objective(trial):
    # Define hyperparameter search space
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 50, 500),
        'max_depth': trial.suggest_int('max_depth', 3, 20),
        'min_samples_split': trial.suggest_int('min_samples_split', 2, 20),
        'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 10),
        'max_features': trial.suggest_float('max_features', 0.1, 1.0)
    }

    clf = RandomForestClassifier(**params, random_state=42)
    score = cross_val_score(clf, X_train, y_train, cv=5, scoring='f1').mean()
    return score

# Create study and optimize
study = optuna.create_study(direction='maximize', sampler=optuna.samplers.TPESampler())
study.optimize(objective, n_trials=100, show_progress_bar=True)

print(f"Best params: {study.best_params}")
print(f"Best score: {study.best_value:.3f}")

# Visualize optimization history
optuna.visualization.plot_optimization_history(study)
optuna.visualization.plot_param_importances(study)
```

Optuna's TPE (Tree-structured Parzen Estimator) sampler uses Bayesian reasoning to model $p(\text{hyperparameters}|\text{good})$ and $p(\text{hyperparameters}|\text{bad})$, selecting hyperparameters that maximize the ratio.

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

## Learning Rate Schedules

Learning rate is often the most critical hyperparameter in neural network training. Rather than fixing it, learning rate schedules adapt it during training.

### Common Schedules

**Step Decay**: Reduce learning rate by factor every N epochs.
$$\alpha_t = \alpha_0 \cdot \gamma^{\lfloor t/N \rfloor}$$

**Exponential Decay**: Smooth exponential reduction.
$$\alpha_t = \alpha_0 \cdot e^{-\lambda t}$$

**Cosine Annealing**: Smooth cosine curve from initial to minimum.
$$\alpha_t = \alpha_{\min} + \frac{1}{2}(\alpha_{\max} - \alpha_{\min})\left(1 + \cos\left(\frac{t}{T}\pi\right)\right)$$

**One Cycle**: Warm up then cool down, popularized by Leslie Smith.

```python
import torch
import torch.nn as nn
import torch.optim as optim

model = nn.Sequential(nn.Linear(100, 50), nn.ReLU(), nn.Linear(50, 10))
optimizer = optim.SGD(model.parameters(), lr=0.1)

# Cosine annealing schedule
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=100, eta_min=1e-6)

for epoch in range(100):
    # Training loop
    loss = train_one_epoch(model, train_loader, optimizer)
    scheduler.step()  # Update learning rate
    print(f"Epoch {epoch}, LR: {scheduler.get_last_lr()[0]:.6f}, Loss: {loss:.4f}")
```

Tuning involves selecting schedule type, initial learning rate, decay rate, and timing. Optuna handles this elegantly:

```python
def objective(trial):
    # Suggest learning rate schedule hyperparameters
    lr = trial.suggest_float('lr', 1e-5, 1e-1, log=True)
    schedule = trial.suggest_categorical('schedule', ['step', 'exponential', 'cosine'])

    if schedule == 'step':
        step_size = trial.suggest_int('step_size', 10, 50)
        gamma = trial.suggest_float('gamma', 0.1, 0.9)
        scheduler = optim.lr_scheduler.StepLR(optimizer, step_size, gamma)
    elif schedule == 'exponential':
        gamma = trial.suggest_float('gamma', 0.9, 0.99)
        scheduler = optim.lr_scheduler.ExponentialLR(optimizer, gamma)
    else:
        T_max = trial.suggest_int('T_max', 50, 200)
        scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max)

    # Train and return validation score
    return train_with_scheduler(model, scheduler, trial)
```

## Early Stopping

Early stopping prevents overfitting by monitoring validation performance and halting training when it stops improving. This acts as implicit regularization, often eliminating need for explicit regularization hyperparameters.

### Implementation

```python
class EarlyStopping:
    def __init__(self, patience=10, min_delta=0.001, restore_best=True):
        self.patience = patience
        self.min_delta = min_delta
        self.restore_best = restore_best
        self.best_score = None
        self.counter = 0
        self.best_weights = None

    def __call__(self, val_score, model):
        if self.best_score is None:
            self.best_score = val_score
            self.best_weights = model.state_dict().copy()
        elif val_score < self.best_score + self.min_delta:
            self.counter += 1
            if self.counter >= self.patience:
                if self.restore_best:
                    model.load_state_dict(self.best_weights)
                return True  # Stop training
        else:
            self.best_score = val_score
            self.best_weights = model.state_dict().copy()
            self.counter = 0
        return False

# Usage
early_stop = EarlyStopping(patience=15, min_delta=0.001)
for epoch in range(1000):
    train_loss = train_epoch(model, train_loader)
    val_score = validate(model, val_loader)

    if early_stop(val_score, model):
        print(f"Early stopping at epoch {epoch}")
        break
```

**Hyperparameters to tune**: `patience` (epochs to wait), `min_delta` (minimum improvement threshold), `restore_best` (whether to restore best weights).

With Optuna's pruning, early stopping integrates directly into hyperparameter search:

```python
def objective(trial):
    model = create_model(trial)
    optimizer = optim.Adam(model.parameters(), lr=trial.suggest_float('lr', 1e-5, 1e-2, log=True))

    for epoch in range(100):
        train_loss = train_epoch(model, train_loader, optimizer)
        val_score = validate(model, val_loader)

        # Report intermediate value and check for pruning
        trial.report(val_score, epoch)
        if trial.should_prune():
            raise optuna.TrialPruned()

    return val_score

# Use MedianPruner to stop unpromising trials
study = optuna.create_study(
    direction='maximize',
    pruner=optuna.pruners.MedianPruner(n_startup_trials=5, n_warmup_steps=10)
)
study.optimize(objective, n_trials=50)
```

## Population Based Training (PBT)

Population Based Training, developed by DeepMind, trains a population of models in parallel, periodically copying weights from high-performers and mutating their hyperparameters. This enables online hyperparameter adaptation during training.

### Algorithm

1. Initialize population of $N$ models with different hyperparameters
2. Train all models in parallel for $T$ steps
3. Evaluate each model on validation set
4. For bottom-performing models:
   - **Exploit**: Copy weights from top performer
   - **Explore**: Perturb hyperparameters (multiply by 0.8 or 1.2)
5. Repeat steps 2-4 until convergence

### Benefits

- Adapts hyperparameters during training (learning rate can decrease as needed)
- More sample-efficient than independent trials
- Finds hyperparameter schedules automatically
- Particularly effective for deep learning

### Simple Implementation Concept

```python
class PBT:
    def __init__(self, population_size=10, exploit_threshold=0.2):
        self.population = [create_model(random_hyperparams()) for _ in range(population_size)]
        self.hyperparams = [random_hyperparams() for _ in range(population_size)]
        self.exploit_threshold = exploit_threshold

    def step(self):
        # Train each model for T steps
        scores = [train_and_evaluate(model, hp) for model, hp in zip(self.population, self.hyperparams)]

        # Exploit and explore
        for i in range(len(self.population)):
            if scores[i] < np.quantile(scores, self.exploit_threshold):
                # Exploit: copy from top performer
                best_idx = np.argmax(scores)
                self.population[i].load_state_dict(self.population[best_idx].state_dict())

                # Explore: perturb hyperparameters
                self.hyperparams[i] = perturb(self.hyperparams[best_idx])
```

PBT has achieved state-of-the-art results in reinforcement learning (AlphaGo, Dota 2 bots) and generative models.

## Hyperparameter Sensitivity Analysis

Understanding which hyperparameters matter most guides optimization effort and provides insights into model behavior.

### Variance-Based Analysis

After running hyperparameter search, analyze variance in performance explained by each hyperparameter:

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor

# Collect results from hyperparameter search
results_df = pd.DataFrame([
    {'n_estimators': trial.params['n_estimators'],
     'max_depth': trial.params['max_depth'],
     'lr': trial.params['lr'],
     'dropout': trial.params['dropout'],
     'score': trial.value}
    for trial in study.trials
])

# Train model to predict score from hyperparameters
X = results_df[['n_estimators', 'max_depth', 'lr', 'dropout']]
y = results_df['score']

rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X, y)

# Feature importance = hyperparameter importance
importances = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=False)
print("Hyperparameter Importance:")
print(importances)

importances.plot(kind='barh')
plt.xlabel('Importance')
plt.title('Hyperparameter Sensitivity Analysis')
plt.show()
```

### Optuna's Built-in Importance

```python
# After running study
importance = optuna.importance.get_param_importances(study)
print(importance)

# Visualize
optuna.visualization.plot_param_importances(study).show()
```

This reveals if you should focus on learning rate versus regularization, or if certain hyperparameters have minimal impact and can be fixed.

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
