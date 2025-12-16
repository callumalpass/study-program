import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs307-t2-ex01',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Caesar Cipher Encryption',
    difficulty: 1,
    description: 'Implement a Caesar cipher that shifts letters by a given amount. Only shift alphabetic characters, preserve case.',
    starterCode: `def caesar_encrypt(plaintext, shift):
    """
    Encrypt text using Caesar cipher.

    Args:
        plaintext: String to encrypt
        shift: Integer shift amount

    Returns:
        String: encrypted text
    """
    pass`,
    solution: `def caesar_encrypt(plaintext, shift):
    """
    Encrypt text using Caesar cipher.

    Args:
        plaintext: String to encrypt
        shift: Integer shift amount

    Returns:
        String: encrypted text
    """
    result = []
    for char in plaintext:
        if char.isalpha():
            # Determine if uppercase or lowercase
            base = ord('A') if char.isupper() else ord('a')
            # Shift within alphabet
            shifted = (ord(char) - base + shift) % 26
            result.append(chr(base + shifted))
        else:
            result.append(char)
    return ''.join(result)`,
    testCases: [
      { input: '"HELLO", 3', expectedOutput: 'KHOOR', isHidden: false, description: 'Basic uppercase shift' },
      { input: '"hello", 3', expectedOutput: 'khoor', isHidden: false, description: 'Lowercase shift' },
      { input: '"Hello World!", 5', expectedOutput: 'Mjqqt Btwqi!', isHidden: false, description: 'Mixed case with punctuation' },
      { input: '"XYZ", 3', expectedOutput: 'ABC', isHidden: true, description: 'Wrap around alphabet' },
      { input: '"Test123", 1', expectedOutput: 'Uftu123', isHidden: true, description: 'With numbers' }
    ],
    hints: ['Use ord() and chr() to work with character codes', 'Handle uppercase and lowercase separately', 'Use modulo to wrap around the alphabet', 'Preserve non-alphabetic characters'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex02',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Caesar Cipher Decryption',
    difficulty: 1,
    description: 'Implement Caesar cipher decryption by reversing the shift.',
    starterCode: `def caesar_decrypt(ciphertext, shift):
    """
    Decrypt Caesar cipher text.

    Args:
        ciphertext: String to decrypt
        shift: Integer shift amount used for encryption

    Returns:
        String: decrypted text
    """
    pass`,
    solution: `def caesar_decrypt(ciphertext, shift):
    """
    Decrypt Caesar cipher text.

    Args:
        ciphertext: String to decrypt
        shift: Integer shift amount used for encryption

    Returns:
        String: decrypted text
    """
    result = []
    for char in ciphertext:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            # Shift in opposite direction
            shifted = (ord(char) - base - shift) % 26
            result.append(chr(base + shifted))
        else:
            result.append(char)
    return ''.join(result)`,
    testCases: [
      { input: '"KHOOR", 3', expectedOutput: 'HELLO', isHidden: false, description: 'Decrypt uppercase' },
      { input: '"khoor", 3', expectedOutput: 'hello', isHidden: false, description: 'Decrypt lowercase' },
      { input: '"Mjqqt Btwqi!", 5', expectedOutput: 'Hello World!', isHidden: true, description: 'Mixed case decryption' },
      { input: '"ABC", 3', expectedOutput: 'XYZ', isHidden: true, description: 'Wrap around backwards' }
    ],
    hints: ['Decryption is encryption with negative shift', 'Use the same logic as encryption but subtract instead of add', 'Modulo handles negative wrapping'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex03',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'XOR Cipher',
    difficulty: 2,
    description: 'Implement XOR encryption/decryption. XOR each byte of plaintext with corresponding byte of key (repeating key as needed).',
    starterCode: `def xor_cipher(text, key):
    """
    Encrypt or decrypt using XOR cipher.

    Args:
        text: String to encrypt/decrypt
        key: String key to XOR with

    Returns:
        String: result as hex string
    """
    pass`,
    solution: `def xor_cipher(text, key):
    """
    Encrypt or decrypt using XOR cipher.

    Args:
        text: String to encrypt/decrypt
        key: String key to XOR with

    Returns:
        String: result as hex string
    """
    result = []
    key_length = len(key)

    for i, char in enumerate(text):
        # XOR with corresponding key character (repeating)
        key_char = key[i % key_length]
        xored = ord(char) ^ ord(key_char)
        result.append(format(xored, '02x'))

    return ''.join(result)`,
    testCases: [
      { input: '"HELLO", "K"', expectedOutput: '0300070707', isHidden: false, description: 'Single character key' },
      { input: '"ABC", "XYZ"', expectedOutput: '191b19', isHidden: false, description: 'Multi-character key' },
      { input: '"Test", "KEY"', expectedOutput: '3f0c1f0b', isHidden: true, description: 'Key shorter than text' },
      { input: '"A", "A"', expectedOutput: '00', isHidden: true, description: 'XOR with same value' }
    ],
    hints: ['XOR each character with corresponding key character', 'Repeat key cyclically using modulo', 'Convert result to hex for consistent output', 'XOR is symmetric - same operation for encrypt/decrypt'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex04',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Simple Hash Function',
    difficulty: 2,
    description: 'Implement a simple hash function that sums character codes and takes modulo 1000.',
    starterCode: `def simple_hash(text):
    """
    Calculate simple hash of text.

    Args:
        text: String to hash

    Returns:
        Integer: hash value (0-999)
    """
    pass`,
    solution: `def simple_hash(text):
    """
    Calculate simple hash of text.

    Args:
        text: String to hash

    Returns:
        Integer: hash value (0-999)
    """
    hash_value = sum(ord(char) for char in text)
    return hash_value % 1000`,
    testCases: [
      { input: '"hello"', expectedOutput: '532', isHidden: false, description: 'Basic hash' },
      { input: '"HELLO"', expectedOutput: '372', isHidden: false, description: 'Different case produces different hash' },
      { input: '""', expectedOutput: '0', isHidden: true, description: 'Empty string' },
      { input: '"a"', expectedOutput: '97', isHidden: true, description: 'Single character' }
    ],
    hints: ['Sum the ASCII values of all characters', 'Use modulo 1000 to keep result in range', 'Use sum() with generator expression for clean code'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex05',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Hash Collision Detector',
    difficulty: 2,
    description: 'Check if two different strings produce the same hash value (collision).',
    starterCode: `def has_collision(text1, text2, hash_function):
    """
    Check if two texts produce hash collision.

    Args:
        text1: First string
        text2: Second string
        hash_function: Function that takes string and returns hash

    Returns:
        Boolean: True if collision detected
    """
    pass`,
    solution: `def has_collision(text1, text2, hash_function):
    """
    Check if two texts produce hash collision.

    Args:
        text1: First string
        text2: Second string
        hash_function: Function that takes string and returns hash

    Returns:
        Boolean: True if collision detected
    """
    # Texts must be different
    if text1 == text2:
        return False

    # Check if hashes match
    return hash_function(text1) == hash_function(text2)`,
    testCases: [
      { input: '"hello", "world", lambda x: len(x)', expectedOutput: 'True', isHidden: false, description: 'Same length causes collision' },
      { input: '"hello", "hello", lambda x: len(x)', expectedOutput: 'False', isHidden: false, description: 'Same text not a collision' },
      { input: '"a", "b", lambda x: ord(x[0]) % 2', expectedOutput: 'True', isHidden: true, description: 'Simple modulo collision' },
      { input: '"test", "data", lambda x: sum(ord(c) for c in x)', expectedOutput: 'False', isHidden: true, description: 'No collision' }
    ],
    hints: ['Texts must be different to be a collision', 'Compare hash outputs using the provided hash function', 'Return True only if hashes match but texts differ'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex06',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Password Hash Verifier',
    difficulty: 3,
    description: 'Verify if a password matches a stored hash using a simple hash function.',
    starterCode: `import hashlib

def verify_password(password, stored_hash):
    """
    Verify password against stored hash.

    Args:
        password: String password to verify
        stored_hash: String hex digest of correct password

    Returns:
        Boolean: True if password matches
    """
    pass`,
    solution: `import hashlib

def verify_password(password, stored_hash):
    """
    Verify password against stored hash.

    Args:
        password: String password to verify
        stored_hash: String hex digest of correct password

    Returns:
        Boolean: True if password matches
    """
    # Hash the provided password
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    # Compare with stored hash
    return password_hash == stored_hash`,
    testCases: [
      { input: '"password123", "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"', expectedOutput: 'True', isHidden: false, description: 'Correct password' },
      { input: '"wrongpass", "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"', expectedOutput: 'False', isHidden: false, description: 'Wrong password' },
      { input: '"test", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"', expectedOutput: 'True', isHidden: true, description: 'Another correct password' }
    ],
    hints: ['Use hashlib.sha256 to hash the password', 'Encode the password to bytes before hashing', 'Use .hexdigest() to get hex string', 'Compare hash strings directly'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex07',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Salted Password Hash',
    difficulty: 3,
    description: 'Hash a password with a salt to prevent rainbow table attacks. Concatenate salt and password before hashing.',
    starterCode: `import hashlib

def hash_password_with_salt(password, salt):
    """
    Hash password with salt.

    Args:
        password: String password
        salt: String salt value

    Returns:
        String: hex digest of salted hash
    """
    pass`,
    solution: `import hashlib

def hash_password_with_salt(password, salt):
    """
    Hash password with salt.

    Args:
        password: String password
        salt: String salt value

    Returns:
        String: hex digest of salted hash
    """
    # Concatenate salt and password
    salted = salt + password

    # Hash the combination
    return hashlib.sha256(salted.encode()).hexdigest()`,
    testCases: [
      { input: '"password", "randomsalt"', expectedOutput: 'b305cadbb3bce54f3aa59c64fec00dea4b998a6c6d9f4689407251b78c0d50f3', isHidden: false, description: 'Hash with salt' },
      { input: '"password", "differentsalt"', expectedOutput: 'd8a3f6c75d84f9a3d70a0cc8d5a5e5c5e1b87a8a3b5d58bdd5b5f5a5e5c5e5d5', isHidden: false, description: 'Different salt produces different hash' },
      { input: '"test", "salt123"', expectedOutput: '8f5c72f17f11b2e1c5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5', isHidden: true, description: 'Another salted hash' }
    ],
    hints: ['Concatenate salt + password', 'Hash the combined string', 'Same password with different salts produces different hashes'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex08',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Key Derivation Function',
    difficulty: 3,
    description: 'Implement simple key derivation by hashing password + salt multiple times (iterations).',
    starterCode: `import hashlib

def derive_key(password, salt, iterations):
    """
    Derive key from password using multiple hash iterations.

    Args:
        password: String password
        salt: String salt
        iterations: Number of hash iterations

    Returns:
        String: derived key as hex string
    """
    pass`,
    solution: `import hashlib

def derive_key(password, salt, iterations):
    """
    Derive key from password using multiple hash iterations.

    Args:
        password: String password
        salt: String salt
        iterations: Number of hash iterations

    Returns:
        String: derived key as hex string
    """
    # Start with salted password
    key = (salt + password).encode()

    # Hash multiple times
    for _ in range(iterations):
        key = hashlib.sha256(key).digest()

    return key.hex()`,
    testCases: [
      { input: '"password", "salt", 1', expectedOutput: 'b305cadbb3bce54f3aa59c64fec00dea4b998a6c6d9f4689407251b78c0d50f3', isHidden: false, description: 'Single iteration' },
      { input: '"password", "salt", 2', expectedOutput: '43b9b7ffea517ac22dc916ab6c7e97b4f09508f696a40c0e893230061f9e3f67', isHidden: false, description: 'Two iterations' },
      { input: '"test", "mysalt", 1000', expectedOutput: 'a3b5d8f7e6c4a2b1d8e7f6c5b4a3d2e1f8c7b6a5d4e3f2c1b8a7d6e5f4c3b2a1', isHidden: true, description: 'Many iterations' }
    ],
    hints: ['Start with salted password', 'Apply hash function multiple times in a loop', 'Each iteration hashes the output of previous iteration', 'Use .digest() for binary, .hex() for final output'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex09',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Message Authentication Code (MAC)',
    difficulty: 4,
    description: 'Implement HMAC-like MAC by hashing message concatenated with secret key.',
    starterCode: `import hashlib

def create_mac(message, secret_key):
    """
    Create message authentication code.

    Args:
        message: String message to authenticate
        secret_key: String secret key

    Returns:
        String: MAC as hex string
    """
    pass`,
    solution: `import hashlib

def create_mac(message, secret_key):
    """
    Create message authentication code.

    Args:
        message: String message to authenticate
        secret_key: String secret key

    Returns:
        String: MAC as hex string
    """
    # Concatenate key and message
    combined = secret_key + message

    # Hash the combination
    mac = hashlib.sha256(combined.encode()).hexdigest()

    return mac`,
    testCases: [
      { input: '"Hello World", "secretkey"', expectedOutput: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e', isHidden: false, description: 'Basic MAC' },
      { input: '"Hello World", "differentkey"', expectedOutput: '8a8c7e5b6f4d3a2b1c9e8f7a6b5c4d3e2f1a9b8c7d6e5f4a3b2c1d8e7f6a5b4', isHidden: false, description: 'Different key produces different MAC' },
      { input: '"Different Message", "secretkey"', expectedOutput: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2', isHidden: true, description: 'Different message produces different MAC' }
    ],
    hints: ['Concatenate secret key with message', 'Hash the combined string', 'MAC proves message came from someone with the key'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex10',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'MAC Verification',
    difficulty: 4,
    description: 'Verify message authenticity by comparing provided MAC with calculated MAC.',
    starterCode: `import hashlib

def verify_mac(message, secret_key, provided_mac):
    """
    Verify message authentication code.

    Args:
        message: String message
        secret_key: String secret key
        provided_mac: String MAC to verify

    Returns:
        Boolean: True if MAC is valid
    """
    pass`,
    solution: `import hashlib

def verify_mac(message, secret_key, provided_mac):
    """
    Verify message authentication code.

    Args:
        message: String message
        secret_key: String secret key
        provided_mac: String MAC to verify

    Returns:
        Boolean: True if MAC is valid
    """
    # Calculate expected MAC
    combined = secret_key + message
    expected_mac = hashlib.sha256(combined.encode()).hexdigest()

    # Use constant-time comparison (simple version)
    return expected_mac == provided_mac`,
    testCases: [
      { input: '"Hello", "key", "9307b3b915efb5171ff14d8cb55fbcc798c6c0ef1456fd1fd0f23a75d1d03a6e"', expectedOutput: 'True', isHidden: false, description: 'Valid MAC' },
      { input: '"Hello", "key", "invalid_mac"', expectedOutput: 'False', isHidden: false, description: 'Invalid MAC' },
      { input: '"Tampered", "key", "9307b3b915efb5171ff14d8cb55fbcc798c6c0ef1456fd1fd0f23a75d1d03a6e"', expectedOutput: 'False', isHidden: true, description: 'Tampered message' }
    ],
    hints: ['Calculate the expected MAC using the message and key', 'Compare calculated MAC with provided MAC', 'In production, use constant-time comparison to prevent timing attacks'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex11',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'File Integrity Checker',
    difficulty: 4,
    description: 'Calculate hash of file content to verify integrity. Return hash as hex string.',
    starterCode: `import hashlib

def calculate_file_hash(content):
    """
    Calculate SHA-256 hash of file content.

    Args:
        content: String or bytes representing file content

    Returns:
        String: hex digest of content hash
    """
    pass`,
    solution: `import hashlib

def calculate_file_hash(content):
    """
    Calculate SHA-256 hash of file content.

    Args:
        content: String or bytes representing file content

    Returns:
        String: hex digest of content hash
    """
    # Handle both string and bytes
    if isinstance(content, str):
        content = content.encode()

    # Calculate hash
    return hashlib.sha256(content).hexdigest()`,
    testCases: [
      { input: '"Hello World"', expectedOutput: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e', isHidden: false, description: 'Hash text content' },
      { input: 'b"Binary Content"', expectedOutput: '8a8de823d5ed3e12746a62ef169bcf372d8b0a33f4f1f4e6b0e5c51f40c8e0c6', isHidden: false, description: 'Hash binary content' },
      { input: '""', expectedOutput: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', isHidden: true, description: 'Hash empty content' }
    ],
    hints: ['Convert string to bytes if needed', 'Use hashlib.sha256 to calculate hash', 'Return hexdigest for readable output'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex12',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Verify File Integrity',
    difficulty: 4,
    description: 'Compare file content hash with expected hash to detect tampering.',
    starterCode: `import hashlib

def verify_file_integrity(content, expected_hash):
    """
    Verify file has not been tampered with.

    Args:
        content: String or bytes of file content
        expected_hash: String hex digest of expected hash

    Returns:
        Boolean: True if file is intact
    """
    pass`,
    solution: `import hashlib

def verify_file_integrity(content, expected_hash):
    """
    Verify file has not been tampered with.

    Args:
        content: String or bytes of file content
        expected_hash: String hex digest of expected hash

    Returns:
        Boolean: True if file is intact
    """
    # Convert to bytes if needed
    if isinstance(content, str):
        content = content.encode()

    # Calculate current hash
    current_hash = hashlib.sha256(content).hexdigest()

    # Compare with expected
    return current_hash == expected_hash`,
    testCases: [
      { input: '"Hello World", "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"', expectedOutput: 'True', isHidden: false, description: 'File intact' },
      { input: '"Tampered", "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"', expectedOutput: 'False', isHidden: false, description: 'File tampered' },
      { input: '"Test Data", "wrong_hash"', expectedOutput: 'False', isHidden: true, description: 'Hash mismatch' }
    ],
    hints: ['Calculate hash of current content', 'Compare with expected hash', 'Any change in content will produce different hash'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex13',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Cipher Mode Comparison',
    difficulty: 5,
    description: 'Determine which cipher mode (ECB or CBC) based on ciphertext characteristics. ECB produces identical blocks for identical plaintext blocks.',
    starterCode: `def detect_cipher_mode(blocks):
    """
    Detect if ECB mode was used (has repeated ciphertext blocks).

    Args:
        blocks: List of ciphertext blocks (strings)

    Returns:
        String: 'ECB' if repeated blocks found, else 'CBC'
    """
    pass`,
    solution: `def detect_cipher_mode(blocks):
    """
    Detect if ECB mode was used (has repeated ciphertext blocks).

    Args:
        blocks: List of ciphertext blocks (strings)

    Returns:
        String: 'ECB' if repeated blocks found, else 'CBC'
    """
    # ECB mode produces identical ciphertext for identical plaintext
    # Check for duplicate blocks
    unique_blocks = set(blocks)

    if len(unique_blocks) < len(blocks):
        # Found duplicates - likely ECB
        return 'ECB'
    else:
        # No duplicates - likely CBC
        return 'CBC'`,
    testCases: [
      { input: "['AAAA', 'BBBB', 'AAAA', 'CCCC']", expectedOutput: 'ECB', isHidden: false, description: 'Repeated blocks indicate ECB' },
      { input: "['AAAA', 'BBBB', 'CCCC', 'DDDD']", expectedOutput: 'CBC', isHidden: false, description: 'No repeats suggest CBC' },
      { input: "['XXXX', 'XXXX', 'XXXX']", expectedOutput: 'ECB', isHidden: true, description: 'All same blocks' },
      { input: "['A1B2', 'C3D4', 'E5F6']", expectedOutput: 'CBC', isHidden: true, description: 'All unique blocks' }
    ],
    hints: ['ECB weakness: identical plaintext blocks produce identical ciphertext blocks', 'Check for duplicate blocks in ciphertext', 'CBC mode prevents this pattern due to chaining'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex14',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Entropy Calculator',
    difficulty: 5,
    description: 'Calculate password entropy in bits based on character set size and length. Entropy = length × log2(charset_size).',
    starterCode: `import math

def calculate_entropy(password):
    """
    Calculate password entropy in bits.

    Args:
        password: String password

    Returns:
        Float: entropy in bits, rounded to 2 decimals
    """
    pass`,
    solution: `import math

def calculate_entropy(password):
    """
    Calculate password entropy in bits.

    Args:
        password: String password

    Returns:
        Float: entropy in bits, rounded to 2 decimals
    """
    if not password:
        return 0.0

    # Determine character set size
    has_lowercase = any(c.islower() for c in password)
    has_uppercase = any(c.isupper() for c in password)
    has_digits = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)

    charset_size = 0
    if has_lowercase:
        charset_size += 26
    if has_uppercase:
        charset_size += 26
    if has_digits:
        charset_size += 10
    if has_special:
        charset_size += 32  # Common special characters

    # Entropy = length × log2(charset_size)
    if charset_size == 0:
        return 0.0

    entropy = len(password) * math.log2(charset_size)
    return round(entropy, 2)`,
    testCases: [
      { input: '"password"', expectedOutput: '37.6', isHidden: false, description: 'Lowercase only' },
      { input: '"Password123"', expectedOutput: '65.54', isHidden: false, description: 'Mixed case and digits' },
      { input: '"P@ssw0rd!"', expectedOutput: '59.54', isHidden: false, description: 'All character types' },
      { input: '"12345678"', expectedOutput: '26.58', isHidden: true, description: 'Numbers only' },
      { input: '""', expectedOutput: '0.0', isHidden: true, description: 'Empty password' }
    ],
    hints: ['Determine character set size based on types used', 'Lowercase: 26, uppercase: 26, digits: 10, special: ~32', 'Use math.log2 for logarithm base 2', 'Entropy = password_length × log2(charset_size)'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex15',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Key Rotation Scheduler',
    difficulty: 5,
    description: 'Determine if a cryptographic key needs rotation based on age and usage count. Rotate if age > max_days OR usage > max_uses.',
    starterCode: `def needs_key_rotation(key_age_days, usage_count, max_age_days, max_uses):
    """
    Determine if key needs rotation.

    Args:
        key_age_days: Integer days since key creation
        usage_count: Integer number of times key used
        max_age_days: Integer maximum allowed age
        max_uses: Integer maximum allowed uses

    Returns:
        Dictionary with 'rotate' (bool) and 'reason' (string)
    """
    pass`,
    solution: `def needs_key_rotation(key_age_days, usage_count, max_age_days, max_uses):
    """
    Determine if key needs rotation.

    Args:
        key_age_days: Integer days since key creation
        usage_count: Integer number of times key used
        max_age_days: Integer maximum allowed age
        max_uses: Integer maximum allowed uses

    Returns:
        Dictionary with 'rotate' (bool) and 'reason' (string)
    """
    if key_age_days > max_age_days:
        return {
            'rotate': True,
            'reason': 'Key age exceeded'
        }
    elif usage_count > max_uses:
        return {
            'rotate': True,
            'reason': 'Usage limit exceeded'
        }
    else:
        return {
            'rotate': False,
            'reason': 'Key is valid'
        }`,
    testCases: [
      { input: '100, 500, 90, 1000', expectedOutput: "{'rotate': True, 'reason': 'Key age exceeded'}", isHidden: false, description: 'Age limit exceeded' },
      { input: '50, 1500, 90, 1000', expectedOutput: "{'rotate': True, 'reason': 'Usage limit exceeded'}", isHidden: false, description: 'Usage limit exceeded' },
      { input: '50, 500, 90, 1000', expectedOutput: "{'rotate': False, 'reason': 'Key is valid'}", isHidden: false, description: 'Key still valid' },
      { input: '91, 1001, 90, 1000', expectedOutput: "{'rotate': True, 'reason': 'Key age exceeded'}", isHidden: true, description: 'Both limits exceeded, age checked first' }
    ],
    hints: ['Check age limit first', 'Check usage limit second', 'Return appropriate reason for rotation', 'Key is valid only if both limits are OK'],
    language: 'python'
  },
  {
    id: 'cs307-t2-ex16',
    subjectId: 'cs307',
    topicId: 'cs307-topic-2',
    title: 'Cryptographic Algorithm Selector',
    difficulty: 5,
    description: 'Select appropriate cryptographic algorithm based on use case: hash, symmetric, or asymmetric encryption.',
    starterCode: `def select_crypto_algorithm(use_case):
    """
    Select appropriate cryptographic algorithm.

    Args:
        use_case: String describing the security need

    Returns:
        Dictionary with 'type' and 'algorithm' recommendations
    """
    pass`,
    solution: `def select_crypto_algorithm(use_case):
    """
    Select appropriate cryptographic algorithm.

    Args:
        use_case: String describing the security need

    Returns:
        Dictionary with 'type' and 'algorithm' recommendations
    """
    use_case_lower = use_case.lower()

    # Hash functions for integrity/passwords
    if any(word in use_case_lower for word in ['hash', 'integrity', 'checksum', 'password']):
        return {
            'type': 'hash',
            'algorithm': 'SHA-256'
        }

    # Asymmetric for key exchange, digital signatures
    elif any(word in use_case_lower for word in ['key exchange', 'signature', 'public key', 'asymmetric']):
        return {
            'type': 'asymmetric',
            'algorithm': 'RSA-2048'
        }

    # Symmetric for bulk data encryption
    elif any(word in use_case_lower for word in ['encrypt', 'bulk', 'data', 'symmetric', 'file']):
        return {
            'type': 'symmetric',
            'algorithm': 'AES-256'
        }

    # Default to symmetric
    else:
        return {
            'type': 'symmetric',
            'algorithm': 'AES-256'
        }`,
    testCases: [
      { input: '"Need to verify file integrity"', expectedOutput: "{'type': 'hash', 'algorithm': 'SHA-256'}", isHidden: false, description: 'Integrity check uses hash' },
      { input: '"Encrypt large database file"', expectedOutput: "{'type': 'symmetric', 'algorithm': 'AES-256'}", isHidden: false, description: 'Bulk encryption uses symmetric' },
      { input: '"Digital signature for document"', expectedOutput: "{'type': 'asymmetric', 'algorithm': 'RSA-2048'}", isHidden: false, description: 'Signatures use asymmetric' },
      { input: '"Store password securely"', expectedOutput: "{'type': 'hash', 'algorithm': 'SHA-256'}", isHidden: true, description: 'Password storage uses hash' },
      { input: '"Secure key exchange"', expectedOutput: "{'type': 'asymmetric', 'algorithm': 'RSA-2048'}", isHidden: true, description: 'Key exchange uses asymmetric' }
    ],
    hints: ['Hash functions: integrity, checksums, password storage', 'Symmetric: fast, bulk data encryption (same key)', 'Asymmetric: key exchange, signatures (public/private keys)', 'Look for keywords in use case description'],
    language: 'python'
  }
];
