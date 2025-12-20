# Colors and Framebuffers

Color representation and framebuffer management are fundamental to computer graphics. Understanding how colors are encoded digitally, how they're stored in memory, and how framebuffers orchestrate the final image enables you to create correct, efficient rendering systems. This section explores color models, color depth, blending, and the crucial technique of double buffering.

## Digital Color Representation

### RGB Color Model

The **RGB (Red, Green, Blue)** color model is the foundation of digital displays. Colors are specified as combinations of three primary color components:

```
Color = (Red, Green, Blue)

Each component typically ranges:
  0 to 255 (8-bit per channel)
  0.0 to 1.0 (floating-point, normalized)
```

**Additive Color Mixing**:
```
Red + Green = Yellow
Red + Blue = Magenta
Green + Blue = Cyan
Red + Green + Blue = White
```

```
RGB Color Cube:

       White (255,255,255)
       ●
      /│\
     / │ \
    /  │  \
Magenta-│──Yellow
 (255,0,255) (255,255,0)
  /│   │   /│
 / │   │  / │
●──┼───●─┼──● Cyan (0,255,255)
Blue   │ Green
(0,0,255) (0,255,0)
   │   │/
   │   ●
   │  /Red (255,0,0)
   │ /
   |/
   ●
Black (0,0,0)
```

### Common Color Formats

**RGB888** (24-bit, 8 bits per channel):
```
[RRRRRRRR][GGGGGGGG][BBBBBBBB]
   Red       Green       Blue
   8 bits    8 bits     8 bits
Total: 24 bits = 16,777,216 colors
```

**RGBA8888** (32-bit, includes alpha):
```
[RRRRRRRR][GGGGGGGG][BBBBBBBB][AAAAAAAA]
   Red       Green       Blue      Alpha
   8 bits    8 bits     8 bits    8 bits
Total: 32 bits
```

**RGB565** (16-bit, reduced color):
```
[RRRRR][GGGGGG][BBBBB]
  Red    Green    Blue
5 bits   6 bits  5 bits
Total: 16 bits = 65,536 colors
(Green gets extra bit due to human eye sensitivity)
```

**RGB101010A2** (32-bit HDR):
```
[RRRRRRRRRR][GGGGGGGGGG][BBBBBBBBBB][AA]
    Red         Green         Blue    Alpha
  10 bits     10 bits       10 bits  2 bits
Total: 32 bits, better color precision
```

### Alpha Channel

**Alpha** represents opacity/transparency:

```
Alpha = 0.0   → Fully transparent
Alpha = 0.5   → 50% transparent
Alpha = 1.0   → Fully opaque
```

**Alpha Blending**: Combine source and destination colors
```
Result = Src × Src.alpha + Dst × (1 - Src.alpha)

Example:
Src = (1.0, 0.0, 0.0, 0.5)  // 50% transparent red
Dst = (0.0, 0.0, 1.0, 1.0)  // Opaque blue

Result.r = 1.0 × 0.5 + 0.0 × 0.5 = 0.5
Result.g = 0.0 × 0.5 + 0.0 × 0.5 = 0.0
Result.b = 0.0 × 0.5 + 1.0 × 0.5 = 0.5
Result = (0.5, 0.0, 0.5)  // Purple
```

### Color Depth

**Color depth** (bits per pixel) determines how many colors can be represented:

| Bits per pixel | Colors | Quality |
|----------------|--------|---------|
| 8-bit (indexed) | 256 | Retro games, very limited |
| 16-bit (RGB565) | 65,536 | Older mobile devices, banding visible |
| 24-bit (RGB888) | 16.7M | Standard, good quality |
| 30-bit (RGB101010) | 1.07B | HDR displays, professional |
| 48-bit (RGB16) | 281T | Professional imaging, overkill for display |

**Banding**: Visible color transitions with insufficient bit depth
```
8-bit gradient:          24-bit gradient:
████████                 ████████████████
████████    <- bands     ████████████████  <- smooth
████████                 ████████████████
████████                 ████████████████
```

## Framebuffer Fundamentals

The **framebuffer** is a region of memory holding the pixel data to be displayed. It's the final destination of rendering.

### Framebuffer Components

**Color Buffer**: Stores pixel colors
```
1920×1080 × 4 bytes (RGBA8) = ~8.3 MB
```

**Depth Buffer** (Z-buffer): Stores per-pixel depth values
```
1920×1080 × 4 bytes (32-bit depth) = ~8.3 MB
or
1920×1080 × 3 bytes (24-bit depth) = ~6.2 MB
```

**Stencil Buffer**: Stores per-pixel stencil values (masking)
```
1920×1080 × 1 byte (8-bit stencil) = ~2 MB
```

Often combined as **Depth24Stencil8**: 24-bit depth + 8-bit stencil in 32 bits

```
Framebuffer Memory Layout:

Color Buffer:          Depth Buffer:        Stencil Buffer:
┌───┬───┬───┐         ┌───┬───┬───┐        ┌───┬───┬───┐
│255│ 0 │128│         │0.5│0.9│0.3│        │ 1 │ 0 │ 1 │
├───┼───┼───┤         ├───┼───┼───┤        ├───┼───┼───┤
│ 64│200│ 32│   ...   │0.7│0.2│0.8│  ...   │ 0 │ 1 │ 0 │
├───┼───┼───┤         ├───┼───┼───┤        ├───┼───┼───┤
│...│...│...│         │...│...│...│        │...│...│...│
```

### Framebuffer Operations

**Clear**: Reset buffer to default value
```cpp
glClearColor(0.0f, 0.0f, 0.0f, 1.0f);  // Clear to black
glClearDepth(1.0f);                    // Clear to far plane
glClearStencil(0);                     // Clear to 0
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
```

**Read**: Copy pixels from framebuffer to CPU memory
```cpp
unsigned char* pixels = new unsigned char[width * height * 4];
glReadPixels(0, 0, width, height, GL_RGBA, GL_UNSIGNED_BYTE, pixels);

// Access pixel at (x, y):
int index = (y * width + x) * 4;
unsigned char r = pixels[index + 0];
unsigned char g = pixels[index + 1];
unsigned char b = pixels[index + 2];
unsigned char a = pixels[index + 3];
```

**Write**: Direct framebuffer writes (rare, usually via shaders)

### Default Framebuffer vs FBO

**Default Framebuffer**: Window's display buffer
```cpp
glBindFramebuffer(GL_FRAMEBUFFER, 0);  // Bind default (window)
// Rendering goes to screen
```

**Framebuffer Object (FBO)**: Custom offscreen buffer
```cpp
// Create FBO
GLuint fbo;
glGenFramebuffers(1, &fbo);
glBindFramebuffer(GL_FRAMEBUFFER, fbo);

// Attach color texture
GLuint colorTexture;
glGenTextures(1, &colorTexture);
glBindTexture(GL_TEXTURE_2D, colorTexture);
glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA8, width, height, 0,
             GL_RGBA, GL_UNSIGNED_BYTE, NULL);
glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0,
                       GL_TEXTURE_2D, colorTexture, 0);

// Attach depth/stencil buffer
GLuint depthStencilRBO;
glGenRenderbuffers(1, &depthStencilRBO);
glBindRenderbuffer(GL_RENDERBUFFER, depthStencilRBO);
glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH24_STENCIL8, width, height);
glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_STENCIL_ATTACHMENT,
                          GL_RENDERBUFFER, depthStencilRBO);

// Check completeness
if (glCheckFramebufferStatus(GL_FRAMEBUFFER) != GL_FRAMEBUFFER_COMPLETE) {
    // Handle error
}

// Render to FBO
glBindFramebuffer(GL_FRAMEBUFFER, fbo);
// ... render scene
// Result is in colorTexture, can be used as input to other shaders
```

**FBO Use Cases**:
- Render-to-texture for post-processing effects
- Shadow mapping
- Reflections and mirrors
- Deferred rendering
- Screen-space effects (bloom, blur, etc.)

## Double Buffering

**Double buffering** prevents screen tearing and flicker by maintaining two framebuffers.

### The Tearing Problem

Without double buffering:
```
Single Buffer:

Display reads:  ████████████░░░░░░░░  (scanline partway through)
CPU writes:     ████████████          (updating buffer during display)

Result: Tear visible where old/new frames meet
         ║
    Old  ║ New
  Frame  ║ Frame
    ↓    ║  ↓
  ██████ ║ ████
  ██████ ║ ████  <- Tear line
```

### Double Buffer Solution

Maintain **front buffer** (displayed) and **back buffer** (rendering target):

```
Frame N rendering:

Front Buffer (displayed): Frame N-1  ████████████████
Back Buffer (rendering):  Frame N    ████████████████
                                     ↑ Rendering here

After frame complete, swap buffers:

Front Buffer (displayed): Frame N    ████████████████
Back Buffer (rendering):  Frame N+1  ░░░░░░░░░░░░░░░░
                                     ↑ Now render next frame
```

### Swap Buffers

**Swap Operation**: Flip which buffer is displayed
```cpp
glfwSwapBuffers(window);  // GLFW
SwapBuffers(hdc);         // Windows GDI
eglSwapBuffers(display, surface);  // EGL

// This is very fast (just pointer swap, no copying)
```

### V-Sync (Vertical Synchronization)

**V-Sync** synchronizes buffer swap with display refresh:

```
Without V-Sync:           With V-Sync:

Render at 200 FPS         Render synchronized to 60 FPS
Monitor at 60 Hz          Monitor at 60 Hz

Result: Tearing           Result: No tearing, smooth
```

```cpp
// Enable V-Sync
glfwSwapInterval(1);  // Swap every 1 frame (60 FPS on 60Hz display)
glfwSwapInterval(0);  // No V-Sync (unlimited FPS)
glfwSwapInterval(2);  // Swap every 2 frames (30 FPS on 60Hz display)
```

**Trade-offs**:
- V-Sync ON: No tearing, input lag, capped framerate
- V-Sync OFF: Tearing possible, lower latency, uncapped framerate

### Triple Buffering

**Triple buffering** reduces input lag while preventing tearing:

```
Three Buffers:
- Front buffer: Currently displayed
- Back buffer 1: Recently completed, waiting to display
- Back buffer 2: Currently rendering

Benefits:
- GPU never waits for V-Sync (always has buffer to render to)
- No tearing (still syncs to refresh)
- Lower latency than double buffer with V-Sync
```

### Render Loop with Double Buffering

```cpp
void gameLoop() {
    while (!shouldClose) {
        // Process input
        processInput();

        // Update game state
        updateGame(deltaTime);

        // Render to back buffer
        glBindFramebuffer(GL_FRAMEBUFFER, 0);  // Default (back buffer)
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        renderScene();

        // Swap buffers (back becomes front)
        glfwSwapBuffers(window);

        // Poll events
        glfwPollEvents();
    }
}
```

## Color Blending

**Blending** combines fragment color with framebuffer color.

### Blend Equation

```
Result = Src × SrcFactor + Dst × DstFactor

where:
  Src = incoming fragment color
  Dst = current framebuffer color
  SrcFactor, DstFactor = blend factors
```

### Common Blend Modes

**Alpha Blending** (transparency):
```cpp
glEnable(GL_BLEND);
glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

// Result = Src × Src.a + Dst × (1 - Src.a)
```

**Additive Blending** (lights, particles):
```cpp
glBlendFunc(GL_SRC_ALPHA, GL_ONE);

// Result = Src × Src.a + Dst × 1
// Colors accumulate, creates glowing effect
```

**Multiplicative Blending** (shadows, darkening):
```cpp
glBlendFunc(GL_DST_COLOR, GL_ZERO);

// Result = Src × Dst + Dst × 0 = Src × Dst
// Darkens underlying color
```

**Premultiplied Alpha**:
```cpp
glBlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);

// Assumes RGB already multiplied by alpha in shader:
// fragColor.rgb *= fragColor.a;

// Benefits: More correct blending, better filtering
```

### Blend Factor Options

```cpp
GL_ZERO                    // 0
GL_ONE                     // 1
GL_SRC_COLOR               // Source color
GL_ONE_MINUS_SRC_COLOR     // 1 - Source color
GL_DST_COLOR               // Destination color
GL_ONE_MINUS_DST_COLOR     // 1 - Destination color
GL_SRC_ALPHA               // Source alpha
GL_ONE_MINUS_SRC_ALPHA     // 1 - Source alpha
GL_DST_ALPHA               // Destination alpha
GL_ONE_MINUS_DST_ALPHA     // 1 - Destination alpha
```

### Separate RGB and Alpha Blending

```cpp
glBlendFuncSeparate(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA,  // RGB
                    GL_ONE, GL_ZERO);                       // Alpha

// Different blending for color and alpha channels
```

### Blend Example

```glsl
// Fragment shader with transparency
uniform sampler2D texture;
in vec2 vTexCoord;
out vec4 fragColor;

void main() {
    vec4 texColor = texture(texture, vTexCoord);

    // Discard fully transparent pixels (no blend needed)
    if (texColor.a < 0.01) discard;

    // Output color with alpha
    fragColor = texColor;

    // Blending happens in framebuffer:
    // result = texColor × texColor.a + framebuffer × (1 - texColor.a)
}
```

### Blend Order Matters

Blending is **order-dependent** for transparency:

```
Incorrect order:           Correct order:
Render opaque → transparent  Render opaque → sort transparent by depth → render

     ●────────●                  ●────────●
    /|       /|                 /|       /|
   / |  A  / |                / |  B  / |
  ●────────●  |               ●────────●  |
  │ /|   B│ /|               │ /|   A│ /|
  |/ |    |/ |               |/ |    |/ |
  ●──|────●  |               ●──|────●  |
   \ |     \ |                \ |     \ |
    \|      \|                 \|      \|
     ●────────●                  ●────────●

A rendered first (wrong)    B rendered first (correct)
```

**Solution**: Render opaque first, then transparent back-to-front:

```cpp
void renderScene() {
    // 1. Render opaque objects (any order, depth test on)
    glDepthMask(GL_TRUE);
    glDisable(GL_BLEND);
    for (auto& obj : opaqueObjects) {
        obj.render();
    }

    // 2. Sort transparent objects by distance from camera
    std::sort(transparentObjects.begin(), transparentObjects.end(),
        [&camera](const Object& a, const Object& b) {
            float distA = glm::length(a.position - camera.position);
            float distB = glm::length(b.position - camera.position);
            return distA > distB;  // Farthest first (back-to-front)
        });

    // 3. Render transparent objects (back-to-front, depth write off)
    glDepthMask(GL_FALSE);  // Don't write to depth buffer
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    for (auto& obj : transparentObjects) {
        obj.render();
    }

    glDepthMask(GL_TRUE);  // Re-enable depth writes
}
```

## HDR and Tone Mapping

**HDR (High Dynamic Range)** uses floating-point color buffers to represent wider range:

```cpp
// Create HDR framebuffer
GLuint hdrFBO;
glGenFramebuffers(1, &hdrFBO);
glBindFramebuffer(GL_FRAMEBUFFER, hdrFBO);

// HDR color texture (16 or 32 bit float per channel)
GLuint hdrTexture;
glGenTextures(1, &hdrTexture);
glBindTexture(GL_TEXTURE_2D, hdrTexture);
glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA16F, width, height, 0,
             GL_RGBA, GL_FLOAT, NULL);
glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0,
                       GL_TEXTURE_2D, hdrTexture, 0);

// Render scene with HDR lighting (values > 1.0 allowed)
renderSceneHDR();

// Tone mapping: Convert HDR to LDR for display
glBindFramebuffer(GL_FRAMEBUFFER, 0);
toneMapShader.use();
toneMapShader.setTexture("hdrBuffer", hdrTexture);
renderQuad();
```

**Tone Mapping Shader**:
```glsl
uniform sampler2D hdrBuffer;
in vec2 texCoord;
out vec4 fragColor;

void main() {
    vec3 hdrColor = texture(hdrBuffer, texCoord).rgb;

    // Reinhard tone mapping
    vec3 mapped = hdrColor / (hdrColor + vec3(1.0));

    // Or ACES filmic tone mapping (more cinematic)
    // mapped = ACESFilm(hdrColor);

    // Gamma correction
    mapped = pow(mapped, vec3(1.0 / 2.2));

    fragColor = vec4(mapped, 1.0);
}
```

## Gamma Correction

Monitors apply **gamma curve**; we must account for this:

```
Linear RGB → Gamma Correction → Display

Gamma encoding:   output = input^(1/2.2)  (lighten)
Gamma decoding:   output = input^2.2      (darken)
```

**sRGB**: Standard color space with built-in gamma

```cpp
// Use sRGB framebuffer (automatic gamma correction)
glEnable(GL_FRAMEBUFFER_SRGB);

// Or manual in shader:
fragColor.rgb = pow(fragColor.rgb, vec3(1.0/2.2));
```

## Key Takeaways

- RGB is the standard additive color model for displays
- Alpha channel represents opacity for transparency
- Color depth determines number of representable colors (24-bit standard)
- Framebuffer stores color, depth, and stencil data for rendering
- Double buffering prevents tearing by using front and back buffers
- V-Sync synchronizes buffer swaps with display refresh
- Blending combines fragment and framebuffer colors for transparency
- Transparent objects must be sorted and rendered back-to-front
- HDR rendering uses floating-point buffers for wider color range
- Gamma correction accounts for non-linear monitor response
- Understanding framebuffers essential for advanced techniques (post-processing, deferred rendering)

Mastering color representation and framebuffer management enables correct, efficient, and visually appealing graphics applications.
