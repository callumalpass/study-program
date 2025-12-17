---
title: "Elliptic Curve Cryptography"
description: "Introduction to elliptic curves and their use in modern cryptography"
---

# Elliptic Curve Cryptography

## Elliptic Curves

**Definition**: An elliptic curve over field $\mathbb{F}_p$ has form:
$$y^2 \equiv x^3 + ax + b \pmod{p}$$

with discriminant $\Delta = 4a^3 + 27b^2 \not\equiv 0 \pmod{p}$ (non-singular).

## Group Law

Points on elliptic curve form a group under geometric "addition":

**Point addition**: For points $P = (x_1, y_1)$ and $Q = (x_2, y_2)$:
- Draw line through $P$ and $Q$
- Find third intersection $R'$ with curve
- Reflect across $x$-axis to get $R = P + Q$

**Formulas**: Complex algebraic expressions for coordinates.

**Identity**: Point at infinity $\mathcal{O}$.

**Inverse**: $-P = (x, -y)$ for $P = (x, y)$.

## Scalar Multiplication

$$nP = \underbrace{P + P + \cdots + P}_{n \text{ times}}$$

Computed efficiently via double-and-add (analogous to repeated squaring).

## Discrete Log Problem

**ECDLP**: Given $P, Q = nP$, find $n$.

For appropriate curves, ECDLP is harder than integer DLP, allowing smaller keys.

## Key Sizes

Equivalent security:
- 256-bit ECC $\approx$ 3072-bit RSA
- 384-bit ECC $\approx$ 7680-bit RSA

Much smaller keys, faster operations!

## ECDH

Elliptic Curve Diffie-Hellman:
- Public: curve, base point $G$
- Alice: secret $a$, public $A = aG$
- Bob: secret $b$, public $B = bG$
- Shared: $K = aB = bA = abG$

## ECDSA

Elliptic Curve Digital Signature Algorithm:
- Widely used for signatures
- Bitcoin, Ethereum use ECDSA
- Smaller signatures than RSA

## Popular Curves

- **secp256k1**: Bitcoin, Ethereum
- **Curve25519**: TLS, Signal, SSH
- **P-256, P-384**: NIST standards

## Summary

- Elliptic curves form groups
- ECDLP harder than integer DLP
- Smaller keys than RSA
- Faster operations
- Modern standard for cryptography

ECC provides same security as RSA with much smaller keys, making it ideal for constrained environments.
