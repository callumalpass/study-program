import { Exam } from '../../../core/types';

export const cs404Exams: Exam[] = [
  {
    id: 'cs404-midterm',
    subjectId: 'cs404',
    title: 'Capstone Project Midterm Assessment',
    durationMinutes: 120,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'You are starting a capstone project to build a carbon footprint tracking application. Which of the following should be your FIRST step?',
        options: [
          'Start coding the frontend interface',
          'Set up the database schema',
          'Define project scope and MVP features',
          'Deploy the application to production'
        ],
        correctAnswer: 2,
        explanation: 'Always start with scope definition and MVP planning. Understanding WHAT you\'re building before HOW you\'ll build it prevents wasted effort and scope creep.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Your project timeline shows you are 2 weeks behind schedule with 6 weeks remaining. What is the BEST course of action?',
        options: [
          'Work 16-hour days to catch up',
          'Request a deadline extension',
          'Reduce scope by deferring "Could Have" features',
          'Continue as planned and hope for the best'
        ],
        correctAnswer: 2,
        explanation: 'Reducing scope strategically (cutting non-critical features) is the most sustainable way to get back on track while still delivering a complete MVP.',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Which of the following best demonstrates the Single Responsibility Principle in backend code?',
        options: [
          'A UserController that handles authentication, profile management, and password reset',
          'Separate controllers for AuthController, ProfileController, and PasswordController',
          'One large service file that handles all user-related operations',
          'Inline database queries in route handlers'
        ],
        correctAnswer: 1,
        explanation: 'The Single Responsibility Principle states each module should have one reason to change. Separate controllers for distinct concerns follows this principle.',
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'You need to store user passwords in your database. What is the CORRECT approach?',
        options: [
          'Store passwords in plain text for easy password reset',
          'Encrypt passwords with AES encryption',
          'Hash passwords using bcrypt with appropriate salt rounds',
          'Store passwords in Base64 encoding'
        ],
        correctAnswer: 2,
        explanation: 'Always hash passwords with bcrypt (or similar). Hashing is one-way and designed for passwords. Encryption is reversible and inappropriate for passwords.',
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of database indexing?',
        options: [
          'To make the database larger',
          'To improve query performance on frequently searched columns',
          'To automatically create backups',
          'To encrypt sensitive data'
        ],
        correctAnswer: 1,
        explanation: 'Indexes create data structures that speed up data retrieval on indexed columns, dramatically improving query performance.',
      },
      {
        id: 'q6',
        type: 'multiple_choice',
        prompt: 'Which REST API endpoint design is MOST correct for getting a specific user\'s activities?',
        options: [
          'GET /api/getUserActivities?userId=123',
          'POST /api/activities/get',
          'GET /api/users/123/activities',
          'GET /api/getActivities/123'
        ],
        correctAnswer: 2,
        explanation: 'RESTful design uses resource-based URLs (nouns, not verbs) and proper HTTP methods. GET /api/users/123/activities clearly shows the resource hierarchy.',
      },
      {
        id: 'q7',
        type: 'multiple_choice',
        prompt: 'You discover a bug in production that breaks user registration. What should you do FIRST?',
        options: [
          'Fix the bug directly in production',
          'Rollback to the previous working version',
          'Post about it on social media',
          'Wait until the next planned deployment'
        ],
        correctAnswer: 1,
        explanation: 'Always rollback first to restore functionality, then fix the bug in development and redeploy through proper channels.',
      },
      {
        id: 'q8',
        type: 'multiple_choice',
        prompt: 'Which of the following is a well-structured database schema for a one-to-many relationship between Users and Activities?',
        options: [
          'Users table has an activities_array column storing JSON',
          'Activities table has a user_id foreign key referencing Users.id',
          'Separate junction table between Users and Activities',
          'Both tables have references to each other'
        ],
        correctAnswer: 1,
        explanation: 'In one-to-many relationships, the "many" side (Activities) should have a foreign key referencing the "one" side (Users).',
      },
      {
        id: 'q9',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of using environment variables in your application?',
        options: [
          'To make the application run faster',
          'To separate configuration (API keys, database URLs) from code',
          'To reduce code file size',
          'To enable debugging'
        ],
        correctAnswer: 1,
        explanation: 'Environment variables externalize configuration, allowing the same code to run in different environments (dev, staging, production) with different settings.',
      },
      {
        id: 'q10',
        type: 'multiple_choice',
        prompt: 'In a typical web application architecture, which component should handle user authentication?',
        options: [
          'Frontend components directly',
          'Database stored procedures',
          'Backend API with middleware',
          'CDN layer'
        ],
        correctAnswer: 2,
        explanation: 'Authentication should be handled on the backend with middleware that validates tokens/sessions before allowing access to protected routes.',
      },
      {
        id: 'q11',
        type: 'multiple_choice',
        prompt: 'You need to calculate carbon emissions for different activity types (car, bus, plane). Which design pattern is most appropriate?',
        options: [
          'Singleton Pattern',
          'Observer Pattern',
          'Strategy Pattern',
          'Decorator Pattern'
        ],
        correctAnswer: 2,
        explanation: 'Strategy Pattern allows you to define a family of algorithms (calculation methods), encapsulate each one, and make them interchangeable.',
      },
      {
        id: 'q12',
        type: 'multiple_choice',
        prompt: 'What is the main advantage of using TypeScript over JavaScript for a capstone project?',
        options: [
          'TypeScript is faster at runtime',
          'TypeScript catches type errors at compile time',
          'TypeScript has more features',
          'TypeScript works in more browsers'
        ],
        correctAnswer: 1,
        explanation: 'TypeScript\'s main benefit is compile-time type checking, which catches errors before runtime and improves code quality and maintainability.',
      },
      {
        id: 'q13',
        type: 'multiple_choice',
        prompt: 'Which HTTP status code should your API return when a user tries to access another user\'s private data?',
        options: [
          '401 Unauthorized',
          '403 Forbidden',
          '404 Not Found',
          '500 Internal Server Error'
        ],
        correctAnswer: 1,
        explanation: '403 Forbidden indicates the user is authenticated but doesn\'t have permission to access the resource. 401 would mean not authenticated.',
      },
      {
        id: 'q14',
        type: 'multiple_choice',
        prompt: 'What is the purpose of a .gitignore file?',
        options: [
          'To ignore bugs in code',
          'To prevent specific files from being tracked by Git',
          'To hide files from other developers',
          'To compress files before committing'
        ],
        correctAnswer: 1,
        explanation: '.gitignore specifies files and directories that Git should not track, such as node_modules, .env files, and build outputs.',
      },
      {
        id: 'q15',
        type: 'multiple_choice',
        prompt: 'In the context of a capstone project, what defines a "good" requirement?',
        options: [
          'As detailed as possible with every implementation detail',
          'Vague enough to allow flexibility',
          'Specific, measurable, achievable, relevant, and time-bound (SMART)',
          'Written in technical jargon to sound professional'
        ],
        correctAnswer: 2,
        explanation: 'Good requirements follow SMART criteria: they\'re specific enough to be testable, achievable within constraints, and provide clear success criteria.',
      },
      {
        id: 'q16',
        type: 'multiple_choice',
        prompt: 'What is the main purpose of code review, even in a solo capstone project?',
        options: [
          'To delay the project timeline',
          'To identify bugs, improve code quality, and reflect on design decisions',
          'To make the project look more complex',
          'To satisfy academic requirements only'
        ],
        correctAnswer: 1,
        explanation: 'Code review (even self-review) catches bugs, improves code quality, identifies refactoring opportunities, and demonstrates professional development practices.',
      },
      {
        id: 'q17',
        type: 'multiple_choice',
        prompt: 'Your database queries are slow. What should you do FIRST?',
        options: [
          'Switch to a different database',
          'Rewrite the entire application',
          'Profile queries to identify bottlenecks, then add indexes',
          'Increase server RAM'
        ],
        correctAnswer: 2,
        explanation: 'Always measure before optimizing. Profile to find slow queries, then add appropriate indexes or optimize query structure.',
      },
      {
        id: 'q18',
        type: 'multiple_choice',
        prompt: 'What is the Repository pattern\'s primary benefit?',
        options: [
          'It makes code run faster',
          'It separates data access logic from business logic',
          'It eliminates the need for a database',
          'It automatically creates database tables'
        ],
        correctAnswer: 1,
        explanation: 'The Repository pattern abstracts data access, allowing business logic to work with data through a clean interface without knowing database implementation details.',
      },
      {
        id: 'q19',
        type: 'multiple_choice',
        prompt: 'When should you commit code to Git?',
        options: [
          'Only when the entire project is complete',
          'Once per week',
          'Frequently, after each logical change or working feature',
          'Only when requested by your advisor'
        ],
        correctAnswer: 2,
        explanation: 'Commit frequently with atomic, logical changes. This provides fine-grained history, makes debugging easier, and protects work.',
      },
      {
        id: 'q20',
        type: 'multiple_choice',
        prompt: 'What is the recommended approach for managing API secrets and credentials in your capstone project?',
        options: [
          'Hard-code them in the source code',
          'Store them in environment variables and .env files (not committed to Git)',
          'Keep them in a text file in the repository',
          'Email them to yourself for safekeeping'
        ],
        correctAnswer: 1,
        explanation: 'Always use environment variables for secrets, store in .env.local (gitignored), and provide .env.example as a template. Never commit secrets to Git.',
      }
    ]
  },
  {
    id: 'cs404-final',
    subjectId: 'cs404',
    title: 'Capstone Project Final Examination',
    durationMinutes: 180,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which of the following BEST describes an effective MVP for a capstone project?',
        options: [
          'A prototype with minimal functionality and no polish',
          'The minimum set of features that solve the core problem and can be delivered on time',
          'A fully featured application without advanced features',
          'The simplest possible version regardless of user value'
        ],
        correctAnswer: 1,
        explanation: 'An MVP balances delivering real user value with practical constraints. It solves the core problem with essential features only.',
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Your capstone project requires integrating with a third-party weather API. What is the MOST important risk mitigation strategy?',
        options: [
          'Use the API without any fallback plan',
          'Abstract the API behind an interface and identify backup options',
          'Build your own weather service from scratch',
          'Assume the API will never fail'
        ],
        correctAnswer: 1,
        explanation: 'Abstracting external dependencies behind interfaces allows swapping implementations and protects against API changes or failures.',
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of CI/CD in a capstone project?',
        options: [
          'To make development more complicated',
          'To automate testing and deployment, catching issues early',
          'To eliminate the need for manual testing',
          'To increase project costs'
        ],
        correctAnswer: 1,
        explanation: 'CI/CD automates builds, tests, and deployments, providing fast feedback and reducing manual errors.',
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which testing type should have the MOST tests in your capstone project?',
        options: [
          'End-to-end tests',
          'Integration tests',
          'Unit tests',
          'Manual tests'
        ],
        correctAnswer: 2,
        explanation: 'Following the testing pyramid, unit tests should be most numerous as they\'re fast, focused, and catch bugs early.',
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'You need to display a list of 10,000 activities. What is the BEST approach?',
        options: [
          'Load all 10,000 activities at once',
          'Display only the first 100',
          'Implement pagination or infinite scroll',
          'Store activities in browser localStorage'
        ],
        correctAnswer: 2,
        explanation: 'Pagination or infinite scroll loads data incrementally, improving performance and user experience with large datasets.',
      },
      {
        id: 'q6',
        type: 'multiple_choice',
        prompt: 'What makes a good Git commit message?',
        options: [
          '"fixed stuff"',
          '"WIP"',
          '"feat(auth): implement JWT token authentication with refresh tokens"',
          '"updated files"'
        ],
        correctAnswer: 2,
        explanation: 'Good commit messages are specific, follow conventions (type/scope), and clearly describe what changed and why.',
      },
      {
        id: 'q7',
        type: 'multiple_choice',
        prompt: 'Your application needs to send emails. What is the recommended approach for a capstone project?',
        options: [
          'Build your own email server',
          'Use an email service like SendGrid or Resend with proper error handling',
          'Send emails directly from the frontend',
          'Skip email functionality entirely'
        ],
        correctAnswer: 1,
        explanation: 'Use established email services (SendGrid, Resend) which handle deliverability, spam filtering, and provide free tiers for capstone projects.',
      },
      {
        id: 'q8',
        type: 'multiple_choice',
        prompt: 'What is the purpose of database migrations?',
        options: [
          'To move data between databases',
          'To track and version database schema changes',
          'To improve query performance',
          'To backup database data'
        ],
        correctAnswer: 1,
        explanation: 'Migrations version control your database schema, allowing you to track changes, rollback if needed, and keep dev/production in sync.',
      },
      {
        id: 'q9',
        type: 'multiple_choice',
        prompt: 'Which deployment platform is MOST suitable for a Next.js capstone project?',
        options: [
          'AWS EC2 with manual configuration',
          'Vercel with automatic deployments',
          'Physical server in your home',
          'USB drive'
        ],
        correctAnswer: 1,
        explanation: 'Vercel is built for Next.js (by the same team), offers free hosting, automatic deployments from Git, and excellent developer experience.',
      },
      {
        id: 'q10',
        type: 'multiple_choice',
        prompt: 'What is the main purpose of using TypeScript in a capstone project?',
        options: [
          'To make the code run faster',
          'To catch type errors at compile time and improve code quality',
          'To make the project look more complex',
          'TypeScript is required for all web projects'
        ],
        correctAnswer: 1,
        explanation: 'TypeScript provides compile-time type checking, catching errors before runtime and improving code maintainability and documentation.',
      }
    ]
  }
];
