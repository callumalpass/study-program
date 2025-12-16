# Bottom-Up Parsing

Bottom-up parsing takes the opposite approach from top-down parsing: it begins with the input string and works backward toward the start symbol. This strategy constructs a rightmost derivation in reverse, building the parse tree from the leaves upward to the root. Bottom-up parsers are more powerful than top-down parsers, capable of handling a larger class of grammars including left-recursive grammars.

## Fundamental Concepts

A bottom-up parser scans the input from left to right, identifying substrings that match the right-hand side of productions. When such a substring is found, the parser reduces it by replacing it with the corresponding left-hand side non-terminal. This process continues until the input is reduced to the start symbol.

The key challenge is determining which substring to reduce at each step. Not every substring matching a production's right-hand side should be reduced immediately. The parser must identify handles: substrings that, when reduced, lead toward a valid parse.

## Shift-Reduce Parsing

Shift-reduce parsing is the general framework for bottom-up parsing. The parser uses a stack to hold grammar symbols and performs two primary operations:

**Shift**: Move the next input token onto the stack.

**Reduce**: Replace the symbols at the top of the stack (matching a production's right-hand side) with the production's left-hand side non-terminal.

Two additional operations complete the set:

**Accept**: Announce successful parsing when the start symbol is on the stack and input is exhausted.

**Error**: Report syntax error when no shift or reduce is possible.

### Example: Shift-Reduce Parse

Consider the grammar:

```
E → E + T | T
T → T * F | F
F → ( E ) | id
```

Parsing `id * id` proceeds:

```
Stack          Input       Action
$              id*id$      Shift
$id            *id$        Reduce F → id
$F             *id$        Reduce T → F
$T             *id$        Shift
$T*            id$         Shift
$T*id          $           Reduce F → id
$T*F           $           Reduce T → T * F
$T             $           Reduce E → T
$E             $           Accept
```

Each step either shifts an input symbol or reduces stack symbols according to a production.

## Handles

A handle is a substring that matches a production's right-hand side and whose reduction represents one step in the reverse of a rightmost derivation. More formally, if S ⇒*ᵣₘ αAw ⇒ᵣₘ αβw, then production A → β with string αβw has handle β at position following α.

Identifying handles is crucial because reducing non-handles can lead the parser down incorrect paths. In a correct bottom-up parse, each reduction replaces a handle.

### Handle Properties

Handles have several important properties:

**Uniqueness**: In an unambiguous grammar, each right-sentential form has exactly one handle.

**Position**: The handle always appears at the top of the stack in shift-reduce parsing.

**Rightmost derivation**: Reducing handles in reverse gives a rightmost derivation.

For the parse above, the handles are:
- `id` (first occurrence) → F
- `F` → T
- `*` and `id` → T * F (treating the stack contents)
- `T` → E

## Viable Prefixes

A viable prefix is a prefix of a right-sentential form that does not extend past the right end of the handle. In shift-reduce parsing, the stack always contains a viable prefix. This property ensures the parser hasn't shifted too far past where a reduction should occur.

The concept of viable prefixes leads to the construction of finite automata that recognize when handles appear at the top of the stack. This automaton forms the basis for LR parsing.

## Conflicts in Shift-Reduce Parsing

The parser must decide whether to shift or reduce at each step. Conflicts arise when the decision is ambiguous:

**Shift-reduce conflict**: The parser could either shift the next input or reduce stack symbols. The grammar may allow both actions to be valid depending on future input.

**Reduce-reduce conflict**: Multiple productions could reduce the symbols at the top of the stack. The parser cannot determine which production to use.

These conflicts indicate the grammar is not suitable for straightforward shift-reduce parsing. More sophisticated parsing algorithms (like LR parsing) resolve these conflicts using additional information.

### Example: Shift-Reduce Conflict

The "dangling else" grammar exhibits shift-reduce conflicts:

```
S → if E then S
  | if E then S else S
  | other
```

When the parser has processed `if E then S` and the next input is `else`, it faces a choice:
- Reduce using S → if E then S (associate else with outer if)
- Shift the else (associate else with inner if)

The grammar is ambiguous, causing the conflict.

## Operator Precedence Parsing

Operator precedence parsing is a simple bottom-up technique for expression grammars. It uses precedence relations between terminals to guide parsing decisions:

- **a ⋖ b**: a has lower precedence than b (shift)
- **a ≐ b**: a has equal precedence to b (part of same handle)
- **a ⋗ b**: a has higher precedence than b (reduce)

These relations are defined based on operator precedence and associativity rules from the language specification.

### Example: Precedence Relations

For arithmetic expressions:

```
       | id  | +   | *   | (   | )   | $
-------|-----|-----|-----|-----|-----|-----
id     |     | ⋗   | ⋗   |     | ⋗   | ⋗
+      | ⋖   | ⋗   | ⋖   | ⋖   | ⋗   | ⋗
*      | ⋖   | ⋗   | ⋗   | ⋖   | ⋗   | ⋗
(      | ⋖   | ⋖   | ⋖   | ⋖   | ≐   |
)      |     | ⋗   | ⋗   |     | ⋗   | ⋗
$      | ⋖   | ⋖   | ⋖   | ⋖   |     |
```

The parser shifts when the relation is ⋖ or ≐, and reduces when it is ⋗.

### Limitations

Operator precedence parsing is limited:
- Only applies to expression grammars
- Cannot handle all language constructs
- Precedence relations must be unambiguous

Despite limitations, it's useful for parsing expressions in larger grammars handled by other techniques.

## Stack Implementation

The shift-reduce parser stack holds both symbols and state information:

```python
class Parser:
    def __init__(self, input_tokens):
        self.stack = ['$']
        self.input = input_tokens + ['$']
        self.position = 0

    def shift(self):
        self.stack.append(self.input[self.position])
        self.position += 1

    def reduce(self, production):
        # production is A → β
        # Pop |β| symbols from stack
        for _ in range(len(production.rhs)):
            self.stack.pop()
        # Push A onto stack
        self.stack.append(production.lhs)

    def parse(self):
        while True:
            action = self.get_action()
            if action == 'shift':
                self.shift()
            elif action[0] == 'reduce':
                self.reduce(action[1])
            elif action == 'accept':
                return True
            else:
                return False  # Error
```

The `get_action()` method determines whether to shift or reduce based on the parsing algorithm.

## Building Parse Trees

During bottom-up parsing, parse tree nodes are created during reductions:

```python
class TreeNode:
    def __init__(self, symbol, children=None):
        self.symbol = symbol
        self.children = children or []

def reduce(self, production):
    # Pop |β| symbols and their associated tree nodes
    children = []
    for _ in range(len(production.rhs)):
        children.insert(0, self.tree_stack.pop())
        self.stack.pop()

    # Create new tree node
    node = TreeNode(production.lhs, children)
    self.tree_stack.append(node)
    self.stack.append(production.lhs)
```

Terminals create leaf nodes during shifts; non-terminals create interior nodes during reductions.

## Advantages of Bottom-Up Parsing

Bottom-up parsing offers several advantages over top-down approaches:

**Grammar flexibility**: Handles left-recursive grammars naturally without transformation.

**Power**: Can parse all deterministic context-free languages (with LR parsing).

**Error detection**: Detects errors as soon as possible in left-to-right scan.

**Automation**: Well-suited for automatic parser generation.

The main drawback is complexity: bottom-up parsers are harder to understand and implement by hand than recursive descent parsers.

## Key Takeaways

- Bottom-up parsing constructs rightmost derivations in reverse, building parse trees from leaves to root
- Shift-reduce parsing uses a stack and two primary operations: shift input and reduce by productions
- A handle is a substring matching a production's right-hand side that should be reduced
- Each right-sentential form in an unambiguous grammar has exactly one handle
- Viable prefixes are stack contents that don't extend past the handle's right end
- Shift-reduce conflicts occur when both shifting and reducing seem valid
- Reduce-reduce conflicts occur when multiple productions could reduce the stack top
- Operator precedence parsing uses precedence relations to guide parsing of expressions
- Bottom-up parsing naturally handles left-recursive grammars
- Parse tree construction occurs during reductions, creating nodes for non-terminals
