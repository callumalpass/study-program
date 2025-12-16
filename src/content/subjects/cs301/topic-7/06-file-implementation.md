# File System Implementation

File system implementation involves on-disk structures and algorithms. This subtopic covers block allocation, inodes, directory implementation, and free space management.

## Disk Organization

### Disk Layout

```
┌──────────┬──────────┬──────────┬─────────────────────┐
│  Boot    │  Super   │  Block   │                     │
│  Block   │  Block   │  Bitmap  │    Data Blocks      │
│          │          │  Inode   │                     │
│          │          │  Table   │                     │
└──────────┴──────────┴──────────┴─────────────────────┘
```

### Superblock

```c
struct Superblock {
    uint32_t magic;           // File system identifier
    uint32_t block_size;      // Size of each block
    uint32_t total_blocks;    // Total blocks in FS
    uint32_t free_blocks;     // Free block count
    uint32_t total_inodes;    // Total inodes
    uint32_t free_inodes;     // Free inode count
    uint32_t first_data_block;
    uint32_t inode_table_start;
    uint32_t block_bitmap_start;
    uint32_t inode_bitmap_start;
    time_t mount_time;
    time_t write_time;
};
```

## Block Allocation Methods

### Contiguous Allocation

Each file occupies contiguous blocks:

```
File Table:
┌──────────┬───────┬────────┐
│   File   │ Start │ Length │
├──────────┼───────┼────────┤
│ file1    │   0   │   3    │
│ file2    │   5   │   2    │
│ file3    │  10   │   4    │
└──────────┴───────┴────────┘

Disk:
│ F1 │ F1 │ F1 │    │    │ F2 │ F2 │    │    │    │ F3 │ F3 │ F3 │ F3 │
  0    1    2    3    4    5    6    7    8    9   10   11   12   13
```

**Pros**: Fast sequential access, simple
**Cons**: External fragmentation, file can't grow

### Linked Allocation

Each block contains pointer to next:

```
Directory: file1 → block 5

Block 5:    Block 8:    Block 2:    Block 12:
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ data   │  │ data   │  │ data   │  │ data   │
│ next:8 │→ │ next:2 │→ │next:12 │→ │next:-1 │
└────────┘  └────────┘  └────────┘  └────────┘
```

**Pros**: No external fragmentation, files can grow
**Cons**: Slow random access, pointer overhead

### File Allocation Table (FAT)

Linked allocation with table in memory:

```c
// FAT in memory
int FAT[NUM_BLOCKS];

// FAT[i] = next block for block i, or -1 if end

// Read file sequentially
void read_file_fat(int first_block) {
    int block = first_block;
    while (block != -1) {
        read_block(block);
        block = FAT[block];
    }
}

// Random access: must traverse chain
int find_block_fat(int first_block, int index) {
    int block = first_block;
    for (int i = 0; i < index; i++) {
        block = FAT[block];
        if (block == -1) return -1;
    }
    return block;
}
```

### Indexed Allocation

Index block contains all block pointers:

```
Directory: file1 → index block 5

Index Block 5:        Data Blocks:
┌─────────────┐      ┌─────────────┐
│ ptr[0]: 10  │──────│ Block 10    │
│ ptr[1]: 3   │──┐   └─────────────┘
│ ptr[2]: 8   │──┼─→ ┌─────────────┐
│ ptr[3]: 15  │  │   │ Block 3     │
│ ...         │  │   └─────────────┘
└─────────────┘  │   ┌─────────────┐
                 └──→│ Block 8     │
                     └─────────────┘
```

**Pros**: Efficient random access, no external fragmentation
**Cons**: Index block overhead, limited file size

## Unix Inode Structure

Multi-level indexed allocation:

```c
struct Inode {
    mode_t mode;              // File type and permissions
    uid_t uid;                // Owner
    gid_t gid;                // Group
    uint64_t size;            // File size
    time_t atime, mtime, ctime;
    uint32_t links;           // Hard link count
    uint32_t blocks;          // Blocks allocated

    uint32_t direct[12];      // Direct block pointers
    uint32_t indirect;        // Single indirect
    uint32_t double_indirect; // Double indirect
    uint32_t triple_indirect; // Triple indirect
};
```

### Inode Block Layout

```
                    Inode
                      │
    ┌─────────────────┼─────────────────┐
    │                 │                 │
    ↓                 ↓                 ↓
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Direct   │    │ Indirect │    │ Double   │
│ Blocks   │    │ Block    │    │ Indirect │
│ (12)     │    │          │    │          │
└──────────┘    └────┬─────┘    └────┬─────┘
                     │               │
              ┌──────┴──────┐   ┌────┴────┐
              ↓      ↓      ↓   ↓    ↓    ↓
           [data] [data] [data] [ind] [ind] [ind]
                                  │     │     │
                               [data] ...  ...
```

### Maximum File Size Calculation

```
Block size: 4KB
Pointers per block: 4096/4 = 1024

Direct:          12 × 4KB = 48KB
Single indirect: 1024 × 4KB = 4MB
Double indirect: 1024 × 1024 × 4KB = 4GB
Triple indirect: 1024³ × 4KB = 4TB

Maximum file size ≈ 4TB (with 4KB blocks)
```

### Block Lookup

```c
uint32_t get_block(struct Inode* inode, uint32_t file_block) {
    // Direct blocks
    if (file_block < 12) {
        return inode->direct[file_block];
    }
    file_block -= 12;

    // Single indirect
    if (file_block < 1024) {
        uint32_t* indirect = read_block(inode->indirect);
        return indirect[file_block];
    }
    file_block -= 1024;

    // Double indirect
    if (file_block < 1024 * 1024) {
        uint32_t* double_ind = read_block(inode->double_indirect);
        uint32_t* indirect = read_block(double_ind[file_block / 1024]);
        return indirect[file_block % 1024];
    }
    file_block -= 1024 * 1024;

    // Triple indirect
    uint32_t* triple = read_block(inode->triple_indirect);
    uint32_t* double_ind = read_block(triple[file_block / (1024*1024)]);
    uint32_t* indirect = read_block(double_ind[(file_block/1024) % 1024]);
    return indirect[file_block % 1024];
}
```

## Directory Implementation

### Linear List

```c
struct DirectoryEntry {
    char name[255];
    uint32_t inode;
    uint8_t name_len;
    uint8_t type;
};

// Search is O(n)
uint32_t lookup_linear(struct DirectoryEntry* dir, int n, char* name) {
    for (int i = 0; i < n; i++) {
        if (strcmp(dir[i].name, name) == 0) {
            return dir[i].inode;
        }
    }
    return 0;  // Not found
}
```

### Hash Table

```c
#define HASH_SIZE 128

struct DirHashEntry {
    char name[255];
    uint32_t inode;
    struct DirHashEntry* next;
};

struct DirHashTable {
    struct DirHashEntry* buckets[HASH_SIZE];
};

uint32_t lookup_hash(struct DirHashTable* ht, char* name) {
    uint32_t h = hash(name) % HASH_SIZE;
    struct DirHashEntry* e = ht->buckets[h];

    while (e != NULL) {
        if (strcmp(e->name, name) == 0) {
            return e->inode;
        }
        e = e->next;
    }
    return 0;
}
```

### B-Tree (Modern File Systems)

```
For directories with many entries:

        [M]
       /   \
    [D,H]  [P,T]
   /  |  \   |   \
[A-C][E-G][I-O][Q-S][U-Z]

O(log n) lookup
Used by ext4, NTFS, XFS
```

## Free Space Management

### Bitmap

```c
// One bit per block: 0 = free, 1 = allocated
uint8_t bitmap[NUM_BLOCKS / 8];

bool is_free(int block) {
    return (bitmap[block / 8] & (1 << (block % 8))) == 0;
}

void allocate(int block) {
    bitmap[block / 8] |= (1 << (block % 8));
}

void deallocate(int block) {
    bitmap[block / 8] &= ~(1 << (block % 8));
}

int find_free_block() {
    for (int i = 0; i < NUM_BLOCKS / 8; i++) {
        if (bitmap[i] != 0xFF) {  // Has free bit
            for (int j = 0; j < 8; j++) {
                if ((bitmap[i] & (1 << j)) == 0) {
                    return i * 8 + j;
                }
            }
        }
    }
    return -1;  // No free blocks
}
```

### Free List

```c
// Linked list of free blocks
struct FreeList {
    uint32_t next_free;  // First free block
};

// Each free block contains pointer to next
// Block 0: next = 5
// Block 5: next = 12
// Block 12: next = -1 (end)

uint32_t allocate_block(struct FreeList* fl) {
    uint32_t block = fl->next_free;
    if (block != -1) {
        fl->next_free = read_next_pointer(block);
    }
    return block;
}
```

### Block Groups

```
Modern file systems divide disk into groups:

┌────────────┬────────────┬────────────┬────────────┐
│  Group 0   │  Group 1   │  Group 2   │  Group 3   │
├────────────┼────────────┼────────────┼────────────┤
│ Super│Desc │ Super│Desc │ Super│Desc │ Super│Desc │
│ Bitmap     │ Bitmap     │ Bitmap     │ Bitmap     │
│ Inodes     │ Inodes     │ Inodes     │ Inodes     │
│ Data       │ Data       │ Data       │ Data       │
└────────────┴────────────┴────────────┴────────────┘

Locality: Keep file's blocks in same group
Redundancy: Superblock copies in each group
```

## Journaling

Recover from crashes by logging operations:

```c
// Before modifying file system:
// 1. Write intent to journal
// 2. Perform actual modifications
// 3. Mark journal entry complete

struct JournalEntry {
    uint32_t transaction_id;
    uint32_t block_num;
    uint8_t old_data[BLOCK_SIZE];
    uint8_t new_data[BLOCK_SIZE];
    bool committed;
};

void journaled_write(int block, void* data) {
    // Log to journal first
    struct JournalEntry entry;
    entry.block_num = block;
    memcpy(entry.old_data, read_block(block), BLOCK_SIZE);
    memcpy(entry.new_data, data, BLOCK_SIZE);
    entry.committed = false;
    write_journal(&entry);

    // Perform actual write
    write_block(block, data);

    // Mark committed
    entry.committed = true;
    update_journal(&entry);
}
```

### Recovery

```c
void recover_from_journal() {
    // Replay uncommitted transactions
    for (each entry in journal) {
        if (!entry.committed) {
            // Transaction incomplete - rollback
            write_block(entry.block_num, entry.old_data);
        }
    }
    clear_journal();
}
```

## Summary

File system implementation involves:
- Superblock stores file system metadata
- Block allocation: contiguous, linked, indexed, multi-level
- Unix inodes use multi-level indexing (direct + indirect)
- Directories map names to inodes
- Free space tracked with bitmaps or free lists
- Block groups improve locality
- Journaling enables crash recovery
- Trade-offs between simplicity and performance
