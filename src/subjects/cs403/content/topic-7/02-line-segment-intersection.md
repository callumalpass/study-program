# Line Segment Intersection: Sweep Line Algorithm

## Introduction

Finding intersections among line segments is a fundamental computational geometry problem with applications in geographic information systems, computer graphics, VLSI design, and motion planning. Given $n$ line segments, we want to report all intersection points efficiently.

The naive approach checks every pair of segments in $O(n^2)$ time. When intersections are sparse, this is wasteful—we check many pairs that don't intersect. The sweep line algorithm achieves $O((n + k) \log n)$ time, where $k$ is the number of intersections. This output-sensitive complexity makes the algorithm efficient when intersections are few, which is common in practice.

## Problem Definition

**Input**: A set $S$ of $n$ line segments in the plane. Each segment $s_i$ is defined by its endpoints $(p_i, q_i)$.

**Output**: All intersection points, along with the segments that meet at each point.

**Assumption**: We typically assume general position—no three segments meet at a point, no two endpoints coincide, and no vertical segments. Degeneracies require careful handling.

## Naive Algorithm

Check every pair of segments for intersection:

```typescript
function naiveIntersections(segments: Segment[]): Point[] {
    const intersections: Point[] = [];

    for (let i = 0; i < segments.length; i++) {
        for (let j = i + 1; j < segments.length; j++) {
            const p = segmentIntersection(segments[i], segments[j]);
            if (p !== null) {
                intersections.push(p);
            }
        }
    }

    return intersections;
}
```

**Time**: $O(n^2)$ regardless of output size.

**Problem**: When $k \ll n^2$, we waste time checking segment pairs that are far apart and cannot possibly intersect.

## Segment Intersection Test

Before the sweep line algorithm, we need to detect if two segments intersect.

**Method 1: Cross product orientation**

```typescript
function segmentsIntersect(s1: Segment, s2: Segment): boolean {
    const d1 = orientation(s1.p, s1.q, s2.p);
    const d2 = orientation(s1.p, s1.q, s2.q);
    const d3 = orientation(s2.p, s2.q, s1.p);
    const d4 = orientation(s2.p, s2.q, s1.q);

    // General case: endpoints of each segment on opposite sides of the other
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;

    // Special cases: collinear points
    if (d1 === 0 && onSegment(s1, s2.p)) return true;
    if (d2 === 0 && onSegment(s1, s2.q)) return true;
    if (d3 === 0 && onSegment(s2, s1.p)) return true;
    if (d4 === 0 && onSegment(s2, s1.q)) return true;

    return false;
}
```

**Method 2: Parametric intersection**

For segments $s_1$ from $p_1$ to $q_1$ and $s_2$ from $p_2$ to $q_2$:
- Parameterize: $s_1(t) = p_1 + t(q_1 - p_1)$, $s_2(u) = p_2 + u(q_2 - p_2)$
- Solve for $t, u$ where $s_1(t) = s_2(u)$
- Intersection exists if $0 \leq t \leq 1$ and $0 \leq u \leq 1$

## Sweep Line Paradigm

The sweep line is a fundamental technique in computational geometry. Imagine a vertical line sweeping from left to right across the plane. As it moves, it maintains a data structure representing the "status" of the sweep—typically, which objects currently intersect the sweep line.

**Key insight**: Segments can only intersect if they are adjacent in the vertical order at some moment during the sweep. When two segments become adjacent (either because one starts, one ends, or they swap order at an intersection), we check for intersection.

## Bentley-Ottmann Algorithm

The classic sweep line algorithm for segment intersection.

**Events**: Points where something interesting happens:
1. **Left endpoint**: Segment begins
2. **Right endpoint**: Segment ends
3. **Intersection point**: Two segments cross

**Status structure**: Balanced BST maintaining segments currently crossing the sweep line, ordered by y-coordinate at the current x-position.

**Event queue**: Priority queue of events, ordered by x-coordinate.

```typescript
class SweepLineIntersection {
    private events: PriorityQueue<Event>;
    private status: BalancedBST<Segment>;
    private intersections: Point[];

    findIntersections(segments: Segment[]): Point[] {
        this.events = new PriorityQueue();
        this.status = new BalancedBST(this.compareAtSweep.bind(this));
        this.intersections = [];

        // Initialize with endpoint events
        for (const seg of segments) {
            this.events.insert({ type: 'left', point: seg.left, segment: seg });
            this.events.insert({ type: 'right', point: seg.right, segment: seg });
        }

        while (!this.events.isEmpty()) {
            const event = this.events.extractMin();
            this.handleEvent(event);
        }

        return this.intersections;
    }

    private handleEvent(event: Event): void {
        this.sweepX = event.point.x;

        switch (event.type) {
            case 'left':
                this.handleLeftEndpoint(event);
                break;
            case 'right':
                this.handleRightEndpoint(event);
                break;
            case 'intersection':
                this.handleIntersection(event);
                break;
        }
    }

    private handleLeftEndpoint(event: Event): void {
        const seg = event.segment;
        this.status.insert(seg);

        const above = this.status.successor(seg);
        const below = this.status.predecessor(seg);

        this.checkAndAddIntersection(seg, above);
        this.checkAndAddIntersection(seg, below);
    }

    private handleRightEndpoint(event: Event): void {
        const seg = event.segment;
        const above = this.status.successor(seg);
        const below = this.status.predecessor(seg);

        this.status.delete(seg);

        // above and below become adjacent
        this.checkAndAddIntersection(above, below);
    }

    private handleIntersection(event: Event): void {
        const { seg1, seg2 } = event;

        // Record intersection
        this.intersections.push(event.point);

        // Swap seg1 and seg2 in status
        // After intersection, their vertical order reverses
        this.status.swap(seg1, seg2);

        // Check for new potential intersections
        const newAbove = this.status.successor(seg2);  // seg2 now above seg1
        const newBelow = this.status.predecessor(seg1);

        this.checkAndAddIntersection(seg2, newAbove);
        this.checkAndAddIntersection(seg1, newBelow);
    }

    private checkAndAddIntersection(s1: Segment | null, s2: Segment | null): void {
        if (s1 === null || s2 === null) return;

        const p = computeIntersection(s1, s2);
        if (p !== null && p.x > this.sweepX) {
            this.events.insert({
                type: 'intersection',
                point: p,
                seg1: s1,
                seg2: s2
            });
        }
    }
}
```

## Complexity Analysis

**Event count**:
- $2n$ endpoint events (each segment contributes 2)
- $k$ intersection events
- Total: $O(n + k)$ events

**Per-event operations**:
- BST operations: $O(\log n)$
- Priority queue operations: $O(\log(n + k))$

**Total time**: $O((n + k) \log n)$

**Space**: $O(n + k)$ for event queue and status structure.

**Output-sensitive**: When $k = O(n)$, this is $O(n \log n)$. When $k = O(n^2)$, the naive algorithm might be faster in practice due to lower constants.

## Handling Degeneracies

Real applications require handling degenerate cases:

**Vertical segments**: Treat them specially or use symbolic perturbation.

**Coincident endpoints**: Multiple segments sharing an endpoint require careful event handling.

**Overlapping segments**: Report as a special kind of intersection.

**Three segments meeting**: Handle by processing all segments involved together.

## Applications

**Geographic Information Systems**: Map overlay operations—combining two maps requires finding where boundaries intersect.

**VLSI Design**: Checking for design rule violations where wires shouldn't cross.

**Computer Graphics**: Hidden surface removal, shadow computation, and polygon clipping all require intersection detection.

**Motion Planning**: Finding collisions between robot paths and obstacles.

**Polygon Operations**: Union, intersection, and difference of polygons require finding edge intersections.

## Red-Blue Intersection

A special case where segments come in two colors, and we only want intersections between different colors. This arises in map overlay.

**Modification**: When checking adjacency, only check segments of different colors.

**Complexity**: Still $O((n + k) \log n)$ where $k$ counts only red-blue intersections.

## Key Takeaways

- Sweep line transforms 2D problem into sequence of 1D problems
- Bentley-Ottmann achieves $O((n + k) \log n)$ output-sensitive time
- Events: segment starts, ends, and intersections
- Status: balanced BST of segments crossing sweep line
- Only adjacent segments (in vertical order) can intersect next
- Handles sparse intersection patterns efficiently
- Foundation for many computational geometry algorithms
