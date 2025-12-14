import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs101-exercise-5',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Line Counter',
    difficulty: 2,
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
  },
  {
    id: 'cs101-t5-ex02',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Read File Contents',
    difficulty: 1,
    description: 'Write a function that reads an entire file and returns its contents as a string. Return an empty string if the file does not exist.',
    starterCode: '# Read entire file contents\ndef read_file(filename):\n    # Your code here\n    pass\n\n# Test your function\nprint(read_file("hello.txt"))',
    solution: 'def read_file(filename):\n    try:\n        with open(filename, "r") as file:\n            return file.read()\n    except FileNotFoundError:\n        return ""\n\nprint(read_file("hello.txt"))',
    testCases: [
      {
        input: '"hello.txt"',
        expectedOutput: 'Hello, World!',
        isHidden: false,
        description: 'Read hello.txt'
      },
      {
        input: '"nonexistent.txt"',
        expectedOutput: '',
        isHidden: true,
        description: 'File not found'
      }
    ],
    hints: [
      'Use open(filename, "r") to open for reading',
      'Use file.read() to get entire contents',
      'Use with statement for automatic file closing',
      'Wrap in try/except to handle missing files'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex03',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Write to File',
    difficulty: 1,
    description: 'Write a function that takes a filename and text, and writes the text to the file. Return True if successful.',
    starterCode: '# Write text to a file\ndef write_file(filename, text):\n    # Your code here\n    pass\n\n# Test your function\nresult = write_file("output.txt", "Hello, File!")\nprint(result)',
    solution: 'def write_file(filename, text):\n    try:\n        with open(filename, "w") as file:\n            file.write(text)\n        return True\n    except:\n        return False\n\nresult = write_file("output.txt", "Hello, File!")\nprint(result)',
    testCases: [
      {
        input: '"output.txt", "Hello"',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Write succeeds'
      }
    ],
    hints: [
      'Use open(filename, "w") to open for writing',
      'Use file.write(text) to write the content',
      '"w" mode will create the file if it does not exist',
      'Return True after successful write'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex04',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Append to File',
    difficulty: 2,
    description: 'Write a function that appends a line to an existing file. The line should end with a newline character.',
    starterCode: '# Append a line to a file\ndef append_line(filename, line):\n    # Your code here\n    pass\n\n# Test your function\nappend_line("log.txt", "New log entry")',
    solution: 'def append_line(filename, line):\n    with open(filename, "a") as file:\n        file.write(line + "\\n")\n\nappend_line("log.txt", "New log entry")',
    testCases: [
      {
        input: '"log.txt", "Entry 1"',
        expectedOutput: '',
        isHidden: false,
        description: 'Append line'
      }
    ],
    hints: [
      'Use open(filename, "a") to open in append mode',
      '"a" mode adds to the end without overwriting',
      'Add "\\n" to the line for a newline',
      'The function does not need to return anything'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex05',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Word Counter',
    difficulty: 2,
    description: 'Write a function that reads a file and returns the total number of words in it. Words are separated by whitespace.',
    starterCode: '# Count words in a file\ndef count_words(filename):\n    # Your code here\n    pass\n\n# Test your function\nprint(count_words("document.txt"))',
    solution: 'def count_words(filename):\n    try:\n        with open(filename, "r") as file:\n            content = file.read()\n            words = content.split()\n            return len(words)\n    except FileNotFoundError:\n        return 0\n\nprint(count_words("document.txt"))',
    testCases: [
      {
        input: '"document.txt"',
        expectedOutput: '10',
        isHidden: false,
        description: 'File with 10 words'
      },
      {
        input: '"empty.txt"',
        expectedOutput: '0',
        isHidden: true,
        description: 'Empty file'
      }
    ],
    hints: [
      'Read the entire file content first',
      'Use .split() to break into words (splits on whitespace)',
      'Count the length of the resulting list',
      'Handle FileNotFoundError'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex06',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Read Lines as List',
    difficulty: 3,
    description: 'Write a function that reads a file and returns a list of lines with whitespace stripped from each line.',
    starterCode: '# Read file lines as clean list\ndef read_lines(filename):\n    # Your code here\n    pass\n\n# Test your function\nprint(read_lines("data.txt"))',
    solution: 'def read_lines(filename):\n    try:\n        with open(filename, "r") as file:\n            lines = []\n            for line in file:\n                lines.append(line.strip())\n            return lines\n    except FileNotFoundError:\n        return []\n\nprint(read_lines("data.txt"))',
    testCases: [
      {
        input: '"data.txt"',
        expectedOutput: "['line1', 'line2', 'line3']",
        isHidden: false,
        description: 'Read and strip lines'
      },
      {
        input: '"nonexistent.txt"',
        expectedOutput: '[]',
        isHidden: true,
        description: 'File not found'
      }
    ],
    hints: [
      'Use a for loop to iterate over lines in file',
      'Use .strip() to remove leading/trailing whitespace',
      'Build a list of cleaned lines',
      'Handle FileNotFoundError by returning empty list'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex07',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'CSV Reader',
    difficulty: 3,
    description: 'Write a function that reads a simple CSV file and returns a list of dictionaries. The first line contains headers.',
    starterCode: '# Read CSV file to list of dictionaries\ndef read_csv(filename):\n    # Your code here\n    pass\n\n# Test with file containing:\n# name,age,city\n# Alice,30,NYC\n# Bob,25,LA\nprint(read_csv("people.csv"))',
    solution: 'def read_csv(filename):\n    try:\n        with open(filename, "r") as file:\n            lines = file.readlines()\n            if not lines:\n                return []\n            \n            headers = lines[0].strip().split(",")\n            result = []\n            \n            for line in lines[1:]:\n                values = line.strip().split(",")\n                row = {}\n                for i, header in enumerate(headers):\n                    row[header] = values[i] if i < len(values) else ""\n                result.append(row)\n            \n            return result\n    except FileNotFoundError:\n        return []\n\nprint(read_csv("people.csv"))',
    testCases: [
      {
        input: '"people.csv"',
        expectedOutput: "[{'name': 'Alice', 'age': '30', 'city': 'NYC'}, {'name': 'Bob', 'age': '25', 'city': 'LA'}]",
        isHidden: false,
        description: 'Read CSV with 2 rows'
      }
    ],
    hints: [
      'First line contains column headers',
      'Split each line by comma',
      'Create a dictionary for each data row',
      'Map headers to values by index'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex08',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Find and Replace in File',
    difficulty: 4,
    description: 'Write a function that reads a file, replaces all occurrences of a string with another, and writes the result back to the file.',
    starterCode: '# Find and replace in file\ndef find_replace(filename, old, new):\n    # Your code here\n    pass\n\n# Test your function\nfind_replace("document.txt", "hello", "goodbye")',
    solution: 'def find_replace(filename, old, new):\n    try:\n        with open(filename, "r") as file:\n            content = file.read()\n        \n        content = content.replace(old, new)\n        \n        with open(filename, "w") as file:\n            file.write(content)\n        \n        return True\n    except FileNotFoundError:\n        return False\n\nfind_replace("document.txt", "hello", "goodbye")',
    testCases: [
      {
        input: '"test.txt", "old", "new"',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Replace succeeds'
      }
    ],
    hints: [
      'First read the entire file content',
      'Use .replace(old, new) on the content string',
      'Write the modified content back to the file',
      'Handle the case where file does not exist'
    ],
    language: 'python'
  },
  {
    id: 'cs101-t5-ex09',
    subjectId: 'cs101',
    topicId: 'cs101-topic-5',
    title: 'Merge Files',
    difficulty: 5,
    description: 'Write a function that takes a list of filenames and an output filename, and merges all input files into the output file with a blank line between each file\'s content.',
    starterCode: '# Merge multiple files into one\ndef merge_files(input_files, output_file):\n    # Your code here\n    pass\n\n# Test your function\nmerge_files(["file1.txt", "file2.txt", "file3.txt"], "merged.txt")',
    solution: 'def merge_files(input_files, output_file):\n    contents = []\n    \n    for filename in input_files:\n        try:\n            with open(filename, "r") as file:\n                contents.append(file.read())\n        except FileNotFoundError:\n            contents.append(f"[File not found: {filename}]")\n    \n    merged = "\\n\\n".join(contents)\n    \n    with open(output_file, "w") as file:\n        file.write(merged)\n\nmerge_files(["file1.txt", "file2.txt", "file3.txt"], "merged.txt")',
    testCases: [
      {
        input: '["a.txt", "b.txt"], "out.txt"',
        expectedOutput: '',
        isHidden: false,
        description: 'Merge two files'
      }
    ],
    hints: [
      'Loop through each input file and read its content',
      'Store contents in a list',
      'Join contents with double newline between them',
      'Write the merged content to the output file',
      'Handle missing files gracefully'
    ],
    language: 'python'
  }
];
