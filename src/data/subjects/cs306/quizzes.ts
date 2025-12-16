import type { Quiz, QuizQuestion } from '../../../core/types';

const questions: QuizQuestion[] = [
  // Graphics Pipeline Fundamentals - Quiz 1
  {
    id: 'cs306-q1',
    type: 'multiple_choice',
    prompt: 'What is the correct order of stages in the graphics pipeline?',
    options: [
      'Application → Geometry → Rasterization → Fragment Processing',
      'Geometry → Application → Rasterization → Fragment Processing',
      'Rasterization → Geometry → Application → Fragment Processing',
      'Fragment Processing → Geometry → Rasterization → Application'
    ],
    correctAnswer: 'Application → Geometry → Rasterization → Fragment Processing',
    explanation: 'The graphics pipeline follows a specific order: Application (CPU) prepares data, Geometry transforms vertices, Rasterization converts to fragments, and Fragment Processing determines final pixel colors.'
  },
  {
    id: 'cs306-q2',
    type: 'multiple_choice',
    prompt: 'Which stage of the graphics pipeline is primarily executed on the CPU?',
    options: [
      'Application stage',
      'Geometry stage',
      'Rasterization stage',
      'Fragment processing stage'
    ],
    correctAnswer: 'Application stage',
    explanation: 'The application stage runs on the CPU and handles tasks like collision detection, input handling, and preparing geometry data to send to the GPU.'
  },
  {
    id: 'cs306-q3',
    type: 'multiple_choice',
    prompt: 'What is the primary output of the geometry stage?',
    options: [
      'Transformed vertices in screen space',
      'Final pixel colors',
      'Texture coordinates',
      'Fragment data'
    ],
    correctAnswer: 'Transformed vertices in screen space',
    explanation: 'The geometry stage transforms vertices from object space through various coordinate systems to screen space, preparing them for rasterization.'
  },
  {
    id: 'cs306-q4',
    type: 'true_false',
    prompt: 'The rasterization stage converts geometric primitives into discrete fragments (pixels).',
    correctAnswer: 'true',
    explanation: 'Rasterization is the process of determining which pixels are covered by geometric primitives like triangles, converting continuous geometry into discrete fragments.'
  },
  {
    id: 'cs306-q5',
    type: 'multiple_choice',
    prompt: 'Which buffer stores depth information to handle visibility in 3D scenes?',
    options: [
      'Z-buffer (depth buffer)',
      'Color buffer',
      'Stencil buffer',
      'Accumulation buffer'
    ],
    correctAnswer: 'Z-buffer (depth buffer)',
    explanation: 'The Z-buffer (or depth buffer) stores depth information for each pixel, enabling proper visibility determination by keeping track of which surfaces are closest to the camera.'
  },

  // Graphics Pipeline Fundamentals - Quiz 2
  {
    id: 'cs306-q6',
    type: 'multiple_choice',
    prompt: 'What is the purpose of vertex shaders in the graphics pipeline?',
    options: [
      'Transform vertex positions and compute per-vertex attributes',
      'Determine final pixel colors',
      'Convert primitives to fragments',
      'Handle texture filtering'
    ],
    correctAnswer: 'Transform vertex positions and compute per-vertex attributes',
    explanation: 'Vertex shaders are programmable units that transform vertex positions from object space to clip space and can compute various per-vertex attributes like normals and texture coordinates.'
  },
  {
    id: 'cs306-q7',
    type: 'multiple_choice',
    prompt: 'Which primitive type is most commonly used in modern graphics rendering?',
    options: [
      'Triangles',
      'Quadrilaterals',
      'Circles',
      'Polygons'
    ],
    correctAnswer: 'Triangles',
    explanation: 'Triangles are the fundamental primitive in modern graphics because they are always planar, easy to rasterize, and can approximate any surface efficiently.'
  },
  {
    id: 'cs306-q8',
    type: 'true_false',
    prompt: 'Fragment shaders execute once per vertex in the scene.',
    correctAnswer: 'false',
    explanation: 'Fragment shaders execute once per fragment (potential pixel), not per vertex. Vertex shaders execute per vertex, while fragment shaders process the rasterized fragments.'
  },
  {
    id: 'cs306-q9',
    type: 'multiple_choice',
    prompt: 'What does the clipping stage remove from the pipeline?',
    options: [
      'Geometry outside the view frustum',
      'Hidden surfaces',
      'Transparent objects',
      'Texture coordinates'
    ],
    correctAnswer: 'Geometry outside the view frustum',
    explanation: 'Clipping removes or truncates geometry that lies outside the viewing frustum, preventing unnecessary processing of invisible primitives.'
  },
  {
    id: 'cs306-q10',
    type: 'multiple_choice',
    prompt: 'Which component is responsible for managing the final display of rendered images?',
    options: [
      'Frame buffer',
      'Vertex buffer',
      'Index buffer',
      'Uniform buffer'
    ],
    correctAnswer: 'Frame buffer',
    explanation: 'The frame buffer stores the final rendered image and is responsible for displaying the result on the screen, often using double buffering to prevent tearing.'
  },

  // Graphics Pipeline Fundamentals - Quiz 3
  {
    id: 'cs306-q11',
    type: 'multiple_choice',
    prompt: 'What is back-face culling used for?',
    options: [
      'Removing polygons facing away from the camera',
      'Removing polygons outside the view frustum',
      'Removing occluded polygons',
      'Removing transparent polygons'
    ],
    correctAnswer: 'Removing polygons facing away from the camera',
    explanation: 'Back-face culling is an optimization that removes polygons whose normals point away from the camera, typically reducing the number of polygons to render by about 50%.'
  },
  {
    id: 'cs306-q12',
    type: 'true_false',
    prompt: 'Double buffering prevents screen tearing by rendering to an off-screen buffer.',
    correctAnswer: 'true',
    explanation: 'Double buffering uses two buffers: one for display and one for rendering. When rendering completes, the buffers swap, preventing the visual artifact of screen tearing.'
  },
  {
    id: 'cs306-q13',
    type: 'multiple_choice',
    prompt: 'Which test determines if a fragment should be written to the frame buffer based on its depth value?',
    options: [
      'Depth test',
      'Stencil test',
      'Alpha test',
      'Scissor test'
    ],
    correctAnswer: 'Depth test',
    explanation: 'The depth test compares a fragment\'s depth value with the value in the depth buffer to determine visibility, writing only the closest fragments to the frame buffer.'
  },
  {
    id: 'cs306-q14',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of the viewport transformation?',
    options: [
      'Map normalized device coordinates to screen coordinates',
      'Transform world coordinates to view coordinates',
      'Apply perspective projection',
      'Perform texture mapping'
    ],
    correctAnswer: 'Map normalized device coordinates to screen coordinates',
    explanation: 'The viewport transformation converts normalized device coordinates (typically -1 to 1) to actual screen pixel coordinates based on the viewport dimensions.'
  },
  {
    id: 'cs306-q15',
    type: 'multiple_choice',
    prompt: 'Which blending operation is commonly used for transparency?',
    options: [
      'Alpha blending',
      'Additive blending',
      'Multiplicative blending',
      'Subtractive blending'
    ],
    correctAnswer: 'Alpha blending',
    explanation: 'Alpha blending combines source and destination colors based on alpha values, enabling transparency effects by blending the new fragment with the existing pixel color.'
  },

  // 2D/3D Transformations - Quiz 1
  {
    id: 'cs306-q16',
    type: 'multiple_choice',
    prompt: 'Which transformation preserves angles and lengths?',
    options: [
      'Rigid transformation',
      'Affine transformation',
      'Perspective transformation',
      'Non-uniform scaling'
    ],
    correctAnswer: 'Rigid transformation',
    explanation: 'Rigid transformations (rotation and translation) preserve both angles and lengths, maintaining the shape and size of objects. They are also called isometric transformations.'
  },
  {
    id: 'cs306-q17',
    type: 'multiple_choice',
    prompt: 'What is the size of a homogeneous transformation matrix for 3D graphics?',
    options: [
      '4x4',
      '3x3',
      '3x4',
      '4x3'
    ],
    correctAnswer: '4x4',
    explanation: 'Homogeneous coordinates use a 4x4 matrix for 3D transformations, with the extra dimension allowing translation to be represented as a matrix multiplication.'
  },
  {
    id: 'cs306-q18',
    type: 'true_false',
    prompt: 'Matrix multiplication for transformations is commutative (order doesn\'t matter).',
    correctAnswer: 'false',
    explanation: 'Matrix multiplication is not commutative. The order of transformations matters: rotating then translating produces a different result than translating then rotating.'
  },
  {
    id: 'cs306-q19',
    type: 'multiple_choice',
    prompt: 'What value is used for the w-component in homogeneous coordinates for a 3D point?',
    options: [
      '1',
      '0',
      '-1',
      'Any value'
    ],
    correctAnswer: '1',
    explanation: 'Points in homogeneous coordinates use w=1, while vectors (representing directions) use w=0. This distinction allows translation to affect points but not directions.'
  },
  {
    id: 'cs306-q20',
    type: 'multiple_choice',
    prompt: 'Which transformation changes the size of an object?',
    options: [
      'Scaling',
      'Rotation',
      'Translation',
      'Shearing'
    ],
    correctAnswer: 'Scaling',
    explanation: 'Scaling changes the size of an object by multiplying coordinates by scale factors. Uniform scaling maintains proportions, while non-uniform scaling can distort shapes.'
  },

  // 2D/3D Transformations - Quiz 2
  {
    id: 'cs306-q21',
    type: 'multiple_choice',
    prompt: 'What is the result of rotating a point 90 degrees counterclockwise around the Z-axis in 2D?',
    options: [
      '(x, y) → (-y, x)',
      '(x, y) → (y, -x)',
      '(x, y) → (-x, -y)',
      '(x, y) → (x, -y)'
    ],
    correctAnswer: '(x, y) → (-y, x)',
    explanation: 'A 90-degree counterclockwise rotation around the Z-axis transforms point (x, y) to (-y, x). This can be verified using the rotation matrix with θ=90°.'
  },
  {
    id: 'cs306-q22',
    type: 'true_false',
    prompt: 'Shearing transformation preserves areas but not angles.',
    correctAnswer: 'true',
    explanation: 'Shearing transformations preserve areas and parallel lines but change angles. They create a slanting effect, like pushing the top of a rectangle sideways.'
  },
  {
    id: 'cs306-q23',
    type: 'multiple_choice',
    prompt: 'To rotate an object around an arbitrary point P, what is the correct sequence of transformations?',
    options: [
      'Translate(-P) → Rotate → Translate(P)',
      'Rotate → Translate(-P) → Translate(P)',
      'Translate(P) → Rotate → Translate(-P)',
      'Rotate → Translate(P)'
    ],
    correctAnswer: 'Translate(-P) → Rotate → Translate(P)',
    explanation: 'To rotate around point P: first translate P to origin, perform rotation around origin, then translate back to P. This is applied right-to-left in matrix multiplication.'
  },
  {
    id: 'cs306-q24',
    type: 'multiple_choice',
    prompt: 'What is the determinant of a rotation matrix?',
    options: [
      '1',
      '0',
      '-1',
      'Depends on angle'
    ],
    correctAnswer: '1',
    explanation: 'Rotation matrices are orthogonal and have a determinant of 1, indicating they preserve volume and are orientation-preserving transformations.'
  },
  {
    id: 'cs306-q25',
    type: 'multiple_choice',
    prompt: 'Which representation avoids gimbal lock in 3D rotations?',
    options: [
      'Quaternions',
      'Euler angles',
      'Rotation matrices',
      'Axis-angle'
    ],
    correctAnswer: 'Quaternions',
    explanation: 'Quaternions provide a robust way to represent rotations without gimbal lock, which occurs with Euler angles when two rotation axes align. They also interpolate smoothly.'
  },

  // 2D/3D Transformations - Quiz 3
  {
    id: 'cs306-q26',
    type: 'multiple_choice',
    prompt: 'What type of transformation is represented by a 3x3 matrix in 2D homogeneous coordinates?',
    options: [
      'Affine transformation',
      'Perspective transformation',
      'Rigid transformation',
      'Linear transformation'
    ],
    correctAnswer: 'Affine transformation',
    explanation: 'A 3x3 matrix in 2D homogeneous coordinates represents affine transformations, which include translation, rotation, scaling, and shearing while preserving parallel lines.'
  },
  {
    id: 'cs306-q27',
    type: 'true_false',
    prompt: 'The inverse of a translation matrix T(dx, dy, dz) is T(-dx, -dy, -dz).',
    correctAnswer: 'true',
    explanation: 'The inverse of a translation is simply translating by the negative of the original displacement vector, effectively undoing the transformation.'
  },
  {
    id: 'cs306-q28',
    type: 'multiple_choice',
    prompt: 'What is the primary advantage of using homogeneous coordinates?',
    options: [
      'All transformations can be represented as matrix multiplication',
      'Faster computation',
      'Less memory usage',
      'Better numerical precision'
    ],
    correctAnswer: 'All transformations can be represented as matrix multiplication',
    explanation: 'Homogeneous coordinates allow translation to be expressed as matrix multiplication, enabling all affine transformations to be composed and applied uniformly through matrix operations.'
  },
  {
    id: 'cs306-q29',
    type: 'multiple_choice',
    prompt: 'Which transformation matrix would scale an object by factor s along all axes?',
    options: [
      'Diagonal matrix with s, s, s on diagonal',
      'Identity matrix multiplied by s',
      'Matrix with s in all entries',
      'Upper triangular matrix with s'
    ],
    correctAnswer: 'Diagonal matrix with s, s, s on diagonal',
    explanation: 'Uniform scaling is represented by a diagonal matrix with the scale factor on the diagonal (and 1 for the w component in homogeneous coordinates).'
  },
  {
    id: 'cs306-q30',
    type: 'multiple_choice',
    prompt: 'What is the result of composing a transformation matrix M with its inverse M⁻¹?',
    options: [
      'Identity matrix',
      'Zero matrix',
      'Original matrix M',
      'Transpose of M'
    ],
    correctAnswer: 'Identity matrix',
    explanation: 'By definition, multiplying a matrix by its inverse yields the identity matrix (M × M⁻¹ = I), which represents no transformation.'
  },

  // Viewing and Projection - Quiz 1
  {
    id: 'cs306-q31',
    type: 'multiple_choice',
    prompt: 'What is the view frustum in computer graphics?',
    options: [
      'The region of 3D space visible to the camera',
      'The entire 3D world space',
      'The screen coordinate system',
      'The object coordinate system'
    ],
    correctAnswer: 'The region of 3D space visible to the camera',
    explanation: 'The view frustum is a truncated pyramid defining the visible region between the near and far clipping planes, bounded by the field of view.'
  },
  {
    id: 'cs306-q32',
    type: 'multiple_choice',
    prompt: 'Which projection preserves parallel lines?',
    options: [
      'Orthographic projection',
      'Perspective projection',
      'Stereographic projection',
      'Cylindrical projection'
    ],
    correctAnswer: 'Orthographic projection',
    explanation: 'Orthographic projection is a parallel projection that preserves parallel lines and does not apply perspective foreshortening, making objects the same size regardless of distance.'
  },
  {
    id: 'cs306-q33',
    type: 'true_false',
    prompt: 'In perspective projection, objects farther from the camera appear smaller.',
    correctAnswer: 'true',
    explanation: 'Perspective projection mimics human vision by applying foreshortening: objects farther away project to smaller sizes on the image plane, creating depth perception.'
  },
  {
    id: 'cs306-q34',
    type: 'multiple_choice',
    prompt: 'What does the field of view (FOV) parameter control in perspective projection?',
    options: [
      'The angular extent of the visible scene',
      'The distance to the near plane',
      'The aspect ratio',
      'The camera position'
    ],
    correctAnswer: 'The angular extent of the visible scene',
    explanation: 'Field of view determines the angular width of the visible scene. A larger FOV shows more of the scene but with more distortion, like a wide-angle lens.'
  },
  {
    id: 'cs306-q35',
    type: 'multiple_choice',
    prompt: 'Which coordinate system has the camera at the origin looking down the negative Z-axis?',
    options: [
      'View space (camera space)',
      'World space',
      'Object space',
      'Screen space'
    ],
    correctAnswer: 'View space (camera space)',
    explanation: 'In view space (or camera space), the coordinate system is centered at the camera position, typically with the camera looking down the negative Z-axis by convention.'
  },

  // Viewing and Projection - Quiz 2
  {
    id: 'cs306-q36',
    type: 'multiple_choice',
    prompt: 'What is the purpose of the near clipping plane?',
    options: [
      'Prevent rendering objects too close to the camera',
      'Define the farthest visible distance',
      'Set the camera position',
      'Control the field of view'
    ],
    correctAnswer: 'Prevent rendering objects too close to the camera',
    explanation: 'The near clipping plane defines the closest distance at which objects are rendered. Objects closer than this are clipped, preventing numerical issues and unwanted extreme foreshortening.'
  },
  {
    id: 'cs306-q37',
    type: 'true_false',
    prompt: 'The aspect ratio is the ratio of viewport width to height.',
    correctAnswer: 'true',
    explanation: 'Aspect ratio is width divided by height, typically matching the display screen ratio (e.g., 16:9 or 4:3) to prevent distortion.'
  },
  {
    id: 'cs306-q38',
    type: 'multiple_choice',
    prompt: 'What does the look-at transformation define?',
    options: [
      'Camera position, target point, and up vector',
      'Field of view and aspect ratio',
      'Near and far clipping planes',
      'Projection type and viewport'
    ],
    correctAnswer: 'Camera position, target point, and up vector',
    explanation: 'The look-at transformation constructs the view matrix using the camera (eye) position, the target point to look at, and an up vector to define orientation.'
  },
  {
    id: 'cs306-q39',
    type: 'multiple_choice',
    prompt: 'In normalized device coordinates (NDC), what is the typical range for x, y, and z?',
    options: [
      '[-1, 1] for all axes',
      '[0, 1] for all axes',
      '[-1, 1] for x and y, [0, 1] for z',
      '[0, width] for x, [0, height] for y'
    ],
    correctAnswer: '[-1, 1] for all axes',
    explanation: 'In most graphics APIs (OpenGL convention), normalized device coordinates range from -1 to 1 for all three axes after perspective division (though some APIs use [0,1] for z).'
  },
  {
    id: 'cs306-q40',
    type: 'multiple_choice',
    prompt: 'What transformation converts from view space to clip space?',
    options: [
      'Projection matrix',
      'View matrix',
      'Model matrix',
      'Viewport transformation'
    ],
    correctAnswer: 'Projection matrix',
    explanation: 'The projection matrix transforms coordinates from view/camera space to clip space, applying either perspective or orthographic projection based on the camera settings.'
  },

  // Viewing and Projection - Quiz 3
  {
    id: 'cs306-q41',
    type: 'multiple_choice',
    prompt: 'What happens during perspective division?',
    options: [
      'Divide x, y, z by w to get normalized device coordinates',
      'Multiply coordinates by the projection matrix',
      'Transform from world to view space',
      'Apply viewport scaling'
    ],
    correctAnswer: 'Divide x, y, z by w to get normalized device coordinates',
    explanation: 'Perspective division divides the homogeneous coordinates (x, y, z) by w to convert from clip space to normalized device coordinates, creating the perspective effect.'
  },
  {
    id: 'cs306-q42',
    type: 'true_false',
    prompt: 'Orthographic projection uses the same projection matrix as perspective projection.',
    correctAnswer: 'false',
    explanation: 'Orthographic and perspective projections use different matrices. Orthographic uses a simpler matrix without perspective division (w remains 1), while perspective modifies w based on z.'
  },
  {
    id: 'cs306-q43',
    type: 'multiple_choice',
    prompt: 'Which type of projection is typically used for technical drawings and CAD applications?',
    options: [
      'Orthographic projection',
      'Perspective projection',
      'Fisheye projection',
      'Spherical projection'
    ],
    correctAnswer: 'Orthographic projection',
    explanation: 'Orthographic projection is preferred for technical drawings because it preserves measurements and parallel lines, making it easier to interpret dimensions and angles.'
  },
  {
    id: 'cs306-q44',
    type: 'multiple_choice',
    prompt: 'What is the vanishing point in perspective projection?',
    options: [
      'The point where parallel lines appear to converge',
      'The camera position',
      'The center of the screen',
      'The far clipping plane'
    ],
    correctAnswer: 'The point where parallel lines appear to converge',
    explanation: 'Vanishing points are where parallel lines in 3D space appear to converge in the 2D projection, a key characteristic of perspective projection that creates depth perception.'
  },
  {
    id: 'cs306-q45',
    type: 'multiple_choice',
    prompt: 'What is the purpose of the far clipping plane?',
    options: [
      'Define the maximum visible distance from the camera',
      'Prevent objects from getting too close',
      'Set the background color',
      'Control depth buffer precision near the camera'
    ],
    correctAnswer: 'Define the maximum visible distance from the camera',
    explanation: 'The far clipping plane sets the maximum distance for rendering. Objects beyond this distance are clipped, helping manage depth buffer precision and rendering performance.'
  },

  // Rasterization - Quiz 1
  {
    id: 'cs306-q46',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of rasterization?',
    options: [
      'Convert geometric primitives to discrete pixels/fragments',
      'Transform vertices to screen space',
      'Calculate lighting and shading',
      'Apply texture mapping'
    ],
    correctAnswer: 'Convert geometric primitives to discrete pixels/fragments',
    explanation: 'Rasterization is the process of determining which pixels are covered by geometric primitives (triangles, lines) and generating fragments for those pixels.'
  },
  {
    id: 'cs306-q47',
    type: 'multiple_choice',
    prompt: 'Which algorithm is commonly used for line rasterization?',
    options: [
      'Bresenham\'s algorithm',
      'Depth-first search',
      'Quick sort',
      'Binary search'
    ],
    correctAnswer: 'Bresenham\'s algorithm',
    explanation: 'Bresenham\'s algorithm efficiently rasterizes lines using only integer arithmetic and addition, making it fast for determining which pixels to draw along a line.'
  },
  {
    id: 'cs306-q48',
    type: 'true_false',
    prompt: 'Barycentric coordinates are used to interpolate attributes across a triangle.',
    correctAnswer: 'true',
    explanation: 'Barycentric coordinates express a point as a weighted combination of triangle vertices, enabling smooth interpolation of colors, normals, and texture coordinates across the triangle.'
  },
  {
    id: 'cs306-q49',
    type: 'multiple_choice',
    prompt: 'What is anti-aliasing used for in rasterization?',
    options: [
      'Reduce jagged edges and staircase effects',
      'Improve rendering speed',
      'Increase color depth',
      'Enhance texture quality'
    ],
    correctAnswer: 'Reduce jagged edges and staircase effects',
    explanation: 'Anti-aliasing smooths jagged edges (aliasing artifacts) that occur when representing continuous lines and shapes with discrete pixels, improving visual quality.'
  },
  {
    id: 'cs306-q50',
    type: 'multiple_choice',
    prompt: 'In triangle rasterization, what does the edge function test determine?',
    options: [
      'Whether a point is inside or outside the triangle',
      'The depth of a fragment',
      'The color of a pixel',
      'The texture coordinate'
    ],
    correctAnswer: 'Whether a point is inside or outside the triangle',
    explanation: 'The edge function evaluates which side of an edge a point lies on. A point is inside the triangle if it\'s on the correct side of all three edges.'
  },

  // Rasterization - Quiz 2
  {
    id: 'cs306-q51',
    type: 'multiple_choice',
    prompt: 'What is supersampling (SSAA) anti-aliasing?',
    options: [
      'Rendering at higher resolution then downsampling',
      'Sampling only edge pixels',
      'Using multiple rendering passes',
      'Blurring the final image'
    ],
    correctAnswer: 'Rendering at higher resolution then downsampling',
    explanation: 'Supersampling renders the scene at a higher resolution (e.g., 2x or 4x) and then averages down to the target resolution, effectively sampling multiple points per pixel for smoother edges.'
  },
  {
    id: 'cs306-q52',
    type: 'true_false',
    prompt: 'Scanline rasterization processes one horizontal row of pixels at a time.',
    correctAnswer: 'true',
    explanation: 'Scanline rasterization works row by row (scanline by scanline), determining which primitives intersect each row and filling the appropriate pixels, which is cache-friendly.'
  },
  {
    id: 'cs306-q53',
    type: 'multiple_choice',
    prompt: 'What coordinate system do barycentric coordinates (α, β, γ) satisfy?',
    options: [
      'α + β + γ = 1',
      'α² + β² + γ² = 1',
      'α × β × γ = 1',
      'α - β + γ = 0'
    ],
    correctAnswer: 'α + β + γ = 1',
    explanation: 'Barycentric coordinates sum to 1, where each coordinate represents the weight of the corresponding vertex. A point is inside the triangle when all three are between 0 and 1.'
  },
  {
    id: 'cs306-q54',
    type: 'multiple_choice',
    prompt: 'What is MSAA (Multi-Sample Anti-Aliasing)?',
    options: [
      'Sampling coverage at multiple points per pixel but shading once',
      'Rendering the scene multiple times',
      'Sampling and shading multiple times per pixel',
      'Post-processing blur filter'
    ],
    correctAnswer: 'Sampling coverage at multiple points per pixel but shading once',
    explanation: 'MSAA samples geometric coverage at multiple sub-pixel locations but runs the pixel shader only once per pixel, making it more efficient than SSAA while still reducing edge aliasing.'
  },
  {
    id: 'cs306-q55',
    type: 'multiple_choice',
    prompt: 'What is the fill convention in triangle rasterization?',
    options: [
      'Rules for which pixels to fill when a triangle edge passes exactly through pixel centers',
      'The order in which triangles are filled',
      'The color used to fill triangles',
      'The pattern used for texture filling'
    ],
    correctAnswer: 'Rules for which pixels to fill when a triangle edge passes exactly through pixel centers',
    explanation: 'Fill conventions (like top-left rule) determine which pixels to rasterize when edges pass exactly through pixel centers, ensuring consistent results and preventing gaps or overlaps between adjacent triangles.'
  },

  // Rasterization - Quiz 3
  {
    id: 'cs306-q56',
    type: 'multiple_choice',
    prompt: 'What is perspective-correct interpolation used for?',
    options: [
      'Correctly interpolating attributes in screen space accounting for depth',
      'Faster rasterization',
      'Anti-aliasing',
      'Depth buffer optimization'
    ],
    correctAnswer: 'Correctly interpolating attributes in screen space accounting for depth',
    explanation: 'Perspective-correct interpolation accounts for perspective division by interpolating in 3D space rather than 2D screen space, preventing distortion in texture coordinates and other attributes.'
  },
  {
    id: 'cs306-q57',
    type: 'true_false',
    prompt: 'The painter\'s algorithm renders objects from back to front.',
    correctAnswer: 'true',
    explanation: 'The painter\'s algorithm sorts objects by depth and renders from farthest to nearest (back to front), with nearer objects overwriting farther ones, like a painter working on a canvas.'
  },
  {
    id: 'cs306-q58',
    type: 'multiple_choice',
    prompt: 'What is a fragment in the graphics pipeline?',
    options: [
      'A pixel-sized piece of a primitive with associated data',
      'A broken triangle',
      'A vertex after transformation',
      'A texture sample'
    ],
    correctAnswer: 'A pixel-sized piece of a primitive with associated data',
    explanation: 'A fragment is the rasterizer\'s output: a potential pixel with interpolated attributes (color, depth, texture coordinates) that will be processed by the fragment shader.'
  },
  {
    id: 'cs306-q59',
    type: 'multiple_choice',
    prompt: 'Which anti-aliasing technique analyzes the final image to smooth edges?',
    options: [
      'FXAA (Fast Approximate Anti-Aliasing)',
      'SSAA (Supersampling)',
      'MSAA (Multi-Sample Anti-Aliasing)',
      'CSAA (Coverage Sampling Anti-Aliasing)'
    ],
    correctAnswer: 'FXAA (Fast Approximate Anti-Aliasing)',
    explanation: 'FXAA is a post-processing technique that analyzes the rendered image to detect and smooth edges using a shader, making it very fast but potentially less accurate than sampling-based methods.'
  },
  {
    id: 'cs306-q60',
    type: 'multiple_choice',
    prompt: 'What is the purpose of early Z-testing (early depth testing)?',
    options: [
      'Discard fragments before expensive shader execution',
      'Improve anti-aliasing',
      'Speed up vertex processing',
      'Enhance texture filtering'
    ],
    correctAnswer: 'Discard fragments before expensive shader execution',
    explanation: 'Early Z-testing performs the depth test before fragment shading, discarding occluded fragments early to avoid unnecessary pixel shader execution, significantly improving performance.'
  },

  // Shading and Lighting - Quiz 1
  {
    id: 'cs306-q61',
    type: 'multiple_choice',
    prompt: 'Which shading model uses ambient, diffuse, and specular components?',
    options: [
      'Phong reflection model',
      'Flat shading',
      'Cook-Torrance model',
      'Toon shading'
    ],
    correctAnswer: 'Phong reflection model',
    explanation: 'The Phong reflection model computes lighting as the sum of ambient (uniform background), diffuse (matte reflection), and specular (shiny highlights) components.'
  },
  {
    id: 'cs306-q62',
    type: 'multiple_choice',
    prompt: 'What does the diffuse component of lighting represent?',
    options: [
      'Matte, view-independent reflection',
      'Shiny highlights',
      'Background illumination',
      'Emitted light'
    ],
    correctAnswer: 'Matte, view-independent reflection',
    explanation: 'Diffuse reflection represents light scattering equally in all directions from a matte surface, depending only on the angle between the surface normal and light direction (Lambertian reflection).'
  },
  {
    id: 'cs306-q63',
    type: 'true_false',
    prompt: 'Flat shading computes one color per triangle using the face normal.',
    correctAnswer: 'true',
    explanation: 'Flat shading calculates lighting once per triangle using the face normal, resulting in a faceted appearance where each triangle has a uniform color.'
  },
  {
    id: 'cs306-q64',
    type: 'multiple_choice',
    prompt: 'What is the formula for Lambertian (diffuse) reflection?',
    options: [
      'I = kd × (N · L)',
      'I = ks × (R · V)ⁿ',
      'I = ka × Ia',
      'I = N × L × V'
    ],
    correctAnswer: 'I = kd × (N · L)',
    explanation: 'Lambertian diffuse reflection is proportional to the cosine of the angle between the surface normal (N) and light direction (L), expressed as their dot product, scaled by the diffuse coefficient kd.'
  },
  {
    id: 'cs306-q65',
    type: 'multiple_choice',
    prompt: 'What determines the size of specular highlights in the Phong model?',
    options: [
      'The shininess exponent',
      'The light intensity',
      'The ambient coefficient',
      'The surface color'
    ],
    correctAnswer: 'The shininess exponent',
    explanation: 'The shininess exponent (n) in the specular term (R·V)ⁿ controls highlight size: larger values create smaller, sharper highlights characteristic of very shiny surfaces.'
  },

  // Shading and Lighting - Quiz 2
  {
    id: 'cs306-q66',
    type: 'multiple_choice',
    prompt: 'What is the difference between Phong shading and Gouraud shading?',
    options: [
      'Phong interpolates normals, Gouraud interpolates colors',
      'Phong is faster than Gouraud',
      'Phong uses flat shading, Gouraud uses smooth shading',
      'They are the same technique'
    ],
    correctAnswer: 'Phong interpolates normals, Gouraud interpolates colors',
    explanation: 'Gouraud shading computes lighting at vertices and interpolates colors across triangles. Phong shading interpolates normals and computes lighting per pixel, producing better specular highlights.'
  },
  {
    id: 'cs306-q67',
    type: 'true_false',
    prompt: 'Normal mapping allows surfaces to appear more detailed without adding geometry.',
    correctAnswer: 'true',
    explanation: 'Normal mapping stores surface normal perturbations in a texture, allowing flat geometry to appear to have detailed surface features by modifying lighting calculations per pixel.'
  },
  {
    id: 'cs306-q68',
    type: 'multiple_choice',
    prompt: 'What is the Blinn-Phong model\'s main advantage over Phong?',
    options: [
      'Uses halfway vector, more efficient and physically plausible',
      'Produces more accurate ambient lighting',
      'Better diffuse reflection',
      'Faster ambient occlusion'
    ],
    correctAnswer: 'Uses halfway vector, more efficient and physically plausible',
    explanation: 'Blinn-Phong uses the halfway vector between light and view directions instead of the reflection vector, reducing computation and behaving more like real materials at grazing angles.'
  },
  {
    id: 'cs306-q69',
    type: 'multiple_choice',
    prompt: 'What does attenuation model in lighting?',
    options: [
      'Light intensity decreasing with distance',
      'Surface roughness',
      'Shadow darkness',
      'Color saturation'
    ],
    correctAnswer: 'Light intensity decreasing with distance',
    explanation: 'Attenuation models how light intensity decreases with distance from the source, typically using a quadratic falloff (1/(a + b×d + c×d²)) to approximate physical light behavior.'
  },
  {
    id: 'cs306-q70',
    type: 'multiple_choice',
    prompt: 'Which lighting technique evaluates illumination only at vertices?',
    options: [
      'Gouraud shading',
      'Phong shading',
      'Deferred shading',
      'Ray tracing'
    ],
    correctAnswer: 'Gouraud shading',
    explanation: 'Gouraud shading computes lighting at triangle vertices and interpolates the resulting colors across the surface, making it faster but less accurate than per-pixel lighting.'
  },

  // Shading and Lighting - Quiz 3
  {
    id: 'cs306-q71',
    type: 'multiple_choice',
    prompt: 'What is ambient occlusion?',
    options: [
      'Approximation of how exposed each point is to ambient lighting',
      'Direct shadow computation',
      'Specular reflection calculation',
      'Texture filtering method'
    ],
    correctAnswer: 'Approximation of how exposed each point is to ambient lighting',
    explanation: 'Ambient occlusion estimates how much ambient light reaches each surface point, darkening crevices and contact areas to add depth and realism without expensive global illumination.'
  },
  {
    id: 'cs306-q72',
    type: 'true_false',
    prompt: 'Physically Based Rendering (PBR) aims to model light interaction based on physical principles.',
    correctAnswer: 'true',
    explanation: 'PBR uses physically-based material properties (albedo, metalness, roughness) and energy conservation principles to achieve realistic rendering that behaves consistently under different lighting conditions.'
  },
  {
    id: 'cs306-q73',
    type: 'multiple_choice',
    prompt: 'What does the Fresnel effect describe?',
    options: [
      'Reflectivity changing with viewing angle',
      'Light scattering in fog',
      'Color shift with distance',
      'Shadow softness'
    ],
    correctAnswer: 'Reflectivity changing with viewing angle',
    explanation: 'The Fresnel effect describes how reflectivity increases at grazing angles. Looking straight at water shows less reflection than viewing it at a shallow angle, where it becomes mirror-like.'
  },
  {
    id: 'cs306-q74',
    type: 'multiple_choice',
    prompt: 'What is the purpose of a BRDF (Bidirectional Reflectance Distribution Function)?',
    options: [
      'Describe how light reflects off a surface from different angles',
      'Calculate shadow intensity',
      'Determine texture coordinates',
      'Compute vertex positions'
    ],
    correctAnswer: 'Describe how light reflects off a surface from different angles',
    explanation: 'A BRDF defines the ratio of reflected light for any pair of incoming and outgoing directions, characterizing surface appearance. Different BRDFs model materials like plastic, metal, or skin.'
  },
  {
    id: 'cs306-q75',
    type: 'multiple_choice',
    prompt: 'Which technique stores geometric and material information in textures for later lighting?',
    options: [
      'Deferred shading',
      'Forward rendering',
      'Flat shading',
      'Gouraud shading'
    ],
    correctAnswer: 'Deferred shading',
    explanation: 'Deferred shading renders geometry to a G-buffer (storing position, normal, albedo, etc.) then applies lighting in a second pass, efficiently handling many lights by processing each visible pixel once.'
  },

  // Texture Mapping - Quiz 1
  {
    id: 'cs306-q76',
    type: 'multiple_choice',
    prompt: 'What are texture coordinates typically called?',
    options: [
      'UV coordinates',
      'XY coordinates',
      'ST coordinates',
      'RGB coordinates'
    ],
    correctAnswer: 'UV coordinates',
    explanation: 'Texture coordinates are commonly called UV coordinates (u, v), representing 2D positions in texture space, typically normalized to [0,1] range, distinct from spatial XYZ coordinates.'
  },
  {
    id: 'cs306-q77',
    type: 'multiple_choice',
    prompt: 'What is texture filtering used for?',
    options: [
      'Determine color when texture coordinates fall between pixels',
      'Compress texture data',
      'Apply lighting to textures',
      'Generate texture coordinates'
    ],
    correctAnswer: 'Determine color when texture coordinates fall between pixels',
    explanation: 'Texture filtering (magnification and minification) determines how to sample textures when UVs don\'t align with texel centers, using methods like nearest neighbor, bilinear, or trilinear filtering.'
  },
  {
    id: 'cs306-q78',
    type: 'true_false',
    prompt: 'Mipmapping uses a pyramid of progressively smaller texture versions to improve performance and quality.',
    correctAnswer: 'true',
    explanation: 'Mipmaps are pre-filtered texture chains at different resolutions (each level half the size). They improve performance by reducing cache misses and quality by preventing aliasing when textures are viewed from far away.'
  },
  {
    id: 'cs306-q79',
    type: 'multiple_choice',
    prompt: 'What does bilinear filtering do?',
    options: [
      'Interpolates between the four nearest texels',
      'Uses the closest texel only',
      'Blends two mipmap levels',
      'Applies anisotropic sampling'
    ],
    correctAnswer: 'Interpolates between the four nearest texels',
    explanation: 'Bilinear filtering performs linear interpolation in both texture dimensions, blending the four nearest texels to produce smooth results when magnifying or minifying textures.'
  },
  {
    id: 'cs306-q80',
    type: 'multiple_choice',
    prompt: 'What wrapping mode repeats a texture infinitely?',
    options: [
      'Repeat (or Wrap)',
      'Clamp',
      'Mirror',
      'Border'
    ],
    correctAnswer: 'Repeat (or Wrap)',
    explanation: 'Repeat/Wrap mode tiles the texture by using the fractional part of UV coordinates, allowing textures to repeat seamlessly across surfaces, useful for patterns like brick walls or grass.'
  },

  // Texture Mapping - Quiz 2
  {
    id: 'cs306-q81',
    type: 'multiple_choice',
    prompt: 'What is trilinear filtering?',
    options: [
      'Bilinear filtering on two mipmap levels then blending between them',
      'Filtering in three color channels',
      'Sampling three texels',
      'Three-dimensional texture lookup'
    ],
    correctAnswer: 'Bilinear filtering on two mipmap levels then blending between them',
    explanation: 'Trilinear filtering performs bilinear filtering on the two nearest mipmap levels, then linearly interpolates between those results based on distance, eliminating visible mipmap transitions.'
  },
  {
    id: 'cs306-q82',
    type: 'true_false',
    prompt: 'Anisotropic filtering provides better quality for textures viewed at oblique angles.',
    correctAnswer: 'true',
    explanation: 'Anisotropic filtering samples along the direction of maximum texture distortion rather than using square regions, dramatically improving quality for surfaces viewed at steep angles like roads receding into distance.'
  },
  {
    id: 'cs306-q83',
    type: 'multiple_choice',
    prompt: 'What is a normal map?',
    options: [
      'Texture storing surface normal directions as RGB values',
      'Texture storing height information',
      'Texture for color mapping',
      'Texture for transparency'
    ],
    correctAnswer: 'Texture storing surface normal directions as RGB values',
    explanation: 'Normal maps encode surface normal vectors as RGB colors (R=X, G=Y, B=Z), allowing per-pixel lighting detail on low-polygon meshes by perturbing surface normals during shading.'
  },
  {
    id: 'cs306-q84',
    type: 'multiple_choice',
    prompt: 'What does the clamp wrapping mode do?',
    options: [
      'Clamps UV coordinates to [0,1] range',
      'Repeats the texture',
      'Mirrors the texture',
      'Uses a specified border color'
    ],
    correctAnswer: 'Clamps UV coordinates to [0,1] range',
    explanation: 'Clamp mode restricts UV coordinates to [0,1], extending edge pixels infinitely beyond the texture boundary. UVs outside this range sample the nearest edge texel.'
  },
  {
    id: 'cs306-q85',
    type: 'multiple_choice',
    prompt: 'What is displacement mapping?',
    options: [
      'Modifying vertex positions based on a texture',
      'Changing surface colors',
      'Adjusting texture coordinates',
      'Filtering texture samples'
    ],
    correctAnswer: 'Modifying vertex positions based on a texture',
    explanation: 'Displacement mapping actually moves vertex positions based on a heightmap texture, creating real geometric detail. Unlike normal mapping, it changes the silhouette and can produce self-shadowing.'
  },

  // Texture Mapping - Quiz 3
  {
    id: 'cs306-q86',
    type: 'multiple_choice',
    prompt: 'What is a cube map used for?',
    options: [
      'Environment mapping and reflections',
      'Terrain height mapping',
      'Character skin textures',
      'UI elements'
    ],
    correctAnswer: 'Environment mapping and reflections',
    explanation: 'Cube maps consist of six square textures forming a cube around a point, used for environment mapping, reflections, and skyboxes. They\'re sampled using 3D direction vectors.'
  },
  {
    id: 'cs306-q87',
    type: 'true_false',
    prompt: 'Parallax mapping creates the illusion of depth without adding geometry.',
    correctAnswer: 'true',
    explanation: 'Parallax mapping offsets texture coordinates based on view angle and a height map, creating the illusion of surface depth and parallax motion without modifying geometry, more convincing than normal mapping alone.'
  },
  {
    id: 'cs306-q88',
    type: 'multiple_choice',
    prompt: 'What is texture atlas used for?',
    options: [
      'Combining multiple textures into a single large texture',
      'Generating mipmaps',
      'Filtering textures',
      'Compressing texture data'
    ],
    correctAnswer: 'Combining multiple textures into a single large texture',
    explanation: 'A texture atlas packs multiple smaller textures into one large texture, reducing draw calls and texture binding overhead. Each sub-texture is accessed via specific UV coordinate ranges.'
  },
  {
    id: 'cs306-q89',
    type: 'multiple_choice',
    prompt: 'What does a specular map define?',
    options: [
      'Per-pixel shininess or reflectivity',
      'Surface height variation',
      'Texture coordinates',
      'Light positions'
    ],
    correctAnswer: 'Per-pixel shininess or reflectivity',
    explanation: 'Specular maps control the intensity and potentially color of specular highlights on a per-pixel basis, allowing different parts of a surface to have varying shininess (e.g., worn vs. polished metal).'
  },
  {
    id: 'cs306-q90',
    type: 'multiple_choice',
    prompt: 'What is the primary advantage of texture compression?',
    options: [
      'Reduced memory usage and bandwidth',
      'Better visual quality',
      'Faster texture creation',
      'Simplified UV mapping'
    ],
    correctAnswer: 'Reduced memory usage and bandwidth',
    explanation: 'Texture compression (like DXT/BC, ASTC) significantly reduces memory footprint and bandwidth usage, crucial for GPU performance. Modern formats can decompress on-the-fly with minimal quality loss.'
  },

  // Ray Tracing and Global Illumination - Quiz 1
  {
    id: 'cs306-q91',
    type: 'multiple_choice',
    prompt: 'What is the fundamental concept of ray tracing?',
    options: [
      'Tracing light rays from the camera through pixels into the scene',
      'Rasterizing triangles into pixels',
      'Computing vertex positions',
      'Applying texture filtering'
    ],
    correctAnswer: 'Tracing light rays from the camera through pixels into the scene',
    explanation: 'Ray tracing shoots rays from the camera through each pixel to determine what is visible, testing for intersections with scene geometry and recursively tracing reflection and refraction rays.'
  },
  {
    id: 'cs306-q92',
    type: 'multiple_choice',
    prompt: 'What acceleration structure is commonly used in ray tracing?',
    options: [
      'BVH (Bounding Volume Hierarchy)',
      'Hash table',
      'Linked list',
      'Array'
    ],
    correctAnswer: 'BVH (Bounding Volume Hierarchy)',
    explanation: 'BVH organizes geometry into a tree of bounding volumes, allowing ray tracers to quickly skip large portions of the scene that a ray doesn\'t intersect, dramatically reducing intersection tests.'
  },
  {
    id: 'cs306-q93',
    type: 'true_false',
    prompt: 'Ray tracing naturally handles shadows, reflections, and refractions.',
    correctAnswer: 'true',
    explanation: 'Ray tracing inherently supports these effects: shadow rays test occlusion, reflection rays bounce off surfaces following the law of reflection, and refraction rays bend according to Snell\'s law.'
  },
  {
    id: 'cs306-q94',
    type: 'multiple_choice',
    prompt: 'What is a primary ray in ray tracing?',
    options: [
      'Ray shot from the camera through a pixel',
      'Ray from a light source',
      'Ray after reflection',
      'Ray testing for shadows'
    ],
    correctAnswer: 'Ray shot from the camera through a pixel',
    explanation: 'Primary rays (or eye rays) are the initial rays cast from the camera position through each pixel into the scene to determine what is visible at that pixel.'
  },
  {
    id: 'cs306-q95',
    type: 'multiple_choice',
    prompt: 'What is the purpose of shadow rays?',
    options: [
      'Test if a point is occluded from a light source',
      'Trace reflections',
      'Calculate refraction',
      'Determine camera visibility'
    ],
    correctAnswer: 'Test if a point is occluded from a light source',
    explanation: 'Shadow rays are cast from a surface point toward each light source to determine if the point is in shadow (occluded) or directly illuminated, enabling accurate shadow rendering.'
  },

  // Ray Tracing and Global Illumination - Quiz 2
  {
    id: 'cs306-q96',
    type: 'multiple_choice',
    prompt: 'What is path tracing?',
    options: [
      'Monte Carlo ray tracing that simulates global illumination',
      'Drawing paths between objects',
      'Optimizing ray traversal',
      'Texture mapping technique'
    ],
    correctAnswer: 'Monte Carlo ray tracing that simulates global illumination',
    explanation: 'Path tracing extends ray tracing by randomly sampling indirect lighting paths, simulating complex light transport including color bleeding, caustics, and soft shadows for physically accurate global illumination.'
  },
  {
    id: 'cs306-q97',
    type: 'true_false',
    prompt: 'Global illumination accounts for indirect lighting bouncing between surfaces.',
    correctAnswer: 'true',
    explanation: 'Global illumination simulates light bouncing multiple times between surfaces, capturing indirect lighting effects like color bleeding and soft ambient lighting that make scenes appear more realistic.'
  },
  {
    id: 'cs306-q98',
    type: 'multiple_choice',
    prompt: 'What is the rendering equation?',
    options: [
      'Fundamental equation describing light transport in a scene',
      'Equation for texture mapping',
      'Formula for vertex transformation',
      'Algorithm for rasterization'
    ],
    correctAnswer: 'Fundamental equation describing light transport in a scene',
    explanation: 'The rendering equation (Kajiya) mathematically describes how light reflects off surfaces, integrating incoming light from all directions weighted by the BRDF. It\'s the theoretical foundation of global illumination.'
  },
  {
    id: 'cs306-q99',
    type: 'multiple_choice',
    prompt: 'What are caustics in rendering?',
    options: [
      'Focused light patterns from reflection or refraction',
      'Shadow artifacts',
      'Texture distortions',
      'Rendering errors'
    ],
    correctAnswer: 'Focused light patterns from reflection or refraction',
    explanation: 'Caustics are bright patterns created when light is focused by reflection (like light on the bottom of a pool) or refraction (through glass), requiring advanced techniques like photon mapping to render.'
  },
  {
    id: 'cs306-q100',
    type: 'multiple_choice',
    prompt: 'What is photon mapping?',
    options: [
      'Two-pass technique storing and using photon positions for indirect lighting',
      'High-resolution texture mapping',
      'Direct lighting calculation',
      'Shadow mapping method'
    ],
    correctAnswer: 'Two-pass technique storing and using photon positions for indirect lighting',
    explanation: 'Photon mapping traces photons from lights into the scene, stores them at surface intersections, then uses this photon map during rendering to approximate indirect illumination and caustics efficiently.'
  },

  // Ray Tracing and Global Illumination - Quiz 3
  {
    id: 'cs306-q101',
    type: 'multiple_choice',
    prompt: 'What is importance sampling in path tracing?',
    options: [
      'Sampling directions based on their contribution to reduce noise',
      'Sampling all directions equally',
      'Sampling only direct lighting',
      'Random sampling without weights'
    ],
    correctAnswer: 'Sampling directions based on their contribution to reduce noise',
    explanation: 'Importance sampling concentrates samples in directions that contribute most to the final result (e.g., toward lights or specular directions), reducing noise and converging faster than uniform random sampling.'
  },
  {
    id: 'cs306-q102',
    type: 'true_false',
    prompt: 'Ambient occlusion can be computed using ray tracing by sampling hemisphere visibility.',
    correctAnswer: 'true',
    explanation: 'Ray-traced ambient occlusion shoots rays in random directions over the hemisphere to measure how occluded a point is, with more rays hitting nearby geometry resulting in darker shading.'
  },
  {
    id: 'cs306-q103',
    type: 'multiple_choice',
    prompt: 'What is Russian Roulette in path tracing?',
    options: [
      'Probabilistic ray termination to limit bounce depth',
      'Random light selection',
      'Texture sampling method',
      'Anti-aliasing technique'
    ],
    correctAnswer: 'Probabilistic ray termination to limit bounce depth',
    explanation: 'Russian Roulette randomly terminates ray paths with probability based on energy, unbiasing the estimator while limiting recursion depth. Paths are weighted by survival probability to maintain correctness.'
  },
  {
    id: 'cs306-q104',
    type: 'multiple_choice',
    prompt: 'What is radiosity?',
    options: [
      'Finite element method for diffuse global illumination',
      'Direct lighting calculation',
      'Texture mapping technique',
      'Shadow rendering algorithm'
    ],
    correctAnswer: 'Finite element method for diffuse global illumination',
    explanation: 'Radiosity divides surfaces into patches and solves for equilibrium light distribution considering diffuse inter-reflections. It\'s view-independent and excels at architectural scenes with diffuse surfaces.'
  },
  {
    id: 'cs306-q105',
    type: 'multiple_choice',
    prompt: 'What is the main challenge of real-time ray tracing?',
    options: [
      'High computational cost requiring hardware acceleration',
      'Lack of accuracy',
      'Cannot handle transparency',
      'Poor shadow quality'
    ],
    correctAnswer: 'High computational cost requiring hardware acceleration',
    explanation: 'Ray tracing is computationally expensive, requiring millions of ray-geometry intersection tests per frame. Modern GPUs use dedicated RT cores and denoising to make real-time ray tracing feasible.'
  }
];

// Helper to get questions by IDs
const getQuestions = (ids: string[]): QuizQuestion[] =>
  ids.map(id => questions.find(q => q.id === id)!).filter(Boolean);

export const cs306Quizzes: Quiz[] = [
  {
    id: 'cs306-quiz-1-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Graphics Pipeline Basics',
    questions: getQuestions(['cs306-q1', 'cs306-q2', 'cs306-q3', 'cs306-q4', 'cs306-q5'])
  },
  {
    id: 'cs306-quiz-1-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Shaders and Primitives',
    questions: getQuestions(['cs306-q6', 'cs306-q7', 'cs306-q8', 'cs306-q9', 'cs306-q10'])
  },
  {
    id: 'cs306-quiz-1-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-1',
    title: 'Pipeline Optimization',
    questions: getQuestions(['cs306-q11', 'cs306-q12', 'cs306-q13', 'cs306-q14', 'cs306-q15'])
  },
  {
    id: 'cs306-quiz-2-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Transformation Fundamentals',
    questions: getQuestions(['cs306-q16', 'cs306-q17', 'cs306-q18', 'cs306-q19', 'cs306-q20'])
  },
  {
    id: 'cs306-quiz-2-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Rotation and Composition',
    questions: getQuestions(['cs306-q21', 'cs306-q22', 'cs306-q23', 'cs306-q24', 'cs306-q25'])
  },
  {
    id: 'cs306-quiz-2-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-2',
    title: 'Advanced Transformations',
    questions: getQuestions(['cs306-q26', 'cs306-q27', 'cs306-q28', 'cs306-q29', 'cs306-q30'])
  },
  {
    id: 'cs306-quiz-3-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Projection Basics',
    questions: getQuestions(['cs306-q31', 'cs306-q32', 'cs306-q33', 'cs306-q34', 'cs306-q35'])
  },
  {
    id: 'cs306-quiz-3-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Camera and Clipping',
    questions: getQuestions(['cs306-q36', 'cs306-q37', 'cs306-q38', 'cs306-q39', 'cs306-q40'])
  },
  {
    id: 'cs306-quiz-3-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-3',
    title: 'Projection Systems',
    questions: getQuestions(['cs306-q41', 'cs306-q42', 'cs306-q43', 'cs306-q44', 'cs306-q45'])
  },
  {
    id: 'cs306-quiz-4-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Rasterization Fundamentals',
    questions: getQuestions(['cs306-q46', 'cs306-q47', 'cs306-q48', 'cs306-q49', 'cs306-q50'])
  },
  {
    id: 'cs306-quiz-4-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Anti-Aliasing and Scanlines',
    questions: getQuestions(['cs306-q51', 'cs306-q52', 'cs306-q53', 'cs306-q54', 'cs306-q55'])
  },
  {
    id: 'cs306-quiz-4-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-4',
    title: 'Advanced Rasterization',
    questions: getQuestions(['cs306-q56', 'cs306-q57', 'cs306-q58', 'cs306-q59', 'cs306-q60'])
  },
  {
    id: 'cs306-quiz-5-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Lighting Models',
    questions: getQuestions(['cs306-q61', 'cs306-q62', 'cs306-q63', 'cs306-q64', 'cs306-q65'])
  },
  {
    id: 'cs306-quiz-5-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Shading Techniques',
    questions: getQuestions(['cs306-q66', 'cs306-q67', 'cs306-q68', 'cs306-q69', 'cs306-q70'])
  },
  {
    id: 'cs306-quiz-5-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-5',
    title: 'Advanced Shading',
    questions: getQuestions(['cs306-q71', 'cs306-q72', 'cs306-q73', 'cs306-q74', 'cs306-q75'])
  },
  {
    id: 'cs306-quiz-6-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Texture Basics',
    questions: getQuestions(['cs306-q76', 'cs306-q77', 'cs306-q78', 'cs306-q79', 'cs306-q80'])
  },
  {
    id: 'cs306-quiz-6-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Filtering and Mapping',
    questions: getQuestions(['cs306-q81', 'cs306-q82', 'cs306-q83', 'cs306-q84', 'cs306-q85'])
  },
  {
    id: 'cs306-quiz-6-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-6',
    title: 'Advanced Texturing',
    questions: getQuestions(['cs306-q86', 'cs306-q87', 'cs306-q88', 'cs306-q89', 'cs306-q90'])
  },
  {
    id: 'cs306-quiz-7-1',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Ray Tracing Basics',
    questions: getQuestions(['cs306-q91', 'cs306-q92', 'cs306-q93', 'cs306-q94', 'cs306-q95'])
  },
  {
    id: 'cs306-quiz-7-2',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Global Illumination',
    questions: getQuestions(['cs306-q96', 'cs306-q97', 'cs306-q98', 'cs306-q99', 'cs306-q100'])
  },
  {
    id: 'cs306-quiz-7-3',
    subjectId: 'cs306',
    topicId: 'cs306-topic-7',
    title: 'Advanced Ray Tracing',
    questions: getQuestions(['cs306-q101', 'cs306-q102', 'cs306-q103', 'cs306-q104', 'cs306-q105'])
  }
];
