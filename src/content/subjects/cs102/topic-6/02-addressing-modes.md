# Addressing Modes (How Assembly Finds Data)

An “addressing mode” is the rule an instruction uses to locate its operand. Even simple assembly problems become easier when you can name the mode being used.

## Immediate

The instruction contains the literal value:

`MOV R0, #42`

## Register

The operand is in a register:

`ADD R2, R0, R1`

## Direct / absolute (conceptual)

The instruction contains a memory address:

`LOAD R0, [0x1000]`

## Indirect

A register holds an address:

`LOAD R0, [R1]` means “load from memory at address stored in R1”.

## Base + offset (common)

Compute address as `base + offset`:

`LOAD R0, [R1 + #8]`

This is how arrays and structs are accessed: base pointer plus an index/field offset.

## Key takeaways

- Immediate/register/indirect/base+offset are the common modes to recognize.
- Indirect and base+offset are the core of pointers, arrays, and structs in assembly terms.
- Naming the mode helps you trace correctly and avoid mixing “value” and “address”.

