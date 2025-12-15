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
    ],
    hints: [
      'Valid digits depend on the base',
      'Base 2: only 0 and 1',
      'Base 16: 0-9 and a-f',
      'Check each character against valid digits for that base'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex09',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Gray Code to Binary',
    difficulty: 3,
    description: 'Write a function that converts an n-bit Gray code string to its binary representation.',
    starterCode: '# Convert Gray code to binary\ndef gray_to_binary(gray_str):\n    # Your code here\n    pass\n\nprint(gray_to_binary(\"1101\"))  # -> 1011',
    solution: 'def gray_to_binary(gray_str):\n    # First bit is the same\n    binary = gray_str[0]\n    for i in range(1, len(gray_str)):\n        # XOR previous binary bit with current gray bit\n        prev_bit = int(binary[-1])\n        gbit = int(gray_str[i])\n        bbit = prev_bit ^ gbit\n        binary += str(bbit)\n    return binary\n\nprint(gray_to_binary(\"1101\"))',
    testCases: [
    ],
    hints: [
      'First binary bit equals first Gray bit.',
      'Each next binary bit = previous binary bit XOR current Gray bit.',
      'Process left to right.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex10',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Binary Fraction to Decimal',
    difficulty: 3,
    description: 'Convert a binary fraction string like "101.101" to its decimal floating value without using float().',
    starterCode: '# Convert binary fraction to decimal\ndef binary_fraction_to_decimal(binary_str):\n    # Your code here\n    pass\n\nprint(binary_fraction_to_decimal(\"101.101\"))  # 5.625',
    solution: 'def binary_fraction_to_decimal(binary_str):\n    if "." in binary_str:\n        int_part, frac_part = binary_str.split(".")\n    else:\n        int_part, frac_part = binary_str, ""\n    # Integer part\n    total = 0\n    for bit in int_part:\n        total = total * 2 + int(bit)\n    # Fractional part\n    power = 0.5\n    for bit in frac_part:\n        if bit == "1":\n            total += power\n        power /= 2\n    return total\n\nprint(binary_fraction_to_decimal(\"101.101\"))',
    testCases: [
    ],
    hints: [
      'Split integer and fractional parts on "."',
      'Left of dot: same as normal binary conversion.',
      'Right of dot: weights are 1/2, 1/4, 1/8, ...'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-drill-1',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Hex Digit to Binary',
    difficulty: 1,
    description: 'Write a function that takes a single hex digit (0-9, A-F) and returns its 4-bit binary string.',
    starterCode: '# Hex digit to binary nibble\ndef hex_digit_to_bin(ch):\n    # Your code here\n    pass\n\nprint(hex_digit_to_bin("A"))  # 1010',
    solution: 'def hex_digit_to_bin(ch):\n    ch = ch.lower()\n    digits = "0123456789abcdef"\n    val = digits.index(ch)\n    return bin(val)[2:].zfill(4)\n\nprint(hex_digit_to_bin("A"))',
    testCases: [
    ],
    hints: [
      'Map hex digit to its value 0–15, then format as 4-bit binary.',
      'Use zfill(4) to pad leading zeros.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-drill-2',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Binary Padding for Hex',
    difficulty: 1,
    description: 'Write a function that pads a binary string to a multiple of 4 bits by adding leading zeros.',
    starterCode: '# Pad binary to nibble boundary\ndef pad_binary(binary_str):\n    # Your code here\n    pass\n\nprint(pad_binary("101"))   # 0101\nprint(pad_binary("10101")) # 00010101',
    solution: 'def pad_binary(binary_str):\n    while len(binary_str) % 4 != 0:\n        binary_str = "0" + binary_str\n    return binary_str\n\nprint(pad_binary("101"))\nprint(pad_binary("10101"))',
    testCases: [
    ],
    hints: [
      'Prepend zeros until length % 4 == 0.',
      'Return the padded string.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex13',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Base-4 Conversion',
    difficulty: 2,
    description: 'Write a function `to_base4(n)` that converts a decimal integer to a base-4 string.',
    starterCode: 'def to_base4(n):\n    # Your code here\n    pass\n\nprint(to_base4(10)) # 22 (2*4 + 2)',
    solution: 'def to_base4(n):\n    if n == 0: return "0"\n    res = ""\n    while n > 0:\n        res = str(n % 4) + res\n        n //= 4\n    return res\n\nprint(to_base4(10))',
    testCases: [],
    hints: ['Repeatedly divide by 4 and take remainders.'],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex14',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Binary Palindrome',
    difficulty: 2,
    description: 'Return True if the binary representation of `n` reads the same forwards and backwards.',
    starterCode: 'def binary_palindrome(n):\n    # Your code here\n    pass\n\nprint(binary_palindrome(9)) # 1001 -> True',
    solution: 'def binary_palindrome(n):\n    b = bin(n)[2:]\n    return b == b[::-1]\n\nprint(binary_palindrome(9))',
    testCases: [],
    hints: ['Convert to binary string.', 'Check if string equals its reverse.'],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex15',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Power of Two Check',
    difficulty: 1,
    description: 'Return True if `n` is a power of two, using bitwise operations (no loops or log).',
    starterCode: 'def is_power_of_two(n):\n    # Your code here\n    pass\n\nprint(is_power_of_two(16)) # True\nprint(is_power_of_two(18)) # False',
    solution: 'def is_power_of_two(n):\n    return n > 0 and (n & (n - 1)) == 0\n\nprint(is_power_of_two(16))',
    testCases: [],
    hints: ['n & (n-1) removes the lowest set bit.', 'If n is a power of two, it has exactly one bit set.'],
    language: 'python'
  },
  {
    id: 'cs102-t1-ex16',
    subjectId: 'cs102',
    topicId: 'cs102-1',
    title: 'Hamming Distance',
    difficulty: 3,
    description: 'Calculate the Hamming distance between two integers `x` and `y` (number of bits that differ).',
    starterCode: 'def hamming_dist(x, y):\n    # Your code here\n    pass\n\nprint(hamming_dist(1, 4)) # 001 vs 100 -> 2 bits differ',
    solution: 'def hamming_dist(x, y):\n    return bin(x ^ y).count("1")\n\nprint(hamming_dist(1, 4))',
    testCases: [],
    hints: ['XOR the numbers.', 'Count the 1s in the result.'],
    language: 'python'
  }
];
