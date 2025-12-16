# Binary File I/O

Binary files store data in its raw memory representation, unlike text files which store human-readable characters. Binary I/O is essential for efficiency and for storing complex data structures.

## Text vs Binary Mode

**Text mode** (default):
- Translates line endings (platform-specific)
- Slower for non-text data
- Characters may be interpreted specially

**Binary mode** (`"rb"`, `"wb"`, etc.):
- No translation—bytes written exactly as provided
- Required for non-text data (images, structures, etc.)

```c
FILE *text = fopen("data.txt", "r");    // Text mode
FILE *bin = fopen("data.bin", "rb");    // Binary mode
```

## Writing Binary Data: fwrite

```c
size_t fwrite(const void *ptr, size_t size, size_t count, FILE *stream);
```

- `ptr`: Pointer to data to write
- `size`: Size of each element
- `count`: Number of elements
- Returns: Number of elements successfully written

```c
int numbers[] = {10, 20, 30, 40, 50};

FILE *file = fopen("numbers.bin", "wb");
if (file) {
    size_t written = fwrite(numbers, sizeof(int), 5, file);
    printf("Wrote %zu integers\n", written);
    fclose(file);
}
```

## Reading Binary Data: fread

```c
size_t fread(void *ptr, size_t size, size_t count, FILE *stream);
```

```c
int numbers[5];

FILE *file = fopen("numbers.bin", "rb");
if (file) {
    size_t read = fread(numbers, sizeof(int), 5, file);
    printf("Read %zu integers\n", read);

    for (int i = 0; i < read; i++) {
        printf("%d ", numbers[i]);
    }
    fclose(file);
}
```

## Writing Structures

Binary I/O is perfect for saving structures:

```c
typedef struct {
    int id;
    char name[50];
    double salary;
} Employee;

Employee emp = {101, "Alice", 75000.0};

FILE *file = fopen("employee.dat", "wb");
if (file) {
    fwrite(&emp, sizeof(Employee), 1, file);
    fclose(file);
}
```

## Reading Structures

```c
Employee emp;

FILE *file = fopen("employee.dat", "rb");
if (file) {
    if (fread(&emp, sizeof(Employee), 1, file) == 1) {
        printf("ID: %d, Name: %s, Salary: %.2f\n",
               emp.id, emp.name, emp.salary);
    }
    fclose(file);
}
```

## Arrays of Structures

```c
Employee employees[3] = {
    {1, "Alice", 75000.0},
    {2, "Bob", 65000.0},
    {3, "Charlie", 80000.0}
};

// Write all at once
FILE *file = fopen("employees.dat", "wb");
if (file) {
    fwrite(employees, sizeof(Employee), 3, file);
    fclose(file);
}

// Read all at once
Employee loaded[3];
file = fopen("employees.dat", "rb");
if (file) {
    size_t count = fread(loaded, sizeof(Employee), 3, file);
    printf("Loaded %zu employees\n", count);
    fclose(file);
}
```

## File Positioning

### ftell: Get Current Position

```c
long ftell(FILE *stream);
```

```c
long pos = ftell(file);
printf("Current position: %ld bytes\n", pos);
```

### fseek: Set Position

```c
int fseek(FILE *stream, long offset, int origin);
```

Origins:
- `SEEK_SET`: Beginning of file
- `SEEK_CUR`: Current position
- `SEEK_END`: End of file

```c
fseek(file, 0, SEEK_SET);     // Go to beginning
fseek(file, 100, SEEK_SET);   // Go to byte 100
fseek(file, -10, SEEK_CUR);   // Go back 10 bytes
fseek(file, 0, SEEK_END);     // Go to end
```

### rewind: Reset to Beginning

```c
rewind(file);  // Same as fseek(file, 0, SEEK_SET)
```

## Random Access Example

Read a specific record from a file:

```c
// Read the 3rd employee (index 2)
Employee emp;
FILE *file = fopen("employees.dat", "rb");
if (file) {
    fseek(file, 2 * sizeof(Employee), SEEK_SET);
    fread(&emp, sizeof(Employee), 1, file);
    printf("Employee #3: %s\n", emp.name);
    fclose(file);
}
```

## Determining File Size

```c
FILE *file = fopen("data.bin", "rb");
if (file) {
    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    printf("File size: %ld bytes\n", size);

    // Don't forget to rewind if you need to read!
    rewind(file);

    fclose(file);
}
```

## Updating Records

```c
// Update salary for employee at index 1
FILE *file = fopen("employees.dat", "r+b");  // Read and write
if (file) {
    Employee emp;

    // Seek to record
    fseek(file, 1 * sizeof(Employee), SEEK_SET);

    // Read current data
    fread(&emp, sizeof(Employee), 1, file);

    // Modify
    emp.salary = 70000.0;

    // Seek back (fread moved the position)
    fseek(file, 1 * sizeof(Employee), SEEK_SET);

    // Write updated record
    fwrite(&emp, sizeof(Employee), 1, file);

    fclose(file);
}
```

## Portability Considerations

Binary files may not be portable between systems due to:

1. **Endianness**: Byte order differs (little vs big endian)
2. **Structure padding**: May differ between compilers
3. **Type sizes**: `int` may be 2 or 4 bytes

For portable binary formats, consider:
- Converting to network byte order
- Using fixed-size types (`int32_t`, etc.)
- Writing fields individually instead of whole structures

```c
#include <stdint.h>

// Portable structure
typedef struct {
    int32_t id;        // Exactly 32 bits
    int32_t age;
} PortableRecord;
```

## Key Takeaways

- Use `"rb"` / `"wb"` for binary mode
- `fwrite` and `fread` transfer raw bytes
- Binary I/O is efficient for structures and arrays
- Use `fseek` and `ftell` for random access
- Return values indicate success (number of items read/written)
- Binary files may not be portable across systems
- Binary mode is required for non-text data (images, etc.)

Binary file I/O is essential for databases, game saves, and any application requiring efficient data storage.
