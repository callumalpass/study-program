import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID for backward compatibility
  {
    id: 'cs102-ex-3',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Character Encoding Explorer',
    difficulty: 2,
    description: 'Write a function that takes a string and returns information about its character encoding, including ASCII values for ASCII characters and UTF-8 byte representation.',
    starterCode: 'def analyze_encoding(text):\n    """\n    Analyze character encoding of a string.\n    \n    Args:\n        text: A string to analyze\n    \n    Returns:\n        A list of dictionaries with character info\n    """\n    # Your code here\n    pass',
    testCases: [
      { input: '"Hi"', expectedOutput: '[{\'char\': \'H\', \'ascii\': 72, \'utf8_bytes\': 1}, {\'char\': \'i\', \'ascii\': 105, \'utf8_bytes\': 1}]', isHidden: false, description: 'Analyze simple ASCII text' },
      { input: '"A1"', expectedOutput: '[{\'char\': \'A\', \'ascii\': 65, \'utf8_bytes\': 1}, {\'char\': \'1\', \'ascii\': 49, \'utf8_bytes\': 1}]', isHidden: false, description: 'Analyze alphanumeric characters' },
      { input: '"!@"', expectedOutput: '[{\'char\': \'!\', \'ascii\': 33, \'utf8_bytes\': 1}, {\'char\': \'@\', \'ascii\': 64, \'utf8_bytes\': 1}]', isHidden: true, description: 'Analyze special characters' }
    ],
    hints: [
      'Use the ord() function to get the ASCII/Unicode code point of a character',
      'Use the encode() method with \'utf-8\' to get byte representation',
      'len() on the encoded bytes gives you the number of bytes in UTF-8'
    ],
    solution: 'def analyze_encoding(text):\n    result = []\n    for char in text:\n        result.append({\n            \'char\': char,\n            \'ascii\': ord(char),\n            \'utf8_bytes\': len(char.encode(\'utf-8\'))\n        })\n    return result',
    language: 'python'
  },
  {
    id: 'cs102-t3-ex02',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'ASCII Table Lookup',
    difficulty: 1,
    description: 'Write a function that takes a character and returns its ASCII code, and another that takes a code and returns the character.',
    starterCode: '# ASCII conversions\ndef char_to_ascii(char):\n    # Your code here\n    pass\n\ndef ascii_to_char(code):\n    # Your code here\n    pass\n\nprint(char_to_ascii("A"))\nprint(ascii_to_char(65))',
    solution: 'def char_to_ascii(char):\n    return ord(char)\n\ndef ascii_to_char(code):\n    return chr(code)\n\nprint(char_to_ascii("A"))\nprint(ascii_to_char(65))',
    testCases: [
      { input: 'char_to_ascii("A")', expectedOutput: '65', isHidden: false, description: 'A = 65' },
      { input: 'ascii_to_char(65)', expectedOutput: 'A', isHidden: false, description: '65 = A' },
      { input: 'char_to_ascii("0")', expectedOutput: '48', isHidden: true, description: '0 = 48' }
    ],
    hints: [
      'ord() converts a character to its ASCII/Unicode value',
      'chr() converts an ASCII/Unicode value to a character'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex03',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Integer Range Calculator',
    difficulty: 1,
    description: 'Write a function that calculates the range of values for n-bit unsigned and signed integers.',
    starterCode: '# Calculate integer ranges for n bits\ndef integer_range(n_bits):\n    # Returns dict with unsigned_min, unsigned_max, signed_min, signed_max\n    # Your code here\n    pass\n\nprint(integer_range(8))\nprint(integer_range(16))',
    solution: 'def integer_range(n_bits):\n    return {\n        "unsigned_min": 0,\n        "unsigned_max": 2**n_bits - 1,\n        "signed_min": -(2**(n_bits-1)),\n        "signed_max": 2**(n_bits-1) - 1\n    }\n\nprint(integer_range(8))\nprint(integer_range(16))',
    testCases: [
      { input: 'integer_range(8)', expectedOutput: "{'unsigned_min': 0, 'unsigned_max': 255, 'signed_min': -128, 'signed_max': 127}", isHidden: false, description: '8-bit ranges' },
      { input: 'integer_range(16)', expectedOutput: "{'unsigned_min': 0, 'unsigned_max': 65535, 'signed_min': -32768, 'signed_max': 32767}", isHidden: true, description: '16-bit ranges' }
    ],
    hints: [
      'Unsigned range: 0 to 2^n - 1',
      'Signed range: -2^(n-1) to 2^(n-1) - 1',
      'Use ** for exponentiation'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex04',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Float to Binary',
    difficulty: 3,
    description: 'Write a function that shows how a simple positive float is represented as a 32-bit IEEE 754 number. Return sign, exponent (8 bits), and mantissa (23 bits).',
    starterCode: '# Show IEEE 754 representation of a float\ndef float_to_ieee754(f):\n    # Return dict with sign, exponent, mantissa as binary strings\n    # Your code here\n    pass\n\nprint(float_to_ieee754(5.5))',
    solution: 'import struct\n\ndef float_to_ieee754(f):\n    # Pack float as bytes, unpack as integer\n    packed = struct.pack(">f", f)\n    integer = struct.unpack(">I", packed)[0]\n    \n    binary = bin(integer)[2:].zfill(32)\n    \n    return {\n        "sign": binary[0],\n        "exponent": binary[1:9],\n        "mantissa": binary[9:]\n    }\n\nprint(float_to_ieee754(5.5))',
    testCases: [
      { input: 'float_to_ieee754(1.0)', expectedOutput: "{'sign': '0', 'exponent': '01111111', 'mantissa': '00000000000000000000000'}", isHidden: false, description: '1.0 representation' },
      { input: 'float_to_ieee754(-1.0)', expectedOutput: "{'sign': '1', 'exponent': '01111111', 'mantissa': '00000000000000000000000'}", isHidden: true, description: '-1.0 representation' }
    ],
    hints: [
      'IEEE 754: 1 sign bit + 8 exponent bits + 23 mantissa bits',
      'Use struct module to get raw bytes',
      'Sign bit: 0 for positive, 1 for negative'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex05',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Byte Order Converter',
    difficulty: 2,
    description: 'Write functions to convert between big-endian and little-endian byte order for a 32-bit integer represented as hex.',
    starterCode: '# Convert byte order\ndef swap_endian(hex_str):\n    # Input: "12345678" (big-endian)\n    # Output: "78563412" (little-endian) or vice versa\n    # Your code here\n    pass\n\nprint(swap_endian("12345678"))\nprint(swap_endian("78563412"))',
    solution: 'def swap_endian(hex_str):\n    # Split into bytes (pairs of hex digits)\n    hex_str = hex_str.zfill(8)  # Ensure 4 bytes\n    bytes_list = [hex_str[i:i+2] for i in range(0, 8, 2)]\n    # Reverse byte order\n    return "".join(reversed(bytes_list))\n\nprint(swap_endian("12345678"))\nprint(swap_endian("78563412"))',
    testCases: [
      { input: '"12345678"', expectedOutput: '78563412', isHidden: false, description: 'Big to little endian' },
      { input: '"78563412"', expectedOutput: '12345678', isHidden: false, description: 'Little to big endian' },
      { input: '"AABBCCDD"', expectedOutput: 'ddccbbaa', isHidden: true, description: 'Another conversion' }
    ],
    hints: [
      'A byte is 2 hex digits',
      'Big-endian: most significant byte first',
      'Little-endian: least significant byte first',
      'Reverse the order of bytes'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex06',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'String to Binary',
    difficulty: 2,
    description: 'Write a function that converts a string to its binary representation (ASCII values as 8-bit binary).',
    starterCode: '# Convert string to binary\ndef string_to_binary(text):\n    # Return binary representation of each character\n    # Your code here\n    pass\n\nprint(string_to_binary("Hi"))',
    solution: 'def string_to_binary(text):\n    result = []\n    for char in text:\n        binary = bin(ord(char))[2:].zfill(8)\n        result.append(binary)\n    return " ".join(result)\n\nprint(string_to_binary("Hi"))',
    testCases: [
      { input: '"Hi"', expectedOutput: '01001000 01101001', isHidden: false, description: 'Hi in binary' },
      { input: '"AB"', expectedOutput: '01000001 01000010', isHidden: false, description: 'AB in binary' },
      { input: '"01"', expectedOutput: '00110000 00110001', isHidden: true, description: '01 in binary' }
    ],
    hints: [
      'Get ASCII value with ord()',
      'Convert to binary with bin()',
      'Pad to 8 bits with zfill(8)'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex07',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Fixed Point Representation',
    difficulty: 4,
    description: 'Implement fixed-point number representation using 8 bits total with 4 bits for integer part and 4 bits for fractional part.',
    starterCode: '# Fixed-point representation (4.4 format)\ndef decimal_to_fixed(d):\n    # Convert decimal to 8-bit fixed point (4.4)\n    # Your code here\n    pass\n\ndef fixed_to_decimal(binary_str):\n    # Convert 8-bit fixed point to decimal\n    # Your code here\n    pass\n\nprint(decimal_to_fixed(5.5))\nprint(fixed_to_decimal("01011000"))',
    solution: 'def decimal_to_fixed(d):\n    # Multiply by 16 (2^4) to shift decimal point\n    fixed_int = int(d * 16)\n    return bin(fixed_int)[2:].zfill(8)\n\ndef fixed_to_decimal(binary_str):\n    value = int(binary_str, 2)\n    return value / 16\n\nprint(decimal_to_fixed(5.5))\nprint(fixed_to_decimal("01011000"))',
    testCases: [
      { input: 'decimal_to_fixed(5.5)', expectedOutput: '01011000', isHidden: false, description: '5.5 in fixed point' },
      { input: 'fixed_to_decimal("01011000")', expectedOutput: '5.5', isHidden: false, description: 'Fixed to decimal' },
      { input: 'decimal_to_fixed(3.25)', expectedOutput: '00110100', isHidden: true, description: '3.25 in fixed point' }
    ],
    hints: [
      'Fixed point: multiply by 2^(fractional bits) to get integer',
      'To convert back: divide by 2^(fractional bits)',
      '4.4 format means 4 integer bits, 4 fractional bits'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex08',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'UTF-8 Encoder',
    difficulty: 5,
    description: 'Write a function that shows how a Unicode code point is encoded in UTF-8 format. Return the bytes as hex.',
    starterCode: '# Encode Unicode code point to UTF-8\ndef unicode_to_utf8(code_point):\n    # Return UTF-8 bytes as hex string\n    # Your code here\n    pass\n\nprint(unicode_to_utf8(0x0041))    # A\nprint(unicode_to_utf8(0x00A9))    # Copyright symbol\nprint(unicode_to_utf8(0x4E2D))    # Chinese character',
    solution: 'def unicode_to_utf8(code_point):\n    if code_point <= 0x7F:\n        # 1 byte: 0xxxxxxx\n        return format(code_point, "02x")\n    elif code_point <= 0x7FF:\n        # 2 bytes: 110xxxxx 10xxxxxx\n        b1 = 0xC0 | (code_point >> 6)\n        b2 = 0x80 | (code_point & 0x3F)\n        return format(b1, "02x") + format(b2, "02x")\n    elif code_point <= 0xFFFF:\n        # 3 bytes: 1110xxxx 10xxxxxx 10xxxxxx\n        b1 = 0xE0 | (code_point >> 12)\n        b2 = 0x80 | ((code_point >> 6) & 0x3F)\n        b3 = 0x80 | (code_point & 0x3F)\n        return format(b1, "02x") + format(b2, "02x") + format(b3, "02x")\n    else:\n        # 4 bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\n        b1 = 0xF0 | (code_point >> 18)\n        b2 = 0x80 | ((code_point >> 12) & 0x3F)\n        b3 = 0x80 | ((code_point >> 6) & 0x3F)\n        b4 = 0x80 | (code_point & 0x3F)\n        return format(b1, "02x") + format(b2, "02x") + format(b3, "02x") + format(b4, "02x")\n\nprint(unicode_to_utf8(0x0041))\nprint(unicode_to_utf8(0x00A9))\nprint(unicode_to_utf8(0x4E2D))',
    testCases: [
      { input: '0x0041', expectedOutput: '41', isHidden: false, description: 'ASCII A' },
      { input: '0x00A9', expectedOutput: 'c2a9', isHidden: false, description: 'Copyright symbol' },
      { input: '0x4E2D', expectedOutput: 'e4b8ad', isHidden: true, description: 'Chinese character' }
    ],
    hints: [
      'UTF-8 uses 1-4 bytes depending on code point',
      '0x00-0x7F: 1 byte (ASCII compatible)',
      '0x80-0x7FF: 2 bytes',
      '0x800-0xFFFF: 3 bytes',
      'Use bit manipulation to extract and combine bits'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex09',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Float Bit Breakdown',
    difficulty: 4,
    description: 'Given a 32-bit binary string, interpret it as an IEEE 754 single-precision float and return a tuple (sign, exponent, fraction, value).',
    starterCode: '# Interpret IEEE 754 single precision bits\ndef decode_float32(bits):\n    # bits: 32-char string of 0/1\n    # Return (sign_bit, exponent_int, fraction_int, numeric_value)\n    pass\n\nprint(decode_float32(\"01000000101000000000000000000000\"))  # 5.0',
    solution: `import struct

def decode_float32(bits):
    if len(bits) != 32:
        raise ValueError("need 32 bits")
    sign_bit = int(bits[0], 2)
    exponent_bits = bits[1:9]
    fraction_bits = bits[9:]
    exponent = int(exponent_bits, 2)
    fraction = int(fraction_bits, 2)
    # Convert to actual float using struct
    as_int = int(bits, 2)
    packed = as_int.to_bytes(4, byteorder="big")
    value = struct.unpack('>f', packed)[0]
    return (sign_bit, exponent, fraction, value)

print(decode_float32("01000000101000000000000000000000"))`,
    testCases: [
      { input: '"01000000101000000000000000000000"', expectedOutput: '(0, 128, 524288, 5.0)', isHidden: false, description: '5.0' },
      { input: '"00111111100000000000000000000000"', expectedOutput: '(0, 127, 0, 1.0)', isHidden: false, description: '1.0' },
      { input: '"10111100000000000000000000000000"', expectedOutput: '(1, 120, 0, -0.0078125)', isHidden: true, description: '-2^-7' }
    ],
    hints: [
      'Split bits into sign (1), exponent (8), fraction (23).',
      'You can reuse Python struct to get numeric value; the point is to show the pieces.',
      'Remember exponent bias is 127.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-ex10',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Endian Swap 32-bit',
    difficulty: 2,
    description: 'Write a function that takes an 8-hex-digit string (e.g., "1234ABCD") and returns the bytes swapped from little endian to big endian (e.g., "CDAB3412").',
    starterCode: '# Swap endian of 32-bit hex string\ndef swap_endian32(hex_str):\n    # Your code here\n    pass\n\nprint(swap_endian32(\"1234ABCD\"))',
    solution: 'def swap_endian32(hex_str):\n    if len(hex_str) != 8:\n        raise ValueError(\"need exactly 8 hex chars\")\n    hex_str = hex_str.lower()\n    bytes_list = [hex_str[i:i+2] for i in range(0, 8, 2)]\n    bytes_list.reverse()\n    return \"\".join(bytes_list)\n\nprint(swap_endian32(\"1234ABCD\"))',
    testCases: [
      { input: '"1234ABCD"', expectedOutput: 'cdab3412', isHidden: false, description: 'Swap four bytes' },
      { input: '"deadbeef"', expectedOutput: 'efbeadde', isHidden: false, description: 'Classic pattern' },
      { input: '"00000001"', expectedOutput: '01000000', isHidden: true, description: 'LSB moves to front' }
    ],
    hints: [
      'Group hex string into bytes (2 hex chars each).',
      'Reverse byte order, then join back.',
      'Assume valid hex input of length 8.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-drill-1',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Unsigned vs Signed Interpret',
    difficulty: 1,
    description: 'Given an 8-bit binary string, return a tuple (unsigned_value, signed_value).',
    starterCode: '# Interpret 8-bit value as unsigned and signed\ndef interpret_byte(bits):\n    # Your code here\n    pass\n\nprint(interpret_byte(\"11111111\"))  # (255, -1)',
    solution: 'def interpret_byte(bits):\n    bits = bits.zfill(8)\n    unsigned_val = int(bits, 2)\n    signed_val = unsigned_val - 256 if bits[0] == "1" else unsigned_val\n    return (unsigned_val, signed_val)\n\nprint(interpret_byte("11111111"))',
    testCases: [
      { input: '"11111111"', expectedOutput: '(255, -1)', isHidden: false, description: 'All ones' },
      { input: '"01111111"', expectedOutput: '(127, 127)', isHidden: false, description: 'Max positive' },
      { input: '"10000000"', expectedOutput: '(128, -128)', isHidden: true, description: 'Min negative' }
    ],
    hints: [
      'Unsigned: plain base-2.',
      'Signed: subtract 256 if sign bit is 1.',
      'Ensure string is 8 bits.'
    ],
    language: 'python'
  },
  {
    id: 'cs102-t3-drill-2',
    subjectId: 'cs102',
    topicId: 'cs102-3',
    title: 'Printable ASCII Check',
    difficulty: 1,
    description: 'Given a byte value (0-255), return True if it is a printable ASCII character (0x20-0x7E).',
    starterCode: '# Check printable ASCII\ndef is_printable(byte_val):\n    # Your code here\n    pass\n\nprint(is_printable(65))  # True for "A"',
    solution: 'def is_printable(byte_val):\n    return 0x20 <= byte_val <= 0x7E\n\nprint(is_printable(65))',
    testCases: [
      { input: '65', expectedOutput: 'True', isHidden: false, description: 'A' },
      { input: '10', expectedOutput: 'False', isHidden: false, description: 'LF is not printable' },
      { input: '127', expectedOutput: 'False', isHidden: true, description: 'DEL not printable' }
    ],
    hints: [
      'Printable ASCII ranges from 32 (space) to 126 (~).',
      'Return boolean.'
    ],
    language: 'python'
  }
];
