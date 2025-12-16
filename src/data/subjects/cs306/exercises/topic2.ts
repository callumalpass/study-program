import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs306-t2-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '2D Translation',
    difficulty: 1,
    description: 'Translate a 2D point (x, y) by displacement (dx, dy). Return the new coordinates as a tuple.',
    starterCode: `def translate_2d(x, y, dx, dy):
    """
    Translate a 2D point.

    Args:
        x, y: Original point coordinates
        dx, dy: Translation displacement

    Returns:
        Tuple (x', y') of translated point
    """
    pass`,
    solution: `def translate_2d(x, y, dx, dy):
    """
    Translate a 2D point.

    Args:
        x, y: Original point coordinates
        dx, dy: Translation displacement

    Returns:
        Tuple (x', y') of translated point
    """
    return (x + dx, y + dy)`,
    testCases: [
      { input: '0, 0, 5, 10', expectedOutput: '(5, 10)', isHidden: false, description: 'Translate from origin' },
      { input: '10, 20, -5, -10', expectedOutput: '(5, 10)', isHidden: false, description: 'Negative translation' },
      { input: '100, 200, 0, 0', expectedOutput: '(100, 200)', isHidden: false, description: 'No translation' },
      { input: '-10, -20, 30, 40', expectedOutput: '(20, 20)', isHidden: true, description: 'Mixed signs' }
    ],
    hints: [
      'Translation is simple addition',
      'x\' = x + dx, y\' = y + dy'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '2D Scaling',
    difficulty: 1,
    description: 'Scale a 2D point (x, y) by factors (sx, sy) around the origin. Return the scaled coordinates.',
    starterCode: `def scale_2d(x, y, sx, sy):
    """
    Scale a 2D point around origin.

    Args:
        x, y: Original point coordinates
        sx, sy: Scale factors

    Returns:
        Tuple (x', y') of scaled point
    """
    pass`,
    solution: `def scale_2d(x, y, sx, sy):
    """
    Scale a 2D point around origin.

    Args:
        x, y: Original point coordinates
        sx, sy: Scale factors

    Returns:
        Tuple (x', y') of scaled point
    """
    return (x * sx, y * sy)`,
    testCases: [
      { input: '10, 20, 2, 2', expectedOutput: '(20, 40)', isHidden: false, description: 'Uniform scaling' },
      { input: '5, 10, 2, 0.5', expectedOutput: '(10, 5.0)', isHidden: false, description: 'Non-uniform scaling' },
      { input: '100, 50, 0.1, 0.1', expectedOutput: '(10.0, 5.0)', isHidden: false, description: 'Scale down' },
      { input: '-10, 20, 3, 2', expectedOutput: '(-30, 40)', isHidden: true, description: 'Negative coordinate' }
    ],
    hints: [
      'Scaling around origin is multiplication',
      'x\' = x * sx, y\' = y * sy'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '2D Matrix-Vector Multiplication',
    difficulty: 2,
    description: 'Multiply a 2x2 matrix by a 2D vector. Given matrix [[a,b],[c,d]] and vector (x,y), return the result vector.',
    starterCode: `def matrix_vector_mult_2d(matrix, x, y):
    """
    Multiply 2x2 matrix by 2D vector.

    Args:
        matrix: 2x2 matrix as [[a,b],[c,d]]
        x, y: Vector components

    Returns:
        Tuple (x', y') of result vector
    """
    pass`,
    solution: `def matrix_vector_mult_2d(matrix, x, y):
    """
    Multiply 2x2 matrix by 2D vector.

    Args:
        matrix: 2x2 matrix as [[a,b],[c,d]]
        x, y: Vector components

    Returns:
        Tuple (x', y') of result vector
    """
    x_prime = matrix[0][0] * x + matrix[0][1] * y
    y_prime = matrix[1][0] * x + matrix[1][1] * y
    return (x_prime, y_prime)`,
    testCases: [
      { input: '[[1, 0], [0, 1]], 5, 10', expectedOutput: '(5, 10)', isHidden: false, description: 'Identity matrix' },
      { input: '[[2, 0], [0, 2]], 3, 4', expectedOutput: '(6, 8)', isHidden: false, description: 'Scale matrix' },
      { input: '[[0, -1], [1, 0]], 5, 0', expectedOutput: '(0, 5)', isHidden: false, description: '90° rotation matrix' },
      { input: '[[1, 2], [3, 4]], 1, 1', expectedOutput: '(3, 7)', isHidden: true, description: 'Arbitrary matrix' }
    ],
    hints: [
      'Result x = m[0][0]*x + m[0][1]*y',
      'Result y = m[1][0]*x + m[1][1]*y',
      'Each row of matrix multiplies the vector'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '2D Rotation Matrix',
    difficulty: 2,
    description: 'Create a 2D rotation matrix for rotating angle θ (in degrees) counter-clockwise. Return as [[cos,-sin],[sin,cos]] with values rounded to 3 decimals.',
    starterCode: `import math

def rotation_matrix_2d(angle_degrees):
    """
    Create 2D rotation matrix.

    Args:
        angle_degrees: Rotation angle in degrees (counter-clockwise)

    Returns:
        2x2 rotation matrix as [[cos,-sin],[sin,cos]]
    """
    pass`,
    solution: `import math

def rotation_matrix_2d(angle_degrees):
    """
    Create 2D rotation matrix.

    Args:
        angle_degrees: Rotation angle in degrees (counter-clockwise)

    Returns:
        2x2 rotation matrix as [[cos,-sin],[sin,cos]]
    """
    angle_rad = math.radians(angle_degrees)
    cos_theta = round(math.cos(angle_rad), 3)
    sin_theta = round(math.sin(angle_rad), 3)
    return [[cos_theta, -sin_theta], [sin_theta, cos_theta]]`,
    testCases: [
      { input: '0', expectedOutput: '[[1.0, -0.0], [0.0, 1.0]]', isHidden: false, description: '0° rotation' },
      { input: '90', expectedOutput: '[[0.0, -1.0], [1.0, 0.0]]', isHidden: false, description: '90° rotation' },
      { input: '45', expectedOutput: '[[0.707, -0.707], [0.707, 0.707]]', isHidden: false, description: '45° rotation' },
      { input: '180', expectedOutput: '[[-1.0, -0.0], [0.0, -1.0]]', isHidden: true, description: '180° rotation' }
    ],
    hints: [
      'Convert degrees to radians',
      'Rotation matrix: [[cos θ, -sin θ], [sin θ, cos θ]]',
      'Round values to 3 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Apply 2D Rotation',
    difficulty: 2,
    description: 'Rotate a 2D point (x, y) by angle θ (in degrees) around the origin. Return rotated coordinates rounded to 2 decimals.',
    starterCode: `import math

def rotate_point_2d(x, y, angle_degrees):
    """
    Rotate a 2D point around origin.

    Args:
        x, y: Point coordinates
        angle_degrees: Rotation angle in degrees (counter-clockwise)

    Returns:
        Tuple (x', y') of rotated point
    """
    pass`,
    solution: `import math

def rotate_point_2d(x, y, angle_degrees):
    """
    Rotate a 2D point around origin.

    Args:
        x, y: Point coordinates
        angle_degrees: Rotation angle in degrees (counter-clockwise)

    Returns:
        Tuple (x', y') of rotated point
    """
    angle_rad = math.radians(angle_degrees)
    cos_theta = math.cos(angle_rad)
    sin_theta = math.sin(angle_rad)

    x_prime = x * cos_theta - y * sin_theta
    y_prime = x * sin_theta + y * cos_theta

    return (round(x_prime, 2), round(y_prime, 2))`,
    testCases: [
      { input: '1, 0, 90', expectedOutput: '(0.0, 1.0)', isHidden: false, description: 'Rotate (1,0) by 90°' },
      { input: '0, 1, 90', expectedOutput: '(-1.0, 0.0)', isHidden: false, description: 'Rotate (0,1) by 90°' },
      { input: '10, 0, 45', expectedOutput: '(7.07, 7.07)', isHidden: false, description: 'Rotate (10,0) by 45°' },
      { input: '5, 5, 180', expectedOutput: '(-5.0, -5.0)', isHidden: true, description: 'Rotate by 180°' }
    ],
    hints: [
      'x\' = x*cos(θ) - y*sin(θ)',
      'y\' = x*sin(θ) + y*cos(θ)',
      'Convert angle to radians first'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '3x3 Matrix Multiplication',
    difficulty: 3,
    description: 'Multiply two 3x3 matrices. Return the result matrix.',
    starterCode: `def multiply_matrices_3x3(m1, m2):
    """
    Multiply two 3x3 matrices.

    Args:
        m1: First 3x3 matrix
        m2: Second 3x3 matrix

    Returns:
        Result 3x3 matrix
    """
    pass`,
    solution: `def multiply_matrices_3x3(m1, m2):
    """
    Multiply two 3x3 matrices.

    Args:
        m1: First 3x3 matrix
        m2: Second 3x3 matrix

    Returns:
        Result 3x3 matrix
    """
    result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    for i in range(3):
        for j in range(3):
            for k in range(3):
                result[i][j] += m1[i][k] * m2[k][j]

    return result`,
    testCases: [
      { input: '[[1,0,0],[0,1,0],[0,0,1]], [[2,3,4],[5,6,7],[8,9,10]]', expectedOutput: '[[2, 3, 4], [5, 6, 7], [8, 9, 10]]', isHidden: false, description: 'Identity matrix' },
      { input: '[[2,0,0],[0,2,0],[0,0,2]], [[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[[2, 4, 6], [8, 10, 12], [14, 16, 18]]', isHidden: false, description: 'Scale matrix' },
      { input: '[[1,2,3],[4,5,6],[7,8,9]], [[1,0,0],[0,1,0],[0,0,1]]', expectedOutput: '[[1, 2, 3], [4, 5, 6], [7, 8, 9]]', isHidden: false, description: 'Right multiply identity' },
      { input: '[[1,2,0],[0,1,0],[0,0,1]], [[1,0,5],[0,1,10],[0,0,1]]', expectedOutput: '[[1, 2, 25], [0, 1, 10], [0, 0, 1]]', isHidden: true, description: 'Transformation matrices' }
    ],
    hints: [
      'Result[i][j] = sum of m1[i][k] * m2[k][j] for all k',
      'Use three nested loops: row i, column j, and sum index k',
      'Initialize result matrix with zeros'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Homogeneous 2D Translation Matrix',
    difficulty: 3,
    description: 'Create a 3x3 homogeneous transformation matrix for 2D translation by (dx, dy). Format: [[1,0,dx],[0,1,dy],[0,0,1]].',
    starterCode: `def translation_matrix_2d(dx, dy):
    """
    Create 2D translation matrix in homogeneous coordinates.

    Args:
        dx, dy: Translation displacement

    Returns:
        3x3 translation matrix
    """
    pass`,
    solution: `def translation_matrix_2d(dx, dy):
    """
    Create 2D translation matrix in homogeneous coordinates.

    Args:
        dx, dy: Translation displacement

    Returns:
        3x3 translation matrix
    """
    return [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ]`,
    testCases: [
      { input: '5, 10', expectedOutput: '[[1, 0, 5], [0, 1, 10], [0, 0, 1]]', isHidden: false, description: 'Positive translation' },
      { input: '-3, -7', expectedOutput: '[[1, 0, -3], [0, 1, -7], [0, 0, 1]]', isHidden: false, description: 'Negative translation' },
      { input: '0, 0', expectedOutput: '[[1, 0, 0], [0, 1, 0], [0, 0, 1]]', isHidden: false, description: 'No translation (identity)' },
      { input: '100, -50', expectedOutput: '[[1, 0, 100], [0, 1, -50], [0, 0, 1]]', isHidden: true, description: 'Mixed signs' }
    ],
    hints: [
      'Translation matrix has 1s on diagonal',
      'Translation values go in rightmost column',
      'Bottom row is [0, 0, 1]'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Homogeneous Coordinate Transform',
    difficulty: 3,
    description: 'Transform a 2D point in homogeneous coordinates [x, y, 1] by a 3x3 transformation matrix. Return result as (x, y) after dividing by w.',
    starterCode: `def transform_homogeneous(matrix, x, y):
    """
    Transform 2D point using homogeneous coordinates.

    Args:
        matrix: 3x3 transformation matrix
        x, y: Point coordinates

    Returns:
        Tuple (x', y') of transformed point
    """
    pass`,
    solution: `def transform_homogeneous(matrix, x, y):
    """
    Transform 2D point using homogeneous coordinates.

    Args:
        matrix: 3x3 transformation matrix
        x, y: Point coordinates

    Returns:
        Tuple (x', y') of transformed point
    """
    # Homogeneous vector [x, y, 1]
    x_h = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2]
    y_h = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2]
    w = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2]

    # Divide by w to get Cartesian coordinates
    return (x_h / w, y_h / w)`,
    testCases: [
      { input: '[[1,0,5],[0,1,10],[0,0,1]], 0, 0', expectedOutput: '(5.0, 10.0)', isHidden: false, description: 'Translation only' },
      { input: '[[2,0,0],[0,2,0],[0,0,1]], 3, 4', expectedOutput: '(6.0, 8.0)', isHidden: false, description: 'Scaling only' },
      { input: '[[1,0,0],[0,1,0],[0,0,1]], 5, 7', expectedOutput: '(5.0, 7.0)', isHidden: false, description: 'Identity transform' },
      { input: '[[1,0,10],[0,1,20],[0,0,2]], 4, 6', expectedOutput: '(7.0, 13.0)', isHidden: true, description: 'Non-unit w component' }
    ],
    hints: [
      'Multiply matrix by homogeneous vector [x, y, 1]',
      'Get result [x\', y\', w]',
      'Divide x\' and y\' by w to get Cartesian coordinates'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Composite 2D Transformation',
    difficulty: 4,
    description: 'Create a composite transformation matrix that first rotates by θ degrees, then translates by (dx, dy). Return 3x3 homogeneous matrix with values rounded to 3 decimals.',
    starterCode: `import math

def rotate_then_translate(angle_degrees, dx, dy):
    """
    Create composite transformation: rotate then translate.

    Args:
        angle_degrees: Rotation angle
        dx, dy: Translation displacement

    Returns:
        3x3 composite transformation matrix
    """
    pass`,
    solution: `import math

def rotate_then_translate(angle_degrees, dx, dy):
    """
    Create composite transformation: rotate then translate.

    Args:
        angle_degrees: Rotation angle
        dx, dy: Translation displacement

    Returns:
        3x3 composite transformation matrix
    """
    angle_rad = math.radians(angle_degrees)
    cos_theta = round(math.cos(angle_rad), 3)
    sin_theta = round(math.sin(angle_rad), 3)

    # Rotation matrix
    rotation = [
        [cos_theta, -sin_theta, 0],
        [sin_theta, cos_theta, 0],
        [0, 0, 1]
    ]

    # Translation matrix
    translation = [
        [1, 0, dx],
        [0, 1, dy],
        [0, 0, 1]
    ]

    # Multiply: Translation * Rotation (right to left)
    result = [[0, 0, 0], [0, 0, 0], [0, 0, 1]]
    for i in range(3):
        for j in range(3):
            for k in range(3):
                result[i][j] += translation[i][k] * rotation[k][j]
            result[i][j] = round(result[i][j], 3)

    return result`,
    testCases: [
      { input: '0, 5, 10', expectedOutput: '[[1.0, -0.0, 5], [0.0, 1.0, 10], [0, 0, 1]]', isHidden: false, description: 'No rotation' },
      { input: '90, 10, 20', expectedOutput: '[[0.0, -1.0, 10], [1.0, 0.0, 20], [0, 0, 1]]', isHidden: false, description: '90° rotation then translate' },
      { input: '45, 0, 0', expectedOutput: '[[0.707, -0.707, 0], [0.707, 0.707, 0], [0, 0, 1]]', isHidden: false, description: '45° rotation only' },
      { input: '180, 5, 5', expectedOutput: '[[-1.0, -0.0, 5], [0.0, -1.0, 5], [0, 0, 1]]', isHidden: true, description: '180° rotation then translate' }
    ],
    hints: [
      'Create rotation matrix and translation matrix separately',
      'Multiply: Translation * Rotation (apply rotation first)',
      'Order matters in matrix multiplication',
      'Round final values to 3 decimals'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '3D Point Translation',
    difficulty: 2,
    description: 'Translate a 3D point (x, y, z) by displacement (dx, dy, dz). Return the translated coordinates.',
    starterCode: `def translate_3d(x, y, z, dx, dy, dz):
    """
    Translate a 3D point.

    Args:
        x, y, z: Original point coordinates
        dx, dy, dz: Translation displacement

    Returns:
        Tuple (x', y', z') of translated point
    """
    pass`,
    solution: `def translate_3d(x, y, z, dx, dy, dz):
    """
    Translate a 3D point.

    Args:
        x, y, z: Original point coordinates
        dx, dy, dz: Translation displacement

    Returns:
        Tuple (x', y', z') of translated point
    """
    return (x + dx, y + dy, z + dz)`,
    testCases: [
      { input: '0, 0, 0, 1, 2, 3', expectedOutput: '(1, 2, 3)', isHidden: false, description: 'From origin' },
      { input: '5, 10, 15, -2, -3, -4', expectedOutput: '(3, 7, 11)', isHidden: false, description: 'Negative displacement' },
      { input: '1, 1, 1, 0, 0, 0', expectedOutput: '(1, 1, 1)', isHidden: false, description: 'No translation' },
      { input: '-5, 10, -15, 5, -10, 15', expectedOutput: '(0, 0, 0)', isHidden: true, description: 'To origin' }
    ],
    hints: [
      'Same as 2D translation but with z component',
      'x\' = x + dx, y\' = y + dy, z\' = z + dz'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '3D Scaling Matrix',
    difficulty: 3,
    description: 'Create a 4x4 homogeneous transformation matrix for 3D scaling by factors (sx, sy, sz).',
    starterCode: `def scaling_matrix_3d(sx, sy, sz):
    """
    Create 3D scaling matrix in homogeneous coordinates.

    Args:
        sx, sy, sz: Scale factors

    Returns:
        4x4 scaling matrix
    """
    pass`,
    solution: `def scaling_matrix_3d(sx, sy, sz):
    """
    Create 3D scaling matrix in homogeneous coordinates.

    Args:
        sx, sy, sz: Scale factors

    Returns:
        4x4 scaling matrix
    """
    return [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ]`,
    testCases: [
      { input: '2, 2, 2', expectedOutput: '[[2, 0, 0, 0], [0, 2, 0, 0], [0, 0, 2, 0], [0, 0, 0, 1]]', isHidden: false, description: 'Uniform scaling' },
      { input: '1, 2, 3', expectedOutput: '[[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 1]]', isHidden: false, description: 'Non-uniform scaling' },
      { input: '0.5, 0.5, 0.5', expectedOutput: '[[0.5, 0, 0, 0], [0, 0.5, 0, 0], [0, 0, 0.5, 0], [0, 0, 0, 1]]', isHidden: false, description: 'Scale down' },
      { input: '1, 1, 1', expectedOutput: '[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]', isHidden: true, description: 'Identity (no scaling)' }
    ],
    hints: [
      'Scale factors go on main diagonal',
      'Bottom-right element is 1',
      'All other elements are 0'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '3D Rotation Around X-Axis',
    difficulty: 3,
    description: 'Create a 4x4 rotation matrix for rotating around the X-axis by θ degrees. Round values to 3 decimals.',
    starterCode: `import math

def rotation_x_matrix(angle_degrees):
    """
    Create rotation matrix around X-axis.

    Args:
        angle_degrees: Rotation angle in degrees

    Returns:
        4x4 rotation matrix
    """
    pass`,
    solution: `import math

def rotation_x_matrix(angle_degrees):
    """
    Create rotation matrix around X-axis.

    Args:
        angle_degrees: Rotation angle in degrees

    Returns:
        4x4 rotation matrix
    """
    angle_rad = math.radians(angle_degrees)
    cos_theta = round(math.cos(angle_rad), 3)
    sin_theta = round(math.sin(angle_rad), 3)

    return [
        [1, 0, 0, 0],
        [0, cos_theta, -sin_theta, 0],
        [0, sin_theta, cos_theta, 0],
        [0, 0, 0, 1]
    ]`,
    testCases: [
      { input: '0', expectedOutput: '[[1, 0, 0, 0], [0, 1.0, -0.0, 0], [0, 0.0, 1.0, 0], [0, 0, 0, 1]]', isHidden: false, description: 'No rotation' },
      { input: '90', expectedOutput: '[[1, 0, 0, 0], [0, 0.0, -1.0, 0], [0, 1.0, 0.0, 0], [0, 0, 0, 1]]', isHidden: false, description: '90° rotation' },
      { input: '45', expectedOutput: '[[1, 0, 0, 0], [0, 0.707, -0.707, 0], [0, 0.707, 0.707, 0], [0, 0, 0, 1]]', isHidden: false, description: '45° rotation' },
      { input: '180', expectedOutput: '[[1, 0, 0, 0], [0, -1.0, -0.0, 0], [0, 0.0, -1.0, 0], [0, 0, 0, 1]]', isHidden: true, description: '180° rotation' }
    ],
    hints: [
      'X-axis rotation affects Y and Z coordinates',
      'First row and column stay [1,0,0,0] and [1,0,0,0]',
      'Bottom-right 3x3 submatrix: [[1,0,0],[0,cos,-sin],[0,sin,cos]]',
      'Bottom row is [0,0,0,1]'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '3D Rotation Around Y-Axis',
    difficulty: 3,
    description: 'Create a 4x4 rotation matrix for rotating around the Y-axis by θ degrees. Round values to 3 decimals.',
    starterCode: `import math

def rotation_y_matrix(angle_degrees):
    """
    Create rotation matrix around Y-axis.

    Args:
        angle_degrees: Rotation angle in degrees

    Returns:
        4x4 rotation matrix
    """
    pass`,
    solution: `import math

def rotation_y_matrix(angle_degrees):
    """
    Create rotation matrix around Y-axis.

    Args:
        angle_degrees: Rotation angle in degrees

    Returns:
        4x4 rotation matrix
    """
    angle_rad = math.radians(angle_degrees)
    cos_theta = round(math.cos(angle_rad), 3)
    sin_theta = round(math.sin(angle_rad), 3)

    return [
        [cos_theta, 0, sin_theta, 0],
        [0, 1, 0, 0],
        [-sin_theta, 0, cos_theta, 0],
        [0, 0, 0, 1]
    ]`,
    testCases: [
      { input: '0', expectedOutput: '[[1.0, 0, 0.0, 0], [0, 1, 0, 0], [-0.0, 0, 1.0, 0], [0, 0, 0, 1]]', isHidden: false, description: 'No rotation' },
      { input: '90', expectedOutput: '[[0.0, 0, 1.0, 0], [0, 1, 0, 0], [-1.0, 0, 0.0, 0], [0, 0, 0, 1]]', isHidden: false, description: '90° rotation' },
      { input: '45', expectedOutput: '[[0.707, 0, 0.707, 0], [0, 1, 0, 0], [-0.707, 0, 0.707, 0], [0, 0, 0, 1]]', isHidden: false, description: '45° rotation' },
      { input: '180', expectedOutput: '[[-1.0, 0, 0.0, 0], [0, 1, 0, 0], [-0.0, 0, -1.0, 0], [0, 0, 0, 1]]', isHidden: true, description: '180° rotation' }
    ],
    hints: [
      'Y-axis rotation affects X and Z coordinates',
      'Second row stays [0,1,0,0]',
      'Note: Y rotation has different sign pattern than X',
      'Matrix: [[cos,0,sin,0],[0,1,0,0],[-sin,0,cos,0],[0,0,0,1]]'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: '3D Rotation Around Z-Axis',
    difficulty: 3,
    description: 'Create a 4x4 rotation matrix for rotating around the Z-axis by θ degrees. Round values to 3 decimals.',
    starterCode: `import math

def rotation_z_matrix(angle_degrees):
    """
    Create rotation matrix around Z-axis.

    Args:
        angle_degrees: Rotation angle in degrees

    Returns:
        4x4 rotation matrix
    """
    pass`,
    solution: `import math

def rotation_z_matrix(angle_degrees):
    """
    Create rotation matrix around Z-axis.

    Args:
        angle_degrees: Rotation angle in degrees

    Returns:
        4x4 rotation matrix
    """
    angle_rad = math.radians(angle_degrees)
    cos_theta = round(math.cos(angle_rad), 3)
    sin_theta = round(math.sin(angle_rad), 3)

    return [
        [cos_theta, -sin_theta, 0, 0],
        [sin_theta, cos_theta, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]`,
    testCases: [
      { input: '0', expectedOutput: '[[1.0, -0.0, 0, 0], [0.0, 1.0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]', isHidden: false, description: 'No rotation' },
      { input: '90', expectedOutput: '[[0.0, -1.0, 0, 0], [1.0, 0.0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]', isHidden: false, description: '90° rotation' },
      { input: '45', expectedOutput: '[[0.707, -0.707, 0, 0], [0.707, 0.707, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]', isHidden: false, description: '45° rotation' },
      { input: '180', expectedOutput: '[[-1.0, -0.0, 0, 0], [0.0, -1.0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]', isHidden: true, description: '180° rotation' }
    ],
    hints: [
      'Z-axis rotation affects X and Y coordinates',
      'Third row stays [0,0,1,0]',
      'Top-left 2x2 is same as 2D rotation matrix',
      'Matrix: [[cos,-sin,0,0],[sin,cos,0,0],[0,0,1,0],[0,0,0,1]]'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Vector Cross Product',
    difficulty: 4,
    description: 'Calculate the cross product of two 3D vectors. Return the result vector as a tuple.',
    starterCode: `def cross_product(v1, v2):
    """
    Calculate cross product of two 3D vectors.

    Args:
        v1: First vector as tuple (x, y, z)
        v2: Second vector as tuple (x, y, z)

    Returns:
        Cross product vector as tuple (x, y, z)
    """
    pass`,
    solution: `def cross_product(v1, v2):
    """
    Calculate cross product of two 3D vectors.

    Args:
        v1: First vector as tuple (x, y, z)
        v2: Second vector as tuple (x, y, z)

    Returns:
        Cross product vector as tuple (x, y, z)
    """
    x = v1[1] * v2[2] - v1[2] * v2[1]
    y = v1[2] * v2[0] - v1[0] * v2[2]
    z = v1[0] * v2[1] - v1[1] * v2[0]
    return (x, y, z)`,
    testCases: [
      { input: '(1, 0, 0), (0, 1, 0)', expectedOutput: '(0, 0, 1)', isHidden: false, description: 'X cross Y = Z' },
      { input: '(0, 1, 0), (0, 0, 1)', expectedOutput: '(1, 0, 0)', isHidden: false, description: 'Y cross Z = X' },
      { input: '(0, 0, 1), (1, 0, 0)', expectedOutput: '(0, 1, 0)', isHidden: false, description: 'Z cross X = Y' },
      { input: '(2, 3, 4), (5, 6, 7)', expectedOutput: '(-3, 6, -3)', isHidden: true, description: 'Arbitrary vectors' }
    ],
    hints: [
      'Cross product formula: (v1 × v2)',
      'x = v1.y * v2.z - v1.z * v2.y',
      'y = v1.z * v2.x - v1.x * v2.z',
      'z = v1.x * v2.y - v1.y * v2.x'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t2-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Quaternion to Rotation Matrix',
    difficulty: 5,
    description: 'Convert a unit quaternion (w, x, y, z) to a 3x3 rotation matrix. Return matrix with values rounded to 3 decimals.',
    starterCode: `def quaternion_to_matrix(w, x, y, z):
    """
    Convert unit quaternion to 3x3 rotation matrix.

    Args:
        w, x, y, z: Quaternion components (unit quaternion)

    Returns:
        3x3 rotation matrix
    """
    pass`,
    solution: `def quaternion_to_matrix(w, x, y, z):
    """
    Convert unit quaternion to 3x3 rotation matrix.

    Args:
        w, x, y, z: Quaternion components (unit quaternion)

    Returns:
        3x3 rotation matrix
    """
    # Calculate matrix elements
    m00 = round(1 - 2*y*y - 2*z*z, 3)
    m01 = round(2*x*y - 2*z*w, 3)
    m02 = round(2*x*z + 2*y*w, 3)

    m10 = round(2*x*y + 2*z*w, 3)
    m11 = round(1 - 2*x*x - 2*z*z, 3)
    m12 = round(2*y*z - 2*x*w, 3)

    m20 = round(2*x*z - 2*y*w, 3)
    m21 = round(2*y*z + 2*x*w, 3)
    m22 = round(1 - 2*x*x - 2*y*y, 3)

    return [
        [m00, m01, m02],
        [m10, m11, m12],
        [m20, m21, m22]
    ]`,
    testCases: [
      { input: '1, 0, 0, 0', expectedOutput: '[[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]', isHidden: false, description: 'Identity quaternion' },
      { input: '0.707, 0.707, 0, 0', expectedOutput: '[[1.0, 0.0, 0.0], [0.0, 0.0, -1.0], [0.0, 1.0, 0.0]]', isHidden: false, description: '90° around X-axis' },
      { input: '0.707, 0, 0.707, 0', expectedOutput: '[[0.0, 0.0, 1.0], [0.0, 1.0, 0.0], [-1.0, 0.0, 0.0]]', isHidden: false, description: '90° around Y-axis' },
      { input: '0.707, 0, 0, 0.707', expectedOutput: '[[0.0, -1.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 1.0]]', isHidden: true, description: '90° around Z-axis' }
    ],
    hints: [
      'Use quaternion to matrix conversion formula',
      'M[0][0] = 1 - 2*y² - 2*z²',
      'M[0][1] = 2*x*y - 2*z*w',
      'Continue pattern for all 9 elements',
      'Round each element to 3 decimal places'
    ],
    language: 'python'
  }
];
