import type { Exam, QuizQuestion } from '../../../core/types';

const midtermQuestions: QuizQuestion[] = [
  // Graphics Pipeline
  {
    id: 'cs306-mid-q1',
    type: 'multiple_choice',
    prompt: 'What is the correct order of stages in the graphics rendering pipeline?',
    options: [
      'Vertex Processing → Rasterization → Fragment Processing → Output Merging',
      'Rasterization → Vertex Processing → Fragment Processing → Output Merging',
      'Vertex Processing → Fragment Processing → Rasterization → Output Merging',
      'Fragment Processing → Vertex Processing → Rasterization → Output Merging'
    ],
    correctAnswer: 'Vertex Processing → Rasterization → Fragment Processing → Output Merging',
    explanation: 'The graphics pipeline processes vertices first, converts them to fragments through rasterization, processes each fragment, and finally merges the output to the framebuffer.'
  },
  {
    id: 'cs306-mid-q2',
    type: 'multiple_choice',
    prompt: 'Which coordinate system is typically used immediately after model transformations?',
    options: [
      'World space',
      'View space',
      'Clip space',
      'Screen space'
    ],
    correctAnswer: 'World space',
    explanation: 'After model transformations, vertices are in world space. They then undergo view transformation to camera space, projection to clip space, and finally viewport transformation to screen space.'
  },
  {
    id: 'cs306-mid-q3',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of the vertex shader in modern graphics pipelines?',
    options: [
      'To determine pixel colors',
      'To transform vertex positions and attributes',
      'To perform texture sampling',
      'To handle user input'
    ],
    correctAnswer: 'To transform vertex positions and attributes',
    explanation: 'The vertex shader is responsible for transforming vertex positions through the model-view-projection matrix and processing vertex attributes like normals and texture coordinates.'
  },
  {
    id: 'cs306-mid-q4',
    type: 'multiple_choice',
    prompt: 'What does the z-buffer (depth buffer) store?',
    options: [
      'Color values for each pixel',
      'Depth information for visibility testing',
      'Normal vectors for lighting',
      'Texture coordinates'
    ],
    correctAnswer: 'Depth information for visibility testing',
    explanation: 'The z-buffer stores depth values for each pixel to determine which surfaces are visible and should be rendered, solving the hidden surface problem.'
  },
  {
    id: 'cs306-mid-q5',
    type: 'multiple_choice',
    prompt: 'In the graphics pipeline, what happens during primitive assembly?',
    options: [
      'Individual vertices are grouped into geometric primitives like triangles',
      'Pixels are colored based on interpolated values',
      'Matrices are multiplied together',
      'Textures are loaded into memory'
    ],
    correctAnswer: 'Individual vertices are grouped into geometric primitives like triangles',
    explanation: 'Primitive assembly takes the transformed vertices and organizes them into geometric primitives (points, lines, or triangles) for the rasterization stage.'
  },
  {
    id: 'cs306-mid-q6',
    type: 'multiple_choice',
    prompt: 'What is clipping in the graphics pipeline?',
    options: [
      'Removing primitives or parts of primitives outside the view frustum',
      'Converting 3D coordinates to 2D screen coordinates',
      'Determining which surfaces are visible',
      'Applying textures to surfaces'
    ],
    correctAnswer: 'Removing primitives or parts of primitives outside the view frustum',
    explanation: 'Clipping removes geometry that falls outside the viewing volume (frustum) to avoid rendering unnecessary primitives and ensure correct behavior at the edges of the view.'
  },

  // Transformations
  {
    id: 'cs306-mid-q7',
    type: 'multiple_choice',
    prompt: 'What type of transformation preserves parallel lines and ratios of distances along lines?',
    options: [
      'Affine transformation',
      'Perspective transformation',
      'Non-linear transformation',
      'Conformal transformation'
    ],
    correctAnswer: 'Affine transformation',
    explanation: 'Affine transformations (translation, rotation, scaling, shearing) preserve parallelism and ratios of distances. Perspective transformations do not preserve these properties.'
  },
  {
    id: 'cs306-mid-q8',
    type: 'multiple_choice',
    prompt: 'Why are homogeneous coordinates used in computer graphics?',
    options: [
      'To represent translations as matrix multiplications',
      'To reduce memory usage',
      'To increase rendering speed',
      'To simplify texture mapping'
    ],
    correctAnswer: 'To represent translations as matrix multiplications',
    explanation: 'Homogeneous coordinates (adding a 4th component) allow translations to be represented as matrix multiplications, enabling all transformations to be combined through matrix multiplication.'
  },
  {
    id: 'cs306-mid-q9',
    type: 'multiple_choice',
    prompt: 'What is the result of composing transformation matrices T1 followed by T2?',
    options: [
      'T2 × T1',
      'T1 × T2',
      'T1 + T2',
      'T2 - T1'
    ],
    correctAnswer: 'T2 × T1',
    explanation: 'In standard column-vector notation, to apply transformation T1 first and then T2, we compute T2 × T1. The rightmost matrix is applied first.'
  },
  {
    id: 'cs306-mid-q10',
    type: 'multiple_choice',
    prompt: 'What does a scaling matrix with negative values achieve?',
    options: [
      'Reflection across an axis',
      'Rotation',
      'Translation',
      'Shearing'
    ],
    correctAnswer: 'Reflection across an axis',
    explanation: 'Negative scaling factors flip the object across the corresponding axis, creating a reflection or mirror image.'
  },
  {
    id: 'cs306-mid-q11',
    type: 'multiple_choice',
    prompt: 'What property must a rotation matrix satisfy?',
    options: [
      'It must be orthogonal (its transpose equals its inverse)',
      'Its determinant must be zero',
      'It must be diagonal',
      'All elements must be positive'
    ],
    correctAnswer: 'It must be orthogonal (its transpose equals its inverse)',
    explanation: 'Rotation matrices are orthogonal, meaning R^T = R^(-1). This property ensures that rotations preserve lengths and angles.'
  },
  {
    id: 'cs306-mid-q12',
    type: 'multiple_choice',
    prompt: 'In a 4×4 transformation matrix, where is the translation information stored?',
    options: [
      'The fourth column (or row, depending on convention)',
      'The diagonal elements',
      'The top-left 3×3 submatrix',
      'The bottom-right element'
    ],
    correctAnswer: 'The fourth column (or row, depending on convention)',
    explanation: 'In a 4×4 homogeneous transformation matrix, the translation components (tx, ty, tz) are stored in the fourth column (column-major) or fourth row (row-major).'
  },
  {
    id: 'cs306-mid-q13',
    type: 'multiple_choice',
    prompt: 'What is gimbal lock in 3D rotations?',
    options: [
      'Loss of one degree of freedom when two rotation axes align',
      'A method to lock rotation angles',
      'A technique for faster rotation calculations',
      'An error in matrix multiplication'
    ],
    correctAnswer: 'Loss of one degree of freedom when two rotation axes align',
    explanation: 'Gimbal lock occurs in Euler angle representations when two of the three rotation axes align, causing the loss of one rotational degree of freedom. Quaternions can avoid this problem.'
  },

  // Viewing and Projection
  {
    id: 'cs306-mid-q14',
    type: 'multiple_choice',
    prompt: 'What are the three key vectors needed to define a camera\'s view transformation?',
    options: [
      'Eye position, look-at point, and up vector',
      'Position, rotation, and scale',
      'X-axis, Y-axis, and Z-axis',
      'Near plane, far plane, and field of view'
    ],
    correctAnswer: 'Eye position, look-at point, and up vector',
    explanation: 'A view transformation is typically defined by the camera position (eye), the point it\'s looking at, and an up vector to determine the camera\'s orientation.'
  },
  {
    id: 'cs306-mid-q15',
    type: 'multiple_choice',
    prompt: 'What is the main difference between orthographic and perspective projection?',
    options: [
      'Perspective projection includes foreshortening; orthographic does not',
      'Orthographic projection is faster to compute',
      'Perspective projection can only render triangles',
      'Orthographic projection requires a z-buffer'
    ],
    correctAnswer: 'Perspective projection includes foreshortening; orthographic does not',
    explanation: 'Perspective projection creates realistic depth cues where distant objects appear smaller (foreshortening). Orthographic projection preserves parallel lines and sizes regardless of distance.'
  },
  {
    id: 'cs306-mid-q16',
    type: 'multiple_choice',
    prompt: 'What does the field of view (FOV) parameter control in perspective projection?',
    options: [
      'The angular extent of the visible scene',
      'The distance to the near clipping plane',
      'The resolution of the rendered image',
      'The camera\'s movement speed'
    ],
    correctAnswer: 'The angular extent of the visible scene',
    explanation: 'Field of view determines how wide the camera\'s view is. A larger FOV creates a wider, more distorted view (wide-angle lens effect), while a smaller FOV creates a narrower, more telescopic view.'
  },
  {
    id: 'cs306-mid-q17',
    type: 'multiple_choice',
    prompt: 'What is the viewing frustum?',
    options: [
      'The truncated pyramid-shaped volume of visible space in perspective projection',
      'The rectangular box containing all objects in the scene',
      'The area of the screen where rendering occurs',
      'The buffer used for depth testing'
    ],
    correctAnswer: 'The truncated pyramid-shaped volume of visible space in perspective projection',
    explanation: 'The viewing frustum is a truncated pyramid defined by the near plane, far plane, and field of view. Objects outside this volume are clipped.'
  },
  {
    id: 'cs306-mid-q18',
    type: 'multiple_choice',
    prompt: 'After perspective division (dividing by w), what coordinate space are vertices in?',
    options: [
      'Normalized Device Coordinates (NDC)',
      'World space',
      'View space',
      'Screen space'
    ],
    correctAnswer: 'Normalized Device Coordinates (NDC)',
    explanation: 'Perspective division converts clip space coordinates to Normalized Device Coordinates (NDC), typically ranging from -1 to 1 in each dimension, independent of screen resolution.'
  },
  {
    id: 'cs306-mid-q19',
    type: 'multiple_choice',
    prompt: 'What is the purpose of the near and far clipping planes?',
    options: [
      'To define the depth range of the visible volume',
      'To control the camera\'s position',
      'To set the screen resolution',
      'To determine the lighting intensity'
    ],
    correctAnswer: 'To define the depth range of the visible volume',
    explanation: 'The near and far clipping planes define the minimum and maximum depth values for rendering. Objects closer than near or farther than far are clipped and not rendered.'
  },

  // Rasterization
  {
    id: 'cs306-mid-q20',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of rasterization?',
    options: [
      'Converting geometric primitives into discrete pixels',
      'Applying textures to surfaces',
      'Calculating lighting effects',
      'Transforming vertices'
    ],
    correctAnswer: 'Converting geometric primitives into discrete pixels',
    explanation: 'Rasterization is the process of determining which pixels are covered by geometric primitives (triangles, lines, points) and generating fragments for those pixels.'
  },
  {
    id: 'cs306-mid-q21',
    type: 'multiple_choice',
    prompt: 'What is barycentric interpolation used for in triangle rasterization?',
    options: [
      'Interpolating vertex attributes across the triangle surface',
      'Determining if a point is inside a triangle',
      'Calculating triangle area',
      'Sorting triangles by depth'
    ],
    correctAnswer: 'Interpolating vertex attributes across the triangle surface',
    explanation: 'Barycentric coordinates allow smooth interpolation of vertex attributes (colors, normals, texture coordinates) across the triangle surface for each fragment.'
  },
  {
    id: 'cs306-mid-q22',
    type: 'multiple_choice',
    prompt: 'What problem does antialiasing address in rasterization?',
    options: [
      'Jagged edges (aliasing artifacts) on rendered primitives',
      'Incorrect depth ordering',
      'Slow rendering performance',
      'Missing texture details'
    ],
    correctAnswer: 'Jagged edges (aliasing artifacts) on rendered primitives',
    explanation: 'Antialiasing techniques reduce jagged, stair-step edges (aliasing) that occur when continuous geometric shapes are sampled at discrete pixel locations.'
  },
  {
    id: 'cs306-mid-q23',
    type: 'multiple_choice',
    prompt: 'In scanline rasterization, what are edge equations used for?',
    options: [
      'Determining which pixels are inside a triangle',
      'Calculating triangle normals',
      'Sorting triangles by depth',
      'Applying texture coordinates'
    ],
    correctAnswer: 'Determining which pixels are inside a triangle',
    explanation: 'Edge equations (or edge functions) evaluate whether a point is on the positive or negative side of a triangle edge, allowing efficient inside/outside testing for each pixel.'
  },
  {
    id: 'cs306-mid-q24',
    type: 'multiple_choice',
    prompt: 'What is multisampling antialiasing (MSAA)?',
    options: [
      'Sampling multiple locations within each pixel for better edge quality',
      'Rendering the scene multiple times at different resolutions',
      'Using multiple textures per surface',
      'Applying blur to the final image'
    ],
    correctAnswer: 'Sampling multiple locations within each pixel for better edge quality',
    explanation: 'MSAA evaluates coverage at multiple sample points within each pixel, then combines the results to produce smoother edges while maintaining most of the performance of single-sample rendering.'
  },
  {
    id: 'cs306-mid-q25',
    type: 'multiple_choice',
    prompt: 'What does the fill convention solve in rasterization?',
    options: [
      'Which pixels to fill when a pixel center lies exactly on a triangle edge',
      'How to interpolate colors across surfaces',
      'The order in which triangles are rendered',
      'How to calculate pixel colors'
    ],
    correctAnswer: 'Which pixels to fill when a pixel center lies exactly on a triangle edge',
    explanation: 'The fill convention (like the top-left rule) provides consistent rules for handling edge cases where pixel centers fall exactly on triangle edges, preventing gaps or double-coverage between adjacent triangles.'
  },
  {
    id: 'cs306-mid-q26',
    type: 'multiple_choice',
    prompt: 'What is perspective-correct interpolation?',
    options: [
      'Interpolation that accounts for perspective division to correctly interpolate attributes in 3D',
      'Interpolation performed in screen space only',
      'Linear interpolation of depth values',
      'Interpolation of colors without depth information'
    ],
    correctAnswer: 'Interpolation that accounts for perspective division to correctly interpolate attributes in 3D',
    explanation: 'Perspective-correct interpolation properly accounts for the nonlinear effect of perspective projection when interpolating attributes like texture coordinates, ensuring they appear correct in 3D space.'
  }
];

const finalQuestions: QuizQuestion[] = [
  // Review of topics 1-4 (lighter coverage)
  {
    id: 'cs306-final-q1',
    type: 'multiple_choice',
    prompt: 'Which stage of the graphics pipeline converts primitives into fragments?',
    options: [
      'Rasterization',
      'Vertex processing',
      'Fragment processing',
      'Output merging'
    ],
    correctAnswer: 'Rasterization',
    explanation: 'Rasterization converts geometric primitives (like triangles) into fragments, which are potential pixels with associated attributes.'
  },
  {
    id: 'cs306-final-q2',
    type: 'multiple_choice',
    prompt: 'What is the composite transformation matrix that converts from model space directly to clip space called?',
    options: [
      'Model-View-Projection (MVP) matrix',
      'World transformation matrix',
      'View matrix',
      'Normal matrix'
    ],
    correctAnswer: 'Model-View-Projection (MVP) matrix',
    explanation: 'The MVP matrix is the product of the model, view, and projection matrices, transforming vertices from model space directly to clip space in a single operation.'
  },
  {
    id: 'cs306-final-q3',
    type: 'multiple_choice',
    prompt: 'What happens during the viewport transformation?',
    options: [
      'NDC coordinates are mapped to screen pixel coordinates',
      'World coordinates are transformed to view coordinates',
      'Clip space coordinates are divided by w',
      'Vertices are transformed by the model matrix'
    ],
    correctAnswer: 'NDC coordinates are mapped to screen pixel coordinates',
    explanation: 'The viewport transformation maps Normalized Device Coordinates (typically -1 to 1) to actual screen pixel coordinates based on the viewport dimensions.'
  },
  {
    id: 'cs306-final-q4',
    type: 'multiple_choice',
    prompt: 'Why are quaternions often preferred over Euler angles for rotations?',
    options: [
      'They avoid gimbal lock and interpolate smoothly',
      'They require less memory',
      'They are easier to understand',
      'They render faster'
    ],
    correctAnswer: 'They avoid gimbal lock and interpolate smoothly',
    explanation: 'Quaternions avoid gimbal lock problems inherent in Euler angles and provide smooth interpolation for animations through spherical linear interpolation (slerp).'
  },
  {
    id: 'cs306-final-q5',
    type: 'multiple_choice',
    prompt: 'In backface culling, which triangles are typically removed?',
    options: [
      'Triangles facing away from the camera',
      'Triangles outside the view frustum',
      'Triangles with negative depth',
      'Triangles smaller than one pixel'
    ],
    correctAnswer: 'Triangles facing away from the camera',
    explanation: 'Backface culling removes triangles whose normals point away from the camera. For closed objects, these back-facing triangles are not visible and can be discarded to improve performance.'
  },

  // Shading (Heavy emphasis)
  {
    id: 'cs306-final-q6',
    type: 'multiple_choice',
    prompt: 'What are the three main components of the Phong reflection model?',
    options: [
      'Ambient, diffuse, and specular',
      'Red, green, and blue',
      'Position, normal, and color',
      'Direct, indirect, and emissive'
    ],
    correctAnswer: 'Ambient, diffuse, and specular',
    explanation: 'The Phong model combines ambient lighting (constant background), diffuse reflection (matte surfaces), and specular reflection (shiny highlights) to approximate realistic lighting.'
  },
  {
    id: 'cs306-final-q7',
    type: 'multiple_choice',
    prompt: 'What does the diffuse component in Phong shading depend on?',
    options: [
      'The angle between the surface normal and light direction',
      'The angle between the view direction and reflection direction',
      'Only the light intensity',
      'The distance from the camera'
    ],
    correctAnswer: 'The angle between the surface normal and light direction',
    explanation: 'Diffuse reflection follows Lambert\'s cosine law: intensity is proportional to the cosine of the angle between the surface normal and light direction (N · L).'
  },
  {
    id: 'cs306-final-q8',
    type: 'multiple_choice',
    prompt: 'What does the specular exponent (shininess) control in Phong shading?',
    options: [
      'The size and sharpness of specular highlights',
      'The overall brightness of the surface',
      'The color of the surface',
      'The shadow intensity'
    ],
    correctAnswer: 'The size and sharpness of specular highlights',
    explanation: 'Higher specular exponents create smaller, sharper highlights (more mirror-like), while lower values create larger, softer highlights (less shiny surfaces).'
  },
  {
    id: 'cs306-final-q9',
    type: 'multiple_choice',
    prompt: 'What is the main difference between Phong shading and Blinn-Phong shading?',
    options: [
      'Blinn-Phong uses a halfway vector instead of the reflection vector',
      'Phong shading doesn\'t include specular highlights',
      'Blinn-Phong only works with point lights',
      'Phong shading is physically accurate'
    ],
    correctAnswer: 'Blinn-Phong uses a halfway vector instead of the reflection vector',
    explanation: 'Blinn-Phong uses the halfway vector (between light and view directions) instead of computing the reflection vector, which is more efficient and can produce more pleasing results.'
  },
  {
    id: 'cs306-final-q10',
    type: 'multiple_choice',
    prompt: 'What is the difference between flat shading and smooth shading?',
    options: [
      'Flat uses one normal per polygon; smooth interpolates normals across the surface',
      'Flat is faster but smooth is more accurate',
      'Flat only works with triangles; smooth works with any polygon',
      'Flat uses ambient lighting; smooth uses diffuse lighting'
    ],
    correctAnswer: 'Flat uses one normal per polygon; smooth interpolates normals across the surface',
    explanation: 'Flat shading uses a single normal for the entire polygon, creating faceted appearance. Smooth shading (Gouraud or Phong) interpolates vertex normals across the surface for a smooth look.'
  },
  {
    id: 'cs306-final-q11',
    type: 'multiple_choice',
    prompt: 'In Gouraud shading, when are lighting calculations performed?',
    options: [
      'At each vertex, then colors are interpolated across the polygon',
      'At every pixel across the surface',
      'Once per polygon',
      'During the texture mapping stage'
    ],
    correctAnswer: 'At each vertex, then colors are interpolated across the polygon',
    explanation: 'Gouraud shading computes lighting at vertices and interpolates the resulting colors across the polygon. This is faster than per-pixel lighting but can miss highlights.'
  },
  {
    id: 'cs306-final-q12',
    type: 'multiple_choice',
    prompt: 'What does per-pixel (Phong) shading interpolate across the polygon surface?',
    options: [
      'Normal vectors',
      'Final colors',
      'Light positions',
      'Depth values'
    ],
    correctAnswer: 'Normal vectors',
    explanation: 'Per-pixel (Phong) shading interpolates normal vectors across the surface and performs full lighting calculations at each pixel, producing more accurate highlights than Gouraud shading.'
  },
  {
    id: 'cs306-final-q13',
    type: 'multiple_choice',
    prompt: 'What is a normal map used for in shading?',
    options: [
      'Adding surface detail by perturbing normals without adding geometry',
      'Storing vertex positions',
      'Defining light directions',
      'Specifying material colors'
    ],
    correctAnswer: 'Adding surface detail by perturbing normals without adding geometry',
    explanation: 'Normal maps store perturbed normal vectors that modify lighting calculations to simulate surface details like bumps and wrinkles without increasing polygon count.'
  },
  {
    id: 'cs306-final-q14',
    type: 'multiple_choice',
    prompt: 'What color space are normal map values typically stored in?',
    options: [
      'Tangent space',
      'World space',
      'View space',
      'Screen space'
    ],
    correctAnswer: 'Tangent space',
    explanation: 'Tangent-space normal maps store normals relative to the surface\'s local coordinate system, making them reusable on different objects and orientations.'
  },
  {
    id: 'cs306-final-q15',
    type: 'multiple_choice',
    prompt: 'What is the main advantage of physically-based rendering (PBR) over traditional shading models?',
    options: [
      'More realistic and consistent lighting under different conditions',
      'Faster rendering performance',
      'Simpler implementation',
      'Less memory usage'
    ],
    correctAnswer: 'More realistic and consistent lighting under different conditions',
    explanation: 'PBR uses physically-based principles (energy conservation, Fresnel effects, microfacet theory) to produce consistent, realistic results across various lighting environments.'
  },
  {
    id: 'cs306-final-q16',
    type: 'multiple_choice',
    prompt: 'In PBR, what do the metallic and roughness parameters control?',
    options: [
      'Metallic controls reflectivity type; roughness controls surface smoothness',
      'Metallic controls brightness; roughness controls color',
      'Metallic controls transparency; roughness controls refraction',
      'Metallic controls shadows; roughness controls highlights'
    ],
    correctAnswer: 'Metallic controls reflectivity type; roughness controls surface smoothness',
    explanation: 'Metallic determines whether the surface reflects like a metal (colored reflections) or dielectric (white reflections). Roughness controls how smooth or rough the microsurface is.'
  },
  {
    id: 'cs306-final-q17',
    type: 'multiple_choice',
    prompt: 'What is the Fresnel effect in rendering?',
    options: [
      'Reflectivity increases at grazing angles',
      'Colors become more saturated at distance',
      'Shadows become softer near edges',
      'Textures appear sharper when viewed closely'
    ],
    correctAnswer: 'Reflectivity increases at grazing angles',
    explanation: 'The Fresnel effect describes how reflectivity increases when viewing a surface at shallow (grazing) angles. Even matte surfaces become more reflective at these angles.'
  },

  // Textures (Heavy emphasis)
  {
    id: 'cs306-final-q18',
    type: 'multiple_choice',
    prompt: 'What are texture coordinates (UV coordinates)?',
    options: [
      'Parametric coordinates that map points on a surface to locations in a texture',
      'The pixel dimensions of a texture image',
      'The position of textures in world space',
      'Color values stored at each pixel'
    ],
    correctAnswer: 'Parametric coordinates that map points on a surface to locations in a texture',
    explanation: 'UV coordinates are 2D parametric coordinates (typically ranging 0-1) that define how a 2D texture image maps onto a 3D surface.'
  },
  {
    id: 'cs306-final-q19',
    type: 'multiple_choice',
    prompt: 'What is texture filtering used for?',
    options: [
      'Determining texture color when texture coordinates don\'t align with texel centers',
      'Removing textures from memory',
      'Compressing texture data',
      'Converting between color spaces'
    ],
    correctAnswer: 'Determining texture color when texture coordinates don\'t align with texel centers',
    explanation: 'Texture filtering (like nearest neighbor or bilinear filtering) determines how to compute a color when sampling the texture at coordinates that fall between texel centers.'
  },
  {
    id: 'cs306-final-q20',
    type: 'multiple_choice',
    prompt: 'What is the difference between nearest neighbor and bilinear texture filtering?',
    options: [
      'Nearest neighbor picks the closest texel; bilinear interpolates between four texels',
      'Nearest neighbor is more accurate but slower',
      'Bilinear only works with square textures',
      'Nearest neighbor requires mipmaps'
    ],
    correctAnswer: 'Nearest neighbor picks the closest texel; bilinear interpolates between four texels',
    explanation: 'Nearest neighbor sampling selects the single closest texel (fast but pixelated). Bilinear filtering interpolates between the four nearest texels for smoother results.'
  },
  {
    id: 'cs306-final-q21',
    type: 'multiple_choice',
    prompt: 'What problem do mipmaps solve?',
    options: [
      'Aliasing and performance issues when textures are minified',
      'Running out of texture memory',
      'Textures appearing too bright',
      'UV coordinate wrapping'
    ],
    correctAnswer: 'Aliasing and performance issues when textures are minified',
    explanation: 'Mipmaps are pre-filtered, progressively lower-resolution versions of a texture. They reduce aliasing artifacts and improve performance when textures are viewed at a distance.'
  },
  {
    id: 'cs306-final-q22',
    type: 'multiple_choice',
    prompt: 'What is trilinear filtering?',
    options: [
      'Bilinear filtering between two mipmap levels plus interpolation between the levels',
      'Filtering in three color channels separately',
      'Using three texture samples per pixel',
      'Filtering based on three light sources'
    ],
    correctAnswer: 'Bilinear filtering between two mipmap levels plus interpolation between the levels',
    explanation: 'Trilinear filtering performs bilinear filtering on two adjacent mipmap levels and then linearly interpolates between them, eliminating visible transitions between mipmap levels.'
  },
  {
    id: 'cs306-final-q23',
    type: 'multiple_choice',
    prompt: 'What is anisotropic filtering designed to handle?',
    options: [
      'Textures viewed at oblique angles where detail stretches in one direction',
      'Textures with transparent regions',
      'High-resolution textures',
      'Multiple overlapping textures'
    ],
    correctAnswer: 'Textures viewed at oblique angles where detail stretches in one direction',
    explanation: 'Anisotropic filtering takes multiple texture samples along the direction of anisotropy (elongation), producing sharper textures when surfaces are viewed at shallow angles.'
  },
  {
    id: 'cs306-final-q24',
    type: 'multiple_choice',
    prompt: 'What does texture wrapping mode determine?',
    options: [
      'How texture coordinates outside the 0-1 range are handled',
      'How textures are compressed',
      'The resolution of the texture',
      'The color space of the texture'
    ],
    correctAnswer: 'How texture coordinates outside the 0-1 range are handled',
    explanation: 'Wrapping modes (repeat, clamp, mirror) define what happens when UV coordinates fall outside the standard 0-1 range, controlling texture tiling and edge behavior.'
  },
  {
    id: 'cs306-final-q25',
    type: 'multiple_choice',
    prompt: 'What is a cube map typically used for?',
    options: [
      'Environment mapping and reflections',
      'Character skin textures',
      'Terrain height information',
      'Shadow mapping'
    ],
    correctAnswer: 'Environment mapping and reflections',
    explanation: 'Cube maps store six square textures arranged as the faces of a cube, commonly used for skyboxes and environment reflections where sampling direction is a 3D vector.'
  },
  {
    id: 'cs306-final-q26',
    type: 'multiple_choice',
    prompt: 'What is texture atlasing?',
    options: [
      'Combining multiple textures into a single larger texture',
      'Generating mipmaps automatically',
      'Compressing texture data',
      'Animating texture coordinates'
    ],
    correctAnswer: 'Combining multiple textures into a single larger texture',
    explanation: 'Texture atlasing packs multiple smaller textures into one large texture, reducing the number of texture switches during rendering and improving performance.'
  },
  {
    id: 'cs306-final-q27',
    type: 'multiple_choice',
    prompt: 'What information does a displacement map store?',
    options: [
      'Height information that actually moves vertex positions',
      'Color information for surfaces',
      'Normal perturbations for lighting',
      'Transparency values'
    ],
    correctAnswer: 'Height information that actually moves vertex positions',
    explanation: 'Unlike normal maps which only affect lighting, displacement maps actually modify the geometry by moving vertices based on height values, creating real surface detail.'
  },

  // Ray Tracing (Heavy emphasis)
  {
    id: 'cs306-final-q28',
    type: 'multiple_choice',
    prompt: 'What is the fundamental principle of ray tracing?',
    options: [
      'Tracing rays from the camera through pixels to find intersections with scene geometry',
      'Rasterizing triangles to pixels',
      'Sorting objects by depth',
      'Interpolating vertex colors'
    ],
    correctAnswer: 'Tracing rays from the camera through pixels to find intersections with scene geometry',
    explanation: 'Ray tracing works by casting rays from the camera through each pixel into the scene, finding what objects they intersect, and computing the color based on those intersections.'
  },
  {
    id: 'cs306-final-q29',
    type: 'multiple_choice',
    prompt: 'What is the primary advantage of ray tracing over rasterization?',
    options: [
      'Accurate reflections, refractions, and shadows with global illumination',
      'Faster rendering speed',
      'Lower memory usage',
      'Simpler implementation'
    ],
    correctAnswer: 'Accurate reflections, refractions, and shadows with global illumination',
    explanation: 'Ray tracing naturally handles complex light transport including realistic reflections, refractions, shadows, and global illumination effects that are difficult or impossible with traditional rasterization.'
  },
  {
    id: 'cs306-final-q30',
    type: 'multiple_choice',
    prompt: 'In ray-sphere intersection, what equation must be solved?',
    options: [
      'A quadratic equation derived from substituting the ray equation into the sphere equation',
      'A linear system of equations',
      'A differential equation',
      'A matrix equation'
    ],
    correctAnswer: 'A quadratic equation derived from substituting the ray equation into the sphere equation',
    explanation: 'Ray-sphere intersection involves substituting the parametric ray equation into the implicit sphere equation, resulting in a quadratic equation whose solutions give intersection distances.'
  },
  {
    id: 'cs306-final-q31',
    type: 'multiple_choice',
    prompt: 'What is a shadow ray in ray tracing?',
    options: [
      'A ray cast from a surface point toward a light source to test for occlusion',
      'A ray that bounces off shadowed surfaces',
      'A ray that creates shadows on other objects',
      'The primary ray from the camera'
    ],
    correctAnswer: 'A ray cast from a surface point toward a light source to test for occlusion',
    explanation: 'Shadow rays are cast from surface points toward light sources. If the ray intersects an object before reaching the light, the point is in shadow.'
  },
  {
    id: 'cs306-final-q32',
    type: 'multiple_choice',
    prompt: 'What is recursive ray tracing?',
    options: [
      'Spawning secondary rays for reflections and refractions that recursively generate more rays',
      'Tracing rays in a loop until convergence',
      'Using recursion to organize scene geometry',
      'Repeating the rendering process multiple times'
    ],
    correctAnswer: 'Spawning secondary rays for reflections and refractions that recursively generate more rays',
    explanation: 'Recursive ray tracing generates secondary rays (reflection, refraction) at intersection points, which themselves can generate more rays, creating a recursive tree of ray paths.'
  },
  {
    id: 'cs306-final-q33',
    type: 'multiple_choice',
    prompt: 'What is the purpose of acceleration structures like BVH (Bounding Volume Hierarchy) in ray tracing?',
    options: [
      'To quickly reject large groups of objects that a ray doesn\'t intersect',
      'To sort objects by material type',
      'To compress scene geometry',
      'To parallelize ray tracing across multiple processors'
    ],
    correctAnswer: 'To quickly reject large groups of objects that a ray doesn\'t intersect',
    explanation: 'BVH and similar structures organize geometry hierarchically in bounding volumes, allowing ray tracers to quickly skip large groups of objects without testing individual intersections.'
  },
  {
    id: 'cs306-final-q34',
    type: 'multiple_choice',
    prompt: 'What is Snell\'s law used for in ray tracing?',
    options: [
      'Computing the direction of refracted rays when light passes through transparent materials',
      'Calculating reflection angles',
      'Determining shadow intensity',
      'Computing surface normals'
    ],
    correctAnswer: 'Computing the direction of refracted rays when light passes through transparent materials',
    explanation: 'Snell\'s law (n1 sin θ1 = n2 sin θ2) relates the angles and indices of refraction when light passes between materials, used to compute refraction direction in ray tracing.'
  },
  {
    id: 'cs306-final-q35',
    type: 'multiple_choice',
    prompt: 'What is path tracing?',
    options: [
      'A Monte Carlo ray tracing method that traces random paths for global illumination',
      'Drawing paths that objects follow in animation',
      'Tracing rays along predetermined paths',
      'A method for finding the shortest path through a scene'
    ],
    correctAnswer: 'A Monte Carlo ray tracing method that traces random paths for global illumination',
    explanation: 'Path tracing randomly samples light paths through the scene, accumulating many samples to converge on the correct global illumination solution, producing highly realistic lighting.'
  },
  {
    id: 'cs306-final-q36',
    type: 'multiple_choice',
    prompt: 'What is the rendering equation?',
    options: [
      'An integral equation describing how light bounces and accumulates in a scene',
      'The formula for projecting 3D points to 2D',
      'The equation for calculating depth values',
      'A formula for interpolating vertex attributes'
    ],
    correctAnswer: 'An integral equation describing how light bounces and accumulates in a scene',
    explanation: 'The rendering equation, introduced by Kajiya, is an integral equation that describes the total light reflected from a point as a sum of emitted and reflected light from all directions.'
  },
  {
    id: 'cs306-final-q37',
    type: 'multiple_choice',
    prompt: 'What is importance sampling in Monte Carlo ray tracing?',
    options: [
      'Biasing random samples toward directions likely to contribute more to the final result',
      'Sampling only the most important objects in the scene',
      'Taking more samples for important pixels',
      'Sampling textures at higher resolution'
    ],
    correctAnswer: 'Biasing random samples toward directions likely to contribute more to the final result',
    explanation: 'Importance sampling concentrates samples in directions that contribute more to the result (e.g., toward light sources), reducing noise and improving convergence speed.'
  },
  {
    id: 'cs306-final-q38',
    type: 'multiple_choice',
    prompt: 'What is ambient occlusion in ray tracing?',
    options: [
      'Approximating indirect lighting by testing how exposed each point is to the sky',
      'The ambient light component of the Phong model',
      'Shadow rays that miss all light sources',
      'Occlusion culling for performance optimization'
    ],
    correctAnswer: 'Approximating indirect lighting by testing how exposed each point is to the sky',
    explanation: 'Ambient occlusion casts rays in random directions to determine how occluded a point is. Crevices and corners receive less ambient light, adding depth and realism.'
  },
  {
    id: 'cs306-final-q39',
    type: 'multiple_choice',
    prompt: 'What is Russian roulette in path tracing?',
    options: [
      'Randomly terminating ray paths with probability based on contribution to reduce computation',
      'Randomly selecting which objects to render',
      'A method for randomly placing lights in a scene',
      'Random selection of camera positions'
    ],
    correctAnswer: 'Randomly terminating ray paths with probability based on contribution to reduce computation',
    explanation: 'Russian roulette randomly terminates rays with some probability (adjusting contribution accordingly), preventing infinite recursion while maintaining unbiased results on average.'
  },
  {
    id: 'cs306-final-q40',
    type: 'multiple_choice',
    prompt: 'What is the difference between hard shadows and soft shadows?',
    options: [
      'Hard shadows have sharp edges (point lights); soft shadows have gradual transitions (area lights)',
      'Hard shadows are darker than soft shadows',
      'Hard shadows are faster to compute',
      'Soft shadows only occur indoors'
    ],
    correctAnswer: 'Hard shadows have sharp edges (point lights); soft shadows have gradual transitions (area lights)',
    explanation: 'Hard shadows result from point light sources and have sharp, well-defined edges. Soft shadows result from area lights and have gradual penumbra regions.'
  },
  {
    id: 'cs306-final-q41',
    type: 'multiple_choice',
    prompt: 'What is caustics in computer graphics?',
    options: [
      'Focused light patterns created by reflection or refraction through curved surfaces',
      'The cause of rendering artifacts',
      'Chemical effects on materials',
      'Lighting effects in fog or smoke'
    ],
    correctAnswer: 'Focused light patterns created by reflection or refraction through curved surfaces',
    explanation: 'Caustics are concentrated light patterns formed when light rays converge after reflecting off or refracting through curved surfaces, like the patterns at the bottom of a swimming pool.'
  },
  {
    id: 'cs306-final-q42',
    type: 'multiple_choice',
    prompt: 'What is photon mapping?',
    options: [
      'A two-pass algorithm that traces photons from lights and uses them to compute indirect illumination',
      'Creating maps of scene geometry for lighting',
      'Storing light intensity in texture maps',
      'Mapping camera rays to light sources'
    ],
    correctAnswer: 'A two-pass algorithm that traces photons from lights and uses them to compute indirect illumination',
    explanation: 'Photon mapping first traces photons from light sources and stores them where they hit surfaces. In a second pass, these stored photons are used to efficiently compute indirect lighting and caustics.'
  }
];

export const cs306Exams: Exam[] = [
  {
    id: 'cs306-midterm',
    subjectId: 'cs306',
    title: 'CS306 Midterm Examination',
    questions: midtermQuestions
  },
  {
    id: 'cs306-final',
    subjectId: 'cs306',
    title: 'CS306 Final Examination',
    questions: finalQuestions
  }
];
