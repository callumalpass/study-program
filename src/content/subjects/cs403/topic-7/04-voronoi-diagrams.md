# Voronoi Diagrams and Delaunay Triangulation

## Introduction

A Voronoi diagram partitions the plane into regions based on proximity to a set of sites—each region contains all points closer to its site than to any other. This elegant structure answers nearest neighbor queries, guides facility placement, and models natural phenomena from crystal growth to territorial behavior.

The dual structure, the Delaunay triangulation, connects sites whose Voronoi regions share an edge. Together, these structures form the foundation of computational geometry, with applications spanning robotics, geographic information systems, mesh generation, and spatial analysis. Fortune's sweep line algorithm constructs Voronoi diagrams in optimal $O(n \log n)$ time.

## Definitions

**Voronoi diagram**: Given $n$ sites $S = \{s_1, \ldots, s_n\}$ in the plane, the Voronoi cell of site $s_i$ is:
$$V(s_i) = \{p : d(p, s_i) \leq d(p, s_j) \text{ for all } j \neq i\}$$

The Voronoi diagram $\text{Vor}(S)$ is the collection of all Voronoi cells.

**Voronoi edge**: Boundary between two adjacent Voronoi cells—the set of points equidistant from exactly two sites.

**Voronoi vertex**: Point equidistant from three or more sites—where three or more Voronoi edges meet.

**Delaunay triangulation**: The dual graph of the Voronoi diagram. Connect two sites if their Voronoi cells share an edge.

## Properties of Voronoi Diagrams

**Structure**: Voronoi regions are convex polygons (possibly unbounded).

**Complexity**: For $n$ sites, the Voronoi diagram has:
- At most $2n - 5$ vertices
- At most $3n - 6$ edges
- Exactly $n$ cells

This follows from Euler's formula for planar graphs.

**Empty circle property**: Each Voronoi vertex is the center of a circle passing through exactly three sites (the sites of its adjacent cells), with no sites inside.

**Nearest neighbor**: To find the nearest site to a query point, locate which Voronoi cell contains it.

## Properties of Delaunay Triangulation

**Empty circle criterion**: A triangulation is Delaunay if and only if the circumcircle of each triangle contains no other sites.

**Maximizes minimum angle**: Among all triangulations of a point set, the Delaunay triangulation maximizes the minimum angle. This makes it optimal for mesh generation.

**Contains closest pair**: The closest pair of sites in $S$ is connected by a Delaunay edge.

**Contains nearest neighbor graph**: If $q$ is the nearest neighbor of $p$, then $(p, q)$ is a Delaunay edge.

## Fortune's Algorithm

Fortune's sweep line algorithm constructs the Voronoi diagram in $O(n \log n)$ time.

**Key insight**: As a sweep line moves across the plane, the partially constructed Voronoi diagram is bounded by a "beach line"—a sequence of parabolic arcs.

**Beach line**: Each site $s$ that the sweep line has passed defines a parabola—points equidistant from $s$ and the sweep line. The beach line is the lower envelope of all such parabolas.

**Events**:
1. **Site event**: Sweep line reaches a new site. A new parabolic arc appears on the beach line.
2. **Circle event**: Three consecutive arcs on the beach line converge. The middle arc disappears, creating a Voronoi vertex.

```typescript
class FortuneAlgorithm {
    private eventQueue: PriorityQueue<Event>;
    private beachLine: BeachLineTree;
    private voronoi: VoronoiDiagram;

    compute(sites: Point[]): VoronoiDiagram {
        this.eventQueue = new PriorityQueue((a, b) => a.y - b.y);
        this.beachLine = new BeachLineTree();
        this.voronoi = new VoronoiDiagram();

        // Initialize with site events
        for (const site of sites) {
            this.eventQueue.insert({ type: 'site', point: site, site });
        }

        // Process events
        while (!this.eventQueue.isEmpty()) {
            const event = this.eventQueue.extractMin();

            if (event.type === 'site') {
                this.handleSiteEvent(event);
            } else if (event.valid) {  // Circle events can be invalidated
                this.handleCircleEvent(event);
            }
        }

        // Finish unbounded edges
        this.completeEdges();

        return this.voronoi;
    }

    private handleSiteEvent(event: SiteEvent): void {
        const site = event.site;

        if (this.beachLine.isEmpty()) {
            this.beachLine.insertArc(site);
            return;
        }

        // Find arc directly above new site
        const arcAbove = this.beachLine.findArcAbove(site.x, site.y);

        // Remove any circle event associated with arcAbove
        if (arcAbove.circleEvent) {
            arcAbove.circleEvent.valid = false;
        }

        // Split arcAbove into three arcs
        const [leftArc, newArc, rightArc] = this.beachLine.splitArc(arcAbove, site);

        // Create Voronoi edge between arcAbove.site and site
        const edge = this.voronoi.createEdge(arcAbove.site, site);
        newArc.leftEdge = edge;
        newArc.rightEdge = edge;

        // Check for new circle events
        this.checkCircleEvent(leftArc);
        this.checkCircleEvent(rightArc);
    }

    private handleCircleEvent(event: CircleEvent): void {
        const arc = event.arc;

        // Get neighboring arcs
        const leftArc = this.beachLine.leftNeighbor(arc);
        const rightArc = this.beachLine.rightNeighbor(arc);

        // Invalidate circle events of neighbors
        if (leftArc?.circleEvent) leftArc.circleEvent.valid = false;
        if (rightArc?.circleEvent) rightArc.circleEvent.valid = false;

        // Create Voronoi vertex
        const vertex = event.center;
        this.voronoi.addVertex(vertex);

        // Complete edges meeting at this vertex
        arc.leftEdge.setEndpoint(vertex);
        arc.rightEdge.setEndpoint(vertex);

        // Create new edge between left and right sites
        const newEdge = this.voronoi.createEdge(leftArc.site, rightArc.site);
        newEdge.setStartpoint(vertex);

        // Remove disappearing arc
        this.beachLine.removeArc(arc);

        // Check for new circle events
        this.checkCircleEvent(leftArc);
        this.checkCircleEvent(rightArc);
    }

    private checkCircleEvent(arc: Arc): void {
        if (!arc) return;

        const left = this.beachLine.leftNeighbor(arc);
        const right = this.beachLine.rightNeighbor(arc);

        if (!left || !right) return;
        if (left.site === right.site) return;

        // Compute circumcircle of three sites
        const circle = circumcircle(left.site, arc.site, right.site);
        if (!circle) return;  // Collinear

        // Circle event occurs when sweep line reaches bottom of circle
        if (circle.bottom > this.sweepY) {
            const event: CircleEvent = {
                type: 'circle',
                y: circle.bottom,
                center: circle.center,
                arc,
                valid: true
            };
            arc.circleEvent = event;
            this.eventQueue.insert(event);
        }
    }
}
```

## Complexity Analysis

**Time complexity**: $O(n \log n)$
- $O(n)$ site events
- $O(n)$ circle events (each arc created at most once, removed at most once)
- Each event: $O(\log n)$ for priority queue and beach line operations

**Space complexity**: $O(n)$ for the beach line and Voronoi structure.

## Computing Delaunay Triangulation

**From Voronoi**: The Delaunay triangulation is the dual—connect sites whose Voronoi cells share an edge. Time: $O(n)$ after Voronoi construction.

**Direct construction**: Incremental insertion with point location achieves $O(n \log n)$ expected time.

**Divide and conquer**: Split points, recursively triangulate, merge. Time: $O(n \log n)$.

```typescript
function delaunayFromVoronoi(voronoi: VoronoiDiagram): Edge[] {
    const edges: Edge[] = [];

    for (const voronoiEdge of voronoi.edges) {
        // Each Voronoi edge corresponds to a Delaunay edge
        // connecting the two sites whose regions share this edge
        if (voronoiEdge.leftSite && voronoiEdge.rightSite) {
            edges.push({
                p: voronoiEdge.leftSite,
                q: voronoiEdge.rightSite
            });
        }
    }

    return edges;
}
```

## Applications

**Nearest neighbor search**: Locate the Voronoi cell containing a query point. Preprocessing: $O(n \log n)$, query: $O(\log n)$ with point location.

**Facility location**: Place a new facility to maximize minimum distance to existing ones—at a Voronoi vertex.

**Natural neighbor interpolation**: Interpolate values at scattered data points using Voronoi-based weights.

**Mesh generation**: Delaunay triangulation provides well-shaped triangles for finite element analysis.

**Path planning**: Navigate between obstacles using Voronoi edges as maximally-safe paths.

**Spatial analysis**: Determine territories, coverage areas, and proximity relationships.

**Art and design**: Voronoi patterns appear in architecture, generative art, and texture synthesis.

## Higher Dimensions

**3D Voronoi**: Cells are convex polyhedra. Complexity: $O(n^2)$ worst case.

**d-dimensional**: Complexity: $O(n^{\lceil d/2 \rceil})$ in the worst case. Practical only for low dimensions.

## Key Takeaways

- Voronoi diagram partitions space by nearest site
- Delaunay triangulation is the dual graph
- Empty circle property characterizes Delaunay edges
- Fortune's algorithm: $O(n \log n)$ via sweep line with parabolic beach line
- Structure has $O(n)$ vertices and edges
- Delaunay maximizes minimum angle—optimal for meshing
- Applications span GIS, robotics, meshing, and spatial analysis
