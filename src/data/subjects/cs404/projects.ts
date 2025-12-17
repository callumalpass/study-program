import { Project } from '../../../core/types';

export const cs404Projects: Project[] = [
  {
    id: 'cs404-project-1',
    subjectId: 'cs404',
    title: 'Project Planning & Requirements',
    description: 'Develop a comprehensive project plan including requirements analysis, stakeholder identification, feasibility study, and project charter. This phase establishes the foundation for your capstone by defining scope, objectives, constraints, and success criteria.',
    requirements: [
      'Complete project charter with problem statement and objectives',
      'Stakeholder analysis identifying all affected parties',
      'Detailed functional and non-functional requirements (20+ items)',
      'Feasibility study covering technical, economic, and operational aspects',
      'Project timeline with milestones and Gantt chart',
      'Risk register with identified risks, probability, impact, and mitigation strategies'
    ],
    rubric: [
      {
        name: 'Requirements Completeness',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All requirements thoroughly documented, categorized, and prioritized with clear acceptance criteria'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Most requirements documented with categorization and priorities, minor gaps in acceptance criteria'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic requirements documented but lacking detail, categorization, or clear priorities'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Requirements incomplete, vague, or missing critical elements'
          }
        ]
      },
      {
        name: 'Feasibility Analysis',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive analysis of technical, economic, and operational feasibility with supporting evidence'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Solid feasibility analysis covering main areas with reasonable justifications'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic feasibility assessment present but lacking depth or supporting evidence'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Feasibility analysis missing or inadequately addresses key concerns'
          }
        ]
      },
      {
        name: 'Project Planning',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Detailed timeline with realistic milestones, dependencies, and resource allocation'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Clear timeline with milestones and basic resource considerations'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic timeline present but lacks detail or realistic scheduling'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Timeline incomplete, unrealistic, or missing key milestones'
          }
        ]
      },
      {
        name: 'Risk Management',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive risk register with probability/impact analysis and detailed mitigation strategies'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good risk identification with appropriate mitigation strategies'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic risk identification but lacking analysis or mitigation plans'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate risk identification or missing mitigation strategies'
          }
        ]
      },
      {
        name: 'Professional Presentation',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Professional document structure, clear writing, proper citations, and visual aids'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Well-organized document with good writing quality and some visual aids'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Acceptable organization and writing but could be more polished'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor organization, unclear writing, or unprofessional presentation'
          }
        ]
      }
    ],
    estimatedHours: 20
  },
  {
    id: 'cs404-project-2',
    subjectId: 'cs404',
    title: 'System Architecture Design',
    description: 'Design the complete system architecture for your capstone project including high-level structure, component interactions, data flow, technology stack selection, and architectural patterns. Create detailed diagrams and justify all architectural decisions.',
    requirements: [
      'C4 model diagrams (Context, Container, Component levels)',
      'Technology stack selection with detailed justifications for each choice',
      'Database schema design with ERD showing entities, relationships, and normalization',
      'API design document with endpoint specifications and data contracts',
      'Architecture decision records (ADRs) for major design choices',
      'Security architecture including authentication, authorization, and data protection strategies'
    ],
    rubric: [
      {
        name: 'Architectural Design Quality',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Sophisticated architecture following established patterns, excellent separation of concerns, and scalability considerations'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Sound architecture with good design patterns and reasonable scalability'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic architecture that works but may have design weaknesses'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor architecture with fundamental design flaws or missing key components'
          }
        ]
      },
      {
        name: 'Technology Stack Justification',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Well-researched technology choices with compelling justifications based on project requirements'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Appropriate technology choices with reasonable justifications'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Acceptable technology choices but weak or missing justifications'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor technology choices or no justification provided'
          }
        ]
      },
      {
        name: 'Documentation and Diagrams',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive, clear diagrams using standard notation with detailed supporting documentation'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Clear diagrams with good documentation covering main architectural aspects'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic diagrams present but lacking detail or clarity'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate or confusing diagrams with poor documentation'
          }
        ]
      },
      {
        name: 'Security Considerations',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive security architecture addressing authentication, authorization, data protection, and common vulnerabilities'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good security considerations covering main attack vectors'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic security measures but missing important considerations'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate security planning or major vulnerabilities present'
          }
        ]
      },
      {
        name: 'Scalability and Performance',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Architecture designed for growth with clear performance optimization strategies'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Reasonable scalability considerations built into design'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic performance considerations but limited scalability planning'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'No consideration for scalability or performance bottlenecks'
          }
        ]
      }
    ],
    estimatedHours: 25
  },
  {
    id: 'cs404-project-3',
    subjectId: 'cs404',
    title: 'Core MVP Development',
    description: 'Implement the minimum viable product (MVP) containing core functionality of your capstone project. Focus on backend services, database implementation, API endpoints, and essential business logic. Ensure code quality with proper structure, error handling, and basic testing.',
    requirements: [
      'Database implementation with migrations and seed data',
      'Core API endpoints implementing primary features (minimum 15 endpoints)',
      'Authentication and authorization system with JWT or session-based approach',
      'Input validation and error handling across all endpoints',
      'Unit tests for business logic with at least 60% code coverage',
      'API documentation using OpenAPI/Swagger or similar tool'
    ],
    rubric: [
      {
        name: 'Feature Completeness',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All MVP features fully implemented and working correctly with edge cases handled'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Core MVP features implemented and functional with minor gaps'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic MVP features present but incomplete or buggy'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Significant features missing or non-functional'
          }
        ]
      },
      {
        name: 'Code Quality',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, well-organized code following best practices with excellent naming and structure'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good code organization with reasonable adherence to best practices'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Working code but with organization or style issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor code quality with significant technical debt'
          }
        ]
      },
      {
        name: 'Error Handling and Validation',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive input validation and graceful error handling throughout application'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good error handling and validation on critical paths'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic error handling but missing validation in some areas'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate error handling allowing crashes or data corruption'
          }
        ]
      },
      {
        name: 'Testing Coverage',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive unit tests with 70%+ coverage including edge cases'
          },
          {
            score: 3,
            label: 'Good',
            description: '60%+ test coverage with good happy path and error scenario tests'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic tests present but limited coverage (40-60%)'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal or no testing present'
          }
        ]
      },
      {
        name: 'API Design and Documentation',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'RESTful API following best practices with comprehensive, interactive documentation'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Well-designed API with good documentation'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Functional API but inconsistent design or incomplete documentation'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor API design or missing documentation'
          }
        ]
      }
    ],
    estimatedHours: 30
  },
  {
    id: 'cs404-project-4',
    subjectId: 'cs404',
    title: 'Testing & Quality Assurance',
    description: 'Implement a comprehensive testing strategy including unit tests, integration tests, and end-to-end tests. Establish quality assurance processes, code review practices, and continuous integration to ensure reliability and maintainability of your capstone project.',
    requirements: [
      'Unit test suite covering business logic with 80%+ code coverage',
      'Integration tests for all API endpoints and database operations',
      'End-to-end tests covering critical user workflows (minimum 5 scenarios)',
      'CI/CD pipeline configuration running tests automatically on commits',
      'Code quality tools configured (linting, formatting, static analysis)',
      'Test documentation explaining testing strategy and how to run tests'
    ],
    rubric: [
      {
        name: 'Test Coverage and Completeness',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: '80%+ coverage with comprehensive tests for happy paths, edge cases, and error scenarios'
          },
          {
            score: 3,
            label: 'Good',
            description: '70%+ coverage with good test variety covering main scenarios'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: '60%+ coverage but missing important test cases'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Insufficient test coverage or missing critical tests'
          }
        ]
      },
      {
        name: 'Test Quality',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Well-written, maintainable tests with clear assertions and good test organization'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good test quality with clear intent and reasonable organization'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Tests work but could be clearer or better organized'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor test quality with unclear assertions or brittle tests'
          }
        ]
      },
      {
        name: 'Integration and E2E Testing',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive integration and E2E tests covering all critical workflows'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good integration tests and E2E coverage of main user journeys'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic integration or E2E tests but limited scenarios covered'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Missing or inadequate integration and E2E testing'
          }
        ]
      },
      {
        name: 'CI/CD Implementation',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Fully automated CI/CD pipeline with tests, linting, and quality gates'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Working CI/CD pipeline running tests automatically'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic CI configured but limited automation'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'No CI/CD or non-functional pipeline'
          }
        ]
      },
      {
        name: 'Code Quality Tools',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Multiple code quality tools configured with strict rules enforced'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Linting and formatting tools properly configured'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic code quality tools present but not strictly enforced'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'No code quality tools configured'
          }
        ]
      }
    ],
    estimatedHours: 25
  },
  {
    id: 'cs404-project-5',
    subjectId: 'cs404',
    title: 'User Interface & Experience',
    description: 'Develop a complete, polished user interface that integrates with your backend API. Implement responsive design, accessibility features, intuitive navigation, and delightful user experience. Focus on both functionality and aesthetics while following modern UI/UX best practices.',
    requirements: [
      'Complete frontend application with all core features accessible via UI',
      'Responsive design working across desktop, tablet, and mobile devices',
      'Accessibility compliance meeting WCAG 2.1 AA standards',
      'State management solution implemented (Redux, Zustand, Context API, etc.)',
      'Form validation with clear error messages and loading states',
      'User authentication flow with protected routes and session management'
    ],
    rubric: [
      {
        name: 'UI Completeness and Functionality',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All features accessible through intuitive UI with polished interactions and feedback'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Core features accessible with good usability'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic UI present but some features awkward or incomplete'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Significant UI gaps or poor functionality'
          }
        ]
      },
      {
        name: 'Design Quality and Aesthetics',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Professional, cohesive design with excellent visual hierarchy and attention to detail'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Clean, pleasant design with good visual consistency'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Functional design but lacks polish or consistency'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor visual design or inconsistent styling'
          }
        ]
      },
      {
        name: 'Responsive Design',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Excellent responsive behavior across all devices with optimized layouts'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good responsive design working well on major breakpoints'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic responsive functionality but some layout issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor or missing responsive design'
          }
        ]
      },
      {
        name: 'User Experience',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Intuitive navigation, clear feedback, and delightful interactions throughout'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good UX with clear navigation and appropriate feedback'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Usable but with some confusing interactions or missing feedback'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor UX with confusing navigation or inadequate feedback'
          }
        ]
      },
      {
        name: 'Accessibility',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Fully accessible meeting WCAG 2.1 AA with keyboard navigation and ARIA labels'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good accessibility features covering main requirements'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic accessibility but missing some important features'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor or missing accessibility features'
          }
        ]
      }
    ],
    estimatedHours: 28
  },
  {
    id: 'cs404-project-6',
    subjectId: 'cs404',
    title: 'Deployment & DevOps',
    description: 'Deploy your complete application to a production environment with proper DevOps practices. Implement automated deployment pipelines, environment configuration, monitoring, logging, and establish procedures for updates and rollbacks. Ensure production readiness and reliability.',
    requirements: [
      'Application deployed to cloud platform (AWS, Azure, GCP, Vercel, Railway, etc.) and accessible via public URL',
      'Automated CI/CD pipeline for continuous deployment from main branch',
      'Environment variable management for different environments (dev, staging, production)',
      'Application monitoring and health checks configured',
      'Error tracking and logging system implemented (Sentry, LogRocket, or similar)',
      'Deployment documentation with rollback procedures and troubleshooting guide'
    ],
    rubric: [
      {
        name: 'Deployment Success',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Application fully deployed, stable, and performant with SSL/HTTPS and custom domain'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Application successfully deployed and functional with HTTPS'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Application deployed but with performance or reliability issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Deployment incomplete or application non-functional in production'
          }
        ]
      },
      {
        name: 'CI/CD Pipeline',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive automated pipeline with tests, builds, and deployments with quality gates'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Working automated pipeline deploying on commits to main branch'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic automation present but manual steps required'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'No automation or non-functional pipeline'
          }
        ]
      },
      {
        name: 'Monitoring and Logging',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive monitoring with dashboards, alerts, error tracking, and detailed logging'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good monitoring and error tracking configured'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic logging present but limited monitoring'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate or missing monitoring and logging'
          }
        ]
      },
      {
        name: 'Infrastructure Configuration',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Infrastructure as code with proper environment separation and security best practices'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Well-configured infrastructure with proper environment management'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic infrastructure setup but missing best practices'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor infrastructure configuration or security concerns'
          }
        ]
      },
      {
        name: 'Documentation',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive deployment docs with troubleshooting guide and rollback procedures'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good documentation covering deployment and basic operations'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic documentation but missing important procedures'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate or missing deployment documentation'
          }
        ]
      }
    ],
    estimatedHours: 22
  },
  {
    id: 'cs404-project-7',
    subjectId: 'cs404',
    title: 'Final Integration & Documentation',
    description: 'Complete the final integration of all components, polish the application, and create comprehensive documentation. Prepare project presentation materials, demo videos, and reflection on the development process. Ensure the project is ready for portfolio showcase and professional presentation.',
    requirements: [
      'Comprehensive README with project overview, setup instructions, and technology stack',
      'User documentation with screenshots and usage guides for all major features',
      'Technical documentation including architecture diagrams, API docs, and database schema',
      'Project presentation slides (15-20 minutes) covering problem, solution, architecture, and demo',
      'Demo video (3-5 minutes) showcasing key features and user workflows',
      'Project reflection document discussing challenges, solutions, lessons learned, and future roadmap'
    ],
    rubric: [
      {
        name: 'Documentation Completeness',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive, professional documentation covering all aspects with excellent clarity'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Thorough documentation covering main areas with good clarity'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic documentation present but missing details or clarity'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate or incomplete documentation'
          }
        ]
      },
      {
        name: 'Presentation Quality',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Professional, engaging presentation with clear narrative and excellent visual design'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Well-organized presentation covering key points effectively'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic presentation but lacking polish or structure'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor presentation quality or missing key content'
          }
        ]
      },
      {
        name: 'Demo Video',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Professional demo video showcasing features with excellent narration and production quality'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Clear demo video showing main features with good explanation'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic demo present but unclear or missing important features'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor quality demo or missing demonstration of key features'
          }
        ]
      },
      {
        name: 'Technical Documentation',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Detailed technical docs with architecture diagrams, API specs, and database schema'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good technical documentation covering main system components'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic technical docs but lacking detail or completeness'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Inadequate technical documentation'
          }
        ]
      },
      {
        name: 'Project Reflection',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Thoughtful reflection showing deep learning and self-awareness with concrete examples'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good reflection on challenges and lessons learned'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic reflection but superficial or lacking insight'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal or missing reflection on learning and process'
          }
        ]
      }
    ],
    estimatedHours: 18
  }
];
