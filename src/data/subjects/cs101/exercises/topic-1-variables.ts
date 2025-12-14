import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs101-exercise-1',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Temperature Converter',
    difficulty: 2,
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
    id: 'cs101-t1-ex02',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variable Swap',
    difficulty: 1,
    description: 'Write a function that takes two values and returns them in swapped order. For example, swap(5, 10) should return (10, 5).',
    starterCode: '# Swap two values and return them\ndef swap(a, b):\n    # Your code here\n    pass\n\n# Test your function\nresult = swap(5, 10)\nprint(result)',
    solution: 'def swap(a, b):\n    return (b, a)\n\nresult = swap(5, 10)\nprint(result)',
    testCases: [
      {
        input: '5, 10',
        expectedOutput: '(10, 5)',
        isHidden: false,
        description: 'Swap two positive integers'
      },
      {
        input: '"hello", "world"',
        expectedOutput: "('world', 'hello')",
        isHidden: false,
        description: 'Swap two strings'
      },
      {
        input: '0, -5',
        expectedOutput: '(-5, 0)',
        isHidden: true,
        description: 'Swap with zero and negative'
      }
    ],
    hints: [
      'Python can return multiple values as a tuple',
      'You can return values in any order you want',
      'Try: return (b, a)'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t1-ex03',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Type Checker',
    difficulty: 1,
    description: 'Write a function that takes a value and returns a string describing its type. Return "integer", "float", "string", or "boolean" accordingly.',
    starterCode: '# Return the type of the value as a string\ndef get_type_name(value):\n    # Your code here\n    pass\n\n# Test your function\nprint(get_type_name(42))\nprint(get_type_name(3.14))\nprint(get_type_name("hello"))\nprint(get_type_name(True))',
    solution: 'def get_type_name(value):\n    if isinstance(value, bool):\n        return "boolean"\n    elif isinstance(value, int):\n        return "integer"\n    elif isinstance(value, float):\n        return "float"\n    elif isinstance(value, str):\n        return "string"\n    else:\n        return "unknown"\n\nprint(get_type_name(42))\nprint(get_type_name(3.14))\nprint(get_type_name("hello"))\nprint(get_type_name(True))',
    testCases: [
      {
        input: '42',
        expectedOutput: 'integer',
        isHidden: false,
        description: 'Integer type'
      },
      {
        input: '3.14',
        expectedOutput: 'float',
        isHidden: false,
        description: 'Float type'
      },
      {
        input: '"hello"',
        expectedOutput: 'string',
        isHidden: false,
        description: 'String type'
      },
      {
        input: 'True',
        expectedOutput: 'boolean',
        isHidden: true,
        description: 'Boolean type'
      }
    ],
    hints: [
      'Use the isinstance() function to check types',
      'Check for bool before int (bool is a subclass of int in Python)',
      'isinstance(value, int) checks if value is an integer'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t1-ex04',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Circle Calculator',
    difficulty: 2,
    description: 'Write a function that takes a radius and returns the area of a circle. Use 3.14159 for pi. The formula is: area = pi * radius^2',
    starterCode: '# Calculate the area of a circle given its radius\ndef circle_area(radius):\n    # Your code here\n    pass\n\n# Test your function\nprint(circle_area(1))\nprint(circle_area(5))',
    solution: 'def circle_area(radius):\n    pi = 3.14159\n    area = pi * radius ** 2\n    return area\n\nprint(circle_area(1))\nprint(circle_area(5))',
    testCases: [
      {
        input: '1',
        expectedOutput: '3.14159',
        isHidden: false,
        description: 'Unit circle'
      },
      {
        input: '5',
        expectedOutput: '78.53975',
        isHidden: false,
        description: 'Radius of 5'
      },
      {
        input: '10',
        expectedOutput: '314.159',
        isHidden: true,
        description: 'Radius of 10'
      }
    ],
    hints: [
      'Define pi as a variable: pi = 3.14159',
      'Use ** for exponentiation (radius ** 2)',
      'Multiply pi by radius squared'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t1-ex05',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'String Formatter',
    difficulty: 2,
    description: 'Write a function that takes a name and age, and returns a formatted string: "Hello, my name is [name] and I am [age] years old."',
    starterCode: '# Format a greeting with name and age\ndef format_greeting(name, age):\n    # Your code here\n    pass\n\n# Test your function\nprint(format_greeting("Alice", 25))\nprint(format_greeting("Bob", 30))',
    solution: 'def format_greeting(name, age):\n    return f"Hello, my name is {name} and I am {age} years old."\n\nprint(format_greeting("Alice", 25))\nprint(format_greeting("Bob", 30))',
    testCases: [
      {
        input: '"Alice", 25',
        expectedOutput: 'Hello, my name is Alice and I am 25 years old.',
        isHidden: false,
        description: 'Basic greeting'
      },
      {
        input: '"Bob", 30',
        expectedOutput: 'Hello, my name is Bob and I am 30 years old.',
        isHidden: false,
        description: 'Another greeting'
      },
      {
        input: '"Charlie", 0',
        expectedOutput: 'Hello, my name is Charlie and I am 0 years old.',
        isHidden: true,
        description: 'Edge case with zero age'
      }
    ],
    hints: [
      'Use f-strings for easy string formatting: f"text {variable}"',
      'You can also use .format() method or string concatenation',
      'Make sure to include all the required text exactly as shown'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t1-ex06',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Number Rounder',
    difficulty: 3,
    description: 'Write a function that takes a float and an integer n, and returns the float rounded to n decimal places. For example, round_to(3.14159, 2) should return 3.14.',
    starterCode: '# Round a number to n decimal places\ndef round_to(number, n):\n    # Your code here\n    pass\n\n# Test your function\nprint(round_to(3.14159, 2))\nprint(round_to(2.71828, 3))',
    solution: 'def round_to(number, n):\n    return round(number, n)\n\nprint(round_to(3.14159, 2))\nprint(round_to(2.71828, 3))',
    testCases: [
      {
        input: '3.14159, 2',
        expectedOutput: '3.14',
        isHidden: false,
        description: 'Round to 2 decimal places'
      },
      {
        input: '2.71828, 3',
        expectedOutput: '2.718',
        isHidden: false,
        description: 'Round to 3 decimal places'
      },
      {
        input: '1.999, 1',
        expectedOutput: '2.0',
        isHidden: true,
        description: 'Rounding up'
      }
    ],
    hints: [
      'Python has a built-in round() function',
      'round(number, n) rounds to n decimal places',
      'The second argument to round() specifies precision'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t1-ex07',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'BMI Calculator',
    difficulty: 3,
    description: 'Write a function that calculates Body Mass Index (BMI). The formula is: BMI = weight (kg) / height (m)^2. Return the BMI rounded to 1 decimal place.',
    starterCode: '# Calculate BMI from weight (kg) and height (m)\ndef calculate_bmi(weight, height):\n    # Your code here\n    pass\n\n# Test your function\nprint(calculate_bmi(70, 1.75))\nprint(calculate_bmi(85, 1.80))',
    solution: 'def calculate_bmi(weight, height):\n    bmi = weight / (height ** 2)\n    return round(bmi, 1)\n\nprint(calculate_bmi(70, 1.75))\nprint(calculate_bmi(85, 1.80))',
    testCases: [
      {
        input: '70, 1.75',
        expectedOutput: '22.9',
        isHidden: false,
        description: 'Normal BMI'
      },
      {
        input: '85, 1.80',
        expectedOutput: '26.2',
        isHidden: false,
        description: 'Overweight BMI'
      },
      {
        input: '50, 1.60',
        expectedOutput: '19.5',
        isHidden: true,
        description: 'Lower BMI'
      }
    ],
    hints: [
      'First calculate BMI using the formula: weight / height^2',
      'Use ** for exponentiation: height ** 2',
      'Round the result to 1 decimal place using round(bmi, 1)'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t1-ex08',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Compound Interest Calculator',
    difficulty: 4,
    description: 'Write a function that calculates compound interest. Given principal, annual rate (as decimal), times compounded per year, and years, return the final amount. Formula: A = P(1 + r/n)^(nt). Round to 2 decimal places.',
    starterCode: '# Calculate compound interest\n# principal: initial amount\n# rate: annual interest rate (decimal, e.g., 0.05 for 5%)\n# n: times compounded per year\n# years: number of years\ndef compound_interest(principal, rate, n, years):\n    # Your code here\n    pass\n\n# Test: $1000 at 5% compounded monthly for 10 years\nprint(compound_interest(1000, 0.05, 12, 10))\n# Test: $5000 at 3% compounded quarterly for 5 years\nprint(compound_interest(5000, 0.03, 4, 5))',
    solution: 'def compound_interest(principal, rate, n, years):\n    amount = principal * (1 + rate/n) ** (n * years)\n    return round(amount, 2)\n\nprint(compound_interest(1000, 0.05, 12, 10))\nprint(compound_interest(5000, 0.03, 4, 5))',
    testCases: [
      {
        input: '1000, 0.05, 12, 10',
        expectedOutput: '1647.01',
        isHidden: false,
        description: '$1000 at 5% monthly for 10 years'
      },
      {
        input: '5000, 0.03, 4, 5',
        expectedOutput: '5808.08',
        isHidden: false,
        description: '$5000 at 3% quarterly for 5 years'
      },
      {
        input: '10000, 0.07, 1, 20',
        expectedOutput: '38696.84',
        isHidden: true,
        description: '$10000 at 7% annually for 20 years'
      }
    ],
    hints: [
      'The formula is: A = P(1 + r/n)^(nt)',
      'P is principal, r is rate, n is compounds per year, t is years',
      'Use ** for exponentiation',
      'Remember to round to 2 decimal places'
    ],
    language: 'python'
  }
];
