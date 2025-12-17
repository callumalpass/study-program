# Anomaly Detection

Anomaly detection identifies unusual patterns that differ significantly from expected behavior. These outliers, anomalies, or novelties can indicate fraud, equipment failure, network intrusions, or other critical events requiring attention.

## Types of Anomalies

**Point Anomalies**: Individual instances significantly different from others (fraudulent credit card transaction).

**Contextual Anomalies**: Normal in one context, abnormal in another (high credit card spending normal during holidays, anomalous otherwise).

**Collective Anomalies**: Individual points may be normal, but their occurrence together is anomalous (series of normal network requests forming a coordinated attack).

## Statistical Methods

Simple baseline approaches assume data follows known distributions.

**Z-score**: Mark points with |z| > threshold (typically 3) as anomalies. Assumes normal distribution.

**Grubbs' Test**: Statistical test for single outlier in univariate normal data.

**DBSCAN**: Density-based clustering identifies noise points as anomalies.

**Limitations**: Assume specific distributions, struggle with high dimensions, poor for complex patterns.

## Isolation Forest

Isolation Forest isolates anomalies by randomly partitioning feature space. Anomalies are "easier to isolate"—require fewer splits to separate from main population.

### Algorithm

1. Randomly select a feature and split value  
2. Recursively partition until each point is isolated  
3. Repeat multiple times (forest)  
4. **Anomaly score**: Average path length to isolate. Short paths → anomalies.

### Advantages

- Fast: O(n log n)  
- Handles high dimensions well  
- No distance metric needed  
- Few hyperparameters  
- Works without training on anomalies

### Use Cases

Fraud detection, network intrusion, quality control in manufacturing.

## One-Class SVM

One-Class SVM learns a boundary around normal data. Points outside this boundary are anomalies.

**Training**: Given only normal data, find smallest hypersphere (or hyperplane) enclosing most points.

**Kernel trick**: Can learn nonlinear boundaries (RBF kernel common).

**Parameters**:
- **nu**: Upper bound on fraction of outliers  
- **gamma**: RBF kernel width

**Advantages**: Flexible boundaries, theoretically grounded.

**Disadvantages**: Sensitive to parameters, computational cost for large data.

## Autoencoder-Based Detection

Autoencoders trained on normal data reconstruct normal patterns well but poorly reconstruct anomalies.

### Approach

1. Train autoencoder on normal data  
2. For new data, compute reconstruction error  
3. High error → anomaly

### Why It Works

The autoencoder learns a compressed representation of normal patterns. Anomalies, being different, cannot be accurately reconstructed from this compressed space.

**Advantages**: Learns complex patterns, handles high dimensions, flexible architecture.

**Disadvantages**: Requires sufficient normal data for training, hyperparameter tuning, computational cost.

## Local Outlier Factor (LOF)

LOF measures local density deviation. Points in sparse regions relative to neighbors are anomalies.

**Local Reachability Density**: How dense point's neighborhood is.

**LOF**: Ratio of point's density to neighbors' densities. LOF >> 1 indicates anomaly.

**Advantages**: Handles varying densities, no global threshold.

**Disadvantages**: Sensitive to k (number of neighbors), expensive for large datasets.

## Practical Considerations

**Imbalanced Data**: Anomalies are rare. Use appropriate metrics (precision-recall, not accuracy).

**Labeling**: Often unlabeled or partially labeled. Semi-supervised methods help.

**Concept Drift**: Anomaly definitions change over time. Models need updating.

**False Positives**: High false positives reduce trust. Careful threshold tuning matters.

**Domain Knowledge**: Understanding what constitutes an anomaly guides method selection and validation.

## Evaluation Metrics

**Precision**: Of detected anomalies, how many are true anomalies?  
**Recall**: Of true anomalies, how many were detected?  
**F1-Score**: Harmonic mean of precision and recall.  
**ROC-AUC**: Area under ROC curve, useful when varying thresholds.

## Applications

**Fraud Detection**: Credit card fraud, insurance fraud, click fraud.  
**Network Security**: Intrusion detection, DDoS attacks.  
**Healthcare**: Disease outbreak detection, patient monitoring.  
**Manufacturing**: Quality control, predictive maintenance.  
**IT Operations**: Server anomalies, application errors.

## Conclusion

Anomaly detection requires understanding data, domain, and various algorithmic approaches. Statistical methods provide baselines, isolation forest and one-class SVM offer robust detection, autoencoders handle complex patterns, and LOF addresses varying densities. Choosing the right method depends on data characteristics, computational resources, and application requirements. Effective anomaly detection combines algorithmic sophistication with domain expertise to identify truly significant deviations.
