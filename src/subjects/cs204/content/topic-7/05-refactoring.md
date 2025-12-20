# Refactoring

Refactoring is the practice of improving the internal structure of code without changing its external behavior. This disciplined technique for restructuring code makes systems more maintainable, understandable, and extensible while preserving functionality. Martin Fowler's seminal work on refactoring established it as a fundamental practice in modern software development.

## Understanding Refactoring

Refactoring is not simply rewriting code or making arbitrary changes. It is a structured process of making small, behavior-preserving transformations that incrementally improve code design. Each refactoring step maintains the code's functionality while improving its structure.

### What Refactoring Is Not

**Refactoring is not debugging.** When you fix a bug, you change behavior. When you refactor, you preserve behavior. These are distinct activities, though they often work together. You might refactor to make a bug more obvious, then fix it, then refactor again to prevent similar bugs.

**Refactoring is not optimization.** Performance optimization often makes code less readable in pursuit of speed. Refactoring prioritizes clarity and maintainability. Interestingly, well-refactored code sometimes performs better because clear structure makes optimization opportunities more visible.

**Refactoring is not adding features.** When refactoring, you are explicitly not adding functionality. You might refactor to make adding a feature easier, but the refactoring itself does not change what the system does.

### The Two Hats

Kent Beck describes programming as wearing two hats: adding functionality and refactoring. When adding functionality, you should not be refactoring. When refactoring, you should not be adding functionality. Switching between these hats consciously helps maintain discipline.

This separation has practical benefits. When adding functionality, you can feel good about making the code messier if necessary to get the feature working. You will clean it up when you switch to your refactoring hat. When refactoring, you can focus entirely on structure without worrying about new requirements.

## Why Refactor

Software naturally degrades over time. As developers add features, fix bugs, and work under time pressure, design quality erodes. Code becomes harder to understand and modify. Refactoring counteracts this entropy.

### Improving Design

Code design degrades as people make changes without fully understanding the original design or architecture. Short-term expedient changes accumulate into long-term structural problems. Regular refactoring prevents this decay.

Good design makes changes easy. When adding a new feature requires extensive modifications across the codebase, the design may need improvement. Refactoring can restructure code so that the new feature fits naturally.

### Making Code Easier to Understand

Code is read far more often than it is written. Time spent making code clear pays dividends every time someone reads it. Refactoring improves clarity by:
- Eliminating confusing constructs
- Extracting complex logic into well-named methods
- Removing duplication that obscures intent
- Making implicit concepts explicit

When you find yourself struggling to understand code, refactor it to be clearer. Your future self and teammates will thank you.

### Finding Bugs

The process of refactoring often reveals bugs. As you reorganize code and understand it more deeply, logic errors and edge cases become apparent. Clearer code makes bugs easier to spot.

Sometimes refactoring makes bugs easier to fix by making the code's structure clearer. A bug that is obscured by tangled logic becomes obvious once the code is reorganized.

### Programming Faster

This seems counterintuitive: how does spending time refactoring make you faster? The answer lies in economics. Poor code structure is technical debt that slows future development. Time spent refactoring is an investment that pays returns through faster feature development.

Without refactoring, adding features takes progressively longer as the code becomes more tangled. With refactoring, you maintain a sustainable pace. The upfront investment in refactoring pays for itself many times over.

## Code Smells

Code smells are surface indications that suggest deeper problems in the code. The term, coined by Kent Beck and popularized by Martin Fowler, describes patterns that often indicate opportunities for refactoring.

### Bloaters

**Long Method**: Methods that have grown too long are hard to understand and maintain. Long methods often do too many things and mix abstraction levels.

**Large Class**: Classes that try to do too much become difficult to understand and maintain. They often have too many instance variables and methods.

**Primitive Obsession**: Using primitive types instead of small objects for simple tasks. For example, using separate strings for street, city, and state instead of an Address object.

**Long Parameter List**: Methods with many parameters are hard to understand and call. They often indicate that the method is doing too much or that data should be grouped into objects.

**Data Clumps**: Groups of data that appear together repeatedly. If you always pass the same three parameters together, they should probably be an object.

### Object-Orientation Abusers

**Switch Statements**: Large switch statements or chains of conditionals based on type codes often indicate missing polymorphism. Object-oriented languages provide better mechanisms for handling type variation.

**Temporary Field**: Objects with fields that are only set in certain circumstances are confusing. Readers expect all fields to be used consistently.

**Refused Bequest**: Subclasses that use only a fraction of their parent class's interface suggest problematic inheritance hierarchies.

### Change Preventers

**Divergent Change**: When one class is commonly changed in different ways for different reasons, it probably has too many responsibilities. Each class should have one reason to change.

**Shotgun Surgery**: When making a change requires many small modifications across multiple classes, responsibilities may be poorly distributed. Related code should be together.

**Parallel Inheritance Hierarchies**: When you create a subclass in one hierarchy and must create a matching subclass in another hierarchy, the hierarchies are probably too tightly coupled.

### Dispensables

**Comments**: Comments are not inherently bad, but they often indicate that code needs refactoring. If code requires extensive comments to explain what it does, it is probably too complex.

**Duplicate Code**: The same or very similar code appearing in multiple places makes maintenance harder. Changes must be made in multiple locations, increasing the chance of errors.

**Dead Code**: Code that is never executed creates confusion and maintenance burden. Remove it. Version control preserves it if you need it later.

**Speculative Generality**: Code that exists only because someone thought it might be needed in the future. If it is not needed now, remove it.

### Couplers

**Feature Envy**: Methods that seem more interested in other classes than their own class. If a method extensively uses data or methods from another class, it might belong in that other class.

**Inappropriate Intimacy**: Classes that spend too much time examining each other's private details are too tightly coupled. They should maintain better boundaries.

**Message Chains**: Long chains of method calls like `a.getB().getC().getD()` create tight coupling. Changes in intermediate classes ripple through the chain.

**Middle Man**: Classes that do nothing but delegate to other classes may be unnecessary. If a class's main purpose is forwarding calls, why does it exist?

## Common Refactoring Techniques

Fowler's catalog describes dozens of specific refactoring techniques. Here are some of the most common and valuable.

### Extract Method

**Problem**: You have a code fragment that can be grouped together.

**Solution**: Turn the fragment into a method whose name explains its purpose.

```java
// Before
void printOwing() {
    printBanner();

    // print details
    System.out.println("name: " + name);
    System.out.println("amount: " + getOutstanding());
}

// After
void printOwing() {
    printBanner();
    printDetails(getOutstanding());
}

void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

Extract Method is perhaps the most important refactoring. It improves clarity by giving code fragments meaningful names and reduces duplication.

### Inline Method

**Problem**: A method body is as clear as its name.

**Solution**: Replace calls to the method with the method body and delete the method.

This is the opposite of Extract Method. Sometimes intermediate methods obscure rather than clarify, especially when they are very simple.

### Rename Variable/Method/Class

**Problem**: A name does not clearly communicate intent.

**Solution**: Change it to a better name.

Good names are crucial for understandable code. Do not hesitate to rename when you find a better name. Modern IDEs make renaming safe and easy.

### Extract Variable

**Problem**: You have a complex expression.

**Solution**: Place the result of the expression in a variable with a name that explains the purpose.

```java
// Before
if ((platform.toUpperCase().indexOf("MAC") > -1) &&
    (browser.toUpperCase().indexOf("IE") > -1) &&
    wasInitialized() && resize > 0) {
    // do something
}

// After
final boolean isMacOS = platform.toUpperCase().indexOf("MAC") > -1;
final boolean isIEBrowser = browser.toUpperCase().indexOf("IE") > -1;
final boolean wasResized = resize > 0;

if (isMacOS && isIEBrowser && wasInitialized() && wasResized) {
    // do something
}
```

### Replace Temp with Query

**Problem**: You are using a temporary variable to hold the result of an expression.

**Solution**: Extract the expression into a method and replace all references to the temp with the method.

This refactoring is often a precursor to Extract Method, making it easier to extract code that uses the temporary variable.

### Decompose Conditional

**Problem**: You have a complex conditional (if-then-else) statement.

**Solution**: Extract methods from the condition, then part, and else part.

```java
// Before
if (date.before(SUMMER_START) || date.after(SUMMER_END)) {
    charge = quantity * winterRate + winterServiceCharge;
} else {
    charge = quantity * summerRate;
}

// After
if (notSummer(date)) {
    charge = winterCharge(quantity);
} else {
    charge = summerCharge(quantity);
}
```

### Replace Conditional with Polymorphism

**Problem**: You have a conditional that chooses different behavior depending on object type.

**Solution**: Move each leg of the conditional to an overriding method in a subclass. Make the original method abstract.

This is a powerful technique for eliminating complex switch statements and type-based conditionals.

### Extract Class

**Problem**: One class is doing work that should be done by two.

**Solution**: Create a new class and move the relevant fields and methods to it.

Classes grow over time as responsibilities are added. Extracting classes keeps them focused and manageable.

### Inline Class

**Problem**: A class is not doing very much.

**Solution**: Move all its features into another class and delete it.

Sometimes classes become too small or their responsibility gets absorbed elsewhere. Inline them to reduce unnecessary complexity.

### Move Method/Field

**Problem**: A method or field is used more by another class than the class it is defined in.

**Solution**: Create a new method or field in the class that uses it most, and move the code there.

## When to Refactor

### The Rule of Three

The first time you do something, just do it. The second time you do something similar, notice the duplication but proceed. The third time you do something similar, refactor.

This rule prevents premature abstraction while ensuring you refactor when patterns emerge.

### When Adding a Feature

Refactor first to make adding the feature easier. Improve the structure so the new feature fits naturally, then add the feature, then refactor again to incorporate the new code cleanly.

### When Fixing a Bug

Refactor to make the bug obvious, fix it, then refactor to prevent similar bugs. Often bugs hide in complex, tangled code. Refactoring exposes them.

### During Code Review

Code reviews are excellent opportunities to identify refactoring needs. When reviewers struggle to understand code, that is a clear signal to refactor.

### As You Read Code

When reading code, if you find it hard to understand, refactor it. The next person who reads it will benefit from your effort.

## When Not to Refactor

### When Code Does Not Work

Get it working first, then refactor. Refactoring preserves behavior, so you need working behavior to preserve.

### When It Is Easier to Rewrite

Sometimes code is so tangled that refactoring is more expensive than rewriting. This is rare, but it happens. However, be cautious: rewrites are often more expensive than anticipated.

### Close to a Deadline

When deadlines loom, refactoring may have to wait. However, this is a short-term compromise. The debt accumulated by skipping refactoring will slow future work.

## Refactoring Safely

Refactoring without tests is dangerous. Comprehensive automated tests provide a safety net that catches when refactoring accidentally changes behavior.

The refactoring process typically follows this rhythm:
1. Ensure tests are comprehensive and passing
2. Make a small refactoring change
3. Run tests to verify behavior is preserved
4. Commit the change
5. Repeat

Small steps are key. Make one refactoring at a time, verify it with tests, then proceed. If tests fail, you know exactly what caused the problem because you changed only one thing.

Modern IDEs provide automated refactoring tools that safely perform common refactorings. Use them. They handle details that humans might miss.

## Refactoring and Performance

A common objection to refactoring is performance concerns. Well-factored code with many small methods might seem slower than monolithic methods.

In practice, this rarely matters. Modern compilers and runtime systems optimize well-structured code effectively. Performance problems usually arise from algorithmic issues, not method call overhead.

The refactoring approach to performance is:
1. Write clear, well-structured code
2. Measure performance
3. If there are problems, profile to find hotspots
4. Optimize the specific hotspots
5. Measure again to verify improvement

Well-refactored code actually makes optimization easier because clear structure makes hotspots more visible and isolated code easier to optimize.

## Conclusion

Refactoring is not optional maintenance work to be done "when there is time." It is an integral part of development that should happen continuously. Every time you understand code better, every time you add a feature, every time you fix a bug, refactor to leave the code better than you found it.

The boy scout rule applies: always leave the code cleaner than you found it. These small, continuous improvements compound over time into significant quality gains. Teams that refactor regularly maintain healthy codebases. Teams that neglect refactoring gradually accumulate technical debt until development grinds to a halt.
