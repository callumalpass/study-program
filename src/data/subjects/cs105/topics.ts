import { Topic } from '../../../core/types';

export const cs105Topics: Topic[] = [
  {
    id: 'cs105-topic-1',
    title: 'C Basics and Syntax',
    content: 'C is a powerful, low-level programming language developed in the 1970s that remains fundamental to systems programming today. Understanding C provides deep insights into how computers actually work. The basic structure of a C program includes preprocessor directives like #include, a main function that serves as the entry point, and statements terminated by semicolons. C uses static typing, meaning variables must be declared with their types before use. Common data types include int for integers, float and double for floating-point numbers, char for characters, and void for no type. Variables can be declared and initialized in various ways. C supports standard operators for arithmetic, comparison, and logical operations. Control structures include if-else statements, switch statements, and loops like for, while, and do-while. Functions in C must be declared before use, either through forward declarations or by defining them before they are called. Understanding these fundamentals is essential before moving to more advanced concepts like pointers and memory management. Mastering C basics provides a solid foundation for learning other programming languages and understanding computer architecture at a deeper level.',
    quizIds: ['cs105-quiz-1'],
    exerciseIds: ['cs105-exercise-1']
  },
  {
    id: 'cs105-topic-2',
    title: 'Pointers',
    content: 'Pointers are one of the most powerful and distinctive features of C, allowing direct memory manipulation and efficient data handling. A pointer is a variable that stores the memory address of another variable. The & operator gets the address of a variable, while the * operator dereferences a pointer to access the value at that address. Pointer declaration syntax uses an asterisk, such as int *ptr. Understanding pointer arithmetic is crucial as incrementing a pointer moves it by the size of its pointed type. Pointers enable pass-by-reference in functions, allowing functions to modify original variables rather than copies. This is essential for efficient handling of large data structures. Null pointers, initialized with NULL, point to nothing and should be checked before dereferencing to avoid crashes. Pointer-to-pointer (double pointers) are used for dynamic two-dimensional arrays and modifying pointers in functions. Function pointers store addresses of functions and enable callbacks and dynamic function calls. Common pitfalls include dangling pointers (pointing to freed memory), memory leaks (forgetting to free allocated memory), and segmentation faults from invalid memory access. Mastering pointers is essential for understanding C\'s power and for systems programming, embedded systems, and performance-critical applications.',
    quizIds: ['cs105-quiz-2'],
    exerciseIds: ['cs105-exercise-2']
  },
  {
    id: 'cs105-topic-3',
    title: 'Memory Management',
    content: 'Memory management in C requires manual allocation and deallocation, giving programmers complete control but also responsibility. C provides two types of memory: stack memory (automatic) and heap memory (dynamic). Stack memory is automatically managed, used for local variables and function calls, with limited size and LIFO structure. Heap memory is managed manually using functions from stdlib.h. The malloc function allocates a specified number of bytes and returns a void pointer that should be cast to the appropriate type. The calloc function allocates memory for an array and initializes all bytes to zero. The realloc function resizes previously allocated memory blocks. The free function releases allocated memory back to the system. Failing to free memory causes memory leaks, where programs consume increasing amounts of memory. Memory should be freed in the reverse order of allocation for good practice. Valgrind and similar tools help detect memory leaks and invalid memory access. Common errors include use-after-free (accessing freed memory), double-free (freeing the same memory twice), and buffer overflows (writing beyond allocated boundaries). Understanding memory layout, including the stack, heap, data segment, and code segment, is crucial. Proper memory management is essential for writing robust, efficient C programs that don\'t crash or leak resources over time.',
    quizIds: ['cs105-quiz-3'],
    exerciseIds: ['cs105-exercise-3']
  },
  {
    id: 'cs105-topic-4',
    title: 'Structures',
    content: 'Structures in C allow grouping of related data items of different types under a single name, enabling creation of complex data types. A structure is defined using the struct keyword followed by member declarations. Structures can be declared with or without typedef for convenience. Accessing structure members uses the dot operator for regular structures and the arrow operator for pointers to structures. Structures can contain any data types including arrays, pointers, and even other structures, enabling nested structures. Structures can be initialized using designated initializers or positional initialization. Passing structures to functions can be done by value (copying the entire structure) or by pointer (more efficient for large structures). Structures are commonly used to create linked lists, trees, and other data structures by including pointers to structures of the same type. The sizeof operator returns the size of a structure, which may include padding bytes added by the compiler for alignment. Structure padding ensures members are aligned on memory boundaries appropriate for their type, potentially wasting some space for performance. Arrays of structures enable storing collections of complex data. Structures form the foundation for object-oriented concepts in C++. Understanding structures is essential for organizing data effectively and building complex programs in C.',
    quizIds: ['cs105-quiz-4'],
    exerciseIds: ['cs105-exercise-4']
  },
  {
    id: 'cs105-topic-5',
    title: 'File I/O',
    content: 'File Input/Output in C provides mechanisms for reading from and writing to files, enabling persistent data storage. The stdio.h library provides file handling functions. Files are represented by FILE pointers obtained through the fopen function, which takes a filename and mode string. Common modes include "r" for reading, "w" for writing (overwrites existing), "a" for appending, and combinations with "+" for read/write. Always check if fopen returns NULL, indicating failure to open the file. The fclose function closes files and flushes buffers, preventing data loss. Character I/O functions include fgetc for reading and fputc for writing single characters. The fgets function reads a line of text, while fputs writes a string. Formatted I/O uses fprintf for writing formatted data and fscanf for reading formatted input. Binary file I/O uses fread and fwrite for reading and writing blocks of data, essential for non-text files. The fseek function positions the file pointer, ftell returns the current position, and rewind resets to the beginning. The feof function checks for end-of-file, and ferror checks for errors. Proper error handling is crucial in file operations. Understanding buffering behavior and fflush helps manage when data is actually written. File I/O is essential for creating practical programs that persist data beyond program execution.',
    quizIds: ['cs105-quiz-5'],
    exerciseIds: ['cs105-exercise-5']
  }
];
