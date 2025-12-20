# ROC Curves and AUC

ROC (Receiver Operating Characteristic) curves and AUC (Area Under the Curve) provide threshold-independent evaluation of binary classifiers, revealing performance across all possible classification thresholds.

## Classification Thresholds

Binary classifiers typically output probabilities P(y=1|x). Converting to binary predictions requires a threshold:

```
ŷ = 1 if P(y=1|x) ≥ threshold else 0
```

Default threshold is 0.5, but optimal threshold depends on cost asymmetry between false positives and false negatives.

## ROC Curve

ROC plots True Positive Rate (TPR) vs. False Positive Rate (FPR) across all thresholds.

**TPR (Recall)**: TP / (TP + FN)  
**FPR**: FP / (FP + TN)

```python
from sklearn.metrics import roc_curve
fpr, tpr, thresholds = roc_curve(y_true, y_scores)
```

**Interpretation**:
- (0, 0): Classify everything as negative (threshold = 1.0)
- (1, 1): Classify everything as positive (threshold = 0.0)
- (0, 1): Perfect classifier
- Diagonal line: Random guessing

Good classifiers bow toward top-left (high TPR, low FPR).

## Area Under ROC Curve (ROC-AUC)

AUC summarizes ROC curve with single number [0, 1]:

- **AUC = 1.0**: Perfect classifier
- **AUC = 0.5**: Random guessing
- **AUC < 0.5**: Worse than random (flip predictions)

```python
from sklearn.metrics import roc_auc_score
auc = roc_auc_score(y_true, y_scores)
```

**Interpretation**: Probability that a randomly chosen positive example ranks higher than a randomly chosen negative example.

### Mathematical Derivation of AUC

The AUC has an elegant probabilistic interpretation. Let $s^+$ be the score of a randomly chosen positive example and $s^-$ be the score of a randomly chosen negative example. Then:

$$\text{AUC} = P(s^+ > s^-)$$

**Proof**: Consider the Mann-Whitney U statistic, which counts pairs where positives rank higher:

$$U = \sum_{i \in \text{pos}} \sum_{j \in \text{neg}} \mathbb{1}(s_i > s_j)$$

The normalized U statistic is:

$$\text{AUC} = \frac{U}{n_{\text{pos}} \cdot n_{\text{neg}}}$$

This equals the probability that a random positive scores higher than a random negative. Geometrically, AUC is computed by integrating TPR over FPR:

$$\text{AUC} = \int_0^1 \text{TPR}(t) \, d\text{FPR}(t)$$

where $t$ ranges over all thresholds. This can be approximated numerically using the trapezoidal rule from the discrete ROC points, which sklearn's `roc_auc_score` implements efficiently.

**Practical implication**: AUC measures ranking quality. A model with AUC=0.9 will correctly order a random positive-negative pair 90% of the time, making it valuable for ranking tasks like search results or recommendation systems.

## Precision-Recall Curves

For imbalanced data, precision-recall curves are more informative than ROC.

**Precision**: TP / (TP + FP)
**Recall**: TP / (TP + FN)

```python
from sklearn.metrics import precision_recall_curve, average_precision_score
precision, recall, thresholds = precision_recall_curve(y_true, y_scores)
ap = average_precision_score(y_true, y_scores)
```

**When to use PR curves**: Imbalanced data where positives are rare and important. ROC can be overly optimistic due to large TN count.

### PR vs ROC for Imbalanced Data: Numerical Example

Consider fraud detection with 1% fraud rate (99 negatives, 1 positive per 100 transactions).

**Scenario**: Your model predicts 10 transactions as fraud. Of these, 1 is truly fraud (TP=1) and 9 are false alarms (FP=9). The model misses 0 fraud cases (FN=0) and correctly rejects 90 legitimate transactions (TN=90).

**ROC metrics**:
- TPR = TP/(TP+FN) = 1/1 = 1.0 (100% recall)
- FPR = FP/(FP+TN) = 9/99 = 0.091 (9.1% false positive rate)

ROC shows excellent performance: perfect recall with only 9% FPR!

**PR metrics**:
- Precision = TP/(TP+FP) = 1/10 = 0.10 (10% precision)
- Recall = TP/(TP+FN) = 1/1 = 1.0 (100% recall)

PR reveals the truth: 90% of your fraud alerts are false alarms.

**Why the difference?** FPR uses TN=90 in denominator, making 9 false positives seem small. Precision uses TP+FP in denominator, directly showing that most predictions are wrong. With extreme imbalance (0.1% fraud rate), a model could achieve FPR=0.01 (seeming excellent) while having precision=0.09 (mostly wrong predictions).

**Rule of thumb**: Use PR curves when positive class is rare (<10% of data) and costs of false positives matter. Use ROC curves when classes are relatively balanced or when false positive rate naturally matters (e.g., clinical screening where TN count is meaningful).

## Calibration and Threshold Selection

### Why Calibration Matters

A classifier's predicted probabilities should reflect true likelihoods. A well-calibrated model predicting P(y=1|x)=0.7 should be correct 70% of the time among such predictions.

**Calibration vs. Discrimination**: AUC measures discrimination (ranking quality) but ignores calibration. You can have high AUC with poor calibration. For example, a model that always outputs 0.9 for positives and 0.8 for negatives has perfect AUC=1.0 but terrible calibration.

**Why it matters for thresholds**: Threshold selection relies on meaningful probabilities. If your model outputs uncalibrated scores, a threshold of 0.5 is arbitrary. Cost-based threshold selection requires:

$$\text{threshold} = \frac{\text{cost}(FP)}{\text{cost}(FP) + \text{cost}(FN)}$$

This only works with calibrated probabilities representing true posterior probabilities.

**Calibration methods**:
```python
from sklearn.calibration import calibration_curve, CalibratedClassifierCV

# Check calibration
prob_true, prob_pred = calibration_curve(y_true, y_scores, n_bins=10)

# Calibrate model using Platt scaling or isotonic regression
calibrated_model = CalibratedClassifierCV(base_model, method='sigmoid', cv=5)
calibrated_model.fit(X_train, y_train)
```

**Platt scaling** fits logistic regression on model scores. **Isotonic regression** learns monotonic mapping to calibrated probabilities. Both preserve ranking (thus AUC) while improving calibration.

### Threshold Selection Strategies

Choose threshold based on business requirements:

**Equal Error Rate**: Threshold where FPR = FNR
**Cost-based**: Minimize expected cost given cost(FP) and cost(FN)
**Fixed TPR/FPR**: Achieve desired sensitivity or specificity
**F1-optimal**: Maximize F1-score

```python
# Find threshold maximizing F1
from sklearn.metrics import f1_score
f1_scores = [f1_score(y_true, y_scores >= t) for t in thresholds]
optimal_threshold = thresholds[np.argmax(f1_scores)]
```

## Partial AUC

Sometimes you care only about specific operating regions. For example, in medical screening, you might require TPR ≥ 0.95 (missing <5% of diseases) and only care about minimizing FPR within that constraint.

**Partial AUC (pAUC)** measures area under ROC curve for a specific FPR or TPR range:

```python
from sklearn.metrics import roc_auc_score

# pAUC for FPR in [0, 0.2] - low false positive region
pauc = roc_auc_score(y_true, y_scores, max_fpr=0.2)

# Standardized pAUC: rescale to [0, 1] for comparison
pauc_standardized = (pauc - 0.5 * 0.2) / (0.2 - 0.5 * 0.2)
```

**Use cases**:
- **High recall requirements**: pAUC at TPR ≥ 0.9 for safety-critical applications
- **Low FPR requirements**: pAUC at FPR ≤ 0.1 when false positives are expensive
- **Specific operating regions**: Focus evaluation where model will actually operate

**Limitation**: pAUC values aren't comparable across different FPR/TPR ranges. Standardize by normalizing: $\text{pAUC}_{\text{std}} = \frac{\text{pAUC} - \text{pAUC}_{\text{random}}}{\text{pAUC}_{\text{perfect}} - \text{pAUC}_{\text{random}}}$

## Multi-Class ROC-AUC

For multi-class:

**One-vs-Rest (OvR)**: Compute AUC for each class vs. all others, average
**One-vs-One (OvO)**: Compute AUC for each class pair, average

```python
from sklearn.metrics import roc_auc_score
# Requires probability predictions for each class
auc_ovr = roc_auc_score(y_true, y_proba, multi_class='ovr')
auc_ovo = roc_auc_score(y_true, y_proba, multi_class='ovo')
```

## Comprehensive Visualization Example

```python
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import (roc_curve, roc_auc_score,
                             precision_recall_curve, average_precision_score)

# Get predicted probabilities from multiple models
y_scores_model1 = model1.predict_proba(X_test)[:, 1]
y_scores_model2 = model2.predict_proba(X_test)[:, 1]

# Create side-by-side ROC and PR curves
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# ROC Curve (left panel)
for name, scores in [('Model 1', y_scores_model1), ('Model 2', y_scores_model2)]:
    fpr, tpr, _ = roc_curve(y_test, scores)
    auc = roc_auc_score(y_test, scores)
    axes[0].plot(fpr, tpr, label=f'{name} (AUC = {auc:.3f})', linewidth=2)

axes[0].plot([0, 1], [0, 1], 'k--', label='Random', linewidth=1)
axes[0].set_xlabel('False Positive Rate', fontsize=12)
axes[0].set_ylabel('True Positive Rate', fontsize=12)
axes[0].set_title('ROC Curves', fontsize=14)
axes[0].legend(loc='lower right')
axes[0].grid(alpha=0.3)

# Precision-Recall Curve (right panel)
for name, scores in [('Model 1', y_scores_model1), ('Model 2', y_scores_model2)]:
    precision, recall, _ = precision_recall_curve(y_test, scores)
    ap = average_precision_score(y_test, scores)
    axes[1].plot(recall, precision, label=f'{name} (AP = {ap:.3f})', linewidth=2)

# Baseline: random classifier precision equals positive class proportion
baseline_precision = np.mean(y_test)
axes[1].plot([0, 1], [baseline_precision, baseline_precision],
             'k--', label=f'Random (AP = {baseline_precision:.3f})', linewidth=1)
axes[1].set_xlabel('Recall', fontsize=12)
axes[1].set_ylabel('Precision', fontsize=12)
axes[1].set_title('Precision-Recall Curves', fontsize=14)
axes[1].legend(loc='best')
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

This visualization reveals complementary information. ROC shows overall ranking quality across all thresholds. PR curves expose performance in the positive class region, critical for imbalanced data.

## Model Comparison Using AUC

When comparing models, don't rely solely on point estimates. Use statistical testing to determine if AUC differences are significant.

### Bootstrap Confidence Intervals

```python
from sklearn.utils import resample
import numpy as np

def bootstrap_auc(y_true, y_scores, n_bootstrap=1000):
    """Compute bootstrap confidence interval for AUC."""
    aucs = []
    n_samples = len(y_true)

    for _ in range(n_bootstrap):
        # Resample with replacement
        indices = resample(range(n_samples), n_samples=n_samples)
        y_boot = y_true[indices]
        scores_boot = y_scores[indices]

        # Skip if no positive or negative samples
        if len(np.unique(y_boot)) < 2:
            continue

        aucs.append(roc_auc_score(y_boot, scores_boot))

    # 95% confidence interval
    ci_lower = np.percentile(aucs, 2.5)
    ci_upper = np.percentile(aucs, 97.5)
    return np.mean(aucs), ci_lower, ci_upper

# Compare two models
auc1, ci1_lower, ci1_upper = bootstrap_auc(y_test, y_scores_model1)
auc2, ci2_lower, ci2_upper = bootstrap_auc(y_test, y_scores_model2)

print(f"Model 1: AUC = {auc1:.3f} [{ci1_lower:.3f}, {ci1_upper:.3f}]")
print(f"Model 2: AUC = {auc2:.3f} [{ci2_lower:.3f}, {ci2_upper:.3f}]")
```

### DeLong's Test for Comparing AUCs

DeLong's test statistically compares AUCs from correlated ROC curves (same test set):

```python
from scipy import stats

def delong_test(y_true, scores1, scores2):
    """
    DeLong test for comparing two AUCs.
    Returns z-statistic and p-value.
    """
    from sklearn.metrics import roc_auc_score

    auc1 = roc_auc_score(y_true, scores1)
    auc2 = roc_auc_score(y_true, scores2)

    # Simplified variance estimation (full DeLong is complex)
    # This uses bootstrap for variance estimation
    n_bootstrap = 1000
    auc_diffs = []

    for _ in range(n_bootstrap):
        indices = resample(range(len(y_true)), n_samples=len(y_true))
        y_boot = y_true[indices]
        if len(np.unique(y_boot)) < 2:
            continue
        diff = (roc_auc_score(y_boot, scores1[indices]) -
                roc_auc_score(y_boot, scores2[indices]))
        auc_diffs.append(diff)

    # Z-test
    se = np.std(auc_diffs)
    z = (auc1 - auc2) / se
    p_value = 2 * (1 - stats.norm.cdf(abs(z)))

    return z, p_value

z, p = delong_test(y_test, y_scores_model1, y_scores_model2)
print(f"DeLong test: z = {z:.3f}, p = {p:.4f}")
if p < 0.05:
    print("AUC difference is statistically significant (p < 0.05)")
else:
    print("No significant difference in AUCs")
```

**Interpretation**: Small AUC differences (e.g., 0.85 vs 0.87) may not be statistically significant with limited test data. Always report confidence intervals or p-values when comparing models.

## Advantages and Limitations

**Advantages**:
- Threshold-independent evaluation
- Visualizes tradeoffs across operating points
- AUC provides single summary metric
- Robust to class imbalance (for ROC)

**Limitations**:
- ROC can be optimistic for highly imbalanced data
- AUC doesn't directly optimize business objectives
- Requires probability estimates, not just binary predictions

## Conclusion

ROC curves and AUC provide comprehensive evaluation of binary classifiers across all classification thresholds. Understanding TPR-FPR tradeoffs enables selecting operating points aligned with business requirements. For balanced data, ROC-AUC is standard; for imbalanced data, precision-recall curves offer more nuanced evaluation. These tools enable principled threshold selection and model comparison beyond single-point metrics.
