# DP Optimizations: Convex Hull, Divide-and-Conquer

Speedup DP using structural properties.

## Knuth Optimization
If $a[i,k] \leq a[i,k+1]$, reduce $O(n^3)$ to $O(n^2)$.

**Applications**: Optimal BST, matrix chain

## Convex Hull Trick
Maintain convex hull of linear functions for $O(\log n)$ min/max queries.

**Applications**: Least squares fitting, line breaking

## Divide and Conquer Optimization
If optimal split point is monotonic. Reduce $O(n^3)$ to $O(n^2 \log n)$.
