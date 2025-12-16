# Cryptographic Applications

Number theory provides the mathematical foundation for modern cryptography. This section explores how concepts like modular arithmetic, prime factorization, and discrete logarithms enable secure communication.

## RSA Cryptosystem

### Key Generation

1. Choose large random primes p and q (typically 1024+ bits each)
2. Compute n = pq (the modulus)
3. Compute φ(n) = (p-1)(q-1)
4. Choose e coprime to φ(n) (common: e = 65537)
5. Compute d = e^{-1} mod φ(n) using extended Euclidean algorithm

**Public key:** (n, e)
**Private key:** d (or equivalently p, q)

### Encryption and Decryption

```python
def rsa_encrypt(message, e, n):
    """Encrypt message m using public key (n, e)."""
    return pow(message, e, n)

def rsa_decrypt(ciphertext, d, n):
    """Decrypt ciphertext c using private key d."""
    return pow(ciphertext, d, n)
```

**Why it works:**
c^d = (m^e)^d = m^{ed} = m^{1+kφ(n)} = m · (m^{φ(n)})^k ≡ m (mod n)

### Security

Relies on:
- Difficulty of factoring n into p and q
- Given only (n, e), computing d requires knowing φ(n)
- Knowing φ(n) is equivalent to factoring n

### Digital Signatures

1. Hash message: h = H(m)
2. Sign: s = h^d mod n
3. Verify: h' = s^e mod n, check h' = H(m)

## Diffie-Hellman Key Exchange

Allows two parties to establish a shared secret over an insecure channel.

### Protocol

1. Agree on prime p and generator g (public)
2. Alice picks secret a, sends A = g^a mod p
3. Bob picks secret b, sends B = g^b mod p
4. Alice computes K = B^a = g^{ab} mod p
5. Bob computes K = A^b = g^{ab} mod p

Both have shared secret K.

### Security

Based on Discrete Logarithm Problem (DLP):
Given g, p, g^a mod p, find a.

No efficient classical algorithm known.

### Implementation

```python
def diffie_hellman_key_exchange(p, g, private_key):
    """
    Generate public key and compute shared secret.
    """
    public_key = pow(g, private_key, p)
    return public_key

def compute_shared_secret(their_public, my_private, p):
    """Compute shared secret from other's public key."""
    return pow(their_public, my_private, p)
```

## ElGamal Encryption

Public-key encryption based on DLP.

### Key Generation

1. Choose prime p and generator g
2. Choose random private key x
3. Compute public key y = g^x mod p

### Encryption

To encrypt message m:
1. Choose random k
2. Compute c₁ = g^k mod p
3. Compute c₂ = m · y^k mod p
4. Ciphertext: (c₁, c₂)

### Decryption

To decrypt (c₁, c₂):
m = c₂ · (c₁^x)^{-1} mod p

**Why:** c₁^x = g^{kx}, so c₂/c₁^x = m·y^k/g^{kx} = m·g^{kx}/g^{kx} = m

## Primality Testing

Cryptographic applications require generating large primes.

### Miller-Rabin Test

```python
def miller_rabin(n, k=20):
    """
    Test if n is probably prime with k rounds.
    Error probability < 4^(-k).
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Write n-1 = 2^r · d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    import random
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False

    return True
```

### Generating Random Primes

```python
def generate_prime(bits):
    """Generate a random prime with specified bit length."""
    import random
    while True:
        candidate = random.getrandbits(bits)
        candidate |= (1 << bits - 1) | 1  # Ensure odd and correct size
        if miller_rabin(candidate):
            return candidate
```

## Modular Exponentiation

Efficient computation is essential for all these systems.

### Square-and-Multiply

```python
def mod_exp(base, exp, mod):
    """
    Compute base^exp mod mod efficiently.
    O(log exp) multiplications.
    """
    result = 1
    base = base % mod

    while exp > 0:
        if exp & 1:
            result = (result * base) % mod
        exp >>= 1
        base = (base * base) % mod

    return result
```

### Montgomery Multiplication

For repeated operations with same modulus, preprocessing enables faster modular multiplication.

## Hash Functions

Cryptographic hash functions provide:
- One-way property (hard to invert)
- Collision resistance (hard to find m ≠ m' with H(m) = H(m'))
- Pseudorandomness

### Applications

- Password storage (store H(password))
- Digital signatures (sign H(message))
- Commitment schemes
- Proof of work (cryptocurrency mining)

## Elliptic Curve Cryptography

Modern alternative using elliptic curves over finite fields.

### Advantages

- Smaller key sizes for equivalent security
- 256-bit ECC ≈ 3072-bit RSA
- Faster operations

### Curve Definition

y² = x³ + ax + b over field F_p

Points form a group under geometric addition.

## Common Attacks

### Factorization Attacks on RSA

- **Trial division:** O(√n), impractical for large n
- **Pollard's rho:** O(n^{1/4})
- **Quadratic sieve:** Sub-exponential
- **Number field sieve:** Best known for large n

### Discrete Log Attacks

- **Baby-step giant-step:** O(√p) time and space
- **Pollard's rho:** O(√p) time, O(1) space
- **Index calculus:** Sub-exponential for F_p

## Security Parameters

Current recommendations (2024):
- RSA: 2048 bits minimum, 4096 for long-term
- Diffie-Hellman: 2048-bit prime minimum
- ECC: 256-bit curve minimum
- Hash: 256-bit output (SHA-256)

## Summary

Number theory enables:
- **RSA:** Based on factoring difficulty
- **Diffie-Hellman:** Based on discrete log difficulty
- **ElGamal:** Public-key encryption from DLP
- **Primality testing:** Miller-Rabin for large primes
- **Efficient computation:** Square-and-multiply exponentiation

Security relies on computational hardness assumptions that have withstood decades of cryptanalysis.
