# Summation Notation

## The Sigma Symbol

The summation symbol **Σ** (capital Greek letter sigma) provides compact notation for sums:

$$\sum_{i=1}^{n} a_i = a_1 + a_2 + a_3 + \cdots + a_n$$

## Components of a Summation

$$\sum_{i=m}^{n} f(i)$$

| Component | Name | Meaning |
|-----------|------|---------|
| Σ | Summation symbol | "Add up" |
| i | Index variable | Counter that changes |
| m | Lower bound | Starting value of i |
| n | Upper bound | Ending value of i |
| f(i) | General term | Expression to sum |

## Reading Summations

$$\sum_{k=1}^{5} k^2$$

Read as: "The sum of k squared, for k from 1 to 5"

Expands to: $1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 1 + 4 + 9 + 16 + 25 = 55$

## Examples

### Simple Sums

$$\sum_{i=1}^{4} i = 1 + 2 + 3 + 4 = 10$$

$$\sum_{j=0}^{3} 2^j = 2^0 + 2^1 + 2^2 + 2^3 = 1 + 2 + 4 + 8 = 15$$

$$\sum_{k=2}^{5} (2k+1) = 5 + 7 + 9 + 11 = 32$$

### Constant Sums

$$\sum_{i=1}^{n} c = c + c + \cdots + c = nc$$

(There are n terms, each equal to c.)

### Starting at Zero

$$\sum_{i=0}^{4} i^2 = 0 + 1 + 4 + 9 + 16 = 30$$

Note: This has 5 terms (0, 1, 2, 3, 4), not 4!

## The Index Variable

The index variable is a **dummy variable**—its name doesn't matter:

$$\sum_{i=1}^{n} i^2 = \sum_{k=1}^{n} k^2 = \sum_{j=1}^{n} j^2$$

All represent the same sum: $1^2 + 2^2 + \cdots + n^2$

### Scope

The index variable only exists within the summation:

$$\sum_{i=1}^{5} i^2 + i$$

Here, the final "+ i" is ambiguous! Is i part of the sum or external?

Better: Use parentheses to clarify:
$$\sum_{i=1}^{5} (i^2 + i) \quad \text{or} \quad \left(\sum_{i=1}^{5} i^2\right) + i$$

## Properties of Summations

### Linearity

**Constant factor:**
$$\sum_{i=1}^{n} c \cdot a_i = c \cdot \sum_{i=1}^{n} a_i$$

Example: $\sum_{i=1}^{5} 3i = 3 \sum_{i=1}^{5} i = 3 \cdot 15 = 45$

**Sum of sums:**
$$\sum_{i=1}^{n} (a_i + b_i) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i$$

Example: $\sum_{i=1}^{3} (i + i^2) = \sum_{i=1}^{3} i + \sum_{i=1}^{3} i^2 = 6 + 14 = 20$

**Combining:**
$$\sum_{i=1}^{n} (c \cdot a_i + d \cdot b_i) = c \sum_{i=1}^{n} a_i + d \sum_{i=1}^{n} b_i$$

### Splitting Sums

A sum can be split at any point:
$$\sum_{i=1}^{n} a_i = \sum_{i=1}^{k} a_i + \sum_{i=k+1}^{n} a_i$$

Example:
$$\sum_{i=1}^{10} i = \sum_{i=1}^{5} i + \sum_{i=6}^{10} i = 15 + 40 = 55$$

### Empty Sums

When the upper bound is less than the lower bound, the sum is empty:
$$\sum_{i=5}^{3} a_i = 0$$

By convention, empty sums equal 0.

## Index Shifting

We can change the range of indices by substitution.

### Shifting Down

To change $\sum_{i=k}^{n} a_i$ to start at 0:

Let $j = i - k$, so $i = j + k$.
When $i = k$, $j = 0$. When $i = n$, $j = n - k$.

$$\sum_{i=k}^{n} a_i = \sum_{j=0}^{n-k} a_{j+k}$$

### Example

$$\sum_{i=3}^{7} i^2 = \sum_{j=0}^{4} (j+3)^2$$

Both equal $9 + 16 + 25 + 36 + 49 = 135$.

### Shifting Up

To change $\sum_{i=0}^{n} a_i$ to start at 1:

Let $j = i + 1$, so $i = j - 1$.

$$\sum_{i=0}^{n} a_i = \sum_{j=1}^{n+1} a_{j-1}$$

## Product Notation

Related to summation is **product notation** using Π (capital pi):

$$\prod_{i=1}^{n} a_i = a_1 \cdot a_2 \cdot a_3 \cdots a_n$$

### Examples

$$\prod_{i=1}^{5} i = 1 \cdot 2 \cdot 3 \cdot 4 \cdot 5 = 120 = 5!$$

$$\prod_{k=0}^{3} 2^k = 2^0 \cdot 2^1 \cdot 2^2 \cdot 2^3 = 1 \cdot 2 \cdot 4 \cdot 8 = 64$$

### Product Properties

$$\prod_{i=1}^{n} c \cdot a_i = c^n \cdot \prod_{i=1}^{n} a_i$$

$$\prod_{i=1}^{n} a_i \cdot b_i = \left(\prod_{i=1}^{n} a_i\right) \cdot \left(\prod_{i=1}^{n} b_i\right)$$

## Common Notational Variations

### Set-Based Summation

$$\sum_{x \in S} f(x)$$

Sum over all elements of set S.

Example: $\sum_{x \in \{1,3,5\}} x^2 = 1 + 9 + 25 = 35$

### Condition-Based Summation

$$\sum_{\substack{1 \leq i \leq 10 \\ i \text{ odd}}} i = 1 + 3 + 5 + 7 + 9 = 25$$

### Omitting Bounds

When clear from context:
$$\sum_i a_i$$

Usually implies summing over all valid indices.

## Writing Sums in Code

```python
# Σ(i=1 to n) i²
total = sum(i**2 for i in range(1, n+1))

# Π(i=1 to n) i = n!
import math
product = math.prod(range(1, n+1))  # Python 3.8+

# Alternative product
product = 1
for i in range(1, n+1):
    product *= i
```

## Common Mistakes

### Off-by-One Errors

$$\sum_{i=1}^{n} a_i \neq \sum_{i=0}^{n} a_i$$

The first has n terms; the second has n+1 terms.

### Variable Confusion in Nested Sums

❌ Wrong: $\sum_{i=1}^{n} \sum_{i=1}^{m} a_{i,i}$

Can't use the same variable for both!

✅ Correct: $\sum_{i=1}^{n} \sum_{j=1}^{m} a_{i,j}$

### Forgetting Empty Sum Convention

$\sum_{i=1}^{0} a_i = 0$ (not undefined)

## Summary

**Summation notation:**
$$\sum_{i=m}^{n} f(i) = f(m) + f(m+1) + \cdots + f(n)$$

**Key properties:**
- Linearity: $\sum c \cdot a_i = c \sum a_i$
- Addition: $\sum (a_i + b_i) = \sum a_i + \sum b_i$
- Splitting: $\sum_{i=1}^{n} = \sum_{i=1}^{k} + \sum_{i=k+1}^{n}$

**Index variable:**
- Dummy variable (name doesn't matter)
- Can be shifted to change bounds

**Empty sum:** equals 0 by convention
