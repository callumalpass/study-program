# Divide and Conquer

## Introduction

Divide and Conquer is a paradigm for algorithm design that breaks a problem into smaller sub-problems, solves the sub-problems recursively, and then combines their solutions to solve the original problem. This technique is the foundation for some of the most efficient algorithms known, including Merge Sort, Quick Sort, and the Fast Fourier Transform (FFT).

## Learning Objectives

By the end of this topic, you will be able to:
1.  Identify the three steps of the paradigm: **Divide**, **Conquer**, and **Combine**.
2.  Analyze recursive algorithms using **Recurrence Relations**.
3.  Apply the **Master Theorem** to solve recurrences.
4.  Implement classic Divide and Conquer algorithms like Merge Sort and Karatsuba Multiplication.

## Core Concepts

### 1. The D&C Structure

1.  **Divide:** Break the problem into smaller, independent sub-problems of the same type.
2.  **Conquer:** Solve the sub-problems recursively. (Base case: if the problem is small enough, solve it directly).
3.  **Combine:** Merge the solutions of the sub-problems to generate the solution for the original problem.

### 2. Recurrence Relations

The running time $T(n)$ of a D&C algorithm is often expressed as:
$$T(n) = aT(n/b) + f(n)$$
*   $a$: Number of sub-problems.
*   $n/b$: Size of each sub-problem.
*   $f(n)$: Cost to divide the problem and combine the results.

**Example (Merge Sort):**
-   Split array in 2 halves ($a=2, b=2$).
-   Merging takes linear time ($f(n) = O(n)$).
-   $T(n) = 2T(n/2) + O(n)$.

### 3. The Master Theorem

A "cheat sheet" for solving recurrences of the form $T(n) = aT(n/b) + f(n)$ where $f(n) = O(n^d)$.

Compare $a$ vs $b^d$:
1.  If $a > b^d$: $T(n) = O(n^{\log_b a})$ (Recursion dominates).
2.  If $a = b^d$: $T(n) = O(n^d \log n)$ (Work is balanced).
3.  If $a < b^d$: $T(n) = O(n^d)$ (Combination step dominates).

**Merge Sort Analysis:**
$a=2, b=2, d=1$.
$b^d = 2^1 = 2$. Since $a = b^d$, we are in Case 2.
$T(n) = O(n^1 \log n) = O(n \log n)$.

### 4. Code Example: Maximum Subarray Sum

Problem: Find the contiguous subarray with the largest sum.

**Brute Force:** $O(n^2)$.
**Divide and Conquer:** $O(n \log n)$.

Logic: The max subarray is either:
1.  Entirely in the left half.
2.  Entirely in the right half.
3.  Crossing the midpoint.

```python
def max_crossing_sum(arr, low, mid, high):
    # Include elements on left of mid
    sum_left = float('-inf')
    curr_sum = 0
    for i in range(mid, low - 1, -1):
        curr_sum += arr[i]
        if curr_sum > sum_left:
            sum_left = curr_sum
            
    # Include elements on right of mid
    sum_right = float('-inf')
    curr_sum = 0
    for i in range(mid + 1, high + 1):
        curr_sum += arr[i]
        if curr_sum > sum_right:
            sum_right = curr_sum
            
    return sum_left + sum_right

def max_subarray(arr, low, high):
    if low == high:
        return arr[low]
    
    mid = (low + high) // 2
    
    return max(
        max_subarray(arr, low, mid),      # Left max
        max_subarray(arr, mid + 1, high), # Right max
        max_crossing_sum(arr, low, mid, high) # Crossing max
    )
```

## Common Mistakes

1.  **Overlapping Subproblems:** Divide and Conquer works best when sub-problems are *independent*. If they overlap (i.e., you solve the same sub-problem multiple times), you should use **Dynamic Programming** instead.
2.  **Inefficient Base Cases:** recursing down to $n=1$ is fine for theory, but in practice, switching to an iterative approach (like Insertion Sort) for small $n$ (e.g., $n<50$) reduces overhead.
3.  **Ignoring Stack Depth:** Deep recursion can lead to Stack Overflow errors.

## Best Practices

-   **Identify Independence:** Ensure your sub-problems don't share data or states.
-   **Balance is Key:** The algorithm is most efficient when the problem is split evenly ($n/2$). Splitting into $1$ and $n-1$ (like a bad Quick Sort pivot) degrades performance to $O(n^2)$.
-   **Master the Master Theorem:** It saves massive amounts of time in interviews and analysis.

## Summary

Divide and Conquer is a powerful tool for reducing time complexity.
-   It turns linear $O(n)$ search into logarithmic $O(\log n)$.
-   It turns quadratic $O(n^2)$ sorting into linearithmic $O(n \log n)$.
-   It requires careful analysis of the "Combine" step to ensure efficiency.
