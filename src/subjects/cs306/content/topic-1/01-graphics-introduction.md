# Introduction to Computer Graphics

## Overview of Computer Graphics

Computer graphics is the field of visual computing concerned with generating, manipulating, and displaying visual content using computers. It encompasses everything from simple 2D drawings to photorealistic 3D rendering, animation, and interactive visualization.

The field has evolved dramatically since its inception in the 1960s, when Ivan Sutherland created Sketchpad, the first interactive graphics system. Today, computer graphics powers video games, movies, medical imaging, scientific visualization, virtual reality, and countless other applications.

## Fundamental Concepts

At its core, computer graphics involves converting mathematical descriptions of scenes into images that can be displayed on screens. This process requires understanding geometry, color theory, optics, and human perception.

The rendering equation, introduced by James Kajiya in 1986, provides a theoretical foundation for physically-based rendering:

```
L_o(x, ω_o) = L_e(x, ω_o) + ∫_Ω f_r(x, ω_i, ω_o) L_i(x, ω_i) (n · ω_i) dω_i
```

Where:
- `L_o` is outgoing radiance
- `L_e` is emitted radiance
- `f_r` is the bidirectional reflectance distribution function (BRDF)
- `L_i` is incoming radiance
- `ω_i` and `ω_o` are incoming and outgoing directions

## Types of Computer Graphics

### Raster Graphics

Raster graphics represent images as rectangular grids of pixels. Each pixel stores color information, typically as RGB values. This approach is resolution-dependent and the foundation of most display systems.

**Advantages:**
- Direct mapping to display hardware
- Efficient for photorealistic images
- Fast rendering of complex scenes

**Disadvantages:**
- Resolution-dependent
- Difficult to scale without quality loss
- Large memory requirements for high-resolution images

### Vector Graphics

Vector graphics represent images using geometric primitives like points, lines, curves, and polygons defined by mathematical equations. These representations are resolution-independent.

**Advantages:**
- Resolution-independent scaling
- Compact representation for simple shapes
- Easy to edit and manipulate

**Disadvantages:**
- Complex scenes become computationally expensive
- Difficult to represent photorealistic images
- Requires rasterization for display

## Graphics Applications

### Entertainment and Media

The entertainment industry relies heavily on computer graphics for:

- **Film and Television**: Visual effects, animation, and digital compositing
- **Video Games**: Real-time 3D rendering and interactive environments
- **Virtual Reality**: Immersive 3D environments with stereoscopic rendering

Modern films like Avatar and The Avengers use sophisticated rendering techniques including ray tracing, subsurface scattering, and global illumination to achieve photorealistic results.

### Scientific Visualization

Scientists use computer graphics to visualize complex data:

- **Medical Imaging**: CT scans, MRI visualization, surgical planning
- **Molecular Modeling**: Protein structure visualization
- **Climate Modeling**: Weather patterns and climate change simulation
- **Astronomy**: Visualization of celestial phenomena

### Computer-Aided Design (CAD)

Engineering and architecture depend on graphics for:

- 3D modeling of products and structures
- Simulation and analysis
- Manufacturing planning
- Architectural walkthroughs

### User Interfaces

Modern graphical user interfaces (GUIs) use graphics principles for:

- Window management systems
- Icon design and rendering
- Typography and text rendering
- Animations and transitions

## The Graphics Pipeline

The graphics pipeline is a conceptual model describing the stages required to generate an image from a 3D scene. The basic pipeline includes:

1. **Application Stage**: Scene description, geometry processing
2. **Geometry Processing**: Transformations, projection, clipping
3. **Rasterization**: Converting primitives to pixels
4. **Pixel Processing**: Shading, texturing, blending

Modern GPUs implement this pipeline in hardware with programmable stages (vertex shaders, fragment shaders) allowing sophisticated rendering effects.

## Basic Rendering Example

Here's a simple Python example using matplotlib to demonstrate basic 2D rendering:

```python
import numpy as np
import matplotlib.pyplot as plt

def draw_triangle(vertices, color='blue'):
    """
    Draw a filled triangle given three vertices.

    Args:
        vertices: List of (x, y) coordinates
        color: Fill color for the triangle
    """
    # Close the triangle by appending first vertex
    vertices_closed = vertices + [vertices[0]]
    xs, ys = zip(*vertices_closed)

    plt.fill(xs, ys, color=color, alpha=0.7)
    plt.plot(xs, ys, 'k-', linewidth=2)

# Define triangle vertices
triangle = [(0, 0), (1, 0), (0.5, 0.866)]

# Create figure
plt.figure(figsize=(8, 8))
draw_triangle(triangle, color='cyan')
plt.axis('equal')
plt.grid(True, alpha=0.3)
plt.title('Simple Triangle Rendering')
plt.show()
```

## Color Models

Computer graphics uses various color models to represent and manipulate colors:

### RGB Color Model

The most common model for displays, where colors are specified as combinations of Red, Green, and Blue components:

```python
def rgb_color(r, g, b):
    """
    Create RGB color with values in range [0, 1].

    Returns:
        tuple: (r, g, b) normalized color
    """
    return (
        max(0.0, min(1.0, r)),
        max(0.0, min(1.0, g)),
        max(0.0, min(1.0, b))
    )

# Examples
white = rgb_color(1.0, 1.0, 1.0)
red = rgb_color(1.0, 0.0, 0.0)
purple = rgb_color(0.5, 0.0, 0.5)
```

### HSV Color Model

HSV (Hue, Saturation, Value) provides a more intuitive way to specify colors:

- **Hue**: Color type (0-360 degrees)
- **Saturation**: Color intensity (0-1)
- **Value**: Brightness (0-1)

```python
def hsv_to_rgb(h, s, v):
    """
    Convert HSV color to RGB.

    Args:
        h: Hue in degrees [0, 360]
        s: Saturation [0, 1]
        v: Value [0, 1]

    Returns:
        tuple: (r, g, b) in range [0, 1]
    """
    c = v * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = v - c

    if h < 60:
        r, g, b = c, x, 0
    elif h < 120:
        r, g, b = x, c, 0
    elif h < 180:
        r, g, b = 0, c, x
    elif h < 240:
        r, g, b = 0, x, c
    elif h < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x

    return (r + m, g + m, b + m)
```

## Image Representation

Digital images are represented as arrays of pixels. Each pixel stores color information:

```python
import numpy as np

def create_gradient_image(width, height):
    """
    Create a simple gradient image.

    Args:
        width: Image width in pixels
        height: Image height in pixels

    Returns:
        numpy.ndarray: RGB image array of shape (height, width, 3)
    """
    image = np.zeros((height, width, 3))

    for y in range(height):
        for x in range(width):
            # Horizontal gradient in red channel
            image[y, x, 0] = x / width
            # Vertical gradient in green channel
            image[y, x, 1] = y / height
            # Constant blue channel
            image[y, x, 2] = 0.5

    return image

# Create and display gradient
gradient = create_gradient_image(256, 256)
```

## Performance Considerations

Computer graphics demands high performance, especially for real-time applications like games. Key optimization strategies include:

1. **Level of Detail (LOD)**: Using simpler models for distant objects
2. **Culling**: Removing geometry that won't be visible
3. **Spatial Data Structures**: Organizing scenes for efficient queries
4. **Parallel Processing**: Leveraging GPU parallelism

## Historical Milestones

- **1963**: Ivan Sutherland's Sketchpad
- **1970s**: Development of hidden surface algorithms
- **1980**: Turner Whitted introduces ray tracing
- **1984**: Cook and Torrance BRDF model
- **1995**: Toy Story - first fully computer-animated feature film
- **2001**: Programmable GPU shaders introduced
- **2018**: Real-time ray tracing becomes practical with RTX GPUs

## Future Directions

Emerging trends in computer graphics include:

- **Real-time ray tracing**: Path-traced rendering for games
- **Neural rendering**: Using machine learning for synthesis and upscaling
- **Volumetric displays**: True 3D displays without glasses
- **Light field rendering**: Capturing and displaying complete light information
- **Computational photography**: Merging graphics and image processing

## Conclusion

Computer graphics is a rich field combining mathematics, physics, computer science, and art. Understanding its fundamentals is essential for creating compelling visual experiences and pushing the boundaries of what's possible in digital imaging and rendering.
