# Closest Pair Problem

The closest pair problem asks: given n points in the plane, which two are nearest to each other? The brute force solution checks all O(n²) pairs, but a beautiful divide-and-conquer algorithm achieves O(n log n). This algorithm exemplifies how geometric insight enables efficient combination of subproblem solutions.

The key challenge is the combine step. After recursively finding closest pairs in left and right halves, we must check for a closer pair spanning the dividing line. Naively, this requires O(n²) comparisons—eliminating all savings from recursion. The geometric insight that saves us: in a strip of width 2δ around the dividing line, any point has at most 7 neighbors within distance δ. This constant bound makes strip checking O(n), enabling the O(n log n) total time.

Understanding the closest pair algorithm builds intuition for computational geometry more broadly. The interplay between algorithmic structure (divide and conquer) and geometric properties (bounded neighbors in sparse regions) recurs in convex hull, Voronoi diagram, and many other geometric algorithms. The technique of maintaining multiple sorted orderings (by x and by y) to avoid re-sorting also appears throughout computational geometry.

## Problem Statement

**Input**: n points in the plane: P = {p₁, p₂, ..., pₙ} where pᵢ = (xᵢ, yᵢ)

**Output**: Two points with minimum Euclidean distance

## Brute Force

Check all pairs:

```python
import math

def closest_pair_brute(points):
    n = len(points)
    min_dist = float('inf')
    closest = None

    for i in range(n):
        for j in range(i + 1, n):
            d = distance(points[i], points[j])
            if d < min_dist:
                min_dist = d
                closest = (points[i], points[j])

    return closest, min_dist

def distance(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)
```

**Time**: O(n²)—must check n(n-1)/2 pairs.

## Divide and Conquer Approach

### High-Level Strategy

1. **Divide**: Split points by x-coordinate into left and right halves
2. **Conquer**: Recursively find closest pairs in each half
3. **Combine**: Check if there's a closer pair spanning the divide

### The Challenge

The combine step seems to require O(n²) work—checking all left-right pairs.

**Key insight**: Only check points within distance δ of the dividing line, where δ is the minimum distance found in the recursive calls.

## The Algorithm

```python
def closest_pair(points):
    # Sort by x-coordinate once
    Px = sorted(points, key=lambda p: p[0])
    Py = sorted(points, key=lambda p: p[1])

    return closest_pair_rec(Px, Py)

def closest_pair_rec(Px, Py):
    n = len(Px)

    # Base case
    if n <= 3:
        return closest_pair_brute(Px)

    # Divide
    mid = n // 2
    Qx = Px[:mid]
    Rx = Px[mid:]

    midpoint = Px[mid][0]

    # Maintain y-sorted lists for each half
    Qy = [p for p in Py if p[0] < midpoint or (p[0] == midpoint and p in Qx)]
    Ry = [p for p in Py if p[0] >= midpoint and p not in Qx or p[0] > midpoint]

    # Conquer
    (q1, q2), delta_q = closest_pair_rec(Qx, Qy)
    (r1, r2), delta_r = closest_pair_rec(Rx, Ry)

    delta = min(delta_q, delta_r)
    best_pair = (q1, q2) if delta_q < delta_r else (r1, r2)

    # Combine: check strip
    strip = [p for p in Py if abs(p[0] - midpoint) < delta]
    strip_result = closest_in_strip(strip, delta, best_pair)

    return strip_result

def closest_in_strip(strip, delta, best_pair):
    min_dist = delta

    for i in range(len(strip)):
        # Only check next 7 points (proven sufficient)
        for j in range(i + 1, min(i + 8, len(strip))):
            if strip[j][1] - strip[i][1] >= delta:
                break
            d = distance(strip[i], strip[j])
            if d < min_dist:
                min_dist = d
                best_pair = (strip[i], strip[j])

    return best_pair, min_dist
```

### Why Only 7 Points?

The crucial observation: in any δ × δ square, there can be at most a constant number of points (since any two points in the same half are at least δ apart).

More precisely, in a δ × 2δ rectangle centered on the dividing line:
- Each half contributes at most 4 points
- Total: at most 8 points, so at most 7 to check after the current point

This makes the strip checking O(n)!

## Analysis

**Recurrence**: T(n) = 2T(n/2) + O(n)

- Two recursive calls of size n/2
- O(n) work for partitioning and strip checking
- Pre-sorting is O(n log n) but done once

**By Master Theorem**: T(n) = O(n log n)

## Correctness Proof

**Claim**: If closest pair spans the dividing line, both points are within δ of the line.

**Proof**:
- Let (p, q) be the closest pair with distance d < δ
- Point p is in left half, q in right half
- Distance in x: |xₚ - xq| ≤ d < δ
- So both are within δ of the midpoint

**Claim**: We only need to check 7 points.

**Proof**:
- Consider point p in strip, sorted by y-coordinate
- Any point q with distance < δ must have |yq - yp| < δ
- In a δ × 2δ rectangle, at most 8 points fit
- (2 columns of 4 non-overlapping δ/2 × δ/2 squares)

## Practical Optimizations

### Avoiding Resorting

Pre-sort both by x and y. Maintain both orderings:

```python
def merge_sorted(left, right, key):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if key(left[i]) <= key(right[j]):
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### Early Termination

If δ is very small early on, fewer points enter the strip.

### Randomized Approach

An alternative O(n) expected time algorithm exists using randomization and hashing.

## Higher Dimensions

### 3D Case

Same divide-and-conquer works:
- Split by x-coordinate
- Check "slab" of width 2δ
- In 3D slab, O(1) points per δ-ball

**Time**: O(n log n) (same as 2D!)

### General d Dimensions

- Constant depends on d: O(c^d) points per region
- Time: O(n log n) for fixed d
- Practical for d ≤ ~20

## Applications

### Computer Graphics

- Collision detection
- Point cloud processing
- Mesh simplification

### Geographic Information Systems

- Finding nearest facilities
- Clustering analysis

### Pattern Recognition

- Nearest neighbor classification
- Anomaly detection

## Related Problems

### All-Pairs Closest

Find closest pair for each point:
- Naive: O(n²)
- Using Voronoi diagrams: O(n log n)

### k-Closest Pairs

Find the k smallest distances:
- Heap-based approach
- Time: O(n log n + k log n)

### Farthest Pair

Find maximum distance:
- Compute convex hull: O(n log n)
- Use rotating calipers: O(n)
- Total: O(n log n)

## Summary

| Problem | Brute Force | Divide & Conquer |
|---------|-------------|------------------|
| 2D Closest Pair | O(n²) | O(n log n) |
| 3D Closest Pair | O(n²) | O(n log n) |
| dD Closest Pair | O(n²) | O(n log n) |
| Farthest Pair | O(n²) | O(n log n) |

The closest pair problem demonstrates how careful geometric analysis (the "7 points" insight) enables an efficient divide-and-conquer algorithm where naive combination would be too slow.
