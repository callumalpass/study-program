import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs402-t2-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Simple Linear Regression',
    difficulty: 2,
    description: `Implement linear regression from scratch using normal equation.

Requirements:
- Calculate optimal weights: w = (X^T X)^-1 X^T y
- Add bias term (column of ones)
- Implement fit and predict methods
- Return coefficients and intercept`,
    starterCode: `import numpy as np

class LinearRegression:
    def __init__(self):
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        """Fit linear regression using normal equation."""
        # TODO: Implement fit
        pass

    def predict(self, X):
        """Predict using linear model."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class LinearRegression:
    def __init__(self):
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        """Fit linear regression using normal equation."""
        X = np.array(X)
        y = np.array(y)

        # Add bias term
        X_b = np.c_[np.ones((X.shape[0], 1)), X]

        # Normal equation: w = (X^T X)^-1 X^T y
        theta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y

        self.bias = theta[0]
        self.weights = theta[1:]

        return self

    def predict(self, X):
        """Predict using linear model."""
        X = np.array(X)
        return X @ self.weights + self.bias`,
    testCases: [],
    hints: [
      'Add column of ones to X for bias term',
      'Use @ operator for matrix multiplication',
      'np.linalg.inv() computes matrix inverse',
      'First element of theta is bias, rest are weights',
      'Normal equation: w = (X^T X)^-1 X^T y'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex02',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Calculate Mean Squared Error',
    difficulty: 1,
    description: `Implement MSE cost function for regression.

Requirements:
- Calculate MSE: (1/n) * Σ(y_pred - y_true)^2
- Handle both vectors and scalars
- Return single float value`,
    starterCode: `import numpy as np

def mean_squared_error(y_true, y_pred):
    """
    Calculate mean squared error.

    Args:
        y_true: True values
        y_pred: Predicted values

    Returns:
        MSE as float
    """
    # TODO: Implement MSE
    pass`,
    solution: `import numpy as np

def mean_squared_error(y_true, y_pred):
    """
    Calculate mean squared error.

    Args:
        y_true: True values
        y_pred: Predicted values

    Returns:
        MSE as float
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    mse = np.mean((y_pred - y_true) ** 2)
    return mse`,
    testCases: [],
    hints: [
      'MSE = average of squared errors',
      'Use np.mean() for averaging',
      'Square the differences: (y_pred - y_true) ** 2',
      'MSE is always non-negative',
      'Perfect predictions give MSE = 0'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex03',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Gradient Descent for Linear Regression',
    difficulty: 3,
    description: `Implement batch gradient descent to optimize linear regression.

Requirements:
- Initialize weights randomly
- Calculate gradient: dw = (2/n) * X^T * (X*w - y)
- Update weights: w = w - learning_rate * gradient
- Track cost history
- Implement early stopping`,
    starterCode: `import numpy as np

class GradientDescentRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit using gradient descent."""
        # TODO: Implement gradient descent
        pass

    def predict(self, X):
        """Predict using linear model."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class GradientDescentRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit using gradient descent."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient descent
        for _ in range(self.n_iterations):
            # Forward pass
            y_pred = X @ self.weights + self.bias

            # Calculate cost (MSE)
            cost = np.mean((y_pred - y) ** 2)
            self.cost_history.append(cost)

            # Calculate gradients
            dw = (2 / n_samples) * X.T @ (y_pred - y)
            db = (2 / n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict(self, X):
        """Predict using linear model."""
        X = np.array(X)
        return X @ self.weights + self.bias`,
    testCases: [],
    hints: [
      'Initialize weights to zeros or small random values',
      'Gradient for weights: dw = (2/n) * X^T * (y_pred - y)',
      'Gradient for bias: db = (2/n) * sum(y_pred - y)',
      'Update: w = w - learning_rate * dw',
      'Cost should decrease over iterations'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex04',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Stochastic Gradient Descent',
    difficulty: 3,
    description: `Implement SGD where gradient is computed on single random sample each iteration.

Requirements:
- Randomly shuffle data each epoch
- Update weights after each sample
- Implement multiple epochs
- Track cost after each epoch`,
    starterCode: `import numpy as np

class SGDRegression:
    def __init__(self, learning_rate=0.01, n_epochs=100):
        self.learning_rate = learning_rate
        self.n_epochs = n_epochs
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit using stochastic gradient descent."""
        # TODO: Implement SGD
        pass

    def predict(self, X):
        """Predict using linear model."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class SGDRegression:
    def __init__(self, learning_rate=0.01, n_epochs=100):
        self.learning_rate = learning_rate
        self.n_epochs = n_epochs
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit using stochastic gradient descent."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # SGD epochs
        for epoch in range(self.n_epochs):
            # Shuffle data
            indices = np.random.permutation(n_samples)

            # Update on each sample
            for idx in indices:
                xi = X[idx]
                yi = y[idx]

                # Forward pass
                y_pred = xi @ self.weights + self.bias

                # Calculate gradients for single sample
                error = y_pred - yi
                dw = 2 * xi * error
                db = 2 * error

                # Update parameters
                self.weights -= self.learning_rate * dw
                self.bias -= self.learning_rate * db

            # Calculate cost after epoch
            y_pred_all = X @ self.weights + self.bias
            cost = np.mean((y_pred_all - y) ** 2)
            self.cost_history.append(cost)

        return self

    def predict(self, X):
        """Predict using linear model."""
        X = np.array(X)
        return X @ self.weights + self.bias`,
    testCases: [],
    hints: [
      'Shuffle data at the start of each epoch',
      'Update weights after each single sample',
      'Gradient for one sample: dw = 2 * x * error',
      'SGD is noisier but faster than batch GD',
      'Calculate full cost after each epoch for monitoring'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex05',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Mini-Batch Gradient Descent',
    difficulty: 3,
    description: `Implement mini-batch GD where gradient is computed on small batches.

Requirements:
- Split data into mini-batches
- Update weights after each batch
- Shuffle data each epoch
- Support variable batch sizes`,
    starterCode: `import numpy as np

class MiniBatchGD:
    def __init__(self, learning_rate=0.01, n_epochs=100, batch_size=32):
        self.learning_rate = learning_rate
        self.n_epochs = n_epochs
        self.batch_size = batch_size
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit using mini-batch gradient descent."""
        # TODO: Implement mini-batch GD
        pass

    def predict(self, X):
        """Predict using linear model."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class MiniBatchGD:
    def __init__(self, learning_rate=0.01, n_epochs=100, batch_size=32):
        self.learning_rate = learning_rate
        self.n_epochs = n_epochs
        self.batch_size = batch_size
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit using mini-batch gradient descent."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Mini-batch GD epochs
        for epoch in range(self.n_epochs):
            # Shuffle data
            indices = np.random.permutation(n_samples)
            X_shuffled = X[indices]
            y_shuffled = y[indices]

            # Process mini-batches
            for i in range(0, n_samples, self.batch_size):
                batch_end = min(i + self.batch_size, n_samples)
                X_batch = X_shuffled[i:batch_end]
                y_batch = y_shuffled[i:batch_end]
                batch_size_actual = len(X_batch)

                # Forward pass
                y_pred = X_batch @ self.weights + self.bias

                # Calculate gradients for batch
                dw = (2 / batch_size_actual) * X_batch.T @ (y_pred - y_batch)
                db = (2 / batch_size_actual) * np.sum(y_pred - y_batch)

                # Update parameters
                self.weights -= self.learning_rate * dw
                self.bias -= self.learning_rate * db

            # Calculate cost after epoch
            y_pred_all = X @ self.weights + self.bias
            cost = np.mean((y_pred_all - y) ** 2)
            self.cost_history.append(cost)

        return self

    def predict(self, X):
        """Predict using linear model."""
        X = np.array(X)
        return X @ self.weights + self.bias`,
    testCases: [],
    hints: [
      'Mini-batch is between SGD (batch=1) and batch GD (batch=n)',
      'Shuffle data at start of each epoch',
      'Process data in chunks of batch_size',
      'Handle last batch which may be smaller',
      'Typical batch sizes: 32, 64, 128, 256'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex06',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement L2 Regularization (Ridge)',
    difficulty: 3,
    description: `Add L2 regularization to linear regression to prevent overfitting.

Requirements:
- Add penalty term: λ * ||w||^2
- Modified cost: MSE + λ * sum(w^2)
- Modified gradient: gradient + 2λw
- Implement with gradient descent`,
    starterCode: `import numpy as np

class RidgeRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=1.0):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.alpha = alpha  # Regularization strength
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit Ridge regression with L2 regularization."""
        # TODO: Implement Ridge regression
        pass

    def predict(self, X):
        """Predict using linear model."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class RidgeRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=1.0):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.alpha = alpha  # Regularization strength
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit Ridge regression with L2 regularization."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient descent with L2 regularization
        for _ in range(self.n_iterations):
            # Forward pass
            y_pred = X @ self.weights + self.bias

            # Calculate cost with L2 penalty
            mse = np.mean((y_pred - y) ** 2)
            l2_penalty = self.alpha * np.sum(self.weights ** 2)
            cost = mse + l2_penalty
            self.cost_history.append(cost)

            # Calculate gradients with L2 regularization
            dw = (2 / n_samples) * X.T @ (y_pred - y) + 2 * self.alpha * self.weights
            db = (2 / n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict(self, X):
        """Predict using linear model."""
        X = np.array(X)
        return X @ self.weights + self.bias`,
    testCases: [],
    hints: [
      'L2 penalty: alpha * sum(w^2)',
      'Modified gradient: original_gradient + 2*alpha*w',
      'Bias is not regularized',
      'Larger alpha = more regularization = simpler model',
      'Ridge shrinks weights toward zero'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex07',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement L1 Regularization (Lasso)',
    difficulty: 3,
    description: `Add L1 regularization to linear regression for feature selection.

Requirements:
- Add penalty term: λ * ||w||_1
- Modified cost: MSE + λ * sum(|w|)
- Modified gradient uses sign of weights
- Can drive weights exactly to zero`,
    starterCode: `import numpy as np

class LassoRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=1.0):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.alpha = alpha
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit Lasso regression with L1 regularization."""
        # TODO: Implement Lasso regression
        pass

    def predict(self, X):
        """Predict using linear model."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class LassoRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=1.0):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.alpha = alpha
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Fit Lasso regression with L1 regularization."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient descent with L1 regularization
        for _ in range(self.n_iterations):
            # Forward pass
            y_pred = X @ self.weights + self.bias

            # Calculate cost with L1 penalty
            mse = np.mean((y_pred - y) ** 2)
            l1_penalty = self.alpha * np.sum(np.abs(self.weights))
            cost = mse + l1_penalty
            self.cost_history.append(cost)

            # Calculate gradients with L1 regularization
            # L1 gradient is sign of weight
            dw = (2 / n_samples) * X.T @ (y_pred - y) + self.alpha * np.sign(self.weights)
            db = (2 / n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict(self, X):
        """Predict using linear model."""
        X = np.array(X)
        return X @ self.weights + self.bias`,
    testCases: [],
    hints: [
      'L1 penalty: alpha * sum(|w|)',
      'L1 gradient: alpha * sign(w)',
      'np.sign() returns -1, 0, or 1',
      'L1 can drive weights exactly to zero',
      'Lasso performs automatic feature selection'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex08',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Sigmoid Function',
    difficulty: 1,
    description: `Implement sigmoid activation function for logistic regression.

Requirements:
- Sigmoid: σ(z) = 1 / (1 + e^(-z))
- Handle numerical stability (large positive/negative values)
- Return values in range (0, 1)`,
    starterCode: `import numpy as np

def sigmoid(z):
    """
    Compute sigmoid function.

    Args:
        z: Input (can be scalar, vector, or matrix)

    Returns:
        Sigmoid output in range (0, 1)
    """
    # TODO: Implement sigmoid
    pass`,
    solution: `import numpy as np

def sigmoid(z):
    """
    Compute sigmoid function.

    Args:
        z: Input (can be scalar, vector, or matrix)

    Returns:
        Sigmoid output in range (0, 1)
    """
    # Clip z for numerical stability
    z = np.clip(z, -500, 500)
    return 1 / (1 + np.exp(-z))`,
    testCases: [],
    hints: [
      'Sigmoid formula: 1 / (1 + exp(-z))',
      'Clip z to prevent overflow in exp()',
      'Sigmoid(0) = 0.5',
      'Sigmoid approaches 1 as z → ∞',
      'Sigmoid approaches 0 as z → -∞'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex09',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Binary Cross-Entropy Loss',
    difficulty: 2,
    description: `Implement binary cross-entropy loss for logistic regression.

Requirements:
- Loss: -[y*log(p) + (1-y)*log(1-p)]
- Handle numerical stability
- Return average loss over samples`,
    starterCode: `import numpy as np

def binary_cross_entropy(y_true, y_pred):
    """
    Calculate binary cross-entropy loss.

    Args:
        y_true: True labels (0 or 1)
        y_pred: Predicted probabilities

    Returns:
        Average BCE loss
    """
    # TODO: Implement BCE loss
    pass`,
    solution: `import numpy as np

def binary_cross_entropy(y_true, y_pred):
    """
    Calculate binary cross-entropy loss.

    Args:
        y_true: True labels (0 or 1)
        y_pred: Predicted probabilities

    Returns:
        Average BCE loss
    """
    # Clip predictions for numerical stability
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)

    # Binary cross-entropy formula
    loss = -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

    return loss`,
    testCases: [],
    hints: [
      'Clip predictions to avoid log(0)',
      'Formula: -[y*log(p) + (1-y)*log(1-p)]',
      'Take mean over all samples',
      'Loss is minimized when y_pred = y_true',
      'Small epsilon (e.g., 1e-15) prevents log(0)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Logistic Regression',
    difficulty: 3,
    description: `Implement binary logistic regression from scratch.

Requirements:
- Use sigmoid activation
- Binary cross-entropy loss
- Gradient descent optimization
- Predict probabilities and classes`,
    starterCode: `import numpy as np

class LogisticRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.cost_history = []

    def sigmoid(self, z):
        """Sigmoid activation function."""
        # TODO: Implement sigmoid
        pass

    def fit(self, X, y):
        """Fit logistic regression using gradient descent."""
        # TODO: Implement fit
        pass

    def predict_proba(self, X):
        """Predict class probabilities."""
        # TODO: Implement predict_proba
        pass

    def predict(self, X, threshold=0.5):
        """Predict class labels."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class LogisticRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.cost_history = []

    def sigmoid(self, z):
        """Sigmoid activation function."""
        z = np.clip(z, -500, 500)
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        """Fit logistic regression using gradient descent."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient descent
        for _ in range(self.n_iterations):
            # Forward pass
            z = X @ self.weights + self.bias
            y_pred = self.sigmoid(z)

            # Calculate cost (binary cross-entropy)
            epsilon = 1e-15
            y_pred_clipped = np.clip(y_pred, epsilon, 1 - epsilon)
            cost = -np.mean(y * np.log(y_pred_clipped) + (1 - y) * np.log(1 - y_pred_clipped))
            self.cost_history.append(cost)

            # Calculate gradients
            dw = (1 / n_samples) * X.T @ (y_pred - y)
            db = (1 / n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict_proba(self, X):
        """Predict class probabilities."""
        X = np.array(X)
        z = X @ self.weights + self.bias
        return self.sigmoid(z)

    def predict(self, X, threshold=0.5):
        """Predict class labels."""
        probas = self.predict_proba(X)
        return (probas >= threshold).astype(int)`,
    testCases: [],
    hints: [
      'Use sigmoid to convert linear output to probabilities',
      'Binary cross-entropy is the appropriate loss function',
      'Gradient: dw = (1/n) * X^T * (y_pred - y)',
      'Predict class 1 if probability >= threshold',
      'Clip probabilities for numerical stability in loss calculation'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Logistic Regression with L2 Regularization',
    difficulty: 3,
    description: `Add L2 regularization to logistic regression.

Requirements:
- Add L2 penalty to cost function
- Modify gradient with regularization term
- Prevent overfitting on training data`,
    starterCode: `import numpy as np

class RegularizedLogisticRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=1.0):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.alpha = alpha
        self.weights = None
        self.bias = None
        self.cost_history = []

    def sigmoid(self, z):
        """Sigmoid activation function."""
        z = np.clip(z, -500, 500)
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        """Fit regularized logistic regression."""
        # TODO: Implement fit with L2 regularization
        pass

    def predict_proba(self, X):
        """Predict class probabilities."""
        # TODO: Implement predict_proba
        pass

    def predict(self, X, threshold=0.5):
        """Predict class labels."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class RegularizedLogisticRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000, alpha=1.0):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.alpha = alpha
        self.weights = None
        self.bias = None
        self.cost_history = []

    def sigmoid(self, z):
        """Sigmoid activation function."""
        z = np.clip(z, -500, 500)
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        """Fit regularized logistic regression."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient descent with L2 regularization
        for _ in range(self.n_iterations):
            # Forward pass
            z = X @ self.weights + self.bias
            y_pred = self.sigmoid(z)

            # Calculate cost with L2 penalty
            epsilon = 1e-15
            y_pred_clipped = np.clip(y_pred, epsilon, 1 - epsilon)
            bce = -np.mean(y * np.log(y_pred_clipped) + (1 - y) * np.log(1 - y_pred_clipped))
            l2_penalty = (self.alpha / (2 * n_samples)) * np.sum(self.weights ** 2)
            cost = bce + l2_penalty
            self.cost_history.append(cost)

            # Calculate gradients with L2 regularization
            dw = (1 / n_samples) * X.T @ (y_pred - y) + (self.alpha / n_samples) * self.weights
            db = (1 / n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict_proba(self, X):
        """Predict class probabilities."""
        X = np.array(X)
        z = X @ self.weights + self.bias
        return self.sigmoid(z)

    def predict(self, X, threshold=0.5):
        """Predict class labels."""
        probas = self.predict_proba(X)
        return (probas >= threshold).astype(int)`,
    testCases: [],
    hints: [
      'L2 penalty: (alpha/(2*n)) * sum(w^2)',
      'Modified gradient: gradient + (alpha/n) * w',
      'Bias is typically not regularized',
      'Regularization prevents large weight values',
      'Higher alpha = stronger regularization'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement One-vs-Rest Multiclass Classification',
    difficulty: 4,
    description: `Extend binary logistic regression to multiclass using One-vs-Rest.

Requirements:
- Train one binary classifier per class
- Predict using all classifiers
- Return class with highest probability
- Handle k classes`,
    starterCode: `import numpy as np

class OneVsRestClassifier:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.classifiers = []
        self.classes = None

    def fit(self, X, y):
        """Train one binary classifier per class."""
        # TODO: Implement One-vs-Rest training
        pass

    def predict_proba(self, X):
        """Predict probabilities for each class."""
        # TODO: Implement predict_proba
        pass

    def predict(self, X):
        """Predict class labels."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class BinaryLogisticRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def sigmoid(self, z):
        z = np.clip(z, -500, 500)
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.n_iterations):
            z = X @ self.weights + self.bias
            y_pred = self.sigmoid(z)
            dw = (1 / n_samples) * X.T @ (y_pred - y)
            db = (1 / n_samples) * np.sum(y_pred - y)
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db
        return self

    def predict_proba(self, X):
        X = np.array(X)
        z = X @ self.weights + self.bias
        return self.sigmoid(z)

class OneVsRestClassifier:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.classifiers = []
        self.classes = None

    def fit(self, X, y):
        """Train one binary classifier per class."""
        X = np.array(X)
        y = np.array(y)
        self.classes = np.unique(y)

        # Train one classifier per class
        for cls in self.classes:
            # Create binary labels: 1 if class matches, 0 otherwise
            y_binary = (y == cls).astype(int)

            # Train binary classifier
            clf = BinaryLogisticRegression(self.learning_rate, self.n_iterations)
            clf.fit(X, y_binary)
            self.classifiers.append(clf)

        return self

    def predict_proba(self, X):
        """Predict probabilities for each class."""
        # Get predictions from all classifiers
        probas = np.array([clf.predict_proba(X) for clf in self.classifiers]).T
        # Normalize so probabilities sum to 1
        probas = probas / np.sum(probas, axis=1, keepdims=True)
        return probas

    def predict(self, X):
        """Predict class labels."""
        probas = self.predict_proba(X)
        return self.classes[np.argmax(probas, axis=1)]`,
    testCases: [],
    hints: [
      'Train k binary classifiers for k classes',
      'Each classifier: current class vs all others',
      'Create binary labels: 1 for target class, 0 for others',
      'Predict: class with highest probability',
      'Normalize probabilities to sum to 1'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Softmax Function',
    difficulty: 2,
    description: `Implement softmax activation for multiclass classification.

Requirements:
- Convert logits to probabilities
- Ensure numerical stability
- Probabilities sum to 1
- Handle batches of inputs`,
    starterCode: `import numpy as np

def softmax(z):
    """
    Compute softmax activation.

    Args:
        z: Logits (n_samples, n_classes) or (n_classes,)

    Returns:
        Probabilities that sum to 1
    """
    # TODO: Implement softmax
    pass`,
    solution: `import numpy as np

def softmax(z):
    """
    Compute softmax activation.

    Args:
        z: Logits (n_samples, n_classes) or (n_classes,)

    Returns:
        Probabilities that sum to 1
    """
    z = np.array(z)

    # Subtract max for numerical stability
    if z.ndim == 1:
        z_shifted = z - np.max(z)
        exp_z = np.exp(z_shifted)
        return exp_z / np.sum(exp_z)
    else:
        z_shifted = z - np.max(z, axis=1, keepdims=True)
        exp_z = np.exp(z_shifted)
        return exp_z / np.sum(exp_z, axis=1, keepdims=True)`,
    testCases: [],
    hints: [
      'Softmax: exp(z_i) / sum(exp(z_j))',
      'Subtract max(z) before exp for numerical stability',
      'Output probabilities sum to 1',
      'Handle both single samples and batches',
      'Use keepdims=True for correct broadcasting'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Learning Rate Decay',
    difficulty: 2,
    description: `Implement learning rate schedules for better convergence.

Requirements:
- Step decay: reduce by factor every n epochs
- Exponential decay: multiply by decay rate
- Time-based decay: decrease over iterations
- Return updated learning rate`,
    starterCode: `import numpy as np

class LearningRateScheduler:
    def __init__(self, initial_lr=0.1):
        self.initial_lr = initial_lr
        self.current_lr = initial_lr

    def step_decay(self, epoch, drop_rate=0.5, epochs_drop=10):
        """Step decay: reduce LR every epochs_drop."""
        # TODO: Implement step decay
        pass

    def exponential_decay(self, epoch, decay_rate=0.95):
        """Exponential decay: lr = lr0 * decay_rate^epoch."""
        # TODO: Implement exponential decay
        pass

    def time_decay(self, epoch, decay_rate=0.01):
        """Time-based decay: lr = lr0 / (1 + decay_rate * epoch)."""
        # TODO: Implement time decay
        pass`,
    solution: `import numpy as np

class LearningRateScheduler:
    def __init__(self, initial_lr=0.1):
        self.initial_lr = initial_lr
        self.current_lr = initial_lr

    def step_decay(self, epoch, drop_rate=0.5, epochs_drop=10):
        """Step decay: reduce LR every epochs_drop."""
        self.current_lr = self.initial_lr * (drop_rate ** (epoch // epochs_drop))
        return self.current_lr

    def exponential_decay(self, epoch, decay_rate=0.95):
        """Exponential decay: lr = lr0 * decay_rate^epoch."""
        self.current_lr = self.initial_lr * (decay_rate ** epoch)
        return self.current_lr

    def time_decay(self, epoch, decay_rate=0.01):
        """Time-based decay: lr = lr0 / (1 + decay_rate * epoch)."""
        self.current_lr = self.initial_lr / (1 + decay_rate * epoch)
        return self.current_lr`,
    testCases: [],
    hints: [
      'Step decay: lr *= drop_rate every epochs_drop',
      'Exponential: lr = lr0 * decay_rate^epoch',
      'Time-based: lr = lr0 / (1 + decay * epoch)',
      'Learning rate should decrease over time',
      'Helps with fine-tuning in later epochs'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Implement Early Stopping',
    difficulty: 3,
    description: `Implement early stopping to prevent overfitting during training.

Requirements:
- Monitor validation loss
- Stop if no improvement for patience epochs
- Save best model weights
- Restore best weights after stopping`,
    starterCode: `import numpy as np

class EarlyStopping:
    def __init__(self, patience=10, min_delta=0.001):
        self.patience = patience
        self.min_delta = min_delta
        self.best_loss = None
        self.counter = 0
        self.best_weights = None

    def __call__(self, val_loss, model):
        """
        Check if training should stop.

        Args:
            val_loss: Current validation loss
            model: Model with weights attribute

        Returns:
            True if should stop, False otherwise
        """
        # TODO: Implement early stopping logic
        pass`,
    solution: `import numpy as np

class EarlyStopping:
    def __init__(self, patience=10, min_delta=0.001):
        self.patience = patience
        self.min_delta = min_delta
        self.best_loss = None
        self.counter = 0
        self.best_weights = None

    def __call__(self, val_loss, model):
        """
        Check if training should stop.

        Args:
            val_loss: Current validation loss
            model: Model with weights attribute

        Returns:
            True if should stop, False otherwise
        """
        if self.best_loss is None:
            # First epoch
            self.best_loss = val_loss
            self.best_weights = model.weights.copy()
            return False

        if val_loss < self.best_loss - self.min_delta:
            # Improvement found
            self.best_loss = val_loss
            self.best_weights = model.weights.copy()
            self.counter = 0
            return False
        else:
            # No improvement
            self.counter += 1
            if self.counter >= self.patience:
                # Restore best weights
                model.weights = self.best_weights
                return True
            return False`,
    testCases: [],
    hints: [
      'Track best validation loss seen so far',
      'Increment counter if no improvement',
      'Reset counter when improvement found',
      'Stop when counter reaches patience',
      'Save and restore best model weights'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t2-ex16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Calculate R-Squared Score',
    difficulty: 2,
    description: `Implement R² (coefficient of determination) for regression evaluation.

Requirements:
- Calculate total sum of squares (TSS)
- Calculate residual sum of squares (RSS)
- R² = 1 - (RSS / TSS)
- Return score between -∞ and 1`,
    starterCode: `import numpy as np

def r2_score(y_true, y_pred):
    """
    Calculate R-squared score.

    Args:
        y_true: True values
        y_pred: Predicted values

    Returns:
        R² score
    """
    # TODO: Implement R² score
    pass`,
    solution: `import numpy as np

def r2_score(y_true, y_pred):
    """
    Calculate R-squared score.

    Args:
        y_true: True values
        y_pred: Predicted values

    Returns:
        R² score
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    # Total sum of squares (variance in y)
    y_mean = np.mean(y_true)
    tss = np.sum((y_true - y_mean) ** 2)

    # Residual sum of squares (variance not explained)
    rss = np.sum((y_true - y_pred) ** 2)

    # R² = 1 - (RSS / TSS)
    r2 = 1 - (rss / tss)

    return r2`,
    testCases: [],
    hints: [
      'TSS = sum((y_true - y_mean)^2)',
      'RSS = sum((y_true - y_pred)^2)',
      'R² = 1 - RSS/TSS',
      'R² = 1 means perfect predictions',
      'R² = 0 means predictions equal to mean'
    ],
    language: 'python'
  }
];
