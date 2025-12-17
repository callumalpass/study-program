# Line Segment Intersection: Sweep Line Algorithm

Find all intersections among $n$ line segments.

## Naive
Check all pairs: $O(n^2)$

## Sweep Line
Sweep vertical line left-to-right. **Events**: Segment start/end, intersections. **Status**: Active segments.

**Time**: $O((n+k) \log n)$ where $k$ = intersections

## Applications
Map overlay, circuit design, collision detection
