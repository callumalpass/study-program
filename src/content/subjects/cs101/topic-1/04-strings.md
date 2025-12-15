## Strings (str)

Strings are sequences of characters enclosed in quotes. They're used to represent text in your programs.

```python
single = 'Hello'           # Single quotes
double = "World"           # Double quotes (same as single)
multiline = """This is
a multiline
string"""                  # Triple quotes for multiple lines

print(type(single))  # Output: <class 'str'>
```

### Single vs Double Quotes

Both work identically, but you can use one inside the other:

```python
# Use double quotes when string contains single quotes
message = "It's a beautiful day"

# Use single quotes when string contains double quotes
html = '<div class="container">Content</div>'

# Or escape the quote
escaped = 'It\'s also valid'
escaped2 = "She said \"Hello\""
```

### String Operations

```python
# Concatenation (joining strings)
first = "Hello"
second = "World"
greeting = first + " " + second  # "Hello World"

# Repetition
laugh = "Ha" * 3  # "HaHaHa"

# Length
message = "Hello, World!"
print(len(message))  # 13
```

### Accessing Characters

Strings are **indexed** starting from 0. You can access individual characters or slices:

```python
text = "Python"

# Indexing (single character)
print(text[0])   # 'P' (first character)
print(text[1])   # 'y' (second character)
print(text[-1])  # 'n' (last character)
print(text[-2])  # 'o' (second to last)

# Slicing (substring)
print(text[0:3])  # 'Pyt' (characters 0, 1, 2)
print(text[2:])   # 'thon' (from index 2 to end)
print(text[:3])   # 'Pyt' (from start to index 3)
print(text[::2])  # 'Pto' (every 2nd character)
print(text[::-1]) # 'nohtyP' (reversed)
```

### Strings Are Immutable

You cannot change a string in place - you must create a new one:

```python
name = "Alice"
# name[0] = "B"  # TypeError! Strings are immutable

# Instead, create a new string
name = "B" + name[1:]  # "Blice"
```

---

## Common String Methods

Python strings come with many useful built-in methods:

### Case Methods

```python
text = "Hello World"

print(text.upper())      # "HELLO WORLD"
print(text.lower())      # "hello world"
print(text.title())      # "Hello World"
print(text.capitalize()) # "Hello world"
print(text.swapcase())   # "hELLO wORLD"
```

### Search and Replace

```python
sentence = "The quick brown fox jumps over the lazy dog"

# Finding substrings
print(sentence.find("fox"))      # 16 (index where "fox" starts)
print(sentence.find("cat"))      # -1 (not found)
print(sentence.index("fox"))     # 16 (same, but raises error if not found)
print("fox" in sentence)         # True (membership test)

# Counting occurrences
print(sentence.count("the"))     # 1 (case-sensitive!)
print(sentence.lower().count("the"))  # 2

# Replacing
print(sentence.replace("fox", "cat"))  # "The quick brown cat..."
```

### Trimming Whitespace

```python
messy = "   Hello World   \n"

print(messy.strip())   # "Hello World" (remove from both ends)
print(messy.lstrip())  # "Hello World   \n" (left only)
print(messy.rstrip())  # "   Hello World" (right only)
```

### Splitting and Joining

```python
# Splitting a string into a list
sentence = "apple,banana,cherry"
fruits = sentence.split(",")
print(fruits)  # ['apple', 'banana', 'cherry']

words = "Hello World".split()  # Split on whitespace
print(words)  # ['Hello', 'World']

# Joining a list into a string
items = ['a', 'b', 'c']
print("-".join(items))  # "a-b-c"
print("".join(items))   # "abc"
```

### Checking String Content

```python
# These return True or False
"Hello123".isalnum()    # True (alphanumeric)
"Hello".isalpha()       # True (only letters)
"12345".isdigit()       # True (only digits)
"hello".islower()       # True (all lowercase)
"HELLO".isupper()       # True (all uppercase)
"   ".isspace()         # True (only whitespace)
"Hello World".istitle() # True (title case)
```

---

## String Formatting

### F-Strings (Recommended - Python 3.6+)

```python
name = "Alice"
age = 30

# Basic f-string
message = f"My name is {name} and I am {age} years old."
print(message)  # "My name is Alice and I am 30 years old."

# Expressions inside f-strings
print(f"Next year I'll be {age + 1}")  # "Next year I'll be 31"

# Formatting numbers
price = 19.99
print(f"Total: ${price:.2f}")  # "Total: $19.99"
print(f"Count: {42:05d}")      # "Count: 00042" (zero-padded)

# Alignment
print(f"{'left':<10}")   # "left      "
print(f"{'right':>10}")  # "     right"
print(f"{'center':^10}") # "  center  "
```

### Other Formatting Methods

```python
# .format() method (older but still valid)
template = "Hello, {}! You have {} messages."
print(template.format("Alice", 5))  # "Hello, Alice! You have 5 messages."

# % formatting (oldest, avoid in new code)
print("Hello, %s!" % "World")  # "Hello, World!"
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

# Raw strings (ignore escapes)
path = r"C:\Users\name\docs"  # Useful for file paths
print(path)  # C:\Users\name\docs
```

---

## Key Takeaways

- Strings are enclosed in single, double, or triple quotes
- Strings are **immutable** - you can't change them in place
- Use indexing `[0]` and slicing `[1:4]` to access characters
- F-strings (`f"..."`) are the modern way to format strings
- Common methods: `.upper()`, `.lower()`, `.split()`, `.join()`, `.strip()`
- Use raw strings (`r"..."`) for file paths on Windows
