# Introduction to Cryptography

## What is Cryptography?

Cryptography is the practice and study of techniques for secure communication in the presence of adversaries. It enables us to protect information by transforming it into a format that only authorized parties can understand. The word comes from the Greek words "kryptos" (hidden) and "graphein" (to write).

Modern cryptography goes beyond simple secret messages—it's fundamental to digital security, enabling:
- Confidential communications over insecure channels
- Verification of message integrity
- Authentication of identity
- Non-repudiation of transactions
- Secure storage of sensitive data

## Brief History of Cryptography

### Ancient Cryptography (Pre-1900s)

**Caesar Cipher (50 BCE)**
One of the earliest known ciphers, used by Julius Caesar to protect military messages.

```python
def caesar_cipher_encrypt(plaintext, shift):
    """Classic Caesar cipher - shift each letter"""
    result = ""
    for char in plaintext:
        if char.isalpha():
            # Shift character
            start = ord('A') if char.isupper() else ord('a')
            shifted = (ord(char) - start + shift) % 26
            result += chr(start + shifted)
        else:
            result += char
    return result

# Example
plaintext = "ATTACK AT DAWN"
ciphertext = caesar_cipher_encrypt(plaintext, 3)
print(f"Plaintext:  {plaintext}")
print(f"Ciphertext: {ciphertext}")  # "DWWDFN DW GDZQ"

# Weakness: Only 26 possible keys - trivially broken by trying all shifts
```

**Substitution Ciphers**
Replace each letter with another letter according to a key.

```python
def simple_substitution(plaintext, key_alphabet):
    """Substitution cipher with arbitrary alphabet mapping"""
    normal_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    result = ""

    for char in plaintext.upper():
        if char in normal_alphabet:
            index = normal_alphabet.index(char)
            result += key_alphabet[index]
        else:
            result += char

    return result

# Example
key = "QWERTYUIOPASDFGHJKLZXCVBNM"
plaintext = "HELLO WORLD"
ciphertext = simple_substitution(plaintext, key)
print(f"Ciphertext: {ciphertext}")  # "ITSSG VGKSR"

# Weakness: Vulnerable to frequency analysis
# 'E' is most common in English, so most common ciphertext letter likely represents 'E'
```

### Mechanical Era (1900s-1970s)

**Enigma Machine (WWII)**
German encryption machine using rotors to create polyalphabetic substitution.

- Used by Nazi Germany during WWII
- Broken by Allied cryptanalysts including Alan Turing
- Demonstrated importance of both strong cryptography and cryptanalysis
- Victory attributed in part to breaking Enigma shortened war by 2+ years

### Modern Cryptography (1970s-Present)

**Key Developments:**

1. **1970s**: Public key cryptography invented (Diffie-Hellman, RSA)
2. **1970s**: DES (Data Encryption Standard) adopted
3. **1990s**: AES competition leads to Rijndael selection
4. **2000s**: Elliptic curve cryptography gains adoption
5. **2010s**: Quantum-resistant cryptography research accelerates

## Cryptography Terminology

### Essential Terms

```python
class CryptographyTerms:
    """Key cryptography terminology with examples"""

    def __init__(self):
        self.terms = {
            'plaintext': {
                'definition': 'Original readable message',
                'example': 'Hello, World!'
            },
            'ciphertext': {
                'definition': 'Encrypted, unreadable message',
                'example': 'k8mF3jL9pQx...'
            },
            'encryption': {
                'definition': 'Converting plaintext to ciphertext',
                'formula': 'C = E(K, P)'
            },
            'decryption': {
                'definition': 'Converting ciphertext back to plaintext',
                'formula': 'P = D(K, C)'
            },
            'key': {
                'definition': 'Secret value used in encryption/decryption',
                'types': ['Symmetric (shared)', 'Asymmetric (public/private pair)']
            },
            'algorithm': {
                'definition': 'Mathematical procedure for encryption/decryption',
                'examples': ['AES', 'RSA', 'ChaCha20']
            },
            'cipher': {
                'definition': 'Algorithm for performing encryption/decryption',
                'types': ['Stream cipher', 'Block cipher']
            },
            'cryptanalysis': {
                'definition': 'Science of breaking cryptographic systems',
                'methods': ['Frequency analysis', 'Brute force', 'Side-channel attacks']
            }
        }
```

### Kerckhoffs's Principle

**"A cryptographic system should be secure even if everything about the system, except the key, is public knowledge."**

```python
# BAD: Security through obscurity
def bad_encryption(data, secret_algorithm):
    """Custom 'secret' algorithm - NEVER DO THIS"""
    # Relying on algorithm being secret
    # If algorithm discovered, all past communications compromised
    pass

# GOOD: Use proven algorithms, protect keys
from cryptography.fernet import Fernet

def good_encryption(data):
    """Use proven algorithm, security is in the key"""
    key = Fernet.generate_key()  # Key is secret
    cipher = Fernet(key)  # Algorithm is public (Fernet)

    encrypted = cipher.encrypt(data.encode())

    return {
        'encrypted_data': encrypted,
        'key': key  # Only the key needs protection
    }
```

**Why This Matters:**
- Allows public scrutiny of algorithms (finds weaknesses)
- Custom algorithms almost always have vulnerabilities
- Peer review improves security
- Only the key needs protection, not the algorithm

## Types of Cryptography

### 1. Symmetric Cryptography

Same key used for encryption and decryption.

```python
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os

def symmetric_encryption_example():
    """Symmetric encryption: same key for encrypt and decrypt"""

    # Generate random key
    key = os.urandom(32)  # 256 bits

    # Create cipher
    cipher = Cipher(
        algorithms.AES(key),
        modes.GCM(os.urandom(12)),  # GCM mode with random nonce
        backend=default_backend()
    )

    # Encrypt
    encryptor = cipher.encryptor()
    plaintext = b"Secret message"
    ciphertext = encryptor.update(plaintext) + encryptor.finalize()

    # Decrypt (uses same key)
    decryptor = cipher.decryptor()
    recovered_plaintext = decryptor.update(ciphertext) + decryptor.finalize()

    return {
        'plaintext': plaintext,
        'ciphertext': ciphertext,
        'recovered': recovered_plaintext,
        'key': key  # Same key for both operations
    }
```

**Advantages:**
- Fast and efficient
- Suitable for large amounts of data
- Less computationally intensive

**Disadvantages:**
- Key distribution problem: How do parties share the key securely?
- Need separate key for each pair of communicating parties
- No built-in authentication

**Common Algorithms:** AES, ChaCha20, DES (obsolete)

### 2. Asymmetric Cryptography (Public Key)

Different keys for encryption (public) and decryption (private).

```python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

def asymmetric_encryption_example():
    """Asymmetric encryption: different keys for encrypt/decrypt"""

    # Generate key pair
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()

    # Encrypt with PUBLIC key
    plaintext = b"Secret message"
    ciphertext = public_key.encrypt(
        plaintext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # Decrypt with PRIVATE key
    recovered_plaintext = private_key.decrypt(
        ciphertext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return {
        'plaintext': plaintext,
        'ciphertext': ciphertext,
        'recovered': recovered_plaintext,
        'public_key': public_key,   # Can be shared freely
        'private_key': private_key   # Must be kept secret
    }
```

**Advantages:**
- Solves key distribution problem
- Enables digital signatures
- Supports non-repudiation

**Disadvantages:**
- Much slower than symmetric
- Limited message size
- More complex mathematics

**Common Algorithms:** RSA, Elliptic Curve (EC), Diffie-Hellman

### 3. Hash Functions

One-way functions that produce fixed-size output from variable-size input.

```python
import hashlib

def hash_function_example():
    """Hash functions: one-way, fixed output"""

    messages = [
        b"Hello",
        b"Hello!",  # Small change
        b"A" * 1000  # Much longer message
    ]

    for msg in messages:
        # SHA-256 always produces 256-bit (32-byte) output
        hash_value = hashlib.sha256(msg).hexdigest()
        print(f"Input:  {msg[:50]}...")  # Show first 50 chars
        print(f"SHA-256: {hash_value}")
        print(f"Output length: {len(hash_value)} hex chars\n")

    # Properties demonstration
    print("Properties:")

    # 1. Deterministic: Same input = same output
    hash1 = hashlib.sha256(b"Test").hexdigest()
    hash2 = hashlib.sha256(b"Test").hexdigest()
    print(f"Deterministic: {hash1 == hash2}")

    # 2. Avalanche effect: Small input change = completely different output
    hash_a = hashlib.sha256(b"Test").hexdigest()
    hash_b = hashlib.sha256(b"test").hexdigest()  # Just changed T to t
    print(f"\nAvalanche effect:")
    print(f"'Test': {hash_a}")
    print(f"'test': {hash_b}")
    print(f"Different: {hash_a != hash_b}")

    # 3. One-way: Can't reverse to get original message
    # (No way to go from hash back to "Test")
```

**Properties:**
- **Deterministic**: Same input always produces same output
- **One-way**: Cannot reverse hash to get original input
- **Fixed size**: Output always same length regardless of input size
- **Avalanche effect**: Small input change drastically changes output
- **Collision resistant**: Hard to find two inputs with same hash

**Common Algorithms:** SHA-256, SHA-3, BLAKE2

## Cryptographic Goals

### The CIA Triad in Cryptography

```python
class CryptographicGoals:
    """How cryptography achieves security goals"""

    def confidentiality(self):
        """Encryption protects confidentiality"""
        return {
            'goal': 'Prevent unauthorized access to information',
            'mechanism': 'Encryption',
            'example': 'Encrypting email so only recipient can read it'
        }

    def integrity(self):
        """Hashing and MACs protect integrity"""
        return {
            'goal': 'Detect unauthorized modifications',
            'mechanism': 'Hash functions, Message Authentication Codes (MAC)',
            'example': 'File checksum to verify no tampering'
        }

    def authentication(self):
        """Digital signatures prove identity"""
        return {
            'goal': 'Verify identity of sender',
            'mechanism': 'Digital signatures, MACs',
            'example': 'Code signing to verify software publisher'
        }

    def non_repudiation(self):
        """Digital signatures prevent denial"""
        return {
            'goal': 'Prevent denial of having sent message',
            'mechanism': 'Digital signatures',
            'example': 'Digitally signed contract'
        }
```

### Practical Example: Secure Email

```python
class SecureEmail:
    """Combining cryptographic techniques for secure email"""

    def send_secure_email(self, message, recipient_public_key, sender_private_key):
        """Secure email using multiple cryptographic techniques"""

        # 1. Generate symmetric key for this message
        session_key = os.urandom(32)

        # 2. Encrypt message with symmetric key (for efficiency)
        encrypted_message = self.symmetric_encrypt(message, session_key)

        # 3. Encrypt session key with recipient's public key
        encrypted_session_key = self.asymmetric_encrypt(
            session_key,
            recipient_public_key
        )

        # 4. Hash the message
        message_hash = hashlib.sha256(message.encode()).digest()

        # 5. Sign the hash with sender's private key (authentication + non-repudiation)
        signature = self.sign(message_hash, sender_private_key)

        # Send all components
        return {
            'encrypted_message': encrypted_message,      # Confidentiality
            'encrypted_session_key': encrypted_session_key,  # Key exchange
            'signature': signature,                      # Authentication, integrity, non-repudiation
            'message_hash': message_hash                # Integrity check
        }

    def receive_secure_email(self, email_package, recipient_private_key, sender_public_key):
        """Decrypt and verify secure email"""

        # 1. Decrypt session key with recipient's private key
        session_key = self.asymmetric_decrypt(
            email_package['encrypted_session_key'],
            recipient_private_key
        )

        # 2. Decrypt message with session key
        message = self.symmetric_decrypt(
            email_package['encrypted_message'],
            session_key
        )

        # 3. Verify signature with sender's public key
        is_authentic = self.verify_signature(
            email_package['message_hash'],
            email_package['signature'],
            sender_public_key
        )

        # 4. Verify integrity by recalculating hash
        calculated_hash = hashlib.sha256(message.encode()).digest()
        integrity_verified = calculated_hash == email_package['message_hash']

        return {
            'message': message,
            'authentic': is_authentic,
            'integrity_verified': integrity_verified
        }
```

## Security Considerations

### What Makes Cryptography Secure?

```python
class CryptographicSecurity:
    """Factors affecting cryptographic security"""

    def evaluate_security(self, algorithm, key_size, implementation):
        """Security depends on multiple factors"""

        security_factors = {
            'algorithm_strength': {
                'proven_algorithms': ['AES', 'RSA', 'SHA-256'],
                'deprecated': ['DES', 'MD5', 'SHA-1'],
                'broken': ['RC4', 'DES with 56-bit keys'],
                'status': self.check_algorithm_status(algorithm)
            },

            'key_size': {
                'symmetric': {
                    'minimum': 128,
                    'recommended': 256,
                    'your_key': key_size
                },
                'asymmetric': {
                    'RSA_minimum': 2048,
                    'RSA_recommended': 3072,
                    'your_key': key_size
                }
            },

            'implementation': {
                'use_proven_libraries': True,
                'avoid_custom_crypto': True,
                'keep_updated': True,
                'constant_time_operations': True  # Prevent timing attacks
            },

            'key_management': {
                'secure_generation': 'Use cryptographically secure random',
                'secure_storage': 'Never hardcode, use key management system',
                'secure_distribution': 'Use established protocols',
                'key_rotation': 'Regular key rotation policy'
            }
        }

        return security_factors
```

### Common Mistakes to Avoid

```python
# MISTAKE 1: Rolling your own crypto
# BAD
def my_custom_encryption(data, password):
    """NEVER implement custom cryptography"""
    # Custom algorithm - likely broken
    pass

# GOOD
from cryptography.fernet import Fernet
def use_proven_crypto(data):
    key = Fernet.generate_key()
    f = Fernet(key)
    return f.encrypt(data.encode())


# MISTAKE 2: Weak key generation
# BAD
import random
key = random.randint(0, 1000000)  # Predictable!

# GOOD
import secrets
key = secrets.token_bytes(32)  # Cryptographically secure


# MISTAKE 3: Hardcoded keys
# BAD
ENCRYPTION_KEY = b"my-secret-key-123"  # In source code!

# GOOD
import os
ENCRYPTION_KEY = os.environ.get('ENCRYPTION_KEY')  # From environment


# MISTAKE 4: Using deprecated algorithms
# BAD
hashlib.md5(data).hexdigest()  # MD5 is broken!

# GOOD
hashlib.sha256(data).hexdigest()  # SHA-256 is secure
```

## Conclusion

Cryptography is the foundation of modern information security. Understanding its principles, from ancient ciphers to modern algorithms, helps us appreciate why certain practices are recommended and others are dangerous.

Key takeaways:
- Use proven algorithms, not custom ones (Kerckhoffs's Principle)
- Symmetric crypto is fast; asymmetric solves key distribution
- Hash functions provide integrity and authentication
- Combining techniques provides comprehensive security
- Implementation details matter as much as algorithm choice

In the following topics, we'll dive deeper into specific algorithms, their properties, and how to use them correctly.

## Key Takeaways

- Cryptography enables confidentiality, integrity, authentication, and non-repudiation
- Security should be in the key, not the algorithm (Kerckhoffs's Principle)
- Symmetric encryption is fast; asymmetric enables key exchange
- Hash functions are one-way and detect modifications
- Use proven libraries and algorithms
- Never implement custom cryptography
- Key management is as important as the algorithm
