# Multiclass Classification

## Introduction

While binary classification handles two-class problems, many real-world tasks involve multiple classes: digit recognition (0-9), image classification (cat, dog, bird, etc.), document categorization (sports, politics, technology), and medical diagnosis (multiple diseases). Multiclass classification extends binary methods to handle $$K > 2$$ classes, introducing new techniques and challenges.

The transition from binary to multiclass isn't always straightforward. We can decompose multiclass problems into multiple binary problems (one-vs-rest, one-vs-one) or use direct multiclass methods (softmax regression). Each approach has trade-offs in accuracy, computational cost, and calibration. Understanding these methods and their properties is essential for tackling real-world classification tasks.

Multiclass classification introduces the softmax function, which generalizes the sigmoid to multiple classes, and categorical cross-entropy loss, which extends binary cross-entropy. These concepts form the foundation for neural network output layers and are ubiquitous in modern machine learning.

## Problem Formulation

### Notation

**Classes:** $$y \in \{1, 2, ..., K\}$$ where $$K$$ is the number of classes

**One-Hot Encoding:**

Represent class $$k$$ as a vector with 1 in position $$k$$, 0 elsewhere:

$$y = 3 \rightarrow [0, 0, 1, 0, ..., 0]^T$$

**Probability Distribution:**

Model outputs probability distribution over classes:

$$P(y=k|x) \in [0, 1], \quad \sum_{k=1}^{K}P(y=k|x) = 1$$

### Examples

**MNIST Digit Classification:**
- Input: 28×28 grayscale image
- Output: Digit 0-9 (K=10)

**ImageNet Classification:**
- Input: Color image
- Output: One of 1000 object categories (K=1000)

**Document Classification:**
- Input: Text document
- Output: Topic (K=20 topics)

## Decomposition Strategies

### One-vs-Rest (OvR) / One-vs-All (OvA)

**Idea:** Train $$K$$ binary classifiers, each distinguishing one class from all others.

**Classifier $$k$$:** Predict class $$k$$ vs. classes $$\{1,...,k-1,k+1,...,K\}$$

**Training:**

For each class $$k = 1, ..., K$$:
1. Create binary dataset:
   - Positive examples: $$y = k$$
   - Negative examples: $$y \neq k$$
2. Train binary classifier $$h_k(x)$$

**Prediction:**

$$\hat{y} = \arg\max_{k} h_k(x)$$

Choose class with highest confidence score.

**Advantages:**

- Simple to implement
- Any binary classifier can be used
- Parallelizable (train classifiers independently)
- Interpretable (each classifier has clear task)

**Disadvantages:**

- Class imbalance (1 positive class vs. $$K-1$$ negative)
- Not well-calibrated probabilities
- Inconsistent regions (multiple classes may claim region)
- Indecision regions (no class confident)

**Number of classifiers:** $$K$$

### One-vs-One (OvO)

**Idea:** Train classifier for every pair of classes.

**Classifier $$(i, j)$$:** Distinguish class $$i$$ from class $$j$$

**Training:**

For each pair $$(i, j)$$ where $$i < j$$:
1. Create binary dataset with only examples from classes $$i$$ and $$j$$
2. Train binary classifier $$h_{ij}(x)$$

**Prediction:**

**Voting scheme:**

Each classifier votes for one of its two classes. Class with most votes wins.

$$\hat{y} = \arg\max_{k} \sum_{i \neq k} \mathbb{1}[h_{ik}(x) \text{ predicts } k]$$

**Advantages:**

- Balanced binary problems (no class imbalance)
- Each classifier simpler (only 2 classes)
- Can work well with small datasets

**Disadvantages:**

- Many classifiers: $$\binom{K}{2} = \frac{K(K-1)}{2}$$
- Slow for large $$K$$ (e.g., K=1000 → 499,500 classifiers!)
- Ignores information from other classes during training
- Voting can be ambiguous

**Number of classifiers:** $$\frac{K(K-1)}{2}$$

### Comparison

| Aspect | One-vs-Rest | One-vs-One |
|--------|-------------|------------|
| Classifiers | $$K$$ | $$\frac{K(K-1)}{2}$$ |
| Training time | Moderate | High for large K |
| Prediction time | Fast | Slow for large K |
| Class imbalance | Yes | No |
| Scalability | Good | Poor |
| Common use | Most cases | Small K, SVM |

**General recommendation:** Use One-vs-Rest unless specific reasons favor One-vs-One.

## Softmax Regression (Multinomial Logistic Regression)

### Model Definition

**Direct multiclass approach** that naturally outputs probability distribution over $$K$$ classes.

**Linear scores (logits):**

For each class $$k$$:

$$z_k = \theta_k^T x$$

where $$\theta_k \in \mathbb{R}^{n+1}$$ are parameters for class $$k$$.

**Softmax function:**

$$P(y=k|x; \Theta) = \frac{e^{z_k}}{\sum_{j=1}^{K}e^{z_j}} = \frac{e^{\theta_k^T x}}{\sum_{j=1}^{K}e^{\theta_j^T x}}$$

where $$\Theta = [\theta_1, \theta_2, ..., \theta_K]$$ contains all parameters.

**Properties:**

**Range:** $$P(y=k|x) \in (0, 1)$$

**Normalization:** $$\sum_{k=1}^{K}P(y=k|x) = 1$$

**Invariance to constant shifts:**

$$P(y=k|x) = \frac{e^{z_k + c}}{\sum_{j}e^{z_j + c}}$$

Adding constant to all logits doesn't change probabilities.

### Softmax Reduces to Sigmoid for K=2

For binary classification ($$K=2$$):

$$P(y=1|x) = \frac{e^{\theta_1^T x}}{e^{\theta_1^T x} + e^{\theta_2^T x}} = \frac{1}{1 + e^{(\theta_2 - \theta_1)^T x}}$$

Setting $$\theta = \theta_1 - \theta_2$$:

$$P(y=1|x) = \frac{1}{1 + e^{-\theta^T x}} = \sigma(\theta^T x)$$

Softmax generalizes sigmoid!

### Why "Softmax"?

**Hardmax (argmax):**

$$\text{hardmax}(z) = [0, 0, ..., 1, ..., 0]$$

1 for largest $$z_k$$, 0 elsewhere.

**Softmax:**

"Soft" version that's differentiable. Larger $$z_k$$ get higher probabilities, but all positive.

**Temperature parameter:**

$$P(y=k|x) = \frac{e^{z_k/T}}{\sum_j e^{z_j/T}}$$

- $$T \to 0$$: Approaches hardmax
- $$T \to \infty$$: Approaches uniform distribution
- $$T = 1$$: Standard softmax

### Matrix Formulation

**Parameter matrix:**

$$\Theta = \begin{bmatrix}
| & | & & | \\
\theta_1 & \theta_2 & \cdots & \theta_K \\
| & | & & |
\end{bmatrix} \in \mathbb{R}^{(n+1) \times K}$$

**Logits for all examples:**

$$Z = X\Theta \in \mathbb{R}^{m \times K}$$

**Softmax applied row-wise:**

$$P_{ik} = \frac{e^{Z_{ik}}}{\sum_{j=1}^{K}e^{Z_{ij}}}$$

## Categorical Cross-Entropy Loss

### Definition

For a single example with true class $$y$$ (one-hot encoded):

$$L = -\sum_{k=1}^{K}y_k \log P(k|x)$$

If $$y$$ is class $$k$$:

$$L = -\log P(y=k|x)$$

**For entire dataset:**

$$J(\Theta) = -\frac{1}{m}\sum_{i=1}^{m}\sum_{k=1}^{K}y_k^{(i)} \log P(y=k|x^{(i)}; \Theta)$$

### Intuition

**Cross-entropy** measures difference between predicted distribution $$P$$ and true distribution $$y$$ (one-hot).

**When prediction is correct and confident:**

$$P(y=k|x) \to 1 \Rightarrow -\log P(y=k|x) \to 0$$

**When prediction is wrong or uncertain:**

$$P(y=k|x) \to 0 \Rightarrow -\log P(y=k|x) \to \infty$$

### Gradient Computation

**Gradient for class $$k$$, example $$i$$:**

$$\frac{\partial L^{(i)}}{\partial \theta_k} = (P(y=k|x^{(i)}) - y_k^{(i)})x^{(i)}$$

**Remarkably simple!** Just like logistic regression.

**Full gradient:**

$$\nabla_{\theta_k} J = \frac{1}{m}\sum_{i=1}^{m}(P(y=k|x^{(i)}) - y_k^{(i)})x^{(i)}$$

**Matrix form:**

$$\nabla_\Theta J = \frac{1}{m}X^T(P - Y)$$

where:
- $$P \in \mathbb{R}^{m \times K}$$: Predicted probabilities
- $$Y \in \mathbb{R}^{m \times K}$$: One-hot encoded true labels

### Derivation

For softmax output $$P_k = \frac{e^{z_k}}{\sum_j e^{z_j}}$$:

**Derivative of softmax:**

$$\frac{\partial P_k}{\partial z_j} = \begin{cases}
P_k(1 - P_k) & \text{if } j = k \\
-P_k P_j & \text{if } j \neq k
\end{cases}$$

**Chain rule:**

$$\frac{\partial L}{\partial z_k} = \sum_{j}\frac{\partial L}{\partial P_j}\frac{\partial P_j}{\partial z_k}$$

After algebra:

$$\frac{\partial L}{\partial z_k} = P_k - y_k$$

Simple and elegant!

## Training Softmax Regression

### Gradient Descent

**Algorithm:**

```
Initialize Θ (usually to zeros or small random values)
Set learning rate α

For iteration = 1 to max_iterations:
    1. Compute logits: Z = XΘ
    2. Compute softmax: P = softmax(Z)
    3. Compute gradient: G = (1/m) Xᵀ(P - Y)
    4. Update parameters: Θ = Θ - α·G
```

**Vectorized implementation:**

```python
def softmax(Z):
    exp_Z = np.exp(Z - np.max(Z, axis=1, keepdims=True))  # numerical stability
    return exp_Z / np.sum(exp_Z, axis=1, keepdims=True)

def train_softmax(X, Y, α, iterations):
    m, n = X.shape
    K = Y.shape[1]
    Θ = np.zeros((n, K))

    for iter in range(iterations):
        # Forward pass
        Z = X @ Θ
        P = softmax(Z)

        # Compute gradient
        G = (1/m) * X.T @ (P - Y)

        # Update
        Θ = Θ - α * G

        # (Optional) Compute loss
        if iter % 100 == 0:
            loss = -(1/m) * np.sum(Y * np.log(P + 1e-15))
            print(f"Iteration {iter}: Loss = {loss}")

    return Θ
```

### Numerical Stability

**Problem:** $$e^{z_k}$$ can overflow for large $$z_k$$.

**Solution:** Use log-sum-exp trick:

$$\log\sum_{j}e^{z_j} = c + \log\sum_{j}e^{z_j - c}$$

Choose $$c = \max_j z_j$$:

$$P(y=k|x) = \frac{e^{z_k - c}}{\sum_j e^{z_j - c}}$$

Now maximum exponent is 0, preventing overflow.

### Regularization

Add L2 or L1 penalty:

**L2 regularization:**

$$J(\Theta) = -\frac{1}{m}\sum_{i,k}y_k^{(i)} \log P_k^{(i)} + \frac{\lambda}{2}\sum_{k}||\theta_k||^2$$

**Gradient:**

$$\nabla_{\theta_k} J = \frac{1}{m}X^T(P_k - Y_k) + \lambda\theta_k$$

**Weight decay in update:**

$$\theta_k = (1 - \alpha\lambda)\theta_k - \alpha\frac{1}{m}X^T(P_k - Y_k)$$

## Making Predictions

### Predicted Class

$$\hat{y} = \arg\max_{k} P(y=k|x; \Theta) = \arg\max_{k} \theta_k^T x$$

Choose class with highest probability (or equivalently, highest logit).

### Confidence Scores

Softmax outputs provide calibrated probability estimates (under model assumptions):

$$P(y=k|x) \in (0, 1), \quad \sum_k P(y=k|x) = 1$$

**Use cases:**
- Ranking predictions by confidence
- Setting confidence thresholds
- Uncertainty quantification
- Decision-making under uncertainty

### Top-K Predictions

For some applications, return top $$k$$ most likely classes:

```python
top_k_indices = np.argsort(P)[-k:][::-1]
top_k_probs = P[top_k_indices]
```

**Example (image classification):**
- Top-1: "golden retriever" (75%)
- Top-2: "labrador" (15%)
- Top-3: "beagle" (5%)

## Evaluation Metrics

### Accuracy

$$\text{Accuracy} = \frac{1}{m}\sum_{i=1}^{m}\mathbb{1}[\hat{y}^{(i)} = y^{(i)}]$$

**Top-K Accuracy:**

$$\text{Top-K Acc} = \frac{1}{m}\sum_{i=1}^{m}\mathbb{1}[y^{(i)} \in \text{top-K predictions}]$$

### Confusion Matrix

For $$K$$ classes:

$$C_{ij} = \text{count of true class } i \text{ predicted as class } j$$

**Diagonal:** Correct predictions

**Off-diagonal:** Confusions between classes

**Analysis:**
- Which classes are confused?
- Asymmetric confusions (class A → B but not B → A)?

### Per-Class Metrics

**Precision for class $$k$$:**

$$P_k = \frac{TP_k}{TP_k + FP_k}$$

**Recall for class $$k$$:**

$$R_k = \frac{TP_k}{TP_k + FN_k}$$

**F1 for class $$k$$:**

$$F1_k = \frac{2P_k R_k}{P_k + R_k}$$

### Macro vs. Micro Averaging

**Macro-average:** Average metric across classes

$$\text{Macro-F1} = \frac{1}{K}\sum_{k=1}^{K}F1_k$$

Treats all classes equally (good for balanced importance).

**Micro-average:** Aggregate TP, FP, FN across classes

$$\text{Micro-F1} = \frac{2 \cdot \sum_k TP_k}{2 \cdot \sum_k TP_k + \sum_k FP_k + \sum_k FN_k}$$

Weighted by class frequency (good for imbalanced datasets).

### Categorical Cross-Entropy

$$\text{Loss} = -\frac{1}{m}\sum_{i=1}^{m}\sum_{k=1}^{K}y_k^{(i)}\log P_k^{(i)}$$

Measures quality of probability predictions, not just class labels.

## Handling Class Imbalance

### Problem

Real-world datasets often have imbalanced classes:
- Medical diagnosis: Rare disease (0.1%) vs. healthy (99.9%)
- Fraud detection: Fraud (0.01%) vs. legitimate (99.99%)

**Issue:** Model biased toward majority classes.

### Solutions

**Class Weights:**

Weight loss by inverse class frequency:

$$w_k = \frac{m}{K \cdot m_k}$$

where $$m_k$$ is number of examples in class $$k$$.

**Modified loss:**

$$J = -\frac{1}{m}\sum_{i,k}w_{y^{(i)}} \cdot y_k^{(i)}\log P_k^{(i)}$$

**Resampling:**

- Oversample minority classes
- Undersample majority classes
- SMOTE for synthetic examples

**Focal Loss:**

Focuses on hard examples:

$$FL(p_k) = -(1 - p_k)^\gamma \log p_k$$

where $$\gamma > 0$$ (typically 2).

Down-weights easy examples, focuses on misclassified.

## Extension: Hierarchical Softmax

For very large $$K$$ (e.g., K=1,000,000 in language models):

**Problem:** Computing softmax over all classes is expensive.

**Hierarchical Softmax:**

Organize classes in binary tree. Prediction involves log₂(K) binary decisions.

**Complexity:**
- Standard softmax: $$O(K)$$
- Hierarchical softmax: $$O(\log K)$$

## Label Smoothing

**Problem:** One-hot targets overconfident (target probabilities 0 or 1).

**Label smoothing:**

Smooth one-hot labels:

$$y_k^{\text{smooth}} = \begin{cases}
1 - \epsilon + \frac{\epsilon}{K} & \text{if } k = \text{true class} \\
\frac{\epsilon}{K} & \text{otherwise}
\end{cases}$$

Typical: $$\epsilon = 0.1$$

**Benefits:**
- Prevents overconfidence
- Better calibration
- Regularization effect
- Often improves generalization

## Practical Implementation Tips

### Feature Preprocessing

**Standardization:** Important for gradient descent convergence

**One-hot encoding:** For categorical inputs

**Feature engineering:** Polynomial, interactions as needed

### Initialization

**Zeros:** Often works for softmax regression

**Small random values:** Breaks symmetry if needed

**Xavier initialization:** $$\theta \sim \mathcal{N}(0, \frac{1}{n})$$

### Hyperparameter Tuning

**Learning rate:** Grid search (0.001, 0.01, 0.1)

**Regularization:** Cross-validation for $$\lambda$$

**Batch size:** 32, 64, 128 for mini-batch GD

### Monitoring Training

**Plot training and validation loss:** Should decrease

**Plot accuracy:** Should increase

**Check confusion matrix:** Identify problematic classes

**Examine confident mistakes:** High probability but wrong class

## Comparison: OvR vs. OvO vs. Softmax

| Aspect | OvR | OvO | Softmax |
|--------|-----|-----|---------|
| Classifiers | K | K(K-1)/2 | 1 (K parameter sets) |
| Training time | Moderate | High for large K | Fast |
| Prediction time | Fast | Slow for large K | Fastest |
| Calibration | Poor | Poor | Good |
| Consistency | Issues | Issues | Guaranteed |
| Interpretability | Clear | Clear | Moderate |

**Recommendation:** Use softmax regression for direct multiclass learning. Use OvR if applying binary classifier that doesn't extend naturally to multiclass.

## Conclusion

Multiclass classification extends binary methods to handle multiple classes. Decomposition strategies (one-vs-rest, one-vs-one) leverage binary classifiers, while softmax regression directly models probability distributions over classes.

**Key concepts:**
- **Softmax function:** Generalizes sigmoid to K classes
- **Categorical cross-entropy:** Extends binary cross-entropy
- **One-hot encoding:** Represents class labels
- **Gradient computation:** Elegant form (P - Y)
- **Regularization:** L1/L2 prevent overfitting
- **Label smoothing:** Improves calibration

Softmax regression forms the output layer of most neural networks for classification. Understanding its probabilistic interpretation, gradient computation, and training procedure is essential for deep learning. The concepts introduced here—cross-entropy loss, softmax activation, one-hot encoding—will recur throughout machine learning.

With multiclass classification mastered, we can tackle real-world problems involving multiple categories, from image recognition to document classification. The foundation laid here extends naturally to neural networks, where softmax sits atop learned feature representations.