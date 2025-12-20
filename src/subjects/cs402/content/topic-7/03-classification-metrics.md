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

```
Accuracy = (TP + TN) / (TP + TN + FP + FN)
```

Proportion of correct predictions.

**When useful**: Balanced classes, equal error costs.

**Limitations**: Misleading for imbalanced data. 95% accuracy detecting rare disease (1% prevalence) achieved by always predicting "healthy"—useless but high accuracy.

## Precision (Positive Predictive Value)

```
Precision = TP / (TP + FP)
```

Of predicted positives, how many are actually positive?

**High precision**: Few false alarms. Important when false positives are costly (spam detection—don't want legitimate emails marked spam).

## Recall (Sensitivity, True Positive Rate)

```
Recall = TP / (TP + FN)
```

Of actual positives, how many were detected?

**High recall**: Few missed positives. Important when false negatives are costly (disease detection—don't want to miss actual cases).

## Precision-Recall Tradeoff

Precision and recall trade off. Increasing threshold reduces false positives (higher precision) but increases false negatives (lower recall).

Choosing the operating point depends on relative costs of FP vs. FN.

## F1-Score

```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

Harmonic mean of precision and recall. Balances both metrics.

**When useful**: Need to balance precision and recall. Good summary metric for imbalanced data.

**F-beta Score**: Weighted harmonic mean. β > 1 weights recall higher, β < 1 weights precision higher.

## Specificity (True Negative Rate)

```
Specificity = TN / (TN + FP)
```

Of actual negatives, how many were correctly identified?

Important when correctly identifying negatives matters (screening tests).

## Matthews Correlation Coefficient (MCC)

```
MCC = (TP×TN - FP×FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))
```

Correlation between predictions and actuals. Range [-1, 1]. More informative than accuracy for imbalanced data.

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

```python
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score

y_true = [0, 1, 1, 0, 1, 0, 1, 1, 0, 0]
y_pred = [0, 1, 0, 0, 1, 0, 1, 1, 0, 1]

print("Confusion Matrix:\n", confusion_matrix(y_true, y_pred))
print(f"Accuracy: {accuracy_score(y_true, y_pred):.3f}")
print(f"Precision: {precision_score(y_true, y_pred):.3f}")
print(f"Recall: {recall_score(y_true, y_pred):.3f}")
print(f"F1-Score: {f1_score(y_true, y_pred):.3f}")
```

## Conclusion

Classification evaluation requires choosing appropriate metrics for the problem. Accuracy suffices for balanced, equal-cost scenarios but misleads for imbalanced data. Precision emphasizes minimizing false positives, recall minimizes false negatives, and F1 balances both. Understanding these metrics and their tradeoffs enables selecting evaluation criteria aligned with business objectives and deploying models that optimize for the right outcomes.
