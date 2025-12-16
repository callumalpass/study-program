import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-6-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Reference Counting',
    difficulty: 1,
    description: 'Implement basic reference counting for memory management.',
    starterCode: `class RefCounted:
    """Object with reference counting."""

    def __init__(self, value):
        self.value = value
        self.ref_count = 1

    def add_ref(self):
        pass

    def release(self):
        pass`,
    solution: `class RefCounted:
    def __init__(self, value):
        self.value = value
        self.ref_count = 1
        self.freed = False

    def add_ref(self):
        if not self.freed:
            self.ref_count += 1

    def release(self):
        if not self.freed:
            self.ref_count -= 1
            if self.ref_count == 0:
                self.freed = True
                self.value = None
                return True
        return False`,
    testCases: [
      { input: 'r = RefCounted(42); r.ref_count', isHidden: false, description: 'Test case' },
      { input: 'r = RefCounted(42); r.add_ref(); r.ref_count', isHidden: false, description: 'Test case' },
      { input: 'r = RefCounted(42); r.release(); r.freed', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Increment count when adding reference',
      'Decrement and free when releasing',
      'Free when count reaches zero'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Manual Memory Pool',
    difficulty: 1,
    description: 'Implement a simple memory pool allocator.',
    starterCode: `class MemoryPool:
    """Fixed-size memory pool."""

    def __init__(self, block_size, num_blocks):
        pass

    def allocate(self):
        """Allocate a block, return index or -1."""
        pass

    def free(self, index):
        """Free a block."""
        pass`,
    solution: `class MemoryPool:
    def __init__(self, block_size, num_blocks):
        self.block_size = block_size
        self.num_blocks = num_blocks
        self.blocks = [None] * num_blocks
        self.free_list = list(range(num_blocks))

    def allocate(self):
        if not self.free_list:
            return -1
        index = self.free_list.pop(0)
        self.blocks[index] = [0] * self.block_size
        return index

    def free(self, index):
        if 0 <= index < self.num_blocks and index not in self.free_list:
            self.blocks[index] = None
            self.free_list.append(index)

    def read(self, index, offset):
        if self.blocks[index]:
            return self.blocks[index][offset]
        return None

    def write(self, index, offset, value):
        if self.blocks[index]:
            self.blocks[index][offset] = value`,
    testCases: [
      { input: 'pool = MemoryPool(4, 3); pool.allocate()', isHidden: false, description: 'Test case' },
      { input: 'pool = MemoryPool(4, 2); pool.allocate(); pool.allocate(); pool.allocate()', isHidden: false, description: 'Test case' },
      { input: 'pool = MemoryPool(4, 2); a = pool.allocate(); pool.free(a); pool.allocate()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use free list for available blocks',
      'Return -1 when pool exhausted',
      'Add freed blocks back to list'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Bump Allocator',
    difficulty: 1,
    description: 'Implement a bump allocator (arena allocator).',
    starterCode: `class BumpAllocator:
    """Simple bump allocator - allocates by incrementing pointer."""

    def __init__(self, size):
        pass

    def allocate(self, num_bytes):
        """Allocate bytes, return start address or -1."""
        pass

    def reset(self):
        """Reset allocator, freeing all memory."""
        pass`,
    solution: `class BumpAllocator:
    def __init__(self, size):
        self.memory = bytearray(size)
        self.size = size
        self.ptr = 0

    def allocate(self, num_bytes):
        if self.ptr + num_bytes > self.size:
            return -1
        addr = self.ptr
        self.ptr += num_bytes
        return addr

    def reset(self):
        self.ptr = 0
        self.memory = bytearray(self.size)

    def used(self):
        return self.ptr

    def available(self):
        return self.size - self.ptr`,
    testCases: [
      { input: 'ba = BumpAllocator(100); ba.allocate(10)', isHidden: false, description: 'Test case' },
      { input: 'ba = BumpAllocator(100); ba.allocate(10); ba.allocate(20)', isHidden: false, description: 'Test case' },
      { input: 'ba = BumpAllocator(10); ba.allocate(20)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Track current position with pointer',
      'Increment pointer on each allocation',
      'Reset pointer to free all memory'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Mark-Sweep Garbage Collector',
    difficulty: 3,
    description: 'Implement a mark-and-sweep garbage collector.',
    starterCode: `class MarkSweepGC:
    """Mark-and-sweep garbage collector."""

    def __init__(self, heap_size):
        pass

    def allocate(self, value):
        """Allocate object, return address."""
        pass

    def collect(self, roots):
        """Run garbage collection given root set."""
        pass`,
    solution: `class MarkSweepGC:
    def __init__(self, heap_size):
        self.heap = [None] * heap_size
        self.marked = [False] * heap_size
        self.free_list = list(range(heap_size))

    def allocate(self, value):
        if not self.free_list:
            return -1
        addr = self.free_list.pop(0)
        self.heap[addr] = value
        return addr

    def collect(self, roots):
        # Mark phase
        self.marked = [False] * len(self.heap)
        worklist = list(roots)

        while worklist:
            addr = worklist.pop()
            if addr < 0 or addr >= len(self.heap):
                continue
            if self.marked[addr]:
                continue
            self.marked[addr] = True

            # Add references from this object
            obj = self.heap[addr]
            if isinstance(obj, dict):
                for v in obj.values():
                    if isinstance(v, int) and 0 <= v < len(self.heap):
                        worklist.append(v)
            elif isinstance(obj, (list, tuple)):
                for v in obj:
                    if isinstance(v, int) and 0 <= v < len(self.heap):
                        worklist.append(v)

        # Sweep phase
        freed = 0
        for addr in range(len(self.heap)):
            if not self.marked[addr] and self.heap[addr] is not None:
                self.heap[addr] = None
                self.free_list.append(addr)
                freed += 1

        return freed

    def read(self, addr):
        return self.heap[addr]`,
    testCases: [
      { input: 'gc = MarkSweepGC(10); gc.allocate(42)', isHidden: false, description: 'Test case' },
      { input: 'gc = MarkSweepGC(10); gc.allocate(1); gc.allocate(2); gc.collect([0])', isHidden: false, description: 'Test case' },
      { input: 'gc = MarkSweepGC(10); a = gc.allocate({"ref": 1}); b = gc.allocate(42); gc.collect([a])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Mark all reachable objects from roots',
      'Sweep unmarked objects to free list',
      'Follow references during marking'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Copying Garbage Collector',
    difficulty: 3,
    description: 'Implement a semi-space copying collector.',
    starterCode: `class CopyingGC:
    """Semi-space copying garbage collector."""

    def __init__(self, space_size):
        pass

    def allocate(self, value):
        pass

    def collect(self, roots):
        """Copy live objects to new space."""
        pass`,
    solution: `class CopyingGC:
    def __init__(self, space_size):
        self.space_size = space_size
        self.from_space = [None] * space_size
        self.to_space = [None] * space_size
        self.alloc_ptr = 0
        self.forwarding = {}

    def allocate(self, value):
        if self.alloc_ptr >= self.space_size:
            return -1
        addr = self.alloc_ptr
        self.from_space[addr] = value
        self.alloc_ptr += 1
        return addr

    def collect(self, roots):
        self.to_space = [None] * self.space_size
        self.forwarding = {}
        scan = 0
        free = 0

        # Copy roots
        new_roots = []
        for root in roots:
            new_addr = self.copy(root, free)
            if new_addr >= 0:
                new_roots.append(new_addr)
                free += 1

        # Scan and copy referenced objects
        while scan < free:
            obj = self.to_space[scan]
            if isinstance(obj, dict):
                for k, v in obj.items():
                    if isinstance(v, int) and v in self.forwarding:
                        obj[k] = self.forwarding[v]
                    elif isinstance(v, int) and 0 <= v < self.space_size:
                        new_addr = self.copy(v, free)
                        if new_addr >= 0:
                            obj[k] = new_addr
                            free += 1
            elif isinstance(obj, list):
                for i, v in enumerate(obj):
                    if isinstance(v, int) and v in self.forwarding:
                        obj[i] = self.forwarding[v]
                    elif isinstance(v, int) and 0 <= v < self.space_size:
                        new_addr = self.copy(v, free)
                        if new_addr >= 0:
                            obj[i] = new_addr
                            free += 1
            scan += 1

        # Swap spaces
        self.from_space, self.to_space = self.to_space, self.from_space
        self.alloc_ptr = free

        return new_roots

    def copy(self, addr, to_addr):
        if addr < 0 or addr >= self.space_size:
            return -1
        if addr in self.forwarding:
            return self.forwarding[addr]
        obj = self.from_space[addr]
        if obj is None:
            return -1
        self.to_space[to_addr] = obj
        self.forwarding[addr] = to_addr
        return to_addr

    def read(self, addr):
        return self.from_space[addr]`,
    testCases: [
      { input: 'gc = CopyingGC(10); gc.allocate(42)', isHidden: false, description: 'Test case' },
      { input: 'gc = CopyingGC(10); gc.allocate(1); gc.allocate(2); gc.allocate(3); gc.collect([0]); gc.alloc_ptr', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Copy live objects to new space',
      'Use forwarding pointers for moved objects',
      'Swap spaces after collection'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Generational GC',
    difficulty: 3,
    description: 'Implement a simple generational garbage collector.',
    starterCode: `class GenerationalGC:
    """Two-generation garbage collector."""

    def __init__(self, young_size, old_size):
        pass

    def allocate(self, value):
        """Allocate in young generation."""
        pass

    def minor_collect(self, roots):
        """Collect young generation."""
        pass

    def major_collect(self, roots):
        """Collect both generations."""
        pass`,
    solution: `class GenerationalGC:
    def __init__(self, young_size, old_size):
        self.young = [None] * young_size
        self.old = [None] * old_size
        self.young_ptr = 0
        self.old_ptr = 0
        self.ages = {}  # addr -> age
        self.threshold = 2

    def allocate(self, value):
        if self.young_ptr >= len(self.young):
            return -1
        addr = self.young_ptr
        self.young[addr] = value
        self.ages[('young', addr)] = 0
        self.young_ptr += 1
        return ('young', addr)

    def minor_collect(self, roots):
        # Mark reachable in young generation
        marked = set()
        worklist = [r for r in roots if isinstance(r, tuple) and r[0] == 'young']

        while worklist:
            ref = worklist.pop()
            if ref in marked:
                continue
            marked.add(ref)
            gen, addr = ref
            obj = self.young[addr] if gen == 'young' else self.old[addr]
            # Would follow references here

        # Promote or free
        promoted = 0
        freed = 0
        for addr in range(self.young_ptr):
            ref = ('young', addr)
            if ref in marked:
                self.ages[ref] = self.ages.get(ref, 0) + 1
                if self.ages[ref] >= self.threshold:
                    # Promote to old
                    if self.old_ptr < len(self.old):
                        self.old[self.old_ptr] = self.young[addr]
                        self.old_ptr += 1
                        promoted += 1
                    self.young[addr] = None
            else:
                self.young[addr] = None
                freed += 1

        # Compact young generation
        new_ptr = 0
        for addr in range(self.young_ptr):
            if self.young[addr] is not None:
                if addr != new_ptr:
                    self.young[new_ptr] = self.young[addr]
                    self.young[addr] = None
                new_ptr += 1
        self.young_ptr = new_ptr

        return {'promoted': promoted, 'freed': freed}

    def major_collect(self, roots):
        # Full collection of both generations
        self.minor_collect(roots)
        # Would also collect old generation
        return {'young_used': self.young_ptr, 'old_used': self.old_ptr}`,
    testCases: [
      { input: 'gc = GenerationalGC(10, 20); gc.allocate(42)', isHidden: false, description: 'Test case' },
      { input: 'gc = GenerationalGC(10, 20); gc.allocate(1); gc.allocate(2); gc.minor_collect([])["freed"]', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Young generation for new objects',
      'Promote survivors to old generation',
      'Minor collection is faster than major'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Cycle Detection',
    difficulty: 3,
    description: 'Implement cycle detection for reference counting.',
    starterCode: `class CycleDetector:
    """Detect cycles in object graph."""

    def __init__(self):
        self.objects = {}

    def add_object(self, id, refs):
        """Add object with given references."""
        pass

    def find_cycles(self):
        """Find all cycles in object graph."""
        pass`,
    solution: `class CycleDetector:
    def __init__(self):
        self.objects = {}

    def add_object(self, obj_id, refs):
        self.objects[obj_id] = refs

    def find_cycles(self):
        cycles = []
        visited = set()
        rec_stack = set()

        def dfs(node, path):
            if node in rec_stack:
                cycle_start = path.index(node)
                cycles.append(path[cycle_start:])
                return

            if node in visited:
                return

            visited.add(node)
            rec_stack.add(node)
            path.append(node)

            for ref in self.objects.get(node, []):
                if ref in self.objects:
                    dfs(ref, path.copy())

            rec_stack.remove(node)

        for obj_id in self.objects:
            if obj_id not in visited:
                dfs(obj_id, [])

        return cycles

    def break_cycles(self):
        cycles = self.find_cycles()
        broken = 0
        for cycle in cycles:
            if len(cycle) > 0:
                # Remove last reference to break cycle
                last = cycle[-1]
                first = cycle[0]
                if first in self.objects.get(last, []):
                    self.objects[last].remove(first)
                    broken += 1
        return broken`,
    testCases: [
      { input: 'cd = CycleDetector(); cd.add_object("a", ["b"]); cd.add_object("b", ["a"]); len(cd.find_cycles())', isHidden: false, description: 'Test case' },
      { input: 'cd = CycleDetector(); cd.add_object("a", ["b"]); cd.add_object("b", []); len(cd.find_cycles())', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use DFS with recursion stack',
      'Cycle exists if we revisit node in current path',
      'Track path to reconstruct cycle'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Stack Allocation',
    difficulty: 3,
    description: 'Implement stack-based memory allocation.',
    starterCode: `class StackAllocator:
    """Stack-based allocator with scoped deallocation."""

    def __init__(self, size):
        pass

    def push_frame(self):
        """Start new allocation frame."""
        pass

    def allocate(self, size):
        """Allocate in current frame."""
        pass

    def pop_frame(self):
        """Pop frame, freeing all its allocations."""
        pass`,
    solution: `class StackAllocator:
    def __init__(self, size):
        self.memory = bytearray(size)
        self.size = size
        self.ptr = 0
        self.frame_stack = []

    def push_frame(self):
        self.frame_stack.append(self.ptr)

    def allocate(self, num_bytes):
        if self.ptr + num_bytes > self.size:
            return -1
        addr = self.ptr
        self.ptr += num_bytes
        return addr

    def pop_frame(self):
        if self.frame_stack:
            self.ptr = self.frame_stack.pop()
            return True
        return False

    def current_frame_size(self):
        if self.frame_stack:
            return self.ptr - self.frame_stack[-1]
        return self.ptr

    def total_used(self):
        return self.ptr

    def write(self, addr, data):
        for i, b in enumerate(data):
            if addr + i < self.size:
                self.memory[addr + i] = b

    def read(self, addr, size):
        return bytes(self.memory[addr:addr + size])`,
    testCases: [
      { input: 'sa = StackAllocator(100); sa.push_frame(); sa.allocate(10)', isHidden: false, description: 'Test case' },
      { input: 'sa = StackAllocator(100); sa.push_frame(); sa.allocate(10); sa.pop_frame(); sa.ptr', isHidden: false, description: 'Test case' },
      { input: 'sa = StackAllocator(100); sa.push_frame(); sa.allocate(10); sa.push_frame(); sa.allocate(20); sa.pop_frame(); sa.ptr', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Track frame boundaries on stack',
      'Allocation bumps pointer forward',
      'Pop frame resets to frame start'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Region-Based Memory',
    difficulty: 5,
    description: 'Implement region-based memory management.',
    starterCode: `class Region:
    """Memory region with bulk deallocation."""

    def __init__(self, name, size):
        pass

    def allocate(self, value):
        pass

class RegionManager:
    """Manage multiple memory regions."""

    def __init__(self):
        pass

    def create_region(self, name, size):
        pass

    def allocate_in(self, region_name, value):
        pass

    def free_region(self, name):
        pass`,
    solution: `class Region:
    def __init__(self, name, size):
        self.name = name
        self.memory = [None] * size
        self.ptr = 0

    def allocate(self, value):
        if self.ptr >= len(self.memory):
            return -1
        addr = self.ptr
        self.memory[addr] = value
        self.ptr += 1
        return addr

    def free_all(self):
        self.memory = [None] * len(self.memory)
        self.ptr = 0

    def read(self, addr):
        return self.memory[addr] if 0 <= addr < len(self.memory) else None

class RegionManager:
    def __init__(self):
        self.regions = {}

    def create_region(self, name, size):
        region = Region(name, size)
        self.regions[name] = region
        return region

    def allocate_in(self, region_name, value):
        if region_name not in self.regions:
            return None
        addr = self.regions[region_name].allocate(value)
        return (region_name, addr) if addr >= 0 else None

    def free_region(self, name):
        if name in self.regions:
            self.regions[name].free_all()
            del self.regions[name]
            return True
        return False

    def read(self, ref):
        if ref and len(ref) == 2:
            region_name, addr = ref
            if region_name in self.regions:
                return self.regions[region_name].read(addr)
        return None`,
    testCases: [
      { input: 'rm = RegionManager(); rm.create_region("temp", 10); rm.allocate_in("temp", 42)', isHidden: false, description: 'Test case' },
      { input: 'rm = RegionManager(); rm.create_region("r", 10); rm.allocate_in("r", 1); rm.free_region("r"); "r" in rm.regions', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Regions group related allocations',
      'Free entire region at once',
      'Useful for phase-based computation'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Ownership System',
    difficulty: 5,
    description: 'Implement a Rust-like ownership system.',
    starterCode: `class OwnedValue:
    """Value with single owner."""

    def __init__(self, value):
        pass

    def move_to(self):
        """Move ownership, invalidating this reference."""
        pass

    def borrow(self):
        """Create immutable borrow."""
        pass

    def borrow_mut(self):
        """Create mutable borrow."""
        pass`,
    solution: `class OwnedValue:
    def __init__(self, value):
        self._value = value
        self._valid = True
        self._borrows = 0
        self._mut_borrowed = False

    def move_to(self):
        if not self._valid:
            raise ValueError("Use after move")
        if self._borrows > 0 or self._mut_borrowed:
            raise ValueError("Cannot move while borrowed")
        value = self._value
        self._value = None
        self._valid = False
        return OwnedValue(value)

    def borrow(self):
        if not self._valid:
            raise ValueError("Use after move")
        if self._mut_borrowed:
            raise ValueError("Cannot borrow while mutably borrowed")
        self._borrows += 1
        return BorrowedRef(self)

    def borrow_mut(self):
        if not self._valid:
            raise ValueError("Use after move")
        if self._borrows > 0:
            raise ValueError("Cannot mutably borrow while borrowed")
        if self._mut_borrowed:
            raise ValueError("Already mutably borrowed")
        self._mut_borrowed = True
        return MutBorrowedRef(self)

    def get(self):
        if not self._valid:
            raise ValueError("Use after move")
        return self._value

class BorrowedRef:
    def __init__(self, owner):
        self._owner = owner

    def get(self):
        return self._owner._value

    def release(self):
        self._owner._borrows -= 1

class MutBorrowedRef:
    def __init__(self, owner):
        self._owner = owner

    def get(self):
        return self._owner._value

    def set(self, value):
        self._owner._value = value

    def release(self):
        self._owner._mut_borrowed = False`,
    testCases: [
      { input: 'o = OwnedValue(42); o.get()', isHidden: false, description: 'Test case' },
      { input: 'o = OwnedValue(42); o2 = o.move_to(); o2.get()', isHidden: false, description: 'Test case' },
      { input: 'o = OwnedValue(42); b = o.borrow(); b.get()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Move invalidates original owner',
      'Cannot borrow while mutably borrowed',
      'Cannot mutably borrow while any borrows exist'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Linear Types',
    difficulty: 5,
    description: 'Implement linear type checking ensuring single use.',
    starterCode: `class LinearTypeChecker:
    """Check that linear values are used exactly once."""

    def __init__(self):
        self.linear_vars = set()

    def declare_linear(self, var):
        pass

    def use_var(self, var):
        pass

    def check_all_used(self):
        pass`,
    solution: `class LinearTypeChecker:
    def __init__(self):
        self.linear_vars = {}  # var -> (declared, used)
        self.errors = []

    def declare_linear(self, var):
        if var in self.linear_vars:
            self.errors.append(f"Redeclaration of linear variable: {var}")
        else:
            self.linear_vars[var] = {'declared': True, 'used': False}

    def use_var(self, var):
        if var not in self.linear_vars:
            return True  # Non-linear variable, always ok
        if self.linear_vars[var]['used']:
            self.errors.append(f"Linear variable used twice: {var}")
            return False
        self.linear_vars[var]['used'] = True
        return True

    def check_all_used(self):
        for var, state in self.linear_vars.items():
            if not state['used']:
                self.errors.append(f"Linear variable never used: {var}")
        return len(self.errors) == 0

    def get_errors(self):
        return self.errors

    def check_expr(self, expr, env=None):
        if env is None:
            env = set()

        if isinstance(expr, str):
            return self.use_var(expr)

        if isinstance(expr, tuple):
            tag = expr[0]
            if tag == 'let_linear':
                _, var, e1, e2 = expr
                self.declare_linear(var)
                ok1 = self.check_expr(e1, env)
                ok2 = self.check_expr(e2, env | {var})
                return ok1 and ok2
            else:
                return all(self.check_expr(e, env) for e in expr[1:] if not isinstance(e, str) or e not in ['+', '-', '*', '/'])

        return True`,
    testCases: [
      { input: 'lc = LinearTypeChecker(); lc.declare_linear("x"); lc.use_var("x"); lc.check_all_used()', isHidden: false, description: 'Test case' },
      { input: 'lc = LinearTypeChecker(); lc.declare_linear("x"); lc.check_all_used()', isHidden: false, description: 'Test case' },
      { input: 'lc = LinearTypeChecker(); lc.declare_linear("x"); lc.use_var("x"); lc.use_var("x"); len(lc.errors)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Linear types must be used exactly once',
      'Track declaration and usage',
      'Report errors for unused or double-used'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Escape Analysis',
    difficulty: 5,
    description: 'Implement escape analysis to determine stack vs heap allocation.',
    starterCode: `class EscapeAnalyzer:
    """Analyze whether values escape their scope."""

    def analyze(self, func_ast):
        """
        Analyze function and return which variables escape.
        func_ast: ('func', params, body)
        """
        pass`,
    solution: `class EscapeAnalyzer:
    def __init__(self):
        self.escaping = set()
        self.returned = set()

    def analyze(self, func_ast):
        self.escaping = set()
        self.returned = set()

        if func_ast[0] != 'func':
            return self.escaping

        _, params, body = func_ast
        self._analyze_expr(body, set(params))

        return self.escaping

    def _analyze_expr(self, expr, local_vars):
        if isinstance(expr, str):
            return

        if not isinstance(expr, tuple):
            return

        tag = expr[0]

        if tag == 'let':
            _, var, init, body = expr
            self._analyze_expr(init, local_vars)
            self._analyze_expr(body, local_vars | {var})

        elif tag == 'return':
            _, ret_expr = expr
            self._mark_escaping(ret_expr, local_vars)
            self._analyze_expr(ret_expr, local_vars)

        elif tag == 'store_global':
            _, var = expr
            if var in local_vars:
                self.escaping.add(var)

        elif tag == 'call':
            # Arguments passed to functions might escape
            for arg in expr[2:]:
                if isinstance(arg, str) and arg in local_vars:
                    self.escaping.add(arg)
                self._analyze_expr(arg, local_vars)

        elif tag == 'closure':
            # Variables captured by closures escape
            _, params, body, captured = expr
            for var in captured:
                if var in local_vars:
                    self.escaping.add(var)

        else:
            for sub in expr[1:]:
                self._analyze_expr(sub, local_vars)

    def _mark_escaping(self, expr, local_vars):
        if isinstance(expr, str):
            if expr in local_vars:
                self.escaping.add(expr)
        elif isinstance(expr, tuple):
            for sub in expr[1:]:
                self._mark_escaping(sub, local_vars)

    def can_stack_allocate(self, var):
        return var not in self.escaping`,
    testCases: [
      { input: "ea = EscapeAnalyzer(); ea.analyze(('func', ['x'], ('return', 'x'))); 'x' in ea.escaping", isHidden: false, description: 'Test case' },
      { input: "ea = EscapeAnalyzer(); ea.analyze(('func', ['x'], ('let', 'y', 'x', 'y'))); 'y' in ea.escaping", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Values escape if returned or stored globally',
      'Closure capture causes escape',
      'Non-escaping values can be stack allocated'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Weak References',
    difficulty: 5,
    description: 'Implement weak references that dont prevent collection.',
    starterCode: `class WeakRef:
    """Reference that doesn't prevent garbage collection."""

    def __init__(self, target_id, registry):
        pass

    def get(self):
        """Get target if still alive, else None."""
        pass

class GCWithWeakRefs:
    """GC supporting weak references."""

    def __init__(self, size):
        pass

    def allocate(self, value):
        pass

    def create_weak_ref(self, target_id):
        pass

    def collect(self, roots):
        """Collect, clearing weak refs to collected objects."""
        pass`,
    solution: `class WeakRef:
    def __init__(self, target_id, registry):
        self.target_id = target_id
        self.registry = registry

    def get(self):
        if self.target_id in self.registry.alive:
            return self.registry.heap[self.target_id]
        return None

    def is_valid(self):
        return self.target_id in self.registry.alive

class GCWithWeakRefs:
    def __init__(self, size):
        self.heap = [None] * size
        self.free_list = list(range(size))
        self.weak_refs = []
        self.alive = set()

    def allocate(self, value):
        if not self.free_list:
            return -1
        addr = self.free_list.pop(0)
        self.heap[addr] = value
        self.alive.add(addr)
        return addr

    def create_weak_ref(self, target_id):
        weak = WeakRef(target_id, self)
        self.weak_refs.append(weak)
        return weak

    def collect(self, roots):
        # Mark phase (only strong refs)
        marked = set()
        worklist = list(roots)

        while worklist:
            addr = worklist.pop()
            if addr < 0 or addr >= len(self.heap):
                continue
            if addr in marked:
                continue
            marked.add(addr)

            obj = self.heap[addr]
            if isinstance(obj, dict):
                for v in obj.values():
                    if isinstance(v, int):
                        worklist.append(v)
            elif isinstance(obj, list):
                for v in obj:
                    if isinstance(v, int):
                        worklist.append(v)

        # Sweep phase
        freed = 0
        for addr in range(len(self.heap)):
            if addr not in marked and self.heap[addr] is not None:
                self.heap[addr] = None
                self.alive.discard(addr)
                self.free_list.append(addr)
                freed += 1

        return freed`,
    testCases: [
      { input: 'gc = GCWithWeakRefs(10); a = gc.allocate(42); w = gc.create_weak_ref(a); w.get()', isHidden: false, description: 'Test case' },
      { input: 'gc = GCWithWeakRefs(10); a = gc.allocate(42); w = gc.create_weak_ref(a); gc.collect([]); w.get()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Weak refs dont keep objects alive',
      'Check validity before returning target',
      'Clear weak refs during collection'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Incremental GC',
    difficulty: 5,
    description: 'Implement incremental garbage collection.',
    starterCode: `class IncrementalGC:
    """Garbage collector with incremental marking."""

    def __init__(self, size):
        pass

    def allocate(self, value):
        pass

    def step(self, work_limit=10):
        """Do limited GC work, return True if complete."""
        pass

    def start_collection(self, roots):
        """Start a new collection cycle."""
        pass`,
    solution: `class IncrementalGC:
    def __init__(self, size):
        self.heap = [None] * size
        self.free_list = list(range(size))
        self.marked = set()
        self.worklist = []
        self.collecting = False
        self.roots = []

    def allocate(self, value):
        if not self.free_list:
            return -1
        addr = self.free_list.pop(0)
        self.heap[addr] = value
        # If allocating during collection, mark as gray
        if self.collecting:
            self.worklist.append(addr)
        return addr

    def start_collection(self, roots):
        self.marked = set()
        self.worklist = list(roots)
        self.roots = roots
        self.collecting = True

    def step(self, work_limit=10):
        if not self.collecting:
            return True

        work_done = 0

        # Mark phase
        while self.worklist and work_done < work_limit:
            addr = self.worklist.pop()
            if addr < 0 or addr >= len(self.heap):
                continue
            if addr in self.marked:
                continue

            self.marked.add(addr)
            work_done += 1

            obj = self.heap[addr]
            if isinstance(obj, dict):
                for v in obj.values():
                    if isinstance(v, int) and v not in self.marked:
                        self.worklist.append(v)
            elif isinstance(obj, list):
                for v in obj:
                    if isinstance(v, int) and v not in self.marked:
                        self.worklist.append(v)

        # If marking complete, do sweep
        if not self.worklist:
            for addr in range(len(self.heap)):
                if addr not in self.marked and self.heap[addr] is not None:
                    self.heap[addr] = None
                    self.free_list.append(addr)
            self.collecting = False
            return True

        return False

    def is_collecting(self):
        return self.collecting`,
    testCases: [
      { input: 'gc = IncrementalGC(10); gc.allocate(1); gc.allocate(2)', isHidden: false, description: 'Test case' },
      { input: 'gc = IncrementalGC(10); gc.allocate(1); gc.start_collection([]); gc.step(100)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Do limited work per step',
      'Maintain worklist between steps',
      'Handle allocations during collection'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Write Barrier',
    difficulty: 5,
    description: 'Implement write barriers for concurrent GC.',
    starterCode: `class WriteBarrierGC:
    """GC with write barriers for correctness."""

    def __init__(self, size):
        pass

    def write(self, obj_addr, field, value):
        """Write with barrier."""
        pass

    def snapshot_at_beginning(self, old_value, new_value):
        """SATB write barrier."""
        pass

    def incremental_update(self, obj_addr, new_ref):
        """Incremental update barrier."""
        pass`,
    solution: `class WriteBarrierGC:
    def __init__(self, size):
        self.heap = [None] * size
        self.free_list = list(range(size))
        self.marked = set()
        self.gray_set = set()
        self.collecting = False
        self.satb_queue = []

    def allocate(self, value):
        if not self.free_list:
            return -1
        addr = self.free_list.pop(0)
        self.heap[addr] = value
        return addr

    def write(self, obj_addr, field, value):
        obj = self.heap[obj_addr]
        if obj is None or not isinstance(obj, dict):
            return

        old_value = obj.get(field)

        # Apply write barrier
        if self.collecting:
            self.snapshot_at_beginning(old_value, value)
            self.incremental_update(obj_addr, value)

        obj[field] = value

    def snapshot_at_beginning(self, old_value, new_value):
        # Remember old references that might be overwritten
        if isinstance(old_value, int) and old_value >= 0:
            if old_value not in self.marked:
                self.satb_queue.append(old_value)

    def incremental_update(self, obj_addr, new_ref):
        # If writing a reference to a black object, mark target gray
        if obj_addr in self.marked and isinstance(new_ref, int):
            if new_ref >= 0 and new_ref not in self.marked:
                self.gray_set.add(new_ref)

    def start_collection(self, roots):
        self.marked = set()
        self.gray_set = set(roots)
        self.collecting = True
        self.satb_queue = []

    def step(self):
        if not self.collecting:
            return True

        # Process gray objects
        while self.gray_set:
            addr = self.gray_set.pop()
            if addr in self.marked:
                continue
            self.marked.add(addr)

            obj = self.heap[addr]
            if isinstance(obj, dict):
                for v in obj.values():
                    if isinstance(v, int) and v not in self.marked:
                        self.gray_set.add(v)

        # Process SATB queue
        while self.satb_queue:
            addr = self.satb_queue.pop()
            if addr not in self.marked:
                self.gray_set.add(addr)

        if not self.gray_set and not self.satb_queue:
            self.collecting = False
            return True

        return False`,
    testCases: [
      { input: 'gc = WriteBarrierGC(10); gc.allocate({"a": 1})', isHidden: false, description: 'Test case' },
      { input: 'gc = WriteBarrierGC(10); a = gc.allocate({"ref": -1}); gc.write(a, "ref", 5); gc.heap[a]["ref"]', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Write barriers track reference changes',
      'SATB preserves snapshot of graph',
      'Incremental update re-marks affected objects'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-6-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-6',
    title: 'Memory Profiler',
    difficulty: 5,
    description: 'Implement a memory profiler tracking allocations.',
    starterCode: `class MemoryProfiler:
    """Track memory allocations and find leaks."""

    def __init__(self):
        pass

    def record_allocation(self, addr, size, stack_trace):
        pass

    def record_free(self, addr):
        pass

    def get_live_allocations(self):
        pass

    def find_leaks(self, known_roots):
        pass`,
    solution: `import time

class MemoryProfiler:
    def __init__(self):
        self.allocations = {}
        self.freed = set()
        self.total_allocated = 0
        self.total_freed = 0

    def record_allocation(self, addr, size, stack_trace):
        self.allocations[addr] = {
            'size': size,
            'stack_trace': stack_trace,
            'time': time.time(),
            'freed': False
        }
        self.total_allocated += size

    def record_free(self, addr):
        if addr in self.allocations and not self.allocations[addr]['freed']:
            self.allocations[addr]['freed'] = True
            self.freed.add(addr)
            self.total_freed += self.allocations[addr]['size']

    def get_live_allocations(self):
        return {
            addr: info
            for addr, info in self.allocations.items()
            if not info['freed']
        }

    def find_leaks(self, known_roots):
        live = self.get_live_allocations()
        leaks = []

        for addr, info in live.items():
            if addr not in known_roots:
                leaks.append({
                    'addr': addr,
                    'size': info['size'],
                    'stack_trace': info['stack_trace'],
                    'age': time.time() - info['time']
                })

        return sorted(leaks, key=lambda x: x['size'], reverse=True)

    def get_stats(self):
        live = self.get_live_allocations()
        return {
            'total_allocated': self.total_allocated,
            'total_freed': self.total_freed,
            'current_usage': self.total_allocated - self.total_freed,
            'num_live': len(live),
            'num_freed': len(self.freed)
        }

    def get_allocation_by_stack(self):
        by_stack = {}
        for addr, info in self.get_live_allocations().items():
            trace = tuple(info['stack_trace'])
            if trace not in by_stack:
                by_stack[trace] = {'count': 0, 'total_size': 0}
            by_stack[trace]['count'] += 1
            by_stack[trace]['total_size'] += info['size']
        return by_stack`,
    testCases: [
      { input: 'mp = MemoryProfiler(); mp.record_allocation(0, 100, ["main"]); mp.get_stats()["current_usage"]', isHidden: false, description: 'Test case' },
      { input: 'mp = MemoryProfiler(); mp.record_allocation(0, 100, ["main"]); mp.record_free(0); mp.get_stats()["current_usage"]', isHidden: false, description: 'Test case' },
      { input: 'mp = MemoryProfiler(); mp.record_allocation(0, 100, ["main"]); len(mp.find_leaks([]))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Track allocation with metadata',
      'Compare live allocations against roots',
      'Group by stack trace to find sources'
    ],
    language: 'python'
  }
];
