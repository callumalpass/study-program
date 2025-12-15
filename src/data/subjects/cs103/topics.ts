import { Topic, Subtopic, Reading } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs103/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs103/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs103/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs103/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs103/topic-5.md?raw';
import topic6Content from '../../../content/subjects/cs103/topic-6.md?raw';
import topic7Content from '../../../content/subjects/cs103/topic-7.md?raw';

// ============================================================================
// Topic 1 Subtopic Imports (Classes and Objects)
// ============================================================================
import t1Introduction from '../../../content/subjects/cs103/topic-1/01-introduction.md?raw';
import t1DefiningClasses from '../../../content/subjects/cs103/topic-1/02-defining-classes.md?raw';
import t1CreatingObjects from '../../../content/subjects/cs103/topic-1/03-creating-objects.md?raw';
import t1SelfAndInit from '../../../content/subjects/cs103/topic-1/04-self-and-init.md?raw';
import t1InstanceVsClass from '../../../content/subjects/cs103/topic-1/05-instance-vs-class-variables.md?raw';
import t1SpecialMethods from '../../../content/subjects/cs103/topic-1/06-special-methods.md?raw';
import t1BestPractices from '../../../content/subjects/cs103/topic-1/07-best-practices.md?raw';

// ============================================================================
// Topic 2 Subtopic Imports (Encapsulation)
// ============================================================================
import t2Introduction from '../../../content/subjects/cs103/topic-2/01-introduction.md?raw';
import t2UnprotectedData from '../../../content/subjects/cs103/topic-2/02-unprotected-data.md?raw';
import t2AccessConventions from '../../../content/subjects/cs103/topic-2/03-access-conventions.md?raw';
import t2Properties from '../../../content/subjects/cs103/topic-2/04-properties.md?raw';
import t2ValidationPatterns from '../../../content/subjects/cs103/topic-2/05-validation-patterns.md?raw';
import t2AdvancedProperties from '../../../content/subjects/cs103/topic-2/06-advanced-properties.md?raw';
import t2MistakesBestPractices from '../../../content/subjects/cs103/topic-2/07-mistakes-best-practices.md?raw';

// ============================================================================
// Topic 3 Subtopic Imports (Inheritance)
// ============================================================================
import t3Introduction from '../../../content/subjects/cs103/topic-3/01-introduction.md?raw';
import t3BasicInheritance from '../../../content/subjects/cs103/topic-3/02-basic-inheritance.md?raw';
import t3SuperFunction from '../../../content/subjects/cs103/topic-3/03-super-function.md?raw';
import t3MethodOverriding from '../../../content/subjects/cs103/topic-3/04-method-overriding.md?raw';
import t3MultipleInheritance from '../../../content/subjects/cs103/topic-3/05-multiple-inheritance.md?raw';
import t3AbstractBaseClasses from '../../../content/subjects/cs103/topic-3/06-abstract-base-classes.md?raw';
import t3BestPractices from '../../../content/subjects/cs103/topic-3/07-best-practices.md?raw';

// ============================================================================
// Topic 4 Subtopic Imports (Polymorphism)
// ============================================================================
import t4Introduction from '../../../content/subjects/cs103/topic-4/01-introduction.md?raw';
import t4SubtypePolymorphism from '../../../content/subjects/cs103/topic-4/02-subtype-polymorphism.md?raw';
import t4DuckTyping from '../../../content/subjects/cs103/topic-4/03-duck-typing.md?raw';
import t4OperatorOverloading from '../../../content/subjects/cs103/topic-4/04-operator-overloading.md?raw';
import t4CallableIterable from '../../../content/subjects/cs103/topic-4/05-callable-iterable.md?raw';
import t4Protocols from '../../../content/subjects/cs103/topic-4/06-protocols.md?raw';
import t4BestPractices from '../../../content/subjects/cs103/topic-4/07-best-practices.md?raw';

// ============================================================================
// Topic 5 Subtopic Imports (Design Patterns)
// ============================================================================
import t5Introduction from '../../../content/subjects/cs103/topic-5/01-introduction.md?raw';
import t5Singleton from '../../../content/subjects/cs103/topic-5/02-singleton.md?raw';
import t5Factory from '../../../content/subjects/cs103/topic-5/03-factory.md?raw';
import t5Observer from '../../../content/subjects/cs103/topic-5/04-observer.md?raw';
import t5Strategy from '../../../content/subjects/cs103/topic-5/05-strategy.md?raw';
import t5DecoratorPattern from '../../../content/subjects/cs103/topic-5/06-decorator-pattern.md?raw';
import t5WhenNotToUse from '../../../content/subjects/cs103/topic-5/07-when-not-to-use.md?raw';

// ============================================================================
// Topic 6 Subtopic Imports (Abstraction and Interfaces)
// ============================================================================
import t6Introduction from '../../../content/subjects/cs103/topic-6/01-introduction.md?raw';
import t6DesignByContract from '../../../content/subjects/cs103/topic-6/02-design-by-contract.md?raw';
import t6AbstractBaseClasses from '../../../content/subjects/cs103/topic-6/03-abstract-base-classes.md?raw';
import t6TemplateMethod from '../../../content/subjects/cs103/topic-6/04-template-method.md?raw';
import t6Protocols from '../../../content/subjects/cs103/topic-6/05-protocols.md?raw';
import t6InterfaceDesign from '../../../content/subjects/cs103/topic-6/06-interface-design.md?raw';
import t6ABCvsProtocol from '../../../content/subjects/cs103/topic-6/07-abc-vs-protocol.md?raw';

// ============================================================================
// Topic 7 Subtopic Imports (Design Principles and Testing)
// ============================================================================
import t7Introduction from '../../../content/subjects/cs103/topic-7/01-introduction.md?raw';
import t7CompositionOverInheritance from '../../../content/subjects/cs103/topic-7/02-composition-over-inheritance.md?raw';
import t7SolidPrinciples from '../../../content/subjects/cs103/topic-7/03-solid-principles.md?raw';
import t7DependencyInjection from '../../../content/subjects/cs103/topic-7/04-dependency-injection.md?raw';
import t7UnitTesting from '../../../content/subjects/cs103/topic-7/05-unit-testing.md?raw';
import t7MocksAndFakes from '../../../content/subjects/cs103/topic-7/06-mocks-and-fakes.md?raw';
import t7Refactoring from '../../../content/subjects/cs103/topic-7/07-refactoring.md?raw';

// ============================================================================
// Subtopic Arrays
// ============================================================================

const topic1Subtopics: Subtopic[] = [
  { id: 'cs103-t1-intro', slug: 'introduction', title: 'Introduction to Classes and Objects', content: t1Introduction, order: 1 },
  { id: 'cs103-t1-defining', slug: 'defining-classes', title: 'Defining Classes', content: t1DefiningClasses, order: 2 },
  { id: 'cs103-t1-creating', slug: 'creating-objects', title: 'Creating Objects', content: t1CreatingObjects, order: 3 },
  { id: 'cs103-t1-self-init', slug: 'self-and-init', title: 'self and __init__', content: t1SelfAndInit, order: 4 },
  { id: 'cs103-t1-instance-class', slug: 'instance-vs-class-variables', title: 'Instance vs Class Variables', content: t1InstanceVsClass, order: 5 },
  { id: 'cs103-t1-special', slug: 'special-methods', title: 'Special Methods', content: t1SpecialMethods, order: 6 },
  { id: 'cs103-t1-best-practices', slug: 'best-practices', title: 'Best Practices', content: t1BestPractices, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'cs103-t2-intro', slug: 'introduction', title: 'Introduction to Encapsulation', content: t2Introduction, order: 1 },
  { id: 'cs103-t2-unprotected', slug: 'unprotected-data', title: 'The Problem with Unprotected Data', content: t2UnprotectedData, order: 2 },
  { id: 'cs103-t2-conventions', slug: 'access-conventions', title: 'Access Conventions', content: t2AccessConventions, order: 3 },
  { id: 'cs103-t2-properties', slug: 'properties', title: 'Properties in Python', content: t2Properties, order: 4 },
  { id: 'cs103-t2-validation', slug: 'validation-patterns', title: 'Validation Patterns', content: t2ValidationPatterns, order: 5 },
  { id: 'cs103-t2-advanced', slug: 'advanced-properties', title: 'Advanced Properties', content: t2AdvancedProperties, order: 6 },
  { id: 'cs103-t2-mistakes', slug: 'mistakes-best-practices', title: 'Common Mistakes and Best Practices', content: t2MistakesBestPractices, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'cs103-t3-intro', slug: 'introduction', title: 'Introduction to Inheritance', content: t3Introduction, order: 1 },
  { id: 'cs103-t3-basic', slug: 'basic-inheritance', title: 'Basic Inheritance', content: t3BasicInheritance, order: 2 },
  { id: 'cs103-t3-super', slug: 'super-function', title: 'The super() Function', content: t3SuperFunction, order: 3 },
  { id: 'cs103-t3-overriding', slug: 'method-overriding', title: 'Method Overriding', content: t3MethodOverriding, order: 4 },
  { id: 'cs103-t3-multiple', slug: 'multiple-inheritance', title: 'Multiple Inheritance', content: t3MultipleInheritance, order: 5 },
  { id: 'cs103-t3-abc', slug: 'abstract-base-classes', title: 'Abstract Base Classes', content: t3AbstractBaseClasses, order: 6 },
  { id: 'cs103-t3-best-practices', slug: 'best-practices', title: 'Best Practices', content: t3BestPractices, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'cs103-t4-intro', slug: 'introduction', title: 'Introduction to Polymorphism', content: t4Introduction, order: 1 },
  { id: 'cs103-t4-subtype', slug: 'subtype-polymorphism', title: 'Subtype Polymorphism', content: t4SubtypePolymorphism, order: 2 },
  { id: 'cs103-t4-duck-typing', slug: 'duck-typing', title: 'Duck Typing', content: t4DuckTyping, order: 3 },
  { id: 'cs103-t4-operator', slug: 'operator-overloading', title: 'Operator Overloading', content: t4OperatorOverloading, order: 4 },
  { id: 'cs103-t4-callable', slug: 'callable-iterable', title: 'Callable and Iterable', content: t4CallableIterable, order: 5 },
  { id: 'cs103-t4-protocols', slug: 'protocols', title: 'Protocols', content: t4Protocols, order: 6 },
  { id: 'cs103-t4-best-practices', slug: 'best-practices', title: 'Best Practices', content: t4BestPractices, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'cs103-t5-intro', slug: 'introduction', title: 'Introduction to Design Patterns', content: t5Introduction, order: 1 },
  { id: 'cs103-t5-singleton', slug: 'singleton', title: 'Singleton Pattern', content: t5Singleton, order: 2 },
  { id: 'cs103-t5-factory', slug: 'factory', title: 'Factory Pattern', content: t5Factory, order: 3 },
  { id: 'cs103-t5-observer', slug: 'observer', title: 'Observer Pattern', content: t5Observer, order: 4 },
  { id: 'cs103-t5-strategy', slug: 'strategy', title: 'Strategy Pattern', content: t5Strategy, order: 5 },
  { id: 'cs103-t5-decorator', slug: 'decorator-pattern', title: 'Decorator Pattern', content: t5DecoratorPattern, order: 6 },
  { id: 'cs103-t5-when-not', slug: 'when-not-to-use', title: 'When Not to Use Patterns', content: t5WhenNotToUse, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'cs103-t6-intro', slug: 'introduction', title: 'Introduction to Abstraction', content: t6Introduction, order: 1 },
  { id: 'cs103-t6-contract', slug: 'design-by-contract', title: 'Design by Contract', content: t6DesignByContract, order: 2 },
  { id: 'cs103-t6-abc', slug: 'abstract-base-classes', title: 'Abstract Base Classes', content: t6AbstractBaseClasses, order: 3 },
  { id: 'cs103-t6-template', slug: 'template-method', title: 'Template Method Pattern', content: t6TemplateMethod, order: 4 },
  { id: 'cs103-t6-protocols', slug: 'protocols', title: 'Protocols', content: t6Protocols, order: 5 },
  { id: 'cs103-t6-interface', slug: 'interface-design', title: 'Interface Design Principles', content: t6InterfaceDesign, order: 6 },
  { id: 'cs103-t6-abc-vs-protocol', slug: 'abc-vs-protocol', title: 'ABCs vs Protocols', content: t6ABCvsProtocol, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'cs103-t7-intro', slug: 'introduction', title: 'Design Principles Overview', content: t7Introduction, order: 1 },
  { id: 'cs103-t7-composition', slug: 'composition-over-inheritance', title: 'Composition Over Inheritance', content: t7CompositionOverInheritance, order: 2 },
  { id: 'cs103-t7-solid', slug: 'solid-principles', title: 'SOLID Principles', content: t7SolidPrinciples, order: 3 },
  { id: 'cs103-t7-di', slug: 'dependency-injection', title: 'Dependency Injection', content: t7DependencyInjection, order: 4 },
  { id: 'cs103-t7-unit-testing', slug: 'unit-testing', title: 'Unit Testing OOP Code', content: t7UnitTesting, order: 5 },
  { id: 'cs103-t7-mocks', slug: 'mocks-and-fakes', title: 'Mocks and Fakes', content: t7MocksAndFakes, order: 6 },
  { id: 'cs103-t7-refactoring', slug: 'refactoring', title: 'Refactoring', content: t7Refactoring, order: 7 },
];

// ============================================================================
// Readings
// ============================================================================

const topic1Readings: Reading[] = [
  {
    id: 'cs103-t1-reading-1',
    title: 'The Development of the Simula Languages',
    authors: ['Kristen Nygaard', 'Ole-Johan Dahl'],
    url: 'https://hannemyr.com/cache/knojd_acm.pdf',
    type: 'paper',
    year: 1978,
    required: false,
    description: 'The inventors of object-oriented programming describe how they created Simula. A fascinating look at how classes and objects were conceived to model real-world systems.',
    estimatedMinutes: 35,
  },
  {
    id: 'cs103-t1-reading-2',
    title: 'Python Classes Tutorial',
    url: 'https://docs.python.org/3/tutorial/classes.html',
    type: 'documentation',
    required: true,
    description: 'The official Python documentation on classes. Clear, authoritative reference for Python\'s approach to OOP.',
    estimatedMinutes: 30,
  },
];

const topic2Readings: Reading[] = [
  {
    id: 'cs103-t2-reading-1',
    title: 'On the Criteria To Be Used in Decomposing Systems into Modules',
    authors: ['David L. Parnas'],
    url: 'https://www.win.tue.nl/~wstomv/edu/2ip30/references/criteria_for_modularization.pdf',
    type: 'paper',
    year: 1972,
    required: true,
    description: 'The foundational paper on information hiding and modular design. Parnas shows why hiding implementation details leads to better software—the theoretical basis for encapsulation.',
    estimatedMinutes: 25,
  },
];

const topic3Readings: Reading[] = [
  {
    id: 'cs103-t3-reading-1',
    title: 'A Behavioral Notion of Subtyping',
    authors: ['Barbara H. Liskov', 'Jeannette M. Wing'],
    url: 'https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf',
    type: 'paper',
    year: 1994,
    required: false,
    description: 'The paper that formalized the Liskov Substitution Principle. Understanding this principle is crucial for proper inheritance design.',
    estimatedMinutes: 40,
  },
];

const topic5Readings: Reading[] = [
  {
    id: 'cs103-t5-reading-1',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software (Introduction)',
    authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
    url: 'https://www.javier8a.com/itc/bd1/articulo.pdf',
    type: 'textbook',
    year: 1994,
    required: true,
    description: 'The "Gang of Four" book that defined design patterns. The introduction explains why patterns matter and how to use them. This book changed how developers think about software design.',
    estimatedMinutes: 45,
  },
  {
    id: 'cs103-t5-reading-2',
    title: 'Refactoring Guru: Design Patterns',
    url: 'https://refactoring.guru/design-patterns',
    type: 'article',
    required: false,
    description: 'An excellent modern resource with visual explanations and code examples for all major design patterns. Great for reference and deeper understanding.',
    estimatedMinutes: 30,
  },
];

const topic7Readings: Reading[] = [
  {
    id: 'cs103-t7-reading-1',
    title: 'The SOLID Principles of Object-Oriented Design',
    authors: ['Robert C. Martin'],
    url: 'http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod',
    type: 'article',
    year: 2005,
    required: true,
    description: 'Uncle Bob\'s explanation of the SOLID principles. These five principles guide object-oriented design toward maintainable, flexible code.',
    estimatedMinutes: 25,
  },
  {
    id: 'cs103-t7-reading-2',
    title: 'Test-Driven Development: By Example (Chapter 1)',
    authors: ['Kent Beck'],
    url: 'https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530',
    type: 'textbook',
    year: 2002,
    required: false,
    description: 'Kent Beck introduces TDD with a practical example. The methodology shapes how you design classes and write testable code.',
    estimatedMinutes: 40,
  },
];

export const cs103Topics: Topic[] = [
  {
    id: 'cs103-1',
    title: 'Classes and Objects',
    content: topic1Content,
    subtopics: topic1Subtopics,
    readings: topic1Readings,
    quizIds: ['cs103-quiz-1', 'cs103-quiz-1b', 'cs103-quiz-1c'],
    exerciseIds: ['cs103-ex-1', 'cs103-t1-ex02', 'cs103-t1-ex03', 'cs103-t1-ex04', 'cs103-t1-ex05', 'cs103-t1-ex06', 'cs103-t1-ex07', 'cs103-t1-ex08', 'cs103-t1-ex09', 'cs103-t1-ex10', 'cs103-t1-ex11', 'cs103-t1-ex12', 'cs103-t1-ex13', 'cs103-t1-ex14', 'cs103-t1-drill-1', 'cs103-t1-drill-2']
  },
  {
    id: 'cs103-2',
    title: 'Encapsulation',
    content: topic2Content,
    subtopics: topic2Subtopics,
    readings: topic2Readings,
    quizIds: ['cs103-quiz-2', 'cs103-quiz-2b', 'cs103-quiz-2c'],
    exerciseIds: ['cs103-ex-2', 'cs103-t2-ex02', 'cs103-t2-ex03', 'cs103-t2-ex04', 'cs103-t2-ex05', 'cs103-t2-ex06', 'cs103-t2-ex07', 'cs103-t2-ex08', 'cs103-t2-ex09', 'cs103-t2-ex10', 'cs103-t2-ex11', 'cs103-t2-ex12', 'cs103-t2-ex13', 'cs103-t2-ex14', 'cs103-t2-drill-1', 'cs103-t2-drill-2']
  },
  {
    id: 'cs103-3',
    title: 'Inheritance',
    content: topic3Content,
    subtopics: topic3Subtopics,
    readings: topic3Readings,
    quizIds: ['cs103-quiz-3', 'cs103-quiz-3b', 'cs103-quiz-3c'],
    exerciseIds: ['cs103-ex-3', 'cs103-t3-ex02', 'cs103-t3-ex03', 'cs103-t3-ex04', 'cs103-t3-ex05', 'cs103-t3-ex06', 'cs103-t3-ex07', 'cs103-t3-ex08', 'cs103-t3-ex09', 'cs103-t3-ex10', 'cs103-t3-ex11', 'cs103-t3-ex12', 'cs103-t3-ex13', 'cs103-t3-ex14', 'cs103-t3-drill-1', 'cs103-t3-drill-2']
  },
  {
    id: 'cs103-4',
    title: 'Polymorphism',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs103-quiz-4', 'cs103-quiz-4b', 'cs103-quiz-4c'],
    exerciseIds: ['cs103-ex-4', 'cs103-t4-ex02', 'cs103-t4-ex03', 'cs103-t4-ex04', 'cs103-t4-ex05', 'cs103-t4-ex06', 'cs103-t4-ex07', 'cs103-t4-ex08', 'cs103-t4-ex09', 'cs103-t4-ex10', 'cs103-t4-ex11', 'cs103-t4-ex12', 'cs103-t4-ex13', 'cs103-t4-ex14', 'cs103-t4-drill-1', 'cs103-t4-drill-2']
  },
  {
    id: 'cs103-5',
    title: 'Design Patterns Intro',
    content: topic5Content,
    subtopics: topic5Subtopics,
    readings: topic5Readings,
    quizIds: ['cs103-quiz-5', 'cs103-quiz-5b', 'cs103-quiz-5c'],
    exerciseIds: ['cs103-ex-5', 'cs103-t5-ex02', 'cs103-t5-ex03', 'cs103-t5-ex04', 'cs103-t5-ex05', 'cs103-t5-ex06', 'cs103-t5-ex07', 'cs103-t5-ex08', 'cs103-t5-ex09', 'cs103-t5-ex10', 'cs103-t5-ex11', 'cs103-t5-ex12', 'cs103-t5-ex13', 'cs103-t5-ex14', 'cs103-t5-drill-1', 'cs103-t5-drill-2']
  },
  {
    id: 'cs103-6',
    title: 'Abstraction and Interfaces',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs103-quiz-6a', 'cs103-quiz-6b', 'cs103-quiz-6c'],
    exerciseIds: ['cs103-ex-6', 'cs103-t6-ex02', 'cs103-t6-ex03', 'cs103-t6-ex04', 'cs103-t6-ex05', 'cs103-t6-ex06', 'cs103-t6-ex07', 'cs103-t6-ex08', 'cs103-t6-ex09', 'cs103-t6-ex10', 'cs103-t6-ex11', 'cs103-t6-ex12', 'cs103-t6-ex13', 'cs103-t6-ex14', 'cs103-t6-drill-1', 'cs103-t6-drill-2']
  },
  {
    id: 'cs103-7',
    title: 'Design Principles and Testing',
    content: topic7Content,
    subtopics: topic7Subtopics,
    readings: topic7Readings,
    quizIds: ['cs103-quiz-7a', 'cs103-quiz-7b', 'cs103-quiz-7c'],
    exerciseIds: ['cs103-ex-7', 'cs103-t7-ex02', 'cs103-t7-ex03', 'cs103-t7-ex04', 'cs103-t7-ex05', 'cs103-t7-ex06', 'cs103-t7-ex07', 'cs103-t7-ex08', 'cs103-t7-ex09', 'cs103-t7-ex10', 'cs103-t7-ex11', 'cs103-t7-ex12', 'cs103-t7-ex13', 'cs103-t7-ex14', 'cs103-t7-drill-1', 'cs103-t7-drill-2']
  }
];
