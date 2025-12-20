import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs402-t5-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Basic CNN for Image Classification',
    difficulty: 3,
    description: `Build a convolutional neural network for MNIST digit classification.

Requirements:
- 2 convolutional layers with ReLU and max pooling
- 2 fully connected layers
- Softmax output for 10 classes
- Train using Adam optimizer
- Achieve >95% test accuracy`,
    starterCode: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        # Define layers
        
    def forward(self, x):
        # Implement forward pass
        pass
        
# Training loop
model = SimpleCNN()
# TODO: Implement training`,
    solution: `import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))  # 28->14
        x = self.pool(self.relu(self.conv2(x)))  # 14->7
        x = x.view(-1, 64 * 7 * 7)
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Training
model = SimpleCNN()
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(10):
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()`,
    testCases: [],
    hints: [
      'Start by defining Conv2d layers with appropriate input/output channels',
      'Use MaxPool2d after each convolutional layer to reduce spatial dimensions',
      'Flatten the output before passing to fully connected layers',
      'Use CrossEntropyLoss for multi-class classification',
      'Adam optimizer works well with learning rate around 0.001'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Calculate Convolutional Layer Output Size',
    difficulty: 1,
    description: `Calculate the output dimensions of a convolutional layer.

Requirements:
- Given input size (H, W), kernel size (K), stride (S), and padding (P)
- Apply formula: output = floor((input + 2*padding - kernel) / stride) + 1
- Handle both height and width dimensions
- Return output shape as tuple`,
    starterCode: `import numpy as np

def conv_output_size(input_size, kernel_size, stride=1, padding=0):
    """
    Calculate output size after convolution.

    Args:
        input_size: tuple (height, width)
        kernel_size: int or tuple
        stride: int or tuple
        padding: int or tuple

    Returns:
        tuple: (output_height, output_width)
    """
    # TODO: Implement
    pass

# Test
print(conv_output_size((28, 28), 3, 1, 1))  # Should output (28, 28)`,
    solution: `import numpy as np

def conv_output_size(input_size, kernel_size, stride=1, padding=0):
    """
    Calculate output size after convolution.

    Args:
        input_size: tuple (height, width)
        kernel_size: int or tuple
        stride: int or tuple
        padding: int or tuple

    Returns:
        tuple: (output_height, output_width)
    """
    h_in, w_in = input_size

    # Handle scalar values
    if isinstance(kernel_size, int):
        k_h, k_w = kernel_size, kernel_size
    else:
        k_h, k_w = kernel_size

    if isinstance(stride, int):
        s_h, s_w = stride, stride
    else:
        s_h, s_w = stride

    if isinstance(padding, int):
        p_h, p_w = padding, padding
    else:
        p_h, p_w = padding

    # Apply formula
    h_out = (h_in + 2*p_h - k_h) // s_h + 1
    w_out = (w_in + 2*p_w - k_w) // s_w + 1

    return (h_out, w_out)

# Test
print(conv_output_size((28, 28), 3, 1, 1))  # (28, 28)
print(conv_output_size((32, 32), 5, 2, 0))  # (14, 14)`,
    testCases: [],
    hints: [
      'Use the formula: output = (input + 2*padding - kernel) / stride + 1',
      'Handle both scalar and tuple inputs for kernel, stride, and padding',
      'Use integer division (//) to get the floor of the result',
      'Apply the formula independently to height and width',
      'Common case: same padding (padding=k//2) keeps dimensions the same with stride=1'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Max Pooling Layer',
    difficulty: 2,
    description: `Implement 2D max pooling from scratch.

Requirements:
- Apply max pooling with specified pool size and stride
- Handle batch and channel dimensions
- Return pooled output and optionally indices for unpooling
- Support both overlapping and non-overlapping pooling`,
    starterCode: `import numpy as np

def max_pool2d(x, pool_size=2, stride=None):
    """
    Apply 2D max pooling.

    Args:
        x: input tensor (batch, channels, height, width)
        pool_size: size of pooling window
        stride: stride (defaults to pool_size)

    Returns:
        pooled output
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def max_pool2d(x, pool_size=2, stride=None):
    """
    Apply 2D max pooling.

    Args:
        x: input tensor (batch, channels, height, width)
        pool_size: size of pooling window
        stride: stride (defaults to pool_size)

    Returns:
        pooled output
    """
    if stride is None:
        stride = pool_size

    batch, channels, h_in, w_in = x.shape

    # Calculate output dimensions
    h_out = (h_in - pool_size) // stride + 1
    w_out = (w_in - pool_size) // stride + 1

    # Initialize output
    output = np.zeros((batch, channels, h_out, w_out))

    # Apply max pooling
    for b in range(batch):
        for c in range(channels):
            for i in range(h_out):
                for j in range(w_out):
                    h_start = i * stride
                    w_start = j * stride
                    h_end = h_start + pool_size
                    w_end = w_start + pool_size

                    window = x[b, c, h_start:h_end, w_start:w_end]
                    output[b, c, i, j] = np.max(window)

    return output`,
    testCases: [],
    hints: [
      'Calculate output dimensions based on pool size and stride',
      'Use nested loops to iterate over output positions',
      'Extract the pooling window using slicing',
      'Apply np.max to the window to get the maximum value',
      'Handle all batch and channel dimensions'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-4',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Build Simple RNN Cell',
    difficulty: 3,
    description: `Implement a basic RNN cell from scratch.

Requirements:
- Implement forward pass: h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b)
- Initialize weights randomly
- Process a sequence of inputs
- Return all hidden states
- Support batch processing`,
    starterCode: `import numpy as np

class RNNCell:
    def __init__(self, input_size, hidden_size):
        self.input_size = input_size
        self.hidden_size = hidden_size
        # Initialize weights

    def forward(self, x, h_prev):
        """
        Forward pass for one time step.

        Args:
            x: input (batch, input_size)
            h_prev: previous hidden state (batch, hidden_size)

        Returns:
            h_next: next hidden state
        """
        # TODO: Implement
        pass

    def forward_sequence(self, x_seq):
        """Process entire sequence."""
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class RNNCell:
    def __init__(self, input_size, hidden_size):
        self.input_size = input_size
        self.hidden_size = hidden_size

        # Initialize weights with Xavier initialization
        self.W_xh = np.random.randn(input_size, hidden_size) * np.sqrt(2.0 / (input_size + hidden_size))
        self.W_hh = np.random.randn(hidden_size, hidden_size) * np.sqrt(2.0 / (hidden_size + hidden_size))
        self.b = np.zeros(hidden_size)

    def forward(self, x, h_prev):
        """
        Forward pass for one time step.

        Args:
            x: input (batch, input_size)
            h_prev: previous hidden state (batch, hidden_size)

        Returns:
            h_next: next hidden state
        """
        h_next = np.tanh(x @ self.W_xh + h_prev @ self.W_hh + self.b)
        return h_next

    def forward_sequence(self, x_seq):
        """
        Process entire sequence.

        Args:
            x_seq: input sequence (batch, seq_len, input_size)

        Returns:
            h_seq: all hidden states (batch, seq_len, hidden_size)
        """
        batch_size, seq_len, _ = x_seq.shape
        h = np.zeros((batch_size, self.hidden_size))
        h_seq = []

        for t in range(seq_len):
            h = self.forward(x_seq[:, t, :], h)
            h_seq.append(h)

        return np.stack(h_seq, axis=1)`,
    testCases: [],
    hints: [
      'Use Xavier initialization for weights: scale by sqrt(2/(fan_in+fan_out))',
      'The hidden state is computed as: h = tanh(x*W_xh + h*W_hh + b)',
      'Use @ operator for matrix multiplication',
      'For sequences, iterate through time steps maintaining hidden state',
      'Stack all hidden states to create output sequence'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-5',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement LSTM Gates',
    difficulty: 4,
    description: `Implement LSTM cell with all four gates.

Requirements:
- Forget gate: f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)
- Input gate: i_t = sigmoid(W_i * [h_{t-1}, x_t] + b_i)
- Cell candidate: c_tilde = tanh(W_c * [h_{t-1}, x_t] + b_c)
- Output gate: o_t = sigmoid(W_o * [h_{t-1}, x_t] + b_o)
- Update cell state and hidden state`,
    starterCode: `import numpy as np

class LSTMCell:
    def __init__(self, input_size, hidden_size):
        # Initialize weights for all gates
        pass

    def forward(self, x, h_prev, c_prev):
        """
        LSTM forward pass.

        Args:
            x: input (batch, input_size)
            h_prev: previous hidden state
            c_prev: previous cell state

        Returns:
            h_next, c_next: next hidden and cell states
        """
        # TODO: Implement all gates
        pass`,
    solution: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

class LSTMCell:
    def __init__(self, input_size, hidden_size):
        self.input_size = input_size
        self.hidden_size = hidden_size

        # Combined input size
        combined_size = input_size + hidden_size
        scale = np.sqrt(2.0 / (combined_size + hidden_size))

        # Initialize weights for all gates
        self.W_f = np.random.randn(combined_size, hidden_size) * scale
        self.b_f = np.ones(hidden_size)  # Forget gate bias to 1

        self.W_i = np.random.randn(combined_size, hidden_size) * scale
        self.b_i = np.zeros(hidden_size)

        self.W_c = np.random.randn(combined_size, hidden_size) * scale
        self.b_c = np.zeros(hidden_size)

        self.W_o = np.random.randn(combined_size, hidden_size) * scale
        self.b_o = np.zeros(hidden_size)

    def forward(self, x, h_prev, c_prev):
        """
        LSTM forward pass.

        Args:
            x: input (batch, input_size)
            h_prev: previous hidden state
            c_prev: previous cell state

        Returns:
            h_next, c_next: next hidden and cell states
        """
        # Concatenate input and hidden state
        combined = np.concatenate([h_prev, x], axis=1)

        # Forget gate
        f_t = sigmoid(combined @ self.W_f + self.b_f)

        # Input gate
        i_t = sigmoid(combined @ self.W_i + self.b_i)

        # Cell candidate
        c_tilde = np.tanh(combined @ self.W_c + self.b_c)

        # Output gate
        o_t = sigmoid(combined @ self.W_o + self.b_o)

        # Update cell state
        c_next = f_t * c_prev + i_t * c_tilde

        # Update hidden state
        h_next = o_t * np.tanh(c_next)

        return h_next, c_next`,
    testCases: [],
    hints: [
      'Concatenate h_prev and x before computing gates',
      'Initialize forget gate bias to 1 to avoid vanishing gradients initially',
      'Use sigmoid activation for all gates (forget, input, output)',
      'Use tanh for cell candidate and final cell state activation',
      'Cell state: c_t = f_t * c_{t-1} + i_t * c_tilde',
      'Hidden state: h_t = o_t * tanh(c_t)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-6',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Attention Mechanism',
    difficulty: 4,
    description: `Build basic attention mechanism (Bahdanau-style).

Requirements:
- Compute attention scores: score(h_t, h_s) = v^T * tanh(W1*h_t + W2*h_s)
- Apply softmax to get attention weights
- Compute context vector as weighted sum
- Return attention weights and context`,
    starterCode: `import numpy as np

class Attention:
    def __init__(self, hidden_size):
        # Initialize weight matrices
        pass

    def forward(self, query, keys, values):
        """
        Apply attention mechanism.

        Args:
            query: decoder hidden state (batch, hidden_size)
            keys: encoder hidden states (batch, seq_len, hidden_size)
            values: encoder hidden states (batch, seq_len, hidden_size)

        Returns:
            context: weighted context vector
            weights: attention weights
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

def softmax(x, axis=-1):
    exp_x = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return exp_x / np.sum(exp_x, axis=axis, keepdims=True)

class Attention:
    def __init__(self, hidden_size):
        self.hidden_size = hidden_size

        # Initialize weight matrices
        scale = np.sqrt(2.0 / hidden_size)
        self.W1 = np.random.randn(hidden_size, hidden_size) * scale
        self.W2 = np.random.randn(hidden_size, hidden_size) * scale
        self.v = np.random.randn(hidden_size) * scale

    def forward(self, query, keys, values):
        """
        Apply attention mechanism.

        Args:
            query: decoder hidden state (batch, hidden_size)
            keys: encoder hidden states (batch, seq_len, hidden_size)
            values: encoder hidden states (batch, seq_len, hidden_size)

        Returns:
            context: weighted context vector
            weights: attention weights
        """
        batch_size, seq_len, _ = keys.shape

        # Expand query for broadcasting
        query_expanded = query[:, np.newaxis, :]  # (batch, 1, hidden)

        # Compute scores: v^T * tanh(W1*query + W2*keys)
        # query: (batch, 1, hidden) @ W1: (hidden, hidden) -> (batch, 1, hidden)
        # keys: (batch, seq_len, hidden) @ W2: (hidden, hidden) -> (batch, seq_len, hidden)
        query_proj = query_expanded @ self.W1
        keys_proj = keys @ self.W2

        # Add and apply tanh
        combined = np.tanh(query_proj + keys_proj)  # (batch, seq_len, hidden)

        # Apply v to get scores
        scores = combined @ self.v  # (batch, seq_len)

        # Compute attention weights
        weights = softmax(scores, axis=1)  # (batch, seq_len)

        # Compute context vector
        weights_expanded = weights[:, :, np.newaxis]  # (batch, seq_len, 1)
        context = np.sum(weights_expanded * values, axis=1)  # (batch, hidden)

        return context, weights`,
    testCases: [],
    hints: [
      'Expand query dimension to enable broadcasting with keys',
      'Project both query and keys with their respective weight matrices',
      'Apply tanh activation after combining projections',
      'Multiply by v vector to get scalar scores for each position',
      'Use softmax to convert scores to attention weights',
      'Compute context as weighted sum of values'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-7',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Build Multi-Head Attention',
    difficulty: 5,
    description: `Implement multi-head self-attention (as in Transformers).

Requirements:
- Split input into multiple attention heads
- Apply scaled dot-product attention per head
- Concatenate heads and apply output projection
- Support masking for decoder self-attention`,
    starterCode: `import numpy as np

class MultiHeadAttention:
    def __init__(self, d_model, num_heads):
        self.d_model = d_model
        self.num_heads = num_heads
        # Initialize weights

    def forward(self, query, key, value, mask=None):
        """
        Multi-head attention.

        Args:
            query, key, value: input tensors (batch, seq_len, d_model)
            mask: optional mask (batch, seq_len, seq_len)

        Returns:
            output: (batch, seq_len, d_model)
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

def softmax(x, axis=-1):
    exp_x = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return exp_x / np.sum(exp_x, axis=axis, keepdims=True)

class MultiHeadAttention:
    def __init__(self, d_model, num_heads):
        assert d_model % num_heads == 0
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        # Initialize weight matrices
        scale = np.sqrt(2.0 / d_model)
        self.W_q = np.random.randn(d_model, d_model) * scale
        self.W_k = np.random.randn(d_model, d_model) * scale
        self.W_v = np.random.randn(d_model, d_model) * scale
        self.W_o = np.random.randn(d_model, d_model) * scale

    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        """
        Compute scaled dot-product attention.

        Args:
            Q, K, V: (batch, num_heads, seq_len, d_k)
            mask: (batch, 1, seq_len, seq_len)
        """
        # Compute attention scores
        scores = Q @ K.transpose(0, 1, 3, 2) / np.sqrt(self.d_k)

        # Apply mask if provided
        if mask is not None:
            scores = scores + (mask * -1e9)

        # Apply softmax
        attn_weights = softmax(scores, axis=-1)

        # Apply attention to values
        output = attn_weights @ V

        return output

    def forward(self, query, key, value, mask=None):
        """
        Multi-head attention.

        Args:
            query, key, value: input tensors (batch, seq_len, d_model)
            mask: optional mask (batch, seq_len, seq_len)

        Returns:
            output: (batch, seq_len, d_model)
        """
        batch_size, seq_len, _ = query.shape

        # Linear projections
        Q = query @ self.W_q  # (batch, seq_len, d_model)
        K = key @ self.W_k
        V = value @ self.W_v

        # Reshape for multi-head: (batch, seq_len, num_heads, d_k)
        Q = Q.reshape(batch_size, seq_len, self.num_heads, self.d_k)
        K = K.reshape(batch_size, seq_len, self.num_heads, self.d_k)
        V = V.reshape(batch_size, seq_len, self.num_heads, self.d_k)

        # Transpose to (batch, num_heads, seq_len, d_k)
        Q = Q.transpose(0, 2, 1, 3)
        K = K.transpose(0, 2, 1, 3)
        V = V.transpose(0, 2, 1, 3)

        # Apply attention
        if mask is not None:
            mask = mask[:, np.newaxis, :, :]  # Add head dimension

        attn_output = self.scaled_dot_product_attention(Q, K, V, mask)

        # Concatenate heads: (batch, seq_len, d_model)
        attn_output = attn_output.transpose(0, 2, 1, 3)
        attn_output = attn_output.reshape(batch_size, seq_len, self.d_model)

        # Final linear projection
        output = attn_output @ self.W_o

        return output`,
    testCases: [],
    hints: [
      'Project Q, K, V using learned weight matrices',
      'Split d_model into num_heads, each with dimension d_k = d_model/num_heads',
      'Reshape and transpose to get (batch, num_heads, seq_len, d_k)',
      'Compute scaled dot-product: softmax(Q*K^T/sqrt(d_k))*V',
      'Apply mask before softmax by adding large negative values',
      'Concatenate heads and apply final linear projection'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-8',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Positional Encoding',
    difficulty: 2,
    description: `Create positional encoding for Transformer models.

Requirements:
- Use sinusoidal functions: PE(pos, 2i) = sin(pos/10000^(2i/d_model))
- Even dimensions use sine, odd dimensions use cosine
- Support variable sequence lengths
- Return encoding matrix of shape (seq_len, d_model)`,
    starterCode: `import numpy as np

def positional_encoding(seq_len, d_model):
    """
    Generate positional encoding.

    Args:
        seq_len: sequence length
        d_model: model dimension

    Returns:
        pe: positional encoding (seq_len, d_model)
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def positional_encoding(seq_len, d_model):
    """
    Generate positional encoding.

    Args:
        seq_len: sequence length
        d_model: model dimension

    Returns:
        pe: positional encoding (seq_len, d_model)
    """
    # Initialize matrix
    pe = np.zeros((seq_len, d_model))

    # Create position indices
    position = np.arange(seq_len)[:, np.newaxis]  # (seq_len, 1)

    # Create dimension indices
    div_term = np.exp(np.arange(0, d_model, 2) * -(np.log(10000.0) / d_model))

    # Apply sine to even indices
    pe[:, 0::2] = np.sin(position * div_term)

    # Apply cosine to odd indices
    pe[:, 1::2] = np.cos(position * div_term)

    return pe`,
    testCases: [],
    hints: [
      'Create position array from 0 to seq_len-1',
      'Compute division term: 10000^(2i/d_model) for each dimension pair',
      'Use np.arange(0, d_model, 2) to get even dimension indices',
      'Apply sin to even dimensions: PE[:, 0::2]',
      'Apply cos to odd dimensions: PE[:, 1::2]',
      'Use broadcasting to compute all positions at once'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-9',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Build Transformer Encoder Block',
    difficulty: 4,
    description: `Implement a complete Transformer encoder block.

Requirements:
- Multi-head self-attention with residual connection and layer norm
- Position-wise feed-forward network (two linear layers with ReLU)
- Residual connections after each sublayer
- Layer normalization after residual connections`,
    starterCode: `import torch
import torch.nn as nn

class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super().__init__()
        # Initialize layers

    def forward(self, x, mask=None):
        # TODO: Implement
        pass`,
    solution: `import torch
import torch.nn as nn

class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super().__init__()

        # Multi-head attention
        self.attention = nn.MultiheadAttention(d_model, num_heads, dropout=dropout, batch_first=True)

        # Feed-forward network
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model)
        )

        # Layer normalization
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)

        # Dropout
        self.dropout1 = nn.Dropout(dropout)
        self.dropout2 = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        """
        Forward pass.

        Args:
            x: input (batch, seq_len, d_model)
            mask: attention mask (seq_len, seq_len)

        Returns:
            output (batch, seq_len, d_model)
        """
        # Multi-head attention with residual
        attn_output, _ = self.attention(x, x, x, attn_mask=mask)
        x = self.norm1(x + self.dropout1(attn_output))

        # Feed-forward with residual
        ffn_output = self.ffn(x)
        x = self.norm2(x + self.dropout2(ffn_output))

        return x`,
    testCases: [],
    hints: [
      'Use nn.MultiheadAttention with batch_first=True',
      'Feed-forward network: Linear -> ReLU -> Dropout -> Linear',
      'Apply residual connection: output = norm(x + sublayer(x))',
      'Use LayerNorm after each residual connection',
      'Typical d_ff is 4 times d_model (e.g., 2048 for d_model=512)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Batch Normalization',
    difficulty: 2,
    description: `Build batch normalization layer from scratch.

Requirements:
- Normalize across batch dimension: (x - mean) / sqrt(var + epsilon)
- Support training and inference modes
- Include learnable scale (gamma) and shift (beta) parameters
- Track running statistics for inference`,
    starterCode: `import numpy as np

class BatchNorm1d:
    def __init__(self, num_features, eps=1e-5, momentum=0.1):
        self.num_features = num_features
        self.eps = eps
        self.momentum = momentum
        # Initialize parameters

    def forward(self, x, training=True):
        """
        Apply batch normalization.

        Args:
            x: input (batch, features)
            training: whether in training mode

        Returns:
            normalized output
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class BatchNorm1d:
    def __init__(self, num_features, eps=1e-5, momentum=0.1):
        self.num_features = num_features
        self.eps = eps
        self.momentum = momentum

        # Learnable parameters
        self.gamma = np.ones(num_features)
        self.beta = np.zeros(num_features)

        # Running statistics
        self.running_mean = np.zeros(num_features)
        self.running_var = np.ones(num_features)

    def forward(self, x, training=True):
        """
        Apply batch normalization.

        Args:
            x: input (batch, features)
            training: whether in training mode

        Returns:
            normalized output
        """
        if training:
            # Compute batch statistics
            batch_mean = np.mean(x, axis=0)
            batch_var = np.var(x, axis=0)

            # Normalize
            x_norm = (x - batch_mean) / np.sqrt(batch_var + self.eps)

            # Update running statistics
            self.running_mean = (1 - self.momentum) * self.running_mean + self.momentum * batch_mean
            self.running_var = (1 - self.momentum) * self.running_var + self.momentum * batch_var
        else:
            # Use running statistics
            x_norm = (x - self.running_mean) / np.sqrt(self.running_var + self.eps)

        # Scale and shift
        output = self.gamma * x_norm + self.beta

        return output`,
    testCases: [],
    hints: [
      'Compute mean and variance across batch dimension (axis=0)',
      'Normalize: (x - mean) / sqrt(var + eps)',
      'Apply learnable affine transformation: gamma * x_norm + beta',
      'Update running statistics with exponential moving average',
      'Use running statistics during inference, batch statistics during training'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Dropout Layer',
    difficulty: 1,
    description: `Create dropout regularization from scratch.

Requirements:
- Randomly drop neurons with probability p during training
- Scale remaining activations by 1/(1-p)
- Keep all neurons during inference
- Support different dropout rates`,
    starterCode: `import numpy as np

class Dropout:
    def __init__(self, p=0.5):
        self.p = p

    def forward(self, x, training=True):
        """
        Apply dropout.

        Args:
            x: input tensor
            training: whether in training mode

        Returns:
            output with dropout applied
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class Dropout:
    def __init__(self, p=0.5):
        self.p = p
        self.mask = None

    def forward(self, x, training=True):
        """
        Apply dropout.

        Args:
            x: input tensor
            training: whether in training mode

        Returns:
            output with dropout applied
        """
        if training:
            # Create dropout mask
            self.mask = np.random.binomial(1, 1 - self.p, size=x.shape)

            # Apply mask and scale
            output = x * self.mask / (1 - self.p)
        else:
            # No dropout during inference
            output = x

        return output`,
    testCases: [],
    hints: [
      'Use np.random.binomial to create binary mask with probability (1-p)',
      'Multiply input by mask to drop neurons',
      'Scale by 1/(1-p) to maintain expected value',
      'During inference, return input unchanged',
      'Store mask for potential use in backward pass'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Build ResNet Residual Block',
    difficulty: 3,
    description: `Implement a ResNet residual block with skip connection.

Requirements:
- Two convolutional layers with batch norm and ReLU
- Skip connection that adds input to output
- Handle dimension mismatch with 1x1 convolution
- Support stride for downsampling`,
    starterCode: `import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super().__init__()
        # Define layers

    def forward(self, x):
        # TODO: Implement
        pass`,
    solution: `import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super().__init__()

        # Main path
        self.conv1 = nn.Conv2d(in_channels, out_channels,
                               kernel_size=3, stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU(inplace=True)

        self.conv2 = nn.Conv2d(out_channels, out_channels,
                               kernel_size=3, stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)

        # Skip connection
        self.skip = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.skip = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1,
                         stride=stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )

    def forward(self, x):
        """
        Forward pass.

        Args:
            x: input (batch, channels, height, width)

        Returns:
            output with residual connection
        """
        identity = x

        # Main path
        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)

        out = self.conv2(out)
        out = self.bn2(out)

        # Add skip connection
        out += self.skip(identity)
        out = self.relu(out)

        return out`,
    testCases: [],
    hints: [
      'Use Conv2d -> BatchNorm2d -> ReLU pattern',
      'Apply stride in first convolution for downsampling',
      'Use 1x1 convolution in skip connection when dimensions change',
      'Add skip connection before final ReLU activation',
      'Set bias=False in convolutions when using batch norm'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Transfer Learning',
    difficulty: 3,
    description: `Fine-tune a pre-trained CNN for new classification task.

Requirements:
- Load pre-trained ResNet model
- Freeze early layers (feature extraction)
- Replace final layer for new classes
- Train only the new classifier
- Compare with training from scratch`,
    starterCode: `import torch
import torch.nn as nn
from torchvision import models

def setup_transfer_learning(num_classes, freeze_features=True):
    """
    Setup model for transfer learning.

    Args:
        num_classes: number of classes in new task
        freeze_features: whether to freeze feature layers

    Returns:
        model ready for transfer learning
    """
    # TODO: Implement
    pass`,
    solution: `import torch
import torch.nn as nn
from torchvision import models

def setup_transfer_learning(num_classes, freeze_features=True):
    """
    Setup model for transfer learning.

    Args:
        num_classes: number of classes in new task
        freeze_features: whether to freeze feature layers

    Returns:
        model ready for transfer learning
    """
    # Load pre-trained ResNet
    model = models.resnet18(pretrained=True)

    # Freeze feature extraction layers
    if freeze_features:
        for param in model.parameters():
            param.requires_grad = False

    # Replace final layer
    num_features = model.fc.in_features
    model.fc = nn.Linear(num_features, num_classes)

    return model

# Example usage
model = setup_transfer_learning(num_classes=10, freeze_features=True)

# Create optimizer that only updates classifier
optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=0.001
)

# Training loop (simplified)
criterion = nn.CrossEntropyLoss()
for epoch in range(10):
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()`,
    testCases: [],
    hints: [
      'Use torchvision.models to load pre-trained models',
      'Set requires_grad=False to freeze parameters',
      'Replace model.fc (final layer) with new Linear layer',
      'Use filter(lambda p: p.requires_grad) to get trainable parameters',
      'Transfer learning typically uses lower learning rate'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement GRU Cell',
    difficulty: 3,
    description: `Build Gated Recurrent Unit (GRU) cell from scratch.

Requirements:
- Reset gate: r_t = sigmoid(W_r * [h_{t-1}, x_t])
- Update gate: z_t = sigmoid(W_z * [h_{t-1}, x_t])
- Candidate: h_tilde = tanh(W_h * [r_t * h_{t-1}, x_t])
- Final state: h_t = (1 - z_t) * h_{t-1} + z_t * h_tilde`,
    starterCode: `import numpy as np

class GRUCell:
    def __init__(self, input_size, hidden_size):
        # Initialize weights
        pass

    def forward(self, x, h_prev):
        """
        GRU forward pass.

        Args:
            x: input (batch, input_size)
            h_prev: previous hidden state

        Returns:
            h_next: next hidden state
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

class GRUCell:
    def __init__(self, input_size, hidden_size):
        self.input_size = input_size
        self.hidden_size = hidden_size

        combined_size = input_size + hidden_size
        scale = np.sqrt(2.0 / (combined_size + hidden_size))

        # Initialize weights
        self.W_r = np.random.randn(combined_size, hidden_size) * scale
        self.b_r = np.zeros(hidden_size)

        self.W_z = np.random.randn(combined_size, hidden_size) * scale
        self.b_z = np.zeros(hidden_size)

        self.W_h = np.random.randn(combined_size, hidden_size) * scale
        self.b_h = np.zeros(hidden_size)

    def forward(self, x, h_prev):
        """
        GRU forward pass.

        Args:
            x: input (batch, input_size)
            h_prev: previous hidden state (batch, hidden_size)

        Returns:
            h_next: next hidden state
        """
        # Concatenate input and hidden
        combined = np.concatenate([h_prev, x], axis=1)

        # Reset gate
        r_t = sigmoid(combined @ self.W_r + self.b_r)

        # Update gate
        z_t = sigmoid(combined @ self.W_z + self.b_z)

        # Candidate hidden state
        combined_reset = np.concatenate([r_t * h_prev, x], axis=1)
        h_tilde = np.tanh(combined_reset @ self.W_h + self.b_h)

        # Final hidden state
        h_next = (1 - z_t) * h_prev + z_t * h_tilde

        return h_next`,
    testCases: [],
    hints: [
      'GRU has fewer parameters than LSTM (no separate cell state)',
      'Reset gate controls how much past information to forget',
      'Update gate decides between keeping old state or using new candidate',
      'Apply reset gate before computing candidate state',
      'Final state is interpolation between previous and candidate states'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Build Seq2Seq with Attention',
    difficulty: 5,
    description: `Implement sequence-to-sequence model with attention mechanism.

Requirements:
- LSTM-based encoder that processes input sequence
- LSTM-based decoder with attention over encoder outputs
- Attention mechanism to compute context vector at each step
- Teacher forcing during training
- Beam search for inference`,
    starterCode: `import torch
import torch.nn as nn

class Seq2SeqAttention(nn.Module):
    def __init__(self, vocab_size, embed_size, hidden_size):
        super().__init__()
        # Define encoder, decoder, attention

    def forward(self, src, tgt, teacher_forcing_ratio=0.5):
        # TODO: Implement
        pass`,
    solution: `import torch
import torch.nn as nn
import random

class Encoder(nn.Module):
    def __init__(self, vocab_size, embed_size, hidden_size):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_size)
        self.lstm = nn.LSTM(embed_size, hidden_size, batch_first=True)

    def forward(self, src):
        embedded = self.embedding(src)
        outputs, (hidden, cell) = self.lstm(embedded)
        return outputs, hidden, cell

class Attention(nn.Module):
    def __init__(self, hidden_size):
        super().__init__()
        self.attn = nn.Linear(hidden_size * 2, hidden_size)
        self.v = nn.Linear(hidden_size, 1, bias=False)

    def forward(self, hidden, encoder_outputs):
        # hidden: (1, batch, hidden)
        # encoder_outputs: (batch, seq_len, hidden)
        batch_size = encoder_outputs.shape[0]
        seq_len = encoder_outputs.shape[1]

        hidden = hidden.repeat(seq_len, 1, 1).transpose(0, 1)
        energy = torch.tanh(self.attn(torch.cat((hidden, encoder_outputs), dim=2)))
        attention = self.v(energy).squeeze(2)
        return torch.softmax(attention, dim=1)

class Decoder(nn.Module):
    def __init__(self, vocab_size, embed_size, hidden_size):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_size)
        self.attention = Attention(hidden_size)
        self.lstm = nn.LSTM(embed_size + hidden_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, vocab_size)

    def forward(self, input, hidden, cell, encoder_outputs):
        input = input.unsqueeze(1)  # (batch, 1)
        embedded = self.embedding(input)  # (batch, 1, embed)

        attn_weights = self.attention(hidden, encoder_outputs)
        attn_weights = attn_weights.unsqueeze(1)
        context = torch.bmm(attn_weights, encoder_outputs)

        lstm_input = torch.cat((embedded, context), dim=2)
        output, (hidden, cell) = self.lstm(lstm_input, (hidden, cell))

        prediction = self.fc(output.squeeze(1))
        return prediction, hidden, cell

class Seq2SeqAttention(nn.Module):
    def __init__(self, vocab_size, embed_size, hidden_size):
        super().__init__()
        self.encoder = Encoder(vocab_size, embed_size, hidden_size)
        self.decoder = Decoder(vocab_size, embed_size, hidden_size)

    def forward(self, src, tgt, teacher_forcing_ratio=0.5):
        batch_size = src.shape[0]
        tgt_len = tgt.shape[1]
        vocab_size = self.decoder.fc.out_features

        outputs = torch.zeros(batch_size, tgt_len, vocab_size).to(src.device)
        encoder_outputs, hidden, cell = self.encoder(src)

        input = tgt[:, 0]
        for t in range(1, tgt_len):
            output, hidden, cell = self.decoder(input, hidden, cell, encoder_outputs)
            outputs[:, t] = output

            teacher_force = random.random() < teacher_forcing_ratio
            top1 = output.argmax(1)
            input = tgt[:, t] if teacher_force else top1

        return outputs`,
    testCases: [],
    hints: [
      'Encoder processes entire source sequence and returns all outputs',
      'Decoder generates one token at a time using attention',
      'Compute attention weights over all encoder outputs',
      'Context vector is weighted sum of encoder outputs',
      'Use teacher forcing: feed ground truth instead of prediction during training',
      'For inference, use greedy decoding or beam search'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-5-16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Implement Data Augmentation for Images',
    difficulty: 2,
    description: `Create custom data augmentation pipeline for image classification.

Requirements:
- Random horizontal flip
- Random rotation (-15 to +15 degrees)
- Random crop and resize
- Color jittering (brightness, contrast, saturation)
- Normalization with ImageNet statistics`,
    starterCode: `import torch
from torchvision import transforms

def create_augmentation_pipeline(train=True):
    """
    Create data augmentation pipeline.

    Args:
        train: whether for training (augment) or validation (no augment)

    Returns:
        transforms.Compose pipeline
    """
    # TODO: Implement
    pass`,
    solution: `import torch
from torchvision import transforms

def create_augmentation_pipeline(train=True):
    """
    Create data augmentation pipeline.

    Args:
        train: whether for training (augment) or validation (no augment)

    Returns:
        transforms.Compose pipeline
    """
    # ImageNet statistics
    mean = [0.485, 0.456, 0.406]
    std = [0.229, 0.224, 0.225]

    if train:
        # Training pipeline with augmentation
        pipeline = transforms.Compose([
            transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
            transforms.RandomHorizontalFlip(p=0.5),
            transforms.RandomRotation(degrees=15),
            transforms.ColorJitter(
                brightness=0.2,
                contrast=0.2,
                saturation=0.2,
                hue=0.1
            ),
            transforms.ToTensor(),
            transforms.Normalize(mean=mean, std=std),
            transforms.RandomErasing(p=0.3)  # Random erasing augmentation
        ])
    else:
        # Validation pipeline without augmentation
        pipeline = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=mean, std=std)
        ])

    return pipeline

# Usage example
train_transform = create_augmentation_pipeline(train=True)
val_transform = create_augmentation_pipeline(train=False)

# Apply to dataset
from torchvision.datasets import ImageFolder
train_dataset = ImageFolder(root='train/', transform=train_transform)
val_dataset = ImageFolder(root='val/', transform=val_transform)`,
    testCases: [],
    hints: [
      'Use transforms.Compose to chain multiple transformations',
      'RandomResizedCrop combines random crop and resize',
      'Set probability p for random transformations',
      'Apply ColorJitter before ToTensor for efficiency',
      'Always normalize as the last step (after ToTensor)',
      'No augmentation for validation, only resize and center crop'
    ],
    language: 'python'
  }
];
