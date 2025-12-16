# Normal Mapping

## Introduction to Normal Mapping

Normal mapping is a technique for simulating complex surface detail by perturbing surface normals during shading, without actually modifying the geometry. This allows low-polygon models to appear highly detailed when lit, providing the illusion of geometric complexity at a fraction of the cost.

Introduced in the late 1990s and popularized in early 2000s games like Doom 3, normal mapping has become a fundamental technique in modern real-time graphics. It enables artists to create rich, detailed surfaces while keeping polygon counts manageable for real-time rendering.

## Bump Mapping vs Normal Mapping

### Bump Mapping (Height Maps)

Bump mapping, introduced by James Blinn in 1978, stores a single height value per texel:

```python
import numpy as np

def apply_bump_map(height_map, u, v, du, dv):
    """
    Calculate perturbed normal from height map.

    Args:
        height_map: 2D array of height values
        u, v: Texture coordinates
        du, dv: Small offsets for derivative estimation

    Returns:
        Perturbed normal vector
    """
    # Sample height at three points
    h_center = sample_texture(height_map, u, v)
    h_u = sample_texture(height_map, u + du, v)
    h_v = sample_texture(height_map, u, v + dv)

    # Estimate partial derivatives
    dh_du = (h_u - h_center) / du
    dh_dv = (h_v - h_center) / dv

    # Create tangent space perturbation
    # In tangent space: X and Y are tangent/bitangent, Z is normal
    perturbation = np.array([
        -dh_du,
        -dh_dv,
        1.0
    ])

    # Normalize
    perturbation = perturbation / np.linalg.norm(perturbation)

    return perturbation
```

**Advantages**: Compact storage (1 channel vs 3)

**Disadvantages**: Requires derivative computation, less direct control

### Normal Mapping

Normal mapping directly stores the perturbed normal vector in RGB channels:

```python
def decode_normal_map(normal_texture, u, v):
    """
    Decode normal from normal map texture.

    Args:
        normal_texture: RGB texture where RGB encodes XYZ
        u, v: Texture coordinates

    Returns:
        Normal vector in tangent space
    """
    # Sample normal map
    rgb = sample_texture(normal_texture, u, v)

    # Convert from [0, 1] to [-1, 1]
    normal = rgb * 2.0 - 1.0

    # Ensure normalized (filtering can change length)
    length = np.linalg.norm(normal)
    if length > 0:
        normal = normal / length

    return normal
```

**Advantages**: Direct storage, no derivatives needed, artist control

**Disadvantages**: 3× storage, requires proper space transformation

## Tangent Space

Normal maps are typically stored in **tangent space** (also called texture space), where:
- **X axis** points along the surface's U direction (tangent)
- **Y axis** points along the surface's V direction (bitangent)
- **Z axis** points along the geometric normal

This makes normal maps reusable across different instances of the same model.

### Coordinate Spaces

```python
class CoordinateSpaces:
    """Different coordinate spaces for normal mapping."""

    @staticmethod
    def tangent_space_normal():
        """
        Tangent space: relative to surface.
        - Reusable across instances
        - Blue-ish appearance (Z+ is common)
        - Most common format
        """
        return "Tangent Space"

    @staticmethod
    def object_space_normal():
        """
        Object space: relative to model's local coordinates.
        - Colorful appearance
        - Not reusable
        - Useful for unique objects
        """
        return "Object Space"

    @staticmethod
    def world_space_normal():
        """
        World space: absolute directions.
        - Rarely used
        - Inflexible
        """
        return "World Space"
```

### Computing Tangent Basis

To transform normals from tangent space to world space, we need the TBN matrix (Tangent, Bitangent, Normal):

```python
def calculate_tangent_basis(v0, v1, v2, uv0, uv1, uv2, normal):
    """
    Calculate tangent space basis for a triangle.

    Args:
        v0, v1, v2: Triangle vertices in world space
        uv0, uv1, uv2: Triangle UV coordinates
        normal: Geometric normal (already normalized)

    Returns:
        (tangent, bitangent, normal) - TBN basis
    """
    # Edge vectors
    edge1 = v1 - v0
    edge2 = v2 - v0

    # UV deltas
    delta_uv1 = uv1 - uv0
    delta_uv2 = uv2 - uv0

    # Calculate tangent and bitangent
    # Solve: edge1 = delta_u1 * T + delta_v1 * B
    #        edge2 = delta_u2 * T + delta_v2 * B

    denominator = delta_uv1[0] * delta_uv2[1] - delta_uv2[0] * delta_uv1[1]

    if abs(denominator) < 1e-6:
        # Degenerate UV coordinates, use arbitrary basis
        tangent = np.array([1, 0, 0])
        bitangent = np.array([0, 1, 0])
    else:
        f = 1.0 / denominator

        tangent = np.array([
            f * (delta_uv2[1] * edge1[0] - delta_uv1[1] * edge2[0]),
            f * (delta_uv2[1] * edge1[1] - delta_uv1[1] * edge2[1]),
            f * (delta_uv2[1] * edge1[2] - delta_uv1[1] * edge2[2])
        ])

        bitangent = np.array([
            f * (-delta_uv2[0] * edge1[0] + delta_uv1[0] * edge2[0]),
            f * (-delta_uv2[0] * edge1[1] + delta_uv1[0] * edge2[1]),
            f * (-delta_uv2[0] * edge1[2] + delta_uv1[0] * edge2[2])
        ])

    # Gram-Schmidt orthogonalization
    # Ensure tangent is perpendicular to normal
    tangent = tangent - normal * np.dot(tangent, normal)
    tangent = tangent / np.linalg.norm(tangent)

    # Ensure bitangent is perpendicular to both
    bitangent = bitangent - normal * np.dot(bitangent, normal)
    bitangent = bitangent - tangent * np.dot(bitangent, tangent)
    bitangent = bitangent / np.linalg.norm(bitangent)

    return tangent, bitangent, normal
```

### TBN Matrix Construction

```python
def construct_tbn_matrix(tangent, bitangent, normal):
    """
    Construct TBN matrix for transforming from tangent to world space.

    Args:
        tangent: Tangent vector (normalized)
        bitangent: Bitangent vector (normalized)
        normal: Normal vector (normalized)

    Returns:
        3×3 TBN transformation matrix
    """
    # Each vector becomes a column in the matrix
    tbn = np.column_stack([tangent, bitangent, normal])
    return tbn

def transform_tangent_to_world(tangent_space_normal, tbn_matrix):
    """
    Transform normal from tangent space to world space.

    Args:
        tangent_space_normal: Normal in tangent space
        tbn_matrix: TBN transformation matrix

    Returns:
        Normal in world space
    """
    world_normal = tbn_matrix @ tangent_space_normal
    return world_normal / np.linalg.norm(world_normal)
```

## Normal Map Formats

### Unsigned Format (Most Common)

Each component stored as [0, 1] and decoded to [-1, 1]:

```python
def encode_normal_unsigned(normal):
    """
    Encode normal vector to unsigned format.

    Args:
        normal: Normal vector (normalized, components in [-1, 1])

    Returns:
        RGB color (components in [0, 1])
    """
    return (normal + 1.0) / 2.0

def decode_normal_unsigned(rgb):
    """
    Decode normal from unsigned format.

    Args:
        rgb: RGB color (components in [0, 1])

    Returns:
        Normal vector (components in [-1, 1])
    """
    normal = rgb * 2.0 - 1.0
    # Renormalize after decoding
    return normal / np.linalg.norm(normal)
```

### Compressed Formats

Store only X and Y, reconstruct Z:

```python
def encode_normal_compressed(normal):
    """
    Encode normal using RG channels only (X and Y).
    Z is assumed positive and reconstructed.

    Args:
        normal: Normal vector (normalized)

    Returns:
        RG color (2 components in [0, 1])
    """
    return (normal[:2] + 1.0) / 2.0

def decode_normal_compressed(rg):
    """
    Decode normal from RG-compressed format.

    Args:
        rg: RG color (2 components in [0, 1])

    Returns:
        Normal vector (3 components)
    """
    # Decode X and Y
    x = rg[0] * 2.0 - 1.0
    y = rg[1] * 2.0 - 1.0

    # Reconstruct Z (assuming Z is positive)
    z_squared = 1.0 - x*x - y*y
    z = np.sqrt(max(0.0, z_squared))

    return np.array([x, y, z])
```

### BC5 / DXT5nm Format

Graphics hardware compression specifically for normal maps:

- **BC5**: Compresses RG channels independently (high quality)
- **DXT5nm**: Stores X in alpha, Y in green (legacy compatibility)

## Generating Normal Maps

### From High-Resolution Geometry

```python
def bake_normal_map(high_poly_mesh, low_poly_mesh, resolution=1024):
    """
    Bake normal map from high-poly to low-poly mesh.

    Args:
        high_poly_mesh: High-resolution source mesh
        low_poly_mesh: Low-resolution target mesh with UVs
        resolution: Normal map resolution

    Returns:
        Normal map texture
    """
    normal_map = np.zeros((resolution, resolution, 3))

    # For each pixel in the normal map
    for y in range(resolution):
        for x in range(resolution):
            # Convert pixel to UV coordinates
            u = (x + 0.5) / resolution
            v = (y + 0.5) / resolution

            # Find corresponding point on low-poly mesh
            low_poly_point, low_poly_normal, tangent, bitangent = \
                low_poly_mesh.sample_surface(u, v)

            # Cast ray along low-poly normal to find high-poly surface
            ray_origin = low_poly_point
            ray_direction = low_poly_normal

            high_poly_point, high_poly_normal = \
                high_poly_mesh.ray_intersect(ray_origin, ray_direction)

            if high_poly_point is not None:
                # Construct TBN matrix
                tbn = construct_tbn_matrix(tangent, bitangent, low_poly_normal)

                # Transform high-poly normal to tangent space
                tbn_inverse = np.linalg.inv(tbn)
                tangent_space_normal = tbn_inverse @ high_poly_normal

                # Normalize
                tangent_space_normal /= np.linalg.norm(tangent_space_normal)

                # Encode
                normal_map[y, x] = encode_normal_unsigned(tangent_space_normal)
            else:
                # No intersection, use default normal (pointing up)
                normal_map[y, x] = encode_normal_unsigned(np.array([0, 0, 1]))

    return normal_map
```

### From Height Maps

```python
def height_map_to_normal_map(height_map, strength=1.0):
    """
    Convert height map to normal map using Sobel operator.

    Args:
        height_map: 2D array of height values [0, 1]
        strength: Normal strength multiplier

    Returns:
        Normal map (height, width, 3)
    """
    height, width = height_map.shape

    # Sobel kernels for derivative estimation
    sobel_x = np.array([[-1, 0, 1],
                        [-2, 0, 2],
                        [-1, 0, 1]]) / 8.0

    sobel_y = np.array([[-1, -2, -1],
                        [ 0,  0,  0],
                        [ 1,  2,  1]]) / 8.0

    # Compute gradients using convolution
    from scipy.ndimage import convolve

    grad_x = convolve(height_map, sobel_x) * strength
    grad_y = convolve(height_map, sobel_y) * strength

    # Create normal map
    normal_map = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            # Normal components
            nx = -grad_x[y, x]
            ny = -grad_y[y, x]
            nz = 1.0

            # Normalize
            normal = np.array([nx, ny, nz])
            normal = normal / np.linalg.norm(normal)

            # Encode
            normal_map[y, x] = encode_normal_unsigned(normal)

    return normal_map
```

## Shading with Normal Maps

### Per-Pixel Lighting with Normal Maps

```python
def calculate_lighting_with_normal_map(
    fragment_position,
    geometric_normal,
    tangent,
    bitangent,
    normal_map_sample,
    light_position,
    light_color,
    material_color
):
    """
    Calculate per-pixel lighting using normal map.

    Args:
        fragment_position: 3D position being shaded
        geometric_normal: Geometric surface normal
        tangent: Surface tangent vector
        bitangent: Surface bitangent vector
        normal_map_sample: RGB value from normal map [0, 1]
        light_position: Position of point light
        light_color: Light color/intensity
        material_color: Base material color

    Returns:
        Final lit color
    """
    # Decode normal from normal map
    tangent_normal = decode_normal_unsigned(normal_map_sample)

    # Construct TBN matrix
    tbn = construct_tbn_matrix(tangent, bitangent, geometric_normal)

    # Transform to world space
    world_normal = transform_tangent_to_world(tangent_normal, tbn)

    # Calculate lighting vectors
    light_dir = light_position - fragment_position
    light_distance = np.linalg.norm(light_dir)
    light_dir = light_dir / light_distance

    view_dir = -fragment_position / np.linalg.norm(fragment_position)

    # Lambertian diffuse
    n_dot_l = max(0.0, np.dot(world_normal, light_dir))
    diffuse = material_color * light_color * n_dot_l

    # Blinn-Phong specular
    half_vector = (light_dir + view_dir) / np.linalg.norm(light_dir + view_dir)
    n_dot_h = max(0.0, np.dot(world_normal, half_vector))
    specular = light_color * (n_dot_h ** 32)  # 32 = shininess

    # Attenuation
    attenuation = 1.0 / (light_distance ** 2)

    # Combine
    final_color = (diffuse + specular) * attenuation

    return final_color
```

## Advanced Techniques

### Detail Normal Mapping

Combining multiple normal maps at different scales:

```python
def blend_normal_maps(base_normal, detail_normal, detail_strength=0.5):
    """
    Blend two normal maps (detail mapping).

    Args:
        base_normal: Base normal map sample (tangent space)
        detail_normal: Detail normal map sample (tangent space)
        detail_strength: Strength of detail normal [0, 1]

    Returns:
        Blended normal (tangent space)
    """
    # Decode both normals
    base = decode_normal_unsigned(base_normal)
    detail = decode_normal_unsigned(detail_normal)

    # Blend using partial derivative blending (Reoriented Normal Mapping)
    # This preserves detail better than simple linear blending

    # Flatten detail by adjusting z
    detail[2] = detail[2] / detail_strength

    # Combine
    result = np.array([
        base[0] + detail[0],
        base[1] + detail[1],
        base[2] * detail[2]
    ])

    # Normalize
    result = result / np.linalg.norm(result)

    return encode_normal_unsigned(result)
```

### Parallax Mapping

Extends normal mapping by offsetting texture coordinates based on height:

```python
def parallax_offset(height_map, uv, view_dir_tangent, scale=0.04):
    """
    Calculate UV offset for parallax mapping.

    Args:
        height_map: Height texture
        uv: Original UV coordinates
        view_dir_tangent: View direction in tangent space
        scale: Parallax scale factor

    Returns:
        Offset UV coordinates
    """
    # Sample height
    height = sample_texture(height_map, uv[0], uv[1])

    # Calculate offset
    # Offset is proportional to height and view angle
    offset = view_dir_tangent[:2] * (height * scale / view_dir_tangent[2])

    # Apply offset
    new_uv = uv - offset

    return new_uv
```

### Steep Parallax Mapping (Parallax Occlusion Mapping)

Iteratively ray-marches through the height field:

```python
def parallax_occlusion_mapping(
    height_map,
    uv,
    view_dir_tangent,
    num_steps=16,
    scale=0.04
):
    """
    Parallax occlusion mapping with ray marching.

    Args:
        height_map: Height texture
        uv: Original UV coordinates
        view_dir_tangent: View direction in tangent space
        num_steps: Number of ray marching steps
        scale: Parallax scale factor

    Returns:
        Refined UV coordinates with self-occlusion
    """
    # Calculate step size
    step_size = 1.0 / num_steps

    # Initial values
    current_uv = uv.copy()
    current_height = 0.0
    uv_step = view_dir_tangent[:2] * scale / (view_dir_tangent[2] * num_steps)

    # Ray march through height field
    for i in range(num_steps):
        # Sample height map
        height_from_map = sample_texture(height_map, current_uv[0], current_uv[1])

        # Check if ray is below surface
        if current_height >= height_from_map:
            break

        # Step forward
        current_uv -= uv_step
        current_height += step_size

    # Refinement: interpolate between last two samples
    # (Optional, improves quality)
    prev_uv = current_uv + uv_step
    prev_height = current_height - step_size
    prev_height_from_map = sample_texture(height_map, prev_uv[0], prev_uv[1])

    # Linear interpolation
    weight = (prev_height - prev_height_from_map) / \
             ((prev_height - prev_height_from_map) - (current_height - height_from_map))

    final_uv = prev_uv + weight * (current_uv - prev_uv)

    return final_uv
```

## Common Artifacts and Solutions

### Tangent Space Seams

Discontinuous tangent basis across UV seams causes lighting artifacts.

**Solution**: Ensure consistent tangent space calculation across seams.

### Normal Map Compression Artifacts

BC compression can introduce banding in smooth gradients.

**Solution**: Use BC5 compression (better than DXT1/DXT5) or uncompressed for critical assets.

### Incorrect Normal Lengths

Filtering can change normal vector lengths.

**Solution**: Always renormalize after sampling and filtering.

```python
def sample_normal_with_renormalization(normal_map, u, v):
    """Sample and renormalize normal."""
    sample = BilinearFilter.sample(normal_map, u, v)
    normal = decode_normal_unsigned(sample)
    return normal / np.linalg.norm(normal)
```

## Conclusion

Normal mapping is essential for modern real-time graphics, providing detailed surface appearance without geometric cost. Understanding tangent space transformations, proper TBN basis construction, and correct normal decoding is crucial for artifact-free results. Advanced techniques like parallax occlusion mapping extend the illusion even further, creating truly convincing surface detail in real-time.
