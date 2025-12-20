## Strings (str)

Strings are sequences of characters enclosed in quotes. They're used to represent text in your programs - from simple messages to complex data like JSON, HTML, or user input. Strings are one of the most frequently used data types in Python.

```python
single = 'Hello'           # Single quotes
double = "World"           # Double quotes (same as single)
multiline = """This is
a multiline
string"""                  # Triple quotes for multiple lines

print(type(single))  # Output: <class 'str'>
```

### Single vs Double Quotes

Both work identically, but you can use one inside the other without escaping:

```python
# Use double quotes when string contains single quotes
message = "It's a beautiful day"

# Use single quotes when string contains double quotes
html = '<div class="container">Content</div>'

# Or escape the quote with backslash
escaped = 'It\'s also valid'
escaped2 = "She said \"Hello\""

# Triple quotes can contain both without escaping
complex_text = """He said "It's complicated" """
```

### String Operations

```python
# Concatenation (joining strings)
first = "Hello"
second = "World"
greeting = first + " " + second  # "Hello World"

# Repetition
laugh = "Ha" * 3  # "HaHaHa"
separator = "-" * 20  # "--------------------"

# Length
message = "Hello, World!"
print(len(message))  # 13

# Membership testing
print("World" in message)      # True
print("world" in message)      # False (case-sensitive)
print("xyz" not in message)    # True
```

### Accessing Characters (Indexing and Slicing)

Strings are **indexed** starting from 0. You can access individual characters or slices (substrings):

```python
text = "Python"
#       012345  (positive indices)
#      -6-5-4-3-2-1  (negative indices)

# Indexing (single character)
print(text[0])   # 'P' (first character)
print(text[1])   # 'y' (second character)
print(text[-1])  # 'n' (last character)
print(text[-2])  # 'o' (second to last)

# Slicing syntax: string[start:stop:step]
print(text[0:3])  # 'Pyt' (characters 0, 1, 2 - stop is exclusive)
print(text[2:])   # 'thon' (from index 2 to end)
print(text[:3])   # 'Pyt' (from start to index 3)
print(text[::2])  # 'Pto' (every 2nd character)
print(text[::-1]) # 'nohtyP' (reversed - step of -1)
print(text[1:5:2]) # 'yh' (from 1 to 5, every 2nd)
```

### Strings Are Immutable

You cannot change a string in place - you must create a new one:

```python
name = "Alice"
# name[0] = "B"  # TypeError! Strings are immutable

# Instead, create a new string
name = "B" + name[1:]  # "Blice"

# Or use replace()
name = "Alice"
name = name.replace("A", "B")  # "Blice"
```

This immutability has implications for performance - repeatedly concatenating strings in a loop creates many intermediate strings. Use `join()` instead for building strings from many pieces.

---

## Common String Methods

Python strings come with many useful built-in methods. All string methods return new strings (they don't modify the original).

### Case Methods

```python
text = "Hello World"

print(text.upper())      # "HELLO WORLD"
print(text.lower())      # "hello world"
print(text.title())      # "Hello World" (capitalize each word)
print(text.capitalize()) # "Hello world" (capitalize first letter only)
print(text.swapcase())   # "hELLO wORLD"

# Case-insensitive comparison
user_input = "YES"
if user_input.lower() == "yes":
    print("User agreed")
```

### Search and Replace

```python
sentence = "The quick brown fox jumps over the lazy dog"

# Finding substrings
print(sentence.find("fox"))      # 16 (index where "fox" starts)
print(sentence.find("cat"))      # -1 (not found)
print(sentence.index("fox"))     # 16 (same, but raises ValueError if not found)
print("fox" in sentence)         # True (membership test - preferred for checking)

# Finding from the end
print(sentence.rfind("o"))       # 41 (last occurrence of "o")

# Counting occurrences
print(sentence.count("the"))     # 1 (case-sensitive!)
print(sentence.lower().count("the"))  # 2

# Replacing
print(sentence.replace("fox", "cat"))  # "The quick brown cat..."
print(sentence.replace("o", "0", 2))   # Replace only first 2 occurrences

# Starts/ends with
print(sentence.startswith("The"))  # True
print(sentence.endswith("dog"))    # True
print(sentence.startswith(("The", "A")))  # True (tuple of prefixes)
```

### Trimming Whitespace

```python
messy = "   Hello World   \n"

print(messy.strip())   # "Hello World" (remove from both ends)
print(messy.lstrip())  # "Hello World   \n" (left only)
print(messy.rstrip())  # "   Hello World" (right only)

# Strip specific characters
data = "###Hello###"
print(data.strip("#"))  # "Hello"
```

### Splitting and Joining

```python
# Splitting a string into a list
sentence = "apple,banana,cherry"
fruits = sentence.split(",")
print(fruits)  # ['apple', 'banana', 'cherry']

words = "Hello World".split()  # Split on whitespace (default)
print(words)  # ['Hello', 'World']

# Split with limit
data = "a:b:c:d"
print(data.split(":", 2))  # ['a', 'b', 'c:d'] (split at most 2 times)

# Splitlines for multiline strings
text = "line1\nline2\nline3"
print(text.splitlines())  # ['line1', 'line2', 'line3']

# Joining a list into a string
items = ['a', 'b', 'c']
print("-".join(items))  # "a-b-c"
print("".join(items))   # "abc"
print("\n".join(items)) # "a\nb\nc" (each on new line)
```

### Checking String Content

```python
# These return True or False
"Hello123".isalnum()    # True (alphanumeric only)
"Hello".isalpha()       # True (letters only)
"12345".isdigit()       # True (digits only)
"12345".isnumeric()     # True (numeric characters)
"hello".islower()       # True (all lowercase)
"HELLO".isupper()       # True (all uppercase)
"   ".isspace()         # True (whitespace only)
"Hello World".istitle() # True (title case)

# Practical validation
user_id = "user123"
if user_id.isalnum():
    print("Valid user ID")
```

---

## String Formatting

### F-Strings (Recommended - Python 3.6+)

F-strings are the most readable and efficient way to format strings:

```python
name = "Alice"
age = 30

# Basic f-string
message = f"My name is {name} and I am {age} years old."
print(message)  # "My name is Alice and I am 30 years old."

# Expressions inside f-strings
print(f"Next year I'll be {age + 1}")  # "Next year I'll be 31"
print(f"Name uppercase: {name.upper()}")  # "Name uppercase: ALICE"

# Formatting numbers
price = 19.99
print(f"Total: ${price:.2f}")  # "Total: $19.99" (2 decimal places)
print(f"Count: {42:05d}")      # "Count: 00042" (zero-padded to 5 digits)
print(f"Percent: {0.856:.1%}") # "Percent: 85.6%"

# Alignment and padding
print(f"{'left':<10}")   # "left      " (left-aligned, 10 chars wide)
print(f"{'right':>10}")  # "     right" (right-aligned)
print(f"{'center':^10}") # "  center  " (centered)
print(f"{'pad':*^10}")   # "***pad****" (centered with * padding)

# Debug formatting (Python 3.8+)
x = 42
print(f"{x=}")  # "x=42" (shows variable name and value)
```

### Other Formatting Methods

```python
# .format() method (older but still valid)
template = "Hello, {}! You have {} messages."
print(template.format("Alice", 5))  # "Hello, Alice! You have 5 messages."

# Named placeholders
print("Hello, {name}!".format(name="Bob"))

# % formatting (oldest, avoid in new code)
print("Hello, %s!" % "World")  # "Hello, World!"
print("Value: %d, Float: %.2f" % (42, 3.14159))
```

---

## Escape Characters

Special characters that would otherwise be hard to include:

```python
# Common escape sequences
print("Line1\nLine2")      # Newline
print("Column1\tColumn2")  # Tab
print("She said \"Hi\"")   # Double quote
print('It\'s fine')        # Single quote
print("Back\\slash")       # Backslash

# Raw strings (ignore escapes) - prefix with r
path = r"C:\Users\name\docs"  # Useful for Windows file paths
print(path)  # C:\Users\name\docs

regex = r"\d+\.\d+"  # Useful for regular expressions
```

---

## String Comparison

Strings are compared lexicographically (dictionary order) based on Unicode values:

```python
print("apple" < "banana")  # True (a comes before b)
print("Apple" < "apple")   # True (uppercase letters have lower Unicode values)
print("10" < "9")          # True (string comparison, not numeric!)

# Case-insensitive comparison
s1 = "Hello"
s2 = "hello"
print(s1.lower() == s2.lower())  # True
```

---

## Key Takeaways

- Strings are enclosed in single, double, or triple quotes
- Strings are **immutable** - you can't change them in place
- Use indexing `[0]` and slicing `[1:4]` to access characters
- Negative indices count from the end: `[-1]` is the last character
- F-strings (`f"..."`) are the modern way to format strings
- Common methods: `.upper()`, `.lower()`, `.split()`, `.join()`, `.strip()`, `.replace()`
- Use raw strings (`r"..."`) for file paths and regular expressions
- String methods return new strings - they don't modify the original
