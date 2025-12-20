# Stirling Numbers

Stirling numbers count fundamental combinatorial structures: ways to partition sets and arrange elements in cycles. They appear throughout combinatorics, probability, and algebra.

## Stirling Numbers of the Second Kind

### Definition

S(n, k) = number of ways to partition a set of n elements into exactly k non-empty subsets.

**Notation:** Also written {n \atop k} or S₂(n, k).

### Examples

S(4, 2): Partition {1,2,3,4} into 2 subsets:
- {1} | {2,3,4}
- {2} | {1,3,4}
- {3} | {1,2,4}
- {4} | {1,2,3}
- {1,2} | {3,4}
- {1,3} | {2,4}
- {1,4} | {2,3}

So S(4, 2) = 7.

### Recurrence Relation

$$S(n, k) = k \cdot S(n-1, k) + S(n-1, k-1)$$

**Interpretation:**
- Either element n joins an existing subset: k choices × S(n-1, k) ways
- Or element n forms its own subset: S(n-1, k-1) ways

### Boundary Conditions

- S(n, 0) = 0 for n > 0
- S(0, 0) = 1
- S(n, 1) = 1 (all in one subset)
- S(n, n) = 1 (each element alone)

### Table of Values

|   | k=1 | k=2 | k=3 | k=4 | k=5 |
|---|-----|-----|-----|-----|-----|
| n=1 | 1 | | | | |
| n=2 | 1 | 1 | | | |
| n=3 | 1 | 3 | 1 | | |
| n=4 | 1 | 7 | 6 | 1 | |
| n=5 | 1 | 15 | 25 | 10 | 1 |

### Explicit Formula

$$S(n, k) = \frac{1}{k!} \sum_{j=0}^{k} (-1)^{k-j} \binom{k}{j} j^n$$

**Derivation:** Count surjections from n elements to k labeled boxes, then divide by k! to unlabel.

## Bell Numbers

### Definition

Bₙ = total number of partitions of n elements = Σₖ S(n, k)

### Values

B₀ = 1, B₁ = 1, B₂ = 2, B₃ = 5, B₄ = 15, B₅ = 52, ...

### Recurrence

$$B_{n+1} = \sum_{k=0}^{n} \binom{n}{k} B_k$$

**Interpretation:** Choose k elements to be in same block as element n+1, partition rest.

### Exponential Generating Function

$$\sum_{n=0}^{\infty} B_n \frac{x^n}{n!} = e^{e^x - 1}$$

## Stirling Numbers of the First Kind

### Definition (Unsigned)

c(n, k) = |s(n, k)| = number of permutations of n elements with exactly k cycles.

**Notation:** Also written [n \atop k] or |s(n, k)|.

### Signed Stirling Numbers

s(n, k) = (-1)^{n-k} c(n, k)

### Examples

Permutations of {1,2,3} as cycle products:
- (1)(2)(3): 3 cycles
- (12)(3), (13)(2), (1)(23): 2 cycles each
- (123), (132): 1 cycle each

So c(3,1) = 2, c(3,2) = 3, c(3,3) = 1.

### Recurrence Relation

$$c(n, k) = (n-1) \cdot c(n-1, k) + c(n-1, k-1)$$

**Interpretation:**
- Element n joins an existing cycle: (n-1) positions to insert × c(n-1, k)
- Element n forms its own cycle: c(n-1, k-1)

### Table of Values

|   | k=1 | k=2 | k=3 | k=4 |
|---|-----|-----|-----|-----|
| n=1 | 1 | | | |
| n=2 | 1 | 1 | | |
| n=3 | 2 | 3 | 1 | |
| n=4 | 6 | 11 | 6 | 1 |

### Connection to Factorials

$$\sum_{k=0}^{n} c(n,k) = n!$$

(Every permutation has some number of cycles.)

## Polynomial Connections

### Rising Factorial

$$x^{(n)} = x(x+1)(x+2)\cdots(x+n-1) = \sum_{k=0}^{n} c(n,k) x^k$$

### Falling Factorial

$$x_{(n)} = x(x-1)(x-2)\cdots(x-n+1) = \sum_{k=0}^{n} s(n,k) x^k$$

### Powers in Terms of Falling Factorials

$$x^n = \sum_{k=0}^{n} S(n,k) \cdot x_{(k)}$$

## Inversion Formulas

The Stirling numbers satisfy orthogonality:

$$\sum_{j=k}^{n} s(n,j) S(j,k) = \sum_{j=k}^{n} S(n,j) s(j,k) = \delta_{nk}$$

This allows converting between power and factorial representations.

## Applications

### Moments of Distributions

For Poisson distribution with mean λ:
$$E[X^n] = \sum_{k=0}^{n} S(n,k) \lambda^k$$

### Random Permutations

Expected number of cycles in random permutation of n:
$$E[\text{cycles}] = \sum_{k=1}^{n} k \cdot \frac{c(n,k)}{n!} = H_n$$

where Hₙ is the nth harmonic number.

### Polynomial Interpolation

Stirling numbers convert between Newton's forward differences and derivatives.

## Asymptotic Behavior

### Stirling Numbers of Second Kind

$$S(n,k) \sim \frac{k^n}{k!}$$ as n → ∞ for fixed k.

### Bell Numbers

$$B_n \sim \frac{1}{\sqrt{n}} \left(\frac{n}{W(n)}\right)^n e^{n/W(n) - n - 1}$$

where W is the Lambert W function.

## Generating Functions

### EGF for Stirling Second Kind

$$\sum_{n=k}^{\infty} S(n,k) \frac{x^n}{n!} = \frac{(e^x - 1)^k}{k!}$$

### EGF for Stirling First Kind

$$\sum_{n=k}^{\infty} c(n,k) \frac{x^n}{n!} = \frac{(-\ln(1-x))^k}{k!}$$

## Practice Problems

1. **Compute:** S(5,3) using the recurrence.

2. **Prove:** S(n,2) = 2^{n-1} - 1.

3. **Show:** c(n,n-1) = C(n,2).

4. **Find:** Number of permutations of 6 elements with exactly 2 cycles.

5. **Prove:** Σₖ k·S(n,k) = B_{n+1} - Bₙ.

## Summary

Stirling numbers:
- **Second kind S(n,k):** partitions into k non-empty subsets
- **First kind c(n,k):** permutations with k cycles
- Related by orthogonality (matrix inverses)
- Connect powers and factorial polynomials
- Bell numbers sum over all S(n,k)
- Applications in probability, algebra, combinatorics
