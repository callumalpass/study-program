import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs306-t4-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Plot Pixel Coordinates',
    difficulty: 1,
    description: 'Write a function that takes pixel coordinates (x, y) and validates if they fall within a screen buffer of given width and height. Return True if valid, False otherwise.',
    starterCode: `def is_valid_pixel(x, y, width, height):
    """
    Check if pixel coordinates are within screen bounds.

    Args:
        x: X coordinate
        y: Y coordinate
        width: Screen width
        height: Screen height

    Returns:
        bool: True if pixel is valid, False otherwise
    """
    pass`,
    solution: `def is_valid_pixel(x, y, width, height):
    """
    Check if pixel coordinates are within screen bounds.

    Args:
        x: X coordinate
        y: Y coordinate
        width: Screen width
        height: Screen height

    Returns:
        bool: True if pixel is valid, False otherwise
    """
    return 0 <= x < width and 0 <= y < height`,
    testCases: [
      { input: '5, 5, 10, 10', expectedOutput: 'True', isHidden: false, description: 'Valid pixel in center' },
      { input: '0, 0, 10, 10', expectedOutput: 'True', isHidden: false, description: 'Valid pixel at origin' },
      { input: '-1, 5, 10, 10', expectedOutput: 'False', isHidden: false, description: 'Invalid negative x' },
      { input: '10, 5, 10, 10', expectedOutput: 'False', isHidden: true, description: 'Invalid x at boundary' },
      { input: '5, 15, 10, 10', expectedOutput: 'False', isHidden: true, description: 'Invalid y beyond boundary' }
    ],
    hints: [
      'Check if coordinates are non-negative',
      'Remember that valid coordinates range from 0 to width-1 and 0 to height-1',
      'Use logical AND to combine both x and y checks'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Calculate Line Slope',
    difficulty: 1,
    description: 'Implement a function to calculate the slope of a line given two points (x0, y0) and (x1, y1). Handle vertical lines by returning None.',
    starterCode: `def calculate_slope(x0, y0, x1, y1):
    """
    Calculate the slope of a line between two points.

    Args:
        x0, y0: First point coordinates
        x1, y1: Second point coordinates

    Returns:
        float or None: Slope value, or None for vertical lines
    """
    pass`,
    solution: `def calculate_slope(x0, y0, x1, y1):
    """
    Calculate the slope of a line between two points.

    Args:
        x0, y0: First point coordinates
        x1, y1: Second point coordinates

    Returns:
        float or None: Slope value, or None for vertical lines
    """
    if x1 == x0:
        return None
    return (y1 - y0) / (x1 - x0)`,
    testCases: [
      { input: '0, 0, 4, 4', expectedOutput: '1.0', isHidden: false, description: '45 degree line' },
      { input: '0, 0, 4, 2', expectedOutput: '0.5', isHidden: false, description: 'Gentle slope' },
      { input: '2, 3, 2, 7', expectedOutput: 'None', isHidden: false, description: 'Vertical line' },
      { input: '1, 5, 5, 1', expectedOutput: '-1.0', isHidden: true, description: 'Negative slope' },
      { input: '0, 3, 6, 3', expectedOutput: '0.0', isHidden: true, description: 'Horizontal line' }
    ],
    hints: [
      'Slope is rise over run: (y1 - y0) / (x1 - x0)',
      'Check for division by zero when x1 equals x0',
      'Vertical lines have undefined slope'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'DDA Line Drawing',
    difficulty: 2,
    description: 'Implement the Digital Differential Analyzer (DDA) algorithm to generate a list of pixel coordinates that form a line between two points.',
    starterCode: `def dda_line(x0, y0, x1, y1):
    """
    Generate line pixels using DDA algorithm.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point

    Returns:
        list: List of (x, y) tuples representing pixel coordinates
    """
    pass`,
    solution: `def dda_line(x0, y0, x1, y1):
    """
    Generate line pixels using DDA algorithm.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point

    Returns:
        list: List of (x, y) tuples representing pixel coordinates
    """
    pixels = []
    dx = x1 - x0
    dy = y1 - y0

    # Determine number of steps
    steps = max(abs(dx), abs(dy))

    if steps == 0:
        return [(x0, y0)]

    # Calculate increment for each step
    x_inc = dx / steps
    y_inc = dy / steps

    # Generate pixels
    x, y = x0, y0
    for _ in range(steps + 1):
        pixels.append((round(x), round(y)))
        x += x_inc
        y += y_inc

    return pixels`,
    testCases: [
      { input: '0, 0, 3, 3', expectedOutput: '[(0, 0), (1, 1), (2, 2), (3, 3)]', isHidden: false, description: 'Diagonal line' },
      { input: '0, 0, 0, 3', expectedOutput: '[(0, 0), (0, 1), (0, 2), (0, 3)]', isHidden: false, description: 'Vertical line' },
      { input: '1, 1, 4, 2', expectedOutput: '[(1, 1), (2, 1), (3, 2), (4, 2)]', isHidden: true, description: 'Gentle slope line' },
      { input: '0, 0, 0, 0', expectedOutput: '[(0, 0)]', isHidden: true, description: 'Single point' }
    ],
    hints: [
      'Calculate dx and dy as the differences in coordinates',
      'Number of steps is the maximum of abs(dx) and abs(dy)',
      'Increment by dx/steps and dy/steps at each iteration',
      'Round floating point values to get integer pixel coordinates'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Pixel Distance Calculation',
    difficulty: 2,
    description: 'Calculate the Euclidean distance between two pixels. This is useful for antialiasing and distance-based computations in rasterization.',
    starterCode: `import math

def pixel_distance(x0, y0, x1, y1):
    """
    Calculate Euclidean distance between two pixels.

    Args:
        x0, y0: First pixel coordinates
        x1, y1: Second pixel coordinates

    Returns:
        float: Distance between pixels
    """
    pass`,
    solution: `import math

def pixel_distance(x0, y0, x1, y1):
    """
    Calculate Euclidean distance between two pixels.

    Args:
        x0, y0: First pixel coordinates
        x1, y1: Second pixel coordinates

    Returns:
        float: Distance between pixels
    """
    dx = x1 - x0
    dy = y1 - y0
    return math.sqrt(dx * dx + dy * dy)`,
    testCases: [
      { input: '0, 0, 3, 4', expectedOutput: '5.0', isHidden: false, description: '3-4-5 triangle' },
      { input: '0, 0, 1, 1', expectedOutput: '1.414', isHidden: false, description: 'Diagonal distance (rounded to 3 decimals)' },
      { input: '5, 5, 5, 5', expectedOutput: '0.0', isHidden: false, description: 'Same point' },
      { input: '0, 0, 0, 10', expectedOutput: '10.0', isHidden: true, description: 'Vertical distance' },
      { input: '-2, 3, 4, -5', expectedOutput: '10.0', isHidden: true, description: 'Negative coordinates' }
    ],
    hints: [
      'Use the Pythagorean theorem: distance = sqrt(dx² + dy²)',
      'Calculate dx and dy first',
      'Import math module for sqrt function'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Bresenham Line Algorithm',
    difficulty: 3,
    description: 'Implement Bresenham\'s line algorithm for the first octant (where 0 ≤ slope ≤ 1). This integer-only algorithm is more efficient than DDA.',
    starterCode: `def bresenham_line(x0, y0, x1, y1):
    """
    Generate line pixels using Bresenham's algorithm (first octant).
    Assumes x1 >= x0 and 0 <= slope <= 1.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point

    Returns:
        list: List of (x, y) tuples representing pixel coordinates
    """
    pass`,
    solution: `def bresenham_line(x0, y0, x1, y1):
    """
    Generate line pixels using Bresenham's algorithm (first octant).
    Assumes x1 >= x0 and 0 <= slope <= 1.

    Args:
        x0, y0: Starting point
        x1, y1: Ending point

    Returns:
        list: List of (x, y) tuples representing pixel coordinates
    """
    pixels = []
    dx = x1 - x0
    dy = y1 - y0

    y = y0
    d = 2 * dy - dx  # Initial decision parameter

    for x in range(x0, x1 + 1):
        pixels.append((x, y))

        if d > 0:
            y += 1
            d += 2 * (dy - dx)
        else:
            d += 2 * dy

    return pixels`,
    testCases: [
      { input: '0, 0, 4, 2', expectedOutput: '[(0, 0), (1, 0), (2, 1), (3, 1), (4, 2)]', isHidden: false, description: 'Gentle slope line' },
      { input: '0, 0, 4, 4', expectedOutput: '[(0, 0), (1, 1), (2, 2), (3, 3), (4, 4)]', isHidden: false, description: '45 degree line' },
      { input: '1, 2, 5, 3', expectedOutput: '[(1, 2), (2, 2), (3, 3), (4, 3), (5, 3)]', isHidden: true, description: 'Very gentle slope' },
      { input: '0, 0, 8, 3', expectedOutput: '[(0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2), (6, 2), (7, 3), (8, 3)]', isHidden: true, description: 'Longer line' }
    ],
    hints: [
      'Initialize decision parameter d = 2*dy - dx',
      'If d > 0, increment y and update d by 2*(dy - dx)',
      'Otherwise, keep y the same and update d by 2*dy',
      'Iterate x from x0 to x1'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Midpoint Circle Algorithm',
    difficulty: 3,
    description: 'Implement the midpoint circle algorithm to generate pixels for one octant of a circle. The algorithm uses integer arithmetic to efficiently rasterize circles.',
    starterCode: `def circle_octant(radius):
    """
    Generate pixels for first octant of circle using midpoint algorithm.
    Circle is centered at origin.

    Args:
        radius: Circle radius

    Returns:
        list: List of (x, y) tuples for first octant
    """
    pass`,
    solution: `def circle_octant(radius):
    """
    Generate pixels for first octant of circle using midpoint algorithm.
    Circle is centered at origin.

    Args:
        radius: Circle radius

    Returns:
        list: List of (x, y) tuples for first octant
    """
    pixels = []
    x = 0
    y = radius
    d = 1 - radius  # Initial decision parameter

    while x <= y:
        pixels.append((x, y))

        if d < 0:
            d += 2 * x + 3
        else:
            d += 2 * (x - y) + 5
            y -= 1

        x += 1

    return pixels`,
    testCases: [
      { input: '5', expectedOutput: '[(0, 5), (1, 5), (2, 5), (3, 4), (4, 3)]', isHidden: false, description: 'Circle radius 5' },
      { input: '3', expectedOutput: '[(0, 3), (1, 3), (2, 2)]', isHidden: false, description: 'Circle radius 3' },
      { input: '8', expectedOutput: '[(0, 8), (1, 8), (2, 8), (3, 7), (4, 7), (5, 6), (6, 5)]', isHidden: true, description: 'Circle radius 8' },
      { input: '1', expectedOutput: '[(0, 1), (1, 0)]', isHidden: true, description: 'Small circle radius 1' }
    ],
    hints: [
      'Initialize x = 0, y = radius, and d = 1 - radius',
      'Continue while x <= y',
      'If d < 0, update d by 2*x + 3',
      'Otherwise, update d by 2*(x - y) + 5 and decrement y',
      'Always increment x'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Scanline Fill Algorithm',
    difficulty: 3,
    description: 'Implement a simple scanline fill for a horizontal line segment. Given y-coordinate and x-range, return all pixels that should be filled.',
    starterCode: `def scanline_fill(y, x_start, x_end):
    """
    Fill pixels along a horizontal scanline.

    Args:
        y: Y coordinate of scanline
        x_start: Starting x coordinate
        x_end: Ending x coordinate

    Returns:
        list: List of (x, y) tuples to be filled
    """
    pass`,
    solution: `def scanline_fill(y, x_start, x_end):
    """
    Fill pixels along a horizontal scanline.

    Args:
        y: Y coordinate of scanline
        x_start: Starting x coordinate
        x_end: Ending x coordinate

    Returns:
        list: List of (x, y) tuples to be filled
    """
    # Ensure x_start is less than or equal to x_end
    if x_start > x_end:
        x_start, x_end = x_end, x_start

    pixels = []
    for x in range(x_start, x_end + 1):
        pixels.append((x, y))

    return pixels`,
    testCases: [
      { input: '5, 2, 6', expectedOutput: '[(2, 5), (3, 5), (4, 5), (5, 5), (6, 5)]', isHidden: false, description: 'Normal scanline' },
      { input: '0, 0, 0', expectedOutput: '[(0, 0)]', isHidden: false, description: 'Single pixel' },
      { input: '3, 8, 4', expectedOutput: '[(4, 3), (5, 3), (6, 3), (7, 3), (8, 3)]', isHidden: true, description: 'Reversed x coordinates' },
      { input: '10, 1, 10', expectedOutput: '[(1, 10), (2, 10), (3, 10), (4, 10), (5, 10), (6, 10), (7, 10), (8, 10), (9, 10), (10, 10)]', isHidden: true, description: 'Longer scanline' }
    ],
    hints: [
      'Generate all pixels from x_start to x_end at the same y coordinate',
      'Handle the case where x_start > x_end by swapping them',
      'Use range to iterate from x_start to x_end inclusive'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Depth Buffer Comparison',
    difficulty: 3,
    description: 'Implement depth buffer comparison. Given current depth value and new depth value, determine if the new pixel should be drawn (closer to camera means smaller z-value).',
    starterCode: `def should_update_pixel(current_depth, new_depth):
    """
    Determine if pixel should be updated based on depth test.
    Smaller depth values are closer to camera.

    Args:
        current_depth: Current depth in buffer (None if empty)
        new_depth: New fragment depth

    Returns:
        bool: True if pixel should be updated, False otherwise
    """
    pass`,
    solution: `def should_update_pixel(current_depth, new_depth):
    """
    Determine if pixel should be updated based on depth test.
    Smaller depth values are closer to camera.

    Args:
        current_depth: Current depth in buffer (None if empty)
        new_depth: New fragment depth

    Returns:
        bool: True if pixel should be updated, False otherwise
    """
    # If buffer is empty, always draw
    if current_depth is None:
        return True

    # Draw if new fragment is closer (smaller depth)
    return new_depth < current_depth`,
    testCases: [
      { input: 'None, 0.5', expectedOutput: 'True', isHidden: false, description: 'Empty buffer' },
      { input: '0.8, 0.3', expectedOutput: 'True', isHidden: false, description: 'Closer fragment' },
      { input: '0.3, 0.8', expectedOutput: 'False', isHidden: false, description: 'Farther fragment' },
      { input: '0.5, 0.5', expectedOutput: 'False', isHidden: true, description: 'Equal depth' },
      { input: '1.0, 0.1', expectedOutput: 'True', isHidden: true, description: 'Much closer fragment' }
    ],
    hints: [
      'If current_depth is None, the buffer is empty and should be filled',
      'Smaller depth values indicate objects closer to the camera',
      'Update only if new_depth < current_depth'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Triangle Bounding Box',
    difficulty: 3,
    description: 'Calculate the axis-aligned bounding box for a triangle given its three vertices. This is the first step in efficient triangle rasterization.',
    starterCode: `def triangle_bounding_box(x0, y0, x1, y1, x2, y2):
    """
    Calculate bounding box for a triangle.

    Args:
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        tuple: (min_x, min_y, max_x, max_y)
    """
    pass`,
    solution: `def triangle_bounding_box(x0, y0, x1, y1, x2, y2):
    """
    Calculate bounding box for a triangle.

    Args:
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        tuple: (min_x, min_y, max_x, max_y)
    """
    min_x = min(x0, x1, x2)
    max_x = max(x0, x1, x2)
    min_y = min(y0, y1, y2)
    max_y = max(y0, y1, y2)

    return (min_x, min_y, max_x, max_y)`,
    testCases: [
      { input: '0, 0, 4, 0, 2, 3', expectedOutput: '(0, 0, 4, 3)', isHidden: false, description: 'Simple triangle' },
      { input: '1, 1, 1, 1, 1, 1', expectedOutput: '(1, 1, 1, 1)', isHidden: false, description: 'Degenerate triangle (point)' },
      { input: '-2, -3, 5, 1, 0, 4', expectedOutput: '(-2, -3, 5, 4)', isHidden: true, description: 'Triangle with negative coordinates' },
      { input: '10, 20, 5, 15, 8, 25', expectedOutput: '(5, 15, 10, 25)', isHidden: true, description: 'Unordered vertices' }
    ],
    hints: [
      'Find the minimum x coordinate among all three vertices',
      'Find the maximum x coordinate among all three vertices',
      'Do the same for y coordinates',
      'Use min() and max() built-in functions'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Edge Function',
    difficulty: 4,
    description: 'Implement the edge function used in triangle rasterization. The edge function determines which side of an edge a point lies on.',
    starterCode: `def edge_function(ax, ay, bx, by, px, py):
    """
    Calculate edge function for point P relative to edge AB.
    Returns positive if P is on the left side of AB,
    negative if on the right side, zero if on the edge.

    Args:
        ax, ay: First vertex of edge
        bx, by: Second vertex of edge
        px, py: Point to test

    Returns:
        float: Edge function value
    """
    pass`,
    solution: `def edge_function(ax, ay, bx, by, px, py):
    """
    Calculate edge function for point P relative to edge AB.
    Returns positive if P is on the left side of AB,
    negative if on the right side, zero if on the edge.

    Args:
        ax, ay: First vertex of edge
        bx, by: Second vertex of edge
        px, py: Point to test

    Returns:
        float: Edge function value
    """
    return (bx - ax) * (py - ay) - (by - ay) * (px - ax)`,
    testCases: [
      { input: '0, 0, 4, 0, 2, 2', expectedOutput: '8', isHidden: false, description: 'Point above horizontal edge' },
      { input: '0, 0, 4, 0, 2, -2', expectedOutput: '-8', isHidden: false, description: 'Point below horizontal edge' },
      { input: '0, 0, 4, 0, 2, 0', expectedOutput: '0', isHidden: false, description: 'Point on edge' },
      { input: '0, 0, 0, 4, 2, 2', expectedOutput: '8', isHidden: true, description: 'Vertical edge' },
      { input: '1, 1, 5, 3, 3, 1', expectedOutput: '-4', isHidden: true, description: 'Diagonal edge' }
    ],
    hints: [
      'The edge function is based on the cross product',
      'Formula: (bx - ax) * (py - ay) - (by - ay) * (px - ax)',
      'Positive values indicate left side, negative indicates right side',
      'This is also known as the 2D cross product or implicit line equation'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Point in Triangle Test',
    difficulty: 4,
    description: 'Determine if a point is inside a triangle using the edge function. A point is inside if it is on the correct side of all three edges.',
    starterCode: `def point_in_triangle(px, py, x0, y0, x1, y1, x2, y2):
    """
    Test if point P is inside triangle with counter-clockwise vertices.

    Args:
        px, py: Point to test
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        bool: True if point is inside triangle, False otherwise
    """
    pass`,
    solution: `def point_in_triangle(px, py, x0, y0, x1, y1, x2, y2):
    """
    Test if point P is inside triangle with counter-clockwise vertices.

    Args:
        px, py: Point to test
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        bool: True if point is inside triangle, False otherwise
    """
    def edge_function(ax, ay, bx, by, px, py):
        return (bx - ax) * (py - ay) - (by - ay) * (px - ax)

    # Calculate edge functions for all three edges
    w0 = edge_function(x1, y1, x2, y2, px, py)
    w1 = edge_function(x2, y2, x0, y0, px, py)
    w2 = edge_function(x0, y0, x1, y1, px, py)

    # Point is inside if all edge functions have same sign (all >= 0 for CCW)
    return w0 >= 0 and w1 >= 0 and w2 >= 0`,
    testCases: [
      { input: '2, 1, 0, 0, 4, 0, 2, 3', expectedOutput: 'True', isHidden: false, description: 'Point inside triangle' },
      { input: '5, 5, 0, 0, 4, 0, 2, 3', expectedOutput: 'False', isHidden: false, description: 'Point outside triangle' },
      { input: '0, 0, 0, 0, 4, 0, 2, 3', expectedOutput: 'True', isHidden: false, description: 'Point on vertex' },
      { input: '2, 0, 0, 0, 4, 0, 2, 3', expectedOutput: 'True', isHidden: true, description: 'Point on edge' },
      { input: '1, 2, 0, 0, 4, 0, 2, 3', expectedOutput: 'True', isHidden: true, description: 'Point near edge but inside' }
    ],
    hints: [
      'Use the edge function for each of the three edges',
      'For counter-clockwise vertices, point is inside if all edge functions >= 0',
      'Check edges in order: (v1,v2), (v2,v0), (v0,v1)',
      'Include points on edges (use >= not just >)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Barycentric Coordinates',
    difficulty: 4,
    description: 'Calculate barycentric coordinates of a point with respect to a triangle. These coordinates are used for interpolation in rasterization.',
    starterCode: `def barycentric_coordinates(px, py, x0, y0, x1, y1, x2, y2):
    """
    Calculate barycentric coordinates (w0, w1, w2) for point P.
    The coordinates satisfy: P = w0*V0 + w1*V1 + w2*V2 where w0+w1+w2=1.

    Args:
        px, py: Point coordinates
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        tuple: (w0, w1, w2) barycentric coordinates, or None if triangle is degenerate
    """
    pass`,
    solution: `def barycentric_coordinates(px, py, x0, y0, x1, y1, x2, y2):
    """
    Calculate barycentric coordinates (w0, w1, w2) for point P.
    The coordinates satisfy: P = w0*V0 + w1*V1 + w2*V2 where w0+w1+w2=1.

    Args:
        px, py: Point coordinates
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        tuple: (w0, w1, w2) barycentric coordinates, or None if triangle is degenerate
    """
    def edge_function(ax, ay, bx, by, px, py):
        return (bx - ax) * (py - ay) - (by - ay) * (px - ax)

    # Calculate area of full triangle (twice the area)
    area = edge_function(x0, y0, x1, y1, x2, y2)

    if area == 0:
        return None  # Degenerate triangle

    # Calculate barycentric coordinates
    w0 = edge_function(x1, y1, x2, y2, px, py) / area
    w1 = edge_function(x2, y2, x0, y0, px, py) / area
    w2 = edge_function(x0, y0, x1, y1, px, py) / area

    return (w0, w1, w2)`,
    testCases: [
      { input: '0, 0, 0, 0, 4, 0, 2, 3', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Point at first vertex' },
      { input: '2, 1, 0, 0, 4, 0, 2, 3', expectedOutput: '(0.333, 0.333, 0.333)', isHidden: false, description: 'Point near centroid (rounded to 3 decimals)' },
      { input: '4, 0, 0, 0, 4, 0, 2, 3', expectedOutput: '(0.0, 1.0, 0.0)', isHidden: true, description: 'Point at second vertex' },
      { input: '2, 0, 0, 0, 4, 0, 2, 3', expectedOutput: '(0.5, 0.5, 0.0)', isHidden: true, description: 'Point on edge between v0 and v1' }
    ],
    hints: [
      'Use edge functions to calculate the barycentric coordinates',
      'w0 corresponds to the ratio of the area opposite to v0',
      'Calculate the total triangle area using edge_function(v0, v1, v2)',
      'Each coordinate is the edge function divided by the total area',
      'The three coordinates should sum to 1.0'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Interpolate Vertex Attributes',
    difficulty: 4,
    description: 'Given barycentric coordinates and vertex attributes (like colors or texture coordinates), interpolate the attribute value at a point inside the triangle.',
    starterCode: `def interpolate_attribute(w0, w1, w2, attr0, attr1, attr2):
    """
    Interpolate vertex attribute using barycentric coordinates.

    Args:
        w0, w1, w2: Barycentric coordinates
        attr0, attr1, attr2: Attribute values at each vertex

    Returns:
        float: Interpolated attribute value
    """
    pass`,
    solution: `def interpolate_attribute(w0, w1, w2, attr0, attr1, attr2):
    """
    Interpolate vertex attribute using barycentric coordinates.

    Args:
        w0, w1, w2: Barycentric coordinates
        attr0, attr1, attr2: Attribute values at each vertex

    Returns:
        float: Interpolated attribute value
    """
    return w0 * attr0 + w1 * attr1 + w2 * attr2`,
    testCases: [
      { input: '1.0, 0.0, 0.0, 10, 20, 30', expectedOutput: '10.0', isHidden: false, description: 'At first vertex' },
      { input: '0.5, 0.5, 0.0, 0, 100, 50', expectedOutput: '50.0', isHidden: false, description: 'Midpoint between v0 and v1' },
      { input: '0.333, 0.333, 0.334, 0, 0, 300', expectedOutput: '100.2', isHidden: false, description: 'Near centroid' },
      { input: '0.25, 0.25, 0.5, 100, 200, 300', expectedOutput: '225.0', isHidden: true, description: 'Weighted interpolation' },
      { input: '0.0, 1.0, 0.0, 5.5, 10.5, 15.5', expectedOutput: '10.5', isHidden: true, description: 'At second vertex with decimals' }
    ],
    hints: [
      'Linear interpolation formula: result = w0*attr0 + w1*attr1 + w2*attr2',
      'Barycentric coordinates provide the weights for interpolation',
      'This works for any attribute: colors, depths, texture coordinates, etc.'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Simple Triangle Rasterization',
    difficulty: 4,
    description: 'Implement basic triangle rasterization by combining bounding box iteration with point-in-triangle testing. Return all pixels that fall inside the triangle.',
    starterCode: `def rasterize_triangle(x0, y0, x1, y1, x2, y2):
    """
    Rasterize a triangle and return all pixels inside it.
    Vertices are in counter-clockwise order.

    Args:
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        list: List of (x, y) tuples representing pixels inside triangle
    """
    pass`,
    solution: `def rasterize_triangle(x0, y0, x1, y1, x2, y2):
    """
    Rasterize a triangle and return all pixels inside it.
    Vertices are in counter-clockwise order.

    Args:
        x0, y0: First vertex
        x1, y1: Second vertex
        x2, y2: Third vertex

    Returns:
        list: List of (x, y) tuples representing pixels inside triangle
    """
    def edge_function(ax, ay, bx, by, px, py):
        return (bx - ax) * (py - ay) - (by - ay) * (px - ax)

    # Calculate bounding box
    min_x = int(min(x0, x1, x2))
    max_x = int(max(x0, x1, x2))
    min_y = int(min(y0, y1, y2))
    max_y = int(max(y0, y1, y2))

    pixels = []

    # Iterate over bounding box
    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            # Test if pixel center is inside triangle
            w0 = edge_function(x1, y1, x2, y2, x, y)
            w1 = edge_function(x2, y2, x0, y0, x, y)
            w2 = edge_function(x0, y0, x1, y1, x, y)

            # Include if all edge functions are non-negative
            if w0 >= 0 and w1 >= 0 and w2 >= 0:
                pixels.append((x, y))

    return pixels`,
    testCases: [
      { input: '0, 0, 4, 0, 2, 2', expectedOutput: '[(1, 0), (2, 0), (3, 0), (1, 1), (2, 1), (3, 1), (2, 2)]', isHidden: false, description: 'Small triangle' },
      { input: '0, 0, 2, 0, 1, 1', expectedOutput: '[(0, 0), (1, 0), (2, 0), (1, 1)]', isHidden: false, description: 'Tiny triangle' },
      { input: '0, 0, 3, 0, 0, 3', expectedOutput: '[(0, 0), (1, 0), (2, 0), (3, 0), (0, 1), (1, 1), (2, 1), (0, 2), (1, 2), (0, 3)]', isHidden: true, description: 'Right triangle' }
    ],
    hints: [
      'First calculate the bounding box of the triangle',
      'Iterate through all pixels in the bounding box',
      'For each pixel, test if it is inside using edge functions',
      'Add pixels where all three edge functions are >= 0',
      'Convert coordinates to integers for pixel grid'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Coverage Calculation for Antialiasing',
    difficulty: 5,
    description: 'Calculate the approximate coverage (0.0 to 1.0) of a pixel by a line segment. This is used for antialiasing by determining how much of the pixel is covered.',
    starterCode: `def line_coverage(pixel_x, pixel_y, x0, y0, x1, y1):
    """
    Estimate coverage of a pixel by a line segment for antialiasing.
    Uses perpendicular distance from pixel center to line.
    Coverage decreases linearly from 1.0 at distance 0 to 0.0 at distance 0.5.

    Args:
        pixel_x, pixel_y: Pixel center coordinates
        x0, y0: Line start point
        x1, y1: Line end point

    Returns:
        float: Coverage value between 0.0 and 1.0
    """
    pass`,
    solution: `def line_coverage(pixel_x, pixel_y, x0, y0, x1, y1):
    """
    Estimate coverage of a pixel by a line segment for antialiasing.
    Uses perpendicular distance from pixel center to line.
    Coverage decreases linearly from 1.0 at distance 0 to 0.0 at distance 0.5.

    Args:
        pixel_x, pixel_y: Pixel center coordinates
        x0, y0: Line start point
        x1, y1: Line end point

    Returns:
        float: Coverage value between 0.0 and 1.0
    """
    import math

    # Calculate line vector
    dx = x1 - x0
    dy = y1 - y0

    # Calculate vector from line start to pixel
    px = pixel_x - x0
    py = pixel_y - y0

    # Calculate line length squared
    length_sq = dx * dx + dy * dy

    if length_sq == 0:
        # Degenerate line (point)
        dist = math.sqrt(px * px + py * py)
    else:
        # Calculate perpendicular distance using cross product
        cross = abs(dx * py - dy * px)
        length = math.sqrt(length_sq)
        dist = cross / length

    # Linear falloff: 1.0 at distance 0, 0.0 at distance 0.5
    coverage = max(0.0, 1.0 - dist / 0.5)

    return coverage`,
    testCases: [
      { input: '2, 0, 0, 0, 4, 0', expectedOutput: '1.0', isHidden: false, description: 'Pixel on horizontal line' },
      { input: '2, 0.25, 0, 0, 4, 0', expectedOutput: '0.5', isHidden: false, description: 'Pixel half pixel away' },
      { input: '2, 0.5, 0, 0, 4, 0', expectedOutput: '0.0', isHidden: false, description: 'Pixel at falloff distance' },
      { input: '2, 1, 0, 0, 4, 0', expectedOutput: '0.0', isHidden: true, description: 'Pixel far from line' },
      { input: '0, 0.1, 0, 0, 0, 4', expectedOutput: '0.8', isHidden: true, description: 'Pixel near vertical line' }
    ],
    hints: [
      'Calculate perpendicular distance from pixel to infinite line',
      'Use cross product formula: |dx*py - dy*px| / sqrt(dx² + dy²)',
      'Linear falloff: coverage = max(0, 1 - distance/0.5)',
      'Coverage is 1.0 when distance is 0, 0.0 when distance >= 0.5',
      'Handle degenerate case when line has zero length'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t4-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Multisample Antialiasing (MSAA)',
    difficulty: 5,
    description: 'Implement 4x MSAA for a triangle by testing 4 sample points per pixel. Return the coverage fraction (0.0, 0.25, 0.5, 0.75, or 1.0) for a given pixel.',
    starterCode: `def msaa_coverage(pixel_x, pixel_y, x0, y0, x1, y1, x2, y2):
    """
    Calculate 4x MSAA coverage for a pixel.
    Uses 4 sample points in a rotated grid pattern:
    - Sample offsets from pixel center: (-0.25, -0.25), (0.25, -0.25), (-0.25, 0.25), (0.25, 0.25)

    Args:
        pixel_x, pixel_y: Pixel coordinates (center)
        x0, y0: First triangle vertex
        x1, y1: Second triangle vertex
        x2, y2: Third triangle vertex

    Returns:
        float: Coverage fraction (0.0, 0.25, 0.5, 0.75, or 1.0)
    """
    pass`,
    solution: `def msaa_coverage(pixel_x, pixel_y, x0, y0, x1, y1, x2, y2):
    """
    Calculate 4x MSAA coverage for a pixel.
    Uses 4 sample points in a rotated grid pattern:
    - Sample offsets from pixel center: (-0.25, -0.25), (0.25, -0.25), (-0.25, 0.25), (0.25, 0.25)

    Args:
        pixel_x, pixel_y: Pixel coordinates (center)
        x0, y0: First triangle vertex
        x1, y1: Second triangle vertex
        x2, y2: Third triangle vertex

    Returns:
        float: Coverage fraction (0.0, 0.25, 0.5, 0.75, or 1.0)
    """
    def edge_function(ax, ay, bx, by, px, py):
        return (bx - ax) * (py - ay) - (by - ay) * (px - ax)

    def point_in_triangle(px, py):
        w0 = edge_function(x1, y1, x2, y2, px, py)
        w1 = edge_function(x2, y2, x0, y0, px, py)
        w2 = edge_function(x0, y0, x1, y1, px, py)
        return w0 >= 0 and w1 >= 0 and w2 >= 0

    # 4 sample points in rotated grid pattern
    samples = [
        (pixel_x - 0.25, pixel_y - 0.25),
        (pixel_x + 0.25, pixel_y - 0.25),
        (pixel_x - 0.25, pixel_y + 0.25),
        (pixel_x + 0.25, pixel_y + 0.25)
    ]

    # Count how many samples are inside triangle
    covered = sum(1 for sx, sy in samples if point_in_triangle(sx, sy))

    # Return coverage fraction
    return covered / 4.0`,
    testCases: [
      { input: '2, 1, 0, 0, 4, 0, 2, 3', expectedOutput: '1.0', isHidden: false, description: 'Pixel fully inside triangle' },
      { input: '0, 0, 0, 0, 4, 0, 2, 3', expectedOutput: '0.25', isHidden: false, description: 'Pixel at vertex' },
      { input: '5, 5, 0, 0, 4, 0, 2, 3', expectedOutput: '0.0', isHidden: false, description: 'Pixel outside triangle' },
      { input: '1, 1, 0, 0, 4, 0, 2, 3', expectedOutput: '0.75', isHidden: true, description: 'Pixel mostly inside' },
      { input: '3, 1, 0, 0, 4, 0, 2, 3', expectedOutput: '0.5', isHidden: true, description: 'Pixel half covered' }
    ],
    hints: [
      'Define 4 sample points offset from pixel center',
      'Use offsets: (-0.25, -0.25), (0.25, -0.25), (-0.25, 0.25), (0.25, 0.25)',
      'Test each sample point using point-in-triangle test',
      'Count how many samples are inside',
      'Return count/4.0 as the coverage fraction',
      'Reuse edge_function and point_in_triangle logic'
    ],
    language: 'python'
  }
];
