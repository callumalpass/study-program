# Advanced Normal Forms: 4NF, 5NF, and Beyond

While Third Normal Form (3NF) and Boyce-Codd Normal Form (BCNF) handle most practical normalization needs, certain data patterns require higher normal forms to eliminate all redundancy. This guide explores Fourth Normal Form (4NF), Fifth Normal Form (5NF), and related concepts for handling multi-valued dependencies and join dependencies.

## Multi-Valued Dependencies (MVDs)

Multi-valued dependencies extend the concept of functional dependencies to handle attributes that have multiple independent values.

### Definition

A multi-valued dependency X →→ Y holds in a relation R if, for every pair of tuples t1 and t2 with t1[X] = t2[X], there exist tuples t3 and t4 such that:
- t3[X] = t4[X] = t1[X]
- t3[Y] = t1[Y] and t3[R-X-Y] = t2[R-X-Y]
- t4[Y] = t2[Y] and t4[R-X-Y] = t1[R-X-Y]

### Understanding Through Example

Consider an Employee table tracking skills and languages:

```
Employee | Skill        | Language
---------|--------------|----------
Alice    | Java         | English
Alice    | Java         | French
Alice    | Python       | English
Alice    | Python       | French
Bob      | JavaScript   | Spanish
```

Here we have two independent multi-valued facts about Alice:
- Skills: {Java, Python}
- Languages: {English, French}

The multi-valued dependencies are:
- Employee →→ Skill
- Employee →→ Language

**The Problem**: To maintain consistency, every skill must be paired with every language for the same employee. If Alice learns German, we must add rows for (Alice, Java, German) AND (Alice, Python, German).

### Detecting MVDs

Signs of multi-valued dependencies:
1. Cartesian product of attribute sets appears in data
2. Adding one value requires adding multiple rows
3. Deleting one value requires careful row removal
4. Same attribute combinations repeated for every combination

## Fourth Normal Form (4NF)

### Definition

A relation is in 4NF if it is in BCNF and contains no non-trivial multi-valued dependencies.

A multi-valued dependency X →→ Y is trivial if:
- Y is a subset of X, OR
- X ∪ Y contains all attributes of the relation

### Converting to 4NF

The problematic Employee-Skill-Language relation violates 4NF. Decompose into:

**EmployeeSkills**:
```
Employee | Skill
---------|------------
Alice    | Java
Alice    | Python
Bob      | JavaScript
```

**EmployeeLanguages**:
```
Employee | Language
---------|----------
Alice    | English
Alice    | French
Bob      | Spanish
```

**Benefits**:
- Each fact stored once
- Adding a skill doesn't require adding language rows
- Independent facts are independent in the schema

### 4NF Decomposition Algorithm

1. Find a non-trivial MVD X →→ Y that violates 4NF
2. Decompose R into R1(X, Y) and R2(R - Y)
3. Repeat until all relations are in 4NF

**Lossless decomposition guaranteed** because MVDs satisfy:
- If X →→ Y in R, then R = R1 ⋈ R2 where R1 = π_{X,Y}(R) and R2 = π_{R-Y}(R)

## Join Dependencies

Join dependencies generalize both functional dependencies and multi-valued dependencies.

### Definition

A relation R satisfies a join dependency *{R1, R2, ..., Rn} if:
- R = R1 ⋈ R2 ⋈ ... ⋈ Rn
- Where each Ri is a projection of R

### Example: The Supplier-Parts-Projects Problem

Consider tracking which suppliers provide which parts to which projects:

```
Supplier | Part    | Project
---------|---------|----------
S1       | P1      | J1
S1       | P2      | J1
S1       | P1      | J2
S2       | P1      | J1
```

**Business Rule**: If supplier S supplies part P, and part P is used in project J, and supplier S supplies some part to project J, then S supplies P to J.

This creates a join dependency but not a multi-valued dependency:
- *{(Supplier, Part), (Part, Project), (Supplier, Project)}

## Fifth Normal Form (5NF) / Project-Join Normal Form

### Definition

A relation is in 5NF (also called Project-Join Normal Form or PJNF) if every non-trivial join dependency is implied by the candidate keys.

### When 5NF Matters

5NF violations are rare and occur when:
- A relation represents a complex ternary (or higher) relationship
- The relationship has cyclic constraints
- Decomposition reduces redundancy without data loss

### 5NF Decomposition Example

If the Supplier-Parts-Projects table has the join dependency described above, decompose into:

**SupplierParts**:
```
Supplier | Part
---------|------
S1       | P1
S1       | P2
S2       | P1
```

**PartProjects**:
```
Part | Project
-----|--------
P1   | J1
P2   | J1
P1   | J2
```

**SupplierProjects**:
```
Supplier | Project
---------|--------
S1       | J1
S1       | J2
S2       | J1
```

The original relation can be reconstructed by joining all three:
```sql
SELECT sp.Supplier, sp.Part, pp.Project
FROM SupplierParts sp
JOIN PartProjects pp ON sp.Part = pp.Part
JOIN SupplierProjects spr ON sp.Supplier = spr.Supplier AND pp.Project = spr.Project;
```

### Testing for 5NF

For each candidate decomposition:
1. Project R onto the proposed decomposition schemas
2. Join the projections
3. Verify the join equals the original R (no spurious tuples)

## Domain-Key Normal Form (DKNF)

The ultimate normal form, DKNF eliminates all modification anomalies.

### Definition

A relation is in DKNF if every constraint on the relation is a logical consequence of:
- Domain constraints (allowed values for attributes)
- Key constraints (uniqueness of candidate keys)

### Implications

- DKNF implies all lower normal forms
- A relation in DKNF has no insertion, deletion, or update anomalies
- Achieving DKNF may be impractical; it's more of a theoretical ideal

### Example

Consider enforcing that an employee's salary must be within their department's salary range:

```
Employee | Salary | DeptID | DeptMinSalary | DeptMaxSalary
```

This is not in DKNF because the constraint `DeptMinSalary <= Salary <= DeptMaxSalary` is not implied by domain or key constraints alone.

To achieve DKNF:
1. Separate employee data from department salary ranges
2. Enforce the constraint through CHECK or triggers
3. Or use a computed column/view that validates the constraint

## Practical Considerations

### When to Pursue Higher Normal Forms

**Consider 4NF when you see**:
- Independent multi-valued facts stored together
- Cartesian products appearing in data
- Maintenance anomalies with multi-valued attributes

**Consider 5NF when**:
- Complex ternary relationships exist
- Business rules create cyclic dependencies
- Current design shows redundancy despite being in 4NF

### Trade-offs

| Normal Form | Benefit | Cost |
|-------------|---------|------|
| 4NF | Eliminates MVD redundancy | More tables, more joins |
| 5NF | Eliminates all join-based redundancy | Significantly more complexity |
| DKNF | No modification anomalies | Often impractical to achieve |

### Performance Impact

Higher normal forms mean:
- More tables to join
- Potentially slower queries
- More complex application logic
- But: Smaller tables, less redundancy, simpler updates

**Rule of thumb**: Normalize to at least 3NF/BCNF. Consider 4NF when MVDs are obvious. Rarely pursue 5NF unless specific problems occur.

## Identifying Normal Form Violations

### Checklist for Analysis

1. **Is it in 1NF?**
   - Are all attributes atomic?
   - Is there a primary key?

2. **Is it in 2NF?**
   - Are non-key attributes fully dependent on the entire key?

3. **Is it in 3NF?**
   - Are there transitive dependencies?

4. **Is it in BCNF?**
   - Do all determinants include a key?

5. **Is it in 4NF?**
   - Are there independent multi-valued dependencies?

6. **Is it in 5NF?**
   - Are there join dependencies not implied by keys?

### Systematic Approach

```
1. List all attributes
2. Identify candidate keys
3. List all functional dependencies
4. Check for partial dependencies (2NF)
5. Check for transitive dependencies (3NF)
6. Verify all determinants are superkeys (BCNF)
7. Identify any multi-valued dependencies (4NF)
8. Test for join dependencies (5NF)
```

## Summary

Higher normal forms address increasingly subtle forms of redundancy:

| Normal Form | Addresses |
|-------------|-----------|
| 1NF | Atomic values, primary key |
| 2NF | Partial functional dependencies |
| 3NF | Transitive functional dependencies |
| BCNF | Non-trivial FDs with non-superkey determinants |
| 4NF | Non-trivial multi-valued dependencies |
| 5NF | Non-trivial join dependencies |
| DKNF | All constraints beyond domain/key |

For most practical applications, BCNF provides sufficient normalization. Pursue 4NF when independent multi-valued attributes cause maintenance problems. Reserve 5NF analysis for complex, problematic schemas where simpler normalization hasn't resolved anomalies.
