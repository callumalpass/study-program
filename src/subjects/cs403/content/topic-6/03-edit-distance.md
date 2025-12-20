# Edit Distance and Sequence Alignment

## Introduction

Edit distance measures the minimum number of operations needed to transform one string into another. This fundamental metric appears throughout computer science and computational biology—from spell checkers to DNA sequence analysis to version control systems.

The dynamic programming solution to edit distance is elegant and efficient, providing not only the distance but also the alignment that achieves it. Understanding this algorithm opens the door to sequence alignment, approximate string matching, and many bioinformatics applications.

## Problem Definition

**Input**: Two strings $S[1..m]$ and $T[1..n]$.

**Operations**:
- **Insert**: Add a character to $S$
- **Delete**: Remove a character from $S$
- **Substitute**: Replace a character in $S$ with a different character

**Goal**: Transform $S$ into $T$ using minimum number of operations.

**Edit distance**: $d(S, T)$ = minimum operations required.

**Variants**:
- Levenshtein distance: All operations cost 1
- Weighted edit distance: Operations have different costs
- Damerau-Levenshtein: Allows transposition (swap adjacent characters)

## Examples

**Example 1**: "kitten" → "sitting"
1. kitten → sitten (substitute k→s)
2. sitten → sittin (substitute e→i)
3. sittin → sitting (insert g)
Edit distance = 3

**Example 2**: "sunday" → "saturday"
1. sunday → sturday (substitute n→r, insert a)
2. sturday → saturday (insert a after s)
Edit distance = 3

## Recursive Structure

**Subproblem**: $D[i,j]$ = edit distance between $S[1..i]$ and $T[1..j]$.

**Base cases**:
- $D[0,j] = j$ (insert $j$ characters to transform empty string to $T[1..j]$)
- $D[i,0] = i$ (delete $i$ characters to transform $S[1..i]$ to empty string)

**Recurrence**:
$$D[i,j] = \min \begin{cases}
D[i-1,j] + 1 & \text{(delete } S[i]) \\
D[i,j-1] + 1 & \text{(insert } T[j]) \\
D[i-1,j-1] + \mathbb{1}[S[i] \neq T[j]] & \text{(match/substitute)}
\end{cases}$$

## Dynamic Programming Solution

```typescript
function editDistance(s: string, t: string): number {
    const m = s.length;
    const n = t.length;

    // D[i][j] = edit distance between s[0..i-1] and t[0..j-1]
    const D: number[][] = Array(m + 1).fill(null)
        .map(() => Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) D[i][0] = i;
    for (let j = 0; j <= n; j++) D[0][j] = j;

    // Fill table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const deleteCost = D[i - 1][j] + 1;
            const insertCost = D[i][j - 1] + 1;
            const matchCost = D[i - 1][j - 1] + (s[i - 1] !== t[j - 1] ? 1 : 0);

            D[i][j] = Math.min(deleteCost, insertCost, matchCost);
        }
    }

    return D[m][n];
}
```

**Time complexity**: $O(mn)$
**Space complexity**: $O(mn)$, reducible to $O(\min(m,n))$

## Space Optimization

Since each row only depends on the previous row, we can use rolling arrays:

```typescript
function editDistanceOptimized(s: string, t: string): number {
    const m = s.length;
    const n = t.length;

    // Ensure t is the shorter string for space efficiency
    if (m < n) return editDistanceOptimized(t, s);

    let prev = Array(n + 1).fill(0).map((_, j) => j);
    let curr = Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        curr[0] = i;

        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
            }
        }

        [prev, curr] = [curr, prev];
    }

    return prev[n];
}
```

**Space complexity**: $O(\min(m,n))$

## Alignment Reconstruction

To find the actual alignment, trace back through the DP table:

```typescript
function getAlignment(s: string, t: string): { aligned1: string; aligned2: string } {
    const m = s.length, n = t.length;
    const D = computeDP(s, t);

    let aligned1 = '', aligned2 = '';
    let i = m, j = n;

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && D[i][j] === D[i-1][j-1] + (s[i-1] !== t[j-1] ? 1 : 0)) {
            aligned1 = s[i-1] + aligned1;
            aligned2 = t[j-1] + aligned2;
            i--; j--;
        } else if (i > 0 && D[i][j] === D[i-1][j] + 1) {
            aligned1 = s[i-1] + aligned1;
            aligned2 = '-' + aligned2;
            i--;
        } else {
            aligned1 = '-' + aligned1;
            aligned2 = t[j-1] + aligned2;
            j--;
        }
    }

    return { aligned1, aligned2 };
}
```

## Weighted Edit Distance

Different operations can have different costs:

```typescript
function weightedEditDistance(
    s: string, t: string,
    insertCost: number,
    deleteCost: number,
    substituteCost: number
): number {
    // ... same structure, use custom costs
    D[i][j] = Math.min(
        D[i-1][j] + deleteCost,
        D[i][j-1] + insertCost,
        D[i-1][j-1] + (s[i-1] !== t[j-1] ? substituteCost : 0)
    );
}
```

## Sequence Alignment in Bioinformatics

DNA/protein alignment uses similar recurrences with biological scoring matrices.

**Global alignment** (Needleman-Wunsch): Align entire sequences.

**Local alignment** (Smith-Waterman): Find best matching subsequences.

**Gap penalties**: Linear gap penalty or affine gap (opening + extension).

## Applications

**Spell checking**: Suggest corrections for misspelled words.

**DNA sequencing**: Align genome sequences, detect mutations.

**Plagiarism detection**: Measure similarity between documents.

**Version control**: Git diff uses longest common subsequence (related algorithm).

**Speech recognition**: Compare phoneme sequences.

**Natural language processing**: Semantic similarity, machine translation evaluation (BLEU score).

## Key Takeaways

- Edit distance measures minimum operations to transform one string to another
- Classic DP: $O(mn)$ time, $O(\min(m,n))$ space with optimization
- Traceback reconstructs the optimal alignment
- Weighted variants handle different operation costs
- Foundation for bioinformatics sequence alignment
- Applications span spell checking, genomics, and NLP
