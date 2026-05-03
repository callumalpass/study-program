## Topic Map

Inheritance models substitutable "is-a" relationships. It is useful, but it is not the default tool for reuse. This topic focuses on inheritance mechanics and the design pressure that tells you when not to use it.

## Learning Objectives

- Create subclasses and override behavior safely
- Use `super()` and understand method resolution order
- Explain substitutability and common LSP violations
- Use abstract base classes when a required subclass contract is useful
- Choose composition when inheritance would create a fragile hierarchy

## Design Focus

Before adding a subclass, ask whether every instance of the child can honestly be used wherever the parent is expected. If not, the model probably needs composition or a smaller interface.
