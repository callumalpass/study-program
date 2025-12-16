# Complete 3D Transformation Pipeline

The 3D transformation pipeline is the sequence of coordinate system transformations that converts vertices from their original model space through to final screen positions. Understanding this complete pipeline—from object coordinates through world, view, clip, NDC, and screen spaces—is fundamental to computer graphics programming and essential for debugging rendering issues.

## The Complete Pipeline

```
Object Space (Model Coordinates)
    ↓ [Model Matrix]
World Space (Scene Coordinates)
    ↓ [View Matrix]
View/Camera Space (Eye Coordinates)
    ↓ [Projection Matrix]
Clip Space (Homogeneous Coordinates)
    ↓ [Perspective Division]
NDC (Normalized Device Coordinates)
    ↓ [Viewport Transform]
Screen Space (Window Coordinates)
```

Each transformation serves a specific purpose and operates in a particular coordinate system optimized for its task.

## Object Space to World Space: Model Transform

**Object space** (local space) is where models are authored. Each object has its own coordinate system, typically centered at the object's pivot point.

**Model matrix** positions, orients, and scales the object in world space:

```
M = T × R × S

where:
  T = Translation matrix (position)
  R = Rotation matrix (orientation)
  S = Scale matrix (size)
```

**Example**:
```cpp
// Create model matrix for a car
glm::vec3 carPosition = glm::vec3(10, 0, 5);
glm::vec3 carRotation = glm::vec3(0, glm::radians(45.0f), 0);  // Facing northeast
glm::vec3 carScale = glm::vec3(2, 2, 2);  // Twice normal size

glm::mat4 modelMatrix = glm::mat4(1.0f);
modelMatrix = glm::translate(modelMatrix, carPosition);
modelMatrix = glm::rotate(modelMatrix, carRotation.y, glm::vec3(0, 1, 0));
modelMatrix = glm::scale(modelMatrix, carScale);

// Apply to vertices
for (auto& vertex : carVertices) {
    vertex.worldPosition = modelMatrix * glm::vec4(vertex.localPosition, 1.0f);
}
```

## World Space to View Space: View Transform

**World space** contains all objects in a unified coordinate system. The **view matrix** transforms from world space to **view space** (camera space), where the camera is at the origin looking down the -Z axis.

```
V = inverse of camera's model matrix

Or constructively:
V = lookAt(cameraPosition, targetPosition, upVector)
```

**lookAt Matrix Construction**:
```
Given:
  eye = camera position
  center = point camera looks at
  up = world up vector (usually (0, 1, 0))

Compute:
  forward = normalize(center - eye)
  right = normalize(cross(forward, up))
  up' = cross(right, forward)

View Matrix:
⎡  right.x    right.y    right.z   -dot(right, eye)   ⎤
⎢  up'.x      up'.y      up'.z     -dot(up', eye)     ⎥
⎢  -forward.x -forward.y -forward.z dot(forward, eye) ⎥
⎣  0          0          0          1                  ⎦
```

**Code**:
```cpp
// Camera looking at origin from (0, 5, 10)
glm::vec3 cameraPos = glm::vec3(0, 5, 10);
glm::vec3 target = glm::vec3(0, 0, 0);
glm::vec3 up = glm::vec3(0, 1, 0);

glm::mat4 viewMatrix = glm::lookAt(cameraPos, target, up);

// Alternative: FPS camera
class Camera {
    glm::vec3 position;
    glm::vec3 front = glm::vec3(0, 0, -1);
    glm::vec3 up = glm::vec3(0, 1, 0);
    float yaw = -90.0f, pitch = 0.0f;

    void updateVectors() {
        front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
        front.y = sin(glm::radians(pitch));
        front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
        front = glm::normalize(front);
    }

    glm::mat4 getViewMatrix() {
        return glm::lookAt(position, position + front, up);
    }
};
```

## View Space to Clip Space: Projection Transform

**Projection matrix** transforms from view space to clip space, applying either orthographic or perspective projection.

### Perspective Projection

Creates realistic foreshortening where distant objects appear smaller:

```cpp
glm::mat4 projection = glm::perspective(
    glm::radians(45.0f),  // FOV (field of view) in radians
    1920.0f / 1080.0f,    // Aspect ratio (width/height)
    0.1f,                 // Near plane distance
    100.0f                // Far plane distance
);
```

**Perspective Matrix** (simplified):
```
⎡ f/aspect   0      0           0        ⎤
⎢ 0          f      0           0        ⎥
⎢ 0          0   -(far+near)   -2far*near⎥
⎢                  ----------   ---------⎥
⎢                  far-near     far-near ⎥
⎣ 0          0     -1           0        ⎦

where f = 1/tan(fov/2)
```

**Effect**: Objects farther away compressed toward center (perspective).

### Orthographic Projection

Parallel projection with no foreshortening (used for 2D, CAD, technical drawings):

```cpp
glm::mat4 projection = glm::ortho(
    -10.0f, 10.0f,  // Left, right
    -10.0f, 10.0f,  // Bottom, top
    0.1f, 100.0f    // Near, far
);
```

**Orthographic Matrix**:
```
⎡ 2/(r-l)    0         0      -(r+l)/(r-l) ⎤
⎢ 0         2/(t-b)    0      -(t+b)/(t-b) ⎥
⎢ 0          0      -2/(f-n)  -(f+n)/(f-n) ⎥
⎣ 0          0         0           1       ⎦

where:
  l, r = left, right
  b, t = bottom, top
  n, f = near, far
```

**Effect**: Parallel lines remain parallel, no size change with distance.

## Clip Space to NDC: Perspective Division

**Clip space** is 4D homogeneous coordinates (x, y, z, w). The GPU performs **perspective division** to convert to **NDC**:

```
NDC.x = clip.x / clip.w
NDC.y = clip.y / clip.w
NDC.z = clip.z / clip.w

NDC coordinates in range [-1, 1] (OpenGL)
```

**Clipping** occurs in clip space before division:
- Vertices outside clip volume (x, y, z not in [-w, w]) are clipped
- Triangles partially outside are split

**Example**:
```cpp
// After projection
glm::vec4 clipPos = glm::vec4(2.0f, 1.5f, 0.8f, 2.0f);

// Perspective division
glm::vec3 ndc;
ndc.x = clipPos.x / clipPos.w;  // 2.0 / 2.0 = 1.0
ndc.y = clipPos.y / clipPos.w;  // 1.5 / 2.0 = 0.75
ndc.z = clipPos.z / clipPos.w;  // 0.8 / 2.0 = 0.4

// ndc = (1.0, 0.75, 0.4) - all in [-1, 1] range
```

## NDC to Screen Space: Viewport Transform

**Viewport transform** maps NDC to pixel coordinates:

```
screen.x = (ndc.x + 1) × (width / 2) + x_offset
screen.y = (ndc.y + 1) × (height / 2) + y_offset
screen.z = (ndc.z + 1) / 2  (maps [-1, 1] to [0, 1] for depth buffer)
```

**OpenGL**:
```cpp
glViewport(0, 0, 1920, 1080);  // x, y, width, height

// NDC (0.5, 0.25) maps to:
screen.x = (0.5 + 1) × (1920 / 2) + 0 = 1440
screen.y = (0.25 + 1) × (1080 / 2) + 0 = 675
```

**Split-screen example**:
```cpp
// Left half
glViewport(0, 0, windowWidth/2, windowHeight);
renderScene(leftCamera);

// Right half
glViewport(windowWidth/2, 0, windowWidth/2, windowHeight);
renderScene(rightCamera);
```

## Complete Pipeline Implementation

### Vertex Shader

```glsl
#version 450 core

// Vertex attributes
layout(location = 0) in vec3 aPosition;  // Object space
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoord;

// Transformation matrices
uniform mat4 uModel;       // Object → World
uniform mat4 uView;        // World → View
uniform mat4 uProjection;  // View → Clip

// Outputs to fragment shader
out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vTexCoord;

void main() {
    // Object → World
    vec4 worldPos = uModel * vec4(aPosition, 1.0);
    vWorldPos = worldPos.xyz;

    // Transform normal (use normal matrix for non-uniform scaling)
    mat3 normalMatrix = transpose(inverse(mat3(uModel)));
    vNormal = normalize(normalMatrix * aNormal);

    // Pass through texture coordinates
    vTexCoord = aTexCoord;

    // Complete transformation pipeline
    vec4 viewPos = uView * worldPos;       // World → View
    gl_Position = uProjection * viewPos;   // View → Clip

    // GPU automatically does:
    // - Clipping
    // - Perspective division (Clip → NDC)
    // - Viewport transform (NDC → Screen)
}
```

### CPU-Side Setup

```cpp
void renderFrame() {
    // 1. Create model matrix
    glm::mat4 model = glm::mat4(1.0f);
    model = glm::translate(model, objectPosition);
    model = glm::rotate(model, objectRotation.y, glm::vec3(0, 1, 0));
    model = glm::scale(model, objectScale);

    // 2. Create view matrix
    glm::mat4 view = camera.getViewMatrix();

    // 3. Create projection matrix
    glm::mat4 projection = glm::perspective(
        glm::radians(camera.fov),
        (float)windowWidth / windowHeight,
        0.1f,
        1000.0f
    );

    // 4. Send to shader
    shader.setMat4("uModel", model);
    shader.setMat4("uView", view);
    shader.setMat4("uProjection", projection);

    // 5. Draw
    glDrawElements(GL_TRIANGLES, mesh.indexCount, GL_UNSIGNED_INT, 0);
}
```

### Combined MVP Matrix

Often combined for efficiency:

```cpp
// Compute once on CPU
glm::mat4 mvp = projection * view * model;

shader.setMat4("uMVP", mvp);
```

```glsl
uniform mat4 uMVP;

void main() {
    gl_Position = uMVP * vec4(aPosition, 1.0);
}
```

**Trade-off**: Saves two matrix multiplications per vertex, but loses intermediate coordinates (can't do world-space lighting).

## Transformation Matrix Properties

### Model Matrix
- **Purpose**: Position object in world
- **Typical**: Translation, rotation, scale (SRT order)
- **Inverse**: Transforms from world to object space

### View Matrix
- **Purpose**: Transform world to camera viewpoint
- **Typical**: Inverse of camera's model matrix
- **Inverse**: Camera's transform in world space

### Projection Matrix
- **Purpose**: Apply perspective or orthographic projection
- **Typical**: Perspective for 3D, orthographic for 2D/UI
- **Inverse**: Rarely used (unprojection for ray picking)

### MVP Matrix
- **Purpose**: Complete vertex transformation
- **Typical**: Projection × View × Model
- **Inverse**: Useful for certain effects (requires separate M, V, P)

## Common Variations

### Model-View Matrix

Combine model and view:

```cpp
glm::mat4 modelView = view * model;

shader.setMat4("uModelView", modelView);
shader.setMat4("uProjection", projection);
```

```glsl
uniform mat4 uModelView;
uniform mat4 uProjection;

void main() {
    vec4 viewPos = uModelView * vec4(aPosition, 1.0);
    gl_Position = uProjection * viewPos;
}
```

**Benefit**: View-space position available for lighting.

### Normal Matrix

For correct normal transformation with non-uniform scaling:

```cpp
glm::mat3 normalMatrix = glm::transpose(glm::inverse(glm::mat3(model)));
shader.setMat3("uNormalMatrix", normalMatrix);
```

```glsl
uniform mat3 uNormalMatrix;

void main() {
    vNormal = normalize(uNormalMatrix * aNormal);
    // ...
}
```

## Debugging the Pipeline

### Visualize Coordinate Systems

```cpp
void renderCoordinateAxes(glm::mat4 transform) {
    // X-axis (red)
    drawLine(transform * glm::vec4(0,0,0,1),
             transform * glm::vec4(1,0,0,1),
             glm::vec3(1,0,0));

    // Y-axis (green)
    drawLine(transform * glm::vec4(0,0,0,1),
             transform * glm::vec4(0,1,0,1),
             glm::vec3(0,1,0));

    // Z-axis (blue)
    drawLine(transform * glm::vec4(0,0,0,1),
             transform * glm::vec4(0,0,1,1),
             glm::vec3(0,0,1));
}

// Visualize object space
renderCoordinateAxes(glm::mat4(1.0f));

// Visualize world space
renderCoordinateAxes(model);
```

### Check Matrix Validity

```cpp
bool isValidTransform(const glm::mat4& M) {
    // Check for NaN or Inf
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (std::isnan(M[i][j]) || std::isinf(M[i][j])) {
                return false;
            }
        }
    }

    // Check that w component is 1 for affine transforms
    if (abs(M[3][3] - 1.0f) > 1e-5) {
        return false;  // May not be affine
    }

    return true;
}
```

## Key Takeaways

- Complete pipeline: Object → World → View → Clip → NDC → Screen
- Model matrix: positions object in world (SRT order typical)
- View matrix: camera transformation (inverse of camera's model matrix)
- Projection matrix: applies perspective or orthographic projection
- Clip space: 4D homogeneous coordinates before division
- Perspective division: converts clip space to NDC (divide by w)
- Viewport transform: maps NDC to pixel coordinates
- MVP matrix: often combined for efficiency
- Normal transformation requires inverse-transpose for non-uniform scaling
- Understanding complete pipeline essential for debugging and advanced effects

Mastering the 3D transformation pipeline enables you to position objects, implement cameras, apply projections, and understand how vertices ultimately become pixels on screen.
