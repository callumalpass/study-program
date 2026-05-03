## Topic Map

Polymorphism lets code depend on behavior instead of concrete types. In Python, that can come from inheritance, duck typing, special methods, or protocols.

## Learning Objectives

- Write functions that work with any object exposing the needed behavior
- Replace type-check chains with polymorphic method calls
- Use operator overloading only when the operator meaning stays intuitive
- Apply duck typing and protocols where explicit inheritance is unnecessary
- Keep polymorphic contracts small and easy to satisfy

## Design Focus

Polymorphism is valuable when it removes coupling. The goal is not to hide every type; it is to let new behavior be added without editing stable calling code.
