# Logic Programming

## Foundations of Logic Programming

Logic programming represents a distinctive paradigm that views computation as automated logical inference. Rather than instructing a computer how to compute results through sequences of commands or transformations of data, logic programming involves stating facts and rules about a problem domain, then posing queries that the system answers through logical deduction. This declarative approach, rooted in mathematical logic, offers unique advantages for certain problem classes, particularly those involving symbolic reasoning, constraint satisfaction, and rule-based systems.

The theoretical foundation of logic programming lies in first-order predicate logic, a formal system for representing and reasoning about statements involving objects, properties, and relationships. In predicate logic, we can express facts like "Socrates is a man" as `man(socrates)`, and rules like "All men are mortal" as `mortal(X) :- man(X)` (read as "X is mortal if X is a man"). From such facts and rules, we can deduce new conclusions: given the above, we can infer `mortal(socrates)`.

Prolog (Programming in Logic), developed in 1972, remains the most prominent logic programming language. Prolog programs consist of clauses—facts and rules—that define relationships. Execution involves posing queries, which Prolog attempts to prove through a systematic search process called resolution with backtracking. This search mechanism distinguishes logic programming from other paradigms: rather than following a predetermined execution path, the system explores possibilities, backtracking when it reaches dead ends and trying alternative approaches.

The logic programming paradigm offers several conceptual advantages. Programs often read almost like natural language descriptions of problem domains, improving clarity and maintainability. The system automatically handles search and backtracking, eliminating the need for explicit control flow code. Solutions can be more declarative and concise than imperative equivalents. For problems naturally expressed as logical relationships—expert systems, theorem proving, scheduling, natural language processing—logic programming provides elegant solutions.

However, logic programming also presents challenges. Performance can be unpredictable, as the search process may explore many paths before finding solutions. Understanding how the system searches is crucial for writing efficient programs, somewhat undermining the declarative ideal. Debugging can be difficult since execution doesn't follow conventional sequential patterns. For these reasons, logic programming remains most valuable in specific domains rather than as a general-purpose paradigm.

## Prolog Fundamentals

Understanding logic programming requires examining Prolog's core concepts and how they combine to enable logical inference.

**Facts** represent unconditional truths about the problem domain. Facts are clauses without bodies:

```prolog
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
parent(bob, pat).
parent(pat, jim).
```

These facts state parent relationships. `parent(tom, bob)` means "Tom is a parent of Bob." Facts form the base knowledge from which rules derive additional conclusions.

**Rules** define conditional relationships, allowing inference of new facts from existing ones. A rule has a head and a body, separated by `:-` (read as "if"):

```prolog
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
```

This rule states "X is a grandparent of Z if X is a parent of Y and Y is a parent of Z." The comma represents logical AND. Given our parent facts, we can infer `grandparent(tom, ann)` because `parent(tom, bob)` and `parent(bob, ann)`.

**Queries** ask questions about the knowledge base. Queries use the same syntax as facts and rules:

```prolog
?- parent(tom, bob).
true.

?- parent(bob, tom).
false.

?- grandparent(tom, Who).
Who = ann ;
Who = pat.
```

The first query asks if Tom is Bob's parent (yes). The second asks if Bob is Tom's parent (no). The third asks who Tom is a grandparent of, and Prolog finds two answers: Ann and Pat. The semicolon requests additional solutions.

**Variables** begin with capital letters (or underscore). Prolog attempts to find bindings for variables that make queries true:

```prolog
?- parent(X, jim).
X = pat.
```

This finds who is Jim's parent. Variables can appear in any argument position:

```prolog
?- parent(tom, X).
X = bob ;
X = liz.
```

**Unification** is the process of making two terms identical by finding appropriate variable bindings. Unification underlies all Prolog computation. When processing `grandparent(tom, Who)`, Prolog unifies the query with the rule head `grandparent(X, Z)`, binding `X = tom` and `Z = Who`. It then attempts to satisfy the rule body with these bindings.

**Backtracking** occurs when Prolog explores different possibilities to satisfy queries. Consider:

```prolog
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
```

This defines ancestors recursively: X is an ancestor of Y if X is a parent of Y, or if X is a parent of some Z who is an ancestor of Y. Querying `ancestor(tom, jim)` causes Prolog to:

1. Try first clause: is `parent(tom, jim)` true? No.
2. Backtrack and try second clause: find Z where `parent(tom, Z)` (finds bob).
3. Recursively solve `ancestor(bob, jim)`.
4. This eventually succeeds, making the original query true.

Backtracking enables automatic search through solution spaces. Prolog tries clauses in the order written, and within clause bodies, satisfies goals left to right. Understanding this execution model is crucial for writing efficient Prolog programs.

**Lists** use special syntax and are fundamental data structures in Prolog:

```prolog
[1, 2, 3]              % List of three elements
[H|T]                  % List with head H and tail T
[a, b | Rest]          % List starting with a, b, followed by Rest
```

List processing exemplifies Prolog's elegance:

```prolog
% List membership
member(X, [X|_]).
member(X, [_|T]) :- member(X, T).

% List append
append([], L, L).
append([H|T1], L2, [H|T3]) :- append(T1, L2, T3).

% List length
length([], 0).
length([_|T], N) :- length(T, N1), N is N1 + 1.
```

These recursive definitions read almost like mathematical specifications. The `member` predicate says X is a member of a list if X is the head, or X is a member of the tail. The `append` predicate says appending anything to list L gives L, or appending `[H|T1]` to L2 gives `[H|T3]` where T3 is T1 appended to L2.

## Logic Programming Concepts

Beyond Prolog basics, several advanced concepts enable sophisticated logical reasoning.

**The Cut Operator** (`!`) prevents backtracking past a certain point, enabling control over search:

```prolog
max(X, Y, X) :- X >= Y, !.
max(X, Y, Y).
```

Without the cut, if `X >= Y` succeeds, Prolog might later backtrack and try the second clause. The cut commits to the first clause, improving efficiency but reducing declarativeness. Cuts should be used judiciously—overuse makes programs harder to understand and modify.

**Negation as Failure** implements negation: `\+ Goal` succeeds if Goal cannot be proven:

```prolog
not_parent(X, Y) :- \+ parent(X, Y).
```

This "closed world assumption" assumes anything not provable from the knowledge base is false. It differs from classical logic negation and can produce counterintuitive results:

```prolog
?- \+ parent(john, mary).
true.  % Succeeds because we can't prove parent(john, mary)
```

Even if John might be Mary's parent in reality, Prolog succeeds because it's not in our knowledge base.

**Constraint Logic Programming (CLP)** extends logic programming with constraint solving over specific domains (integers, reals, finite domains):

```prolog
:- use_module(library(clpfd)).

% Solve Send + More = Money puzzle
puzzle([S,E,N,D] + [M,O,R,E] = [M,O,N,E,Y]) :-
    Vars = [S,E,N,D,M,O,R,Y],
    Vars ins 0..9,
    all_different(Vars),
    S #\= 0,
    M #\= 0,
                1000*S + 100*E + 10*N + D
    +           1000*M + 100*O + 10*R + E
    #= 10000*M + 1000*O + 100*N + 10*E + Y,
    label(Vars).
```

CLP combines logical inference with efficient constraint propagation algorithms, enabling solutions to complex combinatorial problems.

**Definite Clause Grammars (DCG)** provide elegant syntax for parsing:

```prolog
sentence --> noun_phrase, verb_phrase.
noun_phrase --> determiner, noun.
verb_phrase --> verb, noun_phrase.

determiner --> [the].
determiner --> [a].
noun --> [cat].
noun --> [dog].
verb --> [chases].
verb --> [sees].
```

This grammar can parse or generate sentences:

```prolog
?- phrase(sentence, [the, cat, chases, a, dog]).
true.
```

DCGs translate to regular Prolog clauses with difference lists, but the syntax mirrors formal grammar notation, making language processing natural in Prolog.

## Applications and Practical Considerations

Logic programming excels in domains where problems naturally involve symbolic reasoning and search.

**Expert Systems** use logic programming to encode domain knowledge as rules:

```prolog
% Medical diagnosis system
diagnose(Patient, Disease) :-
    has_symptom(Patient, fever),
    has_symptom(Patient, cough),
    has_symptom(Patient, fatigue),
    \+ has_symptom(Patient, rash),
    Disease = flu.

diagnose(Patient, Disease) :-
    has_symptom(Patient, fever),
    has_symptom(Patient, rash),
    has_symptom(Patient, joint_pain),
    Disease = measles.
```

The declarative rule format makes knowledge bases easy to maintain and extend, and Prolog's inference engine automatically derives conclusions.

**Theorem Proving** leverages logic programming's foundation in formal logic. Automated theorem provers can be implemented concisely in Prolog, as the language's inference mechanism directly supports logical deduction.

**Natural Language Processing** benefits from Prolog's pattern matching and parsing capabilities. DCGs enable elegant grammar implementations, while Prolog's symbolic manipulation facilities support semantic analysis.

**Scheduling and Planning** problems, where solutions must satisfy multiple constraints, map well to constraint logic programming:

```prolog
% Schedule jobs on machines
schedule(Jobs, Schedule) :-
    % Define variables and domains
    % Add constraints (precedence, resource limits)
    % Search for satisfying assignment
    labeling([], Schedule).
```

CLP's constraint propagation prunes search spaces efficiently, finding solutions to complex scheduling problems.

**Limitations** must be acknowledged. Logic programming's execution model can be inefficient for problems requiring intensive numerical computation or inherently sequential algorithms. The gap between declarative semantics and actual execution sometimes requires understanding implementation details, undermining the paradigm's theoretical elegance. Debugging can be challenging, as execution traces through backtracking and recursion are hard to follow.

**Best Practices** for logic programming include:

1. **Think Declaratively**: Focus on describing relationships rather than computation steps. Let Prolog handle search.

2. **Order Clauses Carefully**: Prolog tries clauses in order, so place base cases before recursive cases and more specific clauses before general ones.

3. **Avoid Excessive Cuts**: While cuts improve efficiency, they reduce declarativeness. Use them for deterministic predicates but not for arbitrary control flow.

4. **Use Constraints**: For combinatorial problems, CLP is often more efficient than pure Prolog with generate-and-test.

5. **Profile and Optimize**: Understand Prolog's execution model to identify performance bottlenecks. Sometimes reordering goals or restructuring clauses dramatically improves performance.

Logic programming represents a unique paradigm with powerful abstractions for specific problem domains. While not suitable for all applications, it provides elegant solutions where symbolic reasoning, rule-based inference, and automated search are central. Understanding logic programming broadens your perspective on computation and equips you with tools for problems where other paradigms struggle.
