# Composite Transformations

In computer graphics, objects rarely need just a single transformation. Typically, we combine multiple transformations—translation, rotation, and scaling—to achieve the desired positioning and orientation. Understanding how transformations compose through matrix multiplication, and especially understanding the crucial importance of order, is essential for correct graphics programming.

## Matrix Multiplication for Composition

Transformations compose through matrix multiplication:

```
T3 × T2 × T1

Apply transformations right-to-left:
1. Transform by T1
2. Transform result by T2
3. Transform result by T3
```

**Example**:
```cpp
glm::mat4 T = glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0));  // Translate
glm::mat4 R = glm::rotate(glm::mat4(1.0f), angle, glm::vec3(0, 1, 0));  // Rotate
glm::mat4 S = glm::scale(glm::mat4(1.0f), glm::vec3(2, 2, 2));  // Scale

// Composite transformation
glm::mat4 M = T * R * S;

// Apply to point
glm::vec4 p = glm::vec4(1, 0, 0, 1);
glm::vec4 p_transformed = M * p;

// Equivalent to:
glm::vec4 p_transformed = T * (R * (S * p));
// Scale first, then rotate, then translate
```

### Why Right-to-Left?

Column-major matrix notation (OpenGL, GLM) applies transformations from right to left:

```
v' = M × v

where M = T3 × T2 × T1

Expands to:
v' = T3 × (T2 × (T1 × v))

Read execution order right-to-left: T1, then T2, then T3
```

**Row-major** systems (DirectX default) reverse this:
```
v' = v × M

where M = T1 × T2 × T3

Now reads left-to-right: T1, then T2, then T3
```

## Transformation Order Matters

Matrix multiplication is **not commutative**: A × B ≠ B × A

### Example: Rotate vs Translate Order

**Rotate then Translate** (T × R):
```cpp
glm::mat4 M1 =
    glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0)) *
    glm::rotate(glm::mat4(1.0f), glm::radians(90.0f), glm::vec3(0, 0, 1));

// Rotate 90° around origin, then move right by 5
Point (1, 0) → Rotate → (0, 1) → Translate → (5, 1)
```

**Translate then Rotate** (R × T):
```cpp
glm::mat4 M2 =
    glm::rotate(glm::mat4(1.0f), glm::radians(90.0f), glm::vec3(0, 0, 1)) *
    glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0));

// Move right by 5, then rotate 90° around origin
Point (1, 0) → Translate → (6, 0) → Rotate → (0, 6)

Result: (5, 1) vs (0, 6) - completely different!
```

### Visualizing Order Dependence

```
Rotate-Translate:              Translate-Rotate:
    │                              │
   ●│ (5,1) final                 ●│ (0,6) final
    │                              │
    │                              │
────┼────→                     ────┼────→
    │                              │
    │                              │
   ●│ (1,0) initial               │
                                   │ ●(6,0) intermediate
```

### Scale-Rotate-Translate (SRT)

The **standard order** for model transformations is **Scale, Rotate, Translate** (SRT):

```cpp
glm::mat4 model =
    glm::translate(glm::mat4(1.0f), position) *
    glm::rotate(glm::mat4(1.0f), rotation.y, glm::vec3(0, 1, 0)) *
    glm::rotate(glm::mat4(1.0f), rotation.x, glm::vec3(1, 0, 0)) *
    glm::rotate(glm::mat4(1.0f), rotation.z, glm::vec3(0, 0, 1)) *
    glm::scale(glm::mat4(1.0f), scale);

// Order: Scale → Rotate-Z → Rotate-X → Rotate-Y → Translate
```

**Why this order?**
- **Scale first**: Ensures object scales from its center
- **Rotate second**: Rotates scaled object around its center
- **Translate last**: Moves object to final position without affecting scale/rotation

```
Scale → Rotate → Translate:
   ●  →    ●●  →   ●●  →       ●●
(at origin)  (scaled)  (rotated)  (moved to position)
```

Wrong order problems:
```
Translate → Scale:
   ●  →       ●  →                ●
(origin)  (moved)  (scaled: position also scaled!)
```

## Local vs Global Transformations

### Global (World) Transformations

Applied in world coordinate system:

```cpp
// Rotate object around world Y-axis
glm::mat4 globalRotation = glm::rotate(glm::mat4(1.0f), angle, glm::vec3(0, 1, 0));
glm::mat4 model = globalRotation * currentTransform;
```

### Local (Object) Transformations

Applied in object's local coordinate system:

```cpp
// Rotate object around its own up vector
glm::mat4 localRotation = glm::rotate(glm::mat4(1.0f), angle, glm::vec3(0, 1, 0));
glm::mat4 model = currentTransform * localRotation;
```

**Order determines frame of reference**:
```
M_new = M_global × M_current    // Global transformation
M_new = M_current × M_local     // Local transformation
```

## Hierarchical Transformations

Parent-child relationships create transformation hierarchies:

```
Solar System Example:
   Sun
    ├─ Earth (orbits sun)
    │   └─ Moon (orbits earth)
    └─ Mars (orbits sun)
```

**Implementation**:
```cpp
// Sun (at origin, just rotation)
glm::mat4 sunTransform = glm::rotate(glm::mat4(1.0f), sunRotation, glm::vec3(0, 1, 0));

// Earth (orbits sun)
glm::mat4 earthOrbit = glm::rotate(glm::mat4(1.0f), earthOrbitAngle, glm::vec3(0, 1, 0));
glm::mat4 earthPosition = glm::translate(glm::mat4(1.0f), glm::vec3(10, 0, 0));
glm::mat4 earthRotation = glm::rotate(glm::mat4(1.0f), earthRotation, glm::vec3(0, 1, 0));
glm::mat4 earthTransform = sunTransform * earthOrbit * earthPosition * earthRotation;

// Moon (orbits earth)
glm::mat4 moonOrbit = glm::rotate(glm::mat4(1.0f), moonOrbitAngle, glm::vec3(0, 1, 0));
glm::mat4 moonPosition = glm::translate(glm::mat4(1.0f), glm::vec3(2, 0, 0));
glm::mat4 moonTransform = earthTransform * moonOrbit * moonPosition;

// Render
renderSphere(sunTransform, sunTexture);
renderSphere(earthTransform, earthTexture);
renderSphere(moonTransform, moonTexture);
```

### Scene Graph

Generalized hierarchy structure:

```cpp
class SceneNode {
    glm::mat4 localTransform;
    std::vector<std::shared_ptr<SceneNode>> children;

    void render(glm::mat4 parentTransform) {
        glm::mat4 worldTransform = parentTransform * localTransform;

        // Render this node
        drawMesh(worldTransform);

        // Render children
        for (auto& child : children) {
            child->render(worldTransform);
        }
    }
};

// Usage
root->render(glm::mat4(1.0f));  // Start with identity
```

## Transformation Decomposition

Extract components from composite matrix:

### Extracting Translation

Translation is in the last column:

```cpp
glm::mat4 M = ...;
glm::vec3 translation = glm::vec3(M[3]);  // Fourth column

// Or explicitly:
translation.x = M[3][0];
translation.y = M[3][1];
translation.z = M[3][2];
```

### Extracting Scale

Scale is the length of basis vectors:

```cpp
glm::vec3 scale;
scale.x = glm::length(glm::vec3(M[0]));  // X-axis length
scale.y = glm::length(glm::vec3(M[1]));  // Y-axis length
scale.z = glm::length(glm::vec3(M[2]));  // Z-axis length
```

### Extracting Rotation

Remove scale to get rotation matrix:

```cpp
glm::mat3 rotationMatrix;
rotationMatrix[0] = glm::vec3(M[0]) / scale.x;
rotationMatrix[1] = glm::vec3(M[1]) / scale.y;
rotationMatrix[2] = glm::vec3(M[2]) / scale.z;

// Convert to quaternion or Euler angles
glm::quat rotation = glm::quat_cast(rotationMatrix);
```

### Complete Decomposition

```cpp
struct Transform {
    glm::vec3 position;
    glm::quat rotation;
    glm::vec3 scale;

    static Transform decompose(const glm::mat4& matrix) {
        Transform t;

        // Extract translation
        t.position = glm::vec3(matrix[3]);

        // Extract scale
        t.scale.x = glm::length(glm::vec3(matrix[0]));
        t.scale.y = glm::length(glm::vec3(matrix[1]));
        t.scale.z = glm::length(glm::vec3(matrix[2]));

        // Extract rotation
        glm::mat3 rotMat;
        rotMat[0] = glm::vec3(matrix[0]) / t.scale.x;
        rotMat[1] = glm::vec3(matrix[1]) / t.scale.y;
        rotMat[2] = glm::vec3(matrix[2]) / t.scale.z;
        t.rotation = glm::quat_cast(rotMat);

        return t;
    }

    glm::mat4 toMatrix() const {
        return glm::translate(glm::mat4(1.0f), position) *
               glm::mat4_cast(rotation) *
               glm::scale(glm::mat4(1.0f), scale);
    }
};
```

## Inverse Transformations

### Inverting Composite Matrices

```
(A × B × C)^(-1) = C^(-1) × B^(-1) × A^(-1)

Order reverses!
```

**Code**:
```cpp
glm::mat4 M = T * R * S;
glm::mat4 M_inv = glm::inverse(M);

// Equivalent to:
glm::mat4 M_inv_manual = glm::inverse(S) * glm::inverse(R) * glm::inverse(T);
```

### Efficient Inverses for Known Transforms

**Translation**:
```cpp
glm::mat4 T_inv = glm::translate(glm::mat4(1.0f), -translation);
```

**Rotation** (orthogonal matrix):
```cpp
glm::mat4 R_inv = glm::transpose(R);  // Faster than full inverse
```

**Scale**:
```cpp
glm::mat4 S_inv = glm::scale(glm::mat4(1.0f), 1.0f / scale);
```

**Rigid transform** (rotation + translation):
```cpp
// Fast rigid transform inverse
glm::mat4 fastInverseRigid(glm::mat4 M) {
    glm::mat3 R = glm::mat3(M);  // Extract rotation
    glm::vec3 t = glm::vec3(M[3]);  // Extract translation

    glm::mat4 inv = glm::mat4(glm::transpose(R));  // Transpose rotation
    inv[3] = glm::vec4(-glm::transpose(R) * t, 1.0f);  // Transform translation

    return inv;
}
```

## Practical Applications

### Object Placement

```cpp
void placeObject(glm::vec3 position, glm::vec3 eulerAngles, glm::vec3 scale) {
    glm::mat4 model = glm::mat4(1.0f);

    // Apply in SRT order
    model = glm::translate(model, position);
    model = glm::rotate(model, eulerAngles.y, glm::vec3(0, 1, 0));  // Yaw
    model = glm::rotate(model, eulerAngles.x, glm::vec3(1, 0, 0));  // Pitch
    model = glm::rotate(model, eulerAngles.z, glm::vec3(0, 0, 1));  // Roll
    model = glm::scale(model, scale);

    shader.setMat4("uModel", model);
}
```

### Camera Follow

```cpp
// Make object follow camera at offset
glm::vec3 cameraOffset = glm::vec3(0, 1, 3);  // Above and behind
glm::mat4 cameraTransform = ...;

// Object inherits camera transform with local offset
glm::mat4 objectTransform = cameraTransform *
    glm::translate(glm::mat4(1.0f), cameraOffset);
```

### Billboard Transform

```cpp
// Make object face camera
glm::mat4 createBillboard(glm::vec3 objectPos, glm::vec3 cameraPos, glm::vec3 up) {
    glm::vec3 look = glm::normalize(cameraPos - objectPos);
    glm::vec3 right = glm::normalize(glm::cross(up, look));
    glm::vec3 actualUp = glm::cross(look, right);

    glm::mat4 billboard;
    billboard[0] = glm::vec4(right, 0);
    billboard[1] = glm::vec4(actualUp, 0);
    billboard[2] = glm::vec4(look, 0);
    billboard[3] = glm::vec4(objectPos, 1);

    return billboard;
}
```

## Key Takeaways

- Transformations compose through matrix multiplication
- Order matters: A × B ≠ B × A in general
- Column-major (OpenGL) applies right-to-left: M = T × R × S → Scale, Rotate, Translate
- Standard model transform order: Scale → Rotate → Translate (SRT)
- Global transforms: multiply on left; local transforms: multiply on right
- Hierarchies multiply parent transforms with child transforms
- Decomposition extracts position, rotation, and scale from matrix
- Inverse of composite: (A × B × C)^(-1) = C^(-1) × B^(-1) × A^(-1)
- Specialized inverses faster than general matrix inverse
- Understanding composition essential for complex transformations

Mastering composite transformations enables you to create sophisticated object animations, hierarchies, and camera systems in graphics applications.
