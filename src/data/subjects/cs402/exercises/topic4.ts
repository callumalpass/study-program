import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs402-t4-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Step Activation Function',
    difficulty: 1,
    description: `Implement the step (Heaviside) activation function for perceptron.

Requirements:
- Return 1 if input >= 0
- Return 0 if input < 0
- Handle arrays and scalars
- Used in binary perceptron`,
    starterCode: `import numpy as np

def step_activation(x):
    """
    Step activation function.

    Args:
        x: Input (scalar or array)

    Returns:
        0 or 1
    """
    # TODO: Implement step activation
    pass`,
    solution: `import numpy as np

def step_activation(x):
    """
    Step activation function.

    Args:
        x: Input (scalar or array)

    Returns:
        0 or 1
    """
    return np.where(x >= 0, 1, 0)`,
    testCases: [],
    hints: [
      'Step function: f(x) = 1 if x >= 0, else 0',
      'Use np.where() for vectorized operation',
      'Also called Heaviside function',
      'Non-differentiable at x = 0',
      'Used in original perceptron'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex02',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Binary Perceptron',
    difficulty: 3,
    description: `Implement a single perceptron for binary classification.

Requirements:
- Initialize weights randomly
- Update rule: w = w + α * (y - ŷ) * x
- Train until convergence or max iterations
- Use step activation function`,
    starterCode: `import numpy as np

class Perceptron:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        """Train perceptron."""
        # TODO: Implement perceptron training
        pass

    def predict(self, X):
        """Predict class labels."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class Perceptron:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        """Train perceptron."""
        X = np.array(X)
        y = np.array(y)
        n_samples, n_features = X.shape

        # Initialize weights and bias
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Training loop
        for _ in range(self.n_iterations):
            for i in range(n_samples):
                xi = X[i]
                yi = y[i]

                # Forward pass
                linear_output = np.dot(self.weights, xi) + self.bias
                y_pred = 1 if linear_output >= 0 else 0

                # Update weights if prediction is wrong
                error = yi - y_pred
                self.weights += self.learning_rate * error * xi
                self.bias += self.learning_rate * error

        return self

    def predict(self, X):
        """Predict class labels."""
        X = np.array(X)
        linear_output = X @ self.weights + self.bias
        return np.where(linear_output >= 0, 1, 0)`,
    testCases: [],
    hints: [
      'Perceptron update rule: w = w + α*(y - ŷ)*x',
      'Only update when prediction is wrong',
      'Initialize weights to zeros or small random values',
      'Linear output: w·x + b',
      'Apply step function for binary classification'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex03',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement ReLU Activation',
    difficulty: 1,
    description: `Implement ReLU (Rectified Linear Unit) activation function.

Requirements:
- ReLU(x) = max(0, x)
- Implement derivative for backpropagation
- Handle arrays efficiently
- Most common activation in hidden layers`,
    starterCode: `import numpy as np

def relu(x):
    """ReLU activation function."""
    # TODO: Implement ReLU
    pass

def relu_derivative(x):
    """Derivative of ReLU."""
    # TODO: Implement ReLU derivative
    pass`,
    solution: `import numpy as np

def relu(x):
    """ReLU activation function."""
    return np.maximum(0, x)

def relu_derivative(x):
    """Derivative of ReLU."""
    return np.where(x > 0, 1, 0)`,
    testCases: [],
    hints: [
      'ReLU: f(x) = max(0, x)',
      'Derivative: 1 if x > 0, else 0',
      'Use np.maximum() for ReLU',
      'ReLU helps avoid vanishing gradient',
      'Most popular activation for hidden layers'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex04',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Tanh Activation',
    difficulty: 1,
    description: `Implement hyperbolic tangent activation function.

Requirements:
- tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
- Implement derivative
- Output range: (-1, 1)
- Zero-centered unlike sigmoid`,
    starterCode: `import numpy as np

def tanh(x):
    """Tanh activation function."""
    # TODO: Implement tanh
    pass

def tanh_derivative(x):
    """Derivative of tanh."""
    # TODO: Implement tanh derivative
    pass`,
    solution: `import numpy as np

def tanh(x):
    """Tanh activation function."""
    return np.tanh(x)

def tanh_derivative(x):
    """Derivative of tanh."""
    # Derivative: 1 - tanh^2(x)
    return 1 - np.tanh(x) ** 2`,
    testCases: [],
    hints: [
      'tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
      'Use np.tanh() for implementation',
      'Derivative: 1 - tanh²(x)',
      'Output range: (-1, 1)',
      'Zero-centered, better than sigmoid'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex05',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Leaky ReLU',
    difficulty: 2,
    description: `Implement Leaky ReLU to prevent dying ReLU problem.

Requirements:
- Leaky ReLU: x if x > 0, else alpha*x
- Implement derivative
- Small slope for negative values (alpha=0.01)
- Prevents dead neurons`,
    starterCode: `import numpy as np

def leaky_relu(x, alpha=0.01):
    """Leaky ReLU activation function."""
    # TODO: Implement Leaky ReLU
    pass

def leaky_relu_derivative(x, alpha=0.01):
    """Derivative of Leaky ReLU."""
    # TODO: Implement derivative
    pass`,
    solution: `import numpy as np

def leaky_relu(x, alpha=0.01):
    """Leaky ReLU activation function."""
    return np.where(x > 0, x, alpha * x)

def leaky_relu_derivative(x, alpha=0.01):
    """Derivative of Leaky ReLU."""
    return np.where(x > 0, 1, alpha)`,
    testCases: [],
    hints: [
      'Leaky ReLU: f(x) = x if x > 0, else α*x',
      'Derivative: 1 if x > 0, else α',
      'Common α values: 0.01, 0.1',
      'Prevents dying ReLU problem',
      'Small gradient for negative inputs'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex06',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Forward Pass',
    difficulty: 2,
    description: `Implement forward propagation for a single layer.

Requirements:
- Calculate z = Wx + b
- Apply activation function
- Return both pre-activation (z) and activation (a)
- Support batch processing`,
    starterCode: `import numpy as np

def forward_pass(X, W, b, activation='relu'):
    """
    Forward pass for single layer.

    Args:
        X: Input (n_samples, n_features)
        W: Weights (n_features, n_neurons)
        b: Bias (n_neurons,)
        activation: Activation function name

    Returns:
        z: Pre-activation (n_samples, n_neurons)
        a: Activation output (n_samples, n_neurons)
    """
    # TODO: Implement forward pass
    pass`,
    solution: `import numpy as np

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def tanh(x):
    return np.tanh(x)

def forward_pass(X, W, b, activation='relu'):
    """
    Forward pass for single layer.

    Args:
        X: Input (n_samples, n_features)
        W: Weights (n_features, n_neurons)
        b: Bias (n_neurons,)
        activation: Activation function name

    Returns:
        z: Pre-activation (n_samples, n_neurons)
        a: Activation output (n_samples, n_neurons)
    """
    # Linear transformation
    z = X @ W + b

    # Apply activation
    if activation == 'relu':
        a = relu(z)
    elif activation == 'sigmoid':
        a = sigmoid(z)
    elif activation == 'tanh':
        a = tanh(z)
    elif activation == 'linear':
        a = z
    else:
        raise ValueError(f"Unknown activation: {activation}")

    return z, a`,
    testCases: [],
    hints: [
      'Linear transformation: z = X @ W + b',
      'Apply activation to z to get a',
      'Store z for backpropagation',
      'Broadcasting handles bias addition',
      'Support multiple activation functions'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex07',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Backward Pass for Output Layer',
    difficulty: 3,
    description: `Implement backpropagation for output layer.

Requirements:
- Calculate loss gradient
- Compute weight gradient: dW = X^T @ dL/da
- Compute bias gradient: db = sum(dL/da)
- Return gradients for weights and bias`,
    starterCode: `import numpy as np

def backward_output_layer(X, y, a, loss='mse'):
    """
    Backward pass for output layer.

    Args:
        X: Input to this layer (n_samples, n_features)
        y: True labels (n_samples, n_outputs)
        a: Output activations (n_samples, n_outputs)
        loss: Loss function ('mse' or 'cross_entropy')

    Returns:
        dW: Weight gradient (n_features, n_outputs)
        db: Bias gradient (n_outputs,)
        dX: Gradient w.r.t input (n_samples, n_features)
    """
    # TODO: Implement backward pass for output layer
    pass`,
    solution: `import numpy as np

def backward_output_layer(X, y, a, loss='mse'):
    """
    Backward pass for output layer.

    Args:
        X: Input to this layer (n_samples, n_features)
        y: True labels (n_samples, n_outputs)
        a: Output activations (n_samples, n_outputs)
        loss: Loss function ('mse' or 'cross_entropy')

    Returns:
        dW: Weight gradient (n_features, n_outputs)
        db: Bias gradient (n_outputs,)
        dX: Gradient w.r.t input (n_samples, n_features)
    """
    n_samples = X.shape[0]

    # Gradient of loss w.r.t. output activation
    if loss == 'mse':
        # MSE: (a - y)
        da = a - y
    elif loss == 'cross_entropy':
        # Binary cross-entropy with sigmoid
        da = a - y
    else:
        raise ValueError(f"Unknown loss: {loss}")

    # Gradients
    dW = (1 / n_samples) * X.T @ da
    db = (1 / n_samples) * np.sum(da, axis=0)
    dX = da @ W.T  # For propagating to previous layer

    return dW, db, dX`,
    testCases: [],
    hints: [
      'For MSE: gradient = a - y',
      'For cross-entropy + sigmoid: gradient = a - y',
      'Weight gradient: dW = (1/n) * X^T @ da',
      'Bias gradient: db = (1/n) * sum(da)',
      'Gradient w.r.t. input: dX = da @ W^T'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex08',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Backward Pass for Hidden Layer',
    difficulty: 3,
    description: `Implement backpropagation for hidden layer.

Requirements:
- Calculate gradient from next layer
- Apply activation derivative
- Compute weight and bias gradients
- Return gradients for current and previous layer`,
    starterCode: `import numpy as np

def backward_hidden_layer(X, W, z, dA_next, activation='relu'):
    """
    Backward pass for hidden layer.

    Args:
        X: Input to this layer (n_samples, n_features)
        W: Weights (n_features, n_neurons)
        z: Pre-activation (n_samples, n_neurons)
        dA_next: Gradient from next layer (n_samples, n_neurons)
        activation: Activation function

    Returns:
        dW: Weight gradient (n_features, n_neurons)
        db: Bias gradient (n_neurons,)
        dX: Gradient w.r.t input (n_samples, n_features)
    """
    # TODO: Implement backward pass for hidden layer
    pass`,
    solution: `import numpy as np

def relu_derivative(x):
    return np.where(x > 0, 1, 0)

def sigmoid_derivative(x):
    s = 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    return s * (1 - s)

def tanh_derivative(x):
    return 1 - np.tanh(x) ** 2

def backward_hidden_layer(X, W, z, dA_next, activation='relu'):
    """
    Backward pass for hidden layer.

    Args:
        X: Input to this layer (n_samples, n_features)
        W: Weights (n_features, n_neurons)
        z: Pre-activation (n_samples, n_neurons)
        dA_next: Gradient from next layer (n_samples, n_neurons)
        activation: Activation function

    Returns:
        dW: Weight gradient (n_features, n_neurons)
        db: Bias gradient (n_neurons,)
        dX: Gradient w.r.t input (n_samples, n_features)
    """
    n_samples = X.shape[0]

    # Apply activation derivative
    if activation == 'relu':
        dz = dA_next * relu_derivative(z)
    elif activation == 'sigmoid':
        dz = dA_next * sigmoid_derivative(z)
    elif activation == 'tanh':
        dz = dA_next * tanh_derivative(z)
    elif activation == 'linear':
        dz = dA_next
    else:
        raise ValueError(f"Unknown activation: {activation}")

    # Calculate gradients
    dW = (1 / n_samples) * X.T @ dz
    db = (1 / n_samples) * np.sum(dz, axis=0)
    dX = dz @ W.T

    return dW, db, dX`,
    testCases: [],
    hints: [
      'Chain rule: dz = dA_next * activation_derivative(z)',
      'Weight gradient: dW = (1/n) * X^T @ dz',
      'Bias gradient: db = (1/n) * sum(dz)',
      'Propagate to previous layer: dX = dz @ W^T',
      'Activation derivative depends on pre-activation z'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex09',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Xavier/Glorot Initialization',
    difficulty: 2,
    description: `Implement Xavier initialization for neural network weights.

Requirements:
- Initialize weights from uniform distribution
- Range: [-√(6/(n_in + n_out)), √(6/(n_in + n_out))]
- Initialize bias to zeros
- Helps maintain gradient variance`,
    starterCode: `import numpy as np

def xavier_initialization(n_in, n_out, random_state=None):
    """
    Xavier/Glorot weight initialization.

    Args:
        n_in: Number of input units
        n_out: Number of output units
        random_state: Random seed

    Returns:
        W: Initialized weights (n_in, n_out)
        b: Initialized bias (n_out,)
    """
    # TODO: Implement Xavier initialization
    pass`,
    solution: `import numpy as np

def xavier_initialization(n_in, n_out, random_state=None):
    """
    Xavier/Glorot weight initialization.

    Args:
        n_in: Number of input units
        n_out: Number of output units
        random_state: Random seed

    Returns:
        W: Initialized weights (n_in, n_out)
        b: Initialized bias (n_out,)
    """
    if random_state is not None:
        np.random.seed(random_state)

    # Xavier uniform initialization
    limit = np.sqrt(6 / (n_in + n_out))
    W = np.random.uniform(-limit, limit, (n_in, n_out))

    # Bias initialized to zeros
    b = np.zeros(n_out)

    return W, b`,
    testCases: [],
    hints: [
      'Xavier uniform: W ~ U(-√(6/(n_in+n_out)), √(6/(n_in+n_out)))',
      'Xavier normal: W ~ N(0, √(2/(n_in+n_out)))',
      'Bias initialized to zeros',
      'Helps avoid vanishing/exploding gradients',
      'Works well with tanh and sigmoid'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement He Initialization',
    difficulty: 2,
    description: `Implement He initialization for ReLU networks.

Requirements:
- Initialize weights from normal distribution
- Mean: 0, Variance: 2/n_in
- Initialize bias to zeros
- Optimized for ReLU activation`,
    starterCode: `import numpy as np

def he_initialization(n_in, n_out, random_state=None):
    """
    He weight initialization for ReLU networks.

    Args:
        n_in: Number of input units
        n_out: Number of output units
        random_state: Random seed

    Returns:
        W: Initialized weights (n_in, n_out)
        b: Initialized bias (n_out,)
    """
    # TODO: Implement He initialization
    pass`,
    solution: `import numpy as np

def he_initialization(n_in, n_out, random_state=None):
    """
    He weight initialization for ReLU networks.

    Args:
        n_in: Number of input units
        n_out: Number of output units
        random_state: Random seed

    Returns:
        W: Initialized weights (n_in, n_out)
        b: Initialized bias (n_out,)
    """
    if random_state is not None:
        np.random.seed(random_state)

    # He normal initialization
    std = np.sqrt(2 / n_in)
    W = np.random.normal(0, std, (n_in, n_out))

    # Bias initialized to zeros
    b = np.zeros(n_out)

    return W, b`,
    testCases: [],
    hints: [
      'He normal: W ~ N(0, √(2/n_in))',
      'He uniform: W ~ U(-√(6/n_in), √(6/n_in))',
      'Optimized for ReLU and its variants',
      'Variance: 2/n_in',
      'Bias initialized to zeros'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement 2-Layer Neural Network',
    difficulty: 4,
    description: `Implement a complete 2-layer neural network with backpropagation.

Requirements:
- One hidden layer, one output layer
- Forward propagation through both layers
- Backpropagation to compute gradients
- Gradient descent for training
- Support different activation functions`,
    starterCode: `import numpy as np

class TwoLayerNN:
    def __init__(self, n_features, n_hidden, n_output, learning_rate=0.01):
        self.learning_rate = learning_rate
        # Initialize weights and biases
        # TODO: Initialize parameters
        pass

    def forward(self, X):
        """Forward propagation."""
        # TODO: Implement forward pass
        pass

    def backward(self, X, y):
        """Backward propagation."""
        # TODO: Implement backward pass
        pass

    def fit(self, X, y, n_epochs=1000):
        """Train the network."""
        # TODO: Implement training loop
        pass

    def predict(self, X):
        """Make predictions."""
        # TODO: Implement predict
        pass`,
    solution: `import numpy as np

class TwoLayerNN:
    def __init__(self, n_features, n_hidden, n_output, learning_rate=0.01):
        self.learning_rate = learning_rate

        # He initialization for hidden layer (ReLU)
        self.W1 = np.random.randn(n_features, n_hidden) * np.sqrt(2 / n_features)
        self.b1 = np.zeros(n_hidden)

        # Xavier initialization for output layer (sigmoid)
        limit = np.sqrt(6 / (n_hidden + n_output))
        self.W2 = np.random.uniform(-limit, limit, (n_hidden, n_output))
        self.b2 = np.zeros(n_output)

        # Cache for backpropagation
        self.cache = {}

    def relu(self, x):
        return np.maximum(0, x)

    def relu_derivative(self, x):
        return np.where(x > 0, 1, 0)

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, X):
        """Forward propagation."""
        # Hidden layer
        z1 = X @ self.W1 + self.b1
        a1 = self.relu(z1)

        # Output layer
        z2 = a1 @ self.W2 + self.b2
        a2 = self.sigmoid(z2)

        # Cache for backward pass
        self.cache = {'X': X, 'z1': z1, 'a1': a1, 'z2': z2, 'a2': a2}

        return a2

    def backward(self, y):
        """Backward propagation."""
        X = self.cache['X']
        a1 = self.cache['a1']
        a2 = self.cache['a2']
        z1 = self.cache['z1']

        n_samples = X.shape[0]

        # Output layer gradients
        dz2 = a2 - y
        dW2 = (1 / n_samples) * a1.T @ dz2
        db2 = (1 / n_samples) * np.sum(dz2, axis=0)

        # Hidden layer gradients
        da1 = dz2 @ self.W2.T
        dz1 = da1 * self.relu_derivative(z1)
        dW1 = (1 / n_samples) * X.T @ dz1
        db1 = (1 / n_samples) * np.sum(dz1, axis=0)

        return dW1, db1, dW2, db2

    def fit(self, X, y, n_epochs=1000):
        """Train the network."""
        X = np.array(X)
        y = np.array(y).reshape(-1, 1) if y.ndim == 1 else np.array(y)

        for epoch in range(n_epochs):
            # Forward pass
            a2 = self.forward(X)

            # Backward pass
            dW1, db1, dW2, db2 = self.backward(y)

            # Update parameters
            self.W1 -= self.learning_rate * dW1
            self.b1 -= self.learning_rate * db1
            self.W2 -= self.learning_rate * dW2
            self.b2 -= self.learning_rate * db2

        return self

    def predict(self, X):
        """Make predictions."""
        X = np.array(X)
        a2 = self.forward(X)
        return (a2 >= 0.5).astype(int)`,
    testCases: [],
    hints: [
      'Forward: X -> hidden (ReLU) -> output (sigmoid)',
      'Backward: compute gradients layer by layer',
      'Use chain rule for hidden layer gradients',
      'Update weights: W -= learning_rate * dW',
      'Cache intermediate values for backpropagation'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Batch Normalization',
    difficulty: 4,
    description: `Implement batch normalization for neural networks.

Requirements:
- Normalize: (x - mean) / sqrt(var + ε)
- Scale and shift: γ*x_norm + β
- Calculate running mean/var for inference
- Implement forward and backward pass`,
    starterCode: `import numpy as np

class BatchNormalization:
    def __init__(self, n_features, epsilon=1e-5, momentum=0.9):
        self.epsilon = epsilon
        self.momentum = momentum

        # Learnable parameters
        self.gamma = np.ones(n_features)
        self.beta = np.zeros(n_features)

        # Running statistics for inference
        self.running_mean = np.zeros(n_features)
        self.running_var = np.ones(n_features)

    def forward(self, X, training=True):
        """Forward pass."""
        # TODO: Implement forward pass
        pass

    def backward(self, dout):
        """Backward pass."""
        # TODO: Implement backward pass
        pass`,
    solution: `import numpy as np

class BatchNormalization:
    def __init__(self, n_features, epsilon=1e-5, momentum=0.9):
        self.epsilon = epsilon
        self.momentum = momentum

        # Learnable parameters
        self.gamma = np.ones(n_features)
        self.beta = np.zeros(n_features)

        # Running statistics for inference
        self.running_mean = np.zeros(n_features)
        self.running_var = np.ones(n_features)

        # Cache for backward pass
        self.cache = {}

    def forward(self, X, training=True):
        """Forward pass."""
        if training:
            # Calculate batch statistics
            batch_mean = np.mean(X, axis=0)
            batch_var = np.var(X, axis=0)

            # Normalize
            X_norm = (X - batch_mean) / np.sqrt(batch_var + self.epsilon)

            # Scale and shift
            out = self.gamma * X_norm + self.beta

            # Update running statistics
            self.running_mean = self.momentum * self.running_mean + (1 - self.momentum) * batch_mean
            self.running_var = self.momentum * self.running_var + (1 - self.momentum) * batch_var

            # Cache for backward pass
            self.cache = {
                'X': X,
                'X_norm': X_norm,
                'batch_mean': batch_mean,
                'batch_var': batch_var
            }
        else:
            # Use running statistics for inference
            X_norm = (X - self.running_mean) / np.sqrt(self.running_var + self.epsilon)
            out = self.gamma * X_norm + self.beta

        return out

    def backward(self, dout):
        """Backward pass."""
        X = self.cache['X']
        X_norm = self.cache['X_norm']
        batch_mean = self.cache['batch_mean']
        batch_var = self.cache['batch_var']

        n_samples = X.shape[0]

        # Gradients for gamma and beta
        dgamma = np.sum(dout * X_norm, axis=0)
        dbeta = np.sum(dout, axis=0)

        # Gradient for X_norm
        dX_norm = dout * self.gamma

        # Gradient for variance
        dvar = np.sum(dX_norm * (X - batch_mean) * -0.5 * (batch_var + self.epsilon) ** -1.5, axis=0)

        # Gradient for mean
        dmean = np.sum(dX_norm * -1 / np.sqrt(batch_var + self.epsilon), axis=0) + \\
                dvar * np.sum(-2 * (X - batch_mean), axis=0) / n_samples

        # Gradient for X
        dX = dX_norm / np.sqrt(batch_var + self.epsilon) + \\
             dvar * 2 * (X - batch_mean) / n_samples + \\
             dmean / n_samples

        return dX, dgamma, dbeta`,
    testCases: [],
    hints: [
      'Normalize: (x - mean) / sqrt(var + ε)',
      'Scale and shift: γ * x_norm + β',
      'Use batch statistics during training',
      'Use running statistics during inference',
      'Update running stats with momentum'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Dropout',
    difficulty: 3,
    description: `Implement dropout regularization for neural networks.

Requirements:
- Randomly set neurons to zero during training
- Scale remaining activations by 1/(1-p)
- Disable dropout during inference
- Return mask for backpropagation`,
    starterCode: `import numpy as np

class Dropout:
    def __init__(self, dropout_rate=0.5):
        self.dropout_rate = dropout_rate
        self.mask = None

    def forward(self, X, training=True):
        """Forward pass with dropout."""
        # TODO: Implement forward pass
        pass

    def backward(self, dout):
        """Backward pass with dropout."""
        # TODO: Implement backward pass
        pass`,
    solution: `import numpy as np

class Dropout:
    def __init__(self, dropout_rate=0.5):
        self.dropout_rate = dropout_rate
        self.mask = None

    def forward(self, X, training=True):
        """Forward pass with dropout."""
        if training:
            # Create dropout mask
            self.mask = np.random.rand(*X.shape) > self.dropout_rate

            # Apply mask and scale
            out = X * self.mask / (1 - self.dropout_rate)
        else:
            # No dropout during inference
            out = X

        return out

    def backward(self, dout):
        """Backward pass with dropout."""
        # Apply same mask to gradients
        dX = dout * self.mask / (1 - self.dropout_rate)
        return dX`,
    testCases: [],
    hints: [
      'Create binary mask: np.random.rand() > dropout_rate',
      'Scale by 1/(1-p) during training (inverted dropout)',
      'No dropout during inference',
      'Apply same mask during backward pass',
      'Typical dropout rates: 0.2-0.5'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Momentum Optimizer',
    difficulty: 3,
    description: `Implement momentum-based gradient descent optimization.

Requirements:
- Maintain velocity for each parameter
- Update: v = β*v + (1-β)*gradient
- Parameter update: θ = θ - α*v
- Accelerates convergence`,
    starterCode: `import numpy as np

class MomentumOptimizer:
    def __init__(self, learning_rate=0.01, momentum=0.9):
        self.learning_rate = learning_rate
        self.momentum = momentum
        self.velocities = {}

    def update(self, params, grads):
        """
        Update parameters using momentum.

        Args:
            params: Dictionary of parameters
            grads: Dictionary of gradients

        Returns:
            Updated parameters
        """
        # TODO: Implement momentum update
        pass`,
    solution: `import numpy as np

class MomentumOptimizer:
    def __init__(self, learning_rate=0.01, momentum=0.9):
        self.learning_rate = learning_rate
        self.momentum = momentum
        self.velocities = {}

    def update(self, params, grads):
        """
        Update parameters using momentum.

        Args:
            params: Dictionary of parameters
            grads: Dictionary of gradients

        Returns:
            Updated parameters
        """
        # Initialize velocities if first update
        if not self.velocities:
            for key in params:
                self.velocities[key] = np.zeros_like(params[key])

        # Update parameters
        for key in params:
            # Update velocity
            self.velocities[key] = self.momentum * self.velocities[key] + \\
                                  (1 - self.momentum) * grads[key]

            # Update parameter
            params[key] -= self.learning_rate * self.velocities[key]

        return params`,
    testCases: [],
    hints: [
      'Velocity: v = β*v + (1-β)*gradient',
      'Update: θ = θ - α*v',
      'Initialize velocities to zeros',
      'Typical momentum: 0.9 or 0.99',
      'Helps escape local minima'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Adam Optimizer',
    difficulty: 4,
    description: `Implement Adam (Adaptive Moment Estimation) optimizer.

Requirements:
- Maintain first moment (mean) and second moment (variance)
- Bias correction for moments
- Adaptive learning rate per parameter
- Combine momentum and RMSprop`,
    starterCode: `import numpy as np

class AdamOptimizer:
    def __init__(self, learning_rate=0.001, beta1=0.9, beta2=0.999, epsilon=1e-8):
        self.learning_rate = learning_rate
        self.beta1 = beta1
        self.beta2 = beta2
        self.epsilon = epsilon
        self.m = {}  # First moment
        self.v = {}  # Second moment
        self.t = 0   # Time step

    def update(self, params, grads):
        """Update parameters using Adam."""
        # TODO: Implement Adam update
        pass`,
    solution: `import numpy as np

class AdamOptimizer:
    def __init__(self, learning_rate=0.001, beta1=0.9, beta2=0.999, epsilon=1e-8):
        self.learning_rate = learning_rate
        self.beta1 = beta1
        self.beta2 = beta2
        self.epsilon = epsilon
        self.m = {}  # First moment
        self.v = {}  # Second moment
        self.t = 0   # Time step

    def update(self, params, grads):
        """Update parameters using Adam."""
        # Initialize moments if first update
        if not self.m:
            for key in params:
                self.m[key] = np.zeros_like(params[key])
                self.v[key] = np.zeros_like(params[key])

        # Increment time step
        self.t += 1

        # Update parameters
        for key in params:
            # Update biased first moment estimate
            self.m[key] = self.beta1 * self.m[key] + (1 - self.beta1) * grads[key]

            # Update biased second moment estimate
            self.v[key] = self.beta2 * self.v[key] + (1 - self.beta2) * (grads[key] ** 2)

            # Bias correction
            m_hat = self.m[key] / (1 - self.beta1 ** self.t)
            v_hat = self.v[key] / (1 - self.beta2 ** self.t)

            # Update parameter
            params[key] -= self.learning_rate * m_hat / (np.sqrt(v_hat) + self.epsilon)

        return params`,
    testCases: [],
    hints: [
      'First moment: m = β1*m + (1-β1)*gradient',
      'Second moment: v = β2*v + (1-β2)*gradient²',
      'Bias correction: m_hat = m/(1-β1^t)',
      'Update: θ = θ - α*m_hat/(√v_hat + ε)',
      'Default: β1=0.9, β2=0.999, ε=1e-8'
    ],
    language: 'python'
  },
  {
    id: 'cs402-t4-ex16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Implement Gradient Clipping',
    difficulty: 2,
    description: `Implement gradient clipping to prevent exploding gradients.

Requirements:
- Clip gradients by value
- Clip gradients by norm
- Support both methods
- Prevent exploding gradient problem`,
    starterCode: `import numpy as np

def clip_gradients(grads, method='value', threshold=1.0):
    """
    Clip gradients to prevent explosion.

    Args:
        grads: Dictionary of gradients
        method: 'value' or 'norm'
        threshold: Clipping threshold

    Returns:
        Clipped gradients
    """
    # TODO: Implement gradient clipping
    pass`,
    solution: `import numpy as np

def clip_gradients(grads, method='value', threshold=1.0):
    """
    Clip gradients to prevent explosion.

    Args:
        grads: Dictionary of gradients
        method: 'value' or 'norm'
        threshold: Clipping threshold

    Returns:
        Clipped gradients
    """
    clipped_grads = {}

    if method == 'value':
        # Clip each gradient value
        for key in grads:
            clipped_grads[key] = np.clip(grads[key], -threshold, threshold)

    elif method == 'norm':
        # Clip by global norm
        # Calculate global norm
        total_norm = 0
        for key in grads:
            total_norm += np.sum(grads[key] ** 2)
        total_norm = np.sqrt(total_norm)

        # Clip if norm exceeds threshold
        clip_coef = threshold / (total_norm + 1e-6)
        if clip_coef < 1:
            for key in grads:
                clipped_grads[key] = grads[key] * clip_coef
        else:
            clipped_grads = grads

    else:
        raise ValueError(f"Unknown clipping method: {method}")

    return clipped_grads`,
    testCases: [],
    hints: [
      'Value clipping: np.clip(grad, -threshold, threshold)',
      'Norm clipping: scale gradient if ||grad|| > threshold',
      'Global norm: sqrt(sum of all gradient squares)',
      'Clip coefficient: threshold / norm',
      'Helps with exploding gradients in RNNs'
    ],
    language: 'python'
  }
];
