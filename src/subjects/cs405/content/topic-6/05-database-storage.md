---
id: cs405-t6-database-storage
title: "Database Storage in the Cloud"
order: 5
---

# Database Storage in the Cloud

## Introduction

Database storage in cloud environments represents a fundamental shift from traditional on-premises database infrastructure. Cloud providers offer specialized storage solutions optimized for different database workloads, from transactional relational databases to high-throughput NoSQL systems and massive data warehouses. Understanding the various storage options, their characteristics, and appropriate use cases is essential for building scalable, performant, and cost-effective cloud applications.

Cloud database storage solutions provide automatic scaling, built-in redundancy, and flexible performance characteristics that adapt to application needs. Unlike traditional storage where you must pre-provision capacity, cloud database storage can grow dynamically, and many services offer features like automatic backups, point-in-time recovery, and multi-region replication out of the box.

## Relational Database Storage

### Amazon RDS Storage Types

Amazon RDS supports multiple storage types, each optimized for different performance and cost requirements:

**General Purpose SSD (gp3 and gp2)**
- gp3 provides baseline performance of 3,000 IOPS and 125 MB/s throughput
- Performance can be scaled independently of storage capacity
- gp2 provides 3 IOPS per GB, with a baseline of 100 IOPS
- Burst capability up to 3,000 IOPS for gp2
- Cost-effective for most database workloads

**Provisioned IOPS SSD (io1 and io2)**
- Designed for I/O-intensive workloads
- Provision specific IOPS levels (up to 64,000 IOPS for io1, 256,000 for io2)
- io2 offers higher durability (99.999%) compared to io1 (99.9%)
- Consistent, low-latency performance
- Ideal for production databases with demanding performance requirements

**Magnetic Storage (Standard)**
- Legacy storage type maintained for backward compatibility
- Lower cost but limited performance
- Not recommended for new deployments
- Maximum 1,000 IOPS

Example RDS instance creation with storage configuration:

```bash
aws rds create-db-instance \
  --db-instance-identifier production-db \
  --db-instance-class db.m5.xlarge \
  --engine postgres \
  --allocated-storage 100 \
  --storage-type gp3 \
  --iops 3000 \
  --storage-throughput 125 \
  --max-allocated-storage 1000 \
  --storage-encrypted \
  --kms-key-id arn:aws:kms:us-east-1:123456789012:key/12345678
```

### Storage Auto-Scaling

RDS storage auto-scaling automatically increases storage capacity when the database runs low on free space. This prevents downtime due to storage exhaustion while avoiding over-provisioning costs.

Auto-scaling triggers when:
- Free storage space is less than 10% of allocated storage
- Low-storage condition persists for at least 5 minutes
- At least 6 hours have passed since the last storage modification

Configuration example:

```bash
aws rds modify-db-instance \
  --db-instance-identifier production-db \
  --max-allocated-storage 2000 \
  --apply-immediately
```

### Multi-AZ Deployments and Read Replicas

**Multi-AZ Deployments**
- Synchronously replicate data to a standby instance in a different Availability Zone
- Automatic failover in case of infrastructure failure
- Backups taken from standby to reduce I/O impact on primary
- Typically doubles storage costs (primary + standby)
- RPO (Recovery Point Objective): Near zero
- RTO (Recovery Time Objective): 1-2 minutes

**Read Replicas**
- Asynchronously replicate data to one or more read-only instances
- Can be in the same region or cross-region
- Offload read traffic from primary database
- Each replica maintains its own storage
- Replication lag typically milliseconds to seconds
- Can be promoted to standalone database

## NoSQL Database Storage

### DynamoDB Storage Model

DynamoDB uses a distributed storage architecture that automatically partitions data across multiple servers based on the partition key. Key characteristics:

**Storage Architecture**
- Data stored in SSD storage across three Availability Zones
- Automatic replication for durability and availability
- No storage limits - tables can grow indefinitely
- Pay only for storage consumed

**Partition Management**
- Each partition stores up to 10 GB of data
- DynamoDB automatically splits partitions as data grows
- Partition key determines data distribution
- Well-designed partition keys prevent hot partitions

**Item Size Limits**
- Maximum item size: 400 KB
- Includes attribute names and values
- Large objects should be stored in S3 with references in DynamoDB

Example table creation:

```bash
aws dynamodb create-table \
  --table-name UserProfiles \
  --attribute-definitions \
    AttributeName=UserId,AttributeType=S \
  --key-schema \
    AttributeName=UserId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --sse-specification Enabled=true
```

### MongoDB Atlas Storage

MongoDB Atlas offers flexible storage configurations:

**Cluster Storage**
- Backed by cloud provider block storage (EBS on AWS)
- Storage auto-scaling available
- Minimum storage: 10 GB
- Maximum storage depends on cluster tier

**Storage Engine**
- WiredTiger storage engine with compression
- Document-level concurrency control
- Compression reduces storage costs by 70-80%
- Supports snappy, zlib, or zstd compression

## Data Warehouse Storage

### Redshift Storage Architecture

Amazon Redshift uses a massively parallel processing (MPP) architecture with specialized storage optimizations:

**Cluster Architecture**
- Leader node coordinates queries
- Compute nodes store data and execute queries
- Each compute node has dedicated CPU, memory, and disk
- Nodes range from 160 GB to 64 TB per node

**Storage Types**
- Dense Compute (DC2): SSD-based, optimized for performance
- Dense Storage (DS2): HDD-based, optimized for capacity
- RA3: Managed storage that scales independently of compute

**Data Distribution**
- Data distributed across compute nodes using distribution keys
- Distribution styles: KEY, EVEN, ALL
- Proper distribution minimizes data movement during queries

### Columnar Storage Benefits

Redshift stores data in columnar format, providing significant advantages:

**Storage Efficiency**
- Columns compress better than rows (similar values together)
- Average compression ratio: 3x to 10x
- Only read columns needed for query
- Reduces I/O by 90% or more compared to row storage

**Compression Encodings**
- AZ64: General-purpose compression
- LZO: Balance of compression and speed
- ZSTD: High compression ratio
- Delta: Efficient for sorted numeric data
- Run-length: Efficient for repeated values

Example table with compression:

```sql
CREATE TABLE sales_fact (
  sale_id BIGINT ENCODE AZ64,
  sale_date DATE ENCODE DELTA,
  product_id INT ENCODE AZ64,
  quantity INT ENCODE ZSTD,
  amount DECIMAL(10,2) ENCODE AZ64
)
DISTSTYLE KEY
DISTKEY (product_id)
SORTKEY (sale_date);
```

## In-Memory Storage

### ElastiCache

ElastiCache provides fully managed Redis and Memcached for low-latency data access.

**Redis Storage Characteristics**
- In-memory key-value store
- Persistent storage options (RDB snapshots, AOF logs)
- Data structures: strings, hashes, lists, sets, sorted sets
- Maximum value size: 512 MB
- Supports replication and clustering

**Memcached Storage Characteristics**
- Pure in-memory cache (no persistence)
- Simple key-value storage
- Maximum value size: 1 MB
- Horizontal scaling through sharding
- Multi-threaded architecture

### Use Cases for Caching

**Session Storage**
- Store user session data for web applications
- Sub-millisecond access times
- Automatic expiration of stale sessions

**Database Query Caching**
- Cache frequent query results
- Reduce database load by 70-90%
- Invalidate cache on data updates

**Real-time Analytics**
- Store counters, leaderboards, real-time metrics
- Redis sorted sets for ranking
- Atomic increment/decrement operations

Configuration example:

```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id session-cache \
  --engine redis \
  --cache-node-type cache.r6g.large \
  --num-cache-nodes 1 \
  --engine-version 7.0 \
  --snapshot-retention-limit 5 \
  --automatic-failover-enabled
```

## Database Backup Strategies

### Automated Backups

Most cloud database services provide automated backup capabilities:

**RDS Automated Backups**
- Retention period: 1 to 35 days
- Daily full snapshots during backup window
- Transaction logs captured every 5 minutes
- Stored in S3 with cross-region replication option
- No performance impact (backups from standby in Multi-AZ)

**DynamoDB Point-in-Time Recovery**
- Continuous backups for 35 days
- Restore to any second within retention period
- No performance impact on tables
- Per-table enablement

Example enabling automated backups:

```bash
aws rds modify-db-instance \
  --db-instance-identifier production-db \
  --backup-retention-period 14 \
  --preferred-backup-window "03:00-04:00" \
  --apply-immediately
```

### Manual Snapshots

Manual snapshots provide long-term backup retention:

- Retained until explicitly deleted
- Can be shared across AWS accounts
- Can be copied to different regions
- Incremental storage (only changed blocks stored)

```bash
aws rds create-db-snapshot \
  --db-instance-identifier production-db \
  --db-snapshot-identifier prod-db-snapshot-2025-12-23
```

### Point-in-Time Recovery

Point-in-time recovery (PITR) allows restoration to any specific timestamp:

**Recovery Process**
1. Identify the target restore time
2. Create new database instance from backup
3. Apply transaction logs up to target time
4. Validate data integrity
5. Redirect applications to new instance

Recovery time depends on:
- Database size
- Number of transaction logs to replay
- Typically 10-30 minutes for moderate databases

Example restoration:

```bash
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier production-db \
  --target-db-instance-identifier restored-db \
  --restore-time 2025-12-23T14:30:00Z
```

## Summary

Cloud database storage encompasses a wide range of solutions tailored to specific workload requirements. Relational databases like RDS offer multiple storage tiers with auto-scaling capabilities, while NoSQL solutions like DynamoDB provide unlimited storage with automatic partitioning. Data warehouses leverage columnar storage for massive analytical workloads, and in-memory caches like ElastiCache deliver sub-millisecond performance for frequently accessed data. Understanding the storage characteristics, backup strategies, and optimization techniques for each database type enables architects to design robust, performant, and cost-effective data solutions in the cloud.
