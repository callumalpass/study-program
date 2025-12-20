---
title: "Elliptic Curve Cryptography"
description: "Introduction to elliptic curves and their use in modern cryptography"
---

# Elliptic Curve Cryptography

## Introduction

Elliptic Curve Cryptography (ECC) represents one of the most significant advances in cryptography since the invention of RSA. While RSA and traditional Diffie-Hellman rely on the difficulty of factoring or computing discrete logarithms in multiplicative groups of integers, ECC achieves equivalent security with dramatically smaller key sizes by working with the algebraic structure of elliptic curves.

The mathematical elegance of elliptic curves—combining algebraic geometry, group theory, and number theory—provides cryptographic advantages that make ECC the preferred choice for modern applications. A 256-bit elliptic curve key provides security equivalent to a 3072-bit RSA key, resulting in faster computations, smaller certificates, reduced bandwidth, and lower storage requirements. These advantages make ECC particularly valuable for resource-constrained environments like mobile devices, IoT sensors, and embedded systems.

Beyond efficiency, elliptic curves enable novel cryptographic constructions impossible with traditional systems, including efficient identity-based encryption, pairing-based cryptography, and advanced zero-knowledge proof systems. Major cryptocurrencies (Bitcoin, Ethereum), secure messaging protocols (Signal), and modern TLS implementations all rely on elliptic curve cryptography.

## Elliptic Curves: Mathematical Definition

**Definition**: An elliptic curve $E$ over a field $K$ (typically $\mathbb{R}$ or $\mathbb{F}_p$ for prime $p$) is the set of solutions $(x, y)$ to the Weierstrass equation:

$$y^2 = x^3 + ax + b$$

together with a special "point at infinity" denoted $\mathcal{O}$, where $a, b \in K$ satisfy the **non-singularity condition**:

$$\Delta = 4a^3 + 27b^2 \neq 0$$

The non-singularity condition ensures the curve has no cusps or self-intersections—these would disrupt the group structure essential for cryptography.

### Elliptic Curves over Finite Fields

For cryptographic applications, we work with elliptic curves over finite fields $\mathbb{F}_p$ for large prime $p$.

**Definition**: An elliptic curve over $\mathbb{F}_p$ is:

$$E(\mathbb{F}_p) = \{(x, y) \in \mathbb{F}_p \times \mathbb{F}_p : y^2 \equiv x^3 + ax + b \pmod{p}\} \cup \{\mathcal{O}\}$$

where $4a^3 + 27b^2 \not\equiv 0 \pmod{p}$.

**Example**: The elliptic curve $y^2 = x^3 + x + 1$ over $\mathbb{F}_{23}$ consists of points satisfying this equation modulo 23, plus the point at infinity.

### Counting Points

**Hasse's theorem** bounds the number of points on an elliptic curve:

$$|E(\mathbb{F}_p)| = p + 1 - t$$

where $|t| \leq 2\sqrt{p}$. The value $t$ is called the **trace of Frobenius**.

This means the number of points is roughly $p$, with deviation bounded by $2\sqrt{p}$—crucial for selecting curves with prime-order subgroups suitable for cryptography.

## The Group Law

The set of points on an elliptic curve forms an **abelian group** under a geometric operation called "point addition."

### Geometric Intuition (over $\mathbb{R}$)

**Point Addition** $P + Q = R$:
1. Draw a line through points $P$ and $Q$
2. This line intersects the curve at a third point $R'$
3. Reflect $R'$ across the $x$-axis to obtain $R = P + Q$

**Point Doubling** $P + P = 2P$:
1. Draw the tangent line to the curve at $P$
2. This line intersects the curve at another point $R'$
3. Reflect $R'$ across the $x$-axis to obtain $2P$

**Identity**: The point at infinity $\mathcal{O}$ serves as the identity: $P + \mathcal{O} = P$ for all $P$.

**Inverse**: The inverse of $P = (x, y)$ is $-P = (x, -y)$ (reflection across $x$-axis).

### Algebraic Formulas

For points $P = (x_1, y_1)$ and $Q = (x_2, y_2)$ with $P \neq -Q$:

**If $P \neq Q$ (Point Addition)**:

$$\lambda = \frac{y_2 - y_1}{x_2 - x_1}$$

**If $P = Q$ (Point Doubling)**:

$$\lambda = \frac{3x_1^2 + a}{2y_1}$$

Then compute $R = P + Q = (x_3, y_3)$:

$$x_3 = \lambda^2 - x_1 - x_2$$
$$y_3 = \lambda(x_1 - x_3) - y_1$$

All arithmetic is performed in the underlying field (modulo $p$ for $\mathbb{F}_p$).

**Special cases**:
- $P + \mathcal{O} = P$
- $P + (-P) = \mathcal{O}$
- If $y_1 = 0$ in point doubling, then $2P = \mathcal{O}$

### Example Computation

Consider curve $y^2 = x^3 + 2x + 3$ over $\mathbb{F}_{97}$.

Let $P = (17, 10)$ and $Q = (95, 31)$.

**Compute $P + Q$**:

$$\lambda = \frac{31 - 10}{95 - 17} = \frac{21}{78} \pmod{97}$$

To divide, compute $78^{-1} \bmod 97$. Using Extended Euclidean Algorithm: $78^{-1} \equiv 61 \pmod{97}$.

$$\lambda = 21 \cdot 61 = 1281 \equiv 17 \pmod{97}$$

$$x_3 = 17^2 - 17 - 95 = 289 - 112 = 177 \equiv 80 \pmod{97}$$

$$y_3 = 17(17 - 80) - 10 = 17 \cdot (-63) - 10 = -1071 - 10 = -1081 \equiv 87 \pmod{97}$$

Therefore, $P + Q = (80, 87)$.

## Scalar Multiplication

**Scalar multiplication** computes $nP$ for integer $n$ and point $P$:

$$nP = \underbrace{P + P + \cdots + P}_{n \text{ times}}$$

This is the fundamental operation in elliptic curve cryptography.

### Efficient Computation: Double-and-Add

Analogous to repeated squaring for modular exponentiation, we use **double-and-add**:

Express $n$ in binary: $n = \sum_{i=0}^{k} n_i 2^i$ where $n_i \in \{0, 1\}$.

**Algorithm**:
```
Result = O (point at infinity)
Q = P
for i = 0 to k:
    if n_i == 1:
        Result = Result + Q
    Q = 2Q  (point doubling)
return Result
```

**Complexity**: $O(\log n)$ point operations instead of $O(n)$ for naive addition.

**Example**: Compute $13P$ where $13 = 1101_2 = 8 + 4 + 1$:

$$13P = 8P + 4P + P$$

Compute $P, 2P, 4P, 8P$ by successive doubling, then add needed values.

## The Elliptic Curve Discrete Logarithm Problem (ECDLP)

**Problem**: Given elliptic curve $E$, base point $G \in E$, and point $Q = nG$, find the scalar $n$.

The integer $n$ is called the **discrete logarithm** of $Q$ with respect to base $G$.

**Security foundation**: For properly chosen elliptic curves, no efficient algorithm is known to solve ECDLP. The best known algorithms (Pollard's rho, Baby-step giant-step) have complexity $O(\sqrt{n})$ where $n$ is the order of $G$.

**Key advantage over integer DLP**: Index calculus attacks that work against DLP in $\mathbb{F}_p^*$ do not apply to elliptic curves. This allows much smaller key sizes:

- **256-bit ECC** ≈ **3072-bit RSA/DH** (equivalent 128-bit security)
- **384-bit ECC** ≈ **7680-bit RSA/DH** (equivalent 192-bit security)
- **521-bit ECC** ≈ **15360-bit RSA/DH** (equivalent 256-bit security)

## Key Sizes and Security Levels

| Security Level (bits) | ECC Key Size (bits) | RSA/DH Key Size (bits) | Speedup Factor |
|----------------------|---------------------|------------------------|----------------|
| 80 | 160 | 1024 | ~6x |
| 128 | 256 | 3072 | ~12x |
| 192 | 384 | 7680 | ~20x |
| 256 | 521 | 15360 | ~30x |

**Current recommendations** (2025):
- **Minimum**: 256-bit curves (128-bit security)
- **Recommended**: 384-bit curves (192-bit security)
- **High security**: 521-bit curves (256-bit security)

## Elliptic Curve Diffie-Hellman (ECDH)

ECDH is the elliptic curve analog of Diffie-Hellman key exchange.

**Public parameters**: Elliptic curve $E$ over $\mathbb{F}_p$ and base point $G$ of large prime order $q$.

**Alice's steps**:
1. Choose secret random integer $a$ (private key)
2. Compute $A = aG$ (public key)
3. Send $A$ to Bob

**Bob's steps**:
1. Choose secret random integer $b$ (private key)
2. Compute $B = bG$ (public key)
3. Send $B$ to Alice

**Shared secret**:
- Alice computes: $K_A = aB = a(bG) = (ab)G$
- Bob computes: $K_B = bA = b(aG) = (ab)G$

Both parties obtain the same shared secret $K = (ab)G$.

**Security**: Based on ECDLP. An eavesdropper sees $E, G, A = aG, B = bG$ but cannot efficiently compute $abG$.

**Advantages over traditional DH**:
- Much smaller keys (256 bits vs 2048+ bits)
- Faster computation
- Lower bandwidth and storage requirements

## Elliptic Curve Digital Signature Algorithm (ECDSA)

ECDSA provides digital signatures based on elliptic curves, analogous to DSA.

**Key generation**:
- Choose random private key $d$
- Compute public key $Q = dG$

**Signing message $m$**:
1. Compute hash $h = H(m)$ (e.g., SHA-256)
2. Choose random $k$ (ephemeral key)
3. Compute $R = kG = (x_R, y_R)$
4. Set $r = x_R \bmod q$
5. Compute $s = k^{-1}(h + rd) \bmod q$
6. Signature is $(r, s)$

**Verification**:
1. Compute hash $h = H(m)$
2. Compute $u_1 = hs^{-1} \bmod q$ and $u_2 = rs^{-1} \bmod q$
3. Compute $R' = u_1 G + u_2 Q$
4. Accept if $x_{R'} \equiv r \pmod{q}$

**Why it works**: If signature is valid, then:
$$R' = u_1 G + u_2 Q = hs^{-1}G + rs^{-1}dG = s^{-1}(h + rd)G = s^{-1} \cdot sk \cdot G = kG = R$$

**Applications**: Bitcoin, Ethereum, TLS certificates, SSH keys

## Popular Elliptic Curves

### NIST Curves (P-256, P-384, P-521)

Standardized by NIST for U.S. government use:
- **P-256** (secp256r1): 256-bit curve, most widely deployed
- **P-384** (secp384r1): 384-bit curve for higher security
- **P-521** (secp521r1): 521-bit curve for maximum security

**Controversy**: Some cryptographers suspect potential backdoors in the curve generation process (specifically the random-looking parameters). No concrete attack is known, but trust has eroded.

### Curve25519

Designed by Daniel J. Bernstein for high security and performance:
- 256-bit Montgomery curve: $y^2 = x^3 + 486662x^2 + x$ over $\mathbb{F}_p$ where $p = 2^{255} - 19$
- Designed for constant-time implementation (resists timing attacks)
- No suspicious parameters (fully explained design rationale)
- Used in: TLS 1.3, Signal Protocol, SSH, Tor, WireGuard VPN

**Ed25519**: Twisted Edwards form of Curve25519, optimized for signatures
- Used in SSH, Tor, cryptocurrencies (Monero, Cardano)
- Fast signature generation and verification

### secp256k1

Standardized by SECG (Standards for Efficient Cryptography Group):
- Equation: $y^2 = x^3 + 7$ over $\mathbb{F}_p$ where $p = 2^{256} - 2^{32} - 977$
- Chosen by Bitcoin's creator Satoshi Nakamoto (reasons unknown)
- Used in: Bitcoin, Ethereum, and many cryptocurrencies

**Advantage**: Efficient endomorphism allows faster scalar multiplication (GLV method)

## Security Considerations

### Curve Selection

**Critical requirements**:
- Order of base point $G$ should be prime (or have large prime factor)
- Curve should resist known attacks (MOV attack, anomalous curve attack)
- Avoid curves with suspicious parameters
- Use standardized, well-studied curves

### Implementation Challenges

**Side-channel attacks**: Timing, power analysis, electromagnetic emanation can leak secret keys
- **Mitigation**: Constant-time implementations

**Invalid curve attacks**: Attacker sends point not on the curve
- **Mitigation**: Always validate input points

**Fault attacks**: Induce computational errors to learn secrets
- **Mitigation**: Redundant computation, sanity checks

**Random number generation**: Biased or predictable ephemeral keys break ECDSA
- **Mitigation**: Use cryptographically secure RNG; deterministic nonce generation (RFC 6979)

### Quantum Computing Threat

**Shor's algorithm** breaks ECDLP in polynomial time on quantum computers, just as it breaks RSA and traditional DH. This motivates **post-quantum cryptography** research:
- Lattice-based cryptography (e.g., CRYSTALS-Kyber, CRYSTALS-Dilithium)
- Hash-based signatures (e.g., SPHINCS+)
- Code-based cryptography (e.g., Classic McEliece)
- Isogeny-based cryptography (e.g., SIKE, though SIKE was broken in 2022)

## Pairing-Based Cryptography

Certain elliptic curves support **bilinear pairings** $e : G_1 \times G_2 \to G_T$ where $G_1, G_2$ are curve groups and $G_T$ is a multiplicative group.

**Bilinearity**: $e(aP, bQ) = e(P, Q)^{ab}$ for all $P \in G_1, Q \in G_2, a, b \in \mathbb{Z}$

**Applications**:
- **Identity-based encryption** (Boneh-Franklin)
- **Short signatures** (BLS signatures)
- **Zero-knowledge proofs** (zk-SNARKs in Zcash, Ethereum)
- **Attribute-based encryption**

**Examples**: BN curves, BLS curves used in Ethereum 2.0 and Zcash

## Real-World Applications

**Cryptocurrencies**:
- Bitcoin: secp256k1 for transaction signatures
- Ethereum: secp256k1 for accounts, BLS12-381 for consensus
- Monero: Ed25519 for signatures

**Secure Messaging**:
- Signal Protocol: Curve25519 for key exchange
- WhatsApp, Facebook Messenger (use Signal Protocol)

**TLS/SSL**:
- Modern TLS 1.3 prefers ECDHE with Curve25519 or P-256
- Smaller certificates, faster handshakes

**Government/Military**:
- NSA Suite B Cryptography: P-256, P-384
- Classified information requires P-384

**IoT and Embedded Systems**:
- Small key sizes and efficient computation ideal for resource-constrained devices
- Used in smart cards, RFID, automotive systems

## Summary

Elliptic Curve Cryptography provides equivalent security to traditional systems with dramatically smaller keys:

- **Definition**: Elliptic curves $y^2 = x^3 + ax + b$ over finite fields form abelian groups
- **Group law**: Geometric point addition provides cryptographic operations
- **Scalar multiplication**: $nP$ computed efficiently via double-and-add algorithm
- **ECDLP**: Discrete logarithm problem on elliptic curves resists index calculus
- **Key sizes**: 256-bit ECC ≈ 3072-bit RSA in security
- **ECDH**: Key exchange protocol achieving forward secrecy with small keys
- **ECDSA**: Digital signature algorithm used in cryptocurrencies and TLS
- **Popular curves**: Curve25519 (Signal, TLS), P-256 (widespread), secp256k1 (Bitcoin)
- **Advantages**: Faster, smaller keys, lower bandwidth, better for constrained devices

Elliptic curve cryptography represents the state-of-the-art in public-key cryptography, combining mathematical elegance with practical efficiency. While quantum computers pose a future threat, ECC remains the optimal choice for current cryptographic systems, demonstrating how advanced mathematics enables the secure, efficient communication that underpins modern digital infrastructure.

## Key Takeaways

- Elliptic curves provide the same security as RSA/DH with keys 10-30 times smaller
- The group structure of elliptic curve points enables efficient cryptographic operations
- ECDLP is believed harder than integer DLP due to resistance to index calculus attacks
- Modern protocols (TLS 1.3, Signal, cryptocurrencies) increasingly rely on ECC
- Curve selection and implementation quality are critical for security
- Pairing-based cryptography enables advanced protocols like identity-based encryption and zk-SNARKs
- Quantum computing will eventually break ECC, motivating post-quantum cryptography research
