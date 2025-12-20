import type { CourseTemplate } from '@/core/types';
import { curriculum } from './curriculum';

/**
 * Pre-built course templates for common learning paths.
 * Users can start from these templates and customize their selection.
 */

// Helper to calculate total hours for a set of subject IDs
function calculateHours(subjectIds: string[]): number {
  return curriculum
    .filter(s => subjectIds.includes(s.id))
    .reduce((sum, s) => sum + s.estimatedHours, 0);
}

// All subject IDs
const ALL_SUBJECTS = curriculum.map(s => s.id);

// CS subjects only
const CS_SUBJECTS = curriculum.filter(s => s.category === 'cs').map(s => s.id);

// Math subjects only
const MATH_SUBJECTS = curriculum.filter(s => s.category === 'math').map(s => s.id);

// Core CS fundamentals (Year 1-2 CS + essential math)
const CS_FUNDAMENTALS = [
  'cs101', 'cs102', 'cs103', 'cs104', 'cs105',
  'cs201', 'cs202', 'cs203', 'cs204', 'cs205',
  'math101', 'math102',
];

// ML/AI focused track
const ML_AI_TRACK = [
  // Foundational CS
  'cs101', 'cs103', 'cs104', 'cs201', 'cs205',
  // ML/AI specific
  'cs402', 'cs406', 'cs407',
  // Math prerequisites for ML
  'math101', 'math102', 'math201', 'math202', 'math203', 'math204',
];

// Systems track (low-level, infrastructure)
const SYSTEMS_TRACK = [
  // Core programming
  'cs101', 'cs102', 'cs103', 'cs104', 'cs105',
  // Systems subjects
  'cs201', 'cs202', 'cs301', 'cs302', 'cs307',
  'cs401', 'cs405',
  // Supporting math
  'math101', 'math102',
];

// Theory track (mathematical/theoretical CS)
const THEORY_TRACK = [
  // Core CS
  'cs101', 'cs103', 'cs104', 'cs201', 'cs203', 'cs303', 'cs304', 'cs403',
  // Heavy math
  'math101', 'math102', 'math201', 'math202', 'math203', 'math204',
  'math301', 'math302', 'math303', 'math304', 'math403', 'math404',
];

// Web development focus
const WEB_DEV_TRACK = [
  // Core programming
  'cs101', 'cs103', 'cs104',
  // Web & databases
  'cs204', 'cs205', 'cs305',
  // Deployment & cloud
  'cs302', 'cs405',
  // Capstone
  'cs404',
  // Minimal math
  'math101',
];

export const courseTemplates: CourseTemplate[] = [
  {
    id: 'full-cs-degree',
    name: 'Full CS Degree',
    description: 'The complete 4-year computer science curriculum with all 28 subjects covering CS fundamentals, theory, systems, and advanced topics.',
    subjectIds: ALL_SUBJECTS,
    estimatedHours: calculateHours(ALL_SUBJECTS),
  },
  {
    id: 'cs-fundamentals',
    name: 'CS Fundamentals',
    description: 'Core computer science subjects from Years 1-2. Perfect for building a strong programming and CS foundation.',
    subjectIds: CS_FUNDAMENTALS,
    estimatedHours: calculateHours(CS_FUNDAMENTALS),
  },
  {
    id: 'math-foundation',
    name: 'Math Foundation',
    description: 'All mathematics subjects from discrete math through topology and optimization. Ideal for theoretical depth.',
    subjectIds: MATH_SUBJECTS,
    estimatedHours: calculateHours(MATH_SUBJECTS),
  },
  {
    id: 'ml-ai-track',
    name: 'ML/AI Track',
    description: 'Machine learning and AI focused path including the math prerequisites. Leads to ML, AI, and Data Science.',
    subjectIds: ML_AI_TRACK,
    estimatedHours: calculateHours(ML_AI_TRACK),
  },
  {
    id: 'systems-track',
    name: 'Systems Track',
    description: 'Low-level systems programming: architecture, operating systems, networks, security, and cloud infrastructure.',
    subjectIds: SYSTEMS_TRACK,
    estimatedHours: calculateHours(SYSTEMS_TRACK),
  },
  {
    id: 'theory-track',
    name: 'Theory Track',
    description: 'Theoretical computer science with heavy mathematics. Covers computation theory, algorithms, and pure math.',
    subjectIds: THEORY_TRACK,
    estimatedHours: calculateHours(THEORY_TRACK),
  },
  {
    id: 'web-dev-track',
    name: 'Web Development',
    description: 'Practical web development path: programming, databases, web dev, cloud deployment, and a capstone project.',
    subjectIds: WEB_DEV_TRACK,
    estimatedHours: calculateHours(WEB_DEV_TRACK),
  },
];

// Helper to get a template by ID
export function getTemplateById(id: string): CourseTemplate | undefined {
  return courseTemplates.find(t => t.id === id);
}

// Helper to get subject IDs for a template
export function getTemplateSubjectIds(templateId: string): string[] {
  const template = getTemplateById(templateId);
  return template?.subjectIds ?? [];
}
