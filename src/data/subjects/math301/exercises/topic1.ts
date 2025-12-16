import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'math301-t1-ex01',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Vector Magnitude in 2D',
    difficulty: 1,
    description: 'Write a function that computes the magnitude (length) of a 2D vector. The magnitude of a vector [x, y] is sqrt(x^2 + y^2).',
    starterCode: `import math

def vector_magnitude_2d(x, y):
    """
    Compute the magnitude of a 2D vector.

    Args:
        x: x-component of the vector
        y: y-component of the vector

    Returns:
        The magnitude of the vector
    """
    pass`,
    solution: `import math

def vector_magnitude_2d(x, y):
    """
    Compute the magnitude of a 2D vector.

    Args:
        x: x-component of the vector
        y: y-component of the vector

    Returns:
        The magnitude of the vector
    """
    return math.sqrt(x**2 + y**2)`,
    testCases: [
      { input: '3, 4', expectedOutput: '5.0', isHidden: false, description: 'Classic 3-4-5 triangle' },
      { input: '1, 0', expectedOutput: '1.0', isHidden: false, description: 'Unit vector along x-axis' },
      { input: '0, 1', expectedOutput: '1.0', isHidden: false, description: 'Unit vector along y-axis' },
      { input: '5, 12', expectedOutput: '13.0', isHidden: true, description: '5-12-13 triangle' },
      { input: '-3, 4', expectedOutput: '5.0', isHidden: true, description: 'Negative x-component' }
    ],
    hints: [
      'Use the Pythagorean theorem',
      'Use math.sqrt() for the square root',
      'Remember: magnitude = sqrt(x^2 + y^2)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex02',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Vector Magnitude in 3D',
    difficulty: 1,
    description: 'Write a function that computes the magnitude of a 3D vector [x, y, z]. The magnitude is sqrt(x^2 + y^2 + z^2).',
    starterCode: `import math

def vector_magnitude_3d(x, y, z):
    """
    Compute the magnitude of a 3D vector.

    Args:
        x, y, z: components of the vector

    Returns:
        The magnitude of the vector
    """
    pass`,
    solution: `import math

def vector_magnitude_3d(x, y, z):
    """
    Compute the magnitude of a 3D vector.

    Args:
        x, y, z: components of the vector

    Returns:
        The magnitude of the vector
    """
    return math.sqrt(x**2 + y**2 + z**2)`,
    testCases: [
      { input: '1, 0, 0', expectedOutput: '1.0', isHidden: false, description: 'Unit vector along x-axis' },
      { input: '1, 1, 1', expectedOutput: '1.732', isHidden: false, description: 'Vector (1,1,1)' },
      { input: '2, 3, 6', expectedOutput: '7.0', isHidden: false, description: 'Vector (2,3,6)' },
      { input: '3, 4, 0', expectedOutput: '5.0', isHidden: true, description: '2D vector in 3D space' },
      { input: '1, 2, 2', expectedOutput: '3.0', isHidden: true, description: 'Vector (1,2,2)' }
    ],
    hints: [
      'Extend the 2D formula to 3D',
      'magnitude = sqrt(x^2 + y^2 + z^2)',
      'Use math.sqrt() for the square root'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex03',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Dot Product of 2D Vectors',
    difficulty: 2,
    description: 'Compute the dot product of two 2D vectors. The dot product of [x1, y1] and [x2, y2] is x1*x2 + y1*y2.',
    starterCode: `def dot_product_2d(x1, y1, x2, y2):
    """
    Compute the dot product of two 2D vectors.

    Args:
        x1, y1: components of first vector
        x2, y2: components of second vector

    Returns:
        The dot product
    """
    pass`,
    solution: `def dot_product_2d(x1, y1, x2, y2):
    """
    Compute the dot product of two 2D vectors.

    Args:
        x1, y1: components of first vector
        x2, y2: components of second vector

    Returns:
        The dot product
    """
    return x1 * x2 + y1 * y2`,
    testCases: [
      { input: '1, 0, 0, 1', expectedOutput: '0', isHidden: false, description: 'Perpendicular unit vectors' },
      { input: '1, 2, 3, 4', expectedOutput: '11', isHidden: false, description: 'General vectors' },
      { input: '2, 3, 2, 3', expectedOutput: '13', isHidden: false, description: 'Same vectors' },
      { input: '1, 1, 1, -1', expectedOutput: '0', isHidden: true, description: 'Perpendicular vectors' },
      { input: '3, 4, 5, 0', expectedOutput: '15', isHidden: true, description: 'Vector perpendicular to y-axis' }
    ],
    hints: [
      'Multiply corresponding components and sum',
      'dot_product = x1*x2 + y1*y2',
      'The dot product is a scalar, not a vector'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex04',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Dot Product of 3D Vectors',
    difficulty: 2,
    description: 'Compute the dot product of two 3D vectors. The dot product of [x1, y1, z1] and [x2, y2, z2] is x1*x2 + y1*y2 + z1*z2.',
    starterCode: `def dot_product_3d(x1, y1, z1, x2, y2, z2):
    """
    Compute the dot product of two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        The dot product
    """
    pass`,
    solution: `def dot_product_3d(x1, y1, z1, x2, y2, z2):
    """
    Compute the dot product of two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        The dot product
    """
    return x1 * x2 + y1 * y2 + z1 * z2`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: '0', isHidden: false, description: 'Perpendicular unit vectors' },
      { input: '1, 2, 3, 4, 5, 6', expectedOutput: '32', isHidden: false, description: 'General vectors' },
      { input: '1, 1, 1, 1, 1, 1', expectedOutput: '3', isHidden: false, description: 'All ones' },
      { input: '2, 3, 4, 1, 0, 0', expectedOutput: '2', isHidden: true, description: 'Second vector along x-axis' },
      { input: '1, 2, 3, 3, 2, 1', expectedOutput: '10', isHidden: true, description: 'Symmetric vectors' }
    ],
    hints: [
      'Extend the 2D dot product to 3D',
      'dot_product = x1*x2 + y1*y2 + z1*z2',
      'Sum the products of corresponding components'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex05',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Angle Between Vectors',
    difficulty: 3,
    description: 'Compute the angle (in degrees) between two 3D vectors using the formula: cos(θ) = (u·v) / (|u||v|).',
    starterCode: `import math

def angle_between_vectors(x1, y1, z1, x2, y2, z2):
    """
    Compute the angle in degrees between two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        The angle in degrees
    """
    pass`,
    solution: `import math

def angle_between_vectors(x1, y1, z1, x2, y2, z2):
    """
    Compute the angle in degrees between two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        The angle in degrees
    """
    dot = x1 * x2 + y1 * y2 + z1 * z2
    mag1 = math.sqrt(x1**2 + y1**2 + z1**2)
    mag2 = math.sqrt(x2**2 + y2**2 + z2**2)
    cos_theta = dot / (mag1 * mag2)
    theta_radians = math.acos(cos_theta)
    return math.degrees(theta_radians)`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: '90.0', isHidden: false, description: 'Perpendicular vectors' },
      { input: '1, 0, 0, 1, 0, 0', expectedOutput: '0.0', isHidden: false, description: 'Same direction' },
      { input: '1, 0, 0, -1, 0, 0', expectedOutput: '180.0', isHidden: false, description: 'Opposite direction' },
      { input: '1, 1, 0, 1, 0, 0', expectedOutput: '45.0', isHidden: true, description: '45 degree angle' },
      { input: '1, 1, 1, 1, 1, 1', expectedOutput: '0.0', isHidden: true, description: 'Parallel vectors' }
    ],
    hints: [
      'Use the dot product formula: cos(θ) = (u·v) / (|u||v|)',
      'Use math.acos() to get the angle in radians',
      'Convert radians to degrees using math.degrees()'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex06',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Cross Product of 3D Vectors',
    difficulty: 3,
    description: 'Compute the cross product of two 3D vectors. The cross product u × v = [u2v3 - u3v2, u3v1 - u1v3, u1v2 - u2v1]. Return the result as a tuple (x, y, z).',
    starterCode: `def cross_product(x1, y1, z1, x2, y2, z2):
    """
    Compute the cross product of two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        Tuple (x, y, z) representing the cross product
    """
    pass`,
    solution: `def cross_product(x1, y1, z1, x2, y2, z2):
    """
    Compute the cross product of two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        Tuple (x, y, z) representing the cross product
    """
    x = y1 * z2 - z1 * y2
    y = z1 * x2 - x1 * z2
    z = x1 * y2 - y1 * x2
    return (x, y, z)`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: '(0, 0, 1)', isHidden: false, description: 'i × j = k' },
      { input: '0, 1, 0, 0, 0, 1', expectedOutput: '(1, 0, 0)', isHidden: false, description: 'j × k = i' },
      { input: '0, 0, 1, 1, 0, 0', expectedOutput: '(0, 1, 0)', isHidden: false, description: 'k × i = j' },
      { input: '1, 2, 3, 4, 5, 6', expectedOutput: '(-3, 6, -3)', isHidden: true, description: 'General vectors' },
      { input: '2, 3, 4, 5, 6, 7', expectedOutput: '(-3, 6, -3)', isHidden: true, description: 'Another general case' }
    ],
    hints: [
      'The cross product is perpendicular to both input vectors',
      'x = y1*z2 - z1*y2',
      'y = z1*x2 - x1*z2',
      'z = x1*y2 - y1*x2'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex07',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Magnitude of Cross Product',
    difficulty: 3,
    description: 'Compute the magnitude of the cross product of two 3D vectors. This equals |u||v|sin(θ), which is the area of the parallelogram formed by the vectors.',
    starterCode: `import math

def cross_product_magnitude(x1, y1, z1, x2, y2, z2):
    """
    Compute the magnitude of the cross product of two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        The magnitude of the cross product
    """
    pass`,
    solution: `import math

def cross_product_magnitude(x1, y1, z1, x2, y2, z2):
    """
    Compute the magnitude of the cross product of two 3D vectors.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        The magnitude of the cross product
    """
    # Compute cross product
    cx = y1 * z2 - z1 * y2
    cy = z1 * x2 - x1 * z2
    cz = x1 * y2 - y1 * x2
    # Return magnitude
    return math.sqrt(cx**2 + cy**2 + cz**2)`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: '1.0', isHidden: false, description: 'Unit vectors' },
      { input: '3, 0, 0, 0, 4, 0', expectedOutput: '12.0', isHidden: false, description: 'Area = 3*4' },
      { input: '1, 1, 0, 1, -1, 0', expectedOutput: '2.0', isHidden: false, description: 'Diagonal vectors' },
      { input: '2, 3, 4, 1, 0, 0', expectedOutput: '5.0', isHidden: true, description: 'General case' },
      { input: '1, 2, 3, 1, 2, 3', expectedOutput: '0.0', isHidden: true, description: 'Parallel vectors' }
    ],
    hints: [
      'First compute the cross product',
      'Then compute the magnitude of the result',
      'For parallel vectors, the cross product is zero'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex08',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Vector Projection',
    difficulty: 3,
    description: 'Compute the scalar projection of vector u onto vector v. The scalar projection is (u·v) / |v|.',
    starterCode: `import math

def scalar_projection(ux, uy, uz, vx, vy, vz):
    """
    Compute the scalar projection of u onto v.

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v

    Returns:
        The scalar projection of u onto v
    """
    pass`,
    solution: `import math

def scalar_projection(ux, uy, uz, vx, vy, vz):
    """
    Compute the scalar projection of u onto v.

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v

    Returns:
        The scalar projection of u onto v
    """
    dot = ux * vx + uy * vy + uz * vz
    mag_v = math.sqrt(vx**2 + vy**2 + vz**2)
    return dot / mag_v`,
    testCases: [
      { input: '1, 0, 0, 1, 0, 0', expectedOutput: '1.0', isHidden: false, description: 'Same direction' },
      { input: '1, 1, 0, 1, 0, 0', expectedOutput: '1.0', isHidden: false, description: 'u projected onto x-axis' },
      { input: '3, 4, 0, 1, 0, 0', expectedOutput: '3.0', isHidden: false, description: 'x-component of u' },
      { input: '1, 2, 3, 2, 2, 2', expectedOutput: '3.464', isHidden: true, description: 'General case' },
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: '0.0', isHidden: true, description: 'Perpendicular vectors' }
    ],
    hints: [
      'Scalar projection = (u·v) / |v|',
      'Compute the dot product first',
      'Then divide by the magnitude of v'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex09',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Vector Projection Components',
    difficulty: 4,
    description: 'Compute the vector projection of u onto v. The vector projection is ((u·v) / |v|^2) * v. Return as a tuple (x, y, z).',
    starterCode: `def vector_projection(ux, uy, uz, vx, vy, vz):
    """
    Compute the vector projection of u onto v.

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v

    Returns:
        Tuple (x, y, z) representing the projection vector
    """
    pass`,
    solution: `def vector_projection(ux, uy, uz, vx, vy, vz):
    """
    Compute the vector projection of u onto v.

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v

    Returns:
        Tuple (x, y, z) representing the projection vector
    """
    dot = ux * vx + uy * vy + uz * vz
    mag_v_sq = vx**2 + vy**2 + vz**2
    scalar = dot / mag_v_sq
    return (scalar * vx, scalar * vy, scalar * vz)`,
    testCases: [
      { input: '1, 0, 0, 1, 0, 0', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Same direction' },
      { input: '1, 1, 0, 1, 0, 0', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Project onto x-axis' },
      { input: '3, 4, 0, 1, 0, 0', expectedOutput: '(3.0, 0.0, 0.0)', isHidden: false, description: 'x-component only' },
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: '(0.0, 0.0, 0.0)', isHidden: true, description: 'Perpendicular vectors' },
      { input: '1, 2, 3, 1, 1, 1', expectedOutput: '(2.0, 2.0, 2.0)', isHidden: true, description: 'General case' }
    ],
    hints: [
      'Vector projection = ((u·v) / |v|^2) * v',
      'Compute the scalar multiplier first',
      'Multiply each component of v by the scalar'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex10',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Unit Vector',
    difficulty: 2,
    description: 'Compute the unit vector in the direction of a given 3D vector. A unit vector has magnitude 1 and is computed as v / |v|. Return as a tuple (x, y, z).',
    starterCode: `import math

def unit_vector(x, y, z):
    """
    Compute the unit vector in the direction of the given vector.

    Args:
        x, y, z: components of the vector

    Returns:
        Tuple (x, y, z) representing the unit vector
    """
    pass`,
    solution: `import math

def unit_vector(x, y, z):
    """
    Compute the unit vector in the direction of the given vector.

    Args:
        x, y, z: components of the vector

    Returns:
        Tuple (x, y, z) representing the unit vector
    """
    mag = math.sqrt(x**2 + y**2 + z**2)
    return (x / mag, y / mag, z / mag)`,
    testCases: [
      { input: '3, 0, 0', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Along x-axis' },
      { input: '0, 5, 0', expectedOutput: '(0.0, 1.0, 0.0)', isHidden: false, description: 'Along y-axis' },
      { input: '3, 4, 0', expectedOutput: '(0.6, 0.8, 0.0)', isHidden: false, description: '3-4-5 triangle' },
      { input: '1, 1, 1', expectedOutput: '(0.577, 0.577, 0.577)', isHidden: true, description: 'All equal components' },
      { input: '2, 3, 6', expectedOutput: '(0.286, 0.429, 0.857)', isHidden: true, description: 'General case' }
    ],
    hints: [
      'Divide each component by the magnitude',
      'unit_vector = v / |v|',
      'The result should have magnitude 1'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex11',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Distance Between Points',
    difficulty: 2,
    description: 'Compute the distance between two points in 3D space. The distance is the magnitude of the vector from point 1 to point 2.',
    starterCode: `import math

def distance_3d(x1, y1, z1, x2, y2, z2):
    """
    Compute the distance between two points in 3D space.

    Args:
        x1, y1, z1: coordinates of first point
        x2, y2, z2: coordinates of second point

    Returns:
        The distance between the points
    """
    pass`,
    solution: `import math

def distance_3d(x1, y1, z1, x2, y2, z2):
    """
    Compute the distance between two points in 3D space.

    Args:
        x1, y1, z1: coordinates of first point
        x2, y2, z2: coordinates of second point

    Returns:
        The distance between the points
    """
    dx = x2 - x1
    dy = y2 - y1
    dz = z2 - z1
    return math.sqrt(dx**2 + dy**2 + dz**2)`,
    testCases: [
      { input: '0, 0, 0, 1, 0, 0', expectedOutput: '1.0', isHidden: false, description: 'Distance 1 along x-axis' },
      { input: '0, 0, 0, 3, 4, 0', expectedOutput: '5.0', isHidden: false, description: '3-4-5 triangle' },
      { input: '1, 1, 1, 2, 2, 2', expectedOutput: '1.732', isHidden: false, description: 'Diagonal distance' },
      { input: '0, 0, 0, 2, 3, 6', expectedOutput: '7.0', isHidden: true, description: 'General case' },
      { input: '1, 2, 3, 4, 6, 3', expectedOutput: '5.0', isHidden: true, description: 'Another case' }
    ],
    hints: [
      'Create a vector from point 1 to point 2',
      'The distance is the magnitude of that vector',
      'distance = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex12',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Triple Scalar Product',
    difficulty: 4,
    description: 'Compute the triple scalar product u · (v × w) of three 3D vectors. This gives the volume of the parallelepiped formed by the three vectors.',
    starterCode: `def triple_scalar_product(ux, uy, uz, vx, vy, vz, wx, wy, wz):
    """
    Compute the triple scalar product u · (v × w).

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v
        wx, wy, wz: components of vector w

    Returns:
        The triple scalar product
    """
    pass`,
    solution: `def triple_scalar_product(ux, uy, uz, vx, vy, vz, wx, wy, wz):
    """
    Compute the triple scalar product u · (v × w).

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v
        wx, wy, wz: components of vector w

    Returns:
        The triple scalar product
    """
    # Compute v × w
    cx = vy * wz - vz * wy
    cy = vz * wx - vx * wz
    cz = vx * wy - vy * wx
    # Compute u · (v × w)
    return ux * cx + uy * cy + uz * cz`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0, 0, 0, 1', expectedOutput: '1', isHidden: false, description: 'Unit cube' },
      { input: '2, 0, 0, 0, 2, 0, 0, 0, 2', expectedOutput: '8', isHidden: false, description: 'Cube volume 8' },
      { input: '1, 1, 0, 1, 0, 1, 0, 1, 1', expectedOutput: '2', isHidden: false, description: 'General case' },
      { input: '1, 2, 3, 4, 5, 6, 7, 8, 9', expectedOutput: '0', isHidden: true, description: 'Coplanar vectors' },
      { input: '1, 0, 0, 1, 1, 0, 1, 1, 1', expectedOutput: '1', isHidden: true, description: 'Another case' }
    ],
    hints: [
      'First compute the cross product v × w',
      'Then compute the dot product of u with the result',
      'This can also be computed as a determinant'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex13',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Check Orthogonality',
    difficulty: 2,
    description: 'Determine if two 3D vectors are orthogonal (perpendicular). Two vectors are orthogonal if their dot product is zero. Return True if orthogonal, False otherwise.',
    starterCode: `def are_orthogonal(x1, y1, z1, x2, y2, z2):
    """
    Check if two vectors are orthogonal.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        True if orthogonal, False otherwise
    """
    pass`,
    solution: `def are_orthogonal(x1, y1, z1, x2, y2, z2):
    """
    Check if two vectors are orthogonal.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        True if orthogonal, False otherwise
    """
    dot = x1 * x2 + y1 * y2 + z1 * z2
    return abs(dot) < 1e-9`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: 'True', isHidden: false, description: 'x and y axes' },
      { input: '1, 0, 0, 0, 0, 1', expectedOutput: 'True', isHidden: false, description: 'x and z axes' },
      { input: '1, 1, 0, 1, -1, 0', expectedOutput: 'True', isHidden: false, description: 'Diagonal vectors' },
      { input: '1, 2, 3, 1, 2, 3', expectedOutput: 'False', isHidden: true, description: 'Parallel vectors' },
      { input: '3, 4, 0, -4, 3, 0', expectedOutput: 'True', isHidden: true, description: 'Perpendicular in xy-plane' }
    ],
    hints: [
      'Two vectors are orthogonal if their dot product is zero',
      'Use a small tolerance for floating point comparison',
      'Check if abs(dot_product) < epsilon'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex14',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Check Parallel Vectors',
    difficulty: 3,
    description: 'Determine if two 3D vectors are parallel. Two vectors are parallel if one is a scalar multiple of the other. Return True if parallel, False otherwise.',
    starterCode: `def are_parallel(x1, y1, z1, x2, y2, z2):
    """
    Check if two vectors are parallel.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        True if parallel, False otherwise
    """
    pass`,
    solution: `def are_parallel(x1, y1, z1, x2, y2, z2):
    """
    Check if two vectors are parallel.

    Args:
        x1, y1, z1: components of first vector
        x2, y2, z2: components of second vector

    Returns:
        True if parallel, False otherwise
    """
    # Compute cross product
    cx = y1 * z2 - z1 * y2
    cy = z1 * x2 - x1 * z2
    cz = x1 * y2 - y1 * x2
    # Vectors are parallel if cross product is zero
    magnitude = (cx**2 + cy**2 + cz**2)**0.5
    return magnitude < 1e-9`,
    testCases: [
      { input: '1, 0, 0, 2, 0, 0', expectedOutput: 'True', isHidden: false, description: 'Same direction' },
      { input: '1, 2, 3, 2, 4, 6', expectedOutput: 'True', isHidden: false, description: 'Scalar multiple' },
      { input: '1, 0, 0, 0, 1, 0', expectedOutput: 'False', isHidden: false, description: 'Perpendicular' },
      { input: '3, 4, 5, -6, -8, -10', expectedOutput: 'True', isHidden: true, description: 'Opposite direction' },
      { input: '1, 2, 3, 4, 5, 6', expectedOutput: 'False', isHidden: true, description: 'Not parallel' }
    ],
    hints: [
      'Vectors are parallel if their cross product is zero',
      'Compute the cross product and check its magnitude',
      'Use a small tolerance for floating point comparison'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex15',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Area of Triangle',
    difficulty: 4,
    description: 'Compute the area of a triangle given three vertices in 3D space. Use the formula: Area = 0.5 * |AB × AC| where AB and AC are vectors from vertex A to B and C.',
    starterCode: `import math

def triangle_area(ax, ay, az, bx, by, bz, cx, cy, cz):
    """
    Compute the area of a triangle given three vertices.

    Args:
        ax, ay, az: coordinates of vertex A
        bx, by, bz: coordinates of vertex B
        cx, cy, cz: coordinates of vertex C

    Returns:
        The area of the triangle
    """
    pass`,
    solution: `import math

def triangle_area(ax, ay, az, bx, by, bz, cx, cy, cz):
    """
    Compute the area of a triangle given three vertices.

    Args:
        ax, ay, az: coordinates of vertex A
        bx, by, bz: coordinates of vertex B
        cx, cy, cz: coordinates of vertex C

    Returns:
        The area of the triangle
    """
    # Vectors AB and AC
    abx, aby, abz = bx - ax, by - ay, bz - az
    acx, acy, acz = cx - ax, cy - ay, cz - az
    # Cross product
    cpx = aby * acz - abz * acy
    cpy = abz * acx - abx * acz
    cpz = abx * acy - aby * acx
    # Area = 0.5 * magnitude of cross product
    mag = math.sqrt(cpx**2 + cpy**2 + cpz**2)
    return 0.5 * mag`,
    testCases: [
      { input: '0, 0, 0, 1, 0, 0, 0, 1, 0', expectedOutput: '0.5', isHidden: false, description: 'Right triangle' },
      { input: '0, 0, 0, 2, 0, 0, 0, 2, 0', expectedOutput: '2.0', isHidden: false, description: 'Larger right triangle' },
      { input: '0, 0, 0, 3, 0, 0, 0, 4, 0', expectedOutput: '6.0', isHidden: false, description: '3-4-5 triangle' },
      { input: '1, 1, 1, 2, 1, 1, 1, 2, 1', expectedOutput: '0.5', isHidden: true, description: 'Translated triangle' },
      { input: '0, 0, 0, 1, 0, 0, 1, 1, 0', expectedOutput: '0.5', isHidden: true, description: 'Another right triangle' }
    ],
    hints: [
      'Create vectors from vertex A to vertices B and C',
      'Compute the cross product of these vectors',
      'Area = 0.5 * |AB × AC|'
    ],
    language: 'python'
  },
  {
    id: 'math301-t1-ex16',
    subjectId: 'math301',
    topicId: 'math301-topic-1',
    title: 'Volume of Parallelepiped',
    difficulty: 4,
    description: 'Compute the volume of a parallelepiped formed by three 3D vectors. The volume is the absolute value of the triple scalar product |u · (v × w)|.',
    starterCode: `import math

def parallelepiped_volume(ux, uy, uz, vx, vy, vz, wx, wy, wz):
    """
    Compute the volume of a parallelepiped formed by three vectors.

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v
        wx, wy, wz: components of vector w

    Returns:
        The volume of the parallelepiped
    """
    pass`,
    solution: `import math

def parallelepiped_volume(ux, uy, uz, vx, vy, vz, wx, wy, wz):
    """
    Compute the volume of a parallelepiped formed by three vectors.

    Args:
        ux, uy, uz: components of vector u
        vx, vy, vz: components of vector v
        wx, wy, wz: components of vector w

    Returns:
        The volume of the parallelepiped
    """
    # Compute v × w
    cx = vy * wz - vz * wy
    cy = vz * wx - vx * wz
    cz = vx * wy - vy * wx
    # Compute u · (v × w)
    triple_product = ux * cx + uy * cy + uz * cz
    return abs(triple_product)`,
    testCases: [
      { input: '1, 0, 0, 0, 1, 0, 0, 0, 1', expectedOutput: '1.0', isHidden: false, description: 'Unit cube' },
      { input: '2, 0, 0, 0, 2, 0, 0, 0, 2', expectedOutput: '8.0', isHidden: false, description: 'Cube with side 2' },
      { input: '1, 0, 0, 0, 2, 0, 0, 0, 3', expectedOutput: '6.0', isHidden: false, description: 'Rectangular box' },
      { input: '1, 1, 0, 1, 0, 1, 0, 1, 1', expectedOutput: '2.0', isHidden: true, description: 'General case' },
      { input: '3, 0, 0, 0, 4, 0, 0, 0, 5', expectedOutput: '60.0', isHidden: true, description: 'Larger box' }
    ],
    hints: [
      'Use the triple scalar product formula',
      'Volume = |u · (v × w)|',
      'Take the absolute value of the result'
    ],
    language: 'python'
  }
];
