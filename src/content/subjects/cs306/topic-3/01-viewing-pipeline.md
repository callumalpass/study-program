# The Viewing Pipeline

The viewing pipeline transforms 3D world coordinates into 2D screen coordinates through a series of coordinate system transformations. This pipeline—from world space through view, clip, NDC, and finally to screen space—is fundamental to how 3D graphics are projected onto 2D displays. Understanding each stage enables you to implement cameras, debug rendering issues, and create advanced visual effects.

## Pipeline Overview

```
World Coordinates
    ↓
[View Transform - Camera positioning]
    ↓
Camera/Eye Coordinates
    ↓
[Projection Transform - 3D to 2D mapping]
    ↓
Clip Coordinates (4D homogeneous)
    ↓
[Clipping - Remove geometry outside view]
    ↓
[Perspective Division - Homogeneous to Cartesian]
    ↓
Normalized Device Coordinates (NDC)
    ↓
[Viewport Transform - Map to window]
    ↓
Screen/Window Coordinates
```

Each transformation serves a specific purpose and operates in a coordinate system optimized for its task.

## World Coordinates

**World space** is the global coordinate system containing all objects in the scene. Objects are positioned, oriented, and scaled relative to a single world origin.

```
World space characteristics:
- Single unified coordinate system
- All objects positioned relative to world origin
- Lighting calculations often performed here
- Physics simulations use world coordinates
```

**Example scene**:
```cpp
// Multiple objects in world space
struct Object {
    glm::vec3 position;     // World position
    glm::quat orientation;  // World orientation
    glm::vec3 scale;        // Scale

    glm::mat4 getModelMatrix() {
        return glm::translate(glm::mat4(1.0f), position) *
               glm::mat4_cast(orientation) *
               glm::scale(glm::mat4(1.0f), scale);
    }
};

std::vector<Object> sceneObjects = {
    {{0, 0, 0}, {1,0,0,0}, {1,1,1}},      // Object at origin
    {{10, 0, 5}, {1,0,0,0}, {2,2,2}},     // Object at (10,0,5), scaled 2×
    {{-5, 3, -2}, quat(...), {1,1,1}}     // Object at (-5,3,-2), rotated
};
```

## View Transform: World to Camera Space

The **view transform** positions the camera and reorients coordinates so the camera is at the origin looking down the -Z axis.

### Camera Space Definition

```
Camera space (view space, eye space):
- Camera at origin (0, 0, 0)
- Looking down -Z axis
- +X points right
- +Y points up
- +Z points backward (toward camera)
```

### View Matrix Construction

The view matrix is the **inverse of the camera's model matrix**:

```
V = C^(-1)

where C is the camera's world transform
```

**lookAt matrix** constructs view matrix from camera parameters:

```cpp
glm::mat4 view = glm::lookAt(
    cameraPosition,  // Where camera is
    targetPosition,  // Where camera looks
    upVector         // Camera's up direction (usually (0,1,0))
);
```

**Manual construction**:
```cpp
glm::vec3 position = glm::vec3(0, 5, 10);
glm::vec3 target = glm::vec3(0, 0, 0);
glm::vec3 worldUp = glm::vec3(0, 1, 0);

// Compute camera basis vectors
glm::vec3 forward = glm::normalize(target - position);
glm::vec3 right = glm::normalize(glm::cross(forward, worldUp));
glm::vec3 up = glm::cross(right, forward);

// Build view matrix
glm::mat4 view;
view[0] = glm::vec4(right, 0);
view[1] = glm::vec4(up, 0);
view[2] = glm::vec4(-forward, 0);  // Negative: camera looks down -Z
view[3] = glm::vec4(-glm::dot(right, position),
                     -glm::dot(up, position),
                     glm::dot(forward, position),
                     1);
```

### Why Camera Space?

- **Lighting calculations**: Often computed in view space
- **Depth values**: Z-coordinate is depth from camera
- **Culling**: Easy to test if object is in front of camera (z < 0)
- **Fog effects**: Distance from camera (z-coordinate) determines fog

## Projection Transform: Camera to Clip Space

The **projection transform** applies either perspective or orthographic projection, mapping the 3D view frustum to a canonical cube.

### View Frustum

The **view frustum** defines the visible region:

```
Perspective frustum:
        ┌─────────────┐ Far plane
       /│            /│
      / │           / │
     /  │          /  │
    /   │         /   │
   /    └────────/────┘ Near plane
  /     ●        /
 /   Camera     /
└──────────────┘

Defined by:
- FOV (field of view)
- Aspect ratio
- Near plane distance
- Far plane distance
```

### Projection Matrix Purpose

1. **Transform frustum to canonical cube**: Makes clipping uniform
2. **Encode depth**: Store depth information in homogeneous w
3. **Enable perspective division**: Set w ≠ 1 for perspective effect

### Perspective vs Orthographic

**Perspective projection**:
- Distant objects appear smaller (foreshortening)
- Parallel lines converge to vanishing points
- Realistic for 3D scenes
- Used for games, visualization

**Orthographic projection**:
- No foreshortening (parallel projection)
- Parallel lines remain parallel
- Used for 2D, UI, CAD, technical drawings
- Distant objects same size as near objects

```
Perspective:           Orthographic:
    ╱│                     │
   ╱ │                     │
  ╱  │                     │
 ●───│                     │
Camera                     │
```

## Clip Space and Clipping

**Clip space** is 4D homogeneous coordinates (x, y, z, w) after projection.

### Clip Space Range

```
OpenGL clip space:
  -w ≤ x ≤ w
  -w ≤ y ≤ w
  -w ≤ z ≤ w
   w > 0

Vertices outside this range are clipped
```

### Clipping Operation

**Clipping** removes geometry outside the view frustum:

1. **Trivial accept**: Entire primitive inside clip volume
2. **Trivial reject**: Entire primitive outside clip volume
3. **Clip**: Primitive straddles boundary → split into multiple primitives

```
Before clipping:           After clipping:
    │                          │
  ──┼──                      ──┼──
 ╱  │  ╲                    ╱  │
●   │   ●  Outside        ●   │  ● Inside portion only
     ╲  │  ╱
      ──┼──
        │
   Clip boundary
```

**Why clip in homogeneous space?**
- Clipping planes are linear in homogeneous coordinates
- Perspective division happens after clipping
- Avoids numerical issues near camera

## Perspective Division: Clip to NDC

**Perspective division** converts 4D homogeneous clip coordinates to 3D Cartesian NDC:

```
NDC.x = clip.x / clip.w
NDC.y = clip.y / clip.w
NDC.z = clip.z / clip.w
```

### Effect of Division

```
Two points at different depths:

Point A: clip = (1, 1, z_a, 2)
Point B: clip = (2, 2, z_b, 4)

After division:
Point A: NDC = (0.5, 0.5, z_a/2)
Point B: NDC = (0.5, 0.5, z_b/4)

Same NDC x,y → both appear at same screen position
Different w → Point B was twice as far (w=4 vs w=2)
```

This division creates the perspective effect: distant objects compressed.

### NDC Range

```
OpenGL: [-1, 1] for x, y, z
DirectX/Vulkan: [-1, 1] for x, y; [0, 1] for z
```

NDC is a **platform-independent** intermediate representation.

## Viewport Transform: NDC to Screen Space

The **viewport transform** maps NDC to window pixel coordinates:

```
screenX = (ndc.x + 1) × (width / 2) + x_offset
screenY = (ndc.y + 1) × (height / 2) + y_offset
screenZ = (ndc.z + 1) / 2  (OpenGL: maps [-1,1] to [0,1])
```

**OpenGL viewport**:
```cpp
glViewport(x, y, width, height);

// Example: Full window
glViewport(0, 0, 1920, 1080);

// NDC (0, 0) maps to center: (960, 540)
// NDC (-1, -1) maps to bottom-left: (0, 0)
// NDC (1, 1) maps to top-right: (1920, 1080)
```

### Viewport Applications

**Split-screen rendering**:
```cpp
// Player 1: Left half
glViewport(0, 0, windowWidth/2, windowHeight);
renderScene(player1Camera);

// Player 2: Right half
glViewport(windowWidth/2, 0, windowWidth/2, windowHeight);
renderScene(player2Camera);
```

**Picture-in-picture**:
```cpp
// Main view: Full screen
glViewport(0, 0, windowWidth, windowHeight);
renderScene(mainCamera);

// Minimap: Bottom-right corner
glViewport(windowWidth - 200, 0, 200, 200);
renderMinimap(minimapCamera);
```

## Complete Pipeline Example

### Shader Implementation

```glsl
// Vertex shader
#version 450 core

layout(location = 0) in vec3 aPosition;

uniform mat4 uModel;       // Object → World
uniform mat4 uView;        // World → View
uniform mat4 uProjection;  // View → Clip

void main() {
    // Transform through pipeline
    vec4 worldPos = uModel * vec4(aPosition, 1.0);
    vec4 viewPos = uView * worldPos;
    vec4 clipPos = uProjection * viewPos;

    gl_Position = clipPos;

    // GPU automatically performs:
    // 1. Clipping (in clip space)
    // 2. Perspective division (clip → NDC)
    // 3. Viewport transform (NDC → screen)
}
```

### CPU Setup

```cpp
void renderFrame() {
    // 1. Set up camera
    glm::vec3 cameraPos = glm::vec3(0, 2, 5);
    glm::vec3 target = glm::vec3(0, 0, 0);
    glm::mat4 view = glm::lookAt(cameraPos, target, glm::vec3(0, 1, 0));

    // 2. Set up projection
    float fov = glm::radians(60.0f);
    float aspect = (float)windowWidth / windowHeight;
    glm::mat4 projection = glm::perspective(fov, aspect, 0.1f, 100.0f);

    // 3. Set viewport
    glViewport(0, 0, windowWidth, windowHeight);

    // 4. Render objects
    for (auto& obj : objects) {
        glm::mat4 model = obj.getModelMatrix();

        shader.use();
        shader.setMat4("uModel", model);
        shader.setMat4("uView", view);
        shader.setMat4("uProjection", projection);

        obj.draw();
    }
}
```

## Tracing a Vertex Through Pipeline

Example: Vertex at (1, 0, 0) in object space

```cpp
// 1. Object space
glm::vec4 objectPos = glm::vec4(1, 0, 0, 1);

// 2. World space (after model transform)
glm::mat4 model = glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0));
glm::vec4 worldPos = model * objectPos;
// Result: (6, 0, 0, 1)

// 3. View space (after view transform)
glm::mat4 view = glm::lookAt(glm::vec3(0, 0, 10), glm::vec3(0, 0, 0), glm::vec3(0, 1, 0));
glm::vec4 viewPos = view * worldPos;
// Result: (6, 0, -10, 1) - camera at z=10 looking at origin

// 4. Clip space (after projection)
glm::mat4 projection = glm::perspective(glm::radians(60.0f), 1.0f, 0.1f, 100.0f);
glm::vec4 clipPos = projection * viewPos;
// Result: (≈5.2, 0, ≈10.1, 10) - w ≠ 1 encodes depth

// 5. NDC (after perspective division)
glm::vec3 ndc = glm::vec3(clipPos) / clipPos.w;
// Result: (≈0.52, 0, ≈1.01)

// 6. Screen space (after viewport transform)
int screenX = (ndc.x + 1.0f) * (1920 / 2.0f);  // ≈1459
int screenY = (ndc.y + 1.0f) * (1080 / 2.0f);  // ≈540
float depth = (ndc.z + 1.0f) / 2.0f;            // ≈1.0 (near far plane)
```

## Common Issues and Debugging

### Near/Far Plane Z-Fighting

```cpp
// Bad: Too wide range
glm::perspective(fov, aspect, 0.001f, 10000.0f);
// → Z-buffer precision issues, z-fighting

// Good: Tight range
glm::perspective(fov, aspect, 0.1f, 100.0f);
// → Better depth precision
```

### Aspect Ratio Distortion

```cpp
// Wrong: Fixed aspect
glm::perspective(fov, 1.0f, near, far);
// → Stretching when window not square

// Correct: Match window
float aspect = (float)windowWidth / windowHeight;
glm::perspective(fov, aspect, near, far);
```

### Inverted Y-Axis

Different systems have different Y conventions:

```cpp
// OpenGL: Y+ is up, origin bottom-left
// DirectX/Vulkan: Y+ is down, origin top-left

// May need to flip Y in vertex shader or projection matrix
```

## Key Takeaways

- Viewing pipeline transforms world coordinates to screen coordinates
- View transform: positions camera, reorients to camera space
- Projection transform: applies perspective or orthographic projection
- Clipping: removes geometry outside view frustum (in clip space)
- Perspective division: converts homogeneous clip coords to NDC
- Viewport transform: maps NDC to window pixels
- Each stage optimized for specific operations
- Understanding pipeline essential for camera implementation and debugging
- Proper near/far plane setup critical for depth precision
- Pipeline stages happen automatically in GPU after vertex shader

Mastering the viewing pipeline enables you to implement cameras, understand projection, and debug rendering issues effectively.
