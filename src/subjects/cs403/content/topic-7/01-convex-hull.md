# Convex Hull Algorithms: Graham Scan and Jarvis March

## Introduction

The convex hull of a point set is the smallest convex polygon that contains all points—imagine stretching a rubber band around nails on a board. This fundamental geometric structure appears throughout computer graphics, robotics, pattern recognition, and geographic information systems.

Computing convex hulls efficiently requires clever algorithmic techniques. We examine two classic approaches: Graham scan, which achieves optimal $O(n \log n)$ time through sorting and linear scanning, and Jarvis march (gift wrapping), which achieves output-sensitive $O(nh)$ time where $h$ is the hull size. Understanding when each algorithm excels reveals important lessons about algorithm design.

## Problem Definition

**Input**: A set $P$ of $n$ points in the plane, where each point $p_i = (x_i, y_i)$.

**Output**: The vertices of the convex hull in counterclockwise order.

**Convex hull**: The smallest convex polygon containing all points. Equivalently:
- Intersection of all convex sets containing $P$
- Intersection of all half-planes containing $P$
- Set of all convex combinations of points in $P$

A polygon is convex if every line segment connecting two points inside the polygon lies entirely inside. For the hull, this means all interior angles are less than 180°.

## Orientation Test

Both algorithms rely on determining the orientation of three points—the fundamental primitive in computational geometry.

**Cross product test**: For points $p_1$, $p_2$, $p_3$:
$$\text{cross}(p_1, p_2, p_3) = (p_2.x - p_1.x)(p_3.y - p_1.y) - (p_2.y - p_1.y)(p_3.x - p_1.x)$$

The sign determines orientation:
- Positive: counterclockwise (left turn)
- Negative: clockwise (right turn)
- Zero: collinear

```typescript
function orientation(p1: Point, p2: Point, p3: Point): number {
    const cross = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    if (Math.abs(cross) < 1e-10) return 0;  // Collinear
    return cross > 0 ? 1 : -1;  // CCW or CW
}
```

## Graham Scan

Graham scan achieves optimal $O(n \log n)$ time by first sorting points, then building the hull in a single linear pass.

**Algorithm**:
1. Find the point $p_0$ with minimum y-coordinate (leftmost if tied)
2. Sort remaining points by polar angle relative to $p_0$
3. Process points in order, maintaining convex hull on a stack
4. For each point, remove stack top while it makes a right turn

**Key insight**: If three consecutive points make a right turn, the middle point cannot be on the convex hull.

```typescript
function grahamScan(points: Point[]): Point[] {
    if (points.length < 3) return points;

    // Find lowest point (anchor)
    let anchor = 0;
    for (let i = 1; i < points.length; i++) {
        if (points[i].y < points[anchor].y ||
            (points[i].y === points[anchor].y && points[i].x < points[anchor].x)) {
            anchor = i;
        }
    }
    [points[0], points[anchor]] = [points[anchor], points[0]];
    const p0 = points[0];

    // Sort by polar angle
    const rest = points.slice(1).sort((a, b) => {
        const o = orientation(p0, a, b);
        if (o === 0) {
            // Collinear: keep farther point
            return distance(p0, a) - distance(p0, b);
        }
        return -o;  // Sort counterclockwise
    });

    // Build hull
    const hull: Point[] = [p0];

    for (const p of rest) {
        while (hull.length > 1 &&
               orientation(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) {
            hull.pop();
        }
        hull.push(p);
    }

    return hull;
}
```

**Complexity analysis**:
- Finding anchor: $O(n)$
- Sorting by polar angle: $O(n \log n)$
- Stack operations: Each point pushed once, popped at most once → $O(n)$
- **Total**: $O(n \log n)$

## Jarvis March (Gift Wrapping)

Jarvis march simulates wrapping a piece of string around the point set, always finding the next hull vertex by selecting the point making the smallest counterclockwise angle.

**Algorithm**:
1. Start from the leftmost point (guaranteed on hull)
2. For each hull vertex, find the point making the smallest left turn
3. Continue until returning to the starting point

```typescript
function jarvisMarch(points: Point[]): Point[] {
    if (points.length < 3) return points;

    // Find leftmost point
    let leftmost = 0;
    for (let i = 1; i < points.length; i++) {
        if (points[i].x < points[leftmost].x) {
            leftmost = i;
        }
    }

    const hull: Point[] = [];
    let current = leftmost;

    do {
        hull.push(points[current]);

        // Find point with smallest counterclockwise angle
        let next = (current + 1) % points.length;

        for (let i = 0; i < points.length; i++) {
            if (orientation(points[current], points[next], points[i]) < 0) {
                next = i;
            }
        }

        current = next;
    } while (current !== leftmost);

    return hull;
}
```

**Complexity analysis**:
- For each of $h$ hull vertices, scan all $n$ points: $O(nh)$
- **Output-sensitive**: Efficient when $h$ is small
- Best case: $h = O(1)$ → $O(n)$
- Worst case: $h = n$ (all points on hull) → $O(n^2)$

## Comparison and Selection

| Criterion | Graham Scan | Jarvis March |
|-----------|-------------|--------------|
| Time complexity | $O(n \log n)$ | $O(nh)$ |
| Best case | $O(n \log n)$ | $O(n)$ |
| Worst case | $O(n \log n)$ | $O(n^2)$ |
| Space | $O(n)$ | $O(h)$ |
| Online? | No | No |

**When to use Graham scan**: When you expect many points on the hull, or when worst-case guarantee matters.

**When to use Jarvis march**: When the hull is expected to be small relative to input size (common in practice).

## Other Algorithms

**Quickhull** (average $O(n \log n)$): Divide-and-conquer approach similar to quicksort. Find extreme points, recursively find points farthest from hull edges.

**Chan's algorithm** ($O(n \log h)$): Optimal output-sensitive algorithm. Combines Graham scan on small groups with Jarvis march on group hulls.

**Incremental** ($O(n^2)$): Add points one at a time, updating hull. Simple but not optimal.

## Higher Dimensions

**3D convex hull**: The gift wrapping idea extends—wrap a plane around the point set. Time: $O(n^2)$ straightforward, $O(n \log n)$ optimal.

**d-dimensional**: Complexity grows rapidly. For fixed $d$, time is $O(n^{\lfloor d/2 \rfloor})$ in the worst case.

## Applications

**Collision detection**: Two convex objects collide if and only if their convex hulls intersect. Convex hull computation enables efficient collision tests.

**Shape analysis**: The convex hull provides a simple bounding shape for pattern recognition and object classification.

**Path planning**: Robots can navigate around convex obstacles efficiently; hulls simplify complex obstacle shapes.

**Geographic information systems**: Hull computation helps identify coverage areas, facility placement regions, and territorial boundaries.

**Computer graphics**: Convex hulls accelerate rendering by providing tight bounding volumes for frustum culling.

## Key Takeaways

- Convex hull is the smallest convex polygon containing all points
- Graham scan: $O(n \log n)$ via sorting and stack-based scanning
- Jarvis march: $O(nh)$ output-sensitive gift wrapping
- Orientation test (cross product sign) is the fundamental primitive
- Choice depends on expected hull size relative to input
- Chan's algorithm achieves optimal $O(n \log h)$ output-sensitive bound
- Applications span graphics, robotics, GIS, and pattern recognition
