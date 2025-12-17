import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs401-t1-ex01',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Simple RPC Client Implementation',
    difficulty: 2,
    description: `Implement a simple RPC client that can make remote procedure calls to a server.

Your implementation should:
- Create a client that connects to a remote server
- Serialize function calls and parameters
- Send requests and receive responses
- Handle basic error cases (timeout, connection failure)`,
    starterCode: `interface RPCClient {
  connect(host: string, port: number): Promise<void>;
  call(method: string, params: any[]): Promise<any>;
  disconnect(): Promise<void>;
}

class SimpleRPCClient implements RPCClient {
  // Implement the RPC client
}

// Example usage:
// const client = new SimpleRPCClient();
// await client.connect('localhost', 8080);
// const result = await client.call('add', [5, 3]);
// console.log(result); // 8`,
    solution: `interface RPCClient {
  connect(host: string, port: number): Promise<void>;
  call(method: string, params: any[]): Promise<any>;
  disconnect(): Promise<void>;
}

class SimpleRPCClient implements RPCClient {
  private socket: any = null;
  private requestId: number = 0;
  private pendingRequests: Map<number, { resolve: Function, reject: Function }> = new Map();

  async connect(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      // Simulated connection (in real implementation, use net.Socket)
      this.socket = { connected: true, host, port };

      // Simulate receiving responses
      this.socket.onMessage = (message: string) => {
        const response = JSON.parse(message);
        const pending = this.pendingRequests.get(response.id);
        if (pending) {
          if (response.error) {
            pending.reject(new Error(response.error));
          } else {
            pending.resolve(response.result);
          }
          this.pendingRequests.delete(response.id);
        }
      };

      resolve();
    });
  }

  async call(method: string, params: any[]): Promise<any> {
    if (!this.socket?.connected) {
      throw new Error('Not connected to server');
    }

    const id = ++this.requestId;
    const request = {
      id,
      method,
      params,
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      // Set timeout for request
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error('Request timeout'));
      }, 5000);

      this.pendingRequests.set(id, {
        resolve: (result: any) => {
          clearTimeout(timeout);
          resolve(result);
        },
        reject: (error: Error) => {
          clearTimeout(timeout);
          reject(error);
        }
      });

      // Send request (simulated)
      const message = JSON.stringify(request);
      // this.socket.send(message);
    });
  }

  async disconnect(): Promise<void> {
    if (this.socket) {
      this.socket.connected = false;
      this.socket = null;
    }
    // Reject all pending requests
    this.pendingRequests.forEach(({ reject }) => {
      reject(new Error('Connection closed'));
    });
    this.pendingRequests.clear();
  }
}`,
    testCases: [
      {
        input: 'connect("localhost", 8080)',
        expectedOutput: 'Connected successfully',
        isHidden: false,
        description: 'Should connect to server'
      },
      {
        input: 'call("add", [5, 3])',
        expectedOutput: '8',
        isHidden: false,
        description: 'Should execute remote procedure call'
      },
      {
        input: 'call("add", []) when not connected',
        expectedOutput: 'Error: Not connected to server',
        isHidden: false,
        description: 'Should handle disconnected state'
      }
    ],
    hints: [
      'Use a Map to track pending requests by request ID',
      'Implement timeout mechanism using setTimeout',
      'Handle connection state properly',
      'Serialize requests as JSON for transmission'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex02',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Service Discovery Mock',
    difficulty: 2,
    description: `Implement a simple service discovery system that allows services to register and discover each other.

Your implementation should:
- Allow services to register with name, host, and port
- Support service lookup by name
- Handle service deregistration
- Implement health checking (mark unhealthy services as unavailable)`,
    starterCode: `interface ServiceInfo {
  name: string;
  host: string;
  port: number;
  healthy: boolean;
}

class ServiceRegistry {
  // Implement service discovery
}`,
    solution: `interface ServiceInfo {
  name: string;
  host: string;
  port: number;
  healthy: boolean;
  lastHeartbeat: number;
}

class ServiceRegistry {
  private services: Map<string, ServiceInfo[]> = new Map();
  private healthCheckInterval: number = 5000; // 5 seconds

  constructor() {
    // Start health check loop
    setInterval(() => this.checkHealth(), this.healthCheckInterval);
  }

  register(name: string, host: string, port: number): void {
    const service: ServiceInfo = {
      name,
      host,
      port,
      healthy: true,
      lastHeartbeat: Date.now()
    };

    if (!this.services.has(name)) {
      this.services.set(name, []);
    }

    const instances = this.services.get(name)!;
    // Remove existing instance with same host:port
    const filtered = instances.filter(s => !(s.host === host && s.port === port));
    filtered.push(service);
    this.services.set(name, filtered);
  }

  discover(name: string): ServiceInfo[] {
    const instances = this.services.get(name) || [];
    return instances.filter(s => s.healthy);
  }

  deregister(name: string, host: string, port: number): void {
    const instances = this.services.get(name);
    if (instances) {
      const filtered = instances.filter(s => !(s.host === host && s.port === port));
      this.services.set(name, filtered);
    }
  }

  heartbeat(name: string, host: string, port: number): void {
    const instances = this.services.get(name);
    if (instances) {
      const service = instances.find(s => s.host === host && s.port === port);
      if (service) {
        service.lastHeartbeat = Date.now();
        service.healthy = true;
      }
    }
  }

  private checkHealth(): void {
    const now = Date.now();
    const timeout = 10000; // 10 seconds

    this.services.forEach((instances) => {
      instances.forEach(service => {
        if (now - service.lastHeartbeat > timeout) {
          service.healthy = false;
        }
      });
    });
  }

  getAllServices(): Map<string, ServiceInfo[]> {
    return new Map(this.services);
  }
}`,
    testCases: [
      {
        input: 'register("api", "localhost", 8080)',
        expectedOutput: 'Service registered',
        isHidden: false,
        description: 'Should register a service'
      },
      {
        input: 'discover("api")',
        expectedOutput: '[{name: "api", host: "localhost", port: 8080, healthy: true}]',
        isHidden: false,
        description: 'Should discover registered service'
      },
      {
        input: 'discover("unknown")',
        expectedOutput: '[]',
        isHidden: false,
        description: 'Should return empty array for unknown service'
      }
    ],
    hints: [
      'Use a Map with service name as key and array of instances as value',
      'Track last heartbeat timestamp for each service',
      'Implement periodic health checking with setInterval',
      'Filter unhealthy services in discover method'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex03',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Load Balancer Implementation',
    difficulty: 3,
    description: `Implement a simple round-robin load balancer that distributes requests across multiple backend servers.

Your implementation should:
- Support multiple backend servers
- Use round-robin algorithm for distribution
- Handle server health checks
- Skip unhealthy servers when distributing requests`,
    starterCode: `interface Server {
  id: string;
  host: string;
  port: number;
  healthy: boolean;
}

class LoadBalancer {
  // Implement load balancer
}`,
    solution: `interface Server {
  id: string;
  host: string;
  port: number;
  healthy: boolean;
}

class LoadBalancer {
  private servers: Server[] = [];
  private currentIndex: number = 0;

  addServer(id: string, host: string, port: number): void {
    this.servers.push({ id, host, port, healthy: true });
  }

  removeServer(id: string): void {
    this.servers = this.servers.filter(s => s.id !== id);
    // Reset index if it's out of bounds
    if (this.currentIndex >= this.servers.length) {
      this.currentIndex = 0;
    }
  }

  markHealthy(id: string, healthy: boolean): void {
    const server = this.servers.find(s => s.id === id);
    if (server) {
      server.healthy = healthy;
    }
  }

  getNextServer(): Server | null {
    const healthyServers = this.servers.filter(s => s.healthy);

    if (healthyServers.length === 0) {
      return null;
    }

    // Find next healthy server using round-robin
    let attempts = 0;
    while (attempts < this.servers.length) {
      const server = this.servers[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.servers.length;

      if (server.healthy) {
        return server;
      }
      attempts++;
    }

    return null;
  }

  getServerStats(): { total: number; healthy: number } {
    return {
      total: this.servers.length,
      healthy: this.servers.filter(s => s.healthy).length
    };
  }
}`,
    testCases: [
      {
        input: 'Add 3 servers and call getNextServer() 3 times',
        expectedOutput: 'Returns servers in round-robin order',
        isHidden: false,
        description: 'Should distribute requests in round-robin fashion'
      },
      {
        input: 'Mark server unhealthy and call getNextServer()',
        expectedOutput: 'Skips unhealthy server',
        isHidden: false,
        description: 'Should skip unhealthy servers'
      },
      {
        input: 'All servers unhealthy',
        expectedOutput: 'null',
        isHidden: false,
        description: 'Should return null when no healthy servers'
      }
    ],
    hints: [
      'Maintain a current index for round-robin',
      'Use modulo operator to wrap around server list',
      'Filter for healthy servers before selection',
      'Handle edge case when all servers are unhealthy'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex04',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Peer-to-Peer Node Implementation',
    difficulty: 3,
    description: `Implement a simple peer-to-peer node that can connect to other peers and exchange messages.

Your implementation should:
- Maintain a list of connected peers
- Support adding and removing peers
- Broadcast messages to all peers
- Handle peer discovery (find peers of peers)`,
    starterCode: `interface Peer {
  id: string;
  address: string;
}

class P2PNode {
  // Implement P2P node
}`,
    solution: `interface Peer {
  id: string;
  address: string;
}

interface Message {
  from: string;
  content: any;
  timestamp: number;
}

class P2PNode {
  private id: string;
  private peers: Map<string, Peer> = new Map();
  private messageHandler: ((msg: Message) => void) | null = null;

  constructor(id: string) {
    this.id = id;
  }

  addPeer(peer: Peer): void {
    if (peer.id !== this.id) {
      this.peers.set(peer.id, peer);
    }
  }

  removePeer(peerId: string): void {
    this.peers.delete(peerId);
  }

  getPeers(): Peer[] {
    return Array.from(this.peers.values());
  }

  broadcast(content: any): void {
    const message: Message = {
      from: this.id,
      content,
      timestamp: Date.now()
    };

    this.peers.forEach(peer => {
      // Simulate sending message to peer
      this.sendToPeer(peer.id, message);
    });
  }

  sendToPeer(peerId: string, message: Message): void {
    const peer = this.peers.get(peerId);
    if (peer) {
      // Simulated message send
      console.log(\`Sending message from \${this.id} to \${peerId}\`);
    }
  }

  receiveMessage(message: Message): void {
    if (this.messageHandler) {
      this.messageHandler(message);
    }
  }

  onMessage(handler: (msg: Message) => void): void {
    this.messageHandler = handler;
  }

  discoverPeers(): Peer[] {
    // Request peer lists from all connected peers
    const discoveredPeers: Peer[] = [];

    this.peers.forEach(peer => {
      // In real implementation, would request peer's peer list
      // For now, just return known peers
    });

    return discoveredPeers;
  }

  getId(): string {
    return this.id;
  }
}`,
    testCases: [
      {
        input: 'Create 3 nodes and connect them',
        expectedOutput: 'Nodes successfully connected',
        isHidden: false,
        description: 'Should establish peer connections'
      },
      {
        input: 'Broadcast message from node1',
        expectedOutput: 'All peers receive the message',
        isHidden: false,
        description: 'Should broadcast to all peers'
      },
      {
        input: 'Remove peer and broadcast',
        expectedOutput: 'Removed peer does not receive message',
        isHidden: false,
        description: 'Should not send to removed peers'
      }
    ],
    hints: [
      'Use a Map to store peers by their ID',
      'Iterate over all peers for broadcast',
      'Don\'t add self as peer',
      'Track message timestamps to prevent loops'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex05',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'CAP Theorem Simulator',
    difficulty: 4,
    description: `Create a simulator that demonstrates the CAP theorem by showing the tradeoffs between Consistency, Availability, and Partition tolerance.

Your implementation should:
- Simulate a distributed system with multiple nodes
- Support network partition scenarios
- Demonstrate CP system behavior (reject writes during partition)
- Demonstrate AP system behavior (accept writes during partition, eventual consistency)`,
    starterCode: `type SystemMode = 'CP' | 'AP';

interface Node {
  id: string;
  data: Map<string, any>;
  partitioned: boolean;
}

class CAPSimulator {
  // Implement CAP theorem simulator
}`,
    solution: `type SystemMode = 'CP' | 'AP';

interface Node {
  id: string;
  data: Map<string, any>;
  partitioned: boolean;
}

interface WriteResult {
  success: boolean;
  message: string;
}

class CAPSimulator {
  private nodes: Node[] = [];
  private mode: SystemMode;

  constructor(mode: SystemMode, nodeCount: number) {
    this.mode = mode;
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        id: \`node-\${i}\`,
        data: new Map(),
        partitioned: false
      });
    }
  }

  write(key: string, value: any, nodeId?: string): WriteResult {
    const targetNode = nodeId
      ? this.nodes.find(n => n.id === nodeId)
      : this.nodes[0];

    if (!targetNode) {
      return { success: false, message: 'Node not found' };
    }

    const availableNodes = this.nodes.filter(n => !n.partitioned);
    const majority = Math.floor(this.nodes.length / 2) + 1;

    if (this.mode === 'CP') {
      // CP: Require majority for consistency
      if (availableNodes.length < majority) {
        return {
          success: false,
          message: 'Cannot achieve consistency - no majority available'
        };
      }

      // Write to majority
      availableNodes.slice(0, majority).forEach(node => {
        node.data.set(key, value);
      });

      return { success: true, message: 'Written to majority (consistent)' };
    } else {
      // AP: Always accept writes (eventual consistency)
      targetNode.data.set(key, value);

      // Async replication to available nodes
      setTimeout(() => {
        availableNodes.forEach(node => {
          if (node.id !== targetNode.id) {
            node.data.set(key, value);
          }
        });
      }, 100);

      return {
        success: true,
        message: 'Written locally (eventually consistent)'
      };
    }
  }

  read(key: string, nodeId?: string): any {
    const targetNode = nodeId
      ? this.nodes.find(n => n.id === nodeId)
      : this.nodes[0];

    if (!targetNode) {
      return null;
    }

    if (this.mode === 'CP') {
      // CP: Read from majority for consistency
      const availableNodes = this.nodes.filter(n => !n.partitioned);
      const majority = Math.floor(this.nodes.length / 2) + 1;

      if (availableNodes.length < majority) {
        throw new Error('Cannot achieve consistency - no majority available');
      }

      return targetNode.data.get(key);
    } else {
      // AP: Always return local value (may be stale)
      return targetNode.data.get(key);
    }
  }

  createPartition(nodeIds: string[]): void {
    nodeIds.forEach(id => {
      const node = this.nodes.find(n => n.id === id);
      if (node) {
        node.partitioned = true;
      }
    });
  }

  healPartition(): void {
    this.nodes.forEach(node => {
      node.partitioned = false;
    });

    // Reconcile data (last-write-wins for simplicity)
    if (this.mode === 'AP') {
      const mergedData = new Map<string, any>();
      this.nodes.forEach(node => {
        node.data.forEach((value, key) => {
          mergedData.set(key, value);
        });
      });

      this.nodes.forEach(node => {
        node.data = new Map(mergedData);
      });
    }
  }

  getNodeStatus(): Array<{ id: string; partitioned: boolean; dataSize: number }> {
    return this.nodes.map(node => ({
      id: node.id,
      partitioned: node.partitioned,
      dataSize: node.data.size
    }));
  }
}`,
    testCases: [
      {
        input: 'CP system: write during partition',
        expectedOutput: 'Write rejected - no majority',
        isHidden: false,
        description: 'CP system should reject writes without majority'
      },
      {
        input: 'AP system: write during partition',
        expectedOutput: 'Write accepted - eventual consistency',
        isHidden: false,
        description: 'AP system should accept writes during partition'
      },
      {
        input: 'Heal partition and verify convergence',
        expectedOutput: 'All nodes have same data',
        isHidden: false,
        description: 'Should reconcile after partition heals'
      }
    ],
    hints: [
      'Calculate majority as floor(n/2) + 1',
      'CP mode rejects operations without majority',
      'AP mode accepts operations and replicates asynchronously',
      'Implement reconciliation strategy for AP mode'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex06',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Transparency Implementation',
    difficulty: 2,
    description: `Implement a distributed file system interface that provides location transparency - users access files without knowing their physical location.`,
    starterCode: `interface FileLocation {
  serverId: string;
  path: string;
}

class TransparentFileSystem {
  // Implement location transparency
}`,
    solution: `interface FileLocation {
  serverId: string;
  path: string;
}

class TransparentFileSystem {
  private fileLocations: Map<string, FileLocation> = new Map();
  private servers: Map<string, Set<string>> = new Map();

  registerServer(serverId: string): void {
    if (!this.servers.has(serverId)) {
      this.servers.set(serverId, new Set());
    }
  }

  storeFile(fileName: string, serverId: string, path: string): void {
    this.fileLocations.set(fileName, { serverId, path });

    const serverFiles = this.servers.get(serverId);
    if (serverFiles) {
      serverFiles.add(fileName);
    }
  }

  getFile(fileName: string): string {
    const location = this.fileLocations.get(fileName);
    if (!location) {
      throw new Error(\`File not found: \${fileName}\`);
    }

    // User doesn't need to know actual location
    return \`Content of \${fileName}\`;
  }

  // Internal method - users don't call this
  private getFileLocation(fileName: string): FileLocation | undefined {
    return this.fileLocations.get(fileName);
  }

  moveFile(fileName: string, newServerId: string): void {
    const location = this.fileLocations.get(fileName);
    if (!location) {
      throw new Error(\`File not found: \${fileName}\`);
    }

    // Remove from old server
    this.servers.get(location.serverId)?.delete(fileName);

    // Add to new server
    const newServerFiles = this.servers.get(newServerId);
    if (!newServerFiles) {
      throw new Error(\`Server not found: \${newServerId}\`);
    }
    newServerFiles.add(fileName);

    // Update location
    this.fileLocations.set(fileName, {
      serverId: newServerId,
      path: location.path
    });
  }

  listFiles(): string[] {
    return Array.from(this.fileLocations.keys());
  }
}`,
    testCases: [
      {
        input: 'Store file on server1, retrieve it',
        expectedOutput: 'File content returned without exposing location',
        isHidden: false,
        description: 'Should provide location transparency'
      },
      {
        input: 'Move file to different server, retrieve it',
        expectedOutput: 'File accessible from new location transparently',
        isHidden: false,
        description: 'Should handle migration transparently'
      }
    ],
    hints: [
      'Maintain mapping from logical file names to physical locations',
      'Hide physical location from users',
      'Support file migration without changing user interface'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex07',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Request-Response Pattern',
    difficulty: 1,
    description: `Implement a simple request-response pattern with timeout handling.`,
    starterCode: `interface Request {
  id: string;
  data: any;
}

interface Response {
  requestId: string;
  data: any;
  error?: string;
}

class RequestResponseHandler {
  // Implement request-response pattern
}`,
    solution: `interface Request {
  id: string;
  data: any;
}

interface Response {
  requestId: string;
  data: any;
  error?: string;
}

class RequestResponseHandler {
  private pendingRequests: Map<string, {
    resolve: (value: any) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = new Map();

  async sendRequest(request: Request, timeoutMs: number = 5000): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(request.id);
        reject(new Error(\`Request timeout: \${request.id}\`));
      }, timeoutMs);

      this.pendingRequests.set(request.id, { resolve, reject, timeout });

      // Simulate sending request
      this.transmit(request);
    });
  }

  handleResponse(response: Response): void {
    const pending = this.pendingRequests.get(response.requestId);
    if (pending) {
      clearTimeout(pending.timeout);
      this.pendingRequests.delete(response.requestId);

      if (response.error) {
        pending.reject(new Error(response.error));
      } else {
        pending.resolve(response.data);
      }
    }
  }

  private transmit(request: Request): void {
    // Simulated network transmission
    console.log(\`Transmitting request: \${request.id}\`);
  }

  getPendingCount(): number {
    return this.pendingRequests.size;
  }
}`,
    testCases: [
      {
        input: 'Send request and receive response',
        expectedOutput: 'Response data returned',
        isHidden: false,
        description: 'Should handle successful request-response'
      },
      {
        input: 'Send request without response',
        expectedOutput: 'Timeout error after specified time',
        isHidden: false,
        description: 'Should timeout when no response received'
      }
    ],
    hints: [
      'Use Promise to handle async request-response',
      'Track pending requests with Map',
      'Implement timeout with setTimeout',
      'Clean up on response or timeout'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex08',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Simple Publish-Subscribe',
    difficulty: 2,
    description: `Implement a publish-subscribe messaging system where subscribers can subscribe to topics and publishers can send messages to topics.`,
    starterCode: `type MessageHandler = (message: any) => void;

class PubSubSystem {
  // Implement pub-sub system
}`,
    solution: `type MessageHandler = (message: any) => void;

class PubSubSystem {
  private subscribers: Map<string, Set<MessageHandler>> = new Map();

  subscribe(topic: string, handler: MessageHandler): () => void {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }

    this.subscribers.get(topic)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.subscribers.get(topic);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.subscribers.delete(topic);
        }
      }
    };
  }

  publish(topic: string, message: any): void {
    const handlers = this.subscribers.get(topic);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error(\`Error in subscriber: \${error}\`);
        }
      });
    }
  }

  getTopics(): string[] {
    return Array.from(this.subscribers.keys());
  }

  getSubscriberCount(topic: string): number {
    return this.subscribers.get(topic)?.size || 0;
  }
}`,
    testCases: [
      {
        input: 'Subscribe to topic and publish message',
        expectedOutput: 'Subscriber receives message',
        isHidden: false,
        description: 'Should deliver messages to subscribers'
      },
      {
        input: 'Unsubscribe and publish',
        expectedOutput: 'Unsubscribed handler not called',
        isHidden: false,
        description: 'Should not deliver to unsubscribed handlers'
      }
    ],
    hints: [
      'Use Map with topic as key and Set of handlers as value',
      'Return unsubscribe function from subscribe',
      'Handle errors in subscriber callbacks gracefully'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex09',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Consistent Hashing Ring',
    difficulty: 3,
    description: `Implement a consistent hashing ring for distributing keys across nodes with minimal rebalancing when nodes are added or removed.`,
    starterCode: `class ConsistentHashRing {
  // Implement consistent hashing
}`,
    solution: `class ConsistentHashRing {
  private ring: Map<number, string> = new Map();
  private nodes: Set<string> = new Set();
  private virtualNodes: number;

  constructor(virtualNodes: number = 150) {
    this.virtualNodes = virtualNodes;
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  addNode(nodeId: string): void {
    if (this.nodes.has(nodeId)) {
      return;
    }

    this.nodes.add(nodeId);

    // Add virtual nodes
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualKey = \`\${nodeId}:v\${i}\`;
      const hash = this.hash(virtualKey);
      this.ring.set(hash, nodeId);
    }
  }

  removeNode(nodeId: string): void {
    if (!this.nodes.has(nodeId)) {
      return;
    }

    this.nodes.delete(nodeId);

    // Remove virtual nodes
    const toRemove: number[] = [];
    this.ring.forEach((node, hash) => {
      if (node === nodeId) {
        toRemove.push(hash);
      }
    });

    toRemove.forEach(hash => this.ring.delete(hash));
  }

  getNode(key: string): string | null {
    if (this.ring.size === 0) {
      return null;
    }

    const hash = this.hash(key);

    // Find first node with hash >= key hash
    const sortedHashes = Array.from(this.ring.keys()).sort((a, b) => a - b);

    for (const nodeHash of sortedHashes) {
      if (nodeHash >= hash) {
        return this.ring.get(nodeHash)!;
      }
    }

    // Wrap around to first node
    return this.ring.get(sortedHashes[0])!;
  }

  getNodes(): string[] {
    return Array.from(this.nodes);
  }
}`,
    testCases: [
      {
        input: 'Add 3 nodes and distribute 100 keys',
        expectedOutput: 'Keys distributed across nodes',
        isHidden: false,
        description: 'Should distribute keys across nodes'
      },
      {
        input: 'Remove a node',
        expectedOutput: 'Only keys on removed node are redistributed',
        isHidden: false,
        description: 'Should minimize redistribution'
      }
    ],
    hints: [
      'Use virtual nodes to improve distribution',
      'Store hash-to-node mapping in sorted structure',
      'Find next node clockwise on ring',
      'Wrap around to first node if needed'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex10',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Microservice Communication',
    difficulty: 3,
    description: `Implement a microservice that can communicate with other services using both synchronous (REST-like) and asynchronous (message queue) patterns.`,
    starterCode: `interface Message {
  from: string;
  to: string;
  payload: any;
}

class Microservice {
  // Implement microservice communication
}`,
    solution: `interface Message {
  from: string;
  to: string;
  payload: any;
  timestamp: number;
}

class Microservice {
  private serviceName: string;
  private messageQueue: Message[] = [];
  private requestHandlers: Map<string, (payload: any) => Promise<any>> = new Map();
  private messageHandlers: Map<string, (message: Message) => void> = new Map();

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  // Synchronous request-response
  async callService(targetService: string, endpoint: string, payload: any): Promise<any> {
    // Simulate HTTP request
    const request = {
      service: this.serviceName,
      endpoint,
      payload
    };

    // In real implementation, would use HTTP client
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 'success', data: payload });
      }, 10);
    });
  }

  // Register handler for synchronous requests
  registerEndpoint(endpoint: string, handler: (payload: any) => Promise<any>): void {
    this.requestHandlers.set(endpoint, handler);
  }

  // Asynchronous message sending
  sendMessage(targetService: string, payload: any): void {
    const message: Message = {
      from: this.serviceName,
      to: targetService,
      payload,
      timestamp: Date.now()
    };

    // In real implementation, would publish to message broker
    this.messageQueue.push(message);
  }

  // Register handler for asynchronous messages
  onMessage(messageType: string, handler: (message: Message) => void): void {
    this.messageHandlers.set(messageType, handler);
  }

  // Process incoming message
  receiveMessage(message: Message): void {
    const handler = this.messageHandlers.get(message.payload.type);
    if (handler) {
      handler(message);
    }
  }

  // Get pending messages (simulate message queue)
  getMessages(): Message[] {
    return [...this.messageQueue];
  }

  // Process endpoint request
  async handleRequest(endpoint: string, payload: any): Promise<any> {
    const handler = this.requestHandlers.get(endpoint);
    if (handler) {
      return await handler(payload);
    }
    throw new Error(\`Endpoint not found: \${endpoint}\`);
  }

  getName(): string {
    return this.serviceName;
  }
}`,
    testCases: [
      {
        input: 'Call service endpoint synchronously',
        expectedOutput: 'Response received',
        isHidden: false,
        description: 'Should handle synchronous requests'
      },
      {
        input: 'Send async message',
        expectedOutput: 'Message queued for delivery',
        isHidden: false,
        description: 'Should queue async messages'
      }
    ],
    hints: [
      'Separate handlers for sync and async communication',
      'Use Promises for synchronous request-response',
      'Queue messages for asynchronous delivery',
      'Register handlers using Map for flexibility'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex11',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Distributed Cache',
    difficulty: 3,
    description: `Implement a simple distributed cache with TTL (time-to-live) support and cache invalidation.`,
    starterCode: `interface CacheEntry {
  value: any;
  expiresAt: number;
}

class DistributedCache {
  // Implement distributed cache
}`,
    solution: `interface CacheEntry {
  value: any;
  expiresAt: number;
}

class DistributedCache {
  private cache: Map<string, CacheEntry> = new Map();
  private defaultTTL: number;

  constructor(defaultTTL: number = 60000) { // 60 seconds default
    this.defaultTTL = defaultTTL;

    // Start cleanup interval
    setInterval(() => this.cleanup(), 10000);
  }

  set(key: string, value: any, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expiresAt });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  invalidatePattern(pattern: RegExp): number {
    let count = 0;
    const keysToDelete: string[] = [];

    this.cache.forEach((_, key) => {
      if (pattern.test(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => {
      this.cache.delete(key);
      count++;
    });

    return count;
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean before counting
    this.cleanup();
    return this.cache.size;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}`,
    testCases: [
      {
        input: 'Set and get value',
        expectedOutput: 'Value retrieved from cache',
        isHidden: false,
        description: 'Should cache and retrieve values'
      },
      {
        input: 'Get expired value',
        expectedOutput: 'null',
        isHidden: false,
        description: 'Should return null for expired entries'
      },
      {
        input: 'Invalidate by pattern',
        expectedOutput: 'Matching entries removed',
        isHidden: false,
        description: 'Should support pattern-based invalidation'
      }
    ],
    hints: [
      'Store expiration timestamp with each entry',
      'Check expiration on get operations',
      'Implement periodic cleanup of expired entries',
      'Use RegExp for pattern matching'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex12',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Service Health Monitor',
    difficulty: 2,
    description: `Implement a health monitoring system that tracks service health and sends alerts when services become unhealthy.`,
    starterCode: `interface HealthStatus {
  healthy: boolean;
  lastCheck: number;
  consecutiveFailures: number;
}

class HealthMonitor {
  // Implement health monitoring
}`,
    solution: `interface HealthStatus {
  healthy: boolean;
  lastCheck: number;
  consecutiveFailures: number;
}

type AlertCallback = (serviceName: string, status: HealthStatus) => void;

class HealthMonitor {
  private services: Map<string, HealthStatus> = new Map();
  private checkInterval: number;
  private failureThreshold: number;
  private alertCallbacks: AlertCallback[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor(checkInterval: number = 5000, failureThreshold: number = 3) {
    this.checkInterval = checkInterval;
    this.failureThreshold = failureThreshold;
  }

  registerService(serviceName: string): void {
    this.services.set(serviceName, {
      healthy: true,
      lastCheck: Date.now(),
      consecutiveFailures: 0
    });
  }

  reportHealth(serviceName: string, healthy: boolean): void {
    const status = this.services.get(serviceName);
    if (!status) {
      return;
    }

    const wasHealthy = status.healthy;

    if (healthy) {
      status.consecutiveFailures = 0;
      status.healthy = true;
    } else {
      status.consecutiveFailures++;

      if (status.consecutiveFailures >= this.failureThreshold) {
        status.healthy = false;
      }
    }

    status.lastCheck = Date.now();

    // Alert if status changed
    if (wasHealthy !== status.healthy) {
      this.triggerAlerts(serviceName, status);
    }
  }

  getServiceStatus(serviceName: string): HealthStatus | null {
    return this.services.get(serviceName) || null;
  }

  getAllStatuses(): Map<string, HealthStatus> {
    return new Map(this.services);
  }

  onAlert(callback: AlertCallback): void {
    this.alertCallbacks.push(callback);
  }

  private triggerAlerts(serviceName: string, status: HealthStatus): void {
    this.alertCallbacks.forEach(callback => {
      try {
        callback(serviceName, status);
      } catch (error) {
        console.error('Error in alert callback:', error);
      }
    });
  }

  startMonitoring(healthCheck: (serviceName: string) => Promise<boolean>): void {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(async () => {
      for (const serviceName of this.services.keys()) {
        try {
          const healthy = await healthCheck(serviceName);
          this.reportHealth(serviceName, healthy);
        } catch (error) {
          this.reportHealth(serviceName, false);
        }
      }
    }, this.checkInterval);
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}`,
    testCases: [
      {
        input: 'Report healthy status',
        expectedOutput: 'Service marked as healthy',
        isHidden: false,
        description: 'Should track healthy services'
      },
      {
        input: 'Report failures exceeding threshold',
        expectedOutput: 'Service marked unhealthy, alert triggered',
        isHidden: false,
        description: 'Should detect unhealthy services and alert'
      }
    ],
    hints: [
      'Track consecutive failures before marking unhealthy',
      'Use callbacks for alerts',
      'Implement periodic health checking',
      'Store last check timestamp'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex13',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'API Rate Limiter',
    difficulty: 3,
    description: `Implement a token bucket rate limiter for API requests.`,
    starterCode: `class RateLimiter {
  // Implement rate limiter
}`,
    solution: `class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number; // tokens per second
  private lastRefill: number;

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // seconds
    const tokensToAdd = timePassed * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  tryConsume(tokens: number = 1): boolean {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }

    return false;
  }

  getAvailableTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }

  reset(): void {
    this.tokens = this.maxTokens;
    this.lastRefill = Date.now();
  }
}

// Per-client rate limiter
class ClientRateLimiter {
  private limiters: Map<string, RateLimiter> = new Map();
  private maxTokens: number;
  private refillRate: number;

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
  }

  allowRequest(clientId: string, tokens: number = 1): boolean {
    let limiter = this.limiters.get(clientId);

    if (!limiter) {
      limiter = new RateLimiter(this.maxTokens, this.refillRate);
      this.limiters.set(clientId, limiter);
    }

    return limiter.tryConsume(tokens);
  }

  getClientStatus(clientId: string): number {
    const limiter = this.limiters.get(clientId);
    return limiter ? limiter.getAvailableTokens() : this.maxTokens;
  }

  resetClient(clientId: string): void {
    const limiter = this.limiters.get(clientId);
    if (limiter) {
      limiter.reset();
    }
  }
}`,
    testCases: [
      {
        input: 'Consume tokens within limit',
        expectedOutput: 'true',
        isHidden: false,
        description: 'Should allow requests within rate limit'
      },
      {
        input: 'Consume tokens exceeding limit',
        expectedOutput: 'false',
        isHidden: false,
        description: 'Should reject requests exceeding rate limit'
      },
      {
        input: 'Wait and try again',
        expectedOutput: 'true (tokens refilled)',
        isHidden: false,
        description: 'Should refill tokens over time'
      }
    ],
    hints: [
      'Use token bucket algorithm',
      'Refill tokens based on time passed',
      'Track last refill timestamp',
      'Maintain separate limiters per client'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex14',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Service Registry with Leases',
    difficulty: 3,
    description: `Implement a service registry with lease-based registration where services must renew their registration periodically.`,
    starterCode: `interface ServiceRegistration {
  name: string;
  host: string;
  port: number;
  leaseExpiry: number;
}

class LeaseBasedRegistry {
  // Implement lease-based service registry
}`,
    solution: `interface ServiceRegistration {
  name: string;
  host: string;
  port: number;
  leaseExpiry: number;
}

class LeaseBasedRegistry {
  private services: Map<string, ServiceRegistration[]> = new Map();
  private leaseDuration: number;

  constructor(leaseDuration: number = 30000) { // 30 seconds
    this.leaseDuration = leaseDuration;

    // Start cleanup
    setInterval(() => this.cleanup(), 5000);
  }

  register(name: string, host: string, port: number): string {
    const registration: ServiceRegistration = {
      name,
      host,
      port,
      leaseExpiry: Date.now() + this.leaseDuration
    };

    if (!this.services.has(name)) {
      this.services.set(name, []);
    }

    const instances = this.services.get(name)!;

    // Remove existing instance with same host:port
    const filtered = instances.filter(s =>
      !(s.host === host && s.port === port)
    );
    filtered.push(registration);
    this.services.set(name, filtered);

    return this.getInstanceId(host, port);
  }

  renewLease(name: string, host: string, port: number): boolean {
    const instances = this.services.get(name);
    if (!instances) {
      return false;
    }

    const instance = instances.find(s =>
      s.host === host && s.port === port
    );

    if (instance) {
      instance.leaseExpiry = Date.now() + this.leaseDuration;
      return true;
    }

    return false;
  }

  discover(name: string): ServiceRegistration[] {
    const instances = this.services.get(name) || [];
    const now = Date.now();

    // Return only non-expired instances
    return instances.filter(s => s.leaseExpiry > now);
  }

  private cleanup(): void {
    const now = Date.now();

    this.services.forEach((instances, name) => {
      const active = instances.filter(s => s.leaseExpiry > now);

      if (active.length === 0) {
        this.services.delete(name);
      } else if (active.length !== instances.length) {
        this.services.set(name, active);
      }
    });
  }

  private getInstanceId(host: string, port: number): string {
    return \`\${host}:\${port}\`;
  }

  getStats(): { services: number; totalInstances: number } {
    let totalInstances = 0;
    const now = Date.now();

    this.services.forEach(instances => {
      totalInstances += instances.filter(s => s.leaseExpiry > now).length;
    });

    return {
      services: this.services.size,
      totalInstances
    };
  }
}`,
    testCases: [
      {
        input: 'Register service and discover',
        expectedOutput: 'Service found',
        isHidden: false,
        description: 'Should register and discover services'
      },
      {
        input: 'Wait for lease expiry without renewal',
        expectedOutput: 'Service removed from registry',
        isHidden: false,
        description: 'Should remove expired services'
      },
      {
        input: 'Renew lease before expiry',
        expectedOutput: 'Service remains registered',
        isHidden: false,
        description: 'Should keep services with renewed leases'
      }
    ],
    hints: [
      'Store lease expiry timestamp with each registration',
      'Implement periodic cleanup of expired leases',
      'Filter expired services in discover method',
      'Allow lease renewal before expiry'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex15',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Request Correlation',
    difficulty: 2,
    description: `Implement request correlation to track requests across multiple services using correlation IDs.`,
    starterCode: `interface CorrelatedRequest {
  correlationId: string;
  serviceName: string;
  operation: string;
  timestamp: number;
  parentId?: string;
}

class RequestCorrelation {
  // Implement request correlation
}`,
    solution: `interface CorrelatedRequest {
  correlationId: string;
  serviceName: string;
  operation: string;
  timestamp: number;
  parentId?: string;
}

class RequestCorrelation {
  private traces: Map<string, CorrelatedRequest[]> = new Map();

  createCorrelationId(): string {
    return \`req-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  logRequest(request: CorrelatedRequest): void {
    if (!this.traces.has(request.correlationId)) {
      this.traces.set(request.correlationId, []);
    }

    this.traces.get(request.correlationId)!.push(request);
  }

  getTrace(correlationId: string): CorrelatedRequest[] {
    return this.traces.get(correlationId) || [];
  }

  buildTraceTree(correlationId: string): any {
    const requests = this.getTrace(correlationId);

    if (requests.length === 0) {
      return null;
    }

    const root = requests.find(r => !r.parentId);
    if (!root) {
      return null;
    }

    const buildNode = (parentId: string): any => {
      const parent = requests.find(r =>
        r.correlationId === correlationId &&
        (parentId ? r.parentId === parentId : !r.parentId)
      );

      if (!parent) {
        return null;
      }

      const children = requests
        .filter(r => r.parentId === \`\${parent.serviceName}:\${parent.operation}\`)
        .map(r => buildNode(\`\${r.serviceName}:\${r.operation}\`));

      return {
        service: parent.serviceName,
        operation: parent.operation,
        timestamp: parent.timestamp,
        children: children.filter(c => c !== null)
      };
    };

    return buildNode('');
  }

  cleanup(olderThan: number): void {
    const cutoff = Date.now() - olderThan;

    const toDelete: string[] = [];
    this.traces.forEach((requests, correlationId) => {
      const oldestRequest = requests[0];
      if (oldestRequest.timestamp < cutoff) {
        toDelete.push(correlationId);
      }
    });

    toDelete.forEach(id => this.traces.delete(id));
  }

  getActiveTraces(): number {
    return this.traces.size;
  }
}`,
    testCases: [
      {
        input: 'Log requests with same correlation ID',
        expectedOutput: 'Requests grouped by correlation ID',
        isHidden: false,
        description: 'Should group requests by correlation ID'
      },
      {
        input: 'Build trace tree',
        expectedOutput: 'Hierarchical trace structure',
        isHidden: false,
        description: 'Should build request trace tree'
      }
    ],
    hints: [
      'Generate unique correlation IDs',
      'Store requests grouped by correlation ID',
      'Support parent-child relationships',
      'Implement cleanup for old traces'
    ],
    language: 'typescript'
  },
  {
    id: 'cs401-t1-ex16',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Distributed Configuration Manager',
    difficulty: 3,
    description: `Implement a configuration manager that can distribute configuration updates to multiple services and notify them of changes.`,
    starterCode: `type ConfigChangeCallback = (key: string, value: any) => void;

class ConfigurationManager {
  // Implement configuration management
}`,
    solution: `type ConfigChangeCallback = (key: string, value: any) => void;

interface ConfigSubscription {
  serviceName: string;
  keys: Set<string>;
  callback: ConfigChangeCallback;
}

class ConfigurationManager {
  private config: Map<string, any> = new Map();
  private subscriptions: Map<string, ConfigSubscription[]> = new Map();
  private version: number = 0;

  set(key: string, value: any): void {
    const oldValue = this.config.get(key);
    this.config.set(key, value);
    this.version++;

    // Notify subscribers if value changed
    if (oldValue !== value) {
      this.notifySubscribers(key, value);
    }
  }

  get(key: string): any {
    return this.config.get(key);
  }

  getAll(): Map<string, any> {
    return new Map(this.config);
  }

  subscribe(
    serviceName: string,
    keys: string[],
    callback: ConfigChangeCallback
  ): () => void {
    const subscription: ConfigSubscription = {
      serviceName,
      keys: new Set(keys),
      callback
    };

    keys.forEach(key => {
      if (!this.subscriptions.has(key)) {
        this.subscriptions.set(key, []);
      }
      this.subscriptions.get(key)!.push(subscription);
    });

    // Return unsubscribe function
    return () => {
      keys.forEach(key => {
        const subs = this.subscriptions.get(key);
        if (subs) {
          const filtered = subs.filter(s => s.serviceName !== serviceName);
          if (filtered.length === 0) {
            this.subscriptions.delete(key);
          } else {
            this.subscriptions.set(key, filtered);
          }
        }
      });
    };
  }

  private notifySubscribers(key: string, value: any): void {
    const subscribers = this.subscriptions.get(key) || [];

    subscribers.forEach(sub => {
      try {
        sub.callback(key, value);
      } catch (error) {
        console.error(\`Error notifying subscriber \${sub.serviceName}:\`, error);
      }
    });
  }

  bulkUpdate(updates: Map<string, any>): void {
    const changes: Array<{ key: string; value: any }> = [];

    updates.forEach((value, key) => {
      const oldValue = this.config.get(key);
      if (oldValue !== value) {
        this.config.set(key, value);
        changes.push({ key, value });
      }
    });

    this.version++;

    // Notify all changes
    changes.forEach(({ key, value }) => {
      this.notifySubscribers(key, value);
    });
  }

  getVersion(): number {
    return this.version;
  }

  delete(key: string): boolean {
    const existed = this.config.delete(key);
    if (existed) {
      this.version++;
      this.notifySubscribers(key, undefined);
    }
    return existed;
  }
}`,
    testCases: [
      {
        input: 'Set config value',
        expectedOutput: 'Value stored and version incremented',
        isHidden: false,
        description: 'Should store configuration values'
      },
      {
        input: 'Subscribe to config changes',
        expectedOutput: 'Callback invoked on value change',
        isHidden: false,
        description: 'Should notify subscribers of changes'
      },
      {
        input: 'Bulk update multiple values',
        expectedOutput: 'All values updated, all subscribers notified',
        isHidden: false,
        description: 'Should handle bulk updates efficiently'
      }
    ],
    hints: [
      'Track version number for cache invalidation',
      'Maintain subscriptions per config key',
      'Notify subscribers only on actual changes',
      'Support bulk updates for efficiency'
    ],
    language: 'typescript'
  }
];
