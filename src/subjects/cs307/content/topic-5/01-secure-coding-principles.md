# Secure Coding Principles

Secure coding principles form the foundation of building resilient software systems that can withstand attacks and protect sensitive data. This subtopic covers fundamental security principles that should guide every development decision.

## Defense in Depth

Defense in depth is a layered security approach where multiple security controls are placed throughout a system, so if one layer fails, others continue to provide protection.

### Layered Security Architecture

```
┌─────────────────────────────────────────┐
│     Application Layer                   │
│  ├─ Input Validation                    │
│  ├─ Output Encoding                     │
│  └─ Authentication & Authorization      │
├─────────────────────────────────────────┤
│     Data Layer                          │
│  ├─ Parameterized Queries              │
│  ├─ Encryption at Rest                 │
│  └─ Data Integrity Checks              │
├─────────────────────────────────────────┤
│     Transport Layer                     │
│  ├─ TLS/SSL Encryption                 │
│  ├─ Certificate Pinning                │
│  └─ Secure Protocols                   │
├─────────────────────────────────────────┤
│     Infrastructure Layer                │
│  ├─ Firewalls                          │
│  ├─ IDS/IPS                            │
│  └─ Network Segmentation               │
└─────────────────────────────────────────┘
```

### Implementation Example

```python
from functools import wraps
import hashlib
import logging
from typing import Callable

class SecureUserService:
    """Multi-layered security for user operations"""

    def __init__(self, db, logger):
        self.db = db
        self.logger = logger

    def create_user(self, username: str, password: str, email: str):
        """
        Layer 1: Input validation
        Layer 2: Password hashing
        Layer 3: Database parameterization
        Layer 4: Audit logging
        """
        # Layer 1: Input validation
        if not self._validate_username(username):
            raise ValueError("Invalid username format")
        if not self._validate_email(email):
            raise ValueError("Invalid email format")
        if not self._validate_password_strength(password):
            raise ValueError("Password does not meet requirements")

        # Layer 2: Secure password storage
        salt = self._generate_salt()
        password_hash = self._hash_password(password, salt)

        try:
            # Layer 3: Parameterized query (SQL injection prevention)
            self.db.execute(
                "INSERT INTO users (username, password_hash, salt, email) VALUES (?, ?, ?, ?)",
                (username, password_hash, salt, email)
            )

            # Layer 4: Audit logging (without sensitive data)
            self.logger.info(f"User created: {username}")

        except Exception as e:
            # Layer 5: Secure error handling
            self.logger.error(f"User creation failed: {type(e).__name__}")
            raise RuntimeError("Failed to create user") from None

    def _validate_username(self, username: str) -> bool:
        """Whitelist validation"""
        if not username or len(username) < 3 or len(username) > 32:
            return False
        # Allow only alphanumeric and underscore
        return username.replace('_', '').isalnum()

    def _validate_email(self, email: str) -> bool:
        """Basic email validation"""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))

    def _validate_password_strength(self, password: str) -> bool:
        """Enforce password policy"""
        if len(password) < 12:
            return False
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)
        has_digit = any(c.isdigit() for c in password)
        has_special = any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password)
        return has_upper and has_lower and has_digit and has_special

    def _generate_salt(self) -> bytes:
        """Generate cryptographic salt"""
        import os
        return os.urandom(32)

    def _hash_password(self, password: str, salt: bytes) -> str:
        """Use PBKDF2 for password hashing"""
        import hashlib
        return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000).hex()
```

## Fail Securely

Systems should fail in a secure state, denying access by default rather than granting it when errors occur.

### Secure Failure Patterns

```python
class AuthenticationService:
    """Demonstrates fail-secure principles"""

    def authenticate(self, username: str, password: str) -> bool:
        """
        Fail securely: deny access on any error
        """
        try:
            user = self._get_user(username)

            # If user not found, return False (not an exception)
            if user is None:
                # Log for security monitoring
                self._log_failed_attempt(username)
                return False

            # Check if account is locked
            if user.is_locked:
                self._log_locked_account_attempt(username)
                return False

            # Verify password
            if not self._verify_password(password, user.password_hash, user.salt):
                self._increment_failed_attempts(user)
                self._log_failed_attempt(username)
                return False

            # Success: reset failed attempts
            self._reset_failed_attempts(user)
            self._log_successful_login(username)
            return True

        except DatabaseError as e:
            # Fail securely: database error denies access
            self._log_error("Database error during authentication", e)
            return False

        except Exception as e:
            # Fail securely: any unexpected error denies access
            self._log_error("Unexpected authentication error", e)
            return False

    def authorize(self, user_id: int, resource: str, action: str) -> bool:
        """
        Fail securely: deny authorization by default
        """
        # Default to deny
        authorized = False

        try:
            permissions = self._get_user_permissions(user_id)

            # Explicit permission check
            authorized = self._check_permission(permissions, resource, action)

        except Exception as e:
            # On error, authorized remains False
            self._log_error("Authorization check failed", e)

        # Log authorization decision
        self._log_authorization_attempt(user_id, resource, action, authorized)

        return authorized
```

### Secure Default Configuration

```python
class SecureConfiguration:
    """Secure-by-default configuration"""

    # Default to most secure options
    DEFAULT_CONFIG = {
        'session_timeout': 900,  # 15 minutes
        'max_login_attempts': 3,
        'account_lockout_duration': 1800,  # 30 minutes
        'password_min_length': 12,
        'require_mfa': True,
        'log_level': 'INFO',
        'secure_cookies': True,
        'http_only_cookies': True,
        'same_site_cookies': 'Strict',
        'tls_min_version': '1.3',
        'allow_insecure_connections': False,
        'default_permissions': [],  # Empty = no permissions
    }

    def __init__(self, custom_config: dict = None):
        """Initialize with secure defaults, allow override"""
        self.config = self.DEFAULT_CONFIG.copy()

        if custom_config:
            # Only allow specific overrides, validate them
            self._apply_custom_config(custom_config)

    def _apply_custom_config(self, custom: dict):
        """Apply custom configuration with validation"""
        for key, value in custom.items():
            if key not in self.DEFAULT_CONFIG:
                raise ValueError(f"Unknown configuration key: {key}")

            # Validate security-critical settings
            if key == 'session_timeout' and value > 3600:
                raise ValueError("Session timeout too long (max 1 hour)")
            if key == 'password_min_length' and value < 8:
                raise ValueError("Password minimum length too short")
            if key == 'tls_min_version' and float(value) < 1.2:
                raise ValueError("TLS version too old (minimum 1.2)")

            self.config[key] = value
```

## Least Privilege

Grant only the minimum permissions necessary for functionality, limiting potential damage from compromised components.

### Role-Based Access Control (RBAC)

```python
from enum import Enum
from typing import Set, Dict

class Permission(Enum):
    """Fine-grained permissions"""
    READ_USER = "read:user"
    WRITE_USER = "write:user"
    DELETE_USER = "delete:user"
    READ_ADMIN = "read:admin"
    WRITE_ADMIN = "write:admin"
    READ_AUDIT = "read:audit"
    WRITE_AUDIT = "write:audit"

class Role:
    """Roles with minimal necessary permissions"""
    def __init__(self, name: str, permissions: Set[Permission]):
        self.name = name
        self.permissions = permissions

# Define roles with least privilege
ROLES = {
    'viewer': Role('viewer', {
        Permission.READ_USER
    }),
    'user': Role('user', {
        Permission.READ_USER,
        Permission.WRITE_USER
    }),
    'moderator': Role('moderator', {
        Permission.READ_USER,
        Permission.WRITE_USER,
        Permission.DELETE_USER
    }),
    'admin': Role('admin', {
        Permission.READ_USER,
        Permission.WRITE_USER,
        Permission.DELETE_USER,
        Permission.READ_ADMIN,
        Permission.WRITE_ADMIN
    }),
    'auditor': Role('auditor', {
        Permission.READ_USER,
        Permission.READ_ADMIN,
        Permission.READ_AUDIT,
        Permission.WRITE_AUDIT
    })
}

class AccessControl:
    """Enforce least privilege access control"""

    def __init__(self):
        self.user_roles: Dict[int, Set[str]] = {}

    def assign_role(self, user_id: int, role_name: str):
        """Assign role to user"""
        if role_name not in ROLES:
            raise ValueError(f"Unknown role: {role_name}")

        if user_id not in self.user_roles:
            self.user_roles[user_id] = set()

        self.user_roles[user_id].add(role_name)

    def check_permission(self, user_id: int, permission: Permission) -> bool:
        """Check if user has specific permission"""
        if user_id not in self.user_roles:
            return False

        # Collect all permissions from user's roles
        user_permissions = set()
        for role_name in self.user_roles[user_id]:
            role = ROLES[role_name]
            user_permissions.update(role.permissions)

        return permission in user_permissions

    def require_permission(self, permission: Permission):
        """Decorator to enforce permission"""
        def decorator(func):
            @wraps(func)
            def wrapper(self, user_id: int, *args, **kwargs):
                if not self.check_permission(user_id, permission):
                    raise PermissionError(
                        f"User {user_id} lacks permission: {permission.value}"
                    )
                return func(self, user_id, *args, **kwargs)
            return wrapper
        return decorator
```

## Complete Mediation

Every access to every object must be checked for authorization, with no caching of authorization decisions.

### Access Control Implementation

```python
from datetime import datetime, timedelta
from typing import Optional

class ResourceAccessControl:
    """Complete mediation for resource access"""

    def __init__(self, access_control: AccessControl):
        self.access_control = access_control
        # DO NOT cache authorization decisions
        # Each access must be checked

    def read_document(self, user_id: int, document_id: int) -> str:
        """Every read requires fresh authorization check"""
        # Check permission on EVERY access
        if not self.access_control.check_permission(user_id, Permission.READ_USER):
            raise PermissionError("Not authorized to read documents")

        # Additional checks: ownership, sharing, etc.
        if not self._can_access_document(user_id, document_id):
            raise PermissionError("Not authorized for this document")

        return self._fetch_document(document_id)

    def write_document(self, user_id: int, document_id: int, content: str):
        """Every write requires fresh authorization check"""
        # Never assume previous authorization still valid
        if not self.access_control.check_permission(user_id, Permission.WRITE_USER):
            raise PermissionError("Not authorized to write documents")

        if not self._can_modify_document(user_id, document_id):
            raise PermissionError("Not authorized to modify this document")

        # Additional validation
        if not self._validate_content(content):
            raise ValueError("Invalid content")

        self._save_document(document_id, content)

    def _can_access_document(self, user_id: int, document_id: int) -> bool:
        """Check document-level access (no caching)"""
        # Fresh check every time
        doc = self._get_document_metadata(document_id)
        return doc.owner_id == user_id or user_id in doc.shared_with

    def _can_modify_document(self, user_id: int, document_id: int) -> bool:
        """Check modification rights (no caching)"""
        doc = self._get_document_metadata(document_id)
        return doc.owner_id == user_id or user_id in doc.editors
```

## Open Design

Security should not depend on secrecy of implementation, only on secrecy of keys.

### Kerckhoffs's Principle

```python
import os
import hmac
import hashlib
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

class SecureDataStorage:
    """
    Security through cryptography, not obscurity
    Algorithm is public, only the key is secret
    """

    def __init__(self, encryption_key: bytes):
        """
        encryption_key should be securely generated and stored
        Algorithm (AES-256-GCM) is well-known and publicly vetted
        """
        if len(encryption_key) != 32:  # 256 bits
            raise ValueError("Key must be 32 bytes (256 bits)")

        self.encryption_key = encryption_key

    def encrypt(self, plaintext: bytes) -> dict:
        """
        Use standard, well-vetted encryption (AES-256-GCM)
        NOT a custom algorithm
        """
        # Generate random IV (initialization vector)
        iv = os.urandom(12)  # 96 bits for GCM

        # Use standard AES-GCM (authenticated encryption)
        cipher = Cipher(
            algorithms.AES(self.encryption_key),
            modes.GCM(iv),
            backend=default_backend()
        )

        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(plaintext) + encryptor.finalize()

        # Return all necessary components (not secret)
        return {
            'ciphertext': ciphertext,
            'iv': iv,
            'tag': encryptor.tag  # Authentication tag
        }

    def decrypt(self, encrypted_data: dict) -> bytes:
        """Decrypt using standard algorithm"""
        cipher = Cipher(
            algorithms.AES(self.encryption_key),
            modes.GCM(encrypted_data['iv'], encrypted_data['tag']),
            backend=default_backend()
        )

        decryptor = cipher.decryptor()
        plaintext = decryptor.update(encrypted_data['ciphertext']) + decryptor.finalize()

        return plaintext

# Example: Never rely on custom crypto
def bad_custom_encryption(data: str, key: str) -> str:
    """
    DON'T DO THIS: Custom encryption is almost always broken
    """
    # This is NOT secure, just an example of what NOT to do
    result = ""
    for i, char in enumerate(data):
        result += chr(ord(char) ^ ord(key[i % len(key)]))
    return result

# Instead, use well-vetted libraries and algorithms
def good_encryption(data: bytes, key: bytes) -> dict:
    """
    DO THIS: Use established, peer-reviewed cryptography
    """
    storage = SecureDataStorage(key)
    return storage.encrypt(data)
```

## Separation of Privileges

Require multiple conditions to be met for access, dividing authority among multiple parties.

### Multi-Factor Authentication

```python
import pyotp
import qrcode
from typing import Tuple

class MultiFactorAuth:
    """Separation of privilege through multiple authentication factors"""

    def __init__(self, db, notifier):
        self.db = db
        self.notifier = notifier

    def authenticate_user(self, username: str, password: str,
                         totp_code: str = None,
                         recovery_code: str = None) -> bool:
        """
        Require multiple factors:
        1. Something you know (password)
        2. Something you have (TOTP device or recovery code)
        """
        # Factor 1: Password (something you know)
        if not self._verify_password(username, password):
            return False

        user = self._get_user(username)

        # If MFA is required, check second factor
        if user.mfa_enabled:
            # Factor 2: TOTP or recovery code (something you have)
            if totp_code:
                if not self._verify_totp(user, totp_code):
                    return False
            elif recovery_code:
                if not self._verify_recovery_code(user, recovery_code):
                    return False
            else:
                # MFA required but not provided
                return False

        return True

    def enable_mfa(self, user_id: int) -> Tuple[str, list]:
        """
        Enable MFA and generate:
        - TOTP secret (for authenticator app)
        - Recovery codes (backup method)
        """
        # Generate TOTP secret
        secret = pyotp.random_base32()

        # Generate recovery codes
        recovery_codes = [self._generate_recovery_code() for _ in range(10)]

        # Store hashed recovery codes
        hashed_codes = [self._hash_recovery_code(code) for code in recovery_codes]

        self.db.update_user(user_id, {
            'mfa_enabled': True,
            'totp_secret': secret,
            'recovery_codes': hashed_codes
        })

        # Return secret and recovery codes (only time they're shown)
        return secret, recovery_codes

    def _verify_totp(self, user, code: str) -> bool:
        """Verify TOTP code from authenticator app"""
        totp = pyotp.TOTP(user.totp_secret)
        return totp.verify(code, valid_window=1)

    def _generate_recovery_code(self) -> str:
        """Generate secure recovery code"""
        import secrets
        return '-'.join(secrets.token_hex(4) for _ in range(2))
```

## Summary

Secure coding principles provide a framework for building resilient systems:

- **Defense in Depth**: Multiple layers of security controls protect against single point of failure
- **Fail Securely**: Systems deny access by default when errors occur, never failing open
- **Least Privilege**: Grant minimum necessary permissions, limiting blast radius of compromises
- **Complete Mediation**: Check every access to every resource, never cache authorization
- **Open Design**: Rely on cryptographic keys, not algorithm secrecy (Kerckhoffs's Principle)
- **Separation of Privileges**: Require multiple conditions/factors for sensitive operations

These principles should guide every design and implementation decision, creating security as a fundamental property rather than an afterthought.
