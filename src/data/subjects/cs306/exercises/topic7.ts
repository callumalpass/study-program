import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs306-t7-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Generate Camera Ray',
    difficulty: 1,
    description: 'Generate a camera ray for a given pixel coordinate. The ray originates from the camera position and passes through the pixel on the image plane.',
    starterCode: `def generate_camera_ray(pixel_x, pixel_y, image_width, image_height, camera_pos, fov):
    """
    Generate a ray from camera through a pixel.

    Args:
        pixel_x, pixel_y: int, pixel coordinates
        image_width, image_height: int, image dimensions
        camera_pos: tuple (x, y, z), camera position
        fov: float, field of view in degrees

    Returns:
        tuple (origin, direction) where:
            origin: tuple (x, y, z)
            direction: tuple (x, y, z) normalized

    Notes:
        - Assume camera looks down -Z axis
        - Image plane is at Z = -1
    """
    # Your code here
    pass

# Test
print(generate_camera_ray(400, 300, 800, 600, (0.0, 0.0, 0.0), 90.0))`,
    solution: `def generate_camera_ray(pixel_x, pixel_y, image_width, image_height, camera_pos, fov):
    """
    Generate a ray from camera through a pixel.

    Args:
        pixel_x, pixel_y: int, pixel coordinates
        image_width, image_height: int, image dimensions
        camera_pos: tuple (x, y, z), camera position
        fov: float, field of view in degrees

    Returns:
        tuple (origin, direction) where:
            origin: tuple (x, y, z)
            direction: tuple (x, y, z) normalized

    Notes:
        - Assume camera looks down -Z axis
        - Image plane is at Z = -1
    """
    import math

    # Convert to normalized device coordinates [-1, 1]
    ndc_x = (2.0 * pixel_x / image_width) - 1.0
    ndc_y = 1.0 - (2.0 * pixel_y / image_height)

    # Apply aspect ratio
    aspect_ratio = image_width / image_height

    # Calculate viewport dimensions based on FOV
    fov_rad = math.radians(fov)
    scale = math.tan(fov_rad / 2.0)

    # Calculate ray direction in camera space
    ray_x = ndc_x * aspect_ratio * scale
    ray_y = ndc_y * scale
    ray_z = -1.0

    # Normalize direction
    magnitude = math.sqrt(ray_x**2 + ray_y**2 + ray_z**2)
    direction = (ray_x / magnitude, ray_y / magnitude, ray_z / magnitude)

    # Ray origin is camera position
    origin = camera_pos

    return (origin, direction)

# Test
print(generate_camera_ray(400, 300, 800, 600, (0.0, 0.0, 0.0), 90.0))`,
    testCases: [
      {
        input: '400, 300, 800, 600, (0.0, 0.0, 0.0), 90.0',
        expectedOutput: '((0.0, 0.0, 0.0), (0.0, 0.0, -1.0))',
        isHidden: false,
        description: 'Center pixel ray (straight ahead)'
      },
      {
        input: '0, 0, 800, 600, (0.0, 0.0, 0.0), 90.0',
        expectedOutput: '((0.0, 0.0, 0.0), (-0.7682212795973759, 0.5761659596980319, -0.28808297984901594))',
        isHidden: false,
        description: 'Top-left corner pixel'
      },
      {
        input: '800, 600, 800, 600, (1.0, 2.0, 3.0), 60.0',
        expectedOutput: '((1.0, 2.0, 3.0), (0.6546536707079772, -0.5773502691896257, -0.4909524754503578))',
        isHidden: true,
        description: 'Bottom-right with offset camera position'
      }
    ],
    hints: [
      'Convert pixel coordinates to normalized device coordinates (NDC) in range [-1, 1]',
      'Apply aspect ratio to X coordinate',
      'Use FOV to calculate the scale (tan(fov/2))',
      'Ray direction in camera space: (ndc_x * aspect * scale, ndc_y * scale, -1)',
      'Normalize the direction vector',
      'Ray origin is the camera position'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Ray-Sphere Intersection',
    difficulty: 2,
    description: 'Calculate the intersection point(s) between a ray and a sphere. Return the nearest intersection distance, or None if no intersection.',
    starterCode: `import math

def ray_sphere_intersection(ray_origin, ray_dir, sphere_center, sphere_radius):
    """
    Calculate ray-sphere intersection.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        sphere_center: tuple (x, y, z)
        sphere_radius: float

    Returns:
        float or None, distance to nearest intersection (None if no hit)

    Notes:
        Solve: ||origin + t*direction - center||² = radius²
        This gives a quadratic equation in t
    """
    # Your code here
    pass

# Test
print(ray_sphere_intersection((0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0))`,
    solution: `import math

def ray_sphere_intersection(ray_origin, ray_dir, sphere_center, sphere_radius):
    """
    Calculate ray-sphere intersection.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        sphere_center: tuple (x, y, z)
        sphere_radius: float

    Returns:
        float or None, distance to nearest intersection (None if no hit)

    Notes:
        Solve: ||origin + t*direction - center||² = radius²
        This gives a quadratic equation in t
    """
    # Vector from sphere center to ray origin
    oc_x = ray_origin[0] - sphere_center[0]
    oc_y = ray_origin[1] - sphere_center[1]
    oc_z = ray_origin[2] - sphere_center[2]

    # Quadratic coefficients: at² + bt + c = 0
    # a = direction · direction (which is 1 for normalized direction)
    a = ray_dir[0]**2 + ray_dir[1]**2 + ray_dir[2]**2

    # b = 2 * (direction · oc)
    b = 2.0 * (ray_dir[0]*oc_x + ray_dir[1]*oc_y + ray_dir[2]*oc_z)

    # c = oc · oc - radius²
    c = oc_x**2 + oc_y**2 + oc_z**2 - sphere_radius**2

    # Calculate discriminant
    discriminant = b*b - 4*a*c

    # No intersection if discriminant is negative
    if discriminant < 0:
        return None

    # Calculate both solutions
    sqrt_discriminant = math.sqrt(discriminant)
    t1 = (-b - sqrt_discriminant) / (2*a)
    t2 = (-b + sqrt_discriminant) / (2*a)

    # Return nearest positive intersection
    if t1 > 0.0001:  # Small epsilon to avoid self-intersection
        return t1
    elif t2 > 0.0001:
        return t2
    else:
        return None

# Test
print(ray_sphere_intersection((0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0',
        expectedOutput: '4.0',
        isHidden: false,
        description: 'Ray hits sphere straight on'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (5.0, 0.0, -5.0), 1.0',
        expectedOutput: 'None',
        isHidden: false,
        description: 'Ray misses sphere'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.7071, 0.0, -0.7071), (2.0, 0.0, -2.0), 1.0',
        expectedOutput: '1.8284271247461903',
        isHidden: true,
        description: 'Diagonal ray hits sphere'
      }
    ],
    hints: [
      'Use the quadratic formula to solve for intersection parameter t',
      'Calculate oc = ray_origin - sphere_center',
      'Coefficients: a = dir·dir, b = 2(dir·oc), c = oc·oc - r²',
      'Check discriminant: if negative, no intersection',
      'Return the smaller positive t value (nearest intersection)',
      'Use a small epsilon to avoid self-intersection artifacts'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Calculate Sphere Normal',
    difficulty: 1,
    description: 'Calculate the surface normal at a point on a sphere. The normal at any point on a sphere points radially outward from the center.',
    starterCode: `import math

def sphere_normal(point, sphere_center):
    """
    Calculate surface normal at a point on a sphere.

    Args:
        point: tuple (x, y, z), point on sphere surface
        sphere_center: tuple (x, y, z), sphere center

    Returns:
        tuple (x, y, z), normalized surface normal
    """
    # Your code here
    pass

# Test
print(sphere_normal((3.0, 0.0, 0.0), (0.0, 0.0, 0.0)))`,
    solution: `import math

def sphere_normal(point, sphere_center):
    """
    Calculate surface normal at a point on a sphere.

    Args:
        point: tuple (x, y, z), point on sphere surface
        sphere_center: tuple (x, y, z), sphere center

    Returns:
        tuple (x, y, z), normalized surface normal
    """
    # Vector from center to point
    nx = point[0] - sphere_center[0]
    ny = point[1] - sphere_center[1]
    nz = point[2] - sphere_center[2]

    # Normalize
    magnitude = math.sqrt(nx*nx + ny*ny + nz*nz)

    if magnitude < 0.0001:
        return (0.0, 1.0, 0.0)  # Arbitrary default

    return (nx / magnitude, ny / magnitude, nz / magnitude)

# Test
print(sphere_normal((3.0, 0.0, 0.0), (0.0, 0.0, 0.0)))`,
    testCases: [
      {
        input: '(3.0, 0.0, 0.0), (0.0, 0.0, 0.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Point on +X axis'
      },
      {
        input: '(0.0, -2.0, 0.0), (0.0, 0.0, 0.0)',
        expectedOutput: '(0.0, -1.0, 0.0)',
        isHidden: false,
        description: 'Point on -Y axis'
      },
      {
        input: '(1.0, 1.0, 1.0), (0.0, 0.0, 0.0)',
        expectedOutput: '(0.5773502691896258, 0.5773502691896258, 0.5773502691896258)',
        isHidden: true,
        description: 'Point on diagonal'
      }
    ],
    hints: [
      'The normal is simply the vector from sphere center to the point',
      'Subtract sphere center from the point to get the direction',
      'Normalize the resulting vector',
      'Sphere normals always point radially outward from the center'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Ray-Plane Intersection',
    difficulty: 2,
    description: 'Calculate the intersection between a ray and an infinite plane. A plane is defined by a point and a normal vector.',
    starterCode: `def ray_plane_intersection(ray_origin, ray_dir, plane_point, plane_normal):
    """
    Calculate ray-plane intersection.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        plane_point: tuple (x, y, z), a point on the plane
        plane_normal: tuple (x, y, z), normalized plane normal

    Returns:
        float or None, distance to intersection (None if parallel/behind)

    Notes:
        Plane equation: (P - plane_point) · plane_normal = 0
        Ray equation: P = origin + t * direction
        Solve for t
    """
    # Your code here
    pass

# Test
print(ray_plane_intersection((0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def ray_plane_intersection(ray_origin, ray_dir, plane_point, plane_normal):
    """
    Calculate ray-plane intersection.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        plane_point: tuple (x, y, z), a point on the plane
        plane_normal: tuple (x, y, z), normalized plane normal

    Returns:
        float or None, distance to intersection (None if parallel/behind)

    Notes:
        Plane equation: (P - plane_point) · plane_normal = 0
        Ray equation: P = origin + t * direction
        Solve for t
    """
    # Calculate denominator: direction · normal
    denom = (ray_dir[0] * plane_normal[0] +
             ray_dir[1] * plane_normal[1] +
             ray_dir[2] * plane_normal[2])

    # If denominator is near zero, ray is parallel to plane
    if abs(denom) < 0.0001:
        return None

    # Calculate vector from ray origin to plane point
    px = plane_point[0] - ray_origin[0]
    py = plane_point[1] - ray_origin[1]
    pz = plane_point[2] - ray_origin[2]

    # Calculate numerator: (plane_point - origin) · normal
    numer = px * plane_normal[0] + py * plane_normal[1] + pz * plane_normal[2]

    # Calculate t
    t = numer / denom

    # Only return positive t (intersection in front of ray)
    if t > 0.0001:
        return t
    else:
        return None

# Test
print(ray_plane_intersection((0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '5.0',
        isHidden: false,
        description: 'Ray pointing down at horizontal plane'
      },
      {
        input: '(0.0, 5.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: 'None',
        isHidden: false,
        description: 'Ray pointing away from plane'
      },
      {
        input: '(0.0, 0.0, 5.0), (0.0, 0.0, -1.0), (0.0, 0.0, 0.0), (0.0, 0.0, 1.0)',
        expectedOutput: '5.0',
        isHidden: true,
        description: 'Ray along Z axis'
      }
    ],
    hints: [
      'Calculate the dot product of ray direction and plane normal',
      'If this is near zero, the ray is parallel to the plane',
      'Use the formula: t = ((plane_point - ray_origin) · plane_normal) / (ray_dir · plane_normal)',
      'Only return t if it\'s positive (intersection ahead of ray origin)',
      'Use a small epsilon to avoid numerical issues'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Calculate Reflection Vector',
    difficulty: 2,
    description: 'Calculate the reflection of a ray direction given a surface normal. This is used for mirror reflections in ray tracing.',
    starterCode: `def reflect_ray(incident, normal):
    """
    Calculate reflection vector.

    Args:
        incident: tuple (x, y, z), normalized incident ray direction
        normal: tuple (x, y, z), normalized surface normal

    Returns:
        tuple (x, y, z), normalized reflection direction

    Notes:
        R = I - 2(N·I)N
        where I is incident direction, N is normal
    """
    # Your code here
    pass

# Test
print(reflect_ray((0.0, -1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def reflect_ray(incident, normal):
    """
    Calculate reflection vector.

    Args:
        incident: tuple (x, y, z), normalized incident ray direction
        normal: tuple (x, y, z), normalized surface normal

    Returns:
        tuple (x, y, z), normalized reflection direction

    Notes:
        R = I - 2(N·I)N
        where I is incident direction, N is normal
    """
    # Calculate dot product N·I
    dot = normal[0] * incident[0] + normal[1] * incident[1] + normal[2] * incident[2]

    # Calculate reflection: R = I - 2(N·I)N
    rx = incident[0] - 2.0 * dot * normal[0]
    ry = incident[1] - 2.0 * dot * normal[1]
    rz = incident[2] - 2.0 * dot * normal[2]

    return (rx, ry, rz)

# Test
print(reflect_ray((0.0, -1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(0.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Ray bouncing straight up'
      },
      {
        input: '(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Ray parallel to surface'
      },
      {
        input: '(0.7071, -0.7071, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.7071, 0.7071, 0.0)',
        isHidden: true,
        description: '45 degree incident angle'
      }
    ],
    hints: [
      'Use the formula R = I - 2(N·I)N',
      'First calculate the dot product between normal and incident',
      'Then subtract 2 * (N·I) * N from the incident vector',
      'The result is already normalized if inputs are normalized'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Calculate Refraction Vector',
    difficulty: 3,
    description: 'Calculate the refraction vector using Snell\'s law. This is used for transparent materials like glass and water.',
    starterCode: `import math

def refract_ray(incident, normal, eta_ratio):
    """
    Calculate refraction vector using Snell's law.

    Args:
        incident: tuple (x, y, z), normalized incident direction
        normal: tuple (x, y, z), normalized surface normal
        eta_ratio: float, ratio of refractive indices (n1/n2)

    Returns:
        tuple (x, y, z) or None, refracted direction (None if total internal reflection)

    Notes:
        Snell's law: n1*sin(θ1) = n2*sin(θ2)
        eta_ratio = n1/n2
    """
    # Your code here
    pass

# Test
print(refract_ray((0.0, -1.0, 0.0), (0.0, 1.0, 0.0), 1.0/1.5))`,
    solution: `import math

def refract_ray(incident, normal, eta_ratio):
    """
    Calculate refraction vector using Snell's law.

    Args:
        incident: tuple (x, y, z), normalized incident direction
        normal: tuple (x, y, z), normalized surface normal
        eta_ratio: float, ratio of refractive indices (n1/n2)

    Returns:
        tuple (x, y, z) or None, refracted direction (None if total internal reflection)

    Notes:
        Snell's law: n1*sin(θ1) = n2*sin(θ2)
        eta_ratio = n1/n2
    """
    # Calculate cos(θ1) = -N·I
    cos_i = -(normal[0]*incident[0] + normal[1]*incident[1] + normal[2]*incident[2])

    # Calculate sin²(θ2) using Snell's law
    sin2_t = eta_ratio * eta_ratio * (1.0 - cos_i * cos_i)

    # Check for total internal reflection
    if sin2_t > 1.0:
        return None

    # Calculate cos(θ2)
    cos_t = math.sqrt(1.0 - sin2_t)

    # Calculate refracted direction
    # T = eta * I + (eta * cos_i - cos_t) * N
    factor = eta_ratio * cos_i - cos_t

    tx = eta_ratio * incident[0] + factor * normal[0]
    ty = eta_ratio * incident[1] + factor * normal[1]
    tz = eta_ratio * incident[2] + factor * normal[2]

    return (tx, ty, tz)

# Test
print(refract_ray((0.0, -1.0, 0.0), (0.0, 1.0, 0.0), 1.0/1.5))`,
    testCases: [
      {
        input: '(0.0, -1.0, 0.0), (0.0, 1.0, 0.0), 1.0/1.5',
        expectedOutput: '(0.0, -1.0, 0.0)',
        isHidden: false,
        description: 'Normal incidence (straight through)'
      },
      {
        input: '(0.7071, -0.7071, 0.0), (0.0, 1.0, 0.0), 1.0/1.5',
        expectedOutput: '(0.47140452079103173, -0.8819171036881969, 0.0)',
        isHidden: false,
        description: '45 degree incidence into glass'
      },
      {
        input: '(0.7071, -0.7071, 0.0), (0.0, 1.0, 0.0), 1.5',
        expectedOutput: 'None',
        isHidden: true,
        description: 'Total internal reflection'
      }
    ],
    hints: [
      'Calculate cos(θ1) = -N·I (negative because we want angle between vectors)',
      'Use Snell\'s law to find sin²(θ2) = (n1/n2)² * (1 - cos²(θ1))',
      'If sin²(θ2) > 1, total internal reflection occurs (return None)',
      'Calculate cos(θ2) = sqrt(1 - sin²(θ2))',
      'Refracted direction: T = η*I + (η*cos_i - cos_t)*N',
      'where η is the ratio of refractive indices'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Ray-Triangle Intersection',
    difficulty: 4,
    description: 'Implement the Möller-Trumbore algorithm for ray-triangle intersection. This is faster than calculating the plane intersection and checking if point is inside triangle.',
    starterCode: `def ray_triangle_intersection(ray_origin, ray_dir, v0, v1, v2):
    """
    Calculate ray-triangle intersection using Möller-Trumbore algorithm.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        v0, v1, v2: tuples (x, y, z), triangle vertices

    Returns:
        float or None, distance to intersection (None if no hit)

    Notes:
        Also computes barycentric coordinates u, v
        Point is inside triangle if u >= 0, v >= 0, u+v <= 1
    """
    # Your code here
    pass

# Test
print(ray_triangle_intersection(
    (0.0, 0.0, 5.0), (0.0, 0.0, -1.0),
    (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)
))`,
    solution: `def ray_triangle_intersection(ray_origin, ray_dir, v0, v1, v2):
    """
    Calculate ray-triangle intersection using Möller-Trumbore algorithm.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        v0, v1, v2: tuples (x, y, z), triangle vertices

    Returns:
        float or None, distance to intersection (None if no hit)

    Notes:
        Also computes barycentric coordinates u, v
        Point is inside triangle if u >= 0, v >= 0, u+v <= 1
    """
    EPSILON = 0.0000001

    # Calculate edge vectors
    edge1_x = v1[0] - v0[0]
    edge1_y = v1[1] - v0[1]
    edge1_z = v1[2] - v0[2]

    edge2_x = v2[0] - v0[0]
    edge2_y = v2[1] - v0[1]
    edge2_z = v2[2] - v0[2]

    # Calculate h = ray_dir × edge2
    h_x = ray_dir[1] * edge2_z - ray_dir[2] * edge2_y
    h_y = ray_dir[2] * edge2_x - ray_dir[0] * edge2_z
    h_z = ray_dir[0] * edge2_y - ray_dir[1] * edge2_x

    # Calculate a = edge1 · h
    a = edge1_x * h_x + edge1_y * h_y + edge1_z * h_z

    # Ray is parallel to triangle if a is close to 0
    if abs(a) < EPSILON:
        return None

    f = 1.0 / a

    # Calculate s = ray_origin - v0
    s_x = ray_origin[0] - v0[0]
    s_y = ray_origin[1] - v0[1]
    s_z = ray_origin[2] - v0[2]

    # Calculate u = f * (s · h)
    u = f * (s_x * h_x + s_y * h_y + s_z * h_z)

    # Check if intersection is outside triangle
    if u < 0.0 or u > 1.0:
        return None

    # Calculate q = s × edge1
    q_x = s_y * edge1_z - s_z * edge1_y
    q_y = s_z * edge1_x - s_x * edge1_z
    q_z = s_x * edge1_y - s_y * edge1_x

    # Calculate v = f * (ray_dir · q)
    v = f * (ray_dir[0] * q_x + ray_dir[1] * q_y + ray_dir[2] * q_z)

    # Check if intersection is outside triangle
    if v < 0.0 or u + v > 1.0:
        return None

    # Calculate t = f * (edge2 · q)
    t = f * (edge2_x * q_x + edge2_y * q_y + edge2_z * q_z)

    # Check if intersection is in front of ray
    if t > EPSILON:
        return t
    else:
        return None

# Test
print(ray_triangle_intersection(
    (0.0, 0.0, 5.0), (0.0, 0.0, -1.0),
    (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)
))`,
    testCases: [
      {
        input: '(0.0, 0.0, 5.0), (0.0, 0.0, -1.0), (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '5.0',
        isHidden: false,
        description: 'Ray hits center of triangle'
      },
      {
        input: '(0.0, 0.0, 5.0), (0.0, 0.0, -1.0), (2.0, 2.0, 0.0), (3.0, 2.0, 0.0), (2.5, 3.0, 0.0)',
        expectedOutput: 'None',
        isHidden: false,
        description: 'Ray misses triangle'
      },
      {
        input: '(0.5, -0.5, 5.0), (0.0, 0.0, -1.0), (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '5.0',
        isHidden: true,
        description: 'Ray hits triangle off-center'
      }
    ],
    hints: [
      'Calculate edge vectors: edge1 = v1 - v0, edge2 = v2 - v0',
      'Compute h = ray_dir × edge2',
      'Calculate a = edge1 · h (determinant)',
      'If a is near zero, ray is parallel to triangle',
      'Compute barycentric coordinate u using s = origin - v0',
      'Check u bounds: must be in [0, 1]',
      'Compute barycentric coordinate v using cross product',
      'Check v bounds and u+v <= 1 for point to be inside triangle',
      'Finally calculate t for the intersection distance'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Simple Ray Tracer with Sphere',
    difficulty: 3,
    description: 'Implement a simple ray tracer that renders a single sphere with diffuse shading. For each pixel, cast a ray and check for sphere intersection.',
    starterCode: `import math

def simple_ray_trace_sphere(width, height, sphere_center, sphere_radius,
                            light_dir, sphere_color):
    """
    Render a sphere using ray tracing with diffuse shading.

    Args:
        width, height: int, image dimensions
        sphere_center: tuple (x, y, z)
        sphere_radius: float
        light_dir: tuple (x, y, z), normalized light direction
        sphere_color: tuple (r, g, b)

    Returns:
        2D list of (r, g, b) tuples representing the image

    Notes:
        - Camera at origin looking down -Z
        - FOV = 60 degrees
        - Background color is black (0, 0, 0)
    """
    # Your code here
    pass

# Test (small image)
result = simple_ray_trace_sphere(4, 4, (0.0, 0.0, -5.0), 1.0,
                                  (0.0, 0.0, 1.0), (1.0, 0.5, 0.3))
print(result[2][2])  # Center pixel`,
    solution: `import math

def simple_ray_trace_sphere(width, height, sphere_center, sphere_radius,
                            light_dir, sphere_color):
    """
    Render a sphere using ray tracing with diffuse shading.

    Args:
        width, height: int, image dimensions
        sphere_center: tuple (x, y, z)
        sphere_radius: float
        light_dir: tuple (x, y, z), normalized light direction
        sphere_color: tuple (r, g, b)

    Returns:
        2D list of (r, g, b) tuples representing the image

    Notes:
        - Camera at origin looking down -Z
        - FOV = 60 degrees
        - Background color is black (0, 0, 0)
    """
    image = []
    fov = 60.0
    camera_pos = (0.0, 0.0, 0.0)

    for y in range(height):
        row = []
        for x in range(width):
            # Generate ray
            ndc_x = (2.0 * x / width) - 1.0
            ndc_y = 1.0 - (2.0 * y / height)
            aspect = width / height
            scale = math.tan(math.radians(fov / 2.0))

            ray_x = ndc_x * aspect * scale
            ray_y = ndc_y * scale
            ray_z = -1.0

            magnitude = math.sqrt(ray_x**2 + ray_y**2 + ray_z**2)
            ray_dir = (ray_x/magnitude, ray_y/magnitude, ray_z/magnitude)

            # Ray-sphere intersection
            oc_x = camera_pos[0] - sphere_center[0]
            oc_y = camera_pos[1] - sphere_center[1]
            oc_z = camera_pos[2] - sphere_center[2]

            a = 1.0  # ray_dir is normalized
            b = 2.0 * (ray_dir[0]*oc_x + ray_dir[1]*oc_y + ray_dir[2]*oc_z)
            c = oc_x**2 + oc_y**2 + oc_z**2 - sphere_radius**2

            discriminant = b*b - 4*a*c

            if discriminant < 0:
                # No hit - black background
                row.append((0.0, 0.0, 0.0))
            else:
                # Hit - calculate shading
                t = (-b - math.sqrt(discriminant)) / (2*a)

                # Hit point
                hit_x = camera_pos[0] + t * ray_dir[0]
                hit_y = camera_pos[1] + t * ray_dir[1]
                hit_z = camera_pos[2] + t * ray_dir[2]

                # Normal at hit point
                normal_x = hit_x - sphere_center[0]
                normal_y = hit_y - sphere_center[1]
                normal_z = hit_z - sphere_center[2]
                normal_mag = math.sqrt(normal_x**2 + normal_y**2 + normal_z**2)
                normal = (normal_x/normal_mag, normal_y/normal_mag, normal_z/normal_mag)

                # Diffuse shading
                n_dot_l = max(0.0, normal[0]*light_dir[0] + normal[1]*light_dir[1] + normal[2]*light_dir[2])

                color = (sphere_color[0] * n_dot_l,
                        sphere_color[1] * n_dot_l,
                        sphere_color[2] * n_dot_l)
                row.append(color)

        image.append(row)

    return image

# Test (small image)
result = simple_ray_trace_sphere(4, 4, (0.0, 0.0, -5.0), 1.0,
                                  (0.0, 0.0, 1.0), (1.0, 0.5, 0.3))
print(result[2][2])  # Center pixel`,
    testCases: [
      {
        input: '4, 4, (0.0, 0.0, -5.0), 1.0, (0.0, 0.0, 1.0), (1.0, 0.5, 0.3)',
        expectedOutput: '(1.0, 0.5, 0.3)',
        isHidden: false,
        description: 'Center pixel hits sphere directly'
      },
      {
        input: '2, 2, (0.0, 0.0, -5.0), 1.0, (0.0, 0.0, 1.0), (0.8, 0.8, 0.8)',
        expectedOutput: '(0.8, 0.8, 0.8)',
        isHidden: false,
        description: 'Small gray sphere'
      },
      {
        input: '3, 3, (0.0, 0.0, -3.0), 0.5, (0.7071, 0.0, 0.7071), (1.0, 0.0, 0.0)',
        expectedOutput: '(0.7071067811865476, 0.0, 0.0)',
        isHidden: true,
        description: 'Red sphere with angled light'
      }
    ],
    hints: [
      'For each pixel, generate a camera ray',
      'Test ray-sphere intersection using the quadratic formula',
      'If hit, calculate the intersection point',
      'Calculate the surface normal at the hit point',
      'Apply diffuse shading: color * max(0, N·L)',
      'If no hit, use background color (black)',
      'Camera is at origin looking down -Z axis'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Ray Tracing with Shadows',
    difficulty: 4,
    description: 'Extend ray tracing to include shadow rays. Cast a ray from hit point to light source to check if point is in shadow.',
    starterCode: `import math

def trace_with_shadows(ray_origin, ray_dir, sphere_center, sphere_radius,
                       light_pos, sphere_color, ambient):
    """
    Trace a ray and calculate color with shadows.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        sphere_center: tuple (x, y, z)
        sphere_radius: float
        light_pos: tuple (x, y, z), point light position
        sphere_color: tuple (r, g, b)
        ambient: float, ambient light intensity (0-1)

    Returns:
        tuple (r, g, b) or None if no hit

    Notes:
        - Check if hit point can see the light (shadow ray)
        - If in shadow, only ambient lighting
        - If lit, ambient + diffuse
    """
    # Your code here
    pass

# Test
print(trace_with_shadows((0.0, 0.0, 0.0), (0.0, 0.0, -1.0),
                         (0.0, 0.0, -5.0), 1.0, (2.0, 2.0, 0.0),
                         (1.0, 0.5, 0.3), 0.2))`,
    solution: `import math

def trace_with_shadows(ray_origin, ray_dir, sphere_center, sphere_radius,
                       light_pos, sphere_color, ambient):
    """
    Trace a ray and calculate color with shadows.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        sphere_center: tuple (x, y, z)
        sphere_radius: float
        light_pos: tuple (x, y, z), point light position
        sphere_color: tuple (r, g, b)
        ambient: float, ambient light intensity (0-1)

    Returns:
        tuple (r, g, b) or None if no hit

    Notes:
        - Check if hit point can see the light (shadow ray)
        - If in shadow, only ambient lighting
        - If lit, ambient + diffuse
    """
    # Ray-sphere intersection
    oc_x = ray_origin[0] - sphere_center[0]
    oc_y = ray_origin[1] - sphere_center[1]
    oc_z = ray_origin[2] - sphere_center[2]

    a = 1.0
    b = 2.0 * (ray_dir[0]*oc_x + ray_dir[1]*oc_y + ray_dir[2]*oc_z)
    c = oc_x**2 + oc_y**2 + oc_z**2 - sphere_radius**2

    discriminant = b*b - 4*a*c

    if discriminant < 0:
        return None  # No hit

    # Calculate hit point
    t = (-b - math.sqrt(discriminant)) / (2*a)
    hit_x = ray_origin[0] + t * ray_dir[0]
    hit_y = ray_origin[1] + t * ray_dir[1]
    hit_z = ray_origin[2] + t * ray_dir[2]

    # Calculate normal
    normal_x = hit_x - sphere_center[0]
    normal_y = hit_y - sphere_center[1]
    normal_z = hit_z - sphere_center[2]
    normal_mag = math.sqrt(normal_x**2 + normal_y**2 + normal_z**2)
    normal = (normal_x/normal_mag, normal_y/normal_mag, normal_z/normal_mag)

    # Calculate direction to light
    to_light_x = light_pos[0] - hit_x
    to_light_y = light_pos[1] - hit_y
    to_light_z = light_pos[2] - hit_z
    light_dist = math.sqrt(to_light_x**2 + to_light_y**2 + to_light_z**2)
    light_dir = (to_light_x/light_dist, to_light_y/light_dist, to_light_z/light_dist)

    # Shadow ray - offset slightly to avoid self-intersection
    shadow_origin = (hit_x + normal[0]*0.001,
                     hit_y + normal[1]*0.001,
                     hit_z + normal[2]*0.001)

    # Check shadow ray intersection
    oc_x = shadow_origin[0] - sphere_center[0]
    oc_y = shadow_origin[1] - sphere_center[1]
    oc_z = shadow_origin[2] - sphere_center[2]

    a = 1.0
    b = 2.0 * (light_dir[0]*oc_x + light_dir[1]*oc_y + light_dir[2]*oc_z)
    c = oc_x**2 + oc_y**2 + oc_z**2 - sphere_radius**2

    shadow_discriminant = b*b - 4*a*c

    # Check if shadow ray hits sphere before reaching light
    in_shadow = False
    if shadow_discriminant >= 0:
        shadow_t = (-b - math.sqrt(shadow_discriminant)) / (2*a)
        if shadow_t > 0.001 and shadow_t < light_dist:
            in_shadow = True

    # Calculate lighting
    if in_shadow:
        # Only ambient
        color = (sphere_color[0] * ambient,
                sphere_color[1] * ambient,
                sphere_color[2] * ambient)
    else:
        # Ambient + diffuse
        n_dot_l = max(0.0, normal[0]*light_dir[0] + normal[1]*light_dir[1] + normal[2]*light_dir[2])
        color = (sphere_color[0] * (ambient + n_dot_l),
                sphere_color[1] * (ambient + n_dot_l),
                sphere_color[2] * (ambient + n_dot_l))

    return color

# Test
print(trace_with_shadows((0.0, 0.0, 0.0), (0.0, 0.0, -1.0),
                         (0.0, 0.0, -5.0), 1.0, (2.0, 2.0, 0.0),
                         (1.0, 0.5, 0.3), 0.2))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0, (2.0, 2.0, 0.0), (1.0, 0.5, 0.3), 0.2',
        expectedOutput: '(0.6832050294337844, 0.3416025147168922, 0.20496150883013532)',
        isHidden: false,
        description: 'Lit sphere (not in shadow)'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -10.0), 2.0, (0.0, 0.0, -5.0), (1.0, 1.0, 1.0), 0.1',
        expectedOutput: '(0.1, 0.1, 0.1)',
        isHidden: false,
        description: 'Point in shadow (light blocked)'
      },
      {
        input: '(0.0, 2.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0), 1.0, (3.0, 3.0, 0.0), (0.8, 0.2, 0.2), 0.15',
        expectedOutput: '(0.6309039081630266, 0.15772597704075666, 0.15772597704075666)',
        isHidden: true,
        description: 'Downward ray with offset light'
      }
    ],
    hints: [
      'First, perform ray-sphere intersection to find hit point',
      'Calculate the surface normal at hit point',
      'Calculate direction from hit point to light source',
      'Cast a shadow ray from hit point (slightly offset) toward light',
      'Check if shadow ray intersects sphere before reaching light',
      'If in shadow, use only ambient lighting',
      'If not in shadow, use ambient + diffuse',
      'Offset the shadow ray origin slightly to avoid self-intersection'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Ray Tracing with Reflections',
    difficulty: 4,
    description: 'Implement recursive ray tracing with mirror reflections. When a ray hits a reflective surface, cast a reflection ray and blend the colors.',
    starterCode: `import math

def trace_reflection(ray_origin, ray_dir, sphere_center, sphere_radius,
                    light_dir, sphere_color, reflectivity, depth, max_depth):
    """
    Trace ray with reflections (recursive).

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        sphere_center: tuple (x, y, z)
        sphere_radius: float
        light_dir: tuple (x, y, z), normalized light direction
        sphere_color: tuple (r, g, b)
        reflectivity: float (0-1), how reflective the sphere is
        depth: int, current recursion depth
        max_depth: int, maximum recursion depth

    Returns:
        tuple (r, g, b), final color (black if no hit)

    Notes:
        - Base case: depth >= max_depth, return diffuse only
        - Recursive case: blend diffuse with reflected color
    """
    # Your code here
    pass

# Test
print(trace_reflection((0.0, 0.0, 0.0), (0.0, 0.0, -1.0),
                       (0.0, 0.0, -5.0), 1.0, (0.0, 1.0, 0.0),
                       (1.0, 0.5, 0.3), 0.5, 0, 2))`,
    solution: `import math

def trace_reflection(ray_origin, ray_dir, sphere_center, sphere_radius,
                    light_dir, sphere_color, reflectivity, depth, max_depth):
    """
    Trace ray with reflections (recursive).

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        sphere_center: tuple (x, y, z)
        sphere_radius: float
        light_dir: tuple (x, y, z), normalized light direction
        sphere_color: tuple (r, g, b)
        reflectivity: float (0-1), how reflective the sphere is
        depth: int, current recursion depth
        max_depth: int, maximum recursion depth

    Returns:
        tuple (r, g, b), final color (black if no hit)

    Notes:
        - Base case: depth >= max_depth, return diffuse only
        - Recursive case: blend diffuse with reflected color
    """
    # Ray-sphere intersection
    oc_x = ray_origin[0] - sphere_center[0]
    oc_y = ray_origin[1] - sphere_center[1]
    oc_z = ray_origin[2] - sphere_center[2]

    a = 1.0
    b = 2.0 * (ray_dir[0]*oc_x + ray_dir[1]*oc_y + ray_dir[2]*oc_z)
    c = oc_x**2 + oc_y**2 + oc_z**2 - sphere_radius**2

    discriminant = b*b - 4*a*c

    if discriminant < 0:
        return (0.0, 0.0, 0.0)  # No hit - black background

    # Calculate hit point
    t = (-b - math.sqrt(discriminant)) / (2*a)
    if t < 0.001:
        return (0.0, 0.0, 0.0)

    hit_x = ray_origin[0] + t * ray_dir[0]
    hit_y = ray_origin[1] + t * ray_dir[1]
    hit_z = ray_origin[2] + t * ray_dir[2]

    # Calculate normal
    normal_x = hit_x - sphere_center[0]
    normal_y = hit_y - sphere_center[1]
    normal_z = hit_z - sphere_center[2]
    normal_mag = math.sqrt(normal_x**2 + normal_y**2 + normal_z**2)
    normal = (normal_x/normal_mag, normal_y/normal_mag, normal_z/normal_mag)

    # Calculate diffuse shading
    n_dot_l = max(0.0, normal[0]*light_dir[0] + normal[1]*light_dir[1] + normal[2]*light_dir[2])
    diffuse = (sphere_color[0] * n_dot_l,
               sphere_color[1] * n_dot_l,
               sphere_color[2] * n_dot_l)

    # Base case: max depth reached
    if depth >= max_depth:
        return diffuse

    # Calculate reflection direction
    dot = normal[0]*ray_dir[0] + normal[1]*ray_dir[1] + normal[2]*ray_dir[2]
    reflect_dir = (ray_dir[0] - 2.0*dot*normal[0],
                   ray_dir[1] - 2.0*dot*normal[1],
                   ray_dir[2] - 2.0*dot*normal[2])

    # Offset reflection origin to avoid self-intersection
    reflect_origin = (hit_x + normal[0]*0.001,
                      hit_y + normal[1]*0.001,
                      hit_z + normal[2]*0.001)

    # Recursive ray trace
    reflected_color = trace_reflection(reflect_origin, reflect_dir,
                                       sphere_center, sphere_radius,
                                       light_dir, sphere_color,
                                       reflectivity, depth + 1, max_depth)

    # Blend diffuse and reflected color
    final_r = diffuse[0] * (1 - reflectivity) + reflected_color[0] * reflectivity
    final_g = diffuse[1] * (1 - reflectivity) + reflected_color[1] * reflectivity
    final_b = diffuse[2] * (1 - reflectivity) + reflected_color[2] * reflectivity

    return (final_r, final_g, final_b)

# Test
print(trace_reflection((0.0, 0.0, 0.0), (0.0, 0.0, -1.0),
                       (0.0, 0.0, -5.0), 1.0, (0.0, 1.0, 0.0),
                       (1.0, 0.5, 0.3), 0.5, 0, 2))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0, (0.0, 1.0, 0.0), (1.0, 0.5, 0.3), 0.5, 0, 2',
        expectedOutput: '(0.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Center hit with upward light (dark)'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0, (0.0, 0.0, 1.0), (1.0, 0.5, 0.3), 0.0, 0, 2',
        expectedOutput: '(1.0, 0.5, 0.3)',
        isHidden: false,
        description: 'No reflectivity (pure diffuse)'
      },
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (0.0, 0.0, -5.0), 1.0, (0.0, 0.0, 1.0), (0.8, 0.8, 0.8), 1.0, 0, 1',
        expectedOutput: '(0.0, 0.0, 0.0)',
        isHidden: true,
        description: 'Fully reflective (no diffuse contribution)'
      }
    ],
    hints: [
      'First perform ray-sphere intersection',
      'Calculate hit point and surface normal',
      'Calculate diffuse shading from direct lighting',
      'Check if max depth reached (base case)',
      'Calculate reflection direction using R = I - 2(N·I)N',
      'Recursively trace the reflected ray',
      'Blend diffuse and reflected color based on reflectivity',
      'Offset the reflection ray origin to avoid self-intersection',
      'Final color = diffuse*(1-r) + reflected*r, where r is reflectivity'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Axis-Aligned Bounding Box Intersection',
    difficulty: 3,
    description: 'Implement ray-AABB (Axis-Aligned Bounding Box) intersection test. This is used for acceleration structures in ray tracing.',
    starterCode: `def ray_aabb_intersection(ray_origin, ray_dir, box_min, box_max):
    """
    Test ray intersection with axis-aligned bounding box.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        box_min: tuple (x, y, z), minimum corner of box
        box_max: tuple (x, y, z), maximum corner of box

    Returns:
        tuple (t_near, t_far) or None if no intersection

    Notes:
        Use slab method: test intersection with each axis-aligned plane
    """
    # Your code here
    pass

# Test
print(ray_aabb_intersection((0.0, 0.0, 0.0), (0.0, 0.0, -1.0),
                            (-1.0, -1.0, -5.0), (1.0, 1.0, -3.0)))`,
    solution: `def ray_aabb_intersection(ray_origin, ray_dir, box_min, box_max):
    """
    Test ray intersection with axis-aligned bounding box.

    Args:
        ray_origin: tuple (x, y, z)
        ray_dir: tuple (x, y, z), normalized
        box_min: tuple (x, y, z), minimum corner of box
        box_max: tuple (x, y, z), maximum corner of box

    Returns:
        tuple (t_near, t_far) or None if no intersection

    Notes:
        Use slab method: test intersection with each axis-aligned plane
    """
    t_min = float('-inf')
    t_max = float('inf')

    # Test intersection with each slab (X, Y, Z)
    for i in range(3):
        if abs(ray_dir[i]) < 0.0001:
            # Ray is parallel to slab
            if ray_origin[i] < box_min[i] or ray_origin[i] > box_max[i]:
                return None  # Ray is outside slab, no intersection
        else:
            # Calculate intersection distances with slab planes
            t1 = (box_min[i] - ray_origin[i]) / ray_dir[i]
            t2 = (box_max[i] - ray_origin[i]) / ray_dir[i]

            # Ensure t1 <= t2
            if t1 > t2:
                t1, t2 = t2, t1

            # Update t_min and t_max
            t_min = max(t_min, t1)
            t_max = min(t_max, t2)

            # Check if slabs don't overlap
            if t_min > t_max:
                return None

    # Check if intersection is behind ray origin
    if t_max < 0:
        return None

    # Return intersection range
    if t_min < 0:
        t_min = 0  # Ray origin is inside box

    return (t_min, t_max)

# Test
print(ray_aabb_intersection((0.0, 0.0, 0.0), (0.0, 0.0, -1.0),
                            (-1.0, -1.0, -5.0), (1.0, 1.0, -3.0)))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (0.0, 0.0, -1.0), (-1.0, -1.0, -5.0), (1.0, 1.0, -3.0)',
        expectedOutput: '(3.0, 5.0)',
        isHidden: false,
        description: 'Ray hits box from front'
      },
      {
        input: '(0.0, 0.0, 0.0), (1.0, 0.0, 0.0), (-1.0, -1.0, -1.0), (1.0, 1.0, 1.0)',
        expectedOutput: '(0, 1.0)',
        isHidden: false,
        description: 'Ray starts inside box'
      },
      {
        input: '(5.0, 0.0, 0.0), (0.0, 1.0, 0.0), (-1.0, -1.0, -1.0), (1.0, 1.0, 1.0)',
        expectedOutput: 'None',
        isHidden: true,
        description: 'Ray misses box'
      }
    ],
    hints: [
      'Use the "slab method" - test each axis independently',
      'For each axis, calculate t values where ray intersects the two planes',
      'Keep track of the maximum of all entry points (t_min)',
      'Keep track of the minimum of all exit points (t_max)',
      'If t_min > t_max, the ray misses the box',
      'Handle the case where ray is parallel to an axis (division by zero)',
      'If ray origin is inside box, t_min should be 0'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Barycentric Coordinates',
    difficulty: 3,
    description: 'Calculate barycentric coordinates for a point on a triangle. These coordinates are used for interpolating vertex attributes.',
    starterCode: `def barycentric_coordinates(point, v0, v1, v2):
    """
    Calculate barycentric coordinates of a point on a triangle.

    Args:
        point: tuple (x, y, z), point on triangle
        v0, v1, v2: tuples (x, y, z), triangle vertices

    Returns:
        tuple (u, v, w) where u + v + w = 1

    Notes:
        u corresponds to v0, v corresponds to v1, w corresponds to v2
        Point = u*v0 + v*v1 + w*v2
    """
    # Your code here
    pass

# Test
print(barycentric_coordinates((0.0, 0.0, 0.0),
                              (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def barycentric_coordinates(point, v0, v1, v2):
    """
    Calculate barycentric coordinates of a point on a triangle.

    Args:
        point: tuple (x, y, z), point on triangle
        v0, v1, v2: tuples (x, y, z), triangle vertices

    Returns:
        tuple (u, v, w) where u + v + w = 1

    Notes:
        u corresponds to v0, v corresponds to v1, w corresponds to v2
        Point = u*v0 + v*v1 + w*v2
    """
    # Vectors from v0 to v1 and v2
    v0v1_x = v1[0] - v0[0]
    v0v1_y = v1[1] - v0[1]
    v0v1_z = v1[2] - v0[2]

    v0v2_x = v2[0] - v0[0]
    v0v2_y = v2[1] - v0[1]
    v0v2_z = v2[2] - v0[2]

    # Vector from v0 to point
    v0p_x = point[0] - v0[0]
    v0p_y = point[1] - v0[1]
    v0p_z = point[2] - v0[2]

    # Calculate dot products
    d00 = v0v1_x*v0v1_x + v0v1_y*v0v1_y + v0v1_z*v0v1_z
    d01 = v0v1_x*v0v2_x + v0v1_y*v0v2_y + v0v1_z*v0v2_z
    d11 = v0v2_x*v0v2_x + v0v2_y*v0v2_y + v0v2_z*v0v2_z
    d20 = v0p_x*v0v1_x + v0p_y*v0v1_y + v0p_z*v0v1_z
    d21 = v0p_x*v0v2_x + v0p_y*v0v2_y + v0p_z*v0v2_z

    # Calculate barycentric coordinates
    denom = d00 * d11 - d01 * d01

    if abs(denom) < 0.0001:
        # Degenerate triangle
        return (1.0, 0.0, 0.0)

    v = (d11 * d20 - d01 * d21) / denom
    w = (d00 * d21 - d01 * d20) / denom
    u = 1.0 - v - w

    return (u, v, w)

# Test
print(barycentric_coordinates((0.0, 0.0, 0.0),
                              (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.25, 0.25, 0.5)',
        isHidden: false,
        description: 'Point at center of triangle'
      },
      {
        input: '(-1.0, -1.0, 0.0), (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Point at vertex v0'
      },
      {
        input: '(0.0, -1.0, 0.0), (-1.0, -1.0, 0.0), (1.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.5, 0.5, 0.0)',
        isHidden: true,
        description: 'Point on edge between v0 and v1'
      }
    ],
    hints: [
      'Calculate vectors from v0 to v1, v2, and the point',
      'Use dot products to set up a linear system',
      'Solve for coordinates v and w using Cramer\'s rule',
      'Calculate u = 1 - v - w',
      'The barycentric coordinates represent weights for each vertex',
      'If point is at vertex i, coordinate i should be 1 and others 0'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Interpolate Triangle Attributes',
    difficulty: 3,
    description: 'Interpolate vertex attributes (like normals or UV coordinates) across a triangle using barycentric coordinates.',
    starterCode: `def interpolate_attribute(bary_coords, attr0, attr1, attr2):
    """
    Interpolate vertex attributes using barycentric coordinates.

    Args:
        bary_coords: tuple (u, v, w), barycentric coordinates
        attr0, attr1, attr2: attribute values at vertices (can be float or tuple)

    Returns:
        Interpolated attribute value (same type as input attributes)

    Notes:
        result = u*attr0 + v*attr1 + w*attr2
    """
    # Your code here
    pass

# Test with tuple attributes (RGB color)
print(interpolate_attribute((0.5, 0.25, 0.25),
                            (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)))`,
    solution: `def interpolate_attribute(bary_coords, attr0, attr1, attr2):
    """
    Interpolate vertex attributes using barycentric coordinates.

    Args:
        bary_coords: tuple (u, v, w), barycentric coordinates
        attr0, attr1, attr2: attribute values at vertices (can be float or tuple)

    Returns:
        Interpolated attribute value (same type as input attributes)

    Notes:
        result = u*attr0 + v*attr1 + w*attr2
    """
    u, v, w = bary_coords

    # Check if attributes are tuples (e.g., colors, normals)
    if isinstance(attr0, tuple):
        # Interpolate each component
        result = []
        for i in range(len(attr0)):
            interpolated = u * attr0[i] + v * attr1[i] + w * attr2[i]
            result.append(interpolated)
        return tuple(result)
    else:
        # Scalar attribute (e.g., depth)
        return u * attr0 + v * attr1 + w * attr2

# Test with tuple attributes (RGB color)
print(interpolate_attribute((0.5, 0.25, 0.25),
                            (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)))`,
    testCases: [
      {
        input: '(0.5, 0.25, 0.25), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)',
        expectedOutput: '(0.5, 0.25, 0.25)',
        isHidden: false,
        description: 'Interpolate RGB colors'
      },
      {
        input: '(1.0, 0.0, 0.0), 10.0, 20.0, 30.0',
        expectedOutput: '10.0',
        isHidden: false,
        description: 'Interpolate scalar at vertex'
      },
      {
        input: '(0.333, 0.333, 0.334), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)',
        expectedOutput: '(0.333, 0.333, 0.334)',
        isHidden: true,
        description: 'Interpolate at triangle center'
      }
    ],
    hints: [
      'Use the formula: result = u*attr0 + v*attr1 + w*attr2',
      'Check if attributes are tuples (multi-component like colors/normals)',
      'If tuple, interpolate each component separately',
      'If scalar (float), directly compute weighted sum',
      'Barycentric coordinates sum to 1, ensuring proper interpolation'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Fresnel Reflectance for Dielectrics',
    difficulty: 4,
    description: 'Calculate the Fresnel reflectance using Schlick\'s approximation. This determines how much light is reflected vs refracted at a surface.',
    starterCode: `import math

def fresnel_reflectance(cos_theta, eta_ratio):
    """
    Calculate Fresnel reflectance using Schlick's approximation.

    Args:
        cos_theta: float, cosine of incident angle
        eta_ratio: float, ratio of refractive indices (n1/n2)

    Returns:
        float, reflectance coefficient (0-1)

    Notes:
        R0 = ((n1-n2)/(n1+n2))²
        R(θ) = R0 + (1-R0)(1-cos(θ))^5
    """
    # Your code here
    pass

# Test
print(fresnel_reflectance(1.0, 1.0/1.5))  # Normal incidence, air to glass`,
    solution: `import math

def fresnel_reflectance(cos_theta, eta_ratio):
    """
    Calculate Fresnel reflectance using Schlick's approximation.

    Args:
        cos_theta: float, cosine of incident angle
        eta_ratio: float, ratio of refractive indices (n1/n2)

    Returns:
        float, reflectance coefficient (0-1)

    Notes:
        R0 = ((n1-n2)/(n1+n2))²
        R(θ) = R0 + (1-R0)(1-cos(θ))^5
    """
    # Calculate R0 (reflectance at normal incidence)
    # R0 = ((n1 - n2) / (n1 + n2))²
    # Since eta_ratio = n1/n2, we can derive:
    # R0 = ((1 - 1/eta_ratio) / (1 + 1/eta_ratio))²
    r0 = ((1.0 - eta_ratio) / (1.0 + eta_ratio)) ** 2

    # Ensure cos_theta is in valid range
    cos_theta = max(0.0, min(1.0, cos_theta))

    # Schlick's approximation
    # R(θ) = R0 + (1 - R0)(1 - cos(θ))^5
    one_minus_cos = 1.0 - cos_theta
    reflectance = r0 + (1.0 - r0) * (one_minus_cos ** 5)

    return reflectance

# Test
print(fresnel_reflectance(1.0, 1.0/1.5))  # Normal incidence, air to glass`,
    testCases: [
      {
        input: '1.0, 1.0/1.5',
        expectedOutput: '0.04000000000000001',
        isHidden: false,
        description: 'Normal incidence (perpendicular), air to glass'
      },
      {
        input: '0.0, 1.0/1.5',
        expectedOutput: '1.0',
        isHidden: false,
        description: 'Grazing angle (parallel), total reflection'
      },
      {
        input: '0.7071, 1.0/1.33',
        expectedOutput: '0.02366158097839823',
        isHidden: true,
        description: '45 degree angle, air to water'
      }
    ],
    hints: [
      'Calculate R0 using the formula ((1-η)/(1+η))²',
      'Compute (1 - cos(θ))^5',
      'Apply Schlick\'s formula: R0 + (1-R0)*(1-cos(θ))^5',
      'At normal incidence (cos=1), reflectance equals R0',
      'At grazing angles (cos=0), reflectance approaches 1',
      'This determines the blend between reflection and refraction'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Beer-Lambert Absorption',
    difficulty: 4,
    description: 'Calculate light absorption through a transparent medium using Beer-Lambert law. This creates the colored tint when light passes through glass, water, etc.',
    starterCode: `import math

def beer_lambert_absorption(distance, absorption_color):
    """
    Calculate color absorption through a medium.

    Args:
        distance: float, distance traveled through medium
        absorption_color: tuple (r, g, b), absorption coefficients per unit distance

    Returns:
        tuple (r, g, b), transmission color multiplier

    Notes:
        Transmission = e^(-absorption * distance)
        Apply to each color channel independently
    """
    # Your code here
    pass

# Test
print(beer_lambert_absorption(2.0, (0.1, 0.05, 0.02)))`,
    solution: `import math

def beer_lambert_absorption(distance, absorption_color):
    """
    Calculate color absorption through a medium.

    Args:
        distance: float, distance traveled through medium
        absorption_color: tuple (r, g, b), absorption coefficients per unit distance

    Returns:
        tuple (r, g, b), transmission color multiplier

    Notes:
        Transmission = e^(-absorption * distance)
        Apply to each color channel independently
    """
    # Apply Beer-Lambert law to each channel
    # T = e^(-α * d)
    transmission_r = math.exp(-absorption_color[0] * distance)
    transmission_g = math.exp(-absorption_color[1] * distance)
    transmission_b = math.exp(-absorption_color[2] * distance)

    return (transmission_r, transmission_g, transmission_b)

# Test
print(beer_lambert_absorption(2.0, (0.1, 0.05, 0.02)))`,
    testCases: [
      {
        input: '2.0, (0.1, 0.05, 0.02)',
        expectedOutput: '(0.8187307530779818, 0.9048374180359595, 0.9607894391523232)',
        isHidden: false,
        description: 'Medium distance through colored glass'
      },
      {
        input: '0.0, (0.5, 0.5, 0.5)',
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'Zero distance (no absorption)'
      },
      {
        input: '5.0, (0.8, 0.1, 0.05)',
        expectedOutput: '(0.01831563888873418, 0.6065306597126334, 0.7788007830714049)',
        isHidden: true,
        description: 'Long distance, high red absorption (blue/green tint)'
      }
    ],
    hints: [
      'Use the Beer-Lambert law: T = e^(-α*d)',
      'Apply the formula independently to each color channel',
      'Higher absorption coefficient = more absorption = less transmission',
      'Distance of 0 should give transmission of 1.0 (full transmission)',
      'Different absorption per channel creates colored glass effects',
      'Red glass has low absorption for red, high for blue and green'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t7-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Path Tracing Sample Ray',
    difficulty: 5,
    description: 'Generate a random ray direction for path tracing using importance sampling. Sample the hemisphere around a surface normal weighted by cosine distribution.',
    starterCode: `import math
import random

def sample_cosine_hemisphere(normal, random_u1, random_u2):
    """
    Generate random direction in cosine-weighted hemisphere.

    Args:
        normal: tuple (x, y, z), normalized surface normal
        random_u1, random_u2: float (0-1), random numbers

    Returns:
        tuple (x, y, z), random direction (normalized)

    Notes:
        Use Malley's method:
        - Sample unit disk using random numbers
        - Project up to hemisphere
        - Transform from local to world space
    """
    # Your code here
    pass

# Test with fixed random values
print(sample_cosine_hemisphere((0.0, 1.0, 0.0), 0.5, 0.5))`,
    solution: `import math
import random

def sample_cosine_hemisphere(normal, random_u1, random_u2):
    """
    Generate random direction in cosine-weighted hemisphere.

    Args:
        normal: tuple (x, y, z), normalized surface normal
        random_u1, random_u2: float (0-1), random numbers

    Returns:
        tuple (x, y, z), random direction (normalized)

    Notes:
        Use Malley's method:
        - Sample unit disk using random numbers
        - Project up to hemisphere
        - Transform from local to world space
    """
    # Sample point on unit disk using concentric mapping
    theta = 2.0 * math.pi * random_u1
    radius = math.sqrt(random_u2)

    disk_x = radius * math.cos(theta)
    disk_y = radius * math.sin(theta)

    # Project to hemisphere (z = sqrt(1 - x² - y²))
    local_z = math.sqrt(max(0.0, 1.0 - disk_x*disk_x - disk_y*disk_y))

    # Local hemisphere coordinates (z is up)
    local_dir = (disk_x, disk_y, local_z)

    # Build tangent space basis from normal
    # Find an axis that's not parallel to normal
    if abs(normal[0]) > 0.9:
        tangent = (0.0, 1.0, 0.0)
    else:
        tangent = (1.0, 0.0, 0.0)

    # Bitangent = normal × tangent
    bitangent_x = normal[1]*tangent[2] - normal[2]*tangent[1]
    bitangent_y = normal[2]*tangent[0] - normal[0]*tangent[2]
    bitangent_z = normal[0]*tangent[1] - normal[1]*tangent[0]

    # Normalize bitangent
    mag = math.sqrt(bitangent_x**2 + bitangent_y**2 + bitangent_z**2)
    bitangent = (bitangent_x/mag, bitangent_y/mag, bitangent_z/mag)

    # Tangent = bitangent × normal
    tangent_x = bitangent[1]*normal[2] - bitangent[2]*normal[1]
    tangent_y = bitangent[2]*normal[0] - bitangent[0]*normal[2]
    tangent_z = bitangent[0]*normal[1] - bitangent[1]*normal[0]

    # Transform local direction to world space
    world_x = local_dir[0]*tangent_x + local_dir[1]*bitangent[0] + local_dir[2]*normal[0]
    world_y = local_dir[0]*tangent_y + local_dir[1]*bitangent[1] + local_dir[2]*normal[1]
    world_z = local_dir[0]*tangent_z + local_dir[1]*bitangent[2] + local_dir[2]*normal[2]

    return (world_x, world_y, world_z)

# Test with fixed random values
print(sample_cosine_hemisphere((0.0, 1.0, 0.0), 0.5, 0.5))`,
    testCases: [
      {
        input: '(0.0, 1.0, 0.0), 0.5, 0.5',
        expectedOutput: '(0.0, 0.7071067811865476, 0.7071067811865476)',
        isHidden: false,
        description: 'Sample with normal pointing up'
      },
      {
        input: '(0.0, 1.0, 0.0), 0.0, 0.0',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Center of distribution (straight up)'
      },
      {
        input: '(1.0, 0.0, 0.0), 0.25, 0.5',
        expectedOutput: '(0.7071067811865476, 0.0, 0.7071067811865476)',
        isHidden: true,
        description: 'Normal pointing along X axis'
      }
    ],
    hints: [
      'Use Malley\'s method: sample disk, then project to hemisphere',
      'Convert random values to polar coordinates: θ = 2πu₁, r = √u₂',
      'Disk point: (r*cos(θ), r*sin(θ))',
      'Hemisphere z = √(1 - x² - y²)',
      'Build tangent space basis (tangent, bitangent, normal)',
      'Transform local hemisphere coordinates to world space using TBN matrix',
      'Cosine weighting naturally occurs from disk-to-hemisphere projection',
      'This is used in path tracing for physically accurate light transport'
    ],
    language: 'python'
  }
];
