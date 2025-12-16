# Clipping

Clipping is the process of removing or trimming geometry that lies outside the view frustum. Efficient clipping is essential for performance—rendering only visible geometry—and correctness—preventing artifacts from off-screen primitives. Understanding clipping algorithms, when clipping occurs in the pipeline, and how to optimize clipping tests is crucial for efficient graphics applications.

## Purpose of Clipping

**Clipping** removes geometry outside the viewable region for several reasons:

1. **Performance**: Don't rasterize invisible primitives
2. **Correctness**: Prevent wraparound and mathematical errors
3. **Memory**: Don't fill framebuffer with off-screen fragments
4. **Precision**: Avoid numerical issues with extreme coordinates

```
View frustum:               Clipping result:
    ┌──────┐                    ┌──────┐
    │  ●───┼─●                  │  ●───●
    │ /    │  \    →            │ /    │
    │/     │   \                │/     │
    ●──────┼────●               ●──────●
           │
     Clip boundary            Trimmed to boundary
```

## Where Clipping Occurs

Clipping happens in **clip space** (after projection, before perspective division):

```
Pipeline:
Vertex Shader → Clip Space (4D homogeneous)
                      ↓
                [CLIPPING] ← Happens here
                      ↓
              Perspective Division → NDC
                      ↓
              Viewport Transform → Screen
```

**Why clip in clip space?**
- Clipping planes are linear in homogeneous coordinates
- Before perspective division (avoids divide-by-zero)
- Unified handling for perspective and orthographic
- Hardware-optimized

## Clip Space Boundaries

**OpenGL clip space**: Vertex is inside if:

```
-w ≤ x ≤ w
-w ≤ y ≤ w
-w ≤ z ≤ w
 w > 0
```

**Six clipping planes**:
- Left: x = -w
- Right: x = w
- Bottom: y = -w
- Top: y = w
- Near: z = -w
- Far: z = w

```
Clip space cube (shown in NDC after division):
       (1,1,1)
       ●───────●
      /│      /│
     / │     / │
    ●──────●  │
    │  │   │  │
    │  ●───│──●
    │ /    │ /
    │/     │/
    ●──────●
 (-1,-1,-1)
```

## Clipping Algorithms

### Trivial Accept/Reject

Test entire primitive before expensive clipping:

**Point clipping**:
```cpp
bool isInsideFrustum(glm::vec4 clipPos) {
    return clipPos.x >= -clipPos.w && clipPos.x <= clipPos.w &&
           clipPos.y >= -clipPos.w && clipPos.y <= clipPos.w &&
           clipPos.z >= -clipPos.w && clipPos.z <= clipPos.w &&
           clipPos.w > 0;
}
```

**Triangle clipping**:
```cpp
enum ClipResult { INSIDE, OUTSIDE, INTERSECT };

ClipResult classifyTriangle(glm::vec4 v0, glm::vec4 v1, glm::vec4 v2) {
    bool in0 = isInsideFrustum(v0);
    bool in1 = isInsideFrustum(v1);
    bool in2 = isInsideFrustum(v2);

    if (in0 && in1 && in2) {
        return INSIDE;  // Trivial accept: all vertices inside
    }

    // Check if all vertices outside same plane
    for (int plane = 0; plane < 6; plane++) {
        if (isOutsidePlane(v0, plane) &&
            isOutsidePlane(v1, plane) &&
            isOutsidePlane(v2, plane)) {
            return OUTSIDE;  // Trivial reject: all outside one plane
        }
    }

    return INTERSECT;  // Straddles boundary: needs clipping
}
```

### Sutherland-Hodgman Algorithm

Classic polygon clipping algorithm, clips against one plane at a time:

**Algorithm**:
1. For each clipping plane:
   - Process each polygon edge
   - Output vertices based on edge classification

**Edge cases** (vertex in/out of plane):
```
Case 1: Both inside        Case 2: Enter plane
  In  ●────● In              Out ●────● In
      │    │                     │  ╱
  ────┼────┼──── Plane      ────┼─●───── Plane
      │    │                     │/

  Output: Second vertex     Output: Intersection + Second

Case 3: Exit plane          Case 4: Both outside
  In  ●────● Out             Out ●────● Out
      │╲   │                     │    │
  ────┼─●──┼──── Plane      ────┼────┼──── Plane
      │  ╲ │                     │    │

  Output: Intersection      Output: Nothing
```

**Implementation**:
```cpp
std::vector<glm::vec4> clipPolygonToPlane(
    const std::vector<glm::vec4>& polygon,
    int planeIndex)
{
    std::vector<glm::vec4> output;

    for (size_t i = 0; i < polygon.size(); i++) {
        glm::vec4 current = polygon[i];
        glm::vec4 next = polygon[(i + 1) % polygon.size()];

        bool currentInside = isInsidePlane(current, planeIndex);
        bool nextInside = isInsidePlane(next, planeIndex);

        if (currentInside && nextInside) {
            // Case 1: Both inside
            output.push_back(next);
        }
        else if (!currentInside && nextInside) {
            // Case 2: Entering
            glm::vec4 intersection = computeIntersection(current, next, planeIndex);
            output.push_back(intersection);
            output.push_back(next);
        }
        else if (currentInside && !nextInside) {
            // Case 3: Exiting
            glm::vec4 intersection = computeIntersection(current, next, planeIndex);
            output.push_back(intersection);
        }
        // Case 4: Both outside - output nothing
    }

    return output;
}

std::vector<glm::vec4> clipPolygon(const std::vector<glm::vec4>& polygon) {
    std::vector<glm::vec4> result = polygon;

    // Clip against all six planes
    for (int plane = 0; plane < 6; plane++) {
        if (result.empty()) break;
        result = clipPolygonToPlane(result, plane);
    }

    return result;
}
```

### Line Clipping: Cohen-Sutherland

Efficient algorithm for clipping line segments:

**Outcode assignment**:
```
Divide space into 9 regions:

  1001 │ 1000 │ 1010
  ─────┼──────┼─────
  0001 │ 0000 │ 0010  ← 0000 = inside
  ─────┼──────┼─────
  0101 │ 0100 │ 0110

  Bits: [above][below][right][left]
```

**Algorithm**:
```cpp
int computeOutcode(glm::vec2 p, glm::vec4 bounds) {
    int code = 0;
    if (p.x < bounds.x) code |= 1;  // Left
    if (p.x > bounds.z) code |= 2;  // Right
    if (p.y < bounds.y) code |= 4;  // Bottom
    if (p.y > bounds.w) code |= 8;  // Top
    return code;
}

bool clipLine(glm::vec2& p0, glm::vec2& p1, glm::vec4 bounds) {
    int code0 = computeOutcode(p0, bounds);
    int code1 = computeOutcode(p1, bounds);

    while (true) {
        if ((code0 | code1) == 0) {
            // Trivial accept: both inside
            return true;
        }
        else if ((code0 & code1) != 0) {
            // Trivial reject: both outside same boundary
            return false;
        }
        else {
            // Needs clipping
            int code = (code0 != 0) ? code0 : code1;
            glm::vec2 p;

            // Find intersection with boundary
            if (code & 8) {  // Top
                p.x = p0.x + (p1.x - p0.x) * (bounds.w - p0.y) / (p1.y - p0.y);
                p.y = bounds.w;
            }
            else if (code & 4) {  // Bottom
                p.x = p0.x + (p1.x - p0.x) * (bounds.y - p0.y) / (p1.y - p0.y);
                p.y = bounds.y;
            }
            else if (code & 2) {  // Right
                p.y = p0.y + (p1.y - p0.y) * (bounds.z - p0.x) / (p1.x - p0.x);
                p.x = bounds.z;
            }
            else if (code & 1) {  // Left
                p.y = p0.y + (p1.y - p0.y) * (bounds.x - p0.x) / (p1.x - p0.x);
                p.x = bounds.x;
            }

            // Replace outside point with intersection
            if (code == code0) {
                p0 = p;
                code0 = computeOutcode(p0, bounds);
            }
            else {
                p1 = p;
                code1 = computeOutcode(p1, bounds);
            }
        }
    }
}
```

## Frustum Culling

**Frustum culling** tests entire objects before sending to GPU:

### Bounding Volume Tests

**Sphere test**:
```cpp
struct Frustum {
    glm::vec4 planes[6];  // ax + by + cz + d = 0

    void extractFromMatrix(glm::mat4 vp) {
        // Extract planes from view-projection matrix
        // Left: col4 + col1
        planes[0] = vp[3] + vp[0];
        // Right: col4 - col1
        planes[1] = vp[3] - vp[0];
        // Bottom: col4 + col2
        planes[2] = vp[3] + vp[1];
        // Top: col4 - col2
        planes[3] = vp[3] - vp[1];
        // Near: col4 + col3
        planes[4] = vp[3] + vp[2];
        // Far: col4 - col3
        planes[5] = vp[3] - vp[2];

        // Normalize
        for (int i = 0; i < 6; i++) {
            float len = glm::length(glm::vec3(planes[i]));
            planes[i] /= len;
        }
    }

    bool testSphere(glm::vec3 center, float radius) {
        for (int i = 0; i < 6; i++) {
            float dist = glm::dot(glm::vec3(planes[i]), center) + planes[i].w;
            if (dist < -radius) {
                return false;  // Outside frustum
            }
        }
        return true;  // Inside or intersecting
    }

    bool testAABB(glm::vec3 min, glm::vec3 max) {
        for (int i = 0; i < 6; i++) {
            glm::vec3 normal = glm::vec3(planes[i]);

            // Positive vertex (farthest along normal)
            glm::vec3 p = min;
            if (normal.x >= 0) p.x = max.x;
            if (normal.y >= 0) p.y = max.y;
            if (normal.z >= 0) p.z = max.z;

            if (glm::dot(normal, p) + planes[i].w < 0) {
                return false;  // Outside
            }
        }
        return true;
    }
};

// Usage
Frustum frustum;
frustum.extractFromMatrix(projection * view);

for (auto& obj : objects) {
    if (frustum.testSphere(obj.position, obj.radius)) {
        render(obj);  // Only render visible objects
    }
}
```

### Hierarchical Culling

Use scene graph for efficient culling:

```cpp
class SceneNode {
    glm::vec3 boundingMin, boundingMax;
    std::vector<SceneNode*> children;

    void render(Frustum& frustum) {
        // Test bounding volume
        if (!frustum.testAABB(boundingMin, boundingMax)) {
            return;  // Entire subtree culled
        }

        // Render this node
        draw();

        // Recursively render children
        for (auto* child : children) {
            child->render(frustum);
        }
    }
};
```

## Near Plane Clipping Issues

### Objects Straddling Near Plane

Objects intersecting near plane can cause artifacts:

```
Camera ●────────● Far
       │╲  Object crosses near plane
   Near│ ╲
  Plane│  ●───●
       │ /   /
       │/   /
       ●───●

Result: Triangle split, potential artifacts
```

**Solutions**:
- Avoid placing objects too close to camera
- Use appropriate near plane distance
- Implement proper near-plane clipping

### Camera Inside Object

```cpp
// Detect if camera inside bounding volume
bool cameraInside = testAABB(cameraPos, objMin, objMax);

if (cameraInside) {
    glDisable(GL_CULL_FACE);  // Render both sides
    // Or: don't render object
}
else {
    glEnable(GL_CULL_FACE);
}
```

## Guard Band Clipping

**Guard band**: Extend clipping region beyond viewport

**Purpose**: Reduce clipping cost for primitives slightly outside view

```
Without guard band:        With guard band:
  ┌──────┐                   ┌──────┐
  │      │                ┌──┤      ├──┐
  │      │  ●───●         │  │      │  │ ●───●
  │      │ /             │  │      │  │/
  └──────┘/              └──┤      ├──┘
         /                  └──────┘
        ●                      ●
  Requires clipping      No clipping needed

Modern GPUs do this automatically
```

## User Clip Planes

Custom clipping planes for special effects:

```cpp
// OpenGL 3.3+: glsl gl_ClipDistance
#version 330 core

layout(location = 0) in vec3 aPosition;
uniform mat4 uMVP;
uniform vec4 uClipPlane;  // (a, b, c, d) for ax+by+cz+d=0

void main() {
    vec4 worldPos = uModel * vec4(aPosition, 1.0);

    gl_Position = uMVP * vec4(aPosition, 1.0);

    // Distance to plane (positive = above)
    gl_ClipDistance[0] = dot(uClipPlane, worldPos);
    // GPU clips if gl_ClipDistance < 0
}

// Enable clipping
glEnable(GL_CLIP_DISTANCE0);
```

**Use cases**:
- Reflections (clip below water plane)
- Portals (clip to portal shape)
- Cross-sections (architectural visualization)

## Occlusion Culling

Advanced technique: don't render occluded objects:

```cpp
// Query if object is visible
GLuint query;
glGenQueries(1, &query);

// Render bounding box with occlusion query
glBeginQuery(GL_SAMPLES_PASSED, query);
renderBoundingBox(object);
glEndQuery(GL_SAMPLES_PASSED);

// Get result (may stall, better to check next frame)
GLuint samplesPassed;
glGetQueryObjectuiv(query, GL_QUERY_RESULT, &samplesPassed);

if (samplesPassed > 0) {
    // Bounding box visible, render full object
    renderObject(object);
}
```

## Key Takeaways

- Clipping removes geometry outside view frustum
- Occurs in clip space (4D homogeneous coordinates)
- Six clipping planes: left, right, top, bottom, near, far
- Trivial accept/reject tests avoid expensive clipping
- Sutherland-Hodgman algorithm clips polygons plane-by-plane
- Cohen-Sutherland efficiently clips line segments
- Frustum culling tests objects before sending to GPU
- Bounding volumes (spheres, AABBs) enable fast culling
- Hierarchical culling leverages scene graph structure
- Near plane clipping can cause artifacts if objects too close
- User clip planes enable custom clipping effects
- Understanding clipping essential for performance optimization

Mastering clipping and culling techniques is crucial for efficient rendering, especially in complex scenes with many objects. Proper culling can dramatically improve performance by reducing unnecessary work.
