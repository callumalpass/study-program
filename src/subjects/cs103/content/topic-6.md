## Topic Map

Abstraction lets code depend on what an object can do instead of exactly what class it is. Python supports this through abstract base classes, protocols, duck typing, and careful API design.

## Learning Objectives

- Define contracts with ABCs and `@abstractmethod`
- Use protocols for structural typing and typed duck typing
- Apply template methods when subclasses fill in stable algorithm steps
- Keep interfaces small enough that implementers do not need meaningless stubs
- Decide when a concrete class is simpler than an abstraction

## Design Focus

An abstraction should buy flexibility or clarity. If there is only one implementation and no design pressure yet, a concrete class may be the better starting point.
