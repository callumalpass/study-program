---
title: "Semantic Networks"
slug: "semantic-networks"
description: "Frames, slots, IS-A and PART-OF hierarchies, inheritance, and knowledge organization in semantic networks"
---

# Semantic Networks

Semantic networks are a knowledge representation formalism that uses graph structures to represent concepts and their relationships. Developed in the 1960s, they provide an intuitive, visual way to organize knowledge and have influenced modern knowledge graphs and ontologies.

## Basic Structure

A semantic network consists of:
1. **Nodes**: Represent concepts, objects, or entities
2. **Links (Edges)**: Represent relationships between nodes
3. **Labels**: Describe the type of relationship

**Example:**
```
     IS-A
Bird -----> Animal
  |           |
  | IS-A      | HAS
  |           v
Robin      Wings
```

This network represents:
- "A robin is a bird"
- "A bird is an animal"
- "Animals have wings"

## Common Relationship Types

### IS-A (Taxonomic) Relationships

IS-A links represent class membership or subclass relationships:
- Robin IS-A Bird
- Bird IS-A Animal
- Dog IS-A Mammal

IS-A relationships support **inheritance**: properties of parent nodes are inherited by child nodes.

### PART-OF (Meronymic) Relationships

PART-OF links represent compositional relationships:
- Wheel PART-OF Car
- Engine PART-OF Car
- Finger PART-OF Hand

### Other Common Relationships

- **HAS**: Ownership or possession (Person HAS Name)
- **CAUSES**: Causal relationships (Fire CAUSES Smoke)
- **AGENT**: Who performs an action (John AGENT-OF Walking)
- **LOCATION**: Where something is (Book LOCATION Library)

## Python Implementation

Here's a practical implementation of a semantic network:

```python
from typing import Dict, List, Set, Optional
from collections import defaultdict

class Node:
    def __init__(self, name: str, properties: Dict[str, any] = None):
        self.name = name
        self.properties = properties or {}

    def __repr__(self):
        return f"Node({self.name})"

    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        return isinstance(other, Node) and self.name == other.name

class Link:
    def __init__(self, relation: str, source: Node, target: Node):
        self.relation = relation
        self.source = source
        self.target = target

    def __repr__(self):
        return f"{self.source.name} --{self.relation}-> {self.target.name}"

class SemanticNetwork:
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
        self.links: List[Link] = []
        # Index for efficient queries
        self.outgoing: Dict[Node, List[Link]] = defaultdict(list)
        self.incoming: Dict[Node, List[Link]] = defaultdict(list)

    def add_node(self, name: str, properties: Dict[str, any] = None) -> Node:
        """Add a node to the network"""
        if name not in self.nodes:
            node = Node(name, properties)
            self.nodes[name] = node
            return node
        return self.nodes[name]

    def add_link(self, relation: str, source_name: str, target_name: str):
        """Add a link between two nodes"""
        source = self.add_node(source_name)
        target = self.add_node(target_name)

        link = Link(relation, source, target)
        self.links.append(link)
        self.outgoing[source].append(link)
        self.incoming[target].append(link)

    def get_relations(self, source_name: str, relation: str) -> List[str]:
        """Get all targets connected to source via the given relation"""
        if source_name not in self.nodes:
            return []

        source = self.nodes[source_name]
        targets = []

        for link in self.outgoing[source]:
            if link.relation == relation:
                targets.append(link.target.name)

        return targets

    def is_a_path(self, source_name: str, target_name: str) -> bool:
        """Check if there's an IS-A path from source to target"""
        if source_name == target_name:
            return True

        parents = self.get_relations(source_name, "IS-A")
        for parent in parents:
            if self.is_a_path(parent, target_name):
                return True

        return False

    def get_inherited_property(self, node_name: str, property_name: str) -> Optional[any]:
        """Get a property value, checking inheritance hierarchy"""
        if node_name not in self.nodes:
            return None

        node = self.nodes[node_name]

        # Check direct property
        if property_name in node.properties:
            return node.properties[property_name]

        # Check inherited properties via IS-A
        parents = self.get_relations(node_name, "IS-A")
        for parent in parents:
            value = self.get_inherited_property(parent, property_name)
            if value is not None:
                return value

        return None

    def visualize(self):
        """Print the network structure"""
        print("Semantic Network:")
        print("-" * 50)
        for link in self.links:
            print(f"  {link}")

# Example: Animal taxonomy
network = SemanticNetwork()

# Add hierarchical relationships
network.add_link("IS-A", "Robin", "Bird")
network.add_link("IS-A", "Penguin", "Bird")
network.add_link("IS-A", "Bird", "Animal")
network.add_link("IS-A", "Dog", "Mammal")
network.add_link("IS-A", "Mammal", "Animal")

# Add properties
network.add_link("HAS", "Bird", "Wings")
network.add_link("HAS", "Bird", "Feathers")
network.add_link("CAN", "Bird", "Fly")
network.add_link("CANNOT", "Penguin", "Fly")  # Exception

# Add specific properties
network.nodes["Animal"].properties = {"living": True, "moves": True}
network.nodes["Bird"].properties = {"egg_laying": True, "warm_blooded": True}
network.nodes["Robin"].properties = {"color": "red-breasted"}

# Query the network
print(network.is_a_path("Robin", "Animal"))  # True
print(network.get_inherited_property("Robin", "living"))  # True
print(network.get_inherited_property("Robin", "color"))  # red-breasted

network.visualize()
```

## Inheritance in Semantic Networks

Inheritance allows child nodes to inherit properties from parent nodes through IS-A links. This provides:

1. **Economy**: Store information once at the highest applicable level
2. **Consistency**: Changes propagate automatically
3. **Reasoning**: Infer properties not explicitly stated

### Inheritance Algorithm

```python
def get_all_properties(network: SemanticNetwork, node_name: str, visited: Set[str] = None) -> Dict[str, any]:
    """Get all properties including inherited ones"""
    if visited is None:
        visited = set()

    if node_name in visited or node_name not in network.nodes:
        return {}

    visited.add(node_name)
    node = network.nodes[node_name]

    # Start with direct properties
    all_props = node.properties.copy()

    # Add inherited properties (parents)
    parents = network.get_relations(node_name, "IS-A")
    for parent in parents:
        parent_props = get_all_properties(network, parent, visited)
        # Parent properties don't override child properties
        for key, value in parent_props.items():
            if key not in all_props:
                all_props[key] = value

    return all_props

# Example usage
all_robin_props = get_all_properties(network, "Robin")
print(f"Robin properties: {all_robin_props}")
# Output: {'color': 'red-breasted', 'egg_laying': True, 'warm_blooded': True, 'living': True, 'moves': True}
```

## Frames and Slots

Frames extend semantic networks by providing structured templates for representing stereotypical situations or objects. A frame consists of:

1. **Frame name**: The concept being represented
2. **Slots**: Attributes or properties
3. **Slot values**: Values for the attributes
4. **Default values**: Fallback values if not specified
5. **Constraints**: Restrictions on slot values

### Frame Implementation

```python
class Slot:
    def __init__(self, name: str, value: any = None, default: any = None,
                 constraints: List = None):
        self.name = name
        self.value = value
        self.default = default
        self.constraints = constraints or []

    def get_value(self):
        """Get value or default if value is None"""
        return self.value if self.value is not None else self.default

    def validate(self, value) -> bool:
        """Check if value satisfies constraints"""
        for constraint in self.constraints:
            if not constraint(value):
                return False
        return True

class Frame:
    def __init__(self, name: str, parent: 'Frame' = None):
        self.name = name
        self.parent = parent
        self.slots: Dict[str, Slot] = {}

    def add_slot(self, slot: Slot):
        """Add a slot to the frame"""
        self.slots[slot.name] = slot

    def get_slot_value(self, slot_name: str) -> any:
        """Get slot value, checking parent if not found"""
        if slot_name in self.slots:
            return self.slots[slot_name].get_value()

        # Check parent frame
        if self.parent:
            return self.parent.get_slot_value(slot_name)

        return None

    def set_slot_value(self, slot_name: str, value: any) -> bool:
        """Set slot value if it satisfies constraints"""
        if slot_name in self.slots:
            slot = self.slots[slot_name]
            if slot.validate(value):
                slot.value = value
                return True
            return False
        return False

    def __repr__(self):
        return f"Frame({self.name})"

# Example: Room frames
class RoomFrameSystem:
    def __init__(self):
        self.frames: Dict[str, Frame] = {}

    def create_room_hierarchy(self):
        # Generic room frame
        room = Frame("Room")
        room.add_slot(Slot("walls", default=4))
        room.add_slot(Slot("ceiling", default=True))
        room.add_slot(Slot("floor", default=True))
        room.add_slot(Slot("purpose", default="general"))
        self.frames["Room"] = room

        # Bedroom frame (inherits from Room)
        bedroom = Frame("Bedroom", parent=room)
        bedroom.add_slot(Slot("purpose", value="sleeping"))
        bedroom.add_slot(Slot("has_bed", default=True))
        bedroom.add_slot(Slot("num_beds", default=1,
                             constraints=[lambda x: x > 0]))
        self.frames["Bedroom"] = bedroom

        # Kitchen frame (inherits from Room)
        kitchen = Frame("Kitchen", parent=room)
        kitchen.add_slot(Slot("purpose", value="cooking"))
        kitchen.add_slot(Slot("has_stove", default=True))
        kitchen.add_slot(Slot("has_refrigerator", default=True))
        self.frames["Kitchen"] = kitchen

    def get_frame(self, name: str) -> Frame:
        return self.frames.get(name)

# Usage
room_system = RoomFrameSystem()
room_system.create_room_hierarchy()

bedroom = room_system.get_frame("Bedroom")
print(f"Bedroom purpose: {bedroom.get_slot_value('purpose')}")  # sleeping
print(f"Bedroom walls: {bedroom.get_slot_value('walls')}")  # 4 (inherited)
print(f"Bedroom has bed: {bedroom.get_slot_value('has_bed')}")  # True

# Set values with validation
bedroom.set_slot_value("num_beds", 2)  # Valid
print(f"Number of beds: {bedroom.get_slot_value('num_beds')}")  # 2
```

## Scripts and Schemas

**Scripts** are specialized frames representing stereotypical sequences of events. They were introduced to handle understanding of common situations.

**Example: Restaurant Script**
```python
class Event:
    def __init__(self, name: str, preconditions: List[str],
                 effects: List[str]):
        self.name = name
        self.preconditions = preconditions
        self.effects = effects

class Script:
    def __init__(self, name: str):
        self.name = name
        self.events: List[Event] = []
        self.roles: Dict[str, str] = {}
        self.props: List[str] = []

    def add_event(self, event: Event):
        self.events.append(event)

# Restaurant script
restaurant_script = Script("Restaurant")
restaurant_script.roles = {
    "customer": "Person eating",
    "waiter": "Person serving",
    "chef": "Person cooking"
}
restaurant_script.props = ["menu", "table", "food", "check"]

restaurant_script.add_event(Event(
    "Enter",
    preconditions=["customer is hungry"],
    effects=["customer is seated"]
))

restaurant_script.add_event(Event(
    "Order",
    preconditions=["customer is seated", "waiter brings menu"],
    effects=["order is placed"]
))

restaurant_script.add_event(Event(
    "Eat",
    preconditions=["food is served"],
    effects=["customer is full", "food is consumed"]
))

restaurant_script.add_event(Event(
    "Pay",
    preconditions=["customer is full"],
    effects=["check is paid", "customer leaves"]
))

print(f"Script: {restaurant_script.name}")
for i, event in enumerate(restaurant_script.events, 1):
    print(f"{i}. {event.name}: {event.preconditions} → {event.effects}")
```

## Default Reasoning and Exceptions

Semantic networks support **default reasoning** with exceptions:

```python
class SemanticNetworkWithExceptions(SemanticNetwork):
    def can_do(self, entity: str, action: str) -> bool:
        """Check if entity can perform action, considering exceptions"""
        # Check for explicit exception
        cannot_relations = self.get_relations(entity, "CANNOT")
        if action in cannot_relations:
            return False

        # Check for explicit capability
        can_relations = self.get_relations(entity, "CAN")
        if action in can_relations:
            return True

        # Check inherited capabilities via IS-A
        parents = self.get_relations(entity, "IS-A")
        for parent in parents:
            if self.can_do(parent, action):
                return True

        return False

# Example usage
net = SemanticNetworkWithExceptions()
net.add_link("IS-A", "Penguin", "Bird")
net.add_link("IS-A", "Bird", "Animal")
net.add_link("CAN", "Bird", "Fly")
net.add_link("CANNOT", "Penguin", "Fly")  # Exception

print(net.can_do("Bird", "Fly"))     # True
print(net.can_do("Penguin", "Fly"))  # False (exception overrides)
```

## Advantages and Limitations

### Advantages
1. **Intuitive**: Visual graph structure is easy to understand
2. **Inheritance**: Efficient representation through property inheritance
3. **Flexible**: Easy to add new concepts and relationships
4. **Inferencing**: Support natural reasoning patterns

### Limitations
1. **Ambiguity**: Relationship semantics not always clear
2. **Logical incompleteness**: Cannot represent all logical statements (e.g., disjunction)
3. **No quantification**: Cannot express "all" or "some" without extensions
4. **Reasoning complexity**: Inheritance with exceptions can be complex
5. **Scalability**: Large networks become difficult to manage

## Key Takeaways

1. **Semantic networks** use nodes and labeled links to represent concepts and relationships
2. **IS-A relationships** create taxonomic hierarchies and enable inheritance
3. **PART-OF relationships** represent compositional structures
4. **Inheritance** allows properties to be stored at the most general level and inherited by children
5. **Frames** provide structured templates with slots, defaults, and constraints
6. **Scripts and schemas** represent stereotypical event sequences
7. **Default reasoning** handles typical cases with exceptions gracefully
8. **Semantic networks** influenced modern knowledge graphs and ontologies

Semantic networks provide an intuitive way to organize and reason about knowledge, forming the foundation for many modern knowledge representation systems. While they have limitations in expressing complex logical relationships, their simplicity and visual nature make them valuable for many applications, particularly in natural language processing and conceptual modeling.
