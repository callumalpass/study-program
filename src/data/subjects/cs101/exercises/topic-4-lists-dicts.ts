import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs101-exercise-4',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Word Frequency Counter',
    difficulty: 3,
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
    id: 'cs101-t4-ex02',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'List Sum',
    difficulty: 1,
    description: 'Write a function that takes a list of numbers and returns their sum. Do not use the built-in sum() function.',
    starterCode: '# Sum all numbers in a list\ndef list_sum(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(list_sum([1, 2, 3, 4, 5]))\nprint(list_sum([10, -5, 3]))',
    solution: 'def list_sum(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total\n\nprint(list_sum([1, 2, 3, 4, 5]))\nprint(list_sum([10, -5, 3]))',
    testCases: [
      {
        input: '[1, 2, 3, 4, 5]',
        expectedOutput: '15',
        isHidden: false,
        description: 'Sum positive numbers'
      },
      {
        input: '[10, -5, 3]',
        expectedOutput: '8',
        isHidden: false,
        description: 'Sum with negative'
      },
      {
        input: '[]',
        expectedOutput: '0',
        isHidden: true,
        description: 'Empty list'
      }
    ],
    hints: [
      'Initialize a total variable to 0',
      'Loop through each number in the list',
      'Add each number to the total',
      'Return the total at the end'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex03',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Get Dictionary Value',
    difficulty: 1,
    description: 'Write a function that safely gets a value from a dictionary. If the key does not exist, return a default value.',
    starterCode: '# Safely get value from dictionary with default\ndef safe_get(dictionary, key, default=None):\n    # Your code here\n    pass\n\n# Test your function\ndata = {"name": "Alice", "age": 30}\nprint(safe_get(data, "name"))\nprint(safe_get(data, "email", "not found"))',
    solution: 'def safe_get(dictionary, key, default=None):\n    if key in dictionary:\n        return dictionary[key]\n    return default\n\ndata = {"name": "Alice", "age": 30}\nprint(safe_get(data, "name"))\nprint(safe_get(data, "email", "not found"))',
    testCases: [
      {
        input: '{"name": "Alice"}, "name"',
        expectedOutput: 'Alice',
        isHidden: false,
        description: 'Key exists'
      },
      {
        input: '{"name": "Alice"}, "email", "not found"',
        expectedOutput: 'not found',
        isHidden: false,
        description: 'Key missing with default'
      },
      {
        input: '{}, "key"',
        expectedOutput: 'None',
        isHidden: true,
        description: 'Empty dictionary'
      }
    ],
    hints: [
      'Use "key in dictionary" to check if key exists',
      'Return the value if found, otherwise return default',
      'Python dictionaries have a built-in .get() method that does this'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex04',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Reverse a List',
    difficulty: 2,
    description: 'Write a function that returns a new list with elements in reverse order. Do not use the built-in reverse() method or slicing.',
    starterCode: '# Reverse a list\ndef reverse_list(items):\n    # Your code here\n    pass\n\n# Test your function\nprint(reverse_list([1, 2, 3, 4, 5]))\nprint(reverse_list(["a", "b", "c"]))',
    solution: 'def reverse_list(items):\n    result = []\n    for i in range(len(items) - 1, -1, -1):\n        result.append(items[i])\n    return result\n\nprint(reverse_list([1, 2, 3, 4, 5]))\nprint(reverse_list(["a", "b", "c"]))',
    testCases: [
      {
        input: '[1, 2, 3, 4, 5]',
        expectedOutput: '[5, 4, 3, 2, 1]',
        isHidden: false,
        description: 'Reverse numbers'
      },
      {
        input: '["a", "b", "c"]',
        expectedOutput: "['c', 'b', 'a']",
        isHidden: false,
        description: 'Reverse strings'
      },
      {
        input: '[1]',
        expectedOutput: '[1]',
        isHidden: true,
        description: 'Single element'
      }
    ],
    hints: [
      'Create a new empty list for the result',
      'Loop from the end to the beginning',
      'Use range(len(items) - 1, -1, -1) to iterate backwards',
      'Append each element to the result list'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex05',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Merge Dictionaries',
    difficulty: 2,
    description: 'Write a function that merges two dictionaries. If a key exists in both, use the value from the second dictionary.',
    starterCode: '# Merge two dictionaries\ndef merge_dicts(dict1, dict2):\n    # Your code here\n    pass\n\n# Test your function\na = {"x": 1, "y": 2}\nb = {"y": 3, "z": 4}\nprint(merge_dicts(a, b))',
    solution: 'def merge_dicts(dict1, dict2):\n    result = {}\n    for key in dict1:\n        result[key] = dict1[key]\n    for key in dict2:\n        result[key] = dict2[key]\n    return result\n\na = {"x": 1, "y": 2}\nb = {"y": 3, "z": 4}\nprint(merge_dicts(a, b))',
    testCases: [
      {
        input: '{"x": 1, "y": 2}, {"y": 3, "z": 4}',
        expectedOutput: "{'x': 1, 'y': 3, 'z': 4}",
        isHidden: false,
        description: 'Merge with overlap'
      },
      {
        input: '{"a": 1}, {"b": 2}',
        expectedOutput: "{'a': 1, 'b': 2}",
        isHidden: false,
        description: 'No overlap'
      },
      {
        input: '{}, {"x": 1}',
        expectedOutput: "{'x': 1}",
        isHidden: true,
        description: 'Empty first dict'
      }
    ],
    hints: [
      'Create a new empty dictionary for the result',
      'Copy all key-value pairs from dict1 first',
      'Then copy all from dict2 (overwriting any duplicates)',
      'Python 3.9+ supports dict1 | dict2 for this'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex06',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Filter Even Numbers',
    difficulty: 3,
    description: 'Write a function that takes a list of numbers and returns a new list containing only the even numbers.',
    starterCode: '# Filter to keep only even numbers\ndef filter_even(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(filter_even([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))\nprint(filter_even([1, 3, 5, 7]))',
    solution: 'def filter_even(numbers):\n    result = []\n    for num in numbers:\n        if num % 2 == 0:\n            result.append(num)\n    return result\n\nprint(filter_even([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))\nprint(filter_even([1, 3, 5, 7]))',
    testCases: [
      {
        input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
        expectedOutput: '[2, 4, 6, 8, 10]',
        isHidden: false,
        description: 'Mixed numbers'
      },
      {
        input: '[1, 3, 5, 7]',
        expectedOutput: '[]',
        isHidden: false,
        description: 'All odd numbers'
      },
      {
        input: '[0, 2, 4]',
        expectedOutput: '[0, 2, 4]',
        isHidden: true,
        description: 'All even including zero'
      }
    ],
    hints: [
      'Create an empty result list',
      'Loop through each number',
      'Check if number % 2 == 0 (even)',
      'Append even numbers to result'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex07',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Invert Dictionary',
    difficulty: 3,
    description: 'Write a function that inverts a dictionary, swapping keys and values. Assume all values are unique and hashable.',
    starterCode: '# Invert a dictionary (swap keys and values)\ndef invert_dict(d):\n    # Your code here\n    pass\n\n# Test your function\nprint(invert_dict({"a": 1, "b": 2, "c": 3}))\nprint(invert_dict({1: "one", 2: "two"}))',
    solution: 'def invert_dict(d):\n    result = {}\n    for key, value in d.items():\n        result[value] = key\n    return result\n\nprint(invert_dict({"a": 1, "b": 2, "c": 3}))\nprint(invert_dict({1: "one", 2: "two"}))',
    testCases: [
      {
        input: '{"a": 1, "b": 2, "c": 3}',
        expectedOutput: "{1: 'a', 2: 'b', 3: 'c'}",
        isHidden: false,
        description: 'String keys to int'
      },
      {
        input: '{1: "one", 2: "two"}',
        expectedOutput: "{'one': 1, 'two': 2}",
        isHidden: false,
        description: 'Int keys to string'
      },
      {
        input: '{}',
        expectedOutput: '{}',
        isHidden: true,
        description: 'Empty dictionary'
      }
    ],
    hints: [
      'Use .items() to get key-value pairs',
      'Create a new dictionary with value as key and key as value',
      'Loop through all items and build the inverted dict'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex08',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Group by First Letter',
    difficulty: 4,
    description: 'Write a function that takes a list of words and returns a dictionary grouping them by their first letter (lowercase).',
    starterCode: '# Group words by first letter\ndef group_by_first_letter(words):\n    # Your code here\n    pass\n\n# Test your function\nprint(group_by_first_letter(["apple", "banana", "apricot", "cherry", "blueberry"]))',
    solution: 'def group_by_first_letter(words):\n    groups = {}\n    for word in words:\n        first = word[0].lower()\n        if first not in groups:\n            groups[first] = []\n        groups[first].append(word)\n    return groups\n\nprint(group_by_first_letter(["apple", "banana", "apricot", "cherry", "blueberry"]))',
    testCases: [
      {
        input: '["apple", "banana", "apricot", "cherry", "blueberry"]',
        expectedOutput: "{'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}",
        isHidden: false,
        description: 'Group fruits'
      },
      {
        input: '["one", "two", "three"]',
        expectedOutput: "{'o': ['one'], 't': ['two', 'three']}",
        isHidden: true,
        description: 'Group numbers'
      }
    ],
    hints: [
      'Get first letter with word[0].lower()',
      'Check if the letter key exists in dictionary',
      'Initialize with empty list if not exists',
      'Append word to the appropriate list'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t4-ex09',
    subjectId: 'cs101',
    topicId: 'cs101-topic-4',
    title: 'Nested Dictionary Access',
    difficulty: 5,
    description: 'Write a function that safely accesses nested dictionary values using a list of keys. Return None if any key in the path does not exist.',
    starterCode: '# Safely access nested dictionary values\ndef deep_get(d, keys):\n    # Your code here\n    pass\n\n# Test your function\ndata = {\n    "user": {\n        "profile": {\n            "name": "Alice",\n            "age": 30\n        }\n    }\n}\nprint(deep_get(data, ["user", "profile", "name"]))\nprint(deep_get(data, ["user", "settings", "theme"]))',
    solution: 'def deep_get(d, keys):\n    current = d\n    for key in keys:\n        if isinstance(current, dict) and key in current:\n            current = current[key]\n        else:\n            return None\n    return current\n\ndata = {\n    "user": {\n        "profile": {\n            "name": "Alice",\n            "age": 30\n        }\n    }\n}\nprint(deep_get(data, ["user", "profile", "name"]))\nprint(deep_get(data, ["user", "settings", "theme"]))',
    testCases: [
      {
        input: '{"a": {"b": {"c": 1}}}, ["a", "b", "c"]',
        expectedOutput: '1',
        isHidden: false,
        description: 'Deep access success'
      },
      {
        input: '{"a": {"b": 2}}, ["a", "x"]',
        expectedOutput: 'None',
        isHidden: false,
        description: 'Missing key'
      },
      {
        input: '{}, ["a"]',
        expectedOutput: 'None',
        isHidden: true,
        description: 'Empty dictionary'
      }
    ],
    hints: [
      'Start with the original dictionary as current',
      'For each key in keys, try to access the next level',
      'Check if current is a dict and key exists before accessing',
      'Return None if any access fails'
    ],
    language: 'python'
  }
];
