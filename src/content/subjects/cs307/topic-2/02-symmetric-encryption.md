# Symmetric Encryption

## Introduction

Symmetric encryption uses the same secret key for both encryption and decryption. It's the foundation of protecting data confidentiality—fast, efficient, and widely used for encrypting large amounts of data. Think of it like a physical lock: the same key that locks the door also unlocks it.

## How Symmetric Encryption Works

```python
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os

class SymmetricEncryption:
    """Demonstration of symmetric encryption concepts"""

    def encrypt_decrypt_flow(self):
        """Basic symmetric encryption flow"""

        # 1. Generate secret key (must be kept secure)
        key = os.urandom(32)  # 256-bit key for AES-256

        # 2. Generate initialization vector (IV) - prevents pattern recognition
        iv = os.urandom(16)  # 128-bit IV for AES

        # 3. Create cipher object
        cipher = Cipher(
            algorithms.AES(key),
            modes.CBC(iv),
            backend=default_backend()
        )

        # 4. Encrypt plaintext
        plaintext = b"This is a secret message that needs protection!"

        encryptor = cipher.encryptor()
        # Pad plaintext to block size (16 bytes for AES)
        padded_plaintext = self.pad(plaintext)
        ciphertext = encryptor.update(padded_plaintext) + encryptor.finalize()

        print(f"Plaintext:  {plaintext}")
        print(f"Ciphertext: {ciphertext.hex()}")

        # 5. Decrypt ciphertext (same key required)
        decryptor = cipher.decryptor()
        recovered_padded = decryptor.update(ciphertext) + decryptor.finalize()
        recovered_plaintext = self.unpad(recovered_padded)

        print(f"Recovered:  {recovered_plaintext}")

        return {
            'key': key,
            'iv': iv,
            'plaintext': plaintext,
            'ciphertext': ciphertext,
            'recovered': recovered_plaintext
        }

    def pad(self, data):
        """PKCS7 padding to make data multiple of block size"""
        padding_length = 16 - (len(data) % 16)
        return data + bytes([padding_length] * padding_length)

    def unpad(self, data):
        """Remove PKCS7 padding"""
        padding_length = data[-1]
        return data[:-padding_length]
```

## AES (Advanced Encryption Standard)

AES is the most widely used symmetric encryption algorithm, adopted as a US federal standard in 2001.

### AES Characteristics

```python
class AESEncryption:
    """AES encryption with different key sizes"""

    def __init__(self):
        self.key_sizes = {
            'AES-128': 16,  # 128 bits
            'AES-192': 24,  # 192 bits
            'AES-256': 32   # 256 bits (most secure)
        }

    def encrypt_with_aes256(self, plaintext, key):
        """AES-256 encryption example"""
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        from cryptography.hazmat.primitives import padding

        # Generate random IV
        iv = os.urandom(16)

        # Create cipher
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
        encryptor = cipher.encryptor()

        # Pad data to block size
        padder = padding.PKCS7(128).padder()
        padded_data = padder.update(plaintext) + padder.finalize()

        # Encrypt
        ciphertext = encryptor.update(padded_data) + encryptor.finalize()

        # Return IV + ciphertext (IV doesn't need to be secret, just unique)
        return iv + ciphertext

    def decrypt_with_aes256(self, encrypted_data, key):
        """AES-256 decryption"""
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        from cryptography.hazmat.primitives import padding

        # Extract IV (first 16 bytes)
        iv = encrypted_data[:16]
        ciphertext = encrypted_data[16:]

        # Create cipher
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
        decryptor = cipher.decryptor()

        # Decrypt
        padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()

        # Unpad
        unpadder = padding.PKCS7(128).unpadder()
        plaintext = unpadder.update(padded_plaintext) + unpadder.finalize()

        return plaintext

# Example usage
aes = AESEncryption()
key = os.urandom(32)  # 256-bit key
plaintext = b"Confidential data"

encrypted = aes.encrypt_with_aes256(plaintext, key)
decrypted = aes.decrypt_with_aes256(encrypted, key)

assert plaintext == decrypted  # Should match!
```

### AES Block Cipher

AES operates on fixed-size blocks (128 bits = 16 bytes).

**How AES Works (Simplified):**
1. Divide data into 16-byte blocks
2. Apply multiple rounds of transformations (10, 12, or 14 rounds depending on key size)
3. Each round includes: SubBytes, ShiftRows, MixColumns, AddRoundKey
4. Produces encrypted block

## Modes of Operation

Block ciphers need a mode of operation to encrypt data longer than one block.

### ECB (Electronic Codebook) - DON'T USE

```python
# ECB Mode - INSECURE, DO NOT USE
class ECBMode:
    """ECB mode - demonstrates why it's insecure"""

    def why_ecb_is_bad(self):
        """ECB encrypts identical blocks identically - reveals patterns"""

        # Problem: Same plaintext block = same ciphertext block
        plaintext_block = b"ATTACK AT DAWN!!"  # Exactly 16 bytes

        key = os.urandom(32)

        # If message repeats, ciphertext repeats
        plaintext = plaintext_block * 3  # "ATTACK AT DAWN!!ATTACK AT DAWN!!ATTACK AT DAWN!!"

        # In ECB, you'd see same ciphertext pattern repeated 3 times
        # This leaks information about the plaintext structure

        return {
            'problem': 'Identical plaintext blocks produce identical ciphertext blocks',
            'consequence': 'Patterns in plaintext visible in ciphertext',
            'example': 'Famous ECB penguin image shows this weakness',
            'recommendation': 'NEVER use ECB mode'
        }
```

### CBC (Cipher Block Chaining) - Common

```python
class CBCMode:
    """CBC mode - chains blocks together"""

    def encrypt_cbc(self, plaintext, key):
        """CBC mode encryption"""

        # Random IV makes identical plaintexts produce different ciphertexts
        iv = os.urandom(16)

        cipher = Cipher(
            algorithms.AES(key),
            modes.CBC(iv)
        )

        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(plaintext) + encryptor.finalize()

        return {
            'iv': iv,  # Send IV with ciphertext (doesn't need to be secret)
            'ciphertext': ciphertext
        }

    def cbc_characteristics(self):
        return {
            'advantages': [
                'Hides patterns in plaintext',
                'Each block depends on all previous blocks',
                'Random IV ensures different ciphertext for same plaintext'
            ],
            'disadvantages': [
                'Encryption cannot be parallelized',
                'Error in one block affects all subsequent blocks',
                'Vulnerable to padding oracle attacks if not implemented carefully'
            ],
            'uses': 'General-purpose encryption, widely supported'
        }
```

### GCM (Galois/Counter Mode) - Modern Recommended

```python
class GCMMode:
    """GCM mode - provides encryption AND authentication"""

    def encrypt_gcm(self, plaintext, key, associated_data=None):
        """GCM mode - authenticated encryption"""

        # Generate random nonce (96 bits recommended for GCM)
        nonce = os.urandom(12)

        # Create GCM cipher
        cipher = Cipher(
            algorithms.AES(key),
            modes.GCM(nonce)
        )

        encryptor = cipher.encryptor()

        # Optional: Associated data (authenticated but not encrypted)
        # Example: header information, metadata
        if associated_data:
            encryptor.authenticate_additional_data(associated_data)

        # Encrypt
        ciphertext = encryptor.update(plaintext) + encryptor.finalize()

        # Get authentication tag
        tag = encryptor.tag

        return {
            'nonce': nonce,
            'ciphertext': ciphertext,
            'tag': tag  # Proves authenticity and integrity
        }

    def decrypt_gcm(self, nonce, ciphertext, tag, key, associated_data=None):
        """GCM mode decryption with verification"""

        # Create GCM cipher with the tag
        cipher = Cipher(
            algorithms.AES(key),
            modes.GCM(nonce, tag)
        )

        decryptor = cipher.decryptor()

        # Authenticate associated data if present
        if associated_data:
            decryptor.authenticate_additional_data(associated_data)

        # Decrypt and verify
        try:
            plaintext = decryptor.update(ciphertext) + decryptor.finalize()
            return {
                'plaintext': plaintext,
                'verified': True
            }
        except Exception:
            # Tag verification failed - data was tampered with
            return {
                'plaintext': None,
                'verified': False,
                'error': 'Authentication failed - possible tampering'
            }

# Example
gcm = GCMMode()
key = os.urandom(32)
plaintext = b"Secret message"
associated_data = b"header: user_id=123"

# Encrypt
encrypted = gcm.encrypt_gcm(plaintext, key, associated_data)

# Decrypt and verify
decrypted = gcm.decrypt_gcm(
    encrypted['nonce'],
    encrypted['ciphertext'],
    encrypted['tag'],
    key,
    associated_data
)

print(f"Verified: {decrypted['verified']}")
print(f"Plaintext: {decrypted['plaintext']}")
```

**Why GCM is Recommended:**
- Provides both confidentiality AND authenticity
- Faster than CBC (can be parallelized)
- Detects tampering automatically
- Modern, widely supported

### CTR (Counter Mode)

```python
class CTRMode:
    """Counter mode - turns block cipher into stream cipher"""

    def encrypt_ctr(self, plaintext, key):
        """CTR mode encryption"""

        nonce = os.urandom(16)

        cipher = Cipher(
            algorithms.AES(key),
            modes.CTR(nonce)
        )

        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(plaintext) + encryptor.finalize()

        return {
            'nonce': nonce,
            'ciphertext': ciphertext
        }

    def ctr_characteristics(self):
        return {
            'advantages': [
                'Can be parallelized (encryption and decryption)',
                'No padding required',
                'Random access to encrypted data',
                'Encryption and decryption use same operation'
            ],
            'disadvantages': [
                'Must never reuse nonce with same key',
                'No built-in authentication (use with MAC)'
            ],
            'uses': 'Disk encryption, network encryption'
        }
```

## Stream Ciphers vs Block Ciphers

```python
class CipherTypes:
    """Comparison of cipher types"""

    def block_cipher_characteristics(self):
        """Block cipher: encrypts fixed-size blocks"""
        return {
            'examples': ['AES', 'DES', '3DES'],
            'block_size': '128 bits (AES)',
            'operation': 'Encrypts one block at a time',
            'padding': 'Required if data not multiple of block size',
            'modes_needed': True,
            'uses': 'General-purpose encryption'
        }

    def stream_cipher_characteristics(self):
        """Stream cipher: encrypts one bit/byte at a time"""
        return {
            'examples': ['ChaCha20', 'RC4 (broken)'],
            'operation': 'Generates keystream, XORs with plaintext',
            'padding': 'Not required',
            'modes_needed': False,
            'advantages': ['Fast', 'No padding', 'Works with any data length'],
            'uses': 'Real-time communications, mobile devices'
        }

# ChaCha20 example (modern stream cipher)
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms

def chacha20_example():
    """ChaCha20 stream cipher"""

    key = os.urandom(32)  # 256-bit key
    nonce = os.urandom(16)  # 128-bit nonce

    cipher = Cipher(algorithms.ChaCha20(key, nonce), mode=None)

    encryptor = cipher.encryptor()
    plaintext = b"Stream cipher example - any length works!"
    ciphertext = encryptor.update(plaintext)

    # Decryption
    decryptor = cipher.decryptor()
    recovered = decryptor.update(ciphertext)

    return {
        'plaintext': plaintext,
        'ciphertext': ciphertext,
        'recovered': recovered
    }
```

## Practical Applications

### File Encryption

```python
class FileEncryption:
    """Encrypt files using AES-GCM"""

    def __init__(self):
        self.key = None

    def generate_key(self):
        """Generate and save encryption key"""
        self.key = os.urandom(32)
        # In practice, derive from password or store in key management system
        return self.key

    def encrypt_file(self, filename, output_filename):
        """Encrypt a file"""
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

        # Read file
        with open(filename, 'rb') as f:
            plaintext = f.read()

        # Encrypt with GCM
        nonce = os.urandom(12)
        cipher = Cipher(algorithms.AES(self.key), modes.GCM(nonce))
        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(plaintext) + encryptor.finalize()
        tag = encryptor.tag

        # Write encrypted file: nonce || tag || ciphertext
        with open(output_filename, 'wb') as f:
            f.write(nonce)
            f.write(tag)
            f.write(ciphertext)

    def decrypt_file(self, encrypted_filename, output_filename):
        """Decrypt a file"""
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

        # Read encrypted file
        with open(encrypted_filename, 'rb') as f:
            nonce = f.read(12)
            tag = f.read(16)
            ciphertext = f.read()

        # Decrypt
        cipher = Cipher(algorithms.AES(self.key), modes.GCM(nonce, tag))
        decryptor = cipher.decryptor()

        try:
            plaintext = decryptor.update(ciphertext) + decryptor.finalize()

            # Write decrypted file
            with open(output_filename, 'wb') as f:
                f.write(plaintext)

            return True
        except Exception as e:
            print(f"Decryption failed: {e}")
            return False
```

### Database Column Encryption

```python
class DatabaseEncryption:
    """Encrypt sensitive database columns"""

    def __init__(self, master_key):
        self.cipher = Fernet(master_key)

    def encrypt_column(self, value):
        """Encrypt sensitive data before storage"""
        if value is None:
            return None

        # Convert to bytes if string
        if isinstance(value, str):
            value = value.encode()

        encrypted = self.cipher.encrypt(value)
        # Store as base64 string in database
        return encrypted.decode()

    def decrypt_column(self, encrypted_value):
        """Decrypt when retrieving from database"""
        if encrypted_value is None:
            return None

        decrypted = self.cipher.decrypt(encrypted_value.encode())
        return decrypted.decode()

# Usage with database
from cryptography.fernet import Fernet

master_key = Fernet.generate_key()
db_crypto = DatabaseEncryption(master_key)

# Storing user data
ssn = "123-45-6789"
encrypted_ssn = db_crypto.encrypt_column(ssn)
# Store encrypted_ssn in database

# Retrieving user data
# retrieved_encrypted_ssn from database
decrypted_ssn = db_crypto.decrypt_column(encrypted_ssn)
```

## Key Management

```python
class KeyManagement:
    """Secure key management practices"""

    def generate_key(self):
        """Generate cryptographically secure key"""
        # GOOD: Use os.urandom or secrets
        import secrets
        return secrets.token_bytes(32)

        # BAD: Never use regular random
        # import random
        # return bytes([random.randint(0, 255) for _ in range(32)])

    def store_key_securely(self, key):
        """Key storage best practices"""

        options = {
            'environment_variable': {
                'method': 'Store in environment variable',
                'security': 'Medium',
                'code': 'key = os.environ.get("ENCRYPTION_KEY")'
            },
            'key_file': {
                'method': 'Store in file with restricted permissions',
                'security': 'Medium',
                'code': 'chmod 600 keyfile; Only owner can read'
            },
            'key_management_service': {
                'method': 'Use KMS (AWS KMS, Azure Key Vault, etc.)',
                'security': 'High',
                'features': ['Audit logging', 'Access control', 'Key rotation']
            },
            'hsm': {
                'method': 'Hardware Security Module',
                'security': 'Highest',
                'features': ['Keys never leave hardware', 'FIPS certified']
            }
        }

        # NEVER do these:
        bad_practices = [
            'Hardcode key in source code',
            'Store key in version control',
            'Email or chat keys',
            'Store key in same database as encrypted data'
        ]

        return {'options': options, 'avoid': bad_practices}
```

## Common Vulnerabilities

```python
class SymmetricCryptoVulnerabilities:
    """Common mistakes with symmetric encryption"""

    def weak_key_generation(self):
        """Using predictable random"""
        # BAD
        import random
        bad_key = bytes([random.randint(0, 255) for _ in range(32)])

        # GOOD
        import secrets
        good_key = secrets.token_bytes(32)

    def key_reuse(self):
        """Reusing keys inappropriately"""
        # BAD: Using same key for different purposes
        encryption_key = os.urandom(32)
        # Using same key for both data encryption AND MAC
        # Should use different keys derived from master key

        # GOOD: Derive separate keys
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.kdf.hkdf import HKDF

        master_key = os.urandom(32)

        # Derive encryption key
        encryption_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'encryption'
        ).derive(master_key)

        # Derive authentication key
        auth_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'authentication'
        ).derive(master_key)

    def iv_nonce_reuse(self):
        """NEVER reuse IV/nonce with same key"""
        # BAD: Reusing IV
        key = os.urandom(32)
        iv = os.urandom(16)
        # Encrypting multiple messages with same IV - BREAKS SECURITY!

        # GOOD: Generate new IV for each message
        key = os.urandom(32)
        for message in messages:
            iv = os.urandom(16)  # New IV each time
            # encrypt...
```

## Conclusion

Symmetric encryption is fast and efficient, perfect for encrypting large amounts of data. AES-256 with GCM mode is the recommended choice for most applications, providing both confidentiality and authenticity.

Remember: The algorithm is only as secure as its implementation and key management.

## Key Takeaways

- Symmetric encryption uses same key for encryption and decryption
- AES-256 is current standard, secure and widely supported
- GCM mode recommended: provides encryption + authentication
- Never use ECB mode - reveals patterns
- Generate keys with cryptographically secure random
- Never reuse IVs/nonces with the same key
- Protect keys as carefully as the data they encrypt
- Use proven libraries, don't implement crypto yourself
