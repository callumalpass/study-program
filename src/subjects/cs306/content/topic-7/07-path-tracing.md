# Path Tracing

## Introduction to Path Tracing

Path tracing is an unbiased Monte Carlo method for solving the rendering equation, producing physically accurate images by simulating light transport. Unlike traditional ray tracing which handles only specular reflections and refractions explicitly, path tracing treats all light transport uniformly through random sampling, naturally producing effects like soft shadows, color bleeding, caustics, and global illumination.

Introduced by James Kajiya in 1986 alongside the rendering equation, path tracing has become the gold standard for photorealistic rendering in offline applications like film and architectural visualization. Modern denoising techniques are making it increasingly practical for real-time use.

## The Rendering Equation

The rendering equation describes the equilibrium distribution of light in a scene:

```
L_o(x, ω_o) = L_e(x, ω_o) + ∫_Ω f_r(x, ω_i, ω_o) L_i(x, ω_i) |cos θ_i| dω_i
```

Where:
- **L_o(x, ω_o)**: Outgoing radiance at point x in direction ω_o
- **L_e(x, ω_o)**: Emitted radiance (light sources)
- **f_r(x, ω_i, ω_o)**: BRDF (bidirectional reflectance distribution function)
- **L_i(x, ω_i)**: Incoming radiance from direction ω_i
- **Ω**: Hemisphere above point x
- **cos θ_i**: Cosine of angle between ω_i and surface normal

## Basic Path Tracing Algorithm

```python
import numpy as np

def path_trace(ray, scene, depth=0, max_depth=5):
    """
    Basic path tracing algorithm.

    Args:
        ray: Camera or bounce ray
        scene: Scene containing geometry and lights
        depth: Current path depth
        max_depth: Maximum bounces

    Returns:
        RGB color (radiance)
    """
    # Termination
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    # Find intersection
    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        # Miss - return environment/background
        return scene.get_environment_light(ray.direction)

    # Emissive surfaces contribute directly
    radiance = hit.material.emission if hasattr(hit.material, 'emission') else np.zeros(3)

    # Sample random direction in hemisphere
    sample_dir = cosine_sample_hemisphere(hit.normal)

    # Create bounce ray
    bounce_ray = Ray(hit.point + hit.normal * 0.001, sample_dir)

    # Recursively trace
    incoming_radiance = path_trace(bounce_ray, scene, depth + 1, max_depth)

    # BRDF (Lambertian diffuse)
    brdf = hit.material.albedo / np.pi

    # Rendering equation Monte Carlo estimate
    # PDF for cosine-weighted sampling = cos(θ) / π
    # cos(θ) term cancels with PDF
    # Result: BRDF * incoming_radiance * π

    radiance += brdf * incoming_radiance

    return radiance

def render_path_traced(scene, camera, width, height, samples_per_pixel=64):
    """
    Render image using path tracing.

    Args:
        scene: Scene to render
        camera: Camera
        width: Image width
        height: Image height
        samples_per_pixel: Number of samples per pixel

    Returns:
        RGB image
    """
    image = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            pixel_color = np.zeros(3)

            # Multiple samples per pixel for anti-aliasing and noise reduction
            for sample in range(samples_per_pixel):
                # Random offset within pixel
                u = (x + np.random.random()) / width
                v = (y + np.random.random()) / height

                # Generate camera ray
                ray = camera.generate_ray(u, v)

                # Trace path
                pixel_color += path_trace(ray, scene)

            # Average samples
            image[y, x] = pixel_color / samples_per_pixel

    return image

def cosine_sample_hemisphere(normal):
    """
    Sample random direction with cosine-weighted distribution.

    Args:
        normal: Surface normal (hemisphere orientation)

    Returns:
        Random direction (normalized)
    """
    # Uniformly sample disk
    r = np.sqrt(np.random.random())
    theta = 2.0 * np.pi * np.random.random()

    x = r * np.cos(theta)
    y = r * np.sin(theta)
    z = np.sqrt(max(0.0, 1.0 - x*x - y*y))

    # Create tangent space basis
    up = np.array([0, 1, 0]) if abs(normal[1]) < 0.999 else np.array([1, 0, 0])
    tangent = np.cross(up, normal)
    tangent = tangent / np.linalg.norm(tangent)
    bitangent = np.cross(normal, tangent)

    # Transform to world space
    direction = tangent * x + bitangent * y + normal * z

    return direction / np.linalg.norm(direction)
```

## Russian Roulette Path Termination

Instead of fixed maximum depth, use probabilistic termination:

```python
def path_trace_with_rr(ray, scene, depth=0, min_depth=3):
    """
    Path tracing with Russian Roulette termination.

    Args:
        ray: Current ray
        scene: Scene
        depth: Current depth
        min_depth: Minimum depth before RR starts

    Returns:
        RGB radiance
    """
    # Find intersection
    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        return scene.get_environment_light(ray.direction)

    # Emission
    radiance = hit.material.emission if hasattr(hit.material, 'emission') else np.zeros(3)

    # Russian Roulette termination
    if depth >= min_depth:
        # Survival probability based on albedo
        survival_prob = min(0.95, np.max(hit.material.albedo))

        if np.random.random() > survival_prob:
            # Terminate path
            return radiance

        # Continue with probability correction
        throughput_scale = 1.0 / survival_prob
    else:
        throughput_scale = 1.0

    # Sample direction
    sample_dir = cosine_sample_hemisphere(hit.normal)

    # Bounce ray
    bounce_ray = Ray(hit.point + hit.normal * 0.001, sample_dir)

    # Recursive trace
    incoming = path_trace_with_rr(bounce_ray, scene, depth + 1, min_depth)

    # BRDF
    brdf = hit.material.albedo / np.pi

    # Add reflected radiance
    radiance += brdf * incoming * throughput_scale

    return radiance
```

## Importance Sampling

Sample directions proportionally to their expected contribution.

### Direct Light Sampling

```python
def path_trace_with_nee(ray, scene, depth=0, max_depth=5):
    """
    Path tracing with Next Event Estimation (explicit light sampling).

    Args:
        ray: Current ray
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth

    Returns:
        RGB radiance
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        return scene.get_environment_light(ray.direction)

    # Emission (only count on camera rays or specular bounces)
    if depth == 0 or is_specular_bounce(ray):
        radiance = hit.material.emission if hasattr(hit.material, 'emission') else np.zeros(3)
    else:
        radiance = np.zeros(3)

    # Direct lighting (Next Event Estimation)
    direct_light = sample_direct_lighting(hit, scene)
    radiance += direct_light

    # Indirect lighting (hemisphere sampling)
    if depth < max_depth - 1:
        # Sample BRDF direction
        sample_dir = cosine_sample_hemisphere(hit.normal)

        # Bounce ray
        bounce_ray = Ray(hit.point + hit.normal * 0.001, sample_dir)

        # Recursive trace
        incoming = path_trace_with_nee(bounce_ray, scene, depth + 1, max_depth)

        # BRDF
        brdf = hit.material.albedo / np.pi

        radiance += brdf * incoming

    return radiance

def sample_direct_lighting(hit, scene):
    """
    Sample direct lighting from lights.

    Args:
        hit: Surface hit information
        scene: Scene with lights

    Returns:
        Direct lighting contribution
    """
    if not scene.lights:
        return np.zeros(3)

    # Choose random light
    light = scene.lights[np.random.randint(len(scene.lights))]

    # Sample point on light
    light_sample, pdf = light.sample_point()

    # Direction to light
    to_light = light_sample - hit.point
    distance = np.linalg.norm(to_light)
    light_dir = to_light / distance

    # Check visibility
    shadow_ray = Ray(hit.point + hit.normal * 0.001, light_dir)
    occluded = False

    for obj in scene.objects:
        shadow_hit = obj.intersect(shadow_ray)
        if shadow_hit and shadow_hit.t < distance - 0.001:
            occluded = True
            break

    if occluded:
        return np.zeros(3)

    # Calculate contribution
    # BRDF
    brdf = hit.material.albedo / np.pi

    # Cosine term
    cos_theta = max(0.0, np.dot(hit.normal, light_dir))

    # Light emission
    light_emission = light.emission

    # Geometric term
    light_normal = light.get_normal(light_sample)
    cos_theta_light = max(0.0, np.dot(light_normal, -light_dir))

    # Full contribution with MIS weight
    contribution = (
        brdf * light_emission * cos_theta * cos_theta_light /
        (distance * distance * pdf * len(scene.lights))
    )

    return contribution
```

### BRDF Importance Sampling

```python
def sample_brdf_direction(hit, incoming_dir, brdf_type='lambertian'):
    """
    Sample direction according to BRDF.

    Args:
        hit: Surface hit information
        incoming_dir: Incoming ray direction
        brdf_type: Type of BRDF

    Returns:
        (sample_direction, pdf)
    """
    if brdf_type == 'lambertian':
        # Cosine-weighted hemisphere sampling
        direction = cosine_sample_hemisphere(hit.normal)
        cos_theta = max(0.0, np.dot(direction, hit.normal))
        pdf = cos_theta / np.pi
        return direction, pdf

    elif brdf_type == 'specular':
        # Perfect reflection
        direction = reflect(incoming_dir, hit.normal)
        return direction, 1.0

    elif brdf_type == 'glossy':
        # Phong lobe sampling
        # Reflect direction
        reflect_dir = reflect(incoming_dir, hit.normal)

        # Sample around reflection direction
        # Using Phong distribution
        shininess = hit.material.shininess
        xi = np.random.random(2)

        cos_theta = np.power(xi[0], 1.0 / (shininess + 1.0))
        sin_theta = np.sqrt(1.0 - cos_theta * cos_theta)
        phi = 2.0 * np.pi * xi[1]

        # Local sample
        local_sample = np.array([
            sin_theta * np.cos(phi),
            sin_theta * np.sin(phi),
            cos_theta
        ])

        # Transform to reflection space
        direction = transform_to_world(local_sample, reflect_dir)

        # PDF
        pdf = (shininess + 1.0) * np.power(cos_theta, shininess) / (2.0 * np.pi)

        return direction, pdf

def transform_to_world(local_dir, normal):
    """Transform direction from local to world space."""
    up = np.array([0, 1, 0]) if abs(normal[1]) < 0.999 else np.array([1, 0, 0])
    tangent = np.cross(up, normal)
    tangent = tangent / np.linalg.norm(tangent)
    bitangent = np.cross(normal, tangent)

    world_dir = (tangent * local_dir[0] +
                 bitangent * local_dir[1] +
                 normal * local_dir[2])

    return world_dir / np.linalg.norm(world_dir)
```

## Multiple Importance Sampling (MIS)

Combine multiple sampling strategies optimally:

```python
def power_heuristic(pdf_a, pdf_b, beta=2):
    """
    Power heuristic for Multiple Importance Sampling.

    Args:
        pdf_a: PDF of strategy A
        pdf_b: PDF of strategy B
        beta: Power parameter (typically 2)

    Returns:
        MIS weight for strategy A
    """
    if pdf_a == 0:
        return 0.0

    a = pdf_a ** beta
    b = pdf_b ** beta

    return a / (a + b)

def path_trace_with_mis(ray, scene, depth=0, max_depth=5):
    """
    Path tracing with Multiple Importance Sampling.

    Args:
        ray: Current ray
        scene: Scene
        depth: Current depth
        max_depth: Maximum depth

    Returns:
        RGB radiance
    """
    if depth >= max_depth:
        return np.array([0.0, 0.0, 0.0])

    hit = find_closest_hit(ray, scene.objects)

    if hit is None:
        return scene.get_environment_light(ray.direction)

    radiance = np.zeros(3)

    # Emission
    if depth == 0:
        radiance = hit.material.emission if hasattr(hit.material, 'emission') else np.zeros(3)

    # Direct lighting with MIS
    if scene.lights:
        # Sample light
        light = scene.lights[0]  # Simplified: single light
        light_sample, light_pdf = light.sample_point()

        to_light = light_sample - hit.point
        distance = np.linalg.norm(to_light)
        light_dir = to_light / distance

        # BRDF PDF for this direction
        cos_theta = max(0.0, np.dot(hit.normal, light_dir))
        brdf_pdf = cos_theta / np.pi

        # MIS weight
        mis_weight = power_heuristic(light_pdf, brdf_pdf)

        # Check visibility
        if not is_occluded(hit.point, light_sample, scene.objects):
            brdf = hit.material.albedo / np.pi
            light_emission = light.emission

            contribution = (
                brdf * light_emission * cos_theta * mis_weight /
                (distance * distance * light_pdf)
            )

            radiance += contribution

        # Sample BRDF
        brdf_dir = cosine_sample_hemisphere(hit.normal)
        brdf_pdf = max(0.0, np.dot(hit.normal, brdf_dir)) / np.pi

        # Check if BRDF sample hits light
        brdf_ray = Ray(hit.point + hit.normal * 0.001, brdf_dir)
        light_hit = light.intersect(brdf_ray)

        if light_hit:
            # Calculate light PDF for this direction
            light_pdf_for_brdf = light.pdf_from_direction(hit.point, brdf_dir)

            # MIS weight
            mis_weight = power_heuristic(brdf_pdf, light_pdf_for_brdf)

            brdf = hit.material.albedo / np.pi
            light_emission = light.emission
            cos_theta = max(0.0, np.dot(hit.normal, brdf_dir))

            contribution = brdf * light_emission * cos_theta * mis_weight / brdf_pdf

            radiance += contribution

    # Indirect lighting
    if depth < max_depth - 1:
        sample_dir = cosine_sample_hemisphere(hit.normal)
        bounce_ray = Ray(hit.point + hit.normal * 0.001, sample_dir)

        incoming = path_trace_with_mis(bounce_ray, scene, depth + 1, max_depth)

        brdf = hit.material.albedo / np.pi
        radiance += brdf * incoming

    return radiance

def is_occluded(point_a, point_b, objects):
    """Check if line segment is occluded."""
    direction = point_b - point_a
    distance = np.linalg.norm(direction)
    direction = direction / distance

    ray = Ray(point_a + direction * 0.001, direction)

    for obj in objects:
        hit = obj.intersect(ray)
        if hit and hit.t < distance - 0.001:
            return True

    return False
```

## Bidirectional Path Tracing

Trace paths from both camera and light sources:

```python
def bdpt_render(scene, camera, width, height, samples=64):
    """
    Simplified Bidirectional Path Tracing.

    Args:
        scene: Scene
        camera: Camera
        width: Image width
        height: Image height
        samples: Samples per pixel

    Returns:
        Rendered image
    """
    image = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            pixel_color = np.zeros(3)

            for s in range(samples):
                # Generate camera path
                u = (x + np.random.random()) / width
                v = (y + np.random.random()) / height
                camera_ray = camera.generate_ray(u, v)
                camera_path = trace_path(camera_ray, scene, max_depth=5)

                # Generate light path
                light = scene.lights[np.random.randint(len(scene.lights))]
                light_ray = light.sample_ray()
                light_path = trace_path(light_ray, scene, max_depth=5)

                # Connect paths at all combinations
                contribution = connect_paths(camera_path, light_path, scene)

                pixel_color += contribution

            image[y, x] = pixel_color / samples

    return image

def trace_path(ray, scene, max_depth=5):
    """
    Trace path and store all vertices.

    Returns:
        List of path vertices
    """
    path = []

    for depth in range(max_depth):
        hit = find_closest_hit(ray, scene.objects)

        if hit is None:
            break

        path.append(hit)

        # Sample next direction
        next_dir = cosine_sample_hemisphere(hit.normal)
        ray = Ray(hit.point + hit.normal * 0.001, next_dir)

    return path

def connect_paths(camera_path, light_path, scene):
    """
    Connect camera and light paths and calculate contribution.

    Simplified version - full BDPT is complex.
    """
    if not camera_path or not light_path:
        return np.zeros(3)

    # Connect last vertices
    camera_vertex = camera_path[-1]
    light_vertex = light_path[-1]

    # Check visibility
    if is_occluded(camera_vertex.point, light_vertex.point, scene.objects):
        return np.zeros(3)

    # Calculate contribution (simplified)
    direction = light_vertex.point - camera_vertex.point
    distance = np.linalg.norm(direction)
    direction = direction / distance

    cos_camera = max(0.0, np.dot(camera_vertex.normal, direction))
    cos_light = max(0.0, np.dot(light_vertex.normal, -direction))

    # Simplified contribution
    contribution = (
        camera_vertex.material.albedo *
        light_vertex.material.emission *
        cos_camera * cos_light /
        (distance * distance)
    )

    return contribution
```

## Convergence and Denoising

```python
def progressive_path_trace(scene, camera, width, height, max_samples=1000):
    """
    Progressive rendering that updates display during convergence.

    Args:
        scene: Scene
        camera: Camera
        width: Image width
        height: Image height
        max_samples: Maximum samples per pixel

    Returns:
        Final image
    """
    accumulated = np.zeros((height, width, 3))
    variance = np.ones((height, width))

    for sample in range(max_samples):
        sample_image = np.zeros((height, width, 3))

        for y in range(height):
            for x in range(width):
                # Random offset
                u = (x + np.random.random()) / width
                v = (y + np.random.random()) / height

                ray = camera.generate_ray(u, v)
                color = path_trace_with_rr(ray, scene)

                sample_image[y, x] = color

        # Accumulate
        accumulated += sample_image

        # Current estimate
        current = accumulated / (sample + 1)

        # Update variance (simplified)
        if sample > 0:
            variance = np.var(accumulated[:, :, :] / (sample + 1), axis=2)

        # Could display current here for progressive rendering

        # Check convergence (simplified)
        if sample > 10 and np.mean(variance) < 0.001:
            print(f"Converged after {sample + 1} samples")
            break

    return current
```

## Conclusion

Path tracing represents the state-of-the-art in physically-based rendering, producing unbiased, photorealistic images by faithfully simulating light transport. While computationally expensive, techniques like Russian Roulette, importance sampling, and Multiple Importance Sampling significantly improve convergence. Modern approaches combine path tracing with denoising and adaptive sampling to achieve interactive frame rates, making it increasingly practical even for real-time applications like games and VR.
