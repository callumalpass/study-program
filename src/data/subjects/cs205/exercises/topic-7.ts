import { CodingExercise } from '../../../../core/types';

export const cs205Topic7Exercises: CodingExercise[] = [
  {
    id: 'cs205-ex-7-1',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Basic EXPLAIN',
    description: 'Write the SQL to get the execution plan for a query selecting all orders from 2024.',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Get execution plan\n',
    solution: 'EXPLAIN\nSELECT *\nFROM Orders\nWHERE OrderDate >= \'2024-01-01\'\n  AND OrderDate < \'2025-01-01\';',
    testCases: [
      { input: 'explain', expectedOutput: 'Execution plan shown', isHidden: false, description: 'Basic EXPLAIN' }
    ],
    hints: ['EXPLAIN precedes the query.', 'Shows how database will execute.']
  },
  {
    id: 'cs205-ex-7-2',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'EXPLAIN ANALYZE',
    description: 'Write SQL to get actual execution statistics (run the query and show real timings).',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Get actual execution stats\n',
    solution: 'EXPLAIN ANALYZE\nSELECT c.Name, COUNT(o.OrderID) AS OrderCount\nFROM Customers c\nLEFT JOIN Orders o ON c.CustomerID = o.CustomerID\nGROUP BY c.CustomerID, c.Name;',
    testCases: [
      { input: 'explain', expectedOutput: 'Actual timings shown', isHidden: false, description: 'EXPLAIN ANALYZE' }
    ],
    hints: ['ANALYZE actually runs the query.', 'Shows estimated vs actual rows.']
  },
  {
    id: 'cs205-ex-7-3',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Rewrite with Exists',
    description: 'Rewrite this query using EXISTS instead of IN for better performance: SELECT * FROM Customers WHERE CustomerID IN (SELECT CustomerID FROM Orders)',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Original uses IN subquery\n-- Rewrite with EXISTS:\n',
    solution: 'SELECT *\nFROM Customers c\nWHERE EXISTS (\n    SELECT 1\n    FROM Orders o\n    WHERE o.CustomerID = c.CustomerID\n);',
    testCases: [
      { input: 'query', expectedOutput: 'Same results, potentially faster', isHidden: false, description: 'EXISTS rewrite' }
    ],
    hints: ['EXISTS stops at first match.', 'SELECT 1 is efficient - value doesn\'t matter.']
  },
  {
    id: 'cs205-ex-7-4',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Avoid SELECT *',
    description: 'Rewrite this query to select only needed columns: SELECT * FROM Products WHERE Category = \'Electronics\' (need Name, Price, Stock)',
    difficulty: 1,
    language: 'sql',
    starterCode: '-- Original: SELECT * FROM Products WHERE Category = \'Electronics\'\n-- Optimized:\n',
    solution: 'SELECT Name, Price, Stock\nFROM Products\nWHERE Category = \'Electronics\';',
    testCases: [
      { input: 'query', expectedOutput: 'Only needed columns', isHidden: false, description: 'Column selection' }
    ],
    hints: ['SELECT * reads all columns.', 'Explicit columns enable covering indexes.']
  },
  {
    id: 'cs205-ex-7-5',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Sargable WHERE',
    description: 'Rewrite this non-sargable query to use an index: SELECT * FROM Orders WHERE YEAR(OrderDate) = 2024',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Non-sargable (can\'t use index on OrderDate):\n-- SELECT * FROM Orders WHERE YEAR(OrderDate) = 2024\n-- \n-- Sargable version:\n',
    solution: 'SELECT *\nFROM Orders\nWHERE OrderDate >= \'2024-01-01\'\n  AND OrderDate < \'2025-01-01\';\n\n-- This is sargable because:\n-- 1. No function applied to the indexed column\n-- 2. Can use range scan on OrderDate index\n-- 3. Much faster than scanning all rows and applying YEAR()',
    testCases: [
      { input: 'query', expectedOutput: 'Index-friendly query', isHidden: false, description: 'Sargable predicate' }
    ],
    hints: ['Don\'t apply functions to indexed columns.', 'Use range conditions instead.']
  },
  {
    id: 'cs205-ex-7-6',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Join Order Analysis',
    description: 'Given tables: Orders (1M rows), Customers (10K rows), OrderItems (5M rows). What join order is optimal for: Customers JOIN Orders JOIN OrderItems?',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Analyze optimal join order:\n-- ',
    solution: '-- Optimal order: Customers -> Orders -> OrderItems\n-- \n-- Reasoning:\n-- 1. Start with smallest table (Customers: 10K rows)\n-- 2. Join to Orders (1M rows) - result filtered by customer\n-- 3. Finally join OrderItems (5M rows)\n-- \n-- Alternative if filtering Orders:\n-- If WHERE clause filters Orders significantly,\n-- may be better to start there.\n-- \n-- The optimizer usually handles this, but hints can help:\n-- SELECT /*+ LEADING(c o oi) */ ...\n-- FROM Customers c\n-- JOIN Orders o ON c.CustomerID = o.CustomerID\n-- JOIN OrderItems oi ON o.OrderID = oi.OrderID',
    testCases: [
      { input: 'analysis', expectedOutput: 'Optimal order identified', isHidden: false, description: 'Join ordering' }
    ],
    hints: ['Start with smallest table.', 'Consider filter selectivity.']
  },
  {
    id: 'cs205-ex-7-7',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Correlated to Join',
    description: 'Rewrite this correlated subquery as a JOIN: SELECT e.Name, (SELECT d.DeptName FROM Departments d WHERE d.DeptID = e.DeptID) FROM Employees e',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Rewrite as JOIN:\n',
    solution: 'SELECT e.Name, d.DeptName\nFROM Employees e\nLEFT JOIN Departments d ON e.DeptID = d.DeptID;\n\n-- Why this is better:\n-- 1. Correlated subquery executes once per row\n-- 2. JOIN is set-based, processes all at once\n-- 3. Optimizer can choose optimal join algorithm',
    testCases: [
      { input: 'query', expectedOutput: 'Join version', isHidden: false, description: 'Subquery to join' }
    ],
    hints: ['LEFT JOIN handles null matches.', 'JOINs are usually more efficient than correlated subqueries.']
  },
  {
    id: 'cs205-ex-7-8',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Pagination Optimization',
    description: 'Optimize this pagination query: SELECT * FROM Products ORDER BY ProductID LIMIT 10 OFFSET 100000',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Original: SELECT * FROM Products ORDER BY ProductID LIMIT 10 OFFSET 100000\n-- Problem: Must scan 100,000 rows then discard\n-- \n-- Optimized keyset pagination:\n',
    solution: '-- Keyset pagination (seek method):\nSELECT *\nFROM Products\nWHERE ProductID > 100000  -- last seen ID\nORDER BY ProductID\nLIMIT 10;\n\n-- Benefits:\n-- 1. Uses index seek, not scan\n-- 2. Consistent performance regardless of page\n-- 3. Doesn\'t skip rows (OFFSET can miss concurrent inserts)\n-- \n-- Requires: knowing last ProductID from previous page\n-- Frontend stores last ID, passes to next request',
    testCases: [
      { input: 'query', expectedOutput: 'Keyset pagination', isHidden: false, description: 'Efficient paging' }
    ],
    hints: ['OFFSET scans then discards.', 'Keyset uses index seek.']
  },
  {
    id: 'cs205-ex-7-9',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'UNION vs UNION ALL',
    description: 'Explain when to use UNION ALL instead of UNION. Provide an example where UNION ALL is correct and faster.',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- UNION vs UNION ALL analysis:\n-- ',
    solution: '-- UNION: removes duplicates (requires sort/hash)\n-- UNION ALL: keeps all rows (no dedup overhead)\n-- \n-- Use UNION ALL when:\n-- 1. Source queries can\'t produce duplicates\n-- 2. Duplicates are acceptable\n-- 3. Performance is critical\n-- \n-- Example: Combining exclusive categories\nSELECT ProductID, Name, \'Electronics\' AS Source\nFROM Products\nWHERE Category = \'Electronics\'\nUNION ALL\nSELECT ProductID, Name, \'Books\'\nFROM Products\nWHERE Category = \'Books\';\n-- No duplicates possible - same product can\'t be in both categories',
    testCases: [
      { input: 'analysis', expectedOutput: 'Clear comparison', isHidden: false, description: 'UNION optimization' }
    ],
    hints: ['UNION sorts to remove duplicates.', 'UNION ALL is always faster.']
  },
  {
    id: 'cs205-ex-7-10',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Batch Processing',
    description: 'Rewrite this delete to process in batches: DELETE FROM Logs WHERE LogDate < \'2020-01-01\'',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Original deletes all at once (locks table, fills log)\n-- Batch version:\n',
    solution: '-- Batch delete (run repeatedly until 0 rows affected):\nDELETE FROM Logs\nWHERE LogID IN (\n    SELECT LogID\n    FROM Logs\n    WHERE LogDate < \'2020-01-01\'\n    LIMIT 10000\n);\n\n-- Or with CTE (PostgreSQL):\nWITH to_delete AS (\n    SELECT LogID\n    FROM Logs\n    WHERE LogDate < \'2020-01-01\'\n    LIMIT 10000\n)\nDELETE FROM Logs\nWHERE LogID IN (SELECT LogID FROM to_delete);\n\n-- Benefits:\n-- 1. Smaller transactions\n-- 2. Less lock contention\n-- 3. Can pause/resume\n-- 4. Doesn\'t overflow transaction log',
    testCases: [
      { input: 'query', expectedOutput: 'Batched delete', isHidden: false, description: 'Batch processing' }
    ],
    hints: ['LIMIT controls batch size.', 'Run in loop until done.']
  },
  {
    id: 'cs205-ex-7-11',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Index Hint',
    description: 'Write a query that forces use of a specific index idx_orders_customer (syntax varies by database).',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Force index usage\n',
    solution: '-- MySQL:\nSELECT *\nFROM Orders FORCE INDEX (idx_orders_customer)\nWHERE CustomerID = 123;\n\n-- PostgreSQL (set planner cost):\nSET enable_seqscan = OFF;  -- Discourage table scan\nSELECT * FROM Orders WHERE CustomerID = 123;\n\n-- SQL Server:\nSELECT *\nFROM Orders WITH (INDEX(idx_orders_customer))\nWHERE CustomerID = 123;\n\n-- Oracle:\nSELECT /*+ INDEX(Orders idx_orders_customer) */ *\nFROM Orders\nWHERE CustomerID = 123;',
    testCases: [
      { input: 'query', expectedOutput: 'Index hint applied', isHidden: false, description: 'Index hints' }
    ],
    hints: ['Syntax is database-specific.', 'Use sparingly - optimizer usually knows best.']
  },
  {
    id: 'cs205-ex-7-12',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Eliminate Sort',
    description: 'Given an index on (CustomerID, OrderDate), rewrite this query to avoid a sort: SELECT * FROM Orders WHERE CustomerID = 5 ORDER BY OrderDate DESC',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Current query may need to sort\n-- Optimized version:\n',
    solution: '-- If index is (CustomerID, OrderDate ASC), this needs a sort:\n-- SELECT * FROM Orders WHERE CustomerID = 5 ORDER BY OrderDate DESC\n\n-- Solution 1: Create descending index\n-- CREATE INDEX idx_orders_cust_date_desc \n-- ON Orders(CustomerID, OrderDate DESC);\n\n-- Solution 2: Accept ASC order if business allows\nSELECT *\nFROM Orders\nWHERE CustomerID = 5\nORDER BY OrderDate ASC;  -- Matches index direction\n\n-- The query can use index backward scan in some DBs:\n-- PostgreSQL: Can scan B-tree in either direction\n-- So original query may not need explicit DESC index',
    testCases: [
      { input: 'query', expectedOutput: 'Sort-free query', isHidden: false, description: 'Avoid sorting' }
    ],
    hints: ['Index order must match ORDER BY.', 'Some DBs support backward index scans.']
  },
  {
    id: 'cs205-ex-7-13',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Materialized View',
    description: 'Create a materialized view for a slow aggregation query showing total sales per product category.',
    difficulty: 3,
    language: 'sql',
    starterCode: '-- Create materialized view for category sales\n',
    solution: '-- PostgreSQL syntax:\nCREATE MATERIALIZED VIEW mv_category_sales AS\nSELECT p.Category,\n       COUNT(DISTINCT o.OrderID) AS OrderCount,\n       SUM(oi.Quantity) AS TotalQuantity,\n       SUM(oi.Quantity * oi.Price) AS TotalRevenue\nFROM Products p\nJOIN OrderItems oi ON p.ProductID = oi.ProductID\nJOIN Orders o ON oi.OrderID = o.OrderID\nGROUP BY p.Category;\n\n-- Create index on materialized view:\nCREATE INDEX idx_mv_category ON mv_category_sales(Category);\n\n-- Refresh when data changes:\nREFRESH MATERIALIZED VIEW mv_category_sales;\n\n-- Query the view (fast!):\nSELECT * FROM mv_category_sales WHERE Category = \'Electronics\';',
    testCases: [
      { input: 'view', expectedOutput: 'Materialized view created', isHidden: false, description: 'Mat view' }
    ],
    hints: ['Materialized views store computed results.', 'Must refresh when base data changes.']
  },
  {
    id: 'cs205-ex-7-14',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'Query Plan Analysis',
    description: 'Analyze this plan output: Seq Scan on orders (cost=0.00..15000.00 rows=500000). What does it tell you?',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Plan: Seq Scan on orders (cost=0.00..15000.00 rows=500000)\n-- Analysis:\n-- ',
    solution: '-- Plan Analysis:\n-- \n-- Seq Scan = Sequential Scan (full table scan)\n-- - Reading ALL rows from disk\n-- - No index is being used\n-- \n-- cost=0.00..15000.00\n-- - Startup cost: 0.00 (begins returning rows immediately)\n-- - Total cost: 15000.00 (arbitrary units)\n-- \n-- rows=500000\n-- - Estimated rows to return\n-- \n-- Problem indicators:\n-- 1. Seq Scan on large table is often bad\n-- 2. High row count suggests missing WHERE or no index\n-- \n-- Solutions:\n-- 1. Add index on filtered columns\n-- 2. Add WHERE clause to reduce rows\n-- 3. Check if statistics are up to date (ANALYZE)',
    testCases: [
      { input: 'analysis', expectedOutput: 'Clear interpretation', isHidden: false, description: 'Plan reading' }
    ],
    hints: ['Seq Scan = no index used.', 'Cost is relative, not milliseconds.']
  },
  {
    id: 'cs205-ex-7-15',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'OR to UNION',
    description: 'Rewrite this OR query as UNION for better index usage: SELECT * FROM Products WHERE Category = \'A\' OR Price < 10',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- Original: SELECT * FROM Products WHERE Category = \'A\' OR Price < 10\n-- This may not use indexes well\n-- \n-- UNION version:\n',
    solution: 'SELECT * FROM Products WHERE Category = \'A\'\nUNION\nSELECT * FROM Products WHERE Price < 10;\n\n-- Why this can be better:\n-- 1. Each SELECT can use its own index:\n--    - idx_products_category for first query\n--    - idx_products_price for second query\n-- 2. OR often causes table scan\n-- \n-- Note: UNION removes duplicates (products matching both)\n-- If duplicates are OK and you have covering indexes:\n-- Use UNION ALL for even better performance\n-- \n-- Modern optimizers may do this automatically (index merge)',
    testCases: [
      { input: 'query', expectedOutput: 'UNION version', isHidden: false, description: 'OR optimization' }
    ],
    hints: ['OR on different columns prevents single index use.', 'UNION lets each part use optimal index.']
  },
  {
    id: 'cs205-ex-7-16',
    subjectId: 'cs205',
    topicId: 'cs205-7',
    title: 'CTE vs Subquery',
    description: 'Rewrite using CTE and explain when CTEs help performance: SELECT * FROM Orders WHERE CustomerID IN (SELECT CustomerID FROM VIPCustomers)',
    difficulty: 2,
    language: 'sql',
    starterCode: '-- CTE version:\n',
    solution: 'WITH VIPs AS (\n    SELECT CustomerID\n    FROM VIPCustomers\n)\nSELECT o.*\nFROM Orders o\nJOIN VIPs v ON o.CustomerID = v.CustomerID;\n\n-- When CTEs help:\n-- 1. Readability - named intermediate results\n-- 2. Reuse - reference same CTE multiple times\n-- 3. Recursive queries - only way to do it\n-- \n-- Performance notes:\n-- - PostgreSQL < 12: CTEs were optimization barriers\n-- - PostgreSQL 12+: CTEs can be inlined\n-- - Most DBs: optimizer treats CTE like subquery\n-- \n-- When CTEs hurt:\n-- - Forcing materialization when not needed\n-- - Preventing predicate pushdown (older PostgreSQL)\n-- \n-- For this query, JOIN is likely same performance as IN subquery',
    testCases: [
      { input: 'query', expectedOutput: 'CTE version with explanation', isHidden: false, description: 'CTE usage' }
    ],
    hints: ['CTEs improve readability.', 'Modern optimizers inline CTEs.']
  }
];
