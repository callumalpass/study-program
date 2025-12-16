# Vertex and Fragment Shaders

## Introduction to Programmable Shaders

Modern graphics pipelines are programmable through **shaders** - small programs that run on the GPU to control rendering. Shaders replaced the fixed-function pipeline, providing flexibility to implement custom lighting, materials, and effects.

The two most important shader stages are:
- **Vertex Shaders**: Process each vertex (position transformation, per-vertex lighting)
- **Fragment Shaders**: Process each pixel/fragment (per-pixel lighting, texturing)

This section introduces shader programming using GLSL (OpenGL Shading Language), though concepts apply to other languages (HLSL for DirectX, MSL for Metal).

## Graphics Pipeline with Shaders

```
Vertex Data → [Vertex Shader] → Primitive Assembly → Rasterization
              → [Fragment Shader] → Per-Fragment Operations → Framebuffer
```

Shaders execute in parallel on GPU cores, processing thousands of vertices/fragments simultaneously.

## GLSL Basics

GLSL is a C-like language with special types for graphics:

```glsl
// Variable types
float x = 1.0;           // Single float
vec2 texCoord;           // 2D vector
vec3 position;           // 3D vector
vec4 color;              // 4D vector (RGBA)
mat3 rotation;           // 3x3 matrix
mat4 modelViewProj;      // 4x4 matrix

// Swizzling - access components
vec4 v = vec4(1.0, 2.0, 3.0, 4.0);
vec3 rgb = v.rgb;        // Get first 3 components
vec2 xy = v.xy;          // Get x and y
float r = v.r;           // Same as v.x

// Component names
// .xyzw - position
// .rgba - color
// .stpq - texture coordinates
```

### Built-in Functions

```glsl
// Math functions
float len = length(v);            // Vector length
vec3 norm = normalize(v);         // Normalize vector
float d = dot(v1, v2);           // Dot product
vec3 c = cross(v1, v2);          // Cross product
float r = reflect(i, n);         // Reflection

// Common functions
float m = min(a, b);
float m = max(a, b);
float c = clamp(x, 0.0, 1.0);    // Clamp to range
float p = pow(x, y);             // Power
float s = sqrt(x);               // Square root

// Interpolation
float i = mix(a, b, t);          // Linear interpolation
```

## Vertex Shader

Vertex shaders process each vertex, transforming positions and passing data to fragment shader.

### Basic Vertex Shader

```glsl
#version 330 core

// Input vertex attributes
layout (location = 0) in vec3 aPosition;  // Vertex position
layout (location = 1) in vec3 aNormal;    // Vertex normal
layout (location = 2) in vec2 aTexCoord;  // Texture coordinates

// Uniform variables (constant for all vertices in draw call)
uniform mat4 uModel;           // Model matrix
uniform mat4 uView;            // View matrix
uniform mat4 uProjection;      // Projection matrix
uniform mat3 uNormalMatrix;    // Normal transformation matrix

// Output to fragment shader
out vec3 vFragPos;      // Fragment position (world space)
out vec3 vNormal;       // Fragment normal
out vec2 vTexCoord;     // Texture coordinates

void main()
{
    // Transform position to world space
    vec4 worldPos = uModel * vec4(aPosition, 1.0);
    vFragPos = worldPos.xyz;

    // Transform normal to world space
    vNormal = uNormalMatrix * aNormal;

    // Pass through texture coordinates
    vTexCoord = aTexCoord;

    // Transform to clip space for rasterization
    gl_Position = uProjection * uView * worldPos;
}
```

### Vertex Shader for Gouraud Shading

Compute lighting at vertices:

```glsl
#version 330 core

layout (location = 0) in vec3 aPosition;
layout (location = 1) in vec3 aNormal;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat3 uNormalMatrix;

// Light properties
uniform vec3 uLightPos;
uniform vec3 uLightColor;
uniform vec3 uViewPos;

// Material properties
uniform vec3 uAmbient;
uniform vec3 uDiffuse;
uniform vec3 uSpecular;
uniform float uShininess;

// Output color (computed at vertex)
out vec3 vColor;

void main()
{
    // Transform position and normal
    vec4 worldPos = uModel * vec4(aPosition, 1.0);
    vec3 fragPos = worldPos.xyz;
    vec3 normal = normalize(uNormalMatrix * aNormal);

    // Ambient
    vec3 ambient = uAmbient * vec3(0.2);

    // Diffuse
    vec3 lightDir = normalize(uLightPos - fragPos);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = uDiffuse * diff * uLightColor;

    // Specular
    vec3 viewDir = normalize(uViewPos - fragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uShininess);
    vec3 specular = uSpecular * spec * uLightColor;

    // Combine (Gouraud: computed per-vertex)
    vColor = ambient + diffuse + specular;

    // Output position
    gl_Position = uProjection * uView * worldPos;
}
```

## Fragment Shader

Fragment shaders determine the final color of each pixel.

### Basic Fragment Shader

```glsl
#version 330 core

// Input from vertex shader (interpolated)
in vec3 vFragPos;
in vec3 vNormal;
in vec2 vTexCoord;

// Uniforms
uniform vec3 uLightPos;
uniform vec3 uLightColor;
uniform vec3 uViewPos;

// Material
uniform vec3 uAmbient;
uniform vec3 uDiffuse;
uniform vec3 uSpecular;
uniform float uShininess;

uniform sampler2D uTexture;  // Texture sampler

// Output
out vec4 FragColor;

void main()
{
    // Sample texture
    vec3 texColor = texture(uTexture, vTexCoord).rgb;

    // Normalize interpolated normal
    vec3 normal = normalize(vNormal);

    // Ambient
    vec3 ambient = uAmbient * texColor;

    // Diffuse
    vec3 lightDir = normalize(uLightPos - vFragPos);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = uDiffuse * diff * uLightColor * texColor;

    // Specular
    vec3 viewDir = normalize(uViewPos - vFragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), uShininess);
    vec3 specular = uSpecular * spec * uLightColor;

    // Combine
    vec3 result = ambient + diffuse + specular;

    FragColor = vec4(result, 1.0);
}
```

### Fragment Shader for Phong Shading

Full per-pixel lighting:

```glsl
#version 330 core

in vec3 vFragPos;
in vec3 vNormal;
in vec2 vTexCoord;

// Multiple lights
#define MAX_LIGHTS 4

struct Light {
    vec3 position;
    vec3 color;
    float intensity;

    // Attenuation
    float constant;
    float linear;
    float quadratic;
};

uniform Light uLights[MAX_LIGHTS];
uniform int uNumLights;
uniform vec3 uViewPos;

// Material
struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;

    sampler2D diffuseMap;
    sampler2D specularMap;
    sampler2D normalMap;
};

uniform Material uMaterial;

out vec4 FragColor;

vec3 calculatePointLight(Light light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
    vec3 lightDir = normalize(light.position - fragPos);

    // Diffuse
    float diff = max(dot(normal, lightDir), 0.0);

    // Specular (Blinn-Phong)
    vec3 halfwayDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfwayDir), 0.0), uMaterial.shininess);

    // Attenuation
    float distance = length(light.position - fragPos);
    float attenuation = 1.0 / (light.constant + light.linear * distance +
                               light.quadratic * distance * distance);

    // Combine
    vec3 ambient = uMaterial.ambient;
    vec3 diffuse = diff * uMaterial.diffuse * light.color;
    vec3 specular = spec * uMaterial.specular * light.color;

    return (ambient + diffuse + specular) * attenuation * light.intensity;
}

void main()
{
    // Sample textures
    vec3 diffuseColor = texture(uMaterial.diffuseMap, vTexCoord).rgb;
    vec3 specularColor = texture(uMaterial.specularMap, vTexCoord).rgb;

    // Normalize interpolated normal
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uViewPos - vFragPos);

    // Accumulate lighting from all lights
    vec3 result = vec3(0.0);

    for (int i = 0; i < uNumLights; i++)
    {
        result += calculatePointLight(uLights[i], normal, vFragPos, viewDir);
    }

    // Modulate by texture
    result *= diffuseColor;

    FragColor = vec4(result, 1.0);
}
```

## Per-Vertex vs Per-Fragment Lighting

### Comparison

```glsl
// ===== Per-Vertex (Gouraud) =====
// Vertex Shader: Compute full lighting
void vertexMain()
{
    vec3 color = computeLighting(position, normal);  // Expensive
    vColor = color;  // Pass to fragment shader
}

// Fragment Shader: Just output color
void fragmentMain()
{
    FragColor = vec4(vColor, 1.0);  // Cheap
}

// ===== Per-Fragment (Phong) =====
// Vertex Shader: Pass data through
void vertexMain()
{
    vPosition = position;  // Cheap
    vNormal = normal;
}

// Fragment Shader: Compute lighting
void fragmentMain()
{
    vec3 color = computeLighting(vPosition, vNormal);  // Expensive
    FragColor = vec4(color, 1.0);
}
```

**Per-Vertex:**
- Lighting computed once per vertex
- Colors interpolated across triangle
- Faster (fewer vertices than fragments)
- Misses highlights inside triangles

**Per-Fragment:**
- Lighting computed per pixel
- More accurate highlights
- Slower (many more fragments than vertices)
- Modern standard for quality rendering

## Advanced Shader Techniques

### Normal Mapping

Add surface detail without geometry:

```glsl
// Fragment shader with normal mapping
in vec3 vFragPos;
in vec3 vNormal;
in vec2 vTexCoord;
in vec3 vTangent;
in vec3 vBitangent;

uniform sampler2D uNormalMap;

void main()
{
    // Sample normal map
    vec3 normalMap = texture(uNormalMap, vTexCoord).rgb;
    normalMap = normalMap * 2.0 - 1.0;  // [0,1] -> [-1,1]

    // Construct TBN matrix (tangent space -> world space)
    vec3 T = normalize(vTangent);
    vec3 B = normalize(vBitangent);
    vec3 N = normalize(vNormal);
    mat3 TBN = mat3(T, B, N);

    // Transform normal from tangent space to world space
    vec3 normal = normalize(TBN * normalMap);

    // Use normal for lighting
    // ... (rest of lighting calculation)
}
```

### Parallax Mapping

Simulate depth:

```glsl
vec2 parallaxMapping(vec2 texCoords, vec3 viewDir)
{
    // Height from height map
    float height = texture(uHeightMap, texCoords).r;

    // Offset texture coordinates
    vec2 offset = viewDir.xy * (height * uHeightScale);

    return texCoords - offset;
}

void main()
{
    // Calculate view direction in tangent space
    vec3 viewDir = normalize(vTangentViewPos - vTangentFragPos);

    // Offset texture coordinates
    vec2 texCoords = parallaxMapping(vTexCoord, viewDir);

    // Sample textures with offset coordinates
    vec3 color = texture(uDiffuseMap, texCoords).rgb;
    // ... (rest of shading)
}
```

### Rim Lighting

Highlight edges:

```glsl
void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uViewPos - vFragPos);

    // Rim light intensity
    float rimIntensity = 1.0 - max(dot(normal, viewDir), 0.0);
    rimIntensity = pow(rimIntensity, uRimPower);

    vec3 rimColor = uRimColor * rimIntensity;

    // Add to final color
    vec3 finalColor = baseColor + rimColor;
    FragColor = vec4(finalColor, 1.0);
}
```

## Physically-Based Rendering (PBR) Shader

Modern PBR shader using Cook-Torrance BRDF:

```glsl
#version 330 core

in vec3 vFragPos;
in vec3 vNormal;
in vec2 vTexCoord;

uniform vec3 uCamPos;
uniform vec3 uLightPositions[4];
uniform vec3 uLightColors[4];

uniform vec3 uAlbedo;
uniform float uMetallic;
uniform float uRoughness;
uniform float uAO;  // Ambient occlusion

out vec4 FragColor;

const float PI = 3.14159265359;

// Normal Distribution Function (GGX/Trowbridge-Reitz)
float distributionGGX(vec3 N, vec3 H, float roughness)
{
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;

    float num = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return num / denom;
}

// Geometry Function (Smith's Schlick-GGX)
float geometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r * r) / 8.0;

    float num = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return num / denom;
}

float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = geometrySchlickGGX(NdotV, roughness);
    float ggx1 = geometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}

// Fresnel (Schlick approximation)
vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

void main()
{
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCamPos - vFragPos);

    // Calculate reflectance at normal incidence
    vec3 F0 = vec3(0.04);
    F0 = mix(F0, uAlbedo, uMetallic);

    // Reflectance equation
    vec3 Lo = vec3(0.0);

    for(int i = 0; i < 4; ++i)
    {
        // Per-light radiance
        vec3 L = normalize(uLightPositions[i] - vFragPos);
        vec3 H = normalize(V + L);

        float distance = length(uLightPositions[i] - vFragPos);
        float attenuation = 1.0 / (distance * distance);
        vec3 radiance = uLightColors[i] * attenuation;

        // Cook-Torrance BRDF
        float NDF = distributionGGX(N, H, uRoughness);
        float G = geometrySmith(N, V, L, uRoughness);
        vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);

        vec3 kS = F;
        vec3 kD = vec3(1.0) - kS;
        kD *= 1.0 - uMetallic;

        vec3 numerator = NDF * G * F;
        float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);
        vec3 specular = numerator / max(denominator, 0.001);

        // Add to outgoing radiance
        float NdotL = max(dot(N, L), 0.0);
        Lo += (kD * uAlbedo / PI + specular) * radiance * NdotL;
    }

    // Ambient
    vec3 ambient = vec3(0.03) * uAlbedo * uAO;
    vec3 color = ambient + Lo;

    // HDR tonemapping
    color = color / (color + vec3(1.0));

    // Gamma correction
    color = pow(color, vec3(1.0/2.2));

    FragColor = vec4(color, 1.0);
}
```

## Shader Optimization Tips

1. **Minimize texture samples** - Texture reads are expensive
2. **Avoid conditionals** - Branches hurt parallelism
3. **Precalculate** - Move invariant calculations to CPU
4. **Use lower precision** - `mediump` or `lowp` for mobile
5. **Minimize varyings** - Data passed from vertex to fragment
6. **Vectorize** - Use vec4 operations instead of scalar

```glsl
// Bad: Many texture samples
vec3 color = texture(tex, uv).rgb;
float r = texture(tex, uv).r;
float g = texture(tex, uv).g;

// Good: One texture sample
vec4 texel = texture(tex, uv);
vec3 color = texel.rgb;
float r = texel.r;
float g = texel.g;
```

## Conclusion

Vertex and fragment shaders are the foundation of modern GPU rendering:

- **Vertex shaders** transform geometry and compute per-vertex data
- **Fragment shaders** determine final pixel colors
- **Per-vertex lighting** (Gouraud) is fast but lower quality
- **Per-fragment lighting** (Phong) is higher quality, standard today
- **PBR shaders** provide physically accurate, consistent materials

Understanding shaders is essential for:
- Custom lighting and materials
- Special effects
- Performance optimization
- Leveraging GPU capabilities

The next section explores advanced shading techniques building on these foundations.
