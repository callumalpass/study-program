import { CodingExercise } from '../../../../core/types';

export const cs205Topic2Exercises: CodingExercise[] = [
  {
    id: 'cs205-ex-2-1',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'Basic SELECT',
    description: 'Write a query to select all columns from the Employees table.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Select all from Employees\n',
    solution: 'SELECT * FROM Employees;',
    testCases: [
      { input: 'query', expectedOutput: 'All employee rows', isHidden: false, description: 'Select all' }
    ],
    hints: ['Use * to select all columns.', 'Don\'t forget the semicolon.']
  },
  {
    id: 'cs205-ex-2-2',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'SELECT with WHERE',
    description: 'Select Name and Salary from Employees where Salary is greater than 50000.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- High earners query\n',
    solution: 'SELECT Name, Salary\nFROM Employees\nWHERE Salary > 50000;',
    testCases: [
      { input: 'query', expectedOutput: 'Employees earning >50000', isHidden: false, description: 'Filtered select' }
    ],
    hints: ['List columns after SELECT.', 'WHERE filters rows.']
  },
  {
    id: 'cs205-ex-2-3',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'INSERT Statement',
    description: 'Insert a new customer: ID=101, Name="John Smith", Email="john@example.com".',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Insert new customer\n',
    solution: 'INSERT INTO Customers (CustomerID, Name, Email)\nVALUES (101, \'John Smith\', \'john@example.com\');',
    testCases: [
      { input: 'insert', expectedOutput: '1 row inserted', isHidden: false, description: 'Basic insert' }
    ],
    hints: ['Specify columns in parentheses.', 'String values need quotes.']
  },
  {
    id: 'cs205-ex-2-4',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'UPDATE Statement',
    description: 'Update the price of product with ID=5 to 29.99.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Update product price\n',
    solution: 'UPDATE Products\nSET Price = 29.99\nWHERE ProductID = 5;',
    testCases: [
      { input: 'update', expectedOutput: '1 row updated', isHidden: false, description: 'Basic update' }
    ],
    hints: ['SET specifies new value.', 'Always include WHERE to avoid updating all rows!']
  },
  {
    id: 'cs205-ex-2-5',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'DELETE Statement',
    description: 'Delete all orders from before January 1, 2020.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Delete old orders\n',
    solution: 'DELETE FROM Orders\nWHERE OrderDate < \'2020-01-01\';',
    testCases: [
      { input: 'delete', expectedOutput: 'Old orders deleted', isHidden: false, description: 'Filtered delete' }
    ],
    hints: ['Date comparison with string in ISO format.', 'WHERE is crucial to avoid deleting all rows.']
  },
  {
    id: 'cs205-ex-2-6',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'ORDER BY',
    description: 'Select all products sorted by price descending, then by name ascending.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Sorted products\n',
    solution: 'SELECT *\nFROM Products\nORDER BY Price DESC, Name ASC;',
    testCases: [
      { input: 'query', expectedOutput: 'Products sorted by price desc, name asc', isHidden: false, description: 'Multi-column sort' }
    ],
    hints: ['DESC for descending.', 'Multiple columns separated by comma.']
  },
  {
    id: 'cs205-ex-2-7',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'DISTINCT Values',
    description: 'Find all unique cities from the Customers table.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Unique cities\n',
    solution: 'SELECT DISTINCT City\nFROM Customers;',
    testCases: [
      { input: 'query', expectedOutput: 'Unique city names', isHidden: false, description: 'Distinct values' }
    ],
    hints: ['DISTINCT removes duplicates.', 'Place it after SELECT.']
  },
  {
    id: 'cs205-ex-2-8',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'LIKE Pattern',
    description: 'Find all customers whose name starts with "A" and ends with "n".',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Pattern matching query\n',
    solution: 'SELECT *\nFROM Customers\nWHERE Name LIKE \'A%n\';',
    testCases: [
      { input: 'query', expectedOutput: 'Names matching pattern', isHidden: false, description: 'LIKE pattern' }
    ],
    hints: ['% matches any characters.', '_ matches exactly one character.']
  },
  {
    id: 'cs205-ex-2-9',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'COUNT Aggregate',
    description: 'Count the total number of orders in the Orders table.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Count orders\n',
    solution: 'SELECT COUNT(*) AS TotalOrders\nFROM Orders;',
    testCases: [
      { input: 'query', expectedOutput: 'Total order count', isHidden: false, description: 'Count aggregate' }
    ],
    hints: ['COUNT(*) counts all rows.', 'AS creates an alias for the result column.']
  },
  {
    id: 'cs205-ex-2-10',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'GROUP BY',
    description: 'Find the number of employees in each department.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Employees per department\n',
    solution: 'SELECT DeptID, COUNT(*) AS EmployeeCount\nFROM Employees\nGROUP BY DeptID;',
    testCases: [
      { input: 'query', expectedOutput: 'Count per department', isHidden: false, description: 'Grouping' }
    ],
    hints: ['Non-aggregated columns must be in GROUP BY.', 'COUNT counts rows per group.']
  },
  {
    id: 'cs205-ex-2-11',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'HAVING Clause',
    description: 'Find departments with more than 5 employees.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Large departments\n',
    solution: 'SELECT DeptID, COUNT(*) AS EmployeeCount\nFROM Employees\nGROUP BY DeptID\nHAVING COUNT(*) > 5;',
    testCases: [
      { input: 'query', expectedOutput: 'Departments with >5 employees', isHidden: false, description: 'Having filter' }
    ],
    hints: ['HAVING filters groups, WHERE filters rows.', 'HAVING comes after GROUP BY.']
  },
  {
    id: 'cs205-ex-2-12',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'Multiple Aggregates',
    description: 'For each department, find the minimum, maximum, and average salary.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Salary statistics by department\n',
    solution: 'SELECT DeptID,\n       MIN(Salary) AS MinSalary,\n       MAX(Salary) AS MaxSalary,\n       AVG(Salary) AS AvgSalary\nFROM Employees\nGROUP BY DeptID;',
    testCases: [
      { input: 'query', expectedOutput: 'Salary stats per department', isHidden: false, description: 'Multiple aggregates' }
    ],
    hints: ['Multiple aggregates in same SELECT.', 'Use aliases for clarity.']
  },
  {
    id: 'cs205-ex-2-13',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'Create View',
    description: 'Create a view called HighValueOrders showing orders with total over 1000.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Create view\n',
    solution: 'CREATE VIEW HighValueOrders AS\nSELECT *\nFROM Orders\nWHERE Total > 1000;',
    testCases: [
      { input: 'view', expectedOutput: 'View created', isHidden: false, description: 'View creation' }
    ],
    hints: ['CREATE VIEW ... AS SELECT ...', 'Views are virtual tables.']
  },
  {
    id: 'cs205-ex-2-14',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'NULL Handling',
    description: 'Find all employees who do not have a manager assigned (ManagerID is NULL).',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Employees without manager\n',
    solution: 'SELECT *\nFROM Employees\nWHERE ManagerID IS NULL;',
    testCases: [
      { input: 'query', expectedOutput: 'Employees with NULL manager', isHidden: false, description: 'NULL check' }
    ],
    hints: ['Use IS NULL, not = NULL.', 'NULL comparisons with = return NULL, not true/false.']
  },
  {
    id: 'cs205-ex-2-15',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'BETWEEN and IN',
    description: 'Find products with price between 10 and 50, in categories "Electronics" or "Books".',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Filtered products\n',
    solution: 'SELECT *\nFROM Products\nWHERE Price BETWEEN 10 AND 50\n  AND Category IN (\'Electronics\', \'Books\');',
    testCases: [
      { input: 'query', expectedOutput: 'Filtered products', isHidden: false, description: 'BETWEEN and IN' }
    ],
    hints: ['BETWEEN is inclusive.', 'IN checks membership in a list.']
  },
  {
    id: 'cs205-ex-2-16',
    subjectId: 'cs205',
    topicId: 'cs205-2',
    title: 'Stored Procedure',
    description: 'Create a stored procedure GetEmployeesByDept that takes DeptID and returns employees in that department.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Create stored procedure\n',
    solution: 'CREATE PROCEDURE GetEmployeesByDept(IN dept_id INT)\nBEGIN\n    SELECT *\n    FROM Employees\n    WHERE DeptID = dept_id;\nEND;',
    testCases: [
      { input: 'procedure', expectedOutput: 'Procedure created', isHidden: false, description: 'Stored procedure' }
    ],
    hints: ['IN parameter for input.', 'Syntax varies by database system.']
  }
];
