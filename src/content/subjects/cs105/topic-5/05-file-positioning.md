# File Positioning

File positioning functions allow random access within files. Understanding these functions is essential for database implementations, file editors, and binary file formats.

## Position Functions

### ftell - Get Current Position

```c
FILE* f = fopen("data.txt", "r");

long pos = ftell(f);
printf("Position: %ld\n", pos);  // 0 at start

fgets(buffer, 100, f);
pos = ftell(f);
printf("After read: %ld\n", pos);
```

### fseek - Set Position

```c
// Seek from beginning
fseek(f, 100, SEEK_SET);  // Position 100

// Seek from current position
fseek(f, 50, SEEK_CUR);   // Forward 50
fseek(f, -20, SEEK_CUR);  // Backward 20

// Seek from end
fseek(f, -100, SEEK_END); // 100 bytes before end
fseek(f, 0, SEEK_END);    // Go to end
```

### rewind - Go to Start

```c
rewind(f);  // Equivalent to fseek(f, 0, SEEK_SET)
// Also clears error indicator
```

## Seek Origins

| Origin | Value | Description |
|--------|-------|-------------|
| `SEEK_SET` | 0 | Beginning of file |
| `SEEK_CUR` | 1 | Current position |
| `SEEK_END` | 2 | End of file |

## Getting File Size

```c
long get_file_size(FILE* f) {
    long current = ftell(f);     // Save position
    fseek(f, 0, SEEK_END);       // Go to end
    long size = ftell(f);        // Get position = size
    fseek(f, current, SEEK_SET); // Restore position
    return size;
}

// Usage
FILE* f = fopen("data.bin", "rb");
printf("File size: %ld bytes\n", get_file_size(f));
```

## Random Access

### Reading at Specific Position

```c
int read_int_at(FILE* f, long position) {
    fseek(f, position, SEEK_SET);
    int value;
    fread(&value, sizeof(int), 1, f);
    return value;
}

// Read array element (assuming binary file of ints)
int read_element(FILE* f, int index) {
    fseek(f, index * sizeof(int), SEEK_SET);
    int value;
    fread(&value, sizeof(int), 1, f);
    return value;
}
```

### Writing at Specific Position

```c
void write_int_at(FILE* f, long position, int value) {
    fseek(f, position, SEEK_SET);
    fwrite(&value, sizeof(int), 1, f);
}

// Update record in database file
void update_record(FILE* f, int record_id, Record* record) {
    fseek(f, record_id * sizeof(Record), SEEK_SET);
    fwrite(record, sizeof(Record), 1, f);
}
```

## Binary File Record Access

### Fixed-Size Records

```c
typedef struct {
    int id;
    char name[50];
    double balance;
} Account;

// Read specific account
Account read_account(FILE* f, int account_id) {
    Account acc;
    fseek(f, account_id * sizeof(Account), SEEK_SET);
    fread(&acc, sizeof(Account), 1, f);
    return acc;
}

// Update account
void update_account(FILE* f, int account_id, Account* acc) {
    fseek(f, account_id * sizeof(Account), SEEK_SET);
    fwrite(acc, sizeof(Account), 1, f);
    fflush(f);  // Ensure written
}
```

### Index-Based Access

```c
// File format: [header][index table][data records]

typedef struct {
    int count;
    long index_offset;
    long data_offset;
} Header;

long get_record_offset(FILE* f, int record_id) {
    Header h;
    fseek(f, 0, SEEK_SET);
    fread(&h, sizeof(Header), 1, f);

    long offset;
    fseek(f, h.index_offset + record_id * sizeof(long), SEEK_SET);
    fread(&offset, sizeof(long), 1, f);
    return offset;
}
```

## Large File Support

### 64-bit Positions

```c
// For files > 2GB, use fseeko/ftello (POSIX)
#define _FILE_OFFSET_BITS 64

#include <stdio.h>

off_t pos = ftello(f);      // 64-bit position
fseeko(f, offset, origin);  // 64-bit seek

// Or use fgetpos/fsetpos
fpos_t pos;
fgetpos(f, &pos);
// ...
fsetpos(f, &pos);
```

### fgetpos and fsetpos

```c
// Opaque position type - portable
fpos_t saved_pos;

// Save position
fgetpos(f, &saved_pos);

// ... do other operations ...

// Restore position
fsetpos(f, &saved_pos);
```

## Sparse Files

### Creating Holes

```c
FILE* f = fopen("sparse.bin", "wb");

// Write at position 0
int header = 0x12345678;
fwrite(&header, sizeof(int), 1, f);

// Seek far ahead (creates hole)
fseek(f, 1000000, SEEK_SET);

// Write at new position
int trailer = 0xDEADBEEF;
fwrite(&trailer, sizeof(int), 1, f);

fclose(f);
// File appears 1MB+ but uses little disk space
```

## Text File Considerations

### Line Endings

```c
// In text mode, positions may not correspond to byte counts
// due to line ending translation (CR+LF vs LF)

FILE* f = fopen("text.txt", "r");  // Text mode
// ftell() may not return byte offset!

FILE* f = fopen("text.txt", "rb"); // Binary mode
// ftell() returns actual byte offset
```

### Safe Text Seeking

```c
// Only reliable seeks in text mode:
fseek(f, 0, SEEK_SET);    // Beginning
fseek(f, 0, SEEK_END);    // End
fseek(f, ftell_result, SEEK_SET);  // Previous ftell position
```

## Error Handling

### Check Return Values

```c
if (fseek(f, offset, SEEK_SET) != 0) {
    perror("fseek failed");
    return -1;
}

long pos = ftell(f);
if (pos == -1L) {
    perror("ftell failed");
    return -1;
}
```

### Beyond End of File

```c
// Writing beyond EOF extends file
FILE* f = fopen("test.bin", "wb");
fseek(f, 1000, SEEK_SET);
fwrite("hello", 5, 1, f);  // File is now 1005 bytes

// Reading beyond EOF returns nothing
fseek(f, 10000, SEEK_SET);
char buf[10];
size_t n = fread(buf, 1, 10, f);  // n = 0, at EOF
```

## Practical Examples

### Simple Database

```c
#define DB_FILE "accounts.db"

void init_database(int num_accounts) {
    FILE* f = fopen(DB_FILE, "wb");
    Account empty = {0};
    for (int i = 0; i < num_accounts; i++) {
        fwrite(&empty, sizeof(Account), 1, f);
    }
    fclose(f);
}

Account get_account(int id) {
    FILE* f = fopen(DB_FILE, "rb");
    Account acc;
    fseek(f, id * sizeof(Account), SEEK_SET);
    fread(&acc, sizeof(Account), 1, f);
    fclose(f);
    return acc;
}

void set_account(int id, Account* acc) {
    FILE* f = fopen(DB_FILE, "r+b");
    fseek(f, id * sizeof(Account), SEEK_SET);
    fwrite(acc, sizeof(Account), 1, f);
    fclose(f);
}
```

## Summary

File positioning enables random access:
- `ftell()` gets current position
- `fseek()` sets position
- `rewind()` returns to start
- Use `fgetpos()`/`fsetpos()` for portability
- Binary mode for reliable byte positioning
- 64-bit functions for large files
