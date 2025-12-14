import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs105-exercise-2',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Swap Two Numbers Using Pointers',
    difficulty: 2,
    description: 'Implement a function that swaps two integers using pointers.',
    starterCode: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Your code here\n}\n\nint main() {\n    int x = 5, y = 10;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use a temporary variable to hold one value', 'Dereference pointers with * to access values', 'Remember to modify the values that the pointers point to'],
    solution: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-t2-ex02',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Pointer Basics',
    difficulty: 1,
    description: 'Create a pointer to an integer, assign a value through it, and print both the value and address.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    int num = 42;\n    int *ptr;\n    \n    // Make ptr point to num, print value and address\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int num = 42;\n    int *ptr;\n    \n    ptr = &num;\n    \n    printf("Value: %d\\n", *ptr);\n    printf("Address: %p", (void*)ptr);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use & to get address', 'Use * to dereference', 'Use %p for pointer addresses'],
    language: 'c'
  },
  {
    id: 'cs105-t2-ex03',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Array with Pointers',
    difficulty: 2,
    description: 'Print array elements using pointer arithmetic instead of array indexing.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *ptr = arr;\n    \n    // Print all elements using pointer arithmetic\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *ptr = arr;\n    \n    for (int i = 0; i < 5; i++) {\n        printf("%d ", *(ptr + i));\n    }\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['*(ptr + i) is equivalent to ptr[i]', 'Array name is a pointer to first element'],
    language: 'c'
  },
  {
    id: 'cs105-t2-ex04',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Return Multiple Values',
    difficulty: 2,
    description: 'Write a function that calculates both the sum and product of two numbers using pointer parameters.',
    starterCode: '#include <stdio.h>\n\nvoid calculate(int a, int b, int *sum, int *product) {\n    // Set sum and product through pointers\n}\n\nint main() {\n    int s, p;\n    calculate(5, 3, &s, &p);\n    printf("Sum: %d, Product: %d", s, p);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nvoid calculate(int a, int b, int *sum, int *product) {\n    *sum = a + b;\n    *product = a * b;\n}\n\nint main() {\n    int s, p;\n    calculate(5, 3, &s, &p);\n    printf("Sum: %d, Product: %d", s, p);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use *sum = value to set through pointer', 'Pointers allow returning multiple values'],
    language: 'c'
  },
  {
    id: 'cs105-t2-ex05',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Find Min and Max',
    difficulty: 3,
    description: 'Write a function that finds both minimum and maximum values in an array using pointers.',
    starterCode: '#include <stdio.h>\n\nvoid findMinMax(int *arr, int size, int *min, int *max) {\n    // Find min and max, set through pointers\n}\n\nint main() {\n    int arr[] = {5, 2, 9, 1, 7};\n    int min, max;\n    findMinMax(arr, 5, &min, &max);\n    printf("Min: %d, Max: %d", min, max);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nvoid findMinMax(int *arr, int size, int *min, int *max) {\n    *min = *max = arr[0];\n    for (int i = 1; i < size; i++) {\n        if (arr[i] < *min) *min = arr[i];\n        if (arr[i] > *max) *max = arr[i];\n    }\n}\n\nint main() {\n    int arr[] = {5, 2, 9, 1, 7};\n    int min, max;\n    findMinMax(arr, 5, &min, &max);\n    printf("Min: %d, Max: %d", min, max);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Initialize min and max to first element', 'Compare each element with current min/max'],
    language: 'c'
  },
  {
    id: 'cs105-t2-ex06',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'String Length with Pointer',
    difficulty: 2,
    description: 'Implement strlen using pointer arithmetic (don\'t use the standard library function).',
    starterCode: '#include <stdio.h>\n\nint myStrlen(char *str) {\n    // Count characters using pointer\n}\n\nint main() {\n    char text[] = "Hello";\n    printf("Length: %d", myStrlen(text));\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint myStrlen(char *str) {\n    int len = 0;\n    while (*str != \'\\0\') {\n        len++;\n        str++;\n    }\n    return len;\n}\n\nint main() {\n    char text[] = "Hello";\n    printf("Length: %d", myStrlen(text));\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Strings end with null terminator \'\\0\'', 'Increment pointer until null is found'],
    language: 'c'
  },
  {
    id: 'cs105-t2-ex07',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Double Pointer',
    difficulty: 4,
    description: 'Use a double pointer to modify where a pointer points to.',
    starterCode: '#include <stdio.h>\n\nvoid redirect(int **pp, int *newTarget) {\n    // Make *pp point to newTarget\n}\n\nint main() {\n    int a = 10, b = 20;\n    int *ptr = &a;\n    \n    printf("Before: %d\\n", *ptr);\n    redirect(&ptr, &b);\n    printf("After: %d", *ptr);\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nvoid redirect(int **pp, int *newTarget) {\n    *pp = newTarget;\n}\n\nint main() {\n    int a = 10, b = 20;\n    int *ptr = &a;\n    \n    printf("Before: %d\\n", *ptr);\n    redirect(&ptr, &b);\n    printf("After: %d", *ptr);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['**pp is a pointer to a pointer', '*pp accesses the pointer itself'],
    language: 'c'
  },
  {
    id: 'cs105-t2-ex08',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Function Pointer',
    difficulty: 5,
    description: 'Use function pointers to create a simple calculator that calls the right operation.',
    starterCode: '#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    int (*operation)(int, int);\n    \n    // Set operation to add, call it, print result\n    // Then set to mul, call it, print result\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    int (*operation)(int, int);\n    \n    operation = add;\n    printf("5 + 3 = %d\\n", operation(5, 3));\n    \n    operation = mul;\n    printf("5 * 3 = %d", operation(5, 3));\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Function pointer syntax: returnType (*name)(params)', 'Assign function name without parentheses'],
    language: 'c'
  }
];
