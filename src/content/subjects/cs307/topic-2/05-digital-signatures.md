# Digital Signatures

## Introduction

Digital signatures are the cryptographic equivalent of handwritten signatures, but far more powerful. They provide authentication (proving who sent a message), integrity (detecting any changes to the message), and non-repudiation (preventing the sender from denying they sent it). Unlike handwritten signatures which can be easily copied, digital signatures are mathematically bound to both the signer and the specific content being signed.

A digital signature uses asymmetric cryptography in reverse: instead of encrypting with the public key, we "sign" with the private key, and anyone can verify with the public key.

## How Digital Signatures Work

```python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
import hashlib

class DigitalSignature:
    """Demonstrate digital signature creation and verification"""

    def __init__(self):
        # Generate key pair for signer
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        self.public_key = self.private_key.public_key()

    def sign_message(self, message):
        """Create digital signature for a message"""

        # Step 1: Hash the message (for efficiency and security)
        message_bytes = message.encode() if isinstance(message, str) else message
        message_hash = hashlib.sha256(message_bytes).digest()

        # Step 2: Sign the hash with private key
        signature = self.private_key.sign(
            message_bytes,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )

        print(f"Message: {message}")
        print(f"Hash: {message_hash.hex()[:32]}...")
        print(f"Signature: {signature.hex()[:32]}...")

        return {
            'message': message,
            'signature': signature,
            'hash': message_hash
        }

    def verify_signature(self, message, signature, public_key=None):
        """Verify digital signature"""

        # Use provided public key or default
        pub_key = public_key or self.public_key

        message_bytes = message.encode() if isinstance(message, str) else message

        try:
            # Verification will raise exception if signature invalid
            pub_key.verify(
                signature,
                message_bytes,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )

            print("✓ Signature is valid - message is authentic and unmodified")
            return True

        except Exception as e:
            print(f"✗ Signature verification failed: {e}")
            return False

# Example usage
signer = DigitalSignature()

# Alice signs a message
message = "I, Alice, transfer $100 to Bob"
signed = signer.sign_message(message)

# Anyone can verify with Alice's public key
is_valid = signer.verify_signature(message, signed['signature'])

# Tampering detection
tampered_message = "I, Alice, transfer $1000 to Bob"  # Changed amount!
is_valid_tampered = signer.verify_signature(tampered_message, signed['signature'])
```

## The Signing Process

```python
class SigningProcess:
    """Detailed explanation of signing steps"""

    def signing_steps(self):
        """What happens when creating a signature"""

        return {
            'step_1_hash': {
                'action': 'Hash the message using SHA-256 (or other secure hash)',
                'why': [
                    'Signing works on fixed-size data',
                    'More efficient than signing entire message',
                    'Provides integrity check'
                ],
                'example': 'SHA-256("Hello") -> 32-byte hash'
            },

            'step_2_encrypt_hash': {
                'action': 'Encrypt hash with private key',
                'why': [
                    'Only private key holder can create this signature',
                    'Anyone with public key can verify',
                    'Mathematically binds signature to signer'
                ],
                'note': 'Not actual encryption, but mathematically similar'
            },

            'step_3_attach': {
                'action': 'Attach signature to message',
                'result': 'Message + signature sent together',
                'transmission': 'Signature can be verified by anyone with public key'
            }
        }

    def verification_steps(self):
        """What happens when verifying a signature"""

        return {
            'step_1_hash': {
                'action': 'Hash the received message',
                'result': 'Computed hash of message'
            },

            'step_2_decrypt': {
                'action': 'Decrypt signature using public key',
                'result': 'Original hash from signature'
            },

            'step_3_compare': {
                'action': 'Compare computed hash with decrypted hash',
                'if_match': 'Signature valid - message authentic and unmodified',
                'if_different': 'Signature invalid - message tampered or wrong signer'
            }
        }

# Practical demonstration
import hashlib

class SignatureDemo:
    """Step-by-step signature demonstration"""

    def demonstrate_signing(self, message):
        """Show each step of the signing process"""

        print("=== SIGNING PROCESS ===\n")

        # Generate keys
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        public_key = private_key.public_key()

        # Step 1: Hash message
        message_bytes = message.encode()
        message_hash = hashlib.sha256(message_bytes).digest()
        print(f"1. Original message: {message}")
        print(f"2. Message hash (SHA-256): {message_hash.hex()}\n")

        # Step 2: Sign hash
        signature = private_key.sign(
            message_bytes,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        print(f"3. Signature created: {signature.hex()[:64]}...\n")

        print("=== VERIFICATION PROCESS ===\n")

        # Step 1: Hash received message
        received_hash = hashlib.sha256(message_bytes).digest()
        print(f"1. Hash received message: {received_hash.hex()}")

        # Step 2 & 3: Verify (library does comparison internally)
        try:
            public_key.verify(
                signature,
                message_bytes,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            print("2. Decrypt signature with public key")
            print("3. Compare hashes: MATCH ✓")
            print("   -> Signature is valid!\n")
        except:
            print("   -> Signature is INVALID!\n")

        return {
            'signature': signature,
            'public_key': public_key
        }
```

## RSA Signatures

RSA can be used for both encryption and signatures, but with different padding schemes.

```python
class RSASignatures:
    """RSA digital signatures with proper padding"""

    def __init__(self):
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        self.public_key = self.private_key.public_key()

    def sign_with_pss(self, message):
        """Sign using PSS (Probabilistic Signature Scheme) - recommended"""

        message_bytes = message.encode() if isinstance(message, str) else message

        # PSS padding is the modern, secure standard for RSA signatures
        signature = self.private_key.sign(
            message_bytes,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),  # Mask generation function
                salt_length=padding.PSS.MAX_LENGTH  # Maximum security
            ),
            hashes.SHA256()
        )

        return {
            'signature': signature,
            'algorithm': 'RSA-PSS',
            'hash': 'SHA-256',
            'security': 'Provably secure, randomized'
        }

    def verify_with_pss(self, message, signature):
        """Verify PSS signature"""

        message_bytes = message.encode() if isinstance(message, str) else message

        try:
            self.public_key.verify(
                signature,
                message_bytes,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return {
                'valid': True,
                'message': 'Signature verified successfully'
            }
        except Exception as e:
            return {
                'valid': False,
                'error': str(e)
            }

    def padding_comparison(self):
        """Compare RSA padding schemes"""

        return {
            'pss': {
                'name': 'Probabilistic Signature Scheme',
                'status': 'RECOMMENDED',
                'security': 'Provably secure',
                'properties': [
                    'Randomized (same message produces different signatures)',
                    'Resistant to attacks',
                    'Modern standard'
                ],
                'use_for': 'New implementations'
            },

            'pkcs1v15': {
                'name': 'PKCS#1 v1.5',
                'status': 'LEGACY',
                'security': 'Secure but older',
                'properties': [
                    'Deterministic',
                    'Widely supported',
                    'Theoretical vulnerabilities exist'
                ],
                'use_for': 'Compatibility with old systems only'
            }
        }

# Example: Signing different data types
class SignatureExamples:
    """Real-world signature examples"""

    def __init__(self):
        self.rsa_sig = RSASignatures()

    def sign_document(self, document_content):
        """Sign a document"""

        signed = self.rsa_sig.sign_with_pss(document_content)

        return {
            'document': document_content,
            'signature': signed['signature'],
            'signer_public_key': self.rsa_sig.public_key,
            'timestamp': '2024-01-15T10:30:00Z',  # In practice, use actual timestamp
            'algorithm': 'RSA-PSS with SHA-256'
        }

    def sign_transaction(self, transaction_data):
        """Sign a financial transaction"""

        # Convert transaction to string
        tx_string = f"{transaction_data['from']}|{transaction_data['to']}|{transaction_data['amount']}"

        signed = self.rsa_sig.sign_with_pss(tx_string)

        return {
            'transaction': transaction_data,
            'signature': signed['signature'],
            'can_verify': 'Anyone with public key',
            'prevents': 'Tampering, denial, repudiation'
        }
```

## ECDSA Signatures

Elliptic Curve Digital Signature Algorithm (ECDSA) provides the same security as RSA with much smaller signatures.

```python
from cryptography.hazmat.primitives.asymmetric import ec

class ECDSASignatures:
    """ECDSA signatures - smaller and faster than RSA"""

    def __init__(self):
        # Generate ECDSA key pair
        self.private_key = ec.generate_private_key(
            ec.SECP256R1()  # P-256 curve - widely supported
        )
        self.public_key = self.private_key.public_key()

    def sign_message(self, message):
        """Create ECDSA signature"""

        message_bytes = message.encode() if isinstance(message, str) else message

        signature = self.private_key.sign(
            message_bytes,
            ec.ECDSA(hashes.SHA256())
        )

        return {
            'message': message,
            'signature': signature,
            'signature_size': len(signature),
            'algorithm': 'ECDSA with P-256'
        }

    def verify_signature(self, message, signature):
        """Verify ECDSA signature"""

        message_bytes = message.encode() if isinstance(message, str) else message

        try:
            self.public_key.verify(
                signature,
                message_bytes,
                ec.ECDSA(hashes.SHA256())
            )
            return True
        except:
            return False

    def compare_with_rsa(self):
        """ECDSA vs RSA comparison"""

        return {
            'signature_size': {
                'RSA_2048': '256 bytes',
                'ECDSA_P256': '64 bytes',
                'advantage': 'ECDSA 4x smaller'
            },

            'security_equivalence': {
                'ECDSA_256': 'Equivalent to RSA-3072',
                'ECDSA_384': 'Equivalent to RSA-7680',
                'ECDSA_521': 'Equivalent to RSA-15360'
            },

            'performance': {
                'signing': 'ECDSA faster',
                'verification': 'Similar',
                'key_generation': 'ECDSA faster'
            },

            'use_cases': {
                'ecdsa': [
                    'Mobile applications',
                    'IoT devices',
                    'Blockchain (Bitcoin, Ethereum)',
                    'Modern protocols (TLS 1.3)'
                ],
                'rsa': [
                    'Legacy systems',
                    'Wide compatibility needed',
                    'Some compliance requirements'
                ]
            }
        }

# Practical ECDSA example
class BitcoinStyleSignature:
    """ECDSA signature similar to Bitcoin"""

    def __init__(self):
        self.ecdsa = ECDSASignatures()

    def sign_transaction(self, sender, recipient, amount):
        """Sign a cryptocurrency-style transaction"""

        # Create transaction message
        transaction = {
            'from': sender,
            'to': recipient,
            'amount': amount,
            'nonce': 12345  # Prevent replay attacks
        }

        # Serialize transaction
        tx_string = f"{transaction['from']}:{transaction['to']}:{transaction['amount']}:{transaction['nonce']}"

        # Sign
        signed = self.ecdsa.sign_message(tx_string)

        print(f"Transaction: {tx_string}")
        print(f"Signature size: {signed['signature_size']} bytes")
        print(f"Signature: {signed['signature'].hex()[:64]}...")

        # Verify
        is_valid = self.ecdsa.verify_signature(tx_string, signed['signature'])
        print(f"Verification: {'Valid ✓' if is_valid else 'Invalid ✗'}")

        return {
            'transaction': transaction,
            'signature': signed['signature'],
            'public_key': self.ecdsa.public_key
        }
```

## Signature Applications

```python
class SignatureApplications:
    """Real-world applications of digital signatures"""

    def code_signing(self):
        """Sign software to verify publisher"""

        return {
            'purpose': 'Prove software comes from trusted publisher',
            'process': [
                'Developer signs executable with private key',
                'OS verifies signature with developer public key (from certificate)',
                'User sees "Verified Publisher" or warning if unsigned'
            ],
            'examples': [
                'Windows Authenticode',
                'macOS code signing',
                'Android APK signing',
                'Docker image signing'
            ],
            'benefits': [
                'Prevents malware from impersonating legitimate software',
                'Detects tampering after signing',
                'Builds user trust'
            ]
        }

    def document_signing(self):
        """Digital document signatures"""

        return {
            'purpose': 'Sign contracts, forms, and legal documents',
            'legal_status': 'Legally binding in most jurisdictions',
            'standards': [
                'PDF signatures (ISO 32000)',
                'XML signatures (XMLDSig)',
                'CMS/PKCS#7 signatures'
            ],
            'properties': [
                'Non-repudiation: Signer cannot deny signing',
                'Integrity: Any changes invalidate signature',
                'Timestamp: Proves when document was signed'
            ],
            'examples': [
                'DocuSign',
                'Adobe Sign',
                'EU eIDAS signatures'
            ]
        }

    def email_signing(self):
        """S/MIME and PGP email signatures"""

        return {
            'purpose': 'Prove email authenticity, prevent spoofing',
            'protocols': {
                's_mime': {
                    'name': 'Secure/Multipurpose Internet Mail Extensions',
                    'used_by': 'Enterprise email (Outlook, Gmail)',
                    'requires': 'Certificate from trusted CA'
                },
                'pgp': {
                    'name': 'Pretty Good Privacy',
                    'used_by': 'Privacy-focused users',
                    'requires': 'Self-managed key pairs'
                }
            },
            'workflow': [
                'Sender signs email with private key',
                'Recipient verifies with sender public key',
                'Email client shows verification status'
            ]
        }

    def blockchain_transactions(self):
        """Cryptocurrency transaction signing"""

        return {
            'purpose': 'Authorize transfer of cryptocurrency',
            'algorithm': 'ECDSA (secp256k1 curve for Bitcoin)',
            'process': [
                'User creates transaction',
                'User signs with private key (controls funds)',
                'Network verifies with public key (derived from address)',
                'Transaction added to blockchain'
            ],
            'security': [
                'Private key = ownership',
                'Lose private key = lose funds',
                'Signature proves authorization without revealing key'
            ]
        }

# Practical example: File signing
class FileSigning:
    """Sign and verify files"""

    def __init__(self):
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        self.public_key = self.private_key.public_key()

    def sign_file(self, file_path):
        """Create detached signature for file"""

        # Read file content
        with open(file_path, 'rb') as f:
            file_content = f.read()

        # Create signature
        signature = self.private_key.sign(
            file_content,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )

        # Save signature to separate file
        signature_path = file_path + '.sig'
        with open(signature_path, 'wb') as f:
            f.write(signature)

        print(f"Signed: {file_path}")
        print(f"Signature saved to: {signature_path}")

        return signature_path

    def verify_file(self, file_path, signature_path):
        """Verify file signature"""

        # Read file and signature
        with open(file_path, 'rb') as f:
            file_content = f.read()

        with open(signature_path, 'rb') as f:
            signature = f.read()

        # Verify
        try:
            self.public_key.verify(
                signature,
                file_content,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            print(f"✓ File signature valid: {file_path}")
            return True
        except:
            print(f"✗ File signature INVALID: {file_path}")
            return False
```

## Security Considerations

```python
class SignatureSecurity:
    """Security best practices for digital signatures"""

    def private_key_protection(self):
        """Protecting signing keys"""

        return {
            'critical': 'Private key compromise = attacker can forge signatures',

            'storage': {
                'best': 'Hardware Security Module (HSM)',
                'good': 'Encrypted key file with strong passphrase',
                'acceptable': 'OS keychain with access controls',
                'never': 'Plaintext file, source code, database'
            },

            'access_control': [
                'Minimal number of people with access',
                'Multi-factor authentication to use key',
                'Audit all signing operations',
                'Separate signing keys per purpose'
            ],

            'key_rotation': {
                'frequency': 'Annually or after any suspected compromise',
                'process': 'Generate new key, update public key distribution',
                'old_signatures': 'Remain valid, but new signatures use new key'
            }
        }

    def timestamp_signatures(self):
        """Adding timestamps to signatures"""

        return {
            'purpose': 'Prove when signature was created',
            'importance': [
                'Allows verification after certificate expiry',
                'Proves signature made before key revocation',
                'Legal evidence of signing time'
            ],
            'mechanism': {
                'trusted_timestamp_authority': 'Third party signs (signature + timestamp)',
                'included_in': 'PDF signatures, code signing, document signing'
            }
        }

    def common_vulnerabilities(self):
        """Signature vulnerabilities to avoid"""

        return {
            'weak_hash': {
                'problem': 'Using MD5 or SHA-1 allows collision attacks',
                'solution': 'Use SHA-256 or stronger',
                'example': 'MD5 collisions can create two files with same signature'
            },

            'signature_without_verification': {
                'problem': 'Accepting data without verifying signature',
                'solution': 'Always verify signatures before trusting data',
                'impact': 'Attacker can send malicious data'
            },

            'reusing_signatures': {
                'problem': 'Signature from one context used in another (replay attack)',
                'solution': 'Include context-specific data in signed message',
                'example': 'Add nonce, timestamp, or transaction ID'
            },

            'key_without_certificate': {
                'problem': 'Cannot verify public key belongs to claimed owner',
                'solution': 'Use PKI certificates from trusted CA',
                'impact': 'Man-in-the-middle can substitute their own public key'
            }
        }

# Secure signature implementation
class SecureSignatureImplementation:
    """Template for secure signature implementation"""

    def __init__(self):
        # Use strong key size
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=3072  # 3072 for long-term security
        )
        self.public_key = self.private_key.public_key()

    def sign_securely(self, message, context=None):
        """Sign with security best practices"""

        import time

        message_bytes = message.encode() if isinstance(message, str) else message

        # Add context to prevent signature reuse
        timestamp = str(int(time.time()))
        context_str = context or "default"

        # Include context and timestamp in signed data
        signed_data = f"{context_str}|{timestamp}|{message_bytes.decode('utf-8', errors='ignore')}"

        # Sign with secure padding and hash
        signature = self.private_key.sign(
            signed_data.encode(),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),  # Secure hash
                salt_length=padding.PSS.MAX_LENGTH  # Maximum security
            ),
            hashes.SHA256()  # Secure hash algorithm
        )

        return {
            'message': message,
            'signature': signature,
            'context': context_str,
            'timestamp': timestamp,
            'algorithm': 'RSA-3072-PSS-SHA256'
        }

    def verify_securely(self, message, signature, context, timestamp, max_age_seconds=300):
        """Verify with security checks"""

        import time

        # Check timestamp freshness (prevent replay attacks)
        current_time = int(time.time())
        sig_time = int(timestamp)

        if current_time - sig_time > max_age_seconds:
            return {
                'valid': False,
                'reason': 'Signature too old (possible replay attack)'
            }

        # Reconstruct signed data
        message_bytes = message.encode() if isinstance(message, str) else message
        signed_data = f"{context}|{timestamp}|{message_bytes.decode('utf-8', errors='ignore')}"

        # Verify signature
        try:
            self.public_key.verify(
                signature,
                signed_data.encode(),
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )

            return {
                'valid': True,
                'message': 'Signature verified successfully'
            }
        except:
            return {
                'valid': False,
                'reason': 'Signature verification failed'
            }
```

## Conclusion

Digital signatures are fundamental to modern security, providing authentication, integrity, and non-repudiation. They're used everywhere from code signing to cryptocurrency transactions. Understanding how they work and implementing them securely is essential for defensive security.

RSA-PSS and ECDSA are both excellent choices, with ECDSA offering smaller signatures and better performance. Always use secure hash algorithms (SHA-256 or better), protect private keys carefully, and verify signatures before trusting signed data.

## Key Takeaways

- Digital signatures prove authenticity and detect tampering
- Sign with private key, verify with public key (reverse of encryption)
- Message is hashed before signing (efficiency and security)
- RSA-PSS recommended for RSA signatures (more secure than PKCS#1 v1.5)
- ECDSA provides equivalent security with smaller signatures
- Include timestamps and context to prevent replay attacks
- Private key compromise allows signature forgery
- Used for code signing, documents, email, blockchain transactions
- Always verify signatures before trusting signed data
- Use SHA-256 or stronger hash algorithms
