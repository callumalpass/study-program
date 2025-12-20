# Make and Build Tools

Make is the classic build automation tool for C projects. It tracks dependencies, determines what needs rebuilding, and executes compilation commands efficiently.

## Why Make?

### The Problem

Manual building is error-prone:

```bash
gcc -c main.c -o main.o
gcc -c util.c -o util.o
gcc -c math.c -o math.o
gcc main.o util.o math.o -o program
```

Issues:
- Must remember all commands
- Easy to forget dependencies
- Rebuilds everything unnecessarily

### The Solution

Make automates and optimizes builds:
- Declarative dependency specification
- Only rebuilds what changed
- Parallel compilation support

## Makefile Basics

### Structure

```makefile
target: dependencies
	command
	command
```

**Important:** Commands must be indented with a tab, not spaces.

### Simple Example

```makefile
program: main.o util.o math.o
	gcc main.o util.o math.o -o program

main.o: main.c util.h math.h
	gcc -c main.c -o main.o

util.o: util.c util.h
	gcc -c util.c -o util.o

math.o: math.c math.h
	gcc -c math.c -o math.o

clean:
	rm -f *.o program
```

### Running Make

```bash
make            # Build first target
make program    # Build specific target
make clean      # Run clean target
make -j4        # Parallel build (4 jobs)
```

## Variables

### Defining Variables

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -g
LDFLAGS = -lm

program: main.o
	$(CC) $(LDFLAGS) main.o -o program

main.o: main.c
	$(CC) $(CFLAGS) -c main.c -o main.o
```

### Automatic Variables

```makefile
$@    # Target name
$<    # First dependency
$^    # All dependencies
$*    # Stem (pattern match)

main.o: main.c util.h
	$(CC) $(CFLAGS) -c $< -o $@
```

### Common Variables

```makefile
CC = gcc          # C compiler
CXX = g++         # C++ compiler
CFLAGS = -Wall    # C compiler flags
CXXFLAGS = -Wall  # C++ compiler flags
LDFLAGS = -lm     # Linker flags
LDLIBS = -lpthread # Libraries
```

## Pattern Rules

### Generic Compilation Rule

```makefile
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
```

This single rule handles all `.c` to `.o` compilation.

### Complete Example

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -g
LDFLAGS = -lm

SRCS = main.c util.c math.c
OBJS = $(SRCS:.c=.o)
TARGET = program

$(TARGET): $(OBJS)
	$(CC) $(LDFLAGS) $^ -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: clean
```

## Dependency Management

### Manual Dependencies

```makefile
main.o: main.c config.h util.h math.h
util.o: util.c util.h config.h
math.o: math.c math.h
```

### Automatic Dependencies

Generate with compiler:

```makefile
DEPFLAGS = -MMD -MP
CFLAGS += $(DEPFLAGS)

SRCS = main.c util.c math.c
OBJS = $(SRCS:.c=.o)
DEPS = $(SRCS:.c=.d)

-include $(DEPS)
```

The `-MMD` flag generates `.d` dependency files automatically.

## Phony Targets

Targets that don't create files:

```makefile
.PHONY: clean all install test

all: program

clean:
	rm -f *.o program

install: program
	cp program /usr/local/bin/

test: program
	./run_tests.sh
```

## Conditional Execution

```makefile
DEBUG ?= 0

ifeq ($(DEBUG), 1)
    CFLAGS += -g -DDEBUG
else
    CFLAGS += -O2 -DNDEBUG
endif

# Usage: make DEBUG=1
```

## Functions

### Built-in Functions

```makefile
SRCS = $(wildcard *.c)        # All .c files
OBJS = $(patsubst %.c,%.o,$(SRCS))  # Replace .c with .o
OBJS = $(SRCS:.c=.o)          # Shorthand
DIRS = $(sort $(dir $(SRCS))) # Unique directories
```

### Shell Commands

```makefile
VERSION = $(shell git describe --tags)
DATE = $(shell date +%Y%m%d)

CFLAGS += -DVERSION=\"$(VERSION)\"
```

## Complete Project Makefile

```makefile
# Compiler settings
CC = gcc
CFLAGS = -Wall -Wextra -std=c11
LDFLAGS =
LDLIBS = -lm

# Directories
SRCDIR = src
OBJDIR = obj
BINDIR = bin

# Files
SRCS = $(wildcard $(SRCDIR)/*.c)
OBJS = $(SRCS:$(SRCDIR)/%.c=$(OBJDIR)/%.o)
DEPS = $(OBJS:.o=.d)
TARGET = $(BINDIR)/program

# Debug/Release
DEBUG ?= 0
ifeq ($(DEBUG), 1)
    CFLAGS += -g -DDEBUG
else
    CFLAGS += -O2 -DNDEBUG
endif

# Default target
all: $(TARGET)

# Link
$(TARGET): $(OBJS) | $(BINDIR)
	$(CC) $(LDFLAGS) $^ $(LDLIBS) -o $@

# Compile with auto-dependencies
$(OBJDIR)/%.o: $(SRCDIR)/%.c | $(OBJDIR)
	$(CC) $(CFLAGS) -MMD -MP -c $< -o $@

# Create directories
$(OBJDIR) $(BINDIR):
	mkdir -p $@

# Include dependencies
-include $(DEPS)

# Phony targets
.PHONY: all clean install test

clean:
	rm -rf $(OBJDIR) $(BINDIR)

install: $(TARGET)
	install -m 755 $(TARGET) /usr/local/bin/

test: $(TARGET)
	./tests/run_tests.sh
```

## Alternative Build Systems

### CMake

Cross-platform build generator:

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MyProject)

add_executable(program main.c util.c math.c)
target_link_libraries(program m)
```

```bash
mkdir build && cd build
cmake ..
make
```

### Meson

Modern, fast build system:

```meson
# meson.build
project('myproject', 'c')
executable('program', 'main.c', 'util.c', 'math.c')
```

## Best Practices

1. **Use variables** for compiler and flags
2. **Use pattern rules** to reduce repetition
3. **Generate dependencies** automatically
4. **Use phony targets** for non-file targets
5. **Support debug/release** builds
6. **Include clean target**
7. **Document** complex makefiles

## Summary

Make provides:
- Dependency-based builds
- Incremental compilation
- Parallel execution
- Flexible configuration

Master Makefiles to efficiently build C projects of any size.
