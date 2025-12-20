# Coordinate Systems and Transformations

Computer graphics represents 3D scenes mathematically, and to display them on a 2D screen requires transforming points through multiple coordinate systems. Understanding these coordinate spaces—object, world, view, clip, NDC, and screen—is fundamental to graphics programming. Each space serves a specific purpose in the rendering pipeline, and transformations move data between them.

## Why Multiple Coordinate Systems?

Different stages of rendering benefit from different coordinate systems:

**Object Space**: Convenient for modeling (centered at origin, unit size)
**World Space**: Positions objects in the scene relative to each other
**View Space**: Centers the camera at origin for lighting calculations
**Clip Space**: Prepares geometry for clipping and rasterization
**NDC (Normalized Device Coordinates)**: Platform-independent representation
**Screen Space**: Final pixel coordinates for display

```
Vertex in Object Space
    ↓ Model Transform
Vertex in World Space
    ↓ View Transform
Vertex in View/Camera Space
    ↓ Projection Transform
Vertex in Clip Space
    ↓ Perspective Division
Vertex in NDC
    ↓ Viewport Transform
Vertex in Screen Space (pixels)
```

## Object Space (Model Space)

**Object space** (also called **model space** or **local space**) is where models are defined. Each object has its own coordinate system, typically centered at the object's origin.

### Characteristics

- Origin at object center (often)
- Unit scale (model is convenient size)
- Oriented for easy modeling
- Independent of scene placement

```
Example: Cube model in object space
      Y
      |
    1 +-----+
     /|    /|
    / |   / |
   +-----+  |
   |  +--|--+ (1, 0, 0)
   | /   | /
   |/    |/
   +-----+--- X
  /
 /
Z

Vertices:
  (-1, -1, -1), (1, -1, -1), ...
```

**Advantages**:
- Easy to model (consistent coordinate system)
- Reusable models (same mesh, different world positions)
- Simple vertex data

### Practical Example

```cpp
// Cube vertices in object space (centered at origin)
float vertices[] = {
    // Position (x, y, z)
    -0.5f, -0.5f, -0.5f,  // Vertex 0
     0.5f, -0.5f, -0.5f,  // Vertex 1
     0.5f,  0.5f, -0.5f,  // Vertex 2
    -0.5f,  0.5f, -0.5f,  // Vertex 3
    -0.5f, -0.5f,  0.5f,  // Vertex 4
     0.5f, -0.5f,  0.5f,  // Vertex 5
     0.5f,  0.5f,  0.5f,  // Vertex 6
    -0.5f,  0.5f,  0.5f   // Vertex 7
};

// This cube is 1×1×1 units, centered at origin
// Ready to be placed anywhere in the world
```

## World Space

**World space** is the unified coordinate system for the entire scene. All objects are positioned relative to a common origin.

### Characteristics

- Single coordinate system for entire scene
- Objects positioned with model transform
- Lighting often calculated here
- Physics simulations use world space

```
Scene in world space:
         Y
         |
    Cube2|        Camera
    @(5,2,0)      @(0,3,-10)
         |       /
    _____|______/_____ X
   /     |    /
  / Cube1|   /
 /  @(0,0,0)/
Z          /
```

### Model Transform (Object → World)

The **model matrix** transforms from object space to world space, combining:

**Translation**: Move object to position
**Rotation**: Orient object
**Scale**: Resize object

```
Model Matrix M = T × R × S

where:
T = Translation matrix
R = Rotation matrix
S = Scale matrix
```

**Example**:
```cpp
glm::mat4 modelMatrix = glm::mat4(1.0f);  // Identity

// Translate to (5, 0, 3)
modelMatrix = glm::translate(modelMatrix, glm::vec3(5.0f, 0.0f, 3.0f));

// Rotate 45° around Y-axis
modelMatrix = glm::rotate(modelMatrix, glm::radians(45.0f), glm::vec3(0.0f, 1.0f, 0.0f));

// Scale by 2× in all dimensions
modelMatrix = glm::scale(modelMatrix, glm::vec3(2.0f, 2.0f, 2.0f));

// Apply to vertex
glm::vec4 objectPos = glm::vec4(1.0f, 0.0f, 0.0f, 1.0f);
glm::vec4 worldPos = modelMatrix * objectPos;
```

**Matrix multiplication order matters**! In column-major notation (OpenGL/GLM):
```
worldPos = T × R × S × objectPos
```

This applies transformations **right-to-left**: scale first, then rotate, then translate.

### Multiple Objects Example

```cpp
// Create three cubes at different world positions
std::vector<glm::mat4> modelMatrices;

// Cube 1: At origin, no rotation, normal scale
modelMatrices.push_back(glm::mat4(1.0f));

// Cube 2: Translated right, rotated, scaled smaller
glm::mat4 model2 = glm::mat4(1.0f);
model2 = glm::translate(model2, glm::vec3(3.0f, 0.0f, 0.0f));
model2 = glm::rotate(model2, glm::radians(45.0f), glm::vec3(0.0f, 1.0f, 0.0f));
model2 = glm::scale(model2, glm::vec3(0.5f, 0.5f, 0.5f));
modelMatrices.push_back(model2);

// Cube 3: Translated up and back
glm::mat4 model3 = glm::mat4(1.0f);
model3 = glm::translate(model3, glm::vec3(0.0f, 2.0f, -3.0f));
modelMatrices.push_back(model3);

// Render each cube with its model matrix
for (auto& model : modelMatrices) {
    shader.setMat4("uModel", model);
    glDrawElements(GL_TRIANGLES, 36, GL_UNSIGNED_INT, 0);
}
```

## View Space (Camera Space)

**View space** (also called **camera space** or **eye space**) is oriented with the camera at the origin, looking down the negative Z-axis.

### Characteristics

- Camera at origin (0, 0, 0)
- Camera looks down -Z axis
- +Y is up
- +X is right
- Convenient for lighting calculations

```
View space coordinate system:
       Y (up)
       |
       |
       +------ X (right)
      /
     /
    Z (backward, toward camera)

Camera looking at scene:
       Y
       |
       ●───────► -Z (looking this direction)
     Camera
```

### View Transform (World → View)

The **view matrix** transforms from world space to view space. It's essentially the **inverse of the camera's model transform**.

**Look-At Matrix**: Common way to construct view matrix
```
Parameters:
- eye: Camera position in world space
- center: Point camera is looking at
- up: Up vector (usually (0, 1, 0))

Forward = normalize(center - eye)
Right = normalize(cross(forward, up))
Up = cross(right, forward)

View Matrix:
⎡  Rx    Ry    Rz   -dot(R, eye) ⎤
⎢  Ux    Uy    Uz   -dot(U, eye) ⎥
⎢ -Fx   -Fy   -Fz    dot(F, eye) ⎥
⎣  0     0     0          1      ⎦

where R = Right, U = Up, F = Forward
```

**GLM Example**:
```cpp
glm::vec3 cameraPos = glm::vec3(0.0f, 5.0f, 10.0f);     // Camera position
glm::vec3 targetPos = glm::vec3(0.0f, 0.0f, 0.0f);      // Look at origin
glm::vec3 upVector = glm::vec3(0.0f, 1.0f, 0.0f);       // World up

glm::mat4 viewMatrix = glm::lookAt(cameraPos, targetPos, upVector);

// Alternative: Manual construction
glm::vec3 forward = glm::normalize(targetPos - cameraPos);
glm::vec3 right = glm::normalize(glm::cross(forward, upVector));
glm::vec3 up = glm::cross(right, forward);

glm::mat4 viewManual = glm::mat4(1.0f);
viewManual[0] = glm::vec4(right, 0.0f);
viewManual[1] = glm::vec4(up, 0.0f);
viewManual[2] = glm::vec4(-forward, 0.0f);
viewManual[3] = glm::vec4(-glm::dot(right, cameraPos),
                          -glm::dot(up, cameraPos),
                           glm::dot(forward, cameraPos),
                           1.0f);
```

### FPS-Style Camera

```cpp
class Camera {
    glm::vec3 position;
    glm::vec3 front;
    glm::vec3 up;
    glm::vec3 right;

    float yaw = -90.0f;   // Horizontal rotation
    float pitch = 0.0f;   // Vertical rotation

    void updateVectors() {
        // Calculate front vector from yaw and pitch
        front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
        front.y = sin(glm::radians(pitch));
        front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
        front = glm::normalize(front);

        // Calculate right and up
        right = glm::normalize(glm::cross(front, glm::vec3(0.0f, 1.0f, 0.0f)));
        up = glm::normalize(glm::cross(right, front));
    }

    glm::mat4 getViewMatrix() {
        return glm::lookAt(position, position + front, up);
    }

    void processKeyboard(Direction dir, float deltaTime) {
        float velocity = 2.5f * deltaTime;
        if (dir == FORWARD)  position += front * velocity;
        if (dir == BACKWARD) position -= front * velocity;
        if (dir == LEFT)     position -= right * velocity;
        if (dir == RIGHT)    position += right * velocity;
    }

    void processMouseMovement(float xoffset, float yoffset) {
        yaw += xoffset * sensitivity;
        pitch += yoffset * sensitivity;

        // Constrain pitch
        if (pitch > 89.0f)  pitch = 89.0f;
        if (pitch < -89.0f) pitch = -89.0f;

        updateVectors();
    }
};
```

## Clip Space

**Clip space** is the space after projection but before perspective division. It's a 4D homogeneous coordinate space where the GPU performs clipping.

### Characteristics

- 4D homogeneous coordinates (x, y, z, w)
- Clipping volume: -w ≤ x, y, z ≤ w
- Geometry outside this volume is clipped
- Output of vertex shader (gl_Position)

### Projection Transform (View → Clip)

The **projection matrix** transforms from view space to clip space. Two main types:

**Orthographic Projection**: Parallel projection, no perspective
**Perspective Projection**: Realistic perspective with foreshortening

## NDC (Normalized Device Coordinates)

**NDC** is obtained by **perspective division** (dividing x, y, z by w):

```
NDC.x = clip.x / clip.w
NDC.y = clip.y / clip.w
NDC.z = clip.z / clip.w
```

### Characteristics

- 3D coordinates
- Range: [-1, 1] in all dimensions (OpenGL)
- Range: [-1, 1] for x,y and [0, 1] for z (DirectX, Vulkan)
- Platform-independent representation
- Ready for viewport transform

```
NDC cube (OpenGL):
      Y (1)
      |
      +-----+
     /|    /|
    / |   / |
   +-----+  | (1, 1, 1)
   |  +--|--+
   | / (-1,-1,-1)
   |/    |/
   +-----+--- X (1)
  /
 /
Z (1)
```

### Perspective Division Example

```cpp
// Vertex after projection (clip space)
glm::vec4 clipPos = glm::vec4(4.0f, 3.0f, 2.0f, 2.0f);

// Perspective division to get NDC
glm::vec3 ndc;
ndc.x = clipPos.x / clipPos.w;  // 4.0 / 2.0 = 2.0
ndc.y = clipPos.y / clipPos.w;  // 3.0 / 2.0 = 1.5
ndc.z = clipPos.z / clipPos.w;  // 2.0 / 2.0 = 1.0

// If any component outside [-1, 1], vertex is clipped
// This vertex would be partially clipped (x=2.0, y=1.5 outside range)
```

## Screen Space (Window Space)

**Screen space** is the final 2D pixel coordinate system of the framebuffer.

### Characteristics

- 2D pixel coordinates
- Origin typically at top-left or bottom-left
- X: [0, width-1]
- Y: [0, height-1]
- Z: Depth value (for depth buffer)

### Viewport Transform (NDC → Screen)

The **viewport transform** maps NDC to screen pixels:

```
Given viewport:
  x, y: offset
  width, height: dimensions

Screen coordinates:
  screen.x = (ndc.x + 1) * (width / 2) + x
  screen.y = (ndc.y + 1) * (height / 2) + y
  screen.z = (ndc.z + 1) / 2  (OpenGL: maps [-1,1] to [0,1])
```

**OpenGL Viewport**:
```cpp
// Set viewport to full window
glViewport(0, 0, windowWidth, windowHeight);

// Example transformation
glm::vec3 ndc = glm::vec3(0.5f, -0.25f, 0.0f);
int x = (ndc.x + 1.0f) * (1920 / 2.0f) + 0;     // 1440
int y = (ndc.y + 1.0f) * (1080 / 2.0f) + 0;     // 405
float depth = (ndc.z + 1.0f) / 2.0f;            // 0.5
```

### Multiple Viewports

```cpp
// Split-screen rendering
// Left viewport
glViewport(0, 0, windowWidth/2, windowHeight);
renderScene(leftCamera);

// Right viewport
glViewport(windowWidth/2, 0, windowWidth/2, windowHeight);
renderScene(rightCamera);
```

## Complete Transformation Pipeline

Putting it all together:

```cpp
// 1. Define vertex in object space
glm::vec4 objectPos = glm::vec4(1.0f, 0.0f, 0.0f, 1.0f);

// 2. Transform to world space
glm::mat4 model = glm::translate(glm::mat4(1.0f), glm::vec3(5.0f, 0.0f, 0.0f));
glm::vec4 worldPos = model * objectPos;
// Result: (6, 0, 0, 1)

// 3. Transform to view space
glm::mat4 view = glm::lookAt(
    glm::vec3(0.0f, 0.0f, 10.0f),  // Camera position
    glm::vec3(0.0f, 0.0f, 0.0f),   // Look at origin
    glm::vec3(0.0f, 1.0f, 0.0f)    // Up vector
);
glm::vec4 viewPos = view * worldPos;

// 4. Transform to clip space
glm::mat4 projection = glm::perspective(
    glm::radians(45.0f),           // FOV
    1920.0f / 1080.0f,             // Aspect ratio
    0.1f,                          // Near plane
    100.0f                         // Far plane
);
glm::vec4 clipPos = projection * viewPos;

// 5. Perspective division to NDC (GPU does this)
glm::vec3 ndc;
ndc.x = clipPos.x / clipPos.w;
ndc.y = clipPos.y / clipPos.w;
ndc.z = clipPos.z / clipPos.w;

// 6. Viewport transform to screen space (GPU does this)
int screenX = (ndc.x + 1.0f) * (1920 / 2.0f);
int screenY = (ndc.y + 1.0f) * (1080 / 2.0f);
float depth = (ndc.z + 1.0f) / 2.0f;
```

### Shader Implementation

```glsl
// Vertex Shader
#version 450 core

layout(location = 0) in vec3 aPosition;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

void main() {
    // Object space → World space
    vec4 worldPos = uModel * vec4(aPosition, 1.0);

    // World space → View space
    vec4 viewPos = uView * worldPos;

    // View space → Clip space
    gl_Position = uProjection * viewPos;

    // GPU automatically does:
    // - Clipping (in clip space)
    // - Perspective division (clip → NDC)
    // - Viewport transform (NDC → screen)
}

// Often combined into single MVP matrix:
void main() {
    mat4 mvp = uProjection * uView * uModel;
    gl_Position = mvp * vec4(aPosition, 1.0);
}
```

## Coordinate System Handedness

Different APIs use different conventions:

**Right-Handed** (OpenGL, most math):
```
  Y
  |
  +--- X
 /
Z
```
Cross product: X × Y = Z

**Left-Handed** (DirectX):
```
  Y
  |
  +--- Z
 /
X
```
Cross product: X × Y = -Z or Z × X = Y

This affects view matrix construction and winding order.

## Common Coordinate Spaces Summary

| Space | Origin | Purpose | Transform |
|-------|--------|---------|-----------|
| **Object** | Object center | Modeling | - |
| **World** | Scene origin | Positioning | Model matrix |
| **View** | Camera | Lighting | View matrix |
| **Clip** | Camera (4D) | Clipping | Projection matrix |
| **NDC** | Center | Platform-independent | Perspective division |
| **Screen** | Top/bottom-left | Rasterization | Viewport transform |

## Key Takeaways

- Multiple coordinate systems serve different purposes in rendering pipeline
- Object space: Convenient for modeling
- World space: Unified scene representation
- View space: Camera-centered for lighting
- Clip space: 4D homogeneous for clipping
- NDC: Platform-independent normalized coordinates
- Screen space: Final pixel positions
- Transformations move vertices between spaces: Model, View, Projection
- Understanding coordinate systems essential for debugging and custom effects
- Different APIs may use different conventions (handedness, NDC ranges)

Mastering coordinate systems is fundamental to computer graphics, enabling you to reason about where geometry exists at each pipeline stage and how transformations affect rendering.
