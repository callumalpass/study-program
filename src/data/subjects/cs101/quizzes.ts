import { Quiz } from '../../../core/types';

export const cs101Quizzes: Quiz[] = [
  {
    id: 'cs101-quiz-1',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types Quiz',
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a valid Python data type?',
        options: ['int', 'float', 'char', 'str'],
        correctAnswer: 2,
        explanation: 'Python does not have a "char" type. Single characters are represented as strings of length 1.'
      },
      {
        id: 'q1-2',
        type: 'code_output',
        prompt: 'What will this code print?\nx = 5\ny = 2\nprint(x / y)',
        codeSnippet: 'x = 5\ny = 2\nprint(x / y)',
        correctAnswer: '2.5',
        explanation: 'The / operator performs floating-point division, so 5 / 2 equals 2.5. For integer division, use // instead.'
      },
      {
        id: 'q1-3',
        type: 'true_false',
        prompt: 'In Python, you must declare the type of a variable before using it.',
        correctAnswer: false,
        explanation: 'Python is dynamically typed, meaning variable types are determined automatically at runtime. You do not need to declare types explicitly.'
      }
    ]
  },
  {
    id: 'cs101-quiz-2',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Control Flow Quiz',
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: 'What keyword is used to exit a loop early?',
        options: ['continue', 'break', 'exit', 'return'],
        correctAnswer: 1,
        explanation: 'The "break" keyword immediately exits the current loop. "continue" skips to the next iteration, and "return" exits a function.'
      },
      {
        id: 'q2-2',
        type: 'code_output',
        prompt: 'How many times will "Hello" be printed?\nfor i in range(3):\n    print("Hello")',
        codeSnippet: 'for i in range(3):\n    print("Hello")',
        correctAnswer: '3',
        explanation: 'range(3) generates numbers 0, 1, 2 (3 numbers total), so the loop executes 3 times.'
      },
      {
        id: 'q2-3',
        type: 'multiple_choice',
        prompt: 'Which statement checks if x is greater than 10 AND less than 20?',
        options: [
          'if x > 10 and x < 20:',
          'if x > 10 or x < 20:',
          'if x > 10 & x < 20:',
          'if x > 10 && x < 20:'
        ],
        correctAnswer: 0,
        explanation: 'Use "and" to combine conditions that must both be true. Python uses "and"/"or", not "&&"/"||" like some other languages.'
      }
    ]
  },
  {
    id: 'cs101-quiz-3',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Functions Quiz',
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        prompt: 'What keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation: 'Python uses the "def" keyword to define functions, short for "define".'
      },
      {
        id: 'q3-2',
        type: 'code_output',
        prompt: 'What does this function return?\ndef multiply(a, b=2):\n    return a * b\n\nresult = multiply(5)\nprint(result)',
        codeSnippet: 'def multiply(a, b=2):\n    return a * b\n\nresult = multiply(5)\nprint(result)',
        correctAnswer: '10',
        explanation: 'The function multiplies a by b. Since b has a default value of 2 and we only passed 5 for a, it calculates 5 * 2 = 10.'
      },
      {
        id: 'q3-3',
        type: 'true_false',
        prompt: 'A function in Python must always return a value.',
        correctAnswer: false,
        explanation: 'Functions can perform actions without returning values. If no return statement is used, the function implicitly returns None.'
      }
    ]
  },
  {
    id: 'cs101-quiz-4',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Lists and Dictionaries Quiz',
    questions: [
      {
        id: 'q4-1',
        type: 'multiple_choice',
        prompt: 'What is the index of the first element in a Python list?',
        options: ['1', '0', '-1', 'It depends on the list'],
        correctAnswer: 1,
        explanation: 'Python uses zero-based indexing, so the first element is at index 0.'
      },
      {
        id: 'q4-2',
        type: 'code_output',
        prompt: 'What will this code print?\nfruits = ["apple", "banana", "cherry"]\nprint(len(fruits))',
        codeSnippet: 'fruits = ["apple", "banana", "cherry"]\nprint(len(fruits))',
        correctAnswer: '3',
        explanation: 'The len() function returns the number of items in the list. There are 3 fruits in the list.'
      },
      {
        id: 'q4-3',
        type: 'multiple_choice',
        prompt: 'How do you access the value associated with key "name" in a dictionary called person?',
        options: ['person.name', 'person["name"]', 'person(name)', 'person->name'],
        correctAnswer: 1,
        explanation: 'Dictionary values are accessed using square brackets with the key: person["name"]. You can also use person.get("name") for safe access.'
      }
    ]
  },
  {
    id: 'cs101-quiz-5',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'File I/O Quiz',
    questions: [
      {
        id: 'q5-1',
        type: 'multiple_choice',
        prompt: 'Which file mode should you use to add content to the end of an existing file?',
        options: ['"r"', '"w"', '"a"', '"x"'],
        correctAnswer: 2,
        explanation: 'The "a" mode (append) adds content to the end of a file without overwriting existing content. "w" would overwrite the file.'
      },
      {
        id: 'q5-2',
        type: 'true_false',
        prompt: 'Using the "with" statement when opening files automatically closes the file when done.',
        correctAnswer: true,
        explanation: 'The "with" statement is a context manager that automatically handles file closing, even if an error occurs. This is the recommended way to work with files.'
      },
      {
        id: 'q5-3',
        type: 'multiple_choice',
        prompt: 'What method reads the entire contents of a file as a single string?',
        options: ['file.readline()', 'file.read()', 'file.readlines()', 'file.readall()'],
        correctAnswer: 1,
        explanation: 'file.read() reads the entire file content as one string. readline() reads one line, and readlines() reads all lines into a list.'
      }
    ]
  }
];
