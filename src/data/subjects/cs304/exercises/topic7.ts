import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs304-t7-ex01',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Simple Memory Allocator',
    difficulty: 2,
    description: 'Implement a basic memory allocator using a free list to manage heap memory allocation and deallocation.',
    starterCode: `class MemoryAllocator:
    def __init__(self, heap_size):
        self.heap_size = heap_size
        # Free list: list of (start, size) tuples
        self.free_list = [(0, heap_size)]
        self.allocated = {}  # address -> size

    def allocate(self, size):
        """
        Allocate a block of memory.
        Returns: starting address or None if allocation fails
        """
        # TODO: Implement first-fit allocation
        pass

    def free(self, address):
        """Free a previously allocated block."""
        # TODO: Return block to free list
        pass`,
    solution: `class MemoryAllocator:
    def __init__(self, heap_size):
        self.heap_size = heap_size
        # Free list: list of (start, size) tuples
        self.free_list = [(0, heap_size)]
        self.allocated = {}  # address -> size

    def allocate(self, size):
        """
        Allocate a block of memory.
        Returns: starting address or None if allocation fails
        """
        # First-fit: find first free block large enough
        for i, (start, block_size) in enumerate(self.free_list):
            if block_size >= size:
                # Allocate from this block
                self.allocated[start] = size

                # Update free list
                if block_size == size:
                    # Exact fit - remove block
                    self.free_list.pop(i)
                else:
                    # Split block
                    self.free_list[i] = (start + size, block_size - size)

                return start

        # No suitable block found
        return None

    def free(self, address):
        """Free a previously allocated block."""
        if address not in self.allocated:
            return False

        size = self.allocated[address]
        del self.allocated[address]

        # Add to free list
        self.free_list.append((address, size))

        # Sort free list by address for coalescing
        self.free_list.sort()

        # Coalesce adjacent free blocks
        i = 0
        while i < len(self.free_list) - 1:
            start1, size1 = self.free_list[i]
            start2, size2 = self.free_list[i + 1]

            # If blocks are adjacent, merge them
            if start1 + size1 == start2:
                self.free_list[i] = (start1, size1 + size2)
                self.free_list.pop(i + 1)
            else:
                i += 1

        return True`,
    testCases: [
      {
        input: `allocator = MemoryAllocator(1000)
addr1 = allocator.allocate(100)
print(addr1)`,
        expectedOutput: '0',
        isHidden: false,
        description: 'First allocation at address 0'
      },
      {
        input: `allocator = MemoryAllocator(1000)
addr1 = allocator.allocate(100)
addr2 = allocator.allocate(200)
print(addr2)`,
        expectedOutput: '100',
        isHidden: false,
        description: 'Second allocation after first'
      },
      {
        input: `allocator = MemoryAllocator(1000)
addr1 = allocator.allocate(100)
allocator.free(addr1)
addr2 = allocator.allocate(50)
print(addr2)`,
        isHidden: true,
        description: 'Reuse freed memory'
      }
    ],
    hints: [
      'Use first-fit strategy: allocate from the first free block that is large enough',
      'Split free blocks when they are larger than the requested size',
      'When freeing, add the block back to the free list',
      'Coalesce adjacent free blocks to reduce fragmentation'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex02',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Mark and Sweep Garbage Collector',
    difficulty: 3,
    description: 'Implement a mark-and-sweep garbage collector that identifies and reclaims unreachable objects.',
    starterCode: `class MarkSweepGC:
    def __init__(self):
        self.objects = {}  # address -> {'size': N, 'refs': [addresses]}
        self.roots = set()  # Root set (global variables, stack)
        self.next_addr = 0

    def allocate(self, size, refs=None):
        """Allocate an object. Returns address."""
        addr = self.next_addr
        self.next_addr += size
        self.objects[addr] = {'size': size, 'refs': refs or [], 'marked': False}
        return addr

    def add_root(self, address):
        """Add an address to the root set."""
        self.roots.add(address)

    def mark(self):
        """Mark all reachable objects starting from roots."""
        # TODO: Implement marking phase
        pass

    def sweep(self):
        """Reclaim unmarked objects."""
        # TODO: Implement sweep phase
        pass

    def collect(self):
        """Run garbage collection."""
        self.mark()
        self.sweep()`,
    solution: `class MarkSweepGC:
    def __init__(self):
        self.objects = {}  # address -> {'size': N, 'refs': [addresses]}
        self.roots = set()  # Root set (global variables, stack)
        self.next_addr = 0

    def allocate(self, size, refs=None):
        """Allocate an object. Returns address."""
        addr = self.next_addr
        self.next_addr += size
        self.objects[addr] = {'size': size, 'refs': refs or [], 'marked': False}
        return addr

    def add_root(self, address):
        """Add an address to the root set."""
        self.roots.add(address)

    def mark(self):
        """Mark all reachable objects starting from roots."""
        # Clear all marks
        for obj in self.objects.values():
            obj['marked'] = False

        # Mark from roots using DFS
        worklist = list(self.roots)

        while worklist:
            addr = worklist.pop()

            if addr not in self.objects:
                continue

            obj = self.objects[addr]

            if obj['marked']:
                continue

            # Mark this object
            obj['marked'] = True

            # Add referenced objects to worklist
            for ref_addr in obj['refs']:
                if ref_addr in self.objects and not self.objects[ref_addr]['marked']:
                    worklist.append(ref_addr)

    def sweep(self):
        """Reclaim unmarked objects."""
        # Collect addresses of unmarked objects
        to_delete = []
        for addr, obj in self.objects.items():
            if not obj['marked']:
                to_delete.append(addr)

        # Delete unmarked objects
        for addr in to_delete:
            del self.objects[addr]

    def collect(self):
        """Run garbage collection."""
        self.mark()
        self.sweep()`,
    testCases: [
      {
        input: `gc = MarkSweepGC()
obj1 = gc.allocate(10)
obj2 = gc.allocate(20)
gc.add_root(obj1)
gc.collect()
print(obj1 in gc.objects)`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Root object is not collected'
      },
      {
        input: `gc = MarkSweepGC()
obj1 = gc.allocate(10)
obj2 = gc.allocate(20)
gc.add_root(obj1)
gc.collect()
print(obj2 in gc.objects)`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'Unreachable object is collected'
      },
      {
        input: `gc = MarkSweepGC()
obj1 = gc.allocate(10, refs=[])
obj2 = gc.allocate(20, refs=[])
gc.objects[obj1]['refs'] = [obj2]
gc.add_root(obj1)
gc.collect()
print(obj2 in gc.objects)`,
        isHidden: true,
        description: 'Referenced object is not collected'
      }
    ],
    hints: [
      'Mark phase: traverse from roots and mark all reachable objects',
      'Use a worklist to perform depth-first or breadth-first traversal',
      'Sweep phase: delete all objects that are not marked',
      'Clear marks before each collection cycle'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex03',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Reference Counting Collector',
    difficulty: 2,
    description: 'Implement reference counting garbage collection where objects are freed when their reference count reaches zero.',
    starterCode: `class RefCountingGC:
    def __init__(self):
        self.objects = {}  # address -> {'size': N, 'refcount': M}
        self.next_addr = 0

    def allocate(self, size):
        """Allocate an object with refcount 1. Returns address."""
        addr = self.next_addr
        self.next_addr += size
        self.objects[addr] = {'size': size, 'refcount': 1}
        return addr

    def add_ref(self, address):
        """Increment reference count."""
        # TODO: Implement
        pass

    def remove_ref(self, address):
        """Decrement reference count and free if zero."""
        # TODO: Implement
        pass`,
    solution: `class RefCountingGC:
    def __init__(self):
        self.objects = {}  # address -> {'size': N, 'refcount': M}
        self.next_addr = 0

    def allocate(self, size):
        """Allocate an object with refcount 1. Returns address."""
        addr = self.next_addr
        self.next_addr += size
        self.objects[addr] = {'size': size, 'refcount': 1}
        return addr

    def add_ref(self, address):
        """Increment reference count."""
        if address in self.objects:
            self.objects[address]['refcount'] += 1

    def remove_ref(self, address):
        """Decrement reference count and free if zero."""
        if address not in self.objects:
            return

        self.objects[address]['refcount'] -= 1

        # Free if refcount reaches zero
        if self.objects[address]['refcount'] == 0:
            del self.objects[address]`,
    testCases: [
      {
        input: `gc = RefCountingGC()
obj = gc.allocate(100)
gc.add_ref(obj)
print(gc.objects[obj]['refcount'])`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Reference count incremented'
      },
      {
        input: `gc = RefCountingGC()
obj = gc.allocate(100)
gc.remove_ref(obj)
print(obj in gc.objects)`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'Object freed when refcount reaches 0'
      },
      {
        input: `gc = RefCountingGC()
obj = gc.allocate(100)
gc.add_ref(obj)
gc.remove_ref(obj)
print(obj in gc.objects)`,
        isHidden: true,
        description: 'Object remains while refcount > 0'
      }
    ],
    hints: [
      'Initialize objects with refcount 1 when allocated',
      'Increment refcount when a new reference is created',
      'Decrement refcount when a reference is removed',
      'Free the object when refcount reaches zero'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex04',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Copying Collector',
    difficulty: 3,
    description: 'Implement a copying garbage collector that moves live objects to a new space and compacts memory.',
    starterCode: `class CopyingGC:
    def __init__(self, heap_size):
        self.heap_size = heap_size
        self.from_space = {'start': 0, 'end': heap_size // 2, 'next': 0}
        self.to_space = {'start': heap_size // 2, 'end': heap_size, 'next': heap_size // 2}
        self.objects = {}  # old_addr -> {'size': N, 'new_addr': M, 'refs': [...]}
        self.roots = set()

    def allocate(self, size, refs=None):
        """Allocate in from-space. Returns address."""
        # TODO: Allocate from from_space
        pass

    def collect(self):
        """Perform copying collection."""
        # TODO: Copy live objects to to-space and update references
        # Then swap spaces
        pass`,
    solution: `class CopyingGC:
    def __init__(self, heap_size):
        self.heap_size = heap_size
        self.from_space = {'start': 0, 'end': heap_size // 2, 'next': 0}
        self.to_space = {'start': heap_size // 2, 'end': heap_size, 'next': heap_size // 2}
        self.objects = {}  # old_addr -> {'size': N, 'new_addr': M, 'refs': [...]}
        self.roots = set()

    def allocate(self, size, refs=None):
        """Allocate in from-space. Returns address."""
        addr = self.from_space['start'] + self.from_space['next']

        if addr + size > self.from_space['end']:
            return None  # Out of memory

        self.objects[addr] = {'size': size, 'new_addr': None, 'refs': refs or []}
        self.from_space['next'] += size

        return addr

    def add_root(self, address):
        """Add a root reference."""
        self.roots.add(address)

    def copy_object(self, old_addr):
        """Copy an object to to-space. Returns new address."""
        if old_addr not in self.objects:
            return old_addr

        obj = self.objects[old_addr]

        # If already copied, return new address
        if obj['new_addr'] is not None:
            return obj['new_addr']

        # Allocate in to-space
        new_addr = self.to_space['start'] + self.to_space['next']
        self.to_space['next'] += obj['size']

        # Record new address
        obj['new_addr'] = new_addr

        return new_addr

    def collect(self):
        """Perform copying collection."""
        # Reset to-space
        self.to_space['next'] = 0

        # Copy roots and update root references
        new_roots = set()
        for old_addr in self.roots:
            new_addr = self.copy_object(old_addr)
            new_roots.add(new_addr)

        # Process worklist: copy transitively reachable objects
        worklist = list(new_roots)
        visited = set()

        while worklist:
            addr = worklist.pop()

            if addr in visited:
                continue

            visited.add(addr)

            # Find corresponding old address
            old_addr = None
            for old, obj in self.objects.items():
                if obj['new_addr'] == addr:
                    old_addr = old
                    break

            if old_addr is None:
                continue

            obj = self.objects[old_addr]

            # Copy referenced objects
            new_refs = []
            for ref in obj['refs']:
                new_ref = self.copy_object(ref)
                new_refs.append(new_ref)
                if new_ref not in visited:
                    worklist.append(new_ref)

            obj['refs'] = new_refs

        # Rebuild objects table with new addresses
        new_objects = {}
        for old_addr, obj in self.objects.items():
            if obj['new_addr'] is not None:
                new_objects[obj['new_addr']] = {'size': obj['size'], 'new_addr': None, 'refs': obj['refs']}

        self.objects = new_objects
        self.roots = new_roots

        # Swap from-space and to-space
        self.from_space, self.to_space = self.to_space, self.from_space
        self.from_space['next'] = self.to_space['next']
        self.to_space['next'] = 0`,
    testCases: [
      {
        input: `gc = CopyingGC(1000)
obj1 = gc.allocate(10)
gc.add_root(obj1)
before_count = len(gc.objects)
gc.collect()
after_count = len(gc.objects)
print(before_count == after_count)`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Root object survives collection'
      },
      {
        input: `gc = CopyingGC(1000)
obj1 = gc.allocate(10)
obj2 = gc.allocate(20)
gc.add_root(obj1)
gc.collect()
print(len(gc.objects))`,
        expectedOutput: '1',
        isHidden: false,
        description: 'Unreachable object not copied'
      },
      {
        input: `gc = CopyingGC(1000)
obj1 = gc.allocate(10, [])
obj2 = gc.allocate(20, [])
gc.objects[obj1]['refs'] = [obj2]
gc.add_root(obj1)
gc.collect()
print(len(gc.objects))`,
        isHidden: true,
        description: 'Referenced object is copied'
      }
    ],
    hints: [
      'Divide heap into two semispaces: from-space and to-space',
      'Copy live objects from from-space to to-space',
      'Update all references to point to new addresses',
      'Swap spaces after collection is complete'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex05',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Generational Garbage Collector',
    difficulty: 4,
    description: 'Implement a simple generational garbage collector with young and old generations.',
    starterCode: `class GenerationalGC:
    def __init__(self):
        self.young = {}  # Young generation objects
        self.old = {}  # Old generation objects
        self.roots = set()
        self.next_addr = 0
        self.survivor_threshold = 2  # Promote after 2 collections

    def allocate(self, size):
        """Allocate in young generation."""
        addr = self.next_addr
        self.next_addr += size
        self.young[addr] = {'size': size, 'age': 0, 'marked': False}
        return addr

    def minor_collection(self):
        """Collect young generation only."""
        # TODO: Collect young generation, promote survivors
        pass

    def major_collection(self):
        """Collect both generations."""
        # TODO: Full collection
        pass`,
    solution: `class GenerationalGC:
    def __init__(self):
        self.young = {}  # Young generation objects
        self.old = {}  # Old generation objects
        self.roots = set()
        self.next_addr = 0
        self.survivor_threshold = 2  # Promote after 2 collections

    def allocate(self, size):
        """Allocate in young generation."""
        addr = self.next_addr
        self.next_addr += size
        self.young[addr] = {'size': size, 'age': 0, 'marked': False}
        return addr

    def add_root(self, address):
        """Add a root reference."""
        self.roots.add(address)

    def mark_from_roots(self, generation):
        """Mark objects in a generation reachable from roots."""
        for addr in self.roots:
            if addr in generation:
                generation[addr]['marked'] = True

    def minor_collection(self):
        """Collect young generation only."""
        # Mark young objects reachable from roots
        self.mark_from_roots(self.young)

        # Also mark young objects referenced from old generation
        for old_obj in self.old.values():
            # In a real implementation, would track old->young references
            pass

        # Collect unmarked young objects
        to_delete = []
        to_promote = []

        for addr, obj in self.young.items():
            if obj['marked']:
                # Survivor - increment age
                obj['age'] += 1
                obj['marked'] = False

                # Check if should be promoted
                if obj['age'] >= self.survivor_threshold:
                    to_promote.append(addr)
            else:
                # Not marked - collect it
                to_delete.append(addr)

        # Delete dead objects
        for addr in to_delete:
            del self.young[addr]

        # Promote old survivors to old generation
        for addr in to_promote:
            self.old[addr] = self.young[addr]
            del self.young[addr]

    def major_collection(self):
        """Collect both generations."""
        # Mark all reachable objects
        self.mark_from_roots(self.young)
        self.mark_from_roots(self.old)

        # Sweep young generation
        to_delete_young = [addr for addr, obj in self.young.items() if not obj['marked']]
        for addr in to_delete_young:
            del self.young[addr]

        # Sweep old generation
        to_delete_old = [addr for addr, obj in self.old.items() if not obj['marked']]
        for addr in to_delete_old:
            del self.old[addr]

        # Clear marks
        for obj in self.young.values():
            obj['marked'] = False
        for obj in self.old.values():
            obj['marked'] = False`,
    testCases: [
      {
        input: `gc = GenerationalGC()
obj = gc.allocate(10)
gc.add_root(obj)
gc.minor_collection()
print(obj in gc.young)`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Young survivor stays in young generation initially'
      },
      {
        input: `gc = GenerationalGC()
obj = gc.allocate(10)
gc.add_root(obj)
gc.minor_collection()
gc.minor_collection()
print(obj in gc.old)`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Object promoted after threshold'
      },
      {
        input: `gc = GenerationalGC()
obj1 = gc.allocate(10)
obj2 = gc.allocate(20)
gc.add_root(obj1)
gc.minor_collection()
print(obj2 in gc.young)`,
        isHidden: true,
        description: 'Unreachable object collected'
      }
    ],
    hints: [
      'Allocate new objects in the young generation',
      'Minor collection only collects the young generation',
      'Promote objects that survive multiple collections to old generation',
      'Major collection collects both generations'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex06',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Stack Frame Manager',
    difficulty: 2,
    description: 'Implement a stack frame manager for function calls that manages activation records.',
    starterCode: `class StackFrameManager:
    def __init__(self, stack_size=1000):
        self.stack = [None] * stack_size
        self.sp = 0  # Stack pointer
        self.fp = 0  # Frame pointer

    def push_frame(self, num_locals, return_address):
        """
        Create a new stack frame.
        Returns the new frame pointer.
        """
        # TODO: Save old FP, create new frame
        pass

    def pop_frame(self):
        """
        Remove the current stack frame.
        Returns the return address.
        """
        # TODO: Restore old FP and SP
        pass

    def set_local(self, offset, value):
        """Set a local variable in current frame."""
        # TODO: Store at FP + offset
        pass

    def get_local(self, offset):
        """Get a local variable from current frame."""
        # TODO: Load from FP + offset
        pass`,
    solution: `class StackFrameManager:
    def __init__(self, stack_size=1000):
        self.stack = [None] * stack_size
        self.sp = 0  # Stack pointer
        self.fp = 0  # Frame pointer
        self.frames = []  # Track frame information

    def push_frame(self, num_locals, return_address):
        """
        Create a new stack frame.
        Frame layout: [old_fp, return_addr, local0, local1, ...]
        Returns the new frame pointer.
        """
        # Save current frame info
        self.frames.append({'fp': self.fp, 'sp': self.sp})

        # Push old frame pointer
        self.stack[self.sp] = self.fp
        self.sp += 1

        # Push return address
        self.stack[self.sp] = return_address
        self.sp += 1

        # Set new frame pointer
        self.fp = self.sp

        # Allocate space for locals
        self.sp += num_locals

        return self.fp

    def pop_frame(self):
        """
        Remove the current stack frame.
        Returns the return address.
        """
        # Reset SP to FP
        self.sp = self.fp

        # Get return address (just below FP)
        return_address = self.stack[self.fp - 1]

        # Restore old FP
        self.fp = self.stack[self.fp - 2]

        # Pop saved FP and return address
        self.sp -= 2

        # Restore previous frame info
        if self.frames:
            self.frames.pop()

        return return_address

    def set_local(self, offset, value):
        """Set a local variable in current frame."""
        self.stack[self.fp + offset] = value

    def get_local(self, offset):
        """Get a local variable from current frame."""
        return self.stack[self.fp + offset]`,
    testCases: [
      {
        input: `sm = StackFrameManager()
fp = sm.push_frame(3, 'return_here')
sm.set_local(0, 42)
print(sm.get_local(0))`,
        expectedOutput: '42',
        isHidden: false,
        description: 'Set and get local variable'
      },
      {
        input: `sm = StackFrameManager()
fp1 = sm.push_frame(2, 'ret1')
fp2 = sm.push_frame(3, 'ret2')
ret = sm.pop_frame()
print(ret)`,
        expectedOutput: 'ret2',
        isHidden: false,
        description: 'Return address from pop'
      },
      {
        input: `sm = StackFrameManager()
fp1 = sm.push_frame(2, 'ret1')
sm.set_local(0, 100)
fp2 = sm.push_frame(1, 'ret2')
sm.pop_frame()
print(sm.get_local(0))`,
        isHidden: true,
        description: 'Locals preserved across nested calls'
      }
    ],
    hints: [
      'Each frame contains: saved frame pointer, return address, and local variables',
      'Frame pointer points to the base of the current frame',
      'Stack pointer points to the top of the stack',
      'When pushing a frame, save the old FP and set FP to current SP'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex07',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Exception Handler',
    difficulty: 3,
    description: 'Implement exception handling runtime support with try-catch blocks and exception propagation.',
    starterCode: `class ExceptionHandler:
    def __init__(self):
        self.handler_stack = []  # Stack of exception handlers
        self.current_exception = None

    def enter_try(self, handler_address):
        """Enter a try block - register exception handler."""
        # TODO: Push handler onto stack
        pass

    def exit_try(self):
        """Exit a try block - remove handler."""
        # TODO: Pop handler from stack
        pass

    def throw(self, exception):
        """Throw an exception."""
        # TODO: Find and invoke appropriate handler
        pass`,
    solution: `class ExceptionHandler:
    def __init__(self):
        self.handler_stack = []  # Stack of exception handlers
        self.current_exception = None

    def enter_try(self, handler_address, exception_type=None):
        """Enter a try block - register exception handler."""
        self.handler_stack.append({
            'handler': handler_address,
            'exception_type': exception_type
        })

    def exit_try(self):
        """Exit a try block - remove handler."""
        if self.handler_stack:
            self.handler_stack.pop()

    def throw(self, exception):
        """
        Throw an exception.
        Returns the handler address to jump to, or None if unhandled.
        """
        self.current_exception = exception

        # Search for matching handler (most recent first)
        while self.handler_stack:
            handler_info = self.handler_stack.pop()

            # Check if handler matches exception type
            exception_type = handler_info['exception_type']

            if exception_type is None or exception_type == exception.get('type'):
                # Found matching handler
                return handler_info['handler']

        # No handler found
        return None

    def get_exception(self):
        """Get the current exception."""
        return self.current_exception`,
    testCases: [
      {
        input: `eh = ExceptionHandler()
eh.enter_try('handler1')
handler = eh.throw({'type': 'ValueError', 'msg': 'bad value'})
print(handler)`,
        expectedOutput: 'handler1',
        isHidden: false,
        description: 'Find exception handler'
      },
      {
        input: `eh = ExceptionHandler()
eh.enter_try('handler1', 'TypeError')
eh.enter_try('handler2', 'ValueError')
handler = eh.throw({'type': 'ValueError', 'msg': 'bad value'})
print(handler)`,
        expectedOutput: 'handler2',
        isHidden: false,
        description: 'Match most recent handler'
      },
      {
        input: `eh = ExceptionHandler()
handler = eh.throw({'type': 'Error', 'msg': 'oops'})
print(handler is None)`,
        isHidden: true,
        description: 'Unhandled exception returns None'
      }
    ],
    hints: [
      'Maintain a stack of active exception handlers',
      'When entering a try block, push the handler address',
      'When throwing, search the handler stack from most recent to oldest',
      'Pop handlers until a matching one is found or stack is empty'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex08',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Symbol Linker',
    difficulty: 3,
    description: 'Implement a simple linker that resolves symbols across object files and produces an executable.',
    starterCode: `class Linker:
    def __init__(self):
        self.symbol_table = {}  # symbol_name -> address
        self.relocations = []  # (location, symbol_name)
        self.code = []  # Final executable code

    def add_object_file(self, symbols, code, relocs):
        """
        Add an object file.
        symbols: dict of symbol_name -> offset in code
        code: list of instructions/data
        relocs: list of (offset, symbol_name) needing relocation
        """
        # TODO: Merge symbols and track relocations
        pass

    def link(self):
        """Resolve all relocations and produce executable."""
        # TODO: Resolve symbols and patch addresses
        pass`,
    solution: `class Linker:
    def __init__(self):
        self.symbol_table = {}  # symbol_name -> address
        self.relocations = []  # (location, symbol_name)
        self.code = []  # Final executable code
        self.next_address = 0

    def add_object_file(self, symbols, code, relocs):
        """
        Add an object file.
        symbols: dict of symbol_name -> offset in code
        code: list of instructions/data
        relocs: list of (offset, symbol_name) needing relocation
        """
        base_address = self.next_address

        # Add code to executable
        self.code.extend(code)

        # Add symbols with relocated addresses
        for symbol, offset in symbols.items():
            absolute_address = base_address + offset

            if symbol in self.symbol_table:
                raise ValueError(f"Duplicate symbol: {symbol}")

            self.symbol_table[symbol] = absolute_address

        # Add relocations with relocated positions
        for offset, symbol in relocs:
            absolute_location = base_address + offset
            self.relocations.append((absolute_location, symbol))

        # Update next available address
        self.next_address += len(code)

    def link(self):
        """Resolve all relocations and produce executable."""
        # Resolve all relocations
        for location, symbol in self.relocations:
            if symbol not in self.symbol_table:
                raise ValueError(f"Undefined symbol: {symbol}")

            # Get symbol address
            symbol_address = self.symbol_table[symbol]

            # Patch the code at location
            # Assuming instruction format allows direct address patching
            if location < len(self.code):
                # Replace placeholder with actual address
                instr = self.code[location]
                if isinstance(instr, str):
                    # Replace symbol reference with address
                    self.code[location] = instr.replace("$" + symbol, str(symbol_address))

        return self.code`,
    testCases: [
      {
        input: `linker = Linker()
linker.add_object_file({'main': 0}, ['CALL $func', 'RET'], [(0, 'func')])
linker.add_object_file({'func': 0}, ['PUSH', 'POP', 'RET'], [])
linker.link()
print(linker.symbol_table['func'])`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Symbol in second object file'
      },
      {
        input: `linker = Linker()
linker.add_object_file({'foo': 0, 'bar': 1}, ['NOP', 'NOP'], [])
print(len(linker.symbol_table))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Multiple symbols in one file'
      },
      {
        input: `linker = Linker()
linker.add_object_file({'start': 0}, ['CALL $helper'], [(0, 'helper')])
linker.add_object_file({'helper': 1}, ['NOP', 'RET'], [])
code = linker.link()
print('2' in code[0])`,
        isHidden: true,
        description: 'Relocation resolved correctly'
      }
    ],
    hints: [
      'Combine code from all object files sequentially',
      'Track base address for each object file',
      'Adjust symbol addresses by adding base address',
      'Patch relocations by replacing symbol references with actual addresses'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex09',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Dynamic Loader',
    difficulty: 3,
    description: 'Implement a dynamic loader that loads shared libraries at runtime and resolves symbols.',
    starterCode: `class DynamicLoader:
    def __init__(self):
        self.loaded_libs = {}  # lib_name -> {'base': addr, 'symbols': {...}}
        self.next_address = 1000

    def load_library(self, lib_name, symbols, size):
        """
        Load a shared library.
        symbols: dict of symbol_name -> offset
        size: library size in bytes
        """
        # TODO: Allocate memory and record symbols
        pass

    def resolve_symbol(self, symbol_name):
        """Look up a symbol in loaded libraries. Returns address."""
        # TODO: Search all loaded libraries
        pass`,
    solution: `class DynamicLoader:
    def __init__(self):
        self.loaded_libs = {}  # lib_name -> {'base': addr, 'symbols': {...}}
        self.next_address = 1000

    def load_library(self, lib_name, symbols, size):
        """
        Load a shared library.
        symbols: dict of symbol_name -> offset
        size: library size in bytes
        Returns: base address where library was loaded
        """
        if lib_name in self.loaded_libs:
            # Already loaded - return existing base
            return self.loaded_libs[lib_name]['base']

        # Allocate memory for library
        base_address = self.next_address
        self.next_address += size

        # Record library information
        self.loaded_libs[lib_name] = {
            'base': base_address,
            'symbols': symbols,
            'size': size
        }

        return base_address

    def resolve_symbol(self, symbol_name):
        """Look up a symbol in loaded libraries. Returns address."""
        # Search all loaded libraries
        for lib_name, lib_info in self.loaded_libs.items():
            symbols = lib_info['symbols']

            if symbol_name in symbols:
                # Found symbol - compute absolute address
                offset = symbols[symbol_name]
                base = lib_info['base']
                return base + offset

        # Symbol not found
        return None

    def unload_library(self, lib_name):
        """Unload a library."""
        if lib_name in self.loaded_libs:
            del self.loaded_libs[lib_name]
            return True
        return False`,
    testCases: [
      {
        input: `loader = DynamicLoader()
base = loader.load_library('libc', {'printf': 10, 'malloc': 50}, 200)
addr = loader.resolve_symbol('printf')
print(addr)`,
        expectedOutput: '1010',
        isHidden: false,
        description: 'Resolve symbol to absolute address'
      },
      {
        input: `loader = DynamicLoader()
loader.load_library('lib1', {'foo': 0}, 100)
loader.load_library('lib2', {'bar': 20}, 100)
addr = loader.resolve_symbol('bar')
print(addr)`,
        expectedOutput: '1120',
        isHidden: false,
        description: 'Symbol in second library'
      },
      {
        input: `loader = DynamicLoader()
loader.load_library('mylib', {'func': 5}, 50)
addr = loader.resolve_symbol('unknown')
print(addr is None)`,
        isHidden: true,
        description: 'Unknown symbol returns None'
      }
    ],
    hints: [
      'Assign each library a base address in memory',
      'Store library symbols with their offsets from the base',
      'To resolve a symbol, search all loaded libraries',
      'Compute absolute address as base + offset'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex10',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Virtual Method Table',
    difficulty: 3,
    description: 'Implement virtual method tables (vtables) for dynamic dispatch in object-oriented languages.',
    starterCode: `class VTableManager:
    def __init__(self):
        self.vtables = {}  # class_name -> [method_addresses]
        self.objects = {}  # object_id -> class_name

    def create_vtable(self, class_name, methods):
        """
        Create a vtable for a class.
        methods: list of (method_name, address) tuples in order
        """
        # TODO: Store vtable
        pass

    def create_object(self, object_id, class_name):
        """Create an object instance of a class."""
        # TODO: Associate object with its vtable
        pass

    def call_method(self, object_id, method_index):
        """
        Perform virtual method call.
        Returns the method address to call.
        """
        # TODO: Look up method in object's vtable
        pass`,
    solution: `class VTableManager:
    def __init__(self):
        self.vtables = {}  # class_name -> {'methods': [...], 'parent': class_name}
        self.objects = {}  # object_id -> class_name

    def create_vtable(self, class_name, methods, parent=None):
        """
        Create a vtable for a class.
        methods: list of (method_name, address) tuples in order
        parent: parent class name for inheritance
        """
        vtable = []

        # If there's a parent, start with parent's methods
        if parent and parent in self.vtables:
            vtable = self.vtables[parent]['methods'].copy()

        # Override or add methods
        method_dict = {name: addr for name, addr in methods}

        # Update vtable with new/overridden methods
        for i, (name, addr) in enumerate(vtable):
            if name in method_dict:
                # Override parent method
                vtable[i] = (name, method_dict[name])
                del method_dict[name]

        # Add new methods
        for name, addr in methods:
            if name in method_dict:
                vtable.append((name, addr))

        self.vtables[class_name] = {
            'methods': vtable,
            'parent': parent
        }

    def create_object(self, object_id, class_name):
        """Create an object instance of a class."""
        if class_name not in self.vtables:
            raise ValueError(f"Unknown class: {class_name}")

        self.objects[object_id] = class_name

    def call_method(self, object_id, method_index):
        """
        Perform virtual method call.
        Returns the method address to call.
        """
        if object_id not in self.objects:
            raise ValueError(f"Unknown object: {object_id}")

        class_name = self.objects[object_id]
        vtable = self.vtables[class_name]['methods']

        if method_index >= len(vtable):
            raise ValueError(f"Method index out of bounds: {method_index}")

        method_name, method_address = vtable[method_index]
        return method_address`,
    testCases: [
      {
        input: `vtm = VTableManager()
vtm.create_vtable('Animal', [('speak', 100), ('move', 200)])
vtm.create_object('obj1', 'Animal')
addr = vtm.call_method('obj1', 0)
print(addr)`,
        expectedOutput: '100',
        isHidden: false,
        description: 'Call first method'
      },
      {
        input: `vtm = VTableManager()
vtm.create_vtable('Base', [('foo', 100)])
vtm.create_vtable('Derived', [('foo', 300)], parent='Base')
vtm.create_object('obj', 'Derived')
addr = vtm.call_method('obj', 0)
print(addr)`,
        expectedOutput: '300',
        isHidden: false,
        description: 'Overridden method in derived class'
      },
      {
        input: `vtm = VTableManager()
vtm.create_vtable('Class1', [('method1', 100), ('method2', 200)])
vtm.create_object('obj', 'Class1')
addr = vtm.call_method('obj', 1)
print(addr)`,
        isHidden: true,
        description: 'Call second method'
      }
    ],
    hints: [
      'Store a vtable (array of method addresses) for each class',
      'Each object has a pointer to its class\'s vtable',
      'Method calls use the method index to look up the address in the vtable',
      'For inheritance, derived class vtables can override parent methods'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex11',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Garbage Collection Write Barrier',
    difficulty: 4,
    description: 'Implement a write barrier for incremental garbage collection that tracks pointer updates.',
    starterCode: `class WriteBarrierGC:
    def __init__(self):
        self.objects = {}  # address -> {'refs': [...], 'color': 'white/gray/black'}
        self.gray_set = set()  # Objects to scan

    def allocate(self, address, refs=None):
        """Allocate an object."""
        self.objects[address] = {'refs': refs or [], 'color': 'white'}

    def write_barrier(self, obj_addr, field, new_ref):
        """
        Write barrier for pointer update.
        obj_addr: object being modified
        field: field index
        new_ref: new reference value
        """
        # TODO: Update reference and maintain GC invariants
        pass

    def mark_step(self):
        """Perform one step of incremental marking."""
        # TODO: Mark one gray object
        pass`,
    solution: `class WriteBarrierGC:
    def __init__(self):
        self.objects = {}  # address -> {'refs': [...], 'color': 'white/gray/black'}
        self.gray_set = set()  # Objects to scan
        self.roots = set()

    def allocate(self, address, refs=None):
        """Allocate an object."""
        self.objects[address] = {'refs': refs or [], 'color': 'white'}

    def add_root(self, address):
        """Add a root reference."""
        self.roots.add(address)
        if address in self.objects:
            self.objects[address]['color'] = 'gray'
            self.gray_set.add(address)

    def write_barrier(self, obj_addr, field, new_ref):
        """
        Write barrier for pointer update.
        Maintains tri-color invariant: no black object points to white object.
        """
        if obj_addr not in self.objects:
            return

        obj = self.objects[obj_addr]

        # Update the reference
        while len(obj['refs']) <= field:
            obj['refs'].append(None)
        obj['refs'][field] = new_ref

        # Apply write barrier
        # If object is black and new reference is white, shade the reference gray
        if obj['color'] == 'black' and new_ref in self.objects:
            target = self.objects[new_ref]
            if target['color'] == 'white':
                target['color'] = 'gray'
                self.gray_set.add(new_ref)

    def mark_step(self):
        """Perform one step of incremental marking."""
        if not self.gray_set:
            return False  # Marking complete

        # Pick a gray object
        obj_addr = self.gray_set.pop()
        obj = self.objects[obj_addr]

        # Mark it black
        obj['color'] = 'black'

        # Shade all white children gray
        for ref in obj['refs']:
            if ref in self.objects:
                target = self.objects[ref]
                if target['color'] == 'white':
                    target['color'] = 'gray'
                    self.gray_set.add(ref)

        return True  # More work to do

    def start_collection(self):
        """Start a new GC cycle."""
        # Reset colors
        for obj in self.objects.values():
            obj['color'] = 'white'

        self.gray_set.clear()

        # Mark roots gray
        for root in self.roots:
            if root in self.objects:
                self.objects[root]['color'] = 'gray'
                self.gray_set.add(root)`,
    testCases: [
      {
        input: `gc = WriteBarrierGC()
gc.allocate(100, [])
gc.allocate(200, [])
gc.add_root(100)
gc.objects[100]['color'] = 'black'
gc.write_barrier(100, 0, 200)
print(gc.objects[200]['color'])`,
        expectedOutput: 'gray',
        isHidden: false,
        description: 'Write barrier shades white object gray'
      },
      {
        input: `gc = WriteBarrierGC()
gc.allocate(100, [])
gc.add_root(100)
gc.mark_step()
print(gc.objects[100]['color'])`,
        expectedOutput: 'black',
        isHidden: false,
        description: 'Mark step colors gray object black'
      },
      {
        input: `gc = WriteBarrierGC()
gc.allocate(100, [200])
gc.allocate(200, [])
gc.add_root(100)
gc.mark_step()
print(200 in gc.gray_set)`,
        isHidden: true,
        description: 'Referenced white objects become gray'
      }
    ],
    hints: [
      'Use tri-color marking: white (unvisited), gray (to scan), black (scanned)',
      'Write barrier maintains invariant: no black->white pointers',
      'When a black object gets a white reference, shade the reference gray',
      'Incremental marking processes gray objects one at a time'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex12',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Memory Defragmentation',
    difficulty: 3,
    description: 'Implement memory defragmentation (compaction) to eliminate fragmentation in a heap.',
    starterCode: `class MemoryCompactor:
    def __init__(self, heap_size):
        self.heap_size = heap_size
        self.allocations = {}  # start_addr -> {'size': N, 'id': obj_id}
        self.object_refs = {}  # obj_id -> start_addr

    def compact(self):
        """
        Compact memory by moving allocations to eliminate gaps.
        Returns: dict mapping old_address -> new_address
        """
        # TODO: Move allocations to eliminate fragmentation
        pass`,
    solution: `class MemoryCompactor:
    def __init__(self, heap_size):
        self.heap_size = heap_size
        self.allocations = {}  # start_addr -> {'size': N, 'id': obj_id}
        self.object_refs = {}  # obj_id -> start_addr

    def allocate(self, obj_id, size):
        """Allocate memory for an object."""
        # Find free space (simplified: linear search)
        occupied = set()
        for addr, alloc in self.allocations.items():
            for i in range(addr, addr + alloc['size']):
                occupied.add(i)

        # Find first fit
        for start in range(self.heap_size - size + 1):
            if all(i not in occupied for i in range(start, start + size)):
                self.allocations[start] = {'size': size, 'id': obj_id}
                self.object_refs[obj_id] = start
                return start

        return None

    def free(self, obj_id):
        """Free an object's memory."""
        if obj_id in self.object_refs:
            addr = self.object_refs[obj_id]
            del self.allocations[addr]
            del self.object_refs[obj_id]

    def compact(self):
        """
        Compact memory by moving allocations to eliminate gaps.
        Returns: dict mapping old_address -> new_address
        """
        # Sort allocations by address
        sorted_allocs = sorted(self.allocations.items(), key=lambda x: x[0])

        relocation_map = {}
        new_allocations = {}
        new_object_refs = {}

        next_addr = 0

        for old_addr, alloc in sorted_allocs:
            obj_id = alloc['id']
            size = alloc['size']

            # Move to next available address
            new_addr = next_addr
            relocation_map[old_addr] = new_addr

            # Update allocations
            new_allocations[new_addr] = {'size': size, 'id': obj_id}
            new_object_refs[obj_id] = new_addr

            next_addr += size

        # Update internal state
        self.allocations = new_allocations
        self.object_refs = new_object_refs

        return relocation_map

    def fragmentation(self):
        """Calculate fragmentation: (largest_gap / total_free) if free > 0, else 0."""
        if not self.allocations:
            return 0.0

        # Find all gaps
        occupied = []
        for addr, alloc in self.allocations.items():
            occupied.append((addr, addr + alloc['size']))

        occupied.sort()

        gaps = []
        last_end = 0

        for start, end in occupied:
            if start > last_end:
                gaps.append(start - last_end)
            last_end = end

        # Gap at end
        if last_end < self.heap_size:
            gaps.append(self.heap_size - last_end)

        if not gaps:
            return 0.0

        total_free = sum(gaps)
        largest_gap = max(gaps)

        return largest_gap / total_free if total_free > 0 else 0.0`,
    testCases: [
      {
        input: `mc = MemoryCompactor(1000)
mc.allocate('obj1', 100)
mc.allocate('obj2', 200)
mc.free('obj1')
mc.allocate('obj3', 50)
reloc = mc.compact()
print(mc.object_refs['obj3'])`,
        expectedOutput: '200',
        isHidden: false,
        description: 'Objects compacted to eliminate gaps'
      },
      {
        input: `mc = MemoryCompactor(1000)
mc.allocate('a', 100)
mc.allocate('b', 100)
reloc = mc.compact()
print(len(reloc))`,
        expectedOutput: '2',
        isHidden: false,
        description: 'Relocation map for all objects'
      },
      {
        input: `mc = MemoryCompactor(1000)
mc.allocate('x', 100)
mc.allocate('y', 100)
mc.free('x')
mc.allocate('z', 50)
before_frag = mc.fragmentation()
mc.compact()
after_frag = mc.fragmentation()
print(after_frag < before_frag)`,
        isHidden: true,
        description: 'Compaction reduces fragmentation'
      }
    ],
    hints: [
      'Sort allocations by address',
      'Move each allocation to the next available address sequentially',
      'Maintain a mapping of old addresses to new addresses',
      'After compaction, all allocations should be contiguous'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex13',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'JIT Code Cache',
    difficulty: 3,
    description: 'Implement a code cache for a JIT compiler that manages compiled code and handles cache eviction.',
    starterCode: `class JITCodeCache:
    def __init__(self, max_size):
        self.max_size = max_size
        self.cache = {}  # bytecode_id -> {'code': ..., 'size': N, 'hits': M}
        self.current_size = 0

    def compile_and_cache(self, bytecode_id, compiled_code, code_size):
        """
        Add compiled code to cache.
        If cache is full, evict least-used entries.
        """
        # TODO: Implement caching with LRU eviction
        pass

    def lookup(self, bytecode_id):
        """Look up compiled code. Returns code or None."""
        # TODO: Return cached code and update stats
        pass`,
    solution: `class JITCodeCache:
    def __init__(self, max_size):
        self.max_size = max_size
        self.cache = {}  # bytecode_id -> {'code': ..., 'size': N, 'hits': M, 'last_used': T}
        self.current_size = 0
        self.time = 0

    def compile_and_cache(self, bytecode_id, compiled_code, code_size):
        """
        Add compiled code to cache.
        If cache is full, evict least-used entries.
        """
        # Check if already cached
        if bytecode_id in self.cache:
            return

        # Make room if necessary
        while self.current_size + code_size > self.max_size and self.cache:
            self.evict_lru()

        # Add to cache
        if self.current_size + code_size <= self.max_size:
            self.cache[bytecode_id] = {
                'code': compiled_code,
                'size': code_size,
                'hits': 0,
                'last_used': self.time
            }
            self.current_size += code_size
            self.time += 1

    def lookup(self, bytecode_id):
        """Look up compiled code. Returns code or None."""
        if bytecode_id in self.cache:
            entry = self.cache[bytecode_id]
            entry['hits'] += 1
            entry['last_used'] = self.time
            self.time += 1
            return entry['code']

        return None

    def evict_lru(self):
        """Evict least recently used entry."""
        if not self.cache:
            return

        # Find LRU entry
        lru_id = None
        lru_time = float('inf')

        for bytecode_id, entry in self.cache.items():
            if entry['last_used'] < lru_time:
                lru_time = entry['last_used']
                lru_id = bytecode_id

        # Evict it
        if lru_id:
            entry = self.cache[lru_id]
            self.current_size -= entry['size']
            del self.cache[lru_id]`,
    testCases: [
      {
        input: `cache = JITCodeCache(max_size=100)
cache.compile_and_cache('func1', 'compiled_code_1', 50)
code = cache.lookup('func1')
print(code)`,
        expectedOutput: 'compiled_code_1',
        isHidden: false,
        description: 'Lookup cached code'
      },
      {
        input: `cache = JITCodeCache(max_size=100)
cache.compile_and_cache('func1', 'code1', 60)
cache.compile_and_cache('func2', 'code2', 60)
print('func1' in cache.cache)`,
        expectedOutput: 'False',
        isHidden: false,
        description: 'LRU eviction when cache is full'
      },
      {
        input: `cache = JITCodeCache(max_size=100)
cache.compile_and_cache('a', 'code_a', 40)
cache.compile_and_cache('b', 'code_b', 40)
cache.lookup('a')
cache.compile_and_cache('c', 'code_c', 40)
print('b' in cache.cache)`,
        isHidden: true,
        description: 'Recent lookup prevents eviction'
      }
    ],
    hints: [
      'Track the size of cached code to enforce size limit',
      'Use LRU (Least Recently Used) eviction policy',
      'Update last-used time on each lookup',
      'When adding code, evict entries until there is enough space'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex14',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Position-Independent Code Generator',
    difficulty: 4,
    description: 'Generate position-independent code (PIC) that can be loaded at any memory address.',
    starterCode: `class PICGenerator:
    def __init__(self):
        self.got = {}  # Global Offset Table: symbol -> GOT offset
        self.got_size = 0

    def add_global_symbol(self, symbol):
        """Add a global symbol to GOT."""
        # TODO: Add symbol to GOT if not present
        pass

    def generate_call(self, function_name):
        """
        Generate PIC code to call a function.
        Uses GOT for indirection.
        """
        # TODO: Generate code using GOT
        pass`,
    solution: `class PICGenerator:
    def __init__(self):
        self.got = {}  # Global Offset Table: symbol -> GOT offset
        self.got_size = 0
        self.instructions = []

    def add_global_symbol(self, symbol):
        """Add a global symbol to GOT."""
        if symbol not in self.got:
            self.got[symbol] = self.got_size
            self.got_size += 4  # Assume 4-byte pointers

    def generate_call(self, function_name):
        """
        Generate PIC code to call a function.
        Uses GOT for indirection.
        """
        # Ensure function is in GOT
        self.add_global_symbol(function_name)

        got_offset = self.got[function_name]

        # Generate PIC code:
        # 1. Get PC (program counter)
        # 2. Calculate GOT address relative to PC
        # 3. Load function address from GOT
        # 4. Call the function

        self.instructions.extend([
            f"# Call {function_name} via GOT",
            f"CALL get_pc",  # Get PC into a register
            f"ADD r_pc, GOT_BASE",  # Calculate GOT base
            f"LOAD r_func, [r_pc + {got_offset}]",  # Load function address
            f"CALL r_func"  # Indirect call
        ])

        return self.instructions

    def generate_global_access(self, var_name):
        """Generate PIC code to access a global variable."""
        self.add_global_symbol(var_name)

        got_offset = self.got[var_name]

        self.instructions.extend([
            f"# Access global {var_name} via GOT",
            f"CALL get_pc",
            f"ADD r_pc, GOT_BASE",
            f"LOAD r_addr, [r_pc + {got_offset}]",  # Load variable address
            f"LOAD r_val, [r_addr]"  # Load variable value
        ])

        return self.instructions`,
    testCases: [
      {
        input: `pic = PICGenerator()
pic.generate_call('printf')
print('GOT' in pic.instructions[2])`,
        expectedOutput: 'True',
        isHidden: false,
        description: 'Generated code uses GOT'
      },
      {
        input: `pic = PICGenerator()
pic.add_global_symbol('foo')
pic.add_global_symbol('bar')
print(pic.got_size)`,
        expectedOutput: '8',
        isHidden: false,
        description: 'GOT size for 2 symbols'
      },
      {
        input: `pic = PICGenerator()
pic.generate_call('func1')
pic.generate_call('func1')
print(len(pic.got))`,
        isHidden: true,
        description: 'Same symbol not duplicated in GOT'
      }
    ],
    hints: [
      'Use a Global Offset Table (GOT) to store addresses of global symbols',
      'Generate code that calculates addresses relative to PC (program counter)',
      'Load addresses from GOT using PC-relative addressing',
      'All global accesses go through the GOT for position independence'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex15',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Thread-Local Storage Manager',
    difficulty: 3,
    description: 'Implement thread-local storage (TLS) that provides each thread with its own copy of variables.',
    starterCode: `class TLSManager:
    def __init__(self):
        self.tls_data = {}  # thread_id -> {var_name: value}
        self.current_thread = None

    def set_current_thread(self, thread_id):
        """Switch to a different thread context."""
        # TODO: Set current thread
        pass

    def set_tls_var(self, var_name, value):
        """Set a thread-local variable for current thread."""
        # TODO: Store in current thread's TLS
        pass

    def get_tls_var(self, var_name):
        """Get a thread-local variable for current thread."""
        # TODO: Retrieve from current thread's TLS
        pass`,
    solution: `class TLSManager:
    def __init__(self):
        self.tls_data = {}  # thread_id -> {var_name: value}
        self.current_thread = None

    def set_current_thread(self, thread_id):
        """Switch to a different thread context."""
        self.current_thread = thread_id

        # Initialize TLS for this thread if needed
        if thread_id not in self.tls_data:
            self.tls_data[thread_id] = {}

    def set_tls_var(self, var_name, value):
        """Set a thread-local variable for current thread."""
        if self.current_thread is None:
            raise RuntimeError("No current thread set")

        if self.current_thread not in self.tls_data:
            self.tls_data[self.current_thread] = {}

        self.tls_data[self.current_thread][var_name] = value

    def get_tls_var(self, var_name):
        """Get a thread-local variable for current thread."""
        if self.current_thread is None:
            raise RuntimeError("No current thread set")

        if self.current_thread not in self.tls_data:
            return None

        return self.tls_data[self.current_thread].get(var_name)

    def clear_thread_data(self, thread_id):
        """Clear all TLS data for a thread (when thread exits)."""
        if thread_id in self.tls_data:
            del self.tls_data[thread_id]`,
    testCases: [
      {
        input: `tls = TLSManager()
tls.set_current_thread('thread1')
tls.set_tls_var('x', 100)
print(tls.get_tls_var('x'))`,
        expectedOutput: '100',
        isHidden: false,
        description: 'Set and get TLS variable'
      },
      {
        input: `tls = TLSManager()
tls.set_current_thread('thread1')
tls.set_tls_var('x', 100)
tls.set_current_thread('thread2')
tls.set_tls_var('x', 200)
tls.set_current_thread('thread1')
print(tls.get_tls_var('x'))`,
        expectedOutput: '100',
        isHidden: false,
        description: 'Each thread has its own TLS'
      },
      {
        input: `tls = TLSManager()
tls.set_current_thread('thread1')
tls.set_tls_var('y', 42)
tls.clear_thread_data('thread1')
tls.set_current_thread('thread1')
print(tls.get_tls_var('y') is None)`,
        isHidden: true,
        description: 'Clearing thread data works'
      }
    ],
    hints: [
      'Maintain separate storage for each thread',
      'Track which thread is currently executing',
      'Store thread-local variables in a nested dictionary structure',
      'Each thread accesses only its own TLS data'
    ],
    language: 'python'
  },
  {
    id: 'cs304-t7-ex16',
    subjectId: 'cs304',
    topicId: 'cs304-topic-7',
    title: 'Lazy Symbol Resolution',
    difficulty: 4,
    description: 'Implement lazy symbol resolution where symbols are only resolved when first used, improving startup time.',
    starterCode: `class LazyResolver:
    def __init__(self):
        self.symbol_table = {}  # symbol -> actual_address
        self.plt = {}  # symbol -> PLT stub address
        self.resolved = {}  # symbol -> resolved address

    def register_symbol(self, symbol, address):
        """Register a symbol with its actual address."""
        self.symbol_table[symbol] = address

    def create_plt_stub(self, symbol):
        """
        Create a PLT (Procedure Linkage Table) stub for lazy resolution.
        Returns PLT stub address.
        """
        # TODO: Create stub that will resolve on first call
        pass

    def resolve_symbol(self, symbol):
        """
        Resolve a symbol (called by PLT stub).
        Returns actual address.
        """
        # TODO: Look up symbol and cache resolution
        pass`,
    solution: `class LazyResolver:
    def __init__(self):
        self.symbol_table = {}  # symbol -> actual_address
        self.plt = {}  # symbol -> PLT stub address
        self.resolved = {}  # symbol -> resolved address
        self.next_plt_addr = 10000  # PLT starts at 10000
        self.resolve_count = 0  # Track resolution calls

    def register_symbol(self, symbol, address):
        """Register a symbol with its actual address."""
        self.symbol_table[symbol] = address

    def create_plt_stub(self, symbol):
        """
        Create a PLT (Procedure Linkage Table) stub for lazy resolution.
        Returns PLT stub address.
        """
        if symbol in self.plt:
            return self.plt[symbol]

        # Allocate PLT stub address
        plt_addr = self.next_plt_addr
        self.next_plt_addr += 16  # Each stub is 16 bytes

        self.plt[symbol] = {
            'address': plt_addr,
            'symbol': symbol,
            'resolved': False
        }

        return plt_addr

    def resolve_symbol(self, symbol):
        """
        Resolve a symbol (called by PLT stub).
        Returns actual address.
        """
        self.resolve_count += 1

        # Check if already resolved
        if symbol in self.resolved:
            return self.resolved[symbol]

        # Look up symbol
        if symbol not in self.symbol_table:
            raise ValueError(f"Undefined symbol: {symbol}")

        actual_address = self.symbol_table[symbol]

        # Cache resolution
        self.resolved[symbol] = actual_address

        # Mark PLT stub as resolved
        if symbol in self.plt:
            self.plt[symbol]['resolved'] = True

        return actual_address

    def call_symbol(self, symbol):
        """
        Simulate calling a symbol (goes through PLT).
        Returns actual address to call.
        """
        # Get or create PLT stub
        if symbol not in self.plt:
            self.create_plt_stub(symbol)

        # Check if already resolved
        if symbol in self.resolved:
            return self.resolved[symbol]

        # Not resolved - trigger lazy resolution
        return self.resolve_symbol(symbol)`,
    testCases: [
      {
        input: `resolver = LazyResolver()
resolver.register_symbol('printf', 5000)
plt_addr = resolver.create_plt_stub('printf')
print(plt_addr)`,
        expectedOutput: '10000',
        isHidden: false,
        description: 'PLT stub created at fixed address'
      },
      {
        input: `resolver = LazyResolver()
resolver.register_symbol('malloc', 6000)
addr = resolver.call_symbol('malloc')
print(addr)`,
        expectedOutput: '6000',
        isHidden: false,
        description: 'Lazy resolution returns actual address'
      },
      {
        input: `resolver = LazyResolver()
resolver.register_symbol('foo', 7000)
resolver.call_symbol('foo')
resolver.call_symbol('foo')
print(resolver.resolve_count)`,
        isHidden: true,
        description: 'Symbol resolved only once'
      }
    ],
    hints: [
      'Create PLT stubs that defer symbol resolution until first call',
      'Cache resolved addresses to avoid repeated lookups',
      'Track which symbols have been resolved',
      'First call triggers resolution, subsequent calls use cached address'
    ],
    language: 'python'
  }
];
