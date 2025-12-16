#!/usr/bin/env python3
"""
Gradebook CLI
Data shape: { "Student Name": [score1, score2, ...], ... }
Persistence: JSON file (default: gradebook.json)
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple


Gradebook = Dict[str, List[float]]


# ---------- Persistence helpers ----------

def load_data(path: str) -> Gradebook:
    """Load gradebook JSON from disk. Returns {} if missing/unreadable."""
    p = Path(path)
    if not p.exists():
        return {}

    try:
        raw = json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"[WARN] Could not read '{path}'. Starting fresh. ({e})")
        return {}

    # Validate/normalize structure: {str: list[number]}
    if not isinstance(raw, dict):
        print(f"[WARN] '{path}' did not contain an object. Starting fresh.")
        return {}

    cleaned: Gradebook = {}
    for k, v in raw.items():
        if not isinstance(k, str):
            continue
        if not isinstance(v, list):
            cleaned[k] = []
            continue

        scores: List[float] = []
        for item in v:
            try:
                num = float(item)
            except (TypeError, ValueError):
                continue
            # Keep only plausible scores
            if 0.0 <= num <= 100.0:
                scores.append(num)
        cleaned[k] = scores

    return cleaned


def save_data(path: str, data: Gradebook) -> None:
    """Save gradebook JSON to disk (pretty-printed)."""
    p = Path(path)
    try:
        p.write_text(json.dumps(data, indent=2, sort_keys=True), encoding="utf-8")
    except Exception as e:
        print(f"[ERROR] Failed to save '{path}': {e}")


# ---------- Grade calculations ----------

def average(scores: List[float]) -> Optional[float]:
    if not scores:
        return None
    return sum(scores) / len(scores)


def letter_grade(avg: Optional[float]) -> str:
    if avg is None:
        return "-"
    # A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59
    if avg >= 90:
        return "A"
    if avg >= 80:
        return "B"
    if avg >= 70:
        return "C"
    if avg >= 60:
        return "D"
    return "F"


def class_stats(gradebook: Gradebook) -> Optional[Tuple[float, float, float]]:
    """
    Class-wide stats based on per-student averages:
    returns (min_avg, max_avg, class_avg_of_avgs) or None if no grades exist.
    """
    avgs = [a for a in (average(scores) for scores in gradebook.values()) if a is not None]
    if not avgs:
        return None
    return (min(avgs), max(avgs), sum(avgs) / len(avgs))


# ---------- Input helpers ----------

def prompt_nonempty(prompt: str) -> str:
    while True:
        s = input(prompt).strip()
        if s:
            return s
        print("Please enter a non-empty value.")


def prompt_score(prompt: str) -> float:
    while True:
        raw = input(prompt).strip()
        try:
            val = float(raw)
        except ValueError:
            print("Invalid score. Enter a number (e.g. 85 or 92.5).")
            continue
        if not (0.0 <= val <= 100.0):
            print("Score must be between 0 and 100.")
            continue
        return val


def choose_student(gradebook: Gradebook) -> Optional[str]:
    if not gradebook:
        print("No students yet. Add a student first.")
        return None
    name = input("Student name (exact, or leave blank to cancel): ").strip()
    if not name:
        return None
    if name not in gradebook:
        print(f"Student '{name}' not found.")
        return None
    return name


# ---------- UI formatting ----------

def print_header(title: str) -> None:
    print("\n" + "=" * len(title))
    print(title)
    print("=" * len(title))


def fmt_num(x: Optional[float]) -> str:
    return "-" if x is None else f"{x:.2f}"


# ---------- Menu actions ----------

def list_students(gradebook: Gradebook) -> None:
    print_header("Students")
    if not gradebook:
        print("(none)")
        return
    for name in sorted(gradebook.keys(), key=str.lower):
        scores = gradebook[name]
        avg = average(scores)
        lg = letter_grade(avg)
        print(f"- {name}  | scores: {len(scores):2d} | avg: {fmt_num(avg):>6} | grade: {lg}")


def add_student(gradebook: Gradebook) -> None:
    print_header("Add Student")
    name = prompt_nonempty("Enter student name: ")
    if name in gradebook:
        print(f"Student '{name}' already exists.")
        return
    gradebook[name] = []
    print(f"Added '{name}'.")


def add_grade(gradebook: Gradebook) -> None:
    print_header("Add Grade")
    name = choose_student(gradebook)
    if name is None:
        return
    score = prompt_score(f"Enter score for {name} (0-100): ")
    gradebook[name].append(score)
    avg = average(gradebook[name])
    print(f"Recorded {score:.2f} for {name}. New avg: {fmt_num(avg)} ({letter_grade(avg)})")


def view_student(gradebook: Gradebook) -> None:
    print_header("View Student Record")
    name = choose_student(gradebook)
    if name is None:
        return
    scores = gradebook[name]
    avg = average(scores)
    lg = letter_grade(avg)
    print(f"Name: {name}")
    print(f"Scores ({len(scores)}): " + (", ".join(f"{s:.2f}" for s in scores) if scores else "(none)"))
    print(f"Average: {fmt_num(avg)}")
    print(f"Letter:  {lg}")


def view_class_stats(gradebook: Gradebook) -> None:
    print_header("Class Statistics (based on per-student averages)")
    stats = class_stats(gradebook)
    if stats is None:
        print("No grades recorded yet.")
        return
    mn, mx, av = stats

    # Also show who is highest/lowest (by average)
    ranked = []
    for name, scores in gradebook.items():
        a = average(scores)
        if a is not None:
            ranked.append((a, name))
    ranked.sort()

    low_avg, low_name = ranked[0]
    high_avg, high_name = ranked[-1]

    print(f"Lowest avg:  {mn:.2f}  ({low_name})")
    print(f"Highest avg: {mx:.2f}  ({high_name})")
    print(f"Class avg:   {av:.2f}")
    print(f"Class letter (from class avg): {letter_grade(av)}")


# ---------- Main loop ----------

def menu() -> None:
    DATA_FILE = "gradebook.json"
    gradebook = load_data(DATA_FILE)

    print_header("Gradebook CLI")
    print(f"Data file: {DATA_FILE}")
    print("Tip: names must match exactly (case-sensitive) when selecting a student.\n")

    while True:
        print("\nMenu")
        print(" 1) List students")
        print(" 2) Add student")
        print(" 3) Add grade")
        print(" 4) View student record")
        print(" 5) Class statistics")
        print(" 6) Save & exit")

        choice = input("Choose an option (1-6): ").strip()

        if choice == "1":
            list_students(gradebook)
        elif choice == "2":
            add_student(gradebook)
        elif choice == "3":
            add_grade(gradebook)
        elif choice == "4":
            view_student(gradebook)
        elif choice == "5":
            view_class_stats(gradebook)
        elif choice == "6":
            save_data(DATA_FILE, gradebook)
            print(f"Saved to '{DATA_FILE}'. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number from 1 to 6.")


if __name__ == "__main__":
    try:
        menu()
    except KeyboardInterrupt:
        # Save on Ctrl+C as a friendly default
        print("\nInterrupted. Saving before exit...")
        # best-effort save; if this fails it prints its own error
        # (reload not needed; we're in-memory)
        save_data("gradebook.json", load_data("gradebook.json") or {})
        print("Goodbye!")

