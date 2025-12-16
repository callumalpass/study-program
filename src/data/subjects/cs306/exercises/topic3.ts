import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs306-t3-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Camera Position Vector',
    difficulty: 1,
    description: 'Given camera position (ex, ey, ez) and look-at point (cx, cy, cz), calculate the view direction vector (unnormalized). Return as tuple.',
    starterCode: `def view_direction(ex, ey, ez, cx, cy, cz):
    """
    Calculate view direction from camera to look-at point.

    Args:
        ex, ey, ez: Camera (eye) position
        cx, cy, cz: Look-at (center) point

    Returns:
        Tuple (dx, dy, dz) of view direction
    """
    pass`,
    solution: `def view_direction(ex, ey, ez, cx, cy, cz):
    """
    Calculate view direction from camera to look-at point.

    Args:
        ex, ey, ez: Camera (eye) position
        cx, cy, cz: Look-at (center) point

    Returns:
        Tuple (dx, dy, dz) of view direction
    """
    dx = cx - ex
    dy = cy - ey
    dz = cz - ez
    return (dx, dy, dz)`,
    testCases: [
      { input: '0, 0, 0, 0, 0, -1', expectedOutput: '(0, 0, -1)', isHidden: false, description: 'Look down -Z axis' },
      { input: '0, 0, 5, 0, 0, 0', expectedOutput: '(0, 0, -5)', isHidden: false, description: 'Camera at +Z looking at origin' },
      { input: '1, 2, 3, 4, 5, 6', expectedOutput: '(3, 3, 3)', isHidden: false, description: 'Arbitrary positions' },
      { input: '10, 10, 10, 0, 0, 0', expectedOutput: '(-10, -10, -10)', isHidden: true, description: 'Looking at origin from positive octant' }
    ],
    hints: [
      'Direction = target - origin',
      'dx = cx - ex, dy = cy - ey, dz = cz - ez'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Vector Normalization',
    difficulty: 1,
    description: 'Normalize a 3D vector to unit length. Return the normalized vector with components rounded to 3 decimals.',
    starterCode: `import math

def normalize_vector(x, y, z):
    """
    Normalize a 3D vector to unit length.

    Args:
        x, y, z: Vector components

    Returns:
        Tuple (x, y, z) of normalized vector
    """
    pass`,
    solution: `import math

def normalize_vector(x, y, z):
    """
    Normalize a 3D vector to unit length.

    Args:
        x, y, z: Vector components

    Returns:
        Tuple (x, y, z) of normalized vector
    """
    length = math.sqrt(x*x + y*y + z*z)
    return (round(x/length, 3), round(y/length, 3), round(z/length, 3))`,
    testCases: [
      { input: '1, 0, 0', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Already normalized' },
      { input: '3, 4, 0', expectedOutput: '(0.6, 0.8, 0.0)', isHidden: false, description: '3-4-5 triangle' },
      { input: '1, 1, 1', expectedOutput: '(0.577, 0.577, 0.577)', isHidden: false, description: 'Diagonal vector' },
      { input: '2, 2, 1', expectedOutput: '(0.667, 0.667, 0.333)', isHidden: true, description: 'Arbitrary vector' }
    ],
    hints: [
      'Calculate length: sqrt(x² + y² + z²)',
      'Divide each component by length',
      'Round to 3 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Vector Dot Product',
    difficulty: 1,
    description: 'Calculate the dot product of two 3D vectors. Return the scalar result.',
    starterCode: `def dot_product(v1, v2):
    """
    Calculate dot product of two 3D vectors.

    Args:
        v1: First vector as tuple (x, y, z)
        v2: Second vector as tuple (x, y, z)

    Returns:
        Dot product as scalar
    """
    pass`,
    solution: `def dot_product(v1, v2):
    """
    Calculate dot product of two 3D vectors.

    Args:
        v1: First vector as tuple (x, y, z)
        v2: Second vector as tuple (x, y, z)

    Returns:
        Dot product as scalar
    """
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]`,
    testCases: [
      { input: '(1, 0, 0), (1, 0, 0)', expectedOutput: '1', isHidden: false, description: 'Same unit vectors' },
      { input: '(1, 0, 0), (0, 1, 0)', expectedOutput: '0', isHidden: false, description: 'Perpendicular vectors' },
      { input: '(2, 3, 4), (5, 6, 7)', expectedOutput: '56', isHidden: false, description: 'Arbitrary vectors' },
      { input: '(1, 1, 1), (-1, -1, -1)', expectedOutput: '-3', isHidden: true, description: 'Opposite vectors' }
    ],
    hints: [
      'Dot product: v1·v2 = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z',
      'Sum of component-wise products'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Orthographic Projection Matrix',
    difficulty: 2,
    description: 'Create an orthographic projection matrix given left, right, bottom, top, near, far planes. Return 4x4 matrix.',
    starterCode: `def orthographic_matrix(left, right, bottom, top, near, far):
    """
    Create orthographic projection matrix.

    Args:
        left, right: Left and right clipping planes
        bottom, top: Bottom and top clipping planes
        near, far: Near and far clipping planes

    Returns:
        4x4 orthographic projection matrix
    """
    pass`,
    solution: `def orthographic_matrix(left, right, bottom, top, near, far):
    """
    Create orthographic projection matrix.

    Args:
        left, right: Left and right clipping planes
        bottom, top: Bottom and top clipping planes
        near, far: Near and far clipping planes

    Returns:
        4x4 orthographic projection matrix
    """
    return [
        [2/(right-left), 0, 0, -(right+left)/(right-left)],
        [0, 2/(top-bottom), 0, -(top+bottom)/(top-bottom)],
        [0, 0, -2/(far-near), -(far+near)/(far-near)],
        [0, 0, 0, 1]
    ]`,
    testCases: [
      { input: '-1, 1, -1, 1, -1, 1', expectedOutput: '[[1.0, 0, 0, -0.0], [0, 1.0, 0, -0.0], [0, 0, -1.0, -0.0], [0, 0, 0, 1]]', isHidden: false, description: 'Symmetric cube' },
      { input: '0, 800, 0, 600, -1, 1', expectedOutput: '[[0.0025, 0, 0, -1.0], [0, 0.003333333333333333, 0, -1.0], [0, 0, -1.0, -0.0], [0, 0, 0, 1]]', isHidden: false, description: 'Screen-space projection' },
      { input: '-2, 2, -2, 2, 1, 100', expectedOutput: '[[0.5, 0, 0, -0.0], [0, 0.5, 0, -0.0], [0, 0, -0.020202020202020204, -1.0202020202020203], [0, 0, 0, 1]]', isHidden: false, description: 'Standard orthographic' },
      { input: '-10, 10, -10, 10, 0.1, 1000', expectedOutput: '[[0.1, 0, 0, -0.0], [0, 0.1, 0, -0.0], [0, 0, -0.0020002000200020003, -1.0001000100010002], [0, 0, 0, 1]]', isHidden: true, description: 'Wide depth range' }
    ],
    hints: [
      'Scale: 2/(right-left), 2/(top-bottom), -2/(far-near)',
      'Translate: -(right+left)/(right-left), -(top+bottom)/(top-bottom), -(far+near)/(far-near)',
      'These values go in specific positions of the matrix'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Perspective Division',
    difficulty: 2,
    description: 'Perform perspective division on a homogeneous coordinate (x, y, z, w). Return Cartesian coordinates (x/w, y/w, z/w) rounded to 3 decimals.',
    starterCode: `def perspective_divide(x, y, z, w):
    """
    Perform perspective division.

    Args:
        x, y, z, w: Homogeneous coordinates

    Returns:
        Tuple (x/w, y/w, z/w) of Cartesian coordinates
    """
    pass`,
    solution: `def perspective_divide(x, y, z, w):
    """
    Perform perspective division.

    Args:
        x, y, z, w: Homogeneous coordinates

    Returns:
        Tuple (x/w, y/w, z/w) of Cartesian coordinates
    """
    return (round(x/w, 3), round(y/w, 3), round(z/w, 3))`,
    testCases: [
      { input: '10, 20, 30, 1', expectedOutput: '(10.0, 20.0, 30.0)', isHidden: false, description: 'w=1 (no change)' },
      { input: '10, 20, 30, 2', expectedOutput: '(5.0, 10.0, 15.0)', isHidden: false, description: 'w=2' },
      { input: '5, 10, -20, 5', expectedOutput: '(1.0, 2.0, -4.0)', isHidden: false, description: 'w=5' },
      { input: '100, 200, 300, 10', expectedOutput: '(10.0, 20.0, 30.0)', isHidden: true, description: 'w=10' }
    ],
    hints: [
      'Divide each component by w',
      'Result: (x/w, y/w, z/w)',
      'Round to 3 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Viewport Transform',
    difficulty: 3,
    description: 'Transform NDC coordinates (range [-1,1]) to screen coordinates. Given NDC (x,y), viewport position (vx,vy), and size (w,h), return screen coordinates.',
    starterCode: `def ndc_to_screen(ndc_x, ndc_y, viewport_x, viewport_y, width, height):
    """
    Transform NDC to screen coordinates.

    Args:
        ndc_x, ndc_y: NDC coordinates (-1 to 1)
        viewport_x, viewport_y: Viewport position
        width, height: Viewport size

    Returns:
        Tuple (screen_x, screen_y)
    """
    pass`,
    solution: `def ndc_to_screen(ndc_x, ndc_y, viewport_x, viewport_y, width, height):
    """
    Transform NDC to screen coordinates.

    Args:
        ndc_x, ndc_y: NDC coordinates (-1 to 1)
        viewport_x, viewport_y: Viewport position
        width, height: Viewport size

    Returns:
        Tuple (screen_x, screen_y)
    """
    screen_x = viewport_x + (ndc_x + 1) * width / 2
    screen_y = viewport_y + (1 - ndc_y) * height / 2
    return (screen_x, screen_y)`,
    testCases: [
      { input: '0, 0, 0, 0, 800, 600', expectedOutput: '(400.0, 300.0)', isHidden: false, description: 'Center of screen' },
      { input: '-1, 1, 0, 0, 800, 600', expectedOutput: '(0.0, 0.0)', isHidden: false, description: 'Top-left corner' },
      { input: '1, -1, 0, 0, 800, 600', expectedOutput: '(800.0, 600.0)', isHidden: false, description: 'Bottom-right corner' },
      { input: '0.5, 0.5, 100, 100, 400, 300', expectedOutput: '(400.0, 175.0)', isHidden: true, description: 'With viewport offset' }
    ],
    hints: [
      'Scale from [-1,1] to [0,width]: (ndc_x + 1) * width / 2',
      'Scale from [-1,1] to [0,height]: (1 - ndc_y) * height / 2',
      'Add viewport offset to result',
      'Note: Y is flipped'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Field of View to Focal Length',
    difficulty: 3,
    description: 'Calculate focal length from vertical field of view (in degrees) and image height. Formula: focal_length = height / (2 * tan(fov/2)). Round to 2 decimals.',
    starterCode: `import math

def fov_to_focal_length(fov_degrees, image_height):
    """
    Calculate focal length from FOV.

    Args:
        fov_degrees: Vertical field of view in degrees
        image_height: Image height in pixels

    Returns:
        Focal length rounded to 2 decimals
    """
    pass`,
    solution: `import math

def fov_to_focal_length(fov_degrees, image_height):
    """
    Calculate focal length from FOV.

    Args:
        fov_degrees: Vertical field of view in degrees
        image_height: Image height in pixels

    Returns:
        Focal length rounded to 2 decimals
    """
    fov_rad = math.radians(fov_degrees)
    focal_length = image_height / (2 * math.tan(fov_rad / 2))
    return round(focal_length, 2)`,
    testCases: [
      { input: '90, 600', expectedOutput: '300.0', isHidden: false, description: '90° FOV' },
      { input: '60, 600', expectedOutput: '519.62', isHidden: false, description: '60° FOV' },
      { input: '45, 800', expectedOutput: '965.69', isHidden: false, description: '45° FOV' },
      { input: '120, 1080', expectedOutput: '311.77', isHidden: true, description: 'Wide angle 120° FOV' }
    ],
    hints: [
      'Convert FOV to radians',
      'Formula: f = h / (2 * tan(fov/2))',
      'Use math.tan()',
      'Round to 2 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Perspective Projection Matrix',
    difficulty: 4,
    description: 'Create a perspective projection matrix given vertical FOV (degrees), aspect ratio, near and far planes. Return 4x4 matrix with values rounded to 3 decimals.',
    starterCode: `import math

def perspective_matrix(fov_degrees, aspect, near, far):
    """
    Create perspective projection matrix.

    Args:
        fov_degrees: Vertical field of view in degrees
        aspect: Aspect ratio (width/height)
        near: Near clipping plane
        far: Far clipping plane

    Returns:
        4x4 perspective projection matrix
    """
    pass`,
    solution: `import math

def perspective_matrix(fov_degrees, aspect, near, far):
    """
    Create perspective projection matrix.

    Args:
        fov_degrees: Vertical field of view in degrees
        aspect: Aspect ratio (width/height)
        near: Near clipping plane
        far: Far clipping plane

    Returns:
        4x4 perspective projection matrix
    """
    fov_rad = math.radians(fov_degrees)
    f = 1.0 / math.tan(fov_rad / 2.0)

    return [
        [round(f / aspect, 3), 0, 0, 0],
        [0, round(f, 3), 0, 0],
        [0, 0, round((far + near) / (near - far), 3), round((2 * far * near) / (near - far), 3)],
        [0, 0, -1, 0]
    ]`,
    testCases: [
      { input: '90, 1.333, 0.1, 100', expectedOutput: '[[0.75, 0, 0, 0], [0, 1.0, 0, 0], [0, 0, -1.002, -0.2], [0, 0, -1, 0]]', isHidden: false, description: '90° FOV, 4:3 aspect' },
      { input: '60, 1.777, 1, 1000', expectedOutput: '[[0.974, 0, 0, 0], [0, 1.732, 0, 0], [0, 0, -1.002, -2.002], [0, 0, -1, 0]]', isHidden: false, description: '60° FOV, 16:9 aspect' },
      { input: '45, 1.0, 0.1, 100', expectedOutput: '[[2.414, 0, 0, 0], [0, 2.414, 0, 0], [0, 0, -1.002, -0.2], [0, 0, -1, 0]]', isHidden: false, description: '45° FOV, square aspect' },
      { input: '75, 1.6, 0.5, 500', expectedOutput: '[[0.721, 0, 0, 0], [0, 1.154, 0, 0], [0, 0, -1.002, -1.002], [0, 0, -1, 0]]', isHidden: true, description: 'Custom parameters' }
    ],
    hints: [
      'Calculate f = 1 / tan(fov/2)',
      'M[0][0] = f / aspect',
      'M[1][1] = f',
      'M[2][2] = (far + near) / (near - far)',
      'M[2][3] = (2 * far * near) / (near - far)',
      'M[3][2] = -1'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Look-At Matrix',
    difficulty: 5,
    description: 'Create a view matrix using look-at parameters. Given eye position, center (look-at) point, and up vector, construct the 4x4 view matrix. Round to 3 decimals.',
    starterCode: `import math

def look_at_matrix(eye, center, up):
    """
    Create look-at view matrix.

    Args:
        eye: Camera position as tuple (x, y, z)
        center: Look-at point as tuple (x, y, z)
        up: Up vector as tuple (x, y, z)

    Returns:
        4x4 view matrix
    """
    pass`,
    solution: `import math

def look_at_matrix(eye, center, up):
    """
    Create look-at view matrix.

    Args:
        eye: Camera position as tuple (x, y, z)
        center: Look-at point as tuple (x, y, z)
        up: Up vector as tuple (x, y, z)

    Returns:
        4x4 view matrix
    """
    # Calculate forward vector (from eye to center)
    fx = center[0] - eye[0]
    fy = center[1] - eye[1]
    fz = center[2] - eye[2]
    f_len = math.sqrt(fx*fx + fy*fy + fz*fz)
    fx, fy, fz = fx/f_len, fy/f_len, fz/f_len

    # Calculate right vector (cross product of forward and up)
    rx = fy * up[2] - fz * up[1]
    ry = fz * up[0] - fx * up[2]
    rz = fx * up[1] - fy * up[0]
    r_len = math.sqrt(rx*rx + ry*ry + rz*rz)
    rx, ry, rz = rx/r_len, ry/r_len, rz/r_len

    # Calculate true up vector (cross product of right and forward)
    ux = ry * fz - rz * fy
    uy = rz * fx - rx * fz
    uz = rx * fy - ry * fx

    # Create view matrix (inverted camera transform)
    return [
        [round(rx, 3), round(ux, 3), round(-fx, 3), round(-(rx*eye[0] + ux*eye[1] - fx*eye[2]), 3)],
        [round(ry, 3), round(uy, 3), round(-fy, 3), round(-(ry*eye[0] + uy*eye[1] - fy*eye[2]), 3)],
        [round(rz, 3), round(uz, 3), round(-fz, 3), round(-(rz*eye[0] + uz*eye[1] - fz*eye[2]), 3)],
        [0, 0, 0, 1]
    ]`,
    testCases: [
      { input: '(0, 0, 5), (0, 0, 0), (0, 1, 0)', expectedOutput: '[[1.0, 0.0, 0.0, 0.0], [0.0, 1.0, 0.0, 0.0], [0.0, 0.0, 1.0, -5.0], [0, 0, 0, 1]]', isHidden: false, description: 'Camera at +Z looking at origin' },
      { input: '(0, 0, 0), (0, 0, -1), (0, 1, 0)', expectedOutput: '[[1.0, 0.0, 0.0, 0.0], [0.0, 1.0, 0.0, 0.0], [0.0, 0.0, 1.0, 0.0], [0, 0, 0, 1]]', isHidden: false, description: 'Camera at origin looking down -Z' },
      { input: '(5, 5, 5), (0, 0, 0), (0, 1, 0)', expectedOutput: '[[0.707, 0.0, 0.707, 0.0], [-0.408, 0.816, 0.408, 0.0], [-0.577, -0.577, 0.577, -8.66], [0, 0, 0, 1]]', isHidden: false, description: 'Camera at diagonal' },
      { input: '(10, 0, 0), (0, 0, 0), (0, 1, 0)', expectedOutput: '[[0.0, 0.0, 1.0, 0.0], [0.0, 1.0, 0.0, 0.0], [-1.0, 0.0, 0.0, -10.0], [0, 0, 0, 1]]', isHidden: true, description: 'Camera on +X axis' }
    ],
    hints: [
      'Calculate forward (Z) vector: normalize(center - eye)',
      'Calculate right (X) vector: normalize(forward × up)',
      'Calculate true up (Y) vector: right × forward',
      'Build rotation part from right, up, -forward vectors',
      'Add translation: -(rotation * eye)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Camera Right Vector',
    difficulty: 2,
    description: 'Calculate the camera right vector given forward direction and up vector using cross product. Normalize and round to 3 decimals.',
    starterCode: `import math

def camera_right_vector(forward, up):
    """
    Calculate camera right vector.

    Args:
        forward: Forward direction as tuple (x, y, z)
        up: Up direction as tuple (x, y, z)

    Returns:
        Normalized right vector as tuple
    """
    pass`,
    solution: `import math

def camera_right_vector(forward, up):
    """
    Calculate camera right vector.

    Args:
        forward: Forward direction as tuple (x, y, z)
        up: Up direction as tuple (x, y, z)

    Returns:
        Normalized right vector as tuple
    """
    # Cross product: forward × up
    rx = forward[1] * up[2] - forward[2] * up[1]
    ry = forward[2] * up[0] - forward[0] * up[2]
    rz = forward[0] * up[1] - forward[1] * up[0]

    # Normalize
    length = math.sqrt(rx*rx + ry*ry + rz*rz)
    return (round(rx/length, 3), round(ry/length, 3), round(rz/length, 3))`,
    testCases: [
      { input: '(0, 0, -1), (0, 1, 0)', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Standard camera orientation' },
      { input: '(1, 0, 0), (0, 1, 0)', expectedOutput: '(0.0, 0.0, -1.0)', isHidden: false, description: 'Looking along +X' },
      { input: '(0, -1, 0), (0, 0, 1)', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Looking down' },
      { input: '(1, 1, 0), (0, 0, 1)', expectedOutput: '(0.707, -0.707, 0.0)', isHidden: true, description: 'Diagonal forward' }
    ],
    hints: [
      'Right = forward × up (cross product)',
      'Normalize the result',
      'Round to 3 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Depth Buffer Value Calculation',
    difficulty: 3,
    description: 'Calculate normalized depth buffer value (0-1) from view-space Z coordinate using perspective projection. Given z, near, and far planes, return depth value.',
    starterCode: `def calculate_depth(z, near, far):
    """
    Calculate normalized depth buffer value.

    Args:
        z: View-space Z coordinate (negative for in front)
        near: Near clipping plane distance
        far: Far clipping plane distance

    Returns:
        Depth value in range [0, 1] rounded to 4 decimals
    """
    pass`,
    solution: `def calculate_depth(z, near, far):
    """
    Calculate normalized depth buffer value.

    Args:
        z: View-space Z coordinate (negative for in front)
        near: Near clipping plane distance
        far: Far clipping plane distance

    Returns:
        Depth value in range [0, 1] rounded to 4 decimals
    """
    # Perspective projection depth calculation
    depth = (far + near) / (near - far) + (2 * far * near) / (z * (near - far))
    # Normalize to [0, 1]
    normalized = (depth + 1) / 2
    return round(normalized, 4)`,
    testCases: [
      { input: '-1, 1, 100', expectedOutput: '0.0', isHidden: false, description: 'At near plane' },
      { input: '-100, 1, 100', expectedOutput: '1.0', isHidden: false, description: 'At far plane' },
      { input: '-10, 1, 100', expectedOutput: '0.0919', isHidden: false, description: 'Between near and far' },
      { input: '-50, 0.1, 1000', expectedOutput: '0.5492', isHidden: true, description: 'Wide depth range' }
    ],
    hints: [
      'Use perspective projection depth formula',
      'depth = (f+n)/(n-f) + (2*f*n)/(z*(n-f))',
      'Normalize from [-1,1] to [0,1]: (depth+1)/2',
      'Round to 4 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Point in View Frustum Test',
    difficulty: 4,
    description: 'Test if a point in NDC space is inside the view frustum (all coordinates in range [-1, 1]). Return True if inside, False otherwise.',
    starterCode: `def point_in_frustum(x, y, z):
    """
    Test if point is inside view frustum.

    Args:
        x, y, z: NDC coordinates

    Returns:
        True if inside frustum, False otherwise
    """
    pass`,
    solution: `def point_in_frustum(x, y, z):
    """
    Test if point is inside view frustum.

    Args:
        x, y, z: NDC coordinates

    Returns:
        True if inside frustum, False otherwise
    """
    return (-1 <= x <= 1) and (-1 <= y <= 1) and (-1 <= z <= 1)`,
    testCases: [
      { input: '0, 0, 0', expectedOutput: 'True', isHidden: false, description: 'Center of frustum' },
      { input: '1, 1, 1', expectedOutput: 'True', isHidden: false, description: 'Corner of frustum' },
      { input: '1.5, 0, 0', expectedOutput: 'False', isHidden: false, description: 'Outside in X' },
      { input: '0.5, -0.5, 0.9', expectedOutput: 'True', isHidden: true, description: 'Inside frustum' }
    ],
    hints: [
      'Check if all coordinates are in range [-1, 1]',
      'Use logical AND for all three conditions'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Aspect Ratio from Dimensions',
    difficulty: 1,
    description: 'Calculate aspect ratio from width and height. Return as float rounded to 3 decimals.',
    starterCode: `def aspect_ratio(width, height):
    """
    Calculate aspect ratio.

    Args:
        width: Screen/viewport width
        height: Screen/viewport height

    Returns:
        Aspect ratio (width/height) rounded to 3 decimals
    """
    pass`,
    solution: `def aspect_ratio(width, height):
    """
    Calculate aspect ratio.

    Args:
        width: Screen/viewport width
        height: Screen/viewport height

    Returns:
        Aspect ratio (width/height) rounded to 3 decimals
    """
    return round(width / height, 3)`,
    testCases: [
      { input: '1920, 1080', expectedOutput: '1.778', isHidden: false, description: '16:9 aspect ratio' },
      { input: '1024, 768', expectedOutput: '1.333', isHidden: false, description: '4:3 aspect ratio' },
      { input: '1920, 1200', expectedOutput: '1.6', isHidden: false, description: '16:10 aspect ratio' },
      { input: '800, 800', expectedOutput: '1.0', isHidden: true, description: 'Square 1:1' }
    ],
    hints: [
      'Aspect ratio = width / height',
      'Round to 3 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'View-Space to Clip-Space',
    difficulty: 4,
    description: 'Transform a view-space point to clip-space using a projection matrix. Return the clip-space coordinates (x, y, z, w).',
    starterCode: `def view_to_clip(point, projection_matrix):
    """
    Transform view-space point to clip-space.

    Args:
        point: View-space point as tuple (x, y, z)
        projection_matrix: 4x4 projection matrix

    Returns:
        Clip-space coordinates as tuple (x, y, z, w)
    """
    pass`,
    solution: `def view_to_clip(point, projection_matrix):
    """
    Transform view-space point to clip-space.

    Args:
        point: View-space point as tuple (x, y, z)
        projection_matrix: 4x4 projection matrix

    Returns:
        Clip-space coordinates as tuple (x, y, z, w)
    """
    # Treat point as homogeneous [x, y, z, 1]
    x = projection_matrix[0][0] * point[0] + projection_matrix[0][1] * point[1] + projection_matrix[0][2] * point[2] + projection_matrix[0][3]
    y = projection_matrix[1][0] * point[0] + projection_matrix[1][1] * point[1] + projection_matrix[1][2] * point[2] + projection_matrix[1][3]
    z = projection_matrix[2][0] * point[0] + projection_matrix[2][1] * point[1] + projection_matrix[2][2] * point[2] + projection_matrix[2][3]
    w = projection_matrix[3][0] * point[0] + projection_matrix[3][1] * point[1] + projection_matrix[3][2] * point[2] + projection_matrix[3][3]

    return (x, y, z, w)`,
    testCases: [
      { input: '(0, 0, -1), [[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,-1,0]]', expectedOutput: '(0, 0, 1, 1)', isHidden: false, description: 'Simple projection' },
      { input: '(1, 1, -2), [[2,0,0,0],[0,2,0,0],[0,0,-1.2,-2.2],[0,0,-1,0]]', expectedOutput: '(2, 2, 4.6, 2)', isHidden: false, description: 'Perspective projection' },
      { input: '(0, 0, 0), [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]', expectedOutput: '(0, 0, 0, 1)', isHidden: false, description: 'Identity at origin' },
      { input: '(5, 10, -15), [[0.5,0,0,0],[0,0.5,0,0],[0,0,-1,0],[0,0,-1,0]]', expectedOutput: '(2.5, 5.0, 15, 15)', isHidden: true, description: 'Scale and perspective' }
    ],
    hints: [
      'Multiply 4x4 projection matrix by homogeneous point [x,y,z,1]',
      'Calculate each component: sum of matrix row * point vector',
      'Return all four components (x, y, z, w)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Reverse Z-Buffer Value',
    difficulty: 4,
    description: 'Convert a normalized depth buffer value [0,1] back to view-space Z coordinate. Given depth, near, and far planes, return the Z value (negative).',
    starterCode: `def depth_to_view_z(depth, near, far):
    """
    Convert depth buffer value to view-space Z.

    Args:
        depth: Normalized depth value (0-1)
        near: Near clipping plane distance
        far: Far clipping plane distance

    Returns:
        View-space Z coordinate (negative) rounded to 3 decimals
    """
    pass`,
    solution: `def depth_to_view_z(depth, near, far):
    """
    Convert depth buffer value to view-space Z.

    Args:
        depth: Normalized depth value (0-1)
        near: Near clipping plane distance
        far: Far clipping plane distance

    Returns:
        View-space Z coordinate (negative) rounded to 3 decimals
    """
    # Convert from [0,1] to [-1,1]
    ndc_depth = depth * 2 - 1

    # Reverse perspective projection
    z = (2 * far * near) / ((far + near) - ndc_depth * (far - near))

    return round(-z, 3)`,
    testCases: [
      { input: '0.0, 1, 100', expectedOutput: '-1.0', isHidden: false, description: 'At near plane' },
      { input: '1.0, 1, 100', expectedOutput: '-100.0', isHidden: false, description: 'At far plane' },
      { input: '0.5, 1, 100', expectedOutput: '-2.0', isHidden: false, description: 'Midpoint (non-linear)' },
      { input: '0.091, 0.1, 1000', expectedOutput: '-1.0', isHidden: true, description: 'Wide depth range' }
    ],
    hints: [
      'Convert depth from [0,1] to [-1,1]: ndc = depth*2 - 1',
      'Use inverse perspective formula',
      'z = (2*f*n) / ((f+n) - ndc*(f-n))',
      'Negate result for view-space convention',
      'Round to 3 decimals'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t3-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Camera Orbit Position',
    difficulty: 5,
    description: 'Calculate camera position when orbiting around a target point. Given target, radius, azimuth (horizontal angle), and elevation (vertical angle) in degrees, return camera position.',
    starterCode: `import math

def orbit_camera_position(target, radius, azimuth_deg, elevation_deg):
    """
    Calculate camera position for orbit camera.

    Args:
        target: Target point as tuple (x, y, z)
        radius: Distance from target
        azimuth_deg: Horizontal angle in degrees (0=+X axis)
        elevation_deg: Vertical angle in degrees (0=XZ plane, 90=+Y axis)

    Returns:
        Camera position as tuple (x, y, z) rounded to 3 decimals
    """
    pass`,
    solution: `import math

def orbit_camera_position(target, radius, azimuth_deg, elevation_deg):
    """
    Calculate camera position for orbit camera.

    Args:
        target: Target point as tuple (x, y, z)
        radius: Distance from target
        azimuth_deg: Horizontal angle in degrees (0=+X axis)
        elevation_deg: Vertical angle in degrees (0=XZ plane, 90=+Y axis)

    Returns:
        Camera position as tuple (x, y, z) rounded to 3 decimals
    """
    azimuth_rad = math.radians(azimuth_deg)
    elevation_rad = math.radians(elevation_deg)

    # Spherical to Cartesian conversion
    x = target[0] + radius * math.cos(elevation_rad) * math.cos(azimuth_rad)
    y = target[1] + radius * math.sin(elevation_rad)
    z = target[2] + radius * math.cos(elevation_rad) * math.sin(azimuth_rad)

    return (round(x, 3), round(y, 3), round(z, 3))`,
    testCases: [
      { input: '(0, 0, 0), 10, 0, 0', expectedOutput: '(10.0, 0.0, 0.0)', isHidden: false, description: 'On +X axis' },
      { input: '(0, 0, 0), 10, 90, 0', expectedOutput: '(0.0, 0.0, 10.0)', isHidden: false, description: 'On +Z axis' },
      { input: '(0, 0, 0), 10, 0, 90', expectedOutput: '(0.0, 10.0, 0.0)', isHidden: false, description: 'On +Y axis (top)' },
      { input: '(5, 5, 5), 10, 45, 30', expectedOutput: '(11.124, 10.0, 11.124)', isHidden: true, description: 'Arbitrary orbit with offset target' }
    ],
    hints: [
      'Convert angles to radians',
      'Use spherical coordinates: (radius, azimuth, elevation)',
      'x = target.x + r * cos(elev) * cos(azim)',
      'y = target.y + r * sin(elev)',
      'z = target.z + r * cos(elev) * sin(azim)',
      'Round to 3 decimals'
    ],
    language: 'python'
  }
];
