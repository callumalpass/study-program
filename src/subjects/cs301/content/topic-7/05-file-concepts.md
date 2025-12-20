---
id: cs301-t7-files
title: "File System Concepts"
order: 5
---

# File System Concepts

File systems provide persistent storage abstraction. This subtopic covers file concepts, operations, directories, and file system interface.

## What is a File?

A **file** is a named, persistent collection of related data:
- Abstraction over disk blocks
- Named for human reference
- Contains metadata (size, permissions, dates)
- Organized in directories

```
Physical View:           Logical View:
┌───┬───┬───┬───┬───┐   ┌─────────────────┐
│ B │ B │ B │ B │ B │   │    myfile.txt   │
│ 0 │ 1 │ 2 │ 3 │ 4 │   │    "Hello..."   │
└───┴───┴───┴───┴───┘   └─────────────────┘
  Disk blocks             File abstraction
```

## File Attributes

```c
// Common file metadata
struct FileAttributes {
    char name[256];         // File name
    char extension[16];     // Type hint
    uint64_t size;          // Size in bytes
    time_t created;         // Creation time
    time_t modified;        // Last modification
    time_t accessed;        // Last access
    mode_t permissions;     // rwxrwxrwx
    uid_t owner;            // Owner user ID
    gid_t group;            // Group ID
    ino_t inode;            // Inode number
    dev_t device;           // Device ID
    nlink_t links;          // Hard link count
};
```

### File Types

```
Regular file: Contains user data
Directory: Contains other files
Symbolic link: Points to another file
Device file: Represents hardware
  - Character device (byte stream)
  - Block device (random access)
Pipe/FIFO: Inter-process communication
Socket: Network communication
```

## File Operations

### Basic Operations

```c
// Create file
int fd = open("file.txt", O_CREAT | O_WRONLY, 0644);

// Write to file
write(fd, "Hello", 5);

// Read from file
char buf[100];
read(fd, buf, sizeof(buf));

// Seek to position
lseek(fd, 100, SEEK_SET);

// Close file
close(fd);

// Delete file
unlink("file.txt");

// Get file info
struct stat st;
stat("file.txt", &st);
```

### Open File Table

```c
// System-wide open file table
struct OpenFile {
    struct inode* inode;     // File's inode
    off_t position;          // Current offset
    int flags;               // Open flags
    int ref_count;           // Reference count
    struct lock* lock;       // File lock
};

// Per-process file descriptor table
struct FDTable {
    struct OpenFile* files[MAX_FD];
};
```

### File Position

```
File: |H|e|l|l|o| |W|o|r|l|d|
       ↑
     position = 0

After read(fd, buf, 5):
File: |H|e|l|l|o| |W|o|r|l|d|
                 ↑
               position = 5

After lseek(fd, 0, SEEK_END):
File: |H|e|l|l|o| |W|o|r|l|d|
                           ↑
                         position = 11
```

## Access Methods

### Sequential Access

```c
// Read file from start to end
void sequential_read(int fd) {
    char buf[BUFSIZ];
    ssize_t n;

    while ((n = read(fd, buf, sizeof(buf))) > 0) {
        process(buf, n);
    }
}
```

### Random Access

```c
// Read record at specific position
void read_record(int fd, int record_num, void* record, size_t size) {
    off_t offset = record_num * size;
    lseek(fd, offset, SEEK_SET);
    read(fd, record, size);
}

// Update record in place
void update_record(int fd, int record_num, void* record, size_t size) {
    off_t offset = record_num * size;
    lseek(fd, offset, SEEK_SET);
    write(fd, record, size);
}
```

## Directory Structure

### Directory Concept

Directory is a file containing (name, inode) pairs:

```
Directory "/home/user":
┌─────────────┬────────┐
│    Name     │ Inode  │
├─────────────┼────────┤
│ .           │  1234  │  (self)
│ ..          │  1000  │  (parent)
│ documents   │  1235  │
│ file.txt    │  1236  │
│ photos      │  1237  │
└─────────────┴────────┘
```

### Path Resolution

```c
// Resolving "/home/user/file.txt"
// 1. Start at root inode (inode 2)
// 2. Look up "home" in root → inode 100
// 3. Look up "user" in /home → inode 1234
// 4. Look up "file.txt" in /home/user → inode 1236

struct inode* resolve_path(const char* path) {
    struct inode* current = get_root_inode();
    char* token = strtok(path, "/");

    while (token != NULL) {
        current = lookup_in_directory(current, token);
        if (current == NULL) {
            return NULL;  // Not found
        }
        token = strtok(NULL, "/");
    }

    return current;
}
```

### Directory Hierarchy

```
/
├── bin
│   ├── ls
│   └── cat
├── home
│   ├── alice
│   │   └── documents
│   └── bob
├── etc
│   └── passwd
└── tmp

Single-rooted tree structure (Unix)
Acyclic graph with hard links
```

## Links

### Hard Links

```c
// Create hard link: both names point to same inode
link("original.txt", "hardlink.txt");

// Both files share same data blocks
// Deleting one doesn't affect the other
// Can't span file systems
// Can't link to directories (usually)
```

```
original.txt ──→ inode 1234 ──→ [data blocks]
hardlink.txt ─┘
```

### Symbolic Links

```c
// Create symbolic link: contains path to target
symlink("/path/to/original.txt", "symlink.txt");

// symlink.txt contains text "/path/to/original.txt"
// Can span file systems
// Can link to directories
// Breaks if target deleted
```

```
symlink.txt ──→ inode 5678 ──→ "/path/to/original.txt"
                                        │
                                        ↓
original.txt ──→ inode 1234 ──→ [data blocks]
```

## File System Mounting

```
Mount file system to directory:

Before mount:
/
├── mnt
│   └── (empty)
└── ...

After mount /dev/sdb1 on /mnt:
/
├── mnt           ← Mount point
│   ├── file1     ← From /dev/sdb1
│   └── dir1
└── ...
```

```c
// Mount command
mount("/dev/sdb1", "/mnt", "ext4", 0, NULL);

// Unmount
umount("/mnt");
```

## File Protection

### Unix Permissions

```
rwxrwxrwx
│││││││││
│││││││└┴── Others: read, write, execute
│││││└┴──── Group: read, write, execute
│││└┴────── Owner: read, write, execute
```

```c
// Check permissions
if (access("file.txt", R_OK) == 0) {
    // Can read
}

// Change permissions
chmod("file.txt", 0644);  // rw-r--r--

// Change owner
chown("file.txt", uid, gid);
```

### Access Control Lists (ACLs)

```bash
# More flexible than basic permissions
# Specific permissions for specific users

# Set ACL
setfacl -m u:alice:rw file.txt

# View ACL
getfacl file.txt
# user::rw-
# user:alice:rw-
# group::r--
# other::r--
```

## File System Operations

### Creating Files and Directories

```c
// Create regular file
int fd = open("newfile.txt", O_CREAT | O_WRONLY, 0644);
close(fd);

// Create directory
mkdir("newdir", 0755);

// Create FIFO
mkfifo("mypipe", 0644);

// Create device file (root only)
mknod("/dev/mydev", S_IFCHR | 0666, makedev(10, 200));
```

### Traversing Directories

```c
#include <dirent.h>

void list_directory(const char* path) {
    DIR* dir = opendir(path);
    if (dir == NULL) return;

    struct dirent* entry;
    while ((entry = readdir(dir)) != NULL) {
        printf("%s (inode %ld)\n", entry->d_name, entry->d_ino);
    }

    closedir(dir);
}
```

### Recursive Directory Walk

```c
#include <ftw.h>

int callback(const char* path, const struct stat* sb,
             int typeflag, struct FTW* ftwbuf) {
    printf("%s\n", path);
    return 0;
}

void walk_tree(const char* root) {
    nftw(root, callback, 20, FTW_PHYS);
}
```

## Summary

File systems provide storage abstraction:
- Files are named collections of data with metadata
- Operations: create, read, write, seek, close, delete
- Directories organize files hierarchically
- Hard links share inodes, symlinks store paths
- Mounting attaches file systems to namespace
- Permissions control access (owner/group/others)
- ACLs provide fine-grained access control
- Foundation for persistent data storage
