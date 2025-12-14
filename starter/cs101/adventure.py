"""
CS101 Text Adventure starter
- Room seed
- Command registry stub
- Game state
Fill in handlers and expand the world.
"""
import json
from pathlib import Path

rooms = {
    "foyer": {
        "description": "You are in a small foyer. A hallway leads north.",
        "exits": {"north": "hall"},
        "items": ["note"],
    },
    "hall": {
        "description": "A quiet hall with doors east and west.",
        "exits": {"south": "foyer", "east": "study", "west": "kitchen"},
        "items": [],
    },
    "study": {
        "description": "A dusty study with a locked chest.",
        "exits": {"west": "hall"},
        "items": ["key"],
    },
    "kitchen": {
        "description": "A warm kitchen. Something smells good.",
        "exits": {"east": "hall"},
        "items": [],
    },
}

state = {
    "current_room": "foyer",
    "inventory": [],
    "flags": {"chest_open": False},
}

SAVE_FILE = Path("adventure_save.json")


def save_game(path: Path = SAVE_FILE) -> None:
    SAVE_FILE.write_text(json.dumps({"state": state, "rooms": rooms}, indent=2))


def load_game(path: Path = SAVE_FILE) -> None:
    if not path.exists():
        return
    data = json.loads(path.read_text())
    state.update(data.get("state", {}))
    rooms.update(data.get("rooms", {}))


def handle_go(arg: str) -> None:
    dest = rooms[state["current_room"]]["exits"].get(arg)
    if not dest:
        print("You can't go that way.")
        return
    state["current_room"] = dest
    describe()


def handle_take(arg: str) -> None:
    room = rooms[state["current_room"]]
    if arg not in room["items"]:
        print("Nothing like that here.")
        return
    room["items"].remove(arg)
    state["inventory"].append(arg)
    print(f"You take the {arg}.")


def handle_use(arg: str) -> None:
    # TODO: expand interactions; example chest opening
    if arg == "key" and state["current_room"] == "study":
        print("You unlock the chest and find a map. You win the demo!")
        state["flags"]["chest_open"] = True
    else:
        print("Nothing happens.")


def handle_help(_: str) -> None:
    print("Commands: go <dir>, take <item>, use <item>, look, inventory, save, load, quit")


def describe() -> None:
    room = rooms[state["current_room"]]
    print(f"\n{room['description']}")
    if room["items"]:
        print("You see:", ", ".join(room["items"]))


def main() -> None:
    load_game()
    describe()
    handlers = {
        "go": handle_go,
        "take": handle_take,
        "use": handle_use,
        "help": handle_help,
        "look": lambda _: describe(),
        "inventory": lambda _: print("Inventory:", state["inventory"]),
        "save": lambda _: save_game(),
        "load": lambda _: load_game(),
    }
    while True:
        raw = input("\n> ").strip().lower()
        if raw in {"quit", "exit"}:
            break
        if not raw:
            continue
        verb, *rest = raw.split(maxsplit=1)
        arg = rest[0] if rest else ""
        handler = handlers.get(verb)
        if handler:
            handler(arg)
        else:
            print("Unknown command. Type 'help'.")


if __name__ == "__main__":
    main()
