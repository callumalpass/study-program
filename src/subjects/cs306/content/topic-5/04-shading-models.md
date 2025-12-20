# Shading Models

## Introduction: Illumination vs. Shading

It's crucial to distinguish between **illumination models** and **shading models**:

- **Illumination Model**: Defines *what* to compute - how light interacts with surfaces (e.g., Phong, Cook-Torrance)
- **Shading Model**: Defines *where* to compute illumination - at which points across a surface (e.g., flat, Gouraud, Phong shading)

You can combine different illumination and shading models. For example, you might use Phong illumination (ambient + diffuse + specular) with Gouraud shading (compute at vertices, interpolate across faces).

This section covers the three classic shading models that determine how illumination calculations are distributed across polygons.

## Flat Shading (Constant Shading)

Flat shading computes illumination once per polygon and applies the same color to the entire surface.

### Algorithm

1. Calculate polygon normal from vertices
2. Choose a representative point (typically polygon center or first vertex)
3. Compute illumination at that point
4. Apply resulting color to entire polygon

```python
import numpy as np

def flat_shading(polygon, light_dir, light_color, material, ambient):
    """
    Flat shading: one color per polygon.

    Args:
        polygon: Polygon with vertices
        light_dir: Light direction (unit vector)
        light_color: Light intensity (r, g, b)
        material: Material properties
        ambient: Ambient light (r, g, b)

    Returns:
        numpy.ndarray: Polygon color (constant across surface)
    """
    # Calculate face normal from first three vertices
    v0, v1, v2 = polygon.vertices[0:3]

    edge1 = v1.position - v0.position
    edge2 = v2.position - v0.position

    # Cross product gives normal
    normal = np.cross(edge1, edge2)
    norm = np.linalg.norm(normal)

    if norm > 1e-6:
        normal /= norm
    else:
        # Degenerate polygon
        return np.array([0, 0, 0])

    # Calculate illumination at polygon center (or any point)
    # Ambient component
    color = material.ambient * ambient

    # Diffuse component
    n_dot_l = max(0.0, np.dot(normal, light_dir))
    color += material.diffuse * light_color * n_dot_l

    # Specular typically omitted in flat shading
    # (view-dependent, not well-defined for whole polygon)

    return np.clip(color, 0, 1)

def render_flat_shaded(mesh, framebuffer, lights, camera):
    """
    Render mesh with flat shading.

    Args:
        mesh: Triangle mesh
        framebuffer: Output buffer
        lights: List of lights
        camera: Camera for projection
    """
    for triangle in mesh.triangles:
        # Compute single color for triangle
        color = flat_shading(triangle, lights[0].direction,
                            lights[0].color, mesh.material,
                            ambient=np.array([0.2, 0.2, 0.2]))

        # Project vertices to screen space
        screen_verts = [camera.project(v.position) for v in triangle.vertices]

        # Rasterize with constant color
        rasterize_triangle(screen_verts, framebuffer, color)
```

### Properties

**Advantages:**
- Very fast (minimal computation)
- Simple to implement
- Clear polygon boundaries
- Good for low-poly aesthetic

**Disadvantages:**
- Faceted appearance - polygon edges clearly visible
- Unrealistic for smooth surfaces
- Cannot represent smooth color transitions
- Mach banding artifacts at polygon boundaries

**Use Cases:**
- Low-poly art style
- Fast previews
- Far-away objects (where details not visible)
- Debugging mesh topology

```python
def calculate_polygon_normal(vertices):
    """
    Calculate polygon normal using Newell's method.

    More robust than simple cross product for non-planar polygons.

    Args:
        vertices: List of vertex positions

    Returns:
        numpy.ndarray: Unit normal vector
    """
    normal = np.zeros(3)
    n = len(vertices)

    for i in range(n):
        v0 = vertices[i]
        v1 = vertices[(i + 1) % n]

        normal[0] += (v0[1] - v1[1]) * (v0[2] + v1[2])
        normal[1] += (v0[2] - v1[2]) * (v0[0] + v1[0])
        normal[2] += (v0[0] - v1[0]) * (v0[1] + v1[1])

    norm = np.linalg.norm(normal)
    if norm > 1e-6:
        return normal / norm
    else:
        return np.array([0, 1, 0])  # Default up vector
```

## Gouraud Shading (Intensity Interpolation Shading)

Gouraud shading, developed by Henri Gouraud in 1971, computes illumination at vertices and linearly interpolates across polygon faces.

### Algorithm

1. Compute vertex normals (averaged from adjacent face normals)
2. Calculate illumination at each vertex
3. Interpolate vertex colors across the polygon during rasterization

```python
def calculate_vertex_normals(mesh):
    """
    Calculate smooth vertex normals by averaging adjacent face normals.

    Args:
        mesh: Triangle mesh

    Returns:
        dict: Mapping from vertex to normal vector
    """
    vertex_normals = {}

    # Initialize
    for vertex in mesh.vertices:
        vertex_normals[vertex.id] = np.zeros(3)

    # Accumulate face normals
    for triangle in mesh.triangles:
        # Calculate face normal
        v0, v1, v2 = triangle.vertices

        edge1 = v1.position - v0.position
        edge2 = v2.position - v0.position
        face_normal = np.cross(edge1, edge2)

        # Normalize
        norm = np.linalg.norm(face_normal)
        if norm > 1e-6:
            face_normal /= norm

        # Add to each vertex
        for vertex in triangle.vertices:
            vertex_normals[vertex.id] += face_normal

    # Normalize accumulated normals
    for vertex_id in vertex_normals:
        normal = vertex_normals[vertex_id]
        norm = np.linalg.norm(normal)

        if norm > 1e-6:
            vertex_normals[vertex_id] = normal / norm
        else:
            vertex_normals[vertex_id] = np.array([0, 1, 0])

    return vertex_normals

def gouraud_shading(triangle, vertex_normals, light, material, ambient, view_pos):
    """
    Gouraud shading: interpolate vertex colors.

    Args:
        triangle: Triangle with 3 vertices
        vertex_normals: Dict mapping vertex ID to normal
        light: Light source
        material: Material properties
        ambient: Ambient light
        view_pos: Camera position

    Returns:
        tuple: Three vertex colors to interpolate
    """
    vertex_colors = []

    for vertex in triangle.vertices:
        normal = vertex_normals[vertex.id]

        # Light direction
        light_dir, _ = light.get_light_direction(vertex.position)

        # View direction
        view_dir = view_pos - vertex.position
        view_dir /= np.linalg.norm(view_dir)

        # Compute full Phong illumination at vertex
        color = compute_phong(normal, light_dir, view_dir,
                             light.color, material, ambient)

        vertex_colors.append(color)

    return vertex_colors

def rasterize_gouraud_triangle(v0, v1, v2, c0, c1, c2, framebuffer):
    """
    Rasterize triangle with Gouraud shading.

    Interpolates vertex colors across the triangle.

    Args:
        v0, v1, v2: Vertex positions (screen space)
        c0, c1, c2: Vertex colors
        framebuffer: Output buffer
    """
    # Get bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    # Rasterize
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            # Barycentric coordinates
            bc = barycentric_coordinates(x + 0.5, y + 0.5, v0, v1, v2)

            if bc[0] >= 0 and bc[1] >= 0 and bc[2] >= 0:
                # Interpolate color
                color = bc[0] * c0 + bc[1] * c1 + bc[2] * c2

                framebuffer[y, x] = np.clip(color, 0, 1)
```

### Properties

**Advantages:**
- Smooth shading across surfaces
- Hides polygon boundaries
- Relatively efficient (illumination at vertices only)
- Good balance of quality and performance

**Disadvantages:**
- Specular highlights not accurate
- Intensity interpolation not perspective-correct
- Can miss highlights inside polygons
- Mach banding at sharp edges

**Use Cases:**
- Real-time rendering of smooth surfaces
- Game engines (especially older/mobile)
- When vertex density is high relative to detail

### Mach Banding

Gouraud shading can exhibit **Mach banding** - visible bands where the derivative of intensity changes discontinuously:

```python
def demonstrate_mach_banding():
    """
    Show how linear interpolation creates visible bands.
    """
    import matplotlib.pyplot as plt

    # Linear interpolation between two values
    x = np.linspace(0, 10, 100)
    y = 0.1 * x  # Linear intensity ramp

    plt.figure(figsize=(12, 4))
    plt.imshow([y] * 20, aspect='auto', cmap='gray')
    plt.title('Gouraud Shading: Linear Interpolation (Can Show Banding)')
    plt.xlabel('Position')
    plt.ylabel('')
    plt.colorbar(label='Intensity')
```

## Phong Shading (Normal Interpolation Shading)

Phong shading, also developed by Bui Tuong Phong, interpolates normals across surfaces and computes illumination per pixel.

**Important:** Don't confuse Phong *shading* (normal interpolation) with Phong *illumination* (ambient + diffuse + specular). They're independent concepts!

### Algorithm

1. Compute vertex normals (like Gouraud)
2. Interpolate normals across polygon
3. Normalize interpolated normals
4. Compute illumination per pixel using interpolated normal

```python
def phong_shading(triangle, vertex_normals, framebuffer, depth_buffer,
                  light, material, ambient, view_pos):
    """
    Phong shading: interpolate normals, compute illumination per pixel.

    Args:
        triangle: Triangle with vertices
        vertex_normals: Vertex normal vectors
        framebuffer: Color buffer
        depth_buffer: Depth buffer
        light: Light source
        material: Material properties
        ambient: Ambient light
        view_pos: Camera position
    """
    v0, v1, v2 = triangle.vertices

    # Get vertex normals
    n0 = vertex_normals[v0.id]
    n1 = vertex_normals[v1.id]
    n2 = vertex_normals[v2.id]

    # Get bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    # Calculate triangle area for barycentric coordinates
    area = edge_function(v2, v0, v1)

    if abs(area) < 1e-6:
        return  # Degenerate triangle

    # Rasterize
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            px = x + 0.5
            py = y + 0.5

            # Barycentric coordinates
            w0 = edge_function(v1, v2, (px, py))
            w1 = edge_function(v2, v0, (px, py))
            w2 = edge_function(v0, v1, (px, py))

            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                # Normalize barycentric coordinates
                bc0 = w0 / area
                bc1 = w1 / area
                bc2 = w2 / area

                # Interpolate normal
                normal = bc0 * n0 + bc1 * n1 + bc2 * n2

                # Re-normalize (essential!)
                norm = np.linalg.norm(normal)
                if norm > 1e-6:
                    normal /= norm
                else:
                    continue

                # Interpolate position (for view direction)
                position = bc0 * v0.position + bc1 * v1.position + bc2 * v2.position

                # Compute illumination at this pixel
                light_dir, _ = light.get_light_direction(position)

                view_dir = view_pos - position
                view_dir /= np.linalg.norm(view_dir)

                color = compute_phong(normal, light_dir, view_dir,
                                     light.color, material, ambient)

                # Depth test
                depth = bc0 * v0.z + bc1 * v1.z + bc2 * v2.z

                if depth < depth_buffer[y, x]:
                    framebuffer[y, x] = np.clip(color, 0, 1)
                    depth_buffer[y, x] = depth

def compute_phong(normal, light_dir, view_dir, light_color, material, ambient):
    """
    Compute Phong illumination at a point.

    Args:
        normal: Surface normal
        light_dir: Direction to light
        view_dir: Direction to viewer
        light_color: Light intensity
        material: Material properties
        ambient: Ambient light

    Returns:
        numpy.ndarray: Computed color
    """
    # Ambient
    color = material.ambient * ambient

    # Diffuse
    n_dot_l = max(0.0, np.dot(normal, light_dir))
    color += material.diffuse * light_color * n_dot_l

    # Specular
    if n_dot_l > 0:
        reflect = 2.0 * n_dot_l * normal - light_dir
        reflect /= np.linalg.norm(reflect)

        r_dot_v = max(0.0, np.dot(reflect, view_dir))
        specular = r_dot_v ** material.shininess

        color += material.specular * light_color * specular

    return color
```

### Properties

**Advantages:**
- Highest quality shading
- Accurate specular highlights
- Smooth appearance even with low polygon count
- Highlights can appear anywhere on surface

**Disadvantages:**
- Most expensive (illumination per pixel)
- Requires interpolating and normalizing normals
- Still an approximation (not path tracing)

**Use Cases:**
- High-quality real-time rendering
- Modern games and applications
- When specular highlights are important
- With fragment shaders (GPU acceleration)

## Comparison of Shading Models

```python
def compare_shading_models(mesh, output_dir):
    """
    Render same mesh with all three shading models for comparison.

    Args:
        mesh: Triangle mesh to render
        output_dir: Directory to save comparison images
    """
    width, height = 800, 600

    # Setup scene
    light = DirectionalLight(
        direction=np.array([1, -1, 1]),
        color=np.array([1, 1, 1])
    )
    material = PhongMaterials.plastic_red()
    ambient = np.array([0.2, 0.2, 0.2])
    camera_pos = np.array([0, 0, 5])

    # Flat shading
    fb_flat = render_with_flat_shading(mesh, width, height, light,
                                       material, ambient)

    # Gouraud shading
    fb_gouraud = render_with_gouraud_shading(mesh, width, height, light,
                                             material, ambient, camera_pos)

    # Phong shading
    fb_phong = render_with_phong_shading(mesh, width, height, light,
                                         material, ambient, camera_pos)

    # Display comparison
    import matplotlib.pyplot as plt

    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    axes[0].imshow(fb_flat)
    axes[0].set_title('Flat Shading')
    axes[0].axis('off')

    axes[1].imshow(fb_gouraud)
    axes[1].set_title('Gouraud Shading')
    axes[1].axis('off')

    axes[2].imshow(fb_phong)
    axes[2].set_title('Phong Shading')
    axes[2].axis('off')

    plt.tight_layout()
    plt.savefig(f'{output_dir}/shading_comparison.png')
```

| Aspect | Flat | Gouraud | Phong |
|--------|------|---------|-------|
| **Computation Point** | Per polygon | Per vertex | Per pixel |
| **Interpolation** | None | Color | Normal |
| **Quality** | Low (faceted) | Medium (smooth) | High (very smooth) |
| **Cost** | Lowest | Medium | Highest |
| **Specular Highlights** | Poor | Inaccurate | Accurate |
| **Polygon Visibility** | Visible | Hidden | Hidden |
| **GPU Acceleration** | Minimal benefit | Good | Excellent |

## Modern GPU Implementation

Modern graphics pipelines implement shading models efficiently:

```python
def vertex_shader_gouraud(vertex, lights, material, ambient):
    """
    Vertex shader for Gouraud shading.

    Computes color at vertex, passes to fragment shader.

    Args:
        vertex: Input vertex with position, normal
        lights: Scene lights
        material: Material properties
        ambient: Ambient light

    Returns:
        Vertex with computed color
    """
    # Transform position to clip space
    # (Handled by graphics pipeline)

    # Compute illumination at vertex
    color = np.zeros(3)

    for light in lights:
        light_dir, _ = light.get_light_direction(vertex.position)
        n_dot_l = max(0.0, np.dot(vertex.normal, light_dir))

        color += material.diffuse * light.color * n_dot_l

    color += material.ambient * ambient

    vertex.color = color
    return vertex

def fragment_shader_gouraud(fragment):
    """
    Fragment shader for Gouraud shading.

    Simply outputs interpolated vertex color.

    Args:
        fragment: Interpolated fragment data

    Returns:
        Fragment color
    """
    # Color already interpolated by rasterizer
    return fragment.color

def fragment_shader_phong(fragment, lights, material, ambient, view_pos):
    """
    Fragment shader for Phong shading.

    Computes illumination per fragment using interpolated normal.

    Args:
        fragment: Fragment with interpolated position and normal
        lights: Scene lights
        material: Material properties
        ambient: Ambient light
        view_pos: Camera position

    Returns:
        Computed fragment color
    """
    # Normalize interpolated normal
    normal = fragment.normal / np.linalg.norm(fragment.normal)

    # Compute illumination
    color = material.ambient * ambient

    for light in lights:
        light_dir, _ = light.get_light_direction(fragment.position)

        # Diffuse
        n_dot_l = max(0.0, np.dot(normal, light_dir))
        color += material.diffuse * light.color * n_dot_l

        # Specular
        if n_dot_l > 0:
            view_dir = view_pos - fragment.position
            view_dir /= np.linalg.norm(view_dir)

            reflect = 2.0 * n_dot_l * normal - light_dir
            r_dot_v = max(0.0, np.dot(reflect, view_dir))

            color += material.specular * light.color * (r_dot_v ** material.shininess)

    return color
```

## Conclusion

The choice of shading model depends on requirements:

- **Flat Shading**: Use for stylized/retro looks, debugging, or when faceted appearance is desired
- **Gouraud Shading**: Good balance for medium-quality real-time rendering, especially with high vertex density
- **Phong Shading**: Modern standard for high-quality rendering; essential when accurate highlights matter

Modern GPUs make Phong shading practical for real-time use through fragment shaders. The per-pixel cost is mitigated by:
- Parallel fragment processing
- Early Z-culling
- Optimized shader compilation

Understanding all three models provides insight into the evolution of real-time graphics and the tradeoffs between quality and performance that continue to influence rendering techniques today.
