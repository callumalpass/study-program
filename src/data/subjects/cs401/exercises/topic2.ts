import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs401-t2-ex01',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Lamport Logical Clock Implementation',
    difficulty: 2,
    description: `Implement Lamport logical clocks for ordering events in a distributed system.

Your implementation should:
- Maintain a logical clock counter
- Increment on local events
- Update clock on message send/receive
- Compare event timestamps`,
    starterCode: `interface Event {
  processId: string;
  timestamp: number;
  type: 'local' | 'send' | 'receive';
  data?: any;
}

class LamportClock {
  // Implement Lamport clock
}`,
    solution: `interface Event {
  processId: string;
  timestamp: number;
  type: 'local' | 'send' | 'receive';
  data?: any;
}

class LamportClock {
  private processId: string;
  private clock: number = 0;
  private events: Event[] = [];

  constructor(processId: string) {
    this.processId = processId;
  }

  localEvent(data?: any): number {
    this.clock++;
    const timestamp = this.clock;

    this.events.push({
      processId: this.processId,
      timestamp,
      type: 'local',
      data
    });

    return timestamp;
  }

  prepareSend(data?: any): { timestamp: number; message: any } {
    this.clock++;
    const timestamp = this.clock;

    this.events.push({
      processId: this.processId,
      timestamp,
      type: 'send',
      data
    });

    return {
      timestamp,
      message: {
        from: this.processId,
        timestamp,
        data
      }
    };
  }

  receiveMessage(messageTimestamp: number, from: string, data?: any): number {
    this.clock = Math.max(this.clock, messageTimestamp) + 1;
    const timestamp = this.clock;

    this.events.push({
      processId: this.processId,
      timestamp,
      type: 'receive',
      data: { from, data }
    });

    return timestamp;
  }

  getClock(): number {
    return this.clock;
  }

  getEvents(): Event[] {
    return [...this.events];
  }

  // Check if event a happened before event b
  happenedBefore(timestampA: number, timestampB: number): boolean {
    return timestampA < timestampB;
  }

  // Get total ordering of events
  getTotalOrder(events: Event[]): Event[] {
    return events.sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      // Tie-break using process ID
      return a.processId.localeCompare(b.processId);
    });
  }
}`,
    testCases: [
      {
        input: 'Local event increments clock',
        expectedOutput: 'Clock: 1',
        isHidden: false,
        description: 'Should increment clock on local event'
      },
      {
        input: 'Receive message with timestamp 5 when clock is 2',
        expectedOutput: 'Clock updated to 6',
        isHidden: false,
        description: 'Should update clock to max(local, received) + 1'
      },
      {
        input: 'Compare timestamps',
        expectedOutput: 'Correct happens-before relationship',
        isHidden: false,
        description: 'Should determine event ordering'
      }
    ],
    hints: [
      'Increment clock before each event',
      'On receive: max(local, message) + 1',
      'Timestamps provide total ordering',
      'Store events for audit trail'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex02',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Vector Clock Implementation',
    difficulty: 3,
    description: `Implement vector clocks to track causality and detect concurrent events.

Your implementation should:
- Maintain a vector of logical times
- Update vector on events and messages
- Compare vectors to determine causality
- Detect concurrent events`,
    starterCode: `type VectorTime = Map<string, number>;

class VectorClock {
  // Implement vector clock
}`,
    solution: `type VectorTime = Map<string, number>;

interface VectorMessage {
  from: string;
  vector: VectorTime;
  data?: any;
}

class VectorClock {
  private processId: string;
  private vector: VectorTime;
  private processes: Set<string>;

  constructor(processId: string, allProcesses: string[]) {
    this.processId = processId;
    this.processes = new Set(allProcesses);
    this.vector = new Map();

    // Initialize vector with zeros
    allProcesses.forEach(pid => {
      this.vector.set(pid, 0);
    });
  }

  localEvent(): VectorTime {
    const currentValue = this.vector.get(this.processId) || 0;
    this.vector.set(this.processId, currentValue + 1);
    return this.copyVector();
  }

  prepareSend(data?: any): VectorMessage {
    // Increment local clock
    const currentValue = this.vector.get(this.processId) || 0;
    this.vector.set(this.processId, currentValue + 1);

    return {
      from: this.processId,
      vector: this.copyVector(),
      data
    };
  }

  receiveMessage(message: VectorMessage): VectorTime {
    // Update vector: V[i] = max(V[i], message.V[i]) for all i
    message.vector.forEach((value, pid) => {
      const currentValue = this.vector.get(pid) || 0;
      this.vector.set(pid, Math.max(currentValue, value));
    });

    // Increment own clock
    const currentValue = this.vector.get(this.processId) || 0;
    this.vector.set(this.processId, currentValue + 1);

    return this.copyVector();
  }

  getVector(): VectorTime {
    return this.copyVector();
  }

  private copyVector(): VectorTime {
    return new Map(this.vector);
  }

  // Check if vectorA happened before vectorB (vectorA < vectorB)
  happenedBefore(vectorA: VectorTime, vectorB: VectorTime): boolean {
    let hasLess = false;
    let allLessOrEqual = true;

    this.processes.forEach(pid => {
      const a = vectorA.get(pid) || 0;
      const b = vectorB.get(pid) || 0;

      if (a > b) {
        allLessOrEqual = false;
      }
      if (a < b) {
        hasLess = true;
      }
    });

    return allLessOrEqual && hasLess;
  }

  // Check if two vectors represent concurrent events
  isConcurrent(vectorA: VectorTime, vectorB: VectorTime): boolean {
    return !this.happenedBefore(vectorA, vectorB) &&
           !this.happenedBefore(vectorB, vectorA);
  }

  // Check if vectors are equal
  isEqual(vectorA: VectorTime, vectorB: VectorTime): boolean {
    let equal = true;

    this.processes.forEach(pid => {
      const a = vectorA.get(pid) || 0;
      const b = vectorB.get(pid) || 0;
      if (a !== b) {
        equal = false;
      }
    });

    return equal;
  }

  toString(): string {
    const entries: string[] = [];
    this.vector.forEach((value, pid) => {
      entries.push(\`\${pid}:\${value}\`);
    });
    return \`[\${entries.join(', ')}]\`;
  }
}`,
    testCases: [
      {
        input: 'Local event increments own position',
        expectedOutput: 'Vector[processId] increased by 1',
        isHidden: false,
        description: 'Should increment own position in vector'
      },
      {
        input: 'Receive message updates vector',
        expectedOutput: 'Vector updated to component-wise max',
        isHidden: false,
        description: 'Should merge vectors on message receive'
      },
      {
        input: 'Detect concurrent events',
        expectedOutput: 'Correctly identifies concurrent vectors',
        isHidden: false,
        description: 'Should detect when events are concurrent'
      }
    ],
    hints: [
      'Vector has one entry per process',
      'Update own position on every event',
      'Component-wise max on receive',
      'Concurrent if neither vector ≤ other'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex03',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Causal Message Ordering',
    difficulty: 3,
    description: `Implement a causal ordering protocol that ensures messages are delivered in causal order using vector clocks.`,
    starterCode: `interface CausalMessage {
  from: string;
  vector: Map<string, number>;
  content: any;
  sequenceNumber: number;
}

class CausalOrderingProtocol {
  // Implement causal ordering
}`,
    solution: `interface CausalMessage {
  from: string;
  vector: Map<string, number>;
  content: any;
  sequenceNumber: number;
}

class CausalOrderingProtocol {
  private processId: string;
  private vector: Map<string, number>;
  private processes: Set<string>;
  private messageQueue: CausalMessage[] = [];
  private delivered: CausalMessage[] = [];
  private sequenceNumber: number = 0;

  constructor(processId: string, allProcesses: string[]) {
    this.processId = processId;
    this.processes = new Set(allProcesses);
    this.vector = new Map();

    allProcesses.forEach(pid => {
      this.vector.set(pid, 0);
    });
  }

  send(content: any): CausalMessage {
    // Increment own clock
    const currentValue = this.vector.get(this.processId) || 0;
    this.vector.set(this.processId, currentValue + 1);

    const message: CausalMessage = {
      from: this.processId,
      vector: new Map(this.vector),
      content,
      sequenceNumber: ++this.sequenceNumber
    };

    return message;
  }

  receive(message: CausalMessage): void {
    // Add to queue
    this.messageQueue.push(message);

    // Try to deliver queued messages
    this.tryDeliver();
  }

  private tryDeliver(): void {
    let delivered = true;

    while (delivered) {
      delivered = false;

      for (let i = 0; i < this.messageQueue.length; i++) {
        const message = this.messageQueue[i];

        if (this.canDeliver(message)) {
          // Remove from queue
          this.messageQueue.splice(i, 1);

          // Deliver message
          this.deliverMessage(message);

          delivered = true;
          break;
        }
      }
    }
  }

  private canDeliver(message: CausalMessage): boolean {
    // Can deliver if:
    // 1. V[sender] = local[sender] + 1
    // 2. V[k] <= local[k] for all k != sender

    const senderClock = message.vector.get(message.from) || 0;
    const localSenderClock = this.vector.get(message.from) || 0;

    if (senderClock !== localSenderClock + 1) {
      return false;
    }

    // Check all other processes
    for (const pid of this.processes) {
      if (pid !== message.from) {
        const messageClock = message.vector.get(pid) || 0;
        const localClock = this.vector.get(pid) || 0;

        if (messageClock > localClock) {
          return false;
        }
      }
    }

    return true;
  }

  private deliverMessage(message: CausalMessage): void {
    // Update vector
    message.vector.forEach((value, pid) => {
      const currentValue = this.vector.get(pid) || 0;
      this.vector.set(pid, Math.max(currentValue, value));
    });

    this.delivered.push(message);
  }

  getDelivered(): CausalMessage[] {
    return [...this.delivered];
  }

  getQueueSize(): number {
    return this.messageQueue.length;
  }

  getVector(): Map<string, number> {
    return new Map(this.vector);
  }
}`,
    testCases: [
      {
        input: 'Messages arrive in causal order',
        expectedOutput: 'Delivered immediately',
        isHidden: false,
        description: 'Should deliver messages in causal order'
      },
      {
        input: 'Message arrives before its causal predecessor',
        expectedOutput: 'Buffered until predecessor arrives',
        isHidden: false,
        description: 'Should buffer out-of-order messages'
      },
      {
        input: 'Predecessor arrives',
        expectedOutput: 'Both messages delivered in correct order',
        isHidden: false,
        description: 'Should deliver buffered messages when safe'
      }
    ],
    hints: [
      'Buffer messages that cannot be delivered yet',
      'Check delivery conditions using vector clocks',
      'Deliver when V[sender] = local[sender] + 1',
      'Try delivering buffered messages after each receive'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex04',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Happens-Before Relationship Tracker',
    difficulty: 2,
    description: `Build a system that tracks and visualizes happens-before relationships between events in a distributed system.`,
    starterCode: `interface DistributedEvent {
  id: string;
  processId: string;
  timestamp: number;
  type: string;
}

class HappenBeforeTracker {
  // Implement happens-before tracking
}`,
    solution: `interface DistributedEvent {
  id: string;
  processId: string;
  timestamp: number;
  type: string;
  causedBy?: string[];
}

class HappensBeforeTracker {
  private events: Map<string, DistributedEvent> = new Map();
  private happensBefore: Map<string, Set<string>> = new Map();

  addEvent(event: DistributedEvent): void {
    this.events.set(event.id, event);

    if (!this.happensBefore.has(event.id)) {
      this.happensBefore.set(event.id, new Set());
    }

    // Add causal relationships
    if (event.causedBy) {
      event.causedBy.forEach(causeId => {
        this.addHappensBefore(causeId, event.id);
      });
    }
  }

  addHappensBefore(beforeId: string, afterId: string): void {
    if (!this.happensBefore.has(afterId)) {
      this.happensBefore.set(afterId, new Set());
    }

    // Add direct relationship
    this.happensBefore.get(afterId)!.add(beforeId);

    // Add transitive relationships
    const beforePredecessors = this.happensBefore.get(beforeId);
    if (beforePredecessors) {
      beforePredecessors.forEach(predId => {
        this.happensBefore.get(afterId)!.add(predId);
      });
    }

    // Update all events that happen after 'afterId'
    this.happensBefore.forEach((predecessors, eventId) => {
      if (predecessors.has(afterId)) {
        predecessors.add(beforeId);
        if (beforePredecessors) {
          beforePredecessors.forEach(predId => {
            predecessors.add(predId);
          });
        }
      }
    });
  }

  happensBefore(eventA: string, eventB: string): boolean {
    const predecessors = this.happensBefore.get(eventB);
    return predecessors ? predecessors.has(eventA) : false;
  }

  areConcurrent(eventA: string, eventB: string): boolean {
    return !this.happensBefore(eventA, eventB) &&
           !this.happensBefore(eventB, eventA) &&
           eventA !== eventB;
  }

  getCausalHistory(eventId: string): string[] {
    const predecessors = this.happensBefore.get(eventId);
    return predecessors ? Array.from(predecessors) : [];
  }

  getConcurrentEvents(eventId: string): string[] {
    const concurrent: string[] = [];

    this.events.forEach((_, otherId) => {
      if (this.areConcurrent(eventId, otherId)) {
        concurrent.push(otherId);
      }
    });

    return concurrent;
  }

  getTopologicalOrder(): DistributedEvent[] {
    const visited = new Set<string>();
    const result: DistributedEvent[] = [];

    const visit = (eventId: string) => {
      if (visited.has(eventId)) {
        return;
      }

      visited.add(eventId);

      // Visit all predecessors first
      const predecessors = this.happensBefore.get(eventId);
      if (predecessors) {
        predecessors.forEach(predId => visit(predId));
      }

      const event = this.events.get(eventId);
      if (event) {
        result.push(event);
      }
    };

    this.events.forEach((_, eventId) => visit(eventId));

    return result;
  }
}`,
    testCases: [
      {
        input: 'Add events with causal relationships',
        expectedOutput: 'Relationships tracked correctly',
        isHidden: false,
        description: 'Should track happens-before relationships'
      },
      {
        input: 'Check if event A happens before event B',
        expectedOutput: 'Correct causal relationship returned',
        isHidden: false,
        description: 'Should determine causality'
      },
      {
        input: 'Find concurrent events',
        expectedOutput: 'Events with no causal relationship',
        isHidden: false,
        description: 'Should identify concurrent events'
      }
    ],
    hints: [
      'Maintain adjacency list for happens-before relation',
      'Handle transitive closure of relationships',
      'Concurrent if neither happens-before the other',
      'Use topological sort for ordering'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex05',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Physical Clock Synchronization',
    difficulty: 3,
    description: `Simulate physical clock synchronization using a simplified version of the Cristian's algorithm.`,
    starterCode: `interface ClockReading {
  time: number;
  measurementTime: number;
}

class PhysicalClockSync {
  // Implement clock synchronization
}`,
    solution: `interface ClockReading {
  time: number;
  measurementTime: number;
}

interface SyncResult {
  offset: number;
  roundTripTime: number;
  uncertainty: number;
}

class PhysicalClockSync {
  private localClock: number;
  private drift: number; // Clock drift rate (1.0 = no drift)

  constructor(initialTime: number = Date.now(), drift: number = 1.0) {
    this.localClock = initialTime;
    this.drift = drift;
  }

  // Simulate time passing
  tick(milliseconds: number): void {
    this.localClock += milliseconds * this.drift;
  }

  getTime(): number {
    return Math.floor(this.localClock);
  }

  // Client requests time from server
  requestTimeSync(serverTime: () => number, networkDelay: number): SyncResult {
    const requestTime = this.getTime();

    // Simulate network delay
    const oneWayDelay = networkDelay / 2;

    // Server processes request (gets its time)
    const serverResponseTime = serverTime();

    // Simulate return network delay
    const responseTime = this.getTime();

    const roundTripTime = responseTime - requestTime;
    const estimatedServerTime = serverResponseTime + oneWayDelay;

    const offset = estimatedServerTime - responseTime;
    const uncertainty = roundTripTime / 2;

    return {
      offset,
      roundTripTime,
      uncertainty
    };
  }

  // Adjust clock based on sync result
  adjustClock(syncResult: SyncResult): void {
    // Gradually adjust clock to avoid large jumps
    const maxAdjustment = 100; // Maximum single adjustment in ms

    if (Math.abs(syncResult.offset) <= maxAdjustment) {
      this.localClock += syncResult.offset;
    } else {
      // For large offsets, adjust gradually
      const sign = syncResult.offset > 0 ? 1 : -1;
      this.localClock += sign * maxAdjustment;
    }
  }

  // Perform multiple sync attempts and use best result
  synchronize(
    serverTime: () => number,
    networkDelay: number,
    attempts: number = 5
  ): SyncResult {
    let bestResult: SyncResult | null = null;

    for (let i = 0; i < attempts; i++) {
      const result = this.requestTimeSync(serverTime, networkDelay);

      if (!bestResult || result.roundTripTime < bestResult.roundTripTime) {
        bestResult = result;
      }

      // Small delay between attempts
      this.tick(10);
    }

    if (bestResult) {
      this.adjustClock(bestResult);
    }

    return bestResult!;
  }

  setDrift(drift: number): void {
    this.drift = drift;
  }

  getDrift(): number {
    return this.drift;
  }
}`,
    testCases: [
      {
        input: 'Sync with server',
        expectedOutput: 'Clock adjusted based on offset',
        isHidden: false,
        description: 'Should synchronize with time server'
      },
      {
        input: 'Multiple sync attempts',
        expectedOutput: 'Best result (lowest RTT) used',
        isHidden: false,
        description: 'Should use best sync result'
      },
      {
        input: 'Clock with drift',
        expectedOutput: 'Gradually diverges from correct time',
        isHidden: false,
        description: 'Should simulate clock drift'
      }
    ],
    hints: [
      'Estimate one-way delay as RTT/2',
      'Calculate offset between local and server time',
      'Use multiple samples and choose best (lowest RTT)',
      'Avoid large sudden clock adjustments'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex06',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Hybrid Logical Clock',
    difficulty: 4,
    description: `Implement hybrid logical clocks that combine physical and logical time for better ordering.`,
    starterCode: `interface HLCTimestamp {
  physicalTime: number;
  logicalTime: number;
}

class HybridLogicalClock {
  // Implement hybrid logical clock
}`,
    solution: `interface HLCTimestamp {
  physicalTime: number;
  logicalTime: number;
}

class HybridLogicalClock {
  private lastPhysicalTime: number = 0;
  private logicalTime: number = 0;

  private getPhysicalTime(): number {
    return Date.now();
  }

  now(): HLCTimestamp {
    const physicalTime = this.getPhysicalTime();

    if (physicalTime > this.lastPhysicalTime) {
      this.lastPhysicalTime = physicalTime;
      this.logicalTime = 0;
    } else {
      this.logicalTime++;
    }

    return {
      physicalTime: this.lastPhysicalTime,
      logicalTime: this.logicalTime
    };
  }

  update(remoteTimestamp: HLCTimestamp): HLCTimestamp {
    const physicalTime = this.getPhysicalTime();
    const maxPhysical = Math.max(
      physicalTime,
      this.lastPhysicalTime,
      remoteTimestamp.physicalTime
    );

    if (maxPhysical === this.lastPhysicalTime) {
      // Same physical time as before
      this.logicalTime++;
    } else if (maxPhysical === remoteTimestamp.physicalTime) {
      // Remote time is newer
      this.lastPhysicalTime = remoteTimestamp.physicalTime;
      this.logicalTime = remoteTimestamp.logicalTime + 1;
    } else {
      // Physical time advanced
      this.lastPhysicalTime = maxPhysical;
      this.logicalTime = 0;
    }

    return {
      physicalTime: this.lastPhysicalTime,
      logicalTime: this.logicalTime
    };
  }

  compare(a: HLCTimestamp, b: HLCTimestamp): number {
    if (a.physicalTime !== b.physicalTime) {
      return a.physicalTime - b.physicalTime;
    }
    return a.logicalTime - b.logicalTime;
  }

  happensBefore(a: HLCTimestamp, b: HLCTimestamp): boolean {
    return this.compare(a, b) < 0;
  }

  toString(timestamp: HLCTimestamp): string {
    return \`\${timestamp.physicalTime}.\${timestamp.logicalTime}\`;
  }

  fromString(str: string): HLCTimestamp {
    const [physical, logical] = str.split('.').map(Number);
    return {
      physicalTime: physical,
      logicalTime: logical
    };
  }
}`,
    testCases: [
      {
        input: 'Generate timestamp',
        expectedOutput: 'HLC timestamp with physical and logical components',
        isHidden: false,
        description: 'Should generate hybrid timestamps'
      },
      {
        input: 'Update with remote timestamp',
        expectedOutput: 'Local HLC updated correctly',
        isHidden: false,
        description: 'Should update HLC on message receive'
      },
      {
        input: 'Compare timestamps',
        expectedOutput: 'Correct ordering determined',
        isHidden: false,
        description: 'Should compare HLC timestamps correctly'
      }
    ],
    hints: [
      'Use physical time when it advances',
      'Use logical counter when physical time same',
      'Take max of local, remote, and current physical time',
      'Compare physical time first, then logical'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex07',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Total Ordering Service',
    difficulty: 3,
    description: `Implement a centralized total ordering service that assigns sequence numbers to events.`,
    starterCode: `interface OrderedEvent {
  eventId: string;
  sequenceNumber: number;
  timestamp: number;
  data: any;
}

class TotalOrderingService {
  // Implement total ordering
}`,
    solution: `interface OrderedEvent {
  eventId: string;
  sequenceNumber: number;
  timestamp: number;
  data: any;
}

interface EventRequest {
  eventId: string;
  data: any;
  requestTime: number;
}

class TotalOrderingService {
  private sequenceNumber: number = 0;
  private orderedEvents: OrderedEvent[] = [];
  private pendingRequests: EventRequest[] = [];

  submitEvent(eventId: string, data: any): Promise<OrderedEvent> {
    const request: EventRequest = {
      eventId,
      data,
      requestTime: Date.now()
    };

    this.pendingRequests.push(request);

    return new Promise((resolve) => {
      // Simulate async processing
      setTimeout(() => {
        const orderedEvent = this.processEvent(request);
        resolve(orderedEvent);
      }, 10);
    });
  }

  private processEvent(request: EventRequest): OrderedEvent {
    const orderedEvent: OrderedEvent = {
      eventId: request.eventId,
      sequenceNumber: ++this.sequenceNumber,
      timestamp: Date.now(),
      data: request.data
    };

    this.orderedEvents.push(orderedEvent);

    // Remove from pending
    const index = this.pendingRequests.indexOf(request);
    if (index > -1) {
      this.pendingRequests.splice(index, 1);
    }

    return orderedEvent;
  }

  getOrderedEvents(): OrderedEvent[] {
    return [...this.orderedEvents];
  }

  getEventBySequence(sequenceNumber: number): OrderedEvent | undefined {
    return this.orderedEvents.find(e => e.sequenceNumber === sequenceNumber);
  }

  getEventsInRange(start: number, end: number): OrderedEvent[] {
    return this.orderedEvents.filter(
      e => e.sequenceNumber >= start && e.sequenceNumber <= end
    );
  }

  getCurrentSequence(): number {
    return this.sequenceNumber;
  }

  getPendingCount(): number {
    return this.pendingRequests.length;
  }
}`,
    testCases: [
      {
        input: 'Submit multiple events',
        expectedOutput: 'Events assigned sequential numbers',
        isHidden: false,
        description: 'Should assign total order to events'
      },
      {
        input: 'Retrieve events by sequence',
        expectedOutput: 'Events returned in total order',
        isHidden: false,
        description: 'Should maintain total ordering'
      }
    ],
    hints: [
      'Centralized sequencer assigns numbers',
      'Increment sequence number for each event',
      'Maintain ordered list of events',
      'Handle async event submission'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex08',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Clock Drift Simulator',
    difficulty: 2,
    description: `Simulate clock drift in distributed systems and measure the divergence over time.`,
    starterCode: `class ClockDriftSimulator {
  // Implement clock drift simulation
}`,
    solution: `interface Clock {
  id: string;
  currentTime: number;
  driftRate: number; // Parts per million (ppm)
  lastUpdate: number;
}

class ClockDriftSimulator {
  private clocks: Map<string, Clock> = new Map();
  private referenceTime: number;

  constructor() {
    this.referenceTime = Date.now();
  }

  addClock(id: string, driftRate: number): void {
    this.clocks.set(id, {
      id,
      currentTime: this.referenceTime,
      driftRate,
      lastUpdate: this.referenceTime
    });
  }

  simulate(durationMs: number, steps: number = 100): void {
    const stepSize = durationMs / steps;

    for (let i = 0; i < steps; i++) {
      this.clocks.forEach(clock => {
        this.updateClock(clock, stepSize);
      });
    }
  }

  private updateClock(clock: Clock, elapsedMs: number): void {
    // Calculate drift: drift = elapsed * (driftRate / 1_000_000)
    const drift = elapsedMs * (clock.driftRate / 1_000_000);
    clock.currentTime += elapsedMs + drift;
    clock.lastUpdate += elapsedMs;
  }

  getClockTime(id: string): number | null {
    const clock = this.clocks.get(id);
    return clock ? clock.currentTime : null;
  }

  getSkew(clockA: string, clockB: string): number | null {
    const timeA = this.getClockTime(clockA);
    const timeB = this.getClockTime(clockB);

    if (timeA === null || timeB === null) {
      return null;
    }

    return timeA - timeB;
  }

  getAllSkews(): Map<string, number> {
    const skews = new Map<string, number>();

    if (this.clocks.size < 2) {
      return skews;
    }

    const clockIds = Array.from(this.clocks.keys());
    const referenceClock = clockIds[0];
    const referenceTime = this.getClockTime(referenceClock)!;

    clockIds.forEach(id => {
      const time = this.getClockTime(id)!;
      skews.set(id, time - referenceTime);
    });

    return skews;
  }

  synchronizeClocks(targetClockId: string): void {
    const targetTime = this.getClockTime(targetClockId);
    if (targetTime === null) {
      return;
    }

    this.clocks.forEach(clock => {
      if (clock.id !== targetClockId) {
        clock.currentTime = targetTime;
      }
    });
  }

  reset(): void {
    this.referenceTime = Date.now();
    this.clocks.forEach(clock => {
      clock.currentTime = this.referenceTime;
      clock.lastUpdate = this.referenceTime;
    });
  }

  getMaxSkew(): number {
    if (this.clocks.size < 2) {
      return 0;
    }

    const times = Array.from(this.clocks.values()).map(c => c.currentTime);
    return Math.max(...times) - Math.min(...times);
  }
}`,
    testCases: [
      {
        input: 'Add clocks with different drift rates',
        expectedOutput: 'Clocks registered',
        isHidden: false,
        description: 'Should track multiple clocks'
      },
      {
        input: 'Simulate time passing',
        expectedOutput: 'Clocks diverge based on drift rates',
        isHidden: false,
        description: 'Should simulate clock drift'
      },
      {
        input: 'Measure skew between clocks',
        expectedOutput: 'Correct skew calculated',
        isHidden: false,
        description: 'Should calculate clock skew'
      }
    ],
    hints: [
      'Drift rate in parts per million (ppm)',
      'Update each clock based on elapsed time and drift',
      'Skew is difference between two clocks',
      'Track maximum divergence across all clocks'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex09',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Event Log with Causal Ordering',
    difficulty: 3,
    description: `Implement an event log that maintains causal ordering of events across distributed processes.`,
    starterCode: `interface LogEntry {
  eventId: string;
  processId: string;
  vector: Map<string, number>;
  content: any;
}

class CausalEventLog {
  // Implement causal event log
}`,
    solution: `interface LogEntry {
  eventId: string;
  processId: string;
  vector: Map<string, number>;
  content: any;
  timestamp: number;
}

class CausalEventLog {
  private log: LogEntry[] = [];
  private processId: string;
  private vector: Map<string, number>;
  private processes: Set<string>;

  constructor(processId: string, allProcesses: string[]) {
    this.processId = processId;
    this.processes = new Set(allProcesses);
    this.vector = new Map();

    allProcesses.forEach(pid => {
      this.vector.set(pid, 0);
    });
  }

  append(eventId: string, content: any): LogEntry {
    // Increment own clock
    const currentValue = this.vector.get(this.processId) || 0;
    this.vector.set(this.processId, currentValue + 1);

    const entry: LogEntry = {
      eventId,
      processId: this.processId,
      vector: new Map(this.vector),
      content,
      timestamp: Date.now()
    };

    this.log.push(entry);
    return entry;
  }

  merge(entries: LogEntry[]): void {
    entries.forEach(entry => {
      // Update vector clock
      entry.vector.forEach((value, pid) => {
        const currentValue = this.vector.get(pid) || 0;
        this.vector.set(pid, Math.max(currentValue, value));
      });

      // Add to log if not already present
      const exists = this.log.some(e => e.eventId === entry.eventId);
      if (!exists) {
        this.log.push(entry);
      }
    });

    // Sort log by causal order
    this.sortLog();
  }

  private sortLog(): void {
    this.log.sort((a, b) => {
      // Try to order by vector clock
      const aBeforeB = this.vectorLessThan(a.vector, b.vector);
      const bBeforeA = this.vectorLessThan(b.vector, a.vector);

      if (aBeforeB) return -1;
      if (bBeforeA) return 1;

      // Concurrent events: order by timestamp, then eventId
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      return a.eventId.localeCompare(b.eventId);
    });
  }

  private vectorLessThan(a: Map<string, number>, b: Map<string, number>): boolean {
    let hasLess = false;
    let allLessOrEqual = true;

    this.processes.forEach(pid => {
      const aVal = a.get(pid) || 0;
      const bVal = b.get(pid) || 0;

      if (aVal > bVal) {
        allLessOrEqual = false;
      }
      if (aVal < bVal) {
        hasLess = true;
      }
    });

    return allLessOrEqual && hasLess;
  }

  getLog(): LogEntry[] {
    return [...this.log];
  }

  getLogSince(vector: Map<string, number>): LogEntry[] {
    return this.log.filter(entry => {
      return !this.vectorLessThanOrEqual(entry.vector, vector);
    });
  }

  private vectorLessThanOrEqual(a: Map<string, number>, b: Map<string, number>): boolean {
    let allLessOrEqual = true;

    this.processes.forEach(pid => {
      const aVal = a.get(pid) || 0;
      const bVal = b.get(pid) || 0;

      if (aVal > bVal) {
        allLessOrEqual = false;
      }
    });

    return allLessOrEqual;
  }

  getVector(): Map<string, number> {
    return new Map(this.vector);
  }

  size(): number {
    return this.log.size();
  }
}`,
    testCases: [
      {
        input: 'Append events',
        expectedOutput: 'Events added to log with vector clocks',
        isHidden: false,
        description: 'Should append events to log'
      },
      {
        input: 'Merge logs from different processes',
        expectedOutput: 'Logs merged and sorted in causal order',
        isHidden: false,
        description: 'Should merge logs maintaining causal order'
      }
    ],
    hints: [
      'Attach vector clock to each log entry',
      'Sort entries by causal order',
      'Use timestamp for concurrent events',
      'Support incremental log synchronization'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex10',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Distributed Snapshot Algorithm',
    difficulty: 4,
    description: `Implement the Chandy-Lamport snapshot algorithm for capturing a consistent global state.`,
    starterCode: `interface ProcessState {
  processId: string;
  localState: any;
  channelStates: Map<string, any[]>;
}

class DistributedSnapshot {
  // Implement distributed snapshot
}`,
    solution: `interface ProcessState {
  processId: string;
  localState: any;
  channelStates: Map<string, any[]>;
}

interface Message {
  from: string;
  to: string;
  content: any;
  isMarker?: boolean;
}

class DistributedSnapshot {
  private processId: string;
  private state: any;
  private neighbors: Set<string>;
  private snapshotState: ProcessState | null = null;
  private recordingChannels: Map<string, any[]> = new Map();
  private markersSeen: Set<string> = new Set();
  private snapshotInitiator: boolean = false;

  constructor(processId: string, neighbors: string[], initialState: any) {
    this.processId = processId;
    this.neighbors = new Set(neighbors);
    this.state = initialState;
  }

  initiateSnapshot(): ProcessState {
    // Record own state
    this.snapshotState = {
      processId: this.processId,
      localState: JSON.parse(JSON.stringify(this.state)),
      channelStates: new Map()
    };

    this.snapshotInitiator = true;

    // Start recording on all incoming channels
    this.neighbors.forEach(neighbor => {
      this.recordingChannels.set(neighbor, []);
    });

    // Send markers to all neighbors
    // (In real implementation, would actually send messages)

    return this.snapshotState;
  }

  receiveMarker(from: string): void {
    if (!this.markersSeen.has(from)) {
      this.markersSeen.add(from);

      if (!this.snapshotState) {
        // First marker received - record own state
        this.snapshotState = {
          processId: this.processId,
          localState: JSON.parse(JSON.stringify(this.state)),
          channelStates: new Map()
        };

        // Stop recording from sender
        this.snapshotState.channelStates.set(from, []);

        // Start recording on other channels
        this.neighbors.forEach(neighbor => {
          if (neighbor !== from) {
            this.recordingChannels.set(neighbor, []);
          }
        });

        // Send markers to all neighbors (except sender)
        // (In real implementation)
      } else {
        // Subsequent marker - stop recording from this channel
        const messages = this.recordingChannels.get(from) || [];
        this.snapshotState.channelStates.set(from, messages);
        this.recordingChannels.delete(from);
      }
    }

    // Check if snapshot complete
    if (this.isSnapshotComplete()) {
      this.finalizeSnapshot();
    }
  }

  receiveMessage(message: Message): void {
    if (message.isMarker) {
      this.receiveMarker(message.from);
    } else {
      // Regular message
      // If recording from this channel, add to channel state
      if (this.recordingChannels.has(message.from)) {
        this.recordingChannels.get(message.from)!.push(message.content);
      }

      // Process message (update local state)
      // Implementation specific
    }
  }

  private isSnapshotComplete(): boolean {
    if (!this.snapshotState) {
      return false;
    }

    // Snapshot complete when we've received markers from all neighbors
    return this.markersSeen.size === this.neighbors.size;
  }

  private finalizeSnapshot(): void {
    if (!this.snapshotState) {
      return;
    }

    // Add any remaining channel states
    this.recordingChannels.forEach((messages, channel) => {
      this.snapshotState!.channelStates.set(channel, messages);
    });

    this.recordingChannels.clear();
  }

  getSnapshot(): ProcessState | null {
    return this.snapshotState;
  }

  reset(): void {
    this.snapshotState = null;
    this.recordingChannels.clear();
    this.markersSeen.clear();
    this.snapshotInitiator = false;
  }

  updateState(newState: any): void {
    this.state = newState;
  }
}`,
    testCases: [
      {
        input: 'Initiate snapshot',
        expectedOutput: 'Local state recorded, markers sent',
        isHidden: false,
        description: 'Should initiate distributed snapshot'
      },
      {
        input: 'Receive marker',
        expectedOutput: 'Channel states recorded correctly',
        isHidden: false,
        description: 'Should handle marker messages'
      },
      {
        input: 'Complete snapshot',
        expectedOutput: 'Consistent global state captured',
        isHidden: false,
        description: 'Should capture consistent snapshot'
      }
    ],
    hints: [
      'Record local state on first marker',
      'Record channel state between first marker and marker from that channel',
      'Send markers to all neighbors',
      'Snapshot complete when markers received from all'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex11',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Version Vector for Conflict Detection',
    difficulty: 3,
    description: `Implement version vectors for detecting conflicts in replicated data.`,
    starterCode: `type VersionVector = Map<string, number>;

class VersionVectorManager {
  // Implement version vector management
}`,
    solution: `type VersionVector = Map<string, number>;

interface VersionedValue {
  value: any;
  version: VersionVector;
}

class VersionVectorManager {
  private replicaId: string;
  private vector: VersionVector;
  private replicas: Set<string>;

  constructor(replicaId: string, allReplicas: string[]) {
    this.replicaId = replicaId;
    this.replicas = new Set(allReplicas);
    this.vector = new Map();

    allReplicas.forEach(rid => {
      this.vector.set(rid, 0);
    });
  }

  increment(): VersionVector {
    const current = this.vector.get(this.replicaId) || 0;
    this.vector.set(this.replicaId, current + 1);
    return this.getVector();
  }

  merge(otherVector: VersionVector): void {
    otherVector.forEach((value, rid) => {
      const current = this.vector.get(rid) || 0;
      this.vector.set(rid, Math.max(current, value));
    });
  }

  getVector(): VersionVector {
    return new Map(this.vector);
  }

  // Check if vectorA happened before vectorB
  happenedBefore(vectorA: VersionVector, vectorB: VersionVector): boolean {
    let hasLess = false;
    let allLessOrEqual = true;

    this.replicas.forEach(rid => {
      const a = vectorA.get(rid) || 0;
      const b = vectorB.get(rid) || 0;

      if (a > b) {
        allLessOrEqual = false;
      }
      if (a < b) {
        hasLess = true;
      }
    });

    return allLessOrEqual && hasLess;
  }

  // Check if two version vectors are concurrent (conflict)
  isConflict(vectorA: VersionVector, vectorB: VersionVector): boolean {
    return !this.happenedBefore(vectorA, vectorB) &&
           !this.happenedBefore(vectorB, vectorA) &&
           !this.areEqual(vectorA, vectorB);
  }

  areEqual(vectorA: VersionVector, vectorB: VersionVector): boolean {
    let equal = true;

    this.replicas.forEach(rid => {
      const a = vectorA.get(rid) || 0;
      const b = vectorB.get(rid) || 0;
      if (a !== b) {
        equal = false;
      }
    });

    return equal;
  }

  // Determine which values to keep (dominating versions)
  reconcile(values: VersionedValue[]): VersionedValue[] {
    const dominating: VersionedValue[] = [];

    values.forEach(valueA => {
      let isDominated = false;

      for (const valueB of values) {
        if (valueA !== valueB &&
            this.happenedBefore(valueA.version, valueB.version)) {
          isDominated = true;
          break;
        }
      }

      if (!isDominated) {
        dominating.push(valueA);
      }
    });

    return dominating;
  }
}`,
    testCases: [
      {
        input: 'Increment version vector',
        expectedOutput: 'Own position incremented',
        isHidden: false,
        description: 'Should increment version vector'
      },
      {
        input: 'Detect conflict between concurrent versions',
        expectedOutput: 'Conflict detected',
        isHidden: false,
        description: 'Should detect version conflicts'
      },
      {
        input: 'Reconcile conflicting versions',
        expectedOutput: 'Dominating versions identified',
        isHidden: false,
        description: 'Should reconcile conflicts'
      }
    ],
    hints: [
      'Version vector tracks updates from each replica',
      'Conflict when neither vector dominates',
      'Reconcile by finding non-dominated versions',
      'Merge takes component-wise maximum'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex12',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Timestamp Ordering for Transactions',
    difficulty: 3,
    description: `Implement timestamp-based concurrency control for distributed transactions.`,
    starterCode: `interface Transaction {
  id: string;
  timestamp: number;
  operations: Operation[];
}

interface Operation {
  type: 'read' | 'write';
  key: string;
  value?: any;
}

class TimestampOrdering {
  // Implement timestamp ordering
}`,
    solution: `interface Transaction {
  id: string;
  timestamp: number;
  operations: Operation[];
  status: 'active' | 'committed' | 'aborted';
}

interface Operation {
  type: 'read' | 'write';
  key: string;
  value?: any;
}

interface DataItem {
  value: any;
  readTimestamp: number;
  writeTimestamp: number;
}

class TimestampOrdering {
  private data: Map<string, DataItem> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private timestampCounter: number = 0;

  beginTransaction(id: string): Transaction {
    const transaction: Transaction = {
      id,
      timestamp: ++this.timestampCounter,
      operations: [],
      status: 'active'
    };

    this.transactions.set(id, transaction);
    return transaction;
  }

  read(transactionId: string, key: string): any | null {
    const transaction = this.transactions.get(transactionId);
    if (!transaction || transaction.status !== 'active') {
      return null;
    }

    let item = this.data.get(key);
    if (!item) {
      item = {
        value: null,
        readTimestamp: 0,
        writeTimestamp: 0
      };
      this.data.set(key, item);
    }

    // Check timestamp ordering rule for reads
    if (transaction.timestamp < item.writeTimestamp) {
      // Transaction reading a value written by a later transaction - abort
      this.abort(transactionId);
      throw new Error(\`Transaction \${transactionId} aborted - timestamp ordering violation on read\`);
    }

    // Update read timestamp
    item.readTimestamp = Math.max(item.readTimestamp, transaction.timestamp);

    transaction.operations.push({ type: 'read', key });

    return item.value;
  }

  write(transactionId: string, key: string, value: any): boolean {
    const transaction = this.transactions.get(transactionId);
    if (!transaction || transaction.status !== 'active') {
      return false;
    }

    let item = this.data.get(key);
    if (!item) {
      item = {
        value: null,
        readTimestamp: 0,
        writeTimestamp: 0
      };
      this.data.set(key, item);
    }

    // Check timestamp ordering rules for writes
    if (transaction.timestamp < item.readTimestamp) {
      // Transaction writing a value that was read by a later transaction - abort
      this.abort(transactionId);
      throw new Error(\`Transaction \${transactionId} aborted - timestamp ordering violation on write (read)\`);
    }

    if (transaction.timestamp < item.writeTimestamp) {
      // Transaction writing a value that was written by a later transaction - abort (or ignore write)
      // Thomas Write Rule: can ignore this write
      transaction.operations.push({ type: 'write', key, value });
      return true;
    }

    // Perform write
    item.value = value;
    item.writeTimestamp = transaction.timestamp;

    transaction.operations.push({ type: 'write', key, value });

    return true;
  }

  commit(transactionId: string): boolean {
    const transaction = this.transactions.get(transactionId);
    if (!transaction || transaction.status !== 'active') {
      return false;
    }

    transaction.status = 'committed';
    return true;
  }

  abort(transactionId: string): void {
    const transaction = this.transactions.get(transactionId);
    if (transaction) {
      transaction.status = 'aborted';
    }
  }

  getTransaction(id: string): Transaction | undefined {
    return this.transactions.get(id);
  }

  getData(key: string): any {
    return this.data.get(key)?.value;
  }
}`,
    testCases: [
      {
        input: 'Transaction with valid timestamp ordering',
        expectedOutput: 'Transaction commits successfully',
        isHidden: false,
        description: 'Should allow transactions in timestamp order'
      },
      {
        input: 'Transaction violates timestamp ordering',
        expectedOutput: 'Transaction aborted',
        isHidden: false,
        description: 'Should abort transactions violating ordering'
      }
    ],
    hints: [
      'Assign monotonically increasing timestamps',
      'Track read and write timestamps per data item',
      'Abort if T(i) < write timestamp on read',
      'Abort if T(i) < read timestamp on write'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex13',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Message Reordering Detector',
    difficulty: 2,
    description: `Build a system that detects when messages arrive out of order and can reorder them.`,
    starterCode: `interface SequencedMessage {
  id: string;
  sequence: number;
  content: any;
}

class MessageReorderingDetector {
  // Implement message reordering detection
}`,
    solution: `interface SequencedMessage {
  id: string;
  sequence: number;
  content: any;
  receivedAt: number;
}

class MessageReorderingDetector {
  private expectedSequence: number = 1;
  private buffer: Map<number, SequencedMessage> = new Map();
  private delivered: SequencedMessage[] = [];
  private reorderedCount: number = 0;

  receiveMessage(message: SequencedMessage): void {
    const receivedMessage = {
      ...message,
      receivedAt: Date.now()
    };

    if (message.sequence === this.expectedSequence) {
      // In-order message
      this.deliverMessage(receivedMessage);
      this.expectedSequence++;

      // Check buffer for subsequent messages
      this.deliverBuffered();
    } else if (message.sequence > this.expectedSequence) {
      // Out-of-order message (early arrival)
      this.buffer.set(message.sequence, receivedMessage);
      this.reorderedCount++;
    } else {
      // Duplicate or very late message - ignore
      console.warn(\`Ignoring duplicate/late message: \${message.id}\`);
    }
  }

  private deliverMessage(message: SequencedMessage): void {
    this.delivered.push(message);
  }

  private deliverBuffered(): void {
    while (this.buffer.has(this.expectedSequence)) {
      const message = this.buffer.get(this.expectedSequence)!;
      this.buffer.delete(this.expectedSequence);
      this.deliverMessage(message);
      this.expectedSequence++;
    }
  }

  getDelivered(): SequencedMessage[] {
    return [...this.delivered];
  }

  getBufferSize(): number {
    return this.buffer.size;
  }

  getReorderedCount(): number {
    return this.reorderedCount;
  }

  getMissingSequences(): number[] {
    if (this.buffer.size === 0) {
      return [];
    }

    const bufferedSequences = Array.from(this.buffer.keys()).sort((a, b) => a - b);
    const missing: number[] = [];

    for (let seq = this.expectedSequence; seq < bufferedSequences[bufferedSequences.length - 1]; seq++) {
      if (!this.buffer.has(seq)) {
        missing.push(seq);
      }
    }

    return missing;
  }

  reset(): void {
    this.expectedSequence = 1;
    this.buffer.clear();
    this.delivered = [];
    this.reorderedCount = 0;
  }
}`,
    testCases: [
      {
        input: 'Messages arrive in order',
        expectedOutput: 'Delivered immediately, no buffering',
        isHidden: false,
        description: 'Should handle in-order messages'
      },
      {
        input: 'Message arrives out of order',
        expectedOutput: 'Buffered until gap filled',
        isHidden: false,
        description: 'Should buffer out-of-order messages'
      },
      {
        input: 'Missing message arrives',
        expectedOutput: 'Gap filled, buffered messages delivered',
        isHidden: false,
        description: 'Should deliver buffered messages when gap filled'
      }
    ],
    hints: [
      'Track expected next sequence number',
      'Buffer messages that arrive early',
      'Deliver buffered messages when gap is filled',
      'Detect and report missing sequences'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex14',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Event Time vs Processing Time',
    difficulty: 3,
    description: `Implement a system that tracks both event time (when event occurred) and processing time (when event was processed), handling out-of-order events.`,
    starterCode: `interface TimedEvent {
  id: string;
  eventTime: number;
  processingTime?: number;
  data: any;
}

class EventTimeProcessor {
  // Implement event time processing
}`,
    solution: `interface TimedEvent {
  id: string;
  eventTime: number;
  processingTime?: number;
  data: any;
}

interface TimeWindow {
  start: number;
  end: number;
  events: TimedEvent[];
}

class EventTimeProcessor {
  private events: TimedEvent[] = [];
  private watermark: number = 0;
  private allowedLateness: number;

  constructor(allowedLateness: number = 5000) { // 5 seconds default
    this.allowedLateness = allowedLateness;
  }

  processEvent(event: TimedEvent): { accepted: boolean; reason?: string } {
    const processingTime = Date.now();
    const eventWithProcessingTime = {
      ...event,
      processingTime
    };

    // Check if event is too late (before watermark - allowed lateness)
    if (event.eventTime < this.watermark - this.allowedLateness) {
      return {
        accepted: false,
        reason: 'Event too late - beyond allowed lateness'
      };
    }

    this.events.push(eventWithProcessingTime);

    // Update watermark (simulated)
    // In real system, watermark would be based on event time progress
    this.updateWatermark(event.eventTime);

    return { accepted: true };
  }

  private updateWatermark(eventTime: number): void {
    // Simplified watermark: max event time seen minus allowed lateness
    const maxEventTime = Math.max(
      ...this.events.map(e => e.eventTime),
      eventTime
    );

    this.watermark = Math.max(this.watermark, maxEventTime - this.allowedLateness);
  }

  getEventsInWindow(startTime: number, endTime: number): TimedEvent[] {
    return this.events
      .filter(e => e.eventTime >= startTime && e.eventTime < endTime)
      .sort((a, b) => a.eventTime - b.eventTime);
  }

  getTumblingWindows(windowSize: number): TimeWindow[] {
    if (this.events.length === 0) {
      return [];
    }

    const minTime = Math.min(...this.events.map(e => e.eventTime));
    const maxTime = Math.max(...this.events.map(e => e.eventTime));

    const windows: TimeWindow[] = [];
    let start = Math.floor(minTime / windowSize) * windowSize;

    while (start <= maxTime) {
      const end = start + windowSize;
      const windowEvents = this.getEventsInWindow(start, end);

      if (windowEvents.length > 0) {
        windows.push({ start, end, events: windowEvents });
      }

      start = end;
    }

    return windows;
  }

  getSlidingWindows(windowSize: number, slideSize: number): TimeWindow[] {
    if (this.events.length === 0) {
      return [];
    }

    const minTime = Math.min(...this.events.map(e => e.eventTime));
    const maxTime = Math.max(...this.events.map(e => e.eventTime));

    const windows: TimeWindow[] = [];
    let start = Math.floor(minTime / slideSize) * slideSize;

    while (start <= maxTime) {
      const end = start + windowSize;
      const windowEvents = this.getEventsInWindow(start, end);

      if (windowEvents.length > 0) {
        windows.push({ start, end, events: windowEvents });
      }

      start += slideSize;
    }

    return windows;
  }

  getLateness(): Array<{ eventId: string; lateness: number }> {
    return this.events
      .filter(e => e.processingTime !== undefined)
      .map(e => ({
        eventId: e.id,
        lateness: e.processingTime! - e.eventTime
      }))
      .sort((a, b) => b.lateness - a.lateness);
  }

  getWatermark(): number {
    return this.watermark;
  }

  getEventCount(): number {
    return this.events.length;
  }
}`,
    testCases: [
      {
        input: 'Process events with varying event times',
        expectedOutput: 'Events accepted and tracked',
        isHidden: false,
        description: 'Should track event time vs processing time'
      },
      {
        input: 'Events arrive late but within allowed lateness',
        expectedOutput: 'Events accepted',
        isHidden: false,
        description: 'Should handle late events within bounds'
      },
      {
        input: 'Events arrive too late',
        expectedOutput: 'Events rejected',
        isHidden: false,
        description: 'Should reject events beyond allowed lateness'
      }
    ],
    hints: [
      'Event time is when event occurred',
      'Processing time is when event was processed',
      'Watermark tracks event time progress',
      'Allow late events within configured lateness bound'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex15',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Logical Clock Comparison Utility',
    difficulty: 2,
    description: `Create a utility library for comparing and manipulating different types of logical clocks.`,
    starterCode: `type LamportTimestamp = number;
type VectorTimestamp = Map<string, number>;
type HLCTimestamp = { physical: number; logical: number };

class LogicalClockUtils {
  // Implement clock utilities
}`,
    solution: `type LamportTimestamp = number;
type VectorTimestamp = Map<string, number>;
type HLCTimestamp = { physical: number; logical: number };

class LogicalClockUtils {
  // Lamport Clock utilities
  static compareLamport(a: LamportTimestamp, b: LamportTimestamp): number {
    return a - b;
  }

  static lamportHappensBefore(a: LamportTimestamp, b: LamportTimestamp): boolean {
    return a < b;
  }

  // Vector Clock utilities
  static compareVector(
    a: VectorTimestamp,
    b: VectorTimestamp,
    processes: string[]
  ): 'less' | 'greater' | 'equal' | 'concurrent' {
    let hasLess = false;
    let hasGreater = false;

    processes.forEach(pid => {
      const aVal = a.get(pid) || 0;
      const bVal = b.get(pid) || 0;

      if (aVal < bVal) hasLess = true;
      if (aVal > bVal) hasGreater = true;
    });

    if (!hasLess && !hasGreater) return 'equal';
    if (hasLess && !hasGreater) return 'less';
    if (!hasLess && hasGreater) return 'greater';
    return 'concurrent';
  }

  static vectorHappensBefore(
    a: VectorTimestamp,
    b: VectorTimestamp,
    processes: string[]
  ): boolean {
    return this.compareVector(a, b, processes) === 'less';
  }

  static vectorConcurrent(
    a: VectorTimestamp,
    b: VectorTimestamp,
    processes: string[]
  ): boolean {
    return this.compareVector(a, b, processes) === 'concurrent';
  }

  static mergeVectors(
    a: VectorTimestamp,
    b: VectorTimestamp,
    processes: string[]
  ): VectorTimestamp {
    const result = new Map<string, number>();

    processes.forEach(pid => {
      const aVal = a.get(pid) || 0;
      const bVal = b.get(pid) || 0;
      result.set(pid, Math.max(aVal, bVal));
    });

    return result;
  }

  // HLC utilities
  static compareHLC(a: HLCTimestamp, b: HLCTimestamp): number {
    if (a.physical !== b.physical) {
      return a.physical - b.physical;
    }
    return a.logical - b.logical;
  }

  static hlcHappensBefore(a: HLCTimestamp, b: HLCTimestamp): boolean {
    return this.compareHLC(a, b) < 0;
  }

  static hlcToString(timestamp: HLCTimestamp): string {
    return \`\${timestamp.physical}.\${timestamp.logical}\`;
  }

  static hlcFromString(str: string): HLCTimestamp {
    const [physical, logical] = str.split('.').map(Number);
    return { physical, logical };
  }

  // Conversion utilities
  static vectorToString(vector: VectorTimestamp): string {
    const entries: string[] = [];
    vector.forEach((value, key) => {
      entries.push(\`\${key}:\${value}\`);
    });
    return \`{\${entries.join(', ')}}\`;
  }

  static vectorFromString(str: string, processes: string[]): VectorTimestamp {
    const vector = new Map<string, number>();

    // Initialize with zeros
    processes.forEach(pid => vector.set(pid, 0));

    // Parse string
    const content = str.slice(1, -1); // Remove { }
    if (content) {
      content.split(', ').forEach(entry => {
        const [key, value] = entry.split(':');
        vector.set(key, parseInt(value));
      });
    }

    return vector;
  }

  // Utility for debugging
  static printComparison(
    a: any,
    b: any,
    type: 'lamport' | 'vector' | 'hlc',
    processes?: string[]
  ): string {
    switch (type) {
      case 'lamport':
        const cmpL = this.compareLamport(a, b);
        return \`Lamport: \${a} \${cmpL < 0 ? '<' : cmpL > 0 ? '>' : '='} \${b}\`;

      case 'vector':
        const cmpV = this.compareVector(a, b, processes!);
        return \`Vector: \${this.vectorToString(a)} \${cmpV} \${this.vectorToString(b)}\`;

      case 'hlc':
        const cmpH = this.compareHLC(a, b);
        return \`HLC: \${this.hlcToString(a)} \${cmpH < 0 ? '<' : cmpH > 0 ? '>' : '='} \${this.hlcToString(b)}\`;

      default:
        return 'Unknown type';
    }
  }
}`,
    testCases: [
      {
        input: 'Compare Lamport timestamps',
        expectedOutput: 'Correct ordering determined',
        isHidden: false,
        description: 'Should compare Lamport clocks'
      },
      {
        input: 'Compare vector clocks',
        expectedOutput: 'Correct relationship (less/greater/concurrent)',
        isHidden: false,
        description: 'Should compare vector clocks'
      },
      {
        input: 'Merge vector clocks',
        expectedOutput: 'Component-wise maximum',
        isHidden: false,
        description: 'Should merge vector clocks'
      }
    ],
    hints: [
      'Provide comparison methods for each clock type',
      'Support serialization/deserialization',
      'Implement merge operation for vector clocks',
      'Provide debugging/visualization utilities'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t2-ex16',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Causal Broadcast Implementation',
    difficulty: 4,
    description: `Implement a causal broadcast protocol that ensures messages are delivered in causal order to all processes.`,
    starterCode: `interface CausalMessage {
  from: string;
  vector: Map<string, number>;
  content: any;
}

class CausalBroadcast {
  // Implement causal broadcast
}`,
    solution: `interface CausalMessage {
  from: string;
  vector: Map<string, number>;
  content: any;
  id: string;
}

class CausalBroadcast {
  private processId: string;
  private vector: Map<string, number>;
  private processes: Set<string>;
  private pending: CausalMessage[] = [];
  private delivered: CausalMessage[] = [];
  private deliveryCallbacks: Array<(msg: CausalMessage) => void> = [];

  constructor(processId: string, allProcesses: string[]) {
    this.processId = processId;
    this.processes = new Set(allProcesses);
    this.vector = new Map();

    allProcesses.forEach(pid => {
      this.vector.set(pid, 0);
    });
  }

  broadcast(content: any): CausalMessage {
    // Increment own clock
    const current = this.vector.get(this.processId) || 0;
    this.vector.set(this.processId, current + 1);

    const message: CausalMessage = {
      id: \`\${this.processId}-\${current + 1}\`,
      from: this.processId,
      vector: new Map(this.vector),
      content
    };

    // Deliver to self immediately
    this.deliverMessage(message);

    return message;
  }

  receive(message: CausalMessage): void {
    // Add to pending
    this.pending.push(message);

    // Try to deliver pending messages
    this.tryDeliverPending();
  }

  private tryDeliverPending(): void {
    let delivered = true;

    while (delivered) {
      delivered = false;

      for (let i = 0; i < this.pending.length; i++) {
        const message = this.pending[i];

        if (this.canDeliver(message)) {
          // Remove from pending
          this.pending.splice(i, 1);

          // Deliver
          this.deliverMessage(message);

          delivered = true;
          break;
        }
      }
    }
  }

  private canDeliver(message: CausalMessage): boolean {
    // Can deliver if:
    // 1. V_msg[sender] = V_local[sender] + 1
    // 2. V_msg[k] <= V_local[k] for all k != sender

    const senderClock = message.vector.get(message.from) || 0;
    const localSenderClock = this.vector.get(message.from) || 0;

    if (senderClock !== localSenderClock + 1) {
      return false;
    }

    for (const pid of this.processes) {
      if (pid !== message.from) {
        const messageClock = message.vector.get(pid) || 0;
        const localClock = this.vector.get(pid) || 0;

        if (messageClock > localClock) {
          return false;
        }
      }
    }

    return true;
  }

  private deliverMessage(message: CausalMessage): void {
    // Update vector clock
    message.vector.forEach((value, pid) => {
      const current = this.vector.get(pid) || 0;
      this.vector.set(pid, Math.max(current, value));
    });

    // Add to delivered
    this.delivered.push(message);

    // Notify callbacks
    this.deliveryCallbacks.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error('Error in delivery callback:', error);
      }
    });
  }

  onDeliver(callback: (msg: CausalMessage) => void): void {
    this.deliveryCallbacks.push(callback);
  }

  getDelivered(): CausalMessage[] {
    return [...this.delivered];
  }

  getPendingCount(): number {
    return this.pending.length;
  }

  getVector(): Map<string, number> {
    return new Map(this.vector);
  }
}`,
    testCases: [
      {
        input: 'Broadcast messages in causal order',
        expectedOutput: 'All processes deliver in same causal order',
        isHidden: false,
        description: 'Should maintain causal order across all processes'
      },
      {
        input: 'Concurrent broadcasts',
        expectedOutput: 'All processes deliver, may be different order',
        isHidden: false,
        description: 'Should handle concurrent broadcasts'
      }
    ],
    hints: [
      'Use vector clocks for causality tracking',
      'Buffer messages that arrive too early',
      'Deliver when causal dependencies satisfied',
      'Support callback notification on delivery'
    ],
    language: 'typescript'
  }
];
