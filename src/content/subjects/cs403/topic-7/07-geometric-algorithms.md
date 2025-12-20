# Advanced Geometric Algorithms

## Introduction

Beyond the fundamental problems of convex hulls, intersections, and Voronoi diagrams lies a rich landscape of geometric algorithms addressing varied computational challenges. This chapter covers essential techniques including point-in-polygon testing, convex hull in higher dimensions, half-plane intersection, and visibility computation.

These algorithms share common themes: reducing geometric problems to combinatorial ones, exploiting duality between points and lines, and applying the sweep line paradigm. Understanding these connections reveals computational geometry as a unified field rather than a collection of isolated problems.

## Point in Polygon

Given a point $q$ and a polygon $P$, determine whether $q$ lies inside, outside, or on the boundary of $P$.

### Ray Casting Method

Cast a ray from $q$ in any direction and count edge crossings:
- **Odd crossings**: inside
- **Even crossings**: outside

```typescript
function pointInPolygon(q: Point, polygon: Point[]): 'inside' | 'outside' | 'boundary' {
    const n = polygon.length;
    let crossings = 0;

    for (let i = 0; i < n; i++) {
        const p1 = polygon[i];
        const p2 = polygon[(i + 1) % n];

        // Check if point is on edge
        if (pointOnSegment(q, p1, p2)) {
            return 'boundary';
        }

        // Check if horizontal ray from q crosses edge
        if ((p1.y > q.y) !== (p2.y > q.y)) {
            // Compute x-coordinate of intersection
            const xIntersect = (p2.x - p1.x) * (q.y - p1.y) / (p2.y - p1.y) + p1.x;

            if (q.x < xIntersect) {
                crossings++;
            }
        }
    }

    return crossings % 2 === 1 ? 'inside' : 'outside';
}
```

**Time**: $O(n)$ for a polygon with $n$ edges.

**Handling degeneracies**: When the ray passes through a vertex, count carefully—typically treat as crossing only if the adjacent edges are on opposite sides of the ray.

### Winding Number Method

Count how many times the polygon winds around the point:

```typescript
function windingNumber(q: Point, polygon: Point[]): number {
    let winding = 0;

    for (let i = 0; i < polygon.length; i++) {
        const p1 = polygon[i];
        const p2 = polygon[(i + 1) % polygon.length];

        if (p1.y <= q.y) {
            if (p2.y > q.y && isLeft(p1, p2, q) > 0) {
                winding++;
            }
        } else {
            if (p2.y <= q.y && isLeft(p1, p2, q) < 0) {
                winding--;
            }
        }
    }

    return winding;  // Non-zero means inside
}
```

**Advantage**: Handles self-intersecting polygons correctly.

## Convex Hull in 3D

Extending convex hull to three dimensions produces a convex polyhedron.

### Incremental Algorithm

Add points one at a time, maintaining the convex hull:

```typescript
function convexHull3D(points: Point3D[]): ConvexPolyhedron {
    // Start with tetrahedron from first 4 non-coplanar points
    const hull = initialTetrahedron(points);

    for (let i = 4; i < points.length; i++) {
        const p = points[i];

        if (isInsideHull(p, hull)) continue;

        // Find visible faces (faces where p is on the outside)
        const visibleFaces = hull.faces.filter(f =>
            dotProduct(f.normal, subtract(p, f.vertex)) > 0
        );

        // Find horizon edges (boundary of visible region)
        const horizon = findHorizonEdges(visibleFaces);

        // Remove visible faces
        for (const face of visibleFaces) {
            hull.removeFace(face);
        }

        // Add new faces connecting p to horizon
        for (const edge of horizon) {
            hull.addFace(new Face(edge.p1, edge.p2, p));
        }
    }

    return hull;
}
```

**Expected time**: $O(n \log n)$

**Worst case**: $O(n^2)$ when many faces are visible at each step.

### Gift Wrapping in 3D

Extend Jarvis march: instead of finding the next edge, find the next face.

**Time**: $O(nf)$ where $f$ is the number of faces.

### Divide and Conquer

Split points, recursively compute hulls, merge. The merge step is complex in 3D.

**Time**: $O(n \log n)$

## Half-Plane Intersection

Given $n$ half-planes, compute their intersection (a convex polygon, possibly unbounded).

**Half-plane**: $H = \{(x, y) : ax + by \leq c\}$

### Incremental Algorithm

```typescript
function halfPlaneIntersection(halfPlanes: HalfPlane[]): ConvexPolygon | null {
    // Start with a large bounding box
    let region = createBoundingBox();

    for (const hp of halfPlanes) {
        region = intersectWithHalfPlane(region, hp);

        if (region === null || region.isEmpty()) {
            return null;  // Intersection is empty
        }
    }

    return region;
}

function intersectWithHalfPlane(polygon: ConvexPolygon, hp: HalfPlane): ConvexPolygon {
    const result: Point[] = [];

    for (let i = 0; i < polygon.vertices.length; i++) {
        const curr = polygon.vertices[i];
        const next = polygon.vertices[(i + 1) % polygon.vertices.length];

        const currInside = hp.contains(curr);
        const nextInside = hp.contains(next);

        if (currInside) {
            result.push(curr);
        }

        if (currInside !== nextInside) {
            // Edge crosses half-plane boundary
            const intersection = hp.intersectEdge(curr, next);
            result.push(intersection);
        }
    }

    return new ConvexPolygon(result);
}
```

**Time**: $O(n^2)$ for incremental algorithm.

### Divide and Conquer

Sort half-planes by angle, recursively intersect halves, merge.

**Time**: $O(n \log n)$

### Applications

**Linear programming**: Feasible region of a 2D LP is a half-plane intersection.

**Voronoi diagrams**: Each Voronoi cell is an intersection of half-planes.

**Visibility**: Region visible from a point is bounded by half-planes.

## Visibility Algorithms

### Visibility Polygon

Given a point $p$ inside a simple polygon $P$, compute the region visible from $p$.

**Rotational sweep**: Rotate a ray from $p$, tracking which edge is currently visible.

```typescript
function visibilityPolygon(p: Point, polygon: Polygon): Polygon {
    const events: Event[] = [];

    // Create events for each vertex
    for (let i = 0; i < polygon.vertices.length; i++) {
        const v = polygon.vertices[i];
        const angle = Math.atan2(v.y - p.y, v.x - p.x);
        events.push({ type: 'vertex', vertex: v, angle, edgeIndex: i });
    }

    events.sort((a, b) => a.angle - b.angle);

    // Sweep, maintaining visible edges in a balanced BST
    const visibleEdges = new BalancedBST(/* ordered by distance to p */);
    const result: Point[] = [];

    for (const event of events) {
        // Update visible edges based on event type
        // Add visibility polygon vertices
    }

    return new Polygon(result);
}
```

**Time**: $O(n \log n)$

### Art Gallery Problem

How many guards are needed to see all points in a polygon?

**Theorem (Chvátal)**: $\lfloor n/3 \rfloor$ guards are always sufficient and sometimes necessary for a simple polygon with $n$ vertices.

**Proof idea**: Triangulate the polygon, 3-color vertices, place guards at vertices of the smallest color class.

## Geometric Duality

Many geometric problems have elegant dual formulations.

### Point-Line Duality

Standard duality maps:
- Point $(a, b)$ ↔ Line $y = ax - b$
- Point on line ↔ Line through point

**Applications**:
- Find line through most points → Find point on most lines
- Convex hull of points ↔ Upper/lower envelope of lines

### Arrangements

An **arrangement** of lines is the planar subdivision created by $n$ lines.

**Complexity**: $O(n^2)$ vertices, edges, and faces.

**Zone theorem**: The complexity of a single line's zone (faces it touches) is $O(n)$.

```typescript
function constructArrangement(lines: Line[]): Arrangement {
    const arr = new Arrangement();

    for (const line of lines) {
        // Find all intersections with existing arrangement
        const zone = arr.computeZone(line);

        // Update arrangement by splitting faces
        for (const face of zone) {
            arr.splitFace(face, line);
        }
    }

    return arr;
}
```

**Time**: $O(n^2)$ using the zone theorem.

## Minkowski Sum

The **Minkowski sum** of polygons $P$ and $Q$ is:
$$P \oplus Q = \{p + q : p \in P, q \in Q\}$$

### Convex Polygons

For convex polygons, merge sorted vertex sequences:

```typescript
function minkowskiSumConvex(P: ConvexPolygon, Q: ConvexPolygon): ConvexPolygon {
    // Start from bottom-left vertices
    let i = 0, j = 0;
    const result: Point[] = [];

    do {
        result.push(add(P.vertices[i], Q.vertices[j]));

        // Advance along edge with smaller outward angle
        const angleP = edgeAngle(P, i);
        const angleQ = edgeAngle(Q, j);

        if (angleP < angleQ) {
            i = (i + 1) % P.vertices.length;
        } else if (angleQ < angleP) {
            j = (j + 1) % Q.vertices.length;
        } else {
            i = (i + 1) % P.vertices.length;
            j = (j + 1) % Q.vertices.length;
        }
    } while (i !== 0 || j !== 0);

    return new ConvexPolygon(result);
}
```

**Time**: $O(n + m)$ for polygons with $n$ and $m$ vertices.

### Applications

**Motion planning**: Robot footprint $R$ can reach configuration $c$ without colliding with obstacle $O$ iff $c \notin O \oplus (-R)$.

**Collision detection**: Objects $A$ and $B$ collide iff origin is inside $A \oplus (-B)$.

## Key Takeaways

- Point-in-polygon: ray casting ($O(n)$) or winding number
- 3D convex hull: incremental or divide-and-conquer, $O(n \log n)$
- Half-plane intersection computes LP feasible regions
- Visibility polygon via rotational sweep, $O(n \log n)$
- Point-line duality transforms problems elegantly
- Minkowski sums enable motion planning and collision detection
- Core techniques: sweep line, divide-and-conquer, duality, incremental construction
