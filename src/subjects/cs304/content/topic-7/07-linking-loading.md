# Linking and Loading

Linking and loading are the final stages that transform compiled code into an executing program. The linker combines multiple object files into a single executable or library, resolving symbol references and performing relocations. The loader then brings the executable into memory and prepares it for execution. Understanding these processes is essential for compiler implementation, systems programming, and debugging, as they determine how code modules interact and how programs are organized in memory.

## The Compilation and Linking Pipeline

Modern programs are typically built from multiple source files, each compiled independently into object files, then linked together:

```
source1.c  →  [compiler]  →  source1.o  ┐
source2.c  →  [compiler]  →  source2.o  ├→ [linker] → executable
source3.c  →  [compiler]  →  source3.o  ┘
```

This separate compilation model enables incremental builds and modularity.

## Object File Format

Object files contain compiled code along with metadata describing symbols, relocations, and sections.

### ELF Structure

The Executable and Linkable Format (ELF) is the standard on Unix-like systems:

```c
// Simplified ELF structures
typedef struct {
    uint8_t  magic[4];          // 0x7F 'E' 'L' 'F'
    uint8_t  class;             // 32-bit or 64-bit
    uint8_t  endianness;
    uint8_t  version;
    // Additional header fields
} ELF_Header;

typedef struct {
    uint32_t name;              // Offset into string table
    uint8_t  type;              // Function, data, section, etc.
    uint8_t  binding;           // Local, global, weak
    uint16_t section_index;     // Which section it's in
    uint64_t value;             // Address or value
    uint64_t size;              // Size of symbol
} ELF_Symbol;

typedef struct {
    uint32_t name;              // Section name
    uint32_t type;              // Code, data, symbol table, etc.
    uint64_t flags;             // Writable, executable, etc.
    uint64_t address;           // Load address
    uint64_t offset;            // File offset
    uint64_t size;              // Section size
} ELF_Section;
```

Common sections:
- `.text`: Executable code
- `.data`: Initialized global variables
- `.bss`: Uninitialized global variables (zero-initialized)
- `.rodata`: Read-only data (string literals, constants)
- `.symtab`: Symbol table
- `.strtab`: String table for symbol names

## Static Linking

Static linking combines all object files into a single executable at build time.

### Symbol Resolution

The linker resolves references between object files:

```c
// file1.c
extern int global_var;
extern void helper_function(void);

void main_function() {
    global_var = 42;
    helper_function();
}

// file2.c
int global_var;

void helper_function() {
    global_var++;
}
```

After compilation:
```
file1.o:
  Symbols:
    main_function (defined, address 0x0)
    global_var (undefined)
    helper_function (undefined)

file2.o:
  Symbols:
    global_var (defined, address 0x0)
    helper_function (defined, address 0x0)
```

The linker:
1. Collects all symbols from all object files
2. Builds a global symbol table
3. Resolves undefined symbols by finding definitions
4. Reports errors for undefined or multiply-defined symbols

```c
// Simplified symbol resolution
typedef struct {
    char *name;
    void *address;
    bool defined;
} Symbol;

typedef struct {
    Symbol *symbols;
    int count;
} SymbolTable;

void resolve_symbols(ObjectFile *objects, int num_objects) {
    SymbolTable global_table = {0};

    // Collect all defined symbols
    for (int i = 0; i < num_objects; i++) {
        for (int j = 0; j < objects[i].num_symbols; j++) {
            Symbol *sym = &objects[i].symbols[j];

            if (sym->defined) {
                Symbol *global = find_symbol(&global_table, sym->name);
                if (global && global->defined) {
                    error("Multiple definition of %s", sym->name);
                } else {
                    add_symbol(&global_table, sym);
                }
            }
        }
    }

    // Resolve undefined symbols
    for (int i = 0; i < num_objects; i++) {
        for (int j = 0; j < objects[i].num_symbols; j++) {
            Symbol *sym = &objects[i].symbols[j];

            if (!sym->defined) {
                Symbol *global = find_symbol(&global_table, sym->name);
                if (!global || !global->defined) {
                    error("Undefined reference to %s", sym->name);
                } else {
                    sym->address = global->address;
                }
            }
        }
    }
}
```

### Relocation

Relocation adjusts addresses in code and data to reflect the final memory layout:

```c
// Before relocation (in object file)
mov rax, [global_var]    // global_var address is 0x0 (placeholder)
call helper_function     // helper_function address is 0x0

// Relocation entries
Relocation relocations[] = {
    {offset: 0x3, type: R_X86_64_PC32, symbol: "global_var"},
    {offset: 0x8, type: R_X86_64_PLT32, symbol: "helper_function"}
};

// After relocation (in executable)
mov rax, [0x404000]      // global_var actual address
call 0x401200            // helper_function actual address
```

The relocation process:

```c
typedef struct {
    uint64_t offset;        // Offset in section to modify
    uint32_t type;          // Relocation type
    uint32_t symbol_index;  // Symbol to relocate against
    int64_t  addend;        // Value to add
} Relocation;

void apply_relocation(uint8_t *section_data, Relocation *rel, Symbol *symbol) {
    uint64_t *target = (uint64_t *)(section_data + rel->offset);

    switch (rel->type) {
        case R_X86_64_64:
            // Absolute 64-bit address
            *target = symbol->address + rel->addend;
            break;

        case R_X86_64_PC32:
            // PC-relative 32-bit offset
            *target = symbol->address + rel->addend - rel->offset;
            break;

        case R_X86_64_PLT32:
            // PLT-relative (for function calls)
            *target = symbol->address - rel->offset + rel->addend;
            break;
    }
}
```

## Dynamic Linking

Dynamic linking defers symbol resolution until load time or runtime, allowing multiple programs to share a single copy of library code.

### Shared Libraries

Shared libraries (.so on Linux, .dll on Windows, .dylib on macOS) contain code and data that can be loaded into multiple processes:

```c
// Creating a shared library
// mylib.c
int shared_var = 42;

int shared_function(int x) {
    return x + shared_var;
}

// Compile to shared library:
// gcc -fPIC -shared -o libmylib.so mylib.c

// Using the library
// main.c
extern int shared_function(int x);

int main() {
    return shared_function(10);
}

// Link against library:
// gcc -o myapp main.c -L. -lmylib
```

### Position-Independent Code (PIC)

Shared libraries must work at any load address, requiring position-independent code:

```c
// Non-PIC code (absolute addressing)
mov rax, [0x404000]      // Hard-coded address - won't work at different addresses

// PIC code (relative addressing)
mov rax, [rip + offset]  // RIP-relative - works at any address
```

PIC uses several techniques:

**PC-Relative Addressing**: References relative to the program counter work at any address:

```nasm
lea rax, [rip + data_offset]   ; Load address relative to current PC
mov rbx, [rip + var_offset]    ; Access data relative to current PC
```

**Global Offset Table (GOT)**: Indirect access to global variables:

```c
// The GOT contains absolute addresses, populated at load time
uint64_t got[] = {
    0,              // Reserved
    &global_var,    // Filled by loader
    &another_var,
};

// Generated PIC code accesses via GOT
mov rax, [rip + got_offset]    // Get GOT entry address
mov rbx, [rax]                  // Load actual global variable
```

**Procedure Linkage Table (PLT)**: Lazy binding for function calls:

```c
// PLT stub for a function
helper_function@plt:
    jmp [helper_function@GOT]    // Jump to address in GOT

    push relocation_index         // If not resolved, push reloc index
    jmp resolver                  // Jump to dynamic linker

// First call:
// 1. Jumps to PLT
// 2. GOT contains address of resolver
// 3. Dynamic linker resolves symbol
// 4. Updates GOT with actual address
// 5. Subsequent calls go directly to function
```

### Dynamic Loader

The dynamic loader (ld.so on Linux) loads shared libraries and resolves symbols at runtime:

```c
// Simplified dynamic loader
typedef struct {
    char *name;
    void *base_address;
    ELF_Symbol *symtab;
    int num_symbols;
} LoadedLibrary;

void *dynamic_loader_main(char *executable_path) {
    // Load main executable
    LoadedLibrary *exe = load_elf(executable_path);

    // Parse DT_NEEDED entries for dependencies
    char **dependencies = get_dependencies(exe);

    // Load all shared libraries
    LoadedLibrary *libs[MAX_LIBS];
    int num_libs = 0;

    for (int i = 0; dependencies[i]; i++) {
        libs[num_libs++] = load_shared_library(dependencies[i]);
    }

    // Perform relocations
    for (int i = 0; i < num_libs; i++) {
        process_relocations(libs[i], libs, num_libs);
    }
    process_relocations(exe, libs, num_libs);

    // Run initialization functions
    for (int i = 0; i < num_libs; i++) {
        run_init_functions(libs[i]);
    }

    // Transfer control to entry point
    void (*entry)() = get_entry_point(exe);
    entry();
}
```

### Symbol Resolution in Dynamic Linking

Dynamic linking resolves symbols by searching through loaded libraries:

```c
void *resolve_dynamic_symbol(char *name, LoadedLibrary **libs, int num_libs) {
    // Search order: executable, then libraries in load order
    for (int i = 0; i < num_libs; i++) {
        for (int j = 0; j < libs[i]->num_symbols; j++) {
            if (strcmp(libs[i]->symtab[j].name, name) == 0) {
                return libs[i]->base_address + libs[i]->symtab[j].value;
            }
        }
    }

    return NULL;  // Symbol not found
}

// Apply relocations using resolved symbols
void process_relocations(LoadedLibrary *lib, LoadedLibrary **all_libs, int num) {
    Relocation *relocs = get_relocations(lib);

    for (int i = 0; i < lib->num_relocs; i++) {
        Symbol *sym = &lib->symtab[relocs[i].symbol_index];

        void *symbol_addr = resolve_dynamic_symbol(sym->name, all_libs, num);

        if (!symbol_addr) {
            error("Undefined symbol: %s", sym->name);
        }

        apply_relocation(lib->base_address, &relocs[i], symbol_addr);
    }
}
```

## Runtime Loading

Programs can explicitly load libraries at runtime using dlopen/dlsym:

```c
#include <dlfcn.h>

// Load library at runtime
void *handle = dlopen("libplugin.so", RTLD_LAZY);
if (!handle) {
    fprintf(stderr, "dlopen error: %s\n", dlerror());
    exit(1);
}

// Resolve symbol
typedef int (*plugin_func_t)(int);
plugin_func_t plugin_func = dlsym(handle, "plugin_function");
if (!plugin_func) {
    fprintf(stderr, "dlsym error: %s\n", dlerror());
    exit(1);
}

// Use the function
int result = plugin_func(42);

// Unload library
dlclose(handle);
```

This enables plugin architectures and delayed loading of optional features.

## Weak Symbols and Symbol Interposition

Weak symbols allow optional definitions:

```c
// Library provides weak default
__attribute__((weak))
void custom_handler() {
    // Default implementation
}

// User can override by providing strong definition
void custom_handler() {
    // Custom implementation
}
```

Symbol interposition allows replacing library functions:

```c
// Override malloc to add debugging
void *malloc(size_t size) {
    static void *(*real_malloc)(size_t) = NULL;

    if (!real_malloc) {
        real_malloc = dlsym(RTLD_NEXT, "malloc");
    }

    printf("malloc(%zu)\n", size);
    return real_malloc(size);
}
```

## Key Takeaways

- Linking combines separately compiled object files into executables or libraries by resolving symbols and performing relocations.
- Static linking creates self-contained executables with all code included, while dynamic linking defers resolution to load time or runtime.
- Position-independent code uses relative addressing and indirection (GOT/PLT) to work at any load address, essential for shared libraries.
- The dynamic loader loads shared libraries, performs relocations, and resolves symbols at program startup.
- Relocation adjusts addresses in compiled code to reflect the final memory layout, handling absolute and relative references.
- Runtime loading with dlopen enables plugin architectures and optional feature loading without compile-time dependencies.
- Understanding linking and loading is crucial for debugging symbol resolution issues, optimizing program startup, and implementing dynamic language features.
