# Reference Counting

Reference counting is a memory management technique that tracks how many references point to each object. When the reference count reaches zero, the object is automatically deallocated. This approach provides automatic memory management with deterministic timing, making it an attractive alternative to both manual management and garbage collection.

## Basic Reference Counting

The core idea is simple: each object maintains a counter of how many pointers reference it. When creating a new reference, increment the count. When destroying a reference, decrement the count. When the count reaches zero, free the object.

```c
typedef struct {
    int ref_count;
    // actual object data
    int value;
} RefCountedInt;

RefCountedInt* create_int(int value) {
    RefCountedInt* obj = malloc(sizeof(RefCountedInt));
    obj->ref_count = 1;  // Creator holds one reference
    obj->value = value;
    return obj;
}

void retain(RefCountedInt* obj) {
    if (obj) {
        obj->ref_count++;
    }
}

void release(RefCountedInt* obj) {
    if (obj) {
        obj->ref_count--;
        if (obj->ref_count == 0) {
            free(obj);  // No more references, deallocate
        }
    }
}
```

Usage:
```c
RefCountedInt* x = create_int(42);  // ref_count = 1

RefCountedInt* y = x;  // Share reference
retain(y);              // ref_count = 2

release(x);             // ref_count = 1
// Object still alive because y references it

release(y);             // ref_count = 0, object freed
```

This provides automatic deallocation without garbage collection's unpredictable pauses.

## Smart Pointers and RAII

C++ smart pointers implement reference counting with RAII:

```cpp
#include <memory>

void reference_counting_example() {
    std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
    // ref_count = 1

    {
        std::shared_ptr<int> ptr2 = ptr1;  // ref_count = 2
        std::cout << *ptr2 << std::endl;
    }  // ptr2 destroyed, ref_count = 1

    // ref_count still 1, object alive
}  // ptr1 destroyed, ref_count = 0, object deleted
```

The `shared_ptr` automatically handles `retain` and `release` operations:

```cpp
template<typename T>
class shared_ptr {
private:
    T* ptr;
    size_t* ref_count;

public:
    explicit shared_ptr(T* p) : ptr(p), ref_count(new size_t(1)) {}

    // Copy constructor: share ownership
    shared_ptr(const shared_ptr& other)
        : ptr(other.ptr), ref_count(other.ref_count) {
        if (ptr) {
            (*ref_count)++;
        }
    }

    // Destructor: release ownership
    ~shared_ptr() {
        if (ptr && --(*ref_count) == 0) {
            delete ptr;
            delete ref_count;
        }
    }

    // Assignment operator
    shared_ptr& operator=(const shared_ptr& other) {
        if (this != &other) {
            // Release old object
            if (ptr && --(*ref_count) == 0) {
                delete ptr;
                delete ref_count;
            }

            // Acquire new object
            ptr = other.ptr;
            ref_count = other.ref_count;
            if (ptr) {
                (*ref_count)++;
            }
        }
        return *this;
    }

    T& operator*() { return *ptr; }
    T* operator->() { return ptr; }
};
```

This automatically manages reference counts, preventing leaks and use-after-free errors.

## The Cycle Problem

Reference counting has a fundamental weakness: it cannot reclaim cycles. If objects reference each other in a cycle, their reference counts never reach zero, even if nothing else references them.

```c
typedef struct Node {
    int ref_count;
    int value;
    struct Node* next;
} Node;

Node* a = create_node(1);
Node* b = create_node(2);

// Create cycle
a->next = b;
retain(b);  // b's ref_count = 2

b->next = a;
retain(a);  // a's ref_count = 2

// Release external references
release(a);  // a's ref_count = 1 (still referenced by b)
release(b);  // b's ref_count = 1 (still referenced by a)

// Memory leaked! Both nodes still have ref_count = 1
// but are unreachable from program
```

The cycle keeps both objects alive even though the program can't access them.

**Real-world example**: Parent-child relationships.

```cpp
class Parent {
    std::shared_ptr<Child> child;
};

class Child {
    std::shared_ptr<Parent> parent;  // Cycle!
};

auto p = std::make_shared<Parent>();
auto c = std::make_shared<Child>();
p->child = c;  // p -> c
c->parent = p;  // c -> p (cycle created)

// Even when p and c go out of scope, objects leaked
```

## Weak References

Weak references solve the cycle problem by not increasing the reference count:

```cpp
class Child {
    std::weak_ptr<Parent> parent;  // Doesn't increase ref count!
};
```

A weak reference can be converted to a strong reference when needed:

```cpp
void Child::access_parent() {
    std::shared_ptr<Parent> p = parent.lock();
    if (p) {
        // Parent still alive, use it
        p->do_something();
    } else {
        // Parent was deallocated
        std::cout << "Parent gone" << std::endl;
    }
}
```

Implementation sketch:

```cpp
template<typename T>
class weak_ptr {
private:
    T* ptr;
    size_t* ref_count;
    size_t* weak_count;

public:
    weak_ptr(const shared_ptr<T>& sp)
        : ptr(sp.ptr), ref_count(sp.ref_count), weak_count(sp.weak_count) {
        (*weak_count)++;
    }

    ~weak_ptr() {
        if (--(*weak_count) == 0 && *ref_count == 0) {
            delete ref_count;
            delete weak_count;
        }
    }

    shared_ptr<T> lock() {
        if (*ref_count > 0) {
            return shared_ptr<T>(ptr, ref_count, weak_count);
        }
        return shared_ptr<T>(nullptr);
    }
};
```

Weak references enable complex data structures without cycles:

```cpp
// Tree with parent pointers
class TreeNode {
    std::shared_ptr<TreeNode> left;
    std::shared_ptr<TreeNode> right;
    std::weak_ptr<TreeNode> parent;  // Weak to break cycle
};
```

## Performance Considerations

Reference counting has performance implications:

**Increment/Decrement Overhead**: Every pointer assignment requires updating counters.

```c
// Naive reference counting
obj->ref_count++;  // Increment
obj->ref_count--;  // Decrement
```

For frequently-copied pointers, this overhead adds up. Optimizations include:

**Deferred Reference Counting**: Don't track references from stack/registers.

**Copy-on-Write**: Share read-only data without incrementing counts.

```cpp
class String {
    std::shared_ptr<char[]> data;
public:
    void modify() {
        if (data.use_count() > 1) {
            // Multiple references - copy before modifying
            data = std::shared_ptr<char[]>(copy(data));
        }
        // Now safe to modify
    }
};
```

**Thread Safety**: Reference counts must be atomic in multi-threaded programs.

```cpp
class ThreadSafeRefCounted {
    std::atomic<size_t> ref_count;

public:
    void retain() {
        ref_count.fetch_add(1, std::memory_order_relaxed);
    }

    void release() {
        if (ref_count.fetch_sub(1, std::memory_order_release) == 1) {
            std::atomic_thread_fence(std::memory_order_acquire);
            delete this;
        }
    }
};
```

Atomic operations are slower than simple increments, adding overhead.

## Combining with Tracing Garbage Collection

Some systems combine reference counting with occasional tracing GC to handle cycles:

**Python's Approach**: Uses reference counting for immediate deallocation, plus cycle detector for periodic cleanup.

```python
import sys

class Node:
    def __init__(self):
        self.next = None

# Reference counting handles most deallocations
a = Node()
b = Node()
a.next = b  # b's ref_count increases

del a  # a deallocated immediately

# Cycles require cycle detector
c = Node()
d = Node()
c.next = d
d.next = c  # Cycle created

del c, d  # Not immediately deallocated
# Cycle detector runs periodically to clean up
```

Python's cycle detector:
1. Find all objects with ref_count > 0
2. Subtract internal references (references from other tracked objects)
3. Any object with adjusted count == 0 is in unreachable cycle
4. Deallocate those objects

This provides best of both worlds: immediate deallocation for acyclic data, with fallback for cycles.

## Reference Counting in Practice

Real systems using reference counting:

**Objective-C/Swift**: Manual reference counting evolved to ARC (Automatic Reference Counting).

```objective-c
// Manual retain/release
NSObject* obj = [[NSObject alloc] init];  // ref_count = 1
[obj retain];  // ref_count = 2
[obj release];  // ref_count = 1
[obj release];  // ref_count = 0, deallocated

// ARC does this automatically
NSObject* obj = [[NSObject alloc] init];
// compiler inserts retain/release automatically
```

**Python**: Reference counting with cycle detection.

**Perl**: Reference counting for most objects.

**COM (Component Object Model)**: Manual reference counting with `AddRef`/`Release`.

**Rust's Rc<T>**: Single-threaded reference counting.

```rust
use std::rc::Rc;

let a = Rc::new(5);  // ref_count = 1
let b = Rc::clone(&a);  // ref_count = 2
let c = Rc::clone(&a);  // ref_count = 3

drop(b);  // ref_count = 2
drop(c);  // ref_count = 1
// a dropped, ref_count = 0, deallocated
```

## Advantages and Disadvantages

**Advantages**:
- Deterministic deallocation (predictable timing)
- No stop-the-world pauses
- Simple implementation
- Plays well with RAII/destructors
- Lower memory overhead than GC (no need to traverse heap)

**Disadvantages**:
- Cannot handle cycles without additional mechanism
- Overhead on every pointer operation
- Thread-safety requires expensive atomic operations
- Space overhead for reference count in each object
- Cache effects from touching objects on increment/decrement

Reference counting works well for data structures without cycles and when deterministic deallocation is important. Combined with weak references and occasional cycle collection, it provides a practical automatic memory management solution.
