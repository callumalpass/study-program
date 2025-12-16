# Lambda Calculus

Lambda calculus is the theoretical foundation of functional programming. Developed by Alonzo Church in the 1930s, this simple formal system captures the essence of computation through function abstraction and application. Understanding lambda calculus provides deep insight into how functional languages work.

## Syntax of Lambda Calculus

Lambda calculus has just three constructs:

```
e ::= x           -- Variable
    | λx.e        -- Abstraction (function definition)
    | e e         -- Application (function call)
```

That's it. No numbers, no conditionals, no loops—just variables, functions, and function application. Yet this minimal language is Turing-complete.

### Examples

```
-- Identity function: takes x, returns x
λx.x

-- Constant function: ignores second argument
λx.λy.x

-- Self-application
λx.x x

-- Function application
(λx.x) y    -- Applies identity to y
```

## Bound and Free Variables

A variable is **bound** if it appears within the scope of a lambda that binds it:

```
λx. x y
    ^ ^
    | |
    | free (y is not bound by any λ)
    bound (x is bound by λx)
```

A variable is **free** if it's not bound:

```
FV(x) = {x}
FV(λx.e) = FV(e) - {x}
FV(e₁ e₂) = FV(e₁) ∪ FV(e₂)
```

### Alpha Equivalence

Terms that differ only in the names of bound variables are considered equivalent:

```
λx.x ≡α λy.y ≡α λz.z    -- All represent identity

-- But be careful:
λx.λy.x ≢α λy.λy.y      -- Different behavior!
```

## Beta Reduction

The fundamental computation rule: applying a function substitutes the argument for the parameter:

```
(λx.e₁) e₂ →β e₁[x := e₂]

-- Example:
(λx.x x) y →β y y

(λx.λy.x) a b →β (λy.a) b →β a
```

### Capture-Avoiding Substitution

We must be careful not to capture free variables:

```
-- Wrong:
(λx.λy.x) y →β λy.y    -- WRONG! y got captured

-- Right (rename bound variable first):
(λx.λy.x) y →β (λx.λz.x) y →β λz.y   -- Correct!
```

### Reduction Strategies

Multiple redexes (reducible expressions) may exist. Strategy determines which to reduce:

```
-- Expression with multiple redexes
(λx.x) ((λy.y) z)
    ↓          ↓
  outer      inner
  redex      redex
```

**Normal Order**: Reduce leftmost outermost redex first (lazy evaluation)
**Applicative Order**: Reduce leftmost innermost redex first (eager evaluation)

```
-- Normal order
(λx.x) ((λy.y) z) →β (λy.y) z →β z

-- Applicative order
(λx.x) ((λy.y) z) →β (λx.x) z →β z
```

## Church Encoding

Despite having only functions, we can encode any data.

### Booleans

```
TRUE  = λt.λf.t    -- Returns first argument
FALSE = λt.λf.f    -- Returns second argument

-- If-then-else is just function application
IF = λb.λt.λe.b t e

IF TRUE a b →β a
IF FALSE a b →β b
```

### Boolean Operations

```
AND = λa.λb.a b FALSE
OR  = λa.λb.a TRUE b
NOT = λb.b FALSE TRUE

-- Verify:
AND TRUE TRUE →β TRUE TRUE FALSE →β TRUE
AND TRUE FALSE →β TRUE FALSE FALSE →β FALSE
```

### Church Numerals

Natural numbers as higher-order functions:

```
0 = λf.λx.x           -- Apply f zero times
1 = λf.λx.f x         -- Apply f once
2 = λf.λx.f (f x)     -- Apply f twice
3 = λf.λx.f (f (f x)) -- Apply f three times
n = λf.λx.fⁿ x        -- Apply f n times
```

### Arithmetic

```
SUCC = λn.λf.λx.f (n f x)    -- Add one more application

ADD = λm.λn.λf.λx.m f (n f x)  -- m applications then n applications
-- or equivalently:
ADD = λm.λn.m SUCC n            -- Apply SUCC m times to n

MULT = λm.λn.λf.m (n f)        -- Apply (n f) m times
-- or:
MULT = λm.λn.m (ADD n) 0       -- Add n, m times
```

### Pairs

```
PAIR = λx.λy.λf.f x y    -- Constructor
FST  = λp.p TRUE         -- First projection
SND  = λp.p FALSE        -- Second projection

-- Verify:
FST (PAIR a b) →β (λp.p TRUE) (λf.f a b)
              →β (λf.f a b) TRUE
              →β TRUE a b
              →β a
```

### Lists

```
NIL  = λc.λn.n
CONS = λh.λt.λc.λn.c h (t c n)

-- List [1, 2, 3]:
CONS 1 (CONS 2 (CONS 3 NIL))
```

## The Y Combinator: Recursion

Lambda calculus has no built-in recursion, but we can encode it:

```
Y = λf.(λx.f (x x)) (λx.f (x x))

-- Key property: Y F = F (Y F)
-- This creates "infinite unfolding" enabling recursion
```

### Factorial with Y

```
FACT = Y (λf.λn.IF (ISZERO n)
                   1
                   (MULT n (f (PRED n))))

-- FACT 3 reduces to 6 (eventually!)
```

### Call-by-Value Y (Z Combinator)

For strict evaluation, we need a different fixed-point combinator:

```
Z = λf.(λx.f (λy.x x y)) (λx.f (λy.x x y))
```

## Typed Lambda Calculus

Adding types constrains which terms are valid:

### Simply Typed Lambda Calculus

```
Types:  T ::= Base | T → T

Typing rules:
           x : T ∈ Γ
          ─────────── (Var)
           Γ ⊢ x : T

         Γ, x:T₁ ⊢ e : T₂
        ─────────────────── (Abs)
        Γ ⊢ λx:T₁.e : T₁→T₂

        Γ ⊢ e₁ : T₁→T₂   Γ ⊢ e₂ : T₁
        ────────────────────────────── (App)
              Γ ⊢ e₁ e₂ : T₂
```

### Type Safety

Typed lambda calculus has strong normalization: every well-typed term eventually reduces to a normal form. This means:
- No infinite loops in simply typed lambda calculus
- But also: Y combinator is not typeable!

### System F (Polymorphic Lambda Calculus)

Adding type abstraction and application:

```
T ::= α | T → T | ∀α.T

e ::= x | λx:T.e | e e | Λα.e | e [T]

-- Polymorphic identity:
id = Λα.λx:α.x

id [Int] 5 →β (λx:Int.x) 5 →β 5
```

## Normal Forms

An expression is in **normal form** if no beta reduction is possible:

```
-- Normal forms:
λx.x
λx.y x
x y

-- Not normal forms (contain redexes):
(λx.x) y
(λx.x x) (λy.y)
```

### Head Normal Form

A weaker notion: the outermost structure is determined:

```
-- Head normal form:
λx.(λy.y) x    -- Outermost is lambda, inner redex OK
x y ((λz.z) w) -- Outermost is application with variable

-- Not head normal form:
(λx.x) y       -- Outermost is a redex
```

## Connection to Functional Programming

Lambda calculus directly corresponds to FP features:

```haskell
-- Haskell                   -- Lambda calculus
\x -> x                      -- λx.x
\x -> \y -> x                -- λx.λy.x
f x                          -- f x
let x = e1 in e2             -- (λx.e2) e1
```

## Key Takeaways

- Lambda calculus has just three constructs: variables, abstraction, application
- Beta reduction is the fundamental computation mechanism
- Free and bound variables must be handled carefully
- Church encodings represent data as functions
- The Y combinator enables recursion without built-in recursion
- Types can be added to restrict valid programs
- Simply typed lambda calculus is strongly normalizing
- System F adds polymorphism
- Lambda calculus is the theoretical foundation of functional programming

Lambda calculus may seem abstract, but it provides the conceptual tools to understand functional programming deeply. Every time you write a lambda expression, you're directly using Church's formalism from 1936.
