import { Quiz } from '../../../core/types';

export const cs101Quizzes: Quiz[] = [
  // ============================================================================
  // TOPIC 1: Variables and Data Types (3 quizzes)
  // ============================================================================
  {
    id: 'cs101-quiz-1',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types - Fundamentals',
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a valid Python data type?',
        options: ['int', 'float', 'char', 'str'],
        correctAnswer: 2,
        explanation: 'Python does not have a "char" type. Single characters are represented as strings of length 1.'
      },
      {
        id: 'q1-2',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'x = 5\ny = 2\nprint(x / y)',
        correctAnswer: '2.5',
        explanation: 'The / operator performs floating-point division, so 5 / 2 equals 2.5. For integer division, use // instead.'
      },
      {
        id: 'q1-3',
        type: 'true_false',
        prompt: 'In Python, you must declare the type of a variable before using it.',
        correctAnswer: false,
        explanation: 'Python is dynamically typed, meaning variable types are determined automatically at runtime. You do not need to declare types explicitly.'
      },
      {
        id: 'q1-4',
        type: 'multiple_choice',
        prompt: 'What is the correct way to create a variable named "user_age" with the value 25?',
        options: ['int user_age = 25', 'user_age = 25', 'var user_age = 25', 'let user_age = 25'],
        correctAnswer: 1,
        explanation: 'In Python, you simply assign a value to a variable name using the = operator. No type declaration or keywords like var/let are needed.'
      },
      {
        id: 'q1-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'x = "5"\ny = 3\nprint(type(x).__name__)',
        correctAnswer: 'str',
        explanation: 'The value "5" is enclosed in quotes, making it a string (str), not an integer. The quotes determine the type.'
      }
    ]
  },
  {
    id: 'cs101-quiz-1b',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types - Application',
    questions: [
      {
        id: 'q1b-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'a = 10\nb = 3\nprint(a // b)',
        correctAnswer: '3',
        explanation: 'The // operator performs integer (floor) division, which returns the largest integer less than or equal to the result. 10 // 3 = 3.'
      },
      {
        id: 'q1b-2',
        type: 'multiple_choice',
        prompt: 'Which function converts a string "42" to an integer?',
        options: ['str(42)', 'int("42")', 'float("42")', 'number("42")'],
        correctAnswer: 1,
        explanation: 'The int() function converts strings (and floats) to integers. str() converts to string, float() converts to floating-point.'
      },
      {
        id: 'q1b-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'name = "Alice"\nage = 30\nprint(f"Name: {name}")',
        correctAnswer: 'Name: Alice',
        explanation: 'f-strings (formatted string literals) allow you to embed expressions inside curly braces {}. The variable name is replaced with its value.'
      },
      {
        id: 'q1b-4',
        type: 'true_false',
        prompt: 'The expression bool("") evaluates to True.',
        correctAnswer: false,
        explanation: 'An empty string is considered "falsy" in Python. bool("") returns False. Non-empty strings are "truthy" and return True.'
      },
      {
        id: 'q1b-5',
        type: 'multiple_choice',
        prompt: 'What is the result of 10 % 3?',
        options: ['3', '1', '3.33', '0'],
        correctAnswer: 1,
        explanation: 'The % operator returns the remainder of division (modulo). 10 divided by 3 is 3 with a remainder of 1.'
      }
    ]
  },
  {
    id: 'cs101-quiz-1c',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types - Mastery',
    questions: [
      {
        id: 'q1c-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'x = 5\ny = x\nx = 10\nprint(y)',
        correctAnswer: '5',
        explanation: 'When y = x is executed, y gets a copy of the value 5. Changing x later does not affect y because integers are immutable.'
      },
      {
        id: 'q1c-2',
        type: 'multiple_choice',
        prompt: 'Which variable name follows Python naming conventions (PEP 8)?',
        options: ['userName', 'UserName', 'user_name', 'USERNAME'],
        correctAnswer: 2,
        explanation: 'PEP 8 recommends snake_case for variable names (lowercase with underscores). UPPERCASE is for constants, and camelCase is not standard Python.'
      },
      {
        id: 'q1c-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'a, b = 1, 2\na, b = b, a\nprint(a, b)',
        correctAnswer: '2 1',
        explanation: 'Python allows tuple unpacking for swapping values. After a, b = b, a, the values are swapped: a becomes 2 and b becomes 1.'
      },
      {
        id: 'q1c-4',
        type: 'true_false',
        prompt: 'You can change a specific character in a string using indexing, like name[0] = "B".',
        correctAnswer: false,
        explanation: 'Strings in Python are immutable - you cannot change individual characters. You must create a new string instead.'
      },
      {
        id: 'q1c-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'x = int(3.9)\nprint(x)',
        correctAnswer: '3',
        explanation: 'int() truncates (removes) the decimal part when converting a float, it does not round. 3.9 becomes 3.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 2: Control Flow (3 quizzes)
  // ============================================================================
  {
    id: 'cs101-quiz-2',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Control Flow - Fundamentals',
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: 'What keyword is used to exit a loop early?',
        options: ['continue', 'break', 'exit', 'return'],
        correctAnswer: 1,
        explanation: 'The "break" keyword immediately exits the current loop. "continue" skips to the next iteration, and "return" exits a function.'
      },
      {
        id: 'q2-2',
        type: 'code_output',
        prompt: 'How many times will "Hello" be printed?',
        codeSnippet: 'for i in range(3):\n    print("Hello")',
        correctAnswer: '3',
        explanation: 'range(3) generates numbers 0, 1, 2 (3 numbers total), so the loop executes 3 times.'
      },
      {
        id: 'q2-3',
        type: 'multiple_choice',
        prompt: 'Which statement checks if x is greater than 10 AND less than 20?',
        options: [
          'if x > 10 and x < 20:',
          'if x > 10 or x < 20:',
          'if x > 10 & x < 20:',
          'if x > 10 && x < 20:'
        ],
        correctAnswer: 0,
        explanation: 'Use "and" to combine conditions that must both be true. Python uses "and"/"or", not "&&"/"||" like some other languages.'
      },
      {
        id: 'q2-4',
        type: 'true_false',
        prompt: 'The condition "if 0:" will execute the if block.',
        correctAnswer: false,
        explanation: '0 is a "falsy" value in Python. The if block only executes when the condition is truthy. Other falsy values include None, "", [], {}.'
      },
      {
        id: 'q2-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'x = 5\nif x > 10:\n    print("A")\nelif x > 3:\n    print("B")\nelse:\n    print("C")',
        correctAnswer: 'B',
        explanation: 'x is 5, which is not > 10 (so "A" is skipped), but it is > 3, so "B" is printed. Only one branch executes.'
      }
    ]
  },
  {
    id: 'cs101-quiz-2b',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Control Flow - Loops',
    questions: [
      {
        id: 'q2b-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'for i in range(1, 4):\n    print(i, end=" ")',
        correctAnswer: '1 2 3 ',
        explanation: 'range(1, 4) generates 1, 2, 3 (starts at 1, stops before 4). end=" " makes print use a space instead of newline.'
      },
      {
        id: 'q2b-2',
        type: 'multiple_choice',
        prompt: 'What does range(0, 10, 2) generate?',
        options: ['0, 2, 4, 6, 8, 10', '0, 2, 4, 6, 8', '2, 4, 6, 8', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9'],
        correctAnswer: 1,
        explanation: 'range(start, stop, step) with step=2 generates every second number. It stops before 10, so: 0, 2, 4, 6, 8.'
      },
      {
        id: 'q2b-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'count = 0\nwhile count < 3:\n    count += 1\nprint(count)',
        correctAnswer: '3',
        explanation: 'The loop runs while count < 3. It increments count to 1, 2, then 3. When count is 3, the condition is false and the loop exits. Then 3 is printed.'
      },
      {
        id: 'q2b-4',
        type: 'true_false',
        prompt: 'A for loop can iterate over a string, processing each character.',
        correctAnswer: true,
        explanation: 'Strings are iterable in Python. "for char in string:" will loop through each character one at a time.'
      },
      {
        id: 'q2b-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'for i in range(5):\n    if i == 2:\n        continue\n    print(i, end="")',
        correctAnswer: '0134',
        explanation: 'The continue statement skips the rest of the loop body for that iteration. When i is 2, it skips printing, so we get 0, 1, 3, 4.'
      }
    ]
  },
  {
    id: 'cs101-quiz-2c',
    subjectId: 'cs101',
    topicId: 'cs101-topic-2',
    title: 'Control Flow - Mastery',
    questions: [
      {
        id: 'q2c-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'for i in range(3):\n    for j in range(2):\n        print(f"{i},{j}", end=" ")',
        correctAnswer: '0,0 0,1 1,0 1,1 2,0 2,1 ',
        explanation: 'Nested loops: the outer loop runs 3 times (i=0,1,2), and for each outer iteration, the inner loop runs twice (j=0,1).'
      },
      {
        id: 'q2c-2',
        type: 'multiple_choice',
        prompt: 'What happens when a while loop condition is never False?',
        options: ['The loop runs once', 'The program crashes immediately', 'The loop runs forever (infinite loop)', 'Python raises a SyntaxError'],
        correctAnswer: 2,
        explanation: 'If the condition never becomes False, the loop runs forever. This is called an infinite loop and usually requires Ctrl+C to stop.'
      },
      {
        id: 'q2c-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'for i in range(5):\n    if i == 3:\n        break\nelse:\n    print("Done")\nprint("End")',
        correctAnswer: 'End',
        explanation: 'The else block after a for loop only runs if the loop completes without break. Since break is called when i=3, "Done" is skipped.'
      },
      {
        id: 'q2c-4',
        type: 'true_false',
        prompt: 'The expression "not True and False" evaluates to False.',
        correctAnswer: true,
        explanation: '"not True" evaluates to False first, then "False and False" evaluates to False. Operator precedence: not > and > or.'
      },
      {
        id: 'q2c-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'nums = [1, 2, 3]\nfor i, num in enumerate(nums):\n    print(i, end="")',
        correctAnswer: '012',
        explanation: 'enumerate() returns both the index and value. Here we only print the index i, which goes 0, 1, 2.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 3: Functions (3 quizzes)
  // ============================================================================
  {
    id: 'cs101-quiz-3',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Functions - Fundamentals',
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        prompt: 'What keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        explanation: 'Python uses the "def" keyword to define functions, short for "define".'
      },
      {
        id: 'q3-2',
        type: 'code_output',
        prompt: 'What does this function return?',
        codeSnippet: 'def multiply(a, b=2):\n    return a * b\n\nresult = multiply(5)\nprint(result)',
        correctAnswer: '10',
        explanation: 'The function multiplies a by b. Since b has a default value of 2 and we only passed 5 for a, it calculates 5 * 2 = 10.'
      },
      {
        id: 'q3-3',
        type: 'true_false',
        prompt: 'A function in Python must always return a value.',
        correctAnswer: false,
        explanation: 'Functions can perform actions without returning values. If no return statement is used, the function implicitly returns None.'
      },
      {
        id: 'q3-4',
        type: 'multiple_choice',
        prompt: 'What is the difference between a parameter and an argument?',
        options: [
          'They are the same thing',
          'Parameter is in the function definition; argument is the value passed when calling',
          'Argument is in the function definition; parameter is the value passed',
          'Parameters are for numbers; arguments are for strings'
        ],
        correctAnswer: 1,
        explanation: 'Parameters are variables in the function definition (e.g., def greet(name)). Arguments are actual values passed when calling (e.g., greet("Alice")).'
      },
      {
        id: 'q3-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'def greet(name):\n    print(f"Hello, {name}")\n\nresult = greet("World")\nprint(result)',
        correctAnswer: 'Hello, World\nNone',
        explanation: 'greet() prints "Hello, World" but has no return statement, so it returns None. Then print(result) outputs None.'
      }
    ]
  },
  {
    id: 'cs101-quiz-3b',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Functions - Arguments and Scope',
    questions: [
      {
        id: 'q3b-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'def add(a, b, c=0):\n    return a + b + c\n\nprint(add(1, 2))',
        correctAnswer: '3',
        explanation: 'c has a default value of 0. When called with only two arguments, a=1, b=2, c=0, so 1+2+0=3.'
      },
      {
        id: 'q3b-2',
        type: 'multiple_choice',
        prompt: 'What happens if you try to use a local variable outside its function?',
        options: ['It works normally', 'Python returns None', 'NameError is raised', 'The global value is used'],
        correctAnswer: 2,
        explanation: 'Local variables only exist inside the function. Trying to access them outside raises a NameError because the name is not defined in that scope.'
      },
      {
        id: 'q3b-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'def outer():\n    x = 10\n    def inner():\n        return x * 2\n    return inner()\n\nprint(outer())',
        correctAnswer: '20',
        explanation: 'inner() can access x from the enclosing scope (outer). This is called a closure. inner() returns 10*2=20, which outer() returns.'
      },
      {
        id: 'q3b-4',
        type: 'true_false',
        prompt: 'Keyword arguments must always come after positional arguments in a function call.',
        correctAnswer: true,
        explanation: 'Python requires positional arguments first, then keyword arguments. greet("Hi", name="Bob") is valid, but greet(name="Bob", "Hi") is not.'
      },
      {
        id: 'q3b-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'def get_info():\n    return "Alice", 30\n\nname, age = get_info()\nprint(age)',
        correctAnswer: '30',
        explanation: 'Functions can return multiple values as a tuple. Tuple unpacking assigns "Alice" to name and 30 to age.'
      }
    ]
  },
  {
    id: 'cs101-quiz-3c',
    subjectId: 'cs101',
    topicId: 'cs101-topic-3',
    title: 'Functions - Mastery',
    questions: [
      {
        id: 'q3c-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item(1))\nprint(add_item(2))',
        correctAnswer: '[1]\n[1, 2]',
        explanation: 'Mutable default arguments are shared between calls! The same list is used each time, so items accumulate. Use None as default instead.'
      },
      {
        id: 'q3c-2',
        type: 'multiple_choice',
        prompt: 'What does *args allow in a function definition?',
        options: ['Required arguments only', 'Keyword arguments only', 'Variable number of positional arguments', 'Exactly two arguments'],
        correctAnswer: 2,
        explanation: '*args collects any number of positional arguments into a tuple. def func(*args) can accept func(1), func(1,2), func(1,2,3), etc.'
      },
      {
        id: 'q3c-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'square = lambda x: x ** 2\nprint(square(5))',
        correctAnswer: '25',
        explanation: 'Lambda functions are anonymous functions. "lambda x: x ** 2" creates a function that squares its input. 5**2 = 25.'
      },
      {
        id: 'q3c-4',
        type: 'true_false',
        prompt: 'A function can modify a global variable without using the global keyword if that variable is a list.',
        correctAnswer: true,
        explanation: 'You can modify mutable objects (lists, dicts) without global. You only need global to reassign the variable itself to a new object.'
      },
      {
        id: 'q3c-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(4))',
        correctAnswer: '24',
        explanation: 'This is a recursive function. factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 4: Lists and Dictionaries (3 quizzes)
  // ============================================================================
  {
    id: 'cs101-quiz-4',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Lists and Dictionaries - Fundamentals',
    questions: [
      {
        id: 'q4-1',
        type: 'multiple_choice',
        prompt: 'What is the index of the first element in a Python list?',
        options: ['1', '0', '-1', 'It depends on the list'],
        correctAnswer: 1,
        explanation: 'Python uses zero-based indexing, so the first element is at index 0.'
      },
      {
        id: 'q4-2',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'fruits = ["apple", "banana", "cherry"]\nprint(len(fruits))',
        correctAnswer: '3',
        explanation: 'The len() function returns the number of items in the list. There are 3 fruits in the list.'
      },
      {
        id: 'q4-3',
        type: 'multiple_choice',
        prompt: 'How do you access the value associated with key "name" in a dictionary called person?',
        options: ['person.name', 'person["name"]', 'person(name)', 'person->name'],
        correctAnswer: 1,
        explanation: 'Dictionary values are accessed using square brackets with the key: person["name"]. You can also use person.get("name") for safe access.'
      },
      {
        id: 'q4-4',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'nums = [1, 2, 3, 4, 5]\nprint(nums[-1])',
        correctAnswer: '5',
        explanation: 'Negative indices count from the end. nums[-1] is the last element (5), nums[-2] would be 4, etc.'
      },
      {
        id: 'q4-5',
        type: 'true_false',
        prompt: 'Dictionary keys must be unique.',
        correctAnswer: true,
        explanation: 'Each key in a dictionary must be unique. If you assign a value to an existing key, it overwrites the previous value.'
      }
    ]
  },
  {
    id: 'cs101-quiz-4b',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Lists and Dictionaries - Operations',
    questions: [
      {
        id: 'q4b-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'nums = [1, 2, 3, 4, 5]\nprint(nums[1:4])',
        correctAnswer: '[2, 3, 4]',
        explanation: 'Slicing [1:4] gets elements from index 1 up to (but not including) index 4. That\'s indices 1, 2, 3 with values 2, 3, 4.'
      },
      {
        id: 'q4b-2',
        type: 'multiple_choice',
        prompt: 'What method adds an element to the end of a list?',
        options: ['list.add()', 'list.insert()', 'list.append()', 'list.push()'],
        correctAnswer: 2,
        explanation: 'append() adds to the end. insert() adds at a specific index. Python doesn\'t have add() or push() for lists.'
      },
      {
        id: 'q4b-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'person = {"name": "Alice", "age": 30}\nprint(person.get("city", "Unknown"))',
        correctAnswer: 'Unknown',
        explanation: 'get() returns the default value if the key doesn\'t exist. Since "city" is not in the dict, it returns "Unknown".'
      },
      {
        id: 'q4b-4',
        type: 'true_false',
        prompt: 'Lists in Python can contain elements of different types.',
        correctAnswer: true,
        explanation: 'Python lists are heterogeneous - they can contain any mix of types: [1, "hello", 3.14, True, [1, 2]].'
      },
      {
        id: 'q4b-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'nums = [3, 1, 4, 1, 5]\nnums.sort()\nprint(nums[0])',
        correctAnswer: '1',
        explanation: 'sort() sorts the list in place (ascending by default). After sorting, nums is [1, 1, 3, 4, 5], so nums[0] is 1.'
      }
    ]
  },
  {
    id: 'cs101-quiz-4c',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Lists and Dictionaries - Mastery',
    questions: [
      {
        id: 'q4c-1',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'squares = [x**2 for x in range(4)]\nprint(squares)',
        correctAnswer: '[0, 1, 4, 9]',
        explanation: 'This list comprehension creates squares of 0, 1, 2, 3. Result: [0**2, 1**2, 2**2, 3**2] = [0, 1, 4, 9].'
      },
      {
        id: 'q4c-2',
        type: 'multiple_choice',
        prompt: 'What is the result of {"a": 1, "b": 2} | {"b": 3, "c": 4} in Python 3.9+?',
        options: [
          '{"a": 1, "b": 2, "c": 4}',
          '{"a": 1, "b": 3, "c": 4}',
          'Error: cannot use | with dicts',
          '{"a": 1, "b": 2, "b": 3, "c": 4}'
        ],
        correctAnswer: 1,
        explanation: 'The | operator merges dictionaries. When keys conflict, the right dict wins. So "b" becomes 3 from the right dict.'
      },
      {
        id: 'q4c-3',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'original = [1, 2, 3]\ncopy = original\ncopy.append(4)\nprint(original)',
        correctAnswer: '[1, 2, 3, 4]',
        explanation: 'copy = original creates a reference, not a copy. Both variables point to the same list. Use original.copy() for a true copy.'
      },
      {
        id: 'q4c-4',
        type: 'true_false',
        prompt: 'The expression "key" in {"key": "value"} returns True.',
        correctAnswer: true,
        explanation: 'The "in" operator checks if a key exists in a dictionary. "key" is a key in the dict, so it returns True.'
      },
      {
        id: 'q4c-5',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'data = {"a": 1, "b": 2, "c": 3}\nkeys = list(data.keys())\nprint(keys[0])',
        correctAnswer: 'a',
        explanation: 'data.keys() returns the dictionary keys. In Python 3.7+, dicts maintain insertion order, so the first key is "a".'
      }
    ]
  },

  // ============================================================================
  // TOPIC 5: File I/O (3 quizzes)
  // ============================================================================
  {
    id: 'cs101-quiz-5',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'File I/O - Fundamentals',
    questions: [
      {
        id: 'q5-1',
        type: 'multiple_choice',
        prompt: 'Which file mode should you use to add content to the end of an existing file?',
        options: ['"r"', '"w"', '"a"', '"x"'],
        correctAnswer: 2,
        explanation: 'The "a" mode (append) adds content to the end of a file without overwriting existing content. "w" would overwrite the file.'
      },
      {
        id: 'q5-2',
        type: 'true_false',
        prompt: 'Using the "with" statement when opening files automatically closes the file when done.',
        correctAnswer: true,
        explanation: 'The "with" statement is a context manager that automatically handles file closing, even if an error occurs.'
      },
      {
        id: 'q5-3',
        type: 'multiple_choice',
        prompt: 'What method reads the entire contents of a file as a single string?',
        options: ['file.readline()', 'file.read()', 'file.readlines()', 'file.readall()'],
        correctAnswer: 1,
        explanation: 'file.read() reads the entire file content as one string. readline() reads one line, and readlines() reads all lines into a list.'
      },
      {
        id: 'q5-4',
        type: 'multiple_choice',
        prompt: 'What happens if you open a file with mode "w" and the file already exists?',
        options: [
          'An error is raised',
          'Content is added to the end',
          'The existing content is deleted',
          'The file is renamed'
        ],
        correctAnswer: 2,
        explanation: 'Mode "w" (write) overwrites the file, deleting all existing content. Use "a" to append instead.'
      },
      {
        id: 'q5-5',
        type: 'true_false',
        prompt: 'The readlines() method returns a list of strings, one for each line in the file.',
        correctAnswer: true,
        explanation: 'readlines() reads all lines into a list. Each element is a string including the newline character (\\n) at the end.'
      }
    ]
  },
  {
    id: 'cs101-quiz-5b',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'File I/O - Working with Files',
    questions: [
      {
        id: 'q5b-1',
        type: 'multiple_choice',
        prompt: 'Which module do you import to work with JSON files?',
        options: ['file', 'io', 'json', 'data'],
        correctAnswer: 2,
        explanation: 'The json module provides json.load() to read JSON files and json.dump() to write them.'
      },
      {
        id: 'q5b-2',
        type: 'code_output',
        prompt: 'What will json.loads(\'{"name": "Alice"}\')[\"name\"] return?',
        codeSnippet: 'import json\nresult = json.loads(\'{"name": "Alice"}\')["name"]\nprint(result)',
        correctAnswer: 'Alice',
        explanation: 'json.loads() parses a JSON string into a Python dict. Then ["name"] accesses the value, which is "Alice".'
      },
      {
        id: 'q5b-3',
        type: 'true_false',
        prompt: 'You should always specify encoding="utf-8" when opening text files to avoid character encoding issues.',
        correctAnswer: true,
        explanation: 'Specifying encoding explicitly (usually UTF-8) prevents issues with non-ASCII characters and ensures consistent behavior across systems.'
      },
      {
        id: 'q5b-4',
        type: 'multiple_choice',
        prompt: 'What does csv.DictReader do?',
        options: [
          'Reads CSV as a dictionary of lists',
          'Reads each row as a dictionary with column headers as keys',
          'Converts a dictionary to CSV format',
          'Creates an empty dictionary for CSV data'
        ],
        correctAnswer: 1,
        explanation: 'csv.DictReader uses the first row as headers and returns each subsequent row as a dictionary with header keys.'
      },
      {
        id: 'q5b-5',
        type: 'code_output',
        prompt: 'If a file contains "Hello\\nWorld", what will file.read().strip() return?',
        codeSnippet: '# File content: "Hello\\nWorld\\n"\ncontent = file.read().strip()\nprint(repr(content))',
        correctAnswer: "'Hello\\nWorld'",
        explanation: 'strip() removes leading/trailing whitespace including newlines. The \\n between words is preserved.'
      }
    ]
  },
  {
    id: 'cs101-quiz-5c',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'File I/O - Mastery',
    questions: [
      {
        id: 'q5c-1',
        type: 'multiple_choice',
        prompt: 'What exception is raised when trying to open a non-existent file for reading?',
        options: ['IOError', 'FileNotFoundError', 'ValueError', 'PermissionError'],
        correctAnswer: 1,
        explanation: 'FileNotFoundError is raised when the file does not exist. Use try/except to handle this gracefully.'
      },
      {
        id: 'q5c-2',
        type: 'code_output',
        prompt: 'What will Path("folder/file.txt").suffix return?',
        codeSnippet: 'from pathlib import Path\nprint(Path("folder/file.txt").suffix)',
        correctAnswer: '.txt',
        explanation: 'Path.suffix returns the file extension including the dot. For "file.txt", it returns ".txt".'
      },
      {
        id: 'q5c-3',
        type: 'true_false',
        prompt: 'Using file mode "x" raises an error if the file already exists.',
        correctAnswer: true,
        explanation: 'Mode "x" is exclusive creation - it creates the file only if it doesn\'t exist, otherwise raises FileExistsError.'
      },
      {
        id: 'q5c-4',
        type: 'multiple_choice',
        prompt: 'What is the best practice for iterating over a large file line by line?',
        options: [
          'file.read().split("\\n")',
          'file.readlines()',
          'for line in file:',
          'while file.readline():'
        ],
        correctAnswer: 2,
        explanation: '"for line in file:" is memory-efficient as it reads one line at a time. readlines() loads the entire file into memory.'
      },
      {
        id: 'q5c-5',
        type: 'code_output',
        prompt: 'What will json.dumps({"a": 1}, indent=2) output (first 3 chars)?',
        codeSnippet: 'import json\noutput = json.dumps({"a": 1}, indent=2)\nprint(output[:3])',
        correctAnswer: '{\\n ',
        explanation: 'json.dumps() with indent=2 produces formatted JSON. It starts with "{", then newline, then 2 spaces for indentation.'
      }
    ]
  }
];
