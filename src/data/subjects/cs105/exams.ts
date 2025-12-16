import type { Exam } from '@/core/types';

export const cs105Exams: Exam[] = [
  {
    id: 'cs105-exam-midterm',
    subjectId: 'cs105',
    title: 'CS105 Midterm (C Programming Fundamentals)',
    durationMinutes: 75,
    instructions: [
      'Closed-book exam: rely on your understanding, not references.',
      'Answer all questions; passing is 70% or higher.',
      'For code output questions, trace the code manually to determine the output.',
      'Pay attention to pointer arithmetic and memory addresses.',
      'Fill-in answers are case-sensitive unless specified.',
    ],
    questions: [
      // === C Basics and Syntax (8) ===
      {
        id: 'mid-q1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a valid C data type?',
        options: ['int', 'float', 'string', 'char'],
        correctAnswer: 2,
        explanation: 'C does not have a native `string` type. Strings are represented as arrays of `char` terminated with a null character.',
      },
      {
        id: 'mid-q2',
        type: 'code_output',
        prompt: 'What is the output of this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int x = 5;
    printf("%d\\n", x++);
    printf("%d\\n", ++x);
    return 0;
}`,
        correctAnswer: '5\n7',
        explanation: 'Post-increment (x++) returns the current value then increments. Pre-increment (++x) increments first then returns. So 5 is printed, x becomes 6, then x becomes 7 and 7 is printed.',
      },
      {
        id: 'mid-q3',
        type: 'fill_blank',
        prompt: 'The format specifier to print a character in C is ____.',
        correctAnswer: '%c',
        explanation: '%c is used to print a single character in printf and scanf.',
      },
      {
        id: 'mid-q4',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int a = 10, b = 3;
    printf("%d\\n", a / b);
    printf("%d\\n", a % b);
    return 0;
}`,
        correctAnswer: '3\n1',
        explanation: 'Integer division 10/3 = 3 (truncates). Modulo 10%3 = 1 (remainder).',
      },
      {
        id: 'mid-q5',
        type: 'true_false',
        prompt: 'In C, the size of an int is always exactly 4 bytes on all systems.',
        correctAnswer: false,
        explanation: 'The size of int is implementation-defined and can vary. It is typically 4 bytes on modern systems but could be 2 bytes on older or embedded systems.',
      },
      {
        id: 'mid-q6',
        type: 'multiple_choice',
        prompt: 'What is the correct way to declare a constant integer in C?',
        options: [
          'constant int x = 5;',
          'const int x = 5;',
          'int const x == 5;',
          'final int x = 5;',
        ],
        correctAnswer: 1,
        explanation: 'The `const` keyword is used in C to declare constants. `const int x = 5;` is correct.',
      },
      {
        id: 'mid-q7',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    for (int i = 0; i < 3; i++) {
        if (i == 1) continue;
        printf("%d ", i);
    }
    return 0;
}`,
        correctAnswer: '0 2 ',
        explanation: 'The continue statement skips the rest of the loop body when i == 1, so only 0 and 2 are printed.',
      },
      {
        id: 'mid-q8',
        type: 'fill_blank',
        prompt: 'To include a header file from the standard library in C, you use #include <____> for stdio functions.',
        correctAnswer: 'stdio.h',
        explanation: 'stdio.h (standard input/output header) contains declarations for printf, scanf, FILE operations, etc.',
      },

      // === Pointers (9) ===
      {
        id: 'mid-q9',
        type: 'multiple_choice',
        prompt: 'What does the & operator do in C?',
        options: [
          'Bitwise AND operation',
          'Returns the address of a variable',
          'Dereferences a pointer',
          'Logical AND operation',
        ],
        correctAnswer: 1,
        explanation: 'When used as a unary operator with a variable, & returns the memory address of that variable.',
      },
      {
        id: 'mid-q10',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int x = 10;
    int *p = &x;
    *p = 20;
    printf("%d\\n", x);
    return 0;
}`,
        correctAnswer: '20',
        explanation: 'p points to x. Dereferencing p (*p = 20) changes the value at that address, which is x. So x becomes 20.',
      },
      {
        id: 'mid-q11',
        type: 'true_false',
        prompt: 'A pointer variable stores a memory address, not a data value.',
        correctAnswer: true,
        explanation: 'Pointers store the memory address where data is located. The * operator dereferences the pointer to access the actual data.',
      },
      {
        id: 'mid-q12',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40};
    int *p = arr;
    printf("%d\\n", *(p + 2));
    return 0;
}`,
        correctAnswer: '30',
        explanation: 'p points to arr[0]. Adding 2 moves the pointer 2 elements forward (pointer arithmetic), so *(p + 2) is arr[2] which is 30.',
      },
      {
        id: 'mid-q13',
        type: 'multiple_choice',
        prompt: 'If int *p points to an array of integers and sizeof(int) is 4 bytes, what does p + 1 represent?',
        options: [
          'The address 1 byte after p',
          'The address 4 bytes after p',
          'The value at the next array element',
          'An error - you cannot add to pointers',
        ],
        correctAnswer: 1,
        explanation: 'Pointer arithmetic scales by the size of the pointed-to type. p + 1 moves sizeof(int) = 4 bytes forward.',
      },
      {
        id: 'mid-q14',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    printf("%d %d\\n", x, y);
    return 0;
}`,
        correctAnswer: '10 5',
        explanation: 'The swap function receives pointers to x and y. It swaps the values at those addresses, so after the call x = 10 and y = 5.',
      },
      {
        id: 'mid-q15',
        type: 'fill_blank',
        prompt: 'The special pointer value that represents "pointing to nothing" is called ____ in C.',
        correctAnswer: 'NULL',
        explanation: 'NULL is a macro representing a null pointer constant, indicating the pointer does not point to any valid memory.',
      },
      {
        id: 'mid-q16',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    char str[] = "Hello";
    char *p = str;
    printf("%c\\n", *(p + 1));
    printf("%c\\n", p[3]);
    return 0;
}`,
        correctAnswer: 'e\nl',
        explanation: 'p points to "Hello". *(p+1) is the second character "e". p[3] is equivalent to *(p+3), the fourth character "l".',
      },
      {
        id: 'mid-q17',
        type: 'multiple_choice',
        prompt: 'What is a double pointer (int **pp)?',
        options: [
          'A pointer that stores two addresses',
          'A pointer to a pointer to an int',
          'A pointer to a double precision float',
          'An invalid declaration in C',
        ],
        correctAnswer: 1,
        explanation: 'A double pointer stores the address of another pointer variable. int **pp means pp points to an int*.',
      },

      // === Memory Management (8) ===
      {
        id: 'mid-q18',
        type: 'multiple_choice',
        prompt: 'Which memory region stores local variables declared inside functions?',
        options: ['Heap', 'Stack', 'Data segment', 'Code segment'],
        correctAnswer: 1,
        explanation: 'Local variables are allocated on the stack when a function is called and deallocated when the function returns.',
      },
      {
        id: 'mid-q19',
        type: 'true_false',
        prompt: 'Memory allocated with malloc() is automatically freed when the function that allocated it returns.',
        correctAnswer: false,
        explanation: 'Heap memory allocated with malloc() persists until explicitly freed with free(). Forgetting to free causes memory leaks.',
      },
      {
        id: 'mid-q20',
        type: 'fill_blank',
        prompt: 'The function used to allocate memory on the heap in C is ____(size).',
        correctAnswer: 'malloc',
        explanation: 'malloc (memory allocation) allocates a block of memory of the specified size in bytes from the heap.',
      },
      {
        id: 'mid-q21',
        type: 'multiple_choice',
        prompt: 'What is a memory leak?',
        options: [
          'When memory is accessed after being freed',
          'When allocated memory is never freed and becomes unreachable',
          'When a pointer points outside its allocated block',
          'When the stack overflows',
        ],
        correctAnswer: 1,
        explanation: 'A memory leak occurs when dynamically allocated memory is never freed and becomes unreachable, gradually consuming available memory.',
      },
      {
        id: 'mid-q22',
        type: 'code_output',
        prompt: 'What is printed by this code? (Assume malloc succeeds)',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>
int main() {
    int *p = (int*)malloc(3 * sizeof(int));
    p[0] = 10;
    p[1] = 20;
    p[2] = 30;
    printf("%d\\n", *(p + 1));
    free(p);
    return 0;
}`,
        correctAnswer: '20',
        explanation: 'malloc allocates space for 3 integers. p[1] = 20, and *(p + 1) accesses p[1], so 20 is printed.',
      },
      {
        id: 'mid-q23',
        type: 'multiple_choice',
        prompt: 'What is the difference between malloc and calloc?',
        options: [
          'malloc is faster than calloc',
          'calloc initializes memory to zero, malloc does not',
          'malloc can only allocate one element',
          'calloc is deprecated in modern C',
        ],
        correctAnswer: 1,
        explanation: 'calloc (contiguous allocation) initializes all allocated bytes to zero. malloc leaves the memory uninitialized.',
      },
      {
        id: 'mid-q24',
        type: 'true_false',
        prompt: 'Using a pointer after calling free() on it is called a "use-after-free" error and leads to undefined behavior.',
        correctAnswer: true,
        explanation: 'After free(), the memory may be reused. Accessing it causes undefined behavior - the program may crash, corrupt data, or appear to work.',
      },
      {
        id: 'mid-q25',
        type: 'written',
        prompt: 'Explain the difference between stack and heap memory in C. When would you use each?',
        correctAnswer: 'stack heap',
        explanation: 'Stack is for automatic, short-lived variables. Heap is for dynamic, long-lived allocations.',
        modelAnswer:
          'Stack memory is automatically managed - local variables are pushed when functions are called and popped when they return. It has limited size but fast allocation. Use stack for local variables with known size.\n\nHeap memory is manually managed with malloc/free. It has larger capacity and persists until freed. Use heap when: (1) the size is unknown at compile time, (2) data must outlive the function, or (3) large allocations that would overflow the stack.',
      },
      {
        id: 'mid-q26',
        type: 'multiple_choice',
        prompt: 'What does the realloc function do if called with a size of 0?',
        options: [
          'Returns NULL without freeing the original memory',
          'Implementation-defined, may free the memory and return NULL',
          'Allocates 0 bytes and returns a valid pointer',
          'Causes undefined behavior',
        ],
        correctAnswer: 1,
        explanation: 'The behavior of realloc(ptr, 0) is implementation-defined. It may act like free(ptr) and return NULL, or return a valid minimal allocation.',
      },
    ],
  },
  {
    id: 'cs105-exam-final',
    subjectId: 'cs105',
    title: 'CS105 Final (Comprehensive C Programming)',
    durationMinutes: 120,
    instructions: [
      'Closed-book exam: rely on your understanding, not references.',
      'Answer all questions; passing is 70% or higher.',
      'This exam covers all course material including structures and file I/O.',
      'For code output questions, trace through the code carefully.',
      'Written answers should be clear and concise.',
    ],
    questions: [
      // === C Basics Review (6) ===
      {
        id: 'final-q1',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int x = 15;
    printf("%d\\n", x >> 2);
    printf("%d\\n", x << 1);
    return 0;
}`,
        correctAnswer: '3\n30',
        explanation: 'Right shift by 2 divides by 4 (15 >> 2 = 3). Left shift by 1 multiplies by 2 (15 << 1 = 30).',
      },
      {
        id: 'final-q2',
        type: 'multiple_choice',
        prompt: 'What is the result of sizeof(char) in C?',
        options: ['0', '1', '2', 'Implementation-defined'],
        correctAnswer: 1,
        explanation: 'sizeof(char) is always 1 byte by definition in the C standard. All other type sizes are measured relative to char.',
      },
      {
        id: 'final-q3',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int i;
    for (i = 0; i < 10; i++) {
        if (i == 5) break;
    }
    printf("%d\\n", i);
    return 0;
}`,
        correctAnswer: '5',
        explanation: 'The loop breaks when i equals 5. At that point, i is 5 and that value is printed.',
      },
      {
        id: 'final-q4',
        type: 'fill_blank',
        prompt: 'The ternary operator in C has the syntax: condition ? ____ : value_if_false',
        correctAnswer: 'value_if_true',
        explanation: 'The ternary operator evaluates condition and returns value_if_true when true, value_if_false when false.',
      },
      {
        id: 'final-q5',
        type: 'true_false',
        prompt: 'In C, array indexing starts at 1.',
        correctAnswer: false,
        explanation: 'C arrays are zero-indexed. The first element is at index 0.',
      },
      {
        id: 'final-q6',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    char str[] = "Hello";
    printf("%lu\\n", sizeof(str));
    return 0;
}`,
        correctAnswer: '6',
        explanation: 'The string "Hello" has 5 characters plus a null terminator, so sizeof returns 6.',
      },

      // === Pointers (8) ===
      {
        id: 'final-q7',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p = arr + 2;
    printf("%d %d\\n", *p, p[-1]);
    return 0;
}`,
        correctAnswer: '3 2',
        explanation: 'p points to arr[2] which is 3. p[-1] is equivalent to *(p-1), which is arr[1] = 2.',
      },
      {
        id: 'final-q8',
        type: 'multiple_choice',
        prompt: 'What does the following declaration mean: const int *p?',
        options: [
          'p is a constant pointer to an int',
          'p is a pointer to a constant int (cannot modify *p)',
          'Both p and *p are constant',
          'This is invalid syntax',
        ],
        correctAnswer: 1,
        explanation: '`const int *p` means p points to a const int - you cannot modify the value through this pointer (*p = x is not allowed), but you can change what p points to.',
      },
      {
        id: 'final-q9',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    int a = 5, b = 10;
    int *p1 = &a, *p2 = &b;
    *p1 = *p1 + *p2;
    printf("%d %d\\n", a, b);
    return 0;
}`,
        correctAnswer: '15 10',
        explanation: '*p1 is a, *p2 is b. The assignment *p1 = *p1 + *p2 sets a = 5 + 10 = 15. b remains 10.',
      },
      {
        id: 'final-q10',
        type: 'fill_blank',
        prompt: 'To declare a function pointer that points to a function taking an int and returning void, you write: void (*fp)(____);',
        correctAnswer: 'int',
        explanation: 'The function pointer declaration shows the parameter types in parentheses: void (*fp)(int);',
      },
      {
        id: 'final-q11',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
void modify(int **pp) {
    static int y = 100;
    *pp = &y;
}
int main() {
    int x = 5;
    int *p = &x;
    modify(&p);
    printf("%d\\n", *p);
    return 0;
}`,
        correctAnswer: '100',
        explanation: 'modify receives a pointer to p. It changes p to point to the static variable y which is 100. After the call, *p is 100.',
      },
      {
        id: 'final-q12',
        type: 'true_false',
        prompt: 'Array names in C can be used as pointers to the first element, but unlike pointers, they cannot be reassigned.',
        correctAnswer: true,
        explanation: 'An array name decays to a pointer to its first element, but it is not an lvalue - you cannot assign a new address to it.',
      },
      {
        id: 'final-q13',
        type: 'multiple_choice',
        prompt: 'What is the output of `printf("%d", &arr[2] - &arr[0])` if arr is an int array?',
        options: ['8 (assuming 4-byte ints)', '2', '0', 'Undefined behavior'],
        correctAnswer: 1,
        explanation: 'Pointer subtraction returns the number of elements between two pointers, not bytes. &arr[2] - &arr[0] = 2 elements.',
      },
      {
        id: 'final-q14',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
int main() {
    char *strs[] = {"one", "two", "three"};
    printf("%c\\n", strs[1][1]);
    printf("%s\\n", strs[2]);
    return 0;
}`,
        correctAnswer: 'w\nthree',
        explanation: 'strs[1] is "two", strs[1][1] is the second character "w". strs[2] is "three".',
      },

      // === Memory Management (8) ===
      {
        id: 'final-q15',
        type: 'multiple_choice',
        prompt: 'What does realloc do if passed a NULL pointer?',
        options: [
          'Returns NULL',
          'Behaves like malloc',
          'Causes undefined behavior',
          'Frees the memory',
        ],
        correctAnswer: 1,
        explanation: 'realloc(NULL, size) is equivalent to malloc(size). This is defined behavior in the C standard.',
      },
      {
        id: 'final-q16',
        type: 'code_output',
        prompt: 'What is printed by this code? (Assume allocations succeed)',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>
int main() {
    int *arr = (int*)calloc(3, sizeof(int));
    printf("%d %d %d\\n", arr[0], arr[1], arr[2]);
    free(arr);
    return 0;
}`,
        correctAnswer: '0 0 0',
        explanation: 'calloc initializes all allocated memory to zero, so all three elements are 0.',
      },
      {
        id: 'final-q17',
        type: 'true_false',
        prompt: 'Calling free() on the same pointer twice (double free) causes undefined behavior.',
        correctAnswer: true,
        explanation: 'Double free corrupts heap metadata and causes undefined behavior - crashes, security vulnerabilities, or silent data corruption.',
      },
      {
        id: 'final-q18',
        type: 'multiple_choice',
        prompt: 'Which tool is commonly used to detect memory leaks and memory errors in C programs?',
        options: ['gdb', 'gcc', 'valgrind', 'make'],
        correctAnswer: 2,
        explanation: 'Valgrind is a memory debugging tool that detects memory leaks, use-after-free, buffer overflows, and other memory errors.',
      },
      {
        id: 'final-q19',
        type: 'fill_blank',
        prompt: 'When realloc() cannot allocate the requested memory, it returns ____ and the original block is left unchanged.',
        correctAnswer: 'NULL',
        explanation: 'If realloc fails, it returns NULL but does not free the original memory block. The caller must handle this case.',
      },
      {
        id: 'final-q20',
        type: 'written',
        prompt: 'What is a dangling pointer? Give an example of how one can be created and why it is dangerous.',
        correctAnswer: 'dangling pointer',
        explanation: 'A dangling pointer points to memory that has been freed or is no longer valid.',
        modelAnswer:
          'A dangling pointer is a pointer that references memory that has been deallocated or is no longer valid. Example:\n\nint *p = malloc(sizeof(int));\n*p = 42;\nfree(p);  // p is now dangling\n*p = 10;  // Undefined behavior!\n\nIt is dangerous because the freed memory may be reused by subsequent allocations, so accessing a dangling pointer can corrupt other data, crash the program, or create security vulnerabilities.',
      },
      {
        id: 'final-q21',
        type: 'multiple_choice',
        prompt: 'What happens when malloc() fails to allocate memory?',
        options: [
          'The program crashes immediately',
          'It returns NULL',
          'It throws an exception',
          'It allocates from a reserve pool',
        ],
        correctAnswer: 1,
        explanation: 'malloc returns NULL when it cannot allocate the requested memory. Programs should always check for NULL before using the returned pointer.',
      },
      {
        id: 'final-q22',
        type: 'code_output',
        prompt: 'What is printed by this code? (Assume allocations succeed)',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>
int main() {
    int *p = malloc(2 * sizeof(int));
    p[0] = 5;
    p[1] = 10;
    p = realloc(p, 3 * sizeof(int));
    p[2] = 15;
    printf("%d %d %d\\n", p[0], p[1], p[2]);
    free(p);
    return 0;
}`,
        correctAnswer: '5 10 15',
        explanation: 'realloc expands the block to hold 3 ints, preserving existing values. The original values (5, 10) remain, and we add 15.',
      },

      // === Structures (9) ===
      {
        id: 'final-q23',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
struct Point {
    int x;
    int y;
};
int main() {
    struct Point p = {3, 4};
    struct Point *pp = &p;
    printf("%d %d\\n", pp->x, pp->y);
    return 0;
}`,
        correctAnswer: '3 4',
        explanation: 'The arrow operator (->) accesses struct members through a pointer. pp->x is equivalent to (*pp).x.',
      },
      {
        id: 'final-q24',
        type: 'multiple_choice',
        prompt: 'What is the purpose of typedef with structures?',
        options: [
          'To make structures faster',
          'To create an alias so you do not need to write "struct" each time',
          'To make structures take less memory',
          'To allow inheritance',
        ],
        correctAnswer: 1,
        explanation: 'typedef creates a type alias. `typedef struct Point Point;` lets you use `Point` instead of `struct Point`.',
      },
      {
        id: 'final-q25',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
struct Data {
    int a;
    char b;
    int c;
};
int main() {
    printf("%lu\\n", sizeof(struct Data));
    return 0;
}`,
        correctAnswer: '12',
        explanation: 'Due to alignment/padding: int a (4 bytes), char b (1 byte + 3 padding), int c (4 bytes) = 12 bytes total. (Assumes 4-byte int alignment.)',
      },
      {
        id: 'final-q26',
        type: 'fill_blank',
        prompt: 'To access a member of a struct through a pointer, you use the ____ operator.',
        correctAnswer: '->',
        explanation: 'The arrow operator (->) combines dereferencing and member access: p->member is equivalent to (*p).member.',
      },
      {
        id: 'final-q27',
        type: 'true_false',
        prompt: 'Structures in C can contain pointers to the same structure type (self-referential structures).',
        correctAnswer: true,
        explanation: 'Self-referential structures are used for linked data structures. Example: struct Node { int data; struct Node *next; };',
      },
      {
        id: 'final-q28',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
struct Box {
    int width;
    int height;
};
void scale(struct Box b) {
    b.width *= 2;
    b.height *= 2;
}
int main() {
    struct Box box = {10, 20};
    scale(box);
    printf("%d %d\\n", box.width, box.height);
    return 0;
}`,
        correctAnswer: '10 20',
        explanation: 'Structures are passed by value in C. The function receives a copy, so modifications do not affect the original.',
      },
      {
        id: 'final-q29',
        type: 'multiple_choice',
        prompt: 'Which approach modifies the original structure when passed to a function?',
        options: [
          'Pass by value',
          'Pass a copy',
          'Pass a pointer to the structure',
          'Structures cannot be modified by functions',
        ],
        correctAnswer: 2,
        explanation: 'Passing a pointer allows the function to modify the original structure through the pointer.',
      },
      {
        id: 'final-q30',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
#include <stdlib.h>
struct Node {
    int data;
    struct Node *next;
};
int main() {
    struct Node n1 = {10, NULL};
    struct Node n2 = {20, &n1};
    printf("%d\\n", n2.next->data);
    return 0;
}`,
        correctAnswer: '10',
        explanation: 'n2.next points to n1. n2.next->data accesses n1.data which is 10.',
      },
      {
        id: 'final-q31',
        type: 'written',
        prompt: 'Explain structure padding in C. Why does it occur and how can you minimize it?',
        correctAnswer: 'padding alignment',
        explanation: 'Structure padding occurs due to alignment requirements.',
        modelAnswer:
          'Structure padding is extra bytes the compiler inserts between struct members to ensure proper memory alignment. CPUs often require data types to be aligned to addresses that are multiples of their size (e.g., 4-byte ints at addresses divisible by 4).\n\nTo minimize padding:\n1. Order members from largest to smallest (e.g., double, int, char)\n2. Group members of the same size together\n3. Use pragma pack or __attribute__((packed)) to disable padding (but this may hurt performance)\n\nExample: struct { char a; int b; char c; } has 12 bytes, but reordering to { int b; char a; char c; } reduces it to 8 bytes.',
      },

      // === File I/O (9) ===
      {
        id: 'final-q32',
        type: 'multiple_choice',
        prompt: 'What does fopen() return when it fails to open a file?',
        options: ['0', '-1', 'NULL', 'EOF'],
        correctAnswer: 2,
        explanation: 'fopen returns NULL when it cannot open the file. Programs should check for NULL before using the file pointer.',
      },
      {
        id: 'final-q33',
        type: 'fill_blank',
        prompt: 'To open a file for reading in text mode, you use the mode string "____" with fopen.',
        correctAnswer: 'r',
        explanation: '"r" opens an existing file for reading. The file must exist or fopen returns NULL.',
      },
      {
        id: 'final-q34',
        type: 'multiple_choice',
        prompt: 'What is the difference between text mode and binary mode when opening files?',
        options: [
          'Binary mode is faster',
          'Text mode performs newline translation, binary mode does not',
          'Binary mode can only handle numbers',
          'There is no difference on all systems',
        ],
        correctAnswer: 1,
        explanation: 'Text mode may translate newlines (\\n <-> \\r\\n on Windows). Binary mode ("rb", "wb") reads/writes bytes exactly as stored.',
      },
      {
        id: 'final-q35',
        type: 'true_false',
        prompt: 'The function fclose() should be called for every file opened with fopen() to avoid resource leaks.',
        correctAnswer: true,
        explanation: 'Failing to close files can cause resource leaks, data loss (unflushed buffers), and eventually the program may run out of file descriptors.',
      },
      {
        id: 'final-q36',
        type: 'multiple_choice',
        prompt: 'Which function reads a single character from a file?',
        options: ['fgets', 'fgetc', 'fscanf', 'fread'],
        correctAnswer: 1,
        explanation: 'fgetc reads one character (as an int for EOF detection). fgets reads a line, fscanf does formatted input, fread reads blocks.',
      },
      {
        id: 'final-q37',
        type: 'fill_blank',
        prompt: 'To write binary data to a file, you use the ____(ptr, size, count, stream) function.',
        correctAnswer: 'fwrite',
        explanation: 'fwrite writes count items of given size from ptr to the stream. fread is the corresponding read function.',
      },
      {
        id: 'final-q38',
        type: 'code_output',
        prompt: 'What mode would you use to open a file for appending text (adding to the end)?',
        codeSnippet: `FILE *f = fopen("log.txt", "???");`,
        correctAnswer: 'a',
        explanation: '"a" opens for appending - writes go to end of file. Creates file if it does not exist.',
      },
      {
        id: 'final-q39',
        type: 'multiple_choice',
        prompt: 'What does fseek(fp, 0, SEEK_SET) do?',
        options: [
          'Moves to the end of the file',
          'Moves to the beginning of the file',
          'Moves forward by one byte',
          'Returns the current position',
        ],
        correctAnswer: 1,
        explanation: 'fseek with SEEK_SET and offset 0 moves the file position to the beginning. SEEK_END would go to the end.',
      },
      {
        id: 'final-q40',
        type: 'written',
        prompt: 'Describe the purpose of the following file I/O functions: fopen, fclose, fprintf, fscanf, fread, fwrite.',
        correctAnswer: 'file functions',
        explanation: 'These are the core file I/O functions in C.',
        modelAnswer:
          '- fopen(filename, mode): Opens a file and returns a FILE pointer. Returns NULL on failure.\n\n- fclose(fp): Closes a file, flushes buffers, and releases resources. Always close files when done.\n\n- fprintf(fp, format, ...): Formatted output to a file (like printf but to a file).\n\n- fscanf(fp, format, ...): Formatted input from a file (like scanf but from a file).\n\n- fread(ptr, size, count, fp): Reads binary data. Reads up to count elements of given size into ptr. Returns number of elements read.\n\n- fwrite(ptr, size, count, fp): Writes binary data. Writes count elements of given size from ptr. Returns number of elements written.',
      },
      {
        id: 'final-q41',
        type: 'multiple_choice',
        prompt: 'What is the purpose of the #define preprocessor directive?',
        options: [
          'To declare a variable',
          'To define a macro or symbolic constant',
          'To include a header file',
          'To define a function',
        ],
        correctAnswer: 1,
        explanation: '#define creates macros (text substitution) or symbolic constants. The preprocessor replaces occurrences before compilation.',
      },
      {
        id: 'final-q42',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `#include <stdio.h>
#define DOUBLE(x) ((x) * 2)
int main() {
    int a = 5;
    printf("%d\\n", DOUBLE(a + 1));
    return 0;
}`,
        correctAnswer: '12',
        explanation: 'The macro expands to ((a + 1) * 2) = ((5 + 1) * 2) = 12. Parentheses around x prevent operator precedence issues.',
      },
    ],
  },
];
