# Illumination Basics

Illumination in computer graphics simulates how light interacts with surfaces to create realistic images. Understanding illumination fundamentals is crucial for rendering convincing 3D scenes, from simple shaded objects to photorealistic environments. The goal is to compute the color of each pixel based on how light sources, surface properties, and viewing position interact.

## The Rendering Equation

At the heart of illumination lies the **rendering equation**, introduced by James Kajiya in 1986. While we'll explore simplified models first, this equation describes how light energy is transferred in a scene:

```
L_o(p, ω_o) = L_e(p, ω_o) + ∫_Ω f_r(p, ω_i, ω_o) L_i(p, ω_i) (n · ω_i) dω_i
```

Where:
- `L_o(p, ω_o)` = outgoing light from point p in direction ω_o
- `L_e(p, ω_o)` = emitted light (if surface is a light source)
- `f_r(p, ω_i, ω_o)` = BRDF (Bidirectional Reflectance Distribution Function)
- `L_i(p, ω_i)` = incoming light from direction ω_i
- `n · ω_i` = cosine term (Lambert's law)

This integral sums contributions from all incoming light directions over the hemisphere Ω above point p. Most real-time rendering uses approximations of this equation.

## Local vs. Global Illumination

Illumination models fall into two categories:

**Local Illumination** (Direct Lighting)
- Considers only direct light from sources to surfaces
- No inter-reflection between surfaces
- Fast to compute, suitable for real-time graphics
- Examples: Phong, Blinn-Phong models

**Global Illumination** (Indirect Lighting)
- Accounts for light bouncing between surfaces
- Produces soft shadows, color bleeding, caustics
- Computationally expensive
- Examples: Ray tracing, radiosity, path tracing

```
Local Illumination:
Light Source → Surface → Eye
(Direct path only)

Global Illumination:
Light Source → Surface A → Surface B → Surface C → Eye
(Multiple bounces)
```

## The Three Components of Reflection

Most illumination models decompose surface reflection into three components:

### 1. Ambient Reflection

Represents indirect light scattered throughout the environment. This is a crude approximation of global illumination, providing a constant base illumination to prevent completely black shadows.

```
I_ambient = k_a × I_a
```

Where:
- `k_a` = ambient reflection coefficient (material property)
- `I_a` = ambient light intensity

Ambient light is independent of:
- Light source position
- Surface normal
- Viewing direction

### 2. Diffuse Reflection

Light scattered equally in all directions after hitting a rough, matte surface. Follows **Lambert's cosine law**: brightness depends on the angle between surface normal and light direction.

```
I_diffuse = k_d × I_l × max(0, n · l)
```

Where:
- `k_d` = diffuse reflection coefficient
- `I_l` = light source intensity
- `n` = surface normal (unit vector)
- `l` = light direction (unit vector)

Key properties:
- View-independent (looks same from any angle)
- Maximum when light perpendicular to surface (n · l = 1)
- Zero when light parallel or behind surface

### 3. Specular Reflection

Mirror-like reflection creating bright highlights. Models shiny surfaces like metal, plastic, or wet objects.

```
I_specular = k_s × I_l × max(0, r · v)^n_s
```

Where:
- `k_s` = specular reflection coefficient
- `r` = reflection direction
- `v` = view direction (unit vector)
- `n_s` = shininess exponent (controls highlight size)

The reflection vector is calculated as:

```
r = 2(n · l)n - l
```

## Light-Matter Interaction

When light hits a surface, several phenomena occur:

**Absorption**: Light energy converted to heat. Determines surface color—red objects absorb green/blue light, reflecting red.

**Reflection**: Light bounces off surface. Can be:
- **Specular**: Mirror-like, preserves incident direction
- **Diffuse**: Scattered in all directions
- **Glossy**: Between specular and diffuse

**Transmission**: Light passes through transparent/translucent materials, often with refraction.

**Subsurface Scattering**: Light penetrates surface, scatters internally, exits elsewhere. Important for materials like skin, wax, milk.

```python
# Conceptual representation of light interaction
def surface_interaction(incident_light, surface):
    absorbed = incident_light * surface.absorption
    reflected_diffuse = incident_light * surface.diffuse * lambert_factor
    reflected_specular = incident_light * surface.specular * specular_factor
    transmitted = incident_light * surface.transparency

    return reflected_diffuse + reflected_specular + transmitted
```

## The BRDF Concept

The **Bidirectional Reflectance Distribution Function** (BRDF) describes how light reflects off a surface. It defines the ratio of reflected radiance to incident irradiance for any pair of incoming/outgoing directions.

```
f_r(ω_i, ω_o) = dL_o(ω_o) / dE_i(ω_i)
```

Properties of valid BRDFs:
1. **Non-negative**: f_r ≥ 0 everywhere
2. **Reciprocity**: f_r(ω_i, ω_o) = f_r(ω_o, ω_i)
3. **Energy conservation**: Can't reflect more light than received

Common BRDF types:
- **Lambertian**: Constant diffuse reflection (k_d / π)
- **Phong**: Simple specular model
- **Cook-Torrance**: Physically-based, microfacet model
- **Ward**: Anisotropic reflection (brushed metal)

## Color in Illumination

Real illumination must handle color, represented as RGB triplets. Each component (red, green, blue) is computed separately:

```
I_red = k_a_red × I_a_red + k_d_red × I_l_red × (n · l) + k_s_red × I_l_red × (r · v)^n_s
I_green = k_a_green × I_a_green + k_d_green × I_l_green × (n · l) + k_s_green × I_l_green × (r · v)^n_s
I_blue = k_a_blue × I_a_blue + k_d_blue × I_l_blue × (n · l) + k_s_blue × I_l_blue × (r · v)^n_s

Final_Color = (I_red, I_green, I_blue)
```

Material colors (k_a, k_d, k_s) are typically RGB values between 0 and 1. Light colors (I_a, I_l) can exceed 1 for bright sources.

## Shading vs. Illumination

Important distinction:

**Illumination Model**: Defines how to compute light intensity at a point (e.g., Phong model)

**Shading Model**: Defines where to apply illumination calculations across a surface (e.g., flat shading, Gouraud shading, Phong shading)

We can combine different illumination and shading models. For example, Phong illumination with Gouraud shading computes Phong lighting at vertices and interpolates across faces.

## Key Takeaways

- Illumination simulates light-surface interaction to determine pixel colors
- The rendering equation provides theoretical foundation, but practical models use approximations
- Local illumination is fast but limited; global illumination is accurate but expensive
- Reflection decomposes into ambient, diffuse, and specular components
- BRDFs mathematically describe surface reflection properties
- Color requires per-channel computation
- Illumination models define "what to compute"; shading models define "where to compute"

Understanding these basics prepares you for exploring specific light sources, the Phong illumination model, and various shading techniques in subsequent sections.
