import { Exam } from '../../../core/types';

export const cs205Exams: Exam[] = [
  {
    id: 'cs205-exam-midterm',
    subjectId: 'cs205',
    title: 'CS205 Midterm Exam',
    durationMinutes: 90,
    instructions: [
      'This exam covers Relational Model, SQL Fundamentals, Advanced SQL, and Normalization.',
      'Answer all questions.',
      'SQL syntax should follow standard SQL conventions.',
      'For normalization questions, show your work including FDs and decomposition steps.'
    ],
    questions: [
      // ========== Topic 1: Relational Model (6 questions) ==========
      {
        id: 'mid-q1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a property of a relation in the relational model?',
        options: ['Rows are unique', 'Order of rows matters', 'Attributes are atomic', 'Each column has a distinct name'],
        correctAnswer: 1,
        explanation: 'In the relational model, the order of tuples (rows) is irrelevant; relations are sets of tuples.'
      },
      {
        id: 'mid-q2',
        type: 'multiple_choice',
        prompt: 'A superkey is:',
        options: [
          'A minimal key with no redundant attributes',
          'Any set of attributes that uniquely identifies tuples',
          'The primary key only',
          'A foreign key reference'
        ],
        correctAnswer: 1,
        explanation: 'A superkey is any set of attributes that uniquely identifies tuples. A candidate key is a minimal superkey.'
      },
      {
        id: 'mid-q3',
        type: 'true_false',
        prompt: 'In ER diagrams, a diamond shape represents an entity.',
        correctAnswer: false,
        explanation: 'Diamonds represent relationships. Rectangles represent entities, and ovals represent attributes.'
      },
      {
        id: 'mid-q4',
        type: 'multiple_choice',
        prompt: 'Which cardinality represents "an employee works in exactly one department"?',
        options: ['Many-to-many', '1:N from Department to Employee', '1:1', 'N:M'],
        correctAnswer: 1,
        explanation: 'Each employee belongs to one department, but a department can have many employees: 1:N from Department to Employee.'
      },
      {
        id: 'mid-q5',
        type: 'fill_blank',
        prompt: 'The relational algebra operation that selects specific columns is called ______.',
        correctAnswer: 'projection',
        explanation: 'Projection (π) selects attributes (columns), while selection (σ) filters tuples (rows).'
      },
      {
        id: 'mid-q6',
        type: 'multiple_choice',
        prompt: 'Which relational algebra operation corresponds to SQL\'s UNION?',
        options: ['Join (⋈)', 'Union (∪)', 'Intersection (∩)', 'Selection (σ)'],
        correctAnswer: 1,
        explanation: 'The union operation combines tuples from two relations, removing duplicates.'
      },

      // ========== Topic 2: SQL Fundamentals (7 questions) ==========
      {
        id: 'mid-q7',
        type: 'multiple_choice',
        prompt: 'Which SQL statement is used to add a new row to a table?',
        options: ['ADD', 'CREATE', 'INSERT', 'APPEND'],
        correctAnswer: 2,
        explanation: 'INSERT INTO table VALUES (...) or INSERT INTO table (columns) VALUES (...) adds new rows.'
      },
      {
        id: 'mid-q8',
        type: 'code_output',
        prompt: 'What does this query return?',
        codeSnippet: `SELECT COUNT(DISTINCT Department) FROM Employees;`,
        options: [
          'Total number of employees',
          'Number of unique departments',
          'Department names',
          'Error - invalid syntax'
        ],
        correctAnswer: 1,
        explanation: 'COUNT(DISTINCT column) counts the number of unique non-NULL values in the column.'
      },
      {
        id: 'mid-q9',
        type: 'true_false',
        prompt: 'The WHERE clause is evaluated before the GROUP BY clause.',
        correctAnswer: true,
        explanation: 'Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE filters before grouping.'
      },
      {
        id: 'mid-q10',
        type: 'multiple_choice',
        prompt: 'To filter groups after aggregation, which clause should be used?',
        options: ['WHERE', 'HAVING', 'FILTER', 'CONDITION'],
        correctAnswer: 1,
        explanation: 'HAVING filters groups after GROUP BY, while WHERE filters individual rows before grouping.'
      },
      {
        id: 'mid-q11',
        type: 'code_output',
        prompt: 'What is wrong with this query?',
        codeSnippet: `SELECT Department, Name, AVG(Salary)
FROM Employees
GROUP BY Department;`,
        options: [
          'Nothing wrong',
          'Name must be in GROUP BY or an aggregate',
          'AVG cannot be used with GROUP BY',
          'FROM should come before SELECT'
        ],
        correctAnswer: 1,
        explanation: 'Non-aggregated columns in SELECT (Name) must appear in GROUP BY for a valid grouping.'
      },
      {
        id: 'mid-q12',
        type: 'fill_blank',
        prompt: 'The SQL keyword to remove duplicate rows from results is ______.',
        correctAnswer: 'DISTINCT',
        explanation: 'SELECT DISTINCT eliminates duplicate rows from the result set.'
      },
      {
        id: 'mid-q13',
        type: 'multiple_choice',
        prompt: 'Which constraint ensures values in a column match values in another table?',
        options: ['PRIMARY KEY', 'UNIQUE', 'FOREIGN KEY', 'CHECK'],
        correctAnswer: 2,
        explanation: 'FOREIGN KEY establishes referential integrity between tables.'
      },

      // ========== Topic 3: Advanced SQL (7 questions) ==========
      {
        id: 'mid-q14',
        type: 'multiple_choice',
        prompt: 'Which JOIN returns rows even when there is no match in the right table?',
        options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'CROSS JOIN'],
        correctAnswer: 2,
        explanation: 'LEFT JOIN returns all left table rows with matching right rows or NULL when no match exists.'
      },
      {
        id: 'mid-q15',
        type: 'code_output',
        prompt: 'What does this query find?',
        codeSnippet: `SELECT * FROM Employees E
WHERE NOT EXISTS (
    SELECT 1 FROM Orders O
    WHERE O.SalesRepID = E.EmployeeID
);`,
        options: [
          'Employees with orders',
          'Employees without any orders',
          'All orders',
          'Employee-order pairs'
        ],
        correctAnswer: 1,
        explanation: 'NOT EXISTS returns rows where the subquery produces no results—employees with no matching orders.'
      },
      {
        id: 'mid-q16',
        type: 'true_false',
        prompt: 'A correlated subquery is executed once for each row in the outer query.',
        correctAnswer: true,
        explanation: 'Correlated subqueries reference outer query columns and must be re-evaluated for each outer row.'
      },
      {
        id: 'mid-q17',
        type: 'multiple_choice',
        prompt: 'UNION vs UNION ALL: which is faster and why?',
        options: [
          'UNION is faster; it uses indexes',
          'UNION ALL is faster; it doesn\'t remove duplicates',
          'They have identical performance',
          'UNION ALL is slower due to extra processing'
        ],
        correctAnswer: 1,
        explanation: 'UNION ALL simply concatenates results without the overhead of sorting and deduplication.'
      },
      {
        id: 'mid-q18',
        type: 'multiple_choice',
        prompt: 'Which window function assigns ranks with gaps after ties?',
        options: ['ROW_NUMBER()', 'RANK()', 'DENSE_RANK()', 'NTILE()'],
        correctAnswer: 1,
        explanation: 'RANK() leaves gaps after ties (1,1,3), while DENSE_RANK() doesn\'t (1,1,2).'
      },
      {
        id: 'mid-q19',
        type: 'code_output',
        prompt: 'What does PARTITION BY do in this query?',
        codeSnippet: `SELECT Name, Department,
       AVG(Salary) OVER (PARTITION BY Department)
FROM Employees;`,
        options: [
          'Sorts results by department',
          'Calculates average across all employees',
          'Calculates average separately for each department',
          'Filters by department'
        ],
        correctAnswer: 2,
        explanation: 'PARTITION BY divides rows into groups; the window function operates within each partition.'
      },
      {
        id: 'mid-q20',
        type: 'fill_blank',
        prompt: 'A recursive CTE requires ______ ALL to combine anchor and recursive members.',
        correctAnswer: 'UNION',
        explanation: 'Recursive CTEs use UNION ALL (typically) to combine the base case with recursive results.'
      },

      // ========== Topic 4: Normalization (6 questions) ==========
      {
        id: 'mid-q21',
        type: 'multiple_choice',
        prompt: 'Which normal form requires elimination of partial dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 1,
        explanation: '2NF eliminates partial dependencies—attributes depending on only part of a composite key.'
      },
      {
        id: 'mid-q22',
        type: 'multiple_choice',
        prompt: 'If A → B and B → C, then A → C by which rule?',
        options: ['Reflexivity', 'Augmentation', 'Transitivity', 'Decomposition'],
        correctAnswer: 2,
        explanation: 'Transitivity is one of Armstrong\'s axioms: if A→B and B→C, then A→C.'
      },
      {
        id: 'mid-q23',
        type: 'true_false',
        prompt: 'A relation in BCNF is always in 3NF.',
        correctAnswer: true,
        explanation: 'BCNF is stricter than 3NF, so any BCNF relation automatically satisfies 3NF requirements.'
      },
      {
        id: 'mid-q24',
        type: 'multiple_choice',
        prompt: 'Given R(A,B,C,D) with FDs: A→B, A→C, C→D. What is the candidate key?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'A⁺ = {A,B,C,D} since A→B, A→C, and C→D. A determines all attributes, so A is a candidate key.'
      },
      {
        id: 'mid-q25',
        type: 'fill_blank',
        prompt: 'A decomposition is ______ if the original relation can be reconstructed by natural join.',
        correctAnswer: 'lossless',
        explanation: 'Lossless (lossless-join) decomposition guarantees no information is lost.'
      },
      {
        id: 'mid-q26',
        type: 'multiple_choice',
        prompt: 'A transitive dependency X → Y → Z where Y is not a superkey violates:',
        options: ['1NF', '2NF', '3NF', 'All normal forms'],
        correctAnswer: 2,
        explanation: '3NF eliminates transitive dependencies where non-key attributes depend on other non-key attributes.'
      }
    ]
  },
  {
    id: 'cs205-exam-final',
    subjectId: 'cs205',
    title: 'CS205 Final Exam',
    durationMinutes: 120,
    instructions: [
      'This exam is comprehensive, covering all course material.',
      'Topics 1-4 have lighter coverage; Topics 5-7 are emphasized.',
      'Answer all questions.',
      'Show your work for optimization and transaction analysis questions.'
    ],
    questions: [
      // ========== Review: Topics 1-4 (10 questions) ==========
      {
        id: 'fin-q1',
        type: 'multiple_choice',
        prompt: 'Which key can have NULL values?',
        options: ['Primary key', 'Candidate key', 'Foreign key', 'Superkey'],
        correctAnswer: 2,
        explanation: 'Foreign keys can be NULL (no reference), while primary/candidate keys cannot be NULL.'
      },
      {
        id: 'fin-q2',
        type: 'true_false',
        prompt: 'Natural join automatically removes duplicate columns from the result.',
        correctAnswer: true,
        explanation: 'Natural join matches columns with the same name and includes each only once in the result.'
      },
      {
        id: 'fin-q3',
        type: 'multiple_choice',
        prompt: 'What does the CHECK constraint do?',
        options: [
          'Ensures foreign key references are valid',
          'Enforces a boolean condition on column values',
          'Guarantees uniqueness',
          'Prevents NULL values'
        ],
        correctAnswer: 1,
        explanation: 'CHECK enforces that column values satisfy a specified condition (e.g., Price > 0).'
      },
      {
        id: 'fin-q4',
        type: 'fill_blank',
        prompt: 'In SQL, ______ removes all rows from a table without logging individual deletions.',
        correctAnswer: 'TRUNCATE',
        explanation: 'TRUNCATE is faster than DELETE for removing all rows and cannot be easily rolled back.'
      },
      {
        id: 'fin-q5',
        type: 'multiple_choice',
        prompt: 'In a window function, what does ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING define?',
        options: [
          'Current row only',
          'A 3-row window centered on current row',
          'All preceding rows',
          'All following rows'
        ],
        correctAnswer: 1,
        explanation: 'This frame includes the previous row, current row, and next row—3 rows total.'
      },
      {
        id: 'fin-q6',
        type: 'true_false',
        prompt: 'A derived attribute should be stored directly in a normalized table.',
        correctAnswer: false,
        explanation: 'Derived attributes (e.g., Age from BirthDate) introduce redundancy and should be computed when needed.'
      },
      {
        id: 'fin-q7',
        type: 'multiple_choice',
        prompt: 'Which normal form handles multi-valued dependencies?',
        options: ['3NF', 'BCNF', '4NF', '5NF'],
        correctAnswer: 2,
        explanation: '4NF addresses multi-valued dependencies that BCNF does not handle.'
      },
      {
        id: 'fin-q8',
        type: 'code_output',
        prompt: 'What type of subquery is this?',
        codeSnippet: `SELECT Name FROM Employees E
WHERE Salary > (
    SELECT AVG(Salary) FROM Employees
    WHERE DeptID = E.DeptID
);`,
        options: ['Scalar subquery', 'Correlated subquery', 'Derived table', 'Uncorrelated subquery'],
        correctAnswer: 1,
        explanation: 'The subquery references E.DeptID from the outer query, making it correlated.'
      },
      {
        id: 'fin-q9',
        type: 'multiple_choice',
        prompt: 'Armstrong\'s axioms include all EXCEPT:',
        options: ['Reflexivity', 'Augmentation', 'Transitivity', 'Normalization'],
        correctAnswer: 3,
        explanation: 'Armstrong\'s axioms are Reflexivity, Augmentation, and Transitivity. Normalization is a process, not an axiom.'
      },
      {
        id: 'fin-q10',
        type: 'fill_blank',
        prompt: 'The operation R - S in relational algebra is called set ______.',
        correctAnswer: 'difference',
        explanation: 'Set difference returns tuples in R that are not in S.'
      },

      // ========== Topic 5: Transactions and ACID (10 questions) ==========
      {
        id: 'fin-q11',
        type: 'multiple_choice',
        prompt: 'Which ACID property is violated if a transaction can read uncommitted data?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctAnswer: 2,
        explanation: 'Reading uncommitted data (dirty read) violates Isolation between concurrent transactions.'
      },
      {
        id: 'fin-q12',
        type: 'true_false',
        prompt: 'ROLLBACK undoes all changes made by the current transaction.',
        correctAnswer: true,
        explanation: 'ROLLBACK aborts the transaction and reverts all its modifications.'
      },
      {
        id: 'fin-q13',
        type: 'multiple_choice',
        prompt: 'Which isolation level provides the highest concurrency but lowest consistency?',
        options: ['SERIALIZABLE', 'REPEATABLE READ', 'READ COMMITTED', 'READ UNCOMMITTED'],
        correctAnswer: 3,
        explanation: 'READ UNCOMMITTED allows dirty reads, providing maximum concurrency but minimum isolation.'
      },
      {
        id: 'fin-q14',
        type: 'multiple_choice',
        prompt: 'A deadlock occurs when:',
        options: [
          'A transaction takes too long',
          'Two transactions wait for each other\'s locks',
          'A transaction reads uncommitted data',
          'A transaction updates too many rows'
        ],
        correctAnswer: 1,
        explanation: 'Deadlock is a circular wait where transactions hold locks that each other needs.'
      },
      {
        id: 'fin-q15',
        type: 'fill_blank',
        prompt: 'An exclusive lock is also called an ______ lock.',
        correctAnswer: 'X',
        explanation: 'Exclusive locks (X-locks) prevent any other lock on the same resource.'
      },
      {
        id: 'fin-q16',
        type: 'code_output',
        prompt: 'What problem does this scenario illustrate?\nT1: Read X (balance=100)\nT2: Read X (balance=100)\nT1: Write X = 100 - 50 = 50\nT2: Write X = 100 - 30 = 70',
        options: ['Dirty read', 'Lost update', 'Phantom read', 'Non-repeatable read'],
        correctAnswer: 1,
        explanation: 'T1\'s update is lost because T2 overwrites with a value based on stale data.'
      },
      {
        id: 'fin-q17',
        type: 'true_false',
        prompt: 'REPEATABLE READ prevents phantom reads in all database systems.',
        correctAnswer: false,
        explanation: 'Standard REPEATABLE READ allows phantoms. Only SERIALIZABLE (or MySQL\'s RR with gap locks) prevents them.'
      },
      {
        id: 'fin-q18',
        type: 'multiple_choice',
        prompt: 'SAVEPOINT allows you to:',
        options: [
          'Save the database to disk',
          'Create partial rollback points within a transaction',
          'Save query plans',
          'Create database backups'
        ],
        correctAnswer: 1,
        explanation: 'SAVEPOINT creates a named point to which you can partially rollback without aborting the entire transaction.'
      },
      {
        id: 'fin-q19',
        type: 'multiple_choice',
        prompt: 'Two-Phase Locking (2PL) guarantees:',
        options: ['No deadlocks', 'Serializability', 'Maximum concurrency', 'Minimum lock duration'],
        correctAnswer: 1,
        explanation: '2PL ensures serializability by requiring all locks be acquired before any are released.'
      },
      {
        id: 'fin-q20',
        type: 'fill_blank',
        prompt: 'Optimistic concurrency control checks for conflicts at ______ time.',
        correctAnswer: 'commit',
        explanation: 'Optimistic locking allows operations without locks and validates at commit time.'
      },

      // ========== Topic 6: Indexing and B-Trees (11 questions) ==========
      {
        id: 'fin-q21',
        type: 'multiple_choice',
        prompt: 'What is the typical time complexity for B-tree search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'B-tree search is O(log n) due to the balanced tree structure and high fanout.'
      },
      {
        id: 'fin-q22',
        type: 'true_false',
        prompt: 'B+ trees store data pointers in both internal and leaf nodes.',
        correctAnswer: false,
        explanation: 'B+ trees store data only in leaves; internal nodes contain only keys for navigation.'
      },
      {
        id: 'fin-q23',
        type: 'multiple_choice',
        prompt: 'Why are B+ tree leaves linked?',
        options: [
          'For faster insertions',
          'To enable efficient range queries',
          'To reduce tree height',
          'For better compression'
        ],
        correctAnswer: 1,
        explanation: 'Linked leaves allow sequential scanning for range queries without revisiting internal nodes.'
      },
      {
        id: 'fin-q24',
        type: 'multiple_choice',
        prompt: 'Hash indexes are NOT suitable for:',
        options: ['Equality comparisons', 'Range queries', 'Point lookups', 'Primary key lookups'],
        correctAnswer: 1,
        explanation: 'Hash indexes only support equality (=); they cannot efficiently handle ranges (<, >, BETWEEN).'
      },
      {
        id: 'fin-q25',
        type: 'fill_blank',
        prompt: 'An index on (A, B, C) can use the ______ prefix rule to support queries on A or (A, B).',
        correctAnswer: 'leftmost',
        explanation: 'Composite indexes support queries using leftmost columns: A, (A,B), or (A,B,C).'
      },
      {
        id: 'fin-q26',
        type: 'code_output',
        prompt: 'For index IDX(Status, OrderDate), which query can use the index efficiently?',
        codeSnippet: `A) WHERE OrderDate > '2024-01-01'
B) WHERE Status = 'Active'
C) WHERE OrderDate > '2024-01-01' AND Status = 'Active'
D) WHERE Status = 'Active' AND OrderDate > '2024-01-01'`,
        options: ['A only', 'B and D', 'A and C', 'B, C, and D'],
        correctAnswer: 3,
        explanation: 'Status is the leading column. Queries B, C, and D all start with or include Status.'
      },
      {
        id: 'fin-q27',
        type: 'true_false',
        prompt: 'A covering index can satisfy a query without accessing the base table.',
        correctAnswer: true,
        explanation: 'Covering indexes contain all columns needed, enabling index-only scans.'
      },
      {
        id: 'fin-q28',
        type: 'multiple_choice',
        prompt: 'Index fragmentation primarily affects:',
        options: [
          'Data integrity',
          'Sequential read performance',
          'Query syntax',
          'Table naming'
        ],
        correctAnswer: 1,
        explanation: 'Fragmentation causes non-contiguous pages, increasing I/O for sequential scans.'
      },
      {
        id: 'fin-q29',
        type: 'multiple_choice',
        prompt: 'When should you consider removing an index?',
        options: [
          'When it speeds up queries',
          'When it is never used but adds write overhead',
          'When the table is frequently read',
          'When the index is on a primary key'
        ],
        correctAnswer: 1,
        explanation: 'Unused indexes waste storage and slow down writes without providing any benefit.'
      },
      {
        id: 'fin-q30',
        type: 'fill_blank',
        prompt: 'A partial index only indexes rows that match a specified ______ condition.',
        correctAnswer: 'WHERE',
        explanation: 'Partial indexes use WHERE to filter which rows are indexed, reducing index size.'
      },
      {
        id: 'fin-q31',
        type: 'true_false',
        prompt: 'Creating an index on a function (e.g., LOWER(email)) allows index usage for WHERE LOWER(email) = ?',
        correctAnswer: true,
        explanation: 'Function-based (expression) indexes enable index usage when the exact expression is queried.'
      },

      // ========== Topic 7: Query Optimization (11 questions) ==========
      {
        id: 'fin-q32',
        type: 'multiple_choice',
        prompt: 'What does the query optimizer primarily try to minimize?',
        options: ['Memory usage', 'Estimated execution cost', 'Code complexity', 'Number of tables'],
        correctAnswer: 1,
        explanation: 'The optimizer chooses the plan with the lowest estimated cost (I/O and CPU).'
      },
      {
        id: 'fin-q33',
        type: 'true_false',
        prompt: 'EXPLAIN ANALYZE actually executes the query to show real statistics.',
        correctAnswer: true,
        explanation: 'EXPLAIN shows the plan; EXPLAIN ANALYZE executes and shows actual times and row counts.'
      },
      {
        id: 'fin-q34',
        type: 'multiple_choice',
        prompt: 'Which join type builds a hash table on one input?',
        options: ['Nested loop join', 'Merge join', 'Hash join', 'Index join'],
        correctAnswer: 2,
        explanation: 'Hash join builds a hash table on the smaller table and probes it with the larger table.'
      },
      {
        id: 'fin-q35',
        type: 'code_output',
        prompt: 'What execution plan issue does "Seq Scan" on a 10 million row table with a selective WHERE suggest?',
        codeSnippet: `Seq Scan on orders (rows=10000000)
  Filter: (customer_id = 123)`,
        options: [
          'The query is optimal',
          'Missing index on customer_id',
          'Too many columns selected',
          'Invalid SQL syntax'
        ],
        correctAnswer: 1,
        explanation: 'A sequential scan with a selective filter suggests a missing index on the filter column.'
      },
      {
        id: 'fin-q36',
        type: 'fill_blank',
        prompt: 'Moving WHERE conditions closer to base tables in the query plan is called predicate ______.',
        correctAnswer: 'pushdown',
        explanation: 'Predicate pushdown filters rows early, reducing data processed by later operators.'
      },
      {
        id: 'fin-q37',
        type: 'multiple_choice',
        prompt: 'Why is WHERE YEAR(date_column) = 2024 problematic for performance?',
        options: [
          'YEAR() is deprecated',
          'It prevents index usage on date_column',
          'It returns wrong results',
          'It requires more memory'
        ],
        correctAnswer: 1,
        explanation: 'Functions on columns prevent index use. Use: date_column >= \'2024-01-01\' AND date_column < \'2025-01-01\'.'
      },
      {
        id: 'fin-q38',
        type: 'true_false',
        prompt: 'Statistics help the optimizer estimate how many rows operations will produce.',
        correctAnswer: true,
        explanation: 'Statistics on value distribution enable accurate cardinality estimates for cost calculation.'
      },
      {
        id: 'fin-q39',
        type: 'multiple_choice',
        prompt: 'Subquery unnesting converts a correlated subquery into:',
        options: ['A view', 'A join', 'A procedure', 'An index'],
        correctAnswer: 1,
        explanation: 'Unnesting rewrites correlated subqueries as joins for more efficient execution.'
      },
      {
        id: 'fin-q40',
        type: 'code_output',
        prompt: 'What does this execution plan hint suggest?',
        codeSnippet: `Sort Method: external merge  Disk: 50000kB`,
        options: [
          'Sort was efficient',
          'Sort spilled to disk due to insufficient work_mem',
          'Data was already sorted',
          'No sort was needed'
        ],
        correctAnswer: 1,
        explanation: 'External merge sort with disk usage indicates work_mem was insufficient for in-memory sort.'
      },
      {
        id: 'fin-q41',
        type: 'multiple_choice',
        prompt: 'Which is the best approach to identify slow queries?',
        options: [
          'Guess based on query length',
          'Use slow query logs and pg_stat_statements',
          'Run all queries manually',
          'Check table sizes only'
        ],
        correctAnswer: 1,
        explanation: 'Database tools like slow query logs and statistics extensions identify actual slow queries.'
      },
      {
        id: 'fin-q42',
        type: 'fill_blank',
        prompt: 'The process of updating table statistics for the optimizer is typically done with the ______ command.',
        correctAnswer: 'ANALYZE',
        explanation: 'ANALYZE updates statistics used by the query optimizer for cost estimation.'
      }
    ]
  }
];
