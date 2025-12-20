import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs403-t7-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Convex Hull - Graham Scan',
    difficulty: 4,
    description: 'Implement Graham\'s scan algorithm to find the convex hull of a set of 2D points in O(n log n) time.',
    starterCode: `def convex_hull(points):
    """
    Find convex hull using Graham's scan algorithm.

    Args:
        points: List of (x, y) tuples representing 2D points.

    Returns:
        list: Points on the convex hull in counterclockwise order.
    """
    # Your code here
    pass`,
    solution: `def convex_hull(points):
    """
    Find convex hull using Graham's scan algorithm.

    Args:
        points: List of (x, y) tuples representing 2D points.

    Returns:
        list: Points on the convex hull in counterclockwise order.
    """
    def cross_product(o, a, b):
        """Calculate cross product of vectors OA and OB."""
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    # Sort points lexicographically (first by x, then by y)
    points = sorted(set(points))

    if len(points) <= 2:
        return points

    # Build lower hull
    lower = []
    for p in points:
        while len(lower) >= 2 and cross_product(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # Build upper hull
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross_product(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    # Remove last point of each half because it's repeated
    return lower[:-1] + upper[:-1]`,
    testCases: [
      {
        input: 'points = [(0, 0), (1, 1), (2, 2), (0, 2), (2, 0)]',
        isHidden: false,
        description: 'Simple convex hull with some interior points'
      },
      {
        input: 'points = [(0, 0), (1, 0), (1, 1), (0, 1)]',
        isHidden: false,
        description: 'Square - all points on hull'
      },
      {
        input: 'points = [(0, 0), (3, 3), (1, 1), (2, 2), (4, 4), (0, 4), (4, 0)]',
        isHidden: false,
        description: 'Points with collinear segments'
      }
    ],
    hints: [
      'Sort points lexicographically (by x-coordinate, then y-coordinate)',
      'Build lower hull by scanning left to right',
      'Build upper hull by scanning right to left',
      'Use cross product to determine if three points make a left or right turn',
      'Remove points that create right turns (non-convex angles)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Closest Pair of Points',
    difficulty: 4,
    description: 'Find the closest pair of points in 2D using divide-and-conquer in O(n log n) time.',
    starterCode: `def closest_pair(points):
    """
    Find the closest pair of points using divide-and-conquer.

    Args:
        points: List of (x, y) tuples representing 2D points.

    Returns:
        tuple: (distance, point1, point2) where distance is the minimum distance.
    """
    # Your code here
    pass`,
    solution: `def closest_pair(points):
    """
    Find the closest pair of points using divide-and-conquer.

    Args:
        points: List of (x, y) tuples representing 2D points.

    Returns:
        tuple: (distance, point1, point2) where distance is the minimum distance.
    """
    import math

    def distance(p1, p2):
        return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

    def brute_force(points):
        min_dist = float('inf')
        pair = (None, None)
        for i in range(len(points)):
            for j in range(i + 1, len(points)):
                d = distance(points[i], points[j])
                if d < min_dist:
                    min_dist = d
                    pair = (points[i], points[j])
        return min_dist, pair

    def closest_pair_recursive(px, py):
        n = len(px)

        # Use brute force for small cases
        if n <= 3:
            dist, pair = brute_force(px)
            return dist, pair

        # Divide
        mid = n // 2
        midpoint = px[mid]

        # Split points by x-coordinate
        pyl = [p for p in py if p[0] <= midpoint[0]]
        pyr = [p for p in py if p[0] > midpoint[0]]

        # Conquer
        dl, pair_l = closest_pair_recursive(px[:mid], pyl)
        dr, pair_r = closest_pair_recursive(px[mid:], pyr)

        # Find minimum of two sides
        d = min(dl, dr)
        min_pair = pair_l if dl < dr else pair_r

        # Build strip of points closer than d to dividing line
        strip = [p for p in py if abs(p[0] - midpoint[0]) < d]

        # Check strip for closer pairs
        for i in range(len(strip)):
            j = i + 1
            while j < len(strip) and (strip[j][1] - strip[i][1]) < d:
                dist = distance(strip[i], strip[j])
                if dist < d:
                    d = dist
                    min_pair = (strip[i], strip[j])
                j += 1

        return d, min_pair

    # Sort points by x and y coordinates
    px = sorted(points, key=lambda p: p[0])
    py = sorted(points, key=lambda p: p[1])

    dist, pair = closest_pair_recursive(px, py)
    return (dist, pair[0], pair[1])`,
    testCases: [
      {
        input: 'points = [(0, 0), (1, 1), (2, 2), (5, 5), (6, 6)]',
        isHidden: false,
        description: 'Points along a diagonal'
      },
      {
        input: 'points = [(0, 0), (7, 6), (2, 20), (12, 5), (16, 16), (5, 8)]',
        isHidden: false,
        description: 'Random scattered points'
      },
      {
        input: 'points = [(1, 1), (1, 2), (3, 4), (5, 6)]',
        isHidden: false,
        description: 'Small set with vertical pair'
      }
    ],
    hints: [
      'Sort points by x-coordinate and y-coordinate (maintain both orderings)',
      'Divide points by x-coordinate into two halves',
      'Recursively find closest pairs in each half',
      'Check points in the middle strip (within d of dividing line)',
      'For each point in strip, only check next 7 points (geometric property)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex03',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Line Segment Intersection',
    difficulty: 3,
    description: 'Check if two line segments intersect.',
    starterCode: `def segments_intersect(p1, q1, p2, q2):
    """
    Check if line segment p1q1 intersects with line segment p2q2.

    Args:
        p1, q1: Endpoints of first segment (tuples (x, y)).
        p2, q2: Endpoints of second segment (tuples (x, y)).

    Returns:
        bool: True if segments intersect.
    """
    # Your code here
    pass`,
    solution: `def segments_intersect(p1, q1, p2, q2):
    """
    Check if line segment p1q1 intersects with line segment p2q2.

    Args:
        p1, q1: Endpoints of first segment (tuples (x, y)).
        p2, q2: Endpoints of second segment (tuples (x, y)).

    Returns:
        bool: True if segments intersect.
    """
    def orientation(p, q, r):
        """
        Find orientation of ordered triplet (p, q, r).
        Returns:
            0: Collinear
            1: Clockwise
            2: Counterclockwise
        """
        val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
        if abs(val) < 1e-9:
            return 0
        return 1 if val > 0 else 2

    def on_segment(p, q, r):
        """Check if point q lies on segment pr (given they are collinear)."""
        return (q[0] <= max(p[0], r[0]) and q[0] >= min(p[0], r[0]) and
                q[1] <= max(p[1], r[1]) and q[1] >= min(p[1], r[1]))

    o1 = orientation(p1, q1, p2)
    o2 = orientation(p1, q1, q2)
    o3 = orientation(p2, q2, p1)
    o4 = orientation(p2, q2, q1)

    # General case
    if o1 != o2 and o3 != o4:
        return True

    # Special cases (collinear points)
    if o1 == 0 and on_segment(p1, p2, q1):
        return True
    if o2 == 0 and on_segment(p1, q2, q1):
        return True
    if o3 == 0 and on_segment(p2, p1, q2):
        return True
    if o4 == 0 and on_segment(p2, q1, q2):
        return True

    return False`,
    testCases: [
      {
        input: 'p1 = (0, 0), q1 = (10, 10), p2 = (0, 10), q2 = (10, 0)',
        isHidden: false,
        description: 'Intersecting segments forming an X'
      },
      {
        input: 'p1 = (0, 0), q1 = (5, 5), p2 = (0, 5), q2 = (5, 0)',
        isHidden: false,
        description: 'Non-intersecting parallel-ish segments'
      },
      {
        input: 'p1 = (0, 0), q1 = (10, 0), p2 = (5, 0), q2 = (15, 0)',
        isHidden: false,
        description: 'Collinear overlapping segments'
      }
    ],
    hints: [
      'Use orientation test to check if points are clockwise, counterclockwise, or collinear',
      'Two segments intersect if orientations differ on both sides',
      'Handle special cases: collinear points',
      'Check if collinear point lies on segment',
      'Orientation test: sign of cross product'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex04',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Point in Polygon',
    difficulty: 3,
    description: 'Determine if a point lies inside a polygon using ray casting algorithm.',
    starterCode: `def point_in_polygon(point, polygon):
    """
    Check if point is inside polygon.

    Args:
        point: Tuple (x, y).
        polygon: List of vertices [(x1, y1), (x2, y2), ...] in order.

    Returns:
        bool: True if point is inside polygon.
    """
    # Your code here
    pass`,
    solution: `def point_in_polygon(point, polygon):
    """
    Check if point is inside polygon.

    Args:
        point: Tuple (x, y).
        polygon: List of vertices [(x1, y1), (x2, y2), ...] in order.

    Returns:
        bool: True if point is inside polygon.
    """
    x, y = point
    n = len(polygon)
    inside = False

    p1x, p1y = polygon[0]
    for i in range(1, n + 1):
        p2x, p2y = polygon[i % n]

        # Check if ray from point crosses edge
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside

        p1x, p1y = p2x, p2y

    return inside`,
    testCases: [
      {
        input: 'point = (5, 5), polygon = [(0, 0), (10, 0), (10, 10), (0, 10)]',
        isHidden: false,
        description: 'Point inside square'
      },
      {
        input: 'point = (15, 5), polygon = [(0, 0), (10, 0), (10, 10), (0, 10)]',
        isHidden: false,
        description: 'Point outside square'
      },
      {
        input: 'point = (2, 2), polygon = [(0, 0), (4, 0), (4, 4), (2, 6), (0, 4)]',
        isHidden: false,
        description: 'Point in non-convex polygon'
      }
    ],
    hints: [
      'Ray casting algorithm: cast ray from point to infinity',
      'Count how many edges the ray crosses',
      'Odd number of crossings = inside, even = outside',
      'Handle edge cases: ray passing through vertex',
      'Works for both convex and non-convex polygons'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex05',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Jarvis March (Gift Wrapping)',
    difficulty: 3,
    description: 'Implement Jarvis march algorithm for convex hull in O(nh) time.',
    starterCode: `def jarvis_march(points):
    """
    Find convex hull using Jarvis march (gift wrapping) algorithm.

    Args:
        points: List of (x, y) tuples.

    Returns:
        list: Points on convex hull in counterclockwise order.
    """
    # Your code here
    pass`,
    solution: `def jarvis_march(points):
    """
    Find convex hull using Jarvis march (gift wrapping) algorithm.

    Args:
        points: List of (x, y) tuples.

    Returns:
        list: Points on convex hull in counterclockwise order.
    """
    n = len(points)
    if n < 3:
        return points

    def orientation(p, q, r):
        """Return orientation: 0=collinear, 1=clockwise, 2=counterclockwise."""
        val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
        if abs(val) < 1e-9:
            return 0
        return 1 if val > 0 else 2

    # Find leftmost point
    leftmost = min(range(n), key=lambda i: (points[i][0], points[i][1]))

    hull = []
    current = leftmost

    while True:
        hull.append(points[current])

        # Find most counterclockwise point from current
        next_point = (current + 1) % n
        for i in range(n):
            if orientation(points[current], points[i], points[next_point]) == 2:
                next_point = i

        current = next_point

        # Stop when we return to starting point
        if current == leftmost:
            break

    return hull`,
    testCases: [
      {
        input: 'points = [(0, 0), (1, 1), (2, 2), (0, 2), (2, 0), (1, 0.5)]',
        isHidden: false,
        description: 'Points with some interior'
      },
      {
        input: 'points = [(0, 0), (1, 0), (1, 1), (0, 1)]',
        isHidden: false,
        description: 'Square'
      },
      {
        input: 'points = [(0, 0), (2, 1), (1, 2), (0, 2)]',
        isHidden: false,
        description: 'Irregular quadrilateral'
      }
    ],
    hints: [
      'Start from leftmost point (guaranteed to be on hull)',
      'At each step, find most counterclockwise point',
      'Use orientation test to compare angles',
      'Wrap around the hull like wrapping a gift',
      'Stop when returning to start point',
      'Time complexity: O(nh) where h is hull size'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex06',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Area of Polygon',
    difficulty: 1,
    description: 'Calculate the area of a polygon using the shoelace formula.',
    starterCode: `def polygon_area(vertices):
    """
    Calculate area of polygon using shoelace formula.

    Args:
        vertices: List of (x, y) tuples in order (clockwise or counterclockwise).

    Returns:
        float: Area of polygon.
    """
    # Your code here
    pass`,
    solution: `def polygon_area(vertices):
    """
    Calculate area of polygon using shoelace formula.

    Args:
        vertices: List of (x, y) tuples in order (clockwise or counterclockwise).

    Returns:
        float: Area of polygon.
    """
    n = len(vertices)
    area = 0.0

    for i in range(n):
        j = (i + 1) % n
        area += vertices[i][0] * vertices[j][1]
        area -= vertices[j][0] * vertices[i][1]

    return abs(area) / 2.0`,
    testCases: [
      {
        input: 'vertices = [(0, 0), (4, 0), (4, 3), (0, 3)]',
        isHidden: false,
        description: 'Rectangle: 4 x 3 = 12'
      },
      {
        input: 'vertices = [(0, 0), (2, 0), (1, 2)]',
        isHidden: false,
        description: 'Triangle: area = 2'
      },
      {
        input: 'vertices = [(0, 0), (1, 0), (1, 1), (0, 1)]',
        isHidden: false,
        description: 'Unit square: area = 1'
      }
    ],
    hints: [
      'Shoelace formula: sum of (x_i * y_{i+1} - x_{i+1} * y_i)',
      'Divide result by 2 and take absolute value',
      'Works for any simple polygon (no self-intersections)',
      'Order of vertices matters for sign, but we take abs',
      'Also known as surveyor\'s formula'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex07',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Convex Polygon Check',
    difficulty: 2,
    description: 'Determine if a polygon is convex.',
    starterCode: `def is_convex(polygon):
    """
    Check if polygon is convex.

    Args:
        polygon: List of vertices [(x1, y1), (x2, y2), ...] in order.

    Returns:
        bool: True if polygon is convex.
    """
    # Your code here
    pass`,
    solution: `def is_convex(polygon):
    """
    Check if polygon is convex.

    Args:
        polygon: List of vertices [(x1, y1), (x2, y2), ...] in order.

    Returns:
        bool: True if polygon is convex.
    """
    def cross_product_sign(o, a, b):
        """Return sign of cross product of vectors OA and OB."""
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    n = len(polygon)
    if n < 3:
        return False

    sign = None

    for i in range(n):
        o = polygon[i]
        a = polygon[(i + 1) % n]
        b = polygon[(i + 2) % n]

        cross = cross_product_sign(o, a, b)

        if abs(cross) > 1e-9:  # Not collinear
            if sign is None:
                sign = cross > 0
            elif (cross > 0) != sign:
                return False  # Sign changed = not convex

    return True`,
    testCases: [
      {
        input: 'polygon = [(0, 0), (2, 0), (2, 2), (0, 2)]',
        isHidden: false,
        description: 'Square - convex'
      },
      {
        input: 'polygon = [(0, 0), (2, 0), (2, 2), (1, 1), (0, 2)]',
        isHidden: false,
        description: 'Non-convex polygon (has reflex angle)'
      },
      {
        input: 'polygon = [(0, 0), (1, 0), (2, 1), (1, 2), (0, 1)]',
        isHidden: false,
        description: 'Convex pentagon'
      }
    ],
    hints: [
      'For each consecutive triple of vertices, compute cross product',
      'If all cross products have same sign, polygon is convex',
      'If signs differ, there is a reflex angle (not convex)',
      'Cross product tells if turn is left or right',
      'Ignore collinear points (cross product = 0)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex08',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: '2D Range Query',
    difficulty: 3,
    description: 'Find all points within a rectangular range.',
    starterCode: `def range_query(points, rect):
    """
    Find all points within rectangular range.

    Args:
        points: List of (x, y) tuples.
        rect: Tuple (x_min, y_min, x_max, y_max).

    Returns:
        list: Points inside rectangle.
    """
    # Your code here
    pass`,
    solution: `def range_query(points, rect):
    """
    Find all points within rectangular range.

    Args:
        points: List of (x, y) tuples.
        rect: Tuple (x_min, y_min, x_max, y_max).

    Returns:
        list: Points inside rectangle.
    """
    x_min, y_min, x_max, y_max = rect
    result = []

    for x, y in points:
        if x_min <= x <= x_max and y_min <= y <= y_max:
            result.append((x, y))

    return result`,
    testCases: [
      {
        input: 'points = [(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)], rect = (2, 2, 4, 4)',
        isHidden: false,
        description: 'Points in and out of range'
      },
      {
        input: 'points = [(0, 0), (10, 10), (5, 5)], rect = (3, 3, 7, 7)',
        isHidden: false,
        description: 'Single point in range'
      },
      {
        input: 'points = [(1, 1), (2, 2), (3, 3)], rect = (5, 5, 10, 10)',
        isHidden: false,
        description: 'No points in range'
      }
    ],
    hints: [
      'Simple approach: check each point individually',
      'Point (x, y) is inside if x_min ≤ x ≤ x_max and y_min ≤ y ≤ y_max',
      'Time complexity: O(n) for n points',
      'For better performance, use data structures like kd-tree or range tree',
      'This is orthogonal range searching problem'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex09',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Line Sweep - Rectangle Intersection',
    difficulty: 4,
    description: 'Find if any pair of axis-aligned rectangles intersect using line sweep.',
    starterCode: `def rectangles_intersect(rectangles):
    """
    Check if any two rectangles intersect using line sweep.

    Args:
        rectangles: List of rectangles [(x1, y1, x2, y2), ...] where (x1,y1) is bottom-left.

    Returns:
        bool: True if any two rectangles intersect.
    """
    # Your code here
    pass`,
    solution: `def rectangles_intersect(rectangles):
    """
    Check if any two rectangles intersect using line sweep.

    Args:
        rectangles: List of rectangles [(x1, y1, x2, y2), ...] where (x1,y1) is bottom-left.

    Returns:
        bool: True if any two rectangles intersect.
    """
    # Create events: (x, type, rect_index, y1, y2)
    # type: 0=start, 1=end
    events = []

    for i, (x1, y1, x2, y2) in enumerate(rectangles):
        events.append((x1, 0, i, y1, y2))  # Start
        events.append((x2, 1, i, y1, y2))  # End

    # Sort by x-coordinate
    events.sort()

    # Active rectangles: dict of index -> (y1, y2)
    active = {}

    for x, event_type, idx, y1, y2 in events:
        if event_type == 0:  # Start
            # Check if new rectangle intersects with any active
            for other_idx, (other_y1, other_y2) in active.items():
                # Check y-interval overlap
                if not (y2 < other_y1 or y1 > other_y2):
                    return True
            active[idx] = (y1, y2)
        else:  # End
            if idx in active:
                del active[idx]

    return False`,
    testCases: [
      {
        input: 'rectangles = [(0, 0, 2, 2), (1, 1, 3, 3)]',
        isHidden: false,
        description: 'Two overlapping rectangles'
      },
      {
        input: 'rectangles = [(0, 0, 1, 1), (2, 2, 3, 3)]',
        isHidden: false,
        description: 'Two non-overlapping rectangles'
      },
      {
        input: 'rectangles = [(0, 0, 2, 2), (1, 0, 3, 2), (2, 0, 4, 2)]',
        isHidden: false,
        description: 'Multiple rectangles with overlaps'
      }
    ],
    hints: [
      'Sweep vertical line from left to right',
      'Maintain set of active rectangles (those intersected by sweep line)',
      'When rectangle starts, check if it overlaps with active rectangles',
      'Two rectangles overlap if x-intervals and y-intervals both overlap',
      'Events: rectangle start and end',
      'Check y-interval overlap: not (y1_max < y2_min or y1_min > y2_max)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex10',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Polygon Triangulation',
    difficulty: 5,
    description: 'Triangulate a simple polygon using ear clipping method.',
    starterCode: `def triangulate_polygon(polygon):
    """
    Triangulate simple polygon using ear clipping.

    Args:
        polygon: List of vertices [(x1, y1), ...] in counterclockwise order.

    Returns:
        list: List of triangles [(p1, p2, p3), ...].
    """
    # Your code here
    pass`,
    solution: `def triangulate_polygon(polygon):
    """
    Triangulate simple polygon using ear clipping.

    Args:
        polygon: List of vertices [(x1, y1), ...] in counterclockwise order.

    Returns:
        list: List of triangles [(p1, p2, p3), ...].
    """
    def cross_product(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    def point_in_triangle(p, a, b, c):
        """Check if point p is inside triangle abc."""
        v0 = (c[0] - a[0], c[1] - a[1])
        v1 = (b[0] - a[0], b[1] - a[1])
        v2 = (p[0] - a[0], p[1] - a[1])

        dot00 = v0[0] * v0[0] + v0[1] * v0[1]
        dot01 = v0[0] * v1[0] + v0[1] * v1[1]
        dot02 = v0[0] * v2[0] + v0[1] * v2[1]
        dot11 = v1[0] * v1[0] + v1[1] * v1[1]
        dot12 = v1[0] * v2[0] + v1[1] * v2[1]

        inv_denom = 1 / (dot00 * dot11 - dot01 * dot01)
        u = (dot11 * dot02 - dot01 * dot12) * inv_denom
        v = (dot00 * dot12 - dot01 * dot02) * inv_denom

        return (u >= 0) and (v >= 0) and (u + v <= 1)

    def is_ear(polygon, i):
        """Check if vertex i forms an ear."""
        n = len(polygon)
        prev = polygon[(i - 1) % n]
        curr = polygon[i]
        next = polygon[(i + 1) % n]

        # Check if convex
        if cross_product(prev, curr, next) <= 0:
            return False

        # Check if no other vertex is inside triangle
        for j in range(n):
            if j == i or j == (i - 1) % n or j == (i + 1) % n:
                continue
            if point_in_triangle(polygon[j], prev, curr, next):
                return False

        return True

    triangles = []
    vertices = list(polygon)

    while len(vertices) > 3:
        n = len(vertices)
        ear_found = False

        for i in range(n):
            if is_ear(vertices, i):
                # Cut off ear
                prev = vertices[(i - 1) % n]
                curr = vertices[i]
                next = vertices[(i + 1) % n]

                triangles.append((prev, curr, next))
                vertices.pop(i)
                ear_found = True
                break

        if not ear_found:
            break  # Failed to triangulate

    if len(vertices) == 3:
        triangles.append(tuple(vertices))

    return triangles`,
    testCases: [
      {
        input: 'polygon = [(0, 0), (4, 0), (4, 3), (0, 3)]',
        isHidden: false,
        description: 'Rectangle - 2 triangles'
      },
      {
        input: 'polygon = [(0, 0), (2, 0), (3, 2), (1, 3), (0, 2)]',
        isHidden: false,
        description: 'Pentagon - 3 triangles'
      },
      {
        input: 'polygon = [(0, 0), (1, 0), (1, 1)]',
        isHidden: false,
        description: 'Already a triangle'
      }
    ],
    hints: [
      'Ear clipping: find convex vertex (ear) and cut it off',
      'Ear: three consecutive vertices where triangle contains no other vertices',
      'Check if vertex is convex using cross product',
      'For each convex vertex, check if triangle contains other vertices',
      'Repeat until only one triangle remains',
      'Time complexity: O(n^2) for simple ear clipping'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex11',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Rotating Calipers - Diameter',
    difficulty: 4,
    description: 'Find the diameter of a convex polygon using rotating calipers.',
    starterCode: `def convex_polygon_diameter(polygon):
    """
    Find diameter (maximum distance between any two vertices) of convex polygon.

    Args:
        polygon: List of vertices in counterclockwise order (convex hull).

    Returns:
        tuple: (max_distance, point1, point2)
    """
    # Your code here
    pass`,
    solution: `def convex_polygon_diameter(polygon):
    """
    Find diameter (maximum distance between any two vertices) of convex polygon.

    Args:
        polygon: List of vertices in counterclockwise order (convex hull).

    Returns:
        tuple: (max_distance, point1, point2)
    """
    import math

    def distance(p1, p2):
        return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

    n = len(polygon)
    if n < 2:
        return 0, None, None

    # Find initial antipodal pair
    k = 1
    while distance(polygon[k + 1], polygon[0]) > distance(polygon[k], polygon[0]):
        k += 1

    max_dist = 0
    best_pair = (polygon[0], polygon[k])

    i, j = 0, k

    # Rotate calipers
    for _ in range(n):
        # Check current pair
        dist = distance(polygon[i], polygon[j])
        if dist > max_dist:
            max_dist = dist
            best_pair = (polygon[i], polygon[j])

        # Rotate caliper
        # Check which edge to advance along
        i_next = (i + 1) % n
        j_next = (j + 1) % n

        # Vector from i to i_next
        v1 = (polygon[i_next][0] - polygon[i][0], polygon[i_next][1] - polygon[i][1])
        # Vector from j to j_next
        v2 = (polygon[j_next][0] - polygon[j][0], polygon[j_next][1] - polygon[j][1])

        # Cross product determines which to advance
        cross = v1[0] * v2[1] - v1[1] * v2[0]

        if cross < 0:
            i = i_next
        else:
            j = j_next

    return max_dist, best_pair[0], best_pair[1]`,
    testCases: [
      {
        input: 'polygon = [(0, 0), (4, 0), (4, 3), (0, 3)]',
        isHidden: false,
        description: 'Rectangle - diameter is diagonal'
      },
      {
        input: 'polygon = [(0, 0), (1, 0), (1, 1), (0, 1)]',
        isHidden: false,
        description: 'Unit square'
      },
      {
        input: 'polygon = [(0, 0), (3, 0), (3, 3), (1, 4), (0, 3)]',
        isHidden: false,
        description: 'Convex pentagon'
      }
    ],
    hints: [
      'Rotating calipers: rotate two parallel lines around convex hull',
      'Diameter is between antipodal pair of vertices',
      'Start with initial antipodal pair',
      'Rotate calipers by advancing along edges',
      'Check distance at each step',
      'O(n) time for convex polygon'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex12',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Voronoi Cell',
    difficulty: 5,
    description: 'Find which site a query point belongs to in Voronoi diagram (nearest neighbor).',
    starterCode: `def nearest_site(query, sites):
    """
    Find nearest site to query point (Voronoi cell membership).

    Args:
        query: Query point (x, y).
        sites: List of site points [(x1, y1), (x2, y2), ...].

    Returns:
        tuple: (nearest_site, distance)
    """
    # Your code here
    pass`,
    solution: `def nearest_site(query, sites):
    """
    Find nearest site to query point (Voronoi cell membership).

    Args:
        query: Query point (x, y).
        sites: List of site points [(x1, y1), (x2, y2), ...].

    Returns:
        tuple: (nearest_site, distance)
    """
    import math

    def distance(p1, p2):
        return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

    if not sites:
        return None, float('inf')

    min_dist = float('inf')
    nearest = None

    for site in sites:
        dist = distance(query, site)
        if dist < min_dist:
            min_dist = dist
            nearest = site

    return nearest, min_dist`,
    testCases: [
      {
        input: 'query = (2, 2), sites = [(0, 0), (5, 5), (0, 5)]',
        isHidden: false,
        description: 'Find nearest site'
      },
      {
        input: 'query = (1, 1), sites = [(0, 0), (2, 2), (0, 2)]',
        isHidden: false,
        description: 'Query near one site'
      },
      {
        input: 'query = (5, 5), sites = [(0, 0), (10, 10)]',
        isHidden: false,
        description: 'Query equidistant to two sites'
      }
    ],
    hints: [
      'Voronoi cell: region of points closest to a particular site',
      'Simple approach: compute distance to all sites',
      'Return site with minimum distance',
      'O(n) time for n sites',
      'For faster queries, preprocess Voronoi diagram',
      'This is nearest neighbor search'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex13',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Circle-Circle Intersection',
    difficulty: 2,
    description: 'Find intersection points of two circles.',
    starterCode: `def circle_intersection(c1, r1, c2, r2):
    """
    Find intersection points of two circles.

    Args:
        c1, c2: Centers (x, y) of circles.
        r1, r2: Radii of circles.

    Returns:
        list: Intersection points [(x1, y1), (x2, y2)] or empty if no intersection.
    """
    # Your code here
    pass`,
    solution: `def circle_intersection(c1, r1, c2, r2):
    """
    Find intersection points of two circles.

    Args:
        c1, c2: Centers (x, y) of circles.
        r1, r2: Radii of circles.

    Returns:
        list: Intersection points [(x1, y1), (x2, y2)] or empty if no intersection.
    """
    import math

    x1, y1 = c1
    x2, y2 = c2

    # Distance between centers
    d = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

    # Check if circles intersect
    if d > r1 + r2:  # Too far apart
        return []
    if d < abs(r1 - r2):  # One inside other
        return []
    if d == 0 and r1 == r2:  # Same circle
        return []  # Infinite intersections

    # Calculate intersection points
    a = (r1**2 - r2**2 + d**2) / (2 * d)
    h = math.sqrt(r1**2 - a**2)

    # Point on line between centers
    px = x1 + a * (x2 - x1) / d
    py = y1 + a * (y2 - y1) / d

    # Intersection points
    ix1 = px + h * (y2 - y1) / d
    iy1 = py - h * (x2 - x1) / d

    ix2 = px - h * (y2 - y1) / d
    iy2 = py + h * (x2 - x1) / d

    if abs(ix1 - ix2) < 1e-9 and abs(iy1 - iy2) < 1e-9:
        return [(ix1, iy1)]  # Tangent (one point)
    else:
        return [(ix1, iy1), (ix2, iy2)]`,
    testCases: [
      {
        input: 'c1 = (0, 0), r1 = 5, c2 = (5, 0), r2 = 5',
        isHidden: false,
        description: 'Two intersecting circles'
      },
      {
        input: 'c1 = (0, 0), r1 = 3, c2 = (10, 0), r2 = 3',
        isHidden: false,
        description: 'Non-intersecting circles'
      },
      {
        input: 'c1 = (0, 0), r1 = 5, c2 = (5, 0), r2 = 0',
        isHidden: false,
        description: 'Circle and point'
      }
    ],
    hints: [
      'Check distance between centers vs sum and difference of radii',
      'If d > r1 + r2: circles too far apart',
      'If d < |r1 - r2|: one circle inside other',
      'Use geometry to find intersection points',
      'Find point on line between centers, then perpendicular offset',
      'Handle special cases: tangent (one point), no intersection'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex14',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Smallest Enclosing Circle',
    difficulty: 5,
    description: 'Find smallest circle that encloses all points using Welzl\'s algorithm.',
    starterCode: `def smallest_enclosing_circle(points):
    """
    Find smallest circle that encloses all points.

    Args:
        points: List of (x, y) tuples.

    Returns:
        tuple: (center, radius) where center is (x, y).
    """
    # Your code here
    pass`,
    solution: `def smallest_enclosing_circle(points):
    """
    Find smallest circle that encloses all points.

    Args:
        points: List of (x, y) tuples.

    Returns:
        tuple: (center, radius) where center is (x, y).
    """
    import random
    import math

    def distance(p1, p2):
        return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

    def circle_from_2_points(p1, p2):
        """Circle with diameter p1-p2."""
        center = ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
        radius = distance(p1, p2) / 2
        return center, radius

    def circle_from_3_points(p1, p2, p3):
        """Circumcircle of three points."""
        ax, ay = p1
        bx, by = p2
        cx, cy = p3

        d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
        if abs(d) < 1e-9:
            return circle_from_2_points(p1, p2)

        ux = ((ax**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / d
        uy = ((ax**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax - cx) + (cx**2 + cy**2) * (bx - ax)) / d

        center = (ux, uy)
        radius = distance(center, p1)
        return center, radius

    def welzl_helper(points, boundary, n):
        """Recursive helper for Welzl's algorithm."""
        if n == 0 or len(boundary) == 3:
            if len(boundary) == 0:
                return ((0, 0), 0)
            elif len(boundary) == 1:
                return (boundary[0], 0)
            elif len(boundary) == 2:
                return circle_from_2_points(boundary[0], boundary[1])
            else:
                return circle_from_3_points(boundary[0], boundary[1], boundary[2])

        # Pick random point
        idx = random.randint(0, n - 1)
        p = points[idx]

        # Swap with last
        points[idx], points[n - 1] = points[n - 1], points[idx]

        # Recursively find circle without p
        circle = welzl_helper(points, boundary, n - 1)
        center, radius = circle

        # If p is inside circle, return it
        if distance(center, p) <= radius + 1e-9:
            return circle

        # Otherwise, p must be on boundary
        return welzl_helper(points, boundary + [p], n - 1)

    if not points:
        return ((0, 0), 0)

    points_copy = points[:]
    return welzl_helper(points_copy, [], len(points_copy))`,
    testCases: [
      {
        input: 'points = [(0, 0), (1, 0), (0, 1)]',
        isHidden: false,
        description: 'Three points forming triangle'
      },
      {
        input: 'points = [(0, 0), (2, 0), (1, 1)]',
        isHidden: false,
        description: 'Triangle with different shape'
      },
      {
        input: 'points = [(0, 0), (1, 0), (1, 1), (0, 1)]',
        isHidden: false,
        description: 'Square'
      }
    ],
    hints: [
      'Welzl\'s algorithm: randomized incremental approach',
      'Key insight: optimal circle has 2 or 3 points on boundary',
      'Process points randomly',
      'If point outside current circle, it must be on boundary',
      'Recursively find circle with point on boundary',
      'Expected O(n) time with randomization'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex15',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Bentley-Ottmann Line Sweep',
    difficulty: 5,
    description: 'Find all intersection points of line segments using Bentley-Ottmann algorithm (simplified).',
    starterCode: `def find_intersections(segments):
    """
    Find all intersection points of line segments.

    Args:
        segments: List of segments [((x1, y1), (x2, y2)), ...].

    Returns:
        list: Intersection points.
    """
    # Your code here
    pass`,
    solution: `def find_intersections(segments):
    """
    Find all intersection points of line segments.

    Args:
        segments: List of segments [((x1, y1), (x2, y2)), ...].

    Returns:
        list: Intersection points.
    """
    def segments_intersect_point(seg1, seg2):
        """Find intersection point of two segments if exists."""
        (x1, y1), (x2, y2) = seg1
        (x3, y3), (x4, y4) = seg2

        denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

        if abs(denom) < 1e-9:
            return None  # Parallel or collinear

        t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom
        u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom

        if 0 <= t <= 1 and 0 <= u <= 1:
            # Intersection point
            px = x1 + t * (x2 - x1)
            py = y1 + t * (y2 - y1)
            return (px, py)

        return None

    # Simplified O(n^2) approach: check all pairs
    intersections = []

    for i in range(len(segments)):
        for j in range(i + 1, len(segments)):
            point = segments_intersect_point(segments[i], segments[j])
            if point:
                # Check if already added (avoid duplicates)
                is_duplicate = False
                for p in intersections:
                    if abs(p[0] - point[0]) < 1e-9 and abs(p[1] - point[1]) < 1e-9:
                        is_duplicate = True
                        break
                if not is_duplicate:
                    intersections.append(point)

    return intersections`,
    testCases: [
      {
        input: 'segments = [((0, 0), (2, 2)), ((0, 2), (2, 0))]',
        isHidden: false,
        description: 'Two intersecting segments (X pattern)'
      },
      {
        input: 'segments = [((0, 0), (1, 1)), ((2, 2), (3, 3)), ((0, 1), (1, 0))]',
        isHidden: false,
        description: 'Multiple segments with one intersection'
      },
      {
        input: 'segments = [((0, 0), (1, 0)), ((2, 0), (3, 0))]',
        isHidden: false,
        description: 'Non-intersecting segments'
      }
    ],
    hints: [
      'Bentley-Ottmann: sweep line + event queue + status structure',
      'This simplified version is O(n^2) checking all pairs',
      'For true O((n+k) log n): use sweep line with balanced BST',
      'Events: segment endpoints and intersections',
      'Status: segments currently intersecting sweep line',
      'Full algorithm is complex; simplified version still useful'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t7-ex16',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'KD-Tree Nearest Neighbor',
    difficulty: 4,
    description: 'Find nearest neighbor using KD-tree for efficient spatial queries.',
    starterCode: `class KDNode:
    def __init__(self, point, left=None, right=None):
        self.point = point
        self.left = left
        self.right = right

def build_kdtree(points, depth=0):
    """Build KD-tree from points."""
    # Your code here
    pass

def nearest_neighbor(root, query, depth=0):
    """Find nearest neighbor to query point in KD-tree."""
    # Your code here
    pass`,
    solution: `class KDNode:
    def __init__(self, point, left=None, right=None):
        self.point = point
        self.left = left
        self.right = right

def build_kdtree(points, depth=0):
    """Build KD-tree from points."""
    if not points:
        return None

    k = len(points[0])  # Dimensions
    axis = depth % k

    # Sort and choose median
    points.sort(key=lambda p: p[axis])
    median = len(points) // 2

    # Create node and recursively build subtrees
    return KDNode(
        point=points[median],
        left=build_kdtree(points[:median], depth + 1),
        right=build_kdtree(points[median + 1:], depth + 1)
    )

def nearest_neighbor(root, query, depth=0, best=None):
    """Find nearest neighbor to query point in KD-tree."""
    import math

    def distance(p1, p2):
        return math.sqrt(sum((a - b)**2 for a, b in zip(p1, p2)))

    if root is None:
        return best

    k = len(query)
    axis = depth % k

    # Update best if current node is closer
    dist = distance(root.point, query)
    if best is None or dist < distance(best, query):
        best = root.point

    # Determine which subtree to search first
    if query[axis] < root.point[axis]:
        near, far = root.left, root.right
    else:
        near, far = root.right, root.left

    # Search near subtree
    best = nearest_neighbor(near, query, depth + 1, best)

    # Check if we need to search far subtree
    if abs(query[axis] - root.point[axis]) < distance(best, query):
        best = nearest_neighbor(far, query, depth + 1, best)

    return best`,
    testCases: [
      {
        input: 'points = [(2, 3), (5, 4), (9, 6), (4, 7), (8, 1), (7, 2)], query = (9, 2)',
        isHidden: false,
        description: 'Find nearest neighbor in 2D'
      },
      {
        input: 'points = [(1, 1), (2, 2), (3, 3), (4, 4)], query = (2.5, 2.5)',
        isHidden: false,
        description: 'Query between points'
      },
      {
        input: 'points = [(0, 0), (10, 10)], query = (5, 5)',
        isHidden: false,
        description: 'Two points, query in middle'
      }
    ],
    hints: [
      'KD-tree: binary space partitioning tree',
      'Each level splits along different axis (alternating)',
      'Build tree by sorting along axis and choosing median',
      'For nearest neighbor: recursively search closer subtree first',
      'Prune far subtree if impossible to contain closer point',
      'Average case: O(log n), worst case: O(n)'
    ],
    language: 'python'
  }
];
