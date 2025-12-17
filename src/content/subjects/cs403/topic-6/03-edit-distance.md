# Edit Distance and Sequence Alignment

Minimum edits to transform one string to another - fundamental in bioinformatics and NLP.

## Problem
**Operations**: Insert, delete, substitute (costs $c_i, c_d, c_s$). **Goal**: Min cost transformation.

## DP Solution  
$$D[i,j] = \min \begin{cases}
D[i-1,j] + c_d \\
D[i,j-1] + c_i \\
D[i-1,j-1] + c_s[s_i \neq t_j]
\end{cases}$$

**Time**: $O(nm)$, **Space**: $O(\min(n,m))$ with rolling array

## Applications
Spell checking, DNA sequencing, diff tools
