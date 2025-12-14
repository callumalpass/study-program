import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs101-exercise-3',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Find Maximum',
    difficulty: 2,
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
    id: 'cs101-t3-ex02',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Double a Number',
    difficulty: 1,
    description: 'Write a function that takes a number and returns its double.',
    starterCode: '# Return double the input number\ndef double(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(double(5))\nprint(double(-3))',
    solution: 'def double(n):\n    return n * 2\n\nprint(double(5))\nprint(double(-3))',
    testCases: [
      {
        input: '5',
        expectedOutput: '10',
        isHidden: false,
        description: 'Double 5'
      },
      {
        input: '-3',
        expectedOutput: '-6',
        isHidden: false,
        description: 'Double negative number'
      },
      {
        input: '0',
        expectedOutput: '0',
        isHidden: true,
        description: 'Double zero'
      }
    ],
    hints: [
      'Use the * operator for multiplication',
      'Remember to use return to send back the result'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex03',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Greeting with Default',
    difficulty: 1,
    description: 'Write a function called greet that takes a name parameter with a default value of "World". It should return "Hello, [name]!".',
    starterCode: '# Greet function with default parameter\ndef greet(name="World"):\n    # Your code here\n    pass\n\n# Test your function\nprint(greet())\nprint(greet("Alice"))',
    solution: 'def greet(name="World"):\n    return f"Hello, {name}!"\n\nprint(greet())\nprint(greet("Alice"))',
    testCases: [
      {
        input: '',
        expectedOutput: 'Hello, World!',
        isHidden: false,
        description: 'Default greeting'
      },
      {
        input: '"Alice"',
        expectedOutput: 'Hello, Alice!',
        isHidden: false,
        description: 'Custom greeting'
      },
      {
        input: '"Python"',
        expectedOutput: 'Hello, Python!',
        isHidden: true,
        description: 'Another custom greeting'
      }
    ],
    hints: [
      'Default parameters are set with = in the function definition',
      'Use an f-string to format the return value',
      'The function should return the greeting, not print it'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex04',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Calculate Average',
    difficulty: 2,
    description: 'Write a function that takes a list of numbers and returns their average (mean). Return 0 for an empty list.',
    starterCode: '# Calculate the average of a list of numbers\ndef average(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(average([1, 2, 3, 4, 5]))\nprint(average([10, 20]))',
    solution: 'def average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)\n\nprint(average([1, 2, 3, 4, 5]))\nprint(average([10, 20]))',
    testCases: [
      {
        input: '[1, 2, 3, 4, 5]',
        expectedOutput: '3.0',
        isHidden: false,
        description: 'Average of 1-5'
      },
      {
        input: '[10, 20]',
        expectedOutput: '15.0',
        isHidden: false,
        description: 'Average of two numbers'
      },
      {
        input: '[]',
        expectedOutput: '0',
        isHidden: true,
        description: 'Empty list'
      }
    ],
    hints: [
      'Sum all numbers and divide by the count',
      'Use sum() to add all numbers together',
      'Use len() to get the count of numbers',
      'Handle the empty list case first'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex05',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Power Function',
    difficulty: 2,
    description: 'Write a function that calculates base raised to the power of exponent. Do not use the ** operator or pow() function.',
    starterCode: '# Calculate base to the power of exponent\ndef power(base, exponent):\n    # Your code here\n    pass\n\n# Test your function\nprint(power(2, 3))\nprint(power(5, 2))',
    solution: 'def power(base, exponent):\n    result = 1\n    for _ in range(exponent):\n        result *= base\n    return result\n\nprint(power(2, 3))\nprint(power(5, 2))',
    testCases: [
      {
        input: '2, 3',
        expectedOutput: '8',
        isHidden: false,
        description: '2^3 = 8'
      },
      {
        input: '5, 2',
        expectedOutput: '25',
        isHidden: false,
        description: '5^2 = 25'
      },
      {
        input: '3, 0',
        expectedOutput: '1',
        isHidden: true,
        description: 'Any number to 0 is 1'
      }
    ],
    hints: [
      'Start with result = 1',
      'Multiply by base, exponent times',
      'Use a for loop with range(exponent)',
      'Any number raised to 0 is 1'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex06',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'String Repeater',
    difficulty: 3,
    description: 'Write a function that takes a string and a number n, and returns the string repeated n times with a separator. Default separator is a space.',
    starterCode: '# Repeat string n times with separator\ndef repeat_string(text, n, separator=" "):\n    # Your code here\n    pass\n\n# Test your function\nprint(repeat_string("hello", 3))\nprint(repeat_string("hi", 4, "-"))',
    solution: 'def repeat_string(text, n, separator=" "):\n    return separator.join([text] * n)\n\nprint(repeat_string("hello", 3))\nprint(repeat_string("hi", 4, "-"))',
    testCases: [
      {
        input: '"hello", 3',
        expectedOutput: 'hello hello hello',
        isHidden: false,
        description: 'Repeat with space'
      },
      {
        input: '"hi", 4, "-"',
        expectedOutput: 'hi-hi-hi-hi',
        isHidden: false,
        description: 'Repeat with dash'
      },
      {
        input: '"x", 1',
        expectedOutput: 'x',
        isHidden: true,
        description: 'Single repeat'
      }
    ],
    hints: [
      '[text] * n creates a list with text repeated n times',
      'Use separator.join() to join list elements with separator',
      'The default separator is already defined in the function signature'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex07',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Factorial Calculator',
    difficulty: 3,
    description: 'Write a function that calculates the factorial of a non-negative integer. Factorial of n (n!) is the product of all positive integers less than or equal to n. 0! = 1.',
    starterCode: '# Calculate factorial of n\ndef factorial(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(factorial(5))\nprint(factorial(0))',
    solution: 'def factorial(n):\n    if n == 0:\n        return 1\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))\nprint(factorial(0))',
    testCases: [
      {
        input: '5',
        expectedOutput: '120',
        isHidden: false,
        description: '5! = 120'
      },
      {
        input: '0',
        expectedOutput: '1',
        isHidden: false,
        description: '0! = 1'
      },
      {
        input: '7',
        expectedOutput: '5040',
        isHidden: true,
        description: '7! = 5040'
      }
    ],
    hints: [
      'Handle the special case: 0! = 1',
      'Multiply all numbers from 1 to n together',
      'Use a loop or recursion',
      '5! = 5 * 4 * 3 * 2 * 1 = 120'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex08',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Apply Function to List',
    difficulty: 4,
    description: 'Write a function called apply_to_all that takes a function and a list, and returns a new list with the function applied to each element.',
    starterCode: '# Apply a function to all elements in a list\ndef apply_to_all(func, items):\n    # Your code here\n    pass\n\n# Test functions\ndef square(x):\n    return x * x\n\ndef double(x):\n    return x * 2\n\n# Test your function\nprint(apply_to_all(square, [1, 2, 3, 4]))\nprint(apply_to_all(double, [1, 2, 3, 4]))',
    solution: 'def apply_to_all(func, items):\n    result = []\n    for item in items:\n        result.append(func(item))\n    return result\n\ndef square(x):\n    return x * x\n\ndef double(x):\n    return x * 2\n\nprint(apply_to_all(square, [1, 2, 3, 4]))\nprint(apply_to_all(double, [1, 2, 3, 4]))',
    testCases: [
      {
        input: 'square, [1, 2, 3, 4]',
        expectedOutput: '[1, 4, 9, 16]',
        isHidden: false,
        description: 'Square all elements'
      },
      {
        input: 'double, [1, 2, 3, 4]',
        expectedOutput: '[2, 4, 6, 8]',
        isHidden: false,
        description: 'Double all elements'
      },
      {
        input: 'square, []',
        expectedOutput: '[]',
        isHidden: true,
        description: 'Empty list'
      }
    ],
    hints: [
      'Functions can be passed as arguments to other functions',
      'Create an empty result list',
      'Loop through items and call func(item) for each',
      'Append each result to the result list'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex09',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Recursive Sum',
    difficulty: 5,
    description: 'Write a recursive function that calculates the sum of a list of numbers. Do not use loops or the built-in sum() function.',
    starterCode: '# Recursively sum a list of numbers\ndef recursive_sum(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(recursive_sum([1, 2, 3, 4, 5]))\nprint(recursive_sum([10]))\nprint(recursive_sum([]))',
    solution: 'def recursive_sum(numbers):\n    if not numbers:\n        return 0\n    return numbers[0] + recursive_sum(numbers[1:])\n\nprint(recursive_sum([1, 2, 3, 4, 5]))\nprint(recursive_sum([10]))\nprint(recursive_sum([]))',
    testCases: [
      {
        input: '[1, 2, 3, 4, 5]',
        expectedOutput: '15',
        isHidden: false,
        description: 'Sum of 1-5'
      },
      {
        input: '[10]',
        expectedOutput: '10',
        isHidden: false,
        description: 'Single element'
      },
      {
        input: '[]',
        expectedOutput: '0',
        isHidden: true,
        description: 'Empty list'
      }
    ],
    hints: [
      'Base case: empty list returns 0',
      'Recursive case: first element + sum of rest',
      'numbers[0] gets the first element',
      'numbers[1:] gets all elements except the first'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex10',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Count Occurrences',
    difficulty: 2,
    description: 'Write a function that counts how many times a value appears in a list.',
    starterCode: '# Count occurrences of value in list\ndef count_value(items, value):\n    # Your code here\n    pass\n\n# Test your function\nprint(count_value([1, 2, 2, 3, 2], 2))\nprint(count_value(["a", "b", "a"], "a"))',
    solution: 'def count_value(items, value):\n    count = 0\n    for item in items:\n        if item == value:\n            count += 1\n    return count\n\nprint(count_value([1, 2, 2, 3, 2], 2))\nprint(count_value(["a", "b", "a"], "a"))',
    testCases: [
      {
        input: '[1, 2, 2, 3, 2], 2',
        expectedOutput: '3',
        isHidden: false,
        description: 'Count 2s in list'
      },
      {
        input: '["a", "b", "a"], "a"',
        expectedOutput: '2',
        isHidden: false,
        description: 'Count strings'
      },
      {
        input: '[1, 2, 3], 4',
        expectedOutput: '0',
        isHidden: true,
        description: 'Value not in list'
      }
    ],
    hints: [
      'Initialize a counter to 0',
      'Loop through each item',
      'Increment counter when item equals value',
      'Return the final count'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex11',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Min and Max',
    difficulty: 2,
    description: 'Write a function that returns both the minimum and maximum values from a list as a tuple. Do not use built-in min() or max().',
    starterCode: '# Find min and max of list\ndef min_max(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(min_max([3, 1, 4, 1, 5, 9]))\nprint(min_max([5]))',
    solution: 'def min_max(numbers):\n    if not numbers:\n        return None\n    min_val = numbers[0]\n    max_val = numbers[0]\n    for num in numbers:\n        if num < min_val:\n            min_val = num\n        if num > max_val:\n            max_val = num\n    return (min_val, max_val)\n\nprint(min_max([3, 1, 4, 1, 5, 9]))\nprint(min_max([5]))',
    testCases: [
      {
        input: '[3, 1, 4, 1, 5, 9]',
        expectedOutput: '(1, 9)',
        isHidden: false,
        description: 'Multiple numbers'
      },
      {
        input: '[5]',
        expectedOutput: '(5, 5)',
        isHidden: false,
        description: 'Single element'
      },
      {
        input: '[-5, 0, 5]',
        expectedOutput: '(-5, 5)',
        isHidden: true,
        description: 'With negative'
      }
    ],
    hints: [
      'Start with first element as both min and max',
      'Loop through and update min/max as needed',
      'Return a tuple: (min_val, max_val)'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex12',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Compose Functions',
    difficulty: 4,
    description: 'Write a function that takes two functions f and g, and returns a new function that computes f(g(x)).',
    starterCode: '# Create a composed function f(g(x))\ndef compose(f, g):\n    # Your code here\n    pass\n\n# Test functions\ndef add_one(x):\n    return x + 1\n\ndef double(x):\n    return x * 2\n\n# Test your function\ncomposed = compose(add_one, double)\nprint(composed(5))  # Should print 11: double(5)=10, add_one(10)=11',
    solution: 'def compose(f, g):\n    def composed_func(x):\n        return f(g(x))\n    return composed_func\n\ndef add_one(x):\n    return x + 1\n\ndef double(x):\n    return x * 2\n\ncomposed = compose(add_one, double)\nprint(composed(5))',
    testCases: [
      {
        input: '5',
        expectedOutput: '11',
        isHidden: false,
        description: 'add_one(double(5)) = 11'
      }
    ],
    hints: [
      'Define a new inner function inside compose',
      'The inner function should call g(x) first',
      'Then pass that result to f()',
      'Return the inner function (not the result)'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex13',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Memoized Fibonacci',
    difficulty: 5,
    description: 'Write a function that calculates the nth Fibonacci number using memoization (caching) to avoid redundant calculations.',
    starterCode: '# Memoized Fibonacci\ndef fib_memo(n, cache=None):\n    if cache is None:\n        cache = {}\n    # Your code here\n    pass\n\n# Test your function\nprint(fib_memo(10))\nprint(fib_memo(30))',
    solution: 'def fib_memo(n, cache=None):\n    if cache is None:\n        cache = {}\n    \n    if n in cache:\n        return cache[n]\n    \n    if n <= 1:\n        return n\n    \n    result = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)\n    cache[n] = result\n    return result\n\nprint(fib_memo(10))\nprint(fib_memo(30))',
    testCases: [
      {
        input: '10',
        expectedOutput: '55',
        isHidden: false,
        description: '10th Fibonacci number'
      },
      {
        input: '30',
        expectedOutput: '832040',
        isHidden: false,
        description: '30th Fibonacci number'
      },
      {
        input: '0',
        expectedOutput: '0',
        isHidden: true,
        description: '0th Fibonacci'
      }
    ],
    hints: [
      'Check if n is already in the cache first',
      'Base cases: fib(0) = 0, fib(1) = 1',
      'Recursively calculate and store result in cache',
      'Pass the cache to recursive calls'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex14',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Decorator Counter',
    difficulty: 5,
    description: 'Write a simple decorator that counts how many times a function has been called. The count should be accessible as an attribute of the function.',
    starterCode: '# Create a call counter decorator\ndef count_calls(func):\n    # Your code here\n    pass\n\n@count_calls\ndef say_hello():\n    print("Hello!")\n\n# Test your decorator\nsay_hello()\nsay_hello()\nsay_hello()\nprint(f"Called {say_hello.calls} times")',
    solution: 'def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef say_hello():\n    print("Hello!")\n\nsay_hello()\nsay_hello()\nsay_hello()\nprint(f"Called {say_hello.calls} times")',
    testCases: [
      {
        input: '',
        expectedOutput: 'Hello!\nHello!\nHello!\nCalled 3 times',
        isHidden: false,
        description: 'Counts 3 calls'
      }
    ],
    hints: [
      'Create a wrapper function inside the decorator',
      'Add a .calls attribute to the wrapper',
      'Increment the count each time wrapper is called',
      'Return the wrapper function'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex15',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Partial Application',
    difficulty: 4,
    description: 'Write a function that takes a function and some arguments, and returns a new function with those arguments pre-filled.',
    starterCode: '# Create a partial application\ndef partial(func, *args):\n    # Your code here\n    pass\n\ndef add(a, b, c):\n    return a + b + c\n\n# Test your function\nadd_10 = partial(add, 10)\nprint(add_10(5, 3))  # Should print 18: 10 + 5 + 3',
    solution: 'def partial(func, *args):\n    def wrapper(*more_args):\n        return func(*args, *more_args)\n    return wrapper\n\ndef add(a, b, c):\n    return a + b + c\n\nadd_10 = partial(add, 10)\nprint(add_10(5, 3))',
    testCases: [
      {
        input: '',
        expectedOutput: '18',
        isHidden: false,
        description: 'Partial with 10 + 5 + 3'
      }
    ],
    hints: [
      'Create an inner function that accepts remaining args',
      'Combine the pre-filled args with the new args',
      'Use *args to handle variable arguments',
      'Return the inner function'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t3-ex16',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Validate Arguments',
    difficulty: 3,
    description: 'Write a function that validates its arguments. It should take a number and ensure it is positive. Raise a ValueError with a helpful message if not.',
    starterCode: '# Validate that number is positive\ndef process_positive(number):\n    # Your code here - validate then return doubled value\n    pass\n\n# Test your function\ntry:\n    print(process_positive(5))\n    print(process_positive(-3))\nexcept ValueError as e:\n    print(f"Error: {e}")',
    solution: 'def process_positive(number):\n    if number <= 0:\n        raise ValueError(f"Number must be positive, got {number}")\n    return number * 2\n\ntry:\n    print(process_positive(5))\n    print(process_positive(-3))\nexcept ValueError as e:\n    print(f"Error: {e}")',
    testCases: [
      {
        input: '5',
        expectedOutput: '10',
        isHidden: false,
        description: 'Positive number works'
      },
      {
        input: '-3',
        expectedOutput: 'Error: Number must be positive, got -3',
        isHidden: false,
        description: 'Negative raises error'
      }
    ],
    hints: [
      'Check if number is <= 0 at the start',
      'Use raise ValueError("message") to throw an error',
      'Include the invalid value in the error message',
      'Return the processed value if valid'
    ],
    language: 'python'
  }
];
