---
id: cs301-t7-examples
title: "File System Examples"
order: 7
---

# File System Examples

Modern file systems implement advanced features for performance and reliability. This subtopic covers ext4, XFS, Btrfs, ZFS, and other file systems.

## ext4 (Fourth Extended File System)

The default Linux file system:

### Features

```
- Maximum file size: 16TB
- Maximum FS size: 1EB (exabyte)
- Extents (contiguous block allocation)
- Journaling (metadata + optional data)
- Delayed allocation
- Multi-block allocation
```

### ext4 On-Disk Layout

```
┌───────────────────────────────────────────────────────┐
│ Boot │ Block │ Block │ Block │         │             │
│ Sect │ Group │ Group │ Group │   ...   │ Block Group │
│      │   0   │   1   │   2   │         │     N       │
└───────────────────────────────────────────────────────┘

Block Group:
┌─────────┬─────────┬────────┬────────┬───────────────┐
│ Group   │ Block   │ Inode  │ Inode  │               │
│ Descrip │ Bitmap  │ Bitmap │ Table  │  Data Blocks  │
└─────────┴─────────┴────────┴────────┴───────────────┘
```

### Extents

```c
// Instead of individual block pointers
struct ext4_extent {
    uint32_t ee_block;     // First file block
    uint16_t ee_len;       // Number of blocks
    uint16_t ee_start_hi;  // Physical block (high)
    uint32_t ee_start_lo;  // Physical block (low)
};

// Efficient for contiguous files
// One extent can represent many blocks
```

### Creating ext4

```bash
# Create ext4 filesystem
mkfs.ext4 /dev/sda1

# Mount with options
mount -t ext4 -o noatime,data=writeback /dev/sda1 /mnt

# Check filesystem
e2fsck -f /dev/sda1

# Tune parameters
tune2fs -O ^has_journal /dev/sda1  # Disable journal
tune2fs -o journal_data /dev/sda1  # Full data journaling
```

## XFS

High-performance file system for large files:

### Features

```
- Allocation groups (parallel allocation)
- B+ trees for inodes and directories
- Delayed allocation
- Online defragmentation
- Maximum file size: 8EB
```

### XFS Structure

```
┌─────────────────────────────────────────────┐
│   AG 0    │   AG 1    │   AG 2    │  ...   │
├───────────┼───────────┼───────────┼────────┤
│ Superblk  │ Superblk  │ Superblk  │        │
│ Free Spc  │ Free Spc  │ Free Spc  │        │
│ Inode     │ Inode     │ Inode     │        │
│ B+Trees   │ B+Trees   │ B+Trees   │        │
│ Data      │ Data      │ Data      │        │
└───────────┴───────────┴───────────┴────────┘

Each Allocation Group independent
Parallel operations across AGs
```

### XFS Commands

```bash
# Create XFS
mkfs.xfs /dev/sda1

# Mount
mount -t xfs /dev/sda1 /mnt

# Defragment file
xfs_fsr /path/to/file

# Check and repair
xfs_repair /dev/sda1

# Grow filesystem (online)
xfs_growfs /mnt
```

## Btrfs (B-tree File System)

Copy-on-write file system with advanced features:

### Features

```
- Copy-on-write (COW)
- Snapshots (instant, space-efficient)
- Built-in RAID
- Transparent compression
- Checksums for data integrity
- Subvolumes
- Online resize and defrag
```

### Copy-on-Write

```
Original:      After modification (COW):
┌───────┐     ┌───────┐
│ Root  │     │ Root' │←── New root
└───┬───┘     └───┬───┘
    │             │
┌───┴───┐     ┌───┴───┐───┐
│ Node  │     │ Node  │   │
└───┬───┘     └───┬───┘   │
    │             │       │
┌───┴───┐     ┌───┴───┐ ┌─┴─────┐
│ Data  │     │ Data  │ │ Data' │←── Modified
└───────┘     └───────┘ └───────┘
              (original   (new
               unchanged)   copy)
```

### Btrfs Subvolumes and Snapshots

```bash
# Create subvolume
btrfs subvolume create /mnt/@home

# Create snapshot
btrfs subvolume snapshot /mnt/@home /mnt/@home_snapshot

# Read-only snapshot
btrfs subvolume snapshot -r /mnt/@home /mnt/@home_backup

# List subvolumes
btrfs subvolume list /mnt
```

### Btrfs RAID

```bash
# Create RAID1 (mirror)
mkfs.btrfs -d raid1 -m raid1 /dev/sda /dev/sdb

# Add device to existing
btrfs device add /dev/sdc /mnt
btrfs balance start -dconvert=raid1 -mconvert=raid1 /mnt
```

## ZFS

Enterprise-grade file system and volume manager:

### Features

```
- 128-bit addressing
- Copy-on-write
- Snapshots and clones
- Built-in RAID (RAID-Z)
- Data integrity (checksums)
- Deduplication
- Compression
- Pools and datasets
```

### ZFS Structure

```
┌─────────────────────────────────────────────────────┐
│                      Pool                           │
├─────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────────┐   │
│  │  Dataset  │  │  Dataset  │  │   ZVOL        │   │
│  │ (fs)      │  │ (child)   │  │ (block dev)   │   │
│  └───────────┘  └───────────┘  └───────────────┘   │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │              Virtual Devices                 │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐      │   │
│  │  │ Mirror  │  │ RAID-Z  │  │ Stripe  │      │   │
│  │  └─────────┘  └─────────┘  └─────────┘      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### ZFS Commands

```bash
# Create pool
zpool create tank /dev/sda /dev/sdb

# Create RAID-Z pool
zpool create tank raidz /dev/sda /dev/sdb /dev/sdc

# Create dataset
zfs create tank/home

# Snapshot
zfs snapshot tank/home@backup1

# Clone snapshot
zfs clone tank/home@backup1 tank/home_copy

# Enable compression
zfs set compression=lz4 tank/home

# Enable dedup
zfs set dedup=on tank/data

# Show pool status
zpool status tank
```

## Comparison

| Feature | ext4 | XFS | Btrfs | ZFS |
|---------|------|-----|-------|-----|
| Max File | 16TB | 8EB | 16EB | 16EB |
| COW | No | No | Yes | Yes |
| Snapshots | No | No | Yes | Yes |
| Checksums | Metadata | Metadata | All | All |
| Compression | No | No | Yes | Yes |
| RAID | No | No | Yes | Yes |
| Dedup | No | No | Yes | Yes |
| Maturity | High | High | Medium | High |

## Windows File Systems

### NTFS

```
Features:
- Access Control Lists (ACLs)
- Encryption (EFS)
- Compression
- Journaling
- Sparse files
- Hard and symbolic links

Structure:
- Master File Table (MFT)
- B+ tree directories
- Clusters as allocation unit
```

### ReFS (Resilient File System)

```
Features:
- Integrity streams (checksums)
- Block cloning (COW)
- Storage Spaces integration
- Large volume support
- No in-place metadata updates
```

## Network File Systems

### NFS (Network File System)

```bash
# Server: Export directory
# /etc/exports:
/shared 192.168.1.0/24(rw,sync,no_subtree_check)

exportfs -a

# Client: Mount NFS share
mount -t nfs server:/shared /mnt
```

### SMB/CIFS

```bash
# Mount Windows share
mount -t cifs //server/share /mnt -o user=admin

# Or using credentials file
mount -t cifs //server/share /mnt -o credentials=/etc/samba/creds
```

## File System Selection Guide

```
Use ext4 when:
- General Linux workload
- Stability is priority
- Don't need advanced features

Use XFS when:
- Large files
- High performance needed
- Parallel I/O workloads

Use Btrfs when:
- Need snapshots
- Want built-in RAID
- Compression desired

Use ZFS when:
- Data integrity critical
- Enterprise storage
- Complex storage needs
```

## Summary

Modern file systems offer diverse capabilities:
- **ext4**: Stable, mature, good default choice
- **XFS**: Excellent for large files, parallel I/O
- **Btrfs**: COW, snapshots, built-in RAID
- **ZFS**: Enterprise features, data integrity
- Copy-on-write enables efficient snapshots
- Checksums detect silent corruption
- Choice depends on workload and requirements
- Network file systems enable remote storage
