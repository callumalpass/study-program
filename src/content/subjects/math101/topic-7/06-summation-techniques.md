# Summation Techniques

## Telescoping Sums

A **telescoping sum** is one where consecutive terms cancel, leaving only the first and last terms.

### Basic Pattern

$$\sum_{i=1}^{n} (a_i - a_{i+1}) = (a_1 - a_2) + (a_2 - a_3) + \cdots + (a_n - a_{n+1}) = a_1 - a_{n+1}$$

Most intermediate terms cancel!

### Example 1: Simple Telescoping

$$\sum_{i=1}^{n} (i - (i+1)) = \sum_{i=1}^{n} (-1) = -n$$

Or by telescoping: $(1 - (n+1)) = -n$ ✓

### Example 2: Partial Fractions

$$\sum_{i=1}^{n} \frac{1}{i(i+1)}$$

Use partial fractions: $\frac{1}{i(i+1)} = \frac{1}{i} - \frac{1}{i+1}$

$$\sum_{i=1}^{n} \left(\frac{1}{i} - \frac{1}{i+1}\right) = \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \cdots + \left(\frac{1}{n} - \frac{1}{n+1}\right)$$

$$= 1 - \frac{1}{n+1} = \frac{n}{n+1}$$

### Example 3: Difference of Squares

$$\sum_{i=1}^{n} (i^2 - (i-1)^2) = n^2 - 0^2 = n^2$$

Expanding the left side differently:
$$\sum_{i=1}^{n} (2i - 1) = n^2$$

This proves the sum of first n odd numbers is n²!

### Finding Telescoping Forms

To make a sum telescope, look for ways to write the general term as f(i) - f(i+1) or f(i) - f(i-1).

Common techniques:
- Partial fractions: $\frac{1}{i(i+k)} = \frac{1}{k}\left(\frac{1}{i} - \frac{1}{i+k}\right)$
- Difference identities: $a^{i+1} - a^i = a^i(a-1)$

## Index Manipulation

### Shifting Indices

Change the range while preserving the sum's value.

**Shift down by k:**
$$\sum_{i=k}^{n} f(i) = \sum_{j=0}^{n-k} f(j+k)$$

**Example:** Rewrite $\sum_{i=3}^{10} 2^i$ to start at 0:

Let j = i - 3, so i = j + 3:
$$\sum_{j=0}^{7} 2^{j+3} = 2^3 \sum_{j=0}^{7} 2^j = 8 \cdot (2^8 - 1) = 8 \cdot 255 = 2040$$

### Reversing Order

$$\sum_{i=1}^{n} a_i = \sum_{i=1}^{n} a_{n+1-i}$$

Substituting j = n + 1 - i reverses the summation order.

**Application:** Proving the arithmetic series formula by adding a sum to its reversal.

### Changing Variable Names

The index is a dummy variable:
$$\sum_{i=1}^{n} i^2 = \sum_{k=1}^{n} k^2 = \sum_{m=1}^{n} m^2$$

Useful when combining sums with different index names.

## Splitting and Combining Sums

### Splitting at a Point

$$\sum_{i=1}^{n} a_i = \sum_{i=1}^{k} a_i + \sum_{i=k+1}^{n} a_i$$

**Example:** Separate even and odd terms:
$$\sum_{i=1}^{10} i = \sum_{\substack{i=1 \\ i \text{ odd}}}^{9} i + \sum_{\substack{i=2 \\ i \text{ even}}}^{10} i = 25 + 30 = 55$$

### Combining Sums

Sums with the same bounds can be combined:
$$\sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i = \sum_{i=1}^{n} (a_i + b_i)$$

For different bounds, adjust first:
$$\sum_{i=1}^{5} a_i + \sum_{i=3}^{5} b_i$$

Cannot directly combine without making bounds match.

### Extracting Terms

Remove specific terms from a sum:
$$\sum_{i=0}^{n} a_i = a_0 + \sum_{i=1}^{n} a_i$$

$$\sum_{i=1}^{n} a_i = \sum_{i=1}^{n-1} a_i + a_n$$

## Double Summations

### Independent Bounds

When bounds don't depend on each other:
$$\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij} = \sum_{j=1}^{n} \sum_{i=1}^{m} a_{ij}$$

Order can be swapped freely.

### Separable Sums

If the term factors:
$$\sum_{i=1}^{m} \sum_{j=1}^{n} f(i) \cdot g(j) = \left(\sum_{i=1}^{m} f(i)\right) \cdot \left(\sum_{j=1}^{n} g(j)\right)$$

**Example:**
$$\sum_{i=1}^{3} \sum_{j=1}^{4} ij = \left(\sum_{i=1}^{3} i\right) \cdot \left(\sum_{j=1}^{4} j\right) = 6 \cdot 10 = 60$$

### Dependent Bounds

When inner bounds depend on outer index, be careful with order change.

$$\sum_{i=1}^{n} \sum_{j=1}^{i} a_{ij}$$

This sums over the triangular region where j ≤ i.

To swap order, identify the region:
- Originally: i from 1 to n, j from 1 to i
- Swapped: j from 1 to n, i from j to n

$$\sum_{i=1}^{n} \sum_{j=1}^{i} a_{ij} = \sum_{j=1}^{n} \sum_{i=j}^{n} a_{ij}$$

### Example: Counting Pairs

Count ordered pairs (i, j) with 1 ≤ j < i ≤ n:

$$\sum_{i=2}^{n} \sum_{j=1}^{i-1} 1 = \sum_{i=2}^{n} (i-1) = \sum_{k=1}^{n-1} k = \frac{(n-1)n}{2}$$

## Summation by Parts

Analogous to integration by parts:

$$\sum_{k=m}^{n} a_k (b_{k+1} - b_k) = [a_k b_k]_{m}^{n+1} - \sum_{k=m}^{n} b_{k+1}(a_{k+1} - a_k)$$

Or in simpler form:
$$\sum_{k=1}^{n} a_k b_k = A_n b_n - \sum_{k=1}^{n-1} A_k (b_{k+1} - b_k)$$

where $A_k = \sum_{i=1}^{k} a_i$ (partial sum).

## Perturbation Method

To find a closed form, sometimes "perturb" the sum and create an equation.

**Example:** Find $S = \sum_{k=1}^{n} k \cdot 2^k$

Compute 2S:
$$2S = \sum_{k=1}^{n} k \cdot 2^{k+1} = \sum_{k=2}^{n+1} (k-1) \cdot 2^k$$

Subtract:
$$2S - S = S = (n \cdot 2^{n+1}) - \sum_{k=1}^{n} 2^k + 2^1$$

$$S = n \cdot 2^{n+1} - (2^{n+1} - 2) + 2 = (n-1) \cdot 2^{n+1} + 2$$

## Recognizing Patterns

### Arithmetic Pattern Check

If the differences $a_{k+1} - a_k$ are constant, it's arithmetic.

### Geometric Pattern Check

If the ratios $a_{k+1}/a_k$ are constant, it's geometric.

### Polynomial Pattern Check

If the k-th differences are constant, the general term is a polynomial of degree k.

**Example:** 1, 4, 9, 16, 25, ...

First differences: 3, 5, 7, 9 (not constant)
Second differences: 2, 2, 2 (constant!)

So this is quadratic: $a_n = n^2$

## Summary

**Telescoping:**
- Look for f(i) - f(i+1) form
- Partial fractions for rational terms
- Most terms cancel, leaving endpoints

**Index manipulation:**
- Shift bounds with variable substitution
- Reverse order when useful
- Dummy variable can be renamed

**Double sums:**
- Independent bounds: order can swap
- Separable terms: factor into products
- Dependent bounds: carefully identify region

**Advanced techniques:**
- Summation by parts
- Perturbation method
- Pattern recognition
