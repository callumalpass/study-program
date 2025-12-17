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
  }
];
