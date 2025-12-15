# Conversion Techniques (Decimal ↔ Binary/Hex)

You’ll use conversions constantly in systems work. This subtopic focuses on **repeatable methods** you can trust under exam pressure.

## Binary → Decimal (expand by place value)

Method: multiply each bit by its power of 2 and add.

Example:

`101101₂ = 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 32 + 8 + 4 + 1 = 45₁₀`

Tip: if the binary is long, write the weights above the bits:

```
weights:  32 16  8  4  2  1
bits:      1  0  1  1  0  1
```

## Decimal → Binary (repeated division by 2)

Method:
1. Divide by 2.
2. Record the remainder (0 or 1).
3. Continue with the quotient until it reaches 0.
4. Read remainders bottom-to-top.

Example: convert `45₁₀` to binary:

```
45 / 2 = 22 remainder 1
22 / 2 = 11 remainder 0
11 / 2 =  5 remainder 1
 5 / 2 =  2 remainder 1
 2 / 2 =  1 remainder 0
 1 / 2 =  0 remainder 1
```

Read upward: `101101₂`

## Hex ↔ Decimal (base-16 place value)

Hex → Decimal: expand with powers of 16.

Example: `3A₁₆ = 3×16 + 10 = 58₁₀`

Decimal → Hex: repeated division by 16, remainders mapped to hex digits.

Example: `58₁₀`:

```
58 / 16 = 3 remainder 10 (A)
 3 / 16 = 0 remainder 3
```

So `58₁₀ = 3A₁₆`

## Binary ↔ Hex (grouping bits)

This is the fastest conversion you’ll do in practice.

Binary → Hex:
1. Group bits into chunks of 4 from the right.
2. Convert each chunk to a hex digit.

Example:

`110101011₂` → pad left to multiple of 4:

`0001 1010 1011₂` → `1AB₁₆`

Hex → Binary:
Convert each hex digit to a 4-bit nibble.

`9F₁₆ = 1001 1111₂`

## Key takeaways

- Binary↔Decimal: place value (to decimal), repeated division (to binary).
- Hex↔Decimal: same methods with base 16.
- Binary↔Hex: 4-bit grouping is the “systems programmer” default.

