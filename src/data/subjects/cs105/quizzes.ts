import { Quiz } from '../../../core/types';

export const cs105Quizzes: Quiz[] = [
  {
    id: 'cs105-quiz-1',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'C Basics and Syntax Quiz',
    questions: [
      {
        id: 'cs105-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the correct way to declare an integer variable named count in C?',
        options: ['int count;', 'integer count;', 'count: int;', 'var count: int;'],
        correctAnswer: 0,
        explanation: 'In C, variables are declared with the type followed by the variable name, so "int count;" is correct.'
      },
      {
        id: 'cs105-q1-2',
        type: 'multiple_choice',
        prompt: 'Which header file must be included to use printf and scanf?',
        options: ['stdlib.h', 'stdio.h', 'string.h', 'conio.h'],
        correctAnswer: 1,
        explanation: 'stdio.h (standard input/output header) contains declarations for printf, scanf, and other I/O functions.'
      },
      {
        id: 'cs105-q1-3',
        type: 'code_output',
        prompt: 'What does the following code print?',
        codeSnippet: 'int x = 5;\nint y = 2;\nprintf("%d", x / y);',
        correctAnswer: '2',
        explanation: 'Integer division in C truncates the decimal part, so 5/2 equals 2, not 2.5.'
      }
    ]
  },
  {
    id: 'cs105-quiz-2',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Pointers Quiz',
    questions: [
      {
        id: 'cs105-q2-1',
        type: 'multiple_choice',
        prompt: 'What operator is used to get the address of a variable?',
        options: ['*', '&', '->', '%'],
        correctAnswer: 1,
        explanation: 'The & operator (address-of operator) returns the memory address of a variable.'
      },
      {
        id: 'cs105-q2-2',
        type: 'multiple_choice',
        prompt: 'If int *ptr points to an integer variable x, how do you access the value of x through ptr?',
        options: ['&ptr', 'ptr', '*ptr', 'ptr->x'],
        correctAnswer: 2,
        explanation: 'The * operator dereferences a pointer, accessing the value at the memory address it stores.'
      },
      {
        id: 'cs105-q2-3',
        type: 'code_output',
        prompt: 'What value does this code print?',
        codeSnippet: 'int x = 10;\nint *ptr = &x;\n*ptr = 20;\nprintf("%d", x);',
        correctAnswer: '20',
        explanation: 'The pointer ptr points to x, so *ptr = 20 modifies x directly. Therefore x becomes 20.'
      }
    ]
  },
  {
    id: 'cs105-quiz-3',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Management Quiz',
    questions: [
      {
        id: 'cs105-q3-1',
        type: 'multiple_choice',
        prompt: 'Which function is used to allocate memory dynamically in C?',
        options: ['alloc()', 'malloc()', 'new()', 'create()'],
        correctAnswer: 1,
        explanation: 'malloc (memory allocation) from stdlib.h allocates a specified number of bytes on the heap.'
      },
      {
        id: 'cs105-q3-2',
        type: 'multiple_choice',
        prompt: 'What happens if you forget to call free() after malloc()?',
        options: ['Compilation error', 'Memory leak', 'Segmentation fault', 'Nothing, memory is auto-freed'],
        correctAnswer: 1,
        explanation: 'Failing to free dynamically allocated memory causes a memory leak, where memory is not returned to the system.'
      },
      {
        id: 'cs105-q3-3',
        type: 'true_false',
        prompt: 'The calloc() function initializes allocated memory to zero.',
        correctAnswer: true,
        explanation: 'Unlike malloc, calloc initializes all bytes in the allocated memory to zero.'
      }
    ]
  },
  {
    id: 'cs105-quiz-4',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Structures Quiz',
    questions: [
      {
        id: 'cs105-q4-1',
        type: 'multiple_choice',
        prompt: 'What keyword is used to define a structure in C?',
        options: ['class', 'struct', 'record', 'object'],
        correctAnswer: 1,
        explanation: 'The struct keyword is used to define structures in C.'
      },
      {
        id: 'cs105-q4-2',
        type: 'multiple_choice',
        prompt: 'How do you access a member of a structure through a pointer to that structure?',
        options: ['ptr.member', 'ptr->member', '*ptr.member', 'ptr::member'],
        correctAnswer: 1,
        explanation: 'The arrow operator (->) is used to access structure members through a pointer.'
      },
      {
        id: 'cs105-q4-3',
        type: 'true_false',
        prompt: 'A structure can contain members of different data types.',
        correctAnswer: true,
        explanation: 'Structures can group variables of different types, unlike arrays which must contain elements of the same type.'
      }
    ]
  },
  {
    id: 'cs105-quiz-5',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File I/O Quiz',
    questions: [
      {
        id: 'cs105-q5-1',
        type: 'multiple_choice',
        prompt: 'Which function is used to open a file in C?',
        options: ['open()', 'fopen()', 'file_open()', 'readfile()'],
        correctAnswer: 1,
        explanation: 'fopen() is the standard library function used to open files in C.'
      },
      {
        id: 'cs105-q5-2',
        type: 'multiple_choice',
        prompt: 'What does the file mode "w" do when opening a file?',
        options: ['Opens for reading', 'Opens for writing, creates if not exists', 'Opens for appending', 'Opens for writing only if exists'],
        correctAnswer: 1,
        explanation: 'Mode "w" opens a file for writing, creating it if it doesn\'t exist and truncating it if it does.'
      },
      {
        id: 'cs105-q5-3',
        type: 'true_false',
        prompt: 'You must always call fclose() after opening a file with fopen().',
        correctAnswer: true,
        explanation: 'fclose() should always be called to flush buffers, release resources, and ensure data is written properly.'
      }
    ]
  }
];
