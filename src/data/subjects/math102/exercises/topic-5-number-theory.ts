import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math102-e5',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Euclidean Algorithm',
    difficulty: 2,
    description: 'Implement the Euclidean algorithm to find the greatest common divisor (GCD) of two integers. The algorithm is based on the principle that gcd(a,b) = gcd(b, a mod b). Continue until the remainder is 0. Also implement the extended version to find coefficients x and y such that ax + by = gcd(a,b).',
    starterCode: 'def gcd(a, b):\n    """Calculate GCD using Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Greatest common divisor of a and b\n    """\n    # Your code here\n    pass\n\ndef extended_gcd(a, b):\n    """Extended Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Tuple (gcd, x, y) where ax + by = gcd\n    """\n    # Your code here\n    pass',
    solution: 'def gcd(a, b):\n    """Calculate GCD using Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Greatest common divisor of a and b\n    """\n    while b != 0:\n        a, b = b, a % b\n    return abs(a)\n\ndef extended_gcd(a, b):\n    """Extended Euclidean algorithm.\n    \n    Args:\n        a: First integer\n        b: Second integer\n        \n    Returns:\n        Tuple (gcd, x, y) where ax + by = gcd\n    """\n    if b == 0:\n        return abs(a), 1 if a >= 0 else -1, 0\n    \n    x1, y1 = 1, 0\n    x2, y2 = 0, 1\n    \n    while b != 0:\n        q = a // b\n        a, b = b, a % b\n        x1, x2 = x2, x1 - q * x2\n        y1, y2 = y2, y1 - q * y2\n    \n    return abs(a), x1 if a >= 0 else -x1, y1 if a >= 0 else -y1',
    testCases: [
      { input: '48, 18', expectedOutput: '6', isHidden: false, description: 'gcd(48, 18) should return 6' },
      { input: '100, 35', expectedOutput: '5', isHidden: false, description: 'gcd(100, 35) should return 5' },
      { input: '17, 13', expectedOutput: '1', isHidden: true, description: 'gcd of coprime numbers should return 1' },
      { input: '0, 5', expectedOutput: '5', isHidden: true, description: 'gcd(0, n) should return n' }
    ],
    hints: [
      'For the basic GCD, repeatedly replace (a,b) with (b, a mod b) until b is 0',
      'The extended version tracks coefficients that combine to give the GCD',
      'Handle the base case when b equals 0',
      'Remember to handle negative numbers by taking absolute values'
    ],
    language: 'python'
  },
  {
    id: 'math102-t5-ex02',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'LCM Function',
    difficulty: 1,
    description: 'Implement a function to calculate the Least Common Multiple of two integers.',
    starterCode: 'def lcm(a, b):\n    """Calculate LCM of two integers\n    \n    Args:\n        a, b: Integers\n    Returns:\n        Least common multiple\n    """\n    pass\n\nprint(lcm(12, 18))',
    solution: 'def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return abs(a)\n\ndef lcm(a, b):\n    """Calculate LCM of two integers\n    \n    Args:\n        a, b: Integers\n    Returns:\n        Least common multiple\n    """\n    if a == 0 or b == 0:\n        return 0\n    return abs(a * b) // gcd(a, b)\n\nprint(lcm(12, 18))',
    testCases: [
      { input: '12, 18', expectedOutput: '36', isHidden: false, description: 'lcm(12, 18)' },
      { input: '5, 7', expectedOutput: '35', isHidden: true, description: 'Coprime' }
    ],
    hints: ['lcm(a, b) = |a × b| / gcd(a, b)', 'Handle zero case'],
    language: 'python'
  },
  {
    id: 'math102-t5-ex03',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Prime Checker',
    difficulty: 1,
    description: 'Check if a number is prime efficiently.',
    starterCode: 'def is_prime(n):\n    """Check if n is prime\n    \n    Args:\n        n: Integer\n    Returns:\n        True if prime\n    """\n    pass\n\nprint(is_prime(17))',
    solution: 'def is_prime(n):\n    """Check if n is prime\n    \n    Args:\n        n: Integer\n    Returns:\n        True if prime\n    """\n    if n < 2:\n        return False\n    if n < 4:\n        return True\n    if n % 2 == 0 or n % 3 == 0:\n        return False\n    i = 5\n    while i * i <= n:\n        if n % i == 0 or n % (i + 2) == 0:\n            return False\n        i += 6\n    return True\n\nprint(is_prime(17))',
    testCases: [
      { input: '17', expectedOutput: 'True', isHidden: false, description: '17 is prime' },
      { input: '1', expectedOutput: 'False', isHidden: true, description: '1 is not prime' }
    ],
    hints: ['Only check up to √n', 'After 2 and 3, primes are 6k±1'],
    language: 'python'
  },
  {
    id: 'math102-t5-ex04',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Sieve of Eratosthenes',
    difficulty: 2,
    description: 'Generate all primes up to n using the Sieve of Eratosthenes.',
    starterCode: 'def sieve(n):\n    """Generate all primes up to n\n    \n    Args:\n        n: Upper limit\n    Returns:\n        List of primes\n    """\n    pass\n\nprint(sieve(30))',
    solution: 'def sieve(n):\n    """Generate all primes up to n\n    \n    Args:\n        n: Upper limit\n    Returns:\n        List of primes\n    """\n    if n < 2:\n        return []\n    \n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    \n    for i in range(2, int(n**0.5) + 1):\n        if is_prime[i]:\n            for j in range(i*i, n + 1, i):\n                is_prime[j] = False\n    \n    return [i for i in range(2, n + 1) if is_prime[i]]\n\nprint(sieve(30))',
    testCases: [
      { input: '30', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]', isHidden: false, description: 'Primes to 30' }
    ],
    hints: ['Start from i² (smaller multiples already crossed)', 'O(n log log n) complexity'],
    language: 'python'
  },
  {
    id: 'math102-t5-ex05',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Modular Exponentiation',
    difficulty: 3,
    description: 'Calculate a^b mod m efficiently using binary exponentiation.',
    starterCode: 'def mod_pow(a, b, m):\n    """Calculate a^b mod m\n    \n    Args:\n        a: Base\n        b: Exponent\n        m: Modulus\n    Returns:\n        a^b mod m\n    """\n    pass\n\nprint(mod_pow(2, 10, 1000))',
    solution: 'def mod_pow(a, b, m):\n    """Calculate a^b mod m\n    \n    Args:\n        a: Base\n        b: Exponent\n        m: Modulus\n    Returns:\n        a^b mod m\n    """\n    result = 1\n    a = a % m\n    while b > 0:\n        if b & 1:\n            result = (result * a) % m\n        b >>= 1\n        a = (a * a) % m\n    return result\n\nprint(mod_pow(2, 10, 1000))',
    testCases: [
      { input: '2, 10, 1000', expectedOutput: '24', isHidden: false, description: '2^10 mod 1000' },
      { input: '3, 100, 1000000007', expectedOutput: '915057324', isHidden: true, description: 'Large exponent' }
    ],
    hints: ['Square and multiply', 'Take mod at each step'],
    language: 'python'
  },
  {
    id: 'math102-t5-ex06',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Modular Inverse',
    difficulty: 3,
    description: 'Find the modular multiplicative inverse of a mod m (when gcd(a,m) = 1).',
    starterCode: 'def mod_inverse(a, m):\n    """Find a^(-1) mod m\n    \n    Args:\n        a: Number\n        m: Modulus\n    Returns:\n        Modular inverse, or None if doesn\'t exist\n    """\n    pass\n\nprint(mod_inverse(3, 7))',
    solution: 'def mod_inverse(a, m):\n    """Find a^(-1) mod m\n    \n    Args:\n        a: Number\n        m: Modulus\n    Returns:\n        Modular inverse, or None if doesn\'t exist\n    """\n    def extended_gcd(a, b):\n        if b == 0:\n            return a, 1, 0\n        g, x, y = extended_gcd(b, a % b)\n        return g, y, x - (a // b) * y\n    \n    g, x, _ = extended_gcd(a % m, m)\n    if g != 1:\n        return None\n    return x % m\n\nprint(mod_inverse(3, 7))',
    testCases: [
      { input: '3, 7', expectedOutput: '5', isHidden: false, description: '3 × 5 ≡ 1 (mod 7)' },
      { input: '2, 4', expectedOutput: 'None', isHidden: true, description: 'gcd ≠ 1' }
    ],
    hints: ['Use extended GCD', 'Inverse exists iff gcd(a,m) = 1'],
    language: 'python'
  },
  {
    id: 'math102-t5-ex07',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Prime Factorization',
    difficulty: 2,
    description: 'Find the prime factorization of an integer.',
    starterCode: 'def prime_factors(n):\n    """Find prime factorization\n    \n    Args:\n        n: Integer > 1\n    Returns:\n        Dictionary {prime: exponent}\n    """\n    pass\n\nprint(prime_factors(360))',
    solution: 'def prime_factors(n):\n    """Find prime factorization\n    \n    Args:\n        n: Integer > 1\n    Returns:\n        Dictionary {prime: exponent}\n    """\n    factors = {}\n    d = 2\n    while d * d <= n:\n        while n % d == 0:\n            factors[d] = factors.get(d, 0) + 1\n            n //= d\n        d += 1\n    if n > 1:\n        factors[n] = 1\n    return factors\n\nprint(prime_factors(360))',
    testCases: [
      { input: '360', expectedOutput: '{2: 3, 3: 2, 5: 1}', isHidden: false, description: '360 = 2³×3²×5' },
      { input: '17', expectedOutput: '{17: 1}', isHidden: true, description: 'Prime' }
    ],
    hints: ['Divide by smallest factor repeatedly', 'Remaining n > 1 is prime'],
    language: 'python'
  },
  {
    id: 'math102-t5-ex08',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Chinese Remainder Theorem',
    difficulty: 5,
    description: 'Solve a system of congruences using the Chinese Remainder Theorem.',
    starterCode: 'def chinese_remainder(remainders, moduli):\n    """Solve x ≡ r_i (mod m_i) for pairwise coprime moduli\n    \n    Args:\n        remainders: List of remainders [r_1, r_2, ...]\n        moduli: List of moduli [m_1, m_2, ...]\n    Returns:\n        x such that x ≡ r_i (mod m_i) for all i\n    """\n    pass\n\nprint(chinese_remainder([2, 3, 2], [3, 5, 7]))',
    solution: 'def chinese_remainder(remainders, moduli):\n    """Solve x ≡ r_i (mod m_i) for pairwise coprime moduli\n    \n    Args:\n        remainders: List of remainders [r_1, r_2, ...]\n        moduli: List of moduli [m_1, m_2, ...]\n    Returns:\n        x such that x ≡ r_i (mod m_i) for all i\n    """\n    def extended_gcd(a, b):\n        if b == 0:\n            return a, 1, 0\n        g, x, y = extended_gcd(b, a % b)\n        return g, y, x - (a // b) * y\n    \n    def mod_inverse(a, m):\n        g, x, _ = extended_gcd(a, m)\n        return x % m\n    \n    M = 1\n    for m in moduli:\n        M *= m\n    \n    x = 0\n    for r, m in zip(remainders, moduli):\n        Mi = M // m\n        yi = mod_inverse(Mi, m)\n        x += r * Mi * yi\n    \n    return x % M\n\nprint(chinese_remainder([2, 3, 2], [3, 5, 7]))',
    testCases: [
      { input: '[2, 3, 2], [3, 5, 7]', expectedOutput: '23', isHidden: false, description: 'x ≡ 2(mod 3), x ≡ 3(mod 5), x ≡ 2(mod 7)' }
    ],
    hints: ['M = product of all moduli', 'For each i: Mi = M/mi, find Mi^(-1) mod mi'],
    language: 'python'
  }
];
