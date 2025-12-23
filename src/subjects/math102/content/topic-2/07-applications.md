---
id: math102-t2-apps
title: "Applications"
order: 7
---

# Applications of Recurrence Relations

Recurrence relations appear throughout computer science and mathematics. This section explores real-world applications and shows how to model problems as recurrences.

## Algorithm Analysis

### Divide and Conquer Algorithms

**Merge Sort:**
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)  # O(n) merge
```

**Recurrence:** T(n) = 2T(n/2) + n

**Solution:** T(n) = Θ(n log n)

**Binary Search:**
T(n) = T(n/2) + 1 → T(n) = Θ(log n)

**Karatsuba Multiplication:**
T(n) = 3T(n/2) + O(n) → T(n) = Θ(n^{log₂3}) ≈ Θ(n^{1.585})

### Dynamic Programming

**Fibonacci:** F(n) = F(n-1) + F(n-2)

Naive recursion: T(n) = T(n-1) + T(n-2) + 1 → Exponential

With memoization: T(n) = O(n)

**Edit Distance:**
D(i,j) = min{D(i-1,j)+1, D(i,j-1)+1, D(i-1,j-1)+cost}

Time: O(mn) for strings of length m and n

## Combinatorial Sequences

### Catalan Numbers

$$C_n = \sum_{i=0}^{n-1} C_i C_{n-1-i}, \quad C_0 = 1$$

**Applications:**
- Valid parenthesizations: n pairs of parentheses
- Binary tree structures: n internal nodes
- Triangulations: n+2 vertices polygon
- Lattice paths: n×n grid, staying below diagonal

**Closed form:** $C_n = \frac{1}{n+1}\binom{2n}{n}$

### Bell Numbers

$$B_{n+1} = \sum_{k=0}^{n} \binom{n}{k} B_k, \quad B_0 = 1$$

**Applications:**
- Partitions of a set with n elements
- Equivalence relations on n elements

### Stirling Numbers

**Second kind:** S(n,k) = k·S(n-1,k) + S(n-1,k-1)

Counts: partitions of n elements into exactly k non-empty subsets

## Population Dynamics

### The Logistic Map

$$P_{n+1} = rP_n(1 - P_n)$$

Models population with:
- Growth rate r
- Carrying capacity (normalized to 1)
- Competition for resources

**Behavior varies with r:**
- r < 1: Population dies out
- 1 < r < 3: Stable equilibrium
- 3 < r < 3.57: Period doubling
- r > 3.57: Chaos

### Leslie Matrix Model

For age-structured populations:

$$\mathbf{n}_{t+1} = L \mathbf{n}_t$$

where L is the Leslie matrix with birth rates and survival probabilities.

## Financial Mathematics

### Compound Interest

$$A_n = A_{n-1}(1 + r)$$

**Solution:** A_n = A_0(1 + r)^n

### Loan Amortization

If P is principal, r is rate, M is monthly payment:

$$B_n = B_{n-1}(1 + r) - M$$

**Solution:** Balance after n payments can be computed in closed form.

### Annuities

Present value of n payments of P at rate r:

$$PV = P \cdot \frac{1 - (1+r)^{-n}}{r}$$

## Probability and Random Processes

### Gambler's Ruin

Probability of reaching N before 0, starting at k:

$$P_k = pP_{k+1} + qP_{k-1}$$

where p = win probability, q = 1-p.

**Solution:**
- If p ≠ q: $P_k = \frac{1-(q/p)^k}{1-(q/p)^N}$
- If p = q = 1/2: $P_k = k/N$

### Random Walk

Expected time to reach boundary:

$$E_k = 1 + pE_{k+1} + qE_{k-1}$$

### Markov Chains

Transition between states follows recurrence relations:

$$\pi^{(n+1)} = P\pi^{(n)}$$

Long-term: Solve for stationary distribution π = Pπ

## Cryptography

### RSA Key Generation

Extended Euclidean algorithm for modular inverse:
$$gcd(a, b) = gcd(b, a \mod b)$$

Recurrence unwinds to find coefficients x, y where:
ax + by = gcd(a, b)

### Linear Feedback Shift Registers

$$s_n = \sum_{i=1}^{k} c_i s_{n-i} \mod 2$$

Used in:
- Pseudorandom number generation
- Stream ciphers
- Error-correcting codes

## Physics and Engineering

### Electrical Circuits

Ladder network analysis:
$$V_n = \frac{R_1 + R_2}{R_2} V_{n-1} - \frac{R_1}{R_2} V_{n-2}$$

### Signal Processing

Digital filters defined by recurrence:
$$y[n] = \sum_{k=0}^{M} b_k x[n-k] - \sum_{k=1}^{N} a_k y[n-k]$$

### Mechanics

Discrete approximation to differential equations:
$$x_{n+1} = 2x_n - x_{n-1} + \frac{F}{m}\Delta t^2$$

## Computer Graphics

### Fractals

**Koch Snowflake:**
- Length: L_n = (4/3)^n L_0 → ∞
- Area: A_n = A_0 · (3/4)^n → bounded

**Sierpinski Triangle:**
- Triangles: T_n = 3^n
- Area: A_n = (3/4)^n A_0 → 0

### Subdivision Surfaces

Catmull-Clark subdivision:
$$P_n = \frac{1}{4}(E + 2V + F)$$

Creates smooth surfaces from coarse meshes.

## Biological Systems

### Fibonacci in Nature

Phyllotaxis (leaf arrangement) follows Fibonacci:
- Sunflower seed spirals
- Pine cone scales
- Branching patterns

### DNA Sequences

Alignment scores follow recurrence:
$$S(i,j) = \max\{S(i-1,j-1)+\sigma, S(i-1,j)+gap, S(i,j-1)+gap\}$$

## Modeling Workflow

To model a problem as a recurrence:

1. **Define state:** What information characterizes position?
2. **Identify transitions:** How do you move between states?
3. **Write recurrence:** Express current state in terms of previous
4. **Set boundaries:** Define base cases
5. **Solve:** Apply appropriate technique
6. **Verify:** Check solution satisfies original problem

## Common Mistakes in Recurrence Modeling

### Mistake 1: Incorrect Base Cases

The most frequent error is specifying wrong or missing base cases. For the Tower of Hanoi, forgetting H₀ = 0 leads to an undefined recurrence.

**Always verify:** Does your solution satisfy the base case(s)?

### Mistake 2: Off-by-One Errors

When translating between 0-indexed and 1-indexed formulations, or when counting moves vs states, off-by-one errors are common.

**Example:** Fibonacci
- F₁ = 1, F₂ = 1 (1-indexed)
- F₀ = 0, F₁ = 1 (0-indexed)

Be consistent throughout your analysis.

### Mistake 3: Ignoring the Non-Homogeneous Part

When solving T(n) = 2T(n/2) + n, students often find only the homogeneous solution (powers of 2) and forget the particular solution (n log n contribution).

### Mistake 4: Applying Master Theorem Incorrectly

The Master Theorem has specific conditions. Verify that:
- a ≥ 1 and b > 1
- f(n) is asymptotically positive
- The recurrence matches the standard form T(n) = aT(n/b) + f(n)

## Summary

Recurrence relations model:
- Algorithm complexity (divide-and-conquer, DP)
- Counting problems (Catalan, Bell, Stirling numbers)
- Dynamic systems (population, finance, physics)
- Random processes (walks, Markov chains)
- Signal processing and cryptography

The key is recognizing the recursive structure and formulating the appropriate recurrence with correct base cases.
