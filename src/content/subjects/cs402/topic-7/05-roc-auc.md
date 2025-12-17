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

## Threshold Selection

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

## Practical Example

```python
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, roc_auc_score

# Get predicted probabilities
y_scores = classifier.predict_proba(X_test)[:, 1]

# Compute ROC curve
fpr, tpr, thresholds = roc_curve(y_test, y_scores)
auc = roc_auc_score(y_test, y_scores)

# Plot
plt.plot(fpr, tpr, label=f'ROC curve (AUC = {auc:.2f})')
plt.plot([0, 1], [0, 1], 'k--', label='Random')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend()
plt.show()
```

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
