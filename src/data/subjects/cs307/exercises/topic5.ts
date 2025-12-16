import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs307-t5-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Basic Email Validation',
    difficulty: 1,
    description: 'Write a function to validate an email address using basic format checking. Return True if valid, False otherwise.',
    starterCode: `def validate_email(email):
    # Check for @ symbol and basic format
    pass

print(validate_email("user@example.com"))
print(validate_email("invalid.email"))`,
    solution: `def validate_email(email):
    if not email or '@' not in email:
        return False
    parts = email.split('@')
    if len(parts) != 2:
        return False
    local, domain = parts
    if not local or not domain:
        return False
    if '.' not in domain:
        return False
    return True

print(validate_email("user@example.com"))
print(validate_email("invalid.email"))`,
    testCases: [
      { input: '"user@example.com"', expectedOutput: 'True', isHidden: false, description: 'Valid email' },
      { input: '"invalid.email"', expectedOutput: 'False', isHidden: false, description: 'Missing @ symbol' },
      { input: '"user@@example.com"', expectedOutput: 'False', isHidden: true, description: 'Multiple @ symbols' }
    ],
    hints: [
      'Check if email contains exactly one @ symbol',
      'Split email on @ and validate both parts exist',
      'Ensure domain has a dot for TLD'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Sanitize User Input',
    difficulty: 2,
    description: 'Write a function to sanitize user input by removing dangerous characters that could be used in injection attacks.',
    starterCode: `def sanitize_input(user_input):
    # Remove potentially dangerous characters: < > & " ' ;
    pass

print(sanitize_input("Hello World"))
print(sanitize_input("<script>alert('xss')</script>"))`,
    solution: `def sanitize_input(user_input):
    dangerous_chars = ['<', '>', '&', '"', "'", ';']
    result = user_input
    for char in dangerous_chars:
        result = result.replace(char, '')
    return result

print(sanitize_input("Hello World"))
print(sanitize_input("<script>alert('xss')</script>"))`,
    testCases: [
      { input: '"Hello World"', expectedOutput: '"Hello World"', isHidden: false, description: 'Clean input unchanged' },
      { input: '"<script>alert(\'xss\')</script>"', expectedOutput: '"scriptalert(xss)/script"', isHidden: false, description: 'Remove script tags' },
      { input: '"User & Admin"', expectedOutput: '"User  Admin"', isHidden: true, description: 'Remove ampersand' }
    ],
    hints: [
      'Create a list of dangerous characters',
      'Use string.replace() to remove each character',
      'Process all dangerous characters one by one'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Integer Input Validation',
    difficulty: 1,
    description: 'Write a function that validates and safely converts user input to an integer within a specified range.',
    starterCode: `def validate_integer_input(input_str, min_val=0, max_val=100):
    # Validate and convert to int, return None if invalid
    pass

print(validate_integer_input("42", 0, 100))
print(validate_integer_input("150", 0, 100))
print(validate_integer_input("abc", 0, 100))`,
    solution: `def validate_integer_input(input_str, min_val=0, max_val=100):
    try:
        value = int(input_str)
        if min_val <= value <= max_val:
            return value
        return None
    except (ValueError, TypeError):
        return None

print(validate_integer_input("42", 0, 100))
print(validate_integer_input("150", 0, 100))
print(validate_integer_input("abc", 0, 100))`,
    testCases: [
      { input: '"42", 0, 100', expectedOutput: '42', isHidden: false, description: 'Valid integer in range' },
      { input: '"150", 0, 100', expectedOutput: 'None', isHidden: false, description: 'Integer out of range' },
      { input: '"abc", 0, 100', expectedOutput: 'None', isHidden: true, description: 'Non-numeric input' }
    ],
    hints: [
      'Use try-except to catch conversion errors',
      'Check if converted value is within range',
      'Return None for invalid inputs'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'HTML Entity Encoding',
    difficulty: 2,
    description: 'Write a function to encode special HTML characters to prevent XSS attacks.',
    starterCode: `def html_encode(text):
    # Encode: < > & " '
    pass

print(html_encode("Hello World"))
print(html_encode("<div>Test & 'quotes'</div>"))`,
    solution: `def html_encode(text):
    encoding_map = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#x27;'
    }
    result = text
    for char, entity in encoding_map.items():
        result = result.replace(char, entity)
    return result

print(html_encode("Hello World"))
print(html_encode("<div>Test & 'quotes'</div>"))`,
    testCases: [
      { input: '"Hello World"', expectedOutput: '"Hello World"', isHidden: false, description: 'No special chars' },
      { input: '"<div>Test & \'quotes\'</div>"', expectedOutput: '"&lt;div&gt;Test &amp; &#x27;quotes&#x27;&lt;/div&gt;"', isHidden: false, description: 'Encode HTML entities' },
      { input: '"a<b>c"', expectedOutput: '"a&lt;b&gt;c"', isHidden: true, description: 'Simple brackets' }
    ],
    hints: [
      'Create a dictionary mapping characters to HTML entities',
      'Replace each special character with its encoded form',
      'Handle & first to avoid double encoding'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Path Traversal Prevention',
    difficulty: 3,
    description: 'Write a function to validate that a filename does not contain path traversal attempts (../).',
    starterCode: `def is_safe_filename(filename):
    # Check for path traversal attempts
    pass

print(is_safe_filename("document.pdf"))
print(is_safe_filename("../etc/passwd"))
print(is_safe_filename("file..name.txt"))`,
    solution: `def is_safe_filename(filename):
    # Check for path traversal patterns
    dangerous_patterns = ['../', '..\\\\', '/..', '\\\\..']

    for pattern in dangerous_patterns:
        if pattern in filename:
            return False

    # Also reject absolute paths
    if filename.startswith('/') or filename.startswith('\\\\'):
        return False

    # Reject drive letters on Windows
    if len(filename) > 1 and filename[1] == ':':
        return False

    return True

print(is_safe_filename("document.pdf"))
print(is_safe_filename("../etc/passwd"))
print(is_safe_filename("file..name.txt"))`,
    testCases: [
      { input: '"document.pdf"', expectedOutput: 'True', isHidden: false, description: 'Safe filename' },
      { input: '"../etc/passwd"', expectedOutput: 'False', isHidden: false, description: 'Path traversal attempt' },
      { input: '"/etc/passwd"', expectedOutput: 'False', isHidden: true, description: 'Absolute path' }
    ],
    hints: [
      'Check for ../ and ..\\\\ patterns',
      'Reject absolute paths starting with / or \\\\',
      'Consider Windows drive letters (C:)'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Secure Error Message',
    difficulty: 2,
    description: 'Write a function that returns a generic error message for users while logging detailed info for developers.',
    starterCode: `def handle_login_error(username, error_type):
    # Return generic user message and detailed log
    # error_type: 'user_not_found', 'wrong_password', 'account_locked'
    pass

user_msg, log_msg = handle_login_error("alice", "wrong_password")
print(f"User: {user_msg}")
print(f"Log: {log_msg}")`,
    solution: `def handle_login_error(username, error_type):
    # Generic message for user (no details leaked)
    user_message = "Invalid username or password"

    # Detailed message for logs
    log_details = {
        'user_not_found': f"Login failed: User '{username}' does not exist",
        'wrong_password': f"Login failed: Invalid password for user '{username}'",
        'account_locked': f"Login failed: Account '{username}' is locked"
    }

    log_message = log_details.get(error_type, f"Login failed for user '{username}'")

    return user_message, log_message

user_msg, log_msg = handle_login_error("alice", "wrong_password")
print(f"User: {user_msg}")
print(f"Log: {log_msg}")`,
    testCases: [
      { input: '"alice", "wrong_password"', expectedOutput: 'user_msg contains "Invalid"', isHidden: false, description: 'Generic user message' },
      { input: '"bob", "user_not_found"', expectedOutput: 'log contains "bob"', isHidden: false, description: 'Detailed log message' },
      { input: '"charlie", "account_locked"', expectedOutput: 'user_msg same for all errors', isHidden: true, description: 'Consistent user message' }
    ],
    hints: [
      'User message should be same for all error types',
      'Log message should include specific details',
      'Never reveal which part of login failed to user'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'SQL Parameter Validation',
    difficulty: 3,
    description: 'Write a function to validate parameters for SQL queries to prevent injection. Accept only alphanumeric characters and underscores for table/column names.',
    starterCode: `def validate_sql_identifier(identifier):
    # Validate SQL table/column names
    pass

print(validate_sql_identifier("users_table"))
print(validate_sql_identifier("users; DROP TABLE"))
print(validate_sql_identifier("user123"))`,
    solution: `def validate_sql_identifier(identifier):
    if not identifier:
        return False

    # Must start with letter or underscore
    if not (identifier[0].isalpha() or identifier[0] == '_'):
        return False

    # Rest must be alphanumeric or underscore
    for char in identifier:
        if not (char.isalnum() or char == '_'):
            return False

    # Additional check: not too long
    if len(identifier) > 64:
        return False

    return True

print(validate_sql_identifier("users_table"))
print(validate_sql_identifier("users; DROP TABLE"))
print(validate_sql_identifier("user123"))`,
    testCases: [
      { input: '"users_table"', expectedOutput: 'True', isHidden: false, description: 'Valid identifier' },
      { input: '"users; DROP TABLE"', expectedOutput: 'False', isHidden: false, description: 'SQL injection attempt' },
      { input: '"123users"', expectedOutput: 'False', isHidden: true, description: 'Starts with number' }
    ],
    hints: [
      'Check first character is letter or underscore',
      'Validate all characters are alphanumeric or underscore',
      'Consider maximum length limits'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'URL Parameter Encoding',
    difficulty: 2,
    description: 'Write a function to safely encode URL parameters to prevent injection attacks.',
    starterCode: `def encode_url_param(param):
    # Encode special characters for URL
    pass

print(encode_url_param("hello world"))
print(encode_url_param("name=value&other=data"))`,
    solution: `def encode_url_param(param):
    # Characters that need encoding
    encoding_map = {
        ' ': '%20',
        '&': '%26',
        '=': '%3D',
        '?': '%3F',
        '#': '%23',
        '/': '%2F',
        '+': '%2B'
    }

    result = param
    for char, encoded in encoding_map.items():
        result = result.replace(char, encoded)

    return result

print(encode_url_param("hello world"))
print(encode_url_param("name=value&other=data"))`,
    testCases: [
      { input: '"hello world"', expectedOutput: '"hello%20world"', isHidden: false, description: 'Encode space' },
      { input: '"name=value&other=data"', expectedOutput: '"name%3Dvalue%26other%3Ddata"', isHidden: false, description: 'Encode special chars' },
      { input: '"simple"', expectedOutput: '"simple"', isHidden: true, description: 'No encoding needed' }
    ],
    hints: [
      'Create mapping of special chars to percent-encoded values',
      'Replace each special character',
      'Common chars: space, &, =, ?, #'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Command Injection Prevention',
    difficulty: 4,
    description: 'Write a function to validate filenames before using them in system commands. Reject any filename with shell metacharacters.',
    starterCode: `def is_safe_for_command(filename):
    # Validate filename has no shell metacharacters
    pass

print(is_safe_for_command("report.pdf"))
print(is_safe_for_command("file.txt; rm -rf /"))
print(is_safe_for_command("data|backup.tar"))`,
    solution: `def is_safe_for_command(filename):
    # Shell metacharacters that could be dangerous
    dangerous_chars = [';', '|', '&', '$', '>', '<', '\`', '\\n', '\\r', '(', ')', '{', '}', '[', ']', '!', '*', '?']

    # Check for dangerous characters
    for char in dangerous_chars:
        if char in filename:
            return False

    # Also check for command substitution patterns
    if '$(' in filename or '\${' in filename:
        return False

    # Reject if starts with dash (option injection)
    if filename.startswith('-'):
        return False

    return True

print(is_safe_for_command("report.pdf"))
print(is_safe_for_command("file.txt; rm -rf /"))
print(is_safe_for_command("data|backup.tar"))`,
    testCases: [
      { input: '"report.pdf"', expectedOutput: 'True', isHidden: false, description: 'Safe filename' },
      { input: '"file.txt; rm -rf /"', expectedOutput: 'False', isHidden: false, description: 'Command injection attempt' },
      { input: '"data|backup.tar"', expectedOutput: 'False', isHidden: true, description: 'Pipe character' }
    ],
    hints: [
      'List all shell metacharacters: ; | & $ > < etc.',
      'Check for command substitution: $( \${',
      'Reject filenames starting with dash'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Credit Card Masking',
    difficulty: 2,
    description: 'Write a function to mask a credit card number, showing only the last 4 digits.',
    starterCode: `def mask_credit_card(card_number):
    # Show only last 4 digits, mask rest with *
    pass

print(mask_credit_card("1234567812345678"))
print(mask_credit_card("4111111111111111"))`,
    solution: `def mask_credit_card(card_number):
    # Remove spaces and dashes if present
    cleaned = card_number.replace(' ', '').replace('-', '')

    if len(cleaned) < 4:
        return '*' * len(cleaned)

    # Mask all but last 4 digits
    masked = '*' * (len(cleaned) - 4) + cleaned[-4:]

    return masked

print(mask_credit_card("1234567812345678"))
print(mask_credit_card("4111111111111111"))`,
    testCases: [
      { input: '"1234567812345678"', expectedOutput: '"************5678"', isHidden: false, description: 'Mask 16-digit card' },
      { input: '"4111111111111111"', expectedOutput: '"************1111"', isHidden: false, description: 'Last 4 visible' },
      { input: '"123"', expectedOutput: '"***"', isHidden: true, description: 'Short number' }
    ],
    hints: [
      'Clean input by removing spaces/dashes',
      'Replace all but last 4 chars with asterisks',
      'Handle edge case of short numbers'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'JSON Output Sanitization',
    difficulty: 3,
    description: 'Write a function to sanitize data before encoding to JSON, removing sensitive fields.',
    starterCode: `def sanitize_for_json(data_dict):
    # Remove sensitive fields: password, ssn, credit_card
    pass

user = {"name": "Alice", "password": "secret123", "email": "alice@example.com"}
print(sanitize_for_json(user))`,
    solution: `def sanitize_for_json(data_dict):
    sensitive_fields = ['password', 'ssn', 'credit_card', 'secret', 'token', 'api_key']

    # Create a copy to avoid modifying original
    sanitized = data_dict.copy()

    # Remove sensitive fields (case-insensitive)
    keys_to_remove = []
    for key in sanitized.keys():
        key_lower = key.lower()
        for sensitive in sensitive_fields:
            if sensitive in key_lower:
                keys_to_remove.append(key)
                break

    for key in keys_to_remove:
        del sanitized[key]

    return sanitized

user = {"name": "Alice", "password": "secret123", "email": "alice@example.com"}
print(sanitize_for_json(user))`,
    testCases: [
      { input: '{"name": "Alice", "password": "secret123"}', expectedOutput: '{"name": "Alice"}', isHidden: false, description: 'Remove password field' },
      { input: '{"id": 1, "ssn": "123-45-6789"}', expectedOutput: '{"id": 1}', isHidden: false, description: 'Remove SSN field' },
      { input: '{"user": "Bob", "api_key": "xyz"}', expectedOutput: '{"user": "Bob"}', isHidden: true, description: 'Remove API key' }
    ],
    hints: [
      'Define list of sensitive field names',
      'Create copy of dictionary',
      'Check each key against sensitive list',
      'Delete matching keys from copy'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'File Extension Validation',
    difficulty: 2,
    description: 'Write a function to validate file uploads by checking allowed extensions.',
    starterCode: `def is_allowed_file(filename, allowed_extensions):
    # Check if file extension is in allowed list
    pass

print(is_allowed_file("document.pdf", ["pdf", "doc", "docx"]))
print(is_allowed_file("script.exe", ["pdf", "doc", "docx"]))`,
    solution: `def is_allowed_file(filename, allowed_extensions):
    if not filename or '.' not in filename:
        return False

    # Get extension (everything after last dot)
    extension = filename.rsplit('.', 1)[1].lower()

    # Normalize allowed extensions to lowercase
    allowed = [ext.lower() for ext in allowed_extensions]

    return extension in allowed

print(is_allowed_file("document.pdf", ["pdf", "doc", "docx"]))
print(is_allowed_file("script.exe", ["pdf", "doc", "docx"]))`,
    testCases: [
      { input: '"document.pdf", ["pdf", "doc", "docx"]', expectedOutput: 'True', isHidden: false, description: 'Allowed extension' },
      { input: '"script.exe", ["pdf", "doc", "docx"]', expectedOutput: 'False', isHidden: false, description: 'Disallowed extension' },
      { input: '"file.PDF", ["pdf"]', expectedOutput: 'True', isHidden: true, description: 'Case insensitive' }
    ],
    hints: [
      'Use rsplit() to get extension after last dot',
      'Convert to lowercase for comparison',
      'Check if extension is in allowed list'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Input Length Validation',
    difficulty: 1,
    description: 'Write a function to validate that user input does not exceed maximum length to prevent buffer overflow-style attacks.',
    starterCode: `def validate_length(input_str, max_length=255):
    # Return True if within limit, False if too long
    pass

print(validate_length("Hello", 10))
print(validate_length("A" * 300, 255))`,
    solution: `def validate_length(input_str, max_length=255):
    if input_str is None:
        return False

    return len(input_str) <= max_length

print(validate_length("Hello", 10))
print(validate_length("A" * 300, 255))`,
    testCases: [
      { input: '"Hello", 10', expectedOutput: 'True', isHidden: false, description: 'Within limit' },
      { input: '"A" * 300, 255', expectedOutput: 'False', isHidden: false, description: 'Exceeds limit' },
      { input: '"", 10', expectedOutput: 'True', isHidden: true, description: 'Empty string valid' }
    ],
    hints: [
      'Use len() to get string length',
      'Compare against max_length',
      'Handle None input case'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'XML Entity Prevention',
    difficulty: 4,
    description: 'Write a function to detect potentially dangerous XML patterns like entity expansion attacks.',
    starterCode: `def is_safe_xml_content(xml_string):
    # Detect dangerous XML patterns
    pass

print(is_safe_xml_content("<root><data>Hello</data></root>"))
print(is_safe_xml_content("<!DOCTYPE test [<!ENTITY xxe SYSTEM 'file:///etc/passwd'>]>"))`,
    solution: `def is_safe_xml_content(xml_string):
    dangerous_patterns = [
        '<!DOCTYPE',
        '<!ENTITY',
        'SYSTEM',
        'PUBLIC',
        '<!ELEMENT',
        '<!ATTLIST'
    ]

    # Check for dangerous patterns (case-insensitive)
    xml_upper = xml_string.upper()
    for pattern in dangerous_patterns:
        if pattern in xml_upper:
            return False

    # Check for excessive entity references
    if xml_string.count('&') > 10:
        return False

    return True

print(is_safe_xml_content("<root><data>Hello</data></root>"))
print(is_safe_xml_content("<!DOCTYPE test [<!ENTITY xxe SYSTEM 'file:///etc/passwd'>]>"))`,
    testCases: [
      { input: '"<root><data>Hello</data></root>"', expectedOutput: 'True', isHidden: false, description: 'Safe XML' },
      { input: '"<!DOCTYPE test [<!ENTITY xxe SYSTEM \'file:///etc/passwd\'>]>"', expectedOutput: 'False', isHidden: false, description: 'XXE attack pattern' },
      { input: '"<data>&amp;&amp;&amp;</data>"', expectedOutput: 'True', isHidden: true, description: 'Few entities OK' }
    ],
    hints: [
      'Check for DOCTYPE and ENTITY declarations',
      'Look for SYSTEM and PUBLIC keywords',
      'Count entity references (&)',
      'Use case-insensitive matching'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'LDAP Injection Prevention',
    difficulty: 4,
    description: 'Write a function to escape special characters in LDAP query inputs to prevent LDAP injection.',
    starterCode: `def escape_ldap_filter(input_str):
    # Escape LDAP special characters
    pass

print(escape_ldap_filter("John Doe"))
print(escape_ldap_filter("admin)(uid=*))(|(uid=*"))`,
    solution: `def escape_ldap_filter(input_str):
    # LDAP special characters and their escaped forms
    escape_map = {
        '\\\\': '\\\\5c',
        '*': '\\\\2a',
        '(': '\\\\28',
        ')': '\\\\29',
        '\\x00': '\\\\00'
    }

    result = input_str
    # Escape backslash first to avoid double escaping
    result = result.replace('\\\\', '\\\\5c')
    result = result.replace('*', '\\\\2a')
    result = result.replace('(', '\\\\28')
    result = result.replace(')', '\\\\29')
    result = result.replace('\\x00', '\\\\00')

    return result

print(escape_ldap_filter("John Doe"))
print(escape_ldap_filter("admin)(uid=*))(|(uid=*"))`,
    testCases: [
      { input: '"John Doe"', expectedOutput: '"John Doe"', isHidden: false, description: 'No special chars' },
      { input: '"admin)(uid=*))(|(uid=*"', expectedOutput: 'Escaped parentheses and asterisks', isHidden: false, description: 'Escape injection chars' },
      { input: '"user*"', expectedOutput: '"user\\\\2a"', isHidden: true, description: 'Escape wildcard' }
    ],
    hints: [
      'LDAP special chars: * ( ) \\\\ and NULL',
      'Escape to hex codes: \\\\2a \\\\28 \\\\29 \\\\5c',
      'Escape backslash first to avoid double escaping'
    ],
    language: 'python'
  },
  {
    id: 'cs307-t5-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-5',
    title: 'Content Security Policy Header',
    difficulty: 3,
    description: 'Write a function to generate a Content Security Policy header value for secure web applications.',
    starterCode: `def generate_csp_header(allow_inline_scripts=False):
    # Generate CSP header string
    pass

print(generate_csp_header(False))
print(generate_csp_header(True))`,
    solution: `def generate_csp_header(allow_inline_scripts=False):
    # Start with restrictive default
    policies = [
        "default-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
    ]

    # Script policy based on parameter
    if allow_inline_scripts:
        policies.append("script-src 'self' 'unsafe-inline'")
    else:
        policies.append("script-src 'self'")

    # Join with semicolons
    return '; '.join(policies)

print(generate_csp_header(False))
print(generate_csp_header(True))`,
    testCases: [
      { input: 'False', expectedOutput: 'Contains script-src self', isHidden: false, description: 'Strict CSP' },
      { input: 'True', expectedOutput: 'Contains unsafe-inline', isHidden: false, description: 'Allow inline scripts' },
      { input: 'False', expectedOutput: 'Contains default-src', isHidden: true, description: 'Has default-src' }
    ],
    hints: [
      'Use default-src to restrict resource loading',
      'Set object-src to none to prevent plugins',
      'script-src controls JavaScript execution',
      'Join policies with semicolons'
    ],
    language: 'python'
  }
];
