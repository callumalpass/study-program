import { CodingExercise } from '../../../../core/types';

export const cs205Topic3Exercises: CodingExercise[] = [
  {
    id: 'cs205-ex-3-1',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'INNER JOIN',
    description: 'Write a query joining Orders and Customers to show OrderID, OrderDate, and CustomerName.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Join Orders and Customers\n',
    solution: 'SELECT o.OrderID, o.OrderDate, c.Name AS CustomerName\nFROM Orders o\nINNER JOIN Customers c ON o.CustomerID = c.CustomerID;',
    testCases: [
      { input: 'query', expectedOutput: 'Joined order and customer data', isHidden: false, description: 'Inner join' }
    ],
    hints: ['Use table aliases for clarity.', 'ON specifies the join condition.']
  },
  {
    id: 'cs205-ex-3-2',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'LEFT JOIN',
    description: 'Find all customers and their orders, including customers with no orders.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- All customers with orders\n',
    solution: 'SELECT c.CustomerID, c.Name, o.OrderID, o.OrderDate\nFROM Customers c\nLEFT JOIN Orders o ON c.CustomerID = o.CustomerID;',
    testCases: [
      { input: 'query', expectedOutput: 'All customers, orders may be NULL', isHidden: false, description: 'Left join' }
    ],
    hints: ['LEFT JOIN keeps all left table rows.', 'No match = NULL for right columns.']
  },
  {
    id: 'cs205-ex-3-3',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Self Join',
    description: 'Find pairs of employees in the same department (don\'t pair employee with themselves).',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Employee pairs in same department\n',
    solution: 'SELECT e1.Name AS Employee1, e2.Name AS Employee2, e1.DeptID\nFROM Employees e1\nJOIN Employees e2 ON e1.DeptID = e2.DeptID\nWHERE e1.EmpID < e2.EmpID;',
    testCases: [
      { input: 'query', expectedOutput: 'Employee pairs', isHidden: false, description: 'Self join' }
    ],
    hints: ['Join table with itself using aliases.', 'Use < to avoid duplicates and self-pairs.']
  },
  {
    id: 'cs205-ex-3-4',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Three Table Join',
    description: 'Join Orders, OrderItems, and Products to show OrderID, ProductName, and Quantity.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Three table join\n',
    solution: 'SELECT o.OrderID, p.ProductName, oi.Quantity\nFROM Orders o\nJOIN OrderItems oi ON o.OrderID = oi.OrderID\nJOIN Products p ON oi.ProductID = p.ProductID;',
    testCases: [
      { input: 'query', expectedOutput: 'Order details with product names', isHidden: false, description: 'Multi-table join' }
    ],
    hints: ['Chain JOINs one after another.', 'Each join needs its own ON condition.']
  },
  {
    id: 'cs205-ex-3-5',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Scalar Subquery',
    description: 'Find employees who earn more than the company-wide average salary.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Above average earners\n',
    solution: 'SELECT Name, Salary\nFROM Employees\nWHERE Salary > (SELECT AVG(Salary) FROM Employees);',
    testCases: [
      { input: 'query', expectedOutput: 'Employees above average', isHidden: false, description: 'Scalar subquery' }
    ],
    hints: ['Subquery returns single value.', 'Compare Salary to that value.']
  },
  {
    id: 'cs205-ex-3-6',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'IN Subquery',
    description: 'Find customers who have placed at least one order.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Customers with orders\n',
    solution: 'SELECT *\nFROM Customers\nWHERE CustomerID IN (\n    SELECT DISTINCT CustomerID FROM Orders\n);',
    testCases: [
      { input: 'query', expectedOutput: 'Customers with orders', isHidden: false, description: 'IN subquery' }
    ],
    hints: ['Subquery returns list of CustomerIDs.', 'IN checks if value is in that list.']
  },
  {
    id: 'cs205-ex-3-7',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'NOT EXISTS',
    description: 'Find products that have never been ordered.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Never ordered products\n',
    solution: 'SELECT *\nFROM Products p\nWHERE NOT EXISTS (\n    SELECT 1 FROM OrderItems oi\n    WHERE oi.ProductID = p.ProductID\n);',
    testCases: [
      { input: 'query', expectedOutput: 'Unordered products', isHidden: false, description: 'NOT EXISTS' }
    ],
    hints: ['EXISTS returns true if subquery has rows.', 'NOT EXISTS is the negation.']
  },
  {
    id: 'cs205-ex-3-8',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Correlated Subquery',
    description: 'For each employee, find their salary compared to their department average.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Salary vs department average\n',
    solution: 'SELECT e.Name, e.Salary, e.DeptID,\n       (SELECT AVG(Salary) FROM Employees\n        WHERE DeptID = e.DeptID) AS DeptAvgSalary\nFROM Employees e;',
    testCases: [
      { input: 'query', expectedOutput: 'Salary with dept average', isHidden: false, description: 'Correlated subquery' }
    ],
    hints: ['Subquery references outer query\'s DeptID.', 'Executes once per outer row.']
  },
  {
    id: 'cs205-ex-3-9',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'UNION',
    description: 'Combine active customers and active suppliers into one list (Name, Type).',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Combined list\n',
    solution: 'SELECT Name, \'Customer\' AS Type\nFROM Customers\nWHERE Status = \'Active\'\nUNION\nSELECT CompanyName, \'Supplier\'\nFROM Suppliers\nWHERE Status = \'Active\';',
    testCases: [
      { input: 'query', expectedOutput: 'Combined customers and suppliers', isHidden: false, description: 'UNION' }
    ],
    hints: ['UNION removes duplicates.', 'Column count and types must match.']
  },
  {
    id: 'cs205-ex-3-10',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'INTERSECT',
    description: 'Find products that are in both category "Electronics" AND on sale.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Products in both sets\n',
    solution: 'SELECT ProductID, Name\nFROM Products\nWHERE Category = \'Electronics\'\nINTERSECT\nSELECT ProductID, Name\nFROM Products\nWHERE OnSale = true;',
    testCases: [
      { input: 'query', expectedOutput: 'Electronics on sale', isHidden: false, description: 'INTERSECT' }
    ],
    hints: ['INTERSECT returns rows in both queries.', 'Same as AND for single table.']
  },
  {
    id: 'cs205-ex-3-11',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'ROW_NUMBER',
    description: 'Rank employees by salary within each department (highest = 1).',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Rank by salary per department\n',
    solution: 'SELECT Name, DeptID, Salary,\n       ROW_NUMBER() OVER (\n           PARTITION BY DeptID\n           ORDER BY Salary DESC\n       ) AS SalaryRank\nFROM Employees;',
    testCases: [
      { input: 'query', expectedOutput: 'Employees with rank', isHidden: false, description: 'ROW_NUMBER window' }
    ],
    hints: ['PARTITION BY groups the ranking.', 'ORDER BY determines rank order.']
  },
  {
    id: 'cs205-ex-3-12',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Running Total',
    description: 'Calculate a running total of order amounts by date.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Running total query\n',
    solution: 'SELECT OrderDate, Amount,\n       SUM(Amount) OVER (\n           ORDER BY OrderDate\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS RunningTotal\nFROM Orders;',
    testCases: [
      { input: 'query', expectedOutput: 'Orders with running total', isHidden: false, description: 'Running total' }
    ],
    hints: ['SUM as window function.', 'ROWS BETWEEN defines the frame.']
  },
  {
    id: 'cs205-ex-3-13',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'LAG Function',
    description: 'Show each order with the previous order\'s amount for comparison.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Current and previous amounts\n',
    solution: 'SELECT OrderID, OrderDate, Amount,\n       LAG(Amount, 1) OVER (ORDER BY OrderDate) AS PreviousAmount\nFROM Orders;',
    testCases: [
      { input: 'query', expectedOutput: 'Orders with previous amount', isHidden: false, description: 'LAG function' }
    ],
    hints: ['LAG gets previous row value.', 'First row will have NULL.']
  },
  {
    id: 'cs205-ex-3-14',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Top N Per Group',
    description: 'Find the top 3 highest paid employees in each department.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Top 3 per department\n',
    solution: 'WITH RankedEmployees AS (\n    SELECT Name, DeptID, Salary,\n           ROW_NUMBER() OVER (\n               PARTITION BY DeptID\n               ORDER BY Salary DESC\n           ) AS Rank\n    FROM Employees\n)\nSELECT * FROM RankedEmployees WHERE Rank <= 3;',
    testCases: [
      { input: 'query', expectedOutput: 'Top 3 per department', isHidden: false, description: 'Top N per group' }
    ],
    hints: ['Use CTE with ROW_NUMBER.', 'Filter on Rank in outer query.']
  },
  {
    id: 'cs205-ex-3-15',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Recursive CTE',
    description: 'Display an employee hierarchy showing each employee and their management level.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Employee hierarchy\n',
    solution: 'WITH RECURSIVE EmpHierarchy AS (\n    SELECT EmpID, Name, ManagerID, 1 AS Level\n    FROM Employees\n    WHERE ManagerID IS NULL\n    UNION ALL\n    SELECT e.EmpID, e.Name, e.ManagerID, h.Level + 1\n    FROM Employees e\n    JOIN EmpHierarchy h ON e.ManagerID = h.EmpID\n)\nSELECT * FROM EmpHierarchy ORDER BY Level, Name;',
    testCases: [
      { input: 'query', expectedOutput: 'Employee hierarchy', isHidden: false, description: 'Recursive CTE' }
    ],
    hints: ['Anchor: employees without manager.', 'Recursive: join employees to their managers.']
  },
  {
    id: 'cs205-ex-3-16',
    subjectId: 'cs205',
    topicId: 'cs205-3',
    title: 'Complex Analytics',
    description: 'Show each product\'s sales, category total, and percentage of category sales.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Product sales analysis\n',
    solution: 'SELECT p.ProductName, p.Category,\n       SUM(oi.Quantity * oi.Price) AS ProductSales,\n       SUM(SUM(oi.Quantity * oi.Price)) OVER (PARTITION BY p.Category) AS CategoryTotal,\n       ROUND(100.0 * SUM(oi.Quantity * oi.Price) /\n             SUM(SUM(oi.Quantity * oi.Price)) OVER (PARTITION BY p.Category), 2) AS PctOfCategory\nFROM Products p\nJOIN OrderItems oi ON p.ProductID = oi.ProductID\nGROUP BY p.ProductID, p.ProductName, p.Category;',
    testCases: [
      { input: 'query', expectedOutput: 'Product sales with percentages', isHidden: false, description: 'Complex analytics' }
    ],
    hints: ['Window function over aggregate.', 'SUM(SUM(...)) for category totals.']
  }
];
