# Translation and Scaling Transformations

Translation and scaling are two of the most fundamental transformations in computer graphics. Translation moves objects through space without changing their orientation or size, while scaling changes an object's size. Together with rotation, these transformations form the building blocks for positioning and manipulating 3D objects in virtual scenes.

## Translation

**Translation** moves every point of an object by the same displacement vector, shifting the object's position without rotating or deforming it.

### Translation in 2D

A 2D translation by vector **t = (tx, ty)** transforms point **P = (x, y)** to **P' = (x', y')**:

```
x' = x + tx
y' = y + ty

Or in vector form:
P' = P + t
```

**Matrix Representation**:
```
⎡ 1  0  tx ⎤   ⎡ x ⎤   ⎡ x + tx ⎤
⎢ 0  1  ty ⎥ × ⎢ y ⎥ = ⎢ y + ty ⎥
⎣ 0  0  1  ⎦   ⎣ 1 ⎦   ⎣ 1      ⎦

Translation matrix T:
⎡ 1  0  tx ⎤
⎢ 0  1  ty ⎥
⎣ 0  0  1  ⎦
```

**Example**: Translate by (3, 2)
```cpp
glm::mat3 T = glm::mat3(
    1, 0, 0,   // First column
    0, 1, 0,   // Second column
    3, 2, 1    // Third column (tx=3, ty=2)
);

glm::vec3 P = glm::vec3(1, 4, 1);  // Point (1, 4)
glm::vec3 P_prime = T * P;         // Result: (4, 6, 1)
```

### Translation in 3D

3D translation extends naturally to three dimensions:

```
x' = x + tx
y' = y + ty
z' = z + tz

Matrix form:
⎡ 1  0  0  tx ⎤   ⎡ x ⎤   ⎡ x + tx ⎤
⎢ 0  1  0  ty ⎥ × ⎢ y ⎥ = ⎢ y + ty ⎥
⎢ 0  0  1  tz ⎥   ⎢ z ⎥   ⎢ z + tz ⎥
⎣ 0  0  0  1  ⎦   ⎣ 1 ⎦   ⎣ 1      ⎦

Translation matrix T:
⎡ 1  0  0  tx ⎤
⎢ 0  1  0  ty ⎥
⎢ 0  0  1  tz ⎥
⎣ 0  0  0  1  ⎦
```

**GLM Implementation**:
```cpp
// Create translation matrix
glm::vec3 translation = glm::vec3(5.0f, 3.0f, -2.0f);
glm::mat4 T = glm::translate(glm::mat4(1.0f), translation);

// Apply to point
glm::vec4 point = glm::vec4(1.0f, 2.0f, 3.0f, 1.0f);
glm::vec4 translatedPoint = T * point;
// Result: (6.0, 5.0, 1.0, 1.0)

// Apply to vector (w=0, unaffected by translation)
glm::vec4 direction = glm::vec4(0.0f, 1.0f, 0.0f, 0.0f);
glm::vec4 transformedDir = T * direction;
// Result: (0.0, 1.0, 0.0, 0.0) - unchanged!
```

### Properties of Translation

**Preserves**:
- Distances between points
- Angles between vectors
- Parallel lines remain parallel
- Shape and size of objects

**Does NOT preserve**:
- Absolute positions (the whole point!)

**Composition**: Multiple translations add
```
T(t1) × T(t2) = T(t1 + t2)

Example:
Translate by (2, 3) then (1, -1) = Translate by (3, 2)
```

**Inverse**: Translation by -t
```
T^(-1)(t) = T(-t)

⎡ 1  0  0  -tx ⎤
⎢ 0  1  0  -ty ⎥
⎢ 0  0  1  -tz ⎥
⎣ 0  0  0   1  ⎦
```

**Code**:
```cpp
glm::mat4 T = glm::translate(glm::mat4(1.0f), glm::vec3(5, 3, 2));
glm::mat4 T_inv = glm::inverse(T);

// Verify: T * T_inv = Identity
glm::mat4 I = T * T_inv;
// I is identity matrix (within floating-point precision)
```

### Translation in Shaders

```glsl
// Vertex shader
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
layout(location = 0) in vec3 aPosition;

void main() {
    // Model matrix includes translation
    vec4 worldPos = uModel * vec4(aPosition, 1.0);
    gl_Position = uProjection * uView * worldPos;
}
```

**Manual translation** (usually avoided, use matrix):
```glsl
uniform vec3 uTranslation;

void main() {
    vec3 translated = aPosition + uTranslation;
    gl_Position = uProjection * uView * vec4(translated, 1.0);
}
```

## Scaling

**Scaling** changes the size of an object by multiplying coordinates by scale factors.

### Uniform Scaling

**Uniform scaling** scales equally in all dimensions:

```
x' = s × x
y' = s × y
z' = s × z

where s is the scale factor

Matrix form (3D):
⎡ s  0  0  0 ⎤
⎢ 0  s  0  0 ⎥
⎢ 0  0  s  0 ⎥
⎣ 0  0  0  1 ⎦
```

**Example**: Scale by 2× (double size)
```cpp
float s = 2.0f;
glm::mat4 S = glm::scale(glm::mat4(1.0f), glm::vec3(s, s, s));

glm::vec4 point = glm::vec4(1.0f, 2.0f, 3.0f, 1.0f);
glm::vec4 scaled = S * point;
// Result: (2.0, 4.0, 6.0, 1.0) - point is twice as far from origin
```

### Non-Uniform Scaling

**Non-uniform scaling** uses different scale factors per axis:

```
x' = sx × x
y' = sy × y
z' = sz × z

Matrix form:
⎡ sx  0   0   0 ⎤
⎢ 0   sy  0   0 ⎥
⎢ 0   0   sz  0 ⎥
⎣ 0   0   0   1 ⎦
```

**Example**: Stretch along X, compress along Y
```cpp
glm::vec3 scaleFactors = glm::vec3(2.0f, 0.5f, 1.0f);
glm::mat4 S = glm::scale(glm::mat4(1.0f), scaleFactors);

// Applied to cube: becomes rectangular prism
// Width × 2, Height × 0.5, Depth × 1
```

### Scaling About Arbitrary Point

Scaling from the matrix form above scales **about the origin**. To scale about point **P**:

1. **Translate** P to origin: T(-P)
2. **Scale**: S
3. **Translate** back: T(P)

```
Combined: T(P) × S × T(-P)
```

**Example**: Scale cube centered at (5, 0, 0) by 2×
```cpp
glm::vec3 center = glm::vec3(5.0f, 0.0f, 0.0f);
float scaleFactor = 2.0f;

glm::mat4 transform = glm::mat4(1.0f);

// Translate to origin
transform = glm::translate(transform, -center);

// Scale
transform = glm::scale(transform, glm::vec3(scaleFactor));

// Translate back
transform = glm::translate(transform, center);

// Alternative (compose in opposite order):
glm::mat4 transform2 =
    glm::translate(glm::mat4(1.0f), center) *
    glm::scale(glm::mat4(1.0f), glm::vec3(scaleFactor)) *
    glm::translate(glm::mat4(1.0f), -center);
```

### Properties of Scaling

**Preserves**:
- Lines remain lines
- Parallel lines remain parallel
- Ratios along lines

**Does NOT preserve** (unless uniform):
- Angles (non-uniform scaling distorts angles)
- Distances (changes sizes)

**Composition**: Scales multiply
```
S(s1) × S(s2) = S(s1 × s2)

Example:
Scale by 2× then 3× = Scale by 6×
```

**Inverse**: Scale by reciprocal
```
S^(-1)(sx, sy, sz) = S(1/sx, 1/sy, 1/sz)

⎡ 1/sx   0     0    0 ⎤
⎢  0    1/sy   0    0 ⎥
⎢  0     0    1/sz  0 ⎥
⎣  0     0     0    1 ⎦
```

**Code**:
```cpp
glm::mat4 S = glm::scale(glm::mat4(1.0f), glm::vec3(2, 3, 4));
glm::mat4 S_inv = glm::inverse(S);

// S_inv is scale by (0.5, 0.333..., 0.25)
```

### Negative Scaling (Reflection)

**Negative scale factors** create reflections:

```
Scale by -1 in X:
⎡ -1  0  0  0 ⎤
⎢  0  1  0  0 ⎥
⎢  0  0  1  0 ⎥
⎣  0  0  0  1 ⎦

Effect: Mirror across YZ plane
```

**Example**: Flip object horizontally
```cpp
glm::mat4 reflection = glm::scale(glm::mat4(1.0f), glm::vec3(-1.0f, 1.0f, 1.0f));

// Point (3, 2, 1) becomes (-3, 2, 1)
```

**Warning**: Negative scaling changes handedness and reverses triangle winding order!

```
Original triangle (CCW):    After reflection (CW):
    V2                          V2
     ●                           ●
    /│                           │\
   / │                           │ \
  /  │                           │  \
 ●───●                           ●───●
V0   V1                         V1   V0

Winding reversed!
```

Fix by adjusting culling:
```cpp
glCullFace(GL_FRONT);  // Cull front faces when using negative scale
```

### Scaling and Normals

Non-uniform scaling **distorts normals**. Always use normal matrix:

```cpp
// Wrong:
vec3 transformedNormal = mat3(modelMatrix) * normal;

// Correct:
mat3 normalMatrix = transpose(inverse(mat3(modelMatrix)));
vec3 transformedNormal = normalize(normalMatrix * normal);
```

**Why it matters**:
```
Before non-uniform scale:   After (wrong):          After (correct):
    ↑ N                         ↑ N                    ↗ N
    │                           │                     /
────●────                    ─────●──────         ─────●──────
  Circle                      Ellipse             Ellipse

Normal perpendicular       Normal not              Normal properly
                          perpendicular!           perpendicular
```

## Combining Translation and Scaling

Order matters when combining transformations:

### Scale Then Translate

```
T × S

Scale first, then translate
```

```cpp
glm::mat4 transform = glm::mat4(1.0f);
transform = glm::translate(transform, glm::vec3(5, 0, 0));  // Second
transform = glm::scale(transform, glm::vec3(2, 2, 2));      // First

// Equivalent to:
glm::mat4 transform2 =
    glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0)) *
    glm::scale(glm::mat4(1.0f), glm::vec3(2, 2, 2));
```

**Effect**: Object scales, then moves

```
Before:     After scale 2×:    After translate (5,0,0):
   ●            ●──●                      ●──●
(0,0)        (0,0) (1,0)              (5,0) (6,0)
```

### Translate Then Scale

```
S × T

Translate first, then scale
```

```cpp
glm::mat4 transform =
    glm::scale(glm::mat4(1.0f), glm::vec3(2, 2, 2)) *
    glm::translate(glm::mat4(1.0f), glm::vec3(5, 0, 0));
```

**Effect**: Object moves, then scales (translation is scaled too!)

```
Before:     After translate (5,0,0):  After scale 2×:
   ●                     ●                        ●
(0,0)                 (5,0)                   (10,0)

Translation scaled from 5 to 10!
```

**Key Point**: Scaling affects translation when translation comes first in matrix multiplication order.

## Practical Applications

### Camera Movement

```cpp
// First-person camera movement
glm::vec3 cameraPos = glm::vec3(0, 1.7, 0);  // Eye height

void moveForward(float distance) {
    cameraPos += cameraFront * distance;  // Translation
}

void moveRight(float distance) {
    cameraPos += glm::normalize(glm::cross(cameraFront, cameraUp)) * distance;
}

glm::mat4 view = glm::lookAt(cameraPos, cameraPos + cameraFront, cameraUp);
```

### Object Instancing

Render multiple copies at different positions/scales:

```cpp
struct Instance {
    glm::vec3 position;
    glm::vec3 scale;
};

std::vector<Instance> instances = {
    {{0, 0, 0}, {1, 1, 1}},
    {{5, 0, 0}, {2, 2, 2}},
    {{-3, 2, 1}, {0.5, 0.5, 0.5}}
};

for (const auto& inst : instances) {
    glm::mat4 model = glm::mat4(1.0f);
    model = glm::translate(model, inst.position);
    model = glm::scale(model, inst.scale);

    shader.setMat4("uModel", model);
    mesh.draw();
}
```

### Billboard Scaling

Scale sprites to face camera while maintaining size:

```cpp
// Calculate distance-based scale to maintain constant screen size
float distance = glm::length(billboardPos - cameraPos);
float scale = distance * tan(glm::radians(fov * 0.5f)) * billboardHeight / screenHeight;

glm::mat4 model = glm::mat4(1.0f);
model = glm::translate(model, billboardPos);
model *= billboardRotation;  // Face camera
model = glm::scale(model, glm::vec3(scale, scale, 1.0f));
```

### UI Scaling

Scale UI elements for different resolutions:

```cpp
float uiScale = windowHeight / 1080.0f;  // 1080p reference

glm::mat4 uiTransform = glm::mat4(1.0f);
uiTransform = glm::translate(uiTransform, glm::vec3(x, y, 0));
uiTransform = glm::scale(uiTransform, glm::vec3(uiScale, uiScale, 1.0f));
```

## Key Takeaways

- Translation moves objects by adding displacement vector
- Translation matrix has identity diagonal with translation in last column
- Scaling multiplies coordinates by scale factors
- Uniform scaling preserves angles; non-uniform scaling does not
- Scaling about arbitrary point requires translate-scale-translate sequence
- Negative scaling creates reflections but reverses winding order
- Non-uniform scaling requires normal matrix for correct lighting
- Transformation order matters: T×S ≠ S×T
- Points (w=1) affected by translation; vectors (w=0) are not
- Translation and scaling are building blocks for complex transformations

Understanding translation and scaling provides the foundation for positioning objects in 3D scenes and prepares you for more complex transformations like rotation.
