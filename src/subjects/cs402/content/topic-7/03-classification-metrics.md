# Classification Metrics

Classification model evaluation requires understanding multiple metrics beyond simple accuracy. Different metrics emphasize different aspects of performance, and metric choice depends on problem requirements, class balance, and cost considerations.

## The Confusion Matrix

The confusion matrix summarizes prediction outcomes:

```
                 Predicted
                 Neg    Pos
Actual  Neg      TN     FP
        Pos      FN     TP
```

**True Positives (TP)**: Correctly predicted positive  
**True Negatives (TN)**: Correctly predicted negative  
**False Positives (FP)**: Incorrectly predicted positive (Type I error)  
**False Negatives (FN)**: Incorrectly predicted negative (Type II error)

All classification metrics derive from these four values.

## Accuracy

The accuracy metric measures the overall proportion of correct predictions:

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN} = \frac{\text{Correct Predictions}}{\text{Total Predictions}}$$

**When useful**: Balanced classes, equal error costs.

**Limitations**: Misleading for imbalanced data. 95% accuracy detecting rare disease (1% prevalence) achieved by always predicting "healthy"—useless but high accuracy.

## Precision (Positive Predictive Value)

Precision measures the accuracy of positive predictions:

$$\text{Precision} = \frac{TP}{TP + FP} = \frac{\text{True Positives}}{\text{All Predicted Positives}}$$

Of predicted positives, how many are actually positive?

**Visual intuition**: Precision looks at the **bottom row** of the confusion matrix (all predicted positives) and asks "what fraction are correct?"

**High precision**: Few false alarms. Important when false positives are costly (spam detection—don't want legitimate emails marked spam).

## Recall (Sensitivity, True Positive Rate)

Recall measures the coverage of actual positive cases:

$$\text{Recall} = \frac{TP}{TP + FN} = \frac{\text{True Positives}}{\text{All Actual Positives}}$$

Of actual positives, how many were detected?

**Visual intuition**: Recall looks at the **right column** of the confusion matrix (all actual positives) and asks "what fraction did we catch?"

**High recall**: Few missed positives. Important when false negatives are costly (disease detection—don't want to miss actual cases).

## Precision-Recall Tradeoff

Precision and recall trade off. Increasing threshold reduces false positives (higher precision) but increases false negatives (lower recall).

Choosing the operating point depends on relative costs of FP vs. FN.

## F1-Score

The F1-score is the harmonic mean of precision and recall:

$$F_1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2 \times TP}{2 \times TP + FP + FN}$$

The harmonic mean penalizes extreme values more than the arithmetic mean. If either precision or recall is low, F1 will be low.

**When useful**: Need to balance precision and recall. Good summary metric for imbalanced data.

**F-beta Score**: Weighted harmonic mean where β controls the tradeoff:

$$F_\beta = (1 + \beta^2) \times \frac{\text{Precision} \times \text{Recall}}{\beta^2 \times \text{Precision} + \text{Recall}}$$

β > 1 weights recall higher, β < 1 weights precision higher. F₂ emphasizes recall 2× more than precision, while F₀.₅ emphasizes precision 2× more.

## Specificity (True Negative Rate)

Specificity measures how well the model identifies negative cases:

$$\text{Specificity} = \frac{TN}{TN + FP} = \frac{\text{True Negatives}}{\text{All Actual Negatives}}$$

Of actual negatives, how many were correctly identified?

Important when correctly identifying negatives matters (screening tests). Specificity is the negative class equivalent of recall.

## Matthews Correlation Coefficient (MCC)

MCC measures the correlation between predictions and actual values:

$$\text{MCC} = \frac{TP \times TN - FP \times FN}{\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}$$

Correlation between predictions and actuals. Range [-1, 1] where +1 is perfect prediction, 0 is random, -1 is complete disagreement. More informative than accuracy for imbalanced data because it accounts for all four confusion matrix values.

## Cohen's Kappa

Cohen's Kappa measures inter-rater agreement, accounting for chance agreement:

$$\kappa = \frac{p_o - p_e}{1 - p_e}$$

where $p_o$ is observed agreement (accuracy) and $p_e$ is expected agreement by chance.

$$p_e = \frac{(TP + FP)(TP + FN) + (TN + FN)(TN + FP)}{N^2}$$

**Interpretation**:
- κ = 1: Perfect agreement
- κ = 0: Agreement equivalent to chance
- κ < 0: Agreement worse than chance

**When useful**: Medical diagnosis, annotation quality assessment, any domain where "agreement by chance" is a concern. More conservative than accuracy because it penalizes models that achieve high accuracy merely by exploiting class imbalance.

```python
from sklearn.metrics import cohen_kappa_score
kappa = cohen_kappa_score(y_true, y_pred)
```

## Class Imbalance

Class imbalance occurs when one class significantly outnumbers others. This severely impacts metric interpretation.

**Example 1: Fraud Detection (1% fraud rate)**

Dataset: 10,000 transactions, 100 fraudulent (1%), 9,900 legitimate (99%)

A naive model predicting "legitimate" for everything achieves:
- **Accuracy**: 99% (9,900 correct out of 10,000)
- **Recall**: 0% (catches zero fraud cases)
- **Precision**: undefined (no positive predictions)
- **F1**: 0

Despite 99% accuracy, the model is completely useless.

**Example 2: Disease Screening (0.5% disease prevalence)**

Dataset: 100,000 patients, 500 with disease, 99,500 healthy

Always predicting "healthy":
- **Accuracy**: 99.5%
- **Recall**: 0% (misses all disease cases)
- **Deaths**: Potentially 500 people

This demonstrates why accuracy fails for imbalanced data—it's dominated by the majority class.

**Solutions for class imbalance**:
1. Use precision, recall, F1, or MCC instead of accuracy
2. Resample data (oversample minority, undersample majority)
3. Use class weights in loss function
4. Collect more data for minority class
5. Use anomaly detection instead of classification

## When Not to Use Accuracy

Accuracy is inappropriate in several common scenarios:

**1. Imbalanced Classes**: As shown above, accuracy misleads when class distribution is skewed. Use F1, MCC, or class-specific metrics.

**2. Asymmetric Costs**: When false positives and false negatives have different costs (medical diagnosis, fraud detection, spam filtering), accuracy treats all errors equally. Use cost-sensitive evaluation or optimize precision/recall based on actual costs.

**3. Multi-Label Classification**: When instances can belong to multiple classes simultaneously, accuracy penalizes partial correctness. Use Hamming loss, subset accuracy, or label-specific metrics.

**4. Ranking Problems**: When prediction ranking matters (information retrieval, recommendation systems), accuracy ignores order. Use precision@k, NDCG, or MAP.

**5. Probability Calibration Matters**: When you need well-calibrated probabilities (risk assessment, decision support), accuracy only considers hard predictions. Use Brier score or log loss.

**Rule of thumb**: If any class has <10% representation or if error types have different consequences, don't rely on accuracy alone.

## Multi-Class Metrics

For multi-class classification (>2 classes):

**Macro-averaging**: Compute metric for each class, average.  
**Micro-averaging**: Aggregate TP, FP, FN across classes, compute metric.  
**Weighted averaging**: Weight by class support.

```python
from sklearn.metrics import classification_report
print(classification_report(y_true, y_pred))
```

## Choosing Metrics

**Balanced classes, equal costs**: Accuracy

**Imbalanced classes**: Precision, recall, F1, MCC

**False positives costly**: Precision (email spam, content moderation)

**False negatives costly**: Recall (disease screening, fraud detection)

**Need balance**: F1-score

**Multi-class with class imbalance**: Macro F1 or weighted F1

## Practical Example

### Basic Metrics Calculation

```python
from sklearn.metrics import (
    confusion_matrix, accuracy_score, precision_score,
    recall_score, f1_score, cohen_kappa_score, matthews_corrcoef
)

y_true = [0, 1, 1, 0, 1, 0, 1, 1, 0, 0]
y_pred = [0, 1, 0, 0, 1, 0, 1, 1, 0, 1]

# Compute all metrics
cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:\n", cm)
print(f"Accuracy: {accuracy_score(y_true, y_pred):.3f}")
print(f"Precision: {precision_score(y_true, y_pred):.3f}")
print(f"Recall: {recall_score(y_true, y_pred):.3f}")
print(f"F1-Score: {f1_score(y_true, y_pred):.3f}")
print(f"Cohen's Kappa: {cohen_kappa_score(y_true, y_pred):.3f}")
print(f"MCC: {matthews_corrcoef(y_true, y_pred):.3f}")
```

### Visualizing Confusion Matrix

```python
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import ConfusionMatrixDisplay

# Create detailed confusion matrix visualization
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Raw counts
ConfusionMatrixDisplay.from_predictions(
    y_true, y_pred, ax=axes[0], cmap='Blues'
)
axes[0].set_title('Confusion Matrix (Counts)')

# Normalized by true labels (shows recall per class)
ConfusionMatrixDisplay.from_predictions(
    y_true, y_pred, ax=axes[1], normalize='true', cmap='Blues'
)
axes[1].set_title('Confusion Matrix (Normalized)')

plt.tight_layout()
plt.show()
```

### Imbalanced Dataset Example

```python
import numpy as np
from sklearn.metrics import classification_report

# Simulate imbalanced fraud detection: 1% fraud rate
np.random.seed(42)
n_samples = 1000
n_fraud = 10  # 1% fraud

y_true_imb = np.array([0] * (n_samples - n_fraud) + [1] * n_fraud)
# Naive model predicts all negative
y_pred_naive = np.zeros(n_samples)

print("Naive Model (Always Predict No Fraud):")
print(classification_report(y_true_imb, y_pred_naive,
                          target_names=['Legitimate', 'Fraud']))
print(f"Accuracy: {accuracy_score(y_true_imb, y_pred_naive):.3f}")
print(f"MCC: {matthews_corrcoef(y_true_imb, y_pred_naive):.3f}")

# Better model that catches some fraud
y_pred_better = y_pred_naive.copy()
y_pred_better[np.random.choice(np.where(y_true_imb == 1)[0], 7)] = 1  # Catch 7/10 fraud
y_pred_better[np.random.choice(np.where(y_true_imb == 0)[0], 15)] = 1  # 15 false alarms

print("\nBetter Model:")
print(classification_report(y_true_imb, y_pred_better,
                          target_names=['Legitimate', 'Fraud']))
print(f"Accuracy: {accuracy_score(y_true_imb, y_pred_better):.3f}")
print(f"MCC: {matthews_corrcoef(y_true_imb, y_pred_better):.3f}")
```

This demonstrates how accuracy drops slightly (99% to 98.2%) while actually becoming much more useful (70% recall on fraud).

## Conclusion

Classification evaluation requires choosing appropriate metrics for the problem. Accuracy suffices for balanced, equal-cost scenarios but misleads for imbalanced data. Precision emphasizes minimizing false positives, recall minimizes false negatives, and F1 balances both. Understanding these metrics and their tradeoffs enables selecting evaluation criteria aligned with business objectives and deploying models that optimize for the right outcomes.
