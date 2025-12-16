import type { Project } from '../../../core/types';

export const cs306Projects: Project[] = [
  {
    id: 'cs306-project-1',
    subjectId: 'cs306',
    title: 'Software Rasterizer',
    description: 'Build a software-based rasterizer from scratch that can render 2D and 3D primitives without using hardware acceleration. Implement fundamental algorithms including line drawing using Bresenham\'s algorithm, triangle rasterization with edge functions, and a depth buffer (z-buffer) for handling occlusion. This project provides deep insight into how graphics hardware works at a low level.',
    requirements: [
      'Implement Bresenham\'s line drawing algorithm for efficient line rendering',
      'Implement triangle rasterization using edge functions or scanline conversion',
      'Create a depth buffer (z-buffer) to handle pixel depth and occlusion',
      'Support basic vertex attributes including position, color, and depth',
      'Render a 3D mesh (such as a cube or pyramid) with proper depth sorting',
      'Provide visualization of the framebuffer and depth buffer',
      'Handle edge cases including degenerate triangles and clipping'
    ],
    rubric: [
      {
        name: 'Line Drawing Implementation',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Line drawing is not functional or produces severely incorrect output'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic line drawing works but with visual artifacts or inefficient implementation'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Bresenham\'s algorithm correctly implemented with proper line rendering'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Optimized implementation with support for different line widths and anti-aliasing'
          }
        ]
      },
      {
        name: 'Triangle Rasterization',
        weight: 30,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Triangle rasterization is not implemented or non-functional'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic rasterization works but with gaps, overlaps, or incorrect pixel coverage'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Correct rasterization using edge functions or scanline with proper pixel coverage'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Optimized rasterization with bounding box culling and attribute interpolation'
          }
        ]
      },
      {
        name: 'Depth Buffer Implementation',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Depth buffer not implemented or occlusion handling is incorrect'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Depth buffer exists but with visual errors in depth testing'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Correct z-buffer implementation with proper depth comparison and updates'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Optimized depth buffer with visualization and support for depth precision'
          }
        ]
      },
      {
        name: '3D Rendering',
        weight: 15,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: '3D meshes do not render correctly or are not implemented'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Simple 3D mesh renders but with visible depth or rasterization issues'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Complex 3D mesh renders correctly with proper occlusion handling'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Multiple meshes render with transformations and correct depth sorting'
          }
        ]
      },
      {
        name: 'Code Quality and Documentation',
        weight: 10,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Code is poorly organized with little to no documentation'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Code is functional but lacks clear structure or adequate comments'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Well-structured code with clear functions and helpful comments'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Exceptional code organization with comprehensive documentation and examples'
          }
        ]
      }
    ],
    estimatedHours: 25,
    scaffolding: {
      overview: 'This project introduces you to the fundamentals of rasterization, the process by which vector graphics are converted to pixels. You\'ll implement the core algorithms that graphics hardware uses billions of times per second.',
      gettingStarted: [
        'Start by creating a framebuffer class that manages a 2D array of pixels',
        'Implement Bresenham\'s line algorithm, testing it with lines in all octants',
        'Tackle triangle rasterization using the edge function method',
        'Add depth buffering to handle 3D occlusion'
      ],
      milestones: [
        'Framebuffer class with ability to set pixels and export to image',
        'Working line drawing algorithm that handles all slopes',
        'Triangle rasterization that fills triangles without gaps or overlaps',
        'Depth buffer integration for correct 3D rendering',
        'Complete 3D mesh rendering with multiple primitives'
      ],
      tips: [
        'Test your line algorithm with lines in all 8 octants to ensure correctness',
        'Use integer arithmetic in Bresenham\'s algorithm for better performance',
        'The edge function method is more robust than scanline for triangle rasterization',
        'Initialize your depth buffer to infinity (or maximum depth) before rendering',
        'Consider using barycentric coordinates for attribute interpolation across triangles'
      ]
    }
  },
  {
    id: 'cs306-project-2',
    subjectId: 'cs306',
    title: '3D Scene Viewer with WebGL',
    description: 'Create an interactive 3D scene viewer using WebGL or Three.js that demonstrates understanding of 3D transformations, camera systems, and projection matrices. Implement model, view, and projection transformations, interactive camera controls, and support for loading and rendering multiple 3D objects with different materials and lighting.',
    requirements: [
      'Implement model transformation matrices (translation, rotation, scaling)',
      'Create a camera system with view matrix calculations',
      'Implement perspective and orthographic projection matrices',
      'Support interactive camera controls (orbit, pan, zoom)',
      'Load and render at least 3 different 3D models or procedural geometry',
      'Implement basic Phong lighting with diffuse and specular components',
      'Add support for multiple objects with different transformations',
      'Provide UI controls for manipulating objects and camera parameters'
    ],
    rubric: [
      {
        name: 'Transformation System',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Transformations are not implemented or produce incorrect results'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic transformations work but with limited functionality or errors'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Complete model, view, and projection matrices correctly implemented'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Hierarchical transformations with parent-child relationships and compositing'
          }
        ]
      },
      {
        name: 'Camera Implementation',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Camera system is not functional or view is incorrect'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Static camera works but lacks proper interactive controls'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Interactive camera with orbit, pan, and zoom controls working correctly'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Advanced camera features like smooth interpolation and multiple camera modes'
          }
        ]
      },
      {
        name: 'Rendering and Shaders',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Objects do not render or shaders are non-functional'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic rendering works but without proper lighting or shading'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Multiple objects render with Phong lighting and proper materials'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Advanced shading with normal mapping, shadows, or other effects'
          }
        ]
      },
      {
        name: 'Interactivity and Controls',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'No interactive controls or UI elements implemented'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic controls exist but are unintuitive or limited'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Comprehensive UI for controlling objects, camera, and scene parameters'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Polished interface with keyboard shortcuts, presets, and advanced features'
          }
        ]
      },
      {
        name: 'Code Quality and Performance',
        weight: 10,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Code is disorganized or application has severe performance issues'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Code is functional but with performance bottlenecks or poor structure'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Well-organized code with smooth performance and clear documentation'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Optimized rendering pipeline with efficient resource management'
          }
        ]
      }
    ],
    estimatedHours: 30,
    scaffolding: {
      overview: 'This project explores the 3D graphics pipeline, from 3D world coordinates to 2D screen pixels. You\'ll implement the mathematical foundations of 3D graphics including transformation matrices and projection, while learning modern GPU programming with WebGL.',
      gettingStarted: [
        'Begin by setting up a WebGL context or Three.js scene',
        'Create basic vertex and fragment shaders to render a simple cube',
        'Implement the transformation hierarchy: model matrix for object placement, view matrix for camera, and projection matrix for perspective',
        'Add interactive controls incrementally'
      ],
      milestones: [
        'WebGL context initialized with a rendering loop',
        'Basic shader that renders a colored 3D primitive',
        'Model, view, and projection matrices working together',
        'Interactive camera controls responding to mouse/keyboard input',
        'Multiple objects with independent transformations',
        'Phong lighting model with adjustable light parameters'
      ],
      tips: [
        'Use a matrix library (glMatrix or Three.js Math) rather than implementing matrices from scratch',
        'Debug your transformations by rendering objects at the origin first',
        'The view matrix is the inverse of the camera transformation matrix',
        'For orbit controls, use spherical coordinates to position the camera around a target',
        'Pass transformation matrices to shaders as uniforms for efficient GPU processing',
        'Test perspective divide by rendering objects at varying depths'
      ]
    }
  },
  {
    id: 'cs306-project-3',
    subjectId: 'cs306',
    title: 'Basic Ray Tracer',
    description: 'Implement a ray tracer from scratch that generates photorealistic images by simulating the physics of light. Build a system that traces rays from the camera through each pixel, computes ray-object intersections, and calculates lighting using the Phong reflection model. Support multiple primitive types, shadows, and reflections to create compelling 3D scenes.',
    requirements: [
      'Implement ray generation from camera through each pixel',
      'Calculate ray-sphere and ray-plane intersections',
      'Support multiple geometric primitives (spheres, planes, triangles)',
      'Implement the Phong reflection model (ambient, diffuse, specular)',
      'Add shadow rays for realistic shadowing from point lights',
      'Implement recursive ray tracing for reflections',
      'Support multiple light sources with different colors and intensities',
      'Render scenes to image files with configurable resolution',
      'Include at least one complex scene demonstrating all features'
    ],
    rubric: [
      {
        name: 'Ray-Object Intersection',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Intersection tests are not implemented or produce incorrect results'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic sphere intersection works but with visual errors or limited shapes'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Correct intersection tests for spheres, planes, and triangles'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Optimized intersections with additional shapes like cylinders or CSG operations'
          }
        ]
      },
      {
        name: 'Lighting and Shading',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Lighting model is not implemented or produces flat/incorrect shading'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic diffuse lighting works but missing specular or with visual errors'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Complete Phong model with ambient, diffuse, and specular components'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Advanced lighting with area lights, soft shadows, or global illumination'
          }
        ]
      },
      {
        name: 'Shadows Implementation',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Shadow rays are not implemented or shadows appear incorrect'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Shadows exist but with artifacts like shadow acne or missing shadows'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Correct shadow implementation with proper epsilon handling'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Soft shadows or multiple light sources with correct shadow blending'
          }
        ]
      },
      {
        name: 'Reflections',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Reflections are not implemented or produce incorrect results'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Basic reflections work but limited to one bounce or with visual errors'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Recursive reflections with proper depth limiting and color blending'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Advanced reflection features like fresnel effects or glossy reflections'
          }
        ]
      },
      {
        name: 'Scene Complexity and Code Quality',
        weight: 10,
        levels: [
          {
            score: 1,
            label: 'Incomplete',
            description: 'Minimal scene with poor code organization'
          },
          {
            score: 2,
            label: 'Basic',
            description: 'Simple scene that demonstrates basic features with adequate code structure'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Complex scene showcasing all features with well-organized, documented code'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Multiple artistic scenes with exceptional code quality and performance optimizations'
          }
        ]
      }
    ],
    estimatedHours: 35,
    scaffolding: {
      overview: 'Ray tracing is a rendering technique that produces highly realistic images by simulating the path of light rays. Unlike rasterization, ray tracing naturally handles reflections, shadows, and complex lighting. This project will teach you the fundamentals of physically-based rendering.',
      gettingStarted: [
        'Start with a simple camera model that generates rays for each pixel',
        'Implement ray-sphere intersection first as it\'s mathematically straightforward',
        'Add basic lighting without shadows',
        'Once that works, add shadow rays, then move on to reflections',
        'Build complexity gradually'
      ],
      milestones: [
        'Ray generation and basic image output structure',
        'Ray-sphere intersection producing silhouette images',
        'Diffuse lighting creating shaded spheres',
        'Phong shading with specular highlights',
        'Shadow rays creating realistic shadows',
        'Reflective surfaces with recursive ray tracing',
        'Complete scene with multiple objects, lights, and materials'
      ],
      tips: [
        'Use a small image resolution (e.g., 400x300) during development for faster iteration',
        'Add a small epsilon (1e-6) to shadow ray origins to prevent shadow acne',
        'Limit recursion depth to 5-10 bounces to prevent infinite loops with facing mirrors',
        'Normalize all direction vectors before using them in calculations',
        'The ray-sphere intersection has two solutions; choose the nearest positive t value',
        'Structure your code with clear classes for Ray, Vector3, Color, Material, and geometric primitives',
        'Test each feature in isolation before combining them'
      ]
    }
  }
];
