/**
 * CS306 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'Graphics Pipeline Fundamentals',
  },
  {
    number: 1,
    title: 'Introduction to Computer Graphics',
  },
  {
    number: 1,
    title: 'Transformation Basics',
  },
  {
    number: 1,
    title: 'The Viewing Pipeline',
  },
  {
    number: 1,
    title: 'Introduction to Rasterization',
  },
  {
    number: 1,
    title: 'Illumination Fundamentals',
  },
  {
    number: 1,
    title: 'Texture Mapping Basics',
  },
  {
    number: 1,
    title: 'Introduction to Ray Tracing',
  },
  {
    number: 2,
    title: 'Graphics Hardware',
  },
  {
    number: 2,
    title: '2D and 3D Transformations',
  },
  {
    number: 2,
    title: 'Translation and Scaling',
  },
  {
    number: 2,
    title: 'Camera Models',
  },
  {
    number: 2,
    title: 'Line Drawing Algorithms',
  },
  {
    number: 2,
    title: 'Light Sources',
  },
  {
    number: 2,
    title: 'UV Mapping',
  },
  {
    number: 2,
    title: 'Ray-Object Intersection',
  },
  {
    number: 3,
    title: 'The Rendering Pipeline',
  },
  {
    number: 3,
    title: 'Rotation',
  },
  {
    number: 3,
    title: 'Viewing and Projection',
  },
  {
    number: 3,
    title: 'View Transformation',
  },
  {
    number: 3,
    title: 'Polygon Filling',
  },
  {
    number: 3,
    title: 'Phong Reflection Model',
  },
  {
    number: 3,
    title: 'Texture Filtering',
  },
  {
    number: 3,
    title: 'Shadows',
  },
  {
    number: 4,
    title: 'Graphics APIs',
  },
  {
    number: 4,
    title: 'Homogeneous Coordinates',
  },
  {
    number: 4,
    title: 'Orthographic Projection',
  },
  {
    number: 4,
    title: 'Rasterization',
  },
  {
    number: 4,
    title: 'Depth Buffering',
  },
  {
    number: 4,
    title: 'Shading Models',
  },
  {
    number: 4,
    title: 'Mipmapping',
  },
  {
    number: 4,
    title: 'Reflections and Refractions',
  },
  {
    number: 5,
    title: 'Coordinate Systems',
  },
  {
    number: 5,
    title: 'Composite Transformations',
  },
  {
    number: 5,
    title: 'Perspective Projection',
  },
  {
    number: 5,
    title: 'Antialiasing',
  },
  {
    number: 5,
    title: 'Shading and Lighting',
  },
  {
    number: 5,
    title: 'Materials',
  },
  {
    number: 5,
    title: 'Normal Mapping',
  },
  {
    number: 5,
    title: 'Global Illumination',
  },
  {
    number: 6,
    title: 'Graphics Primitives',
  },
  {
    number: 6,
    title: '3D Transformations',
  },
  {
    number: 6,
    title: 'Viewport Transform',
  },
  {
    number: 6,
    title: 'Triangle Rasterization',
  },
  {
    number: 6,
    title: 'Vertex and Fragment Shaders',
  },
  {
    number: 6,
    title: 'Texture Mapping',
  },
  {
    number: 6,
    title: 'Environment Mapping',
  },
  {
    number: 6,
    title: 'Acceleration Structures',
  },
  {
    number: 7,
    title: 'Colors and Framebuffers',
    quizIds: ['cs306-quiz-1-1', 'cs306-quiz-1-2', 'cs306-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Quaternions',
    quizIds: ['cs306-quiz-2-1', 'cs306-quiz-2-2', 'cs306-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Clipping',
    quizIds: ['cs306-quiz-3-1', 'cs306-quiz-3-2', 'cs306-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Fragment Operations',
    quizIds: ['cs306-quiz-4-1', 'cs306-quiz-4-2', 'cs306-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Advanced Shading Techniques',
    quizIds: ['cs306-quiz-5-1', 'cs306-quiz-5-2', 'cs306-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Procedural Textures',
    quizIds: ['cs306-quiz-6-1', 'cs306-quiz-6-2', 'cs306-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Ray Tracing and Global Illumination',
  },
  {
    number: 7,
    title: 'Path Tracing',
    quizIds: ['cs306-quiz-7-1', 'cs306-quiz-7-2', 'cs306-quiz-7-3'],
  },
];

export const cs306Topics: Topic[] = buildTopicsFromGlob('cs306', content, topicConfigs);
