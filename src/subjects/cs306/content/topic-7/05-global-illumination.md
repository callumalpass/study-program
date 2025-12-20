# Global Illumination

## Introduction to Global Illumination

Global illumination (GI) refers to lighting algorithms that account for both direct lighting (light arriving directly from light sources) and indirect lighting (light bouncing off other surfaces). This creates realistic effects like color bleeding, ambient occlusion, and soft indirect shadows that are impossible with direct lighting alone.

The rendering equation, introduced by James Kajiya in 1986, provides the theoretical foundation for global illumination:

```
L_o(x, ω_o) = L_e(x, ω_o) + ∫_Ω f_r(x, ω_i, ω_o) L_i(x, ω_i) (n · ω_i) dω_i
```

Where:
- L_o is outgoing radiance
- L_e is emitted radiance
- f_r is the BRDF (bidirectional reflectance distribution function)
- L_i is incoming radiance
- ω_i and ω_o are incoming and outgoing directions
- Ω is the hemisphere above the surface

## Direct vs Indirect Illumination

### Direct Illumination

Light that arrives directly from light sources without bouncing:

```python
import numpy as np

def calculate_direct_illumination(
    hit_point,
    hit_normal,
    material,
    lights,
    scene_objects
):
    """
    Calculate direct lighting from light sources.

    Args:
        hit_point: Surface point being shaded
        hit_normal: Surface normal
        material: Surface material
        lights: List of light sources
        scene_objects: Scene objects for shadow testing

    Returns:
        Direct lighting contribution (RGB)
    """
    direct_color = np.zeros(3)

    for light in lights:
        # Direction to light
        to_light = light.position - hit_point
        distance = np.linalg.norm(to_light)
        light_dir = to_light / distance

        # Shadow test
        shadow_ray = Ray(hit_point + hit_normal * 0.001, light_dir)
        in_shadow = False

        for obj in scene_objects:
            hit = obj.intersect(shadow_ray)
            if hit and hit.t < distance:
                in_shadow = True
                break

        if not in_shadow:
            # Lambertian diffuse
            n_dot_l = max(0.0, np.dot(hit_normal, light_dir))

            # Attenuation
            attenuation = light.intensity / (distance * distance)

            # Accumulate
            direct_color += material.color * light.color * n_dot_l * attenuation

    return direct_color
```

### Indirect Illumination

Light that bounces off other surfaces before reaching the point:

```python
def calculate_indirect_illumination_single_bounce(
    hit_point,
    hit_normal,
    material,
    scene,
    num_samples=32
):
    """
    Calculate single-bounce indirect illumination using Monte Carlo.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        material: Surface material
        scene: Scene containing all objects
        num_samples: Number of hemisphere samples

    Returns:
        Indirect lighting contribution (RGB)
    """
    indirect_color = np.zeros(3)

    for i in range(num_samples):
        # Sample random direction in hemisphere
        sample_dir = cosine_sample_hemisphere(hit_normal)

        # Cast ray in sampled direction
        sample_ray = Ray(hit_point + hit_normal * 0.001, sample_dir)

        # Find intersection
        hit = find_closest_hit(sample_ray, scene.objects)

        if hit:
            # Get direct lighting at that point
            bounce_direct = calculate_direct_illumination(
                hit.point,
                hit.normal,
                hit.material,
                scene.lights,
                scene.objects
            )

            # BRDF term (Lambertian)
            brdf = material.color / np.pi

            # Cosine term
            cos_theta = max(0.0, np.dot(hit_normal, sample_dir))

            # Monte Carlo estimate
            # PDF for cosine-weighted hemisphere sampling = cos(θ) / π
            # The cosine term cancels with PDF, leaving just BRDF × incoming light
            contribution = brdf * bounce_direct * hit.material.color

            indirect_color += contribution

    # Average samples
    indirect_color /= num_samples

    return indirect_color

def cosine_sample_hemisphere(normal):
    """
    Generate cosine-weighted random direction on hemisphere.

    Args:
        normal: Hemisphere normal (normalized)

    Returns:
        Random direction (cosine-weighted)
    """
    # Generate random point on unit disk
    r = np.sqrt(np.random.random())
    theta = 2.0 * np.pi * np.random.random()

    x = r * np.cos(theta)
    y = r * np.sin(theta)
    z = np.sqrt(max(0.0, 1.0 - x*x - y*y))

    # Create coordinate system
    up = np.array([0, 1, 0]) if abs(normal[1]) < 0.999 else np.array([1, 0, 0])
    tangent = np.cross(up, normal)
    tangent = tangent / np.linalg.norm(tangent)
    bitangent = np.cross(normal, tangent)

    # Transform to world space
    direction = tangent * x + bitangent * y + normal * z

    return direction / np.linalg.norm(direction)
```

## Multi-Bounce Global Illumination

### Recursive Ray Tracing with Indirect Lighting

```python
def trace_ray_with_gi(
    ray,
    scene,
    depth,
    max_depth,
    num_indirect_samples=4
):
    """
    Trace ray with multi-bounce global illumination.

    Args:
        ray: Ray to trace
        scene: Scene
        depth: Current recursion depth
        max_depth: Maximum recursion depth
        num_indirect_samples: Samples per bounce

    Returns:
        Color including all bounces
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Find intersection
    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        return get_background_color(ray.direction)

    # Emissive surfaces
    color = hit.material.emission if hasattr(hit.material, 'emission') else np.zeros(3)

    # Direct lighting
    direct = calculate_direct_illumination(
        hit.point,
        hit.normal,
        hit.material,
        scene.lights,
        scene.objects
    )
    color += direct

    # Indirect lighting (if not at max depth)
    if depth < max_depth - 1:
        indirect = np.zeros(3)

        # Reduce samples with depth
        samples = max(1, num_indirect_samples // (depth + 1))

        for i in range(samples):
            # Sample hemisphere
            sample_dir = cosine_sample_hemisphere(hit.normal)

            # Trace indirect ray
            indirect_ray = Ray(hit.point + hit.normal * 0.001, sample_dir)
            incoming = trace_ray_with_gi(
                indirect_ray,
                scene,
                depth + 1,
                max_depth,
                num_indirect_samples
            )

            # BRDF (Lambertian)
            brdf = hit.material.color / np.pi

            # Accumulate (cosine term cancels with PDF)
            indirect += brdf * incoming

        # Average samples
        indirect /= samples
        color += indirect

    return color
```

## Radiosity Basics

Radiosity is a global illumination technique that assumes all surfaces are perfectly diffuse (Lambertian).

### Form Factor

The form factor F_ij represents the fraction of light leaving surface i that arrives at surface j:

```python
def calculate_form_factor(patch_i, patch_j):
    """
    Calculate form factor between two patches (simplified).

    Args:
        patch_i: Source patch (has center, normal, area)
        patch_j: Destination patch (has center, normal, area)

    Returns:
        Form factor F_ij
    """
    # Vector from i to j
    r = patch_j.center - patch_i.center
    distance = np.linalg.norm(r)

    if distance < 1e-6:
        return 0.0

    r_normalized = r / distance

    # Cosines of angles with normals
    cos_theta_i = max(0.0, np.dot(patch_i.normal, r_normalized))
    cos_theta_j = max(0.0, np.dot(patch_j.normal, -r_normalized))

    # Form factor formula
    form_factor = (cos_theta_i * cos_theta_j * patch_j.area) / (np.pi * distance * distance)

    return form_factor

class RadiosityPatch:
    """Surface patch for radiosity calculation."""

    def __init__(self, center, normal, area, reflectance, emission=0.0):
        """
        Initialize radiosity patch.

        Args:
            center: Patch center position
            normal: Patch normal
            area: Patch area
            reflectance: Surface reflectance [0, 1]
            emission: Emitted radiance
        """
        self.center = np.array(center, dtype=float)
        self.normal = np.array(normal, dtype=float)
        self.normal = self.normal / np.linalg.norm(self.normal)
        self.area = area
        self.reflectance = reflectance
        self.emission = emission
        self.radiosity = emission  # Initial radiosity = emission
```

### Radiosity System Solution

```python
def solve_radiosity(patches, max_iterations=100):
    """
    Solve radiosity system using iterative method.

    The radiosity equation:
    B_i = E_i + ρ_i Σ_j B_j F_ji

    Args:
        patches: List of RadiosityPatch objects
        max_iterations: Maximum iterations

    Returns:
        Updated patches with final radiosity values
    """
    n = len(patches)

    # Precompute form factors
    form_factors = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            if i != j:
                form_factors[i][j] = calculate_form_factor(patches[i], patches[j])

    # Iterative solution (Jacobi method)
    for iteration in range(max_iterations):
        new_radiosity = np.zeros(n)

        for i in range(n):
            # Start with emission
            b_i = patches[i].emission

            # Add reflected light from all other patches
            for j in range(n):
                if i != j:
                    b_i += patches[i].reflectance * patches[j].radiosity * form_factors[i][j]

            new_radiosity[i] = b_i

        # Update radiosity values
        for i in range(n):
            patches[i].radiosity = new_radiosity[i]

    return patches

def render_with_radiosity(patches, camera, width, height):
    """
    Render scene using precomputed radiosity.

    Args:
        patches: Patches with solved radiosity
        camera: Camera
        width: Image width
        height: Image height

    Returns:
        Rendered image
    """
    image = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            # Generate ray
            u = (x + 0.5) / width
            v = (y + 0.5) / height
            ray = camera.generate_ray(u, v)

            # Find intersection
            closest_patch = None
            closest_t = float('inf')

            for patch in patches:
                # Intersect ray with patch (simplified)
                t = intersect_ray_patch(ray, patch)
                if t and t < closest_t:
                    closest_t = t
                    closest_patch = patch

            if closest_patch:
                # Use precomputed radiosity
                image[y, x] = closest_patch.radiosity * closest_patch.reflectance

    return image
```

## Ambient Occlusion

Ambient occlusion approximates global illumination by measuring how exposed each point is to ambient lighting.

```python
def calculate_ambient_occlusion(
    hit_point,
    hit_normal,
    scene_objects,
    num_samples=32,
    max_distance=1.0
):
    """
    Calculate ambient occlusion factor.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        scene_objects: Scene objects
        num_samples: Number of samples
        max_distance: Maximum occlusion distance

    Returns:
        Occlusion factor [0, 1] (0 = fully occluded, 1 = fully exposed)
    """
    hits = 0

    for i in range(num_samples):
        # Random direction in hemisphere
        sample_dir = cosine_sample_hemisphere(hit_normal)

        # Create occlusion ray
        ao_ray = Ray(hit_point + hit_normal * 0.001, sample_dir)

        # Check for intersection within max distance
        for obj in scene_objects:
            hit = obj.intersect(ao_ray)

            if hit and hit.t < max_distance:
                # Calculate distance falloff
                falloff = 1.0 - (hit.t / max_distance)
                hits += falloff
                break

    # Calculate occlusion
    occlusion = 1.0 - (hits / num_samples)

    return occlusion

def shade_with_ambient_occlusion(
    hit_point,
    hit_normal,
    material,
    scene,
    ambient_light
):
    """
    Shade surface with ambient occlusion.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        material: Material
        scene: Scene
        ambient_light: Ambient light color

    Returns:
        Shaded color
    """
    # Calculate direct lighting
    direct = calculate_direct_illumination(
        hit_point,
        hit_normal,
        material,
        scene.lights,
        scene.objects
    )

    # Calculate ambient occlusion
    ao = calculate_ambient_occlusion(
        hit_point,
        hit_normal,
        scene.objects,
        num_samples=16
    )

    # Apply ambient occlusion to ambient light
    ambient = material.color * ambient_light * ao

    return direct + ambient
```

## Color Bleeding

Color bleeding occurs when light bounces off colored surfaces and tints nearby surfaces.

```python
def calculate_color_bleeding(
    hit_point,
    hit_normal,
    material,
    scene,
    num_samples=16,
    max_bounces=2
):
    """
    Calculate color bleeding from nearby surfaces.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        material: Material
        scene: Scene
        num_samples: Number of samples
        max_bounces: Maximum light bounces

    Returns:
        Color bleeding contribution
    """
    bleeding_color = np.zeros(3)

    for i in range(num_samples):
        # Sample hemisphere
        sample_dir = cosine_sample_hemisphere(hit_normal)

        # Trace ray
        sample_ray = Ray(hit_point + hit_normal * 0.001, sample_dir)
        hit = find_closest_hit(sample_ray, scene.objects)

        if hit:
            # Get color of hit surface
            surface_color = hit.material.color

            # Get illumination at hit point
            hit_illumination = calculate_direct_illumination(
                hit.point,
                hit.normal,
                hit.material,
                scene.lights,
                scene.objects
            )

            # Reflected radiance
            reflected = surface_color * hit_illumination

            # BRDF
            brdf = material.color / np.pi

            # Accumulate
            bleeding_color += brdf * reflected

    # Average
    bleeding_color /= num_samples

    return bleeding_color
```

## Photon Mapping (Simplified)

Photon mapping is a two-pass algorithm that traces light from sources and stores "photons" on surfaces.

```python
class Photon:
    """Represents a photon stored on a surface."""

    def __init__(self, position, direction, power):
        """
        Initialize photon.

        Args:
            position: Photon position
            direction: Incoming direction
            power: Photon power (RGB)
        """
        self.position = np.array(position, dtype=float)
        self.direction = np.array(direction, dtype=float)
        self.power = np.array(power, dtype=float)

def emit_photons(light, scene, num_photons=10000):
    """
    Emit photons from light source and trace through scene.

    Args:
        light: Light source
        scene: Scene
        num_photons: Number of photons to emit

    Returns:
        List of stored photons
    """
    photons = []

    for i in range(num_photons):
        # Random direction from light
        direction = random_sphere_direction()

        # Photon power
        power = light.color * light.intensity / num_photons

        # Trace photon
        photon_ray = Ray(light.position, direction)
        stored_photons = trace_photon(photon_ray, power, scene, depth=0, max_depth=5)

        photons.extend(stored_photons)

    return photons

def trace_photon(ray, power, scene, depth, max_depth):
    """
    Trace photon through scene.

    Args:
        ray: Photon ray
        power: Photon power
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth

    Returns:
        List of stored photons
    """
    if depth >= max_depth:
        return []

    # Find intersection
    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        return []

    stored = []

    # Store photon on diffuse surfaces
    if hit.material.is_diffuse:
        photon = Photon(hit.point, ray.direction, power)
        stored.append(photon)

    # Russian roulette for absorption
    survival_prob = np.mean(hit.material.color)

    if np.random.random() < survival_prob:
        # Photon survives - bounce
        new_direction = cosine_sample_hemisphere(hit.normal)
        new_power = power * hit.material.color / survival_prob

        bounce_ray = Ray(hit.point + hit.normal * 0.001, new_direction)
        stored.extend(trace_photon(bounce_ray, new_power, scene, depth + 1, max_depth))

    return stored

def random_sphere_direction():
    """Generate random direction on unit sphere."""
    theta = 2.0 * np.pi * np.random.random()
    z = 2.0 * np.random.random() - 1.0
    r = np.sqrt(1.0 - z * z)

    return np.array([
        r * np.cos(theta),
        r * np.sin(theta),
        z
    ])
```

## Irradiance Caching

Irradiance caching stores indirect illumination calculations and interpolates between nearby cache points.

```python
class IrradianceCachePoint:
    """Cached irradiance calculation."""

    def __init__(self, position, normal, irradiance, harmonic_mean_distance):
        """Initialize cache point."""
        self.position = position
        self.normal = normal
        self.irradiance = irradiance
        self.harmonic_mean_distance = harmonic_mean_distance

def estimate_irradiance_with_cache(
    hit_point,
    hit_normal,
    cache,
    scene,
    tolerance=0.1
):
    """
    Estimate irradiance using cache or compute new value.

    Args:
        hit_point: Query point
        hit_normal: Surface normal
        cache: List of cached irradiance points
        scene: Scene
        tolerance: Error tolerance

    Returns:
        Estimated irradiance
    """
    # Find nearby cache points
    weights = []
    irradiances = []

    for cache_point in cache:
        # Distance to cache point
        distance = np.linalg.norm(hit_point - cache_point.position)

        # Normal similarity
        normal_similarity = np.dot(hit_normal, cache_point.normal)

        # Weight based on distance and normal
        if distance < cache_point.harmonic_mean_distance * tolerance and normal_similarity > 0.9:
            weight = 1.0 / (distance + 1e-6)
            weights.append(weight)
            irradiances.append(cache_point.irradiance)

    if len(weights) > 0:
        # Interpolate from cache
        total_weight = sum(weights)
        irradiance = sum(w * irr for w, irr in zip(weights, irradiances)) / total_weight
        return irradiance
    else:
        # Compute new value
        irradiance = calculate_indirect_illumination_single_bounce(
            hit_point,
            hit_normal,
            None,
            scene,
            num_samples=64
        )

        # Add to cache
        cache.append(IrradianceCachePoint(
            hit_point,
            hit_normal,
            irradiance,
            harmonic_mean_distance=1.0
        ))

        return irradiance
```

## Conclusion

Global illumination transforms ray-traced images from sterile, clinical renders to warm, realistic scenes. While computationally expensive, techniques like ambient occlusion provide cheap approximations, while full solutions like path tracing (covered next) provide unbiased, physically accurate results. Understanding the rendering equation and different GI approaches is essential for modern photorealistic rendering. The choice of technique depends on the balance needed between accuracy, performance, and the specific visual requirements of the scene.
