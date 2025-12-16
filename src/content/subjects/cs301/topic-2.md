# Threads and Concurrency

Threads represent the basic unit of CPU utilization within a process. This topic explores multithreading models, thread libraries, and the challenges of concurrent programming.

## Overview

A **thread** is a lightweight process that shares code, data, and resources with other threads in the same process while maintaining its own execution context. Multithreading enables programs to perform multiple tasks concurrently, improving responsiveness and resource utilization.

## Key Concepts

### Thread vs Process
- Threads share memory space; processes have separate address spaces
- Thread creation is faster and less resource-intensive
- Communication between threads is simpler but requires synchronization
- A crash in one thread can affect all threads in the process

### Multithreading Models
- **Many-to-One**: Multiple user threads map to single kernel thread
- **One-to-One**: Each user thread maps to a kernel thread
- **Many-to-Many**: Multiple user threads map to multiple kernel threads

### Thread Libraries
- **POSIX Threads (pthreads)**: Standard API for Unix systems
- **Windows Threads**: Native Windows threading API
- **Java Threads**: JVM-managed threads with platform independence

## Learning Objectives

After completing this topic, you will be able to:
1. Distinguish between processes and threads
2. Implement multithreaded programs using pthreads
3. Compare multithreading models
4. Analyze thread creation and termination
5. Understand thread pools and their benefits
6. Handle thread cancellation and signals
7. Design concurrent applications effectively
