# Shadows in Ray Tracing

## Introduction to Ray-Traced Shadows

Shadows are one of the most natural features of ray tracing. Unlike rasterization, where shadows require complex shadow mapping techniques, ray tracing produces accurate shadows almost automatically by casting shadow rays from surface points toward light sources.

A point is in shadow if a ray from that point to a light source intersects any object before reaching the light. This simple test produces pixel-perfect hard shadows with no shadow maps, bias parameters, or resolution limitations.

## Hard Shadows

Hard shadows have sharp, well-defined edges and occur when the light source is treated as a point (infinitesimally small).

### Shadow Ray Algorithm

```python
import numpy as np

def is_in_shadow(hit_point, hit_normal, light_position, scene_objects):
    """
    Determine if a point is in shadow from a point light.

    Args:
        hit_point: Point on surface being tested
        hit_normal: Surface normal at hit point
        light_position: Position of light source
        scene_objects: List of objects in scene

    Returns:
        True if point is in shadow, False otherwise
    """
    # Direction from surface to light
    to_light = light_position - hit_point
    distance_to_light = np.linalg.norm(to_light)
    light_direction = to_light / distance_to_light

    # Offset start point slightly to avoid self-intersection
    shadow_ray_origin = hit_point + hit_normal * 0.001

    # Create shadow ray
    shadow_ray = Ray(shadow_ray_origin, light_direction)

    # Check for intersections between point and light
    for obj in scene_objects:
        hit = obj.intersect(shadow_ray)

        if hit and hit.t < distance_to_light:
            # Object blocks the light
            return True

    return False

def calculate_direct_lighting_with_shadows(
    hit_point,
    hit_normal,
    material_color,
    light_position,
    light_color,
    light_intensity,
    scene_objects
):
    """
    Calculate direct lighting with shadow testing.

    Args:
        hit_point: Point being shaded
        hit_normal: Surface normal
        material_color: Material diffuse color
        light_position: Light position
        light_color: Light color
        light_intensity: Light intensity
        scene_objects: Scene objects for shadow testing

    Returns:
        RGB color
    """
    # Check if in shadow
    if is_in_shadow(hit_point, hit_normal, light_position, scene_objects):
        # No direct light contribution
        return np.array([0.0, 0.0, 0.0])

    # Calculate lighting
    to_light = light_position - hit_point
    distance = np.linalg.norm(to_light)
    light_dir = to_light / distance

    # Lambertian diffuse
    n_dot_l = max(0.0, np.dot(hit_normal, light_dir))

    # Attenuation
    attenuation = light_intensity / (distance * distance)

    # Final color
    color = material_color * light_color * n_dot_l * attenuation

    return color
```

### Multiple Light Sources

```python
def calculate_lighting_multiple_lights(
    hit_point,
    hit_normal,
    material,
    lights,
    scene_objects,
    ambient_light
):
    """
    Calculate lighting from multiple light sources.

    Args:
        hit_point: Point being shaded
        hit_normal: Surface normal
        material: Material properties
        lights: List of light sources
        scene_objects: Scene objects
        ambient_light: Ambient light color

    Returns:
        RGB color
    """
    # Start with ambient light
    color = material.color * ambient_light

    # Add contribution from each light
    for light in lights:
        if not is_in_shadow(hit_point, hit_normal, light.position, scene_objects):
            # Calculate lighting from this light
            to_light = light.position - hit_point
            distance = np.linalg.norm(to_light)
            light_dir = to_light / distance

            # Diffuse
            n_dot_l = max(0.0, np.dot(hit_normal, light_dir))
            attenuation = light.intensity / (distance * distance)

            diffuse = material.color * light.color * n_dot_l * attenuation

            color += diffuse

    return np.clip(color, 0, 1)
```

## Soft Shadows

Soft shadows have gradual transitions from fully lit to fully shadowed regions (penumbra). They occur naturally with area light sources.

### Area Light Source

```python
class AreaLight:
    """Rectangular area light source."""

    def __init__(self, center, u_axis, v_axis, color, intensity):
        """
        Initialize area light.

        Args:
            center: Center position of light
            u_axis: First edge vector (defines width)
            v_axis: Second edge vector (defines height)
            color: Light color
            intensity: Light intensity
        """
        self.center = np.array(center, dtype=float)
        self.u_axis = np.array(u_axis, dtype=float)
        self.v_axis = np.array(v_axis, dtype=float)
        self.color = np.array(color, dtype=float)
        self.intensity = intensity

        # Calculate normal
        self.normal = np.cross(u_axis, v_axis)
        self.normal = self.normal / np.linalg.norm(self.normal)

        # Calculate area
        self.area = np.linalg.norm(np.cross(u_axis, v_axis))

    def sample_point(self, u, v):
        """
        Sample a point on the light surface.

        Args:
            u, v: Random values in [0, 1]

        Returns:
            Point on light surface
        """
        # Map [0,1] to [-0.5, 0.5] for centered sampling
        u = u - 0.5
        v = v - 0.5

        point = self.center + u * self.u_axis + v * self.v_axis
        return point

    def sample_random_point(self):
        """Sample random point on light."""
        u = np.random.random()
        v = np.random.random()
        return self.sample_point(u, v)
```

### Monte Carlo Soft Shadows

```python
def calculate_soft_shadow(
    hit_point,
    hit_normal,
    area_light,
    scene_objects,
    num_samples=16
):
    """
    Calculate soft shadow using Monte Carlo sampling.

    Args:
        hit_point: Point being shaded
        hit_normal: Surface normal
        area_light: Area light source
        scene_objects: Scene objects
        num_samples: Number of shadow ray samples

    Returns:
        Visibility factor [0, 1] (0 = fully shadowed, 1 = fully lit)
    """
    visible_samples = 0

    for i in range(num_samples):
        # Sample random point on light
        light_point = area_light.sample_random_point()

        # Check if this light sample is visible
        if not is_in_shadow(hit_point, hit_normal, light_point, scene_objects):
            visible_samples += 1

    # Fraction of samples that were visible
    visibility = visible_samples / num_samples

    return visibility

def calculate_lighting_with_soft_shadows(
    hit_point,
    hit_normal,
    material,
    area_light,
    scene_objects,
    num_shadow_samples=16
):
    """
    Calculate lighting with soft shadows from area light.

    Args:
        hit_point: Point being shaded
        hit_normal: Surface normal
        material: Material properties
        area_light: Area light source
        scene_objects: Scene objects
        num_shadow_samples: Number of shadow ray samples

    Returns:
        RGB color
    """
    total_color = np.zeros(3)

    for i in range(num_shadow_samples):
        # Sample point on light
        light_point = area_light.sample_random_point()

        # Check visibility
        if not is_in_shadow(hit_point, hit_normal, light_point, scene_objects):
            # Calculate lighting from this sample
            to_light = light_point - hit_point
            distance = np.linalg.norm(to_light)
            light_dir = to_light / distance

            # Lambertian diffuse
            n_dot_l = max(0.0, np.dot(hit_normal, light_dir))

            # Light direction from light surface
            light_to_surface = -light_dir
            l_dot_n = max(0.0, np.dot(light_to_surface, area_light.normal))

            # Solid angle factor (simplified)
            geometric_term = (n_dot_l * l_dot_n * area_light.area) / (distance * distance)

            # Accumulate
            sample_color = material.color * area_light.color * geometric_term * area_light.intensity

            total_color += sample_color

    # Average samples
    color = total_color / num_shadow_samples

    return np.clip(color, 0, 1)
```

### Stratified Sampling for Soft Shadows

```python
def calculate_soft_shadow_stratified(
    hit_point,
    hit_normal,
    area_light,
    scene_objects,
    grid_size=4
):
    """
    Calculate soft shadow using stratified sampling.

    Args:
        hit_point: Point being shaded
        hit_normal: Surface normal
        area_light: Area light source
        scene_objects: Scene objects
        grid_size: Size of stratification grid (grid_size × grid_size samples)

    Returns:
        Visibility factor [0, 1]
    """
    num_samples = grid_size * grid_size
    visible_samples = 0

    for i in range(grid_size):
        for j in range(grid_size):
            # Stratified sample position
            u = (i + np.random.random()) / grid_size
            v = (j + np.random.random()) / grid_size

            # Sample point on light
            light_point = area_light.sample_point(u, v)

            # Check visibility
            if not is_in_shadow(hit_point, hit_normal, light_point, scene_objects):
                visible_samples += 1

    visibility = visible_samples / num_samples
    return visibility
```

## Shadow Acne

Shadow acne is a common artifact where surfaces incorrectly shadow themselves due to numerical precision issues.

### The Problem

When testing if a surface point is in shadow, the shadow ray origin is at the surface. Due to floating-point imprecision, the ray might immediately intersect the same surface, causing false self-shadowing.

### Solutions

#### 1. Shadow Ray Offset (Epsilon Bias)

```python
def create_shadow_ray_with_offset(hit_point, hit_normal, light_position, epsilon=0.001):
    """
    Create shadow ray with offset to prevent self-intersection.

    Args:
        hit_point: Surface intersection point
        hit_normal: Surface normal
        light_position: Light position
        epsilon: Offset distance along normal

    Returns:
        Shadow ray
    """
    # Offset origin along normal
    shadow_ray_origin = hit_point + hit_normal * epsilon

    # Direction to light
    to_light = light_position - shadow_ray_origin
    distance = np.linalg.norm(to_light)
    direction = to_light / distance

    return Ray(shadow_ray_origin, direction), distance
```

#### 2. Minimum t Value

```python
def intersect_with_min_t(ray, obj, t_min=0.001):
    """
    Intersection test with minimum t threshold.

    Args:
        ray: Ray to test
        obj: Object to intersect
        t_min: Minimum valid t value

    Returns:
        HitRecord if t > t_min, None otherwise
    """
    hit = obj.intersect(ray)

    if hit and hit.t < t_min:
        # Reject hits too close to ray origin
        return None

    return hit
```

#### 3. Adaptive Epsilon

```python
def adaptive_epsilon(hit_point, hit_normal):
    """
    Calculate adaptive epsilon based on position magnitude.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal

    Returns:
        Adaptive epsilon value
    """
    # Scale epsilon with distance from origin
    position_magnitude = np.linalg.norm(hit_point)
    epsilon = max(0.001, position_magnitude * 1e-5)

    return epsilon

def create_shadow_ray_adaptive(hit_point, hit_normal, light_position):
    """Create shadow ray with adaptive epsilon."""
    epsilon = adaptive_epsilon(hit_point, hit_normal)
    return create_shadow_ray_with_offset(hit_point, hit_normal, light_position, epsilon)
```

## Shadow Optimization Techniques

### Early Shadow Ray Termination

```python
def is_in_shadow_optimized(hit_point, hit_normal, light_position, scene_objects):
    """
    Optimized shadow test with early termination.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        light_position: Light position
        scene_objects: Scene objects

    Returns:
        True if in shadow
    """
    to_light = light_position - hit_point
    distance_to_light = np.linalg.norm(to_light)
    light_direction = to_light / distance_to_light

    shadow_ray_origin = hit_point + hit_normal * 0.001
    shadow_ray = Ray(shadow_ray_origin, light_direction)

    # Test against objects
    for obj in scene_objects:
        hit = obj.intersect(shadow_ray)

        # Early termination - any intersection shadows the point
        if hit and 0.001 < hit.t < distance_to_light:
            return True

    return False
```

### Shadow Ray Caching

```python
class ShadowCache:
    """Cache shadow ray results for coherent rays."""

    def __init__(self, grid_size=32):
        """
        Initialize shadow cache.

        Args:
            grid_size: Size of spatial hash grid
        """
        self.grid_size = grid_size
        self.cache = {}

    def spatial_hash(self, point):
        """Calculate spatial hash for point."""
        grid_coords = (point / self.grid_size).astype(int)
        return tuple(grid_coords)

    def check_shadow(self, hit_point, light_position, scene_objects):
        """
        Check shadow with caching.

        Args:
            hit_point: Surface point
            light_position: Light position
            scene_objects: Scene objects

        Returns:
            True if in shadow
        """
        # Calculate cache key
        key = (self.spatial_hash(hit_point), tuple(light_position))

        # Check cache
        if key in self.cache:
            return self.cache[key]

        # Calculate shadow
        in_shadow = is_in_shadow_optimized(
            hit_point,
            np.array([0, 1, 0]),  # Approximate normal
            light_position,
            scene_objects
        )

        # Store in cache
        self.cache[key] = in_shadow

        return in_shadow
```

## Transparent Shadows

Objects with transparency create colored shadows or partial shadows.

```python
def trace_shadow_with_transparency(
    shadow_ray,
    scene_objects,
    max_distance,
    initial_transmission=1.0
):
    """
    Trace shadow ray accounting for transparent objects.

    Args:
        shadow_ray: Ray from surface to light
        scene_objects: Scene objects
        max_distance: Distance to light
        initial_transmission: Starting transmission value

    Returns:
        Transmission factor [0, 1] (0 = opaque shadow, 1 = no shadow)
    """
    transmission = initial_transmission
    current_t = 0.001

    while current_t < max_distance and transmission > 0.01:
        # Find next intersection
        closest_hit = None
        closest_t = max_distance

        for obj in scene_objects:
            hit = obj.intersect(shadow_ray)

            if hit and current_t < hit.t < closest_t:
                closest_hit = hit
                closest_t = hit.t

        if closest_hit is None:
            # No more intersections
            break

        # Check if object is transparent
        if hasattr(closest_hit.material, 'transparency'):
            # Reduce transmission
            transmission *= closest_hit.material.transparency

            # Optionally tint by material color
            if hasattr(closest_hit.material, 'color'):
                transmission *= closest_hit.material.color

            # Continue ray from this point
            current_t = closest_t + 0.001
        else:
            # Opaque object - fully shadowed
            return 0.0

    return transmission

def calculate_lighting_with_transparent_shadows(
    hit_point,
    hit_normal,
    material,
    light_position,
    light_color,
    scene_objects
):
    """Calculate lighting with transparent shadow support."""
    # Create shadow ray
    to_light = light_position - hit_point
    distance = np.linalg.norm(to_light)
    light_dir = to_light / distance

    shadow_ray_origin = hit_point + hit_normal * 0.001
    shadow_ray = Ray(shadow_ray_origin, light_dir)

    # Trace with transparency
    transmission = trace_shadow_with_transparency(
        shadow_ray,
        scene_objects,
        distance
    )

    # Calculate lighting
    n_dot_l = max(0.0, np.dot(hit_normal, light_dir))
    attenuation = 1.0 / (distance * distance)

    # Apply transmission factor
    color = material.color * light_color * n_dot_l * attenuation * transmission

    return color
```

## Ambient Occlusion Shadows

Ambient occlusion approximates shadows from ambient light by testing hemisphere visibility.

```python
def calculate_ambient_occlusion(
    hit_point,
    hit_normal,
    scene_objects,
    num_samples=16,
    max_distance=1.0
):
    """
    Calculate ambient occlusion factor.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        scene_objects: Scene objects
        num_samples: Number of hemisphere samples
        max_distance: Maximum occlusion distance

    Returns:
        Occlusion factor [0, 1] (0 = fully occluded, 1 = no occlusion)
    """
    hits = 0

    for i in range(num_samples):
        # Random direction in hemisphere
        random_dir = random_hemisphere_direction(hit_normal)

        # Create occlusion ray
        ao_ray_origin = hit_point + hit_normal * 0.001
        ao_ray = Ray(ao_ray_origin, random_dir)

        # Check for intersection within max distance
        for obj in scene_objects:
            hit = obj.intersect(ao_ray)

            if hit and hit.t < max_distance:
                hits += 1
                break

    # Fraction of rays that were unoccluded
    occlusion = 1.0 - (hits / num_samples)

    return occlusion

def random_hemisphere_direction(normal):
    """Generate random direction in hemisphere around normal."""
    # Random point on unit sphere
    theta = 2 * np.pi * np.random.random()
    phi = np.arccos(2 * np.random.random() - 1)

    direction = np.array([
        np.sin(phi) * np.cos(theta),
        np.sin(phi) * np.sin(theta),
        np.cos(phi)
    ])

    # Flip if pointing away from normal
    if np.dot(direction, normal) < 0:
        direction = -direction

    return direction
```

## Conclusion

Ray-traced shadows are one of the most compelling advantages of ray tracing over rasterization. Hard shadows are trivial to implement with perfect accuracy, while soft shadows from area lights can be achieved through Monte Carlo sampling. Understanding and mitigating shadow acne through proper epsilon values is essential for artifact-free rendering. Modern production renderers combine these techniques with importance sampling and denoising to achieve high-quality soft shadows at interactive frame rates.
