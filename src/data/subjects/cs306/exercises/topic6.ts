import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs306-t6-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Basic UV Coordinate Mapping',
    difficulty: 1,
    description: 'Map a point on a 2D plane to UV coordinates. Given a point in world space and the plane bounds, calculate UV coordinates (0-1 range).',
    starterCode: `def world_to_uv(point, min_x, max_x, min_y, max_y):
    """
    Convert world space coordinates to UV coordinates.

    Args:
        point: tuple (x, y) world position
        min_x, max_x: float, x bounds of the plane
        min_y, max_y: float, y bounds of the plane

    Returns:
        tuple (u, v) in range [0, 1]
    """
    # Your code here
    pass

# Test
print(world_to_uv((5.0, 7.5), 0.0, 10.0, 5.0, 10.0))`,
    solution: `def world_to_uv(point, min_x, max_x, min_y, max_y):
    """
    Convert world space coordinates to UV coordinates.

    Args:
        point: tuple (x, y) world position
        min_x, max_x: float, x bounds of the plane
        min_y, max_y: float, y bounds of the plane

    Returns:
        tuple (u, v) in range [0, 1]
    """
    # Normalize x to [0, 1]
    u = (point[0] - min_x) / (max_x - min_x)

    # Normalize y to [0, 1]
    v = (point[1] - min_y) / (max_y - min_y)

    return (u, v)

# Test
print(world_to_uv((5.0, 7.5), 0.0, 10.0, 5.0, 10.0))`,
    testCases: [
      {
        input: '(5.0, 7.5), 0.0, 10.0, 5.0, 10.0',
        expectedOutput: '(0.5, 0.5)',
        isHidden: false,
        description: 'Center of plane'
      },
      {
        input: '(0.0, 5.0), 0.0, 10.0, 5.0, 10.0',
        expectedOutput: '(0.0, 0.0)',
        isHidden: false,
        description: 'Minimum corner'
      },
      {
        input: '(10.0, 10.0), 0.0, 10.0, 5.0, 10.0',
        expectedOutput: '(1.0, 1.0)',
        isHidden: true,
        description: 'Maximum corner'
      }
    ],
    hints: [
      'U coordinate is the normalized x position',
      'V coordinate is the normalized y position',
      'Use the formula: (value - min) / (max - min)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Sample Texture Color',
    difficulty: 1,
    description: 'Sample a color from a 2D texture array given UV coordinates. Use nearest-neighbor sampling (no interpolation).',
    starterCode: `def sample_texture(texture, u, v):
    """
    Sample color from texture using UV coordinates.

    Args:
        texture: 2D list of (r, g, b) tuples, indexed as texture[y][x]
        u: float (0-1), horizontal texture coordinate
        v: float (0-1), vertical texture coordinate

    Returns:
        tuple (r, g, b) sampled color
    """
    # Your code here
    pass

# Test
texture = [
    [(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)],
    [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]
]
print(sample_texture(texture, 0.25, 0.25))`,
    solution: `def sample_texture(texture, u, v):
    """
    Sample color from texture using UV coordinates.

    Args:
        texture: 2D list of (r, g, b) tuples, indexed as texture[y][x]
        u: float (0-1), horizontal texture coordinate
        v: float (0-1), vertical texture coordinate

    Returns:
        tuple (r, g, b) sampled color
    """
    height = len(texture)
    width = len(texture[0])

    # Convert UV to pixel coordinates
    x = int(u * (width - 1))
    y = int(v * (height - 1))

    # Clamp to valid range
    x = max(0, min(width - 1, x))
    y = max(0, min(height - 1, y))

    return texture[y][x]

# Test
texture = [
    [(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)],
    [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]
]
print(sample_texture(texture, 0.25, 0.25))`,
    testCases: [
      {
        input: "[[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]], 0.25, 0.25",
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Sample top-left quadrant'
      },
      {
        input: "[[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]], 0.75, 0.25",
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Sample top-right quadrant'
      },
      {
        input: "[[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]], 1.0, 1.0",
        expectedOutput: '(1.0, 1.0, 0.0)',
        isHidden: true,
        description: 'Sample at maximum UV'
      }
    ],
    hints: [
      'Convert UV coordinates to pixel coordinates by multiplying by texture dimensions',
      'Use integer conversion for nearest-neighbor sampling',
      'Remember to clamp coordinates to valid range',
      'Texture is indexed as texture[y][x]'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'UV Tiling and Repeat',
    difficulty: 2,
    description: 'Implement UV coordinate tiling/wrapping. When UV coordinates are outside [0,1], they should wrap around to create a repeating pattern.',
    starterCode: `def wrap_uv(u, v):
    """
    Wrap UV coordinates to [0, 1] range for tiling.

    Args:
        u: float, horizontal coordinate (can be any value)
        v: float, vertical coordinate (can be any value)

    Returns:
        tuple (u, v) wrapped to [0, 1]
    """
    # Your code here
    pass

# Test
print(wrap_uv(2.3, -0.7))`,
    solution: `def wrap_uv(u, v):
    """
    Wrap UV coordinates to [0, 1] range for tiling.

    Args:
        u: float, horizontal coordinate (can be any value)
        v: float, vertical coordinate (can be any value)

    Returns:
        tuple (u, v) wrapped to [0, 1]
    """
    # Use modulo to wrap coordinates
    u_wrapped = u % 1.0
    v_wrapped = v % 1.0

    # Handle negative values
    if u_wrapped < 0:
        u_wrapped += 1.0
    if v_wrapped < 0:
        v_wrapped += 1.0

    return (u_wrapped, v_wrapped)

# Test
print(wrap_uv(2.3, -0.7))`,
    testCases: [
      {
        input: '2.3, -0.7',
        expectedOutput: '(0.3, 0.3)',
        isHidden: false,
        description: 'Positive and negative wrapping'
      },
      {
        input: '0.5, 0.5',
        expectedOutput: '(0.5, 0.5)',
        isHidden: false,
        description: 'Already in range'
      },
      {
        input: '3.0, -2.0',
        expectedOutput: '(0.0, 0.0)',
        isHidden: true,
        description: 'Integer values'
      }
    ],
    hints: [
      'Use the modulo operator (%) to wrap coordinates',
      'The fractional part of a number gives the wrapped value',
      'Handle negative values by adding 1 if the result is negative',
      'Python modulo already handles negatives correctly: -0.7 % 1.0 = 0.3'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Bilinear Texture Filtering',
    difficulty: 3,
    description: 'Implement bilinear filtering for texture sampling. Interpolate between the four nearest texture pixels based on UV fractional parts.',
    starterCode: `def bilinear_sample(texture, u, v):
    """
    Sample texture using bilinear filtering.

    Args:
        texture: 2D list of (r, g, b) tuples
        u: float (0-1), horizontal coordinate
        v: float (0-1), vertical coordinate

    Returns:
        tuple (r, g, b) interpolated color
    """
    # Your code here
    pass

# Test
texture = [
    [(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (1.0, 0.0, 0.0)],
    [(0.0, 1.0, 0.0), (1.0, 1.0, 0.0), (1.0, 1.0, 0.0)],
    [(0.0, 1.0, 0.0), (1.0, 1.0, 0.0), (1.0, 1.0, 0.0)]
]
print(bilinear_sample(texture, 0.5, 0.5))`,
    solution: `def bilinear_sample(texture, u, v):
    """
    Sample texture using bilinear filtering.

    Args:
        texture: 2D list of (r, g, b) tuples
        u: float (0-1), horizontal coordinate
        v: float (0-1), vertical coordinate

    Returns:
        tuple (r, g, b) interpolated color
    """
    height = len(texture)
    width = len(texture[0])

    # Convert to texture space
    x = u * (width - 1)
    y = v * (height - 1)

    # Get integer and fractional parts
    x0 = int(x)
    y0 = int(y)
    x1 = min(x0 + 1, width - 1)
    y1 = min(y0 + 1, height - 1)

    # Fractional parts for interpolation
    fx = x - x0
    fy = y - y0

    # Get four corner samples
    c00 = texture[y0][x0]  # top-left
    c10 = texture[y0][x1]  # top-right
    c01 = texture[y1][x0]  # bottom-left
    c11 = texture[y1][x1]  # bottom-right

    # Bilinear interpolation for each channel
    r = (1-fx)*(1-fy)*c00[0] + fx*(1-fy)*c10[0] + (1-fx)*fy*c01[0] + fx*fy*c11[0]
    g = (1-fx)*(1-fy)*c00[1] + fx*(1-fy)*c10[1] + (1-fx)*fy*c01[1] + fx*fy*c11[1]
    b = (1-fx)*(1-fy)*c00[2] + fx*(1-fy)*c10[2] + (1-fx)*fy*c01[2] + fx*fy*c11[2]

    return (r, g, b)

# Test
texture = [
    [(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (1.0, 0.0, 0.0)],
    [(0.0, 1.0, 0.0), (1.0, 1.0, 0.0), (1.0, 1.0, 0.0)],
    [(0.0, 1.0, 0.0), (1.0, 1.0, 0.0), (1.0, 1.0, 0.0)]
]
print(bilinear_sample(texture, 0.5, 0.5))`,
    testCases: [
      {
        input: "[[(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (1.0, 0.0, 0.0)], [(0.0, 1.0, 0.0), (1.0, 1.0, 0.0), (1.0, 1.0, 0.0)], [(0.0, 1.0, 0.0), (1.0, 1.0, 0.0), (1.0, 1.0, 0.0)]], 0.5, 0.5",
        expectedOutput: '(0.5, 0.5, 0.0)',
        isHidden: false,
        description: 'Center interpolation'
      },
      {
        input: "[[(0.0, 0.0, 0.0), (1.0, 1.0, 1.0)], [(0.0, 0.0, 0.0), (1.0, 1.0, 1.0)]], 0.25, 0.5",
        expectedOutput: '(0.25, 0.25, 0.25)',
        isHidden: false,
        description: 'Quarter interpolation'
      },
      {
        input: "[[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 1.0)]], 0.5, 0.5",
        expectedOutput: '(0.5, 0.5, 0.5)',
        isHidden: true,
        description: 'Four different corner colors'
      }
    ],
    hints: [
      'Find the four nearest texels (pixels) around the sample point',
      'Calculate fractional parts (fx, fy) for interpolation weights',
      'Interpolate horizontally first, then vertically (or vice versa)',
      'Or use the full bilinear formula: (1-fx)(1-fy)C00 + fx(1-fy)C10 + (1-fx)fyC01 + fxfyC11',
      'Apply interpolation to each color channel separately'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Spherical UV Mapping',
    difficulty: 3,
    description: 'Calculate UV coordinates for a point on a sphere using spherical coordinates. U is based on the azimuthal angle (longitude), V is based on the polar angle (latitude).',
    starterCode: `import math

def sphere_uv_mapping(point, center, radius):
    """
    Calculate UV coordinates for a point on a sphere.

    Args:
        point: tuple (x, y, z) point on sphere surface
        center: tuple (x, y, z) sphere center
        radius: float, sphere radius

    Returns:
        tuple (u, v) UV coordinates

    Notes:
        - U = 0.5 + atan2(z, x) / (2π)
        - V = 0.5 - asin(y / radius) / π
    """
    # Your code here
    pass

# Test
print(sphere_uv_mapping((1.0, 0.0, 0.0), (0.0, 0.0, 0.0), 1.0))`,
    solution: `import math

def sphere_uv_mapping(point, center, radius):
    """
    Calculate UV coordinates for a point on a sphere.

    Args:
        point: tuple (x, y, z) point on sphere surface
        center: tuple (x, y, z) sphere center
        radius: float, sphere radius

    Returns:
        tuple (u, v) UV coordinates

    Notes:
        - U = 0.5 + atan2(z, x) / (2π)
        - V = 0.5 - asin(y / radius) / π
    """
    # Translate to sphere's local coordinates
    local_x = point[0] - center[0]
    local_y = point[1] - center[1]
    local_z = point[2] - center[2]

    # Calculate U from azimuthal angle
    u = 0.5 + math.atan2(local_z, local_x) / (2 * math.pi)

    # Calculate V from polar angle
    # Clamp y/radius to [-1, 1] to avoid domain errors
    y_normalized = max(-1.0, min(1.0, local_y / radius))
    v = 0.5 - math.asin(y_normalized) / math.pi

    return (u, v)

# Test
print(sphere_uv_mapping((1.0, 0.0, 0.0), (0.0, 0.0, 0.0), 1.0))`,
    testCases: [
      {
        input: '(1.0, 0.0, 0.0), (0.0, 0.0, 0.0), 1.0',
        expectedOutput: '(0.5, 0.5)',
        isHidden: false,
        description: 'Point on equator at 0 degrees'
      },
      {
        input: '(0.0, 1.0, 0.0), (0.0, 0.0, 0.0), 1.0',
        expectedOutput: '(0.5, 0.0)',
        isHidden: false,
        description: 'North pole'
      },
      {
        input: '(0.0, 0.0, 1.0), (0.0, 0.0, 0.0), 1.0',
        expectedOutput: '(0.75, 0.5)',
        isHidden: true,
        description: 'Point on equator at 90 degrees'
      }
    ],
    hints: [
      'First translate the point to the sphere\'s local coordinate system',
      'Use atan2(z, x) to get the azimuthal angle for U',
      'Use asin(y/r) to get the polar angle for V',
      'Add 0.5 and normalize to map to [0, 1] range',
      'Clamp y/radius to [-1, 1] before asin to avoid domain errors'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Cylindrical UV Mapping',
    difficulty: 2,
    description: 'Calculate UV coordinates for a point on a cylinder. U is based on the angle around the cylinder, V is based on height.',
    starterCode: `import math

def cylinder_uv_mapping(point, center, radius, height):
    """
    Calculate UV coordinates for a point on a cylinder.

    Args:
        point: tuple (x, y, z) point on cylinder surface
        center: tuple (x, y, z) cylinder center (bottom)
        radius: float, cylinder radius
        height: float, cylinder height

    Returns:
        tuple (u, v) UV coordinates

    Notes:
        - Cylinder extends along Y axis from center
        - U = 0.5 + atan2(z, x) / (2π)
        - V = y / height
    """
    # Your code here
    pass

# Test
print(cylinder_uv_mapping((1.0, 5.0, 0.0), (0.0, 0.0, 0.0), 1.0, 10.0))`,
    solution: `import math

def cylinder_uv_mapping(point, center, radius, height):
    """
    Calculate UV coordinates for a point on a cylinder.

    Args:
        point: tuple (x, y, z) point on cylinder surface
        center: tuple (x, y, z) cylinder center (bottom)
        radius: float, cylinder radius
        height: float, cylinder height

    Returns:
        tuple (u, v) UV coordinates

    Notes:
        - Cylinder extends along Y axis from center
        - U = 0.5 + atan2(z, x) / (2π)
        - V = y / height
    """
    # Translate to cylinder's local coordinates
    local_x = point[0] - center[0]
    local_y = point[1] - center[1]
    local_z = point[2] - center[2]

    # Calculate U from angle around cylinder
    u = 0.5 + math.atan2(local_z, local_x) / (2 * math.pi)

    # Calculate V from height
    v = local_y / height

    return (u, v)

# Test
print(cylinder_uv_mapping((1.0, 5.0, 0.0), (0.0, 0.0, 0.0), 1.0, 10.0))`,
    testCases: [
      {
        input: '(1.0, 5.0, 0.0), (0.0, 0.0, 0.0), 1.0, 10.0',
        expectedOutput: '(0.5, 0.5)',
        isHidden: false,
        description: 'Middle height, 0 degree angle'
      },
      {
        input: '(0.0, 10.0, 1.0), (0.0, 0.0, 0.0), 1.0, 10.0',
        expectedOutput: '(0.75, 1.0)',
        isHidden: false,
        description: 'Top of cylinder, 90 degree angle'
      },
      {
        input: '(-1.0, 0.0, 0.0), (0.0, 0.0, 0.0), 1.0, 10.0',
        expectedOutput: '(0.0, 0.0)',
        isHidden: true,
        description: 'Bottom of cylinder, 180 degree angle'
      }
    ],
    hints: [
      'Translate the point to cylinder\'s local coordinate system',
      'U is based on the angle around the Y axis using atan2(z, x)',
      'V is simply the normalized height (y / total_height)',
      'Add 0.5 to the atan2 result and divide by 2π to map to [0, 1]'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Calculate Tangent Space Vector',
    difficulty: 3,
    description: 'Calculate the tangent vector for a triangle face given its vertices and UV coordinates. The tangent points in the direction of increasing U.',
    starterCode: `def calculate_tangent(pos0, pos1, pos2, uv0, uv1, uv2):
    """
    Calculate tangent vector for a triangle.

    Args:
        pos0, pos1, pos2: tuples (x, y, z), triangle vertices
        uv0, uv1, uv2: tuples (u, v), UV coordinates for vertices

    Returns:
        tuple (x, y, z), unnormalized tangent vector

    Notes:
        Edge1 = pos1 - pos0, Edge2 = pos2 - pos0
        DeltaUV1 = uv1 - uv0, DeltaUV2 = uv2 - uv0
        Tangent = (DeltaV2 * Edge1 - DeltaV1 * Edge2) / (DeltaU1 * DeltaV2 - DeltaU2 * DeltaV1)
    """
    # Your code here
    pass

# Test
print(calculate_tangent(
    (0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0),
    (0.0, 0.0), (1.0, 0.0), (0.0, 1.0)
))`,
    solution: `def calculate_tangent(pos0, pos1, pos2, uv0, uv1, uv2):
    """
    Calculate tangent vector for a triangle.

    Args:
        pos0, pos1, pos2: tuples (x, y, z), triangle vertices
        uv0, uv1, uv2: tuples (u, v), UV coordinates for vertices

    Returns:
        tuple (x, y, z), unnormalized tangent vector

    Notes:
        Edge1 = pos1 - pos0, Edge2 = pos2 - pos0
        DeltaUV1 = uv1 - uv0, DeltaUV2 = uv2 - uv0
        Tangent = (DeltaV2 * Edge1 - DeltaV1 * Edge2) / (DeltaU1 * DeltaV2 - DeltaU2 * DeltaV1)
    """
    # Calculate edges in position space
    edge1 = (pos1[0] - pos0[0], pos1[1] - pos0[1], pos1[2] - pos0[2])
    edge2 = (pos2[0] - pos0[0], pos2[1] - pos0[1], pos2[2] - pos0[2])

    # Calculate edges in UV space
    delta_uv1 = (uv1[0] - uv0[0], uv1[1] - uv0[1])
    delta_uv2 = (uv2[0] - uv0[0], uv2[1] - uv0[1])

    # Calculate denominator
    det = delta_uv1[0] * delta_uv2[1] - delta_uv2[0] * delta_uv1[1]

    if abs(det) < 0.0001:
        # Degenerate case, return arbitrary tangent
        return (1.0, 0.0, 0.0)

    # Calculate tangent using the formula
    f = 1.0 / det

    tangent_x = f * (delta_uv2[1] * edge1[0] - delta_uv1[1] * edge2[0])
    tangent_y = f * (delta_uv2[1] * edge1[1] - delta_uv1[1] * edge2[1])
    tangent_z = f * (delta_uv2[1] * edge1[2] - delta_uv1[1] * edge2[2])

    return (tangent_x, tangent_y, tangent_z)

# Test
print(calculate_tangent(
    (0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0),
    (0.0, 0.0), (1.0, 0.0), (0.0, 1.0)
))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0), (1.0, 0.0), (0.0, 1.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Simple aligned triangle'
      },
      {
        input: '(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (1.0, 1.0, 0.0), (0.0, 0.0), (1.0, 0.0), (1.0, 1.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Right triangle in XY plane'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, 1.0), (0.0, 1.0, 1.0), (0.0, 0.0), (1.0, 0.0), (1.0, 1.0)',
        expectedOutput: '(0.0, 0.0, 1.0)',
        isHidden: true,
        description: 'Triangle in YZ plane'
      }
    ],
    hints: [
      'Calculate the position edges: Edge1 = pos1 - pos0, Edge2 = pos2 - pos0',
      'Calculate UV deltas: DeltaUV1 = uv1 - uv0, DeltaUV2 = uv2 - uv0',
      'Calculate determinant: det = DeltaU1 * DeltaV2 - DeltaU2 * DeltaV1',
      'Tangent = (DeltaV2 * Edge1 - DeltaV1 * Edge2) / det',
      'Handle the degenerate case where det is near zero'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Calculate Bitangent Vector',
    difficulty: 3,
    description: 'Calculate the bitangent (binormal) vector for a triangle. The bitangent points in the direction of increasing V and is perpendicular to the tangent.',
    starterCode: `def calculate_bitangent(pos0, pos1, pos2, uv0, uv1, uv2):
    """
    Calculate bitangent vector for a triangle.

    Args:
        pos0, pos1, pos2: tuples (x, y, z), triangle vertices
        uv0, uv1, uv2: tuples (u, v), UV coordinates for vertices

    Returns:
        tuple (x, y, z), unnormalized bitangent vector

    Notes:
        Bitangent = (DeltaU1 * Edge2 - DeltaU2 * Edge1) / (DeltaU1 * DeltaV2 - DeltaU2 * DeltaV1)
    """
    # Your code here
    pass

# Test
print(calculate_bitangent(
    (0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0),
    (0.0, 0.0), (1.0, 0.0), (0.0, 1.0)
))`,
    solution: `def calculate_bitangent(pos0, pos1, pos2, uv0, uv1, uv2):
    """
    Calculate bitangent vector for a triangle.

    Args:
        pos0, pos1, pos2: tuples (x, y, z), triangle vertices
        uv0, uv1, uv2: tuples (u, v), UV coordinates for vertices

    Returns:
        tuple (x, y, z), unnormalized bitangent vector

    Notes:
        Bitangent = (DeltaU1 * Edge2 - DeltaU2 * Edge1) / (DeltaU1 * DeltaV2 - DeltaU2 * DeltaV1)
    """
    # Calculate edges in position space
    edge1 = (pos1[0] - pos0[0], pos1[1] - pos0[1], pos1[2] - pos0[2])
    edge2 = (pos2[0] - pos0[0], pos2[1] - pos0[1], pos2[2] - pos0[2])

    # Calculate edges in UV space
    delta_uv1 = (uv1[0] - uv0[0], uv1[1] - uv0[1])
    delta_uv2 = (uv2[0] - uv0[0], uv2[1] - uv0[1])

    # Calculate denominator
    det = delta_uv1[0] * delta_uv2[1] - delta_uv2[0] * delta_uv1[1]

    if abs(det) < 0.0001:
        # Degenerate case, return arbitrary bitangent
        return (0.0, 1.0, 0.0)

    # Calculate bitangent using the formula
    f = 1.0 / det

    bitangent_x = f * (delta_uv1[0] * edge2[0] - delta_uv2[0] * edge1[0])
    bitangent_y = f * (delta_uv1[0] * edge2[1] - delta_uv2[0] * edge1[1])
    bitangent_z = f * (delta_uv1[0] * edge2[2] - delta_uv2[0] * edge1[2])

    return (bitangent_x, bitangent_y, bitangent_z)

# Test
print(calculate_bitangent(
    (0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0),
    (0.0, 0.0), (1.0, 0.0), (0.0, 1.0)
))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0), (1.0, 0.0), (0.0, 1.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Simple aligned triangle'
      },
      {
        input: '(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (1.0, 1.0, 0.0), (0.0, 0.0), (1.0, 0.0), (1.0, 1.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Right triangle in XY plane'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, 1.0), (0.0, 1.0, 1.0), (0.0, 0.0), (1.0, 0.0), (1.0, 1.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: true,
        description: 'Triangle in YZ plane'
      }
    ],
    hints: [
      'The calculation is similar to tangent but uses Delta U instead of Delta V',
      'Bitangent = (DeltaU1 * Edge2 - DeltaU2 * Edge1) / det',
      'Use the same denominator as the tangent calculation',
      'The bitangent is perpendicular to the tangent in the surface plane'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Transform Normal from Tangent Space',
    difficulty: 3,
    description: 'Transform a normal vector from tangent space to world space using the TBN (Tangent-Bitangent-Normal) matrix. This is used for normal mapping.',
    starterCode: `def tangent_to_world(tangent_normal, tangent, bitangent, normal):
    """
    Transform a normal from tangent space to world space.

    Args:
        tangent_normal: tuple (x, y, z), normal in tangent space (from normal map)
        tangent: tuple (x, y, z), tangent vector in world space
        bitangent: tuple (x, y, z), bitangent vector in world space
        normal: tuple (x, y, z), normal vector in world space

    Returns:
        tuple (x, y, z), normal in world space

    Notes:
        World_Normal = tangent_normal.x * T + tangent_normal.y * B + tangent_normal.z * N
    """
    # Your code here
    pass

# Test
print(tangent_to_world(
    (0.0, 0.0, 1.0),
    (1.0, 0.0, 0.0),
    (0.0, 1.0, 0.0),
    (0.0, 0.0, 1.0)
))`,
    solution: `def tangent_to_world(tangent_normal, tangent, bitangent, normal):
    """
    Transform a normal from tangent space to world space.

    Args:
        tangent_normal: tuple (x, y, z), normal in tangent space (from normal map)
        tangent: tuple (x, y, z), tangent vector in world space
        bitangent: tuple (x, y, z), bitangent vector in world space
        normal: tuple (x, y, z), normal vector in world space

    Returns:
        tuple (x, y, z), normal in world space

    Notes:
        World_Normal = tangent_normal.x * T + tangent_normal.y * B + tangent_normal.z * N
    """
    # Transform using TBN matrix
    world_x = (tangent_normal[0] * tangent[0] +
               tangent_normal[1] * bitangent[0] +
               tangent_normal[2] * normal[0])

    world_y = (tangent_normal[0] * tangent[1] +
               tangent_normal[1] * bitangent[1] +
               tangent_normal[2] * normal[1])

    world_z = (tangent_normal[0] * tangent[2] +
               tangent_normal[1] * bitangent[2] +
               tangent_normal[2] * normal[2])

    return (world_x, world_y, world_z)

# Test
print(tangent_to_world(
    (0.0, 0.0, 1.0),
    (1.0, 0.0, 0.0),
    (0.0, 1.0, 0.0),
    (0.0, 0.0, 1.0)
))`,
    testCases: [
      {
        input: '(0.0, 0.0, 1.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)',
        expectedOutput: '(0.0, 0.0, 1.0)',
        isHidden: false,
        description: 'Identity transformation (no perturbation)'
      },
      {
        input: '(1.0, 0.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Perturbed along tangent direction'
      },
      {
        input: '(0.5, 0.5, 0.707), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)',
        expectedOutput: '(0.5, 0.5, 0.707)',
        isHidden: true,
        description: 'Mixed perturbation'
      }
    ],
    hints: [
      'The TBN matrix transforms from tangent space to world space',
      'Multiply the tangent space normal by each basis vector',
      'World_x = tn.x*T.x + tn.y*B.x + tn.z*N.x (similarly for y and z)',
      'This is essentially a matrix-vector multiplication',
      'In tangent space, (0,0,1) represents an unperturbed surface normal'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Sample and Apply Normal Map',
    difficulty: 4,
    description: 'Sample a normal map texture and convert the color values to a tangent space normal vector. Normal map RGB values [0,1] map to normal components [-1,1].',
    starterCode: `import math

def sample_normal_map(normal_map, u, v):
    """
    Sample a normal map and convert to tangent space normal.

    Args:
        normal_map: 2D list of (r, g, b) tuples (values 0-1)
        u, v: float (0-1), UV coordinates

    Returns:
        tuple (x, y, z), tangent space normal vector (components -1 to 1)

    Notes:
        - Normal.x = R * 2 - 1
        - Normal.y = G * 2 - 1
        - Normal.z = B * 2 - 1
        - Normalize the result
    """
    # Your code here
    pass

# Test
normal_map = [
    [(0.5, 0.5, 1.0), (0.6, 0.5, 0.9)],
    [(0.4, 0.5, 0.9), (0.5, 0.5, 1.0)]
]
print(sample_normal_map(normal_map, 0.25, 0.25))`,
    solution: `import math

def sample_normal_map(normal_map, u, v):
    """
    Sample a normal map and convert to tangent space normal.

    Args:
        normal_map: 2D list of (r, g, b) tuples (values 0-1)
        u, v: float (0-1), UV coordinates

    Returns:
        tuple (x, y, z), tangent space normal vector (components -1 to 1)

    Notes:
        - Normal.x = R * 2 - 1
        - Normal.y = G * 2 - 1
        - Normal.z = B * 2 - 1
        - Normalize the result
    """
    # Sample texture (nearest neighbor)
    height = len(normal_map)
    width = len(normal_map[0])

    x = int(u * (width - 1))
    y = int(v * (height - 1))

    x = max(0, min(width - 1, x))
    y = max(0, min(height - 1, y))

    color = normal_map[y][x]

    # Convert from [0,1] to [-1,1]
    nx = color[0] * 2.0 - 1.0
    ny = color[1] * 2.0 - 1.0
    nz = color[2] * 2.0 - 1.0

    # Normalize
    magnitude = math.sqrt(nx*nx + ny*ny + nz*nz)
    if magnitude < 0.0001:
        return (0.0, 0.0, 1.0)  # Default to facing up

    nx /= magnitude
    ny /= magnitude
    nz /= magnitude

    return (nx, ny, nz)

# Test
normal_map = [
    [(0.5, 0.5, 1.0), (0.6, 0.5, 0.9)],
    [(0.4, 0.5, 0.9), (0.5, 0.5, 1.0)]
]
print(sample_normal_map(normal_map, 0.25, 0.25))`,
    testCases: [
      {
        input: "[[(0.5, 0.5, 1.0), (0.6, 0.5, 0.9)], [(0.4, 0.5, 0.9), (0.5, 0.5, 1.0)]], 0.25, 0.25",
        expectedOutput: '(0.0, 0.0, 1.0)',
        isHidden: false,
        description: 'Flat normal (purple/blue color)'
      },
      {
        input: "[[(1.0, 0.5, 0.5), (0.5, 0.5, 1.0)], [(0.5, 0.5, 1.0), (0.5, 0.5, 1.0)]], 0.25, 0.25",
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Normal pointing in +X direction (red color)'
      },
      {
        input: "[[(0.7, 0.6, 0.8), (0.5, 0.5, 1.0)], [(0.5, 0.5, 1.0), (0.5, 0.5, 1.0)]], 0.25, 0.25",
        expectedOutput: '(0.5883484054145521, 0.29417420270727606, 0.7533701668546251)',
        isHidden: true,
        description: 'Perturbed normal'
      }
    ],
    hints: [
      'First sample the texture color using UV coordinates',
      'Convert each RGB component from [0,1] to [-1,1] using: component * 2 - 1',
      'Normalize the resulting vector to ensure it has unit length',
      'Blue normal maps (RGB ≈ 0.5, 0.5, 1.0) represent unperturbed surfaces',
      'R channel represents X, G represents Y, B represents Z in tangent space'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Calculate Mipmap Level',
    difficulty: 4,
    description: 'Calculate the appropriate mipmap level based on texture coordinate derivatives. This helps avoid aliasing when textures are minified.',
    starterCode: `import math

def calculate_mipmap_level(du_dx, du_dy, dv_dx, dv_dy, texture_width, texture_height):
    """
    Calculate mipmap level based on UV derivatives.

    Args:
        du_dx, du_dy: float, partial derivatives of U with respect to screen x and y
        dv_dx, dv_dy: float, partial derivatives of V with respect to screen x and y
        texture_width: int, width of the base mipmap level
        texture_height: int, height of the base mipmap level

    Returns:
        float, mipmap level (0 = full resolution)

    Notes:
        - Scale derivatives by texture dimensions
        - Calculate the maximum rate of change
        - Level = log2(max_rate)
    """
    # Your code here
    pass

# Test
print(calculate_mipmap_level(0.01, 0.0, 0.0, 0.01, 256, 256))`,
    solution: `import math

def calculate_mipmap_level(du_dx, du_dy, dv_dx, dv_dy, texture_width, texture_height):
    """
    Calculate mipmap level based on UV derivatives.

    Args:
        du_dx, du_dy: float, partial derivatives of U with respect to screen x and y
        dv_dx, dv_dy: float, partial derivatives of V with respect to screen x and y
        texture_width: int, width of the base mipmap level
        texture_height: int, height of the base mipmap level

    Returns:
        float, mipmap level (0 = full resolution)

    Notes:
        - Scale derivatives by texture dimensions
        - Calculate the maximum rate of change
        - Level = log2(max_rate)
    """
    # Scale derivatives by texture dimensions
    dudx_scaled = du_dx * texture_width
    dudy_scaled = du_dy * texture_width
    dvdx_scaled = dv_dx * texture_height
    dvdy_scaled = dv_dy * texture_height

    # Calculate lengths of derivative vectors
    # Length in x direction
    len_x = math.sqrt(dudx_scaled * dudx_scaled + dvdx_scaled * dvdx_scaled)

    # Length in y direction
    len_y = math.sqrt(dudy_scaled * dudy_scaled + dvdy_scaled * dvdy_scaled)

    # Take maximum
    max_rate = max(len_x, len_y)

    # Avoid log(0)
    if max_rate < 0.0001:
        return 0.0

    # Calculate mipmap level
    level = math.log2(max_rate)

    # Clamp to valid range
    return max(0.0, level)

# Test
print(calculate_mipmap_level(0.01, 0.0, 0.0, 0.01, 256, 256))`,
    testCases: [
      {
        input: '0.01, 0.0, 0.0, 0.01, 256, 256',
        expectedOutput: '1.3579477780860344',
        isHidden: false,
        description: 'Medium detail level'
      },
      {
        input: '0.001, 0.0, 0.0, 0.001, 512, 512',
        expectedOutput: '0.0',
        isHidden: false,
        description: 'High detail (near camera)'
      },
      {
        input: '0.1, 0.0, 0.0, 0.1, 128, 128',
        expectedOutput: '4.011227255423254',
        isHidden: true,
        description: 'Low detail (far from camera)'
      }
    ],
    hints: [
      'Scale the derivatives by texture dimensions to get texels per pixel',
      'Calculate the rate of change in both screen X and Y directions',
      'Use the Pythagorean theorem to get vector lengths',
      'Take the maximum of the two rates',
      'Use log2 to convert from texels-per-pixel to mipmap level',
      'Level 0 is full resolution, level 1 is half resolution, etc.'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Trilinear Texture Filtering',
    difficulty: 4,
    description: 'Implement trilinear filtering by sampling two mipmap levels with bilinear filtering and interpolating between them.',
    starterCode: `import math

def bilinear_sample(texture, u, v):
    """Helper function for bilinear sampling (provided)."""
    height = len(texture)
    width = len(texture[0])
    x = u * (width - 1)
    y = v * (height - 1)
    x0 = int(x)
    y0 = int(y)
    x1 = min(x0 + 1, width - 1)
    y1 = min(y0 + 1, height - 1)
    fx = x - x0
    fy = y - y0
    c00, c10, c01, c11 = texture[y0][x0], texture[y0][x1], texture[y1][x0], texture[y1][x1]
    r = (1-fx)*(1-fy)*c00[0] + fx*(1-fy)*c10[0] + (1-fx)*fy*c01[0] + fx*fy*c11[0]
    g = (1-fx)*(1-fy)*c00[1] + fx*(1-fy)*c10[1] + (1-fx)*fy*c01[1] + fx*fy*c11[1]
    b = (1-fx)*(1-fy)*c00[2] + fx*(1-fy)*c10[2] + (1-fx)*fy*c01[2] + fx*fy*c11[2]
    return (r, g, b)

def trilinear_sample(mipmaps, u, v, mipmap_level):
    """
    Sample texture using trilinear filtering.

    Args:
        mipmaps: list of 2D texture arrays (mipmap chain)
        u, v: float (0-1), UV coordinates
        mipmap_level: float, calculated mipmap level

    Returns:
        tuple (r, g, b) interpolated color
    """
    # Your code here
    pass

# Test
mipmaps = [
    [[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]],  # Level 0
    [[(0.5, 0.25, 0.25)]]  # Level 1
]
print(trilinear_sample(mipmaps, 0.5, 0.5, 0.5))`,
    solution: `import math

def bilinear_sample(texture, u, v):
    """Helper function for bilinear sampling (provided)."""
    height = len(texture)
    width = len(texture[0])
    x = u * (width - 1)
    y = v * (height - 1)
    x0 = int(x)
    y0 = int(y)
    x1 = min(x0 + 1, width - 1)
    y1 = min(y0 + 1, height - 1)
    fx = x - x0
    fy = y - y0
    c00, c10, c01, c11 = texture[y0][x0], texture[y0][x1], texture[y1][x0], texture[y1][x1]
    r = (1-fx)*(1-fy)*c00[0] + fx*(1-fy)*c10[0] + (1-fx)*fy*c01[0] + fx*fy*c11[0]
    g = (1-fx)*(1-fy)*c00[1] + fx*(1-fy)*c10[1] + (1-fx)*fy*c01[1] + fx*fy*c11[1]
    b = (1-fx)*(1-fy)*c00[2] + fx*(1-fy)*c10[2] + (1-fx)*fy*c01[2] + fx*fy*c11[2]
    return (r, g, b)

def trilinear_sample(mipmaps, u, v, mipmap_level):
    """
    Sample texture using trilinear filtering.

    Args:
        mipmaps: list of 2D texture arrays (mipmap chain)
        u, v: float (0-1), UV coordinates
        mipmap_level: float, calculated mipmap level

    Returns:
        tuple (r, g, b) interpolated color
    """
    # Clamp mipmap level to valid range
    max_level = len(mipmaps) - 1
    mipmap_level = max(0.0, min(max_level, mipmap_level))

    # Get integer and fractional parts
    level0 = int(mipmap_level)
    level1 = min(level0 + 1, max_level)
    blend = mipmap_level - level0

    # Sample both levels with bilinear filtering
    color0 = bilinear_sample(mipmaps[level0], u, v)
    color1 = bilinear_sample(mipmaps[level1], u, v)

    # Interpolate between the two levels
    r = color0[0] * (1 - blend) + color1[0] * blend
    g = color0[1] * (1 - blend) + color1[1] * blend
    b = color0[2] * (1 - blend) + color1[2] * blend

    return (r, g, b)

# Test
mipmaps = [
    [[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]],  # Level 0
    [[(0.5, 0.25, 0.25)]]  # Level 1
]
print(trilinear_sample(mipmaps, 0.5, 0.5, 0.5))`,
    testCases: [
      {
        input: "[[[(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)], [(0.0, 0.0, 1.0), (1.0, 1.0, 0.0)]], [[(0.5, 0.25, 0.25)]]], 0.5, 0.5, 0.5",
        expectedOutput: '(0.5, 0.25, 0.25)',
        isHidden: false,
        description: 'Blend between two mipmap levels'
      },
      {
        input: "[[[(1.0, 1.0, 1.0), (0.0, 0.0, 0.0)], [(0.0, 0.0, 0.0), (1.0, 1.0, 1.0)]], [[(0.5, 0.5, 0.5)]]], 0.25, 0.25, 0.0",
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'Level 0 only (no blending)'
      },
      {
        input: "[[[(1.0, 0.0, 0.0)]], [[(0.0, 1.0, 0.0)]], [[(0.0, 0.0, 1.0)]]], 0.5, 0.5, 1.5",
        expectedOutput: '(0.0, 0.5, 0.5)',
        isHidden: true,
        description: 'Blend between levels 1 and 2'
      }
    ],
    hints: [
      'Clamp the mipmap level to valid range [0, max_level]',
      'Split the level into integer part (which levels) and fractional part (blend factor)',
      'Use bilinear sampling on both adjacent mipmap levels',
      'Linearly interpolate between the two sampled colors using the fractional part',
      'Trilinear = bilinear on level N + bilinear on level N+1, then blend'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Parallax Occlusion Mapping Offset',
    difficulty: 5,
    description: 'Calculate UV offset for parallax occlusion mapping. This technique adjusts UV coordinates based on view direction and height map to create depth illusion.',
    starterCode: `def parallax_offset(height_map, u, v, view_dir_tangent, height_scale):
    """
    Calculate UV offset for parallax mapping.

    Args:
        height_map: 2D list of float values (0-1), where 1 = raised, 0 = deep
        u, v: float (0-1), original UV coordinates
        view_dir_tangent: tuple (x, y, z), view direction in tangent space
        height_scale: float, strength of parallax effect

    Returns:
        tuple (u_offset, v_offset) to add to original UVs

    Notes:
        - Sample height at UV
        - Offset = (view_dir_tangent.xy / view_dir_tangent.z) * (height - 0.5) * height_scale
    """
    # Your code here
    pass

# Test
height_map = [
    [0.0, 0.5],
    [0.5, 1.0]
]
print(parallax_offset(height_map, 0.25, 0.25, (0.2, 0.2, 1.0), 0.1))`,
    solution: `def parallax_offset(height_map, u, v, view_dir_tangent, height_scale):
    """
    Calculate UV offset for parallax mapping.

    Args:
        height_map: 2D list of float values (0-1), where 1 = raised, 0 = deep
        u, v: float (0-1), original UV coordinates
        view_dir_tangent: tuple (x, y, z), view direction in tangent space
        height_scale: float, strength of parallax effect

    Returns:
        tuple (u_offset, v_offset) to add to original UVs

    Notes:
        - Sample height at UV
        - Offset = (view_dir_tangent.xy / view_dir_tangent.z) * (height - 0.5) * height_scale
    """
    # Sample height map
    height = len(height_map)
    width = len(height_map[0])

    x = int(u * (width - 1))
    y = int(v * (height - 1))

    x = max(0, min(width - 1, x))
    y = max(0, min(height - 1, y))

    sampled_height = height_map[y][x]

    # Avoid division by zero
    if abs(view_dir_tangent[2]) < 0.0001:
        return (0.0, 0.0)

    # Calculate offset
    # Center height around 0 (0.5 = no offset)
    height_factor = (sampled_height - 0.5) * height_scale

    # Project view direction onto tangent plane
    u_offset = (view_dir_tangent[0] / view_dir_tangent[2]) * height_factor
    v_offset = (view_dir_tangent[1] / view_dir_tangent[2]) * height_factor

    return (u_offset, v_offset)

# Test
height_map = [
    [0.0, 0.5],
    [0.5, 1.0]
]
print(parallax_offset(height_map, 0.25, 0.25, (0.2, 0.2, 1.0), 0.1))`,
    testCases: [
      {
        input: '[[0.0, 0.5], [0.5, 1.0]], 0.25, 0.25, (0.2, 0.2, 1.0), 0.1',
        expectedOutput: '(-0.01, -0.01)',
        isHidden: false,
        description: 'Low height value, negative offset'
      },
      {
        input: '[[0.0, 0.5], [0.5, 1.0]], 0.75, 0.75, (0.2, 0.2, 1.0), 0.1',
        expectedOutput: '(0.01, 0.01)',
        isHidden: false,
        description: 'High height value, positive offset'
      },
      {
        input: '[[0.5, 0.5], [0.5, 0.5]], 0.5, 0.5, (0.4, 0.0, 1.0), 0.2',
        expectedOutput: '(0.0, 0.0)',
        isHidden: true,
        description: 'Mid-height (0.5), no offset'
      }
    ],
    hints: [
      'Sample the height map at the given UV coordinates',
      'Height of 0.5 means no displacement, so subtract 0.5 to center',
      'Divide view direction XY by Z to get the parallax direction',
      'Scale by height and height_scale parameter',
      'The offset shifts UV coordinates to simulate depth',
      'When viewing at an angle, higher points should shift opposite to view direction'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Cube Map Face Selection',
    difficulty: 4,
    description: 'Determine which face of a cube map to sample and calculate UV coordinates for environment mapping. Given a 3D direction vector, find the corresponding cube face and 2D coordinates.',
    starterCode: `def cube_map_lookup(direction):
    """
    Convert 3D direction to cube map face and UV coordinates.

    Args:
        direction: tuple (x, y, z), normalized direction vector

    Returns:
        tuple (face_index, u, v) where:
            face_index: 0=+X, 1=-X, 2=+Y, 3=-Y, 4=+Z, 5=-Z
            u, v: float (0-1), coordinates on that face

    Notes:
        - Choose face with largest absolute component
        - Map other two components to UV based on face orientation
    """
    # Your code here
    pass

# Test
print(cube_map_lookup((1.0, 0.2, 0.3)))`,
    solution: `def cube_map_lookup(direction):
    """
    Convert 3D direction to cube map face and UV coordinates.

    Args:
        direction: tuple (x, y, z), normalized direction vector

    Returns:
        tuple (face_index, u, v) where:
            face_index: 0=+X, 1=-X, 2=+Y, 3=-Y, 4=+Z, 5=-Z
            u, v: float (0-1), coordinates on that face

    Notes:
        - Choose face with largest absolute component
        - Map other two components to UV based on face orientation
    """
    abs_x = abs(direction[0])
    abs_y = abs(direction[1])
    abs_z = abs(direction[2])

    # Determine which face
    if abs_x >= abs_y and abs_x >= abs_z:
        # X-dominant
        if direction[0] > 0:
            # +X face (face 0)
            face_index = 0
            u = 0.5 - direction[2] / (2.0 * abs_x)
            v = 0.5 - direction[1] / (2.0 * abs_x)
        else:
            # -X face (face 1)
            face_index = 1
            u = 0.5 + direction[2] / (2.0 * abs_x)
            v = 0.5 - direction[1] / (2.0 * abs_x)
    elif abs_y >= abs_z:
        # Y-dominant
        if direction[1] > 0:
            # +Y face (face 2)
            face_index = 2
            u = 0.5 + direction[0] / (2.0 * abs_y)
            v = 0.5 + direction[2] / (2.0 * abs_y)
        else:
            # -Y face (face 3)
            face_index = 3
            u = 0.5 + direction[0] / (2.0 * abs_y)
            v = 0.5 - direction[2] / (2.0 * abs_y)
    else:
        # Z-dominant
        if direction[2] > 0:
            # +Z face (face 4)
            face_index = 4
            u = 0.5 + direction[0] / (2.0 * abs_z)
            v = 0.5 - direction[1] / (2.0 * abs_z)
        else:
            # -Z face (face 5)
            face_index = 5
            u = 0.5 - direction[0] / (2.0 * abs_z)
            v = 0.5 - direction[1] / (2.0 * abs_z)

    return (face_index, u, v)

# Test
print(cube_map_lookup((1.0, 0.2, 0.3)))`,
    testCases: [
      {
        input: '(1.0, 0.2, 0.3)',
        expectedOutput: '(0, 0.35, 0.4)',
        isHidden: false,
        description: '+X dominant direction'
      },
      {
        input: '(0.0, 1.0, 0.0)',
        expectedOutput: '(2, 0.5, 0.5)',
        isHidden: false,
        description: 'Straight up (+Y)'
      },
      {
        input: '(0.2, -0.1, -1.0)',
        expectedOutput: '(5, 0.4, 0.45)',
        isHidden: true,
        description: '-Z dominant direction'
      }
    ],
    hints: [
      'Find the component with the largest absolute value to determine the face',
      'The major axis component determines which face, its sign determines positive or negative',
      'The other two components map to U and V on that face',
      'Divide by the major component to normalize, then scale and offset to [0,1]',
      'Each face has different orientation for its UV mapping'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Anisotropic Filtering Calculation',
    difficulty: 5,
    description: 'Calculate the anisotropic ratio and sampling direction for anisotropic texture filtering. This improves quality when textures are viewed at oblique angles.',
    starterCode: `import math

def calculate_anisotropic_params(du_dx, du_dy, dv_dx, dv_dy, texture_width, texture_height, max_aniso):
    """
    Calculate anisotropic filtering parameters.

    Args:
        du_dx, du_dy, dv_dx, dv_dy: float, UV derivatives
        texture_width, texture_height: int, texture dimensions
        max_aniso: int, maximum anisotropy samples (e.g., 16)

    Returns:
        tuple (num_samples, step_u, step_v, mip_level) where:
            num_samples: int, number of samples to take
            step_u, step_v: float, step in UV per sample
            mip_level: float, mipmap level to use

    Notes:
        - Calculate lengths of derivative vectors in texture space
        - Anisotropy ratio = max_length / min_length
        - Sample along major axis direction
    """
    # Your code here
    pass

# Test
print(calculate_anisotropic_params(0.02, 0.001, 0.0, 0.0, 256, 256, 16))`,
    solution: `import math

def calculate_anisotropic_params(du_dx, du_dy, dv_dx, dv_dy, texture_width, texture_height, max_aniso):
    """
    Calculate anisotropic filtering parameters.

    Args:
        du_dx, du_dy, dv_dx, dv_dy: float, UV derivatives
        texture_width, texture_height: int, texture dimensions
        max_aniso: int, maximum anisotropy samples (e.g., 16)

    Returns:
        tuple (num_samples, step_u, step_v, mip_level) where:
            num_samples: int, number of samples to take
            step_u, step_v: float, step in UV per sample
            mip_level: float, mipmap level to use

    Notes:
        - Calculate lengths of derivative vectors in texture space
        - Anisotropy ratio = max_length / min_length
        - Sample along major axis direction
    """
    # Scale derivatives by texture dimensions
    dudx = du_dx * texture_width
    dudy = du_dy * texture_width
    dvdx = dv_dx * texture_height
    dvdy = dv_dy * texture_height

    # Calculate squared lengths of derivative vectors
    len_x_sq = dudx * dudx + dvdx * dvdx
    len_y_sq = dudy * dudy + dvdy * dvdy

    # Get actual lengths
    len_x = math.sqrt(len_x_sq)
    len_y = math.sqrt(len_y_sq)

    # Determine major and minor axes
    major_length = max(len_x, len_y)
    minor_length = min(len_x, len_y)

    # Avoid division by zero
    if minor_length < 0.0001:
        minor_length = 0.0001

    # Calculate anisotropy ratio
    aniso_ratio = major_length / minor_length

    # Clamp to max anisotropy
    num_samples = min(int(aniso_ratio + 0.5), max_aniso)
    num_samples = max(1, num_samples)

    # Mipmap level based on minor axis
    mip_level = max(0.0, math.log2(minor_length)) if minor_length > 0 else 0.0

    # Determine step direction (along major axis)
    if len_x > len_y:
        # Step along x derivative direction
        step_u = du_dx / num_samples
        step_v = dv_dx / num_samples
    else:
        # Step along y derivative direction
        step_u = du_dy / num_samples
        step_v = dv_dy / num_samples

    return (num_samples, step_u, step_v, mip_level)

# Test
print(calculate_anisotropic_params(0.02, 0.001, 0.0, 0.0, 256, 256, 16))`,
    testCases: [
      {
        input: '0.02, 0.001, 0.0, 0.0, 256, 256, 16',
        expectedOutput: '(5, 0.004, 0.0, 0.0)',
        isHidden: false,
        description: 'Horizontal anisotropy'
      },
      {
        input: '0.001, 0.001, 0.001, 0.02, 256, 256, 8',
        expectedOutput: '(5, 0.0, 0.004, 0.0)',
        isHidden: false,
        description: 'Vertical anisotropy with max 8x'
      },
      {
        input: '0.005, 0.005, 0.005, 0.005, 512, 512, 16',
        expectedOutput: '(1, 0.005, 0.005, 2.678071905112638)',
        isHidden: true,
        description: 'Isotropic case (no anisotropy)'
      }
    ],
    hints: [
      'Scale UV derivatives by texture dimensions to get texel space',
      'Calculate the lengths of both derivative vectors',
      'The ratio of major to minor axis gives anisotropy level',
      'Clamp number of samples to max_aniso',
      'Use the minor axis length to determine mipmap level',
      'Step direction is along the major axis, divided by number of samples',
      'Anisotropic filtering takes multiple samples along the elongated axis'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t6-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Complete Normal Mapped Lighting',
    difficulty: 5,
    description: 'Implement complete Phong lighting with normal mapping. Sample normal map, transform to world space, and calculate lighting with diffuse and specular components.',
    starterCode: `import math

def dot_product(a, b):
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]

def normalize(v):
    mag = math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    if mag < 0.0001: return (0.0, 0.0, 1.0)
    return (v[0]/mag, v[1]/mag, v[2]/mag)

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    return (2*n_dot_l*normal[0]-light_dir[0],
            2*n_dot_l*normal[1]-light_dir[1],
            2*n_dot_l*normal[2]-light_dir[2])

def normal_mapped_lighting(base_color, specular_color, normal_map, u, v,
                           tangent, bitangent, normal, light_dir, view_dir,
                           light_intensity, shininess):
    """
    Calculate Phong lighting with normal mapping.

    Args:
        base_color: tuple (r, g, b), material color
        specular_color: tuple (r, g, b), specular color
        normal_map: 2D list of (r, g, b) tuples (normal map texture)
        u, v: float (0-1), UV coordinates
        tangent, bitangent, normal: tuple (x, y, z), TBN basis vectors (normalized)
        light_dir, view_dir: tuple (x, y, z), normalized directions in world space
        light_intensity: float, light brightness
        shininess: float, specular exponent

    Returns:
        tuple (r, g, b) final lit color
    """
    # Your code here
    pass

# Test
normal_map = [[(0.5, 0.5, 1.0), (0.6, 0.5, 0.9)], [(0.5, 0.5, 1.0), (0.5, 0.5, 1.0)]]
print(normal_mapped_lighting(
    (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), normal_map, 0.25, 0.25,
    (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0),
    (0.0, 0.0, 1.0), (0.0, 0.0, 1.0), 1.0, 32.0
))`,
    solution: `import math

def dot_product(a, b):
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]

def normalize(v):
    mag = math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    if mag < 0.0001: return (0.0, 0.0, 1.0)
    return (v[0]/mag, v[1]/mag, v[2]/mag)

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    return (2*n_dot_l*normal[0]-light_dir[0],
            2*n_dot_l*normal[1]-light_dir[1],
            2*n_dot_l*normal[2]-light_dir[2])

def normal_mapped_lighting(base_color, specular_color, normal_map, u, v,
                           tangent, bitangent, normal, light_dir, view_dir,
                           light_intensity, shininess):
    """
    Calculate Phong lighting with normal mapping.

    Args:
        base_color: tuple (r, g, b), material color
        specular_color: tuple (r, g, b), specular color
        normal_map: 2D list of (r, g, b) tuples (normal map texture)
        u, v: float (0-1), UV coordinates
        tangent, bitangent, normal: tuple (x, y, z), TBN basis vectors (normalized)
        light_dir, view_dir: tuple (x, y, z), normalized directions in world space
        light_intensity: float, light brightness
        shininess: float, specular exponent

    Returns:
        tuple (r, g, b) final lit color
    """
    # Sample normal map
    height = len(normal_map)
    width = len(normal_map[0])
    x = max(0, min(width-1, int(u * (width-1))))
    y = max(0, min(height-1, int(v * (height-1))))
    color = normal_map[y][x]

    # Convert to tangent space normal
    tn_x = color[0] * 2.0 - 1.0
    tn_y = color[1] * 2.0 - 1.0
    tn_z = color[2] * 2.0 - 1.0
    tangent_normal = normalize((tn_x, tn_y, tn_z))

    # Transform to world space using TBN
    world_normal_x = tangent_normal[0]*tangent[0] + tangent_normal[1]*bitangent[0] + tangent_normal[2]*normal[0]
    world_normal_y = tangent_normal[0]*tangent[1] + tangent_normal[1]*bitangent[1] + tangent_normal[2]*normal[1]
    world_normal_z = tangent_normal[0]*tangent[2] + tangent_normal[1]*bitangent[2] + tangent_normal[2]*normal[2]
    world_normal = normalize((world_normal_x, world_normal_y, world_normal_z))

    # Calculate diffuse
    n_dot_l = max(0.0, dot_product(world_normal, light_dir))
    diffuse_r = light_intensity * base_color[0] * n_dot_l
    diffuse_g = light_intensity * base_color[1] * n_dot_l
    diffuse_b = light_intensity * base_color[2] * n_dot_l

    # Calculate specular
    reflection = reflect_vector(light_dir, world_normal)
    r_dot_v = max(0.0, dot_product(reflection, view_dir))
    spec_factor = r_dot_v ** shininess
    specular_r = light_intensity * specular_color[0] * spec_factor
    specular_g = light_intensity * specular_color[1] * spec_factor
    specular_b = light_intensity * specular_color[2] * spec_factor

    # Combine
    final_r = diffuse_r + specular_r
    final_g = diffuse_g + specular_g
    final_b = diffuse_b + specular_b

    return (final_r, final_g, final_b)

# Test
normal_map = [[(0.5, 0.5, 1.0), (0.6, 0.5, 0.9)], [(0.5, 0.5, 1.0), (0.5, 0.5, 1.0)]]
print(normal_mapped_lighting(
    (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), normal_map, 0.25, 0.25,
    (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0),
    (0.0, 0.0, 1.0), (0.0, 0.0, 1.0), 1.0, 32.0
))`,
    testCases: [
      {
        input: "[[(0.5, 0.5, 1.0), (0.6, 0.5, 0.9)], [(0.5, 0.5, 1.0), (0.5, 0.5, 1.0)]], (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), 0.25, 0.25, (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0), (0.0, 0.0, 1.0), (0.0, 0.0, 1.0), 1.0, 32.0",
        expectedOutput: '(2.0, 1.5, 1.3)',
        isHidden: false,
        description: 'Flat normal map (no perturbation), perfect alignment'
      },
      {
        input: "[[(1.0, 0.5, 0.5), (0.5, 0.5, 1.0)], [(0.5, 0.5, 1.0), (0.5, 0.5, 1.0)]], (0.8, 0.8, 0.8), (1.0, 1.0, 1.0), 0.25, 0.25, (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0), (0.0, 0.0, 1.0), (0.0, 0.0, 1.0), 1.0, 16.0",
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'Perturbed normal pointing in +X'
      },
      {
        input: "[[(0.5, 0.5, 1.0)]], (1.0, 0.0, 0.0), (1.0, 1.0, 1.0), 0.5, 0.5, (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0), (0.7071, 0.0, 0.7071), (0.0, 0.0, 1.0), 0.8, 64.0",
        expectedOutput: '(0.5656854249492381, 0.0, 0.0)',
        isHidden: true,
        description: 'Angled light with red material'
      }
    ],
    hints: [
      'Sample the normal map texture at UV coordinates',
      'Convert RGB [0,1] to normal components [-1,1]',
      'Transform the tangent space normal to world space using TBN matrix',
      'Calculate diffuse lighting: intensity * color * max(0, N·L)',
      'Calculate specular: intensity * spec_color * max(0, R·V)^shininess',
      'Combine diffuse and specular for final color',
      'The normal map provides per-pixel normal variations for detailed lighting'
    ],
    language: 'python'
  }
];
