# Orthographic Projection

Orthographic projection is a parallel projection that maps 3D coordinates to 2D without perspective foreshortening. Unlike perspective projection, orthographic projection preserves parallel lines and relative sizes regardless of depth, making it ideal for technical drawings, 2D games, UI rendering, and CAD applications. Understanding orthographic projection is essential for applications requiring accurate measurements and parallel viewing.

## What is Orthographic Projection?

**Orthographic projection** (also called **parallel projection**) projects points onto the image plane along parallel rays perpendicular to the projection plane.

```
Parallel projection rays:
    │     │     │     │
    │     │     │     │
    ●     ●     ●     ●  Objects (any depth)
    │     │     │     │
    ╽     ╽     ╽     ╽
────┴─────┴─────┴─────┴──── Image plane
```

**Key properties**:
- No foreshortening (distant objects same size as near)
- Parallel lines remain parallel
- Distances preserved along projection direction
- No vanishing points

## Orthographic vs Perspective

```
Orthographic:              Perspective:
    │                          ╱│
    ●───●                     ╱ │
    │   │                    ╱  ●───●
    │   │                   ╱  ╱   ╱
────┼───┼────           ───●──╱───╱──── Image plane
    │   │               Camera
    ●───●
   Near Far              Near objects larger
  Same size              Far objects smaller
```

**When to use orthographic**:
- 2D games (side-scrollers, top-down)
- UI and HUD elements
- CAD and technical drawings
- Isometric games
- Minimaps and strategic views
- Data visualization

**When to use perspective**:
- 3D games and simulations
- Realistic rendering
- VR and AR
- Architectural walkthroughs

## Orthographic Projection Matrix

The orthographic projection matrix maps a box-shaped view volume to the NDC cube [-1, 1]³.

### View Volume

```
Orthographic view frustum (actually a box):

        (right, top, far)
        ┌────────────┐
       /│           /│
      / │          / │
     /  │         /  │
    ┌───────────┐   │
    │   │       │   │
    │   └───────│───┘
    │  /        │  /
    │ /         │ /
    │/          │/
    └───────────┘
(left, bottom, near)
```

**Parameters**:
- `left`, `right`: x bounds
- `bottom`, `top`: y bounds
- `near`, `far`: z bounds (depth range)

### Matrix Derivation

Map box [left, right] × [bottom, top] × [near, far] to NDC cube [-1, 1]³.

**Scaling**:
```
Scale x: 2 / (right - left)
Scale y: 2 / (top - bottom)
Scale z: -2 / (far - near)  (negative: flip Z direction)
```

**Translation**:
```
Translate x: -(right + left) / 2
Translate y: -(top + bottom) / 2
Translate z: -(far + near) / 2
```

**Combined matrix** (OpenGL convention):
```
⎡ 2/(r-l)     0          0        -(r+l)/(r-l) ⎤
⎢ 0         2/(t-b)      0        -(t+b)/(t-b) ⎥
⎢ 0           0       -2/(f-n)    -(f+n)/(f-n) ⎥
⎣ 0           0          0              1      ⎦

where:
  l, r = left, right
  b, t = bottom, top
  n, f = near, far
```

### GLM Implementation

```cpp
// Asymmetric orthographic projection
glm::mat4 ortho = glm::ortho(
    left, right,    // x bounds
    bottom, top,    // y bounds
    near, far       // z bounds
);

// Example: 20×20 units centered at origin, depth 0.1 to 100
glm::mat4 ortho = glm::ortho(
    -10.0f, 10.0f,   // x: [-10, 10]
    -10.0f, 10.0f,   // y: [-10, 10]
    0.1f, 100.0f     // z: [0.1, 100]
);

// Symmetric (square viewport)
glm::mat4 ortho = glm::ortho(
    -aspectRatio, aspectRatio,   // x: maintain aspect
    -1.0f, 1.0f,                 // y: [-1, 1]
    0.1f, 100.0f
);
```

### Manual Construction

```cpp
glm::mat4 createOrtho(float left, float right,
                      float bottom, float top,
                      float near, float far) {
    glm::mat4 result = glm::mat4(1.0f);

    result[0][0] = 2.0f / (right - left);
    result[1][1] = 2.0f / (top - bottom);
    result[2][2] = -2.0f / (far - near);

    result[3][0] = -(right + left) / (right - left);
    result[3][1] = -(top + bottom) / (top - bottom);
    result[3][2] = -(far + near) / (far - near);

    return result;
}
```

## 2D Orthographic Projection

For 2D rendering, use orthographic projection aligned with screen:

```cpp
// Map pixel coordinates [0, width] × [0, height] to NDC
glm::mat4 projection = glm::ortho(
    0.0f, (float)windowWidth,    // Left to right
    (float)windowHeight, 0.0f,   // Bottom to top (flipped for screen coords)
    -1.0f, 1.0f                  // Minimal depth range
);

// Now vertex at (100, 200) in object space maps to pixel (100, 200)
```

**2D sprite rendering**:
```cpp
struct Sprite {
    glm::vec2 position;  // Screen position
    glm::vec2 size;      // Width, height
    GLuint texture;

    void render() {
        glm::mat4 model = glm::mat4(1.0f);
        model = glm::translate(model, glm::vec3(position, 0));
        model = glm::scale(model, glm::vec3(size, 1));

        shader.setMat4("uModel", model);
        shader.setMat4("uProjection", orthoProjection);  // 2D ortho
        shader.setTexture("uTexture", texture);

        drawQuad();
    }
};
```

## Isometric Projection

**Isometric** is a type of orthographic projection with specific angles:

```
Isometric view:
     Y
     │    ╱
     │   ╱
     │  ╱
     │ ╱
     │╱______ X
    ╱│
   ╱ │
  ╱  │
 Z

Standard isometric angles:
- X-axis: 30° from horizontal
- Y-axis: vertical
- Z-axis: 30° from horizontal (opposite direction)
```

**Isometric projection matrix**:
```cpp
glm::mat4 createIsometric() {
    float angle = glm::radians(30.0f);

    glm::mat4 iso = glm::mat4(1.0f);

    // Rotate around X to tilt view
    iso = glm::rotate(iso, glm::radians(35.264f), glm::vec3(1, 0, 0));

    // Rotate around Y
    iso = glm::rotate(iso, glm::radians(45.0f), glm::vec3(0, 1, 0));

    // Apply orthographic projection
    glm::mat4 ortho = glm::ortho(-10.0f, 10.0f, -10.0f, 10.0f, 0.1f, 100.0f);

    return ortho * iso;
}
```

## Orthographic Camera

```cpp
class OrthographicCamera {
    float left, right, bottom, top;
    float near = 0.1f, far = 100.0f;

    glm::vec3 position = glm::vec3(0, 0, 0);
    float zoom = 1.0f;

    glm::mat4 getProjectionMatrix() {
        // Apply zoom by scaling bounds
        float zLeft = left / zoom;
        float zRight = right / zoom;
        float zBottom = bottom / zoom;
        float zTop = top / zoom;

        return glm::ortho(zLeft, zRight, zBottom, zTop, near, far);
    }

    glm::mat4 getViewMatrix() {
        // Simple translation (no rotation needed for 2D)
        return glm::translate(glm::mat4(1.0f), -position);
    }

    void setSize(float width, float height) {
        left = -width / 2.0f;
        right = width / 2.0f;
        bottom = -height / 2.0f;
        top = height / 2.0f;
    }

    void setZoom(float z) {
        zoom = glm::clamp(z, 0.1f, 10.0f);
    }

    // Convert screen coordinates to world coordinates
    glm::vec2 screenToWorld(glm::vec2 screenPos, glm::vec2 screenSize) {
        // Normalize to [0, 1]
        glm::vec2 normalized = screenPos / screenSize;

        // Map to ortho bounds
        float worldX = left + normalized.x * (right - left);
        float worldY = bottom + (1.0f - normalized.y) * (top - bottom);

        // Apply zoom and position
        return position + glm::vec3(worldX, worldY, 0) / zoom;
    }
};
```

## UI and HUD Rendering

Render UI elements over 3D scene:

```cpp
void renderFrame() {
    // 1. Render 3D scene with perspective
    glm::mat4 perspective = glm::perspective(glm::radians(60.0f), aspect, 0.1f, 100.0f);
    render3DScene(perspective, viewMatrix);

    // 2. Disable depth test for UI
    glDisable(GL_DEPTH_TEST);

    // 3. Render UI with orthographic projection
    glm::mat4 ortho = glm::ortho(0.0f, (float)width, 0.0f, (float)height);
    renderUI(ortho);

    // 4. Re-enable depth test
    glEnable(GL_DEPTH_TEST);
}

void renderUI(glm::mat4 projection) {
    uiShader.use();
    uiShader.setMat4("uProjection", projection);

    // Health bar at top-left
    drawQuad(glm::vec2(10, height - 30), glm::vec2(200, 20), healthColor);

    // Crosshair at center
    drawSprite(glm::vec2(width/2, height/2), glm::vec2(32, 32), crosshairTexture);
}
```

## Shadow Mapping with Orthographic

Directional lights use orthographic projection for shadow mapping:

```cpp
// Create shadow map framebuffer
GLuint shadowFBO, shadowMap;
const int SHADOW_WIDTH = 2048, SHADOW_HEIGHT = 2048;

glGenFramebuffers(1, &shadowFBO);
glGenTextures(1, &shadowMap);
glBindTexture(GL_TEXTURE_2D, shadowMap);
glTexImage2D(GL_TEXTURE_2D, 0, GL_DEPTH_COMPONENT, SHADOW_WIDTH, SHADOW_HEIGHT,
             0, GL_DEPTH_COMPONENT, GL_FLOAT, NULL);
glFramebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D, shadowMap, 0);

// Render shadow map
glBindFramebuffer(GL_FRAMEBUFFER, shadowFBO);
glViewport(0, 0, SHADOW_WIDTH, SHADOW_HEIGHT);
glClear(GL_DEPTH_BUFFER_BIT);

// Light view matrix (directional light position)
glm::vec3 lightDir = glm::normalize(glm::vec3(1, -1, -1));
glm::mat4 lightView = glm::lookAt(
    -lightDir * 50.0f,   // Light position (far from scene)
    glm::vec3(0, 0, 0),  // Look at scene center
    glm::vec3(0, 1, 0)
);

// Orthographic projection for directional light
glm::mat4 lightProjection = glm::ortho(-20.0f, 20.0f, -20.0f, 20.0f, 0.1f, 100.0f);

glm::mat4 lightSpaceMatrix = lightProjection * lightView;

// Render scene from light's perspective
shadowShader.use();
shadowShader.setMat4("uLightSpaceMatrix", lightSpaceMatrix);
renderScene();

glBindFramebuffer(GL_FRAMEBUFFER, 0);
```

## Advantages of Orthographic Projection

1. **No distortion**: Objects same size regardless of depth
2. **Parallel lines preserved**: Important for technical drawings
3. **Simpler math**: No perspective division
4. **Easier UI layout**: Direct pixel mapping
5. **Measurements**: Distances can be measured accurately
6. **Strategic views**: RTS games, maps, schematics

## Disadvantages

1. **Less realistic**: No depth perception from size
2. **Lacks immersion**: Not how humans see
3. **Depth ambiguity**: Hard to judge distance
4. **Limited to certain genres**: Not suitable for first-person games

## Key Takeaways

- Orthographic projection is parallel projection with no foreshortening
- Objects same size regardless of depth (no perspective)
- Projection matrix maps box-shaped view volume to NDC cube
- Ideal for 2D games, UI, CAD, technical drawings, isometric games
- 2D ortho maps screen pixels directly to world coordinates
- Shadow mapping uses orthographic for directional lights
- Simpler than perspective but less realistic
- Essential for applications requiring accurate measurements

Understanding orthographic projection enables you to implement 2D rendering, UI systems, technical visualization, and strategic camera views effectively.
