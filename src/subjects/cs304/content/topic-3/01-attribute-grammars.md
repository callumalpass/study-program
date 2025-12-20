# Attribute Grammars

Attribute grammars extend context-free grammars by associating attributes with grammar symbols and semantic rules with productions. They provide a formal framework for specifying the static semantics of programming languages, enabling compilers to compute properties like types, values, and code generation information during parsing or in separate tree traversal passes.

## Introduction to Attributes

An attribute is a property associated with a grammar symbol. Each occurrence of a symbol in a parse tree has its own set of attribute values. Attributes can represent various semantic properties:

- **Types**: The data type of an expression
- **Values**: The computed value of a constant expression
- **Code**: Generated intermediate or target code
- **Symbol table references**: Pointers to symbol table entries
- **Memory locations**: Addresses for variables

Attributes are divided into two fundamental categories based on how their values are computed: synthesized attributes and inherited attributes.

## Synthesized Attributes

A synthesized attribute for a node in a parse tree is computed from the attribute values of its children. Synthesized attributes represent information that flows upward in the parse tree, from leaves to root. They are the most common type of attribute and correspond to bottom-up evaluation.

### Example: Expression Evaluation

Consider a simple arithmetic expression grammar with a synthesized attribute `val` that computes the numeric value:

```
E → E₁ + T    { E.val = E₁.val + T.val }
E → T         { E.val = T.val }
T → T₁ * F    { T.val = T₁.val * F.val }
T → F         { T.val = F.val }
F → (E)       { F.val = E.val }
F → digit     { F.val = digit.lexval }
```

For the expression `3 + 4 * 5`, the parse tree computes values bottom-up:
- The `digit` terminals have lexical values (3, 4, 5)
- `4 * 5` evaluates to 20
- `3 + 20` evaluates to 23

This attribute flows from children to parent at each node, making it synthesized.

### Type Synthesis

Another common use of synthesized attributes is type checking:

```
E → E₁ + E₂   { if (E₁.type == int && E₂.type == int)
                  E.type = int
                else if (E₁.type == float || E₂.type == float)
                  E.type = float
                else error() }

E → num       { E.type = int }
E → fnum      { E.type = float }
```

## Inherited Attributes

An inherited attribute for a node is computed from attributes of its parent and siblings. Inherited attributes represent information that flows downward or sideways in the parse tree. They are essential for context-dependent processing, such as propagating declaration information to use sites.

### Example: Variable Declarations

Consider a declaration grammar where types must be propagated to identifiers:

```
D → T L       { L.type = T.type }
T → int       { T.type = integer }
T → float     { T.type = real }
L → L₁, id    { L₁.type = L.type
                addType(id.entry, L.type) }
L → id        { addType(id.entry, L.type) }
```

For the declaration `int x, y, z`:
1. `T.type` is synthesized as `integer`
2. `L.type` inherits `integer` from its parent
3. This type is propagated to each identifier in the list

### Inherited Attributes for Scope

Inherited attributes naturally represent nested scoping:

```
P → D S       { S.env = D.env }
D → D₁ D₂     { D₁.env = D.env
                D₂.env = D₁.out
                D.out = D₂.out }
D → id : T    { D.out = addSymbol(D.env, id.name, T.type) }
```

The `env` attribute carries the symbol table environment downward, while `out` synthesizes the updated environment upward.

## Attribute Evaluation

The semantic rules in an attribute grammar specify dependencies between attributes. These dependencies form a semantic dependency graph that determines the evaluation order.

### Dependency Graphs

For each parse tree, we can construct a dependency graph:
- Nodes represent attribute instances
- Edges represent dependencies (if attribute A depends on attribute B, draw edge B → A)

An attribute grammar is **well-defined** if every dependency graph for every parse tree is acyclic. Cyclic dependencies indicate an error in the grammar specification.

### Evaluation Methods

**Oblivious Evaluation**: Evaluate attributes in a predetermined order based on the production, without examining actual dependencies. This works only for simple attribute grammars.

**Dynamic Evaluation**: Construct the dependency graph and use topological sorting to determine evaluation order. This handles any well-defined attribute grammar but has runtime overhead.

**Parse-tree Traversal**: For certain classes of attribute grammars, fixed traversal patterns work:
- **S-attributed grammars** (synthesized only): Single bottom-up traversal
- **L-attributed grammars**: Left-to-right, depth-first traversal

## S-Attributed Grammars

An attribute grammar is S-attributed if all attributes are synthesized. S-attributed grammars can be evaluated during bottom-up parsing, making them highly efficient.

Example implementation during LR parsing:

```python
# Value stack parallel to parsing stack
def reduce_E_plus_T():
    val_right = value_stack.pop()  # T.val
    value_stack.pop()              # + (no value)
    val_left = value_stack.pop()   # E.val
    value_stack.push(val_left + val_right)  # E.val = E₁.val + T.val
```

## L-Attributed Grammars

An attribute grammar is L-attributed if:
- All synthesized attributes (no restrictions)
- Inherited attributes of symbol X on the right side of production depend only on:
  - Inherited attributes of the left-hand side symbol
  - Attributes of symbols to the left of X in the production

L-attributed grammars can be evaluated in a single left-to-right, depth-first traversal, making them suitable for one-pass compilation.

### Translation Schemes

A translation scheme is an attribute grammar where semantic actions are embedded in the production:

```
D → T { L.type = T.type } L
T → int { T.type = integer }
T → float { T.type = real }
L → { L₁.type = L.type } L₁, id { addType(id, L.type) }
L → id { addType(id, L.type) }
```

Actions in braces execute when the parser reaches that position during a left-to-right scan.

## Multi-Pass Attribute Evaluation

Complex attribute grammars may require multiple tree traversal passes:

1. **First pass**: Collect declarations, build symbol table
2. **Second pass**: Resolve types, check semantics
3. **Third pass**: Generate code

Each pass computes certain attributes, with later passes depending on earlier results.

```python
def pass1(node):
    if node.type == "DECLARATION":
        symbol_table.insert(node.name, node.declared_type)
    for child in node.children:
        pass1(child)

def pass2(node):
    if node.type == "VARIABLE_USE":
        node.semantic_type = symbol_table.lookup(node.name).type
        if node.semantic_type is None:
            error("Undefined variable")
    for child in node.children:
        pass2(child)
```

## Practical Considerations

Modern compiler frameworks often use explicit tree traversal classes (visitors) rather than pure attribute grammars:

```java
class TypeCheckVisitor extends ASTVisitor {
    public Type visit(BinaryExpr node) {
        Type leftType = node.left.accept(this);
        Type rightType = node.right.accept(this);
        return checkBinaryOp(node.op, leftType, rightType);
    }
}
```

This approach provides more flexibility while retaining the conceptual framework of attribute evaluation.

## Key Takeaways

- Attribute grammars extend CFGs by associating semantic attributes with grammar symbols
- Synthesized attributes flow upward from children to parents (bottom-up)
- Inherited attributes flow downward from parents to children (top-down)
- S-attributed grammars (synthesized only) can be evaluated during bottom-up parsing
- L-attributed grammars support single-pass left-to-right evaluation
- Dependency graphs determine evaluation order and detect circular dependencies
- Translation schemes embed semantic actions directly in productions for one-pass compilation
- Modern compilers often use visitor patterns as a practical implementation of attribute grammar concepts
- Multiple passes may be required for complex attribute dependencies
- Attribute grammars provide a formal foundation for specifying and implementing semantic analysis
