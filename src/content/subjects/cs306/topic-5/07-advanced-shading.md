# Advanced Shading Techniques

## Introduction to Physically-Based Rendering (PBR)

Physically-Based Rendering represents a paradigm shift in computer graphics, moving from ad-hoc artistic models (like Phong) to physically accurate light transport simulation. PBR ensures materials look consistent under different lighting conditions and provides a more intuitive workflow for artists.

PBR is built on three core principles:

1. **Energy Conservation**: Surfaces never reflect more light than they receive
2. **Physically-Based BRDFs**: Use models grounded in physics (microfacet theory)
3. **Measured Material Values**: Use real-world measured parameters

## The Microfacet Theory

Microfacet theory models surfaces as composed of microscopic mirror-like facets oriented in different directions.

### Core Concept

At the macro scale, a surface appears rough or smooth. At the micro scale, it's composed of tiny perfect mirrors (microfacets). The distribution of microfacet orientations determines surface appearance.

```python
import numpy as np

class MicrofacetModel:
    """
    Conceptual microfacet surface model.
    """
    def __init__(self, roughness):
        """
        Args:
            roughness: Surface roughness [0, 1]
                0 = all facets aligned (mirror)
                1 = random facet orientations (matte)
        """
        self.roughness = roughness

    def generate_facet_normals(self, count=1000):
        """
        Generate random microfacet normal distribution.

        Args:
            count: Number of facets to generate

        Returns:
            numpy.ndarray: Array of facet normals
        """
        normals = []

        for _ in range(count):
            # Generate random direction based on roughness
            # Smooth surfaces concentrate around macro normal
            # Rough surfaces spread widely

            if self.roughness < 0.1:
                # Very smooth - tight distribution
                theta = np.random.normal(0, self.roughness * 0.5)
                phi = np.random.uniform(0, 2 * np.pi)
            else:
                # Rougher - wider distribution
                theta = np.random.uniform(0, self.roughness * np.pi / 2)
                phi = np.random.uniform(0, 2 * np.pi)

            # Convert to Cartesian
            x = np.sin(theta) * np.cos(phi)
            y = np.cos(theta)
            z = np.sin(theta) * np.sin(phi)

            normal = np.array([x, y, z])
            normal /= np.linalg.norm(normal)

            normals.append(normal)

        return np.array(normals)
```

### The Cook-Torrance Model

The Cook-Torrance model is the foundation of modern PBR. It models specular reflection using microfacet theory:

$$f_r(\mathbf{l}, \mathbf{v}) = \frac{DFG}{4(\mathbf{n} \cdot \mathbf{l})(\mathbf{n} \cdot \mathbf{v})}$$

Where:
- $D$ = **Normal Distribution Function** - distribution of microfacet orientations
- $F$ = **Fresnel Term** - reflectance as function of viewing angle
- $G$ = **Geometry Function** - self-shadowing/masking of microfacets

```python
class CookTorranceModel:
    """
    Complete Cook-Torrance microfacet BRDF implementation.
    """
    def __init__(self, albedo, roughness, metallic):
        """
        Args:
            albedo: Base color (r, g, b)
            roughness: Surface roughness [0, 1]
            metallic: Metalness [0, 1]
        """
        self.albedo = np.array(albedo, dtype=np.float32)
        self.roughness = max(0.001, roughness)  # Avoid division by zero
        self.metallic = metallic

        # Calculate F0 (reflectance at normal incidence)
        if metallic > 0.5:
            # Metals use albedo as F0
            self.f0 = albedo
        else:
            # Dielectrics typically 0.04 (4%)
            self.f0 = np.array([0.04, 0.04, 0.04])

    def evaluate(self, normal, light_dir, view_dir, light_color):
        """
        Evaluate Cook-Torrance BRDF.

        Args:
            normal: Surface normal (unit vector)
            light_dir: Direction to light (unit vector)
            view_dir: Direction to viewer (unit vector)
            light_color: Incident light color (r, g, b)

        Returns:
            numpy.ndarray: Reflected light color
        """
        # Calculate halfway vector
        halfway = light_dir + view_dir
        h_len = np.linalg.norm(halfway)

        if h_len < 1e-6:
            return np.zeros(3)

        halfway /= h_len

        # Calculate dot products
        n_dot_l = max(0.0, np.dot(normal, light_dir))
        n_dot_v = max(0.0, np.dot(normal, view_dir))
        n_dot_h = max(0.0, np.dot(normal, halfway))
        v_dot_h = max(0.0, np.dot(view_dir, halfway))

        if n_dot_l < 1e-6 or n_dot_v < 1e-6:
            return np.zeros(3)

        # Compute BRDF terms
        D = self.normal_distribution_ggx(n_dot_h)
        F = self.fresnel_schlick(v_dot_h)
        G = self.geometry_smith(n_dot_l, n_dot_v)

        # Specular BRDF
        numerator = D * F * G
        denominator = 4.0 * n_dot_l * n_dot_v
        specular = numerator / max(denominator, 1e-6)

        # Diffuse BRDF (Lambertian)
        # Energy conservation: kD + kS = 1
        kS = F  # Fresnel tells us how much is reflected (specular)
        kD = (1.0 - kS) * (1.0 - self.metallic)  # Metals have no diffuse

        diffuse = kD * self.albedo / np.pi

        # Total BRDF
        brdf = diffuse + specular

        # Multiply by incoming light and cosine term
        return brdf * light_color * n_dot_l

    def normal_distribution_ggx(self, n_dot_h):
        """
        GGX/Trowbridge-Reitz normal distribution function.

        Describes distribution of microfacet normals.
        Controls size and shape of specular highlight.

        Args:
            n_dot_h: Dot product of normal and halfway vector

        Returns:
            float: Distribution value
        """
        a = self.roughness * self.roughness
        a2 = a * a
        n_dot_h2 = n_dot_h * n_dot_h

        numerator = a2
        denominator = n_dot_h2 * (a2 - 1.0) + 1.0
        denominator = np.pi * denominator * denominator

        return numerator / max(denominator, 1e-6)

    def fresnel_schlick(self, cos_theta):
        """
        Schlick approximation of Fresnel equations.

        Describes how much light is reflected vs refracted
        as a function of viewing angle.

        Args:
            cos_theta: Cosine of angle between view and halfway

        Returns:
            numpy.ndarray: Fresnel reflectance (r, g, b)
        """
        # Schlick approximation
        return self.f0 + (1.0 - self.f0) * np.power(1.0 - cos_theta, 5.0)

    def geometry_smith(self, n_dot_l, n_dot_v):
        """
        Smith geometry function (shadowing-masking).

        Accounts for microfacets shadowing/blocking each other.

        Args:
            n_dot_l: Dot product normal and light direction
            n_dot_v: Dot product normal and view direction

        Returns:
            float: Geometry term [0, 1]
        """
        ggx1 = self.geometry_schlick_ggx(n_dot_v)
        ggx2 = self.geometry_schlick_ggx(n_dot_l)

        return ggx1 * ggx2

    def geometry_schlick_ggx(self, n_dot_v):
        """
        Schlick-GGX geometry term.

        Args:
            n_dot_v: Dot product

        Returns:
            float: Geometry value
        """
        r = self.roughness + 1.0
        k = (r * r) / 8.0  # Direct lighting

        numerator = n_dot_v
        denominator = n_dot_v * (1.0 - k) + k

        return numerator / max(denominator, 1e-6)
```

## Image-Based Lighting (IBL)

IBL uses environment maps to provide realistic ambient lighting from all directions.

### Environment Map Types

**1. Latitude-Longitude (Equirectangular)**
- Spherical panorama mapped to 2D
- Simple but distorted at poles

**2. Cube Maps**
- Six square faces forming cube
- Uniform sampling, no distortion

```python
class EnvironmentMap:
    """
    Environment map for image-based lighting.
    """
    def __init__(self, hdr_image):
        """
        Args:
            hdr_image: HDR environment map (height, width, 3)
        """
        self.image = hdr_image
        self.height, self.width = hdr_image.shape[:2]

        # Precompute irradiance map (diffuse convolution)
        self.irradiance_map = self.compute_irradiance_map()

        # Precompute specular cubemap (for different roughness levels)
        self.specular_maps = self.compute_specular_maps()

    def sample(self, direction):
        """
        Sample environment map in given direction.

        Args:
            direction: Unit direction vector (x, y, z)

        Returns:
            numpy.ndarray: Light color from that direction
        """
        # Convert to spherical coordinates
        theta = np.arccos(np.clip(direction[1], -1, 1))
        phi = np.arctan2(direction[2], direction[0])

        # Map to texture coordinates
        u = (phi + np.pi) / (2 * np.pi)
        v = theta / np.pi

        # Sample
        x = int(u * self.width) % self.width
        y = int(v * self.height) % self.height

        return self.image[y, x]

    def compute_irradiance_map(self, size=32):
        """
        Precompute diffuse irradiance map.

        Convolves environment map to integrate incoming light
        for diffuse surfaces.

        Args:
            size: Resolution of irradiance map

        Returns:
            numpy.ndarray: Irradiance map
        """
        irradiance = np.zeros((size, size, 3), dtype=np.float32)

        num_samples = 1024

        for y in range(size):
            for x in range(size):
                # Convert to direction
                u = (x + 0.5) / size
                v = (y + 0.5) / size

                phi = u * 2 * np.pi
                theta = v * np.pi

                # Normal direction for this texel
                normal = np.array([
                    np.sin(theta) * np.cos(phi),
                    np.cos(theta),
                    np.sin(theta) * np.sin(phi)
                ])

                # Integrate incoming light over hemisphere
                total_light = np.zeros(3)
                total_weight = 0.0

                for _ in range(num_samples):
                    # Random direction in hemisphere
                    sample_dir = random_hemisphere_direction(normal)

                    # Sample environment
                    light = self.sample(sample_dir)

                    # Weight by cosine
                    cos_theta = max(0.0, np.dot(normal, sample_dir))

                    total_light += light * cos_theta
                    total_weight += cos_theta

                if total_weight > 0:
                    irradiance[y, x] = total_light / total_weight

        return irradiance

    def compute_specular_maps(self, mip_levels=5):
        """
        Precompute specular environment maps for different roughness.

        Args:
            mip_levels: Number of roughness levels

        Returns:
            list: Specular maps for increasing roughness
        """
        specular_maps = []

        for mip in range(mip_levels):
            roughness = mip / (mip_levels - 1)
            spec_map = self.convolve_specular(roughness)
            specular_maps.append(spec_map)

        return specular_maps

    def convolve_specular(self, roughness, size=128):
        """
        Convolve environment for specific roughness level.

        Args:
            roughness: Surface roughness [0, 1]
            size: Output resolution

        Returns:
            numpy.ndarray: Convolved specular map
        """
        # Simplified - actual implementation uses importance sampling
        # based on NDF (normal distribution function)
        return self.image  # Placeholder

def random_hemisphere_direction(normal):
    """
    Generate random direction in hemisphere around normal.

    Args:
        normal: Hemisphere orientation

    Returns:
        numpy.ndarray: Random unit direction
    """
    # Cosine-weighted hemisphere sampling
    r1 = np.random.random()
    r2 = np.random.random()

    phi = 2 * np.pi * r1
    cos_theta = np.sqrt(r2)
    sin_theta = np.sqrt(1 - r2)

    # Local direction
    local = np.array([
        np.cos(phi) * sin_theta,
        cos_theta,
        np.sin(phi) * sin_theta
    ])

    # Transform to world space
    # (Proper implementation needs TBN matrix)
    return local
```

## Split-Sum Approximation

Real-time PBR uses split-sum approximation to evaluate IBL efficiently:

$$L_o(\mathbf{v}) \approx \left( \int_{\Omega} L_i(\mathbf{l}) \, d\mathbf{l} \right) \times \left( \int_{\Omega} f_r(\mathbf{l}, \mathbf{v}) \, (\mathbf{n} \cdot \mathbf{l}) \, d\mathbf{l} \right)$$

Precomputed:
1. **Irradiance map**: Convolve environment for diffuse
2. **Prefiltered environment**: Convolve for specular at different roughness
3. **BRDF integration map**: 2D lookup table (roughness, n·v) → (scale, bias)

```python
def generate_brdf_lut(size=512):
    """
    Generate BRDF integration lookup table.

    Args:
        size: LUT resolution

    Returns:
        numpy.ndarray: LUT (size, size, 2)
            Channel 0: Scale factor
            Channel 1: Bias factor
    """
    lut = np.zeros((size, size, 2), dtype=np.float32)

    for y in range(size):
        for x in range(size):
            # LUT coordinates
            n_dot_v = (x + 0.5) / size  # [0, 1]
            roughness = (y + 0.5) / size  # [0, 1]

            # Integrate BRDF
            scale, bias = integrate_brdf(n_dot_v, roughness)

            lut[y, x, 0] = scale
            lut[y, x, 1] = bias

    return lut

def integrate_brdf(n_dot_v, roughness, num_samples=1024):
    """
    Integrate BRDF for given parameters.

    Args:
        n_dot_v: Dot product of normal and view
        roughness: Surface roughness
        num_samples: Number of Monte Carlo samples

    Returns:
        tuple: (scale, bias) factors
    """
    # View direction (assuming normal = (0, 1, 0))
    view = np.array([
        np.sqrt(1.0 - n_dot_v * n_dot_v),
        n_dot_v,
        0.0
    ])

    normal = np.array([0, 1, 0])

    a = 0.0
    b = 0.0

    for i in range(num_samples):
        # Importance sample GGX
        xi = np.array([
            np.random.random(),
            np.random.random()
        ])

        # Generate sample direction
        halfway = importance_sample_ggx(xi, normal, roughness)
        light = 2.0 * np.dot(view, halfway) * halfway - view

        n_dot_l = max(light[1], 0.0)

        if n_dot_l > 0:
            n_dot_h = max(halfway[1], 0.0)
            v_dot_h = max(np.dot(view, halfway), 0.0)

            # Geometry term
            g = geometry_smith_ibl(n_dot_l, n_dot_v, roughness)

            # Fresnel term
            f = np.power(1.0 - v_dot_h, 5.0)

            # Accumulate
            g_vis = g * v_dot_h / (n_dot_h * n_dot_v)

            a += (1.0 - f) * g_vis
            b += f * g_vis

    return a / num_samples, b / num_samples

def importance_sample_ggx(xi, normal, roughness):
    """
    Importance sample GGX distribution.

    Args:
        xi: Random variables (u, v)
        normal: Surface normal
        roughness: Surface roughness

    Returns:
        numpy.ndarray: Sampled halfway vector
    """
    a = roughness * roughness

    phi = 2 * np.pi * xi[0]
    cos_theta = np.sqrt((1.0 - xi[1]) / (1.0 + (a*a - 1.0) * xi[1]))
    sin_theta = np.sqrt(1.0 - cos_theta * cos_theta)

    # Spherical to Cartesian
    h = np.array([
        np.cos(phi) * sin_theta,
        cos_theta,
        np.sin(phi) * sin_theta
    ])

    return h

def geometry_smith_ibl(n_dot_l, n_dot_v, roughness):
    """
    Geometry function for IBL.

    Args:
        n_dot_l, n_dot_v: Dot products
        roughness: Surface roughness

    Returns:
        float: Geometry term
    """
    a = roughness
    k = (a * a) / 2.0

    gl = n_dot_l / (n_dot_l * (1.0 - k) + k)
    gv = n_dot_v / (n_dot_v * (1.0 - k) + k)

    return gl * gv
```

## Complete PBR Workflow

Putting it all together:

```python
class PBRRenderer:
    """
    Complete PBR renderer with IBL.
    """
    def __init__(self, environment_map):
        """
        Args:
            environment_map: EnvironmentMap for IBL
        """
        self.env_map = environment_map
        self.brdf_lut = generate_brdf_lut()

    def render_surface(self, position, normal, view_dir, material, lights):
        """
        Render surface point using complete PBR.

        Args:
            position: Surface position
            normal: Surface normal
            view_dir: View direction
            material: PBR material (albedo, roughness, metallic)
            lights: Direct light sources

        Returns:
            numpy.ndarray: Surface color
        """
        # Direct lighting from analytic lights
        direct = np.zeros(3, dtype=np.float32)

        for light in lights:
            light_dir, _ = light.get_light_direction(position)
            light_color = light.get_intensity(position)

            # Evaluate Cook-Torrance BRDF
            cook_torrance = CookTorranceModel(
                material.albedo,
                material.roughness,
                material.metallic
            )

            direct += cook_torrance.evaluate(
                normal, light_dir, view_dir, light_color
            )

        # Indirect lighting from environment
        indirect = self.compute_ibl(normal, view_dir, material)

        # Combine
        return direct + indirect

    def compute_ibl(self, normal, view_dir, material):
        """
        Compute image-based lighting contribution.

        Args:
            normal: Surface normal
            view_dir: View direction
            material: PBR material

        Returns:
            numpy.ndarray: IBL contribution
        """
        n_dot_v = max(0.0, np.dot(normal, view_dir))

        # Diffuse IBL (irradiance map)
        irradiance = self.env_map.irradiance_map[0, 0]  # Simplified lookup
        kD = (1.0 - material.metallic) * material.albedo
        diffuse_ibl = kD * irradiance

        # Specular IBL (prefiltered environment)
        # Reflection direction
        reflect_dir = 2.0 * n_dot_v * normal - view_dir

        # Sample prefiltered environment at roughness level
        mip_level = int(material.roughness * (len(self.env_map.specular_maps) - 1))
        prefilt_color = self.env_map.specular_maps[mip_level][0, 0]  # Simplified

        # Sample BRDF LUT
        lut_coord = (
            int(n_dot_v * (self.brdf_lut.shape[1] - 1)),
            int(material.roughness * (self.brdf_lut.shape[0] - 1))
        )
        brdf_sample = self.brdf_lut[lut_coord[1], lut_coord[0]]

        # F0 for specular IBL
        f0 = material.albedo if material.metallic > 0.5 else np.array([0.04]*3)

        specular_ibl = prefilt_color * (f0 * brdf_sample[0] + brdf_sample[1])

        return diffuse_ibl + specular_ibl
```

## Tone Mapping and Gamma Correction

PBR works in HDR (high dynamic range). Final output requires tone mapping:

```python
def tone_map_reinhard(hdr_color):
    """
    Reinhard tone mapping operator.

    Args:
        hdr_color: HDR color (can be > 1.0)

    Returns:
        numpy.ndarray: LDR color [0, 1]
    """
    return hdr_color / (1.0 + hdr_color)

def tone_map_aces(hdr_color):
    """
    ACES filmic tone mapping.

    Used in many AAA games.

    Args:
        hdr_color: HDR color

    Returns:
        numpy.ndarray: LDR color
    """
    a = 2.51
    b = 0.03
    c = 2.43
    d = 0.59
    e = 0.14

    return np.clip((hdr_color * (a * hdr_color + b)) /
                   (hdr_color * (c * hdr_color + d) + e), 0, 1)

def gamma_correct(linear_color, gamma=2.2):
    """
    Apply gamma correction for sRGB display.

    Args:
        linear_color: Linear RGB color
        gamma: Gamma value (typically 2.2 for sRGB)

    Returns:
        numpy.ndarray: Gamma-corrected color
    """
    return np.power(linear_color, 1.0 / gamma)

def pbr_post_process(hdr_color):
    """
    Complete PBR post-processing pipeline.

    Args:
        hdr_color: HDR rendering result

    Returns:
        numpy.ndarray: Final display color
    """
    # Tone mapping
    ldr = tone_map_aces(hdr_color)

    # Gamma correction
    display = gamma_correct(ldr, gamma=2.2)

    return display
```

## Conclusion

Advanced shading techniques enable photorealistic rendering:

- **Microfacet theory** provides physical foundation for BRDFs
- **Cook-Torrance model** is the industry-standard PBR BRDF
- **Image-based lighting** provides realistic environment lighting
- **Split-sum approximation** makes IBL real-time feasible
- **Tone mapping** converts HDR to displayable range

Modern game engines (Unreal, Unity, Frostbite) all use these PBR techniques, providing consistent, realistic materials across different lighting conditions. Understanding these advanced methods is essential for high-quality real-time and offline rendering.

PBR represents the current state-of-the-art in real-time shading, though research continues into even more accurate and efficient techniques.
