"""
CS101 Quiz Application starter
- Question loader/validator
- Quiz loop skeleton
- High score stub
Fill in TODOs and expand categories.
"""
import json
from pathlib import Path
from typing import List, Dict, Any

QUESTIONS_FILE = Path("questions_sample.json")
HIGHSCORES_FILE = Path("highscores.json")


class Question(dict):
    text: str
    options: List[str]
    answer: int
    category: str
    explanation: str


def load_questions(path: Path = QUESTIONS_FILE) -> List[Question]:
    if not path.exists():
        raise FileNotFoundError(f"Questions file not found: {path}")
    data = json.loads(path.read_text())
    return [q for q in data if _is_valid_question(q)]


def _is_valid_question(q: Dict[str, Any]) -> bool:
    return isinstance(q.get("text"), str) and isinstance(q.get("options"), list) and isinstance(q.get("answer"), int)


def ask_question(q: Question) -> bool:
    print(f"\n{q['text']}")
    for i, opt in enumerate(q["options"]):
        print(f"  {i + 1}. {opt}")
    try:
        choice = int(input("Your answer: ")) - 1
    except ValueError:
        return False
    correct = choice == q["answer"]
    if correct:
        print("Correct!")
    else:
        print(f"Incorrect. {q.get('explanation', '')}")
    return correct


def record_high_score(name: str, score: int, total: int, path: Path = HIGHSCORES_FILE) -> None:
    entry = {"name": name, "score": score, "total": total}
    scores = []
    if path.exists():
        scores = json.loads(path.read_text())
    scores.append(entry)
    path.write_text(json.dumps(scores, indent=2))


def run_quiz(questions: List[Question]) -> None:
    score = 0
    for q in questions:
        if ask_question(q):
            score += 1
    print(f"\nFinal: {score}/{len(questions)}")
    name = input("Name for high score list? (blank to skip) ").strip()
    if name:
        record_high_score(name, score, len(questions))


def main() -> None:
    questions = load_questions()
    run_quiz(questions)


if __name__ == "__main__":
    main()
