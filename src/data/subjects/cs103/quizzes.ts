import { Quiz } from '../../../core/types';

export const cs103Quizzes: Quiz[] = [
  {
    id: 'cs103-quiz-1',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Classes and Objects',
    questions: [
      {
        id: 'cs103-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the __init__ method in a Python class?',
        options: [
          'To delete an object',
          'To initialize a new object with starting values',
          'To define class variables',
          'To create a string representation of the object'
        ],
        correctAnswer: 1,
        explanation: 'The __init__ method is a constructor that initializes new objects when they are created, setting up initial attribute values.'
      },
      {
        id: 'cs103-q1-2',
        type: 'multiple_choice',
        prompt: 'What does the self parameter represent in a Python instance method?',
        options: [
          'The class itself',
          'The parent class',
          'The instance of the object calling the method',
          'A static reference'
        ],
        correctAnswer: 2,
        explanation: 'The self parameter refers to the specific instance of the object that called the method, allowing access to that instance\'s attributes and methods.'
      },
      {
        id: 'cs103-q1-3',
        type: 'true_false',
        prompt: 'Multiple objects created from the same class share the same instance variables.',
        correctAnswer: false,
        explanation: 'Each object has its own copy of instance variables. Only class variables are shared among all instances of a class.'
      }
    ]
  },
  {
    id: 'cs103-quiz-2',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Encapsulation',
    questions: [
      {
        id: 'cs103-q2-1',
        type: 'multiple_choice',
        prompt: 'In Python, what does a single underscore prefix (_variable) indicate?',
        options: [
          'A private variable that cannot be accessed',
          'A protected variable intended for internal use',
          'A public variable',
          'A constant variable'
        ],
        correctAnswer: 1,
        explanation: 'A single underscore prefix indicates a protected member intended for internal use, though it\'s still technically accessible.'
      },
      {
        id: 'cs103-q2-2',
        type: 'multiple_choice',
        prompt: 'What is the main benefit of using the @property decorator in Python?',
        options: [
          'It makes variables faster',
          'It allows implementing getters and setters with attribute-like syntax',
          'It prevents all access to the variable',
          'It automatically validates all inputs'
        ],
        correctAnswer: 1,
        explanation: 'The @property decorator provides a clean way to implement getters and setters while maintaining simple attribute-like access syntax.'
      },
      {
        id: 'cs103-q2-3',
        type: 'true_false',
        prompt: 'Encapsulation allows changing internal implementation without affecting external code.',
        correctAnswer: true,
        explanation: 'Encapsulation hides implementation details, allowing you to modify internal code without breaking external code that depends on the public interface.'
      }
    ]
  },
  {
    id: 'cs103-quiz-3',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Inheritance',
    questions: [
      {
        id: 'cs103-q3-1',
        type: 'multiple_choice',
        prompt: 'What relationship does inheritance model between classes?',
        options: [
          'Has-a relationship',
          'Is-a relationship',
          'Uses-a relationship',
          'Creates-a relationship'
        ],
        correctAnswer: 1,
        explanation: 'Inheritance models an "is-a" relationship, where the child class is a specialized type of the parent class.'
      },
      {
        id: 'cs103-q3-2',
        type: 'multiple_choice',
        prompt: 'What does the super() function do in Python?',
        options: [
          'Creates a new parent class',
          'Deletes the parent class',
          'Calls methods from the parent class',
          'Prevents inheritance'
        ],
        correctAnswer: 2,
        explanation: 'The super() function allows calling methods from the parent class, enabling you to extend functionality rather than completely replace it.'
      },
      {
        id: 'cs103-q3-3',
        type: 'true_false',
        prompt: 'Python supports multiple inheritance, allowing a class to inherit from multiple parent classes.',
        correctAnswer: true,
        explanation: 'Python does support multiple inheritance, though it should be used carefully to avoid complexity and potential conflicts.'
      }
    ]
  },
  {
    id: 'cs103-quiz-4',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Polymorphism',
    questions: [
      {
        id: 'cs103-q4-1',
        type: 'multiple_choice',
        prompt: 'What is polymorphism in object-oriented programming?',
        options: [
          'Using multiple variables',
          'The ability of different objects to respond to the same method call in different ways',
          'Creating multiple classes',
          'Having multiple constructors'
        ],
        correctAnswer: 1,
        explanation: 'Polymorphism allows objects of different classes to respond to the same method call in their own specific ways.'
      },
      {
        id: 'cs103-q4-2',
        type: 'multiple_choice',
        prompt: 'What Python feature enables polymorphism without requiring explicit inheritance?',
        options: [
          'Static typing',
          'Duck typing',
          'Strong typing',
          'Type hints'
        ],
        correctAnswer: 1,
        explanation: 'Duck typing allows polymorphism based on whether an object has the required methods, regardless of its inheritance hierarchy.'
      },
      {
        id: 'cs103-q4-3',
        type: 'true_false',
        prompt: 'Operator overloading in Python is achieved through special methods like __add__ and __str__.',
        correctAnswer: true,
        explanation: 'Python uses special methods (dunder methods) to enable operator overloading, allowing custom objects to work with built-in operators.'
      }
    ]
  },
  {
    id: 'cs103-quiz-5',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Design Patterns',
    questions: [
      {
        id: 'cs103-q5-1',
        type: 'multiple_choice',
        prompt: 'What is a design pattern?',
        options: [
          'A specific piece of code to copy',
          'A reusable solution to a commonly occurring problem in software design',
          'A programming language feature',
          'A type of algorithm'
        ],
        correctAnswer: 1,
        explanation: 'Design patterns are reusable solutions to common software design problems, representing best practices that have proven effective over time.'
      },
      {
        id: 'cs103-q5-2',
        type: 'multiple_choice',
        prompt: 'What does the Singleton pattern ensure?',
        options: [
          'Multiple instances are created efficiently',
          'A class has only one instance and provides global access to it',
          'Objects are created in pairs',
          'Classes cannot be instantiated'
        ],
        correctAnswer: 1,
        explanation: 'The Singleton pattern ensures a class has only one instance and provides a global point of access to that instance.'
      },
      {
        id: 'cs103-q5-3',
        type: 'true_false',
        prompt: 'Design patterns should be applied to every programming problem to ensure best practices.',
        correctAnswer: false,
        explanation: 'Design patterns should be used judiciously. Applying them unnecessarily can add complexity. They should only be used when they genuinely improve the design.'
      }
    ]
  }
];
