---
title: "Logic Introduction"
slug: "logic-introduction"
description: "Introduction to knowledge representation, declarative vs procedural knowledge, and knowledge-based agents"
---

# Logic Introduction

Knowledge representation and reasoning form the foundation of intelligent systems that can make logical decisions, answer questions, and solve problems based on what they know about the world. This approach stands in contrast to purely reactive or statistical AI systems, offering a structured, interpretable way to encode expertise and perform reasoning.

## Knowledge-Based Agents

A knowledge-based agent operates by maintaining an internal representation of the world in the form of sentences in a knowledge representation language. The agent's behavior is determined by its knowledge base (KB), which contains everything the agent knows about the world, and an inference engine that derives new knowledge from existing knowledge.

The typical architecture of a knowledge-based agent involves:

1. **Knowledge Base (KB)**: A set of sentences representing facts about the world
2. **Inference Engine**: Mechanisms for deriving new sentences from the KB
3. **Tell/Ask Interface**: Methods for adding knowledge and querying the KB

The Tell/Ask interface provides two fundamental operations:
- **Tell**: Adds new sentences to the knowledge base
- **Ask**: Queries the knowledge base to determine what follows from what is known

Here's a simple Python implementation of a basic knowledge-based agent:

```python
class KnowledgeBase:
    def __init__(self):
        self.facts = set()
        self.rules = []

    def tell(self, sentence):
        """Add a sentence to the knowledge base"""
        if isinstance(sentence, str):
            self.facts.add(sentence)
        elif isinstance(sentence, tuple):  # (premise, conclusion)
            self.rules.append(sentence)

    def ask(self, query):
        """Query the knowledge base"""
        # Direct fact lookup
        if query in self.facts:
            return True

        # Simple forward chaining
        for premise, conclusion in self.rules:
            if premise in self.facts and conclusion == query:
                return True

        return False

# Example usage
kb = KnowledgeBase()
kb.tell("It is raining")
kb.tell(("It is raining", "The ground is wet"))

print(kb.ask("It is raining"))  # True
print(kb.ask("The ground is wet"))  # True
print(kb.ask("The sun is shining"))  # False
```

## Declarative vs Procedural Knowledge

A fundamental distinction in knowledge representation is between declarative and procedural knowledge.

### Declarative Knowledge

Declarative knowledge represents "what is true" about the world. It consists of facts and relationships expressed as sentences in a formal language. The key advantage of declarative knowledge is the separation between knowledge and inference:

- **Knowledge**: What the world is like (domain-specific)
- **Inference**: How to derive new knowledge (domain-independent)

Example declarative statements:
- "All humans are mortal"
- "Socrates is a human"
- "2 + 2 = 4"

### Procedural Knowledge

Procedural knowledge represents "how to do things" through algorithms and procedures. Traditional programming embeds knowledge implicitly in the control flow of the program.

```python
# Procedural approach
def is_ground_wet():
    if is_raining():
        return True
    if sprinkler_is_on():
        return True
    return False

# Declarative approach
kb = KnowledgeBase()
kb.tell("raining → ground_wet")
kb.tell("sprinkler_on → ground_wet")
result = kb.ask("ground_wet")
```

The declarative approach offers several advantages:
1. **Modularity**: Facts can be added independently
2. **Transparency**: Knowledge is explicitly represented and inspectable
3. **Flexibility**: The same knowledge can be used for different reasoning tasks
4. **Maintainability**: Easier to update and extend

## The Wumpus World Example

The Wumpus World is a classic AI problem that illustrates knowledge representation and reasoning. It's a cave consisting of rooms connected by passageways. The agent explores this world to find gold while avoiding deadly pits and the Wumpus (a monster).

### World Properties:
- **Grid**: 4x4 grid of rooms
- **Agent**: Starts in square [1,1], facing right
- **Gold**: Located in one square
- **Wumpus**: Monster in one square (causes death if entered)
- **Pits**: Located in some squares (cause death if entered)

### Percepts:
- **Stench**: In squares adjacent to the Wumpus
- **Breeze**: In squares adjacent to a pit
- **Glitter**: In the square with gold
- **Bump**: When walking into a wall
- **Scream**: When the Wumpus is killed

### Knowledge Representation in Wumpus World

The agent can use logic to represent what it knows:

```python
class WumpusKB:
    def __init__(self):
        self.percepts = []
        self.visited = set()
        self.safe_squares = {(1, 1)}  # Starting square is safe
        self.wumpus_possible = set()
        self.pit_possible = set()

    def tell_percept(self, location, percept):
        """Record a percept at a location"""
        self.percepts.append((location, percept))
        self.visited.add(location)

        x, y = location
        adjacent = [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]

        if "Breeze" not in percept:
            # No breeze means adjacent squares have no pits
            for adj in adjacent:
                self.safe_squares.add(adj)
        else:
            # Breeze means at least one adjacent square has a pit
            for adj in adjacent:
                if adj not in self.visited:
                    self.pit_possible.add(adj)

        if "Stench" not in percept:
            # No stench means adjacent squares don't have Wumpus
            for adj in adjacent:
                self.safe_squares.add(adj)

    def ask_safe(self, location):
        """Is this location safe?"""
        return (location in self.safe_squares and
                location not in self.pit_possible and
                location not in self.wumpus_possible)

# Example usage
wumpus_kb = WumpusKB()
wumpus_kb.tell_percept((1, 1), [])  # No percepts
wumpus_kb.tell_percept((1, 2), ["Breeze"])

print(wumpus_kb.ask_safe((1, 3)))  # Need more information
print(wumpus_kb.ask_safe((2, 1)))  # Safe (no breeze at start)
```

## Logic as a Knowledge Representation Language

Logic provides a formal language for representing knowledge with well-defined syntax (structure) and semantics (meaning). The advantages of using logic include:

1. **Compositionality**: Meaning of sentences is determined by parts and combination rules
2. **Context Independence**: Sentences have meaning independent of their use
3. **Monotonicity**: Adding knowledge doesn't invalidate previous conclusions (in classical logic)
4. **Formal Proof Theory**: Mechanical procedures for deriving conclusions

## Key Takeaways

1. **Knowledge-based agents** maintain explicit representations of the world and use reasoning to determine actions
2. **Tell/Ask interface** provides a clean separation between knowledge acquisition and query answering
3. **Declarative knowledge** separates what is true from how to use it, enabling more flexible and maintainable systems
4. **Procedural knowledge** embeds knowledge in algorithms, which can be less transparent but more efficient
5. **Logic** provides a formal foundation for knowledge representation with clear semantics and inference mechanisms
6. **Wumpus World** demonstrates how an agent can use logical reasoning to make safe decisions in an uncertain environment
7. The choice of representation language involves trade-offs between **expressiveness**, **computational efficiency**, and **ease of use**

Understanding these foundational concepts is essential for building AI systems that can reason about complex domains, explain their decisions, and handle situations requiring logical deduction rather than pattern recognition alone.
