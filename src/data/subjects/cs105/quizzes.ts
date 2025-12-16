import { Quiz } from '../../../core/types';

export const cs105Quizzes: Quiz[] = [
  // ========== TOPIC 1: C Basics and Syntax (3 quizzes) ==========
  {
    id: 'cs105-quiz-1',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'C Basics Quiz 1: Syntax and Variables',
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
      },
      {
        id: 'cs105-q1-4',
        type: 'multiple_choice',
        prompt: 'What is the size of char data type in C?',
        options: ['1 byte', '2 bytes', '4 bytes', 'Depends on system'],
        correctAnswer: 0,
        explanation: 'The char type is always exactly 1 byte in C, which is guaranteed by the standard.'
      },
      {
        id: 'cs105-q1-5',
        type: 'true_false',
        prompt: 'In C, variable names can start with a number.',
        correctAnswer: false,
        explanation: 'C variable names must start with a letter or underscore. They cannot start with a number.'
      }
    ]
  },
  {
    id: 'cs105-quiz-1b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'C Basics Quiz 2: Operators and Expressions',
    questions: [
      {
        id: 'cs105-q1b-1',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int a = 10, b = 3;\nprintf("%d", a % b);',
        correctAnswer: '1',
        explanation: 'The modulo operator % returns the remainder. 10 divided by 3 is 3 with remainder 1.'
      },
      {
        id: 'cs105-q1b-2',
        type: 'multiple_choice',
        prompt: 'What is the value of x after: int x = 5; x += 3;',
        options: ['5', '3', '8', '15'],
        correctAnswer: 2,
        explanation: 'The += operator adds the right operand to the left operand. x += 3 is equivalent to x = x + 3.'
      },
      {
        id: 'cs105-q1b-3',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int x = 5;\nprintf("%d %d", x++, ++x);',
        correctAnswer: '5 7',
        explanation: 'x++ returns 5 then increments to 6. ++x increments to 7 then returns 7. (Note: behavior may vary due to sequence points)'
      },
      {
        id: 'cs105-q1b-4',
        type: 'multiple_choice',
        prompt: 'Which operator has the highest precedence?',
        options: ['+', '*', '==', '()'],
        correctAnswer: 3,
        explanation: 'Parentheses have the highest precedence and are used to override default operator precedence.'
      },
      {
        id: 'cs105-q1b-5',
        type: 'true_false',
        prompt: 'The expression 5 == 5 evaluates to 1 in C.',
        correctAnswer: true,
        explanation: 'C uses 1 for true and 0 for false. The equality operator returns 1 if operands are equal.'
      }
    ]
  },
  {
    id: 'cs105-quiz-1c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'C Basics Quiz 3: Control Flow and Functions',
    questions: [
      {
        id: 'cs105-q1c-1',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'for (int i = 0; i < 3; i++) {\n    printf("%d ", i);\n}',
        correctAnswer: '0 1 2 ',
        explanation: 'The loop iterates while i < 3, printing 0, 1, 2 with spaces after each.'
      },
      {
        id: 'cs105-q1c-2',
        type: 'multiple_choice',
        prompt: 'Which statement is used to exit a loop immediately?',
        options: ['return', 'break', 'continue', 'exit'],
        correctAnswer: 1,
        explanation: 'The break statement exits the innermost loop immediately.'
      },
      {
        id: 'cs105-q1c-3',
        type: 'multiple_choice',
        prompt: 'What happens if a function with return type int does not return a value?',
        options: ['Compilation error', 'Returns 0', 'Undefined behavior', 'Returns -1'],
        correctAnswer: 2,
        explanation: 'Not returning a value from a non-void function is undefined behavior. The compiler may warn but typically allows it.'
      },
      {
        id: 'cs105-q1c-4',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int i = 0;\nwhile (i < 5) {\n    if (i == 3) break;\n    printf("%d ", i++);\n}',
        correctAnswer: '0 1 2 ',
        explanation: 'The loop prints 0, 1, 2, then when i becomes 3, break exits the loop before printing 3.'
      },
      {
        id: 'cs105-q1c-5',
        type: 'true_false',
        prompt: 'A function in C can return multiple values directly.',
        correctAnswer: false,
        explanation: 'C functions can only return a single value. To return multiple values, use pointers or structures.'
      }
    ]
  },

  // ========== TOPIC 2: Pointers (3 quizzes) ==========
  {
    id: 'cs105-quiz-2',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Pointers Quiz 1: Basics',
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
      },
      {
        id: 'cs105-q2-4',
        type: 'multiple_choice',
        prompt: 'What is a NULL pointer?',
        options: ['A pointer to zero', 'A pointer that points to nothing', 'An uninitialized pointer', 'A pointer to an empty string'],
        correctAnswer: 1,
        explanation: 'A NULL pointer is a special pointer value that indicates the pointer points to nothing (no valid memory location).'
      },
      {
        id: 'cs105-q2-5',
        type: 'true_false',
        prompt: 'The size of a pointer is always the same regardless of the data type it points to.',
        correctAnswer: true,
        explanation: 'On a given system, all pointers have the same size (e.g., 8 bytes on 64-bit systems) regardless of data type.'
      }
    ]
  },
  {
    id: 'cs105-quiz-2b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Pointers Quiz 2: Arithmetic and Arrays',
    questions: [
      {
        id: 'cs105-q2b-1',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int arr[] = {10, 20, 30};\nint *p = arr;\nprintf("%d", *(p + 1));',
        correctAnswer: '20',
        explanation: 'p + 1 points to the second element (index 1), and *(p + 1) dereferences it to get 20.'
      },
      {
        id: 'cs105-q2b-2',
        type: 'multiple_choice',
        prompt: 'If int *p = arr; what is the relationship between p[i] and *(p + i)?',
        options: ['They are different', 'They are equivalent', 'p[i] is faster', '*(p+i) is faster'],
        correctAnswer: 1,
        explanation: 'Array indexing and pointer arithmetic are equivalent: arr[i] is exactly the same as *(arr + i).'
      },
      {
        id: 'cs105-q2b-3',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int a[] = {1, 2, 3, 4, 5};\nint *p = a + 2;\nprintf("%d", p[-1]);',
        correctAnswer: '2',
        explanation: 'p points to a[2] (value 3). p[-1] is equivalent to *(p-1), which is a[1] (value 2).'
      },
      {
        id: 'cs105-q2b-4',
        type: 'multiple_choice',
        prompt: 'What happens when you increment an int pointer by 1?',
        options: ['Address increases by 1 byte', 'Address increases by sizeof(int) bytes', 'Value at pointer increases by 1', 'Nothing'],
        correctAnswer: 1,
        explanation: 'Pointer arithmetic scales by the size of the pointed-to type. For int*, p+1 moves by sizeof(int) bytes.'
      },
      {
        id: 'cs105-q2b-5',
        type: 'true_false',
        prompt: 'You can subtract two pointers of the same type to find the number of elements between them.',
        correctAnswer: true,
        explanation: 'Subtracting pointers gives the number of elements between them, not the byte difference.'
      }
    ]
  },
  {
    id: 'cs105-quiz-2c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Pointers Quiz 3: Advanced Pointers',
    questions: [
      {
        id: 'cs105-q2c-1',
        type: 'multiple_choice',
        prompt: 'What is a double pointer (int **)?',
        options: ['A pointer to two integers', 'A pointer to a pointer', 'A 2D array', 'A pointer with double precision'],
        correctAnswer: 1,
        explanation: 'A double pointer (int **) is a pointer that stores the address of another pointer.'
      },
      {
        id: 'cs105-q2c-2',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int x = 5;\nint *p = &x;\nint **pp = &p;\nprintf("%d", **pp);',
        correctAnswer: '5',
        explanation: '**pp first dereferences pp to get p, then dereferences p to get x, which is 5.'
      },
      {
        id: 'cs105-q2c-3',
        type: 'multiple_choice',
        prompt: 'What is the syntax for a function pointer that takes two ints and returns an int?',
        options: ['int (*fp)(int, int)', 'int *fp(int, int)', 'int fp*(int, int)', 'func<int(int,int)> fp'],
        correctAnswer: 0,
        explanation: 'Function pointer syntax: return_type (*pointer_name)(parameter_types). The parentheses around *fp are crucial.'
      },
      {
        id: 'cs105-q2c-4',
        type: 'multiple_choice',
        prompt: 'What does "const int *p" mean?',
        options: ['p is a constant pointer', 'The value pointed to cannot be changed through p', 'Both p and *p are constant', 'p points to constant memory'],
        correctAnswer: 1,
        explanation: 'const int *p means p points to a const int - you cannot modify *p, but you can change what p points to.'
      },
      {
        id: 'cs105-q2c-5',
        type: 'true_false',
        prompt: 'A void pointer (void *) can be directly dereferenced.',
        correctAnswer: false,
        explanation: 'void * must be cast to a specific type before dereferencing because the compiler needs to know the data size.'
      }
    ]
  },

  // ========== TOPIC 3: Memory Management (3 quizzes) ==========
  {
    id: 'cs105-quiz-3',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Quiz 1: Allocation Basics',
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
      },
      {
        id: 'cs105-q3-4',
        type: 'multiple_choice',
        prompt: 'What does malloc return if allocation fails?',
        options: ['0', 'NULL', '-1', 'Throws an exception'],
        correctAnswer: 1,
        explanation: 'malloc returns NULL if it cannot allocate the requested memory. Always check for NULL after malloc.'
      },
      {
        id: 'cs105-q3-5',
        type: 'multiple_choice',
        prompt: 'What is the difference between malloc(10) and calloc(10, 1)?',
        options: ['No difference', 'calloc initializes to zero', 'malloc is faster', 'calloc allocates more memory'],
        correctAnswer: 1,
        explanation: 'Both allocate 10 bytes, but calloc also initializes all bytes to zero while malloc leaves them uninitialized.'
      }
    ]
  },
  {
    id: 'cs105-quiz-3b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Quiz 2: Stack vs Heap',
    questions: [
      {
        id: 'cs105-q3b-1',
        type: 'multiple_choice',
        prompt: 'Where are local variables stored?',
        options: ['Heap', 'Stack', 'Global memory', 'CPU registers'],
        correctAnswer: 1,
        explanation: 'Local variables are stored on the stack and are automatically deallocated when the function returns.'
      },
      {
        id: 'cs105-q3b-2',
        type: 'true_false',
        prompt: 'Memory allocated with malloc() is automatically freed when a function returns.',
        correctAnswer: false,
        explanation: 'Heap memory persists until explicitly freed with free(). It is not automatically deallocated.'
      },
      {
        id: 'cs105-q3b-3',
        type: 'multiple_choice',
        prompt: 'What is a stack overflow?',
        options: ['Allocating too much heap memory', 'Using too many recursive calls or large local arrays', 'Accessing freed memory', 'Integer overflow'],
        correctAnswer: 1,
        explanation: 'Stack overflow occurs when the stack runs out of space, often due to deep recursion or large local arrays.'
      },
      {
        id: 'cs105-q3b-4',
        type: 'multiple_choice',
        prompt: 'Which memory region grows toward lower addresses?',
        options: ['Stack', 'Heap', 'Data segment', 'Code segment'],
        correctAnswer: 0,
        explanation: 'On most systems, the stack grows downward (toward lower addresses) while the heap grows upward.'
      },
      {
        id: 'cs105-q3b-5',
        type: 'true_false',
        prompt: 'Static local variables are stored on the stack.',
        correctAnswer: false,
        explanation: 'Static variables are stored in the data segment, not the stack. They persist for the program lifetime.'
      }
    ]
  },
  {
    id: 'cs105-quiz-3c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Quiz 3: Common Errors',
    questions: [
      {
        id: 'cs105-q3c-1',
        type: 'multiple_choice',
        prompt: 'What is a "dangling pointer"?',
        options: ['A NULL pointer', 'A pointer to freed memory', 'An uninitialized pointer', 'A pointer to stack memory'],
        correctAnswer: 1,
        explanation: 'A dangling pointer points to memory that has been freed. Using it causes undefined behavior.'
      },
      {
        id: 'cs105-q3c-2',
        type: 'multiple_choice',
        prompt: 'What is a "double free" error?',
        options: ['Freeing twice the allocated size', 'Calling free() twice on the same pointer', 'Freeing a double pointer', 'Freeing static memory'],
        correctAnswer: 1,
        explanation: 'Double free means calling free() twice on the same memory address, which corrupts the heap.'
      },
      {
        id: 'cs105-q3c-3',
        type: 'true_false',
        prompt: 'It is safe to call free(NULL).',
        correctAnswer: true,
        explanation: 'free(NULL) is defined to do nothing. This is safe and a common pattern for cleanup code.'
      },
      {
        id: 'cs105-q3c-4',
        type: 'multiple_choice',
        prompt: 'Which tool is commonly used to detect memory errors in C programs?',
        options: ['GDB', 'Valgrind', 'GCC', 'Make'],
        correctAnswer: 1,
        explanation: 'Valgrind is a tool that detects memory leaks, invalid accesses, and other memory errors.'
      },
      {
        id: 'cs105-q3c-5',
        type: 'multiple_choice',
        prompt: 'What is "use after free"?',
        options: ['Using malloc after free', 'Accessing memory after it has been freed', 'Using free without malloc', 'Freeing uninitialized memory'],
        correctAnswer: 1,
        explanation: 'Use after free means accessing memory through a pointer after that memory has been freed.'
      }
    ]
  },

  // ========== TOPIC 4: Structures (3 quizzes) ==========
  {
    id: 'cs105-quiz-4',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Structures Quiz 1: Basics',
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
      },
      {
        id: 'cs105-q4-4',
        type: 'multiple_choice',
        prompt: 'What does typedef do when used with structures?',
        options: ['Creates a new structure type', 'Defines an alias for the structure type', 'Makes the structure private', 'Initializes the structure'],
        correctAnswer: 1,
        explanation: 'typedef creates an alias, so you can use the alias name instead of "struct StructName" everywhere.'
      },
      {
        id: 'cs105-q4-5',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'struct Point { int x, y; };\nstruct Point p = {3, 4};\nprintf("%d", p.x + p.y);',
        correctAnswer: '7',
        explanation: 'p.x is 3 and p.y is 4, so p.x + p.y equals 7.'
      }
    ]
  },
  {
    id: 'cs105-quiz-4b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Structures Quiz 2: Memory Layout',
    questions: [
      {
        id: 'cs105-q4b-1',
        type: 'multiple_choice',
        prompt: 'Why might sizeof(struct) be larger than the sum of its members?',
        options: ['Compiler bug', 'Structure padding for alignment', 'Extra memory for methods', 'Virtual table pointer'],
        correctAnswer: 1,
        explanation: 'Compilers add padding bytes between members to ensure proper memory alignment for efficiency.'
      },
      {
        id: 'cs105-q4b-2',
        type: 'true_false',
        prompt: 'The order of members in a structure can affect its total size.',
        correctAnswer: true,
        explanation: 'Different member ordering can result in different amounts of padding and thus different total sizes.'
      },
      {
        id: 'cs105-q4b-3',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the offsetof macro?',
        options: ['Get structure size', 'Get member offset from structure start', 'Offset array indices', 'Calculate padding'],
        correctAnswer: 1,
        explanation: 'offsetof(struct_type, member) returns the byte offset of a member within the structure.'
      },
      {
        id: 'cs105-q4b-4',
        type: 'multiple_choice',
        prompt: 'What does __attribute__((packed)) do in GCC?',
        options: ['Compresses data', 'Removes structure padding', 'Encrypts structure', 'Aligns to 64-bit boundary'],
        correctAnswer: 1,
        explanation: 'The packed attribute tells GCC to use minimal storage without padding, at potential cost to access speed.'
      },
      {
        id: 'cs105-q4b-5',
        type: 'true_false',
        prompt: 'A structure containing only chars never has padding.',
        correctAnswer: false,
        explanation: 'While chars don\'t need alignment, the structure itself may need end padding for array alignment.'
      }
    ]
  },
  {
    id: 'cs105-quiz-4c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Structures Quiz 3: Advanced',
    questions: [
      {
        id: 'cs105-q4c-1',
        type: 'multiple_choice',
        prompt: 'What is a self-referential structure?',
        options: ['A structure that calls itself', 'A structure containing a pointer to its own type', 'A recursive function structure', 'A structure with a name member'],
        correctAnswer: 1,
        explanation: 'A self-referential structure contains a pointer to another instance of the same structure type (e.g., linked list nodes).'
      },
      {
        id: 'cs105-q4c-2',
        type: 'multiple_choice',
        prompt: 'What is the difference between a struct and a union?',
        options: ['No difference', 'Struct members share memory, union members don\'t', 'Union members share memory, struct members don\'t', 'Unions can only have two members'],
        correctAnswer: 2,
        explanation: 'In a union, all members share the same memory location. Only one member can be used at a time.'
      },
      {
        id: 'cs105-q4c-3',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'union Data { int i; char c; };\nunion Data d;\nd.i = 65;\nprintf("%c", d.c);',
        correctAnswer: 'A',
        explanation: 'Since union members share memory, d.c reads the first byte of d.i, which is 65 (ASCII for \'A\').'
      },
      {
        id: 'cs105-q4c-4',
        type: 'multiple_choice',
        prompt: 'What are bit fields in structures used for?',
        options: ['Storing floating point bits', 'Packing multiple values into fewer bytes', 'Defining bit-level functions', 'Binary file I/O'],
        correctAnswer: 1,
        explanation: 'Bit fields allow specifying exact bit widths for members, useful for flags or protocol fields.'
      },
      {
        id: 'cs105-q4c-5',
        type: 'true_false',
        prompt: 'Structures can be passed to functions by value in C.',
        correctAnswer: true,
        explanation: 'Structures can be passed by value (copied) or by pointer. Passing by value copies the entire structure.'
      }
    ]
  },

  // ========== TOPIC 5: File I/O (3 quizzes) ==========
  {
    id: 'cs105-quiz-5',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File I/O Quiz 1: Basics',
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
        options: ['Opens for reading', 'Opens for writing (creates/truncates)', 'Opens for appending', 'Opens for writing only if exists'],
        correctAnswer: 1,
        explanation: 'Mode "w" opens a file for writing, creating it if it doesn\'t exist and truncating it if it does.'
      },
      {
        id: 'cs105-q5-3',
        type: 'true_false',
        prompt: 'You must always call fclose() after opening a file with fopen().',
        correctAnswer: true,
        explanation: 'fclose() should always be called to flush buffers, release resources, and ensure data is written properly.'
      },
      {
        id: 'cs105-q5-4',
        type: 'multiple_choice',
        prompt: 'What does fopen() return if the file cannot be opened?',
        options: ['0', 'NULL', '-1', 'An error code'],
        correctAnswer: 1,
        explanation: 'fopen() returns NULL if it cannot open the file. Always check for NULL after fopen().'
      },
      {
        id: 'cs105-q5-5',
        type: 'multiple_choice',
        prompt: 'What is the difference between "r" and "r+" modes?',
        options: ['No difference', 'r+ allows writing too', 'r is faster', 'r+ creates file if missing'],
        correctAnswer: 1,
        explanation: '"r" is read-only, while "r+" opens for both reading and writing. Both require the file to exist.'
      }
    ]
  },
  {
    id: 'cs105-quiz-5b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File I/O Quiz 2: Reading and Writing',
    questions: [
      {
        id: 'cs105-q5b-1',
        type: 'multiple_choice',
        prompt: 'Which function reads a line of text from a file?',
        options: ['fscanf()', 'fgets()', 'fread()', 'getline()'],
        correctAnswer: 1,
        explanation: 'fgets() reads a line (up to newline or buffer size) from a file. It\'s the safest way to read lines.'
      },
      {
        id: 'cs105-q5b-2',
        type: 'true_false',
        prompt: 'fgets() includes the newline character in the string it reads.',
        correctAnswer: true,
        explanation: 'fgets() includes the newline (if there\'s room in the buffer) and always null-terminates the string.'
      },
      {
        id: 'cs105-q5b-3',
        type: 'multiple_choice',
        prompt: 'What is the return value of fgetc() when end of file is reached?',
        options: ['0', 'NULL', 'EOF', '-1'],
        correctAnswer: 2,
        explanation: 'fgetc() returns EOF (typically -1) when end of file is reached or an error occurs.'
      },
      {
        id: 'cs105-q5b-4',
        type: 'multiple_choice',
        prompt: 'Why does fgetc() return int instead of char?',
        options: ['To return larger values', 'To distinguish EOF from valid characters', 'To be compatible with Unicode', 'Historical reasons only'],
        correctAnswer: 1,
        explanation: 'fgetc() returns int to distinguish EOF (-1) from the valid character 0xFF (255 as unsigned char).'
      },
      {
        id: 'cs105-q5b-5',
        type: 'multiple_choice',
        prompt: 'Which function writes formatted data to a file?',
        options: ['printf()', 'fprintf()', 'fwrite()', 'fputs()'],
        correctAnswer: 1,
        explanation: 'fprintf() writes formatted data to a file, similar to printf() but with a file stream argument.'
      }
    ]
  },
  {
    id: 'cs105-quiz-5c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'File I/O Quiz 3: Binary and Positioning',
    questions: [
      {
        id: 'cs105-q5c-1',
        type: 'multiple_choice',
        prompt: 'What does the "b" in "rb" mode indicate?',
        options: ['Buffered mode', 'Binary mode', 'Blocked mode', 'Both read and write'],
        correctAnswer: 1,
        explanation: '"b" indicates binary mode, which disables newline translation. Required for non-text files.'
      },
      {
        id: 'cs105-q5c-2',
        type: 'multiple_choice',
        prompt: 'What function is used to move the file position indicator?',
        options: ['fmove()', 'fseek()', 'fposition()', 'fset()'],
        correctAnswer: 1,
        explanation: 'fseek() moves the file position indicator to a specified location in the file.'
      },
      {
        id: 'cs105-q5c-3',
        type: 'multiple_choice',
        prompt: 'What does SEEK_END mean in fseek()?',
        options: ['Seek to end and stop', 'Position relative to end of file', 'End seeking mode', 'Close file after seek'],
        correctAnswer: 1,
        explanation: 'SEEK_END means the offset is relative to the end of the file. Often used with offset 0 to go to EOF.'
      },
      {
        id: 'cs105-q5c-4',
        type: 'true_false',
        prompt: 'fread() and fwrite() work with binary data.',
        correctAnswer: true,
        explanation: 'fread() and fwrite() transfer raw bytes without interpretation, making them ideal for binary I/O.'
      },
      {
        id: 'cs105-q5c-5',
        type: 'multiple_choice',
        prompt: 'What does ftell() return?',
        options: ['Number of bytes written', 'Current file position', 'File size', 'Error code'],
        correctAnswer: 1,
        explanation: 'ftell() returns the current position in the file (offset from the beginning).'
      }
    ]
  },

  // ========== TOPIC 6: Preprocessor and Build System (3 quizzes) ==========
  {
    id: 'cs105-quiz-6',
    subjectId: 'cs105',
    topicId: 'cs105-topic-6',
    title: 'Preprocessor Quiz 1: Macros',
    questions: [
      {
        id: 'cs105-q6-1',
        type: 'multiple_choice',
        prompt: 'What character begins a preprocessor directive?',
        options: ['@', '#', '!', '$'],
        correctAnswer: 1,
        explanation: 'Preprocessor directives in C begin with the # character, like #include and #define.'
      },
      {
        id: 'cs105-q6-2',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: '#define SQUARE(x) ((x) * (x))\nint a = 3;\nprintf("%d", SQUARE(a + 1));',
        correctAnswer: '16',
        explanation: 'The macro expands to ((a + 1) * (a + 1)) = ((3 + 1) * (3 + 1)) = 16. Parentheses prevent operator precedence issues.'
      },
      {
        id: 'cs105-q6-3',
        type: 'multiple_choice',
        prompt: 'What is the difference between #include <file.h> and #include "file.h"?',
        options: ['No difference', 'Angle brackets search system directories first', '"" is for C++ only', '<> is newer syntax'],
        correctAnswer: 1,
        explanation: 'Angle brackets <> search system include directories first. Double quotes "" search the current directory first, then system directories.'
      },
      {
        id: 'cs105-q6-4',
        type: 'true_false',
        prompt: 'Macros are type-safe like inline functions.',
        correctAnswer: false,
        explanation: 'Macros are text substitution and have no type checking. They can operate on any type but with potential unexpected behavior.'
      },
      {
        id: 'cs105-q6-5',
        type: 'multiple_choice',
        prompt: 'What does the ## operator do in macros?',
        options: ['Logical AND', 'String comparison', 'Token concatenation', 'Double comment'],
        correctAnswer: 2,
        explanation: 'The ## operator concatenates two tokens. For example, #define CONCAT(a, b) a##b makes CONCAT(var, 1) become var1.'
      }
    ]
  },
  {
    id: 'cs105-quiz-6b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-6',
    title: 'Preprocessor Quiz 2: Conditional Compilation',
    questions: [
      {
        id: 'cs105-q6b-1',
        type: 'multiple_choice',
        prompt: 'Which directive tests if a macro is defined?',
        options: ['#if', '#ifdef', '#define', '#check'],
        correctAnswer: 1,
        explanation: '#ifdef checks if a macro is defined. #if can also check with #if defined(MACRO).'
      },
      {
        id: 'cs105-q6b-2',
        type: 'multiple_choice',
        prompt: 'What is an include guard used for?',
        options: ['Security', 'Preventing multiple inclusions', 'Speeding up compilation', 'Encryption'],
        correctAnswer: 1,
        explanation: 'Include guards (#ifndef, #define, #endif pattern) prevent a header file from being included multiple times in the same translation unit.'
      },
      {
        id: 'cs105-q6b-3',
        type: 'code_output',
        prompt: 'What does this print when DEBUG is defined?',
        codeSnippet: '#define DEBUG\n#ifdef DEBUG\nprintf("Debug mode");\n#else\nprintf("Release mode");\n#endif',
        correctAnswer: 'Debug mode',
        explanation: 'Since DEBUG is defined, the #ifdef DEBUG block is included and "Debug mode" is printed.'
      },
      {
        id: 'cs105-q6b-4',
        type: 'true_false',
        prompt: '#pragma once is a standard C feature.',
        correctAnswer: false,
        explanation: '#pragma once is a widely supported compiler extension but not part of the C standard. Include guards are the portable solution.'
      },
      {
        id: 'cs105-q6b-5',
        type: 'multiple_choice',
        prompt: 'What does #undef do?',
        options: ['Undefines a macro', 'Causes undefined behavior', 'Declares undefined variable', 'Undoes last include'],
        correctAnswer: 0,
        explanation: '#undef removes a previously defined macro, allowing it to be redefined or left undefined.'
      }
    ]
  },
  {
    id: 'cs105-quiz-6c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-6',
    title: 'Preprocessor Quiz 3: Build Systems',
    questions: [
      {
        id: 'cs105-q6c-1',
        type: 'multiple_choice',
        prompt: 'What is a translation unit in C?',
        options: ['A function', 'A source file after preprocessing', 'A library', 'A header file'],
        correctAnswer: 1,
        explanation: 'A translation unit is a source file after all #include directives are resolved and preprocessing is complete.'
      },
      {
        id: 'cs105-q6c-2',
        type: 'multiple_choice',
        prompt: 'What does the linker do?',
        options: ['Preprocesses code', 'Compiles to assembly', 'Combines object files into executable', 'Checks syntax'],
        correctAnswer: 2,
        explanation: 'The linker combines object files (.o) and resolves external symbols to create the final executable.'
      },
      {
        id: 'cs105-q6c-3',
        type: 'true_false',
        prompt: 'Header files should contain function implementations.',
        correctAnswer: false,
        explanation: 'Header files should contain declarations, not definitions. Definitions in headers can cause multiple definition errors.'
      },
      {
        id: 'cs105-q6c-4',
        type: 'multiple_choice',
        prompt: 'What file extension is typically used for object files?',
        options: ['.obj or .o', '.exe', '.lib', '.src'],
        correctAnswer: 0,
        explanation: 'Object files use .o on Unix/Linux and .obj on Windows. They contain compiled but not linked code.'
      },
      {
        id: 'cs105-q6c-5',
        type: 'multiple_choice',
        prompt: 'In a Makefile, what does a target depend on?',
        options: ['Nothing', 'Prerequisites listed after the colon', 'All source files', 'The compiler'],
        correctAnswer: 1,
        explanation: 'In a Makefile rule "target: prerequisites", the target depends on the files listed after the colon.'
      }
    ]
  },

  // ========== TOPIC 7: Advanced C Topics (3 quizzes) ==========
  {
    id: 'cs105-quiz-7',
    subjectId: 'cs105',
    topicId: 'cs105-topic-7',
    title: 'Advanced C Quiz 1: Bitwise Operations',
    questions: [
      {
        id: 'cs105-q7-1',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'unsigned int x = 5;  // 0101 in binary\nprintf("%u", x << 1);',
        correctAnswer: '10',
        explanation: 'Left shift by 1 multiplies by 2. 5 (0101) becomes 10 (1010).'
      },
      {
        id: 'cs105-q7-2',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int a = 12;  // 1100\nint b = 10;  // 1010\nprintf("%d", a & b);',
        correctAnswer: '8',
        explanation: 'Bitwise AND: 1100 & 1010 = 1000 = 8. Only bits set in both values remain.'
      },
      {
        id: 'cs105-q7-3',
        type: 'multiple_choice',
        prompt: 'Which operation is commonly used to check if a bit is set?',
        options: ['OR', 'AND', 'XOR', 'NOT'],
        correctAnswer: 1,
        explanation: 'AND with a mask checks if specific bits are set: if (value & (1 << bit)) tests if bit is set.'
      },
      {
        id: 'cs105-q7-4',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'int x = 5;  // 0101\nx ^= 3;      // 0011\nprintf("%d", x);',
        correctAnswer: '6',
        explanation: 'XOR: 0101 ^ 0011 = 0110 = 6. XOR flips bits where the mask has 1s.'
      },
      {
        id: 'cs105-q7-5',
        type: 'true_false',
        prompt: 'Right shifting a signed negative integer is implementation-defined.',
        correctAnswer: true,
        explanation: 'Right shifting signed negative values may fill with 0s or 1s depending on the compiler (logical vs arithmetic shift).'
      }
    ]
  },
  {
    id: 'cs105-quiz-7b',
    subjectId: 'cs105',
    topicId: 'cs105-topic-7',
    title: 'Advanced C Quiz 2: Unions and Enums',
    questions: [
      {
        id: 'cs105-q7b-1',
        type: 'multiple_choice',
        prompt: 'What is the size of a union?',
        options: ['Sum of all members', 'Size of largest member', 'Always 4 bytes', 'Size of first member'],
        correctAnswer: 1,
        explanation: 'A union is large enough to hold its largest member, since all members share the same memory.'
      },
      {
        id: 'cs105-q7b-2',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: 'enum Color { RED, GREEN = 5, BLUE };\nprintf("%d", BLUE);',
        correctAnswer: '6',
        explanation: 'Enum values continue from the last specified value. GREEN = 5, so BLUE = 6.'
      },
      {
        id: 'cs105-q7b-3',
        type: 'true_false',
        prompt: 'Reading a different union member than was last written is undefined behavior.',
        correctAnswer: false,
        explanation: 'Type punning through unions is allowed in C (unlike C++). It\'s commonly used to reinterpret bit patterns.'
      },
      {
        id: 'cs105-q7b-4',
        type: 'multiple_choice',
        prompt: 'What are unions commonly used for?',
        options: ['Inheritance', 'Memory saving/type punning', 'Function overloading', 'Encryption'],
        correctAnswer: 1,
        explanation: 'Unions save memory when only one of several types is needed at a time, and enable type punning.'
      },
      {
        id: 'cs105-q7b-5',
        type: 'multiple_choice',
        prompt: 'What is a tagged union?',
        options: ['A union with a label', 'A union paired with an enum indicating active member', 'A union of strings', 'A union in a struct'],
        correctAnswer: 1,
        explanation: 'A tagged union combines a union with an enum or integer that tracks which member is currently valid.'
      }
    ]
  },
  {
    id: 'cs105-quiz-7c',
    subjectId: 'cs105',
    topicId: 'cs105-topic-7',
    title: 'Advanced C Quiz 3: Type Qualifiers and Variadic Functions',
    questions: [
      {
        id: 'cs105-q7c-1',
        type: 'multiple_choice',
        prompt: 'What does the volatile keyword indicate?',
        options: ['Variable is temporary', 'Variable may change unexpectedly', 'Variable is thread-safe', 'Variable is fast'],
        correctAnswer: 1,
        explanation: 'volatile tells the compiler the variable may be changed by external factors, preventing certain optimizations.'
      },
      {
        id: 'cs105-q7c-2',
        type: 'multiple_choice',
        prompt: 'What does restrict mean for a pointer?',
        options: ['Pointer is read-only', 'Pointer is the only way to access that memory', 'Pointer cannot be NULL', 'Pointer is aligned'],
        correctAnswer: 1,
        explanation: 'restrict promises the compiler that the pointer is the only way to access its memory, enabling optimizations.'
      },
      {
        id: 'cs105-q7c-3',
        type: 'multiple_choice',
        prompt: 'Which header is needed for variadic functions?',
        options: ['stdio.h', 'stdarg.h', 'stdlib.h', 'varargs.h'],
        correctAnswer: 1,
        explanation: 'stdarg.h provides va_list, va_start, va_arg, and va_end for implementing variadic functions.'
      },
      {
        id: 'cs105-q7c-4',
        type: 'true_false',
        prompt: 'A variadic function must have at least one fixed parameter.',
        correctAnswer: true,
        explanation: 'The C standard requires at least one named parameter before the ellipsis (...) in a variadic function.'
      },
      {
        id: 'cs105-q7c-5',
        type: 'multiple_choice',
        prompt: 'What does va_arg do?',
        options: ['Starts argument processing', 'Retrieves next argument of specified type', 'Counts arguments', 'Ends argument processing'],
        correctAnswer: 1,
        explanation: 'va_arg(ap, type) retrieves the next argument from the va_list, interpreting it as the specified type.'
      }
    ]
  }
];
