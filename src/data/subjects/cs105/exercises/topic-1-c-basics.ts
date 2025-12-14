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
      { input: 'Alice\n25', expectedOutput: 'Enter your name: Enter your age: Hello Alice, you are 25 years old!', isHidden: false, description: 'Basic name and age input' },
      { input: 'Bob\n30', expectedOutput: 'Enter your name: Enter your age: Hello Bob, you are 30 years old!', isHidden: false, description: 'Different name and age' },
      { input: 'Charlie\n18', expectedOutput: 'Enter your name: Enter your age: Hello Charlie, you are 18 years old!', isHidden: true, description: 'Hidden test case' }
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
      { input: '0', expectedOutput: '0.0 C = 32.0 F', isHidden: false, description: 'Freezing point' },
      { input: '100', expectedOutput: '100.0 C = 212.0 F', isHidden: true, description: 'Boiling point' }
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
      { input: '5 + 3', expectedOutput: 'Result: 8.00', isHidden: false, description: 'Addition' },
      { input: '10 / 4', expectedOutput: 'Result: 2.50', isHidden: true, description: 'Division' }
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
      { input: '', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz', isHidden: false, description: 'FizzBuzz 1-20' }
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
      { input: '17', expectedOutput: '17 is prime', isHidden: false, description: 'Prime number' },
      { input: '4', expectedOutput: '4 is not prime', isHidden: true, description: 'Not prime' }
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
      { input: '1\n2\n3\n4\n5', expectedOutput: 'Sum: 15\nAverage: 3.00', isHidden: false, description: 'Sum and average' },
      { input: '10\n20\n30\n40\n50', expectedOutput: 'Sum: 150\nAverage: 30.00', isHidden: true, description: 'Larger numbers' }
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
      { input: '5', expectedOutput: '5! = 120', isHidden: false, description: 'Factorial of 5' },
      { input: '0', expectedOutput: '0! = 1', isHidden: true, description: 'Factorial of 0' }
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
      { input: 'hello', expectedOutput: 'Reversed: olleh', isHidden: false, description: 'Reverse hello' },
      { input: 'abcdef', expectedOutput: 'Reversed: fedcba', isHidden: true, description: 'Reverse abcdef' }
    ],
    hints: ['Swap first and last, second and second-last, etc.', 'Use strlen() to get length'],
    language: 'c'
  }
];
