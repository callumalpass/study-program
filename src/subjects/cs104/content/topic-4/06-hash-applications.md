---
id: cs104-t4-applications
title: "Hash Table Applications"
order: 6
---

# Hash Table Applications

Hash tables are one of the most versatile data structures, appearing in countless real-world applications. Understanding common use cases helps you recognize when to reach for a hash table and how to apply it effectively.

## Counting and Frequency Analysis

One of the most common hash table applications:

```python
def count_frequencies(items):
    """Count occurrences of each item."""
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts

# Example: Word frequency
text = "the quick brown fox jumps over the lazy dog"
word_counts = count_frequencies(text.split())
# {'the': 2, 'quick': 1, 'brown': 1, ...}

# Find most common
from collections import Counter
counter = Counter(text.split())
print(counter.most_common(3))  # [('the', 2), ('quick', 1), ('brown', 1)]
```

### Character Frequency

```python
def are_anagrams(s1, s2):
    """Check if two strings are anagrams."""
    return Counter(s1.replace(" ", "").lower()) == Counter(s2.replace(" ", "").lower())

are_anagrams("listen", "silent")  # True
are_anagrams("hello", "world")    # False
```

## Caching and Memoization

Hash tables enable efficient caching of computed values:

```python
# Manual memoization
def fibonacci_memo():
    cache = {}

    def fib(n):
        if n in cache:
            return cache[n]
        if n <= 1:
            return n
        cache[n] = fib(n-1) + fib(n-2)
        return cache[n]

    return fib

fib = fibonacci_memo()
print(fib(100))  # Instant! Would be impossibly slow without memoization

# Using functools.lru_cache (built-in memoization)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```

## Two Sum Problem

Classic interview question solved elegantly with hash tables:

```python
def two_sum(nums, target):
    """Find indices of two numbers that sum to target."""
    seen = {}  # value -> index

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []

# O(n) time, O(n) space
# vs O(n²) brute force
```

## Grouping and Categorization

Hash tables excel at grouping items:

```python
def group_by_length(words):
    """Group words by their length."""
    groups = {}
    for word in words:
        length = len(word)
        if length not in groups:
            groups[length] = []
        groups[length].append(word)
    return groups

# Using defaultdict
from collections import defaultdict

def group_anagrams(words):
    """Group words that are anagrams of each other."""
    groups = defaultdict(list)
    for word in words:
        key = tuple(sorted(word))  # Canonical form
        groups[key].append(word)
    return list(groups.values())

group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
# [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

## Deduplication

Remove duplicates while preserving some order:

```python
def remove_duplicates_preserve_order(items):
    """Remove duplicates, keep first occurrence."""
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Python 3.7+ dict preserves insertion order
def remove_duplicates(items):
    return list(dict.fromkeys(items))
```

## Implementing Other Data Structures

### Set Implementation

```python
class HashSet:
    def __init__(self):
        self._dict = {}

    def add(self, item):
        self._dict[item] = True

    def remove(self, item):
        del self._dict[item]

    def __contains__(self, item):
        return item in self._dict
```

### Graph Adjacency List

```python
class Graph:
    def __init__(self):
        self.adj = defaultdict(list)

    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.adj[v].append(u)  # For undirected

    def neighbors(self, node):
        return self.adj[node]
```

## Database Indexing (Conceptual)

Hash indexes enable O(1) lookups:

```python
class SimpleIndex:
    """Conceptual hash index for a database table."""
    def __init__(self):
        self.index = {}  # key -> list of row_ids

    def add(self, key, row_id):
        if key not in self.index:
            self.index[key] = []
        self.index[key].append(row_id)

    def lookup(self, key):
        return self.index.get(key, [])

# Usage
email_index = SimpleIndex()
email_index.add("alice@example.com", 1)
email_index.add("bob@example.com", 2)
rows = email_index.lookup("alice@example.com")  # [1]
```

## LRU Cache

Least Recently Used cache combines hash table with doubly linked list:

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest
```

## Substring Problems

Hash tables help with substring matching:

```python
def longest_substring_without_repeat(s):
    """Find length of longest substring without repeating characters."""
    char_index = {}
    max_length = 0
    start = 0

    for i, char in enumerate(s):
        if char in char_index and char_index[char] >= start:
            start = char_index[char] + 1
        char_index[char] = i
        max_length = max(max_length, i - start + 1)

    return max_length

longest_substring_without_repeat("abcabcbb")  # 3 ("abc")
```

## Pattern Matching with Rabin-Karp

Hash-based string matching:

```python
def rabin_karp(text, pattern):
    """Find all occurrences of pattern in text using rolling hash."""
    n, m = len(text), len(pattern)
    if m > n:
        return []

    base = 256
    mod = 10**9 + 7

    def compute_hash(s):
        h = 0
        for c in s:
            h = (h * base + ord(c)) % mod
        return h

    pattern_hash = compute_hash(pattern)
    text_hash = compute_hash(text[:m])

    results = []
    power = pow(base, m-1, mod)

    for i in range(n - m + 1):
        if text_hash == pattern_hash and text[i:i+m] == pattern:
            results.append(i)

        if i < n - m:
            # Roll the hash
            text_hash = ((text_hash - ord(text[i]) * power) * base + ord(text[i+m])) % mod

    return results
```

## Summary

Hash tables power many essential algorithms: counting frequencies, caching computed values, solving two-sum-style problems, grouping items, removing duplicates, implementing sets and graphs, database indexing, LRU caches, and string matching. Recognizing these patterns helps you apply hash tables effectively to new problems.
