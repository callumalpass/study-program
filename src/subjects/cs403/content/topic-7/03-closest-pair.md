# Closest Pair of Points

## Introduction

Given $n$ points in the plane, find the pair with minimum Euclidean distance. This fundamental problem appears throughout computational geometry, machine learning, and spatial databases. The brute-force $O(n^2)$ solution checks all pairs, but a clever divide-and-conquer algorithm achieves $O(n \log n)$ time.

The closest pair algorithm demonstrates several important algorithmic principles: divide-and-conquer strategy, the "combine" step requiring careful geometric analysis, and pre-sorting to avoid repeated work. The key insight—that we only need to check a constant number of points when combining subproblems—is what makes the optimal complexity achievable.

## Problem Definition

**Input**: A set $P$ of $n$ points in the plane, where each point $p_i = (x_i, y_i)$.

**Output**: A pair of points $(p, q)$ minimizing the Euclidean distance $d(p, q) = \sqrt{(p.x - q.x)^2 + (p.y - q.y)^2}$.

**Assumption**: All points are distinct. If duplicates exist, the minimum distance is zero.

## Brute Force Approach

Check every pair of points and track the minimum:

```typescript
function closestPairBruteForce(points: Point[]): [Point, Point] {
    let minDist = Infinity;
    let closest: [Point, Point] = [points[0], points[1]];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dist = distance(points[i], points[j]);
            if (dist < minDist) {
                minDist = dist;
                closest = [points[i], points[j]];
            }
        }
    }

    return closest;
}
```

**Time complexity**: $O(n^2)$ — checking $\binom{n}{2}$ pairs.

**Space complexity**: $O(1)$ additional space.

For small $n$, this is acceptable. For large point sets, we need something better.

## Divide and Conquer Strategy

**Divide**: Split points into left and right halves by x-coordinate.

**Conquer**: Recursively find closest pairs in each half.

**Combine**: Check for a closer pair that crosses the dividing line.

The challenge is the combine step. Naively, it could check all $O(n^2)$ cross pairs. The key insight is that we only need to check a small strip around the dividing line, and within that strip, each point has only a constant number of candidates.

## The Key Geometric Lemma

**Lemma**: Let $\delta$ be the minimum distance found in left and right halves. In the strip of width $2\delta$ centered on the dividing line, each point needs to be compared with at most 7 other points.

**Proof sketch**: Consider a $\delta \times 2\delta$ rectangle in the strip. Any two points in the same half of this rectangle are at distance less than $\delta$, contradicting our assumption. Thus, each half can contain at most 4 points (one in each $\delta/2 \times \delta/2$ quadrant). Total: at most 8 points per rectangle, so at most 7 comparisons per point.

**Consequence**: The combine step takes $O(n)$ time, not $O(n^2)$.

## Algorithm Implementation

```typescript
function closestPair(points: Point[]): [Point, Point, number] {
    // Pre-sort by x and y coordinates
    const Px = [...points].sort((a, b) => a.x - b.x);
    const Py = [...points].sort((a, b) => a.y - b.y);

    return closestPairRec(Px, Py);
}

function closestPairRec(Px: Point[], Py: Point[]): [Point, Point, number] {
    const n = Px.length;

    // Base case: brute force for small inputs
    if (n <= 3) {
        return closestPairBase(Px);
    }

    // Divide: split by x-coordinate
    const mid = Math.floor(n / 2);
    const midPoint = Px[mid];

    // Partition Px into left and right
    const Qx = Px.slice(0, mid);
    const Rx = Px.slice(mid);

    // Partition Py while maintaining y-sorted order
    const Qy: Point[] = [];
    const Ry: Point[] = [];
    for (const p of Py) {
        if (p.x < midPoint.x || (p.x === midPoint.x && p.y < midPoint.y)) {
            Qy.push(p);
        } else {
            Ry.push(p);
        }
    }

    // Conquer: recurse on left and right halves
    const [p1, q1, delta1] = closestPairRec(Qx, Qy);
    const [p2, q2, delta2] = closestPairRec(Rx, Ry);

    // Take the better of the two recursive results
    let [bestP, bestQ, delta] = delta1 < delta2
        ? [p1, q1, delta1]
        : [p2, q2, delta2];

    // Combine: check strip for closer cross-pairs
    const [crossP, crossQ, crossDelta] = closestInStrip(Py, midPoint, delta);

    if (crossDelta < delta) {
        return [crossP, crossQ, crossDelta];
    }

    return [bestP, bestQ, delta];
}

function closestInStrip(
    Py: Point[],
    midPoint: Point,
    delta: number
): [Point, Point, number] {
    // Build strip: points within delta of midpoint.x
    const strip = Py.filter(p => Math.abs(p.x - midPoint.x) < delta);

    let minDist = delta;
    let bestP = strip[0], bestQ = strip[1];

    // Check each point against next few points in y-sorted order
    for (let i = 0; i < strip.length; i++) {
        // Only need to check points within delta in y-coordinate
        for (let j = i + 1; j < strip.length && strip[j].y - strip[i].y < delta; j++) {
            const dist = distance(strip[i], strip[j]);
            if (dist < minDist) {
                minDist = dist;
                bestP = strip[i];
                bestQ = strip[j];
            }
        }
    }

    return [bestP, bestQ, minDist];
}
```

## Complexity Analysis

**Recurrence**: $T(n) = 2T(n/2) + O(n)$

The $O(n)$ combine step includes:
- Building the strip: $O(n)$
- Checking strip pairs: $O(n)$ (at most 7 comparisons per point)

**Solution**: By the Master Theorem, $T(n) = O(n \log n)$.

**Pre-sorting**: Sorting Px and Py takes $O(n \log n)$.

**Total time**: $O(n \log n)$.

**Space complexity**: $O(n)$ for the sorted arrays and recursion stack.

## Why Only 7 Comparisons?

This is the critical insight that makes the algorithm work.

Consider a point $p$ in the strip. Any point closer than $\delta$ must lie in a $\delta \times 2\delta$ rectangle centered at $p$'s x-coordinate.

Divide this rectangle into eight $\delta/2 \times \delta/2$ squares. If two points are in the same square, their distance is at most $\sqrt{2} \cdot \delta/2 = \delta/\sqrt{2} < \delta$. But we know all pairs in the same half are at distance $\geq \delta$. Therefore, each square contains at most one point from each half.

Total points in rectangle (excluding $p$): at most 7. Thus, we check at most 7 points per strip point.

## Variants and Extensions

**Randomized approach**: Pick a random sample, compute their closest pair, use it to filter. Expected $O(n)$ time, but more complex.

**Higher dimensions**: The divide-and-conquer extends to $d$ dimensions with time $O(n \log^{d-1} n)$. The constant in the strip analysis grows exponentially with dimension.

**k closest pairs**: Find the $k$ pairs with smallest distances. Can be done in $O(n \log n + k)$ time using persistent data structures.

**Closest bichromatic pair**: Points colored red/blue; find closest pair with different colors. Same technique applies.

## Handling Edge Cases

**Duplicate points**: Return distance 0 immediately if detected during pre-sorting.

**Collinear points**: The algorithm handles this correctly; collinearity doesn't affect the analysis.

**Numerical precision**: Use squared distances to avoid floating-point errors from square roots. Compare distances as squares.

```typescript
function distanceSquared(p: Point, q: Point): number {
    const dx = p.x - q.x;
    const dy = p.y - q.y;
    return dx * dx + dy * dy;
}
```

## Applications

**Collision detection**: In simulations and games, finding closest objects quickly enables efficient collision response.

**Clustering**: Many clustering algorithms (like DBSCAN) need nearest neighbor information; closest pair is a starting point.

**Computational biology**: Finding similar gene sequences or protein structures.

**Computer graphics**: Mesh simplification, point cloud processing, and rendering optimization.

**Geographic information systems**: Finding nearest facilities, determining coverage gaps.

**Machine learning**: k-nearest neighbors classification relies on efficient distance computations.

## Key Takeaways

- Divide-and-conquer achieves $O(n \log n)$ vs. brute-force $O(n^2)$
- Key insight: only 7 comparisons needed per point in the combine step
- Pre-sorting by x and y coordinates enables linear-time merging
- Geometric analysis proves the constant 7 bound rigorously
- Extends to higher dimensions with increasing complexity
- Applications span graphics, GIS, ML, and computational biology
