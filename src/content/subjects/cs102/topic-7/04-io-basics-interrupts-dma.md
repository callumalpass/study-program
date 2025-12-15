# I/O Basics: Interrupts, Polling, and DMA

Input/Output devices operate much more slowly and unpredictably than the CPU. Systems use coordination mechanisms to transfer data efficiently.

## Polling

In polling, the CPU repeatedly checks device status:
- simple to implement
- wastes CPU cycles if device is slow

## Interrupts

With interrupts, the device signals the CPU when it needs attention.

Pros:
- CPU can do other work in the meantime
Cons:
- interrupt handling has overhead; too many interrupts can be expensive

## DMA (Direct Memory Access)

DMA lets a device transfer blocks of data directly to/from memory without the CPU moving every byte.

The CPU sets up the transfer (addresses, size), then the DMA engine performs it and notifies the CPU when done.

## Key takeaways

- Polling is simple but wasteful; interrupts are responsive but have overhead.
- DMA is crucial for high-throughput devices (disk, network) to avoid CPU bottlenecks.
- I/O is coordinated, not “instant”; these mechanisms explain much of systems performance behavior.

