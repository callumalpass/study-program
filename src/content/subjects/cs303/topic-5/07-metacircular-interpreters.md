# Metacircular Interpreters

A metacircular interpreter is an interpreter for a language written in that same language. While this might seem circular or even paradoxical, metacircular interpreters are powerful tools for understanding language semantics, exploring language design, and implementing language features. They reveal deep insights about computation and self-reference.

## What Makes an Interpreter Metacircular?

An interpreter is metacircular when the implementation language and the interpreted language are the same (or closely related). The most famous example is the Lisp interpreter written in Lisp, presented in the seminal 1960 paper "Recursive Functions of Symbolic Expressions and Their Computation by Machine" by John McCarthy.

At first glance, this seems useless - if you already have a working Lisp to run the interpreter, why do you need another Lisp interpreter? However, metacircular interpreters serve several crucial purposes:

**Semantic Definition**: They precisely define language semantics using the language itself, serving as executable specifications. The SICP (Structure and Interpretation of Computer Programs) textbook uses this approach to teach programming language concepts.

**Language Extension**: You can modify the interpreter to add new features, experiment with alternative semantics, or implement domain-specific languages while leveraging the host language's infrastructure.

**Understanding**: Writing a metacircular interpreter deepens understanding of both the language and computation itself. It reveals which features are primitive and which are derived.

**Bootstrapping**: Many compilers are eventually self-hosting (written in their own language). Metacircular interpreters are a step toward self-hosting.

## A Minimal Lisp Interpreter in Lisp

Let's examine a classic metacircular Lisp interpreter. We'll implement a subset of Scheme in Scheme:

```scheme
(define (eval exp env)
  (cond
    ; Self-evaluating expressions
    ((number? exp) exp)
    ((boolean? exp) exp)
    ((string? exp) exp)

    ; Variable lookup
    ((symbol? exp)
     (lookup-variable exp env))

    ; Special forms
    ((quoted? exp)
     (text-of-quotation exp))

    ((assignment? exp)
     (eval-assignment exp env))

    ((definition? exp)
     (eval-definition exp env))

    ((if? exp)
     (eval-if exp env))

    ((lambda? exp)
     (make-procedure (lambda-parameters exp)
                     (lambda-body exp)
                     env))

    ((begin? exp)
     (eval-sequence (begin-actions exp) env))

    ; Function application
    ((application? exp)
     (apply (eval (operator exp) env)
            (list-of-values (operands exp) env)))

    (else
     (error "Unknown expression type" exp))))
```

The `apply` function handles function application:

```scheme
(define (apply procedure arguments)
  (cond
    ; Primitive procedures (built into host language)
    ((primitive-procedure? procedure)
     (apply-primitive-procedure procedure arguments))

    ; Compound procedures (defined in interpreted language)
    ((compound-procedure? procedure)
     (eval-sequence
      (procedure-body procedure)
      (extend-environment
       (procedure-parameters procedure)
       arguments
       (procedure-environment procedure))))

    (else
     (error "Unknown procedure type" procedure))))
```

This interpreter demonstrates the eval-apply cycle that's central to language implementation:
- `eval` analyzes expressions and reduces them to values
- `apply` performs function application
- They call each other recursively

## The Bootstrap Problem

How do we run a metacircular interpreter if we need the language to run it? This is the bootstrap problem, and there are several solutions:

**Start with a Different Language**: Implement a basic interpreter in a different language (often C or assembly), then use that to run the metacircular interpreter.

**Successive Refinement**: Start with a very simple interpreter in a low-level language, use it to run a better interpreter, and continue until you reach the desired language.

**Cross-Compilation**: If you have an existing implementation on one platform, use it to generate code for a new platform, then run the metacircular interpreter there.

Many languages follow this path:
1. Write minimal interpreter in C
2. Write better interpreter in the language itself
3. Eventually write compiler in the language (self-hosting)

The C compiler, for instance, has been self-hosting since the 1970s - it's written in C and compiled by itself.

## Implementing Language Features

Metacircular interpreters elegantly implement language features by mapping them to host language features:

**Closures**:
```scheme
(define (make-procedure parameters body env)
  (list 'procedure parameters body env))

(define (procedure-parameters p) (cadr p))
(define (procedure-body p) (caddr p))
(define (procedure-environment p) (cadddr p))
```

The interpreted language's closures are represented as lists in the host language, but they capture environments just like host closures.

**Environments**:
```scheme
(define (make-frame variables values)
  (cons variables values))

(define (extend-environment vars vals base-env)
  (cons (make-frame vars vals) base-env))

(define (lookup-variable var env)
  (define (scan vars vals)
    (cond ((null? vars)
           (lookup-variable var (cdr env)))
          ((eq? var (car vars))
           (car vals))
          (else (scan (cdr vars) (cdr vals)))))

  (if (null? env)
      (error "Unbound variable" var)
      (let ((frame (car env)))
        (scan (car frame) (cdr frame)))))
```

This implements the environment model using host language data structures.

**Special Forms**:
```scheme
; if is a special form - don't evaluate all branches
(define (eval-if exp env)
  (if (true? (eval (if-predicate exp) env))
      (eval (if-consequent exp) env)
      (eval (if-alternative exp) env)))

; lambda is a special form - don't evaluate body yet
(define (eval-lambda exp env)
  (make-procedure (lambda-parameters exp)
                  (lambda-body exp)
                  env))
```

Special forms must be recognized and handled specially by `eval` - they can't be ordinary functions because they need control over evaluation of their arguments.

## Modifying Semantics

The power of metacircular interpreters is that we can modify them to explore alternative semantics:

**Adding Lazy Evaluation**:
```scheme
(define (eval exp env)
  (cond
    ; ... other cases ...

    ((application? exp)
     (apply (actual-value (operator exp) env)
            (operands exp)  ; Don't evaluate yet!
            env))))

(define (apply procedure arguments env)
  (cond
    ((primitive-procedure? procedure)
     ; Primitives need actual values
     (apply-primitive-procedure
      procedure
      (map (lambda (arg) (actual-value arg env)) arguments)))

    ((compound-procedure? procedure)
     ; Delay argument evaluation
     (eval-sequence
      (procedure-body procedure)
      (extend-environment
       (procedure-parameters procedure)
       (map (lambda (arg) (delay-it arg env)) arguments)
       (procedure-environment procedure))))))

(define (actual-value exp env)
  (force-it (eval exp env)))

(define (delay-it exp env)
  (list 'thunk exp env))

(define (force-it obj)
  (if (thunk? obj)
      (actual-value (thunk-exp obj) (thunk-env obj))
      obj))
```

With these changes, we've implemented lazy evaluation - arguments are only evaluated when their values are actually needed.

**Adding Memoization**:
```scheme
(define (force-it obj)
  (cond ((thunk? obj)
         (let ((result (actual-value (thunk-exp obj)
                                     (thunk-env obj))))
           (set-car! obj 'evaluated-thunk)
           (set-car! (cdr obj) result)
           result))
        ((evaluated-thunk? obj)
         (thunk-value obj))
        (else obj)))
```

Now we've implemented call-by-need semantics like Haskell's.

## Analyzing Interpreter: Separating Analysis from Execution

Standard metacircular interpreters analyze and execute simultaneously. We can separate these phases for efficiency:

```scheme
(define (eval exp env)
  ((analyze exp) env))

(define (analyze exp)
  (cond ((self-evaluating? exp)
         (lambda (env) exp))

        ((variable? exp)
         (lambda (env) (lookup-variable exp env)))

        ((quoted? exp)
         (let ((qval (text-of-quotation exp)))
           (lambda (env) qval)))

        ((assignment? exp)
         (analyze-assignment exp))

        ((definition? exp)
         (analyze-definition exp))

        ((if? exp)
         (analyze-if exp))

        ((lambda? exp)
         (analyze-lambda exp))

        ((begin? exp)
         (analyze-sequence (begin-actions exp)))

        ((application? exp)
         (analyze-application exp))

        (else
         (error "Unknown expression type" exp))))
```

The `analyze` function processes syntax once, returning an execution procedure. For example:

```scheme
(define (analyze-if exp)
  (let ((pproc (analyze (if-predicate exp)))
        (cproc (analyze (if-consequent exp)))
        (aproc (analyze (if-alternative exp))))
    (lambda (env)
      (if (true? (pproc env))
          (cproc env)
          (aproc env)))))
```

Analysis happens once at "compile time", generating an execution procedure. The execution procedure can be called many times efficiently without re-analyzing the syntax.

This is a step toward compilation - we're transforming the source representation into a more efficient form.

## From Interpreter to Compiler

Metacircular interpreters naturally evolve toward compilers. Instead of returning execution procedures, we can return compiled code:

```scheme
(define (compile exp target linkage)
  (cond ((self-evaluating? exp)
         (compile-self-evaluating exp target linkage))

        ((variable? exp)
         (compile-variable exp target linkage))

        ; ... other cases ...

        ((application? exp)
         (compile-application exp target linkage))))
```

This `compile` function generates instruction sequences for a virtual machine or real processor. The metacircular interpreter has become a metacircular compiler.

## Towers of Interpreters

We can run interpreters on top of interpreters, creating towers:

```
Interpreter Level 3 (running in Level 2)
Interpreter Level 2 (running in Level 1)
Interpreter Level 1 (running in Level 0)
Machine Level 0 (hardware)
```

Each level interprets the level above it. Surprisingly, this doesn't have to be infinitely slow! With JIT compilation and clever optimization, towers can achieve reasonable performance.

This concept appears in:
- **Virtual machines**: JVM running on hardware
- **Emulators**: Game console emulator running in OS
- **Security sandboxes**: Untrusted code in sandboxed interpreter

## Reflective Towers and Meta-Object Protocols

Metacircular interpreters enable reflection - programs examining and modifying themselves:

```scheme
(define (reify continuation)
  ; Turn control state into data
  (make-continuation continuation))

(define (reflect continuation)
  ; Turn data into control state
  (invoke-continuation continuation))
```

Meta-object protocols (MOPs) use this idea to make language implementation customizable. CLOS (Common Lisp Object System) lets you customize:
- Method dispatch
- Class instantiation
- Slot access

All by modifying the metacircular object system.

## Practical Applications

Despite seeming academic, metacircular interpreters have practical applications:

**Teaching**: SICP uses them to teach core CS concepts
**Language Experimentation**: Quickly prototype language features
**DSLs**: Implement domain-specific languages embedded in host language
**Debugging**: Instrument the interpreter to trace execution
**Security**: Sandbox untrusted code with modified semantics
**Testing**: Create mock environments for testing

Modern languages like JavaScript have multiple implementations, including metacircular ones that modify semantics for specific purposes (like Babel for transpilation or debugging frameworks).

Metacircular interpreters reveal the beautiful self-referential nature of computation, showing that languages can understand themselves and that the boundary between language and meta-language is fluid and explorable.
