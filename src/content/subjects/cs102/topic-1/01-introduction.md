# Introduction to Number Systems

Computers store and manipulate information using **bits** (0s and 1s). Humans often prefer **decimal** (base 10) because we grew up counting on ten fingers, but computer hardware is naturally aligned with **binary** (base 2). To make binary easier to read and work with, we commonly use **hexadecimal** (base 16) and sometimes **octal** (base 8).

This topic builds a practical mental model of number systems so you can:
- Convert between bases accurately.
- Predict how values are represented in memory (a recurring theme in CS102).
- Avoid common mistakes like confusing digit symbols with numeric value.

## What does “base” mean?

A **base** tells you how many distinct digit symbols you have, and what each position “weighs”.

- Base 10 digits: `0..9`
- Base 2 digits: `0..1`
- Base 16 digits: `0..9, A..F` where `A=10`, `B=11`, …, `F=15`

The same digit symbol can represent different values depending on its position. For example, in decimal:

`507 = 5×10^2 + 0×10^1 + 7×10^0`

Binary works the same way, but with powers of 2:

`10110₂ = 1×2^4 + 0×2^3 + 1×2^2 + 1×2^1 + 0×2^0 = 16 + 4 + 2 = 22₁₀`

## Why CS102 cares about number systems

Number systems are not just conversions for their own sake. They show up everywhere:
- **Addresses** are often written in hex (e.g., `0x7ffeefbff5c0`).
- **Bit masks** and **flags** are naturally described in binary/hex.
- **Two’s complement** and **IEEE-754 floating point** build on binary representation.
- **Instruction encoding** in assembly is often represented in hex.

If you’re comfortable moving between bases, later topics (data representation, boolean logic, assembly) become much easier.

## A quick preview: why hex is “binary-friendly”

One hex digit encodes exactly **4 bits**:

```
Binary nibble: 0000 0001 0010 ... 1111
Hex digit:        0    1    2  ...   F
```

So the binary value `1110 0101 1001 0011₂` can be grouped into 4-bit chunks and read as:

`E593₁₆`

This is why hardware docs, debuggers, and low-level tools often display values in hex.

## Key takeaways

- A base determines digit symbols and positional weights (`base^position`).
- Conversions are a tool for understanding memory, bit operations, and low-level behavior.
- Hex is widely used because it maps cleanly to 4-bit groups.

