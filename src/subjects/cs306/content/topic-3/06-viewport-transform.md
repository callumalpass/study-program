# Viewport Transform

The viewport transform is the final stage of the graphics pipeline, mapping normalized device coordinates (NDC) to actual pixel coordinates on the screen. This transformation determines where and how the rendered image appears in the window, enabling features like split-screen rendering, picture-in-picture, and multi-monitor setups. Understanding the viewport transform is essential for controlling final image placement and resolution.

## Purpose of Viewport Transform

After perspective division, vertices are in **NDC** (Normalized Device Coordinates):
- Range: [-1, 1] for x, y (OpenGL)
- Platform-independent representation
- Abstract coordinates

The **viewport transform** maps NDC to **screen coordinates**:
- Range: [0, width-1] for x, [0, height-1] for y
- Actual pixel locations
- Window/framebuffer coordinates

```
NDC cube:                Screen coordinates:
   (-1,1)  ●───────● (1,1)      (0,h)  ●───────● (w,h)
           │       │                   │       │
           │   ●   │      →            │   ●   │
           │ (0,0) │                   │(w/2,h/2)│
           │       │                   │       │
  (-1,-1)  ●───────● (1,-1)      (0,0)  ●───────● (w,0)
```

## Viewport Transform Formula

Given NDC coordinates (xₙ, yₙ, zₙ) in [-1, 1] and viewport parameters:

```
Viewport defined by:
- x, y: Lower-left corner offset
- width, height: Viewport dimensions

Screen coordinates:
xₛ = (xₙ + 1) × (width / 2) + x
yₛ = (yₙ + 1) × (height / 2) + y
zₛ = (zₙ + 1) / 2  (maps [-1,1] to [0,1] for depth buffer)

Or equivalently:
xₛ = xₙ × (width / 2) + (width / 2) + x
yₛ = yₙ × (height / 2) + (height / 2) + y
```

**Matrix form** (as 2D affine transform):
```
⎡ width/2    0      0   width/2 + x ⎤
⎢    0    height/2  0   height/2 + y ⎥
⎣    0       0      1         0      ⎦
```

## OpenGL Viewport

```cpp
glViewport(x, y, width, height);
```

**Parameters**:
- `x, y`: Lower-left corner of viewport in window coordinates
- `width, height`: Viewport dimensions in pixels

**Default**: Full window
```cpp
glViewport(0, 0, windowWidth, windowHeight);
```

**Example calculations**:
```cpp
// Viewport: glViewport(0, 0, 1920, 1080)

// NDC (0, 0) → Screen:
xₛ = (0 + 1) × (1920 / 2) + 0 = 960
yₛ = (0 + 1) × (1080 / 2) + 0 = 540
// Center of screen (960, 540)

// NDC (-1, -1) → Screen:
xₛ = (-1 + 1) × (1920 / 2) + 0 = 0
yₛ = (-1 + 1) × (1080 / 2) + 0 = 0
// Bottom-left (0, 0)

// NDC (1, 1) → Screen:
xₛ = (1 + 1) × (1920 / 2) + 0 = 1920
yₛ = (1 + 1) × (1080 / 2) + 0 = 1080
// Top-right (1920, 1080)
```

## Depth Range

Maps NDC z to depth buffer values:

```cpp
glDepthRange(near, far);

// Default
glDepthRange(0.0, 1.0);  // Maps NDC [-1,1] to [0,1]
```

**Transformation**:
```
depthBuffer = (zₙ + 1) × (far - near) / 2 + near

Default (near=0, far=1):
depthBuffer = (zₙ + 1) / 2
```

**Reversed depth** (better precision):
```cpp
glDepthRange(1.0, 0.0);  // Far → 0, Near → 1

// Benefits:
// - Better floating-point precision distribution
// - Reduces z-fighting
// - Requires GL_GREATER depth test instead of GL_LESS
glDepthFunc(GL_GREATER);
```

## Multiple Viewports

Render different views to different screen regions.

### Split-Screen (Horizontal)

```cpp
void renderSplitScreen() {
    // Player 1: Left half
    glViewport(0, 0, windowWidth / 2, windowHeight);
    renderScene(player1Camera, player1Projection);

    // Player 2: Right half
    glViewport(windowWidth / 2, 0, windowWidth / 2, windowHeight);
    renderScene(player2Camera, player2Projection);
}
```

### Split-Screen (Vertical)

```cpp
void renderSplitScreenVertical() {
    // Player 1: Top half
    glViewport(0, windowHeight / 2, windowWidth, windowHeight / 2);

    // Adjust aspect ratio for half-height
    float aspect = (float)windowWidth / (float)(windowHeight / 2);
    player1Projection = glm::perspective(fov, aspect, near, far);

    renderScene(player1Camera, player1Projection);

    // Player 2: Bottom half
    glViewport(0, 0, windowWidth, windowHeight / 2);
    player2Projection = glm::perspective(fov, aspect, near, far);
    renderScene(player2Camera, player2Projection);
}
```

### Quad Split-Screen

```cpp
void renderQuadSplit() {
    int halfW = windowWidth / 2;
    int halfH = windowHeight / 2;
    float aspect = (float)halfW / (float)halfH;
    glm::mat4 proj = glm::perspective(fov, aspect, near, far);

    // Top-left
    glViewport(0, halfH, halfW, halfH);
    renderScene(camera1, proj);

    // Top-right
    glViewport(halfW, halfH, halfW, halfH);
    renderScene(camera2, proj);

    // Bottom-left
    glViewport(0, 0, halfW, halfH);
    renderScene(camera3, proj);

    // Bottom-right
    glViewport(halfW, 0, halfW, halfH);
    renderScene(camera4, proj);
}
```

## Picture-in-Picture

Small view overlaid on main view:

```cpp
void renderPictureInPicture() {
    // Main view: Full screen
    glViewport(0, 0, windowWidth, windowHeight);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    renderScene(mainCamera, mainProjection);

    // Clear depth for overlay
    glClear(GL_DEPTH_BUFFER_BIT);

    // Mini-map: Bottom-right corner (200×200)
    int miniSize = 200;
    glViewport(windowWidth - miniSize - 10, 10, miniSize, miniSize);

    // Top-down orthographic view for minimap
    glm::mat4 minimapProj = glm::ortho(-50.0f, 50.0f, -50.0f, 50.0f, 0.1f, 100.0f);
    glm::mat4 minimapView = glm::lookAt(
        glm::vec3(playerPos.x, 100, playerPos.z),  // Above player
        playerPos,                                  // Look at player
        glm::vec3(0, 0, -1)                        // North is up
    );

    renderMinimap(minimapView, minimapProj);

    // Restore full viewport
    glViewport(0, 0, windowWidth, windowHeight);
}
```

## Rear-View Mirror

```cpp
void renderWithRearView() {
    // Main view
    glViewport(0, 0, windowWidth, windowHeight);
    renderScene(frontCamera, frontProjection);

    // Clear depth for rear view
    glClear(GL_DEPTH_BUFFER_BIT);

    // Rear-view mirror: Top-center
    int mirrorWidth = 300;
    int mirrorHeight = 150;
    glViewport((windowWidth - mirrorWidth) / 2, windowHeight - mirrorHeight - 10,
               mirrorWidth, mirrorHeight);

    // Camera facing backward
    glm::vec3 rearLook = frontCamera.position - frontCamera.front;
    glm::mat4 rearView = glm::lookAt(
        frontCamera.position,
        rearLook,
        frontCamera.up
    );

    float mirrorAspect = (float)mirrorWidth / (float)mirrorHeight;
    glm::mat4 rearProj = glm::perspective(glm::radians(70.0f), mirrorAspect, 0.1f, 100.0f);

    renderScene(rearView, rearProj);

    glViewport(0, 0, windowWidth, windowHeight);
}
```

## Multi-Monitor Setup

Render to different monitors/windows:

```cpp
// Assume multiple windows/contexts
struct Monitor {
    GLFWwindow* window;
    int width, height;
};

std::vector<Monitor> monitors;

void renderToMonitors() {
    for (size_t i = 0; i < monitors.size(); i++) {
        glfwMakeContextCurrent(monitors[i].window);

        glViewport(0, 0, monitors[i].width, monitors[i].height);

        float aspect = (float)monitors[i].width / (float)monitors[i].height;
        glm::mat4 projection = glm::perspective(fov, aspect, near, far);

        renderScene(cameras[i], projection);

        glfwSwapBuffers(monitors[i].window);
    }
}
```

## Screen-to-World Coordinate Conversion

Convert mouse click to world position:

```cpp
glm::vec3 screenToWorld(glm::vec2 screenPos, glm::mat4 viewProj, glm::ivec4 viewport) {
    // Flip Y (screen Y=0 at top, OpenGL Y=0 at bottom)
    screenPos.y = viewport.w - screenPos.y;

    // Map to NDC
    glm::vec3 ndc;
    ndc.x = (screenPos.x - viewport.x) / viewport.z * 2.0f - 1.0f;
    ndc.y = (screenPos.y - viewport.y) / viewport.w * 2.0f - 1.0f;
    ndc.z = 1.0f;  // Far plane (or read from depth buffer)

    // NDC to world
    glm::vec4 worldPos = glm::inverse(viewProj) * glm::vec4(ndc, 1.0f);
    worldPos /= worldPos.w;

    return glm::vec3(worldPos);
}

// Usage: Ray picking
void onMouseClick(int x, int y) {
    glm::ivec4 viewport = glm::ivec4(0, 0, windowWidth, windowHeight);
    glm::mat4 viewProj = projection * view;

    // Ray from camera through click
    glm::vec3 nearPoint = screenToWorld(glm::vec2(x, y), viewProj, viewport);
    glm::vec3 rayDir = glm::normalize(nearPoint - cameraPos);

    // Raycast into scene
    RaycastHit hit;
    if (raycast(cameraPos, rayDir, hit)) {
        selectObject(hit.object);
    }
}
```

## World-to-Screen Projection

Project 3D point to screen coordinates:

```cpp
glm::vec2 worldToScreen(glm::vec3 worldPos, glm::mat4 viewProj, glm::ivec4 viewport) {
    // World to clip space
    glm::vec4 clipPos = viewProj * glm::vec4(worldPos, 1.0f);

    // Perspective division to NDC
    if (clipPos.w == 0.0f) return glm::vec2(-1, -1);  // Invalid

    glm::vec3 ndc = glm::vec3(clipPos) / clipPos.w;

    // Check if behind camera or outside NDC
    if (ndc.z < -1.0f || ndc.z > 1.0f) return glm::vec2(-1, -1);
    if (ndc.x < -1.0f || ndc.x > 1.0f || ndc.y < -1.0f || ndc.y > 1.0f) {
        return glm::vec2(-1, -1);  // Outside view
    }

    // NDC to screen
    glm::vec2 screenPos;
    screenPos.x = (ndc.x + 1.0f) * 0.5f * viewport.z + viewport.x;
    screenPos.y = (1.0f - ndc.y) * 0.5f * viewport.w + viewport.y;  // Flip Y

    return screenPos;
}

// Usage: Draw UI label at 3D position
void drawLabel(glm::vec3 worldPos, std::string text) {
    glm::ivec4 viewport = glm::ivec4(0, 0, windowWidth, windowHeight);
    glm::mat4 viewProj = projection * view;

    glm::vec2 screenPos = worldToScreen(worldPos, viewProj, viewport);

    if (screenPos.x >= 0) {  // Valid screen position
        renderText(text, screenPos.x, screenPos.y);
    }
}
```

## Viewport Queries

```cpp
// Get current viewport
GLint viewport[4];
glGetIntegerv(GL_VIEWPORT, viewport);
// viewport[0] = x, viewport[1] = y
// viewport[2] = width, viewport[3] = height

// Get depth range
GLfloat depthRange[2];
glGetFloatv(GL_DEPTH_RANGE, depthRange);
// depthRange[0] = near, depthRange[1] = far
```

## Performance Considerations

### Avoid Frequent Changes

```cpp
// Bad: Change viewport per object
for (auto& obj : objects) {
    glViewport(...);  // Expensive state change
    renderObject(obj);
}

// Good: Batch by viewport
glViewport(mainViewport);
for (auto& obj : mainObjects) {
    renderObject(obj);
}

glViewport(minimapViewport);
for (auto& obj : minimapObjects) {
    renderObject(obj);
}
```

### Scissor Test

Restrict rendering to viewport region:

```cpp
glEnable(GL_SCISSOR_TEST);
glScissor(x, y, width, height);  // Discard fragments outside

// Render
glDisable(GL_SCISSOR_TEST);
```

## Common Issues

### Aspect Ratio Mismatch

```cpp
// Wrong: Fixed aspect ratio with changing viewport
glViewport(0, 0, width, height);
glm::mat4 projection = glm::perspective(fov, 1.6f, near, far);  // Always 16:10

// Correct: Match viewport aspect
float aspect = (float)width / (float)height;
glm::mat4 projection = glm::perspective(fov, aspect, near, far);
```

### Y-Axis Flip

OpenGL Y=0 at bottom, most windowing systems Y=0 at top:

```cpp
// Convert screen Y to OpenGL Y
float openglY = windowHeight - screenY;
```

## Key Takeaways

- Viewport transform maps NDC [-1,1] to screen pixels
- glViewport(x, y, width, height) sets viewport rectangle
- Default viewport is full window
- Multiple viewports enable split-screen, PIP, multi-monitor
- Screen-to-world conversion enables picking and UI placement
- World-to-screen projection displays labels at 3D positions
- Aspect ratio must match viewport dimensions
- Y-axis conventions differ between APIs and window systems
- Minimize viewport changes for performance
- Understanding viewport essential for advanced rendering techniques

Mastering the viewport transform enables sophisticated multi-view rendering, correct aspect ratios, and seamless integration between 3D world and 2D screen coordinates.
