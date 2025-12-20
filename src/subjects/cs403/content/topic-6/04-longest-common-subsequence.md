# Longest Common Subsequence

## Introduction

The longest common subsequence (LCS) problem finds the longest sequence that appears in both input sequences while preserving order but not necessarily contiguity. Unlike substrings which must be consecutive, subsequences can skip elements.

LCS is fundamental to computational biology (comparing DNA sequences), text comparison (diff utilities), and version control systems. Its solution demonstrates classic dynamic programming principles and connects to edit distance through a simple relationship.

## Problem Definition

**Subsequence**: A sequence obtained by deleting zero or more elements from another sequence while maintaining relative order.

**Example**: "ace" is a subsequence of "abcde" (delete b, d).

**Input**: Two sequences $X[1..m]$ and $Y[1..n]$.

**Output**: A longest sequence $Z$ that is a subsequence of both $X$ and $Y$.

**Goal**: Maximize $|Z|$.

## Examples

**Example 1**: $X$ = "ABCBDAB", $Y$ = "BDCAB"
- LCS = "BCAB" (length 4)
- Alternative LCS = "BDAB" (also length 4)

**Example 2**: $X$ = "AGGTAB", $Y$ = "GXTXAYB"
- LCS = "GTAB" (length 4)

## Recursive Structure

**Subproblem**: $L[i,j]$ = length of LCS of $X[1..i]$ and $Y[1..j]$.

**Base case**: $L[i,0] = L[0,j] = 0$ (empty sequence has no common subsequence).

**Recurrence**:
$$L[i,j] = \begin{cases}
L[i-1,j-1] + 1 & \text{if } X[i] = Y[j] \\
\max(L[i-1,j], L[i,j-1]) & \text{otherwise}
\end{cases}$$

**Intuition**: If last characters match, include them in LCS. Otherwise, LCS doesn't include at least one of them.

## Dynamic Programming Solution

```typescript
function lcsLength(x: string, y: string): number {
    const m = x.length;
    const n = y.length;

    // L[i][j] = LCS length of x[0..i-1] and y[0..j-1]
    const L: number[][] = Array(m + 1).fill(null)
        .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (x[i - 1] === y[j - 1]) {
                L[i][j] = L[i - 1][j - 1] + 1;
            } else {
                L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
            }
        }
    }

    return L[m][n];
}
```

**Time complexity**: $O(mn)$
**Space complexity**: $O(mn)$, reducible to $O(\min(m,n))$

## Reconstructing the LCS

Traceback through the DP table to find an actual LCS:

```typescript
function lcs(x: string, y: string): string {
    const m = x.length, n = y.length;
    const L = computeLCSTable(x, y);

    // Traceback
    let result = '';
    let i = m, j = n;

    while (i > 0 && j > 0) {
        if (x[i - 1] === y[j - 1]) {
            result = x[i - 1] + result;
            i--; j--;
        } else if (L[i - 1][j] > L[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return result;
}
```

## Space Optimization

For length only, use two rows:

```typescript
function lcsLengthOptimized(x: string, y: string): number {
    const m = x.length, n = y.length;

    let prev = Array(n + 1).fill(0);
    let curr = Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (x[i - 1] === y[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }

    return prev[n];
}
```

## Connection to Edit Distance

**Theorem**: For strings of lengths $m$ and $n$:
$$\text{edit\_distance}(X, Y) = m + n - 2 \cdot \text{LCS}(X, Y)$$

**Proof**: Transform $X$ to $Y$ by:
1. Delete characters in $X$ not in LCS: $m - |LCS|$ deletions
2. Insert characters in $Y$ not in LCS: $n - |LCS|$ insertions
Total: $(m - |LCS|) + (n - |LCS|) = m + n - 2|LCS|$

## Variants

**Longest Common Substring**: Characters must be contiguous. Use different recurrence.

**Longest Increasing Subsequence (LIS)**: LCS of sequence with its sorted version.

**Multiple Sequence Alignment**: LCS of $k$ sequences. $O(n^k)$ DP—exponential in number of sequences.

**Shortest Common Supersequence (SCS)**: Shortest string containing both as subsequences.
$$|SCS(X,Y)| = m + n - |LCS(X,Y)|$$

## Applications

**Diff utilities**: Git diff, Unix diff compare files line by line using LCS.

**DNA sequence comparison**: Find conserved regions across species.

**Spell checking**: Approximate string matching using LCS similarity.

**Plagiarism detection**: Measure content overlap between documents.

**Version control**: Merge conflicts detected by comparing LCS of branches.

**File comparison**: Beyond line-by-line, character-level LCS for detailed diff.

## Improved Algorithms

For specific inputs, faster algorithms exist:

**Hunt-Szymanski**: $O((n + r) \log n)$ where $r$ = number of matching pairs. Good for similar sequences.

**Four Russians speedup**: $O(mn / \log n)$ for DNA (small alphabet).

**Output-sensitive**: $O(n + |LCS|^2)$ possible for highly similar sequences.

## Key Takeaways

- LCS finds longest sequence present in both inputs (not necessarily contiguous)
- Classic DP: $O(mn)$ time, $O(\min(m,n))$ space
- Directly related to edit distance: $d = m + n - 2|LCS|$
- Traceback reconstructs actual LCS from DP table
- Applications span diff tools, bioinformatics, and version control
- Specialized algorithms improve complexity for structured inputs
