# Transformation Basics

Transformations are the mathematical operations that move, rotate, and scale objects in computer graphics. Understanding transformations is fundamental because every 3D graphics application relies on them to position objects, move cameras, and project 3D scenes onto 2D screens. This section introduces transformation concepts and explains why matrices are the standard mathematical tool for representing them.

## What Are Transformations?

**Transformations** are functions that map points or vectors from one coordinate system to another. In computer graphics, we use transformations to:

- **Position objects** in the world (translation)
- **Orient objects** (rotation)
- **Change object size** (scaling)
- **Project 3D scenes** onto 2D screens (projection)
- **Animate objects** over time

```
Transformation T maps point P to point P':
P' = T(P)

Example:
P = (1, 2, 3)
T = "translate by (5, 0, 0)"
P' = T(P) = (6, 2, 3)
```

## Types of Transformations

### Linear Transformations

**Linear transformations** preserve vector addition and scalar multiplication:

```
T(u + v) = T(u) + T(v)
T(c × v) = c × T(v)

where u, v are vectors and c is a scalar
```

Linear transformations include:
- **Rotation**: Spinning around an axis
- **Scaling**: Enlarging or shrinking
- **Reflection**: Mirroring across a plane
- **Shearing**: Skewing at an angle

Linear transformations **preserve the origin**: T(0) = 0

```
Rotation:               Scaling:                Shearing:
    Y                       Y                       Y
    │                       │                       │
    ●───→ X                 ●───→ X                 ●───→ X
   /│                      /│                      /┃
  / │                     / │                     / ┃
 /  │                    /  │                    ●  ┃

Original                Stretched               Skewed
```

### Affine Transformations

**Affine transformations** are linear transformations plus translation:

```
T(v) = M × v + t

where:
  M = linear transformation matrix
  t = translation vector
```

Affine transformations include all linear transformations **plus translation**.

Properties preserved:
- **Parallel lines remain parallel**
- **Ratios of distances along lines** preserved
- **Midpoints remain midpoints**

Properties **not** preserved:
- Angles (except for rigid transformations)
- Distances (except for rigid transformations)

```
Translation:
    Y                       Y
    │                       │
    │  ●                    │      ●
    │                       │
    └───→ X                 └───→ X

Original → Moved but not rotated or scaled
```

### Rigid Body Transformations

**Rigid body transformations** (also called **Euclidean transformations**) preserve distances and angles:

```
Rigid = Rotation + Translation
```

Properties preserved:
- **Distances** between points
- **Angles** between lines
- **Shapes and sizes**
- **Handedness** of coordinate system

Used for moving objects without deformation.

```
Rigid transformation:
    ●───●                   ●───●
    │   │      →           │   │
    ●───●                   ●───●

Shape, size, and angles preserved
```

## Why Use Matrices?

Matrices are the standard tool for representing transformations in computer graphics for several compelling reasons:

### 1. Compact Representation

A matrix encodes a complete transformation in a single mathematical object:

```
2D Transformation Matrix (3×3):
⎡ a  b  tx ⎤
⎢ c  d  ty ⎥
⎣ 0  0  1  ⎦

Encodes:
- Rotation/Scale/Shear: [a b; c d]
- Translation: [tx, ty]
```

### 2. Composition Through Multiplication

Multiple transformations combine through matrix multiplication:

```
T = T3 × T2 × T1

Apply to point P:
P' = T × P = T3 × (T2 × (T1 × P))

This is equivalent to:
P' = (T3 × T2 × T1) × P

Compute T once, apply to many points efficiently
```

**Example**:
```cpp
// Separate transformations
glm::mat4 translation = glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0));
glm::mat4 rotation = glm::rotate(glm::mat4(1.0f), angle, glm::vec3(0, 1, 0));
glm::mat4 scale = glm::scale(glm::mat4(1.0f), glm::vec3(2, 2, 2));

// Compose into single matrix
glm::mat4 transform = translation * rotation * scale;

// Apply to thousands of vertices with single matrix
for (auto& vertex : vertices) {
    vertex.position = transform * vertex.position;
}
```

### 3. Hardware Acceleration

GPUs have dedicated matrix multiplication hardware:

```
Vertex Shader:
vec4 worldPos = modelMatrix * vec4(position, 1.0);

This multiplication happens in specialized GPU hardware,
extremely fast (billions per second)
```

### 4. Unified Representation

Matrices unify representation of all transformations:

```
Translation Matrix:     Rotation Matrix:        Scale Matrix:
⎡ 1  0  0  tx ⎤        ⎡ cos θ  -sin θ  0  0⎤   ⎡ sx  0   0  0⎤
⎢ 0  1  0  ty ⎥        ⎢ sin θ   cos θ  0  0⎥   ⎢ 0   sy  0  0⎥
⎢ 0  0  1  tz ⎥        ⎢ 0       0      1  0⎥   ⎢ 0   0   sz 0⎥
⎣ 0  0  0  1  ⎦        ⎣ 0       0      0  1⎦   ⎣ 0   0   0  1⎦

All have same form, can be composed uniformly
```

### 5. Inverse Transformations

Matrix inverse provides reverse transformation:

```
If M transforms P to P':
  P' = M × P

Then M^(-1) transforms P' back to P:
  P = M^(-1) × P'

Verification:
  M^(-1) × M = I  (identity matrix)
```

**Use cases**:
- Transform from world space to object space
- Compute view matrix from camera transform
- Undo transformations

## Matrix Representation of Transformations

### 2D Transformation Matrix

2D transformations use 3×3 matrices with homogeneous coordinates:

```
⎡ m00  m01  m02 ⎤   ⎡ x ⎤   ⎡ m00*x + m01*y + m02 ⎤
⎢ m10  m11  m12 ⎥ × ⎢ y ⎥ = ⎢ m10*x + m11*y + m12 ⎥
⎣ 0    0    1   ⎦   ⎣ 1 ⎦   ⎣ 1                   ⎦

Components:
- [m00 m01; m10 m11]: Linear transformation (2×2)
- [m02, m12]: Translation
- [0, 0, 1]: Homogeneous row (enables translation in matrix)
```

### 3D Transformation Matrix

3D transformations use 4×4 matrices:

```
⎡ m00  m01  m02  m03 ⎤   ⎡ x ⎤
⎢ m10  m11  m12  m13 ⎥ × ⎢ y ⎥
⎢ m20  m21  m22  m23 ⎥   ⎢ z ⎥
⎣ m30  m31  m32  m33 ⎦   ⎣ w ⎦

For affine transformations:
⎡ 3×3 Linear  │ Translation ⎤
⎢             │             ⎥
⎣ 0   0   0   │      1      ⎦
```

## Identity Matrix

The **identity matrix** represents "no transformation":

```
2D Identity:        3D Identity:
⎡ 1  0  0 ⎤        ⎡ 1  0  0  0 ⎤
⎢ 0  1  0 ⎥        ⎢ 0  1  0  0 ⎥
⎣ 0  0  1 ⎦        ⎢ 0  0  1  0 ⎥
                    ⎣ 0  0  0  1 ⎦

Property: I × v = v  (identity leaves vectors unchanged)
```

**Code**:
```cpp
glm::mat4 identity = glm::mat4(1.0f);  // Creates identity matrix

// Verify:
glm::vec4 v = glm::vec4(3, 4, 5, 1);
glm::vec4 result = identity * v;  // result == v
```

## Matrix Multiplication

Matrix multiplication combines transformations:

```
C = A × B

C[i][j] = Σ A[i][k] × B[k][j]
          k

For 4×4 matrices, each element requires 4 multiplications and 3 additions
```

**Important**: Matrix multiplication is **not commutative**:

```
A × B ≠ B × A  (in general)

Example:
Rotate then Translate ≠ Translate then Rotate
```

```
Rotate then Translate:      Translate then Rotate:
    │                           │   ●───→
    │  ●───→                    │  /
    │ /                         │ /
    │/                          │/
────┴───→ X                 ────┴───→ X
    │                           │
   ●│                           │●
```

**Order Matters**:
```cpp
glm::mat4 T = glm::translate(...);
glm::mat4 R = glm::rotate(...);

glm::mat4 TR = T * R;  // Rotate first, then translate
glm::mat4 RT = R * T;  // Translate first, then rotate

// TR ≠ RT !
```

In column-major notation (OpenGL, GLM), transformations apply **right-to-left**:

```cpp
v' = T × R × S × v

Read right-to-left:
1. Scale v by S
2. Rotate result by R
3. Translate result by T
```

## Transformation Hierarchies

Objects in scenes often have parent-child relationships:

```
Robot arm hierarchy:
    Shoulder
       │
    ───●───
       │
      Elbow
       │
    ───●───
       │
      Wrist
       │
    ───●───
       │
      Hand
```

**Hierarchical transformation**:
```cpp
// Parent transformation affects all children
mat4 shoulderTransform = ...;
mat4 elbowTransform = ...;
mat4 wristTransform = ...;

// Hand position in world:
mat4 handWorld = shoulderTransform × elbowTransform × wristTransform × handLocal;

// When shoulder rotates, entire arm rotates
// When elbow rotates, only forearm and hand rotate
```

**Scene Graph Example**:
```cpp
class SceneNode {
    glm::mat4 localTransform;  // Transform relative to parent
    std::vector<SceneNode*> children;

    glm::mat4 getWorldTransform(glm::mat4 parentWorld) {
        glm::mat4 worldTransform = parentWorld * localTransform;

        for (auto child : children) {
            child->render(worldTransform);
        }

        return worldTransform;
    }
};
```

## Points vs Vectors

Important distinction when applying transformations:

**Points** (positions):
- Represent locations in space
- Affected by translation
- Homogeneous coordinate w = 1

```
Point: (x, y, z, 1)

Transformation:
⎡ 1  0  0  tx ⎤   ⎡ x ⎤   ⎡ x + tx ⎤
⎢ 0  1  0  ty ⎥ × ⎢ y ⎥ = ⎢ y + ty ⎥
⎢ 0  0  1  tz ⎥   ⎢ z ⎥   ⎢ z + tz ⎥
⎣ 0  0  0  1  ⎦   ⎣ 1 ⎦   ⎣ 1     ⎦

Point moved by translation
```

**Vectors** (directions):
- Represent directions or displacements
- **NOT** affected by translation
- Homogeneous coordinate w = 0

```
Vector: (x, y, z, 0)

Transformation:
⎡ 1  0  0  tx ⎤   ⎡ x ⎤   ⎡ x ⎤
⎢ 0  1  0  ty ⎥ × ⎢ y ⎥ = ⎢ y ⎥
⎢ 0  0  1  tz ⎥   ⎢ z ⎥   ⎢ z ⎥
⎣ 0  0  0  1  ⎦   ⎣ 0 ⎦   ⎣ 0 ⎦

Vector unaffected by translation (w=0 makes tx*0=0)
```

**Example**:
```cpp
glm::vec4 point = glm::vec4(1, 2, 3, 1);    // Position
glm::vec4 direction = glm::vec4(0, 1, 0, 0); // Up vector

glm::mat4 T = glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0));

glm::vec4 transformedPoint = T * point;      // (6, 2, 3, 1) - moved
glm::vec4 transformedDir = T * direction;    // (0, 1, 0, 0) - unchanged

// Directions don't move, they only rotate/scale
```

## Normal Transformation

Surface **normals** require special handling:

```
Wrong: N' = M × N  (normals can become non-perpendicular)

Correct: N' = (M^(-1))^T × N

where:
  M^(-1) = inverse of M
  (...)^T = transpose
```

**Why?** Non-uniform scaling breaks perpendicularity:

```
Before scaling:         After wrong transformation:
    ↑ N                     ↑ N (wrong!)
    │                       │
────●────                ─────●──────
    │                         │
   Surface                  Surface (scaled horizontally)

Normal should tilt, not stay vertical
```

**Code**:
```cpp
glm::mat4 modelMatrix = ...;

// Normal matrix: inverse-transpose of upper-left 3×3
glm::mat3 normalMatrix = glm::transpose(glm::inverse(glm::mat3(modelMatrix)));

// In shader:
uniform mat3 uNormalMatrix;
vec3 worldNormal = normalize(uNormalMatrix * aNormal);
```

For **uniform scaling** and **rigid transformations**, normal matrix equals model matrix (optimization):

```cpp
// If only rotation and uniform scale, no inverse needed
if (isRigidOrUniformScale(modelMatrix)) {
    normalMatrix = glm::mat3(modelMatrix);
} else {
    normalMatrix = glm::transpose(glm::inverse(glm::mat3(modelMatrix)));
}
```

## Transformation Pipeline Summary

Typical transformation sequence in graphics:

```
1. Model Transform: Object space → World space
   (Position object in scene)

2. View Transform: World space → View space
   (Transform to camera's perspective)

3. Projection Transform: View space → Clip space
   (Apply perspective or orthographic projection)

4. Viewport Transform: NDC → Screen space
   (Map to pixel coordinates)
```

**Complete transformation**:
```cpp
glm::mat4 model = ...;       // Object → World
glm::mat4 view = ...;        // World → View
glm::mat4 projection = ...; // View → Clip

glm::mat4 mvp = projection * view * model;

// In vertex shader:
gl_Position = mvp * vec4(aPosition, 1.0);
```

## Key Takeaways

- Transformations map points/vectors between coordinate systems
- Linear transformations: rotation, scaling, shearing (preserve origin)
- Affine transformations: linear + translation (preserve parallel lines)
- Rigid transformations: rotation + translation (preserve distances/angles)
- Matrices provide compact, efficient representation of transformations
- Matrix multiplication composes transformations
- Transformation order matters: A × B ≠ B × A
- Points (w=1) affected by translation, vectors (w=0) are not
- Normals require inverse-transpose transformation
- Understanding transformations fundamental to all graphics programming

In the following sections, we'll examine specific transformation types—translation, scaling, rotation, and more—in mathematical detail.
