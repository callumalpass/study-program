import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs307-t4-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Basic Input Sanitization',
    difficulty: 1,
    description: 'Sanitize user input by removing HTML tags using a simple approach.',
    starterCode: `import re

def sanitize_html(user_input):
    """
    Remove HTML tags from user input.

    Args:
        user_input: String that may contain HTML tags

    Returns:
        String: sanitized input with HTML tags removed
    """
    pass`,
    solution: `import re

def sanitize_html(user_input):
    """
    Remove HTML tags from user input.

    Args:
        user_input: String that may contain HTML tags

    Returns:
        String: sanitized input with HTML tags removed
    """
    # Remove HTML tags using regex
    return re.sub(r'<[^>]+>', '', user_input)`,
    testCases: [
      { input: '"Hello <script>alert(1)</script> World"', expectedOutput: 'Hello alert(1) World', isHidden: false, description: 'Remove script tag' },
      { input: '"<b>Bold</b> text"', expectedOutput: 'Bold text', isHidden: false, description: 'Remove formatting tags' },
      { input: '"Plain text"', expectedOutput: 'Plain text', isHidden: false, description: 'No tags to remove' },
      { input: '"<img src=x onerror=alert(1)>"', expectedOutput: '', isHidden: true, description: 'Remove malicious img tag' }
    ],
    hints: ['Use regex to match HTML tags', 'Pattern: <...> matches opening and closing tags', 'Replace all matches with empty string'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Escape HTML Special Characters',
    difficulty: 2,
    description: 'Escape HTML special characters to prevent XSS: < > & " \' ',
    starterCode: `def escape_html(text):
    """
    Escape HTML special characters.

    Args:
        text: String that may contain special characters

    Returns:
        String: escaped text safe for HTML output
    """
    pass`,
    solution: `def escape_html(text):
    """
    Escape HTML special characters.

    Args:
        text: String that may contain special characters

    Returns:
        String: escaped text safe for HTML output
    """
    replacements = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
    }

    for char, escaped in replacements.items():
        text = text.replace(char, escaped)

    return text`,
    testCases: [
      { input: '"<script>alert(1)</script>"', expectedOutput: '&lt;script&gt;alert(1)&lt;/script&gt;', isHidden: false, description: 'Escape script tag' },
      { input: '"Hello & Goodbye"', expectedOutput: 'Hello &amp; Goodbye', isHidden: false, description: 'Escape ampersand' },
      { input: '"\\"quoted\\""', expectedOutput: '&quot;quoted&quot;', isHidden: false, description: 'Escape quotes' },
      { input: '"<img src=\\"x\\" onerror=\\"alert(1)\\">"', expectedOutput: '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;', isHidden: true, description: 'Escape complex XSS attempt' }
    ],
    hints: ['Replace each special character with HTML entity', 'Order matters: escape & first', 'Common entities: &lt; &gt; &amp; &quot; &#x27;'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Validate Email Format',
    difficulty: 2,
    description: 'Validate email format using a simple pattern check.',
    starterCode: `import re

def validate_email(email):
    """
    Validate email format.

    Args:
        email: String email address

    Returns:
        Boolean: True if valid format
    """
    pass`,
    solution: `import re

def validate_email(email):
    """
    Validate email format.

    Args:
        email: String email address

    Returns:
        Boolean: True if valid format
    """
    # Simple email validation pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))`,
    testCases: [
      { input: '"user@example.com"', expectedOutput: 'True', isHidden: false, description: 'Valid email' },
      { input: '"invalid.email"', expectedOutput: 'False', isHidden: false, description: 'Missing @' },
      { input: '"user@domain"', expectedOutput: 'False', isHidden: false, description: 'Missing TLD' },
      { input: '"user+tag@example.co.uk"', expectedOutput: 'True', isHidden: true, description: 'Valid with plus and multiple dots' },
      { input: '"@example.com"', expectedOutput: 'False', isHidden: true, description: 'Missing local part' }
    ],
    hints: ['Pattern: localpart@domain.tld', 'Allow alphanumeric, dots, hyphens, etc.', 'Must have @ symbol', 'Domain must have at least one dot'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'SQL Injection Prevention - Parameterized Query',
    difficulty: 3,
    description: 'Build a safe parameterized SQL query instead of string concatenation. Return the query and parameters separately.',
    starterCode: `def build_safe_query(table, username):
    """
    Build parameterized SQL query.

    Args:
        table: String table name
        username: String username value

    Returns:
        Dictionary with 'query' (string with placeholder) and 'params' (tuple)
    """
    pass`,
    solution: `def build_safe_query(table, username):
    """
    Build parameterized SQL query.

    Args:
        table: String table name
        username: String username value

    Returns:
        Dictionary with 'query' (string with placeholder) and 'params' (tuple)
    """
    # Use parameterized query with placeholder
    # Note: table name should be validated separately, not parameterized
    query = f"SELECT * FROM {table} WHERE username = ?"
    params = (username,)

    return {
        'query': query,
        'params': params
    }`,
    testCases: [
      { input: '"users", "john"', expectedOutput: "{'query': 'SELECT * FROM users WHERE username = ?', 'params': ('john',)}", isHidden: false, description: 'Safe parameterized query' },
      { input: '"accounts", "admin"', expectedOutput: "{'query': 'SELECT * FROM accounts WHERE username = ?', 'params': ('admin',)}", isHidden: false, description: 'Different table' },
      { input: '"users", "admin\' OR \'1\'=\'1"', expectedOutput: '{"query": "SELECT * FROM users WHERE username = ?", "params": ("admin\' OR \'1\'=\'1",)}', isHidden: true, description: 'SQL injection attempt safely parameterized' }
    ],
    hints: ['Use ? as placeholder for parameter', 'Return query string and params separately', 'Database driver handles escaping automatically', 'Never concatenate user input into SQL'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Detect SQL Injection Attempt',
    difficulty: 3,
    description: 'Detect potential SQL injection by looking for suspicious patterns in user input.',
    starterCode: `def detect_sql_injection(user_input):
    """
    Detect potential SQL injection patterns.

    Args:
        user_input: String user input

    Returns:
        Boolean: True if suspicious patterns detected
    """
    pass`,
    solution: `def detect_sql_injection(user_input):
    """
    Detect potential SQL injection patterns.

    Args:
        user_input: String user input

    Returns:
        Boolean: True if suspicious patterns detected
    """
    user_input_lower = user_input.lower()

    # Common SQL injection patterns
    suspicious_patterns = [
        "' or '",
        '" or "',
        "' or 1=1",
        '" or 1=1',
        'union select',
        'drop table',
        'delete from',
        'insert into',
        'update ',
        '--',
        ';--',
        'xp_',
        'sp_'
    ]

    for pattern in suspicious_patterns:
        if pattern in user_input_lower:
            return True

    return False`,
    testCases: [
      { input: '"john"', expectedOutput: 'False', isHidden: false, description: 'Normal input' },
      { input: '"admin\' OR \'1\'=\'1"', expectedOutput: 'True', isHidden: false, description: 'Classic SQL injection' },
      { input: '"user; DROP TABLE users--"', expectedOutput: 'True', isHidden: false, description: 'DROP TABLE attack' },
      { input: '"user UNION SELECT password FROM accounts"', expectedOutput: 'True', isHidden: true, description: 'UNION attack' },
      { input: '"normal_username_123"', expectedOutput: 'False', isHidden: true, description: 'Safe input' }
    ],
    hints: ['Look for SQL keywords like OR, UNION, DROP', 'Check for quote characters in suspicious contexts', 'Look for SQL comments (--)', 'Convert to lowercase for case-insensitive matching'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Path Traversal Prevention',
    difficulty: 3,
    description: 'Validate file path to prevent directory traversal attacks. Reject paths containing .. or absolute paths.',
    starterCode: `import os

def is_safe_path(base_dir, user_path):
    """
    Check if file path is safe (no directory traversal).

    Args:
        base_dir: String base directory path
        user_path: String user-provided path

    Returns:
        Boolean: True if path is safe
    """
    pass`,
    solution: `import os

def is_safe_path(base_dir, user_path):
    """
    Check if file path is safe (no directory traversal).

    Args:
        base_dir: String base directory path
        user_path: String user-provided path

    Returns:
        Boolean: True if path is safe
    """
    # Reject absolute paths
    if os.path.isabs(user_path):
        return False

    # Reject paths with .. (parent directory)
    if '..' in user_path:
        return False

    # Normalize and check if path stays within base_dir
    full_path = os.path.normpath(os.path.join(base_dir, user_path))
    return full_path.startswith(os.path.normpath(base_dir))`,
    testCases: [
      { input: '"/var/www/files", "document.pdf"', expectedOutput: 'True', isHidden: false, description: 'Safe relative path' },
      { input: '"/var/www/files", "../etc/passwd"', expectedOutput: 'False', isHidden: false, description: 'Directory traversal attempt' },
      { input: '"/var/www/files", "/etc/passwd"', expectedOutput: 'False', isHidden: false, description: 'Absolute path rejected' },
      { input: '"/var/www/files", "subdir/file.txt"', expectedOutput: 'True', isHidden: true, description: 'Safe subdirectory path' },
      { input: '"/var/www/files", "subdir/../../etc/passwd"', expectedOutput: 'False', isHidden: true, description: 'Traversal in middle of path' }
    ],
    hints: ['Reject absolute paths (starting with /)', 'Reject paths containing ..', 'Normalize paths and verify they stay within base directory', 'Use os.path functions for proper path handling'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'XSS Prevention - Content Security Policy',
    difficulty: 3,
    description: 'Generate a Content Security Policy header to prevent XSS attacks.',
    starterCode: `def generate_csp_header(allow_inline_scripts=False):
    """
    Generate Content-Security-Policy header.

    Args:
        allow_inline_scripts: Boolean whether to allow inline scripts

    Returns:
        String: CSP header value
    """
    pass`,
    solution: `def generate_csp_header(allow_inline_scripts=False):
    """
    Generate Content-Security-Policy header.

    Args:
        allow_inline_scripts: Boolean whether to allow inline scripts

    Returns:
        String: CSP header value
    """
    # Default to strict policy
    script_src = "'self'"

    if allow_inline_scripts:
        # Less secure: allow inline scripts
        script_src = "'self' 'unsafe-inline'"

    csp = f"default-src 'self'; script-src {script_src}; style-src 'self' 'unsafe-inline'; img-src 'self' data:"

    return csp`,
    testCases: [
      { input: 'False', expectedOutput: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:", isHidden: false, description: 'Strict CSP' },
      { input: 'True', expectedOutput: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:", isHidden: false, description: 'CSP with inline scripts' }
    ],
    hints: ['CSP restricts where resources can be loaded from', "Use 'self' to allow same origin", "'unsafe-inline' allows inline scripts (less secure)", 'Separate directives with semicolons'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Validate URL Scheme',
    difficulty: 3,
    description: 'Validate URL has safe scheme (http/https) to prevent javascript: URLs and other attacks.',
    starterCode: `from urllib.parse import urlparse

def is_safe_url(url):
    """
    Check if URL has safe scheme.

    Args:
        url: String URL

    Returns:
        Boolean: True if URL scheme is safe (http/https)
    """
    pass`,
    solution: `from urllib.parse import urlparse

def is_safe_url(url):
    """
    Check if URL has safe scheme.

    Args:
        url: String URL

    Returns:
        Boolean: True if URL scheme is safe (http/https)
    """
    try:
        parsed = urlparse(url)
        return parsed.scheme in ['http', 'https']
    except:
        return False`,
    testCases: [
      { input: '"https://example.com"', expectedOutput: 'True', isHidden: false, description: 'Safe HTTPS URL' },
      { input: '"http://example.com"', expectedOutput: 'True', isHidden: false, description: 'Safe HTTP URL' },
      { input: '"javascript:alert(1)"', expectedOutput: 'False', isHidden: false, description: 'Dangerous javascript: URL' },
      { input: '"data:text/html,<script>alert(1)</script>"', expectedOutput: 'False', isHidden: true, description: 'Dangerous data: URL' },
      { input: '"ftp://files.example.com"', expectedOutput: 'False', isHidden: true, description: 'FTP not in whitelist' }
    ],
    hints: ['Parse URL to extract scheme', 'Only allow http and https schemes', 'Reject javascript:, data:, file:, etc.', 'Handle parsing errors gracefully'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'CSRF Token Generator',
    difficulty: 4,
    description: 'Generate a CSRF token using cryptographically secure random bytes.',
    starterCode: `import secrets

def generate_csrf_token():
    """
    Generate CSRF token.

    Returns:
        String: hex CSRF token
    """
    pass`,
    solution: `import secrets

def generate_csrf_token():
    """
    Generate CSRF token.

    Returns:
        String: hex CSRF token
    """
    # Generate 32 bytes (256 bits) of random data
    return secrets.token_hex(32)`,
    testCases: [
      { input: '', expectedOutput: '64_chars', isHidden: false, description: 'Token is 64 hex characters' }
    ],
    hints: ['Use secrets module for cryptographic randomness', 'Generate at least 32 bytes', 'Return as hex string', 'Token should be unpredictable'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'CSRF Token Validator',
    difficulty: 4,
    description: 'Validate CSRF token by comparing submitted token with stored token.',
    starterCode: `def validate_csrf_token(submitted_token, stored_token):
    """
    Validate CSRF token.

    Args:
        submitted_token: String token from form/request
        stored_token: String token from session

    Returns:
        Boolean: True if tokens match
    """
    pass`,
    solution: `def validate_csrf_token(submitted_token, stored_token):
    """
    Validate CSRF token.

    Args:
        submitted_token: String token from form/request
        stored_token: String token from session

    Returns:
        Boolean: True if tokens match
    """
    # Use constant-time comparison to prevent timing attacks
    if not submitted_token or not stored_token:
        return False

    if len(submitted_token) != len(stored_token):
        return False

    # Simple constant-time comparison
    result = 0
    for a, b in zip(submitted_token, stored_token):
        result |= ord(a) ^ ord(b)

    return result == 0`,
    testCases: [
      { input: '"abc123def456", "abc123def456"', expectedOutput: 'True', isHidden: false, description: 'Matching tokens' },
      { input: '"abc123def456", "xyz789"', expectedOutput: 'False', isHidden: false, description: 'Different tokens' },
      { input: '"", "abc123"', expectedOutput: 'False', isHidden: true, description: 'Empty submitted token' },
      { input: '"abc123", ""', expectedOutput: 'False', isHidden: true, description: 'Empty stored token' }
    ],
    hints: ['Compare tokens for exact match', 'Use constant-time comparison to prevent timing attacks', 'Check for empty tokens', 'XOR can be used for constant-time comparison'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Whitelist Input Validator',
    difficulty: 4,
    description: 'Validate input against a whitelist of allowed values (more secure than blacklist).',
    starterCode: `def validate_with_whitelist(user_input, allowed_values):
    """
    Validate input against whitelist.

    Args:
        user_input: String user input
        allowed_values: List of allowed string values

    Returns:
        Boolean: True if input is in whitelist
    """
    pass`,
    solution: `def validate_with_whitelist(user_input, allowed_values):
    """
    Validate input against whitelist.

    Args:
        user_input: String user input
        allowed_values: List of allowed string values

    Returns:
        Boolean: True if input is in whitelist
    """
    return user_input in allowed_values`,
    testCases: [
      { input: '"admin", ["user", "admin", "guest"]', expectedOutput: 'True', isHidden: false, description: 'Value in whitelist' },
      { input: '"superadmin", ["user", "admin", "guest"]', expectedOutput: 'False', isHidden: false, description: 'Value not in whitelist' },
      { input: '"user", ["user"]', expectedOutput: 'True', isHidden: true, description: 'Single item whitelist' },
      { input: '"hacker", []', expectedOutput: 'False', isHidden: true, description: 'Empty whitelist' }
    ],
    hints: ['Simply check if input is in allowed list', 'Whitelist is more secure than blacklist', 'Only explicitly allowed values pass'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Safe Filename Validator',
    difficulty: 4,
    description: 'Validate uploaded filename is safe - only alphanumeric, dots, underscores, and hyphens.',
    starterCode: `import re

def is_safe_filename(filename):
    """
    Validate filename is safe.

    Args:
        filename: String filename

    Returns:
        Boolean: True if filename is safe
    """
    pass`,
    solution: `import re

def is_safe_filename(filename):
    """
    Validate filename is safe.

    Args:
        filename: String filename

    Returns:
        Boolean: True if filename is safe
    """
    # Reject empty or very long filenames
    if not filename or len(filename) > 255:
        return False

    # Reject directory traversal attempts
    if '..' in filename or '/' in filename or '\\\\' in filename:
        return False

    # Only allow alphanumeric, dots, underscores, hyphens
    if not re.match(r'^[a-zA-Z0-9._-]+$', filename):
        return False

    # Reject filenames starting with dot (hidden files)
    if filename.startswith('.'):
        return False

    return True`,
    testCases: [
      { input: '"document.pdf"', expectedOutput: 'True', isHidden: false, description: 'Safe filename' },
      { input: '"../../../etc/passwd"', expectedOutput: 'False', isHidden: false, description: 'Directory traversal' },
      { input: '".htaccess"', expectedOutput: 'False', isHidden: false, description: 'Hidden file' },
      { input: '"my_file-2024.txt"', expectedOutput: 'True', isHidden: true, description: 'Safe with underscore and hyphen' },
      { input: '"malicious<script>.exe"', expectedOutput: 'False', isHidden: true, description: 'Contains special characters' }
    ],
    hints: ['Allow only alphanumeric, dots, underscores, hyphens', 'Reject path separators (/, \\)', 'Reject .. (directory traversal)', 'Reject hidden files (starting with dot)', 'Check length limits'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Command Injection Prevention',
    difficulty: 5,
    description: 'Safely execute a command with user input by using argument list instead of shell string.',
    starterCode: `def build_safe_command(base_command, user_arg):
    """
    Build safe command with user argument.

    Args:
        base_command: String base command (e.g., 'ls')
        user_arg: String user-provided argument

    Returns:
        List: command as list of arguments (safe for subprocess)
    """
    pass`,
    solution: `def build_safe_command(base_command, user_arg):
    """
    Build safe command with user argument.

    Args:
        base_command: String base command (e.g., 'ls')
        user_arg: String user-provided argument

    Returns:
        List: command as list of arguments (safe for subprocess)
    """
    # Return as list - subprocess will NOT use shell
    # This prevents command injection
    return [base_command, user_arg]`,
    testCases: [
      { input: '"ls", "/home/user"', expectedOutput: "['ls', '/home/user']", isHidden: false, description: 'Safe command list' },
      { input: '"cat", "file.txt"', expectedOutput: "['cat', 'file.txt']", isHidden: false, description: 'Cat command' },
      { input: '"ls", "/home; rm -rf /"', expectedOutput: "['ls', '/home; rm -rf /']", isHidden: true, description: 'Injection attempt safely escaped' }
    ],
    hints: ['Return command as list, not string', 'First element is command, rest are arguments', 'subprocess with list prevents shell injection', 'Shell metacharacters treated as literal when using list'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'XML External Entity (XXE) Prevention',
    difficulty: 5,
    description: 'Safely parse XML by disabling external entity resolution.',
    starterCode: `import xml.etree.ElementTree as ET

def safe_parse_xml(xml_string):
    """
    Safely parse XML with XXE prevention.

    Args:
        xml_string: String XML content

    Returns:
        Dictionary: parsed data or error message
    """
    pass`,
    solution: `import xml.etree.ElementTree as ET

def safe_parse_xml(xml_string):
    """
    Safely parse XML with XXE prevention.

    Args:
        xml_string: String XML content

    Returns:
        Dictionary: parsed data or error message
    """
    try:
        # Parse XML (ElementTree has XXE protection by default in Python 3.8+)
        # For older versions, use defusedxml library

        # Check for DOCTYPE declarations (potential XXE)
        if '<!DOCTYPE' in xml_string or '<!ENTITY' in xml_string:
            return {'error': 'DOCTYPE/ENTITY declarations not allowed'}

        root = ET.fromstring(xml_string)

        # Return root tag and text as simple example
        return {
            'tag': root.tag,
            'text': root.text or '',
            'children': len(list(root))
        }
    except ET.ParseError:
        return {'error': 'Invalid XML'}`,
    testCases: [
      { input: '"<root>Hello</root>"', expectedOutput: "{'tag': 'root', 'text': 'Hello', 'children': 0}", isHidden: false, description: 'Safe XML' },
      { input: '"<!DOCTYPE foo [<!ENTITY xxe SYSTEM \\"file:///etc/passwd\\">]><root>&xxe;</root>"', expectedOutput: "{'error': 'DOCTYPE/ENTITY declarations not allowed'}", isHidden: false, description: 'XXE attack blocked' },
      { input: '"<root><child>Test</child></root>"', expectedOutput: "{'tag': 'root', 'text': '', 'children': 1}", isHidden: true, description: 'XML with children' }
    ],
    hints: ['Check for DOCTYPE and ENTITY declarations', 'Reject XML with external entity definitions', 'Use defusedxml library for better protection', 'Modern ElementTree has some built-in protections'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Security Headers Generator',
    difficulty: 5,
    description: 'Generate comprehensive security headers to protect against common vulnerabilities.',
    starterCode: `def generate_security_headers():
    """
    Generate security headers for HTTP response.

    Returns:
        Dictionary: security headers
    """
    pass`,
    solution: `def generate_security_headers():
    """
    Generate security headers for HTTP response.

    Returns:
        Dictionary: security headers
    """
    return {
        # Prevent clickjacking
        'X-Frame-Options': 'DENY',

        # Enable browser XSS protection
        'X-XSS-Protection': '1; mode=block',

        # Prevent MIME sniffing
        'X-Content-Type-Options': 'nosniff',

        # Force HTTPS
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

        # Content Security Policy
        'Content-Security-Policy': "default-src 'self'; script-src 'self'",

        # Referrer policy
        'Referrer-Policy': 'strict-origin-when-cross-origin',

        # Permissions policy
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }`,
    testCases: [
      { input: '', expectedOutput: "{'X-Frame-Options': 'DENY', 'X-XSS-Protection': '1; mode=block', 'X-Content-Type-Options': 'nosniff', 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', 'Content-Security-Policy': \"default-src 'self'; script-src 'self'\", 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'}", isHidden: false, description: 'All security headers' }
    ],
    hints: ['X-Frame-Options prevents clickjacking', 'X-Content-Type-Options prevents MIME sniffing', 'Strict-Transport-Security enforces HTTPS', 'CSP restricts resource loading', 'Include multiple protective headers'],
    language: 'python'
  },
  {
    id: 'cs307-t4-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-4',
    title: 'Input Length Validator',
    difficulty: 5,
    description: 'Validate input length to prevent buffer overflow and DoS attacks. Also check for null bytes.',
    starterCode: `def validate_input_length(user_input, min_length, max_length):
    """
    Validate input length and content.

    Args:
        user_input: String user input
        min_length: Integer minimum allowed length
        max_length: Integer maximum allowed length

    Returns:
        Dictionary with 'valid' (bool) and 'reason' (string)
    """
    pass`,
    solution: `def validate_input_length(user_input, min_length, max_length):
    """
    Validate input length and content.

    Args:
        user_input: String user input
        min_length: Integer minimum allowed length
        max_length: Integer maximum allowed length

    Returns:
        Dictionary with 'valid' (bool) and 'reason' (string)
    """
    # Check for null bytes (can cause issues in C code)
    if '\\x00' in user_input or '\\0' in user_input:
        return {
            'valid': False,
            'reason': 'Null bytes not allowed'
        }

    # Check minimum length
    if len(user_input) < min_length:
        return {
            'valid': False,
            'reason': f'Input too short (minimum {min_length})'
        }

    # Check maximum length
    if len(user_input) > max_length:
        return {
            'valid': False,
            'reason': f'Input too long (maximum {max_length})'
        }

    return {
        'valid': True,
        'reason': 'Input valid'
    }`,
    testCases: [
      { input: '"validinput", 5, 20', expectedOutput: "{'valid': True, 'reason': 'Input valid'}", isHidden: false, description: 'Valid length' },
      { input: '"abc", 5, 20', expectedOutput: "{'valid': False, 'reason': 'Input too short (minimum 5)'}", isHidden: false, description: 'Too short' },
      { input: '"verylonginputthatexceedsmaximum", 5, 20', expectedOutput: "{'valid': False, 'reason': 'Input too long (maximum 20)'}", isHidden: false, description: 'Too long' },
      { input: '"test\\\\x00data", 5, 20', expectedOutput: "{'valid': False, 'reason': 'Null bytes not allowed'}", isHidden: true, description: 'Contains null byte' }
    ],
    hints: ['Check for null bytes first', 'Validate minimum length', 'Validate maximum length', 'Length limits prevent buffer overflows and DoS', 'Return descriptive error messages'],
    language: 'python'
  }
];
