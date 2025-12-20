# Recurrent Neural Networks (RNNs)

Recurrent Neural Networks represent a fundamental approach to processing sequential data, from time series and speech to natural language. Unlike feedforward networks that process inputs independently, RNNs maintain hidden state across time steps, enabling them to capture temporal dependencies and context.

## Sequential Data and the Need for Recurrence

Sequential data appears throughout real-world applications: stock prices over time, sensor readings from IoT devices, audio waveforms, text documents, and video frames. These sequences have critical temporal structure—the order matters, and past events influence future ones.

### Why Feedforward Networks Fail for Sequences

A standard feedforward neural network processes each input independently. Given a sequence of words "The cat sat on the mat," a feedforward network would analyze each word in isolation, unable to understand that "sat" refers to the cat or that "the mat" specifies where the sitting occurred.

You might consider providing a fixed window of context—feeding the network the current word plus the previous three words. This partially addresses the problem but has severe limitations:

**Fixed Context Length**: How many previous words matter? For some tasks, context from 100 words back matters. A fixed window cannot adapt to variable-length dependencies.

**Parameter Explosion**: Including more context multiplies parameters. If each word is represented as a 300-dimensional embedding, a window of 10 words requires 3,000 input dimensions. Each hidden layer neuron connects to all 3,000, creating millions of parameters.

**No Generalization Across Positions**: Patterns that appear at different positions require separate learning. The relationship between "the" and "cat" would be learned independently for position 1→2, position 5→6, etc.

### The Recurrent Solution

Recurrent neural networks solve these problems by introducing loops in the network, allowing information to persist across time steps. The same network with the same parameters processes each element of the sequence, maintaining a hidden state that summarizes previous inputs.

The fundamental RNN equation:
```
h_t = tanh(W_hh × h_{t-1} + W_xh × x_t + b_h)
y_t = W_hy × h_t + b_y
```

Where:
- x_t is the input at time t
- h_t is the hidden state at time t
- y_t is the output at time t
- W_hh, W_xh, W_hy are weight matrices
- b_h, b_y are bias vectors

At each time step, the network combines the current input with the previous hidden state, applies a nonlinearity (tanh), and produces both an output and a new hidden state that feeds into the next time step.

### The Power of Shared Parameters

RNNs share the same parameters W_hh, W_xh, W_hy across all time steps. This parameter sharing provides crucial advantages:

**Fixed Parameter Count**: Regardless of sequence length, the number of parameters remains constant. Processing a 10-word sentence uses the same parameters as a 100-word sentence.

**Generalization Across Time**: Patterns learned at one position transfer to all positions. Understanding subject-verb agreement works equally well at the start, middle, or end of a sentence.

**Variable-Length Input**: Unlike fixed-size networks, RNNs naturally handle sequences of any length. The same network processes short tweets and long documents.

## Understanding RNN Dynamics

To truly understand RNNs, we must visualize their operation across time and appreciate how they propagate information.

### Unrolling Through Time

Although RNNs have cyclic connections, we can "unroll" them across time steps for conceptual clarity and computational implementation. The unrolled view shows the RNN as a very deep feedforward network where layers correspond to time steps:

```
x_0 → [RNN] → h_0 → [RNN] → h_1 → [RNN] → h_2 → ...
         ↓             ↓             ↓
        y_0           y_1           y_2
```

Each [RNN] block is the same network with shared parameters, but operating at different time steps. Information flows both horizontally (through hidden states) and vertically (from inputs to outputs).

This unrolled perspective reveals why RNNs are powerful: they're effectively very deep networks, with depth equal to sequence length. A 100-word sentence creates a 100-layer deep network.

### Types of RNN Architectures

RNNs support various input-output relationships:

**One-to-Many**: Single input, sequence output. Example: Image captioning (image → word sequence)
```
Image → [RNN] → [RNN] → [RNN] → ...
          ↓       ↓       ↓
        word1   word2   word3
```

**Many-to-One**: Sequence input, single output. Example: Sentiment classification (review → positive/negative)
```
word1 → [RNN] → [RNN] → [RNN] → Sentiment
word2 ────────→ [RNN] → [RNN]
word3 ──────────────→ [RNN]
```

**Many-to-Many (Aligned)**: Sequence input and output, synchronized. Example: Part-of-speech tagging (word → tag)
```
word1 → [RNN] → tag1
word2 → [RNN] → tag2
word3 → [RNN] → tag3
```

**Many-to-Many (Unaligned)**: Sequence input and output, different lengths. Example: Machine translation (English → French)
```
Encoder: English words → [RNN] → [RNN] → context
Decoder: context → [RNN] → [RNN] → French words
```

This flexibility makes RNNs applicable to diverse sequential tasks.

### Bidirectional RNNs

Standard RNNs process sequences left-to-right, accessing only past context. Bidirectional RNNs maintain two hidden state sequences: one processing forward, one backward. The outputs combine both directions:

```
→ → → → Forward RNN → → → →
x₁ x₂ x₃ x₄
← ← ← ← Backward RNN ← ← ← ←

Output: Combine forward and backward states
```

For the word "bank" in "river bank," the forward RNN has seen "river," while the backward RNN has seen what follows. Combining both provides fuller context for disambiguation.

Bidirectional RNNs work when the entire sequence is available upfront (like text classification or speech recognition on recorded audio) but not for real-time generation where future inputs are unknown.

## Backpropagation Through Time (BPTT)

Training RNNs requires a specialized form of backpropagation called Backpropagation Through Time, which accounts for the temporal dependencies and parameter sharing.

### The BPTT Algorithm

BPTT unrolls the RNN across time and applies standard backpropagation. For a sequence of length T:

1. **Forward Pass**: Process the entire sequence, computing hidden states h_0, h_1, ..., h_T and outputs y_1, ..., y_T.

2. **Loss Computation**: Calculate loss at each time step (or only at specific steps):
   ```
   L = Σ_t L_t(y_t, target_t)
   ```

3. **Backward Pass**: Compute gradients by backpropagating through the unrolled network:
   ```
   ∂L/∂W = Σ_t ∂L_t/∂W
   ```

The key challenge: gradients must propagate backward through time, from the final time step back to the initial state. At each time step, gradients flow both backward to the previous time step's hidden state and backward through the current computation.

### Truncated BPTT

For very long sequences, full BPTT becomes computationally expensive (memory for all hidden states, computation through all time steps). Truncated BPTT limits backpropagation to k time steps:

```
Forward: Process entire sequence, maintaining hidden state
Backward: Only backpropagate through the most recent k steps
```

This approximation trades some gradient accuracy for computational efficiency. The hidden state still carries information from earlier time steps (forward propagation is complete), but parameter updates don't account for very long-term dependencies.

Typical values of k range from 20 to 100. Shorter truncation trains faster but limits the temporal dependencies the model can learn. Longer truncation captures longer dependencies but requires more memory and computation.

## The Vanishing Gradient Problem

Despite their theoretical ability to capture long-term dependencies, basic RNNs struggle with sequences longer than a few dozen time steps due to the vanishing gradient problem. Understanding this fundamental limitation is crucial.

### Why Gradients Vanish

Consider backpropagating from time T to time 0. The gradient must flow through T time steps, multiplying by the weight matrix W_hh at each step:

```
∂h_T/∂h_0 = ∂h_T/∂h_{T-1} × ∂h_{T-1}/∂h_{T-2} × ... × ∂h_1/∂h_0
```

Each factor involves W_hh and the derivative of the tanh activation. If the largest eigenvalue of W_hh is less than 1, this repeated multiplication causes exponential decay. After 50 time steps, the gradient might shrink by a factor of 0.99^50 ≈ 0.6, and this is optimistic.

With tanh activation, derivatives are bounded by 1 and typically much smaller (tanh'(x) < 1 for all x ≠ 0). Repeatedly multiplying values less than 1 causes gradients to vanish exponentially with sequence length.

### Consequences of Vanishing Gradients

When gradients vanish, the network cannot learn long-term dependencies. Consider learning that the subject "cats" (word 1) determines the verb form "are" (word 50):

"The cats that lived in the old barn by the creek where we played as children are..."

The gradient signal connecting "cats" to "are" has vanished by the time it propagates back 50 steps. The network cannot adjust parameters to capture this dependency.

In practice, basic RNNs struggle with dependencies longer than 10-20 time steps. For tasks requiring longer context (document-level sentiment, long-term time series patterns), vanilla RNNs fail.

### The Exploding Gradient Problem

Conversely, if the largest eigenvalue of W_hh exceeds 1, gradients explode exponentially. With eigenvalue 1.1, after 50 steps, gradients grow by 1.1^50 ≈ 117.

Exploding gradients cause training instability: parameters update wildly, loss spikes, training diverges. While severe, exploding gradients are easier to address than vanishing gradients.

**Gradient Clipping** solves exploding gradients: if gradient norm exceeds a threshold, scale it down:
```python
if ||gradient|| > threshold:
    gradient = gradient × (threshold / ||gradient||)
```

This simple technique prevents extreme updates while preserving gradient direction, effectively stabilizing training.

### Why Vanishing is Harder Than Exploding

Gradient clipping easily handles explosion, but vanishing has no symmetric solution. You cannot arbitrarily amplify vanishing gradients—they vanish because the dynamics genuinely prevent long-term information flow.

Addressing vanishing gradients requires fundamental architectural changes. This challenge motivated the development of LSTM and GRU, which we'll cover in the next topic.

## Practical Considerations for RNN Training

Beyond the gradient problems, several practical issues affect RNN training.

### Initialization Strategies

Proper weight initialization is crucial for RNNs. Poor initialization exacerbates gradient problems. Common strategies:

**Xavier/Glorot Initialization**: Scale weights by √(1/n) where n is input size. This aims to maintain variance across layers.

**Orthogonal Initialization**: Initialize W_hh as an orthogonal matrix. Orthogonal matrices preserve gradient norms during backpropagation, partially mitigating vanishing/exploding gradients.

**Identity Initialization**: Initialize W_hh near the identity matrix. This encourages gradient flow by making the default operation "copy the hidden state forward."

### Learning Rate Considerations

RNNs often require careful learning rate tuning. The same learning rate that works for a feedforward network might be too large (causing exploding gradient-like instability) or too small (making training impossibly slow) for an RNN.

Adaptive optimizers like Adam help by adjusting learning rates per parameter. Learning rate schedules that reduce learning rate over time improve stability and final performance.

### Sequence Length Variability

Real-world sequences have variable lengths. A batch of sentences might range from 5 to 50 words. Two approaches handle this:

**Padding**: Pad shorter sequences to match the longest. Mark padded positions and mask their contribution to loss and gradients. This wastes computation on padding but simplifies implementation.

**Bucketing**: Group sequences of similar lengths into batches. This reduces padding waste but requires more complex data handling.

### Teacher Forcing vs. Free Running

For sequence generation tasks, two training modes exist:

**Teacher Forcing**: During training, use ground truth previous outputs as inputs, even if the model's prediction was wrong. This provides stable training signals but creates train-test mismatch.

**Free Running**: Use the model's own predictions as inputs. This matches test-time conditions but makes training harder due to error compounding.

Mixed approaches use teacher forcing early in training, gradually transitioning to free running. Scheduled sampling randomly chooses between teacher forcing and free running with probabilities that shift during training.

## Applications of RNNs

Despite being overshadowed by transformers for some tasks, RNNs remain valuable for many applications:

### Language Modeling

Language models predict the next word given previous words. RNNs are natural for this: the hidden state encodes context, and the output distribution predicts the next word.

Character-level language models demonstrate RNN capabilities beautifully. Training on text data, they learn to generate coherent text one character at a time, implicitly learning spelling, grammar, and even some semantics.

### Machine Translation

Sequence-to-sequence models use an encoder RNN to process the source language and a decoder RNN to generate the target language. The encoder's final hidden state serves as context for the decoder.

While transformers now dominate machine translation, RNN sequence-to-sequence models introduced the encoder-decoder paradigm that remains central to modern architectures.

### Speech Recognition

Speech is inherently sequential—audio waveforms or spectrograms over time. RNNs (particularly bidirectional) process these sequences to recognize words. Connectionist Temporal Classification (CTC) loss enables training without frame-level alignment between audio and text.

### Time Series Forecasting

For stock prices, weather data, sensor readings, and other time series, RNNs model temporal dependencies to forecast future values. Their ability to handle variable-length history and capture nonlinear patterns makes them effective for many forecasting tasks.

### Video Analysis

Videos are sequences of frames. RNNs can process frame sequences for action recognition, video captioning, and activity detection. Combining CNNs (for spatial features) with RNNs (for temporal modeling) has proven powerful.

## Limitations and When Not to Use RNNs

Understanding RNN limitations guides appropriate application:

**Long-Range Dependencies**: Basic RNNs fail for dependencies beyond ~20 steps. Even LSTM/GRU struggle beyond 100-200 steps.

**Parallelization**: RNNs process sequences sequentially, preventing parallel computation across time steps. This makes training on modern hardware less efficient than parallelizable architectures like transformers.

**Computational Cost**: Deep RNNs (multiple stacked layers) become very deep when unrolled, increasing computational cost.

For tasks requiring very long context (document-level tasks, long videos), transformers often outperform RNNs. For tasks where parallel processing is critical, CNNs or transformers are preferable.

However, RNNs remain efficient for:
- Online/streaming processing (transformers require full sequence)
- Very long sequences where transformer quadratic complexity is prohibitive
- Tasks with strong temporal structure where RNN inductive bias helps

## The Broader Impact of RNNs

RNNs represented a conceptual breakthrough: neural networks could handle variable-length sequences with memory of past inputs. This unlocked entire domains previously inaccessible to deep learning.

The idea of maintaining and updating hidden state influenced later architectures. LSTMs and GRUs extended the RNN framework with sophisticated gating mechanisms. Attention mechanisms emerged from efforts to improve RNN-based translation. Transformers, while replacing RNNs in many domains, inherited the sequence processing perspective RNNs pioneered.

Even as newer architectures dominate benchmarks, understanding RNNs provides essential intuition about sequential modeling. The challenges RNNs face—vanishing gradients, long-term dependencies, parallel processing—drive architectural innovation. The solutions developed for RNNs—gating mechanisms, attention, skip connections—apply broadly across deep learning.

## Conclusion

Recurrent Neural Networks introduced the concept of learned hidden state that persists across time steps, enabling neural networks to process sequences. The core insight—sharing parameters across time while maintaining memory—remains influential.

The challenges of vanilla RNNs, particularly vanishing gradients limiting long-term dependencies, motivated the development of LSTM and GRU architectures. Understanding these challenges and the basic RNN framework provides essential background for appreciating the innovations in more advanced recurrent architectures.

While transformers have displaced RNNs from some applications, RNNs retain advantages for streaming data, very long sequences, and tasks where their inductive biases align well with the problem structure. More importantly, the concepts introduced by RNNs—processing sequences with memory, backpropagation through time, the challenges of long-term dependencies—remain central to sequential modeling in deep learning.
