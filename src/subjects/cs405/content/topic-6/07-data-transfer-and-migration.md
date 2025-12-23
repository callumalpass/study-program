---
id: cs405-t6-data-transfer-migration
title: "Data Transfer and Migration"
order: 7
---

# Data Transfer and Migration

## Introduction

Data transfer and migration represent critical challenges in cloud computing, particularly when dealing with large datasets or transitioning from on-premises infrastructure to the cloud. The process involves moving data efficiently while maintaining data integrity, minimizing downtime, and controlling costs. Organizations must choose between online transfer methods that use network connections and offline transfer methods that physically ship storage devices.

The economics of data transfer are complex. While cloud providers typically don't charge for data ingress (uploading to the cloud), egress charges can be substantial, ranging from $0.09 to $0.12 per GB for inter-region transfers. For large migrations, the time required to transfer data over network connections may be impractical. The old adage "never underestimate the bandwidth of a station wagon full of tapes" still holds true in the cloud era, with services like AWS Snowmobile capable of transferring 100 PB in weeks rather than the years required for network transfer.

## Online Transfer Methods

### AWS DataSync

AWS DataSync is a managed data transfer service that simplifies moving large amounts of data between on-premises storage, AWS storage services, and between AWS storage services themselves.

**Key Features**
- Automated data transfer and synchronization
- Bandwidth throttling to avoid network saturation
- Data integrity validation
- Encryption in transit (TLS)
- Automatic retry and error handling
- Transfer rate: Up to 10 Gbps per agent

**Architecture**
```
On-Premises Storage (NFS/SMB)
    ↓
DataSync Agent (VM or hardware)
    ↓
AWS DataSync Service
    ↓
Destination (S3/EFS/FSx)
```

**Configuration Example**

```bash
# Create DataSync agent (after deploying VM on-premises)
aws datasync create-agent \
  --agent-name on-prem-to-cloud \
  --activation-key ABCDE-12345-FGHIJ-67890

# Create source location (NFS)
aws datasync create-location-nfs \
  --server-hostname 192.168.1.100 \
  --subdirectory /data \
  --on-prem-config AgentArns=arn:aws:datasync:us-east-1:123456789012:agent/agent-0123456789abcdef0

# Create destination location (S3)
aws datasync create-location-s3 \
  --s3-bucket-arn arn:aws:s3:::my-migration-bucket \
  --s3-storage-class INTELLIGENT_TIERING \
  --s3-config BucketAccessRoleArn=arn:aws:iam::123456789012:role/DataSyncS3Role

# Create transfer task
aws datasync create-task \
  --source-location-arn arn:aws:datasync:us-east-1:123456789012:location/loc-source \
  --destination-location-arn arn:aws:datasync:us-east-1:123456789012:location/loc-dest \
  --cloud-watch-log-group-arn arn:aws:logs:us-east-1:123456789012:log-group:/aws/datasync \
  --options '{
    "VerifyMode": "ONLY_FILES_TRANSFERRED",
    "OverwriteMode": "NEVER",
    "Atime": "BEST_EFFORT",
    "Mtime": "PRESERVE",
    "PreserveDeletedFiles": "PRESERVE",
    "PreserveDevices": "NONE",
    "PosixPermissions": "PRESERVE",
    "BytesPerSecond": -1,
    "TaskQueueing": "ENABLED"
  }'

# Start task execution
aws datasync start-task-execution \
  --task-arn arn:aws:datasync:us-east-1:123456789012:task/task-0123456789abcdef0
```

**Cost Calculation**

DataSync charges per GB transferred:
- Pricing: $0.0125 per GB transferred

Example: Migrating 50 TB of data
- Transfer cost: 50,000 GB × $0.0125 = $625
- Additional costs: S3 storage, agent compute (if using EC2)
- Time estimate: ~14 hours on 10 Gbps connection

### S3 Transfer Acceleration

S3 Transfer Acceleration leverages Amazon CloudFront's globally distributed edge locations to accelerate uploads to S3, particularly useful for long-distance transfers.

**How It Works**
1. Client uploads to nearest CloudFront edge location
2. Data routed over AWS's optimized network backbone
3. Transfer can be 50-500% faster than direct upload

**Speed Comparison Tool**

AWS provides a comparison tool to estimate acceleration benefits:
```
http://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html
```

**Configuration**

```bash
# Enable Transfer Acceleration on bucket
aws s3api put-bucket-accelerate-configuration \
  --bucket my-accelerated-bucket \
  --accelerate-configuration Status=Enabled

# Upload using acceleration endpoint
aws s3 cp large-file.zip \
  s3://my-accelerated-bucket/large-file.zip \
  --endpoint-url https://s3-accelerate.amazonaws.com \
  --region us-east-1
```

**Cost Analysis**

Transfer Acceleration pricing: $0.04 to $0.08 per GB (in addition to standard transfer costs)

Example: Uploading 1 TB from Asia to US-East-1
- Without acceleration: 8 hours at 300 Mbps
- With acceleration: 3 hours at 800 Mbps
- Cost: 1,000 GB × $0.04 = $40
- Time savings: 5 hours

When to use:
- Customers distributed globally
- Large files from distant locations
- Time-sensitive transfers
- Upload speeds < 50% of available bandwidth

### AWS Direct Connect

Direct Connect establishes dedicated network connections from on-premises data centers to AWS, bypassing the public internet.

**Connection Options**
- Dedicated Connection: 1 Gbps, 10 Gbps, 100 Gbps
- Hosted Connection: 50 Mbps to 10 Gbps (through AWS Partner)

**Benefits**
- Consistent network performance
- Reduced bandwidth costs (vs internet transfer)
- Private connectivity (not over public internet)
- Access to public and private AWS services

**Typical Setup**

```
On-Premises Data Center
    ↓
Customer Router
    ↓
AWS Direct Connect Location
    ↓
AWS Direct Connect Endpoint
    ↓
Virtual Private Gateway / Direct Connect Gateway
    ↓
VPC / AWS Services
```

**Cost Structure**

Port hours + Data transfer out

Example: 10 Gbps connection in US East
- Port charge: $2.25/hour = $1,620/month
- Data transfer out: $0.02/GB (vs $0.09/GB internet)

Transfer 100 TB/month:
- Direct Connect: $1,620 + (100,000 GB × $0.02) = $3,620
- Internet transfer: 100,000 GB × $0.09 = $9,000
- Monthly savings: $5,380

Break-even point: ~20 TB/month transfer

## Offline Transfer Methods

### AWS Snow Family Overview

AWS Snow Family provides physical devices for data transfer when network-based migration is impractical.

**Device Comparison**

| Device | Capacity | Use Case | Transfer Time | Cost |
|--------|----------|----------|---------------|------|
| Snowcone | 8 TB HDD / 14 TB SSD | Edge computing, small migrations | Days | ~$60 + shipping |
| Snowball Edge Storage | 80 TB | Medium migrations (TBs) | 1-2 weeks | ~$300 + shipping |
| Snowball Edge Compute | 42 TB + GPU | Edge compute + migration | 1-2 weeks | ~$400 + shipping |
| Snowmobile | 100 PB | Exabyte-scale migrations | Months | Custom pricing |

### When to Use Offline Transfer

**Network Transfer Time Calculation**

Formula: Transfer Time (days) = Data Size (GB) / (Bandwidth (Mbps) × 0.125 × 86,400 × Efficiency)

Example calculations with 80% network efficiency:

**1 TB Dataset**
- 100 Mbps: 1,000 GB / (100 × 0.125 × 86,400 × 0.8) = 1.16 days
- 1 Gbps: 1,000 GB / (1,000 × 0.125 × 86,400 × 0.8) = 0.12 days (2.9 hours)

**50 TB Dataset**
- 100 Mbps: 50,000 GB / (100 × 0.125 × 86,400 × 0.8) = 58 days
- 1 Gbps: 50,000 GB / (1,000 × 0.125 × 86,400 × 0.8) = 5.8 days

**500 TB Dataset**
- 100 Mbps: 500,000 GB / (100 × 0.125 × 86,400 × 0.8) = 579 days (19 months)
- 1 Gbps: 500,000 GB / (1,000 × 0.125 × 86,400 × 0.8) = 58 days

**Decision Matrix**

Use offline transfer (Snowball) when:
- Transfer would take > 1 week over network
- Limited bandwidth availability
- Data size > 10 TB with < 1 Gbps bandwidth
- High network costs
- Security requirements mandate offline transfer

Use online transfer when:
- Transfer time < 1 week
- High-bandwidth connection available
- Continuous sync needed
- Small to medium datasets (< 10 TB)

### AWS Snowball Workflow

**Step-by-Step Process**

1. **Job Creation**
```bash
aws snowball create-job \
  --job-type IMPORT \
  --resources '{
    "S3Resources": [{
      "BucketArn": "arn:aws:s3:::my-migration-bucket",
      "KeyRange": {
        "BeginMarker": "",
        "EndMarker": ""
      }
    }]
  }' \
  --description "Data center migration Q1 2025" \
  --address-id ADID1234567890abc \
  --kms-key-arn arn:aws:kms:us-east-1:123456789012:key/12345678 \
  --role-arn arn:aws:iam::123456789012:role/SnowballRole \
  --snowball-capacity-preference T80
```

2. **Device Shipment**
- AWS ships Snowball device to specified address
- Typical shipping: 2-3 days
- E-ink display shows shipping label

3. **Data Copy**
```bash
# Install Snowball client
wget https://snowball-client.s3.amazonaws.com/latest/snowball-client-linux.tar.gz
tar -xzvf snowball-client-linux.tar.gz

# Unlock device
snowball unlock-device \
  --manifest-file /path/to/manifest.bin \
  --unlock-code 29-character-code

# Copy data
snowball cp --recursive /data/source s3://my-migration-bucket/
```

4. **Return Shipment**
- Power off device
- E-ink display automatically updates with return label
- Schedule pickup or drop at carrier location

5. **Data Import**
- AWS imports data to S3 upon receipt
- Typically completes within 1 business day
- Verification email sent upon completion

**Timeline Example**

Day 0: Order Snowball device
Day 3: Device arrives on-premises
Day 3-7: Copy 80 TB data (4 days @ 20 TB/day)
Day 7: Ship device back to AWS
Day 10: AWS receives device
Day 11: Data import to S3 completed
Day 12: Device securely erased

Total: 12 days for 80 TB migration

### Snowmobile for Exabyte-Scale Migrations

AWS Snowmobile is a 45-foot shipping container that can transfer up to 100 PB of data.

**Specifications**
- Capacity: 100 PB
- Physical Security: GPS tracking, 24/7 video surveillance, security escort
- Power: 350 KVA
- Network: Multiple 40 Gbps connections
- Ruggedized shipping container

**When to Use Snowmobile**
- Data center shutdowns (multi-PB migrations)
- Video archive migrations
- Seismic/genomic research data
- Large-scale cloud adoption

**Cost Comparison: 100 PB Migration**

Network transfer at 10 Gbps:
- Transfer time: 100,000 TB / (10 Gbps × 0.125 × 86,400 × 0.8) = 1,157 days (3.2 years)
- Cost: Not feasible

Snowmobile:
- Transfer time: ~6 months (including setup, transfer, import)
- Cost: Custom pricing, typically 10-20% of network transfer cost

## Database Migration

### AWS Database Migration Service (DMS)

DMS enables database migration with minimal downtime by continuously replicating data while the source database remains operational.

**Supported Sources**
- On-premises: Oracle, SQL Server, MySQL, PostgreSQL, MongoDB, SAP
- AWS: RDS, Aurora, S3, DynamoDB
- Azure: Azure SQL Database
- Google Cloud: Cloud SQL

**Supported Targets**
- All AWS database services
- Redshift, S3, Kinesis, Elasticsearch, DocumentDB

**Migration Strategies**

1. **Full Load Migration**
   - One-time migration of existing data
   - Source database can be offline
   - Fastest for smaller databases

2. **Full Load + CDC (Change Data Capture)**
   - Initial full load of data
   - Continuous replication of ongoing changes
   - Enables near-zero downtime migration

3. **CDC Only**
   - Replicate only ongoing changes
   - Requires initial data to be pre-loaded
   - Used for ongoing replication

**Configuration Example**

```bash
# Create replication instance
aws dms create-replication-instance \
  --replication-instance-identifier migration-instance \
  --replication-instance-class dms.c5.2xlarge \
  --allocated-storage 100 \
  --vpc-security-group-ids sg-0123456789abcdef0 \
  --multi-az \
  --engine-version 3.4.7

# Create source endpoint (on-premises MySQL)
aws dms create-endpoint \
  --endpoint-identifier source-mysql \
  --endpoint-type source \
  --engine-name mysql \
  --server-name 192.168.1.50 \
  --port 3306 \
  --username dms_user \
  --password "SecurePassword123" \
  --database-name production_db

# Create target endpoint (RDS Aurora)
aws dms create-endpoint \
  --endpoint-identifier target-aurora \
  --endpoint-type target \
  --engine-name aurora-mysql \
  --server-name aurora-cluster.cluster-123456.us-east-1.rds.amazonaws.com \
  --port 3306 \
  --username admin \
  --password "SecurePassword456" \
  --database-name migrated_db

# Create migration task
aws dms create-replication-task \
  --replication-task-identifier db-migration-task \
  --source-endpoint-arn arn:aws:dms:us-east-1:123456789012:endpoint:source-mysql \
  --target-endpoint-arn arn:aws:dms:us-east-1:123456789012:endpoint:target-aurora \
  --replication-instance-arn arn:aws:dms:us-east-1:123456789012:rep:migration-instance \
  --migration-type full-load-and-cdc \
  --table-mappings file://table-mappings.json \
  --replication-task-settings file://task-settings.json
```

Table mappings (table-mappings.json):
```json
{
  "rules": [
    {
      "rule-type": "selection",
      "rule-id": "1",
      "rule-name": "include-all-tables",
      "object-locator": {
        "schema-name": "production_db",
        "table-name": "%"
      },
      "rule-action": "include"
    },
    {
      "rule-type": "transformation",
      "rule-id": "2",
      "rule-name": "rename-schema",
      "rule-target": "schema",
      "object-locator": {
        "schema-name": "production_db"
      },
      "value": "migrated_db",
      "rule-action": "rename"
    }
  ]
}
```

### Schema Conversion Tools

AWS Schema Conversion Tool (SCT) converts database schemas from one engine to another.

**Common Conversions**
- Oracle → Aurora PostgreSQL
- SQL Server → Aurora MySQL
- Teradata → Redshift
- Oracle → Redshift

**Conversion Assessment**

SCT generates migration assessment reports:
- Automatic conversion feasibility
- Manual effort required
- Estimated complexity
- Migration recommendations

**Example Workflow**

1. Install AWS SCT
2. Connect to source database
3. Generate assessment report
4. Review schema conversion
5. Apply manual adjustments
6. Export converted schema
7. Apply to target database
8. Use DMS for data migration

## Cross-Region Replication

### S3 Replication

S3 supports automatic replication of objects across regions for disaster recovery and compliance.

**Replication Types**
- Cross-Region Replication (CRR): Different AWS regions
- Same-Region Replication (SRR): Within same region

**Configuration**

```bash
# Enable versioning (required for replication)
aws s3api put-bucket-versioning \
  --bucket source-bucket \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-versioning \
  --bucket destination-bucket \
  --versioning-configuration Status=Enabled

# Create replication configuration
aws s3api put-bucket-replication \
  --bucket source-bucket \
  --replication-configuration '{
    "Role": "arn:aws:iam::123456789012:role/S3ReplicationRole",
    "Rules": [
      {
        "ID": "ReplicateAll",
        "Priority": 1,
        "Status": "Enabled",
        "Filter": {},
        "Destination": {
          "Bucket": "arn:aws:s3:::destination-bucket",
          "ReplicationTime": {
            "Status": "Enabled",
            "Time": {
              "Minutes": 15
            }
          },
          "Metrics": {
            "Status": "Enabled",
            "EventThreshold": {
              "Minutes": 15
            }
          },
          "StorageClass": "STANDARD_IA"
        },
        "DeleteMarkerReplication": {
          "Status": "Enabled"
        }
      }
    ]
  }'
```

**Replication Features**
- Replica Time Control (RTC): 99.99% of objects replicated within 15 minutes
- Replication metrics: Monitor replication lag
- Delete marker replication: Replicate deletions
- Cross-account replication: Replicate to different AWS account

**Cost Considerations**

For 10 TB of data replicated from US-East-1 to EU-West-1:
- Replication data transfer: 10,000 GB × $0.02 = $200
- Destination storage: 10,000 GB × $0.023 = $230/month
- RTC pricing: $10/million objects replicated
- Total: ~$430 + RTC costs

### RDS Cross-Region Read Replicas

RDS supports cross-region read replicas for disaster recovery and read scaling.

**Configuration**

```bash
aws rds create-db-instance-read-replica \
  --db-instance-identifier dr-replica-eu-west-1 \
  --source-db-instance-identifier arn:aws:rds:us-east-1:123456789012:db:production-db \
  --db-instance-class db.r5.2xlarge \
  --availability-zone eu-west-1a \
  --publicly-accessible false \
  --storage-encrypted \
  --kms-key-id arn:aws:kms:eu-west-1:123456789012:key/87654321
```

**Replication Lag Monitoring**

```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/RDS \
  --metric-name ReplicaLag \
  --dimensions Name=DBInstanceIdentifier,Value=dr-replica-eu-west-1 \
  --start-time 2025-12-23T00:00:00Z \
  --end-time 2025-12-23T23:59:59Z \
  --period 300 \
  --statistics Average
```

Typical replication lag: 1-5 seconds under normal conditions

## Hybrid Cloud Data Transfer

### AWS Storage Gateway

Storage Gateway connects on-premises environments with cloud storage, providing seamless integration.

**Gateway Types**

1. **File Gateway**
   - NFS/SMB interface to S3
   - Local cache for frequently accessed files
   - Automatic upload to S3

2. **Volume Gateway**
   - iSCSI block storage backed by S3
   - Cached mode: Primary data in S3, cache on-premises
   - Stored mode: Primary data on-premises, async backup to S3

3. **Tape Gateway**
   - Virtual tape library backed by S3/Glacier
   - Compatible with existing backup software
   - Eliminate physical tape management

**File Gateway Configuration**

```bash
# Create gateway
aws storagegateway activate-gateway \
  --activation-key ABCDE-12345-FGHIJ-67890 \
  --gateway-name on-prem-file-gateway \
  --gateway-timezone GMT-5:00 \
  --gateway-region us-east-1 \
  --gateway-type FILE_S3

# Create SMB file share
aws storagegateway create-smb-file-share \
  --gateway-arn arn:aws:storagegateway:us-east-1:123456789012:gateway/sgw-12345678 \
  --location-arn arn:aws:s3:::my-gateway-bucket/files/ \
  --role arn:aws:iam::123456789012:role/StorageGatewayRole \
  --client-token $(uuidgen) \
  --default-storage-class S3_INTELLIGENT_TIERING \
  --object-acl bucket-owner-full-control \
  --read-only false \
  --guess-mime-type-enabled true \
  --valid-user-list "user1,user2"
```

**Use Cases**
- Gradual cloud migration (hybrid storage)
- Backup and disaster recovery
- Tiered storage (hot data on-prem, cold in cloud)
- Cloud bursting for analytics

## Migration Best Practices

### Planning and Assessment

**Discovery Phase**
1. Inventory data sources and volumes
2. Map dependencies and relationships
3. Identify performance requirements
4. Assess compliance and security needs
5. Calculate network bandwidth availability

**Assessment Tools**
- AWS Application Discovery Service
- CloudEndure Migration Assessment
- Migration Evaluator (formerly TSO Logic)

**Migration Wave Planning**

Group applications into migration waves:
- Wave 1: Low-risk, low-dependency applications (proof of concept)
- Wave 2: Medium complexity applications
- Wave 3: Complex, mission-critical applications
- Wave 4: Legacy systems requiring refactoring

### Testing and Validation

**Pre-Migration Testing**
1. Bandwidth testing: Verify network performance
2. Pilot migration: Small dataset test
3. Application compatibility: Verify functionality
4. Performance baseline: Measure source system

**Post-Migration Validation**
1. Data integrity: Checksum verification
2. Record counts: Compare source and destination
3. Performance testing: Validate acceptable performance
4. Application testing: End-to-end functionality
5. Rollback plan: Verify ability to revert

**Validation Script Example**

```bash
#!/bin/bash
# Simple S3 migration validation

SOURCE_BUCKET="on-prem-data"
DEST_BUCKET="migrated-data"

# Compare object counts
SOURCE_COUNT=$(aws s3 ls s3://$SOURCE_BUCKET --recursive | wc -l)
DEST_COUNT=$(aws s3 ls s3://$DEST_BUCKET --recursive | wc -l)

echo "Source objects: $SOURCE_COUNT"
echo "Destination objects: $DEST_COUNT"

if [ $SOURCE_COUNT -eq $DEST_COUNT ]; then
  echo "Object count match: PASS"
else
  echo "Object count mismatch: FAIL"
  exit 1
fi

# Verify random sample integrity
aws s3 ls s3://$SOURCE_BUCKET --recursive | \
  shuf -n 100 | \
  while read -r line; do
    FILE=$(echo $line | awk '{print $4}')
    SOURCE_MD5=$(aws s3api head-object --bucket $SOURCE_BUCKET --key "$FILE" --query 'ETag' --output text | tr -d '"')
    DEST_MD5=$(aws s3api head-object --bucket $DEST_BUCKET --key "$FILE" --query 'ETag' --output text | tr -d '"')

    if [ "$SOURCE_MD5" != "$DEST_MD5" ]; then
      echo "MD5 mismatch for $FILE"
      exit 1
    fi
  done

echo "Sample integrity check: PASS"
```

### Cutover Strategies

**Big Bang Cutover**
- Schedule downtime window
- Complete migration during window
- Switch all users to new system
- Suitable for: Small databases, can tolerate downtime

**Phased Cutover**
- Migrate in phases (departments, geographies)
- Gradual user migration
- Longer timeline, lower risk
- Suitable for: Large organizations, complex systems

**Pilot Light**
- Maintain minimal core in cloud
- Scale up during cutover
- Fastest recovery in DR scenario
- Suitable for: Disaster recovery migrations

**Blue-Green Deployment**
- Run parallel environments
- Switch traffic when ready
- Easy rollback
- Suitable for: Zero-downtime requirements

**Example: DMS Blue-Green Cutover**

1. **Initial State**: Production on-premises
2. **Replication**: DMS full-load + CDC to AWS
3. **Validation**: Monitor replication lag < 1 second
4. **Read-Only Mode**: Set source to read-only
5. **Final Sync**: Wait for replication to complete
6. **DNS Switch**: Update DNS to point to AWS
7. **Monitoring**: Verify application functionality
8. **Decommission**: Shut down on-premises after validation period

## Summary

Data transfer and migration strategies in cloud computing range from high-speed online transfers using DataSync and Direct Connect to massive offline migrations using Snow Family devices. The choice between methods depends on data volume, bandwidth availability, time constraints, and cost considerations. For datasets exceeding 10 TB with limited bandwidth, offline transfer typically provides faster, more cost-effective migration. Database migrations benefit from DMS's continuous replication capabilities, enabling near-zero downtime transitions. Cross-region replication ensures data availability and disaster recovery, while hybrid solutions like Storage Gateway facilitate gradual cloud adoption. Successful migrations require thorough planning, rigorous testing, and well-defined cutover strategies to minimize risk and ensure data integrity throughout the transfer process.
