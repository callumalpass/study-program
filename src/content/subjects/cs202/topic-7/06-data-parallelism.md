# Data-Level Parallelism and SIMD

**Data-Level Parallelism (DLP)** applies the same operation to multiple data elements simultaneously. Unlike ILP, which finds parallelism among different operations, DLP exploits parallelism within data. SIMD (Single Instruction, Multiple Data) architectures are the hardware mechanism for exploiting DLP.

## Flynn's Taxonomy

### Classification of Parallelism

```
                    Data Streams
                   Single    Multiple
            ┌──────────────┬──────────────┐
   Single   │    SISD      │    SIMD      │
Instruction │ Traditional  │ Vector/GPU   │
  Streams   │   scalar     │              │
            ├──────────────┼──────────────┤
  Multiple  │    MISD      │    MIMD      │
            │   (rare)     │ Multicore    │
            └──────────────┴──────────────┘

SISD: One operation, one data (scalar CPU)
SIMD: One operation, many data (this topic)
MIMD: Many operations, many data (multicore)
```

## SIMD Concept

### Basic Idea

Apply one operation to a vector of data:

```
Scalar (SISD):
a[0] = b[0] + c[0]
a[1] = b[1] + c[1]
a[2] = b[2] + c[2]
a[3] = b[3] + c[3]
→ 4 instructions, 4 cycles

SIMD:
a[0:3] = b[0:3] + c[0:3]
→ 1 instruction, 1 cycle (4× speedup)
```

### SIMD Hardware

```
Scalar ALU:
┌───────────┐
│   ALU     │
│  32-bit   │
└─────┬─────┘
      │
   1 result

SIMD ALU (128-bit):
┌───────────┬───────────┬───────────┬───────────┐
│  ALU 0    │  ALU 1    │  ALU 2    │  ALU 3    │
│  32-bit   │  32-bit   │  32-bit   │  32-bit   │
└─────┬─────┴─────┬─────┴─────┬─────┴─────┬─────┘
      │           │           │           │
   result 0   result 1   result 2   result 3
             4 results in parallel
```

## x86 SIMD Evolution

### SSE (Streaming SIMD Extensions)

128-bit registers (XMM0-XMM15):

```
XMM register (128 bits):
┌─────────┬─────────┬─────────┬─────────┐
│ float 0 │ float 1 │ float 2 │ float 3 │
│  32-bit │  32-bit │  32-bit │  32-bit │
└─────────┴─────────┴─────────┴─────────┘

or

┌─────────────────────┬─────────────────────┐
│     double 0        │      double 1       │
│      64-bit         │       64-bit        │
└─────────────────────┴─────────────────────┘
```

### AVX (Advanced Vector Extensions)

256-bit registers (YMM0-YMM15):

```
YMM register (256 bits):
┌───────┬───────┬───────┬───────┬───────┬───────┬───────┬───────┐
│float 0│float 1│float 2│float 3│float 4│float 5│float 6│float 7│
└───────┴───────┴───────┴───────┴───────┴───────┴───────┴───────┘

8 single-precision floats per operation
```

### AVX-512

512-bit registers (ZMM0-ZMM31):

```
ZMM register (512 bits):
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ f0  │ f1  │ f2  │ f3  │ f4  │ f5  │ f6  │ f7  │ f8  │ f9  │f10  │f11  │f12  │f13  │f14  │f15  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘

16 single-precision floats per operation!
```

## SIMD Programming

### Intrinsics

C/C++ functions that map to SIMD instructions:

```c
#include <immintrin.h>

void add_arrays_simd(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; i += 8) {
        // Load 8 floats from each array
        __m256 va = _mm256_load_ps(&a[i]);
        __m256 vb = _mm256_load_ps(&b[i]);

        // Add them (8 adds in parallel)
        __m256 vc = _mm256_add_ps(va, vb);

        // Store result
        _mm256_store_ps(&c[i], vc);
    }
}
```

### Auto-Vectorization

Compiler automatically generates SIMD code:

```c
// Simple loop that compiler can vectorize
void add_arrays(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}

// Compile with: gcc -O3 -march=native
// Compiler generates AVX instructions automatically
```

### Vectorization Challenges

Not all code vectorizes:

```c
// Hard to vectorize: loop-carried dependency
for (int i = 1; i < n; i++) {
    a[i] = a[i-1] + b[i];  // Each iteration depends on previous
}

// Hard to vectorize: conditional
for (int i = 0; i < n; i++) {
    if (a[i] > 0) c[i] = a[i] + b[i];
    else c[i] = a[i] - b[i];
}

// Hard to vectorize: indirect access
for (int i = 0; i < n; i++) {
    c[idx[i]] = a[i] + b[i];  // Scattered writes
}
```

## Masking and Predication

### Handling Conditionals

SIMD handles conditionals with masks:

```c
// Scalar code
for (int i = 0; i < n; i++) {
    if (a[i] > 0)
        c[i] = a[i] + b[i];
    else
        c[i] = a[i] - b[i];
}

// SIMD with masking
// 1. Compute both paths
// 2. Blend based on condition
__m256 va = _mm256_load_ps(&a[i]);
__m256 vb = _mm256_load_ps(&b[i]);
__m256 vzero = _mm256_setzero_ps();

__m256 mask = _mm256_cmp_ps(va, vzero, _CMP_GT_OQ);  // a > 0?
__m256 add_result = _mm256_add_ps(va, vb);
__m256 sub_result = _mm256_sub_ps(va, vb);
__m256 vc = _mm256_blendv_ps(sub_result, add_result, mask);
```

### AVX-512 Mask Registers

Dedicated mask registers (k0-k7):

```
__mmask16 mask = _mm512_cmp_ps_mask(va, vzero, _CMP_GT_OQ);
__m512 vc = _mm512_mask_add_ps(sub_result, mask, va, vb);

Only elements where mask=1 get the add result
Others keep sub_result
More efficient than blend
```

## Memory Access Patterns

### Aligned vs. Unaligned

```
Aligned access (preferred):
Address 0x1000: [float][float][float][float]  ← 16-byte aligned
Fast load: _mm_load_ps

Unaligned access (slower):
Address 0x1004: [float][float][float][float]  ← Not aligned
Slower load: _mm_loadu_ps
```

### Gather and Scatter

Non-contiguous access:

```c
// Gather: Load from scattered addresses
float* base;
int indices[8] = {0, 7, 12, 3, 9, 2, 15, 8};

// AVX2 gather
__m256i vidx = _mm256_loadu_si256((__m256i*)indices);
__m256 result = _mm256_i32gather_ps(base, vidx, 4);

// Loads: base[0], base[7], base[12], base[3], ...
```

## ARM NEON

### Alternative SIMD Architecture

ARM's SIMD extension:

```c
#include <arm_neon.h>

void add_arrays_neon(float* a, float* b, float* c, int n) {
    for (int i = 0; i < n; i += 4) {
        float32x4_t va = vld1q_f32(&a[i]);
        float32x4_t vb = vld1q_f32(&b[i]);
        float32x4_t vc = vaddq_f32(va, vb);
        vst1q_f32(&c[i], vc);
    }
}
```

128-bit vectors (like SSE).

### Apple Silicon

Apple's chips have extensive SIMD:

```
M2 chip:
- 128-bit NEON
- AMX (Apple Matrix eXtensions) for ML
- Neural Engine (specialized matrix hardware)
```

## Applications of SIMD

### Image Processing

```c
// Convert RGB to grayscale
// gray = 0.299*R + 0.587*G + 0.114*B

// Process 8 pixels at once with AVX
__m256 vr = _mm256_load_ps(red);
__m256 vg = _mm256_load_ps(green);
__m256 vb = _mm256_load_ps(blue);

__m256 gray = _mm256_add_ps(
    _mm256_add_ps(
        _mm256_mul_ps(vr, _mm256_set1_ps(0.299f)),
        _mm256_mul_ps(vg, _mm256_set1_ps(0.587f))),
    _mm256_mul_ps(vb, _mm256_set1_ps(0.114f)));
```

### Scientific Computing

Matrix operations vectorize well:

```c
// Matrix multiplication inner loop
for (k = 0; k < N; k += 8) {
    __m256 va = _mm256_load_ps(&A[i][k]);
    __m256 vb = _mm256_load_ps(&B[k][j]);
    sum = _mm256_fmadd_ps(va, vb, sum);  // Fused multiply-add
}
```

### Machine Learning

Neural network operations are highly parallel:

```
Convolution, matrix multiply, activation functions
All benefit enormously from SIMD
Modern ML frameworks use SIMD heavily
```

## Key Takeaways

- Data-level parallelism applies one operation to many data elements
- SIMD (Single Instruction, Multiple Data) hardware exploits DLP
- x86 SIMD: SSE (128-bit), AVX (256-bit), AVX-512 (512-bit)
- ARM uses NEON (128-bit) for SIMD
- SIMD provides 4-16× speedup for vectorizable code
- Not all code vectorizes (dependencies, conditionals, irregular access)
- Masking handles conditionals in SIMD
- Gather/scatter handles irregular memory access
- Compilers can auto-vectorize simple loops
- Critical for performance in graphics, ML, and scientific computing

