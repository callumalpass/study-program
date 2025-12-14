import { Topic } from '../../../core/types';

export const cs103Topics: Topic[] = [
  {
    id: 'cs103-1',
    title: 'Classes and Objects',
    content: 'Classes are blueprints for creating objects in object-oriented programming. A class defines attributes (data) and methods (behavior) that objects created from it will have. Objects are instances of classes, representing specific entities with their own state and behavior.\n\nIn Python, classes are defined using the class keyword. Each object has its own copy of the instance variables defined in the class. The __init__ method is a special constructor method that initializes new objects when they are created. The self parameter refers to the instance being created or manipulated.\n\nClasses enable code organization and reusability by grouping related data and functionality together. They form the foundation of object-oriented design, allowing programmers to model real-world entities and their interactions. Understanding classes and objects is essential for writing maintainable, scalable software. Instance methods can access and modify the object\'s state, while class methods and static methods provide utility functions related to the class.',
    quizIds: ['cs103-quiz-1'],
    exerciseIds: ['cs103-ex-1', 'cs103-t1-ex02', 'cs103-t1-ex03', 'cs103-t1-ex04', 'cs103-t1-ex05', 'cs103-t1-ex06', 'cs103-t1-ex07', 'cs103-t1-ex08']
  },
  {
    id: 'cs103-2',
    title: 'Encapsulation',
    content: 'Encapsulation is the principle of bundling data and methods that operate on that data within a single unit (class), while restricting direct access to some of the object\'s components. This is a fundamental concept in object-oriented programming that helps protect data integrity and hide implementation details.\n\nIn Python, encapsulation is achieved through naming conventions. Single underscore prefix (_variable) indicates a protected member intended for internal use. Double underscore prefix (__variable) triggers name mangling, making the attribute more difficult to access from outside the class. Public attributes have no prefix and can be accessed freely.\n\nEncapsulation provides several benefits: it prevents external code from depending on internal implementation details, allows implementation changes without affecting external code, and enforces data validation through getter and setter methods. The @property decorator in Python provides a clean way to implement getters and setters while maintaining attribute-like syntax. Proper encapsulation leads to more robust and maintainable code by establishing clear boundaries between different parts of a program.',
    quizIds: ['cs103-quiz-2'],
    exerciseIds: ['cs103-ex-2', 'cs103-t2-ex02', 'cs103-t2-ex03', 'cs103-t2-ex04', 'cs103-t2-ex05', 'cs103-t2-ex06', 'cs103-t2-ex07', 'cs103-t2-ex08']
  },
  {
    id: 'cs103-3',
    title: 'Inheritance',
    content: 'Inheritance is a mechanism that allows a new class (derived or child class) to inherit attributes and methods from an existing class (base or parent class). This promotes code reuse and establishes a hierarchical relationship between classes, modeling "is-a" relationships.\n\nIn Python, inheritance is specified by placing parent class names in parentheses after the child class name. The child class inherits all public and protected members of the parent class and can override methods to provide specialized behavior. The super() function allows calling methods from the parent class, enabling extension rather than complete replacement of functionality.\n\nInheritance enables polymorphism and creates natural hierarchies in code. For example, a Student class might inherit from a Person class, gaining attributes like name and age while adding specific attributes like student_id and major. Multiple inheritance is supported in Python, allowing a class to inherit from multiple parent classes, though this should be used carefully to avoid complexity. Inheritance is powerful but should be applied thoughtfully - composition is often preferred when there isn\'t a clear "is-a" relationship.',
    quizIds: ['cs103-quiz-3'],
    exerciseIds: ['cs103-ex-3', 'cs103-t3-ex02', 'cs103-t3-ex03', 'cs103-t3-ex04', 'cs103-t3-ex05', 'cs103-t3-ex06', 'cs103-t3-ex07', 'cs103-t3-ex08']
  },
  {
    id: 'cs103-4',
    title: 'Polymorphism',
    content: 'Polymorphism means "many forms" and refers to the ability of different objects to respond to the same method call in different ways. It allows objects of different classes to be treated as objects of a common parent class, while each maintains its own specialized behavior.\n\nIn Python, polymorphism is achieved primarily through method overriding, where a child class provides a specific implementation of a method that exists in the parent class. Duck typing, a feature of Python, enables polymorphism without requiring explicit inheritance - if an object has the required methods, it can be used regardless of its type. This flexibility makes Python particularly expressive for polymorphic code.\n\nPolymorphism enables writing more generic and reusable code. For example, a draw() method could be called on different shape objects (Circle, Rectangle, Triangle), and each would render itself appropriately. Operator overloading is another form of polymorphism in Python, achieved through special methods like __add__ and __str__. This allows custom objects to work naturally with built-in operators and functions, creating more intuitive and maintainable code.',
    quizIds: ['cs103-quiz-4'],
    exerciseIds: ['cs103-ex-4', 'cs103-t4-ex02', 'cs103-t4-ex03', 'cs103-t4-ex04', 'cs103-t4-ex05', 'cs103-t4-ex06', 'cs103-t4-ex07', 'cs103-t4-ex08']
  },
  {
    id: 'cs103-5',
    title: 'Design Patterns Intro',
    content: 'Design patterns are reusable solutions to commonly occurring problems in software design. They represent best practices evolved over time and provide templates for solving problems in a way that has been proven effective. Understanding design patterns helps developers communicate solutions more effectively and build more maintainable software.\n\nCommon patterns include the Singleton pattern, which ensures a class has only one instance and provides global access to it; the Factory pattern, which provides an interface for creating objects without specifying their exact classes; and the Observer pattern, which defines a subscription mechanism to notify multiple objects about events. Each pattern addresses specific design challenges and has particular use cases.\n\nDesign patterns are not finished code but rather guidelines for structuring code to solve particular problems. They promote code reusability, flexibility, and maintainability. Learning patterns helps developers recognize common scenarios and apply proven solutions. However, patterns should be used judiciously - applying patterns unnecessarily can add complexity. The key is understanding when a pattern genuinely improves the design versus when simpler approaches suffice.',
    quizIds: ['cs103-quiz-5'],
    exerciseIds: ['cs103-ex-5', 'cs103-t5-ex02', 'cs103-t5-ex03', 'cs103-t5-ex04', 'cs103-t5-ex05', 'cs103-t5-ex06', 'cs103-t5-ex07', 'cs103-t5-ex08']
  }
];
