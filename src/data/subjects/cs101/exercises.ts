import { CodingExercise } from '../../../core/types';

export const cs101Exercises: CodingExercise[] = [
  {
    id: 'cs101-exercise-1',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Temperature Converter',
    description: 'Create a program that converts temperature from Celsius to Fahrenheit. The formula is: F = (C * 9/5) + 32',
    starterCode: '# Complete the function to convert Celsius to Fahrenheit\ndef celsius_to_fahrenheit(celsius):\n    # Your code here\n    pass\n\n# Test your function\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))',
    solution: 'def celsius_to_fahrenheit(celsius):\n    fahrenheit = (celsius * 9/5) + 32\n    return fahrenheit\n\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))',
    testCases: [
      {
        input: '0',
        expectedOutput: '32.0',
        isHidden: false,
        description: 'Freezing point of water'
      },
      {
        input: '100',
        expectedOutput: '212.0',
        isHidden: false,
        description: 'Boiling point of water'
      },
      {
        input: '37',
        expectedOutput: '98.6',
        isHidden: true,
        description: 'Normal body temperature'
      }
    ],
    hints: [
      'Remember the formula: F = (C * 9/5) + 32',
      'Use parentheses to ensure correct order of operations',
      'Return the calculated fahrenheit value'
    ],
    language: 'python'
  },
  {
    id: 'cs101-exercise-2',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'FizzBuzz',
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
    id: 'cs101-exercise-3',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Find Maximum',
    description: 'Write a function that takes a list of numbers and returns the maximum value. Do not use the built-in max() function.',
    starterCode: 'def find_max(numbers):\n    # Your code here\n    pass\n\nprint(find_max([3, 7, 2, 9, 1]))\nprint(find_max([-5, -2, -10, -1]))',
    solution: 'def find_max(numbers):\n    if not numbers:\n        return None\n    \n    max_value = numbers[0]\n    for num in numbers:\n        if num > max_value:\n            max_value = num\n    return max_value\n\nprint(find_max([3, 7, 2, 9, 1]))\nprint(find_max([-5, -2, -10, -1]))',
    testCases: [
      {
        input: '[3, 7, 2, 9, 1]',
        expectedOutput: '9',
        isHidden: false,
        description: 'Positive numbers'
      },
      {
        input: '[-5, -2, -10, -1]',
        expectedOutput: '-1',
        isHidden: false,
        description: 'Negative numbers'
      },
      {
        input: '[42]',
        expectedOutput: '42',
        isHidden: true,
        description: 'Single element'
      }
    ],
    hints: [
      'Start by assuming the first number is the maximum',
      'Loop through all numbers in the list',
      'Compare each number with the current maximum',
      'Update the maximum if you find a larger number'
    ],
    language: 'python'
  },
  {
    id: 'cs101-exercise-4',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Word Frequency Counter',
    description: 'Write a function that takes a string and returns a dictionary with the frequency of each word.',
    starterCode: 'def word_frequency(text):\n    # Your code here\n    pass\n\nprint(word_frequency("hello world hello"))\nprint(word_frequency("the quick brown fox jumps over the lazy dog"))',
    solution: 'def word_frequency(text):\n    words = text.lower().split()\n    frequency = {}\n    \n    for word in words:\n        if word in frequency:\n            frequency[word] += 1\n        else:\n            frequency[word] = 1\n    \n    return frequency\n\nprint(word_frequency("hello world hello"))\nprint(word_frequency("the quick brown fox jumps over the lazy dog"))',
    testCases: [
      {
        input: '"hello world hello"',
        expectedOutput: "{'hello': 2, 'world': 1}",
        isHidden: false,
        description: 'Simple repeated word'
      },
      {
        input: '"the quick brown fox jumps over the lazy dog"',
        expectedOutput: "{'the': 2, 'quick': 1, 'brown': 1, 'fox': 1, 'jumps': 1, 'over': 1, 'lazy': 1, 'dog': 1}",
        isHidden: false,
        description: 'Multiple words with one repeat'
      },
      {
        input: '"a a a b b c"',
        expectedOutput: "{'a': 3, 'b': 2, 'c': 1}",
        isHidden: true,
        description: 'Different frequencies'
      }
    ],
    hints: [
      'Use .split() to break the text into words',
      'Create an empty dictionary to store frequencies',
      'Loop through each word and update its count',
      'Use .lower() to make counting case-insensitive'
    ],
    language: 'python'
  },
  {
    id: 'cs101-exercise-5',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Line Counter',
    description: 'Write a function that reads a text file and returns the number of lines in it.',
    starterCode: 'def count_lines(filename):\n    # Your code here\n    pass\n\nprint(count_lines("sample.txt"))',
    solution: 'def count_lines(filename):\n    try:\n        with open(filename, "r") as file:\n            lines = file.readlines()\n            return len(lines)\n    except FileNotFoundError:\n        return 0\n\nprint(count_lines("sample.txt"))',
    testCases: [
      {
        input: '"sample.txt"',
        expectedOutput: '5',
        isHidden: false,
        description: 'File with 5 lines'
      },
      {
        input: '"empty.txt"',
        expectedOutput: '0',
        isHidden: false,
        description: 'Empty file'
      },
      {
        input: '"nonexistent.txt"',
        expectedOutput: '0',
        isHidden: true,
        description: 'File does not exist'
      }
    ],
    hints: [
      'Use "with open(filename, \'r\') as file:" to open the file',
      'Use readlines() to get all lines as a list',
      'Use len() to count the number of lines',
      'Handle FileNotFoundError with a try/except block'
    ],
    language: 'python'
  }
];
