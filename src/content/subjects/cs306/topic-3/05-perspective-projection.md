# Perspective Projection

Perspective projection creates realistic 3D images by simulating how the human eye perceives depth—distant objects appear smaller than near objects. This foreshortening effect, along with the convergence of parallel lines to vanishing points, gives rendered scenes a sense of depth and realism. Understanding perspective projection is fundamental to 3D graphics, from games to visualization to virtual reality.

## Perspective Basics

**Perspective projection** maps 3D points to 2D image plane with **foreshortening**: objects farther away appear smaller.

```
Perspective projection rays converge at camera:

        Objects at different depths:
         ●      Far (appears small)
        /
       /   ●   Medium
      /   /
     /   /
    /   /  ● Near (appears large)
   /   / /
  /   / /
 /   / /
● ──/─/──── Image plane
 Camera

Rays converge → Far objects projected to smaller area
```

**Key properties**:
- Foreshortening (size inversely proportional to distance)
- Parallel lines converge to vanishing points
- Realistic depth perception
- Mimics human/camera vision

## Mathematical Derivation

### Pinhole Camera Model

Point $\mathbf{P} = (X, Y, Z)$ in camera space projects to point $\mathbf{p} = (x, y)$ on image plane:

By similar triangles:

$$\frac{x}{f} = \frac{X}{Z} \quad \Rightarrow \quad x = f \times \frac{X}{Z}$$

$$\frac{y}{f} = \frac{Y}{Z} \quad \Rightarrow \quad y = f \times \frac{Y}{Z}$$

where $f$ = focal length (distance to image plane)

**Division by Z** creates perspective effect.

### Homogeneous Coordinates

Cannot divide by Z directly in matrix multiplication. Solution: **homogeneous coordinates**.

**Perspective matrix** sets $w = Z$, then GPU divides by $w$:

$$\begin{bmatrix} f & 0 & 0 & 0 \\ 0 & f & 0 & 0 \\ 0 & 0 & ? & ? \\ 0 & 0 & 1 & 0 \end{bmatrix} \begin{bmatrix} X \\ Y \\ Z \\ 1 \end{bmatrix} = \begin{bmatrix} fX \\ fY \\ ? \\ Z \end{bmatrix}$$

After perspective division ($\div Z$):

$$x' = \frac{fX}{Z}, \quad y' = \frac{fY}{Z}$$

## Perspective Projection Matrix

The complete perspective matrix maps view frustum to NDC cube.

### View Frustum

```
Perspective frustum (truncated pyramid):

         Far plane
        ┌──────────┐
       /│         /│
      / │        / │
     /  │       /  │
    /   │      /   │
   /    │     /    │
  /  Near    /     │
 /  ┌───┐  /      │
/   │   │ /       │
────│───│────────┘
    └───┘
    ● Camera
```

**Parameters**:
- **FOV** (field of view): viewing angle
- **Aspect ratio**: width / height
- **Near plane**: closest visible distance
- **Far plane**: farthest visible distance

### Derivation

Map frustum to NDC cube [-1, 1]³.

**X and Y scaling** (based on FOV):

$$\tan\left(\frac{\text{FOV}}{2}\right) = \frac{\text{width}/2}{\text{near}}$$

Scale factor: $\frac{1}{\tan(\text{FOV}/2)}$

For aspect ratio correction:

$$s_x = \frac{1}{\text{aspect} \times \tan(\text{FOV}/2)}$$

$$s_y = \frac{1}{\tan(\text{FOV}/2)}$$

**Z mapping** (near/far to [-1, 1] or [0, 1]):

Map $[\text{near}, \text{far}]$ to $[-1, 1]$ (OpenGL)

After perspective division:

$$z' = \frac{A \cdot Z + B}{Z} = A + \frac{B}{Z}$$

Constraints:
- $Z = \text{near} \Rightarrow z' = -1$
- $Z = \text{far} \Rightarrow z' = 1$

Solving:

$$A = -\frac{\text{far} + \text{near}}{\text{far} - \text{near}}$$

$$B = -\frac{2 \cdot \text{far} \cdot \text{near}}{\text{far} - \text{near}}$$

**Complete matrix** (OpenGL):

$$\mathbf{P} = \begin{bmatrix}
\frac{1}{\text{aspect} \cdot \tan(\text{FOV}/2)} & 0 & 0 & 0 \\
0 & \frac{1}{\tan(\text{FOV}/2)} & 0 & 0 \\
0 & 0 & -\frac{\text{far}+\text{near}}{\text{far}-\text{near}} & -\frac{2 \cdot \text{far} \cdot \text{near}}{\text{far}-\text{near}} \\
0 & 0 & -1 & 0
\end{bmatrix}$$

### GLM Implementation

```cpp
// Create perspective projection
float fov = glm::radians(60.0f);   // 60-degree vertical FOV
float aspect = 1920.0f / 1080.0f;  // 16:9 aspect ratio
float near = 0.1f;                 // Near plane at 0.1 units
float far = 100.0f;                // Far plane at 100 units

glm::mat4 projection = glm::perspective(fov, aspect, near, far);
```

**Manual construction**:
```cpp
glm::mat4 createPerspective(float fov, float aspect, float near, float far) {
    float tanHalfFov = tan(fov / 2.0f);

    glm::mat4 result = glm::mat4(0.0f);

    result[0][0] = 1.0f / (aspect * tanHalfFov);
    result[1][1] = 1.0f / tanHalfFov;
    result[2][2] = -(far + near) / (far - near);
    result[2][3] = -1.0f;
    result[3][2] = -(2.0f * far * near) / (far - near);

    return result;
}
```

## Field of View (FOV)

FOV determines how much of the scene is visible.

```
Narrow FOV (30°):         Wide FOV (90°):
    │  ╱│╲                    ╱│╲
    │ ╱ │ ╲                  ╱ │ ╲
    │╱  │  ╲                ╱  │  ╲
    ●───│───               ●───│───
   Camera                 Camera

Less visible,             More visible,
telephoto lens            wide-angle lens
```

**Human vision**: ~90-110° horizontal, ~60-80° vertical

**Common FOV values**:
- **60-75°**: Standard for games (balances realism and visibility)
- **90-110°**: Wide FOV for fast-paced games (Quake-style)
- **30-45°**: Narrow FOV for zoom/sniper scopes
- **30°**: Cinematographic feel

**Code**:
```cpp
// Zoom effect by changing FOV
float baseFOV = glm::radians(60.0f);
float zoomFOV = glm::radians(30.0f);  // 2× zoom
float currentFOV = glm::mix(baseFOV, zoomFOV, zoomAmount);

glm::mat4 projection = glm::perspective(currentFOV, aspect, near, far);
```

## Aspect Ratio

**Aspect ratio** = width / height, corrects for non-square viewports.

```
Wrong aspect (1.0):       Correct aspect (16/9):
  ●                         ●
  │                        ╱│╲
  │   Tall, narrow        ╱ │ ╲
  │                      ╱  │  ╲

Stretching artifacts    Proper proportions
```

**Handling window resize**:
```cpp
void onWindowResize(int width, int height) {
    glViewport(0, 0, width, height);

    float aspect = (float)width / (float)height;
    projection = glm::perspective(glm::radians(60.0f), aspect, 0.1f, 100.0f);
}
```

## Near and Far Planes

Define depth range of visible scene.

### Near Plane

**Too close** (e.g., 0.001):
- Z-fighting (depth buffer precision issues)
- Jittering

**Too far** (e.g., 10.0):
- Close objects clipped
- Can't see nearby geometry

**Typical**: 0.1 to 1.0 units

### Far Plane

**Too close** (e.g., 10.0):
- Distant geometry clipped
- Limited viewing distance

**Too far** (e.g., 100000.0):
- Z-fighting (depth precision loss)
- Wasted precision on distant objects

**Typical**: 100 to 1000 units

### Depth Precision

Depth buffer precision is **non-linear** with perspective:

```
Precision distribution:
Near plane ████████████│      │   Far plane
           High precision Low precision

Most precision near camera, very little at distance
```

**Formula**:
```
Z_buffer = (1/Z - 1/near) / (1/far - 1/near)

Non-linear: more precision near, less far
```

**Best practices**:
- Keep near/far ratio as small as possible
- Use logarithmic depth buffer for large ranges
- Reversed-Z technique (map far to 0, near to 1)

## Infinite Perspective Projection

Push far plane to infinity:

```
lim (far → ∞) perspective matrix:

⎡ 1/(aspect×tan(FOV/2))    0          0        0    ⎤
⎢ 0                    1/tan(FOV/2)   0        0    ⎥
⎢ 0                         0        -1    -2×near ⎥
⎣ 0                         0        -1        0    ⎦
```

**Benefits**:
- No far plane clipping
- Simplified matrix

**Drawbacks**:
- Precision issues at extreme distances
- Sky/background requires special handling

```cpp
glm::mat4 infinitePerspective(float fov, float aspect, float near) {
    float f = 1.0f / tan(fov / 2.0f);

    glm::mat4 result = glm::mat4(0.0f);
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -1.0f;
    result[2][3] = -1.0f;
    result[3][2] = -2.0f * near;

    return result;
}
```

## Off-Center Projection

Asymmetric frustum for VR, portals, oblique viewing:

```cpp
glm::mat4 frustum = glm::frustum(
    left, right,    // X bounds (can be asymmetric)
    bottom, top,    // Y bounds (can be asymmetric)
    near, far       // Z bounds
);

// Example: Shifted view for left eye in VR
float eyeOffset = 0.032f;  // 32mm IPD / 2
glm::mat4 leftEye = glm::frustum(
    -aspect + eyeOffset, aspect + eyeOffset,
    -1.0f, 1.0f,
    near, far
);
```

## Practical Applications

### Dynamic FOV

```cpp
// FOV changes with movement speed (racing game effect)
float baseFOV = glm::radians(60.0f);
float speedFOV = glm::radians(90.0f);
float speedFactor = glm::clamp(velocity / maxVelocity, 0.0f, 1.0f);

float fov = glm::mix(baseFOV, speedFOV, speedFactor);
projection = glm::perspective(fov, aspect, near, far);
```

### Zoom Implementation

```cpp
class Camera {
    float baseFOV = glm::radians(60.0f);
    float currentZoom = 1.0f;

    glm::mat4 getProjection() {
        // Zoom by reducing FOV
        float fov = baseFOV / currentZoom;
        return glm::perspective(fov, aspect, near, far);
    }

    void zoom(float delta) {
        currentZoom = glm::clamp(currentZoom + delta, 1.0f, 10.0f);
    }
};
```

### Split-Screen Rendering

```cpp
// Player 1: Top half, adjusted aspect ratio
glViewport(0, height/2, width, height/2);
float aspect1 = (float)width / (float)(height/2);
glm::mat4 proj1 = glm::perspective(fov, aspect1, near, far);
renderPlayer(1, proj1);

// Player 2: Bottom half
glViewport(0, 0, width, height/2);
glm::mat4 proj2 = glm::perspective(fov, aspect1, near, far);
renderPlayer(2, proj2);
```

## Debugging Perspective Issues

### Visualize Frustum

```cpp
void drawFrustum(glm::mat4 viewProj) {
    // Extract frustum corners in NDC
    glm::vec4 corners[8] = {
        {-1, -1, -1, 1}, {1, -1, -1, 1}, {1, 1, -1, 1}, {-1, 1, -1, 1},  // Near
        {-1, -1, 1, 1}, {1, -1, 1, 1}, {1, 1, 1, 1}, {-1, 1, 1, 1}       // Far
    };

    glm::mat4 invVP = glm::inverse(viewProj);

    // Transform to world space
    for (int i = 0; i < 8; i++) {
        corners[i] = invVP * corners[i];
        corners[i] /= corners[i].w;
    }

    // Draw frustum edges
    drawLine(corners[0], corners[1]);  // Near plane edges
    drawLine(corners[1], corners[2]);
    // ... etc
}
```

### Check Z-Fighting

```cpp
// Calculate depth precision at distance
float depthPrecisionAtZ(float z, float near, float far) {
    float a = -(far + near) / (far - near);
    float b = -2.0f * far * near / (far - near);

    float z_ndc = (a * z + b) / z;
    float derivative = b / (z * z);  // dz_ndc / dz

    return 1.0f / abs(derivative);  // Smaller = less precision
}

// Log precision at various depths
for (float z = near; z <= far; z *= 2.0f) {
    float precision = depthPrecisionAtZ(z, near, far);
    std::cout << "Precision at " << z << ": " << precision << std::endl;
}
```

## Key Takeaways

- Perspective projection creates realistic foreshortening effect
- Division by depth (Z) creates size decrease with distance
- Projection matrix encodes FOV, aspect ratio, near/far planes
- FOV determines viewing angle (human vision ~60-90°)
- Aspect ratio corrects for non-square viewports
- Near/far planes define depth range, affect precision
- Depth precision non-linear (more near, less far)
- Keep near/far ratio minimal for best precision
- Symmetric frustum for standard view, asymmetric for VR/portals
- Understanding perspective essential for realistic 3D rendering

Mastering perspective projection enables you to create convincing 3D scenes with proper depth perception and realistic visual characteristics.
