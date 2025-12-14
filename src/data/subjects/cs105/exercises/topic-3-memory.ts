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
  }
];
