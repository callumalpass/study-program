# Convex Hull Algorithms: Graham Scan, Jarvis March

Find smallest convex polygon containing all points.

## Problem
**Input**: Set $P$ of $n$ points in plane. **Output**: Vertices of convex hull in order.

## Graham Scan
Sort by polar angle from lowest point. **Scan** maintaining convexity via stack.

**Time**: $O(n \log n)$ (sorting dominates)

## Jarvis March (Gift Wrapping)
Start from leftmost point, repeatedly find next hull vertex (rightmost turn).

**Time**: $O(nh)$ where $h$ = hull size. Better when $h$ small.

## Applications
Collision detection, shape analysis, robotics
