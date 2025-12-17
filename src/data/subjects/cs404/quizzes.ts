import { Quiz } from '../../../core/types';

export const cs404Quizzes: Quiz[] = [
  {
    id: 'cs404-quiz-1',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Project Planning Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the primary goal of defining an MVP (Minimum Viable Product)?',
        options: [
          'To build the smallest possible product',
          'To deliver the minimum features that provide value and can be built within constraints',
          'To create a prototype for testing only',
          'To avoid building complex features'
        ],
        correctAnswer: 1,
        explanation: 'An MVP includes the minimum set of features that solve the core problem, deliver value to users, and can be realistically built within time and resource constraints.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which requirement type describes "The system must load pages in under 2 seconds"?',
        options: [
          'Functional requirement',
          'Non-functional requirement',
          'Business requirement',
          'User requirement'
        ],
        correctAnswer: 1,
        explanation: 'This is a non-functional requirement because it specifies HOW the system should perform (performance constraint) rather than WHAT it should do.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'In the MoSCoW prioritization method, what does "Should Have" mean?',
        options: [
          'Must be included in MVP',
          'Important but not vital; can be delayed if necessary',
          'Nice to have if time permits',
          'Out of scope for this release'
        ],
        correctAnswer: 1,
        explanation: '"Should Have" features are important and add significant value, but the project can still succeed without them in the initial release.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the most appropriate buffer percentage to include in a capstone project timeline?',
        options: [
          '5-10%',
          '20-30%',
          '50-60%',
          'No buffer needed'
        ],
        correctAnswer: 1,
        explanation: 'A 20-30% buffer accounts for unexpected challenges, learning curves, and typical estimation errors in software projects.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which of the following is a well-written user story?',
        options: [
          'The system needs authentication',
          'As a user, I want to log in',
          'As a registered user, I want to reset my password via email so that I can regain access if I forget it',
          'Add password reset feature'
        ],
        correctAnswer: 2,
        explanation: 'A good user story follows the format: "As a [user type], I want to [action] so that [benefit]". Option 3 is complete with role, action, and goal.'
      }
    ]
  },
  {
    id: 'cs404-quiz-2',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Architecture and Design',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which architectural pattern is most appropriate for a typical capstone web application?',
        options: [
          'Microservices',
          'Event-driven architecture',
          'Layered monolithic architecture',
          'Peer-to-peer architecture'
        ],
        correctAnswer: 2,
        explanation: 'A layered monolithic architecture is most appropriate for capstone projects. It provides clear structure without the complexity of microservices.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of the Repository pattern?',
        options: [
          'To store code in version control',
          'To separate data access logic from business logic',
          'To cache database queries',
          'To manage user sessions'
        ],
        correctAnswer: 1,
        explanation: 'The Repository pattern abstracts data access, allowing business logic to work with data without knowing database implementation details.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'In database design, what does Third Normal Form (3NF) eliminate?',
        options: [
          'All data redundancy',
          'Transitive dependencies',
          'Partial dependencies',
          'Multi-valued dependencies'
        ],
        correctAnswer: 1,
        explanation: '3NF eliminates transitive dependencies, ensuring non-key columns depend only on the primary key, not on other non-key columns.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which HTTP status code should be returned when a user tries to access a resource they own but that doesn\'t exist?',
        options: [
          '401 Unauthorized',
          '403 Forbidden',
          '404 Not Found',
          '422 Unprocessable Entity'
        ],
        correctAnswer: 2,
        explanation: '404 Not Found is appropriate when the resource doesn\'t exist, regardless of authentication status.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which design pattern is most appropriate for implementing different carbon calculation algorithms based on activity category?',
        options: [
          'Singleton',
          'Observer',
          'Strategy',
          'Decorator'
        ],
        correctAnswer: 2,
        explanation: 'The Strategy pattern is perfect for swapping between different algorithms (calculation methods) at runtime based on context (activity category).'
      }
    ]
  },
  {
    id: 'cs404-quiz-3',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Testing Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the testing pyramid principle?',
        options: [
          'More E2E tests, fewer unit tests',
          'Equal amounts of all test types',
          'More unit tests at the base, fewer E2E tests at the top',
          'Only write E2E tests for full coverage'
        ],
        correctAnswer: 2,
        explanation: 'The testing pyramid recommends many fast unit tests at the base, fewer integration tests in the middle, and few slow E2E tests at the top.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the primary advantage of unit tests over integration tests?',
        options: [
          'They test more code at once',
          'They are faster and easier to debug',
          'They don\'t require mocking',
          'They test real user scenarios'
        ],
        correctAnswer: 1,
        explanation: 'Unit tests are fast because they test small pieces in isolation, and failures pinpoint exactly which unit is broken.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is an appropriate test coverage target for a capstone project?',
        options: [
          '100% coverage of all code',
          '70%+ coverage of critical paths',
          '30-40% coverage is sufficient',
          'No specific target needed'
        ],
        correctAnswer: 1,
        explanation: '70%+ coverage of critical business logic and core functionality is realistic and valuable for capstone projects, without requiring 100% coverage.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'When writing tests, what does the "Arrange-Act-Assert" pattern mean?',
        options: [
          'Set up test data, execute code, verify results',
          'Write tests in alphabetical order',
          'Test arrangement of UI components',
          'Assert before acting to catch errors'
        ],
        correctAnswer: 0,
        explanation: 'AAA pattern structures tests: Arrange (set up), Act (execute the code being tested), Assert (verify the outcome).'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which testing approach simulates real user interactions through the entire application?',
        options: [
          'Unit testing',
          'Integration testing',
          'End-to-end testing',
          'Snapshot testing'
        ],
        correctAnswer: 2,
        explanation: 'E2E tests simulate real user workflows through the full application stack, from UI to database.'
      }
    ]
  },
  {
    id: 'cs404-quiz-4',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Deployment and DevOps',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the main benefit of Continuous Integration (CI)?',
        options: [
          'Automatic deployment to production',
          'Early detection of integration issues',
          'Eliminates need for testing',
          'Reduces code complexity'
        ],
        correctAnswer: 1,
        explanation: 'CI automatically builds and tests code on every commit, catching integration issues early before they compound.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which platform is recommended for deploying Next.js applications?',
        options: [
          'AWS EC2',
          'Vercel',
          'Kubernetes',
          'Traditional web hosting'
        ],
        correctAnswer: 1,
        explanation: 'Vercel is built specifically for Next.js (by the same team), offering automatic deployments, serverless functions, and excellent developer experience.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the purpose of environment variables in deployment?',
        options: [
          'To make code run faster',
          'To separate configuration from code',
          'To track deployment history',
          'To compress application size'
        ],
        correctAnswer: 1,
        explanation: 'Environment variables externalize configuration (API keys, database URLs) so code can run in different environments without changes.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What should you do first when a production deployment fails?',
        options: [
          'Debug the issue in production',
          'Rollback to the previous working version',
          'Notify users about the issue',
          'Delete the deployment'
        ],
        correctAnswer: 1,
        explanation: 'Always rollback first to restore service, then debug the issue in a non-production environment.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the main purpose of application monitoring tools like Sentry?',
        options: [
          'To prevent errors from occurring',
          'To detect and track errors in production',
          'To automatically fix bugs',
          'To improve application performance'
        ],
        correctAnswer: 1,
        explanation: 'Monitoring tools track errors and exceptions in production, providing stack traces and context to help debug issues.'
      }
    ]
  }
];
