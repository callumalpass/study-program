# Reflections and Refractions

## Introduction

Reflections and refractions are optical phenomena that ray tracing handles naturally through recursive ray casting. When a ray hits a reflective or transparent surface, we spawn new rays to determine what is reflected or refracted, following the physical laws of optics.

These effects are extremely difficult to achieve realistically with rasterization but emerge naturally from the ray tracing algorithm, making them one of ray tracing's most compelling advantages.

## Perfect Reflections

### Reflection Vector Calculation

The reflection vector is calculated using the law of reflection: the angle of incidence equals the angle of reflection.

```python
import numpy as np

def reflect(incident, normal):
    """
    Calculate perfect reflection vector.

    The reflection formula: R = I - 2(N·I)N

    Args:
        incident: Incident ray direction (normalized, pointing toward surface)
        normal: Surface normal (normalized, pointing outward)

    Returns:
        Reflection direction (normalized)
    """
    # Ensure inputs are normalized
    incident = incident / np.linalg.norm(incident)
    normal = normal / np.linalg.norm(normal)

    # Calculate reflection
    dot_product = np.dot(incident, normal)
    reflection = incident - 2.0 * dot_product * normal

    return reflection / np.linalg.norm(reflection)

class ReflectiveMaterial:
    """Material with reflection properties."""

    def __init__(self, base_color, reflectivity, roughness=0.0):
        """
        Initialize reflective material.

        Args:
            base_color: Base material color (RGB)
            reflectivity: Reflection strength [0, 1]
            roughness: Surface roughness [0, 1] (0 = perfect mirror)
        """
        self.base_color = np.array(base_color, dtype=float)
        self.reflectivity = reflectivity
        self.roughness = roughness

def trace_reflection(
    hit_point,
    hit_normal,
    incident_direction,
    material,
    scene,
    depth,
    max_depth
):
    """
    Trace reflection ray.

    Args:
        hit_point: Surface intersection point
        hit_normal: Surface normal at intersection
        incident_direction: Incoming ray direction
        material: Surface material
        scene: Scene to trace
        depth: Current recursion depth
        max_depth: Maximum recursion depth

    Returns:
        Reflected color (RGB)
    """
    # Stop if we've reached maximum depth
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Calculate perfect reflection direction
    reflection_dir = reflect(incident_direction, hit_normal)

    # Offset ray origin to avoid self-intersection
    reflection_origin = hit_point + hit_normal * 0.001

    # Create reflection ray
    reflection_ray = Ray(reflection_origin, reflection_dir)

    # Recursively trace reflection ray
    reflection_color = trace_ray_recursive(
        reflection_ray,
        scene,
        depth + 1,
        max_depth
    )

    return reflection_color
```

### Combining Direct and Reflected Light

```python
def shade_reflective_surface(
    hit_point,
    hit_normal,
    incident_direction,
    material,
    scene,
    depth,
    max_depth
):
    """
    Shade surface combining direct lighting and reflections.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        incident_direction: Incident ray direction
        material: Surface material
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth

    Returns:
        Final shaded color
    """
    # Calculate direct lighting
    direct_color = calculate_direct_lighting(
        hit_point,
        hit_normal,
        material.base_color,
        scene.lights,
        scene.objects
    )

    # Calculate reflection
    reflection_color = trace_reflection(
        hit_point,
        hit_normal,
        incident_direction,
        material,
        scene,
        depth,
        max_depth
    )

    # Blend based on reflectivity
    final_color = (
        direct_color * (1.0 - material.sensesreflectivity) +
        reflection_color * material.reflectivity
    )

    return final_color
```

## Glossy Reflections

Glossy reflections simulate rough surfaces by perturbing the perfect reflection direction.

```python
def random_in_hemisphere(normal):
    """
    Generate random direction in hemisphere around normal.

    Args:
        normal: Hemisphere orientation (normalized)

    Returns:
        Random direction (normalized)
    """
    # Random direction on unit sphere
    theta = 2.0 * np.pi * np.random.random()
    z = 2.0 * np.random.random() - 1.0
    r = np.sqrt(1.0 - z * z)

    direction = np.array([
        r * np.cos(theta),
        r * np.sin(theta),
        z
    ])

    # Flip if on wrong hemisphere
    if np.dot(direction, normal) < 0:
        direction = -direction

    return direction

def glossy_reflect(perfect_reflection, normal, roughness, num_samples=1):
    """
    Calculate glossy reflection direction.

    Args:
        perfect_reflection: Perfect reflection direction
        normal: Surface normal
        roughness: Roughness parameter [0, 1]
        num_samples: Number of samples (1 for single sample)

    Returns:
        Perturbed reflection direction
    """
    if roughness == 0.0:
        return perfect_reflection

    # Perturb reflection direction
    random_dir = random_in_hemisphere(normal)

    # Blend between perfect reflection and random direction
    glossy_dir = perfect_reflection + roughness * random_dir
    glossy_dir = glossy_dir / np.linalg.norm(glossy_dir)

    return glossy_dir

def trace_glossy_reflection(
    hit_point,
    hit_normal,
    incident_direction,
    material,
    scene,
    depth,
    max_depth,
    num_samples=4
):
    """
    Trace glossy reflection using multiple samples.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        incident_direction: Incident direction
        material: Material properties
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth
        num_samples: Number of glossy samples

    Returns:
        Average reflected color
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Perfect reflection direction
    perfect_reflection = reflect(incident_direction, hit_normal)

    # Accumulate samples
    total_color = np.zeros(3)

    for i in range(num_samples):
        # Perturb reflection direction
        glossy_dir = glossy_reflect(
            perfect_reflection,
            hit_normal,
            material.roughness
        )

        # Trace perturbed ray
        reflection_origin = hit_point + hit_normal * 0.001
        reflection_ray = Ray(reflection_origin, glossy_dir)

        sample_color = trace_ray_recursive(
            reflection_ray,
            scene,
            depth + 1,
            max_depth
        )

        total_color += sample_color

    # Average samples
    return total_color / num_samples
```

## Refraction and Transmission

### Snell's Law

Refraction is governed by Snell's law:
```
n₁ sin(θ₁) = n₂ sin(θ₂)
```

where:
- n₁, n₂ are indices of refraction
- θ₁ is angle of incidence
- θ₂ is angle of refraction

```python
def refract(incident, normal, eta):
    """
    Calculate refraction vector using Snell's law.

    Args:
        incident: Incident ray direction (normalized, pointing toward surface)
        normal: Surface normal (normalized, pointing outward)
        eta: Ratio of refractive indices (n₁/n₂)

    Returns:
        Refraction direction or None if total internal reflection
    """
    # Ensure normalized inputs
    incident = incident / np.linalg.norm(incident)
    normal = normal / np.linalg.norm(normal)

    # Calculate cos(θ₁)
    cos_i = -np.dot(incident, normal)

    # Check if ray is entering or exiting material
    if cos_i < 0:
        # Ray is exiting - flip normal and eta
        cos_i = -cos_i
        normal = -normal
        eta = 1.0 / eta

    # Calculate sin²(θ₂) using Snell's law
    sin_t_squared = eta * eta * (1.0 - cos_i * cos_i)

    # Check for total internal reflection
    if sin_t_squared > 1.0:
        return None

    # Calculate cos(θ₂)
    cos_t = np.sqrt(1.0 - sin_t_squared)

    # Calculate refraction direction
    refraction = eta * incident + (eta * cos_i - cos_t) * normal

    return refraction / np.linalg.norm(refraction)

class RefractiveMaterial:
    """Material with refraction properties."""

    def __init__(self, color, ior, absorption=0.0):
        """
        Initialize refractive material.

        Args:
            color: Material color (RGB)
            ior: Index of refraction (1.0 = air, 1.5 = glass, 1.33 = water)
            absorption: Light absorption coefficient
        """
        self.color = np.array(color, dtype=float)
        self.ior = ior
        self.absorption = absorption

# Common indices of refraction
IOR_VACUUM = 1.0
IOR_AIR = 1.000293
IOR_WATER = 1.333
IOR_GLASS = 1.5
IOR_DIAMOND = 2.417
```

### Tracing Refraction

```python
def trace_refraction(
    hit_point,
    hit_normal,
    incident_direction,
    material,
    scene,
    depth,
    max_depth,
    inside=False
):
    """
    Trace refracted ray through transparent material.

    Args:
        hit_point: Surface intersection point
        hit_normal: Surface normal
        incident_direction: Incident ray direction
        material: Material properties
        scene: Scene to trace
        depth: Current recursion depth
        max_depth: Maximum recursion depth
        inside: Whether ray is inside the material

    Returns:
        Refracted color (RGB)
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Determine eta ratio
    if inside:
        eta = material.ior / 1.0  # Material to air
    else:
        eta = 1.0 / material.ior  # Air to material

    # Calculate refraction direction
    refraction_dir = refract(incident_direction, hit_normal, eta)

    if refraction_dir is None:
        # Total internal reflection
        reflection_dir = reflect(incident_direction, hit_normal)
        refraction_origin = hit_point + hit_normal * 0.001
        refraction_ray = Ray(refraction_origin, reflection_dir)
    else:
        # Refraction occurs
        # Offset in direction of refraction to avoid self-intersection
        offset_dir = refraction_dir if not inside else -hit_normal
        refraction_origin = hit_point + offset_dir * 0.001
        refraction_ray = Ray(refraction_origin, refraction_dir)

    # Trace refracted ray
    refracted_color = trace_ray_recursive(
        refraction_ray,
        scene,
        depth + 1,
        max_depth,
        inside=(not inside)  # Toggle inside/outside
    )

    # Apply absorption if inside material
    if inside and material.absorption > 0:
        # Beer's law: intensity decreases exponentially with distance
        distance = 1.0  # Approximate distance through material
        absorption_factor = np.exp(-material.absorption * distance)
        refracted_color *= absorption_factor

    # Tint by material color
    refracted_color *= material.color

    return refracted_color
```

## Fresnel Effect

The Fresnel equations describe how much light is reflected vs refracted at different angles. At grazing angles, even transparent materials become more reflective.

### Schlick's Approximation

```python
def fresnel_schlick(cos_theta, ior):
    """
    Schlick's approximation of Fresnel reflectance.

    Args:
        cos_theta: Cosine of angle between incident and normal
        ior: Index of refraction

    Returns:
        Fresnel reflectance [0, 1]
    """
    # F₀ = ((n₁ - n₂)/(n₁ + n₂))²
    # Assuming n₁ = 1 (air)
    r0 = ((1.0 - ior) / (1.0 + ior)) ** 2

    # Schlick's approximation
    # F = F₀ + (1 - F₀)(1 - cos θ)⁵
    return r0 + (1.0 - r0) * ((1.0 - cos_theta) ** 5)

def fresnel_dielectric(cos_theta_i, eta):
    """
    Full Fresnel equations for dielectrics.

    Args:
        cos_theta_i: Cosine of incident angle
        eta: Ratio of refractive indices

    Returns:
        Fresnel reflectance [0, 1]
    """
    # Calculate cos of transmission angle using Snell's law
    sin_theta_t_squared = eta * eta * (1.0 - cos_theta_i * cos_theta_i)

    # Total internal reflection
    if sin_theta_t_squared > 1.0:
        return 1.0

    cos_theta_t = np.sqrt(1.0 - sin_theta_t_squared)

    # Parallel polarization
    r_parallel = ((eta * cos_theta_i - cos_theta_t) /
                  (eta * cos_theta_i + cos_theta_t))

    # Perpendicular polarization
    r_perpendicular = ((cos_theta_i - eta * cos_theta_t) /
                       (cos_theta_i + eta * cos_theta_t))

    # Average of both polarizations
    reflectance = (r_parallel * r_parallel + r_perpendicular * r_perpendicular) / 2.0

    return reflectance
```

### Combining Reflection and Refraction with Fresnel

```python
def shade_glass_surface(
    hit_point,
    hit_normal,
    incident_direction,
    material,
    scene,
    depth,
    max_depth,
    inside=False
):
    """
    Shade glass surface with proper Fresnel blending.

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        incident_direction: Incident direction
        material: Material (must have ior)
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth
        inside: Whether inside material

    Returns:
        Final color combining reflection and refraction
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Calculate Fresnel reflectance
    cos_theta = abs(np.dot(incident_direction, hit_normal))

    if inside:
        eta = material.ior / 1.0
    else:
        eta = 1.0 / material.ior

    fresnel = fresnel_schlick(cos_theta, material.ior)

    # Trace reflection
    reflection_dir = reflect(incident_direction, hit_normal)
    reflection_origin = hit_point + hit_normal * 0.001
    reflection_ray = Ray(reflection_origin, reflection_dir)
    reflection_color = trace_ray_recursive(
        reflection_ray,
        scene,
        depth + 1,
        max_depth
    )

    # Trace refraction
    refraction_dir = refract(incident_direction, hit_normal, eta)

    if refraction_dir is None:
        # Total internal reflection
        return reflection_color

    offset_dir = refraction_dir if not inside else -hit_normal
    refraction_origin = hit_point + offset_dir * 0.001
    refraction_ray = Ray(refraction_origin, refraction_dir)
    refraction_color = trace_ray_recursive(
        refraction_ray,
        scene,
        depth + 1,
        max_depth,
        inside=(not inside)
    )

    # Blend based on Fresnel
    final_color = (
        reflection_color * fresnel +
        refraction_color * (1.0 - fresnel)
    )

    return final_color
```

## Multiple Internal Reflections

```python
def trace_glass_recursive(
    ray,
    scene,
    depth,
    max_depth,
    inside_material=None,
    importance=1.0,
    min_importance=0.01
):
    """
    Trace through glass with Russian roulette termination.

    Args:
        ray: Current ray
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth
        inside_material: Material we're currently inside (or None)
        importance: Current ray importance
        min_importance: Minimum importance before termination

    Returns:
        Color contribution
    """
    # Russian roulette termination
    if depth >= max_depth or importance < min_importance:
        return np.array([0.0, 0.0, 0.0])

    # Find intersection
    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        return get_background_color(ray.direction)

    # Check if we hit a refractive surface
    if not hasattr(hit.material, 'ior'):
        # Regular surface - shade normally
        return shade_surface(hit, scene, depth, max_depth)

    # Determine if entering or exiting
    entering = inside_material is None

    if entering:
        current_ior = 1.0
        next_ior = hit.material.ior
        next_material = hit.material
    else:
        current_ior = inside_material.ior
        next_ior = 1.0
        next_material = None

    eta = current_ior / next_ior

    # Calculate Fresnel
    cos_theta = abs(np.dot(ray.direction, hit.normal))
    fresnel = fresnel_schlick(cos_theta, eta)

    # Stochastic selection based on Fresnel
    if np.random.random() < fresnel:
        # Reflect
        reflection_dir = reflect(ray.direction, hit.normal)
        new_ray = Ray(hit.point + hit.normal * 0.001, reflection_dir)
        return trace_glass_recursive(
            new_ray,
            scene,
            depth + 1,
            max_depth,
            inside_material,
            importance * fresnel
        ) / fresnel  # Correct for probability
    else:
        # Refract
        refraction_dir = refract(ray.direction, hit.normal, eta)

        if refraction_dir is None:
            # Total internal reflection
            reflection_dir = reflect(ray.direction, hit.normal)
            new_ray = Ray(hit.point + hit.normal * 0.001, reflection_dir)
            return trace_glass_recursive(
                new_ray,
                scene,
                depth + 1,
                max_depth,
                inside_material,
                importance
            )

        offset_dir = refraction_dir if entering else -hit.normal
        new_ray = Ray(hit.point + offset_dir * 0.001, refraction_dir)
        return trace_glass_recursive(
            new_ray,
            scene,
            depth + 1,
            max_depth,
            next_material,
            importance * (1.0 - fresnel)
        ) / (1.0 - fresnel)  # Correct for probability
```

## Dispersion (Chromatic Aberration)

Different wavelengths refract at different angles, creating rainbows.

```python
def trace_dispersive_refraction(
    hit_point,
    hit_normal,
    incident_direction,
    material,
    scene,
    depth,
    max_depth
):
    """
    Trace refraction with dispersion (wavelength-dependent IOR).

    Args:
        hit_point: Surface point
        hit_normal: Surface normal
        incident_direction: Incident direction
        material: Material with wavelength-dependent IOR
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth

    Returns:
        RGB color with dispersion
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Different IOR for each color channel
    # Cauchy's equation: n(λ) = A + B/λ²
    ior_red = material.ior - 0.01
    ior_green = material.ior
    ior_blue = material.ior + 0.01

    final_color = np.zeros(3)

    # Trace each wavelength separately
    for i, ior in enumerate([ior_red, ior_green, ior_blue]):
        eta = 1.0 / ior
        refraction_dir = refract(incident_direction, hit_normal, eta)

        if refraction_dir is None:
            # Total internal reflection
            reflection_dir = reflect(incident_direction, hit_normal)
            refraction_origin = hit_point + hit_normal * 0.001
            refraction_ray = Ray(refraction_origin, reflection_dir)
        else:
            refraction_origin = hit_point + refraction_dir * 0.001
            refraction_ray = Ray(refraction_origin, refraction_dir)

        # Trace and extract single channel
        color = trace_ray_recursive(refraction_ray, scene, depth + 1, max_depth)
        final_color[i] = color[i]

    return final_color
```

## Conclusion

Reflections and refractions are fundamental phenomena that ray tracing handles elegantly through recursive ray casting. Perfect reflections are straightforward, while physically accurate glass rendering requires careful implementation of Snell's law, Fresnel equations, and proper handling of internal reflections. Glossy reflections and dispersion add realism but increase computational cost through multiple samples per intersection. Understanding these optical principles is essential for photorealistic rendering.
