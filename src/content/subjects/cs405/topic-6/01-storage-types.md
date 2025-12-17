# Cloud Storage Types

Cloud storage provides scalable, durable, and cost-effective data storage with multiple service types for different use cases.

## Object Storage

Store unstructured data as objects with metadata and unique identifiers.

**AWS S3**:
```bash
# Upload file
aws s3 cp file.txt s3://my-bucket/

# List objects
aws s3 ls s3://my-bucket/

# Download file
aws s3 cp s3://my-bucket/file.txt ./
```

**Features**:
- Unlimited storage
- 99.999999999% (11 9's) durability
- Storage classes (Standard, IA, Glacier)
- Lifecycle policies
- Versioning
- Encryption

**Use Cases**: Backups, static websites, data lakes, media storage

## Block Storage

Persistent block-level storage volumes attached to instances.

**AWS EBS**: Elastic Block Store for EC2
**Azure Managed Disks**: For Azure VMs
**GCP Persistent Disks**: For Compute Engine

**Types**:
- **SSD**: High IOPS (gp3, io2)
- **HDD**: Throughput optimized (st1, sc1)

**Use Cases**: Databases, transactional workloads, boot volumes

## File Storage

Shared filesystem accessible by multiple instances.

**AWS EFS**: Elastic File System (NFS)
**Azure Files**: SMB/NFS file shares
**GCP Filestore**: Managed NFS

**Features**:
- POSIX-compliant
- Concurrent access
- Auto-scaling
- Regional availability

**Use Cases**: Content management, web serving, shared application data

## Comparison

| Type | Access | Protocol | Use Case |
|------|--------|----------|----------|
| **Object** | HTTP API | S3 API | Unstructured data, backups |
| **Block** | Attached volume | SCSI | Databases, boot volumes |
| **File** | Network share | NFS/SMB | Shared files, content |

## Summary

Choose storage type based on access patterns, performance requirements, and use case: object for unstructured data, block for databases, file for shared access.
