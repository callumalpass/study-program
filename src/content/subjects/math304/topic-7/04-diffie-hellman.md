---
title: "Diffie-Hellman Key Exchange"
description: "The Diffie-Hellman protocol for secure key agreement"
---

# Diffie-Hellman Key Exchange

## Overview

Diffie-Hellman (1976) enables two parties to establish shared secret over insecure channel.

**Security**: Based on discrete logarithm problem.

## The Protocol

**Public parameters**: Large prime $p$ and generator $g$ of $\mathbb{Z}_p^*$ (or other cyclic group).

**Alice's steps**:
1. Choose secret $a$ (random, $1 < a < p-1$)
2. Compute $A = g^a \bmod p$
3. Send $A$ to Bob

**Bob's steps**:
1. Choose secret $b$ (random, $1 < b < p-1$)
2. Compute $B = g^b \bmod p$
3. Send $B$ to Alice

**Shared secret**:
- Alice computes: $K_A = B^a = (g^b)^a = g^{ab} \bmod p$
- Bob computes: $K_B = A^b = (g^a)^b = g^{ab} \bmod p$
- $K_A = K_B = K = g^{ab}$ (shared secret)

## Example (Small Numbers)

**Setup**: $p = 23, g = 5$

**Alice**: $a = 6$
- $A = 5^6 \bmod 23 = 15625 \bmod 23 = 8$

**Bob**: $b = 15$
- $B = 5^{15} \bmod 23 = 19$

**Shared secret**:
- Alice: $K = 19^6 \bmod 23 = 2$
- Bob: $K = 8^{15} \bmod 23 = 2$

Both obtain $K = 2$.

## Security

**Discrete Logarithm Problem (DLP)**: Given $g, p, A = g^a \bmod p$, find $a$.

For large $p$, DLP is computationally hard (no known efficient algorithm).

**Eavesdropper sees**: $p, g, A, B$
**Eavesdropper needs**: $a$ or $b$ (or directly $g^{ab}$)

Best known: requires exponential time for large $p$.

## Man-in-the-Middle Attack

**Vulnerability**: No authentication!

Eve intercepts and establishes separate keys with Alice and Bob.

**Mitigation**: Combine with authentication (certificates, signatures).

## Elliptic Curve Diffie-Hellman (ECDH)

Modern variant uses elliptic curve groups instead of $\mathbb{Z}_p^*$:
- Smaller keys for equivalent security
- $K = a \cdot B = b \cdot A$ (elliptic curve point multiplication)

## Applications

- TLS/SSL handshake
- IPsec VPN
- Secure messaging (Signal protocol)
- Cryptocurrency key agreement

## Summary

- Public: $p, g, A = g^a, B = g^b$
- Shared secret: $K = g^{ab}$
- Security: discrete log problem
- Enables secure communication
- Requires authentication to prevent MITM

Diffie-Hellman was the first public-key protocol, revolutionizing cryptography.
