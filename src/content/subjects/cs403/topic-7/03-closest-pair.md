# Closest Pair of Points

Find pair of points with minimum distance.

## Divide and Conquer
**Recursively** solve left/right halves. **Combine** by checking strip near dividing line.

**Time**: $O(n \log n)$

**Key**: Only need to check 7 points in strip per point.

## Applications
Collision detection, clustering, computer graphics
