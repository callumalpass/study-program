# UV Mapping

## Introduction to UV Mapping

UV mapping is the process of projecting a 2D texture onto a 3D model by assigning texture coordinates to each vertex. This is one of the most artistically demanding aspects of 3D modeling, requiring both technical understanding and creative skill to achieve convincing results without visible distortion or seams.

The term "UV mapping" comes from the use of U and V to denote the axes of the 2D texture space, distinguishing them from the X, Y, Z axes of 3D space. The quality of UV mapping directly impacts the visual quality of textured models and is a critical skill in games, film, and visualization.

## UV Projection Methods

There are several fundamental projection methods for creating initial UV layouts, each suited to different geometry types.

### Planar Projection

Projects the texture onto the model as if from a flat plane. Best for flat or nearly flat surfaces.

```python
import numpy as np

def planar_projection(vertices, axis='z'):
    """
    Generate UV coordinates using planar projection.

    Args:
        vertices: Array of vertex positions (N, 3)
        axis: Projection axis ('x', 'y', or 'z')

    Returns:
        Array of UV coordinates (N, 2)
    """
    uvs = np.zeros((len(vertices), 2))

    if axis == 'z':
        # Project onto XY plane
        uvs[:, 0] = vertices[:, 0]  # U from X
        uvs[:, 1] = vertices[:, 1]  # V from Y
    elif axis == 'y':
        # Project onto XZ plane
        uvs[:, 0] = vertices[:, 0]  # U from X
        uvs[:, 1] = vertices[:, 2]  # V from Z
    elif axis == 'x':
        # Project onto YZ plane
        uvs[:, 0] = vertices[:, 1]  # U from Y
        uvs[:, 1] = vertices[:, 2]  # V from Z

    # Normalize to [0, 1]
    uvs[:, 0] = (uvs[:, 0] - uvs[:, 0].min()) / (uvs[:, 0].max() - uvs[:, 0].min())
    uvs[:, 1] = (uvs[:, 1] - uvs[:, 1].min()) / (uvs[:, 1].max() - uvs[:, 1].min())

    return uvs
```

**Advantages**: Simple, predictable, good for flat surfaces

**Disadvantages**: Severe distortion on surfaces not perpendicular to projection axis

### Cylindrical Projection

Wraps the texture around the model as if wrapping a cylinder. Ideal for cylindrical objects like bottles, columns, or tree trunks.

```python
def cylindrical_projection(vertices, axis='y'):
    """
    Generate UV coordinates using cylindrical projection.

    Args:
        vertices: Array of vertex positions (N, 3)
        axis: Cylinder axis ('x', 'y', or 'z')

    Returns:
        Array of UV coordinates (N, 2)
    """
    uvs = np.zeros((len(vertices), 2))

    if axis == 'y':
        # Cylinder along Y axis
        # U from angle around Y
        uvs[:, 0] = np.arctan2(vertices[:, 2], vertices[:, 0]) / (2 * np.pi)
        # V from height
        uvs[:, 1] = vertices[:, 1]
    elif axis == 'z':
        # Cylinder along Z axis
        uvs[:, 0] = np.arctan2(vertices[:, 1], vertices[:, 0]) / (2 * np.pi)
        uvs[:, 1] = vertices[:, 2]
    elif axis == 'x':
        # Cylinder along X axis
        uvs[:, 0] = np.arctan2(vertices[:, 2], vertices[:, 1]) / (2 * np.pi)
        uvs[:, 1] = vertices[:, 0]

    # Shift U to [0, 1] range
    uvs[:, 0] = (uvs[:, 0] + 0.5) % 1.0

    # Normalize V
    uvs[:, 1] = (uvs[:, 1] - uvs[:, 1].min()) / (uvs[:, 1].max() - uvs[:, 1].min())

    return uvs
```

**Advantages**: Natural for cylindrical objects, minimal distortion on cylinder surfaces

**Disadvantages**: Creates seam where cylinder wraps, distortion at caps

### Spherical Projection

Maps the texture onto the model as if wrapping a sphere. Used for spherical objects like planets, balls, or heads.

```python
def spherical_projection(vertices):
    """
    Generate UV coordinates using spherical projection.

    Args:
        vertices: Array of vertex positions (N, 3)

    Returns:
        Array of UV coordinates (N, 2)
    """
    uvs = np.zeros((len(vertices), 2))

    # Convert to spherical coordinates
    # θ (theta) - azimuthal angle
    # φ (phi) - polar angle

    # Calculate radius for each vertex
    r = np.sqrt(vertices[:, 0]**2 + vertices[:, 1]**2 + vertices[:, 2]**2)

    # Avoid division by zero
    r = np.maximum(r, 1e-8)

    # U from azimuthal angle (0 to 2π)
    uvs[:, 0] = np.arctan2(vertices[:, 2], vertices[:, 0]) / (2 * np.pi)

    # V from polar angle (0 to π)
    uvs[:, 1] = np.arccos(np.clip(vertices[:, 1] / r, -1.0, 1.0)) / np.pi

    # Shift U to [0, 1]
    uvs[:, 0] = (uvs[:, 0] + 0.5) % 1.0

    return uvs
```

**Advantages**: Natural for spherical objects

**Disadvantages**: Distortion at poles, seam where sphere wraps

### Box Projection (Cube Mapping)

Projects from six orthogonal directions, like unwrapping a cube. Each face of the model gets mapped to one face of the cube.

```python
def box_projection(vertices, normals):
    """
    Generate UV coordinates using box projection.

    Args:
        vertices: Array of vertex positions (N, 3)
        normals: Array of vertex normals (N, 3)

    Returns:
        Array of UV coordinates (N, 2)
    """
    uvs = np.zeros((len(vertices), 2))

    for i, (vertex, normal) in enumerate(zip(vertices, normals)):
        # Determine dominant axis from normal
        abs_normal = np.abs(normal)
        dominant_axis = np.argmax(abs_normal)

        # Project based on dominant axis
        if dominant_axis == 0:  # X dominant
            if normal[0] > 0:  # +X face
                uvs[i] = [vertex[2], vertex[1]]
            else:  # -X face
                uvs[i] = [-vertex[2], vertex[1]]
        elif dominant_axis == 1:  # Y dominant
            if normal[1] > 0:  # +Y face
                uvs[i] = [vertex[0], vertex[2]]
            else:  # -Y face
                uvs[i] = [vertex[0], -vertex[2]]
        else:  # Z dominant
            if normal[2] > 0:  # +Z face
                uvs[i] = [vertex[0], vertex[1]]
            else:  # -Z face
                uvs[i] = [-vertex[0], vertex[1]]

    # Normalize to [0, 1]
    uvs[:, 0] = (uvs[:, 0] - uvs[:, 0].min()) / (uvs[:, 0].max() - uvs[:, 0].min() + 1e-8)
    uvs[:, 1] = (uvs[:, 1] - uvs[:, 1].min()) / (uvs[:, 1].max() - uvs[:, 1].min() + 1e-8)

    return uvs
```

**Advantages**: Minimal distortion, works well for box-like objects

**Disadvantages**: Creates seams at edges where faces meet

## UV Unwrapping

UV unwrapping is the process of "cutting" a 3D model and laying it flat in 2D texture space. This is like cutting and unfolding a cardboard box.

### Seams

Seams are edges where the UV mapping is cut. Choosing seam locations is critical:

**Good seam locations**:
- Natural boundaries (clothing edges, object parts)
- Hidden areas (undersides, backs)
- Sharp geometric features

**Poor seam locations**:
- Highly visible surfaces
- Center of smooth surfaces
- Areas with important details

```python
class UVIsland:
    """Represents a connected region of UV coordinates."""

    def __init__(self, vertices, uvs, faces):
        """
        Initialize UV island.

        Args:
            vertices: 3D vertex positions
            uvs: UV coordinates
            faces: Triangle indices defining the island
        """
        self.vertices = vertices
        self.uvs = uvs
        self.faces = faces

    def calculate_area_3d(self):
        """Calculate 3D surface area of the island."""
        area = 0.0
        for face in self.faces:
            v0, v1, v2 = self.vertices[face]
            # Triangle area using cross product
            edge1 = v1 - v0
            edge2 = v2 - v0
            area += 0.5 * np.linalg.norm(np.cross(edge1, edge2))
        return area

    def calculate_area_uv(self):
        """Calculate UV space area of the island."""
        area = 0.0
        for face in self.faces:
            uv0, uv1, uv2 = self.uvs[face]
            # Triangle area in 2D
            area += 0.5 * abs(
                (uv1[0] - uv0[0]) * (uv2[1] - uv0[1]) -
                (uv2[0] - uv0[0]) * (uv1[1] - uv0[1])
            )
        return area

    def calculate_stretch(self):
        """
        Calculate texture stretch factor.

        Returns:
            Ratio of UV area to 3D area (1.0 = no stretch)
        """
        area_3d = self.calculate_area_3d()
        area_uv = self.calculate_area_uv()
        if area_3d > 0:
            return area_uv / area_3d
        return 0.0
```

## UV Distortion

Distortion occurs when the mapping from 3D to 2D space stretches or compresses the texture. There are two main types:

### Angular Distortion (Conformal Distortion)

Occurs when angles are not preserved. A square texture pattern becomes skewed.

### Area Distortion (Authalic Distortion)

Occurs when relative areas are not preserved. Some parts of the texture are stretched while others are compressed.

### Measuring Distortion

```python
def calculate_triangle_distortion(v0_3d, v1_3d, v2_3d, uv0, uv1, uv2):
    """
    Calculate distortion for a single triangle.

    Args:
        v0_3d, v1_3d, v2_3d: 3D vertex positions
        uv0, uv1, uv2: UV coordinates

    Returns:
        Distortion metric (0 = no distortion, higher = more distortion)
    """
    # 3D edges
    edge1_3d = v1_3d - v0_3d
    edge2_3d = v2_3d - v0_3d

    # UV edges
    edge1_uv = uv1 - uv0
    edge2_uv = uv2 - uv0

    # Calculate 3D triangle area
    cross_3d = np.cross(edge1_3d, edge2_3d)
    area_3d = 0.5 * np.linalg.norm(cross_3d)

    # Calculate UV triangle area
    area_uv = 0.5 * abs(edge1_uv[0] * edge2_uv[1] - edge2_uv[0] * edge1_uv[1])

    # Edge length ratios
    len1_3d = np.linalg.norm(edge1_3d)
    len2_3d = np.linalg.norm(edge2_3d)
    len1_uv = np.linalg.norm(edge1_uv)
    len2_uv = np.linalg.norm(edge2_uv)

    # Avoid division by zero
    if len1_3d < 1e-8 or len2_3d < 1e-8 or area_3d < 1e-8:
        return 0.0

    # Stretch factors
    stretch1 = len1_uv / len1_3d
    stretch2 = len2_uv / len2_3d

    # Variance in stretch indicates distortion
    avg_stretch = (stretch1 + stretch2) / 2
    distortion = abs(stretch1 - avg_stretch) + abs(stretch2 - avg_stretch)

    return distortion
```

## Minimizing Distortion

Several algorithms exist to minimize UV distortion:

### Least Squares Conformal Mapping (LSCM)

LSCM minimizes angular distortion by solving a linear system that preserves angles as much as possible.

The energy function to minimize:

```
E = ∑ ||∇u - R∇v||²
```

where R is a 90-degree rotation operator.

### Angle-Based Flattening (ABF)

ABF attempts to preserve angles exactly by solving for angles that satisfy:

```
∑ αᵢ = 2π (around interior vertices)
∑ αᵢ = π (around boundary vertices)
```

### Stretch-Based Optimization

```python
def optimize_uv_stretch(uvs, faces, vertices, iterations=10):
    """
    Optimize UV coordinates to minimize stretch.

    Args:
        uvs: Initial UV coordinates (N, 2)
        faces: Triangle indices (M, 3)
        vertices: 3D vertex positions (N, 3)
        iterations: Number of optimization iterations

    Returns:
        Optimized UV coordinates
    """
    optimized_uvs = uvs.copy()

    for _ in range(iterations):
        # For each vertex, calculate optimal position
        for i in range(len(optimized_uvs)):
            # Find all faces containing this vertex
            adjacent_faces = [f for f in faces if i in f]

            if len(adjacent_faces) == 0:
                continue

            # Calculate average position weighted by 3D edge lengths
            new_u = 0.0
            new_v = 0.0
            total_weight = 0.0

            for face in adjacent_faces:
                # Find the other two vertices in the face
                other_indices = [idx for idx in face if idx != i]

                for other_idx in other_indices:
                    # Weight by 3D edge length
                    weight = np.linalg.norm(vertices[i] - vertices[other_idx])
                    new_u += optimized_uvs[other_idx, 0] * weight
                    new_v += optimized_uvs[other_idx, 1] * weight
                    total_weight += weight

            if total_weight > 0:
                optimized_uvs[i, 0] = new_u / total_weight
                optimized_uvs[i, 1] = new_v / total_weight

    return optimized_uvs
```

## UV Layout and Packing

Once UV islands are created, they need to be arranged efficiently in the 0-1 texture space.

### Objectives

1. **Minimize waste**: Use as much of the texture as possible
2. **Maximize resolution**: Give more space to important/visible areas
3. **Maintain padding**: Leave space between islands to prevent bleeding

### Packing Algorithm

```python
class UVPacker:
    """Simple UV island packing algorithm."""

    def __init__(self, texture_size=1.0, padding=0.01):
        """
        Initialize packer.

        Args:
            texture_size: Size of UV space (typically 1.0)
            padding: Minimum padding between islands
        """
        self.texture_size = texture_size
        self.padding = padding
        self.placed_islands = []

    def get_island_bounds(self, uvs):
        """Get bounding box of UV coordinates."""
        min_u = uvs[:, 0].min()
        max_u = uvs[:, 0].max()
        min_v = uvs[:, 1].min()
        max_v = uvs[:, 1].max()
        return (min_u, min_v, max_u, max_v)

    def normalize_island(self, uvs):
        """Normalize island to start at (0, 0)."""
        min_u, min_v, _, _ = self.get_island_bounds(uvs)
        normalized = uvs.copy()
        normalized[:, 0] -= min_u
        normalized[:, 1] -= min_v
        return normalized

    def pack_islands(self, islands, scale_by_area=True):
        """
        Pack UV islands into texture space.

        Args:
            islands: List of UVIsland objects
            scale_by_area: Scale islands based on 3D surface area

        Returns:
            List of transformed UV coordinates
        """
        if scale_by_area:
            # Scale islands proportionally to their 3D area
            total_area_3d = sum(island.calculate_area_3d() for island in islands)
            for island in islands:
                scale = np.sqrt(island.calculate_area_3d() / total_area_3d)
                island.uvs *= scale

        # Sort islands by area (largest first)
        sorted_islands = sorted(islands,
                               key=lambda x: x.calculate_area_uv(),
                               reverse=True)

        # Simple shelf packing
        current_x = self.padding
        current_y = self.padding
        row_height = 0

        packed_uvs = []

        for island in sorted_islands:
            # Normalize island
            normalized = self.normalize_island(island.uvs)
            bounds = self.get_island_bounds(normalized)
            width = bounds[2] - bounds[0]
            height = bounds[3] - bounds[1]

            # Check if island fits in current row
            if current_x + width + self.padding > self.texture_size:
                # Start new row
                current_x = self.padding
                current_y += row_height + self.padding
                row_height = 0

            # Place island
            placed_uvs = normalized.copy()
            placed_uvs[:, 0] += current_x
            placed_uvs[:, 1] += current_y
            packed_uvs.append(placed_uvs)

            # Update position
            current_x += width + self.padding
            row_height = max(row_height, height)

        return packed_uvs
```

## UV Shells and Islands

A **UV shell** or **UV island** is a connected group of faces in UV space. Proper organization of UV shells is crucial for efficient texturing.

### Best Practices

1. **Minimize islands**: Fewer islands = fewer seams
2. **Orient consistently**: Align islands to texture grid
3. **Use texture space wisely**: Scale islands based on importance
4. **Maintain consistent texel density**: Equal 3D area should use equal UV area

### Texel Density

```python
def calculate_texel_density(area_3d, area_uv, texture_resolution):
    """
    Calculate texel density (texels per unit of 3D surface).

    Args:
        area_3d: 3D surface area
        area_uv: UV space area [0, 1]
        texture_resolution: Texture size in pixels

    Returns:
        Texels per unit 3D area
    """
    if area_3d <= 0:
        return 0.0

    # Total texels used by this area
    texels = area_uv * (texture_resolution ** 2)

    # Texels per unit 3D area
    density = texels / area_3d

    return density

# Example: Check if two islands have similar density
island1_density = calculate_texel_density(10.0, 0.25, 1024)  # 26,214 texels/unit²
island2_density = calculate_texel_density(5.0, 0.125, 1024)  # 26,214 texels/unit²
# These have identical density - good!
```

## Advanced Techniques

### Tri-Planar Mapping

Automatically blends three planar projections based on surface normal:

```python
def tri_planar_texture(position, normal, texture, blend_sharpness=4.0):
    """
    Sample texture using tri-planar mapping.

    Args:
        position: 3D position
        normal: Surface normal
        texture: Texture object
        blend_sharpness: Controls blend between planes

    Returns:
        Blended color
    """
    # Calculate blend weights from normal
    blend = np.abs(normal) ** blend_sharpness
    blend = blend / blend.sum()

    # Sample from three planes
    color_x = texture.sample(position[1], position[2])  # YZ plane
    color_y = texture.sample(position[0], position[2])  # XZ plane
    color_z = texture.sample(position[0], position[1])  # XY plane

    # Blend
    color = color_x * blend[0] + color_y * blend[1] + color_z * blend[2]

    return color
```

### UV Randomization

Useful for reducing tiling patterns in repeated textures.

## Conclusion

UV mapping is both an art and a science. Good UV layouts minimize distortion, place seams strategically, use texture space efficiently, and maintain consistent texel density. Modern 3D software provides automatic unwrapping algorithms, but understanding the fundamentals allows artists to achieve optimal results and fix problematic UVs when automatic methods fail.
