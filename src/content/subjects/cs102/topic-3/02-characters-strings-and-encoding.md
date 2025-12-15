# Characters, Strings, and Text Encoding

Text is stored as numbers. A “character” is represented by a **code point**, which is then encoded into bytes.

## ASCII (historical baseline)

ASCII is a 7-bit encoding with 128 symbols. Common facts:
- `'A'` = 65 (`0x41`)
- `'a'` = 97 (`0x61`)
- space `' '` = 32 (`0x20`)
- newline `'\n'` = 10 (`0x0A`)

Even today, ASCII values appear in protocols, file formats, and debugging output.

## Unicode (modern standard)

Unicode defines a large set of **code points** for characters across languages and symbol systems. Code points are written like:

`U+0041` (which is `'A'`)

Unicode is not itself “bytes”; it’s a mapping from characters to numbers.

## UTF-8 (common encoding)

UTF-8 is a **variable-width** encoding for Unicode code points:
- 1 byte for ASCII-range code points
- up to 4 bytes for larger code points

This design keeps ASCII-compatible text efficient and makes UTF-8 the default on the web and many OSes.

### Example: why variable width matters

The string length in *characters* is not always the same as length in *bytes*.

That affects:
- Memory usage
- Indexing/slicing
- Network protocols and file formats

## Strings in memory (high-level view)

Strings are typically stored as:
- A sequence of bytes (the encoded text)
- Either terminated with a sentinel (like `0x00` in C) or stored with an explicit length (common in many modern systems)

You’ll revisit these ideas when thinking about memory and assembly, because “string operations” are just memory reads/writes under the hood.

## Key takeaways

- Text is numbers: code points and encodings.
- ASCII is a useful subset; UTF-8 is a widely used encoding for Unicode.
- Bytes vs characters matters for memory layout and correct program behavior.

