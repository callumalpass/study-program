import { Exam } from '../../../core/types';

export const cs304Exams: Exam[] = [
  {
    id: 'cs304-exam-midterm',
    subjectId: 'cs304',
    title: 'CS304 Midterm Exam',
    durationMinutes: 90,
    instructions: [
      'Answer all questions.',
      'Show your work for partial credit.',
      'No notes or electronic devices allowed.',
      'Grammar notation: A → α means production from A to α.',
      'You may use standard compiler terminology without definition.'
    ],
    questions: [
      // Lexical Analysis Questions (8)
      {
        id: 'cs304-mid-q1',
        type: 'multiple_choice',
        prompt: 'Which compiler phase converts source code characters into tokens?',
        options: ['Parser', 'Lexical analyzer', 'Semantic analyzer', 'Code generator'],
        correctAnswer: 1,
        explanation: 'The lexical analyzer (scanner) breaks source code into tokens.'
      },
      {
        id: 'cs304-mid-q2',
        type: 'multiple_choice',
        prompt: 'What regular expression matches valid C identifiers (starting with letter or underscore)?',
        options: ['[a-zA-Z_][a-zA-Z0-9_]*', '[a-zA-Z][a-zA-Z0-9]*', '[a-zA-Z_]+', '[a-z_][a-z0-9_]+'],
        correctAnswer: 0,
        explanation: 'C identifiers start with a letter or underscore, followed by zero or more letters, digits, or underscores.'
      },
      {
        id: 'cs304-mid-q3',
        type: 'written',
        prompt: 'Explain the difference between a DFA and an NFA. Why can every NFA be converted to an equivalent DFA?',
        correctAnswer: 'A DFA has exactly one transition for each symbol from each state, while an NFA can have multiple transitions or epsilon transitions. Every NFA can be converted to a DFA using subset construction because both recognize the same class of languages (regular languages). The DFA states correspond to sets of NFA states.',
        explanation: 'DFAs and NFAs have equivalent expressive power despite different operational models.'
      },
      {
        id: 'cs304-mid-q4',
        type: 'multiple_choice',
        prompt: 'What is the maximal munch rule in lexical analysis?',
        options: ['Prefer shorter tokens', 'Prefer the longest possible token match', 'Prefer alphabetically first tokens', 'Match one character at a time'],
        correctAnswer: 1,
        explanation: 'Maximal munch means the scanner should match the longest possible token.'
      },
      {
        id: 'cs304-mid-q5',
        type: 'coding',
        prompt: 'Write a Python function that tokenizes a simple arithmetic expression into NUMBER, PLUS, MINUS, TIMES, DIVIDE, LPAREN, and RPAREN tokens.',
        correctAnswer: `def tokenize(expr):
    tokens = []
    i = 0
    while i < len(expr):
        if expr[i].isspace():
            i += 1
        elif expr[i].isdigit():
            j = i
            while j < len(expr) and expr[j].isdigit():
                j += 1
            tokens.append(('NUMBER', expr[i:j]))
            i = j
        elif expr[i] == '+':
            tokens.append(('PLUS', '+'))
            i += 1
        elif expr[i] == '-':
            tokens.append(('MINUS', '-'))
            i += 1
        elif expr[i] == '*':
            tokens.append(('TIMES', '*'))
            i += 1
        elif expr[i] == '/':
            tokens.append(('DIVIDE', '/'))
            i += 1
        elif expr[i] == '(':
            tokens.append(('LPAREN', '('))
            i += 1
        elif expr[i] == ')':
            tokens.append(('RPAREN', ')'))
            i += 1
        else:
            raise ValueError(f"Unknown character: {expr[i]}")
    return tokens`,
        explanation: 'A simple tokenizer processes input character by character, building tokens.'
      },
      {
        id: 'cs304-mid-q6',
        type: 'written',
        prompt: 'What tool generates scanners from regular expression specifications? Describe the typical workflow.',
        correctAnswer: 'Lex (or flex) generates scanners from regular expression specifications. The workflow: (1) Write a .l file with patterns and actions, (2) Run lex/flex to generate C code, (3) Compile the generated code with your compiler. Patterns are matched using maximal munch, with earlier patterns having priority for ties.',
        explanation: 'Scanner generators automate the creation of lexical analyzers from declarative specifications.'
      },
      {
        id: 'cs304-mid-q7',
        type: 'multiple_choice',
        prompt: 'What is an epsilon (ε) transition in an NFA?',
        options: ['A transition consuming any character', 'A transition without consuming input', 'An error transition', 'A final state transition'],
        correctAnswer: 1,
        explanation: 'Epsilon transitions allow state changes without consuming input.'
      },
      {
        id: 'cs304-mid-q8',
        type: 'written',
        prompt: 'Describe panic mode error recovery in lexical analysis.',
        correctAnswer: 'Panic mode error recovery discards characters from the input until a character that can begin a valid token is found. This allows scanning to continue and potentially find more errors. The scanner reports an error for the skipped characters.',
        explanation: 'Panic mode provides simple but effective error recovery in scanning.'
      },
      // Syntax Analysis Questions (10)
      {
        id: 'cs304-mid-q9',
        type: 'multiple_choice',
        prompt: 'In a context-free grammar, what appears on the left side of each production?',
        options: ['A terminal', 'A single non-terminal', 'Any string', 'Multiple symbols'],
        correctAnswer: 1,
        explanation: 'CFG productions have exactly one non-terminal on the left side.'
      },
      {
        id: 'cs304-mid-q10',
        type: 'written',
        prompt: 'Given the grammar: E → E + T | T, T → T * F | F, F → (E) | id. Show the leftmost derivation for "id + id * id".',
        correctAnswer: 'E ⇒ E + T ⇒ T + T ⇒ F + T ⇒ id + T ⇒ id + T * F ⇒ id + F * F ⇒ id + id * F ⇒ id + id * id',
        explanation: 'Leftmost derivation always expands the leftmost non-terminal first.'
      },
      {
        id: 'cs304-mid-q11',
        type: 'multiple_choice',
        prompt: 'What is an ambiguous grammar?',
        options: ['A grammar with syntax errors', 'A grammar producing multiple parse trees for some string', 'A grammar with no valid derivations', 'A grammar with left recursion'],
        correctAnswer: 1,
        explanation: 'Ambiguous grammars can produce more than one parse tree for the same input.'
      },
      {
        id: 'cs304-mid-q12',
        type: 'written',
        prompt: 'Explain why left recursion is problematic for top-down parsers and how to eliminate it.',
        correctAnswer: 'Left recursion (A → Aα) causes recursive descent parsers to enter infinite loops without consuming input. To eliminate it, replace A → Aα | β with A → βA\' and A\' → αA\' | ε. This converts left recursion to right recursion.',
        explanation: 'Left recursion elimination is essential for LL parsing.'
      },
      {
        id: 'cs304-mid-q13',
        type: 'multiple_choice',
        prompt: 'What does LL(1) mean?',
        options: ['Left-to-right, Leftmost, 1 lookahead', 'Left recursion, Linear, 1 pass', 'Low latency, 1 phase', 'Lexical, Logical, 1 table'],
        correctAnswer: 0,
        explanation: 'LL(1): scan Left-to-right, Leftmost derivation, 1 token lookahead.'
      },
      {
        id: 'cs304-mid-q14',
        type: 'written',
        prompt: 'Define FIRST and FOLLOW sets. What are they used for in LL(1) parsing?',
        correctAnswer: 'FIRST(α) is the set of terminals that can begin strings derived from α. FOLLOW(A) is the set of terminals that can appear immediately after A in some derivation. They are used to build LL(1) parse tables: use FIRST to select productions, use FOLLOW when a production can derive ε.',
        explanation: 'FIRST and FOLLOW sets determine parsing decisions in LL(1).'
      },
      {
        id: 'cs304-mid-q15',
        type: 'multiple_choice',
        prompt: 'What are the two main actions in shift-reduce parsing?',
        options: ['Push and pop', 'Shift (push) and reduce (apply production)', 'Read and write', 'Accept and reject'],
        correctAnswer: 1,
        explanation: 'Shift pushes a token; reduce applies a production in reverse.'
      },
      {
        id: 'cs304-mid-q16',
        type: 'written',
        prompt: 'What is a shift-reduce conflict? Give an example situation.',
        correctAnswer: 'A shift-reduce conflict occurs when the parser cannot decide whether to shift the next input symbol or reduce the current stack contents. Example: in "if E then S else S", after parsing "if E then S" with "else" as lookahead, the parser could shift "else" or reduce "if E then S" to S (dangling else problem).',
        explanation: 'Conflicts indicate grammar ambiguity or parser limitations.'
      },
      {
        id: 'cs304-mid-q17',
        type: 'multiple_choice',
        prompt: 'Which parser generator produces LALR(1) parsers?',
        options: ['lex', 'flex', 'yacc/bison', 'gcc'],
        correctAnswer: 2,
        explanation: 'Yacc and bison generate LALR(1) parsers from grammar specifications.'
      },
      {
        id: 'cs304-mid-q18',
        type: 'multiple_choice',
        prompt: 'Which is more powerful: LL(1) or LR(1)?',
        options: ['LL(1)', 'LR(1)', 'They are equivalent', 'Depends on the grammar'],
        correctAnswer: 1,
        explanation: 'LR(1) can handle a strictly larger class of grammars than LL(1).'
      },
      // Semantic Analysis Questions (8)
      {
        id: 'cs304-mid-q19',
        type: 'multiple_choice',
        prompt: 'What is a synthesized attribute in an attribute grammar?',
        options: ['Computed from parent', 'Computed from children', 'Always constant', 'Inherited from grammar'],
        correctAnswer: 1,
        explanation: 'Synthesized attributes flow up the parse tree from children to parent.'
      },
      {
        id: 'cs304-mid-q20',
        type: 'written',
        prompt: 'What is the purpose of a symbol table? What information does it typically store?',
        correctAnswer: 'A symbol table maps identifiers to their attributes. It typically stores: name, type, scope level, memory location/offset, whether it\'s a constant, function parameter information, and array dimensions. It supports operations like insert, lookup, and scope management.',
        explanation: 'Symbol tables are central to semantic analysis and code generation.'
      },
      {
        id: 'cs304-mid-q21',
        type: 'multiple_choice',
        prompt: 'What is structural type equivalence?',
        options: ['Types equal if same name', 'Types equal if same structure', 'Types equal if declared together', 'All types are equivalent'],
        correctAnswer: 1,
        explanation: 'Structural equivalence compares type structure, not names.'
      },
      {
        id: 'cs304-mid-q22',
        type: 'written',
        prompt: 'Explain the difference between static and dynamic scoping with an example.',
        correctAnswer: 'Static (lexical) scoping resolves names based on program text structure—a name refers to the nearest enclosing declaration. Dynamic scoping resolves based on runtime call stack. Example: if main() calls f() which references x, static scoping uses x from f\'s lexical scope, dynamic scoping uses x from the most recent caller that defined x.',
        explanation: 'Most modern languages use static scoping for predictability.'
      },
      {
        id: 'cs304-mid-q23',
        type: 'multiple_choice',
        prompt: 'What is type coercion?',
        options: ['Type error detection', 'Implicit type conversion', 'Type declaration', 'Type inheritance'],
        correctAnswer: 1,
        explanation: 'Type coercion automatically converts between compatible types.'
      },
      {
        id: 'cs304-mid-q24',
        type: 'written',
        prompt: 'Describe the unification algorithm used in type inference.',
        correctAnswer: 'Unification finds a substitution making two types equal. Algorithm: (1) If both are the same type variable or same base type, succeed. (2) If one is a type variable, substitute it with the other (occurs check prevents infinite types). (3) If both are constructed types with same constructor, recursively unify components. (4) Otherwise fail.',
        explanation: 'Unification is central to Hindley-Milner type inference.'
      },
      {
        id: 'cs304-mid-q25',
        type: 'multiple_choice',
        prompt: 'What is the difference between a parse tree and an AST?',
        options: ['Same thing', 'AST omits syntactic sugar', 'Parse tree is smaller', 'AST is for parsing'],
        correctAnswer: 1,
        explanation: 'ASTs abstract away syntactic details present in parse trees.'
      },
      {
        id: 'cs304-mid-q26',
        type: 'coding',
        prompt: 'Write a Python class representing a simple symbol table with insert and lookup methods supporting scopes.',
        correctAnswer: `class SymbolTable:
    def __init__(self):
        self.scopes = [{}]  # Stack of scopes

    def enter_scope(self):
        self.scopes.append({})

    def exit_scope(self):
        if len(self.scopes) > 1:
            self.scopes.pop()

    def insert(self, name, info):
        self.scopes[-1][name] = info

    def lookup(self, name):
        for scope in reversed(self.scopes):
            if name in scope:
                return scope[name]
        return None`,
        explanation: 'A scoped symbol table uses a stack of hash tables for nested scopes.'
      }
    ]
  },
  {
    id: 'cs304-exam-final',
    subjectId: 'cs304',
    title: 'CS304 Final Exam',
    durationMinutes: 180,
    instructions: [
      'Answer all questions.',
      'This is a comprehensive exam covering all course material.',
      'Show your work for partial credit.',
      'No notes or electronic devices allowed.',
      'Time management: ~4 minutes per question.'
    ],
    questions: [
      // IR Questions (8)
      {
        id: 'cs304-final-q1',
        type: 'multiple_choice',
        prompt: 'Why do compilers use intermediate representations?',
        options: ['To slow compilation', 'To decouple front-end from back-end', 'Required by standards', 'To increase code size'],
        correctAnswer: 1,
        explanation: 'IRs enable front-end/back-end separation and machine-independent optimization.'
      },
      {
        id: 'cs304-final-q2',
        type: 'written',
        prompt: 'Convert the expression "a = b + c * d" into three-address code.',
        correctAnswer: 't1 = c * d\nt2 = b + t1\na = t2',
        explanation: 'Three-address code has at most one operator per instruction.'
      },
      {
        id: 'cs304-final-q3',
        type: 'multiple_choice',
        prompt: 'What is a basic block?',
        options: ['Any code block', 'Maximal straight-line code with one entry/exit', 'A function', 'A loop body'],
        correctAnswer: 1,
        explanation: 'Basic blocks have no internal branches except at entry and exit.'
      },
      {
        id: 'cs304-final-q4',
        type: 'written',
        prompt: 'Explain Static Single Assignment (SSA) form and phi functions.',
        correctAnswer: 'In SSA, each variable is assigned exactly once in the program text. Phi functions (φ) merge values at control flow join points—φ(x1, x2) selects x1 if arriving from predecessor 1, x2 if from predecessor 2. SSA simplifies optimization by making def-use chains explicit.',
        explanation: 'SSA is widely used in modern compilers for optimization.'
      },
      {
        id: 'cs304-final-q5',
        type: 'multiple_choice',
        prompt: 'Where are phi functions placed in SSA construction?',
        options: ['Everywhere', 'At dominance frontiers', 'Only at loop headers', 'At function entries'],
        correctAnswer: 1,
        explanation: 'Phi functions are placed at dominance frontiers of variable definitions.'
      },
      {
        id: 'cs304-final-q6',
        type: 'written',
        prompt: 'What is a dominator in a control flow graph? Define immediate dominator.',
        correctAnswer: 'Node A dominates node B if every path from the entry to B goes through A. The immediate dominator of B is the unique node that dominates B and is dominated by all other dominators of B (the closest dominator).',
        explanation: 'Dominance is fundamental to SSA construction and loop analysis.'
      },
      {
        id: 'cs304-final-q7',
        type: 'multiple_choice',
        prompt: 'What is LLVM IR?',
        options: ['A hardware language', 'A typed SSA-based IR', 'A virtual machine', 'An assembly language'],
        correctAnswer: 1,
        explanation: 'LLVM IR is a typed SSA-based IR used in the LLVM compiler infrastructure.'
      },
      {
        id: 'cs304-final-q8',
        type: 'written',
        prompt: 'Explain the difference between high-level and low-level IR.',
        correctAnswer: 'High-level IR preserves source-like constructs (loops, arrays, objects) for high-level optimizations. Low-level IR is closer to machine code with explicit registers, addresses, and simple operations. Many compilers use both, progressively lowering the representation.',
        explanation: 'Multiple IR levels enable optimizations at different abstraction levels.'
      },
      // Code Generation Questions (10)
      {
        id: 'cs304-final-q9',
        type: 'multiple_choice',
        prompt: 'What is instruction selection?',
        options: ['Removing instructions', 'Mapping IR to machine instructions', 'Choosing algorithms', 'Register allocation'],
        correctAnswer: 1,
        explanation: 'Instruction selection chooses machine instructions to implement IR operations.'
      },
      {
        id: 'cs304-final-q10',
        type: 'written',
        prompt: 'Describe the graph coloring approach to register allocation.',
        correctAnswer: 'Build an interference graph where nodes are live ranges and edges connect simultaneously live variables. Color the graph with k colors (registers). If coloring fails, spill a variable to memory and retry. Two non-interfering live ranges can share a register (same color).',
        explanation: 'Graph coloring is a classic approach to register allocation.'
      },
      {
        id: 'cs304-final-q11',
        type: 'multiple_choice',
        prompt: 'What is spilling in register allocation?',
        options: ['Memory leak', 'Storing values to memory when registers exhausted', 'Register overflow', 'Data loss'],
        correctAnswer: 1,
        explanation: 'Spilling stores values to memory when registers are insufficient.'
      },
      {
        id: 'cs304-final-q12',
        type: 'written',
        prompt: 'What is an activation record (stack frame)? What does it typically contain?',
        correctAnswer: 'An activation record is the memory allocated on the stack for a function invocation. It typically contains: return address, saved registers (callee-saved), frame pointer, local variables, temporaries, and space for outgoing arguments. The layout depends on the calling convention.',
        explanation: 'Activation records support function calls and local storage.'
      },
      {
        id: 'cs304-final-q13',
        type: 'multiple_choice',
        prompt: 'What are caller-saved vs callee-saved registers?',
        options: ['Same thing', 'Caller preserves caller-saved; callee preserves callee-saved', 'For input vs output', 'For integers vs floats'],
        correctAnswer: 1,
        explanation: 'The responsibility for preserving register values differs by convention.'
      },
      {
        id: 'cs304-final-q14',
        type: 'written',
        prompt: 'Explain instruction scheduling. Why is it important for modern processors?',
        correctAnswer: 'Instruction scheduling reorders instructions to improve performance while preserving semantics. It minimizes pipeline stalls by separating dependent instructions, fills delay slots, and improves instruction-level parallelism. Important for modern pipelined/superscalar processors where latencies and hazards affect performance.',
        explanation: 'Good scheduling significantly impacts performance on modern CPUs.'
      },
      {
        id: 'cs304-final-q15',
        type: 'multiple_choice',
        prompt: 'What is the ELF format?',
        options: ['A fantasy creature', 'Executable and Linkable Format', 'A compiler', 'A virtual machine'],
        correctAnswer: 1,
        explanation: 'ELF is the standard object file format on Unix/Linux systems.'
      },
      {
        id: 'cs304-final-q16',
        type: 'written',
        prompt: 'Describe the maximal munch (greedy) instruction selection algorithm.',
        correctAnswer: 'Starting from the root of an IR tree, find the largest pattern (tile) that matches. Replace the matched subtree with a single node representing the instruction. Repeat recursively on remaining nodes. Greedy selection is fast but may not find optimal tilings.',
        explanation: 'Maximal munch is simple but effective for instruction selection.'
      },
      {
        id: 'cs304-final-q17',
        type: 'multiple_choice',
        prompt: 'What is linear scan register allocation?',
        options: ['Scanning registers', 'Faster alternative to graph coloring', 'Sequential allocation', 'Linear search'],
        correctAnswer: 1,
        explanation: 'Linear scan processes live intervals in order, trading optimality for speed.'
      },
      {
        id: 'cs304-final-q18',
        type: 'written',
        prompt: 'What is a calling convention? Give examples of what it specifies.',
        correctAnswer: 'A calling convention specifies how functions pass parameters and return values. It defines: which registers hold arguments (e.g., first 6 in rdi, rsi, rdx, rcx, r8, r9 on x86-64), where the return value goes (rax), which registers are caller/callee-saved, stack alignment requirements, and how variadic functions work.',
        explanation: 'Calling conventions enable interoperability between compiled code.'
      },
      // Optimization Questions (10)
      {
        id: 'cs304-final-q19',
        type: 'multiple_choice',
        prompt: 'What is constant folding?',
        options: ['Folding code', 'Compile-time evaluation of constants', 'Reducing constants', 'Removing constants'],
        correctAnswer: 1,
        explanation: 'Constant folding evaluates constant expressions at compile time.'
      },
      {
        id: 'cs304-final-q20',
        type: 'written',
        prompt: 'Explain common subexpression elimination (CSE) with an example.',
        correctAnswer: 'CSE identifies expressions computed multiple times and reuses the first result. Example: "a = b + c; d = b + c" becomes "t = b + c; a = t; d = t". The expression "b + c" is computed once and reused, reducing computation.',
        explanation: 'CSE eliminates redundant computations.'
      },
      {
        id: 'cs304-final-q21',
        type: 'multiple_choice',
        prompt: 'What is dead code elimination?',
        options: ['Removing syntax errors', 'Removing unreachable or unused code', 'Removing comments', 'Removing old code'],
        correctAnswer: 1,
        explanation: 'Dead code elimination removes code whose results are never used.'
      },
      {
        id: 'cs304-final-q22',
        type: 'written',
        prompt: 'Describe loop invariant code motion and give an example.',
        correctAnswer: 'Loop invariant code motion moves computations that produce the same result every iteration outside the loop. Example: "for i: x = y + z; a[i] = x * i" becomes "x = y + z; for i: a[i] = x * i". The computation "y + z" is hoisted before the loop.',
        explanation: 'Moving invariant code out of loops reduces redundant computation.'
      },
      {
        id: 'cs304-final-q23',
        type: 'multiple_choice',
        prompt: 'What is an induction variable?',
        options: ['Loop counter', 'Variable changing by constant each iteration', 'Initialized variable', 'Global variable'],
        correctAnswer: 1,
        explanation: 'Induction variables change by a constant (or linear function) each iteration.'
      },
      {
        id: 'cs304-final-q24',
        type: 'written',
        prompt: 'Explain reaching definitions analysis. Is it a forward or backward analysis?',
        correctAnswer: 'Reaching definitions determines which definitions (assignments) might reach each program point without being killed (overwritten). It is a forward analysis—information flows from program entry toward exit. A definition d reaches point p if there is a path from d to p with no redefinition of the same variable.',
        explanation: 'Reaching definitions enables optimizations like constant propagation.'
      },
      {
        id: 'cs304-final-q25',
        type: 'multiple_choice',
        prompt: 'What is loop unrolling?',
        options: ['Removing loops', 'Replicating loop body to reduce overhead', 'Flattening loops', 'Reversing loops'],
        correctAnswer: 1,
        explanation: 'Loop unrolling duplicates the body to reduce branch overhead.'
      },
      {
        id: 'cs304-final-q26',
        type: 'written',
        prompt: 'What is alias analysis? Why is it difficult?',
        correctAnswer: 'Alias analysis determines when two pointer expressions may refer to the same memory location. It is difficult because: (1) pointers can point anywhere, (2) precise analysis is undecidable in general, (3) arrays and pointer arithmetic complicate analysis, (4) function pointers and callbacks add uncertainty. Compilers use conservative approximations.',
        explanation: 'Alias analysis is essential for optimizing code with pointers.'
      },
      {
        id: 'cs304-final-q27',
        type: 'coding',
        prompt: 'Write a Python function that performs constant folding on a simple expression tree.',
        correctAnswer: `def constant_fold(node):
    if node['type'] == 'num':
        return node
    elif node['type'] == 'binop':
        left = constant_fold(node['left'])
        right = constant_fold(node['right'])
        if left['type'] == 'num' and right['type'] == 'num':
            op = node['op']
            if op == '+':
                return {'type': 'num', 'value': left['value'] + right['value']}
            elif op == '*':
                return {'type': 'num', 'value': left['value'] * right['value']}
        return {'type': 'binop', 'op': node['op'], 'left': left, 'right': right}
    return node`,
        explanation: 'Constant folding recursively evaluates constant subexpressions.'
      },
      {
        id: 'cs304-final-q28',
        type: 'multiple_choice',
        prompt: 'What is strength reduction?',
        options: ['Weakening code', 'Replacing expensive ops with cheaper ones', 'Reducing variables', 'Loop removal'],
        correctAnswer: 1,
        explanation: 'Strength reduction replaces expensive operations with equivalent cheaper ones.'
      },
      // Runtime Systems Questions (14)
      {
        id: 'cs304-final-q29',
        type: 'multiple_choice',
        prompt: 'What is the heap used for?',
        options: ['Function calls', 'Dynamic allocation with programmer-controlled lifetime', 'Local variables', 'Constants'],
        correctAnswer: 1,
        explanation: 'The heap stores dynamically allocated data with controlled lifetime.'
      },
      {
        id: 'cs304-final-q30',
        type: 'written',
        prompt: 'Describe the mark-sweep garbage collection algorithm.',
        correctAnswer: 'Mark phase: Starting from roots (global variables, stack, registers), traverse reachable objects and mark them. Sweep phase: Scan the entire heap; free unmarked objects and clear marks on marked objects. Advantages: handles cycles, no copying. Disadvantages: fragmentation, stop-the-world pause, touches all memory.',
        explanation: 'Mark-sweep is a fundamental GC algorithm.'
      },
      {
        id: 'cs304-final-q31',
        type: 'multiple_choice',
        prompt: 'What problem does copying garbage collection solve compared to mark-sweep?',
        options: ['Speed', 'Fragmentation by compacting live objects', 'Memory usage', 'Cycles'],
        correctAnswer: 1,
        explanation: 'Copying GC compacts memory by copying all live objects contiguously.'
      },
      {
        id: 'cs304-final-q32',
        type: 'written',
        prompt: 'Explain generational garbage collection and the generational hypothesis.',
        correctAnswer: 'The generational hypothesis states that most objects die young. Generational GC divides the heap into generations (young, old). Young generation is collected frequently (minor GC) since most objects there are garbage. Objects surviving multiple collections are promoted to older generations, collected less frequently (major GC). This reduces GC overhead.',
        explanation: 'Generational GC exploits object lifetime patterns for efficiency.'
      },
      {
        id: 'cs304-final-q33',
        type: 'multiple_choice',
        prompt: 'What is reference counting?',
        options: ['Counting references in code', 'Tracking object reference counts for GC', 'Counting variables', 'Memory counting'],
        correctAnswer: 1,
        explanation: 'Reference counting tracks how many references point to each object.'
      },
      {
        id: 'cs304-final-q34',
        type: 'written',
        prompt: 'What is the main limitation of reference counting? How can it be addressed?',
        correctAnswer: 'Reference counting cannot reclaim cyclic garbage—objects in a cycle keep each other alive even if unreachable from roots. Solutions: (1) Use a backup tracing collector to find cycles periodically, (2) Use weak references to break cycles, (3) Require programmers to break cycles manually.',
        explanation: 'Cycles are the fundamental limitation of reference counting.'
      },
      {
        id: 'cs304-final-q35',
        type: 'multiple_choice',
        prompt: 'What is a stack-based virtual machine?',
        options: ['VM with hardware stacks', 'VM using operand stack instead of registers', 'VM for stack languages', 'VM with call stack'],
        correctAnswer: 1,
        explanation: 'Stack-based VMs use an operand stack for computation (e.g., JVM).'
      },
      {
        id: 'cs304-final-q36',
        type: 'written',
        prompt: 'Explain JIT (Just-In-Time) compilation. What are its advantages over interpretation and AOT compilation?',
        correctAnswer: 'JIT compiles bytecode to native code at runtime. Advantages over interpretation: native code runs faster. Advantages over AOT: can use runtime information for optimization (profile-guided), supports dynamic languages, and generates code for the exact hardware. Disadvantages: compilation overhead at runtime, memory for compiled code.',
        explanation: 'JIT combines interpretation flexibility with native performance.'
      },
      {
        id: 'cs304-final-q37',
        type: 'multiple_choice',
        prompt: 'What is a tracing JIT?',
        options: ['Debugging JIT', 'JIT that compiles hot execution paths', 'JIT with logging', 'Sequential JIT'],
        correctAnswer: 1,
        explanation: 'Tracing JITs record and compile frequently executed paths (traces).'
      },
      {
        id: 'cs304-final-q38',
        type: 'written',
        prompt: 'What is the linker responsible for? Describe static vs dynamic linking.',
        correctAnswer: 'The linker combines object files into an executable, resolving symbol references and performing relocation. Static linking copies library code into the executable at link time. Dynamic linking defers library resolution to runtime (load time or lazy), allowing shared libraries and smaller executables.',
        explanation: 'Linking completes the translation from source to executable.'
      },
      {
        id: 'cs304-final-q39',
        type: 'multiple_choice',
        prompt: 'What is position-independent code (PIC)?',
        options: ['Portable code', 'Code executing correctly at any address', 'Optimized code', 'Relocatable code'],
        correctAnswer: 1,
        explanation: 'PIC executes correctly regardless of its load address.'
      },
      {
        id: 'cs304-final-q40',
        type: 'written',
        prompt: 'Explain how exception handling is typically implemented in compiled code.',
        correctAnswer: 'Two main approaches: (1) Setjmp/longjmp: save registers at try, restore on throw—simple but expensive even without exceptions. (2) Table-driven: compiler generates tables mapping PC ranges to handlers; runtime looks up handler on exception—zero cost if no exception, but complex lookup on throw. Modern compilers prefer table-driven for zero-cost normal execution.',
        explanation: 'Exception handling requires compiler and runtime cooperation.'
      },
      {
        id: 'cs304-final-q41',
        type: 'multiple_choice',
        prompt: 'What is the Global Offset Table (GOT)?',
        options: ['Function table', 'Table for position-independent global access', 'Hash table', 'Symbol table'],
        correctAnswer: 1,
        explanation: 'GOT enables PIC to access global data through indirection.'
      },
      {
        id: 'cs304-final-q42',
        type: 'written',
        prompt: 'Describe tiered compilation as used in modern JVMs.',
        correctAnswer: 'Tiered compilation uses multiple compilation levels. Cold code runs interpreted or with quick, simple compilation. As methods get hotter (executed more), they are recompiled with more aggressive optimization. HotSpot uses: interpreter → C1 (client compiler, fast but less optimized) → C2 (server compiler, slower but highly optimized). This balances startup time with peak performance.',
        explanation: 'Tiered compilation optimizes both startup and peak performance.'
      }
    ]
  }
];
