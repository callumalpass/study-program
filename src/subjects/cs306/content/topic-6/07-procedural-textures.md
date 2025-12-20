# Procedural Textures

## Introduction to Procedural Textures

Procedural textures are generated algorithmically at runtime rather than loaded from image files. Instead of storing pixel data, we store mathematical functions that compute color, pattern, or surface properties based on position. This approach offers several advantages: infinite resolution, parametric control, small memory footprint, and the absence of UV mapping seams.

Procedural texturing has been used since the early days of computer graphics, with Ken Perlin's noise function (developed in 1983 for the movie "Tron") being one of the most influential contributions to the field. Today, procedural textures are essential tools in games, visual effects, and generative art.

## Advantages and Disadvantages

### Advantages

**Memory Efficiency**: A few kilobytes of code versus megabytes of image data

**Resolution Independence**: No pixelation at any zoom level

**Parametric Control**: Easy to vary appearance through parameters

**No UV Seams**: Continuous 3D textures eliminate seams

**Animation**: Parameters can be animated for dynamic effects

**Compression**: Ideal for procedural generation and streaming

### Disadvantages

**Computation Cost**: Must be evaluated per pixel (can be GPU-intensive)

**Artistic Control**: Harder to achieve specific artistic looks

**Unpredictability**: Small parameter changes can have large effects

**Limited Detail**: Hard to match the complexity of photographic textures

## Basic Procedural Patterns

### Checkerboard Pattern

The simplest procedural texture:

```python
import numpy as np

def checkerboard(position, scale=1.0):
    """
    Generate checkerboard pattern.

    Args:
        position: 3D or 2D position
        scale: Size of checker squares

    Returns:
        0 or 1 (black or white)
    """
    # Scale position
    p = position * scale

    # Floor and sum coordinates
    checker = np.floor(p[0]) + np.floor(p[1])

    # If we have a 3D position
    if len(p) > 2:
        checker += np.floor(p[2])

    # Odd or even
    return int(checker) % 2

def checkerboard_smooth(position, scale=1.0, smoothness=0.05):
    """
    Checkerboard with smooth transitions.

    Args:
        position: 3D or 2D position
        scale: Size of checker squares
        smoothness: Transition width

    Returns:
        Value in [0, 1]
    """
    p = position * scale

    # Distance to nearest integer
    frac_x = abs(p[0] - np.floor(p[0] + 0.5))
    frac_y = abs(p[1] - np.floor(p[1] + 0.5))

    # Checker value
    checker = checkerboard(position, scale)

    # Smooth transition at edges
    edge_dist = min(frac_x, frac_y)
    smooth_factor = smoothstep(smoothness, 0.5, edge_dist)

    return checker * smooth_factor + (1 - checker) * (1 - smooth_factor)

def smoothstep(edge0, edge1, x):
    """Smooth interpolation function."""
    t = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)
```

### Stripe Pattern

```python
def stripes(position, frequency=1.0, direction=np.array([1, 0, 0])):
    """
    Generate stripe pattern.

    Args:
        position: 3D position
        frequency: Number of stripes per unit
        direction: Stripe direction (normalized)

    Returns:
        Value in [0, 1]
    """
    # Project position onto direction
    projection = np.dot(position, direction)

    # Create stripes using sine wave
    value = np.sin(projection * frequency * 2 * np.pi)

    # Map from [-1, 1] to [0, 1]
    return (value + 1.0) * 0.5
```

### Grid Pattern

```python
def grid(position, scale=1.0, thickness=0.05):
    """
    Generate grid pattern.

    Args:
        position: 2D or 3D position
        scale: Grid cell size
        thickness: Line thickness

    Returns:
        Value in [0, 1] (1 = line, 0 = background)
    """
    p = position * scale

    # Distance to nearest grid line
    frac_x = abs(p[0] - np.round(p[0]))
    frac_y = abs(p[1] - np.round(p[1]))

    # Check if we're close to a grid line
    dist = min(frac_x, frac_y)

    return 1.0 if dist < thickness else 0.0
```

## Perlin Noise

Perlin noise is a gradient noise function that produces natural-looking, continuous random patterns. It's the foundation of most procedural texture generation.

### Classic Perlin Noise Implementation

```python
class PerlinNoise:
    """Implementation of Perlin noise."""

    def __init__(self, seed=0):
        """Initialize with optional seed."""
        np.random.seed(seed)

        # Permutation table
        self.p = np.arange(256, dtype=int)
        np.random.shuffle(self.p)
        self.p = np.concatenate([self.p, self.p])  # Repeat for overflow

    def fade(self, t):
        """Fade function: 6t^5 - 15t^4 + 10t^3"""
        return t * t * t * (t * (t * 6 - 15) + 10)

    def lerp(self, t, a, b):
        """Linear interpolation."""
        return a + t * (b - a)

    def grad(self, hash_value, x, y, z):
        """Gradient function."""
        # Convert low 4 bits of hash into 12 gradient directions
        h = hash_value & 15
        u = x if h < 8 else y
        v = y if h < 4 else (x if h == 12 or h == 14 else z)
        return (u if (h & 1) == 0 else -u) + (v if (h & 2) == 0 else -v)

    def noise(self, x, y, z):
        """
        3D Perlin noise.

        Args:
            x, y, z: 3D coordinates

        Returns:
            Noise value in approximately [-1, 1]
        """
        # Find unit cube that contains point
        X = int(np.floor(x)) & 255
        Y = int(np.floor(y)) & 255
        Z = int(np.floor(z)) & 255

        # Find relative position in cube
        x -= np.floor(x)
        y -= np.floor(y)
        z -= np.floor(z)

        # Compute fade curves
        u = self.fade(x)
        v = self.fade(y)
        w = self.fade(z)

        # Hash coordinates of cube corners
        A = self.p[X] + Y
        AA = self.p[A] + Z
        AB = self.p[A + 1] + Z
        B = self.p[X + 1] + Y
        BA = self.p[B] + Z
        BB = self.p[B + 1] + Z

        # Blend results from 8 corners
        res = self.lerp(w,
            self.lerp(v,
                self.lerp(u,
                    self.grad(self.p[AA], x, y, z),
                    self.grad(self.p[BA], x - 1, y, z)),
                self.lerp(u,
                    self.grad(self.p[AB], x, y - 1, z),
                    self.grad(self.p[BB], x - 1, y - 1, z))),
            self.lerp(v,
                self.lerp(u,
                    self.grad(self.p[AA + 1], x, y, z - 1),
                    self.grad(self.p[BA + 1], x - 1, y, z - 1)),
                self.lerp(u,
                    self.grad(self.p[AB + 1], x, y - 1, z - 1),
                    self.grad(self.p[BB + 1], x - 1, y - 1, z - 1))))

        return res
```

### Fractal Brownian Motion (fBm)

Combining multiple octaves of noise creates more complex, natural patterns:

```python
def fbm(position, noise_func, octaves=6, persistence=0.5, lacunarity=2.0):
    """
    Fractal Brownian Motion using noise function.

    Args:
        position: 3D position
        noise_func: Noise function to use
        octaves: Number of noise octaves to combine
        persistence: Amplitude decay per octave (typically 0.5)
        lacunarity: Frequency increase per octave (typically 2.0)

    Returns:
        Combined noise value
    """
    total = 0.0
    amplitude = 1.0
    frequency = 1.0
    max_value = 0.0

    for i in range(octaves):
        # Sample noise at current frequency
        sample_pos = position * frequency
        noise_value = noise_func(sample_pos[0], sample_pos[1], sample_pos[2])

        # Accumulate
        total += noise_value * amplitude

        # Track maximum possible value for normalization
        max_value += amplitude

        # Update for next octave
        amplitude *= persistence
        frequency *= lacunarity

    # Normalize to [-1, 1]
    return total / max_value

# Example usage
perlin = PerlinNoise(seed=42)
position = np.array([1.5, 2.3, 0.7])
noise_value = fbm(position, perlin.noise, octaves=6)
```

### Applications of Perlin Noise

```python
def marble_texture(position, scale=1.0):
    """
    Marble-like texture using Perlin noise.

    Args:
        position: 3D position
        scale: Texture scale

    Returns:
        Color value
    """
    perlin = PerlinNoise()
    p = position * scale

    # Create marble veining using sine and noise
    noise_val = fbm(p, perlin.noise, octaves=4)
    marble = np.sin(p[0] + 3.0 * noise_val)

    # Map to [0, 1] and enhance contrast
    marble = (marble + 1.0) * 0.5
    marble = marble ** 2  # Enhance contrast

    return marble

def wood_texture(position, scale=1.0, ring_frequency=5.0):
    """
    Wood grain texture.

    Args:
        position: 3D position
        scale: Texture scale
        ring_frequency: Frequency of growth rings

    Returns:
        Color value
    """
    perlin = PerlinNoise()
    p = position * scale

    # Distance from center (cylinder axis along Z)
    radius = np.sqrt(p[0]**2 + p[1]**2)

    # Add noise to radius for irregular rings
    noise_val = fbm(p, perlin.noise, octaves=3)
    disturbed_radius = radius + noise_val * 0.5

    # Create rings
    wood = np.sin(disturbed_radius * ring_frequency)
    wood = (wood + 1.0) * 0.5

    # Enhance contrast for visible grain
    wood = wood ** 3

    return wood

def cloud_texture(position, scale=1.0, coverage=0.5):
    """
    Cloud texture using fBm.

    Args:
        position: 3D position
        scale: Texture scale
        coverage: Cloud coverage [0, 1]

    Returns:
        Cloud density
    """
    perlin = PerlinNoise()
    p = position * scale

    # Multiple octaves for realistic clouds
    cloud = fbm(p, perlin.noise, octaves=8, persistence=0.6)

    # Map to [0, 1]
    cloud = (cloud + 1.0) * 0.5

    # Apply coverage threshold
    cloud = smoothstep(coverage - 0.1, coverage + 0.1, cloud)

    return cloud
```

## Worley Noise (Cellular Noise)

Worley noise creates cellular patterns by measuring distances to random feature points.

```python
class WorleyNoise:
    """Implementation of Worley (cellular) noise."""

    def __init__(self, seed=0):
        """Initialize with seed."""
        self.seed = seed
        np.random.seed(seed)

    def cell_point(self, cell_x, cell_y, cell_z):
        """
        Generate random point within a cell.

        Args:
            cell_x, cell_y, cell_z: Cell coordinates

        Returns:
            Random point in the cell
        """
        # Hash cell coordinates
        np.random.seed(
            (hash((cell_x, cell_y, cell_z, self.seed)) & 0x7FFFFFFF)
        )

        # Random position within cell [0, 1]³
        offset = np.random.random(3)

        # Cell corner plus random offset
        return np.array([cell_x, cell_y, cell_z]) + offset

    def noise(self, x, y, z, distance_type='euclidean'):
        """
        3D Worley noise.

        Args:
            x, y, z: 3D coordinates
            distance_type: 'euclidean', 'manhattan', or 'chebyshev'

        Returns:
            Distance to nearest feature point
        """
        position = np.array([x, y, z])

        # Find cell containing position
        cell = np.floor(position).astype(int)

        min_distance = float('inf')

        # Check neighboring cells (3×3×3 neighborhood)
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                for dz in [-1, 0, 1]:
                    neighbor_cell = cell + np.array([dx, dy, dz])

                    # Get feature point in this cell
                    feature_point = self.cell_point(
                        neighbor_cell[0],
                        neighbor_cell[1],
                        neighbor_cell[2]
                    )

                    # Calculate distance
                    delta = position - feature_point

                    if distance_type == 'euclidean':
                        distance = np.linalg.norm(delta)
                    elif distance_type == 'manhattan':
                        distance = np.abs(delta).sum()
                    elif distance_type == 'chebyshev':
                        distance = np.abs(delta).max()
                    else:
                        distance = np.linalg.norm(delta)

                    min_distance = min(min_distance, distance)

        return min_distance

    def noise_f2_minus_f1(self, x, y, z):
        """
        Worley noise using F2 - F1 (distance to 2nd nearest minus 1st nearest).
        Creates interesting cellular patterns.

        Returns:
            F2 - F1
        """
        position = np.array([x, y, z])
        cell = np.floor(position).astype(int)

        distances = []

        # Check neighboring cells
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                for dz in [-1, 0, 1]:
                    neighbor_cell = cell + np.array([dx, dy, dz])
                    feature_point = self.cell_point(
                        neighbor_cell[0],
                        neighbor_cell[1],
                        neighbor_cell[2]
                    )

                    delta = position - feature_point
                    distance = np.linalg.norm(delta)
                    distances.append(distance)

        distances.sort()

        # F2 - F1
        if len(distances) >= 2:
            return distances[1] - distances[0]
        return 0.0
```

### Worley Noise Applications

```python
def stone_texture(position, scale=1.0):
    """
    Stone/rock texture using Worley noise.

    Args:
        position: 3D position
        scale: Texture scale

    Returns:
        Stone pattern value
    """
    worley = WorleyNoise(seed=42)
    p = position * scale

    # Get cellular pattern
    cells = worley.noise(p[0], p[1], p[2])

    # Normalize and invert
    stone = 1.0 - cells

    return stone

def cell_pattern(position, scale=1.0):
    """
    Cellular pattern using F2 - F1.

    Args:
        position: 3D position
        scale: Texture scale

    Returns:
        Cell boundary value
    """
    worley = WorleyNoise(seed=42)
    p = position * scale

    # F2 - F1 creates visible cell boundaries
    cells = worley.noise_f2_minus_f1(p[0], p[1], p[2])

    # Enhance cell edges
    cells = smoothstep(0.0, 0.1, cells)

    return cells
```

## Combining Noise Functions

The real power of procedural textures comes from combining different noise functions:

```python
def terrain_height(position, scale=1.0):
    """
    Terrain height map combining multiple noise types.

    Args:
        position: 2D position (x, y)
        scale: Terrain scale

    Returns:
        Height value
    """
    perlin = PerlinNoise(seed=42)
    p = np.array([position[0], position[1], 0]) * scale

    # Large-scale features (mountains)
    large_scale = fbm(p * 0.1, perlin.noise, octaves=4, persistence=0.6)

    # Medium-scale features (hills)
    medium_scale = fbm(p * 0.5, perlin.noise, octaves=3, persistence=0.5)

    # Small-scale detail (roughness)
    small_scale = fbm(p * 2.0, perlin.noise, octaves=2, persistence=0.4)

    # Combine with different weights
    height = (large_scale * 1.0 +
              medium_scale * 0.5 +
              small_scale * 0.2)

    return height

def lava_texture(position, time, scale=1.0):
    """
    Animated lava texture.

    Args:
        position: 3D position
        time: Animation time
        scale: Texture scale

    Returns:
        RGB color for lava
    """
    perlin = PerlinNoise(seed=42)
    p = position * scale

    # Animated position
    animated_p = p + np.array([time * 0.1, time * 0.05, 0])

    # Multiple noise layers
    noise1 = fbm(animated_p, perlin.noise, octaves=4)
    noise2 = fbm(animated_p * 2.0 + 100, perlin.noise, octaves=3)

    # Combine
    combined = (noise1 + noise2 * 0.5)

    # Map to color (black -> red -> orange -> yellow)
    t = (combined + 1.0) * 0.5  # Normalize to [0, 1]
    t = t ** 2  # Enhance bright areas

    if t < 0.3:
        # Dark red to red
        factor = t / 0.3
        color = np.array([0.5 + 0.5 * factor, 0, 0])
    elif t < 0.7:
        # Red to orange
        factor = (t - 0.3) / 0.4
        color = np.array([1.0, factor, 0])
    else:
        # Orange to yellow
        factor = (t - 0.7) / 0.3
        color = np.array([1.0, 1.0, factor])

    return color
```

## Domain Warping

Applying noise to the input coordinates of another noise function creates complex, organic patterns:

```python
def domain_warp(position, noise_func, warp_strength=1.0):
    """
    Apply domain warping to create complex patterns.

    Args:
        position: Input position
        noise_func: Noise function to use
        warp_strength: Strength of warping effect

    Returns:
        Warped noise value
    """
    # Sample noise to get warp offset
    offset_x = noise_func(position[0], position[1], position[2]) * warp_strength
    offset_y = noise_func(position[0] + 5.2, position[1] + 1.3, position[2]) * warp_strength
    offset_z = noise_func(position[0] - 3.7, position[1] + 2.8, position[2]) * warp_strength

    # Apply offset
    warped_pos = position + np.array([offset_x, offset_y, offset_z])

    # Sample noise at warped position
    result = noise_func(warped_pos[0], warped_pos[1], warped_pos[2])

    return result
```

## Performance Considerations

```python
class ProceduralTextureCache:
    """Cache for procedural texture evaluation."""

    def __init__(self, resolution=256):
        """Initialize cache."""
        self.resolution = resolution
        self.cache = {}

    def bake_to_texture(self, proc_func, bounds_min, bounds_max):
        """
        Bake procedural function to texture for faster lookup.

        Args:
            proc_func: Procedural function (takes position, returns color)
            bounds_min: Minimum bounds of texture space
            bounds_max: Maximum bounds of texture space

        Returns:
            Baked texture array
        """
        texture = np.zeros((self.resolution, self.resolution, 3))

        for y in range(self.resolution):
            for x in range(self.resolution):
                # Map pixel to world position
                u = x / (self.resolution - 1)
                v = y / (self.resolution - 1)

                pos = bounds_min + (bounds_max - bounds_min) * np.array([u, v, 0])

                # Evaluate procedural function
                texture[y, x] = proc_func(pos)

        return texture
```

## Conclusion

Procedural textures provide a powerful, flexible approach to texture generation. While they require more computation than image-based textures, they offer resolution independence, parametric control, and minimal memory usage. Understanding noise functions like Perlin and Worley noise, along with techniques for combining them, enables the creation of an infinite variety of natural and abstract patterns. Modern real-time graphics often use hybrid approaches, combining baked procedural textures with runtime evaluation for the best balance of quality and performance.
