# Depth Buffering and Hidden Surface Removal

## Introduction to the Visibility Problem

In 3D graphics, determining which surfaces are visible from a given viewpoint is fundamental. Multiple objects may project to the same screen pixels, and we must determine which object is closest to the camera. This visibility problem, also called hidden surface removal, is solved efficiently using depth buffering.

The depth buffer (also called Z-buffer) is one of the most important inventions in computer graphics, enabling real-time 3D rendering by solving the visibility problem with a simple, elegant algorithm.

## The Z-Buffer Algorithm

The Z-buffer algorithm, invented by Edwin Catmull in 1974, maintains a depth value for each pixel representing the distance from the camera to the closest surface rendered at that pixel so far.

### Core Concept

For each pixel:
1. Store the depth (Z value) of the closest fragment rendered so far
2. When rendering a new fragment, compare its depth to the stored depth
3. If closer, update both color and depth buffers
4. If farther, discard the fragment

```python
import numpy as np

def create_depth_buffer(width, height):
    """
    Create and initialize depth buffer.

    Convention: Larger Z = farther from camera
    Initialize to infinity (farthest possible distance)

    Args:
        width: Framebuffer width
        height: Framebuffer height

    Returns:
        numpy.ndarray: Depth buffer initialized to infinity
    """
    return np.full((height, width), np.inf, dtype=np.float32)

def z_buffer_test(x, y, depth, depth_buffer):
    """
    Perform Z-buffer depth test.

    Args:
        x, y: Pixel coordinates
        depth: Depth of fragment to test
        depth_buffer: Current depth buffer

    Returns:
        bool: True if fragment passes (is closer)
    """
    if depth < depth_buffer[y, x]:
        return True
    return False

def render_with_depth(fragment, framebuffer, depth_buffer):
    """
    Render fragment with depth testing.

    Args:
        fragment: Fragment with x, y, depth, and color attributes
        framebuffer: Color framebuffer
        depth_buffer: Depth buffer
    """
    x, y = int(fragment.x), int(fragment.y)

    # Check bounds
    height, width = framebuffer.shape[:2]
    if x < 0 or x >= width or y < 0 or y >= height:
        return

    # Depth test
    if z_buffer_test(x, y, fragment.depth, depth_buffer):
        # Update both buffers
        framebuffer[y, x] = fragment.color
        depth_buffer[y, x] = fragment.depth
```

## Depth Coordinate Systems

### View Space Depth

In view space (camera space), depth is the Z coordinate after view transformation:

```python
class ViewSpaceVertex:
    """Vertex in camera/view space."""
    def __init__(self, x, y, z):
        self.x = x  # Right
        self.y = y  # Up
        self.z = z  # Forward (negative = into screen)

def view_space_depth(vertex):
    """
    Get depth in view space.

    Typically negative Z = into screen (OpenGL convention)
    Take absolute value or negate for depth buffer
    """
    return -vertex.z  # Negate to get positive depth
```

### Normalized Device Coordinates (NDC)

After projection, depth is mapped to [0, 1] or [-1, 1]:

```python
def perspective_projection_matrix(fov, aspect, near, far):
    """
    Perspective projection matrix (OpenGL style).

    Maps view space to NDC:
    - X, Y mapped to [-1, 1] (visible region)
    - Z mapped to [-1, 1] (depth range)

    Args:
        fov: Vertical field of view in radians
        aspect: Aspect ratio (width/height)
        near: Near clipping plane distance
        far: Far clipping plane distance

    Returns:
        numpy.ndarray: 4x4 projection matrix
    """
    f = 1.0 / np.tan(fov / 2.0)

    return np.array([
        [f / aspect, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)],
        [0, 0, -1, 0]
    ])

def ndc_to_depth(ndc_z, near, far):
    """
    Convert NDC Z to depth buffer value.

    Maps [-1, 1] to [0, 1] or custom range.

    Args:
        ndc_z: Z coordinate in NDC space [-1, 1]
        near: Near plane distance
        far: Far plane distance

    Returns:
        float: Depth value for depth buffer [0, 1]
    """
    # Map [-1, 1] to [0, 1]
    return (ndc_z + 1.0) / 2.0
```

## Triangle Rasterization with Depth

When rasterizing triangles, depth must be interpolated across the surface:

```python
def rasterize_triangle_with_depth(v0, v1, v2, framebuffer, depth_buffer, color):
    """
    Rasterize triangle with depth interpolation.

    Args:
        v0, v1, v2: Triangle vertices with (x, y, z) attributes
        framebuffer: Color buffer
        depth_buffer: Depth buffer
        color: Triangle color
    """
    # Get bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    # Rasterize
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            # Compute barycentric coordinates
            bc = barycentric_coordinates(x + 0.5, y + 0.5, v0, v1, v2)

            # Check if inside triangle
            if bc[0] >= 0 and bc[1] >= 0 and bc[2] >= 0:
                # Interpolate depth
                depth = bc[0] * v0.z + bc[1] * v1.z + bc[2] * v2.z

                # Depth test
                if depth < depth_buffer[y, x]:
                    framebuffer[y, x] = color
                    depth_buffer[y, x] = depth

def barycentric_coordinates(x, y, v0, v1, v2):
    """
    Compute barycentric coordinates of point (x, y) in triangle.

    Returns:
        tuple: (w0, w1, w2) where w0 + w1 + w2 = 1
    """
    # Area of full triangle
    denom = ((v1.y - v2.y) * (v0.x - v2.x) +
             (v2.x - v1.x) * (v0.y - v2.y))

    # Barycentric weights
    w0 = ((v1.y - v2.y) * (x - v2.x) +
          (v2.x - v1.x) * (y - v2.y)) / denom

    w1 = ((v2.y - v0.y) * (x - v2.x) +
          (v0.x - v2.x) * (y - v2.y)) / denom

    w2 = 1.0 - w0 - w1

    return (w0, w1, w2)
```

## Depth Precision and Non-Linearity

### The Depth Precision Problem

Perspective projection creates non-linear depth distribution. Values near the near plane have much higher precision than values near the far plane.

The depth value after perspective projection is:

$$z_{ndc} = \frac{f + n}{f - n} + \frac{2fn}{f - n} \cdot \frac{1}{z_{view}}$$

Where:
- $z_{ndc}$ is depth in normalized device coordinates
- $z_{view}$ is depth in view space
- $n$ is near plane distance
- $f$ is far plane distance

```python
def depth_precision_demo(near, far, num_samples=100):
    """
    Demonstrate non-linear depth distribution.

    Args:
        near: Near clipping plane
        far: Far clipping plane
        num_samples: Number of samples to compute

    Returns:
        tuple: (view_depths, ndc_depths) arrays
    """
    # Linear spacing in view space
    view_depths = np.linspace(near, far, num_samples)

    # Apply perspective projection depth mapping
    ndc_depths = []
    for z in view_depths:
        z_ndc = (far + near) / (far - near) + (2 * far * near) / (far - near) / z
        ndc_depths.append(z_ndc)

    return view_depths, np.array(ndc_depths)

def analyze_depth_precision():
    """
    Analyze depth precision distribution.

    Shows that precision is much higher near the near plane.
    """
    near = 0.1
    far = 1000.0

    view_depths, ndc_depths = depth_precision_demo(near, far)

    # Calculate precision (difference between adjacent samples)
    precision = np.diff(ndc_depths)

    print(f"Near plane precision: {precision[0]:.6f}")
    print(f"Mid range precision: {precision[len(precision)//2]:.6f}")
    print(f"Far plane precision: {precision[-1]:.6f}")
    print(f"Precision ratio (far/near): {precision[-1]/precision[0]:.2f}")
```

### Improving Depth Precision

**1. Reverse Z-Buffer**

Use reverse mapping (1 = near, 0 = far) with floating-point depth:

```python
def reverse_z_projection(fov, aspect, near, far):
    """
    Reverse Z projection for improved precision.

    Maps near plane to Z=1, far plane to Z=0.
    Provides better precision distribution with floating-point.

    Args:
        fov: Field of view
        aspect: Aspect ratio
        near: Near plane
        far: Far plane (can be infinite!)

    Returns:
        numpy.ndarray: 4x4 projection matrix
    """
    f = 1.0 / np.tan(fov / 2.0)

    # Reverse Z mapping
    return np.array([
        [f / aspect, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, 0, near],  # Modified Z mapping
        [0, 0, -1, 0]
    ])

def reverse_z_test(depth_new, depth_old):
    """
    Depth test for reverse Z.

    Reverse logic: greater = closer

    Args:
        depth_new: New fragment depth
        depth_old: Current depth buffer value

    Returns:
        bool: True if fragment passes
    """
    return depth_new > depth_old
```

**2. Logarithmic Depth Buffer**

Use logarithmic depth distribution:

```python
def logarithmic_depth(z_view, near, far):
    """
    Compute logarithmic depth value.

    Provides more uniform precision across depth range.

    Args:
        z_view: View space depth
        near: Near plane
        far: Far plane

    Returns:
        float: Logarithmic depth [0, 1]
    """
    # Logarithmic mapping
    C = 1.0
    FC = 1.0 / np.log(far * C + 1)

    return np.log(z_view * C + 1) * FC
```

**3. Optimal Near/Far Ratio**

Choose near and far planes to maximize precision:

```python
def calculate_optimal_near_plane(far_plane, desired_objects_near):
    """
    Calculate optimal near plane distance.

    Rule of thumb: near should be as far as possible while
    not clipping nearest objects. Avoid near/far ratio > 1000.

    Args:
        far_plane: Distance to far clipping plane
        desired_objects_near: Distance to nearest objects

    Returns:
        float: Recommended near plane distance
    """
    # Try to keep near/far ratio under 1000
    max_ratio = 1000.0
    optimal_near = far_plane / max_ratio

    # But don't clip near objects
    return max(optimal_near, desired_objects_near * 0.9)
```

## Z-Fighting

Z-fighting occurs when two surfaces have very similar depth values, causing precision errors to make them flicker.

### Causes of Z-Fighting

1. **Insufficient depth precision**: Using too large near/far ratio
2. **Coplanar surfaces**: Two surfaces at exactly the same depth
3. **Fixed-point depth**: Using integer depth buffers

### Solutions to Z-Fighting

```python
def polygon_offset(base_depth, factor, units):
    """
    Apply polygon offset to reduce Z-fighting.

    Used for rendering coplanar geometry (e.g., decals, outlines).

    Args:
        base_depth: Original depth value
        factor: Multiplied by slope
        units: Constant offset in depth units

    Returns:
        float: Offset depth value
    """
    # Simplified - actual implementation also uses depth slope
    offset = factor * 0.0001 + units * 0.00001
    return base_depth + offset

def render_coplanar_with_offset(geometry1, geometry2, framebuffer, depth_buffer):
    """
    Render coplanar geometry with offset to prevent Z-fighting.

    Example: Rendering decals on walls.
    """
    # Render base geometry normally
    render_geometry(geometry1, framebuffer, depth_buffer, offset=0)

    # Render overlay with slight depth offset
    render_geometry(geometry2, framebuffer, depth_buffer,
                   offset=polygon_offset(0, 1.0, 1.0))
```

## Depth Buffer Optimizations

### Early Z Rejection

Modern GPUs test depth before running expensive fragment shaders:

```python
def early_z_test(x, y, depth, depth_buffer):
    """
    Early depth test (before shading).

    If fragment will be occluded, skip expensive shading.

    Args:
        x, y: Pixel coordinates
        depth: Fragment depth
        depth_buffer: Current depth buffer

    Returns:
        bool: True if fragment might be visible
    """
    # Quick rejection
    if depth >= depth_buffer[y, x]:
        return False  # Occluded, skip shading

    return True  # Might be visible, run shader
```

### Hierarchical Z-Buffer (Hi-Z)

Maintain depth buffer pyramid for quick rejection of occluded regions:

```python
def build_hiz_pyramid(depth_buffer):
    """
    Build hierarchical Z-buffer pyramid.

    Each level stores maximum depth of 2x2 region from level below.
    Enables quick rejection of occluded tiles.

    Args:
        depth_buffer: Base level depth buffer

    Returns:
        list: Pyramid levels, finest to coarsest
    """
    pyramid = [depth_buffer]
    current = depth_buffer

    while current.shape[0] > 1 and current.shape[1] > 1:
        # Downsample by taking maximum of 2x2 regions
        h, w = current.shape
        next_level = np.zeros((h // 2, w // 2), dtype=current.dtype)

        for y in range(0, h - 1, 2):
            for x in range(0, w - 1, 2):
                # Store maximum (farthest) depth
                region = current[y:y+2, x:x+2]
                next_level[y//2, x//2] = np.max(region)

        pyramid.append(next_level)
        current = next_level

    return pyramid

def can_reject_tile(tile_min_depth, pyramid, level, tile_x, tile_y):
    """
    Check if entire tile can be rejected using Hi-Z.

    Args:
        tile_min_depth: Nearest depth in tile
        pyramid: Hi-Z pyramid
        level: Pyramid level for tile size
        tile_x, tile_y: Tile coordinates at level

    Returns:
        bool: True if entire tile is occluded
    """
    if level >= len(pyramid):
        return False

    hiz_depth = pyramid[level][tile_y, tile_x]

    # If nearest point in tile is farther than farthest
    # point in depth buffer tile, entire tile is occluded
    return tile_min_depth >= hiz_depth
```

### Depth Pre-Pass

Render depth-only first, then render with shading:

```python
def depth_prepass_rendering(scene, framebuffer, depth_buffer):
    """
    Two-pass rendering with depth pre-pass.

    Pass 1: Render depth only (cheap)
    Pass 2: Render with full shading (expensive, but many fragments rejected)

    Args:
        scene: Scene to render
        framebuffer: Color buffer
        depth_buffer: Depth buffer
    """
    # Pass 1: Depth only
    for obj in scene.objects:
        render_depth_only(obj, depth_buffer)

    # Pass 2: Full shading with early Z-test
    for obj in scene.objects:
        for fragment in obj.fragments:
            # Early Z test - many fragments rejected here
            if fragment.depth < depth_buffer[fragment.y, fragment.x]:
                # Run expensive shader only for visible fragments
                color = expensive_shader(fragment)
                framebuffer[fragment.y, fragment.x] = color
```

## Alternative Depth Formats

```python
class DepthBufferFormat:
    """Different depth buffer formats with tradeoffs."""

    @staticmethod
    def create_d16(width, height):
        """
        16-bit fixed-point depth.
        - Low precision
        - Low memory (2 bytes/pixel)
        - Fast on older hardware
        """
        return np.zeros((height, width), dtype=np.uint16)

    @staticmethod
    def create_d24(width, height):
        """
        24-bit fixed-point depth.
        - Good precision
        - Moderate memory (3-4 bytes/pixel typically packed with stencil)
        - Standard format
        """
        # Simulated as float32 (actual hardware uses packed format)
        return np.zeros((height, width), dtype=np.float32)

    @staticmethod
    def create_d32f(width, height):
        """
        32-bit floating-point depth.
        - Excellent precision
        - Higher memory (4 bytes/pixel)
        - Best for reverse Z
        """
        return np.full((height, width), np.inf, dtype=np.float32)
```

## Conclusion

The depth buffer is a simple yet powerful technique for hidden surface removal, enabling real-time 3D rendering by efficiently solving the visibility problem. Understanding depth precision, Z-fighting, and optimization techniques is crucial for rendering complex scenes correctly and efficiently.

Modern graphics pipelines extensively optimize depth testing through early Z-rejection, hierarchical Z-buffers, and depth pre-passes. The choice of depth format and projection parameters significantly impacts both precision and performance.
