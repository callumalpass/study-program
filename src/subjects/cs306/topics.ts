import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-graphics-introduction.md?raw';
import topic1_2 from './content/topic-1/02-graphics-hardware.md?raw';
import topic1_3 from './content/topic-1/03-rendering-pipeline.md?raw';
import topic1_4 from './content/topic-1/04-graphics-apis.md?raw';
import topic1_5 from './content/topic-1/05-coordinate-systems.md?raw';
import topic1_6 from './content/topic-1/06-primitives.md?raw';
import topic1_7 from './content/topic-1/07-colors-framebuffers.md?raw';

import topic2_1 from './content/topic-2/01-transformation-basics.md?raw';
import topic2_2 from './content/topic-2/02-translation-scaling.md?raw';
import topic2_3 from './content/topic-2/03-rotation.md?raw';
import topic2_4 from './content/topic-2/04-homogeneous-coordinates.md?raw';
import topic2_5 from './content/topic-2/05-composite-transforms.md?raw';
import topic2_6 from './content/topic-2/06-3d-transformations.md?raw';
import topic2_7 from './content/topic-2/07-quaternions.md?raw';

import topic3_1 from './content/topic-3/01-viewing-pipeline.md?raw';
import topic3_2 from './content/topic-3/02-camera-models.md?raw';
import topic3_3 from './content/topic-3/03-view-transformation.md?raw';
import topic3_4 from './content/topic-3/04-orthographic-projection.md?raw';
import topic3_5 from './content/topic-3/05-perspective-projection.md?raw';
import topic3_6 from './content/topic-3/06-viewport-transform.md?raw';
import topic3_7 from './content/topic-3/07-clipping.md?raw';

import topic4_1 from './content/topic-4/01-rasterization-intro.md?raw';
import topic4_2 from './content/topic-4/02-line-drawing.md?raw';
import topic4_3 from './content/topic-4/03-polygon-filling.md?raw';
import topic4_4 from './content/topic-4/04-depth-buffering.md?raw';
import topic4_5 from './content/topic-4/05-antialiasing.md?raw';
import topic4_6 from './content/topic-4/06-triangle-rasterization.md?raw';
import topic4_7 from './content/topic-4/07-fragment-operations.md?raw';

import topic5_1 from './content/topic-5/01-illumination-basics.md?raw';
import topic5_2 from './content/topic-5/02-light-sources.md?raw';
import topic5_3 from './content/topic-5/03-phong-model.md?raw';
import topic5_4 from './content/topic-5/04-shading-models.md?raw';
import topic5_5 from './content/topic-5/05-materials.md?raw';
import topic5_6 from './content/topic-5/06-vertex-fragment-shaders.md?raw';
import topic5_7 from './content/topic-5/07-advanced-shading.md?raw';

import topic6_1 from './content/topic-6/01-texture-basics.md?raw';
import topic6_2 from './content/topic-6/02-uv-mapping.md?raw';
import topic6_3 from './content/topic-6/03-texture-filtering.md?raw';
import topic6_4 from './content/topic-6/04-mipmapping.md?raw';
import topic6_5 from './content/topic-6/05-normal-mapping.md?raw';
import topic6_6 from './content/topic-6/06-environment-mapping.md?raw';
import topic6_7 from './content/topic-6/07-procedural-textures.md?raw';

import topic7_1 from './content/topic-7/01-ray-tracing-intro.md?raw';
import topic7_2 from './content/topic-7/02-ray-intersection.md?raw';
import topic7_3 from './content/topic-7/03-shadows.md?raw';
import topic7_4 from './content/topic-7/04-reflections-refractions.md?raw';
import topic7_5 from './content/topic-7/05-global-illumination.md?raw';
import topic7_6 from './content/topic-7/06-acceleration-structures.md?raw';
import topic7_7 from './content/topic-7/07-path-tracing.md?raw';

export const cs306Topics: Topic[] = [
  {
    id: 'cs306-topic-1',
    title: 'Graphics Pipeline Fundamentals',
    content: 'Introduction to computer graphics concepts, hardware architecture, rendering pipelines, and the foundational building blocks of graphics programming.',
    subtopics: [
      { id: 'cs306-topic-1-1', slug: 'graphics-introduction', order: 1, title: 'Introduction to Computer Graphics', content: topic1_1 },
      { id: 'cs306-topic-1-2', slug: 'graphics-hardware', order: 2, title: 'Graphics Hardware', content: topic1_2 },
      { id: 'cs306-topic-1-3', slug: 'rendering-pipeline', order: 3, title: 'The Rendering Pipeline', content: topic1_3 },
      { id: 'cs306-topic-1-4', slug: 'graphics-apis', order: 4, title: 'Graphics APIs', content: topic1_4 },
      { id: 'cs306-topic-1-5', slug: 'coordinate-systems', order: 5, title: 'Coordinate Systems', content: topic1_5 },
      { id: 'cs306-topic-1-6', slug: 'primitives', order: 6, title: 'Graphics Primitives', content: topic1_6 },
      { id: 'cs306-topic-1-7', slug: 'colors-framebuffers', order: 7, title: 'Colors and Framebuffers', content: topic1_7 }
    ],
    quizIds: ['cs306-quiz-1-1', 'cs306-quiz-1-2', 'cs306-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs306-topic-2',
    title: '2D and 3D Transformations',
    content: 'Master geometric transformations using matrices, including translation, rotation, scaling, and composition of transforms in both 2D and 3D spaces.',
    subtopics: [
      { id: 'cs306-topic-2-1', slug: 'transformation-basics', order: 1, title: 'Transformation Basics', content: topic2_1 },
      { id: 'cs306-topic-2-2', slug: 'translation-scaling', order: 2, title: 'Translation and Scaling', content: topic2_2 },
      { id: 'cs306-topic-2-3', slug: 'rotation', order: 3, title: 'Rotation', content: topic2_3 },
      { id: 'cs306-topic-2-4', slug: 'homogeneous-coordinates', order: 4, title: 'Homogeneous Coordinates', content: topic2_4 },
      { id: 'cs306-topic-2-5', slug: 'composite-transforms', order: 5, title: 'Composite Transformations', content: topic2_5 },
      { id: 'cs306-topic-2-6', slug: '3d-transformations', order: 6, title: '3D Transformations', content: topic2_6 },
      { id: 'cs306-topic-2-7', slug: 'quaternions', order: 7, title: 'Quaternions', content: topic2_7 }
    ],
    quizIds: ['cs306-quiz-2-1', 'cs306-quiz-2-2', 'cs306-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs306-topic-3',
    title: 'Viewing and Projection',
    content: 'Learn how to set up virtual cameras, implement viewing transformations, and project 3D scenes onto 2D displays using orthographic and perspective projections.',
    subtopics: [
      { id: 'cs306-topic-3-1', slug: 'viewing-pipeline', order: 1, title: 'The Viewing Pipeline', content: topic3_1 },
      { id: 'cs306-topic-3-2', slug: 'camera-models', order: 2, title: 'Camera Models', content: topic3_2 },
      { id: 'cs306-topic-3-3', slug: 'view-transformation', order: 3, title: 'View Transformation', content: topic3_3 },
      { id: 'cs306-topic-3-4', slug: 'orthographic-projection', order: 4, title: 'Orthographic Projection', content: topic3_4 },
      { id: 'cs306-topic-3-5', slug: 'perspective-projection', order: 5, title: 'Perspective Projection', content: topic3_5 },
      { id: 'cs306-topic-3-6', slug: 'viewport-transform', order: 6, title: 'Viewport Transform', content: topic3_6 },
      { id: 'cs306-topic-3-7', slug: 'clipping', order: 7, title: 'Clipping', content: topic3_7 }
    ],
    quizIds: ['cs306-quiz-3-1', 'cs306-quiz-3-2', 'cs306-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs306-topic-4',
    title: 'Rasterization',
    content: 'Understand the rasterization process: converting geometric primitives to pixels, including line drawing algorithms, polygon filling, depth buffering, and antialiasing.',
    subtopics: [
      { id: 'cs306-topic-4-1', slug: 'rasterization-intro', order: 1, title: 'Introduction to Rasterization', content: topic4_1 },
      { id: 'cs306-topic-4-2', slug: 'line-drawing', order: 2, title: 'Line Drawing Algorithms', content: topic4_2 },
      { id: 'cs306-topic-4-3', slug: 'polygon-filling', order: 3, title: 'Polygon Filling', content: topic4_3 },
      { id: 'cs306-topic-4-4', slug: 'depth-buffering', order: 4, title: 'Depth Buffering', content: topic4_4 },
      { id: 'cs306-topic-4-5', slug: 'antialiasing', order: 5, title: 'Antialiasing', content: topic4_5 },
      { id: 'cs306-topic-4-6', slug: 'triangle-rasterization', order: 6, title: 'Triangle Rasterization', content: topic4_6 },
      { id: 'cs306-topic-4-7', slug: 'fragment-operations', order: 7, title: 'Fragment Operations', content: topic4_7 }
    ],
    quizIds: ['cs306-quiz-4-1', 'cs306-quiz-4-2', 'cs306-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs306-topic-5',
    title: 'Shading and Lighting',
    content: 'Explore illumination models, light sources, the Phong reflection model, shading techniques, and how to create realistic materials and surfaces.',
    subtopics: [
      { id: 'cs306-topic-5-1', slug: 'illumination-basics', order: 1, title: 'Illumination Fundamentals', content: topic5_1 },
      { id: 'cs306-topic-5-2', slug: 'light-sources', order: 2, title: 'Light Sources', content: topic5_2 },
      { id: 'cs306-topic-5-3', slug: 'phong-model', order: 3, title: 'Phong Reflection Model', content: topic5_3 },
      { id: 'cs306-topic-5-4', slug: 'shading-models', order: 4, title: 'Shading Models', content: topic5_4 },
      { id: 'cs306-topic-5-5', slug: 'materials', order: 5, title: 'Materials', content: topic5_5 },
      { id: 'cs306-topic-5-6', slug: 'vertex-fragment-shaders', order: 6, title: 'Vertex and Fragment Shaders', content: topic5_6 },
      { id: 'cs306-topic-5-7', slug: 'advanced-shading', order: 7, title: 'Advanced Shading Techniques', content: topic5_7 }
    ],
    quizIds: ['cs306-quiz-5-1', 'cs306-quiz-5-2', 'cs306-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs306-topic-6',
    title: 'Texture Mapping',
    content: 'Learn texture mapping techniques including UV coordinates, filtering methods, mipmapping, normal maps, and environment mapping for realistic surface detail.',
    subtopics: [
      { id: 'cs306-topic-6-1', slug: 'texture-basics', order: 1, title: 'Texture Mapping Basics', content: topic6_1 },
      { id: 'cs306-topic-6-2', slug: 'uv-mapping', order: 2, title: 'UV Mapping', content: topic6_2 },
      { id: 'cs306-topic-6-3', slug: 'texture-filtering', order: 3, title: 'Texture Filtering', content: topic6_3 },
      { id: 'cs306-topic-6-4', slug: 'mipmapping', order: 4, title: 'Mipmapping', content: topic6_4 },
      { id: 'cs306-topic-6-5', slug: 'normal-mapping', order: 5, title: 'Normal Mapping', content: topic6_5 },
      { id: 'cs306-topic-6-6', slug: 'environment-mapping', order: 6, title: 'Environment Mapping', content: topic6_6 },
      { id: 'cs306-topic-6-7', slug: 'procedural-textures', order: 7, title: 'Procedural Textures', content: topic6_7 }
    ],
    quizIds: ['cs306-quiz-6-1', 'cs306-quiz-6-2', 'cs306-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs306-topic-7',
    title: 'Ray Tracing and Global Illumination',
    content: 'Explore ray tracing algorithms, ray-object intersection, shadows, reflections, refractions, and global illumination techniques for photorealistic rendering.',
    subtopics: [
      { id: 'cs306-topic-7-1', slug: 'ray-tracing-intro', order: 1, title: 'Introduction to Ray Tracing', content: topic7_1 },
      { id: 'cs306-topic-7-2', slug: 'ray-intersection', order: 2, title: 'Ray-Object Intersection', content: topic7_2 },
      { id: 'cs306-topic-7-3', slug: 'shadows', order: 3, title: 'Shadows', content: topic7_3 },
      { id: 'cs306-topic-7-4', slug: 'reflections-refractions', order: 4, title: 'Reflections and Refractions', content: topic7_4 },
      { id: 'cs306-topic-7-5', slug: 'global-illumination', order: 5, title: 'Global Illumination', content: topic7_5 },
      { id: 'cs306-topic-7-6', slug: 'acceleration-structures', order: 6, title: 'Acceleration Structures', content: topic7_6 },
      { id: 'cs306-topic-7-7', slug: 'path-tracing', order: 7, title: 'Path Tracing', content: topic7_7 }
    ],
    quizIds: ['cs306-quiz-7-1', 'cs306-quiz-7-2', 'cs306-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs306-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
