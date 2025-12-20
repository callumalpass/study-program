# Homogeneous Coordinates

Homogeneous coordinates are a mathematical framework that unifies all affine transformations under matrix multiplication. By adding an extra dimension, we can represent translation, rotation, scaling, and even perspective projection as matrix operations. This elegant system is fundamental to modern computer graphics pipelines.

## Why Homogeneous Coordinates?

In standard Cartesian coordinates, translation cannot be expressed as matrix multiplication. Consider 2D translation:

```
x' = x + tx
y' = y + ty

We cannot write this as a 2×2 matrix multiplication.
```

**Solution**: Embed 2D space in 3D using an extra coordinate w.

## Definition and Conversion

A point in n-dimensional space is represented by (n+1) coordinates:

```
2D Point:
Cartesian: (x, y)
Homogeneous: (x, y, w) where w ≠ 0

3D Point:
Cartesian: (x, y, z)
Homogeneous: (x, y, z, w) where w ≠ 0
```

**Conversion to Cartesian**:
```
(x, y, w) → (x/w, y/w)
(x, y, z, w) → (x/w, y/w, z/w)
```

**Standard representation**: w = 1
```
(x, y, 1) represents point (x, y)
(x, y, z, 1) represents point (x, y, z)
```

## The Fourth Component (w)

The w component serves multiple purposes:

### 1. Enabling Translation as Matrix Multiplication

With homogeneous coordinates, translation becomes matrix multiplication:

$$\begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} = \begin{bmatrix} x + t_x \\ y + t_y \\ 1 \end{bmatrix}$$

Result $(x + t_x, y + t_y, 1)$ represents point $(x + t_x, y + t_y)$

### 2. Distinguishing Points from Vectors

**Points** (locations): $w = 1$
**Vectors** (directions): $w = 0$

Point: $(3, 4, 1)$ → affected by translation
Vector: $(3, 4, 0)$ → NOT affected by translation

Translation matrix applied to a vector:

$$\begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} v_x \\ v_y \\ 0 \end{bmatrix} = \begin{bmatrix} v_x \\ v_y \\ 0 \end{bmatrix}$$

Vector unchanged! ($t_x \times 0 = 0$, $t_y \times 0 = 0$)

### 3. Representing Points at Infinity

w = 0 (with non-zero x,y,z) represents a point at infinity:

```
(1, 0, 0) represents point at infinity in +X direction
(0, 1, 0) represents point at infinity in +Y direction

Used for parallel projection and ideal points in projective geometry
```

### 4. Perspective Division

After projection, w ≠ 1 encodes depth for perspective:

```
Clip space: (x, y, z, w)

Perspective division:
NDC.x = x / w
NDC.y = y / w
NDC.z = z / w

Points further away have larger w → smaller NDC coordinates → perspective
```

## Homogeneous Transformations

All affine transformations in homogeneous coordinates:

### Translation (2D)

$$\mathbf{T} = \begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix}$$

### Scaling (2D)

$$\mathbf{S} = \begin{bmatrix} s_x & 0 & 0 \\ 0 & s_y & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

### Rotation (2D, angle $\theta$)

$$\mathbf{R}(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

### General 2D Affine Transform

$$\mathbf{M} = \begin{bmatrix} a & b & t_x \\ c & d & t_y \\ 0 & 0 & 1 \end{bmatrix}$$

where $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ is the linear part and $(t_x, t_y)$ is the translation

### 3D Transformations

General 3D affine:

$$\mathbf{M} = \begin{bmatrix} a & b & c & t_x \\ d & e & f & t_y \\ g & h & i & t_z \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$3 \times 3$ linear transform + translation vector

## Equivalence of Homogeneous Points

Multiple homogeneous coordinates represent the same Cartesian point:

```
(2, 4, 1) → (2/1, 4/1) = (2, 4)
(4, 8, 2) → (4/2, 8/2) = (2, 4)
(6, 12, 3) → (6/3, 12/3) = (2, 4)

All represent same point (2, 4)

General: (kx, ky, kw) ≡ (x, y, w) for any k ≠ 0
```

**Normalization**: Divide by w to get standard form (w=1):
```cpp
glm::vec4 homogeneous = glm::vec4(6, 12, 3, 3);

// Normalize
if (homogeneous.w != 0) {
    homogeneous /= homogeneous.w;
}
// Result: (2, 4, 1, 1)
```

## Perspective Projection and w

Perspective projection produces w ≠ 1:

```
Perspective matrix (simplified):
⎡ 1  0  0   0  ⎤
⎢ 0  1  0   0  ⎥
⎢ 0  0  1   0  ⎥
⎣ 0  0  1/d 0  ⎦

Apply to point (x, y, z, 1):
⎡ x     ⎤
⎢ y     ⎥
⎢ z     ⎥
⎣ z/d   ⎦

Perspective division:
x' = x / (z/d) = x × d/z
y' = y / (z/d) = y × d/z
z' = z / (z/d) = d

Points farther away (larger z) divided by larger number → appear smaller
```

**Example**:
```cpp
// Two points at different depths
glm::vec4 near = glm::vec4(1, 1, 2, 1);
glm::vec4 far = glm::vec4(1, 1, 10, 1);

glm::mat4 projection = glm::perspective(glm::radians(45.0f), 1.0f, 0.1f, 100.0f);

glm::vec4 nearClip = projection * near;   // w ≈ 2
glm::vec4 farClip = projection * far;     // w ≈ 10

// After perspective division
glm::vec3 nearNDC = glm::vec3(nearClip) / nearClip.w;  // Larger values
glm::vec3 farNDC = glm::vec3(farClip) / farClip.w;     // Smaller values

// Far point appears smaller on screen → perspective!
```

## Practical Code Examples

### Basic Usage in Shaders

```glsl
// Vertex shader
layout(location = 0) in vec3 aPosition;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

void main() {
    // Homogeneous coordinate with w=1
    vec4 position = vec4(aPosition, 1.0);

    // Transform through pipeline
    vec4 worldPos = uModel * position;
    vec4 viewPos = uView * worldPos;
    vec4 clipPos = uProjection * viewPos;  // w may not be 1 after this

    // Output clip space position (GPU does perspective division)
    gl_Position = clipPos;
}
```

### Manual Perspective Division

```cpp
// Simulate what GPU does after vertex shader
glm::vec4 clipPos = projection * view * model * glm::vec4(position, 1.0f);

// Perspective division to get NDC
if (clipPos.w != 0) {
    glm::vec3 ndc;
    ndc.x = clipPos.x / clipPos.w;
    ndc.y = clipPos.y / clipPos.w;
    ndc.z = clipPos.z / clipPos.w;

    // ndc is in [-1, 1] range (OpenGL)
}
```

### Points vs Vectors

```cpp
// Point (position in space)
glm::vec4 point = glm::vec4(3, 4, 5, 1);

// Vector (direction, displacement)
glm::vec4 direction = glm::vec4(1, 0, 0, 0);

glm::mat4 transform = glm::translate(glm::mat4(1.0f), glm::vec3(10, 20, 30));

glm::vec4 transformedPoint = transform * point;
// Result: (13, 24, 35, 1) - moved by translation

glm::vec4 transformedDirection = transform * direction;
// Result: (1, 0, 0, 0) - unchanged by translation!
```

## Interpolation in Homogeneous Coordinates

Perspective-correct texture mapping requires interpolating in homogeneous coordinates:

**Wrong** (screen-space linear):
```
texCoord_frag = lerp(texCoord0, texCoord1, t)
```

**Correct** (perspective-correct):
```
// At vertices
u0/w0, u1/w1

// Interpolate
u_frag/w_frag = lerp(u0/w0, u1/w1, t)
1/w_frag = lerp(1/w0, 1/w1, t)

// Recover
u_frag = (u_frag/w_frag) / (1/w_frag)
```

**GPU handles this automatically**:
```glsl
// Vertex shader
out vec2 vTexCoord;
vTexCoord = aTexCoord;  // GPU stores vTexCoord/w

// Fragment shader
in vec2 vTexCoord;  // GPU automatically divided by interpolated w
// vTexCoord is perspective-correct
```

## Affine Combinations

Homogeneous coordinates enable affine combinations:

$$\mathbf{P} = w_0 \mathbf{P}_0 + w_1 \mathbf{P}_1 + w_2 \mathbf{P}_2$$

where $w_0 + w_1 + w_2 = 1$

Examples:
- Midpoint: $0.5\mathbf{P}_0 + 0.5\mathbf{P}_1$
- Barycentric: $w_0\mathbf{V}_0 + w_1\mathbf{V}_1 + w_2\mathbf{V}_2$ (where $w_0+w_1+w_2=1$)

**Implementation**:
```cpp
// Barycentric interpolation
glm::vec4 barycentricInterpolation(
    glm::vec4 v0, glm::vec4 v1, glm::vec4 v2,
    float lambda0, float lambda1, float lambda2)
{
    // lambda0 + lambda1 + lambda2 = 1
    glm::vec4 result = lambda0 * v0 + lambda1 * v1 + lambda2 * v2;

    // Normalize w component
    if (result.w != 0)
        result /= result.w;

    return result;
}
```

## Projective Transformations

Homogeneous coordinates enable **projective transformations** (more general than affine):

General projective transformation (3D):

$$\mathbf{M} = \begin{bmatrix} a & b & c & d \\ e & f & g & h \\ i & j & k & l \\ m & n & o & p \end{bmatrix}$$

Bottom row $[m\ n\ o\ p]$ can be non-zero (unlike affine)
Enables perspective projection

**Affine** (bottom row is $[0\ 0\ 0\ 1]$):
- Parallel lines remain parallel
- Used for model/view transforms

**Projective** (arbitrary bottom row):
- Parallel lines can converge
- Used for perspective projection

## Common Pitfalls

### 1. Forgetting to set w=1 for points
```cpp
// Wrong
glm::vec4 point = glm::vec4(1, 2, 3, 0);  // This is a vector!

// Correct
glm::vec4 point = glm::vec4(1, 2, 3, 1);  // This is a point
```

### 2. Not checking for w=0 before division
```cpp
// Dangerous
glm::vec3 cartesian = glm::vec3(homogeneous) / homogeneous.w;

// Safe
glm::vec3 cartesian;
if (abs(homogeneous.w) > 1e-6) {
    cartesian = glm::vec3(homogeneous) / homogeneous.w;
} else {
    // Handle point at infinity or error
}
```

### 3. Confusing clip space and NDC
```cpp
// Clip space: vec4 with arbitrary w
glm::vec4 clipPos = projection * viewPos;

// NDC: vec3 after division by w
glm::vec3 ndc = glm::vec3(clipPos) / clipPos.w;
```

## Key Takeaways

- Homogeneous coordinates embed n-D space in (n+1)-D space
- Enable all affine transforms as matrix multiplications
- Fourth component w distinguishes points (w=1) from vectors (w=0)
- Multiple homogeneous coordinates represent same Cartesian point
- Perspective projection sets w ≠ 1, enabling perspective division
- Perspective division: (x, y, z, w) → (x/w, y/w, z/w)
- Points at infinity have w = 0
- GPU automatically handles perspective-correct interpolation
- Essential for understanding graphics pipeline and projections
- Foundation for perspective projection and texture mapping

Homogeneous coordinates are a cornerstone of computer graphics mathematics, enabling elegant and efficient representation of the complete transformation pipeline.
