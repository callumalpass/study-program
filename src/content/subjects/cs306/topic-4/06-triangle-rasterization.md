# Triangle Rasterization

## Why Triangles?

Triangles are the fundamental primitive in modern 3D graphics. While mathematical surfaces can be defined using curves, spheres, or other complex shapes, graphics hardware universally uses triangles because they have unique properties:

1. **Always Planar**: Three points always define a plane (no warping)
2. **Always Convex**: No concavity simplifies inside/outside tests
3. **Simple Interpolation**: Linear interpolation across the surface is well-defined
4. **Efficient Subdivision**: Any polygon can be triangulated
5. **Minimal Primitive**: Simplest 2D shape with area

```python
import numpy as np

class Triangle:
    """
    Triangle primitive for rasterization.
    """
    def __init__(self, v0, v1, v2):
        """
        Args:
            v0, v1, v2: Vertices with at minimum (x, y) coordinates
        """
        self.v0 = v0
        self.v1 = v1
        self.v2 = v2

    def area(self):
        """
        Calculate triangle area using cross product.

        Returns:
            float: Signed area (positive = counter-clockwise)
        """
        return 0.5 * (
            (self.v1.x - self.v0.x) * (self.v2.y - self.v0.y) -
            (self.v2.x - self.v0.x) * (self.v1.y - self.v0.y)
        )

    def is_degenerate(self, epsilon=1e-6):
        """
        Check if triangle is degenerate (zero area).

        Returns:
            bool: True if degenerate
        """
        return abs(self.area()) < epsilon
```

## Barycentric Coordinates

Barycentric coordinates are the key to triangle rasterization. They express any point P inside a triangle as a weighted combination of the triangle's vertices.

### Mathematical Definition

For a point P in triangle ABC, barycentric coordinates (α, β, γ) satisfy:

$$P = \alpha A + \beta B + \gamma C$$

Where:
- $\alpha + \beta + \gamma = 1$
- $P$ is inside the triangle if $\alpha, \beta, \gamma \geq 0$

```python
def barycentric_coordinates(px, py, v0, v1, v2):
    """
    Compute barycentric coordinates of point P in triangle.

    Uses the area method:
    - α = area(PBC) / area(ABC)
    - β = area(APC) / area(ABC)
    - γ = area(ABP) / area(ABC)

    Args:
        px, py: Point coordinates
        v0, v1, v2: Triangle vertices with x, y attributes

    Returns:
        tuple: (alpha, beta, gamma) barycentric coordinates
    """
    # Vectors from v0 to other vertices
    v0v1_x = v1.x - v0.x
    v0v1_y = v1.y - v0.y
    v0v2_x = v2.x - v0.x
    v0v2_y = v2.y - v0.y
    v0p_x = px - v0.x
    v0p_y = py - v0.y

    # Compute denominatorator (twice the triangle area)
    denom = v0v1_x * v0v2_y - v0v2_x * v0v1_y

    # Compute barycentric coordinates
    beta = (v0p_x * v0v2_y - v0v2_x * v0p_y) / denom
    gamma = (v0v1_x * v0p_y - v0p_x * v0v1_y) / denom
    alpha = 1.0 - beta - gamma

    return (alpha, beta, gamma)

def point_in_triangle(px, py, v0, v1, v2):
    """
    Test if point is inside triangle using barycentric coordinates.

    Args:
        px, py: Point to test
        v0, v1, v2: Triangle vertices

    Returns:
        bool: True if point is inside triangle
    """
    alpha, beta, gamma = barycentric_coordinates(px, py, v0, v1, v2)
    return alpha >= 0 and beta >= 0 and gamma >= 0
```

### Interpolation with Barycentric Coordinates

Barycentric coordinates enable interpolation of any vertex attribute:

```python
def interpolate_attribute(alpha, beta, gamma, attr0, attr1, attr2):
    """
    Interpolate vertex attribute using barycentric coordinates.

    Can interpolate colors, texture coordinates, normals, etc.

    Args:
        alpha, beta, gamma: Barycentric coordinates
        attr0, attr1, attr2: Attribute values at vertices

    Returns:
        Interpolated attribute value
    """
    return alpha * attr0 + beta * attr1 + gamma * attr2

# Example: interpolate color
def interpolate_color(bc, color0, color1, color2):
    """
    Interpolate RGB color across triangle.

    Args:
        bc: Barycentric coordinates (alpha, beta, gamma)
        color0, color1, color2: Colors at vertices (r, g, b tuples)

    Returns:
        tuple: Interpolated (r, g, b) color
    """
    r = bc[0] * color0[0] + bc[1] * color1[0] + bc[2] * color2[0]
    g = bc[0] * color0[1] + bc[1] * color1[1] + bc[2] * color2[1]
    b = bc[0] * color0[2] + bc[1] * color1[2] + bc[2] * color2[2]

    return (r, g, b)
```

## Edge Function Method

The edge function method is the modern approach to triangle rasterization, used in contemporary GPUs.

### Edge Function Definition

The edge function $E(x, y)$ for an edge from $v_0$ to $v_1$ is:

$$E(x, y) = (x - x_0)(y_1 - y_0) - (y - y_0)(x_1 - x_0)$$

Properties:
- $E(x, y) > 0$: point is to the left of the edge
- $E(x, y) = 0$: point is on the edge
- $E(x, y) < 0$: point is to the right of the edge

```python
def edge_function(px, py, v0, v1):
    """
    Evaluate edge function for point P and edge v0->v1.

    Args:
        px, py: Point coordinates
        v0, v1: Edge vertices

    Returns:
        float: Edge function value (positive = left side)
    """
    return (px - v0.x) * (v1.y - v0.y) - (py - v0.y) * (v1.x - v0.x)

def rasterize_triangle_edge_function(v0, v1, v2, framebuffer, color):
    """
    Rasterize triangle using edge function method.

    For counter-clockwise wound triangles, a point is inside if
    all three edge functions are positive.

    Args:
        v0, v1, v2: Triangle vertices (counter-clockwise)
        framebuffer: Output pixel buffer
        color: Triangle color
    """
    # Get bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    # Clamp to framebuffer
    height, width = framebuffer.shape[:2]
    min_x = max(0, min_x)
    max_x = min(width - 1, max_x)
    min_y = max(0, min_y)
    max_y = min(height - 1, max_y)

    # Rasterize
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            # Sample at pixel center
            px = x + 0.5
            py = y + 0.5

            # Evaluate edge functions
            w0 = edge_function(px, py, v1, v2)
            w1 = edge_function(px, py, v2, v0)
            w2 = edge_function(px, py, v0, v1)

            # Inside test: all edge functions positive
            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                framebuffer[y, x] = color
```

### Incremental Edge Functions

The edge function method is efficient because edge functions can be updated incrementally:

```python
def rasterize_triangle_incremental(v0, v1, v2, framebuffer, color):
    """
    Optimized triangle rasterization with incremental edge functions.

    Edge functions are linear, so we can compute them incrementally
    rather than from scratch for each pixel.

    Args:
        v0, v1, v2: Triangle vertices
        framebuffer: Output pixel buffer
        color: Triangle color
    """
    # Get bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    # Edge function increments
    # Moving +1 in X direction adds (y1 - y0) to edge function
    # Moving +1 in Y direction adds -(x1 - x0) to edge function
    A01 = v0.y - v1.y
    B01 = v1.x - v0.x
    A12 = v1.y - v2.y
    B12 = v2.x - v1.x
    A20 = v2.y - v0.y
    B20 = v0.x - v2.x

    # Starting point (top-left corner of bounding box)
    start_x = min_x + 0.5
    start_y = min_y + 0.5

    # Edge functions at starting point
    w0_row = edge_function(start_x, start_y, v1, v2)
    w1_row = edge_function(start_x, start_y, v2, v0)
    w2_row = edge_function(start_x, start_y, v0, v1)

    # Rasterize row by row
    for y in range(min_y, max_y + 1):
        # Edge functions at start of row
        w0 = w0_row
        w1 = w1_row
        w2 = w2_row

        for x in range(min_x, max_x + 1):
            # Inside test
            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                framebuffer[y, x] = color

            # Increment edge functions for next pixel in row
            w0 += A12
            w1 += A20
            w2 += A01

        # Increment edge functions for next row
        w0_row += B12
        w1_row += B20
        w2_row += B01
```

## Interpolation Across Triangles

### Depth Interpolation

```python
def rasterize_with_depth(v0, v1, v2, framebuffer, depth_buffer, color):
    """
    Rasterize triangle with depth interpolation.

    Args:
        v0, v1, v2: Vertices with x, y, z attributes
        framebuffer: Color buffer
        depth_buffer: Depth buffer
        color: Triangle color
    """
    # Compute triangle area (for barycentric normalization)
    area = edge_function(v2.x, v2.y, v0, v1)

    if abs(area) < 1e-6:
        return  # Degenerate triangle

    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            px = x + 0.5
            py = y + 0.5

            # Edge functions (these are also barycentric * area)
            w0 = edge_function(px, py, v1, v2)
            w1 = edge_function(px, py, v2, v0)
            w2 = edge_function(px, py, v0, v1)

            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                # Normalize to get barycentric coordinates
                bc0 = w0 / area
                bc1 = w1 / area
                bc2 = w2 / area

                # Interpolate depth
                depth = bc0 * v0.z + bc1 * v1.z + bc2 * v2.z

                # Depth test
                if depth < depth_buffer[y, x]:
                    framebuffer[y, x] = color
                    depth_buffer[y, x] = depth
```

### Perspective-Correct Interpolation

Linear interpolation in screen space is incorrect for perspective projection. We must account for perspective division:

```python
def perspective_correct_interpolation(bc, attr0, attr1, attr2, w0, w1, w2):
    """
    Perform perspective-correct attribute interpolation.

    Linear interpolation of attributes in screen space is incorrect
    after perspective projection. Must interpolate in clip space
    and divide by interpolated w.

    Args:
        bc: Barycentric coordinates (alpha, beta, gamma)
        attr0, attr1, attr2: Attribute values at vertices
        w0, w1, w2: Perspective W coordinates at vertices

    Returns:
        Perspective-corrected interpolated attribute
    """
    # Interpolate attribute/w
    attr_over_w = (bc[0] * attr0 / w0 +
                   bc[1] * attr1 / w1 +
                   bc[2] * attr2 / w2)

    # Interpolate 1/w
    one_over_w = (bc[0] / w0 +
                  bc[1] / w1 +
                  bc[2] / w2)

    # Correct attribute = (attr/w) / (1/w)
    return attr_over_w / one_over_w

def rasterize_with_texture(v0, v1, v2, texture, framebuffer):
    """
    Rasterize textured triangle with perspective-correct UV.

    Args:
        v0, v1, v2: Vertices with x, y, z, w, u, v attributes
        texture: Texture image array
        framebuffer: Output framebuffer
    """
    area = edge_function(v2.x, v2.y, v0, v1)
    if abs(area) < 1e-6:
        return

    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            px = x + 0.5
            py = y + 0.5

            w0 = edge_function(px, py, v1, v2)
            w1 = edge_function(px, py, v2, v0)
            w2 = edge_function(px, py, v0, v1)

            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                bc = (w0 / area, w1 / area, w2 / area)

                # Perspective-correct UV interpolation
                u = perspective_correct_interpolation(
                    bc, v0.u, v1.u, v2.u, v0.w, v1.w, v2.w
                )
                v = perspective_correct_interpolation(
                    bc, v0.v, v1.v, v2.v, v0.w, v1.w, v2.w
                )

                # Sample texture
                color = sample_texture(texture, u, v)
                framebuffer[y, x] = color
```

## Top-Left Fill Rule

To avoid double-drawing pixels on shared edges, graphics APIs use fill rules:

```python
def is_top_left_edge(v0, v1):
    """
    Determine if edge is a "top" or "left" edge.

    Top-left rule (Direct3D):
    - Top edge: horizontal, going right
    - Left edge: not horizontal, going up

    Args:
        v0, v1: Edge vertices

    Returns:
        bool: True if top or left edge
    """
    dx = v1.x - v0.x
    dy = v1.y - v0.y

    # Top edge: horizontal going right
    if dy == 0 and dx > 0:
        return True

    # Left edge: going upward (negative dy in screen space)
    if dy < 0:
        return True

    return False

def rasterize_with_fill_rule(v0, v1, v2, framebuffer, color):
    """
    Rasterize triangle with top-left fill rule.

    Pixels exactly on edges are filled only if the edge is
    a top or left edge. This prevents double-drawing shared edges.

    Args:
        v0, v1, v2: Triangle vertices
        framebuffer: Output buffer
        color: Triangle color
    """
    # Determine edge biases
    bias0 = 0 if is_top_left_edge(v1, v2) else -1
    bias1 = 0 if is_top_left_edge(v2, v0) else -1
    bias2 = 0 if is_top_left_edge(v0, v1) else -1

    area = edge_function(v2.x, v2.y, v0, v1)

    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            px = x + 0.5
            py = y + 0.5

            w0 = edge_function(px, py, v1, v2) + bias0
            w1 = edge_function(px, py, v2, v0) + bias1
            w2 = edge_function(px, py, v0, v1) + bias2

            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                framebuffer[y, x] = color
```

## Block-Based Rasterization

Modern GPUs rasterize in blocks/tiles for better cache utilization:

```python
def block_based_rasterization(v0, v1, v2, framebuffer, color, block_size=8):
    """
    Hierarchical block-based triangle rasterization.

    Test larger blocks first, subdivide only if triangle
    partially overlaps block. Improves cache coherence.

    Args:
        v0, v1, v2: Triangle vertices
        framebuffer: Output buffer
        color: Triangle color
        block_size: Size of blocks to test
    """
    def test_block(min_x, min_y, max_x, max_y):
        """
        Test if triangle overlaps block.

        Returns:
            str: 'outside', 'inside', or 'partial'
        """
        # Test block corners
        corners = [
            (min_x, min_y), (max_x, min_y),
            (min_x, max_y), (max_x, max_y)
        ]

        inside_count = 0
        for cx, cy in corners:
            if point_in_triangle(cx, cy, v0, v1, v2):
                inside_count += 1

        if inside_count == 0:
            return 'outside'
        elif inside_count == 4:
            return 'inside'
        else:
            return 'partial'

    def rasterize_block(min_x, min_y, max_x, max_y):
        """Recursively rasterize block."""
        result = test_block(min_x, min_y, max_x, max_y)

        if result == 'outside':
            return  # Skip entire block

        elif result == 'inside':
            # Fill entire block
            for y in range(min_y, max_y + 1):
                for x in range(min_x, max_x + 1):
                    if 0 <= y < framebuffer.shape[0] and 0 <= x < framebuffer.shape[1]:
                        framebuffer[y, x] = color

        else:  # Partial overlap
            # Subdivide if block is larger than 1 pixel
            if max_x - min_x <= 1 and max_y - min_y <= 1:
                # Pixel level - test precisely
                for y in range(min_y, max_y + 1):
                    for x in range(min_x, max_x + 1):
                        if point_in_triangle(x + 0.5, y + 0.5, v0, v1, v2):
                            if 0 <= y < framebuffer.shape[0] and 0 <= x < framebuffer.shape[1]:
                                framebuffer[y, x] = color
            else:
                # Subdivide block
                mid_x = (min_x + max_x) // 2
                mid_y = (min_y + max_y) // 2

                rasterize_block(min_x, min_y, mid_x, mid_y)
                rasterize_block(mid_x + 1, min_y, max_x, mid_y)
                rasterize_block(min_x, mid_y + 1, mid_x, max_y)
                rasterize_block(mid_x + 1, mid_y + 1, max_x, max_y)

    # Start with bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    rasterize_block(min_x, min_y, max_x, max_y)
```

## Degenerate Triangle Handling

```python
def handle_degenerate_triangle(v0, v1, v2):
    """
    Detect and handle degenerate triangles.

    Degenerate cases:
    - Zero area (collinear vertices)
    - Duplicate vertices
    - Infinitesimal area (numerical precision)

    Args:
        v0, v1, v2: Triangle vertices

    Returns:
        bool: True if triangle should be culled
    """
    # Check for duplicate vertices
    if (v0.x == v1.x and v0.y == v1.y) or \
       (v1.x == v2.x and v1.y == v2.y) or \
       (v2.x == v0.x and v2.y == v0.y):
        return True

    # Check for zero/tiny area
    area = abs(edge_function(v2.x, v2.y, v0, v1))
    if area < 1e-6:
        return True

    return False
```

## Conclusion

Triangle rasterization is the cornerstone of modern 3D graphics. The edge function method provides an elegant, efficient algorithm that:

- Determines pixel coverage using simple arithmetic
- Enables incremental computation for performance
- Naturally produces barycentric coordinates for interpolation
- Extends easily to perspective-correct interpolation
- Parallelizes perfectly for GPU implementation

Understanding triangle rasterization is essential for graphics programming, as it underlies all polygon rendering in games, CAD, visualization, and other interactive 3D applications.
