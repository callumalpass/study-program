# Key Management

## Introduction

Key management is the most critical aspect of cryptography. No matter how strong your encryption algorithm is, poor key management can completely compromise security. In fact, most real-world cryptographic breaches happen not because the algorithms were broken, but because keys were mishandled.

Key management encompasses the entire lifecycle of cryptographic keys: generation, storage, distribution, rotation, and destruction. A single mistake in any of these areas can render your entire security system useless.

## Key Generation

Cryptographic keys must be truly random and unpredictable. Using weak random number generation is like using "password123" as your encryption key.

```python
import os
import secrets

class KeyGeneration:
    """Secure key generation practices"""

    def generate_symmetric_key(self, key_size=32):
        """Generate symmetric encryption key"""

        # GOOD: Use cryptographically secure random
        key = secrets.token_bytes(key_size)

        return {
            'key': key,
            'size_bits': key_size * 8,
            'size_bytes': key_size,
            'method': 'secrets.token_bytes (CSPRNG)',
            'security': 'Cryptographically secure'
        }

    def bad_key_generation_examples(self):
        """Examples of INSECURE key generation - NEVER DO THIS"""

        import random
        import hashlib

        # BAD: Using standard random module
        bad_key_1 = bytes([random.randint(0, 255) for _ in range(32)])
        # Problem: random is not cryptographically secure, predictable

        # BAD: Hash of predictable value
        bad_key_2 = hashlib.sha256(b"my_password").digest()
        # Problem: Low entropy, predictable if password is weak

        # BAD: Current time as seed
        random.seed(1234567890)
        bad_key_3 = bytes([random.randint(0, 255) for _ in range(32)])
        # Problem: Completely predictable

        # BAD: Hardcoded key
        bad_key_4 = b"this_is_my_secret_key_12345!"
        # Problem: Not random, likely in source code

        return {
            'all_these_keys': 'INSECURE',
            'do_not_use': 'Attackers can predict or find these keys'
        }

    def good_key_generation_examples(self):
        """Correct ways to generate keys"""

        # Method 1: secrets module (Python 3.6+) - RECOMMENDED
        key1 = secrets.token_bytes(32)

        # Method 2: os.urandom - also cryptographically secure
        key2 = os.urandom(32)

        # Method 3: Use library's key generation
        from cryptography.fernet import Fernet
        key3 = Fernet.generate_key()

        # Method 4: Derive from password using KDF (for user passwords)
        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
        from cryptography.hazmat.primitives import hashes

        password = b"user_chosen_password"
        salt = os.urandom(16)  # Random salt

        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=600000,  # High iteration count for security
        )
        key4 = kdf.derive(password)

        return {
            'secrets.token_bytes': 'Recommended for most use cases',
            'os.urandom': 'Good alternative',
            'library_generation': 'Use library-provided key generation',
            'password_derivation': 'Use KDF for user passwords, never hash directly'
        }

# Asymmetric key generation
from cryptography.hazmat.primitives.asymmetric import rsa, ec

class AsymmetricKeyGeneration:
    """Generate asymmetric key pairs securely"""

    def generate_rsa_keypair(self, key_size=2048):
        """Generate RSA key pair"""

        # Key size recommendations:
        # 2048 bits: Minimum (valid until ~2030)
        # 3072 bits: Recommended for long-term
        # 4096 bits: Maximum common size

        private_key = rsa.generate_private_key(
            public_exponent=65537,  # Standard public exponent
            key_size=key_size
        )
        public_key = private_key.public_key()

        return {
            'private_key': private_key,
            'public_key': public_key,
            'key_size': key_size,
            'security_level': self._rsa_security_level(key_size)
        }

    def generate_ec_keypair(self, curve=None):
        """Generate Elliptic Curve key pair"""

        # Curve recommendations:
        # SECP256R1 (P-256): Widely supported, 128-bit security
        # SECP384R1 (P-384): Higher security, 192-bit
        # SECP521R1 (P-521): Maximum security, 256-bit

        if curve is None:
            curve = ec.SECP256R1()  # Default to P-256

        private_key = ec.generate_private_key(curve)
        public_key = private_key.public_key()

        return {
            'private_key': private_key,
            'public_key': public_key,
            'curve': curve.name,
            'key_size_equivalent': self._ec_equivalent(curve.name)
        }

    def _rsa_security_level(self, key_size):
        levels = {
            2048: '112-bit security (minimum)',
            3072: '128-bit security (recommended)',
            4096: '140-bit security (high)'
        }
        return levels.get(key_size, 'Unknown')

    def _ec_equivalent(self, curve_name):
        equivalents = {
            'secp256r1': 'Equivalent to RSA-3072',
            'secp384r1': 'Equivalent to RSA-7680',
            'secp521r1': 'Equivalent to RSA-15360'
        }
        return equivalents.get(curve_name, 'Unknown')
```

## Key Storage

Storing keys securely is crucial. Keys must be protected from unauthorized access, but also available when needed.

```python
class KeyStorage:
    """Secure key storage strategies"""

    def storage_options(self):
        """Compare different key storage methods"""

        return {
            'hardware_security_module': {
                'security': 'Highest',
                'description': 'Dedicated hardware device for key storage',
                'features': [
                    'Keys never leave hardware',
                    'FIPS 140-2 certified',
                    'Tamper-resistant',
                    'Audit logging'
                ],
                'use_cases': ['Banking', 'Certificate authorities', 'High-security applications'],
                'cost': 'High',
                'examples': ['AWS CloudHSM', 'Azure Dedicated HSM', 'Physical HSM devices']
            },

            'key_management_service': {
                'security': 'High',
                'description': 'Cloud-based key management',
                'features': [
                    'Centralized key management',
                    'Access control and audit',
                    'Automatic rotation',
                    'Integration with cloud services'
                ],
                'use_cases': ['Cloud applications', 'Modern infrastructure'],
                'cost': 'Medium',
                'examples': ['AWS KMS', 'Azure Key Vault', 'Google Cloud KMS', 'HashiCorp Vault']
            },

            'encrypted_key_files': {
                'security': 'Medium',
                'description': 'Store keys in encrypted files',
                'features': [
                    'Keys encrypted with master password',
                    'File permissions protect access',
                    'Backup friendly'
                ],
                'use_cases': ['Local applications', 'Development'],
                'cost': 'Low',
                'requirements': ['Strong master password', 'Secure file permissions']
            },

            'environment_variables': {
                'security': 'Low-Medium',
                'description': 'Store keys in environment variables',
                'features': [
                    'Easy to use',
                    'Separate from code',
                    'Platform-specific access control'
                ],
                'use_cases': ['Development', 'Simple deployments'],
                'cost': 'Free',
                'warnings': ['Can leak in logs', 'Visible to all processes in some systems']
            },

            'never_use': {
                'hardcoded_in_source': {
                    'problem': 'Keys visible in version control, compiled binaries',
                    'impact': 'Complete compromise'
                },
                'unencrypted_files': {
                    'problem': 'Anyone with file access has keys',
                    'impact': 'No protection'
                },
                'database_plaintext': {
                    'problem': 'Database breach = key compromise',
                    'impact': 'Keys and encrypted data stolen together'
                }
            }
        }

    def store_key_encrypted(self, key, password):
        """Store key encrypted with password"""

        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
        from cryptography.hazmat.primitives import hashes
        from cryptography.fernet import Fernet
        import base64

        # Generate salt for KDF
        salt = os.urandom(16)

        # Derive encryption key from password
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=600000,
        )
        password_key = base64.urlsafe_b64encode(kdf.derive(password.encode()))

        # Encrypt the actual key
        f = Fernet(password_key)
        encrypted_key = f.encrypt(key)

        # Store salt + encrypted key
        stored_data = salt + encrypted_key

        return {
            'stored_data': stored_data,
            'note': 'Store this data in file, need password to decrypt'
        }

    def retrieve_key_encrypted(self, stored_data, password):
        """Retrieve encrypted key"""

        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
        from cryptography.hazmat.primitives import hashes
        from cryptography.fernet import Fernet
        import base64

        # Extract salt and encrypted key
        salt = stored_data[:16]
        encrypted_key = stored_data[16:]

        # Derive decryption key from password
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=600000,
        )
        password_key = base64.urlsafe_b64encode(kdf.derive(password.encode()))

        # Decrypt the actual key
        f = Fernet(password_key)
        try:
            key = f.decrypt(encrypted_key)
            return {
                'success': True,
                'key': key
            }
        except:
            return {
                'success': False,
                'error': 'Wrong password or corrupted data'
            }

# Practical example: AWS KMS-style interface
class KeyManagementSystem:
    """Simple key management system interface"""

    def __init__(self):
        self.keys = {}  # In real system, this would be secure storage
        self.key_metadata = {}

    def create_key(self, key_id, description=""):
        """Create and store a new key"""

        key = secrets.token_bytes(32)

        self.keys[key_id] = key
        self.key_metadata[key_id] = {
            'created_at': '2024-01-15T10:00:00Z',
            'description': description,
            'rotation_schedule': 'annual',
            'enabled': True
        }

        return {
            'key_id': key_id,
            'status': 'Key created',
            'note': 'Key stored securely, not returned'
        }

    def encrypt_with_key(self, key_id, plaintext):
        """Encrypt data using stored key"""

        if key_id not in self.keys:
            return {'error': 'Key not found'}

        if not self.key_metadata[key_id]['enabled']:
            return {'error': 'Key is disabled'}

        key = self.keys[key_id]

        # Encrypt using key
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        nonce = os.urandom(12)
        cipher = Cipher(algorithms.AES(key), modes.GCM(nonce))
        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(plaintext) + encryptor.finalize()

        return {
            'key_id': key_id,
            'nonce': nonce,
            'ciphertext': ciphertext,
            'tag': encryptor.tag
        }

    def decrypt_with_key(self, key_id, nonce, ciphertext, tag):
        """Decrypt data using stored key"""

        if key_id not in self.keys:
            return {'error': 'Key not found'}

        key = self.keys[key_id]

        # Decrypt using key
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        cipher = Cipher(algorithms.AES(key), modes.GCM(nonce, tag))
        decryptor = cipher.decryptor()

        try:
            plaintext = decryptor.update(ciphertext) + decryptor.finalize()
            return {
                'success': True,
                'plaintext': plaintext
            }
        except:
            return {
                'success': False,
                'error': 'Decryption failed'
            }

    def disable_key(self, key_id):
        """Disable key (for rotation or revocation)"""

        if key_id in self.key_metadata:
            self.key_metadata[key_id]['enabled'] = False
            return {'status': 'Key disabled'}
        return {'error': 'Key not found'}
```

## Key Rotation

Keys should be rotated regularly to limit the impact of potential compromise.

```python
class KeyRotation:
    """Key rotation strategies"""

    def rotation_schedule(self):
        """When to rotate keys"""

        return {
            'symmetric_keys': {
                'data_encryption_keys': 'Every 1-2 years',
                'high_security': 'Every 90 days',
                'compliance_driven': 'As required by regulation',
                'after_breach': 'Immediately'
            },

            'asymmetric_keys': {
                'tls_certificates': 'Every 1 year (best practice)',
                'code_signing': 'Every 2-3 years',
                'ssh_keys': 'Annually or after personnel changes',
                'email_signing': 'Every 2-3 years'
            },

            'triggers_for_immediate_rotation': [
                'Suspected compromise',
                'Employee with key access leaves',
                'Security audit finding',
                'Compliance requirement',
                'Algorithm weakness discovered'
            ]
        }

    def rotation_process(self):
        """How to rotate keys without disruption"""

        return {
            'step_1_generate': 'Generate new key (keep old key active)',
            'step_2_distribute': 'Distribute new key to all systems',
            'step_3_dual_operation': 'Encrypt with new key, decrypt with both keys',
            'step_4_re_encrypt': 'Re-encrypt old data with new key (if needed)',
            'step_5_retire': 'Disable old key after transition period',
            'step_6_destroy': 'Securely destroy old key',

            'important': [
                'Never delete old key while data encrypted with it exists',
                'Maintain key version metadata',
                'Test new key before disabling old one',
                'Have rollback plan'
            ]
        }

    def implement_rotation(self):
        """Practical key rotation implementation"""

        class VersionedKeyStore:
            def __init__(self):
                self.keys = {}  # key_id -> {version -> key}
                self.current_version = {}  # key_id -> current version

            def add_key_version(self, key_id, version, key):
                """Add a new key version"""
                if key_id not in self.keys:
                    self.keys[key_id] = {}

                self.keys[key_id][version] = key
                self.current_version[key_id] = version

            def get_current_key(self, key_id):
                """Get current active key for encryption"""
                version = self.current_version.get(key_id)
                if version is None:
                    return None
                return self.keys[key_id][version], version

            def get_key_by_version(self, key_id, version):
                """Get specific key version for decryption"""
                return self.keys.get(key_id, {}).get(version)

            def rotate_key(self, key_id):
                """Rotate to new key version"""
                # Generate new key
                new_key = secrets.token_bytes(32)

                # Get current version and increment
                current = self.current_version.get(key_id, 0)
                new_version = current + 1

                # Store new version
                self.add_key_version(key_id, new_version, new_key)

                return {
                    'key_id': key_id,
                    'old_version': current,
                    'new_version': new_version,
                    'status': 'Rotated successfully'
                }

        # Usage example
        store = VersionedKeyStore()

        # Initial key
        store.add_key_version('user_data_key', version=1, key=secrets.token_bytes(32))

        # Encrypt with current key
        current_key, version = store.get_current_key('user_data_key')
        print(f"Encrypting with version {version}")

        # Rotate key
        store.rotate_key('user_data_key')

        # New encryption uses new key
        new_key, new_version = store.get_current_key('user_data_key')
        print(f"Now encrypting with version {new_version}")

        # Old data can still be decrypted
        old_key = store.get_key_by_version('user_data_key', 1)
        print(f"Can still decrypt data from version 1")

        return store
```

## Key Exchange Protocols

How do two parties establish a shared secret key over an insecure channel?

```python
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes

class DiffieHellmanKeyExchange:
    """Diffie-Hellman Ephemeral Key Exchange"""

    def demonstrate_key_exchange(self):
        """Show how two parties agree on shared secret"""

        print("=== Diffie-Hellman Key Exchange ===\n")

        # Alice generates her key pair
        print("Alice generates her key pair...")
        alice_private = ec.generate_private_key(ec.SECP256R1())
        alice_public = alice_private.public_key()

        # Bob generates his key pair
        print("Bob generates his key pair...")
        bob_private = ec.generate_private_key(ec.SECP256R1())
        bob_public = bob_private.public_key()

        # Exchange public keys (can happen over insecure channel)
        print("\nAlice and Bob exchange public keys (in the open)")
        print("Eve (attacker) sees both public keys but cannot derive shared secret\n")

        # Alice computes shared secret
        alice_shared = alice_private.exchange(ec.ECDH(), bob_public)
        print(f"Alice computes shared secret: {alice_shared.hex()[:32]}...")

        # Bob computes shared secret
        bob_shared = bob_private.exchange(ec.ECDH(), alice_public)
        print(f"Bob computes shared secret:   {bob_shared.hex()[:32]}...")

        # They computed the same secret!
        print(f"\nSecrets match: {alice_shared == bob_shared}")

        # Derive encryption key from shared secret
        derived_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'handshake data'
        ).derive(alice_shared)

        print(f"Derived encryption key: {derived_key.hex()[:32]}...")

        return {
            'alice_shared': alice_shared,
            'bob_shared': bob_shared,
            'keys_match': alice_shared == bob_shared,
            'derived_key': derived_key
        }

    def properties(self):
        """Key properties of Diffie-Hellman"""

        return {
            'forward_secrecy': {
                'description': 'Ephemeral keys mean past sessions stay secure',
                'benefit': 'Compromise of long-term key does not affect past sessions',
                'requirement': 'Generate new key pair for each session'
            },

            'no_authentication': {
                'problem': 'Basic DH does not authenticate parties',
                'vulnerability': 'Man-in-the-middle attack',
                'solution': 'Combine with digital signatures or certificates'
            },

            'security': {
                'basis': 'Discrete logarithm problem (or ECDLP for elliptic curves)',
                'attacker_problem': 'Cannot compute shared secret from public keys alone'
            }
        }

class RSAKeyTransport:
    """RSA key exchange (less common now)"""

    def exchange_key_rsa(self):
        """RSA key transport method"""

        from cryptography.hazmat.primitives.asymmetric import rsa, padding

        # Server has long-term RSA key pair
        server_private = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        server_public = server_private.public_key()

        # Client generates session key
        session_key = secrets.token_bytes(32)

        # Client encrypts session key with server's public key
        encrypted_session_key = server_public.encrypt(
            session_key,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        # Server decrypts session key with private key
        decrypted_session_key = server_private.decrypt(
            encrypted_session_key,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        return {
            'client_session_key': session_key,
            'server_session_key': decrypted_session_key,
            'keys_match': session_key == decrypted_session_key,
            'problem': 'No forward secrecy - if server key compromised, all past sessions compromised'
        }

class ModernKeyExchange:
    """Modern key exchange recommendations"""

    def recommended_protocols(self):
        """Current best practices"""

        return {
            'ecdhe': {
                'name': 'Elliptic Curve Diffie-Hellman Ephemeral',
                'security': 'Provides forward secrecy',
                'performance': 'Fast with small keys',
                'used_in': 'TLS 1.3 (required), TLS 1.2',
                'status': 'RECOMMENDED'
            },

            'dhe': {
                'name': 'Diffie-Hellman Ephemeral',
                'security': 'Provides forward secrecy',
                'performance': 'Slower than ECDHE',
                'used_in': 'TLS 1.2, older systems',
                'status': 'Acceptable but prefer ECDHE'
            },

            'rsa_key_transport': {
                'name': 'RSA key exchange',
                'security': 'No forward secrecy',
                'performance': 'Moderate',
                'used_in': 'TLS 1.2 (being phased out)',
                'status': 'DEPRECATED - removed in TLS 1.3'
            },

            'x25519': {
                'name': 'Curve25519 key exchange',
                'security': 'Very secure, forward secrecy',
                'performance': 'Fastest',
                'used_in': 'Modern protocols (Signal, WireGuard)',
                'status': 'RECOMMENDED for new implementations'
            }
        }
```

## Key Derivation Functions (KDF)

Deriving multiple keys from a master secret, or deriving strong keys from passwords.

```python
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes

class KeyDerivation:
    """Key derivation for different purposes"""

    def password_based_kdf(self, password, salt=None):
        """Derive key from user password"""

        # Generate salt if not provided
        if salt is None:
            salt = os.urandom(16)

        # PBKDF2 with high iteration count
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=600000,  # OWASP recommendation (2023)
        )

        key = kdf.derive(password.encode() if isinstance(password, str) else password)

        return {
            'key': key,
            'salt': salt,  # Must store salt to derive same key later
            'iterations': 600000,
            'note': 'High iterations make brute-force attacks expensive'
        }

    def derive_multiple_keys(self, master_secret):
        """Derive multiple keys from master secret"""

        # Use HKDF to derive separate keys for different purposes
        # Never use the same key for multiple purposes!

        encryption_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'encryption'
        ).derive(master_secret)

        authentication_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'authentication'
        ).derive(master_secret)

        signing_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'signing'
        ).derive(master_secret)

        return {
            'encryption_key': encryption_key,
            'authentication_key': authentication_key,
            'signing_key': signing_key,
            'principle': 'One master secret -> multiple purpose-specific keys'
        }

    def kdf_comparison(self):
        """Compare different KDF algorithms"""

        return {
            'pbkdf2': {
                'use_for': 'Password-based key derivation',
                'properties': 'Slow by design (configurable iterations)',
                'status': 'Widely supported, NIST approved',
                'weakness': 'Vulnerable to GPU/ASIC attacks'
            },

            'argon2': {
                'use_for': 'Password hashing (modern alternative)',
                'properties': 'Memory-hard (resists GPU attacks)',
                'status': 'Winner of Password Hashing Competition (2015)',
                'recommendation': 'Best for new password storage'
            },

            'hkdf': {
                'use_for': 'Deriving keys from strong secrets',
                'properties': 'Fast, cryptographically secure',
                'status': 'Standard for key derivation',
                'not_for': 'Passwords (use PBKDF2 or Argon2)'
            },

            'scrypt': {
                'use_for': 'Password-based key derivation',
                'properties': 'Memory-hard and time-hard',
                'status': 'Good alternative to PBKDF2',
                'used_in': 'Some cryptocurrency wallets'
            }
        }
```

## Security Best Practices

```python
class KeyManagementBestPractices:
    """Security best practices for key management"""

    def principles(self):
        """Core principles"""

        return {
            'principle_of_least_privilege': {
                'rule': 'Grant minimum necessary key access',
                'implementation': [
                    'Separate keys for different applications',
                    'Role-based access control',
                    'Regular access reviews'
                ]
            },

            'defense_in_depth': {
                'rule': 'Multiple layers of key protection',
                'implementation': [
                    'Encrypted storage',
                    'Access controls',
                    'Audit logging',
                    'Network isolation'
                ]
            },

            'key_separation': {
                'rule': 'Different keys for different purposes',
                'examples': [
                    'Separate encryption and signing keys',
                    'Separate keys per environment (dev/staging/prod)',
                    'Separate keys per data classification level'
                ]
            },

            'cryptographic_agility': {
                'rule': 'Design systems to support algorithm changes',
                'why': 'Algorithms can be broken, need ability to migrate',
                'implementation': [
                    'Version metadata with encrypted data',
                    'Support multiple algorithms simultaneously',
                    'Regular testing of migration procedures'
                ]
            }
        }

    def common_mistakes(self):
        """Mistakes to avoid"""

        return {
            'mistake_1': {
                'error': 'Storing keys with encrypted data',
                'problem': 'Database breach gives both keys and data',
                'solution': 'Separate key storage from data storage'
            },

            'mistake_2': {
                'error': 'Insufficient key rotation',
                'problem': 'Compromised key affects all data ever encrypted',
                'solution': 'Regular key rotation with clear schedule'
            },

            'mistake_3': {
                'error': 'No key backup',
                'problem': 'Key loss = data loss',
                'solution': 'Encrypted backups in separate location'
            },

            'mistake_4': {
                'error': 'Reusing keys across environments',
                'problem': 'Dev environment breach compromises production',
                'solution': 'Separate keys for each environment'
            },

            'mistake_5': {
                'error': 'Logging or printing keys',
                'problem': 'Keys leak in log files, console output',
                'solution': 'Never log key values, redact in outputs'
            },

            'mistake_6': {
                'error': 'Emailing or chatting keys',
                'problem': 'Insecure transmission, permanent record',
                'solution': 'Use secure key exchange protocols'
            }
        }

    def checklist(self):
        """Key management security checklist"""

        return {
            'generation': [
                '✓ Use cryptographically secure random (secrets, os.urandom)',
                '✓ Sufficient key size (256-bit symmetric, 2048+ bit RSA)',
                '✓ Never hardcode keys in source code'
            ],

            'storage': [
                '✓ Use HSM or KMS for production keys',
                '✓ Encrypt keys at rest',
                '✓ Restrict file permissions (chmod 600)',
                '✓ Separate key storage from data storage'
            ],

            'distribution': [
                '✓ Use secure channels (TLS, SSH)',
                '✓ Verify recipient identity',
                '✓ Audit all key distributions'
            ],

            'usage': [
                '✓ Separate keys by purpose',
                '✓ Version encrypted data with key identifier',
                '✓ Log key usage (not key values)',
                '✓ Rate limit key operations'
            ],

            'rotation': [
                '✓ Regular rotation schedule',
                '✓ Immediate rotation after suspected compromise',
                '✓ Maintain old keys for decryption',
                '✓ Re-encrypt data with new keys'
            ],

            'destruction': [
                '✓ Securely wipe keys (not just delete)',
                '✓ Destroy all copies',
                '✓ Document destruction',
                '✓ Verify data re-encrypted before destruction'
            ]
        }
```

## Conclusion

Key management is the foundation of cryptographic security. Strong algorithms mean nothing if keys are poorly managed. Invest in proper key generation using cryptographically secure random, secure storage using HSMs or KMS, regular rotation to limit exposure, and secure key exchange protocols like ECDH.

Remember: protecting the keys is protecting the data. A single compromised key can undo all your security efforts.

## Key Takeaways

- Use cryptographically secure random (secrets, os.urandom) for key generation
- Never use standard random module or predictable values for keys
- Store keys separate from encrypted data
- Use HSM or KMS for production keys
- Rotate keys regularly (annually or per policy)
- Use ECDH/ECDHE for key exchange (provides forward secrecy)
- Derive multiple keys from master secret using HKDF
- Use PBKDF2/Argon2 for password-based key derivation
- Separate keys by purpose and environment
- Never log, email, or hardcode keys
- Maintain key version metadata
- Have key backup and recovery procedures
