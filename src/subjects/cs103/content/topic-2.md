## Topic Map

Encapsulation is about protecting valid object state behind a small public interface. Python relies on conventions and properties rather than strict private access, so judgment matters.

## Learning Objectives

- Distinguish public interface from internal implementation
- Use underscore conventions and name mangling appropriately
- Use `@property` for validation and read-only computed values
- Return defensive copies for mutable internal data
- Keep properties cheap, predictable, and free of surprising side effects

## Design Focus

Good encapsulation lets callers do useful work without giving them enough access to corrupt the object. Prefer clear methods and properties over exposing every field.
