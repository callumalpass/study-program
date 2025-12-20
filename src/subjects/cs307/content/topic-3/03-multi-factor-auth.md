# Multi-Factor Authentication

## Introduction to Multi-Factor Authentication

Multi-Factor Authentication (MFA), also called Two-Factor Authentication (2FA) when using exactly two factors, significantly strengthens security by requiring users to provide multiple independent credentials. The core principle is that even if one factor is compromised, the attacker still cannot gain access.

MFA combines factors from different categories:
- Something you know (password, PIN)
- Something you have (phone, hardware token, smart card)
- Something you are (fingerprint, face, voice)

According to Microsoft's security research, MFA blocks over 99.9% of account compromise attacks, making it one of the most effective security controls available.

## Time-Based One-Time Passwords (TOTP)

TOTP generates temporary codes that expire after a short period (typically 30 seconds). It's based on RFC 6238 and uses a shared secret between the server and client along with the current time.

### TOTP Algorithm

The TOTP algorithm works as follows:
1. Shared secret is established during enrollment (shown as QR code)
2. Current Unix time is divided by time step (30 seconds)
3. HMAC-SHA1 is computed using secret and time value
4. A 6-digit code is extracted from the HMAC output
5. User enters this code within the validity window

```python
import hmac
import hashlib
import struct
import time
import base64
import qrcode
from io import BytesIO

class TOTPGenerator:
    """
    Time-based One-Time Password generator
    Implements RFC 6238
    """

    def __init__(
        self,
        secret: bytes = None,
        time_step: int = 30,
        digits: int = 6,
        digest: str = 'sha1'
    ):
        """
        Initialize TOTP generator

        secret: Shared secret key (generated if not provided)
        time_step: Time step in seconds (default 30)
        digits: Number of digits in code (default 6)
        digest: Hash algorithm (sha1, sha256, sha512)
        """
        if secret is None:
            import secrets as sec
            secret = sec.token_bytes(20)  # 160-bit secret

        self.secret = secret
        self.time_step = time_step
        self.digits = digits
        self.digest = getattr(hashlib, digest)

    def get_time_counter(self, timestamp: float = None) -> int:
        """
        Get the time counter value
        Divides Unix timestamp by time step
        """
        if timestamp is None:
            timestamp = time.time()
        return int(timestamp / self.time_step)

    def generate_code(self, timestamp: float = None) -> str:
        """
        Generate TOTP code for given timestamp
        """
        counter = self.get_time_counter(timestamp)

        # Convert counter to 8-byte big-endian
        counter_bytes = struct.pack('>Q', counter)

        # Compute HMAC
        hmac_hash = hmac.new(
            self.secret,
            counter_bytes,
            self.digest
        ).digest()

        # Dynamic truncation
        offset = hmac_hash[-1] & 0x0f
        code_bytes = hmac_hash[offset:offset + 4]

        # Convert to integer
        code_int = struct.unpack('>I', code_bytes)[0]
        code_int = code_int & 0x7fffffff  # Remove sign bit

        # Get last N digits
        code = code_int % (10 ** self.digits)

        # Pad with zeros if necessary
        return str(code).zfill(self.digits)

    def verify_code(
        self,
        code: str,
        timestamp: float = None,
        window: int = 1
    ) -> bool:
        """
        Verify a TOTP code

        code: The code to verify
        timestamp: Time to verify against (default: current time)
        window: Number of time steps to check before/after (default: 1)
                Allows for clock skew
        """
        if timestamp is None:
            timestamp = time.time()

        # Try current time and nearby time steps
        for offset in range(-window, window + 1):
            check_time = timestamp + (offset * self.time_step)
            expected_code = self.generate_code(check_time)

            # Use constant-time comparison
            if hmac.compare_digest(code, expected_code):
                return True

        return False

    def get_provisioning_uri(
        self,
        account_name: str,
        issuer: str = "MyApp"
    ) -> str:
        """
        Generate provisioning URI for QR code
        Compatible with Google Authenticator, Authy, etc.
        """
        secret_b32 = base64.b32encode(self.secret).decode('utf-8')

        params = {
            'secret': secret_b32,
            'issuer': issuer,
            'algorithm': self.digest().name.upper(),
            'digits': self.digits,
            'period': self.time_step
        }

        param_str = '&'.join(f"{k}={v}" for k, v in params.items())
        return f"otpauth://totp/{issuer}:{account_name}?{param_str}"

    def generate_qr_code(self, account_name: str, issuer: str = "MyApp"):
        """
        Generate QR code for mobile app enrollment
        """
        uri = self.get_provisioning_uri(account_name, issuer)
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(uri)
        qr.make(fit=True)
        return qr.make_image(fill_color="black", back_color="white")


# Example usage
if __name__ == "__main__":
    # Create TOTP generator
    totp = TOTPGenerator()

    # Generate current code
    current_code = totp.generate_code()
    print(f"Current TOTP code: {current_code}")

    # Verify the code
    is_valid = totp.verify_code(current_code)
    print(f"Code verification: {is_valid}")

    # Simulate code expiration
    time.sleep(2)
    future_code = totp.generate_code()
    print(f"Code after 2 seconds: {future_code}")

    # Verify old code with window
    is_valid_windowed = totp.verify_code(current_code, window=1)
    print(f"Old code valid with window: {is_valid_windowed}")

    # Generate provisioning URI
    uri = totp.get_provisioning_uri("user@example.com", "SecureApp")
    print(f"\nProvisioning URI: {uri}")

    # Secret in base32 for manual entry
    secret_b32 = base64.b32encode(totp.secret).decode('utf-8')
    print(f"Secret (base32): {secret_b32}")
```

## HMAC-Based One-Time Passwords (HOTP)

HOTP (RFC 4226) uses a counter instead of time. Each code generation increments the counter, making codes valid indefinitely until used. This is useful for hardware tokens without clocks.

```python
class HOTPGenerator:
    """
    HMAC-based One-Time Password generator
    Implements RFC 4226
    """

    def __init__(
        self,
        secret: bytes = None,
        digits: int = 6,
        digest: str = 'sha1'
    ):
        if secret is None:
            import secrets as sec
            secret = sec.token_bytes(20)

        self.secret = secret
        self.digits = digits
        self.digest = getattr(hashlib, digest)
        self.counter = 0

    def generate_code(self, counter: int = None) -> str:
        """Generate HOTP code for given counter value"""
        if counter is None:
            counter = self.counter
            self.counter += 1

        # Convert counter to 8-byte big-endian
        counter_bytes = struct.pack('>Q', counter)

        # Compute HMAC
        hmac_hash = hmac.new(
            self.secret,
            counter_bytes,
            self.digest
        ).digest()

        # Dynamic truncation (same as TOTP)
        offset = hmac_hash[-1] & 0x0f
        code_bytes = hmac_hash[offset:offset + 4]
        code_int = struct.unpack('>I', code_bytes)[0]
        code_int = code_int & 0x7fffffff

        code = code_int % (10 ** self.digits)
        return str(code).zfill(self.digits)

    def verify_code(
        self,
        code: str,
        counter: int,
        lookahead: int = 10
    ) -> bool:
        """
        Verify HOTP code with lookahead window

        lookahead: Check next N counter values for desynchronization
        """
        for offset in range(lookahead + 1):
            expected_code = self.generate_code(counter + offset)
            if hmac.compare_digest(code, expected_code):
                # Update counter to prevent reuse
                self.counter = counter + offset + 1
                return True
        return False

# Example usage
if __name__ == "__main__":
    hotp = HOTPGenerator()

    # Generate codes
    codes = [hotp.generate_code() for _ in range(5)]
    print("Generated HOTP codes:", codes)

    # Verify code
    is_valid = hotp.verify_code(codes[2], counter=2)
    print(f"Code verification: {is_valid}")
```

## Hardware Tokens and Security Keys

Hardware tokens provide physical second-factor authentication. Modern security keys use the FIDO2/WebAuthn standard, which provides strong cryptographic authentication.

### FIDO2/WebAuthn Overview

FIDO2 uses public key cryptography:
1. During registration, the key generates a key pair
2. Public key is stored on the server
3. Private key never leaves the hardware device
4. Authentication uses cryptographic challenge-response

```python
from dataclasses import dataclass
from typing import Optional
import secrets
import json

@dataclass
class SecurityKeyCredential:
    """Represents a registered security key"""
    credential_id: bytes
    public_key: bytes
    sign_count: int
    user_id: str
    created_at: float

class SecurityKeyManager:
    """
    Simplified security key registration and verification
    In production, use libraries like python-fido2
    """

    def __init__(self):
        self.credentials = {}  # credential_id -> SecurityKeyCredential

    def generate_challenge(self) -> bytes:
        """Generate cryptographic challenge for authentication"""
        return secrets.token_bytes(32)

    def register_credential(
        self,
        user_id: str,
        credential_id: bytes,
        public_key: bytes
    ) -> bool:
        """
        Register a new security key credential

        In real implementation, this would:
        1. Verify attestation statement
        2. Validate credential data
        3. Store public key
        """
        if credential_id in self.credentials:
            return False

        credential = SecurityKeyCredential(
            credential_id=credential_id,
            public_key=public_key,
            sign_count=0,
            user_id=user_id,
            created_at=time.time()
        )

        self.credentials[credential_id] = credential
        return True

    def verify_authentication(
        self,
        credential_id: bytes,
        challenge: bytes,
        signature: bytes,
        sign_count: int
    ) -> bool:
        """
        Verify security key authentication response

        In real implementation, this would:
        1. Verify signature using stored public key
        2. Check sign_count for cloning detection
        3. Validate challenge matches
        """
        if credential_id not in self.credentials:
            return False

        credential = self.credentials[credential_id]

        # Check for cloning (sign count should always increase)
        if sign_count <= credential.sign_count:
            # Possible cloned device
            return False

        # In real implementation: verify signature here
        # For demonstration, we'll assume verification succeeds

        # Update sign count
        credential.sign_count = sign_count
        return True

    def get_user_credentials(self, user_id: str) -> list:
        """Get all credentials for a user"""
        return [
            cred for cred in self.credentials.values()
            if cred.user_id == user_id
        ]
```

## Biometric Authentication

Biometric authentication uses physical characteristics for verification. Common implementations include:

- **Fingerprint**: Capacitive or optical sensors
- **Face Recognition**: 2D or 3D facial mapping
- **Iris Scanning**: Infrared pattern analysis
- **Voice Recognition**: Vocal characteristics analysis

### Biometric Security Considerations

```python
from typing import Tuple
import numpy as np

class BiometricAuthenticator:
    """
    Simplified biometric authentication system
    Demonstrates key concepts without actual biometric processing
    """

    def __init__(self, false_acceptance_rate: float = 0.001):
        """
        false_acceptance_rate: Probability of accepting wrong user
        Typical FAR: 1 in 1,000 to 1 in 100,000
        """
        self.far = false_acceptance_rate
        self.templates = {}  # user_id -> biometric template
        self.threshold = 0.85  # Similarity threshold

    def enroll(self, user_id: str, biometric_data: np.ndarray) -> bool:
        """
        Enroll user's biometric template
        In production, store hash of template, not raw data
        """
        if user_id in self.templates:
            return False

        # Extract features and create template
        template = self._extract_features(biometric_data)
        self.templates[user_id] = template
        return True

    def authenticate(
        self,
        user_id: str,
        biometric_data: np.ndarray
    ) -> Tuple[bool, float]:
        """
        Authenticate user using biometric data
        Returns (success, confidence_score)
        """
        if user_id not in self.templates:
            return False, 0.0

        # Extract features from provided data
        sample_template = self._extract_features(biometric_data)

        # Compare with stored template
        similarity = self._compare_templates(
            self.templates[user_id],
            sample_template
        )

        # Decision based on threshold
        authenticated = similarity >= self.threshold

        return authenticated, similarity

    def _extract_features(self, biometric_data: np.ndarray) -> np.ndarray:
        """
        Extract biometric features
        In production: minutiae for fingerprints, embeddings for face
        """
        # Simplified: normalize and reduce dimensionality
        features = biometric_data.flatten()
        features = features / (np.linalg.norm(features) + 1e-8)
        return features

    def _compare_templates(
        self,
        template1: np.ndarray,
        template2: np.ndarray
    ) -> float:
        """
        Compare biometric templates
        Returns similarity score (0.0 to 1.0)
        """
        # Simplified: cosine similarity
        similarity = np.dot(template1, template2)
        return float(np.clip(similarity, 0.0, 1.0))

    def update_template(
        self,
        user_id: str,
        biometric_data: np.ndarray,
        adaptation_rate: float = 0.1
    ):
        """
        Update biometric template to adapt to changes
        Helps with aging, injuries, etc.
        """
        if user_id not in self.templates:
            return False

        new_features = self._extract_features(biometric_data)

        # Adaptive template update
        self.templates[user_id] = (
            (1 - adaptation_rate) * self.templates[user_id] +
            adaptation_rate * new_features
        )
        return True

# Example usage demonstrating biometric concepts
if __name__ == "__main__":
    bio_auth = BiometricAuthenticator()

    # Simulate biometric data (e.g., fingerprint minutiae)
    user_biometric = np.random.rand(128)

    # Enroll user
    bio_auth.enroll("user123", user_biometric)
    print("User enrolled")

    # Authentic user (small variations)
    authentic_sample = user_biometric + np.random.rand(128) * 0.1
    success, confidence = bio_auth.authenticate("user123", authentic_sample)
    print(f"Authentic user: {success} (confidence: {confidence:.3f})")

    # Impostor
    impostor_sample = np.random.rand(128)
    success, confidence = bio_auth.authenticate("user123", impostor_sample)
    print(f"Impostor: {success} (confidence: {confidence:.3f})")
```

## Complete MFA Implementation

Here's a complete multi-factor authentication system combining multiple methods:

```python
from enum import Enum
from typing import Optional, List

class MFAMethod(Enum):
    """Available MFA methods"""
    TOTP = "totp"
    HOTP = "hotp"
    SECURITY_KEY = "security_key"
    BIOMETRIC = "biometric"
    SMS = "sms"  # Not recommended due to SS7 vulnerabilities

class MFASystem:
    """Complete multi-factor authentication system"""

    def __init__(self):
        self.totp_manager = {}  # user_id -> TOTPGenerator
        self.security_key_manager = SecurityKeyManager()
        self.backup_codes = {}  # user_id -> set of codes

    def enable_totp(self, user_id: str) -> Tuple[TOTPGenerator, str]:
        """
        Enable TOTP for user
        Returns (generator, provisioning_uri)
        """
        totp = TOTPGenerator()
        self.totp_manager[user_id] = totp

        # Generate backup codes
        self._generate_backup_codes(user_id)

        uri = totp.get_provisioning_uri(user_id, "SecureApp")
        return totp, uri

    def verify_totp(self, user_id: str, code: str) -> bool:
        """Verify TOTP code"""
        if user_id not in self.totp_manager:
            return False

        return self.totp_manager[user_id].verify_code(code)

    def _generate_backup_codes(
        self,
        user_id: str,
        count: int = 10
    ) -> List[str]:
        """Generate single-use backup codes"""
        codes = set()
        for _ in range(count):
            code = secrets.token_hex(4).upper()
            codes.add(code)

        self.backup_codes[user_id] = codes
        return list(codes)

    def verify_backup_code(self, user_id: str, code: str) -> bool:
        """Verify and consume backup code"""
        if user_id not in self.backup_codes:
            return False

        if code.upper() in self.backup_codes[user_id]:
            self.backup_codes[user_id].remove(code.upper())
            return True

        return False

    def get_enabled_methods(self, user_id: str) -> List[MFAMethod]:
        """Get list of enabled MFA methods for user"""
        methods = []

        if user_id in self.totp_manager:
            methods.append(MFAMethod.TOTP)

        if self.security_key_manager.get_user_credentials(user_id):
            methods.append(MFAMethod.SECURITY_KEY)

        return methods
```

## Conclusion

Multi-factor authentication is essential for modern security. TOTP provides a good balance of security and usability, hardware security keys offer the strongest protection against phishing, and biometric authentication adds convenience. Implementing MFA properly requires understanding the trade-offs between security, usability, and privacy. Always provide backup authentication methods and educate users about the importance of protecting their second factors.
