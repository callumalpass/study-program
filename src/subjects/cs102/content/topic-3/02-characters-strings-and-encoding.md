---
id: cs102-t3-characters-strings-and-encoding
title: "Characters and Encoding"
order: 2
---

# Characters, Strings, and Text Encoding

At the hardware level, computers only understand numbers—specifically, binary patterns. Text is stored as numbers, with agreed-upon mappings between numeric values and characters. Understanding these encodings is essential for working with files, network protocols, internationalization, and debugging text-related issues.

## The Fundamental Concept: Characters as Numbers

A "character" on a computer is represented by a **code point**—a numeric value that maps to a particular symbol or control function. This code point is then **encoded** into one or more bytes for storage or transmission.

The distinction matters:
- **Code point**: The abstract number assigned to a character (e.g., 65 for 'A')
- **Encoding**: How that number is represented in bytes (e.g., as a single byte 0x41, or as multiple bytes)

## ASCII: The Historical Foundation

**ASCII** (American Standard Code for Information Interchange) is a 7-bit encoding defining 128 characters. Despite its age (standardized in 1963), ASCII remains fundamental—it's the common subset that almost all modern encodings support.

### Key ASCII Values to Know

| Character | Decimal | Hex | Binary |
|-----------|---------|-----|--------|
| `'A'` | 65 | 0x41 | 01000001 |
| `'Z'` | 90 | 0x5A | 01011010 |
| `'a'` | 97 | 0x61 | 01100001 |
| `'z'` | 122 | 0x7A | 01111010 |
| `'0'` | 48 | 0x30 | 00110000 |
| `'9'` | 57 | 0x39 | 00111001 |
| Space `' '` | 32 | 0x20 | 00100000 |
| Newline `'\n'` | 10 | 0x0A | 00001010 |
| Tab `'\t'` | 9 | 0x09 | 00001001 |
| Null `'\0'` | 0 | 0x00 | 00000000 |

### Useful ASCII Patterns

**Case conversion**: Uppercase and lowercase letters differ by exactly 32 (bit 5):
```
'A' = 0x41 = 0100 0001
'a' = 0x61 = 0110 0001
      Difference: bit 5 (value 32)
```

To convert uppercase to lowercase: `c | 0x20`
To convert lowercase to uppercase: `c & ~0x20` (or `c & 0xDF`)
To toggle case: `c ^ 0x20`

**Digit conversion**: Character '0'-'9' to numeric 0-9:
```
'5' - '0' = 53 - 48 = 5
```

These patterns appear constantly in low-level string processing.

### ASCII Control Characters

The first 32 ASCII values (0-31) plus 127 are **control characters**—non-printable codes that originally controlled teletype machines:

| Code | Name | Meaning |
|------|------|---------|
| 0 | NUL | Null (string terminator in C) |
| 7 | BEL | Bell (beep sound) |
| 8 | BS | Backspace |
| 9 | TAB | Horizontal tab |
| 10 | LF | Line feed (Unix newline) |
| 13 | CR | Carriage return (part of Windows newline) |
| 27 | ESC | Escape (terminal control sequences) |

The different newline conventions cause endless cross-platform bugs:
- Unix/Linux/macOS: `LF` only (0x0A)
- Windows: `CR LF` (0x0D 0x0A)
- Classic Mac (pre-OS X): `CR` only (0x0D)

## Unicode: The Modern Standard

ASCII's 128 characters can't represent most of the world's writing systems. **Unicode** is the universal character set designed to include every character from every language, plus symbols, emoji, and more.

### Code Points

Unicode assigns a unique **code point** to each character, written as `U+` followed by hexadecimal digits:

| Character | Code Point | Name |
|-----------|------------|------|
| A | U+0041 | LATIN CAPITAL LETTER A |
| à | U+00E0 | LATIN SMALL LETTER A WITH GRAVE |
| 中 | U+4E2D | CJK UNIFIED IDEOGRAPH-4E2D |
| 😀 | U+1F600 | GRINNING FACE |
| € | U+20AC | EURO SIGN |

Unicode currently defines over 150,000 characters across 161 scripts.

### Unicode is Not an Encoding

A crucial distinction: **Unicode defines what characters exist** (the code points), but not how to store them in bytes. That's the job of encodings like UTF-8, UTF-16, and UTF-32.

## UTF-8: The Dominant Encoding

**UTF-8** is a variable-width encoding that represents Unicode code points using 1 to 4 bytes. It has become the dominant encoding on the web and in modern systems.

### UTF-8 Encoding Rules

| Code Point Range | Bytes | Byte Pattern |
|------------------|-------|--------------|
| U+0000 to U+007F | 1 | 0xxxxxxx |
| U+0080 to U+07FF | 2 | 110xxxxx 10xxxxxx |
| U+0800 to U+FFFF | 3 | 1110xxxx 10xxxxxx 10xxxxxx |
| U+10000 to U+10FFFF | 4 | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx |

**Key properties**:
- ASCII characters (U+0000 to U+007F) use exactly 1 byte, identical to ASCII
- No valid UTF-8 sequence is a prefix of another
- You can detect encoding errors (invalid byte sequences)
- Multi-byte sequences are self-synchronizing (you can find boundaries)

### Example: Encoding "Café"

```
C = U+0043 → 0x43 (1 byte: ASCII range)
a = U+0061 → 0x61 (1 byte: ASCII range)
f = U+0066 → 0x66 (1 byte: ASCII range)
é = U+00E9 → 0xC3 0xA9 (2 bytes)
```

The string "Café" is:
- 4 characters
- 5 bytes in UTF-8: `43 61 66 C3 A9`

### Why UTF-8 Won

UTF-8's design makes it ideal for the modern world:
- **Backward compatible** with ASCII (every ASCII file is valid UTF-8)
- **Efficient for English** text (1 byte per character)
- **Self-synchronizing** (easy to find character boundaries)
- **No byte-order issues** (unlike UTF-16/UTF-32)
- **Widely supported** by programming languages, databases, and protocols

## Other Unicode Encodings

### UTF-16

Uses 2 or 4 bytes per character:
- BMP characters (U+0000 to U+FFFF): 2 bytes
- Characters above U+FFFF: 4 bytes (surrogate pairs)

Used internally by Windows and Java. Has **endianness** issues (UTF-16LE vs UTF-16BE).

### UTF-32

Uses exactly 4 bytes per character. Simple but wasteful—mostly used for internal processing where constant-width is convenient.

### Latin-1 (ISO-8859-1)

8-bit encoding covering Western European languages. The first 256 Unicode code points match Latin-1, making conversion trivial.

## Strings in Memory

How strings are stored varies by language and system:

### C-Style Strings (Null-Terminated)

```c
char str[] = "Hello";
// Stored as: 48 65 6C 6C 6F 00
//            H  e  l  l  o  NUL
```

The null byte (0x00) marks the end. This means:
- String length requires scanning for the terminator: O(n)
- Strings cannot contain null bytes
- Buffer overruns if null is missing or overwritten

### Length-Prefixed Strings

Many modern systems store the length explicitly:

```
[length: 5][H][e][l][l][o]
```

Benefits:
- O(1) length lookup
- Can contain null bytes
- No scanning for terminator

Examples: Pascal strings, Rust's `String`, Go strings.

## Common Pitfalls

### Characters ≠ Bytes

In UTF-8, the string length in **characters** differs from length in **bytes**:

```python
s = "Café"
len(s)           # 4 characters
len(s.encode())  # 5 bytes in UTF-8
```

This affects:
- Buffer allocation
- String slicing (slicing bytes can split a character)
- Database column sizes
- Network protocol message lengths

### Indexing Multi-byte Characters

Random access by character index is O(n) for variable-width encodings like UTF-8, because you must scan from the beginning to find the nth character.

### Mojibake (Encoding Mismatch)

"Mojibake" refers to garbled text from decoding with the wrong encoding:

```
"Café" encoded as UTF-8: C3 A9 (for é)
Decoded as Latin-1: Ã© (two characters)
```

This is why files should declare their encoding and programs should handle encoding explicitly.

### Unicode Normalization

The same visual character can have multiple representations:
- `é` = U+00E9 (precomposed)
- `é` = U+0065 + U+0301 (e + combining accent)

These look identical but compare as different. Normalization (NFC, NFD, etc.) converts to a canonical form.

## Practical Applications

### File I/O

Always specify encoding when reading/writing text files:

```python
# Explicit encoding prevents surprises
with open('file.txt', encoding='utf-8') as f:
    content = f.read()
```

### Network Protocols

HTTP, JSON, and most modern protocols use UTF-8. Headers like `Content-Type: text/html; charset=utf-8` specify the encoding.

### Databases

When creating tables, specify character set (e.g., `utf8mb4` in MySQL for full Unicode support including emoji).

## Key Takeaways

- Text is numbers: characters are **code points**, stored using **encodings**.
- **ASCII** (7-bit, 128 characters) is the foundation; know the key values (A=65, a=97, 0=48).
- **Unicode** defines 150,000+ characters; **UTF-8** is the dominant encoding.
- UTF-8 is **variable-width** (1-4 bytes); character count ≠ byte count.
- C strings are **null-terminated**; modern languages often use **length-prefixed** strings.
- **Encoding mismatches** cause mojibake; always specify encoding explicitly.
- Case conversion, digit conversion, and other operations exploit ASCII's numeric patterns.

