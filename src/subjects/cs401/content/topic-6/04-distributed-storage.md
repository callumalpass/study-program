---
title: "Distributed Storage Systems"
description: "HDFS architecture, Google File System, data locality, replication strategies, and rack-aware placement"
---

# Distributed Storage Systems

Distributed storage systems provide reliable, scalable storage for massive datasets by spreading data across many machines. These systems must handle hardware failures gracefully, provide high throughput for large sequential reads/writes, and support efficient data processing by co-locating compute with storage. This chapter explores the architecture and principles behind distributed file systems like HDFS and GFS.

## Design Principles for Distributed Storage

Distributed file systems are optimized for big data workloads with specific characteristics.

### Assumptions and Goals

**Hardware failures are the norm:** With thousands of commodity machines, some are always failing

**Large files:** Files are typically gigabytes to terabytes, not kilobytes

**Append-mostly:** Most files are written once and read many times; appends are common, random writes rare

**Co-located compute:** Processing happens on the same machines storing data (data locality)

**High throughput over low latency:** Optimized for batch processing, not interactive queries

```javascript
class DistributedFileSystemDesign {
  static principles() {
    return {
      // Favor throughput over latency
      blockSize: 128 * 1024 * 1024,  // 128MB blocks
      
      // Replicate for fault tolerance
      replicationFactor: 3,
      
      // Optimize for sequential access
      prefetchSize: 4 * 1024 * 1024,  // 4MB prefetch
      
      // Simple consistency model
      writeOnce: true,
      appendOnly: true,
      
      // Data locality for compute
      rackAware: true
    };
  }
}
```

## HDFS Architecture Deep Dive

HDFS uses a master-worker architecture with centralized metadata management.

### NameNode Metadata Management

```javascript
class HDFSNamespace {
  constructor() {
    this.inodes = new Map();  // path → INode
    this.blocks = new Map();  // blockId → BlockInfo
    this.nextInodeId = 1;
    this.nextBlockId = 1;
  }

  createFile(path, replication, blockSize) {
    const inode = {
      id: this.nextInodeId++,
      type: 'FILE',
      path,
      replication,
      blockSize,
      blocks: [],
      created: Date.now(),
      modified: Date.now(),
      accessed: Date.now(),
      owner: 'hdfs',
      group: 'supergroup',
      permissions: 0o644,
      length: 0
    };

    this.inodes.set(path, inode);
    return inode;
  }

  createDirectory(path) {
    const inode = {
      id: this.nextInodeId++,
      type: 'DIRECTORY',
      path,
      children: [],
      created: Date.now(),
      modified: Date.now(),
      owner: 'hdfs',
      group: 'supergroup',
      permissions: 0o755
    };

    this.inodes.set(path, inode);
    return inode;
  }

  allocateBlock(path) {
    const inode = this.inodes.get(path);
    
    if (!inode || inode.type !== 'FILE') {
      throw new Error(`Cannot allocate block for ${path}`);
    }

    const blockId = this.nextBlockId++;
    const block = {
      id: blockId,
      generationStamp: Date.now(),
      length: 0,
      locations: []
    };

    inode.blocks.push(blockId);
    this.blocks.set(blockId, block);

    return block;
  }

  getBlockLocations(path, offset, length) {
    const inode = this.inodes.get(path);
    
    if (!inode) {
      throw new Error(`File not found: ${path}`);
    }

    const blocks = [];
    let currentOffset = 0;

    for (const blockId of inode.blocks) {
      const block = this.blocks.get(blockId);
      const blockEnd = currentOffset + block.length;

      // Check if block overlaps with requested range
      if (blockEnd > offset && currentOffset < offset + length) {
        blocks.push({
          blockId,
          offset: currentOffset,
          length: block.length,
          locations: block.locations
        });
      }

      currentOffset = blockEnd;

      if (currentOffset >= offset + length) {
        break;
      }
    }

    return blocks;
  }

  // Edit log for persistence
  logOperation(op) {
    const entry = {
      txid: this.nextTxId++,
      timestamp: Date.now(),
      operation: op
    };

    this.editLog.append(entry);

    // Checkpoint periodically
    if (this.nextTxId % 10000 === 0) {
      this.checkpoint();
    }
  }

  async checkpoint() {
    // Serialize namespace to FSImage
    const fsimage = {
      version: 1,
      namespaceId: this.namespaceId,
      lastTxId: this.nextTxId - 1,
      inodes: Array.from(this.inodes.entries()),
      blocks: Array.from(this.blocks.entries())
    };

    await this.writeFSImage(fsimage);

    console.log(`Checkpoint created at txid ${this.nextTxId}`);
  }
}
```

### Block Replication Strategy

```javascript
class BlockPlacementPolicy {
  constructor(clusterTopology) {
    this.topology = clusterTopology;  // Rack-aware topology
  }

  chooseTarget(numReplicas, writer, excludedNodes = []) {
    const targets = [];

    // Replica 1: Same node as writer (or random if remote write)
    const firstTarget = writer || this.chooseRandomNode(excludedNodes);
    targets.push(firstTarget);
    excludedNodes.push(firstTarget);

    if (numReplicas === 1) return targets;

    // Replica 2: Different rack from replica 1
    const secondTarget = this.chooseDifferentRack(
      firstTarget.rack,
      excludedNodes
    );
    targets.push(secondTarget);
    excludedNodes.push(secondTarget);

    if (numReplicas === 2) return targets;

    // Replica 3: Same rack as replica 2, different node
    const thirdTarget = this.chooseSameRack(
      secondTarget.rack,
      excludedNodes
    );
    targets.push(thirdTarget);
    excludedNodes.push(thirdTarget);

    // Additional replicas: random
    while (targets.length < numReplicas) {
      const target = this.chooseRandomNode(excludedNodes);
      targets.push(target);
      excludedNodes.push(target);
    }

    return targets;
  }

  chooseDifferentRack(rack, excludedNodes) {
    const availableRacks = this.topology.getRacks()
      .filter(r => r !== rack);

    for (const targetRack of availableRacks) {
      const nodes = this.topology.getNodesInRack(targetRack)
        .filter(n => !excludedNodes.includes(n));

      if (nodes.length > 0) {
        return this.selectBestNode(nodes);
      }
    }

    throw new Error('No suitable node in different rack');
  }

  chooseSameRack(rack, excludedNodes) {
    const nodes = this.topology.getNodesInRack(rack)
      .filter(n => !excludedNodes.includes(n));

    if (nodes.length === 0) {
      // Fallback to different rack
      return this.chooseDifferentRack(rack, excludedNodes);
    }

    return this.selectBestNode(nodes);
  }

  selectBestNode(nodes) {
    // Select node with most available space
    return nodes.reduce((best, node) => 
      node.availableSpace > best.availableSpace ? node : best
    );
  }

  chooseRandomNode(excludedNodes) {
    const allNodes = this.topology.getAllNodes()
      .filter(n => !excludedNodes.includes(n));

    if (allNodes.length === 0) {
      throw new Error('No available nodes');
    }

    return allNodes[Math.floor(Math.random() * allNodes.length)];
  }
}

// Rack topology
class RackTopology {
  constructor() {
    this.racks = new Map();  // rack name → nodes
  }

  addNode(node, rack) {
    if (!this.racks.has(rack)) {
      this.racks.set(rack, []);
    }

    this.racks.get(rack).push(node);
  }

  getRacks() {
    return Array.from(this.racks.keys());
  }

  getNodesInRack(rack) {
    return this.racks.get(rack) || [];
  }

  getAllNodes() {
    return Array.from(this.racks.values()).flat();
  }

  // Calculate network distance
  getDistance(node1, node2) {
    if (node1 === node2) return 0;

    const rack1 = this.getRackForNode(node1);
    const rack2 = this.getRackForNode(node2);

    if (rack1 === rack2) return 2;  // Same rack, different node

    return 4;  // Different rack
  }

  getRackForNode(node) {
    for (const [rack, nodes] of this.racks) {
      if (nodes.includes(node)) return rack;
    }
    return null;
  }
}
```

## Data Locality

Co-locating computation with data minimizes network traffic.

```javascript
class DataLocalityScheduler {
  constructor(topology) {
    this.topology = topology;
  }

  scheduleTask(task, blockLocations) {
    // Priority 1: Node-local (same node as data)
    const nodeLocal = this.findNodeLocalNode(blockLocations);
    if (nodeLocal && nodeLocal.hasCapacity()) {
      return {
        node: nodeLocal,
        locality: 'NODE_LOCAL'
      };
    }

    // Priority 2: Rack-local (same rack as data)
    const rackLocal = this.findRackLocalNode(blockLocations);
    if (rackLocal && rackLocal.hasCapacity()) {
      return {
        node: rackLocal,
        locality: 'RACK_LOCAL'
      };
    }

    // Priority 3: Off-rack (any available node)
    const anyNode = this.findAnyAvailableNode();
    return {
      node: anyNode,
      locality: 'OFF_RACK'
    };
  }

  findNodeLocalNode(blockLocations) {
    // Find a node that has one of the block replicas
    for (const location of blockLocations) {
      const node = this.topology.getNode(location.hostname);
      if (node) return node;
    }
    return null;
  }

  findRackLocalNode(blockLocations) {
    // Find a node in the same rack as one of the replicas
    for (const location of blockLocations) {
      const rack = this.topology.getRackForNode(location.hostname);
      const nodesInRack = this.topology.getNodesInRack(rack);

      for (const node of nodesInRack) {
        if (node.hasCapacity()) return node;
      }
    }
    return null;
  }

  // Measure locality effectiveness
  calculateLocalityMetrics(tasks) {
    const metrics = {
      NODE_LOCAL: 0,
      RACK_LOCAL: 0,
      OFF_RACK: 0,
      total: tasks.length
    };

    for (const task of tasks) {
      metrics[task.locality]++;
    }

    return {
      nodeLocalPercent: (metrics.NODE_LOCAL / metrics.total) * 100,
      rackLocalPercent: (metrics.RACK_LOCAL / metrics.total) * 100,
      offRackPercent: (metrics.OFF_RACK / metrics.total) * 100
    };
  }
}
```

## Write Pipeline

HDFS writes blocks through a pipeline to multiple DataNodes.

```javascript
class HDFSWritePipeline {
  async writeBlock(data, targets, blockId) {
    console.log(`Writing block ${blockId} to ${targets.length} targets`);

    // Set up pipeline: Client → DN1 → DN2 → DN3
    const pipeline = this.establishPipeline(targets);

    try {
      // Write data through pipeline
      await this.streamData(data, pipeline, blockId);

      // Wait for acknowledgments from all nodes
      await this.collectAcks(pipeline);

      console.log(`Block ${blockId} successfully written`);
    } catch (error) {
      console.error(`Write failed:`, error);
      await this.handlePipelineFailure(pipeline, error);
      throw error;
    } finally {
      await this.closePipeline(pipeline);
    }
  }

  async establishPipeline(targets) {
    const pipeline = {
      stages: [],
      ackChannel: new Channel()
    };

    // Connect to first DataNode
    const firstConn = await this.connectToDataNode(targets[0]);

    // Send pipeline setup request
    await firstConn.send({
      op: 'WRITE_BLOCK',
      targets: targets.slice(1),  // Remaining targets
      numTargets: targets.length
    });

    pipeline.stages.push({
      target: targets[0],
      connection: firstConn
    });

    // First DataNode will forward to remaining targets
    return pipeline;
  }

  async streamData(data, pipeline, blockId) {
    const chunkSize = 64 * 1024;  // 64KB chunks
    let offset = 0;
    let seqno = 0;

    while (offset < data.length) {
      const chunk = data.slice(offset, offset + chunkSize);

      // Compute checksum
      const checksum = this.computeChecksum(chunk);

      // Send packet
      const packet = {
        seqno: seqno++,
        offsetInBlock: offset,
        data: chunk,
        checksum,
        lastPacket: offset + chunk.length >= data.length
      };

      await this.sendPacket(pipeline, packet);

      offset += chunk.length;
    }
  }

  async sendPacket(pipeline, packet) {
    const firstStage = pipeline.stages[0];

    // Send to first DataNode
    await firstStage.connection.send({
      type: 'DATA',
      packet
    });

    // DataNode will forward to next in pipeline
  }

  async collectAcks(pipeline) {
    const firstStage = pipeline.stages[0];
    const acks = [];

    // Receive acknowledgments
    while (true) {
      const ack = await firstStage.connection.receive();

      if (ack.type === 'ACK') {
        acks.push(ack);

        if (ack.lastPacket) {
          break;
        }
      } else if (ack.type === 'ERROR') {
        throw new Error(`Pipeline error: ${ack.message}`);
      }
    }

    return acks;
  }

  async handlePipelineFailure(pipeline, error) {
    // Remove failed node from pipeline
    // Continue writing to remaining nodes
    // Report failure to NameNode
    console.log('Handling pipeline failure...');
  }

  computeChecksum(data) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
```

## Read Optimization

HDFS optimizes reads through caching, prefetching, and short-circuit reads.

```javascript
class HDFSReadOptimizer {
  constructor() {
    this.cache = new LRUCache(1024 * 1024 * 1024);  // 1GB cache
    this.prefetcher = new Prefetcher();
  }

  async read(path, offset, length) {
    // Check cache first
    const cached = this.cache.get(path, offset, length);
    if (cached) {
      console.log('Cache hit');
      return cached;
    }

    // Get block locations
    const blocks = await this.namenode.getBlockLocations(path, offset, length);

    // Prefetch next blocks
    this.prefetcher.schedulePrefe tch(path, blocks);

    // Read blocks in parallel
    const chunks = await Promise.all(
      blocks.map(block => this.readBlock(block))
    );

    const data = Buffer.concat(chunks);

    // Cache result
    this.cache.put(path, offset, data);

    return data;
  }

  async readBlock(blockInfo) {
    // Try short-circuit read if local
    const localPath = this.findLocalBlockPath(blockInfo.blockId);
    if (localPath) {
      return await this.shortCircuitRead(localPath);
    }

    // Choose closest replica
    const location = this.selectBestLocation(blockInfo.locations);

    // Read from DataNode
    const client = new DataNodeClient(location.hostname, location.port);
    return await client.readBlock(blockInfo.blockId);
  }

  async shortCircuitRead(path) {
    // Read directly from local file system (bypass DataNode)
    const fs = require('fs').promises;
    return await fs.readFile(path);
  }

  selectBestLocation(locations) {
    // Prefer local node, then same rack, then any
    const localNode = locations.find(loc => loc.hostname === this.localHostname);
    if (localNode) return localNode;

    const sameRack = locations.find(loc => 
      this.topology.getRackForNode(loc.hostname) === this.localRack
    );
    if (sameRack) return sameRack;

    return locations[0];
  }
}

class Prefetcher {
  constructor() {
    this.queue = [];
    this.prefetching = false;
  }

  schedulePrefetch(path, blocks) {
    // Add next blocks to prefetch queue
    for (let i = 0; i < blocks.length; i++) {
      const nextBlockIndex = blocks[i].index + 1;
      this.queue.push({ path, blockIndex: nextBlockIndex });
    }

    if (!this.prefetching) {
      this.startPrefetching();
    }
  }

  async startPrefetching() {
    this.prefetching = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      
      try {
        await this.prefetchBlock(item.path, item.blockIndex);
      } catch (error) {
        console.error('Prefetch failed:', error);
      }
    }

    this.prefetching = false;
  }

  async prefetchBlock(path, blockIndex) {
    // Fetch block and add to cache
    console.log(`Prefetching block ${blockIndex} of ${path}`);
  }
}
```

## Rebalancing

HDFS periodically rebalances data across DataNodes to maintain even distribution.

```javascript
class HDFSBalancer {
  constructor(namenode, threshold = 10) {
    this.namenode = namenode;
    this.threshold = threshold;  // Percentage deviation threshold
  }

  async balance() {
    console.log('Starting cluster rebalancing...');

    // Get cluster utilization
    const utilization = await this.getClusterUtilization();

    const avgUtilization = utilization.reduce((sum, node) => 
      sum + node.utilization, 0) / utilization.length;

    console.log(`Average utilization: ${avgUtilization.toFixed(2)}%`);

    // Find overutilized and underutilized nodes
    const overutilized = utilization.filter(node =>
      node.utilization > avgUtilization + this.threshold
    );

    const underutilized = utilization.filter(node =>
      node.utilization < avgUtilization - this.threshold
    );

    if (overutilized.length === 0) {
      console.log('Cluster is balanced');
      return;
    }

    // Plan block movements
    const movements = this.planMovements(overutilized, underutilized, avgUtilization);

    console.log(`Planned ${movements.length} block movements`);

    // Execute movements with bandwidth limit
    await this.executeMovements(movements);

    console.log('Rebalancing complete');
  }

  async getClusterUtilization() {
    const datanodes = await this.namenode.getDataNodes();

    return datanodes.map(dn => ({
      id: dn.id,
      hostname: dn.hostname,
      capacity: dn.capacity,
      used: dn.used,
      utilization: (dn.used / dn.capacity) * 100
    }));
  }

  planMovements(overutilized, underutilized, targetUtilization) {
    const movements = [];

    for (const source of overutilized) {
      const bytesToMove = (source.utilization - targetUtilization) / 100 * source.capacity;

      for (const dest of underutilized) {
        const bytesCanReceive = (targetUtilization - dest.utilization) / 100 * dest.capacity;

        const moveSize = Math.min(bytesToMove, bytesCanReceive);

        // Find blocks to move from source to dest
        const blocks = this.selectBlocksToMove(source, moveSize);

        for (const block of blocks) {
          movements.push({
            blockId: block.id,
            source: source.id,
            destination: dest.id,
            size: block.size
          });
        }

        if (movements.length > 0) break;
      }
    }

    return movements;
  }

  async executeMovements(movements) {
    const bandwidth = 10 * 1024 * 1024;  // 10 MB/s throttle

    for (const movement of movements) {
      await this.moveBlock(movement, bandwidth);
      await this.sleep(movement.size / bandwidth * 1000);
    }
  }

  async moveBlock(movement, bandwidth) {
    console.log(`Moving block ${movement.blockId} from ${movement.source} to ${movement.destination}`);

    // Trigger block replication to destination
    await this.namenode.replicateBlock(
      movement.blockId,
      movement.destination
    );

    // Delete from source after successful replication
    await this.namenode.deleteBlock(
      movement.blockId,
      movement.source
    );
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

Distributed storage systems like HDFS provide the foundation for big data processing by offering scalable, reliable storage with high throughput, data locality, and automatic fault tolerance through replication and rack-aware placement.
