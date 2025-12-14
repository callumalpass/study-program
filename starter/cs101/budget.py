"""
CS101 Budget Tracker starter
- Transaction model and persistence helpers
- Menu skeleton
Fill in validation, reporting, and filtering logic.
"""
import json
from pathlib import Path
from typing import List, Dict, TypedDict

class Transaction(TypedDict):
    date: str
    type: str  # 'income' or 'expense'
    amount: float
    category: str
    description: str


DATA_FILE = Path("budget_sample.json")
CATEGORIES = {
    "income": ["Salary", "Freelance", "Other"],
    "expense": ["Food", "Transport", "Entertainment", "Bills", "Other"],
}


def load_transactions(path: Path = DATA_FILE) -> List[Transaction]:
    if not path.exists():
        return []
    try:
        return json.loads(path.read_text())
    except json.JSONDecodeError:
        print("Warning: could not parse data; starting empty.")
        return []


def save_transactions(transactions: List[Transaction], path: Path = DATA_FILE) -> None:
    path.write_text(json.dumps(transactions, indent=2))


def add_transaction(transactions: List[Transaction], txn: Transaction) -> None:
    # TODO: add validation (date format, type, category, amount>0)
    transactions.append(txn)


def list_transactions(transactions: List[Transaction]) -> None:
    for t in transactions:
        print(f"{t['date']} {t['type']:7} {t['amount']:8.2f} {t['category']:<12} {t['description']}")


def monthly_summary(transactions: List[Transaction], month_prefix: str) -> None:
    # TODO: filter by month_prefix YYYY-MM and compute totals per category
    incomes = [t for t in transactions if t["type"] == "income"]
    expenses = [t for t in transactions if t["type"] == "expense"]
    print(f"Income count: {len(incomes)}, Expense count: {len(expenses)}")


def main() -> None:
    txns = load_transactions()
    while True:
        print("\n--- Budget Tracker ---")
        print("1) Add income")
        print("2) Add expense")
        print("3) List transactions")
        print("4) Monthly summary")
        print("5) Save & exit")
        choice = input("> ").strip()
        if choice in {"1", "2"}:
            txn_type = "income" if choice == "1" else "expense"
            amount = float(input("Amount: ").strip())
            category = input(f"Category ({', '.join(CATEGORIES[txn_type])}): ").strip()
            desc = input("Description: ").strip()
            date = input("Date (YYYY-MM-DD): ").strip()
            add_transaction(txns, {
                "date": date,
                "type": txn_type,
                "amount": amount,
                "category": category,
                "description": desc,
            })
        elif choice == "3":
            list_transactions(txns)
        elif choice == "4":
            month = input("Month (YYYY-MM): ").strip()
            monthly_summary(txns, month)
        elif choice == "5":
            save_transactions(txns)
            print("Saved. Bye!")
            break
        else:
            print("Unknown choice.")


if __name__ == "__main__":
    main()
