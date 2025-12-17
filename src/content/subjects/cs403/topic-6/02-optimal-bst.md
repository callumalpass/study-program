# Optimal Binary Search Tree

Build BST minimizing expected search cost given access frequencies.

## Problem
**Keys** $k_1 < \cdots < k_n$ with frequencies $f_i$. **Cost**: depth of key × frequency.

## DP Formulation
$$e[i,j] = \min_{r=i}^{j} (e[i,r-1] + e[r+1,j] + w[i,j])$$

where $w[i,j] = \sum_{k=i}^{j} f_k$

**Time**: $O(n^3)$, improved to $O(n^2)$ with Knuth optimization

## Applications
Compiler symbol tables, database indexing
