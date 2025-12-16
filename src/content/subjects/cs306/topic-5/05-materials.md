# Material Properties and BRDFs

## Introduction to Materials

Materials define how surfaces interact with light. In computer graphics, a material model describes the relationship between incoming and outgoing light at a surface point. Understanding materials is crucial for creating realistic or stylized appearances in rendered scenes.

Early graphics used simple material models (ambient/diffuse/specular coefficients), while modern renderers use physically-based materials that accurately simulate light-matter interaction based on real-world physics.

## Material Components

A material is typically defined by several properties:

```python
import numpy as np

class Material:
    """
    Basic material representation.
    """
    def __init__(self, name="default"):
        """
        Args:
            name: Material name for identification
        """
        self.name = name

        # Reflectance properties
        self.ambient = np.array([0.2, 0.2, 0.2])
        self.diffuse = np.array([0.8, 0.8, 0.8])
        self.specular = np.array([1.0, 1.0, 1.0])
        self.shininess = 32.0

        # Additional properties
        self.roughness = 0.5      # Surface roughness [0, 1]
        self.metallic = 0.0       # Metallic property [0, 1]
        self.transparency = 0.0   # Transparency [0, 1]
        self.ior = 1.5           # Index of refraction

        # Texture maps (optional)
        self.diffuse_map = None
        self.normal_map = None
        self.roughness_map = None
        self.metallic_map = None
```

### Surface Color

Surface color determines which wavelengths are absorbed vs. reflected:

```python
def apply_surface_color(incident_light, surface_color):
    """
    Apply surface color to incident light.

    Surface color acts as a filter - components are multiplied.

    Args:
        incident_light: Incoming light color (r, g, b)
        surface_color: Surface reflectance (r, g, b)

    Returns:
        numpy.ndarray: Reflected light color
    """
    # Component-wise multiplication
    return incident_light * surface_color

# Example: Red surface under white light
white_light = np.array([1.0, 1.0, 1.0])
red_surface = np.array([0.8, 0.1, 0.1])
reflected = apply_surface_color(white_light, red_surface)
# Result: [0.8, 0.1, 0.1] - mostly red reflected

# Example: Red surface under blue light
blue_light = np.array([0.0, 0.0, 1.0])
reflected = apply_surface_color(blue_light, red_surface)
# Result: [0.0, 0.0, 0.1] - almost black (red surface absorbs blue)
```

### Roughness and Glossiness

Roughness controls how diffuse vs. specular a surface appears:

- **Rough surfaces** (high roughness): Scatter light in many directions → diffuse appearance
- **Smooth surfaces** (low roughness): Reflect light coherently → mirror-like

```python
def roughness_to_shininess(roughness):
    """
    Convert roughness to Phong shininess exponent.

    Args:
        roughness: Surface roughness in [0, 1]
            0 = perfectly smooth (mirror)
            1 = completely rough (matte)

    Returns:
        float: Shininess exponent for Phong model
    """
    # Map roughness to shininess (inverse relationship)
    # Rough = 0.0 → shininess = 2048 (very shiny)
    # Rough = 1.0 → shininess = 1 (very dull)

    min_shininess = 1.0
    max_shininess = 2048.0

    # Inverse mapping with power to control falloff
    alpha = 1.0 - roughness
    return min_shininess + (max_shininess - min_shininess) * (alpha ** 2)
```

## BRDF: Bidirectional Reflectance Distribution Function

The BRDF is the fundamental mathematical description of how light reflects from a surface.

### Definition

The BRDF $f_r(\omega_i, \omega_o)$ relates incoming radiance to outgoing radiance:

$$L_o(\omega_o) = \int_{\Omega} f_r(\omega_i, \omega_o) \, L_i(\omega_i) \, (\mathbf{n} \cdot \omega_i) \, d\omega_i$$

Where:
- $L_o(\omega_o)$ = outgoing radiance in direction $\omega_o$
- $L_i(\omega_i)$ = incoming radiance from direction $\omega_i$
- $f_r(\omega_i, \omega_o)$ = BRDF
- $\mathbf{n} \cdot \omega_i$ = cosine term (Lambert's law)
- $\Omega$ = hemisphere above surface

### BRDF Properties

Valid BRDFs must satisfy:

**1. Non-negativity:**
$$f_r(\omega_i, \omega_o) \geq 0$$

**2. Helmholtz Reciprocity:**
$$f_r(\omega_i, \omega_o) = f_r(\omega_o, \omega_i)$$

**3. Energy Conservation:**
$$\forall \omega_i: \int_{\Omega} f_r(\omega_i, \omega_o) \, (\mathbf{n} \cdot \omega_o) \, d\omega_o \leq 1$$

```python
class BRDF:
    """Base class for BRDF implementations."""

    def evaluate(self, wi, wo, normal):
        """
        Evaluate BRDF for given directions.

        Args:
            wi: Incoming light direction (unit vector)
            wo: Outgoing view direction (unit vector)
            normal: Surface normal (unit vector)

        Returns:
            numpy.ndarray: BRDF value (r, g, b)
        """
        raise NotImplementedError("Subclass must implement evaluate()")

    def is_reciprocal(self, wi, wo, normal):
        """
        Test reciprocity: f(wi, wo) == f(wo, wi)

        Args:
            wi, wo, normal: Directions and normal

        Returns:
            bool: True if reciprocal (within tolerance)
        """
        f1 = self.evaluate(wi, wo, normal)
        f2 = self.evaluate(wo, wi, normal)

        return np.allclose(f1, f2, rtol=1e-5)
```

## Lambertian BRDF

The simplest BRDF models perfect diffuse (matte) reflection:

$$f_r(\omega_i, \omega_o) = \frac{\rho_d}{\pi}$$

Where $\rho_d$ is the diffuse albedo (surface color).

```python
class LambertianBRDF(BRDF):
    """
    Perfect diffuse (Lambertian) BRDF.

    Reflects light equally in all directions.
    """
    def __init__(self, albedo):
        """
        Args:
            albedo: Diffuse surface color (r, g, b) in [0, 1]
        """
        self.albedo = np.array(albedo, dtype=np.float32)

    def evaluate(self, wi, wo, normal):
        """
        Evaluate Lambertian BRDF.

        Result is constant (view-independent).

        Args:
            wi: Incoming direction (not used)
            wo: Outgoing direction (not used)
            normal: Surface normal (not used)

        Returns:
            numpy.ndarray: BRDF value
        """
        # Lambertian BRDF is constant
        # Divided by π for energy conservation
        return self.albedo / np.pi

def integrate_lambertian_brdf(brdf, normal):
    """
    Verify Lambertian BRDF energy conservation.

    For any incoming direction, integral over hemisphere should be ≤ 1.

    Args:
        brdf: LambertianBRDF instance
        normal: Surface normal

    Returns:
        float: Integrated reflectance (should be ≤ 1)
    """
    # For Lambertian BRDF:
    # ∫ (ρ/π) cos(θ) dω = ρ ∫ cos(θ) dω / π = ρ
    # (The integral ∫ cos(θ) dω over hemisphere = π)

    return np.mean(brdf.albedo)  # Should equal albedo
```

**Properties:**
- View-independent (same from all angles)
- Energy conserving (if albedo ≤ 1)
- Perfectly diffuse
- Good for matte surfaces: chalk, unfinished wood, fabric

## Phong BRDF

The classic Phong model as a BRDF:

$$f_r(\omega_i, \omega_o) = k_d \frac{1}{\pi} + k_s \frac{\alpha + 2}{2\pi} (\mathbf{r} \cdot \omega_o)^{\alpha}$$

Where $\mathbf{r}$ is the reflection of $\omega_i$ about the normal.

```python
class PhongBRDF(BRDF):
    """
    Phong BRDF with diffuse and specular components.
    """
    def __init__(self, diffuse, specular, shininess):
        """
        Args:
            diffuse: Diffuse color (r, g, b)
            specular: Specular color (r, g, b)
            shininess: Phong exponent
        """
        self.diffuse = np.array(diffuse, dtype=np.float32)
        self.specular = np.array(specular, dtype=np.float32)
        self.shininess = shininess

    def evaluate(self, wi, wo, normal):
        """
        Evaluate Phong BRDF.

        Args:
            wi: Incoming light direction
            wo: Outgoing view direction
            normal: Surface normal

        Returns:
            numpy.ndarray: BRDF value
        """
        # Diffuse component (Lambertian)
        diffuse_brdf = self.diffuse / np.pi

        # Specular component
        # Calculate reflection direction
        n_dot_wi = np.dot(normal, wi)
        reflect = 2.0 * n_dot_wi * normal - wi

        # Specular term
        r_dot_wo = max(0.0, np.dot(reflect, wo))

        # Normalized Phong specular
        specular_brdf = (
            self.specular *
            ((self.shininess + 2) / (2 * np.pi)) *
            (r_dot_wo ** self.shininess)
        )

        return diffuse_brdf + specular_brdf
```

## Blinn-Phong BRDF

Modified Phong using halfway vector:

$$f_r(\omega_i, \omega_o) = k_d \frac{1}{\pi} + k_s \frac{\alpha + 8}{8\pi} (\mathbf{n} \cdot \mathbf{h})^{\alpha}$$

Where $\mathbf{h} = \frac{\omega_i + \omega_o}{|\omega_i + \omega_o|}$ is the halfway vector.

```python
class BlinnPhongBRDF(BRDF):
    """
    Blinn-Phong BRDF using halfway vector.
    """
    def __init__(self, diffuse, specular, shininess):
        self.diffuse = np.array(diffuse, dtype=np.float32)
        self.specular = np.array(specular, dtype=np.float32)
        self.shininess = shininess

    def evaluate(self, wi, wo, normal):
        """
        Evaluate Blinn-Phong BRDF.

        Args:
            wi: Incoming direction
            wo: Outgoing direction
            normal: Surface normal

        Returns:
            numpy.ndarray: BRDF value
        """
        # Diffuse
        diffuse_brdf = self.diffuse / np.pi

        # Calculate halfway vector
        halfway = wi + wo
        norm = np.linalg.norm(halfway)

        if norm > 1e-6:
            halfway /= norm
        else:
            return diffuse_brdf  # No specular if degenerate

        # Specular using halfway vector
        n_dot_h = max(0.0, np.dot(normal, halfway))

        specular_brdf = (
            self.specular *
            ((self.shininess + 8) / (8 * np.pi)) *
            (n_dot_h ** self.shininess)
        )

        return diffuse_brdf + specular_brdf
```

## Cook-Torrance BRDF

The Cook-Torrance model is a microfacet-based physically-based BRDF:

$$f_r(\omega_i, \omega_o) = \frac{DFG}{4(\mathbf{n} \cdot \omega_i)(\mathbf{n} \cdot \omega_o)}$$

Where:
- $D$ = Normal Distribution Function (microfacet orientation)
- $F$ = Fresnel term (reflectance at angle)
- $G$ = Geometry/shadowing term

```python
class CookTorranceBRDF(BRDF):
    """
    Cook-Torrance microfacet BRDF.

    Physically-based model used in PBR rendering.
    """
    def __init__(self, albedo, roughness, metallic, f0=0.04):
        """
        Args:
            albedo: Base surface color
            roughness: Surface roughness [0, 1]
            metallic: Metalness [0, 1]
            f0: Base reflectivity (typically 0.04 for dielectrics)
        """
        self.albedo = np.array(albedo, dtype=np.float32)
        self.roughness = max(0.01, roughness)  # Avoid division by zero
        self.metallic = metallic

        # Base reflectivity (Fresnel at normal incidence)
        if isinstance(f0, (int, float)):
            self.f0 = np.array([f0, f0, f0], dtype=np.float32)
        else:
            self.f0 = np.array(f0, dtype=np.float32)

        # Metals use albedo as f0
        if metallic > 0.5:
            self.f0 = albedo

    def evaluate(self, wi, wo, normal):
        """
        Evaluate Cook-Torrance BRDF.

        Args:
            wi: Incoming direction
            wo: Outgoing direction
            normal: Surface normal

        Returns:
            numpy.ndarray: BRDF value
        """
        # Calculate halfway vector
        halfway = wi + wo
        norm_h = np.linalg.norm(halfway)

        if norm_h < 1e-6:
            return np.zeros(3)

        halfway /= norm_h

        # Dot products
        n_dot_wi = max(0.0, np.dot(normal, wi))
        n_dot_wo = max(0.0, np.dot(normal, wo))
        n_dot_h = max(0.0, np.dot(normal, halfway))
        wo_dot_h = max(0.0, np.dot(wo, halfway))

        if n_dot_wi < 1e-6 or n_dot_wo < 1e-6:
            return np.zeros(3)

        # Normal Distribution Function (GGX/Trowbridge-Reitz)
        D = self.distribution_ggx(n_dot_h)

        # Fresnel term (Schlick approximation)
        F = self.fresnel_schlick(wo_dot_h)

        # Geometry term (Smith)
        G = self.geometry_smith(n_dot_wi, n_dot_wo)

        # Cook-Torrance specular
        numerator = D * F * G
        denominator = 4.0 * n_dot_wi * n_dot_wo
        specular = numerator / max(denominator, 1e-6)

        # Diffuse component (Lambertian)
        # Metals have no diffuse
        kd = (1.0 - self.metallic) * (1.0 - F)
        diffuse = kd * self.albedo / np.pi

        return diffuse + specular

    def distribution_ggx(self, n_dot_h):
        """
        GGX/Trowbridge-Reitz normal distribution function.

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
        Schlick approximation of Fresnel term.

        Args:
            cos_theta: Cosine of angle between view and halfway

        Returns:
            numpy.ndarray: Fresnel reflectance
        """
        return self.f0 + (1.0 - self.f0) * ((1.0 - cos_theta) ** 5)

    def geometry_smith(self, n_dot_wi, n_dot_wo):
        """
        Smith geometry/shadowing term.

        Args:
            n_dot_wi: Dot product normal and incoming
            n_dot_wo: Dot product normal and outgoing

        Returns:
            float: Geometry term
        """
        ggx1 = self.geometry_schlick_ggx(n_dot_wo)
        ggx2 = self.geometry_schlick_ggx(n_dot_wi)

        return ggx1 * ggx2

    def geometry_schlick_ggx(self, n_dot_v):
        """
        Schlick-GGX geometry term.

        Args:
            n_dot_v: Dot product of normal and direction

        Returns:
            float: Geometry value
        """
        r = self.roughness + 1.0
        k = (r * r) / 8.0

        numerator = n_dot_v
        denominator = n_dot_v * (1.0 - k) + k

        return numerator / max(denominator, 1e-6)
```

## Material Examples

```python
def create_material_library():
    """
    Create library of common materials using different BRDFs.

    Returns:
        dict: Material name -> BRDF mapping
    """
    materials = {}

    # Matte surfaces (Lambertian)
    materials['chalk'] = LambertianBRDF(albedo=[0.9, 0.9, 0.9])
    materials['red_brick'] = LambertianBRDF(albedo=[0.7, 0.2, 0.1])

    # Plastic (Phong/Blinn-Phong)
    materials['red_plastic'] = BlinnPhongBRDF(
        diffuse=[0.8, 0.1, 0.1],
        specular=[1.0, 1.0, 1.0],
        shininess=64
    )

    # Metals (Cook-Torrance PBR)
    materials['gold'] = CookTorranceBRDF(
        albedo=[1.0, 0.765, 0.336],
        roughness=0.2,
        metallic=1.0
    )

    materials['rough_iron'] = CookTorranceBRDF(
        albedo=[0.56, 0.57, 0.58],
        roughness=0.6,
        metallic=1.0
    )

    materials['polished_copper'] = CookTorranceBRDF(
        albedo=[0.95, 0.64, 0.54],
        roughness=0.1,
        metallic=1.0
    )

    # Dielectrics (non-metals)
    materials['wood'] = CookTorranceBRDF(
        albedo=[0.6, 0.4, 0.2],
        roughness=0.8,
        metallic=0.0,
        f0=0.04
    )

    materials['glass'] = CookTorranceBRDF(
        albedo=[0.95, 0.95, 0.95],
        roughness=0.0,
        metallic=0.0,
        f0=0.04
    )

    return materials
```

## Texture Mapping

Textures modulate material properties spatially:

```python
def sample_texture(texture, u, v):
    """
    Sample 2D texture at UV coordinates.

    Args:
        texture: 2D texture array (height, width, channels)
        u, v: Texture coordinates in [0, 1]

    Returns:
        numpy.ndarray: Sampled color
    """
    height, width = texture.shape[:2]

    # Wrap coordinates to [0, 1]
    u = u % 1.0
    v = v % 1.0

    # Map to pixel coordinates
    x = int(u * width) % width
    y = int(v * height) % height

    return texture[y, x]

class TexturedMaterial:
    """Material with texture maps."""

    def __init__(self, base_brdf):
        """
        Args:
            base_brdf: Base BRDF to modulate
        """
        self.base_brdf = base_brdf
        self.albedo_map = None
        self.roughness_map = None
        self.normal_map = None

    def get_brdf(self, uv):
        """
        Get BRDF at texture coordinates.

        Args:
            uv: Texture coordinates (u, v)

        Returns:
            BRDF: BRDF with texture-modulated properties
        """
        brdf = self.base_brdf

        # Modulate albedo from texture
        if self.albedo_map is not None:
            albedo = sample_texture(self.albedo_map, uv[0], uv[1])
            brdf.albedo = albedo[:3]  # RGB only

        # Modulate roughness
        if self.roughness_map is not None:
            roughness = sample_texture(self.roughness_map, uv[0], uv[1])
            brdf.roughness = roughness[0]  # Grayscale

        return brdf
```

## Conclusion

Understanding materials and BRDFs is fundamental to realistic rendering:

- **Materials** define surface appearance through reflectance properties
- **BRDFs** mathematically describe light reflection
- **Simple BRDFs** (Lambertian, Phong) are fast but limited
- **Physical BRDFs** (Cook-Torrance) provide realism but higher cost
- **Texture maps** add spatial variation to material properties

Modern rendering increasingly uses physically-based materials (PBR) with Cook-Torrance-style BRDFs, providing consistent, realistic results. The next section explores how to implement these in shader programs.
