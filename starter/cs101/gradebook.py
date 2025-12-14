"""
CS101 Gradebook starter
- Data model: dict[str, list[float]]
- Persistence helpers
- Menu loop skeleton
Fill in TODOs to complete functionality.
"""
import json
from pathlib import Path
from typing import Dict, List

Gradebook = Dict[str, List[float]]

DATA_FILE = Path("gradebook_sample.json")


def load_data(path: Path = DATA_FILE) -> Gradebook:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text())
    except json.JSONDecodeError:
        print("Warning: data file is corrupt; starting fresh.")
        return {}


def save_data(book: Gradebook, path: Path = DATA_FILE) -> None:
    path.write_text(json.dumps(book, indent=2))


def add_student(book: Gradebook, name: str) -> None:
    # TODO: add validation and avoid overwriting existing students
    book.setdefault(name, [])


def add_score(book: Gradebook, name: str, score: float) -> None:
    # TODO: validate score range 0-100 and handle missing students
    book.setdefault(name, []).append(score)


def class_stats(book: Gradebook) -> dict:
    # TODO: compute min/max/avg safely when no scores exist
    all_scores = [s for scores in book.values() for s in scores]
    return {
        "count": len(all_scores),
        "min": min(all_scores) if all_scores else None,
        "max": max(all_scores) if all_scores else None,
        "avg": sum(all_scores) / len(all_scores) if all_scores else None,
    }


def letter_grade(score: float) -> str:
    # TODO: adjust thresholds if desired
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"


def main() -> None:
    book = load_data()
    while True:
        print("\n--- Gradebook ---")
        print("1) Add student")
        print("2) Add score")
        print("3) List students")
        print("4) Class stats")
        print("5) Save & exit")
        choice = input("> ").strip()
        if choice == "1":
            name = input("Student name: ").strip()
            add_student(book, name)
        elif choice == "2":
            name = input("Student name: ").strip()
            score = float(input("Score (0-100): ").strip())
            add_score(book, name, score)
        elif choice == "3":
            for student, scores in book.items():
                avg = sum(scores) / len(scores) if scores else 0
                print(f"- {student}: {scores} (avg {avg:.1f}, letter {letter_grade(avg) if scores else 'N/A'})")
        elif choice == "4":
            stats = class_stats(book)
            print(stats)
        elif choice == "5":
            save_data(book)
            print("Saved. Goodbye!")
            break
        else:
            print("Unknown choice, try again.")


if __name__ == "__main__":
    main()
