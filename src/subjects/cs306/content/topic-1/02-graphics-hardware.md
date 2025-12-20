# Graphics Hardware Architecture

Modern computer graphics relies on specialized hardware designed for the massive parallelism required to render millions of pixels and process billions of triangles per second. The Graphics Processing Unit (GPU) has evolved from a simple fixed-function accelerator into a highly programmable massively parallel processor that rivals the CPU in computational power.

## Evolution of Graphics Hardware

Graphics hardware has undergone dramatic transformation since the early days of computing:

### Early Graphics Adapters (1980s)

Early graphics cards were simple framebuffer controllers that stored pixel data and sent it to the display. All rendering was performed by the CPU:

- **MDA/CGA/EGA**: Text and simple graphics modes
- **VGA (1987)**: 640×480 resolution, 256 colors
- **Framebuffer**: Simple memory mapping to screen
- **No hardware acceleration**: CPU drew everything into memory

### 2D Acceleration Era (1990s)

The first specialized graphics chips accelerated 2D operations:

- **BitBLT (Bit Block Transfer)**: Hardware-accelerated copying of rectangular regions
- **Line drawing acceleration**: Bresenham algorithm in hardware
- **Sprite support**: Hardware overlay for fast moving objects
- **GUI acceleration**: Windows, scrolling, fonts

### 3D Acceleration Era (Late 1990s)

Dedicated 3D accelerators emerged to handle the computational load of 3D games:

**3dfx Voodoo (1996)**: First mainstream 3D accelerator
- Rasterization in hardware
- Texture mapping
- Z-buffering (depth testing)
- Required pass-through cable to 2D card

**NVIDIA RIVA 128 (1997)**: First integrated 2D/3D chip

**NVIDIA GeForce 256 (1999)**: Marketed as first "GPU"
- Transform and Lighting (T&L) in hardware
- Hardware geometry processing
- Freed CPU from vertex calculations

### Programmable Shaders (2000s)

GPUs evolved from fixed-function pipelines to programmable processors:

**2001**: NVIDIA GeForce 3 introduced programmable vertex shaders
**2002**: ATI Radeon 9700 added programmable pixel shaders
**2006**: NVIDIA GeForce 8800 unified shader architecture
- Single programmable processor type
- Dynamic allocation between vertex and pixel work
- CUDA general-purpose GPU computing

### Modern Era (2010s-Present)

Current GPUs are massively parallel processors with thousands of cores:

**2018**: NVIDIA Turing introduced RT cores for ray tracing
**2020**: NVIDIA Ampere, AMD RDNA 2 in next-gen consoles
**2022**: NVIDIA Ada Lovelace, up to 76 billion transistors
**Present**: Integration with AI/ML accelerators

## GPU Architecture Fundamentals

Modern GPUs follow a radically different architecture than CPUs, optimized for throughput rather than latency.

### CPU vs. GPU Design Philosophy

```
CPU Architecture:           GPU Architecture:
+------------------+        +------------------+
|   Control  ↑↑↑  |        | Ctrl | Compute   |
|            ↑↑↑  |        +------+-----------+
|   Cache    ↑↑↑  |        | Cache| [C][C][C] |
|   ↑↑↑↑↑    ↑↑↑  |        |      | [C][C][C] |
|   ALU ALU  ↑↑↑  |        |      | [C][C][C] |
|   ALU ALU  ↑↑↑  |        |      | [C][C][C] |
+------------------+        +------+-----------+
                            | [C][C][C][C][C] |
Few powerful cores          | [C][C][C][C][C] |
Large cache                 | ... thousands   |
Complex control logic       +------------------+
Branch prediction           Many simple cores
Out-of-order execution      Small cache per core
                            Simple control
                            SIMD execution
```

**CPU Characteristics**:
- 4-64 complex cores
- Large L1/L2/L3 caches (MB)
- Sophisticated branch prediction
- Out-of-order execution
- Optimized for sequential performance
- 3-5 GHz clock speeds

**GPU Characteristics**:
- Thousands of simple cores
- Small cache per core (KB)
- Minimal branch handling
- In-order execution
- Optimized for parallel throughput
- 1-2 GHz clock speeds
- 10-100× more cores than CPU

### SIMT: Single Instruction Multiple Threads

GPUs execute using **SIMT (Single Instruction Multiple Thread)** architecture:

```
Warp/Wavefront (32-64 threads):

Instruction: ADD R1, R2, R3

Thread 0: R1[0] = R2[0] + R3[0]
Thread 1: R1[1] = R2[1] + R3[1]
Thread 2: R1[2] = R2[2] + R3[2]
...
Thread 31: R1[31] = R2[31] + R3[31]

All executed simultaneously in lockstep
```

**Warps** (NVIDIA) or **Wavefronts** (AMD): Groups of 32-64 threads executing the same instruction
- All threads in warp execute together
- Branch divergence causes serialization
- Maximum efficiency when all threads follow same path

### GPU Core Organization

Modern GPUs organize cores hierarchically:

```
GPU
 ├── Graphics Processing Clusters (GPCs)
 │   ├── Streaming Multiprocessors (SMs) / Compute Units (CUs)
 │   │   ├── Shader Cores (CUDA cores / Stream Processors)
 │   │   ├── Special Function Units (SFUs)
 │   │   ├── Tensor Cores (for AI)
 │   │   ├── RT Cores (for ray tracing)
 │   │   ├── Texture Units
 │   │   ├── Shared Memory / L1 Cache
 │   │   └── Warp Schedulers
 │   ├── Raster Engine
 │   └── ROP (Render Output Unit)
 ├── L2 Cache
 └── Memory Controllers
```

**Example: NVIDIA RTX 4090**:
- 128 Streaming Multiprocessors (SMs)
- 16,384 CUDA cores (128 per SM)
- 512 Tensor cores
- 128 RT cores
- 24 GB GDDR6X VRAM
- 1,008 GB/s memory bandwidth

**Streaming Multiprocessor (SM)** contains:
- 128 CUDA cores (shader processors)
- 4 Tensor cores (AI acceleration)
- 1 RT core (ray tracing)
- Texture units
- Shared memory (128 KB configurable)
- L1 cache
- 4 warp schedulers

## Video Memory (VRAM)

Graphics cards include dedicated high-bandwidth memory:

### Memory Types

**GDDR6/GDDR6X**: Graphics DDR
- 14-21 Gbps per pin
- Wide bus (256-384 bits)
- High bandwidth, higher latency than system RAM
- Most common in current GPUs

**HBM2/HBM3**: High Bandwidth Memory
- Stacked memory dies
- Very wide bus (4096 bits)
- Extreme bandwidth (up to 3 TB/s)
- Lower power, higher cost
- Used in professional/datacenter GPUs

### Memory Hierarchy

```
Register File (per SM)
    ↑ Fastest
    | ~1 cycle
Shared Memory / L1 Cache (per SM)
    | ~20-30 cycles
L2 Cache (shared across GPU)
    | ~200 cycles
VRAM (GDDR6/HBM)
    | ~400-800 cycles
    ↓ Slowest

System RAM (PCIe transfer)
    | ~1000+ cycles
    | Avoid if possible!
```

Effective GPU programming maximizes reuse of data in fast memory:

```cpp
// Bad: Read same data multiple times from global memory
__global__ void inefficient_kernel(float* data) {
    int idx = threadIdx.x;
    float result = data[idx] * data[idx] + data[idx];  // 3 reads
    // ...
}

// Good: Read once, reuse from register
__global__ void efficient_kernel(float* data) {
    int idx = threadIdx.x;
    float value = data[idx];  // 1 read
    float result = value * value + value;  // Reuse from register
    // ...
}

// Better: Use shared memory for data reused across threads
__global__ void shared_memory_kernel(float* data) {
    __shared__ float shared_data[256];
    int idx = threadIdx.x;

    shared_data[idx] = data[idx];  // Coalesced global read
    __syncthreads();  // Wait for all threads

    // Now access from fast shared memory
    float result = shared_data[idx] * shared_data[idx];
    // ...
}
```

### Memory Bandwidth

Memory bandwidth is often the limiting factor in graphics performance:

**Bandwidth Calculation**:
```
Memory Clock: 10 Gbps (GDDR6X)
Bus Width: 384 bits = 48 bytes
Bandwidth = 10 Gbps × 48 bytes = 480 GB/s (per direction)
```

**Example: RTX 4090**:
- 21 Gbps GDDR6X
- 384-bit bus
- 1,008 GB/s theoretical bandwidth

For comparison:
- DDR5 system RAM: ~50-100 GB/s
- PCIe 4.0 x16: ~32 GB/s
- PCIe 5.0 x16: ~64 GB/s

## Specialized Hardware Units

Modern GPUs include fixed-function units for specific tasks:

### Raster Engine

Converts triangles into pixels:
- **Triangle setup**: Calculate edge equations
- **Scan conversion**: Determine which pixels are inside triangle
- **Interpolation**: Compute varying values across triangle
- Highly optimized, runs billions of triangles/second

### Texture Units

Dedicated hardware for texture sampling:
- **Filtering**: Bilinear, trilinear, anisotropic
- **Mipmapping**: Automatic LOD selection
- **Format decompression**: BC, ASTC texture compression
- **Texture cache**: Specialized cache optimized for 2D locality

```cpp
// GLSL shader code - texture sampling in hardware
uniform sampler2D diffuseMap;
in vec2 texCoord;

void main() {
    // Single instruction, hardware handles:
    // - Cache lookup
    // - Mipmap level selection
    // - Bilinear/trilinear filtering
    // - Format decompression
    vec4 color = texture(diffuseMap, texCoord);
    fragColor = color;
}
```

### ROP (Render Output Unit)

Handles final pixel operations:
- **Depth testing**: Z-buffer comparison
- **Stencil testing**: Masking operations
- **Blending**: Alpha compositing
- **Antialiasing**: MSAA sample resolve
- **Framebuffer write**: Write to VRAM

ROPs determine fillrate:
```
Pixel Fillrate = ROP count × Clock speed
RTX 4090: 192 ROPs × 2.52 GHz = ~484 GPixels/s
```

### RT Cores (Ray Tracing)

Dedicated ray-triangle intersection hardware:

```
Ray-Triangle Intersection (Software):
~30-100 instructions
~100+ cycles

RT Core (Hardware):
~1 instruction
~1-2 cycles
~50-100× faster
```

RT cores accelerate:
- **BVH traversal**: Navigate acceleration structure
- **Ray-triangle intersection**: Möller-Trumbore algorithm in hardware
- **Ray-box intersection**: AABB tests

```cpp
// OptiX/DXR ray tracing - RT cores do heavy lifting
Ray ray;
ray.origin = worldPos;
ray.direction = reflectionDir;

// RT core traverses BVH and finds intersections
HitInfo hit = traceRay(scene, ray);

if (hit.found) {
    color = shade(hit);
}
```

### Tensor Cores (AI Acceleration)

Specialized matrix multiplication units:
- **4×4 matrix multiply-accumulate** in single operation
- FP16/BF16/INT8 operations
- 100-300 TFLOPS for AI workloads

Graphics applications:
- **DLSS**: AI upscaling
- **Denoising**: Ray tracing noise reduction
- **Neural rendering**: View synthesis

## Parallel Processing Model

GPU programming exploits massive parallelism:

### Thread Hierarchy

```
Grid
 ├── Block 0,0        Block 0,1        Block 0,2
 │    ├── Warp 0      ├── Warp 0      ├── Warp 0
 │    │    Thread 0   │    Thread 0   │    Thread 0
 │    │    Thread 1   │    Thread 1   │    Thread 1
 │    │    ...        │    ...        │    ...
 │    │    Thread 31  │    Thread 31  │    Thread 31
 │    ├── Warp 1      └── Warp 1      └── Warp 1
 │    └── ...
 ├── Block 1,0        Block 1,1        Block 1,2
 └── ...
```

**Grid**: Collection of all thread blocks
**Block**: Group of threads (up to 1024) sharing shared memory
**Warp**: 32 threads executing in lockstep

### Example: Image Processing

```cpp
// Process 1920×1080 image
__global__ void processImage(unsigned char* image, int width, int height) {
    // Each thread processes one pixel
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = (y * width + x) * 3;  // RGB pixel

        // Apply some effect
        image[idx] = min(255, image[idx] * 1.2f);      // R
        image[idx+1] = min(255, image[idx+1] * 1.2f);  // G
        image[idx+2] = min(255, image[idx+2] * 1.2f);  // B
    }
}

// Launch kernel
dim3 blockSize(16, 16);  // 256 threads per block
dim3 gridSize((width + 15) / 16, (height + 15) / 16);
processImage<<<gridSize, blockSize>>>(imageData, 1920, 1080);

// Result: ~2 million pixels processed in parallel!
```

## Memory Coalescing

Efficient GPU memory access requires **coalesced** reads/writes:

```cpp
// Coalesced: Adjacent threads access adjacent memory
__global__ void coalesced(float* data) {
    int idx = threadIdx.x;
    float value = data[idx];  // Thread 0→data[0], Thread 1→data[1], ...
    // GPU combines into single 128-byte transaction: FAST
}

// Strided: Threads access with stride
__global__ void strided(float* data, int stride) {
    int idx = threadIdx.x * stride;
    float value = data[idx];  // Thread 0→data[0], Thread 1→data[stride], ...
    // Multiple transactions needed: SLOW
}

// Random: Threads access random locations
__global__ void random_access(float* data, int* indices) {
    int idx = threadIdx.x;
    float value = data[indices[idx]];  // Completely random
    // Each thread may need separate transaction: VERY SLOW
}
```

**Performance difference**: Coalesced access can be 10-100× faster than random access.

## Occupancy and Performance

**Occupancy**: Percentage of maximum threads actively running on SM

Higher occupancy → Better latency hiding → Better performance

```
Max threads per SM: 2048 (example)
Threads per block: 256
Registers per thread: 32
Shared memory per block: 16 KB

Maximum blocks per SM limited by:
- Thread count: 2048 / 256 = 8 blocks
- Register file: 65536 regs / (256 * 32) = 8 blocks
- Shared memory: 128 KB / 16 KB = 8 blocks

Occupancy = 8 * 256 / 2048 = 100%
```

Reduce occupancy by:
- Too many registers per thread
- Too much shared memory per block
- Too many threads per block

## Key Takeaways

- GPUs are massively parallel processors with thousands of simple cores
- SIMT architecture executes same instruction across many threads
- Specialized units (RT cores, Tensor cores) accelerate specific operations
- VRAM provides high bandwidth (100s of GB/s) for graphics data
- Memory hierarchy requires careful optimization for performance
- Coalesced memory access is critical for efficiency
- Thread organization (grid/block/warp) determines parallelism
- Occupancy affects ability to hide memory latency
- GPU architecture fundamentally different from CPU: optimize for throughput

Understanding GPU hardware architecture is essential for writing efficient graphics code and understanding performance characteristics of rendering algorithms.
