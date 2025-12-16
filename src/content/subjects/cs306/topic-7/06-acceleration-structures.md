# Acceleration Structures

## Introduction

Naive ray tracing tests every ray against every object in the scene, resulting in O(n) complexity per ray where n is the number of objects. For complex scenes with millions of triangles, this becomes prohibitively slow. Acceleration structures organize geometry spatially to reduce the number of intersection tests needed, achieving O(log n) complexity.

The two most common acceleration structures are Bounding Volume Hierarchies (BVH) and kd-trees, though other structures like octrees, grids, and spatial hashing are also used for specific scenarios.

## Bounding Volume Hierarchy (BVH)

A BVH is a tree structure where each node contains a bounding volume that fully encloses its children. Ray traversal stops early when a ray misses a bounding volume, eliminating all geometry within.

### BVH Node Structure

```python
import numpy as np

class BVHNode:
    """Node in a Bounding Volume Hierarchy."""

    def __init__(self, bounds, left=None, right=None, objects=None):
        """
        Initialize BVH node.

        Args:
            bounds: Axis-aligned bounding box
            left: Left child node
            right: Right child node
            objects: Leaf objects (if leaf node)
        """
        self.bounds = bounds
        self.left = left
        self.right = right
        self.objects = objects

    def is_leaf(self):
        """Check if this is a leaf node."""
        return self.objects is not None

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

    def intersect(self, ray):
        """
        Test ray-AABB intersection using slab method.

        Args:
            ray: Ray to test

        Returns:
            True if ray intersects box
        """
        t_min = -float('inf')
        t_max = float('inf')

        for axis in range(3):
            if abs(ray.direction[axis]) < 1e-8:
                # Ray parallel to slab
                if ray.origin[axis] < self.min[axis] or ray.origin[axis] > self.max[axis]:
                    return False
            else:
                inv_d = 1.0 / ray.direction[axis]
                t0 = (self.min[axis] - ray.origin[axis]) * inv_d
                t1 = (self.max[axis] - ray.origin[axis]) * inv_d

                if inv_d < 0:
                    t0, t1 = t1, t0

                t_min = max(t_min, t0)
                t_max = min(t_max, t1)

                if t_max <= t_min:
                    return False

        return t_max > 0

    def surface_area(self):
        """Calculate surface area of box."""
        d = self.max - self.min
        return 2 * (d[0] * d[1] + d[1] * d[2] + d[2] * d[0])

    def center(self):
        """Calculate center of box."""
        return (self.min + self.max) * 0.5

    @staticmethod
    def surrounding_box(box1, box2):
        """Create AABB containing both boxes."""
        min_point = np.minimum(box1.min, box2.min)
        max_point = np.maximum(box1.max, box2.max)
        return AABB(min_point, max_point)

    @staticmethod
    def from_objects(objects):
        """Create AABB containing all objects."""
        if not objects:
            return AABB(np.zeros(3), np.zeros(3))

        min_point = np.array([float('inf')] * 3)
        max_point = np.array([-float('inf')] * 3)

        for obj in objects:
            obj_bounds = obj.get_bounds()
            min_point = np.minimum(min_point, obj_bounds.min)
            max_point = np.maximum(max_point, obj_bounds.max)

        return AABB(min_point, max_point)
```

### BVH Construction

#### Surface Area Heuristic (SAH)

The SAH estimates the cost of splitting at different positions to find optimal splits:

```python
def build_bvh_sah(objects, max_leaf_size=4):
    """
    Build BVH using Surface Area Heuristic.

    Args:
        objects: List of objects to organize
        max_leaf_size: Maximum objects in leaf node

    Returns:
        BVH root node
    """
    if len(objects) <= max_leaf_size:
        # Create leaf node
        bounds = AABB.from_objects(objects)
        return BVHNode(bounds, objects=objects)

    # Find best split using SAH
    best_cost = float('inf')
    best_axis = 0
    best_split_pos = 0

    bounds = AABB.from_objects(objects)

    # Try each axis
    for axis in range(3):
        # Sort objects along axis
        sorted_objects = sorted(objects, key=lambda obj: obj.get_bounds().center()[axis])

        # Try splits at object boundaries
        for i in range(1, len(sorted_objects)):
            left_objects = sorted_objects[:i]
            right_objects = sorted_objects[i:]

            # Calculate bounding boxes
            left_bounds = AABB.from_objects(left_objects)
            right_bounds = AABB.from_objects(right_objects)

            # SAH cost function
            cost = (
                left_bounds.surface_area() * len(left_objects) +
                right_bounds.surface_area() * len(right_objects)
            )

            if cost < best_cost:
                best_cost = cost
                best_axis = axis
                best_split_pos = i

    # Split using best configuration
    sorted_objects = sorted(objects, key=lambda obj: obj.get_bounds().center()[best_axis])
    left_objects = sorted_objects[:best_split_pos]
    right_objects = sorted_objects[best_split_pos:]

    # Recursively build children
    left_node = build_bvh_sah(left_objects, max_leaf_size)
    right_node = build_bvh_sah(right_objects, max_leaf_size)

    # Create internal node
    return BVHNode(bounds, left=left_node, right=right_node)
```

#### Median Split

Simpler but less optimal than SAH:

```python
def build_bvh_median(objects, max_leaf_size=4):
    """
    Build BVH using median splitting.

    Args:
        objects: List of objects
        max_leaf_size: Maximum leaf size

    Returns:
        BVH root node
    """
    if len(objects) <= max_leaf_size:
        bounds = AABB.from_objects(objects)
        return BVHNode(bounds, objects=objects)

    # Calculate bounds
    bounds = AABB.from_objects(objects)

    # Choose longest axis
    extent = bounds.max - bounds.min
    axis = np.argmax(extent)

    # Sort along chosen axis
    sorted_objects = sorted(objects, key=lambda obj: obj.get_bounds().center()[axis])

    # Split at median
    mid = len(sorted_objects) // 2
    left_objects = sorted_objects[:mid]
    right_objects = sorted_objects[mid:]

    # Recursively build children
    left_node = build_bvh_median(left_objects, max_leaf_size)
    right_node = build_bvh_median(right_objects, max_leaf_size)

    return BVHNode(bounds, left=left_node, right=right_node)
```

### BVH Traversal

```python
def traverse_bvh(ray, bvh_node, closest_hit=None, closest_t=float('inf')):
    """
    Traverse BVH to find closest ray intersection.

    Args:
        ray: Ray to trace
        bvh_node: Current BVH node
        closest_hit: Current closest hit (or None)
        closest_t: Current closest t value

    Returns:
        Closest hit record or None
    """
    # Test against node bounds
    if not bvh_node.bounds.intersect(ray):
        return closest_hit

    # Leaf node - test objects
    if bvh_node.is_leaf():
        for obj in bvh_node.objects:
            hit = obj.intersect(ray)

            if hit and hit.t < closest_t:
                closest_hit = hit
                closest_t = hit.t

        return closest_hit

    # Internal node - traverse children
    # Traverse both children (could be optimized with distance sorting)
    left_hit = traverse_bvh(ray, bvh_node.left, closest_hit, closest_t)

    if left_hit:
        closest_hit = left_hit
        closest_t = left_hit.t

    right_hit = traverse_bvh(ray, bvh_node.right, closest_hit, closest_t)

    if right_hit and right_hit.t < closest_t:
        closest_hit = right_hit

    return closest_hit
```

### Optimized Traversal

```python
def traverse_bvh_optimized(ray, bvh_node):
    """
    Optimized BVH traversal with child ordering.

    Args:
        ray: Ray to trace
        bvh_node: BVH root

    Returns:
        Closest hit or None
    """
    closest_hit = None
    closest_t = float('inf')

    # Stack-based traversal (avoids recursion overhead)
    stack = [bvh_node]

    while stack:
        node = stack.pop()

        # Test bounds
        if not node.bounds.intersect(ray):
            continue

        # Leaf node
        if node.is_leaf():
            for obj in node.objects:
                hit = obj.intersect(ray)

                if hit and hit.t < closest_t:
                    closest_hit = hit
                    closest_t = hit.t
        else:
            # Internal node - add children to stack
            # Traverse nearer child first
            t_left = ray_box_intersection_distance(ray, node.left.bounds)
            t_right = ray_box_intersection_distance(ray, node.right.bounds)

            if t_left < t_right:
                if t_right < closest_t:
                    stack.append(node.right)
                if t_left < closest_t:
                    stack.append(node.left)
            else:
                if t_left < closest_t:
                    stack.append(node.left)
                if t_right < closest_t:
                    stack.append(node.right)

    return closest_hit

def ray_box_intersection_distance(ray, box):
    """Get distance to box intersection."""
    t_min = -float('inf')
    t_max = float('inf')

    for axis in range(3):
        if abs(ray.direction[axis]) > 1e-8:
            inv_d = 1.0 / ray.direction[axis]
            t0 = (box.min[axis] - ray.origin[axis]) * inv_d
            t1 = (box.max[axis] - ray.origin[axis]) * inv_d

            if inv_d < 0:
                t0, t1 = t1, t0

            t_min = max(t_min, t0)
            t_max = min(t_max, t1)

    return t_min if t_min >= 0 else t_max
```

## kd-Tree

A kd-tree recursively subdivides space with axis-aligned planes, creating a binary space partition.

### kd-Tree Node

```python
class KDNode:
    """Node in a kd-tree."""

    def __init__(self, axis=None, split_pos=None, left=None, right=None, objects=None):
        """
        Initialize kd-tree node.

        Args:
            axis: Split axis (0=x, 1=y, 2=z)
            split_pos: Split position along axis
            left: Left child (below split)
            right: Right child (above split)
            objects: Leaf objects
        """
        self.axis = axis
        self.split_pos = split_pos
        self.left = left
        self.right = right
        self.objects = objects

    def is_leaf(self):
        """Check if leaf node."""
        return self.objects is not None
```

### kd-Tree Construction

```python
def build_kdtree(objects, bounds, depth=0, max_depth=20, max_leaf_size=4):
    """
    Build kd-tree for spatial partitioning.

    Args:
        objects: Objects to organize
        bounds: Bounding box of current region
        depth: Current tree depth
        max_depth: Maximum tree depth
        max_leaf_size: Maximum objects in leaf

    Returns:
        kd-tree root node
    """
    if depth >= max_depth or len(objects) <= max_leaf_size:
        # Create leaf
        return KDNode(objects=objects)

    # Choose split axis (cycle through x, y, z)
    axis = depth % 3

    # Find split position (median of object centers)
    centers = [obj.get_bounds().center()[axis] for obj in objects]
    split_pos = np.median(centers)

    # Partition objects
    left_objects = [obj for obj in objects
                    if obj.get_bounds().center()[axis] < split_pos]
    right_objects = [obj for obj in objects
                     if obj.get_bounds().center()[axis] >= split_pos]

    # Handle degenerate case
    if len(left_objects) == 0 or len(right_objects) == 0:
        return KDNode(objects=objects)

    # Calculate child bounds
    left_bounds = AABB(bounds.min.copy(), bounds.max.copy())
    left_bounds.max[axis] = split_pos

    right_bounds = AABB(bounds.min.copy(), bounds.max.copy())
    right_bounds.min[axis] = split_pos

    # Recursively build children
    left_node = build_kdtree(left_objects, left_bounds, depth + 1, max_depth, max_leaf_size)
    right_node = build_kdtree(right_objects, right_bounds, depth + 1, max_depth, max_leaf_size)

    return KDNode(axis=axis, split_pos=split_pos, left=left_node, right=right_node)
```

### kd-Tree Traversal

```python
def traverse_kdtree(ray, node, t_min, t_max):
    """
    Traverse kd-tree to find closest intersection.

    Args:
        ray: Ray to trace
        node: Current kd-tree node
        t_min: Minimum t value for current region
        t_max: Maximum t value for current region

    Returns:
        Closest hit or None
    """
    if node.is_leaf():
        # Test all objects in leaf
        closest_hit = None
        closest_t = float('inf')

        for obj in node.objects:
            hit = obj.intersect(ray)

            if hit and t_min <= hit.t <= t_max and hit.t < closest_t:
                closest_hit = hit
                closest_t = hit.t

        return closest_hit

    # Internal node - determine traversal order
    axis = node.axis
    split_pos = node.split_pos

    # Calculate t value where ray crosses split plane
    if abs(ray.direction[axis]) < 1e-8:
        # Ray parallel to split plane
        if ray.origin[axis] < split_pos:
            return traverse_kdtree(ray, node.left, t_min, t_max)
        else:
            return traverse_kdtree(ray, node.right, t_min, t_max)

    t_split = (split_pos - ray.origin[axis]) / ray.direction[axis]

    # Determine which side to traverse first
    if ray.origin[axis] < split_pos:
        near_node = node.left
        far_node = node.right
    else:
        near_node = node.right
        far_node = node.left

    # Traverse near side
    if t_split > t_max or t_split < 0:
        return traverse_kdtree(ray, near_node, t_min, t_max)
    elif t_split < t_min:
        return traverse_kdtree(ray, far_node, t_min, t_max)
    else:
        # Check near side first
        hit = traverse_kdtree(ray, near_node, t_min, t_split)

        if hit:
            return hit

        # Check far side
        return traverse_kdtree(ray, far_node, t_split, t_max)
```

## Uniform Grid

Simple spatial subdivision into regular grid cells.

```python
class UniformGrid:
    """Uniform spatial grid acceleration structure."""

    def __init__(self, objects, bounds, resolution=32):
        """
        Initialize uniform grid.

        Args:
            objects: Objects to organize
            bounds: World bounds
            resolution: Grid resolution per axis
        """
        self.bounds = bounds
        self.resolution = resolution

        # Calculate cell size
        extent = bounds.max - bounds.min
        self.cell_size = extent / resolution

        # Initialize grid
        self.grid = {}

        # Insert objects into grid
        for obj in objects:
            obj_bounds = obj.get_bounds()

            # Find cells object overlaps
            min_cell = self.world_to_cell(obj_bounds.min)
            max_cell = self.world_to_cell(obj_bounds.max)

            # Add to all overlapping cells
            for x in range(min_cell[0], max_cell[0] + 1):
                for y in range(min_cell[1], max_cell[1] + 1):
                    for z in range(min_cell[2], max_cell[2] + 1):
                        cell = (x, y, z)

                        if cell not in self.grid:
                            self.grid[cell] = []

                        self.grid[cell].append(obj)

    def world_to_cell(self, position):
        """Convert world position to grid cell."""
        relative = position - self.bounds.min
        cell = (relative / self.cell_size).astype(int)
        cell = np.clip(cell, 0, self.resolution - 1)
        return tuple(cell)

    def traverse(self, ray):
        """
        Traverse grid using 3D DDA.

        Args:
            ray: Ray to trace

        Returns:
            Closest hit or None
        """
        # Find entry point
        t_min = 0
        t_max = float('inf')

        # Clip to grid bounds
        for axis in range(3):
            if abs(ray.direction[axis]) > 1e-8:
                inv_d = 1.0 / ray.direction[axis]
                t0 = (self.bounds.min[axis] - ray.origin[axis]) * inv_d
                t1 = (self.bounds.max[axis] - ray.origin[axis]) * inv_d

                if inv_d < 0:
                    t0, t1 = t1, t0

                t_min = max(t_min, t0)
                t_max = min(t_max, t1)

        if t_min > t_max:
            return None

        # Start position
        start_pos = ray.origin + ray.direction * max(0, t_min + 1e-6)
        current_cell = self.world_to_cell(start_pos)

        # 3D DDA setup
        step = np.sign(ray.direction).astype(int)
        step = np.where(step == 0, 1, step)

        t_delta = self.cell_size / np.abs(ray.direction + 1e-8)

        cell_boundary = self.bounds.min + (np.array(current_cell) + (step + 1) / 2) * self.cell_size
        t_next = (cell_boundary - ray.origin) / (ray.direction + 1e-8)

        closest_hit = None
        closest_t = float('inf')

        # Traverse cells
        for i in range(self.resolution * 3):  # Max iterations
            # Test objects in current cell
            cell_key = tuple(current_cell)

            if cell_key in self.grid:
                for obj in self.grid[cell_key]:
                    hit = obj.intersect(ray)

                    if hit and hit.t < closest_t:
                        closest_hit = hit
                        closest_t = hit.t

            # If we found a hit closer than next cell, stop
            if closest_hit and closest_t < min(t_next):
                break

            # Step to next cell
            axis = np.argmin(t_next)
            current_cell[axis] += step[axis]
            t_next[axis] += t_delta[axis]

            # Check bounds
            if (current_cell[axis] < 0 or current_cell[axis] >= self.resolution):
                break

        return closest_hit
```

## Performance Comparison

```python
def compare_acceleration_structures(scene):
    """
    Compare different acceleration structures.

    Args:
        scene: Test scene with objects

    Returns:
        Timing results
    """
    import time

    results = {}

    # Build structures
    start = time.time()
    bvh = build_bvh_sah(scene.objects)
    results['bvh_build'] = time.time() - start

    start = time.time()
    bounds = AABB.from_objects(scene.objects)
    kdtree = build_kdtree(scene.objects, bounds)
    results['kdtree_build'] = time.time() - start

    start = time.time()
    grid = UniformGrid(scene.objects, bounds)
    results['grid_build'] = time.time() - start

    # Test traversal with sample rays
    test_rays = [generate_random_ray() for _ in range(1000)]

    start = time.time()
    for ray in test_rays:
        traverse_bvh(ray, bvh)
    results['bvh_traverse'] = time.time() - start

    start = time.time()
    for ray in test_rays:
        traverse_kdtree(ray, kdtree, 0, float('inf'))
    results['kdtree_traverse'] = time.time() - start

    start = time.time()
    for ray in test_rays:
        grid.traverse(ray)
    results['grid_traverse'] = time.time() - start

    return results
```

## Conclusion

Acceleration structures are essential for practical ray tracing. BVHs are generally the most robust choice, offering good performance across various scene types and efficient construction. kd-trees can be slightly faster for static scenes but are more complex to implement correctly. Uniform grids work well for uniformly distributed geometry but suffer with sparse or clustered distributions. Modern production renderers typically use BVHs with SAH construction, often with specialized builders for CPUs vs GPUs.
