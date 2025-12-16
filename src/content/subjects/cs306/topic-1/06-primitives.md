# Graphics Primitives

Graphics primitives are the basic geometric building blocks used to construct complex scenes in computer graphics. While modern 3D graphics can represent intricate models with millions of details, everything ultimately reduces to simple geometric shapes—primarily points, lines, and triangles. Understanding these primitives and how they're represented and processed is fundamental to graphics programming.

## What Are Primitives?

**Graphics primitives** are the fundamental geometric entities that rendering hardware can process directly. Modern GPUs are optimized for rasterizing these basic shapes at tremendous speeds.

The most common primitives are:

- **Points**: Individual vertices
- **Lines**: Connections between two vertices
- **Triangles**: Three vertices forming a filled polygon

```
Primitives:

Point:          Line:           Triangle:
  ●              ●──────●          ●
                                 /│\
                                / │ \
                               /  │  \
                              ●───┴───●
```

Higher-level shapes (quads, polygons, curves) are either decomposed into these primitives or processed with specialized techniques.

## Why Triangles?

Triangles have become the **universal primitive** for 3D graphics:

### Mathematical Properties

**Always Planar**: Three points always define a plane. More than three points may not be coplanar, causing rendering issues.

```
Triangle (3 points):        Quad (4 points):
Always planar ✓            May be non-planar ✗

     ●                          ●────────●
    /│\                        /        /
   / │ \                      /        / (twisted)
  /  │  \                    ●────────●
 ●───┴───●
```

**Well-Defined Normal**: A triangle has a single, unambiguous surface normal computed from the cross product of two edges.

```
Triangle normal:
    V2
    ●
   /│\
  / │ \     N = normalize((V1-V0) × (V2-V0))
 /  │n \
●───┴───●
V0      V1

Quad normal (ambiguous):
●────────●
│ n1  n2?│  Which normal to use?
│        │
●────────●
```

**Guaranteed Convex**: All triangles are convex, simplifying rasterization and intersection tests.

**Simple Interpolation**: Barycentric coordinates provide elegant interpolation within triangles.

### Hardware Optimization

Modern GPUs are **heavily optimized for triangles**:

- Fixed-function triangle rasterizers
- Efficient triangle setup hardware
- Optimized triangle caches
- Fast triangle intersection (RT cores)

Rendering billions of triangles per second is feasible; rendering billions of arbitrary polygons is not.

## Point Primitives

**Points** render individual vertices as pixels or sprites.

### Point Rendering

```cpp
// Define point vertices
float points[] = {
    // x, y, z
    0.0f, 0.0f, 0.0f,
    1.0f, 0.0f, 0.0f,
    0.5f, 1.0f, 0.0f,
};

// Draw points
glPointSize(5.0f);  // Point size in pixels
glDrawArrays(GL_POINTS, 0, 3);
```

### Point Size

**Fixed Size**: Specified in pixels, independent of distance
```glsl
// Vertex shader
gl_PointSize = 10.0;  // 10-pixel points
```

**Distance-Attenuated**: Size decreases with distance
```glsl
float distance = length(viewPos);
gl_PointSize = baseSize / distance;
```

### Point Sprites

Points can be textured to create **sprites** or **billboards**:

```glsl
// Fragment shader for textured point
uniform sampler2D spriteTexture;

void main() {
    // gl_PointCoord is (0,0) to (1,1) across the point
    vec4 texColor = texture(spriteTexture, gl_PointCoord);
    if (texColor.a < 0.1) discard;  // Transparent pixels
    fragColor = texColor;
}
```

**Use Cases**:
- Particle systems (fire, smoke, sparks)
- Point clouds (3D scanning, LiDAR)
- Stars in space scenes
- Debug visualization

### Point Cloud Example

```cpp
// Render 3D point cloud
struct Point {
    glm::vec3 position;
    glm::vec3 color;
};

std::vector<Point> pointCloud;
// ... load point cloud data

// Vertex shader
layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aColor;

out vec3 vColor;

void main() {
    gl_Position = projection * view * vec4(aPosition, 1.0);
    gl_PointSize = 3.0;
    vColor = aColor;
}

// Fragment shader
in vec3 vColor;
out vec4 fragColor;

void main() {
    // Circular point (not square)
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;

    fragColor = vec4(vColor, 1.0);
}
```

## Line Primitives

**Lines** connect two vertices with a stroke.

### Line Modes

**GL_LINES**: Separate line segments
```
Vertices: V0 V1 V2 V3 V4 V5
Lines:    V0─V1  V2─V3  V4─V5

●────●  ●────●  ●────●
```

**GL_LINE_STRIP**: Connected line segments
```
Vertices: V0 V1 V2 V3 V4
Lines:    V0─V1─V2─V3─V4

●────●────●────●────●
```

**GL_LINE_LOOP**: Closed line strip
```
Vertices: V0 V1 V2 V3
Lines:    V0─V1─V2─V3─V0

●────●
│    │
●────●
```

### Line Rendering

```cpp
// Draw wireframe cube
glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);  // Wireframe mode
glLineWidth(2.0f);                          // Line thickness
glDrawElements(GL_TRIANGLES, 36, GL_UNSIGNED_INT, 0);
// Triangles rendered as edges

// Or explicitly use line primitives
GLuint lineIndices[] = {
    0,1, 1,2, 2,3, 3,0,  // Bottom face
    4,5, 5,6, 6,7, 7,4,  // Top face
    0,4, 1,5, 2,6, 3,7   // Vertical edges
};
glDrawElements(GL_LINES, 24, GL_UNSIGNED_INT, lineIndices);
```

### Line Limitations

**Width Limitations**: Many GPUs only support 1-pixel lines reliably
- glLineWidth may be ignored
- Maximum width often clamped to 10 pixels

**No Caps or Joins**: Lines are simply rasterized segments without sophisticated stroke rendering

**Anti-Aliasing**: Line anti-aliasing support varies

For high-quality lines, **render as thin quads** (geometry shader or instancing):

```glsl
// Geometry shader to expand lines to quads
layout(lines) in;
layout(triangle_strip, max_vertices = 4) out;

uniform float lineWidth;
uniform mat4 projection;

void main() {
    vec4 p0 = gl_in[0].gl_Position;
    vec4 p1 = gl_in[1].gl_Position;

    // Calculate perpendicular direction in screen space
    vec2 dir = normalize(p1.xy - p0.xy);
    vec2 perp = vec2(-dir.y, dir.x) * lineWidth;

    // Emit quad
    gl_Position = projection * (p0 + vec4(perp, 0, 0));
    EmitVertex();
    gl_Position = projection * (p0 - vec4(perp, 0, 0));
    EmitVertex();
    gl_Position = projection * (p1 + vec4(perp, 0, 0));
    EmitVertex();
    gl_Position = projection * (p1 - vec4(perp, 0, 0));
    EmitVertex();
    EndPrimitive();
}
```

**Use Cases**:
- Wireframe rendering
- Grid lines
- Debug visualization
- Graph plotting
- UI elements

## Triangle Primitives

**Triangles** are the workhorse primitive of 3D graphics.

### Triangle Modes

**GL_TRIANGLES**: Separate triangles
```
Vertices: V0 V1 V2 V3 V4 V5
Triangles: (V0,V1,V2) (V3,V4,V5)

●        ●
│\       │\
│ \      │ \
│  \     │  \
●───●    ●───●
```

**GL_TRIANGLE_STRIP**: Shared vertices
```
Vertices: V0 V1 V2 V3 V4
Triangles: (V0,V1,V2) (V2,V1,V3) (V2,V3,V4)

●───●───●
 \ / \ /
  ●───●

Note: Winding order alternates
```

**GL_TRIANGLE_FAN**: Share first vertex
```
Vertices: V0 V1 V2 V3 V4
Triangles: (V0,V1,V2) (V0,V2,V3) (V0,V3,V4)

   ●V1
  /│\
 / │ \
●──●──●
V0 V2 V3
```

### Triangle Efficiency

**Index Buffers** eliminate duplicate vertices:

```cpp
// Without indexing: 36 vertices for cube (12 triangles × 3 vertices)
float vertices_unindexed[108] = { /* 36 vertices */ };

// With indexing: 8 unique vertices + 36 indices
float vertices[24] = {
    // 8 unique cube vertices
    -1, -1, -1,  // 0
     1, -1, -1,  // 1
    // ...
};

unsigned int indices[36] = {
    // Front face
    0, 1, 2,  2, 3, 0,
    // Back face
    4, 5, 6,  6, 7, 4,
    // ... other faces
};

// Upload
glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

// Draw
glDrawElements(GL_TRIANGLES, 36, GL_UNSIGNED_INT, 0);
```

**Memory Savings**:
```
Sphere (1000 triangles):
  Without indexing: 3000 vertices
  With indexing: ~500 vertices + 3000 indices
  Savings: ~83% vertex data reduction
```

### Triangle Strips

Triangle strips save vertices for connected geometry:

```cpp
// Quad as triangle strip
float quad_vertices[] = {
    -1, -1, 0,  // V0
     1, -1, 0,  // V1
    -1,  1, 0,  // V2
     1,  1, 0   // V3
};

glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
// Creates triangles: (V0,V1,V2) and (V1,V3,V2)
```

**Strip Efficiency**:
```
Separate triangles: N triangles = 3N vertices
Triangle strip: N triangles = N+2 vertices
```

**Practical Note**: Modern GPUs with vertex caching make strips less critical than previously, but they're still beneficial for certain mesh types.

## Face Culling and Winding Order

Triangle **winding order** determines which side is front-facing:

### Winding Order

**Counter-Clockwise (CCW)**: Front face (default in OpenGL)
```
     V2
     ●
    /│
   / │   Front view
  /  │
 ●───●
V0   V1

Vertices listed: V0 → V1 → V2 (counter-clockwise)
```

**Clockwise (CW)**: Back face
```
     V2
     ●
     │\
     │ \   Back view (or reverse winding)
     │  \
     ●───●
    V0   V1

Vertices listed: V0 → V2 → V1 (clockwise)
```

### Face Culling

**Backface culling** skips rendering triangles facing away from camera:

```cpp
glEnable(GL_CULL_FACE);
glCullFace(GL_BACK);   // Don't render back faces (default)
glFrontFace(GL_CCW);   // CCW winding = front face (default)

// For rendering inside objects (like a room):
glCullFace(GL_FRONT);  // Cull front faces, render back faces
```

**Performance**: Culling ~50% of triangles saves rasterization cost

**Normal Calculation**: Winding order defines normal direction
```cpp
glm::vec3 calculateNormal(glm::vec3 v0, glm::vec3 v1, glm::vec3 v2) {
    glm::vec3 edge1 = v1 - v0;
    glm::vec3 edge2 = v2 - v0;
    return glm::normalize(glm::cross(edge1, edge2));
}

// For CCW winding, normal points outward
// For CW winding, normal points inward
```

## Triangle Meshes

Complex models are represented as **triangle meshes**—collections of triangles sharing vertices.

### Mesh Representation

```cpp
struct Mesh {
    std::vector<Vertex> vertices;
    std::vector<unsigned int> indices;
    Material material;

    // Render
    void draw() {
        glBindVertexArray(VAO);
        glDrawElements(GL_TRIANGLES, indices.size(), GL_UNSIGNED_INT, 0);
    }
};

struct Vertex {
    glm::vec3 position;
    glm::vec3 normal;
    glm::vec2 texCoord;
    glm::vec3 tangent;
    glm::vec3 bitangent;
};
```

### Mesh Topology

**Manifold vs Non-Manifold**:

Manifold (well-formed):
- Every edge shared by exactly 2 triangles
- No holes, self-intersections, or disconnected parts
- Required for some algorithms (subdivision, boolean operations)

Non-Manifold (problematic):
- Edges shared by more than 2 triangles
- T-junctions, holes
- Can cause rendering artifacts

```
Manifold:           Non-Manifold:
●───●───●           ●───●───●
│\ /│\ /│           │\ /│\ /│
│ ● │ ● │           │ ● │ ●─● (extra edge)
│/ \│/ \│           │/ \│/ \│
●───●───●           ●───●───●
```

### Mesh Normals

**Flat Shading**: One normal per triangle
```cpp
for (triangle : triangles) {
    vec3 normal = calculateNormal(v0, v1, v2);
    // All vertices of triangle use same normal
}
```

**Smooth Shading**: Average normals at shared vertices
```cpp
// Initialize vertex normals to zero
for (vertex : vertices) vertex.normal = vec3(0);

// Accumulate face normals
for (triangle : triangles) {
    vec3 faceNormal = calculateNormal(v0, v1, v2);
    vertices[i0].normal += faceNormal;
    vertices[i1].normal += faceNormal;
    vertices[i2].normal += faceNormal;
}

// Normalize
for (vertex : vertices) {
    vertex.normal = normalize(vertex.normal);
}
```

```
Flat shading:       Smooth shading:
●───────●           ●───────●
│\   n  │           │\  n↗  │
│ \  ↑  │           │ \ ↑   │
│  \ │  │           │  \│   │
│   \│  │           │n→ \   │
●────●──●           ●────●──●
```

### Triangle Adjacency

Some algorithms need **adjacency information**:

```cpp
struct Triangle {
    unsigned int vertices[3];     // Vertex indices
    unsigned int neighbors[3];    // Adjacent triangle indices
};

// neighbors[i] is triangle adjacent to edge opposite vertex i
```

**Use Cases**:
- Silhouette detection (for shadows)
- Subdivision surfaces
- Mesh simplification
- Topological operations

## Primitive Assembly and Rasterization

Understanding how primitives become pixels:

### Primitive Assembly

After vertex shader, the GPU **assembles** primitives from vertices:

```
Vertex Stream: V0 V1 V2 V3 V4 V5 ...

GL_TRIANGLES:
  Primitive 0: (V0, V1, V2)
  Primitive 1: (V3, V4, V5)
  ...

GL_TRIANGLE_STRIP:
  Primitive 0: (V0, V1, V2)
  Primitive 1: (V1, V3, V2)  // Note: winding flipped
  Primitive 2: (V2, V3, V4)
  ...
```

### Triangle Rasterization

Rasterization determines which pixels are covered:

```
Triangle in screen space:        Rasterized fragments:

    V2 (200, 100)                    ░░░▓▓▓░░░
     *                               ░░▓▓▓▓▓░░
    /│\                              ░▓▓▓▓▓▓▓░
   / │ \                             ▓▓▓▓▓▓▓▓▓
  /  │  \                            ▓▓▓▓▓▓▓▓▓
 /   │   \                           ▓▓▓▓▓▓▓▓▓
*────┴────*
V0        V1
(100,200) (300,200)

▓ = covered pixels (fragments generated)
░ = outside triangle
```

**Top-Left Rule**: Consistent edge handling prevents gaps between adjacent triangles

```
Adjacent triangles:
●───●          No gaps or overlaps
│\ /│          at shared edge
│ ● │
│/ \│
●───●
```

## Advanced Primitive Topics

### Provoking Vertex

When flat shading, which vertex's attributes are used?

```cpp
glProvokingVertex(GL_FIRST_VERTEX_CONVENTION);  // First vertex
glProvokingVertex(GL_LAST_VERTEX_CONVENTION);   // Last vertex (default)
```

### Primitive Restart

Efficiently break triangle strips:

```cpp
glEnable(GL_PRIMITIVE_RESTART);
glPrimitiveRestartIndex(0xFFFFFFFF);

// Indices for two separate strips
unsigned int indices[] = {
    0, 1, 2, 3, 4,      // First strip
    0xFFFFFFFF,         // Restart
    5, 6, 7, 8, 9       // Second strip
};
```

### Tessellation Primitives

Tessellation shaders work with **patch** primitives:

```cpp
glPatchParameteri(GL_PATCH_VERTICES, 3);  // Triangular patches
glDrawArrays(GL_PATCHES, 0, vertexCount);
```

## Choosing Primitives

**Points**: Particle systems, point clouds, debug markers
**Lines**: Wireframes, grids, debug visualization, UI
**Triangles**: Everything else (3D models, terrain, characters)

**Modern Approach**: Almost exclusively triangles for 3D geometry
- Hardware optimized
- Well-understood algorithms
- Predictable behavior

## Key Takeaways

- Graphics primitives are fundamental geometric building blocks
- Points: Individual vertices, useful for particles and point clouds
- Lines: Connections between vertices, limited width support
- Triangles: Universal 3D primitive, always planar and convex
- Triangles preferred for hardware efficiency and mathematical properties
- Index buffers reduce memory by sharing vertices
- Triangle strips/fans save vertices for connected geometry
- Winding order determines front/back faces for culling
- Face culling improves performance by skipping invisible geometry
- Meshes are collections of triangles representing complex models
- Understanding primitives essential for efficient graphics programming

Mastering primitives and their properties is fundamental to creating efficient, correct graphics applications.
