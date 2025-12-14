import { CodingExercise } from '../../../core/types';

export const cs105Exercises: CodingExercise[] = [
  {
    id: 'cs105-exercise-1',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Hello World and Basic Input',
    description: 'Write a C program that asks for the user\'s name and age, then prints a greeting message.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    \n    return 0;\n}',
    testCases: [
      {
        input: 'Alice\n25',
        expectedOutput: 'Enter your name: Enter your age: Hello Alice, you are 25 years old!',
        isHidden: false,
        description: 'Basic name and age input'
      },
      {
        input: 'Bob\n30',
        expectedOutput: 'Enter your name: Enter your age: Hello Bob, you are 30 years old!',
        isHidden: false,
        description: 'Different name and age'
      },
      {
        input: 'Charlie\n18',
        expectedOutput: 'Enter your name: Enter your age: Hello Charlie, you are 18 years old!',
        isHidden: true,
        description: 'Hidden test case'
      }
    ],
    hints: [
      'Use printf() to display prompts',
      'Use scanf() to read input',
      'Use %s for strings and %d for integers'
    ],
    solution: '#include <stdio.h>\n\nint main() {\n    char name[50];\n    int age;\n    \n    printf("Enter your name: ");\n    scanf("%s", name);\n    \n    printf("Enter your age: ");\n    scanf("%d", &age);\n    \n    printf("Hello %s, you are %d years old!", name, age);\n    \n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-exercise-2',
    subjectId: 'cs105',
    topicId: 'cs105-topic-2',
    title: 'Swap Two Numbers Using Pointers',
    description: 'Implement a function that swaps two integers using pointers.',
    starterCode: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Your code here\n}\n\nint main() {\n    int x = 5, y = 10;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}',
    testCases: [
      {
        input: '',
        expectedOutput: 'Before: x=5, y=10\nAfter: x=10, y=5',
        isHidden: false,
        description: 'Swap 5 and 10'
      },
      {
        input: '',
        expectedOutput: 'Before: x=5, y=10\nAfter: x=10, y=5',
        isHidden: true,
        description: 'Verify swap works correctly'
      }
    ],
    hints: [
      'Use a temporary variable to hold one value',
      'Dereference pointers with * to access values',
      'Remember to modify the values that the pointers point to'
    ],
    solution: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 5, y = 10;\n    printf("Before: x=%d, y=%d\\n", x, y);\n    swap(&x, &y);\n    printf("After: x=%d, y=%d\\n", x, y);\n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-exercise-3',
    subjectId: 'cs105',
    topicId: 'cs105-topic-3',
    title: 'Dynamic Array Allocation',
    description: 'Create a program that dynamically allocates an array, fills it with values, prints them, and frees the memory.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr;\n    \n    // Allocate memory for n integers\n    \n    // Fill array with values 1 to n\n    \n    // Print array elements\n    \n    // Free memory\n    \n    return 0;\n}',
    testCases: [
      {
        input: '',
        expectedOutput: '1 2 3 4 5',
        isHidden: false,
        description: 'Print array of 5 elements'
      },
      {
        input: '',
        expectedOutput: '1 2 3 4 5',
        isHidden: true,
        description: 'Verify memory allocation and deallocation'
      }
    ],
    hints: [
      'Use malloc(n * sizeof(int)) to allocate memory',
      'Use a for loop to fill and print the array',
      'Don\'t forget to call free() to prevent memory leaks'
    ],
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr;\n    \n    arr = (int *)malloc(n * sizeof(int));\n    \n    for (int i = 0; i < n; i++) {\n        arr[i] = i + 1;\n    }\n    \n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    \n    free(arr);\n    \n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-exercise-4',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Student Record Structure',
    description: 'Define a structure to store student information (name, ID, GPA) and create a function to print student details.',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\n// Define Student structure here\n\nvoid printStudent(struct Student s) {\n    // Print student details\n}\n\nint main() {\n    struct Student s1;\n    strcpy(s1.name, "John Doe");\n    s1.id = 12345;\n    s1.gpa = 3.8;\n    \n    printStudent(s1);\n    return 0;\n}',
    testCases: [
      {
        input: '',
        expectedOutput: 'Name: John Doe\nID: 12345\nGPA: 3.80',
        isHidden: false,
        description: 'Print student record'
      },
      {
        input: '',
        expectedOutput: 'Name: John Doe\nID: 12345\nGPA: 3.80',
        isHidden: true,
        description: 'Verify structure definition'
      }
    ],
    hints: [
      'Define a struct with char array for name, int for id, and float for gpa',
      'Use printf with appropriate format specifiers',
      'Use %.2f to print GPA with 2 decimal places'
    ],
    solution: '#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int id;\n    float gpa;\n};\n\nvoid printStudent(struct Student s) {\n    printf("Name: %s\\n", s.name);\n    printf("ID: %d\\n", s.id);\n    printf("GPA: %.2f", s.gpa);\n}\n\nint main() {\n    struct Student s1;\n    strcpy(s1.name, "John Doe");\n    s1.id = 12345;\n    s1.gpa = 3.8;\n    \n    printStudent(s1);\n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-exercise-5',
    subjectId: 'cs105',
    topicId: 'cs105-topic-5',
    title: 'Write and Read from File',
    description: 'Write a program that writes numbers 1-10 to a file, then reads and displays them.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    \n    // Write numbers 1-10 to file "numbers.txt"\n    \n    // Read and print numbers from file\n    \n    return 0;\n}',
    testCases: [
      {
        input: '',
        expectedOutput: '1 2 3 4 5 6 7 8 9 10',
        isHidden: false,
        description: 'Write and read numbers from file'
      },
      {
        input: '',
        expectedOutput: '1 2 3 4 5 6 7 8 9 10',
        isHidden: true,
        description: 'Verify file operations'
      }
    ],
    hints: [
      'Use fopen() with "w" mode to write and "r" mode to read',
      'Use fprintf() to write formatted data to file',
      'Use fscanf() to read formatted data from file',
      'Always check if fopen() returns NULL'
    ],
    solution: '#include <stdio.h>\n\nint main() {\n    FILE *fp;\n    int num;\n    \n    fp = fopen("numbers.txt", "w");\n    for (int i = 1; i <= 10; i++) {\n        fprintf(fp, "%d ", i);\n    }\n    fclose(fp);\n    \n    fp = fopen("numbers.txt", "r");\n    while (fscanf(fp, "%d", &num) != EOF) {\n        printf("%d ", num);\n    }\n    fclose(fp);\n    \n    return 0;\n}',
    language: 'c'
  }
];
