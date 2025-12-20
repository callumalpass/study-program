# Concurrent Programming

## Understanding Concurrency

Concurrent programming involves designing systems where multiple computations execute during overlapping time periods, potentially interacting with each other. This paradigm has become increasingly critical as hardware has evolved from faster single cores to multiple cores and distributed systems, making effective utilization of parallelism essential for performance.

The distinction between concurrency and parallelism, while subtle, is important. Concurrency is about structure—designing programs as independent components that can execute in overlapping time periods. Parallelism is about execution—actually running multiple computations simultaneously on multiple processors. A concurrent program may execute on a single processor through interleaving, while a parallel program requires multiple processors. Concurrent design enables parallelism but doesn't require it.

Several motivations drive concurrent programming. First, performance: exploiting multiple cores or machines can dramatically speed up computationally intensive tasks. Second, responsiveness: concurrent designs allow programs to remain responsive while performing background work—a user interface can stay interactive while computation proceeds in another thread. Third, natural modeling: many real-world systems are inherently concurrent—web servers handle multiple requests simultaneously, operating systems manage multiple processes, distributed systems coordinate multiple nodes.

However, concurrency introduces significant complexity. When multiple computations can observe and modify shared state, race conditions emerge—the program's behavior depends on unpredictable timing of operations. Deadlocks occur when computations wait for each other circularly, making no progress. Ensuring correctness in concurrent systems requires careful reasoning about all possible interleavings of operations, a combinatorially explosive problem.

Different paradigms for concurrent programming have emerged, each with distinct models for how concurrent components interact and coordinate. Shared memory models provide threads with access to common memory, requiring synchronization mechanisms to prevent conflicts. Message passing models have independent processes communicating through explicit messages, avoiding shared state. Software transactional memory provides database-like transactions for memory operations. Actor models structure systems as independent actors processing messages asynchronously. Understanding these paradigms, their strengths, and their trade-offs is essential for effective concurrent programming.

## Shared Memory Concurrency

The shared memory model, dominant in languages like Java, C++, and C#, provides multiple threads of execution within a single address space. Threads can read and write common variables, enabling efficient communication but requiring careful synchronization to prevent data races.

**Threads** represent independent execution contexts within a process, sharing the process's address space but having their own stack and program counter:

```java
public class Counter {
    private int count = 0;

    public void increment() {
        count++;  // NOT thread-safe!
    }

    public int getCount() {
        return count;
    }
}

// Usage
Counter counter = new Counter();
Thread t1 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) {
        counter.increment();
    }
});
Thread t2 = new Thread(() -> {
    for (int i = 0; i < 1000; i++) {
        counter.increment();
    }
});

t1.start();
t2.start();
t1.join();
t2.join();

System.out.println(counter.getCount());  // Probably not 2000!
```

This code has a race condition. `count++` isn't atomic—it reads count, increments, and writes back. If threads interleave, updates can be lost. Two threads might both read count=0, both compute 1, and both write 1, so the final value is 1 instead of 2.

**Locks** provide mutual exclusion, ensuring only one thread executes a critical section at a time:

```java
public class Counter {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized(lock) {
            count++;
        }
    }

    public int getCount() {
        synchronized(lock) {
            return count;
        }
    }
}
```

The `synchronized` keyword ensures only one thread executes the protected code at a time. This prevents race conditions but requires discipline—forgetting to synchronize access leads to bugs that are hard to reproduce and debug.

**Atomic Operations** provide lock-free thread-safety for simple operations:

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Counter {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}
```

Atomic classes use hardware-level atomic operations (compare-and-swap) to ensure thread-safety without locks, often providing better performance.

**Deadlock** occurs when threads wait for each other circularly:

```java
Object lock1 = new Object();
Object lock2 = new Object();

Thread t1 = new Thread(() -> {
    synchronized(lock1) {
        // Thread 1 holds lock1
        synchronized(lock2) {
            // Thread 1 needs lock2
        }
    }
});

Thread t2 = new Thread(() -> {
    synchronized(lock2) {
        // Thread 2 holds lock2
        synchronized(lock1) {
            // Thread 2 needs lock1
        }
    }
});
```

If t1 acquires lock1 and t2 acquires lock2, they wait forever—deadlock. Preventing deadlock requires careful lock ordering or using try-lock mechanisms with timeouts.

**Condition Variables** enable threads to wait for specific conditions:

```java
class BoundedQueue<T> {
    private Queue<T> queue = new LinkedList<>();
    private int capacity;
    private final Object lock = new Object();

    public void put(T item) throws InterruptedException {
        synchronized(lock) {
            while (queue.size() == capacity) {
                lock.wait();  // Wait for space
            }
            queue.add(item);
            lock.notifyAll();  // Signal waiters
        }
    }

    public T take() throws InterruptedException {
        synchronized(lock) {
            while (queue.isEmpty()) {
                lock.wait();  // Wait for items
            }
            T item = queue.remove();
            lock.notifyAll();  // Signal waiters
            return item;
        }
    }
}
```

This bounded queue blocks producers when full and consumers when empty, coordinating through wait/notify.

**Higher-Level Concurrency Constructs** abstract over low-level primitives. Java's `java.util.concurrent` provides thread pools, concurrent collections, and futures:

```java
ExecutorService executor = Executors.newFixedThreadPool(4);

List<Future<Integer>> futures = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    final int task = i;
    futures.add(executor.submit(() -> computeExpensiveValue(task)));
}

for (Future<Integer> future : futures) {
    Integer result = future.get();  // Blocks until result available
    processResult(result);
}

executor.shutdown();
```

Thread pools manage threads efficiently, and futures represent asynchronous computations, abstracting over raw thread management.

## Message Passing and Actor Models

Message passing avoids shared mutable state by having independent processes communicate through explicit messages. This paradigm simplifies reasoning about concurrency, as each process has private state that only it can modify.

**Communicating Sequential Processes (CSP)**, proposed by Tony Hoare, structures concurrent systems as processes communicating through channels. Go implements CSP-style concurrency:

```go
func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        time.Sleep(time.Second)
        results <- job * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for a := 1; a <= 9; a++ {
        <-results
    }
}
```

Goroutines (lightweight threads) communicate through channels. The `jobs` channel distributes work to workers, and the `results` channel collects outputs. This pattern cleanly separates concerns—workers don't coordinate directly, they just process items from their input channel.

**The Actor Model**, pioneered in Erlang and Akka, structures systems as actors—independent entities with private state that process messages asynchronously:

```erlang
-module(counter).
-export([start/0, increment/1, get_value/1, loop/1]).

start() ->
    spawn(counter, loop, [0]).

increment(Counter) ->
    Counter ! increment.

get_value(Counter) ->
    Counter ! {get, self()},
    receive
        {value, Value} -> Value
    end.

loop(Count) ->
    receive
        increment ->
            loop(Count + 1);
        {get, From} ->
            From ! {value, Count},
            loop(Count)
    end.
```

Each actor processes messages sequentially, eliminating races within an actor. Actors communicate only through messages, avoiding shared state. This model scales naturally to distributed systems—actors might run on different machines, with location transparency.

**Akka** brings the actor model to the JVM:

```scala
import akka.actor._

case object Increment
case object GetValue
case class Value(count: Int)

class Counter extends Actor {
  var count = 0

  def receive = {
    case Increment =>
      count += 1
    case GetValue =>
      sender() ! Value(count)
  }
}

// Usage
val system = ActorSystem("CounterSystem")
val counter = system.actorOf(Props[Counter], "counter")

counter ! Increment
counter ! Increment

implicit val timeout = Timeout(5.seconds)
val future = counter ? GetValue
val Value(count) = Await.result(future, timeout.duration)
println(s"Count: $count")
```

Akka provides supervision (parent actors monitor children and restart them on failures), location transparency (actors can be remote), and backpressure handling, making it suitable for building resilient distributed systems.

**Advantages of Message Passing** include simplified reasoning—without shared state, many concurrency bugs disappear. Isolation enables fault tolerance—failing actors don't corrupt shared state. Distribution is natural—message passing works across network boundaries. Systems can scale horizontally by adding more actors/processes.

**Challenges** include higher overhead—message passing can be slower than shared memory for fine-grained communication. Deadlock remains possible if actors wait for replies circularly. Debugging distributed systems is harder than single-process programs. State management requires careful design—actors must maintain consistent state while processing messages asynchronously.

## Advanced Concurrency Paradigms

Beyond traditional shared memory and message passing, several advanced paradigms offer alternative approaches to concurrent programming.

**Software Transactional Memory (STM)** applies database transaction concepts to concurrent programming. Operations on shared memory execute within transactions that commit atomically or roll back if conflicts occur:

```haskell
-- Haskell STM
import Control.Concurrent.STM

type Account = TVar Int

transfer :: Account -> Account -> Int -> STM ()
transfer from to amount = do
    fromBalance <- readTVar from
    toBalance <- readTVar to
    writeTVar from (fromBalance - amount)
    writeTVar to (toBalance + amount)

main = do
    account1 <- atomically $ newTVar 1000
    account2 <- atomically $ newTVar 500

    atomically $ transfer account1 account2 100
```

The `atomically` block ensures the transfer executes as an atomic transaction. If another thread modifies account1 or account2 concurrently, the transaction retries automatically. STM eliminates explicit locks, preventing deadlock and simplifying error handling.

**Dataflow Programming** models computation as a directed graph where nodes represent operations and edges represent data dependencies. Execution proceeds automatically when dependencies are satisfied:

```python
# Conceptual dataflow (pseudo-code)
@dataflow
def process_pipeline():
    data = fetch_data()        # Node 1
    cleaned = clean(data)      # Node 2, depends on 1
    result1 = analyze1(cleaned) # Node 3, depends on 2
    result2 = analyze2(cleaned) # Node 4, depends on 2
    final = combine(result1, result2)  # Node 5, depends on 3 and 4
    return final
```

Nodes 3 and 4 can execute in parallel once node 2 completes. The runtime automatically schedules operations based on dependencies, maximizing parallelism without explicit thread management.

**Reactive Programming** models systems as reacting to streams of events over time. Libraries like RxJava provide powerful abstractions:

```java
Observable<MouseEvent> clicks = Observable.create(emitter -> {
    button.setOnClickListener(view -> emitter.onNext(new MouseEvent()));
});

clicks
    .debounce(300, TimeUnit.MILLISECONDS)
    .map(event -> event.getLocation())
    .subscribe(location -> processClick(location));
```

Reactive streams handle asynchronous event sequences with operators for filtering, transforming, and combining events. Backpressure mechanisms prevent fast producers from overwhelming slow consumers.

**Async/Await** provides syntactic sugar for asynchronous programming, making async code resemble synchronous code:

```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        const posts = await fetch(`/api/users/${userId}/posts`);
        return { user, posts: await posts.json() };
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
```

The `await` keyword pauses function execution until the promise resolves, but doesn't block the thread—other work can proceed. This combines the simplicity of synchronous code with the efficiency of asynchronous execution.

**Practical Considerations** for choosing concurrency paradigms include:

1. **Problem Nature**: Data parallel problems (processing independent items) suit thread pools or dataflow. I/O-bound problems benefit from async/await. Systems with complex state interactions might prefer actors.

2. **Performance Requirements**: Shared memory offers lowest latency for fine-grained communication. Message passing adds overhead but simplifies reasoning. STM trades performance for ease of use.

3. **Failure Handling**: Actor systems excel at fault tolerance through supervision. Shared memory threads typically fail together. Async systems need careful error propagation.

4. **Team Experience**: Complex paradigms require training. Starting with higher-level constructs (thread pools, async/await) and adopting advanced paradigms (actors, STM) as needed often works well.

5. **Ecosystem Support**: Available libraries and frameworks matter. Java's excellent concurrent collections make shared memory practical. Erlang's OTP makes actors production-ready.

Concurrent programming remains challenging, but modern paradigms and libraries significantly ease the burden. Understanding multiple approaches—shared memory, message passing, STM, dataflow, reactive—enables choosing the most appropriate model for each situation. As multicore and distributed systems become ubiquitous, mastering concurrent programming paradigms is essential for building performant, reliable software.
