# Quaternions

Quaternions provide an elegant and robust alternative to Euler angles for representing 3D rotations. While less intuitive than Euler angles, quaternions avoid gimbal lock, enable smooth interpolation, and require less storage and computation than rotation matrices. They're essential for animation, character control, and any application requiring stable, interpolatable rotations.

## The Gimbal Lock Problem

**Gimbal lock** occurs when two rotation axes align, losing one degree of freedom:

```
Three rotation axes (Euler angles):
  X-axis (pitch)
  Y-axis (yaw)
  Z-axis (roll)

When pitch = 90°:
  Y and Z axes become aligned
  Lost independent yaw/roll control
  Effectively 2DOF instead of 3DOF
```

**Example**:
```cpp
// Aircraft with Euler angles
float pitch = 90.0f;  // Nose straight up
float yaw = 45.0f;    // These two now
float roll = 30.0f;   // do the same thing!

// At pitch=90°, yaw and roll both rotate around vertical axis
// Cannot independently control them anymore
```

**Quaternions solve this**: No singular configurations.

## Quaternion Definition

A **quaternion** is a 4D number with one real and three imaginary components:

```
q = w + xi + yj + zk

where:
  w = scalar (real) part
  (x, y, z) = vector (imaginary) part
  i² = j² = k² = ijk = -1
```

**Representation**:
```cpp
struct Quaternion {
    float w;  // Scalar
    float x, y, z;  // Vector
};

// GLM quaternion
glm::quat q = glm::quat(w, x, y, z);
// or
glm::quat q = glm::quat(w, glm::vec3(x, y, z));
```

## Unit Quaternions for Rotation

**Unit quaternions** (magnitude = 1) represent 3D rotations:

```
Magnitude: |q| = sqrt(w² + x² + y² + z²) = 1
```

**Rotation by angle θ around axis (ax, ay, az)**:
```
q.w = cos(θ/2)
q.x = ax × sin(θ/2)
q.y = ay × sin(θ/2)
q.z = az × sin(θ/2)

where (ax, ay, az) is normalized
```

**Example**: 90° rotation around Y-axis
```cpp
float angle = glm::radians(90.0f);
glm::vec3 axis = glm::vec3(0, 1, 0);  // Y-axis

glm::quat q = glm::angleAxis(angle, axis);

// Internally computes:
// q.w = cos(45°) ≈ 0.707
// q.x = 0 × sin(45°) = 0
// q.y = 1 × sin(45°) ≈ 0.707
// q.z = 0 × sin(45°) = 0

// Result: q ≈ (0.707, 0, 0.707, 0)
```

## Quaternion Operations

### Multiplication

Quaternion multiplication represents composition of rotations:

```
q1 × q2 represents: apply q2 rotation, then q1 rotation
```

**Formula**:
```
(w1, x1, y1, z1) × (w2, x2, y2, z2) =
(
  w1×w2 - x1×x2 - y1×y2 - z1×z2,
  w1×x2 + x1×w2 + y1×z2 - z1×y2,
  w1×y2 - x1×z2 + y1×w2 + z1×x2,
  w1×z2 + x1×y2 - y1×x2 + z1×w2
)
```

**Code**:
```cpp
glm::quat q1 = glm::angleAxis(glm::radians(45.0f), glm::vec3(0, 1, 0));
glm::quat q2 = glm::angleAxis(glm::radians(30.0f), glm::vec3(1, 0, 0));

glm::quat combined = q1 * q2;  // Rotate by q2, then q1
```

**Note**: Quaternion multiplication is **not commutative**: q1 × q2 ≠ q2 × q1

### Conjugate

The **conjugate** negates the vector part:

```
q* = (w, -x, -y, -z)

For unit quaternion: q* = q^(-1) (inverse)
```

**Code**:
```cpp
glm::quat q = ...;
glm::quat q_conjugate = glm::conjugate(q);
```

### Inverse

For unit quaternions, inverse equals conjugate:

```
q^(-1) = q* / |q|²

For |q| = 1:
q^(-1) = q*
```

**Code**:
```cpp
glm::quat q_inverse = glm::inverse(q);

// For unit quaternions (faster):
glm::quat q_inverse = glm::conjugate(q);
```

### Normalization

Ensure magnitude = 1:

```
q_normalized = q / |q|
```

**Code**:
```cpp
glm::quat q = glm::normalize(q);

// Check if normalized
float magnitude = glm::length(q);  // Should be ≈ 1.0
```

## Rotating Vectors with Quaternions

To rotate vector **v** by quaternion **q**:

```
v' = q × v × q*

where v is treated as quaternion (0, vx, vy, vz)
```

**Optimized formula** (avoids full quaternion multiplication):
```
v' = v + 2w(qvec × v) + 2qvec × (qvec × v)

where qvec = (qx, qy, qz)
```

**Code**:
```cpp
glm::vec3 rotateVector(glm::quat q, glm::vec3 v) {
    return q * v;  // GLM handles quaternion-vector multiplication
}

// Example
glm::quat q = glm::angleAxis(glm::radians(90.0f), glm::vec3(0, 1, 0));
glm::vec3 v = glm::vec3(1, 0, 0);  // X-axis
glm::vec3 rotated = q * v;          // Result: (0, 0, -1) - rotated to -Z
```

## Conversion Between Representations

### Quaternion ↔ Axis-Angle

**Quaternion to Axis-Angle**:
```
angle = 2 × acos(w)
axis = (x, y, z) / sin(angle/2)

Handle special case w ≈ 1 (no rotation)
```

**Axis-Angle to Quaternion**:
```
q.w = cos(angle/2)
q.xyz = axis × sin(angle/2)
```

**Code**:
```cpp
// Quaternion from axis-angle
glm::quat q = glm::angleAxis(angle, axis);

// Axis-angle from quaternion
float angle = glm::angle(q);
glm::vec3 axis = glm::axis(q);
```

### Quaternion ↔ Euler Angles

**Euler to Quaternion** (YXZ order):
```cpp
glm::quat eulerToQuaternion(float yaw, float pitch, float roll) {
    glm::quat qYaw = glm::angleAxis(yaw, glm::vec3(0, 1, 0));
    glm::quat qPitch = glm::angleAxis(pitch, glm::vec3(1, 0, 0));
    glm::quat qRoll = glm::angleAxis(roll, glm::vec3(0, 0, 1));

    return qYaw * qPitch * qRoll;
}

// Or using GLM directly
glm::quat q = glm::quat(glm::vec3(pitch, yaw, roll));
```

**Quaternion to Euler**:
```cpp
glm::vec3 quaternionToEuler(glm::quat q) {
    return glm::eulerAngles(q);  // Returns (pitch, yaw, roll)
}
```

### Quaternion ↔ Matrix

**Quaternion to Matrix**:
```
⎡ 1-2(y²+z²)   2(xy-wz)     2(xz+wy)    0 ⎤
⎢ 2(xy+wz)     1-2(x²+z²)   2(yz-wx)    0 ⎥
⎢ 2(xz-wy)     2(yz+wx)     1-2(x²+y²)  0 ⎥
⎣ 0            0            0           1 ⎦
```

**Code**:
```cpp
glm::quat q = ...;
glm::mat4 rotationMatrix = glm::mat4_cast(q);
```

**Matrix to Quaternion**:
```cpp
glm::mat4 rotationMatrix = ...;
glm::quat q = glm::quat_cast(rotationMatrix);
```

## Quaternion Interpolation (Slerp)

**Slerp** (Spherical Linear Interpolation) smoothly interpolates between rotations:

```
slerp(q1, q2, t) = (q2 × q1^(-1))^t × q1

where t ∈ [0, 1]
```

**Formula**:
```
q = (sin((1-t)θ) / sin(θ)) × q1 + (sin(tθ) / sin(θ)) × q2

where θ = acos(dot(q1, q2))
```

**Code**:
```cpp
glm::quat q1 = ...;  // Start orientation
glm::quat q2 = ...;  // End orientation
float t = 0.5f;      // Halfway

glm::quat interpolated = glm::slerp(q1, q2, t);
```

**Animation example**:
```cpp
class RotationAnimation {
    glm::quat startRot;
    glm::quat endRot;
    float duration = 2.0f;  // seconds
    float elapsed = 0.0f;

    void update(float deltaTime) {
        elapsed += deltaTime;
        float t = glm::clamp(elapsed / duration, 0.0f, 1.0f);

        currentRot = glm::slerp(startRot, endRot, t);
    }

    glm::mat4 getMatrix() {
        return glm::mat4_cast(currentRot);
    }
};
```

**Slerp vs Lerp**:
- **Lerp**: Linear interpolation, requires normalization, non-constant angular velocity
- **Slerp**: Spherical interpolation, constant angular velocity, smoother

```cpp
// Lerp (faster but less accurate)
glm::quat lerp = glm::normalize(glm::mix(q1, q2, t));

// Slerp (accurate, constant velocity)
glm::quat slerp = glm::slerp(q1, q2, t);
```

## Practical Applications

### Character Controller

```cpp
class Character {
    glm::vec3 position;
    glm::quat orientation;

    void turnToward(glm::vec3 target, float deltaTime) {
        glm::vec3 direction = glm::normalize(target - position);

        // Target orientation
        glm::quat targetRot = glm::quatLookAt(direction, glm::vec3(0, 1, 0));

        // Smooth turn
        float turnSpeed = 2.0f;
        orientation = glm::slerp(orientation, targetRot, deltaTime * turnSpeed);
    }

    glm::mat4 getTransform() {
        return glm::translate(glm::mat4(1.0f), position) *
               glm::mat4_cast(orientation);
    }
};
```

### Camera Rotation

```cpp
class QuaternionCamera {
    glm::vec3 position;
    glm::quat orientation;

    void rotate(float yawDelta, float pitchDelta) {
        // Yaw around world Y
        glm::quat yawRot = glm::angleAxis(yawDelta, glm::vec3(0, 1, 0));

        // Pitch around local X
        glm::vec3 right = orientation * glm::vec3(1, 0, 0);
        glm::quat pitchRot = glm::angleAxis(pitchDelta, right);

        orientation = yawRot * pitchRot * orientation;
        orientation = glm::normalize(orientation);
    }

    glm::mat4 getViewMatrix() {
        glm::mat4 rotation = glm::mat4_cast(orientation);
        glm::mat4 translation = glm::translate(glm::mat4(1.0f), -position);
        return glm::transpose(rotation) * translation;
    }
};
```

### Skeletal Animation Blending

```cpp
struct Bone {
    glm::quat rotation;
    glm::vec3 position;
};

void blendPoses(std::vector<Bone>& result,
                const std::vector<Bone>& pose1,
                const std::vector<Bone>& pose2,
                float blend) {
    for (size_t i = 0; i < result.size(); i++) {
        // Interpolate rotations with slerp
        result[i].rotation = glm::slerp(pose1[i].rotation,
                                        pose2[i].rotation,
                                        blend);

        // Interpolate positions with lerp
        result[i].position = glm::mix(pose1[i].position,
                                       pose2[i].position,
                                       blend);
    }
}
```

## Advantages of Quaternions

1. **No Gimbal Lock**: No singular configurations
2. **Compact**: 4 floats vs 9 for matrix (or 16 with homogeneous)
3. **Efficient Composition**: Quaternion multiplication faster than matrix
4. **Smooth Interpolation**: Slerp gives natural rotation paths
5. **Numerical Stability**: Less floating-point error accumulation
6. **Easy Normalization**: Single magnitude check

## Disadvantages of Quaternions

1. **Less Intuitive**: Harder to visualize than Euler angles
2. **Indirect Manipulation**: Can't directly adjust "yaw" or "pitch"
3. **Double Coverage**: q and -q represent same rotation
4. **Learning Curve**: More complex mathematics

## Best Practices

### When to Use Quaternions

- Character/camera rotations (avoid gimbal lock)
- Animation blending
- Skeletal animations
- Physics simulations
- Interpolating rotations

### When to Use Euler Angles

- User input (natural to think pitch/yaw/roll)
- Editing rotations in UI
- Specific constraints (e.g., no roll)

### When to Use Matrices

- Graphics pipeline (GPU uses matrices)
- Complex transformations (non-uniform scale + rotation)
- Direct rendering

### Typical Workflow

```cpp
// Store as quaternion
glm::quat orientation;

// Manipulate via Euler for intuitive control
glm::vec3 euler = glm::eulerAngles(orientation);
euler.y += yawDelta;  // Adjust yaw
euler.x += pitchDelta;  // Adjust pitch
orientation = glm::quat(euler);

// Render using matrix
glm::mat4 model = glm::translate(glm::mat4(1.0f), position) *
                   glm::mat4_cast(orientation) *
                   glm::scale(glm::mat4(1.0f), scale);
```

## Key Takeaways

- Quaternions represent rotations without gimbal lock
- Unit quaternions (magnitude = 1) represent 3D rotations
- Defined as q = w + xi + yj + zk with 4 components
- Quaternion multiplication composes rotations
- Conjugate of unit quaternion is its inverse
- Slerp provides smooth, constant-velocity interpolation
- Convert between quaternions, matrices, and Euler angles as needed
- Best for animation, character control, and physics
- Store rotations as quaternions, render with matrices
- Understanding quaternions essential for advanced animation and control systems

Quaternions are a powerful tool that, once mastered, provide robust and efficient rotation representation for complex 3D applications.
