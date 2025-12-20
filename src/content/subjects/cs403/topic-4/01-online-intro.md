# Introduction to Online Algorithms: Competitive Analysis

## Introduction

Online algorithms make irrevocable decisions without knowledge of future inputs, unlike offline algorithms that see the entire input sequence. This distinction is fundamental in computer science: most real-world systems must make decisions immediately as data arrives, without the luxury of knowing what comes next.

Competitive analysis provides a framework for measuring online algorithm quality by comparing performance against an optimal offline algorithm that has perfect foresight. This worst-case perspective yields performance guarantees that hold regardless of input patterns.

## Online vs Offline Algorithms

**Offline algorithm**: Sees the entire input sequence before making any decisions. Can optimize globally with full knowledge.

**Online algorithm**: Processes inputs incrementally, one at a time. Must make irrevocable decisions immediately without knowledge of future inputs.

### The Ski Rental Problem

A classic example illustrating the online versus offline distinction:

**Scenario**: You're on a ski trip of unknown length. Each day you can:
- Rent skis for $1
- Buy skis for $10 (one-time purchase)

**Offline solution**: If you'll ski $\geq 10$ days, buy immediately. Otherwise, rent every day.

**Online challenge**: You don't know how many days you'll ski. Buy too early and waste money if the trip ends soon. Rent too long and pay more than buying.

**Key insight**: The adversary (nature) reveals input one day at a time, and you cannot change past decisions.

## Competitive Ratio

The competitive ratio quantifies how much worse an online algorithm performs compared to the optimal offline solution.

**Definition**: An online algorithm ALG is **c-competitive** if for all input sequences $\sigma$:
$$\text{ALG}(\sigma) \leq c \cdot \text{OPT}(\sigma) + \alpha$$

where OPT($\sigma$) is the cost of the optimal offline algorithm and $\alpha$ is an additive constant (often 0 for minimization problems).

**Interpretation**:
- The online algorithm is never more than $c$ times worse than optimal
- Smaller $c$ is better (1 means online matches offline perfectly)
- The additive constant $\alpha$ handles startup costs

### Strict Competitive Ratio

When $\alpha = 0$, we say the algorithm is **strictly c-competitive**:
$$\text{ALG}(\sigma) \leq c \cdot \text{OPT}(\sigma)$$

For randomized algorithms against oblivious adversaries:
$$\mathbb{E}[\text{ALG}(\sigma)] \leq c \cdot \text{OPT}(\sigma)$$

## Adversary Models

The power of the adversary determines the difficulty of the problem.

### Oblivious Adversary

The adversary constructs the input sequence $\sigma$ in advance, before seeing the algorithm's random choices.

- Most common model for randomized online algorithms
- Adversary knows the algorithm but not its random bits
- Realistic: input patterns often don't adapt to algorithm behavior

### Adaptive Online Adversary

The adversary sees each decision (including random choices) before constructing the next input.

- Strictly stronger than oblivious adversary
- Deterministic algorithms face this by default
- Randomization provides no benefit against adaptive adversaries

### Adaptive Offline Adversary

The adversary sees all decisions before choosing the offline optimal solution.

- Strongest adversary model
- Rarely used as it's often too pessimistic

## Example Analysis: Ski Rental

**Deterministic strategy**: Rent for 9 days, then buy on day 10.

**Analysis**:
- If trip lasts $\leq 9$ days: Pay days (ALG = days). OPT = days. Ratio = 1.
- If trip lasts 10+ days: Pay 9 + 10 = 19. OPT = 10. Ratio = 1.9.

**Theorem**: This strategy is 2-competitive, and no deterministic strategy can do better.

**Randomized improvement**: Choose buying day randomly. Achieves $e/(e-1) \approx 1.58$ competitive ratio against oblivious adversaries.

## Lower Bound Techniques

Lower bounds prove that no online algorithm (in a class) can achieve better than some competitive ratio.

### Adversary Arguments

**Technique**: Construct an input sequence that forces poor performance.

**Example (Paging)**: With cache size $k$, adversary requests $k+1$ distinct pages cyclically. Any deterministic algorithm misses at least once per $k+1$ requests.

### Yao's Minimax Principle

For randomized algorithms:
$$\max_{\sigma} \mathbb{E}[\text{ALG}(\sigma)] \geq \min_{\text{ALG}} \mathbb{E}_{\sigma}[\text{ALG}(\sigma)]$$

**Technique**: Show that the best deterministic algorithm performs poorly on a random input distribution. This lower bounds randomized algorithms against oblivious adversaries.

## Applications

Online algorithms appear throughout computer science:

**Resource allocation**:
- CPU scheduling: decide which process to run next
- Memory management: decide which pages to keep in cache
- Bandwidth allocation: route network traffic without global state

**Financial applications**:
- Trading algorithms: buy/sell without future price knowledge
- Portfolio management: rebalance without knowing market movements
- Auction mechanisms: bid without knowing competitors' strategies

**Caching systems**:
- Web caches: decide which content to cache
- CDN caching: content delivery network strategies
- Database buffer management: which disk pages to keep in memory

**Network routing**:
- Packet routing: forward packets without global network state
- Load balancing: distribute requests across servers
- Virtual machine placement: allocate VMs to physical machines

## Comparison with Other Analysis Frameworks

| Framework | Compares Against | Measure |
|-----------|------------------|---------|
| Competitive Analysis | Optimal offline | Worst-case ratio |
| Average-case Analysis | Expected inputs | Expected performance |
| Smoothed Analysis | Perturbed inputs | Expected over perturbations |
| Instance Optimality | Best for instance | Per-instance ratio |

## Key Takeaways

- Online algorithms must decide without future knowledge, unlike offline algorithms
- Competitive ratio measures worst-case performance relative to optimal offline
- Adversary models determine the power of worst-case inputs
- Many practical problems are inherently online: caching, scheduling, routing
- Randomization can improve competitive ratios against oblivious adversaries
- Lower bounds prove fundamental limitations of online computation
