import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs102-ex-1',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number System Converter',
    difficulty: 2,
    description: 'Write a Python function that converts a decimal number to binary, octal, and hexadecimal representations. The function should return a dictionary with the conversions.',
    starterCode: 'def convert_number(decimal_num):\n    """\n    Convert a decimal number to binary, octal, and hexadecimal.\n    \n    Args:\n        decimal_num: An integer in decimal format\n    \n    Returns:\n        A dictionary with keys \'binary\', \'octal\', \'hexadecimal\'\n    """\n    # Your code here\n    pass',
    testCases: [
      { input: '26', expectedOutput: '{\'binary\': \'11010\', \'octal\': \'32\', \'hexadecimal\': \'1a\'}', isHidden: false, description: 'Convert decimal 26' },
      { input: '255', expectedOutput: '{\'binary\': \'11111111\', \'octal\': \'377\', \'hexadecimal\': \'ff\'}', isHidden: false, description: 'Convert decimal 255' },
      { input: '100', expectedOutput: '{\'binary\': \'1100100\', \'octal\': \'144\', \'hexadecimal\': \'64\'}', isHidden: true, description: 'Convert decimal 100' }
    ],
    hints: [
      'Python has built-in functions bin(), oct(), and hex() that can help',
      'Remember to remove the prefix characters (0b, 0o, 0x) from the built-in function outputs',
      'Use string slicing [2:] to remove the first two characters from the output'
    ],
    solution: 'def convert_number(decimal_num):\n    return {\n        \'binary\': bin(decimal_num)[2:],\n        \'octal\': oct(decimal_num)[2:],\n        \'hexadecimal\': hex(decimal_num)[2:]\n    }',
    language: 'python'
  },
  {
    id: 'cs102-t1-ex02',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Binary to Decimal',
    difficulty: 1,
    description: 'Write a function that converts a binary string to its decimal equivalent without using int() with base parameter.',
    starterCode: '# Convert binary string to decimal\ndef binary_to_decimal(binary_str):\n    # Your code here\n    pass\n\nprint(binary_to_decimal("1011"))\nprint(binary_to_decimal("11111111"))',
    solution: 'def binary_to_decimal(binary_str):\n    result = 0\n    power = 0\n    for bit in reversed(binary_str):\n        if bit == "1":\n            result += 2 ** power\n        power += 1\n    return result\n\nprint(binary_to_decimal("1011"))\nprint(binary_to_decimal("11111111"))',
    testCases: [
      { input: '"1011"', expectedOutput: '11', isHidden: false, description: 'Binary 1011 = 11' },
      { input: '"11111111"', expectedOutput: '255', isHidden: false, description: 'Binary 11111111 = 255' },
      { input: '"1"', expectedOutput: '1', isHidden: true, description: 'Single bit' }
    ],
    hints: [
      'Start from the rightmost bit (least significant)',
      'Each bit position represents a power of 2',
      'Multiply each bit by 2^position and sum'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex03',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Decimal to Binary',
    difficulty: 1,
    description: 'Write a function that converts a decimal number to binary string without using bin().',
    starterCode: '# Convert decimal to binary string\ndef decimal_to_binary(n):\n    # Your code here\n    pass\n\nprint(decimal_to_binary(11))\nprint(decimal_to_binary(255))',
    solution: 'def decimal_to_binary(n):\n    if n == 0:\n        return "0"\n    result = ""\n    while n > 0:\n        result = str(n % 2) + result\n        n = n // 2\n    return result\n\nprint(decimal_to_binary(11))\nprint(decimal_to_binary(255))',
    testCases: [
      { input: '11', expectedOutput: '1011', isHidden: false, description: '11 = 1011' },
      { input: '255', expectedOutput: '11111111', isHidden: false, description: '255 = 11111111' },
      { input: '0', expectedOutput: '0', isHidden: true, description: '0 = 0' }
    ],
    hints: [
      'Repeatedly divide by 2 and collect remainders',
      'The remainders form the binary number (in reverse order)',
      'Handle the special case of 0'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex04',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Hex to Decimal',
    difficulty: 2,
    description: 'Write a function that converts a hexadecimal string to decimal without using int() with base parameter.',
    starterCode: '# Convert hexadecimal string to decimal\ndef hex_to_decimal(hex_str):\n    # Your code here\n    pass\n\nprint(hex_to_decimal("1A"))\nprint(hex_to_decimal("FF"))',
    solution: 'def hex_to_decimal(hex_str):\n    hex_chars = "0123456789ABCDEF"\n    result = 0\n    for char in hex_str.upper():\n        result = result * 16 + hex_chars.index(char)\n    return result\n\nprint(hex_to_decimal("1A"))\nprint(hex_to_decimal("FF"))',
    testCases: [
      { input: '"1A"', expectedOutput: '26', isHidden: false, description: '1A hex = 26' },
      { input: '"FF"', expectedOutput: '255', isHidden: false, description: 'FF hex = 255' },
      { input: '"100"', expectedOutput: '256', isHidden: true, description: '100 hex = 256' }
    ],
    hints: [
      'A-F represent values 10-15',
      'Each position is a power of 16',
      'Process from left to right, multiplying running total by 16'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex05',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Binary to Hexadecimal',
    difficulty: 2,
    description: 'Write a function that converts a binary string directly to hexadecimal. Group binary digits into sets of 4.',
    starterCode: '# Convert binary to hexadecimal\ndef binary_to_hex(binary_str):\n    # Your code here\n    pass\n\nprint(binary_to_hex("11010"))\nprint(binary_to_hex("11111111"))',
    solution: 'def binary_to_hex(binary_str):\n    hex_chars = "0123456789abcdef"\n    # Pad to multiple of 4\n    while len(binary_str) % 4 != 0:\n        binary_str = "0" + binary_str\n    \n    result = ""\n    for i in range(0, len(binary_str), 4):\n        group = binary_str[i:i+4]\n        value = int(group[0])*8 + int(group[1])*4 + int(group[2])*2 + int(group[3])*1\n        result += hex_chars[value]\n    return result\n\nprint(binary_to_hex("11010"))\nprint(binary_to_hex("11111111"))',
    testCases: [
      { input: '"11010"', expectedOutput: '1a', isHidden: false, description: 'Binary 11010 = 1A hex' },
      { input: '"11111111"', expectedOutput: 'ff', isHidden: false, description: 'Binary 11111111 = FF hex' },
      { input: '"1111"', expectedOutput: 'f', isHidden: true, description: 'Binary 1111 = F hex' }
    ],
    hints: [
      'Each hex digit represents exactly 4 binary bits',
      'Pad the binary string to a multiple of 4 bits',
      'Convert each group of 4 bits to a hex character'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex06',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Base Converter',
    difficulty: 3,
    description: 'Write a function that converts a number from any base (2-16) to any other base (2-16).',
    starterCode: '# Convert between any bases (2-16)\ndef convert_base(number_str, from_base, to_base):\n    # Your code here\n    pass\n\nprint(convert_base("1011", 2, 10))  # Binary to decimal\nprint(convert_base("255", 10, 16))  # Decimal to hex',
    solution: 'def convert_base(number_str, from_base, to_base):\n    chars = "0123456789abcdef"\n    # Convert to decimal first\n    decimal = 0\n    for char in number_str.lower():\n        decimal = decimal * from_base + chars.index(char)\n    \n    # Convert from decimal to target base\n    if decimal == 0:\n        return "0"\n    result = ""\n    while decimal > 0:\n        result = chars[decimal % to_base] + result\n        decimal = decimal // to_base\n    return result\n\nprint(convert_base("1011", 2, 10))\nprint(convert_base("255", 10, 16))',
    testCases: [
      { input: '"1011", 2, 10', expectedOutput: '11', isHidden: false, description: 'Binary to decimal' },
      { input: '"255", 10, 16', expectedOutput: 'ff', isHidden: false, description: 'Decimal to hex' },
      { input: '"ff", 16, 2', expectedOutput: '11111111', isHidden: true, description: 'Hex to binary' }
    ],
    hints: [
      'First convert to decimal as an intermediate step',
      'Then convert from decimal to the target base',
      'Use a character string for digits 0-9 and a-f'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex07',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Octal Operations',
    difficulty: 3,
    description: 'Write functions to convert between octal and other bases. Implement octal_to_decimal and decimal_to_octal.',
    starterCode: '# Octal conversions\ndef octal_to_decimal(octal_str):\n    # Your code here\n    pass\n\ndef decimal_to_octal(n):\n    # Your code here\n    pass\n\nprint(octal_to_decimal("77"))\nprint(decimal_to_octal(63))',
    solution: 'def octal_to_decimal(octal_str):\n    result = 0\n    for digit in octal_str:\n        result = result * 8 + int(digit)\n    return result\n\ndef decimal_to_octal(n):\n    if n == 0:\n        return "0"\n    result = ""\n    while n > 0:\n        result = str(n % 8) + result\n        n = n // 8\n    return result\n\nprint(octal_to_decimal("77"))\nprint(decimal_to_octal(63))',
    testCases: [
      { input: 'octal_to_decimal("77")', expectedOutput: '63', isHidden: false, description: 'Octal 77 = 63' },
      { input: 'decimal_to_octal(63)', expectedOutput: '77', isHidden: false, description: '63 = Octal 77' },
      { input: 'octal_to_decimal("100")', expectedOutput: '64', isHidden: true, description: 'Octal 100 = 64' }
    ],
    hints: [
      'Octal uses base 8 (digits 0-7)',
      'Each position is a power of 8',
      'Similar algorithms to binary conversion, but with 8 instead of 2'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex08',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Number System Validator',
    difficulty: 4,
    description: 'Write a function that validates whether a string is a valid representation in a given base. Return True if valid, False otherwise.',
    starterCode: '# Validate number in given base\ndef is_valid_number(number_str, base):\n    # Your code here\n    pass\n\nprint(is_valid_number("1011", 2))   # True\nprint(is_valid_number("123", 2))    # False (3 not valid in binary)\nprint(is_valid_number("1G", 16))    # False (G not valid in hex)',
    solution: 'def is_valid_number(number_str, base):\n    valid_chars = "0123456789abcdef"[:base]\n    for char in number_str.lower():\n        if char not in valid_chars:\n            return False\n    return len(number_str) > 0\n\nprint(is_valid_number("1011", 2))\nprint(is_valid_number("123", 2))\nprint(is_valid_number("1G", 16))',
    testCases: [
      { input: '"1011", 2', expectedOutput: 'True', isHidden: false, description: 'Valid binary' },
      { input: '"123", 2', expectedOutput: 'False', isHidden: false, description: 'Invalid binary' },
      { input: '"1G", 16', expectedOutput: 'False', isHidden: true, description: 'Invalid hex' }
    ],
    hints: [
      'Valid digits depend on the base',
      'Base 2: only 0 and 1',
      'Base 16: 0-9 and a-f',
      'Check each character against valid digits for that base'
    ],
    language: 'python'
  }
];
