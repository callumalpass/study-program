---
id: cs102-t1-introduction
title: "Introduction"
order: 1
---

# Introduction to Number Systems

Computers store and manipulate information using **bits** (0s and 1s). Humans often prefer **decimal** (base 10) because we grew up counting on ten fingers, but computer hardware is naturally aligned with **binary** (base 2). To make binary easier to read and work with, we commonly use **hexadecimal** (base 16) and sometimes **octal** (base 8).

This topic builds a practical mental model of number systems so you can:
- Convert between bases accurately.
- Predict how values are represented in memory (a recurring theme in CS102).
- Avoid common mistakes like confusing digit symbols with numeric value.

## Why Computers Use Binary

At the physical level, a computer is built from billions of transistors—tiny electronic switches that can be either ON or OFF. This two-state nature makes binary the natural language of hardware. Rather than trying to distinguish between ten different voltage levels (which would be error-prone), circuits simply detect "high voltage" (1) or "low voltage" (0).

This design choice has profound implications. Every piece of data you work with—numbers, text, images, programs—is ultimately stored as sequences of 1s and 0s. Understanding binary is therefore not just academic; it's the key to understanding how computers actually represent and process information.

Early computers experimented with other bases. Some used base-3 (ternary) or even base-10 circuits. However, binary won out because two-state circuits are:
- **More reliable**: Easier to distinguish between two voltage levels than ten
- **Simpler to build**: Fewer components needed per digit
- **Easier to analyze mathematically**: Boolean algebra maps directly to binary logic

## What Does "Base" Mean?

A **base** (or **radix**) tells you how many distinct digit symbols you have and what each position "weighs." The base determines the fundamental counting cycle before you need to carry to the next position.

- **Base 10** (Decimal) digits: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
- **Base 2** (Binary) digits: `0, 1`
- **Base 8** (Octal) digits: `0, 1, 2, 3, 4, 5, 6, 7`
- **Base 16** (Hexadecimal) digits: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F` where `A=10`, `B=11`, `C=12`, `D=13`, `E=14`, `F=15`

The same digit symbol can represent different values depending on its position. This is called **positional notation**, and it's what makes our number system so powerful. In decimal:

```
507 = 5×10² + 0×10¹ + 7×10⁰
    = 5×100 + 0×10 + 7×1
    = 500 + 0 + 7
    = 507
```

Binary works exactly the same way, but with powers of 2:

```
10110₂ = 1×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰
       = 1×16 + 0×8 + 1×4 + 1×2 + 0×1
       = 16 + 4 + 2
       = 22₁₀
```

Notice how the subscript notation (₂ or ₁₀) indicates the base. This becomes important when writing mixed-base calculations to avoid ambiguity.

## Why CS102 Cares About Number Systems

Number systems are not just conversions for their own sake. They appear throughout computer organization and low-level programming:

**Memory Addresses**: When you debug a program and see an address like `0x7ffeefbff5c0`, that's a hexadecimal representation of a 48-bit memory location. Understanding hex lets you interpret these addresses quickly.

**Bit Masks and Flags**: Operating systems and hardware interfaces often pack multiple boolean flags into a single integer. For example, file permissions might be stored as `0x1FF` (read/write/execute for owner/group/other). Hex makes it easy to see which bits are set.

**Two's Complement Arithmetic**: The way computers represent negative numbers relies on binary patterns. Without understanding binary, signed integer overflow and wraparound behavior seem mysterious. With it, they become predictable.

**IEEE-754 Floating Point**: Floating-point numbers are encoded with specific bit fields for sign, exponent, and mantissa. When debugging precision issues, you need to examine the actual bits.

**Instruction Encoding**: Machine code instructions are just numbers. When you see `0x48 0x89 0xE5` in a hex dump, knowing hex lets you look up what instruction that represents.

**Network Protocols**: IP addresses, MAC addresses, and many protocol headers use hex or binary representations. An IPv4 address like `192.168.1.1` is actually four 8-bit unsigned integers.

If you're comfortable moving between bases, later topics in CS102—data representation, boolean logic, computer architecture, and assembly language—become much easier to understand.

## A Quick Preview: Why Hex is "Binary-Friendly"

One hexadecimal digit encodes exactly **4 bits** (also called a **nibble**). This relationship exists because 16 = 2⁴, so four binary digits produce exactly 16 combinations—perfect for one hex digit.

```
Binary nibble: 0000 0001 0010 0011 0100 0101 0110 0111
Hex digit:        0    1    2    3    4    5    6    7

Binary nibble: 1000 1001 1010 1011 1100 1101 1110 1111
Hex digit:        8    9    A    B    C    D    E    F
```

This means any binary value can be converted to hex by grouping bits into chunks of 4, and vice versa. For example, the binary value:

```
1110 0101 1001 0011₂
```

Can be grouped and read directly as:

```
E    5    9    3₁₆ = E593₁₆
```

This is why hardware documentation, debuggers, memory dumps, and low-level tools almost universally display values in hexadecimal. It's compact (4 times shorter than binary) while preserving the bit structure. You can instantly see that `0xE5` has bits 7, 6, 5, 2, and 0 set without any calculation.

## Historical Context

The use of different bases predates computers. The ancient Babylonians used base 60 (which is why we have 60 seconds in a minute and 360 degrees in a circle). The Mayans used base 20.

In computing, octal (base 8) was popular in the 1960s and 1970s because early computers often had word sizes that were multiples of 3 bits (12-bit, 24-bit, 36-bit machines). With 3 bits mapping to one octal digit, it was convenient for those architectures.

Hexadecimal became dominant with the rise of 8-bit microprocessors and the standardization on byte-oriented architectures. Since 8 bits = 2 hex digits, hex aligns perfectly with modern byte-based systems. Today, octal appears mainly in Unix file permissions (`chmod 755`) and a few legacy contexts.

## Key Takeaways

- A **base** determines the digit symbols available and the positional weights (`base^position`).
- Computers use **binary** because transistors are naturally two-state devices.
- **Hexadecimal** is the preferred human-readable form of binary because one hex digit equals exactly 4 bits.
- Number system fluency is essential for understanding memory layouts, bit operations, data encoding, and low-level debugging.
- **Positional notation** means the same digit has different values depending on where it appears in the number.

