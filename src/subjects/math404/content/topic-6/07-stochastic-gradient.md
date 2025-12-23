---
title: "Stochastic Gradient Descent"
description: "Optimization for large-scale data"
---

# Stochastic Gradient Descent (SGD)

In the age of Big Data, calculating the true gradient is a luxury we cannot afford. **Stochastic Gradient Descent (SGD)** replaces the true gradient with a noisy, cheap estimate. It is the engine of Deep Learning.

## The Problem Setting

Consider minimizing a sum of functions (Finite Sum problem):
$$ f(x) = \frac{1}{n} \sum_{i=1}^n f_i(x) $$
This usually represents the **Loss Function** over a training set of $n$ examples.
- $f_i(x)$: Loss on data point $i$.
- $x$: Model parameters.

## Batch Gradient Descent (Standard GD)

$$ x_{k+1} = x_k - \alpha \nabla f(x_k) = x_k - \frac{\alpha}{n} \sum_{i=1}^n \nabla f_i(x_k) $$
Cost per step: $O(n)$.
If $n = 1,000,000,000$ (e.g., ImageNet), one step takes hours.

## Stochastic Gradient Descent (SGD)

Instead of summing all $n$, pick a **random index** $i_k$ uniformly from {1, ..., n}.
Use $\nabla f_{i_k}(x_k)$ as an unbiased estimator of the true gradient.

$$ x_{k+1} = x_k - \alpha_k \nabla f_{i_k}(x_k) $$

Cost per step: $O(1)$ (independent of dataset size!).

**Expected Update:**
$$ \mathbb{E}[x_{k+1} \mid x_k] = x_k - \alpha_k \mathbb{E}[\nabla f_{i_k}(x_k)] = x_k - \alpha_k \nabla f(x_k) $$
On average, we move in the right direction. In reality, we take a noisy, drunk walk.

## Mini-batch SGD

A compromise. Pick a random batch $\mathcal{B}$ of size $b$ (e.g., 32, 64, 128).
$$ x_{k+1} = x_k - \frac{\alpha_k}{b} \sum_{i \in \mathcal{B}} \nabla f_i(x_k) $$
- Reduces variance of gradient estimate.
- Allows vectorized computation (GPUs love this).

## Convergence

SGD converges, but slowly.
Because of the noise (variance $\sigma^2$), we cannot use a fixed step size $\alpha$. We must decrease it.
Robbins-Monro condition:
$$ \sum \alpha_k = \infty, \quad \sum \alpha_k^2 < \infty $$
Typical schedule: $\alpha_k = O(1/k)$ or $O(1/\sqrt{k})$.

**Rate:**
- Strongly Convex: $O(1/k)$ (Compare to $O(c^k)$ for GD).
- General Convex: $O(1/\sqrt{k})$.

**Trade-off:**
- GD: Fast convergence (few steps), expensive steps.
- SGD: Slow convergence (many steps), cheap steps.
- For low accuracy (Machine Learning), SGD wins. For high accuracy ($10^{-10}$), GD wins.

## Variance Reduction (Advanced)

Modern algorithms (SVRG, SAGA) combine the speed of SGD with the convergence rate of GD.
Key idea: Keep a memory of previous gradients to reduce the variance of the estimate.
Achieves **Linear Convergence $O(c^k)$** with **$O(1)$ cost**.

## Momentum and Adam

Standard SGD is slow in "ravines" (ill-conditioned).
**SGD with Momentum:**
$$ v_{k+1} = \beta v_k + \nabla f_{i_k}(x_k) $$
$$ x_{k+1} = x_k - \alpha v_{k+1} $$
Accelerates in consistent directions, damps oscillations.

**Adam (Adaptive Moment Estimation):**
Adapts the learning rate for each parameter individually based on gradient statistics.
The default optimizer for deep learning.

## Detailed Analysis: Batch vs Mini-batch vs Stochastic

**Full Batch Gradient Descent:**
$$ x_{k+1} = x_k - \frac{\alpha}{n} \sum_{i=1}^n \nabla f_i(x_k) $$
- **Pros:** Stable, smooth convergence, can use larger learning rates
- **Cons:** $O(n)$ cost per iteration—prohibitive for large $n$
- **Use when:** $n < 10{,}000$ and you need high accuracy

**Stochastic Gradient Descent (single sample):**
$$ x_{k+1} = x_k - \alpha \nabla f_{i_k}(x_k) $$
- **Pros:** $O(1)$ cost per iteration, can escape local minima (noise helps)
- **Cons:** Noisy updates, slow convergence, requires careful learning rate tuning
- **Use when:** $n > 10^9$ or real-time learning

**Mini-batch SGD (batch size $b$):**
$$ x_{k+1} = x_k - \frac{\alpha}{b} \sum_{i \in \mathcal{B}_k} \nabla f_i(x_k) $$
- **Pros:** Balanced noise/stability, GPU-friendly (vectorization), parallelizable
- **Cons:** Need to tune batch size
- **Use when:** Almost always! Default choice for deep learning

**Batch Size Effects:**
- $b = 1$: Maximum noise, fastest iteration, slowest convergence
- $b = 32$: Common default, good noise/speed balance
- $b = 256$: More stable, better for distributed training
- $b = n$: Full batch, slowest iteration, fastest convergence

## Learning Rate Schedules

Since SGD has noise, a constant learning rate prevents convergence to the exact optimum. We must decay $\alpha_k \to 0$.

### 1. Step Decay
$$ \alpha_k = \alpha_0 \cdot \gamma^{\lfloor k/T \rfloor} $$
Drop by factor $\gamma$ (e.g., 0.1) every $T$ epochs.

**Example:** $\alpha_0 = 0.1$, $\gamma = 0.1$, $T = 30$.
- Epochs 0-29: $\alpha = 0.1$
- Epochs 30-59: $\alpha = 0.01$
- Epochs 60-89: $\alpha = 0.001$

### 2. Polynomial Decay
$$ \alpha_k = \alpha_0 \left(1 + \frac{k}{T}\right)^{-p} $$
Smooth decay. For $p=1$, this is $O(1/k)$ (satisfies Robbins-Monro).

### 3. Exponential Decay
$$ \alpha_k = \alpha_0 e^{-\lambda k} $$
Rapid decrease.

### 4. Cosine Annealing
$$ \alpha_k = \alpha_{\min} + \frac{1}{2}(\alpha_{\max} - \alpha_{\min})\left(1 + \cos\left(\frac{\pi k}{T}\right)\right) $$
Smooth decrease and increase (with restarts). Popular in deep learning.

### 5. Adaptive (Adam, RMSprop)
Learning rate adjusts per-parameter based on gradient history. No manual schedule needed.

## Variance Reduction: SVRG and SAGA

The key limitation of SGD is **variance**: The gradient estimate is noisy.
$$ \text{Var}[\nabla f_{i_k}(x)] = \mathbb{E}[\|\nabla f_{i_k}(x) - \nabla f(x)\|^2] = \sigma^2 $$

**Variance Reduction Methods** reduce this variance to zero as $k \to \infty$ while maintaining $O(1)$ cost.

### SVRG (Stochastic Variance Reduced Gradient)

**Idea:** Maintain a "snapshot" gradient $\tilde{g} = \nabla f(\tilde{x})$ computed periodically.

**Update:**
$$ x_{k+1} = x_k - \alpha (\nabla f_i(x_k) - \nabla f_i(\tilde{x}) + \tilde{g}) $$

The term $\nabla f_i(\tilde{x}) - \tilde{g}$ has zero expectation, so this is still an unbiased estimate of $\nabla f(x_k)$.

**Key:** As $x_k \to \tilde{x}$, the variance $\to 0$.

**Convergence:** Linear rate $O(c^k)$ with $O(1)$ cost per iteration!

### SAGA

Similar to SVRG but stores gradients for all samples. More memory ($O(n)$) but better constants.

**Convergence comparison:**
- SGD: $O(1/k)$ for strongly convex
- SVRG/SAGA: $O(c^k)$ for strongly convex (same as full GD!)
- Cost per iteration: All $O(1)$

This is a **game-changer** for large-scale optimization when you can afford $O(n)$ memory.

## SGD with Momentum (Detailed)

The update with momentum is:
$$ v_k = \beta v_{k-1} + (1-\beta) \nabla f_{i_k}(x_k) $$
$$ x_{k+1} = x_k - \alpha v_k $$

Expanding the recursion:
$$ v_k = (1-\beta) \sum_{j=0}^{k-1} \beta^j \nabla f_{i_{k-j}}(x_{k-j}) $$

This is an **exponentially weighted moving average** of gradients. Recent gradients have more weight.

**Effect:**
- In consistent directions (gradient points the same way): $v$ accumulates, accelerating
- In oscillating directions (gradient switches sign): $v$ cancels out, dampening

**Typical value:** $\beta = 0.9$ (weights last ~10 gradients)

### Nesterov Momentum for SGD

A lookahead version:
$$ v_k = \beta v_{k-1} + \nabla f_{i_k}(x_k + \beta v_{k-1}) $$
$$ x_{k+1} = x_k - \alpha v_k $$

Slightly better in theory, similar in practice for neural networks.

## Adam: Adaptive Moment Estimation

The most popular optimizer for deep learning.

**Algorithm:**
1. Initialize $m_0 = 0, v_0 = 0$ (first and second moment estimates)
2. For $k = 0, 1, 2, \ldots$:
   - Compute gradient $g_k = \nabla f_{i_k}(x_k)$
   - Update first moment: $m_k = \beta_1 m_{k-1} + (1 - \beta_1) g_k$
   - Update second moment: $v_k = \beta_2 v_{k-1} + (1 - \beta_2) g_k^2$ (element-wise)
   - Bias correction: $\hat{m}_k = m_k / (1 - \beta_1^k)$, $\hat{v}_k = v_k / (1 - \beta_2^k)$
   - Update: $x_{k+1} = x_k - \alpha \frac{\hat{m}_k}{\sqrt{\hat{v}_k} + \epsilon}$

**Parameters:**
- $\beta_1 = 0.9$ (momentum for mean)
- $\beta_2 = 0.999$ (momentum for variance)
- $\epsilon = 10^{-8}$ (numerical stability)
- $\alpha = 0.001$ (learning rate)

**Key insight:** Each parameter gets its own adaptive learning rate based on $\sqrt{\hat{v}_k}$. Parameters with large gradients get smaller effective learning rates (stabilization). Parameters with small gradients get larger effective learning rates (acceleration).

**Why it works:**
- Combines momentum (first moment) with adaptive learning rates (second moment)
- Robust to hyperparameter choices
- Works well across many problem types

**Variants:**
- **AdaGrad:** $v_k = v_{k-1} + g_k^2$ (accumulates all gradients, learning rate decreases too fast)
- **RMSprop:** $v_k = \beta v_{k-1} + (1-\beta) g_k^2$ (exponential average, fixes AdaGrad)
- **AdamW:** Adam with decoupled weight decay (better regularization)
- **RAdam:** Rectified Adam (better early training)

## Practical Tips for SGD

### 1. Learning Rate is Critical
Start with $\alpha = 0.1$ for convex problems, $\alpha = 0.001$ for neural networks. Use learning rate search (try $10^{-4}, 10^{-3}, 10^{-2}, 10^{-1}$).

### 2. Shuffle Data
Randomly shuffle training data each epoch. Prevents cyclical patterns.

### 3. Early Stopping
Monitor validation loss. Stop when it stops improving (prevents overfitting).

### 4. Gradient Clipping
For RNNs and transformers, clip gradients to prevent explosion:
$$ g_k \leftarrow \min\left(1, \frac{\tau}{\|g_k\|}\right) g_k $$

### 5. Warm-up
Start with small learning rate, increase to target, then decay. Helps stabilize early training.

### 6. Batch Normalization
Normalizes activations, making SGD more robust to learning rate.

## When SGD Beats Batch Methods

### 1. Redundant Data
If your dataset has duplicates or near-duplicates, full batch GD wastes computation. SGD benefits from early redundancy.

### 2. Generalization
SGD's noise acts as implicit regularization. Models trained with SGD often generalize better than those trained with full batch GD (especially in deep learning).

### 3. Escaping Local Minima
In non-convex optimization (neural networks), noise helps escape poor local minima and saddle points.

### 4. Real-time Learning
For online learning (data arrives sequentially), SGD naturally handles streaming data.

## Common Mistakes with SGD

### 1. Learning Rate Too High
Gradients explode, loss becomes NaN. **Fix:** Reduce $\alpha$ by 10x.

### 2. Learning Rate Too Low
Training is extremely slow, gets stuck on plateaus. **Fix:** Increase $\alpha$.

### 3. Not Shuffling Data
If data is ordered (e.g., all class 0 first, then class 1), SGD learns poorly. **Always shuffle.**

### 4. Wrong Batch Size
Very small batches (1-4) can be too noisy. Very large batches (1024+) can generalize poorly. **Sweet spot:** 32-256.

### 5. No Learning Rate Decay
With constant $\alpha$, SGD oscillates around optimum instead of converging. **Use a schedule.**

### 6. Forgetting Bias Correction in Adam
Without bias correction, early steps have biased estimates. **Use standard Adam implementation.**

## Distributed and Parallel SGD

For very large datasets or models, train on multiple GPUs/machines.

### Data Parallelism
Each worker has a copy of the model, processes different data batches.
1. Compute gradients locally on each worker
2. Aggregate gradients (average or sum)
3. Update model synchronously or asynchronously

**Synchronous:** All workers wait for each other (stable but slower).
**Asynchronous:** Workers update independently (faster but can diverge).

### Large Batch Training
With $B$ workers, effective batch size is $B \times b$. To maintain convergence:
- **Linear scaling rule:** $\alpha_{\text{large}} = B \cdot \alpha_{\text{small}}$
- **Warm-up:** Gradually increase learning rate for first few epochs

## Theoretical Result: Convergence Rate

**Theorem (SGD for strongly convex):**
With learning rate $\alpha_k = \frac{c}{k}$:
$$ \mathbb{E}[f(x_k)] - f^* \leq O\left(\frac{1}{k}\right) + \frac{\sigma^2 \alpha_k}{2m} $$

The first term is optimization error (goes to 0), the second is variance (bounded by noise).

**For fixed $\alpha$:** Converges to a ball around optimum, radius $\propto \alpha \sigma^2$.
**For decaying $\alpha_k \to 0$:** Converges to exact optimum (slowly).

Compare to batch GD on strongly convex:
$$ f(x_k) - f^* \leq O(c^k) $$
Exponentially fast, but costs $O(n)$ per iteration.

**Trade-off:** SGD does more iterations but each is much cheaper.

## Applications of SGD

### 1. Deep Learning
**All modern neural networks** use SGD variants (Adam, SGD+Momentum). Training ImageNet with batch GD is impossible (terabytes of data).

### 2. Online Learning
Learning from streaming data (user clicks, sensor data). Update model as new data arrives.

### 3. Large-scale SVM
For linear SVMs with millions of samples, SGD (or SVRG) is the only feasible approach.

### 4. Reinforcement Learning
Policy gradient methods use stochastic gradients from environment interactions.

## Key Takeaways

1. **SGD replaces the full gradient with a single sample gradient**, reducing cost from $O(n)$ to $O(1)$ per iteration.

2. **The noise from sampling** helps escape local minima but prevents exact convergence without learning rate decay.

3. **Mini-batches balance noise and stability**, and enable GPU parallelization. Batch size 32-256 is typical.

4. **Learning rate must decay** ($\alpha_k \to 0$) for convergence, satisfying $\sum \alpha_k = \infty, \sum \alpha_k^2 < \infty$.

5. **Convergence rate is $O(1/k)$ for strongly convex**, slower than batch GD ($O(c^k)$), but iterations are much cheaper.

6. **Variance reduction methods (SVRG, SAGA)** achieve linear convergence with $O(1)$ cost—best of both worlds.

7. **Momentum accumulates gradients** to accelerate in consistent directions and dampen oscillations.

8. **Adam is the default optimizer for deep learning**, combining momentum with adaptive per-parameter learning rates.

9. **SGD has implicit regularization**: Models trained with SGD generalize better than batch-trained models.

10. **For large-scale machine learning ($n > 10^6$)**, SGD and its variants are essential. Batch methods are computationally infeasible.