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
        isHidden: false,
        description: 'FizzBuzz from 1 to 15'
      },
      {
        input: '5',
        isHidden: false,
        description: 'FizzBuzz from 1 to 5'
      },
      {
        input: '3',
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
        isHidden: false,
        description: 'Even number'
      },
      {
        input: '7',
        isHidden: false,
        description: 'Odd number'
      },
      {
        input: '0',
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
        isHidden: false,
        description: 'Positive number'
      },
      {
        input: '-3',
        isHidden: false,
        description: 'Negative number'
      },
      {
        input: '0',
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
        isHidden: false,
        description: '1+2+3+4+5 = 15'
      },
      {
        input: '10',
        isHidden: false,
        description: 'Sum 1 to 10'
      },
      {
        input: '100',
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
        isHidden: false,
        description: 'Countdown from 5'
      },
      {
        input: '3',
        isHidden: false,
        description: 'Countdown from 3'
      },
      {
        input: '1',
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
        isHidden: false,
        description: 'A grade'
      },
      {
        input: '82',
        isHidden: false,
        description: 'B grade'
      },
      {
        input: '55',
        isHidden: false,
        description: 'F grade'
      },
      {
        input: '70',
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
        isHidden: false,
        description: '5 times table'
      },
      {
        input: '3',
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
        isHidden: false,
        description: '7 is prime'
      },
      {
        input: '12',
        isHidden: false,
        description: '12 is not prime'
      },
      {
        input: '2',
        isHidden: false,
        description: '2 is prime'
      },
      {
        input: '1',
        isHidden: true,
        description: '1 is not prime'
      },
      {
        input: '97',
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
        isHidden: false,
        description: 'First 8 Fibonacci numbers'
      },
      {
        input: '5',
        isHidden: false,
        description: 'First 5 Fibonacci numbers'
      },
      {
        input: '1',
        isHidden: true,
        description: 'First 1 Fibonacci number'
      },
      {
        input: '10',
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
  },
  {
    id: 'cs101-t2-ex10',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Leap Year Checker',
    difficulty: 3,
    description: 'Write a function that returns True if a year is a leap year. A leap year is divisible by 4, except for years divisible by 100 (unless also divisible by 400).',
    starterCode: '# Check if a year is a leap year\ndef is_leap_year(year):\n    # Your code here\n    pass\n\n# Test your function\nprint(is_leap_year(2020))\nprint(is_leap_year(1900))\nprint(is_leap_year(2000))',
    solution: 'def is_leap_year(year):\n    if year % 400 == 0:\n        return True\n    if year % 100 == 0:\n        return False\n    if year % 4 == 0:\n        return True\n    return False\n\nprint(is_leap_year(2020))\nprint(is_leap_year(1900))\nprint(is_leap_year(2000))',
    testCases: [
      {
        input: '2020',
        isHidden: false,
        description: '2020 is a leap year'
      },
      {
        input: '1900',
        isHidden: false,
        description: '1900 is not a leap year'
      },
      {
        input: '2000',
        isHidden: false,
        description: '2000 is a leap year'
      },
      {
        input: '2021',
        isHidden: true,
        description: '2021 is not a leap year'
      }
    ],
    hints: [
      'Check divisibility by 400 first (these are leap years)',
      'Then check divisibility by 100 (these are NOT leap years)',
      'Then check divisibility by 4 (these are leap years)',
      'All other years are not leap years'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex11',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Number Guesser Validator',
    difficulty: 2,
    description: 'Write a function that takes a guess and a target number. Return "too high", "too low", or "correct".',
    starterCode: '# Validate a number guess\ndef check_guess(guess, target):\n    # Your code here\n    pass\n\n# Test your function\nprint(check_guess(50, 75))\nprint(check_guess(80, 75))\nprint(check_guess(75, 75))',
    solution: 'def check_guess(guess, target):\n    if guess > target:\n        return "too high"\n    elif guess < target:\n        return "too low"\n    else:\n        return "correct"\n\nprint(check_guess(50, 75))\nprint(check_guess(80, 75))\nprint(check_guess(75, 75))',
    testCases: [
      {
        input: '50, 75',
        isHidden: false,
        description: 'Guess is too low'
      },
      {
        input: '80, 75',
        isHidden: false,
        description: 'Guess is too high'
      },
      {
        input: '75, 75',
        isHidden: true,
        description: 'Correct guess'
      }
    ],
    hints: [
      'Compare guess to target using > and <',
      'Use if/elif/else for the three cases',
      'Return the appropriate string for each case'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex12',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Find First Negative',
    difficulty: 3,
    description: 'Write a function that finds the first negative number in a list and returns its index. Return -1 if there are no negative numbers.',
    starterCode: '# Find index of first negative number\ndef first_negative(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(first_negative([1, 2, -3, 4]))\nprint(first_negative([1, 2, 3, 4]))',
    solution: 'def first_negative(numbers):\n    for i in range(len(numbers)):\n        if numbers[i] < 0:\n            return i\n    return -1\n\nprint(first_negative([1, 2, -3, 4]))\nprint(first_negative([1, 2, 3, 4]))',
    testCases: [
      {
        input: '[1, 2, -3, 4]',
        isHidden: false,
        description: 'Negative at index 2'
      },
      {
        input: '[1, 2, 3, 4]',
        isHidden: false,
        description: 'No negatives'
      },
      {
        input: '[-1, 2, 3]',
        isHidden: true,
        description: 'Negative at start'
      }
    ],
    hints: [
      'Use enumerate() or range(len()) to get indices',
      'Check if each number is less than 0',
      'Return the index immediately when found',
      'Return -1 after the loop if nothing found'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex13',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Password Strength Checker',
    difficulty: 4,
    description: 'Write a function that checks password strength. Return "weak" if under 8 chars, "medium" if 8+ chars but no digits, "strong" if 8+ chars with at least one digit.',
    starterCode: '# Check password strength\ndef check_password(password):\n    # Your code here\n    pass\n\n# Test your function\nprint(check_password("abc"))\nprint(check_password("password"))\nprint(check_password("password123"))',
    solution: 'def check_password(password):\n    if len(password) < 8:\n        return "weak"\n    \n    has_digit = False\n    for char in password:\n        if char.isdigit():\n            has_digit = True\n            break\n    \n    if has_digit:\n        return "strong"\n    return "medium"\n\nprint(check_password("abc"))\nprint(check_password("password"))\nprint(check_password("password123"))',
    testCases: [
      {
        input: '"abc"',
        isHidden: false,
        description: 'Too short'
      },
      {
        input: '"password"',
        isHidden: false,
        description: 'Long but no digits'
      },
      {
        input: '"password123"',
        isHidden: false,
        description: 'Long with digits'
      },
      {
        input: '"12345678"',
        isHidden: true,
        description: 'All digits'
      }
    ],
    hints: [
      'First check the length with len()',
      'Loop through characters to check for digits',
      'Use .isdigit() to check if a character is a number',
      'Use break to exit the loop early when a digit is found'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex14',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Collatz Sequence',
    difficulty: 4,
    description: 'Write a function that returns the Collatz sequence starting from n until reaching 1. If n is even, divide by 2. If odd, multiply by 3 and add 1.',
    starterCode: '# Generate Collatz sequence from n to 1\ndef collatz(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(collatz(6))\nprint(collatz(3))',
    solution: 'def collatz(n):\n    sequence = [n]\n    while n != 1:\n        if n % 2 == 0:\n            n = n // 2\n        else:\n            n = 3 * n + 1\n        sequence.append(n)\n    return sequence\n\nprint(collatz(6))\nprint(collatz(3))',
    testCases: [
      {
        input: '6',
        isHidden: false,
        description: 'Starting from 6'
      },
      {
        input: '3',
        isHidden: false,
        description: 'Starting from 3'
      },
      {
        input: '1',
        isHidden: true,
        description: 'Starting from 1'
      }
    ],
    hints: [
      'Start with a list containing n',
      'Use a while loop until n becomes 1',
      'Check if n is even with n % 2 == 0',
      'Update n and append to the sequence each iteration'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex15',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Pattern Printer',
    difficulty: 3,
    description: 'Write a function that prints a right triangle of asterisks with n rows. Each row should have row_number asterisks.',
    starterCode: '# Print a right triangle pattern\ndef print_triangle(n):\n    # Your code here\n    pass\n\n# Test your function\nprint_triangle(4)',
    solution: 'def print_triangle(n):\n    for i in range(1, n + 1):\n        print("*" * i)\n\nprint_triangle(4)',
    testCases: [
      {
        input: '4',
        isHidden: false,
        description: 'Triangle of height 4'
      },
      {
        input: '3',
        isHidden: true,
        description: 'Triangle of height 3'
      }
    ],
    hints: [
      'Use a for loop from 1 to n+1',
      'Print i asterisks on each line',
      'You can multiply strings: "*" * 3 gives "***"'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t2-ex16',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Find All Primes',
    difficulty: 5,
    description: 'Write a function that returns a list of all prime numbers up to n (inclusive). Use the Sieve of Eratosthenes or simple trial division.',
    starterCode: '# Find all primes up to n\ndef primes_up_to(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(primes_up_to(20))\nprint(primes_up_to(10))',
    solution: 'def primes_up_to(n):\n    if n < 2:\n        return []\n    \n    primes = []\n    for num in range(2, n + 1):\n        is_prime = True\n        for i in range(2, int(num ** 0.5) + 1):\n            if num % i == 0:\n                is_prime = False\n                break\n        if is_prime:\n            primes.append(num)\n    return primes\n\nprint(primes_up_to(20))\nprint(primes_up_to(10))',
    testCases: [
      {
        input: '20',
        isHidden: false,
        description: 'Primes up to 20'
      },
      {
        input: '10',
        isHidden: false,
        description: 'Primes up to 10'
      },
      {
        input: '1',
        isHidden: true,
        description: 'No primes under 2'
      }
    ],
    hints: [
      'Check each number from 2 to n',
      'A number is prime if no smaller number divides it evenly',
      'Only check divisors up to the square root',
      'Use break to exit the inner loop early'
    ],
    language: 'python'
  }
];
