import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs306-t1-ex01',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'RGB to Grayscale Conversion',
    difficulty: 1,
    description: 'Convert an RGB color to grayscale using the luminosity method: Gray = 0.299*R + 0.587*G + 0.114*B. Return the result as an integer.',
    starterCode: `def rgb_to_grayscale(r, g, b):
    """
    Convert RGB color to grayscale.

    Args:
        r: Red component (0-255)
        g: Green component (0-255)
        b: Blue component (0-255)

    Returns:
        Grayscale value (0-255)
    """
    pass`,
    solution: `def rgb_to_grayscale(r, g, b):
    """
    Convert RGB color to grayscale.

    Args:
        r: Red component (0-255)
        g: Green component (0-255)
        b: Blue component (0-255)

    Returns:
        Grayscale value (0-255)
    """
    gray = 0.299 * r + 0.587 * g + 0.114 * b
    return int(gray)`,
    testCases: [
      { input: '255, 0, 0', expectedOutput: '76', isHidden: false, description: 'Pure red' },
      { input: '0, 255, 0', expectedOutput: '149', isHidden: false, description: 'Pure green' },
      { input: '0, 0, 255', expectedOutput: '29', isHidden: false, description: 'Pure blue' },
      { input: '128, 128, 128', expectedOutput: '128', isHidden: true, description: 'Gray color' }
    ],
    hints: [
      'Use the luminosity formula: 0.299*R + 0.587*G + 0.114*B',
      'Convert the result to an integer using int()'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex02',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Cartesian to Screen Coordinates',
    difficulty: 1,
    description: 'Convert Cartesian coordinates (origin at center, y-up) to screen coordinates (origin at top-left, y-down). Given screen dimensions and a point (x, y), return screen coordinates.',
    starterCode: `def cartesian_to_screen(x, y, width, height):
    """
    Convert Cartesian coordinates to screen coordinates.

    Args:
        x: Cartesian x coordinate
        y: Cartesian y coordinate
        width: Screen width
        height: Screen height

    Returns:
        Tuple (screen_x, screen_y)
    """
    pass`,
    solution: `def cartesian_to_screen(x, y, width, height):
    """
    Convert Cartesian coordinates to screen coordinates.

    Args:
        x: Cartesian x coordinate
        y: Cartesian y coordinate
        width: Screen width
        height: Screen height

    Returns:
        Tuple (screen_x, screen_y)
    """
    screen_x = x + width / 2
    screen_y = height / 2 - y
    return (screen_x, screen_y)`,
    testCases: [
      { input: '0, 0, 800, 600', expectedOutput: '(400.0, 300.0)', isHidden: false, description: 'Origin point' },
      { input: '100, 100, 800, 600', expectedOutput: '(500.0, 200.0)', isHidden: false, description: 'Positive quadrant' },
      { input: '-100, -100, 800, 600', expectedOutput: '(300.0, 400.0)', isHidden: false, description: 'Negative quadrant' },
      { input: '400, 300, 800, 600', expectedOutput: '(800.0, 0.0)', isHidden: true, description: 'Top-right corner' }
    ],
    hints: [
      'Screen x = Cartesian x + width/2',
      'Screen y = height/2 - Cartesian y (flip y-axis)'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex03',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'RGB to Hexadecimal Color',
    difficulty: 1,
    description: 'Convert RGB color values (0-255) to a hexadecimal color string in the format "#RRGGBB".',
    starterCode: `def rgb_to_hex(r, g, b):
    """
    Convert RGB to hexadecimal color string.

    Args:
        r: Red component (0-255)
        g: Green component (0-255)
        b: Blue component (0-255)

    Returns:
        Hex color string (e.g., "#FF0000")
    """
    pass`,
    solution: `def rgb_to_hex(r, g, b):
    """
    Convert RGB to hexadecimal color string.

    Args:
        r: Red component (0-255)
        g: Green component (0-255)
        b: Blue component (0-255)

    Returns:
        Hex color string (e.g., "#FF0000")
    """
    return f"#{r:02X}{g:02X}{b:02X}"`,
    testCases: [
      { input: '255, 0, 0', expectedOutput: '#FF0000', isHidden: false, description: 'Red' },
      { input: '0, 255, 0', expectedOutput: '#00FF00', isHidden: false, description: 'Green' },
      { input: '0, 0, 255', expectedOutput: '#0000FF', isHidden: false, description: 'Blue' },
      { input: '128, 64, 32', expectedOutput: '#804020', isHidden: true, description: 'Custom color' }
    ],
    hints: [
      'Use format string with :02X for two-digit uppercase hex',
      'Prefix with # symbol'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex04',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Alpha Blending',
    difficulty: 2,
    description: 'Implement alpha blending between two colors. Given foreground RGB+alpha and background RGB, compute the blended color using: result = alpha * fg + (1 - alpha) * bg.',
    starterCode: `def alpha_blend(fg_r, fg_g, fg_b, alpha, bg_r, bg_g, bg_b):
    """
    Blend foreground and background colors using alpha.

    Args:
        fg_r, fg_g, fg_b: Foreground RGB (0-255)
        alpha: Alpha value (0.0-1.0)
        bg_r, bg_g, bg_b: Background RGB (0-255)

    Returns:
        Tuple (r, g, b) of blended color
    """
    pass`,
    solution: `def alpha_blend(fg_r, fg_g, fg_b, alpha, bg_r, bg_g, bg_b):
    """
    Blend foreground and background colors using alpha.

    Args:
        fg_r, fg_g, fg_b: Foreground RGB (0-255)
        alpha: Alpha value (0.0-1.0)
        bg_r, bg_g, bg_b: Background RGB (0-255)

    Returns:
        Tuple (r, g, b) of blended color
    """
    r = int(alpha * fg_r + (1 - alpha) * bg_r)
    g = int(alpha * fg_g + (1 - alpha) * bg_g)
    b = int(alpha * fg_b + (1 - alpha) * bg_b)
    return (r, g, b)`,
    testCases: [
      { input: '255, 0, 0, 0.5, 0, 0, 255', expectedOutput: '(127, 0, 127)', isHidden: false, description: 'Half blend red-blue' },
      { input: '255, 255, 255, 1.0, 0, 0, 0', expectedOutput: '(255, 255, 255)', isHidden: false, description: 'Full opacity' },
      { input: '255, 255, 255, 0.0, 0, 0, 0', expectedOutput: '(0, 0, 0)', isHidden: false, description: 'Zero opacity' },
      { input: '200, 100, 50, 0.3, 50, 100, 200', expectedOutput: '(95, 100, 125)', isHidden: true, description: 'Partial blend' }
    ],
    hints: [
      'Formula: result = alpha * foreground + (1 - alpha) * background',
      'Apply to each RGB component separately',
      'Convert final result to integer'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex05',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Color Inversion',
    difficulty: 1,
    description: 'Invert an RGB color by subtracting each component from 255. Return the inverted color as a tuple.',
    starterCode: `def invert_color(r, g, b):
    """
    Invert an RGB color.

    Args:
        r: Red component (0-255)
        g: Green component (0-255)
        b: Blue component (0-255)

    Returns:
        Tuple (r, g, b) of inverted color
    """
    pass`,
    solution: `def invert_color(r, g, b):
    """
    Invert an RGB color.

    Args:
        r: Red component (0-255)
        g: Green component (0-255)
        b: Blue component (0-255)

    Returns:
        Tuple (r, g, b) of inverted color
    """
    return (255 - r, 255 - g, 255 - b)`,
    testCases: [
      { input: '0, 0, 0', expectedOutput: '(255, 255, 255)', isHidden: false, description: 'Black to white' },
      { input: '255, 0, 0', expectedOutput: '(0, 255, 255)', isHidden: false, description: 'Red to cyan' },
      { input: '128, 128, 128', expectedOutput: '(127, 127, 127)', isHidden: false, description: 'Gray inverts to gray' },
      { input: '100, 150, 200', expectedOutput: '(155, 105, 55)', isHidden: true, description: 'Custom color' }
    ],
    hints: [
      'Invert each component: 255 - component',
      'Return as a tuple'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex06',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Pixel Index Calculation',
    difficulty: 2,
    description: 'Calculate the index of a pixel in a 1D framebuffer array. Given (x, y) coordinates and image width, return the index. Pixels are stored row-by-row.',
    starterCode: `def pixel_index(x, y, width):
    """
    Calculate pixel index in 1D framebuffer.

    Args:
        x: Pixel x coordinate
        y: Pixel y coordinate
        width: Image width

    Returns:
        Index in 1D array
    """
    pass`,
    solution: `def pixel_index(x, y, width):
    """
    Calculate pixel index in 1D framebuffer.

    Args:
        x: Pixel x coordinate
        y: Pixel y coordinate
        width: Image width

    Returns:
        Index in 1D array
    """
    return y * width + x`,
    testCases: [
      { input: '0, 0, 800', expectedOutput: '0', isHidden: false, description: 'First pixel' },
      { input: '799, 0, 800', expectedOutput: '799', isHidden: false, description: 'End of first row' },
      { input: '0, 1, 800', expectedOutput: '800', isHidden: false, description: 'Start of second row' },
      { input: '10, 5, 100', expectedOutput: '510', isHidden: true, description: 'Middle pixel' }
    ],
    hints: [
      'Formula: index = y * width + x',
      'Think of how 2D array is flattened to 1D'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex07',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'HSV to RGB Conversion',
    difficulty: 3,
    description: 'Convert HSV (Hue, Saturation, Value) color to RGB. Hue is 0-360, Saturation and Value are 0-1. Return RGB as integers 0-255.',
    starterCode: `def hsv_to_rgb(h, s, v):
    """
    Convert HSV to RGB color.

    Args:
        h: Hue (0-360)
        s: Saturation (0-1)
        v: Value (0-1)

    Returns:
        Tuple (r, g, b) with values 0-255
    """
    pass`,
    solution: `def hsv_to_rgb(h, s, v):
    """
    Convert HSV to RGB color.

    Args:
        h: Hue (0-360)
        s: Saturation (0-1)
        v: Value (0-1)

    Returns:
        Tuple (r, g, b) with values 0-255
    """
    c = v * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = v - c

    if 0 <= h < 60:
        r_prime, g_prime, b_prime = c, x, 0
    elif 60 <= h < 120:
        r_prime, g_prime, b_prime = x, c, 0
    elif 120 <= h < 180:
        r_prime, g_prime, b_prime = 0, c, x
    elif 180 <= h < 240:
        r_prime, g_prime, b_prime = 0, x, c
    elif 240 <= h < 300:
        r_prime, g_prime, b_prime = x, 0, c
    else:
        r_prime, g_prime, b_prime = c, 0, x

    r = int((r_prime + m) * 255)
    g = int((g_prime + m) * 255)
    b = int((b_prime + m) * 255)

    return (r, g, b)`,
    testCases: [
      { input: '0, 1, 1', expectedOutput: '(255, 0, 0)', isHidden: false, description: 'Red' },
      { input: '120, 1, 1', expectedOutput: '(0, 255, 0)', isHidden: false, description: 'Green' },
      { input: '240, 1, 1', expectedOutput: '(0, 0, 255)', isHidden: false, description: 'Blue' },
      { input: '60, 0.5, 0.8', expectedOutput: '(204, 204, 102)', isHidden: true, description: 'Yellow variant' }
    ],
    hints: [
      'Calculate chroma: C = V * S',
      'Find intermediate value X',
      'Determine RGB based on hue sector (0-60, 60-120, etc.)',
      'Add match value m to each component'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex08',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Brightness Adjustment',
    difficulty: 2,
    description: 'Adjust the brightness of an RGB color by a factor. Factor > 1 brightens, < 1 darkens. Clamp values to 0-255 range.',
    starterCode: `def adjust_brightness(r, g, b, factor):
    """
    Adjust brightness of RGB color.

    Args:
        r, g, b: RGB components (0-255)
        factor: Brightness factor (e.g., 1.5 for 50% brighter)

    Returns:
        Tuple (r, g, b) with adjusted brightness
    """
    pass`,
    solution: `def adjust_brightness(r, g, b, factor):
    """
    Adjust brightness of RGB color.

    Args:
        r, g, b: RGB components (0-255)
        factor: Brightness factor (e.g., 1.5 for 50% brighter)

    Returns:
        Tuple (r, g, b) with adjusted brightness
    """
    r = max(0, min(255, int(r * factor)))
    g = max(0, min(255, int(g * factor)))
    b = max(0, min(255, int(b * factor)))
    return (r, g, b)`,
    testCases: [
      { input: '100, 100, 100, 2.0', expectedOutput: '(200, 200, 200)', isHidden: false, description: 'Double brightness' },
      { input: '200, 200, 200, 0.5', expectedOutput: '(100, 100, 100)', isHidden: false, description: 'Half brightness' },
      { input: '200, 100, 50, 1.5', expectedOutput: '(255, 150, 75)', isHidden: false, description: 'Brighten with clamping' },
      { input: '128, 64, 32, 0.25', expectedOutput: '(32, 16, 8)', isHidden: true, description: 'Darken significantly' }
    ],
    hints: [
      'Multiply each component by factor',
      'Clamp values using max(0, min(255, value))',
      'Convert to integer'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex09',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Polar to Cartesian Coordinates',
    difficulty: 2,
    description: 'Convert polar coordinates (radius, angle in degrees) to Cartesian coordinates (x, y). Return as a tuple of floats rounded to 2 decimal places.',
    starterCode: `import math

def polar_to_cartesian(radius, angle_degrees):
    """
    Convert polar to Cartesian coordinates.

    Args:
        radius: Distance from origin
        angle_degrees: Angle in degrees (0° = positive x-axis)

    Returns:
        Tuple (x, y) rounded to 2 decimal places
    """
    pass`,
    solution: `import math

def polar_to_cartesian(radius, angle_degrees):
    """
    Convert polar to Cartesian coordinates.

    Args:
        radius: Distance from origin
        angle_degrees: Angle in degrees (0° = positive x-axis)

    Returns:
        Tuple (x, y) rounded to 2 decimal places
    """
    angle_radians = math.radians(angle_degrees)
    x = round(radius * math.cos(angle_radians), 2)
    y = round(radius * math.sin(angle_radians), 2)
    return (x, y)`,
    testCases: [
      { input: '1, 0', expectedOutput: '(1.0, 0.0)', isHidden: false, description: '0 degrees' },
      { input: '1, 90', expectedOutput: '(0.0, 1.0)', isHidden: false, description: '90 degrees' },
      { input: '10, 45', expectedOutput: '(7.07, 7.07)', isHidden: false, description: '45 degrees' },
      { input: '5, 180', expectedOutput: '(-5.0, 0.0)', isHidden: true, description: '180 degrees' }
    ],
    hints: [
      'Convert angle to radians: radians = degrees * π / 180',
      'x = radius * cos(angle), y = radius * sin(angle)',
      'Use math.cos() and math.sin()',
      'Round to 2 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex10',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Color Distance',
    difficulty: 3,
    description: 'Calculate the Euclidean distance between two RGB colors in 3D color space. Return the distance rounded to 2 decimal places.',
    starterCode: `import math

def color_distance(r1, g1, b1, r2, g2, b2):
    """
    Calculate Euclidean distance between two colors.

    Args:
        r1, g1, b1: First color RGB (0-255)
        r2, g2, b2: Second color RGB (0-255)

    Returns:
        Distance as float rounded to 2 decimals
    """
    pass`,
    solution: `import math

def color_distance(r1, g1, b1, r2, g2, b2):
    """
    Calculate Euclidean distance between two colors.

    Args:
        r1, g1, b1: First color RGB (0-255)
        r2, g2, b2: Second color RGB (0-255)

    Returns:
        Distance as float rounded to 2 decimals
    """
    distance = math.sqrt((r2 - r1)**2 + (g2 - g1)**2 + (b2 - b1)**2)
    return round(distance, 2)`,
    testCases: [
      { input: '0, 0, 0, 255, 255, 255', expectedOutput: '441.67', isHidden: false, description: 'Black to white' },
      { input: '255, 0, 0, 0, 255, 0', expectedOutput: '360.62', isHidden: false, description: 'Red to green' },
      { input: '100, 100, 100, 100, 100, 100', expectedOutput: '0.0', isHidden: false, description: 'Same color' },
      { input: '50, 100, 150, 200, 150, 100', expectedOutput: '173.21', isHidden: true, description: 'Custom colors' }
    ],
    hints: [
      'Use 3D Euclidean distance formula',
      'Distance = sqrt((r2-r1)² + (g2-g1)² + (b2-b1)²)',
      'Use math.sqrt() and round to 2 decimals'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex11',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Gamma Correction',
    difficulty: 3,
    description: 'Apply gamma correction to an RGB color. Gamma correction formula: output = 255 * (input/255)^gamma. Use gamma value provided as parameter.',
    starterCode: `def gamma_correct(r, g, b, gamma):
    """
    Apply gamma correction to RGB color.

    Args:
        r, g, b: RGB components (0-255)
        gamma: Gamma value (typically 2.2 for encoding, 1/2.2 for decoding)

    Returns:
        Tuple (r, g, b) with gamma correction applied
    """
    pass`,
    solution: `def gamma_correct(r, g, b, gamma):
    """
    Apply gamma correction to RGB color.

    Args:
        r, g, b: RGB components (0-255)
        gamma: Gamma value (typically 2.2 for encoding, 1/2.2 for decoding)

    Returns:
        Tuple (r, g, b) with gamma correction applied
    """
    r_corrected = int(255 * ((r / 255) ** gamma))
    g_corrected = int(255 * ((g / 255) ** gamma))
    b_corrected = int(255 * ((b / 255) ** gamma))
    return (r_corrected, g_corrected, b_corrected)`,
    testCases: [
      { input: '128, 128, 128, 2.2', expectedOutput: '(52, 52, 52)', isHidden: false, description: 'Mid-gray encoding' },
      { input: '128, 128, 128, 0.45', expectedOutput: '(186, 186, 186)', isHidden: false, description: 'Mid-gray decoding' },
      { input: '255, 128, 64, 2.2', expectedOutput: '(255, 52, 10)', isHidden: false, description: 'Color encoding' },
      { input: '100, 150, 200, 1.0', expectedOutput: '(100, 150, 200)', isHidden: true, description: 'Gamma 1.0 (no change)' }
    ],
    hints: [
      'Normalize to 0-1 range: value / 255',
      'Apply gamma: (normalized)^gamma',
      'Scale back to 0-255: result * 255',
      'Convert to integer'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex12',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Normalized Device Coordinates',
    difficulty: 3,
    description: 'Convert screen coordinates to Normalized Device Coordinates (NDC). NDC range is [-1, 1] for both x and y. Return as tuple of floats rounded to 3 decimals.',
    starterCode: `def screen_to_ndc(x, y, width, height):
    """
    Convert screen coordinates to NDC.

    Args:
        x, y: Screen coordinates
        width, height: Screen dimensions

    Returns:
        Tuple (ndc_x, ndc_y) in range [-1, 1]
    """
    pass`,
    solution: `def screen_to_ndc(x, y, width, height):
    """
    Convert screen coordinates to NDC.

    Args:
        x, y: Screen coordinates
        width, height: Screen dimensions

    Returns:
        Tuple (ndc_x, ndc_y) in range [-1, 1]
    """
    ndc_x = (2 * x / width) - 1
    ndc_y = 1 - (2 * y / height)
    return (round(ndc_x, 3), round(ndc_y, 3))`,
    testCases: [
      { input: '400, 300, 800, 600', expectedOutput: '(0.0, 0.0)', isHidden: false, description: 'Center of screen' },
      { input: '0, 0, 800, 600', expectedOutput: '(-1.0, 1.0)', isHidden: false, description: 'Top-left corner' },
      { input: '800, 600, 800, 600', expectedOutput: '(1.0, -1.0)', isHidden: false, description: 'Bottom-right corner' },
      { input: '600, 150, 800, 600', expectedOutput: '(0.5, 0.5)', isHidden: true, description: 'Arbitrary point' }
    ],
    hints: [
      'NDC x = (2 * screen_x / width) - 1',
      'NDC y = 1 - (2 * screen_y / height)',
      'Note: y-axis is flipped in NDC',
      'Round to 3 decimal places'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex13',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Color Interpolation',
    difficulty: 4,
    description: 'Linearly interpolate between two RGB colors. Given two colors and parameter t (0-1), return the interpolated color. t=0 returns color1, t=1 returns color2.',
    starterCode: `def interpolate_color(r1, g1, b1, r2, g2, b2, t):
    """
    Linearly interpolate between two colors.

    Args:
        r1, g1, b1: First color RGB (0-255)
        r2, g2, b2: Second color RGB (0-255)
        t: Interpolation parameter (0-1)

    Returns:
        Tuple (r, g, b) of interpolated color
    """
    pass`,
    solution: `def interpolate_color(r1, g1, b1, r2, g2, b2, t):
    """
    Linearly interpolate between two colors.

    Args:
        r1, g1, b1: First color RGB (0-255)
        r2, g2, b2: Second color RGB (0-255)
        t: Interpolation parameter (0-1)

    Returns:
        Tuple (r, g, b) of interpolated color
    """
    r = int(r1 + (r2 - r1) * t)
    g = int(g1 + (g2 - g1) * t)
    b = int(b1 + (b2 - b1) * t)
    return (r, g, b)`,
    testCases: [
      { input: '0, 0, 0, 255, 255, 255, 0.5', expectedOutput: '(127, 127, 127)', isHidden: false, description: 'Black to white halfway' },
      { input: '255, 0, 0, 0, 0, 255, 0.0', expectedOutput: '(255, 0, 0)', isHidden: false, description: 't=0 returns first color' },
      { input: '255, 0, 0, 0, 0, 255, 1.0', expectedOutput: '(0, 0, 255)', isHidden: false, description: 't=1 returns second color' },
      { input: '100, 150, 200, 200, 100, 50, 0.25', expectedOutput: '(125, 137, 162)', isHidden: true, description: 'Quarter interpolation' }
    ],
    hints: [
      'Linear interpolation: value = start + (end - start) * t',
      'Apply formula to each RGB component',
      'Convert result to integer'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex14',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Aspect Ratio Correction',
    difficulty: 4,
    description: 'Calculate viewport dimensions that maintain aspect ratio when fitting a source rectangle into a target rectangle. Return (width, height) that fits inside target while preserving source aspect ratio.',
    starterCode: `def fit_aspect_ratio(src_width, src_height, target_width, target_height):
    """
    Calculate dimensions to fit source into target preserving aspect ratio.

    Args:
        src_width, src_height: Source dimensions
        target_width, target_height: Target dimensions

    Returns:
        Tuple (width, height) that fits in target
    """
    pass`,
    solution: `def fit_aspect_ratio(src_width, src_height, target_width, target_height):
    """
    Calculate dimensions to fit source into target preserving aspect ratio.

    Args:
        src_width, src_height: Source dimensions
        target_width, target_height: Target dimensions

    Returns:
        Tuple (width, height) that fits in target
    """
    src_aspect = src_width / src_height
    target_aspect = target_width / target_height

    if src_aspect > target_aspect:
        # Source is wider, fit to width
        width = target_width
        height = int(target_width / src_aspect)
    else:
        # Source is taller, fit to height
        width = int(target_height * src_aspect)
        height = target_height

    return (width, height)`,
    testCases: [
      { input: '1920, 1080, 800, 600', expectedOutput: '(800, 450)', isHidden: false, description: '16:9 to 4:3 screen' },
      { input: '800, 600, 1920, 1080', expectedOutput: '(1440, 1080)', isHidden: false, description: '4:3 to 16:9 screen' },
      { input: '1000, 1000, 800, 600', expectedOutput: '(600, 600)', isHidden: false, description: 'Square to rectangle' },
      { input: '1280, 720, 640, 480', expectedOutput: '(640, 360)', isHidden: true, description: 'Scale down maintaining 16:9' }
    ],
    hints: [
      'Calculate aspect ratios of source and target',
      'If source is wider, fit to target width',
      'If source is taller, fit to target height',
      'Preserve the source aspect ratio'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex15',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Barycentric Coordinates',
    difficulty: 5,
    description: 'Calculate barycentric coordinates of point P relative to triangle ABC. Return (u, v, w) where P = u*A + v*B + w*C and u+v+w=1. Round to 3 decimals.',
    starterCode: `def barycentric_coords(px, py, ax, ay, bx, by, cx, cy):
    """
    Calculate barycentric coordinates of point P in triangle ABC.

    Args:
        px, py: Point coordinates
        ax, ay: Vertex A coordinates
        bx, by: Vertex B coordinates
        cx, cy: Vertex C coordinates

    Returns:
        Tuple (u, v, w) of barycentric coordinates
    """
    pass`,
    solution: `def barycentric_coords(px, py, ax, ay, bx, by, cx, cy):
    """
    Calculate barycentric coordinates of point P in triangle ABC.

    Args:
        px, py: Point coordinates
        ax, ay: Vertex A coordinates
        bx, by: Vertex B coordinates
        cx, cy: Vertex C coordinates

    Returns:
        Tuple (u, v, w) of barycentric coordinates
    """
    # Vectors from A to B and A to C
    v0x, v0y = cx - ax, cy - ay
    v1x, v1y = bx - ax, by - ay
    v2x, v2y = px - ax, py - ay

    # Compute dot products
    dot00 = v0x * v0x + v0y * v0y
    dot01 = v0x * v1x + v0y * v1y
    dot02 = v0x * v2x + v0y * v2y
    dot11 = v1x * v1x + v1y * v1y
    dot12 = v1x * v2x + v1y * v2y

    # Compute barycentric coordinates
    inv_denom = 1 / (dot00 * dot11 - dot01 * dot01)
    v = (dot11 * dot02 - dot01 * dot12) * inv_denom
    w = (dot00 * dot12 - dot01 * dot02) * inv_denom
    u = 1 - v - w

    return (round(u, 3), round(v, 3), round(w, 3))`,
    testCases: [
      { input: '0, 0, 0, 0, 1, 0, 0, 1', expectedOutput: '(1.0, 0.0, 0.0)', isHidden: false, description: 'Point at vertex A' },
      { input: '0.5, 0.5, 0, 0, 1, 0, 0, 1', expectedOutput: '(0.0, 0.5, 0.5)', isHidden: false, description: 'Point on BC edge' },
      { input: '0.333, 0.333, 0, 0, 1, 0, 0, 1', expectedOutput: '(0.333, 0.333, 0.333)', isHidden: false, description: 'Centroid' },
      { input: '2, 2, 0, 0, 4, 0, 0, 4', expectedOutput: '(0.0, 0.5, 0.5)', isHidden: true, description: 'Scaled triangle' }
    ],
    hints: [
      'Use vectors from A to B, A to C, and A to P',
      'Compute dot products of these vectors',
      'Use formula: v = (dot11*dot02 - dot01*dot12) / denom',
      'w = (dot00*dot12 - dot01*dot02) / denom',
      'u = 1 - v - w'
    ],
    language: 'python'
  },
  {
    id: 'cs306-t1-ex16',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Framebuffer Clear Operation',
    difficulty: 5,
    description: 'Implement a framebuffer clear operation. Given width, height, and clear color (r,g,b), return a 1D list representing the framebuffer where each pixel is set to the clear color. Each pixel is represented as a tuple (r,g,b).',
    starterCode: `def clear_framebuffer(width, height, r, g, b):
    """
    Create a cleared framebuffer with specified color.

    Args:
        width: Framebuffer width
        height: Framebuffer height
        r, g, b: Clear color RGB (0-255)

    Returns:
        List of (r,g,b) tuples representing framebuffer
    """
    pass`,
    solution: `def clear_framebuffer(width, height, r, g, b):
    """
    Create a cleared framebuffer with specified color.

    Args:
        width: Framebuffer width
        height: Framebuffer height
        r, g, b: Clear color RGB (0-255)

    Returns:
        List of (r,g,b) tuples representing framebuffer
    """
    return [(r, g, b)] * (width * height)`,
    testCases: [
      { input: '2, 2, 255, 0, 0', expectedOutput: '[(255, 0, 0), (255, 0, 0), (255, 0, 0), (255, 0, 0)]', isHidden: false, description: '2x2 red buffer' },
      { input: '3, 1, 0, 255, 0', expectedOutput: '[(0, 255, 0), (0, 255, 0), (0, 255, 0)]', isHidden: false, description: '3x1 green buffer' },
      { input: '1, 3, 0, 0, 255', expectedOutput: '[(0, 0, 255), (0, 0, 255), (0, 0, 255)]', isHidden: false, description: '1x3 blue buffer' },
      { input: '4, 4, 128, 128, 128', expectedOutput: '[(128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128), (128, 128, 128)]', isHidden: true, description: '4x4 gray buffer' }
    ],
    hints: [
      'Total pixels = width * height',
      'Create a list with clear color tuple repeated for each pixel',
      'Can use list multiplication: [color] * count'
    ],
    language: 'python'
  }
];
