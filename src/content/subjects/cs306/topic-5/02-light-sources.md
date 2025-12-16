# Light Sources in Computer Graphics

## Introduction to Light Sources

Light sources are fundamental to rendering realistic 3D scenes. Different types of lights create different illumination patterns, shadows, and visual effects. Understanding how to model and implement various light sources is crucial for achieving desired artistic and realistic results.

Real-world lighting is complex, involving continuous emission from surfaces, atmospheric scattering, and inter-reflection. Computer graphics simplifies this with idealized light source models that balance realism with computational efficiency.

## Point Lights (Omnidirectional Lights)

Point lights emit light equally in all directions from a single point in space, like a light bulb or candle.

### Mathematical Model

A point light at position $\mathbf{p}_l$ illuminating a surface point $\mathbf{p}$ contributes:

$$\mathbf{L} = \frac{\mathbf{l}}{|\mathbf{l}|}, \quad \mathbf{l} = \mathbf{p}_l - \mathbf{p}$$

Where $\mathbf{L}$ is the unit light direction vector.

```python
import numpy as np

class PointLight:
    """
    Omnidirectional point light source.
    """
    def __init__(self, position, color, intensity=1.0):
        """
        Args:
            position: Light position (x, y, z)
            color: Light color (r, g, b)
            intensity: Light intensity multiplier
        """
        self.position = np.array(position, dtype=np.float32)
        self.color = np.array(color, dtype=np.float32)
        self.intensity = intensity

    def get_light_direction(self, surface_point):
        """
        Get light direction from surface point to light.

        Args:
            surface_point: Point being illuminated (x, y, z)

        Returns:
            tuple: (direction, distance)
                direction: Unit vector toward light
                distance: Distance to light
        """
        light_vector = self.position - surface_point
        distance = np.linalg.norm(light_vector)

        if distance > 1e-6:
            direction = light_vector / distance
        else:
            direction = np.array([0, 1, 0])  # Arbitrary up vector

        return direction, distance

    def get_intensity(self, surface_point):
        """
        Get light intensity at surface point.

        Args:
            surface_point: Point being illuminated

        Returns:
            numpy.ndarray: Light intensity (r, g, b)
        """
        return self.color * self.intensity

def illuminate_with_point_light(surface_point, surface_normal, light):
    """
    Calculate illumination from point light.

    Args:
        surface_point: Point being illuminated
        surface_normal: Surface normal at point
        light: PointLight object

    Returns:
        tuple: (light_dir, light_intensity, n_dot_l)
    """
    light_dir, distance = light.get_light_direction(surface_point)
    light_intensity = light.get_intensity(surface_point)

    # Lambert's cosine law
    n_dot_l = max(0.0, np.dot(surface_normal, light_dir))

    return light_dir, light_intensity, n_dot_l
```

### Attenuation

Real lights diminish with distance. The inverse square law states intensity decreases proportionally to the square of distance:

$$I_{att} = \frac{I_0}{d^2}$$

Practical models use modified attenuation for artistic control:

$$I_{att} = \frac{I_0}{k_c + k_l \cdot d + k_q \cdot d^2}$$

Where:
- $k_c$ = constant attenuation (typically 1.0)
- $k_l$ = linear attenuation
- $k_q$ = quadratic attenuation
- $d$ = distance to light

```python
class AttenuatedPointLight(PointLight):
    """
    Point light with distance attenuation.
    """
    def __init__(self, position, color, intensity=1.0,
                 constant_atten=1.0, linear_atten=0.09, quadratic_atten=0.032):
        """
        Args:
            constant_atten: Constant attenuation factor
            linear_atten: Linear attenuation factor
            quadratic_atten: Quadratic attenuation factor
        """
        super().__init__(position, color, intensity)
        self.constant_atten = constant_atten
        self.linear_atten = linear_atten
        self.quadratic_atten = quadratic_atten

    def get_intensity(self, surface_point):
        """
        Get attenuated light intensity.

        Args:
            surface_point: Point being illuminated

        Returns:
            numpy.ndarray: Attenuated light intensity
        """
        _, distance = self.get_light_direction(surface_point)

        # Calculate attenuation
        attenuation = (
            self.constant_atten +
            self.linear_atten * distance +
            self.quadratic_atten * distance * distance
        )

        # Prevent division by zero
        attenuation = max(attenuation, 1e-6)

        return (self.color * self.intensity) / attenuation
```

## Directional Lights (Distant Lights)

Directional lights simulate infinitely distant sources (like the sun) where all rays are parallel.

### Mathematical Model

All surface points receive light from the same direction:

$$\mathbf{L} = -\mathbf{d}$$

Where $\mathbf{d}$ is the light's direction vector (pointing away from source).

```python
class DirectionalLight:
    """
    Directional light with parallel rays.
    """
    def __init__(self, direction, color, intensity=1.0):
        """
        Args:
            direction: Light direction vector (points away from source)
            color: Light color (r, g, b)
            intensity: Light intensity
        """
        # Normalize direction
        self.direction = np.array(direction, dtype=np.float32)
        self.direction /= np.linalg.norm(self.direction)

        self.color = np.array(color, dtype=np.float32)
        self.intensity = intensity

    def get_light_direction(self, surface_point):
        """
        Get light direction (same for all points).

        Args:
            surface_point: Ignored (direction is uniform)

        Returns:
            tuple: (direction, distance)
                direction: Unit vector toward light
                distance: infinity
        """
        # Return negative direction (toward light)
        return -self.direction, float('inf')

    def get_intensity(self, surface_point):
        """
        Get light intensity (no attenuation).

        Args:
            surface_point: Ignored

        Returns:
            numpy.ndarray: Light intensity
        """
        return self.color * self.intensity

def create_sunlight():
    """
    Create typical sunlight directional light.

    Returns:
        DirectionalLight: Configured sun light
    """
    # Sun coming from upper-right, slightly behind
    direction = np.array([0.3, -0.7, 0.3])

    # Warm yellowish-white color
    color = np.array([1.0, 0.95, 0.8])

    return DirectionalLight(direction, color, intensity=1.5)
```

**Advantages:**
- No attenuation calculations
- Position-independent (faster computation)
- Good for outdoor scenes with sun/moonlight

**Disadvantages:**
- Cannot create point-source effects
- Shadows always parallel

## Spotlights (Cone Lights)

Spotlights emit light in a cone shape, like flashlights, stage lights, or headlights.

### Mathematical Model

Spotlights combine point light characteristics with directional constraints:

$$I_{spot} = I_0 \cdot (\mathbf{L} \cdot \mathbf{d})^{n}$$

Where:
- $\mathbf{L}$ = direction from light to surface point
- $\mathbf{d}$ = spotlight direction
- $n$ = falloff exponent (controls edge sharpness)

```python
class Spotlight:
    """
    Cone-shaped spotlight.
    """
    def __init__(self, position, direction, color, intensity=1.0,
                 inner_cutoff=12.5, outer_cutoff=17.5, falloff=1.0):
        """
        Args:
            position: Light position
            direction: Direction spotlight points
            color: Light color
            intensity: Light intensity
            inner_cutoff: Inner cone angle (degrees, full intensity)
            outer_cutoff: Outer cone angle (degrees, zero intensity)
            falloff: Falloff exponent
        """
        self.position = np.array(position, dtype=np.float32)

        self.direction = np.array(direction, dtype=np.float32)
        self.direction /= np.linalg.norm(self.direction)

        self.color = np.array(color, dtype=np.float32)
        self.intensity = intensity

        # Convert angles to radians and store cosines
        self.inner_cutoff_cos = np.cos(np.radians(inner_cutoff))
        self.outer_cutoff_cos = np.cos(np.radians(outer_cutoff))

        self.falloff = falloff

    def get_light_direction(self, surface_point):
        """
        Get direction from surface to light.

        Args:
            surface_point: Point being illuminated

        Returns:
            tuple: (direction, distance)
        """
        light_vector = self.position - surface_point
        distance = np.linalg.norm(light_vector)

        if distance > 1e-6:
            direction = light_vector / distance
        else:
            direction = np.array([0, 1, 0])

        return direction, distance

    def get_intensity(self, surface_point):
        """
        Get spotlight intensity with cone falloff.

        Args:
            surface_point: Point being illuminated

        Returns:
            numpy.ndarray: Light intensity (0 if outside cone)
        """
        light_dir, _ = self.get_light_direction(surface_point)

        # Calculate angle between spotlight direction and light-to-surface
        cos_theta = np.dot(-light_dir, self.direction)

        # Outside outer cone
        if cos_theta < self.outer_cutoff_cos:
            return np.array([0.0, 0.0, 0.0])

        # Inside inner cone (full intensity)
        if cos_theta > self.inner_cutoff_cos:
            spotlight_factor = 1.0
        else:
            # Smooth falloff between inner and outer cones
            epsilon = self.inner_cutoff_cos - self.outer_cutoff_cos
            spotlight_factor = (
                (cos_theta - self.outer_cutoff_cos) / epsilon
            ) ** self.falloff

        return self.color * self.intensity * spotlight_factor

def create_flashlight(position, direction):
    """
    Create typical flashlight spotlight.

    Args:
        position: Flashlight position
        direction: Direction flashlight points

    Returns:
        Spotlight: Configured flashlight
    """
    return Spotlight(
        position=position,
        direction=direction,
        color=np.array([1.0, 1.0, 0.9]),  # Slightly warm white
        intensity=2.0,
        inner_cutoff=10.0,   # Tight inner cone
        outer_cutoff=20.0,   # Wider falloff
        falloff=2.0          # Moderate edge softness
    )
```

## Area Lights

Area lights emit from a surface region rather than a point, producing soft shadows and realistic lighting.

### Simplified Area Light Model

Exact area light calculation requires integrating over the light surface. Real-time approximations use:

1. **Multiple Point Lights**: Sample area with point lights
2. **Representative Point**: Use single point with modified parameters
3. **LTC (Linearly Transformed Cosines)**: Efficient analytical solution

```python
class RectangularAreaLight:
    """
    Rectangular area light (simplified as multiple point lights).
    """
    def __init__(self, center, normal, width, height, color, intensity=1.0, samples=4):
        """
        Args:
            center: Center position of light rectangle
            normal: Normal vector of light surface
            width: Rectangle width
            height: Rectangle height
            color: Light color
            intensity: Light intensity
            samples: Number of sample points (sqrt, so 4 = 4x4 = 16 points)
        """
        self.center = np.array(center, dtype=np.float32)

        # Normalize normal
        self.normal = np.array(normal, dtype=np.float32)
        self.normal /= np.linalg.norm(self.normal)

        self.width = width
        self.height = height
        self.color = np.array(color, dtype=np.float32)
        self.intensity = intensity
        self.samples = samples

        # Generate sample points
        self.point_lights = self._generate_samples()

    def _generate_samples(self):
        """
        Generate point light samples across area.

        Returns:
            list: PointLight objects
        """
        # Create orthonormal basis
        if abs(self.normal[1]) < 0.9:
            up = np.array([0, 1, 0])
        else:
            up = np.array([1, 0, 0])

        right = np.cross(self.normal, up)
        right /= np.linalg.norm(right)

        up = np.cross(right, self.normal)
        up /= np.linalg.norm(up)

        # Generate grid of samples
        point_lights = []
        intensity_per_sample = self.intensity / (self.samples * self.samples)

        for i in range(self.samples):
            for j in range(self.samples):
                # Position in [-0.5, 0.5] range
                u = (i + 0.5) / self.samples - 0.5
                v = (j + 0.5) / self.samples - 0.5

                # Calculate world position
                position = (
                    self.center +
                    right * (u * self.width) +
                    up * (v * self.height)
                )

                point_lights.append(
                    PointLight(position, self.color, intensity_per_sample)
                )

        return point_lights

    def get_contribution(self, surface_point, surface_normal):
        """
        Get total light contribution from area light.

        Args:
            surface_point: Point being illuminated
            surface_normal: Surface normal at point

        Returns:
            numpy.ndarray: Total light contribution
        """
        total_contribution = np.zeros(3, dtype=np.float32)

        for light in self.point_lights:
            light_dir, _ = light.get_light_direction(surface_point)
            intensity = light.get_intensity(surface_point)

            # Lambert term
            n_dot_l = max(0.0, np.dot(surface_normal, light_dir))

            total_contribution += intensity * n_dot_l

        return total_contribution
```

## Ambient Light

Ambient light provides uniform illumination, approximating indirect lighting from environment.

```python
class AmbientLight:
    """
    Uniform ambient illumination.
    """
    def __init__(self, color, intensity=0.1):
        """
        Args:
            color: Ambient light color
            intensity: Ambient intensity (typically low, 0.05-0.2)
        """
        self.color = np.array(color, dtype=np.float32)
        self.intensity = intensity

    def get_intensity(self):
        """
        Get ambient intensity.

        Returns:
            numpy.ndarray: Ambient light color * intensity
        """
        return self.color * self.intensity

def calculate_ambient_contribution(ambient_light, material_ambient):
    """
    Calculate ambient lighting contribution.

    Args:
        ambient_light: AmbientLight object
        material_ambient: Material's ambient reflectance (r, g, b)

    Returns:
        numpy.ndarray: Ambient contribution
    """
    return ambient_light.get_intensity() * material_ambient
```

## Image-Based Lighting (IBL)

IBL uses environment maps (images) to represent complex lighting from all directions.

### Environment Map Representation

```python
class EnvironmentLight:
    """
    Image-based environment lighting.
    """
    def __init__(self, env_map, intensity=1.0):
        """
        Args:
            env_map: Environment map image (height, width, 3)
            intensity: Overall environment intensity
        """
        self.env_map = env_map
        self.intensity = intensity
        self.height, self.width = env_map.shape[:2]

    def sample_direction(self, direction):
        """
        Sample environment map in given direction.

        Args:
            direction: Unit direction vector

        Returns:
            numpy.ndarray: Light color from that direction
        """
        # Convert direction to spherical coordinates
        theta = np.arccos(np.clip(direction[1], -1, 1))  # Latitude
        phi = np.arctan2(direction[2], direction[0])      # Longitude

        # Map to texture coordinates [0, 1]
        u = (phi + np.pi) / (2 * np.pi)
        v = theta / np.pi

        # Sample environment map
        x = int(u * self.width) % self.width
        y = int(v * self.height) % self.height

        return self.env_map[y, x] * self.intensity

def sample_environment_lighting(surface_point, surface_normal, env_light, num_samples=64):
    """
    Approximate environment lighting with Monte Carlo sampling.

    Args:
        surface_point: Point being illuminated
        surface_normal: Surface normal
        env_light: EnvironmentLight object
        num_samples: Number of hemisphere samples

    Returns:
        numpy.ndarray: Approximate environment contribution
    """
    total = np.zeros(3, dtype=np.float32)

    for _ in range(num_samples):
        # Generate random hemisphere direction
        direction = random_hemisphere_direction(surface_normal)

        # Sample environment
        light_color = env_light.sample_direction(direction)

        # Lambert term
        n_dot_l = max(0.0, np.dot(surface_normal, direction))

        total += light_color * n_dot_l

    # Average and account for hemisphere integration
    return (total / num_samples) * np.pi

def random_hemisphere_direction(normal):
    """
    Generate random direction in hemisphere around normal.

    Args:
        normal: Hemisphere normal direction

    Returns:
        numpy.ndarray: Random unit direction
    """
    # Uniform hemisphere sampling
    phi = 2 * np.pi * np.random.random()
    cos_theta = np.random.random()
    sin_theta = np.sqrt(1 - cos_theta * cos_theta)

    # Local coordinates
    local_dir = np.array([
        np.cos(phi) * sin_theta,
        cos_theta,
        np.sin(phi) * sin_theta
    ])

    # Transform to world space (aligned with normal)
    # Simplified - actual implementation needs proper basis
    return local_dir
```

## Multiple Light Sources

Scenes typically use multiple lights. Contributions are summed:

```python
def calculate_total_illumination(surface_point, surface_normal, material, lights):
    """
    Calculate total illumination from all light sources.

    Args:
        surface_point: Point being shaded
        surface_normal: Surface normal at point
        material: Material properties
        lights: List of light sources

    Returns:
        numpy.ndarray: Total illumination color
    """
    total_diffuse = np.zeros(3, dtype=np.float32)
    total_specular = np.zeros(3, dtype=np.float32)

    for light in lights:
        if isinstance(light, AmbientLight):
            # Ambient lights contribute to ambient term
            continue

        # Get light properties
        light_dir, _ = light.get_light_direction(surface_point)
        light_intensity = light.get_intensity(surface_point)

        # Diffuse contribution
        n_dot_l = max(0.0, np.dot(surface_normal, light_dir))
        total_diffuse += light_intensity * n_dot_l

        # Specular contribution (simplified Phong)
        if n_dot_l > 0:
            # Calculate reflection vector and specular
            # (Full implementation in shading section)
            pass

    # Combine with material properties
    final_color = (
        material.ambient +
        material.diffuse * total_diffuse +
        material.specular * total_specular
    )

    return np.clip(final_color, 0, 1)
```

## Conclusion

Understanding different light source types is essential for creating compelling 3D scenes:

- **Point lights**: Simple, omnidirectional, good for local sources
- **Directional lights**: Parallel rays, efficient for distant sources
- **Spotlights**: Cone-shaped, good for focused lighting
- **Area lights**: Soft shadows, realistic but expensive
- **Ambient lights**: Quick approximation of global illumination
- **Image-based lights**: Complex environment lighting

Real scenes combine multiple light types to achieve desired mood and realism. Modern renderers support hundreds of lights through techniques like deferred shading, light culling, and clustered rendering.

The next section will explore how these lights combine with surface materials through the Phong illumination model.
