# Texture Filtering

## Introduction to Texture Filtering

Texture filtering is the process of determining what color to return when sampling a texture at a given UV coordinate. Since UV coordinates are continuous values but textures are discrete grids of pixels (texels), we need interpolation methods to produce smooth, high-quality results.

Without proper filtering, textured surfaces exhibit severe aliasing artifacts including pixelation, jagged edges, and temporal flickering (especially in animated scenes). Texture filtering is one of the most important quality versus performance tradeoffs in real-time graphics.

## The Aliasing Problem

Aliasing occurs when we undersample a signal. In texture mapping, this happens in two scenarios:

**Magnification**: When a texel covers multiple pixels on screen (viewing texture up close)

**Minification**: When multiple texels map to a single pixel (viewing texture from far away)

Each scenario requires different filtering approaches.

## Nearest Neighbor Filtering

The simplest filtering method: use the color of the closest texel.

### Algorithm

For UV coordinates (u, v):
1. Convert to texel coordinates: `x = u × width`, `y = v × height`
2. Round to nearest integer: `x_int = round(x)`, `y_int = round(y)`
3. Return `texture[y_int][x_int]`

```python
import numpy as np

class NearestNeighborFilter:
    """Nearest neighbor texture filtering."""

    @staticmethod
    def sample(texture, u, v):
        """
        Sample texture using nearest neighbor filtering.

        Args:
            texture: Image array of shape (height, width, channels)
            u: U coordinate [0, 1]
            v: V coordinate [0, 1]

        Returns:
            Color value at nearest texel
        """
        height, width = texture.shape[:2]

        # Convert to texel coordinates
        x = u * (width - 1)
        y = v * (height - 1)

        # Round to nearest integer
        x_int = int(round(x))
        y_int = int(round(y))

        # Clamp to valid range
        x_int = max(0, min(width - 1, x_int))
        y_int = max(0, min(height - 1, y_int))

        # Return texel color
        return texture[y_int, x_int]
```

### Characteristics

**Advantages**:
- Extremely fast (no arithmetic operations beyond rounding)
- Preserves sharp edges in the texture
- Low memory bandwidth

**Disadvantages**:
- Severe aliasing artifacts
- Pixelated appearance when magnified
- Temporal flickering when animated
- Moiré patterns when minified

**Use cases**: Pixel art, retro graphics, or when performance is critical and quality is not

## Bilinear Filtering

Bilinear filtering interpolates between the four nearest texels using linear interpolation in both directions.

### Algorithm

For UV coordinates (u, v):
1. Convert to texel coordinates: `x = u × (width - 1)`, `y = v × (height - 1)`
2. Get integer and fractional parts: `x0 = floor(x)`, `fx = x - x0`
3. Sample four corners: `c00, c10, c01, c11`
4. Interpolate horizontally: `c0 = lerp(c00, c10, fx)`, `c1 = lerp(c01, c11, fx)`
5. Interpolate vertically: `result = lerp(c0, c1, fy)`

```python
def lerp(a, b, t):
    """
    Linear interpolation between a and b.

    Args:
        a: Start value
        b: End value
        t: Interpolation parameter [0, 1]

    Returns:
        Interpolated value
    """
    return a * (1 - t) + b * t

class BilinearFilter:
    """Bilinear texture filtering."""

    @staticmethod
    def sample(texture, u, v):
        """
        Sample texture using bilinear filtering.

        Args:
            texture: Image array of shape (height, width, channels)
            u: U coordinate [0, 1]
            v: V coordinate [0, 1]

        Returns:
            Bilinearly interpolated color
        """
        height, width = texture.shape[:2]

        # Convert to continuous texel coordinates
        x = u * (width - 1)
        y = v * (height - 1)

        # Get integer and fractional parts
        x0 = int(np.floor(x))
        y0 = int(np.floor(y))
        x1 = min(x0 + 1, width - 1)
        y1 = min(y0 + 1, height - 1)

        fx = x - x0
        fy = y - y0

        # Sample four corners
        c00 = texture[y0, x0]  # Top-left
        c10 = texture[y0, x1]  # Top-right
        c01 = texture[y1, x0]  # Bottom-left
        c11 = texture[y1, x1]  # Bottom-right

        # Horizontal interpolation
        c0 = lerp(c00, c10, fx)
        c1 = lerp(c01, c11, fx)

        # Vertical interpolation
        result = lerp(c0, c1, fy)

        return result
```

### Mathematical Formulation

Given four texel values at integer coordinates:
- `T(x₀, y₀)` at position (x₀, y₀)
- `T(x₁, y₀)` at position (x₁, y₀)
- `T(x₀, y₁)` at position (x₀, y₁)
- `T(x₁, y₁)` at position (x₁, y₁)

The bilinearly interpolated value at (x, y) where `x₀ ≤ x ≤ x₁` and `y₀ ≤ y ≤ y₁`:

```
fx = (x - x₀) / (x₁ - x₀)
fy = (y - y₀) / (y₁ - y₀)

T(x, y) = (1 - fx)(1 - fy)T(x₀, y₀) +
          fx(1 - fy)T(x₁, y₀) +
          (1 - fx)fy T(x₀, y₁) +
          fx·fy·T(x₁, y₁)
```

### Characteristics

**Advantages**:
- Smooth results with no pixelation
- Good quality for magnification
- Still relatively fast (4 texture reads, 3 lerps)

**Disadvantages**:
- Blurring when magnified
- Insufficient for minification (still exhibits aliasing)
- 4× memory bandwidth vs nearest neighbor

**Use cases**: Standard filtering for most real-time applications

## Trilinear Filtering

Trilinear filtering extends bilinear filtering to work with mipmaps (pre-filtered texture LOD levels). It performs bilinear filtering on two mipmap levels and linearly interpolates between them.

### Mipmap Level Selection

First, we need to determine which mipmap level(s) to sample:

```python
def calculate_mipmap_level(du_dx, du_dy, dv_dx, dv_dy, texture_width, texture_height):
    """
    Calculate appropriate mipmap level based on texture coordinate derivatives.

    Args:
        du_dx, du_dy: Derivatives of u with respect to screen x and y
        dv_dx, dv_dy: Derivatives of v with respect to screen x and y
        texture_width: Texture width in pixels
        texture_height: Texture height in pixels

    Returns:
        Mipmap level (0 = full resolution)
    """
    # Calculate texel footprint in x direction
    dx_texels = np.sqrt((du_dx * texture_width)**2 + (dv_dx * texture_height)**2)

    # Calculate texel footprint in y direction
    dy_texels = np.sqrt((du_dy * texture_width)**2 + (dv_dy * texture_height)**2)

    # Use maximum footprint (conservative)
    max_footprint = max(dx_texels, dy_texels)

    # Mipmap level is log2 of footprint
    if max_footprint <= 1.0:
        return 0.0
    else:
        return np.log2(max_footprint)
```

### Trilinear Algorithm

```python
class TrilinearFilter:
    """Trilinear texture filtering with mipmaps."""

    def __init__(self, mipmaps):
        """
        Initialize with mipmap chain.

        Args:
            mipmaps: List of texture images at different resolutions
                    [full res, half res, quarter res, ...]
        """
        self.mipmaps = mipmaps
        self.num_levels = len(mipmaps)

    def sample(self, u, v, mipmap_level):
        """
        Sample texture using trilinear filtering.

        Args:
            u: U coordinate [0, 1]
            v: V coordinate [0, 1]
            mipmap_level: Continuous mipmap level

        Returns:
            Trilinearly filtered color
        """
        # Clamp mipmap level to valid range
        mipmap_level = max(0.0, min(self.num_levels - 1, mipmap_level))

        # Get integer and fractional parts of mipmap level
        level0 = int(np.floor(mipmap_level))
        level1 = min(level0 + 1, self.num_levels - 1)
        f_level = mipmap_level - level0

        # Bilinear sample from both levels
        color0 = BilinearFilter.sample(self.mipmaps[level0], u, v)
        color1 = BilinearFilter.sample(self.mipmaps[level1], u, v)

        # Linear interpolation between mipmap levels
        result = lerp(color0, color1, f_level)

        return result
```

### Characteristics

**Advantages**:
- Good quality for both magnification and minification
- Reduces aliasing artifacts dramatically
- Smooth transitions as viewing distance changes

**Disadvantages**:
- 8 texture reads (vs 4 for bilinear)
- 33% more memory for mipmap chain
- Still has some aliasing on surfaces at oblique angles

**Use cases**: Standard for modern 3D games and applications

## Anisotropic Filtering

Anisotropic filtering addresses a key limitation of trilinear filtering: it assumes the texel footprint is roughly square. When viewing surfaces at oblique angles, the footprint becomes elongated, and isotropic filters blur excessively.

### The Anisotropy Problem

When a surface is viewed at a steep angle, a pixel's footprint in texture space becomes elongated (anisotropic) rather than square (isotropic). Trilinear filtering uses a square filter that's too large in one direction, causing blur.

### Anisotropic Algorithm (Simplified)

```python
class AnisotropicFilter:
    """Anisotropic texture filtering."""

    def __init__(self, mipmaps, max_anisotropy=16):
        """
        Initialize anisotropic filter.

        Args:
            mipmaps: Mipmap chain
            max_anisotropy: Maximum anisotropy ratio (typically 2, 4, 8, or 16)
        """
        self.mipmaps = mipmaps
        self.max_anisotropy = max_anisotropy

    def sample(self, u, v, du_dx, du_dy, dv_dx, dv_dy):
        """
        Sample texture using anisotropic filtering.

        Args:
            u, v: Texture coordinates
            du_dx, du_dy: U derivatives with respect to screen coordinates
            dv_dx, dv_dy: V derivatives with respect to screen coordinates

        Returns:
            Anisotropically filtered color
        """
        # Calculate texture coordinate derivatives
        delta_u_x = du_dx
        delta_u_y = du_dy
        delta_v_x = dv_dx
        delta_v_y = dv_dy

        # Calculate major and minor axes of the elliptical footprint
        length_u = np.sqrt(delta_u_x**2 + delta_v_x**2)
        length_v = np.sqrt(delta_u_y**2 + delta_v_y**2)

        # Determine major and minor axes
        major_length = max(length_u, length_v)
        minor_length = min(length_u, length_v)

        # Calculate anisotropy ratio
        if minor_length > 0:
            aniso_ratio = major_length / minor_length
        else:
            aniso_ratio = 1.0

        # Clamp to maximum anisotropy
        aniso_ratio = min(aniso_ratio, self.max_anisotropy)

        # Determine mipmap level based on minor axis
        mipmap_level = np.log2(max(1.0, minor_length))

        # Number of samples along major axis
        num_samples = int(np.ceil(aniso_ratio))

        # Direction of major axis
        if length_u > length_v:
            delta_u = delta_u_x / num_samples
            delta_v = delta_v_x / num_samples
        else:
            delta_u = delta_u_y / num_samples
            delta_v = delta_v_y / num_samples

        # Accumulate samples along major axis
        color = np.zeros_like(self.mipmaps[0][0, 0])
        offset = -(num_samples - 1) / 2.0

        for i in range(num_samples):
            sample_u = u + (offset + i) * delta_u
            sample_v = v + (offset + i) * delta_v

            # Trilinear sample at this position
            trilinear = TrilinearFilter(self.mipmaps)
            sample_color = trilinear.sample(sample_u, sample_v, mipmap_level)
            color += sample_color

        # Average the samples
        color /= num_samples

        return color
```

### Characteristics

**Advantages**:
- Significantly sharper textures on angled surfaces
- Reduces blur while maintaining anti-aliasing
- Noticeable quality improvement in 3D environments

**Disadvantages**:
- Much more expensive (2-16× samples vs trilinear)
- Higher memory bandwidth requirements
- Diminishing returns beyond 8× or 16×

**Use cases**: High-quality rendering where performance allows

## Filtering Comparison

```python
def compare_filters(texture, u, v, derivatives):
    """
    Compare different filtering methods on the same coordinates.

    Args:
        texture: Original texture
        u, v: Sample coordinates
        derivatives: Texture coordinate derivatives

    Returns:
        Dictionary of results from each filter
    """
    results = {}

    # Nearest neighbor
    results['nearest'] = NearestNeighborFilter.sample(texture, u, v)

    # Bilinear
    results['bilinear'] = BilinearFilter.sample(texture, u, v)

    # Trilinear (requires mipmaps)
    mipmaps = generate_mipmaps(texture)
    du_dx, du_dy, dv_dx, dv_dy = derivatives
    level = calculate_mipmap_level(du_dx, du_dy, dv_dx, dv_dy,
                                   texture.shape[1], texture.shape[0])
    trilinear = TrilinearFilter(mipmaps)
    results['trilinear'] = trilinear.sample(u, v, level)

    # Anisotropic
    aniso = AnisotropicFilter(mipmaps, max_anisotropy=8)
    results['anisotropic'] = aniso.sample(u, v, du_dx, du_dy, dv_dx, dv_dy)

    return results
```

## Performance Considerations

### Memory Bandwidth

Texture filtering is often memory bandwidth limited:

- **Nearest**: 1 texel read per pixel
- **Bilinear**: 4 texel reads per pixel
- **Trilinear**: 8 texel reads per pixel
- **Anisotropic 8×**: up to 64 texel reads per pixel

### Cache Coherency

Modern GPUs optimize texture access through:
- **Texture cache**: Small, fast cache for recently accessed texels
- **Prefetching**: Predictive loading of nearby texels
- **Compression**: On-the-fly texture decompression (BC, ASTC, etc.)

### Quality vs Performance Tradeoffs

```python
class FilterQualitySettings:
    """Configure filtering quality for performance tuning."""

    # Performance tier definitions
    LOW = {
        'mag_filter': 'nearest',
        'min_filter': 'bilinear',
        'mipmap': True,
        'anisotropy': 1
    }

    MEDIUM = {
        'mag_filter': 'bilinear',
        'min_filter': 'trilinear',
        'mipmap': True,
        'anisotropy': 2
    }

    HIGH = {
        'mag_filter': 'bilinear',
        'min_filter': 'trilinear',
        'mipmap': True,
        'anisotropy': 8
    }

    ULTRA = {
        'mag_filter': 'bilinear',
        'min_filter': 'trilinear',
        'mipmap': True,
        'anisotropy': 16
    }
```

## Special Filtering Cases

### Normal Map Filtering

Normal maps should generally use **renormalized filtering** because averaging normals can change their length:

```python
def sample_normal_map(normal_texture, u, v):
    """
    Sample normal map with renormalization.

    Args:
        normal_texture: Normal map texture
        u, v: Texture coordinates

    Returns:
        Normalized normal vector
    """
    # Bilinear sample
    normal_raw = BilinearFilter.sample(normal_texture, u, v)

    # Convert from [0,1] to [-1,1]
    normal = normal_raw * 2.0 - 1.0

    # Renormalize (bilinear interpolation doesn't preserve length)
    length = np.linalg.norm(normal)
    if length > 0:
        normal = normal / length

    return normal
```

### Shadow Map Filtering

Shadow maps require special filtering to avoid artifacts:
- **PCF (Percentage Closer Filtering)**: Filter depth comparison results, not depth values
- **VSM (Variance Shadow Maps)**: Store depth and depth² for filtering

## Conclusion

Texture filtering is a critical component of texture mapping that dramatically affects both visual quality and performance. Understanding the tradeoffs between different filtering methods allows graphics programmers to make informed decisions about quality settings and optimize for different hardware capabilities. Modern GPUs implement these filtering modes in hardware, but the fundamental algorithms remain the same.
