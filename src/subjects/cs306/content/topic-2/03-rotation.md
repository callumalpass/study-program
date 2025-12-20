# Rotation Transformations

Rotation is one of the most important transformations in computer graphics, enabling objects to orient themselves in 3D space. Unlike translation and scaling, rotation involves trigonometry and requires careful understanding of coordinate systems and rotation axes. This section covers 2D and 3D rotations, their matrix representations, and practical implementation considerations.

## 2D Rotation

2D rotation spins points around the origin in the xy-plane.

### Rotation Matrix

A counter-clockwise rotation by angle θ around the origin:

```
x' = x cos θ - y sin θ
y' = x sin θ + y cos θ

Matrix form:
⎡ cos θ  -sin θ  0 ⎤   ⎡ x ⎤   ⎡ x cos θ - y sin θ ⎤
⎢ sin θ   cos θ  0 ⎥ × ⎢ y ⎥ = ⎢ x sin θ + y cos θ ⎥
⎣  0       0     1 ⎦   ⎣ 1 ⎦   ⎣         1          ⎦
```

**Derivation** from polar coordinates:
```
Point (x, y) in polar form:
x = r cos α
y = r sin α

After rotation by θ:
x' = r cos(α + θ) = r(cos α cos θ - sin α sin θ) = x cos θ - y sin θ
y' = r sin(α + θ) = r(sin α cos θ + cos α sin θ) = x sin θ + y cos θ
```

### Example: Rotate 90° CCW

```cpp
float angle = glm::radians(90.0f);  // 90 degrees to radians

glm::mat3 R = glm::mat3(
    cos(angle), sin(angle), 0,   // Column 0
   -sin(angle), cos(angle), 0,   // Column 1
    0,          0,          1    // Column 2
);

// Or using GLM helper (note: GLM uses column-major matrices)
glm::mat4 R4 = glm::rotate(glm::mat4(1.0f), angle, glm::vec3(0, 0, 1));

glm::vec3 point = glm::vec3(1, 0, 1);  // Point at (1, 0)
glm::vec3 rotated = R * point;          // Result: (0, 1, 1)

// (1, 0) rotated 90° CCW → (0, 1)
```

### Rotation Direction Convention

**Counter-clockwise** (CCW) is positive by mathematical convention (right-hand rule):

```
    Y
    │   ●' (rotated)
    │  /
    │ / θ
    │/────────  X
    ●  (original)

θ > 0: Counter-clockwise
θ < 0: Clockwise
```

**Clockwise rotation**: Negate the angle or swap sin terms

```
Clockwise by θ = CCW by -θ

⎡  cos θ   sin θ  0 ⎤
⎢ -sin θ   cos θ  0 ⎥
⎣   0       0     1 ⎦
```

### Properties of 2D Rotation

**Preserves**:
- Distances from origin
- Angles between vectors
- Shapes and sizes
- Orientation (handedness)

**Does NOT preserve**:
- Coordinates (rotates them)

**Composition**: Rotations add
```
R(θ1) × R(θ2) = R(θ1 + θ2)

Rotate 30° then 45° = Rotate 75°
```

**Inverse**: Rotation by negative angle
```
R^(-1)(θ) = R(-θ)

⎡ cos θ   sin θ  0 ⎤
⎢ -sin θ  cos θ  0 ⎥
⎣  0       0     1 ⎦
```

Also: Transpose equals inverse for rotation matrices
```
R^T = R^(-1)  (orthogonal matrix property)
```

### Rotation About Arbitrary Point

To rotate about point P (not origin):

1. Translate P to origin: T(-P)
2. Rotate: R(θ)
3. Translate back: T(P)

```
Combined: T(P) × R(θ) × T(-P)
```

```cpp
glm::vec2 center = glm::vec2(5, 3);
float angle = glm::radians(45.0f);

glm::mat4 transform =
    glm::translate(glm::mat4(1.0f), glm::vec3(center, 0)) *
    glm::rotate(glm::mat4(1.0f), angle, glm::vec3(0, 0, 1)) *
    glm::translate(glm::mat4(1.0f), glm::vec3(-center, 0));
```

## 3D Rotation

3D rotation is more complex—we rotate around an **axis** rather than a point.

### Principal Axis Rotations

Rotation around the three coordinate axes:

**Rotation around X-axis** (pitch):
```
⎡ 1    0        0     0 ⎤
⎢ 0  cos θ  -sin θ   0 ⎥
⎢ 0  sin θ   cos θ   0 ⎥
⎣ 0    0        0     1 ⎦

Rotates in YZ plane
```

**Rotation around Y-axis** (yaw):
```
⎡  cos θ   0  sin θ  0 ⎤
⎢    0     1    0    0 ⎥
⎢ -sin θ   0  cos θ  0 ⎥
⎣    0     0    0    1 ⎦

Rotates in XZ plane
Note: Different sign pattern due to right-hand rule
```

**Rotation around Z-axis** (roll):
```
⎡ cos θ  -sin θ  0  0 ⎤
⎢ sin θ   cos θ  0  0 ⎥
⎢   0       0    1  0 ⎥
⎣   0       0    0  1 ⎦

Rotates in XY plane (same as 2D rotation)
```

### Right-Hand Rule

Determine rotation direction using right-hand rule:

```
1. Point thumb along rotation axis
2. Fingers curl in positive rotation direction

For Y-axis:
    Thumb up (Y+)
    Fingers curl X → Z → -X → -Z
```

**Code**:
```cpp
// Rotate 45° around X-axis
glm::mat4 Rx = glm::rotate(glm::mat4(1.0f),
                           glm::radians(45.0f),
                           glm::vec3(1, 0, 0));

// Rotate 30° around Y-axis
glm::mat4 Ry = glm::rotate(glm::mat4(1.0f),
                           glm::radians(30.0f),
                           glm::vec3(0, 1, 0));

// Rotate 60° around Z-axis
glm::mat4 Rz = glm::rotate(glm::mat4(1.0f),
                           glm::radians(60.0f),
                           glm::vec3(0, 0, 1));
```

### Euler Angles

**Euler angles** represent orientation as three rotations around principal axes.

**Common conventions**:
- **XYZ (Roll-Pitch-Yaw)**: Used in aviation
- **ZYX**: Common in robotics
- **ZXZ**: Physics and engineering

**Example: Yaw-Pitch-Roll (Y-X-Z)**:
```cpp
float yaw = glm::radians(45.0f);    // Around Y
float pitch = glm::radians(30.0f);  // Around X
float roll = glm::radians(15.0f);   // Around Z

// Order matters!
glm::mat4 rotation =
    glm::rotate(glm::mat4(1.0f), yaw, glm::vec3(0, 1, 0)) *
    glm::rotate(glm::mat4(1.0f), pitch, glm::vec3(1, 0, 0)) *
    glm::rotate(glm::mat4(1.0f), roll, glm::vec3(0, 0, 1));

// Or using GLM Euler helper:
glm::quat quaternion = glm::quat(glm::vec3(pitch, yaw, roll));
glm::mat4 rotation2 = glm::mat4_cast(quaternion);
```

### Gimbal Lock Problem

**Gimbal lock** occurs when two rotation axes align, losing one degree of freedom:

```
Example: Pitch to 90°
    Initially:          After pitch 90°:
    Y                       Z
    │                       │
    │                       │
    └──X                    └──X
   /                       /
  Z                       Y (was Z)

Roll and Yaw now rotate around same axis!
Lost ability to rotate independently
```

**Solution**: Use quaternions (covered in later section)

### Arbitrary Axis Rotation

**Rodrigues' rotation formula** rotates around arbitrary axis **k** by angle θ:

```
R(k, θ) = I + sin(θ)K + (1 - cos(θ))K²

where K is the skew-symmetric matrix of k = (kx, ky, kz):

K = ⎡  0   -kz   ky ⎤
    ⎢  kz   0   -kx ⎥
    ⎣ -ky   kx   0  ⎦
```

**Full matrix form**:
```
⎡ kx²(1-c)+c    kxky(1-c)-kzs  kxkz(1-c)+kys  0 ⎤
⎢ kykx(1-c)+kzs  ky²(1-c)+c    kykz(1-c)-kxs  0 ⎥
⎢ kzkx(1-c)-kys  kzky(1-c)+kxs  kz²(1-c)+c    0 ⎥
⎣     0              0              0         1 ⎦

where:
  c = cos θ
  s = sin θ
  k = (kx, ky, kz) is normalized axis
```

**GLM handles this**:
```cpp
glm::vec3 axis = glm::normalize(glm::vec3(1, 1, 0));  // Diagonal axis
float angle = glm::radians(60.0f);

glm::mat4 R = glm::rotate(glm::mat4(1.0f), angle, axis);
// GLM uses Rodrigues' formula internally
```

### Extracting Rotation Axis and Angle

Given rotation matrix R, extract axis k and angle θ:

```
θ = arccos((trace(R) - 1) / 2)

where trace(R) = R[0][0] + R[1][1] + R[2][2]

Axis k:
kx = (R[2][1] - R[1][2]) / (2 sin θ)
ky = (R[0][2] - R[2][0]) / (2 sin θ)
kz = (R[1][0] - R[0][1]) / (2 sin θ)
```

**Code**:
```cpp
float trace = rotation[0][0] + rotation[1][1] + rotation[2][2];
float angle = acos((trace - 1.0f) / 2.0f);

glm::vec3 axis;
axis.x = rotation[2][1] - rotation[1][2];
axis.y = rotation[0][2] - rotation[2][0];
axis.z = rotation[1][0] - rotation[0][1];
axis = glm::normalize(axis / (2.0f * sin(angle)));
```

## Rotation and Normals

Rotation matrices correctly transform normals (unlike scaling):

```cpp
// For rotation-only matrices, this is sufficient:
vec3 transformedNormal = mat3(modelMatrix) * normal;

// Even better (works for rotation + uniform scale):
vec3 transformedNormal = normalize(mat3(modelMatrix) * normal);

// For general case (with non-uniform scale):
mat3 normalMatrix = transpose(inverse(mat3(modelMatrix)));
vec3 transformedNormal = normalize(normalMatrix * normal);
```

## Practical Applications

### Camera Rotation (FPS-style)

```cpp
class FPSCamera {
    float yaw = -90.0f;     // Initialized to look along -Z
    float pitch = 0.0f;

    glm::vec3 front;
    glm::vec3 right;
    glm::vec3 up;

    void updateVectors() {
        // Calculate front vector from Euler angles
        front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
        front.y = sin(glm::radians(pitch));
        front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
        front = glm::normalize(front);

        right = glm::normalize(glm::cross(front, glm::vec3(0, 1, 0)));
        up = glm::normalize(glm::cross(right, front));
    }

    void rotate(float yawOffset, float pitchOffset) {
        yaw += yawOffset;
        pitch += pitchOffset;

        // Constrain pitch
        if (pitch > 89.0f) pitch = 89.0f;
        if (pitch < -89.0f) pitch = -89.0f;

        updateVectors();
    }
};
```

### Billboard Rotation

Make sprites always face camera:

```cpp
glm::vec3 billboardPos = glm::vec3(5, 2, 3);
glm::vec3 cameraPos = glm::vec3(0, 0, 10);

// Calculate direction from billboard to camera
glm::vec3 lookDir = glm::normalize(cameraPos - billboardPos);

// Create rotation that aligns -Z with lookDir
glm::mat4 billboardRotation = glm::inverse(glm::lookAt(
    glm::vec3(0),
    lookDir,
    glm::vec3(0, 1, 0)
));

glm::mat4 model = glm::mat4(1.0f);
model = glm::translate(model, billboardPos);
model *= billboardRotation;
```

### Rotating Around Object's Own Axis

```cpp
// Rotate object around its own up vector (not world Y)
glm::mat4 currentTransform = object.getTransform();
glm::vec3 objectUp = glm::vec3(currentTransform[1]);  // Second column

glm::mat4 rotation = glm::rotate(glm::mat4(1.0f),
                                 glm::radians(45.0f),
                                 objectUp);

object.setTransform(currentTransform * rotation);
```

## Key Takeaways

- 2D rotation uses trigonometric matrix with cos θ and sin θ
- Counter-clockwise is positive rotation by convention (right-hand rule)
- 3D rotation occurs around an axis (not a point)
- Principal axes: X (pitch), Y (yaw), Z (roll)
- Euler angles represent orientation but suffer from gimbal lock
- Rodrigues' formula rotates around arbitrary axis
- Rotation matrices are orthogonal: R^T = R^(-1)
- Rotation preserves distances, angles, and shapes
- Multiple rotations compose through matrix multiplication
- Rotation order matters significantly in 3D
- Quaternions solve gimbal lock (covered in later section)

Understanding rotation is essential for orienting objects, implementing cameras, and creating realistic animations in 3D graphics.
