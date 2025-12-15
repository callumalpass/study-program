# Hex, Octal, and Bit Grouping

Hex and octal are compact ways to write binary. Their power is that they map to fixed-size bit groups:

- **Octal (base 8)**: 1 digit ↔ **3 bits**
- **Hex (base 16)**: 1 digit ↔ **4 bits**

## Octal grouping (3 bits)

Example:

`110 101 001₂ = 651₈`

Why? Each group is a number 0–7:
- `110₂ = 6`
- `101₂ = 5`
- `001₂ = 1`

Octal shows up less in modern systems, but it appears in:
- Historical Unix file permissions (e.g., `chmod 755`)
- Some legacy language literal formats

## Hex grouping (4 bits)

Example:

`1110 0101 1001 0011₂ = E593₁₆`

Memorizing a few common nibble mappings helps:

```
0000=0  0001=1  0010=2  0011=3
0100=4  0101=5  0110=6  0111=7
1000=8  1001=9  1010=A  1011=B
1100=C  1101=D  1110=E  1111=F
```

## Why grouping matters for debugging

Low-level tools often show values in hex because it’s short and aligns with bytes:

- 1 byte = 8 bits = **2 hex digits**
- 2 bytes = 16 bits = **4 hex digits**
- 4 bytes = 32 bits = **8 hex digits**
- 8 bytes = 64 bits = **16 hex digits**

So a 32-bit register value like `0xDEADBEEF` is “exactly 4 bytes”, and you can split it into bytes easily:

`DE AD BE EF`

This becomes important when you discuss **endianness** (byte order) in data representation.

## Key takeaways

- Octal groups bits in 3s; hex groups bits in 4s.
- 1 byte corresponds to exactly 2 hex digits.
- Hex is the standard “human-friendly binary” for systems work.

