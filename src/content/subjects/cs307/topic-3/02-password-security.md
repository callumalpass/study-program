# Password Security

## The Password Problem

Passwords remain the most widely used authentication mechanism despite their well-known security limitations. Understanding how to properly handle passwords is critical for defensive security, as password breaches are among the most common security incidents.

The fundamental challenge with passwords is that they must be:
- Complex enough to resist guessing attacks
- Memorable enough for users to recall
- Stored securely so they cannot be compromised
- Transmitted safely during authentication

## Password Hashing: Core Concepts

Storing passwords in plaintext is one of the most critical security mistakes an application can make. If an attacker gains database access, all user accounts are immediately compromised. Instead, we store a one-way cryptographic hash of the password.

### Properties of Cryptographic Hash Functions

A good cryptographic hash function has these properties:

1. **Deterministic**: The same input always produces the same output
2. **One-way**: Computationally infeasible to reverse (find input from output)
3. **Collision-resistant**: Hard to find two different inputs with the same hash
4. **Avalanche effect**: Small input changes create completely different outputs

### Why NOT to Use Fast Hash Functions

General-purpose hash functions like MD5, SHA-1, or even SHA-256 are **wrong** for password hashing because they are designed to be fast. Modern hardware can compute billions of SHA-256 hashes per second, making brute force attacks practical.

Password hashing requires **slow** hash functions that are intentionally computationally expensive.

## Salt: Defending Against Rainbow Tables

A salt is a unique, random value added to each password before hashing. This prevents:

1. **Rainbow table attacks**: Precomputed hash databases become useless
2. **Identical password detection**: Two users with the same password have different hashes
3. **Parallel cracking**: Each password must be cracked individually

```python
import os
import hashlib

# WRONG: No salt
password = "MyPassword123"
hash_no_salt = hashlib.sha256(password.encode()).hexdigest()
print(f"Without salt: {hash_no_salt}")

# RIGHT: With unique salt
salt = os.urandom(32)  # Cryptographically secure random salt
hash_with_salt = hashlib.sha256(salt + password.encode()).hexdigest()
print(f"With salt: {hash_with_salt}")
print(f"Salt (hex): {salt.hex()}")

# Same password, different salt = different hash
salt2 = os.urandom(32)
hash_with_salt2 = hashlib.sha256(salt2 + password.encode()).hexdigest()
print(f"Same password, different salt: {hash_with_salt2}")
```

## Modern Password Hashing: Bcrypt

Bcrypt is a password hashing function designed specifically for password storage. It incorporates:

- **Adaptive cost factor**: Can increase computational cost as hardware improves
- **Built-in salting**: Automatically generates and stores salt
- **Slow by design**: Intentionally expensive to compute

```python
import bcrypt

class BcryptPasswordManager:
    """Password manager using bcrypt for secure password hashing"""

    def __init__(self, rounds: int = 12):
        """
        Initialize password manager with work factor
        rounds: Number of rounds (2^rounds iterations)
        Default of 12 = 4096 iterations, takes ~200ms
        """
        self.rounds = rounds

    def hash_password(self, password: str) -> bytes:
        """
        Hash a password using bcrypt
        Returns the hash which includes the salt and cost factor
        """
        # Convert password to bytes
        password_bytes = password.encode('utf-8')

        # Generate salt and hash (bcrypt handles salt generation)
        salt = bcrypt.gensalt(rounds=self.rounds)
        password_hash = bcrypt.hashpw(password_bytes, salt)

        return password_hash

    def verify_password(self, password: str, password_hash: bytes) -> bool:
        """
        Verify a password against its hash
        bcrypt extracts salt and cost from the hash automatically
        """
        password_bytes = password.encode('utf-8')

        try:
            return bcrypt.checkpw(password_bytes, password_hash)
        except Exception as e:
            # Log the error but don't leak information
            print(f"Verification error: {e}")
            return False

    def needs_rehash(self, password_hash: bytes) -> bool:
        """
        Check if password hash needs to be updated with new cost factor
        """
        # Extract cost factor from hash
        # Bcrypt hash format: $2b$[cost]$[22-char salt][31-char hash]
        hash_str = password_hash.decode('utf-8')
        parts = hash_str.split('$')

        if len(parts) >= 3:
            current_cost = int(parts[2])
            return current_cost < self.rounds

        return True

# Example usage
if __name__ == "__main__":
    manager = BcryptPasswordManager(rounds=12)

    # Hash a password
    password = "MySecurePassword123!"
    hashed = manager.hash_password(password)
    print(f"Hashed password: {hashed.decode('utf-8')}")

    # Verify correct password
    is_valid = manager.verify_password("MySecurePassword123!", hashed)
    print(f"Correct password verification: {is_valid}")

    # Verify incorrect password
    is_valid = manager.verify_password("WrongPassword", hashed)
    print(f"Wrong password verification: {is_valid}")

    # Check if rehashing is needed
    needs_update = manager.needs_rehash(hashed)
    print(f"Needs rehash: {needs_update}")
```

## Argon2: The Modern Standard

Argon2 won the Password Hashing Competition in 2015 and is considered the current best practice for password hashing. It offers superior resistance to GPU and ASIC attacks through memory-hard operations.

Argon2 has three variants:
- **Argon2d**: Maximizes resistance to GPU attacks (for cryptocurrencies)
- **Argon2i**: Optimized for password hashing, resistant to timing attacks
- **Argon2id**: Hybrid approach, recommended for most uses

```python
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError, InvalidHash

class Argon2PasswordManager:
    """
    Password manager using Argon2id for state-of-the-art password hashing
    """

    def __init__(
        self,
        time_cost: int = 2,      # Number of iterations
        memory_cost: int = 65536,  # Memory usage in KiB (64 MB)
        parallelism: int = 4      # Number of parallel threads
    ):
        """
        Initialize with Argon2 parameters
        These defaults provide strong security on modern hardware (~0.5s)
        """
        self.hasher = PasswordHasher(
            time_cost=time_cost,
            memory_cost=memory_cost,
            parallelism=parallelism,
            hash_len=32,           # Length of hash in bytes
            salt_len=16,           # Length of salt in bytes
        )

    def hash_password(self, password: str) -> str:
        """
        Hash a password using Argon2id
        Returns encoded hash string containing all parameters
        """
        try:
            return self.hasher.hash(password)
        except Exception as e:
            raise ValueError(f"Password hashing failed: {e}")

    def verify_password(self, password: str, password_hash: str) -> bool:
        """
        Verify a password against its Argon2 hash
        """
        try:
            self.hasher.verify(password_hash, password)
            return True
        except VerifyMismatchError:
            # Password doesn't match
            return False
        except (VerificationError, InvalidHash) as e:
            # Hash is corrupted or invalid
            print(f"Verification error: {e}")
            return False

    def check_needs_rehash(self, password_hash: str) -> bool:
        """
        Check if hash needs to be updated with new parameters
        """
        return self.hasher.check_needs_rehash(password_hash)

    def upgrade_hash_if_needed(self, password: str, old_hash: str) -> str:
        """
        Verify password and return new hash if parameters have changed
        """
        if self.verify_password(password, old_hash):
            if self.check_needs_rehash(old_hash):
                return self.hash_password(password)
            return old_hash
        raise ValueError("Password verification failed")

# Example usage
if __name__ == "__main__":
    manager = Argon2PasswordManager()

    # Hash passwords
    password1 = "SuperSecret123!"
    hash1 = manager.hash_password(password1)
    print(f"Argon2 hash: {hash1}\n")

    # Verify passwords
    print(f"Correct password: {manager.verify_password(password1, hash1)}")
    print(f"Wrong password: {manager.verify_password('WrongPass', hash1)}")

    # Check if rehash needed (will be False for same parameters)
    print(f"Needs rehash: {manager.check_needs_rehash(hash1)}")

    # Demonstrate hash upgrade
    old_manager = Argon2PasswordManager(time_cost=1, memory_cost=32768)
    old_hash = old_manager.hash_password(password1)
    print(f"\nOld hash: {old_hash}")

    new_manager = Argon2PasswordManager(time_cost=3, memory_cost=131072)
    print(f"Old hash needs upgrade: {new_manager.check_needs_rehash(old_hash)}")

    try:
        upgraded_hash = new_manager.upgrade_hash_if_needed(password1, old_hash)
        print(f"Upgraded hash: {upgraded_hash}")
    except ValueError as e:
        print(f"Upgrade failed: {e}")
```

## Password Storage Best Practices

### 1. Database Schema Design

Store password hashes separately from user data when possible. Use appropriate column types:

```python
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class UserCredentials:
    """Secure credential storage structure"""
    user_id: str
    password_hash: str  # Store as TEXT or BLOB
    hash_algorithm: str  # 'bcrypt', 'argon2id', etc.
    created_at: datetime
    updated_at: datetime
    last_rotation: datetime
    rotation_required: bool = False

    def should_rotate(self, max_age_days: int = 90) -> bool:
        """Check if password rotation is needed"""
        age = datetime.now() - self.last_rotation
        return age.days > max_age_days or self.rotation_required
```

### 2. Secure Password Requirements

```python
import re
from typing import List, Tuple

class PasswordValidator:
    """Validate password strength and security requirements"""

    def __init__(
        self,
        min_length: int = 12,
        require_uppercase: bool = True,
        require_lowercase: bool = True,
        require_digits: bool = True,
        require_special: bool = True,
        max_length: int = 128
    ):
        self.min_length = min_length
        self.max_length = max_length
        self.require_uppercase = require_uppercase
        self.require_lowercase = require_lowercase
        self.require_digits = require_digits
        self.require_special = require_special
        self.common_passwords = self._load_common_passwords()

    def _load_common_passwords(self) -> set:
        """Load common passwords to reject"""
        # In production, load from a file with millions of entries
        return {
            'password', 'Password123!', '123456', 'qwerty',
            'admin', 'letmein', 'welcome', 'monkey',
            'password1', 'password123', '12345678', 'abc123'
        }

    def validate(self, password: str) -> Tuple[bool, List[str]]:
        """
        Validate password against all requirements
        Returns (is_valid, list_of_errors)
        """
        errors = []

        # Length checks
        if len(password) < self.min_length:
            errors.append(f"Password must be at least {self.min_length} characters")

        if len(password) > self.max_length:
            errors.append(f"Password must not exceed {self.max_length} characters")

        # Character class requirements
        if self.require_uppercase and not re.search(r'[A-Z]', password):
            errors.append("Password must contain at least one uppercase letter")

        if self.require_lowercase and not re.search(r'[a-z]', password):
            errors.append("Password must contain at least one lowercase letter")

        if self.require_digits and not re.search(r'\d', password):
            errors.append("Password must contain at least one digit")

        if self.require_special and not re.search(r'[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]', password):
            errors.append("Password must contain at least one special character")

        # Common password check
        if password.lower() in self.common_passwords:
            errors.append("Password is too common, please choose a different one")

        # Sequential characters check
        if self._has_sequential_chars(password):
            errors.append("Password contains too many sequential characters")

        # Repeated characters check
        if self._has_repeated_chars(password):
            errors.append("Password contains too many repeated characters")

        return (len(errors) == 0, errors)

    def _has_sequential_chars(self, password: str, max_sequential: int = 3) -> bool:
        """Check for sequential characters like '123' or 'abc'"""
        for i in range(len(password) - max_sequential + 1):
            substr = password[i:i + max_sequential]
            if self._is_sequential(substr):
                return True
        return False

    def _is_sequential(self, s: str) -> bool:
        """Check if string is sequential"""
        if len(s) < 2:
            return False
        return all(ord(s[i+1]) - ord(s[i]) == 1 for i in range(len(s)-1))

    def _has_repeated_chars(self, password: str, max_repeated: int = 3) -> bool:
        """Check for repeated characters like 'aaa'"""
        for i in range(len(password) - max_repeated + 1):
            if len(set(password[i:i + max_repeated])) == 1:
                return True
        return False

# Example usage
if __name__ == "__main__":
    validator = PasswordValidator()

    test_passwords = [
        "weak",
        "Password123!",  # Common password
        "MyP@ssw0rd2024",  # Good password
        "aaaabbbb1!",  # Repeated characters
        "Abc12345!",  # Sequential
    ]

    for pwd in test_passwords:
        is_valid, errors = validator.validate(pwd)
        print(f"\nPassword: {pwd}")
        print(f"Valid: {is_valid}")
        if errors:
            print("Errors:")
            for error in errors:
                print(f"  - {error}")
```

## Pepper: Additional Security Layer

A pepper is a secret value added to all passwords before hashing, stored separately from the database (e.g., in environment variables or a key management service). Unlike salts, the same pepper is used for all passwords.

```python
import os
import hmac
import hashlib

class PepperedPasswordManager:
    """Password manager with pepper for additional security"""

    def __init__(self, pepper: str, base_hasher):
        """
        pepper: Secret key stored outside the database
        base_hasher: Underlying password hasher (bcrypt or argon2)
        """
        self.pepper = pepper.encode('utf-8')
        self.base_hasher = base_hasher

    def hash_password(self, password: str) -> str:
        """Hash password with pepper before base hashing"""
        # Apply pepper using HMAC
        peppered = hmac.new(
            self.pepper,
            password.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        # Hash the peppered password
        return self.base_hasher.hash_password(peppered)

    def verify_password(self, password: str, password_hash: str) -> bool:
        """Verify password with pepper"""
        peppered = hmac.new(
            self.pepper,
            password.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        return self.base_hasher.verify_password(peppered, password_hash)
```

## Conclusion

Proper password security requires multiple layers of defense: strong hashing algorithms (Argon2 or bcrypt), unique salts, optional peppers, password strength validation, and secure storage practices. Never implement your own cryptography—use well-tested libraries and follow established best practices. Remember that passwords are only one part of a comprehensive authentication strategy, and should be supplemented with multi-factor authentication whenever possible.
