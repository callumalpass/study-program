import { Project } from '../../../core/types';

export const cs103Projects: Project[] = [
  {
    id: 'cs103-project-1',
    subjectId: 'cs103',
    title: 'Library Management System',
    description: `Design and implement a comprehensive library management system using object-oriented programming principles. This project brings together all OOP concepts from CS103: classes, encapsulation, inheritance, polymorphism, and design patterns.

Your system should model a real library with different types of items (books, magazines, DVDs), members with borrowing privileges, and transactions. The architecture should demonstrate proper class hierarchy, data protection through encapsulation, and flexible behavior through polymorphism.

This project emphasizes thinking in objects: identifying entities, their attributes, behaviors, and relationships. You'll practice designing clean interfaces, protecting internal state, and building extensible systems that can accommodate new requirements.`,
    requirements: [
      'Create a LibraryItem base class with common attributes (title, item_id, is_available) and methods',
      'Implement Book, Magazine, and DVD classes that inherit from LibraryItem with specialized attributes',
      'Books have ISBN, author, genre; Magazines have issue_number, publication_date; DVDs have director, runtime',
      'Create a Member class with encapsulated member information (id, name, email, borrowed_items)',
      'Use @property decorators to protect sensitive data and validate inputs (e.g., email format)',
      'Members have different borrowing limits based on membership tier (Regular: 3, Premium: 7)',
      'Implement a Library class that manages collections and enforces business rules',
      'Add polymorphic checkout/return methods that work with any LibraryItem type',
      'Implement a search function using duck typing that can find items by multiple criteria',
      'Track due dates (14 days for books, 7 days for magazines, 3 days for DVDs)',
      'Calculate overdue fines ($0.25/day for books, $0.50/day for magazines, $1.00/day for DVDs)',
      'Use the Factory pattern to create LibraryItems from a data source',
      'Implement the Observer pattern to notify members of due dates or new arrivals',
      'Write comprehensive unit tests for all classes (minimum 80% coverage)',
      'Include proper error handling with custom exception classes',
      'Create a command-line interface demonstrating all functionality'
    ],
    rubric: [
      {
        name: 'Class Design and OOP Principles',
        weight: 25,
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
            description: 'Excellent class design demonstrating deep understanding of OOP, proper use of polymorphism, elegant inheritance hierarchy, well-encapsulated data with meaningful properties'
          }
        ]
      },
      {
        name: 'Encapsulation and Data Protection',
        weight: 15,
        levels: [
          {
            score: 0,
            label: 'Insufficient',
            description: 'All attributes public, no validation, data can be corrupted easily'
          },
          {
            score: 70,
            label: 'Developing',
            description: 'Some use of private/protected attributes, basic validation present'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'Proper use of @property decorators, good input validation, defensive copying where needed'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Exemplary data protection with comprehensive validation, immutable objects where appropriate, all internal state properly guarded'
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
            description: 'One design pattern attempted but implementation has issues or pattern choice is questionable'
          },
          {
            score: 85,
            label: 'Proficient',
            description: 'Two design patterns correctly implemented and appropriate for the use cases'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Multiple design patterns correctly implemented, patterns chosen wisely and genuinely improve the design, clear documentation of pattern usage'
          }
        ]
      },
      {
        name: 'Functionality and Requirements',
        weight: 20,
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
            description: 'All requirements fully implemented, excellent error handling with custom exceptions, additional useful features added thoughtfully'
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
            description: 'Clean, well-organized code, unit tests with good coverage, good docstrings'
          },
          {
            score: 100,
            label: 'Exemplary',
            description: 'Exemplary code quality with 80%+ test coverage, excellent documentation, follows PEP 8, type hints used'
          }
        ]
      },
      {
        name: 'User Interface and Usability',
        weight: 5,
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
            description: 'Excellent CLI with intuitive commands, helpful feedback, and robust input validation'
          }
        ]
      }
    ],
    estimatedHours: 25
  },
  {
    id: 'cs103-project-2',
    subjectId: 'cs103',
    title: 'Game Entity System',
    description: `Build a flexible game entity system demonstrating advanced OOP concepts. This project focuses on designing extensible class hierarchies for game characters, items, and abilities.

Create a system where game entities (players, enemies, NPCs) can have different attributes, abilities, and behaviors. Use inheritance to share common functionality, composition to add capabilities, and polymorphism to handle diverse entity types uniformly.

This project emphasizes practical OOP design decisions: when to use inheritance vs composition, how to design for extensibility, and how to apply design patterns in a realistic scenario.`,
    requirements: [
      'Create a GameObject base class with position, name, and update() method',
      'Implement Entity hierarchy: Entity -> Character -> Player/Enemy/NPC',
      'Characters have health, level, and can take_damage() and heal()',
      'Implement an Ability base class with execute() method and cooldown tracking',
      'Create at least 3 different ability types (Attack, Heal, Buff) using polymorphism',
      'Use composition to give characters abilities (character HAS abilities)',
      'Implement an Inventory system using encapsulation (items cannot be accessed directly)',
      'Create an Item hierarchy: Item -> Weapon/Armor/Consumable',
      'Weapons have damage and attack_speed; Armor has defense; Consumables have effect',
      'Use the Strategy pattern for different AI behaviors (Aggressive, Defensive, Passive)',
      'Implement the Observer pattern for game events (damage dealt, item picked up)',
      'Create a simple combat system that demonstrates polymorphism',
      'Include a game loop that processes entity updates',
      'Write unit tests for combat calculations and ability effects',
      'Document class relationships with a simple UML-style diagram (text-based is fine)'
    ],
    rubric: [
      {
        name: 'Class Hierarchy Design',
        weight: 30,
        levels: [
          { score: 4, label: 'Excellent', description: 'Well-designed hierarchy with appropriate use of inheritance and composition. Clear "is-a" vs "has-a" relationships. Easy to extend.' },
          { score: 3, label: 'Good', description: 'Solid hierarchy with minor design issues. Most relationships modeled correctly.' },
          { score: 2, label: 'Satisfactory', description: 'Basic hierarchy works but some relationships are awkward or overuse inheritance.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor hierarchy design, inappropriate inheritance, or missing key abstractions.' }
        ]
      },
      {
        name: 'Polymorphism and Extensibility',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Polymorphism used effectively throughout. Adding new entity types or abilities requires minimal code changes.' },
          { score: 3, label: 'Good', description: 'Good use of polymorphism. Most new types can be added without modifying existing code.' },
          { score: 2, label: 'Satisfactory', description: 'Some polymorphism present but system is not easily extensible.' },
          { score: 1, label: 'Needs Improvement', description: 'Little to no polymorphism. Adding new types requires significant changes.' }
        ]
      },
      {
        name: 'Design Patterns',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Strategy and Observer patterns correctly implemented. Patterns genuinely improve the design.' },
          { score: 3, label: 'Good', description: 'Both patterns present with minor issues or slightly forced usage.' },
          { score: 2, label: 'Satisfactory', description: 'One pattern implemented correctly.' },
          { score: 1, label: 'Needs Improvement', description: 'Patterns missing or incorrectly implemented.' }
        ]
      },
      {
        name: 'Encapsulation and Data Integrity',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'All game state properly protected. Inventory, stats, and abilities accessed through controlled interfaces.' },
          { score: 3, label: 'Good', description: 'Most data properly encapsulated. Minor exposure of internal state.' },
          { score: 2, label: 'Satisfactory', description: 'Basic encapsulation present but some data inappropriately exposed.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor encapsulation. Game state can be corrupted easily.' }
        ]
      },
      {
        name: 'Code Quality',
        weight: 10,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clean code, good tests, clear documentation. UML diagram included.' },
          { score: 3, label: 'Good', description: 'Readable code, some tests, decent documentation.' },
          { score: 2, label: 'Satisfactory', description: 'Code works but organization could be better. Minimal testing.' },
          { score: 1, label: 'Needs Improvement', description: 'Messy code, no tests, poor documentation.' }
        ]
      }
    ],
    estimatedHours: 20
  },
  {
    id: 'cs103-project-3',
    subjectId: 'cs103',
    title: 'E-Commerce Order System',
    description: `Design an object-oriented e-commerce order processing system. This project focuses on modeling real-world business processes with proper class design, state management, and payment processing.

Build a system that handles products, shopping carts, orders, payments, and shipping. Each component should be properly encapsulated with clear interfaces. The system should demonstrate the practical application of OOP principles in a business context.

This project emphasizes designing classes that model real business entities and processes, handling state transitions, and building maintainable systems.`,
    requirements: [
      'Create a Product class with SKU, name, price, and stock_quantity (encapsulated)',
      'Implement product categories using inheritance (PhysicalProduct, DigitalProduct)',
      'PhysicalProducts have weight and dimensions; DigitalProducts have download_link',
      'Create a ShoppingCart class that manages items with quantities',
      'Cart should prevent adding out-of-stock items and validate quantities',
      'Implement Order class with states: Created, Paid, Shipped, Delivered, Cancelled',
      'Use the State pattern to manage order state transitions with validation',
      'Create a PaymentProcessor base class with process_payment() method',
      'Implement CreditCardProcessor, PayPalProcessor, and CryptoProcessor subclasses',
      'Use the Factory pattern to create appropriate payment processors',
      'Implement a ShippingCalculator using the Strategy pattern (Standard, Express, Overnight)',
      'Create Customer class with order history and preferred payment method',
      'Implement proper validation: email format, card numbers, addresses',
      'Add discount code system with different discount types (percentage, fixed, buy-one-get-one)',
      'Write tests for order state transitions and payment processing',
      'Create a CLI for browsing products, managing cart, and placing orders'
    ],
    rubric: [
      {
        name: 'Domain Modeling',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Classes accurately model business entities. Clear separation of concerns. Relationships make business sense.' },
          { score: 3, label: 'Good', description: 'Good domain model with minor issues in entity relationships or responsibilities.' },
          { score: 2, label: 'Satisfactory', description: 'Basic modeling works but some entities are poorly defined or have mixed responsibilities.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor domain modeling. Classes don\'t reflect business reality.' }
        ]
      },
      {
        name: 'State Management',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'State pattern correctly implemented. All transitions validated. Invalid state changes prevented.' },
          { score: 3, label: 'Good', description: 'State management works with minor issues in edge cases.' },
          { score: 2, label: 'Satisfactory', description: 'Basic state tracking works but not using proper pattern or has bugs.' },
          { score: 1, label: 'Needs Improvement', description: 'Broken state management or missing state pattern.' }
        ]
      },
      {
        name: 'Design Patterns',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Factory, State, and Strategy patterns all correctly implemented and appropriate.' },
          { score: 3, label: 'Good', description: 'Patterns present but one has issues or is slightly misapplied.' },
          { score: 2, label: 'Satisfactory', description: 'Only one or two patterns correctly implemented.' },
          { score: 1, label: 'Needs Improvement', description: 'Patterns missing or incorrectly used.' }
        ]
      },
      {
        name: 'Validation and Error Handling',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Comprehensive input validation. Custom exceptions. Graceful error handling throughout.' },
          { score: 3, label: 'Good', description: 'Good validation for most inputs. Reasonable error handling.' },
          { score: 2, label: 'Satisfactory', description: 'Basic validation present but gaps in coverage.' },
          { score: 1, label: 'Needs Improvement', description: 'Little validation. Crashes on bad input.' }
        ]
      },
      {
        name: 'Code Quality and Testing',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clean, well-organized code. Comprehensive tests. Good documentation.' },
          { score: 3, label: 'Good', description: 'Readable code with decent test coverage.' },
          { score: 2, label: 'Satisfactory', description: 'Code works but quality could be improved. Minimal testing.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor code quality. No tests.' }
        ]
      }
    ],
    estimatedHours: 22
  },
  {
    id: 'cs103-project-4',
    subjectId: 'cs103',
    title: 'Plugin Architecture Framework',
    description: `Build a simple application framework that supports plugins using OOP principles. This advanced project focuses on designing extensible systems where new functionality can be added without modifying existing code.

Create a text processing application where plugins can add new commands (word count, find/replace, format conversion). The core application should define interfaces that plugins implement, demonstrating the Open/Closed Principle in action.

This project emphasizes designing for extensibility, defining clean interfaces, and understanding how real frameworks achieve flexibility through OOP.`,
    requirements: [
      'Create a Plugin abstract base class with initialize(), execute(), and get_name() methods',
      'Implement a PluginManager that discovers, loads, and manages plugins',
      'Use the Factory pattern for plugin instantiation',
      'Create at least 4 built-in plugins: WordCount, FindReplace, UpperCase, Statistics',
      'Each plugin should be in its own class with proper encapsulation',
      'Implement a Document class that plugins operate on',
      'Document should protect its content through proper encapsulation',
      'Use the Command pattern for undo/redo functionality',
      'Implement the Observer pattern to notify when document changes',
      'Create a configuration system using the Singleton pattern',
      'Plugins should be able to register their own commands and menu items',
      'Implement plugin dependencies (plugin A requires plugin B)',
      'Add plugin priority/ordering for execution',
      'Write extensive tests for the plugin loading and execution system',
      'Document the plugin API so others could write plugins'
    ],
    rubric: [
      {
        name: 'Extensibility Architecture',
        weight: 35,
        levels: [
          { score: 4, label: 'Excellent', description: 'New plugins can be added without any changes to core code. Clean plugin API. Well-documented extension points.' },
          { score: 3, label: 'Good', description: 'Good extensibility with minor coupling issues.' },
          { score: 2, label: 'Satisfactory', description: 'Plugins work but require core changes for some features.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor extensibility. Adding plugins requires significant core changes.' }
        ]
      },
      {
        name: 'Design Patterns',
        weight: 30,
        levels: [
          { score: 4, label: 'Excellent', description: 'All required patterns (Factory, Command, Observer, Singleton) correctly implemented and well-integrated.' },
          { score: 3, label: 'Good', description: 'Most patterns correct with minor issues.' },
          { score: 2, label: 'Satisfactory', description: 'Some patterns implemented but integration is weak.' },
          { score: 1, label: 'Needs Improvement', description: 'Few patterns implemented correctly.' }
        ]
      },
      {
        name: 'Interface Design',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clean, intuitive plugin interface. Good use of abstract base classes. Proper separation of concerns.' },
          { score: 3, label: 'Good', description: 'Solid interface design with minor usability issues.' },
          { score: 2, label: 'Satisfactory', description: 'Interface works but is awkward or overly complex.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor interface design. Difficult for plugins to implement.' }
        ]
      },
      {
        name: 'Code Quality and Documentation',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Professional code quality. Comprehensive API documentation. Good test coverage.' },
          { score: 3, label: 'Good', description: 'Good code with decent documentation.' },
          { score: 2, label: 'Satisfactory', description: 'Working code but documentation is sparse.' },
          { score: 1, label: 'Needs Improvement', description: 'Poor quality code and documentation.' }
        ]
      }
    ],
    estimatedHours: 28
  }
];
