import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs105-exercise-1',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Hello World and Basic Input',
    difficulty: 1,
    description: 'Write a C program that asks for the user\'s name and age, then prints a greeting message.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use printf() to display prompts', 'Use scanf() to read input', 'Use %s for strings and %d for integers'],
    solution: '#include <stdio.h>\n\nint main() {\n    char name[50];\n    int age;\n    \n    printf("Enter your name: ");\n    scanf("%s", name);\n    \n    printf("Enter your age: ");\n    scanf("%d", &age);\n    \n    printf("Hello %s, you are %d years old!", name, age);\n    \n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-t1-ex02',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Temperature Converter',
    difficulty: 1,
    description: 'Write a program that converts Celsius to Fahrenheit. Formula: F = C * 9/5 + 32',
    starterCode: '#include <stdio.h>\n\nint main() {\n    float celsius, fahrenheit;\n    \n    // Read Celsius and convert to Fahrenheit\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    float celsius, fahrenheit;\n    \n    printf("Enter temperature in Celsius: ");\n    scanf("%f", &celsius);\n    \n    fahrenheit = celsius * 9.0 / 5.0 + 32;\n    \n    printf("%.1f C = %.1f F", celsius, fahrenheit);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use float for decimal precision', 'Use 9.0/5.0 to avoid integer division'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex03',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Simple Calculator',
    difficulty: 2,
    description: 'Write a calculator that takes two numbers and an operator (+, -, *, /) and performs the operation.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    float a, b, result;\n    char op;\n    \n    // Your code here\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    float a, b, result;\n    char op;\n    \n    printf("Enter expression (e.g., 5 + 3): ");\n    scanf("%f %c %f", &a, &op, &b);\n    \n    switch(op) {\n        case \'+\': result = a + b; break;\n        case \'-\': result = a - b; break;\n        case \'*\': result = a * b; break;\n        case \'/\': result = a / b; break;\n        default: printf("Invalid operator"); return 1;\n    }\n    \n    printf("Result: %.2f", result);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use switch statement for different operators', 'Read operator as char'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex04',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'FizzBuzz in C',
    difficulty: 2,
    description: 'Print numbers 1-20. For multiples of 3 print "Fizz", for 5 print "Buzz", for both print "FizzBuzz".',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Print 1 to 20 with FizzBuzz rules\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 20; i++) {\n        if (i % 15 == 0) printf("FizzBuzz\\n");\n        else if (i % 3 == 0) printf("Fizz\\n");\n        else if (i % 5 == 0) printf("Buzz\\n");\n        else printf("%d\\n", i);\n    }\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use modulo operator %', 'Check divisibility by 15 first'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex05',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Prime Number Checker',
    difficulty: 3,
    description: 'Write a function that checks if a number is prime and use it in main().',
    starterCode: '#include <stdio.h>\n\nint isPrime(int n) {\n    // Return 1 if prime, 0 otherwise\n}\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    \n    if (isPrime(num))\n        printf("%d is prime", num);\n    else\n        printf("%d is not prime", num);\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint isPrime(int n) {\n    if (n <= 1) return 0;\n    if (n <= 3) return 1;\n    if (n % 2 == 0 || n % 3 == 0) return 0;\n    \n    for (int i = 5; i * i <= n; i += 6) {\n        if (n % i == 0 || n % (i + 2) == 0)\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    \n    if (isPrime(num))\n        printf("%d is prime", num);\n    else\n        printf("%d is not prime", num);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Only need to check up to sqrt(n)', 'Handle edge cases: 0, 1, 2'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex06',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Array Sum and Average',
    difficulty: 2,
    description: 'Write a program that reads 5 integers into an array, then calculates and prints their sum and average.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    int arr[5];\n    int sum = 0;\n    float avg;\n    \n    // Read 5 numbers, calculate sum and average\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int arr[5];\n    int sum = 0;\n    float avg;\n    \n    printf("Enter 5 numbers:\\n");\n    for (int i = 0; i < 5; i++) {\n        scanf("%d", &arr[i]);\n        sum += arr[i];\n    }\n    \n    avg = (float)sum / 5;\n    printf("Sum: %d\\n", sum);\n    printf("Average: %.2f", avg);\n    \n    return 0;\n}',
    testCases: [
    ],
    hints: ['Cast sum to float before dividing for accurate average', 'Use a loop to read and sum'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex07',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Factorial Function',
    difficulty: 2,
    description: 'Write a recursive function to calculate factorial of a number.',
    starterCode: '#include <stdio.h>\n\nlong factorial(int n) {\n    // Recursive implementation\n}\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    printf("%d! = %ld", num, factorial(num));\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nlong factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    printf("%d! = %ld", num, factorial(num));\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Base case: 0! = 1! = 1', 'Recursive: n! = n * (n-1)!'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex08',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'String Reversal',
    difficulty: 3,
    description: 'Write a function that reverses a string in-place.',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char *str) {\n    // Reverse str in-place\n}\n\nint main() {\n    char str[100];\n    printf("Enter a string: ");\n    scanf("%s", str);\n    reverseString(str);\n    printf("Reversed: %s", str);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char *str) {\n    int len = strlen(str);\n    for (int i = 0; i < len / 2; i++) {\n        char temp = str[i];\n        str[i] = str[len - 1 - i];\n        str[len - 1 - i] = temp;\n    }\n}\n\nint main() {\n    char str[100];\n    printf("Enter a string: ");\n    scanf("%s", str);\n    reverseString(str);\n    printf("Reversed: %s", str);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Swap first and last, second and second-last, etc.', 'Use strlen() to get length'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex09',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Type Casting and Division',
    difficulty: 2,
    description: 'Write a program that demonstrates the difference between integer division and floating-point division. Given two integers, show both results.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    int a = 7, b = 3;\n    \n    // Print integer division result\n    // Print floating-point division result (use casting)\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int a = 7, b = 3;\n    \n    printf("Integer division: %d / %d = %d\\n", a, b, a / b);\n    printf("Float division: %d / %d = %.2f", a, b, (float)a / b);\n    \n    return 0;\n}',
    testCases: [],
    hints: ['Integer division truncates', 'Cast one operand to float for decimal result'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex10',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Bitwise Operations',
    difficulty: 3,
    description: 'Write a program that demonstrates bitwise AND, OR, XOR, and left shift operations on two numbers.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;  // 5 = 101, 3 = 011 in binary\n    \n    // Print results of AND, OR, XOR, and left shift a by 2\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n    \n    printf("a & b = %d\\n", a & b);   // AND: 1\n    printf("a | b = %d\\n", a | b);   // OR: 7\n    printf("a ^ b = %d\\n", a ^ b);   // XOR: 6\n    printf("a << 2 = %d", a << 2);   // Left shift: 20\n    \n    return 0;\n}',
    testCases: [],
    hints: ['& is AND, | is OR, ^ is XOR', '<< shifts bits left (multiplies by 2^n)'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex11',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Grade Calculator',
    difficulty: 2,
    description: 'Write a program that converts a numerical score (0-100) to a letter grade using nested if-else statements.',
    starterCode: '#include <stdio.h>\n\nchar getGrade(int score) {\n    // Return A (90+), B (80+), C (70+), D (60+), F otherwise\n}\n\nint main() {\n    int score;\n    printf("Enter score: ");\n    scanf("%d", &score);\n    printf("Grade: %c", getGrade(score));\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nchar getGrade(int score) {\n    if (score >= 90) return \'A\';\n    else if (score >= 80) return \'B\';\n    else if (score >= 70) return \'C\';\n    else if (score >= 60) return \'D\';\n    else return \'F\';\n}\n\nint main() {\n    int score;\n    printf("Enter score: ");\n    scanf("%d", &score);\n    printf("Grade: %c", getGrade(score));\n    return 0;\n}',
    testCases: [],
    hints: ['Use else-if chain from highest to lowest', 'Return char type for grade letter'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex12',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Number Pyramid',
    difficulty: 3,
    description: 'Print a number pyramid of height 5 using nested loops.',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Print:\n    //     1\n    //    121\n    //   12321\n    //  1234321\n    // 123454321\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int n = 5;\n    for (int i = 1; i <= n; i++) {\n        // Print leading spaces\n        for (int j = 1; j <= n - i; j++) {\n            printf(" ");\n        }\n        // Print increasing numbers\n        for (int j = 1; j <= i; j++) {\n            printf("%d", j);\n        }\n        // Print decreasing numbers\n        for (int j = i - 1; j >= 1; j--) {\n            printf("%d", j);\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
    testCases: [],
    hints: ['Use three inner loops: spaces, ascending numbers, descending numbers', 'Row i has i numbers going up and i-1 going down'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex13',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Fibonacci Sequence',
    difficulty: 2,
    description: 'Print the first 10 Fibonacci numbers using a loop (not recursion).',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Print first 10 Fibonacci numbers: 0 1 1 2 3 5 8 13 21 34\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint main() {\n    int a = 0, b = 1, next;\n    \n    printf("%d %d ", a, b);\n    \n    for (int i = 2; i < 10; i++) {\n        next = a + b;\n        printf("%d ", next);\n        a = b;\n        b = next;\n    }\n    \n    return 0;\n}',
    testCases: [],
    hints: ['Each number is sum of previous two', 'Use two variables to track previous values'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex14',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Binary Search',
    difficulty: 4,
    description: 'Implement binary search to find a target value in a sorted array.',
    starterCode: '#include <stdio.h>\n\nint binarySearch(int arr[], int size, int target) {\n    // Return index if found, -1 otherwise\n}\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int target = 23;\n    \n    int result = binarySearch(arr, 10, target);\n    if (result != -1)\n        printf("Found at index %d", result);\n    else\n        printf("Not found");\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nint binarySearch(int arr[], int size, int target) {\n    int left = 0, right = size - 1;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        \n        if (arr[mid] == target)\n            return mid;\n        else if (arr[mid] < target)\n            left = mid + 1;\n        else\n            right = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int target = 23;\n    \n    int result = binarySearch(arr, 10, target);\n    if (result != -1)\n        printf("Found at index %d", result);\n    else\n        printf("Not found");\n    return 0;\n}',
    testCases: [],
    hints: ['Compare target with middle element', 'Narrow search range based on comparison', 'Use left + (right - left) / 2 to avoid overflow'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex15',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Palindrome Check',
    difficulty: 3,
    description: 'Write a function to check if a string is a palindrome (reads same forwards and backwards).',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\nint isPalindrome(char *str) {\n    // Return 1 if palindrome, 0 otherwise\n}\n\nint main() {\n    char test1[] = "radar";\n    char test2[] = "hello";\n    \n    printf("%s: %s\\n", test1, isPalindrome(test1) ? "palindrome" : "not palindrome");\n    printf("%s: %s", test2, isPalindrome(test2) ? "palindrome" : "not palindrome");\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint isPalindrome(char *str) {\n    int len = strlen(str);\n    for (int i = 0; i < len / 2; i++) {\n        if (str[i] != str[len - 1 - i])\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    char test1[] = "radar";\n    char test2[] = "hello";\n    \n    printf("%s: %s\\n", test1, isPalindrome(test1) ? "palindrome" : "not palindrome");\n    printf("%s: %s", test2, isPalindrome(test2) ? "palindrome" : "not palindrome");\n    return 0;\n}',
    testCases: [],
    hints: ['Compare first with last, second with second-to-last', 'Only need to check half the string'],
    language: 'c'
  },
  {
    id: 'cs105-t1-ex16',
    subjectId: 'cs105',
    topicId: 'cs105-topic-1',
    title: 'Character Frequency Counter',
    difficulty: 3,
    description: 'Count the frequency of each character in a string and print non-zero counts.',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "hello world";\n    int freq[256] = {0};  // ASCII character counts\n    \n    // Count frequencies\n    // Print characters that appear more than once\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "hello world";\n    int freq[256] = {0};\n    \n    for (int i = 0; str[i] != \'\\0\'; i++) {\n        freq[(int)str[i]]++;\n    }\n    \n    printf("Characters with frequency > 1:\\n");\n    for (int i = 0; i < 256; i++) {\n        if (freq[i] > 1) {\n            printf("\'%c\': %d\\n", i, freq[i]);\n        }\n    }\n    \n    return 0;\n}',
    testCases: [],
    hints: ['Use character ASCII value as array index', 'Initialize array to zeros'],
    language: 'c'
  }
];
