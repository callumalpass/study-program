import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs306-t5-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Calculate Ambient Light Component',
    difficulty: 1,
    description: 'Calculate the ambient lighting component given ambient intensity and material color. Ambient light = ambient_intensity * material_color.',
    starterCode: `def calculate_ambient(ambient_intensity, material_color):
    """
    Calculate ambient light component.

    Args:
        ambient_intensity: float, ambient light intensity (0-1)
        material_color: tuple of (r, g, b), each 0-1

    Returns:
        tuple of (r, g, b) ambient color
    """
    # Your code here
    pass

# Test
print(calculate_ambient(0.2, (1.0, 0.5, 0.3)))`,
    solution: `def calculate_ambient(ambient_intensity, material_color):
    """
    Calculate ambient light component.

    Args:
        ambient_intensity: float, ambient light intensity (0-1)
        material_color: tuple of (r, g, b), each 0-1

    Returns:
        tuple of (r, g, b) ambient color
    """
    r = ambient_intensity * material_color[0]
    g = ambient_intensity * material_color[1]
    b = ambient_intensity * material_color[2]
    return (r, g, b)

# Test
print(calculate_ambient(0.2, (1.0, 0.5, 0.3)))`,
    testCases: [
      {
        input: '0.2, (1.0, 0.5, 0.3)',
        expectedOutput: '(0.2, 0.1, 0.06)',
        isHidden: false,
        description: 'Basic ambient calculation'
      },
      {
        input: '0.5, (0.8, 0.8, 0.8)',
        expectedOutput: '(0.4, 0.4, 0.4)',
        isHidden: false,
        description: 'Gray material with medium ambient'
      },
      {
        input: '1.0, (0.0, 1.0, 0.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: true,
        description: 'Full ambient intensity'
      }
    ],
    hints: [
      'Multiply the ambient intensity with each color component separately',
      'The result should be a tuple with three values (r, g, b)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Normalize a Vector',
    difficulty: 1,
    description: 'Normalize a 3D vector to unit length. A normalized vector has magnitude 1 and is calculated as v / ||v||.',
    starterCode: `import math

def normalize_vector(v):
    """
    Normalize a 3D vector to unit length.

    Args:
        v: tuple of (x, y, z)

    Returns:
        tuple of normalized (x, y, z)
    """
    # Your code here
    pass

# Test
print(normalize_vector((3.0, 4.0, 0.0)))`,
    solution: `import math

def normalize_vector(v):
    """
    Normalize a 3D vector to unit length.

    Args:
        v: tuple of (x, y, z)

    Returns:
        tuple of normalized (x, y, z)
    """
    magnitude = math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    if magnitude == 0:
        return (0.0, 0.0, 0.0)
    return (v[0] / magnitude, v[1] / magnitude, v[2] / magnitude)

# Test
print(normalize_vector((3.0, 4.0, 0.0)))`,
    testCases: [
      {
        input: '(3.0, 4.0, 0.0)',
        expectedOutput: '(0.6, 0.8, 0.0)',
        isHidden: false,
        description: '3-4-5 triangle vector'
      },
      {
        input: '(1.0, 0.0, 0.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Already normalized vector'
      },
      {
        input: '(1.0, 1.0, 1.0)',
        expectedOutput: '(0.5773502691896258, 0.5773502691896258, 0.5773502691896258)',
        isHidden: true,
        description: 'Diagonal vector'
      }
    ],
    hints: [
      'Calculate the magnitude using the Pythagorean theorem in 3D',
      'Divide each component by the magnitude',
      'Handle the zero vector case to avoid division by zero'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Compute Dot Product',
    difficulty: 1,
    description: 'Calculate the dot product of two 3D vectors. The dot product is: a·b = ax*bx + ay*by + az*bz.',
    starterCode: `def dot_product(a, b):
    """
    Calculate dot product of two 3D vectors.

    Args:
        a: tuple of (x, y, z)
        b: tuple of (x, y, z)

    Returns:
        float, the dot product
    """
    # Your code here
    pass

# Test
print(dot_product((1.0, 0.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def dot_product(a, b):
    """
    Calculate dot product of two 3D vectors.

    Args:
        a: tuple of (x, y, z)
        b: tuple of (x, y, z)

    Returns:
        float, the dot product
    """
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

# Test
print(dot_product((1.0, 0.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '0.0',
        isHidden: false,
        description: 'Perpendicular vectors'
      },
      {
        input: '(1.0, 2.0, 3.0), (4.0, 5.0, 6.0)',
        expectedOutput: '32.0',
        isHidden: false,
        description: 'General vectors'
      },
      {
        input: '(1.0, 0.0, 0.0), (1.0, 0.0, 0.0)',
        expectedOutput: '1.0',
        isHidden: true,
        description: 'Parallel unit vectors'
      }
    ],
    hints: [
      'Multiply corresponding components and sum them',
      'The dot product of perpendicular vectors is 0'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Calculate Diffuse Component',
    difficulty: 2,
    description: 'Calculate the diffuse lighting component using Lambertian reflection. Diffuse = light_intensity * material_color * max(0, N·L), where N is the surface normal and L is the light direction.',
    starterCode: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def calculate_diffuse(light_intensity, material_color, normal, light_dir):
    """
    Calculate diffuse light component.

    Args:
        light_intensity: float (0-1)
        material_color: tuple (r, g, b) each 0-1
        normal: tuple (x, y, z), normalized surface normal
        light_dir: tuple (x, y, z), normalized direction to light

    Returns:
        tuple of (r, g, b) diffuse color
    """
    # Your code here
    pass

# Test
print(calculate_diffuse(1.0, (1.0, 0.5, 0.3), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def calculate_diffuse(light_intensity, material_color, normal, light_dir):
    """
    Calculate diffuse light component.

    Args:
        light_intensity: float (0-1)
        material_color: tuple (r, g, b) each 0-1
        normal: tuple (x, y, z), normalized surface normal
        light_dir: tuple (x, y, z), normalized direction to light

    Returns:
        tuple of (r, g, b) diffuse color
    """
    # Calculate N·L and clamp to [0, 1]
    n_dot_l = max(0.0, dot_product(normal, light_dir))

    # Apply diffuse calculation to each color component
    r = light_intensity * material_color[0] * n_dot_l
    g = light_intensity * material_color[1] * n_dot_l
    b = light_intensity * material_color[2] * n_dot_l

    return (r, g, b)

# Test
print(calculate_diffuse(1.0, (1.0, 0.5, 0.3), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '1.0, (1.0, 0.5, 0.3), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(1.0, 0.5, 0.3)',
        isHidden: false,
        description: 'Light directly aligned with normal'
      },
      {
        input: '1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, -1.0, 0.0)',
        expectedOutput: '(0.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Light from behind surface'
      },
      {
        input: '0.8, (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.7071, 0.7071)',
        expectedOutput: '(0.56568, 0.0, 0.0)',
        isHidden: true,
        description: '45 degree angle light'
      }
    ],
    hints: [
      'Use the dot product between normal and light direction',
      'Use max(0, N·L) to handle surfaces facing away from light',
      'Multiply the result by light intensity and material color'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Calculate Reflection Vector',
    difficulty: 2,
    description: 'Calculate the reflection vector R given an incident light direction L and surface normal N. Use the formula: R = 2(N·L)N - L.',
    starterCode: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def reflect_vector(light_dir, normal):
    """
    Calculate reflection vector.

    Args:
        light_dir: tuple (x, y, z), normalized direction to light
        normal: tuple (x, y, z), normalized surface normal

    Returns:
        tuple of (x, y, z) reflection vector
    """
    # Your code here
    pass

# Test
print(reflect_vector((0.0, -1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def reflect_vector(light_dir, normal):
    """
    Calculate reflection vector.

    Args:
        light_dir: tuple (x, y, z), normalized direction to light
        normal: tuple (x, y, z), normalized surface normal

    Returns:
        tuple of (x, y, z) reflection vector
    """
    # R = 2(N·L)N - L
    n_dot_l = dot_product(normal, light_dir)

    rx = 2 * n_dot_l * normal[0] - light_dir[0]
    ry = 2 * n_dot_l * normal[1] - light_dir[1]
    rz = 2 * n_dot_l * normal[2] - light_dir[2]

    return (rx, ry, rz)

# Test
print(reflect_vector((0.0, -1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(0.0, -1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Light from below, reflects upward'
      },
      {
        input: '(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(1.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Perpendicular light'
      },
      {
        input: '(0.7071, -0.7071, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.7071, 0.7071, 0.0)',
        isHidden: true,
        description: '45 degree incident angle'
      }
    ],
    hints: [
      'Use the formula R = 2(N·L)N - L',
      'First calculate the dot product N·L',
      'Then scale the normal by 2(N·L) and subtract the light direction'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Calculate Specular Component',
    difficulty: 3,
    description: 'Calculate the specular lighting component using the Phong reflection model. Specular = light_intensity * specular_color * max(0, R·V)^shininess, where R is the reflection vector and V is the view direction.',
    starterCode: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    rx = 2 * n_dot_l * normal[0] - light_dir[0]
    ry = 2 * n_dot_l * normal[1] - light_dir[1]
    rz = 2 * n_dot_l * normal[2] - light_dir[2]
    return (rx, ry, rz)

def calculate_specular(light_intensity, specular_color, normal, light_dir, view_dir, shininess):
    """
    Calculate specular light component.

    Args:
        light_intensity: float (0-1)
        specular_color: tuple (r, g, b) each 0-1
        normal: tuple (x, y, z), normalized surface normal
        light_dir: tuple (x, y, z), normalized direction to light
        view_dir: tuple (x, y, z), normalized direction to viewer
        shininess: float, specular exponent (higher = sharper highlight)

    Returns:
        tuple of (r, g, b) specular color
    """
    # Your code here
    pass

# Test
print(calculate_specular(1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0))`,
    solution: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    rx = 2 * n_dot_l * normal[0] - light_dir[0]
    ry = 2 * n_dot_l * normal[1] - light_dir[1]
    rz = 2 * n_dot_l * normal[2] - light_dir[2]
    return (rx, ry, rz)

def calculate_specular(light_intensity, specular_color, normal, light_dir, view_dir, shininess):
    """
    Calculate specular light component.

    Args:
        light_intensity: float (0-1)
        specular_color: tuple (r, g, b) each 0-1
        normal: tuple (x, y, z), normalized surface normal
        light_dir: tuple (x, y, z), normalized direction to light
        view_dir: tuple (x, y, z), normalized direction to viewer
        shininess: float, specular exponent (higher = sharper highlight)

    Returns:
        tuple of (r, g, b) specular color
    """
    # Calculate reflection vector
    reflection = reflect_vector(light_dir, normal)

    # Calculate R·V and clamp to [0, 1]
    r_dot_v = max(0.0, dot_product(reflection, view_dir))

    # Apply specular exponent
    spec_factor = r_dot_v ** shininess

    # Apply to each color component
    r = light_intensity * specular_color[0] * spec_factor
    g = light_intensity * specular_color[1] * spec_factor
    b = light_intensity * specular_color[2] * spec_factor

    return (r, g, b)

# Test
print(calculate_specular(1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0))`,
    testCases: [
      {
        input: '1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0',
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'Perfect reflection alignment'
      },
      {
        input: '1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (1.0, 0.0, 0.0), 32.0',
        expectedOutput: '(0.0, 0.0, 0.0)',
        isHidden: false,
        description: 'View perpendicular to reflection'
      },
      {
        input: '0.8, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 128.0',
        expectedOutput: '(0.8, 0.8, 0.8)',
        isHidden: true,
        description: 'High shininess value'
      }
    ],
    hints: [
      'First calculate the reflection vector R',
      'Then compute the dot product between R and the view direction V',
      'Raise the clamped dot product to the shininess power',
      'Multiply by light intensity and specular color'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Distance Attenuation',
    difficulty: 2,
    description: 'Calculate light attenuation based on distance using the formula: attenuation = 1 / (constant + linear*d + quadratic*d²), where d is the distance to the light.',
    starterCode: `import math

def calculate_attenuation(distance, constant, linear, quadratic):
    """
    Calculate light attenuation factor.

    Args:
        distance: float, distance from light source
        constant: float, constant attenuation factor
        linear: float, linear attenuation factor
        quadratic: float, quadratic attenuation factor

    Returns:
        float, attenuation factor (0-1)
    """
    # Your code here
    pass

# Test
print(calculate_attenuation(5.0, 1.0, 0.09, 0.032))`,
    solution: `import math

def calculate_attenuation(distance, constant, linear, quadratic):
    """
    Calculate light attenuation factor.

    Args:
        distance: float, distance from light source
        constant: float, constant attenuation factor
        linear: float, linear attenuation factor
        quadratic: float, quadratic attenuation factor

    Returns:
        float, attenuation factor (0-1)
    """
    denominator = constant + linear * distance + quadratic * distance * distance
    if denominator == 0:
        return 1.0
    return 1.0 / denominator

# Test
print(calculate_attenuation(5.0, 1.0, 0.09, 0.032))`,
    testCases: [
      {
        input: '5.0, 1.0, 0.09, 0.032',
        expectedOutput: '0.5714285714285714',
        isHidden: false,
        description: 'Medium distance with typical values'
      },
      {
        input: '0.0, 1.0, 0.0, 0.0',
        expectedOutput: '1.0',
        isHidden: false,
        description: 'No distance (at light source)'
      },
      {
        input: '10.0, 1.0, 0.14, 0.07',
        expectedOutput: '0.2941176470588235',
        isHidden: true,
        description: 'Longer distance with stronger attenuation'
      }
    ],
    hints: [
      'Use the formula: 1 / (constant + linear*d + quadratic*d²)',
      'Handle the case where denominator might be zero',
      'At distance 0, attenuation should be 1.0 (full intensity)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Phong Lighting with Attenuation',
    difficulty: 3,
    description: 'Implement complete Phong lighting with distance attenuation. Combine ambient, diffuse, and specular components, then apply attenuation to diffuse and specular.',
    starterCode: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    rx = 2 * n_dot_l * normal[0] - light_dir[0]
    ry = 2 * n_dot_l * normal[1] - light_dir[1]
    rz = 2 * n_dot_l * normal[2] - light_dir[2]
    return (rx, ry, rz)

def phong_lighting(ambient_i, light_i, material_color, specular_color,
                   normal, light_dir, view_dir, shininess, distance,
                   att_const, att_linear, att_quad):
    """
    Calculate Phong lighting with attenuation.

    Args:
        ambient_i: float, ambient intensity
        light_i: float, light intensity
        material_color: tuple (r, g, b)
        specular_color: tuple (r, g, b)
        normal: tuple (x, y, z), normalized
        light_dir: tuple (x, y, z), normalized
        view_dir: tuple (x, y, z), normalized
        shininess: float
        distance: float, distance to light
        att_const, att_linear, att_quad: attenuation parameters

    Returns:
        tuple of (r, g, b) final color
    """
    # Your code here
    pass

# Test
print(phong_lighting(0.1, 1.0, (1.0, 0.5, 0.3), (1.0, 1.0, 1.0),
                     (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0),
                     32.0, 5.0, 1.0, 0.09, 0.032))`,
    solution: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    rx = 2 * n_dot_l * normal[0] - light_dir[0]
    ry = 2 * n_dot_l * normal[1] - light_dir[1]
    rz = 2 * n_dot_l * normal[2] - light_dir[2]
    return (rx, ry, rz)

def phong_lighting(ambient_i, light_i, material_color, specular_color,
                   normal, light_dir, view_dir, shininess, distance,
                   att_const, att_linear, att_quad):
    """
    Calculate Phong lighting with attenuation.

    Args:
        ambient_i: float, ambient intensity
        light_i: float, light intensity
        material_color: tuple (r, g, b)
        specular_color: tuple (r, g, b)
        normal: tuple (x, y, z), normalized
        light_dir: tuple (x, y, z), normalized
        view_dir: tuple (x, y, z), normalized
        shininess: float
        distance: float, distance to light
        att_const, att_linear, att_quad: attenuation parameters

    Returns:
        tuple of (r, g, b) final color
    """
    # Calculate attenuation
    attenuation = 1.0 / (att_const + att_linear * distance + att_quad * distance * distance)

    # Ambient component (not affected by attenuation)
    ambient_r = ambient_i * material_color[0]
    ambient_g = ambient_i * material_color[1]
    ambient_b = ambient_i * material_color[2]

    # Diffuse component
    n_dot_l = max(0.0, dot_product(normal, light_dir))
    diffuse_r = light_i * material_color[0] * n_dot_l * attenuation
    diffuse_g = light_i * material_color[1] * n_dot_l * attenuation
    diffuse_b = light_i * material_color[2] * n_dot_l * attenuation

    # Specular component
    reflection = reflect_vector(light_dir, normal)
    r_dot_v = max(0.0, dot_product(reflection, view_dir))
    spec_factor = (r_dot_v ** shininess) * attenuation
    specular_r = light_i * specular_color[0] * spec_factor
    specular_g = light_i * specular_color[1] * spec_factor
    specular_b = light_i * specular_color[2] * spec_factor

    # Combine all components
    final_r = ambient_r + diffuse_r + specular_r
    final_g = ambient_g + diffuse_g + specular_g
    final_b = ambient_b + diffuse_b + specular_b

    return (final_r, final_g, final_b)

# Test
print(phong_lighting(0.1, 1.0, (1.0, 0.5, 0.3), (1.0, 1.0, 1.0),
                     (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0),
                     32.0, 5.0, 1.0, 0.09, 0.032))`,
    testCases: [
      {
        input: '0.1, 1.0, (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0, 5.0, 1.0, 0.09, 0.032',
        expectedOutput: '(0.7714285714285715, 0.38571428571428573, 0.8014285714285715)',
        isHidden: false,
        description: 'Full Phong with medium distance'
      },
      {
        input: '0.2, 1.0, (0.8, 0.8, 0.8), (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, -1.0, 0.0), (0.0, 1.0, 0.0), 16.0, 3.0, 1.0, 0.1, 0.05',
        expectedOutput: '(0.16, 0.16, 0.16)',
        isHidden: false,
        description: 'Light from behind (only ambient)'
      },
      {
        input: '0.05, 1.0, (1.0, 0.0, 0.0), (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 64.0, 1.0, 1.0, 0.0, 0.0',
        expectedOutput: '(2.05, 0.0, 0.0)',
        isHidden: true,
        description: 'Close distance, no attenuation'
      }
    ],
    hints: [
      'Calculate attenuation first',
      'Ambient is not affected by attenuation',
      'Apply attenuation to both diffuse and specular components',
      'Combine all three components at the end'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Calculate Light Direction Vector',
    difficulty: 2,
    description: 'Calculate and normalize the direction vector from a surface point to a light source position.',
    starterCode: `import math

def light_direction_vector(surface_point, light_position):
    """
    Calculate normalized direction from surface to light.

    Args:
        surface_point: tuple (x, y, z) of point on surface
        light_position: tuple (x, y, z) of light position

    Returns:
        tuple of normalized (x, y, z) direction vector
    """
    # Your code here
    pass

# Test
print(light_direction_vector((0.0, 0.0, 0.0), (3.0, 4.0, 0.0)))`,
    solution: `import math

def light_direction_vector(surface_point, light_position):
    """
    Calculate normalized direction from surface to light.

    Args:
        surface_point: tuple (x, y, z) of point on surface
        light_position: tuple (x, y, z) of light position

    Returns:
        tuple of normalized (x, y, z) direction vector
    """
    # Calculate direction vector
    dx = light_position[0] - surface_point[0]
    dy = light_position[1] - surface_point[1]
    dz = light_position[2] - surface_point[2]

    # Normalize
    magnitude = math.sqrt(dx*dx + dy*dy + dz*dz)
    if magnitude == 0:
        return (0.0, 0.0, 0.0)

    return (dx / magnitude, dy / magnitude, dz / magnitude)

# Test
print(light_direction_vector((0.0, 0.0, 0.0), (3.0, 4.0, 0.0)))`,
    testCases: [
      {
        input: '(0.0, 0.0, 0.0), (3.0, 4.0, 0.0)',
        expectedOutput: '(0.6, 0.8, 0.0)',
        isHidden: false,
        description: 'Simple 3-4-5 triangle'
      },
      {
        input: '(1.0, 2.0, 3.0), (1.0, 2.0, 3.0)',
        expectedOutput: '(0.0, 0.0, 0.0)',
        isHidden: false,
        description: 'Light at surface point'
      },
      {
        input: '(1.0, 1.0, 1.0), (4.0, 5.0, 1.0)',
        expectedOutput: '(0.6, 0.8, 0.0)',
        isHidden: true,
        description: 'Offset positions'
      }
    ],
    hints: [
      'Subtract surface point from light position to get direction',
      'Normalize the resulting vector',
      'Handle the case where the points are identical'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Blinn-Phong Half Vector',
    difficulty: 3,
    description: 'Calculate the half vector H for Blinn-Phong shading. The half vector is the normalized average of the light direction L and view direction V: H = normalize(L + V).',
    starterCode: `import math

def calculate_half_vector(light_dir, view_dir):
    """
    Calculate the half vector for Blinn-Phong shading.

    Args:
        light_dir: tuple (x, y, z), normalized direction to light
        view_dir: tuple (x, y, z), normalized direction to viewer

    Returns:
        tuple of normalized (x, y, z) half vector
    """
    # Your code here
    pass

# Test
print(calculate_half_vector((0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `import math

def calculate_half_vector(light_dir, view_dir):
    """
    Calculate the half vector for Blinn-Phong shading.

    Args:
        light_dir: tuple (x, y, z), normalized direction to light
        view_dir: tuple (x, y, z), normalized direction to viewer

    Returns:
        tuple of normalized (x, y, z) half vector
    """
    # Add the vectors
    hx = light_dir[0] + view_dir[0]
    hy = light_dir[1] + view_dir[1]
    hz = light_dir[2] + view_dir[2]

    # Normalize
    magnitude = math.sqrt(hx*hx + hy*hy + hz*hz)
    if magnitude == 0:
        return (0.0, 0.0, 0.0)

    return (hx / magnitude, hy / magnitude, hz / magnitude)

# Test
print(calculate_half_vector((0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(0.0, 1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.0, 1.0, 0.0)',
        isHidden: false,
        description: 'Identical directions'
      },
      {
        input: '(1.0, 0.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.7071067811865475, 0.7071067811865475, 0.0)',
        isHidden: false,
        description: 'Perpendicular directions'
      },
      {
        input: '(0.7071, 0.7071, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.408248290463863, 0.9128709291752769, 0.0)',
        isHidden: true,
        description: '45 degree light direction'
      }
    ],
    hints: [
      'Add the light and view direction vectors component-wise',
      'Normalize the resulting vector',
      'The half vector lies between L and V'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Blinn-Phong Specular Component',
    difficulty: 3,
    description: 'Calculate specular component using Blinn-Phong shading. Instead of R·V, use N·H where H is the half vector. This is more efficient than traditional Phong.',
    starterCode: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def calculate_half_vector(light_dir, view_dir):
    hx = light_dir[0] + view_dir[0]
    hy = light_dir[1] + view_dir[1]
    hz = light_dir[2] + view_dir[2]
    magnitude = math.sqrt(hx*hx + hy*hy + hz*hz)
    if magnitude == 0:
        return (0.0, 0.0, 0.0)
    return (hx / magnitude, hy / magnitude, hz / magnitude)

def blinn_phong_specular(light_intensity, specular_color, normal,
                         light_dir, view_dir, shininess):
    """
    Calculate Blinn-Phong specular component.

    Args:
        light_intensity: float (0-1)
        specular_color: tuple (r, g, b) each 0-1
        normal: tuple (x, y, z), normalized surface normal
        light_dir: tuple (x, y, z), normalized direction to light
        view_dir: tuple (x, y, z), normalized direction to viewer
        shininess: float, specular exponent

    Returns:
        tuple of (r, g, b) specular color
    """
    # Your code here
    pass

# Test
print(blinn_phong_specular(1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0),
                           (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0))`,
    solution: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def calculate_half_vector(light_dir, view_dir):
    hx = light_dir[0] + view_dir[0]
    hy = light_dir[1] + view_dir[1]
    hz = light_dir[2] + view_dir[2]
    magnitude = math.sqrt(hx*hx + hy*hy + hz*hz)
    if magnitude == 0:
        return (0.0, 0.0, 0.0)
    return (hx / magnitude, hy / magnitude, hz / magnitude)

def blinn_phong_specular(light_intensity, specular_color, normal,
                         light_dir, view_dir, shininess):
    """
    Calculate Blinn-Phong specular component.

    Args:
        light_intensity: float (0-1)
        specular_color: tuple (r, g, b) each 0-1
        normal: tuple (x, y, z), normalized surface normal
        light_dir: tuple (x, y, z), normalized direction to light
        view_dir: tuple (x, y, z), normalized direction to viewer
        shininess: float, specular exponent

    Returns:
        tuple of (r, g, b) specular color
    """
    # Calculate half vector
    half_vector = calculate_half_vector(light_dir, view_dir)

    # Calculate N·H and clamp to [0, 1]
    n_dot_h = max(0.0, dot_product(normal, half_vector))

    # Apply specular exponent
    spec_factor = n_dot_h ** shininess

    # Apply to each color component
    r = light_intensity * specular_color[0] * spec_factor
    g = light_intensity * specular_color[1] * spec_factor
    b = light_intensity * specular_color[2] * spec_factor

    return (r, g, b)

# Test
print(blinn_phong_specular(1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0),
                           (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0))`,
    testCases: [
      {
        input: '1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 32.0',
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'Perfect alignment'
      },
      {
        input: '1.0, (1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0), 32.0',
        expectedOutput: '(0.125, 0.125, 0.125)',
        isHidden: false,
        description: 'Perpendicular light'
      },
      {
        input: '0.8, (1.0, 0.5, 0.3), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 64.0',
        expectedOutput: '(0.8, 0.4, 0.24)',
        isHidden: true,
        description: 'High shininess with colored specular'
      }
    ],
    hints: [
      'Calculate the half vector H from L and V',
      'Compute the dot product between N and H',
      'Use the same power operation as Phong, but with N·H instead of R·V',
      'Blinn-Phong is computationally cheaper than traditional Phong'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Multiple Point Lights',
    difficulty: 4,
    description: 'Calculate lighting from multiple point light sources. Each light contributes independently to the final color. Sum all contributions along with ambient.',
    starterCode: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def normalize(v):
    mag = math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    if mag == 0: return (0.0, 0.0, 0.0)
    return (v[0]/mag, v[1]/mag, v[2]/mag)

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    return (2*n_dot_l*normal[0]-light_dir[0],
            2*n_dot_l*normal[1]-light_dir[1],
            2*n_dot_l*normal[2]-light_dir[2])

def multiple_lights(surface_pos, normal, view_dir, material_color,
                    specular_color, shininess, ambient_i, lights):
    """
    Calculate lighting from multiple point lights.

    Args:
        surface_pos: tuple (x, y, z) surface position
        normal: tuple (x, y, z) normalized surface normal
        view_dir: tuple (x, y, z) normalized view direction
        material_color: tuple (r, g, b)
        specular_color: tuple (r, g, b)
        shininess: float
        ambient_i: float, ambient intensity
        lights: list of dicts, each with:
            - 'position': (x, y, z)
            - 'intensity': float
            - 'attenuation': (constant, linear, quadratic)

    Returns:
        tuple of (r, g, b) final color
    """
    # Your code here
    pass

# Test
lights = [
    {'position': (0.0, 5.0, 0.0), 'intensity': 1.0, 'attenuation': (1.0, 0.09, 0.032)},
    {'position': (5.0, 0.0, 0.0), 'intensity': 0.8, 'attenuation': (1.0, 0.09, 0.032)}
]
print(multiple_lights((0.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0),
                      (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), 32.0, 0.1, lights))`,
    solution: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def normalize(v):
    mag = math.sqrt(v[0]**2 + v[1]**2 + v[2]**2)
    if mag == 0: return (0.0, 0.0, 0.0)
    return (v[0]/mag, v[1]/mag, v[2]/mag)

def reflect_vector(light_dir, normal):
    n_dot_l = dot_product(normal, light_dir)
    return (2*n_dot_l*normal[0]-light_dir[0],
            2*n_dot_l*normal[1]-light_dir[1],
            2*n_dot_l*normal[2]-light_dir[2])

def multiple_lights(surface_pos, normal, view_dir, material_color,
                    specular_color, shininess, ambient_i, lights):
    """
    Calculate lighting from multiple point lights.

    Args:
        surface_pos: tuple (x, y, z) surface position
        normal: tuple (x, y, z) normalized surface normal
        view_dir: tuple (x, y, z) normalized view direction
        material_color: tuple (r, g, b)
        specular_color: tuple (r, g, b)
        shininess: float
        ambient_i: float, ambient intensity
        lights: list of dicts, each with:
            - 'position': (x, y, z)
            - 'intensity': float
            - 'attenuation': (constant, linear, quadratic)

    Returns:
        tuple of (r, g, b) final color
    """
    # Ambient component
    final_r = ambient_i * material_color[0]
    final_g = ambient_i * material_color[1]
    final_b = ambient_i * material_color[2]

    # Process each light
    for light in lights:
        # Calculate light direction and distance
        dx = light['position'][0] - surface_pos[0]
        dy = light['position'][1] - surface_pos[1]
        dz = light['position'][2] - surface_pos[2]
        distance = math.sqrt(dx*dx + dy*dy + dz*dz)

        if distance == 0:
            continue

        light_dir = (dx/distance, dy/distance, dz/distance)

        # Calculate attenuation
        att = light['attenuation']
        attenuation = 1.0 / (att[0] + att[1]*distance + att[2]*distance*distance)

        # Diffuse
        n_dot_l = max(0.0, dot_product(normal, light_dir))
        final_r += light['intensity'] * material_color[0] * n_dot_l * attenuation
        final_g += light['intensity'] * material_color[1] * n_dot_l * attenuation
        final_b += light['intensity'] * material_color[2] * n_dot_l * attenuation

        # Specular
        reflection = reflect_vector(light_dir, normal)
        r_dot_v = max(0.0, dot_product(reflection, view_dir))
        spec_factor = (r_dot_v ** shininess) * attenuation
        final_r += light['intensity'] * specular_color[0] * spec_factor
        final_g += light['intensity'] * specular_color[1] * spec_factor
        final_b += light['intensity'] * specular_color[2] * spec_factor

    return (final_r, final_g, final_b)

# Test
lights = [
    {'position': (0.0, 5.0, 0.0), 'intensity': 1.0, 'attenuation': (1.0, 0.09, 0.032)},
    {'position': (5.0, 0.0, 0.0), 'intensity': 0.8, 'attenuation': (1.0, 0.09, 0.032)}
]
print(multiple_lights((0.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0),
                      (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), 32.0, 0.1, lights))`,
    testCases: [
      {
        input: "(0.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (1.0, 0.5, 0.3), (1.0, 1.0, 1.0), 32.0, 0.1, [{'position': (0.0, 5.0, 0.0), 'intensity': 1.0, 'attenuation': (1.0, 0.09, 0.032)}, {'position': (5.0, 0.0, 0.0), 'intensity': 0.8, 'attenuation': (1.0, 0.09, 0.032)}]",
        expectedOutput: '(0.7714285714285715, 0.38571428571428573, 0.8014285714285715)',
        isHidden: false,
        description: 'Two lights at different positions'
      },
      {
        input: "(0.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (1.0, 1.0, 1.0), (1.0, 1.0, 1.0), 16.0, 0.2, [{'position': (0.0, 3.0, 0.0), 'intensity': 1.0, 'attenuation': (1.0, 0.1, 0.05)}]",
        expectedOutput: '(1.1442307692307693, 1.1442307692307693, 1.1442307692307693)',
        isHidden: false,
        description: 'Single light with white material'
      },
      {
        input: "(1.0, 1.0, 1.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.8, 0.2, 0.2), (1.0, 1.0, 1.0), 64.0, 0.05, [{'position': (1.0, 6.0, 1.0), 'intensity': 1.0, 'attenuation': (1.0, 0.09, 0.032)}, {'position': (6.0, 1.0, 1.0), 'intensity': 0.6, 'attenuation': (1.0, 0.09, 0.032)}, {'position': (1.0, 1.0, 6.0), 'intensity': 0.5, 'attenuation': (1.0, 0.09, 0.032)}]",
        expectedOutput: '(0.5885714285714286, 0.15714285714285714, 0.7285714285714285)',
        isHidden: true,
        description: 'Three lights with red material'
      }
    ],
    hints: [
      'Start with the ambient component',
      'Loop through each light and calculate its contribution',
      'For each light: calculate direction, distance, attenuation',
      'Add diffuse and specular from each light to the running total',
      'Remember to normalize the light direction vector'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Spotlight Cone Calculation',
    difficulty: 4,
    description: 'Calculate the intensity falloff for a spotlight. A spotlight has a direction and cone angle. Light intensity should falloff smoothly based on the angle from the spotlight direction.',
    starterCode: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def spotlight_intensity(light_pos, light_dir, surface_pos,
                        inner_cone_cos, outer_cone_cos, intensity):
    """
    Calculate spotlight intensity at a surface point.

    Args:
        light_pos: tuple (x, y, z) light position
        light_dir: tuple (x, y, z) normalized spotlight direction
        surface_pos: tuple (x, y, z) surface position
        inner_cone_cos: float, cosine of inner cone angle
        outer_cone_cos: float, cosine of outer cone angle
        intensity: float, maximum light intensity

    Returns:
        float, intensity at surface (0 to intensity)
    """
    # Your code here
    pass

# Test
print(spotlight_intensity((0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0),
                          math.cos(math.radians(12.5)), math.cos(math.radians(17.5)), 1.0))`,
    solution: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def spotlight_intensity(light_pos, light_dir, surface_pos,
                        inner_cone_cos, outer_cone_cos, intensity):
    """
    Calculate spotlight intensity at a surface point.

    Args:
        light_pos: tuple (x, y, z) light position
        light_dir: tuple (x, y, z) normalized spotlight direction
        surface_pos: tuple (x, y, z) surface position
        inner_cone_cos: float, cosine of inner cone angle
        outer_cone_cos: float, cosine of outer cone angle
        intensity: float, maximum light intensity

    Returns:
        float, intensity at surface (0 to intensity)
    """
    # Calculate direction from light to surface
    dx = surface_pos[0] - light_pos[0]
    dy = surface_pos[1] - light_pos[1]
    dz = surface_pos[2] - light_pos[2]

    # Normalize
    distance = math.sqrt(dx*dx + dy*dy + dz*dz)
    if distance == 0:
        return intensity

    to_surface = (dx/distance, dy/distance, dz/distance)

    # Calculate angle between spotlight direction and direction to surface
    theta_cos = dot_product(light_dir, to_surface)

    # Outside outer cone
    if theta_cos < outer_cone_cos:
        return 0.0

    # Inside inner cone
    if theta_cos > inner_cone_cos:
        return intensity

    # In between - smooth falloff
    epsilon = inner_cone_cos - outer_cone_cos
    falloff = (theta_cos - outer_cone_cos) / epsilon

    return intensity * falloff

# Test
print(spotlight_intensity((0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0),
                          math.cos(math.radians(12.5)), math.cos(math.radians(17.5)), 1.0))`,
    testCases: [
      {
        input: '(0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (0.0, 0.0, 0.0), math.cos(math.radians(12.5)), math.cos(math.radians(17.5)), 1.0',
        expectedOutput: '1.0',
        isHidden: false,
        description: 'Surface directly below spotlight'
      },
      {
        input: '(0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (10.0, 0.0, 0.0), math.cos(math.radians(12.5)), math.cos(math.radians(17.5)), 1.0',
        expectedOutput: '0.0',
        isHidden: false,
        description: 'Surface outside spotlight cone'
      },
      {
        input: '(0.0, 5.0, 0.0), (0.0, -1.0, 0.0), (1.5, 0.0, 0.0), math.cos(math.radians(12.5)), math.cos(math.radians(17.5)), 1.0',
        expectedOutput: '0.5',
        isHidden: true,
        description: 'Surface in falloff region'
      }
    ],
    hints: [
      'Calculate the direction vector from light to surface',
      'Use dot product to find the angle between spotlight direction and surface direction',
      'Compare with inner and outer cone angles (as cosines)',
      'Apply smooth interpolation in the falloff region between inner and outer cones',
      'Remember: larger angles have smaller cosine values'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Fresnel Effect',
    difficulty: 4,
    description: 'Implement the Schlick approximation for the Fresnel effect. Fresnel describes how reflectivity changes based on viewing angle: F = F0 + (1 - F0)(1 - cos(θ))^5, where θ is the angle between view and normal.',
    starterCode: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def fresnel_schlick(f0, normal, view_dir):
    """
    Calculate Fresnel reflectance using Schlick approximation.

    Args:
        f0: tuple (r, g, b), base reflectivity at normal incidence (0-1 each)
        normal: tuple (x, y, z), normalized surface normal
        view_dir: tuple (x, y, z), normalized view direction

    Returns:
        tuple of (r, g, b) Fresnel reflectance
    """
    # Your code here
    pass

# Test
print(fresnel_schlick((0.04, 0.04, 0.04), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def fresnel_schlick(f0, normal, view_dir):
    """
    Calculate Fresnel reflectance using Schlick approximation.

    Args:
        f0: tuple (r, g, b), base reflectivity at normal incidence (0-1 each)
        normal: tuple (x, y, z), normalized surface normal
        view_dir: tuple (x, y, z), normalized view direction

    Returns:
        tuple of (r, g, b) Fresnel reflectance
    """
    # Calculate cosine of angle between view and normal
    cos_theta = max(0.0, dot_product(normal, view_dir))

    # Calculate (1 - cos(θ))^5
    one_minus_cos = 1.0 - cos_theta
    factor = one_minus_cos ** 5

    # Apply Schlick approximation: F = F0 + (1 - F0)(1 - cos(θ))^5
    fr = f0[0] + (1.0 - f0[0]) * factor
    fg = f0[1] + (1.0 - f0[1]) * factor
    fb = f0[2] + (1.0 - f0[2]) * factor

    return (fr, fg, fb)

# Test
print(fresnel_schlick((0.04, 0.04, 0.04), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(0.04, 0.04, 0.04), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.04, 0.04, 0.04)',
        isHidden: false,
        description: 'View perpendicular to surface (normal incidence)'
      },
      {
        input: '(0.04, 0.04, 0.04), (0.0, 1.0, 0.0), (1.0, 0.0, 0.0)',
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'View parallel to surface (grazing angle)'
      },
      {
        input: '(0.04, 0.04, 0.04), (0.0, 1.0, 0.0), (0.0, 0.7071, 0.7071)',
        expectedOutput: '(0.11494140625, 0.11494140625, 0.11494140625)',
        isHidden: true,
        description: '45 degree viewing angle'
      }
    ],
    hints: [
      'Calculate N·V to get cos(θ)',
      'Compute (1 - cos(θ))^5 using the power operator',
      'Apply the Schlick formula: F = F0 + (1 - F0) * (1 - cos(θ))^5',
      'At grazing angles (parallel view), reflectivity approaches 1',
      'At normal incidence (perpendicular view), reflectivity equals F0'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Rim Lighting',
    difficulty: 4,
    description: 'Implement rim lighting (also called edge lighting or backlighting). Rim light highlights edges where the surface normal is perpendicular to the view direction. Calculate using: rim = (1 - N·V)^power.',
    starterCode: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def rim_lighting(rim_color, rim_power, normal, view_dir):
    """
    Calculate rim lighting component.

    Args:
        rim_color: tuple (r, g, b), color of rim light
        rim_power: float, controls rim light sharpness (higher = sharper)
        normal: tuple (x, y, z), normalized surface normal
        view_dir: tuple (x, y, z), normalized view direction

    Returns:
        tuple of (r, g, b) rim light contribution
    """
    # Your code here
    pass

# Test
print(rim_lighting((1.0, 1.0, 1.0), 3.0, (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    solution: `def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def rim_lighting(rim_color, rim_power, normal, view_dir):
    """
    Calculate rim lighting component.

    Args:
        rim_color: tuple (r, g, b), color of rim light
        rim_power: float, controls rim light sharpness (higher = sharper)
        normal: tuple (x, y, z), normalized surface normal
        view_dir: tuple (x, y, z), normalized view direction

    Returns:
        tuple of (r, g, b) rim light contribution
    """
    # Calculate N·V
    n_dot_v = max(0.0, min(1.0, dot_product(normal, view_dir)))

    # Calculate rim factor: (1 - N·V)^power
    rim_factor = (1.0 - n_dot_v) ** rim_power

    # Apply to rim color
    r = rim_color[0] * rim_factor
    g = rim_color[1] * rim_factor
    b = rim_color[2] * rim_factor

    return (r, g, b)

# Test
print(rim_lighting((1.0, 1.0, 1.0), 3.0, (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)))`,
    testCases: [
      {
        input: '(1.0, 1.0, 1.0), 3.0, (0.0, 1.0, 0.0), (0.0, 1.0, 0.0)',
        expectedOutput: '(0.0, 0.0, 0.0)',
        isHidden: false,
        description: 'View perpendicular (no rim)'
      },
      {
        input: '(1.0, 1.0, 1.0), 3.0, (0.0, 1.0, 0.0), (1.0, 0.0, 0.0)',
        expectedOutput: '(1.0, 1.0, 1.0)',
        isHidden: false,
        description: 'View parallel (maximum rim)'
      },
      {
        input: '(0.5, 0.7, 1.0), 2.0, (0.0, 1.0, 0.0), (0.7071, 0.7071, 0.0)',
        expectedOutput: '(0.07322330470336314, 0.10251262658470841, 0.14644660940672627)',
        isHidden: true,
        description: '45 degree angle with colored rim'
      }
    ],
    hints: [
      'Calculate the dot product between normal and view direction',
      'Use 1 - N·V to get the rim factor (edges have low N·V)',
      'Apply the power to control sharpness of the rim',
      'Multiply by rim color to get final contribution',
      'Rim lighting is strongest when view is perpendicular to normal'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t5-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Cook-Torrance Microfacet BRDF',
    difficulty: 5,
    description: 'Implement a simplified Cook-Torrance BRDF for physically-based rendering. Calculate the specular term using: D*F*G / (4*(N·L)*(N·V)), where D is distribution (GGX), F is Fresnel, G is geometry (simplified to 1).',
    starterCode: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def calculate_half_vector(light_dir, view_dir):
    hx = light_dir[0] + view_dir[0]
    hy = light_dir[1] + view_dir[1]
    hz = light_dir[2] + view_dir[2]
    mag = math.sqrt(hx*hx + hy*hy + hz*hz)
    if mag == 0: return (0.0, 0.0, 0.0)
    return (hx/mag, hy/mag, hz/mag)

def cook_torrance_specular(f0, roughness, normal, light_dir, view_dir, light_intensity):
    """
    Calculate Cook-Torrance specular BRDF (simplified).

    Args:
        f0: tuple (r, g, b), base reflectivity
        roughness: float (0-1), surface roughness
        normal: tuple (x, y, z), normalized
        light_dir: tuple (x, y, z), normalized
        view_dir: tuple (x, y, z), normalized
        light_intensity: float

    Returns:
        tuple of (r, g, b) specular contribution

    Notes:
        - D (GGX): α²/[π((N·H)²(α²-1)+1)²], where α = roughness²
        - F (Schlick): F0 + (1-F0)(1-(H·V))^5
        - G (simplified): 1.0
        - Final: D*F*G / [4*(N·L)*(N·V)]
    """
    # Your code here
    pass

# Test
print(cook_torrance_specular((0.04, 0.04, 0.04), 0.5, (0.0, 1.0, 0.0),
                             (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 1.0))`,
    solution: `import math

def dot_product(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

def calculate_half_vector(light_dir, view_dir):
    hx = light_dir[0] + view_dir[0]
    hy = light_dir[1] + view_dir[1]
    hz = light_dir[2] + view_dir[2]
    mag = math.sqrt(hx*hx + hy*hy + hz*hz)
    if mag == 0: return (0.0, 0.0, 0.0)
    return (hx/mag, hy/mag, hz/mag)

def cook_torrance_specular(f0, roughness, normal, light_dir, view_dir, light_intensity):
    """
    Calculate Cook-Torrance specular BRDF (simplified).

    Args:
        f0: tuple (r, g, b), base reflectivity
        roughness: float (0-1), surface roughness
        normal: tuple (x, y, z), normalized
        light_dir: tuple (x, y, z), normalized
        view_dir: tuple (x, y, z), normalized
        light_intensity: float

    Returns:
        tuple of (r, g, b) specular contribution

    Notes:
        - D (GGX): α²/[π((N·H)²(α²-1)+1)²], where α = roughness²
        - F (Schlick): F0 + (1-F0)(1-(H·V))^5
        - G (simplified): 1.0
        - Final: D*F*G / [4*(N·L)*(N·V)]
    """
    # Calculate half vector
    half_vec = calculate_half_vector(light_dir, view_dir)

    # Calculate dot products
    n_dot_h = max(0.0001, dot_product(normal, half_vec))
    n_dot_l = max(0.0001, dot_product(normal, light_dir))
    n_dot_v = max(0.0001, dot_product(normal, view_dir))
    h_dot_v = max(0.0, dot_product(half_vec, view_dir))

    # Calculate alpha
    alpha = roughness * roughness
    alpha_sq = alpha * alpha

    # D: GGX distribution
    n_dot_h_sq = n_dot_h * n_dot_h
    denom = n_dot_h_sq * (alpha_sq - 1.0) + 1.0
    D = alpha_sq / (math.pi * denom * denom)

    # F: Schlick Fresnel
    one_minus_h_dot_v = 1.0 - h_dot_v
    fresnel_factor = one_minus_h_dot_v ** 5
    fr = f0[0] + (1.0 - f0[0]) * fresnel_factor
    fg = f0[1] + (1.0 - f0[1]) * fresnel_factor
    fb = f0[2] + (1.0 - f0[2]) * fresnel_factor

    # G: Geometry (simplified to 1.0)
    G = 1.0

    # Cook-Torrance: D*F*G / (4*N·L*N·V)
    denominator = 4.0 * n_dot_l * n_dot_v

    spec_r = (D * fr * G / denominator) * light_intensity * n_dot_l
    spec_g = (D * fg * G / denominator) * light_intensity * n_dot_l
    spec_b = (D * fb * G / denominator) * light_intensity * n_dot_l

    return (spec_r, spec_g, spec_b)

# Test
print(cook_torrance_specular((0.04, 0.04, 0.04), 0.5, (0.0, 1.0, 0.0),
                             (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 1.0))`,
    testCases: [
      {
        input: '(0.04, 0.04, 0.04), 0.5, (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 1.0',
        expectedOutput: '(0.25464790894703254, 0.25464790894703254, 0.25464790894703254)',
        isHidden: false,
        description: 'Perfect alignment with medium roughness'
      },
      {
        input: '(0.04, 0.04, 0.04), 0.1, (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 1.0',
        expectedOutput: '(2.546479089470325, 2.546479089470325, 2.546479089470325)',
        isHidden: false,
        description: 'Low roughness (shiny surface)'
      },
      {
        input: '(0.95, 0.64, 0.54), 0.3, (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), (0.0, 1.0, 0.0), 1.0',
        expectedOutput: '(2.685528972188889, 1.8099795928922678, 1.5278679545245902)',
        isHidden: true,
        description: 'Metallic surface (gold-like F0)'
      }
    ],
    hints: [
      'Calculate the half vector H between L and V',
      'Compute all necessary dot products: N·H, N·L, N·V, H·V',
      'Calculate D using GGX distribution with alpha = roughness²',
      'Calculate F using Schlick Fresnel approximation',
      'Combine using the Cook-Torrance formula: D*F*G / (4*(N·L)*(N·V))',
      'Add small epsilon to dot products to avoid division by zero',
      'Multiply by N·L at the end to get the final contribution'
    ],
    language: 'python'
  }
];
