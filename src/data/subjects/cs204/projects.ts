import { Project } from '../../../core/types';

export const cs204Projects: Project[] = [
  {
    id: 'cs204-project-1',
    subjectId: 'cs204',
    title: 'Agile Task Management System',
    description: 'Build a web-based task management system using Agile methodologies and best practices. This project applies software engineering principles including requirements gathering, iterative development, design patterns, testing, and version control to create a real-world application.',
    requirements: [
      'Implement user stories with acceptance criteria following the INVEST principles',
      'Use a layered architecture (presentation, business logic, data access layers)',
      'Apply at least 3 design patterns appropriately (e.g., Singleton for configuration, Observer for notifications, Strategy for task prioritization)',
      'Create UML diagrams: class diagram showing main entities and relationships, sequence diagram for key user interactions',
      'Implement comprehensive unit tests with at least 80% code coverage',
      'Use Git for version control with a branching strategy (feature branches, pull requests)',
      'Set up a CI/CD pipeline that runs tests automatically on every commit',
      'Conduct code reviews using pull requests before merging to main branch',
      'Track technical debt and create a plan to address it',
      'Document the system architecture, key design decisions, and API if applicable',
      'Implement at least these features: user authentication, create/edit/delete tasks, assign tasks to users, filter/search tasks, task status workflow'
    ],
    rubric: [
      {
        name: 'Requirements and Planning',
        weight: 15,
        levels: [
          { score: 100, label: 'Excellent', description: 'Well-defined user stories with clear acceptance criteria, comprehensive requirements document' },
          { score: 75, label: 'Good', description: 'User stories present with acceptance criteria, adequate requirements documentation' },
          { score: 50, label: 'Satisfactory', description: 'Basic user stories but missing some acceptance criteria' },
          { score: 25, label: 'Needs Improvement', description: 'Poorly defined or missing requirements' }
        ]
      },
      {
        name: 'Architecture and Design',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Clean layered architecture, appropriate design patterns, comprehensive UML diagrams' },
          { score: 75, label: 'Good', description: 'Good architecture with design patterns, UML diagrams present' },
          { score: 50, label: 'Satisfactory', description: 'Basic architecture, some patterns used, minimal diagrams' },
          { score: 25, label: 'Needs Improvement', description: 'Poor architecture, no patterns or diagrams' }
        ]
      },
      {
        name: 'Implementation Quality',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'High-quality code following SOLID principles, good naming, minimal code smells' },
          { score: 75, label: 'Good', description: 'Good code quality with minor issues, mostly follows best practices' },
          { score: 50, label: 'Satisfactory', description: 'Functional code but with code smells and inconsistencies' },
          { score: 25, label: 'Needs Improvement', description: 'Poor code quality, major issues' }
        ]
      },
      {
        name: 'Testing',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Comprehensive test suite with >80% coverage, unit and integration tests' },
          { score: 75, label: 'Good', description: 'Good test coverage (60-80%), mostly unit tests' },
          { score: 50, label: 'Satisfactory', description: 'Basic tests, <60% coverage' },
          { score: 25, label: 'Needs Improvement', description: 'Minimal or no tests' }
        ]
      },
      {
        name: 'Process and Collaboration',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Excellent Git usage, CI/CD pipeline working, code reviews documented' },
          { score: 75, label: 'Good', description: 'Good version control, CI/CD setup, some code reviews' },
          { score: 50, label: 'Satisfactory', description: 'Basic version control, minimal automation' },
          { score: 25, label: 'Needs Improvement', description: 'Poor version control practices' }
        ]
      }
    ],
    estimatedHours: 25,
    scaffolding: {
      overview: 'This project simulates a real-world Agile development process. You will plan, design, implement, test, and deploy a task management system while following software engineering best practices throughout.',
      gettingStarted: [
        'Start by gathering requirements and writing user stories with acceptance criteria',
        'Create a product backlog and prioritize stories using MoSCoW method',
        'Design the system architecture and create UML diagrams',
        'Set up Git repository with appropriate branching strategy',
        'Configure CI/CD pipeline (GitHub Actions, GitLab CI, or similar)',
        'Implement features iteratively in sprints, starting with core functionality'
      ],
      milestones: [
        'Requirements documented, user stories defined with acceptance criteria',
        'UML diagrams created, architecture designed',
        'Core authentication and user management implemented with tests',
        'Task CRUD operations implemented with tests',
        'Task workflow and assignment features complete',
        'CI/CD pipeline configured and running',
        'All features complete, comprehensive tests passing',
        'Documentation complete, code reviewed'
      ],
      tips: [
        'Use Test-Driven Development: write tests before implementation',
        'Commit frequently with clear, descriptive commit messages',
        'Create pull requests for all features and conduct self-review before requesting team review',
        'Refactor regularly to avoid accumulating technical debt',
        'Use design patterns where they genuinely simplify the design, not just for the sake of using them',
        'Document design decisions and rationale in a DESIGN.md file',
        'Consider using a task board (Trello, Jira, or GitHub Projects) to track progress',
        'For the Observer pattern, consider implementing real-time notifications',
        'For the Strategy pattern, consider different task prioritization algorithms'
      ]
    }
  },
  {
    id: 'cs204-project-2',
    subjectId: 'cs204',
    title: 'Software Testing Framework',
    description: 'Develop a lightweight testing framework similar to JUnit or pytest that demonstrates understanding of testing principles, test automation, and software design. This project focuses on test-driven development, design patterns, and creating maintainable, well-documented code.',
    requirements: [
      'Implement a test runner that discovers and executes test methods',
      'Support test fixtures (setup and teardown methods)',
      'Provide assertion methods (assertEqual, assertTrue, assertFalse, assertRaises, etc.)',
      'Generate test reports showing passed/failed tests with execution time',
      'Support test suites to organize and group related tests',
      'Implement test isolation (each test runs independently)',
      'Support test parameterization (run same test with different inputs)',
      'Provide mock/stub functionality for test doubles',
      'Include comprehensive documentation with usage examples',
      'Use the framework to test itself (dogfooding)',
      'Apply design patterns: Template Method for test execution, Decorator for test fixtures, Singleton for test runner configuration'
    ],
    rubric: [
      {
        name: 'Core Functionality',
        weight: 30,
        levels: [
          { score: 100, label: 'Excellent', description: 'All core features work correctly, test discovery and execution robust' },
          { score: 75, label: 'Good', description: 'Core features work with minor issues' },
          { score: 50, label: 'Satisfactory', description: 'Basic functionality works but limited features' },
          { score: 25, label: 'Needs Improvement', description: 'Core functionality broken or incomplete' }
        ]
      },
      {
        name: 'Design Patterns and Architecture',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Appropriate design patterns applied, clean extensible architecture' },
          { score: 75, label: 'Good', description: 'Design patterns used appropriately with good structure' },
          { score: 50, label: 'Satisfactory', description: 'Some patterns used but architecture could improve' },
          { score: 25, label: 'Needs Improvement', description: 'Poor design, patterns missing or misused' }
        ]
      },
      {
        name: 'Testing and Quality',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Framework thoroughly tests itself, high coverage, robust error handling' },
          { score: 75, label: 'Good', description: 'Good self-testing with adequate coverage' },
          { score: 50, label: 'Satisfactory', description: 'Basic self-tests, limited coverage' },
          { score: 25, label: 'Needs Improvement', description: 'Minimal or no self-testing' }
        ]
      },
      {
        name: 'Documentation and Examples',
        weight: 15,
        levels: [
          { score: 100, label: 'Excellent', description: 'Comprehensive documentation, clear examples, API well-documented' },
          { score: 75, label: 'Good', description: 'Good documentation with examples' },
          { score: 50, label: 'Satisfactory', description: 'Basic documentation, few examples' },
          { score: 25, label: 'Needs Improvement', description: 'Poor or missing documentation' }
        ]
      },
      {
        name: 'Advanced Features',
        weight: 10,
        levels: [
          { score: 100, label: 'Excellent', description: 'Parameterization, mocking, and test suites all implemented well' },
          { score: 75, label: 'Good', description: 'Most advanced features implemented' },
          { score: 50, label: 'Satisfactory', description: 'Some advanced features present' },
          { score: 25, label: 'Needs Improvement', description: 'Advanced features missing' }
        ]
      }
    ],
    estimatedHours: 22,
    scaffolding: {
      overview: 'Build a testing framework from scratch to understand how testing tools work internally. This project reinforces test-driven development, design patterns, and API design principles.',
      gettingStarted: [
        'Start with a simple test runner that can find and execute test methods',
        'Implement basic assertions (assertEqual, assertTrue)',
        'Add setup/teardown fixture support using Template Method pattern',
        'Implement test result collection and reporting',
        'Add test discovery using reflection/introspection',
        'Implement advanced features like parameterization and mocking'
      ],
      milestones: [
        'Basic test runner executing marked test methods',
        'Assertion methods implemented',
        'Setup/teardown fixtures working',
        'Test reporting with pass/fail/error counts',
        'Test discovery from modules/packages',
        'Test suites for organizing tests',
        'Parameterized tests support',
        'Mock/stub support for test doubles',
        'Complete documentation with examples'
      ],
      tips: [
        'Use decorators (Python) or annotations (Java) to mark test methods',
        'The Template Method pattern is perfect for the test execution lifecycle',
        'Use the Composite pattern to represent test suites as collections of tests',
        'For test discovery, use reflection to find methods starting with "test_"',
        'Store test results in a structured format for easy reporting',
        'Use your own framework to test itself - this validates the design',
        'Consider using colors in console output for better readability',
        'For mocking, create a Mock class that records method calls and can return configured values',
        'Study existing frameworks (JUnit, pytest, Mocha) for inspiration but implement from scratch'
      ]
    }
  },
  {
    id: 'cs204-project-3',
    subjectId: 'cs204',
    title: 'CI/CD Pipeline for Microservices',
    description: 'Design and implement a continuous integration and deployment pipeline for a microservices-based application. This project demonstrates understanding of DevOps practices, automated testing, containerization, and deployment strategies in a modern software engineering context.',
    requirements: [
      'Create a simple microservices application (at least 2 services, e.g., API gateway and a backend service)',
      'Containerize each service using Docker with appropriate Dockerfiles',
      'Set up version control with a clear branching strategy (Git Flow or trunk-based)',
      'Implement CI pipeline that: runs linting, executes unit tests, builds Docker images, runs integration tests',
      'Implement CD pipeline that: deploys to staging environment, runs smoke tests, deploys to production with approval gate',
      'Use infrastructure as code (Docker Compose or Kubernetes manifests) to define deployments',
      'Implement health checks and readiness probes for services',
      'Set up automated rollback on deployment failure',
      'Configure environment-specific settings (dev, staging, production)',
      'Include monitoring and logging setup (basic metrics and logs collection)',
      'Document the pipeline architecture and deployment process'
    ],
    rubric: [
      {
        name: 'Application Architecture',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Well-designed microservices with clear separation of concerns, proper communication' },
          { score: 75, label: 'Good', description: 'Good microservices design with minor issues' },
          { score: 50, label: 'Satisfactory', description: 'Basic microservices architecture, some coupling' },
          { score: 25, label: 'Needs Improvement', description: 'Poor architecture or not truly microservices' }
        ]
      },
      {
        name: 'CI Pipeline',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Comprehensive CI with linting, testing, building, all automated and fast' },
          { score: 75, label: 'Good', description: 'Good CI pipeline with most stages automated' },
          { score: 50, label: 'Satisfactory', description: 'Basic CI with some automation' },
          { score: 25, label: 'Needs Improvement', description: 'Minimal or broken CI pipeline' }
        ]
      },
      {
        name: 'CD Pipeline',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Sophisticated CD with staging, approval gates, rollback, environment configs' },
          { score: 75, label: 'Good', description: 'Good CD pipeline with deployment automation' },
          { score: 50, label: 'Satisfactory', description: 'Basic deployment automation' },
          { score: 25, label: 'Needs Improvement', description: 'Minimal or manual deployment' }
        ]
      },
      {
        name: 'Containerization and Infrastructure',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Optimized Dockerfiles, infrastructure as code, proper orchestration' },
          { score: 75, label: 'Good', description: 'Good containerization and infrastructure setup' },
          { score: 50, label: 'Satisfactory', description: 'Basic Docker containers and deployment' },
          { score: 25, label: 'Needs Improvement', description: 'Poor containerization or infrastructure' }
        ]
      },
      {
        name: 'Documentation and Best Practices',
        weight: 10,
        levels: [
          { score: 100, label: 'Excellent', description: 'Comprehensive documentation, follows DevOps best practices' },
          { score: 75, label: 'Good', description: 'Good documentation and practices' },
          { score: 50, label: 'Satisfactory', description: 'Basic documentation' },
          { score: 25, label: 'Needs Improvement', description: 'Poor or missing documentation' }
        ]
      }
    ],
    estimatedHours: 28,
    scaffolding: {
      overview: 'Build a complete CI/CD pipeline for microservices, experiencing the full DevOps workflow from code commit to production deployment. This project integrates version control, automated testing, containerization, and deployment strategies.',
      gettingStarted: [
        'Create two simple microservices (e.g., a REST API and a data service)',
        'Write unit and integration tests for both services',
        'Create Dockerfiles for each service',
        'Set up a CI/CD platform (GitHub Actions, GitLab CI, Jenkins, or CircleCI)',
        'Define CI stages: lint → test → build → integration test',
        'Define CD stages: deploy to staging → smoke test → manual approval → deploy to production',
        'Create Docker Compose or Kubernetes manifests for deployment'
      ],
      milestones: [
        'Microservices application working locally',
        'Unit tests passing for all services',
        'Dockerfiles created and images building successfully',
        'CI pipeline running tests and building images on every push',
        'Integration tests running in CI pipeline',
        'CD pipeline deploying to staging environment automatically',
        'Production deployment with approval gate working',
        'Rollback mechanism implemented and tested',
        'Monitoring and logging configured',
        'Complete documentation of pipeline and deployment process'
      ],
      tips: [
        'Keep services simple - focus on the pipeline, not complex business logic',
        'Use multi-stage Docker builds to optimize image size',
        'Tag Docker images with git commit SHA for traceability',
        'Use environment variables for configuration across environments',
        'For health checks, implement a /health endpoint in each service',
        'Use Docker Compose for local development and testing',
        'Consider using Kubernetes minikube for local orchestration testing',
        'Implement smoke tests that verify critical functionality after deployment',
        'For rollback, keep previous Docker images and redeploy if health checks fail',
        'Use secrets management for sensitive configuration (API keys, passwords)',
        'Document the pipeline architecture with a diagram showing all stages and decision points'
      ]
    }
  }
];
