# LSTM and GRU: Advanced Recurrent Architectures

Long Short-Term Memory (LSTM) and Gated Recurrent Unit (GRU) networks solved the critical limitation of vanilla RNNs: the inability to learn long-term dependencies due to vanishing gradients. These sophisticated architectures introduce gating mechanisms that carefully regulate information flow, enabling networks to maintain information across hundreds of time steps.

## The LSTM Architecture

Long Short-Term Memory networks, introduced by Hochreiter and Schmidhuber in 1997, represent one of the most successful innovations in recurrent neural networks. LSTMs maintain both short-term activation (hidden state) and long-term memory (cell state) through a system of gates that learn when to remember, forget, and output information.

### The Cell State: Long-Term Memory Highway

The key innovation of LSTM is the cell state C_t, a "conveyor belt" running through the network with minimal linear interactions. Information can flow along the cell state relatively unchanged for many time steps, avoiding the repeated nonlinear transformations that cause vanishing gradients in vanilla RNNs.

Think of the cell state as long-term memory that persists across time. Gates add or remove information from this memory, but the cell state itself provides a direct path for gradient flow during backpropagation.

### The Three Gates

LSTMs use three gates to control information flow:

**Forget Gate**: Decides what information to discard from the cell state
```
f_t = σ(W_f · [h_{t-1}, x_t] + b_f)
```

**Input Gate**: Decides what new information to add to the cell state
```
i_t = σ(W_i · [h_{t-1}, x_t] + b_i)
C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)
```

**Output Gate**: Decides what to output based on cell state
```
o_t = σ(W_o · [h_{t-1}, x_t] + b_o)
```

Each gate uses a sigmoid activation σ(x) = 1/(1 + e^(-x)), which outputs values between 0 and 1. This acts as a learned mask: 0 means "completely block," 1 means "completely pass," with intermediate values allowing partial information flow.

### Complete LSTM Equations

The full LSTM update at each time step:

```
Forget gate:     f_t = σ(W_f · [h_{t-1}, x_t] + b_f)
Input gate:      i_t = σ(W_i · [h_{t-1}, x_t] + b_i)
Cell candidate:  C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)
Cell state:      C_t = f_t * C_{t-1} + i_t * C̃_t
Output gate:     o_t = σ(W_o · [h_{t-1}, x_t] + b_o)
Hidden state:    h_t = o_t * tanh(C_t)
```

The notation [h_{t-1}, x_t] means concatenating the previous hidden state and current input into a single vector. The * operator represents element-wise multiplication.

### Understanding the Information Flow

Let's trace how information flows through an LSTM:

**Step 1 - Forget**: The forget gate looks at h_{t-1} and x_t and outputs a value for each dimension of C_{t-1}. A value of 1 means "keep this information," 0 means "forget it completely." This allows the network to discard irrelevant past information.

Example: In language modeling, when encountering a new subject, the forget gate might zero out information about the previous subject to avoid confusion.

**Step 2 - Input**: The input gate decides which new information to add. First, a tanh layer creates candidate values C̃_t. Then the input gate i_t decides which candidates to actually use. The combination i_t * C̃_t gives new information to add to the cell state.

Example: Upon encountering a new subject, the input gate opens to encode information about this subject's properties (singular/plural, gender, etc.).

**Step 3 - Update Cell State**: Combine forgetting and input:
```
C_t = f_t * C_{t-1} + i_t * C̃_t
```

This updates long-term memory: forget some old information (f_t * C_{t-1}) and add some new information (i_t * C̃_t). The beauty is that this operation involves minimal nonlinearity—mostly addition and element-wise multiplication, which preserves gradients.

**Step 4 - Output**: The output gate decides what parts of the cell state to output as the hidden state. The cell state is passed through tanh (squashing to [-1, 1]), then multiplied by the output gate.

Example: Even if cell state contains subject information, the output gate might close when that information isn't relevant to the current prediction.

### Why LSTMs Solve Vanishing Gradients

The cell state provides an "expressway" for gradient flow. During backpropagation, gradients can flow backward through the cell state with minimal transformation:

```
∂L/∂C_{t-1} = ∂L/∂C_t * f_t
```

The forget gate f_t allows gradients to flow backward largely unchanged (if f_t ≈ 1). Contrast this with vanilla RNNs where gradients must flow through tanh activations and weight multiplications at every step, causing exponential decay.

The LSTM can learn to set f_t ≈ 1 for important information, creating a path for gradients to flow across many time steps. This learned, selective gradient flow enables capturing long-term dependencies.

### LSTM Variants

Several LSTM variants have been proposed:

**Peephole Connections**: Gates look at cell state C_{t-1} in addition to h_{t-1} and x_t. This gives gates more information for decisions.

**Coupled Forget-Input Gates**: Use a single gate for both forgetting and input: f_t and i_t = 1 - f_t. This reduces parameters and enforces that information added equals information forgotten.

**Vanilla LSTM**: The standard version described above remains most common. Research suggests variants provide marginal improvements at best, and the standard LSTM is robust across tasks.

## Gated Recurrent Units (GRU)

GRU, introduced by Cho et al. in 2014, simplifies LSTM while retaining similar performance. GRUs merge the cell state and hidden state, using two gates instead of three. The simpler architecture trains faster and requires fewer parameters.

### GRU Architecture

GRUs maintain only a hidden state h_t (no separate cell state) and use two gates:

**Reset Gate**: Controls how much past information to forget when computing the new state
```
r_t = σ(W_r · [h_{t-1}, x_t] + b_r)
```

**Update Gate**: Decides how much of the past state to keep vs. new candidate state
```
z_t = σ(W_z · [h_{t-1}, x_t] + b_z)
```

### Complete GRU Equations

```
Reset gate:      r_t = σ(W_r · [h_{t-1}, x_t])
Update gate:     z_t = σ(W_z · [h_{t-1}, x_t])
Candidate state: h̃_t = tanh(W · [r_t * h_{t-1}, x_t])
Hidden state:    h_t = (1 - z_t) * h_{t-1} + z_t * h̃_t
```

### How GRU Works

**Reset Gate**: When computing the new candidate state h̃_t, the reset gate determines how much of h_{t-1} to use. If r_t ≈ 0, the network ignores the previous hidden state, effectively resetting. If r_t ≈ 1, all previous information is used.

**Update Gate**: This gate balances between keeping the old hidden state h_{t-1} and accepting the new candidate h̃_t. When z_t ≈ 0, the hidden state barely changes (keeping long-term information). When z_t ≈ 1, the new candidate completely replaces the old state.

The update gate provides functionality similar to LSTM's forget and input gates combined. The formulation h_t = (1 - z_t) * h_{t-1} + z_t * h̃_t is a weighted average: how much old vs. new information.

### GRU vs. LSTM

GRU simplifies LSTM:
- 2 gates instead of 3
- No separate cell state
- Fewer parameters (about 25% fewer than LSTM)
- Faster to train and evaluate

Performance-wise, GRUs and LSTMs are comparable. On many tasks, neither consistently outperforms the other. The choice often depends on:

**Use LSTM when**:
- Maximum performance is critical
- Very long sequences (100+ steps)
- Extensive hyperparameter tuning is feasible

**Use GRU when**:
- Training speed matters
- Parameter efficiency is important
- Less tuning time is available
- Moderate sequence lengths (< 100 steps)

### Empirical Comparisons

Extensive empirical studies (e.g., Chung et al., 2014; Jozefowicz et al., 2015) found:

1. Both vastly outperform vanilla RNNs on tasks requiring long-term dependencies
2. Neither consistently beats the other across tasks
3. GRU trains 15-30% faster due to fewer parameters
4. For very specific tasks, one might edge out the other
5. Proper initialization and hyperparameters matter more than the choice between GRU and LSTM

The conclusion: both are excellent choices. Pick GRU for speed and simplicity, LSTM when squeezing out maximum performance or when well-tuned LSTM baselines exist for your domain.

## How Gates Learn

Understanding what gates learn provides insight into how these networks function.

### Learning When to Forget

The forget gate learns to identify when past information becomes irrelevant. In language modeling:

- When a sentence ends, forget gates might close to discard sentence-specific context
- When a new subject appears, forget information about the previous subject
- For time series, after a regime change, forget patterns from the previous regime

Visualization studies show forget gates often encode linguistically meaningful patterns. Gates tracking subject information close when subjects change. Gates tracking tense information persist through clauses but reset at sentence boundaries.

### Learning When to Update

Input gates learn when new information is significant enough to encode. They filter out noise while encoding important events:

- In sentiment analysis, gates open strongly for opinion words ("excellent," "terrible") while remaining closed for neutral words
- For time series anomaly detection, gates respond to unusual values
- In machine translation, gates encode content words more strongly than function words

### Learning What to Output

Output gates learn which information is relevant for the current prediction. The cell state might contain diverse information, but only some is relevant at each step:

- When predicting a verb, output subject information strongly (for agreement) but suppress object information
- When generating the next word after "the," output information about upcoming nouns while suppressing verb information

These learned behaviors emerge from training on data, without explicit programming. The network discovers that these gating patterns improve prediction accuracy.

## Training LSTMs and GRUs

Training these advanced RNNs involves several considerations beyond vanilla RNNs.

### Initialization

Proper initialization is crucial. Common practices:

**Orthogonal Initialization**: Initialize recurrent weight matrices (W_h for GRU, weight matrices in LSTM) as orthogonal matrices. This helps gradient flow.

**Bias Initialization**: For LSTMs, initialize forget gate biases to 1 or higher. This encourages the network to remember by default, learning to forget only when beneficial. With zero initialization, gates start near 0.5 (sigmoid(0) = 0.5), which may hinder learning.

**Xavier/He Initialization**: For input and output weights, use Xavier (for tanh) or He (for ReLU) initialization.

### Dropout for Recurrent Networks

Standard dropout (randomly zeroing activations during training) doesn't work well for RNNs. Dropping different hidden state dimensions at each time step disrupts the temporal connections that make RNNs powerful.

**Variational Dropout**: Use the same dropout mask across all time steps. This preserves temporal structure while preventing overfitting.

**Recurrent Dropout**: Apply dropout only to non-recurrent connections (inputs, outputs) but not to recurrent connections (hidden state to next hidden state).

Both approaches provide regularization without destroying temporal dependencies.

### Gradient Clipping

Even with gates solving vanishing gradients, exploding gradients can still occur. Gradient clipping remains essential:

```python
if gradient_norm > threshold:
    gradient *= threshold / gradient_norm
```

Typical thresholds range from 1 to 10. This simple technique prevents the extreme updates that derail training.

### Batch Normalization in RNNs

Batch normalization, highly effective in feedforward networks, is tricky for RNNs. Normalizing hidden states across time can disrupt learned temporal dynamics.

**Layer Normalization** works better: normalize across features within each time step, not across the batch or time:
```
h_t = LayerNorm(LSTM(x_t, h_{t-1}))
```

Layer normalization accelerates training and improves performance for many recurrent models.

## Bidirectional LSTMs and GRUs

Bidirectional variants process sequences in both directions, combining forward and backward information:

```
Forward:  h_f,t = LSTM_forward(x_t, h_f,t-1)
Backward: h_b,t = LSTM_backward(x_t, h_b,t+1)
Output:   h_t = [h_f,t, h_b,t]  (concatenation)
```

The forward LSTM sees past context, the backward LSTM sees future context. Concatenating both provides full sequence context at each position.

Bidirectional models excel at tasks where full sequences are available:
- Named entity recognition
- Part-of-speech tagging
- Protein secondary structure prediction
- Speech recognition (on recorded audio)

They cannot be used for online/streaming applications where future inputs are unavailable.

## Stacking Recurrent Layers

Like other neural networks, RNNs can be stacked for additional capacity:

```
x_t → LSTM_1 → h¹_t → LSTM_2 → h²_t → LSTM_3 → h³_t → output
```

Each layer processes the sequence of hidden states from the layer below. Deeper networks can learn more complex representations:

- Layer 1: Low-level features (for text: character patterns, word parts)
- Layer 2: Mid-level features (for text: syntactic structures, phrases)
- Layer 3: High-level features (for text: semantic meaning, discourse structure)

Typical depths range from 2 to 4 layers. Diminishing returns appear beyond 4 layers, and training becomes more difficult. Residual connections help with deeper stacks:

```
h²_t = h¹_t + LSTM_2(h¹_t)
```

## Applications Showcasing LSTM/GRU Strengths

These architectures excel when long-term dependencies matter.

### Machine Translation

Sequence-to-sequence models with LSTM/GRU encoders and decoders enabled the neural machine translation revolution. The encoder processes the source sentence, the decoder generates the target:

```
Encoder:  English → LSTM → context_vector
Decoder:  context_vector → LSTM → French
```

The ability to encode long sentences and maintain context during generation was transformative. While transformers now dominate translation, LSTM seq2seq models proved the concept.

### Speech Recognition

Speech audio has strong temporal dependencies—phonemes depend on surrounding phonemes, words on surrounding words. Bidirectional LSTMs processing acoustic features (spectrograms) excel at recognizing speech.

Connectionist Temporal Classification (CTC) loss enables training without frame-level alignment:
```
Audio frames → Bidirectional LSTM → Character probabilities → CTC → Text
```

This approach powered significant improvements in automatic speech recognition accuracy.

### Handwriting Recognition

Handwriting is sequential (pen strokes over time) with long-range dependencies (letters affect subsequent letter shapes). LSTMs process sequences of stroke coordinates, recognizing text remarkably accurately even from highly cursive writing.

### Music Generation

Music has long-range structure: themes repeat, harmonies resolve over many measures. LSTMs can learn these patterns, generating novel musical sequences that maintain coherent structure across hundreds of time steps.

### Video Analysis

Videos are sequences of frames with temporal dependencies. LSTM layers stacked on top of CNN features (extracting spatial information from frames) enable action recognition, video captioning, and event detection.

## Limitations

Despite their power, LSTM and GRU have limitations:

**Sequential Processing**: Cannot parallelize across time steps, limiting training speed on modern hardware.

**Finite Context**: While handling hundreds of steps, they still struggle with very long sequences (thousands of steps).

**Memory Bottleneck**: The fixed-size hidden state must encode all relevant information, which becomes a bottleneck for very long sequences.

**Computational Cost**: Multiple matrix multiplications at each time step make them computationally expensive.

These limitations motivated attention mechanisms and transformers, which we'll explore in subsequent topics.

## Theoretical Perspectives

From a theoretical standpoint, gates enable conditional computation—the network learns to route information dynamically based on input content. This is more powerful than fixed computations.

The forget gate can be viewed as learning a time constant: how quickly information decays. Different dimensions of the cell state can have different learned time constants, allowing the network to maintain information at multiple timescales simultaneously.

Research on the learning dynamics shows that LSTMs naturally develop specialized units during training. Some cells become "long-term memory cells" with forget gates near 1, maintaining information across many steps. Others become "short-term cells" with forget gates that frequently reset.

## Practical Recommendations

Based on extensive experience, here are recommendations:

**Start with GRU**: Unless you have a specific reason to use LSTM, start with GRU for faster experimentation.

**Use 2-3 Layers**: Deeper than 3 layers rarely helps and makes training harder.

**Initialize Forget Bias to 1**: For LSTMs, this simple trick helps learning.

**Apply Gradient Clipping**: Always clip gradients with threshold around 5.

**Use Layer Normalization**: This often improves both speed and final performance.

**Try Bidirectional**: If your task allows it, bidirectional processing usually helps.

**Regularize Properly**: Use variational dropout, not standard dropout.

**Tune Learning Rate**: These architectures can be sensitive to learning rate; try values around 0.001.

## Conclusion

LSTM and GRU architectures solved the critical vanishing gradient problem that limited vanilla RNNs, enabling neural networks to learn long-term dependencies spanning hundreds of time steps. Their gating mechanisms provide sophisticated control over information flow, learning what to remember, what to forget, and what to output.

While transformers have displaced LSTM/GRU in some domains, these architectures remain valuable for their efficiency on very long sequences, their suitability for online processing, and their strong performance on many sequential tasks. More importantly, the concepts they introduced—gating, learned memory management, sophisticated information flow control—influenced subsequent architectural innovations.

Understanding how gates work, why they solve vanishing gradients, and how to train these models effectively provides essential knowledge for deep learning practitioners. Even if you primarily use transformers, the insights from LSTM and GRU architectures inform understanding of attention mechanisms and other modern approaches to sequence modeling.
