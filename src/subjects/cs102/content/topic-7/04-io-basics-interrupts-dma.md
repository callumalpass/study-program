---
id: cs102-t7-io-basics-interrupts-dma
title: "I/O Basics: Interrupts and DMA"
order: 4
---

# I/O Basics: Interrupts, Polling, and DMA

Input/Output (I/O) is how computers interact with the outside world—keyboards, displays, networks, disks, and countless other devices. Unlike the CPU, which operates at gigahertz speeds, I/O devices operate orders of magnitude slower and at unpredictable times. The challenge is coordinating fast CPUs with slow, asynchronous devices without wasting processor cycles waiting. Three fundamental techniques address this challenge: polling, interrupts, and DMA.

## The I/O Speed Problem

Consider the speed differences in a modern system:

| Component | Typical Latency | Bandwidth |
|-----------|-----------------|-----------|
| CPU cycle | 0.3 ns | — |
| L1 cache | 1 ns | 500+ GB/s |
| Main memory | 100 ns | 25-50 GB/s |
| SSD | 50,000 ns (50 μs) | 3-7 GB/s |
| Hard disk | 10,000,000 ns (10 ms) | 100-200 MB/s |
| Network (local) | 500,000 ns (0.5 ms) | 1-100 Gbps |
| Keyboard | human-scale | 100 bytes/s |

A single disk read takes as long as millions of CPU cycles. If the CPU simply waited for I/O, it would sit idle most of the time. I/O coordination techniques determine how to keep the CPU productive while managing device communication.

## The Device Interface

Most I/O devices present a standard interface to the CPU through a set of registers:

**Status register**: Indicates device state (ready, busy, error).
**Command register**: The CPU writes commands here (start transfer, seek, etc.).
**Data register(s)**: Where data is read from or written to the device.

These registers may be accessed through:
- **Memory-mapped I/O**: Device registers appear at specific memory addresses. Regular load/store instructions access them.
- **Port-mapped I/O**: Special instructions (IN/OUT on x86) access device ports.

## Polling: The Simple Approach

**Polling** (also called "busy waiting" or "programmed I/O") is the simplest coordination technique. The CPU repeatedly checks the device status until it's ready.

### How Polling Works

```
1. CPU sends command to device
2. CPU reads status register
3. If device is busy, go to step 2 (loop)
4. Device is ready; transfer data
5. Repeat as needed
```

### Polling Example: Sending a Character

```c
void send_char(char c) {
    // Wait until transmitter is ready
    while ((read_status_register() & TRANSMIT_READY) == 0) {
        // Busy wait
    }
    // Send the character
    write_data_register(c);
}
```

The CPU spins in the while loop until the device is ready. For a slow device like a serial port, this could waste thousands of CPU cycles per character.

### Advantages of Polling

- **Simple**: Easy to implement and understand
- **Predictable latency**: Response begins immediately when device becomes ready
- **No context switching**: No overhead of interrupt handling
- **Good for fast devices**: If the device is almost always ready, polling overhead is minimal

### Disadvantages of Polling

- **Wastes CPU cycles**: The CPU does nothing useful while waiting
- **Poor scalability**: Polling multiple slow devices wastes even more time
- **High power consumption**: CPU stays active even when just waiting
- **Unpredictable timing**: Long poll loops can cause missed deadlines

### When to Use Polling

Polling makes sense when:
- The device is very fast (response expected in nanoseconds)
- Latency is critical and interrupt overhead is unacceptable
- The system is simple and has no other work to do
- You're running on a microcontroller with no OS

## Interrupts: Event-Driven I/O

**Interrupts** invert the polling model: instead of the CPU asking the device "are you ready?", the device tells the CPU "I'm ready!" The CPU can do other work until notified.

### How Interrupts Work

```
1. CPU sends command to device
2. CPU continues other work (or enters low-power state)
3. Device completes operation
4. Device asserts interrupt signal
5. CPU suspends current work
6. CPU runs interrupt handler
7. Handler services the device
8. CPU resumes previous work
```

### The Interrupt Mechanism

When an interrupt occurs:

1. **Device signals**: The device asserts an interrupt line connected to the CPU.
2. **CPU acknowledges**: After completing the current instruction, the CPU checks for pending interrupts.
3. **Context save**: The CPU saves the current PC and possibly other registers.
4. **Vector lookup**: The interrupt number indexes into an **Interrupt Vector Table** (IVT) or **Interrupt Descriptor Table** (IDT) to find the handler address.
5. **Handler execution**: The CPU jumps to the interrupt handler (part of the OS or driver).
6. **Device servicing**: The handler reads/writes device registers, transfers data.
7. **Context restore**: The handler returns, restoring saved state.
8. **Resume**: The interrupted program continues as if nothing happened.

### Interrupt Handler Example

```c
void keyboard_interrupt_handler(void) {
    // Read the scancode from keyboard data register
    unsigned char scancode = inb(KEYBOARD_DATA_PORT);

    // Process the key
    enqueue_key(scancode);

    // Acknowledge the interrupt
    outb(PIC_EOI, PIC_COMMAND_PORT);
}
```

The handler runs only when a key is pressed—no wasted cycles polling an idle keyboard.

### Advantages of Interrupts

- **CPU efficiency**: CPU does useful work instead of waiting
- **Low latency for slow devices**: Perfect for devices that are mostly idle (keyboard, mouse, network packets arriving)
- **Handles asynchronous events**: Devices can signal whenever they're ready
- **Supports multiple devices**: Each device has its own interrupt and handler

### Disadvantages of Interrupts

- **Overhead**: Context save/restore and handler execution take time
- **Complexity**: Interrupt handlers must be carefully written (reentrancy, race conditions)
- **Interrupt storms**: A misbehaving device can flood the system with interrupts
- **Latency variation**: Handler may not run immediately if interrupts are disabled

### Interrupt Priority and Masking

Systems typically support multiple interrupt levels:
- **Priority levels**: Higher-priority interrupts can preempt lower-priority handlers
- **Interrupt masking**: Software can temporarily disable specific interrupts
- **Non-maskable interrupts (NMI)**: Critical interrupts that cannot be disabled (hardware errors)

### The Interrupt Controller

Real systems have many devices but limited CPU interrupt lines. An **interrupt controller** (like the PIC or APIC on x86) aggregates device interrupts:

```
Device 0 ─┐
Device 1 ─┼──► Interrupt Controller ──► CPU INT
Device 2 ─┤
Device 3 ─┘
```

The controller:
- Receives interrupts from multiple devices
- Prioritizes and queues interrupts
- Signals the CPU with a single line
- Provides the interrupt number so CPU knows which device

## DMA: Direct Memory Access

**DMA** (Direct Memory Access) addresses a different problem: even with interrupts, the CPU must move data between device and memory byte-by-byte. For high-bandwidth devices (disks, networks), this consumes significant CPU time.

DMA lets devices transfer data directly to/from memory without CPU involvement.

### How DMA Works

```
1. CPU programs DMA controller with:
   - Memory address (source or destination)
   - Transfer size
   - Direction (read or write)
   - Device selection
2. CPU starts DMA transfer
3. CPU continues other work
4. DMA controller transfers data between device and memory
5. When complete, DMA controller interrupts CPU
6. CPU checks status and processes data
```

### DMA Components

**DMA controller**: Hardware that manages transfers. May be:
- Part of the chipset (system-wide)
- Integrated into device controllers (disk controller, network card)

**DMA channels**: Separate channels allow multiple concurrent transfers.

**Bus arbitration**: DMA controller must gain access to the memory bus, potentially competing with CPU.

### DMA Example: Disk Read

Without DMA:
```
1. CPU sends read command to disk
2. Disk seeks to sector (10 ms)
3. Disk reads data into internal buffer
4. CPU is interrupted
5. CPU reads 4 KB from disk buffer to memory, byte by byte
6. CPU processes data
```

With DMA:
```
1. CPU programs DMA: memory address, size, direction
2. CPU sends read command to disk
3. Disk seeks to sector (10 ms)
4. Disk reads data; DMA transfers directly to memory
5. DMA interrupts CPU when complete
6. CPU processes data already in memory
```

The CPU is free during the entire disk operation and data transfer.

### DMA Modes

**Single-transfer mode**: DMA transfers one byte/word, releases bus, requests again.
**Burst mode**: DMA holds bus until entire transfer completes.
**Cycle stealing**: DMA uses bus cycles when CPU doesn't need them.

### Memory Coherency

DMA creates coherency challenges:
- DMA writes directly to memory, bypassing CPU caches
- CPU cache may have stale data after DMA write
- DMA may read stale data if CPU modified data in cache

Solutions:
- **Cache flush**: OS flushes cache before DMA read
- **Cache invalidate**: OS invalidates cache lines after DMA write
- **Cache-coherent DMA**: Hardware maintains coherency (more expensive)
- **Non-cacheable buffers**: DMA uses memory regions marked non-cacheable

### Scatter-Gather DMA

Modern DMA supports **scatter-gather** operations:
- Transfer to/from non-contiguous memory regions
- A descriptor list specifies multiple buffers
- Enables zero-copy networking and efficient buffer management

```
Descriptor 1: buffer at 0x1000, size 1024
Descriptor 2: buffer at 0x5000, size 512
Descriptor 3: buffer at 0x8000, size 2048
```

The DMA controller follows the list, transferring data to each buffer in sequence.

## Comparing I/O Techniques

| Aspect | Polling | Interrupts | DMA |
|--------|---------|------------|-----|
| CPU usage | High (busy waiting) | Low (handler only) | Minimal (setup only) |
| Latency | Very low if ready | Handler overhead | Higher (setup overhead) |
| Complexity | Simple | Moderate | Complex |
| Best for | Fast, always-ready devices | Slow, asynchronous devices | High-bandwidth transfers |
| Examples | Spin locks, fast sensors | Keyboard, mouse, timers | Disk, network, graphics |

## Hybrid Approaches

Real systems often combine techniques:

**Interrupt coalescing**: Network cards accumulate multiple packets before interrupting, reducing interrupt rate at the cost of latency.

**Adaptive polling**: Start with interrupts, switch to polling under high load to reduce interrupt overhead (NAPI in Linux networking).

**Polled DMA**: Start DMA, then poll for completion instead of waiting for interrupt (lower latency for short transfers).

## I/O in the Memory Hierarchy

I/O fits into the overall memory hierarchy:

```
Registers → L1 → L2 → L3 → Memory → SSD → Disk → Network → Tape
Faster ←──────────────────────────────────────────────────→ Slower
Smaller ←────────────────────────────────────────────────→ Larger
```

The same principle applies: keep frequently accessed data in faster storage. Caches work for memory; the **buffer cache** caches disk blocks; network buffers stage data.

## Key Takeaways

- I/O devices are vastly slower than CPUs; coordination techniques prevent wasted cycles.
- **Polling** repeatedly checks device status—simple but wastes CPU time.
- **Interrupts** let devices notify the CPU—efficient for slow, asynchronous devices.
- Interrupt handlers must be fast and carefully written; interrupt controllers manage multiple devices.
- **DMA** transfers data directly between devices and memory without CPU involvement—essential for high bandwidth.
- DMA creates cache coherency issues that must be handled by flushing or invalidation.
- **Scatter-gather DMA** handles non-contiguous memory efficiently.
- Real systems combine polling, interrupts, and DMA based on device characteristics and performance requirements.
- I/O latency and bandwidth dramatically affect system performance; the memory hierarchy extends to storage and network.

