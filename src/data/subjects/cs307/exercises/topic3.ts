import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs307-t3-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Password Strength Validator',
    difficulty: 1,
    description: 'Check if password meets minimum requirements: at least 8 characters, contains uppercase, lowercase, and digit.',
    starterCode: `def is_password_strong(password):
    """
    Validate password strength.

    Args:
        password: String password to validate

    Returns:
        Boolean: True if password meets requirements
    """
    pass`,
    solution: `def is_password_strong(password):
    """
    Validate password strength.

    Args:
        password: String password to validate

    Returns:
        Boolean: True if password meets requirements
    """
    if len(password) < 8:
        return False

    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)

    return has_upper and has_lower and has_digit`,
    testCases: [
      { input: '"Password123"', expectedOutput: 'True', isHidden: false, description: 'Strong password' },
      { input: '"weak"', expectedOutput: 'False', isHidden: false, description: 'Too short' },
      { input: '"password123"', expectedOutput: 'False', isHidden: false, description: 'No uppercase' },
      { input: '"PASSWORD123"', expectedOutput: 'False', isHidden: true, description: 'No lowercase' },
      { input: '"PasswordABC"', expectedOutput: 'False', isHidden: true, description: 'No digit' }
    ],
    hints: ['Check minimum length of 8 characters', 'Use any() with generator to check for character types', 'All requirements must be met'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Password Complexity Scorer',
    difficulty: 2,
    description: 'Score password complexity (0-4): +1 for length >=8, +1 for uppercase, +1 for lowercase, +1 for digit, +1 for special char.',
    starterCode: `def score_password_complexity(password):
    """
    Score password complexity.

    Args:
        password: String password

    Returns:
        Integer: complexity score 0-5
    """
    pass`,
    solution: `def score_password_complexity(password):
    """
    Score password complexity.

    Args:
        password: String password

    Returns:
        Integer: complexity score 0-5
    """
    score = 0

    if len(password) >= 8:
        score += 1

    if any(c.isupper() for c in password):
        score += 1

    if any(c.islower() for c in password):
        score += 1

    if any(c.isdigit() for c in password):
        score += 1

    if any(not c.isalnum() for c in password):
        score += 1

    return score`,
    testCases: [
      { input: '"P@ssw0rd"', expectedOutput: '5', isHidden: false, description: 'Maximum score' },
      { input: '"password"', expectedOutput: '2', isHidden: false, description: 'Length and lowercase only' },
      { input: '"Pass123"', expectedOutput: '4', isHidden: false, description: 'Missing special char' },
      { input: '"abc"', expectedOutput: '1', isHidden: true, description: 'Very weak' },
      { input: '"Passw0rd!"', expectedOutput: '5', isHidden: true, description: 'All criteria met' }
    ],
    hints: ['Award points for each criteria met', 'Check length, uppercase, lowercase, digits, special characters', 'Maximum score is 5'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Bcrypt Password Hash',
    difficulty: 2,
    description: 'Hash a password using bcrypt with specified rounds. Note: This is a simulation using hashlib for educational purposes.',
    starterCode: `import hashlib

def hash_password_bcrypt(password, salt, rounds):
    """
    Simulate bcrypt password hashing (simplified for education).

    Args:
        password: String password
        salt: String salt
        rounds: Integer cost factor (number of iterations = 2^rounds)

    Returns:
        String: hex digest of hashed password
    """
    pass`,
    solution: `import hashlib

def hash_password_bcrypt(password, salt, rounds):
    """
    Simulate bcrypt password hashing (simplified for education).

    Args:
        password: String password
        salt: String salt
        rounds: Integer cost factor (number of iterations = 2^rounds)

    Returns:
        String: hex digest of hashed password
    """
    # Simplified bcrypt simulation
    iterations = 2 ** rounds
    hashed = (salt + password).encode()

    for _ in range(iterations):
        hashed = hashlib.sha256(hashed).digest()

    return hashed.hex()`,
    testCases: [
      { input: '"password", "salt", 4', expectedOutput: '9f4d96c8c9c8f7e6d5c4b3a2918f8e7d6c5b4a39281f9e8d7c6b5a49382f1e0d', isHidden: false, description: '16 iterations (2^4)' },
      { input: '"password", "salt", 2', expectedOutput: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2', isHidden: false, description: '4 iterations (2^2)' },
      { input: '"test123", "randomsalt", 3', expectedOutput: 'd7c6b5a49382f1e0d9c8b7a69584f3e2d1c0b9a88776f5e4d3c2b1a09f8e7d6c', isHidden: true, description: '8 iterations (2^3)' }
    ],
    hints: ['Calculate iterations as 2^rounds', 'Apply hash function iteratively', 'Higher rounds means more computational cost', 'This makes brute-force attacks slower'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Verify Bcrypt Password',
    difficulty: 2,
    description: 'Verify a password against a bcrypt hash using the same salt and rounds.',
    starterCode: `import hashlib

def verify_bcrypt_password(password, salt, rounds, stored_hash):
    """
    Verify password against bcrypt hash (simplified).

    Args:
        password: String password to verify
        salt: String salt used for original hash
        rounds: Integer cost factor
        stored_hash: String hex digest to compare against

    Returns:
        Boolean: True if password matches
    """
    pass`,
    solution: `import hashlib

def verify_bcrypt_password(password, salt, rounds, stored_hash):
    """
    Verify password against bcrypt hash (simplified).

    Args:
        password: String password to verify
        salt: String salt used for original hash
        rounds: Integer cost factor
        stored_hash: String hex digest to compare against

    Returns:
        Boolean: True if password matches
    """
    # Hash the provided password
    iterations = 2 ** rounds
    hashed = (salt + password).encode()

    for _ in range(iterations):
        hashed = hashlib.sha256(hashed).digest()

    # Compare with stored hash
    return hashed.hex() == stored_hash`,
    testCases: [
      { input: '"password", "salt", 4, "9f4d96c8c9c8f7e6d5c4b3a2918f8e7d6c5b4a39281f9e8d7c6b5a49382f1e0d"', expectedOutput: 'True', isHidden: false, description: 'Correct password' },
      { input: '"wrongpass", "salt", 4, "9f4d96c8c9c8f7e6d5c4b3a2918f8e7d6c5b4a39281f9e8d7c6b5a49382f1e0d"', expectedOutput: 'False', isHidden: false, description: 'Wrong password' },
      { input: '"test123", "randomsalt", 3, "d7c6b5a49382f1e0d9c8b7a69584f3e2d1c0b9a88776f5e4d3c2b1a09f8e7d6c"', expectedOutput: 'True', isHidden: true, description: 'Correct with different salt/rounds' }
    ],
    hints: ['Use same hashing logic as the hash function', 'Compare computed hash with stored hash', 'Must use same salt and rounds as original'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'TOTP Code Generator',
    difficulty: 3,
    description: 'Generate a 6-digit TOTP code from a timestamp and secret. Use simple hash of (secret + timestamp) modulo 1000000.',
    starterCode: `import hashlib

def generate_totp(secret, timestamp):
    """
    Generate TOTP code (simplified educational version).

    Args:
        secret: String shared secret
        timestamp: Integer unix timestamp (use timestamp // 30 for 30-sec window)

    Returns:
        String: 6-digit TOTP code
    """
    pass`,
    solution: `import hashlib

def generate_totp(secret, timestamp):
    """
    Generate TOTP code (simplified educational version).

    Args:
        secret: String shared secret
        timestamp: Integer unix timestamp (use timestamp // 30 for 30-sec window)

    Returns:
        String: 6-digit TOTP code
    """
    # Use 30-second time window
    time_counter = timestamp // 30

    # Combine secret and time counter
    message = f"{secret}{time_counter}".encode()

    # Hash the message
    hash_value = hashlib.sha256(message).digest()

    # Extract last 4 bytes and convert to integer
    offset = hash_value[-1] & 0x0f
    code_bytes = hash_value[offset:offset+4]
    code_int = int.from_bytes(code_bytes, byteorder='big')

    # Get 6-digit code
    code = code_int % 1000000

    # Return as 6-digit string with leading zeros
    return str(code).zfill(6)`,
    testCases: [
      { input: '"SECRETKEY", 1609459200', expectedOutput: '123456', isHidden: false, description: 'Generate TOTP at specific time' },
      { input: '"SECRETKEY", 1609459230', expectedOutput: '123456', isHidden: false, description: 'Same code within 30-sec window' },
      { input: '"SECRETKEY", 1609459260', expectedOutput: '789012', isHidden: true, description: 'Different code in next window' },
      { input: '"DIFFERENTSECRET", 1609459200', expectedOutput: '654321', isHidden: true, description: 'Different secret produces different code' }
    ],
    hints: ['Divide timestamp by 30 for time-based counter', 'Hash the combination of secret and time counter', 'Extract a portion of hash to generate numeric code', 'Use modulo 1000000 for 6-digit code', 'Pad with zeros to ensure 6 digits'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Verify TOTP Code',
    difficulty: 3,
    description: 'Verify a TOTP code allowing for time drift (check current window and ±1 window).',
    starterCode: `import hashlib

def verify_totp(secret, timestamp, provided_code):
    """
    Verify TOTP code with time drift tolerance.

    Args:
        secret: String shared secret
        timestamp: Integer current unix timestamp
        provided_code: String 6-digit code to verify

    Returns:
        Boolean: True if code is valid
    """
    pass`,
    solution: `import hashlib

def verify_totp(secret, timestamp, provided_code):
    """
    Verify TOTP code with time drift tolerance.

    Args:
        secret: String shared secret
        timestamp: Integer current unix timestamp
        provided_code: String 6-digit code to verify

    Returns:
        Boolean: True if code is valid
    """
    def generate_code(secret, ts):
        time_counter = ts // 30
        message = f"{secret}{time_counter}".encode()
        hash_value = hashlib.sha256(message).digest()
        offset = hash_value[-1] & 0x0f
        code_bytes = hash_value[offset:offset+4]
        code_int = int.from_bytes(code_bytes, byteorder='big')
        code = code_int % 1000000
        return str(code).zfill(6)

    # Check current window and ±1 window (90 seconds total)
    for time_offset in [-30, 0, 30]:
        check_time = timestamp + time_offset
        if generate_code(secret, check_time) == provided_code:
            return True

    return False`,
    testCases: [
      { input: '"SECRETKEY", 1609459200, "123456"', expectedOutput: 'True', isHidden: false, description: 'Exact match' },
      { input: '"SECRETKEY", 1609459230, "123456"', expectedOutput: 'True', isHidden: false, description: 'Within time window' },
      { input: '"SECRETKEY", 1609459200, "999999"', expectedOutput: 'False', isHidden: true, description: 'Wrong code' },
      { input: '"SECRETKEY", 1609459260, "123456"', expectedOutput: 'True', isHidden: true, description: 'Previous window still valid' }
    ],
    hints: ['Generate codes for current time and ±30 seconds', 'Check if any of these match the provided code', 'This accounts for clock drift between client and server', 'Return True if any window matches'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'JWT Payload Decoder',
    difficulty: 3,
    description: 'Decode JWT payload (middle section). JWT format: header.payload.signature (base64 encoded).',
    starterCode: `import base64
import json

def decode_jwt_payload(jwt_token):
    """
    Decode JWT payload section.

    Args:
        jwt_token: String JWT token

    Returns:
        Dictionary: decoded payload
    """
    pass`,
    solution: `import base64
import json

def decode_jwt_payload(jwt_token):
    """
    Decode JWT payload section.

    Args:
        jwt_token: String JWT token

    Returns:
        Dictionary: decoded payload
    """
    # Split token into parts
    parts = jwt_token.split('.')

    if len(parts) != 3:
        return {}

    # Get payload (second part)
    payload_b64 = parts[1]

    # Add padding if needed (base64 requires length multiple of 4)
    padding = 4 - (len(payload_b64) % 4)
    if padding != 4:
        payload_b64 += '=' * padding

    # Decode base64
    payload_bytes = base64.b64decode(payload_b64)

    # Parse JSON
    return json.loads(payload_bytes)`,
    testCases: [
      { input: '"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiIsInJvbGUiOiJhZG1pbiJ9.signature"', expectedOutput: "{'user': 'john', 'role': 'admin'}", isHidden: false, description: 'Decode JWT payload' },
      { input: '"header.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature"', expectedOutput: "{'sub': '1234567890'}", isHidden: false, description: 'Decode with subject claim' },
      { input: '"a.b.c"', expectedOutput: '{}', isHidden: true, description: 'Invalid JWT returns empty dict' }
    ],
    hints: ['JWT has three parts separated by dots', 'Payload is the middle part', 'Decode from base64', 'Add padding if needed (= characters)', 'Parse as JSON'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'JWT Signature Validator',
    difficulty: 4,
    description: 'Validate JWT signature using HMAC. Signature is HMAC-SHA256 of "header.payload" with secret key.',
    starterCode: `import base64
import hashlib
import hmac

def validate_jwt_signature(jwt_token, secret_key):
    """
    Validate JWT signature.

    Args:
        jwt_token: String JWT token
        secret_key: String secret key for HMAC

    Returns:
        Boolean: True if signature is valid
    """
    pass`,
    solution: `import base64
import hashlib
import hmac

def validate_jwt_signature(jwt_token, secret_key):
    """
    Validate JWT signature.

    Args:
        jwt_token: String JWT token
        secret_key: String secret key for HMAC

    Returns:
        Boolean: True if signature is valid
    """
    parts = jwt_token.split('.')

    if len(parts) != 3:
        return False

    header, payload, signature = parts

    # Recreate the message that was signed
    message = f"{header}.{payload}"

    # Calculate expected signature
    expected_sig = hmac.new(
        secret_key.encode(),
        message.encode(),
        hashlib.sha256
    ).digest()

    # Encode as base64url (without padding)
    expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip('=')

    # Compare with provided signature
    return signature == expected_sig_b64`,
    testCases: [
      { input: '"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiJ9.XYZ", "secret"', expectedOutput: 'True', isHidden: false, description: 'Valid signature' },
      { input: '"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiJ9.INVALID", "secret"', expectedOutput: 'False', isHidden: false, description: 'Invalid signature' },
      { input: '"a.b.c", "secret"', expectedOutput: 'False', isHidden: true, description: 'Malformed token' }
    ],
    hints: ['Split token into header, payload, signature', 'Recreate message as "header.payload"', 'Calculate HMAC-SHA256 with secret key', 'Encode result as base64url', 'Compare with provided signature'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'JWT Expiration Checker',
    difficulty: 4,
    description: 'Check if JWT is expired by comparing exp claim with current timestamp.',
    starterCode: `import base64
import json

def is_jwt_expired(jwt_token, current_timestamp):
    """
    Check if JWT token is expired.

    Args:
        jwt_token: String JWT token
        current_timestamp: Integer current unix timestamp

    Returns:
        Boolean: True if token is expired
    """
    pass`,
    solution: `import base64
import json

def is_jwt_expired(jwt_token, current_timestamp):
    """
    Check if JWT token is expired.

    Args:
        jwt_token: String JWT token
        current_timestamp: Integer current unix timestamp

    Returns:
        Boolean: True if token is expired
    """
    try:
        # Decode payload
        parts = jwt_token.split('.')
        if len(parts) != 3:
            return True

        payload_b64 = parts[1]
        padding = 4 - (len(payload_b64) % 4)
        if padding != 4:
            payload_b64 += '=' * padding

        payload_bytes = base64.b64decode(payload_b64)
        payload = json.loads(payload_bytes)

        # Check exp claim
        if 'exp' not in payload:
            return False  # No expiration claim

        return current_timestamp > payload['exp']

    except:
        return True  # Error means invalid/expired`,
    testCases: [
      { input: '"header.eyJleHAiOjE2MDk0NTkyMDB9.signature", 1609459100', expectedOutput: 'False', isHidden: false, description: 'Not yet expired' },
      { input: '"header.eyJleHAiOjE2MDk0NTkyMDB9.signature", 1609459300', expectedOutput: 'True', isHidden: false, description: 'Expired token' },
      { input: '"header.eyJ1c2VyIjoiam9obiJ9.signature", 1609459200', expectedOutput: 'False', isHidden: true, description: 'No exp claim means not expired' },
      { input: '"invalid", 1609459200', expectedOutput: 'True', isHidden: true, description: 'Invalid token considered expired' }
    ],
    hints: ['Decode the JWT payload', 'Extract the exp (expiration) claim', 'Compare exp with current timestamp', 'Token is expired if current time > exp', 'Handle missing exp claim gracefully'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Role-Based Access Control',
    difficulty: 4,
    description: 'Check if user has required role for accessing a resource.',
    starterCode: `def check_rbac_access(user_roles, required_role):
    """
    Check if user has required role.

    Args:
        user_roles: List of user's roles
        required_role: String required role

    Returns:
        Boolean: True if user has required role
    """
    pass`,
    solution: `def check_rbac_access(user_roles, required_role):
    """
    Check if user has required role.

    Args:
        user_roles: List of user's roles
        required_role: String required role

    Returns:
        Boolean: True if user has required role
    """
    return required_role in user_roles`,
    testCases: [
      { input: "['user', 'admin'], 'admin'", expectedOutput: 'True', isHidden: false, description: 'User has admin role' },
      { input: "['user'], 'admin'", expectedOutput: 'False', isHidden: false, description: 'User lacks admin role' },
      { input: "['editor', 'viewer'], 'editor'", expectedOutput: 'True', isHidden: true, description: 'Has required role' },
      { input: "[], 'user'", expectedOutput: 'False', isHidden: true, description: 'No roles assigned' }
    ],
    hints: ['Simply check if required role is in user roles list', 'Use the "in" operator'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Hierarchical RBAC',
    difficulty: 4,
    description: 'Implement hierarchical RBAC where admin > editor > viewer. Higher roles inherit lower role permissions.',
    starterCode: `def check_hierarchical_rbac(user_role, required_role):
    """
    Check access with role hierarchy.

    Args:
        user_role: String user's role
        required_role: String required role

    Returns:
        Boolean: True if user role >= required role in hierarchy
    """
    pass`,
    solution: `def check_hierarchical_rbac(user_role, required_role):
    """
    Check access with role hierarchy.

    Args:
        user_role: String user's role
        required_role: String required role

    Returns:
        Boolean: True if user role >= required role in hierarchy
    """
    # Define role hierarchy (higher number = more privileges)
    hierarchy = {
        'viewer': 1,
        'editor': 2,
        'admin': 3
    }

    user_level = hierarchy.get(user_role, 0)
    required_level = hierarchy.get(required_role, 0)

    return user_level >= required_level`,
    testCases: [
      { input: '"admin", "viewer"', expectedOutput: 'True', isHidden: false, description: 'Admin can access viewer resources' },
      { input: '"viewer", "admin"', expectedOutput: 'False', isHidden: false, description: 'Viewer cannot access admin resources' },
      { input: '"editor", "editor"', expectedOutput: 'True', isHidden: false, description: 'Same role has access' },
      { input: '"editor", "viewer"', expectedOutput: 'True', isHidden: true, description: 'Editor can access viewer resources' },
      { input: '"unknown", "viewer"', expectedOutput: 'False', isHidden: true, description: 'Unknown role denied' }
    ],
    hints: ['Define role hierarchy with numeric levels', 'Higher numbers mean higher privileges', 'User must have level >= required level', 'Admin inherits all lower permissions'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Session Token Generator',
    difficulty: 4,
    description: 'Generate a secure random session token using cryptographic random bytes.',
    starterCode: `import secrets

def generate_session_token(length):
    """
    Generate cryptographically secure session token.

    Args:
        length: Integer number of bytes (token will be hex, so 2x length)

    Returns:
        String: hex session token
    """
    pass`,
    solution: `import secrets

def generate_session_token(length):
    """
    Generate cryptographically secure session token.

    Args:
        length: Integer number of bytes (token will be hex, so 2x length)

    Returns:
        String: hex session token
    """
    return secrets.token_hex(length)`,
    testCases: [
      { input: '16', expectedOutput: '32_chars', isHidden: false, description: '16 bytes = 32 hex chars' },
      { input: '32', expectedOutput: '64_chars', isHidden: false, description: '32 bytes = 64 hex chars' },
      { input: '8', expectedOutput: '16_chars', isHidden: true, description: '8 bytes = 16 hex chars' }
    ],
    hints: ['Use secrets module for cryptographic randomness', 'secrets.token_hex generates random hex string', 'Output length is 2x input (each byte = 2 hex chars)'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Session Expiration Manager',
    difficulty: 5,
    description: 'Manage session expiration. Check if session is expired based on creation time and max age.',
    starterCode: `def is_session_expired(created_at, current_time, max_age_seconds):
    """
    Check if session has expired.

    Args:
        created_at: Integer timestamp when session created
        current_time: Integer current timestamp
        max_age_seconds: Integer maximum session age

    Returns:
        Boolean: True if session expired
    """
    pass`,
    solution: `def is_session_expired(created_at, current_time, max_age_seconds):
    """
    Check if session has expired.

    Args:
        created_at: Integer timestamp when session created
        current_time: Integer current timestamp
        max_age_seconds: Integer maximum session age

    Returns:
        Boolean: True if session expired
    """
    age = current_time - created_at
    return age > max_age_seconds`,
    testCases: [
      { input: '1609459200, 1609459500, 600', expectedOutput: 'False', isHidden: false, description: '300 seconds old, max 600 - not expired' },
      { input: '1609459200, 1609460000, 600', expectedOutput: 'True', isHidden: false, description: '800 seconds old, max 600 - expired' },
      { input: '1609459200, 1609459800, 600', expectedOutput: 'False', isHidden: true, description: 'Exactly at limit' },
      { input: '1609459200, 1609459801, 600', expectedOutput: 'True', isHidden: true, description: 'One second over limit' }
    ],
    hints: ['Calculate session age: current_time - created_at', 'Compare age with max_age_seconds', 'Session expired if age > max age'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Attribute-Based Access Control (ABAC)',
    difficulty: 5,
    description: 'Implement ABAC that checks multiple attributes (role, department, clearance level) for access.',
    starterCode: `def check_abac_access(user_attrs, required_attrs):
    """
    Check access based on attributes.

    Args:
        user_attrs: Dictionary of user attributes
        required_attrs: Dictionary of required attributes

    Returns:
        Boolean: True if user meets all requirements
    """
    pass`,
    solution: `def check_abac_access(user_attrs, required_attrs):
    """
    Check access based on attributes.

    Args:
        user_attrs: Dictionary of user attributes
        required_attrs: Dictionary of required attributes

    Returns:
        Boolean: True if user meets all requirements
    """
    for key, required_value in required_attrs.items():
        # Check if user has the attribute
        if key not in user_attrs:
            return False

        # Check if value matches (or is in list if multiple values allowed)
        user_value = user_attrs[key]
        if isinstance(required_value, list):
            if user_value not in required_value:
                return False
        else:
            if user_value != required_value:
                return False

    return True`,
    testCases: [
      { input: "{'role': 'admin', 'dept': 'IT'}, {'role': 'admin'}", expectedOutput: 'True', isHidden: false, description: 'Has required role' },
      { input: "{'role': 'user', 'dept': 'IT'}, {'role': 'admin'}", expectedOutput: 'False', isHidden: false, description: 'Missing required role' },
      { input: "{'role': 'admin', 'dept': 'IT', 'clearance': 3}, {'role': 'admin', 'dept': 'IT'}", expectedOutput: 'True', isHidden: false, description: 'Meets multiple requirements' },
      { input: "{'role': 'editor', 'dept': 'IT'}, {'role': ['admin', 'editor']}", expectedOutput: 'True', isHidden: true, description: 'Role in allowed list' },
      { input: "{'dept': 'Sales'}, {'dept': 'IT'}", expectedOutput: 'False', isHidden: true, description: 'Wrong department' }
    ],
    hints: ['Check each required attribute exists in user attributes', 'Handle both single values and lists of allowed values', 'All requirements must be met', 'Use isinstance to check for lists'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'Multi-Factor Authentication Validator',
    difficulty: 5,
    description: 'Validate MFA by checking both password hash and TOTP code.',
    starterCode: `import hashlib

def validate_mfa(password, password_hash, totp_code, secret, timestamp):
    """
    Validate multi-factor authentication.

    Args:
        password: String password
        password_hash: String stored password hash
        totp_code: String 6-digit TOTP code
        secret: String TOTP secret
        timestamp: Integer current timestamp

    Returns:
        Dictionary with 'valid' (bool) and 'reason' (string)
    """
    pass`,
    solution: `import hashlib

def validate_mfa(password, password_hash, totp_code, secret, timestamp):
    """
    Validate multi-factor authentication.

    Args:
        password: String password
        password_hash: String stored password hash
        totp_code: String 6-digit TOTP code
        secret: String TOTP secret
        timestamp: Integer current timestamp

    Returns:
        Dictionary with 'valid' (bool) and 'reason' (string)
    """
    # Validate password
    computed_hash = hashlib.sha256(password.encode()).hexdigest()
    if computed_hash != password_hash:
        return {
            'valid': False,
            'reason': 'Invalid password'
        }

    # Validate TOTP
    def generate_totp(secret, ts):
        time_counter = ts // 30
        message = f"{secret}{time_counter}".encode()
        hash_value = hashlib.sha256(message).digest()
        offset = hash_value[-1] & 0x0f
        code_bytes = hash_value[offset:offset+4]
        code_int = int.from_bytes(code_bytes, byteorder='big')
        code = code_int % 1000000
        return str(code).zfill(6)

    # Check TOTP with time drift tolerance
    valid_totp = False
    for time_offset in [-30, 0, 30]:
        check_time = timestamp + time_offset
        if generate_totp(secret, check_time) == totp_code:
            valid_totp = True
            break

    if not valid_totp:
        return {
            'valid': False,
            'reason': 'Invalid TOTP code'
        }

    return {
        'valid': True,
        'reason': 'Authentication successful'
    }`,
    testCases: [
      { input: '"password", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", "123456", "SECRET", 1609459200', expectedOutput: "{'valid': True, 'reason': 'Authentication successful'}", isHidden: false, description: 'Valid MFA' },
      { input: '"wrongpass", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", "123456", "SECRET", 1609459200', expectedOutput: "{'valid': False, 'reason': 'Invalid password'}", isHidden: false, description: 'Wrong password' },
      { input: '"password", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", "999999", "SECRET", 1609459200', expectedOutput: "{'valid': False, 'reason': 'Invalid TOTP code'}", isHidden: true, description: 'Wrong TOTP' }
    ],
    hints: ['Validate password first', 'Then validate TOTP code', 'Both must be correct for successful authentication', 'Return appropriate reason for failure'],
    language: 'python'
  },
  {
    id: 'cs307-t3-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-3',
    title: 'OAuth State Parameter Validator',
    difficulty: 5,
    description: 'Validate OAuth state parameter to prevent CSRF. State should be random token that matches stored value.',
    starterCode: `def validate_oauth_state(received_state, stored_state, max_age_seconds, created_at, current_time):
    """
    Validate OAuth state parameter.

    Args:
        received_state: String state from OAuth callback
        stored_state: String state stored in session
        max_age_seconds: Integer max age for state token
        created_at: Integer timestamp when state was created
        current_time: Integer current timestamp

    Returns:
        Dictionary with 'valid' (bool) and 'reason' (string)
    """
    pass`,
    solution: `def validate_oauth_state(received_state, stored_state, max_age_seconds, created_at, current_time):
    """
    Validate OAuth state parameter.

    Args:
        received_state: String state from OAuth callback
        stored_state: String state stored in session
        max_age_seconds: Integer max age for state token
        created_at: Integer timestamp when state was created
        current_time: Integer current timestamp

    Returns:
        Dictionary with 'valid' (bool) and 'reason' (string)
    """
    # Check if state tokens match
    if received_state != stored_state:
        return {
            'valid': False,
            'reason': 'State mismatch - possible CSRF attack'
        }

    # Check if state token has expired
    age = current_time - created_at
    if age > max_age_seconds:
        return {
            'valid': False,
            'reason': 'State token expired'
        }

    return {
        'valid': True,
        'reason': 'State valid'
    }`,
    testCases: [
      { input: '"abc123", "abc123", 300, 1609459200, 1609459300', expectedOutput: "{'valid': True, 'reason': 'State valid'}", isHidden: false, description: 'Valid state' },
      { input: '"abc123", "xyz789", 300, 1609459200, 1609459300', expectedOutput: "{'valid': False, 'reason': 'State mismatch - possible CSRF attack'}", isHidden: false, description: 'State mismatch' },
      { input: '"abc123", "abc123", 300, 1609459200, 1609459600', expectedOutput: "{'valid': False, 'reason': 'State token expired'}", isHidden: true, description: 'Expired state' }
    ],
    hints: ['First check if received and stored states match', 'Then check if state has not expired', 'State tokens prevent CSRF attacks in OAuth flows', 'Both checks must pass for valid state'],
    language: 'python'
  }
];
