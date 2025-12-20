# Antialiasing in Rasterization

## Introduction to Aliasing

Aliasing is the visual artifact that occurs when a continuous signal (a geometric primitive) is sampled at discrete locations (pixel centers). This sampling creates jagged edges, stair-stepping patterns ("jaggies"), and visual discontinuities that break the illusion of smooth geometry.

The term "aliasing" comes from signal processing: when a high-frequency signal is sampled at too low a rate, high frequencies masquerade as (alias for) lower frequencies, creating artifacts.

## The Fundamental Cause of Aliasing

### The Sampling Theorem

The Nyquist-Shannon sampling theorem states that to accurately reconstruct a signal, you must sample at least twice the highest frequency present:

$$f_{sample} \geq 2 \cdot f_{max}$$

In graphics:
- Geometric edges can have infinite frequency (instantaneous color changes)
- Pixels sample at a fixed rate (screen resolution)
- Therefore, aliasing is inevitable without special techniques

```python
import numpy as np
import matplotlib.pyplot as plt

def demonstrate_aliasing():
    """
    Demonstrate aliasing through undersampling.

    Shows how high-frequency signals create artifacts when
    sampled at insufficient rate.
    """
    # High-frequency signal
    t_continuous = np.linspace(0, 1, 1000)
    high_freq = 20  # Hz
    signal = np.sin(2 * np.pi * high_freq * t_continuous)

    # Undersample (too low sample rate)
    sample_rate = 15  # Hz (less than 2 * high_freq)
    t_sampled = np.linspace(0, 1, sample_rate)
    sampled_signal = np.sin(2 * np.pi * high_freq * t_sampled)

    # Reconstructed signal appears to have different frequency
    plt.figure(figsize=(12, 6))
    plt.plot(t_continuous, signal, 'b-', label='Original signal (20 Hz)')
    plt.plot(t_sampled, sampled_signal, 'ro', label='Sampled points')
    plt.plot(t_sampled, sampled_signal, 'r--', label='Reconstructed (aliased)')
    plt.legend()
    plt.title('Aliasing: Undersampled High-Frequency Signal')
    plt.xlabel('Time')
    plt.ylabel('Amplitude')
```

## Types of Aliasing Artifacts

### 1. Jagged Edges (Stair-stepping)

The most visible artifact - diagonal lines appear as staircases:

```python
def render_line_aliased(x0, y0, x1, y1, framebuffer, color):
    """
    Render line without antialiasing - shows jaggies.

    Args:
        x0, y0: Start point
        x1, y1: End point
        framebuffer: Output buffer
        color: Line color
    """
    # Bresenham's algorithm - binary decision (on/off)
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy

    x, y = x0, y0

    while True:
        # Hard edge - pixel is either fully on or fully off
        framebuffer[y, x] = color

        if x == x1 and y == y1:
            break

        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x += sx
        if e2 < dx:
            err += dx
            y += sy
```

### 2. Temporal Aliasing

Moving objects appear to strobe or flicker:

```python
def temporal_aliasing_demo(velocity, frame_rate):
    """
    Demonstrate temporal aliasing (wagon wheel effect).

    Args:
        velocity: Rotation speed (degrees per second)
        frame_rate: Sampling rate (frames per second)

    Returns:
        str: Description of observed effect
    """
    # Nyquist frequency for rotation
    nyquist_freq = frame_rate / 2.0  # Max observable rotation rate

    if velocity > nyquist_freq:
        # Aliasing: appears to rotate backward or at wrong speed
        apparent_velocity = velocity % frame_rate
        if apparent_velocity > frame_rate / 2:
            apparent_velocity -= frame_rate

        return f"Aliased: appears to rotate at {apparent_velocity}°/s"
    else:
        return f"No aliasing: rotates at {velocity}°/s"
```

### 3. Small Object Disappearance

Objects smaller than a pixel may vanish completely:

```python
def small_object_aliasing(object_size_pixels):
    """
    Determine if small object will be visible.

    Objects smaller than pixel spacing may miss all sample points.

    Args:
        object_size_pixels: Object size in pixels

    Returns:
        float: Probability object will be sampled (simplified)
    """
    if object_size_pixels >= 1.0:
        return 1.0  # Always visible

    # Simplified: probability proportional to size
    return object_size_pixels
```

## Supersampling Antialiasing (SSAA)

The brute-force solution: sample at higher resolution, then downsample.

### Full Scene Supersampling

```python
def ssaa_render(scene, width, height, sample_rate=2):
    """
    Supersampling antialiasing (SSAA/FSAA).

    Render at higher resolution, then downsample.

    Args:
        scene: Scene to render
        width, height: Target resolution
        sample_rate: Samples per dimension (2 = 4x SSAA)

    Returns:
        numpy.ndarray: Antialiased image
    """
    # Render at higher resolution
    high_res_width = width * sample_rate
    high_res_height = height * sample_rate

    high_res_buffer = np.zeros((high_res_height, high_res_width, 3))

    # Render scene at high resolution
    render_scene(scene, high_res_buffer)

    # Downsample: average blocks of pixels
    output = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            # Average sample_rate x sample_rate block
            block = high_res_buffer[
                y * sample_rate:(y + 1) * sample_rate,
                x * sample_rate:(x + 1) * sample_rate
            ]
            output[y, x] = np.mean(block, axis=(0, 1))

    return output
```

**Advantages:**
- Simple to implement
- Perfect quality (up to sample rate)
- No special shader modifications needed

**Disadvantages:**
- Extremely expensive (4x SSAA = 4x rendering cost)
- Memory intensive
- Diminishing returns at high resolutions

## Multisample Antialiasing (MSAA)

More efficient than SSAA - stores multiple samples per pixel but runs fragment shader once per pixel.

### MSAA Algorithm

```python
class MSAASample:
    """Single sample in MSAA pixel."""
    def __init__(self, x_offset, y_offset):
        self.x_offset = x_offset  # Offset within pixel [-0.5, 0.5]
        self.y_offset = y_offset
        self.color = None
        self.depth = float('inf')
        self.covered = False  # Is this sample inside primitive?

class MSAAPi

:
    """Pixel with multiple samples for MSAA."""
    def __init__(self, num_samples=4):
        self.samples = []
        self.num_samples = num_samples

        # Standard MSAA sample patterns
        if num_samples == 2:
            positions = [(0.25, 0.25), (-0.25, -0.25)]
        elif num_samples == 4:
            positions = [
                (0.125, 0.125), (0.375, -0.125),
                (-0.125, 0.375), (-0.375, -0.375)
            ]
        elif num_samples == 8:
            positions = [
                (0.0625, -0.1875), (0.1875, 0.0625),
                (-0.0625, 0.1875), (-0.1875, -0.0625),
                (0.3125, -0.3125), (0.4375, 0.3125),
                (-0.3125, 0.4375), (-0.4375, -0.4375)
            ]
        else:
            positions = [(0, 0)]

        for x_off, y_off in positions:
            self.samples.append(MSAASample(x_off, y_off))

def msaa_render_triangle(v0, v1, v2, framebuffer_msaa, color_func):
    """
    Render triangle with MSAA.

    Args:
        v0, v1, v2: Triangle vertices
        framebuffer_msaa: Framebuffer of MSAAPixel objects
        color_func: Function to compute fragment color
    """
    # Get bounding box
    min_x = int(min(v0.x, v1.x, v2.x))
    max_x = int(max(v0.x, v1.x, v2.x))
    min_y = int(min(v0.y, v1.y, v2.y))
    max_y = int(max(v0.y, v1.y, v2.y))

    for py in range(min_y, max_y + 1):
        for px in range(min_x, max_x + 1):
            pixel = framebuffer_msaa[py, px]

            # Test each sample
            coverage_count = 0
            for sample in pixel.samples:
                # Sample position
                sx = px + sample.x_offset
                sy = py + sample.y_offset

                # Coverage test
                bc = barycentric_coordinates(sx, sy, v0, v1, v2)

                if bc[0] >= 0 and bc[1] >= 0 and bc[2] >= 0:
                    sample.covered = True
                    coverage_count += 1

                    # Interpolate depth at sample
                    depth = bc[0] * v0.z + bc[1] * v1.z + bc[2] * v2.z

                    # Depth test per sample
                    if depth < sample.depth:
                        sample.depth = depth
                        # Store that this sample needs shading

            # Compute color ONCE per pixel (at pixel center)
            if coverage_count > 0:
                pixel_color = color_func(px, py)

                # Apply color to covered samples
                for sample in pixel.samples:
                    if sample.covered:
                        sample.color = pixel_color

def resolve_msaa(framebuffer_msaa, width, height):
    """
    Resolve MSAA framebuffer to regular framebuffer.

    Average all sample colors for each pixel.

    Args:
        framebuffer_msaa: MSAA framebuffer
        width, height: Output dimensions

    Returns:
        numpy.ndarray: Resolved image
    """
    output = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            pixel = framebuffer_msaa[y, x]

            # Average all samples
            colors = [s.color for s in pixel.samples if s.color is not None]

            if colors:
                output[y, x] = np.mean(colors, axis=0)

    return output
```

**Advantages:**
- Much cheaper than SSAA (fragment shader runs once)
- Good quality for geometric edges
- Standard in modern GPUs

**Disadvantages:**
- Doesn't antialias texture/shader aliasing
- Still higher memory cost than no AA
- Complex resolve step

## Fast Approximate Antialiasing (FXAA)

Post-processing approach that analyzes rendered image to smooth edges.

### FXAA Algorithm

```python
def fxaa_pass(image, threshold=0.125):
    """
    Fast Approximate Antialiasing (FXAA) post-process.

    Detects edges in final image and blurs them.

    Args:
        image: Input rendered image
        threshold: Edge detection threshold

    Returns:
        numpy.ndarray: Antialiased image
    """
    height, width = image.shape[:2]
    output = image.copy()

    for y in range(1, height - 1):
        for x in range(1, width - 1):
            # Sample neighbors
            center = rgb_to_luma(image[y, x])
            north = rgb_to_luma(image[y-1, x])
            south = rgb_to_luma(image[y+1, x])
            east = rgb_to_luma(image[y, x+1])
            west = rgb_to_luma(image[y, x-1])

            # Calculate edge strength
            edge_horizontal = abs(north + south - 2 * center)
            edge_vertical = abs(east + west - 2 * center)

            edge_strength = max(edge_horizontal, edge_vertical)

            # If edge detected, blend with neighbors
            if edge_strength > threshold:
                if edge_horizontal > edge_vertical:
                    # Horizontal edge - blend vertically
                    blend = 0.25
                    output[y, x] = (
                        (1 - 2*blend) * image[y, x] +
                        blend * image[y-1, x] +
                        blend * image[y+1, x]
                    )
                else:
                    # Vertical edge - blend horizontally
                    blend = 0.25
                    output[y, x] = (
                        (1 - 2*blend) * image[y, x] +
                        blend * image[y, x-1] +
                        blend * image[y, x+1]
                    )

    return output

def rgb_to_luma(rgb):
    """
    Convert RGB to luminance for edge detection.

    Args:
        rgb: RGB color tuple

    Returns:
        float: Luminance value
    """
    # Perceptual luminance weights
    return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
```

**Advantages:**
- Very fast (single post-process pass)
- Low memory overhead
- Works on any rendered image

**Disadvantages:**
- Can blur texture detail
- May miss some edges
- Can create artifacts on high-contrast edges

## Temporal Antialiasing (TAA)

Use information from previous frames to improve antialiasing.

### TAA Algorithm

```python
class TAARenderer:
    """
    Temporal Antialiasing renderer.

    Combines current and previous frames with sub-pixel jitter.
    """
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.history_buffer = None
        self.frame_count = 0

        # Halton sequence for jitter pattern
        self.jitter_sequence = self.generate_halton_sequence(64)

    def generate_halton_sequence(self, n, bases=(2, 3)):
        """
        Generate Halton sequence for camera jitter.

        Provides low-discrepancy sampling pattern.

        Args:
            n: Number of samples
            bases: Base numbers for sequence

        Returns:
            list: List of (x, y) jitter offsets
        """
        def halton(i, base):
            result = 0
            f = 1.0 / base
            while i > 0:
                result += f * (i % base)
                i //= base
                f /= base
            return result

        sequence = []
        for i in range(n):
            x = halton(i, bases[0]) - 0.5  # Center around 0
            y = halton(i, bases[1]) - 0.5
            sequence.append((x, y))

        return sequence

    def render_frame(self, scene, camera):
        """
        Render frame with TAA.

        Args:
            scene: Scene to render
            camera: Camera with jitter applied

        Returns:
            numpy.ndarray: Antialiased frame
        """
        # Get jitter for this frame
        jitter_idx = self.frame_count % len(self.jitter_sequence)
        jitter_x, jitter_y = self.jitter_sequence[jitter_idx]

        # Apply sub-pixel jitter to camera
        camera.apply_jitter(jitter_x / self.width, jitter_y / self.height)

        # Render current frame
        current_frame = render_scene(scene, camera, self.width, self.height)

        # First frame - just store history
        if self.history_buffer is None:
            self.history_buffer = current_frame.copy()
            self.frame_count += 1
            return current_frame

        # Temporal blend
        alpha = 0.1  # History weight (higher = more temporal smoothing)
        blended = alpha * current_frame + (1 - alpha) * self.history_buffer

        # Update history
        self.history_buffer = blended.copy()
        self.frame_count += 1

        return blended
```

**Advantages:**
- Excellent quality
- Can approach supersampling quality over time
- Minimal per-frame cost

**Disadvantages:**
- Ghosting artifacts on moving objects
- Requires motion vectors for best results
- Multiple frames to converge

## Coverage Sampling Antialiasing

Analytical approach computing exact coverage of primitives.

### Analytical Edge Antialiasing

```python
def analytical_line_aa(x0, y0, x1, y1, framebuffer):
    """
    Analytically compute line coverage for antialiasing.

    Calculate exact coverage of each pixel by line.

    Args:
        x0, y0: Line start
        x1, y1: Line end
        framebuffer: Output buffer
    """
    # Wu's line algorithm - uses exact coverage calculation
    def plot_pixel(x, y, coverage):
        """Plot pixel with coverage-based alpha."""
        if 0 <= x < framebuffer.shape[1] and 0 <= y < framebuffer.shape[0]:
            color = (255, 255, 255, int(255 * coverage))
            blend_pixel(framebuffer, x, y, color)

    steep = abs(y1 - y0) > abs(x1 - x0)

    if steep:
        x0, y0 = y0, x0
        x1, y1 = y1, x1

    if x0 > x1:
        x0, x1 = x1, x0
        y0, y1 = y1, y0

    dx = x1 - x0
    dy = y1 - y0
    gradient = dy / dx if dx != 0 else 1.0

    # Calculate exact coverage based on distance from line
    def coverage(x, y, line_y):
        """Calculate pixel coverage based on distance to line."""
        distance = abs(y - line_y)
        if distance >= 1.0:
            return 0.0
        return 1.0 - distance

    # Render with coverage
    x = x0
    y = y0

    while x <= x1:
        exact_y = y0 + gradient * (x - x0)

        # Anti-alias by splitting coverage between two pixels
        y_floor = int(exact_y)
        coverage_lower = coverage(y_floor, y_floor, exact_y)
        coverage_upper = coverage(y_floor + 1, y_floor + 1, exact_y)

        if steep:
            plot_pixel(y_floor, x, coverage_lower)
            plot_pixel(y_floor + 1, x, coverage_upper)
        else:
            plot_pixel(x, y_floor, coverage_lower)
            plot_pixel(x, y_floor + 1, coverage_upper)

        x += 1
```

## Comparison of Antialiasing Techniques

```python
def compare_aa_techniques():
    """
    Compare different antialiasing approaches.

    Returns:
        dict: Performance and quality metrics
    """
    techniques = {
        "None": {
            "quality": 1.0,
            "cost": 1.0,
            "memory": 1.0,
            "notes": "Baseline - jagged edges"
        },
        "SSAA 4x": {
            "quality": 9.5,
            "cost": 4.0,
            "memory": 4.0,
            "notes": "Best quality, highest cost"
        },
        "MSAA 4x": {
            "quality": 8.0,
            "cost": 1.5,
            "memory": 2.0,
            "notes": "Good quality, moderate cost"
        },
        "FXAA": {
            "quality": 6.0,
            "cost": 1.1,
            "memory": 1.0,
            "notes": "Fast, may blur details"
        },
        "TAA": {
            "quality": 8.5,
            "cost": 1.2,
            "memory": 2.0,
            "notes": "Excellent quality, temporal artifacts"
        }
    }

    return techniques
```

## Conclusion

Antialiasing is essential for high-quality rendering, addressing the fundamental limitation of discrete pixel sampling. Different techniques offer tradeoffs between quality, performance, and artifacts:

- **SSAA**: Brute force, best quality, expensive
- **MSAA**: Hardware-accelerated, good for geometry edges
- **FXAA**: Fast post-process, may blur textures
- **TAA**: Temporal accumulation, excellent quality, ghosting issues

Modern games typically combine techniques: TAA for overall antialiasing, MSAA for geometry, and post-processing sharpening to recover detail. Understanding these algorithms enables making informed decisions about rendering quality versus performance in interactive applications.
