---
id: cs201-t5-sequence
title: "Sequence DP"
order: 5
---

# Dynamic Programming on Sequences

Sequence problems form a core category of DP applications, with elegant solutions for string matching, subsequences, and alignment tasks. These problems arise constantly in text processing, bioinformatics, natural language processing, and data comparison tools. The techniques developed for sequence DP provide a foundation for understanding how to compare, transform, and analyze ordered data.

Sequence DP problems typically involve two strings or sequences, with subproblems corresponding to prefixes of these sequences. The state captures how much of each sequence has been processed, and transitions consider what happens when we extend the processed portion by one character. This structure leads to characteristic O(mn) time and space complexity for problems involving two sequences of lengths m and n.

Understanding sequence DP deeply means recognizing the common patterns—matching versus skipping, costs versus counts, global versus local comparisons—and knowing how to adapt these patterns to new problems. These techniques underpin critical tools like diff, spell checkers, and genome sequence alignment algorithms.

## Longest Common Subsequence (LCS)

The Longest Common Subsequence problem finds the longest sequence of elements that appears in both input sequences in the same order, though not necessarily contiguously. LCS has foundational importance: the Unix `diff` command, version control systems, and plagiarism detection all rely on variants of this algorithm.

**Problem**: Find the longest subsequence common to two sequences.

A subsequence differs from a substring: elements must appear in order but need not be adjacent. For "ABCDEF" and "AEBDF", the LCS is "ABD" with length 3—the A, B, and D appear in order in both strings, though with different characters between them.

### The Recurrence

Let dp[i][j] = length of LCS of X[0..i-1] and Y[0..j-1]. The recurrence captures the key insight: when characters match, we extend the LCS; when they don't, we take the better of skipping a character from either string.

```
dp[i][j] = dp[i-1][j-1] + 1,           if X[i-1] == Y[j-1]
         = max(dp[i-1][j], dp[i][j-1]), otherwise
```

### Implementation

The implementation fills a 2D table bottom-up, with base cases establishing that the LCS with an empty string has length 0.

```python
def lcs(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]
```

### Reconstructing the Actual Subsequence

Often we need not just the length but the actual LCS. Backtracking through the DP table recovers the solution by following the path of decisions that led to the optimal length.

```python
def lcs_string(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Backtrack to find LCS
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            result.append(X[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(result))
```

The backtracking follows the decisions made during the forward pass: when characters match, that character is part of the LCS and we move diagonally. Otherwise, we move in the direction of the larger value.

### Complexity Analysis

- **Time**: O(mn) — we fill each of the mn cells exactly once
- **Space**: O(mn), or O(min(m, n)) if only the length is needed, using the rolling array optimization

## Edit Distance (Levenshtein Distance)

Edit distance measures the minimum number of single-character operations needed to transform one string into another. This metric is fundamental to spell checkers, approximate string matching, DNA sequence comparison, and natural language processing. Vladimir Levenshtein introduced this distance in 1965, and it remains one of the most widely used string metrics.

**Problem**: Minimum operations to transform string A into B.

The allowed operations are: insert a character, delete a character, and replace a character. Each operation has cost 1 in the standard formulation, though weighted variants assign different costs to different operations.

### The Recurrence

Let dp[i][j] = minimum edits to transform A[0..i-1] into B[0..j-1]. When characters match, no operation is needed. Otherwise, we consider all three operations and take the minimum.

```
dp[i][j] = dp[i-1][j-1],               if A[i-1] == B[j-1]
         = 1 + min(dp[i-1][j],         (delete from A)
                   dp[i][j-1],          (insert into A)
                   dp[i-1][j-1])        (replace)
```

### Implementation

The base cases encode the cost of transforming to or from an empty string: deleting all characters or inserting all characters.

```python
def edit_distance(A, B):
    m, n = len(A), len(B)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all
    for j in range(n + 1):
        dp[0][j] = j  # Insert all

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if A[i - 1] == B[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete
                    dp[i][j - 1],      # insert
                    dp[i - 1][j - 1]   # replace
                )

    return dp[m][n]
```

### Variants and Extensions

**Weighted edit distance**: Different operations have different costs. Useful when some operations are more "natural" than others (e.g., adjacent key typos cost less than random character substitutions).

**Damerau-Levenshtein distance**: Adds transposition of adjacent characters (ab → ba) as a fourth operation. This better models common typing errors where adjacent characters are swapped.

## Longest Increasing Subsequence (LIS)

The Longest Increasing Subsequence problem finds the longest subsequence of a sequence such that all elements are in strictly increasing order. This problem appears in patience sorting, scheduling, and as a subroutine in more complex algorithms.

**Problem**: Find the longest strictly increasing subsequence.

### O(n²) Solution

The straightforward DP approach considers each element and finds the longest LIS ending at that position by examining all earlier elements.

```python
def lis_n2(arr):
    n = len(arr)
    dp = [1] * n  # dp[i] = LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```

For each position i, we look at all positions j < i where arr[j] < arr[i], and take the maximum dp[j] + 1. This gives O(n²) time.

### O(n log n) Solution

A more sophisticated approach maintains the smallest possible ending element for each LIS length. This insight enables binary search, reducing time to O(n log n).

```python
import bisect

def lis_nlogn(arr):
    # tails[i] = smallest tail element for LIS of length i+1
    tails = []

    for num in arr:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)
```

**Key insight**: The tails array is always sorted. When we encounter a new element, it either extends the longest LIS (append) or improves some shorter LIS (replace). Binary search finds the correct position in O(log n), giving O(n log n) overall.

## Longest Palindromic Subsequence

Finding the longest subsequence that reads the same forwards and backwards.

**Problem**: Find the longest subsequence that's a palindrome.

**Elegant insight**: LPS(S) = LCS(S, reverse(S)). The longest palindromic subsequence is exactly the longest common subsequence between a string and its reverse. This reduces the problem to the already-solved LCS problem.

Alternatively, we can solve directly with interval DP:

```python
def lps(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]

    # Base: single characters are palindromes of length 1
    for i in range(n):
        dp[i][i] = 1

    # Fill for increasing lengths
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] + 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

    return dp[0][n - 1]
```

The recurrence: if endpoints match, they contribute 2 to the palindrome length plus whatever's inside. If not, we skip one endpoint and take the better option.

## Sequence Alignment

Sequence alignment generalizes edit distance for bioinformatics applications, using scores instead of costs and allowing more nuanced comparison of biological sequences.

### Needleman-Wunsch (Global Alignment)

Global alignment finds the best overall alignment between two entire sequences, commonly used for comparing proteins or genes of similar length.

```python
def global_alignment(A, B, match=1, mismatch=-1, gap=-2):
    m, n = len(A), len(B)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Initialize gaps
    for i in range(m + 1):
        dp[i][0] = i * gap
    for j in range(n + 1):
        dp[0][j] = j * gap

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            score = match if A[i-1] == B[j-1] else mismatch
            dp[i][j] = max(
                dp[i-1][j-1] + score,  # align
                dp[i-1][j] + gap,       # gap in B
                dp[i][j-1] + gap        # gap in A
            )

    return dp[m][n]
```

The key difference from edit distance: we maximize a score rather than minimizing cost, and matches contribute positive value.

### Smith-Waterman (Local Alignment)

Local alignment finds the best matching substrings, ignoring poor-matching regions at the ends. This is crucial for finding functional domains within larger proteins.

```python
def local_alignment(A, B, match=2, mismatch=-1, gap=-1):
    m, n = len(A), len(B)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_score = 0

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            score = match if A[i-1] == B[j-1] else mismatch
            dp[i][j] = max(
                0,                      # restart (key difference)
                dp[i-1][j-1] + score,
                dp[i-1][j] + gap,
                dp[i][j-1] + gap
            )
            max_score = max(max_score, dp[i][j])

    return max_score
```

The critical difference: we can restart with 0 whenever the alignment becomes negative. This allows finding the best local match without penalty for poor-matching regions.

## Distinct Subsequences

This counting problem asks how many ways a target string can be formed as a subsequence of a source string.

**Problem**: Count ways to form target as a subsequence of source.

```python
def num_distinct(source, target):
    m, n = len(source), len(target)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Empty target: one way (take nothing)
    for i in range(m + 1):
        dp[i][0] = 1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i - 1][j]  # Don't use source[i-1]
            if source[i - 1] == target[j - 1]:
                dp[i][j] += dp[i - 1][j - 1]  # Use source[i-1]

    return dp[m][n]
```

When characters match, we can either use the source character (adding ways from dp[i-1][j-1]) or skip it (keeping ways from dp[i-1][j]). When they don't match, we must skip the source character.

## Space Optimization for Sequence DP

Many sequence DPs only need the previous row, enabling space reduction from O(mn) to O(min(m, n)):

```python
def lcs_optimized(X, Y):
    if len(Y) > len(X):
        X, Y = Y, X

    m, n = len(X), len(Y)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev, curr = curr, prev

    return prev[n]
```

This optimization is crucial when sequences are long and memory is limited.

## Applications

| Problem | Real-World Application |
|---------|------------------------|
| LCS | Diff tools, version control, plagiarism detection |
| Edit Distance | Spell checking, DNA matching, fuzzy search |
| LIS | Patience sorting, scheduling, optimal stacking |
| Alignment | Bioinformatics, protein structure prediction |

## Summary

| Problem | Time | Space | Key Insight |
|---------|------|-------|-------------|
| LCS | O(mn) | O(mn) | Match extends, otherwise skip |
| Edit Distance | O(mn) | O(mn) | Three operations, take minimum |
| LIS | O(n log n) | O(n) | Binary search on tails array |
| LPS | O(n²) | O(n²) | LCS with reversed string |
| Alignment | O(mn) | O(mn) | Score-based with possible restart |

Sequence DP problems share common patterns: 2D tables indexed by positions in sequences, choices between matching or skipping characters, and frequent opportunity for space optimization using only the previous row. Mastering these patterns provides tools applicable across string processing, bioinformatics, and text analysis.
