# Flow Applications: Project Selection, Closure Problems

Flow algorithms solve diverse optimization problems via clever reductions.

## Project Selection
**Given**: Projects with profits, dependencies. **Goal**: Select subset maximizing profit subject to dependencies.

**Reduction**: Min-cut problem. Positive profits from source, negative to sink, dependencies with $\infty$ capacity.

## Image Segmentation
**Partition** image pixels into foreground/background. **Reduction**: Min-cut where edge weights reflect similarity.

## Conclusion
Network flow framework unifies many optimization problems through creative modeling.
