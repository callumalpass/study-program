import type { Topic, Subtopic } from '../../core/types';

// Topic 1: Software Development Lifecycle
import topic1Content from './content/topic-1.md?raw';
import topic1Sub1 from './content/topic-1/01-sdlc-overview.md?raw';
import topic1Sub2 from './content/topic-1/02-waterfall-model.md?raw';
import topic1Sub3 from './content/topic-1/03-iterative-models.md?raw';
import topic1Sub4 from './content/topic-1/04-agile-introduction.md?raw';
import topic1Sub5 from './content/topic-1/05-process-improvement.md?raw';
import topic1Sub6 from './content/topic-1/06-choosing-methodology.md?raw';
import topic1Sub7 from './content/topic-1/07-modern-practices.md?raw';

// Topic 2: Requirements Engineering
import topic2Content from './content/topic-2.md?raw';
import topic2Sub1 from './content/topic-2/01-requirements-types.md?raw';
import topic2Sub2 from './content/topic-2/02-elicitation-techniques.md?raw';
import topic2Sub3 from './content/topic-2/03-documentation.md?raw';
import topic2Sub4 from './content/topic-2/04-validation.md?raw';
import topic2Sub5 from './content/topic-2/05-management.md?raw';

// Topic 3: Software Design and UML
import topic3Content from './content/topic-3.md?raw';
import topic3Sub1 from './content/topic-3/01-design-principles.md?raw';
import topic3Sub2 from './content/topic-3/02-architectural-patterns.md?raw';
import topic3Sub3 from './content/topic-3/03-uml-overview.md?raw';
import topic3Sub4 from './content/topic-3/04-class-diagrams.md?raw';
import topic3Sub5 from './content/topic-3/05-sequence-diagrams.md?raw';

// Topic 4: Design Patterns
import topic4Content from './content/topic-4.md?raw';
import topic4Sub1 from './content/topic-4/01-pattern-introduction.md?raw';
import topic4Sub2 from './content/topic-4/02-creational-patterns.md?raw';
import topic4Sub3 from './content/topic-4/03-structural-patterns.md?raw';
import topic4Sub4 from './content/topic-4/04-behavioral-patterns.md?raw';
import topic4Sub5 from './content/topic-4/05-patterns-in-practice.md?raw';

// Topic 5: Testing Strategies
import topic5Content from './content/topic-5.md?raw';
import topic5Sub1 from './content/topic-5/01-testing-fundamentals.md?raw';
import topic5Sub2 from './content/topic-5/02-unit-testing.md?raw';
import topic5Sub3 from './content/topic-5/03-integration-testing.md?raw';
import topic5Sub4 from './content/topic-5/04-system-testing.md?raw';
import topic5Sub5 from './content/topic-5/05-test-automation.md?raw';

// Topic 6: Version Control and CI/CD
import topic6Content from './content/topic-6.md?raw';
import topic6Sub1 from './content/topic-6/01-version-control-concepts.md?raw';
import topic6Sub2 from './content/topic-6/02-git-fundamentals.md?raw';
import topic6Sub3 from './content/topic-6/03-git-workflows.md?raw';
import topic6Sub4 from './content/topic-6/04-collaboration.md?raw';
import topic6Sub5 from './content/topic-6/05-ci-fundamentals.md?raw';

// Topic 7: Agile Development
import topic7Content from './content/topic-7.md?raw';
import topic7Sub1 from './content/topic-7/01-scrum-framework.md?raw';
import topic7Sub2 from './content/topic-7/02-kanban.md?raw';
import topic7Sub3 from './content/topic-7/03-user-stories.md?raw';
import topic7Sub4 from './content/topic-7/04-sprint-planning.md?raw';
import topic7Sub5 from './content/topic-7/05-retrospectives.md?raw';

// Topic 1 Subtopics
const topic1Subtopics: Subtopic[] = [
  { id: 'cs204-t1-overview', slug: 'sdlc-overview', title: 'SDLC Overview', content: topic1Sub1, order: 1 },
  { id: 'cs204-t1-waterfall', slug: 'waterfall-model', title: 'Waterfall Model', content: topic1Sub2, order: 2 },
  { id: 'cs204-t1-iterative', slug: 'iterative-models', title: 'Iterative Models', content: topic1Sub3, order: 3 },
  { id: 'cs204-t1-agile-intro', slug: 'agile-introduction', title: 'Introduction to Agile', content: topic1Sub4, order: 4 },
  { id: 'cs204-t1-improvement', slug: 'process-improvement', title: 'Process Improvement', content: topic1Sub5, order: 5 },
  { id: 'cs204-t1-choosing', slug: 'choosing-methodology', title: 'Choosing Methodology', content: topic1Sub6, order: 6 },
  { id: 'cs204-t1-modern', slug: 'modern-practices', title: 'Modern Practices', content: topic1Sub7, order: 7 },
];

// Topic 2 Subtopics
const topic2Subtopics: Subtopic[] = [
  { id: 'cs204-t2-types', slug: 'requirements-types', title: 'Requirements Types', content: topic2Sub1, order: 1 },
  { id: 'cs204-t2-elicitation', slug: 'elicitation-techniques', title: 'Elicitation Techniques', content: topic2Sub2, order: 2 },
  { id: 'cs204-t2-documentation', slug: 'documentation', title: 'Requirements Documentation', content: topic2Sub3, order: 3 },
  { id: 'cs204-t2-validation', slug: 'validation', title: 'Requirements Validation', content: topic2Sub4, order: 4 },
  { id: 'cs204-t2-management', slug: 'management', title: 'Requirements Management', content: topic2Sub5, order: 5 },
];

// Topic 3 Subtopics
const topic3Subtopics: Subtopic[] = [
  { id: 'cs204-t3-principles', slug: 'design-principles', title: 'Design Principles', content: topic3Sub1, order: 1 },
  { id: 'cs204-t3-architecture', slug: 'architectural-patterns', title: 'Architectural Patterns', content: topic3Sub2, order: 2 },
  { id: 'cs204-t3-uml', slug: 'uml-overview', title: 'UML Overview', content: topic3Sub3, order: 3 },
  { id: 'cs204-t3-class', slug: 'class-diagrams', title: 'Class Diagrams', content: topic3Sub4, order: 4 },
  { id: 'cs204-t3-sequence', slug: 'sequence-diagrams', title: 'Sequence Diagrams', content: topic3Sub5, order: 5 },
];

// Topic 4 Subtopics
const topic4Subtopics: Subtopic[] = [
  { id: 'cs204-t4-intro', slug: 'pattern-introduction', title: 'Introduction to Patterns', content: topic4Sub1, order: 1 },
  { id: 'cs204-t4-creational', slug: 'creational-patterns', title: 'Creational Patterns', content: topic4Sub2, order: 2 },
  { id: 'cs204-t4-structural', slug: 'structural-patterns', title: 'Structural Patterns', content: topic4Sub3, order: 3 },
  { id: 'cs204-t4-behavioral', slug: 'behavioral-patterns', title: 'Behavioral Patterns', content: topic4Sub4, order: 4 },
  { id: 'cs204-t4-practice', slug: 'patterns-in-practice', title: 'Patterns in Practice', content: topic4Sub5, order: 5 },
];

// Topic 5 Subtopics
const topic5Subtopics: Subtopic[] = [
  { id: 'cs204-t5-fundamentals', slug: 'testing-fundamentals', title: 'Testing Fundamentals', content: topic5Sub1, order: 1 },
  { id: 'cs204-t5-unit', slug: 'unit-testing', title: 'Unit Testing', content: topic5Sub2, order: 2 },
  { id: 'cs204-t5-integration', slug: 'integration-testing', title: 'Integration Testing', content: topic5Sub3, order: 3 },
  { id: 'cs204-t5-system', slug: 'system-testing', title: 'System Testing', content: topic5Sub4, order: 4 },
  { id: 'cs204-t5-automation', slug: 'test-automation', title: 'Test Automation', content: topic5Sub5, order: 5 },
];

// Topic 6 Subtopics
const topic6Subtopics: Subtopic[] = [
  { id: 'cs204-t6-concepts', slug: 'version-control-concepts', title: 'Version Control Concepts', content: topic6Sub1, order: 1 },
  { id: 'cs204-t6-git', slug: 'git-fundamentals', title: 'Git Fundamentals', content: topic6Sub2, order: 2 },
  { id: 'cs204-t6-workflows', slug: 'git-workflows', title: 'Git Workflows', content: topic6Sub3, order: 3 },
  { id: 'cs204-t6-collab', slug: 'collaboration', title: 'Collaboration', content: topic6Sub4, order: 4 },
  { id: 'cs204-t6-ci', slug: 'ci-fundamentals', title: 'CI Fundamentals', content: topic6Sub5, order: 5 },
];

// Topic 7 Subtopics
const topic7Subtopics: Subtopic[] = [
  { id: 'cs204-t7-scrum', slug: 'scrum-framework', title: 'Scrum Framework', content: topic7Sub1, order: 1 },
  { id: 'cs204-t7-kanban', slug: 'kanban', title: 'Kanban', content: topic7Sub2, order: 2 },
  { id: 'cs204-t7-stories', slug: 'user-stories', title: 'User Stories', content: topic7Sub3, order: 3 },
  { id: 'cs204-t7-planning', slug: 'sprint-planning', title: 'Sprint Planning', content: topic7Sub4, order: 4 },
  { id: 'cs204-t7-retro', slug: 'retrospectives', title: 'Retrospectives', content: topic7Sub5, order: 5 },
];

export const cs204Topics: Topic[] = [
  {
    id: 'cs204-topic-1',
    title: 'Software Development Lifecycle',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs204-topic-1-quiz-1', 'cs204-topic-1-quiz-2', 'cs204-topic-1-quiz-3'],
    exerciseIds: [
      'cs204-t1-ex1', 'cs204-t1-ex2', 'cs204-t1-ex3', 'cs204-t1-ex4',
      'cs204-t1-ex5', 'cs204-t1-ex6', 'cs204-t1-ex7', 'cs204-t1-ex8',
      'cs204-t1-ex9', 'cs204-t1-ex10', 'cs204-t1-ex11', 'cs204-t1-ex12',
      'cs204-t1-ex13', 'cs204-t1-ex14', 'cs204-t1-ex15', 'cs204-t1-ex16',
    ],
  },
  {
    id: 'cs204-topic-2',
    title: 'Requirements Engineering',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs204-topic-2-quiz-1', 'cs204-topic-2-quiz-2', 'cs204-topic-2-quiz-3'],
    exerciseIds: [
      'cs204-t2-ex1', 'cs204-t2-ex2', 'cs204-t2-ex3', 'cs204-t2-ex4',
      'cs204-t2-ex5', 'cs204-t2-ex6', 'cs204-t2-ex7', 'cs204-t2-ex8',
      'cs204-t2-ex9', 'cs204-t2-ex10', 'cs204-t2-ex11', 'cs204-t2-ex12',
      'cs204-t2-ex13', 'cs204-t2-ex14', 'cs204-t2-ex15', 'cs204-t2-ex16',
    ],
  },
  {
    id: 'cs204-topic-3',
    title: 'Software Design and UML',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs204-topic-3-quiz-1', 'cs204-topic-3-quiz-2', 'cs204-topic-3-quiz-3'],
    exerciseIds: [
      'cs204-t3-ex1', 'cs204-t3-ex2', 'cs204-t3-ex3', 'cs204-t3-ex4',
      'cs204-t3-ex5', 'cs204-t3-ex6', 'cs204-t3-ex7', 'cs204-t3-ex8',
      'cs204-t3-ex9', 'cs204-t3-ex10', 'cs204-t3-ex11', 'cs204-t3-ex12',
      'cs204-t3-ex13', 'cs204-t3-ex14', 'cs204-t3-ex15', 'cs204-t3-ex16',
    ],
  },
  {
    id: 'cs204-topic-4',
    title: 'Design Patterns',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs204-topic-4-quiz-1', 'cs204-topic-4-quiz-2', 'cs204-topic-4-quiz-3'],
    exerciseIds: [
      'cs204-t4-ex1', 'cs204-t4-ex2', 'cs204-t4-ex3', 'cs204-t4-ex4',
      'cs204-t4-ex5', 'cs204-t4-ex6', 'cs204-t4-ex7', 'cs204-t4-ex8',
      'cs204-t4-ex9', 'cs204-t4-ex10', 'cs204-t4-ex11', 'cs204-t4-ex12',
      'cs204-t4-ex13', 'cs204-t4-ex14', 'cs204-t4-ex15', 'cs204-t4-ex16',
    ],
  },
  {
    id: 'cs204-topic-5',
    title: 'Testing Strategies',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs204-topic-5-quiz-1', 'cs204-topic-5-quiz-2', 'cs204-topic-5-quiz-3'],
    exerciseIds: [
      'cs204-t5-ex1', 'cs204-t5-ex2', 'cs204-t5-ex3', 'cs204-t5-ex4',
      'cs204-t5-ex5', 'cs204-t5-ex6', 'cs204-t5-ex7', 'cs204-t5-ex8',
      'cs204-t5-ex9', 'cs204-t5-ex10', 'cs204-t5-ex11', 'cs204-t5-ex12',
      'cs204-t5-ex13', 'cs204-t5-ex14', 'cs204-t5-ex15', 'cs204-t5-ex16',
    ],
  },
  {
    id: 'cs204-topic-6',
    title: 'Version Control and CI/CD',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs204-topic-6-quiz-1', 'cs204-topic-6-quiz-2', 'cs204-topic-6-quiz-3'],
    exerciseIds: [
      'cs204-t6-ex1', 'cs204-t6-ex2', 'cs204-t6-ex3', 'cs204-t6-ex4',
      'cs204-t6-ex5', 'cs204-t6-ex6', 'cs204-t6-ex7', 'cs204-t6-ex8',
      'cs204-t6-ex9', 'cs204-t6-ex10', 'cs204-t6-ex11', 'cs204-t6-ex12',
      'cs204-t6-ex13', 'cs204-t6-ex14', 'cs204-t6-ex15', 'cs204-t6-ex16',
    ],
  },
  {
    id: 'cs204-topic-7',
    title: 'Agile Development',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs204-topic-7-quiz-1', 'cs204-topic-7-quiz-2', 'cs204-topic-7-quiz-3'],
    exerciseIds: [
      'cs204-t7-ex1', 'cs204-t7-ex2', 'cs204-t7-ex3', 'cs204-t7-ex4',
      'cs204-t7-ex5', 'cs204-t7-ex6', 'cs204-t7-ex7', 'cs204-t7-ex8',
      'cs204-t7-ex9', 'cs204-t7-ex10', 'cs204-t7-ex11', 'cs204-t7-ex12',
      'cs204-t7-ex13', 'cs204-t7-ex14', 'cs204-t7-ex15', 'cs204-t7-ex16',
    ],
  },
];
