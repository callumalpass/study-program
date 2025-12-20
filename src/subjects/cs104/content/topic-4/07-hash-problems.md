---
id: cs104-t4-problems
title: "Hash Table Problems"
order: 7
---

# Common Hash Table Problems

Hash table problems are interview favorites because they test understanding of time-space tradeoffs and pattern recognition. This section covers essential problems and techniques.

## Problem 1: First Non-Repeating Character

Find the first character that appears only once:

```python
def first_unique_char(s):
    """Return index of first non-repeating character, -1 if none."""
    counts = {}

    # Count occurrences
    for char in s:
        counts[char] = counts.get(char, 0) + 1

    # Find first with count 1
    for i, char in enumerate(s):
        if counts[char] == 1:
            return i

    return -1

first_unique_char("leetcode")  # 0 ('l')
first_unique_char("loveleetcode")  # 2 ('v')
```

**Time**: O(n), **Space**: O(k) where k is alphabet size

## Problem 2: Valid Anagram

Check if two strings are anagrams:

```python
def is_anagram(s, t):
    """Check if t is an anagram of s."""
    if len(s) != len(t):
        return False

    counts = {}

    for char in s:
        counts[char] = counts.get(char, 0) + 1

    for char in t:
        if char not in counts:
            return False
        counts[char] -= 1
        if counts[char] == 0:
            del counts[char]

    return len(counts) == 0

# Simpler with Counter
from collections import Counter
def is_anagram_simple(s, t):
    return Counter(s) == Counter(t)
```

## Problem 3: Subarray Sum Equals K

Find number of subarrays with sum equal to k:

```python
def subarray_sum(nums, k):
    """Count subarrays summing to k."""
    count = 0
    prefix_sum = 0
    sum_counts = {0: 1}  # prefix_sum -> count of occurrences

    for num in nums:
        prefix_sum += num

        # If prefix_sum - k exists, we found subarrays ending here
        if prefix_sum - k in sum_counts:
            count += sum_counts[prefix_sum - k]

        sum_counts[prefix_sum] = sum_counts.get(prefix_sum, 0) + 1

    return count

subarray_sum([1, 1, 1], 2)  # 2: [1,1] and [1,1]
subarray_sum([1, 2, 3], 3)  # 2: [1,2] and [3]
```

**Key insight**: sum(i,j) = prefix_sum[j] - prefix_sum[i-1]

## Problem 4: Longest Consecutive Sequence

Find length of longest consecutive sequence:

```python
def longest_consecutive(nums):
    """Find longest consecutive sequence in O(n)."""
    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # Only start counting from sequence beginning
        if num - 1 not in num_set:
            current = num
            length = 1

            while current + 1 in num_set:
                current += 1
                length += 1

            max_length = max(max_length, length)

    return max_length

longest_consecutive([100, 4, 200, 1, 3, 2])  # 4: [1,2,3,4]
```

**Key insight**: Only start from numbers that begin a sequence.

## Problem 5: Isomorphic Strings

Check if two strings have the same character pattern:

```python
def is_isomorphic(s, t):
    """Check if s and t have same character mapping pattern."""
    if len(s) != len(t):
        return False

    s_to_t = {}
    t_to_s = {}

    for c1, c2 in zip(s, t):
        if c1 in s_to_t:
            if s_to_t[c1] != c2:
                return False
        else:
            s_to_t[c1] = c2

        if c2 in t_to_s:
            if t_to_s[c2] != c1:
                return False
        else:
            t_to_s[c2] = c1

    return True

is_isomorphic("egg", "add")      # True (e->a, g->d)
is_isomorphic("foo", "bar")      # False
is_isomorphic("paper", "title")  # True
```

## Problem 6: Word Pattern

Check if string follows a pattern:

```python
def word_pattern(pattern, s):
    """Check if words follow the given pattern."""
    words = s.split()

    if len(pattern) != len(words):
        return False

    char_to_word = {}
    word_to_char = {}

    for char, word in zip(pattern, words):
        if char in char_to_word and char_to_word[char] != word:
            return False
        if word in word_to_char and word_to_char[word] != char:
            return False

        char_to_word[char] = word
        word_to_char[word] = char

    return True

word_pattern("abba", "dog cat cat dog")  # True
word_pattern("abba", "dog cat cat fish") # False
```

## Problem 7: Contains Duplicate Within K Distance

Check for duplicate within k indices:

```python
def contains_nearby_duplicate(nums, k):
    """Check if nums[i] == nums[j] with |i - j| <= k."""
    seen = {}

    for i, num in enumerate(nums):
        if num in seen and i - seen[num] <= k:
            return True
        seen[num] = i

    return False

# Alternative using set (sliding window)
def contains_nearby_duplicate_window(nums, k):
    window = set()

    for i, num in enumerate(nums):
        if num in window:
            return True
        window.add(num)
        if len(window) > k:
            window.remove(nums[i - k])

    return False
```

## Problem 8: Find All Duplicates

Find elements appearing exactly twice:

```python
def find_duplicates(nums):
    """Find all elements appearing twice (nums in range [1, n])."""
    counts = {}
    result = []

    for num in nums:
        counts[num] = counts.get(num, 0) + 1
        if counts[num] == 2:
            result.append(num)

    return result

# O(1) space solution using array as hash (if values in [1, n])
def find_duplicates_inplace(nums):
    result = []
    for num in nums:
        index = abs(num) - 1
        if nums[index] < 0:
            result.append(abs(num))
        nums[index] = -nums[index]
    return result
```

## Problem 9: Intersection of Two Arrays

Find common elements:

```python
def intersection(nums1, nums2):
    """Find unique elements in both arrays."""
    return list(set(nums1) & set(nums2))

def intersection_with_duplicates(nums1, nums2):
    """Return elements with count = min(count in nums1, count in nums2)."""
    counts = Counter(nums1)
    result = []

    for num in nums2:
        if counts[num] > 0:
            result.append(num)
            counts[num] -= 1

    return result
```

## Problem 10: 4Sum II

Count tuples (i, j, k, l) where A[i] + B[j] + C[k] + D[l] = 0:

```python
def four_sum_count(A, B, C, D):
    """Count quadruples summing to 0."""
    ab_sums = {}

    # Store all A[i] + B[j] combinations
    for a in A:
        for b in B:
            s = a + b
            ab_sums[s] = ab_sums.get(s, 0) + 1

    count = 0
    # For each C[k] + D[l], check if -(C[k] + D[l]) exists
    for c in C:
        for d in D:
            target = -(c + d)
            if target in ab_sums:
                count += ab_sums[target]

    return count
```

**Time**: O(n²), much better than O(n⁴) brute force

## Problem-Solving Strategy

1. **Identify the pattern**: Counting? Lookup? Grouping?
2. **Choose key and value**: What to store? What to look up?
3. **Consider edge cases**: Empty input, single element, all duplicates
4. **Analyze complexity**: Ensure hash table actually helps (not O(n²))

## Common Techniques

| Technique | Use Case | Example |
|-----------|----------|---------|
| Frequency counting | Find duplicates, majority element | Counter |
| Complement lookup | Two sum, pair finding | `target - num in seen` |
| Prefix sum + hash | Subarray sum problems | Store prefix sums |
| Sliding window + hash | K-distance problems | Fixed-size set |
| Two maps | Isomorphism, bijection | Bidirectional mapping |

## Summary

Hash table problems typically involve counting, lookups, or grouping. Master the patterns: frequency counting, complement lookup, prefix sums, and bidirectional mappings. Always consider what to use as keys and values. These problems appear frequently in interviews because they test understanding of time-space tradeoffs.
