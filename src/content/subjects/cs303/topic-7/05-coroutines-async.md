# Coroutines and Async/Await

Coroutines are functions that can suspend their execution and later resume from where they left off. Async/await syntax builds on coroutines to make asynchronous programming more intuitive. These features have become essential for modern programming, enabling efficient concurrent code that's easier to write and understand than traditional callback-based or threading approaches.

## Coroutines Fundamentals

A coroutine is a generalization of subroutines. While subroutines have a single entry point and run to completion, coroutines can:
- Suspend execution at specific points
- Resume from the suspension point
- Maintain state between suspensions
- Yield values to callers multiple times

**Python Generator (Simple Coroutine)**:
```python
def count_up_to(n):
    i = 0
    while i < n:
        yield i  # Suspend and return value
        i += 1

counter = count_up_to(5)
print(next(counter))  # 0
print(next(counter))  # 1
print(next(counter))  # 2
```

Each `yield` suspends the function, saving its state. `next()` resumes from the suspension point.

**Bidirectional Coroutines**:
```python
def echo():
    while True:
        value = yield  # Receive value
        print(f"Received: {value}")

coroutine = echo()
next(coroutine)  # Prime the coroutine
coroutine.send("hello")  # Received: hello
coroutine.send(42)       # Received: 42
```

Coroutines can both yield values and receive values via `send()`.

## Async/Await Fundamentals

Async/await provides syntax for writing asynchronous code that looks synchronous:

**JavaScript Example**:
```javascript
// Promise-based (callback style)
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            return fetch(`/api/posts/${user.id}`);
        })
        .then(response => response.json())
        .then(posts => {
            console.log(posts);
        })
        .catch(error => {
            console.error(error);
        });
}

// Async/await (sequential style)
async function fetchUserData(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const user = await userResponse.json();

        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();

        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}
```

The async/await version is more readable and easier to reason about.

**Rust Example**:
```rust
use tokio;

// Async function
async fn fetch_data(url: &str) -> Result<String, reqwest::Error> {
    let response = reqwest::get(url).await?;
    let body = response.text().await?;
    Ok(body)
}

async fn process_data() -> Result<(), reqwest::Error> {
    // Await each async operation
    let data1 = fetch_data("https://api.example.com/1").await?;
    let data2 = fetch_data("https://api.example.com/2").await?;

    println!("Data 1: {}", data1);
    println!("Data 2: {}", data2);

    Ok(())
}

#[tokio::main]
async fn main() {
    if let Err(e) = process_data().await {
        eprintln!("Error: {}", e);
    }
}
```

## Execution Model

Async/await typically uses cooperative multitasking with an event loop:

**Event Loop Architecture**:
```
Event Loop
    ├─ Task Queue
    │   ├─ Task 1 (suspended at await)
    │   ├─ Task 2 (suspended at await)
    │   └─ Task 3 (running)
    │
    └─ I/O Reactor
        ├─ Socket ready
        ├─ Timer expired
        └─ File ready
```

When a task hits `await` on an incomplete operation, it suspends and returns control to the event loop. The loop polls other tasks and I/O operations, resuming tasks when their awaited operations complete.

**Task Lifecycle**:
```
Created → Running → Suspended → Ready → Running → ... → Completed
```

## Futures and Promises

Async/await builds on futures (promises in JavaScript):

**Future Trait (Rust)**:
```rust
trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>)
        -> Poll<Self::Output>;
}

enum Poll<T> {
    Ready(T),    // Future completed
    Pending,     // Not ready yet
}
```

An `async fn` desugars to a function returning a `Future`:

```rust
async fn foo() -> i32 {
    42
}

// Desugars to approximately:
fn foo() -> impl Future<Output = i32> {
    // Generated state machine
}
```

**JavaScript Promises**:
```javascript
// Creating a promise
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Using with async/await
async function example() {
    console.log("Start");
    await delay(1000);  // Wait 1 second
    console.log("After 1 second");
}
```

## State Machine Transformation

Async functions compile to state machines:

```rust
async fn example() {
    println!("Step 1");
    some_async_op().await;
    println!("Step 2");
    another_async_op().await;
    println!("Step 3");
}
```

Compiles to approximately:
```rust
enum ExampleState {
    Start,
    AfterFirstAwait,
    AfterSecondAwait,
    Done,
}

struct ExampleFuture {
    state: ExampleState,
    first_future: Option<SomeAsyncOp>,
    second_future: Option<AnotherAsyncOp>,
}

impl Future for ExampleFuture {
    type Output = ();

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context) -> Poll<()> {
        loop {
            match self.state {
                ExampleState::Start => {
                    println!("Step 1");
                    self.first_future = Some(some_async_op());
                    self.state = ExampleState::AfterFirstAwait;
                }
                ExampleState::AfterFirstAwait => {
                    match self.first_future.as_mut().unwrap().poll(cx) {
                        Poll::Ready(_) => {
                            println!("Step 2");
                            self.second_future = Some(another_async_op());
                            self.state = ExampleState::AfterSecondAwait;
                        }
                        Poll::Pending => return Poll::Pending,
                    }
                }
                ExampleState::AfterSecondAwait => {
                    match self.second_future.as_mut().unwrap().poll(cx) {
                        Poll::Ready(_) => {
                            println!("Step 3");
                            self.state = ExampleState::Done;
                            return Poll::Ready(());
                        }
                        Poll::Pending => return Poll::Pending,
                    }
                }
                ExampleState::Done => panic!("polled after completion"),
            }
        }
    }
}
```

The compiler generates this state machine automatically.

## Concurrent Execution

Async/await enables concurrent (not parallel) execution:

**Sequential (slow)**:
```javascript
async function sequential() {
    const data1 = await fetch('/api/1');  // Wait
    const data2 = await fetch('/api/2');  // Then wait
    return [data1, data2];
}
```

**Concurrent (fast)**:
```javascript
async function concurrent() {
    const promise1 = fetch('/api/1');  // Start immediately
    const promise2 = fetch('/api/2');  // Start immediately
    const [data1, data2] = await Promise.all([promise1, promise2]);
    return [data1, data2];
}
```

Both requests execute concurrently, reducing total time.

**Rust Concurrency**:
```rust
use tokio;

async fn concurrent_fetches() -> Result<(String, String), reqwest::Error> {
    let fetch1 = fetch_data("url1");
    let fetch2 = fetch_data("url2");

    // Run concurrently
    let (result1, result2) = tokio::join!(fetch1, fetch2);

    Ok((result1?, result2?))
}
```

## Error Handling

Async/await integrates with language error handling:

**JavaScript try/catch**:
```javascript
async function handleErrors() {
    try {
        const data = await fetch('/api/data');
        return await data.json();
    } catch (error) {
        console.error("Failed:", error);
        return null;
    }
}
```

**Rust Result**:
```rust
async fn handle_errors() -> Result<Data, Error> {
    let response = fetch_data().await?;  // ? propagates errors
    let data = parse_data(response).await?;
    Ok(data)
}
```

**Python Exception**:
```python
async def handle_errors():
    try:
        data = await fetch_data()
        return process(data)
    except Exception as e:
        print(f"Error: {e}")
        return None
```

## Cancellation and Timeouts

Async operations can be cancelled:

**JavaScript AbortController**:
```javascript
async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request timed out');
        }
        throw error;
    }
}
```

**Rust Tokio Timeout**:
```rust
use tokio::time::{timeout, Duration};

async fn fetch_with_timeout() -> Result<String, Error> {
    let fetch_future = fetch_data("url");

    match timeout(Duration::from_secs(5), fetch_future).await {
        Ok(result) => result,
        Err(_) => Err(Error::Timeout),
    }
}
```

## Async Iterators/Streams

Asynchronous iteration over sequences:

**JavaScript Async Iterators**:
```javascript
async function* generateNumbers() {
    for (let i = 0; i < 5; i++) {
        await delay(1000);
        yield i;
    }
}

async function consume() {
    for await (const num of generateNumbers()) {
        console.log(num);  // Prints 0, 1, 2, 3, 4 with 1s delay
    }
}
```

**Rust Streams**:
```rust
use tokio_stream::{Stream, StreamExt};

async fn process_stream() {
    let mut stream = get_data_stream();

    while let Some(item) = stream.next().await {
        println!("Received: {}", item);
    }
}
```

## Backpressure and Flow Control

Managing data flow in async systems:

```rust
use tokio::sync::mpsc;

async fn producer(tx: mpsc::Sender<i32>) {
    for i in 0..100 {
        // send() waits if channel is full (backpressure)
        tx.send(i).await.unwrap();
    }
}

async fn consumer(mut rx: mpsc::Receiver<i32>) {
    while let Some(item) = rx.recv().await {
        // Process item (might be slow)
        process(item).await;
    }
}

#[tokio::main]
async fn main() {
    let (tx, rx) = mpsc::channel(10);  // Buffer size 10

    tokio::spawn(producer(tx));
    consumer(rx).await;
}
```

The channel provides backpressure - producer waits when buffer is full.

## Performance Characteristics

**Advantages**:
- Lightweight: Thousands/millions of async tasks per OS thread
- Efficient I/O: Non-blocking, event-driven
- Composable: Easy to write complex async flows
- Memory efficient: Small per-task overhead

**Considerations**:
- CPU-bound work should use threads, not async
- Blocking operations should be offloaded
- Debugging can be harder (non-linear execution)

**Blocking in Async Context**:
```rust
// BAD: Blocks the entire executor
async fn bad_async() {
    std::thread::sleep(Duration::from_secs(1));  // Blocks!
}

// GOOD: Uses async sleep
async fn good_async() {
    tokio::time::sleep(Duration::from_secs(1)).await;  // Yields
}

// GOOD: Offloads blocking work
async fn handle_blocking() {
    tokio::task::spawn_blocking(|| {
        // CPU-intensive or blocking work
        expensive_computation()
    }).await.unwrap();
}
```

## Real-World Applications

**Web Servers**: Handle thousands of concurrent connections efficiently.

**Microservices**: Coordinate multiple async service calls.

**GUI Applications**: Keep UI responsive during long operations.

**Network Clients**: Manage multiple simultaneous connections.

**Data Processing Pipelines**: Stream large datasets efficiently.

Async/await has become the standard for I/O-bound concurrent programming, offering a powerful abstraction that balances ease of use with performance. Understanding its execution model and state machine implementation is crucial for writing efficient async code.
