---
id: cs302-t7-security
title: "Network Security Protocols"
order: 7
---

# Network Security Protocols

## Security Requirements

Network communication must address:

**Confidentiality**: Prevent eavesdropping
**Integrity**: Detect modification
**Authentication**: Verify identity
**Non-repudiation**: Prove origin

Cryptographic protocols provide these guarantees.

## TLS: Transport Layer Security

TLS (successor to SSL) secures TCP connections. Used by HTTPS, secure email, and many other protocols.

**TLS provides**:
- Server authentication (certificates)
- Optional client authentication
- Encryption (confidentiality)
- Integrity (MAC)

## TLS Handshake

```
Client                                    Server
  |                                          |
  |-------- ClientHello ------------------>|
  |   (versions, cipher suites, random)     |
  |                                          |
  |<------- ServerHello --------------------|
  |   (selected version, cipher, random)    |
  |<------- Certificate --------------------|
  |<------- ServerKeyExchange (if needed) --|
  |<------- ServerHelloDone ----------------|
  |                                          |
  |-------- ClientKeyExchange ------------->|
  |-------- ChangeCipherSpec -------------->|
  |-------- Finished (encrypted) ---------->|
  |                                          |
  |<------- ChangeCipherSpec ----------------|
  |<------- Finished (encrypted) ------------|
  |                                          |
  |<======= Application Data ===============>|
```

## TLS 1.3 Improvements

TLS 1.3 (RFC 8446) simplifies and improves:

**Faster handshake**: 1-RTT (vs 2-RTT in TLS 1.2)
**0-RTT resumption**: Send data in first message (with caveats)
**Removed weak algorithms**: No RSA key exchange, no CBC mode
**Forward secrecy**: Mandatory ephemeral keys

```
Client                              Server
  |-------- ClientHello ----------->|
  |        + KeyShare               |
  |                                 |
  |<------- ServerHello ------------|
  |        + KeyShare               |
  |<------- EncryptedExtensions ----|
  |<------- Certificate ------------|
  |<------- CertificateVerify ------|
  |<------- Finished ---------------|
  |                                 |
  |-------- Finished -------------->|
  |                                 |
  |<======= Application Data ======>|
```

## Certificates and PKI

Certificates bind public keys to identities:

```
Subject: CN=www.example.com
Issuer: CN=DigiCert
Valid From: 2023-01-01
Valid To: 2024-01-01
Public Key: [RSA/ECDSA key]
Signature: [CA's signature]
```

**Certificate chain**:
```
Root CA (trusted, in browser)
    ↓ signs
Intermediate CA
    ↓ signs
Server Certificate
```

**Verification**:
1. Check signature chain to trusted root
2. Verify not expired
3. Check hostname matches
4. Check not revoked (CRL, OCSP)

## Cipher Suites

Cipher suite specifies algorithms:

**TLS 1.2 example**:
```
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
     |     |        |   |     |
     |     |        |   |     +-- PRF hash
     |     |        |   +-------- GCM mode
     |     |        +------------ AES-256
     |     +--------------------- Authentication
     +--------------------------- Key exchange
```

**TLS 1.3 simplified**:
```
TLS_AES_256_GCM_SHA384
    |       |     |
    |       |     +-- Hash for HKDF
    |       +-------- AEAD mode
    +---------------- Cipher
```

Key exchange always ECDHE/DHE in TLS 1.3.

## IPsec

Secures communication at the IP layer:

**Transport mode**: Protects payload
**Tunnel mode**: Protects entire IP packet (VPNs)

**Protocols**:
- **AH** (Authentication Header): Integrity, authentication
- **ESP** (Encapsulating Security Payload): Encryption + integrity

**IKE** (Internet Key Exchange): Establishes security associations

```
Original:
[IP Header][TCP Header][Data]

ESP Transport:
[IP Header][ESP Header][TCP Header][Data][ESP Trailer][Auth]

ESP Tunnel:
[New IP][ESP Header][IP Header][TCP Header][Data][ESP Trailer][Auth]
                    └────────── Encrypted ──────────┘
```

## VPN Technologies

**IPsec VPN**: Site-to-site or remote access
**SSL/TLS VPN**: Browser-based or client-based
**WireGuard**: Modern, simple, fast

**WireGuard** (increasingly popular):
- Uses modern cryptography (Curve25519, ChaCha20)
- Simple configuration
- Small codebase
- High performance

## SSH Security

SSH provides secure remote access (covered earlier) but also:

**Key exchange**: Diffie-Hellman variants
**Encryption**: AES, ChaCha20
**Integrity**: HMAC, AEAD
**Authentication**: Password, public key, certificates

```
[SSH Transport]──[Encryption]──[Authentication]──[Connection]
                    AES           PublicKey        Shell/SFTP
```

## DNSSEC

Cryptographic authentication for DNS (covered in DNS section):

**Chain of trust**: From root to domain
**Signatures**: RRSIG records
**No encryption**: Only authentication

## Secure Email

**S/MIME**: Certificate-based
- User certificates from CA
- Integrated in email clients
- Corporate use

**PGP/GPG**: Web of trust
- Key exchange by users
- No central authority
- Technical users

Both provide encryption and signing.

## Protocol Vulnerabilities

**Downgrade attacks**: Force use of weak algorithms
- Mitigation: Signal supported versions, detect tampering

**Man-in-the-middle**: Intercept and modify
- Mitigation: Authentication, certificate pinning

**Replay attacks**: Resend captured messages
- Mitigation: Nonces, timestamps, sequence numbers

**Side channels**: Timing, padding oracle
- Mitigation: Constant-time implementations

## Best Practices

**TLS configuration**:
- Use TLS 1.3 (or 1.2 minimum)
- Disable weak ciphers
- Enable HSTS
- Use strong certificates

**Certificate management**:
- Automate renewal (Let's Encrypt)
- Monitor expiration
- Use certificate transparency

**Key management**:
- Rotate keys periodically
- Protect private keys
- Use HSMs for critical keys

## Common Tools

**OpenSSL**: TLS library and CLI
```bash
openssl s_client -connect example.com:443
openssl x509 -in cert.pem -text
```

**testssl.sh**: TLS configuration testing
```bash
./testssl.sh https://example.com
```

**Wireshark**: Protocol analysis (can decrypt TLS with keys)

Security protocols are essential infrastructure—understand them to build secure systems.
