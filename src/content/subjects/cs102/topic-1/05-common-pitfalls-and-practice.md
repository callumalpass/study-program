# Common Pitfalls and Practice

Converting bases is easy to do mechanically, but it’s also easy to make small mistakes. This subtopic helps you avoid the most common ones.

## Pitfall 1: Losing track of direction

When doing repeated division (decimal → base b), you write remainders **top-to-bottom** but read them **bottom-to-top**.

A quick check: if your answer starts with a lot of zeros, you probably read it the wrong way.

## Pitfall 2: Forgetting to pad for grouping

Binary → hex grouping requires 4-bit chunks. If the leftmost group is short, pad with zeros on the left:

`101011₂` → `0010 1011₂` → `2B₁₆`

Padding does not change the value, but it makes grouping valid.

## Pitfall 3: Confusing symbols with values in hex

Remember:
- `A` is not “a letter” here; it is **10**
- `F` is **15**

So `0x10` is not “ten” — it’s **16**.

## Pitfall 4: Dropping the base notation

Always label your answers in work:
- `1010₂` vs `1010₁₀` are very different values.

In code, use prefixes:
- `0b1010` (binary)
- `0xA` (hex)

## Quick practice set

Try these and verify with a calculator after:

1. `111001₂` to decimal
2. `73₁₀` to binary
3. `0x3C` to binary
4. `0b10010110` to hex
5. `0o725` to binary (octal to binary via 3-bit grouping)

## Key takeaways

- Read remainders in the correct direction when dividing.
- Pad with leading zeros when grouping bits.
- Keep bases explicit while practicing to avoid silent errors.

