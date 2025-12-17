import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/cs404/topic-1/01-project-selection.md?raw';
import topic1_2 from '../../../content/subjects/cs404/topic-1/02-requirements-gathering.md?raw';
import topic1_3 from '../../../content/subjects/cs404/topic-1/03-scope-definition.md?raw';
import topic1_4 from '../../../content/subjects/cs404/topic-1/04-timeline-planning.md?raw';
import topic1_5 from '../../../content/subjects/cs404/topic-1/05-risk-assessment.md?raw';
import topic1_6 from '../../../content/subjects/cs404/topic-1/06-resource-planning.md?raw';
import topic1_7 from '../../../content/subjects/cs404/topic-1/07-proposal-writing.md?raw';

import topic2_1 from '../../../content/subjects/cs404/topic-2/01-system-architecture.md?raw';
import topic2_2 from '../../../content/subjects/cs404/topic-2/02-design-patterns.md?raw';
import topic2_3 from '../../../content/subjects/cs404/topic-2/03-database-design.md?raw';
import topic2_4 from '../../../content/subjects/cs404/topic-2/04-api-design.md?raw';
import topic2_5 from '../../../content/subjects/cs404/topic-2/05-security-design.md?raw';
import topic2_6 from '../../../content/subjects/cs404/topic-2/06-scalability.md?raw';
import topic2_7 from '../../../content/subjects/cs404/topic-2/07-tech-stack.md?raw';

import topic3_1 from '../../../content/subjects/cs404/topic-3/01-dev-environment.md?raw';
import topic3_2 from '../../../content/subjects/cs404/topic-3/02-version-control.md?raw';
import topic3_3 from '../../../content/subjects/cs404/topic-3/03-core-features.md?raw';
import topic3_4 from '../../../content/subjects/cs404/topic-3/04-backend-dev.md?raw';
import topic3_5 from '../../../content/subjects/cs404/topic-3/05-frontend-dev.md?raw';
import topic3_6 from '../../../content/subjects/cs404/topic-3/06-integration.md?raw';
import topic3_7 from '../../../content/subjects/cs404/topic-3/07-code-review.md?raw';

import topic4_1 from '../../../content/subjects/cs404/topic-4/01-advanced-features.md?raw';
import topic4_2 from '../../../content/subjects/cs404/topic-4/02-optimization.md?raw';
import topic4_3 from '../../../content/subjects/cs404/topic-4/03-error-handling.md?raw';
import topic4_4 from '../../../content/subjects/cs404/topic-4/04-performance.md?raw';
import topic4_5 from '../../../content/subjects/cs404/topic-4/05-accessibility.md?raw';
import topic4_6 from '../../../content/subjects/cs404/topic-4/06-internationalization.md?raw';
import topic4_7 from '../../../content/subjects/cs404/topic-4/07-refactoring.md?raw';

import topic5_1 from '../../../content/subjects/cs404/topic-5/01-testing-strategy.md?raw';
import topic5_2 from '../../../content/subjects/cs404/topic-5/02-unit-testing.md?raw';
import topic5_3 from '../../../content/subjects/cs404/topic-5/03-integration-testing.md?raw';
import topic5_4 from '../../../content/subjects/cs404/topic-5/04-e2e-testing.md?raw';
import topic5_5 from '../../../content/subjects/cs404/topic-5/05-bug-tracking.md?raw';
import topic5_6 from '../../../content/subjects/cs404/topic-5/06-test-coverage.md?raw';
import topic5_7 from '../../../content/subjects/cs404/topic-5/07-qa-process.md?raw';

import topic6_1 from '../../../content/subjects/cs404/topic-6/01-ci-cd.md?raw';
import topic6_2 from '../../../content/subjects/cs404/topic-6/02-containerization.md?raw';
import topic6_3 from '../../../content/subjects/cs404/topic-6/03-cloud-deployment.md?raw';
import topic6_4 from '../../../content/subjects/cs404/topic-6/04-monitoring.md?raw';
import topic6_5 from '../../../content/subjects/cs404/topic-6/05-logging.md?raw';
import topic6_6 from '../../../content/subjects/cs404/topic-6/06-infrastructure.md?raw';
import topic6_7 from '../../../content/subjects/cs404/topic-6/07-rollback.md?raw';

import topic7_1 from '../../../content/subjects/cs404/topic-7/01-user-documentation.md?raw';
import topic7_2 from '../../../content/subjects/cs404/topic-7/02-technical-docs.md?raw';
import topic7_3 from '../../../content/subjects/cs404/topic-7/03-api-documentation.md?raw';
import topic7_4 from '../../../content/subjects/cs404/topic-7/04-readme-writing.md?raw';
import topic7_5 from '../../../content/subjects/cs404/topic-7/05-presentation-skills.md?raw';
import topic7_6 from '../../../content/subjects/cs404/topic-7/06-demo-preparation.md?raw';
import topic7_7 from '../../../content/subjects/cs404/topic-7/07-reflection.md?raw';

export const cs404Topics: Topic[] = [
  {
    id: 'cs404-topic-1',
    title: 'Project Planning',
    content: 'Project selection, requirements gathering, scope definition, timeline, risk assessment, and proposal.',
    subtopics: [
      { id: 'cs404-topic-1-1', slug: 'project-selection', order: 1, title: 'Project Selection', content: topic1_1 },
      { id: 'cs404-topic-1-2', slug: 'requirements-gathering', order: 2, title: 'Requirements Gathering', content: topic1_2 },
      { id: 'cs404-topic-1-3', slug: 'project-scope', order: 3, title: 'Project Scope Definition', content: topic1_3 },
      { id: 'cs404-topic-1-4', slug: 'timeline-milestones', order: 4, title: 'Timeline and Milestones', content: topic1_4 },
      { id: 'cs404-topic-1-5', slug: 'risk-assessment', order: 5, title: 'Risk Assessment', content: topic1_5 },
      { id: 'cs404-topic-1-6', slug: 'resource-planning', order: 6, title: 'Resource Planning', content: topic1_6 },
      { id: 'cs404-topic-1-7', slug: 'proposal-documentation', order: 7, title: 'Proposal Documentation', content: topic1_7 }
    ],
    quizIds: ['cs404-quiz-1-1', 'cs404-quiz-1-2', 'cs404-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs404-topic-2',
    title: 'Architecture and Design',
    content: 'System architecture, design patterns, database design, API design, UI/UX, and security.',
    subtopics: [
      { id: 'cs404-topic-2-1', slug: 'system-architecture', order: 1, title: 'System Architecture', content: topic2_1 },
      { id: 'cs404-topic-2-2', slug: 'design-patterns', order: 2, title: 'Design Patterns', content: topic2_2 },
      { id: 'cs404-topic-2-3', slug: 'database-design', order: 3, title: 'Database Design', content: topic2_3 },
      { id: 'cs404-topic-2-4', slug: 'api-design', order: 4, title: 'API Design', content: topic2_4 },
      { id: 'cs404-topic-2-5', slug: 'ui-ux-design', order: 5, title: 'UI/UX Design', content: topic2_5 },
      { id: 'cs404-topic-2-6', slug: 'security-design', order: 6, title: 'Security Design', content: topic2_6 },
      { id: 'cs404-topic-2-7', slug: 'scalability-planning', order: 7, title: 'Scalability Planning', content: topic2_7 }
    ],
    quizIds: ['cs404-quiz-2-1', 'cs404-quiz-2-2', 'cs404-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs404-topic-3',
    title: 'Implementation Sprint 1',
    content: 'Development setup, core features, backend and frontend development, integration, and demo.',
    subtopics: [
      { id: 'cs404-topic-3-1', slug: 'development-setup', order: 1, title: 'Development Environment Setup', content: topic3_1 },
      { id: 'cs404-topic-3-2', slug: 'core-features', order: 2, title: 'Core Features Implementation', content: topic3_2 },
      { id: 'cs404-topic-3-3', slug: 'backend-development', order: 3, title: 'Backend Development', content: topic3_3 },
      { id: 'cs404-topic-3-4', slug: 'frontend-development', order: 4, title: 'Frontend Development', content: topic3_4 },
      { id: 'cs404-topic-3-5', slug: 'integration', order: 5, title: 'System Integration', content: topic3_5 },
      { id: 'cs404-topic-3-6', slug: 'code-review', order: 6, title: 'Code Review and Refactoring', content: topic3_6 },
      { id: 'cs404-topic-3-7', slug: 'sprint1-demo', order: 7, title: 'Sprint 1 Demo', content: topic3_7 }
    ],
    quizIds: ['cs404-quiz-3-1', 'cs404-quiz-3-2', 'cs404-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs404-topic-4',
    title: 'Implementation Sprint 2',
    content: 'Advanced features, optimization, error handling, user feedback, polish, and performance tuning.',
    subtopics: [
      { id: 'cs404-topic-4-1', slug: 'advanced-features', order: 1, title: 'Advanced Features', content: topic4_1 },
      { id: 'cs404-topic-4-2', slug: 'optimization', order: 2, title: 'Code Optimization', content: topic4_2 },
      { id: 'cs404-topic-4-3', slug: 'error-handling', order: 3, title: 'Error Handling and Validation', content: topic4_3 },
      { id: 'cs404-topic-4-4', slug: 'user-feedback', order: 4, title: 'User Feedback Integration', content: topic4_4 },
      { id: 'cs404-topic-4-5', slug: 'polish-refinement', order: 5, title: 'Polish and Refinement', content: topic4_5 },
      { id: 'cs404-topic-4-6', slug: 'performance-tuning', order: 6, title: 'Performance Tuning', content: topic4_6 },
      { id: 'cs404-topic-4-7', slug: 'sprint2-demo', order: 7, title: 'Sprint 2 Demo', content: topic4_7 }
    ],
    quizIds: ['cs404-quiz-4-1', 'cs404-quiz-4-2', 'cs404-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs404-topic-5',
    title: 'Testing and Quality Assurance',
    content: 'Testing strategy, unit testing, integration testing, E2E testing, bug fixing, and test coverage.',
    subtopics: [
      { id: 'cs404-topic-5-1', slug: 'testing-strategy', order: 1, title: 'Testing Strategy', content: topic5_1 },
      { id: 'cs404-topic-5-2', slug: 'unit-testing', order: 2, title: 'Unit Testing', content: topic5_2 },
      { id: 'cs404-topic-5-3', slug: 'integration-testing', order: 3, title: 'Integration Testing', content: topic5_3 },
      { id: 'cs404-topic-5-4', slug: 'e2e-testing', order: 4, title: 'End-to-End Testing', content: topic5_4 },
      { id: 'cs404-topic-5-5', slug: 'bug-fixing', order: 5, title: 'Bug Fixing and Debugging', content: topic5_5 },
      { id: 'cs404-topic-5-6', slug: 'qa-validation', order: 6, title: 'QA Validation', content: topic5_6 },
      { id: 'cs404-topic-5-7', slug: 'test-coverage', order: 7, title: 'Test Coverage Analysis', content: topic5_7 }
    ],
    quizIds: ['cs404-quiz-5-1', 'cs404-quiz-5-2', 'cs404-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs404-topic-6',
    title: 'Deployment and DevOps',
    content: 'Deployment preparation, CI/CD pipeline, containerization, cloud deployment, monitoring, and production launch.',
    subtopics: [
      { id: 'cs404-topic-6-1', slug: 'deployment-preparation', order: 1, title: 'Deployment Preparation', content: topic6_1 },
      { id: 'cs404-topic-6-2', slug: 'ci-cd-pipeline', order: 2, title: 'CI/CD Pipeline Setup', content: topic6_2 },
      { id: 'cs404-topic-6-3', slug: 'containerization', order: 3, title: 'Containerization with Docker', content: topic6_3 },
      { id: 'cs404-topic-6-4', slug: 'cloud-deployment', order: 4, title: 'Cloud Deployment', content: topic6_4 },
      { id: 'cs404-topic-6-5', slug: 'monitoring-logging', order: 5, title: 'Monitoring and Logging', content: topic6_5 },
      { id: 'cs404-topic-6-6', slug: 'backup-recovery', order: 6, title: 'Backup and Recovery', content: topic6_6 },
      { id: 'cs404-topic-6-7', slug: 'production-launch', order: 7, title: 'Production Launch', content: topic6_7 }
    ],
    quizIds: ['cs404-quiz-6-1', 'cs404-quiz-6-2', 'cs404-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs404-topic-7',
    title: 'Documentation and Presentation',
    content: 'User documentation, technical documentation, API docs, presentation preparation, demo video, and reflection.',
    subtopics: [
      { id: 'cs404-topic-7-1', slug: 'user-documentation', order: 1, title: 'User Documentation', content: topic7_1 },
      { id: 'cs404-topic-7-2', slug: 'technical-documentation', order: 2, title: 'Technical Documentation', content: topic7_2 },
      { id: 'cs404-topic-7-3', slug: 'api-documentation', order: 3, title: 'API Documentation', content: topic7_3 },
      { id: 'cs404-topic-7-4', slug: 'presentation-prep', order: 4, title: 'Presentation Preparation', content: topic7_4 },
      { id: 'cs404-topic-7-5', slug: 'demo-video', order: 5, title: 'Demo Video Creation', content: topic7_5 },
      { id: 'cs404-topic-7-6', slug: 'final-presentation', order: 6, title: 'Final Presentation', content: topic7_6 },
      { id: 'cs404-topic-7-7', slug: 'project-reflection', order: 7, title: 'Project Reflection', content: topic7_7 }
    ],
    quizIds: ['cs404-quiz-7-1', 'cs404-quiz-7-2', 'cs404-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs404-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
