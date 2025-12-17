# Logistic Regression

## Introduction

Logistic regression is the fundamental algorithm for binary classification problems. Despite its name containing "regression," it is a classification algorithm that predicts probabilities of class membership. Logistic regression extends the ideas of linear regression to classification by using the logistic (sigmoid) function to transform linear combinations of features into probabilities.

The beauty of logistic regression lies in its simplicity, interpretability, and solid probabilistic foundation. It provides not just class predictions but also confidence estimates (probabilities), making it invaluable when uncertainty quantification matters. From spam detection to medical diagnosis, from credit risk assessment to click-through rate prediction, logistic regression remains a workhorse of machine learning.

Understanding logistic regression is essential because it introduces key concepts that extend to neural networks: activation functions, cross-entropy loss, and probabilistic classification. Many deep learning architectures are essentially stacked logistic regression layers. Mastering logistic regression provides the foundation for understanding more complex classification methods.

## From Linear Regression to Classification

### Why Not Use Linear Regression?

For binary classification where $$y \in \{0, 1\}$$, we might naively try linear regression:

$$h_\theta(x) = \theta^T x$$

**Problems:**

**1. Output not bounded:** $$h_\theta(x)$$ can be any real number, but we need probabilities in [0, 1].

**2. Nonsensical interpretation:** What does $$h_\theta(x) = -0.5$$ or $$h_\theta(x) = 1.7$$ mean for a binary outcome?

**3. Poor performance:** Linear regression treats the 0/1 output as continuous, leading to poor decision boundaries.

**4. Sensitive to outliers:** Extreme points heavily influence the fitted line.

### The Sigmoid Function

We need a function that maps $$(-\infty, \infty)$$ to $$(0, 1)$$. Enter the **logistic (sigmoid) function**:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

```mermaid
graph LR
    A[Linear Combination z = θᵀx] --> B[Sigmoid Function σ(z)]
    B --> C[Probability p ∈ (0,1)]
    C --> D[Classification Decision]

    style A fill:#e1f5ff
    style C fill:#ffe1e1
    style D fill:#90EE90
```

**Properties:**

**Range:** $$\sigma(z) \in (0, 1)$$ for all $$z \in \mathbb{R}$$

**Monotonic:** Strictly increasing

**Symmetry:** $$\sigma(-z) = 1 - \sigma(z)$$

**Asymptotes:**
- $$\lim_{z \to \infty}\sigma(z) = 1$$
- $$\lim_{z \to -\infty}\sigma(z) = 0$$

**Midpoint:** $$\sigma(0) = 0.5$$

**Derivative:**

$$\sigma'(z) = \sigma(z)(1 - \sigma(z))$$

This simple derivative form makes gradient computation elegant!

## The Logistic Regression Model

### Hypothesis Function

$$h_\theta(x) = \sigma(\theta^T x) = \frac{1}{1 + e^{-\theta^T x}}$$

**Interpretation:** $$h_\theta(x) = P(y=1|x; \theta)$$

The probability that the output is 1 given input $$x$$ and parameters $$\theta$$.

**Complementary probability:**

$$P(y=0|x; \theta) = 1 - h_\theta(x) = \sigma(-\theta^T x)$$

### Decision Boundary

**Classification rule:**

$$\hat{y} = \begin{cases}
1 & \text{if } h_\theta(x) \geq 0.5 \\
0 & \text{if } h_\theta(x) < 0.5
\end{cases}$$

**When is $$h_\theta(x) \geq 0.5$$?**

$$\frac{1}{1 + e^{-\theta^T x}} \geq 0.5$$

$$e^{-\theta^T x} \leq 1$$

$$-\theta^T x \leq 0$$

$$\theta^T x \geq 0$$

**Decision boundary:** $$\theta^T x = 0$$

The set of points where $$h_\theta(x) = 0.5$$, forming the boundary between classes.

### Linear Decision Boundary

For 2D (one feature $$x_1$$):

$$\theta_0 + \theta_1 x_1 = 0$$

$$x_1 = -\frac{\theta_0}{\theta_1}$$

A vertical line at $$x_1 = -\theta_0/\theta_1$$.

For 3D (two features $$x_1, x_2$$):

$$\theta_0 + \theta_1 x_1 + \theta_2 x_2 = 0$$

$$x_2 = -\frac{\theta_0 + \theta_1 x_1}{\theta_2}$$

A straight line in the $$x_1$$-$$x_2$$ plane.

**General case:** The decision boundary is a **hyperplane** in $$\mathbb{R}^n$$.

### Non-Linear Decision Boundaries

Add polynomial or other non-linear features:

$$h_\theta(x) = \sigma(\theta_0 + \theta_1 x_1 + \theta_2 x_2 + \theta_3 x_1^2 + \theta_4 x_2^2 + \theta_5 x_1 x_2)$$

Decision boundary: $$\theta_0 + \theta_1 x_1 + \theta_2 x_2 + \theta_3 x_1^2 + \theta_4 x_2^2 + \theta_5 x_1 x_2 = 0$$

Can create circular, elliptical, or arbitrarily complex boundaries through feature engineering.

## Maximum Likelihood Estimation

### Probabilistic Model

Assume data generated from Bernoulli distribution:

$$P(y|x; \theta) = h_\theta(x)^y (1-h_\theta(x))^{1-y}$$

**Verification:**
- If $$y=1$$: $$P(y=1|x; \theta) = h_\theta(x)^1 \cdot (1-h_\theta(x))^0 = h_\theta(x)$$
- If $$y=0$$: $$P(y=0|x; \theta) = h_\theta(x)^0 \cdot (1-h_\theta(x))^1 = 1-h_\theta(x)$$

### Likelihood Function

For dataset $$\{(x^{(i)}, y^{(i)})\}_{i=1}^m$$, assuming independence:

$$L(\theta) = \prod_{i=1}^{m} P(y^{(i)}|x^{(i)}; \theta) = \prod_{i=1}^{m} h_\theta(x^{(i)})^{y^{(i)}} (1-h_\theta(x^{(i)}))^{1-y^{(i)}}$$

**Goal:** Find $$\theta$$ that maximizes $$L(\theta)$$.

### Log-Likelihood

Taking logarithm (monotonic transformation, doesn't change argmax):

$$\ell(\theta) = \log L(\theta) = \sum_{i=1}^{m}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right]$$

**Maximizing log-likelihood = minimizing negative log-likelihood:**

$$J(\theta) = -\frac{1}{m}\ell(\theta) = -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right]$$

This is the **binary cross-entropy loss** (log loss).

## Cost Function: Binary Cross-Entropy

### Definition

$$J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right]$$

**Component-wise interpretation:**

For a single example:

$$J^{(i)}(\theta) = \begin{cases}
-\log h_\theta(x^{(i)}) & \text{if } y^{(i)} = 1 \\
-\log(1 - h_\theta(x^{(i)})) & \text{if } y^{(i)} = 0
\end{cases}$$

**Intuition:**

**If $$y=1$$:**
- Want $$h_\theta(x) \to 1$$ (high probability of class 1)
- $$-\log h_\theta(x) \to 0$$ as $$h_\theta(x) \to 1$$
- $$-\log h_\theta(x) \to \infty$$ as $$h_\theta(x) \to 0$$ (severe penalty for wrong prediction)

**If $$y=0$$:**
- Want $$h_\theta(x) \to 0$$ (low probability of class 1)
- $$-\log(1 - h_\theta(x)) \to 0$$ as $$h_\theta(x) \to 0$$
- $$-\log(1 - h_\theta(x)) \to \infty$$ as $$h_\theta(x) \to 1$$

### Why Not Squared Error?

Using squared error $$\frac{1}{2}(h_\theta(x) - y)^2$$ with sigmoid leads to:

**Non-convex loss:** Multiple local minima

**Slow learning:** Gradient becomes very small when far from solution

**Cross-entropy advantages:**
- **Convex** for logistic regression
- **Fast learning:** Large gradients when predictions are wrong
- **Probabilistically principled:** Maximum likelihood

## Gradient Computation

### Derivative of Sigmoid

$$\sigma'(z) = \frac{d}{dz}\frac{1}{1+e^{-z}} = \frac{e^{-z}}{(1+e^{-z})^2} = \frac{1}{1+e^{-z}} \cdot \frac{e^{-z}}{1+e^{-z}}$$

$$= \frac{1}{1+e^{-z}} \cdot \left(1 - \frac{1}{1+e^{-z}}\right) = \sigma(z)(1-\sigma(z))$$

Beautiful and simple!

### Gradient of Cost Function

Let $$z^{(i)} = \theta^T x^{(i)}$$ and $$h^{(i)} = \sigma(z^{(i)})$$.

**Single example gradient:**

$$\frac{\partial J^{(i)}}{\partial \theta_j} = \left(h^{(i)} - y^{(i)}\right)x_j^{(i)}$$

**Full dataset gradient:**

$$\frac{\partial J}{\partial \theta_j} = \frac{1}{m}\sum_{i=1}^{m}\left(h_\theta(x^{(i)}) - y^{(i)}\right)x_j^{(i)}$$

**Vector form:**

$$\nabla_\theta J = \frac{1}{m}X^T(h - y)$$

where $$h = \sigma(X\theta)$$ is the vector of predictions.

**Remarkably similar to linear regression!**

Linear regression: $$\nabla_\theta J = \frac{1}{m}X^T(X\theta - y)$$

Logistic regression: $$\nabla_\theta J = \frac{1}{m}X^T(\sigma(X\theta) - y)$$

The sigmoid is the only difference!

### Derivation Details

$$\frac{\partial J}{\partial \theta_j} = -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\frac{1}{h^{(i)}}\frac{\partial h^{(i)}}{\partial \theta_j} + (1-y^{(i)})\frac{1}{1-h^{(i)}}\left(-\frac{\partial h^{(i)}}{\partial \theta_j}\right)\right]$$

$$\frac{\partial h^{(i)}}{\partial \theta_j} = h^{(i)}(1-h^{(i)})x_j^{(i)}$$

Substituting:

$$= -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\frac{1}{h^{(i)}}h^{(i)}(1-h^{(i)})x_j^{(i)} - (1-y^{(i)})\frac{1}{1-h^{(i)}}h^{(i)}(1-h^{(i)})x_j^{(i)}\right]$$

$$= -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}(1-h^{(i)})x_j^{(i)} - (1-y^{(i)})h^{(i)}x_j^{(i)}\right]$$

$$= -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)} - y^{(i)}h^{(i)} - h^{(i)} + y^{(i)}h^{(i)}\right]x_j^{(i)}$$

$$= -\frac{1}{m}\sum_{i=1}^{m}(y^{(i)} - h^{(i)})x_j^{(i)} = \frac{1}{m}\sum_{i=1}^{m}(h^{(i)} - y^{(i)})x_j^{(i)}$$

## Training Logistic Regression

### Gradient Descent

**Algorithm:**

```
Initialize θ (usually to zeros or small random values)
Set learning rate α
Set number of iterations

For iteration = 1 to max_iterations:
    1. Compute predictions: h = σ(Xθ)
    2. Compute gradient: g = (1/m) Xᵀ(h - y)
    3. Update parameters: θ = θ - α·g
    4. (Optional) Compute and log cost J(θ)
```

**Vectorized implementation (Python-style):**

```python
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def train_logistic_regression(X, y, α, iterations):
    m, n = X.shape
    θ = np.zeros(n)

    for iter in range(iterations):
        # Forward pass
        z = X @ θ
        h = sigmoid(z)

        # Compute gradient
        gradient = (1/m) * X.T @ (h - y)

        # Update parameters
        θ = θ - α * gradient

        # (Optional) Compute cost
        if iter % 100 == 0:
            cost = -(1/m) * (y.T @ np.log(h) + (1-y).T @ np.log(1-h))
            print(f"Iteration {iter}: Cost = {cost}")

    return θ
```

### Advanced Optimizers

**Gradient descent** works but can be slow. Advanced optimizers converge faster:

**Newton's Method (Second-Order):**

Uses Hessian (second derivatives) for better step direction:

$$\theta_{new} = \theta - H^{-1}\nabla J$$

where $$H$$ is the Hessian matrix.

**Pros:** Quadratic convergence (very fast near optimum)
**Cons:** Computing and inverting Hessian is $$O(n^3)$$

**Quasi-Newton Methods (BFGS, L-BFGS):**

Approximate Hessian without computing it explicitly.

**Conjugate Gradient:**

Efficient for large-scale problems.

**In practice:** Use library implementations (scipy.optimize, scikit-learn).

### Regularization

Just like linear regression, add L1 or L2 penalties:

**L2 (Ridge):**

$$J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right] + \frac{\lambda}{2m}\sum_{j=1}^{n}\theta_j^2$$

**L1 (Lasso):**

$$J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right] + \frac{\lambda}{m}\sum_{j=1}^{n}|\theta_j|$$

**Gradient with L2:**

$$\nabla_\theta J = \frac{1}{m}X^T(h - y) + \frac{\lambda}{m}\theta$$

**Benefits:**
- Prevents overfitting
- Handles multicollinearity
- L1 provides feature selection

**Choosing $$\lambda$$:** Cross-validation, same as linear regression.

## Making Predictions

### Probability Estimates

Given new example $$x$$:

$$P(y=1|x) = h_\theta(x) = \sigma(\theta^T x)$$

$$P(y=0|x) = 1 - h_\theta(x)$$

### Classification

**Default threshold (0.5):**

$$\hat{y} = \begin{cases}
1 & \text{if } h_\theta(x) \geq 0.5 \\
0 & \text{if } h_\theta(x) < 0.5
\end{cases}$$

**Custom threshold:**

Adjust based on cost of false positives vs. false negatives:

$$\hat{y} = \begin{cases}
1 & \text{if } h_\theta(x) \geq t \\
0 & \text{if } h_\theta(x) < t
\end{cases}$$

**Example (fraud detection):**
- False negative (miss fraud) is very costly
- Set $$t = 0.3$$ (more aggressive detection)

**Example (spam filter):**
- False positive (legitimate email flagged) is annoying
- Set $$t = 0.7$$ (conservative classification)

## Evaluation Metrics

### Accuracy

$$\text{Accuracy} = \frac{\text{Correct Predictions}}{m}$$

**Limitation:** Misleading for imbalanced datasets.

### Confusion Matrix

$$\begin{array}{c|c|c}
& \hat{y}=1 & \hat{y}=0 \\
\hline
y=1 & TP & FN \\
\hline
y=0 & FP & TN
\end{array}$$

### Precision and Recall

**Precision:**
$$P = \frac{TP}{TP + FP}$$

Of predicted positives, how many are correct?

**Recall (Sensitivity):**
$$R = \frac{TP}{TP + FN}$$

Of actual positives, how many did we identify?

**F1 Score:**
$$F_1 = \frac{2PR}{P+R}$$

Harmonic mean of precision and recall.

### ROC Curve and AUC

**ROC (Receiver Operating Characteristic):**

Plot TPR vs. FPR at various thresholds:

$$TPR = \frac{TP}{TP + FN}, \quad FPR = \frac{FP}{FP + TN}$$

**AUC (Area Under Curve):**
- Ranges from 0 to 1
- 0.5: Random guessing
- 1.0: Perfect classifier
- Threshold-independent metric

**Interpretation:** Probability that model ranks a random positive example higher than a random negative example.

### Log Loss (Cross-Entropy)

$$\text{Log Loss} = -\frac{1}{m}\sum_{i=1}^{m}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right]$$

Measures quality of probability estimates, not just classifications.

Lower is better. Penalizes confident wrong predictions heavily.

## Interpreting Logistic Regression

### Coefficient Interpretation

**Odds and Log-Odds:**

$$\text{Odds} = \frac{P(y=1|x)}{P(y=0|x)} = \frac{h_\theta(x)}{1-h_\theta(x)}$$

$$\log(\text{Odds}) = \log\frac{h_\theta(x)}{1-h_\theta(x)} = \theta^T x$$

**Log-odds is linear in features!**

**Coefficient $$\theta_j$$:**

Increasing $$x_j$$ by 1 unit increases log-odds by $$\theta_j$$.

**Odds ratio:**

$$\text{OR} = e^{\theta_j}$$

Increasing $$x_j$$ by 1 unit multiplies odds by $$e^{\theta_j}$$.

**Example:**

$$\theta_{\text{smoking}} = 0.5$$

Smoking increases log-odds of disease by 0.5.

Odds ratio: $$e^{0.5} \approx 1.65$$

Smokers are 1.65 times more likely to have disease than non-smokers.

### Feature Importance

**Standardized coefficients:**

If features are standardized, $$|\theta_j|$$ indicates feature importance.

**Wald test:**

Test if $$\theta_j$$ is significantly different from zero:

$$z = \frac{\hat{\theta}_j}{SE(\hat{\theta}_j)}$$

Under null hypothesis $$\theta_j = 0$$, $$z \sim \mathcal{N}(0, 1)$$.

## Assumptions and Limitations

### Assumptions

**1. Linear relationship between features and log-odds:**

$$\log\frac{P(y=1|x)}{P(y=0|x)} = \theta^T x$$

**2. Independence of observations:**

Each example is independent.

**3. No perfect multicollinearity:**

Features not perfectly correlated.

**4. Large sample size:**

Asymptotic properties require sufficient data.

### Limitations

**Linear decision boundary:**

Without feature engineering, can only separate linearly separable classes.

**Sensitive to outliers:**

Extreme points can heavily influence coefficients.

**Assumes class separability:**

Performance degrades when classes heavily overlap.

**Requires feature engineering:**

Non-linear patterns need manual feature creation.

## Extensions

### Multinomial Logistic Regression

Extends to $$K > 2$$ classes (covered in next topic).

### Ordinal Logistic Regression

For ordered categories (e.g., low/medium/high).

### Logistic Regression with Interactions

Include interaction terms:

$$\theta^T x = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \theta_3(x_1 \cdot x_2)$$

### Kernel Logistic Regression

Apply kernel trick for non-linear boundaries without explicit feature engineering.

## Practical Tips

### Feature Engineering

**Scaling:** Standardize features for faster convergence and better regularization.

**Polynomial features:** For non-linear boundaries.

**Interaction terms:** When features combine in important ways.

**Domain-specific features:** Use domain knowledge.

### Handling Class Imbalance

**Resampling:**
- Oversample minority class
- Undersample majority class
- SMOTE (Synthetic Minority Over-sampling)

**Class weights:**
Weight loss by inverse class frequency:

$$J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}w_{y^{(i)}}\left[y^{(i)}\log h_\theta(x^{(i)}) + (1-y^{(i)})\log(1-h_\theta(x^{(i)}))\right]$$

**Threshold adjustment:**
Lower threshold for minority class.

### Debugging

**Cost not decreasing:**
- Learning rate too low or too high
- Bug in gradient computation
- Feature scaling needed

**Check gradient numerically:**

$$\frac{\partial J}{\partial \theta_j} \approx \frac{J(\theta + \epsilon e_j) - J(\theta - \epsilon e_j)}{2\epsilon}$$

Should match analytical gradient.

## Conclusion

Logistic regression is the foundational algorithm for binary classification. By applying the sigmoid function to a linear combination of features, it elegantly maps inputs to probabilities while maintaining interpretability and computational efficiency.

Key concepts:
- **Sigmoid function:** Maps real numbers to (0, 1)
- **Cross-entropy loss:** Probabilistically principled, convex
- **Gradient descent:** Same form as linear regression with sigmoid
- **Decision boundary:** Hyperplane in feature space
- **Regularization:** L1/L2 prevent overfitting
- **Interpretability:** Coefficients relate to odds ratios

Logistic regression's simplicity, speed, and interpretability make it a go-to baseline for classification. It performs well on linearly separable data and with good feature engineering can handle complex patterns. Its probabilistic outputs provide uncertainty estimates crucial for many applications.

As we extend to multiclass classification, the softmax function will generalize the sigmoid, and cross-entropy will extend naturally. The foundations laid here—probabilistic modeling, maximum likelihood, gradient descent—will recur throughout machine learning, making logistic regression essential for any practitioner.