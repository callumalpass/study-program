---
id: cs205-t3-sets
title: "Set Operations"
order: 3
---

# Set Operations

Set operations combine results from multiple queries. Understanding UNION, INTERSECT, and EXCEPT enables powerful data comparisons and combinations.

## UNION

Combines rows from two queries, removing duplicates:

```sql
-- All people (employees and customers)
SELECT Name, Email FROM Employees
UNION
SELECT Name, Email FROM Customers;

-- Requirements:
-- - Same number of columns
-- - Compatible data types
-- - Column names from first query
```

### UNION vs UNION ALL

```sql
-- UNION removes duplicates (slower)
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;

-- UNION ALL keeps all rows (faster)
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers;

-- Use UNION ALL when:
-- - You know there are no duplicates
-- - You want to keep duplicates
-- - Performance is critical
```

### Multiple UNIONs

```sql
SELECT Name, 'Customer' AS Type FROM Customers
UNION
SELECT Name, 'Supplier' AS Type FROM Suppliers
UNION
SELECT Name, 'Employee' AS Type FROM Employees;
```

### UNION with ORDER BY

ORDER BY applies to entire result:

```sql
SELECT Name, City FROM Customers
UNION
SELECT Name, City FROM Suppliers
ORDER BY City, Name;  -- Sorts combined result

-- Can't ORDER BY individual parts
-- (SELECT ... ORDER BY ...) UNION (SELECT ...) -- Not allowed in standard SQL
```

### UNION with Different Columns

```sql
-- Match column structure with padding/casting
SELECT CustomerID, Name, Email, Phone FROM Customers
UNION
SELECT SupplierID, CompanyName, ContactEmail, NULL FROM Suppliers;

-- Use CAST for type compatibility
SELECT ID, Name, CAST(CreatedDate AS DATE) AS Date FROM TableA
UNION
SELECT ID, Name, CAST(ModifiedDate AS DATE) AS Date FROM TableB;
```

## INTERSECT

Returns rows present in both queries:

```sql
-- Customers who are also employees
SELECT Name, Email FROM Customers
INTERSECT
SELECT Name, Email FROM Employees;

-- Cities with both customers and suppliers
SELECT City FROM Customers
INTERSECT
SELECT City FROM Suppliers;
```

### INTERSECT vs JOIN

```sql
-- INTERSECT approach
SELECT ProductID FROM ProductsInStock
INTERSECT
SELECT ProductID FROM PopularProducts;

-- JOIN approach (same result)
SELECT DISTINCT s.ProductID
FROM ProductsInStock s
JOIN PopularProducts p ON s.ProductID = p.ProductID;
```

### INTERSECT ALL

Keeps duplicates based on frequency:

```sql
-- If 'Widget' appears 3 times in A and 2 times in B
-- INTERSECT returns 1 'Widget'
-- INTERSECT ALL returns 2 'Widget'

SELECT Name FROM ProductsA
INTERSECT ALL
SELECT Name FROM ProductsB;
```

Note: Not all databases support INTERSECT ALL.

## EXCEPT (MINUS)

Returns rows in first query but not in second:

```sql
-- Customers who haven't placed orders
SELECT CustomerID FROM Customers
EXCEPT
SELECT CustomerID FROM Orders;

-- Products not in inventory
SELECT ProductID FROM Products
EXCEPT
SELECT ProductID FROM Inventory;
```

### EXCEPT vs NOT IN

```sql
-- EXCEPT approach
SELECT Email FROM Subscribers
EXCEPT
SELECT Email FROM Unsubscribed;

-- NOT IN approach
SELECT Email FROM Subscribers
WHERE Email NOT IN (SELECT Email FROM Unsubscribed);

-- LEFT JOIN approach
SELECT s.Email
FROM Subscribers s
LEFT JOIN Unsubscribed u ON s.Email = u.Email
WHERE u.Email IS NULL;
```

### Order Matters

```sql
-- A EXCEPT B ≠ B EXCEPT A

-- Customers not in Suppliers
SELECT Name FROM Customers
EXCEPT
SELECT Name FROM Suppliers;

-- Suppliers not in Customers
SELECT Name FROM Suppliers
EXCEPT
SELECT Name FROM Customers;
```

### EXCEPT ALL

Keeps duplicates:

```sql
SELECT Name FROM OldProducts
EXCEPT ALL
SELECT Name FROM CurrentProducts;
```

## Set Operation Properties

### Column Matching

```sql
-- Columns matched by position, not name
SELECT FirstName, LastName FROM Employees    -- 2 columns
UNION
SELECT CompanyName, ContactName FROM Suppliers;  -- 2 columns

-- Result uses first query's column names
-- FirstName, LastName (not CompanyName, ContactName)
```

### Type Compatibility

```sql
-- Types must be compatible (implicit conversion)
SELECT ID, Amount FROM Orders       -- INTEGER, DECIMAL
UNION
SELECT ID, Balance FROM Accounts;   -- INTEGER, DECIMAL  ✓

-- Explicit casting if needed
SELECT ID, CAST(DateValue AS VARCHAR) FROM TableA
UNION
SELECT ID, StringValue FROM TableB;
```

### NULL Handling

```sql
-- NULLs are compared as equal for duplicate removal
SELECT NULL AS Col1
UNION
SELECT NULL AS Col1;
-- Returns: 1 row with NULL

-- Same for INTERSECT
SELECT 1, NULL
INTERSECT
SELECT 1, NULL;
-- Returns: 1 row (1, NULL)
```

## Combining Set Operations

```sql
-- Precedence: INTERSECT before UNION/EXCEPT
SELECT * FROM A
UNION
SELECT * FROM B
INTERSECT
SELECT * FROM C;

-- Is evaluated as:
SELECT * FROM A
UNION
(SELECT * FROM B INTERSECT SELECT * FROM C);

-- Use parentheses for clarity
(SELECT * FROM A UNION SELECT * FROM B)
INTERSECT
SELECT * FROM C;
```

## Practical Examples

### Finding Differences

```sql
-- New customers this month (not in last month)
SELECT CustomerID FROM CustomersThisMonth
EXCEPT
SELECT CustomerID FROM CustomersLastMonth;

-- Lost customers (were active, now inactive)
SELECT CustomerID FROM ActiveCustomersLastMonth
EXCEPT
SELECT CustomerID FROM ActiveCustomersThisMonth;
```

### Combining Results with Source Tracking

```sql
-- All contacts with source
SELECT Name, Email, 'Customer' AS Source FROM Customers
UNION ALL
SELECT Name, Email, 'Supplier' AS Source FROM Suppliers
UNION ALL
SELECT Name, Email, 'Partner' AS Source FROM Partners;
```

### Finding Common Elements

```sql
-- Products available from all three suppliers
SELECT ProductID FROM SupplierA_Products
INTERSECT
SELECT ProductID FROM SupplierB_Products
INTERSECT
SELECT ProductID FROM SupplierC_Products;
```

### Data Validation

```sql
-- Find orphaned records
SELECT OrderID FROM OrderItems
EXCEPT
SELECT OrderID FROM Orders;

-- Find mismatched data between systems
SELECT CustomerID, Name FROM System1.Customers
EXCEPT
SELECT CustomerID, Name FROM System2.Customers;
```

### Report Generation

```sql
-- Quarterly sales with totals
SELECT Quarter, Region, SUM(Sales) AS TotalSales
FROM SalesData
GROUP BY Quarter, Region

UNION ALL

SELECT Quarter, 'ALL REGIONS' AS Region, SUM(Sales)
FROM SalesData
GROUP BY Quarter

UNION ALL

SELECT 'ALL QUARTERS' AS Quarter, 'ALL REGIONS' AS Region, SUM(Sales)
FROM SalesData;
```

## Performance Considerations

### UNION vs UNION ALL

```sql
-- UNION ALL is faster (no duplicate elimination)
-- Use when you know results don't overlap or want duplicates

-- Profile:
EXPLAIN SELECT Name FROM TableA UNION SELECT Name FROM TableB;
EXPLAIN SELECT Name FROM TableA UNION ALL SELECT Name FROM TableB;
```

### Index Usage

Set operations can use indexes on individual queries:

```sql
-- Each SELECT can use appropriate indexes
SELECT * FROM Orders WHERE Status = 'Pending'  -- Uses idx_status
UNION
SELECT * FROM Orders WHERE Total > 1000;       -- Uses idx_total (maybe)
```

### Alternatives

Sometimes joins or subqueries perform better:

```sql
-- Instead of INTERSECT, try EXISTS
SELECT * FROM A
WHERE EXISTS (SELECT 1 FROM B WHERE B.Key = A.Key);

-- Instead of EXCEPT, try NOT EXISTS
SELECT * FROM A
WHERE NOT EXISTS (SELECT 1 FROM B WHERE B.Key = A.Key);
```

