# Fragment Operations

## Introduction to Fragment Processing

After rasterization determines which pixels a primitive covers, fragment operations determine the final pixel color. A fragment is a potential pixel - it contains all information needed to update a pixel (color, depth, stencil) but hasn't yet been written to the framebuffer.

Fragment operations form the final stages of the graphics pipeline, controlling how fragments combine with existing framebuffer contents. These operations enable transparency, masking, depth testing, and many other effects.

## The Fragment Processing Pipeline

Modern graphics APIs process fragments through several stages:

1. **Scissor Test**: Discard fragments outside rectangular region
2. **Stencil Test**: Compare fragment stencil value with buffer
3. **Depth Test**: Compare fragment depth with depth buffer
4. **Blending**: Combine fragment color with framebuffer color
5. **Dithering**: Add noise to reduce color banding
6. **Logical Operations**: Perform bitwise operations

```python
import numpy as np

class FragmentProcessor:
    """
    Fragment processing pipeline.
    """
    def __init__(self, width, height):
        self.width = width
        self.height = height

        # Framebuffers
        self.color_buffer = np.zeros((height, width, 4), dtype=np.float32)
        self.depth_buffer = np.full((height, width), np.inf, dtype=np.float32)
        self.stencil_buffer = np.zeros((height, width), dtype=np.uint8)

        # Pipeline state
        self.scissor_enabled = False
        self.scissor_rect = (0, 0, width, height)
        self.depth_test_enabled = True
        self.depth_func = 'less'
        self.stencil_test_enabled = False
        self.blend_enabled = False

    def process_fragment(self, fragment):
        """
        Process fragment through pipeline.

        Args:
            fragment: Fragment with x, y, color, depth, stencil

        Returns:
            bool: True if fragment was written to framebuffer
        """
        # Scissor test
        if self.scissor_enabled:
            if not self.scissor_test(fragment.x, fragment.y):
                return False

        # Stencil test
        if self.stencil_test_enabled:
            if not self.stencil_test(fragment):
                return False

        # Depth test
        if self.depth_test_enabled:
            if not self.depth_test(fragment):
                return False

        # Blending
        if self.blend_enabled:
            final_color = self.blend(fragment)
        else:
            final_color = fragment.color

        # Write to framebuffer
        self.color_buffer[fragment.y, fragment.x] = final_color
        self.depth_buffer[fragment.y, fragment.x] = fragment.depth

        return True
```

## Depth Testing

The depth test determines whether a fragment is closer than what's currently in the depth buffer.

### Depth Comparison Functions

```python
class DepthTest:
    """Depth testing operations."""

    @staticmethod
    def depth_test(fragment_depth, buffer_depth, func='less'):
        """
        Perform depth test.

        Args:
            fragment_depth: Fragment's depth value
            buffer_depth: Current depth buffer value
            func: Comparison function

        Returns:
            bool: True if fragment passes
        """
        comparisons = {
            'never': lambda: False,
            'always': lambda: True,
            'less': lambda: fragment_depth < buffer_depth,
            'lequal': lambda: fragment_depth <= buffer_depth,
            'equal': lambda: abs(fragment_depth - buffer_depth) < 1e-6,
            'gequal': lambda: fragment_depth >= buffer_depth,
            'greater': lambda: fragment_depth > buffer_depth,
            'notequal': lambda: abs(fragment_depth - buffer_depth) >= 1e-6
        }

        return comparisons[func]()

def depth_test_example():
    """
    Demonstrate different depth test functions.
    """
    fragment_depth = 0.5
    buffer_depth = 0.6

    test_funcs = ['less', 'lequal', 'equal', 'greater', 'always', 'never']

    for func in test_funcs:
        result = DepthTest.depth_test(fragment_depth, buffer_depth, func)
        print(f"{func}: {result}")
```

### Depth Writing Control

```python
class DepthState:
    """
    Depth test and write state.
    """
    def __init__(self):
        self.test_enabled = True
        self.write_enabled = True
        self.func = 'less'

    def process(self, fragment_depth, buffer_depth):
        """
        Process depth test and write.

        Args:
            fragment_depth: Fragment depth
            buffer_depth: Current buffer depth

        Returns:
            tuple: (pass_test, new_depth)
                pass_test: True if fragment visible
                new_depth: Updated depth value (or unchanged)
        """
        # Always pass if test disabled
        if not self.test_enabled:
            pass_test = True
        else:
            pass_test = DepthTest.depth_test(
                fragment_depth, buffer_depth, self.func
            )

        # Update depth buffer if write enabled and test passed
        if pass_test and self.write_enabled:
            new_depth = fragment_depth
        else:
            new_depth = buffer_depth

        return pass_test, new_depth
```

## Stencil Testing

The stencil buffer stores per-pixel integer values used for masking and special effects.

### Stencil Operations

```python
class StencilOp:
    """Stencil buffer operations."""

    @staticmethod
    def apply_op(current_value, reference_value, op):
        """
        Apply stencil operation.

        Args:
            current_value: Current stencil buffer value
            reference_value: Reference value for operation
            op: Operation name

        Returns:
            int: New stencil value (clamped to [0, 255])
        """
        operations = {
            'keep': current_value,
            'zero': 0,
            'replace': reference_value,
            'incr': min(current_value + 1, 255),
            'incr_wrap': (current_value + 1) % 256,
            'decr': max(current_value - 1, 0),
            'decr_wrap': (current_value - 1) % 256,
            'invert': (~current_value) & 0xFF
        }

        return operations[op]

class StencilTest:
    """
    Stencil test configuration.
    """
    def __init__(self):
        self.enabled = False
        self.func = 'always'
        self.ref = 0
        self.mask = 0xFF
        self.write_mask = 0xFF

        # Operations for different test outcomes
        self.stencil_fail_op = 'keep'
        self.depth_fail_op = 'keep'
        self.pass_op = 'keep'

    def test(self, stencil_value):
        """
        Perform stencil test.

        Args:
            stencil_value: Current stencil buffer value

        Returns:
            bool: True if stencil test passes
        """
        masked_ref = self.ref & self.mask
        masked_stencil = stencil_value & self.mask

        comparisons = {
            'never': False,
            'always': True,
            'less': masked_stencil < masked_ref,
            'lequal': masked_stencil <= masked_ref,
            'greater': masked_stencil > masked_ref,
            'gequal': masked_stencil >= masked_ref,
            'equal': masked_stencil == masked_ref,
            'notequal': masked_stencil != masked_ref
        }

        return comparisons[self.func]

    def update(self, stencil_value, stencil_passed, depth_passed):
        """
        Update stencil buffer based on test results.

        Args:
            stencil_value: Current stencil value
            stencil_passed: Did stencil test pass?
            depth_passed: Did depth test pass?

        Returns:
            int: New stencil value
        """
        if not stencil_passed:
            op = self.stencil_fail_op
        elif not depth_passed:
            op = self.depth_fail_op
        else:
            op = self.pass_op

        new_value = StencilOp.apply_op(stencil_value, self.ref, op)

        # Apply write mask
        return (stencil_value & ~self.write_mask) | (new_value & self.write_mask)
```

### Stencil Use Cases

```python
def stencil_shadow_volumes(scene, light_pos):
    """
    Use stencil buffer for shadow volumes.

    Classic stencil shadow technique:
    1. Render scene depth only
    2. Increment stencil for front-facing shadow volume faces
    3. Decrement stencil for back-facing shadow volume faces
    4. Render lit scene where stencil == 0

    Args:
        scene: Scene to render
        light_pos: Light position
    """
    # Setup
    stencil = StencilTest()
    depth_state = DepthState()

    # Pass 1: Render scene depth
    depth_state.test_enabled = True
    depth_state.write_enabled = True
    render_scene_depth(scene)

    # Pass 2: Render shadow volumes
    depth_state.write_enabled = False  # Don't modify depth
    stencil.enabled = True
    stencil.func = 'always'  # Always pass stencil test

    # Front faces: increment stencil
    stencil.pass_op = 'incr_wrap'
    render_shadow_volumes(scene, light_pos, front_faces=True)

    # Back faces: decrement stencil
    stencil.pass_op = 'decr_wrap'
    render_shadow_volumes(scene, light_pos, front_faces=False)

    # Pass 3: Render scene with lighting where stencil == 0
    depth_state.write_enabled = False  # Use existing depth
    stencil.func = 'equal'
    stencil.ref = 0
    render_scene_lit(scene)

def stencil_masking():
    """
    Use stencil for selective rendering (e.g., portals, mirrors).
    """
    stencil = StencilTest()

    # Step 1: Draw mask to stencil buffer
    stencil.enabled = True
    stencil.func = 'always'
    stencil.pass_op = 'replace'
    stencil.ref = 1
    render_portal_mask()

    # Step 2: Draw portal contents only where stencil == 1
    stencil.func = 'equal'
    stencil.pass_op = 'keep'
    render_portal_contents()

    # Step 3: Draw rest of scene where stencil == 0
    stencil.ref = 0
    render_normal_scene()
```

## Alpha Blending

Blending combines fragment color with framebuffer color, enabling transparency and other effects.

### Blend Equation

The blend equation is:

$$C_{result} = C_{src} \times F_{src} \oplus C_{dst} \times F_{dst}$$

Where:
- $C_{src}$ = source (fragment) color
- $C_{dst}$ = destination (framebuffer) color
- $F_{src}$ = source blend factor
- $F_{dst}$ = destination blend factor
- $\oplus$ = blend operation (usually addition)

```python
class BlendState:
    """
    Alpha blending configuration.
    """
    def __init__(self):
        self.enabled = False
        self.src_factor = 'src_alpha'
        self.dst_factor = 'one_minus_src_alpha'
        self.equation = 'add'

    def get_blend_factor(self, factor_name, src_color, dst_color):
        """
        Calculate blend factor.

        Args:
            factor_name: Name of blend factor
            src_color: Source color (r, g, b, a)
            dst_color: Destination color (r, g, b, a)

        Returns:
            numpy.ndarray: Blend factor for each channel
        """
        factors = {
            'zero': np.array([0, 0, 0, 0]),
            'one': np.array([1, 1, 1, 1]),
            'src_color': src_color,
            'one_minus_src_color': 1 - src_color,
            'dst_color': dst_color,
            'one_minus_dst_color': 1 - dst_color,
            'src_alpha': np.array([src_color[3]] * 4),
            'one_minus_src_alpha': np.array([1 - src_color[3]] * 4),
            'dst_alpha': np.array([dst_color[3]] * 4),
            'one_minus_dst_alpha': np.array([1 - dst_color[3]] * 4),
            'constant_alpha': np.array([0.5] * 4),  # Example constant
        }

        return factors[factor_name]

    def blend(self, src_color, dst_color):
        """
        Blend source and destination colors.

        Args:
            src_color: Source (fragment) color
            dst_color: Destination (framebuffer) color

        Returns:
            numpy.ndarray: Blended color
        """
        src_factor = self.get_blend_factor(self.src_factor, src_color, dst_color)
        dst_factor = self.get_blend_factor(self.dst_factor, src_color, dst_color)

        src_contrib = src_color * src_factor
        dst_contrib = dst_color * dst_factor

        if self.equation == 'add':
            result = src_contrib + dst_contrib
        elif self.equation == 'subtract':
            result = src_contrib - dst_contrib
        elif self.equation == 'reverse_subtract':
            result = dst_contrib - src_contrib
        elif self.equation == 'min':
            result = np.minimum(src_color, dst_color)
        elif self.equation == 'max':
            result = np.maximum(src_color, dst_color)

        # Clamp to [0, 1]
        return np.clip(result, 0, 1)
```

### Common Blend Modes

```python
class BlendModes:
    """Common blend mode presets."""

    @staticmethod
    def alpha_blend():
        """
        Standard alpha transparency.
        result = src * src_alpha + dst * (1 - src_alpha)
        """
        blend = BlendState()
        blend.enabled = True
        blend.src_factor = 'src_alpha'
        blend.dst_factor = 'one_minus_src_alpha'
        blend.equation = 'add'
        return blend

    @staticmethod
    def additive():
        """
        Additive blending (for lights, particles).
        result = src + dst
        """
        blend = BlendState()
        blend.enabled = True
        blend.src_factor = 'one'
        blend.dst_factor = 'one'
        blend.equation = 'add'
        return blend

    @staticmethod
    def multiplicative():
        """
        Multiplicative blending (for shadows, darkening).
        result = src * dst
        """
        blend = BlendState()
        blend.enabled = True
        blend.src_factor = 'dst_color'
        blend.dst_factor = 'zero'
        blend.equation = 'add'
        return blend

    @staticmethod
    def premultiplied_alpha():
        """
        Premultiplied alpha blending.
        Assumes RGB already multiplied by alpha.
        result = src + dst * (1 - src_alpha)
        """
        blend = BlendState()
        blend.enabled = True
        blend.src_factor = 'one'
        blend.dst_factor = 'one_minus_src_alpha'
        blend.equation = 'add'
        return blend

def blend_example():
    """Demonstrate different blend modes."""
    src = np.array([1.0, 0.0, 0.0, 0.5])  # Semi-transparent red
    dst = np.array([0.0, 0.0, 1.0, 1.0])  # Opaque blue

    modes = {
        'Alpha': BlendModes.alpha_blend(),
        'Additive': BlendModes.additive(),
        'Multiplicative': BlendModes.multiplicative(),
    }

    for name, blend_state in modes.items():
        result = blend_state.blend(src, dst)
        print(f"{name}: {result}")
```

## Order-Independent Transparency

Standard alpha blending is order-dependent - transparent objects must be sorted back-to-front.

### Depth Peeling

```python
def depth_peeling(scene, num_layers=4):
    """
    Depth peeling for order-independent transparency.

    Renders transparent geometry in multiple passes, each pass
    capturing the next-closest layer.

    Args:
        scene: Scene with transparent objects
        num_layers: Number of layers to peel

    Returns:
        numpy.ndarray: Composited result
    """
    width, height = 800, 600

    # Initialize depth buffer for peeling
    depth_buffer = np.full((height, width), -np.inf)

    # Accumulation buffer
    result = np.zeros((height, width, 4))

    for layer in range(num_layers):
        # Create buffer for this layer
        layer_color = np.zeros((height, width, 4))
        layer_depth = np.full((height, width), np.inf)

        # Render all transparent geometry
        for obj in scene.transparent_objects:
            for fragment in obj.fragments:
                x, y = fragment.x, fragment.y

                # Skip if closer than previous layer
                if fragment.depth <= depth_buffer[y, x]:
                    continue

                # Depth test against current layer
                if fragment.depth < layer_depth[y, x]:
                    layer_color[y, x] = fragment.color
                    layer_depth[y, x] = fragment.depth

        # Composite this layer with result (back-to-front)
        for y in range(height):
            for x in range(width):
                src = layer_color[y, x]
                dst = result[y, x]

                # Alpha blend
                alpha = src[3]
                result[y, x] = src * alpha + dst * (1 - alpha)

        # Update depth buffer for next peel
        depth_buffer = layer_depth

    return result
```

### Weighted Blended OIT

```python
def weighted_blended_oit(fragments):
    """
    Weighted Blended Order-Independent Transparency.

    Single-pass approximate OIT using weighted sum.

    Args:
        fragments: List of transparent fragments

    Returns:
        tuple: (accum_buffer, revealage_buffer)
    """
    height, width = 600, 800

    # Accumulation: sum of weighted premultiplied colors
    accum = np.zeros((height, width, 4))

    # Revealage: product of (1 - alpha)
    revealage = np.ones((height, width))

    for frag in fragments:
        x, y = frag.x, frag.y

        # Weight function (depth and alpha dependent)
        weight = max(0.01, min(3000.0,
            10.0 / (1e-5 + pow(abs(frag.depth) / 200.0, 4.0))
        ))

        # Accumulate weighted color
        accum[y, x] += frag.color * frag.color[3] * weight

        # Accumulate revealage
        revealage[y, x] *= (1 - frag.color[3])

    return accum, revealage

def composite_weighted_oit(accum, revealage, opaque_color):
    """
    Composite weighted OIT result with opaque scene.

    Args:
        accum: Accumulated weighted colors
        revealage: Accumulated transparency
        opaque_color: Opaque scene rendering

    Returns:
        numpy.ndarray: Final composited image
    """
    # Normalize accumulated color
    transparent_color = accum / (accum[:, :, 3:4] + 1e-5)

    # Composite with opaque
    result = transparent_color[:, :, :3] * (1 - revealage[:, :, np.newaxis])
    result += opaque_color * revealage[:, :, np.newaxis]

    return result
```

## Scissor Test

Restrict rendering to rectangular region:

```python
class ScissorTest:
    """Scissor test for rectangular clipping."""

    def __init__(self, x, y, width, height):
        """
        Args:
            x, y: Bottom-left corner of scissor rectangle
            width, height: Scissor rectangle dimensions
        """
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def test(self, fragment_x, fragment_y):
        """
        Test if fragment is inside scissor rectangle.

        Args:
            fragment_x, fragment_y: Fragment coordinates

        Returns:
            bool: True if inside scissor region
        """
        return (self.x <= fragment_x < self.x + self.width and
                self.y <= fragment_y < self.y + self.height)

def render_with_scissor(objects, framebuffer):
    """
    Render multiple objects with different scissor regions.

    Example: Split-screen rendering.
    """
    height, width = framebuffer.shape[:2]

    # Left half
    scissor_left = ScissorTest(0, 0, width // 2, height)
    for obj in objects:
        if obj.viewport == 'left':
            render_object_with_scissor(obj, framebuffer, scissor_left)

    # Right half
    scissor_right = ScissorTest(width // 2, 0, width // 2, height)
    for obj in objects:
        if obj.viewport == 'right':
            render_object_with_scissor(obj, framebuffer, scissor_right)
```

## Early Fragment Tests

Modern GPUs can perform some tests before fragment shader execution:

```python
def early_fragment_tests(fragment, depth_buffer, stencil_buffer, depth_state):
    """
    Perform early fragment tests before expensive shading.

    Can discard fragments that will definitely be occluded,
    saving expensive fragment shader execution.

    Args:
        fragment: Fragment to test (with depth)
        depth_buffer: Current depth buffer
        stencil_buffer: Current stencil buffer
        depth_state: Depth test configuration

    Returns:
        bool: True if fragment might be visible (run shader)
    """
    x, y = fragment.x, fragment.y

    # Early depth test
    if depth_state.test_enabled:
        if not DepthTest.depth_test(fragment.depth,
                                     depth_buffer[y, x],
                                     depth_state.func):
            return False  # Occluded - skip shader

    # Early stencil test could go here

    return True  # Might be visible - run shader
```

## Conclusion

Fragment operations provide powerful control over how primitives combine to form the final image. The interplay between depth testing, stencil operations, and blending enables a wide range of rendering techniques:

- **Depth testing** solves visibility for opaque geometry
- **Stencil testing** enables masking, shadows, and selective rendering
- **Blending** provides transparency and compositing effects
- **Order-independent transparency** handles complex transparent scenes

Understanding fragment operations is crucial for implementing advanced rendering effects and optimizing graphics performance. Modern GPUs provide extensive configurability of these operations, allowing sophisticated rendering techniques while maintaining real-time performance.
