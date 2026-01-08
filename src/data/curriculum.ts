import { Subject } from '@/core/types';

// Import topic content from subject files
import { cs101Topics } from '../subjects/cs101/topics';
import { math101Topics } from '../subjects/math101/topics';
import { cs102Topics } from '../subjects/cs102/topics';
import { cs103Topics } from '../subjects/cs103/topics';
import { math102Topics } from '../subjects/math102/topics';
import { cs104Topics } from '../subjects/cs104/topics';
import { cs105Topics } from '../subjects/cs105/topics';
import { math203Topics } from '../subjects/math203/topics';
import { cs201Topics } from '../subjects/cs201/topics';
import { cs202Topics } from '../subjects/cs202/topics';
import { cs203Topics } from '../subjects/cs203/topics';
import { cs204Topics } from '../subjects/cs204/topics';
import { cs205Topics } from '../subjects/cs205/topics';
import { math201Topics } from '../subjects/math201/topics';
import { math202Topics } from '../subjects/math202/topics';
import { math204Topics } from '../subjects/math204/topics';
import { cs302Topics } from '../subjects/cs302/topics';
import { cs303Topics } from '../subjects/cs303/topics';
import { cs304Topics } from '../subjects/cs304/topics';
import { cs305Topics } from '../subjects/cs305/topics';
import { cs306Topics } from '../subjects/cs306/topics';
import { cs307Topics } from '../subjects/cs307/topics';
import { cs301Topics } from '../subjects/cs301/topics';
import { math301Topics } from '../subjects/math301/topics';
import { math302Topics } from '../subjects/math302/topics';
import { math303Topics } from '../subjects/math303/topics';
import { math304Topics } from '../subjects/math304/topics';
import { cs401Topics } from '../subjects/cs401/topics';
import { cs402Topics } from '../subjects/cs402/topics';
import { cs403Topics } from '../subjects/cs403/topics';
import { cs404Topics } from '../subjects/cs404/topics';
import { cs405Topics } from '../subjects/cs405/topics';
import { cs406Topics } from '../subjects/cs406/topics';
import { cs407Topics } from '../subjects/cs407/topics';
import { math401Topics } from '../subjects/math401/topics';
import { math402Topics } from '../subjects/math402/topics';
import { math403Topics } from '../subjects/math403/topics';
import { math404Topics } from '../subjects/math404/topics';

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
    category: 'cs',
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
    topics: cs101Topics,
    examIds: ['cs101-exam-midterm', 'cs101-exam-final'],
    projectIds: ['cs101-project-1', 'cs101-project-3', 'cs101-project-4']
  },

  {
    id: 'math101',
    code: 'MATH101',
    category: 'math',
    title: 'Discrete Mathematics I',
    year: 1,
    semester: 1,
    prerequisites: [],
    description: 'Introduction to discrete mathematical structures essential for computer science. Topics include propositional and predicate logic, proof techniques, set theory, relations, functions, predicate logic with quantifiers, and sequences. This course develops mathematical reasoning skills crucial for algorithm analysis and theoretical computer science.',
    learningObjectives: [
      'Construct truth tables and evaluate logical expressions using propositional logic',
      'Apply proof techniques including direct proof, proof by contradiction, and mathematical induction',
      'Perform set operations and understand set notation and properties',
      'Analyze and classify relations including equivalence relations and partial orders',
      'Define and work with functions, including injective, surjective, and bijective functions',
      'Translate statements using predicate logic and quantifiers',
      'Work with sequences, summations, and recurrence relations',
      'Use logical reasoning to solve problems and verify arguments'
    ],
    estimatedHours: 100,
    topics: math101Topics,
    examIds: ['math101-exam-midterm', 'math101-exam-final']
  },

  {
    id: 'cs102',
    code: 'CS102',
    category: 'cs',
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
    topics: cs102Topics,
    examIds: ['cs102-midterm', 'cs102-final'],
    projectIds: ['cs102-project-3']
  },

  {
    id: 'cs103',
    code: 'CS103',
    category: 'cs',
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
    topics: cs103Topics,
    examIds: ['cs103-exam-midterm', 'cs103-exam-final'],
    projectIds: ['cs103-project-1', 'cs103-project-2']
  },

  // ============================================================================
  // YEAR 1 - SEMESTER 2: Building on Foundations
  // ============================================================================

  {
    id: 'math102',
    code: 'MATH102',
    category: 'math',
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
    topics: math102Topics,
    projectIds: ['math102-p1']
  },

  {
    id: 'cs104',
    code: 'CS104',
    category: 'cs',
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
    topics: cs104Topics,
    examIds: ['cs104-exam-midterm', 'cs104-exam-final'],
    projectIds: ['cs104-project-1']
  },

  {
    id: 'cs105',
    code: 'CS105',
    category: 'cs',
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
    topics: cs105Topics,
    examIds: ['cs105-exam-midterm', 'cs105-exam-final'],
    projectIds: ['cs105-project-1', 'cs105-project-2', 'cs105-project-3']
  },

  // ============================================================================
  // YEAR 2 - SEMESTER 1: Core Concepts
  // ============================================================================

  {
    id: 'cs201',
    code: 'CS201',
    category: 'cs',
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
    topics: cs201Topics,
    examIds: ['cs201-exam-midterm', 'cs201-exam-final'],
    projectIds: ['cs201-project-maze']
  },

  {
    id: 'cs202',
    code: 'CS202',
    category: 'cs',
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
    topics: cs202Topics,
    examIds: ['cs202-midterm', 'cs202-final'],
    projectIds: ['cs202-project-1', 'cs202-project-2', 'cs202-project-3']
  },

  {
    id: 'cs203',
    code: 'CS203',
    category: 'cs',
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
    topics: cs203Topics,
    examIds: ['cs203-midterm', 'cs203-final'],
    projectIds: ['cs203-project-1', 'cs203-project-2', 'cs203-project-3']
  },

  {
    id: 'math203',
    code: 'MATH203',
    category: 'math',
    title: 'Calculus I',
    year: 2,
    semester: 1,
    prerequisites: [],
    description: 'Introduction to single-variable calculus covering limits, continuity, differentiation, and applications of derivatives. This course develops rigorous understanding of differential calculus, including optimization, related rates, and curve sketching. Students learn to apply calculus techniques to solve problems in physics, engineering, and other sciences.',
    learningObjectives: [
      'Evaluate limits using algebraic techniques and L\'Hôpital\'s rule',
      'Understand and apply the formal definition of continuity',
      'Compute derivatives using the limit definition and differentiation rules',
      'Apply the chain rule, product rule, and quotient rule',
      'Solve optimization problems using calculus techniques',
      'Analyze functions using derivatives to find extrema, inflection points, and asymptotes',
      'Apply implicit differentiation and related rates to real-world problems'
    ],
    estimatedHours: 120,
    topics: math203Topics,
    examIds: ['math203-exam-midterm', 'math203-exam-final']
  },

  {
    id: 'cs204',
    code: 'CS204',
    category: 'cs',
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
    topics: cs204Topics,
    examIds: ['cs204-midterm', 'cs204-final'],
    projectIds: ['cs204-project-1', 'cs204-project-2', 'cs204-project-3']
  },

  // ============================================================================
  // YEAR 2 - SEMESTER 2: Core Concepts Continued
  // ============================================================================

  {
    id: 'cs205',
    code: 'CS205',
    category: 'cs',
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
    topics: cs205Topics,
    examIds: ['cs205-midterm', 'cs205-final'],
    projectIds: ['cs205-project-1', 'cs205-project-2', 'cs205-project-3']
  },

  {
    id: 'math201',
    code: 'MATH201',
    category: 'math',
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
    topics: math201Topics,
    examIds: ['math201-exam-midterm', 'math201-exam-final']
  },

  {
    id: 'math202',
    code: 'MATH202',
    category: 'math',
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
    topics: math202Topics,
    examIds: ['math202-exam-midterm', 'math202-exam-final']
  },

  {
    id: 'math204',
    code: 'MATH204',
    category: 'math',
    title: 'Calculus II',
    year: 2,
    semester: 2,
    prerequisites: ['math203'],
    description: 'Continuation of single-variable calculus focusing on integration techniques, applications of integrals, sequences, and infinite series. This course develops rigorous understanding of integral calculus and introduces Taylor series and convergence tests. Students learn to apply integration to problems in area, volume, arc length, and physics.',
    learningObjectives: [
      'Evaluate definite and indefinite integrals using fundamental techniques',
      'Apply integration by parts, substitution, partial fractions, and trigonometric substitution',
      'Calculate areas, volumes of revolution, and arc lengths using integrals',
      'Evaluate improper integrals and understand convergence conditions',
      'Analyze sequences and determine convergence or divergence',
      'Apply convergence tests to infinite series including ratio, root, and comparison tests',
      'Construct and manipulate Taylor and Maclaurin series representations'
    ],
    estimatedHours: 120,
    topics: math204Topics,
    examIds: ['math204-exam-midterm', 'math204-exam-final']
  },

  // ============================================================================
  // YEAR 3 - SEMESTER 1: Intermediate Topics
  // ============================================================================

  {
    id: 'cs301',
    code: 'CS301',
    category: 'cs',
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
    topics: cs301Topics,
    examIds: ['cs301-exam-midterm', 'cs301-exam-final'],
    projectIds: ['cs301-project-1']
  },

  {
    id: 'cs302',
    code: 'CS302',
    category: 'cs',
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
    topics: cs302Topics,
    examIds: ['cs302-exam-midterm', 'cs302-exam-final'],
    projectIds: ['cs302-project-1', 'cs302-project-2', 'cs302-project-3', 'cs302-project-4']
  },

  {
    id: 'cs303',
    code: 'CS303',
    category: 'cs',
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
    topics: cs303Topics,
    examIds: ['cs303-exam-midterm', 'cs303-exam-final'],
    projectIds: ['cs303-project-1', 'cs303-project-2', 'cs303-project-3']
  },

  {
    id: 'cs304',
    code: 'CS304',
    category: 'cs',
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
    topics: cs304Topics,
    examIds: ['cs304-exam-midterm', 'cs304-exam-final'],
    projectIds: ['cs304-project-1', 'cs304-project-2']
  },

  {
    id: 'math301',
    code: 'MATH301',
    category: 'math',
    title: 'Multivariable Calculus',
    year: 3,
    semester: 1,
    prerequisites: ['math204', 'math201'],
    description: 'Extension of calculus to functions of several variables. This course covers partial derivatives, multiple integrals, vector calculus, and the fundamental theorems of vector analysis. Students learn to analyze surfaces, optimize multivariable functions, and apply vector calculus to physics and engineering problems.',
    learningObjectives: [
      'Compute partial derivatives and directional derivatives of multivariable functions',
      'Apply the gradient, divergence, and curl operators to vector fields',
      'Optimize functions of several variables using Lagrange multipliers',
      'Evaluate double and triple integrals in various coordinate systems',
      'Compute line integrals and surface integrals',
      'Apply Green\'s Theorem, Stokes\' Theorem, and the Divergence Theorem',
      'Model physical phenomena using multivariable calculus'
    ],
    estimatedHours: 120,
    topics: math301Topics,
    examIds: ['math301-exam-midterm', 'math301-exam-final']
  },

  {
    id: 'math302',
    code: 'MATH302',
    category: 'math',
    title: 'Ordinary Differential Equations',
    year: 3,
    semester: 1,
    prerequisites: ['math204'],
    description: 'Study of ordinary differential equations and their applications. This course covers first-order equations, linear systems, series solutions, Laplace transforms, and numerical methods. Students learn to model dynamic systems and solve differential equations analytically and numerically.',
    learningObjectives: [
      'Solve first-order differential equations using separation of variables, integrating factors, and exact equations',
      'Analyze and solve second-order linear differential equations with constant coefficients',
      'Apply the method of undetermined coefficients and variation of parameters',
      'Solve systems of linear differential equations using eigenvalue methods',
      'Use Laplace transforms to solve initial value problems',
      'Apply power series methods to solve differential equations near ordinary points',
      'Model real-world phenomena including population dynamics, circuits, and mechanical systems'
    ],
    estimatedHours: 110,
    topics: math302Topics,
    examIds: ['math302-exam-midterm', 'math302-exam-final']
  },

  // ============================================================================
  // YEAR 3 - SEMESTER 2: Intermediate Topics Continued
  // ============================================================================

  {
    id: 'cs305',
    code: 'CS305',
    category: 'cs',
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
    topics: cs305Topics,
    examIds: ['cs305-exam-midterm', 'cs305-exam-final'],
    projectIds: ['cs305-proj1-portfolio', 'cs305-proj2-todo-app', 'cs305-proj3-weather-dashboard']
  },

  {
    id: 'cs306',
    code: 'CS306',
    category: 'cs',
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
    topics: cs306Topics,
    examIds: ['cs306-exam-midterm', 'cs306-exam-final'],
    projectIds: ['cs306-project-1', 'cs306-project-2', 'cs306-project-3']
  },

  {
    id: 'cs307',
    code: 'CS307',
    category: 'cs',
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
    topics: cs307Topics,
    examIds: ['cs307-exam-midterm', 'cs307-exam-final'],
    projectIds: ['cs307-project-1']
  },

  {
    id: 'math303',
    code: 'MATH303',
    category: 'math',
    title: 'Real Analysis',
    year: 3,
    semester: 2,
    prerequisites: ['math204', 'math101'],
    description: 'Rigorous treatment of the foundations of real analysis. This course covers the real number system, sequences, limits, continuity, differentiation, and integration from a theoretical perspective. Students develop skills in constructing mathematical proofs and gain deep understanding of the theoretical underpinnings of calculus.',
    learningObjectives: [
      'Understand the construction and properties of the real number system',
      'Prove convergence properties of sequences and series using epsilon-delta arguments',
      'Analyze continuity and uniform continuity of functions rigorously',
      'Prove the fundamental theorems of differentiation including the Mean Value Theorem',
      'Construct the Riemann integral and prove its properties',
      'Understand sequences and series of functions and uniform convergence',
      'Apply real analysis concepts to prove calculus theorems rigorously'
    ],
    estimatedHours: 130,
    topics: math303Topics,
    examIds: ['math303-exam-midterm', 'math303-exam-final']
  },

  {
    id: 'math304',
    code: 'MATH304',
    category: 'math',
    title: 'Abstract Algebra',
    year: 3,
    semester: 2,
    prerequisites: ['math101', 'math201'],
    description: 'Introduction to abstract algebraic structures including groups, rings, and fields. This course develops abstract thinking and proof skills while exploring the fundamental algebraic structures underlying modern mathematics and computer science applications like cryptography and coding theory.',
    learningObjectives: [
      'Understand group axioms and prove basic properties of groups',
      'Analyze subgroups, cosets, and Lagrange\'s theorem',
      'Work with cyclic groups, permutation groups, and group homomorphisms',
      'Understand quotient groups and the isomorphism theorems',
      'Study rings, integral domains, and fields',
      'Work with ideals and quotient rings',
      'Apply abstract algebra to cryptography and error-correcting codes'
    ],
    estimatedHours: 120,
    topics: math304Topics,
    examIds: ['math304-exam-midterm', 'math304-exam-final']
  },

  // ============================================================================
  // YEAR 4 - SEMESTER 1: Advanced Topics
  // ============================================================================

  {
    id: 'cs401',
    code: 'CS401',
    category: 'cs',
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
    topics: cs401Topics,
    examIds: ['cs401-exam-midterm', 'cs401-exam-final'],
    projectIds: ['cs401-project-1']
  },

  {
    id: 'cs402',
    code: 'CS402',
    category: 'cs',
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
    topics: cs402Topics,
    examIds: ['cs402-exam-midterm', 'cs402-exam-final'],
    projectIds: ['cs402-project-1']
  },

  {
    id: 'cs403',
    code: 'CS403',
    category: 'cs',
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
    topics: cs403Topics,
    examIds: ['cs403-exam-midterm', 'cs403-exam-final'],
    projectIds: ['cs403-project-1']
  },

  {
    id: 'cs405',
    code: 'CS405',
    category: 'cs',
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
    topics: cs405Topics,
    examIds: ['cs405-exam-midterm', 'cs405-exam-final'],
    projectIds: ['cs405-project-1']
  },

  {
    id: 'math401',
    code: 'MATH401',
    category: 'math',
    title: 'Complex Analysis',
    year: 4,
    semester: 1,
    prerequisites: ['math303', 'math301'],
    description: 'Study of functions of complex variables and their applications. This course covers complex differentiation, integration, power series, residue theory, and conformal mappings. Complex analysis provides powerful tools for evaluating real integrals, solving differential equations, and applications in physics and engineering.',
    learningObjectives: [
      'Perform arithmetic operations with complex numbers and understand the complex plane',
      'Analyze analytic functions and apply the Cauchy-Riemann equations',
      'Compute complex integrals using Cauchy\'s integral formula and theorem',
      'Represent functions as power series and Laurent series',
      'Apply residue theory to evaluate complex and real integrals',
      'Understand conformal mappings and their applications',
      'Apply complex analysis to problems in physics and engineering'
    ],
    estimatedHours: 120,
    topics: math401Topics,
    examIds: ['math401-exam-midterm', 'math401-exam-final']
  },

  {
    id: 'math402',
    code: 'MATH402',
    category: 'math',
    title: 'Numerical Methods',
    year: 4,
    semester: 1,
    prerequisites: ['math201', 'math302', 'cs101'],
    description: 'Computational methods for solving mathematical problems that cannot be solved analytically. This course covers numerical solutions of equations, interpolation, numerical integration and differentiation, and numerical solutions of differential equations. Students implement algorithms and analyze error bounds and convergence.',
    learningObjectives: [
      'Analyze numerical errors including truncation and round-off errors',
      'Implement root-finding algorithms including bisection, Newton\'s method, and secant method',
      'Apply interpolation methods including Lagrange and Newton polynomials',
      'Compute numerical derivatives and integrals using various quadrature rules',
      'Solve systems of linear equations using direct and iterative methods',
      'Implement numerical methods for ordinary differential equations',
      'Analyze convergence and stability of numerical algorithms'
    ],
    estimatedHours: 110,
    topics: math402Topics,
    examIds: ['math402-exam-midterm', 'math402-exam-final']
  },

  // ============================================================================
  // YEAR 4 - SEMESTER 2: Capstone and Advanced Electives
  // ============================================================================

  {
    id: 'cs404',
    code: 'CS404',
    category: 'cs',
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
    topics: cs404Topics,
    examIds: ['cs404-exam-midterm', 'cs404-exam-final'],
    projectIds: ['cs404-project-1']
  },

  {
    id: 'cs406',
    code: 'CS406',
    category: 'cs',
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
    topics: cs406Topics,
    examIds: ['cs406-exam-midterm', 'cs406-exam-final'],
    projectIds: ['cs406-project-1']
  },

  {
    id: 'cs407',
    code: 'CS407',
    category: 'cs',
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
    topics: cs407Topics,
    examIds: ['cs407-exam-midterm', 'cs407-exam-final'],
    projectIds: ['cs407-project-1']
  },

  {
    id: 'math403',
    code: 'MATH403',
    category: 'math',
    title: 'Introduction to Topology',
    year: 4,
    semester: 2,
    prerequisites: ['math303'],
    description: 'Introduction to point-set topology and its applications. This course covers topological spaces, continuity, connectedness, compactness, and metric spaces. Topology provides a foundation for advanced mathematics and has applications in data analysis, robotics, and theoretical computer science.',
    learningObjectives: [
      'Define and work with topological spaces and their basic properties',
      'Understand bases, subbases, and methods for generating topologies',
      'Characterize continuous functions in topological terms',
      'Analyze connectedness and path-connectedness of spaces',
      'Apply compactness and understand its consequences',
      'Work with metric spaces and understand the relationship to topological spaces',
      'Explore applications of topology to computer science and data analysis'
    ],
    estimatedHours: 110,
    topics: math403Topics,
    examIds: ['math403-exam-midterm', 'math403-exam-final']
  },

  {
    id: 'math404',
    code: 'MATH404',
    category: 'math',
    title: 'Optimization Theory',
    year: 4,
    semester: 2,
    prerequisites: ['math201', 'math301'],
    description: 'Mathematical foundations of optimization with applications to machine learning, operations research, and engineering. This course covers linear programming, convex optimization, duality theory, and nonlinear optimization methods. Students learn to formulate and solve optimization problems arising in various fields.',
    learningObjectives: [
      'Formulate real-world problems as mathematical optimization problems',
      'Solve linear programs using the simplex method and understand duality',
      'Recognize and solve convex optimization problems',
      'Apply KKT conditions for constrained optimization',
      'Implement gradient-based methods for unconstrained optimization',
      'Understand convergence properties of optimization algorithms',
      'Apply optimization techniques to machine learning and data science problems'
    ],
    estimatedHours: 120,
    topics: math404Topics,
    examIds: ['math404-exam-midterm', 'math404-exam-final']
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
