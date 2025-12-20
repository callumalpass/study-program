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
    id: 'cs404-quiz-1-2',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Requirements and Scope',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the difference between functional and non-functional requirements?',
        options: [
          'Functional is what the system does, non-functional is how well it does it',
          'Functional is for users, non-functional is for developers',
          'Functional is optional, non-functional is required',
          'There is no real difference'
        ],
        correctAnswer: 0,
        explanation: 'Functional requirements define WHAT the system should do (features/behavior), while non-functional requirements define HOW WELL it should perform (performance, security, usability).'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which technique helps prevent scope creep in capstone projects?',
        options: [
          'Never talking to stakeholders',
          'Clearly defined MVP with documented out-of-scope items',
          'Accepting all feature requests immediately',
          'Avoiding written documentation'
        ],
        correctAnswer: 1,
        explanation: 'A clearly defined MVP with explicitly documented out-of-scope features helps set boundaries and manage expectations from the start.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What makes a good acceptance criterion?',
        options: [
          'Vague and open to interpretation',
          'Specific, measurable, and testable',
          'Technical implementation details',
          'Long and comprehensive documentation'
        ],
        correctAnswer: 1,
        explanation: 'Good acceptance criteria are specific, measurable, and testable so you can objectively verify when a feature is complete.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'When should you gather requirements for your capstone project?',
        options: [
          'After starting development',
          'At the very beginning, before design',
          'Continuously throughout the project',
          'Only when problems arise'
        ],
        correctAnswer: 2,
        explanation: 'Requirements gathering is continuous. Initial requirements are gathered before design, but you refine and adjust them throughout the project as you learn more.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is a spike in project planning?',
        options: [
          'A sudden increase in workload',
          'A time-boxed research task to reduce uncertainty',
          'An unexpected bug',
          'A team meeting'
        ],
        correctAnswer: 1,
        explanation: 'A spike is a time-boxed investigation or proof-of-concept to answer questions and reduce technical uncertainty before committing to implementation.'
      }
    ]
  },
  {
    id: 'cs404-quiz-1-3',
    subjectId: 'cs404',
    topicId: 'topic-1',
    title: 'Timeline and Risk Management',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the critical path in project scheduling?',
        options: [
          'The most important feature',
          'The sequence of tasks that determines minimum project duration',
          'The path through the codebase',
          'The deployment pipeline'
        ],
        correctAnswer: 1,
        explanation: 'The critical path is the sequence of dependent tasks that determines the minimum time needed to complete the project. Any delay on this path delays the entire project.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What should you do when you identify a high-impact risk early in planning?',
        options: [
          'Ignore it and hope it doesn\'t happen',
          'Create a mitigation strategy immediately',
          'Wait until it becomes a problem',
          'Change your entire project'
        ],
        correctAnswer: 1,
        explanation: 'High-impact risks should have mitigation strategies defined upfront. This might include prototypes, alternative approaches, or contingency plans.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'How should milestones be distributed in a capstone project timeline?',
        options: [
          'All at the end',
          'Evenly throughout the project',
          'Only at the beginning',
          'Randomly placed'
        ],
        correctAnswer: 1,
        explanation: 'Milestones should be evenly distributed to provide regular checkpoints for progress review and course correction throughout the project.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is a dependency in project planning?',
        options: [
          'A third-party library',
          'A task that must be completed before another can start',
          'A team member',
          'A deployment requirement'
        ],
        correctAnswer: 1,
        explanation: 'A dependency is when one task must be completed before another can begin. For example, database design must be done before implementing database queries.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What percentage of total project time should be allocated to testing and polish?',
        options: [
          '5-10%',
          '15-25%',
          '50-60%',
          '70-80%'
        ],
        correctAnswer: 1,
        explanation: 'Plan to spend 15-25% of total time on testing, bug fixes, and polish. This is often underestimated but critical for a production-quality capstone project.'
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
    id: 'cs404-quiz-2-2',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Database and API Design',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of database indexes?',
        options: [
          'To backup data',
          'To speed up query performance',
          'To enforce data types',
          'To compress data'
        ],
        correctAnswer: 1,
        explanation: 'Indexes speed up query performance by creating data structures that allow fast lookups, especially on columns frequently used in WHERE clauses or joins.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'In RESTful API design, which HTTP method should be idempotent?',
        options: [
          'POST',
          'PUT',
          'PATCH',
          'All of the above'
        ],
        correctAnswer: 1,
        explanation: 'PUT should be idempotent - making the same request multiple times should have the same effect as making it once. POST is not idempotent.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'When should you use a foreign key constraint in your database?',
        options: [
          'Never, they slow down performance',
          'When you want to enforce referential integrity',
          'Only in development environments',
          'Only for many-to-many relationships'
        ],
        correctAnswer: 1,
        explanation: 'Foreign key constraints enforce referential integrity, ensuring related records exist and preventing orphaned data when records are deleted.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is API versioning and why is it important?',
        options: [
          'Tracking git commits for the API',
          'Allowing breaking changes while supporting old clients',
          'Numbering API requests sequentially',
          'Setting expiration dates for APIs'
        ],
        correctAnswer: 1,
        explanation: 'API versioning (like /api/v1/) allows you to make breaking changes in new versions while maintaining backwards compatibility for existing clients.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which relationship cardinality requires a junction table?',
        options: [
          'One-to-one',
          'One-to-many',
          'Many-to-many',
          'None of them'
        ],
        correctAnswer: 2,
        explanation: 'Many-to-many relationships require a junction (join) table to map between the two entities, as each entity can be related to multiple instances of the other.'
      }
    ]
  },
  {
    id: 'cs404-quiz-2-3',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Security and Scalability',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of password hashing with bcrypt?',
        options: [
          'To encrypt passwords for storage',
          'To create one-way hash that cannot be reversed',
          'To compress passwords to save space',
          'To validate password format'
        ],
        correctAnswer: 1,
        explanation: 'bcrypt creates a one-way hash that cannot be reversed. You verify passwords by hashing the input and comparing hashes, never storing plain text.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is SQL injection and how do you prevent it?',
        options: [
          'A database backup technique',
          'Malicious SQL in user input; prevent with parameterized queries',
          'A method to optimize queries',
          'A way to migrate databases'
        ],
        correctAnswer: 1,
        explanation: 'SQL injection occurs when attackers insert malicious SQL in user input. Prevent it using parameterized queries/prepared statements, never string concatenation.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is CORS and why do browsers enforce it?',
        options: [
          'A database security feature',
          'Cross-Origin Resource Sharing; prevents malicious sites from accessing your API',
          'A caching strategy',
          'A compression algorithm'
        ],
        correctAnswer: 1,
        explanation: 'CORS (Cross-Origin Resource Sharing) is a security feature that prevents malicious websites from making unauthorized requests to your API from a user\'s browser.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is database connection pooling?',
        options: [
          'Backing up databases together',
          'Reusing connections instead of creating new ones for each request',
          'Storing multiple databases in one location',
          'Sharing data between databases'
        ],
        correctAnswer: 1,
        explanation: 'Connection pooling maintains a pool of reusable database connections instead of opening/closing connections for each request, improving performance.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of rate limiting in an API?',
        options: [
          'To slow down all requests equally',
          'To prevent abuse and ensure fair resource usage',
          'To cache responses',
          'To version the API'
        ],
        correctAnswer: 1,
        explanation: 'Rate limiting restricts the number of requests from a client in a time window, preventing abuse, DoS attacks, and ensuring fair resource usage.'
      }
    ]
  },
  {
    id: 'cs404-quiz-3-1',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Development Environment and Version Control',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of a .env file?',
        options: [
          'To store environment-specific configuration and secrets',
          'To track environment changes in git',
          'To document the project',
          'To configure text editors'
        ],
        correctAnswer: 0,
        explanation: '.env files store environment-specific configuration like API keys and database URLs. They should never be committed to git.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the advantage of feature branches in git?',
        options: [
          'Faster deployments',
          'Isolate changes and allow parallel development',
          'Smaller repository size',
          'Automatic testing'
        ],
        correctAnswer: 1,
        explanation: 'Feature branches isolate changes for each feature, allowing multiple developers to work in parallel without interfering with each other or the main branch.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What should you do before committing code?',
        options: [
          'Run tests and linters locally',
          'Deploy to production',
          'Delete all comments',
          'Rewrite the entire codebase'
        ],
        correctAnswer: 0,
        explanation: 'Always run tests and linters before committing to catch issues early. This prevents breaking the build for other developers.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the purpose of git hooks?',
        options: [
          'To merge branches',
          'To automatically run scripts at certain points in the git workflow',
          'To backup repositories',
          'To create branches'
        ],
        correctAnswer: 1,
        explanation: 'Git hooks are scripts that run automatically at specific points (pre-commit, pre-push) to enforce quality checks like running tests or linters.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What makes a good commit message?',
        options: [
          'Single word like "update"',
          'Describes what changed and why in clear, concise language',
          'Lists every file modified',
          'Includes the current date and time'
        ],
        correctAnswer: 1,
        explanation: 'Good commit messages clearly describe what changed and why, using imperative mood ("Add feature" not "Added feature"), and are concise but informative.'
      }
    ]
  },
  {
    id: 'cs404-quiz-3-2',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Backend Development',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is middleware in Express.js?',
        options: [
          'A database layer',
          'Functions that process requests before reaching route handlers',
          'Frontend components',
          'Database migration tools'
        ],
        correctAnswer: 1,
        explanation: 'Middleware are functions that have access to request/response objects and can modify them, run code, or end the request-response cycle.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the purpose of JWT (JSON Web Tokens)?',
        options: [
          'To format JSON responses',
          'To securely transmit authentication information between parties',
          'To compress data',
          'To validate JSON syntax'
        ],
        correctAnswer: 1,
        explanation: 'JWTs securely encode authentication/authorization information that can be verified without server-side session storage, making them stateless.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is an ORM (Object-Relational Mapping)?',
        options: [
          'A security protocol',
          'A tool that maps database tables to programming language objects',
          'A testing framework',
          'A deployment strategy'
        ],
        correctAnswer: 1,
        explanation: 'ORMs like Prisma or TypeORM map database tables to objects in your programming language, allowing you to work with type-safe objects instead of SQL.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Why should database credentials never be hardcoded?',
        options: [
          'It makes code slower',
          'They would be exposed in version control and can\'t be changed per environment',
          'It violates syntax rules',
          'It prevents code compilation'
        ],
        correctAnswer: 1,
        explanation: 'Hardcoded credentials are exposed in git history, can\'t be changed without code changes, and prevent using different credentials per environment.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of input validation?',
        options: [
          'To make code run faster',
          'To ensure data meets requirements and prevent security vulnerabilities',
          'To reduce database size',
          'To format output'
        ],
        correctAnswer: 1,
        explanation: 'Input validation ensures data meets requirements (format, type, constraints) and prevents security issues like SQL injection or malformed data.'
      }
    ]
  },
  {
    id: 'cs404-quiz-3-3',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Frontend Development and Integration',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of React hooks like useState and useEffect?',
        options: [
          'To style components',
          'To manage component state and side effects in functional components',
          'To deploy applications',
          'To test components'
        ],
        correctAnswer: 1,
        explanation: 'Hooks allow functional components to have state (useState) and perform side effects (useEffect) without needing class components.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the difference between controlled and uncontrolled form inputs in React?',
        options: [
          'Controlled inputs are disabled',
          'Controlled inputs are managed by React state, uncontrolled use DOM refs',
          'Uncontrolled inputs are more secure',
          'There is no difference'
        ],
        correctAnswer: 1,
        explanation: 'Controlled inputs are driven by React state (value={state}), giving you control and validation. Uncontrolled inputs manage their own state via DOM refs.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is AJAX and why is it important for modern web apps?',
        options: [
          'A CSS framework',
          'Asynchronous JavaScript for updating pages without full reload',
          'A database query language',
          'A deployment tool'
        ],
        correctAnswer: 1,
        explanation: 'AJAX allows asynchronous HTTP requests to fetch/send data without page reloads, enabling dynamic, responsive user experiences.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Why should API calls typically be made in useEffect, not in the component body?',
        options: [
          'useEffect makes requests faster',
          'To prevent infinite loops and control when requests are made',
          'It\'s required by React syntax',
          'To improve SEO'
        ],
        correctAnswer: 1,
        explanation: 'API calls in the component body would run on every render, causing infinite loops. useEffect with dependencies controls when calls are made.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of loading states in UI?',
        options: [
          'To slow down the application',
          'To provide feedback during async operations and improve UX',
          'To cache data',
          'To handle errors'
        ],
        correctAnswer: 1,
        explanation: 'Loading states show users that something is happening during async operations (API calls), preventing confusion and improving perceived performance.'
      }
    ]
  },
  {
    id: 'cs404-quiz-4-1',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Advanced Features and Optimization',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of React.memo()?',
        options: [
          'To save data to localStorage',
          'To prevent unnecessary re-renders of components',
          'To create memoized functions',
          'To cache API responses'
        ],
        correctAnswer: 1,
        explanation: 'React.memo() prevents components from re-rendering if their props haven\'t changed, improving performance by avoiding unnecessary renders.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is database query optimization?',
        options: [
          'Deleting old data',
          'Improving query performance through indexes, efficient queries, and avoiding N+1 problems',
          'Backing up databases',
          'Encrypting query results'
        ],
        correctAnswer: 1,
        explanation: 'Query optimization involves using indexes, writing efficient queries, avoiding N+1 problems, and using EXPLAIN to analyze query performance.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the N+1 query problem?',
        options: [
          'Having one extra query than needed',
          'Making one query for a list, then one query per item (N queries)',
          'A syntax error in queries',
          'A security vulnerability'
        ],
        correctAnswer: 1,
        explanation: 'N+1 problem: querying a list (1 query), then querying related data for each item (N queries). Fix by using joins or eager loading.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is code splitting in frontend applications?',
        options: [
          'Dividing code between frontend and backend',
          'Loading only the JavaScript needed for current page, not entire app',
          'Separating CSS from JavaScript',
          'Splitting teams across features'
        ],
        correctAnswer: 1,
        explanation: 'Code splitting loads only necessary JavaScript for the current page/route, reducing initial bundle size and improving load times.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is debouncing in the context of user input?',
        options: [
          'Validating input format',
          'Delaying function execution until user stops typing',
          'Encrypting user input',
          'Formatting input text'
        ],
        correctAnswer: 1,
        explanation: 'Debouncing delays function execution (like API calls) until user stops typing for a specified time, preventing excessive calls on every keystroke.'
      }
    ]
  },
  {
    id: 'cs404-quiz-4-2',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Error Handling and Validation',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the difference between client-side and server-side validation?',
        options: [
          'They are the same thing',
          'Client provides UX feedback; server is security requirement',
          'Client-side is more secure',
          'Only one is needed'
        ],
        correctAnswer: 1,
        explanation: 'Client-side validation provides immediate UX feedback. Server-side validation is a security requirement since client-side can be bypassed. Always do both.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What should error messages never expose to users?',
        options: [
          'That an error occurred',
          'Internal system details, stack traces, or database structure',
          'How to fix the error',
          'Status codes'
        ],
        correctAnswer: 1,
        explanation: 'Error messages should be user-friendly without exposing internal details like stack traces, SQL queries, or system architecture that could help attackers.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is defensive programming?',
        options: [
          'Writing code that protects against hackers',
          'Writing code that handles unexpected inputs and errors gracefully',
          'Encrypting all code',
          'Writing minimal code'
        ],
        correctAnswer: 1,
        explanation: 'Defensive programming anticipates and handles unexpected inputs, edge cases, and errors gracefully, preventing crashes and security issues.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Why should you log errors to a monitoring service in production?',
        options: [
          'To slow down the application',
          'To track and debug errors that users encounter',
          'To increase server costs',
          'To make code more complex'
        ],
        correctAnswer: 1,
        explanation: 'Error logging to services like Sentry helps you discover, track, and debug errors users encounter in production that you might not see in development.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of try-catch blocks?',
        options: [
          'To make code run faster',
          'To gracefully handle errors and prevent application crashes',
          'To test code',
          'To validate input'
        ],
        correctAnswer: 1,
        explanation: 'Try-catch blocks catch errors that would otherwise crash the application, allowing you to handle them gracefully and provide meaningful feedback.'
      }
    ]
  },
  {
    id: 'cs404-quiz-4-3',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Performance and Accessibility',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of semantic HTML?',
        options: [
          'To style web pages',
          'To provide meaning to content for accessibility and SEO',
          'To reduce file size',
          'To improve JavaScript performance'
        ],
        correctAnswer: 1,
        explanation: 'Semantic HTML (header, nav, main, article) provides meaning to content structure, improving accessibility for screen readers and SEO.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is ARIA and when should you use it?',
        options: [
          'A CSS framework',
          'Accessible Rich Internet Applications; for accessibility when semantic HTML isn\'t enough',
          'An API design pattern',
          'A testing library'
        ],
        correctAnswer: 1,
        explanation: 'ARIA attributes enhance accessibility for dynamic content and custom widgets when semantic HTML alone can\'t convey meaning to assistive technologies.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Why is keyboard navigation important?',
        options: [
          'It makes development easier',
          'Many users rely on keyboards/assistive tech; it\'s required for accessibility',
          'It improves SEO',
          'It reduces server load'
        ],
        correctAnswer: 1,
        explanation: 'Keyboard navigation is essential for users with motor disabilities, screen reader users, and power users. All interactive elements must be keyboard accessible.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the purpose of color contrast requirements (WCAG)?',
        options: [
          'To make websites look better',
          'To ensure text is readable for users with visual impairments',
          'To reduce bandwidth usage',
          'To improve loading speed'
        ],
        correctAnswer: 1,
        explanation: 'WCAG color contrast requirements (4.5:1 for normal text) ensure text is readable for users with visual impairments, color blindness, or viewing in bright light.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is lazy loading of images?',
        options: [
          'Loading all images slowly',
          'Loading images only when they\'re about to enter viewport',
          'Compressing images',
          'Storing images in cache'
        ],
        correctAnswer: 1,
        explanation: 'Lazy loading defers loading off-screen images until they\'re needed (near viewport), improving initial page load performance.'
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
    id: 'cs404-quiz-5-2',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Unit and Integration Testing',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is a mock in unit testing?',
        options: [
          'A fake implementation of a dependency',
          'A test that always fails',
          'A way to test UI components',
          'A production database for testing'
        ],
        correctAnswer: 0,
        explanation: 'Mocks are fake implementations of dependencies (APIs, databases) that let you test code in isolation without relying on external systems.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the difference between a unit test and an integration test?',
        options: [
          'Unit tests are faster',
          'Unit tests test isolated functions; integration tests test components working together',
          'Integration tests are more important',
          'They are the same thing'
        ],
        correctAnswer: 1,
        explanation: 'Unit tests test individual functions in isolation. Integration tests verify multiple components work together correctly (e.g., API + database).'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What should you test in a unit test?',
        options: [
          'The entire application',
          'A single function or method behavior',
          'Database performance',
          'UI layout'
        ],
        correctAnswer: 1,
        explanation: 'Unit tests should focus on testing a single function or method\'s behavior: given specific inputs, does it produce expected outputs and side effects?'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Why should tests be independent of each other?',
        options: [
          'To reduce test file size',
          'So they can run in any order without affecting each other',
          'To make tests run faster',
          'To improve code coverage'
        ],
        correctAnswer: 1,
        explanation: 'Independent tests can run in any order or in parallel without affecting each other. Each test should set up and tear down its own state.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is test-driven development (TDD)?',
        options: [
          'Testing only at the end of development',
          'Writing tests before implementation code',
          'Automated deployment testing',
          'Having a dedicated testing team'
        ],
        correctAnswer: 1,
        explanation: 'TDD is writing failing tests first, then implementing code to make them pass, then refactoring. This ensures code is testable and requirements are met.'
      }
    ]
  },
  {
    id: 'cs404-quiz-5-3',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'E2E Testing and QA',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of end-to-end tests?',
        options: [
          'To test individual functions',
          'To simulate real user workflows through the entire application',
          'To test database queries',
          'To measure code coverage'
        ],
        correctAnswer: 1,
        explanation: 'E2E tests simulate real user interactions through the entire application stack (frontend, backend, database) to verify complete workflows work.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Why are E2E tests typically slower than unit tests?',
        options: [
          'They are poorly written',
          'They test the full stack including UI rendering, network, and database',
          'They use a slower programming language',
          'They test more code at once'
        ],
        correctAnswer: 1,
        explanation: 'E2E tests are slow because they interact with the full stack: rendering UI, making real network requests, and interacting with databases.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is regression testing?',
        options: [
          'Testing performance under load',
          'Re-running tests to ensure new changes didn\'t break existing functionality',
          'Testing backwards compatibility',
          'Testing security vulnerabilities'
        ],
        correctAnswer: 1,
        explanation: 'Regression testing re-runs existing tests after changes to verify new code didn\'t break previously working functionality.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is a flaky test?',
        options: [
          'A test that always fails',
          'A test that randomly passes or fails without code changes',
          'A test that runs slowly',
          'A test that doesn\'t assert anything'
        ],
        correctAnswer: 1,
        explanation: 'Flaky tests randomly pass or fail without code changes, often due to timing issues, race conditions, or dependencies on external services.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What should be included in a bug report?',
        options: [
          'Only the error message',
          'Steps to reproduce, expected vs actual behavior, environment details',
          'Just a screenshot',
          'The fix for the bug'
        ],
        correctAnswer: 1,
        explanation: 'Good bug reports include: steps to reproduce, expected behavior, actual behavior, environment (browser/OS), and screenshots/logs when relevant.'
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
  },
  {
    id: 'cs404-quiz-6-2',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'CI/CD and Containerization',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the difference between Continuous Integration and Continuous Deployment?',
        options: [
          'They are the same thing',
          'CI automates testing; CD automates deployment to production',
          'CD is for databases only',
          'CI is older technology'
        ],
        correctAnswer: 1,
        explanation: 'CI automatically builds and tests code on every commit. CD extends this by automatically deploying passing builds to production.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is Docker and why is it useful?',
        options: [
          'A programming language',
          'A containerization platform that packages apps with dependencies',
          'A database system',
          'A testing framework'
        ],
        correctAnswer: 1,
        explanation: 'Docker containers package applications with all dependencies, ensuring consistent behavior across development, testing, and production environments.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is a Dockerfile?',
        options: [
          'A Docker configuration file',
          'A text file with instructions to build a Docker image',
          'A database schema',
          'A deployment script'
        ],
        correctAnswer: 1,
        explanation: 'A Dockerfile contains instructions (FROM, RUN, COPY, CMD) to build a Docker image, defining the environment and how to run the application.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What should a CI/CD pipeline include at minimum?',
        options: [
          'Only deployment steps',
          'Build, test, and deploy stages with failure notifications',
          'Just compilation',
          'Only manual approval steps'
        ],
        correctAnswer: 1,
        explanation: 'A good CI/CD pipeline includes automated build, test (unit/integration), and deployment stages with notifications when steps fail.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of deployment previews in CI/CD?',
        options: [
          'To slow down deployments',
          'To create temporary environments for testing PRs before merging',
          'To backup production',
          'To cache static assets'
        ],
        correctAnswer: 1,
        explanation: 'Deployment previews create temporary environments for each pull request, allowing you to test changes in isolation before merging to production.'
      }
    ]
  },
  {
    id: 'cs404-quiz-6-3',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Monitoring and Production',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What metrics should you monitor in production?',
        options: [
          'Only error rates',
          'Error rates, response times, resource usage, and user activity',
          'Just server uptime',
          'No monitoring is needed'
        ],
        correctAnswer: 1,
        explanation: 'Monitor error rates, API response times, CPU/memory usage, database performance, and user activity to catch issues early.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the purpose of application logging?',
        options: [
          'To slow down the application',
          'To record events and debug issues in production',
          'To replace testing',
          'To store user data'
        ],
        correctAnswer: 1,
        explanation: 'Logging records application events, errors, and debugging information, helping you understand what happened when issues occur in production.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is a rollback strategy and why is it important?',
        options: [
          'A backup plan',
          'A way to quickly revert to previous version when deployment fails',
          'A testing technique',
          'A database migration tool'
        ],
        correctAnswer: 1,
        explanation: 'A rollback strategy allows you to quickly revert to the previous working version if a deployment introduces critical bugs, minimizing downtime.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is health check endpoint and why is it important?',
        options: [
          'An API to check user health data',
          'An endpoint that verifies the application is running correctly',
          'A security feature',
          'A testing utility'
        ],
        correctAnswer: 1,
        explanation: 'Health check endpoints (like /health) verify application and dependencies are working, allowing load balancers and monitoring to detect failures.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the difference between logs and metrics?',
        options: [
          'They are the same thing',
          'Logs are event records; metrics are numerical measurements over time',
          'Metrics are only for databases',
          'Logs are only for errors'
        ],
        correctAnswer: 1,
        explanation: 'Logs are detailed event records (timestamped messages). Metrics are numerical measurements over time (CPU usage, request count, response time).'
      }
    ]
  },
  {
    id: 'cs404-quiz-7-1',
    subjectId: 'cs404',
    topicId: 'topic-7',
    title: 'Documentation Best Practices',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of a README file?',
        options: [
          'To list all code files',
          'To provide overview and quick start guide for the project',
          'To replace all other documentation',
          'To store configuration'
        ],
        correctAnswer: 1,
        explanation: 'A README provides a project overview, purpose, setup instructions, and quick start guide - it\'s the entry point for anyone discovering your project.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What should API documentation include?',
        options: [
          'Only endpoint URLs',
          'Endpoints, parameters, request/response examples, and error codes',
          'Just the database schema',
          'Only authentication details'
        ],
        correctAnswer: 1,
        explanation: 'Good API docs include endpoint URLs, HTTP methods, parameters, request/response format with examples, authentication requirements, and error codes.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the difference between user documentation and technical documentation?',
        options: [
          'They are the same',
          'User docs explain how to use it; technical docs explain how it works',
          'User docs are longer',
          'Technical docs are optional'
        ],
        correctAnswer: 1,
        explanation: 'User documentation explains HOW TO USE the application (guides, tutorials). Technical documentation explains HOW IT WORKS (architecture, setup, code).'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Why should code comments focus on "why" rather than "what"?',
        options: [
          'To save space',
          'The code itself shows what it does; comments should explain reasoning',
          'Comments should never explain why',
          'It makes code run faster'
        ],
        correctAnswer: 1,
        explanation: 'Good code is self-documenting (shows WHAT). Comments should explain WHY decisions were made, especially for non-obvious logic or workarounds.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What should be included in project architecture documentation?',
        options: [
          'Only file structure',
          'System design, tech stack, data flow, and key decisions',
          'Just deployment steps',
          'User interface mockups'
        ],
        correctAnswer: 1,
        explanation: 'Architecture docs should explain system design, technology choices, component interactions, data flow, and rationale behind key architectural decisions.'
      }
    ]
  },
  {
    id: 'cs404-quiz-7-2',
    subjectId: 'cs404',
    topicId: 'topic-7',
    title: 'Presentation Skills',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the most important aspect of a capstone project demo?',
        options: [
          'Showing every line of code',
          'Demonstrating the value and impact for users',
          'Explaining technical details only',
          'Listing all technologies used'
        ],
        correctAnswer: 1,
        explanation: 'Focus on user value and impact. Show how it solves real problems and improves users\' lives, not just technical implementation details.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'How should you structure a project presentation?',
        options: [
          'Start with code, end with purpose',
          'Problem → Solution → Demo → Technical highlights → Impact',
          'Only show the demo',
          'Read the README aloud'
        ],
        correctAnswer: 1,
        explanation: 'Start with the problem and why it matters, present your solution, show a demo, highlight interesting technical aspects, and conclude with impact.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What should you do before recording a demo video?',
        options: [
          'Record immediately without preparation',
          'Script key points, prepare demo data, and practice several times',
          'Only prepare slides',
          'Avoid planning to seem spontaneous'
        ],
        correctAnswer: 1,
        explanation: 'Prepare thoroughly: script key points, create good demo data, practice the demo flow multiple times, and ensure everything works smoothly.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'How long should a capstone project demo typically be?',
        options: [
          '1-2 minutes',
          '5-8 minutes for demo, 10-15 minutes total presentation',
          '30-45 minutes',
          '1 hour minimum'
        ],
        correctAnswer: 1,
        explanation: 'Demo should be 5-8 minutes showing core functionality. Total presentation should be 10-15 minutes including problem, solution, and technical details.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What makes a good demo scenario?',
        options: [
          'Showing every feature in detail',
          'A realistic user journey that shows core value',
          'Testing edge cases',
          'Showing the admin panel'
        ],
        correctAnswer: 1,
        explanation: 'Use a realistic user journey that demonstrates the core value proposition and shows how the application solves the user\'s problem naturally.'
      }
    ]
  },
  {
    id: 'cs404-quiz-7-3',
    subjectId: 'cs404',
    topicId: 'topic-7',
    title: 'Project Reflection',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Why is project reflection important?',
        options: [
          'It\'s just a formality',
          'To learn from successes and failures for future projects',
          'To criticize your work',
          'To pad the final report'
        ],
        correctAnswer: 1,
        explanation: 'Reflection helps you learn from experience: what worked well, what didn\'t, and how you\'ll approach future projects differently.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What should you reflect on in your capstone experience?',
        options: [
          'Only technical challenges',
          'Technical decisions, planning accuracy, time management, and learning',
          'Just what went wrong',
          'Only the final product'
        ],
        correctAnswer: 1,
        explanation: 'Reflect on technical decisions, planning/estimation accuracy, time management, what you learned, challenges overcome, and what you\'d do differently.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is one benefit of documenting challenges you faced?',
        options: [
          'To complain about difficulties',
          'To demonstrate problem-solving skills and learning',
          'To make excuses',
          'To blame external factors'
        ],
        correctAnswer: 1,
        explanation: 'Documenting challenges demonstrates problem-solving abilities, resilience, and learning. It shows how you overcame obstacles professionally.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'How should you discuss what you would do differently?',
        options: [
          'Focus only on regrets',
          'Be specific about lessons learned and how you\'d apply them',
          'Avoid admitting any mistakes',
          'Blame tools and technologies'
        ],
        correctAnswer: 1,
        explanation: 'Be specific about lessons learned: "I\'d start testing earlier" or "I\'d simplify the scope". Show how you\'ll apply these lessons to future work.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What makes a project portfolio piece valuable for job applications?',
        options: [
          'Just having code on GitHub',
          'Clear documentation, demo, explanation of your role and impact',
          'Using the most technologies',
          'The largest codebase'
        ],
        correctAnswer: 1,
        explanation: 'Valuable portfolio pieces have clear documentation, live demo or video, explanation of the problem solved, your role, technical decisions, and impact/results.'
      }
    ]
  }
];
