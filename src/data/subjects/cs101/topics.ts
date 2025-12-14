import { Topic } from '../../../core/types';

export const cs101Topics: Topic[] = [
  {
    id: 'cs101-topic-1',
    title: 'Variables and Data Types',
    content: 'Variables are containers for storing data values in your programs. In Python, you don\'t need to declare the type of a variable - it\'s determined automatically.\n\nCommon data types include:\n- Integers (int): Whole numbers like 42, -7, 0\n- Floats (float): Decimal numbers like 3.14, -0.5\n- Strings (str): Text enclosed in quotes like "Hello" or \'World\'\n- Booleans (bool): True or False values\n\nYou can create variables using simple assignment:\n  x = 10\n  name = "Alice"\n  pi = 3.14159\n  is_valid = True\n\nPython allows you to check types using type() and convert between types using int(), float(), str(), and bool(). Understanding data types is fundamental to writing correct programs and avoiding errors.',
    quizIds: ['cs101-quiz-1'],
    exerciseIds: ['cs101-exercise-1', 'cs101-t1-ex02', 'cs101-t1-ex03', 'cs101-t1-ex04', 'cs101-t1-ex05', 'cs101-t1-ex06', 'cs101-t1-ex07', 'cs101-t1-ex08']
  },
  {
    id: 'cs101-topic-2',
    title: 'Control Flow (if/else, loops)',
    content: 'Control flow statements let you control the execution path of your program based on conditions.\n\nConditional Statements:\n  if temperature > 30:\n      print("It\'s hot!")\n  elif temperature > 20:\n      print("Nice weather")\n  else:\n      print("It\'s cold")\n\nLoops allow you to repeat code:\n\nFor loops iterate over sequences:\n  for i in range(5):\n      print(i)\n\nWhile loops repeat while a condition is true:\n  count = 0\n  while count < 5:\n      print(count)\n      count += 1\n\nYou can use break to exit loops early and continue to skip to the next iteration. Mastering control flow is essential for creating dynamic, responsive programs that can make decisions and handle repetitive tasks efficiently.',
    quizIds: ['cs101-quiz-2'],
    exerciseIds: ['cs101-exercise-2', 'cs101-t2-ex02', 'cs101-t2-ex03', 'cs101-t2-ex04', 'cs101-t2-ex05', 'cs101-t2-ex06', 'cs101-t2-ex07', 'cs101-t2-ex08', 'cs101-t2-ex09']
  },
  {
    id: 'cs101-topic-3',
    title: 'Functions',
    content: 'Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.\n\nDefining a function:\n  def greet(name):\n      return "Hello, " + name\n\nCalling a function:\n  message = greet("Alice")\n  print(message)\n\nFunctions can have:\n- Parameters: inputs to the function\n- Return values: outputs from the function\n- Default arguments: def greet(name="World")\n- Multiple parameters: def add(a, b)\n\nBest practices:\n- Give functions descriptive names\n- Keep functions focused on one task\n- Use docstrings to document what they do\n- Return values rather than printing when possible\n\nFunctions make your code more modular, testable, and maintainable. They\'re a cornerstone of good programming practice.',
    quizIds: ['cs101-quiz-3'],
    exerciseIds: ['cs101-exercise-3', 'cs101-t3-ex02', 'cs101-t3-ex03', 'cs101-t3-ex04', 'cs101-t3-ex05', 'cs101-t3-ex06', 'cs101-t3-ex07', 'cs101-t3-ex08', 'cs101-t3-ex09']
  },
  {
    id: 'cs101-topic-4',
    title: 'Lists and Dictionaries',
    content: 'Lists and dictionaries are Python\'s most versatile data structures for storing collections of data.\n\nLists are ordered collections:\n  fruits = ["apple", "banana", "cherry"]\n  fruits.append("date")\n  first = fruits[0]\n  fruits[1] = "blueberry"\n\nCommon list operations:\n- len(list): get length\n- list.append(item): add to end\n- list.remove(item): remove first occurrence\n- list.sort(): sort in place\n\nDictionaries store key-value pairs:\n  person = {"name": "Alice", "age": 30, "city": "NYC"}\n  print(person["name"])\n  person["email"] = "alice@example.com"\n\nCommon dictionary operations:\n- dict.keys(): get all keys\n- dict.values(): get all values\n- dict.get(key, default): safe access\n- key in dict: check existence\n\nThese structures are essential for organizing and manipulating data in your programs.',
    quizIds: ['cs101-quiz-4'],
    exerciseIds: ['cs101-exercise-4', 'cs101-t4-ex02', 'cs101-t4-ex03', 'cs101-t4-ex04', 'cs101-t4-ex05', 'cs101-t4-ex06', 'cs101-t4-ex07', 'cs101-t4-ex08', 'cs101-t4-ex09']
  },
  {
    id: 'cs101-topic-5',
    title: 'File I/O',
    content: 'File Input/Output (I/O) allows your programs to read from and write to files, enabling data persistence.\n\nReading files:\n  with open("data.txt", "r") as file:\n      content = file.read()\n      # or read line by line:\n      for line in file:\n          print(line.strip())\n\nWriting files:\n  with open("output.txt", "w") as file:\n      file.write("Hello, World!\\n")\n      file.write("Second line\\n")\n\nFile modes:\n- "r": read (default)\n- "w": write (overwrites existing content)\n- "a": append (adds to end)\n- "r+": read and write\n\nBest practices:\n- Always use "with" statement (automatically closes files)\n- Handle exceptions with try/except\n- Check if files exist before reading\n- Use appropriate file modes\n\nFile I/O is crucial for working with data, configuration files, logs, and creating persistent applications.',
    quizIds: ['cs101-quiz-5'],
    exerciseIds: ['cs101-exercise-5', 'cs101-t5-ex02', 'cs101-t5-ex03', 'cs101-t5-ex04', 'cs101-t5-ex05', 'cs101-t5-ex06', 'cs101-t5-ex07', 'cs101-t5-ex08', 'cs101-t5-ex09']
  }
];
