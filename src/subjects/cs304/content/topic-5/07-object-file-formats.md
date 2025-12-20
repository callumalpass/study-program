# Object File Formats

Object files are the compiled output of source code, containing machine instructions, data, and metadata required for linking and loading. Understanding object file formats is essential for compiler writers, as the code generator must produce correctly-formed objects that linkers can process to create executable programs.

## Purpose of Object Files

Object files serve as the interface between compilation and linking:

1. **Contain compiled code**: Machine instructions and initialized data
2. **Define symbols**: Functions and variables exported by the module
3. **Reference external symbols**: Dependencies on other modules
4. **Provide relocation information**: How to adjust addresses during linking
5. **Include debugging information**: Source mappings, type information
6. **Support separate compilation**: Modules compiled independently then linked

## Common Object File Formats

### ELF (Executable and Linkable Format)

Used on Linux, BSD, Solaris, and most Unix-like systems. The most widely-used format for modern systems.

### Mach-O (Mach Object)

Used on macOS, iOS, and other Apple platforms. Derived from the Mach kernel's object format.

### COFF (Common Object File Format)

Used on Windows (as PE/COFF - Portable Executable). Also used historically on Unix systems.

### Archive Files (.a, .lib)

Collections of object files bundled together as static libraries.

## ELF File Structure

ELF files have a well-defined structure consisting of header, sections, and segment information.

### ELF Header

The ELF header appears at the start of every ELF file:

```c
typedef struct {
    unsigned char e_ident[16];  // Magic number and file metadata
    uint16_t      e_type;        // Object file type (relocatable, executable, shared)
    uint16_t      e_machine;     // Architecture (x86-64, ARM, etc.)
    uint32_t      e_version;     // ELF version
    uint64_t      e_entry;       // Entry point address
    uint64_t      e_phoff;       // Program header offset
    uint64_t      e_shoff;       // Section header offset
    uint32_t      e_flags;       // Processor-specific flags
    uint16_t      e_ehsize;      // ELF header size
    uint16_t      e_phentsize;   // Program header entry size
    uint16_t      e_phnum;       // Number of program headers
    uint16_t      e_shentsize;   // Section header entry size
    uint16_t      e_shnum;       // Number of section headers
    uint16_t      e_shstrndx;    // Section name string table index
} Elf64_Ehdr;
```

**Magic number** (`e_ident`): First 4 bytes are `0x7F 'E' 'L' 'F'`, identifying ELF files.

**File types**:
- `ET_REL` (1): Relocatable object file (.o)
- `ET_EXEC` (2): Executable file
- `ET_DYN` (3): Shared object file (.so)

### Sections

ELF files are divided into sections, each holding a specific type of data:

```
Section Name  | Purpose
--------------|--------------------------------------------------
.text         | Executable code
.rodata       | Read-only data (constants, string literals)
.data         | Initialized writable data (global variables)
.bss          | Uninitialized data (zero-initialized globals)
.symtab       | Symbol table
.strtab       | String table (symbol names)
.rel.text     | Relocation entries for .text
.rel.data     | Relocation entries for .data
.debug_*      | DWARF debugging information
.eh_frame     | Exception handling / stack unwinding info
```

Example section layout:

```
readelf -S example.o

Section Headers:
  [Nr] Name              Type            Address          Off    Size   ES Flg Lk Inf Al
  [ 0]                   NULL            0000000000000000 000000 000000 00      0   0  0
  [ 1] .text             PROGBITS        0000000000000000 000040 000025 00  AX  0   0  1
  [ 2] .data             PROGBITS        0000000000000000 000065 000008 00  WA  0   0  4
  [ 3] .bss              NOBITS          0000000000000000 00006d 000004 00  WA  0   0  4
  [ 4] .rodata           PROGBITS        0000000000000000 00006d 00000d 00   A  0   0  1
  [ 5] .symtab           SYMTAB          0000000000000000 000080 0000f0 18      6   4  8
  [ 6] .strtab           STRTAB          0000000000000000 000170 00003a 00      0   0  1
  [ 7] .rel.text         REL             0000000000000000 0001aa 000010 10      5   1  8
```

Flags: `A` = Allocate, `X` = Execute, `W` = Write

### Section Header

Each section has a header describing it:

```c
typedef struct {
    uint32_t   sh_name;      // Section name (index into string table)
    uint32_t   sh_type;      // Section type
    uint64_t   sh_flags;     // Section attributes
    uint64_t   sh_addr;      // Virtual address in memory
    uint64_t   sh_offset;    // Offset in file
    uint64_t   sh_size;      // Section size in bytes
    uint32_t   sh_link;      // Link to related section
    uint32_t   sh_info;      // Additional section information
    uint64_t   sh_addralign; // Alignment
    uint64_t   sh_entsize;   // Entry size if section holds table
} Elf64_Shdr;
```

## Symbol Tables

Symbol tables map names to addresses and contain information about functions, variables, and other symbols.

### Symbol Table Entry

```c
typedef struct {
    uint32_t      st_name;     // Symbol name (index into string table)
    unsigned char st_info;     // Symbol type and binding
    unsigned char st_other;    // Symbol visibility
    uint16_t      st_shndx;    // Section index
    uint64_t      st_value;    // Symbol value (address/offset)
    uint64_t      st_size;     // Symbol size
} Elf64_Sym;
```

### Symbol Types

Extracted from `st_info`:

```
STT_NOTYPE   (0): Unspecified type
STT_OBJECT   (1): Data object (variable)
STT_FUNC     (2): Function
STT_SECTION  (3): Section symbol
STT_FILE     (4): Source file name
```

### Symbol Binding

Also from `st_info`:

```
STB_LOCAL    (0): Local to object file (static in C)
STB_GLOBAL   (1): Visible to all object files (extern in C)
STB_WEAK     (2): Weak symbol (can be overridden)
```

### Symbol Visibility

From `st_other`:

```
STV_DEFAULT  (0): Default visibility
STV_HIDDEN   (2): Not visible to other modules
STV_PROTECTED(3): Visible but cannot be preempted
```

### Example Symbol Table

```c
// example.c
static int local_var = 42;
int global_var = 100;
extern int external_var;

static void local_func() { }
void global_func() { }
```

Symbol table for `example.o`:

```
Num:    Value          Size Type    Bind   Vis      Ndx Name
  0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND
  1: 0000000000000000     4 OBJECT  LOCAL  DEFAULT    2 local_var
  2: 0000000000000000    10 FUNC    LOCAL  DEFAULT    1 local_func
  3: 0000000000000004     4 OBJECT  GLOBAL DEFAULT    2 global_var
  4: 000000000000000a    15 FUNC    GLOBAL DEFAULT    1 global_func
  5: 0000000000000000     0 NOTYPE  GLOBAL DEFAULT  UND external_var
```

- `local_var` and `local_func`: `LOCAL` binding (static)
- `global_var` and `global_func`: `GLOBAL` binding (exported)
- `external_var`: `UND` (undefined, external reference)

## Relocation

Relocatable object files contain references to symbols whose addresses are unknown until linking. Relocation entries specify how to adjust these references.

### Relocation Entry

```c
typedef struct {
    uint64_t r_offset;  // Location to relocate
    uint64_t r_info;    // Relocation type and symbol index
    int64_t  r_addend;  // Addend for computation
} Elf64_Rela;
```

`r_info` encodes:
- **Symbol index**: Which symbol to reference
- **Relocation type**: How to compute the address

### Relocation Types

Common x86-64 relocation types:

```
R_X86_64_64        (1): Absolute 64-bit address
R_X86_64_PC32      (2): PC-relative 32-bit offset
R_X86_64_PLT32     (4): PC-relative 32-bit PLT entry
R_X86_64_GOTPCREL  (9): PC-relative 32-bit GOT entry
```

### Relocation Example

```c
// code.c
extern int external_var;

int get_external() {
    return external_var;
}
```

Generated assembly:
```asm
get_external:
    mov eax, [rip + external_var]  ; PC-relative addressing
    ret
```

Object file disassembly:
```
0000000000000000 <get_external>:
   0:   8b 05 00 00 00 00       mov    eax,DWORD PTR [rip+0x0]
   6:   c3                      ret
```

The `00 00 00 00` is a placeholder. Relocation entry:

```
Relocation section '.rela.text' at offset 0x1b8 contains 1 entry:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
000000000002  000500000002 R_X86_64_PC32     0000000000000000 external_var - 4
```

This tells the linker: "At offset 2 in `.text`, insert a PC-relative 32-bit offset to `external_var` minus 4."

The linker computes: `external_var_address - (PC + 4)` and writes it at offset 2.

### Relocation Computation

For different relocation types:

**R_X86_64_64** (absolute 64-bit):
```
Value = S + A
  S = symbol value
  A = addend
```

**R_X86_64_PC32** (PC-relative 32-bit):
```
Value = S + A - P
  S = symbol value
  A = addend
  P = place (address being relocated)
```

**R_X86_64_GOTPCREL** (GOT-relative):
```
Value = GOT_entry_for_symbol - P
```

## Linking Process

The linker combines object files into executables or shared libraries.

### Symbol Resolution

1. **Collect symbols**: Read symbol tables from all input object files
2. **Resolve references**: Match undefined symbols to definitions
3. **Handle multiple definitions**: Report errors for multiple strong definitions; choose strong over weak

### Strong vs Weak Symbols

```c
// file1.c
int x = 42;         // Strong definition

// file2.c
extern int x;       // Reference (undefined)

// file3.c
__attribute__((weak)) int x = 0;  // Weak definition
```

Linking rules:
- Multiple strong definitions: **error**
- Strong and weak: **strong wins**
- Multiple weak: **arbitrary choice**

### Relocation and Address Assignment

1. **Section merging**: Combine `.text` sections from all objects
2. **Address assignment**: Assign virtual addresses to each section
3. **Relocation**: Update references using relocation entries

Example:

```
Object A:
  .text: 0x0-0x100
  .data: 0x0-0x20

Object B:
  .text: 0x0-0x80
  .data: 0x0-0x10

Linked:
  .text: 0x400000-0x400180 (A: 0x400000-0x400100, B: 0x400100-0x400180)
  .data: 0x600000-0x600030 (A: 0x600000-0x600020, B: 0x600020-0x600030)
```

References in A to symbols in B are updated with B's final addresses.

## Mach-O Format

Mach-O is used on Apple platforms (macOS, iOS).

### Structure

```
Mach-O File:
+------------------+
| Mach Header      |
+------------------+
| Load Commands    |
| - LC_SEGMENT     | ← Segment definitions
| - LC_SYMTAB      | ← Symbol table location
| - LC_DYSYMTAB    | ← Dynamic symbol table
| - LC_LOAD_DYLIB  | ← Dynamic library dependencies
| - ...            |
+------------------+
| Segment Data     |
| - __TEXT         | ← Read-only code and data
|   - __text       |   (executable code)
|   - __cstring    |   (C strings)
|   - __const      |   (constants)
| - __DATA         | ← Writable data
|   - __data       |   (initialized data)
|   - __bss        |   (uninitialized data)
+------------------+
| Symbol Table     |
+------------------+
| String Table     |
+------------------+
```

### Mach Header

```c
struct mach_header_64 {
    uint32_t magic;        // 0xfeedfacf (64-bit)
    cpu_type_t cputype;    // CPU type (x86_64, ARM64)
    cpu_subtype_t cpusubtype;
    uint32_t filetype;     // Object, executable, dylib, etc.
    uint32_t ncmds;        // Number of load commands
    uint32_t sizeofcmds;   // Size of load commands
    uint32_t flags;        // Flags
    uint32_t reserved;
};
```

### Load Commands

Load commands specify how to load the file:

**LC_SEGMENT_64**: Defines a segment to load into memory
```c
struct segment_command_64 {
    uint32_t cmd;          // LC_SEGMENT_64
    uint32_t cmdsize;      // Size of this command
    char segname[16];      // Segment name ("__TEXT", "__DATA")
    uint64_t vmaddr;       // Virtual memory address
    uint64_t vmsize;       // Virtual memory size
    uint64_t fileoff;      // File offset
    uint64_t filesize;     // File size
    vm_prot_t maxprot;     // Maximum protection
    vm_prot_t initprot;    // Initial protection
    uint32_t nsects;       // Number of sections
    uint32_t flags;        // Flags
};
```

**LC_SYMTAB**: Locates the symbol table
**LC_DYSYMTAB**: Locates dynamic symbol information
**LC_LOAD_DYLIB**: Specifies a dependent dynamic library

### Universal Binaries (Fat Files)

Mach-O supports **universal binaries** containing code for multiple architectures:

```
Fat Header:
+------------------+
| Magic: 0xcafebabe|
| nfat_arch: 2     |
+------------------+
| Architecture 1   | ← x86_64
| - cputype        |
| - offset         |
| - size           |
+------------------+
| Architecture 2   | ← ARM64
| - cputype        |
| - offset         |
| - size           |
+------------------+
| x86_64 Mach-O    |
+------------------+
| ARM64 Mach-O     |
+------------------+
```

The loader selects the appropriate architecture at runtime.

## PE/COFF Format

Windows uses the PE (Portable Executable) format, based on COFF.

### Structure

```
PE File:
+------------------+
| DOS Header       | ← Legacy compatibility
| DOS Stub         |
+------------------+
| PE Signature     | ← "PE\0\0"
+------------------+
| COFF Header      |
+------------------+
| Optional Header  | ← PE-specific info
+------------------+
| Section Headers  |
+------------------+
| Section Data     |
| - .text          | ← Code
| - .data          | ← Initialized data
| - .rdata         | ← Read-only data
| - .bss           | ← Uninitialized data
| - .idata         | ← Import table
| - .edata         | ← Export table
| - .reloc         | ← Relocations
+------------------+
```

### COFF Header

```c
struct COFF_Header {
    uint16_t Machine;              // Architecture (x86, x64, ARM)
    uint16_t NumberOfSections;
    uint32_t TimeDateStamp;
    uint32_t PointerToSymbolTable;
    uint32_t NumberOfSymbols;
    uint16_t SizeOfOptionalHeader;
    uint16_t Characteristics;      // Flags
};
```

### Import and Export Tables

**Import table** (`.idata`): Lists DLLs and functions imported

```c
struct Import_Directory_Entry {
    uint32_t ImportLookupTableRVA;
    uint32_t TimeDateStamp;
    uint32_t ForwarderChain;
    uint32_t NameRVA;              // DLL name
    uint32_t ImportAddressTableRVA;
};
```

**Export table** (`.edata`): Lists functions exported by the DLL

```c
struct Export_Directory {
    uint32_t Characteristics;
    uint32_t TimeDateStamp;
    uint16_t MajorVersion;
    uint16_t MinorVersion;
    uint32_t NameRVA;              // DLL name
    uint32_t Base;                 // Ordinal base
    uint32_t NumberOfFunctions;
    uint32_t NumberOfNames;
    uint32_t AddressOfFunctions;   // RVA of function table
    uint32_t AddressOfNames;       // RVA of name table
    uint32_t AddressOfOrdinals;    // RVA of ordinal table
};
```

## Debugging Information

Object files contain debugging information in standard formats.

### DWARF (Debugging With Attributed Record Formats)

Used in ELF files. Stored in `.debug_*` sections:

```
.debug_info      - Type and variable information
.debug_line      - Source line mappings
.debug_abbrev    - Abbreviation tables
.debug_str       - String table
.debug_frame     - Call frame information
.debug_loc       - Location lists
```

DWARF describes program structure hierarchically:
```
Compilation Unit
  ├─ Subprogram (function)
  │   ├─ Formal Parameter
  │   ├─ Variable
  │   └─ Inlined Subroutine
  └─ Variable (global)
```

### PDB (Program Database)

Windows uses PDB files for debugging information, separate from the PE file.

## Key Takeaways

- Object files bridge compilation and linking, containing machine code, data, symbol definitions/references, relocation information, and debugging metadata
- ELF (Linux/Unix) organizes files into sections (.text, .data, .bss, etc.) with headers describing type, address, size, and attributes
- Symbol tables map names to addresses with binding (local, global, weak), type (function, object), and visibility, enabling symbol resolution during linking
- Relocation entries specify how to adjust address references during linking, with types like R_X86_64_PC32 (PC-relative) and R_X86_64_64 (absolute)
- Mach-O (macOS) uses load commands to describe segments and dependencies, supporting universal binaries containing multiple architectures in one file
- PE/COFF (Windows) includes import tables (listing imported DLLs and functions) and export tables (listing exported functions) for dynamic linking
- Linking resolves symbols by matching references to definitions, merges sections from multiple objects, assigns addresses, and applies relocations
- DWARF debugging information (ELF) and PDB files (Windows) provide source mappings, type information, and call frame data for debuggers

