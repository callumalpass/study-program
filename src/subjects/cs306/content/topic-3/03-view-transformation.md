# View Transformation

The view transformation positions the virtual camera and reorients the coordinate system so that the camera sits at the origin looking down the negative Z-axis. This transformation is fundamental to the graphics pipeline, converting from world coordinates—where objects are positioned—to camera coordinates—where rendering calculations occur. Understanding view transformation construction and manipulation is essential for implementing camera systems.

## Purpose of View Transformation

The **view transformation** (view matrix) accomplishes two goals:

1. **Translate** world so camera is at origin
2. **Rotate** world so camera looks down -Z axis

**Result**: Simplified rendering calculations in camera-centered space.

```
World Space:                Camera Space:
    Y                           Y
    │                           │
    │   ●────→ Camera          ● Camera (at origin)
    │   (5,2,10)               │
    └────X                     └────X
   /                          /
  Z                          Z (looks this direction)
```

## View Matrix as Inverse Camera Transform

If the camera has model matrix **C** (position and orientation in world), the view matrix is:

```
V = C^(-1)
```

**Reasoning**: To make camera the center, apply inverse of camera's transform to world.

**Example**:
```cpp
// Camera at (0, 5, 10) looking at origin
glm::mat4 cameraTransform = glm::mat4(1.0f);
cameraTransform = glm::translate(cameraTransform, glm::vec3(0, 5, 10));
// ... apply rotations

// View matrix is inverse
glm::mat4 viewMatrix = glm::inverse(cameraTransform);
```

## lookAt Matrix Construction

The **lookAt** function constructs a view matrix from intuitive parameters:

```cpp
glm::mat4 glm::lookAt(
    vec3 eye,     // Camera position
    vec3 center,  // Point camera looks at
    vec3 up       // "Up" direction (usually (0, 1, 0))
)
```

### Algorithm

**1. Compute camera coordinate frame**:

```
// Forward: from camera toward target (negated for -Z convention)
forward = normalize(center - eye)

// Right: perpendicular to forward and up
right = normalize(cross(forward, up))

// Camera up: perpendicular to right and forward
cameraUp = cross(right, forward)
```

**2. Build rotation matrix**:

Camera axes form columns (or rows, depending on convention):

```
R = ⎡  right.x    cameraUp.x   -forward.x  ⎤
    ⎢  right.y    cameraUp.y   -forward.y  ⎥
    ⎣  right.z    cameraUp.z   -forward.z  ⎦

Negative forward because camera looks down -Z
```

**3. Build translation**:

```
T = translate(-eye)

Result: Camera at origin
```

**4. Combine**:

```
V = R × T

Full matrix:
⎡  right.x    cameraUp.x   -forward.x    0  ⎤
⎢  right.y    cameraUp.y   -forward.y    0  ⎥
⎢  right.z    cameraUp.z   -forward.z    0  ⎥
⎣ -dot(right,eye) -dot(cameraUp,eye) dot(forward,eye) 1 ⎦
```

### Implementation

```cpp
glm::mat4 lookAt(glm::vec3 eye, glm::vec3 center, glm::vec3 worldUp) {
    // Compute camera basis vectors
    glm::vec3 forward = glm::normalize(center - eye);
    glm::vec3 right = glm::normalize(glm::cross(forward, worldUp));
    glm::vec3 up = glm::cross(right, forward);

    // Build view matrix
    glm::mat4 view = glm::mat4(1.0f);

    // Rotation part (transpose of camera orientation)
    view[0][0] = right.x;
    view[1][0] = right.y;
    view[2][0] = right.z;

    view[0][1] = up.x;
    view[1][1] = up.y;
    view[2][1] = up.z;

    view[0][2] = -forward.x;  // Negative: look down -Z
    view[1][2] = -forward.y;
    view[2][2] = -forward.z;

    // Translation part
    view[3][0] = -glm::dot(right, eye);
    view[3][1] = -glm::dot(up, eye);
    view[3][2] = glm::dot(forward, eye);

    return view;
}
```

## FPS Camera View Matrix

First-person camera with pitch and yaw:

```cpp
class FPSCamera {
    glm::vec3 position;
    float yaw = -90.0f;   // Start looking along -Z
    float pitch = 0.0f;

    glm::vec3 front;
    glm::vec3 right;
    glm::vec3 up;

    void updateVectors() {
        // Calculate front from Euler angles
        front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
        front.y = sin(glm::radians(pitch));
        front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
        front = glm::normalize(front);

        // Calculate right and up
        right = glm::normalize(glm::cross(front, glm::vec3(0, 1, 0)));
        up = glm::normalize(glm::cross(right, front));
    }

    glm::mat4 getViewMatrix() {
        return glm::lookAt(position, position + front, up);
    }

    // Alternative: Manual construction
    glm::mat4 getViewMatrixManual() {
        glm::mat4 view;

        // Rotation
        view[0] = glm::vec4(right, 0);
        view[1] = glm::vec4(up, 0);
        view[2] = glm::vec4(-front, 0);

        // Translation
        view[3] = glm::vec4(
            -glm::dot(right, position),
            -glm::dot(up, position),
            glm::dot(front, position),
            1
        );

        return view;
    }
};
```

## Orbit Camera View Matrix

Camera orbiting around target:

```cpp
class OrbitCamera {
    glm::vec3 target;
    float distance = 10.0f;
    float azimuth = 0.0f;    // Horizontal angle (yaw)
    float elevation = 30.0f; // Vertical angle (pitch)

    glm::vec3 getPosition() {
        // Spherical to Cartesian conversion
        float x = distance * cos(glm::radians(elevation)) * sin(glm::radians(azimuth));
        float y = distance * sin(glm::radians(elevation));
        float z = distance * cos(glm::radians(elevation)) * cos(glm::radians(azimuth));

        return target + glm::vec3(x, y, z);
    }

    glm::mat4 getViewMatrix() {
        return glm::lookAt(getPosition(), target, glm::vec3(0, 1, 0));
    }
};
```

## View Space Properties

### Camera-Centered Coordinates

In view space:
- Camera at (0, 0, 0)
- Looks down -Z axis
- +X points right
- +Y points up

**Benefits**:
- Simplified lighting (camera-relative)
- Easy depth calculation (Z-coordinate)
- Convenient culling tests

### Transforming Normals

Normals require special handling:

```cpp
// Wrong
vec3 viewNormal = mat3(viewMatrix) * worldNormal;

// Correct
mat3 normalMatrix = transpose(inverse(mat3(viewMatrix)));
vec3 viewNormal = normalMatrix * worldNormal;

// For view matrix (often just rotation + translation):
// Rotation matrices are orthogonal, so:
mat3 normalMatrix = mat3(viewMatrix);  // Often sufficient
vec3 viewNormal = normalize(normalMatrix * worldNormal);
```

## Common View Matrix Operations

### Extracting Camera Position

```cpp
// View matrix is inverse of camera transform
// Camera position in world space:
glm::vec3 getCameraPosition(const glm::mat4& viewMatrix) {
    glm::mat4 invView = glm::inverse(viewMatrix);
    return glm::vec3(invView[3]);
}
```

### Extracting Camera Direction

```cpp
glm::vec3 getCameraForward(const glm::mat4& viewMatrix) {
    // Third column (negated)
    return -glm::vec3(viewMatrix[2]);
}

glm::vec3 getCameraRight(const glm::mat4& viewMatrix) {
    // First column
    return glm::vec3(viewMatrix[0]);
}

glm::vec3 getCameraUp(const glm::mat4& viewMatrix) {
    // Second column
    return glm::vec3(viewMatrix[1]);
}
```

### Billboarding

Make sprites face camera:

```cpp
glm::mat4 createBillboard(glm::vec3 position, glm::mat4 viewMatrix) {
    // Extract camera right and up from view matrix
    glm::vec3 right = glm::vec3(viewMatrix[0]);
    glm::vec3 up = glm::vec3(viewMatrix[1]);
    glm::vec3 forward = -glm::vec3(viewMatrix[2]);

    // Build model matrix facing camera
    glm::mat4 billboard;
    billboard[0] = glm::vec4(right, 0);
    billboard[1] = glm::vec4(up, 0);
    billboard[2] = glm::vec4(forward, 0);
    billboard[3] = glm::vec4(position, 1);

    return billboard;
}
```

## View Frustum Culling

Test if objects are visible:

```cpp
// Extract frustum planes from view-projection matrix
struct Frustum {
    glm::vec4 planes[6];  // Left, right, bottom, top, near, far

    void extractFromVP(glm::mat4 vp) {
        // Left plane
        planes[0] = glm::vec4(vp[0][3] + vp[0][0],
                              vp[1][3] + vp[1][0],
                              vp[2][3] + vp[2][0],
                              vp[3][3] + vp[3][0]);

        // Right plane
        planes[1] = glm::vec4(vp[0][3] - vp[0][0],
                              vp[1][3] - vp[1][0],
                              vp[2][3] - vp[2][0],
                              vp[3][3] - vp[3][0]);

        // ... extract other planes similarly

        // Normalize
        for (int i = 0; i < 6; i++) {
            float length = glm::length(glm::vec3(planes[i]));
            planes[i] /= length;
        }
    }

    bool isVisible(glm::vec3 center, float radius) {
        for (int i = 0; i < 6; i++) {
            float distance = glm::dot(glm::vec3(planes[i]), center) + planes[i].w;
            if (distance < -radius) {
                return false;  // Outside frustum
            }
        }
        return true;  // Inside or intersecting
    }
};
```

## Shader Implementation

```glsl
// Vertex shader
#version 450 core

layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

out vec3 vViewPos;
out vec3 vViewNormal;

void main() {
    // Transform to view space
    vec4 viewPos = uView * uModel * vec4(aPosition, 1.0);
    vViewPos = viewPos.xyz;

    // Transform normal to view space
    mat3 normalMatrix = transpose(inverse(mat3(uView * uModel)));
    vViewNormal = normalize(normalMatrix * aNormal);

    // Complete transformation
    gl_Position = uProjection * viewPos;
}

// Fragment shader - lighting in view space
#version 450 core

in vec3 vViewPos;
in vec3 vViewNormal;

uniform vec3 uLightPosView;  // Light in view space

out vec4 fragColor;

void main() {
    vec3 N = normalize(vViewNormal);
    vec3 L = normalize(uLightPosView - vViewPos);

    float diff = max(dot(N, L), 0.0);
    fragColor = vec4(vec3(diff), 1.0);
}
```

## Debugging View Matrices

### Visualize Camera

```cpp
void renderCameraGizmo(glm::mat4 viewMatrix) {
    glm::mat4 invView = glm::inverse(viewMatrix);
    glm::vec3 pos = glm::vec3(invView[3]);
    glm::vec3 forward = -glm::vec3(invView[2]);
    glm::vec3 right = glm::vec3(invView[0]);
    glm::vec3 up = glm::vec3(invView[1]);

    // Draw axes
    drawLine(pos, pos + forward * 2.0f, glm::vec3(0, 0, 1));  // Blue forward
    drawLine(pos, pos + right * 1.0f, glm::vec3(1, 0, 0));    // Red right
    drawLine(pos, pos + up * 1.0f, glm::vec3(0, 1, 0));       // Green up

    // Draw frustum outline
    drawFrustum(viewMatrix, projectionMatrix);
}
```

### Validate View Matrix

```cpp
bool isValidViewMatrix(const glm::mat4& view) {
    // Check for NaN/Inf
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            if (std::isnan(view[i][j]) || std::isinf(view[i][j])) {
                return false;
            }
        }
    }

    // View matrix should have [0 0 0 1] in last row
    if (abs(view[3][3] - 1.0f) > 1e-5) {
        return false;
    }

    return true;
}
```

## Key Takeaways

- View transformation positions camera at origin, looking down -Z
- View matrix is inverse of camera's model transform
- lookAt constructs view matrix from eye, target, and up vector
- lookAt algorithm: compute camera basis, build rotation, apply translation
- FPS camera uses pitch/yaw to calculate front vector
- Orbit camera uses spherical coordinates around target
- View space simplifies lighting and depth calculations
- Extract camera position/direction from view matrix for various effects
- Frustum culling uses view-projection matrix to reject invisible objects
- Understanding view transformation essential for camera implementation

Mastering view transformation enables you to create flexible, intuitive camera systems for any graphics application.
