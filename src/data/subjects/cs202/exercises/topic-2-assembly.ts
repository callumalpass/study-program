import type { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  {
    id: 'cs202-t2-ex1',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Register Identification',
    description: 'Identify the conventional use for: $zero, $v0, $a0, $t0, $s0, $sp, $ra. When would you use each?',
    difficulty: 1,
    hints: ['Consider caller-saved vs callee-saved', 'Think about function calling conventions'],
    solution: `$zero ($0): Always contains 0, useful for comparisons and loading constants
$v0-$v1 ($2-$3): Return values from functions, syscall codes
$a0-$a3 ($4-$7): First 4 function arguments
$t0-$t9 ($8-$15, $24-$25): Temporaries, caller-saved (not preserved across calls)
$s0-$s7 ($16-$23): Saved registers, callee-saved (preserved across calls)
$sp ($29): Stack pointer, points to top of stack
$ra ($31): Return address, set by jal instruction

Use cases:
- Loop counters: $t0-$t9 (temporary, don't need to save)
- Important values across function calls: $s0-$s7 (preserved)
- Passing arguments: $a0-$a3 first, then stack
- Getting return value: $v0 (or $v0-$v1 for 64-bit)`,
  },
  {
    id: 'cs202-t2-ex2',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Array Sum in Assembly',
    description: 'Write MIPS assembly to sum an array of 10 integers. Assume array base in $a0, length in $a1.',
    difficulty: 3,
    hints: ['Use sll to multiply index by 4', 'Initialize sum to 0 in $v0'],
    solution: `# Sum array elements
# Input: $a0 = array base address, $a1 = length (10)
# Output: $v0 = sum

sum_array:
    li   $v0, 0           # sum = 0
    li   $t0, 0           # i = 0

loop:
    bge  $t0, $a1, done   # if i >= length, exit
    sll  $t1, $t0, 2      # t1 = i * 4 (byte offset)
    add  $t1, $a0, $t1    # t1 = &array[i]
    lw   $t2, 0($t1)      # t2 = array[i]
    add  $v0, $v0, $t2    # sum += array[i]
    addi $t0, $t0, 1      # i++
    j    loop             # repeat

done:
    jr   $ra              # return

Key points:
- sll by 2 multiplies index by 4 for word addressing
- Using $t registers since we don't call other functions
- Return value in $v0 per convention`,
  },
  {
    id: 'cs202-t2-ex3',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Recursive Factorial',
    description: 'Write MIPS assembly for factorial(n). Handle the base case (n <= 1) and recursive case.',
    difficulty: 4,
    hints: ['Must save $ra before recursive call', 'Use $s0 to preserve n across calls'],
    solution: `# Factorial function
# Input: $a0 = n
# Output: $v0 = n!

factorial:
    # Prologue - save $ra and $s0
    addi $sp, $sp, -8     # allocate stack frame
    sw   $ra, 4($sp)      # save return address
    sw   $s0, 0($sp)      # save $s0

    # Base case: n <= 1
    move $s0, $a0         # save n in $s0
    li   $v0, 1           # default result = 1
    ble  $a0, 1, fact_done # if n <= 1, return 1

    # Recursive case: n * factorial(n-1)
    addi $a0, $s0, -1     # argument = n - 1
    jal  factorial        # call factorial(n-1)
    mul  $v0, $s0, $v0    # result = n * factorial(n-1)

fact_done:
    # Epilogue - restore and return
    lw   $s0, 0($sp)      # restore $s0
    lw   $ra, 4($sp)      # restore return address
    addi $sp, $sp, 8      # deallocate stack frame
    jr   $ra              # return`,
  },
  {
    id: 'cs202-t2-ex4',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Branch Instruction Encoding',
    description: 'Explain how branch target addresses are calculated in MIPS. Given beq at address 0x00400020 with offset 5, what is the target address?',
    difficulty: 3,
    hints: ['PC-relative addressing', 'Offset is in words, not bytes', 'PC is already incremented when offset is added'],
    solution: `Branch target calculation in MIPS:
Target = (PC + 4) + (offset × 4)

The PC is incremented to point to the next instruction before the offset is applied.
The offset is in words (4 bytes), so it's multiplied by 4.

Given: beq at 0x00400020, offset = 5
PC + 4 = 0x00400020 + 4 = 0x00400024
Target = 0x00400024 + (5 × 4) = 0x00400024 + 0x14 = 0x00400038

This allows branches to reach ±2^15 words = ±2^17 bytes = ±128KB from PC+4.

The 16-bit signed offset allows:
- Forward: up to 32,767 words (131,068 bytes)
- Backward: up to 32,768 words (131,072 bytes)`,
  },
  {
    id: 'cs202-t2-ex5',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Syscall Usage',
    description: 'Write MIPS code to: (a) Print "Hello" (b) Read an integer from user (c) Exit program. What syscall codes are used?',
    difficulty: 2,
    hints: ['Syscall code goes in $v0', '$a0 holds string address or integer to print'],
    solution: `# (a) Print "Hello"
    .data
msg:    .asciiz "Hello"

    .text
    la   $a0, msg      # $a0 = address of string
    li   $v0, 4        # syscall 4 = print string
    syscall

# (b) Read an integer
    li   $v0, 5        # syscall 5 = read integer
    syscall            # result in $v0
    move $t0, $v0      # save input to $t0

# (c) Exit program
    li   $v0, 10       # syscall 10 = exit
    syscall

Common syscall codes:
1 - print integer ($a0 = integer)
4 - print string ($a0 = address)
5 - read integer (result in $v0)
8 - read string ($a0 = buffer, $a1 = length)
10 - exit
11 - print character ($a0 = char)
12 - read character (result in $v0)`,
  },
  {
    id: 'cs202-t2-ex6',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Stack Frame Construction',
    description: 'Draw the stack frame for a function that uses $s0, $s1, and $ra, and has 2 local variables (4 bytes each). Show the proper prologue and epilogue code.',
    difficulty: 3,
    hints: ['Stack grows downward', 'Calculate total frame size', 'Use negative offsets from $sp after allocation'],
    solution: `Stack Frame Layout (16 bytes total):
           ┌──────────────┐
    $sp+12 │     $ra      │  (return address)
           ├──────────────┤
    $sp+8  │     $s1      │  (saved register)
           ├──────────────┤
    $sp+4  │     $s0      │  (saved register)
           ├──────────────┤
    $sp+0  │   local2     │  (local variable)
           ├──────────────┤
    $sp-4  │   local1     │  (local variable)
           └──────────────┘

Prologue:
    addi $sp, $sp, -16    # allocate 16 bytes
    sw   $ra, 12($sp)     # save return address
    sw   $s1, 8($sp)      # save $s1
    sw   $s0, 4($sp)      # save $s0
    # locals at 0($sp) and -4($sp) if needed below $sp

Epilogue:
    lw   $s0, 4($sp)      # restore $s0
    lw   $s1, 8($sp)      # restore $s1
    lw   $ra, 12($sp)     # restore return address
    addi $sp, $sp, 16     # deallocate frame
    jr   $ra              # return`,
  },
  {
    id: 'cs202-t2-ex7',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Translate C to Assembly',
    description: 'Translate to MIPS: int max(int a, int b) { if (a > b) return a; else return b; }',
    difficulty: 2,
    hints: ['Arguments in $a0, $a1', 'Return value in $v0', 'Use bgt or slt for comparison'],
    solution: `# int max(int a, int b)
# $a0 = a, $a1 = b
# Returns max in $v0

max:
    # No need for stack frame (leaf function, no $s regs used)

    bgt  $a0, $a1, a_greater  # if a > b, go to a_greater

    # else: return b
    move $v0, $a1
    jr   $ra

a_greater:
    # return a
    move $v0, $a0
    jr   $ra

Alternative using slt:
max_alt:
    slt  $t0, $a1, $a0    # t0 = 1 if b < a (i.e., a > b)
    beqz $t0, return_b    # if not (a > b), return b
    move $v0, $a0         # return a
    jr   $ra
return_b:
    move $v0, $a1         # return b
    jr   $ra`,
  },
  {
    id: 'cs202-t2-ex8',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'While Loop Translation',
    description: 'Translate to MIPS: int i = 0; while (i < 100) { sum += arr[i]; i++; }. Assume arr base in $s0, sum in $s1.',
    difficulty: 3,
    hints: ['Initialize loop variable', 'Check condition at top or bottom of loop', 'Update index by 4 for word array'],
    solution: `# Assume: $s0 = arr base, $s1 = sum (initialized elsewhere)
# Use $t0 for i, $t1 for address calculation, $t2 for arr[i]

    li   $t0, 0           # i = 0

while_loop:
    li   $t3, 100         # load constant for comparison
    bge  $t0, $t3, end_while  # if i >= 100, exit loop

    # sum += arr[i]
    sll  $t1, $t0, 2      # t1 = i * 4
    add  $t1, $s0, $t1    # t1 = &arr[i]
    lw   $t2, 0($t1)      # t2 = arr[i]
    add  $s1, $s1, $t2    # sum += arr[i]

    # i++
    addi $t0, $t0, 1

    j    while_loop       # repeat

end_while:
    # continue with rest of program

Note: We use $s0, $s1 for arr and sum because they need to persist.
$t0-$t2 are used for temporaries within this code block.`,
  },
  {
    id: 'cs202-t2-ex9',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Nested Function Calls',
    description: 'Function A calls B, which calls C. Trace the stack contents and $ra values throughout. What happens if B forgets to save $ra?',
    difficulty: 4,
    hints: ['Each jal overwrites $ra', 'Stack grows with each call', 'Missing save causes return to wrong location'],
    solution: `Execution trace with proper $ra saving:

1. main at 0x400000 calls A (jal A)
   $ra = 0x400004 (return to main)

2. A at 0x400100 saves $ra, calls B (jal B)
   Stack: [0x400004]  <- A's saved $ra
   $ra = 0x400108 (return to A)

3. B at 0x400200 saves $ra, calls C (jal C)
   Stack: [0x400004, 0x400108]  <- Both saved
   $ra = 0x400208 (return to B)

4. C returns: jr $ra → goes to 0x400208 (B)
5. B restores $ra=0x400108, returns → goes to A
6. A restores $ra=0x400004, returns → goes to main

If B forgets to save $ra:
- When B calls C: $ra = 0x400208 (return to B)
- C returns correctly to B
- B tries jr $ra, but $ra still = 0x400208 (not 0x400108!)
- B returns to itself! → infinite loop or crash`,
  },
  {
    id: 'cs202-t2-ex10',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Pseudo-instruction Expansion',
    description: 'Show how the assembler expands these pseudo-instructions into real MIPS instructions: (a) li $t0, 0x12345678 (b) la $t0, label (c) bgt $t0, $t1, target',
    difficulty: 3,
    hints: ['li needs lui + ori for large constants', 'la uses lui + ori with label address', 'bgt uses slt + bne'],
    solution: `(a) li $t0, 0x12345678
Expands to:
    lui  $t0, 0x1234      # load upper 16 bits
    ori  $t0, $t0, 0x5678 # OR in lower 16 bits
Result: $t0 = 0x12345678

(b) la $t0, label (assuming label at 0x10010000)
Expands to:
    lui  $t0, 0x1001      # load upper 16 bits of address
    ori  $t0, $t0, 0x0000 # OR in lower 16 bits
Or: lui $at, hi(label); ori $t0, $at, lo(label)

(c) bgt $t0, $t1, target  (branch if $t0 > $t1)
Expands to:
    slt  $at, $t1, $t0    # $at = 1 if $t1 < $t0 (i.e., $t0 > $t1)
    bne  $at, $zero, target # branch if $at != 0

The assembler uses $at ($1) for temporaries in expansions.
This is why $at is reserved for assembler use.`,
  },
  {
    id: 'cs202-t2-ex11',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Memory Layout',
    description: 'Describe the MIPS memory layout. Where are text, data, heap, and stack segments? What are their starting addresses and growth directions?',
    difficulty: 2,
    hints: ['Text starts at 0x00400000', 'Stack at top of user memory', 'Heap grows up, stack grows down'],
    solution: `MIPS Memory Layout:

0x7FFFFFFF ┌─────────────────┐
           │     Stack       │ ← Grows DOWN (toward lower addresses)
           │       ↓         │   $sp points to top of stack
           ├─────────────────┤
           │                 │
           │    (unused)     │
           │                 │
           ├─────────────────┤
           │       ↑         │
           │     Heap        │ ← Grows UP (toward higher addresses)
0x10040000 ├─────────────────┤   Dynamic allocation (malloc)
           │   Static Data   │ ← .data segment
0x10000000 ├─────────────────┤   Global variables, constants
           │     Text        │ ← .text segment (program code)
0x00400000 ├─────────────────┤   Instructions start here
           │    Reserved     │ ← OS/kernel use
0x00000000 └─────────────────┘

Key points:
- Stack and heap grow toward each other
- Stack overflow occurs if they collide
- Static data has fixed addresses at compile time
- $gp (global pointer) typically points to middle of static data`,
  },
  {
    id: 'cs202-t2-ex12',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Leaf vs Non-Leaf Functions',
    description: 'What distinguishes a leaf function from a non-leaf function? What optimizations can be made for leaf functions? Write an example of each.',
    difficulty: 2,
    hints: ['Leaf = does not call other functions', 'Consider which registers need saving'],
    solution: `Leaf function: Does not call any other functions
Non-leaf function: Calls at least one other function

Leaf function optimizations:
- No need to save $ra (won't be overwritten)
- Can use $t registers freely (no calls to corrupt them)
- Smaller/no stack frame needed

Example Leaf Function (no stack frame needed):
square:               # int square(int x)
    mul  $v0, $a0, $a0  # return x * x
    jr   $ra

Example Non-Leaf Function (must save $ra):
sum_squares:          # int sum_squares(int a, int b)
    addi $sp, $sp, -12
    sw   $ra, 8($sp)
    sw   $s0, 4($sp)
    sw   $s1, 0($sp)

    move $s0, $a0       # save a
    jal  square         # square(a)
    move $s1, $v0       # save result

    move $a0, $s0       # restore b... wait, we need to save b too!
    # This shows why careful register planning is needed

    lw   $s1, 0($sp)
    lw   $s0, 4($sp)
    lw   $ra, 8($sp)
    addi $sp, $sp, 12
    jr   $ra`,
  },
  {
    id: 'cs202-t2-ex13',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Debugging Assembly',
    description: 'The following code should compute n! but has bugs. Find and fix them:\n\nfact: li $v0, 1\n      ble $a0, $zero, done\nloop: mul $v0, $v0, $a0\n      sub $a0, $a0, 1\n      bne $a0, $zero, loop\ndone: jr $ra',
    difficulty: 3,
    hints: ['Trace through with n=3', 'Check the base case condition', 'Check the loop termination'],
    solution: `Bug analysis:

Original code traced with n=3:
- $a0=3, $v0=1
- 3 > 0, skip to loop
- mul: $v0 = 1*3 = 3
- sub: $a0 = 3-1 = 2
- 2 != 0, goto loop
- mul: $v0 = 3*2 = 6
- sub: $a0 = 2-1 = 1
- 1 != 0, goto loop
- mul: $v0 = 6*1 = 6
- sub: $a0 = 1-1 = 0
- 0 == 0, fall through to done
- Returns 6 ✓ (Works for this case!)

But traced with n=0:
- $a0=0, $v0=1
- 0 <= 0, goto done
- Returns 1 ✓ (Correct!)

Traced with n=1:
- $a0=1, $v0=1
- 1 > 0, skip to loop
- mul: $v0 = 1*1 = 1
- sub: $a0 = 1-1 = 0
- 0 == 0, done
- Returns 1 ✓ (Correct!)

Actually, the code works! But there are style issues:
1. Should use subi (pseudo) or addi with negative
2. Base case should be $a0 <= 1, not <= 0

Fixed version (same logic, clearer):
fact: li   $v0, 1
      ble  $a0, 1, done    # 0! = 1! = 1
loop: mul  $v0, $v0, $a0
      addi $a0, $a0, -1
      bgt  $a0, 1, loop    # continue while a0 > 1
done: jr   $ra`,
  },
  {
    id: 'cs202-t2-ex14',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'Passing Arrays to Functions',
    description: 'Write MIPS code to pass a 10-element array to a function that finds the maximum value. Show both the caller and callee code.',
    difficulty: 3,
    hints: ['Pass array by reference (address)', 'Pass length as second argument'],
    solution: `# Caller code
    .data
arr:    .word 5, 2, 8, 1, 9, 3, 7, 4, 6, 0

    .text
main:
    la   $a0, arr         # $a0 = array address
    li   $a1, 10          # $a1 = length
    jal  find_max         # call function
    move $s0, $v0         # save max value
    # ... continue

# Callee code
# int find_max(int* arr, int len)
# $a0 = array address, $a1 = length
# Returns max value in $v0

find_max:
    lw   $v0, 0($a0)      # max = arr[0]
    li   $t0, 1           # i = 1

max_loop:
    bge  $t0, $a1, max_done  # if i >= len, done

    sll  $t1, $t0, 2      # t1 = i * 4
    add  $t1, $a0, $t1    # t1 = &arr[i]
    lw   $t2, 0($t1)      # t2 = arr[i]

    ble  $t2, $v0, skip   # if arr[i] <= max, skip
    move $v0, $t2         # max = arr[i]

skip:
    addi $t0, $t0, 1      # i++
    j    max_loop

max_done:
    jr   $ra              # return max in $v0`,
  },
  {
    id: 'cs202-t2-ex15',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: 'String Processing',
    description: 'Write MIPS assembly to calculate the length of a null-terminated string. The string address is in $a0. Return length in $v0.',
    difficulty: 3,
    hints: ['Strings end with byte 0x00', 'Use lb to load a byte', 'Count until you hit null'],
    solution: `# int strlen(char* s)
# $a0 = string address
# Returns length in $v0

strlen:
    move $t0, $a0         # t0 = current position
    li   $v0, 0           # length = 0

strlen_loop:
    lb   $t1, 0($t0)      # load byte at current position
    beqz $t1, strlen_done # if null terminator, done

    addi $v0, $v0, 1      # length++
    addi $t0, $t0, 1      # move to next character
    j    strlen_loop

strlen_done:
    jr   $ra

Example trace with "Hi":
Address:  0x10010000  0x10010001  0x10010002
Content:  'H' (72)    'i' (105)   0 (null)

- t0 = 0x10010000, load 'H', not null, v0=1, t0++
- t0 = 0x10010001, load 'i', not null, v0=2, t0++
- t0 = 0x10010002, load 0, is null, return v0=2`,
  },
  {
    id: 'cs202-t2-ex16',
    subjectId: 'cs202',
    topicId: 'cs202-topic2',
    type: 'written',
    title: '2D Array Access',
    description: 'Given a 4x4 matrix of integers stored in row-major order, write MIPS code to access element matrix[i][j]. Assume matrix base in $s0, i in $s1, j in $s2.',
    difficulty: 4,
    hints: ['Row-major: rows stored contiguously', 'Address = base + (i * num_cols + j) * element_size', 'Each row has 4 elements'],
    solution: `# Access matrix[i][j] where matrix is 4x4 integers
# $s0 = base address, $s1 = i, $s2 = j
# Result in $t0

    # Calculate row offset: i * 4 (columns per row)
    sll  $t0, $s1, 2      # t0 = i * 4

    # Add column index: i * 4 + j
    add  $t0, $t0, $s2    # t0 = i * 4 + j

    # Convert to byte offset: (i * 4 + j) * 4
    sll  $t0, $t0, 2      # t0 = (i * 4 + j) * 4

    # Calculate final address
    add  $t0, $s0, $t0    # t0 = base + offset

    # Load the element
    lw   $t1, 0($t0)      # t1 = matrix[i][j]

Memory layout for 4x4 matrix (addresses relative to base):
        j=0   j=1   j=2   j=3
i=0     0     4     8     12
i=1     16    20    24    28
i=2     32    36    40    44
i=3     48    52    56    60

Example: matrix[2][3]
offset = (2 * 4 + 3) * 4 = 11 * 4 = 44 bytes
address = base + 44`,
  },
];
