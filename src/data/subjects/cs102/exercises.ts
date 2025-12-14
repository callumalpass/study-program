import { CodingExercise } from '../../../core/types';

export const cs102Exercises: CodingExercise[] = [
  {
    id: 'cs102-ex-1',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number System Converter',
    description: 'Write a Python function that converts a decimal number to binary, octal, and hexadecimal representations. The function should return a dictionary with the conversions.',
    starterCode: 'def convert_number(decimal_num):\n    """\n    Convert a decimal number to binary, octal, and hexadecimal.\n    \n    Args:\n        decimal_num: An integer in decimal format\n    \n    Returns:\n        A dictionary with keys \'binary\', \'octal\', \'hexadecimal\'\n    """\n    # Your code here\n    pass',
    testCases: [
      {
        input: '26',
        expectedOutput: '{\'binary\': \'11010\', \'octal\': \'32\', \'hexadecimal\': \'1a\'}',
        isHidden: false,
        description: 'Convert decimal 26'
      },
      {
        input: '255',
        expectedOutput: '{\'binary\': \'11111111\', \'octal\': \'377\', \'hexadecimal\': \'ff\'}',
        isHidden: false,
        description: 'Convert decimal 255'
      },
      {
        input: '100',
        expectedOutput: '{\'binary\': \'1100100\', \'octal\': \'144\', \'hexadecimal\': \'64\'}',
        isHidden: true,
        description: 'Convert decimal 100'
      }
    ],
    hints: [
      'Python has built-in functions bin(), oct(), and hex() that can help',
      'Remember to remove the prefix characters (0b, 0o, 0x) from the built-in function outputs',
      'Use string slicing [2:] to remove the first two characters from the output'
    ],
    solution: 'def convert_number(decimal_num):\n    """\n    Convert a decimal number to binary, octal, and hexadecimal.\n    \n    Args:\n        decimal_num: An integer in decimal format\n    \n    Returns:\n        A dictionary with keys \'binary\', \'octal\', \'hexadecimal\'\n    """\n    return {\n        \'binary\': bin(decimal_num)[2:],\n        \'octal\': oct(decimal_num)[2:],\n        \'hexadecimal\': hex(decimal_num)[2:]\n    }',
    language: 'python'
  },
  {
    id: 'cs102-ex-2',
    subjectId: 'cs102',
    topicId: 'cs102-2',
    title: 'Binary Addition Calculator',
    description: 'Implement a function that performs binary addition on two binary strings and returns the result as a binary string. Do not use built-in base conversion functions.',
    starterCode: 'def binary_addition(bin1, bin2):\n    """\n    Add two binary numbers represented as strings.\n    \n    Args:\n        bin1: First binary number as string (e.g., "1011")\n        bin2: Second binary number as string (e.g., "0110")\n    \n    Returns:\n        Sum as binary string\n    """\n    # Your code here\n    pass',
    testCases: [
      {
        input: '"1011", "0110"',
        expectedOutput: '"10001"',
        isHidden: false,
        description: 'Add 1011 + 0110'
      },
      {
        input: '"1111", "1"',
        expectedOutput: '"10000"',
        isHidden: false,
        description: 'Add 1111 + 1'
      },
      {
        input: '"10101", "11011"',
        expectedOutput: '"110000"',
        isHidden: true,
        description: 'Add 10101 + 11011'
      }
    ],
    hints: [
      'Start adding from the rightmost bit (least significant bit)',
      'Keep track of the carry bit as you move left',
      'Pad the shorter string with leading zeros to make both strings equal length',
      'Don\'t forget to add any remaining carry at the end'
    ],
    solution: 'def binary_addition(bin1, bin2):\n    """\n    Add two binary numbers represented as strings.\n    \n    Args:\n        bin1: First binary number as string (e.g., "1011")\n        bin2: Second binary number as string (e.g., "0110")\n    \n    Returns:\n        Sum as binary string\n    """\n    max_len = max(len(bin1), len(bin2))\n    bin1 = bin1.zfill(max_len)\n    bin2 = bin2.zfill(max_len)\n    \n    result = []\n    carry = 0\n    \n    for i in range(max_len - 1, -1, -1):\n        bit_sum = int(bin1[i]) + int(bin2[i]) + carry\n        result.append(str(bit_sum % 2))\n        carry = bit_sum // 2\n    \n    if carry:\n        result.append(\'1\')\n    \n    return \'\'.join(reversed(result))',
    language: 'python'
  },
  {
    id: 'cs102-ex-3',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Character Encoding Explorer',
    description: 'Write a function that takes a string and returns information about its character encoding, including ASCII values for ASCII characters and UTF-8 byte representation.',
    starterCode: 'def analyze_encoding(text):\n    """\n    Analyze character encoding of a string.\n    \n    Args:\n        text: A string to analyze\n    \n    Returns:\n        A list of dictionaries with character info\n    """\n    # Your code here\n    pass',
    testCases: [
      {
        input: '"Hi"',
        expectedOutput: '[{\'char\': \'H\', \'ascii\': 72, \'utf8_bytes\': 1}, {\'char\': \'i\', \'ascii\': 105, \'utf8_bytes\': 1}]',
        isHidden: false,
        description: 'Analyze simple ASCII text'
      },
      {
        input: '"A1"',
        expectedOutput: '[{\'char\': \'A\', \'ascii\': 65, \'utf8_bytes\': 1}, {\'char\': \'1\', \'ascii\': 49, \'utf8_bytes\': 1}]',
        isHidden: false,
        description: 'Analyze alphanumeric characters'
      },
      {
        input: '"!@"',
        expectedOutput: '[{\'char\': \'!\', \'ascii\': 33, \'utf8_bytes\': 1}, {\'char\': \'@\', \'ascii\': 64, \'utf8_bytes\': 1}]',
        isHidden: true,
        description: 'Analyze special characters'
      }
    ],
    hints: [
      'Use the ord() function to get the ASCII/Unicode code point of a character',
      'Use the encode() method with \'utf-8\' to get byte representation',
      'len() on the encoded bytes gives you the number of bytes in UTF-8',
      'All ASCII characters (0-127) are encoded as 1 byte in UTF-8'
    ],
    solution: 'def analyze_encoding(text):\n    """\n    Analyze character encoding of a string.\n    \n    Args:\n        text: A string to analyze\n    \n    Returns:\n        A list of dictionaries with character info\n    """\n    result = []\n    for char in text:\n        result.append({\n            \'char\': char,\n            \'ascii\': ord(char),\n            \'utf8_bytes\': len(char.encode(\'utf-8\'))\n        })\n    return result',
    language: 'python'
  },
  {
    id: 'cs102-ex-4',
    subjectId: 'cs102',
    topicId: 'cs102-4',
    title: 'Boolean Expression Evaluator',
    description: 'Create a function that evaluates simple Boolean expressions with AND, OR, and NOT operations. The function should accept a Boolean expression as a string and a dictionary of variable values.',
    starterCode: 'def evaluate_boolean(expression, variables):\n    """\n    Evaluate a Boolean expression.\n    \n    Args:\n        expression: Boolean expression as string (e.g., "A AND B")\n        variables: Dictionary mapping variable names to boolean values\n    \n    Returns:\n        Boolean result of the expression\n    """\n    # Your code here\n    pass',
    testCases: [
      {
        input: '"A AND B", {\'A\': True, \'B\': True}',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Evaluate AND with both true'
      },
      {
        input: '"A OR B", {\'A\': False, \'B\': True}',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Evaluate OR with one true'
      },
      {
        input: '"NOT A", {\'A\': True}',
        expectedOutput: 'False',
        isHidden: true,
        description: 'Evaluate NOT operation'
      }
    ],
    hints: [
      'Replace variable names in the expression with their values from the dictionary',
      'Python\'s eval() can evaluate Boolean expressions, but be careful with security',
      'You can use string replacement to substitute variable values',
      'Convert boolean values to strings "True" and "False" for replacement'
    ],
    solution: 'def evaluate_boolean(expression, variables):\n    """\n    Evaluate a Boolean expression.\n    \n    Args:\n        expression: Boolean expression as string (e.g., "A AND B")\n        variables: Dictionary mapping variable names to boolean values\n    \n    Returns:\n        Boolean result of the expression\n    """\n    # Replace variable names with their values\n    result_expr = expression\n    for var_name, var_value in variables.items():\n        result_expr = result_expr.replace(var_name, str(var_value))\n    \n    # Use Python\'s built-in boolean operators\n    result_expr = result_expr.replace(\'AND\', \'and\')\n    result_expr = result_expr.replace(\'OR\', \'or\')\n    result_expr = result_expr.replace(\'NOT\', \'not\')\n    \n    return eval(result_expr)',
    language: 'python'
  },
  {
    id: 'cs102-ex-5',
    subjectId: 'cs102',
    topicId: 'cs102-5',
    title: 'Simple CPU Simulator',
    description: 'Implement a simple CPU simulator that can execute basic instructions on a set of registers. Support operations: LOAD (load value to register), ADD (add two registers), and STORE (store register value).',
    starterCode: 'class SimpleCPU:\n    def __init__(self):\n        """\n        Initialize CPU with 4 registers (R0-R3) and memory.\n        """\n        self.registers = {\'R0\': 0, \'R1\': 0, \'R2\': 0, \'R3\': 0}\n        self.memory = {}\n    \n    def execute(self, instruction):\n        """\n        Execute a single instruction.\n        \n        Args:\n            instruction: String like "LOAD R0 5" or "ADD R0 R1 R2"\n        """\n        # Your code here\n        pass\n    \n    def get_register(self, reg_name):\n        """\n        Get the value of a register.\n        """\n        return self.registers.get(reg_name, 0)',
    testCases: [
      {
        input: 'cpu = SimpleCPU(); cpu.execute("LOAD R0 10"); cpu.get_register("R0")',
        expectedOutput: '10',
        isHidden: false,
        description: 'Load value into register'
      },
      {
        input: 'cpu = SimpleCPU(); cpu.execute("LOAD R0 5"); cpu.execute("LOAD R1 3"); cpu.execute("ADD R2 R0 R1"); cpu.get_register("R2")',
        expectedOutput: '8',
        isHidden: false,
        description: 'Add two registers'
      },
      {
        input: 'cpu = SimpleCPU(); cpu.execute("LOAD R0 15"); cpu.execute("LOAD R1 7"); cpu.execute("ADD R2 R0 R1"); cpu.get_register("R2")',
        expectedOutput: '22',
        isHidden: true,
        description: 'Complex addition operation'
      }
    ],
    hints: [
      'Split the instruction string into parts using split()',
      'The first part is the operation, remaining parts are operands',
      'For LOAD, the second part is the register and third is the value',
      'For ADD, second part is destination, third and fourth are source registers'
    ],
    solution: 'class SimpleCPU:\n    def __init__(self):\n        """\n        Initialize CPU with 4 registers (R0-R3) and memory.\n        """\n        self.registers = {\'R0\': 0, \'R1\': 0, \'R2\': 0, \'R3\': 0}\n        self.memory = {}\n    \n    def execute(self, instruction):\n        """\n        Execute a single instruction.\n        \n        Args:\n            instruction: String like "LOAD R0 5" or "ADD R0 R1 R2"\n        """\n        parts = instruction.split()\n        operation = parts[0]\n        \n        if operation == \'LOAD\':\n            reg = parts[1]\n            value = int(parts[2])\n            self.registers[reg] = value\n        elif operation == \'ADD\':\n            dest = parts[1]\n            src1 = parts[2]\n            src2 = parts[3]\n            self.registers[dest] = self.registers[src1] + self.registers[src2]\n        elif operation == \'STORE\':\n            reg = parts[1]\n            addr = int(parts[2])\n            self.memory[addr] = self.registers[reg]\n    \n    def get_register(self, reg_name):\n        """\n        Get the value of a register.\n        """\n        return self.registers.get(reg_name, 0)',
    language: 'python'
  }
];
