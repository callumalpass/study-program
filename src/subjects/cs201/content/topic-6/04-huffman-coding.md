# Huffman Coding

Huffman coding is perhaps the most elegant application of greedy algorithms, producing provably optimal prefix-free codes for data compression. The algorithm is simple: repeatedly merge the two lowest-frequency symbols until one tree remains. This greedy approach produces codes where frequent symbols get short codewords and rare symbols get longer ones—exactly what minimizes expected encoding length.

The brilliance of Huffman coding lies in its optimality proof. Any optimal code can be transformed into Huffman's code without increasing expected length. The greedy choice—always merging the two lowest-frequency nodes—is always safe because low-frequency symbols should have long codes, and siblings in the code tree have equal-length codes differing only in the last bit. This structural insight makes the greedy strategy provably optimal.

Huffman coding appears throughout computing: JPEG image compression, DEFLATE/GZIP file compression, HTTP/2 header compression. Understanding both the algorithm and its optimality proof demonstrates how theoretical elegance translates to practical impact. The algorithm is fast (O(n log n)), simple to implement, and produces codes that approach the theoretical entropy limit.

## The Problem

**Goal**: Encode characters using variable-length binary codes to minimize total encoded length.

**Constraint**: Codes must be prefix-free (no code is a prefix of another).

## Why Prefix-Free?

Consider encoding: A=0, B=01, C=1

Decoding "01": Is it "AB" or "B"? Ambiguous!

Prefix-free codes enable unambiguous decoding.

## Fixed vs Variable Length

**Fixed-length**: Each character gets same bits (e.g., ASCII uses 8 bits)

For alphabet of size n: need ⌈log₂n⌉ bits per character.

**Variable-length**: Frequent characters get shorter codes.

Example: Morse code gives 'E' (most common) the shortest code.

## Huffman's Greedy Algorithm

### Intuition

Build a binary tree bottom-up:
- Leaves are characters
- Path to leaf defines code (left = 0, right = 1)
- Merge least frequent nodes first

### Algorithm

```python
import heapq

class HuffmanNode:
    def __init__(self, char, freq, left=None, right=None):
        self.char = char
        self.freq = freq
        self.left = left
        self.right = right

    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(frequencies):
    """frequencies = {'a': 5, 'b': 9, ...}"""
    # Create leaf nodes
    heap = [HuffmanNode(char, freq) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    # Merge until one tree remains
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)

        # Internal node with combined frequency
        merged = HuffmanNode(None, left.freq + right.freq, left, right)
        heapq.heappush(heap, merged)

    return heap[0]

def generate_codes(root, prefix="", codes=None):
    if codes is None:
        codes = {}

    if root.char is not None:
        codes[root.char] = prefix if prefix else "0"
    else:
        generate_codes(root.left, prefix + "0", codes)
        generate_codes(root.right, prefix + "1", codes)

    return codes
```

### Example

Frequencies: A=5, B=9, C=12, D=13, E=16, F=45

Building the tree:
1. Merge A(5) + B(9) → 14
2. Merge C(12) + D(13) → 25
3. Merge 14 + E(16) → 30
4. Merge 25 + 30 → 55
5. Merge F(45) + 55 → 100

Resulting codes:
- F: 0 (1 bit)
- C: 100 (3 bits)
- D: 101 (3 bits)
- A: 1100 (4 bits)
- B: 1101 (4 bits)
- E: 111 (3 bits)

### Encoding and Decoding

```python
def encode(text, codes):
    return ''.join(codes[char] for char in text)

def decode(encoded, root):
    result = []
    node = root

    for bit in encoded:
        node = node.left if bit == '0' else node.right

        if node.char is not None:
            result.append(node.char)
            node = root

    return ''.join(result)
```

## Optimality Proof

**Claim**: Huffman coding produces an optimal prefix-free code.

### Proof Sketch

**Lemma 1**: In optimal code, lower frequency → code length ≥ higher frequency.

If not, swapping codes improves expected length. Contradiction.

**Lemma 2**: Two lowest-frequency characters can be siblings at maximum depth.

Optimal tree must have some node at max depth with two children. Make these the two lowest-frequency characters.

**Lemma 3**: Merging two lowest frequencies preserves optimality.

After merge, optimal tree for new frequency set gives optimal tree for original by splitting the merged node.

**Conclusion**: Greedy choice (merge lowest) is always safe.

## Properties

### Code Length Bounds

For character with probability p:
- Expected code length: H(X) ≤ L < H(X) + 1

Where H(X) is entropy: -Σ p_i log₂(p_i)

### Weighted Path Length

Total bits = Σ (frequency × code_length)

Huffman minimizes this exactly.

## Canonical Huffman Codes

Standardized form for easier decoding.

**Rules**:
1. Shorter codes have smaller numeric values
2. Same-length codes are assigned in symbol order

```python
def canonical_codes(frequencies):
    # Build tree and get lengths
    root = build_huffman_tree(frequencies)
    lengths = {char: len(code) for char, code in generate_codes(root).items()}

    # Sort by length, then by character
    sorted_chars = sorted(lengths.keys(), key=lambda c: (lengths[c], c))

    codes = {}
    code = 0
    prev_length = 0

    for char in sorted_chars:
        curr_length = lengths[char]
        code <<= (curr_length - prev_length)
        codes[char] = format(code, f'0{curr_length}b')
        code += 1
        prev_length = curr_length

    return codes
```

**Advantage**: Only need to store code lengths, not the codes themselves.

## Adaptive Huffman Coding

Build tree as data streams, without knowing frequencies upfront.

### Key Ideas

- Start with empty tree
- Add new symbols as they appear
- Update tree after each symbol
- Both encoder and decoder maintain same tree

Used in: GZIP, PKZIP initial passes

## Applications

### File Compression

**DEFLATE** (used in ZIP, GZIP, PNG):
1. LZ77 for repetition detection
2. Huffman coding for output

### Image Compression

**JPEG**:
- DCT coefficients encoded with Huffman
- Predefined tables for speed

### Network Protocols

HTTP/2 uses HPACK:
- Huffman coding for header values
- Static table with precomputed codes

## Comparison with Other Methods

| Method | Type | Optimality | Adaptive |
|--------|------|------------|----------|
| Huffman | Symbol | Optimal | No |
| Adaptive Huffman | Symbol | Near-optimal | Yes |
| Arithmetic Coding | Fractional | Optimal | Yes |
| LZ77/LZ78 | Dictionary | Good | Yes |
| BWT | Transform | With RLE, excellent | No |

**Arithmetic coding** can achieve fractional bits per symbol, getting closer to entropy. But Huffman is simpler and often sufficient.

## Implementation Considerations

### Memory Efficient Decoding

Store tree as array (like heap):
- Parent of i: (i-1)/2
- Children of i: 2i+1, 2i+2

### Parallel Huffman

Multiple symbols can be decoded simultaneously using lookup tables.

### Hardware Implementations

Huffman decoders implemented in:
- GPU texture decompression
- Network packet processing
- Storage controllers

## Limitations

1. **Symbol boundaries**: Works on fixed symbols (characters, bytes)
2. **Small alphabets**: Overhead for tree/code storage
3. **Minimum 1 bit**: Cannot use fractional bits per symbol
4. **Static frequencies**: Standard Huffman needs frequencies upfront

## Summary

| Aspect | Huffman Coding |
|--------|----------------|
| Type | Greedy, prefix-free |
| Optimality | Optimal for symbol codes |
| Time | O(n log n) for n symbols |
| Space | O(n) for tree |
| Used in | JPEG, GZIP, PNG, HTTP/2 |

Huffman coding elegantly demonstrates that greedy algorithms can achieve provably optimal results when the problem structure supports it—making it a cornerstone of data compression.
