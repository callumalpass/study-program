import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'math304-t7-ex01',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Modular Addition',
    difficulty: 1,
    description: 'Compute (a + b) mod n for given integers a, b, and modulus n.',
    starterCode: `def modular_add(a, b, n):
    """
    Compute (a + b) mod n.

    Args:
        a, b: Integers to add
        n: Modulus

    Returns:
        Result of (a + b) mod n
    """
    pass`,
    solution: `def modular_add(a, b, n):
    """
    Compute (a + b) mod n.

    Args:
        a, b: Integers to add
        n: Modulus

    Returns:
        Result of (a + b) mod n
    """
    return (a + b) % n`,
    testCases: [
      { input: '7, 5, 10', expectedOutput: '2', isHidden: false, description: '(7 + 5) mod 10 = 2' },
      { input: '15, 20, 12', expectedOutput: '11', isHidden: false, description: '(15 + 20) mod 12 = 11' },
      { input: '100, 200, 7', expectedOutput: '6', isHidden: true, description: '(100 + 200) mod 7' }
    ],
    hints: ['Use Python modulo operator %', 'Result is always in range [0, n-1]'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex02',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Modular Multiplication',
    difficulty: 1,
    description: 'Compute (a × b) mod n for given integers a, b, and modulus n.',
    starterCode: `def modular_mul(a, b, n):
    """
    Compute (a * b) mod n.

    Args:
        a, b: Integers to multiply
        n: Modulus

    Returns:
        Result of (a * b) mod n
    """
    pass`,
    solution: `def modular_mul(a, b, n):
    """
    Compute (a * b) mod n.

    Args:
        a, b: Integers to multiply
        n: Modulus

    Returns:
        Result of (a * b) mod n
    """
    return (a * b) % n`,
    testCases: [
      { input: '7, 8, 10', expectedOutput: '6', isHidden: false, description: '(7 × 8) mod 10 = 6' },
      { input: '12, 13, 7', expectedOutput: '2', isHidden: false, description: '(12 × 13) mod 7 = 2' },
      { input: '100, 200, 17', expectedOutput: '7', isHidden: true, description: '(100 × 200) mod 17' }
    ],
    hints: ['Multiply first, then take modulo', 'Can reduce intermediate results mod n'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex03',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Modular Exponentiation',
    difficulty: 2,
    description: 'Compute a^b mod n efficiently using repeated squaring.',
    starterCode: `def modular_pow(a, b, n):
    """
    Compute a^b mod n efficiently.

    Args:
        a: Base
        b: Exponent (non-negative)
        n: Modulus

    Returns:
        Result of a^b mod n
    """
    pass`,
    solution: `def modular_pow(a, b, n):
    """
    Compute a^b mod n efficiently.

    Args:
        a: Base
        b: Exponent (non-negative)
        n: Modulus

    Returns:
        Result of a^b mod n
    """
    result = 1
    base = a % n

    while b > 0:
        if b % 2 == 1:
            result = (result * base) % n
        base = (base * base) % n
        b = b // 2

    return result`,
    testCases: [
      { input: '2, 10, 1000', expectedOutput: '24', isHidden: false, description: '2^10 mod 1000 = 1024 mod 1000 = 24' },
      { input: '3, 5, 7', expectedOutput: '5', isHidden: false, description: '3^5 mod 7 = 243 mod 7 = 5' },
      { input: '7, 100, 13', expectedOutput: '9', isHidden: true, description: '7^100 mod 13' }
    ],
    hints: ['Use repeated squaring for efficiency', 'Reduce mod n at each step', 'Binary exponentiation is O(log b)'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex04',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Extended Euclidean Algorithm',
    difficulty: 3,
    description: 'Implement the extended Euclidean algorithm to find gcd(a,b) and coefficients x, y such that ax + by = gcd(a,b).',
    starterCode: `def extended_gcd(a, b):
    """
    Extended Euclidean algorithm.

    Args:
        a, b: Positive integers

    Returns:
        Tuple (gcd, x, y) where gcd = ax + by
    """
    pass`,
    solution: `def extended_gcd(a, b):
    """
    Extended Euclidean algorithm.

    Args:
        a, b: Positive integers

    Returns:
        Tuple (gcd, x, y) where gcd = ax + by
    """
    if b == 0:
        return (a, 1, 0)

    gcd, x1, y1 = extended_gcd(b, a % b)

    x = y1
    y = x1 - (a // b) * y1

    return (gcd, x, y)`,
    testCases: [
      { input: '35, 15', expectedOutput: '(5, 1, -2)', isHidden: false, description: 'gcd(35,15) = 5 = 1×35 + (-2)×15' },
      { input: '120, 23', expectedOutput: '(1, -9, 47)', isHidden: false, description: 'gcd(120,23) = 1' },
      { input: '48, 18', expectedOutput: '(6, 1, -2)', isHidden: true, description: 'gcd(48,18) = 6' }
    ],
    hints: ['Use recursion with base case b = 0', 'Back-substitute to find coefficients', 'Update x and y based on recursion'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex05',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Modular Inverse',
    difficulty: 3,
    description: 'Find the modular inverse of a modulo n. The inverse b satisfies (a × b) ≡ 1 (mod n).',
    starterCode: `def modular_inverse(a, n):
    """
    Find modular inverse of a mod n.

    Args:
        a: Integer to invert
        n: Modulus

    Returns:
        Inverse of a mod n, or None if no inverse exists
    """
    pass`,
    solution: `def modular_inverse(a, n):
    """
    Find modular inverse of a mod n.

    Args:
        a: Integer to invert
        n: Modulus

    Returns:
        Inverse of a mod n, or None if no inverse exists
    """
    def extended_gcd(a, b):
        if b == 0:
            return (a, 1, 0)
        gcd, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return (gcd, x, y)

    gcd, x, _ = extended_gcd(a, n)

    if gcd != 1:
        return None  # No inverse exists

    return x % n`,
    testCases: [
      { input: '3, 7', expectedOutput: '5', isHidden: false, description: '3 × 5 ≡ 1 (mod 7)' },
      { input: '7, 26', expectedOutput: '15', isHidden: false, description: '7 × 15 ≡ 1 (mod 26)' },
      { input: '4, 6', expectedOutput: 'None', isHidden: true, description: 'No inverse (gcd(4,6) = 2 ≠ 1)' }
    ],
    hints: ['Use extended Euclidean algorithm', 'Inverse exists iff gcd(a,n) = 1', 'Return x mod n where ax + ny = 1'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex06',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Chinese Remainder Theorem',
    difficulty: 4,
    description: 'Solve system of congruences using CRT: x ≡ a₁ (mod n₁), x ≡ a₂ (mod n₂), ... where moduli are pairwise coprime.',
    starterCode: `def chinese_remainder(remainders, moduli):
    """
    Solve system of congruences using CRT.

    Args:
        remainders: List of remainders [a1, a2, ...]
        moduli: List of pairwise coprime moduli [n1, n2, ...]

    Returns:
        Solution x modulo product of moduli
    """
    pass`,
    solution: `def chinese_remainder(remainders, moduli):
    """
    Solve system of congruences using CRT.

    Args:
        remainders: List of remainders [a1, a2, ...]
        moduli: List of pairwise coprime moduli [n1, n2, ...]

    Returns:
        Solution x modulo product of moduli
    """
    def extended_gcd(a, b):
        if b == 0:
            return (a, 1, 0)
        gcd, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return (gcd, x, y)

    def mod_inv(a, n):
        gcd, x, _ = extended_gcd(a, n)
        if gcd != 1:
            return None
        return x % n

    # Product of all moduli
    N = 1
    for n in moduli:
        N *= n

    x = 0
    for i in range(len(remainders)):
        Ni = N // moduli[i]
        Mi = mod_inv(Ni, moduli[i])
        x += remainders[i] * Ni * Mi

    return x % N`,
    testCases: [
      { input: '[2, 3, 2], [3, 5, 7]', expectedOutput: '23', isHidden: false, description: 'x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)' },
      { input: '[1, 2], [3, 4]', expectedOutput: '10', isHidden: false, description: 'x ≡ 1 (mod 3), x ≡ 2 (mod 4)' },
      { input: '[0, 3, 4], [5, 7, 9]', expectedOutput: '220', isHidden: true, description: 'Three congruences' }
    ],
    hints: ['Compute N = product of all moduli', 'For each i, compute Ni = N/ni and Mi = Ni^(-1) mod ni', 'Solution is Σ ai·Ni·Mi mod N'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex07',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Euler Totient Function',
    difficulty: 2,
    description: 'Compute φ(n), the number of integers k in range 1 ≤ k ≤ n that are coprime to n.',
    starterCode: `def euler_phi(n):
    """
    Compute Euler's totient function φ(n).

    Args:
        n: Positive integer

    Returns:
        φ(n)
    """
    pass`,
    solution: `def euler_phi(n):
    """
    Compute Euler's totient function φ(n).

    Args:
        n: Positive integer

    Returns:
        φ(n)
    """
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    count = 0
    for k in range(1, n + 1):
        if gcd(k, n) == 1:
            count += 1

    return count`,
    testCases: [
      { input: '9', expectedOutput: '6', isHidden: false, description: 'φ(9) = 6 (1,2,4,5,7,8 coprime to 9)' },
      { input: '7', expectedOutput: '6', isHidden: false, description: 'φ(7) = 6 (prime)' },
      { input: '12', expectedOutput: '4', isHidden: true, description: 'φ(12) = 4 (1,5,7,11)' }
    ],
    hints: ['Count integers from 1 to n coprime to n', 'gcd(k, n) = 1 means coprime', 'For prime p, φ(p) = p-1'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex08',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Fermat Little Theorem',
    difficulty: 2,
    description: 'Verify Fermat\'s Little Theorem: if p is prime and gcd(a,p)=1, then a^(p-1) ≡ 1 (mod p).',
    starterCode: `def verify_fermat_little(a, p):
    """
    Verify Fermat's Little Theorem for a and prime p.

    Args:
        a: Integer coprime to p
        p: Prime number

    Returns:
        True if a^(p-1) ≡ 1 (mod p), False otherwise
    """
    pass`,
    solution: `def verify_fermat_little(a, p):
    """
    Verify Fermat's Little Theorem for a and prime p.

    Args:
        a: Integer coprime to p
        p: Prime number

    Returns:
        True if a^(p-1) ≡ 1 (mod p), False otherwise
    """
    result = pow(a, p - 1, p)
    return result == 1`,
    testCases: [
      { input: '2, 7', expectedOutput: 'True', isHidden: false, description: '2^6 ≡ 1 (mod 7)' },
      { input: '3, 11', expectedOutput: 'True', isHidden: false, description: '3^10 ≡ 1 (mod 11)' },
      { input: '5, 13', expectedOutput: 'True', isHidden: true, description: '5^12 ≡ 1 (mod 13)' }
    ],
    hints: ['Compute a^(p-1) mod p', 'Use efficient modular exponentiation', 'Should equal 1 for prime p'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex09',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Euler Theorem',
    difficulty: 3,
    description: 'Verify Euler\'s theorem: if gcd(a,n)=1, then a^φ(n) ≡ 1 (mod n).',
    starterCode: `def verify_euler_theorem(a, n):
    """
    Verify Euler's theorem for a and n.

    Args:
        a: Integer coprime to n
        n: Positive integer

    Returns:
        True if a^φ(n) ≡ 1 (mod n), False otherwise
    """
    pass`,
    solution: `def verify_euler_theorem(a, n):
    """
    Verify Euler's theorem for a and n.

    Args:
        a: Integer coprime to n
        n: Positive integer

    Returns:
        True if a^φ(n) ≡ 1 (mod n), False otherwise
    """
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    def euler_phi(n):
        count = 0
        for k in range(1, n + 1):
            if gcd(k, n) == 1:
                count += 1
        return count

    phi_n = euler_phi(n)
    result = pow(a, phi_n, n)
    return result == 1`,
    testCases: [
      { input: '3, 10', expectedOutput: 'True', isHidden: false, description: '3^φ(10) = 3^4 ≡ 1 (mod 10)' },
      { input: '7, 12', expectedOutput: 'True', isHidden: false, description: '7^φ(12) = 7^4 ≡ 1 (mod 12)' },
      { input: '5, 14', expectedOutput: 'True', isHidden: true, description: '5^φ(14) ≡ 1 (mod 14)' }
    ],
    hints: ['Compute φ(n) first', 'Then compute a^φ(n) mod n', 'Generalizes Fermat Little Theorem'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex10',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Generate RSA Keys',
    difficulty: 5,
    description: 'Generate RSA public and private keys. Choose primes p, q, compute n=pq, φ(n)=(p-1)(q-1), select e coprime to φ(n), compute d = e^(-1) mod φ(n).',
    starterCode: `def generate_rsa_keys(p, q, e):
    """
    Generate RSA keys from primes p, q and public exponent e.

    Args:
        p, q: Prime numbers
        e: Public exponent (coprime to φ(n))

    Returns:
        Tuple ((n, e), (n, d)) where (n,e) is public key and (n,d) is private key
    """
    pass`,
    solution: `def generate_rsa_keys(p, q, e):
    """
    Generate RSA keys from primes p, q and public exponent e.

    Args:
        p, q: Prime numbers
        e: Public exponent (coprime to φ(n))

    Returns:
        Tuple ((n, e), (n, d)) where (n,e) is public key and (n,d) is private key
    """
    def extended_gcd(a, b):
        if b == 0:
            return (a, 1, 0)
        gcd, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return (gcd, x, y)

    def mod_inv(a, n):
        gcd, x, _ = extended_gcd(a, n)
        if gcd != 1:
            return None
        return x % n

    # Compute n and φ(n)
    n = p * q
    phi_n = (p - 1) * (q - 1)

    # Compute private exponent d
    d = mod_inv(e, phi_n)

    # Public key (n, e), Private key (n, d)
    return ((n, e), (n, d))`,
    testCases: [
      { input: '11, 13, 7', expectedOutput: '((143, 7), (143, 103))', isHidden: false, description: 'Small RSA keys with p=11, q=13' },
      { input: '5, 11, 3', expectedOutput: '((55, 3), (55, 27))', isHidden: false, description: 'RSA with p=5, q=11, e=3' },
      { input: '7, 17, 5', expectedOutput: '((119, 5), (119, 77))', isHidden: true, description: 'RSA with p=7, q=17' }
    ],
    hints: ['Compute n = p×q', 'Compute φ(n) = (p-1)(q-1)', 'Find d = e^(-1) mod φ(n) using extended GCD'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex11',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'RSA Encryption',
    difficulty: 3,
    description: 'Encrypt a message using RSA public key. Ciphertext c = m^e mod n.',
    starterCode: `def rsa_encrypt(message, public_key):
    """
    Encrypt message using RSA public key.

    Args:
        message: Integer message (0 ≤ m < n)
        public_key: Tuple (n, e)

    Returns:
        Encrypted ciphertext
    """
    pass`,
    solution: `def rsa_encrypt(message, public_key):
    """
    Encrypt message using RSA public key.

    Args:
        message: Integer message (0 ≤ m < n)
        public_key: Tuple (n, e)

    Returns:
        Encrypted ciphertext
    """
    n, e = public_key
    ciphertext = pow(message, e, n)
    return ciphertext`,
    testCases: [
      { input: '42, (143, 7)', expectedOutput: '42', isHidden: false, description: 'Encrypt 42 with (n=143, e=7)' },
      { input: '10, (55, 3)', expectedOutput: '10', isHidden: false, description: 'Encrypt 10 with (n=55, e=3)' },
      { input: '20, (119, 5)', expectedOutput: '68', isHidden: true, description: 'Encrypt 20' }
    ],
    hints: ['Compute m^e mod n', 'Use modular exponentiation', 'Result is ciphertext'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex12',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'RSA Decryption',
    difficulty: 3,
    description: 'Decrypt a ciphertext using RSA private key. Message m = c^d mod n.',
    starterCode: `def rsa_decrypt(ciphertext, private_key):
    """
    Decrypt ciphertext using RSA private key.

    Args:
        ciphertext: Integer ciphertext
        private_key: Tuple (n, d)

    Returns:
        Decrypted message
    """
    pass`,
    solution: `def rsa_decrypt(ciphertext, private_key):
    """
    Decrypt ciphertext using RSA private key.

    Args:
        ciphertext: Integer ciphertext
        private_key: Tuple (n, d)

    Returns:
        Decrypted message
    """
    n, d = private_key
    message = pow(ciphertext, d, n)
    return message`,
    testCases: [
      { input: '42, (143, 103)', expectedOutput: '42', isHidden: false, description: 'Decrypt with private key' },
      { input: '10, (55, 27)', expectedOutput: '10', isHidden: false, description: 'Decrypt ciphertext 10' },
      { input: '68, (119, 77)', expectedOutput: '20', isHidden: true, description: 'Decrypt to get 20' }
    ],
    hints: ['Compute c^d mod n', 'Use modular exponentiation', 'Should recover original message'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex13',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Miller-Rabin Primality Test',
    difficulty: 5,
    description: 'Implement Miller-Rabin probabilistic primality test to check if a number is probably prime.',
    starterCode: `def is_probably_prime(n, k=5):
    """
    Miller-Rabin primality test.

    Args:
        n: Number to test
        k: Number of rounds (higher = more accurate)

    Returns:
        True if probably prime, False if definitely composite
    """
    pass`,
    solution: `def is_probably_prime(n, k=5):
    """
    Miller-Rabin primality test.

    Args:
        n: Number to test
        k: Number of rounds (higher = more accurate)

    Returns:
        True if probably prime, False if definitely composite
    """
    import random

    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Write n-1 as 2^r * d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    # Witness loop
    for _ in range(k):
        a = random.randint(2, n - 2)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False

    return True`,
    testCases: [
      { input: '17, 5', expectedOutput: 'True', isHidden: false, description: '17 is prime' },
      { input: '15, 5', expectedOutput: 'False', isHidden: false, description: '15 is composite' },
      { input: '97, 5', expectedOutput: 'True', isHidden: true, description: '97 is prime' }
    ],
    hints: ['Write n-1 as 2^r × d', 'Test k random witnesses', 'Check if a^d ≡ 1 or a^(2^i×d) ≡ -1 for some i'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex14',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Solve Linear Congruence',
    difficulty: 3,
    description: 'Solve linear congruence ax ≡ b (mod n). Solution exists iff gcd(a,n) divides b.',
    starterCode: `def solve_linear_congruence(a, b, n):
    """
    Solve ax ≡ b (mod n).

    Args:
        a, b: Coefficients
        n: Modulus

    Returns:
        List of solutions modulo n, or empty list if no solution
    """
    pass`,
    solution: `def solve_linear_congruence(a, b, n):
    """
    Solve ax ≡ b (mod n).

    Args:
        a, b: Coefficients
        n: Modulus

    Returns:
        List of solutions modulo n, or empty list if no solution
    """
    def extended_gcd(a, b):
        if b == 0:
            return (a, 1, 0)
        gcd, x1, y1 = extended_gcd(b, a % b)
        x = y1
        y = x1 - (a // b) * y1
        return (gcd, x, y)

    gcd, x, _ = extended_gcd(a, n)

    # Check if solution exists
    if b % gcd != 0:
        return []

    # Find one solution
    x0 = (x * (b // gcd)) % n

    # Generate all solutions
    solutions = []
    step = n // gcd

    for i in range(gcd):
        solutions.append((x0 + i * step) % n)

    return sorted(solutions)`,
    testCases: [
      { input: '3, 6, 9', expectedOutput: '[2, 5, 8]', isHidden: false, description: '3x ≡ 6 (mod 9) has 3 solutions' },
      { input: '5, 3, 7', expectedOutput: '[2]', isHidden: false, description: '5x ≡ 3 (mod 7) has unique solution' },
      { input: '2, 3, 6', expectedOutput: '[]', isHidden: true, description: 'No solution (gcd(2,6)=2 does not divide 3)' }
    ],
    hints: ['Check if gcd(a,n) divides b', 'Use extended GCD to find one solution', 'Generate all gcd(a,n) solutions'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex15',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Compute Discrete Logarithm',
    difficulty: 5,
    description: 'Find x such that g^x ≡ h (mod p) using baby-step giant-step algorithm.',
    starterCode: `def discrete_log(g, h, p):
    """
    Compute discrete logarithm: find x where g^x ≡ h (mod p).

    Args:
        g: Base (generator)
        h: Target value
        p: Prime modulus

    Returns:
        x such that g^x ≡ h (mod p), or None if not found
    """
    pass`,
    solution: `def discrete_log(g, h, p):
    """
    Compute discrete logarithm: find x where g^x ≡ h (mod p).

    Args:
        g: Base (generator)
        h: Target value
        p: Prime modulus

    Returns:
        x such that g^x ≡ h (mod p), or None if not found
    """
    import math

    # Baby-step giant-step
    m = int(math.ceil(math.sqrt(p)))

    # Baby steps: compute g^j for j = 0, 1, ..., m-1
    baby_steps = {}
    power = 1
    for j in range(m):
        if power == h:
            return j
        baby_steps[power] = j
        power = (power * g) % p

    # Giant steps: compute h * (g^(-m))^i for i = 0, 1, ..., m-1
    # First compute g^(-m)
    def mod_inv(a, n):
        def extended_gcd(a, b):
            if b == 0:
                return (a, 1, 0)
            gcd, x1, y1 = extended_gcd(b, a % b)
            x = y1
            y = x1 - (a // b) * y1
            return (gcd, x, y)
        gcd, x, _ = extended_gcd(a, n)
        return x % n if gcd == 1 else None

    g_m_inv = mod_inv(pow(g, m, p), p)
    gamma = h

    for i in range(m):
        if gamma in baby_steps:
            return i * m + baby_steps[gamma]
        gamma = (gamma * g_m_inv) % p

    return None`,
    testCases: [
      { input: '2, 3, 5', expectedOutput: '3', isHidden: false, description: '2^3 ≡ 3 (mod 5)' },
      { input: '3, 4, 7', expectedOutput: '4', isHidden: false, description: '3^4 ≡ 4 (mod 7)' },
      { input: '2, 6, 11', expectedOutput: '9', isHidden: true, description: '2^9 ≡ 6 (mod 11)' }
    ],
    hints: ['Use baby-step giant-step algorithm', 'Compute table of g^j for small j', 'Search for match with h×(g^(-m))^i'],
    language: 'python'
  },
  {
    id: 'math304-t7-ex16',
    subjectId: 'math304',
    topicId: 'math304-topic-7',
    title: 'Quadratic Residue Check',
    difficulty: 4,
    description: 'Check if a is a quadratic residue modulo prime p (i.e., whether x^2 ≡ a (mod p) has a solution).',
    starterCode: `def is_quadratic_residue(a, p):
    """
    Check if a is a quadratic residue mod p using Euler's criterion.

    Args:
        a: Integer to check
        p: Odd prime

    Returns:
        True if a is quadratic residue mod p, False otherwise
    """
    pass`,
    solution: `def is_quadratic_residue(a, p):
    """
    Check if a is a quadratic residue mod p using Euler's criterion.

    Args:
        a: Integer to check
        p: Odd prime

    Returns:
        True if a is quadratic residue mod p, False otherwise
    """
    # Euler's criterion: a is QR iff a^((p-1)/2) ≡ 1 (mod p)
    a = a % p

    if a == 0:
        return True

    result = pow(a, (p - 1) // 2, p)
    return result == 1`,
    testCases: [
      { input: '4, 7', expectedOutput: 'True', isHidden: false, description: '4 ≡ 2^2 is QR mod 7' },
      { input: '3, 7', expectedOutput: 'False', isHidden: false, description: '3 is not QR mod 7' },
      { input: '10, 13', expectedOutput: 'True', isHidden: true, description: '10 is QR mod 13' }
    ],
    hints: ['Use Euler criterion: a^((p-1)/2) ≡ 1 (mod p)', 'Compute using modular exponentiation', 'Returns 1 if QR, -1 (≡ p-1) if not'],
    language: 'python'
  }
];
