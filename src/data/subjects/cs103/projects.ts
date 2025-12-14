import { Project } from '../../../core/types';

export const cs103Projects: Project[] = [
  {
    id: 'cs103-project-1',
    subjectId: 'cs103',
    title: 'Library Management System',
    description: 'Design and implement a complete library management system using object-oriented programming principles. The system should manage books, members, and borrowing transactions using proper encapsulation, inheritance, and polymorphism.\n\nYour system should include:\n- A Book class with attributes for title, author, ISBN, and availability status\n- A Member class with attributes for member ID, name, and borrowed books\n- A LibraryItem base class that Book can inherit from (to support different item types)\n- A Library class that manages the collection and transactions\n- Proper encapsulation with getters/setters for sensitive data\n- Methods to borrow, return, search for books, and list member borrowing history\n\nImplement appropriate design patterns where beneficial, such as the Factory pattern for creating different types of library items or the Observer pattern for notifications.',
    requirements: [
      'Create a LibraryItem base class with common attributes and methods',
      'Implement Book, Magazine, and DVD classes that inherit from LibraryItem',
      'Create a Member class with encapsulated member information and borrowing limits',
      'Implement a Library class that manages collections and enforces business rules',
      'Add methods to borrow items, return items, and check availability',
      'Implement a search function that can find items by title, author, or ISBN',
      'Ensure members cannot borrow more than 5 items at once',
      'Track due dates and calculate overdue fines',
      'Use at least one design pattern appropriately (Factory, Singleton, or Observer)',
      'Write comprehensive unit tests for all classes',
      'Include proper error handling for invalid operations',
      'Create a simple command-line interface to demonstrate functionality'
    ],
    rubric: [
      {
        name: 'Class Design and OOP Principles',
        weight: 30,
        levels: [
          {
            score: 0,
            label: 'Insufficient',
            description: 'Classes are poorly designed, no clear use of OOP principles, inheritance misused or absent'
          },
          {
            score: 70,
            label: 'Developing',
            description: 'Basic class structure present, some use of inheritance and encapsulation, but design could be improved'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'Good class design with proper inheritance hierarchy, encapsulation used effectively, clear object relationships'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Excellent class design demonstrating deep understanding of OOP, proper use of polymorphism, elegant inheritance hierarchy, well-encapsulated data'
          }
        ]
      },
      {
        name: 'Design Patterns Implementation',
        weight: 20,
        levels: [
          {
            score: 0,
            label: 'Insufficient',
            description: 'No design patterns used or patterns applied incorrectly'
          },
          {
            score: 70,
            label: 'Developing',
            description: 'One design pattern attempted but implementation has issues'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'One design pattern correctly implemented and appropriate for the use case'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Multiple design patterns correctly implemented, patterns chosen wisely and improve overall design'
          }
        ]
      },
      {
        name: 'Functionality and Requirements',
        weight: 25,
        levels: [
          {
            score: 0,
            label: 'Insufficient',
            description: 'Many requirements missing, core functionality does not work'
          },
          {
            score: 70,
            label: 'Developing',
            description: 'Most basic requirements met, some core features working, some edge cases not handled'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'All major requirements implemented and working correctly, good error handling'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'All requirements fully implemented, excellent error handling, additional useful features added'
          }
        ]
      },
      {
        name: 'Code Quality and Testing',
        weight: 15,
        levels: [
          {
            score: 0,
            label: 'Insufficient',
            description: 'Code is difficult to read, no tests, poor variable naming'
          },
          {
            score: 70,
            label: 'Developing',
            description: 'Code is readable, some basic tests present, decent naming conventions'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'Clean, well-organized code, comprehensive unit tests, good documentation'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Exemplary code quality with extensive tests, excellent documentation, follows best practices'
          }
        ]
      },
      {
        name: 'User Interface and Usability',
        weight: 10,
        levels: [
          {
            score: 0,
            label: 'Insufficient',
            description: 'No user interface or completely unusable'
          },
          {
            score: 70,
            label: 'Developing',
            description: 'Basic CLI present but confusing or limited functionality'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'Clear, functional CLI with good user prompts and error messages'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Excellent CLI with intuitive commands, helpful feedback, and robust error handling'
          }
        ]
      }
    ],
    estimatedHours: 25
  }
];
