# Hash Functions

## Introduction

Hash functions are one-way mathematical functions that transform input data of any size into a fixed-size output (the hash or digest). They're fundamental to many security applications including password storage, data integrity verification, digital signatures, and blockchain technology.

Key property: Easy to compute hash from input, practically impossible to reverse.

## Hash Function Properties

```python
import hashlib

class HashProperties:
    """Demonstrate essential hash function properties"""

    def deterministic(self):
        """Same input always produces same output"""
        input_data = b"Hello, World!"

        hash1 = hashlib.sha256(input_data).hexdigest()
        hash2 = hashlib.sha256(input_data).hexdigest()

        assert hash1 == hash2
        print(f"Input: {input_data}")
        print(f"Hash:  {hash1}")
        print(f"Deterministic: {hash1 == hash2}")

    def fixed_size_output(self):
        """Output always same size regardless of input"""

        inputs = [
            b"Hi",
            b"A" * 1000,
            b"A" * 1000000
        ]

        for data in inputs:
            hash_value = hashlib.sha256(data).hexdigest()
            print(f"Input size: {len(data):,} bytes")
            print(f"Hash size:  {len(hash_value)} hex chars (256 bits)")
            print()

    def avalanche_effect(self):
        """Small input change causes completely different hash"""

        hash1 = hashlib.sha256(b"Hello").hexdigest()
        hash2 = hashlib.sha256(b"hello").hexdigest()  # Changed H to h

        print(f"'Hello': {hash1}")
        print(f"'hello': {hash2}")
        print(f"Different: {hash1 != hash2}")

        # Count different characters
        differences = sum(c1 != c2 for c1, c2 in zip(hash1, hash2))
        print(f"Changed chars: {differences}/64 ({differences/64*100:.1f}%)")

    def one_way(self):
        """Cannot reverse hash to get original"""

        original = b"SecretPassword123"
        hash_value = hashlib.sha256(original).hexdigest()

        print(f"Original: {original}")
        print(f"Hash: {hash_value}")
        print("Cannot compute original from hash!")

        # Only way to find original is try every possibility (brute force)

    def collision_resistant(self):
        """Hard to find two inputs with same hash"""

        # For SHA-256, probability of collision is 2^256
        # That's more atoms than in the universe

        return {
            'sha256_space': '2^256 possible hashes',
            'probability': 'Effectively impossible to find collision',
            'birthday_attack': 'Would need 2^128 hashes before 50% chance',
            'practical': 'Computationally infeasible'
        }
```

## Common Hash Algorithms

```python
class HashAlgorithms:
    """Compare different hash algorithms"""

    def algorithms_comparison(self):
        """Security status of hash algorithms"""

        return {
            'md5': {
                'output_size': 128,
                'status': 'BROKEN - Do not use!',
                'problems': 'Collisions can be generated in seconds',
                'use_case': 'Only for non-security purposes (checksums)'
            },
            'sha1': {
                'output_size': 160,
                'status': 'DEPRECATED - Avoid',
                'problems': 'Collisions demonstrated (2017)',
                'phase_out': 'No longer acceptable for certificates'
            },
            'sha256': {
                'output_size': 256,
                'status': 'SECURE - Recommended',
                'family': 'SHA-2',
                'use_case': 'General purpose, widely supported'
            },
            'sha512': {
                'output_size': 512,
                'status': 'SECURE - Recommended',
                'family': 'SHA-2',
                'use_case': 'Maximum security, larger digests'
            },
            'sha3': {
                'output_size': 'Variable (224, 256, 384, 512)',
                'status': 'SECURE - Modern alternative',
                'advantage': 'Different construction than SHA-2',
                'use_case': 'Diversity from SHA-2'
            },
            'blake2': {
                'output_size': 'Variable',
                'status': 'SECURE - Fast and secure',
                'advantage': 'Faster than MD5, more secure than SHA-2',
                'use_case': 'Performance-critical applications'
            }
        }

    def demonstrate_algorithms(self):
        """Compare different hash algorithms"""

        data = b"Hello, World!"

        algorithms = {
            'MD5': hashlib.md5,
            'SHA-1': hashlib.sha1,
            'SHA-256': hashlib.sha256,
            'SHA-512': hashlib.sha512,
            'SHA3-256': hashlib.sha3_256,
            'BLAKE2b': hashlib.blake2b
        }

        for name, algo in algorithms.items():
            hash_value = algo(data).hexdigest()
            print(f"{name:10} {hash_value}")
```

## Use Case 1: Data Integrity

```python
class IntegrityVerification:
    """Using hashes to verify data integrity"""

    def compute_file_hash(self, filename):
        """Compute hash of file"""

        sha256 = hashlib.sha256()

        with open(filename, 'rb') as f:
            # Read in chunks to handle large files
            while chunk := f.read(8192):
                sha256.update(chunk)

        return sha256.hexdigest()

    def verify_file_integrity(self, filename, expected_hash):
        """Verify file hasn't been tampered with"""

        actual_hash = self.compute_file_hash(filename)

        if actual_hash == expected_hash:
            print("✓ File integrity verified")
            return True
        else:
            print("✗ File has been modified or corrupted!")
            return False

# Example: Software download verification
class SoftwareDownload:
    """Verify downloaded software integrity"""

    def download_and_verify(self, url, published_hash):
        """Download file and verify against published hash"""

        # 1. Download file
        filename = self.download_file(url)

        # 2. Compute hash
        actual_hash = self.compute_hash(filename)

        # 3. Compare with published hash from trusted source
        if actual_hash == published_hash:
            print("Download verified! Safe to install.")
            return True
        else:
            print("WARNING: Hash mismatch! File may be corrupted or malicious!")
            return False
```

## Use Case 2: Password Storage (WRONG WAY)

```python
class InsecurePasswordStorage:
    """NEVER store passwords this way!"""

    def bad_password_storage(self, password):
        """Plain hash is NOT secure for passwords"""

        # BAD: Just hashing password
        password_hash = hashlib.sha256(password.encode()).hexdigest()

        # Problems:
        # 1. Same password = same hash (rainbow tables)
        # 2. Too fast - attacker can try billions per second
        # 3. No protection against brute force

        return password_hash

    def why_this_is_bad(self):
        """Demonstrating password hash weaknesses"""

        # Same password produces same hash
        hash1 = hashlib.sha256(b"password123").hexdigest()
        hash2 = hashlib.sha256(b"password123").hexdigest()

        print(f"User 1 password hash: {hash1}")
        print(f"User 2 password hash: {hash2}")
        print(f"Identical: {hash1 == hash2}")

        # Attacker pre-computes hashes of common passwords
        # Rainbow table: precomputed hash -> password lookup
        # If they get your hash database, they instantly know all passwords

        # Also, SHA-256 is too fast for passwords
        # Modern GPUs can compute billions of SHA-256 hashes per second
```

**Note**: For password hashing, use specialized functions like bcrypt or Argon2 (covered in Password Security topic).

## Use Case 3: Message Authentication Codes (MAC)

```python
import hmac

class MessageAuthentication:
    """HMAC for message authentication"""

    def __init__(self, secret_key):
        self.secret_key = secret_key

    def create_hmac(self, message):
        """Create HMAC to prove message authenticity"""

        mac = hmac.new(
            self.secret_key,
            message,
            hashlib.sha256
        ).hexdigest()

        return mac

    def verify_hmac(self, message, received_mac):
        """Verify message hasn't been tampered with"""

        expected_mac = self.create_hmac(message)

        # Use constant-time comparison to prevent timing attacks
        if hmac.compare_digest(expected_mac, received_mac):
            return True
        else:
            return False

# Example: API request signing
class APIAuthentication:
    """Sign API requests with HMAC"""

    def __init__(self, api_secret):
        self.api_secret = api_secret.encode()

    def sign_request(self, method, path, body):
        """Create signature for API request"""

        # Concatenate request details
        message = f"{method}:{path}:{body}".encode()

        # Create HMAC
        signature = hmac.new(
            self.api_secret,
            message,
            hashlib.sha256
        ).hexdigest()

        return signature

    def verify_request(self, method, path, body, received_signature):
        """Verify API request signature"""

        expected_signature = self.sign_request(method, path, body)

        return hmac.compare_digest(expected_signature, received_signature)

# Usage
api = APIAuthentication(api_secret="secret-key-here")

# Client signs request
signature = api.sign_request("POST", "/api/users", '{"name":"Alice"}')

# Server verifies signature
is_valid = api.verify_request("POST", "/api/users", '{"name":"Alice"}', signature)
print(f"Request verified: {is_valid}")
```

## Use Case 4: Digital Signatures

```python
class DigitalSignatureWithHash:
    """Hash is first step in digital signature"""

    def sign_document(self, document, private_key):
        """Sign document using hash + asymmetric crypto"""

        # 1. Hash the document (any size -> fixed size)
        document_hash = hashlib.sha256(document).digest()

        # 2. Encrypt hash with private key (this is the signature)
        from cryptography.hazmat.primitives.asymmetric import rsa, padding
        from cryptography.hazmat.primitives import hashes

        signature = private_key.sign(
            document,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )

        return signature

    def verify_signature(self, document, signature, public_key):
        """Verify document signature"""

        from cryptography.hazmat.primitives.asymmetric import padding
        from cryptography.hazmat.primitives import hashes

        try:
            public_key.verify(
                signature,
                document,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except:
            return False
```

## Collision Attacks

```python
class CollisionAttacks:
    """Understanding collision attacks"""

    def what_is_collision(self):
        """Collision: two different inputs with same hash"""

        return {
            'definition': 'hash(input1) == hash(input2) where input1 != input2',
            'ideal': 'Should be computationally infeasible',
            'broken_algorithms': {
                'MD5': 'Collisions in seconds',
                'SHA-1': 'Collisions demonstrated (2017)',
                'SHA-256': 'No known collisions'
            }
        }

    def birthday_attack(self):
        """Birthday paradox and collision probability"""

        return {
            'paradox': 'With 23 people, 50% chance two share birthday',
            'hash_equivalent': 'With 2^(n/2) hashes, 50% chance of collision',
            'sha256': {
                'output_bits': 256,
                'hashes_for_50%_collision': '2^128',
                'practical': 'Computationally infeasible'
            },
            'md5': {
                'output_bits': 128,
                'hashes_for_50%_collision': '2^64',
                'practical': 'Feasible with modern hardware'
            }
        }

    def collision_impact(self):
        """Why collisions matter"""

        return {
            'certificate_forgery': 'Create fake SSL certificate with same hash',
            'malware_distribution': 'Replace legitimate file with malware',
            'document_fraud': 'Create fraudulent document with same signature',
            'mitigation': 'Use secure hash functions (SHA-256+)'
        }
```

## Practical Examples

```python
class HashPracticalExamples:
    """Real-world hash usage"""

    def git_commits(self):
        """Git uses SHA-1 for commit IDs"""

        # Each commit has unique SHA-1 hash
        # Commit ID is hash of: content + author + timestamp + parent commit

        return {
            'purpose': 'Uniquely identify commits',
            'integrity': 'Detect any changes to history',
            'note': 'Git moving to SHA-256 due to SHA-1 weakness'
        }

    def blockchain(self):
        """Blockchain uses hash chains"""

        # Each block contains hash of previous block
        # Changing any block would change its hash
        # This would break the chain (detectable)

        return {
            'block_structure': {
                'data': 'Transaction data',
                'previous_hash': 'Hash of previous block',
                'nonce': 'Number used once (for proof of work)',
                'hash': 'SHA-256 hash of entire block'
            },
            'integrity': 'Cannot change historical blocks without detection'
        }

    def deduplication(self):
        """Use hashes to identify duplicate files"""

        def find_duplicates(file_list):
            """Find duplicate files by hash"""

            hashes = {}

            for filename in file_list:
                file_hash = self.compute_file_hash(filename)

                if file_hash in hashes:
                    print(f"Duplicate: {filename} matches {hashes[file_hash]}")
                else:
                    hashes[file_hash] = filename

    def hash_table_data_structure(self):
        """Hash functions in data structures"""

        # Python dictionaries use hash functions
        # Hash provides O(1) average lookup time

        return {
            'purpose': 'Fast key lookup',
            'requirement': 'Good distribution of hash values',
            'note': 'Not cryptographic hash (doesn't need to be secure)'
        }
```

## Security Best Practices

```python
class HashSecurityPractices:
    """Best practices for using hash functions"""

    def choose_algorithm(self):
        """Selecting appropriate hash algorithm"""

        return {
            'general_purpose': 'SHA-256 (secure, widely supported)',
            'maximum_security': 'SHA-512 or SHA3-512',
            'performance_critical': 'BLAKE2 (faster than SHA-2, still secure)',
            'avoid': 'MD5, SHA-1 (broken)',
            'passwords': 'bcrypt, Argon2 (NOT general hash functions)'
        }

    def salt_when_appropriate(self):
        """When to add salt to hashes"""

        # For passwords: ALWAYS use salt (covered in password security topic)
        # For file integrity: Usually no salt needed
        # For HMACs: Secret key acts as salt

        return {
            'password_hashing': 'Always use random salt per password',
            'message_authentication': 'Use HMAC with secret key',
            'file_integrity': 'Plain hash usually sufficient'
        }

    def constant_time_comparison(self):
        """Prevent timing attacks"""

        # BAD: Can leak information through timing
        def insecure_compare(hash1, hash2):
            return hash1 == hash2  # Stops at first different character

        # GOOD: Constant-time comparison
        def secure_compare(hash1, hash2):
            return hmac.compare_digest(hash1, hash2)  # Checks all characters
```

## Common Mistakes

```python
class HashMistakes:
    """Common hash function misuses"""

    def mistake_1_using_hash_for_encryption(self):
        """Hashes are NOT encryption"""

        # BAD: Treating hash as encryption
        # encrypted = hashlib.sha256(secret_data).hexdigest()
        # Can't decrypt! Hash is one-way!

        # Hashes are for INTEGRITY, not CONFIDENTIALITY

    def mistake_2_unsalted_passwords(self):
        """Never hash passwords without salt"""

        # Covered in detail in password security topic

    def mistake_3_using_broken_algorithms(self):
        """Don't use MD5 or SHA-1 for security"""

        # OK for non-security (checksums)
        # NOT OK for security (certificates, signatures, etc.)

    def mistake_4_truncating_hashes(self):
        """Don't truncate hashes for security"""

        # BAD: Only using first 64 bits
        # weak_hash = hashlib.sha256(data).hexdigest()[:16]

        # Reduces security significantly
```

## Conclusion

Hash functions are cryptographic one-way functions essential for integrity verification, password storage (with proper techniques), digital signatures, and many other security applications. Use SHA-256 or stronger for security purposes, never MD5 or SHA-1.

Remember: hashes provide integrity and authentication (when used in MACs), but NOT confidentiality. They're one-way by design.

## Key Takeaways

- Hash functions are one-way: easy to compute, impossible to reverse
- Properties: deterministic, fixed-size output, avalanche effect, collision-resistant
- Use SHA-256 or stronger for security
- MD5 and SHA-1 are broken - avoid for security
- Common uses: file integrity, HMACs, digital signatures, deduplication
- NOT for password storage (use bcrypt/Argon2)
- HMAC combines hash with secret key for authentication
- Always use constant-time comparison for security-sensitive checks
