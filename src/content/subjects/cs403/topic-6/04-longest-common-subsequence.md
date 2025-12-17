# Longest Common Subsequence

Find longest subsequence common to two sequences.

## Problem
**Sequences** $X[1..m], Y[1..n]$. **Subsequence**: Delete elements (maintain order). **Goal**: Max length common subsequence.

## DP
$$L[i,j] = \begin{cases}
L[i-1,j-1] + 1 & X[i] = Y[j] \\
\max(L[i-1,j], L[i,j-1]) & \text{otherwise}
\end{cases}$$

**Time**: $O(mn)$

## Applications
Version control (diff), plagiarism detection, DNA comparison
