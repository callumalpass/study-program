# String Searching Algorithms

String searching finds occurrences of a pattern within a text. These algorithms are fundamental to text editors, search engines, and bioinformatics.

## Problem Definition

**Input**: Text T of length n, pattern P of length m

**Output**: All positions where P occurs in T

**Naive approach**: O(nm) - check each position

## Knuth-Morris-Pratt (KMP)

KMP avoids re-examining characters by using information about the pattern structure.

### Failure Function

The **failure function** π[i] gives the length of the longest proper prefix of P[0..i] that is also a suffix.

```
Pattern: "ABABAC"
Index:    0 1 2 3 4 5

π[0] = 0  (no proper prefix)
π[1] = 0  "AB" - no prefix = suffix
π[2] = 1  "ABA" - "A" is prefix and suffix
π[3] = 2  "ABAB" - "AB" is prefix and suffix
π[4] = 3  "ABABA" - "ABA" is prefix and suffix
π[5] = 0  "ABABAC" - no match
```

### Building the Failure Function

```python
def compute_failure(pattern):
    m = len(pattern)
    pi = [0] * m
    k = 0  # Length of current match

    for i in range(1, m):
        while k > 0 and pattern[k] != pattern[i]:
            k = pi[k - 1]  # Fall back

        if pattern[k] == pattern[i]:
            k += 1

        pi[i] = k

    return pi
```

**Time**: O(m)

### KMP Search

```python
def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    if m == 0:
        return []

    pi = compute_failure(pattern)
    matches = []
    j = 0  # Pattern position

    for i in range(n):
        while j > 0 and pattern[j] != text[i]:
            j = pi[j - 1]  # Use failure function

        if pattern[j] == text[i]:
            j += 1

        if j == m:
            matches.append(i - m + 1)
            j = pi[j - 1]  # Look for next match

    return matches
```

**Time**: O(n + m)
**Space**: O(m)

### Why KMP Works

When a mismatch occurs at position j in the pattern, we know:
- `pattern[0..j-1]` matched `text[i-j..i-1]`
- The longest prefix of pattern that's also a suffix of `pattern[0..j-1]` could still match
- Jump to that position without re-examining text characters

## Rabin-Karp Algorithm

Uses hashing for expected O(n + m) time.

### Rolling Hash

Compute hash incrementally as window slides:

```
Text: "ABCDEF"
Window size: 3
Base: 256, Mod: 101

hash("ABC") = (65*256² + 66*256 + 67) mod 101

To get hash("BCD"):
hash("BCD") = (hash("ABC") - 65*256²) * 256 + 68) mod 101
```

### Implementation

```python
def rabin_karp(text, pattern):
    n, m = len(text), len(pattern)
    if m > n:
        return []

    base = 256
    mod = 10**9 + 7
    matches = []

    # Compute base^(m-1) mod q
    h = pow(base, m - 1, mod)

    # Compute initial hashes
    pattern_hash = 0
    text_hash = 0
    for i in range(m):
        pattern_hash = (pattern_hash * base + ord(pattern[i])) % mod
        text_hash = (text_hash * base + ord(text[i])) % mod

    # Slide window
    for i in range(n - m + 1):
        if pattern_hash == text_hash:
            # Verify match (avoid false positives)
            if text[i:i+m] == pattern:
                matches.append(i)

        # Update hash for next window
        if i < n - m:
            text_hash = (text_hash - ord(text[i]) * h) % mod
            text_hash = (text_hash * base + ord(text[i + m])) % mod
            text_hash = (text_hash + mod) % mod  # Ensure positive

    return matches
```

**Expected Time**: O(n + m)
**Worst Case**: O(nm) with many hash collisions
**Advantage**: Easy to extend to multiple patterns

## Boyer-Moore Algorithm

Searches from right to left, enabling larger jumps.

### Bad Character Rule

On mismatch, align the mismatched character in text with its rightmost occurrence in pattern.

```
Text:    "GCTTCTGCTACCTTTTGC"
Pattern: "CCTTTTGC"

Mismatch at 'A' in text, 'T' in pattern
'A' doesn't appear in pattern - shift entire pattern past it
```

### Good Suffix Rule

If a suffix matched, align with the next occurrence of that suffix in the pattern.

```
Text:    "GCTTCTGCTACCTTTTGC"
Pattern: "CCTTTTGC"

If "TGC" matched but mismatch before:
Find next occurrence of "TGC" in pattern and align
```

### Simplified Implementation (Bad Character Only)

```python
def boyer_moore_simple(text, pattern):
    n, m = len(text), len(pattern)
    if m > n:
        return []

    # Build bad character table
    bad_char = {}
    for i, c in enumerate(pattern):
        bad_char[c] = i  # Rightmost occurrence

    matches = []
    i = 0

    while i <= n - m:
        j = m - 1  # Start from right

        while j >= 0 and pattern[j] == text[i + j]:
            j -= 1

        if j < 0:
            matches.append(i)
            i += 1  # Simple shift (could be smarter)
        else:
            # Shift based on bad character
            char = text[i + j]
            if char in bad_char:
                shift = j - bad_char[char]
                i += max(1, shift)
            else:
                i += j + 1  # Character not in pattern

    return matches
```

**Best Case**: O(n/m) - can skip entire pattern length
**Worst Case**: O(nm)
**Average**: Very fast in practice for natural language

## Comparison

| Algorithm | Preprocess | Search | Best For |
|-----------|------------|--------|----------|
| Naive | O(1) | O(nm) | Very short patterns |
| KMP | O(m) | O(n) | Guaranteed linear, streaming |
| Rabin-Karp | O(m) | O(n)* | Multiple patterns |
| Boyer-Moore | O(m + σ) | O(n/m)* | Long patterns, large alphabet |

*Expected time

## Multiple Pattern Search

### Aho-Corasick Algorithm

Searches for multiple patterns simultaneously using an automaton.

**Structure**:
- Trie of all patterns
- Failure links (like KMP failure function)
- Output links for overlapping matches

```python
from collections import deque

class AhoCorasick:
    def __init__(self):
        self.goto = [{}]  # Trie transitions
        self.fail = [0]   # Failure links
        self.output = [[]]  # Pattern outputs

    def add_pattern(self, pattern, index):
        state = 0
        for char in pattern:
            if char not in self.goto[state]:
                self.goto.append({})
                self.fail.append(0)
                self.output.append([])
                self.goto[state][char] = len(self.goto) - 1
            state = self.goto[state][char]
        self.output[state].append(index)

    def build(self):
        queue = deque()

        # Initialize depth-1 states
        for char, state in self.goto[0].items():
            queue.append(state)
            self.fail[state] = 0

        # BFS to compute failure links
        while queue:
            curr = queue.popleft()
            for char, next_state in self.goto[curr].items():
                queue.append(next_state)

                # Follow failure links to find fail[next_state]
                fail = self.fail[curr]
                while fail and char not in self.goto[fail]:
                    fail = self.fail[fail]

                self.fail[next_state] = self.goto[fail].get(char, 0)
                self.output[next_state] += self.output[self.fail[next_state]]

    def search(self, text):
        state = 0
        results = []

        for i, char in enumerate(text):
            while state and char not in self.goto[state]:
                state = self.fail[state]
            state = self.goto[state].get(char, 0)

            for pattern_idx in self.output[state]:
                results.append((i, pattern_idx))

        return results
```

**Time**: O(n + m + z) where m = total pattern length, z = number of matches

## Suffix Arrays and Trees

For repeated searches in the same text.

### Suffix Array

Array of starting positions of all suffixes, sorted lexicographically.

```
Text: "banana$"
Suffixes:
0: banana$
1: anana$
2: nana$
3: ana$
4: na$
5: a$
6: $

Sorted: 6, 5, 3, 1, 0, 4, 2
Suffix Array: [6, 5, 3, 1, 0, 4, 2]
```

**Search**: Binary search in O(m log n)
**Construction**: O(n log n) or O(n) with advanced algorithms

### Applications

- Text indexing for search engines
- Longest repeated substring
- Longest common substring of multiple strings
- Bioinformatics (genome analysis)

## Practical Considerations

### When to Use What

1. **Single search**: Boyer-Moore (fast average case)
2. **Streaming/guaranteed O(n)**: KMP
3. **Multiple patterns**: Aho-Corasick or Rabin-Karp
4. **Repeated searches in same text**: Suffix array/tree
5. **Approximate matching**: Different algorithms (edit distance based)

### Real-World Implementations

Most libraries use hybrid approaches:
- Short patterns: Simple algorithms
- Long patterns: Boyer-Moore variants
- Very long texts: Suffix structures

