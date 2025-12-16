# Fuzzing

Fuzzing is an automated testing technique that provides invalid, unexpected, or random inputs to programs to find bugs and vulnerabilities. This subtopic covers fuzzing types, tools like AFL, and coverage-guided fuzzing.

## Fuzzing Overview

Fuzzing systematically tests programs with malformed inputs to trigger crashes and unexpected behavior.

### Fuzzing Concepts

```
Fuzzing Process:

┌─────────────────┐
│ Input Generator │ → Generates test inputs (random, mutated, structured)
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Target Program  │ → Runs with fuzzed input
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Monitor         │ → Detects crashes, hangs, memory errors
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Crash Triage    │ → Analyzes crashes for exploitability
└─────────────────┘

Benefits:
• Finds crashes and security bugs
• Automated (runs continuously)
• No source code needed (black-box)
• Effective for memory safety issues
• Discovers edge cases
```

## Fuzzing Types

### Generation-Based vs Mutation-Based

```python
class FuzzingTypes:
    """Different fuzzing approaches"""

    @staticmethod
    def generation_based_fuzzing():
        """Generate inputs from scratch based on format"""
        return """
        Generation-Based Fuzzing:

        Approach: Create inputs from format specification
        Example: Generate HTTP requests from RFC specification

        Advantages:
        + Valid structure (better coverage)
        + Protocol-aware
        + Can test specific features
        + Efficient for complex formats

        Disadvantages:
        - Requires format knowledge
        - Implementation complexity
        - May miss format-violating bugs

        Use Cases:
        • File format parsers (PDF, PNG, etc.)
        • Network protocols (HTTP, TLS, etc.)
        • APIs with strict schemas
        """

    @staticmethod
    def mutation_based_fuzzing():
        """Mutate existing valid inputs"""
        return """
        Mutation-Based Fuzzing:

        Approach: Take valid input and randomly modify it
        Example: Take valid JPEG, flip random bits

        Advantages:
        + No format knowledge needed
        + Quick to start
        + Finds format-violating bugs
        + Simple to implement

        Disadvantages:
        - May not reach deep code
        - Less efficient
        - Mostly invalid inputs

        Mutations:
        • Bit flips
        • Byte flips
        • Integer additions/subtractions
        • Block deletion/insertion
        • Block shuffling

        Use Cases:
        • Unknown file formats
        • Quick initial testing
        • Simple targets
        """

    @staticmethod
    def coverage_guided_fuzzing():
        """Use code coverage feedback to guide fuzzing"""
        return """
        Coverage-Guided Fuzzing:

        Approach: Use code coverage to guide input generation
        Tool: American Fuzzy Lop (AFL), LibFuzzer

        Process:
        1. Run input through instrumented binary
        2. Track code paths executed
        3. Inputs that reach new paths are saved
        4. Mutate interesting inputs
        5. Repeat

        Advantages:
        + Intelligent test case selection
        + Discovers deep bugs
        + Maximizes code coverage
        + Very effective

        Disadvantages:
        - Requires instrumentation
        - Slower than dumb fuzzing
        - CPU intensive

        Use Cases:
        • Complex programs
        • Security-critical code
        • Finding deep bugs
        """
```

## American Fuzzy Lop (AFL)

AFL is a coverage-guided fuzzer that's found thousands of vulnerabilities.

### AFL Usage

```python
import subprocess
import os
from typing import List

class AFLFuzzer:
    """Wrapper for AFL (American Fuzzy Lop) fuzzer"""

    def __init__(self, target_binary: str, input_dir: str, output_dir: str):
        self.target = target_binary
        self.input_dir = input_dir
        self.output_dir = output_dir

    def prepare_environment(self):
        """Prepare AFL environment"""
        # Create directories
        os.makedirs(self.input_dir, exist_ok=True)
        os.makedirs(self.output_dir, exist_ok=True)

        # Create seed inputs (initial test cases)
        self._create_seed_inputs()

    def _create_seed_inputs(self):
        """Create initial seed inputs"""
        # Example: Simple text file seeds
        seeds = [
            "Hello World",
            "Test input",
            "A" * 100,
            "1234567890",
            ""
        ]

        for i, seed in enumerate(seeds):
            with open(f"{self.input_dir}/seed{i}.txt", "w") as f:
                f.write(seed)

    def compile_with_afl(self, source_file: str):
        """Compile target with AFL instrumentation"""
        cmd = [
            'afl-gcc',              # AFL compiler wrapper
            '-o', self.target,      # Output binary
            source_file,            # Source code
            '-fsanitize=address'    # AddressSanitizer (optional, recommended)
        ]

        subprocess.run(cmd, check=True)
        print(f"Compiled {source_file} with AFL instrumentation")

    def start_fuzzing(self, timeout: int = None):
        """Start AFL fuzzing"""
        cmd = [
            'afl-fuzz',
            '-i', self.input_dir,   # Input directory (seeds)
            '-o', self.output_dir,  # Output directory (results)
            '-m', 'none',           # Memory limit (none = unlimited)
            '--',                   # Separator
            self.target,            # Target binary
            '@@'                    # Placeholder for input file
        ]

        if timeout:
            cmd.insert(1, '-V')
            cmd.insert(2, str(timeout))

        print(f"Starting AFL fuzzing: {' '.join(cmd)}")
        subprocess.run(cmd)

    def get_crash_count(self) -> int:
        """Get number of unique crashes found"""
        crash_dir = os.path.join(self.output_dir, 'crashes')
        if os.path.exists(crash_dir):
            return len([f for f in os.listdir(crash_dir) if f.startswith('id:')])
        return 0

    def get_stats(self) -> dict:
        """Get fuzzing statistics"""
        stats_file = os.path.join(self.output_dir, 'fuzzer_stats')

        if not os.path.exists(stats_file):
            return {}

        stats = {}
        with open(stats_file, 'r') as f:
            for line in f:
                if ':' in line:
                    key, value = line.split(':', 1)
                    stats[key.strip()] = value.strip()

        return {
            'exec_per_sec': stats.get('execs_per_sec', '0'),
            'total_execs': stats.get('execs_done', '0'),
            'unique_crashes': stats.get('unique_crashes', '0'),
            'unique_hangs': stats.get('unique_hangs', '0'),
            'coverage': stats.get('bitmap_cvg', '0%')
        }

    @staticmethod
    def example_vulnerable_program():
        """Example vulnerable C program for fuzzing"""
        return """
        // vulnerable.c - Example program with buffer overflow
        #include <stdio.h>
        #include <string.h>
        #include <stdlib.h>

        // Vulnerable function
        void process_input(char *input) {
            char buffer[32];

            // VULNERABILITY: No bounds checking
            strcpy(buffer, input);

            printf("Processed: %s\\n", buffer);
        }

        int main(int argc, char **argv) {
            if (argc != 2) {
                printf("Usage: %s <input_file>\\n", argv[0]);
                return 1;
            }

            // Read input from file
            FILE *f = fopen(argv[1], "r");
            if (!f) {
                printf("Cannot open file\\n");
                return 1;
            }

            char input[1024];
            fgets(input, sizeof(input), f);
            fclose(f);

            // Process input (vulnerable)
            process_input(input);

            return 0;
        }

        // Compile with AFL:
        // afl-gcc -o vulnerable vulnerable.c -fsanitize=address
        //
        // Run AFL:
        // afl-fuzz -i input_dir -o output_dir -- ./vulnerable @@
        """

    @staticmethod
    def afl_parallel_fuzzing():
        """Run multiple AFL instances in parallel"""
        return """
        # Parallel AFL fuzzing for better coverage

        # Master instance
        afl-fuzz -i input -o output -M fuzzer1 -- ./target @@

        # Slave instances (in separate terminals)
        afl-fuzz -i input -o output -S fuzzer2 -- ./target @@
        afl-fuzz -i input -o output -S fuzzer3 -- ./target @@
        afl-fuzz -i input -o output -S fuzzer4 -- ./target @@

        # Use all CPU cores for maximum throughput
        # Master syncs findings with slaves
        """
```

## LibFuzzer

LibFuzzer is an in-process, coverage-guided fuzzing engine.

### LibFuzzer Usage

```cpp
// Example LibFuzzer target (C++)
#include <cstdint>
#include <cstddef>
#include <string>

// Vulnerable parsing function
void ParseData(const uint8_t *data, size_t size) {
    if (size < 4) return;

    // VULNERABILITY: Integer overflow
    int32_t length = *(int32_t*)data;

    if (length < 0) return;

    // VULNERABILITY: Buffer overflow if length > size - 4
    char buffer[100];
    memcpy(buffer, data + 4, length);
}

// LibFuzzer entry point
extern "C" int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size) {
    ParseData(data, size);
    return 0;
}

/*
Compile with LibFuzzer:
clang++ -g -O1 -fsanitize=fuzzer,address target.cpp -o fuzzer

Run:
./fuzzer corpus_dir/

Features:
- In-process (fast)
- Coverage-guided
- AddressSanitizer integration
- Automatic crash minimization
*/
```

## Fuzzing Strategies

### Effective Fuzzing Techniques

```python
class FuzzingStrategies:
    """Advanced fuzzing strategies"""

    @staticmethod
    def dictionary_based_fuzzing():
        """Use dictionaries for better coverage"""
        return {
            'concept': 'Provide domain-specific tokens to fuzzer',
            'example_dictionary': [
                '# HTTP keywords',
                'GET',
                'POST',
                'Content-Length',
                'Authorization',
                '# Common values',
                '0',
                '-1',
                '2147483647',  # MAX_INT
                '# Format strings',
                '%s',
                '%n',
                '%x'
            ],
            'usage': 'afl-fuzz -i input -o output -x dictionary.txt -- ./target @@',
            'benefits': [
                'Faster discovery of format-specific bugs',
                'Better coverage of protocol implementations',
                'Finds bugs in parsing logic'
            ]
        }

    @staticmethod
    def structured_fuzzing():
        """Fuzz structured data formats"""
        return """
        Structured Fuzzing (Grammar-Based):

        Tool: Grammarinator, Nautilus
        Approach: Define grammar, generate inputs

        Example Grammar (JSON):
        {
            "name": <string>,
            "age": <int>,
            "email": <email>
        }

        Benefits:
        • Valid structure (deeper coverage)
        • Tests complex formats
        • Combines mutation + generation

        Use Cases:
        • Compilers
        • Interpreters
        • Complex file formats
        """

    @staticmethod
    def differential_fuzzing():
        """Compare multiple implementations"""
        return """
        Differential Fuzzing:

        Concept: Feed same input to multiple implementations,
                 find discrepancies

        Example:
        Input → [ Implementation A ]
                [ Implementation B ] → Compare outputs
                [ Implementation C ]

        Finds:
        • Logic bugs
        • Spec violations
        • Inconsistent behavior

        Use Cases:
        • Multiple TLS libraries
        • Different compilers
        • Protocol implementations
        """
```

## Crash Analysis

### Triaging Crashes

```python
class CrashTriage:
    """Analyze and triage fuzzing crashes"""

    @staticmethod
    def analyze_crash(crash_file: str, binary: str) -> dict:
        """Analyze crash for exploitability"""
        import subprocess

        # Run under debugger to get crash details
        gdb_cmd = f"gdb -batch -ex 'run < {crash_file}' -ex 'bt' {binary}"

        result = subprocess.run(
            gdb_cmd,
            shell=True,
            capture_output=True,
            text=True
        )

        # Parse output
        output = result.stdout + result.stderr

        analysis = {
            'crash_file': crash_file,
            'binary': binary,
            'crash_type': 'UNKNOWN',
            'exploitable': 'UNKNOWN',
            'backtrace': output
        }

        # Identify crash type
        if 'SIGSEGV' in output:
            analysis['crash_type'] = 'Segmentation fault'
            if 'write' in output:
                analysis['exploitable'] = 'LIKELY'
            else:
                analysis['exploitable'] = 'POSSIBLE'

        elif 'SIGABRT' in output:
            analysis['crash_type'] = 'Abort (assertion failure)'
            analysis['exploitable'] = 'UNLIKELY'

        elif 'stack-buffer-overflow' in output:
            analysis['crash_type'] = 'Stack buffer overflow'
            analysis['exploitable'] = 'LIKELY'

        elif 'heap-buffer-overflow' in output:
            analysis['crash_type'] = 'Heap buffer overflow'
            analysis['exploitable'] = 'POSSIBLE'

        elif 'use-after-free' in output:
            analysis['crash_type'] = 'Use-after-free'
            analysis['exploitable'] = 'LIKELY'

        return analysis

    @staticmethod
    def minimize_crash(crash_file: str, binary: str) -> str:
        """Minimize crashing input using afl-tmin"""
        output_file = crash_file + '.min'

        cmd = [
            'afl-tmin',
            '-i', crash_file,
            '-o', output_file,
            '--',
            binary,
            '@@'
        ]

        subprocess.run(cmd)
        return output_file

    @staticmethod
    def exploitability_assessment():
        """Crash exploitability categories"""
        return {
            'EXPLOITABLE': {
                'description': 'Likely exploitable for code execution',
                'examples': [
                    'Stack buffer overflow',
                    'Heap buffer overflow (controllable)',
                    'Use-after-free',
                    'Format string bug'
                ],
                'priority': 'CRITICAL'
            },
            'PROBABLY_EXPLOITABLE': {
                'description': 'May be exploitable with effort',
                'examples': [
                    'Heap corruption',
                    'Integer overflow leading to buffer overflow',
                    'Out-of-bounds write'
                ],
                'priority': 'HIGH'
            },
            'PROBABLY_NOT_EXPLOITABLE': {
                'description': 'Unlikely to be exploitable',
                'examples': [
                    'Null pointer dereference',
                    'Out-of-bounds read',
                    'Division by zero'
                ],
                'priority': 'MEDIUM'
            },
            'NOT_EXPLOITABLE': {
                'description': 'Not a security issue',
                'examples': [
                    'Assertion failures',
                    'Timeouts',
                    'Expected exceptions'
                ],
                'priority': 'LOW'
            }
        }
```

## Best Practices

```python
class FuzzingBestPractices:
    """Fuzzing best practices"""

    RECOMMENDATIONS = """
    Fuzzing Best Practices:

    1. Target Selection
       ✓ Parsers (file formats, protocols)
       ✓ Input handling code
       ✓ Network services
       ✓ Security-critical functions
       ✓ Legacy code

    2. Instrumentation
       ✓ Compile with AddressSanitizer (ASAN)
       ✓ MemorySanitizer (MSAN)
       ✓ UndefinedBehaviorSanitizer (UBSAN)
       ✓ Coverage instrumentation (AFL, LibFuzzer)

    3. Seed Selection
       ✓ Valid inputs (start with known-good)
       ✓ Diverse inputs
       ✓ Edge cases
       ✓ Minimal corpus (deduplicate)
       ✓ Real-world samples

    4. Runtime
       ✓ Run for extended periods (days/weeks)
       ✓ Use multiple CPU cores (parallel fuzzing)
       ✓ Monitor coverage growth
       ✓ Periodically review findings
       ✓ Minimize crashes

    5. Crash Analysis
       ✓ Triage all crashes
       ✓ Deduplicate similar crashes
       ✓ Assess exploitability
       ✓ Minimize test cases
       ✓ Report unique bugs

    6. Integration
       ✓ Continuous fuzzing infrastructure
       ✓ Automated crash reporting
       ✓ Coverage dashboards
       ✓ CI/CD integration
       ✓ OSS-Fuzz for open source

    7. Optimization
       ✓ Profile target for bottlenecks
       ✓ Optimize hot paths
       ✓ Use dictionaries
       ✓ Persistent mode (LibFuzzer)
       ✓ Custom mutators
    """
```

## Summary

Fuzzing automatically discovers bugs by testing with malformed inputs:

- **Types**: Generation-based (from spec), mutation-based (modify inputs), coverage-guided (AFL)
- **Tools**: AFL (coverage-guided), LibFuzzer (in-process), domain-specific fuzzers
- **Coverage-Guided**: Uses code coverage feedback to guide input generation (most effective)
- **Instrumentation**: AddressSanitizer, MemorySanitizer, coverage tracking
- **Crash Analysis**: Triage crashes, assess exploitability, minimize test cases
- **Best Practices**: Good seed corpus, long runtime, multiple cores, continuous fuzzing

Fuzzing is highly effective for finding memory safety bugs, crashes, and security vulnerabilities in parsers, protocols, and input handling code.
