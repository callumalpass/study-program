# Environment Mapping

## Introduction to Environment Mapping

Environment mapping is a technique for simulating reflections and refractions on objects by using pre-rendered or captured images of the surrounding environment. Instead of ray tracing the entire scene to calculate what an object reflects, environment mapping uses a texture that represents the environment from different viewing directions.

Introduced by Blinn and Newell in 1976, environment mapping has evolved from simple sphere maps to sophisticated cube maps and is fundamental to modern physically-based rendering (PBR) workflows. It enables convincing reflections at minimal computational cost, making it ideal for real-time applications.

## Types of Environment Maps

### Sphere Mapping

The earliest form of environment mapping, projecting the environment onto a sphere as seen from a single viewpoint.

```python
import numpy as np

def calculate_sphere_map_coords(reflection_vector):
    """
    Calculate sphere map texture coordinates from reflection vector.

    Args:
        reflection_vector: Reflected view vector (normalized)

    Returns:
        (u, v) texture coordinates [0, 1]
    """
    # Project reflection vector onto sphere
    # Assume view direction is along -Z axis

    r = reflection_vector
    m = 2.0 * np.sqrt(r[0]**2 + r[1]**2 + (r[2] + 1)**2)

    # Sphere map coordinates
    u = r[0] / m + 0.5
    v = r[1] / m + 0.5

    return u, v

def generate_sphere_map_from_cube(cube_faces, resolution=512):
    """
    Generate sphere map from cube map faces.

    Args:
        cube_faces: Dict with keys 'px', 'nx', 'py', 'ny', 'pz', 'nz'
        resolution: Sphere map resolution

    Returns:
        Sphere map texture
    """
    sphere_map = np.zeros((resolution, resolution, 3))

    for y in range(resolution):
        for x in range(resolution):
            # Convert pixel to normalized coordinates [-1, 1]
            u = (x + 0.5) / resolution * 2.0 - 1.0
            v = (y + 0.5) / resolution * 2.0 - 1.0

            # Calculate 3D direction
            # Sphere map formula inverted
            r_squared = u**2 + v**2

            if r_squared > 1.0:
                continue  # Outside sphere

            # Reconstruct reflection vector
            rx = u
            ry = v
            rz = -1.0 + r_squared / 2.0

            direction = np.array([rx, ry, rz])
            direction = direction / np.linalg.norm(direction)

            # Sample from cube map
            color = sample_cube_map(cube_faces, direction)
            sphere_map[y, x] = color

    return sphere_map
```

**Advantages**:
- Simple to generate from photos (fish-eye lens)
- Compact storage (single texture)
- Fast lookup

**Disadvantages**:
- View-dependent (only correct from one position)
- Distortion increases toward edges
- Non-uniform sampling density
- Rarely used in modern engines

### Cube Mapping

The most common environment mapping technique, using six square textures arranged like faces of a cube.

```python
class CubeMap:
    """Cube map for environment mapping."""

    def __init__(self, faces):
        """
        Initialize cube map.

        Args:
            faces: Dictionary with keys:
                'px' - positive X (right)
                'nx' - negative X (left)
                'py' - positive Y (top)
                'ny' - negative Y (bottom)
                'pz' - positive Z (front)
                'nz' - negative Z (back)
        """
        self.faces = faces

    def sample(self, direction):
        """
        Sample cube map in given direction.

        Args:
            direction: 3D direction vector (normalized)

        Returns:
            Color from cube map
        """
        # Find dominant axis
        abs_dir = np.abs(direction)
        max_axis = np.argmax(abs_dir)

        # Determine face and calculate UV coordinates
        if max_axis == 0:  # X dominant
            if direction[0] > 0:  # +X face
                face = self.faces['px']
                u = -direction[2] / abs_dir[0]
                v = -direction[1] / abs_dir[0]
            else:  # -X face
                face = self.faces['nx']
                u = direction[2] / abs_dir[0]
                v = -direction[1] / abs_dir[0]

        elif max_axis == 1:  # Y dominant
            if direction[1] > 0:  # +Y face
                face = self.faces['py']
                u = direction[0] / abs_dir[1]
                v = direction[2] / abs_dir[1]
            else:  # -Y face
                face = self.faces['ny']
                u = direction[0] / abs_dir[1]
                v = -direction[2] / abs_dir[1]

        else:  # Z dominant
            if direction[2] > 0:  # +Z face
                face = self.faces['pz']
                u = direction[0] / abs_dir[2]
                v = -direction[1] / abs_dir[2]
            else:  # -Z face
                face = self.faces['nz']
                u = -direction[0] / abs_dir[2]
                v = -direction[1] / abs_dir[2]

        # Convert from [-1, 1] to [0, 1]
        u = (u + 1.0) * 0.5
        v = (v + 1.0) * 0.5

        # Sample face texture
        return sample_texture_bilinear(face, u, v)

def sample_texture_bilinear(texture, u, v):
    """Bilinear texture sampling."""
    height, width = texture.shape[:2]

    x = u * (width - 1)
    y = v * (height - 1)

    x0 = int(np.floor(x))
    y0 = int(np.floor(y))
    x1 = min(x0 + 1, width - 1)
    y1 = min(y0 + 1, height - 1)

    fx = x - x0
    fy = y - y0

    c00 = texture[y0, x0]
    c10 = texture[y0, x1]
    c01 = texture[y1, x0]
    c11 = texture[y1, x1]

    c0 = c00 * (1 - fx) + c10 * fx
    c1 = c01 * (1 - fx) + c11 * fx

    return c0 * (1 - fy) + c1 * fy
```

**Advantages**:
- View-independent (works from any position)
- Uniform sampling density
- Hardware support on all modern GPUs
- Can be easily filtered and mipmapped

**Disadvantages**:
- Seams between faces (requires careful filtering)
- 6× storage compared to single texture

### Equirectangular (Lat-Long) Mapping

Stores environment as a 2D image using latitude-longitude parameterization, like a world map.

```python
def direction_to_equirectangular(direction):
    """
    Convert 3D direction to equirectangular coordinates.

    Args:
        direction: Normalized 3D direction vector

    Returns:
        (u, v) texture coordinates
    """
    # Calculate spherical coordinates
    # θ (theta) = azimuthal angle
    # φ (phi) = polar angle

    theta = np.arctan2(direction[0], direction[2])  # -π to π
    phi = np.arcsin(direction[1])  # -π/2 to π/2

    # Convert to UV [0, 1]
    u = (theta / (2 * np.pi)) + 0.5
    v = (phi / np.pi) + 0.5

    return u, v

def equirectangular_to_cube_map(equirect_image, face_size=512):
    """
    Convert equirectangular map to cube map.

    Args:
        equirect_image: Equirectangular environment map
        face_size: Resolution of each cube face

    Returns:
        Dictionary of cube faces
    """
    cube_faces = {}

    # Define face directions and up vectors
    face_configs = {
        'px': {'forward': [1, 0, 0],  'up': [0, -1, 0]},
        'nx': {'forward': [-1, 0, 0], 'up': [0, -1, 0]},
        'py': {'forward': [0, 1, 0],  'up': [0, 0, 1]},
        'ny': {'forward': [0, -1, 0], 'up': [0, 0, -1]},
        'pz': {'forward': [0, 0, 1],  'up': [0, -1, 0]},
        'nz': {'forward': [0, 0, -1], 'up': [0, -1, 0]},
    }

    for face_name, config in face_configs.items():
        face = np.zeros((face_size, face_size, 3))
        forward = np.array(config['forward'])
        up = np.array(config['up'])
        right = np.cross(up, forward)

        for y in range(face_size):
            for x in range(face_size):
                # Convert pixel to direction
                u = (x + 0.5) / face_size * 2.0 - 1.0
                v = (y + 0.5) / face_size * 2.0 - 1.0

                direction = forward + right * u + up * v
                direction = direction / np.linalg.norm(direction)

                # Sample from equirectangular map
                eq_u, eq_v = direction_to_equirectangular(direction)
                face[y, x] = sample_texture_bilinear(equirect_image, eq_u, eq_v)

        cube_faces[face_name] = face

    return cube_faces
```

**Advantages**:
- Easy to create from panoramic photos
- Single continuous texture
- Common format for HDR environments

**Disadvantages**:
- Distortion at poles (top and bottom)
- Non-uniform sampling density
- Requires conversion to cube map for efficient use

## Reflection Calculation

### Reflection Vector

The key to environment mapping is calculating the reflection vector:

```python
def calculate_reflection_vector(incident, normal):
    """
    Calculate reflection vector.

    Args:
        incident: Incident ray direction (from eye to surface)
        normal: Surface normal (normalized)

    Returns:
        Reflection direction (normalized)
    """
    # Reflection formula: R = I - 2(N·I)N
    dot_product = np.dot(incident, normal)
    reflection = incident - 2.0 * dot_product * normal

    return reflection / np.linalg.norm(reflection)
```

### Fresnel Effect

Real materials reflect more at grazing angles (Fresnel effect):

```python
def fresnel_schlick(cos_theta, f0):
    """
    Schlick's approximation of Fresnel reflectance.

    Args:
        cos_theta: Cosine of angle between view and normal
        f0: Reflectance at normal incidence [0, 1]

    Returns:
        Fresnel reflectance factor
    """
    return f0 + (1.0 - f0) * (1.0 - cos_theta)**5

def sample_environment_with_fresnel(
    cube_map,
    view_dir,
    normal,
    base_color,
    metallic,
    roughness
):
    """
    Sample environment map with Fresnel effect for PBR.

    Args:
        cube_map: Environment cube map
        view_dir: View direction (from eye to surface)
        normal: Surface normal
        base_color: Material base color
        metallic: Metallic parameter [0, 1]
        roughness: Roughness parameter [0, 1]

    Returns:
        Final color with environment reflection
    """
    # Calculate reflection vector
    reflection = calculate_reflection_vector(view_dir, normal)

    # Sample environment map
    # Use roughness to select mipmap level (for rough reflections)
    mip_level = roughness * get_max_mip_level(cube_map)
    env_color = cube_map.sample(reflection, mip_level)

    # Calculate Fresnel
    cos_theta = max(0.0, np.dot(-view_dir, normal))

    # F0 for dielectrics is ~0.04, for metals use base color
    f0 = base_color if metallic > 0.5 else 0.04

    fresnel = fresnel_schlick(cos_theta, f0)

    # Blend base color with environment reflection
    result = base_color * (1.0 - fresnel * metallic) + env_color * fresnel

    return result
```

## Refraction and Transmission

Environment maps can also simulate refraction (for transparent materials):

```python
def calculate_refraction_vector(incident, normal, ior):
    """
    Calculate refraction vector using Snell's law.

    Args:
        incident: Incident ray direction (normalized)
        normal: Surface normal (normalized)
        ior: Index of refraction ratio (n1/n2)

    Returns:
        Refraction direction (normalized), or None for total internal reflection
    """
    cos_i = -np.dot(incident, normal)

    # Check which side of surface we're on
    if cos_i < 0:
        # Inside to outside
        normal = -normal
        cos_i = -cos_i
        ior = 1.0 / ior

    # Snell's law: n1*sin(θ1) = n2*sin(θ2)
    sin_t_squared = ior * ior * (1.0 - cos_i * cos_i)

    # Total internal reflection
    if sin_t_squared > 1.0:
        return None

    cos_t = np.sqrt(1.0 - sin_t_squared)

    # Refraction vector
    refraction = ior * incident + (ior * cos_i - cos_t) * normal

    return refraction / np.linalg.norm(refraction)

def sample_refractive_environment(cube_map, view_dir, normal, ior=1.5):
    """
    Sample environment through refractive material (e.g., glass).

    Args:
        cube_map: Environment cube map
        view_dir: View direction
        normal: Surface normal
        ior: Index of refraction (1.5 for glass)

    Returns:
        Refracted environment color
    """
    # Calculate refraction
    refraction = calculate_refraction_vector(view_dir, normal, ior)

    if refraction is not None:
        # Sample environment in refraction direction
        return cube_map.sample(refraction)
    else:
        # Total internal reflection - use reflection instead
        reflection = calculate_reflection_vector(view_dir, normal)
        return cube_map.sample(reflection)
```

## Pre-filtered Environment Maps

For physically-based rendering, we need environment maps pre-filtered for different roughness levels.

### Specular Convolution

```python
def prefilter_environment_for_roughness(cube_map, roughness, num_samples=1024):
    """
    Pre-filter environment map for specific roughness level.

    Args:
        cube_map: Input environment cube map
        roughness: Roughness level [0, 1]
        num_samples: Number of Monte Carlo samples

    Returns:
        Filtered cube map for this roughness
    """
    face_size = cube_map.faces['px'].shape[0]
    filtered_faces = {}

    for face_name in ['px', 'nx', 'py', 'ny', 'pz', 'nz']:
        filtered_face = np.zeros((face_size, face_size, 3))

        for y in range(face_size):
            for x in range(face_size):
                # Get direction for this pixel
                direction = get_cube_face_direction(face_name, x, y, face_size)

                # Integrate over hemisphere around direction
                # weighted by roughness
                color = integrate_hemisphere(
                    cube_map,
                    direction,
                    roughness,
                    num_samples
                )

                filtered_face[y, x] = color

        filtered_faces[face_name] = filtered_face

    return CubeMap(filtered_faces)

def integrate_hemisphere(cube_map, normal, roughness, num_samples):
    """
    Integrate environment map over hemisphere using importance sampling.

    Args:
        cube_map: Environment map to integrate
        normal: Central direction
        roughness: Material roughness
        num_samples: Number of samples

    Returns:
        Integrated color
    """
    total_color = np.zeros(3)
    total_weight = 0.0

    # Convert roughness to alpha (GGX)
    alpha = roughness * roughness

    for i in range(num_samples):
        # Generate random sample with GGX distribution
        xi = np.random.random(2)
        half_vector = importance_sample_ggx(xi, normal, alpha)

        # Calculate light direction
        view_dir = normal  # Assume view = normal for pre-filtering
        light_dir = 2.0 * np.dot(view_dir, half_vector) * half_vector - view_dir

        n_dot_l = np.dot(normal, light_dir)

        if n_dot_l > 0:
            # Sample environment
            sample_color = cube_map.sample(light_dir)

            total_color += sample_color * n_dot_l
            total_weight += n_dot_l

    if total_weight > 0:
        return total_color / total_weight
    return total_color

def importance_sample_ggx(xi, normal, alpha):
    """
    Importance sample GGX distribution.

    Args:
        xi: Random numbers [0, 1]²
        normal: Surface normal
        alpha: Roughness parameter

    Returns:
        Sampled half vector
    """
    phi = 2.0 * np.pi * xi[0]
    cos_theta = np.sqrt((1.0 - xi[1]) / (1.0 + (alpha*alpha - 1.0) * xi[1]))
    sin_theta = np.sqrt(1.0 - cos_theta*cos_theta)

    # Spherical to Cartesian (in tangent space)
    h = np.array([
        sin_theta * np.cos(phi),
        sin_theta * np.sin(phi),
        cos_theta
    ])

    # Tangent space to world space
    up = np.array([0, 1, 0]) if abs(normal[1]) < 0.999 else np.array([1, 0, 0])
    tangent = np.cross(up, normal)
    tangent = tangent / np.linalg.norm(tangent)
    bitangent = np.cross(normal, tangent)

    sample_vec = tangent * h[0] + bitangent * h[1] + normal * h[2]
    return sample_vec / np.linalg.norm(sample_vec)
```

### Irradiance Map

For diffuse lighting, we need an irradiance map (cosine-weighted integral):

```python
def generate_irradiance_map(cube_map, resolution=32, num_samples=1024):
    """
    Generate irradiance map for diffuse lighting.

    Args:
        cube_map: Source environment map
        resolution: Resolution of irradiance map (can be low)
        num_samples: Number of hemisphere samples

    Returns:
        Irradiance cube map
    """
    irradiance_faces = {}

    for face_name in ['px', 'nx', 'py', 'ny', 'pz', 'nz']:
        irradiance_face = np.zeros((resolution, resolution, 3))

        for y in range(resolution):
            for x in range(resolution):
                # Get normal direction for this pixel
                normal = get_cube_face_direction(face_name, x, y, resolution)

                # Integrate over hemisphere
                irradiance = np.zeros(3)

                for i in range(num_samples):
                    # Random sample on hemisphere
                    xi = np.random.random(2)
                    sample_dir = cosine_sample_hemisphere(xi, normal)

                    # Sample environment and accumulate
                    color = cube_map.sample(sample_dir)
                    irradiance += color

                irradiance /= num_samples
                irradiance_face[y, x] = irradiance

        irradiance_faces[face_name] = irradiance_face

    return CubeMap(irradiance_faces)

def cosine_sample_hemisphere(xi, normal):
    """
    Generate cosine-weighted random direction on hemisphere.

    Args:
        xi: Random numbers [0, 1]²
        normal: Hemisphere normal

    Returns:
        Random direction (cosine-weighted)
    """
    # Cosine-weighted sampling
    phi = 2.0 * np.pi * xi[0]
    cos_theta = np.sqrt(xi[1])
    sin_theta = np.sqrt(1.0 - xi[1])

    # Local direction
    local_dir = np.array([
        sin_theta * np.cos(phi),
        sin_theta * np.sin(phi),
        cos_theta
    ])

    # Transform to world space
    up = np.array([0, 1, 0]) if abs(normal[1]) < 0.999 else np.array([1, 0, 0])
    tangent = np.cross(up, normal)
    tangent = tangent / np.linalg.norm(tangent)
    bitangent = np.cross(normal, tangent)

    world_dir = (tangent * local_dir[0] +
                 bitangent * local_dir[1] +
                 normal * local_dir[2])

    return world_dir / np.linalg.norm(world_dir)
```

## Parallax-Corrected Environment Maps

Standard environment maps assume infinite distance. For local environments (rooms), we need parallax correction:

```python
def parallax_correct_reflection(
    reflection_vector,
    surface_position,
    box_min,
    box_max,
    box_center
):
    """
    Apply parallax correction to reflection vector.

    Args:
        reflection_vector: Uncorrected reflection direction
        surface_position: Position of reflecting surface
        box_min: Minimum corner of reflection box
        box_max: Maximum corner of reflection box
        box_center: Center of environment map capture

    Returns:
        Corrected reflection direction
    """
    # Ray-box intersection
    # Find intersection of reflection ray with proxy box

    ray_origin = surface_position - box_center
    ray_dir = reflection_vector

    # Calculate intersections with each plane
    t_min = (box_min - box_center - ray_origin) / ray_dir
    t_max = (box_max - box_center - ray_origin) / ray_dir

    # Find furthest intersection
    t = np.maximum(t_min, t_max)
    t_intersection = min(t[0], t[1], t[2])

    # Intersection point
    intersection = ray_origin + ray_dir * t_intersection

    # Corrected direction from probe center to intersection
    corrected = intersection / np.linalg.norm(intersection)

    return corrected
```

## Conclusion

Environment mapping is essential for realistic reflections and lighting in real-time graphics. Cube maps have become the standard due to their uniform sampling and hardware support. Modern PBR workflows use pre-filtered environment maps at multiple roughness levels, combined with irradiance maps for diffuse lighting. Techniques like parallax correction and proper Fresnel calculation make environment-mapped reflections convincing even in complex scenes.
