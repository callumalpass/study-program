# Graphics APIs

Graphics Application Programming Interfaces (APIs) provide the software interface between your application and the GPU hardware. They abstract hardware details while exposing powerful capabilities for rendering, allowing developers to create graphics applications without writing hardware-specific code. The major modern graphics APIs—OpenGL, DirectX, Vulkan, and Metal—each have distinct philosophies, strengths, and ecosystems.

## Why Graphics APIs?

Without graphics APIs, each application would need to communicate directly with GPU hardware using vendor-specific drivers. This would be impractical:

**Hardware Abstraction**: Support NVIDIA, AMD, Intel, and other GPUs with single codebase
**Portability**: Run on different operating systems
**Standardization**: Common vocabulary and concepts across platforms
**Driver Optimization**: Vendors optimize drivers for API compliance

```
Application
    ↓
Graphics API (OpenGL/DirectX/Vulkan/Metal)
    ↓
Graphics Driver (NVIDIA/AMD/Intel specific)
    ↓
GPU Hardware
```

The API provides a **contract** between application and driver: if you follow API rules, the driver guarantees correct rendering across different hardware.

## OpenGL: The Industry Standard

**OpenGL (Open Graphics Library)** is a cross-platform API developed by Silicon Graphics Inc. (SGI) and maintained by the Khronos Group since 2006.

### History and Evolution

**1992**: OpenGL 1.0 released
- Fixed-function pipeline
- Immediate mode rendering

**2004**: OpenGL 2.0 introduced **shaders** (GLSL)
- Programmable vertex and fragment processing
- Revolutionary for custom effects

**2008**: OpenGL 3.0 began deprecation of legacy features
**2010**: OpenGL 4.0 added tessellation shaders
**2017**: OpenGL 4.6 (current version)

### OpenGL Architecture

OpenGL is a **state machine**. You set state, then issue draw calls that use that state:

```cpp
// OpenGL rendering example
#include <GL/glew.h>
#include <GLFW/glfw3.h>

void render() {
    // Set state: shader program
    glUseProgram(shaderProgram);

    // Set state: textures
    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, diffuseTexture);

    // Set state: uniforms
    glUniformMatrix4fv(mvpLocation, 1, GL_FALSE, glm::value_ptr(mvpMatrix));

    // Set state: vertex array
    glBindVertexArray(vao);

    // Draw using current state
    glDrawElements(GL_TRIANGLES, indexCount, GL_UNSIGNED_INT, 0);

    // State persists until changed
}
```

### OpenGL Workflow

**1. Create Context**:
```cpp
// Using GLFW
glfwInit();
glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 6);
glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

GLFWwindow* window = glfwCreateWindow(1920, 1080, "OpenGL", NULL, NULL);
glfwMakeContextCurrent(window);

// Initialize GLEW (extension loader)
glewInit();
```

**2. Create Resources**:
```cpp
// Vertex Buffer Object (VBO)
GLuint vbo;
glGenBuffers(1, &vbo);
glBindBuffer(GL_ARRAY_BUFFER, vbo);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

// Vertex Array Object (VAO) - describes vertex layout
GLuint vao;
glGenVertexArrays(1, &vao);
glBindVertexArray(vao);

// Position attribute
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*)0);
glEnableVertexAttribArray(0);

// Normal attribute
glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*)offsetof(Vertex, normal));
glEnableVertexAttribArray(1);
```

**3. Compile Shaders**:
```cpp
// Vertex shader
GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
glShaderSource(vertexShader, 1, &vertexSource, NULL);
glCompileShader(vertexShader);

// Fragment shader
GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
glShaderSource(fragmentShader, 1, &fragmentSource, NULL);
glCompileShader(fragmentShader);

// Link program
GLuint program = glCreateProgram();
glAttachShader(program, vertexShader);
glAttachShader(program, fragmentShader);
glLinkProgram(program);
```

**4. Render Loop**:
```cpp
while (!glfwWindowShouldClose(window)) {
    // Clear framebuffer
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // Render objects
    render();

    // Swap buffers and poll events
    glfwSwapBuffers(window);
    glfwPollEvents();
}
```

### OpenGL Strengths

**Cross-Platform**: Windows, Linux, macOS, mobile (OpenGL ES), web (WebGL)
**Mature Ecosystem**: Extensive documentation, tutorials, libraries
**Easier Learning Curve**: Higher-level abstraction than Vulkan
**Wide Hardware Support**: Runs on nearly all GPUs

### OpenGL Weaknesses

**Driver Overhead**: State tracking and validation cost CPU time
**Less Control**: Limited explicit memory management
**Multi-Threading**: Difficult to use contexts across threads
**Legacy Baggage**: Deprecated features still in specification
**Performance Ceiling**: Lower than modern explicit APIs

### GLSL (OpenGL Shading Language)

OpenGL uses **GLSL** for shader programming:

```glsl
// Vertex Shader
#version 460 core

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

out vec3 vNormal;
out vec2 vTexCoord;

void main() {
    gl_Position = uProjection * uView * uModel * vec4(aPos, 1.0);
    vNormal = mat3(transpose(inverse(uModel))) * aNormal;
    vTexCoord = aTexCoord;
}

// Fragment Shader
#version 460 core

in vec3 vNormal;
in vec2 vTexCoord;

uniform sampler2D uTexture;

out vec4 FragColor;

void main() {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float diff = max(dot(normalize(vNormal), lightDir), 0.0);

    vec4 texColor = texture(uTexture, vTexCoord);
    FragColor = vec4(texColor.rgb * diff, texColor.a);
}
```

## DirectX: The Windows Standard

**DirectX** is Microsoft's collection of APIs for multimedia and games on Windows and Xbox. **Direct3D** is the 3D graphics component.

### DirectX Evolution

**1995**: DirectX 1.0 released for Windows 95
**2002**: DirectX 9 introduced shader model 2.0 (programmable shaders)
**2006**: DirectX 10 (Vista+) unified shader architecture
**2009**: DirectX 11 added compute shaders, tessellation
**2015**: DirectX 12 low-level explicit API
**2020**: DirectX 12 Ultimate (DXR ray tracing, mesh shaders)

### DirectX 11 vs DirectX 12

**DirectX 11**: High-level, similar philosophy to OpenGL
- Driver handles memory, synchronization
- Easier to use
- More CPU overhead

**DirectX 12**: Low-level, explicit control
- Application manages memory, synchronization
- More complex
- Minimal driver overhead
- Better multi-threading

### DirectX 11 Example

```cpp
#include <d3d11.h>
#include <d3dcompiler.h>

// Create device and swap chain
D3D_FEATURE_LEVEL featureLevel = D3D_FEATURE_LEVEL_11_0;
ID3D11Device* device;
ID3D11DeviceContext* context;
IDXGISwapChain* swapChain;

D3D11CreateDeviceAndSwapChain(
    nullptr, D3D_DRIVER_TYPE_HARDWARE, nullptr,
    0, &featureLevel, 1, D3D11_SDK_VERSION,
    &swapChainDesc, &swapChain, &device, nullptr, &context);

// Create vertex buffer
D3D11_BUFFER_DESC bufferDesc = {};
bufferDesc.Usage = D3D11_USAGE_DEFAULT;
bufferDesc.ByteWidth = sizeof(vertices);
bufferDesc.BindFlags = D3D11_BIND_VERTEX_BUFFER;

ID3D11Buffer* vertexBuffer;
device->CreateBuffer(&bufferDesc, &initData, &vertexBuffer);

// Render
UINT stride = sizeof(Vertex);
UINT offset = 0;
context->IASetVertexBuffers(0, 1, &vertexBuffer, &stride, &offset);
context->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
context->Draw(vertexCount, 0);
```

### HLSL (High-Level Shading Language)

DirectX uses **HLSL** for shaders:

```hlsl
// Vertex Shader
cbuffer Constants : register(b0) {
    float4x4 worldViewProj;
};

struct VSInput {
    float3 position : POSITION;
    float3 normal : NORMAL;
    float2 texCoord : TEXCOORD;
};

struct VSOutput {
    float4 position : SV_POSITION;
    float3 normal : NORMAL;
    float2 texCoord : TEXCOORD;
};

VSOutput VSMain(VSInput input) {
    VSOutput output;
    output.position = mul(float4(input.position, 1.0), worldViewProj);
    output.normal = input.normal;
    output.texCoord = input.texCoord;
    return output;
}

// Pixel Shader (Fragment Shader)
Texture2D diffuseTexture : register(t0);
SamplerState samplerState : register(s0);

float4 PSMain(VSOutput input) : SV_TARGET {
    float4 texColor = diffuseTexture.Sample(samplerState, input.texCoord);
    float3 lightDir = normalize(float3(1, 1, 1));
    float diff = max(dot(normalize(input.normal), lightDir), 0.0);
    return float4(texColor.rgb * diff, texColor.a);
}
```

### DirectX Strengths

**Windows/Xbox Ecosystem**: First-class support on Microsoft platforms
**Excellent Tooling**: PIX debugger, Visual Studio integration
**Modern Features**: DirectX 12 cutting-edge (mesh shaders, ray tracing)
**Performance**: DirectX 12 offers low overhead

### DirectX Weaknesses

**Platform Locked**: Windows and Xbox only
**DirectX 12 Complexity**: Very difficult to use correctly
**Learning Curve**: Steeper than OpenGL for advanced features

## Vulkan: Modern Explicit API

**Vulkan** is a modern, cross-platform, low-level API developed by Khronos Group (same group as OpenGL). Released in 2016, it provides explicit control over GPU operations.

### Vulkan Philosophy

Vulkan puts **control in the developer's hands**:

- **Explicit Memory Management**: Application allocates and manages GPU memory
- **Explicit Synchronization**: Application handles all synchronization primitives
- **Multi-Threading Friendly**: Designed for parallel command generation
- **Minimal Driver Overhead**: Thin driver, more CPU overhead moved to application
- **Predictable Performance**: Less "magic" in driver

### Vulkan Complexity

Vulkan is **significantly more verbose** than OpenGL:

**Drawing a triangle in OpenGL**: ~200-300 lines
**Drawing a triangle in Vulkan**: ~1000-2000 lines

This complexity buys performance and control but requires deeper understanding.

### Vulkan Architecture

```cpp
#include <vulkan/vulkan.h>

// 1. Create Instance (application-level state)
VkInstance instance;
vkCreateInstance(&createInfo, nullptr, &instance);

// 2. Pick Physical Device (GPU)
VkPhysicalDevice physicalDevice;
// Enumerate and select...

// 3. Create Logical Device
VkDevice device;
vkCreateDevice(physicalDevice, &deviceCreateInfo, nullptr, &device);

// 4. Create Command Pool (allocates command buffers)
VkCommandPool commandPool;
vkCreateCommandPool(device, &poolInfo, nullptr, &commandPool);

// 5. Allocate Command Buffer
VkCommandBuffer commandBuffer;
vkAllocateCommandBuffers(device, &allocInfo, &commandBuffer);

// 6. Record Commands
vkBeginCommandBuffer(commandBuffer, &beginInfo);
vkCmdBeginRenderPass(commandBuffer, &renderPassInfo, VK_SUBPASS_CONTENTS_INLINE);
vkCmdBindPipeline(commandBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline);
vkCmdBindVertexBuffers(commandBuffer, 0, 1, &vertexBuffer, offsets);
vkCmdDraw(commandBuffer, vertexCount, 1, 0, 0);
vkCmdEndRenderPass(commandBuffer);
vkEndCommandBuffer(commandBuffer);

// 7. Submit to Queue
VkSubmitInfo submitInfo = {};
submitInfo.commandBufferCount = 1;
submitInfo.pCommandBuffers = &commandBuffer;
vkQueueSubmit(graphicsQueue, 1, &submitInfo, fence);

// 8. Wait for Completion
vkWaitForFences(device, 1, &fence, VK_TRUE, UINT64_MAX);
```

### Vulkan Memory Management

Unlike OpenGL/DX11, Vulkan requires **explicit allocation**:

```cpp
// 1. Query memory requirements
VkMemoryRequirements memReqs;
vkGetBufferMemoryRequirements(device, buffer, &memReqs);

// 2. Find suitable memory type
uint32_t memoryTypeIndex = findMemoryType(
    memReqs.memoryTypeBits,
    VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT | VK_MEMORY_PROPERTY_HOST_COHERENT_BIT
);

// 3. Allocate memory
VkDeviceMemory bufferMemory;
VkMemoryAllocateInfo allocInfo = {};
allocInfo.allocationSize = memReqs.size;
allocInfo.memoryTypeIndex = memoryTypeIndex;
vkAllocateMemory(device, &allocInfo, nullptr, &bufferMemory);

// 4. Bind buffer to memory
vkBindBufferMemory(device, buffer, bufferMemory, 0);

// 5. Map and copy data
void* data;
vkMapMemory(device, bufferMemory, 0, size, 0, &data);
memcpy(data, vertices, size);
vkUnmapMemory(device, bufferMemory);
```

### Vulkan Synchronization

Explicit synchronization using **semaphores** and **fences**:

```cpp
// Semaphores: GPU-GPU synchronization
VkSemaphore imageAvailableSemaphore;
VkSemaphore renderFinishedSemaphore;

// Fences: GPU-CPU synchronization
VkFence inFlightFence;

// Render frame
vkAcquireNextImageKHR(device, swapChain, UINT64_MAX,
                       imageAvailableSemaphore, VK_NULL_HANDLE, &imageIndex);

VkSubmitInfo submitInfo = {};
submitInfo.waitSemaphoreCount = 1;
submitInfo.pWaitSemaphores = &imageAvailableSemaphore;
submitInfo.signalSemaphoreCount = 1;
submitInfo.pSignalSemaphores = &renderFinishedSemaphore;

vkQueueSubmit(graphicsQueue, 1, &submitInfo, inFlightFence);

VkPresentInfoKHR presentInfo = {};
presentInfo.waitSemaphoreCount = 1;
presentInfo.pWaitSemaphores = &renderFinishedSemaphore;
vkQueuePresentKHR(presentQueue, &presentInfo);

vkWaitForFences(device, 1, &inFlightFence, VK_TRUE, UINT64_MAX);
```

### SPIR-V Shaders

Vulkan uses **SPIR-V** (Standard Portable Intermediate Representation) bytecode:

```glsl
// Write in GLSL
#version 450

layout(location = 0) in vec3 inPosition;
layout(location = 0) out vec4 fragColor;

void main() {
    gl_Position = vec4(inPosition, 1.0);
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

```bash
# Compile to SPIR-V using glslc (part of Vulkan SDK)
glslc shader.vert -o vert.spv
glslc shader.frag -o frag.spv
```

```cpp
// Load SPIR-V binary
std::vector<char> vertCode = readFile("vert.spv");
VkShaderModule vertShaderModule = createShaderModule(vertCode);
```

### Vulkan Strengths

**Maximum Performance**: Minimal driver overhead, explicit control
**Multi-Threading**: Excellent multi-core utilization
**Cross-Platform**: Windows, Linux, Android, macOS (via MoltenVK)
**Predictable**: Less driver "magic", more control
**Modern Design**: Clean slate, no legacy baggage

### Vulkan Weaknesses

**Complexity**: Steep learning curve, verbose code
**Development Time**: Much longer to implement features
**Debugging Difficulty**: More can go wrong, harder to debug
**Validation Overhead**: Debug layers can be slow

## Metal: Apple's Graphics API

**Metal** is Apple's low-level graphics API for iOS, macOS, tvOS, and iPadOS. Introduced in 2014, it predates Vulkan and influenced its design.

### Metal Overview

Metal is **exclusive to Apple platforms** but offers excellent performance and integration:

**Low Overhead**: Similar philosophy to Vulkan/DX12
**Unified Memory**: CPU and GPU share memory on Apple Silicon
**Modern Features**: Ray tracing, mesh shaders (on supported hardware)
**Xcode Integration**: Excellent profiling and debugging tools

### Metal Example

```objc
#import <Metal/Metal.h>
#import <MetalKit/MetalKit.h>

// Create device
id<MTLDevice> device = MTLCreateSystemDefaultDevice();

// Create command queue
id<MTLCommandQueue> commandQueue = [device newCommandQueue];

// Load shader library
id<MTLLibrary> library = [device newDefaultLibrary];
id<MTLFunction> vertexFunction = [library newFunctionWithName:@"vertexShader"];
id<MTLFunction> fragmentFunction = [library newFunctionWithName:@"fragmentShader"];

// Create render pipeline
MTLRenderPipelineDescriptor *pipelineDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
pipelineDescriptor.vertexFunction = vertexFunction;
pipelineDescriptor.fragmentFunction = fragmentFunction;
pipelineDescriptor.colorAttachments[0].pixelFormat = MTLPixelFormatBGRA8Unorm;

id<MTLRenderPipelineState> pipelineState =
    [device newRenderPipelineStateWithDescriptor:pipelineDescriptor error:nil];

// Render
id<MTLCommandBuffer> commandBuffer = [commandQueue commandBuffer];
id<MTLRenderCommandEncoder> renderEncoder =
    [commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];

[renderEncoder setRenderPipelineState:pipelineState];
[renderEncoder setVertexBuffer:vertexBuffer offset:0 atIndex:0];
[renderEncoder drawPrimitives:MTLPrimitiveTypeTriangle vertexStart:0 vertexCount:3];
[renderEncoder endEncoding];

[commandBuffer presentDrawable:drawable];
[commandBuffer commit];
```

### Metal Shading Language (MSL)

Metal uses **MSL**, based on C++:

```cpp
#include <metal_stdlib>
using namespace metal;

struct VertexIn {
    float3 position [[attribute(0)]];
    float3 normal [[attribute(1)]];
};

struct VertexOut {
    float4 position [[position]];
    float3 normal;
};

vertex VertexOut vertexShader(VertexIn in [[stage_in]],
                               constant float4x4& mvpMatrix [[buffer(1)]]) {
    VertexOut out;
    out.position = mvpMatrix * float4(in.position, 1.0);
    out.normal = in.normal;
    return out;
}

fragment float4 fragmentShader(VertexOut in [[stage_in]]) {
    float3 lightDir = normalize(float3(1.0, 1.0, 1.0));
    float diff = max(dot(normalize(in.normal), lightDir), 0.0);
    return float4(float3(diff), 1.0);
}
```

### Metal Strengths

**Apple Integration**: Best performance on iOS/macOS
**Unified Memory**: Efficient on Apple Silicon
**Modern Design**: Clean, low-overhead API
**Excellent Tools**: Xcode GPU debugger and profiler

### Metal Weaknesses

**Platform Lock-In**: Apple platforms only
**Smaller Ecosystem**: Fewer third-party resources than OpenGL/DirectX
**Learning Resources**: Less documentation than other APIs

## WebGPU: The Web Standard

**WebGPU** is an emerging web standard for GPU access in browsers, designed by the W3C GPU for the Web Community Group.

**Modern Design**: Based on Vulkan/Metal/DX12 concepts
**Cross-Browser**: Chrome, Firefox, Safari support
**Safety**: Sandboxed, security-focused
**Performance**: Much faster than WebGL

```javascript
// WebGPU example (JavaScript)
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const pipeline = device.createRenderPipeline({
    vertex: {
        module: device.createShaderModule({ code: vertexShaderCode }),
        entryPoint: 'main'
    },
    fragment: {
        module: device.createShaderModule({ code: fragmentShaderCode }),
        entryPoint: 'main',
        targets: [{ format: 'bgra8unorm' }]
    }
});

// Render
const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
passEncoder.setPipeline(pipeline);
passEncoder.draw(3, 1, 0, 0);
passEncoder.end();
device.queue.submit([commandEncoder.finish()]);
```

## API Comparison

| Feature | OpenGL | DirectX 11 | DirectX 12 | Vulkan | Metal |
|---------|--------|------------|------------|--------|-------|
| **Platforms** | Cross-platform | Windows/Xbox | Windows/Xbox | Cross-platform | Apple only |
| **Level** | High | High | Low | Low | Low |
| **Complexity** | Moderate | Moderate | High | Very High | High |
| **Performance** | Good | Good | Excellent | Excellent | Excellent |
| **Multi-Threading** | Poor | Moderate | Excellent | Excellent | Excellent |
| **Learning Curve** | Gentle | Moderate | Steep | Very Steep | Steep |
| **Memory Management** | Automatic | Automatic | Explicit | Explicit | Explicit |
| **Synchronization** | Implicit | Implicit | Explicit | Explicit | Explicit |

## Choosing an API

**For Learning**: Start with **OpenGL**
- Gentler learning curve
- Cross-platform
- Abundant resources

**For Windows Games**: **DirectX 11** or **DirectX 12**
- DX11: Easier, still performant
- DX12: Maximum performance, console development

**For Cross-Platform High Performance**: **Vulkan**
- Works everywhere (Windows, Linux, Android, macOS via MoltenVK)
- Maximum control and performance
- Prepare for complexity

**For Apple Platforms**: **Metal**
- Best performance on iOS/macOS
- Excellent tooling
- Required for best Apple Silicon performance

**For Web**: **WebGPU** (emerging) or **WebGL** (established)

## Key Takeaways

- Graphics APIs abstract hardware details while exposing GPU capabilities
- OpenGL: Cross-platform, mature, moderate complexity
- DirectX: Windows/Xbox, excellent tools, DX12 for low-level control
- Vulkan: Modern cross-platform explicit API, maximum control and performance
- Metal: Apple platforms, low-level, excellent integration
- High-level APIs (OpenGL, DX11) easier but less performant
- Low-level APIs (Vulkan, DX12, Metal) complex but maximum efficiency
- Choice depends on target platforms, performance needs, and development resources

Understanding graphics APIs is essential for any graphics programmer, as they form the foundation of all real-time rendering applications.
