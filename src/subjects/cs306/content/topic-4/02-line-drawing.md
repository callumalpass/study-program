# Line Drawing Algorithms

## Introduction to Line Rasterization

Line drawing is one of the most fundamental operations in computer graphics. Converting a mathematical line segment defined by two endpoints into a series of discrete pixels requires algorithms that are both accurate and efficient. Since lines are drawn millions of times per frame in typical graphics applications, line rasterization algorithms must be highly optimized.

The challenge lies in approximating a continuous mathematical line using discrete pixels while maintaining visual quality, avoiding gaps, and minimizing computational cost.

## The Basic Line Equation

A line segment between two points $(x_0, y_0)$ and $(x_1, y_1)$ can be represented mathematically as:

$$y = mx + b$$

Where:
- $m = \frac{y_1 - y_0}{x_1 - x_0}$ (slope)
- $b = y_0 - mx_0$ (y-intercept)

However, this representation has problems:
- Vertical lines have undefined slope (division by zero)
- Near-vertical lines require many Y calculations per X step
- Floating-point arithmetic is slow

## Naive Line Drawing

The simplest approach iterates through X coordinates and calculates corresponding Y values:

```python
def naive_line(x0, y0, x1, y1, framebuffer, color):
    """
    Naive line drawing using direct equation evaluation.

    Problems:
    - Uses floating-point arithmetic (slow)
    - Doesn't handle steep lines well
    - Gaps appear in steep lines
    - Fails for vertical lines

    Args:
        x0, y0: Starting point
        x1, y1: Ending point
        framebuffer: Output pixel buffer
        color: Line color
    """
    dx = x1 - x0
    dy = y1 - y0

    # Handle vertical line special case
    if dx == 0:
        if y0 > y1:
            y0, y1 = y1, y0
        for y in range(int(y0), int(y1) + 1):
            set_pixel(framebuffer, x0, y, color)
        return

    # Calculate slope and intercept
    m = dy / dx
    b = y0 - m * x0

    # Ensure we iterate in positive X direction
    if x0 > x1:
        x0, x1 = x1, x0

    # Draw pixels
    for x in range(int(x0), int(x1) + 1):
        y = m * x + b
        set_pixel(framebuffer, x, int(round(y)), color)
```

## Digital Differential Analyzer (DDA)

The DDA algorithm improves on the naive approach by using incremental calculations. Instead of recalculating Y from scratch each iteration, it incrementally updates the position.

### DDA Algorithm

The key insight is that for each step in the major axis (the axis with larger delta), we can calculate the increment in the minor axis:

```python
def dda_line(x0, y0, x1, y1, framebuffer, color):
    """
    Digital Differential Analyzer (DDA) line drawing.

    Improvements over naive approach:
    - Uses incremental calculations
    - Handles all slopes correctly
    - More uniform pixel distribution

    Still uses floating-point arithmetic.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point
        framebuffer: Output pixel buffer
        color: Line color
    """
    dx = x1 - x0
    dy = y1 - y0

    # Determine number of steps (use axis with larger delta)
    steps = max(abs(dx), abs(dy))

    # Calculate increment per step
    x_increment = dx / steps
    y_increment = dy / steps

    # Starting position
    x = x0
    y = y0

    # Draw line
    for i in range(int(steps) + 1):
        set_pixel(framebuffer, int(round(x)), int(round(y)), color)
        x += x_increment
        y += y_increment
```

### DDA Analysis

**Advantages:**
- Simpler than naive approach
- Handles all slopes uniformly
- No special cases for vertical lines
- Symmetric algorithm

**Disadvantages:**
- Still uses floating-point arithmetic
- Requires rounding operations
- Accumulates floating-point errors
- Not optimal for hardware implementation

**Time Complexity:** O(max(|dx|, |dy|))

## Bresenham's Line Algorithm

Bresenham's algorithm is the gold standard for line rasterization. Published by Jack E. Bresenham in 1965, it uses only integer arithmetic and addition/subtraction, making it extremely fast even on early computers without floating-point units.

### The Core Insight

Instead of calculating exact Y positions, Bresenham's algorithm maintains a decision variable that tracks the error between the actual line and the rasterized approximation. At each step, it decides whether to increment Y based on this error.

For a line with slope $0 \leq m \leq 1$:

At each X position, we choose between two Y values: the current Y or Y+1. We select the Y that minimizes the distance from the actual line.

### Bresenham's Algorithm Implementation

```python
def bresenham_line(x0, y0, x1, y1, framebuffer, color):
    """
    Bresenham's line drawing algorithm.

    Advantages:
    - Uses only integer arithmetic
    - No multiplication or division in inner loop
    - No rounding operations
    - Extremely fast and efficient

    Args:
        x0, y0: Starting point
        x1, y1: Ending point
        framebuffer: Output pixel buffer
        color: Line color
    """
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)

    # Determine direction of line
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1

    # Initialize error term
    err = dx - dy

    x, y = x0, y0

    while True:
        # Draw current pixel
        set_pixel(framebuffer, x, y, color)

        # Check if we've reached the end
        if x == x1 and y == y1:
            break

        # Calculate error for next step
        e2 = 2 * err

        # Step in X direction
        if e2 > -dy:
            err -= dy
            x += sx

        # Step in Y direction
        if e2 < dx:
            err += dx
            y += sy
```

### Mathematical Derivation

For a line from $(x_0, y_0)$ to $(x_1, y_1)$ with $0 \leq m \leq 1$:

The actual Y value at position $x_i$ is:
$$y_{actual} = y_0 + m(x_i - x_0) = y_0 + \frac{\Delta y}{\Delta x}(x_i - x_0)$$

The decision variable $d_i$ represents twice the vertical distance from the actual line to the pixel below:
$$d_i = 2\Delta y \cdot (x_i - x_0) - 2\Delta x \cdot (y_i - y_0)$$

If $d_i > 0$: actual line is above current pixel, choose $y_i + 1$
If $d_i \leq 0$: actual line is below current pixel, keep $y_i$

The update rules are:
- If we chose $y_i$: $d_{i+1} = d_i + 2\Delta y$
- If we chose $y_i + 1$: $d_{i+1} = d_i + 2\Delta y - 2\Delta x$

### Optimized Bresenham's Algorithm

We can optimize further by eliminating the multiplication by 2:

```python
def bresenham_optimized(x0, y0, x1, y1, framebuffer, color):
    """
    Optimized Bresenham's algorithm with precomputed constants.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point
        framebuffer: Output pixel buffer
        color: Line color
    """
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1

    # Precompute increments
    two_dy = 2 * dy
    two_dx = 2 * dx

    x, y = x0, y0

    # Gentle slope (|m| <= 1)
    if dx >= dy:
        err = two_dy - dx

        while x != x1:
            set_pixel(framebuffer, x, y, color)

            if err > 0:
                y += sy
                err -= two_dx

            err += two_dy
            x += sx

        set_pixel(framebuffer, x, y, color)

    # Steep slope (|m| > 1)
    else:
        err = two_dx - dy

        while y != y1:
            set_pixel(framebuffer, x, y, color)

            if err > 0:
                x += sx
                err -= two_dy

            err += two_dx
            y += sy

        set_pixel(framebuffer, x, y, color)
```

## Comparison of Line Algorithms

```python
import time
import numpy as np

def benchmark_line_algorithms():
    """
    Compare performance of different line drawing algorithms.
    """
    width, height = 1920, 1080
    framebuffer = np.zeros((height, width, 3), dtype=np.uint8)
    color = (255, 255, 255)

    # Test coordinates
    x0, y0 = 100, 100
    x1, y1 = 1800, 1000

    algorithms = [
        ("DDA", dda_line),
        ("Bresenham", bresenham_line),
        ("Optimized Bresenham", bresenham_optimized)
    ]

    iterations = 10000

    for name, algorithm in algorithms:
        start = time.time()
        for _ in range(iterations):
            algorithm(x0, y0, x1, y1, framebuffer, color)
        elapsed = time.time() - start

        print(f"{name}: {elapsed:.4f}s ({iterations/elapsed:.0f} lines/sec)")
```

Typical results (relative performance):
- DDA: ~1.5x slower than Bresenham
- Bresenham: baseline
- Optimized Bresenham: ~1.2x faster than Bresenham

## Handling Line Attributes

### Line Width

Thick lines require drawing multiple pixels per position:

```python
def thick_line(x0, y0, x1, y1, width, framebuffer, color):
    """
    Draw thick line using Bresenham's algorithm.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point
        width: Line width in pixels
        framebuffer: Output pixel buffer
        color: Line color
    """
    # Calculate perpendicular direction
    dx = x1 - x0
    dy = y1 - y0
    length = (dx*dx + dy*dy) ** 0.5

    # Perpendicular vector
    px = -dy / length
    py = dx / length

    # Draw multiple parallel lines
    half_width = width / 2
    for offset in range(-int(half_width), int(half_width) + 1):
        offset_x = offset * px
        offset_y = offset * py

        bresenham_line(
            int(x0 + offset_x), int(y0 + offset_y),
            int(x1 + offset_x), int(y1 + offset_y),
            framebuffer, color
        )
```

### Line Patterns

Dashed and dotted lines use pattern arrays:

```python
def patterned_line(x0, y0, x1, y1, pattern, framebuffer, color):
    """
    Draw line with dash pattern.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point
        pattern: List of segment lengths [dash, gap, dash, gap, ...]
        framebuffer: Output pixel buffer
        color: Line color
    """
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy

    x, y = x0, y0
    pixel_count = 0
    pattern_index = 0
    drawing = True  # Start by drawing

    while True:
        # Draw pixel if in drawing segment
        if drawing:
            set_pixel(framebuffer, x, y, color)

        pixel_count += 1

        # Check if we need to switch pattern segment
        if pixel_count >= pattern[pattern_index]:
            pixel_count = 0
            pattern_index = (pattern_index + 1) % len(pattern)
            drawing = not drawing

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

## Antialiased Lines

Xiaolin Wu's algorithm produces antialiased lines by using fractional pixel intensities:

```python
def wu_line(x0, y0, x1, y1, framebuffer, color):
    """
    Xiaolin Wu's antialiased line algorithm.

    Uses fractional intensities to reduce aliasing artifacts.

    Args:
        x0, y0: Starting point (float)
        x1, y1: Ending point (float)
        framebuffer: Output pixel buffer
        color: Base line color (r, g, b)
    """
    def plot(x, y, brightness):
        """Plot pixel with intensity modulation."""
        if 0 <= x < framebuffer.shape[1] and 0 <= y < framebuffer.shape[0]:
            # Blend with background based on brightness
            blended_color = tuple(int(c * brightness) for c in color)
            set_pixel(framebuffer, int(x), int(y), blended_color)

    def fpart(x):
        """Fractional part of x."""
        return x - int(x)

    def rfpart(x):
        """Reverse fractional part (1 - fractional part)."""
        return 1 - fpart(x)

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

    # Handle first endpoint
    xend = round(x0)
    yend = y0 + gradient * (xend - x0)
    xgap = rfpart(x0 + 0.5)
    xpxl1 = xend
    ypxl1 = int(yend)

    if steep:
        plot(ypxl1, xpxl1, rfpart(yend) * xgap)
        plot(ypxl1 + 1, xpxl1, fpart(yend) * xgap)
    else:
        plot(xpxl1, ypxl1, rfpart(yend) * xgap)
        plot(xpxl1, ypxl1 + 1, fpart(yend) * xgap)

    intery = yend + gradient

    # Handle second endpoint
    xend = round(x1)
    yend = y1 + gradient * (xend - x1)
    xgap = fpart(x1 + 0.5)
    xpxl2 = xend
    ypxl2 = int(yend)

    if steep:
        plot(ypxl2, xpxl2, rfpart(yend) * xgap)
        plot(ypxl2 + 1, xpxl2, fpart(yend) * xgap)
    else:
        plot(xpxl2, ypxl2, rfpart(yend) * xgap)
        plot(xpxl2, ypxl2 + 1, fpart(yend) * xgap)

    # Main loop
    for x in range(int(xpxl1) + 1, int(xpxl2)):
        if steep:
            plot(int(intery), x, rfpart(intery))
            plot(int(intery) + 1, x, fpart(intery))
        else:
            plot(x, int(intery), rfpart(intery))
            plot(x, int(intery) + 1, fpart(intery))

        intery += gradient
```

## Applications and Extensions

### Circle Drawing

Bresenham's algorithm extends to circles using the midpoint circle algorithm:

```python
def bresenham_circle(xc, yc, radius, framebuffer, color):
    """
    Bresenham's midpoint circle algorithm.

    Args:
        xc, yc: Circle center
        radius: Circle radius
        framebuffer: Output pixel buffer
        color: Circle color
    """
    def plot_circle_points(xc, yc, x, y):
        """Plot 8-way symmetric circle points."""
        points = [
            (xc + x, yc + y), (xc - x, yc + y),
            (xc + x, yc - y), (xc - x, yc - y),
            (xc + y, yc + x), (xc - y, yc + x),
            (xc + y, yc - x), (xc - y, yc - x)
        ]
        for px, py in points:
            set_pixel(framebuffer, px, py, color)

    x = 0
    y = radius
    d = 3 - 2 * radius

    plot_circle_points(xc, yc, x, y)

    while x <= y:
        if d < 0:
            d = d + 4 * x + 6
        else:
            d = d + 4 * (x - y) + 10
            y -= 1

        x += 1
        plot_circle_points(xc, yc, x, y)
```

## Conclusion

Line drawing algorithms demonstrate the evolution from simple mathematical equations to highly optimized integer-based algorithms. Bresenham's algorithm remains the standard for line rasterization due to its optimal use of integer arithmetic, making it ideal for hardware implementation.

Modern GPUs implement variations of these algorithms in dedicated hardware, capable of rasterizing billions of line segments per second. Understanding these fundamental algorithms provides insight into the tradeoffs between accuracy, performance, and visual quality that underlie all computer graphics systems.
