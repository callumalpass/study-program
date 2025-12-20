/**
 * CS404 Topics
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
    title: 'Project Planning',
  },
  {
    number: 1,
    title: 'Project Selection',
  },
  {
    number: 1,
    title: 'System Architecture',
  },
  {
    number: 1,
    title: 'Development Environment Setup',
  },
  {
    number: 1,
    title: 'Advanced Features',
  },
  {
    number: 1,
    title: 'Testing Strategy',
  },
  {
    number: 1,
    title: 'Deployment Preparation',
  },
  {
    number: 1,
    title: 'User Documentation',
  },
  {
    number: 2,
    title: 'Requirements Gathering',
  },
  {
    number: 2,
    title: 'Architecture and Design',
  },
  {
    number: 2,
    title: 'Design Patterns',
  },
  {
    number: 2,
    title: 'Core Features Implementation',
  },
  {
    number: 2,
    title: 'Code Optimization',
  },
  {
    number: 2,
    title: 'Unit Testing',
  },
  {
    number: 2,
    title: 'CI/CD Pipeline Setup',
  },
  {
    number: 2,
    title: 'Technical Documentation',
  },
  {
    number: 3,
    title: 'Project Scope Definition',
  },
  {
    number: 3,
    title: 'Database Design',
  },
  {
    number: 3,
    title: 'Implementation Sprint 1',
  },
  {
    number: 3,
    title: 'Backend Development',
  },
  {
    number: 3,
    title: 'Error Handling and Validation',
  },
  {
    number: 3,
    title: 'Integration Testing',
  },
  {
    number: 3,
    title: 'Containerization with Docker',
  },
  {
    number: 3,
    title: 'API Documentation',
  },
  {
    number: 4,
    title: 'Timeline and Milestones',
  },
  {
    number: 4,
    title: 'API Design',
  },
  {
    number: 4,
    title: 'Frontend Development',
  },
  {
    number: 4,
    title: 'Implementation Sprint 2',
  },
  {
    number: 4,
    title: 'User Feedback Integration',
  },
  {
    number: 4,
    title: 'End-to-End Testing',
  },
  {
    number: 4,
    title: 'Cloud Deployment',
  },
  {
    number: 4,
    title: 'Presentation Preparation',
  },
  {
    number: 5,
    title: 'Risk Assessment',
  },
  {
    number: 5,
    title: 'UI/UX Design',
  },
  {
    number: 5,
    title: 'System Integration',
  },
  {
    number: 5,
    title: 'Polish and Refinement',
  },
  {
    number: 5,
    title: 'Testing and Quality Assurance',
  },
  {
    number: 5,
    title: 'Bug Fixing and Debugging',
  },
  {
    number: 5,
    title: 'Monitoring and Logging',
  },
  {
    number: 5,
    title: 'Demo Video Creation',
  },
  {
    number: 6,
    title: 'Resource Planning',
  },
  {
    number: 6,
    title: 'Security Design',
  },
  {
    number: 6,
    title: 'Code Review and Refactoring',
  },
  {
    number: 6,
    title: 'Performance Tuning',
  },
  {
    number: 6,
    title: 'QA Validation',
  },
  {
    number: 6,
    title: 'Deployment and DevOps',
  },
  {
    number: 6,
    title: 'Backup and Recovery',
  },
  {
    number: 6,
    title: 'Final Presentation',
  },
  {
    number: 7,
    title: 'Proposal Documentation',
    quizIds: ['cs404-quiz-1-1', 'cs404-quiz-1-2', 'cs404-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Scalability Planning',
    quizIds: ['cs404-quiz-2-1', 'cs404-quiz-2-2', 'cs404-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Sprint 1 Demo',
    quizIds: ['cs404-quiz-3-1', 'cs404-quiz-3-2', 'cs404-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Sprint 2 Demo',
    quizIds: ['cs404-quiz-4-1', 'cs404-quiz-4-2', 'cs404-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Test Coverage Analysis',
    quizIds: ['cs404-quiz-5-1', 'cs404-quiz-5-2', 'cs404-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Production Launch',
    quizIds: ['cs404-quiz-6-1', 'cs404-quiz-6-2', 'cs404-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Documentation and Presentation',
  },
  {
    number: 7,
    title: 'Project Reflection',
    quizIds: ['cs404-quiz-7-1', 'cs404-quiz-7-2', 'cs404-quiz-7-3'],
  },
];

export const cs404Topics: Topic[] = buildTopicsFromGlob('cs404', content, topicConfigs);
