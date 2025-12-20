# Type Inference

Type inference is the automatic deduction of types for expressions, variables, and functions without requiring explicit type annotations. This powerful feature, pioneered by languages like ML and Haskell, provides the safety of static typing with the convenience of dynamic typing. The most widely used type inference algorithm is the Hindley-Milner (HM) type system, which can infer the most general (principal) type for any expression in a well-typed program.

## Motivation for Type Inference

Type inference offers several advantages:

- **Reduced verbosity**: Eliminates redundant type annotations
- **Maintainability**: Types automatically update when implementation changes
- **Type safety**: Provides compile-time type checking without annotation burden
- **Expressiveness**: Enables powerful generic programming without complex syntax

Example contrasting explicit and inferred types:

```haskell
-- Explicit type annotations (optional)
add :: Int -> Int -> Int
add x y = x + y

map :: (a -> b) -> [a] -> [b]
map f [] = []
map f (x:xs) = f x : map f xs

-- Inferred types (annotations not required)
length lst = if null lst then 0 else 1 + length (tail lst)
-- Inferred type: length :: [a] -> Int
```

## Type Variables and Constraints

Type inference uses type variables to represent unknown types and gathers constraints to determine concrete types.

### Type Variables

Type variables (typically written as Greek letters α, β, γ or lowercase a, b, c) represent unknown types:

```
x + 1
```

Initial type assignments:
- `x :: α` (unknown type)
- `1 :: Int`
- `(+) :: Int -> Int -> Int`
- Expression type: `β` (unknown)

Constraints generated:
- `α = Int` (from `x` being argument to `+`)
- `β = Int` (from result type of `+`)

### Type Schemes

Type schemes represent polymorphic types with universally quantified type variables:

```
∀a. a -> a           -- Identity function
∀a. [a] -> Int       -- List length function
∀a b. (a -> b) -> [a] -> [b]  -- Map function
```

Type schemes allow a single function to work with multiple types while maintaining type safety.

## Hindley-Milner Type Inference

The Hindley-Milner algorithm infers types through constraint generation and unification.

### Algorithm Overview

```
1. Generate fresh type variables for unknowns
2. Traverse the expression, generating constraints
3. Solve constraints using unification
4. Generalize the result (introduce ∀ quantifiers)
```

### Type Inference Rules

**Variables**: Look up in environment
```
Γ(x) = σ
σ' = instantiate(σ)
────────────────
Γ ⊢ x : σ'
```

**Literals**: Assign concrete types
```
Γ ⊢ 42 : Int
Γ ⊢ "hello" : String
Γ ⊢ True : Bool
```

**Lambda abstraction**: Introduce fresh type variable for parameter
```
Γ, x:α ⊢ e : β
────────────────────
Γ ⊢ (λx. e) : α → β
```

**Application**: Unify function type with argument
```
Γ ⊢ f : α
Γ ⊢ e : β
α ~ β → γ
────────────────
Γ ⊢ f e : γ
```

**Let binding**: Generalize the bound expression
```
Γ ⊢ e₁ : σ
Γ, x:gen(Γ, σ) ⊢ e₂ : τ
──────────────────────────
Γ ⊢ let x = e₁ in e₂ : τ
```

### Implementation

```python
class TypeInferencer:
    def __init__(self):
        self.constraints = []
        self.type_var_counter = 0
        self.substitution = {}

    def fresh_type_var(self):
        """Generate a fresh type variable"""
        self.type_var_counter += 1
        return TypeVar(f"t{self.type_var_counter}")

    def infer(self, expr, env):
        """Infer the type of an expression"""
        if isinstance(expr, IntLiteral):
            return IntType()

        elif isinstance(expr, BoolLiteral):
            return BoolType()

        elif isinstance(expr, Variable):
            if expr.name not in env:
                raise TypeError(f"Undefined variable: {expr.name}")
            # Instantiate type scheme with fresh type variables
            return self.instantiate(env[expr.name])

        elif isinstance(expr, Lambda):
            # λx. e
            param_type = self.fresh_type_var()
            new_env = env.copy()
            new_env[expr.param] = param_type
            body_type = self.infer(expr.body, new_env)
            return FunctionType(param_type, body_type)

        elif isinstance(expr, Application):
            # e₁ e₂
            func_type = self.infer(expr.func, env)
            arg_type = self.infer(expr.arg, env)
            result_type = self.fresh_type_var()

            # Constrain func_type to be arg_type -> result_type
            self.constraints.append(
                (func_type, FunctionType(arg_type, result_type))
            )

            return result_type

        elif isinstance(expr, Let):
            # let x = e₁ in e₂
            bound_type = self.infer(expr.value, env)

            # Solve constraints accumulated so far
            self.solve_constraints()

            # Apply current substitution
            bound_type = self.apply_substitution(bound_type)

            # Generalize the type (introduce ∀)
            type_scheme = self.generalize(env, bound_type)

            new_env = env.copy()
            new_env[expr.var] = type_scheme

            return self.infer(expr.body, new_env)

    def instantiate(self, type_scheme):
        """Replace quantified variables with fresh type variables"""
        if isinstance(type_scheme, TypeScheme):
            substitution = {}
            for var in type_scheme.quantified_vars:
                substitution[var] = self.fresh_type_var()
            return self.substitute(type_scheme.type, substitution)
        return type_scheme

    def generalize(self, env, typ):
        """Introduce ∀ quantifiers for free type variables"""
        env_free_vars = self.free_type_vars_env(env)
        type_free_vars = self.free_type_vars(typ)
        quantified = type_free_vars - env_free_vars

        if quantified:
            return TypeScheme(list(quantified), typ)
        return typ
```

## Unification

Unification finds a substitution that makes two types equal, or reports failure if no such substitution exists.

### Unification Algorithm

```python
def unify(self, t1, t2):
    """Unify two types, updating the substitution"""
    t1 = self.apply_substitution(t1)
    t2 = self.apply_substitution(t2)

    if isinstance(t1, TypeVar):
        if t1 == t2:
            return  # Same variable
        if self.occurs_in(t1, t2):
            raise TypeError(f"Infinite type: {t1} = {t2}")
        self.substitution[t1] = t2

    elif isinstance(t2, TypeVar):
        self.unify(t2, t1)  # Symmetric case

    elif isinstance(t1, IntType) and isinstance(t2, IntType):
        return  # Same concrete type

    elif isinstance(t1, BoolType) and isinstance(t2, BoolType):
        return  # Same concrete type

    elif isinstance(t1, FunctionType) and isinstance(t2, FunctionType):
        self.unify(t1.param_type, t2.param_type)
        self.unify(t1.return_type, t2.return_type)

    elif isinstance(t1, ListType) and isinstance(t2, ListType):
        self.unify(t1.element_type, t2.element_type)

    else:
        raise TypeError(f"Cannot unify {t1} and {t2}")

def occurs_in(self, var, typ):
    """Check if var occurs in typ (prevents infinite types)"""
    if var == typ:
        return True
    elif isinstance(typ, TypeVar):
        if typ in self.substitution:
            return self.occurs_in(var, self.substitution[typ])
        return False
    elif isinstance(typ, FunctionType):
        return (self.occurs_in(var, typ.param_type) or
                self.occurs_in(var, typ.return_type))
    elif isinstance(typ, ListType):
        return self.occurs_in(var, typ.element_type)
    return False

def solve_constraints(self):
    """Solve all accumulated constraints"""
    for t1, t2 in self.constraints:
        self.unify(t1, t2)
    self.constraints = []
```

### Occurs Check

The occurs check prevents infinite types:

```haskell
-- Without occurs check, this would create infinite type
-- f x = f x
-- Type: f :: t -> t where t = t -> t (infinite!)

-- With occurs check, this is rejected as a type error
```

## Type Inference Examples

### Example 1: Simple Function

```haskell
f x y = x + y
```

Inference process:
1. `x :: α`, `y :: β`, `f :: α → β → γ`
2. `(+) :: Int → Int → Int`
3. Constraint: `α = Int` (from `x` as argument to `+`)
4. Constraint: `β = Int` (from `y` as argument to `+`)
5. Constraint: `γ = Int` (from result of `+`)
6. Result: `f :: Int → Int → Int`

### Example 2: Polymorphic Function

```haskell
compose f g x = f (g x)
```

Inference:
1. `f :: α`, `g :: β`, `x :: γ`, `compose :: α → β → γ → δ`
2. `g x :: ε` (fresh variable)
3. Constraint: `β ~ γ → ε` (from `g` applied to `x`)
4. `f (g x) :: δ`
5. Constraint: `α ~ ε → δ` (from `f` applied to `g x`)
6. Solve: `g :: γ → ε`, `f :: ε → δ`
7. Result: `compose :: (ε → δ) → (γ → ε) → γ → δ`
8. Generalize: `compose :: ∀a b c. (b → c) → (a → b) → a → c`

### Example 3: Let Polymorphism

```haskell
let id = \x -> x in (id 42, id True)
```

Inference:
1. Infer `id :: α → α`
2. Generalize: `id :: ∀a. a → a`
3. Instantiate for first use: `id :: Int → Int`
4. Instantiate for second use: `id :: Bool → Bool`
5. Result: `(Int, Bool)`

Without generalization (let polymorphism), this would fail because `id` couldn't have both types.

## Extensions to Hindley-Milner

### Type Classes

Type classes add constrained polymorphism:

```haskell
-- Type class constraint
sort :: Ord a => [a] -> [a]
```

Inference tracks constraints:
```python
class ConstrainedType:
    def __init__(self, constraints, typ):
        self.constraints = constraints  # e.g., [("Ord", a)]
        self.typ = typ
```

### Rank-N Types

Higher-rank types allow quantification in positions other than the top level:

```haskell
-- Rank-2 type (quantifier in argument position)
runST :: (forall s. ST s a) -> a
```

Rank-N types require type annotations; full inference is undecidable.

### Local Type Inference

Modern languages (TypeScript, Scala, Rust) use local type inference:
- Infer within function bodies
- Require annotations at function signatures
- More predictable error messages
- Easier incremental compilation

```rust
// Signature annotation required
fn map<A, B, F>(f: F, list: Vec<A>) -> Vec<B>
    where F: Fn(A) -> B
{
    // Local type inference within function body
    let mut result = Vec::new();  // Type inferred
    for x in list {
        let y = f(x);  // Types inferred
        result.push(y);
    }
    result
}
```

## Practical Considerations

### Error Messages

Type inference errors can be cryptic:

```python
def report_type_error(self, expected, actual, expr):
    # Apply substitution to get concrete types
    expected = self.apply_substitution(expected)
    actual = self.apply_substitution(actual)

    # Generate helpful message
    message = f"Type error in expression: {expr}\n"
    message += f"  Expected type: {self.prettify(expected)}\n"
    message += f"  Actual type:   {self.prettify(actual)}\n"

    # Show inference trace for debugging
    if self.debug_mode:
        message += f"\nInference trace:\n"
        message += self.format_trace()

    raise TypeError(message)
```

### Performance Optimization

Large programs can have expensive inference:

- **Constraint batching**: Solve constraints periodically
- **Type caching**: Cache inferred types for repeated subexpressions
- **Incremental inference**: Re-infer only modified functions
- **Constraint simplification**: Simplify constraints before solving

```python
def infer_cached(self, expr, env):
    cache_key = (id(expr), frozenset(env.items()))

    if cache_key in self.cache:
        return self.instantiate(self.cache[cache_key])

    typ = self.infer(expr, env)
    self.cache[cache_key] = self.generalize(env, typ)
    return typ
```

## Key Takeaways

- Type inference automatically deduces types without explicit annotations
- Hindley-Milner type inference computes the most general (principal) type for expressions
- Type variables represent unknown types; constraints specify relationships between types
- Unification solves constraints by finding substitutions that make types equal
- The occurs check prevents infinite types during unification
- Let polymorphism allows a single definition to be used at multiple types through generalization
- Type schemes with universal quantification (∀) represent polymorphic types
- Modern inference systems often use local inference requiring signatures but inferring bodies
- Type classes extend HM with constrained polymorphism
- Practical implementations must balance expressiveness, inference complexity, and error message quality

