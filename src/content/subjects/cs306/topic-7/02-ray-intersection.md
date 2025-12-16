# Ray Intersection Tests

## Introduction

Ray-object intersection testing is the fundamental operation in ray tracing. For each ray, we need to determine if and where it intersects with scene geometry. These tests must be both accurate and efficient, as millions or billions of intersection tests may be performed to render a single frame.

The general approach involves:
1. Parameterize the ray as `P(t) = O + tD` where O is origin, D is direction, and t ≥ 0
2. Substitute into the object's implicit equation
3. Solve for t
4. Validate the solution (t > 0, point within bounds, etc.)

## Ray-Sphere Intersection

Spheres are the simplest and most commonly tested primitive in ray tracing.

### Mathematical Derivation

A sphere with center C and radius r is defined by:
```
||P - C||² = r²
```

Substituting the ray equation `P(t) = O + tD`:
```
||O + tD - C||² = r²
```

Expanding:
```
(O + tD - C)·(O + tD - C) = r²
(D·D)t² + 2D·(O-C)t + (O-C)·(O-C) - r² = 0
```

This is a quadratic equation: `at² + bt + c = 0`

Where:
- `a = D·D` (usually 1 if D is normalized)
- `b = 2D·(O-C)`
- `c = (O-C)·(O-C) - r²`

### Implementation

```python
import numpy as np

class Sphere:
    """Sphere primitive for ray tracing."""

    def __init__(self, center, radius, material=None):
        """
        Initialize sphere.

        Args:
            center: Sphere center (3D point)
            radius: Sphere radius
            material: Material properties
        """
        self.center = np.array(center, dtype=float)
        self.radius = radius
        self.material = material

    def intersect(self, ray):
        """
        Test ray-sphere intersection.

        Args:
            ray: Ray object with origin and direction

        Returns:
            HitRecord if intersection found, None otherwise
        """
        # Vector from ray origin to sphere center
        oc = ray.origin - self.center

        # Quadratic coefficients
        # Assume ray.direction is normalized, so a = 1
        a = np.dot(ray.direction, ray.direction)
        b = 2.0 * np.dot(oc, ray.direction)
        c = np.dot(oc, oc) - self.radius * self.radius

        # Discriminant
        discriminant = b * b - 4 * a * c

        if discriminant < 0:
            # No intersection
            return None

        # Two possible solutions
        sqrt_d = np.sqrt(discriminant)
        t1 = (-b - sqrt_d) / (2.0 * a)
        t2 = (-b + sqrt_d) / (2.0 * a)

        # Choose nearest positive t
        t = None
        if t1 > 0.001:  # Small epsilon to avoid self-intersection
            t = t1
        elif t2 > 0.001:
            t = t2
        else:
            return None

        # Calculate intersection point and normal
        point = ray.point_at(t)
        normal = (point - self.center) / self.radius

        return HitRecord(t, point, normal, self.material)

class HitRecord:
    """Information about a ray-object intersection."""

    def __init__(self, t, point, normal, material):
        """
        Initialize hit record.

        Args:
            t: Ray parameter at intersection
            point: Intersection point
            normal: Surface normal at intersection
            material: Material at intersection
        """
        self.t = t
        self.point = point
        self.normal = normal
        self.material = material
```

### Optimized Version

```python
def ray_sphere_intersection_optimized(ray_origin, ray_dir, sphere_center, sphere_radius):
    """
    Optimized ray-sphere intersection using reduced form.

    Args:
        ray_origin: Ray origin
        ray_dir: Ray direction (normalized)
        sphere_center: Sphere center
        sphere_radius: Sphere radius

    Returns:
        t value if hit, None otherwise
    """
    oc = ray_origin - sphere_center

    # Since direction is normalized, a = 1
    # Use half_b optimization
    half_b = np.dot(oc, ray_dir)
    c = np.dot(oc, oc) - sphere_radius * sphere_radius

    discriminant = half_b * half_b - c

    if discriminant < 0:
        return None

    sqrt_d = np.sqrt(discriminant)

    # Find nearest root
    root = -half_b - sqrt_d
    if root > 0.001:
        return root

    root = -half_b + sqrt_d
    if root > 0.001:
        return root

    return None
```

## Ray-Plane Intersection

Planes are defined by a point P₀ and a normal N.

### Mathematical Derivation

A plane is defined by:
```
(P - P₀)·N = 0
```

Substituting ray equation:
```
(O + tD - P₀)·N = 0
```

Solving for t:
```
t = (P₀ - O)·N / (D·N)
```

### Implementation

```python
class Plane:
    """Infinite plane primitive."""

    def __init__(self, point, normal, material=None):
        """
        Initialize plane.

        Args:
            point: Point on the plane
            normal: Plane normal (will be normalized)
            material: Material properties
        """
        self.point = np.array(point, dtype=float)
        self.normal = np.array(normal, dtype=float)
        self.normal = self.normal / np.linalg.norm(self.normal)
        self.material = material

    def intersect(self, ray):
        """
        Test ray-plane intersection.

        Args:
            ray: Ray object

        Returns:
            HitRecord if intersection found, None otherwise
        """
        # Calculate denominator
        denom = np.dot(ray.direction, self.normal)

        # Check if ray is parallel to plane
        if abs(denom) < 1e-6:
            return None

        # Calculate t
        t = np.dot(self.point - ray.origin, self.normal) / denom

        # Check if intersection is in front of ray
        if t < 0.001:
            return None

        # Calculate intersection point
        point = ray.point_at(t)

        # Normal points toward ray origin
        normal = self.normal if denom < 0 else -self.normal

        return HitRecord(t, point, normal, self.material)
```

## Ray-Triangle Intersection

Triangles are the most common primitive in 3D graphics. Efficient ray-triangle intersection is critical.

### Möller-Trumbore Algorithm

The Möller-Trumbore algorithm is the most commonly used method, computing the intersection and barycentric coordinates simultaneously.

Given triangle with vertices V₀, V₁, V₂:

```python
class Triangle:
    """Triangle primitive."""

    def __init__(self, v0, v1, v2, material=None):
        """
        Initialize triangle.

        Args:
            v0, v1, v2: Triangle vertices
            material: Material properties
        """
        self.v0 = np.array(v0, dtype=float)
        self.v1 = np.array(v1, dtype=float)
        self.v2 = np.array(v2, dtype=float)
        self.material = material

        # Precompute normal
        edge1 = self.v1 - self.v0
        edge2 = self.v2 - self.v0
        self.normal = np.cross(edge1, edge2)
        norm_length = np.linalg.norm(self.normal)
        if norm_length > 0:
            self.normal = self.normal / norm_length

    def intersect(self, ray):
        """
        Ray-triangle intersection using Möller-Trumbore algorithm.

        Args:
            ray: Ray object

        Returns:
            HitRecord if intersection found, None otherwise
        """
        epsilon = 1e-6

        # Edges from v0
        edge1 = self.v1 - self.v0
        edge2 = self.v2 - self.v0

        # Begin calculating determinant
        h = np.cross(ray.direction, edge2)
        a = np.dot(edge1, h)

        # Ray is parallel to triangle
        if abs(a) < epsilon:
            return None

        f = 1.0 / a
        s = ray.origin - self.v0
        u = f * np.dot(s, h)

        # Check if intersection is outside triangle
        if u < 0.0 or u > 1.0:
            return None

        q = np.cross(s, edge1)
        v = f * np.dot(ray.direction, q)

        if v < 0.0 or u + v > 1.0:
            return None

        # Calculate t
        t = f * np.dot(edge2, q)

        if t < epsilon:
            return None

        # Calculate intersection point
        point = ray.point_at(t)

        return HitRecord(t, point, self.normal, self.material)

    def get_barycentric(self, point):
        """
        Calculate barycentric coordinates for a point on the triangle.

        Args:
            point: Point on triangle

        Returns:
            (u, v, w) barycentric coordinates
        """
        # Vectors
        v0 = self.v1 - self.v0
        v1 = self.v2 - self.v0
        v2 = point - self.v0

        # Dot products
        d00 = np.dot(v0, v0)
        d01 = np.dot(v0, v1)
        d11 = np.dot(v1, v1)
        d20 = np.dot(v2, v0)
        d21 = np.dot(v2, v1)

        denom = d00 * d11 - d01 * d01

        # Barycentric coordinates
        v = (d11 * d20 - d01 * d21) / denom
        w = (d00 * d21 - d01 * d20) / denom
        u = 1.0 - v - w

        return u, v, w
```

### Alternative: Geometric Method

```python
def ray_triangle_intersection_geometric(ray_origin, ray_dir, v0, v1, v2):
    """
    Ray-triangle intersection using geometric method.

    Args:
        ray_origin: Ray origin
        ray_dir: Ray direction
        v0, v1, v2: Triangle vertices

    Returns:
        (t, u, v) if hit, None otherwise
    """
    epsilon = 1e-6

    # Calculate triangle normal
    edge1 = v1 - v0
    edge2 = v2 - v0
    normal = np.cross(edge1, edge2)

    # Check if ray is parallel to triangle
    n_dot_d = np.dot(normal, ray_dir)
    if abs(n_dot_d) < epsilon:
        return None

    # Calculate plane intersection
    d = np.dot(normal, v0)
    t = (d - np.dot(normal, ray_origin)) / n_dot_d

    if t < epsilon:
        return None

    # Intersection point
    point = ray_origin + t * ray_dir

    # Check if point is inside triangle using cross products
    # Edge 0
    edge0 = v1 - v0
    vp0 = point - v0
    c = np.cross(edge0, vp0)
    if np.dot(normal, c) < 0:
        return None

    # Edge 1
    edge1_check = v2 - v1
    vp1 = point - v1
    c = np.cross(edge1_check, vp1)
    if np.dot(normal, c) < 0:
        return None

    # Edge 2
    edge2_check = v0 - v2
    vp2 = point - v2
    c = np.cross(edge2_check, vp2)
    if np.dot(normal, c) < 0:
        return None

    return t
```

## Ray-Axis Aligned Bounding Box (AABB)

AABBs are crucial for acceleration structures.

### Slab Method

```python
class AABB:
    """Axis-Aligned Bounding Box."""

    def __init__(self, min_point, max_point):
        """
        Initialize AABB.

        Args:
            min_point: Minimum corner
            max_point: Maximum corner
        """
        self.min = np.array(min_point, dtype=float)
        self.max = np.array(max_point, dtype=float)

    def intersect(self, ray, t_min=0.0, t_max=float('inf')):
        """
        Ray-AABB intersection using slab method.

        Args:
            ray: Ray object
            t_min: Minimum t value to consider
            t_max: Maximum t value to consider

        Returns:
            True if ray intersects AABB in range [t_min, t_max]
        """
        for axis in range(3):
            inv_d = 1.0 / ray.direction[axis] if ray.direction[axis] != 0 else float('inf')

            t0 = (self.min[axis] - ray.origin[axis]) * inv_d
            t1 = (self.max[axis] - ray.origin[axis]) * inv_d

            if inv_d < 0.0:
                t0, t1 = t1, t0

            t_min = max(t_min, t0)
            t_max = min(t_max, t1)

            if t_max <= t_min:
                return False

        return True

    def intersect_with_distance(self, ray):
        """
        Ray-AABB intersection returning entry and exit distances.

        Returns:
            (t_near, t_far) if hit, None otherwise
        """
        t_min = -float('inf')
        t_max = float('inf')

        for axis in range(3):
            if abs(ray.direction[axis]) < 1e-6:
                # Ray parallel to slab
                if ray.origin[axis] < self.min[axis] or ray.origin[axis] > self.max[axis]:
                    return None
            else:
                inv_d = 1.0 / ray.direction[axis]
                t0 = (self.min[axis] - ray.origin[axis]) * inv_d
                t1 = (self.max[axis] - ray.origin[axis]) * inv_d

                if inv_d < 0.0:
                    t0, t1 = t1, t0

                t_min = max(t_min, t0)
                t_max = min(t_max, t1)

        if t_min > t_max or t_max < 0:
            return None

        return (max(0, t_min), t_max)

    @staticmethod
    def surrounding_box(box1, box2):
        """
        Create AABB that contains both input boxes.

        Args:
            box1: First AABB
            box2: Second AABB

        Returns:
            Surrounding AABB
        """
        min_point = np.minimum(box1.min, box2.min)
        max_point = np.maximum(box1.max, box2.max)
        return AABB(min_point, max_point)
```

## Ray-Disk Intersection

```python
class Disk:
    """Disk (circle in 3D space)."""

    def __init__(self, center, normal, radius, material=None):
        """
        Initialize disk.

        Args:
            center: Disk center
            normal: Disk normal
            radius: Disk radius
            material: Material properties
        """
        self.center = np.array(center, dtype=float)
        self.normal = np.array(normal, dtype=float)
        self.normal = self.normal / np.linalg.norm(self.normal)
        self.radius = radius
        self.material = material

    def intersect(self, ray):
        """
        Ray-disk intersection.

        Args:
            ray: Ray object

        Returns:
            HitRecord if intersection found, None otherwise
        """
        # First, intersect with plane
        denom = np.dot(ray.direction, self.normal)

        if abs(denom) < 1e-6:
            return None

        t = np.dot(self.center - ray.origin, self.normal) / denom

        if t < 0.001:
            return None

        # Check if intersection point is within disk radius
        point = ray.point_at(t)
        distance_from_center = np.linalg.norm(point - self.center)

        if distance_from_center > self.radius:
            return None

        normal = self.normal if denom < 0 else -self.normal

        return HitRecord(t, point, normal, self.material)
```

## Ray-Cylinder Intersection

```python
class Cylinder:
    """Infinite cylinder along an axis."""

    def __init__(self, center, axis, radius, material=None):
        """
        Initialize cylinder.

        Args:
            center: Point on cylinder axis
            axis: Cylinder axis direction (normalized)
            radius: Cylinder radius
            material: Material properties
        """
        self.center = np.array(center, dtype=float)
        self.axis = np.array(axis, dtype=float)
        self.axis = self.axis / np.linalg.norm(self.axis)
        self.radius = radius
        self.material = material

    def intersect(self, ray):
        """
        Ray-cylinder intersection (infinite cylinder).

        Args:
            ray: Ray object

        Returns:
            HitRecord if intersection found, None otherwise
        """
        # Vector from cylinder center to ray origin
        oc = ray.origin - self.center

        # Project onto plane perpendicular to axis
        # Remove component along axis
        d_parallel = np.dot(ray.direction, self.axis) * self.axis
        d_perp = ray.direction - d_parallel

        oc_parallel = np.dot(oc, self.axis) * self.axis
        oc_perp = oc - oc_parallel

        # Solve quadratic equation in perpendicular components
        a = np.dot(d_perp, d_perp)
        b = 2.0 * np.dot(oc_perp, d_perp)
        c = np.dot(oc_perp, oc_perp) - self.radius * self.radius

        discriminant = b * b - 4 * a * c

        if discriminant < 0:
            return None

        sqrt_d = np.sqrt(discriminant)
        t1 = (-b - sqrt_d) / (2.0 * a)
        t2 = (-b + sqrt_d) / (2.0 * a)

        t = None
        if t1 > 0.001:
            t = t1
        elif t2 > 0.001:
            t = t2
        else:
            return None

        # Calculate intersection point and normal
        point = ray.point_at(t)

        # Normal is perpendicular to axis, pointing outward
        point_on_axis = self.center + np.dot(point - self.center, self.axis) * self.axis
        normal = point - point_on_axis
        normal = normal / np.linalg.norm(normal)

        return HitRecord(t, point, normal, self.material)
```

## Performance Considerations

### Early Exit Optimizations

```python
def find_closest_intersection(ray, objects):
    """
    Find closest intersection among multiple objects.

    Args:
        ray: Ray object
        objects: List of scene objects

    Returns:
        Closest HitRecord or None
    """
    closest_hit = None
    closest_t = float('inf')

    for obj in objects:
        hit = obj.intersect(ray)

        if hit and hit.t < closest_t:
            closest_hit = hit
            closest_t = hit.t

    return closest_hit
```

### Bounding Volume Hierarchies

```python
def find_closest_intersection_with_bvh(ray, bvh_root):
    """
    Find closest intersection using BVH acceleration.

    Args:
        ray: Ray object
        bvh_root: Root of BVH tree

    Returns:
        Closest HitRecord or None
    """
    if not bvh_root.bounds.intersect(ray):
        return None

    if bvh_root.is_leaf():
        return bvh_root.object.intersect(ray)

    # Recursively check children
    hit_left = find_closest_intersection_with_bvh(ray, bvh_root.left)
    hit_right = find_closest_intersection_with_bvh(ray, bvh_root.right)

    # Return closest hit
    if hit_left and hit_right:
        return hit_left if hit_left.t < hit_right.t else hit_right
    elif hit_left:
        return hit_left
    else:
        return hit_right
```

## Conclusion

Efficient and accurate ray-object intersection tests are fundamental to ray tracing. The choice of geometric primitives and intersection algorithms significantly impacts both render quality and performance. Modern ray tracers use a combination of simple primitives (spheres, triangles) with sophisticated acceleration structures (BVHs, kd-trees) to achieve interactive rendering speeds. Understanding these intersection algorithms is essential for implementing any ray tracing system.
