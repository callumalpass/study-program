import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs101-exercise-2',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'FizzBuzz',
    difficulty: 2,
    description: 'Write a program that prints numbers from 1 to n. For multiples of 3, print "Fizz" instead. For multiples of 5, print "Buzz". For multiples of both 3 and 5, print "FizzBuzz".',
    starterCode: 'def fizzbuzz(n):\n    # Your code here\n    pass\n\nfizzbuzz(15)',
    solution: 'def fizzbuzz(n):\n    for i in range(1, n + 1):\n        if i % 3 == 0 and i % 5 == 0:\n            print("FizzBuzz")\n        elif i % 3 == 0:\n            print("Fizz")\n        elif i % 5 == 0:\n            print("Buzz")\n        else:\n            print(i)\n\nfizzbuzz(15)',
    testCases: [
      {
        input: '15',
        expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
        isHidden: false,
        description: 'FizzBuzz from 1 to 15'
      },
      {
        input: '5',
        expectedOutput: '1\n2\nFizz\n4\nBuzz',
        isHidden: false,
        description: 'FizzBuzz from 1 to 5'
      },
      {
        input: '3',
        expectedOutput: '1\n2\nFizz',
        isHidden: true,
        description: 'FizzBuzz from 1 to 3'
      }
    ],
    hints: [
      'Use a for loop with range(1, n + 1)',
      'Check for divisibility using the modulo operator %',
      'Check for multiples of both 3 and 5 first',
      'Use if/elif/else for the different cases'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex02',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Even or Odd',
    difficulty: 1,
    description: 'Write a function that takes a number and returns "even" if it is even, or "odd" if it is odd.',
    starterCode: '# Determine if a number is even or odd\ndef even_or_odd(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(even_or_odd(4))\nprint(even_or_odd(7))',
    solution: 'def even_or_odd(n):\n    if n % 2 == 0:\n        return "even"\n    else:\n        return "odd"\n\nprint(even_or_odd(4))\nprint(even_or_odd(7))',
    testCases: [
      {
        input: '4',
        expectedOutput: 'even',
        isHidden: false,
        description: 'Even number'
      },
      {
        input: '7',
        expectedOutput: 'odd',
        isHidden: false,
        description: 'Odd number'
      },
      {
        input: '0',
        expectedOutput: 'even',
        isHidden: true,
        description: 'Zero is even'
      }
    ],
    hints: [
      'Use the modulo operator % to check for divisibility by 2',
      'If n % 2 equals 0, the number is even',
      'Use an if-else statement to return the appropriate string'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex03',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Number Sign',
    difficulty: 1,
    description: 'Write a function that takes a number and returns "positive", "negative", or "zero" based on its value.',
    starterCode: '# Determine the sign of a number\ndef number_sign(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(number_sign(5))\nprint(number_sign(-3))\nprint(number_sign(0))',
    solution: 'def number_sign(n):\n    if n > 0:\n        return "positive"\n    elif n < 0:\n        return "negative"\n    else:\n        return "zero"\n\nprint(number_sign(5))\nprint(number_sign(-3))\nprint(number_sign(0))',
    testCases: [
      {
        input: '5',
        expectedOutput: 'positive',
        isHidden: false,
        description: 'Positive number'
      },
      {
        input: '-3',
        expectedOutput: 'negative',
        isHidden: false,
        description: 'Negative number'
      },
      {
        input: '0',
        expectedOutput: 'zero',
        isHidden: true,
        description: 'Zero'
      }
    ],
    hints: [
      'Use comparison operators: > for greater than, < for less than',
      'Use if/elif/else for the three cases',
      'Check for positive first, then negative, then zero'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex04',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Sum of Numbers',
    difficulty: 2,
    description: 'Write a function that calculates the sum of all numbers from 1 to n (inclusive) using a loop.',
    starterCode: '# Calculate sum from 1 to n\ndef sum_to_n(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(sum_to_n(5))\nprint(sum_to_n(10))',
    solution: 'def sum_to_n(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nprint(sum_to_n(5))\nprint(sum_to_n(10))',
    testCases: [
      {
        input: '5',
        expectedOutput: '15',
        isHidden: false,
        description: '1+2+3+4+5 = 15'
      },
      {
        input: '10',
        expectedOutput: '55',
        isHidden: false,
        description: 'Sum 1 to 10'
      },
      {
        input: '100',
        expectedOutput: '5050',
        isHidden: true,
        description: 'Sum 1 to 100'
      }
    ],
    hints: [
      'Initialize a total variable to 0',
      'Use a for loop with range(1, n + 1)',
      'Add each number to the total inside the loop',
      'Return the total after the loop completes'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex05',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Countdown',
    difficulty: 2,
    description: 'Write a function that prints a countdown from n to 1, then prints "Blast off!". Each number should be on its own line.',
    starterCode: '# Print countdown from n to 1, then "Blast off!"\ndef countdown(n):\n    # Your code here\n    pass\n\n# Test your function\ncountdown(5)',
    solution: 'def countdown(n):\n    for i in range(n, 0, -1):\n        print(i)\n    print("Blast off!")\n\ncountdown(5)',
    testCases: [
      {
        input: '5',
        expectedOutput: '5\n4\n3\n2\n1\nBlast off!',
        isHidden: false,
        description: 'Countdown from 5'
      },
      {
        input: '3',
        expectedOutput: '3\n2\n1\nBlast off!',
        isHidden: false,
        description: 'Countdown from 3'
      },
      {
        input: '1',
        expectedOutput: '1\nBlast off!',
        isHidden: true,
        description: 'Countdown from 1'
      }
    ],
    hints: [
      'Use range(n, 0, -1) to count backwards',
      'The third argument to range() is the step (-1 for backwards)',
      'Print "Blast off!" after the loop ends'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex06',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Grade Calculator',
    difficulty: 3,
    description: 'Write a function that takes a numeric score (0-100) and returns a letter grade: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).',
    starterCode: '# Convert numeric score to letter grade\ndef get_grade(score):\n    # Your code here\n    pass\n\n# Test your function\nprint(get_grade(95))\nprint(get_grade(82))\nprint(get_grade(55))',
    solution: 'def get_grade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    elif score >= 60:\n        return "D"\n    else:\n        return "F"\n\nprint(get_grade(95))\nprint(get_grade(82))\nprint(get_grade(55))',
    testCases: [
      {
        input: '95',
        expectedOutput: 'A',
        isHidden: false,
        description: 'A grade'
      },
      {
        input: '82',
        expectedOutput: 'B',
        isHidden: false,
        description: 'B grade'
      },
      {
        input: '55',
        expectedOutput: 'F',
        isHidden: false,
        description: 'F grade'
      },
      {
        input: '70',
        expectedOutput: 'C',
        isHidden: true,
        description: 'Boundary C grade'
      }
    ],
    hints: [
      'Use if/elif/else statements to check score ranges',
      'Check from highest to lowest (A first, then B, etc.)',
      'The >= operator checks "greater than or equal to"'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex07',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Multiplication Table',
    difficulty: 3,
    description: 'Write a function that prints the multiplication table for a given number from 1 to 10. Format: "n x i = result".',
    starterCode: '# Print multiplication table for n (1 to 10)\ndef multiplication_table(n):\n    # Your code here\n    pass\n\n# Test your function\nmultiplication_table(5)',
    solution: 'def multiplication_table(n):\n    for i in range(1, 11):\n        result = n * i\n        print(f"{n} x {i} = {result}")\n\nmultiplication_table(5)',
    testCases: [
      {
        input: '5',
        expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50',
        isHidden: false,
        description: '5 times table'
      },
      {
        input: '3',
        expectedOutput: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30',
        isHidden: true,
        description: '3 times table'
      }
    ],
    hints: [
      'Use a for loop with range(1, 11) for numbers 1-10',
      'Calculate the product inside the loop',
      'Use f-strings to format the output: f"{n} x {i} = {result}"'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex08',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Prime Number Checker',
    difficulty: 4,
    description: 'Write a function that checks if a number is prime. A prime number is greater than 1 and only divisible by 1 and itself. Return True if prime, False otherwise.',
    starterCode: '# Check if a number is prime\ndef is_prime(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(is_prime(7))\nprint(is_prime(12))\nprint(is_prime(2))',
    solution: 'def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(7))\nprint(is_prime(12))\nprint(is_prime(2))',
    testCases: [
      {
        input: '7',
        expectedOutput: 'True',
        isHidden: false,
        description: '7 is prime'
      },
      {
        input: '12',
        expectedOutput: 'False',
        isHidden: false,
        description: '12 is not prime'
      },
      {
        input: '2',
        expectedOutput: 'True',
        isHidden: false,
        description: '2 is prime'
      },
      {
        input: '1',
        expectedOutput: 'False',
        isHidden: true,
        description: '1 is not prime'
      },
      {
        input: '97',
        expectedOutput: 'True',
        isHidden: true,
        description: '97 is prime'
      }
    ],
    hints: [
      'Numbers less than 2 are not prime',
      'Check divisibility from 2 up to the square root of n',
      'If any number divides n evenly, it is not prime',
      'Use n ** 0.5 to get the square root'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex09',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Fibonacci Sequence',
    difficulty: 5,
    description: 'Write a function that returns the first n numbers in the Fibonacci sequence as a list. The sequence starts with 0, 1, and each subsequent number is the sum of the previous two.',
    starterCode: '# Return first n Fibonacci numbers as a list\ndef fibonacci(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(fibonacci(8))\nprint(fibonacci(5))',
    solution: 'def fibonacci(n):\n    if n <= 0:\n        return []\n    if n == 1:\n        return [0]\n    \n    fib = [0, 1]\n    while len(fib) < n:\n        fib.append(fib[-1] + fib[-2])\n    return fib\n\nprint(fibonacci(8))\nprint(fibonacci(5))',
    testCases: [
      {
        input: '8',
        expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]',
        isHidden: false,
        description: 'First 8 Fibonacci numbers'
      },
      {
        input: '5',
        expectedOutput: '[0, 1, 1, 2, 3]',
        isHidden: false,
        description: 'First 5 Fibonacci numbers'
      },
      {
        input: '1',
        expectedOutput: '[0]',
        isHidden: true,
        description: 'First 1 Fibonacci number'
      },
      {
        input: '10',
        expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]',
        isHidden: true,
        description: 'First 10 Fibonacci numbers'
      }
    ],
    hints: [
      'Start with a list containing [0, 1]',
      'Use a while loop to add numbers until you have n numbers',
      'Each new number is the sum of the last two: fib[-1] + fib[-2]',
      'Handle edge cases for n <= 0 and n == 1'
    ],
    language: 'python'
  }
];
