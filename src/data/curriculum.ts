import { Subject } from '@/core/types';

// Import topic content from subject files
import { cs101Topics } from './subjects/cs101/topics';
import { math101Topics } from './subjects/math101/topics';
import { cs102Topics } from './subjects/cs102/topics';
import { cs103Topics } from './subjects/cs103/topics';
import { math102Topics } from './subjects/math102/topics';
import { cs104Topics } from './subjects/cs104/topics';
import { cs105Topics } from './subjects/cs105/topics';

/**
 * Complete Computer Science Degree Curriculum
 * 28 subjects across 4 years (7 subjects per year)
 * Organized by year and semester with realistic prerequisites
 */

export const curriculum: Subject[] = [
  // ============================================================================
  // YEAR 1 - SEMESTER 1: Foundations
  // ============================================================================

  {
    id: 'cs101',
    code: 'CS101',
    title: 'Introduction to Programming',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Learn the fundamentals of programming using Python. This course covers basic programming concepts including variables, data types, control structures, functions, and basic debugging techniques. Students will develop problem-solving skills and learn to write clean, efficient code.',
    learningObjectives: [
      'Understand and apply fundamental programming concepts such as variables, data types, and operators',
      'Use control flow structures including conditionals, loops, and logical operations',
      'Write and call functions with parameters and return values',
      'Work with basic data structures including lists, tuples, and dictionaries',
      'Debug programs using print statements and basic debugging tools',
      'Read and write files using Python file I/O operations',
      'Apply problem-solving strategies to break down programming challenges'
    ],
    estimatedHours: 120,
    topics: cs101Topics
  },

  {
    id: 'math101',
    code: 'MATH101',
    title: 'Discrete Mathematics I',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Introduction to discrete mathematical structures essential for computer science. Topics include propositional and predicate logic, proof techniques, set theory, relations, and functions. This course develops mathematical reasoning skills crucial for algorithm analysis and theoretical computer science.',
    learningObjectives: [
      'Construct truth tables and evaluate logical expressions using propositional logic',
      'Apply proof techniques including direct proof, proof by contradiction, and mathematical induction',
      'Perform set operations and understand set notation and properties',
      'Analyze and classify relations including equivalence relations and partial orders',
      'Define and work with functions, including injective, surjective, and bijective functions',
      'Use logical reasoning to solve problems and verify arguments',
      'Apply discrete mathematics concepts to computer science applications'
    ],
    estimatedHours: 100,
    topics: math101Topics
  },

  {
    id: 'cs102',
    code: 'CS102',
    title: 'Computer Systems Fundamentals',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Explore how computers represent and process information at the hardware level. This course covers number systems, binary arithmetic, data representation, Boolean logic, basic computer architecture, and memory organization. Students gain foundational knowledge of how software interacts with hardware.',
    learningObjectives: [
      'Convert numbers between binary, octal, decimal, and hexadecimal systems',
      'Perform binary arithmetic operations including addition, subtraction, and two\'s complement',
      'Understand data representation for integers, floating-point numbers, and characters',
      'Apply Boolean algebra and design simple logic circuits',
      'Describe basic computer architecture including CPU, memory, and I/O',
      'Explain memory hierarchy and the role of cache memory',
      'Understand the fetch-decode-execute cycle and instruction execution'
    ],
    estimatedHours: 90,
    topics: cs102Topics
  },

  {
    id: 'cs103',
    code: 'CS103',
    title: 'Object-Oriented Programming',
    year: 1,
    semester: 1,
    prerequisites: ['cs101'],
    description: 'Master object-oriented programming concepts and design principles. This course covers classes, objects, inheritance, polymorphism, encapsulation, and introduces design patterns. Students learn to design and implement well-structured, maintainable software using OOP principles.',
    learningObjectives: [
      'Design and implement classes with proper encapsulation and data hiding',
      'Apply inheritance to create class hierarchies and promote code reuse',
      'Implement polymorphism through method overriding and interfaces',
      'Use abstract classes and interfaces to define contracts',
      'Apply composition and understand when to favor it over inheritance',
      'Implement common design patterns such as Singleton, Factory, and Observer',
      'Write unit tests for object-oriented code'
    ],
    estimatedHours: 110,
    topics: cs103Topics
  },

  // ============================================================================
  // YEAR 1 - SEMESTER 2: Building on Foundations
  // ============================================================================

  {
    id: 'math102',
    code: 'MATH102',
    title: 'Discrete Mathematics II',
    year: 1,
    semester: 2,
    prerequisites: ['math101'],
    description: 'Advanced topics in discrete mathematics with focus on combinatorics, probability, graph theory, and number theory. This course builds on Discrete Mathematics I and explores counting principles, graph algorithms, and mathematical structures used extensively in computer science.',
    learningObjectives: [
      'Apply counting principles including permutations, combinations, and the pigeonhole principle',
      'Calculate probabilities for discrete events and apply basic probability theory',
      'Represent problems using graphs and apply graph terminology',
      'Implement and analyze basic graph algorithms including traversals',
      'Apply number theory concepts including divisibility, modular arithmetic, and GCD',
      'Use generating functions to solve counting problems',
      'Prove properties of mathematical structures using formal methods'
    ],
    estimatedHours: 100,
    topics: math102Topics
  },

  {
    id: 'cs104',
    code: 'CS104',
    title: 'Data Structures',
    year: 1,
    semester: 2,
    prerequisites: ['cs103'],
    description: 'Comprehensive study of fundamental data structures and their implementations. Topics include arrays, linked lists, stacks, queues, trees, heaps, hash tables, and graphs. Students learn to choose appropriate data structures for different problems and analyze their time and space complexity.',
    learningObjectives: [
      'Implement and analyze arrays, dynamic arrays, and linked lists',
      'Design and implement stack and queue data structures with various backing stores',
      'Build and traverse binary trees, binary search trees, and balanced trees',
      'Implement heap data structures and understand priority queues',
      'Design hash tables with different collision resolution strategies',
      'Represent and traverse graphs using adjacency matrices and adjacency lists',
      'Analyze time and space complexity of data structure operations'
    ],
    estimatedHours: 120,
    topics: cs104Topics
  },

  {
    id: 'cs105',
    code: 'CS105',
    title: 'Introduction to C Programming',
    year: 1,
    semester: 2,
    prerequisites: ['cs101'],
    description: 'Learn systems programming through the C language, focusing on memory management, pointers, and low-level operations. This course covers C syntax, pointer arithmetic, dynamic memory allocation, structures, and file I/O. Students gain understanding of how programs interact with system resources.',
    learningObjectives: [
      'Write programs in C using proper syntax and style conventions',
      'Understand and manipulate pointers and addresses',
      'Perform dynamic memory allocation and deallocation correctly',
      'Use structures to organize complex data',
      'Implement pointer arithmetic and array-pointer duality',
      'Perform file I/O operations in C',
      'Debug memory-related errors using tools like valgrind'
    ],
    estimatedHours: 110,
    topics: cs105Topics
  },

  // ============================================================================
  // YEAR 2 - SEMESTER 1: Core Concepts
  // ============================================================================

  {
    id: 'cs201',
    code: 'CS201',
    title: 'Algorithms',
    year: 2,
    semester: 1,
    prerequisites: ['cs104', 'math102'],
    description: 'Comprehensive study of algorithm design and analysis techniques. This course covers sorting and searching algorithms, divide-and-conquer, dynamic programming, greedy algorithms, graph algorithms, and complexity analysis. Students learn to design efficient algorithms and analyze their performance.',
    learningObjectives: [
      'Analyze algorithm time and space complexity using Big-O notation',
      'Implement and compare classical sorting and searching algorithms',
      'Design algorithms using divide-and-conquer strategy',
      'Solve optimization problems using dynamic programming',
      'Apply greedy algorithms to appropriate problem domains',
      'Implement graph algorithms including shortest path and minimum spanning tree',
      'Prove algorithm correctness and analyze worst-case, average-case, and best-case scenarios'
    ],
    estimatedHours: 130,
    topics: [
      { id: 'cs201-1', title: 'Algorithm Analysis and Big-O', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-2', title: 'Sorting Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-3', title: 'Searching Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-4', title: 'Divide and Conquer', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-5', title: 'Dynamic Programming', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-6', title: 'Greedy Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-7', title: 'Graph Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs201-8', title: 'Algorithm Correctness', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs202',
    code: 'CS202',
    title: 'Computer Architecture',
    year: 2,
    semester: 1,
    prerequisites: ['cs102', 'cs105'],
    description: 'In-depth exploration of computer organization and architecture. Topics include CPU design, instruction sets, pipelining, memory hierarchy, cache design, and assembly language programming. Students learn how hardware executes instructions and optimizes performance.',
    learningObjectives: [
      'Understand CPU organization including datapath and control unit',
      'Write and analyze assembly language programs',
      'Explain instruction pipelining and identify hazards',
      'Design cache memory systems and analyze cache performance',
      'Understand memory hierarchy and virtual memory concepts',
      'Analyze instruction-level parallelism and superscalar execution',
      'Evaluate architectural tradeoffs in processor design'
    ],
    estimatedHours: 110,
    topics: [
      { id: 'cs202-1', title: 'Instruction Set Architecture', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs202-2', title: 'Assembly Language Programming', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs202-3', title: 'CPU Datapath and Control', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs202-4', title: 'Pipelining', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs202-5', title: 'Cache Memory Design', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs202-6', title: 'Memory Hierarchy', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs202-7', title: 'Instruction-Level Parallelism', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs203',
    code: 'CS203',
    title: 'Theory of Computation',
    year: 2,
    semester: 1,
    prerequisites: ['math101', 'cs104'],
    description: 'Theoretical foundations of computer science including formal languages, automata theory, computability, and complexity. This course covers finite automata, regular languages, context-free grammars, Turing machines, and decidability. Students explore the fundamental limits of computation.',
    learningObjectives: [
      'Design finite automata (DFA, NFA) and prove language recognition',
      'Construct regular expressions and convert between representations',
      'Design context-free grammars and pushdown automata',
      'Understand Turing machines and their computational power',
      'Prove decidability and undecidability of problems',
      'Apply the Church-Turing thesis to computational problems',
      'Classify problems by computational complexity'
    ],
    estimatedHours: 100,
    topics: [
      { id: 'cs203-1', title: 'Finite Automata', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs203-2', title: 'Regular Languages and Expressions', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs203-3', title: 'Context-Free Grammars', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs203-4', title: 'Pushdown Automata', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs203-5', title: 'Turing Machines', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs203-6', title: 'Decidability', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs203-7', title: 'Computational Complexity', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs204',
    code: 'CS204',
    title: 'Software Engineering',
    year: 2,
    semester: 1,
    prerequisites: ['cs103'],
    description: 'Principles and practices of software development for large-scale systems. This course covers the software development lifecycle, requirements engineering, design patterns, testing strategies, version control, and agile methodologies. Students learn to build maintainable, well-documented software in teams.',
    learningObjectives: [
      'Apply software development lifecycle models to projects',
      'Gather and document software requirements effectively',
      'Design software using UML diagrams and design patterns',
      'Implement comprehensive testing strategies including unit, integration, and system tests',
      'Use version control systems effectively for collaborative development',
      'Apply agile methodologies including Scrum and Kanban',
      'Perform code reviews and refactoring for code quality'
    ],
    estimatedHours: 120,
    topics: [
      { id: 'cs204-1', title: 'Software Development Lifecycle', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-2', title: 'Requirements Engineering', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-3', title: 'Software Design and UML', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-4', title: 'Design Patterns', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-5', title: 'Testing Strategies', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-6', title: 'Version Control with Git', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-7', title: 'Agile Methodologies', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs204-8', title: 'Code Quality and Refactoring', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  // ============================================================================
  // YEAR 2 - SEMESTER 2: Core Concepts Continued
  // ============================================================================

  {
    id: 'cs205',
    code: 'CS205',
    title: 'Database Systems',
    year: 2,
    semester: 2,
    prerequisites: ['cs104'],
    description: 'Comprehensive introduction to database management systems with focus on the relational model. This course covers SQL, database design, normalization, transactions, indexing, and query optimization. Students learn to design, implement, and query relational databases effectively.',
    learningObjectives: [
      'Design relational database schemas using ER diagrams',
      'Write complex SQL queries including joins, subqueries, and aggregations',
      'Apply normalization theory to eliminate redundancy and anomalies',
      'Understand and implement ACID properties and transaction management',
      'Design indexes to optimize query performance',
      'Implement database constraints and triggers',
      'Analyze query execution plans and optimize database performance'
    ],
    estimatedHours: 110,
    topics: [
      { id: 'cs205-1', title: 'Relational Model and ER Diagrams', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs205-2', title: 'SQL Fundamentals', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs205-3', title: 'Advanced SQL Queries', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs205-4', title: 'Normalization Theory', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs205-5', title: 'Transactions and ACID', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs205-6', title: 'Indexing and B-Trees', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs205-7', title: 'Query Optimization', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'math201',
    code: 'MATH201',
    title: 'Linear Algebra',
    year: 2,
    semester: 2,
    prerequisites: ['math101'],
    description: 'Study of vector spaces, linear transformations, and matrix theory with applications to computer science. Topics include systems of linear equations, matrix operations, determinants, eigenvalues, and eigenvectors. This course provides mathematical foundations for graphics, machine learning, and optimization.',
    learningObjectives: [
      'Solve systems of linear equations using Gaussian elimination and matrix methods',
      'Perform matrix operations and understand matrix properties',
      'Analyze vector spaces, subspaces, and linear independence',
      'Compute determinants and understand their geometric interpretation',
      'Find eigenvalues and eigenvectors and apply them to diagonalization',
      'Understand linear transformations and their matrix representations',
      'Apply linear algebra to computer science problems including graphics and data analysis'
    ],
    estimatedHours: 100,
    topics: [
      { id: 'math201-1', title: 'Systems of Linear Equations', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math201-2', title: 'Matrix Operations', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math201-3', title: 'Vector Spaces', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math201-4', title: 'Linear Independence and Basis', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math201-5', title: 'Determinants', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math201-6', title: 'Eigenvalues and Eigenvectors', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math201-7', title: 'Linear Transformations', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'math202',
    code: 'MATH202',
    title: 'Probability and Statistics',
    year: 2,
    semester: 2,
    prerequisites: ['math102'],
    description: 'Introduction to probability theory and statistical inference with applications to computer science. This course covers probability distributions, random variables, hypothesis testing, regression analysis, and Bayesian inference. Students learn statistical methods essential for data analysis and machine learning.',
    learningObjectives: [
      'Calculate probabilities using combinatorial methods and probability rules',
      'Work with discrete and continuous probability distributions',
      'Compute expected values, variance, and other statistical measures',
      'Perform hypothesis testing and interpret statistical significance',
      'Apply linear and multiple regression analysis',
      'Understand Bayesian inference and conditional probability',
      'Use statistical software to analyze real-world datasets'
    ],
    estimatedHours: 100,
    topics: [
      { id: 'math202-1', title: 'Probability Fundamentals', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math202-2', title: 'Random Variables', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math202-3', title: 'Probability Distributions', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math202-4', title: 'Statistical Inference', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math202-5', title: 'Hypothesis Testing', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math202-6', title: 'Regression Analysis', content: '', quizIds: [], exerciseIds: [] },
      { id: 'math202-7', title: 'Bayesian Inference', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  // ============================================================================
  // YEAR 3 - SEMESTER 1: Intermediate Topics
  // ============================================================================

  {
    id: 'cs301',
    code: 'CS301',
    title: 'Operating Systems',
    year: 3,
    semester: 1,
    prerequisites: ['cs202', 'cs105'],
    description: 'Comprehensive study of operating system design and implementation. Topics include process management, threading, CPU scheduling, synchronization, deadlock, memory management, virtual memory, and file systems. Students learn how operating systems manage hardware resources and provide services to applications.',
    learningObjectives: [
      'Understand process creation, scheduling, and context switching',
      'Implement thread synchronization using mutexes, semaphores, and monitors',
      'Apply CPU scheduling algorithms and analyze their performance',
      'Detect and prevent deadlock conditions',
      'Implement memory management schemes including paging and segmentation',
      'Understand virtual memory and page replacement algorithms',
      'Design file system structures and implement file operations'
    ],
    estimatedHours: 130,
    topics: [
      { id: 'cs301-1', title: 'Processes and Process Management', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-2', title: 'Threads and Concurrency', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-3', title: 'CPU Scheduling', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-4', title: 'Synchronization', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-5', title: 'Deadlock', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-6', title: 'Memory Management', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-7', title: 'Virtual Memory', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs301-8', title: 'File Systems', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs302',
    code: 'CS302',
    title: 'Computer Networks',
    year: 3,
    semester: 1,
    prerequisites: ['cs202'],
    description: 'Introduction to computer networking protocols and architectures. This course covers the OSI and TCP/IP models, network programming with sockets, routing algorithms, transport protocols, application-layer protocols, and network security basics. Students learn how data is transmitted across networks.',
    learningObjectives: [
      'Understand the layered architecture of network protocols',
      'Implement network applications using socket programming',
      'Analyze routing algorithms and protocols',
      'Understand TCP and UDP transport protocols',
      'Work with application-layer protocols including HTTP, DNS, and SMTP',
      'Configure IP addressing and subnetting',
      'Apply basic network security principles'
    ],
    estimatedHours: 110,
    topics: [
      { id: 'cs302-1', title: 'Network Architecture and OSI Model', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-2', title: 'Physical and Data Link Layers', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-3', title: 'Network Layer and IP', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-4', title: 'Routing Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-5', title: 'Transport Layer: TCP and UDP', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-6', title: 'Socket Programming', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-7', title: 'Application Layer Protocols', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs302-8', title: 'Network Security Basics', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs303',
    code: 'CS303',
    title: 'Programming Languages',
    year: 3,
    semester: 1,
    prerequisites: ['cs203', 'cs204'],
    description: 'Study of programming language paradigms, design, and implementation. This course covers functional, imperative, object-oriented, and logic programming paradigms, type systems, formal semantics, and interpreter construction. Students gain deeper understanding of language design choices and their implications.',
    learningObjectives: [
      'Compare and contrast programming paradigms including functional, imperative, and logic',
      'Understand type systems including static vs dynamic and strong vs weak typing',
      'Implement interpreters for simple programming languages',
      'Apply formal semantics to specify language behavior',
      'Analyze language features such as closures, higher-order functions, and lazy evaluation',
      'Understand memory management techniques including garbage collection',
      'Evaluate language design tradeoffs for different application domains'
    ],
    estimatedHours: 110,
    topics: [
      { id: 'cs303-1', title: 'Programming Paradigms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs303-2', title: 'Type Systems', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs303-3', title: 'Functional Programming', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs303-4', title: 'Formal Semantics', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs303-5', title: 'Interpreters', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs303-6', title: 'Memory Management', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs303-7', title: 'Advanced Language Features', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs304',
    code: 'CS304',
    title: 'Compilers',
    year: 3,
    semester: 1,
    prerequisites: ['cs203', 'cs303'],
    description: 'Principles and techniques for compiler construction. This course covers lexical analysis, parsing, semantic analysis, intermediate code generation, code optimization, and target code generation. Students build a working compiler for a small programming language.',
    learningObjectives: [
      'Implement lexical analyzers using regular expressions and finite automata',
      'Build parsers using top-down and bottom-up parsing techniques',
      'Perform semantic analysis including type checking and symbol table management',
      'Generate intermediate representations for code optimization',
      'Apply code optimization techniques to improve program performance',
      'Generate target code for a specific architecture',
      'Design and implement a complete compiler for a small language'
    ],
    estimatedHours: 120,
    topics: [
      { id: 'cs304-1', title: 'Lexical Analysis', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs304-2', title: 'Parsing: Top-Down', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs304-3', title: 'Parsing: Bottom-Up', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs304-4', title: 'Semantic Analysis', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs304-5', title: 'Intermediate Code Generation', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs304-6', title: 'Code Optimization', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs304-7', title: 'Target Code Generation', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  // ============================================================================
  // YEAR 3 - SEMESTER 2: Intermediate Topics Continued
  // ============================================================================

  {
    id: 'cs305',
    code: 'CS305',
    title: 'Web Development',
    year: 3,
    semester: 2,
    prerequisites: ['cs204', 'cs205'],
    description: 'Full-stack web development covering frontend and backend technologies. This course includes HTML, CSS, JavaScript, frontend frameworks, server-side programming, RESTful APIs, database integration, and deployment. Students build complete web applications from scratch.',
    learningObjectives: [
      'Create responsive web interfaces using HTML, CSS, and JavaScript',
      'Build interactive user interfaces with modern frontend frameworks',
      'Implement server-side logic and RESTful APIs',
      'Integrate databases with web applications',
      'Implement user authentication and authorization',
      'Apply web security best practices',
      'Deploy web applications to cloud platforms'
    ],
    estimatedHours: 130,
    topics: [
      { id: 'cs305-1', title: 'HTML and CSS Fundamentals', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-2', title: 'JavaScript and DOM Manipulation', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-3', title: 'Frontend Frameworks (React/Vue)', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-4', title: 'Server-Side Development', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-5', title: 'RESTful APIs', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-6', title: 'Database Integration', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-7', title: 'Authentication and Security', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs305-8', title: 'Deployment and DevOps', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs306',
    code: 'CS306',
    title: 'Computer Graphics',
    year: 3,
    semester: 2,
    prerequisites: ['math201', 'cs201'],
    description: 'Introduction to computer graphics theory and programming. Topics include 2D and 3D transformations, rasterization, shading models, texture mapping, and ray tracing fundamentals. Students learn to render images and create interactive graphics applications.',
    learningObjectives: [
      'Apply geometric transformations in 2D and 3D spaces',
      'Implement rasterization algorithms for line and polygon drawing',
      'Understand the graphics pipeline and shader programming',
      'Apply lighting models and shading techniques',
      'Implement texture mapping and bump mapping',
      'Understand ray tracing principles for realistic rendering',
      'Create interactive graphics applications using OpenGL or WebGL'
    ],
    estimatedHours: 110,
    topics: [
      { id: 'cs306-1', title: 'Graphics Pipeline Overview', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs306-2', title: '2D and 3D Transformations', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs306-3', title: 'Rasterization', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs306-4', title: 'Viewing and Projection', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs306-5', title: 'Lighting and Shading', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs306-6', title: 'Texture Mapping', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs306-7', title: 'Ray Tracing Basics', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs307',
    code: 'CS307',
    title: 'Security Fundamentals',
    year: 3,
    semester: 2,
    prerequisites: ['cs302', 'cs301'],
    description: 'Comprehensive introduction to computer security principles and practices. This course covers cryptography, authentication mechanisms, common vulnerabilities, secure coding practices, network security, and security testing. Students learn to identify and mitigate security risks in software systems.',
    learningObjectives: [
      'Understand fundamental cryptographic algorithms including symmetric and asymmetric encryption',
      'Implement authentication and authorization mechanisms',
      'Identify common vulnerabilities such as SQL injection, XSS, and buffer overflows',
      'Apply secure coding practices to prevent security flaws',
      'Understand network security protocols including TLS/SSL',
      'Perform security testing and vulnerability assessment',
      'Apply security principles to system design'
    ],
    estimatedHours: 110,
    topics: [
      { id: 'cs307-1', title: 'Security Principles', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs307-2', title: 'Cryptography Fundamentals', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs307-3', title: 'Authentication and Access Control', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs307-4', title: 'Common Vulnerabilities', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs307-5', title: 'Secure Coding Practices', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs307-6', title: 'Network Security', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs307-7', title: 'Security Testing', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  // ============================================================================
  // YEAR 4 - SEMESTER 1: Advanced Topics
  // ============================================================================

  {
    id: 'cs401',
    code: 'CS401',
    title: 'Distributed Systems',
    year: 4,
    semester: 1,
    prerequisites: ['cs301', 'cs302'],
    description: 'Study of distributed computing systems and their challenges. Topics include distributed consensus, replication, consistency models, fault tolerance, distributed file systems, MapReduce, and microservices architecture. Students learn to design and build scalable distributed applications.',
    learningObjectives: [
      'Understand fundamental challenges in distributed systems including time, coordination, and failure',
      'Implement distributed consensus algorithms such as Paxos and Raft',
      'Design replication strategies and understand consistency tradeoffs',
      'Build fault-tolerant distributed systems',
      'Implement distributed data processing using MapReduce paradigm',
      'Design microservices architectures with service discovery and communication',
      'Apply distributed systems patterns to real-world problems'
    ],
    estimatedHours: 130,
    topics: [
      { id: 'cs401-1', title: 'Distributed Systems Fundamentals', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs401-2', title: 'Time and Coordination', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs401-3', title: 'Consensus Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs401-4', title: 'Replication and Consistency', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs401-5', title: 'Fault Tolerance', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs401-6', title: 'MapReduce and Big Data', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs401-7', title: 'Microservices Architecture', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs402',
    code: 'CS402',
    title: 'Machine Learning',
    year: 4,
    semester: 1,
    prerequisites: ['math201', 'math202', 'cs201'],
    description: 'Introduction to machine learning algorithms and applications. This course covers supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), neural networks, model evaluation, and practical ML engineering. Students implement ML algorithms and apply them to real datasets.',
    learningObjectives: [
      'Implement linear and logistic regression for prediction tasks',
      'Apply classification algorithms including decision trees, SVM, and k-NN',
      'Design and train neural networks for various tasks',
      'Implement clustering algorithms for unsupervised learning',
      'Apply dimensionality reduction techniques including PCA',
      'Evaluate models using cross-validation and appropriate metrics',
      'Build end-to-end machine learning pipelines'
    ],
    estimatedHours: 140,
    topics: [
      { id: 'cs402-1', title: 'Machine Learning Overview', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-2', title: 'Linear and Logistic Regression', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-3', title: 'Classification Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-4', title: 'Neural Networks', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-5', title: 'Deep Learning Basics', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-6', title: 'Clustering and Unsupervised Learning', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-7', title: 'Model Evaluation and Selection', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs402-8', title: 'ML Engineering and Deployment', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs403',
    code: 'CS403',
    title: 'Advanced Algorithms',
    year: 4,
    semester: 1,
    prerequisites: ['cs201', 'cs203'],
    description: 'Advanced topics in algorithm design and analysis. This course covers approximation algorithms, randomized algorithms, online algorithms, advanced dynamic programming, network flow, and computational geometry. Students learn sophisticated algorithmic techniques for hard problems.',
    learningObjectives: [
      'Design approximation algorithms with provable guarantees',
      'Apply randomized algorithms and analyze expected performance',
      'Implement online algorithms and understand competitive analysis',
      'Solve complex optimization problems using advanced dynamic programming',
      'Apply network flow algorithms to matching and optimization problems',
      'Implement computational geometry algorithms',
      'Prove algorithm correctness and analyze complexity for advanced algorithms'
    ],
    estimatedHours: 120,
    topics: [
      { id: 'cs403-1', title: 'NP-Completeness Review', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs403-2', title: 'Approximation Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs403-3', title: 'Randomized Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs403-4', title: 'Online Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs403-5', title: 'Advanced Dynamic Programming', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs403-6', title: 'Network Flow Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs403-7', title: 'Computational Geometry', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs405',
    code: 'CS405',
    title: 'Cloud Computing',
    year: 4,
    semester: 1,
    prerequisites: ['cs301', 'cs302'],
    description: 'Comprehensive study of cloud computing technologies and architectures. This course covers virtualization, containerization, serverless computing, cloud storage, cloud-native design patterns, and major cloud platforms (AWS, Azure, GCP). Students learn to build and deploy scalable cloud applications.',
    learningObjectives: [
      'Understand virtualization technologies and hypervisors',
      'Build and deploy containerized applications using Docker and Kubernetes',
      'Implement serverless functions and event-driven architectures',
      'Design cloud storage solutions and understand CAP theorem tradeoffs',
      'Apply cloud-native design patterns for scalability and resilience',
      'Use Infrastructure as Code for cloud resource management',
      'Optimize cloud costs and performance'
    ],
    estimatedHours: 120,
    topics: [
      { id: 'cs405-1', title: 'Cloud Computing Fundamentals', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-2', title: 'Virtualization', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-3', title: 'Containers and Docker', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-4', title: 'Container Orchestration with Kubernetes', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-5', title: 'Serverless Computing', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-6', title: 'Cloud Storage and Databases', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-7', title: 'Cloud-Native Architectures', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs405-8', title: 'Infrastructure as Code', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  // ============================================================================
  // YEAR 4 - SEMESTER 2: Capstone and Advanced Electives
  // ============================================================================

  {
    id: 'cs404',
    code: 'CS404',
    title: 'Capstone Project',
    year: 4,
    semester: 2,
    prerequisites: ['cs204', 'cs305'],
    description: 'Culminating software engineering project where students design, implement, test, and deploy a substantial software system. Students work individually or in teams to build a complete application from requirements through deployment, applying knowledge from throughout the curriculum. This project demonstrates readiness for professional software development.',
    learningObjectives: [
      'Define project requirements and create detailed specifications',
      'Design software architecture for a complex system',
      'Implement a complete software application using appropriate technologies',
      'Write comprehensive tests and perform quality assurance',
      'Document software design and implementation decisions',
      'Deploy and maintain a production-ready application',
      'Present and defend technical design choices'
    ],
    estimatedHours: 150,
    topics: [
      { id: 'cs404-1', title: 'Project Planning and Requirements', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-2', title: 'Architecture and Design', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-3', title: 'Implementation Sprint 1', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-4', title: 'Implementation Sprint 2', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-5', title: 'Testing and Quality Assurance', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-6', title: 'Deployment and DevOps', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-7', title: 'Documentation and Presentation', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs404-8', title: 'Final Presentation and Defense', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs406',
    code: 'CS406',
    title: 'Artificial Intelligence',
    year: 4,
    semester: 2,
    prerequisites: ['cs201', 'math202'],
    description: 'Survey of artificial intelligence techniques and applications. This course covers search algorithms, game playing, constraint satisfaction, planning, knowledge representation, reasoning under uncertainty, and introduction to reinforcement learning. Students implement AI agents for various problem domains.',
    learningObjectives: [
      'Implement uninformed and informed search algorithms',
      'Apply adversarial search for game playing with minimax and alpha-beta pruning',
      'Solve constraint satisfaction problems using backtracking and heuristics',
      'Design planning systems using state-space search',
      'Represent knowledge using propositional and first-order logic',
      'Reason under uncertainty using Bayesian networks',
      'Implement basic reinforcement learning algorithms'
    ],
    estimatedHours: 130,
    topics: [
      { id: 'cs406-1', title: 'AI Fundamentals and Intelligent Agents', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-2', title: 'Search Algorithms', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-3', title: 'Adversarial Search and Game Playing', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-4', title: 'Constraint Satisfaction Problems', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-5', title: 'Planning and Reasoning', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-6', title: 'Knowledge Representation', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-7', title: 'Probabilistic Reasoning', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs406-8', title: 'Introduction to Reinforcement Learning', content: '', quizIds: [], exerciseIds: [] }
    ]
  },

  {
    id: 'cs407',
    code: 'CS407',
    title: 'Data Science and Analytics',
    year: 4,
    semester: 2,
    prerequisites: ['cs402', 'math202', 'cs205'],
    description: 'Applied data science combining statistics, machine learning, and data engineering. This course covers data collection and cleaning, exploratory data analysis, feature engineering, visualization, big data technologies, and end-to-end data science workflows. Students work with real-world datasets to extract insights and build data products.',
    learningObjectives: [
      'Collect, clean, and preprocess data from various sources',
      'Perform exploratory data analysis and statistical inference',
      'Engineer features and transform data for machine learning',
      'Create effective data visualizations to communicate insights',
      'Work with big data technologies including Spark and distributed computing',
      'Build end-to-end data science pipelines',
      'Apply ethical considerations in data collection and analysis'
    ],
    estimatedHours: 120,
    topics: [
      { id: 'cs407-1', title: 'Data Collection and APIs', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-2', title: 'Data Cleaning and Preprocessing', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-3', title: 'Exploratory Data Analysis', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-4', title: 'Feature Engineering', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-5', title: 'Data Visualization', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-6', title: 'Big Data Technologies', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-7', title: 'Data Science Workflows', content: '', quizIds: [], exerciseIds: [] },
      { id: 'cs407-8', title: 'Ethics in Data Science', content: '', quizIds: [], exerciseIds: [] }
    ]
  }
];

// Curriculum statistics
export const curriculumStats = {
  totalSubjects: curriculum.length,
  totalEstimatedHours: curriculum.reduce((sum, subject) => sum + subject.estimatedHours, 0),
  subjectsByYear: {
    1: curriculum.filter(s => s.year === 1).length,
    2: curriculum.filter(s => s.year === 2).length,
    3: curriculum.filter(s => s.year === 3).length,
    4: curriculum.filter(s => s.year === 4).length,
  },
  subjectsBySemester: {
    '1-1': curriculum.filter(s => s.year === 1 && s.semester === 1).length,
    '1-2': curriculum.filter(s => s.year === 1 && s.semester === 2).length,
    '2-1': curriculum.filter(s => s.year === 2 && s.semester === 1).length,
    '2-2': curriculum.filter(s => s.year === 2 && s.semester === 2).length,
    '3-1': curriculum.filter(s => s.year === 3 && s.semester === 1).length,
    '3-2': curriculum.filter(s => s.year === 3 && s.semester === 2).length,
    '4-1': curriculum.filter(s => s.year === 4 && s.semester === 1).length,
    '4-2': curriculum.filter(s => s.year === 4 && s.semester === 2).length,
  }
};

// Helper function to get subjects by year and semester
export function getSubjectsByYearSemester(year: number, semester: number): Subject[] {
  return curriculum.filter(s => s.year === year && s.semester === semester);
}

// Helper function to get a subject by ID
export function getSubjectById(id: string): Subject | undefined {
  return curriculum.find(s => s.id === id);
}

// Helper function to get all prerequisite subjects for a given subject
export function getPrerequisites(subjectId: string): Subject[] {
  const subject = getSubjectById(subjectId);
  if (!subject) return [];
  return subject.prerequisites.map(prereqId => getSubjectById(prereqId)).filter(Boolean) as Subject[];
}

// Helper function to check if prerequisites are met
export function arePrerequisitesMet(subjectId: string, completedSubjectIds: string[]): boolean {
  const subject = getSubjectById(subjectId);
  if (!subject) return false;
  return subject.prerequisites.every(prereqId => completedSubjectIds.includes(prereqId));
}
