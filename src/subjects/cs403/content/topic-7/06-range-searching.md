# Range Searching: Kd-Trees and Range Trees

## Introduction

Range searching answers the fundamental query: given a set of points and a query region, which points lie inside? This operation appears constantly in databases, geographic information systems, computer graphics, and computational biology. The challenge is preprocessing points so that queries are fast, even when the point set is large.

Naive iteration through all points takes $O(n)$ per query—acceptable occasionally but prohibitive for repeated queries. Spatial data structures like kd-trees and range trees achieve $O(\sqrt{n} + k)$ to $O(\log^d n + k)$ query time, where $k$ is the output size. The trade-off between construction time, space, and query time leads to different structures for different scenarios.

## Problem Definition

**Input**: A set $P$ of $n$ points in $d$-dimensional space.

**Query**: Given an axis-aligned rectangular region $R = [x_1, x_2] \times [y_1, y_2] \times \cdots$, report all points $p \in P$ with $p \in R$.

**Variants**:
- **Reporting**: Return all points in range
- **Counting**: Return the number of points in range
- **Existence**: Is there any point in range?

**Performance measures**:
- **Preprocessing time**: Time to build the data structure
- **Space**: Storage required
- **Query time**: Time to answer a query (usually expressed as $O(f(n) + k)$ where $k$ is output size)

## Kd-Trees

A **kd-tree** (k-dimensional tree) recursively partitions space using axis-aligned hyperplanes, alternating between dimensions.

### Construction

```typescript
class KdTree {
    private root: KdNode | null = null;

    constructor(points: Point[]) {
        this.root = this.build(points, 0);
    }

    private build(points: Point[], depth: number): KdNode | null {
        if (points.length === 0) return null;

        const dim = depth % this.dimensions;

        // Sort by current dimension and pick median
        points.sort((a, b) => a[dim] - b[dim]);
        const medianIdx = Math.floor(points.length / 2);

        return {
            point: points[medianIdx],
            splitDim: dim,
            left: this.build(points.slice(0, medianIdx), depth + 1),
            right: this.build(points.slice(medianIdx + 1), depth + 1)
        };
    }
}
```

**Construction time**: $O(n \log n)$ using median-of-medians for linear median finding, or $O(n \log^2 n)$ with simple sorting.

**Space**: $O(n)$

### Range Query

```typescript
rangeQuery(node: KdNode, range: Range, results: Point[]): void {
    if (node === null) return;

    // Check if current point is in range
    if (this.pointInRange(node.point, range)) {
        results.push(node.point);
    }

    const dim = node.splitDim;
    const splitValue = node.point[dim];

    // Recurse on children that might contain points in range
    if (range.min[dim] <= splitValue) {
        this.rangeQuery(node.left, range, results);
    }
    if (range.max[dim] >= splitValue) {
        this.rangeQuery(node.right, range, results);
    }
}
```

**Query time**: $O(\sqrt{n} + k)$ for 2D, $O(n^{1-1/d} + k)$ for $d$ dimensions.

**Intuition**: The query visits all nodes whose region intersects the query rectangle. In 2D, about $O(\sqrt{n})$ nodes are visited even if the query returns nothing.

### Nearest Neighbor Search

Kd-trees also support nearest neighbor queries:

```typescript
nearestNeighbor(query: Point): Point {
    let best: Point = this.root.point;
    let bestDist = Infinity;

    const search = (node: KdNode | null): void => {
        if (node === null) return;

        const dist = distance(query, node.point);
        if (dist < bestDist) {
            bestDist = dist;
            best = node.point;
        }

        const dim = node.splitDim;
        const diff = query[dim] - node.point[dim];

        // Search the side containing the query point first
        const first = diff < 0 ? node.left : node.right;
        const second = diff < 0 ? node.right : node.left;

        search(first);

        // Only search the other side if it could contain a closer point
        if (Math.abs(diff) < bestDist) {
            search(second);
        }
    };

    search(this.root);
    return best;
}
```

**Average time**: $O(\log n)$, **Worst case**: $O(n)$

## Range Trees

Range trees achieve better query time by using more space. A **range tree** is a balanced BST on one coordinate, where each node stores a secondary structure for the remaining coordinates.

### 1D Range Tree

Just a balanced BST:

```typescript
class RangeTree1D {
    private root: BSTreeNode;

    rangeQuery(lo: number, hi: number): Point[] {
        const splitNode = this.findSplitNode(lo, hi);
        const results: Point[] = [];

        // Left subtree: report all in right subtrees along path to lo
        // Right subtree: report all in left subtrees along path to hi
        // Plus check boundary nodes

        return results;
    }
}
```

**Query time**: $O(\log n + k)$

### 2D Range Tree

```typescript
class RangeTree2D {
    private root: RangeTreeNode;

    constructor(points: Point[]) {
        this.root = this.build(points);
    }

    private build(points: Point[]): RangeTreeNode {
        if (points.length === 0) return null;

        // Sort by x-coordinate
        points.sort((a, b) => a.x - b.x);
        const medianIdx = Math.floor(points.length / 2);

        const node: RangeTreeNode = {
            point: points[medianIdx],
            // Secondary structure: 1D range tree on y-coordinate
            yTree: new RangeTree1D(points, 'y'),
            left: this.build(points.slice(0, medianIdx)),
            right: this.build(points.slice(medianIdx + 1))
        };

        return node;
    }

    rangeQuery(xLo: number, xHi: number, yLo: number, yHi: number): Point[] {
        const results: Point[] = [];

        // Find nodes in x-range
        const xNodes = this.findNodesInXRange(xLo, xHi);

        // For each such node, query its y-tree
        for (const node of xNodes) {
            results.push(...node.yTree.rangeQuery(yLo, yHi));
        }

        return results;
    }
}
```

**Space**: $O(n \log n)$ — each point appears in $O(\log n)$ secondary structures.

**Query time**: $O(\log^2 n + k)$

### Fractional Cascading

Fractional cascading improves query time by linking secondary structures:

**Idea**: Instead of searching each secondary structure independently, precompute links between them.

**Result**: Query time improves to $O(\log n + k)$ for 2D.

### Higher Dimensions

For $d$ dimensions:
- **Space**: $O(n \log^{d-1} n)$
- **Query time**: $O(\log^d n + k)$ without fractional cascading, $O(\log^{d-1} n + k)$ with

## Comparison

| Structure | Space | Query Time (2D) | Build Time |
|-----------|-------|-----------------|------------|
| Naive | $O(n)$ | $O(n)$ | $O(1)$ |
| Kd-tree | $O(n)$ | $O(\sqrt{n} + k)$ | $O(n \log n)$ |
| Range tree | $O(n \log n)$ | $O(\log^2 n + k)$ | $O(n \log n)$ |
| Range tree + FC | $O(n \log n)$ | $O(\log n + k)$ | $O(n \log n)$ |

**When to use kd-trees**: Space-constrained, moderate query frequency, low dimensions.

**When to use range trees**: Query-intensive applications, willing to use more space.

## Other Range Searching Structures

**R-trees**: Used in databases for spatial indexing. Handle rectangles and polygons, not just points.

**Quadtrees/Octrees**: Recursive space decomposition; simpler but less balanced than kd-trees.

**Interval trees**: 1D structure for overlapping interval queries.

**Segment trees**: Support range queries with updates.

## Applications

**Database queries**: "Find all customers within 50 miles" or "all transactions between dates."

**Geographic Information Systems**: Spatial queries on maps, finding features in a region.

**Collision detection**: Find objects in a region for potential collision checks.

**Computer graphics**: Frustum culling, ray tracing acceleration.

**Computational biology**: Finding genes in a chromosomal region, protein database search.

**Machine learning**: k-nearest neighbors, clustering, spatial statistics.

## Dynamic Range Searching

Static structures assume the point set doesn't change. Dynamic versions support insertions and deletions:

**Dynamic kd-trees**: Rebalancing strategies; complexity varies.

**Weight-balanced trees**: Maintain balance with amortized logarithmic updates.

**Logarithmic method**: Combine multiple static structures to support insertions.

## Key Takeaways

- Range searching finds all points in a query region
- Kd-trees: $O(n)$ space, $O(\sqrt{n} + k)$ query time in 2D
- Range trees: $O(n \log n)$ space, $O(\log^2 n + k)$ query time
- Fractional cascading improves range tree queries to $O(\log n + k)$
- Trade-off between space and query efficiency
- Higher dimensions increase query complexity exponentially
- Applications span databases, GIS, graphics, and scientific computing
