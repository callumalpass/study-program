import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs105-exercise-3',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Dynamic Array Allocation',
    difficulty: 2,
    description: 'Create a program that dynamically allocates an array, fills it with values, prints them, and frees the memory.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr;\n    \n    // Allocate memory for n integers\n    \n    // Fill array with values 1 to n\n    \n    // Print array elements\n    \n    // Free memory\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use malloc(n * sizeof(int)) to allocate memory', 'Use a for loop to fill and print the array', "Don't forget to call free() to prevent memory leaks"],
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr;\n    \n    arr = (int *)malloc(n * sizeof(int));\n    \n    for (int i = 0; i < n; i++) {\n        arr[i] = i + 1;\n    }\n    \n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    \n    free(arr);\n    \n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-t3-ex02',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'malloc vs calloc',
    difficulty: 1,
    description: 'Demonstrate the difference between malloc and calloc by printing uninitialized values.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr1 = (int *)malloc(3 * sizeof(int));\n    int *arr2 = (int *)calloc(3, sizeof(int));\n    \n    // Print values from both arrays\n    // (malloc may have garbage, calloc should be 0)\n    \n    printf("calloc: %d %d %d\\n", arr2[0], arr2[1], arr2[2]);\n    \n    free(arr1);\n    free(arr2);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr1 = (int *)malloc(3 * sizeof(int));\n    int *arr2 = (int *)calloc(3, sizeof(int));\n    \n    printf("calloc: %d %d %d\\n", arr2[0], arr2[1], arr2[2]);\n    \n    free(arr1);\n    free(arr2);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['calloc initializes memory to zero', 'malloc leaves memory uninitialized'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex03',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Dynamic String',
    difficulty: 2,
    description: 'Dynamically allocate memory for a string, copy a value into it, and print it.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char *str;\n    \n    // Allocate memory for "Hello World" (don\'t forget null terminator!)\n    // Copy the string\n    // Print it\n    // Free memory\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char *str;\n    \n    str = (char *)malloc(12 * sizeof(char)); // 11 chars + null\n    strcpy(str, "Hello World");\n    printf("%s", str);\n    free(str);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['String length + 1 for null terminator', 'Use strcpy to copy strings'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex04',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Resize Array with realloc',
    difficulty: 3,
    description: 'Create an array, fill it, then resize it using realloc to add more elements.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int *)malloc(3 * sizeof(int));\n    arr[0] = 1; arr[1] = 2; arr[2] = 3;\n    \n    // Resize to hold 5 elements\n    // Add values 4 and 5\n    // Print all 5 elements\n    // Free memory\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int *)malloc(3 * sizeof(int));\n    arr[0] = 1; arr[1] = 2; arr[2] = 3;\n    \n    arr = (int *)realloc(arr, 5 * sizeof(int));\n    arr[3] = 4;\n    arr[4] = 5;\n    \n    for (int i = 0; i < 5; i++) {\n        printf("%d ", arr[i]);\n    }\n    \n    free(arr);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['realloc preserves existing data', 'Assign result back to pointer'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex05',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: '2D Array Allocation',
    difficulty: 4,
    description: 'Dynamically allocate a 3x3 matrix, fill it with values, print it, and properly free all memory.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int rows = 3, cols = 3;\n    int **matrix;\n    \n    // Allocate rows\n    // Allocate each column\n    // Fill with values 1-9\n    // Print matrix\n    // Free all memory (columns first, then rows)\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int rows = 3, cols = 3;\n    int **matrix;\n    int val = 1;\n    \n    matrix = (int **)malloc(rows * sizeof(int *));\n    for (int i = 0; i < rows; i++) {\n        matrix[i] = (int *)malloc(cols * sizeof(int));\n    }\n    \n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++) {\n            matrix[i][j] = val++;\n        }\n    }\n    \n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++) {\n            printf("%d ", matrix[i][j]);\n        }\n        printf("\\n");\n    }\n    \n    for (int i = 0; i < rows; i++) {\n        free(matrix[i]);\n    }\n    free(matrix);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Allocate array of pointers first', 'Then allocate each row', 'Free in reverse order'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex06',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Check Allocation Success',
    difficulty: 2,
    description: 'Write a safe allocation function that checks if malloc succeeded.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint *safeAlloc(int n) {\n    // Allocate n integers\n    // Check if NULL, print error and exit if so\n    // Return pointer\n}\n\nint main() {\n    int *arr = safeAlloc(5);\n    printf("Allocated successfully!\\n");\n    free(arr);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint *safeAlloc(int n) {\n    int *ptr = (int *)malloc(n * sizeof(int));\n    if (ptr == NULL) {\n        fprintf(stderr, "Memory allocation failed!\\n");\n        exit(1);\n    }\n    return ptr;\n}\n\nint main() {\n    int *arr = safeAlloc(5);\n    printf("Allocated successfully!\\n");\n    free(arr);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['malloc returns NULL on failure', 'Use exit() to terminate program'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex07',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Copy Function',
    difficulty: 3,
    description: 'Implement a simple memcpy function that copies n bytes from source to destination.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nvoid myMemcpy(void *dest, void *src, int n) {\n    // Copy n bytes from src to dest\n}\n\nint main() {\n    int src[] = {1, 2, 3, 4, 5};\n    int *dest = (int *)malloc(5 * sizeof(int));\n    \n    myMemcpy(dest, src, 5 * sizeof(int));\n    \n    for (int i = 0; i < 5; i++) {\n        printf("%d ", dest[i]);\n    }\n    \n    free(dest);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nvoid myMemcpy(void *dest, void *src, int n) {\n    char *d = (char *)dest;\n    char *s = (char *)src;\n    for (int i = 0; i < n; i++) {\n        d[i] = s[i];\n    }\n}\n\nint main() {\n    int src[] = {1, 2, 3, 4, 5};\n    int *dest = (int *)malloc(5 * sizeof(int));\n    \n    myMemcpy(dest, src, 5 * sizeof(int));\n    \n    for (int i = 0; i < 5; i++) {\n        printf("%d ", dest[i]);\n    }\n    \n    free(dest);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Cast to char* to copy byte by byte', 'void* can point to any type'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex08',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Dynamic Stack Implementation',
    difficulty: 5,
    description: 'Implement a stack using dynamic memory with push, pop, and isEmpty operations.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    int top;\n    int capacity;\n} Stack;\n\nStack *createStack(int capacity) {\n    // Allocate stack and internal array\n}\n\nvoid push(Stack *s, int value) {\n    // Add element to top\n}\n\nint pop(Stack *s) {\n    // Remove and return top element\n}\n\nvoid freeStack(Stack *s) {\n    // Free all memory\n}\n\nint main() {\n    Stack *s = createStack(10);\n    push(s, 1); push(s, 2); push(s, 3);\n    printf("%d ", pop(s));\n    printf("%d ", pop(s));\n    printf("%d", pop(s));\n    freeStack(s);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    int top;\n    int capacity;\n} Stack;\n\nStack *createStack(int capacity) {\n    Stack *s = (Stack *)malloc(sizeof(Stack));\n    s->data = (int *)malloc(capacity * sizeof(int));\n    s->top = -1;\n    s->capacity = capacity;\n    return s;\n}\n\nvoid push(Stack *s, int value) {\n    if (s->top < s->capacity - 1) {\n        s->data[++s->top] = value;\n    }\n}\n\nint pop(Stack *s) {\n    if (s->top >= 0) {\n        return s->data[s->top--];\n    }\n    return -1;\n}\n\nvoid freeStack(Stack *s) {\n    free(s->data);\n    free(s);\n}\n\nint main() {\n    Stack *s = createStack(10);\n    push(s, 1); push(s, 2); push(s, 3);\n    printf("%d ", pop(s));\n    printf("%d ", pop(s));\n    printf("%d", pop(s));\n    freeStack(s);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Allocate struct and data array separately', 'top = -1 means empty stack', 'Free data before struct'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex09',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Dynamic Queue Implementation',
    difficulty: 4,
    description: 'Implement a circular queue using dynamic memory allocation.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    int front;\n    int rear;\n    int capacity;\n    int count;\n} Queue;\n\nQueue *createQueue(int capacity) {\n    // Allocate queue and array\n}\n\nvoid enqueue(Queue *q, int value) {\n    // Add to rear\n}\n\nint dequeue(Queue *q) {\n    // Remove from front\n}\n\nvoid freeQueue(Queue *q) {\n    // Free all memory\n}\n\nint main() {\n    Queue *q = createQueue(5);\n    enqueue(q, 1); enqueue(q, 2); enqueue(q, 3);\n    printf("%d ", dequeue(q));\n    printf("%d ", dequeue(q));\n    enqueue(q, 4);\n    printf("%d ", dequeue(q));\n    printf("%d", dequeue(q));\n    freeQueue(q);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    int front;\n    int rear;\n    int capacity;\n    int count;\n} Queue;\n\nQueue *createQueue(int capacity) {\n    Queue *q = (Queue *)malloc(sizeof(Queue));\n    q->data = (int *)malloc(capacity * sizeof(int));\n    q->front = 0;\n    q->rear = -1;\n    q->capacity = capacity;\n    q->count = 0;\n    return q;\n}\n\nvoid enqueue(Queue *q, int value) {\n    if (q->count < q->capacity) {\n        q->rear = (q->rear + 1) % q->capacity;\n        q->data[q->rear] = value;\n        q->count++;\n    }\n}\n\nint dequeue(Queue *q) {\n    if (q->count > 0) {\n        int value = q->data[q->front];\n        q->front = (q->front + 1) % q->capacity;\n        q->count--;\n        return value;\n    }\n    return -1;\n}\n\nvoid freeQueue(Queue *q) {\n    free(q->data);\n    free(q);\n}\n\nint main() {\n    Queue *q = createQueue(5);\n    enqueue(q, 1); enqueue(q, 2); enqueue(q, 3);\n    printf("%d ", dequeue(q));\n    printf("%d ", dequeue(q));\n    enqueue(q, 4);\n    printf("%d ", dequeue(q));\n    printf("%d", dequeue(q));\n    freeQueue(q);\n    return 0;\n}',
    testCases: [],
    hints: ['Use modulo for circular behavior', 'Track count separately from front/rear'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex10',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Set Function',
    difficulty: 2,
    description: 'Implement a simple memset function that sets n bytes to a specific value.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nvoid myMemset(void *ptr, int value, int n) {\n    // Set n bytes starting at ptr to value\n}\n\nint main() {\n    int *arr = (int *)malloc(5 * sizeof(int));\n    \n    myMemset(arr, 0, 5 * sizeof(int));\n    \n    printf("After memset: ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", arr[i]);\n    }\n    \n    free(arr);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nvoid myMemset(void *ptr, int value, int n) {\n    unsigned char *p = (unsigned char *)ptr;\n    for (int i = 0; i < n; i++) {\n        p[i] = (unsigned char)value;\n    }\n}\n\nint main() {\n    int *arr = (int *)malloc(5 * sizeof(int));\n    \n    myMemset(arr, 0, 5 * sizeof(int));\n    \n    printf("After memset: ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", arr[i]);\n    }\n    \n    free(arr);\n    return 0;\n}',
    testCases: [],
    hints: ['Cast to unsigned char* to set byte by byte', 'Value is truncated to one byte'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex11',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Growing Array',
    difficulty: 3,
    description: 'Implement a dynamic array that grows automatically when capacity is reached.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    int size;\n    int capacity;\n} DynArray;\n\nDynArray *createArray() {\n    // Start with capacity 2\n}\n\nvoid append(DynArray *arr, int value) {\n    // Add value, grow if needed\n}\n\nvoid freeArray(DynArray *arr) {\n    free(arr->data);\n    free(arr);\n}\n\nint main() {\n    DynArray *arr = createArray();\n    for (int i = 1; i <= 10; i++) {\n        append(arr, i);\n        printf("Size: %d, Cap: %d\\n", arr->size, arr->capacity);\n    }\n    freeArray(arr);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    int size;\n    int capacity;\n} DynArray;\n\nDynArray *createArray() {\n    DynArray *arr = (DynArray *)malloc(sizeof(DynArray));\n    arr->data = (int *)malloc(2 * sizeof(int));\n    arr->size = 0;\n    arr->capacity = 2;\n    return arr;\n}\n\nvoid append(DynArray *arr, int value) {\n    if (arr->size == arr->capacity) {\n        arr->capacity *= 2;\n        arr->data = (int *)realloc(arr->data, arr->capacity * sizeof(int));\n    }\n    arr->data[arr->size++] = value;\n}\n\nvoid freeArray(DynArray *arr) {\n    free(arr->data);\n    free(arr);\n}\n\nint main() {\n    DynArray *arr = createArray();\n    for (int i = 1; i <= 10; i++) {\n        append(arr, i);\n        printf("Size: %d, Cap: %d\\n", arr->size, arr->capacity);\n    }\n    freeArray(arr);\n    return 0;\n}',
    testCases: [],
    hints: ['Double capacity when full', 'Use realloc to grow array'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex12',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Identify Memory Errors (Written)',
    difficulty: 3,
    description: 'This is a written exercise. Identify all memory errors in the code below and explain what could go wrong.',
    starterCode: '/* WRITTEN EXERCISE - Read the code and identify all errors */\n\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid processData() {\n    int *arr = malloc(10 * sizeof(int));\n    arr[10] = 5;  // Error 1: ?\n    \n    int *ptr = malloc(sizeof(int));\n    *ptr = 42;\n    free(ptr);\n    printf("%d\\n", *ptr);  // Error 2: ?\n    \n    int *data = malloc(100);\n    // forget to free(data)  // Error 3: ?\n}\n\nint main() {\n    int *p = malloc(sizeof(int));\n    free(p);\n    free(p);  // Error 4: ?\n    return 0;\n}\n\n/* Write your answers below:\n * Error 1:\n * Error 2:\n * Error 3:\n * Error 4:\n */',
    solution: '/* ANSWERS:\n * \n * Error 1: Buffer Overflow / Out-of-bounds write\n *   arr has indices 0-9, but arr[10] writes past the end.\n *   This corrupts memory and causes undefined behavior.\n *\n * Error 2: Use After Free\n *   Reading *ptr after free(ptr) is undefined behavior.\n *   The memory may have been reused or contain garbage.\n *\n * Error 3: Memory Leak\n *   data is allocated but never freed.\n *   If processData() is called repeatedly, memory usage grows.\n *\n * Error 4: Double Free\n *   Freeing the same pointer twice corrupts the heap.\n *   Can cause crashes or security vulnerabilities.\n *\n * Tools like Valgrind can detect all these errors!\n */',
    testCases: [],
    hints: ['Look for: buffer overflow, use-after-free, memory leak, double free'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex13',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Valgrind Output Analysis (Written)',
    difficulty: 3,
    description: 'This is a written exercise. Analyze the Valgrind output below and identify the bug.',
    starterCode: '/* WRITTEN EXERCISE - Analyze this Valgrind output */\n\n/*\n$ valgrind ./myprogram\n\n==12345== Invalid read of size 4\n==12345==    at 0x401156: main (test.c:8)\n==12345==  Address 0x4a4a068 is 0 bytes after a block of size 40 alloc\'d\n==12345==    at 0x4C2A0C3: malloc (vg_replace_malloc.c:309)\n==12345==    by 0x40113E: main (test.c:5)\n==12345==\n==12345== HEAP SUMMARY:\n==12345==     in use at exit: 40 bytes in 1 blocks\n==12345==   total heap usage: 1 allocs, 0 frees\n*/\n\n/* Questions:\n * 1. What type of error is reported?\n * 2. What line is the bug on?\n * 3. What size was allocated vs accessed?\n * 4. Is there a memory leak? How many bytes?\n *\n * Write your answers below:\n */\n\n#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = malloc(10 * sizeof(int));  // line 5\n    // ... some code ...\n    int val = arr[10];  // line 8\n    printf("%d\\n", val);\n    return 0;\n}',
    solution: '/* ANSWERS:\n *\n * 1. Type of error: Invalid read (out-of-bounds array access)\n *    Specifically, reading past the end of allocated memory.\n *\n * 2. Bug location: Line 8 in test.c\n *    The error occurs at arr[10]\n *\n * 3. Size allocated vs accessed:\n *    Allocated: 40 bytes (10 ints * 4 bytes each)\n *    Accessed: "0 bytes after" means reading at index 10,\n *    which is just past the valid range (indices 0-9).\n *\n * 4. Memory leak: YES\n *    40 bytes leaked (1 alloc, 0 frees)\n *    The array was never freed.\n *\n * Fixed code should:\n *    - Access indices 0-9 only (not 10)\n *    - Call free(arr) before returning\n */',
    testCases: [],
    hints: ['Look at the line numbers in the Valgrind output', 'Check the heap summary for leaks'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex14',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Stack vs Heap Memory (Written)',
    difficulty: 2,
    description: 'This is a written exercise. Identify which variables are stored on the stack vs heap.',
    starterCode: '/* WRITTEN EXERCISE - Identify stack vs heap storage */\n\n#include <stdio.h>\n#include <stdlib.h>\n\nint global = 100;  // Variable A\n\nvoid function() {\n    int local = 10;  // Variable B\n    static int stat = 20;  // Variable C\n    int *heap = malloc(sizeof(int));  // Variable D (the pointer)\n    *heap = 30;  // Variable E (the value 30)\n    \n    int arr[5];  // Variable F\n    int *arr2 = malloc(5 * sizeof(int));  // Variable G (values)\n    \n    free(heap);\n    free(arr2);\n}\n\n/* For each variable, identify:\n * - Where is it stored? (Stack, Heap, or Data segment)\n * - When is it allocated?\n * - When is it deallocated?\n *\n * Variable A (global):\n * Variable B (local):\n * Variable C (stat):\n * Variable D (heap pointer):\n * Variable E (*heap value):\n * Variable F (arr):\n * Variable G (arr2 values):\n */',
    solution: '/* ANSWERS:\n *\n * Variable A (global):\n *   Storage: Data segment (global/static area)\n *   Allocated: Program start\n *   Deallocated: Program end\n *\n * Variable B (local):\n *   Storage: Stack\n *   Allocated: Function call\n *   Deallocated: Function return\n *\n * Variable C (stat):\n *   Storage: Data segment (like globals)\n *   Allocated: Program start\n *   Deallocated: Program end\n *   Note: Value persists between function calls!\n *\n * Variable D (heap pointer):\n *   Storage: Stack (it\'s a local variable)\n *   Allocated: Function call\n *   Deallocated: Function return\n *\n * Variable E (*heap value):\n *   Storage: Heap\n *   Allocated: malloc() call\n *   Deallocated: free() call\n *\n * Variable F (arr):\n *   Storage: Stack (array is on stack)\n *   Allocated: Function call\n *   Deallocated: Function return\n *\n * Variable G (arr2 values):\n *   Storage: Heap\n *   Allocated: malloc() call\n *   Deallocated: free() call\n */',
    testCases: [],
    hints: ['Local variables are on stack', 'malloc returns heap memory', 'Global and static are in data segment'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex15',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Memory Pool Allocator',
    difficulty: 5,
    description: 'Implement a simple memory pool that pre-allocates a block and hands out fixed-size chunks.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\n#define POOL_SIZE 10\n#define BLOCK_SIZE sizeof(int)\n\ntypedef struct {\n    char *pool;\n    int used[POOL_SIZE];\n} MemoryPool;\n\nMemoryPool *createPool() {\n    // Allocate pool structure and memory block\n}\n\nvoid *poolAlloc(MemoryPool *mp) {\n    // Find free slot, mark used, return pointer\n}\n\nvoid poolFree(MemoryPool *mp, void *ptr) {\n    // Mark slot as free\n}\n\nvoid destroyPool(MemoryPool *mp) {\n    // Free all memory\n}\n\nint main() {\n    MemoryPool *mp = createPool();\n    \n    int *a = (int *)poolAlloc(mp);\n    int *b = (int *)poolAlloc(mp);\n    *a = 10; *b = 20;\n    \n    printf("a=%d, b=%d\\n", *a, *b);\n    \n    poolFree(mp, a);\n    int *c = (int *)poolAlloc(mp);  // Reuses a\'s slot\n    *c = 30;\n    printf("c=%d\\n", *c);\n    \n    destroyPool(mp);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\n#define POOL_SIZE 10\n#define BLOCK_SIZE sizeof(int)\n\ntypedef struct {\n    char *pool;\n    int used[POOL_SIZE];\n} MemoryPool;\n\nMemoryPool *createPool() {\n    MemoryPool *mp = (MemoryPool *)malloc(sizeof(MemoryPool));\n    mp->pool = (char *)malloc(POOL_SIZE * BLOCK_SIZE);\n    for (int i = 0; i < POOL_SIZE; i++) {\n        mp->used[i] = 0;\n    }\n    return mp;\n}\n\nvoid *poolAlloc(MemoryPool *mp) {\n    for (int i = 0; i < POOL_SIZE; i++) {\n        if (!mp->used[i]) {\n            mp->used[i] = 1;\n            return mp->pool + (i * BLOCK_SIZE);\n        }\n    }\n    return NULL;\n}\n\nvoid poolFree(MemoryPool *mp, void *ptr) {\n    int index = ((char *)ptr - mp->pool) / BLOCK_SIZE;\n    if (index >= 0 && index < POOL_SIZE) {\n        mp->used[index] = 0;\n    }\n}\n\nvoid destroyPool(MemoryPool *mp) {\n    free(mp->pool);\n    free(mp);\n}\n\nint main() {\n    MemoryPool *mp = createPool();\n    \n    int *a = (int *)poolAlloc(mp);\n    int *b = (int *)poolAlloc(mp);\n    *a = 10; *b = 20;\n    \n    printf("a=%d, b=%d\\n", *a, *b);\n    \n    poolFree(mp, a);\n    int *c = (int *)poolAlloc(mp);\n    *c = 30;\n    printf("c=%d\\n", *c);\n    \n    destroyPool(mp);\n    return 0;\n}',
    testCases: [],
    hints: ['Track which slots are used with a boolean array', 'Calculate slot index from pointer offset'],
    language: 'c'
  },
  {
    id: 'cs105-t3-ex16',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Fix the Memory Bugs (Written)',
    difficulty: 4,
    description: 'This is a written exercise. The code has multiple memory bugs. Rewrite it correctly.',
    starterCode: '/* WRITTEN EXERCISE - Fix all memory bugs in this code */\n\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar *createGreeting(const char *name) {\n    char buffer[100];\n    sprintf(buffer, "Hello, %s!", name);\n    return buffer;  // BUG 1: returning local array\n}\n\nvoid processNumbers() {\n    int *nums = malloc(5 * sizeof(int));\n    for (int i = 0; i <= 5; i++) {  // BUG 2: off-by-one\n        nums[i] = i * 10;\n    }\n    // BUG 3: no free(nums)\n}\n\nint main() {\n    char *msg = createGreeting("World");\n    printf("%s\\n", msg);  // Undefined behavior!\n    \n    int *ptr = NULL;\n    *ptr = 5;  // BUG 4: null pointer dereference\n    \n    processNumbers();\n    return 0;\n}\n\n/* Write the corrected code below: */',
    solution: '/* CORRECTED CODE: */\n\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar *createGreeting(const char *name) {\n    // FIX 1: Allocate on heap, not stack\n    char *buffer = malloc(100);\n    if (buffer) {\n        sprintf(buffer, "Hello, %s!", name);\n    }\n    return buffer;\n}\n\nvoid processNumbers() {\n    int *nums = malloc(5 * sizeof(int));\n    if (nums == NULL) return;  // Check allocation\n    \n    // FIX 2: i < 5, not i <= 5\n    for (int i = 0; i < 5; i++) {\n        nums[i] = i * 10;\n    }\n    \n    // FIX 3: Free allocated memory\n    free(nums);\n}\n\nint main() {\n    char *msg = createGreeting("World");\n    if (msg) {\n        printf("%s\\n", msg);\n        free(msg);  // Free the allocated string\n    }\n    \n    // FIX 4: Allocate memory before dereferencing\n    int *ptr = malloc(sizeof(int));\n    if (ptr) {\n        *ptr = 5;\n        printf("ptr value: %d\\n", *ptr);\n        free(ptr);\n    }\n    \n    processNumbers();\n    return 0;\n}',
    testCases: [],
    hints: ['Never return pointers to local variables', 'Always check array bounds', 'Every malloc needs a free'],
    language: 'c'
  }
];
