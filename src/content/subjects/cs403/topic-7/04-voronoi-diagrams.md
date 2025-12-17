# Voronoi Diagrams

Partition plane into regions closest to each point.

## Construction
**Fortune's algorithm**: Sweep line with beach line (parabolic arcs).

**Time**: $O(n \log n)$, **Space**: $O(n)$

## Properties
$O(n)$ vertices and edges. Dual graph = Delaunay triangulation.

## Applications
Facility location, nearest neighbor search, path planning
