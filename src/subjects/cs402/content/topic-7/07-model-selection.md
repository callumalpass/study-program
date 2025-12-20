# Model Selection and Comparison

Choosing among multiple models or algorithms requires principled comparison strategies, statistical testing, and understanding of different models' strengths. Model selection extends beyond comparing metrics to understanding uncertainty, statistical significance, and practical constraints.

## Comparison Strategies

### Cross-Validation for Model Comparison

Compare models using same CV folds for fair comparison:

```python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

models = {
    'Logistic Regression': LogisticRegression(),
    'Random Forest': RandomForestClassifier(),
    'SVM': SVC(probability=True)
}

results = {}
for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=5, scoring='f1')
    results[name] = scores
    print(f"{name}: {scores.mean():.3f} (+/- {scores.std():.3f})")
```

## Statistical Significance Testing

Mean performance differences don't guarantee statistical significance. Use paired tests since CV folds are same across models.

### Paired T-Test

```python
from scipy import stats

scores_model1 = cross_val_score(model1, X, y, cv=5)
scores_model2 = cross_val_score(model2, X, y, cv=5)

t_stat, p_value = stats.ttest_rel(scores_model1, scores_model2)
print(f"p-value: {p_value:.4f}")

if p_value < 0.05:
    print("Difference is statistically significant")
```

### Corrected Paired T-Test (Nadeau & Bengio)

Standard paired t-tests for cross-validation comparisons underestimate variance because CV folds share training data, violating independence assumptions. Nadeau and Bengio (2003) proposed a corrected test that accounts for this overlap.

The correction adjusts the variance estimate:

$$\sigma^2_{corrected} = \sigma^2_{CV} \cdot \left(1 + \frac{n_{test}}{n_{train}}\right)$$

Where $n_{test}$ is the test fold size and $n_{train}$ is the training fold size.

```python
import numpy as np
from scipy import stats

def corrected_paired_ttest(scores1, scores2, n_train, n_test):
    """
    Corrected paired t-test for cross-validation comparison.

    Args:
        scores1, scores2: CV scores from two models
        n_train: Training set size per fold
        n_test: Test set size per fold
    """
    differences = scores1 - scores2
    mean_diff = np.mean(differences)

    # Standard variance of differences
    variance = np.var(differences, ddof=1)

    # Correction factor from Nadeau & Bengio
    correction = 1 + (n_test / n_train)
    corrected_variance = variance * correction

    # T-statistic with corrected variance
    n_folds = len(scores1)
    t_stat = mean_diff / np.sqrt(corrected_variance / n_folds)

    # Degrees of freedom
    df = n_folds - 1
    p_value = 2 * stats.t.sf(np.abs(t_stat), df)

    return t_stat, p_value

# Example usage
scores_model1 = cross_val_score(model1, X, y, cv=5)
scores_model2 = cross_val_score(model2, X, y, cv=5)

n_total = len(X)
n_test = n_total // 5
n_train = n_total - n_test

t_stat, p_value = corrected_paired_ttest(scores_model1, scores_model2, n_train, n_test)
print(f"Corrected p-value: {p_value:.4f}")
```

This corrected test is more conservative (higher p-values) and provides more reliable significance assessments for cross-validation comparisons.

### McNemar's Test

For classification, McNemar's test compares predictions:

```python
from statsmodels.stats.contingency_tables import mcnemar

# Predictions from both models on same test set
predictions1 = model1.predict(X_test)
predictions2 = model2.predict(X_test)

# Build contingency table
table = [[sum((predictions1 == y_test) & (predictions2 == y_test)),
          sum((predictions1 == y_test) & (predictions2 != y_test))],
         [sum((predictions1 != y_test) & (predictions2 == y_test)),
          sum((predictions1 != y_test) & (predictions2 != y_test))]]

result = mcnemar(table, exact=True)
print(f"p-value: {result.pvalue:.4f}")
```

## Bias-Variance Tradeoff

Understanding model characteristics guides selection:

**High Bias (Underfitting)**: Simple models, poor train and test performance.
**High Variance (Overfitting)**: Complex models, great train performance, poor test performance.

**Diagnosing**:
- Plot learning curves (performance vs. training set size)
- Compare train vs. validation error
- Check model complexity vs. performance

## Learning Curves

Learning curves visualize model performance as training data increases, revealing whether more data would improve performance or if the model has fundamental limitations.

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve

def plot_learning_curve(estimator, X, y, cv=5, scoring='accuracy'):
    """
    Plot learning curves for training and validation sets.
    """
    train_sizes, train_scores, val_scores = learning_curve(
        estimator, X, y,
        train_sizes=np.linspace(0.1, 1.0, 10),
        cv=cv,
        scoring=scoring,
        n_jobs=-1
    )

    # Calculate means and standard deviations
    train_mean = np.mean(train_scores, axis=1)
    train_std = np.std(train_scores, axis=1)
    val_mean = np.mean(val_scores, axis=1)
    val_std = np.std(val_scores, axis=1)

    # Plot learning curves
    plt.figure(figsize=(10, 6))
    plt.plot(train_sizes, train_mean, label='Training score', color='blue')
    plt.fill_between(train_sizes, train_mean - train_std,
                     train_mean + train_std, alpha=0.15, color='blue')

    plt.plot(train_sizes, val_mean, label='Validation score', color='red')
    plt.fill_between(train_sizes, val_mean - val_std,
                     val_mean + val_std, alpha=0.15, color='red')

    plt.xlabel('Training Set Size')
    plt.ylabel('Score')
    plt.title('Learning Curves')
    plt.legend(loc='best')
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# Usage
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
plot_learning_curve(model, X, y, cv=5, scoring='accuracy')
```

**Interpreting Learning Curves**:

- **High bias**: Both curves plateau at low performance; more data won't help significantly. Solution: use more complex model or better features.
- **High variance**: Large gap between training and validation curves. Solution: more training data, regularization, or simpler model.
- **Good fit**: Curves converge at high performance with small gap.

## Model Complexity and Occam's Razor

Occam's Razor principle states: "Simpler explanations are generally better than complex ones." In machine learning, this translates to preferring simpler models when they perform comparably to complex ones.

**Benefits of Simpler Models**:

1. **Interpretability**: Easier to understand and explain to stakeholders
2. **Generalization**: Less prone to overfitting on training data
3. **Computational efficiency**: Faster training and inference
4. **Robustness**: More stable predictions with less sensitivity to noise
5. **Maintenance**: Easier to debug, update, and deploy

**Quantifying Model Complexity**:

Different models have different complexity measures:
- Linear models: Number of features/coefficients
- Decision trees: Tree depth, number of leaves
- Neural networks: Number of layers, parameters
- Ensemble methods: Number of base models

**Complexity-Adjusted Selection Criteria**:

Use information criteria that penalize complexity:

- **Akaike Information Criterion (AIC)**: $AIC = 2k - 2\ln(L)$
- **Bayesian Information Criterion (BIC)**: $BIC = k\ln(n) - 2\ln(L)$

Where $k$ is number of parameters, $n$ is sample size, and $L$ is likelihood.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

# Compare simple vs complex model
simple_model = LogisticRegression(penalty='l1', solver='liblinear', C=1.0)
complex_model = RandomForestClassifier(n_estimators=100, max_depth=10)

# If performance is within 1-2%, prefer the simpler model
simple_score = cross_val_score(simple_model, X, y, cv=5).mean()
complex_score = cross_val_score(complex_model, X, y, cv=5).mean()

if complex_score - simple_score < 0.02:
    print("Performance difference < 2%: prefer simpler model")
    selected_model = simple_model
else:
    selected_model = complex_model
```

**Practical Guideline**: If a simpler model achieves within 1-2% of a complex model's performance, choose the simpler one unless there's a compelling reason for complexity.

## Ensemble Selection

Sometimes combining models outperforms selecting one:

**Voting Classifier**: Combine predictions by majority vote or averaging probabilities.

```python
from sklearn.ensemble import VotingClassifier

ensemble = VotingClassifier(
    estimators=[
        ('lr', LogisticRegression()),
        ('rf', RandomForestClassifier()),
        ('svm', SVC(probability=True))
    ],
    voting='soft'  # Average probabilities
)

ensemble.fit(X_train, y_train)
```

**Stacking**: Train meta-model on base model predictions.

```python
from sklearn.ensemble import StackingClassifier

stacking = StackingClassifier(
    estimators=[
        ('lr', LogisticRegression()),
        ('rf', RandomForestClassifier())
    ],
    final_estimator=LogisticRegression()
)
```

## AutoML: Automated Model Selection

AutoML (Automated Machine Learning) tools automate the model selection and hyperparameter tuning process, making machine learning more accessible and efficient.

**Popular AutoML Tools**:

### Auto-sklearn

Auto-sklearn automatically searches over algorithms and hyperparameters using Bayesian optimization with meta-learning.

```python
import autosklearn.classification

# Initialize AutoML classifier
automl = autosklearn.classification.AutoSklearnClassifier(
    time_left_for_this_task=3600,  # 1 hour total
    per_run_time_limit=300,         # 5 minutes per model
    n_jobs=-1
)

# Fit on training data
automl.fit(X_train, y_train)

# Get best model
print(automl.show_models())
predictions = automl.predict(X_test)

# View ensemble composition
print(automl.leaderboard())
```

### TPOT (Tree-based Pipeline Optimization Tool)

TPOT uses genetic programming to optimize entire ML pipelines including feature preprocessing and model selection.

```python
from tpot import TPOTClassifier

# Initialize TPOT
tpot = TPOTClassifier(
    generations=5,
    population_size=50,
    cv=5,
    random_state=42,
    verbosity=2,
    n_jobs=-1
)

# Optimize pipeline
tpot.fit(X_train, y_train)

# Export best pipeline as Python code
tpot.export('best_pipeline.py')

# Evaluate
print(f"Test score: {tpot.score(X_test, y_test):.3f}")
```

### H2O AutoML

H2O AutoML trains and tunes multiple models and creates stacked ensembles.

```python
import h2o
from h2o.automl import H2OAutoML

# Initialize H2O
h2o.init()

# Convert to H2O frame
train = h2o.H2OFrame(pd.concat([X_train, y_train], axis=1))
test = h2o.H2OFrame(pd.concat([X_test, y_test], axis=1))

# Specify target and features
x = X_train.columns.tolist()
y = 'target'

# Run AutoML
aml = H2OAutoML(max_runtime_secs=3600, seed=42)
aml.train(x=x, y=y, training_frame=train)

# View leaderboard
lb = aml.leaderboard
print(lb.head())

# Best model predictions
predictions = aml.leader.predict(test)
```

**When to Use AutoML**:
- Quick baseline establishment
- Limited ML expertise
- Time constraints
- Exploring algorithm space efficiently

**Limitations**:
- Less control over model architecture
- Can be computationally expensive
- May not find domain-specific optimizations
- Black-box process with limited interpretability

## Practical Considerations

**Computational Cost**: Complex models (deep learning, large ensembles) may be impractical despite better performance.

**Interpretability**: Simple models (linear regression, decision trees) more interpretable than black boxes (neural networks, large ensembles).

**Training Data Size**: Deep learning needs massive data; simpler models work with smaller datasets.

**Feature Engineering**: Some models benefit more from feature engineering (linear models) vs. learning features (deep learning).

**Deployment Constraints**: Model size, inference speed, memory usage matter for production.

## Production Considerations

Moving models from experimentation to production introduces additional constraints beyond predictive performance.

### Latency Requirements

Different applications have different latency tolerance:

**Real-time (< 100ms)**: Web applications, recommendation systems, fraud detection
**Near-real-time (< 1s)**: Search ranking, content moderation
**Batch (minutes-hours)**: Email campaigns, report generation

```python
import time
import numpy as np

def benchmark_inference_time(model, X_sample, n_iterations=1000):
    """Measure average inference time."""
    times = []
    for _ in range(n_iterations):
        start = time.perf_counter()
        model.predict(X_sample)
        end = time.perf_counter()
        times.append(end - start)

    return {
        'mean_ms': np.mean(times) * 1000,
        'p50_ms': np.percentile(times, 50) * 1000,
        'p95_ms': np.percentile(times, 95) * 1000,
        'p99_ms': np.percentile(times, 99) * 1000
    }

# Compare models
results = benchmark_inference_time(model, X_test[:1])
print(f"P95 latency: {results['p95_ms']:.2f}ms")
```

### Memory Constraints

Model size affects:
- Deployment infrastructure costs
- Mobile/edge device feasibility
- Serving scalability

```python
import joblib
import os

def get_model_size(model, filename='temp_model.pkl'):
    """Get model size in MB."""
    joblib.dump(model, filename)
    size_mb = os.path.getsize(filename) / (1024 * 1024)
    os.remove(filename)
    return size_mb

# Compare model sizes
print(f"Model size: {get_model_size(model):.2f} MB")

# Model compression techniques
from sklearn.tree import DecisionTreeClassifier

# Prune decision tree by limiting depth
pruned_tree = DecisionTreeClassifier(max_depth=5)
full_tree = DecisionTreeClassifier()

# Compare size vs performance tradeoff
```

### Serving Constraints

**Stateless vs Stateful**: Stateless models easier to scale horizontally
**Dependencies**: Minimize external dependencies (libraries, data files)
**Model Format**: Choose formats supporting production systems (ONNX, TensorFlow SavedModel, PMML)

```python
# Export to ONNX for cross-platform serving
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
onnx_model = convert_sklearn(model, initial_types=initial_type)

with open("model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())
```

**Production Selection Criteria**:
1. Predictive performance (primary)
2. Inference latency meets requirements
3. Model size fits infrastructure
4. Retraining time acceptable
5. Monitoring and debugging feasible

## Model Cards and Documentation

Documenting model selection decisions ensures transparency, reproducibility, and responsible deployment.

### Model Card Template

Model cards (Mitchell et al., 2019) provide standardized documentation:

```markdown
# Model Card: [Model Name]

## Model Details
- **Model Type**: Random Forest Classifier
- **Version**: 1.0.0
- **Date**: 2025-12-21
- **Developers**: Data Science Team
- **License**: Proprietary

## Intended Use
- **Primary Use**: Credit risk assessment
- **Out-of-Scope**: Not for medical or legal decisions
- **Users**: Internal risk analysts

## Training Data
- **Dataset**: Customer transaction history (2020-2024)
- **Size**: 500K samples, 50 features
- **Splits**: 70% train, 15% validation, 15% test

## Model Selection Process
- **Candidates Evaluated**: Logistic Regression, Random Forest, XGBoost, Neural Network
- **Selection Criteria**: F1-score, inference latency < 50ms, interpretability
- **Cross-Validation**: 5-fold stratified CV
- **Statistical Testing**: Corrected paired t-test, p < 0.05
- **Winner**: Random Forest (F1=0.89, latency=12ms)

## Performance
- **Test F1-score**: 0.88 (±0.02)
- **Test AUC-ROC**: 0.92
- **Inference latency**: 12ms (p95)
- **Model size**: 45 MB

## Ethical Considerations
- **Bias Analysis**: Performance across demographic groups monitored
- **Fairness Metrics**: Equal opportunity difference < 0.05
- **Limitations**: Performance degrades on new product categories

## Monitoring and Maintenance
- **Retraining Frequency**: Monthly
- **Performance Monitoring**: Weekly metric tracking
- **Drift Detection**: KL divergence on feature distributions
- **Update Trigger**: Performance drop > 5% or distribution shift
```

### Documentation Best Practices

```python
import json
from datetime import datetime

def create_model_metadata(model, cv_results, test_results, candidates):
    """Generate structured model metadata."""
    metadata = {
        'timestamp': datetime.now().isoformat(),
        'model_type': type(model).__name__,
        'hyperparameters': model.get_params(),
        'selection_process': {
            'candidates_evaluated': candidates,
            'cv_folds': 5,
            'primary_metric': 'f1_score',
            'cv_score_mean': float(cv_results.mean()),
            'cv_score_std': float(cv_results.std())
        },
        'test_performance': test_results,
        'dependencies': {
            'sklearn_version': sklearn.__version__,
            'python_version': '3.9'
        }
    }

    with open('model_metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)

    return metadata

# Usage
candidates = ['LogisticRegression', 'RandomForest', 'XGBoost']
metadata = create_model_metadata(selected_model, cv_scores, test_metrics, candidates)
```

**Key Documentation Elements**:
- Selection methodology and alternatives considered
- Performance metrics with confidence intervals
- Training data characteristics and limitations
- Deployment constraints and requirements
- Monitoring plan and retraining triggers
- Known biases and fairness considerations

## No Free Lunch Theorem

No algorithm universally outperforms all others across all problems. Model selection depends on:
- Data characteristics
- Problem requirements
- Computational constraints
- Interpretability needs

**Recommendation**: Try multiple approaches, compare empirically on your specific data.

## Model Selection Workflow

1. **Define metrics**: Choose evaluation metrics aligned with business objectives.

2. **Baseline**: Establish simple baseline (e.g., logistic regression, decision tree).

3. **Candidate models**: Select 3-5 candidate algorithms based on problem type and constraints.

4. **Initial comparison**: Compare with default hyperparameters using CV.

5. **Hyperparameter tuning**: Tune promising models.

6. **Statistical testing**: Verify differences are significant.

7. **Ensemble consideration**: Try combining top models.

8. **Final evaluation**: Evaluate selected model on held-out test set.

9. **Practical validation**: Consider computational cost, interpretability, deployment requirements.

## Common Mistakes

**Optimizing on test set**: Never use test data for any decisions. Use validation/CV for selection.

**Ignoring uncertainty**: Report confidence intervals, not just means.

**P-hacking**: Testing many models inflates false positive rate. Adjust for multiple comparisons.

**Ignoring practical constraints**: Selecting impractical model (too slow, too large, uninterpretable).

## Conclusion

Model selection requires rigorous comparison using cross-validation, statistical testing, and consideration of practical constraints. No single algorithm dominates all problems; empirical comparison on specific data guides selection. Understanding bias-variance tradeoffs, computational costs, and interpretability tradeoffs ensures choosing models that not only perform well in evaluation but succeed in production deployment. Ensemble methods often provide the best performance when computational resources allow.
