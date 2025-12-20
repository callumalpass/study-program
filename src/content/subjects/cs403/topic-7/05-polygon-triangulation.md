# Polygon Triangulation

## Introduction

Polygon triangulation decomposes a polygon into triangles—the simplest polygon that cannot be further subdivided. Every simple polygon with $n$ vertices can be triangulated into exactly $n - 2$ triangles using $n - 3$ diagonals. This fundamental operation enables rendering in computer graphics, finite element analysis, point location, and many other geometric computations.

The challenge lies in achieving this efficiently. The naive ear-clipping method takes $O(n^2)$ time, but sophisticated algorithms achieve the optimal $O(n)$ bound. Understanding the progression from simple to optimal algorithms illustrates key computational geometry techniques: divide-and-conquer, monotone decomposition, and careful case analysis.

## Problem Definition

**Simple polygon**: A closed polygon where edges only intersect at vertices and no edges cross each other.

**Triangulation**: A decomposition into triangles using only vertices of the original polygon, where:
- Triangles cover the entire interior
- Triangle interiors don't overlap
- All edges are either polygon edges or diagonals

**Diagonal**: A line segment connecting two non-adjacent vertices that lies entirely inside the polygon.

**Theorem**: Every simple polygon with $n$ vertices has a triangulation with exactly $n - 2$ triangles.

**Proof sketch**: By induction. Remove one ear (a triangle formed by three consecutive vertices where the diagonal lies inside), reducing to an $(n-1)$-vertex polygon. Base case: a triangle ($n = 3$) needs $1 = 3 - 2$ triangle.

## Ear Clipping Algorithm

An **ear** is a triangle formed by three consecutive vertices $v_{i-1}, v_i, v_{i+1}$ where:
1. The diagonal $v_{i-1}v_{i+1}$ lies inside the polygon
2. No other polygon vertex lies inside the triangle

**Two Ears Theorem**: Every simple polygon with $n \geq 4$ vertices has at least two non-overlapping ears.

**Algorithm**:
1. Find an ear
2. Remove it (output the triangle, delete the middle vertex)
3. Repeat until only a triangle remains

```typescript
function earClipping(polygon: Point[]): Triangle[] {
    const triangles: Triangle[] = [];
    const vertices = [...polygon];

    while (vertices.length > 3) {
        // Find an ear
        for (let i = 0; i < vertices.length; i++) {
            const prev = vertices[(i - 1 + vertices.length) % vertices.length];
            const curr = vertices[i];
            const next = vertices[(i + 1) % vertices.length];

            if (isEar(prev, curr, next, vertices)) {
                triangles.push({ a: prev, b: curr, c: next });
                vertices.splice(i, 1);
                break;
            }
        }
    }

    // Add final triangle
    triangles.push({ a: vertices[0], b: vertices[1], c: vertices[2] });

    return triangles;
}

function isEar(prev: Point, curr: Point, next: Point, polygon: Point[]): boolean {
    // Check if triangle is convex (interior angle < 180°)
    if (orientation(prev, curr, next) <= 0) {
        return false;  // Not a convex vertex
    }

    // Check that no other vertex lies inside the triangle
    for (const v of polygon) {
        if (v === prev || v === curr || v === next) continue;
        if (pointInTriangle(v, prev, curr, next)) {
            return false;
        }
    }

    return true;
}
```

**Time complexity**: $O(n^2)$
- $n - 2$ ears to remove
- $O(n)$ to find each ear (checking all vertices)

**Space complexity**: $O(n)$

## Optimized Ear Clipping

Maintain a list of ear candidates to avoid rescanning:

```typescript
function optimizedEarClipping(polygon: Point[]): Triangle[] {
    const n = polygon.length;
    const vertices = [...polygon];
    const isEarVertex = new Array(n).fill(false);
    const triangles: Triangle[] = [];

    // Initialize ear status for all vertices
    for (let i = 0; i < n; i++) {
        isEarVertex[i] = checkEar(i, vertices);
    }

    let remaining = n;

    while (remaining > 3) {
        // Find an ear
        for (let i = 0; i < vertices.length; i++) {
            if (vertices[i] === null || !isEarVertex[i]) continue;

            const [prevIdx, nextIdx] = getNeighbors(i, vertices);
            const prev = vertices[prevIdx];
            const curr = vertices[i];
            const next = vertices[nextIdx];

            triangles.push({ a: prev, b: curr, c: next });

            // Remove vertex
            vertices[i] = null;
            remaining--;

            // Update ear status of neighbors
            isEarVertex[prevIdx] = checkEar(prevIdx, vertices);
            isEarVertex[nextIdx] = checkEar(nextIdx, vertices);

            break;
        }
    }

    // ... add final triangle

    return triangles;
}
```

**Time complexity**: Still $O(n^2)$ worst case (checking for vertices inside triangle is $O(n)$).

## Monotone Polygon Triangulation

A **monotone polygon** with respect to a direction $d$ is one where every line perpendicular to $d$ intersects the polygon boundary at most twice. A y-monotone polygon has this property for vertical lines.

**Key insight**: Monotone polygons are easy to triangulate in $O(n)$ time.

**Algorithm for y-monotone polygons**:
1. Sort vertices by y-coordinate (they form two chains: left and right)
2. Process vertices top-to-bottom using a stack
3. Add diagonals to create triangles

```typescript
function triangulateMonotone(polygon: Point[]): Triangle[] {
    const triangles: Triangle[] = [];
    const sorted = sortByY(polygon);
    const stack: { vertex: Point; chain: 'left' | 'right' }[] = [];

    stack.push(sorted[0]);
    stack.push(sorted[1]);

    for (let i = 2; i < sorted.length - 1; i++) {
        const current = sorted[i];
        const topChain = stack[stack.length - 1].chain;

        if (current.chain !== topChain) {
            // Different chain: connect to all stack vertices
            while (stack.length > 1) {
                const v1 = stack.pop()!;
                const v2 = stack[stack.length - 1];
                triangles.push(makeTriangle(current.vertex, v1.vertex, v2.vertex));
            }
            stack.pop();
            stack.push(sorted[i - 1]);
            stack.push(current);
        } else {
            // Same chain: pop while diagonal is inside
            const last = stack.pop()!;
            while (stack.length > 0 &&
                   diagonalInside(current.vertex, stack[stack.length - 1].vertex, polygon)) {
                const v = stack.pop()!;
                triangles.push(makeTriangle(current.vertex, last.vertex, v.vertex));
            }
            stack.push(last);
            stack.push(current);
        }
    }

    // Handle last vertex
    // ... connect to remaining stack vertices

    return triangles;
}
```

**Time complexity**: $O(n)$ for monotone polygons.

## General Polygon via Monotone Decomposition

**Strategy**: First decompose the polygon into y-monotone pieces, then triangulate each.

**Decomposition algorithm**: Use sweep line to find vertices where monotonicity breaks:
- **Split vertex**: Interior angle > 180°, both neighbors above
- **Merge vertex**: Interior angle > 180°, both neighbors below

At each split/merge vertex, add a diagonal to maintain monotonicity.

```typescript
function triangulatePolygon(polygon: Point[]): Triangle[] {
    // Step 1: Decompose into y-monotone polygons
    const monotonePieces = makeMonotone(polygon);

    // Step 2: Triangulate each piece
    const triangles: Triangle[] = [];
    for (const piece of monotonePieces) {
        triangles.push(...triangulateMonotone(piece));
    }

    return triangles;
}
```

**Time complexity**: $O(n \log n)$
- Monotone decomposition: $O(n \log n)$ (sweep line with balanced BST)
- Triangulating monotone pieces: $O(n)$ total

## Optimal $O(n)$ Algorithm

Chazelle (1991) proved that simple polygon triangulation can be done in $O(n)$ time. The algorithm is notoriously complex, involving:
- Sophisticated polygon decomposition
- Careful handling of "funnels" and visibility
- Multiple passes with intricate bookkeeping

For practical purposes, the $O(n \log n)$ algorithm is preferred due to its simplicity and good performance.

## Applications

**Computer graphics**: GPUs render triangles natively. All polygons must be triangulated for rendering.

**Finite element analysis**: Mesh generation for numerical simulation requires triangulation of complex domains.

**Point location**: Triangulating a planar subdivision enables efficient point location queries.

**Motion planning**: Triangulating free space aids pathfinding for robots.

**GIS**: Processing and displaying geographic polygons requires triangulation.

**3D modeling**: Surface meshes use triangles as the basic primitive.

## Constrained Triangulation

Sometimes we need triangulations that include specific edges (constraints).

**Constrained Delaunay triangulation**: Maximize minimum angles while including required edges. Useful for terrain modeling with ridgelines and valleys.

**Polygon with holes**: Triangulate exterior while respecting hole boundaries. Handle by adding "bridge" edges from outer boundary to holes.

## Key Takeaways

- Every simple polygon triangulates into $n - 2$ triangles
- Ear clipping: simple $O(n^2)$ algorithm, good for small polygons
- Monotone polygon triangulation: $O(n)$ time
- General polygons: decompose into monotone pieces → $O(n \log n)$
- Optimal $O(n)$ exists but is complex; rarely used in practice
- Triangulation enables graphics rendering, meshing, and spatial queries
- Constrained triangulation adds required edges
