---
title: "Stream Processing"
description: "Kafka Streams, Apache Flink, windowing, watermarks, and exactly-once semantics in real-time data processing"
---

# Stream Processing

Stream processing enables real-time analysis of continuous data streams, processing events as they arrive rather than waiting for batch collection. Modern stream processing frameworks like Apache Kafka Streams and Apache Flink provide powerful abstractions for stateful computations, event-time processing, and exactly-once semantics, enabling applications from real-time analytics to complex event processing.

## Stream Processing Fundamentals

Stream processing treats data as unbounded sequences of events rather than finite datasets.

### Streams vs Batches

```javascript
// Batch processing: process entire dataset at once
class BatchProcessor {
  async process(dataset) {
    const results = [];
    
    for (const record of dataset) {
      results.push(this.transform(record));
    }
    
    return results;  // Wait for all data
  }
}

// Stream processing: process events as they arrive
class StreamProcessor {
  constructor() {
    this.handlers = [];
  }
  
  onEvent(handler) {
    this.handlers.push(handler);
  }
  
  async processEvent(event) {
    for (const handler of this.handlers) {
      await handler(event);  // Process immediately
    }
  }
}
```

### Event Time vs Processing Time

**Processing time:** When event is processed by the system
**Event time:** When event actually occurred (embedded in event)

```javascript
class StreamEvent {
  constructor(data, eventTime = Date.now()) {
    this.data = data;
    this.eventTime = eventTime;      // When event occurred
    this.processingTime = null;       // Set when processed
    this.ingestionTime = null;        // When entered system
  }
}

// Example: out-of-order events
const events = [
  new StreamEvent({ sensor: 1, temp: 20 }, 1000),
  new StreamEvent({ sensor: 1, temp: 22 }, 3000),  // Arrives late
  new StreamEvent({ sensor: 1, temp: 21 }, 2000)   // But happened between
];

// Processing time order: 1000, 3000, 2000
// Event time order: 1000, 2000, 3000
```

## Apache Kafka Streams

Kafka Streams is a client library for building stream processing applications on top of Apache Kafka.

### KStream and KTable

```javascript
// KStream: unbounded stream of facts
class KStream {
  constructor(topic) {
    this.topic = topic;
    this.operations = [];
  }
  
  // Transform each record
  map(mapper) {
    this.operations.push({
      type: 'MAP',
      function: mapper
    });
    return this;
  }
  
  filter(predicate) {
    this.operations.push({
      type: 'FILTER',
      function: predicate
    });
    return this;
  }
  
  // Group by key for aggregation
  groupByKey() {
    return new KGroupedStream(this);
  }
  
  // Join with another stream
  join(other, joiner, windowSize) {
    return new JoinedStream(this, other, joiner, windowSize);
  }
}

// KTable: changelog stream (latest value per key)
class KTable {
  constructor(topic) {
    this.topic = topic;
    this.state = new Map();  // Current state
  }
  
  // Update state with new events
  async processEvent(key, value) {
    if (value === null) {
      this.state.delete(key);  // Tombstone - delete
    } else {
      this.state.set(key, value);  // Update/insert
    }
  }
  
  get(key) {
    return this.state.get(key);
  }
  
  // Convert to KStream
  toStream() {
    const stream = new KStream();
    
    for (const [key, value] of this.state) {
      stream.emit(key, value);
    }
    
    return stream;
  }
}

// Example: word count with Kafka Streams
class WordCountApp {
  async process(inputTopic, outputTopic) {
    const builder = new StreamsBuilder();
    
    // Create stream from input topic
    const textStream = builder.stream(inputTopic);
    
    // Process
    const wordCounts = textStream
      .flatMapValues(text => text.toLowerCase().split(/\s+/))
      .groupBy((key, word) => word)
      .count();  // Returns KTable
    
    // Output to topic
    wordCounts.toStream().to(outputTopic);
    
    // Start processing
    const streams = builder.build();
    await streams.start();
  }
}
```

### Stateful Processing

```javascript
class StatefulProcessor {
  constructor(stateStore) {
    this.stateStore = stateStore;
  }
  
  async processRecord(key, value) {
    // Read current state
    const currentState = await this.stateStore.get(key);
    
    // Compute new state
    const newState = this.updateState(currentState, value);
    
    // Write updated state
    await this.stateStore.put(key, newState);
    
    return newState;
  }
  
  updateState(current, event) {
    // Example: running sum
    return {
      count: (current?.count || 0) + 1,
      sum: (current?.sum || 0) + event.value,
      avg: ((current?.sum || 0) + event.value) / ((current?.count || 0) + 1)
    };
  }
}

// State store implementations
class RocksDBStateStore {
  constructor(path) {
    this.db = new RocksDB(path);
  }
  
  async get(key) {
    return await this.db.get(key);
  }
  
  async put(key, value) {
    await this.db.put(key, JSON.stringify(value));
  }
  
  async delete(key) {
    await this.db.delete(key);
  }
  
  // Changelog for fault tolerance
  async checkpoint() {
    const changelog = [];
    
    const iterator = this.db.iterator();
    for await (const [key, value] of iterator) {
      changelog.push({ key, value });
    }
    
    return changelog;
  }
}
```

## Windowing

Windows divide infinite streams into finite chunks for aggregation.

### Window Types

```javascript
// Tumbling windows: fixed-size, non-overlapping
class TumblingWindow {
  constructor(size) {
    this.size = size;  // e.g., 5 minutes
  }
  
  assignWindow(eventTime) {
    const windowStart = Math.floor(eventTime / this.size) * this.size;
    return {
      start: windowStart,
      end: windowStart + this.size
    };
  }
}

// Sliding windows: fixed-size, overlapping
class SlidingWindow {
  constructor(size, slide) {
    this.size = size;    // Window duration
    this.slide = slide;  // Advance interval
  }
  
  assignWindows(eventTime) {
    const windows = [];
    const firstStart = Math.floor(eventTime / this.slide) * this.slide;
    
    // Event belongs to multiple windows
    for (let start = firstStart; start > eventTime - this.size; start -= this.slide) {
      windows.push({
        start,
        end: start + this.size
      });
    }
    
    return windows;
  }
}

// Session windows: dynamic, based on inactivity gap
class SessionWindow {
  constructor(gap) {
    this.gap = gap;  // Inactivity timeout
    this.sessions = new Map();
  }
  
  processEvent(key, eventTime) {
    const session = this.sessions.get(key);
    
    if (!session || eventTime - session.lastEvent > this.gap) {
      // Start new session
      this.sessions.set(key, {
        start: eventTime,
        end: eventTime,
        lastEvent: eventTime
      });
    } else {
      // Extend existing session
      session.end = eventTime;
      session.lastEvent = eventTime;
    }
    
    return this.sessions.get(key);
  }
}

// Example: count events per 5-minute tumbling window
class WindowedAggregation {
  constructor() {
    this.windows = new Map();  // windowKey → aggregated value
    this.window = new TumblingWindow(5 * 60 * 1000);
  }
  
  async processEvent(event) {
    const window = this.window.assignWindow(event.eventTime);
    const windowKey = `${window.start}-${window.end}`;
    
    const current = this.windows.get(windowKey) || { count: 0, sum: 0 };
    current.count++;
    current.sum += event.value;
    
    this.windows.set(windowKey, current);
    
    // Emit result when window closes
    if (this.isWindowComplete(window)) {
      return { window, result: current };
    }
  }
  
  isWindowComplete(window) {
    return Date.now() > window.end;
  }
}
```

## Watermarks

Watermarks track progress in event time and trigger window computations.

```javascript
class Watermark {
  constructor() {
    this.currentWatermark = 0;
  }
  
  // Update watermark based on observed events
  update(eventTime) {
    // Watermark = max observed event time - allowed lateness
    const allowedLateness = 10000;  // 10 seconds
    const newWatermark = eventTime - allowedLateness;
    
    if (newWatermark > this.currentWatermark) {
      this.currentWatermark = newWatermark;
      return true;  // Watermark advanced
    }
    
    return false;
  }
  
  // Check if window should be triggered
  shouldTrigger(windowEnd) {
    return this.currentWatermark >= windowEnd;
  }
}

class WatermarkProcessor {
  constructor(windowSize) {
    this.watermark = new Watermark();
    this.windows = new Map();
    this.windowSize = windowSize;
  }
  
  async processEvent(event) {
    // Assign to window
    const windowStart = Math.floor(event.eventTime / this.windowSize) * this.windowSize;
    const windowEnd = windowStart + this.windowSize;
    const windowKey = `${windowStart}-${windowEnd}`;
    
    // Accumulate in window
    if (!this.windows.has(windowKey)) {
      this.windows.set(windowKey, { events: [], triggered: false });
    }
    
    this.windows.get(windowKey).events.push(event);
    
    // Update watermark
    const advanced = this.watermark.update(event.eventTime);
    
    if (advanced) {
      // Check which windows to trigger
      return await this.triggerWindows();
    }
  }
  
  async triggerWindows() {
    const results = [];
    
    for (const [windowKey, window] of this.windows) {
      const [start, end] = windowKey.split('-').map(Number);
      
      if (!window.triggered && this.watermark.shouldTrigger(end)) {
        // Trigger window computation
        const result = await this.computeWindow(window.events);
        
        results.push({
          window: { start, end },
          result
        });
        
        window.triggered = true;
        
        // Clean up old windows
        this.windows.delete(windowKey);
      }
    }
    
    return results;
  }
  
  async computeWindow(events) {
    // Aggregate events in window
    return events.reduce((acc, event) => ({
      count: acc.count + 1,
      sum: acc.sum + event.value,
      avg: (acc.sum + event.value) / (acc.count + 1)
    }), { count: 0, sum: 0, avg: 0 });
  }
}
```

## Apache Flink

Flink is a distributed stream processing framework with advanced features for stateful computations.

```javascript
class FlinkDataStream {
  constructor(source) {
    this.source = source;
    this.operators = [];
  }
  
  map(mapFunction) {
    this.operators.push({
      type: 'MAP',
      function: mapFunction,
      parallelism: 4
    });
    return this;
  }
  
  filter(filterFunction) {
    this.operators.push({
      type: 'FILTER',
      function: filterFunction,
      parallelism: 4
    });
    return this;
  }
  
  keyBy(keySelector) {
    return new KeyedStream(this, keySelector);
  }
  
  // Window assignment
  timeWindow(size) {
    return new WindowedStream(this, new TumblingWindow(size));
  }
  
  // Sink to output
  addSink(sinkFunction) {
    this.operators.push({
      type: 'SINK',
      function: sinkFunction,
      parallelism: 1
    });
  }
  
  // Execute the job
  async execute(jobName) {
    const executionGraph = this.buildExecutionGraph();
    const runtime = new FlinkRuntime();
    
    return await runtime.execute(jobName, executionGraph);
  }
  
  buildExecutionGraph() {
    // Convert logical plan to physical execution graph
    const graph = {
      sources: [this.source],
      operators: this.operators,
      parallelism: this.operators.reduce((max, op) => 
        Math.max(max, op.parallelism), 1)
    };
    
    return graph;
  }
}

class KeyedStream extends FlinkDataStream {
  constructor(stream, keySelector) {
    super(stream.source);
    this.operators = [...stream.operators];
    this.keySelector = keySelector;
  }
  
  // Stateful operations
  reduce(reduceFunction) {
    this.operators.push({
      type: 'REDUCE',
      function: reduceFunction,
      stateful: true,
      keySelector: this.keySelector
    });
    return this;
  }
  
  aggregate(aggregateFunction) {
    this.operators.push({
      type: 'AGGREGATE',
      function: aggregateFunction,
      stateful: true,
      keySelector: this.keySelector
    });
    return this;
  }
}
```

## Exactly-Once Semantics

Ensuring each event is processed exactly once despite failures.

```javascript
class ExactlyOnceProcessor {
  constructor() {
    this.checkpointCoordinator = new CheckpointCoordinator();
    this.stateBackend = new StateBackend();
  }
  
  async processEvent(event) {
    // Process with transactional semantics
    const transaction = await this.beginTransaction();
    
    try {
      // 1. Read from source with offset tracking
      const offset = event.offset;
      
      // 2. Process event and update state
      const result = await this.transform(event);
      await this.stateBackend.update(event.key, result, transaction);
      
      // 3. Write to sink
      await this.sink.write(result, transaction);
      
      // 4. Commit source offset
      await this.source.commitOffset(offset, transaction);
      
      // 5. Commit transaction
      await transaction.commit();
      
    } catch (error) {
      // Rollback on failure
      await transaction.rollback();
      throw error;
    }
  }
  
  // Two-phase commit for exactly-once
  async beginTransaction() {
    return {
      id: this.generateTxId(),
      operations: [],
      
      async commit() {
        // Phase 1: Pre-commit all participants
        for (const op of this.operations) {
          await op.preCommit();
        }
        
        // Phase 2: Commit all participants
        for (const op of this.operations) {
          await op.commit();
        }
      },
      
      async rollback() {
        for (const op of this.operations) {
          await op.rollback();
        }
      }
    };
  }
}

// Checkpoint-based exactly-once (Flink approach)
class CheckpointCoordinator {
  constructor() {
    this.checkpointInterval = 60000;  // 1 minute
    this.checkpoints = [];
  }
  
  async startCheckpointing() {
    setInterval(async () => {
      await this.triggerCheckpoint();
    }, this.checkpointInterval);
  }
  
  async triggerCheckpoint() {
    const checkpointId = this.generateCheckpointId();
    
    console.log(`Starting checkpoint ${checkpointId}`);
    
    // Inject checkpoint barrier into stream
    await this.injectBarrier(checkpointId);
    
    // Wait for all operators to complete checkpoint
    const acks = await this.collectAcknowledgments(checkpointId);
    
    if (acks.allSuccessful) {
      console.log(`Checkpoint ${checkpointId} completed`);
      this.checkpoints.push({
        id: checkpointId,
        timestamp: Date.now(),
        state: acks.state
      });
    }
  }
  
  async recoverFromCheckpoint(checkpointId) {
    const checkpoint = this.checkpoints.find(cp => cp.id === checkpointId);
    
    if (!checkpoint) {
      throw new Error(`Checkpoint ${checkpointId} not found`);
    }
    
    // Restore state from checkpoint
    await this.restoreState(checkpoint.state);
    
    // Resume processing from checkpoint
    console.log(`Recovered from checkpoint ${checkpointId}`);
  }
}
```

## Backpressure Handling

Managing flow control when producers outpace consumers.

```javascript
class BackpressureHandler {
  constructor(bufferSize = 1000) {
    this.buffer = [];
    this.bufferSize = bufferSize;
    this.watermarkHigh = bufferSize * 0.8;  // 80%
    this.watermarkLow = bufferSize * 0.2;   // 20%
  }
  
  async produce(event) {
    // Check if buffer is full
    while (this.buffer.length >= this.bufferSize) {
      // Apply backpressure - wait for space
      await this.waitForSpace();
    }
    
    this.buffer.push(event);
    
    // Signal to consumer
    this.signalDataAvailable();
  }
  
  async consume() {
    // Wait for data
    while (this.buffer.length === 0) {
      await this.waitForData();
    }
    
    const event = this.buffer.shift();
    
    // Signal to producer if buffer was full
    if (this.buffer.length < this.watermarkLow) {
      this.signalSpaceAvailable();
    }
    
    return event;
  }
  
  async waitForSpace() {
    return new Promise(resolve => {
      this.spaceWaiters = this.spaceWaiters || [];
      this.spaceWaiters.push(resolve);
    });
  }
  
  signalSpaceAvailable() {
    if (this.spaceWaiters && this.spaceWaiters.length > 0) {
      const waiter = this.spaceWaiters.shift();
      waiter();
    }
  }
}
```

Stream processing enables real-time data analysis and event-driven applications by processing continuous data streams with low latency, stateful computations, and strong consistency guarantees through techniques like watermarks, windowing, and exactly-once processing.
