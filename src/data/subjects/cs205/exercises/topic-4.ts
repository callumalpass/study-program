import { CodingExercise } from '../../../../core/types';

export const cs205Topic4Exercises: CodingExercise[] = [
  {
    id: 'cs205-ex-4-1',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Identify FDs',
    description: 'Given Employee(EmpID, Name, DeptID, DeptName, Salary), identify all functional dependencies.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- List functional dependencies:\n-- ',
    solution: '-- Functional Dependencies:\n-- EmpID → Name, DeptID, Salary (employee determines these)\n-- DeptID → DeptName (department determines its name)\n-- Note: EmpID → DeptName is transitive (EmpID → DeptID → DeptName)',
    testCases: [
      { input: 'analysis', expectedOutput: 'FDs identified', isHidden: false, description: 'FD identification' }
    ],
    hints: ['What does EmpID determine?', 'What does DeptID determine?']
  },
  {
    id: 'cs205-ex-4-2',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Compute Closure',
    description: 'Given FDs: A→B, B→C, CD→E. Compute {A,D}+.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Compute closure of {A,D}:\n-- ',
    solution: '-- {A,D}+ computation:\n-- Start: {A,D}\n-- A→B applies: {A,D,B}\n-- B→C applies: {A,D,B,C}\n-- CD→E applies (C,D in closure): {A,D,B,C,E}\n-- No more FDs apply\n-- {A,D}+ = {A,B,C,D,E}',
    testCases: [
      { input: 'closure', expectedOutput: '{A,B,C,D,E}', isHidden: false, description: 'Closure computation' }
    ],
    hints: ['Start with the given attributes.', 'Apply FDs iteratively until no change.']
  },
  {
    id: 'cs205-ex-4-3',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Find Candidate Keys',
    description: 'R(A,B,C,D) with FDs: A→B, C→D. Find all candidate keys.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Find candidate keys:\n-- ',
    solution: '-- Analysis:\n-- A+ = {A,B} (not all attributes)\n-- C+ = {C,D} (not all attributes)\n-- {A,C}+ = {A,B,C,D} (all attributes!)\n-- Check if minimal: Neither A nor C alone works.\n-- Candidate Key: {A,C}',
    testCases: [
      { input: 'keys', expectedOutput: '{A,C}', isHidden: false, description: 'Key finding' }
    ],
    hints: ['Find which attributes aren\'t determined.', 'Those must be in every key.']
  },
  {
    id: 'cs205-ex-4-4',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: '1NF Violation',
    description: 'Identify the 1NF violation and fix: Employee(ID, Name, PhoneNumbers) where PhoneNumbers="555-0100,555-0101".',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- 1NF violation and fix:\n',
    solution: '-- Violation: PhoneNumbers is not atomic (contains multiple values)\n\n-- Fix:\nCREATE TABLE Employee (\n    ID INTEGER PRIMARY KEY,\n    Name VARCHAR(100)\n);\n\nCREATE TABLE EmployeePhone (\n    ID INTEGER,\n    PhoneNumber VARCHAR(20),\n    PRIMARY KEY (ID, PhoneNumber),\n    FOREIGN KEY (ID) REFERENCES Employee(ID)\n);',
    testCases: [
      { input: 'fix', expectedOutput: 'Atomic values only', isHidden: false, description: '1NF fix' }
    ],
    hints: ['1NF requires atomic values.', 'Create separate table for multivalued attribute.']
  },
  {
    id: 'cs205-ex-4-5',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: '2NF Decomposition',
    description: 'Decompose to 2NF: OrderItem(OrderID, ProductID, ProductName, Quantity). Key: {OrderID, ProductID}.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Identify partial dependency and decompose:\n',
    solution: '-- Partial dependency: ProductID → ProductName\n-- ProductName depends on part of the key (ProductID only)\n\n-- 2NF Decomposition:\nCREATE TABLE OrderItem (\n    OrderID INTEGER,\n    ProductID INTEGER,\n    Quantity INTEGER,\n    PRIMARY KEY (OrderID, ProductID)\n);\n\nCREATE TABLE Product (\n    ProductID INTEGER PRIMARY KEY,\n    ProductName VARCHAR(100)\n);',
    testCases: [
      { input: 'decomposition', expectedOutput: '2NF tables', isHidden: false, description: '2NF decomposition' }
    ],
    hints: ['Look for attributes depending on part of composite key.', 'Split those into separate table.']
  },
  {
    id: 'cs205-ex-4-6',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: '3NF Decomposition',
    description: 'Decompose to 3NF: Employee(EmpID, DeptID, DeptLocation). FDs: EmpID→DeptID, DeptID→DeptLocation.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Identify transitive dependency and decompose:\n',
    solution: '-- Transitive dependency: EmpID → DeptID → DeptLocation\n-- DeptLocation depends transitively on EmpID through DeptID\n\n-- 3NF Decomposition:\nCREATE TABLE Employee (\n    EmpID INTEGER PRIMARY KEY,\n    DeptID INTEGER,\n    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)\n);\n\nCREATE TABLE Department (\n    DeptID INTEGER PRIMARY KEY,\n    DeptLocation VARCHAR(100)\n);',
    testCases: [
      { input: 'decomposition', expectedOutput: '3NF tables', isHidden: false, description: '3NF decomposition' }
    ],
    hints: ['Find X→Y→Z where Y is not a key.', 'Create separate table for Y→Z.']
  },
  {
    id: 'cs205-ex-4-7',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Check BCNF',
    description: 'Is R(A,B,C) with FDs: AB→C, C→B in BCNF? If not, decompose.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- BCNF analysis:\n-- ',
    solution: '-- Keys: AB+ = {A,B,C}, AC+ = {A,B,C}\n-- Candidate keys: {AB}, {AC}\n\n-- Check BCNF (every determinant must be superkey):\n-- AB→C: AB is a key ✓\n-- C→B: C is not a superkey ✗ VIOLATION!\n\n-- BCNF Decomposition on C→B:\n-- R1(C,B) with key C\n-- R2(A,C) with key AC\n\n-- Note: AB→C is NOT preserved (must join to check)',
    testCases: [
      { input: 'analysis', expectedOutput: 'BCNF violated, decomposition shown', isHidden: false, description: 'BCNF check' }
    ],
    hints: ['For BCNF: all determinants must be superkeys.', 'Decompose on violating FD.']
  },
  {
    id: 'cs205-ex-4-8',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Minimal Cover',
    description: 'Find the minimal cover for: A→BC, B→C, AB→C, AC→D.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Compute minimal cover:\n-- ',
    solution: '-- Step 1: Decompose RHS\n-- A→B, A→C, B→C, AB→C, AC→D\n\n-- Step 2: Remove redundant FDs\n-- A→C: Remove, check A+ = {A,B} (using A→B)\n--       Then B→C gives A+ = {A,B,C}\n--       C is reachable, so A→C is redundant ✓\n-- AB→C: Remove, check {A,B}+ = {A,B,C} (B→C)\n--        Redundant ✓\n\n-- Step 3: Remove redundant LHS\n-- AC→D: Check A+ = {A,B,C}, no D\n--        C not redundant\n\n-- Minimal cover: {A→B, B→C, AC→D}',
    testCases: [
      { input: 'minimal cover', expectedOutput: '{A→B, B→C, AC→D}', isHidden: false, description: 'Minimal cover' }
    ],
    hints: ['First split RHS to single attributes.', 'Remove FDs derivable from others.']
  },
  {
    id: 'cs205-ex-4-9',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Lossless Test',
    description: 'Is decomposition {R1(A,B), R2(B,C)} lossless for R(A,B,C) with FD B→C?',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Lossless join test:\n-- ',
    solution: '-- Test: Common attributes must be key in at least one relation\n-- Common: R1 ∩ R2 = {B}\n-- B→C means B is key in R2(B,C) ✓\n\n-- Result: LOSSLESS\n-- The common attribute B determines all of R2',
    testCases: [
      { input: 'test', expectedOutput: 'Lossless', isHidden: false, description: 'Lossless test' }
    ],
    hints: ['Find common attributes.', 'Check if common is key in either relation.']
  },
  {
    id: 'cs205-ex-4-10',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Dependency Preservation',
    description: 'For R(A,B,C) with FDs: A→B, B→C, check if decomposition {R1(A,B), R2(A,C)} preserves dependencies.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Dependency preservation check:\n-- ',
    solution: '-- FDs in R1(A,B): A→B ✓ (both A and B in R1)\n-- FDs in R2(A,C): None directly\n-- FD B→C: B in R1, C in R2 - requires join!\n\n-- But: A→B and B→C implies A→C\n-- A→C can be checked in R2\n\n-- Result: A→B preserved in R1\n-- B→C NOT preserved (needs join)\n-- But transitively: A→C in R2',
    testCases: [
      { input: 'check', expectedOutput: 'B→C not directly preserved', isHidden: false, description: 'Dependency preservation' }
    ],
    hints: ['Can each FD be checked in one table?', 'Check if both sides are in same table.']
  },
  {
    id: 'cs205-ex-4-11',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: '3NF Synthesis',
    description: 'Use 3NF synthesis on R(A,B,C,D) with minimal cover: A→B, B→C, AC→D.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- 3NF synthesis algorithm:\n-- ',
    solution: '-- Step 1: Create table for each FD:\n-- R1(A,B) from A→B\n-- R2(B,C) from B→C\n-- R3(A,C,D) from AC→D\n\n-- Step 2: Check if any contains candidate key\n-- Candidate key? A+ = {A,B,C}, need D\n-- {A,C}+ = {A,B,C,D} ✓ Key = {A,C}\n-- R3 contains {A,C} ✓\n\n-- Step 3: Remove subsets\n-- R1, R2, R3 - no subset relationships\n\n-- Final: R1(A,B), R2(B,C), R3(A,C,D)',
    testCases: [
      { input: 'synthesis', expectedOutput: 'Three 3NF tables', isHidden: false, description: '3NF synthesis' }
    ],
    hints: ['One table per FD.', 'Ensure candidate key in some table.']
  },
  {
    id: 'cs205-ex-4-12',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: '4NF MVD',
    description: 'Identify MVD violation: Employee(EmpID, Skill, Language) where skills and languages are independent.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- MVD analysis and 4NF decomposition:\n-- ',
    solution: '-- MVDs:\n-- EmpID →→ Skill (skills independent of languages)\n-- EmpID →→ Language (languages independent of skills)\n\n-- Current data causes redundancy:\n-- (1, Java, English), (1, Java, French)\n-- (1, Python, English), (1, Python, French)\n-- Every skill repeated with every language!\n\n-- 4NF Decomposition:\nCREATE TABLE EmployeeSkills (\n    EmpID INTEGER,\n    Skill VARCHAR(50),\n    PRIMARY KEY (EmpID, Skill)\n);\n\nCREATE TABLE EmployeeLanguages (\n    EmpID INTEGER,\n    Language VARCHAR(50),\n    PRIMARY KEY (EmpID, Language)\n);',
    testCases: [
      { input: 'decomposition', expectedOutput: '4NF tables', isHidden: false, description: '4NF decomposition' }
    ],
    hints: ['Independent attributes cause redundancy.', 'Separate into different tables.']
  },
  {
    id: 'cs205-ex-4-13',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Denormalization Decision',
    description: 'Given normalized Orders and Customers tables joined 1000x/day for reporting, propose and justify a denormalization.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Denormalization proposal:\n',
    solution: '-- Scenario: Reports always need customer name with orders\n-- Current: JOIN Orders and Customers each time\n\n-- Denormalization:\nALTER TABLE Orders ADD CustomerName VARCHAR(100);\n\n-- Maintenance trigger:\nCREATE TRIGGER sync_customer_name\nAFTER UPDATE ON Customers\nFOR EACH ROW\nBEGIN\n    UPDATE Orders\n    SET CustomerName = NEW.Name\n    WHERE CustomerID = NEW.CustomerID;\nEND;\n\n-- Trade-off:\n-- + Eliminates 1000 joins/day\n-- - Extra storage, update overhead\n-- - Must maintain consistency via trigger',
    testCases: [
      { input: 'proposal', expectedOutput: 'Justified denormalization', isHidden: false, description: 'Denormalization' }
    ],
    hints: ['Consider read vs write frequency.', 'Plan for consistency maintenance.']
  },
  {
    id: 'cs205-ex-4-14',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Normalization Analysis',
    description: 'Analyze: Invoice(InvNum, Date, CustID, CustName, ItemID, ItemDesc, Qty, Price).',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Full normalization analysis:\n-- ',
    solution: '-- FDs:\n-- InvNum → Date, CustID\n-- CustID → CustName\n-- ItemID → ItemDesc, Price\n-- {InvNum, ItemID} → Qty\n\n-- Key: {InvNum, ItemID}\n\n-- 2NF violations (partial deps):\n-- InvNum → Date, CustID\n-- ItemID → ItemDesc, Price\n\n-- 3NF violation (transitive):\n-- InvNum → CustID → CustName\n\n-- Final decomposition:\n-- Invoice(InvNum, Date, CustID)\n-- Customer(CustID, CustName)\n-- Item(ItemID, ItemDesc, Price)\n-- InvoiceItem(InvNum, ItemID, Qty)',
    testCases: [
      { input: 'analysis', expectedOutput: 'Full normalization to 3NF', isHidden: false, description: 'Complete analysis' }
    ],
    hints: ['First identify all FDs.', 'Find key, then check each normal form.']
  },
  {
    id: 'cs205-ex-4-15',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Armstrong Axioms',
    description: 'Using Armstrong\'s axioms, prove A→C from A→B and B→C.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Proof using Armstrong\'s axioms:\n-- ',
    solution: '-- Given: A→B, B→C\n-- Goal: Prove A→C\n\n-- By Transitivity axiom:\n-- If X→Y and Y→Z, then X→Z\n\n-- Applying with X=A, Y=B, Z=C:\n-- A→B (given)\n-- B→C (given)\n-- Therefore: A→C ✓\n\n-- This is direct application of transitivity.',
    testCases: [
      { input: 'proof', expectedOutput: 'A→C proven', isHidden: false, description: 'Armstrong proof' }
    ],
    hints: ['Transitivity: If X→Y and Y→Z then X→Z.', 'Match given FDs to the pattern.']
  },
  {
    id: 'cs205-ex-4-16',
    subjectId: 'cs205',
    topicId: 'cs205-4',
    title: 'Real-World Schema Design',
    description: 'Design a normalized schema for a library: Books, Authors (many-to-many), Borrowers, Loans.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Library database design:\n',
    solution: 'CREATE TABLE Author (\n    AuthorID INTEGER PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE Book (\n    ISBN VARCHAR(13) PRIMARY KEY,\n    Title VARCHAR(200) NOT NULL,\n    PublishYear INTEGER\n);\n\nCREATE TABLE BookAuthor (\n    ISBN VARCHAR(13),\n    AuthorID INTEGER,\n    PRIMARY KEY (ISBN, AuthorID),\n    FOREIGN KEY (ISBN) REFERENCES Book(ISBN),\n    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID)\n);\n\nCREATE TABLE Borrower (\n    BorrowerID INTEGER PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Email VARCHAR(255)\n);\n\nCREATE TABLE Loan (\n    LoanID INTEGER PRIMARY KEY,\n    ISBN VARCHAR(13) NOT NULL,\n    BorrowerID INTEGER NOT NULL,\n    LoanDate DATE NOT NULL,\n    DueDate DATE NOT NULL,\n    ReturnDate DATE,\n    FOREIGN KEY (ISBN) REFERENCES Book(ISBN),\n    FOREIGN KEY (BorrowerID) REFERENCES Borrower(BorrowerID)\n);',
    testCases: [
      { input: 'design', expectedOutput: 'Normalized library schema', isHidden: false, description: 'Real-world design' }
    ],
    hints: ['Many-to-many needs junction table.', 'Consider what attributes belong where.']
  }
];
