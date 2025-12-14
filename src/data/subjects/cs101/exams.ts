import type { Exam } from '@/core/types';

export const cs101Exams: Exam[] = [
  {
    id: 'cs101-exam-midterm',
    subjectId: 'cs101',
    title: 'CS101 Midterm',
    durationMinutes: 60,
    instructions: [
      'Closed-book style: rely on concepts, not copy/paste.',
      'Answer all questions; passing is 70% or higher.',
      'Fill-in questions expect lowercase, trimmed answers.',
      'Coding prompts include runnable tests—ensure they pass.',
    ],
    questions: [
      // === Variables and Data Types ===
      {
        id: 'mid-q1',
        type: 'multiple_choice',
        prompt: 'Which of the following is a valid variable name in Python?',
        options: ['2nd_place', 'my-variable', 'first_name', 'class'],
        correctAnswer: 2,
        explanation: 'Variable names cannot start with a number, contain hyphens, or be reserved keywords. "first_name" uses valid characters (letters, underscores).',
      },
      {
        id: 'mid-q2',
        type: 'multiple_choice',
        prompt: 'What is the result of `type(3.14)`?',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'decimal'>"],
        correctAnswer: 1,
        explanation: '3.14 is a floating-point number, so its type is float.',
      },
      {
        id: 'mid-q3',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `x = 10
y = 3
print(x // y)
print(x % y)`,
        correctAnswer: '3\n1',
        explanation: '// is integer division (10÷3=3), % is modulo/remainder (10%3=1).',
      },
      {
        id: 'mid-q4',
        type: 'true_false',
        prompt: 'In Python, strings are immutable, meaning they cannot be changed after creation.',
        correctAnswer: true,
        explanation: 'Strings are immutable. Operations like concatenation create new strings rather than modifying existing ones.',
      },
      {
        id: 'mid-q5',
        type: 'fill_blank',
        prompt: 'To convert the string "42" to an integer, you use the ____ function.',
        correctAnswer: 'int',
        explanation: 'The int() function converts strings (and floats) to integers.',
      },
      {
        id: 'mid-q6',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `name = "Python"
print(name[0] + name[-1])`,
        correctAnswer: 'Pn',
        explanation: 'name[0] is "P" (first character), name[-1] is "n" (last character). Concatenated: "Pn".',
      },

      // === Control Flow ===
      {
        id: 'mid-q7',
        type: 'code_output',
        prompt: 'What is printed by this code?',
        codeSnippet: `scores = [72, 85, 91]
avg = sum(scores) / len(scores)
if avg >= 90:
    print("A")
elif avg >= 80:
    print("B")
else:
    print("C")`,
        correctAnswer: 'B',
        explanation: 'Average is (72+85+91)/3 = 82.67, so the elif branch (avg >= 80) prints "B".',
      },
      {
        id: 'mid-q8',
        type: 'fill_blank',
        prompt: 'To exit a loop early when a condition is met, use the ____ keyword.',
        correctAnswer: 'break',
        explanation: 'The break statement exits the innermost loop immediately.',
      },
      {
        id: 'mid-q9',
        type: 'multiple_choice',
        prompt: 'What does `list(range(1, 5))` produce?',
        options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[1, 2, 3, 4]', '[0, 1, 2, 3]'],
        correctAnswer: 2,
        explanation: 'range(1, 5) generates numbers from 1 up to (but not including) 5.',
      },
      {
        id: 'mid-q10',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `total = 0
for i in range(1, 4):
    total += i
print(total)`,
        correctAnswer: '6',
        explanation: 'The loop adds 1 + 2 + 3 = 6.',
      },
      {
        id: 'mid-q11',
        type: 'multiple_choice',
        prompt: 'What is the result of `True and False or True`?',
        options: ['True', 'False', 'None', 'Error'],
        correctAnswer: 0,
        explanation: '`and` has higher precedence than `or`. So: (True and False) or True = False or True = True.',
      },

      // === Functions ===
      {
        id: 'mid-q12',
        type: 'multiple_choice',
        prompt: 'What is the primary reason to wrap logic in functions?',
        options: [
          'To make code longer',
          'To reuse logic, reduce repetition, and improve readability',
          'To slow down execution',
          'To avoid using variables',
        ],
        correctAnswer: 1,
        explanation: 'Functions encapsulate behavior for reuse, clarity, testing, and separation of concerns.',
      },
      {
        id: 'mid-q13',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `def greet(name="World"):
    return f"Hello, {name}!"

print(greet())
print(greet("Alice"))`,
        correctAnswer: 'Hello, World!\nHello, Alice!',
        explanation: 'The first call uses the default parameter; the second overrides it with "Alice".',
      },
      {
        id: 'mid-q14',
        type: 'coding',
        prompt: 'Write a function `first_even(nums)` that returns the first even number in a list, or -1 if none are found.',
        starterCode: 'def first_even(nums):\n    # TODO: implement\n    return -1',
        language: 'python',
        solution: 'def first_even(nums):\n    for n in nums:\n        if n % 2 == 0:\n            return n\n    return -1',
        testCases: [
          { input: 'first_even([1, 3, 5])', expectedOutput: '-1', isHidden: false, description: 'No even values' },
          { input: 'first_even([1, 4, 6])', expectedOutput: '4', isHidden: false, description: 'Returns first even' },
          { input: 'first_even([2])', expectedOutput: '2', isHidden: false, description: 'Single element' },
        ],
        correctAnswer: true,
        explanation: 'Iterate through the list and return the first number divisible by 2; default to -1.',
      },

      // === Lists, Tuples, and Dictionaries ===
      {
        id: 'mid-q15',
        type: 'true_false',
        prompt: 'A list in Python preserves insertion order.',
        correctAnswer: true,
        explanation: 'Lists are ordered collections; iteration returns items in the order they were added.',
      },
      {
        id: 'mid-q16',
        type: 'multiple_choice',
        prompt: 'What data structure best models a mapping of product IDs to prices?',
        options: ['List', 'Tuple', 'Dictionary', 'Set'],
        correctAnswer: 2,
        explanation: 'Dictionaries map keys (product IDs) to values (prices) efficiently.',
      },
      {
        id: 'mid-q17',
        type: 'multiple_choice',
        prompt: 'Given `grades = {"alice": 90, "bob": 80}`, what does `grades.get("carol", 0)` return?',
        options: ['KeyError', 'None', '0', '"carol"'],
        correctAnswer: 2,
        explanation: 'dict.get() returns the default value (0) when the key is not found, avoiding a KeyError.',
      },
      {
        id: 'mid-q18',
        type: 'true_false',
        prompt: 'Tuples are mutable, meaning you can change their elements after creation.',
        correctAnswer: false,
        explanation: 'Tuples are immutable. Once created, their elements cannot be changed.',
      },
      {
        id: 'mid-q19',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `point = (3, 4)
x, y = point
print(x + y)`,
        correctAnswer: '7',
        explanation: 'Tuple unpacking assigns 3 to x and 4 to y. Their sum is 7.',
      },

      // === File I/O ===
      {
        id: 'mid-q20',
        type: 'multiple_choice',
        prompt: 'Which file mode opens a file for writing, creating it if it does not exist and truncating it if it does?',
        options: ['"r"', '"w"', '"a"', '"r+"'],
        correctAnswer: 1,
        explanation: '"w" mode opens for writing, creates the file if needed, and truncates existing content.',
      },
    ],
  },
  {
    id: 'cs101-exam-final',
    subjectId: 'cs101',
    title: 'CS101 Final Exam',
    durationMinutes: 90,
    instructions: [
      'Comprehensive exam covering all course topics.',
      'Mix of multiple choice, code reading, short answers, and coding.',
      'Assume Python 3 semantics.',
      'Aim for at least 70% to pass.',
    ],
    questions: [
      // === Variables and Data Types ===
      {
        id: 'final-q1',
        type: 'multiple_choice',
        prompt: 'What is the value of `5 + 3 * 2`?',
        options: ['16', '11', '13', '10'],
        correctAnswer: 1,
        explanation: 'Multiplication has higher precedence than addition: 5 + (3 * 2) = 5 + 6 = 11.',
      },
      {
        id: 'final-q2',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `a = "hello"
b = a.upper()
print(a)
print(b)`,
        correctAnswer: 'hello\nHELLO',
        explanation: 'Strings are immutable. upper() returns a new string; the original "a" is unchanged.',
      },
      {
        id: 'final-q3',
        type: 'multiple_choice',
        prompt: 'Which expression evaluates to `True`?',
        options: [
          '"apple" > "banana"',
          '10 == "10"',
          'len("hello") == 5',
          'type(3) == type(3.0)',
        ],
        correctAnswer: 2,
        explanation: '"hello" has 5 characters, so len("hello") == 5 is True. String comparison is lexicographic ("a" < "b"), 10 != "10" (different types), int != float.',
      },
      {
        id: 'final-q4',
        type: 'fill_blank',
        prompt: 'The method to remove whitespace from both ends of a string is called ____.',
        correctAnswer: 'strip',
        explanation: 'str.strip() removes leading and trailing whitespace.',
      },
      {
        id: 'final-q5',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `text = "Python"
print(text[1:4])`,
        correctAnswer: 'yth',
        explanation: 'Slicing [1:4] extracts characters at indices 1, 2, 3: "yth".',
      },
      {
        id: 'final-q6',
        type: 'written',
        prompt: 'Briefly explain the difference between the `==` and `is` operators in Python.',
        correctAnswer: 'value',
        explanation: '`==` compares values (equality), while `is` compares identity (whether two variables refer to the same object in memory).',
        modelAnswer: 'The `==` operator compares values (equality) - it checks whether two objects have the same content or value. The `is` operator compares identity - it checks whether two variables refer to the exact same object in memory. For example, two different lists with the same contents would be equal with `==` but not identical with `is`, because they are separate objects stored at different memory locations.',
      },

      // === Control Flow ===
      {
        id: 'final-q7',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `count = 0
for i in range(5):
    if i % 2 == 0:
        count += 1
print(count)`,
        correctAnswer: '3',
        explanation: 'Even numbers in range(5) are 0, 2, 4 — that\'s 3 numbers.',
      },
      {
        id: 'final-q8',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `i = 0
while i < 5:
    if i == 3:
        break
    print(i, end=" ")
    i += 1`,
        correctAnswer: '0 1 2 ',
        explanation: 'The loop prints 0, 1, 2, then breaks when i equals 3.',
      },
      {
        id: 'final-q9',
        type: 'multiple_choice',
        prompt: 'What does the `continue` statement do inside a loop?',
        options: [
          'Exits the loop entirely',
          'Skips to the next iteration of the loop',
          'Restarts the loop from the beginning',
          'Pauses the loop execution',
        ],
        correctAnswer: 1,
        explanation: '`continue` skips the rest of the current iteration and moves to the next one.',
      },
      {
        id: 'final-q10',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `result = []
for i in range(3):
    for j in range(2):
        result.append((i, j))
print(len(result))`,
        correctAnswer: '6',
        explanation: 'Nested loops: 3 × 2 = 6 tuples are appended.',
      },

      // === Functions ===
      {
        id: 'final-q11',
        type: 'true_false',
        prompt: 'Using a mutable default argument (like a list) in a function can lead to unexpected behavior across multiple calls.',
        correctAnswer: true,
        explanation: 'Default arguments are evaluated once when the function is defined. Mutating them persists across calls.',
      },
      {
        id: 'final-q12',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `def add(a, b=10):
    return a + b

print(add(5))
print(add(5, 3))`,
        correctAnswer: '15\n8',
        explanation: 'First call uses default b=10 (5+10=15). Second call overrides b=3 (5+3=8).',
      },
      {
        id: 'final-q13',
        type: 'multiple_choice',
        prompt: 'What happens if a function does not have a `return` statement?',
        options: [
          'It raises an error',
          'It returns 0',
          'It returns None',
          'It returns an empty string',
        ],
        correctAnswer: 2,
        explanation: 'Functions without an explicit return statement return None by default.',
      },
      {
        id: 'final-q14',
        type: 'coding',
        prompt: 'Implement `count_vowels(s)` that returns how many vowels (a, e, i, o, u) appear in a lowercase string.',
        starterCode: 'def count_vowels(s: str) -> int:\n    # TODO: implement\n    return 0',
        language: 'python',
        solution: 'def count_vowels(s: str) -> int:\n    vowels = "aeiou"\n    count = 0\n    for ch in s:\n        if ch in vowels:\n            count += 1\n    return count',
        testCases: [
          { input: 'count_vowels("hello")', expectedOutput: '2', isHidden: false, description: 'basic case' },
          { input: 'count_vowels("sky")', expectedOutput: '0', isHidden: false, description: 'no vowels' },
          { input: 'count_vowels("aeiou")', expectedOutput: '5', isHidden: false, description: 'all vowels' },
        ],
        correctAnswer: true,
        explanation: 'Iterate through characters and count those that are in the vowel set.',
      },

      // === Lists, Tuples, and Dictionaries ===
      {
        id: 'final-q15',
        type: 'fill_blank',
        prompt: 'The built-in function used to iterate over a list with both index and value is ____.',
        correctAnswer: 'enumerate',
        explanation: 'enumerate() yields (index, value) pairs when iterating.',
      },
      {
        id: 'final-q16',
        type: 'multiple_choice',
        prompt: 'Given `nums = [1, 2, 3, 4]`, what does `[n * n for n in nums if n % 2 == 0]` produce?',
        options: [
          '[1, 4, 9, 16]',
          '[1, 9]',
          '[4, 16]',
          '[2, 4]',
        ],
        correctAnswer: 2,
        explanation: 'The list comprehension squares only even numbers: 2²=4, 4²=16.',
      },
      {
        id: 'final-q17',
        type: 'code_output',
        prompt: 'What does this snippet print?',
        codeSnippet: `items = {"a": 1, "b": 2}
for key, value in items.items():
    print(f"{key}:{value}")`,
        correctAnswer: 'a:1\nb:2',
        explanation: '.items() yields key-value pairs. They print in insertion order.',
      },
      {
        id: 'final-q18',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `def mystery(n):
    total = 0
    for i, ch in enumerate(str(n)):
        if i % 2 == 0:
            total += int(ch)
    return total

print(mystery(12345))`,
        correctAnswer: '9',
        explanation: 'Characters at even indices (0, 2, 4) are "1", "3", "5". Sum: 1+3+5=9.',
      },
      {
        id: 'final-q19',
        type: 'written',
        prompt: 'Name one advantage of using a dictionary over a list when you need to look up values by a key.',
        correctAnswer: 'fast',
        explanation: 'Dictionaries provide fast lookups by key, while lists require scanning through elements.',
        modelAnswer: 'Dictionaries provide fast (constant-time) lookups by key. When you access a value using a key like `my_dict["name"]`, Python can find it almost instantly regardless of how many items are in the dictionary. With a list, you would need to search through each element one by one to find a matching value, which gets slower as the list grows. This makes dictionaries much more efficient for key-based data retrieval.',
      },
      {
        id: 'final-q20',
        type: 'multiple_choice',
        prompt: 'Which of the following creates a tuple with one element?',
        options: ['(1)', '(1,)', '[1]', '{1}'],
        correctAnswer: 1,
        explanation: 'A single-element tuple requires a trailing comma: (1,). Without it, (1) is just the integer 1 in parentheses.',
      },
      {
        id: 'final-q21',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `data = [("alice", 85), ("bob", 92), ("carol", 78)]
data.sort(key=lambda x: x[1])
print(data[0][0])`,
        correctAnswer: 'carol',
        explanation: 'Sorting by the second element (score) in ascending order puts carol (78) first.',
      },
      {
        id: 'final-q22',
        type: 'coding',
        prompt: 'Write `unique_sorted(nums)` that returns a sorted list of unique integers from the input list.',
        starterCode: 'def unique_sorted(nums):\n    # TODO: implement\n    return []',
        language: 'python',
        solution: 'def unique_sorted(nums):\n    return sorted(set(nums))',
        testCases: [
          { input: 'unique_sorted([3, 1, 2, 2, 3])', expectedOutput: '[1, 2, 3]', isHidden: false, description: 'dedupe and sort' },
          { input: 'unique_sorted([])', expectedOutput: '[]', isHidden: false, description: 'empty list' },
          { input: 'unique_sorted([5, -1, 5, 0])', expectedOutput: '[-1, 0, 5]', isHidden: false, description: 'negative numbers' },
        ],
        correctAnswer: true,
        explanation: 'Convert to set to remove duplicates, then sort the result.',
      },

      // === File I/O ===
      {
        id: 'final-q23',
        type: 'true_false',
        prompt: 'Files opened with `with open(...)` are automatically closed when the block exits.',
        correctAnswer: true,
        explanation: 'The context manager (with statement) ensures the file is closed, even if an exception occurs.',
      },
      {
        id: 'final-q24',
        type: 'multiple_choice',
        prompt: 'Which file mode appends to a file without overwriting existing content?',
        options: ['"r"', '"w"', '"a"', '"x"'],
        correctAnswer: 2,
        explanation: '"a" (append) mode adds new content to the end of the file without truncating.',
      },
      {
        id: 'final-q25',
        type: 'multiple_choice',
        prompt: 'What does `file.readlines()` return?',
        options: [
          'A single string with all content',
          'A list of lines from the file',
          'The first line of the file',
          'The number of lines in the file',
        ],
        correctAnswer: 1,
        explanation: 'readlines() returns a list where each element is a line from the file (including newlines).',
      },
      {
        id: 'final-q26',
        type: 'code_output',
        prompt: 'Assuming `data.txt` contains the text "hello\\nworld", what does this code print?',
        codeSnippet: `with open("data.txt", "r") as f:
    lines = f.readlines()
print(len(lines))`,
        correctAnswer: '2',
        explanation: 'The file has two lines ("hello\\n" and "world"), so readlines() returns a list of length 2.',
      },
    ],
  },
];
