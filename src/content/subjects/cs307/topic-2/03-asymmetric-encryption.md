# Asymmetric Encryption (Public Key Cryptography)

## Introduction

Asymmetric encryption uses two mathematically related keys: a **public key** for encryption and a **private key** for decryption. Unlike symmetric encryption where the same key must be kept secret and shared securely, asymmetric encryption solves the key distribution problem by allowing the public key to be shared openly while keeping the private key secret.

Think of it like a mailbox: anyone can drop mail in (encrypt with public key), but only the owner with the key can open it (decrypt with private key).

## How Asymmetric Encryption Works

```python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes, serialization

class AsymmetricEncryption:
    """Demonstrate asymmetric encryption"""

    def generate_keypair(self):
        """Generate RSA public/private key pair"""

        # Generate private key
        private_key = rsa.generate_private_key(
            public_exponent=65537,  # Standard value
            key_size=2048,  # 2048-bit key (minimum recommended)
        )

        # Derive public key from private key
        public_key = private_key.public_key()

        return {
            'private_key': private_key,  # Keep secret!
            'public_key': public_key  # Can share publicly
        }

    def encrypt_with_public_key(self, message, public_key):
        """Anyone can encrypt with the public key"""

        ciphertext = public_key.encrypt(
            message,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        return ciphertext

    def decrypt_with_private_key(self, ciphertext, private_key):
        """Only private key holder can decrypt"""

        plaintext = private_key.decrypt(
            ciphertext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        return plaintext

# Example
asym = AsymmetricEncryption()

# Alice generates her key pair
alice_keys = asym.generate_keypair()

# Bob encrypts message using Alice's PUBLIC key (which she shares)
message = b"Secret message for Alice"
encrypted = asym.encrypt_with_public_key(message, alice_keys['public_key'])

# Only Alice can decrypt with her PRIVATE key
decrypted = asym.decrypt_with_private_key(encrypted, alice_keys['private_key'])

print(f"Original:  {message}")
print(f"Encrypted: {encrypted.hex()[:50]}...")
print(f"Decrypted: {decrypted}")
```

## RSA Algorithm

RSA (Rivest-Shamir-Adleman) is the most widely used asymmetric algorithm, invented in 1977.

### RSA Mathematics (Simplified)

```python
class RSAMathematics:
    """Simplified RSA mathematics explanation"""

    def rsa_explanation(self):
        """How RSA works (conceptually)"""

        return {
            'key_generation': {
                '1': 'Choose two large prime numbers p and q',
                '2': 'Calculate n = p × q (modulus)',
                '3': 'Calculate φ(n) = (p-1)(q-1)',
                '4': 'Choose public exponent e (usually 65537)',
                '5': 'Calculate private exponent d where d × e ≡ 1 (mod φ(n))',
                'public_key': '(e, n)',
                'private_key': '(d, n)'
            },

            'encryption': {
                'formula': 'ciphertext = plaintext^e mod n',
                'uses': 'Public key (e, n)'
            },

            'decryption': {
                'formula': 'plaintext = ciphertext^d mod n',
                'uses': 'Private key (d, n)'
            },

            'security': {
                'based_on': 'Difficulty of factoring large numbers',
                'if_n_factored': 'Can calculate φ(n) and derive private key',
                'protection': 'Use large enough keys (2048+ bits)'
            }
        }

    def key_size_recommendations(self):
        """RSA key size guidelines"""

        return {
            '1024_bits': {
                'status': 'DEPRECATED - Do not use',
                'broken': 'Can be broken with sufficient resources'
            },
            '2048_bits': {
                'status': 'Minimum recommended',
                'valid_until': '~2030',
                'use_case': 'General purpose'
            },
            '3072_bits': {
                'status': 'Recommended for long-term',
                'security_equivalent': 'AES-128',
                'use_case': 'High security applications'
            },
            '4096_bits': {
                'status': 'Maximum common size',
                'trade_off': 'Slower but very secure',
                'use_case': 'Maximum security requirements'
            }
        }
```

### RSA Practical Usage

```python
class RSAPractical:
    """Practical RSA usage patterns"""

    def hybrid_encryption(self, large_message, recipient_public_key):
        """Use RSA + AES for encrypting large messages"""

        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        import os

        # Problem: RSA can only encrypt small messages (less than key size)
        # Solution: Hybrid encryption

        # 1. Generate random symmetric key
        aes_key = os.urandom(32)  # 256-bit AES key

        # 2. Encrypt message with AES (fast for large data)
        nonce = os.urandom(12)
        cipher = Cipher(algorithms.AES(aes_key), modes.GCM(nonce))
        encryptor = cipher.encryptor()
        ciphertext = encryptor.update(large_message) + encryptor.finalize()
        tag = encryptor.tag

        # 3. Encrypt AES key with RSA (small data, no problem)
        encrypted_aes_key = recipient_public_key.encrypt(
            aes_key,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        # Send: encrypted_aes_key + nonce + tag + ciphertext
        return {
            'encrypted_key': encrypted_aes_key,  # RSA encrypted
            'nonce': nonce,
            'tag': tag,
            'ciphertext': ciphertext  # AES encrypted
        }

    def hybrid_decryption(self, package, recipient_private_key):
        """Decrypt hybrid encrypted message"""

        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

        # 1. Decrypt AES key using RSA private key
        aes_key = recipient_private_key.decrypt(
            package['encrypted_key'],
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )

        # 2. Decrypt message using AES key
        cipher = Cipher(
            algorithms.AES(aes_key),
            modes.GCM(package['nonce'], package['tag'])
        )
        decryptor = cipher.decryptor()
        plaintext = decryptor.update(package['ciphertext']) + decryptor.finalize()

        return plaintext
```

## Elliptic Curve Cryptography (ECC)

ECC provides equivalent security to RSA with much smaller key sizes.

```python
from cryptography.hazmat.primitives.asymmetric import ec

class EllipticCurveCrypto:
    """Elliptic curve cryptography"""

    def generate_ec_keypair(self):
        """Generate ECC key pair"""

        # Generate private key
        private_key = ec.generate_private_key(
            ec.SECP256R1()  # Also called P-256 or prime256v1
        )

        public_key = private_key.public_key()

        return {
            'private_key': private_key,
            'public_key': public_key
        }

    def key_size_comparison(self):
        """ECC vs RSA key sizes for equivalent security"""

        return {
            'comparison': [
                {'ecc': 256, 'rsa': 3072, 'security_level': '128-bit'},
                {'ecc': 384, 'rsa': 7680, 'security_level': '192-bit'},
                {'ecc': 521, 'rsa': 15360, 'security_level': '256-bit'}
            ],
            'advantages': [
                'Smaller keys = faster operations',
                'Less bandwidth for key transmission',
                'Better for mobile/embedded devices',
                'Smaller certificates'
            ],
            'popular_curves': {
                'SECP256R1': 'P-256, widely supported',
                'SECP384R1': 'P-384, higher security',
                'SECP521R1': 'P-521, maximum security',
                'Curve25519': 'Modern, fast, secure (used in Signal, SSH)'
            }
        }

    def ec_key_agreement(self):
        """Elliptic curve Diffie-Hellman key agreement"""

        from cryptography.hazmat.primitives.asymmetric import ec
        from cryptography.hazmat.primitives.kdf.hkdf import HKDF
        from cryptography.hazmat.primitives import hashes

        # Alice generates her key pair
        alice_private = ec.generate_private_key(ec.SECP256R1())
        alice_public = alice_private.public_key()

        # Bob generates his key pair
        bob_private = ec.generate_private_key(ec.SECP256R1())
        bob_public = bob_private.public_key()

        # Alice and Bob exchange public keys (over insecure channel is OK)

        # Alice computes shared secret using her private key + Bob's public key
        alice_shared = alice_private.exchange(ec.ECDH(), bob_public)

        # Bob computes shared secret using his private key + Alice's public key
        bob_shared = bob_private.exchange(ec.ECDH(), alice_public)

        # Both compute the same shared secret!
        assert alice_shared == bob_shared

        # Derive encryption key from shared secret
        derived_key = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=None,
            info=b'handshake data'
        ).derive(alice_shared)

        return {
            'alice_shared': alice_shared,
            'bob_shared': bob_shared,
            'same': alice_shared == bob_shared,
            'derived_key': derived_key
        }
```

## Use Cases for Asymmetric Cryptography

```python
class AsymmetricUseCases:
    """When to use asymmetric encryption"""

    def secure_communication(self):
        """Establishing secure channels"""

        return {
            'tls_handshake': {
                'description': 'HTTPS uses asymmetric crypto to exchange symmetric keys',
                'process': [
                    'Server sends public key in certificate',
                    'Client generates session key',
                    'Client encrypts session key with server public key',
                    'Both sides use session key for symmetric encryption'
                ]
            },
            'email_encryption': {
                'pgp_gpg': 'Encrypt email to recipient public key',
                'smime': 'Similar, used in enterprise email'
            },
            'vpn': {
                'description': 'VPN client authenticates to server',
                'key_exchange': 'Establish shared secret for tunnel encryption'
            }
        }

    def key_exchange(self):
        """Securely agreeing on symmetric key"""

        return {
            'problem': 'How to agree on secret key over insecure channel?',
            'solution': 'Diffie-Hellman key exchange',
            'result': 'Both parties compute same secret without transmitting it',
            'algorithms': ['Diffie-Hellman', 'ECDH', 'RSA key transport']
        }

    def digital_signatures(self):
        """Proving authenticity and integrity"""

        return {
            'purpose': 'Prove message came from claimed sender',
            'process': [
                'Sign with private key',
                'Verify with public key'
            ],
            'uses': [
                'Code signing',
                'Document signing',
                'Software updates',
                'Blockchain transactions',
                'Email authentication'
            ]
        }
```

## Comparing Symmetric vs Asymmetric

```python
class CryptoComparison:
    """When to use each type"""

    def comparison_table(self):
        return {
            'symmetric': {
                'key_type': 'Single shared secret key',
                'speed': 'Fast (1000x faster than asymmetric)',
                'key_size': 'Small (128-256 bits)',
                'use_for': 'Bulk data encryption',
                'key_distribution': 'Difficult - must share securely',
                'examples': ['AES', 'ChaCha20'],
                'scalability': 'Need N² keys for N users'
            },
            'asymmetric': {
                'key_type': 'Public/private key pair',
                'speed': 'Slow',
                'key_size': 'Large (2048-4096 bits for RSA)',
                'use_for': 'Key exchange, digital signatures, small data',
                'key_distribution': 'Easy - public key can be shared openly',
                'examples': ['RSA', 'ECC'],
                'scalability': 'Need 2N keys for N users'
            },
            'best_practice': {
                'approach': 'Hybrid',
                'method': 'Use asymmetric to exchange symmetric key, then symmetric for data',
                'example': 'TLS/HTTPS, PGP, Signal Protocol'
            }
        }

# Real-world pattern
class SecureMessaging:
    """Hybrid encryption for secure messaging"""

    def send_message(self, message, recipient_public_key, sender_private_key):
        """Send encrypted and signed message"""

        # 1. Generate ephemeral symmetric key
        session_key = os.urandom(32)

        # 2. Encrypt message with session key (fast)
        encrypted_message = self.aes_encrypt(message, session_key)

        # 3. Encrypt session key with recipient's public key
        encrypted_key = recipient_public_key.encrypt(session_key, ...)

        # 4. Sign message with sender's private key (authentication)
        signature = sender_private_key.sign(message, ...)

        return {
            'encrypted_message': encrypted_message,
            'encrypted_key': encrypted_key,
            'signature': signature
        }
```

## Security Considerations

```python
class AsymmetricSecurity:
    """Security best practices"""

    def padding_schemes(self):
        """Always use proper padding"""

        return {
            'never_use': {
                'scheme': 'No padding (textbook RSA)',
                'problem': 'Deterministic, malleable, vulnerable'
            },
            'rsa_oaep': {
                'name': 'Optimal Asymmetric Encryption Padding',
                'status': 'Recommended for encryption',
                'properties': 'Randomized, secure'
            },
            'rsa_pss': {
                'name': 'Probabilistic Signature Scheme',
                'status': 'Recommended for signatures',
                'properties': 'Provably secure'
            }
        }

    def key_management(self):
        """Managing asymmetric keys"""

        return {
            'private_key': {
                'storage': [
                    'Hardware security module (HSM)',
                    'Encrypted with strong passphrase',
                    'Secure key vault service',
                    'Never in version control or backups'
                ],
                'permissions': 'Minimal access, audit all usage',
                'backup': 'Encrypted backup in secure location'
            },
            'public_key': {
                'distribution': 'Can be shared openly',
                'verification': 'Verify fingerprint through second channel',
                'certificates': 'Use PKI for authentication'
            },
            'rotation': {
                'frequency': 'Rotate annually or after compromise',
                'process': 'Generate new pair, update all systems',
                'old_keys': 'Keep for decrypting old messages'
            }
        }
```

## Common Vulnerabilities

```python
class AsymmetricVulnerabilities:
    """Common mistakes to avoid"""

    def weak_keys(self):
        """Using insufficient key sizes"""

        # BAD
        weak_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=1024  # Too small!
        )

        # GOOD
        strong_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048  # Minimum 2048, prefer 3072+
        )

    def no_padding(self):
        """Never use raw RSA without padding"""

        # This is vulnerable - don't do it!
        # Use OAEP for encryption, PSS for signatures

    def poor_random(self):
        """Weak random number generation"""

        # If key generation uses weak RNG, keys are predictable
        # Always use cryptographically secure random (os.urandom, secrets)
```

## Conclusion

Asymmetric cryptography solves the key distribution problem and enables digital signatures, making it essential for modern security. While slower than symmetric encryption, it's typically used in hybrid systems: asymmetric for key exchange and signatures, symmetric for bulk encryption.

RSA and ECC are both widely used, with ECC offering smaller keys and better performance. Always use proven libraries, appropriate key sizes (2048+ for RSA, 256+ for ECC), and proper padding schemes.

## Key Takeaways

- Asymmetric uses public/private key pairs
- Public key encrypts, private key decrypts
- Solves key distribution problem
- Much slower than symmetric encryption
- Used for key exchange, digital signatures, authentication
- RSA requires 2048+ bit keys; ECC provides equivalent security with 256 bits
- Always use proper padding (OAEP for encryption, PSS for signatures)
- Hybrid encryption: asymmetric for key exchange, symmetric for data
- Protect private keys as carefully as symmetric keys
- Common in TLS, SSH, PGP, code signing
