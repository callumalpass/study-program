---
title: "Error-Correcting Codes"
description: "Algebraic error-correcting codes using group and ring theory"
---

# Error-Correcting Codes

## Motivation

Transmit data over noisy channel where errors may occur. **Goal**: Detect and correct errors.

**Strategy**: Add redundancy using algebraic structure.

## Linear Codes

**Definition**: A **linear code** $C$ is a subspace of $\mathbb{F}_2^n$ (or $\mathbb{F}_q^n$).

**Codewords**: Elements of $C$.

**Parameters**: $[n, k, d]$ code:
- $n$: length (total bits)
- $k$: dimension (message bits)
- $d$: minimum distance (error detection/correction)

**Minimum distance**: $d = \min\{d(x, y) : x, y \in C, x \neq y\}$ where $d(x, y) = $ Hamming distance.

## Error Detection and Correction

**Theorem**: Code with minimum distance $d$ can:
- Detect up to $d - 1$ errors
- Correct up to $\lfloor (d-1)/2 \rfloor$ errors

## Hamming Codes

**Hamming(7,4)**: $[7, 4, 3]$ code.
- 7 total bits
- 4 message bits
- Minimum distance 3 (corrects 1 error)

**Construction**: Use parity check matrix $H$.

### Example

Message $1011$ encoded as $1011010$ (with parity bits).

If one bit flips: $1011\underline{1}10$, syndrome reveals error position, correct to $1011010$.

## Cyclic Codes

**Definition**: Linear code $C$ is **cyclic** if $(c_0, c_1, \ldots, c_{n-1}) \in C \Rightarrow (c_{n-1}, c_0, \ldots, c_{n-2}) \in C$.

**Connection to algebra**: Cyclic codes correspond to ideals in $\mathbb{F}_q[x] / \langle x^n - 1 \rangle$.

**Generator polynomial**: $g(x)$ divides $x^n - 1$.

## BCH Codes

**Bose-Chaudhuri-Hocquenghem codes**: Powerful cyclic codes.

- Designed to correct $t$ errors
- Used in QR codes, DVDs, satellite communication

## Reed-Solomon Codes

Special BCH codes over $\mathbb{F}_{2^m}$.

**Applications**:
- CDs, DVDs (detect scratches)
- QR codes
- Deep space communication
- RAID storage

**Power**: Can correct burst errors (consecutive errors).

## Summary

- Linear codes: subspaces of $\mathbb{F}_q^n$
- Minimum distance determines error capability
- Hamming codes: simple, correct 1 error
- Cyclic codes: ideals in quotient polynomial rings
- Reed-Solomon: powerful, used everywhere

Error-correcting codes demonstrate practical power of abstract algebra in real-world applications.
