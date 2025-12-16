# Polygon Filling Algorithms

## Introduction to Polygon Rasterization

Polygon filling is the process of determining which pixels lie inside a polygon and should be rendered. Unlike line drawing which rasterizes one-dimensional primitives, polygon filling must handle two-dimensional regions efficiently. This is crucial for rendering filled shapes, user interface elements, and as a foundation for triangle rasterization in 3D graphics.

Efficient polygon filling algorithms must handle arbitrary polygons with any number of vertices, including concave polygons, self-intersecting polygons, and polygons with holes.

## Polygon Representations

### Vertex List Representation

The most common representation stores vertices in order:

```python
class Polygon:
    """
    Polygon represented as ordered list of vertices.
    """
    def __init__(self, vertices):
        """
        Args:
            vertices: List of (x, y) coordinate tuples
        """
        self.vertices = vertices
        self.n_vertices = len(vertices)

    def edges(self):
        """
        Generate edges as (v0, v1) pairs.

        Yields:
            tuple: Edge as ((x0, y0), (x1, y1))
        """
        for i in range(self.n_vertices):
            v0 = self.vertices[i]
            v1 = self.vertices[(i + 1) % self.n_vertices]
            yield (v0, v1)

    def bounding_box(self):
        """
        Calculate axis-aligned bounding box.

        Returns:
            tuple: (min_x, min_y, max_x, max_y)
        """
        xs = [v[0] for v in self.vertices]
        ys = [v[1] for v in self.vertices]
        return (min(xs), min(ys), max(xs), max(ys))
```

## Point-in-Polygon Test

Before filling, we need to determine if a point is inside a polygon.

### Ray Casting Algorithm

The ray casting method counts how many times a ray from the test point crosses polygon edges:

```python
def point_in_polygon(x, y, polygon):
    """
    Ray casting algorithm for point-in-polygon test.

    Cast a ray from the point to infinity (in +X direction) and
    count edge crossings. Odd count = inside, even count = outside.

    Args:
        x, y: Test point coordinates
        polygon: Polygon object

    Returns:
        bool: True if point is inside polygon
    """
    inside = False
    vertices = polygon.vertices
    n = len(vertices)

    j = n - 1  # Last vertex
    for i in range(n):
        xi, yi = vertices[i]
        xj, yj = vertices[j]

        # Check if horizontal ray crosses edge
        if ((yi > y) != (yj > y)) and \
           (x < (xj - xi) * (y - yi) / (yj - yi) + xi):
            inside = not inside

        j = i

    return inside
```

### Winding Number Algorithm

The winding number counts how many times the polygon winds around a point:

```python
def winding_number(x, y, polygon):
    """
    Winding number algorithm for point-in-polygon test.

    Counts signed crossings. Non-zero winding number = inside.
    Handles self-intersecting polygons correctly.

    Args:
        x, y: Test point coordinates
        polygon: Polygon object

    Returns:
        int: Winding number (0 = outside, non-zero = inside)
    """
    wn = 0
    vertices = polygon.vertices
    n = len(vertices)

    for i in range(n):
        v0 = vertices[i]
        v1 = vertices[(i + 1) % n]

        if v0[1] <= y:
            if v1[1] > y:  # Upward crossing
                if is_left(v0, v1, (x, y)) > 0:
                    wn += 1
        else:
            if v1[1] <= y:  # Downward crossing
                if is_left(v0, v1, (x, y)) < 0:
                    wn -= 1

    return wn

def is_left(v0, v1, point):
    """
    Test if point is left of line from v0 to v1.

    Returns:
        float: >0 if left, =0 if on line, <0 if right
    """
    return ((v1[0] - v0[0]) * (point[1] - v0[1]) -
            (point[0] - v0[0]) * (v1[1] - v0[1]))
```

## Scanline Fill Algorithm

The scanline algorithm is the classic approach for filling arbitrary polygons. It processes the polygon one horizontal scanline at a time.

### Algorithm Overview

1. Build an edge table containing all polygon edges
2. For each scanline Y:
   - Determine which edges intersect the scanline
   - Sort intersection points by X coordinate
   - Fill between pairs of intersection points

### Edge Table Data Structure

```python
class EdgeTableEntry:
    """
    Entry in the edge table for scanline algorithm.
    """
    def __init__(self, y_max, x_min, slope_inverse):
        """
        Args:
            y_max: Maximum Y coordinate of edge
            x_min: X coordinate at minimum Y
            slope_inverse: 1/slope (dx/dy) for incremental X calculation
        """
        self.y_max = y_max
        self.x = x_min  # Current X intersection
        self.dx_dy = slope_inverse  # X increment per scanline

    def update_x(self):
        """Update X intersection for next scanline."""
        self.x += self.dx_dy

class EdgeTable:
    """
    Edge table for scanline polygon fill algorithm.
    """
    def __init__(self, polygon):
        """
        Build edge table from polygon.

        Args:
            polygon: Polygon to build edge table for
        """
        # Get bounding box for scanline range
        min_x, min_y, max_x, max_y = polygon.bounding_box()
        self.min_y = int(min_y)
        self.max_y = int(max_y)

        # Initialize buckets for each scanline
        self.table = {y: [] for y in range(self.min_y, self.max_y + 1)}

        # Process each edge
        for (x0, y0), (x1, y1) in polygon.edges():
            # Skip horizontal edges
            if y0 == y1:
                continue

            # Ensure y0 < y1
            if y0 > y1:
                x0, y0, x1, y1 = x1, y1, x0, y0

            # Calculate edge parameters
            y_min = int(y0)
            y_max = int(y1)
            x_min = x0
            dx_dy = (x1 - x0) / (y1 - y0) if y1 != y0 else 0

            # Add edge to table at its minimum Y
            entry = EdgeTableEntry(y_max, x_min, dx_dy)
            self.table[y_min].append(entry)
```

### Scanline Fill Implementation

```python
def scanline_fill(polygon, framebuffer, color):
    """
    Scanline polygon fill algorithm.

    Efficiently fills arbitrary polygons by processing
    horizontal scanlines and tracking edge intersections.

    Args:
        polygon: Polygon to fill
        framebuffer: Output pixel buffer
        color: Fill color
    """
    # Build edge table
    edge_table = EdgeTable(polygon)

    # Active edge table (edges intersecting current scanline)
    active_edges = []

    # Process each scanline
    for y in range(edge_table.min_y, edge_table.max_y + 1):
        # Add new edges that start at this scanline
        active_edges.extend(edge_table.table[y])

        # Remove edges that end at this scanline
        active_edges = [e for e in active_edges if y < e.y_max]

        # Sort active edges by X intersection
        active_edges.sort(key=lambda e: e.x)

        # Fill between pairs of intersections (inside-outside rule)
        for i in range(0, len(active_edges), 2):
            if i + 1 < len(active_edges):
                x_start = int(active_edges[i].x)
                x_end = int(active_edges[i + 1].x)

                # Draw horizontal span
                for x in range(x_start, x_end + 1):
                    set_pixel(framebuffer, x, y, color)

        # Update X intersections for next scanline
        for edge in active_edges:
            edge.update_x()
```

## Optimized Scanline Fill

### Coherence Optimization

The scanline algorithm exploits scanline coherence - adjacent scanlines have similar active edges:

```python
def optimized_scanline_fill(polygon, framebuffer, color):
    """
    Optimized scanline fill using coherence.

    Improvements:
    - Maintain sorted active edge list
    - Use incremental insertion sort
    - Minimize edge table lookups

    Args:
        polygon: Polygon to fill
        framebuffer: Output pixel buffer
        color: Fill color
    """
    edge_table = EdgeTable(polygon)
    active_edges = []

    for y in range(edge_table.min_y, edge_table.max_y + 1):
        # Remove finished edges
        active_edges = [e for e in active_edges if y < e.y_max]

        # Insert new edges (maintain sorted order)
        new_edges = edge_table.table[y]
        for new_edge in new_edges:
            # Insertion sort into active list
            insert_sorted(active_edges, new_edge)

        # Fill spans
        fill_spans(y, active_edges, framebuffer, color)

        # Update X coordinates
        for edge in active_edges:
            edge.update_x()

        # Resort if necessary (usually only a few swaps needed)
        bubble_sort_pass(active_edges)

def insert_sorted(edges, new_edge):
    """Insert edge maintaining sorted order by X."""
    for i, edge in enumerate(edges):
        if new_edge.x < edge.x:
            edges.insert(i, new_edge)
            return
    edges.append(new_edge)

def bubble_sort_pass(edges):
    """Single bubble sort pass (edges are nearly sorted)."""
    n = len(edges)
    for i in range(n - 1):
        if edges[i].x > edges[i + 1].x:
            edges[i], edges[i + 1] = edges[i + 1], edges[i]

def fill_spans(y, active_edges, framebuffer, color):
    """Fill horizontal spans for scanline."""
    for i in range(0, len(active_edges) - 1, 2):
        x_start = int(active_edges[i].x)
        x_end = int(active_edges[i + 1].x)

        for x in range(x_start, x_end + 1):
            set_pixel(framebuffer, x, y, color)
```

## Fill Conventions and Edge Cases

### Even-Odd Rule vs. Non-Zero Winding Rule

Two rules determine which pixels are "inside" complex polygons:

**Even-Odd Rule**: Count edge crossings; odd = inside, even = outside

```python
def even_odd_fill(polygon, framebuffer, color):
    """
    Fill using even-odd rule.

    Simple rule: toggle inside/outside at each edge crossing.
    Works for simple polygons, gives predictable results for
    self-intersecting polygons.
    """
    min_x, min_y, max_x, max_y = polygon.bounding_box()

    for y in range(int(min_y), int(max_y) + 1):
        inside = False
        intersections = []

        # Find all X intersections for this scanline
        for (x0, y0), (x1, y1) in polygon.edges():
            if y0 == y1:  # Skip horizontal edges
                continue

            if min(y0, y1) <= y < max(y0, y1):
                # Calculate X intersection
                t = (y - y0) / (y1 - y0)
                x = x0 + t * (x1 - x0)
                intersections.append(x)

        # Sort intersections
        intersections.sort()

        # Fill between pairs
        for i in range(0, len(intersections), 2):
            if i + 1 < len(intersections):
                x_start = int(intersections[i])
                x_end = int(intersections[i + 1])

                for x in range(x_start, x_end + 1):
                    set_pixel(framebuffer, x, y, color)
```

**Non-Zero Winding Rule**: Count signed crossings; non-zero = inside

```python
def nonzero_winding_fill(polygon, framebuffer, color):
    """
    Fill using non-zero winding rule.

    More complex rule: track direction of edge crossings.
    Better for overlapping polygons and compound shapes.
    """
    min_x, min_y, max_x, max_y = polygon.bounding_box()

    for y in range(int(min_y), int(max_y) + 1):
        # List of (x, direction) tuples
        crossings = []

        for (x0, y0), (x1, y1) in polygon.edges():
            if y0 == y1:
                continue

            if min(y0, y1) <= y < max(y0, y1):
                t = (y - y0) / (y1 - y0)
                x = x0 + t * (x1 - x0)

                # Determine edge direction
                direction = 1 if y1 > y0 else -1
                crossings.append((x, direction))

        # Sort by X
        crossings.sort(key=lambda c: c[0])

        # Fill based on winding number
        winding = 0
        last_x = None

        for x, direction in crossings:
            if winding != 0 and last_x is not None:
                # Fill from last_x to x
                for px in range(int(last_x), int(x) + 1):
                    set_pixel(framebuffer, px, y, color)

            winding += direction
            last_x = x
```

## Flood Fill Algorithms

For filling regions defined by boundaries rather than vertices:

### Recursive Flood Fill

```python
def flood_fill_recursive(x, y, target_color, fill_color, framebuffer):
    """
    Recursive flood fill algorithm.

    Warning: Can cause stack overflow for large regions.

    Args:
        x, y: Starting point
        target_color: Color to replace
        fill_color: New color
        framebuffer: Output pixel buffer
    """
    height, width = framebuffer.shape[:2]

    # Bounds check
    if x < 0 or x >= width or y < 0 or y >= height:
        return

    # Check if already filled or different color
    current_color = tuple(framebuffer[y, x])
    if current_color != target_color or current_color == fill_color:
        return

    # Fill this pixel
    framebuffer[y, x] = fill_color

    # Recursively fill neighbors
    flood_fill_recursive(x + 1, y, target_color, fill_color, framebuffer)
    flood_fill_recursive(x - 1, y, target_color, fill_color, framebuffer)
    flood_fill_recursive(x, y + 1, target_color, fill_color, framebuffer)
    flood_fill_recursive(x, y - 1, target_color, fill_color, framebuffer)
```

### Scanline Flood Fill

More efficient stack-based approach:

```python
def flood_fill_scanline(x, y, target_color, fill_color, framebuffer):
    """
    Scanline-based flood fill algorithm.

    More efficient than recursive approach. Uses explicit stack
    and fills entire horizontal spans at once.

    Args:
        x, y: Starting point
        target_color: Color to replace
        fill_color: New color
        framebuffer: Output pixel buffer
    """
    height, width = framebuffer.shape[:2]

    if tuple(framebuffer[y, x]) != target_color:
        return

    stack = [(x, y)]

    while stack:
        cx, cy = stack.pop()

        # Find leftmost pixel in this span
        left = cx
        while left > 0 and tuple(framebuffer[cy, left - 1]) == target_color:
            left -= 1

        # Find rightmost pixel in this span
        right = cx
        while right < width - 1 and tuple(framebuffer[cy, right + 1]) == target_color:
            right += 1

        # Fill this span
        for px in range(left, right + 1):
            framebuffer[cy, px] = fill_color

        # Check spans above and below
        for dy in [-1, 1]:
            ny = cy + dy
            if 0 <= ny < height:
                span_start = None

                for px in range(left, right + 1):
                    if tuple(framebuffer[ny, px]) == target_color:
                        if span_start is None:
                            span_start = px
                    else:
                        if span_start is not None:
                            stack.append((span_start, ny))
                            span_start = None

                # Handle span extending to right edge
                if span_start is not None:
                    stack.append((span_start, ny))
```

## Boundary Fill

Fill region bounded by specific boundary color:

```python
def boundary_fill(x, y, fill_color, boundary_color, framebuffer):
    """
    Boundary fill algorithm.

    Fills region until encountering boundary color.
    Useful for paint programs and region filling.

    Args:
        x, y: Starting point
        fill_color: Color to fill with
        boundary_color: Color that defines boundary
        framebuffer: Output pixel buffer
    """
    height, width = framebuffer.shape[:2]
    stack = [(x, y)]

    while stack:
        cx, cy = stack.pop()

        # Bounds check
        if cx < 0 or cx >= width or cy < 0 or cy >= height:
            continue

        current = tuple(framebuffer[cy, cx])

        # Skip if boundary or already filled
        if current == boundary_color or current == fill_color:
            continue

        # Fill pixel
        framebuffer[cy, cx] = fill_color

        # Add neighbors to stack
        stack.extend([
            (cx + 1, cy), (cx - 1, cy),
            (cx, cy + 1), (cx, cy - 1)
        ])
```

## Pattern Fill

Fill polygons with patterns instead of solid colors:

```python
def pattern_fill(polygon, pattern, framebuffer):
    """
    Fill polygon with repeating pattern.

    Args:
        polygon: Polygon to fill
        pattern: 2D array of color values
        framebuffer: Output pixel buffer
    """
    pattern_h, pattern_w = pattern.shape[:2]
    min_x, min_y, max_x, max_y = polygon.bounding_box()

    for y in range(int(min_y), int(max_y) + 1):
        for x in range(int(min_x), int(max_x) + 1):
            if point_in_polygon(x, y, polygon):
                # Sample pattern with tiling
                px = x % pattern_w
                py = y % pattern_h
                color = pattern[py, px]
                set_pixel(framebuffer, x, y, color)
```

## Performance Considerations

### Bounding Box Optimization

Always check bounding box first:

```python
def fast_polygon_fill(polygon, framebuffer, color):
    """
    Optimized polygon fill with bounding box culling.
    """
    min_x, min_y, max_x, max_y = polygon.bounding_box()

    # Clamp to framebuffer bounds
    height, width = framebuffer.shape[:2]
    min_x = max(0, int(min_x))
    min_y = max(0, int(min_y))
    max_x = min(width - 1, int(max_x))
    max_y = min(height - 1, int(max_y))

    # Only process pixels in bounding box
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            if point_in_polygon(x, y, polygon):
                set_pixel(framebuffer, x, y, color)
```

## Conclusion

Polygon filling algorithms form the foundation of 2D graphics rendering. The scanline algorithm remains the most efficient approach for arbitrary polygons, exploiting coherence between adjacent scanlines. Understanding these algorithms is essential for implementing custom renderers, graphics editors, and as preparation for triangle rasterization in 3D graphics pipelines.

Modern GPUs implement hardware-accelerated versions of these algorithms, but the fundamental principles remain the same.
