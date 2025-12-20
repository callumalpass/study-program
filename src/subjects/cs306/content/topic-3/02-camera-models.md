# Camera Models

Camera models in computer graphics define how the 3D world is viewed and projected onto a 2D image plane. Understanding camera models—from the mathematical pinhole camera to practical virtual cameras—is essential for implementing realistic rendering, controlling viewpoints, and creating compelling visual experiences. This section explores camera geometry, parameters, and implementation strategies.

## The Pinhole Camera Model

The **pinhole camera** is the fundamental mathematical model for perspective projection.

### Physical Pinhole Camera

A simple camera with a tiny aperture (pinhole):

```
Scene         Pinhole      Image Plane
              (aperture)
  ●──────╲        ●        ╱──────●
          ╲      /║\      ╱
           ╲    / ║ \    ╱
            ╲  /  ║  \  ╱
             ╲/   ║   \/
             ●────║────● Inverted image
                  ║
                  d (focal length)
```

**Properties**:
- Image is **inverted** (upside down)
- **No lens distortion** (ideal)
- Everything is in **perfect focus**
- Smaller aperture → sharper image, less light

### Mathematical Model

**Similar triangles** relate world point to image point:

```
Point P at (X, Y, Z) in camera space
Projects to (x, y) on image plane at distance f

By similar triangles:
x / f = X / Z  →  x = f × (X / Z)
y / f = Y / Z  →  y = f × (Y / Z)

where:
  f = focal length (distance to image plane)
  Z = depth of point from camera
```

**Key insight**: Divide by depth (Z) creates perspective effect.

## Virtual Camera

Computer graphics uses a **virtual camera** that inverts the image plane to avoid upside-down images:

```
 Camera space (right-handed):
    Y
    │
    │
    └───X
   /
  Z (points toward camera, opposite of view direction)

Image plane in front of camera (virtual):
    Y
    │     ┌─────────┐
    │     │ Image   │
    └───X │ Plane   │
   /      └─────────┘
  Z
  │
  ● Camera at origin
```

**Convention**: Camera looks down **-Z** axis, image plane at Z = -f (in front).

### Projection Formula

```
Given point P = (X, Y, Z) in camera space:

Projected point on image plane:
x = -f × (X / Z)
y = -f × (Y / Z)

Negative sign because image plane is at Z = -f
```

**Homogeneous coordinates**:
```
⎡ x ⎤   ⎡ f  0  0   0 ⎤   ⎡ X ⎤   ⎡ fX ⎤
⎢ y ⎥ = ⎢ 0  f  0   0 ⎥ × ⎢ Y ⎥ = ⎢ fY ⎥
⎢ z ⎥   ⎢ 0  0  f   0 ⎥   ⎢ Z ⎥   ⎢ fZ ⎥
⎣ w ⎦   ⎣ 0  0  1   0 ⎦   ⎣ 1 ⎦   ⎣  Z ⎦

After perspective division (÷ w):
x' = fX / Z
y' = fY / Z
z' = f  (constant)
```

## Camera Parameters

### Extrinsic Parameters

**Extrinsic parameters** define camera position and orientation in world space:

- **Position**: (px, py, pz) - where camera is located
- **Orientation**: Rotation (often as quaternion or Euler angles)
- **Look-at point**: Alternative to explicit orientation

**View matrix** encodes extrinsic parameters:
```cpp
glm::vec3 position = glm::vec3(0, 5, 10);
glm::vec3 target = glm::vec3(0, 0, 0);
glm::vec3 up = glm::vec3(0, 1, 0);

glm::mat4 viewMatrix = glm::lookAt(position, target, up);
```

### Intrinsic Parameters

**Intrinsic parameters** define internal camera characteristics:

- **Focal length** (f): Distance from camera to image plane
- **Field of view** (FOV): Angle of visible region
- **Aspect ratio**: Width / height of image
- **Principal point**: Center of projection (usually image center)
- **Lens distortion** (advanced): Radial/tangential distortion

**Projection matrix** encodes intrinsic parameters:
```cpp
float fov = glm::radians(60.0f);      // 60-degree FOV
float aspect = 1920.0f / 1080.0f;     // 16:9 aspect ratio
float near = 0.1f;                     // Near clip plane
float far = 100.0f;                    // Far clip plane

glm::mat4 projection = glm::perspective(fov, aspect, near, far);
```

### Relationship: Focal Length and FOV

```
tan(FOV / 2) = (sensor_width / 2) / f

For vertical FOV:
tan(FOV_y / 2) = h / (2f)

where:
  h = image plane height
  f = focal length
```

**Example**:
```cpp
// FOV to focal length (in pixels)
float fov_radians = glm::radians(60.0f);
float imageHeight = 1080.0f;
float focalLength = (imageHeight / 2.0f) / tan(fov_radians / 2.0f);
// Result: f ≈ 935 pixels

// Focal length to FOV
float fov = 2.0f * atan(imageHeight / (2.0f * focalLength));
```

## Camera Types

### First-Person Camera (FPS)

User views world from camera position, controls with mouse/keyboard:

```cpp
class FPSCamera {
    glm::vec3 position = glm::vec3(0, 1.7, 0);  // Eye height
    glm::vec3 front = glm::vec3(0, 0, -1);
    glm::vec3 up = glm::vec3(0, 1, 0);
    glm::vec3 right;

    float yaw = -90.0f;   // Look along -Z initially
    float pitch = 0.0f;
    float movementSpeed = 2.5f;
    float mouseSensitivity = 0.1f;

    void updateVectors() {
        // Calculate front vector from yaw and pitch
        front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
        front.y = sin(glm::radians(pitch));
        front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
        front = glm::normalize(front);

        right = glm::normalize(glm::cross(front, glm::vec3(0, 1, 0)));
        up = glm::normalize(glm::cross(right, front));
    }

    void processKeyboard(Direction dir, float deltaTime) {
        float velocity = movementSpeed * deltaTime;
        if (dir == FORWARD)  position += front * velocity;
        if (dir == BACKWARD) position -= front * velocity;
        if (dir == LEFT)     position -= right * velocity;
        if (dir == RIGHT)    position += right * velocity;
    }

    void processMouseMovement(float xoffset, float yoffset) {
        yaw += xoffset * mouseSensitivity;
        pitch += yoffset * mouseSensitivity;

        // Constrain pitch to avoid gimbal lock
        pitch = glm::clamp(pitch, -89.0f, 89.0f);

        updateVectors();
    }

    glm::mat4 getViewMatrix() {
        return glm::lookAt(position, position + front, up);
    }
};
```

### Orbit Camera (Arcball)

Orbits around a target point, common for object viewers:

```cpp
class OrbitCamera {
    glm::vec3 target = glm::vec3(0, 0, 0);
    float distance = 10.0f;
    float yaw = 0.0f;
    float pitch = 30.0f;

    glm::vec3 getPosition() {
        glm::vec3 pos;
        pos.x = target.x + distance * cos(glm::radians(pitch)) * sin(glm::radians(yaw));
        pos.y = target.y + distance * sin(glm::radians(pitch));
        pos.z = target.z + distance * cos(glm::radians(pitch)) * cos(glm::radians(yaw));
        return pos;
    }

    void orbit(float yawDelta, float pitchDelta) {
        yaw += yawDelta;
        pitch += pitchDelta;
        pitch = glm::clamp(pitch, -89.0f, 89.0f);
    }

    void zoom(float delta) {
        distance -= delta;
        distance = glm::clamp(distance, 1.0f, 100.0f);
    }

    void pan(float dx, float dy) {
        glm::vec3 right = glm::normalize(glm::cross(getFront(), glm::vec3(0, 1, 0)));
        glm::vec3 up = glm::normalize(glm::cross(right, getFront()));

        target += right * dx * distance * 0.01f;
        target += up * dy * distance * 0.01f;
    }

    glm::mat4 getViewMatrix() {
        return glm::lookAt(getPosition(), target, glm::vec3(0, 1, 0));
    }
};
```

### Third-Person Camera

Follows character from behind:

```cpp
class ThirdPersonCamera {
    glm::vec3 targetPosition;  // Character position
    glm::vec3 targetFront;     // Character facing direction
    float distance = 5.0f;
    float height = 2.0f;

    glm::vec3 getCameraPosition() {
        // Position behind and above character
        return targetPosition - targetFront * distance + glm::vec3(0, height, 0);
    }

    glm::mat4 getViewMatrix() {
        glm::vec3 cameraPos = getCameraPosition();
        glm::vec3 lookAt = targetPosition + glm::vec3(0, height * 0.5f, 0);
        return glm::lookAt(cameraPos, lookAt, glm::vec3(0, 1, 0));
    }

    // Spring-based smooth follow
    void update(float deltaTime) {
        float stiffness = 5.0f;
        glm::vec3 desiredPos = getCameraPosition();
        currentPos += (desiredPos - currentPos) * stiffness * deltaTime;
    }
};
```

## Advanced Camera Features

### Camera Shake

Add procedural shake for impacts, explosions:

```cpp
class CameraShake {
    float trauma = 0.0f;  // 0 to 1
    float seed = 0.0f;

    void addTrauma(float amount) {
        trauma = glm::clamp(trauma + amount, 0.0f, 1.0f);
    }

    glm::vec3 getOffset(float time) {
        if (trauma <= 0.0f) return glm::vec3(0);

        float shake = trauma * trauma;  // Square for smoother falloff

        // Perlin noise or simple oscillation
        float offsetX = (noise(seed + time * 10.0f) - 0.5f) * shake * 0.5f;
        float offsetY = (noise(seed + time * 11.0f + 100.0f) - 0.5f) * shake * 0.5f;
        float offsetZ = (noise(seed + time * 9.0f + 200.0f) - 0.5f) * shake * 0.2f;

        trauma -= 0.5f * deltaTime;  // Decay over time
        trauma = glm::max(0.0f, trauma);

        return glm::vec3(offsetX, offsetY, offsetZ);
    }
};
```

### Depth of Field

Simulate lens focus (post-processing effect):

```cpp
// In fragment shader
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform float focusDistance;
uniform float focusRange;

void main() {
    float depth = texture(depthTexture, texCoord).r;
    float coc = abs(depth - focusDistance) / focusRange;  // Circle of confusion

    // Blur based on CoC
    vec3 color = vec3(0);
    int samples = int(coc * 10.0);
    for (int i = 0; i < samples; i++) {
        vec2 offset = poissonDisk[i] * coc * 0.01;
        color += texture(colorTexture, texCoord + offset).rgb;
    }
    fragColor = vec4(color / float(samples), 1.0);
}
```

### Motion Blur

Simulate camera/object motion:

```cpp
// Store previous frame's view-projection matrix
glm::mat4 prevViewProj;

// In fragment shader
uniform mat4 currentVP;
uniform mat4 previousVP;

void main() {
    // Current position in NDC
    vec4 currentPos = vec4(texCoord * 2.0 - 1.0, depth, 1.0);

    // Reproject to previous frame
    vec4 prevPos = previousVP * inverse(currentVP) * currentPos;
    prevPos /= prevPos.w;

    // Motion vector
    vec2 velocity = (currentPos.xy - prevPos.xy) * 0.5;

    // Blur along motion
    vec3 color = vec3(0);
    for (int i = 0; i < samples; i++) {
        vec2 offset = velocity * (float(i) / float(samples));
        color += texture(colorTexture, texCoord + offset).rgb;
    }
    fragColor = vec4(color / float(samples), 1.0);
}
```

## Camera Constraints

### Collision Detection

Prevent camera from going through walls:

```cpp
void preventWallClipping() {
    glm::vec3 desired = calculateDesiredPosition();
    glm::vec3 direction = glm::normalize(desired - target);

    // Raycast from target to desired position
    RaycastHit hit;
    if (raycast(target, direction, distance, hit)) {
        // Hit wall, stop at hit point with small offset
        actualPosition = hit.point - direction * 0.1f;
    } else {
        actualPosition = desired;
    }
}
```

### Ground Clamping

Keep camera above terrain:

```cpp
void clampToGround() {
    float terrainHeight = getTerrainHeight(position.x, position.z);
    float minHeight = terrainHeight + 1.5f;  // Stay 1.5 units above ground

    if (position.y < minHeight) {
        position.y = minHeight;
    }
}
```

## Key Takeaways

- Pinhole camera model basis for perspective projection
- Virtual camera places image plane in front to avoid inversion
- Extrinsic parameters: camera position and orientation (view matrix)
- Intrinsic parameters: FOV, aspect ratio, focal length (projection matrix)
- FOV and focal length are inversely related
- FPS camera: first-person view with pitch/yaw control
- Orbit camera: revolves around target point
- Third-person camera: follows character from behind
- Camera shake adds impact feel to gameplay
- Depth of field and motion blur enhance realism
- Camera constraints prevent undesirable behavior (clipping, going underground)

Understanding camera models enables you to implement flexible, realistic viewpoints for any graphics application, from games to scientific visualization.
