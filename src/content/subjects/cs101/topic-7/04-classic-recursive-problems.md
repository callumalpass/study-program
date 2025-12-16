## Classic Recursive Problems

Learning recursion is best done through practice. This subtopic presents classic recursive problems that help you internalize the "base case + recursive case" pattern. Each example demonstrates a different way that problems can have self-similar structure.

---

## Factorial: The Simplest Example

Factorial is defined mathematically as:
- 0! = 1
- n! = n × (n-1)!

This recursive definition translates directly to code:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120 = 5 × 4 × 3 × 2 × 1
```

**Base case**: n ≤ 1 returns 1
**Recursive case**: n × factorial(n-1)
**Progress**: n decreases by 1 each call

### Understanding the Pattern

Factorial is computed as:
```
factorial(5) = 5 * factorial(4)
             = 5 * (4 * factorial(3))
             = 5 * (4 * (3 * factorial(2)))
             = 5 * (4 * (3 * (2 * factorial(1))))
             = 5 * (4 * (3 * (2 * 1)))
             = 120
```

The function builds up a chain of multiplications, then evaluates them from the inside out.

---

## Sum of a List

Summing a list can be defined recursively:
- Sum of empty list = 0
- Sum of non-empty list = first element + sum of rest

```python
def sum_list(values):
    if len(values) == 0:
        return 0
    return values[0] + sum_list(values[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15
```

**Base case**: Empty list returns 0
**Recursive case**: First element + sum of remaining elements
**Progress**: List gets shorter by one element each call

### How It Works

```
sum_list([1, 2, 3])
= 1 + sum_list([2, 3])
= 1 + (2 + sum_list([3]))
= 1 + (2 + (3 + sum_list([])))
= 1 + (2 + (3 + 0))
= 6
```

---

## Finding Maximum

To find the maximum in a list:
- Max of single-element list = that element
- Max of longer list = larger of first element and max of rest

```python
def find_max(values):
    if len(values) == 1:
        return values[0]
    rest_max = find_max(values[1:])
    return values[0] if values[0] > rest_max else rest_max

print(find_max([3, 7, 2, 9, 1]))  # 9
```

**Base case**: Single element is the max
**Recursive case**: Compare first with max of rest
**Progress**: List shrinks each call

---

## Reverse a String

Reversing a string recursively:
- Reverse of empty/single char = itself
- Reverse of longer string = last char + reverse of everything except last

```python
def reverse_string(s):
    if len(s) <= 1:
        return s
    return s[-1] + reverse_string(s[:-1])

print(reverse_string("hello"))  # "olleh"
```

**Alternative approach** - move first to end:

```python
def reverse_string_v2(s):
    if len(s) <= 1:
        return s
    return reverse_string_v2(s[1:]) + s[0]

print(reverse_string_v2("hello"))  # "olleh"
```

Both approaches work. The first moves the last character to the front; the second moves the first character to the end.

---

## Power (Exponentiation)

Computing x^n recursively:
- x^0 = 1
- x^n = x × x^(n-1)

```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 10))  # 1024
```

**More efficient version** using the property that x^n = (x^(n/2))^2:

```python
def power_fast(base, exp):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = power_fast(base, exp // 2)
        return half * half
    return base * power_fast(base, exp - 1)

print(power_fast(2, 10))  # 1024 (fewer multiplications)
```

The fast version uses O(log n) multiplications instead of O(n).

---

## Count Occurrences

Count how many times a value appears in a list:

```python
def count(values, target):
    if len(values) == 0:
        return 0
    first_match = 1 if values[0] == target else 0
    return first_match + count(values[1:], target)

print(count([1, 2, 3, 2, 2, 4], 2))  # 3
```

**Base case**: Empty list has 0 occurrences
**Recursive case**: (1 if first matches else 0) + count in rest

---

## Check if Palindrome

A palindrome reads the same forwards and backwards:

```python
def is_palindrome(s):
    # Remove non-letters and lowercase for cleaner checking
    s = ''.join(c.lower() for c in s if c.isalpha())

    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])

print(is_palindrome("racecar"))  # True
print(is_palindrome("A man a plan a canal Panama"))  # True
print(is_palindrome("hello"))  # False
```

**Base cases**:
- Empty or single char is a palindrome (True)
- First and last different is not a palindrome (False)

**Recursive case**: Check the middle after confirming ends match

---

## Flatten a Nested List

Flatten arbitrarily nested lists into a single level:

```python
def flatten(data):
    result = []
    for item in data:
        if isinstance(item, list):
            result.extend(flatten(item))  # Recurse on nested lists
        else:
            result.append(item)
    return result

print(flatten([1, [2, 3, [4, 5]], 6]))  # [1, 2, 3, 4, 5, 6]
print(flatten([[[[1]]], 2, [3, [4]]]))  # [1, 2, 3, 4]
```

This demonstrates recursion on hierarchical data - lists that can contain other lists.

---

## Sum of Digits

Sum the digits of a number:

```python
def digit_sum(n):
    n = abs(n)  # Handle negative numbers
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)

print(digit_sum(12345))  # 15 = 1 + 2 + 3 + 4 + 5
print(digit_sum(-123))   # 6 = 1 + 2 + 3
```

**Base case**: Single digit returns itself
**Recursive case**: Last digit + digit_sum of remaining digits
**Progress**: Number gets smaller each call (integer division by 10)

---

## Greatest Common Divisor (Euclid's Algorithm)

The GCD of two numbers using Euclid's ancient algorithm:

```python
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

print(gcd(48, 18))  # 6
print(gcd(100, 25))  # 25
```

This is one of the oldest algorithms still in use - over 2300 years old!

**Base case**: When b is 0, return a
**Recursive case**: GCD(a, b) = GCD(b, a mod b)
**Progress**: The remainder is always smaller than b

---

## Thinking Recursively

When solving a new problem recursively:

1. **Identify the base case**: What's the simplest input? What should it return?
2. **Identify how to reduce**: How can you make the problem smaller?
3. **Trust the recursion**: Assume the recursive call works correctly
4. **Combine the result**: How do you use the recursive result to solve the original problem?

For example, to count items in a nested structure:
1. Base case: Not a list → return 0 (or 1 if you're counting the item)
2. Reduce: Process each item in the list
3. Trust: `count(item)` correctly counts items in any sublist
4. Combine: Sum up all the counts

---

## Key Takeaways

- **Factorial**: Classic n × (n-1)! pattern
- **Sum/Max/Count**: Process first, recurse on rest, combine
- **String operations**: Work from ends inward or first to end
- **Nested structures**: Base case for non-container, recurse on containers
- **Number problems**: Extract digits with % and //, work toward single digit
- The **leap of faith**: Trust your recursive call works for smaller inputs
- **Practice these patterns** until they become natural

